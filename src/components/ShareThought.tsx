// src/components/ShareThought.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase, getOrCreateUserToken } from "@/lib/supabase-browser";

type Room = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  is_active: boolean;
};

export default function ShareThought() {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [roomId, setRoomId] = useState<string>("");
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // load active rooms from Supabase
  useEffect(() => {
    let mounted = true;

    supabase
      .from("rooms")
      .select("id,slug,name,description,is_active")
      .eq("is_active", true)
      .order("name", { ascending: true })
      .then(({ data, error }) => {
        if (!mounted) return;
        if (error) {
          setErr(error.message);
        } else if (data) {
          setRooms(data);
          if (data.length && !roomId) {
            setRoomId(data[0].id);
          }
        }
      });

    return () => {
      mounted = false;
    };
  }, [roomId]);

  const selectedRoom = useMemo(
    () => rooms.find((r) => r.id === roomId) ?? null,
    [rooms, roomId]
  );

  const canStart =
    !!selectedRoom && title.trim().length > 0 && !loading && !err;

  async function createThread() {
    if (!selectedRoom || title.trim().length === 0) return;
    setLoading(true);
    setErr(null);

    try {
      const user_token = getOrCreateUserToken();

      const { data, error } = await supabase
        .from("threads")
        .insert({
          room_id: selectedRoom.id,
          title: title.trim(),
          link_url: link.trim() || null,
          user_token,
        })
        .select("id")
        .single();

      if (error) throw error;
      if (!data?.id) throw new Error("No thread id returned");

      // close modal, go straight to the new thread
      setOpen(false);
      setTitle("");
      setLink("");
      router.push(`/t/${data.id}`);
    } catch (e: any) {
      console.error("Error creating thread:", e);
      setErr(e?.message || "Something went wrong starting your Nouk.");
    } finally {
      setLoading(false);
    }
  }

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    if (loading) return;
    setOpen(false);
  };

  return (
    <>
      {/* Bottom pill CTA */}
      {!open && (
        <button
          type="button"
          onClick={handleOpen}
          className="nouk-cta fixed left-1/2 bottom-[max(18px,calc(env(safe-area-inset-bottom)+18px))] z-40 w-[min(640px,92vw)] -translate-x-1/2 px-6 py-4 text-[17px] shadow-soft"
        >
          Share a Thought
        </button>
      )}

      {/* Backdrop + modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-[rgba(0,0,0,0.35)] backdrop-blur-sm"
          onClick={handleClose}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-[min(640px,92vw)] rounded-2xl border border-[var(--ring)] bg-[var(--card)] p-5 shadow-soft animate-modalIn"
          >
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(234,122,59,0.16)]">
                  <span className="text-[18px] text-[var(--accent)]">🌱</span>
                </div>
                <h2 className="text-[22px] font-serif text-[var(--ink)]">
                  Start a New Nouk
                </h2>
                <p className="mt-1 text-[13px] text-[var(--muted)]">
                  Find your cozy corner.
                </p>
              </div>
            </div>

            {/* Step 1 – room picker */}
            <div className="mb-5">
              <p className="mb-2 text-[14px] font-medium text-[var(--ink)]">
                1) Where do you want to post?
              </p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {rooms.map((r) => {
                  const selected = r.id === roomId;
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setRoomId(r.id)}
                      className={`rounded-xl border px-3 py-2 text-left text-[13px] transition ${
                        selected
                          ? "border-[var(--accent)] bg-[rgba(255,250,243,0.96)] shadow-soft"
                          : "border-[var(--ring)] bg-[rgba(255,250,243,0.86)] hover:border-[var(--accent)]"
                      }`}
                    >
                      <div className="font-medium text-[var(--ink)]">
                        {r.name}
                      </div>
                      {r.description && (
                        <div className="text-[11px] text-[var(--muted)]">
                          {r.description}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2 – seed + link */}
            <div className="mb-4">
              <p className="mb-2 text-[14px] font-medium text-[var(--ink)]">
                2) What&apos;s the thread about?{" "}
                <span className="text-[11px] font-normal text-[var(--muted)]">
                  (optional link/topic)
                </span>
              </p>
              <textarea
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                rows={3}
                placeholder="Say something small to start…"
                className="mb-2 w-full resize-none rounded-2xl border border-[var(--ring)] bg-[rgba(250,240,226,0.94)] px-3 py-3 text-[14px] outline-none placeholder:text-[var(--muted)] focus:ring-2 focus:ring-[var(--accent)]"
              />
              <input
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="Optional link (YouTube, TikTok, article…)"
                className="w-full rounded-2xl border border-[var(--ring)] bg-[rgba(250,240,226,0.94)] px-3 py-2 text-[13px] outline-none placeholder:text-[var(--muted)] focus:ring-2 focus:ring-[var(--accent)]"
              />
              <p className="mt-2 text-[11px] text-[var(--muted)]">
                Tiny thoughts or longer ideas are both welcome.
              </p>
              {err && (
                <p className="mt-2 text-[11px] text-red-600">
                  {err}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={handleClose}
                className="rounded-xl border border-[var(--ring)] bg-[var(--card)] px-4 py-2 text-[13px] text-[var(--ink-soft)] active:scale-[0.97]"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={createThread}
                disabled={!canStart}
                className={[
                  "rounded-xl px-4 py-2 text-[13px] font-semibold transition",
                  canStart
                    ? "bg-[var(--accent)] text-white shadow-[0_6px_18px_rgba(234,122,59,0.55)] active:translate-y-[1px] active:shadow-[0_4px_12px_rgba(234,122,59,0.65)]"
                    : "bg-[var(--accent)]/50 text-white/70 opacity-70 cursor-not-allowed",
                ].join(" ")}
              >
                {loading ? "Starting…" : "Start Nouk"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
