"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Volume2 } from "lucide-react";
import { useStore } from "@/lib/store";
import { dueCards } from "@/lib/srs";
import { speak, ttsSupported } from "@/lib/tts";
import type { Grade, SrsCard } from "@/lib/types";

export default function ReviewPage() {
  const hydrated = useStore((s) => s.hydrated);
  const cards = useStore((s) => s.cards);
  const gradeItem = useStore((s) => s.gradeItem);

  // Snapshot the due queue when the session starts.
  const session = useMemo<SrsCard[]>(() => dueCards(cards), [hydrated]);
  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [done, setDone] = useState(0);

  if (!hydrated) return <div className="py-20 text-center text-slate-400">Cargando…</div>;

  if (session.length === 0) {
    return (
      <div className="py-16 text-center">
        <div className="text-6xl">🧠</div>
        <h1 className="mt-4 font-display text-2xl font-900">Nothing due right now</h1>
        <p className="mt-2 text-slate-400">
          Finish a lesson to add words, then come back to lock them into memory.
        </p>
        <Link href="/" className="btn-primary mt-6 inline-flex">
          Go learn
        </Link>
      </div>
    );
  }

  if (idx >= session.length) {
    return (
      <div className="py-16 text-center">
        <div className="animate-float text-6xl">✅</div>
        <h1 className="mt-4 font-display text-2xl font-900">Review done!</h1>
        <p className="mt-2 text-slate-400">{done} cards reviewed. Memory reinforced.</p>
        <Link href="/" className="btn-primary mt-6 inline-flex">
          Back to learn
        </Link>
      </div>
    );
  }

  const card = session[idx];

  function grade(g: Grade) {
    gradeItem(card.itemId, g);
    setDone((d) => d + 1);
    setRevealed(false);
    setIdx((i) => i + 1);
  }

  return (
    <div className="py-4">
      <div className="mb-6 flex items-center gap-4">
        <span className="text-sm font-bold text-slate-400">
          {idx + 1} / {session.length}
        </span>
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-ink-line">
          <div
            className="h-full rounded-full bg-brand-500 transition-all"
            style={{ width: `${(idx / session.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="card mx-auto flex min-h-[300px] max-w-lg flex-col items-center justify-center gap-4 p-8 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
          What does this mean?
        </span>
        <div className="flex items-center gap-3">
          <span className="font-display text-4xl font-900">{card.es}</span>
          {ttsSupported() && (
            <button
              onClick={() => speak(card.es)}
              className="grid h-10 w-10 place-items-center rounded-xl bg-sky-500/15 text-sky-300 hover:bg-sky-500/25"
              aria-label="Play audio"
            >
              <Volume2 size={20} />
            </button>
          )}
        </div>

        {revealed && (
          <div className="animate-pop text-2xl font-bold text-brand-200">{card.en}</div>
        )}
      </div>

      <div className="mx-auto mt-6 max-w-lg">
        {!revealed ? (
          <button className="btn-primary w-full" onClick={() => setRevealed(true)}>
            Show answer
          </button>
        ) : (
          <div className="grid grid-cols-4 gap-2">
            <GradeBtn label="Again" sub="<10m" color="bg-rose-500" onClick={() => grade("again")} />
            <GradeBtn label="Hard" sub="" color="bg-amber-500" onClick={() => grade("hard")} />
            <GradeBtn label="Good" sub="" color="bg-brand-500" onClick={() => grade("good")} />
            <GradeBtn label="Easy" sub="" color="bg-sky-500" onClick={() => grade("easy")} />
          </div>
        )}
      </div>
    </div>
  );
}

function GradeBtn({
  label,
  sub,
  color,
  onClick,
}: {
  label: string;
  sub: string;
  color: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`${color} rounded-2xl py-3 font-900 text-white transition-transform active:translate-y-0.5`}
      style={{ boxShadow: "0 4px 0 0 rgba(0,0,0,0.3)" }}
    >
      <div>{label}</div>
      {sub && <div className="text-[11px] font-bold opacity-80">{sub}</div>}
    </button>
  );
}
