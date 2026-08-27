import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function source(path) {
  return readFile(new URL(`../${path}`, import.meta.url), 'utf8');
}

test('home resolves canonical records and puts task entry before game overview', async () => {
  const page = await source('src/pages/index.astro');
  const template = await source('src/templates/HomePage.astro');
  assert.match(page, /getFact\('fact:game-type'\)/);
  assert.match(page, /getMedia\('media:official-keyart'\)/);
  assert.match(page, /source:official-gameplay-trailer/);
  assert.match(page, /getSources/);
  assert.match(template, /Compare verified classes/);
  assert.match(template, /Review verified operators/);
  assert.match(template, /OfficialMedia/);
  assert.match(template, /TacticalTaskBoard/);
  assert.match(template, /OfficialTrailer/);
  assert.ok(template.indexOf('<TacticalTaskBoard') < template.indexOf('game-overview'));
  assert.ok(template.indexOf('<TacticalTaskBoard') < template.indexOf('<OfficialTrailer'));
  assert.ok(template.indexOf('<OfficialTrailer') < template.indexOf('game-overview'));
  assert.doesNotMatch(template, /Single-player, turn-based tactics game/);
});

test('classes owner renders verified standard Specializations with a coverage boundary', async () => {
  const page = await source('src/pages/classes/index.astro');
  const table = await source('src/components/game/ClassDecisionTable.astro');
  const template = await source('src/templates/EntityIndexPage.astro');
  assert.match(page, /getFacts/);
  assert.match(page, /fact:specialization-assault/);
  assert.match(page, /media:tactical-gameplay/);
  assert.match(page, /eight standard Specializations/i);
  assert.match(table, /fact\.label/);
  assert.match(table, /fact\.value/);
  assert.match(template, /OfficialMedia/);
  assert.match(template, /SourceList/);
  assert.equal((template.match(/<h1/g) ?? []).length, 1);
  assert.match(template, /overflow-wrap:\s*normal/);
  assert.match(template, /word-break:\s*normal/);
  assert.doesNotMatch(`${page}\n${template}`, /best class|tier list/i);
});

test('operators owner renders canonical dossiers and keeps Hawks on the owner page', async () => {
  const page = await source('src/pages/operators/index.astro');
  const dossier = await source('src/components/game/OperatorDossier.astro');
  assert.match(page, /getFacts/);
  assert.match(page, /fact:operator-hawks/);
  assert.match(page, /media:operators-lineup/);
  assert.match(page, /Hawks remains on this owner page/);
  assert.match(dossier, /fact\.label/);
  assert.match(dossier, /fact\.value/);
  assert.doesNotMatch(page, /best build|tier list/i);
});

test('difficulty guide answers the documented permadeath question and names its boundary', async () => {
  const page = await source('src/pages/guides/difficulty-permadeath/index.astro');
  const template = await source('src/templates/AnswerPage.astro');
  assert.match(page, /getFacts/);
  assert.match(page, /fact:permadeath-toggle/);
  assert.match(page, /fact:standard-injury-threshold/);
  assert.match(page, /permadeath\.value/);
  assert.match(page, /threshold\.value/);
  assert.match(page, /other difficulty levels remain unverified/i);
  assert.match(template, /VerificationPanel/);
  assert.match(template, /SourceList/);
  assert.match(template, /RelatedLinks/);
  assert.equal((template.match(/<h1/g) ?? []).length, 1);
});

test('squad-size guide keeps HQ, starting roster, deployed squad, and Hawks scopes distinct', async () => {
  const page = await source('src/pages/guides/squad-size-operators/index.astro');
  assert.match(page, /getFacts/);
  assert.match(page, /fact:hq-operator-limit/);
  assert.match(page, /fact:starting-operator-limit/);
  assert.match(page, /fact:standard-squad-limit/);
  assert.match(page, /fact:hawks-mission-requirement/);
  assert.match(page, /hqLimit\.value/);
  assert.match(page, /seven Operators/);
  assert.match(page, /four Operators/);
  assert.match(page, /Certain missions can add controllable characters/);
  assert.doesNotMatch(page, /unlimited|always exactly four/i);
});
