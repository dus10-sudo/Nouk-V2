// src/lib/db.ts

import { supabase } from "./supabase";

export async function getThread(id: string) {
  const { data, error } = await supabase
    .from("threads")
    .select(
      `
      id,
      title,
      body,
      created_at,
      room:room_id (
        slug,
        name
      )
    `
    )
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error loading thread:", error);
    return null;
  }

  return data;
}
