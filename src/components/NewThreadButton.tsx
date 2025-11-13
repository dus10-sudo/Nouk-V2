'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createThread } from '@/server/actions';

type Props = {
  roomSlug: string;
};

export default function NewThreadButton({ roomSlug }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function handleCreate() {
    const cleanTitle = title.trim();
    const cleanLink = link.trim() ? link.trim() : null;
    if (!cleanTitle) {
      setErr('Please enter a title.');
      return;
    }
    setLoading(true);
    setErr(null);
    try {
      const threadId = await createThread(roomSlug, cleanTitle, cleanLink);
      // reset + close
      setTitle('');
      setLink('');
      setOpen(false);
      // navigate to the new thread
      router.push(`/t/${threadId}`);
    } catch (e: any) {
      setErr(e?.message ?? 'Failed to create thread.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-5">
      {/* FAB */}
      <button
        onClick={() => setOpen(true)}
        className="h-12 w-12 rounded-full shadow-lg transition active:scale-95
                   bg-orange-600 text-white text-2xl leading-none"
        aria-label="Start a new thread"
        title="Start a new thread"
      >
        +
      </button>

      {/* Lightweight modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={() => !loading && setOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl dark:bg-zinc-900"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold mb-3 dark:text-white">Start a thread</h2>

            <label className="block text-sm mb-1 dark:text-zinc-200">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What would you like to discuss?"
              className="w-full mb-3 rounded-xl border px-3 py-2 outline-none
                         border-zinc-300 focus:border-orange-500 dark:bg-zinc-800
                         dark:border-zinc-700 dark:text-white"
              disabled={loading}
            />

            <label className="block text-sm mb-1 dark:text-zinc-200">
              Optional link (YouTube, Spotify, etc.)
            </label>
            <input
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://…"
              className="w-full mb-3 rounded-xl border px-3 py-2 outline-none
                         border-zinc-300 focus:border-orange-500 dark:bg-zinc-800
                         dark:border-zinc-700 dark:text-white"
              disabled={loading}
            />

            {err && <p className="mb-3 text-sm text-red-600">{err}</p>}

            <div className="flex gap-2 justify-end">
              <button
                onClick={() => !loading && setOpen(false)}
                className="px-4 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 dark:text-white"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                className="px-4 py-2 rounded-xl bg-orange-600 text-white disabled:opacity-60"
                disabled={loading}
              >
                {loading ? 'Creating…' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
