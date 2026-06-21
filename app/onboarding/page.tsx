"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import type { Level } from "@/lib/types";

const LEVELS: { id: Level; title: string; desc: string; emoji: string }[] = [
  { id: "beginner", title: "Beginner", desc: "I'm starting from scratch.", emoji: "🌱" },
  {
    id: "intermediate",
    title: "Intermediate",
    desc: "I know the basics and some grammar.",
    emoji: "🌿",
  },
  {
    id: "advanced",
    title: "Advanced",
    desc: "I'm comfortable — unlock slang & idioms.",
    emoji: "🌳",
  },
];

const GOALS = [
  { xp: 10, label: "Casual", desc: "10 XP / day" },
  { xp: 30, label: "Regular", desc: "30 XP / day" },
  { xp: 50, label: "Serious", desc: "50 XP / day" },
  { xp: 80, label: "Intense", desc: "80 XP / day" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const completeOnboarding = useStore((s) => s.completeOnboarding);
  const [step, setStep] = useState(0);
  const [level, setLevel] = useState<Level | null>(null);
  const [goal, setGoal] = useState<number>(30);

  function finish() {
    if (!level) return;
    completeOnboarding(level, goal);
    router.replace("/");
  }

  return (
    <div className="mx-auto max-w-xl space-y-6 py-6">
      <div className="text-center">
        <div className="text-5xl">🦜</div>
        <h1 className="mt-2 font-display text-3xl font-900">
          Welcome to Slang<span className="text-brand-400">y</span>
        </h1>
        <p className="mt-1 text-slate-400">
          Learn Spanish the way people actually speak it.
        </p>
      </div>

      {step === 0 && (
        <div className="space-y-3">
          <h2 className="font-display text-lg font-900">How much Spanish do you know?</h2>
          {LEVELS.map((l) => (
            <button
              key={l.id}
              onClick={() => setLevel(l.id)}
              className={`flex w-full items-center gap-4 rounded-2xl border-2 p-4 text-left transition-colors ${
                level === l.id
                  ? "border-brand-400 bg-brand-500/10"
                  : "border-ink-line bg-ink-soft hover:border-brand-500/50"
              }`}
            >
              <span className="text-3xl">{l.emoji}</span>
              <span className="flex-1">
                <span className="block font-display font-900">{l.title}</span>
                <span className="block text-sm text-slate-400">{l.desc}</span>
              </span>
            </button>
          ))}
          <button
            className="btn-primary w-full"
            disabled={!level}
            onClick={() => setStep(1)}
          >
            Continue
          </button>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-3">
          <h2 className="font-display text-lg font-900">Set a daily goal</h2>
          <div className="grid grid-cols-2 gap-3">
            {GOALS.map((g) => (
              <button
                key={g.xp}
                onClick={() => setGoal(g.xp)}
                className={`rounded-2xl border-2 p-4 text-left transition-colors ${
                  goal === g.xp
                    ? "border-brand-400 bg-brand-500/10"
                    : "border-ink-line bg-ink-soft hover:border-brand-500/50"
                }`}
              >
                <span className="block font-display font-900">{g.label}</span>
                <span className="block text-sm text-slate-400">{g.desc}</span>
              </button>
            ))}
          </div>
          <div className="flex gap-3 pt-2">
            <button className="btn-ghost flex-1" onClick={() => setStep(0)}>
              Back
            </button>
            <button className="btn-primary flex-[2]" onClick={finish}>
              Start learning
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
