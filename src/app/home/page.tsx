// src/app/home/page.tsx
'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Room = {
  id: string;
  slug: string;
  name: string;
};

type Thread = {
  id: string;
  title: string | null;
  body: string | null;
  link_url: string | null;
  created_at: string;
  room_id: string;
  rooms?: {
    id: string;
    slug: string;
    name: string;
  } | null;
};

function formatTimeAgo(iso: string) {
  const then = new Date(iso).getTime();
  const now = Date.now();
  const diffSec = Math.floor((now - then) / 1000);

  if (diffSec < 60) return "just now";
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDay = Math.floor(diffHr / 24);
  return `${diffDay}d ago`;
}

function getRoomSlugFromLocation(): string | undefined {
  if (typeof window === "undefined") return undefined;
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("room") || undefined;
  return slug || undefined;
}

export default function HomePage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [activeRoomSlug, setActiveRoomSlug] = useState<string | undefined>(
    undefined
  );
  const [threads, setThreads] = useState<Thread[]>([]);
  const [isLoadingRooms, setIsLoadingRooms] = useState(true);
  const [isLoadingThreads, setIsLoadingThreads] = useState(false);

  // Load rooms once on mount
  useEffect(() => {
    let cancelled = false;

    async function loadRooms() {
      setIsLoadingRooms(true);
      const { data, error } = await supabase
        .from("rooms")
        .select("id, slug, name")
        .order("name", { ascending: true });

      if (error) {
        console.error("[home] error loading rooms", error);
        setIsLoadingRooms(false);
        return;
      }
      if (!data || cancelled) {
        setIsLoadingRooms(false);
        return;
      }

      setRooms(data as Room[]);

      // Decide which room should be active
      const slugFromUrl = getRoomSlugFromLocation();
      const matchingFromUrl = slugFromUrl
        ? data.find((r) => r.slug === slugFromUrl)
        : null;

      const firstRoom = matchingFromUrl ?? data[0] ?? null;

      setActiveRoomSlug(firstRoom ? firstRoom.slug : undefined);
      setIsLoadingRooms(false);
    }

    loadRooms();

    return () => {
      cancelled = true;
    };
  }, []);

  // Load threads whenever activeRoomSlug changes
  useEffect(() => {
    let cancelled = false;

    async function loadThreads() {
      if (!activeRoomSlug) {
        setThreads([]);
        return;
      }

      setIsLoadingThreads(true);

      try {
        const res = await fetch(`/api/threads?room=${encodeURIComponent(activeRoomSlug)}`, {
          method: "GET",
          headers: { "Accept": "application/json" },
        });

        if (!res.ok) {
          console.error("[home] failed to fetch threads", await res.text());
          if (!cancelled) {
            setThreads([]);
          }
          setIsLoadingThreads(false);
          return;
        }

        const json = await res.json();
        if (!cancelled) {
          setThreads((json.threads ?? []) as Thread[]);
        }
      } catch (err) {
        console.error("[home] error fetching threads", err);
        if (!cancelled) {
          setThreads([]);
        }
      } finally {
        if (!cancelled) {
          setIsLoadingThreads(false);
        }
      }
    }

    loadThreads();

    return () => {
      cancelled = true;
    };
  }, [activeRoomSlug]);

  const activeRoom = rooms.find((r) => r.slug === activeRoomSlug) ?? null;

  return (
    <main className="min-h-screen bg-[#f5eedf] text-neutral-900">
      <div className="max-w-xl mx-auto px-4 pb-6 pt-4">
        {/* Header */}
        <header className="mb-4 flex items-center justify-between gap-2">
          <div>
            <h1 className="text-lg font-semibold tracking-wide">
              Today in Nouk
            </h1>
            <p className="text-xs text-neutral-600">
              A small corner of the internet for quick, passing conversations.
            </p>
          </div>
          <Link
            href="/share"
            className="rounded-full bg-neutral-900 text-[#f5eedf] px-3 py-1.5 text-xs font-medium shadow-sm hover:bg-black/90"
          >
            New post
          </Link>
        </header>

        {/* Category row */}
        <section className="mb-4">
          {isLoadingRooms ? (
            <div className="h-8 rounded-full bg-neutral-200 animate-pulse" />
          ) : rooms.length === 0 ? (
            <p className="text-sm text-neutral-600">
              No categories yet. Add some rooms in your database.
            </p>
          ) : (
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
              {rooms.map((room) => {
                const isActive = room.slug === activeRoomSlug;
                return (
                  <button
                    key={room.id}
                    type="button"
                    onClick={() => {
                      setActiveRoomSlug(room.slug);
                      // update URL query (no reload)
                      if (typeof window !== "undefined") {
                        const url = new URL(window.location.href);
                        url.searchParams.set("room", room.slug);
                        window.history.replaceState(null, "", url.toString());
                      }
                    }}
                    className={[
                      "shrink-0 rounded-full px-3 py-1.5 text-xs font-medium border transition-colors",
                      isActive
                        ? "bg-neutral-900 text-[#f5eedf] border-neutral-900"
                        : "bg-white text-neutral-800 border-neutral-300 hover:bg-neutral-100",
                    ].join(" ")}
                  >
                    {room.name}
                  </button>
                );
              })}
            </div>
          )}
        </section>

        {/* Thread list */}
        <section className="space-y-3">
          {activeRoom && (
            <div className="flex items-center justify-between text-xs text-neutral-600">
              <span>
                Viewing posts in <span className="font-semibold">{activeRoom.name}</span>
              </span>
              <button
                type="button"
                onClick={() => {
                  // reload threads
                  setActiveRoomSlug((slug) => (slug ? slug : activeRoom.slug));
                }}
                className="underline underline-offset-2"
              >
                Refresh
              </button>
            </div>
          )}

          {isLoadingThreads ? (
            <div className="space-y-2 mt-2">
              <div className="h-16 rounded-2xl bg-neutral-200 animate-pulse" />
              <div className="h-16 rounded-2xl bg-neutral-200 animate-pulse" />
            </div>
          ) : threads.length === 0 ? (
            <div className="mt-6 text-center text-sm text-neutral-600">
              <p>No posts yet in this category.</p>
              <p className="mt-1">
                Be the first to{" "}
                <Link href="/share" className="underline font-medium">
                  start something
                </Link>
                .
              </p>
            </div>
          ) : (
            <div className="mt-2 space-y-2">
              {threads.map((thread) => {
                const title =
                  thread.title && thread.title.trim().length > 0
                    ? thread.title.trim()
                    : "Untitled post";

                const preview =
                  thread.body && thread.body.trim().length > 0
                    ? thread.body.trim()
                    : thread.link_url
                    ? thread.link_url
                    : "";

                const roomName =
                  thread.rooms?.name ||
                  activeRoom?.name ||
                  "Somewhere in the house";

                return (
                  <Link
                    key={thread.id}
                    href={`/thread/${thread.id}`}
                    className="block rounded-2xl bg-white border border-neutral-200 px-3 py-3 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="text-xs text-neutral-500">
                        {roomName}
                      </div>
                      <div className="text-xs text-neutral-500">
                        {formatTimeAgo(thread.created_at)}
                      </div>
                    </div>
                    <div className="text-sm font-medium text-neutral-900 line-clamp-2">
                      {title}
                    </div>
                    {preview && (
                      <div className="mt-1 text-xs text-neutral-700 line-clamp-2">
                        {preview}
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          )}
        </section>

        {/* Bottom spacer so it doesn’t hit device nav bar */}
        <div className="h-8" />
      </div>
    </main>
  );
}
