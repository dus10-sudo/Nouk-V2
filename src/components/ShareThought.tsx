'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

type Room = { slug: string; name: string; description?: string };

const ROOMS: Room[] = [
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

  // esc to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const linkHint = useMemo(() => {
    if (!link) return '';
    const url = /^https?:\/\/\S+/i.test(link);
    return url ? 'Link detected.' : 'No link detected — treating as topic.';
  }, [link]);

  const start = () => {
    if (!room) return;
    const dest = `/room/${room.slug}?title=${encodeURIComponent(title)}&link=${encodeURIComponent(link)}`;
    router.push(dest);
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="nouk-cta w-full max-w-[680px] px-6 py-4 text-[18px] font-medium shadow-[0_2px_0_rgba(0,0,0,0.05)]"
      >
        Share a Thought
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/40 backdrop-blur-[2px] p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="
              w-full max-w-[560px]
              rounded-2xl border border-[var(--ring)]
              bg-[var(--card)] shadow-[var(--soft)]
              px-5 sm:px-6 pt-6 pb-4 animate-modalIn
            "
            style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 12px))' }}
          >
            {/* Title */}
            <div className="mb-4">
              <h2 className="font-serif text-[22px] leading-[1.1] tracking-[-0.01em]">
                Start a New Nouk
              </h2>
              <p className="text-[14px] text-[var(--muted)]">Find your cozy corner.</p>
            </div>

            <div className="max-h-[70vh] overflow-y-auto pr-1">
              {/* Step 1: vertical radio list */}
              <label className="mb-2 block text-[14px] text-[var(--muted)]">
                1) Where do you want to post?
              </label>
              <div role="radiogroup" className="space-y-2">
                {ROOMS.map((r) => {
                  const selected = room?.slug === r.slug;
                  return (
                    <button
                      key={r.slug}
                      role="radio"
                      aria-checked={selected}
                      onClick={() => setRoom(r)}
                      className={[
                        'w-full text-left rounded-xl border px-3 py-3 transition-colors',
                        selected
                          ? 'border-[var(--ring)] bg-white/70'
                          : 'border-[var(--ring)] bg-[var(--card)] hover:bg-white/50'
                      ].join(' ')}
                    >
                      <div className="font-medium">{r.name}</div>
                      <div className="text-[12px] text-[var(--muted)]">{r.description}</div>
                    </button>
                  );
                })}
              </div>

              {/* Step 2: inputs */}
              <label className="mb-2 mt-5 block text-[14px] text-[var(--muted)]">
                2) What’s the thread about? (optional link/topic)
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Say something small to start…"
                className="
                  mb-2 w-full rounded-xl
                  border border-[var(--ring)] bg-white/85 focus:bg-white
                  px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--accent)]
                "
              />
              <input
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="Optional link (YouTube, Spotify, article…)"
                className="
                  w-full rounded-xl
                  border border-[var(--ring)] bg-white/85 focus:bg-white
                  px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--accent)]
                "
              />
              {!!linkHint && (
                <p className="mt-2 text-[13px] text-[var(--muted)]">{linkHint}</p>
              )}
            </div>

            {/* Footer */}
            <div className="mt-4 flex items-center justify-end gap-2">
              <button
                onClick={() => setOpen(false)}
                className="rounded-xl border border-[var(--ring)] px-4 py-2"
              >
                Cancel
              </button>
              <button
                onClick={start}
                disabled={!room}
                className="rounded-xl bg-[var(--accent)] px-4 py-2 text-white disabled:opacity-60 active:translate-y-[0.5px]"
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
