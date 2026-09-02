import test from 'node:test';
import assert from 'node:assert/strict';

import { validateEvidenceData } from '../scripts/validate-evidence-data.mjs';
import { validateKeywordData } from '../scripts/validate-keyword-ownership.mjs';
import { validateContentPageHtml } from '../scripts/verify-built-output.mjs';

const adUnit = '<script async="async" data-cfasync="false" src="https://pl31149274.profitableratecpmnetwork.com/3abff3f2cb7a14ddfe1342f5327d0837/invoke.js"></script><div id="container-3abff3f2cb7a14ddfe1342f5327d0837"></div>';

test('command-level evidence and keyword validators accept the committed records', () => {
  assert.deepEqual(validateEvidenceData(), []);
  assert.deepEqual(validateKeywordData(), []);
});

test('built-page validator accepts a published page with one H1 and self canonical', () => {
  const favicons = `<link href="/favicon.ico?v=3"><link href="/brand/favicon-32.png?v=3"><link href="/brand/favicon-16.png?v=3"><link href="/brand/favicon-192.png"><link href="/brand/favicon-512.png"><link href="/brand/favicon-192.png?v=3">`;
  const html = `<!doctype html><html><head><title>Unique title</title><meta name="description" content="Unique description"><link rel="canonical" href="https://zerocompanytactics.com/classes/">${favicons}</head><body><h1>Classes</h1><a href="/operators/">Operators</a>${adUnit}</body></html>`;
  assert.deepEqual(validateContentPageHtml(html, {
    routePath: '/classes/',
    expectedLinks: ['/operators/'], routePublished: true,
  }), []);
});

test('built-page validator rejects noindex on published pages plus missing heading, canonical, and links', () => {
  const errors = validateContentPageHtml('<html><head><title></title></head><body><h1>One</h1><h1>Two</h1></body></html>', {
    routePath: '/classes/',
    expectedLinks: ['/operators/'], routePublished: true,
  });
  assert.match(errors.join('\n'), /title is missing/);
  assert.match(errors.join('\n'), /exactly one h1/);
  assert.match(validateContentPageHtml('<html><head><title>Title</title><meta name="description" content="Description"><meta name="robots" content="noindex, nofollow"><link rel="canonical" href="https://zerocompanytactics.com/classes/"></head><body><h1>One</h1></body></html>', { routePath: '/classes/', routePublished: true }).join('\n'), /published page must not be noindex/);
  assert.match(errors.join('\n'), /canonical/);
  assert.match(errors.join('\n'), /expected link/);
});

test('built-page validator rejects a page without the configured ad unit', () => {
  const html = '<!doctype html><html><body><h1>Page</h1></body></html>';
  assert.match(validateContentPageHtml(html, { routePath: '/' }).join('\n'), /ad unit/i);
});

test('built-page validator contracts the official trailer embed and fallback', () => {
  const favicons = `<link href="/favicon.ico?v=3"><link href="/brand/favicon-32.png?v=3"><link href="/brand/favicon-16.png?v=3"><link href="/brand/favicon-192.png"><link href="/brand/favicon-512.png"><link href="/brand/favicon-192.png?v=3">`;
  const base = `<!doctype html><html><head><title>Unique title</title><meta name="description" content="Unique description"><meta name="robots" content="noindex, nofollow"><link rel="canonical" href="https://zerocompanytactics.com/">${favicons}</head><body><h1>Home</h1>`;
  const trailer = `<iframe src="https://www.youtube-nocookie.com/embed/WxLUZ1omFA8?rel=0" title="STAR WARS Zero Company official announcement trailer" loading="lazy"></iframe><a href="https://www.youtube.com/watch?v=WxLUZ1omFA8">Watch on YouTube</a>`;
  const publishedBase = base.replace('<meta name="robots" content="noindex, nofollow">', '');
  assert.deepEqual(validateContentPageHtml(`${publishedBase}${trailer}${adUnit}</body></html>`, { routePath: '/', routePublished: true, expectedTrailer: true }), []);
  assert.match(validateContentPageHtml(`${publishedBase}</body></html>`, { routePath: '/', routePublished: true, expectedTrailer: true }).join('\n'), /trailer/i);
});
