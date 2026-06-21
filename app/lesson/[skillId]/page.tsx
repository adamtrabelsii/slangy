"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Heart, X } from "lucide-react";
import { getSkill } from "@/lib/content/spanish";
import { levelAtLeast, type Exercise } from "@/lib/types";
import { useStore } from "@/lib/store";
import { ExerciseView } from "@/components/exercises/Exercises";

export default function LessonPage() {
  const router = useRouter();
  const params = useParams<{ skillId: string }>();
  const skill = getSkill(params.skillId);

  const hydrated = useStore((s) => s.hydrated);
  const level = useStore((s) => s.level);
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

  useEffect(() => {
    if (lesson) setQueue(lesson.exercises);
  }, [lesson]);

  // Guard: bad/locked skill.
  useEffect(() => {
    if (hydrated && skill && !levelAtLeast(level, skill.minLevel)) {
      router.replace("/");
    }
  }, [hydrated, skill, level, router]);

  if (!hydrated) return <div className="py-20 text-center text-slate-400">Cargando…</div>;
  if (!skill || !lesson) {
    return (
      <div className="py-20 text-center">
        <p className="text-slate-400">Lesson not found.</p>
        <Link href="/" className="btn-primary mt-4 inline-flex">
          Back to learn
        </Link>
      </div>
    );
  }

  if (finished) {
    const xp = 10 + correct + (mistakes === 0 ? 5 : 0);
    return <Summary skillTitle={skill.title} correct={correct} total={total} mistakes={mistakes} xp={xp} />;
  }

  // Out of hearts gate.
  if (hearts <= 0) {
    return (
      <div className="py-16 text-center">
        <div className="text-6xl">💔</div>
        <h2 className="mt-4 font-display text-2xl font-900">You're out of hearts</h2>
        <p className="mt-2 text-slate-400">
          Refill to keep going, or come back later — they reset each day.
        </p>
        <div className="mx-auto mt-6 flex max-w-xs flex-col gap-3">
          <button
            className="btn-primary"
            disabled={gems < 30}
            onClick={() => refillHearts(30)}
          >
            Refill hearts · 💎 30
          </button>
          <Link href="/" className="btn-ghost">
            Quit for now
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
      <div className="mb-6 flex items-center gap-4">
        <Link href="/" className="text-slate-400 hover:text-white" aria-label="Quit">
          <X size={26} />
        </Link>
        <div className="h-3 flex-1 overflow-hidden rounded-full bg-ink-line">
          <div
            className="h-full rounded-full bg-brand-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="flex items-center gap-1 font-900 text-rose-300">
          <Heart size={18} className="fill-rose-400 text-rose-400" />
          {hearts}
        </span>
      </div>

      {skill.slang && (
        <div className="mb-4 inline-flex chip bg-brand-500/15 text-brand-200">
          🔥 Real Talk · informal Spanish
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
}: {
  skillTitle: string;
  correct: number;
  total: number;
  mistakes: number;
  xp: number;
}) {
  const accuracy = total + mistakes === 0 ? 100 : Math.round((total / (total + mistakes)) * 100);
  return (
    <div className="py-10 text-center">
      <div className="animate-float text-7xl">🎉</div>
      <h1 className="mt-4 font-display text-3xl font-900">Lesson complete!</h1>
      <p className="text-slate-400">{skillTitle}</p>

      <div className="mx-auto mt-8 grid max-w-md grid-cols-3 gap-3">
        <Stat label="XP earned" value={`+${xp}`} accent="text-amber-300" />
        <Stat label="Accuracy" value={`${accuracy}%`} accent="text-brand-300" />
        <Stat label="Words" value={`${total}`} accent="text-sky-300" />
      </div>

      <div className="mx-auto mt-8 flex max-w-md flex-col gap-3">
        <Link href="/" className="btn-primary">
          Continue
        </Link>
        <Link href="/review" className="btn-ghost">
          Review these words 🧠
        </Link>
      </div>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div className="card p-4">
      <div className={`font-display text-2xl font-900 ${accent}`}>{value}</div>
      <div className="text-xs font-bold uppercase tracking-wide text-slate-400">{label}</div>
    </div>
  );
}
