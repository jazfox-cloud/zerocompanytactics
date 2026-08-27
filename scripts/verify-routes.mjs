import { pathToFileURL } from 'node:url';

export function verifyRoutes(routes, navigation) {
  const errors = [];
  const ids = new Set();
  const paths = new Set();

  for (const route of routes) {
    if (ids.has(route.id)) errors.push(`duplicate route id: ${route.id}`);
    if (paths.has(route.path)) errors.push(`duplicate route path: ${route.path}`);
    ids.add(route.id);
    paths.add(route.path);

    if (route.published && (!route.title?.trim() || !route.description?.trim())) {
      errors.push(`published route metadata is incomplete: ${route.id}`);
    }
    if (!route.published && route.sitemap) errors.push(`unpublished route cannot enter sitemap: ${route.id}`);
  }

  const routeByPath = new Map(routes.map((route) => [route.path, route]));
  for (const item of navigation) {
    const route = routeByPath.get(item.href);
    if (!route) errors.push(`navigation target is not configured: ${item.href}`);
    else if (!route.published) errors.push(`navigation target is not published: ${item.href}`);
  }

  return [...new Set(errors)];
}

async function main() {
  const { navigation, routes } = await import('../src/config/index.ts');
  const errors = verifyRoutes(routes, navigation);
  if (errors.length) {
    for (const error of errors) console.error(error);
    process.exitCode = 1;
    return;
  }
  console.log('Route contract valid.');
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) await main();
