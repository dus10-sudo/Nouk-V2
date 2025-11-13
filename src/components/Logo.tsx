// src/components/Logo.tsx
"use client";

import * as React from "react";

/**
 * Nouk Logo – little sprout in a soft rounded corner.
 * Uses the same color tokens you already defined in global.css:
 * --paper, --ink, --accent, --accent-press
 */
export default function Logo() {
  return (
    <div className="inline-flex items-center gap-2">
      {/* Sprout + corner shape */}
      <div className="relative h-10 w-10 rounded-2xl bg-[var(--card)] shadow-[var(--shadow)] flex items-center justify-center overflow-hidden">
        {/* Corner block */}
        <div className="absolute inset-0">
          <div className="absolute right-0 bottom-0 h-1/2 w-1/2 bg-[var(--accent)] rounded-tl-2xl" />
        </div>
        {/* Sprout icon */}
        <svg
          viewBox="0 0 32 32"
          className="relative h-5 w-5 text-[var(--accent)]"
          aria-hidden="true"
        >
          {/* Stem */}
          <path
            d="M16 10v12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Left leaf */}
          <path
            d="M15 14c-2.5 0-4-1.8-4-4 2.2 0 4 .8 4 4Z"
            fill="currentColor"
          />
          {/* Right leaf */}
          <path
            d="M17 14c0-3.2 1.8-4 4-4 0 2.2-1.5 4-4 4Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Wordmark */}
      <span className="font-serif text-[24px] leading-none tracking-[-0.04em] text-[var(--ink)]">
        Nouk
      </span>
    </div>
  );
}
