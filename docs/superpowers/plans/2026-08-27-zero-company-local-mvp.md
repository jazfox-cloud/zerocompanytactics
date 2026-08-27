# Zero Company Local MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and locally verify the five-route Zero Company Field Guide MVP from the approved evidence-first design.

**Architecture:** Consume `game-guide-starter@51b7b77` as a tested Astro baseline, then replace all identity and demonstration content with project-owned configuration and canonical source/fact/media/keyword records. Static pages resolve records through typed selectors, while fail-closed validators and generated-output tests prove route ownership, evidence linkage, visible official media, official links, metadata, and non-release state.

**Tech Stack:** Astro 5.13.5, TypeScript 5.9.2, Node.js built-in test runner, static HTML/CSS, Sharp through Astro for image inspection only when already available transitively.

**Spec:** `docs/superpowers/specs/2026-08-27-zero-company-field-guide-design.md`

## Global Constraints

- Reuse `/Users/jazfox/Documents/Codex/2026-08-24/game-guide-starter` at commit `51b7b77`; never copy its `.git`, `node_modules`, `.astro`, or `dist` directories.
- The only working identity is `Zero Company Field Guide`; the canonical origin remains `https://zero-company-field-guide.invalid` and blocks release.
- Build exactly `/`, `/classes/`, `/operators/`, `/guides/difficulty-permadeath/`, and `/guides/squad-size-operators/` as the local MVP, plus structural legal/error routes.
- Every MVP route is locally rendered with `noindex`; no production deployment, analytics, advertising, Search Console, indexing, or domain configuration is allowed.
- Search/community/competitor signals never become game facts. Render only `OFFICIAL` or eligible `FIRST_HAND` facts with version/date scope.
- The home hero must visibly render game-specific official-hosted media, a clearly labeled official destination, and visible attribution. A file existing on disk is not sufficient.
- Best builds, tier lists, complete numerical datasets, device performance, and mission solutions remain in research backlog and have no route.
- Images must have nonzero dimensions, useful alt text, a visible source caption, and an official-page fallback link.
- Do not copy another game's routes, facts, assets, domain, analytics IDs, brand, or content plan.

---

## File Structure

Project-owned configuration and records:

- `src/config/schema.ts` — site, route, source, fact, media, keyword, and research-task interfaces.
- `src/config/{site,navigation,routes,sources,features}.config.ts` — consuming-project configuration.
- `src/data/{facts,media,keywords,research-backlog}.ts` — canonical records.
- `src/data/selectors.ts` — ID resolution and eligible-record selection.
- `src/data/validation.ts` — pure validation functions shared by scripts and tests.

Presentation:

- `src/components/game/{OfficialMedia,TacticalTaskBoard,ClassDecisionTable,OperatorDossier,VerificationPanel}.astro` — Zero Company presentation components.
- `src/templates/{HomePage,EntityIndexPage,AnswerPage}.astro` — adapted reusable composition templates.
- `src/pages/index.astro`, `src/pages/classes/index.astro`, `src/pages/operators/index.astro`, and two `src/pages/guides/*/index.astro` files — route owners.
- `src/styles/global.css` and `public/brand/*` — independent visual identity.
- `public/media/*` — locally reviewed official-hosted evaluation images, never starter assets.

Verification:

- `scripts/{validate-config,validate-evidence-data,validate-keyword-ownership,validate-media-assets,verify-routes,verify-built-output,scan-project-residue}.mjs`.
- `tests/{config,evidence-data,keyword-ownership,media-assets,pages,built-output,residue,routes,shell,templates}.test.mjs`.

## Task 1: Instantiate and prove the starter baseline

**Files:**
- Create mechanically: all starter-controlled files except transient/build/VCS directories
- Preserve: `docs/superpowers/specs/2026-08-27-zero-company-field-guide-design.md`
- Preserve: `docs/superpowers/plans/2026-08-27-zero-company-local-mvp.md`

**Interfaces:**
- Consumes: clean `game-guide-starter@51b7b77`
- Produces: locally installable Astro baseline with the starter test suite unchanged

- [ ] **Step 1: Reconfirm both repository boundaries**

