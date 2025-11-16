// src/app/page.tsx
'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();

  return (
    <main className="relative h-[100dvh] w-full overflow-hidden bg-black">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/house-landing.jpg"
          alt="Nouk House"
          fill
          priority
          className="object-cover brightness-105"
        />

        {/* Soft overlay to improve text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/30" />
      </div>

      {/* Centered content */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 text-center">
        {/* Title */}
        <h1 className="text-[44px] font-semibold text-white drop-shadow-md">
          Nouk
        </h1>

        {/* Subtitle */}
        <p className="mt-3 max-w-[320px] text-[16px] leading-snug text-white/90 drop-shadow-sm">
          A quiet house for your thoughts, feelings, and late-night moments.
        </p>

        {/* CTA */}
        <button
          onClick={() => router.push('/home')}
          className="mt-6 rounded-full bg-[var(--accent)] px-8 py-3 text-[16px] font-medium text-[var(--paper)] shadow-[0_8px_28px_rgba(15,23,42,0.55)] active:scale-95 transition-transform"
        >
          Enter the House
        </button>
      </div>
    </main>
  );
}
