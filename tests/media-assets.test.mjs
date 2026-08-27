import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

import { sources } from '../src/config/sources.config.ts';
import { media } from '../src/data/media.ts';
import { readJpegDimensions, validateMediaAssets } from '../scripts/validate-media-assets.mjs';

test('all recorded evaluation images exist and match decoded JPEG dimensions', async () => {
  assert.deepEqual(await validateMediaAssets(new URL('../', import.meta.url)), []);
  for (const item of media) {
    const bytes = await readFile(new URL(`../public${item.assetPath}`, import.meta.url));
    assert.deepEqual(readJpegDimensions(bytes), { width: item.width, height: item.height });
  }
});

test('media records retain source, attribution, alt, and production-rights boundary', () => {
  const sourceIds = new Set(sources.map((source) => source.id));
  for (const item of media) {
    assert.ok(sourceIds.has(item.sourceId));
    assert.match(item.attribution, /Electronic Arts/);
    assert.ok(item.alt.trim().length > 20);
    assert.equal(item.publicAllowed, false);
    assert.match(item.rightsNote, /production/i);
  }
});

test('public media directory contains no unrecorded files', async () => {
  const entries = await readdir(new URL('../public/media/', import.meta.url));
  const recorded = new Set(media.map((item) => path.basename(item.assetPath)));
  assert.deepEqual(entries.sort(), [...recorded].sort());
});

test('JPEG parser rejects non-JPEG input', () => {
  assert.throws(() => readJpegDimensions(Buffer.from('not an image')), /JPEG/);
});
