'use client';

import { useEffect, useState } from 'react';
import {
  listRooms,
  listThreadsForRoom,
  listMessages,
  createThread,
  addMessage,
} from '@/lib/supabase';

export default function Diag() {
  const [log, setLog] = useState<string[]>([]);
  const push = (line: string) => setLog(l => [...l, line]);

  useEffect(() => {
    (async () => {
      try {
        push('Fetching rooms…');
        const rooms = await listRooms();
        push(`rooms: ${rooms.length}`);

        if (rooms.length === 0) {
          push('No rooms found. Create rows in the "rooms" table (slug, name).');
          return;
        }

        const first = rooms[0];
        push(`using room: ${first.slug} (${first.name})`);

        push('Listing threads for room…');
        const threads = await listThreadsForRoom(first.slug);
        push(`threads: ${threads.length}`);

        push('Creating a test thread…');
        const tid = await createThread(first.slug, {
          title: 'Diag thread',
          link_url: null,
        });
        push(`created thread id: ${tid}`);

        push('Posting a test message…');
        await addMessage(tid, 'Hello from /diag ✅');
        push('message posted');

        push('Reading messages…');
        const msgs = await listMessages(tid);
        push(`messages now: ${msgs.length}`);

        push('DONE ✅');
      } catch (e: any) {
        push(`ERROR: ${e?.message ?? String(e)}`);
      }
    })();
  }, []);

  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="text-2xl font-bold mb-4">Diagnostics</h1>
      <pre className="whitespace-pre-wrap rounded-lg border p-4 text-sm bg-white/60 dark:bg-black/40">
        {log.join('\n')}
      </pre>
    </main>
  );
}
