export type LocaleCode = 'en';
export type EvidenceClass = 'OFFICIAL' | 'FIRST_HAND' | 'COMMUNITY_SIGNAL' | 'SEARCH_SIGNAL' | 'UNKNOWN';
export type ReleaseState = 'LOCAL_ONLY' | 'REVIEW_READY' | 'PUBLISHED';
export type RouteKind = 'content' | 'legal' | 'error';
export type RouteId =
  | 'home'
  | 'classes'
  | 'operators'
  | 'difficulty-permadeath'
  | 'squad-size-operators'
  | 'privacy'
  | 'terms'
  | 'not-found';

export interface SiteConfig {
  name: string;
  shortName: string;
  origin: string;
  description: string;
  defaultLocale: LocaleCode;
  publisherName: string;
  brand: { logoPath: string; faviconPath: string };
  disclaimer: string;
}

export interface RouteConfig {
  id: RouteId;
  path: string;
  title: string;
  description: string;
  kind: RouteKind;
  releaseState: ReleaseState;
  published: boolean;
  sitemap: boolean;
}

export interface NavigationItem {
  label: string;
  href: string;
}

export interface SourceRecord {
  id: string;
  label: string;
  url: string;
  evidenceClass: EvidenceClass;
  gameVersion: string;
  lastVerified: string;
  publicAllowed: boolean;
  editorialJudgment: boolean;
}

export interface FactRecord {
  id: `fact:${string}`;
  label: string;
  value: string | number | boolean | string[];
  required: boolean;
  sourceIds: string[];
  evidenceClass: EvidenceClass;
  gameVersion: string;
  lastVerified: string;
  publicAllowed: boolean;
  editorialJudgment: boolean;
  consumers: RouteId[];
  boundary?: string;
}

export interface MediaRecord {
  id: `media:${string}`;
  assetPath: string;
  sourceId: string;
  width: number;
  height: number;
  alt: string;
  placement: string;
  attribution: string;
  lastVerified: string;
  publicAllowed: boolean;
  rightsNote: string;
}

export interface KeywordRecord {
  id: `keyword:${string}`;
  representative: string;
  demandSource: 'SEARCH_SIGNAL';
  userTask: string;
  owner: RouteId | 'RESEARCH_BACKLOG';
  evidenceCompleteness: 'COMPLETE' | 'PARTIAL' | 'BLOCKED';
  directAnswer: 'SATISFIED' | 'RESEARCH_REQUIRED';
  updateTrigger: string;
}

export interface ResearchTask {
  taskId: string;
  keywordId: KeywordRecord['id'];
  goal: string;
  invalidOrMissingField: string;
  sourceCandidates: string[];
  collectionMethod: string;
  validationMethod: string;
  completionCriteria: string;
  unblockCondition: string;
  publicationState: 'APPROVAL_REQUIRED' | 'BLOCKED';
}

export interface FeatureConfig {
  analytics: boolean;
  advertising: boolean;
  localization: boolean;
  sitemap: boolean;
}

export interface ConfigBundle {
  site: SiteConfig;
  routes: RouteConfig[];
  navigation: NavigationItem[];
  sources: SourceRecord[];
  features: FeatureConfig;
}
