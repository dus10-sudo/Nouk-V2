// src/app/diag/page.tsx
'use client';

import { useState } from 'react';
import {
  listRooms,
  listThreads,
  listMessages,
  createThread,
  addMessage,
} from '@/lib/supabase';

export default function Diag() {
  const [log, setLog] = useState<string[]>([]);
  const push = (m: string) => setLog((prev) => [...prev, m]);

  const run = async () => {
    setLog([]);
    try {
      push('Fetching rooms…');
      const rooms = await listRooms();
      const slugs = rooms.map((r) => r.slug).join(', ') || '(none)';
      push(`rooms: ${slugs}`);

      const roomSlug = rooms[0]?.slug || 'living';

      push(`Creating test thread in ${roomSlug}…`);
      const threadId = await createThread({
        roomSlug,
        title: 'Diag thread',
        link_url: null,
      });
      push(`thread id: ${threadId}`);

      push('Posting test message…');
      await addMessage({ threadId, body: 'Hello from /diag' });
      push('Message posted.');

      push('Fetching messages…');
      const msgs = await listMessages(threadId);
      push(`messages: ${msgs.length}`);

      push('Fetching threads for room…');
      const threads = await listThreads(roomSlug);
      push(`threads: ${threads.length}`);
    } catch (e: any) {
      push('ERROR: ' + (e?.message ?? String(e)));
    }
  };

  return (
    <main style={{ padding: 24, maxWidth: 800, margin: '0 auto' }}>
      <h1>/diag</h1>
      <p>This runs a full smoke test against Supabase.</p>
      <button
        onClick={run}
        style={{
          padding: '10px 14px',
          borderRadius: 10,
          border: '1px solid #ccc',
          cursor: 'pointer',
          marginTop: 12,
        }}
      >
        Run diagnostics
      </button>
      <pre
        style={{
          background: '#111',
          color: '#eaeaea',
          padding: 16,
          marginTop: 16,
          borderRadius: 12,
          whiteSpace: 'pre-wrap',
        }}
      >
        {log.join('\n')}
      </pre>
    </main>
  );
}
