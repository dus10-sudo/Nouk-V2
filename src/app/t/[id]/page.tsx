// src/app/t/[id]/page.tsx
import Link from "next/link";
import { addReply } from "@/lib/actions";
import { getThreadWithRoom, listReplies } from "@/lib/queries";
import Composer from "@/components/Composer";

type Props = { params: { id: string } };

export default async function ThreadPage({ params: { id } }: Props) {
  const thread = await getThreadWithRoom(id);

  if (!thread) {
    return (
      <main className="min-h-screen bg-paper text-ink">
        <div className="mx-auto max-w-[720px] px-4 pt-8">
          <p className="text-[14px] text-[var(--muted)]">Thread not found.</p>
        </div>
      </main>
    );
  }

  const replies = await listReplies(id);

  const roomHref = thread.room.slug
    ? ({ pathname: `/room/${thread.room.slug}` } as const)
    : ({ pathname: "/" } as const);

  const roomLabel = thread.room.name || thread.room.slug || "Room";

  return (
    <main className="min-h-screen bg-paper text-ink">
      <div className="mx-auto flex min-h-screen max-w-[720px] flex-col px-4 pb-24 pt-6">
        {/* Breadcrumb */}
        <div className="mb-2 text-[13px] text-[var(--muted)]">
          <Link href="/" className="hover:underline">
            Rooms
          </Link>
          {thread.room.slug && (
            <>
              <span aria-hidden> › </span>
              <Link href={roomHref} className="hover:underline">
                {roomLabel}
              </Link>
            </>
          )}
          <span aria-hidden> › </span>
          <span className="text-ink/85">{thread.title}</span>
        </div>

        {/* Header */}
        <header className="mb-4 flex items-start justify-between gap-3">
          <div>
            <h1 className="font-serif text-[26px] leading-[1.1] tracking-[-0.02em]">
              {thread.title}
            </h1>
            <p className="mt-1 text-[13px] text-[var(--muted)]">
              Started in <span className="font-medium">{roomLabel}</span>. New
              replies gently fade after quiet hours.
            </p>
          </div>
          <span className="shrink-0 rounded-full border border-[var(--stroke)] bg-[var(--badge)] px-3 py-1 text-[11px] text-[var(--muted)]">
            Living Nouk
          </span>
        </header>

        {/* Vine layout */}
        <section className="relative mt-4 flex-1">
          {/* central stem */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-[var(--stem)]"
          />

          <ol className="space-y-6">
            {/* Seed node (thread title) */}
            <li className="relative flex justify-center">
              {/* stem node */}
              <span
                aria-hidden
                className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full border border-[var(--stem)] bg-paper shadow-soft"
              />
              <div className="mt-5 max-w-[85%] rounded-[20px] border border-[var(--stroke)] bg-[var(--card)] px-4 py-3 text-[14px] leading-relaxed shadow-soft">
                <div className="text-[13px] font-medium text-[var(--muted)]">
                  Seed
                </div>
                <div className="mt-1 text-[15px] font-semibold text-ink">
                  {thread.title}
                </div>
                <div className="mt-2 text-[12px] text-[var(--muted)]">
                  This Nouk will slowly fade if the conversation goes quiet.
                </div>
              </div>
            </li>

            {/* Replies as alternating bubbles */}
            {replies.map((r, index) => {
              const isLeft = index % 2 === 0;

              return (
                <li
                  key={r.id}
                  className={`relative flex ${
                    isLeft ? "justify-start" : "justify-end"
                  }`}
                >
                  {/* stem node */}
                  <span
                    aria-hidden
                    className="absolute left-1/2 top-4 h-3 w-3 -translate-x-1/2 rounded-full border border-[var(--stem)] bg-paper shadow-soft"
                  />

                  {/* connector from node to bubble */}
                  <span
                    aria-hidden
                    className={`absolute top-5 h-px w-5 bg-[var(--stem)] ${
                      isLeft ? "left-1/2 -translate-x-[2px]" : "right-1/2 translate-x-[2px]"
                    }`}
                  />

                  {/* bubble */}
                  <article
                    className={`relative max-w-[78%] rounded-[20px] border border-[var(--stroke)] bg-[var(--card-soft)] px-4 py-3 text-[14px] leading-relaxed shadow-soft ${
                      isLeft ? "ml-7" : "mr-7"
                    }`}
                  >
                    <div className="whitespace-pre-wrap text-ink">
                      {r.body}
                    </div>
                    <div className="mt-2 text-[11px] text-[var(--muted)]">
                      {new Date(r.created_at).toLocaleString()}
                    </div>
                  </article>
                </li>
              );
            })}

            {replies.length === 0 && (
              <li className="relative flex justify-center pt-4">
                <p className="max-w-[80%] text-center text-[13px] text-[var(--muted)]">
                  It&apos;s just the seed for now. Add a reply below to let this
                  Nouk grow.
                </p>
              </li>
            )}
          </ol>
        </section>

        {/* Composer */}
        <section className="mt-8 rounded-[24px] border border-[var(--stroke)] bg-[var(--card)] p-4 shadow-soft">
          <Composer
            action={async (text: string) => {
              "use server";
              await addReply(id, text);
            }}
          />
        </section>
      </div>
    </main>
  );
}
