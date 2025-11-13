// src/lib/actions.ts
"use server";

import { cookies } from "next/headers";
import { randomUUID } from "crypto";
import { createClient } from "@supabase/supabase-js";
import { getRoomBySlug } from "./queries";

// --- Supabase client ---
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const sb = createClient(supabaseUrl, supabaseKey);

// --- User Token Helper ---
function ensureToken(): string {
  const store = cookies();
  const key = "nouk_user_token";

  const existing = store.get(key)?.value;
  if (existing) return existing;

  const newToken = randomUUID();
  store.set(key, newToken, {
    httpOnly: false,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365, // 1 year
  });

  return newToken;
}

// --- Create Thread ---
export async function createThread(
  roomSlug: string,
  title: string,
  link_url?: string | null
): Promise<string> {
  const room = await getRoomBySlug(roomSlug);
  if (!room) throw new Error(`Room not found: ${roomSlug}`);

  const user_token = ensureToken();
  const now = new Date();
  const expires = new Date(now.getTime() + 24 * 60 * 60 * 1000); // +24h

  const { data, error } = await sb
    .from("threads")
    .insert({
      room_id: room.id,
      title,
      link_url: link_url ?? null,
      user_token,
      is_archived: false,
      expires_at: expires.toISOString(),
      last_activity: now.toISOString(),
    })
    .select("id")
    .maybeSingle();

  if (error) throw error;
  return data!.id as string;
}

// --- Add Reply ---
export async function addReply(threadId: string, body: string): Promise<void> {
  const user_token = ensureToken();

  // Insert the reply
  const { error } = await sb
    .from("replies")
    .insert({
      thread_id: threadId,
      body,
      user_token,
    });

  if (error) throw error;

  // Update last activity on thread
  await sb
    .from("threads")
    .update({ last_activity: new Date().toISOString() })
    .eq("id", threadId);
}
