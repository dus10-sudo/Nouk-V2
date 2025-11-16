// /src/app/page.tsx

import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div
      className="relative h-screen w-screen overflow-hidden flex items-center justify-center"
      style={{
        touchAction: "none", // disables iOS bounce
      }}
    >
      {/* Background Image */}
      <Image
        src="/house-landing.jpg"
        alt="Forest house at night"
        fill
        priority
        className="object-cover"
      />

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <h1 className="text-white text-4xl font-bold drop-shadow-lg">
          Nouk
        </h1>

        <p className="text-white text-lg mt-3 max-w-sm drop-shadow-md">
          A quiet house for your thoughts, feelings, and late-night moments.
        </p>

        <Link
          href="/home"
          className="mt-8 bg-[#D97A38] hover:bg-[#c56c2f] text-white font-semibold text-lg px-10 py-4 rounded-full shadow-lg transition"
        >
          Enter the House
        </Link>
      </div>
    </div>
  );
}
