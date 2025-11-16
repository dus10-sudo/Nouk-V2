// src/app/page.tsx
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="relative h-screen overflow-hidden">
      {/* Background illustration */}
      <div className="absolute inset-0">
        <Image
          src="/house-landing.jpg"
          alt="A lantern-lit forest path leading to a small cozy house under a full moon."
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Subtle gradient for readability */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-black/5 to-black/40" />

      {/* Foreground content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-between px-6 pt-[9vh] pb-[10vh] sm:pt-[10vh] sm:pb-[11vh]">
        {/* Title in the treetop clearing */}
        <div className="flex w-full flex-col items-center">
          <h1
            className="
              font-sans 
              text-[2.75rem] 
              sm:text-[3.25rem]
              font-semibold 
              tracking-[0.18em]
              uppercase
              text-white
              drop-shadow-[0_6px_16px_rgba(0,0,0,0.75)]
            "
          >
            Nouk
          </h1>
        </div>

        {/* Button down on the path area */}
        <div className="flex w-full flex-col items-center">
          <Link href="/home" className="w-full flex justify-center">
            <button
              className="
                rounded-full 
                bg-[#F4D48A] 
                px-10 
                py-3.5 
                text-lg 
                sm:text-xl
                font-medium 
                text-[#5B3B1A]
                shadow-[0_12px_28px_rgba(0,0,0,0.5)]
                backdrop-blur-sm
                transition
                duration-200
                hover:scale-[1.03]
                hover:shadow-[0_16px_40px_rgba(0,0,0,0.6)]
                active:scale-[0.97]
              "
            >
              Enter the House
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
