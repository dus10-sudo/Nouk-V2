'use client';

import { useEffect, useState } from 'react';
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

  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      {/* Docked CTA */}
      <button
        onClick={() => setOpen(true)}
        className="nouk-cta w-full max-w-[680px] px-6 py-4 text-[18px] font-medium shadow-[0_2px_0_rgba(0,0,0,0.05)]"
      >
        Share a Thought
      </button>

      {/* Modal Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-[rgba(0,0,0,0.6)] backdrop-blur-[2px] p-4"
          onClick={() => setOpen(false)}
          aria-modal="true"
          role="dialog"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="animate-[fadeInUp_0.25s_ease-out] w-full max-w-[560px] max-h-[85vh] overflow-auto rounded-2xl border border-[var(--ring)] bg-[var(--paper)] p-5 shadow-soft"
          >
            <h2 className="mb-1 text-[22px] font-serif">Start a New Nouk</h2>
            <p className="mb-4 text-[14px] text-[var(--muted)]">Find your cozy corner.</p>

            {/* Step 1: pick room */}
            <label className="mb-2 block text-[14px] text-[var(--ink)]">
              1) Where do you want to post?
            </label>
            <div className="mb-5 grid grid-cols-2 gap-2 sm:grid-cols-2">
              {ROOM_PRESETS.map((r) => {
                const active = room?.slug === r.slug;
                return (
                  <button
                    key={r.slug}
                    onClick={() => setRoom(r)}
                    className={`rounded-xl border px-4 py-3 text-left transition-colors ${
                      active
                        ? 'border-[var(--accent)] bg-[var(--card)]'
                        : 'border-[var(--ring)] bg-[var(--card)]'
                    }`}
                    aria-pressed={active}
                  >
                    <div className="font-medium">{r.name}</div>
                    <div className="text-[12px] text-[var(--muted)]">{r.description}</div>
                  </button>
                );
              })}
            </div>

            {/* Step 2: title/link */}
            <label className="mb-2 block text-[14px] text-[var(--ink)]">
              2) What’s the thread about? (optional link/topic)
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Say something small to start…"
              className="mb-3 w-full rounded-xl border border-[var(--ring)] bg-white/80 px-3 py-2 outline-none"
            />
            <input
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="Optional link (YouTube, Spotify, article…)"
              className="mb-5 w-full rounded-xl border border-[var(--ring)] bg-white/80 px-3 py-2 outline-none"
            />

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
                disabled={!room}
                className="rounded-xl bg-[var(--accent)] px-4 py-2 text-white disabled:opacity-60"
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
