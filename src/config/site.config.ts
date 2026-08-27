import type { SiteConfig } from './schema.ts';

export const siteConfig: SiteConfig = {
  name: 'Zero Company Field Guide',
  shortName: 'ZC Field Guide',
  origin: 'https://zerocompanytactics.com',
  description: 'An independent, evidence-first field guide to STAR WARS Zero Company classes, operators, and squad decisions.',
  defaultLocale: 'en',
  publisherName: 'Zero Company Field Guide',
  brand: {
    logoPath: '/brand/logo.svg',
    faviconPath: '/favicon.ico?v=3',
  },
  disclaimer: 'Independent guide. Not affiliated with Electronic Arts, Lucasfilm Games, Bit Reactor, or Respawn Entertainment.',
};
