'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';

type BottomNavProps = {
  /**
   * Called when the "Share a Thought" button is pressed.
   * The home page will pass in a handler that opens the share sheet.
   */
  onShareClick?: () => void;
};

export default function BottomNav({ onShareClick }: BottomNavProps) {
  const pathname = usePathname();
  const router = useRouter();

  const isHome = pathname === '/' || pathname === '';

  const handleBrandClick = () => {
    if (!isHome) {
      router.push('/');
    } else {
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleShareClick = () => {
    if (onShareClick) {
      onShareClick();
      return;
    }

    // Fallback: fire a custom event if no handler is passed.
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('nouk-open-share'));
    }
  };

  const handleSproutClick = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center">
      <div className="pointer-events-auto flex w-full max-w-md items-center justify-between px-4 pb-4">
        {/* Brand label */}
        <button
          type="button"
          onClick={handleBrandClick}
          className="rounded-full bg-transparent px-4 py-2 text-sm font-semibold tracking-[0.18em] text-[#5b3b25]"
        >
          Nouk
        </button>

        {/* Primary CTA */}
        <button
          type="button"
          onClick={handleShareClick}
          className="mx-2 flex-1 rounded-full bg-[#e58439] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(0,0,0,0.22)] transition-transform active:scale-[0.97]"
        >
          Share a Thought
        </button>

        {/* Sprout / top shortcut */}
        <button
          type="button"
          onClick={handleSproutClick}
          aria-label="Back to top"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-[#fbead2] shadow-[0_10px_24px_rgba(0,0,0,0.18)]"
        >
          <span className="text-2xl leading-none">🌱</span>
        </button>
      </div>
    </div>
  );
}
