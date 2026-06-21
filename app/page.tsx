"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock } from "lucide-react";
import { SPANISH_COURSE } from "@/lib/content/spanish";
import { levelAtLeast, type Skill } from "@/lib/types";
import { useStore } from "@/lib/store";
import { countDue } from "@/lib/srs";
import { Icon } from "@/components/Icon";

export default function HomePage() {
  const router = useRouter();
  const hydrated = useStore((s) => s.hydrated);
  const onboarded = useStore((s) => s.onboarded);
  const level = useStore((s) => s.level);
  const completed = useStore((s) => s.completedSkills);
  const cards = useStore((s) => s.cards);
  const todayXp = useStore((s) => s.todayXp);
  const dailyGoalXp = useStore((s) => s.dailyGoalXp);

  useEffect(() => {
    if (hydrated && !onboarded) router.replace("/onboarding");
  }, [hydrated, onboarded, router]);

  if (!hydrated || !onboarded) {
    return <div className="py-20 text-center text-slate-400">Cargando…</div>;
  }

  const due = countDue(cards);
  const goalPct = Math.min(100, Math.round((todayXp / dailyGoalXp) * 100));

  return (
    <div className="space-y-8">
      {/* Daily goal + review banner */}
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="card p-4">
          <div className="flex items-center justify-between text-sm font-bold text-slate-300">
            <span>Daily goal</span>
            <span>
              {todayXp}/{dailyGoalXp} XP
            </span>
          </div>
          <div className="mt-2 h-3 overflow-hidden rounded-full bg-ink-line">
            <div
              className="h-full rounded-full bg-brand-500 transition-all"
              style={{ width: `${goalPct}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-slate-400">
            {goalPct >= 100 ? "¡Meta cumplida! 🎉" : "Keep going — finish a lesson."}
          </p>
        </div>

        <Link
          href="/review"
          className="card flex items-center justify-between p-4 transition-colors hover:border-brand-500/50"
        >
          <div>
            <div className="text-sm font-bold text-slate-300">Spaced review</div>
            <div className="text-2xl font-900">
              {due} <span className="text-base font-bold text-slate-400">due</span>
            </div>
          </div>
          <span className="text-3xl">🧠</span>
        </Link>
      </div>

      {/* Course path */}
      {SPANISH_COURSE.units.map((unit) => (
        <section key={unit.id} className="space-y-4">
          <div className="rounded-2xl bg-gradient-to-r from-brand-700/40 to-transparent px-4 py-3">
            <h2 className="font-display text-lg font-900">{unit.title}</h2>
            <p className="text-sm text-slate-300">{unit.description}</p>
          </div>

          <div className="flex flex-col items-center gap-5">
            {unit.skills.map((skill, i) => (
              <SkillNode
                key={skill.id}
                skill={skill}
                offset={i % 2 === 0 ? -1 : 1}
                unlocked={levelAtLeast(level, skill.minLevel)}
                completedCount={completed[skill.id] ?? 0}
              />
            ))}
          </div>
        </section>
      ))}

      <p className="pt-2 text-center text-sm text-slate-500">
        More units coming soon · keep your streak alive 🔥
      </p>
    </div>
  );
}

function SkillNode({
  skill,
  offset,
  unlocked,
  completedCount,
}: {
  skill: Skill;
  offset: number;
  unlocked: boolean;
  completedCount: number;
}) {
  const done = completedCount > 0;
  const total = skill.lessons.length;

  const inner = (
    <div
      className="flex w-full max-w-md items-center gap-4 rounded-3xl border border-ink-line bg-ink-soft/70 p-4 backdrop-blur transition-transform hover:scale-[1.02]"
      style={{ transform: `translateX(${offset * 18}px)` }}
    >
      <div
        className="relative grid h-16 w-16 shrink-0 place-items-center rounded-2xl"
        style={{
          background: unlocked ? `${skill.color}22` : "#1b2735",
          boxShadow: `0 4px 0 0 ${unlocked ? skill.color + "55" : "#0c1622"}`,
        }}
      >
        {unlocked ? (
          <Icon name={skill.icon} size={28} className="text-white" />
        ) : (
          <Lock size={26} className="text-slate-500" />
        )}
        {done && (
          <span className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-brand-500 text-xs">
            ✓
          </span>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="truncate font-display text-base font-900">{skill.title}</h3>
          {skill.slang && (
            <span className="chip bg-brand-500/15 text-brand-200 text-[11px]">SLANG</span>
          )}
        </div>
        <p className="truncate text-sm text-slate-400">{skill.blurb}</p>
        {unlocked ? (
          <div className="mt-2 flex items-center gap-2">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-ink-line">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${Math.min(100, (completedCount / total) * 100)}%`,
                  background: skill.color,
                }}
              />
            </div>
            <span className="text-xs font-bold text-slate-400">
              {Math.min(completedCount, total)}/{total}
            </span>
          </div>
        ) : (
          <p className="mt-1 text-xs font-bold text-amber-400">
            Reach {skill.minLevel} to unlock
          </p>
        )}
      </div>
    </div>
  );

  if (!unlocked) return <div className="w-full opacity-70">{inner}</div>;

  return (
    <Link href={`/lesson/${skill.id}`} className="w-full">
      {inner}
    </Link>
  );
}
