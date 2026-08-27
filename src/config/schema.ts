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
