// src/components/BottomNav.tsx
'use client';

import { usePathname, useRouter } from 'next/navigation';
import ShareThoughtButton from './ShareThought';

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === '/' || pathname === '';

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40">
      <div className="mx-auto max-w-lg px-4 pb-4">
        <div className="pointer-events-auto rounded-full border border-[color-mix(in_srgb,var(--muted)_22%,transparent)] bg-[var(--paper)]/96 shadow-[0_-10px_35px_rgba(15,23,42,0.45)] backdrop-blur-md">
          <div className="flex items-center justify-between px-3 py-2">
            {/* Left: Nouk wordmark (tap to go home) */}
            <button
              type="button"
              onClick={() => router.push('/')}
              className="text-[11px] font-semibold tracking-[0.35em] text-[var(--muted-strong)] uppercase"
            >
              N O U K
            </button>

            {/* Center: compact Share a Thought CTA */}
            <div className="flex flex-1 justify-center">
              <ShareThoughtButton variant="nav" />
            </div>

            {/* Right: sprout icon (home + scroll to top) */}
            <button
              type="button"
              onClick={() => {
                if (!isHome) {
                  router.push('/');
                } else {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="ml-3 flex h-9 w-9 items-center justify-center rounded-full bg-[var(--card)] shadow-[0_10px_25px_rgba(15,23,42,0.45)]"
              aria-label="Back to top"
            >
              <span aria-hidden className="text-[18px]">
                🌱
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
