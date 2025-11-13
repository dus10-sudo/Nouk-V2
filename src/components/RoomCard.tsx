'use client';

import Link from 'next/link';
import type { ComponentType, SVGProps } from 'react';
import { IconChevron } from '@/components/Icons';

type Props = {
  href: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  subtitle: string;
};

export default function RoomCard({ href, Icon, title, subtitle }: Props) {
  return (
    <Link href={href} className="card card-pad flex items-center gap-4">
      <span className="icon-badge">
        <Icon className="w-6 h-6" aria-hidden />
      </span>

      <div className="flex-1">
        <div className="room-title font-serif">{title}</div>
        <div className="room-sub text-[17px]">{subtitle}</div>
      </div>

      <IconChevron className="chev w-5 h-5" aria-hidden />
    </Link>
  );
}
