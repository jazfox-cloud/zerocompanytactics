import type { RouteConfig } from './schema.ts';

export const routes: RouteConfig[] = [
  {
    id: 'home',
    path: '/',
    title: 'Example Game Guide',
    description: 'A neutral evidence-first game guide starter.',
    published: true,
    sitemap: true,
  },
  {
    id: 'guide',
    path: '/guide/',
    title: 'Example Guide',
    description: 'A neutral procedural guide demonstration.',
    published: false,
    sitemap: false,
  },
  {
    id: 'status',
    path: '/status/',
    title: 'Example Status Timeline',
    description: 'A neutral status and timeline demonstration.',
    published: false,
    sitemap: false,
  },
  {
    id: 'entities',
    path: '/entities/',
    title: 'Example Entity Index',
    description: 'A neutral verified-entity index demonstration.',
    published: false,
    sitemap: false,
  },
];

export function getRoute(id: string) {
  return routes.find((route) => route.id === id);
}
