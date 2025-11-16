// src/app/page.tsx
import Link from 'next/link';
import ShareThoughtButton from '@/components/ShareThought';

type RoomCard = {
  slug: string;
  name: string;
  description: string;
  icon: string;
};

const ROOMS: RoomCard[] = [
  {
    slug: 'sunroom',
    name: 'Sunroom',
    description: 'For light check ins, small wins, and passing thoughts.',
    icon: '🌞',
  },
  {
    slug: 'living-room',
    name: 'Living Room',
    description: 'For relaxed conversation, shared moments, and company.',
    icon: '🛋️',
  },
  {
    slug: 'garden',
    name: 'Garden',
    description: 'For intentions, tiny steps, and gentle personal growth.',
    icon: '🌱',
  },
  {
    slug: 'lantern-room',
    name: 'Lantern Room',
    description: 'For heavy feelings, venting, and emotional processing.',
    icon: '🔮',
  },
  {
    slug: 'observatory',
    name: 'Observatory',
    description: 'For late night thoughts, big questions, and wonder.',
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
      <div className="mx-auto flex min-h-screen max-w-md flex-col px-4 pb-6 pt-8">
        {/* Tiny header */}
        <header className="mb-4">
          <div className="text-[13px] font-semibold tracking-[0.18em] text-[var(--muted-strong)]">
            NOUK
          </div>
          <p className="mt-4 text-[15px] leading-relaxed text-[var(--ink-soft)]">
            A quiet little house for short-lived threads. Share something
            small, let it breathe, and let it fade.
          </p>
        </header>

        {/* Rooms list */}
        <div className="flex-1 space-y-3">
          {ROOMS.map((room) => (
            <Link
              key={room.slug}
              href={`/r/${room.slug}`}
              className="block rounded-[26px] bg-[var(--card)] px-4 py-3 shadow-[0_18px_55px_rgba(15,23,42,0.28)]"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--paper)] text-[20px] shadow-[0_10px_30px_rgba(15,23,42,0.35)]">
                  <span>{room.icon}</span>
                </div>
                <div className="flex-1">
                  <div className="text-[15px] font-semibold text-[var(--ink)]">
                    {room.name}
                  </div>
                  <div className="mt-0.5 text-[13px] leading-snug text-[var(--ink-soft)]">
                    {room.description}
                  </div>
                </div>
                <div className="text-[var(--muted)] text-[18px]">
                  &#8250;
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Share button at bottom of page (non-sticky) */}
        <div className="mt-4">
          <ShareThoughtButton />
        </div>
      </div>
    </main>
  );
}
