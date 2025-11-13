// src/components/RoomCard.tsx
"use client";

import Link from "next/link";
import type { ComponentType } from "react";
import { IconChevron } from "@/components/Icons";

type IconComponent = ComponentType<{ className?: string }>;

type RoomCardProps = {
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
    <Link href={href} className="block">
      <div className="mb-3 flex items-center justify-between rounded-[24px] border border-[var(--card-border)] bg-[var(--card)] px-4 py-4 shadow-[var(--soft)]">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--chip)] shadow-[var(--chip-shadow)]">
            <Icon />
          </div>
          <div>
            <div className="font-serif text-[20px] leading-tight">
              {title}
            </div>
            <div className="text-[14px] text-[var(--muted)]">
              {subtitle}
            </div>
          </div>
        </div>

        <IconChevron className="text-[var(--muted)]" />
      </div>
    </Link>
  );
}
