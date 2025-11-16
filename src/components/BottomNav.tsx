// src/components/BottomNav.tsx
'use client';

import { useEffect, useState } from 'react';
import ShareThoughtButton from './ShareThought';

export default function BottomNav() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // simple fade-up when the page mounts
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
          {/* Left: brand label (no pill, no background) */}
          <div className="text-[13px] font-semibold text-[var(--ink-soft)]">
            Nouk
          </div>

          {/* Center: Share CTA (original ShareThoughtButton) */}
          <div className="flex-1">
            <ShareThoughtButton />
          </div>

          {/* Right: sprout scroll-to-top button */}
          <button
            type="button"
            onClick={handleScrollTop}
            aria-label="Back to top"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--card)] text-[20px] shadow-[0_12px_28px_rgba(15,23,42,0.35)]"
          >
            🌱
          </button>
        </div>
      </div>
    </div>
  );
}
