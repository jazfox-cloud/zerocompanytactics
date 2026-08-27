import type { MediaRecord } from '../config/schema.ts';

export const media: MediaRecord[] = [
  {
    id: 'media:official-keyart', assetPath: '/media/zero-company-keyart.jpg', sourceId: 'source:official-game-page',
    width: 3840, height: 2160, alt: 'Official Zero Company key art showing Hawks and a mixed squad against a galactic battlefield backdrop.',
    placement: '/', attribution: 'Electronic Arts — official Zero Company game page', lastVerified: '2026-08-27',
    publicAllowed: false, rightsNote: 'Official-hosted asset retained for local evaluation; production reuse requires a separate rights review.',
  },
  {
    id: 'media:operators-lineup', assetPath: '/media/operators-squad-lineup.jpg', sourceId: 'source:official-game-page',
    width: 3840, height: 2160, alt: 'Official Zero Company image showing the operator squad assembled together.',
    placement: '/operators/', attribution: 'Electronic Arts — official Zero Company game page', lastVerified: '2026-08-27',
    publicAllowed: false, rightsNote: 'Official-hosted asset retained for local evaluation; production reuse requires a separate rights review.',
  },
  {
    id: 'media:tactical-gameplay', assetPath: '/media/tactical-gameplay.jpg', sourceId: 'source:official-gameplay-deep-dive',
    width: 1920, height: 1080, alt: 'Official Zero Company Holotable mission map showing regions, crisis missions, rewards, and an Operator briefing panel.',
    placement: '/classes/', attribution: 'Electronic Arts — official gameplay deep dive', lastVerified: '2026-08-27',
    publicAllowed: false, rightsNote: 'Official-hosted asset retained for local evaluation; production reuse requires a separate rights review.',
  },
];
