"use client";

import Link from "next/link";
import { Flame, Gem, Heart } from "lucide-react";
import { useStore } from "@/lib/store";

const LEVEL_LABEL: Record<string, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

export function TopBar() {
  const hydrated = useStore((s) => s.hydrated);
  const streak = useStore((s) => s.streak);
  const gems = useStore((s) => s.gems);
  const hearts = useStore((s) => s.hearts);
  const level = useStore((s) => s.level);

  return (
    <header className="sticky top-0 z-30 border-b border-ink-line bg-ink/90 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🦜</span>
          <span className="font-display text-xl font-900 tracking-tight">
            Slang<span className="text-brand-400">y</span>
          </span>
        </Link>

        <div className="flex items-center gap-3 text-sm font-extrabold">
          <span className="chip bg-emerald-500/10 text-emerald-200" title="Your level">
            {LEVEL_LABEL[level]}
          </span>
          <span className="chip bg-orange-500/10 text-orange-300" title="Day streak">
            <Flame size={16} className="fill-orange-400 text-orange-400" />
            {hydrated ? streak : "–"}
          </span>
          <span className="chip bg-sky-500/10 text-sky-300" title="Gems">
            <Gem size={16} className="fill-sky-400 text-sky-400" />
            {hydrated ? gems : "–"}
          </span>
          <span className="chip bg-rose-500/10 text-rose-300" title="Hearts">
            <Heart size={16} className="fill-rose-400 text-rose-400" />
            {hydrated ? hearts : "–"}
          </span>
        </div>
      </div>
    </header>
  );
}
