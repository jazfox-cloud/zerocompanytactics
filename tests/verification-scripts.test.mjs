import test from 'node:test';
import assert from 'node:assert/strict';

import { validateEvidenceData } from '../scripts/validate-evidence-data.mjs';
import { validateKeywordData } from '../scripts/validate-keyword-ownership.mjs';
import { validateContentPageHtml } from '../scripts/verify-built-output.mjs';

test('command-level evidence and keyword validators accept the committed records', () => {
  assert.deepEqual(validateEvidenceData(), []);
  assert.deepEqual(validateKeywordData(), []);
});

test('built-page validator accepts a local-only page with one H1 and self canonical', () => {
  const favicons = `<link href="/favicon.ico?v=3"><link href="/brand/favicon-32.png?v=3"><link href="/brand/favicon-16.png?v=3"><link href="/brand/favicon-192.png"><link href="/brand/favicon-512.png"><link href="/brand/favicon-192.png?v=3">`;
  const html = `<!doctype html><html><head><title>Unique title</title><meta name="description" content="Unique description"><meta name="robots" content="noindex, nofollow"><link rel="canonical" href="https://zerocompanytactics.com/classes/">${favicons}</head><body><h1>Classes</h1><a href="/operators/">Operators</a></body></html>`;
  assert.deepEqual(validateContentPageHtml(html, {
    routePath: '/classes/',
    expectedLinks: ['/operators/'],
  }), []);
});

test('built-page validator rejects missing release, heading, canonical, and link contracts', () => {
  const errors = validateContentPageHtml('<html><head><title></title></head><body><h1>One</h1><h1>Two</h1></body></html>', {
    routePath: '/classes/',
    expectedLinks: ['/operators/'],
  });
  assert.match(errors.join('\n'), /title is missing/);
  assert.match(errors.join('\n'), /exactly one h1/);
  assert.match(errors.join('\n'), /noindex/);
  assert.match(errors.join('\n'), /canonical/);
  assert.match(errors.join('\n'), /expected link/);
});

test('built-page validator contracts the official trailer embed and fallback', () => {
  const favicons = `<link href="/favicon.ico?v=3"><link href="/brand/favicon-32.png?v=3"><link href="/brand/favicon-16.png?v=3"><link href="/brand/favicon-192.png"><link href="/brand/favicon-512.png"><link href="/brand/favicon-192.png?v=3">`;
  const base = `<!doctype html><html><head><title>Unique title</title><meta name="description" content="Unique description"><meta name="robots" content="noindex, nofollow"><link rel="canonical" href="https://zerocompanytactics.com/">${favicons}</head><body><h1>Home</h1>`;
  const trailer = `<iframe src="https://www.youtube-nocookie.com/embed/WxLUZ1omFA8?rel=0" title="STAR WARS Zero Company official announcement trailer" loading="lazy"></iframe><a href="https://www.youtube.com/watch?v=WxLUZ1omFA8">Watch on YouTube</a>`;
  assert.deepEqual(validateContentPageHtml(`${base}${trailer}</body></html>`, { routePath: '/', expectedTrailer: true }), []);
  assert.match(validateContentPageHtml(`${base}</body></html>`, { routePath: '/', expectedTrailer: true }).join('\n'), /trailer/i);
});
