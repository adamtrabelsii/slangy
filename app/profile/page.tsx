"use client";

import { Flame, Star, BookOpen, Target, Mic, ArrowRight } from "lucide-react";
import { useStore } from "@/lib/store";
import { countDue } from "@/lib/srs";
import { XP_FOR_LEVEL, nextLevel, levelAtLeast } from "@/lib/types";
import { getLanguage } from "@/lib/content/languages";
import { avatarGrad, initials } from "@/lib/avatars";
import { useT } from "@/lib/i18n";

export default function ProfilePage() {
  const hydrated = useStore((s) => s.hydrated);
  const xp = useStore((s) => s.xp);
  const streak = useStore((s) => s.streak);
  const level = useStore((s) => s.level);
  const cards = useStore((s) => s.cards);
  const dailyGoalXp = useStore((s) => s.dailyGoalXp);
  const todayXp = useStore((s) => s.todayXp);
  const account = useStore((s) => s.account);
  const avatar = useStore((s) => s.avatar);
  const learnFrom = useStore((s) => s.learnFrom);
  const learnTarget = useStore((s) => s.learnTarget);
  const reset = useStore((s) => s.reset);
  const t = useT();
  const levelLabel = (l: typeof level) => t(`level_${l}`);

  if (!hydrated) return <div className="py-20 text-center text-sg-sub">{t("loading")}</div>;

  const name = account?.name ?? "Tú";
  const wordsLearned = Object.keys(cards).length;
  const mastered = Object.values(cards).filter((c) => c.interval >= 6).length;
  const from = getLanguage(learnFrom);
  const target = getLanguage(learnTarget);

  // Earned-level progress toward the next tier.
  const next = nextLevel(level);
  const floor = XP_FOR_LEVEL[level];
  const targetXp = next ? XP_FOR_LEVEL[next] : floor;
  const levelPct = next ? Math.min(100, Math.round(((xp - floor) / (targetXp - floor)) * 100)) : 100;
  const xpToNext = next ? Math.max(0, targetXp - xp) : 0;
  const isAdvanced = levelAtLeast(level, "advanced");

  return (
    <div className="-mx-5 -mt-6">
      {/* Header */}
      <div
        className="px-5 pb-5 pt-8"
        style={{
          background: "linear-gradient(160deg,rgba(251,116,39,.18),rgba(245,158,11,.16))",
          borderBottom: "1px solid rgba(255,255,255,.6)",
        }}
      >
        <div className="flex items-center gap-3.5">
          <div
            className="grid h-16 w-16 place-items-center rounded-[22px] font-display text-2xl font-900 text-white"
            style={{ background: avatarGrad(avatar), boxShadow: "var(--sg-glow)" }}
          >
            {initials(name)}
          </div>
          <div className="flex-1">
            <div className="font-display text-xl font-900 text-sg-ink">{name}</div>
            {account?.email && <div className="text-xs text-sg-sub">{account.email}</div>}
            <div className="mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-sg-amber/15 px-2.5 py-1 text-[11px] font-extrabold text-sg-primary-deep">
              {levelLabel(level)}
              <span className="opacity-50">·</span>
              <span dir={from.rtl ? "rtl" : "ltr"}>{from.native}</span>
              <ArrowRight size={11} />
              <span dir={target.rtl ? "rtl" : "ltr"}>{target.native}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 pt-5">
        {/* Stat grid */}
        <div className="mb-5 grid grid-cols-2 gap-3">
          <StatCard icon={Flame} value={streak} label={t("stat_streak")} bg="rgba(234,88,12,.1)" border="rgba(234,88,12,.28)" color="#EA580C" />
          <StatCard icon={Star} value={xp.toLocaleString()} label={t("stat_xp")} bg="rgba(245,158,11,.14)" border="rgba(245,158,11,.32)" color="#B45309" />
          <StatCard icon={BookOpen} value={wordsLearned} label={t("stat_words")} bg="rgba(251,116,39,.1)" border="rgba(251,116,39,.28)" color="#FB7427" />
          <StatCard icon={Target} value={mastered} label={t("stat_mastered")} bg="rgba(14,158,110,.12)" border="rgba(14,158,110,.3)" color="#0E9E6E" />
        </div>

        {/* Daily goal */}
        <div className="card mb-5 p-4">
          <div className="flex items-center justify-between text-xs font-bold text-sg-sub">
            <span>{t("profile_today")}</span>
            <span>
              {todayXp}/{dailyGoalXp} XP
            </span>
          </div>
          <div className="mt-2 h-3 overflow-hidden rounded-full bg-sg-line">
            <div
              className="sg-grad h-full rounded-full"
              style={{ width: `${Math.min(100, (todayXp / dailyGoalXp) * 100)}%` }}
            />
          </div>
        </div>

        {/* Progress to next level */}
        <p className="section-label mb-2">{t("profile_levelProgress")}</p>
        <div className="card mb-5 p-4">
          {next ? (
            <>
              <div className="mb-2 flex justify-between text-xs font-bold">
                <span className="text-sg-sub">{levelLabel(level)}</span>
                <span className="text-sg-primary-deep">
                  {t("profile_xpToNext", { n: xpToNext, level: levelLabel(next) })}
                </span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-sg-line">
                <div className="sg-grad h-full rounded-full" style={{ width: `${levelPct}%` }} />
              </div>
            </>
          ) : (
            <p className="text-sm text-sg-sub">{t("profile_maxLevel")}</p>
          )}
        </div>

        {/* Achievements */}
        <p className="section-label mb-2">{t("profile_achievements")}</p>
        <div className="mb-6 flex gap-2.5">
          <Badge icon={Flame} label={t("profile_streakBadge", { n: streak })} earned={streak > 0} />
          <Badge icon={BookOpen} label={t("profile_wordsBadge", { n: wordsLearned })} earned={wordsLearned > 0} />
          <Badge icon={Mic} label={t("profile_slangPro")} earned={isAdvanced} />
        </div>

        <button
          onClick={() => {
            if (confirm(t("profile_resetConfirm"))) reset();
          }}
          className="text-sm font-bold text-sg-primary-deep"
        >
          {t("profile_reset")}
        </button>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  value,
  label,
  bg,
  border,
  color,
}: {
  icon: typeof Flame;
  value: string | number;
  label: string;
  bg: string;
  border: string;
  color: string;
}) {
  return (
    <div className="rounded-[18px] p-4" style={{ background: bg, border: `1px solid ${border}` }}>
      <Icon size={22} style={{ color }} />
      <div className="mt-1.5 font-display text-2xl font-900" style={{ color }}>
        {value}
      </div>
      <div className="text-[11px] font-bold text-sg-sub">{label}</div>
    </div>
  );
}

function Badge({
  icon: Icon,
  label,
  earned,
}: {
  icon: typeof Flame;
  label: string;
  earned: boolean;
}) {
  return (
    <div
      className={`flex-1 rounded-2xl py-3.5 text-center ${earned ? "glass" : "glass-soft"}`}
      style={earned ? {} : { border: "1px dashed rgba(234,88,12,.3)", opacity: 0.55 }}
    >
      <Icon size={22} className="mx-auto" style={{ color: earned ? "#EA580C" : "#B8A698" }} />
      <div className={`mt-1.5 text-[10px] font-bold ${earned ? "text-sg-sub" : "text-sg-light"}`}>
        {label}
      </div>
    </div>
  );
}
