import test from 'node:test';
import assert from 'node:assert/strict';

import { validateConfig } from '../scripts/validate-config.mjs';

const validBundle = {
  site: {
    name: 'Example Game Guide',
    shortName: 'Example Guide',
    origin: 'https://example.invalid',
    description: 'A neutral evidence-first game guide starter.',
    defaultLocale: 'en',
    publisherName: 'Example Guide',
    brand: { logoPath: '/brand/logo.svg', faviconPath: '/brand/favicon.svg' },
    disclaimer: 'Independent guide. Not affiliated with the developer or publisher.',
  },
  routes: [
    { id: 'home', path: '/', title: 'Example Game Guide', description: 'Neutral starter home.', kind: 'content', releaseState: 'PUBLISHED', published: true, sitemap: true },
    { id: 'guide', path: '/guide/', title: 'Example Guide', description: 'Neutral guide demonstration.', kind: 'content', releaseState: 'LOCAL_ONLY', published: false, sitemap: false },
  ],
  navigation: [{ label: 'Home', href: '/' }],
  sources: [{
    id: 'official-placeholder', label: 'Official source placeholder', url: 'https://store.example.invalid/game',
    evidenceClass: 'OFFICIAL', gameVersion: 'UNKNOWN', lastVerified: '2026-08-24', publicAllowed: false, editorialJudgment: false,
  }],
  features: { analytics: false, advertising: false, localization: false, sitemap: true },
};

test('committed neutral configuration is valid', async () => {
  const { configBundle } = await import('../src/config/index.ts');
  assert.deepEqual(validateConfig(configBundle), []);
});

test('committed project identity and local-only content routes are explicit', async () => {
  const { features, routes, siteConfig } = await import('../src/config/index.ts');
  assert.equal(siteConfig.name, 'Zero Company Field Guide');
  assert.equal(siteConfig.origin, 'https://zerocompanytactics.com');
  assert.equal(siteConfig.brand.faviconPath, '/favicon.ico?v=3');
  assert.deepEqual(features, { analytics: false, advertising: false, localization: false, sitemap: true });
  assert.deepEqual(
    routes.filter((route) => route.kind === 'content').map((route) => route.path),
    ['/', '/classes/', '/operators/', '/guides/difficulty-permadeath/', '/guides/squad-size-operators/'],
  );
  assert.ok(routes.filter((route) => route.kind === 'content').every((route) => route.releaseState === 'LOCAL_ONLY' && !route.published));
});

test('rejects an origin that is not an absolute URL', () => {
  const bundle = structuredClone(validBundle);
  bundle.site.origin = '';
  assert.ok(validateConfig(bundle).includes('site.origin must be an absolute URL'));
});

test('rejects navigation targets absent from routes', () => {
  const bundle = structuredClone(validBundle);
  bundle.navigation.push({ label: 'Missing', href: '/missing/' });
  assert.ok(validateConfig(bundle).includes('navigation href is not configured: /missing/'));
});

test('rejects published routes without complete metadata', () => {
  const bundle = structuredClone(validBundle);
  bundle.routes[0].title = '';
  assert.ok(validateConfig(bundle).includes('published route metadata is incomplete: home'));
});

test('rejects published flags that disagree with release state', () => {
  const bundle = structuredClone(validBundle);
  bundle.routes[0].releaseState = 'LOCAL_ONLY';
  assert.ok(validateConfig(bundle).includes('route publication state is inconsistent: home'));
});
