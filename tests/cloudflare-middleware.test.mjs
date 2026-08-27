import test from 'node:test';
import assert from 'node:assert/strict';

import { onRequest } from '../functions/_middleware.js';

test('www redirects to canonical apex in one hop with path and query preserved', async () => {
  const response = await onRequest({
    request: new Request('https://www.zerocompanytactics.com/classes/?from=www'),
    next: () => Promise.reject(new Error('next must not run for www')),
  });
  assert.equal(response.status, 301);
  assert.equal(response.headers.get('location'), 'https://zerocompanytactics.com/classes/?from=www');
});

test('canonical apex continues to the Pages asset', async () => {
  const expected = new Response('ok');
  const response = await onRequest({
    request: new Request('https://zerocompanytactics.com/classes/'),
    next: async () => expected,
  });
  assert.equal(response, expected);
});
