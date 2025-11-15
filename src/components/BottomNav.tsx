'use client';

import ShareThoughtButton from './ShareThought';
import Link from 'next/link';

export default function BottomNav() {
  return (
    <nav className="
      fixed bottom-0 left-0 right-0 z-50
      bg-[var(--paper)]
      shadow-[0_-12px_45px_rgba(0,0,0,0.25)]
      border-t border-[color-mix(in_srgb,var(--muted)_35%,transparent)]
      px-4 py-3
    ">
      <div className="mx-auto max-w-md flex items-center justify-between gap-4">

        {/* Left: Sprout icon → Home */}
        <Link
          href="/"
          className="
            flex h-11 w-11 items-center justify-center rounded-full
            bg-[var(--card)]
            shadow-[0_6px_18px_rgba(15,23,42,0.25)]
          "
        >
          <span className="text-[22px]">🌱</span>
        </Link>

        {/* Center: NOUK */}
        <div className="flex-1 text-center text-[13px] tracking-[0.35em] text-[var(--ink)]">
          NOUK
        </div>

        {/* Right: CTA modal button */}
        <div className="flex items-center justify-center">
          <ShareThoughtButton />
        </div>

      </div>
    </nav>
  );
}
