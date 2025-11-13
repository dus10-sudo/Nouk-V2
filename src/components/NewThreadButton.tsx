// src/components/NewThreadButton.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createThread } from '@/lib/supabase';

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

  const reset = () => {
    setTitle('');
    setLink('');
    setErr(null);
  };

  const onCreate = async () => {
    setErr(null);
    const cleanTitle = title.trim();
    const cleanLink = link.trim() || null;

    if (!cleanTitle) {
      setErr('Title is required.');
      return;
    }
    setLoading(true);
    try {
      // createThread(roomSlug: string, title: string, link_url?: string | null)
      const threadId = await createThread(roomSlug, cleanTitle, cleanLink);
      reset();
      setOpen(false);
      router.push(`/t/${threadId}`);
    } catch (e: any) {
      setErr(e?.message ?? 'Failed to create thread.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 rounded-full px-4 py-3 shadow-lg
                   bg-orange-600 text-white hover:bg-orange-700 focus:outline-none
                   focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition"
        aria-label="Start a new thread"
      >
        ＋
      </button>

      {/* Simple sheet/modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="new-thread-title"
        >
          <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-zinc-900 shadow-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 id="new-thread-title" className="text-lg font-semibold">
                New thread
              </h2>
              <button
                onClick={() => {
                  setOpen(false);
                  reset();
                }}
                className="text-sm opacity-70 hover:opacity-100"
              >
                Close
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-sm mb-1">Title *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="What would you like to talk about?"
                  className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700
                             bg-white dark:bg-zinc-950 px-3 py-2 outline-none
                             focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Optional link (YouTube, Spotify…)</label>
                <input
                  type="url"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="https://…"
                  className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700
                             bg-white dark:bg-zinc-950 px-3 py-2 outline-none
                             focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {err && (
                <p className="text-sm text-red-600 dark:text-red-400">{err}</p>
              )}

              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    reset();
                  }}
                  className="rounded-lg px-3 py-2 text-sm border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={onCreate}
                  disabled={loading}
                  className="rounded-lg px-3 py-2 text-sm bg-teal-600 text-white hover:bg-teal-700 disabled:opacity-60"
                >
                  {loading ? 'Creating…' : 'Create'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
