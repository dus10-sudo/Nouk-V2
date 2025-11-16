'use client';

import React, { useState } from 'react';

type ShareSheetProps = {
  open: boolean;
  onClose: () => void;
};

function ShareSheet({ open, onClose }: ShareSheetProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40">
      <div className="w-full max-w-md rounded-t-3xl bg-[#fff7ec] px-5 pb-6 pt-4 shadow-xl">
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-[#e0c7a1]" />

        <h2 className="text-center text-base font-semibold text-[#5a3b25]">
          Share a thought
        </h2>
        <p className="mt-1 text-center text-sm text-[#7b5a3a]">
          Leave something small. Threads fade after a little while.
        </p>

        <textarea
          className="mt-4 h-28 w-full resize-none rounded-2xl border border-[#e8d2b3] bg-[#fffaf2] px-3 py-2 text-sm text-[#5a3b25] outline-none focus:border-[#f38b3c] focus:ring-2 focus:ring-[#f8b57a]/60"
          placeholder="What’s on your mind?"
        />

        <div className="mt-4 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-2xl border border-transparent bg-[#e7d3b4] px-4 py-2 text-sm font-medium text-[#5a3b25] active:translate-y-[1px]"
          >
            Close
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-2xl bg-[#f38b3c] px-4 py-2 text-sm font-semibold text-white shadow-[0_8px_16px_rgba(0,0,0,0.22)] active:translate-y-[1px]"
          >
            Post (soon)
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BottomNav() {
  const [open, setOpen] = useState(false);

  const scrollHome = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Transparent bar pinned to bottom */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center pb-[max(env(safe-area-inset-bottom),16px)]">
        <div className="pointer-events-auto flex w-full max-w-md items-center justify-between px-4">
          {/* Left: brand */}
          <button
            type="button"
            onClick={scrollHome}
            className="text-sm font-semibold uppercase tracking-[0.22em] text-[#5a3b25]"
          >
            Nouk
          </button>

          {/* Center: CTA */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex min-w-[12rem] flex-1 items-center justify-center rounded-full bg-[#f38b3c] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_20px_rgba(0,0,0,0.25)] active:translate-y-[1px]"
          >
            Share a Thought
          </button>

          {/* Right: sprout, also scroll to top */}
          <button
            type="button"
            onClick={scrollHome}
            aria-label="Back to top"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fdf3e4] text-xl shadow-[0_6px_12px_rgba(0,0,0,0.18)]"
          >
            🌱
          </button>
        </div>
      </div>

      {/* Simple sheet overlay */}
      <ShareSheet open={open} onClose={() => setOpen(false)} />
    </>
  );
}
