// src/app/t/[id]/page.tsx
import { getThreadById } from "@/lib/threads";
import Link from "next/link";

export default async function ThreadPage({ params }: { params: { id: string } }) {
  const thread = await getThreadById(params.id);

  if (!thread) {
    return (
      <main className="min-h-screen bg-paper text-ink p-6">
        <p>Thread not found.</p>
      </main>
    );
  }

  const roomTitle = thread.room.title;
  const roomSlug = thread.room.slug;

  return (
    <main className="min-h-screen bg-paper text-ink">
      <div className="mx-auto flex min-h-screen max-w-[720px] flex-col px-4 pb-24 pt-6">

        {/* Breadcrumb */}
        <div className="mb-2 text-[13px] text-[var(--muted)]">
          <Link href="/">Rooms</Link> ›{" "}
          <Link href={`/room/${roomSlug}`}>{roomTitle}</Link> › {thread.title}
        </div>

        {/* Thread Title */}
        <h1 className="text-[28px] font-serif mb-4">{thread.title}</h1>

        {/* Seed Card */}
        <div className="rounded-3xl bg-card p-
