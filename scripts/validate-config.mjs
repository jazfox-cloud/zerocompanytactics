import { pathToFileURL } from 'node:url';

const evidenceClasses = new Set(['OFFICIAL', 'FIRST_HAND', 'COMMUNITY_SIGNAL', 'SEARCH_SIGNAL', 'UNKNOWN']);

export function validateConfig(bundle) {
  const errors = [];

  try {
    const origin = new URL(bundle.site.origin);
    if (!['http:', 'https:'].includes(origin.protocol)) throw new Error('protocol');
  } catch {
    errors.push('site.origin must be an absolute URL');
  }

  if (!bundle.site.name?.trim() || !bundle.site.description?.trim()) {
    errors.push('site identity is incomplete');
  }

  const configuredPaths = new Set(bundle.routes.map((route) => route.path));
  for (const item of bundle.navigation) {
    if (!configuredPaths.has(item.href)) errors.push(`navigation href is not configured: ${item.href}`);
  }

  for (const route of bundle.routes) {
    if (route.published && (!route.title?.trim() || !route.description?.trim())) {
      errors.push(`published route metadata is incomplete: ${route.id}`);
    }
  }

  for (const source of bundle.sources) {
    if (!evidenceClasses.has(source.evidenceClass)) errors.push(`source evidence class is invalid: ${source.id}`);
    if (!source.url || !source.lastVerified || !source.gameVersion) errors.push(`source metadata is incomplete: ${source.id}`);
  }

  return [...new Set(errors)];
}

async function main() {
  const { configBundle } = await import('../src/config/index.ts');
  const errors = validateConfig(configBundle);
  if (errors.length) {
    for (const error of errors) console.error(error);
    process.exitCode = 1;
    return;
  }
  console.log('Configuration valid.');
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await main();
}
