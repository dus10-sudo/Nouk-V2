import Link from "next/link";

type IconType = (props: { className?: string }) => JSX.Element;

type RoomCardProps = {
  href: string;
  Icon: IconType;
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
    <Link
      href={href}
      className="block rounded-[24px] bg-[var(--card)] border border-[var(--stroke)] shadow-soft px-4 py-3"
    >
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--badge)]">
          <Icon className="h-6 w-6 text-[var(--ink)]" />
        </div>

        <div className="flex-1">
          <div className="room-title font-serif">{title}</div>
          <div className="mt-0.5 text-[13px] text-[var(--muted)]">
            {subtitle}
          </div>
        </div>
      </div>
    </Link>
  );
}
