// src/app/api/replies/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const thread_id = formData.get('thread_id') as string | null;
    const body = (formData.get('body') as string | null) || '';

    if (!thread_id || !body.trim()) {
      return NextResponse.redirect(new URL(`/thread/${thread_id}`, request.url));
    }

    const { error } = await supabase.from('replies').insert({
      thread_id,
      body: body.trim(),
    });

    if (error) {
      console.error(error);
    }

    return NextResponse.redirect(new URL(`/thread/${thread_id}`, request.url));
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
