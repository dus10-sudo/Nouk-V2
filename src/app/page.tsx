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
        src="/house-landing.jpg"
        alt="Nouk Forest Cottage"
        fill
        priority
        className="absolute inset-0 -z-10 object-cover brightness-[0.9]"
      />

      {/* Title */}
      <h1
        className="
          absolute top-[15vh] left-1/2 -translate-x-1/2
          text-white text-6xl tracking-[0.4em]
          drop-shadow-[0_0_30px_rgba(255,255,255,0.9)]
          whitespace-nowrap
        "
        style={{ fontFamily: "var(--font-cinzel)" }}
      >
        NOUK
      </h1>

      {/* Button */}
      <Link
        href="/home"
        className="
          absolute bottom-[15vh] left-1/2 -translate-x-1/2
          px-10 py-4 rounded-2xl
          bg-black/40 border border-white/70 backdrop-blur-md
          text-white text-xl font-semibold
          shadow-[0_0_20px_rgba(255,255,255,0.8)]
          hover:shadow-[0_0_35px_rgba(255,255,255,1)]
          transition-all duration-300
        "
      >
        Enter the House
      </Link>

    </main>
  );
}
