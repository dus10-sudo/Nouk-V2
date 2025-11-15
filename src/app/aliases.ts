// src/lib/aliases.ts
const ADJECTIVES = [
  'Soft',
  'Quiet',
  'Gentle',
  'Warm',
  'Distant',
  'Flickering',
  'Steady',
  'Late',
  'Hidden',
  'Bright',
];

const NOUNS = [
  'Lantern',
  'Fern',
  'Comet',
  'Page',
  'Sofa',
  'Nest',
  'Cloud',
  'Echo',
  'Sprout',
  'Window',
];

function hashString(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  }
  return hash;
}

export function aliasFromToken(userToken: string): string {
  const hash = hashString(userToken);
  const adj = ADJECTIVES[hash % ADJECTIVES.length];
  const noun = NOUNS[(hash >> 8) % NOUNS.length];
  const num = (hash >> 16) % 99;
  const suffix = num.toString().padStart(2, '0');

  return `${adj} ${noun} #${suffix}`;
}
