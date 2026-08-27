import { sources } from '../config/sources.config.ts';
import { facts } from './facts.ts';
import { media } from './media.ts';

function resolveById<T extends { id: string }>(records: T[], id: string, label: string): T {
  const record = records.find((candidate) => candidate.id === id);
  if (!record) throw new Error(`Missing ${label}: ${id}`);
  return record;
}

export function getFact(id: (typeof facts)[number]['id']) {
  return resolveById(facts, id, 'fact');
}

export function getFacts(ids: (typeof facts)[number]['id'][]) {
  return ids.map((id) => getFact(id));
}

export function getMedia(id: (typeof media)[number]['id']) {
  return resolveById(media, id, 'media');
}

export function getSources(ids: string[]) {
  return ids.map((id) => resolveById(sources, id, 'source'));
}

export function getVerificationDate(records: { lastVerified: string }[]) {
  if (!records.length) throw new Error('Cannot derive verification date from an empty record list');
  return records.map((record) => record.lastVerified).sort().at(-1)!;
}
