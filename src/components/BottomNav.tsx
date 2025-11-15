// src/components/BottomNav.tsx
'use client';

import { useRouter, usePathname } from 'next/navigation';
import ShareThoughtButton from './ShareThought';

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === '/' || pathname === '';

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40">
      <div className="mx-auto max-w-lg px-4 pb-4">
        <div
          className="
            pointer-events-auto
            rounded-full
            border border-[color-mix(in_srgb,var(--muted)_22%,transparent)]
            bg-[var(--paper)]
            shadow-[0_-4px_16px_rgba(15,23,42,0.22)]
          "
        >
          <div className="flex items-center justify-between px-4 py-1">
            {/* LEFT: Nouk label (fixed width so center is stable) */}
            <div className="w-20 flex justify-start">
              <button
                type="button"
                onClick={() => router.push('/')}
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.35em]
                  text-[var(--muted-strong)]
                  leading-none
                "
              >
                N O U K
              </button>
            </div>

            {/* CENTER: Share CTA, perfectly centered */}
            <div className="flex flex-1 justify-center">
              <ShareThoughtButton />
            </div>

            {/* RIGHT: Sprout home button (same width as left for balance) */}
            <div className="w-20 flex justify-end">
              <button
                type="button"
                onClick={() =>
                  isHome
                    ? window.scrollTo({ top: 0, behavior: 'smooth' })
                    : router.push('/')
                }
                className="
                  flex h-7 w-7 items-center justify-center
                  rounded-full bg-[var(--card)]
                  shadow-[0_6px_14px_rgba(15,23,42,0.25)]
                "
                aria-label={isHome ? 'Back to top' : 'Back to home'}
              >
                <span aria-hidden className="text-[15px]">
                  🌱
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
