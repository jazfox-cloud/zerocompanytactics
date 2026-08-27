import test from 'node:test';
import assert from 'node:assert/strict';
import { verifyRoutes } from '../scripts/verify-routes.mjs';

const baseRoutes = [
  { id: 'home', path: '/', title: 'Home', description: 'Home description', published: true, sitemap: true },
  { id: 'guide', path: '/guide/', title: 'Guide', description: 'Guide description', published: false, sitemap: false },
];

test('accepts a consistent route contract', () => {
  assert.deepEqual(verifyRoutes(baseRoutes, [{ label: 'Home', href: '/' }]), []);
});

test('rejects duplicate route paths', () => {
  const routes = [...baseRoutes, { ...baseRoutes[0], id: 'duplicate' }];
  assert.ok(verifyRoutes(routes, []).includes('duplicate route path: /'));
});

test('rejects published routes without metadata', () => {
  const routes = structuredClone(baseRoutes);
  routes[0].description = '';
  assert.ok(verifyRoutes(routes, []).includes('published route metadata is incomplete: home'));
});

test('rejects sitemap-enabled unpublished routes', () => {
  const routes = structuredClone(baseRoutes);
  routes[1].sitemap = true;
  assert.ok(verifyRoutes(routes, []).includes('unpublished route cannot enter sitemap: guide'));
});

test('rejects navigation to unpublished routes', () => {
  assert.ok(verifyRoutes(baseRoutes, [{ label: 'Guide', href: '/guide/' }]).includes('navigation target is not published: /guide/'));
});
