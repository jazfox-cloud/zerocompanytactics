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
  const html = `<!doctype html><html><head><title>Unique title</title><meta name="description" content="Unique description"><meta name="robots" content="noindex, nofollow"><link rel="canonical" href="https://zero-company-field-guide.invalid/classes/"></head><body><h1>Classes</h1><a href="/operators/">Operators</a></body></html>`;
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
