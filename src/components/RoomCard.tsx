"use client";

import Link from "next/link";
import {
  IconLibrary,
  IconKitchen,
  IconTheater,
  IconGame,
  IconGarage,
  IconStudy,
  IconChevron,
} from "@/components/Icons";

type RoomCardProps = {
  href: string;
  icon: string; // string name instead of function
  title: string;
  subtitle: string;
};

// Icon lookup to keep everything serializable
const icons = {
  library: IconLibrary,
  kitchen: IconKitchen,
  theater: IconTheater,
  game: IconGame,
  garage: IconGarage,
  study: IconStudy,
} as const;

export default function RoomCard({ href, icon, title, subtitle }: RoomCardProps) {
  const IconComponent = icons[icon as keyof typeof icons];

  return (
    <Link
      href={href}
      className="
        flex items-center justify-between 
        w-full rounded-3xl px-6 py-5
        bg-[var(--card-bg)] 
        shadow-sm 
        border border-[var(--card-border)] 
        hover:bg-[var(--card-hover)] 
        active:scale-[0.99] 
        transition-all
      "
    >
      <div className="flex items-center gap-4">
        {/* Icon bubble */}
        <div
          className="
            h-12 w-12 rounded-full 
            bg-white/70 
            flex items-center justify-center 
            shadow-sm
          "
        >
          {IconComponent && (
            <IconComponent className="h-6 w-6 text-[var(--icon)] stroke-[2.2]" />
          )}
        </div>

        {/* Label text */}
        <div className="flex flex-col">
          <span className="text-lg font-semibold text-[var(--text)]">{title}</span>
          <span className="text-sm text-[var(--subtext)]">{subtitle}</span>
        </div>
      </div>

      {/* Chevron */}
      <IconChevron className="h-5 w-5 text-[var(--chevron)] stroke-[2.2]" />
    </Link>
  );
}
