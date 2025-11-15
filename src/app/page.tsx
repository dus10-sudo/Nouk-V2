// src/app/page.tsx

import React from 'react';
import ShareThoughtButton from '@/components/ShareThought';

const ROOMS = [
  {
    slug: 'sunroom',
    name: 'Sunroom',
    description: 'Light, everyday check-ins and passing thoughts.',
    icon: '☀️',
  },
  {
    slug: 'living-room',
    name: 'Living Room',
    description: 'Cozy conversation and shared moments with others.',
    icon: '🛋️',
  },
  {
    slug: 'garden',
    name: 'Garden',
    description: 'Gentle growth, intentions, and small steps forward.',
    icon: '🌿',
  },
  {
    slug: 'lantern-room',
    name: 'Lantern Room',
    description: 'Heavier feelings and emotional processing in a soft glow.',
    icon: '🔮',
  },
  {
    slug: 'observatory',
    name: 'Observatory',
    description: 'Late-night thoughts, wonder, and abstract ideas.',
    icon: '🌙',
  },
  {
    slug: 'library',
    name: 'Library',
    description: 'Quiet prompts, journaling, and thoughtful writing.',
    icon: '📖',
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <div className="mx-auto flex min-h-screen max-w-lg flex-col px-4 pb-5 pt-6">
        {/* Top: Logo + tagline */}
        <header className="flex flex-col items-center text-center">
          <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--card)] shadow-[0_12px_32px_rgba(15,23,42,0.28)]">
            <span className="text-2xl">🌱</span>
          </div>

          <h1 className="text-3xl font-semibold tracking-tight text-[var(--ink-strong)]">
            Nouk
          </h1>

          <p className="mt-2 max-w-md text-[14px] leading-relaxed text-[var(--muted-strong)]">
            A quiet little house for short-lived threads. Share something
            small, let it breathe, and let it fade.
          </p>
        </header>

        {/* Middle: Rooms list */}
        <section className="mt-5 space-y-3">
          {ROOMS.map((room) => (
            <a
              key={room.slug}
              href={`/room/${room.slug}`}
              className="flex items-center justify-between rounded-[26px] bg-[var(--card)] px-4 py-3 shadow-[0_14px_36px_rgba(15,23,42,0.18)] transition-transform active:scale-[0.98]"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--surface)] shadow-[0_10px_24px_rgba(15,23,42,0.18)]">
                  <span className="text-xl">{room.icon}</span>
                </div>

                <div className="flex flex-col">
                  <span className="text-[15px] font-semibold text-[var(--ink-strong)]">
                    {room.name}
                  </span>
                  <span className="text-[13px] leading-snug text-[var(--muted-strong)]">
                    {room.description}
                  </span>
                </div>
              </div>

              <span className="text-[18px] text-[var(--muted)]">›</span>
            </a>
          ))}
        </section>

        {/* Small spacer so CTA isn’t glued to the last card */}
        <div className="mt-4" />

        {/* Bottom: main CTA, anchored toward bottom */}
        <div className="mt-auto">
          <ShareThoughtButton />
          <p className="mt-2 text-center text-[11px] text-[var(--muted)]">
            Threads fade after a short while. Nothing here needs to last
            forever.
          </p>
        </div>
      </div>
    </main>
  );
}
