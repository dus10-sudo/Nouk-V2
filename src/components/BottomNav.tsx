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
      <div className="mx-auto max-w-lg px-3 pb-2">
        <div
          className="
            pointer-events-auto
            rounded-full
            bg-[var(--paper)]/95
            border border-[color-mix(in_srgb,var(--muted)_22%,transparent)]
            shadow-[0_-4px_12px_rgba(15,23,42,0.18)]
            backdrop-blur-sm
          "
        >
          <div className="flex items-center justify-between px-4 py-1.5">

            {/* LEFT — Nouk */}
            <button
              type="button"
              onClick={() => router.push('/')}
              className="text-[12px] font-semibold text-[var(--muted-strong)]"
            >
              Nouk
            </button>

            {/* CENTER — CTA */}
            <div className="flex-1 flex justify-center">
              <div className="scale-[0.88]">
                <ShareThoughtButton />
              </div>
            </div>

            {/* RIGHT — Sprout */}
            <button
              type="button"
              onClick={() =>
                isHome
                  ? window.scrollTo({ top: 0, behavior: 'smooth' })
                  : router.push('/')
              }
              className="
                flex h-8 w-8 items-center justify-center
                rounded-full bg-[var(--card)]
                shadow-[0_6px_14px_rgba(15,23,42,0.25)]
              "
            >
              🌱
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
