import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { roomSlug, title, body, link_url } = await request.json();

    if (!roomSlug || (!title && !body && !link_url)) {
      return NextResponse.json({ error: 'Missing data' }, { status: 400 });
    }

    // look up room by slug
    const { data: room, error: roomError } = await supabase
      .from('rooms')
      .select('id')
      .eq('slug', roomSlug)
      .single();

    if (roomError || !room) {
      console.error('Room lookup failed', roomError);
      return NextResponse.json({ error: 'Room not found' }, { status: 400 });
    }

    const now = new Date();
    const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString(); // 24h

    const { data: inserted, error: insertError } = await supabase
      .from('threads')
      .insert({
        room_id: room.id,
        title: title || null,
        body: body || null,
        link_url: link_url || null,
        created_at: now.toISOString(),
        expires_at: expiresAt,
        is_archived: false,
        last_activity: now.toISOString(),
        posts_count: 0,
        user_token: null,
      })
      .select('id')
      .single();

    if (insertError || !inserted) {
      console.error('Error inserting thread', insertError);
      return NextResponse.json({ error: 'Failed to create thread' }, { status: 500 });
    }

    return NextResponse.json({ id: inserted.id });
  } catch (err) {
    console.error('Error in /api/threads', err);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
