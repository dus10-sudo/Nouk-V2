"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function BottomNav() {
  const pathname = usePathname();

  // Hide bottom nav on the landing page (`/`)
  if (pathname === "/") return null;

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* Bottom Navigation Bar */}
      <nav
        className="
          fixed bottom-0 left-0 right-0 z-50
          flex items-center justify-between
          px-5 py-3
          bg-white/90 backdrop-blur-md
          border-t border-black/5
        "
      >
        {/* Brand */}
        <span className="text-[15px] tracking-[0.25em] font-semibold text-[#5C4631]">
          N o u k
        </span>

        {/* Share Button */}
        <button
          onClick={() => setShowModal(true)}
          className="
            flex-1 mx-4
            rounded-full
            bg-[#E57A2F]
            py-3
            text-white font-semibold
            shadow-md shadow-black/20
            text-center
          "
        >
          Share a Thought
        </button>

        {/* Sprout FAB */}
        <button
          onClick={() => setShowModal(true)}
          className="
            h-12 w-12 rounded-full
            shadow-md shadow-black/20
            bg-white
            flex items-center justify-center
          "
        >
          <Image
            src="/sprout.png"
            alt="Sprout"
            width={28}
            height={28}
            className="opacity-90"
          />
        </button>
      </nav>

      {/* Share Modal */}
      {showModal && (
        <div
          className="
            fixed inset-0 z-[60]
            bg-black/50 backdrop-blur-sm
            flex items-end
          "
          onClick={() => setShowModal(false)}
        >
          <div
            className="
              w-full rounded-t-3xl p-6
              bg-[#F4E8D8]
              shadow-xl
            "
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-1.5 bg-black/20 rounded-full mx-auto mb-4"></div>

            <h3 className="text-xl font-semibold text-[#5C4631] text-center">
              Share a thought
            </h3>
            <p className="text-[#6B5A45] text-center mt-1 mb-4">
              Leave something small. Threads fade after a little while.
            </p>

            <textarea
              placeholder="What’s on your mind?"
              className="
                w-full h-28 p-3 rounded-xl
                border border-black/10
                bg-white/80
                resize-none
                text-[#4B3A2B]
              "
            />

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="
                  flex-1 rounded-xl py-3
                  bg-white
                  text-[#5C4631] font-semibold
                  border border-black/10
                "
              >
                Close
              </button>

              <button
                disabled
                className="
                  flex-1 rounded-xl py-3
                  bg-[#E57A2F] text-white font-semibold
                  opacity-60
                "
              >
                Post (soon)
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
