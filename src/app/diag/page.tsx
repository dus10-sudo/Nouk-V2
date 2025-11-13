'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  listRooms,
  listThreads,
  listReplies,
  type Room,
  type Thread,
  type Reply,
} from '@/lib/supabase';
import { createThread, addReply } from '@/server/actions';

type Line = string;

export default function Diag() {
  const [log, setLog] = useState<Line[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [threads, setThreads] = useState<Thread[]>([]);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [busy, setBusy] = useState(false);
  const push = (s: string) => setLog((x) => [...x, s]);

  async function run() {
    if (busy) return;
    setBusy(true);
    setLog([]);
    setRooms([]);
    setThreads([]);
    setReplies([]);

    try {
      push('Fetching rooms…');
      const rs = await listRooms();
      setRooms(rs);
      push(`rooms: ${rs.length}`);
      if (rs.length === 0) {
        push('No rooms found. Ensure SQL seed ran and rooms.is_active = true.');
        return;
      }

      const first = rs[0];
      push(`Using room: ${first.title} (${first.slug})`);

      push('Creating a test thread…');
      const tid = await createThread(first.slug, 'Diag thread', null);
      push(`thread id: ${tid}`);

      push('Posting a test reply…');
      await addReply(tid, 'Hello from /diag');
      push('reply posted.');

      push('Listing threads in the room…');
      const ts = await listThreads(first.id);
      setThreads(ts);
      push(`threads found: ${ts.length}`);

      push('Listing replies for the new thread…');
      const rs2 = await listReplies(tid);
      setReplies(rs2);
      push(`replies found: ${rs2.length}`);
    } catch (e: any) {
      push(`ERROR: ${e?.message ?? String(e)}`);
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    // Auto-run once when you land here
    // (click the button again if you want to re-run)
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4 dark:text-white">Diagnostics</h1>

      <button
        onClick={run}
        disabled={busy}
        className="mb-4 rounded-xl px-4 py-2 bg-zinc-900 text-white dark:bg-orange-600 disabled:opacity-60"
      >
        {busy ? 'Running…' : 'Run checks'}
      </button>

      <section className="mb-6">
        <h2 className="font-medium mb-2 dark:text-zinc-100">Log</h2>
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 p-3 text-sm dark:text-zinc-200">
          {log.length === 0 ? <p>—</p> : log.map((l, i) => <p key={i}>{l}</p>)}
        </div>
      </section>

      <section className="mb-6">
        <h2 className="font-medium mb-2 dark:text-zinc-100">Rooms</h2>
        <ul className="space-y-1 text-sm dark:text-zinc-200">
          {rooms.map((r) => (
            <li key={r.id}>
              <Link href={`/room/${r.slug}`} className="underline">
                {r.title}
              </Link>
              {r.description ? <span className="opacity-70"> — {r.description}</span> : null}
            </li>
          ))}
          {rooms.length === 0 && <li>—</li>}
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="font-medium mb-2 dark:text-zinc-100">Threads (in first room)</h2>
        <ul className="space-y-1 text-sm dark:text-zinc-200">
          {threads.map((t) => (
            <li key={t.id}>
              <Link href={`/t/${t.id}`} className="underline">
                {t.title}
              </Link>
              {t.expires_at ? (
                <span className="opacity-70"> — expires {new Date(t.expires_at).toLocaleString()}</span>
              ) : null}
            </li>
          ))}
          {threads.length === 0 && <li>—</li>}
        </ul>
      </section>

      <section>
        <h2 className="font-medium mb-2 dark:text-zinc-100">Replies (for last created thread)</h2>
        <ul className="space-y-1 text-sm dark:text-zinc-200">
          {replies.map((m) => (
            <li key={m.id}>
              <span className="opacity-70">{new Date(m.created_at ?? '').toLocaleString()} — </span>
              {m.body}
            </li>
          ))}
          {replies.length === 0 && <li>—</li>}
        </ul>
      </section>
    </main>
  );
          }
