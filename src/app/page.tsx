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
          // if autoplay is blocked, just go inside
          navigateOnce();
        });
      // safety fallback if onended never fires
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

      {/* Enter animation video overlay */}
      <video
        ref={videoRef}
        src="/enter-house.mp4"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-400 ${
          isPlaying ? 'opacity-100' : 'opacity-0'
        }`}
        onEnded={navigateOnce}
        playsInline
      />

      {/* Foreground content */}
      <div className="relative z-10 flex h-full flex-col">
        {/* BIG NOUK title, near the top/center */}
        <header className="pt-20 flex justify-center">
          <h1 className="cinzel-title text-4xl md:text-5xl text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.7)]">
            Nouk
          </h1>
        </header>

        {/* Spacer pushes button toward lower third */}
        <div className="flex-1" />

        {/* Enter button */}
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
