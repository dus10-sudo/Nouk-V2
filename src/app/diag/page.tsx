// src/app/diag/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { listRooms, listThreads, listMessages, createThread, addMessage } from '@/lib/supabase';

export default function Diag() {
  const [log, setLog] = useState<string[]>([]);
  const push = (m: string) => setLog((x) => [m, ...x]);

  useEffect(() => {
    (async () => {
      try {
        push('Reading rooms…');
        const rooms = await listRooms();
        push(`rooms: ${rooms.length}`);
        const living = rooms.find(r => r.slug === 'living');
        if (!living) {
          push('No living room found (slug "living").');
          return;
        }
        push('Creating test thread…');
        const tid = await createThread('living', 'Diag thread');
        push(`thread id: ${tid}`);
        push('Posting test message…');
        await addMessage(tid, 'Hello from /diag');
        push('Reading messages…');
        const msgs = await listMessages(tid);
        push(`messages: ${msgs.length}`);
        push('OK ✅');
      } catch (e: any) {
        push(`ERR: ${e?.message ?? String(e)}`);
      }
    })();
  }, []);

  return (
    <div style={{ padding: 16, fontFamily: 'system-ui, sans-serif' }}>
      <h1>/diag</h1>
      <p>Env present? {process.env.NEXT_PUBLIC_SUPABASE_URL ? 'YES' : 'NO'} / {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'YES' : 'NO'}</p>
      <pre style={{ whiteSpace: 'pre-wrap', background: '#111', color: '#0f0', padding: 12, borderRadius: 8 }}>
        {log.join('\n')}
      </pre>
    </div>
  );
}
