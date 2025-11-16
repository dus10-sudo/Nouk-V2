// src/app/page.tsx
'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();

  return (
    <main className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <Image
        src="/house-landing.jpg"
        alt="Forest House"
        fill
        priority
        className="object-cover"
      />

      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-white text-4xl font-semibold mb-2 drop-shadow-lg">
          nouk.space
        </h1>

        <p className="text-white/90 max-w-xs text-lg mb-8 drop-shadow">
          A quiet little house for short-lived threads.
          Share something small, let it breathe, and let it fade.
        </p>

        <button
          onClick={() => router.push('/home')}
          className="px-6 py-3 rounded-full text-lg font-medium bg-cyan-300 text-black shadow-lg active:scale-95 transition"
        >
          Enter the House
        </button>
      </div>
    </main>
  );
}
