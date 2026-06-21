"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Flame, Gem, Heart, Check, Lock, Brain, ArrowRight, Sparkles } from "lucide-react";
import { SPANISH_COURSE, ALL_SKILLS } from "@/lib/content/spanish";
import { levelAtLeast, type Level, type Skill, type Unit } from "@/lib/types";
import { getLanguage, hasCourse } from "@/lib/content/languages";
import { useStore } from "@/lib/store";
import { countDue } from "@/lib/srs";
import { Icon } from "@/components/Icon";

// Warm accent per unit along the route.
const UNIT_ACCENTS = ["#F59E0B", "#FB7427", "#EA580C", "#C2410C"];

export default function HomePage() {
  const router = useRouter();
  const hydrated = useStore((s) => s.hydrated);
  const onboarded = useStore((s) => s.onboarded);
  const level = useStore((s) => s.level);
  const learnTarget = useStore((s) => s.learnTarget);
  const setTarget = useStore((s) => s.setTarget);
  const completed = useStore((s) => s.completedSkills);
  const cards = useStore((s) => s.cards);
  const todayXp = useStore((s) => s.todayXp);
  const dailyGoalXp = useStore((s) => s.dailyGoalXp);
  const streak = useStore((s) => s.streak);
  const gems = useStore((s) => s.gems);
  const hearts = useStore((s) => s.hearts);

  useEffect(() => {
    if (hydrated && !onboarded) router.replace("/onboarding");
  }, [hydrated, onboarded, router]);

  if (!hydrated || !onboarded) {
    return <div className="py-20 text-center text-sg-sub">Cargando…</div>;
  }

  const due = countDue(cards);
  const target = getLanguage(learnTarget);

  // The single "you are here" skill: first unlocked, not-yet-completed skill.
  const current = ALL_SKILLS.find(
    (s) => levelAtLeast(level, s.minLevel) && !(completed[s.id] > 0)
  );

  return (
    <div className="-mx-5 -mt-6">
      {/* HUD */}
      <div className="sticky top-0 z-10 flex items-center gap-2 glass-strong px-4 py-3">
        <Pill bg="rgba(234,88,12,.12)" border="rgba(234,88,12,.3)" color="#EA580C">
          <Flame size={14} /> {streak}
        </Pill>
        <Pill bg="rgba(245,158,11,.14)" border="rgba(245,158,11,.35)" color="#B45309">
          <Gem size={13} /> {gems}
        </Pill>
        <Pill bg="rgba(224,83,63,.12)" border="rgba(224,83,63,.3)" color="#C23B29">
          <Heart size={13} /> {hearts}
        </Pill>
        <div className="ml-auto flex flex-col items-end">
          <span className="text-[9px] font-extrabold tracking-wider text-sg-light">META DIARIA</span>
          <span className="text-[11px] font-extrabold text-sg-primary-deep">
            {todayXp} / {dailyGoalXp} XP
          </span>
        </div>
      </div>

      <div className="px-5 pt-5">
        <p className="tagline">Camino de {target.native}</p>
        <h1 className="mb-1 font-display text-3xl font-900 text-sg-ink">Sigue aprendiendo</h1>

        {!hasCourse(learnTarget) ? (
          <ComingSoon langName={target.name} onSwitch={() => setTarget("es")} />
        ) : (
          <>
            <Link
              href="/review"
              className="mb-3 mt-4 flex items-center justify-between rounded-2xl glass px-4 py-3"
            >
              <span className="flex items-center gap-2 text-sm font-extrabold text-sg-sub">
                <Brain size={16} className="text-sg-primary" /> Repaso ·{" "}
                <span className="text-sg-primary-deep">{due} pendientes</span>
              </span>
              <ArrowRight size={16} className="text-sg-primary-deep" />
            </Link>

            {/* LA RUTA timeline */}
            <div className="relative pt-2">
              <div
                className="absolute bottom-7 left-[33px] top-7 w-[3px] rounded"
                style={{
                  background: "linear-gradient(180deg,#F59E0B,#FB7427 50%,#C2410C)",
                  opacity: 0.3,
                }}
              />
              {SPANISH_COURSE.units.map((unit, ui) => (
                <UnitBlock
                  key={unit.id}
                  unit={unit}
                  index={ui}
                  accent={UNIT_ACCENTS[ui % UNIT_ACCENTS.length]}
                  level={level}
                  completed={completed}
                  currentId={current?.id}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function ComingSoon({ langName, onSwitch }: { langName: string; onSwitch: () => void }) {
  return (
    <div className="card mt-4 p-6 text-center">
      <div className="sg-grad mx-auto grid h-14 w-14 place-items-center rounded-2xl text-white" style={{ boxShadow: "var(--sg-glow)" }}>
        <Sparkles size={26} />
      </div>
      <h2 className="mt-4 font-display text-xl font-900 text-sg-ink">{langName} llega pronto</h2>
      <p className="mx-auto mt-1 max-w-xs text-sm text-sg-sub">
        Estamos creando el curso de {langName}. Mientras tanto, empieza con Español — está
        completo y listo.
      </p>
      <button onClick={onSwitch} className="btn-primary mx-auto mt-5">
        Empezar con Español <ArrowRight size={18} />
      </button>
    </div>
  );
}

function Pill({
  children,
  bg,
  border,
  color,
}: {
  children: React.ReactNode;
  bg: string;
  border: string;
  color: string;
}) {
  return (
    <span
      className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[13px] font-extrabold"
      style={{ background: bg, border: `1px solid ${border}`, color }}
    >
      {children}
    </span>
  );
}

function UnitBlock({
  unit,
  index,
  accent,
  level,
  completed,
  currentId,
}: {
  unit: Unit;
  index: number;
  accent: string;
  level: Level;
  completed: Record<string, number>;
  currentId?: string;
}) {
  const doneCount = unit.skills.filter((s) => completed[s.id] > 0).length;
  const allDone = doneCount === unit.skills.length;

  return (
    <div>
      <div className={`flex items-center gap-2.5 ${index === 0 ? "mb-3.5" : "mb-3.5 mt-5"}`}>
        <span className="text-[10px] font-900 uppercase tracking-[1.5px]" style={{ color: accent }}>
          {unit.title}
        </span>
        <span className="h-px flex-1 bg-sg-line" />
        <span className="text-[10px] font-extrabold" style={{ color: accent }}>
          {doneCount}/{unit.skills.length}
          {allDone ? " ✓" : ""}
        </span>
      </div>

      {unit.skills.map((skill) => (
        <SkillRow
          key={skill.id}
          skill={skill}
          accent={accent}
          unlocked={levelAtLeast(level, skill.minLevel)}
          done={completed[skill.id] > 0}
          isCurrent={skill.id === currentId}
        />
      ))}
    </div>
  );
}

function SkillRow({
  skill,
  accent,
  unlocked,
  done,
  isCurrent,
}: {
  skill: Skill;
  accent: string;
  unlocked: boolean;
  done: boolean;
  isCurrent: boolean;
}) {
  // Slang skills get the special "real talk" card.
  if (skill.slang) {
    return (
      <div className="relative mb-3.5 flex w-full items-center gap-3.5">
        <div
          className="z-[1] grid h-14 w-14 flex-none place-items-center rounded-[18px] text-white"
          style={{
            background: "linear-gradient(145deg,#EA580C,#9A3412)",
            boxShadow: "0 8px 16px rgba(154,52,18,.28)",
          }}
        >
          <Icon name={skill.icon} size={24} />
        </div>
        <div className="sg-grad-soft flex-1 rounded-[18px] p-3.5" style={{ border: "1.5px dashed rgba(234,88,12,.35)" }}>
          <div className="font-display text-sm font-900 text-sg-ink">{skill.title}</div>
          {unlocked ? (
            <Link
              href={`/lesson/${skill.id}`}
              className="sg-grad mt-2 inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 text-xs font-extrabold text-white"
              style={{ boxShadow: "var(--sg-glow)" }}
            >
              Desbloqueado — empezar <ArrowRight size={13} />
            </Link>
          ) : (
            <div className="mt-1 flex items-center gap-1 text-[11px] text-sg-sub">
              <Lock size={11} /> Llega a <b className="text-sg-primary-deep">Avanzado</b> para hablar como un local.
            </div>
          )}
        </div>
      </div>
    );
  }

  const node = (
    <>
      <div
        className="relative z-[1] grid flex-none place-items-center rounded-[18px] text-white"
        style={
          isCurrent
            ? { width: 60, height: 60, background: "var(--sg-grad)", boxShadow: "var(--sg-glow)" }
            : done
            ? {
                width: 54,
                height: 54,
                background: "linear-gradient(145deg,#FDBA74,#F59E0B)",
                boxShadow: "0 8px 14px rgba(245,158,11,.3)",
              }
            : unlocked
            ? { width: 54, height: 54, background: `linear-gradient(145deg,${accent},${accent})`, boxShadow: `0 8px 14px ${accent}40` }
            : { width: 54, height: 54, background: "#E7D6C5" }
        }
      >
        <span
          className={isCurrent ? "animate-pulse2 grid h-full w-full place-items-center rounded-[18px]" : "grid place-items-center"}
        >
          {unlocked ? (
            <Icon name={skill.icon} size={isCurrent ? 28 : 24} />
          ) : (
            <Lock size={22} className="text-sg-light" />
          )}
        </span>
        {done && (
          <span className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-white text-sg-amber shadow">
            <Check size={13} strokeWidth={3} />
          </span>
        )}
      </div>

      {isCurrent ? (
        <div className="flex-1 rounded-[18px] bg-white p-3.5" style={{ border: "2px solid var(--sg-primary)", boxShadow: "var(--sg-glow)" }}>
          <div className="flex items-center justify-between gap-2">
            <div className="font-display text-[15px] font-900 text-sg-ink">{skill.title}</div>
            <span className="sg-grad flex flex-none items-center gap-1 rounded-full px-3 py-1.5 text-[9px] font-900 tracking-wide text-white">
              EMPEZAR <ArrowRight size={11} />
            </span>
          </div>
          <div className="mt-1 text-[11px] font-bold text-sg-primary-deep">
            Estás aquí · {skill.blurb}
          </div>
        </div>
      ) : (
        <div
          className={`flex-1 rounded-2xl px-3.5 py-3 ${unlocked ? "glass" : "glass-soft flex items-center justify-between"}`}
        >
          <div>
            <div className={`text-sm font-extrabold ${unlocked ? "text-sg-ink" : "text-sg-light"}`}>
              {skill.title}
            </div>
            <div
              className={`mt-0.5 flex items-center gap-1 text-[11px] font-bold ${
                done ? "text-sg-primary-deep" : unlocked ? "text-sg-sub" : "text-sg-light"
              }`}
            >
              {done ? (
                <>
                  <Check size={11} strokeWidth={3} /> Completada
                </>
              ) : unlocked ? (
                skill.blurb
              ) : (
                "Bloqueado"
              )}
            </div>
          </div>
          {!unlocked && <Lock size={14} className="text-sg-light" />}
        </div>
      )}
    </>
  );

  if (unlocked) {
    return (
      <Link href={`/lesson/${skill.id}`} className="relative mb-3.5 flex w-full items-center gap-3.5">
        {node}
      </Link>
    );
  }
  return <div className="relative mb-3.5 flex w-full items-center gap-3.5 opacity-60">{node}</div>;
}