Run:

```bash
git -C /Users/jazfox/Documents/Codex/2026-08-24/game-guide-starter status --short
git -C /Users/jazfox/Documents/Codex/2026-08-24/game-guide-starter rev-parse HEAD
git status --short
```

Expected: starter clean at `51b7b77`; consumer contains only approved planning files.

- [ ] **Step 2: Copy the tested baseline without transient or VCS state**

Run a mechanical copy that excludes `.git`, `.astro`, `dist`, `node_modules`, and starter-only verification history. Preserve the consumer `docs/` folder.

Expected: `package.json`, `src/`, `public/`, `scripts/`, `tests/`, `README.md`, `SETUP.md`, and `TEMPLATE-CHECKLIST.md` exist in the consumer; no nested `.git` exists.

- [ ] **Step 3: Install the locked dependencies**

Run:

```bash
npm install
```

Expected: installation exits 0 using the copied lockfile.

- [ ] **Step 4: Verify the neutral baseline before customization**

Run:

```bash
npm run verify
```

Expected: starter config, route, residue, type, test, and build checks all pass before project edits.

- [ ] **Step 5: Commit the isolated baseline**

```bash
git add .gitignore package.json package-lock.json astro.config.mjs tsconfig.json src public scripts tests README.md SETUP.md TEMPLATE-CHECKLIST.md
git commit -m "chore: consume evidence-first game guide starter"
```

## Task 2: Define Zero Company configuration and route ownership

**Files:**
- Modify: `src/config/schema.ts`
- Modify: `src/config/site.config.ts`
- Modify: `src/config/routes.config.ts`
- Modify: `src/config/navigation.config.ts`
- Modify: `src/config/features.config.ts`
- Modify: `astro.config.mjs`
- Modify: `tests/config.test.mjs`
- Modify: `tests/routes.test.mjs`

**Interfaces:**
- Consumes: starter `SiteConfig`, `RouteConfig`, and `FeatureConfig`
- Produces: `getRoute(id: RouteId): RouteConfig | undefined` and five explicit MVP route records

- [ ] **Step 1: Write failing identity and route tests**

Add assertions equivalent to:

```js
assert.equal(site.name, 'Zero Company Field Guide');
assert.equal(site.origin, 'https://zero-company-field-guide.invalid');
assert.deepEqual(features, { analytics: false, advertising: false, localization: false, sitemap: true });
assert.deepEqual(
  routes.filter((route) => route.kind === 'content').map((route) => route.path),
  ['/', '/classes/', '/operators/', '/guides/difficulty-permadeath/', '/guides/squad-size-operators/'],
);
assert.ok(routes.every((route) => route.releaseState === 'LOCAL_ONLY'));
```

- [ ] **Step 2: Run the targeted tests and confirm RED**

Run:

```bash
node --test tests/config.test.mjs tests/routes.test.mjs
```

Expected: FAIL because the starter still has `Example Game Guide` and lacks `kind`/`releaseState`.

- [ ] **Step 3: Add the minimal route release model and configuration**

Extend `RouteConfig` with:

```ts
export type ReleaseState = 'LOCAL_ONLY' | 'REVIEW_READY' | 'PUBLISHED';
export type RouteKind = 'content' | 'legal' | 'error';
export type RouteId = 'home' | 'classes' | 'operators' | 'difficulty-permadeath' | 'squad-size-operators' | 'privacy' | 'terms' | 'not-found';

export interface RouteConfig {
  id: RouteId;
  path: string;
  title: string;
  description: string;
  kind: RouteKind;
  releaseState: ReleaseState;
  published: boolean;
  sitemap: boolean;
}
```

Set the invalid origin, independent disclaimer, five content routes, legal routes, and disabled features. Navigation contains Home, Classes, Operators, Difficulty & Permadeath, and Squad Planning only. Every content route is `LOCAL_ONLY` with `published: false`; sitemap generation includes only routes that are both `PUBLISHED` and `published`, leaving the local sitemap empty by design. Retaining the existing `published` field keeps starter templates fail-closed while `releaseState` distinguishes local, review, and live workflow state.

- [ ] **Step 4: Run the targeted tests and confirm GREEN**

