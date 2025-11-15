import './globals.css';
import type { Metadata } from 'next';
import BottomNav from '@/components/BottomNav';

export const metadata: Metadata = {
  title: 'Nouk',
  description: 'A quiet place for short-lived thoughts.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[var(--paper)] text-[var(--ink)]">

        {/* Page content */}
        <div className="pb-24"> 
          {children}
        </div>

        {/* Fixed bottom bar */}
        <BottomNav />

      </body>
    </html>
  );
}
