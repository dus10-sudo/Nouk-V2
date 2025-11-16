// src/app/page.tsx
import Link from 'next/link';

type Room = {
  slug: string;
  name: string;
  description: string;
  emoji: string;
};

const ROOMS: Room[] = [
  {
    slug: 'sunroom',
    name: 'Sunroom',
    description: 'For light check ins, small wins, and passing thoughts.',
    emoji: '🌞',
  },
  {
    slug: 'living-room',
    name: 'Living Room',
    description: 'For relaxed conversation, shared moments, and company.',
    emoji: '🛋️',
  },
  {
    slug: 'garden',
    name: 'Garden',
    description: 'For intentions, tiny steps, and gentle personal growth.',
    emoji: '🌱',
  },
  {
    slug: 'lantern-room',
    name: 'Lantern Room',
    description: 'For heavy feelings, venting, and emotional processing.',
    emoji: '🔮',
  },
  {
    slug: 'observatory',
    name: 'Observatory',
    description: 'For late night thoughts, big questions, and wonder.',
    emoji: '🌙',
  },
  {
    slug: 'library',
    name: 'Library',
    description:
      'For journaling, prompts, and more thoughtful writing.',
    emoji: '📖',
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <div className="mx-auto flex w-full max-w-md flex-col px-4 pt-10 pb-28">
        {/* Top label */}
        <div className="mb-6 text-[12px] font-semibold tracking-[0.28em] text-[var(--muted-strong)]">
          NOUK
        </div>

        {/* Tagline */}
        <p className="mb-6 text-[15px] leading-relaxed text-[var(--ink-soft)]">
          A quiet little house for short-lived threads. Share something small,
          let it breathe, and let it fade.
        </p>

        {/* Room cards */}
        <div className="space-y-3">
          {ROOMS.map((room) => (
            <Link
              key={room.slug}
              href={`/r/${room.slug}`}
              className="group block rounded-[28px] bg-gradient-to-br from-[#fef8ec] to-[#f3e3c7] px-4 py-3 shadow-[0_20px_45px_rgba(15,23,42,0.35)] transition-transform duration-150 ease-out hover:-translate-y-[1px] active:translate-y-[1px]"
            >
              <div className="flex items-center gap-3">
                {/* Emoji chip */}
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#fff7ec] shadow-[0_10px_25px_rgba(15,23,42,0.25)] text-[22px]">
                  {room.emoji}
                </div>

                {/* Text */}
                <div className="flex-1">
                  <div className="text-[15px] font-semibold text-[var(--ink)]">
                    {room.name}
                  </div>
                  <div className="mt-0.5 text-[13px] leading-snug text-[var(--ink-soft)]">
                    {room.description}
                  </div>
                </div>

                {/* Chevron */}
                <div className="text-[var(--muted-strong)]">›</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
