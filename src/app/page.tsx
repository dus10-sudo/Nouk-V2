// src/app/page.tsx
'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

export default function LandingPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasNavigated, setHasNavigated] = useState(false);

  function goInside() {
    if (hasNavigated) return;
    setHasNavigated(true);
    router.push('/home');
  }

  function handleEnter() {
    const video = videoRef.current;
    if (!video) {
      goInside();
      return;
    }

    setIsPlaying(true);
    video.currentTime = 0;

    video
      .play()
      .catch(() => {
        // autoplay blocked → just go in
        goInside();
      });

    // safety timeout in case onEnded doesn’t fire
    setTimeout(goInside, 4500);
  }

  return (
    <main className="relative min-h-screen w-full overflow-hidden text-white">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/house-landing.jpg"
          alt="Forest cottage at night with lanterns"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Transition video laid over the background (but under UI) */}
      <video
        ref={videoRef}
        src="/enter-house.mp4"
        className={`pointer-events-none absolute inset-0 -z-0 h-full w-full object-cover transition-opacity duration-400 ${
          isPlaying ? 'opacity-100' : 'opacity-0'
        }`}
        onEnded={goInside}
        playsInline
      />

      {/* Foreground UI */}
      <div className="relative z-20 flex min-h-screen flex-col items-center justify-between">
        {/* Title at top */}
        <div className="mt-16">
          <h1 className="cinzel-title text-4xl md:text-5xl drop-shadow-[0_0_18px_rgba(0,0,0,0.9)]">
            Nouk
          </h1>
        </div>

        {/* spacer so things stay centered between top and bottom */}
        <div className="flex-1" />

        {/* Enter button at bottom */}
        <div className="mb-10">
          <button type="button" onClick={handleEnter} className="glow-button">
            Enter the house
          </button>
        </div>
      </div>
    </main>
  );
}
