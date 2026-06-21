"use client";

import { useState } from "react";
import { Volume2, CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import { speak, ttsSupported } from "@/lib/tts";
import { useT } from "@/lib/i18n";

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
  const t = useT();
  const [phase, setPhase] = useState<Phase>("answer");

  function check() {
    if (!canCheck) return;
    setPhase(evaluate() ? "correct" : "wrong");
  }

  return (
    <div className="flex min-h-[68vh] flex-col">
      <div className="flex-1">
        {/* Speaker prompt */}
        <div className="mb-6 flex items-center gap-3.5">
          {audioText && ttsSupported() && (
            <button
              onClick={() => speak(audioText)}
              className="sg-grad flex h-14 w-14 flex-none items-center justify-center rounded-full text-white"
              style={{ boxShadow: "var(--sg-glow)" }}
              aria-label="Play audio"
            >
              <Volume2 size={24} />
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
            {t("lesson_check")}
          </button>
        </div>
      )}

      {phase === "correct" && (
        <div
          className="-mx-5 mt-6 px-5 pb-2 pt-4"
          style={{ background: "rgba(14,158,110,.14)", borderTop: "1px solid rgba(14,158,110,.35)" }}
        >
          <div className="mb-3 flex items-center gap-2.5">
            <CheckCircle2 size={26} style={{ color: "#0B7C56" }} />
            <div>
              <div className="text-[15px] font-extrabold" style={{ color: "#0B7C56" }}>
                {t("lesson_perfect")}
              </div>
              {correctText && (
                <div className="text-xs" style={{ color: "#0B7C56" }}>
                  {correctText}
                </div>
              )}
            </div>
          </div>
          <button
            className="flex w-full items-center justify-center gap-1 rounded-[18px] py-3.5 text-base font-extrabold text-white"
            style={{ background: "#0E9E6E", boxShadow: "0 8px 16px rgba(14,158,110,.3)" }}
            onClick={() => onDone(true)}
          >
            {t("lesson_continue")} <ArrowRight size={18} />
          </button>
        </div>
      )}

      {phase === "wrong" && (
        <div
          className="-mx-5 mt-6 px-5 pb-2 pt-4"
          style={{ background: "rgba(224,83,63,.12)", borderTop: "1px solid rgba(224,83,63,.35)" }}
        >
          <div className="mb-3 flex items-center gap-2.5">
            <XCircle size={26} style={{ color: "#C23B29" }} />
            <div>
              <div className="text-[15px] font-extrabold" style={{ color: "#C23B29" }}>
                {t("lesson_almost")}
              </div>
              {correctText && (
                <div className="text-xs" style={{ color: "#C23B29" }}>
                  {t("lesson_answer")} {correctText}
                </div>
              )}
            </div>
          </div>
          <button className="btn-danger flex h-13 w-full items-center justify-center gap-1 py-3.5 text-base" onClick={() => onDone(false)}>
            {t("lesson_continue")} <ArrowRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
