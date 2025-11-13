// src/components/RoomCard.tsx
// Single room card, styled to match the Nouk mock

import Link from "next/link";
import type { ComponentType, SVGProps } from "react";

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

type RoomCardProps = {
  href: string;
  Icon: IconType;
  title: string;
  subtitle: string;
  iconClassName?: string; // optional accent per room
};

export default function RoomCard({
  href,
  Icon,
  title,
  subtitle,
  iconClassName,
}: RoomCardProps) {
  const iconClasses = `w-7 h-7 ${iconClassName ?? ""}`;

  return (
    <Link
      href={href}
      className="block rounded-[28px] bg-[var(--card)] shadow-[0_14px_40px_rgba(0,0,0,0.06)] px-5 py-4 mb-3 border border-[rgba(0,0,0,0.04)] active:scale-[0.99] transition-transform"
    >
      <div className="flex items-center gap-4">
        {/* circular icon chip */}
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(255,255,255,0.9)] shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
          <Icon className={iconClasses} />
        </div>

        {/* text */}
        <div className="flex-1 min-w-0">
          <div className="font-serif text-[19px] leading-tight tracking-[-0.01em] text-[rgba(31,24,15,0.96)]">
            {title}
          </div>
          <div className="mt-1 text-[13px] text-[rgba(80,64,40,0.75)] truncate">
            {subtitle}
          </div>
        </div>

        {/* chevron */}
        <div
          aria-hidden
          className="ml-2 text-[rgba(80,64,40,0.6)] text-[18px]"
        >
          ›
        </div>
      </div>
    </Link>
  );
}
