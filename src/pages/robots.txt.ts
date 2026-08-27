import type { APIRoute } from 'astro';
import { siteConfig } from '../config/site.config.ts';

export const GET: APIRoute = () => new Response(`User-agent: *\nAllow: /\nSitemap: ${new URL('/sitemap.xml', siteConfig.origin)}\n`, {
  headers: { 'Content-Type': 'text/plain; charset=utf-8' },
});
