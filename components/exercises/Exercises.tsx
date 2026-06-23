"use client";

import { useMemo, useState, useEffect } from "react";
import clsx from "clsx";
import type {
  Exercise,
  ListenExercise,
  MatchExercise,
  MultipleChoiceExercise,
  TranslateExercise,
  WordBankExercise,
} from "@/lib/types";
import { Volume2, Lightbulb } from "lucide-react";
import { matchesAny, normalize, shuffle } from "@/lib/text";
import { speak, ttsSupported } from "@/lib/tts";
import { useT } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { getLanguage } from "@/lib/content/languages";
import { ExerciseShell, type Phase } from "./ExerciseShell";

export function ExerciseView({
  exercise,
  onDone,
}: {
  exercise: Exercise;
  onDone: (correct: boolean) => void;
}) {
  switch (exercise.kind) {
    case "multipleChoice":
      return <MultipleChoice ex={exercise} onDone={onDone} />;
    case "translate":
      return <Translate ex={exercise} onDone={onDone} />;
    case "wordBank":
      return <WordBank ex={exercise} onDone={onDone} />;
    case "listen":
      return <Listen ex={exercise} onDone={onDone} />;
    case "match":
      return <Match ex={exercise} onDone={onDone} />;
  }
}

// ---- Multiple choice -----------------------------------------------------

function MultipleChoice({
  ex,
  onDone,
}: {
  ex: MultipleChoiceExercise;
  onDone: (c: boolean) => void;
}) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const choices = useMemo(() => shuffle(ex.choices), [ex.id]);
  const [sel, setSel] = useState<string | null>(null);

  return (
    <ExerciseShell
      prompt={ex.prompt}
      audioText={ex.audio}
      canCheck={sel !== null}
      evaluate={() => sel === ex.answer}
      correctText={ex.answer}
      onDone={onDone}
    >
      {(phase) => (
        <div className="grid gap-3 sm:grid-cols-2">
          {choices.map((c) => (
            <button
              key={c}
              disabled={phase !== "answer"}
              onClick={() => setSel(c)}
              className={clsx(
                "tile text-left",
                phase === "answer" && sel === c && "tile-selected",
                phase !== "answer" && c === ex.answer && "tile-correct",
                phase === "wrong" && sel === c && c !== ex.answer && "tile-wrong"
              )}
            >
              {c}
            </button>
          ))}
        </div>
      )}
    </ExerciseShell>
  );
}

// ---- Translate (type) ----------------------------------------------------

function Translate({
  ex,
  onDone,
}: {
  ex: TranslateExercise;
  onDone: (c: boolean) => void;
}) {
  const [text, setText] = useState("");
  const t = useT();
  const learnFrom = useStore((s) => s.learnFrom);
  const learnTarget = useStore((s) => s.learnTarget);
  const langName =
    ex.direction === "en-es"
      ? getLanguage(learnTarget).native
      : getLanguage(learnFrom).native;
  const label = t("ex_write", { lang: langName });

  return (
    <ExerciseShell
      prompt={
        <span>
          <span className="block text-xs font-bold uppercase tracking-wide text-sg-light">
            {label}
          </span>
          {ex.prompt}
        </span>
      }
      audioText={ex.direction === "es-en" ? ex.prompt : undefined}
      canCheck={text.trim().length > 0}
      evaluate={() => matchesAny(text, ex.answers)}
      correctText={ex.answers[0]}
      onDone={onDone}
    >
      {(phase) => (
        <div>
          <textarea
            autoFocus
            value={text}
            disabled={phase !== "answer"}
            onChange={(e) => setText(e.target.value)}
            placeholder={t("ex_typeAnswer")}
            rows={2}
            className="w-full resize-none rounded-2xl border-[1.5px] border-sg-primary/30 bg-white p-4 text-lg font-bold text-sg-ink outline-none focus:border-sg-primary"
          />
          {ex.hint && phase === "answer" && (
            <p className="mt-2 flex items-center gap-1.5 text-sm text-sg-sub">
              <Lightbulb size={14} className="text-sg-amber" /> {ex.hint}
            </p>
          )}
        </div>
      )}
    </ExerciseShell>
  );
}

// ---- Word bank -----------------------------------------------------------

function WordBank({
  ex,
  onDone,
}: {
  ex: WordBankExercise;
  onDone: (c: boolean) => void;
}) {
  const t = useT();
  const bankInit = useMemo(
    () => shuffle([...ex.answer, ...ex.distractors]).map((w, i) => ({ w, id: i })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ex.id]
  );
  const [bank, setBank] = useState(bankInit);
  const [picked, setPicked] = useState<{ w: string; id: number }[]>([]);

  function pick(item: { w: string; id: number }) {
    setBank((b) => b.filter((x) => x.id !== item.id));
    setPicked((p) => [...p, item]);
  }
  function unpick(item: { w: string; id: number }) {
    setPicked((p) => p.filter((x) => x.id !== item.id));
    setBank((b) => [...b, item]);
  }

  return (
    <ExerciseShell
      prompt={ex.prompt}
      canCheck={picked.length > 0}
      evaluate={() =>
        normalize(picked.map((p) => p.w).join(" ")) === normalize(ex.answer.join(" "))
      }
      correctText={ex.answer.join(" ")}
      onDone={onDone}
    >
      {(phase) => (
        <div>
          <div className="flex min-h-[64px] flex-wrap gap-2 rounded-2xl border-2 border-dashed border-sg-blue/30 p-3">
            {picked.map((item) => (
              <button
                key={item.id}
                disabled={phase !== "answer"}
                onClick={() => unpick(item)}
                className="tile py-2"
              >
                {item.w}
              </button>
            ))}
            {picked.length === 0 && (
              <span className="self-center px-2 text-sm text-sg-light">{t("ex_tapToBuild")}</span>
            )}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {bank.map((item) => (
              <button
                key={item.id}
                disabled={phase !== "answer"}
                onClick={() => pick(item)}
                className="tile py-2"
              >
                {item.w}
              </button>
            ))}
          </div>
        </div>
      )}
    </ExerciseShell>
  );
}

