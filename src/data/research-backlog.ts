import type { ResearchTask } from '../config/schema.ts';

export const researchBacklog: ResearchTask[] = [
  {
    taskId: 'acquire-officer-build', keywordId: 'keyword:best-officer-build', goal: 'Test an Officer build in the launch version.',
    invalidOrMissingField: 'Versioned skills, equipment, mission context, and repeatable outcome evidence', sourceCandidates: ['Owned launch-build gameplay capture'],
    collectionMethod: 'Record loadout, difficulty, mission, turns, and result in first-hand captures.', validationMethod: 'Repeat the scenario and compare against at least one viable alternative.',
    completionCriteria: 'A reproducible contextual recommendation with retained captures.', unblockCondition: 'Required build fields pass FIRST_HAND evidence review.', publicationState: 'BLOCKED',
  },
  {
    taskId: 'acquire-steam-deck-test', keywordId: 'keyword:steam-deck', goal: 'Test launch-build behavior on a named Steam Deck model.',
    invalidOrMissingField: 'Device, OS, game version, settings, performance, and control evidence', sourceCandidates: ['Owned Steam Deck gameplay capture'],
    collectionMethod: 'Install and run the launch build on the named device while recording settings and observed behavior.', validationMethod: 'Repeat cold launch and representative mission checks.',
    completionCriteria: 'Device-scoped evidence with limitations and captured settings.', unblockCondition: 'Required technical fields pass FIRST_HAND review.', publicationState: 'BLOCKED',
  },
  {
    taskId: 'acquire-controller-test', keywordId: 'keyword:controller', goal: 'Test controller behavior on a named platform and device.',
    invalidOrMissingField: 'Platform, controller model, input mapping, prompts, and edge-case behavior', sourceCandidates: ['Owned controller test capture'],
    collectionMethod: 'Record menu, tactical combat, remapping, and reconnect behavior.', validationMethod: 'Repeat on the same launch build and document exceptions.',
    completionCriteria: 'Platform-scoped controller evidence with captures.', unblockCondition: 'Required controller fields pass FIRST_HAND review.', publicationState: 'BLOCKED',
  },
  {
    taskId: 'acquire-mission-walkthrough', keywordId: 'keyword:mission-solutions', goal: 'Document one named mission from the launch build.',
    invalidOrMissingField: 'Mission identity, objectives, choices, enemy layout, steps, and version', sourceCandidates: ['Owned mission gameplay capture'],
    collectionMethod: 'Capture a complete mission run and record decision points.', validationMethod: 'Replay the mission or validate the same steps from a retained save.',
    completionCriteria: 'A reproducible mission-specific walkthrough with version and difficulty.', unblockCondition: 'One independently useful named mission passes FIRST_HAND review.', publicationState: 'BLOCKED',
  },
];
