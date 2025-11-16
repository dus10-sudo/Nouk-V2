"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();
  const [isPlayingTransition, setIsPlayingTransition] = useState(false);

  // Lock scrolling on the landing page
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const handleEnter = () => {
    setIsPlayingTransition(true);
  };

  const handleVideoEnd = () => {
    router.push("/home");
  };

  return (
    <main className="relative h-[100vh] w-full overflow-hidden">
      {/* Static background image */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${
          isPlayingTransition ? "opacity-0" : "opacity-100"
        }`}
      >
        <Image
          src="/house-landing.jpg"
          alt="A lantern-lit cottage in the forest under a full moon"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Video that plays after clicking the button */}
      {isPlayingTransition && (
        <video
          key="enter-house-video"
          className="absolute inset-0 h-full w-full object-cover opacity-100 transition-opacity duration-700"
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnd}
        >
          <source src="/enter-house.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Gradient overlay for contrast */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/35" />

      {/* Title + button (hidden once transition starts) */}
      {!isPlayingTransition && (
        <div className="relative z-10 flex h-full flex-col justify-between">
          {/* Top spacer so NOUK sits in the treetops / above the moon */}
          <div className="h-[12vh]" />

          {/* Center title */}
          <div className="flex flex-col items-center">
            <h1 className="text-5xl tracking-[0.35em] text-white drop-shadow-[0_3px_12px_rgba(0,0,0,0.7)]">
              NOUK
            </h1>
          </div>

          {/* Bottom button on the path */}
          <div className="mb-10 flex justify-center">
            <button
              type="button"
              onClick={handleEnter}
              className="rounded-full bg-[#f2cc73] px-10 py-4 text-lg font-medium text-[#5b3b22] shadow-[0_10px_25px_rgba(0,0,0,0.45)] transition-transform duration-150 active:translate-y-[1px] active:shadow-[0_6px_16px_rgba(0,0,0,0.45)]"
            >
              Enter the House
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
