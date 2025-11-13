// src/app/diag/page.tsx
'use client';

import { useEffect, useState } from 'react';
import {
  listRooms,
  listThreads,
  listReplies,
  createThread,
  addReply,
  type Room,
} from '@/lib/supabase';

export default function Diag() {
  const [log, setLog] = useState<string[]>([]);
  const push = (line: string) => setLog((l) => [...l, line]);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        push('Fetching rooms…');
        const rooms = await listRooms();
        push(`rooms: ${rooms.length}`);
        if (!rooms.length) {
          push('No rooms found (check SQL seed + is_active flags).');
          return;
        }

        const first: Room = rooms[0]!;
        push(`Using room: ${first.title} (${first.slug})`);

        push('Creating a test thread…');
        const threadId = await createThread(first.slug, 'Diag thread');
        push(`thread id: ${threadId}`);

        push('Posting a test reply…');
        await addReply(threadId, 'Hello from /diag');
        push('reply posted');

        push('Reading threads for this room…');
        const threads = await listThreads(first.id);
        push(`threads now: ${threads.length}`);

        push('Reading replies for our thread…');
        const replies = await listReplies(threadId);
        push(`replies for our thread: ${replies.length}`);
      } catch (e: any) {
        push(`ERR: ${e?.message ?? String(e)}`);
      } finally {
        if (mounted) push('Done.');
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">/diag</h1>
      <ul className="space-y-1 text-sm font-mono">
        {log.map((line, i) => (
          <li key={i}>{line}</li>
        ))}
      </ul>
    </main>
  );
}
