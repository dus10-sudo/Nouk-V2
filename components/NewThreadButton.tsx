// src/components/NewThreadButton.tsx
"use client";

import { useState } from "react";
import { createThread } from "@/lib/supabase";
import { useRouter } from "next/navigation";

function isWhitelisted(url: string) {
  try {
    const u = new URL(url);
    const ok = ["youtube.com", "youtu.be", "spotify.com", "open.spotify.com"];
    return ok.some((d) => u.hostname.endsWith(d));
  } catch {
    return false;
  }
}

export default function NewThreadButton({ roomSlug }: { roomSlug: string }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [validLink, setValidLink] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function submit() {
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
      alert("Could not create thread.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-full bg-accent px-5 py-3 text-sm font-medium shadow hover:shadow-md transition"
        aria-label="Start a new thread"
      >
        Start Nouk
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/40"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="w-[92vw] max-w-md rounded-2xl bg-card p-5 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="mb-4 text-lg font-semibold">Start a New Nouk</h3>

            <label className="mb-1 block text-sm">Thread title</label>
            <input
              className="mb-3 w-full rounded-xl border bg-background px-3 py-2 outline-none focus:ring"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What’s this thread about?"
            />

            <label className="mb-1 block text-sm">
              Optional link (YouTube/Spotify only)
            </label>
            <input
              className={`w-full rounded-xl border bg-background px-3 py-2 outline-none focus:ring ${
                validLink === false ? "border-red-400" : ""
              }`}
              value={link}
              onChange={(e) => {
                const v = e.target.value.trim();
                setLink(v);
                if (!v) setValidLink(null);
                else setValidLink(isWhitelisted(v));
              }}
              placeholder="https://youtu.be/…"
            />
            {validLink === true && (
              <p className="mt-1 text-xs text-emerald-600">
                Link validated. This thread will focus on your link.
              </p>
            )}
            {validLink === false && (
              <p className="mt-1 text-xs text-red-500">Link not allowed.</p>
            )}

            <div className="mt-5 flex items-center justify-end gap-2">
              <button
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2 text-sm hover:opacity-80"
              >
                Cancel
              </button>
              <button
                onClick={submit}
                disabled={loading || !title.trim() || (link && validLink === false)}
                className="rounded-xl bg-primary px-4 py-2 text-sm text-primary-foreground shadow hover:shadow-md disabled:opacity-50"
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
