"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Brain, CheckCircle2, Volume2 } from "lucide-react";
import { useStore } from "@/lib/store";
import { dueCards } from "@/lib/srs";
import { speak, ttsSupported } from "@/lib/tts";
import { useT } from "@/lib/i18n";
import { getLanguage } from "@/lib/content/languages";
import { glossOf } from "@/lib/content/generate";
import type { Grade, SrsCard } from "@/lib/types";

export default function ReviewPage() {
  const hydrated = useStore((s) => s.hydrated);
  const cards = useStore((s) => s.cards);
  const gradeItem = useStore((s) => s.gradeItem);
  const learnTarget = useStore((s) => s.learnTarget);
  const learnFrom = useStore((s) => s.learnFrom);
  const t = useT();
  const targetName = getLanguage(learnTarget).native;

  // Snapshot the due queue when the session starts.
  const session = useMemo<SrsCard[]>(() => dueCards(cards), [hydrated]);
  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [done, setDone] = useState(0);

  const total = Object.keys(cards).length;
  const mastered = Object.values(cards).filter((c) => c.interval >= 6).length;

  if (!hydrated) return <div className="py-20 text-center text-sg-sub">{t("loading")}</div>;

  if (session.length === 0) {
    return (
      <div className="py-16 text-center">
        <Brain size={64} className="mx-auto text-sg-primary" />
        <h1 className="mt-4 font-display text-2xl font-900 text-sg-ink">{t("review_nothing_title")}</h1>
        <p className="mt-2 text-sg-sub">{t("review_nothing_body")}</p>
        <Link href="/" className="btn-primary mt-6 inline-flex">
          {t("review_goLearn")}
        </Link>
      </div>
    );
  }

  if (idx >= session.length) {
    return (
      <div className="py-16 text-center">
        <CheckCircle2 size={64} className="mx-auto animate-float text-sg-success" />
        <h1 className="mt-4 font-display text-2xl font-900 text-sg-ink">{t("review_done_title")}</h1>
        <p className="mt-2 text-sg-sub">{t("review_done_body", { n: done })}</p>
        <Link href="/" className="btn-primary mt-6 inline-flex">
          {t("review_backToLearn")}
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
    <div>
      <p className="tagline">{t("review_tagline")}</p>
      <h1 className="font-display text-3xl font-900 text-sg-ink">{t("review_title")}</h1>
      <p className="mb-4 mt-1 text-sm text-sg-sub">{t("review_subtitle")}</p>

      {/* Stats */}
      <div className="mb-5 flex gap-2">
        <StatBox value={session.length} label={t("review_due")} bg="rgba(251,116,39,.12)" border="rgba(251,116,39,.3)" color="#EA580C" />
        <StatBox value={total} label={t("review_learned")} bg="rgba(14,158,110,.12)" border="rgba(14,158,110,.3)" color="#0E9E6E" />
        <StatBox value={mastered} label={t("review_mastered")} bg="rgba(245,158,11,.14)" border="rgba(245,158,11,.35)" color="#B45309" />
      </div>

      <p className="section-label mb-2">{t("review_card", { i: idx + 1, n: session.length })}</p>

      {/* Flashcard */}
      <button
        onClick={() => setRevealed((r) => !r)}
        className="glass mb-4 flex min-h-[240px] w-full flex-col rounded-3xl p-7 text-left"
      >
        {!revealed ? (
          <>
            <span className="self-start rounded-full bg-sg-amber/15 px-2.5 py-1 text-[9.5px] font-extrabold uppercase tracking-wider text-sg-primary-deep">
              {targetName}
            </span>
            <div className="flex flex-1 flex-col items-center justify-center gap-2">
              <span className="text-center font-display text-3xl font-900 text-sg-ink">
                {card.term}
              </span>
              {card.roman && <span className="text-center text-sm text-sg-sub">{card.roman}</span>}
              {ttsSupported() && (
                <span
                  className="mt-1 inline-flex items-center gap-1.5 text-[11px] font-bold text-sg-primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    speak(card.term);
                  }}
                >
                  <Volume2 size={13} /> {t("review_listen")}
                </span>
              )}
            </div>
            <span className="text-center text-[11px] text-sg-light">{t("review_tapMeaning")}</span>
          </>
        ) : (
          <>
            <span className="self-start rounded-full bg-sg-success/15 px-2.5 py-1 text-[9.5px] font-extrabold tracking-wider text-sg-success">
              {t("review_meaning")}
            </span>
            <div className="flex flex-1 flex-col items-center justify-center text-center">
              <span className="font-display text-2xl font-900 text-sg-ink">
                {glossOf(card.gloss, learnFrom)}
              </span>
            </div>
            <span className="text-center text-[11px] text-sg-light">{t("review_remember")}</span>
          </>
        )}
      </button>

      {/* Grade buttons */}
      {revealed ? (
        <div className="flex animate-pop gap-2">
          <GradeBtn label={t("grade_again")} sub="<1m" border="rgba(224,83,63,.4)" bg="rgba(224,83,63,.12)" color="#C23B29" onClick={() => grade("again")} />
          <GradeBtn label={t("grade_hard")} sub="10m" border="rgba(180,83,9,.4)" bg="rgba(180,83,9,.12)" color="#B45309" onClick={() => grade("hard")} />
          <GradeBtn label={t("grade_good")} sub="1d" border="rgba(251,116,39,.4)" bg="rgba(251,116,39,.12)" color="#EA580C" onClick={() => grade("good")} />
          <GradeBtn label={t("grade_easy")} sub="4d" border="rgba(14,158,110,.4)" bg="rgba(14,158,110,.12)" color="#0E9E6E" onClick={() => grade("easy")} />
        </div>
      ) : (
        <button className="btn-primary h-13 w-full py-3.5 text-[15px]" onClick={() => setRevealed(true)}>
          {t("review_show")}
        </button>
      )}
    </div>
  );
}

function StatBox({
  value,
  label,
  bg,
  border,
  color,
}: {
  value: number;
  label: string;
  bg: string;
  border: string;
  color: string;
}) {
  return (
    <div
      className="flex-1 rounded-2xl py-3 text-center"
      style={{ background: bg, border: `1px solid ${border}` }}
    >
      <div className="font-display text-xl font-900" style={{ color }}>
        {value}
      </div>
      <div className="text-[9.5px] font-bold tracking-wide text-sg-sub">{label}</div>
    </div>
  );
}

function GradeBtn({
  label,
  sub,
  border,
  bg,
  color,
  onClick,
}: {
  label: string;
  sub: string;
  border: string;
  bg: string;
  color: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex-1 rounded-2xl py-3"
      style={{ background: bg, border: `1.5px solid ${border}` }}
    >
      <div className="text-[13px] font-extrabold" style={{ color }}>
        {label}
      </div>
      <div className="text-[9px] text-sg-light">{sub}</div>
    </button>
  );
}
