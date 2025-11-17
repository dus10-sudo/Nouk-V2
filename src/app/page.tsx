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
      {/* Background image OR video */}
      {!playing ? (
        <>
          <img
            src="/house-landing.jpg"
            alt="Nouk Forest"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20" />
        </>
      ) : (
        <>
          <video
            src="/enter-house.mp4"
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnd}
          />
          <div className="absolute inset-0 bg-black bg-opacity-10" />
        </>
      )}

      {/* Title — hides when video begins */}
      {!playing && (
        <div className="absolute top-12 w-full text-center">
          <h1 className="cinzel-title text-white text-4xl drop-shadow-lg">
            N O U K
          </h1>
        </div>
      )}

      {/* Button — moved UP, also hides while playing */}
      {!playing && (
        <div className="absolute w-full flex justify-center bottom-20 sm:bottom-14">
          <button onClick={handleEnter} className="glow-button">
            Enter the House
          </button>
        </div>
      )}
    </div>
  );
}
