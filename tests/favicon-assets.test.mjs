import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

import { readIcoEntries, readPngDimensions, validateFaviconAssets } from '../scripts/validate-favicon-assets.mjs';

test('committed favicon suite has exact PNG and ICO dimensions', async () => {
  assert.deepEqual(await validateFaviconAssets(new URL('../', import.meta.url)), []);
  const ico = await readFile(new URL('../public/favicon.ico', import.meta.url));
  assert.deepEqual(readIcoEntries(ico).map(({ width, height }) => ({ width, height })), [
    { width: 16, height: 16 },
    { width: 32, height: 32 },
    { width: 48, height: 48 },
  ]);
  for (const size of [16, 32, 192, 512]) {
    const png = await readFile(new URL(`../public/brand/favicon-${size}.png`, import.meta.url));
    assert.deepEqual(readPngDimensions(png), { width: size, height: size });
  }
});

test('favicon validator rejects a PNG renamed as ICO', () => {
  assert.throws(() => readIcoEntries(Buffer.from('\x89PNG\r\n\x1a\n')), /ICO/);
});
