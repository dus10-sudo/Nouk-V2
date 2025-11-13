// src/components/ShareThought.tsx
'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

type Room = { slug: string; name: string; description?: string };

const ROOM_PRESETS: Room[] = [
  { slug: 'library',   name: 'Library',   description: 'Books, projects, ideas' },
  { slug: 'kitchen',   name: 'Kitchen',   description: 'Recipes, cooking, food talk' },
  { slug: 'theater',   name: 'Theater',   description: 'Movies & TV' },
  { slug: 'game-room', name: 'Game Room', description: 'Games, music & hobbies' },
  { slug: 'garage',    name: 'Garage',    description: 'DIY, tools, builds' },
  { slug: 'study',     name: 'Study',     description: 'Focus, learning, planning' },
];

function isValidUrl(s: string) {
  if (!s) return true; // optional
  try {
    // allow bare domains by prefixing http
    const u = new URL(/^https?:\/\//i.test(s) ? s : `https://${s}`);
    return Boolean(u.hostname);
  } catch {
    return false;
  }
}

export default function ShareThought() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [room, setRoom] = useState<Room | null>(null);
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const startDisabled = useMemo(
    () => !room || !isValidUrl(link),
    [room, link]
  );

  // close on Esc
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const modalRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {/* CTA */}
      <button
        onClick={() => setOpen(true)}
        className="w-full max-w-[680px] rounded-2xl px-6 py-4 text-[18px] font-medium primary shadow-card"
      >
        Share a Thought
      </button>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/30 p-4"
          onClick={() => setOpen(false)}
          aria-modal="true"
          role="dialog"
        >
          <div
            ref={modalRef}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[560px] rounded-2xl border border-[var(--ring)] bg-[var(--card)] p-5 shadow-soft"
          >
            <h2 className="mb-1 text-[22px] font-serif text-ink">Start a New Nouk</h2>
            <p className="mb-4 text-[13px] text-muted">Find your cozy corner.</p>

            {/* Step 1 */}
            <label className="mb-2 block text-[14px] text-muted">
              1) Where do you want to post?
            </label>
            <div className="mb-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {ROOM_PRESETS.map((r) => {
                const selected = room?.slug === r.slug;
                return (
                  <button
                    key={r.slug}
                    onClick={() => setRoom(r)}
                    className={`rounded-xl border px-3 py-2 text-left transition
                      ${selected
                        ? 'border-[var(--accent)] bg-[var(--paper)]'
                        : 'border-[var(--ring)] bg-[var(--card)] hover:bg-[var(--paper)]'
                      }`}
                  >
                    <div className="font-medium text-ink">{r.name}</div>
                    <div className="text-[12px] text-muted">{r.description}</div>
                  </button>
                );
              })}
            </div>

            {/* Step 2 */}
            <label className="mb-2 block text-[14px] text-muted">
              2) What’s the thread about? (optional link/topic)
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Say something small to start…"
              className="mb-2 w-full rounded-xl border border-[var(--ring)] bg-white/80 px-3 py-2 outline-none"
            />
            <input
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="Optional link (YouTube, Spotify, article…)"
              className={`mb-4 w-full rounded-xl border px-3 py-2 outline-none
                ${isValidUrl(link) ? 'border-[var(--ring)] bg-white/80' : 'border-red-400 bg-red-50'}`}
            />
            {!isValidUrl(link) && (
              <div className="mb-3 text-[12px] text-red-600">
                Please enter a valid link (with or without https://).
              </div>
            )}

            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setOpen(false)}
                className="rounded-xl border border-[var(--ring)] bg-[var(--card)] px-4 py-2"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const dest = room
                    ? `/room/${room.slug}?title=${encodeURIComponent(title)}&link=${encodeURIComponent(link)}`
                    : '/';
                  router.push(dest);
                  setOpen(false);
                }}
                disabled={startDisabled}
                className="rounded-xl px-4 py-2 text-white transition
                           disabled:opacity-60 disabled:cursor-not-allowed
                           bg-[var(--accent)] active:bg-[var(--accent-press)]"
              >
                Start Nouk
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
