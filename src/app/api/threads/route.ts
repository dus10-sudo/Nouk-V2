// src/app/api/threads/route.ts
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { getClient } from '@/lib/supabase';

const ONE_YEAR = 60 * 60 * 24 * 365;

export async function POST(req: Request) {
  const { roomSlug, title, link } = (await req.json().catch(() => ({}))) as {
    roomSlug?: string;
    title?: string;
    link?: string | null;
  };

  if (!roomSlug) {
    return NextResponse.json({ error: 'roomSlug required' }, { status: 400 });
  }

  // Ensure we have a user token cookie
  const jar = cookies();
  let token = jar.get('nouk_token')?.value;
  if (!token) {
    token = randomUUID();
    jar.set({
      name: 'nouk_token',
      value: token,
      httpOnly: true,
      path: '/',
      sameSite: 'lax', // << was 'Lax' (wrong type)
      maxAge: ONE_YEAR,
    });
  }

  const supabase = getClient(true);

  // Find the room ID by slug
  const { data: room, error: roomErr } = await supabase
    .from('rooms')
    .select('id, slug')
    .eq('slug', roomSlug)
    .maybeSingle();

  if (roomErr || !room) {
    return NextResponse.json({ error: 'Room not found' }, { status: 404 });
  }

  // Create the thread
  const { data, error } = await supabase
    .from('threads')
    .insert({
      room_id: room.id,
      title: title ?? '',
      link_url: link ?? null,
      user_token: token,
    })
    .select('id')
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ id: data?.id }, { status: 201 });
}
