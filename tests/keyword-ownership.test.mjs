import test from 'node:test';
import assert from 'node:assert/strict';

import { keywords } from '../src/data/keywords.ts';
import { researchBacklog } from '../src/data/research-backlog.ts';
import { validateKeywordOwnership } from '../src/data/validation.ts';
import { routes } from '../src/config/routes.config.ts';

test('committed keyword clusters have one route owner or a research backlog', () => {
  assert.deepEqual(validateKeywordOwnership(keywords, routes, researchBacklog), []);
});

test('rejects duplicate representative keywords with multiple owners', () => {
  const invalid = [...structuredClone(keywords), { ...structuredClone(keywords[0]), id: 'keyword:duplicate', owner: 'operators' }];
  assert.match(validateKeywordOwnership(invalid, routes, researchBacklog).join('\n'), /multiple owners/);
});

test('rejects backlog opportunities that also point to a route', () => {
  const invalid = structuredClone(keywords);
  const item = invalid.find((record) => record.owner === 'RESEARCH_BACKLOG');
  item.owner = 'classes';
  assert.match(validateKeywordOwnership(invalid, routes, researchBacklog).join('\n'), /backlog.*route/);
});

test('rejects route owners that are not configured', () => {
  const invalid = structuredClone(keywords);
  invalid[0].owner = 'missing-route';
  assert.match(validateKeywordOwnership(invalid, routes, researchBacklog).join('\n'), /missing route owner/);
});
