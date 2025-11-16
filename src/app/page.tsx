import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen w-full overflow-hidden bg-black">
      <div
        className="relative h-screen w-full bg-cover bg-center"
        style={{ backgroundImage: "url('/house-landing.jpg')" }}
      >
        {/* Soft dark overlay so the title + button pop but the art is still visible */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/20 to-black/40" />

        {/* Centered stack for title + button */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center">
          <div className="flex flex-col items-center gap-8 -translate-y-6">
            {/* Title above the bright part of the moon */}
            <h1 className="text-5xl md:text-6xl font-serif text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.7)]">
              Nouk
            </h1>

            {/* Lantern-gold pill button */}
            <Link
              href="/home"
              className="rounded-full px-10 py-3 text-lg font-medium
                         bg-amber-200/90 text-[#4b300f]
                         shadow-[0_18px_35px_rgba(0,0,0,0.55)]
                         backdrop-blur-sm
                         transition-colors duration-200
                         hover:bg-amber-100/95 active:bg-amber-200"
            >
              Enter the House
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
