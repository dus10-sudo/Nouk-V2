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
          // If autoplay is blocked, just go straight inside
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
      {/* Background illustration */}
      <img
        src="/house-landing.jpg"
        alt="A cozy lantern-lit cottage at night in the forest"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />

      {/* Transition video overlay */}
      <video
        ref={videoRef}
        className={`absolute inset-0 z-10 h-full w-full object-cover transition-opacity duration-500 ${
          isPlayingTransition ? 'opacity-100' : 'opacity-0'
        }`}
        src="/enter-house.mp4"
        playsInline
        muted
        onEnded={handleVideoEnd}
      />

      {/* Dark vignette for readability over the background (not the video) */}
      <div
        className={`pointer-events-none fixed inset-0 z-15 bg-[radial-gradient(circle_at_top,_rgba(0,0,0,0.25),_rgba(0,0,0,0.65))] transition-opacity duration-500 ${
          isPlayingTransition ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Title: fixed near the treetops */}
      <div
        className={`pointer-events-none fixed inset-x-0 top-[12vh] z-20 flex justify-center transition-opacity duration-400 ${
          isPlayingTransition ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <h1 className="fade-in-title text-5xl tracking-[0.35em] text-white sm:text-6xl">
          NOUK
        </h1>
      </div>

      {/* Button: fixed over the path, above the flowers */}
      <div
        className={`fixed inset-x-0 bottom-[11vh] z-20 flex justify-center transition-opacity duration-400 ${
          isPlayingTransition ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <button
          type="button"
          onClick={handleEnter}
          className="fade-in-button glow-button rounded-full bg-[#f2cc73] px-10 py-4 text-lg font-medium text-[#5b3b22] shadow-[0_10px_25px_rgba(0,0,0,0.45)] sm:px-12 sm:py-4 sm:text-xl"
        >
          Enter the House
        </button>
      </div>
    </main>
  );
}
