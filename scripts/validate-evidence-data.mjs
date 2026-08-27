import { pathToFileURL } from 'node:url';

import { routes, sources } from '../src/config/index.ts';
import { facts } from '../src/data/facts.ts';
import { media } from '../src/data/media.ts';
import { validateEvidenceBundle } from '../src/data/validation.ts';

export function validateEvidenceData() {
  return validateEvidenceBundle({ facts, media, routes, sources });
}

function main() {
  const errors = validateEvidenceData();
  if (errors.length) {
    for (const error of errors) console.error(error);
    process.exitCode = 1;
    return;
  }
  console.log(`Evidence data valid (${facts.length} facts, ${media.length} media records, ${sources.length} sources).`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
