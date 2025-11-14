// src/lib/alias.ts
import crypto from "crypto";

/**
 * Deterministic alias from a token (e.g., nouk_user_token).
 * Same token -> same alias for every user/device.
 */
const ADJECTIVES = [
  "cozy","quiet","warm","soft","brisk","calm","gentle","hushed","mellow","spry",
  "brave","sincere","lively","kind","clever","bright","chill","curious","sprouted","amber"
];

const NOUNS = [
  "sprout","moss","leaf","fern","ember","cinder","willow","cedar","maple","birch",
  "acorn","ivy","juniper","sage","thyme","basil","lavender","clover","poppy","reed"
];

function hashToInt(input: string): number {
  const h = crypto.createHash("sha1").update(input).digest();
  // Take first 4 bytes for a positive int
  return h.readUInt32BE(0);
}

export function aliasFromToken(token: string): string {
  const h = hashToInt(token);
  const a = ADJECTIVES[h % ADJECTIVES.length];
  const n = NOUNS[(h >> 8) % NOUNS.length];
  // Small numeric tail to reduce collisions within same a+n bucket
  const tail = (h % 97) + 3; // 3..99
  return `${a}-${n}-${tail}`;
}
