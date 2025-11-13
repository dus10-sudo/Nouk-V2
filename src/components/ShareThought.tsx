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

  // close on Esc
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const start = () => {
    const dest = room
      ? `/room/${room.slug}?title=${encodeURIComponent(title)}&link=${encodeURIComponent(link)}`
      : '/';
    router.push(dest);
    setOpen(false);
  };

  return (
    <>
      {/* CTA */}
      <button
        onClick={() => setOpen(true)}
        className="nouk-cta w-full max-w-[680px] px-6 py-4 text-[18px] font-medium shadow-[0_2px_0_rgba(0,0,0,0.05)]"
      >
        Share a Thought
      </button>

      {/* Modal / sheet */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-[2px] p-0 sm:p-6"
          onClick={() => setOpen(false)}
          aria-modal="true"
          role="dialog"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="
              w-full sm:max-w-[560px]
              rounded-t-2xl sm:rounded-2xl
              border border-[var(--ring)]
              bg-[var(--card)]
              shadow-[var(--soft)]
              pt-5 sm:pt-6
              px-5 sm:px-6
              pb-3
              translate-y-0
            "
            style={{ paddingBottom: 'env(safe-area-inset-bottom, 12px)' }}
          >
            {/* header */}
            <div className="mb-3">
              <h2 className="font-serif text-[22px] leading-[1.1] tracking-[-0.01em]">Start a New Nouk</h2>
              <p className="text-[14px] text-[var(--muted)]">Find your cozy corner.</p>
            </div>

            {/* content (scrollable if needed) */}
            <div className="max-h-[65vh] sm:max-h-[70vh] overflow-y-auto pr-1">
              {/* Step 1 */}
              <label className="mb-2 mt-2 block text-[14px] text-[var(--muted)]">
                1) Where do you want to post?
              </label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {ROOM_PRESETS.map((r) => {
                  const selected = room?.slug === r.slug;
                  return (
                    <button
                      key={r.slug}
                      onClick={() => setRoom(r)}
                      className={[
                        'rounded-xl border px-3 py-2 text-left transition',
                        selected
                          ? 'border-[var(--accent)] bg-[var(--paper)] shadow-[0_1px_0_rgba(0,0,0,.03)]'
                          : 'border-[var(--ring)] bg-[var(--card)] hover:bg-[color:rgba(255,255,255,0.5)]'
                      ].join(' ')}
                    >
                      <div className="font-medium">{r.name}</div>
                      <div className="text-[12px] text-[var(--muted)] leading-snug">{r.description}</div>
                    </button>
                  );
                })}
              </div>

              {/* Step 2 */}
              <label className="mb-2 mt-4 block text-[14px] text-[var(--muted)]">
                2) What’s the thread about? (optional link/topic)
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Say something small to start…"
                className="
                  mb-2 w-full rounded-xl
                  border border-[var(--ring)]
                  bg-white/80 focus:bg-white
                  px-3 py-2 outline-none
                  focus:ring-2 focus:ring-[var(--accent)]
                "
              />
              <input
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="Optional link (YouTube, Spotify, article…)"
                className="
                  mb-3 w-full rounded-xl
                  border border-[var(--ring)]
                  bg-white/80 focus:bg-white
                  px-3 py-2 outline-none
                  focus:ring-2 focus:ring-[var(--accent)]
                "
              />
            </div>

            {/* footer (sticky inside card) */}
            <div className="mt-3 flex items-center justify-end gap-2">
              <button
                onClick={() => setOpen(false)}
                className="rounded-xl border border-[var(--ring)] px-4 py-2"
              >
                Cancel
              </button>
              <button
                onClick={start}
                disabled={!room}
                className="
                  rounded-xl bg-[var(--accent)] px-4 py-2 text-white
                  disabled:opacity-60 active:translate-y-[0.5px]
                "
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
