'use client';

import { useState } from 'react';
import { createThread } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

type Props = {
  roomSlug: string;
};

export default function NewThreadButton({ roomSlug }: Props) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const reset = () => {
    setTitle('');
    setLink('');
    setOpen(false);
    setLoading(false);
  };

  const handleCreate = async () => {
    const cleanTitle = title.trim();
    const cleanLink = link.trim() || null;

    if (!cleanTitle) return;

    setLoading(true);
    try {
      // NOTE: createThread expects positional args:
      // createThread(roomSlug: string, title: string, link_url?: string | null)
      const threadId = await createThread(roomSlug, cleanTitle, cleanLink);
      reset();
      // navigate to the new thread
      router.push(`/t/${threadId}`);
    } catch (e) {
      console.error('Failed to create thread:', e);
      setLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 rounded-full px-5 py-3 shadow-lg bg-orange-600 text-white hover:opacity-90 transition"
        aria-label="Start a new thread"
      >
        + New
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl dark:bg-neutral-900">
            <h2 className="mb-3 text-lg font-semibold">Start a new thread</h2>

            <label className="mb-2 block text-sm opacity-80">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What’s the vibe?"
              className="mb-4 w-full rounded-xl border px-3 py-2 dark:bg-neutral-800 dark:border-neutral-700"
            />

            <label className="mb-2 block text-sm opacity-80">
              Optional link (YouTube, Spotify, etc.)
            </label>
            <input
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://…"
              className="mb-6 w-full rounded-xl border px-3 py-2 dark:bg-neutral-800 dark:border-neutral-700"
            />

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={reset}
                className="rounded-xl px-4 py-2 text-sm hover:underline"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCreate}
                disabled={loading || !title.trim()}
                className="rounded-xl bg-orange-600 px-4 py-2 text-sm text-white disabled:opacity-50"
              >
                {loading ? 'Creating…' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
