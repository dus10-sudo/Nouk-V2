// src/app/api/threads/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { roomSlug, title, body: textBody, link_url } = body;

    if (!roomSlug) {
      return NextResponse.json({ error: 'Missing roomSlug' }, { status: 400 });
    }

    // find room by slug
    const { data: room, error: roomError } = await supabase
      .from('rooms')
      .select('id')
      .eq('slug', roomSlug)
      .single();

    if (roomError || !room) {
      return NextResponse.json({ error: 'Room not found' }, { status: 400 });
    }

    const { data: thread, error: threadError } = await supabase
      .from('threads')
      .insert({
        room_id: room.id,
        title: title || null,
        body: textBody || null,
        link_url: link_url || null,
      })
      .select('id')
      .single();

    if (threadError || !thread) {
      console.error(threadError);
      return NextResponse.json({ error: 'Failed to create thread' }, { status: 500 });
    }

    return NextResponse.json({ id: thread.id }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
