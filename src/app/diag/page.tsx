// src/app/diag/page.tsx
'use client';

import { useState } from 'react';
import {
  listRooms,
  createThread,
  addMessage,
} from '@/lib/supabase';

export default function Diag() {
  const [log, setLog] = useState<string[]>([]);
  const [running, setRunning] = useState(false);

  const push = (line: string) => setLog((prev) => [...prev, line]);

  const run = async () => {
    if (running) return;
    setRunning(true);
    setLog([]);

    try {
      push('Listing rooms…');
      const rooms = await listRooms();
      push(`Rooms count: ${rooms.length}`);
      if (!rooms.length) {
        push('No rooms found. Seed rooms first.');
        return;
      }

      const first = rooms[0];
      push(`Using room: ${first.name} (${first.slug})`);

      push('Creating a test thread…');
      // POSITONAL ARGS: (roomSlug, title, link_url?)
      const threadId = await createThread(first.slug, 'Diag thread', null);
      push(`Thread created with id: ${threadId}`);

      push('Posting a test message…');
      await addMessage(threadId, 'Hello from /diag');
      push('Message posted ✓');

      push('All good! Visit the home page or the room to verify.');
    } catch (e: any) {
      push(`ERROR: ${e?.message ?? String(e)}`);
    } finally {
      setRunning(false);
    }
  };

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-xl font-semibold mb-4">Diagnostics</h1>

      <button
        onClick={run}
        disabled={running}
        className="rounded-lg bg-teal-600 text-white px-4 py-2 hover:bg-teal-700 disabled:opacity-60"
      >
        {running ? 'Running…' : 'Run Tests'}
      </button>

      <div className="mt-6 space-y-1 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4 text-sm">
        {log.length === 0 ? (
          <p className="opacity-70">Logs will appear here…</p>
        ) : (
          log.map((l, i) => (
            <div key={i} className="font-mono">
              {l}
            </div>
          ))
        )}
      </div>
    </main>
  );
}
