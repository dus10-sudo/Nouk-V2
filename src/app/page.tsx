import Image from 'next/image';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/house-landing.jpg"
          alt="A cozy little house in the woods lit by lanterns under a full moon"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Darken / vignette overlay for readable text */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,0,0,0.45),_transparent_55%),linear-gradient(to_bottom,rgba(0,0,0,0.4),rgba(0,0,0,0.7))]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col justify-between px-6 pb-10 pt-20 text-center text-white">
        {/* Top spacer (so title isn’t jammed at the very top) */}
        <div />

        {/* Title + tagline */}
        <section>
          <h1 className="text-4xl font-semibold tracking-[0.16em] uppercase">
            nouk.space
          </h1>
          <p className="mt-4 mx-auto max-w-md text-base leading-relaxed opacity-90">
            A quiet little house for short-lived threads. Share something small,
            let it breathe, and let it fade.
          </p>
        </section>

        {/* Enter button near bottom */}
        <section className="mb-2">
          <Link
            href="/home"
            className="inline-flex w-full max-w-xs items-center justify-center rounded-full bg-[#39D5FF] px-6 py-3 text-base font-semibold text-[#043045] shadow-[0_14px_30px_rgba(0,0,0,0.45)] mx-auto"
          >
            Enter the House
          </Link>
        </section>
      </div>
    </main>
  );
}
