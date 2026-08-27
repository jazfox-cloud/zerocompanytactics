import type { SiteConfig } from './schema.ts';

export const siteConfig: SiteConfig = {
  name: 'Example Game Guide',
  shortName: 'Example Guide',
  origin: 'https://example.invalid',
  description: 'A neutral evidence-first game guide starter.',
  defaultLocale: 'en',
  publisherName: 'Example Guide',
  brand: {
    logoPath: '/brand/logo.svg',
    faviconPath: '/brand/favicon.svg',
  },
  disclaimer: 'Independent guide. Not affiliated with the developer or publisher.',
};
