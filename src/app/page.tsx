"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();
  const [playing, setPlaying] = useState(false);

  const handleEnter = () => {
    setPlaying(true);
  };

  const handleVideoEnd = () => {
    router.push("/home");
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black">
      {/* Background: image OR video */}
      {!playing ? (
        <>
          {/* Forest image */}
          <img
            src="/house-landing.jpg"
            alt="Nouk Forest"
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Subtle dark overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-20" />
        </>
      ) : (
        <>
          {/* Entrance video */}
          <video
            src="/enter-house.mp4"
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnd}
          />
          {/* Optional: darker overlay while video plays */}
          <div className="absolute inset-0 bg-black bg-opacity-10" />
        </>
      )}

      {/* Title (kept on top even while video plays) */}
      <div className="absolute top-10 w-full text-center pointer-events-none">
        <h1 className="cinzel-title text-white text-4xl drop-shadow-lg">
          N O U K
        </h1>
      </div>

      {/* Enter button – hidden once video starts */}
      {!playing && (
        <div className="absolute bottom-10 w-full flex justify-center">
          <button
            type="button"
            onClick={handleEnter}
            className="glow-button"
          >
            Enter the House
          </button>
        </div>
      )}
    </div>
  );
}
