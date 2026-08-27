# Zero Company Field Guide Local MVP Design

Date: 2026-08-27  
Project: `/Users/jazfox/Documents/ChatGPT/ZeroCompanyGuide`  
Reusable baseline: `/Users/jazfox/Documents/Codex/2026-08-24/game-guide-starter` at `51b7b77`  
Release scope: local build and verification only

## Objective

Build an English, independent guide for *STAR WARS Zero Company* that enters through the high-intent Classes / Operators / Squad decision cluster instead of competing as a generic wiki. The local MVP must map each researched intent to one canonical owner, render only evidence-bounded claims, identify the game with official-hosted media and attribution, and keep unsupported best-build or device-performance claims outside the indexable surface.

The project also acts as a real consumer test for `game-guide-starter`. Generic improvements proven by this build will be proposed back to the starter and `building-evidence-first-game-sites`; Zero Company facts, routes, assets, brand, keywords, and sources will remain project-owned.

## Authorization and boundaries

Authorized now:

- create and edit files inside `ZeroCompanyGuide`;
- install dependencies and run local tests, Astro checks, builds, and previews;
- fetch cited first-party EA pages and official-hosted media for evidence review;
- after the site passes local verification, make narrowly proven reusable changes to the starter and skill requested by the user.

Not authorized:

- create or configure a production domain, GitHub remote, Cloudflare project, DNS, analytics, advertising, Search Console, or indexing;
- push, deploy, or publish;
- present search signals, community claims, or competitor content as game facts;
- claim best classes, best builds, complete numerical data, Steam Deck support, controller quality, mission solutions, or technical performance without versioned first-hand evidence.

## Reuse strategy

Copy the starter into this isolated repository without its `.git`, `node_modules`, `.astro`, or `dist` directories. Preserve these reusable mechanisms:

- Astro 5 static build;
- typed site, route, navigation, source, and feature configuration;
- shared layout, shell, SEO head, evidence components, and bounded page templates;
- fail-closed configuration, route, residue, type, test, and build checks;
- disabled-by-default analytics, advertising, and localization.

Replace all starter identity, content, brand assets, example hosts, route examples, and source placeholders. No ResonanceGuide, WARDOGS, DragonSwordGuide, or starter demonstration facts may remain in distributable output.

## Product identity and visual system

Working independent name: **Zero Company Field Guide**. This is not an official product name and will be accompanied by an independent-site disclaimer. The canonical origin remains `https://zero-company-field-guide.invalid` until the user selects a production domain; that value is a deliberate release blocker.

The visual language is a compact tactical field terminal:

- charcoal and near-black command surfaces;
- sand-colored reading panels;
- restrained warning orange and cool cyan for state markers;
- angular borders, coordinate ticks, dossier labels, and squad-slot motifs;
- condensed system typography with a readable sans-serif body stack;
- no copied Star Wars logo, EA logo, game UI, or another guide site's brand identity.

The above-the-fold area uses one official-hosted Zero Company key-art or squad image with visible `Electronic Arts — official game page` attribution and an `Official game page` action. Media records must preserve the source page, asset URL, dimensions, purpose, verification date, and public-use decision. Official hosting proves provenance, not an unrestricted license; local use is allowed for evaluation, while production eligibility remains a separate review gate.

## Information architecture and keyword ownership

All routes are built locally with `noindex` and excluded from any production release while the canonical origin is invalid. The local sitemap exists only to validate route ownership and must not be submitted.

| Route | Primary user task | Primary keyword owner | Secondary intent merged into owner | Current evidence gate |
|---|---|---|---|---|
| `/` | Choose the correct guide task and understand the official game scope | `star wars zero company` | gameplay, what kind of game, how it works | Official facts available |
| `/classes/` | Understand verified class and specialization choices | `star wars zero company classes` | zero company classes, all classes, exotic classes, weapon specializations | Locally build from verified records; complete-roster wording requires coverage validation |
| `/operators/` | Understand the verified operator roster and roles | `star wars zero company characters` | companions, authored operators, Hawks, set characters | Locally build from verified records; unverified unlock and build fields excluded |
| `/guides/difficulty-permadeath/` | Choose difficulty/permadeath settings and understand documented consequences | `star wars zero company difficulty levels` | character death, squad death, turn off permadeath | Official answer fields only; exact gameplay consequences require source-by-source verification |
| `/guides/squad-size-operators/` | Understand squad/HQ limits and how operators relate to squad planning | `star wars zero company max operatives number` | squad size, bonds, operator count | Exact numeric fields must resolve to eligible official or first-hand records |

Deferred, not routed in the local MVP:

- Hawks or Officer best-build pages;
- tier lists or universal class rankings;
- complete weapon, talent, mission, choice, enemy, or boss databases;
- Steam Deck, controller, ultrawide, performance, crash, or settings guides;
- character or class detail pages generated from incomplete entities;
- localization, tools, team builders, maps, comments, accounts, ads, or analytics.

Each deferred opportunity is kept in a research backlog with its missing field, source candidate, acquisition method, validation method, and unblock condition. It is not represented by an empty route.

## Evidence model

The starter's `SourceRecord` remains canonical for sources. The project adds canonical fact and media records because multiple routes reuse official claims and visuals.

### Fact record

Required fields:

