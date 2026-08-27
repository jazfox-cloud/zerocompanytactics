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

test('sitemap filters on published and sitemap flags', async () => {
  const sitemap = await source('src/pages/sitemap.xml.ts');
  assert.match(sitemap, /route\.published && route\.sitemap/);
});

test('legal scaffolds remain noindex until replaced', async () => {
  for (const path of ['src/pages/privacy/index.astro', 'src/pages/terms/index.astro']) {
    const content = await source(path);
    assert.match(content, /noindex={true}/);
  }
});
