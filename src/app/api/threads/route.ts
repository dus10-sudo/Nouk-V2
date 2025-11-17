// src/app/api/threads/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { randomUUID } from 'crypto';

export async function POST(req: Request) {
  try {
    const { roomSlug, title, body, link_url } = await req.json();

    if (!roomSlug || (!title && !body)) {
      return NextResponse.json(
        { error: 'roomSlug and some text are required' },
        { status: 400 }
      );
    }

    // 1) Look up the room by slug
    const { data: room, error: roomError } = await supabase
      .from('rooms')
      .select('id')
      .eq('slug', roomSlug)
      .single();

    if (roomError || !room) {
      console.error('Room lookup failed', roomError);
      return NextResponse.json(
        { error: 'Room not found' },
        { status: 400 }
      );
    }

    const userToken = randomUUID();

    // Use title if given, otherwise derive from the body
    const threadTitle: string =
      (title as string) ||
      String(body || '')
        .trim()
        .slice(0, 80) ||
      'Untitled';

    // 2) Insert the thread
    const { data: thread, error: threadError } = await supabase
      .from('threads')
      .insert({
        room_id: room.id,
        title: threadTitle,
        user_token: userToken,
        // if you later add a link_url column to threads, you can include it here
        // link_url: link_url || null,
      })
      .select('id')
      .single();

    if (threadError || !thread) {
      console.error('Error inserting thread', threadError);
      return NextResponse.json(
        { error: 'Failed to create thread' },
        { status: 500 }
      );
    }

    // 3) Insert the first reply if there is a body
    if (body && String(body).trim().length > 0) {
      const { error: replyError } = await supabase.from('replies').insert({
        thread_id: thread.id,
        user_token: userToken,
        body: String(body).trim(),
      });

      if (replyError) {
        console.error('Error inserting first reply', replyError);
        // Don’t fail the whole thing, just log it
      }
    }

    return NextResponse.json({ ok: true, threadId: thread.id });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}
