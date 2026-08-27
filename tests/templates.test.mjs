import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function source(path) {
  return readFile(new URL(`../${path}`, import.meta.url), 'utf8');
}

const templates = ['HomePage', 'AnswerPage', 'GuidePage', 'TimelinePage', 'EntityIndexPage'];

test('all bounded page templates use the shared layout and prop-driven content', async () => {
  for (const name of templates) {
    const content = await source(`src/templates/${name}.astro`);
    assert.match(content, /BaseLayout/);
    assert.match(content, /Astro\.props/);
    assert.doesNotMatch(content, /from ['"]\.\.\/pages\//);
  }
});

test('sitemap requires an explicit published release state and both publication flags', async () => {
  const sitemap = await source('src/pages/sitemap.xml.ts');
  assert.match(sitemap, /route\.releaseState === 'PUBLISHED'/);
  assert.match(sitemap, /route\.published && route\.sitemap/);
});

test('local-only robots policy blocks crawling and does not advertise a sitemap', async () => {
  const robots = await source('src/pages/robots.txt.ts');
  assert.match(robots, /Disallow: \/?/);
  assert.match(robots, /hasPublishedContent/);
});

test('legal pages accurately disclose the disabled local instrumentation', async () => {
  for (const path of ['src/pages/privacy/index.astro', 'src/pages/terms/index.astro']) {
    const content = await source(path);
    assert.match(content, /noindex={true}/);
    assert.doesNotMatch(content, /scaffold/i);
  }
  const privacy = await source('src/pages/privacy/index.astro');
  assert.match(privacy, /does not enable analytics or advertising/i);
  assert.match(privacy, /local-only/i);
});

test('404 uses the configured error route and remains noindex', async () => {
  const notFound = await source('src/pages/404.astro');
  assert.match(notFound, /getRoute\('not-found'\)/);
  assert.match(notFound, /path={route\.path}/);
  assert.match(notFound, /noindex={true}/);
});

test('tactical components stay prop-driven and route-safe', async () => {
  for (const name of ['TacticalTaskBoard', 'VerificationPanel']) {
    const content = await source(`src/components/game/${name}.astro`);
    assert.match(content, /Astro\.props/);
    assert.doesNotMatch(content, /from ['"]\.\.\/\.\.\/pages\//);
  }
});