- stable `fact:<slug>` ID;
- label and typed value;
- `sourceIds` resolving to source records;
- `evidenceClass`;
- game version or `UNKNOWN`;
- ISO verification date;
- `publicAllowed`;
- `editorialJudgment`;
- route consumers;
- optional boundary note.

Facts with missing sources, invalid IDs, ineligible evidence, unresolved consumers, or unknown required values fail validation. Search volume and competitor observations live in a separate keyword plan and never satisfy a public fact.

### Media record

Required fields:

- stable `media:<slug>` ID;
- official asset URL and official source-page ID;
- media type, intrinsic width, and intrinsic height;
- descriptive alt text or decorative state;
- intended route/placement;
- attribution label;
- verification date;
- `publicAllowed` and rights note.

Missing dimensions, source linkage, attribution, or rights decision fails the media validator. Remote asset failure must leave readable page content and a visible official-page fallback link.

### Keyword ownership record

Required fields:

- normalized keyword cluster ID;
- representative keyword and demand provenance;
- canonical user task;
- owner route or `RESEARCH_BACKLOG`;
- evidence completeness;
- direct-answer state;
- update trigger.

The validator rejects duplicate primary owners, nonexistent routes, or a backlog item represented by a route.

## Page composition

### Home

The hero identifies the game, states the independent-guide boundary, shows official-hosted media, and provides two primary actions: `Compare verified classes` and `Review operators`. A task board below routes to the two mechanics guides. Official game scope and launch facts appear after the task entry, followed by source and verification disclosures.

### Classes

Use the entity-index mechanism as a decision table, not a grid of thin SEO cards. Each eligible record shows only verified class name, official description/role, allowed specialization information, source state, and verification date. Unsupported rankings and best-build claims are absent. The page states whether the visible set is complete; it may not target “all classes” as a complete answer unless every required roster record passes.

### Operators

Use canonical operator IDs and source-backed role summaries. Hawks may receive a featured section because demand supports the task, but no separate Hawks URL is created until its detail and maintenance gates pass. Relationships, bonds, unlocks, death states, and class compatibility appear only where exact eligible evidence exists.

### Mechanics guides

Each guide begins with a bounded quick answer and immediately states platform/version/date scope. Supporting sections distinguish official claims from `UNKNOWN` gameplay details. Related links connect only to the canonical route owners above.

## Components and data flow

Build-time flow:

1. Project-owned source, fact, media, route, and keyword records load through typed selectors.
2. Selectors reject unresolved IDs and return only eligible records to pages.
3. Pages compose records through the starter's bounded templates and Zero Company-specific presentation components.
4. Astro renders static HTML.
5. output validators inspect HTML, sitemap, robots, metadata, H1 count, canonical, `noindex`, internal links, official action, media attribution, and old-project residue.

Project-specific components are limited to presentation needs demonstrated by this site: tactical task board, class decision row, operator dossier, verification panel, and official-media figure. They must consume generic records and contain no duplicated canonical facts.

## Failure and uncertainty behavior

- Missing required evidence fails the relevant route validation or keeps a section out of rendered output.
- Missing optional enrichment does not block an otherwise useful answer.
- Remote official media failure preserves alt text/caption and the official-page link.
- `UNKNOWN` is visible where it materially changes player expectations; it is not converted into “no,” “not supported,” or invented specificity.
- The invalid canonical origin and disabled release state prevent any production-readiness claim.
- Analytics, advertising, localization, and external scripts remain disabled.

## Verification strategy

Implementation follows test-first changes for validators and data selectors. Before `LOCAL_VERIFIED`, run:

1. baseline starter tests before customization;
2. targeted failing tests for evidence records, keyword ownership, media, routes, and output invariants;
3. `npm run check`;
4. the complete test suite;
5. a production build;
6. generated-output validation for every MVP route;
7. residue scan allowing only the current independent identity;
8. `git diff --check`;
9. local production preview with desktop and mobile route inspection, keyboard focus, media dimensions, internal navigation, no horizontal overflow, and no site-caused console errors.

Passing local checks results in `LOCAL_VERIFIED / RELEASE_APPROVAL_REQUIRED`, not deployment or production proof.

## Starter and skill feedback loop

After Zero Company passes local verification:

1. compare the project against starter commit `51b7b77`;
2. classify each difference as project-specific or reusable;
3. forward-port only demonstrated reusable mechanisms, preferably evidence/keyword/media validators and consumption documentation;
4. test the neutral starter independently so its demonstration routes remain nonindexable and residue-free;
5. update `building-evidence-first-game-sites` only with non-obvious workflow guidance proven by this consumption round;
6. validate the skill with `quick_validate.py`;
7. record what changed, the consuming project/commit, the proof command, and what deliberately stayed project-specific.

Framework and skill changes are separate diffs and separate verification results from the Zero Company site. They do not inherit local-site success automatically and do not authorize publishing either repository.

## Success criteria

- The local project is isolated and contains no copied project identity or facts.
- Every researched MVP intent has exactly one route owner or an explicit research-backlog state.
- Every rendered factual claim resolves to eligible, dated evidence.
- The home hero visibly identifies Zero Company with official-hosted media, an official destination, and attribution.
- All five MVP routes build locally with honest `noindex`/release state and useful task completion.
- Unsupported build, tier, technical, and mission claims do not appear as answers or routes.
- The full verification command and rendered desktop/mobile review pass with fresh evidence.
- Reusable improvements are proven in both the consumer and neutral starter before the skill records them.

