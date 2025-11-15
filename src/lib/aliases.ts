// src/lib/aliases.ts

// Small pool of cozy alias fragments.
// We combine one from each list based on a hash of the user_token.

const ALIAS_FIRST = [
  'Soft',
  'Quiet',
  'Lantern',
  'Window',
  'Sunroom',
  'Garden',
  'Midnight',
  'Candle',
  'Cozy',
  'Gentle',
  'Secret',
  'Cloud',
  'Amber',
  'Willow',
  'Fern',
];

const ALIAS_SECOND = [
  'Visitor',
  'Guest',
  'Echo',
  'Light',
  'Writer',
  'Neighbor',
  'Dreamer',
  'Note',
  'Voice',
  'Whisper',
  'Seed',
  'Star',
  'Sparrow',
  'Ember',
  'Stone',
];

// Simple deterministic hash – just needs to be stable, not secure.
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  }
  return hash;
}

// Given a user_token, return a friendly anonymous alias.
export function aliasFromToken(token: string): string {
  if (!token) return 'Cozy Guest';

  const h = hashString(token);

  const first = ALIAS_FIRST[h % ALIAS_FIRST.length] ?? 'Quiet';
  const second = ALIAS_SECOND[(h >> 8) % ALIAS_SECOND.length] ?? 'Guest';

  return `${first} ${second}`.trim();
}
