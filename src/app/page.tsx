// src/app/page.tsx
import Link from 'next/link';
import ShareThoughtButton from '@/components/ShareThought';

type Room = {
  slug: string;
  name: string;
  description: string;
  icon: string;
};

const ROOMS: Room[] = [
  {
    slug: 'sunroom',
    name: 'Sunroom',
    description: 'For light check ins, small wins, and passing thoughts.',
    icon: '☀️',
  },
  {
    slug: 'living-room',
    name: 'Living Room',
    description:
      'For relaxed conversation, shared moments, and company.',
    icon: '🛋️',
  },
  {
    slug: 'garden',
    name: 'Garden',
    description:
      'For intentions, tiny steps, and gentle personal growth.',
    icon: '🌱',
  },
  {
    slug: 'lantern-room',
    name: 'Lantern Room',
    description:
      'For heavy feelings, venting, and emotional processing.',
    icon: '🔮',
  },
  {
    slug: 'observatory',
    name: 'Observatory',
    description:
      'For late night thoughts, big questions, and wonder.',
    icon: '🌙',
  },
  {
    slug: 'library',
    name: 'Library',
    description:
      'For journaling, prompts, and more thoughtful writing.',
    icon: '📖',
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <div className="mx-auto flex min-h-screen max-w-xl flex-col px-4 pt-6 pb-[calc(env(safe-area-inset-bottom)+1.5rem)]">
        {/* Header */}
        <header className="flex flex-col items-center text-center space-y-3">
          {/* Nouk logo badge */}
          <div className="mt-2 flex h-24 w-24 items-center justify-center rounded-full bg-[var(--card-soft)] shadow-[0_22px_45px_rgba(15,23,42,0.28)]">
            <span className="text-4xl" aria-hidden="true">
              🌱
            </span>
          </div>

          <h1 className="text-[32px] font-semibold tracking-tight text-[var(--ink-strong)]">
            Nouk
          </h1>

          <p className="mt-1 max-w-md text-[15px] leading-relaxed text-[var(--muted-strong)]">
            A quiet little house for short-lived threads. Share something
            small, let it breathe, and let it fade.
          </p>
        </header>

        {/* Rooms */}
        <section className="mt-10 space-y-4">
          {ROOMS.map((room) => (
            <Link
              key={room.slug}
              href={`/r/${room.slug}`}
              className="block rounded-[26px] bg-[var(--card)] px-4 py-4 shadow-[0_18px_40px_rgba(15,23,42,0.25)] transition-transform duration-150 active:scale-[0.99]"
            >
              <div className="flex items-center gap-3">
                {/* Icon circle */}
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(255,255,255,0.9)] shadow-[0_10px_25px_rgba(15,23,42,0.15)]">
                  <span className="text-2xl" aria-hidden="true">
                    {room.icon}
                  </span>
                </div>

                {/* Text */}
                <div className="flex-1">
                  <h2 className="text-[16px] font-semibold text-[var(--ink-strong)]">
                    {room.name}
                  </h2>
                  <p className="mt-1 text-[14px] leading-snug text-[var(--muted-strong)]">
                    {room.description}
                  </p>
                </div>

                {/* Chevron */}
                <div
                  className="ml-2 text-[20px] text-[var(--muted)]"
                  aria-hidden="true"
                >
                  ›
                </div>
              </div>
            </Link>
          ))}
        </section>

        {/* Share a Thought button – normal flow at the bottom */}
        <div className="mt-10">
          <ShareThoughtButton />
        </div>
      </div>
    </main>
  );
}
