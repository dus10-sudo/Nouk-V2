// src/components/ShareThought.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Room = {
  slug: string;
  name: string;
  description?: string;
};

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

  // Lock body scroll while modal is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = prev || '';
    }
    return () => {
      document.body.style.overflow = prev || '';
    };
  }, [open]);

  const canStart = !!room;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleStart = () => {
    if (!room) return;

    const dest = `/room/${room.slug}?title=${encodeURIComponent(
      title.trim(),
    )}&link=${encodeURIComponent(link.trim())}`;

    router.push(dest);
    setOpen(false);
  };

  return (
    <>
      {/* Bottom docked CTA – visible only when modal is closed */}
      {!open && (
        <button
          type="button"
          onClick={handleOpen}
          className="nouk-cta fixed left-1/2 bottom-[max(18px,calc(env(safe-area-inset-bottom)+18px))] z-40 w-[min(640px,92vw)] -translate-x-1/2 px-6 py-4 text-[17px] shadow-soft"
        >
          Share a Thought
        </button>
      )}

      {/* Centered modal sheet */}
      {open && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-[rgba(0,0,0,0.32)] backdrop-blur-sm"
          onClick={handleClose}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-[min(640px,92vw)] rounded-2xl border border-[var(--ring)] bg-[var(--card)] p-5 shadow-soft animate-modalIn"
          >
            <h2 className="mb-1 text-[22px] font-serif text-ink">Start a New Nouk</h2>
            <p className="mb-4 text-[13px] text-muted">Find your cozy corner.</p>

            {/* Step 1 – room grid */}
            <label className="mb-2 block text-[14px] text-muted">
              1) Where do you want to post?
            </label>
            <div className="mb-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {ROOM_PRESETS.map((r) => {
                const selected = room?.slug === r.slug;
                return (
                  <button
                    key={r.slug}
                    type="button"
                    onClick={() => setRoom(r)}
                    className={`rounded-xl border px-3 py-2 text-left text-[13px] transition
                      ${
                        selected
                          ? 'border-[var(--accent)] bg-[var(--card)] shadow-soft'
                          : 'border-[var(--ring)] bg-[var(--card)] hover:border-[var(--accent)]'
                      }`}
                  >
                    <div className="font-medium text-ink">{r.name}</div>
                    {r.description && (
                      <div className="text-[11px] text-[var(--muted)]">
                        {r.description}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Step 2 – bigger inputs */}
            <label className="mb-2 block text-[14px] text-[var(--ink)]">
              2) What’s the thread about? (optional link/topic)
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Say something small to start…"
              className="mb-3 w-full rounded-xl border border-[var(--ring)] bg-white/85 px-3 py-3 text-[14px] outline-none focus:ring-2 focus:ring-[var(--accent)]"
            />
            <input
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="Optional link (YouTube, Spotify, article…)"
              className="mb-5 w-full rounded-xl border border-[var(--ring)] bg-white/85 px-3 py-3 text-[14px] outline-none focus:ring-2 focus:ring-[var(--accent)]"
            />

            {/* Actions */}
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={handleClose}
                className="rounded-xl border border-[var(--ring)] bg-[var(--card)] px-4 py-2 text-[14px] active:scale-[0.97]"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!canStart}
                onClick={handleStart}
                className={[
                  'rounded-xl px-4 py-2 text-[14px] font-semibold transition',
                  canStart
                    ? 'bg-[var(--accent)] text-white shadow-[0_6px_18px_rgba(0,0,0,0.25)] active:translate-y-[1px] active:shadow-[0_4px_12px_rgba(0,0,0,0.3)]'
                    : 'bg-[var(--accent)]/50 text-white/70 opacity-70 cursor-not-allowed',
                ].join(' ')}
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
