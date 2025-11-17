// src/app/api/threads/route.ts
import { NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { roomSlug, title, body, link_url } = await request.json();

    // Basic validation
    if (!roomSlug || (!title?.trim() && !body?.trim())) {
      return NextResponse.json(
        { error: 'Missing room or content' },
        { status: 400 }
      );
    }

    // Look up the room by slug
    const { data: room, error: roomError } = await supabase
      .from('rooms')
      .select('id')
      .eq('slug', roomSlug)
      .single();

    if (roomError || !room) {
      console.error('Room lookup failed:', roomError);
      return NextResponse.json(
        { error: 'Room not found' },
        { status: 400 }
      );
    }

    // Simple anonymous token for now
    const userToken = `anon_${randomUUID()}`;

    // Insert the thread, matching *exactly* your columns
    const { data: inserted, error: insertError } = await supabase
      .from('threads')
      .insert({
        room_id: room.id,
        title: title?.trim() || null,
        body: body?.trim() || null,
        link_url: link_url?.trim() || null,
        user_token: userToken,
        // created_at / expires_at / last_activity use DB defaults / triggers
      })
      .select('id')
      .single();

    if (insertError || !inserted) {
      console.error('Insert failed:', insertError);
      return NextResponse.json(
        { error: 'Failed to create thread' },
        { status: 500 }
      );
    }

    // The client only checks res.ok, but we return the id anyway
    return NextResponse.json({ id: inserted.id }, { status: 200 });
  } catch (err) {
    console.error('Unexpected error in /api/threads:', err);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
