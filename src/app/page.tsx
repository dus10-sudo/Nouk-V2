"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function LandingPage() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    // Trigger fade-in once mounted
    setIsReady(true);
  }, []);

  const handleEnter = () => {
    const video = videoRef.current;

    if (video) {
      setIsPlaying(true);
      video.currentTime = 0;

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If autoplay is blocked, just go straight in
          router.push("/home");
        });
      }
    } else {
      router.push("/home");
    }
  };

  const handleVideoEnd = () => {
    router.push("/home");
  };

  return (
    <main className="relative h-[100dvh] w-full overflow-hidden bg-black">
      {/* Background illustration */}
      <Image
        src="/house-landing.jpg"
        alt="A cozy cottage glowing under a full moon in the woods"
        fill
        priority
        className="object-cover"
      />

      {/* Gradient to keep text readable */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/70" />

      {/* Entry animation video */}
      <video
        ref={videoRef}
        src="/enter-house.mp4"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
          isPlaying ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onEnded={handleVideoEnd}
        playsInline
        muted
      />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center">
        {/* Title */}
        <div
          className={`mt-16 text-center text-4xl tracking-[0.4em] text-white sm:mt-20 sm:text-5xl transition-all duration-700 ease-out ${
            isReady ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          N O U K
        </div>

        {/* Spacer to keep the house visible and push button down */}
        <div className="flex-1" />

        {/* Enter button */}
        <button
          type="button"
          onClick={handleEnter}
          disabled={isPlaying}
          className={`mb-20 rounded-full px-9 py-4 text-base font-medium outline-none shadow-lg shadow-amber-400/40
          bg-amber-300/95 text-stone-900
          transition-all duration-500 ease-out
          hover:bg-amber-200 hover:shadow-amber-200/70 active:scale-95
          sm:mb-24 sm:px-12 sm:py-4 sm:text-lg
          ${
            isPlaying
              ? "scale-95 opacity-0 pointer-events-none"
              : "opacity-100"
          }
          ${isReady ? "translate-y-0" : "translate-y-6"}
          animate-pulse`}
        >
          Enter the House
        </button>
      </div>
    </main>
  );
}
