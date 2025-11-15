// src/components/ShareThought.tsx
'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';

type RoomDef = {
  slug: string;
  title: string;
  subtitle: string;
};

const ROOMS: RoomDef[] = [
  {
    slug: 'library',
    title: 'Library',
    subtitle: 'Books, projects, ideas',
  },
  {
    slug: 'kitchen',
    title: 'Kitchen',
    subtitle: 'Recipes, cooking, food talk',
  },
  {
    slug: 'theater',
    title: 'Theater',
    subtitle: 'Movies & TV',
  },
  {
    slug: 'game-room',
    title: 'Game Room',
    subtitle: 'Games, music & hobbies',
  },
  {
    slug: 'garage',
    title: 'Garage',
    subtitle: 'DIY, tools, builds',
  },
  {
    slug: 'study',
    title: 'Study',
    subtitle: 'Focus, learning, planning',
  },
];

export default function ShareThought() {
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [touched, setTouched] = useState(false);

  // allow createPortal to attach to document.body
  useEffect(() => {
    setMounted(true);
  }, []);

  // close on ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const resetState = () => {
    setSelectedSlug(null);
    setTitle('');
    setLink('');
    setTouched(false);
  };

  const handleOpen = () => {
    resetState();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const canStart =
    !!selectedSlug && (title.trim().length > 0 || link.trim().length > 0);

  const handleStart = () => {
    if (!selectedSlug || !canStart) return;

    const params = new URLSearchParams();
    if (title.trim()) params.set('title', title.trim());
    if (link.trim()) params.set('link', link.trim());

    const qs = params.toString();
    router.push(`/room/${selectedSlug}${qs ? `?${qs}` : ''}`);
    setOpen(false);
  };

  // bottom docked CTA (always visible)
  const triggerBar = (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-[env(safe-area-inset-bottom,16px)]">
      <button
        type="button"
        onClick={handleOpen}
        className="pointer-events-auto w-full max-w-[720px] rounded-2xl bg-[var(--accent)] px-6 py-4 text-[17px] font-medium text-[var(--accent-foreground)] shadow-[0_10px_30px_rgba(0,0,0,0.22)] active:translate-y-[1px] transition-transform"
      >
        Share a Thought
      </button>
    </div>
  );

  // modal sheet rendered via portal so it never pushes layout
  const modal =
    mounted && open
      ? createPortal(
          <div
            className="fixed inset-0 z-[60] grid place-items-center bg-[rgba(0,0,0,0.6)] backdrop-blur-[2px] p-4"
            onClick={handleClose}
            aria-modal="true"
            role="dialog"
          >
            <div
              className="w-full max-w-[560px] rounded-3xl border border-[var(--ring)] bg-[var(--card)] p-5 shadow-[0_18px_55px_rgba(0,0,0,0.45)] animate-modalIn"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="mb-2 text-[22px] font-serif text-ink">
                Start a New Nouk
              </h2>
              <p className="mb-4 text-[14px] text-[var(--muted)]">
                Find your cozy corner. Pick a room, jot something small, and
                let it drift.
              </p>

              {/* step 1 — room selection */}
              <div className="mb-4">
                <p className="mb-2 text-[13px] font-medium text-[var(--muted)]">
                  1) Where do you want to post?
                </p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {ROOMS.map((room) => {
                    const selected = room.slug === selectedSlug;
                    return (
                      <button
                        key={room.slug}
                        type="button"
                        onClick={() => setSelectedSlug(room.slug)}
                        className={[
                          'rounded-xl border px-3 py-2 text-left transition-colors',
                          selected
                            ? 'border-[var(--accent)] bg-[var(--paper)]'
                            : 'border-[var(--ring)] bg-[var(--card)]',
                        ].join(' ')}
                      >
                        <div className="text-[13px] font-medium text-ink">
                          {room.title}
                        </div>
                        <div className="text-[11px] text-[var(--muted)]">
                          {room.subtitle}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* step 2 — title + optional link */}
              <div className="mb-4">
                <p className="mb-2 text-[13px] font-medium text-[var(--muted)]">
                  2) What’s the thread about?
                </p>

                <div className="mb-2 rounded-2xl border border-[var(--ring)] bg-white/80 px-3 py-2">
                  <textarea
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      setTouched(true);
                    }}
                    rows={3}
                    placeholder="Say something small to start…"
                    className="w-full resize-none border-none bg-transparent text-[14px] text-ink outline-none placeholder:text-[var(--muted)]"
                  />
                </div>

                <input
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="Optional link (YouTube, Spotify, article…)"
                  className="w-full rounded-2xl border border-[var(--ring)] bg-white/80 px-3 py-2 text-[14px] text-ink outline-none placeholder:text-[var(--muted)]"
                />

                <div className="mt-1 text-[11px] text-[var(--muted)]">
                  Keep it short and gentle. You can always add more in the
                  replies.
                </div>
              </div>

              {/* footer actions */}
              <div className="mt-4 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="rounded-2xl border border-[var(--ring)] bg-[var(--paper)] px-4 py-2 text-[14px] text-ink"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleStart}
                  disabled={!canStart}
                  className={[
                    'rounded-2xl px-4 py-2 text-[14px] font-semibold shadow-[0_6px_18px_rgba(0,0,0,0.25)]',
                    canStart
                      ? 'bg-[var(--accent)] text-[var(--accent-foreground)] active:translate-y-[1px] active:shadow-[0_4px_12px_rgba(0,0,0,0.3)]'
                      : 'bg-[var(--accent-soft)] text-[var(--muted)] opacity-70 cursor-not-allowed',
                  ].join(' ')}
                >
                  Start Nouk
                </button>
              </div>
            </div>
          </div>,
          document.body
        )
      : null;

  return (
    <>
      {triggerBar}
      {modal}
    </>
  );
}
