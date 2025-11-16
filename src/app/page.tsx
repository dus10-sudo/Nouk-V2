// src/app/page.tsx

import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden">

      <Image
        src="/house.jpg"
        alt="Nouk House"
        fill
        priority
        className="object-cover z-0"
      />

      <div className="absolute inset-0 bg-black/40 z-10" />

      <div className="relative z-20 flex flex-col items-center justify-center h-full text-white px-6">

        <h1 className="text-6xl font-semibold tracking-[0.3em] mb-10 opacity-0 animate-fadeIn [--delay:200ms]">
          NOUK
        </h1>

        <Link
          href="/home"
          className="px-10 py-4 bg-amber-300 text-black font-semibold rounded-full shadow-xl opacity-0 animate-fadeIn [--delay:500ms]"
        >
          Enter the House
        </Link>

      </div>
    </main>
  );
}
