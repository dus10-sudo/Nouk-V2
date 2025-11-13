// src/components/Icons.tsx

import React from "react";

type IconProps = {
  className?: string;
};

const base =
  "flex items-center justify-center text-[22px] leading-none select-none";

export function IconLibrary({ className = "" }: IconProps) {
  // Books / projects / ideas
  return <span className={`${base} ${className}`}>📚</span>;
}

export function IconKitchen({ className = "" }: IconProps) {
  // Recipes / cooking / food talk
  return <span className={`${base} ${className}`}>🍳</span>;
}

export function IconTheater({ className = "" }: IconProps) {
  // Movies & TV
  return <span className={`${base} ${className}`}>🎬</span>;
}

export function IconGame({ className = "" }: IconProps) {
  // Games, music & hobbies
  return <span className={`${base} ${className}`}>🎮</span>;
}

export function IconGarage({ className = "" }: IconProps) {
  // DIY, tools, builds
  return <span className={`${base} ${className}`}>🧰</span>;
}

export function IconStudy({ className = "" }: IconProps) {
  // Focus, learning, planning
  return <span className={`${base} ${className}`}>🎓</span>;
}
