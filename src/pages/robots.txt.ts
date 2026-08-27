import type { APIRoute } from 'astro';
import { routes } from '../config/routes.config.ts';
import { siteConfig } from '../config/site.config.ts';

export const GET: APIRoute = () => {
  const hasPublishedContent = routes.some((route) => route.kind === 'content' && route.releaseState === 'PUBLISHED' && route.published);
  const policy = hasPublishedContent
    ? `User-agent: *\nAllow: /\nSitemap: ${new URL('/sitemap.xml', siteConfig.origin)}\n`
    : 'User-agent: *\nDisallow: /\n';
  return new Response(policy, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
