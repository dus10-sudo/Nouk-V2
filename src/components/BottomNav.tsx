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
        <div className="
          pointer-events-auto
          rounded-full
          border border-[color-mix(in_srgb,var(--muted)_22%,transparent)]
          bg-[var(--paper)]
          shadow-[0_-8px_22px_rgba(15,23,42,0.28)]
          backdrop-blur-sm
        ">
          <div className="flex items-center justify-between px-3 py-1.5">

            {/* LEFT: Nouk wordmark */}
            <button
              type="button"
              onClick={() => router.push('/')}
              className="
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.22em]
                text-[var(--muted-strong)]
              "
            >
              N O U K
            </button>

            {/* CENTER: Share CTA, *perfectly centered* */}
            <div className="flex flex-1 justify-center px-1">
              <ShareThoughtButton variant="nav" />
            </div>

            {/* RIGHT: sprout (always same width as left for balance) */}
            <button
              type="button"
              onClick={() => {
                if (!isHome) router.push('/');
                else window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="
                ml-3 flex h-8 w-8
                items-center justify-center
                rounded-full bg-[var(--card)]
                shadow-[0_8px_18px_rgba(15,23,42,0.35)]
              "
            >
              <span aria-hidden className="text-[16px]">🌱</span>
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}
