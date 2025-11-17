// src/app/share/page.tsx
'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Room = {
  id: string;
  slug: string;
  name: string;
};

function getRoomSlugFromLocation(): string | undefined {
  if (typeof window === "undefined") return undefined;
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("room") || undefined;
  return slug || undefined;
}

export default function SharePage() {
  const router = useRouter();

  const [rooms, setRooms] = useState<Room[]>([]);
  const [roomSlug, setRoomSlug] = useState<string | undefined>(undefined);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [link, setLink] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingRooms, setLoadingRooms] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Load rooms once
  useEffect(() => {
    let cancelled = false;

    async function loadRooms() {
      setLoadingRooms(true);
      const { data, error } = await supabase
        .from("rooms")
        .select("id, slug, name")
        .order("name", { ascending: true });

      if (error) {
        console.error("[share] error loading rooms", error);
        setLoadingRooms(false);
        setErrorMsg("Could not load categories. Please try again later.");
        return;
      }

      if (!data || cancelled) {
        setLoadingRooms(false);
        return;
      }

      setRooms(data as Room[]);

      const slugFromUrl = getRoomSlugFromLocation();
      const matchingFromUrl = slugFromUrl
        ? data.find((r) => r.slug === slugFromUrl)
        : null;

      const firstRoom = matchingFromUrl ?? data[0] ?? null;
      setRoomSlug(firstRoom ? firstRoom.slug : undefined);
      setLoadingRooms(false);
    }

    loadRooms();

    return () => {
      cancelled = true;
    };
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg(null);

    if (!roomSlug) {
      setErrorMsg("Pick a category first.");
      return;
    }

    const trimmedTitle = title.trim();
    const trimmedBody = body.trim();
    const trimmedLink = link.trim();

    if (!trimmedTitle && !trimmedBody && !trimmedLink) {
      setErrorMsg("Say at least a few words or add a link.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/threads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomSlug,
          title: trimmedTitle || null,
          body: trimmedBody || null,
          link_url: trimmedLink || null,
        }),
      });

      if (!res.ok) {
        console.error("[share] failed to create thread", await res.text());
        setErrorMsg("Something went wrong starting your post.");
        setIsSubmitting(false);
        return;
      }

      // Optionally could use the new thread id here if API returns it
      // const json = await res.json();
      // const threadId = json.id;

      router.push(`/home?room=${encodeURIComponent(roomSlug)}`);
    } catch (err) {
      console.error("[share] error submitting post", err);
      setErrorMsg("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f5eedf] text-neutral-900">
      <div className="max-w-xl mx-auto px-4 pb-10 pt-6">
        {/* Header */}
        <header className="mb-6 text-center">
          <h1 className="text-xl font-semibold text-neutral-900">
            Start a Post
          </h1>
          <p className="mt-1 text-xs text-neutral-600">
            Pick a category and leave something small for people to see.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl bg-white shadow-sm border border-neutral-200 px-4 py-5 space-y-4"
        >
          {/* Category */}
          <div>
            <label className="block text-xs font-medium text-neutral-800 mb-1">
              Where should this live?
            </label>
            {loadingRooms ? (
              <div className="h-9 rounded-2xl bg-neutral-200 animate-pulse" />
            ) : rooms.length === 0 ? (
              <p className="text-xs text-neutral-600">
                No categories available. Add rooms in your database.
              </p>
            ) : (
              <select
                value={roomSlug || ""}
                onChange={(e) => setRoomSlug(e.target.value || undefined)}
                className="w-full rounded-2xl border border-neutral-300 bg-neutral-50 px-3 py-2 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
              >
                {rooms.map((room) => (
                  <option key={room.id} value={room.slug}>
                    {room.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-medium text-neutral-800 mb-1">
              Title (optional but helpful)
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give it a tiny headline…"
              className="w-full rounded-2xl border border-neutral-300 bg-neutral-50 px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
            />
          </div>

          {/* Body */}
          <div>
            <label className="block text-xs font-medium text-neutral-800 mb-1">
              What&apos;s on your mind?
            </label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={4}
              placeholder="Say something small to start…"
              className="w-full rounded-2xl border border-neutral-300 bg-neutral-50 px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900 resize-none"
            />
          </div>

          {/* Link */}
          <div>
            <label className="block text-xs font-medium text-neutral-800 mb-1">
              Optional link
            </label>
            <input
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="YouTube, Spotify, article, etc…"
              className="w-full rounded-2xl border border-neutral-300 bg-neutral-50 px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
            />
          </div>

          {/* Error */}
          {errorMsg && (
            <div className="text-xs text-red-600">
              {errorMsg}
            </div>
          )}

          {/* Actions */}
          <div className="pt-2 flex gap-3 justify-end">
            <button
              type="button"
              onClick={() => router.back()}
              className="rounded-2xl border border-neutral-300 px-4 py-2 text-sm text-neutral-800 bg-neutral-50 hover:bg-neutral-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !roomSlug}
              className="rounded-2xl bg-neutral-900 text-[#f5eedf] px-4 py-2 text-sm font-medium shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Posting…" : "Post it"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
