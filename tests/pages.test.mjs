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
  assert.match(page, /getSources/);
  assert.match(template, /Compare verified classes/);
  assert.match(template, /Review verified operators/);
  assert.match(template, /OfficialMedia/);
  assert.match(template, /TacticalTaskBoard/);
  assert.ok(template.indexOf('<TacticalTaskBoard') < template.indexOf('game-overview'));
  assert.doesNotMatch(template, /Single-player, turn-based tactics game/);
});
