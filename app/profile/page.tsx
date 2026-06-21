"use client";

import { useStore } from "@/lib/store";
import { countDue } from "@/lib/srs";
import { XP_FOR_LEVEL, nextLevel, levelAtLeast, type Level } from "@/lib/types";

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

  if (!hydrated) return <div className="py-20 text-center text-sg-sub">Cargando…</div>;

  const wordsLearned = Object.keys(cards).length;
  const due = countDue(cards);
  const mastered = Object.values(cards).filter((c) => c.interval >= 6).length;

  // Earned-level progress toward the next tier.
  const next = nextLevel(level);
  const floor = XP_FOR_LEVEL[level];
  const target = next ? XP_FOR_LEVEL[next] : floor;
  const levelPct = next ? Math.min(100, Math.round(((xp - floor) / (target - floor)) * 100)) : 100;
  const xpToNext = next ? Math.max(0, target - xp) : 0;
  const isAdvanced = levelAtLeast(level, "advanced");

  return (
    <div className="-mx-5 -mt-6">
      {/* Header */}
      <div
        className="px-5 pb-5 pt-8"
        style={{
          background: "linear-gradient(160deg,rgba(59,111,232,.2),rgba(124,58,237,.18))",
          borderBottom: "1px solid rgba(255,255,255,.4)",
        }}
      >
        <div className="flex items-center gap-3.5">
          <div
            className="flex h-16 w-16 items-center justify-center rounded-[22px] text-3xl text-white"
            style={{
              background: "linear-gradient(145deg,#5b8bff,#7C3AED)",
              boxShadow: "var(--sg-glow-violet)",
            }}
          >
            🦊
          </div>
          <div className="flex-1">
            <div className="font-display text-xl font-900 text-sg-ink">Tu perfil</div>
            <div className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-sg-violet/15 px-2.5 py-1 text-[11px] font-extrabold text-sg-violet">
              ⚡ {LEVEL_LABEL[level]} · {xp} XP
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 pt-5">
        {/* Stat grid */}
        <div className="mb-5 grid grid-cols-2 gap-3">
          <StatCard emoji="🔥" value={streak} label="Día de racha" bg="rgba(255,139,61,.14)" border="rgba(255,139,61,.35)" color="#E8722A" />
          <StatCard emoji="⭐" value={xp.toLocaleString()} label="XP total" bg="rgba(251,191,36,.16)" border="rgba(251,191,36,.4)" color="#D99908" />
          <StatCard emoji="📚" value={wordsLearned} label="Palabras" bg="rgba(59,111,232,.14)" border="rgba(59,111,232,.35)" color="#3B6FE8" />
          <StatCard emoji="🎯" value={mastered} label="Dominadas" bg="rgba(16,185,129,.14)" border="rgba(16,185,129,.35)" color="#10B981" />
        </div>

        {/* Daily goal */}
        <div className="card mb-5 p-4">
          <div className="flex items-center justify-between text-xs font-bold text-sg-sub">
            <span>Meta de hoy</span>
            <span>
              {todayXp}/{dailyGoalXp} XP
            </span>
          </div>
          <div className="mt-2 h-3 overflow-hidden rounded-full bg-white/40">
            <div
              className="sg-grad h-full rounded-full"
              style={{ width: `${Math.min(100, (todayXp / dailyGoalXp) * 100)}%` }}
            />
          </div>
        </div>

        {/* Progress to next level */}
        <p className="section-label mb-2">PROGRESO DE NIVEL</p>
        <div className="card mb-5 p-4">
          {next ? (
            <>
              <div className="mb-2 flex justify-between text-xs font-bold">
                <span className="text-sg-sub">{LEVEL_LABEL[level]}</span>
                <span className="text-sg-violet">
                  {next === "advanced" ? "Slang en " : ""}
                  {xpToNext} XP {next === "advanced" ? "🔥" : `→ ${LEVEL_LABEL[next]}`}
                </span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-white/40">
                <div className="sg-grad h-full rounded-full" style={{ width: `${levelPct}%` }} />
              </div>
            </>
          ) : (
            <p className="text-sm text-sg-sub">
              🏆 Llegaste al nivel máximo — todo el contenido Real Talk está desbloqueado.
            </p>
          )}
        </div>

        {/* Achievements */}
        <p className="section-label mb-2">LOGROS</p>
        <div className="mb-6 flex gap-2.5">
          <Badge emoji="🔥" label={`Racha x${streak}`} earned={streak > 0} />
          <Badge emoji="📚" label={`${wordsLearned} palabras`} earned={wordsLearned > 0} />
          <Badge emoji="🗣️" label="Slang pro" earned={isAdvanced} />
        </div>

        <button
          onClick={() => {
            if (confirm("¿Reiniciar todo el progreso? No se puede deshacer.")) reset();
          }}
          className="text-sm font-bold text-sg-coral-deep"
        >
          Reiniciar progreso
        </button>
      </div>
    </div>
  );
}

function StatCard({
  emoji,
  value,
  label,
  bg,
  border,
  color,
}: {
  emoji: string;
  value: string | number;
  label: string;
  bg: string;
  border: string;
  color: string;
}) {
  return (
    <div className="rounded-[18px] p-4" style={{ background: bg, border: `1px solid ${border}` }}>
      <div className="text-2xl">{emoji}</div>
      <div className="mt-1 font-display text-2xl font-900" style={{ color }}>
        {value}
      </div>
      <div className="text-[11px] font-bold text-sg-sub">{label}</div>
    </div>
  );
}

function Badge({ emoji, label, earned }: { emoji: string; label: string; earned: boolean }) {
  return (
    <div
      className={`flex-1 rounded-2xl py-3.5 text-center ${earned ? "glass" : "glass-25"}`}
      style={earned ? {} : { border: "1px dashed rgba(124,58,237,.35)", opacity: 0.6 }}
    >
      <div className="text-2xl">{emoji}</div>
      <div className={`mt-1 text-[10px] font-bold ${earned ? "text-sg-sub" : "text-sg-light"}`}>
        {label}
      </div>
    </div>
  );
}
