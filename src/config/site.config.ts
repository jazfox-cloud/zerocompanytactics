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
  disclaimer: 'This website is not endorsed by or affiliated with EA or its licensors. Independent fan guide; game names and media belong to their respective owners.',
};
