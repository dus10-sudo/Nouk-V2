'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();
  const [isPlayingTransition, setIsPlayingTransition] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleEnter = () => {
    if (isPlayingTransition) return;

    setIsPlayingTransition(true);

    const vid = videoRef.current;
    if (vid) {
      vid.currentTime = 0;
      vid
        .play()
        .catch(() => {
          // If autoplay fails (iOS / browser rules), just go straight in
          router.push('/home');
        });
    } else {
      router.push('/home');
    }
  };

  const handleVideoEnd = () => {
    router.push('/home');
  };

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-black">
      {/* Static background image (fallback + base) */}
      <div className="pointer-events-none absolute inset-0">
        <img
          src="/house-landing.jpg"
          alt="A cozy lantern-lit cottage at night in the forest"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Transition video overlay (only visible during enter animation) */}
      <video
        ref={videoRef}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
          isPlayingTransition ? 'opacity-100' : 'opacity-0'
        }`}
        src="/enter-house.mp4"
        playsInline
        muted
        onEnded={handleVideoEnd}
      />

      {/* Dark vignette overlay for readability (fades away during transition) */}
      <div
        className={`pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,0,0,0.25),_rgba(0,0,0,0.65))] transition-opacity duration-500 ${
          isPlayingTransition ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Title + button layer */}
      <div className="relative z-10 h-full w-full">
        {/* NOUK title (up in the treetops / above moon) */}
        <div className="absolute top-[12vh] flex w-full justify-center">
          <h1 className="fade-in-title text-5xl tracking-[0.35em] text-white sm:text-6xl">
            NOUK
          </h1>
        </div>

        {/* Enter button (hovering over the path) */}
        <div className="absolute bottom-[22vh] flex w-full justify-center">
          <button
            type="button"
            onClick={handleEnter}
            className="fade-in-button glow-button rounded-full bg-[#f2cc73] px-10 py-4 text-lg font-medium text-[#5b3b22] shadow-[0_10px_25px_rgba(0,0,0,0.45)] sm:px-12 sm:py-4 sm:text-xl"
          >
            Enter the House
          </button>
        </div>
      </div>
    </main>
  );
}
