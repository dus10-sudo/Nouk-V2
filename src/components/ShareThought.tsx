"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Room = { slug: string; name: string; description?: string };

const ROOM_PRESETS: Room[] = [
  { slug: "library", name: "Library", description: "Books, projects, ideas" },
  { slug: "kitchen", name: "Kitchen", description: "Recipes, cooking, food talk" },
  { slug: "theater", name: "Theater", description: "Movies & TV" },
  {
    slug: "game-room",
    name: "Game Room",
    description: "Games, music & hobbies",
  },
  { slug: "garage", name: "Garage", description: "DIY, tools, builds" },
  { slug: "study", name: "Study", description: "Focus, learning, planning" },
];

export default function ShareThought() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [room, setRoom] = useState<Room | null>(null);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  const close = () => {
    setOpen(false);
    setRoom(null);
    setTitle("");
    setLink("");
  };

  return (
    <>
      {/* Docked CTA button */}
      <button onClick={() => setOpen(true)} className="nouk-cta">
        Start a Nouk
      </button>

      {/* Modal */}
      {open && (
        <div
          className="nouk-modal-backdrop fixed inset-0 z-50 flex items-center justify-center px-4"
          onClick={close}
        >
          <div
            className="w-full max-w-[540px] rounded-[28px] bg-[var(--card-soft)] border border-[var(--stroke)] shadow-soft px-5 py-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="mb-1 text-[22px] font-serif">Start a New Nouk</h2>
            <p className="mb-4 text-[13px] text-[var(--muted)]">
              Pick a cozy corner and start something small.
            </p>

            {/* Step 1: room */}
            <label className="mb-2 block text-[14px] text-[var(--muted)]">
              1) Where do you want to post?
            </label>

            <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {ROOM_PRESETS.map((r) => (
                <button
                  key={r.slug}
                  type="button"
                  onClick={() => setRoom(r)}
                  className={`rounded-2xl border px-3 py-2 text-left transition-colors ${
                    room?.slug === r.slug
                      ? "border-[var(--accent)] bg-[var(--badge)]"
                      : "border-[var(--stroke)] bg-[var(--card)]"
                  }`}
                >
                  <div className="text-[14px] font-medium">{r.name}</div>
                  <div className="text-[11px] text-[var(--muted)]">
                    {r.description}
                  </div>
                </button>
              ))}
            </div>

            {/* Step 2: title/link */}
            <label className="mb-2 block text-[14px] text-[var(--muted)]">
              2) What&apos;s the thread about? (optional link/topic)
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Say something small to start…"
              className="mb-2 w-full rounded-2xl border border-[var(--stroke)] bg-white/80 px-3 py-2 text-[14px] outline-none"
            />
            <input
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="Optional link (YouTube, Spotify, article…)"
              className="mb-5 w-full rounded-2xl border border-[var(--stroke)] bg-white/80 px-3 py-2 text-[14px] outline-none"
            />

            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={close}
                className="rounded-2xl border border-[var(--stroke)] bg-[var(--badge)] px-4 py-2 text-[14px]"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!room}
                onClick={() => {
                  const dest = room
                    ? `/room/${room.slug}?title=${encodeURIComponent(
                        title
                      )}&link=${encodeURIComponent(link)}`
                    : "/";
                  router.push(dest);
                  close();
                }}
                className="rounded-2xl bg-[var(--accent)] px-5 py-2 text-[14px] font-medium text-white disabled:opacity-60"
              >
                Start Nouk
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
