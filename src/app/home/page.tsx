"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Thread = any; // keep flexible so we don't fight TS over field names

export default function HomePage() {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadThreads() {
      try {
        const res = await fetch("/api/threads", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to load threads");
        const data = await res.json();
        setThreads(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error loading threads", err);
        setThreads([]);
      } finally {
        setLoading(false);
      }
    }
    loadThreads();
  }, []);

  return (
    <div className="min-h-screen bg-[#f4ebd6] text-[#33261a]">
      {/* Hearth hero */}
      <div className="relative w-full overflow-hidden rounded-b-3xl bg-black shadow-md">
        <img
          src="/house-interior.jpg"
          alt="The Hearth inside Nouk"
          className="h-48 w-full object-cover sm:h-56"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/30 to-transparent" />

        <div className="absolute inset-x-0 bottom-4 px-5">
          <p className="text-xs uppercase tracking-[0.2em] text-[#f9e7c7]/80">
            Inside Nouk
          </p>
          <h1 className="mt-1 text-2xl font-semibold text-white drop-shadow">
            The Hearth
          </h1>
          <p className="mt-1 text-sm text-[#f9e7c7]/90">
            Take a breath. See what&apos;s on people&apos;s minds tonight.
          </p>
        </div>
      </div>

      {/* Content container */}
      <div className="mx-auto flex max-w-3xl flex-col gap-4 px-4 pb-10 pt-6">
        {/* Share button */}
        <div className="flex justify-center">
          <Link
            href="/share"
            className="inline-flex items-center justify-center rounded-full bg-[#f6873f] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-[#f6873f]/40 hover:bg-[#f26f25] active:scale-[0.98] transition"
          >
            Share a Thought
          </Link>
        </div>

        {/* Tiny hint */}
        <p className="text-center text-xs text-[#7a6650]">
          Threads stay for a little while, then quietly fade away.
        </p>

        {/* Feed */}
        <div className="mt-2 flex flex-col gap-3 pb-4">
          {loading && (
            <p className="text-center text-sm text-[#7a6650]">Loading...</p>
          )}

          {!loading && threads.length === 0 && (
            <p className="text-center text-sm text-[#7a6650]">
              It&apos;s quiet here. Be the first to leave something at the
              hearth.
            </p>
          )}

          {!loading &&
            threads.map((thread: any) => {
              const created = thread.created_at
                ? new Date(thread.created_at)
                : null;
              const timeString = created
                ? created.toLocaleString(undefined, {
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })
                : "";

              // try to guess room + alias fields without breaking if they don't exist
              const roomName =
                thread.roomName ||
                thread.room_name ||
                thread.room ||
                (thread.rooms && thread.rooms[0]?.name) ||
                "Room";

              const alias =
                thread.alias ||
                thread.display_name ||
                thread.user_alias ||
                "";

              return (
                <Link
                  key={thread.id}
                  href={`/thread/${thread.id}`}
                  className="block rounded-3xl bg-[#fbf3e2] px-4 py-3 shadow-sm shadow-black/5 border border-[#f0e0c5]"
                >
                  <div className="flex items-center justify-between text-xs text-[#7a6650] mb-1">
                    <span className="font-medium">
                      {alias ? `${alias} · ${roomName}` : roomName}
                    </span>
                    {timeString && <span>{timeString}</span>}
                  </div>
                  {thread.title && (
                    <p className="text-sm text-[#33261a]">{thread.title}</p>
                  )}
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
}
