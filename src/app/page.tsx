// src/app/page.tsx

import Link from "next/link";
import RoomCard from "@/components/RoomCard";
import Logo from "@/components/Logo";
import {
  IconLibrary,
  IconLounge,
  IconStudio,
  IconTheater,
  IconGame,
  IconCafe,
} from "@/components/Icons";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-paper text-ink">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 pb-28 pt-8 lg:flex-row lg:items-start lg:gap-10 lg:pb-16 lg:pt-12">
        {/* Left column – Logo + copy */}
        <section className="mb-8 flex flex-col items-center text-center lg:mb-0 lg:w-[38%] lg:items-start lg:text-left">
          <Logo />

          <p className="mt-2 text-[14px] text-[var(--muted)]">
            A small, quiet house for short-lived threads. Pick a room, start a
            Nouk, let it fade when you&apos;re done talking.
          </p>

          {/* How it works card */}
          <div className="mt-6 w-full max-w-sm rounded-[28px] bg-[var(--card)] p-4 shadow-[0_18px_40px_rgba(15,23,42,0.18)]">
            <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
              How Nouk feels
            </p>
            <ul className="space-y-2 text-[14px] text-[var(--ink-soft)]">
              <li>• Start a tiny conversation, not a feed.</li>
              <li>• Rooms feel like corners of a cozy house.</li>
              <li>• Threads quietly expire after a short while.</li>
            </ul>
          </div>
        </section>

        {/* Right column – Rooms grid with vine background */}
        <section className="relative flex-1 lg:w-[62%]">
          {/* Soft vine background (desktop only) */}
          <svg
            className="pointer-events-none absolute -inset-x-6 -inset-y-4 -z-10 hidden lg:block opacity-40"
            viewBox="0 0 800 600"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="vineStroke" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="rgba(148,163,184,0.35)" />
                <stop offset="100%" stopColor="rgba(148,163,184,0.05)" />
              </linearGradient>
            </defs>
            <path
              d="M80 520 C 160 440 220 420 280 360 C 340 300 380 260 460 230 C 540 200 620 160 720 120"
              fill="none"
              stroke="url(#vineStroke)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="4 10"
            />
            <path
              d="M120 140 C 220 180 260 220 300 280 C 340 340 380 380 450 410 C 520 440 600 460 700 480"
              fill="none"
              stroke="url(#vineStroke)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray="3 12"
            />
          </svg>

          <header className="mb-3 flex items-center justify-between">
            <h2 className="text-[13px] font-medium uppercase tracking-[0.16em] text-[var(--muted)]">
              Rooms
            </h2>
            <span className="rounded-full border border-[var(--border-subtle)] bg-[var(--card-elevated)] px-3 py-1 text-[11px] font-medium text-[var(--muted)]">
              Pick a room to begin
            </span>
          </header>

          <div className="grid gap-3 sm:grid-cols-2">
            <RoomCard
              href="/room/library"
              icon={IconLibrary}
              title="Library"
              subtitle="Books, projects, ideas"
            />
            <RoomCard
              href="/room/lounge"
              icon={IconLounge}
              title="Lounge"
              subtitle="Soft check-ins, daily life"
            />
            <RoomCard
              href="/room/studio"
              icon={IconStudio}
              title="Studio"
              subtitle="Creative work & drafts"
            />
            <RoomCard
              href="/room/theater"
              icon={IconTheater}
              title="Theater"
              subtitle="Movies, shows, deep dives"
            />
            <RoomCard
              href="/room/game-room"
              icon={IconGame}
              title="Game Room"
              subtitle="Games, streams, silly stuff"
            />
            <RoomCard
              href="/room/cafe"
              icon={IconCafe}
              title="Café"
              subtitle="Open table, anything goes"
            />
          </div>
        </section>
      </div>

      {/* Share a Thought – fixed pill (mobile & desktop) */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 flex justify-center pb-5">
        <div className="pointer-events-auto">
          <Link
            href="/share"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--ink-strong)] px-6 py-3 text-[14px] font-semibold text-[var(--paper)] shadow-[0_18px_40px_rgba(15,23,42,0.35)] hover:brightness-110 active:translate-y-[1px]"
          >
            <span>Share a Thought</span>
            <span className="text-[18px] leading-none">✶</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
