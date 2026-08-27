import type { FactRecord, KeywordRecord, MediaRecord, ResearchTask, RouteConfig, SourceRecord } from '../config/schema.ts';

const isoDate = /^\d{4}-\d{2}-\d{2}$/;

function valueMissing(value: FactRecord['value']) {
  if (Array.isArray(value)) return value.length === 0;
  return value === '' || value === 'UNKNOWN';
}

export function validateEvidenceBundle(bundle: { facts: FactRecord[]; media: MediaRecord[]; routes: RouteConfig[]; sources: SourceRecord[] }) {
  const errors: string[] = [];
  const sourceIds = new Set(bundle.sources.map((source) => source.id));
  const routeIds = new Set(bundle.routes.map((route) => route.id));
  const routePaths = new Set(bundle.routes.map((route) => route.path));
  const factIds = new Set<string>();
  const mediaIds = new Set<string>();

  for (const source of bundle.sources) {
    if (!isoDate.test(source.lastVerified)) errors.push(`source has invalid verification date: ${source.id}`);
  }

  for (const fact of bundle.facts) {
    if (factIds.has(fact.id)) errors.push(`duplicate fact id: ${fact.id}`);
    factIds.add(fact.id);
    if (fact.required && valueMissing(fact.value)) errors.push(`fact required value is missing: ${fact.id}`);
    if (!isoDate.test(fact.lastVerified)) errors.push(`fact has invalid verification date: ${fact.id}`);
    if (!fact.sourceIds.length) errors.push(`fact has no source: ${fact.id}`);
    for (const sourceId of fact.sourceIds) if (!sourceIds.has(sourceId)) errors.push(`fact references missing source: ${fact.id} -> ${sourceId}`);
    for (const consumer of fact.consumers) if (!routeIds.has(consumer)) errors.push(`fact references missing consumer route: ${fact.id} -> ${consumer}`);
    if (!['OFFICIAL', 'FIRST_HAND'].includes(fact.evidenceClass) && fact.publicAllowed) errors.push(`public fact uses ineligible evidence: ${fact.id}`);
  }

  for (const item of bundle.media) {
    if (mediaIds.has(item.id)) errors.push(`duplicate media id: ${item.id}`);
    mediaIds.add(item.id);
    if (item.width <= 0 || item.height <= 0) errors.push(`media must have positive dimensions: ${item.id}`);
    if (!item.alt.trim() || !item.attribution.trim() || !item.rightsNote.trim()) errors.push(`media metadata is incomplete: ${item.id}`);
    if (!sourceIds.has(item.sourceId)) errors.push(`media references missing source: ${item.id} -> ${item.sourceId}`);
    if (!routePaths.has(item.placement)) errors.push(`media references missing placement route: ${item.id} -> ${item.placement}`);
    if (!isoDate.test(item.lastVerified)) errors.push(`media has invalid verification date: ${item.id}`);
  }

  return [...new Set(errors)];
}

export function validateKeywordOwnership(keywords: KeywordRecord[], routes: RouteConfig[], backlog: ResearchTask[]) {
  const errors: string[] = [];
  const routeIds = new Set(routes.map((route) => route.id));
  const representativeOwners = new Map<string, string>();
  const backlogByKeyword = new Map(backlog.map((task) => [task.keywordId, task]));

  for (const keyword of keywords) {
    const representative = keyword.representative.trim().toLowerCase();
    const existingOwner = representativeOwners.get(representative);
    if (existingOwner && existingOwner !== keyword.owner) errors.push(`representative keyword has multiple owners: ${keyword.representative}`);
    representativeOwners.set(representative, keyword.owner);

    if (keyword.owner === 'RESEARCH_BACKLOG') {
      if (!backlogByKeyword.has(keyword.id)) errors.push(`research keyword has no backlog task: ${keyword.id}`);
    } else {
      if (!routeIds.has(keyword.owner)) errors.push(`keyword has missing route owner: ${keyword.id} -> ${keyword.owner}`);
      if (backlogByKeyword.has(keyword.id)) errors.push(`backlog keyword also points to a route: ${keyword.id}`);
    }
  }

  for (const task of backlog) {
    if (!keywords.some((keyword) => keyword.id === task.keywordId)) errors.push(`backlog task has missing keyword: ${task.taskId}`);
  }

  return [...new Set(errors)];
}
