"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SPANISH_COURSE, ALL_SKILLS } from "@/lib/content/spanish";
import { levelAtLeast, type Level, type Skill, type Unit } from "@/lib/types";
import { useStore } from "@/lib/store";
import { countDue } from "@/lib/srs";
import { Icon } from "@/components/Icon";

// Accent colors per unit position along the route.
const UNIT_ACCENTS = ["#0E9E79", "#F1485B", "#7C3AED", "#3B6FE8"];

export default function HomePage() {
  const router = useRouter();
  const hydrated = useStore((s) => s.hydrated);
  const onboarded = useStore((s) => s.onboarded);
  const level = useStore((s) => s.level);
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

  // The single "you are here" skill: first unlocked, not-yet-completed skill.
  const current = ALL_SKILLS.find(
    (s) => levelAtLeast(level, s.minLevel) && !(completed[s.id] > 0)
  );

  return (
    <div className="-mx-5 -mt-6">
      {/* HUD */}
      <div className="sticky top-0 z-10 flex items-center gap-2 glass-40 px-4 py-3">
        <Pill bg="rgba(255,139,61,.16)" border="rgba(255,139,61,.4)" color="#E8722A">
          <span className="animate-flame inline-block text-sm">🔥</span>
          {streak}
        </Pill>
        <Pill bg="rgba(124,58,237,.14)" border="rgba(124,58,237,.35)" color="#7C3AED">
          💎 {gems}
        </Pill>
        <Pill bg="rgba(255,84,112,.14)" border="rgba(255,84,112,.4)" color="#E8425E">
          ❤️ {hearts}
        </Pill>
        <div className="ml-auto flex flex-col items-end">
          <span className="text-[9px] font-extrabold tracking-wider text-sg-light">
            DAILY GOAL
          </span>
          <span className="text-[11px] font-extrabold text-sg-coral-deep">
            {todayXp} / {dailyGoalXp} XP
          </span>
        </div>
      </div>

      <div className="px-5 pt-5">
        <p className="tagline">Camino de español</p>
        <h1 className="mb-1 font-display text-3xl font-900 text-sg-ink">Sigue aprendiendo</h1>

        <Link
          href="/review"
          className="mb-3 mt-4 flex items-center justify-between rounded-2xl glass px-4 py-3"
        >
          <span className="text-sm font-extrabold text-sg-sub">
            🧠 Repaso · <span className="text-sg-violet">{due} due</span>
          </span>
          <span className="text-xs font-extrabold text-sg-violet">Repasar →</span>
        </Link>

        {/* LA RUTA timeline */}
        <div className="relative pt-2">
          <div
            className="absolute bottom-7 left-[33px] top-7 w-[3px] rounded"
            style={{
              background:
                "linear-gradient(180deg,#16C79A,#FF6B5B 48%,#7C3AED)",
              opacity: 0.35,
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
      </div>
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
        <span
          className="text-[10px] font-900 uppercase tracking-[1.5px]"
          style={{ color: accent }}
        >
          {unit.title}
        </span>
        <span className="h-px flex-1 bg-sg-light/30" />
        <span className="text-[10px] font-extrabold" style={{ color: accent }}>
          {allDone ? `${doneCount}/${unit.skills.length} ✓` : `${doneCount}/${unit.skills.length}`}
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
  // Slang skills get the special dashed "real talk" card treatment.
  if (skill.slang) {
    return (
      <div className="relative mb-3.5 flex w-full items-center gap-3.5">
        <div
          className="z-[1] grid h-14 w-14 flex-none place-items-center rounded-[18px] text-white"
          style={{
            background: unlocked
              ? "linear-gradient(145deg,#9333EA,#6B21A8)"
              : "linear-gradient(145deg,#9333EA,#6B21A8)",
            boxShadow: "0 5px 0 #4c1d95,0 9px 14px rgba(124,58,237,.32)",
          }}
        >
          <Icon name={skill.icon} size={24} />
        </div>
        <div
          className="sg-grad-soft flex-1 rounded-[18px] p-3.5"
          style={{ border: "1.5px dashed rgba(124,58,237,.35)" }}
        >
          <div className="font-display text-sm font-900 text-sg-ink">{skill.title}</div>
          {unlocked ? (
            <Link
              href={`/lesson/${skill.id}`}
              className="sg-grad mt-2 inline-block rounded-full px-3.5 py-1.5 text-xs font-extrabold text-white"
              style={{ boxShadow: "var(--sg-glow-coral)" }}
            >
              Desbloqueado — empezar ✦
            </Link>
          ) : (
            <div className="mt-1 text-[11px] leading-[15px] text-sg-sub">
              🔒 Llega a <b className="text-sg-violet">Avanzado</b> para hablar como un local.
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
            ? {
                width: 60,
                height: 60,
                background: "var(--sg-grad)",
                boxShadow: "var(--sg-glow-coral)",
              }
            : done
            ? {
                width: 54,
                height: 54,
                background: "linear-gradient(145deg,#3FE3B4,#0E9E79)",
                boxShadow: "0 5px 0 #0E9E79,0 9px 14px rgba(22,199,154,.32)",
              }
            : unlocked
            ? {
                width: 54,
                height: 54,
                background: `linear-gradient(145deg,${accent},${accent})`,
                boxShadow: `0 5px 0 ${accent}99`,
              }
            : { width: 54, height: 54, background: "#cfd4e6" }
        }
      >
        <span className={isCurrent ? "animate-pulse2 grid h-full w-full place-items-center rounded-[18px]" : ""}>
          {unlocked ? (
            <Icon name={skill.icon} size={isCurrent ? 28 : 24} />
          ) : (
            <span className="text-[22px]">🔒</span>
          )}
        </span>
        {done && (
          <span className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-white text-[11px] text-sg-mint-deep shadow">
            ✓
          </span>
        )}
      </div>

      {isCurrent ? (
        <div
          className="flex-1 rounded-[18px] bg-white p-3.5"
          style={{ border: "2px solid #FF6B5B", boxShadow: "var(--sg-glow-coral)" }}
        >
          <div className="flex items-center justify-between gap-2">
            <div className="font-display text-[15px] font-900 text-sg-ink">{skill.title}</div>
            <span className="sg-grad flex-none rounded-full px-3 py-1.5 text-[9px] font-900 tracking-wide text-white">
              EMPEZAR →
            </span>
          </div>
          <div className="mt-1 text-[11px] font-bold text-sg-coral-deep">
            Estás aquí · {skill.blurb}
          </div>
        </div>
      ) : (
        <div
          className={`flex-1 rounded-2xl px-3.5 py-3 ${unlocked ? "glass" : "glass-25 flex items-center justify-between"}`}
        >
          <div>
            <div
              className={`text-sm font-extrabold ${unlocked ? "text-sg-ink" : "text-sg-light"}`}
            >
              {skill.title}
            </div>
            <div
              className={`mt-0.5 text-[11px] font-bold ${
                done ? "text-sg-mint-deep" : unlocked ? "text-sg-sub" : "text-sg-light"
              }`}
            >
              {done ? "Completada ✓" : unlocked ? skill.blurb : "Bloqueado"}
            </div>
          </div>
          {!unlocked && <span className="text-sm">🔒</span>}
        </div>
      )}
    </>
  );

  if (unlocked) {
    return (
      <Link
        href={`/lesson/${skill.id}`}
        className="relative mb-3.5 flex w-full items-center gap-3.5"
      >
        {node}
      </Link>
    );
  }
  return (
    <div className="relative mb-3.5 flex w-full items-center gap-3.5 opacity-60">{node}</div>
  );
}
