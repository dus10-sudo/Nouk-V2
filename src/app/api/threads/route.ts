// src/app/api/threads/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { roomSlug, title, body, link_url } = await request.json();

    const trimmedTitle = (title ?? '').trim();
    const trimmedBody = (body ?? '').trim();
    const trimmedLink = (link_url ?? '').trim();

    if (!roomSlug || (!trimmedTitle && !trimmedBody)) {
      return NextResponse.json(
        { error: 'roomSlug and at least a title or body are required' },
        { status: 400 }
      );
    }

    // Find the room by slug
    const { data: rooms, error: roomError } = await supabase
      .from('rooms')
      .select('id')
      .eq('slug', roomSlug)
      .eq('is_active', true)
      .limit(1);

    if (roomError) {
      console.error('[threads] room lookup error:', roomError);
      return NextResponse.json(
        { error: 'Failed to find room' },
        { status: 500 }
      );
    }

    const room = rooms?.[0];
    if (!room) {
      return NextResponse.json(
        { error: 'Room not found' },
        { status: 404 }
      );
    }

    const ttlHours = 24;
    const now = new Date();
    const expiresAt = new Date(now.getTime() + ttlHours * 60 * 60 * 1000);

    // Insert the thread
    const { data: inserted, error: threadError } = await supabase
      .from('threads')
      .insert({
        room_id: room.id,
        title: trimmedTitle || null,
        body: trimmedBody || null,
        link_url: trimmedLink || null,
        ttl_hours: ttlHours,
        expires_at: expiresAt.toISOString(),
        is_archived: false,
      })
      .select('id')
      .single();

    if (threadError) {
      console.error('[threads] insert error:', threadError);
      return NextResponse.json(
        { error: 'Failed to create thread' },
        { status: 500 }
      );
    }

    // Respond with JSON so the client can redirect
    return NextResponse.json(
      { ok: true, threadId: inserted.id },
      { status: 200 }
    );
  } catch (err) {
    console.error('[threads] unexpected error:', err);
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}
