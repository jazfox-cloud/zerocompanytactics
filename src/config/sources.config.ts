import type { SourceRecord } from './schema.ts';

export const sources: SourceRecord[] = [
  {
    id: 'official-placeholder',
    label: 'Official source placeholder',
    url: 'https://store.example.invalid/game',
    evidenceClass: 'OFFICIAL',
    gameVersion: 'UNKNOWN',
    lastVerified: '2026-08-24',
    publicAllowed: false,
    editorialJudgment: false,
  },
];
