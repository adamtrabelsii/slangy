"use client";

import { useState } from "react";
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
    setPhase(evaluate() ? "correct" : "wrong");
  }

  const checked = phase !== "answer";

  return (
    <div className="flex min-h-[68vh] flex-col">
      <div className="flex-1">
        {/* Speaker prompt */}
        <div className="mb-6 flex items-center gap-3.5">
          {audioText && ttsSupported() && (
            <button
              onClick={() => speak(audioText)}
              className="flex h-[54px] w-[54px] flex-none items-center justify-center rounded-full text-2xl text-white"
              style={{
                background: "linear-gradient(145deg,#5b8bff,#3B6FE8)",
                boxShadow: "var(--sg-glow-blue)",
              }}
              aria-label="Play audio"
            >
              🔊
            </button>
          )}
          <div className="glass rounded-2xl px-4 py-3.5">
            <span className="font-display text-lg font-extrabold leading-tight text-sg-ink">
              {prompt}
            </span>
          </div>
        </div>

        <div className="animate-pop">{children(phase)}</div>
      </div>

      {/* Feedback + footer */}
      {phase === "answer" && (
        <div className="pt-6">
          <button className="btn-primary h-14 w-full text-base" disabled={!canCheck} onClick={check}>
            Comprobar
          </button>
        </div>
      )}

      {phase === "correct" && (
        <div
          className="-mx-5 mt-6 px-5 pb-2 pt-4"
          style={{ background: "rgba(16,185,129,.16)", borderTop: "1px solid rgba(16,185,129,.4)" }}
        >
          <div className="mb-3 flex items-center gap-2.5">
            <span className="text-2xl">🎉</span>
            <div>
              <div className="text-[15px] font-extrabold" style={{ color: "#0c8f63" }}>
                ¡Perfecto!
              </div>
              {correctText && (
                <div className="text-xs" style={{ color: "#0c8f63" }}>
                  {correctText}
                </div>
              )}
            </div>
          </div>
          <button
            className="h-13 w-full rounded-[18px] py-3.5 text-base font-extrabold text-white"
            style={{ background: "#10B981", boxShadow: "0 8px 16px rgba(16,185,129,.35)" }}
            onClick={() => onDone(true)}
          >
            Continuar →
          </button>
        </div>
      )}

      {phase === "wrong" && (
        <div
          className="-mx-5 mt-6 px-5 pb-2 pt-4"
          style={{ background: "rgba(255,84,112,.14)", borderTop: "1px solid rgba(255,84,112,.4)" }}
        >
          <div className="mb-3 flex items-center gap-2.5">
            <span className="text-2xl">🙈</span>
            <div>
              <div className="text-[15px] font-extrabold" style={{ color: "#d83456" }}>
                Casi…
              </div>
              {correctText && (
                <div className="text-xs" style={{ color: "#d83456" }}>
                  Respuesta: {correctText}
                </div>
              )}
            </div>
          </div>
          <button className="btn-danger h-13 w-full py-3.5 text-base" onClick={() => onDone(false)}>
            Continuar →
          </button>
        </div>
      )}
    </div>
  );
}
