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

  // Needed so createPortal has a real DOM to attach to
  useEffect(() => {
    setMounted(true);
  }, []);

  const resetState = () => {
    setSelectedSlug(null);
    setTitle('');
    setLink('');
  };

  const handleOpen = () => {
    resetState();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleStart = () => {
    if (!selectedSlug) return;

    const params = new URLSearchParams();
    if (title.trim()) params.set('title', title.trim());
    if (link.trim()) params.set('link', link.trim());

    const qs = params.toString();
    router.push(`/room/${selectedSlug}${qs ? `?${qs}` : ''}`);

    setOpen(false);
  };

  const canStart =
    !!selectedSlug && (title.trim().length > 0 || link.trim().length > 0);

  // Bottom bar trigger (fixed)
  const triggerBar = (
    <div className="fixed left-0 right-0 bottom-0 z-40 flex justify-center px-4 pb-[env(safe-area-inset-bottom,12px)] bg-gradient-to-t from-[var(--paper)] via-[var(--paper)]/95 to-transparent backdrop-blur-sm">
      <button
        type="button"
        onClick={handleOpen}
        className="w-full max-w-[720px] rounded-full bg-[var(--accent)] px-6 py-3 text-[16px] font-semibold text-[var(--accent-foreground)] shadow-[0_10px_30px_rgba(0,0,0,0.18)] transition-transform active:translate-y-[1px] active:shadow-[0_6px_20px_rgba(0,0,0,0.22)]"
      >
        Share a Thought
      </button>
    </div>
  );

  // Modal overlay
  const modal =
    mounted && open
      ? createPortal(
          <div
            className="fixed inset-0 z-50 flex items-end justify-center bg-[rgba(0,0,0,0.40)] backdrop-blur-sm"
            onClick={handleClose}
          >
            <div
              className="w-full max-w-[720px] rounded-t-3xl bg-[var(--card)] px-5 pb-6 pt-4 shadow-[0_-18px_50px_rgba(0,0,0,0.45)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* drag handle */}
              <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-[var(--ring)]/70" />

              <h2 className="mb-1 text-[20px] font-semibold">
                Start a New Nouk
              </h2>
              <p className="mb-4 text-[14px] text-[var(--muted)]">
                Find your cozy corner.
              </p>

              {/* Step 1 */}
              <p className="mb-2 text-[14px] font-medium">
                1) Where do you want to post?
              </p>
              <div className="mb-4 grid grid-cols-2 gap-2">
                {ROOMS.map((room) => {
                  const selected = room.slug === selectedSlug;
                  return (
                    <button
                      key={room.slug}
                      type="button"
                      onClick={() => setSelectedSlug(room.slug)}
                      className={[
                        'flex flex-col items-start rounded-2xl border px-3 py-2 text-left text-[14px] transition-colors',
                        selected
                          ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent-strong)]'
                          : 'border-[var(--ring)] bg-[var(--card)] text-[var(--foreground)] hover:border-[var(--accent)]/60',
                      ].join(' ')}
                    >
                      <span className="font-medium">{room.title}</span>
                      <span className="text-[12px] text-[var(--muted)]">
                        {room.subtitle}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Step 2 */}
              <p className="mb-2 text-[14px] font-medium">
                2) What&apos;s the thread about?{' '}
                <span className="font-normal text-[var(--muted)]">
                  (optional link/topic)
                </span>
              </p>

              <div className="space-y-2">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Say something small to start…"
                  className="w-full rounded-2xl border border-[var(--ring)] bg-[var(--paper)] px-3 py-2 text-[14px] outline-none focus:border-[var(--accent)]"
                />
                <input
                  type="url"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="Optional link (YouTube, Spotify, article…)"
                  className="w-full rounded-2xl border border-[var(--ring)] bg-[var(--paper)] px-3 py-2 text-[14px] outline-none focus:border-[var(--accent)]"
                />
              </div>

              {/* Actions */}
              <div className="mt-5 flex justify-between gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 rounded-2xl border border-[var(--ring)] bg-[var(--card)] px-4 py-2 text-[14px]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={!canStart}
                  onClick={handleStart}
                  className={[
                    'flex-1 rounded-2xl px-4 py-2 text-[14px] font-semibold',
                    canStart
                      ? 'bg-[var(--accent)] text-[var(--accent-foreground)] shadow-[0_6px_18px_rgba(0,0,0,0.25)] active:translate-y-[1px] active:shadow-[0_4px_12px_rgba(0,0,0,0.3)]'
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
