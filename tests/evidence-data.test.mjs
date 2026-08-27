import test from 'node:test';
import assert from 'node:assert/strict';

import { facts } from '../src/data/facts.ts';
import { media } from '../src/data/media.ts';
import { getFact, getSources, getVerificationDate } from '../src/data/selectors.ts';
import { validateEvidenceBundle } from '../src/data/validation.ts';
import { routes, sources } from '../src/config/index.ts';

test('committed official evidence bundle is internally complete', () => {
  assert.deepEqual(validateEvidenceBundle({ facts, media, routes, sources }), []);
});

test('selectors resolve canonical facts and sources', () => {
  const fact = getFact('fact:standard-specialization-count');
  assert.equal(fact.value, 8);
  assert.ok(getSources(fact.sourceIds).length > 0);
  assert.match(getVerificationDate([fact]), /^\d{4}-\d{2}-\d{2}$/);
});

test('rejects facts with dangling source references', () => {
  const invalid = structuredClone(facts);
  invalid[0].sourceIds = ['source:missing'];
  assert.match(validateEvidenceBundle({ facts: invalid, media, routes, sources }).join('\n'), /missing source/);
});

test('rejects required facts with unknown or empty values', () => {
  const invalid = structuredClone(facts);
  invalid[0].required = true;
  invalid[0].value = 'UNKNOWN';
  assert.match(validateEvidenceBundle({ facts: invalid, media, routes, sources }).join('\n'), /required value/);
});

test('rejects media without positive dimensions or route placement', () => {
  const invalid = structuredClone(media);
  invalid[0].width = 0;
  invalid[0].placement = '/missing/';
  const message = validateEvidenceBundle({ facts, media: invalid, routes, sources }).join('\n');
  assert.match(message, /positive dimensions/);
  assert.match(message, /missing placement route/);
});
