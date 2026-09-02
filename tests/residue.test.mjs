import test from 'node:test';
import assert from 'node:assert/strict';
import { scanText } from '../scripts/scan-project-residue.mjs';

test('detects reference-site identities', () => {
  assert.ok(scanText('DragonSwordGuide').length > 0);
  assert.ok(scanText('WARDOGS field guide').length > 0);
  assert.ok(scanText('Example Game Guide').length > 0);
  assert.ok(scanText('Resonance guide').length > 0);
  assert.ok(scanText('Aliens Fireteam Elite 2').length > 0);
});

test('detects unapproved production domains and analytics IDs', () => {
  assert.ok(scanText('https://reference-game-guide.com/page/').length > 0);
  assert.ok(scanText('G-ABCDEF12').length > 0);
});

test('allows only approved project, official evidence, and generic integration domains', () => {
  const approved = [
    'https://zerocompanytactics.com',
    'https://www.ea.com/games/starwars/zero-company',
    'https://help.ea.com/en/articles/star-wars/zero-company/',
    'https://news.ea.com/press-releases/',
    'https://www.youtube.com/watch?v=official',
    'https://www.youtube-nocookie.com/embed/official',
    'https://www.googletagmanager.com',
    'https://pl31149274.profitableratecpmnetwork.com/3abff3f2cb7a14ddfe1342f5327d0837/invoke.js',
  ].join(' ');
  assert.deepEqual(scanText(approved), []);
});

test('allows the consuming project identity only when explicitly declared', () => {
  assert.deepEqual(scanText('WARDOGS Guide', ['WARDOGS']), []);
});
