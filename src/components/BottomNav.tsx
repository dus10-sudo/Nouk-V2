// src/components/BottomNav.tsx
'use client';

import { useRouter } from 'next/navigation';
import ShareThoughtButton from '@/components/ShareThought';

export default function BottomNav() {
  const router = useRouter();

  const handleHomeClick = () => {
    router.push('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSproutClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center pb-4">
      <div
        className="
          pointer-events-auto
          flex w-full max-w-xl items-center gap-3
          rounded-full
          px-4 py-2.5
          bg-transparent
          backdrop-blur-md
          shadow-[0_18px_45px_rgba(15,23,42,0.55)]
        "
      >
        {/* Left: Nouk label */}
        <button
          type="button"
          onClick={handleHomeClick}
          className="shrink-0 text-[13px] font-semibold tracking-[0.18em] text-[var(--ink)]"
        >
          Nouk
        </button>

        {/* Center: Share a Thought (existing button & sheet) */}
        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-xs">
            <ShareThoughtButton />
          </div>
        </div>

        {/* Right: Sprout circle (scroll to top / future home icon) */}
        <button
          type="button"
          onClick={handleSproutClick}
          className="
            shrink-0
            flex h-10 w-10 items-center justify-center
            rounded-full
            bg-[var(--paper)]
            shadow-[0_10px_25px_rgba(15,23,42,0.45)]
          "
          aria-label="Back to top"
        >
          <span className="text-[20px] leading-none">🌱</span>
        </button>
      </div>
    </div>
  );
}
