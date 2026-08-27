# Game Guide Starter

A private, evidence-first Astro starter for independent game guide sites.

## What it provides

- Typed configuration for site identity, routes, navigation, sources, and optional features.
- Responsive shell with canonical, social metadata, optional analytics, and structured-data support.
- Evidence badges, verification dates, source lists, breadcrumbs, quick answers, and related links.
- Home, answer, procedural guide, timeline, and entity-index templates.
- Fail-closed checks for configuration, routes, project residue, types, tests, and production build.

## Ownership boundary

The starter owns reusable mechanisms. Each generated project owns its game facts, keyword decisions, page inventory, sources, brand, assets, datasets, analytics, hosting, domain, and release authority.

Only the neutral homepage is published in the starter. Demonstration routes are built with `noindex` and remain absent from navigation and sitemap until a consuming project explicitly approves them.

## Commands

```bash
npm install
npm run dev
npm run verify
```

Read [SETUP.md](SETUP.md) before replacing configuration, and complete [TEMPLATE-CHECKLIST.md](TEMPLATE-CHECKLIST.md) before any release.
