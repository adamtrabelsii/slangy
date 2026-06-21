"use client";

import { Flame, Gem, Star, Trophy } from "lucide-react";
import { useStore } from "@/lib/store";
import { countDue } from "@/lib/srs";
import { XP_FOR_LEVEL, nextLevel, type Level } from "@/lib/types";

const LEVEL_LABEL: Record<Level, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

export default function ProfilePage() {
  const hydrated = useStore((s) => s.hydrated);
  const xp = useStore((s) => s.xp);
  const streak = useStore((s) => s.streak);
  const level = useStore((s) => s.level);
  const gems = useStore((s) => s.gems);
  const cards = useStore((s) => s.cards);
  const dailyGoalXp = useStore((s) => s.dailyGoalXp);
  const todayXp = useStore((s) => s.todayXp);
  const reset = useStore((s) => s.reset);

  if (!hydrated) return <div className="py-20 text-center text-slate-400">Cargando…</div>;

  const wordsLearned = Object.keys(cards).length;
  const due = countDue(cards);
  const mastered = Object.values(cards).filter((c) => c.interval >= 6).length;

  // Earned-level progress toward the next tier.
  const next = nextLevel(level);
  const floor = XP_FOR_LEVEL[level];
  const target = next ? XP_FOR_LEVEL[next] : floor;
  const levelPct = next ? Math.min(100, Math.round(((xp - floor) / (target - floor)) * 100)) : 100;
  const xpToNext = next ? Math.max(0, target - xp) : 0;

  return (
    <div className="space-y-6">
      <div className="card flex items-center gap-4 p-6">
        <div className="grid h-20 w-20 place-items-center rounded-3xl bg-brand-500/15 text-4xl">
          🦜
        </div>
        <div>
          <h1 className="font-display text-2xl font-900">Tu perfil</h1>
          <p className="text-slate-400">
            {LEVEL_LABEL[level]} · {xp} XP total
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat icon={<Flame className="text-orange-400" />} value={streak} label="Day streak" />
        <Stat icon={<Trophy className="text-amber-300" />} value={xp} label="Total XP" />
        <Stat icon={<Star className="text-sky-300" />} value={wordsLearned} label="Words" />
        <Stat icon={<Gem className="text-sky-400" />} value={gems} label="Gems" />
      </div>

      <div className="card p-5">
        <h2 className="font-display text-lg font-900">Today</h2>
        <div className="mt-2 flex items-center justify-between text-sm font-bold text-slate-300">
          <span>Daily goal</span>
          <span>
            {todayXp}/{dailyGoalXp} XP
          </span>
        </div>
        <div className="mt-2 h-3 overflow-hidden rounded-full bg-ink-line">
          <div
            className="h-full rounded-full bg-brand-500"
            style={{ width: `${Math.min(100, (todayXp / dailyGoalXp) * 100)}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="card p-5 text-center">
          <div className="font-display text-3xl font-900 text-brand-300">{due}</div>
          <div className="text-sm font-bold text-slate-400">Words due to review</div>
        </div>
        <div className="card p-5 text-center">
          <div className="font-display text-3xl font-900 text-amber-300">{mastered}</div>
          <div className="text-sm font-bold text-slate-400">Words mastered</div>
        </div>
      </div>

      <div className="card p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-900">Level</h2>
          <span className="chip bg-brand-500/15 text-brand-200">{LEVEL_LABEL[level]}</span>
        </div>
        {next ? (
          <>
            <p className="mt-1 text-sm text-slate-400">
              Earn <span className="font-bold text-brand-200">{xpToNext} XP</span> more to reach{" "}
              <span className="font-bold capitalize">{LEVEL_LABEL[next]}</span>
              {next === "advanced" && " — unlocking Real Talk slang & idioms."}
            </p>
            <div className="mt-3 flex items-center gap-3">
              <div className="h-3 flex-1 overflow-hidden rounded-full bg-ink-line">
                <div
                  className="h-full rounded-full bg-brand-500 transition-all"
                  style={{ width: `${levelPct}%` }}
                />
              </div>
              <span className="text-xs font-bold text-slate-400">
                {xp}/{target} XP
              </span>
            </div>
          </>
        ) : (
          <p className="mt-1 text-sm text-slate-400">
            🏆 You've reached the top level — all skills and Real Talk scenarios are unlocked.
          </p>
        )}
      </div>

      <button
        onClick={() => {
          if (confirm("Reset all progress? This cannot be undone.")) reset();
        }}
        className="text-sm font-bold text-rose-400 hover:text-rose-300"
      >
        Reset all progress
      </button>
    </div>
  );
}

function Stat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: number;
  label: string;
}) {
  return (
    <div className="card flex flex-col items-center gap-1 p-4 text-center">
      <div className="text-xl">{icon}</div>
      <div className="font-display text-2xl font-900">{value}</div>
      <div className="text-xs font-bold uppercase tracking-wide text-slate-400">{label}</div>
    </div>
  );
}
