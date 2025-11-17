// src/server/actions.ts
"use server";

import { cookies } from "next/headers";
import { randomUUID } from "crypto";
import { createServerSupabase } from "@/lib/supabase";

const COOKIE_KEY = "nouk_user_token";
const ONE_YEAR = 60 * 60 * 24 * 365;

function ensureToken(): string {
  const jar = cookies();
  let token = jar.get(COOKIE_KEY)?.value;

  if (!token) {
    token = randomUUID();
    jar.set(COOKIE_KEY, token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: ONE_YEAR,
      path: "/",
    });
  }

  return token;
}

/**
 * Optional server action to create a new thread.
 * You can wire a <form action={createThread}> to this later if you want.
 */
export async function createThread(formData: FormData) {
  const supabase = createServerSupabase();
  const user_token = ensureToken();

  const room_id = (formData.get("room_id") as string) ?? "";
  const rawTitle = (formData.get("title") as string) ?? "";
  const rawLink = (formData.get("link_url") as string) ?? "";

  const title = rawTitle.trim();
  const link_url = rawLink.trim() || null;

  if (!room_id || (!title && !link_url)) {
    return {
      ok: false as const,
      error: "Missing room or content.",
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
    console.error("[actions] createThread error", error);
    return {
      ok: false as const,
      error: "Could not create the thread.",
    };
  }

  return {
    ok: true as const,
    threadId: data.id as string,
  };
}