Run:

```bash
node --test tests/config.test.mjs tests/routes.test.mjs
```

Expected: PASS.

- [ ] **Step 5: Commit configuration**

```bash
git add astro.config.mjs src/config tests/config.test.mjs tests/routes.test.mjs
git commit -m "feat: define Zero Company route and release configuration"
```

## Task 3: Add canonical evidence, media, keyword, and research records

**Files:**
- Modify: `src/config/schema.ts`
- Modify: `src/config/sources.config.ts`
- Create: `src/data/facts.ts`
- Create: `src/data/media.ts`
- Create: `src/data/keywords.ts`
- Create: `src/data/research-backlog.ts`
- Create: `src/data/selectors.ts`
- Create: `src/data/validation.ts`
- Create: `tests/evidence-data.test.mjs`
- Create: `tests/keyword-ownership.test.mjs`

**Interfaces:**
- Produces: `FactRecord`, `MediaRecord`, `KeywordRecord`, `ResearchTask`
- Produces: `getFact(id)`, `getMedia(id)`, `getSources(ids)`, `getFacts(ids)`, `getVerificationDate(records)`
- Produces: `validateEvidenceBundle(bundle): string[]` and `validateKeywordOwnership(keywords, routes, backlog): string[]`

- [ ] **Step 1: Write failing integrity tests**

Cover real failure cases:

```js
assert.deepEqual(validateEvidenceBundle(validBundle), []);
assert.match(validateEvidenceBundle(bundleWithDanglingSource).join('\n'), /missing source/);
assert.match(validateEvidenceBundle(bundleWithUnknownRequiredValue).join('\n'), /required value/);
assert.deepEqual(validateKeywordOwnership(validKeywords, routes, backlog), []);
assert.match(validateKeywordOwnership(duplicateOwners, routes, backlog).join('\n'), /multiple owners/);
assert.match(validateKeywordOwnership(backlogWithRoute, routes, backlog).join('\n'), /backlog.*route/);
```

- [ ] **Step 2: Run the new tests and confirm RED**

Run:

```bash
node --test tests/evidence-data.test.mjs tests/keyword-ownership.test.mjs
```

Expected: FAIL because the modules do not exist.

- [ ] **Step 3: Implement focused canonical record types**

Use these contracts:

```ts
export interface FactRecord {
  id: `fact:${string}`;
  label: string;
  value: string | number | boolean | string[];
  required: boolean;
  sourceIds: string[];
  evidenceClass: EvidenceClass;
  gameVersion: string;
  lastVerified: string;
  publicAllowed: boolean;
  editorialJudgment: boolean;
  consumers: string[];
  boundary?: string;
}

export interface MediaRecord {
  id: `media:${string}`;
  assetPath: string;
  sourceId: string;
  width: number;
  height: number;
  alt: string;
  placement: string;
  attribution: string;
  lastVerified: string;
  publicAllowed: boolean;
  rightsNote: string;
}

export interface KeywordRecord {
  id: `keyword:${string}`;
  representative: string;
  demandSource: 'SEARCH_SIGNAL';
  userTask: string;
  owner: string | 'RESEARCH_BACKLOG';
  evidenceCompleteness: 'COMPLETE' | 'PARTIAL' | 'BLOCKED';
  directAnswer: 'SATISFIED' | 'RESEARCH_REQUIRED';
  updateTrigger: string;
}
```

Populate only facts that can resolve to the five cited official sources. Preserve exact unsupported fields in executable research tasks rather than giving them plausible values.

- [ ] **Step 4: Implement selectors and fail-closed validation**

Selectors throw on missing canonical IDs. Validation checks ISO dates, source resolution, source/fact evidence compatibility, required nonempty values, `publicAllowed`, consumer route existence, positive media dimensions, media source linkage, unique keyword owners, and backlog/route exclusivity.

- [ ] **Step 5: Run the integrity tests and confirm GREEN**

Run:

```bash
node --test tests/evidence-data.test.mjs tests/keyword-ownership.test.mjs
```

Expected: PASS with both valid fixtures accepted and invalid fixtures rejected for the intended reasons.

