// src/app/api/replies/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const thread_id = formData.get('thread_id') as string | null;
    const rawBody = formData.get('body') as string | null;
    const body = (rawBody ?? '').trim();

    // If we somehow got here without a thread_id, bail cleanly
    if (!thread_id) {
      console.error('[replies] Missing thread_id in POST');
      return NextResponse.json(
        { error: 'Missing thread_id' },
        { status: 400 }
      );
    }

    // If the reply is empty, just bounce back to the thread without inserting
    if (!body) {
      return NextResponse.redirect(
        new URL(`/thread/${thread_id}`, request.url)
      );
    }

    // Insert the reply
    const { error: insertError } = await supabase.from('replies').insert({
      thread_id,
      body,
      // If your replies table has a user_token column and it's NOT NULL,
      // we can add it here later once we decide how to handle identities.
      // user_token,
    });

    if (insertError) {
      console.error('[replies] Error inserting reply:', insertError);
      // Still redirect to the thread, but you could also surface an error query param
      return NextResponse.redirect(
        new URL(`/thread/${thread_id}`, request.url)
      );
    }

    // Optionally, bump last_activity on the thread (this is safe if the column exists)
    const { error: updateError } = await supabase
      .from('threads')
      .update({ last_activity: new Date().toISOString() })
      .eq('id', thread_id);

    if (updateError) {
      console.error('[replies] Error updating thread last_activity:', updateError);
      // Not fatal – we still send the user back to the thread
    }

    // Redirect back to the thread after posting
    return NextResponse.redirect(
      new URL(`/thread/${thread_id}`, request.url)
    );
  } catch (err) {
    console.error('[replies] Unexpected error:', err);
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}
