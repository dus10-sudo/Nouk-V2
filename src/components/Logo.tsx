// src/components/Logo.tsx

export default function Logo() {
  return (
    <div className="flex flex-col items-center gap-3 mt-4 mb-2">
      {/* Sprout Icon */}
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--card)] shadow-[0_10px_30px_rgba(0,0,0,0.12)]">
        <svg
          viewBox="0 0 32 32"
          className="h-8 w-8"
          stroke="var(--accent)"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 18c-1.5-2.2-2.2-4.3-2.2-6.7V9.5c-2.2.1-4 .8-5.4 1.9C7 13 6.2 14.7 5.8 17c2 .2 3.8-.3 5.1-1.3 1-.7 1.6-1.6 1.9-2.6.2 1.6.8 3.2 1.7 4.7v4.2c0 .5.4 1 1 1s1-.4 1-1v-4.2c.9-1.5 1.5-3.1 1.7-4.7 0 0 .1 0 .1.1.3 1 .9 1.9 1.9 2.6 1.3 1 3.1 1.5 5.1 1.3-.3-2.3-1.2-4-2.6-5.6-1.4-1.2-3.2-1.9-5.4-1.9v1.7c0 2.4-.7 4.5-2.2 6.7z"/>
        </svg>
      </div>

      {/* Wordmark */}
      <h1 className="font-serif text-[42px] tracking-[-0.03em] leading-none text-[var(--ink)]">
        Nouk
      </h1>
    </div>
  );
}
