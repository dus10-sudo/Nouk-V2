// src/app/page.tsx
'use client';

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

    // no video? just go straight to /home
    if (!video) {
      goInside();
      return;
    }

    setIsPlaying(true);
    video.currentTime = 0;

    video
      .play()
      .catch(() => {
        // autoplay blocked – just go inside
        goInside();
      });

    // safety fallback in case onEnded never fires
    setTimeout(goInside, 4500);
  };

  return (
    <main
      className="relative min-h-screen w-full overflow-hidden text-white"
      style={{
        backgroundImage: "url('/house-landing.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* transition video painted over the background */}
      <video
        ref={videoRef}
        src="/enter-house.mp4"
        className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-400 ${
          isPlaying ? 'opacity-100' : 'opacity-0'
        }`}
        onEnded={goInside}
        playsInline
      />

      {/* foreground UI */}
      <div className="relative z-20 flex min-h-screen flex-col items-center justify-between">
        {/* title */}
        <div className="mt-14">
          <h1 className="cinzel-title text-4xl md:text-5xl drop-shadow-[0_0_18px_rgba(0,0,0,0.9)]">
            Nouk
          </h1>
        </div>

        {/* bottom spacer so the title doesn't hug the top */}
        <div className="flex-1" />

        {/* button */}
        <div className="mb-10">
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
