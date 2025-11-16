// src/app/api/threads/route.ts
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { createServerSupabase } from "@/lib/supabase";

export async function GET() {
  const supabase = createServerSupabase();

  const { data, error } = await supabase
    .from("threads")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    console.error("[GET threads] Error:", error);
    return NextResponse.json({ error: "Failed to fetch threads" }, { status: 500 });
  }

  return NextResponse.json({ threads: data ?? [] });
}

export async function POST(req: Request) {
  const supabase = createServerSupabase();
  
  try {
    const { room_id, title, link_url } = await req.json();
    const user_token = randomUUID();

    if (!room_id || (!title && !link_url)) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("threads")
      .insert({
        id: randomUUID(),
        room_id,
        title: title || "Untitled Nouk",
        link_url: link_url || null,
        user_token,
      })
      .select("id")
      .single();

    if (error) {
      console.error("[POST thread] Insert error:", error);
      return NextResponse.json(
        { error: "Could not create thread" },
        { status: 500 }
      );
    }

    return NextResponse.json({ id: data.id });
  } catch (err) {
    console.error("[POST thread] Unexpected error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
