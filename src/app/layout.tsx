import './globals.css';
import type { Metadata } from 'next';
import { DM_Serif_Display, Inter } from 'next/font/google';

const serif = DM_Serif_Display({ subsets: ['latin'], weight: '400', variable: '--font-serif' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Nouk',
  description: 'Cozy, low-stress conversations.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-bg text-ink">
        {children}
      </body>
    </html>
  );
}
