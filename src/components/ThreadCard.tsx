'use client';

import Link from 'next/link';

type MinimalThread = {
  id: string;
  title: string;
  is_hot?: boolean | null;
  expires_at?: string | null;
  messages_count?: number | null;
};

type ThreadCardProps =
  | { threadId: string; thread?: MinimalThread }
  | { threadId?: string; thread: MinimalThread };

export default function ThreadCard(props: ThreadCardProps) {
  const thread: MinimalThread | null =
    'thread' in props && props.thread ? props.thread : null;
  const threadId: string =
    ('threadId' in props && props.threadId) ? props.threadId : (thread?.id ?? '');

  // very defensive fallback
  if (!threadId) return null;

  const title = thread?.title ?? 'Untitled thread';
  const messages = thread?.messages_count ?? undefined;
  const isHot = !!thread?.is_hot;
  const expiresAt = thread?.expires_at ? new Date(thread.expires_at) : null;

  return (
    <Link
      href={`/t/${threadId}`}
      className="block rounded-2xl border border-border/50 bg-card/60 p-4 hover:bg-card transition-colors"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-base font-medium">{title}</h3>
          <div className="mt-1 text-xs text-muted-foreground flex items-center gap-3">
            {typeof messages === 'number' && <span>{messages} msg</span>}
            {expiresAt && (
              <span>
                expires {expiresAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            )}
          </div>
        </div>
        {isHot && (
          <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold bg-orange-500/15 text-orange-600">
            HOT
          </span>
        )}
      </div>
    </Link>
  );
}
