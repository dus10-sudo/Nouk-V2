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
    description: 'Heavier feelings and emotional processing in a safe glow.',
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
      <div className="mx-auto flex min-h-screen max-w-lg flex-col px-4 pb-6 pt-6">
        {/* Hero */}
        <header className="flex flex-col items-center text-center">
          <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--card)] shadow-[0_14px_40px_rgba(15,23,42,0.30)]">
            <span className="text-3xl">🌱</span>
          </div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[var(--ink-strong)]">
            Nouk
          </h1>
          <p className="mt-2 max-w-md text-[15px] leading-relaxed text-[var(--muted-strong)]">
            A cozy space for short-lived threads. Say something small, let it
            breathe, then let it fade.
          </p>
        </header>

        {/* Rooms */}
        <section className="mt-6 space-y-3">
          {ROOMS.map((room) => (
            <a
              key={room.slug}
              href={`/room/${room.slug}`}
              className="flex items-center justify-between rounded-[26px] bg-[var(--card)] px-4 py-3 shadow-[0_16px_40px_rgba(15,23,42,0.18)] active:scale-[0.99] transition-transform"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--surface)] shadow-[0_10px_24px_rgba(15,23,42,0.18)]">
                  <span className="text-xl">{room.icon}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[15px] font-semibold text-[var(--ink-strong)]">
                    {room.name}
                  </span>
                  <span className="text-[13px] text-[var(--muted-strong)]">
                    {room.description}
                  </span>
                </div>
              </div>
              <span className="text-[18px] text-[var(--muted)]">›</span>
            </a>
          ))}
        </section>

        {/* CTA pinned near bottom, but not miles away */}
        <div className="mt-6" />

        <div className="mt-auto">
          <ShareThoughtButton />
        </div>
      </div>
    </main>
  );
}
