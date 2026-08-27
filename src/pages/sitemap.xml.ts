import type { APIRoute } from 'astro';
import { routes } from '../config/routes.config.ts';
import { siteConfig } from '../config/site.config.ts';

export const GET: APIRoute = () => {
  const urls = routes
    .filter((route) => route.published && route.sitemap)
    .map((route) => `<url><loc>${new URL(route.path, siteConfig.origin)}</loc></url>`)
    .join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
