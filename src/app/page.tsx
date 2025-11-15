// src/app/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import ShareThought from '@/components/ShareThought';

export const metadata: Metadata = {
  title: 'Nouk',
  description: 'A small, quiet house for short-lived threads.',
};

const ROOMS = [
  {
    slug: 'library',
    name: 'Library',
    description: 'Books, projects, ideas',
    icon: '▦',
  },
  {
    slug: 'lounge',
    name: 'Lounge',
    description: 'Soft check-ins, daily life',
    icon: '▦',
  },
  {
    slug: 'studio',
    name: 'Studio',
    description: 'Creative work & drafts',
    icon: '▦',
  },
  {
    slug: 'theater',
    name: 'Theater',
    description: 'Movies, shows, deep dives',
    icon: '▭',
  },
  {
    slug: 'game-room',
    name: 'Game Room',
    description: 'Games, streams, silly stuff',
    icon: '▢',
  },
  {
    slug: 'cafe',
    name: 'Café',
    description: 'Open table, anything goes',
    icon: '▦',
  },
];

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-[var(--canvas)] text-[var(--ink)]">
      <div className="mx-auto flex min-h-screen max-w-xl flex-col px-4 pb-24 pt-6">
        {/* Hero */}
        <section className="mb-4 flex flex-col items-center text-center">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(234,122,59,0.14)]">
            <span className="text-xl text-[var(--accent)]">🌱</span>
          </div>
          <h1 className="text-[28px] font-serif leading-tight">Nouk</h1>
          <p className="mt-2 text-sm text-[var(--ink-soft)]">
            A small, quiet house for short-lived threads. Pick a room, start a Nouk,
            let it fade when you&apos;re done talking.
          </p>
        </section>

        {/* How Nouk feels */}
        <section className="mb-4 rounded-[26px] bg-[var(--card)] px-4 py-4 shadow-soft">
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)] text-center">
            How Nouk feels
          </p>
          <ul className="space-y-1 text-[13px] text-[var(--ink-soft)]">
            <li>• Start a tiny conversation, not a feed.</li>
            <li>• Rooms feel like corners of a cozy house.</li>
            <li>• Threads quietly expire after a short while.</li>
          </ul>
        </section>

        {/* Rooms header */}
        <div className="mb-2 flex items-center justify-between">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
            Rooms
          </p>
          <span className="rounded-full border border-[var(--ring)] px-3 py-1 text-[11px] text-[var(--muted)]">
            Pick a room to begin
          </span>
        </div>

        {/* Rooms list */}
        <section className="space-y-2">
          {ROOMS.map((room) => (
            <Link
              key={room.slug}
              href={`/r/${room.slug}`}
              className="flex items-center justify-between rounded-[26px] bg-[var(--card)] px-4 py-3 shadow-soft transition hover:shadow-soft-lg active:scale-[0.99]"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[rgba(0,0,0,0.03)] text-sm text-[var(--ink-soft)]">
                  {room.icon}
                </div>
                <div>
                  <div className="text-[15px] font-medium">{room.name}</div>
                  <div className="text-[12px] text-[var(--muted)]">
                    {room.description}
                  </div>
                </div>
              </div>
              <div className="text-[18px] text-[var(--muted)]">›</div>
            </Link>
          ))}
        </section>

        {/* Spacer so list doesn't hide behind pill */}
        <div className="h-[110px]" />
      </div>

      {/* Docked Share a Thought + modal */}
      <ShareThought />
    </main>
  );
}
