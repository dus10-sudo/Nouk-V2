import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';
import { randomUUID } from 'crypto';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const SERVICE = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

function getClient(server = false) {
  return createClient(SUPABASE_URL, server && SERVICE ? SERVICE : ANON, {
    auth: { persistSession: false },
  });
}

export async function POST(req: Request) {
  try {
    const { roomSlug, title, link_url } = await req.json();
    if (!roomSlug || !title) {
      return NextResponse.json({ error: 'roomSlug and title are required' }, { status: 400 });
    }

    // ensure anonymous token cookie for RLS policies
    const jar = cookies();
    let token = jar.get('nouk_token')?.value;
    if (!token) {
      token = randomUUID();
      jar.set('nouk_token', token, { httpOnly: true, path: '/', sameSite: 'Lax', maxAge: 60 * 60 * 24 * 365 });
    }

    const supabase = getClient(Boolean(SERVICE));

    // look up room id by slug
    const { data: room, error: roomErr } = await supabase
      .from('rooms')
      .select('id, slug')
      .eq('slug', roomSlug)
      .maybeSingle();

    if (roomErr) throw roomErr;
    if (!room) return NextResponse.json({ error: 'Room not found' }, { status: 404 });

    const { data, error } = await supabase
      .from('threads')
      .insert({
        room_id: room.id,
        title,
        link_url: link_url ?? null,
        user_token: token,
      })
      .select('id')
      .maybeSingle();

    if (error) throw error;

    return NextResponse.json({ id: data?.id, roomSlug });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Unexpected error' }, { status: 500 });
  }
}
