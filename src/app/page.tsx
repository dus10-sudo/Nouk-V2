import Link from 'next/link';

export default function RoomCard({
  href, Icon, title, subtitle,
}: {
  href: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  subtitle: string;
}) {
  return (
    <Link href={href} className="block">
      <div className="bg-card border border-ring rounded-2xl px-4 py-3 shadow-card">
        <div className="flex items-center gap-4">
          <div className="size-10 rounded-2xl bg-[color:var(--paper)]/70 border border-ring flex items-center justify-center">
            <Icon className="w-5 h-5 text-ink/80" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="room-title font-[var(--font-serif)]">{title}</div>
            <div className="room-sub text-[15px] mt-[2px] truncate">{subtitle}</div>
          </div>

          <div className="text-ink/30">›</div>
        </div>
      </div>
    </Link>
  );
}
