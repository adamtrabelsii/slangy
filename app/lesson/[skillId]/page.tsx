"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Heart, X } from "lucide-react";
import { getSkill } from "@/lib/content/spanish";
import { levelAtLeast, levelForXp, LEVEL_ORDER, type Exercise, type Level } from "@/lib/types";
import { useStore } from "@/lib/store";
import { ExerciseView } from "@/components/exercises/Exercises";

export default function LessonPage() {
  const router = useRouter();
  const params = useParams<{ skillId: string }>();
  const skill = getSkill(params.skillId);

  const hydrated = useStore((s) => s.hydrated);
  const level = useStore((s) => s.level);
  const xpNow = useStore((s) => s.xp);
  const hearts = useStore((s) => s.hearts);
  const gems = useStore((s) => s.gems);
  const completedCount = useStore((s) => s.completedSkills[params.skillId] ?? 0);

  const loseHeart = useStore((s) => s.loseHeart);
  const refillHearts = useStore((s) => s.refillHearts);
  const seeItem = useStore((s) => s.seeItem);
  const gradeItem = useStore((s) => s.gradeItem);
  const finishLesson = useStore((s) => s.finishLesson);

  // Pick the lesson to play (next uncompleted, else replay last).
  const lesson = useMemo(() => {
    if (!skill) return null;
    const idx = Math.min(completedCount, skill.lessons.length - 1);
    return skill.lessons[idx];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skill?.id]);

  const total = lesson?.exercises.length ?? 0;
  const [queue, setQueue] = useState<Exercise[]>([]);
  const [solved, setSolved] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [finished, setFinished] = useState(false);
  const [leveledUpTo, setLeveledUpTo] = useState<Level | null>(null);

  useEffect(() => {
    if (lesson) setQueue(lesson.exercises);
  }, [lesson]);

  // Guard: bad/locked skill.
  useEffect(() => {
    if (hydrated && skill && !levelAtLeast(level, skill.minLevel)) {
      router.replace("/");
    }
  }, [hydrated, skill, level, router]);

  if (!hydrated) return <div className="py-20 text-center text-sg-sub">Cargando…</div>;
  if (!skill || !lesson) {
    return (
      <div className="py-20 text-center">
        <p className="text-sg-sub">Lección no encontrada.</p>
        <Link href="/" className="btn-primary mt-4 inline-flex">
          Volver
        </Link>
      </div>
    );
  }

  if (finished) {
    const xp = 10 + correct + (mistakes === 0 ? 5 : 0);
    return (
      <Summary
        skillTitle={skill.title}
        correct={correct}
        total={total}
        mistakes={mistakes}
        xp={xp}
        leveledUpTo={leveledUpTo}
      />
    );
  }

  // Out of hearts gate.
  if (hearts <= 0) {
    return (
      <div className="py-16 text-center">
        <div className="text-6xl">💔</div>
        <h2 className="mt-4 font-display text-2xl font-900 text-sg-ink">Te quedaste sin vidas</h2>
        <p className="mt-2 text-sg-sub">
          Recarga para seguir, o vuelve más tarde — se reinician cada día.
        </p>
        <div className="mx-auto mt-6 flex max-w-xs flex-col gap-3">
          <button
            className="btn-primary"
            disabled={gems < 30}
            onClick={() => refillHearts(30)}
          >
            Recargar vidas · 💎 30
          </button>
          <Link href="/" className="btn-ghost">
            Salir por ahora
          </Link>
        </div>
      </div>
    );
  }

  const current = queue[0];
  const progress = total === 0 ? 0 : Math.round((solved / total) * 100);

  function handleDone(wasCorrect: boolean) {
    if (!current) return;
    seeItem(current.itemId);
    gradeItem(current.itemId, wasCorrect ? "good" : "again");

    const remaining = queue.length;
    if (wasCorrect) {
      setCorrect((c) => c + 1);
      setSolved((s) => s + 1);
      if (remaining <= 1) {
        const xp = 10 + (correct + 1) + (mistakes === 0 ? 5 : 0);
        // Detect an earned level-up so the summary can celebrate it.
        const earned = levelForXp(xpNow + xp);
        if (LEVEL_ORDER.indexOf(earned) > LEVEL_ORDER.indexOf(level)) {
          setLeveledUpTo(earned);
        }
        finishLesson(skill!.id, { correct: correct + 1, total, xp });
        setFinished(true);
      } else {
        setQueue((q) => q.slice(1));
      }
    } else {
      setMistakes((m) => m + 1);
      loseHeart();
      // Re-queue the missed exercise at the end.
      setQueue((q) => [...q.slice(1), q[0]]);
    }
  }

  return (
    <div>
      {/* Progress header */}
      <div className="mb-6 flex items-center gap-3">
        <Link href="/" className="text-sg-light hover:text-sg-ink" aria-label="Quit">
          <X size={26} />
        </Link>
        <div className="h-3.5 flex-1 overflow-hidden rounded-full glass">
          <div
            className="sg-grad h-full rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="flex items-center gap-1 font-900" style={{ color: "#E8425E" }}>
          <Heart size={18} className="fill-rose-500 text-rose-500" />
          {hearts}
        </span>
      </div>

      {skill.slang && (
        <div className="chip sg-grad-soft mb-4 inline-flex text-sg-violet">
          🔥 Real Talk · español informal
        </div>
      )}

      {current && <ExerciseView key={current.id + queue.length} exercise={current} onDone={handleDone} />}
    </div>
  );
}

function Summary({
  skillTitle,
  correct,
  total,
  mistakes,
  xp,
  leveledUpTo,
}: {
  skillTitle: string;
  correct: number;
  total: number;
  mistakes: number;
  xp: number;
  leveledUpTo: Level | null;
}) {
  const accuracy = total + mistakes === 0 ? 100 : Math.round((total / (total + mistakes)) * 100);
  return (
    <div className="py-10 text-center">
      <div className="animate-float text-7xl">🎉</div>
      <h1 className="mt-4 font-display text-3xl font-900 text-sg-ink">¡Lección completada!</h1>
      <p className="text-sg-sub">{skillTitle}</p>

      {leveledUpTo && (
        <div
          className="sg-grad-soft mx-auto mt-6 max-w-md animate-pop rounded-2xl p-4"
          style={{ border: "2px solid rgba(124,58,237,.45)" }}
        >
          <div className="text-3xl">⭐️ ¡Subiste de nivel!</div>
          <p className="mt-1 font-900 capitalize text-sg-violet">Llegaste a {leveledUpTo}</p>
          <p className="text-sm text-sg-sub">
            {leveledUpTo === "advanced"
              ? "Real Talk: slang & idioms desbloqueados. 🔥"
              : "Nuevas habilidades y escenarios desbloqueados."}
          </p>
        </div>
      )}

      <div className="mx-auto mt-8 grid max-w-md grid-cols-3 gap-3">
        <Stat label="XP" value={`+${xp}`} accent="#D99908" />
        <Stat label="Precisión" value={`${accuracy}%`} accent="#0E9E79" />
        <Stat label="Palabras" value={`${total}`} accent="#3B6FE8" />
      </div>

      <div className="mx-auto mt-8 flex max-w-md flex-col gap-3">
        <Link href="/" className="btn-primary">
          Continuar
        </Link>
        <Link href="/review" className="btn-ghost">
          Repasar estas palabras 🧠
        </Link>
      </div>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div className="card p-4">
      <div className="font-display text-2xl font-900" style={{ color: accent }}>
        {value}
      </div>
      <div className="text-xs font-bold uppercase tracking-wide text-sg-sub">{label}</div>
    </div>
  );
}
