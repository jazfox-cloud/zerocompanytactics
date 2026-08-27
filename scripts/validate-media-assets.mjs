import { readFile, readdir } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

import { media } from '../src/data/media.ts';

const startOfFrameMarkers = new Set([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf]);

export function readJpegDimensions(bytes) {
  if (bytes.length < 4 || bytes[0] !== 0xff || bytes[1] !== 0xd8) throw new Error('File is not a JPEG');

  let offset = 2;
  while (offset + 4 < bytes.length) {
    while (bytes[offset] === 0xff) offset += 1;
    const marker = bytes[offset];
    offset += 1;
    if (marker === 0xd8 || marker === 0xd9) continue;
    if (marker === 0xda) break;
    const length = bytes.readUInt16BE(offset);
    if (length < 2 || offset + length > bytes.length) throw new Error('JPEG contains an invalid segment');
    if (startOfFrameMarkers.has(marker)) {
      return { height: bytes.readUInt16BE(offset + 3), width: bytes.readUInt16BE(offset + 5) };
    }
    offset += length;
  }

  throw new Error('JPEG dimensions were not found');
}

export async function validateMediaAssets(rootUrl = pathToFileURL(`${process.cwd()}/`)) {
  const errors = [];
  const publicDir = fileURLToPath(new URL('public/media/', rootUrl));
  let entries = [];
  try {
    entries = await readdir(publicDir);
  } catch (error) {
    if (error?.code === 'ENOENT') errors.push('public/media directory is missing');
    else throw error;
  }

  const recordedFiles = new Set(media.map((item) => path.basename(item.assetPath)));
  for (const entry of entries) if (!recordedFiles.has(entry)) errors.push(`unrecorded media file: ${entry}`);

  for (const item of media) {
    const assetUrl = new URL(`public${item.assetPath}`, rootUrl);
    try {
      const bytes = await readFile(assetUrl);
      const dimensions = readJpegDimensions(bytes);
      if (dimensions.width !== item.width || dimensions.height !== item.height) {
        errors.push(`media dimensions do not match record: ${item.id}`);
      }
    } catch (error) {
      errors.push(`media asset invalid or missing: ${item.id} (${error.message})`);
    }
  }

  return [...new Set(errors)];
}

async function main() {
  const errors = await validateMediaAssets();
  if (errors.length) {
    for (const error of errors) console.error(error);
    process.exitCode = 1;
    return;
  }
  console.log(`Media assets valid (${media.length} JPEG files).`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) await main();