- [ ] **Step 6: Commit the canonical data layer**

```bash
git add src/config/schema.ts src/config/sources.config.ts src/data tests/evidence-data.test.mjs tests/keyword-ownership.test.mjs
git commit -m "feat: add canonical evidence and keyword records"
```

## Task 4: Acquire and validate official-hosted evaluation media

**Files:**
- Create: `public/media/zero-company-keyart.jpg`
- Create: `public/media/operators-squad-lineup.jpg`
- Create: `public/media/tactical-gameplay.jpg`
- Create: `scripts/validate-media-assets.mjs`
- Create: `tests/media-assets.test.mjs`
- Modify: `src/data/media.ts`
- Modify: `package.json`

**Interfaces:**
- Consumes: `MediaRecord[]`
- Produces: three locally stored evaluation images with exact official source-page records
- Produces: `validate:media` command checking file existence, MIME, dimensions, and record agreement

- [ ] **Step 1: Write failing media validation tests**

Assert that every record maps to a real JPEG, decoded dimensions equal the record, dimensions are positive, alt text is nonempty, source ID resolves, attribution contains `Electronic Arts`, and the rights note keeps production eligibility separate.

- [ ] **Step 2: Run the media test and confirm RED**

Run:

```bash
node --test tests/media-assets.test.mjs
```

Expected: FAIL because the three files and validator do not exist.

- [ ] **Step 3: Download the exact first-party assets**

Use these official-hosted inputs and preserve them only in the local consumer:

```text
https://drop-assets.ea.com/images/3ta1VjG1HUkaPlCORm5qtB/ce382b0196fc844657786516ccc1fef8/SWZC-keyart-16x9.jpg
https://drop-assets.ea.com/images/3a2P3afAGVeox6QuKnK439/6bdad70c0ea8a313c32f45ae1049be55/SWZC_Operators_SquadLineUp_Still_16x9.jpg
https://drop-assets.ea.com/images/2jXO2SMYhMFJQ5CeIZ6cGP/3d98d9c34428637c4fef3092c6a2adef/7__1_.jpg
```

Source all three through official EA page records, never through a competitor URL. Check HTTP content type and decode each file before accepting it.

- [ ] **Step 4: Implement media validation and update the verify chain**

The validator reads JPEG dimensions, compares them with `MediaRecord`, verifies `/media/` asset paths, and exits nonzero for missing, zero-sized, mismatched, or unrecorded assets. Add `validate:media` before `check` in `npm run verify`.

- [ ] **Step 5: Run media validation and confirm GREEN**

Run:

```bash
npm run validate:media
node --test tests/media-assets.test.mjs
```

Expected: both commands PASS with three decoded images and no orphan records/files.

- [ ] **Step 6: Commit the reviewed media set**

```bash
git add public/media src/data/media.ts scripts/validate-media-assets.mjs tests/media-assets.test.mjs package.json package-lock.json
git commit -m "feat: add sourced Zero Company media"
```

## Task 5: Build the tactical shell and visible official-media contract

**Files:**
- Modify: `src/layouts/BaseLayout.astro`
- Modify: `src/components/shell/SiteHeader.astro`
- Modify: `src/components/shell/SiteFooter.astro`
- Create: `src/components/game/OfficialMedia.astro`
- Create: `src/components/game/TacticalTaskBoard.astro`
- Create: `src/components/game/VerificationPanel.astro`
- Modify: `src/styles/global.css`
- Replace: `public/brand/logo.svg`
- Replace: `public/brand/favicon.svg`
- Modify: `tests/shell.test.mjs`
- Modify: `tests/templates.test.mjs`

**Interfaces:**
- `OfficialMedia({ media: MediaRecord, source: SourceRecord, priority?: boolean })`
- `TacticalTaskBoard({ links: { label; href; description; status }[] })`
- `VerificationPanel({ date; evidence; boundary })`

- [ ] **Step 1: Write failing shell/media contract tests**

Assert that `OfficialMedia` renders `<img width height alt>`, `<figcaption>`, an attribution link to the official source, and a visible `View official source` fallback. Assert the shell contains the independent disclaimer and official game link but no EA/Star Wars logo asset.

