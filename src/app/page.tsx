import Image from "next/image";
import Link from "next/link";
import localFont from "next/font/local";

const cinzel = localFont({
  src: "./fonts/Cinzel-Regular.ttf",
  variable: "--font-cinzel",
});

export default function LandingPage() {
  return (
    <main
      className={`
        ${cinzel.variable}
        relative w-full h-screen overflow-hidden 
        flex items-center justify-center
      `}
    >

      {/* Background Image */}
      <Image
        src="/home-bg.jpg"
        alt="Nouk Cottage"
        fill
        priority
        className="object-cover absolute inset-0 -z-10 brightness-[0.85]"
      />

      {/* Top Title */}
      <h1
        className="
          absolute top-[15vh] left-1/2 -translate-x-1/2
          text-white text-6xl tracking-widest
          drop-shadow-[0_0_25px_rgba(255,255,255,0.9)]
        "
        style={{ fontFamily: "var(--font-cinzel)" }}
      >
        NOUK
      </h1>

      {/* Enter Button */}
      <Link
        href="/home"
        className="
          absolute bottom-[15vh] left-1/2 -translate-x-1/2
          px-10 py-4 
          bg-black/40 border border-white/60 backdrop-blur-md
          rounded-2xl text-white text-xl font-semibold
          shadow-[0_0_25px_rgba(255,255,255,0.8)]
          transition-all duration-300
          hover:shadow-[0_0_40px_rgba(255,255,255,1)]
        "
      >
        Enter the House
      </Link>

    </main>
  );
}
