import Link from "next/link";
import { ComponentType, SVGProps } from "react";
import { IconChevron } from "./Icons";

type Props = {
  href: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  subtitle: string;
};

export default function RoomCard({ href, Icon, title, subtitle }: Props) {
  return (
    <Link
      href={href}
      className="block rounded-2xl border border-[var(--ring)] bg-[var(--card)] pl-4 pr-3 py-3 shadow-[var(--shadow)]"
    >
      <div className="flex items-center gap-4">
        {/* Icon chip */}
        <div className="grid size-14 place-items-center rounded-full border border-[var(--ring)] bg-white/80 shadow-sm">
          <Icon className="h-6 w-6 text-[var(--ink)]" aria-hidden="true" />
        </div>

        {/* Text */}
        <div className="min-w-0 flex-1">
          <div className="truncate font-serif text-[28px] leading-[1.05] tracking-[-0.01em]">
            {title}
          </div>
          <div className="truncate text-[16px] text-[var(--muted)]">
            {subtitle}
          </div>
        </div>

        {/* Chevron */}
        <IconChevron className="h-5 w-5 text-[var(--muted)]/70" aria-hidden="true" />
      </div>
    </Link>
  );
}
