// src/app/page.tsx
import Image from "next/image";
import Link from "next/link";
import localFont from "next/font/local";
import "./globals.css";

// Load Cinzel font
const cinzel = localFont({
  src: "./fonts/Cinzel-Regular.ttf",
  variable: "--font-cinzel",
});

export default function LandingPage() {
  return (
    <main
      className={`${cinzel.variable} relative h-screen w-screen overflow-hidden`}
    >
      {/* Background Image */}
      <Image
        src="/house-landing.jpg"
        alt="Nouk Background"
        fill
        priority
        className="object-cover"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Title */}
      <h1
        className="
          absolute 
          top-[22%] 
          w-full 
          text-center 
          text-6xl 
          text-white 
          tracking-[0.6em] 
          font-[var(--font-cinzel)]
          drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]
        "
      >
        N O U K
      </h1>

      {/* Enter Button */}
      <Link
        href="/home"
        className="
          absolute 
          bottom-[12%] 
          left-1/2 
          -translate-x-1/2
          px-8 
          py-4 
          text-xl 
          font-semibold 
          rounded-lg 
          border 
          border-white/70 
          text-white 
          backdrop-blur-md
          shadow-[0_0_20px_rgba(255,255,255,0.7)]
          hover:shadow-[0_0_30px_rgba(255,255,255,1)]
          transition-all 
          duration-300
        "
      >
        Enter the House
      </Link>
    </main>
  );
}
