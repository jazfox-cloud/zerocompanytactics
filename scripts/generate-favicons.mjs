import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.join(root, 'public', 'brand', 'favicon.svg');
const brandDir = path.join(root, 'public', 'brand');

function createIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);

  const directory = Buffer.alloc(images.length * 16);
  let offset = header.length + directory.length;
  images.forEach(({ size, buffer }, index) => {
    const entry = index * 16;
    directory.writeUInt8(size === 256 ? 0 : size, entry);
    directory.writeUInt8(size === 256 ? 0 : size, entry + 1);
    directory.writeUInt8(0, entry + 2);
    directory.writeUInt8(0, entry + 3);
    directory.writeUInt16LE(1, entry + 4);
    directory.writeUInt16LE(32, entry + 6);
    directory.writeUInt32LE(buffer.length, entry + 8);
    directory.writeUInt32LE(offset, entry + 12);
    offset += buffer.length;
  });

  return Buffer.concat([header, directory, ...images.map(({ buffer }) => buffer)]);
}

await mkdir(brandDir, { recursive: true });
const svg = await readFile(source);
const pngs = new Map();
for (const size of [16, 32, 48, 192, 512]) {
  const buffer = await sharp(svg, { density: 512 }).resize(size, size).png().toBuffer();
  pngs.set(size, buffer);
  if (size !== 48) await writeFile(path.join(brandDir, `favicon-${size}.png`), buffer);
}
await writeFile(path.join(root, 'public', 'favicon.ico'), createIco([16, 32, 48].map((size) => ({ size, buffer: pngs.get(size) }))));
console.log('Generated favicon.ico (16/32/48) and PNG icons (16/32/192/512).');
