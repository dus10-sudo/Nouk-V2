// src/server/actions.ts
'use server';

import { cookies } from "next/headers";
import { randomUUID } from "crypto";
import { supabase } from "@/lib/supabase";

const COOKIE_KEY = "nouk_user_token";
const ONE_YEAR = 60 * 60 * 24 * 365;

/**
 * Ensure the user has a stable anonymous token stored in a cookie.
 * Returns the token string.
 */
function ensureToken(): string {
  const cookieStore = cookies();
  let token = cookieStore.get(COOKIE_KEY)?.value;

  if (!token) {
    token = randomUUID();
    cookieStore.set(COOKIE_KEY, token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: ONE_YEAR,
    });
  }

  return token;
}

/**
 * Generic server action for creating a thread.
 * You don't *have* to use this right now since you're posting to /api/threads,
 * but it's here so the file is stable and ready if you want server actions later.
 */
export async function createThread(formData: FormData) {
  const user_token = ensureToken();

  const room_id = formData.get("room_id") as string | null;
  const rawTitle = formData.get("title") as string | null;
  const rawLink = formData.get("link_url") as string | null;

  const title = (rawTitle ?? "").trim();
  const link_url = (rawLink ?? "").trim() || null;

  if (!room_id || (!title && !link_url)) {
    return {
      ok: false,
      error: "Missing room or content",
    };
  }

  const { data, error } = await supabase
    .from("threads")
    .insert({
      room_id,
      title: title || "Untitled Nouk",
      link_url,
      user_token,
    })
    .select("id")
    .single();

  if (error || !data?.id) {
    console.error("[actions] createThread error:", error);
    return {
      ok: false,
      error: "Failed to create thread",
    };
  }

  return {
    ok: true,
    threadId: data.id as string,
  };
}

/**
 * Stub for future server actions.
 * Having at least one named export keeps the module valid.
 */
export const actionsReady = true;
