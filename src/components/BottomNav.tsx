// src/components/BottomNav.tsx
'use client';

import { useEffect, useState } from 'react';
import ShareThoughtButton from './ShareThought';

export default function BottomNav() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const handleScrollTop = () => {
    if (typeof window === 'undefined') return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className={`pointer-events-none fixed inset-x-0 bottom-0 z-40 transform transition-all duration-300 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
      }`}
    >
      <div className="mx-auto flex w-full max-w-md items-center justify-between px-4 pb-4">
        <div className="pointer-events-auto flex w-full items-center justify-between gap-3">
          {/* Left: brand text only */}
          <div className="text-[13px] font-semibold text-[rgba(89,60,35,0.85)]">
            Nouk
          </div>

          {/* Center: CTA */}
          <div className="flex-1">
            <ShareThoughtButton />
          </div>

          {/* Right: sprout (no circular chip background) */}
          <button
            type="button"
            onClick={handleScrollTop}
            aria-label="Back to top"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-transparent text-[20px]"
          >
            🌱
          </button>
        </div>
      </div>
    </div>
  );
}
