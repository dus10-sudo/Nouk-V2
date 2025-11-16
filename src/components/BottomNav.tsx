// src/components/BottomNav.tsx
'use client';

import { usePathname, useRouter } from 'next/navigation';
import ShareThoughtButton from './ShareThought';

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  const isHome = pathname === '/' || pathname === '';

  const handleHome = () => {
    if (isHome) {
      // Scroll to top if we're already on home
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      router.push('/');
    }
  };

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-3 z-40 flex justify-center">
      {/* Transparent bar – only inner row has content */}
      <div className="pointer-events-auto flex w-full max-w-xl items-center justify-between px-4">
        {/* Left: Nouk wordmark */}
        <button
          type="button"
          onClick={handleHome}
          className="rounded-full bg-[rgba(0,0,0,0.05)] px-4 py-1.5 text-[13px] font-semibold tracking-[0.16em] text-[var(--ink-soft)] uppercase"
        >
          Nouk
        </button>

        {/* Center: Share a Thought (reuses existing component) */}
        <div className="flex-1 px-3">
          <ShareThoughtButton />
        </div>

        {/* Right: sprout icon home/top button */}
        <button
          type="button"
          onClick={handleHome}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f7f1e5] shadow-[0_10px_30px_rgba(15,23,42,0.28)]"
        >
          <span className="text-[20px]" aria-hidden="true">
            🌱
          </span>
          <span className="sr-only">
            {isHome ? 'Scroll to top' : 'Go to home'}
          </span>
        </button>
      </div>
    </div>
  );
}
