"use client";

import { useState } from "react";
import { Volume2 } from "lucide-react";
import { speak, ttsSupported } from "@/lib/tts";

export type Phase = "answer" | "correct" | "wrong";

export function ExerciseShell({
  prompt,
  audioText,
  canCheck,
  evaluate,
  correctText,
  onDone,
  children,
}: {
  prompt: React.ReactNode;
  audioText?: string;
  canCheck: boolean;
  evaluate: () => boolean;
  correctText?: string;
  onDone: (correct: boolean) => void;
  children: (phase: Phase) => React.ReactNode;
}) {
  const [phase, setPhase] = useState<Phase>("answer");

  function check() {
    if (!canCheck) return;
    const ok = evaluate();
    setPhase(ok ? "correct" : "wrong");
  }

  const checked = phase !== "answer";

  return (
    <div className="flex min-h-[60vh] flex-col">
      <div className="flex-1">
        <div className="mb-6 flex items-start gap-3">
          <h2 className="font-display text-2xl font-900 leading-tight">{prompt}</h2>
          {audioText && ttsSupported() && (
            <button
              onClick={() => speak(audioText)}
              className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-sky-500/15 text-sky-300 hover:bg-sky-500/25"
              aria-label="Play audio"
            >
              <Volume2 size={20} />
            </button>
          )}
        </div>

        <div className="animate-pop">{children(phase)}</div>
      </div>

      {/* Feedback + footer */}
      <div
        className={`mt-6 rounded-2xl p-4 transition-colors ${
          phase === "correct"
            ? "bg-brand-500/15"
            : phase === "wrong"
            ? "bg-rose-500/15"
            : "bg-transparent"
        }`}
      >
        {phase === "wrong" && (
          <div className="mb-3 text-rose-200">
            <span className="font-900">Not quite.</span>{" "}
            {correctText && (
              <span>
                Answer: <span className="font-bold">{correctText}</span>
              </span>
            )}
          </div>
        )}
        {phase === "correct" && (
          <div className="mb-3 font-900 text-brand-200">¡Correcto! 🎉</div>
        )}

        {!checked ? (
          <button className="btn-primary w-full" disabled={!canCheck} onClick={check}>
            Check
          </button>
        ) : (
          <button
            className={phase === "correct" ? "btn-primary w-full" : "btn-danger w-full"}
            onClick={() => onDone(phase === "correct")}
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
}
