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

  function navigateOnce() {
    if (hasNavigated) return;
    setHasNavigated(true);
    router.push('/home');
  }

  const handleEnter = () => {
    setIsPlaying(true);

    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      video
        .play()
        .catch(() => {
          // if browser blocks playback, just go inside
          navigateOnce();
        });
      // safety fallback in case onended doesn't fire
      setTimeout(navigateOnce, 4000);
    } else {
      navigateOnce();
    }
  };

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-black">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/house-landing.jpg"
          alt="Cozy house in the woods at night"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Enter video overlay (fades in over the image when playing) */}
      <video
        ref={videoRef}
        src="/enter-house.mp4"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-400 ${
          isPlaying ? 'opacity-100' : 'opacity-0'
        }`}
        onEnded={navigateOnce}
        playsInline
      />

      {/* Overlay content: Nouk title + button */}
      <div className="relative z-10 flex h-full flex-col items-center justify-between py-10">
        {/* Top title */}
        <div className="mt-2 flex flex-col items-center">
          <div className="rounded-[18px] bg-black/45 px-5 py-2">
            <span className="cinzel-title text-[20px] uppercase tracking-[0.35em] text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.55)]">
              Nouk
            </span>
          </div>
        </div>

        {/* Bottom button */}
        <div className="mb-10 flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={handleEnter}
            className="glow-button rounded-full px-8 py-3 text-[14px] font-medium text-white"
          >
            Enter the house
          </button>
        </div>
      </div>
    </main>
  );
}
