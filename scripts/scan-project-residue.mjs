import { readFile, readdir, stat } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const identityRules = [
  { label: 'reference identity', pattern: /dragon\s*sword|dragonswordguide/gi },
  { label: 'consumer identity', pattern: /wardogs(?:\.wiki)?/gi },
  { label: 'production analytics id', pattern: /\bG-[A-Z0-9]{6,}\b/g },
];
const allowedHosts = new Set(['example.invalid', 'store.example.invalid', 'www.googletagmanager.com', 'www.sitemaps.org', 'www.w3.org']);
const extensions = new Set(['.astro', '.css', '.html', '.js', '.json', '.md', '.mjs', '.svg', '.ts']);

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function scanText(text, allowedIdentities = []) {
  let candidate = text;
  for (const identity of allowedIdentities.filter(Boolean)) {
    candidate = candidate.replace(new RegExp(escapeRegExp(identity), 'gi'), '');
  }
  const findings = [];
  for (const rule of identityRules) {
    rule.pattern.lastIndex = 0;
    if (rule.pattern.test(candidate)) findings.push(rule.label);
  }

  for (const match of candidate.matchAll(/https?:\/\/[^\s)'"`<>]+/g)) {
    try {
      const url = new URL(match[0].replace(/[.,;:]$/, ''));
      if (!allowedHosts.has(url.hostname)) findings.push(`unapproved absolute URL host: ${url.hostname}`);
    } catch {
      findings.push('malformed absolute URL');
    }
  }
  return [...new Set(findings)];
}

async function collectFiles(target) {
  const info = await stat(target);
  if (info.isFile()) return extensions.has(path.extname(target)) ? [target] : [];
  const entries = await readdir(target);
  const nested = await Promise.all(entries.map((entry) => collectFiles(path.join(target, entry))));
  return nested.flat();
}

export async function scanPaths(root, allowedIdentities = []) {
  const targets = ['src', 'public', 'README.md', 'SETUP.md', 'TEMPLATE-CHECKLIST.md', 'package.json', 'astro.config.mjs'];
  const findings = [];
  for (const relative of targets) {
    const target = path.join(root, relative);
    try {
      const files = await collectFiles(target);
      for (const file of files) {
        const text = await readFile(file, 'utf8');
        for (const message of scanText(text, allowedIdentities)) findings.push({ file: path.relative(root, file), message });
      }
    } catch (error) {
      if (error?.code !== 'ENOENT') throw error;
    }
  }
  return findings;
}

async function main() {
  const allowedIdentities = (process.env.RESIDUE_ALLOWED_IDENTITY ?? '').split(',').map((item) => item.trim()).filter(Boolean);
  const findings = await scanPaths(process.cwd(), allowedIdentities);
  if (findings.length) {
    for (const finding of findings) console.error(`${finding.file}: ${finding.message}`);
    process.exitCode = 1;
    return;
  }
  console.log('No project-specific residue found in distributable files.');
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) await main();
