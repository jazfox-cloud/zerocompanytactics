import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function source(path) {
  return readFile(new URL(`../${path}`, import.meta.url), 'utf8');
}

test('base layout delegates SEO and renders the shared shell', async () => {
  const layout = await source('src/layouts/BaseLayout.astro');
  assert.match(layout, /SeoHead/);
  assert.match(layout, /SiteHeader/);
  assert.match(layout, /SiteFooter/);
  assert.match(layout, /<main/);
  assert.doesNotMatch(layout, /https:\/\/[a-z0-9-]+\.(com|net|org)/i);
});

test('SEO derives identity from configuration and gates analytics', async () => {
  const seo = await source('src/components/seo/SeoHead.astro');
  assert.match(seo, /siteConfig\.origin/);
  assert.match(seo, /features\.analytics/);
  assert.match(seo, /PUBLIC_GA4_ID/);
  assert.doesNotMatch(seo, /G-[A-Z0-9]{6,}/);
});

test('source list exposes evidence metadata', async () => {
  const list = await source('src/components/evidence/SourceList.astro');
  assert.match(list, /evidenceClass/);
  assert.match(list, /gameVersion/);
  assert.match(list, /lastVerified/);
  assert.match(list, /publicAllowed/);
});
