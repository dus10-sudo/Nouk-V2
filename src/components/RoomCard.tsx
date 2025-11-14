// src/components/RoomCard.tsx
import Link from "next/link";
import type { ComponentType } from "react";

type IconComponent = ComponentType<{ className?: string }>;

export type RoomCardProps = {
  href: string;
  Icon: IconComponent;
  title: string;
  subtitle: string;
};

export default function RoomCard({
  href,
  Icon,
  title,
  subtitle,
}: RoomCardProps) {
  return (
    <Link href={href} className="block group">
      <div className="flex items-center gap-4 rounded-[24px] border border-[var(--border-subtle)] bg-[var(--card)] px-4 py-3 shadow-[0_18px_45px_rgba(15,23,42,0.16)] transition-all group-hover:border-[var(--accent-soft)] group-hover:shadow-[0_22px_55px_rgba(15,23,42,0.22)]">
        {/* Icon bubble */}
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--paper)] shadow-[0_10px_25px_rgba(15,23,42,0.12)]">
          <Icon className="h-6 w-6 text-[var(--accent-strong)]" />
        </div>

        {/* Text */}
        <div className="flex flex-1 flex-col">
          <span className="text-[16px] font-semibold text-[var(--ink-strong)]">
            {title}
          </span>
          <span className="text-[13px] text-[var(--muted)]">{subtitle}</span>
        </div>

        {/* Chevron */}
        <div className="text-[20px] text-[var(--muted)] group-hover:text-[var(--accent-strong)]">
          ›
        </div>
      </div>
    </Link>
  );
}