// ---- Listen --------------------------------------------------------------

function Listen({ ex, onDone }: { ex: ListenExercise; onDone: (c: boolean) => void }) {
  const t = useT();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const choices = useMemo(() => shuffle(ex.choices), [ex.id]);
  const [sel, setSel] = useState<string | null>(null);

  // Auto-play once on mount.
  useEffect(() => {
    if (ttsSupported()) speak(ex.audio);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ex.id]);

  if (!ttsSupported()) {
    // Graceful fallback: show the text so it still works without speech.
    return (
      <ExerciseShell
        prompt={`What does “${ex.audio}” mean?`}
        canCheck={sel !== null}
        evaluate={() => sel === ex.answer}
        correctText={ex.answer}
        onDone={onDone}
      >
        {(phase) => (
          <ChoiceGrid choices={choices} sel={sel} setSel={setSel} answer={ex.answer} phase={phase} />
        )}
      </ExerciseShell>
    );
  }

  return (
    <ExerciseShell
      prompt="Tap what you hear"
      audioText={ex.audio}
      canCheck={sel !== null}
      evaluate={() => sel === ex.answer}
      correctText={`${ex.answer} — ${ex.translation}`}
      onDone={onDone}
    >
      {(phase) => (
        <div>
          <button
            onClick={() => speak(ex.audio)}
            className="mb-4 flex w-full items-center justify-center gap-3 rounded-2xl bg-sg-amber/15 py-6 text-sg-primary-deep hover:bg-sg-amber/25"
          >
            <Volume2 size={28} />
            <span className="font-display font-900">{t("ex_listenAgain")}</span>
          </button>
          <ChoiceGrid choices={choices} sel={sel} setSel={setSel} answer={ex.answer} phase={phase} />
          {phase !== "answer" && (
            <p className="mt-3 text-sm text-sg-sub">“{ex.audio}” = {ex.translation}</p>
          )}
        </div>
      )}
    </ExerciseShell>
  );
}

function ChoiceGrid({
  choices,
  sel,
  setSel,
  answer,
  phase,
}: {
  choices: string[];
  sel: string | null;
  setSel: (s: string) => void;
  answer: string;
  phase: Phase;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {choices.map((c) => (
        <button
          key={c}
          disabled={phase !== "answer"}
          onClick={() => setSel(c)}
          className={clsx(
            "tile text-left",
            phase === "answer" && sel === c && "tile-selected",
            phase !== "answer" && c === answer && "tile-correct",
            phase === "wrong" && sel === c && c !== answer && "tile-wrong"
          )}
        >
          {c}
        </button>
      ))}
    </div>
  );
}

// ---- Match pairs ---------------------------------------------------------

function Match({ ex, onDone }: { ex: MatchExercise; onDone: (c: boolean) => void }) {
  const t = useT();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const esList = useMemo(() => shuffle(ex.pairs.map((p) => p.es)), [ex.id]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const enList = useMemo(() => shuffle(ex.pairs.map((p) => p.en)), [ex.id]);
  const lookup = useMemo(() => {
    const m = new Map<string, string>();
    ex.pairs.forEach((p) => m.set(p.es, p.en));
    return m;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ex.id]);

  const [selEs, setSelEs] = useState<string | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [wrongFlash, setWrongFlash] = useState<string | null>(null);
  const [mistakes, setMistakes] = useState(0);

  function chooseEn(en: string) {
    if (!selEs) return;
    if (lookup.get(selEs) === en) {
      const next = new Set(matched);
      next.add(selEs);
      next.add(en);
      setMatched(next);
      setSelEs(null);
      if (next.size === ex.pairs.length * 2) {
        // Done.
        setTimeout(() => onDone(mistakes === 0), 350);
      }
    } else {
      setMistakes((m) => m + 1);
      setWrongFlash(en);
      setTimeout(() => setWrongFlash(null), 350);
    }
  }

  return (
    <div className="flex min-h-[60vh] flex-col">
      <h2 className="mb-6 font-display text-2xl font-900 text-sg-ink">{t("ex_match")}</h2>
      <div className="grid flex-1 grid-cols-2 gap-3">
        <div className="space-y-3">
          {esList.map((es) => (
            <button
              key={es}
              disabled={matched.has(es)}
              onClick={() => {
                setSelEs(es);
                if (ttsSupported()) speak(es);
              }}
              className={clsx(
                "tile w-full",
                matched.has(es) && "opacity-30",
                selEs === es && "tile-selected"
              )}
            >
              {es}
            </button>
          ))}
        </div>
        <div className="space-y-3">
          {enList.map((en) => (
            <button
              key={en}
              disabled={matched.has(en)}
              onClick={() => chooseEn(en)}
              className={clsx(
                "tile w-full",
                matched.has(en) && "opacity-30",
                wrongFlash === en && "tile-wrong animate-shake"
              )}
            >
              {en}
            </button>
          ))}
        </div>
      </div>
      <p className="mt-4 text-center text-sm text-sg-sub">{t("ex_matchHint")}</p>
    </div>
  );
}
