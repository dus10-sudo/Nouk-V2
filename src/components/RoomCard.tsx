// src/components/RoomCard.tsx
import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import { IconChevron } from "@/components/Icons";

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

type Props = {
  href: string;
  Icon: IconType;
  title: string;
  subtitle: string;
};

export default function RoomCard({ href, Icon, title, subtitle }: Props) {
  return (
    <Link href={href} className="block">
      <article className="flex items-center justify-between gap-4 rounded-2xl border border-ring bg-card px-4 py-3 shadow-soft hover:shadow-card transition-shadow">
        <div className="flex items-center gap-4">
          {/* Icon pill */}
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--paper)] text-ink shadow-card/40">
            <Icon className="w-5 h-5" />
          </div>

          <div>
            <div className="room-title font-medium text-ink">
              {title}
            </div>
            <div className="room-sub text-[13px]">
              {subtitle}
            </div>
          </div>
        </div>

        {/* Chevron */}
        <div className="text-ink/30">
          <IconChevron className="w-4 h-4" />
        </div>
      </article>
    </Link>
  );
}
