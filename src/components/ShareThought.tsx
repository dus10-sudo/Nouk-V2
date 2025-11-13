// src/components/ShareThought.tsx
'use client';

import { useState } from 'react';
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

  return (
    <>
      {/* CTA */}
      <button
        onClick={() => setOpen(true)}
        className="nouk-cta w-full max-w-[680px] px-6 py-4 text-[18px] font-medium shadow-[0_2px_0_rgba(0,0,0,0.05)]"
      >
        Share a Thought
      </button>

      {/* Lightweight modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/30 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-[560px] rounded-2xl border border-[var(--stroke)] bg-[var(--card)] p-5 shadow-[var(--shadow-soft)]"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="mb-3 text-[22px] font-serif">Start a New Nouk</h2>

            {/* Step 1: pick room */}
            <label className="mb-1 block text-[14px] text-[var(--muted)]">
              Where do you want to post?
            </label>
            <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {ROOM_PRESETS.map((r) => (
                <button
                  key={r.slug}
                  onClick={() => setRoom(r)}
                  className={`rounded-xl border px-3 py-2 text-left ${
                    room?.slug === r.slug
                      ? 'border-[var(--accent)] bg-[var(--paper)]'
                      : 'border-[var(--stroke)] bg-[var(--card)]'
                  }`}
                >
                  <div className="font-medium">{r.name}</div>
                  <div className="text-[12px] text-[var(--muted)]">{r.description}</div>
                </button>
              ))}
            </div>

            {/* Step 2: title/link */}
            <label className="mb-1 block text-[14px] text-[var(--muted)]">
              What’s the thread about? (optional link/topic)
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Say something small to start…"
              className="mb-2 w-full rounded-xl border border-[var(--stroke)] bg-white/70 px-3 py-2 outline-none"
            />
            <input
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="Optional link (YouTube, Spotify, article…)"
              className="mb-4 w-full rounded-xl border border-[var(--stroke)] bg-white/70 px-3 py-2 outline-none"
            />

            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setOpen(false)}
                className="rounded-xl border border-[var(--stroke)] px-4 py-2"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Navigate to the selected room; thread creation can happen on that page
                  const dest = room ? `/room/${room.slug}?title=${encodeURIComponent(title)}&link=${encodeURIComponent(link)}` : '/';
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
