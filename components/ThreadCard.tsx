// src/components/ThreadCard.tsx
import Link from "next/link";
import type { Thread } from "@/lib/supabase";

export default function ThreadCard({ thread }: { thread: Thread }) {
  const expires = new Date(thread.expires_at).getTime();
  const minsLeft = Math.max(0, Math.round((expires - Date.now()) / 60000));
  const nearEnd = minsLeft <= 30;

  return (
    <Link
      href={`/t/${thread.id}`}
      className={`block rounded-2xl border bg-card p-4 shadow-sm transition hover:shadow-md ${
        nearEnd ? "ring-1 ring-orange-300 animate-[pulse_2.5s_ease-in-out_infinite]" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-medium">{thread.title}</h3>
        <span className="text-xs text-muted-foreground">
          {minsLeft}m left
        </span>
      </div>
      {thread.link_url && (
        <p className="mt-1 truncate text-sm text-muted-foreground">
          {thread.link_url}
        </p>
      )}
      {thread.message_count != null && (
        <p className="mt-2 text-xs text-muted-foreground">
          {thread.message_count} replies
        </p>
      )}
    </Link>
  );
}
