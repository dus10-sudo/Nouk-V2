'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { DM_Serif_Display, Nunito } from 'next/font/google';

const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
});

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['600'],
});

export default function LandingPage() {
  const router = useRouter();

  const handleEnter = () => {
    router.push('/home');
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Background image */}
      <Image
        src="/house-landing.jpg"
        alt="A lantern-lit forest path leading to a cozy house under a full moon."
        fill
        priority
        className="object-cover"
      />

      {/* Subtle vignette so text reads well */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-black/60" />

      {/* Content overlay */}
      <div className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-6 pb-16">
        {/* Title – sitting in the upper-middle over the moon */}
        <div className="flex flex-col items-center -mt-16">
          <h1
            className={`${dmSerif.className} text-5xl sm:text-6xl text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.7)]`}
          >
            Nouk
          </h1>
        </div>

        {/* Spacer to keep button lower, nearer the house / path */}
        <div className="h-10" />

        {/* Enter button */}
        <button
          type="button"
          onClick={handleEnter}
          className={`${nunito.className} mt-2 rounded-full bg-[#F4C26B] px-10 py-3 text-lg font-semibold text-[#5b3512] shadow-[0_14px_30px_rgba(0,0,0,0.6)] active:scale-95 transition-transform duration-150`}
        >
          Enter the House
        </button>
      </div>
    </div>
  );
}
