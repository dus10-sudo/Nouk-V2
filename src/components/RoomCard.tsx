import Link from "next/link";
import { IconChevron } from "./Icons";

export default function RoomCard({
  href,
  Icon,
  title,
  subtitle,
}: {
  href: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  subtitle: string;
}) {
  return (
    <Link
      href={href}
      className="block rounded-nouk bg-nouk-card border border-nouk-edge shadow-nouk px-4 py-4 sm:px-5 sm:py-5"
    >
      <div className="flex items-center gap-4">
        <div className="shrink-0 rounded-full bg-white/60 border border-nouk-edge w-14 h-14 grid place-items-center">
          <Icon className="w-7 h-7 text-nouk-ink" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-display text-[26px] leading-7 tracking-[-0.01em] text-nouk-ink">
            {title}
          </div>
          <div className="text-[16px] leading-6 text-nouk-mute">
            {subtitle}
          </div>
        </div>
        <IconChevron className="w-5 h-5 text-nouk-mute/70" />
      </div>
    </Link>
  );
}
