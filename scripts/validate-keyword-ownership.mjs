import { pathToFileURL } from 'node:url';

import { routes } from '../src/config/routes.config.ts';
import { keywords } from '../src/data/keywords.ts';
import { researchBacklog } from '../src/data/research-backlog.ts';
import { validateKeywordOwnership } from '../src/data/validation.ts';

export function validateKeywordData() {
  return validateKeywordOwnership(keywords, routes, researchBacklog);
}

function main() {
  const errors = validateKeywordData();
  if (errors.length) {
    for (const error of errors) console.error(error);
    process.exitCode = 1;
    return;
  }
  const owned = keywords.filter((record) => record.owner !== 'RESEARCH_BACKLOG').length;
  console.log(`Keyword ownership valid (${owned} route-owned clusters, ${researchBacklog.length} research tasks).`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
