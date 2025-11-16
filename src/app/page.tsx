'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import BottomNav from '../components/BottomNav';

type Room = {
  slug: string;
  name: string;
  description: string;
  icon: string;
};

const rooms: Room[] = [
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
    description: 'For journaling, prompts, and more thoughtful writing.',
    icon: '📖',
  },
];

type ShareSheetProps = {
  open: boolean;
  onClose: () => void;
};

function ShareSheet({ open, onClose }: ShareSheetProps) {
  const [value, setValue] = useState('');

  useEffect(() => {
    if (!open) {
      setValue('');
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/35 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="mb-[max(0.5rem,env(safe-area-inset-bottom))] w-full max-w-md rounded-t-3xl bg-[#f9e6c8] px-5 pb-5 pt-4 shadow-[0_-18px_40px_rgba(0,0,0,0.35)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-[#d8b896]" />

        <h2 className="text-center text-lg font-semibold text-[#5b3b25]">
          Share a thought
        </h2>
        <p className="mt-1 text-center text-sm text-[#7a5635]">
          Leave something small. Threads fade after a little while.
        </p>

        <div className="mt-4 rounded-2xl border border-[#efd6b4] bg-[#fdf3e4] px-3 py-2">
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            rows={4}
            className="w-full resize-none border-none bg-transparent text-sm text-[#5b3b25] outline-none placeholder:text-[#c3a98a]"
            placeholder="What’s on your mind?"
          />
        </div>

        <div className="mt-5 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-full bg-[#f3ddc0] py-2.5 text-sm font-semibold text-[#5b3b25] shadow-[0_8px_18px_rgba(0,0,0,0.12)]"
          >
            Close
          </button>
          <button
            type="button"
            // temporary until posting is wired up
            onClick={onClose}
            className="flex-1 rounded-full bg-[#e58439] py-2.5 text-sm font-semibold text-white shadow-[0_10px_22px_rgba(0,0,0,0.22)]"
          >
            Post (soon)
          </button>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [shareOpen, setShareOpen] = useState(false);

  // Listen for fallback custom event from BottomNav
  useEffect(() => {
    const handler = () => setShareOpen(true);

    if (typeof window !== 'undefined') {
      window.addEventListener('nouk-open-share', handler as EventListener);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('nouk-open-share', handler as EventListener);
      }
    };
  }, []);

  return (
    <div
      className="min-h-[100dvh] w-full"
      style={{
        background:
          'radial-gradient(circle at top, #fbead2 0%, #f2d3a6 45%, #d9aa75 100%)',
      }}
    >
      <div className="mx-auto flex min-h-[100dvh] max-w-md flex-col px-4 pb-28 pt-10 text-[#5b3b25]">
        <p className="text-center text-base leading-relaxed">
          A quiet little house for short-lived threads. Share something small,
          let it breathe, and let it fade.
        </p>

        <div className="mt-7 space-y-4">
          {rooms.map((room) => (
            <Link
              key={room.slug}
              href={`/room/${room.slug}`}
              className="block"
            >
              <div className="flex items-center gap-3 rounded-[26px] bg-[#f8e7c8] px-4 py-4 shadow-[0_20px_40px_rgba(0,0,0,0.16)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/92 shadow-[0_12px_24px_rgba(0,0,0,0.18)]">
                  <span className="text-2xl" aria-hidden="true">
                    {room.icon}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="text-base font-semibold">{room.name}</div>
                  <p className="mt-1 text-sm text-[#6e4b30]">
                    {room.description}
                  </p>
                </div>
                <div className="text-lg text-[#c9a178]" aria-hidden="true">
                  ›
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <BottomNav onShareClick={() => setShareOpen(true)} />
      <ShareSheet open={shareOpen} onClose={() => setShareOpen(false)} />
    </div>
  );
}
