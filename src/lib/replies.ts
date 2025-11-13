// src/lib/replies.ts
import { supabase } from "./supabase";

export type Reply = {
  id: string;
  thread_id: string;
  body: string;
  created_at: string;
};

export async function getReplies(threadId: string): Promise<Reply[]> {
  const { data, error } = await supabase
    .from("replies")
    .select("id, thread_id, body, created_at")
    .eq("thread_id", threadId)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error loading replies:", error);
    return [];
  }

  return data || [];
}
