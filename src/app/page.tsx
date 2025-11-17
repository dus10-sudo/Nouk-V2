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

  const goInside = () => {
    if (hasNavigated) return;
    setHasNavigated(true);
    router.push('/home');
  };

  const handleEnter = () => {
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
        // if autoplay is blocked, just go in
        goInside();
      });

    // safety fallback in case onEnded doesn't fire
    setTimeout(goInside, 4500);
  };

  return (
    <main className="fixed inset-0 overflow-hidden bg-black">
      {/* Background illustration */}
      <div className="absolute inset-0">
        <Image
          src="/house-landing.jpg"
          alt="Cozy house in the forest at night"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Transition video (over the image) */}
      <video
        ref={videoRef}
        src="/enter-house.mp4"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-400 ${
          isPlaying ? 'opacity-100' : 'opacity-0'
        }`}
        onEnded={goInside}
        playsInline
      />

      {/* Foreground UI */}
      <div className="relative z-10 flex h-full flex-col">
        {/* Title */}
        <header className="pt-16 flex justify-center">
          <h1 className="cinzel-title text-white text-4xl md:text-5xl drop-shadow-[0_0_18px_rgba(0,0,0,0.9)]">
            Nouk
          </h1>
        </header>

        <div className="flex-1" />

        {/* Button */}
        <div className="pb-14 flex justify-center">
          <button
            type="button"
            onClick={handleEnter}
            className="glow-button"
          >
            Enter the house
          </button>
        </div>
      </div>
    </main>
  );
}
