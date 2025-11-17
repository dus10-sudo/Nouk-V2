"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();
  const [playing, setPlaying] = useState(false);

  const handleEnter = () => {
    setPlaying(true);

    const video = document.getElementById("enter-video") as HTMLVideoElement;
    if (!video) return;

    video.play();

    video.onended = () => {
      router.push("/home");
    };
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden">

      {/* Forest background */}
      <img
        src="/house-landing.jpg"
        alt="Nouk Forest"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay for contrast (optional subtle dark fade) */}
      <div className="absolute inset-0 bg-black bg-opacity-20" />

      {/* NOUK title */}
      <div className="absolute top-10 w-full text-center">
        <h1 className="cinzel-title text-white text-4xl drop-shadow-lg">
          N O U K
        </h1>
      </div>

      {/* Enter Video (hidden) */}
      {playing && (
        <video
          id="enter-video"
          src="/enter-house.mp4"
          className="absolute inset-0 w-full h-full object-cover"
          playsInline
        />
      )}

      {/* Enter Button */}
      {!playing && (
        <div className="absolute bottom-16 w-full flex justify-center">
          <button onClick={handleEnter} className="glow-button">
            Enter the House
          </button>
        </div>
      )}
    </div>
  );
}
