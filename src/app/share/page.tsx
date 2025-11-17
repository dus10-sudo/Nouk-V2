// src/app/share/page.tsx
import SharePageClient from './SharePageClient';

type SharePageProps = {
  searchParams?: { room?: string };
};

export default function SharePage({ searchParams }: SharePageProps) {
  const initialRoomSlug =
    typeof searchParams?.room === 'string'
      ? searchParams.room
      : undefined;

  return <SharePageClient initialRoomSlug={initialRoomSlug} />;
}
