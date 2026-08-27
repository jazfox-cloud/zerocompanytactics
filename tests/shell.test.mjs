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

test('SEO exposes cache-safe favicon candidates in deterministic order', async () => {
  const seo = await source('src/components/seo/SeoHead.astro');
  const expected = [
    'rel="shortcut icon" href={siteConfig.brand.faviconPath} type="image/x-icon"',
    'rel="icon" type="image/png" sizes="32x32" href="/brand/favicon-32.png?v=3"',
    'rel="icon" type="image/png" sizes="16x16" href="/brand/favicon-16.png?v=3"',
    'rel="icon" type="image/png" sizes="192x192" href="/brand/favicon-192.png"',
    'rel="icon" type="image/png" sizes="512x512" href="/brand/favicon-512.png"',
    'rel="apple-touch-icon" sizes="192x192" href="/brand/favicon-192.png?v=3"',
  ];
  let previous = -1;
  for (const candidate of expected) {
    const current = seo.indexOf(candidate);
    assert.ok(current > previous, `missing or misordered favicon declaration: ${candidate}`);
    previous = current;
  }
  assert.doesNotMatch(seo, /<link rel="icon" href={siteConfig\.brand\.faviconPath}/);
});

test('source list exposes evidence metadata', async () => {
  const list = await source('src/components/evidence/SourceList.astro');
  assert.match(list, /evidenceClass/);
  assert.match(list, /gameVersion/);
  assert.match(list, /lastVerified/);
  assert.match(list, /publicAllowed/);
});

test('official media requires rendered dimensions, attribution, and source fallback', async () => {
  const media = await source('src/components/game/OfficialMedia.astro');
  assert.match(media, /<img/);
  assert.match(media, /width={media\.width}/);
  assert.match(media, /height={media\.height}/);
  assert.match(media, /alt={media\.alt}/);
  assert.match(media, /<figcaption/);
  assert.match(media, /media\.attribution/);
  assert.match(media, /View official source/);
  assert.match(media, /source\.url/);
});

test('official trailer uses the privacy-enhanced player and visible YouTube fallback', async () => {
  const trailer = await source('src/components/game/OfficialTrailer.astro');
  assert.match(trailer, /youtube-nocookie\.com\/embed/);
  assert.match(trailer, /loading="lazy"/);
  assert.match(trailer, /title={title}/);
  assert.match(trailer, /allowfullscreen/);
  assert.match(trailer, /source\.url/);
  assert.match(trailer, /Watch on YouTube/);
});

test('shell exposes local navigation, independent identity, and official destination', async () => {
  const header = await source('src/components/shell/SiteHeader.astro');
  const footer = await source('src/components/shell/SiteFooter.astro');
  const layout = await source('src/layouts/BaseLayout.astro');
  assert.match(header, /LOCAL_ONLY/);
  assert.match(header, /siteConfig\.brand\.logoPath/);
  assert.match(footer, /siteConfig\.disclaimer/);
  assert.match(footer, /Official game page/);
  assert.match(footer, /source:official-game-page/);
  assert.match(layout, /skip-link/);
  assert.doesNotMatch(`${header}\n${footer}`, /zerocompany-primary-logo|EA[_ -]?logo|Star Wars logo/i);
});
