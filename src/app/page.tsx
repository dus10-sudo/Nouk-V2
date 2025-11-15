'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ShareThought from '@/components/ShareThought';

type HomeRoom = {
  slug: string;
  name: string;
  description: string;
  emoji: string;
};

const HOME_ROOMS: HomeRoom[] = [
  {
    slug: 'sunroom',
    name: 'Sunroom',
    description: 'For light check ins, small wins, and passing thoughts.',
    emoji: '☀️',
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
    description: 'For journaling, prompts, and more thoughtful writing.',
    emoji: '📖',
  },
];

export default function HomePage() {
  const router = useRouter();
  const [shareOpen, setShareOpen] = useState(false);

  const handleHomeClick = () => {
    // Always bring you back to the root homepage
    router.push('/');
  };

  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-[#f6e7cf] to-[#edd6b6] text-[#40261b]">
        <div className="mx-auto flex min-h-screen max-w-xl flex-col px-4 pb-6 pt-6">
          {/* Top bar with subtle wordmark that also acts as Home button */}
          <header className="mb-4 flex items-center justify-between">
            <button
              type="button"
              onClick={handleHomeClick}
              className="rounded-full px-3 py-1 text-sm font-semibold tracking-[0.14em] text-[#6f5546] hover:bg-[#f0ddc1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c4682f]"
              aria-label="Go to Nouk home"
            >
              NOUK
            </button>
          </header>

          {/* Centered sprout + tagline */}
          <section className="mb-6 flex flex-col items-center text-center">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#f9edd8] shadow-[0_16px_40px_rgba(0,0,0,0.16)]">
              {/* You can swap this span for the SVG logo later if you like */}
              <span className="text-3xl" aria-hidden="true">
                🌱
              </span>
            </div>
            <h1 className="mb-2 text-2xl font-semibold text-[#3b251a]">
              Nouk
            </h1>
            <p className="max-w-sm text-[15px] leading-snug text-[#6f5546]">
              A quiet little house for short-lived threads. Share something
              small, let it breathe, and let it fade.
            </p>
          </section>

          {/* Room list */}
          <section
            aria-label="Rooms"
            className="flex-1 space-y-3 pb-4"
          >
            {HOME_ROOMS.map((room) => (
              <button
                key={room.slug}
                type="button"
                onClick={() => router.push(`/r/${room.slug}`)}
                className="flex w-full items-center gap-3 rounded-[24px] bg-[#f9edd8] px-4 py-4 text-left shadow-[0_10px_26px_rgba(0,0,0,0.10)] transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c4682f] active:translate-y-[1px]"
              >
                <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[#f3dfc3] text-xl">
                  <span aria-hidden="true">{room.emoji}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-0.5 text-base font-semibold text-[#3b251a]">
                    {room.name}
                  </div>
                  <p className="text-[13px] leading-snug text-[#7a5f4f]">
                    {room.description}
                  </p>
                </div>
                <div
                  className="ml-2 flex h-6 w-6 flex-none items-center justify-center text-[#c19a76]"
                  aria-hidden="true"
                >
                  {/* simple chevron */}
                  <span className="-translate-y-[1px] text-lg">›</span>
                </div>
              </button>
            ))}
          </section>

          {/* Share button is now just part of the flow, not overlapping cards */}
          <section className="mt-2">
            <button
              type="button"
              onClick={() => setShareOpen(true)}
              className="w-full rounded-[999px] bg-[#e5732f] px-6 py-4 text-center text-[15px] font-semibold text-[#fff5ea] shadow-[0_12px_30px_rgba(0,0,0,0.22)] transition-transform hover:translate-y-[1px] hover:bg-[#dd6721] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:ring-[#c75311]"
            >
              Share a Thought
            </button>
          </section>
        </div>
      </main>

      {/* Share modal / sheet */}
      <ShareThought open={shareOpen} onOpenChange={setShareOpen} />
    </>
  );
}
