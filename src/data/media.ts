import type { MediaRecord } from '../config/schema.ts';

export const media: MediaRecord[] = [
  {
    id: 'media:official-keyart', assetPath: '/media/zero-company-keyart.jpg', sourceId: 'source:ea-launch-release',
    width: 3840, height: 2160, alt: 'Official Zero Company key art showing Hawks and a mixed squad against a galactic battlefield backdrop.',
    placement: '/', attribution: 'Electronic Arts / Lucasfilm Games — official press-release key art', lastVerified: '2026-08-27',
    publicAllowed: true, rightsNote: 'Official press-release download used in a source-linked independent fan guide under the EA content policy; STAR WARS rights remain with Lucasfilm and removal is required on a substantiated rights-holder request.',
  },
  {
    id: 'media:operators-lineup', assetPath: '/media/operators-squad-lineup.jpg', sourceId: 'source:official-game-page',
    width: 3840, height: 2160, alt: 'Official Zero Company image showing the operator squad assembled together.',
    placement: '/operators/', attribution: 'Electronic Arts — official Zero Company game page', lastVerified: '2026-08-27',
    publicAllowed: true, rightsNote: 'Official publisher-hosted game content used in a source-linked independent fan guide under the EA content policy; STAR WARS rights remain with Lucasfilm and removal is required on a substantiated rights-holder request.',
  },
  {
    id: 'media:tactical-gameplay', assetPath: '/media/tactical-gameplay.jpg', sourceId: 'source:official-gameplay-deep-dive',
    width: 1920, height: 1080, alt: 'Official Zero Company Holotable mission map showing regions, crisis missions, rewards, and an Operator briefing panel.',
    placement: '/classes/', attribution: 'Electronic Arts — official gameplay deep dive', lastVerified: '2026-08-27',
    publicAllowed: true, rightsNote: 'Official publisher-hosted game content used in a source-linked independent fan guide under the EA content policy; STAR WARS rights remain with Lucasfilm and removal is required on a substantiated rights-holder request.',
  },
];
