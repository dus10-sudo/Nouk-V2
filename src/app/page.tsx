// src/app/page.tsx
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    // Fixed full-screen canvas, no scrolling
    <main className="fixed inset-0 overflow-hidden">
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

      {/* Soft gradient for readability */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/25 via-black/10 to-black/40" />

      {/* Foreground layer */}
      <div className="relative z-10 h-full w-full">
        {/* Title in the treetop gap above the moon */}
        <h1
          className="
            absolute 
            left-1/2 
            top-[18vh] 
            -translate-x-1/2
            font-sans
            text-[2.75rem]
            sm:text-[3.25rem]
            font-semibold
            tracking-[0.12em]
            uppercase
            text-white
            drop-shadow-[0_6px_16px_rgba(0,0,0,0.75)]
          "
        >
          Nouk
        </h1>

        {/* Button down on the path area */}
        <div
          className="
            absolute 
            left-1/2 
            bottom-[9vh] 
            -translate-x-1/2
          "
        >
          <Link href="/home">
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
                shadow-[0_12px_28px_rgba(0,0,0,0.55)]
                backdrop-blur-sm
                transition
                duration-200
                hover:scale-[1.03]
                hover:shadow-[0_16px_40px_rgba(0,0,0,0.65)]
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
