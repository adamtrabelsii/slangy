"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import type { Level } from "@/lib/types";

const LEVELS: {
  id: Level;
  title: string;
  desc: string;
  emoji: string;
  accent: string;
}[] = [
  {
    id: "beginner",
    title: "Beginner",
    desc: "Empezar de cero · greetings & basics",
    emoji: "🌱",
    accent: "#FF6B5B",
  },
  {
    id: "intermediate",
    title: "Intermediate",
    desc: "Hold a conversation · past & future",
    emoji: "🚀",
    accent: "#7C3AED",
  },
  {
    id: "advanced",
    title: "Advanced",
    desc: "Unlocks slang & idioms — how locals talk",
    emoji: "🔥",
    accent: "#7C3AED",
  },
];

const GOALS = [
  { xp: 10, label: "Casual", sub: "5 min", emoji: "😌" },
  { xp: 30, label: "Regular", sub: "10 min", emoji: "🙂" },
  { xp: 50, label: "Serious", sub: "20 min", emoji: "🤩" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const completeOnboarding = useStore((s) => s.completeOnboarding);
  const [level, setLevel] = useState<Level | null>(null);
  const [goal, setGoal] = useState<number>(30);

  function finish() {
    if (!level) return;
    completeOnboarding(level, goal);
    router.replace("/");
  }

  return (
    <div className="flex min-h-[80vh] flex-col">
      {/* Logo */}
      <div className="mb-6 flex items-center gap-2.5">
        <div
          className="sg-grad flex h-10 w-10 items-center justify-center rounded-xl text-xl"
          style={{ boxShadow: "var(--sg-glow-coral)" }}
        >
          💬
        </div>
        <span className="sg-grad-text font-display text-xl font-900 tracking-tight">Slangy</span>
      </div>

      <p className="tagline">Spanish · the way it's actually spoken</p>
      <h1 className="mt-1 font-display text-3xl font-900 leading-tight text-sg-ink">
        ¿Por dónde
        <br />
        empezamos?
      </h1>
      <p className="mb-5 mt-2 text-sm text-sg-sub">
        Pick your level — we'll set the right pace and unlock content as you climb.
      </p>

      <p className="section-label mb-3">Your level</p>
      <div className="space-y-2.5">
        {LEVELS.map((l) => {
          const selected = level === l.id;
          return (
            <button
              key={l.id}
              onClick={() => setLevel(l.id)}
              className="relative flex w-full items-center gap-3.5 rounded-[20px] border-2 p-4 text-left transition-transform active:scale-[0.99]"
              style={{
                background: selected ? "rgba(124,58,237,0.12)" : "rgba(255,255,255,0.3)",
                borderColor: selected ? l.accent : "rgba(255,255,255,0.5)",
              }}
            >
              <span className="text-3xl">{l.emoji}</span>
              <span className="flex-1">
                <span className="block font-display text-[15px] font-900 text-sg-ink">
                  {l.title}
                </span>
                <span className="block text-xs text-sg-sub">{l.desc}</span>
              </span>
              {selected && (
                <span
                  className="grid h-6 w-6 place-items-center rounded-full text-sm font-extrabold text-white"
                  style={{ background: l.accent }}
                >
                  ✓
                </span>
              )}
            </button>
          );
        })}
      </div>

      <p className="section-label mb-2.5 mt-5">Daily goal</p>
      <div className="flex gap-2">
        {GOALS.map((g) => {
          const selected = goal === g.xp;
          return (
            <button
              key={g.xp}
              onClick={() => setGoal(g.xp)}
              className="flex-1 rounded-2xl border-2 py-3.5 text-center transition-transform active:scale-[0.98]"
              style={{
                background: selected ? "rgba(255,107,91,0.14)" : "rgba(255,255,255,0.3)",
                borderColor: selected ? "#FF6B5B" : "rgba(255,255,255,0.5)",
              }}
            >
              <div className="text-lg">{g.emoji}</div>
              <div className="mt-1 text-[11px] font-extrabold text-sg-ink">{g.label}</div>
              <div className="text-[9.5px] text-sg-sub">{g.sub}</div>
            </button>
          );
        })}
      </div>

      <div className="mt-auto" />
      <button
        className="btn-primary mt-6 h-14 w-full text-base"
        disabled={!level}
        onClick={finish}
      >
        ¡Vamos! <span className="text-lg">→</span>
      </button>
    </div>
  );
}
