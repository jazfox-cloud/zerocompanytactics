import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

import { routes } from '../src/config/routes.config.ts';
import { siteConfig } from '../src/config/site.config.ts';
import { media } from '../src/data/media.ts';
import { sources } from '../src/config/sources.config.ts';

const contentRoutes = routes.filter((route) => route.kind === 'content');
const oldIdentity = /example game guide|wardogs|dragon\s*sword|dragonswordguide|resonance\s+guide|aliens[\s-]*fireteam/gi;

function htmlFileForRoute(distRoot, routePath) {
  if (routePath === '/') return path.join(distRoot, 'index.html');
  return path.join(distRoot, routePath.replace(/^\//, ''), 'index.html');
}

function decode(value = '') {
  return value.replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&#39;', "'");
}

function extract(html, pattern) {
  return decode(html.match(pattern)?.[1]?.trim() ?? '');
}

export function validateContentPageHtml(html, { routePath, expectedLinks = [], expectedMedia, expectedTrailer = false } = {}) {
  const errors = [];
  const title = extract(html, /<title>([^<]*)<\/title>/i);
  const description = extract(html, /<meta\s+name="description"\s+content="([^"]*)"/i);
  const expectedCanonical = new URL(routePath, siteConfig.origin).toString();
  const h1Count = html.match(/<h1(?:\s|>)/gi)?.length ?? 0;

  if (!title) errors.push('title is missing');
  if (!description) errors.push('description is missing');
  if (h1Count !== 1) errors.push(`page must contain exactly one h1 (found ${h1Count})`);
  if (!/<meta\s+name="robots"\s+content="noindex, nofollow"/i.test(html)) errors.push('local-only page is missing noindex');
  if (!html.includes(`rel="canonical" href="${expectedCanonical}"`)) errors.push(`self canonical is missing: ${expectedCanonical}`);
  if (oldIdentity.test(html)) errors.push('old project identity appears in built HTML');
  oldIdentity.lastIndex = 0;

  for (const href of expectedLinks) {
    if (!html.includes(`href="${href}"`)) errors.push(`expected link is missing: ${href}`);
  }

  for (const faviconHref of ['/favicon.ico?v=3', '/brand/favicon-32.png?v=3', '/brand/favicon-16.png?v=3', '/brand/favicon-192.png', '/brand/favicon-512.png', '/brand/favicon-192.png?v=3']) {
    if (!html.includes(`href="${faviconHref}"`)) errors.push(`favicon declaration is missing: ${faviconHref}`);
  }

  if (expectedTrailer) {
    if (!html.includes('https://www.youtube-nocookie.com/embed/WxLUZ1omFA8?rel=0')) errors.push('official trailer privacy-enhanced embed is missing');
    if (!/<iframe[^>]+loading="lazy"/i.test(html)) errors.push('official trailer must load lazily');
    if (!html.includes('title="STAR WARS Zero Company official announcement trailer"')) errors.push('official trailer title is missing');
    if (!html.includes('href="https://www.youtube.com/watch?v=WxLUZ1omFA8"')) errors.push('official trailer YouTube fallback is missing');
    if (!/Watch on YouTube/i.test(html)) errors.push('official trailer fallback label is missing');
  }

  if (expectedMedia) {
    const imagePattern = new RegExp(`<img[^>]+src="${expectedMedia.assetPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^>]*>`, 'i');
    const image = html.match(imagePattern)?.[0] ?? '';
    if (!image) errors.push(`official image is not rendered: ${expectedMedia.assetPath}`);
    if (image && !image.includes(`width="${expectedMedia.width}"`)) errors.push(`official image width is missing: ${expectedMedia.id}`);
    if (image && !image.includes(`height="${expectedMedia.height}"`)) errors.push(`official image height is missing: ${expectedMedia.id}`);
    if (image && !image.includes(`alt="${expectedMedia.alt}"`)) errors.push(`official image alt is missing: ${expectedMedia.id}`);
    const source = sources.find((record) => record.id === expectedMedia.sourceId);
    if (!html.includes(expectedMedia.attribution)) errors.push(`visible media attribution is missing: ${expectedMedia.id}`);
    if (!source || !html.includes(`href="${source.url}"`)) errors.push(`official media source link is missing: ${expectedMedia.id}`);
    if (!/View official source/i.test(html)) errors.push(`official source fallback label is missing: ${expectedMedia.id}`);
  }

  return errors;
}

export async function validateBuiltOutput(distRoot = path.join(process.cwd(), 'dist')) {
  const errors = [];
  const metadata = [];
  const expectedLinks = {
    '/': ['/classes/', '/operators/', '/guides/difficulty-permadeath/', '/guides/squad-size-operators/'],
    '/classes/': ['/operators/'],
    '/operators/': ['/classes/'],
    '/guides/difficulty-permadeath/': ['/classes/', '/guides/squad-size-operators/'],
    '/guides/squad-size-operators/': ['/operators/', '/classes/'],
  };

  for (const route of contentRoutes) {
    const file = htmlFileForRoute(distRoot, route.path);
    let html;
    try {
      html = await readFile(file, 'utf8');
    } catch {
      errors.push(`built route is missing: ${route.path}`);
      continue;
    }
    const expectedMedia = media.find((record) => record.placement === route.path);
    for (const error of validateContentPageHtml(html, { routePath: route.path, expectedLinks: expectedLinks[route.path], expectedMedia, expectedTrailer: route.path === '/' })) {
      errors.push(`${route.path}: ${error}`);
    }
    metadata.push({ route: route.path, title: extract(html, /<title>([^<]*)<\/title>/i), description: extract(html, /<meta\s+name="description"\s+content="([^"]*)"/i) });
    if (expectedMedia) {
      try { await access(path.join(distRoot, expectedMedia.assetPath.replace(/^\//, ''))); }
      catch { errors.push(`${route.path}: referenced media file is absent from dist: ${expectedMedia.assetPath}`); }
    }
  }

  for (const field of ['title', 'description']) {
    const seen = new Map();
    for (const item of metadata) {
      if (seen.has(item[field])) errors.push(`duplicate ${field}: ${seen.get(item[field])} and ${item.route}`);
      seen.set(item[field], item.route);
    }
  }

  const robots = await readFile(path.join(distRoot, 'robots.txt'), 'utf8').catch(() => '');
  if (robots.trim() !== 'User-agent: *\nDisallow: /') errors.push('robots.txt does not enforce the local-only crawl block');
  const sitemap = await readFile(path.join(distRoot, 'sitemap.xml'), 'utf8').catch(() => '');
  if (/<url>/i.test(sitemap)) errors.push('local-only sitemap contains a URL');
  const notFound = await readFile(path.join(distRoot, '404.html'), 'utf8').catch(() => '');
  if (!notFound) errors.push('404.html is missing');
  else if (!/<meta\s+name="robots"\s+content="noindex, nofollow"/i.test(notFound)) errors.push('404.html is missing noindex');

  return [...new Set(errors)];
}

async function main() {
  const errors = await validateBuiltOutput();
  if (errors.length) {
    for (const error of errors) console.error(error);
    process.exitCode = 1;
    return;
  }
  console.log(`Built output valid (${contentRoutes.length} local-only content routes, ${media.length} visibly contracted media assets).`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) await main();
