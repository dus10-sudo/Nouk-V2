// src/app/room/[slug]/page.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  getRoomBySlug,
  listThreads,
  createThread,
  type Room,
  type Thread,
} from "@/lib/supabase";

export default function RoomPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const search = useSearchParams();

  const pendingCreate = useRef(false);
  const titleQP = search.get("title")?.trim() ?? "";
  const linkQP = search.get("link")?.trim() ?? "";

  const [room, setRoom] = useState<Room | null>(null);
  const [threads, setThreads] = useState<Thread[]>([]);
  const [loading, setLoading] = useState(true);

  // Load room + threads
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const r = await getRoomBySlug(slug);
        if (!alive) return;
        setRoom(r);
        if (r) {
          const t = await listThreads(r.id);
          if (!alive) return;
          setThreads(t);
        }
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [slug]);

  // If we came from Share modal with ?title/link, auto-create then redirect
  useEffect(() => {
    if (!room) return;
    const hasCreateParams = titleQP.length > 0 || linkQP.length > 0;
    if (!hasCreateParams || pendingCreate.current) return;

    pendingCreate.current = true;
    (async () => {
      try {
        const id = await createThread(room.slug, titleQP, linkQP || null);
        // Clean URL and go to new thread
        router.replace(`/thread/${id}`);
      } catch {
        // If creation fails, just remove QPs so we don't loop
        const clean = new URL(window.location.href);
        clean.searchParams.delete("title");
        clean.searchParams.delete("link");
        router.replace(clean.pathname);
        pendingCreate.current = false;
      }
    })();
  }, [room, titleQP, linkQP, router]);

  // header crumbs text
  const crumbs = useMemo(
    () => (room ? `Rooms › ${room.title ?? room.slug}` : "Rooms"),
    [room]
  );

  return (
    <main className="min-h-screen bg-paper text-ink">
      <div className="mx-auto flex min-h-screen max-w-[720px] flex-col px-4 pb-20 pt-6">
        {/* Breadcrumb */}
        <div className="mb-1 text-[13px] text-[var(--muted)]">{crumbs}</div>

        {/* Header */}
        <header className="mb-4 flex items-end justify-between gap-3">
          <div>
            <h1 className="font-serif text-[32px] leading-[1.05] tracking-[-0.02em]">
              {room?.title ?? "…"}
            </h1>
            {room?.description && (
              <p className="mt-1 text-[14px] text-[var(--muted)]">
                {room.description}
              </p>
            )}
          </div>
          <span className="rounded-full border border-[var(--stroke)] bg-[var(--badge)] px-3 py-1 text-[11px] text-[var(--muted)]">
            Threads fade after quiet hours
          </span>
        </header>

        {/* Content */}
        {loading ? (
          <div className="mt-10 text-[var(--muted)]">Loading…</div>
        ) : threads.length === 0 ? (
          <section className="mt-8 rounded-[24px] border border-[var(--stroke)] bg-[var(--card-soft)] p-5 shadow-soft">
            <h2 className="mb-1 font-serif text-[18px]">
              It&apos;s quiet in here.
            </h2>
            <p className="text-[13px] text-[var(--muted)]">
              No Nouks yet in this room. Start one from the{" "}
              <span className="font-medium">Start a Nouk</span> button on the
              home screen and it will appear here as a little stem.
            </p>
          </section>
        ) : (
          <section className="mt-4 space-y-3">
            {threads.map((t) => (
              <Link
                key={t.id}
                href={`/thread/${t.id}`}
                className="block rounded-[24px] border border-[var(--stroke)] bg-[var(--card)] px-4 py-3 shadow-soft transition-shadow hover:shadow-[0_14px_30px_rgba(0,0,0,0.10)]"
              >
                <div className="flex flex-col gap-1">
                  <div className="text-[16px] font-medium leading-snug">
                    {t.title || "Untitled Nouk"}
                  </div>
                  <div className="text-[12px] text-[var(--muted)]">
                    {t.posts_count ?? 0}{" "}
                    {t.posts_count === 1 ? "post" : "posts"} · last activity{" "}
                    {new Date(t.last_activity).toLocaleString()}
                  </div>
                </div>
              </Link>
            ))}
          </section>
        )}
      </div>
    </main>
  );
            }
