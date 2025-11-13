'use client';

import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  const rooms = [
    { slug: 'living-room', name: 'Living Room', description: 'General chat, low stress' },
    { slug: 'kitchen', name: 'Kitchen', description: 'Recipes, cooking, food talk' },
    { slug: 'cinema', name: 'Cinema', description: 'Movies & TV' },
    { slug: 'library', name: 'Library', description: 'Books, projects, ideas' },
    { slug: 'arcade', name: 'Arcade', description: 'Games, music, hobbies' },
    { slug: 'lounge', name: 'Lounge', description: 'Sports & socializing' },
  ];

  return (
    <main className="min-h-screen bg-[#f3efe7] text-stone-900 flex flex-col justify-between">
      <div className="flex flex-col items-center px-6 pt-10">
        <h1 className="text-3xl font-serif mb-1">Nouk</h1>
        <p className="text-stone-500 text-sm mb-8">
          Cozy, low-stress conversations — take a breath.
        </p>

        <div className="w-full max-w-md space-y-4">
          {rooms.map((room) => (
            <Link
              key={room.slug}
              href={`/room/${room.slug}`}
              className="block p-4 rounded-2xl border border-stone-200 bg-white/70 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-lg font-medium">{room.name}</div>
              <div className="text-sm text-stone-500">{room.description}</div>
            </Link>
          ))}
        </div>
      </div>

      <div className="sticky bottom-0 w-full bg-[#f3efe7]/90 backdrop-blur-sm border-t border-stone-200 py-3">
        <div className="max-w-md mx-auto px-6">
          <Link
            href="/compose"
            className="w-full block text-center bg-stone-800 text-stone-100 font-medium py-3 rounded-xl hover:bg-stone-700 transition"
          >
            Share a thought
          </Link>
        </div>
      </div>
    </main>
  );
}
