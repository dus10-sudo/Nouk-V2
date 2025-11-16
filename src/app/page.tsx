"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LandingPage() {
  const router = useRouter();
  const [vh, setVh] = useState(0);

  // Fix for iOS Safari 100vh issues
  useEffect(() => {
    const updateVh = () => setVh(window.innerHeight * 0.01);
    updateVh();
    window.addEventListener("resize", updateVh);
    return () => window.removeEventListener("resize", updateVh);
  }, []);

  return (
    <main
      className="relative w-full overflow-hidden"
      style={{ height: `calc(${vh}px * 100)` }}
    >
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/house-landing.jpg"
          alt="Nouk House"
          fill
          priority
          className="object-cover brightness-105"
        />

        {/* VERY light gradient only for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-black/30" />
      </div>

      {/* Content block positioned lower */}
      <div
        className="absolute left-1/2 transform -translate-x-1/2 text-center px-6"
        style={{ top: "62%" }} // <-- Adjusted vertical position
      >
        <h1 className="text-[46px] font-semibold text-white drop-shadow-md">
          Nouk
        </h1>

        <p className="mt-2 text-[17px] leading-snug max-w-[340px] mx-auto text-white/90 drop-shadow">
          A quiet house for your thoughts, feelings, and late-night moments.
        </p>

        <button
          onClick={() => router.push("/home")}
          className="mt-5 rounded-full bg-[var(--accent)] px-9 py-3 text-[17px] font-medium text-[var(--paper)] shadow-[0_8px_30px_rgba(0,0,0,0.5)] active:scale-95 transition"
        >
          Enter the House
        </button>
      </div>
    </main>
  );
}
