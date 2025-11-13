// src/components/RoomCard.tsx
import Link from "next/link";
import type { ComponentType } from "react";

type IconComponent = ComponentType<{ className?: string }>;

type RoomCardProps = {
  href: string;
  Icon: IconComponent;
  title: string;
  subtitle: string;
};

export default function RoomCard({ href, Icon, title, subtitle }: RoomCardProps) {
  return (
    <Link href={href} className="block">
      <div className="flex items-center gap-4 rounded-[24px] bg-[var(--card)] px-4 py-3 shadow-[0_16px_40px_rgba(0,0,0,0.08)] border border-[rgba(0,0,0,0.03)]">
        {/* Icon chip */}
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-[0_8px_28px_rgba(0,0,0,0.08)]">
          <Icon className="h-7 w-7" />
        </div>

        {/* Text */}
        <div className="min-w-0 flex-1">
          <div className="text-[17px] font-semibold leading-snug">
            {title}
          </div>
          <div className="text-[14px] text-[var(--muted)] truncate">
            {subtitle}
          </div>
        </div>

        {/* Simple chevron */}
        <div className="text-[20px] text-[var(--muted)]">
          ›
        </div>
      </div>
    </Link>
  );
}
