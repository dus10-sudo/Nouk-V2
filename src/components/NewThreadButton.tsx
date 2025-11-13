'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createThread } from '@/lib/actions';

export default function NewThreadButton({ roomSlug }: { roomSlug: string }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const router = useRouter();

  async function submit() {
    setErr(null);
    const cleanTitle = title.trim();
    const cleanLink = link.trim();
    if (!cleanTitle) return;

    setBusy(true);
    try {
      const id = await createThread(roomSlug, cleanTitle, cleanLink ? cleanLink : null);
      setOpen(false);
      setTitle('');
      setLink('');
      router.push(`/t/${id}`);
    } catch (e: any) {
      // surface the server/DB error
      const msg =
        e?.message ||
        (typeof e === 'string' ? e : 'Something went wrong creating the thread.');
      setErr(msg);
      console.error('createThread error:', e);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      {!open ? (
        <button
          onClick={() => { setOpen(true); setErr(null); }}
          className="rounded-full px-4 py-2 bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow"
        >
          New Thread
        </button>
      ) : (
        <div className="rounded-xl border border-stone-200 dark:border-stone-700 p-3 bg-white/70 dark:bg-stone-900/50 backdrop-blur">
          <div className="space-y-2">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Thread title"
              className="w-full rounded-lg border border-stone-300 dark:border-stone-600 bg-transparent px-3 py-2 outline-none"
            />
            <input
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="Optional link (YouTube, Spotify, etc.)"
              className="w-full rounded-lg border border-stone-300 dark:border-stone-600 bg-transparent px-3 py-2 outline-none"
            />

            {err && (
              <div className="text-sm text-red-600 dark:text-red-400">{err}</div>
            )}

            <div className="flex gap-2 justify-end">
              <button
                disabled={busy}
                onClick={() => setOpen(false)}
                className="px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-600"
              >
                Cancel
              </button>
              <button
                disabled={busy || !title.trim()}
                onClick={submit}
                className="px-3 py-2 rounded-lg bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900"
              >
                {busy ? 'Creating…' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
