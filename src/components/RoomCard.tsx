// src/components/RoomCard.tsx
import Link from 'next/link';

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
    <Link href={href} className="block">
      <div className="card px-5 py-4 rounded-2xl shadow-card border border-[color:var(--ring)] bg-card">
        <div className="card-row">
          <div className="size-11 rounded-2xl bg-[color:var(--bg)]/70 flex items-center justify-center border border-[color:var(--ring)]">
            <Icon className="text-ink/80" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[28px] leading-tight font-[var(--font-serif)]">{title}</div>
            <div className="subtle text-base mt-1 truncate">{subtitle}</div>
          </div>
          <div className="text-ink/30">›</div>
        </div>
      </div>
    </Link>
  );
}
