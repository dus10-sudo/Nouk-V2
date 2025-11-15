'use client';

import Link from 'next/link';
import ShareThoughtButton from '@/components/ShareThought';

type Room = {
  slug: string;
  name: string;
  emoji: string;
  tagline: string;
};

const ROOMS: Room[] = [
  {
    slug: 'sunroom',
    name: 'Sunroom',
    emoji: '☀️',
    tagline: 'For light check ins, small wins, and passing thoughts.',
  },
  {
    slug: 'living-room',
    name: 'Living Room',
    emoji: '🛋️',
    tagline: 'For relaxed conversation, shared moments, and company.',
  },
  {
    slug: 'garden',
    name: 'Garden',
    emoji: '🌱',
    tagline: 'For intentions, tiny steps, and gentle personal growth.',
  },
  {
    slug: 'lantern-room',
    name: 'Lantern Room',
    emoji: '🔮',
    tagline: 'For heavy feelings, venting, and emotional processing.',
  },
  {
    slug: 'observatory',
    name: 'Observatory',
    emoji: '🌙',
    tagline: 'For late night thoughts, big questions, and wonder.',
  },
  {
    slug: 'library',
    name: 'Library',
    emoji: '📖',
    tagline: 'For journaling, prompts, and more thoughtful writing.',
  },
];

function RoomCard({ room }: { room: Room }) {
  return (
    <Link
      href={`/r/${room.slug}`}
      className="block rounded-[26px] bg-[var(--card)] px-4 py-3 shadow-soft-lg transition-transform active:scale-[0.98]"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--surface)] shadow-soft-sm">
          <span className="text-xl" aria-hidden="true">
            {room.emoji}
          </span>
          <span className="sr-only">{room.name} icon</span>
        </div>
        <div className="flex-1">
          <div className="text-[15px] font-semibold text-[var(--ink)]">
            {room.name}
          </div>
          <div className="mt-1 text-[13px] leading-snug text-[var(--muted-strong)]">
            {room.tagline}
          </div>
        </div>
        <span
          className="ml-2 text-[18px] text-[var(--muted)]"
          aria-hidden="true"
        >
          ›
        </span>
      </div>
    </Link>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Main content with extra bottom padding so Library never hides behind CTA */}
      <main className="mx-auto flex min-h-screen max-w-xl flex-col px-4 pt-10 pb-[calc(env(safe-area-inset-bottom)+11rem)]">
        {/* Header */}
        <header className="mb-6 flex flex-col items-center text-center">
          <div className="mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-[var(--card)] shadow-soft-lg">
            <span className="text-3xl" aria-hidden="true">
              🌱
            </span>
            <span className="sr-only">Nouk sprout logo</span>
          </div>
          <h1 className="text-[28px] font-semibold tracking-tight text-[var(--ink)]">
            Nouk
          </h1>
          <p className="mt-2 max-w-md text-[14px] leading-relaxed text-[var(--muted-strong)]">
            A quiet little house for short-lived threads. Share something small,
            let it breathe, and let it fade.
          </p>
        </header>

        {/* Room list */}
        <section aria-label="Nouk rooms" className="mt-2 space-y-3">
          {ROOMS.map((room) => (
            <RoomCard key={room.slug} room={room} />
          ))}
        </section>
      </main>

      {/* Docked CTA – always visible, never overlapping content thanks to main padding */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-20 flex justify-center pb-[max(env(safe-area-inset-bottom),1rem)]">
        <div className="pointer-events-auto w-full max-w-xl px-4">
          <ShareThoughtButton />
        </div>
      </div>
    </div>
  );
}
