# Starter Setup

## 1. Create an independent repository

Use the private GitHub template action, or clone the starter into a new directory and immediately replace its remote with the new project's repository. Do not deploy directly from the starter repository.

## 2. Install and verify the neutral baseline

```bash
npm install
npm run verify
```

Do not continue if the neutral baseline fails.

## 3. Replace project configuration

Edit these files:

- `src/config/site.config.ts`: name, canonical origin, description, publisher, brand paths, and disclaimer.
- `src/config/navigation.config.ts`: approved published navigation only.
- `src/config/routes.config.ts`: page identity, path, metadata, publication, and sitemap state.
- `src/config/sources.config.ts`: project-owned sources with evidence metadata.
- `src/config/features.config.ts`: optional integrations; all begin disabled.

Replace `public/brand/logo.svg` and `public/brand/favicon.svg` with owned assets. Do not reuse another project's brand files.

## 4. Add content through a bounded template

Choose the template that matches the verified user task:

- `HomePage.astro`: project identity and approved paths.
- `AnswerPage.astro`: one bounded question.
- `GuidePage.astro`: a reproducible procedure.
- `TimelinePage.astro`: released, announced, and unknown states.
- `EntityIndexPage.astro`: verified repeatable records with an explicit coverage boundary.

Keep the route unpublished and `noindex` until its required facts, sources, internal links, and update owner are complete.

## 5. Enable optional integrations

Analytics requires both `features.analytics = true` and a deployment environment value for `PUBLIC_GA4_ID`. Advertising is disabled by default and has no bundled provider script or placement ID.

## 6. Verify before release

```bash
RESIDUE_ALLOWED_IDENTITY="Your Game Name" npm run verify
```

`RESIDUE_ALLOWED_IDENTITY` allows only the current consuming game's name. It does not permit copied domains, analytics IDs, or other project identities.

Then complete the release-specific GitHub, hosting, domain, robots, sitemap, canonical, analytics, and Search Console verification outside this starter.
