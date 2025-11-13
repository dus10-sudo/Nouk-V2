// src/app/page.tsx
import Link from "next/link";

// If you already export listRooms + Room from your supabase lib, use them:
import { listRooms, type Room } from "@/lib/supabase";

// Fallback in case you don’t export types; remove if you already have Room.
type FallbackRoom = {
  id: string;
  slug: string;
  name: string;        // we use `name` (your DB column), not `title`
  description?: string | null;
};

function RoomIcon({ slug }: { slug: string }) {
  // Neutral, single-tone icons like the mock
  const base = "inline-block w-[26px] h-[26px] text-[#5B524A]";
  switch (slug) {
    case "library":
      return (
        <span aria-hidden className={`${base} icon-mask-books`} />
      );
    case "kitchen":
      return <span aria-hidden className={`${base} icon-mask-pot`} />;
    case "theater":
    case "cinema":
      return <span aria-hidden className={`${base} icon-mask-ticket`} />;
    case "game-room":
    case "arcade":
      return <span aria-hidden className={`${base} icon-mask-gamepad`} />;
    case "garage":
      return <span aria-hidden className={`${base} icon-mask-toolbox`} />;
    case "study":
      return <span aria-hidden className={`${base} icon-mask-desk`} />;
    default:
      return <span aria-hidden className={`${base} icon-mask-dot`} />;
  }
}

function Card({
  href,
  title,
  subtitle,
  iconSlug,
}: {
  href: string;
  title: string;
  subtitle?: string | null;
  iconSlug: string;
}) {
  return (
    <Link
      href={href}
      className="
        block rounded-[16px]
        bg-[#F6EFE4]
        px-[18px] py-[16px]
        shadow-[0_1px_0_#fff_inset,0_1px_2px_rgba(0,0,0,0.06)]
        ring-1 ring-[rgba(59,52,46,0.06)]
      "
    >
      <div className="flex items-center gap-[14px]">
        <div
          className="
            flex items-center justify-center
            rounded-[12px]
            bg-[#EFE6D9]
            w-[44px] h-[44px]
            ring-1 ring-[rgba(59,52,46,0.05)]
          "
        >
          <RoomIcon slug={iconSlug} />
        </div>

        <div className="min-w-0">
          <div className="font-serif text-[24px] leading-[28px] text-[#3B342E]">
            {title}
          </div>
          {subtitle ? (
            <div className="text-[16px] leading-[22px] text-[#6F665E]">
              {subtitle}
            </div>
          ) : null}
        </div>

        <div className="ml-auto text-[#9B938B]">›</div>
      </div>
    </Link>
  );
}

export default async function Page() {
  // Pull rooms from your DB; if you don’t have listRooms exported, replace with your current fetch.
  let rooms: (Room | FallbackRoom)[] = [];
  try {
    // @ts-ignore – tolerate either return shape
    const { data } = await listRooms();
    rooms = data ?? [];
  } catch {
    rooms = [];
  }

  // Sort & map to desired order/labels to match the mock exactly
  const ORDER = ["library", "kitchen", "theater", "cinema", "game-room", "arcade", "garage", "study"];
  const labelFor = (slug: string) =>
    slug === "cinema" ? "Theater"
    : slug === "arcade" ? "Game Room"
    : slug
        .split("-")
        .map(s => s.charAt(0).toUpperCase() + s.slice(1))
        .join(" ");

  const rows = rooms
    .slice()
    .sort((a, b) => ORDER.indexOf(a.slug) - ORDER.indexOf(b.slug))
    .filter(r => ORDER.includes(r.slug))
    .map(r => ({
      slug: r.slug,
      title: labelFor(r.slug),
      subtitle: r.description ?? "",
    }));

  return (
    <main className="bg-[#EDE4D4] min-h-dvh">
      <div className="mx-auto max-w-[680px] px-[20px] pt-[36px] pb-[28px]">
        {/* Title */}
        <h1
          className="
            text-center font-serif text-[48px] leading-[50px]
            text-[#3B342E] tracking-[-0.01em]
            mb-[18px]
          "
        >
          Nouk
        </h1>

        {/* Stack */}
        <div className="flex flex-col gap-[12px]">
          {rows.map(r => (
            <Card
              key={r.slug}
              href={`/room/${r.slug}`}
              title={r.title}
              subtitle={r.subtitle}
              iconSlug={r.slug}
            />
          ))}
        </div>

        {/* Button */}
        <div className="pt-[20px] pb-[8px]">
          <Link
            href="/new"
            className="
              block w-full text-center
              rounded-[16px]
              bg-[#C77955] text-white
              text-[16px] leading-[20px] font-medium
              py-[16px]
              shadow-[0_1px_0_#fff_inset,0_1px_2px_rgba(0,0,0,0.06)]
              ring-1 ring-[rgba(59,52,46,0.06)]
            "
          >
            Share a Thought
          </Link>
        </div>
      </div>
    </main>
  );
}