- [ ] **Step 2: Run targeted component tests and confirm RED**

Run:

```bash
node --test tests/shell.test.mjs tests/templates.test.mjs
```

Expected: FAIL because the game components and required attributes do not exist.

- [ ] **Step 3: Implement the minimal components and independent brand**

Render intrinsic dimensions directly from `MediaRecord`; keep attribution visible rather than in hidden metadata. The SVG brand uses the letters `ZC` plus an original coordinate-grid motif and contains no official logo path. The shell exposes a skip link, keyboard-visible focus, responsive navigation, independent disclaimer, and external official destination.

- [ ] **Step 4: Apply the tactical visual tokens**

Define charcoal canvas, sand panels, warning orange, cool cyan, angular clipped corners, high-contrast text, 44px minimum interactive targets, responsive one-column fallbacks, reduced-motion handling, and overflow-safe media. Do not import remote fonts or scripts.

- [ ] **Step 5: Run targeted component tests and confirm GREEN**

Run:

```bash
node --test tests/shell.test.mjs tests/templates.test.mjs
```

Expected: PASS.

- [ ] **Step 6: Commit the shell**

```bash
git add src/layouts src/components/shell src/components/game src/styles public/brand tests/shell.test.mjs tests/templates.test.mjs
git commit -m "feat: add tactical guide shell and official media contract"
```

## Task 6: Build the task-first home page

**Files:**
- Modify: `src/templates/HomePage.astro`
- Modify: `src/pages/index.astro`
- Create: `tests/pages.test.mjs`

**Interfaces:**
- Consumes: canonical home facts, `media:official-keyart`, official source records, and four MVP task links
- Produces: `/` with task entry before overview content

- [ ] **Step 1: Write the failing home-page source test**

Assert that the page resolves records by ID, passes official media to the template, renders Classes and Operators as primary actions, and orders `TacticalTaskBoard` before the game-overview section. Reject hard-coded copied facts in the template.

- [ ] **Step 2: Run the page test and confirm RED**

Run:

```bash
node --test tests/pages.test.mjs
```

Expected: FAIL against the neutral starter home.

- [ ] **Step 3: Implement the home composition**

The hero contains the independent identity, direct official destination, key art, visible attribution, current verification date, and evidence boundary. The task board links to Classes, Operators, Difficulty & Permadeath, and Squad Planning. Official game scope follows the task board; research backlog is summarized without linking to nonexistent routes.

- [ ] **Step 4: Run the page test and confirm GREEN**

Run:

```bash
node --test tests/pages.test.mjs
```

Expected: PASS.

- [ ] **Step 5: Commit the home page**

```bash
git add src/templates/HomePage.astro src/pages/index.astro tests/pages.test.mjs
git commit -m "feat: build task-first Zero Company home"
```

## Task 7: Build Classes and Operators entity owners

**Files:**
- Modify: `src/templates/EntityIndexPage.astro`
- Create: `src/components/game/ClassDecisionTable.astro`
- Create: `src/components/game/OperatorDossier.astro`
- Create: `src/pages/classes/index.astro`
- Create: `src/pages/operators/index.astro`
- Modify: `tests/pages.test.mjs`

**Interfaces:**
- Consumes: eligible `FactRecord[]`, source records, class/operator coverage boundary, and `media:operators-lineup`
- Produces: `/classes/` and `/operators/` with no generated detail routes

- [ ] **Step 1: Write failing route-owner tests**

Assert one H1 per source page, explicit coverage wording, canonical fact selectors, source list, verification date, no `best`/`tier` claim, no dynamic detail route, and visible operator lineup media with official source link.

- [ ] **Step 2: Run the page test and confirm RED**

Run:

```bash
node --test tests/pages.test.mjs
```

Expected: FAIL because both route owners are missing.

- [ ] **Step 3: Implement Classes as a bounded decision table**

Render only eligible records. Show official role/description and verified specialization fields; show the coverage boundary above the table. Do not use “all classes” in the title/H1 unless the canonical dataset validation marks roster coverage complete.

- [ ] **Step 4: Implement Operators as canonical dossiers**

