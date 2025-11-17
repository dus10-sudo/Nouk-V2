import Image from "next/image";
import Link from "next/link";
import localFont from "next/font/local";

// Load Cinzel font
const cinzel = localFont({
  src: "../fonts/Cinzel-Regular.ttf",
  variable: "--font-cinzel",
});

export default function LandingPage() {
  return (
    <main
      className={`${cinzel.variable} font-sans relative w-full h-screen overflow-hidden`}
      style={{
        WebkitTapHighlightColor: "transparent",
      }}
    >
      {/* Background Image */}
      <Image
        src="/home-bg.jpg"
        alt="Nouk Forest Cottage"
        priority
        fill
        className="object-cover brightness-[0.85]"
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-black/10" />

      {/* Title */}
      <h1
        className="
          absolute 
          top-[16%] 
          left-1/2 
          -translate-x-1/2 
          text-white 
          text-6xl 
          font-bold 
          tracking-[0.5em] 
          drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]
        "
        style={{ fontFamily: "var(--font-cinzel)" }}
      >
        N O U K
      </h1>

      {/* Enter Button */}
      <Link
        href="/home"
        className="
          absolute 
          left-1/2 
          -translate-x-1/2 
          bottom-[20%]   /* This keeps it above the safe area */
          px-10 
          py-5 
          text-xl 
          rounded-xl 
          text-white
          font-semibold
          bg-black/40 
          border 
          border-white/70
          shadow-[0_0_25px_rgba(255,255,255,0.8)]
          backdrop-blur-md
          transition-all
          duration-300
          hover:shadow-[0_0_40px_rgba(255,255,255,1)]
        "
        style={{
          paddingBottom: "calc(1rem + env(safe-area-inset-bottom))",
        }}
      >
        Enter the House
      </Link>
    </main>
  );
}
