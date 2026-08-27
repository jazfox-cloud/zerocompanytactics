# Game Guide Starter and Skill Hardening Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Feed only independently verified reusable mechanisms from the Zero Company consumer back into `game-guide-starter` and `building-evidence-first-game-sites`.

**Architecture:** Treat the locally verified consumer as evidence, not as a template to copy wholesale. Port generic record contracts and validators into the neutral starter with neutral fixtures, verify the starter independently, then make a narrow skill update that instructs future builds to capture and forward-test reusable learning without absorbing project-specific data.

**Tech Stack:** Astro 5.13.5 starter, TypeScript 5.9.2, Node.js built-in tests, Markdown skill/reference files, `skill-creator` validator.

**Spec:** `docs/superpowers/specs/2026-08-27-zero-company-field-guide-design.md`

## Global Constraints

- Start only after the Zero Company project has fresh `LOCAL_VERIFIED` evidence.
- Keep the starter neutral: no Zero Company facts, keywords, routes, images, domains, source URLs, or brand assets.
- Keep demonstration routes nonindexable, absent from navigation, and absent from sitemap.
- Do not push the starter or publish/deploy any consumer.
- Modify the skill only with guidance demonstrated by this real consumption round; do not add generic coding advice or a project changelog.
- Verify consumer, starter, and skill separately; success in one does not prove another.

---

## Task 1: Classify consumer differences before touching the starter

**Files:**
- Create in starter: `docs/verification/2026-08-27-zero-company-consumption.md`

**Interfaces:**
- Consumes: locally verified Zero Company commit and `game-guide-starter@51b7b77`
- Produces: an explicit project-specific/reusable classification and port allowlist

- [ ] **Step 1: Compare the verified consumer against the starter baseline**

Run read-only diffs for configuration, data contracts, validators, templates, scripts, and tests. Classify every meaningful difference into:

```text
PROJECT_SPECIFIC: brand, CSS theme, game routes, facts, sources, media, keywords, copy
REUSABLE_CANDIDATE: fact/media/keyword contracts, selectors, validators, output invariants, consumption checklist guidance
REJECTED: any mechanism not required by the verified consumer or duplicating existing starter behavior
```

- [ ] **Step 2: Write the consumption verification record**

Record consumer commit, full verification command/result, port allowlist, excluded project-specific files, and rollback boundary. This record is private starter documentation and is not part of a public site artifact.

- [ ] **Step 3: Commit the classification record in the starter**

```bash
git add docs/verification/2026-08-27-zero-company-consumption.md
git commit -m "docs: record Zero Company starter consumption"
```

## Task 2: Port neutral evidence and media/keyword validation

**Files:**
- Modify in starter: `src/config/schema.ts`
- Create in starter: `src/data/validation.ts`
- Create in starter: `tests/evidence-contracts.test.mjs`
- Create in starter: `tests/keyword-ownership.test.mjs`
- Create in starter: `tests/media-contracts.test.mjs`
- Modify in starter: `TEMPLATE-CHECKLIST.md`
- Modify in starter: `SETUP.md`

**Interfaces:**
- Produces neutral `FactRecord`, `MediaRecord`, `KeywordRecord`, and pure validation functions
- Does not require any consuming project to ship unused page types

- [ ] **Step 1: Write failing neutral contract tests**

Use fictional `Example Game` records only. Test dangling sources, missing verification dates, invalid required values, zero media dimensions, duplicate keyword ownership, and backlog-with-route conflicts. Name the production function that makes each test pass.

- [ ] **Step 2: Run tests and confirm RED**

Run:

```bash
node --test tests/evidence-contracts.test.mjs tests/keyword-ownership.test.mjs tests/media-contracts.test.mjs
```

Expected: FAIL because neutral contracts/validators are missing.

- [ ] **Step 3: Port only pure generic contracts and validators**

Use the verified signatures from the consumer, remove all project records, and keep the APIs optional for consuming sites that do not need entity/media data. Update setup/checklist guidance to explain when each contract is required.

- [ ] **Step 4: Run targeted tests and confirm GREEN**

Run:

