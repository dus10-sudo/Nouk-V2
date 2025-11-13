// src/components/ThreadCard.tsx
import Link from 'next/link';

export default function ThreadCard({
  threadId,
  title,
  lastActivity,
  posts,
}: {
  threadId: string;
  title: string;
  lastActivity: string;
  posts: number;
}) {
  const since = new Date(lastActivity).toLocaleString();
  return (
    <Link
      href={`/t/${threadId}`}
      className="block rounded-xl border border-stone-200 dark:border-stone-700 p-4 hover:border-stone-400 dark:hover:border-stone-500 transition"
    >
      <div className="text-lg text-stone-900 dark:text-stone-100">{title}</div>
      <div className="text-xs text-stone-500 mt-1">{posts} posts • last activity {since}</div>
    </Link>
  );
}
