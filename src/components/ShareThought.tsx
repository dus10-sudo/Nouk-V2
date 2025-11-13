// src/components/ShareThought.tsx
'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
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

export default function ShareThought() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [room, setRoom] = useState<Room | null>(null);
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [mounted, setMounted] = useState(false);

  // Ensure portals work only on client
  useEffect(() => setMounted(true), []);

  // Lock scroll when open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="nouk-cta fixed left-1/2 -translate-x-1/2 bottom-[max(16px,env(safe-area-inset-bottom))] z-[40] w-[92%] max-w-[720px] px-6 py-4 text-[18px] font-medium rounded-2xl shadow-[0_2px_0_rgba(0,0,0,0.05)]"
        >
          Share a Thought
        </button>
      )}

      {mounted && open && createPortal(
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/45 p-4"
          role="dialog"
          aria-modal="true"
          onClick={close}
        >
          <div
            className="w-full max-w-[560px] max-h-[85vh] overflow-auto rounded-2xl border border-[var(--ring)] bg-[var(--card)] p-5 shadow-soft"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="mb-1 text-[22px] font-serif">Start a New Nouk</h2>
            <p className="mb-4 text-[14px] text-[var(--muted)]">Find your cozy corner.</p>

            <label className="mb-2 block text-[14px] text-[var(--muted)]">
              1) Where do you want to post?
            </label>
            <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {ROOM_PRESETS.map((r) => {
                const selected = room?.slug === r.slug;
                return (
                  <button
                    key={r.slug}
                    onClick={() => setRoom(r)}
                    className={`rounded-xl border px-3 py-2 text-left transition
                      ${selected
                        ? 'border-[var(--select)] bg-[var(--select-bg)]'
                        : 'border-[var(--ring)] bg-[var(--card)] hover:bg-white/50'
                      }`}
                  >
                    <div className="font-medium">{r.name}</div>
                    <div className="text-[12px] text-[var(--muted)]">{r.description}</div>
                  </button>
                );
              })}
            </div>

            <label className="mb-2 block text-[14px] text-[var(--muted)]">
              2) What’s the thread about? (optional link/topic)
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Say something small to start…"
              className="mb-2 w-full rounded-xl border border-[var(--ring)] bg-white/70 px-3 py-2 outline-none"
            />
            <input
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="Optional link (YouTube, Spotify, article…)"
              className="mb-4 w-full rounded-xl border border-[var(--ring)] bg-white/70 px-3 py-2 outline-none"
            />

            <div className="flex items-center justify-end gap-2">
              <button
                onClick={close}
                className="rounded-xl border border-[var(--ring)] px-4 py-2"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const dest = room
                    ? `/room/${room.slug}?title=${encodeURIComponent(title)}&link=${encodeURIComponent(link)}`
                    : '/';
                  router.push(dest);
                  close();
                }}
                disabled={!room}
                className="rounded-xl bg-[var(--accent)] px-4 py-2 text-white disabled:opacity-60"
              >
                Start Nouk
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
