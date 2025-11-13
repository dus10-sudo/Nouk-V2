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

  // Close modal with ESC
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
        className="nouk-cta w-full max-w-[680px] px-6 py-4 text-[18px] font-medium rounded-2xl shadow-[0_2px_0_rgba(0,0,0,0.05)] bg-[var(--accent)] text-white active:scale-[0.98] transition-transform"
      >
        Share a Thought
      </button>

      {/* Modal Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center animate-[fadeBackdrop_0.25s_ease-out_forwards] bg-[rgba(0,0,0,0.6)] backdrop-blur-[2px] p-4"
          onClick={() => setOpen(false)}
          aria-modal="true"
          role="dialog"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="animate-[fadeInUp_0.25s_ease-out] w-full max-w-[560px] max-h-[85vh] overflow-auto rounded-2xl border border-[rgba(0,0,0,0.08)] bg-[var(--paper)] p-6 shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
          >
            <h2 className="mb-1 text-[22px] font-serif text-[var(--ink)]">
              Start a New Nouk
            </h2>
            <p className="mb-4 text-[14px] text-[var(--muted)]">
              Find your cozy corner.
            </p>

            {/* Step 1 */}
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
                    className={`rounded-xl border px-4 py-3 text-left transition-all ${
                      active
                        ? 'border-[var(--accent)] bg-[var(--card)] shadow-soft'
                        : 'border-[var(--ring)] bg-[var(--card)] hover:border-[var(--accent)]'
                    }`}
                  >
                    <div className="font-medium">{r.name}</div>
                    <div className="text-[12px] text-[var(--muted)]">{r.description}</div>
                  </button>
                );
              })}
            </div>

            {/* Step 2 */}
            <label className="mb-2 block text-[14px] text-[var(--ink)]">
              2) What’s the thread about? (optional link/topic)
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Say something small to start…"
              className="mb-3 w-full rounded-xl border border-[var(--ring)] bg-white/80 px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--accent)]"
            />
            <input
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="Optional link (YouTube, Spotify, article…)"
              className="mb-5 w-full rounded-xl border border-[var(--ring)] bg-white/80 px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--accent)]"
            />

            {/* Buttons */}
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setOpen(false)}
                className="rounded-xl border border-[var(--ring)] bg-[var(--card)] px-4 py-2 active:scale-[0.97]"
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
                className="rounded-xl bg-[var(--accent)] px-4 py-2 text-white disabled:opacity-60 active:scale-[0.97]"
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
