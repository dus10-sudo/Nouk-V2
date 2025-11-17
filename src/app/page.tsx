// src/app/page.tsx
import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/house-landing.jpg"
          alt="Nouk Forest Cottage"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* subtle dark overlay so text & button pop */}
        <div className="absolute inset-0 bg-black/35" />
      </div>

      {/* Content wrapper */}
      <div className="flex min-h-screen flex-col items-center justify-between px-6 pt-[10vh] pb-[12vh]">
        {/* Title */}
        <div className="select-none text-center">
          <h1
            className="
              cinzel-title
              text-[42px]
              tracking-[0.35em]
              text-white
              drop-shadow-[0_0_18px_rgba(255,255,255,0.9)]
            "
          >
            N O U K
          </h1>
        </div>

        {/* Button */}
        <Link
          href="/home"
          className="
            group
            relative
            inline-flex
            items-center
            justify-center
            px-9
            py-3
            rounded-2xl
            border border-white/80
            bg-black/40
            text-white
            text-base
            font-medium
            tracking-wide
            shadow-[0_0_20px_rgba(255,255,255,0.35)]
            hover:shadow-[0_0_40px_rgba(255,255,255,0.7)]
            transition-all duration-300
            backdrop-blur-sm
          "
        >
          {/* glow aura */}
          <span
            className="
              pointer-events-none
              absolute
              -inset-1.5
              rounded-[1.4rem]
              bg-white/0
              blur-2xl
              opacity-60
              group-hover:bg-white/20
              group-hover:opacity-100
              group-hover:animate-[pulse_1.8s_ease-out_infinite]
            "
          />
          <span className="relative z-10">Enter the House</span>
        </Link>
      </div>
    </main>
  );
}
