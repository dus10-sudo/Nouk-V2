"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import localFont from "next/font/local";

const cinzel = localFont({
  src: "../fonts/Cinzel-Regular.ttf",
  variable: "--font-cinzel"
});

export default function LandingPage() {
  const router = useRouter();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowContent(true), 100);
  }, []);

  return (
    <div 
      className={`${cinzel.variable} relative h-screen w-screen overflow-hidden`}
    >
      {/* Background Image */}
      <Image 
        src="/house-landing.jpg"
        alt="Nouk Forest Path"
        fill
        priority
        quality={95}
        className="object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Centered Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">

        {/* Title */}
        <h1 
          className={`
            text-white 
            tracking-[0.35em] 
            text-5xl 
            font-normal 
            opacity-0 
            animate-fadeIn 
            ${showContent ? "opacity-100" : ""}
            font-[var(--font-cinzel)]
          `}
          style={{ textShadow: "0px 0px 12px rgba(255,255,255,0.75)" }}
        >
          N O U K
        </h1>

        {/* Spacer */}
        <div className="h-12"></div>

        {/* Enter Button */}
        <button
          onClick={() => router.push("/home")}
          className={`
            relative
            px-10 py-4 
            rounded-xl
            text-white 
            text-xl 
            font-[var(--font-cinzel)]
            bg-black/40 
            border border-white/70
            shadow-lg
            backdrop-blur-sm
            opacity-0
            animate-fadeIn delay-300
            glow-pulse
          `}
          style={{
            boxShadow: "0 0 25px rgba(173, 216, 230, 0.55)",
          }}
        >
          Enter the House
        </button>
      </div>
    </div>
  );
}