Render only eligible operator records with source-backed summaries. Feature Hawks inside the owner page without creating `/operators/hawks/`. Omit unlock, bond, death, compatibility, and build fields that do not pass.

- [ ] **Step 5: Run the page test and confirm GREEN**

Run:

```bash
node --test tests/pages.test.mjs
```

Expected: PASS.

- [ ] **Step 6: Commit the entity owners**

```bash
git add src/templates/EntityIndexPage.astro src/components/game src/pages/classes src/pages/operators tests/pages.test.mjs
git commit -m "feat: add verified classes and operators owners"
```

## Task 8: Build the two bounded mechanics guides

**Files:**
- Modify: `src/templates/AnswerPage.astro`
- Create: `src/pages/guides/difficulty-permadeath/index.astro`
- Create: `src/pages/guides/squad-size-operators/index.astro`
- Modify: `tests/pages.test.mjs`

**Interfaces:**
- Consumes: route-scoped official facts, verification date, source records, related owner links
- Produces: two bounded answer pages with visible version/date/unknown boundaries

- [ ] **Step 1: Write failing mechanics-guide tests**

Assert each guide provides a direct opening answer, exact route scope, `VerificationPanel`, official sources, related Classes/Operators links, and no unsupported universal consequence or invented numeric field.

- [ ] **Step 2: Run the page test and confirm RED**

Run:

```bash
node --test tests/pages.test.mjs
```

Expected: FAIL because the two guide routes are missing.

- [ ] **Step 3: Implement Difficulty & Permadeath**

Resolve official settings/death facts by canonical ID, label exact unknown gameplay consequences, and direct the user to the official source. The page must not convert an unavailable detail into “not supported.”

- [ ] **Step 4: Implement Squad Size & Operators**

Resolve exact eligible squad/HQ facts and explain scope differences only where the official source states them. Omit unresolved numeric limits instead of estimating them.

- [ ] **Step 5: Run the page test and confirm GREEN**

Run:

```bash
node --test tests/pages.test.mjs
```

Expected: PASS.

- [ ] **Step 6: Commit the mechanics guides**

```bash
git add src/templates/AnswerPage.astro src/pages/guides tests/pages.test.mjs
git commit -m "feat: add evidence-bounded mechanics guides"
```

## Task 9: Complete structural pages, robots, sitemap, and residue rules

**Files:**
- Modify: `src/pages/404.astro`
- Modify: `src/pages/privacy/index.astro`
- Modify: `src/pages/terms/index.astro`
- Modify: `src/pages/robots.txt.ts`
- Modify: `src/pages/sitemap.xml.ts`
- Modify: `scripts/scan-project-residue.mjs`
- Modify: `scripts/verify-routes.mjs`
- Modify: `tests/residue.test.mjs`
- Modify: `tests/routes.test.mjs`

**Interfaces:**
- Produces: release-blocked structural output consistent with `LOCAL_ONLY`

- [ ] **Step 1: Write failing structural tests**

Assert robots disallows crawling while all content routes are local-only, sitemap contains no local-only route, 404 is real/noindex, legal pages accurately state no analytics/ads, and residue scanning rejects Example Game, WARDOGS, Resonance, DragonSword, alien-game identities, production analytics IDs, and unapproved hosts.

- [ ] **Step 2: Run structural tests and confirm RED**

Run:

```bash
node --test tests/residue.test.mjs tests/routes.test.mjs
```

Expected: FAIL against starter-only structural assumptions.

- [ ] **Step 3: Implement fail-closed structural behavior**

Robots outputs `Disallow: /` while no route is `PUBLISHED`. Sitemap filters strictly on `releaseState === 'PUBLISHED' && published && sitemap`. Legal pages remain noindex and accurately describe disabled integrations. Residue allowlists only the current independent identity and approved EA/YouTube official hosts.

- [ ] **Step 4: Run structural tests and confirm GREEN**

Run:

```bash
node --test tests/residue.test.mjs tests/routes.test.mjs
```

Expected: PASS.

- [ ] **Step 5: Commit structural safeguards**

