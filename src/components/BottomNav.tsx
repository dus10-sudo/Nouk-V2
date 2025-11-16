// src/components/BottomNav.tsx
"use client";

import Link from "next/link";
import ShareThoughtButton from "@/components/ShareThought";

export default function BottomNav() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-4 sm:pb-5">
      <div className="pointer-events-auto flex w-full max-w-md items-center gap-3 rounded-full border border-black/5 bg-[var(--paper)]/95 px-3 py-2 shadow-[0_18px_55px_rgba(15,23,42,0.55)] backdrop-blur-md">
        {/* Left: brand / home */}
        <Link
          href="/"
          className="flex items-center text-[13px] font-semibold tracking-[0.18em] text-[var(--muted-strong)] uppercase transition-transform active:scale-95"
        >
          Nouk
        </Link>

        {/* Center: Share CTA – reusing existing button & modal */}
        <div className="flex-1">
          <ShareThoughtButton />
        </div>

        {/* Right: sprout logo – for now just scroll-to-top */}
        <button
          type="button"
          aria-label="Back to top"
          onClick={() => {
            if (typeof window !== "undefined") {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--surface)] shadow-[0_10px_30px_rgba(15,23,42,0.4)] transition-transform active:scale-95"
        >
          <span className="text-lg">🌱</span>
        </button>
      </div>
    </div>
  );
}
