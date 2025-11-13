// src/components/Logo.tsx

export default function Logo() {
  return (
    <div className="flex flex-col items-center gap-3">
      {/* Sprout glyph in a soft circle */}
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--card)] shadow-[0_10px_30px_rgba(0,0,0,0.10)]">
        <svg
          aria-hidden="true"
          viewBox="0 0 32 32"
          className="h-7 w-7"
        >
          <path
            d="M16 18.5c-1.6-2.3-2.4-4.6-2.4-7.1V9.2
               c-2.3.1-4.2.8-5.8 2.1C6.3 12.7 5.4 14.6 5 17
               c2.2.2 4.1-.3 5.6-1.4 1-.7 1.7-1.7 2-2.7
               .2 1.7.8 3.4 1.8 5v4.3c0 .5.4 1 1 1s1-.4 1-1v-4.3
               c1-1.6 1.6-3.3 1.8-5 0 0 .1 0 .1.1
               .3 1.1 1 2 2 2.7 1.5 1.1 3.4 1.6 5.6 1.4
               -.4-2.4-1.3-4.3-2.8-5.8-1.6-1.3-3.5-2-5.8-2.1v2.2
               c0 2.5-.8 4.8-2.4 7.1z"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Wordmark */}
      <span className="font-serif text-[40px] leading-[1] tracking-[-0.03em] text-[var(--ink)]">
        Nouk
      </span>
    </div>
  );
}
