"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div
      className="relative w-full h-screen overflow-hidden"
      style={{ backgroundColor: "#000" }}
    >
      {/* Background image */}
      <Image
        src="/house-landing.jpg" // <- put your chosen image in /public and name it this
        alt="Nouk House"
        fill
        priority
        className="object-cover"
      />

      {/* Dark overlay (optional, keeps text legible) */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Centered content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-white text-4xl font-semibold tracking-wide mb-4 drop-shadow-lg">
          nouk.space
        </h1>

        <p className="text-white/90 text-lg max-w-md mb-10 drop-shadow">
          A quiet little house for short-lived threads.
          <br />
          Share something small, let it breathe, and let it fade.
        </p>

        {/* Button */}
        <button
          onClick={() => router.push("/home")}
          className="px-8 py-3 rounded-full text-lg font-medium text-black bg-[#7ff6ff] shadow-md active:scale-95 transition"
        >
          Enter the House
        </button>
      </div>
    </div>
  );
}
