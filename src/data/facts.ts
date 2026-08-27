import type { FactRecord } from '../config/schema.ts';

const deepDive = ['source:official-gameplay-deep-dive'];
const officialQa = ['source:official-q-and-a'];
const deepDiveBoundary = 'The official deep-dive article says development details were subject to change; launch-build confirmation remains pending.';

export const facts: FactRecord[] = [
  {
    id: 'fact:game-type', label: 'Game type', value: 'Single-player, turn-based tactics game', required: true,
    sourceIds: ['source:official-game-page', 'source:official-gameplay-deep-dive'], evidenceClass: 'OFFICIAL',
    gameVersion: 'Launch page, 2026-08-27', lastVerified: '2026-08-27', publicAllowed: true, editorialJudgment: false,
    consumers: ['home'],
  },
  {
    id: 'fact:release-date', label: 'Release date', value: 'August 27, 2026', required: true,
    sourceIds: ['source:ea-launch-release', 'source:official-game-page'], evidenceClass: 'OFFICIAL',
    gameVersion: 'Launch announcement', lastVerified: '2026-08-27', publicAllowed: true, editorialJudgment: false,
    consumers: ['home'],
  },
  {
    id: 'fact:operator-types', label: 'Operator types', value: ['Authored Operators', 'Custom Operators'], required: true,
    sourceIds: deepDive, evidenceClass: 'OFFICIAL', gameVersion: 'Official pre-launch deep dive', lastVerified: '2026-08-27',
    publicAllowed: true, editorialJudgment: false, consumers: ['home', 'operators', 'squad-size-operators'], boundary: deepDiveBoundary,
  },
  {
    id: 'fact:standard-specialization-count', label: 'Standard Specializations', value: 8, required: true,
    sourceIds: deepDive, evidenceClass: 'OFFICIAL', gameVersion: 'Official pre-launch deep dive', lastVerified: '2026-08-27',
    publicAllowed: true, editorialJudgment: false, consumers: ['home', 'classes'], boundary: deepDiveBoundary,
  },
  {
    id: 'fact:specialization-ability-slots', label: 'Abilities per standard Specialization', value: ['Ultimate', 'Standard', 'Passive'], required: true,
    sourceIds: deepDive, evidenceClass: 'OFFICIAL', gameVersion: 'Official pre-launch deep dive', lastVerified: '2026-08-27',
    publicAllowed: true, editorialJudgment: false, consumers: ['classes'], boundary: deepDiveBoundary,
  },
  {
    id: 'fact:specialization-assault', label: 'Assault', value: 'A frontline fighter focused on maneuvering and medium- to close-range kills against targets in cover.', required: true,
    sourceIds: deepDive, evidenceClass: 'OFFICIAL', gameVersion: 'Official pre-launch deep dive', lastVerified: '2026-08-27', publicAllowed: true, editorialJudgment: false, consumers: ['classes'], boundary: deepDiveBoundary,
  },
  {
    id: 'fact:specialization-gunslinger', label: 'Gunslinger', value: 'A multi-target blaster specialist built around fast strikes across several targets.', required: true,
    sourceIds: deepDive, evidenceClass: 'OFFICIAL', gameVersion: 'Official pre-launch deep dive', lastVerified: '2026-08-27', publicAllowed: true, editorialJudgment: false, consumers: ['classes'], boundary: deepDiveBoundary,
  },
  {
    id: 'fact:specialization-heavy', label: 'Heavy', value: 'A thickly armored frontline combatant focused on survivability and absorbing enemy attacks in the open.', required: true,
    sourceIds: deepDive, evidenceClass: 'OFFICIAL', gameVersion: 'Official pre-launch deep dive', lastVerified: '2026-08-27', publicAllowed: true, editorialJudgment: false, consumers: ['classes'], boundary: deepDiveBoundary,
  },
  {
    id: 'fact:specialization-medic', label: 'Medic', value: 'A support role focused on healing, Injury prevention, and boosting teammates.', required: true,
    sourceIds: deepDive, evidenceClass: 'OFFICIAL', gameVersion: 'Official pre-launch deep dive', lastVerified: '2026-08-27', publicAllowed: true, editorialJudgment: false, consumers: ['classes'], boundary: deepDiveBoundary,
  },
  {
    id: 'fact:specialization-scoundrel', label: 'Scoundrel', value: 'A flexible wildcard that capitalizes on opportunities without extensive setup.', required: true,
    sourceIds: deepDive, evidenceClass: 'OFFICIAL', gameVersion: 'Official pre-launch deep dive', lastVerified: '2026-08-27', publicAllowed: true, editorialJudgment: false, consumers: ['classes'], boundary: deepDiveBoundary,
  },
  {
    id: 'fact:specialization-scout', label: 'Scout', value: 'A reconnaissance-focused tactical role whose planning and timing create opportunities for the team.', required: true,
    sourceIds: deepDive, evidenceClass: 'OFFICIAL', gameVersion: 'Official pre-launch deep dive', lastVerified: '2026-08-27', publicAllowed: true, editorialJudgment: false, consumers: ['classes'], boundary: deepDiveBoundary,
  },
  {
    id: 'fact:specialization-sharpshooter', label: 'Sharpshooter', value: 'A long-range marksman focused on selecting and defeating priority enemies.', required: true,
    sourceIds: deepDive, evidenceClass: 'OFFICIAL', gameVersion: 'Official pre-launch deep dive', lastVerified: '2026-08-27', publicAllowed: true, editorialJudgment: false, consumers: ['classes'], boundary: deepDiveBoundary,
  },
  {
    id: 'fact:specialization-soldier', label: 'Soldier', value: 'An offensive mainstay for close- to medium-range combat using melee, grenades, heavy blaster fire, and a rocket launcher.', required: true,
    sourceIds: deepDive, evidenceClass: 'OFFICIAL', gameVersion: 'Official pre-launch deep dive', lastVerified: '2026-08-27', publicAllowed: true, editorialJudgment: false, consumers: ['classes'], boundary: deepDiveBoundary,
  },
  {
    id: 'fact:operator-hawks', label: 'Hawks', value: 'A former Galactic Republic officer and the leader of Zero Company.', required: true,
    sourceIds: deepDive, evidenceClass: 'OFFICIAL', gameVersion: 'Official pre-launch deep dive', lastVerified: '2026-08-27', publicAllowed: true, editorialJudgment: false, consumers: ['operators'], boundary: deepDiveBoundary,
  },
  {
    id: 'fact:operator-trick', label: 'Trick', value: 'Formerly CT-3301, a soldier who served with Hawks in the Republic military.', required: true,
    sourceIds: deepDive, evidenceClass: 'OFFICIAL', gameVersion: 'Official pre-launch deep dive', lastVerified: '2026-08-27', publicAllowed: true, editorialJudgment: false, consumers: ['operators'], boundary: deepDiveBoundary,
  },
  {
    id: 'fact:operator-tel-rea', label: 'Tel-Rea Vokoss', value: 'A Tognath Jedi Padawan seeking to honor the legacy of her late Jedi Master.', required: true,
    sourceIds: deepDive, evidenceClass: 'OFFICIAL', gameVersion: 'Official pre-launch deep dive', lastVerified: '2026-08-27', publicAllowed: true, editorialJudgment: false, consumers: ['operators'], boundary: deepDiveBoundary,
  },
  {
    id: 'fact:operator-cly', label: 'Cly Kullervo', value: 'A surviving member of Clan Verminoth who joins Zero Company while pursuing revenge.', required: true,
    sourceIds: deepDive, evidenceClass: 'OFFICIAL', gameVersion: 'Official pre-launch deep dive', lastVerified: '2026-08-27', publicAllowed: true, editorialJudgment: false, consumers: ['operators'], boundary: deepDiveBoundary,
  },
  {
    id: 'fact:operator-luco', label: 'Luco Bronc', value: 'An Umbaran sniper who defended his home during the Republic invasion and later works with Zero Company.', required: true,
    sourceIds: deepDive, evidenceClass: 'OFFICIAL', gameVersion: 'Official pre-launch deep dive', lastVerified: '2026-08-27', publicAllowed: true, editorialJudgment: false, consumers: ['operators'], boundary: deepDiveBoundary,
  },
  {
    id: 'fact:operator-jae', label: 'Jae Mordant', value: 'A Shu-Torun noble and former Ore-Baroness who helped convince the Republic to hire Zero Company.', required: true,
    sourceIds: deepDive, evidenceClass: 'OFFICIAL', gameVersion: 'Official pre-launch deep dive', lastVerified: '2026-08-27', publicAllowed: true, editorialJudgment: false, consumers: ['operators'], boundary: deepDiveBoundary,
  },
  {
    id: 'fact:operator-kabb', label: 'Kabb Uppercut', value: 'A veteran crook, former prizefighter, and cybernetic-armed Felshi created for Zero Company.', required: true,
    sourceIds: deepDive, evidenceClass: 'OFFICIAL', gameVersion: 'Official pre-launch deep dive', lastVerified: '2026-08-27', publicAllowed: true, editorialJudgment: false, consumers: ['operators'], boundary: deepDiveBoundary,
  },
  {
    id: 'fact:hq-operator-limit', label: 'Current HQ operator limit', value: 20, required: true,
    sourceIds: officialQa, evidenceClass: 'OFFICIAL', gameVersion: 'Official Q&A, 2026-07-21', lastVerified: '2026-08-27', publicAllowed: true, editorialJudgment: false, consumers: ['squad-size-operators'],
  },
  {
    id: 'fact:starting-operator-limit', label: 'Starting maximum operators', value: 7, required: true,
    sourceIds: officialQa, evidenceClass: 'OFFICIAL', gameVersion: 'Official Q&A, 2026-07-21', lastVerified: '2026-08-27', publicAllowed: true, editorialJudgment: false, consumers: ['squad-size-operators'],
  },
  {
    id: 'fact:standard-squad-limit', label: 'Standard squad limit', value: 4, required: true,
    sourceIds: officialQa, evidenceClass: 'OFFICIAL', gameVersion: 'Official Q&A, 2026-07-21', lastVerified: '2026-08-27', publicAllowed: true, editorialJudgment: false, consumers: ['squad-size-operators'], boundary: 'Certain missions can add controllable characters beyond the standard limit.',
  },
  {
    id: 'fact:hawks-mission-requirement', label: 'Hawks deployment', value: 'Required for story missions; skirmish missions allow any combination of Operators.', required: true,
    sourceIds: officialQa, evidenceClass: 'OFFICIAL', gameVersion: 'Official Q&A, 2026-07-21', lastVerified: '2026-08-27', publicAllowed: true, editorialJudgment: false, consumers: ['operators', 'squad-size-operators'],
  },
  {
    id: 'fact:permadeath-toggle', label: 'Permadeath setting', value: 'Enabled by default and can be toggled off.', required: true,
    sourceIds: officialQa, evidenceClass: 'OFFICIAL', gameVersion: 'Official Q&A, 2026-07-21', lastVerified: '2026-08-27', publicAllowed: true, editorialJudgment: false, consumers: ['difficulty-permadeath'],
  },
  {
    id: 'fact:standard-injury-threshold', label: 'Standard-difficulty permanent-death threshold', value: 'Three accumulated Injuries', required: true,
    sourceIds: deepDive, evidenceClass: 'OFFICIAL', gameVersion: 'Official pre-launch deep dive', lastVerified: '2026-08-27', publicAllowed: true, editorialJudgment: false, consumers: ['difficulty-permadeath'], boundary: deepDiveBoundary,
  },
];