```bash
node --test tests/evidence-contracts.test.mjs tests/keyword-ownership.test.mjs tests/media-contracts.test.mjs
```

Expected: PASS.

- [ ] **Step 5: Run the complete neutral starter verification**

Run:

```bash
npm run verify
git diff --check
```

Expected: all original and new tests pass; neutral output remains nonindexable and residue-free.

- [ ] **Step 6: Commit the reusable starter change**

```bash
git add src/config/schema.ts src/data/validation.ts tests TEMPLATE-CHECKLIST.md SETUP.md
git commit -m "feat: add reusable evidence ownership contracts"
```

## Task 3: Add rendered media/link output invariants to the starter

**Files:**
- Create in starter: `src/components/media/OfficialMedia.astro`
- Modify in starter: `src/templates/HomePage.astro`
- Create or modify in starter: `tests/built-output.test.mjs`
- Modify in starter: `README.md`

**Interfaces:**
- Produces optional official-media composition that always includes intrinsic dimensions, visible attribution, and an official fallback link
- Preserves the neutral starter home when no eligible media is supplied

- [ ] **Step 1: Write failing optional-media output tests**

Test both branches: no media keeps the neutral home valid; supplied neutral media renders an image with nonzero dimensions, alt text, visible attribution, and fallback link. Reject a media record with missing dimensions or source.

- [ ] **Step 2: Run the test and confirm RED**

Run:

```bash
node --test tests/built-output.test.mjs
```

Expected: FAIL because the optional rendered-media contract is missing.

- [ ] **Step 3: Implement the optional neutral component and output check**

Keep media prop-driven and source-linked. Do not bundle a sample game image. Update the README to state that production recognition requires an approved game-specific visual or eligible official embed and that file presence alone is insufficient.

- [ ] **Step 4: Verify the neutral starter**

Run:

```bash
npm run verify
git diff --check
```

Expected: PASS with no new indexable demonstration route or project residue.

- [ ] **Step 5: Commit the rendered-media safeguard**

```bash
git add src/components/media src/templates/HomePage.astro tests/built-output.test.mjs README.md
git commit -m "test: require rendered official media evidence"
```

## Task 4: Update and validate the evidence-first game-site skill

**Files:**
- Modify: `/Users/jazfox/.codex/skills/building-evidence-first-game-sites/SKILL.md`
- Modify only if routing detail is substantial: `/Users/jazfox/.codex/skills/building-evidence-first-game-sites/references/build-quality-review.md`

**Interfaces:**
- Consumes: two verified consumer rounds, starter verification record, and neutral starter test evidence
- Produces: concise reusable guidance for starter consumption and post-build learning extraction

- [ ] **Step 1: Write the narrow skill delta**

Add guidance with these exact decisions, phrased generically:

```text
When a reusable starter is available, record its commit before consumption and verify its neutral baseline before customization.
Treat rendered media, attribution, and official fallback links as output invariants; downloaded files alone do not pass.
After local verification, classify consumer differences as project-specific, reusable candidates, or rejected before changing the starter.
Forward-port only mechanisms proven in both the consumer and neutral starter; never port game facts, routes, assets, keywords, identity, or deployment state.
Record consumer commit, proof command, starter commit, and deliberately excluded project-specific material.
```

Do not add Zero Company names, URLs, media filenames, routes, keyword metrics, or a chronological changelog to the skill.

- [ ] **Step 2: Validate the updated skill**

Run:

```bash
python3 /Users/jazfox/.codex/skills/.system/skill-creator/scripts/quick_validate.py /Users/jazfox/.codex/skills/building-evidence-first-game-sites
```

Expected: validator reports the skill is valid.

- [ ] **Step 3: Re-read the entrypoint for scope and progressive disclosure**

Confirm the entrypoint remains concise, its description remains discriminating, detailed rendered-review guidance stays in `build-quality-review.md`, and the update introduces no new external authorization.

- [ ] **Step 4: Record final independent verification**

Report consumer commit/result, starter commits/result, skill validation result, uncommitted state in each repository, and explicitly blocked publication/push actions. Do not claim production verification.
