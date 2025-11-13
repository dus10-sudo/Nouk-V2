// components/NewThreadButton.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createThread } from "@/lib/supabase";

export default function NewThreadButton({ roomSlug }: { roomSlug: string }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleCreate() {
    if (!title.trim()) return;
    setLoading(true);
    try {
      const id = await createThread({
        roomSlug,
        title: title.trim(),
        link_url: link.trim() ? link.trim() : null,
      });
      setOpen(false);
      setTitle("");
      setLink("");
      router.push(`/t/${id}`);
    } catch (e) {
      console.error(e);
      alert("Failed to create thread.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        className="rounded-2xl bg-stone-900 px-4 py-2 text-stone-100 shadow-sm transition hover:opacity-90 dark:bg-stone-100 dark:text-stone-900"
        onClick={() => setOpen(true)}
      >
        New thread
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-3xl bg-stone-50 p-5 shadow-xl ring-1 ring-black/5 dark:bg-stone-900"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="mb-3 font-serif text-xl">Start a New Nouk</h3>

            <label className="mb-1 block text-sm opacity-70">Title</label>
            <input
              className="mb-3 w-full rounded-xl border border-stone-300 bg-white p-2 outline-none focus:ring-2 focus:ring-amber-400 dark:border-stone-700 dark:bg-stone-800"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What’s this thread about?"
            />

            <label className="mb-1 block text-sm opacity-70">
              Optional link (YouTube, Spotify…)
            </label>
            <input
              className="mb-4 w-full rounded-xl border border-stone-300 bg-white p-2 outline-none focus:ring-2 focus:ring-amber-400 dark:border-stone-700 dark:bg-stone-800"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://…"
            />

            <div className="flex items-center justify-end gap-2">
              <button
                className="rounded-xl px-3 py-2 text-sm opacity-70 hover:opacity-100"
                onClick={() => setOpen(false)}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                className="rounded-xl bg-amber-500 px-3 py-2 text-sm text-white shadow hover:brightness-95 disabled:opacity-60"
                onClick={handleCreate}
                disabled={loading || !title.trim()}
              >
                {loading ? "Starting…" : "Start Nouk"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