```bash
git add src/pages scripts/scan-project-residue.mjs scripts/verify-routes.mjs tests/residue.test.mjs tests/routes.test.mjs
git commit -m "fix: keep local guide output release-blocked"
```

## Task 10: Prove generated output and rendered media/link behavior

**Files:**
- Create: `scripts/validate-evidence-data.mjs`
- Create: `scripts/validate-keyword-ownership.mjs`
- Create: `scripts/verify-built-output.mjs`
- Create: `tests/built-output.test.mjs`
- Modify: `package.json`

**Interfaces:**
- Produces: one `npm run verify` chain that validates records, source output, tests, typecheck, production build, and generated HTML

- [ ] **Step 1: Write failing generated-output tests**

For all five MVP HTML outputs assert status file existence, one H1, unique title/description, invalid self-canonical, `noindex`, expected internal links, and no old identity. For `/`, `/classes/`, and `/operators/`, assert actual `<img>` elements point to existing files, contain intrinsic width/height and alt text, and are adjacent to visible EA attribution plus an official `ea.com` fallback link. Assert hero/task-board ordering in built HTML.

- [ ] **Step 2: Run the output test and confirm RED**

Run:

```bash
npm run build
node --test tests/built-output.test.mjs
```

Expected: FAIL because the output validator and/or required built markers are missing.

- [ ] **Step 3: Implement scripts and complete the verify chain**

Add commands:

```json
{
  "validate:evidence": "node scripts/validate-evidence-data.mjs",
  "validate:keywords": "node scripts/validate-keyword-ownership.mjs",
  "validate:media": "node scripts/validate-media-assets.mjs",
  "validate:output": "node scripts/verify-built-output.mjs",
  "verify": "npm run validate:config && npm run validate:routes && npm run validate:residue && npm run validate:evidence && npm run validate:keywords && npm run validate:media && npm run check && npm test && npm run build && npm run validate:output"
}
```

The output validator parses every expected `dist/**/index.html`, checks the contracts above, verifies local asset paths, and rejects any accidental indexable or unowned route.

- [ ] **Step 4: Run the complete verification chain**

Run:

```bash
RESIDUE_ALLOWED_IDENTITY="Zero Company Field Guide,Zero Company" npm run verify
git diff --check
```

Expected: all validators, Astro check, tests, build, output checks, and whitespace checks exit 0.

- [ ] **Step 5: Start a production preview and inspect rendered pages**

Run:

```bash
npm run preview -- --host 127.0.0.1 --port 4321
```

Inspect `/`, `/classes/`, `/operators/`, and both guides at representative desktop and mobile widths. Confirm loaded images have nonzero intrinsic dimensions, official links open the exact EA pages, captions are visible, task navigation works, focus is visible, 44px targets are usable, there is no horizontal overflow, and the site causes no console errors.

- [ ] **Step 6: Commit local verification tooling and fixes**

```bash
git add package.json package-lock.json scripts tests src public
git commit -m "test: verify Zero Company local MVP output"
```

## Task 11: Record the local evidence boundary

**Files:**
- Create: `docs/verification/2026-08-27-zero-company-local-mvp.md`

**Interfaces:**
- Produces: durable separation of local proof, blocked production state, and starter feedback candidates

- [ ] **Step 1: Write the verification record from fresh command output**

Record exact commit, commands, pass/fail counts, route list, rendered desktop/mobile checks, media file dimensions, official source-link targets, remaining `UNKNOWN` fields, invalid canonical origin, and blocked external actions. List candidate reusable starter improvements without claiming they are already implemented.

- [ ] **Step 2: Re-run the final proof after the record is added**

Run:

```bash
RESIDUE_ALLOWED_IDENTITY="Zero Company Field Guide,Zero Company" npm run verify
git diff --check
git status --short
```

Expected: verification exits 0; only the new verification record is uncommitted.

- [ ] **Step 3: Commit the local verification record**

```bash
git add docs/verification/2026-08-27-zero-company-local-mvp.md
git commit -m "docs: record Zero Company local verification"
```

The resulting state is `LOCAL_VERIFIED / RELEASE_APPROVAL_REQUIRED`. Continue with the separate starter/skill hardening plan; do not deploy.
