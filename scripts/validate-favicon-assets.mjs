import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const pngSignature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

export function readPngDimensions(buffer) {
  if (buffer.length < 24 || !buffer.subarray(0, 8).equals(pngSignature) || buffer.toString('ascii', 12, 16) !== 'IHDR') {
    throw new Error('File is not a valid PNG with an IHDR header');
  }
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

export function readIcoEntries(buffer) {
  if (buffer.length < 6 || buffer.readUInt16LE(0) !== 0 || buffer.readUInt16LE(2) !== 1) {
    throw new Error('File is not a valid ICO container');
  }
  const count = buffer.readUInt16LE(4);
  if (!count || buffer.length < 6 + count * 16) throw new Error('ICO directory is missing or truncated');
  const entries = [];
  for (let index = 0; index < count; index += 1) {
    const entry = 6 + index * 16;
    const width = buffer.readUInt8(entry) || 256;
    const height = buffer.readUInt8(entry + 1) || 256;
    const size = buffer.readUInt32LE(entry + 8);
    const offset = buffer.readUInt32LE(entry + 12);
    if (!size || offset + size > buffer.length) throw new Error('ICO image data is missing or truncated');
    entries.push({ width, height, size, offset });
  }
  return entries;
}

export async function validateFaviconAssets(rootUrl = pathToFileURL(`${process.cwd()}${path.sep}`)) {
  const root = fileURLToPath(rootUrl);
  const errors = [];
  for (const size of [16, 32, 192, 512]) {
    const file = path.join(root, 'public', 'brand', `favicon-${size}.png`);
    try {
      const dimensions = readPngDimensions(await readFile(file));
      if (dimensions.width !== size || dimensions.height !== size) errors.push(`${path.relative(root, file)} must be ${size}x${size}`);
    } catch (error) {
      errors.push(`${path.relative(root, file)}: ${error.message}`);
    }
  }
  const icoFile = path.join(root, 'public', 'favicon.ico');
  try {
    const entries = readIcoEntries(await readFile(icoFile));
    const dimensions = entries.map(({ width, height }) => `${width}x${height}`);
    if (dimensions.join(',') !== '16x16,32x32,48x48') errors.push('public/favicon.ico must contain exactly 16x16, 32x32, and 48x48 entries');
  } catch (error) {
    errors.push(`public/favicon.ico: ${error.message}`);
  }
  return errors;
}

async function main() {
  const errors = await validateFaviconAssets();
  if (errors.length) {
    for (const error of errors) console.error(error);
    process.exitCode = 1;
    return;
  }
  console.log('Favicon assets valid (ICO 16/32/48; PNG 16/32/192/512).');
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) await main();
