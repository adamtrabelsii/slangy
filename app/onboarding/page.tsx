"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Flame,
  Lock,
  Mail,
  MessageCircle,
  Rocket,
  Sprout,
  User,
  type LucideIcon,
} from "lucide-react";
import { HandWrittenTitle } from "@/components/ui/hand-writing-text";
import { useStore } from "@/lib/store";
import type { Level } from "@/lib/types";
import { LANGUAGES, getLanguage, type LangCode } from "@/lib/content/languages";
import { hasCourse } from "@/lib/content";
import { AVATARS, avatarGrad, initials } from "@/lib/avatars";

const LEVELS: { id: Level; title: string; desc: string; icon: LucideIcon }[] = [
  { id: "beginner", title: "Beginner", desc: "Starting from scratch", icon: Sprout },
  { id: "intermediate", title: "Intermediate", desc: "Hold a basic conversation", icon: Rocket },
  { id: "advanced", title: "Advanced", desc: "Unlock slang & idioms", icon: Flame },
];

const GOALS = [
  { xp: 10, label: "Casual", sub: "5 min / day" },
  { xp: 30, label: "Regular", sub: "10 min / day" },
  { xp: 50, label: "Serious", sub: "20 min / day" },
];

const STEPS = 5;

export default function OnboardingPage() {
  const router = useRouter();
  const completeOnboarding = useStore((s) => s.completeOnboarding);
  // After a soft log-out, the store keeps the account (only `onboarded` flips to false) so
  // a returning learner can be greeted by name and re-log in with one tap.
  const previousAccount = useStore((s) => s.account);

  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [mode, setMode] = useState<"signup" | "login">(previousAccount ? "login" : "signup");
  const [name, setName] = useState(previousAccount?.name ?? "");
  const [email, setEmail] = useState(previousAccount?.email ?? "");
  const [password, setPassword] = useState("");
  const [learnFrom, setLearnFrom] = useState<LangCode>("en");
  const [learnTarget, setLearnTarget] = useState<LangCode>("es");
  const [level, setLevel] = useState<Level | null>(null);
  const [goal, setGoal] = useState(30);
  const [avatar, setAvatar] = useState(AVATARS[0].id);

  const authValid =
    email.trim().length > 3 &&
    password.length >= 4 &&
    (mode === "login" || name.trim().length > 0);

  function next() {
    setStep((s) => Math.min(STEPS - 1, s + 1));
  }
  function back() {
    setStep((s) => Math.max(0, s - 1));
  }

  function finish() {
    if (!level) return;
    const displayName = name.trim() || email.split("@")[0] || "Tú";
    completeOnboarding({
      account: { name: displayName, email: email.trim() },
      avatar,
      learnFrom,
      learnTarget,
      level,
      dailyGoalXp: goal,
    });
    router.replace("/");
  }

  if (!started) {
    return (
      <div className="flex min-h-[88vh] flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="sg-grad grid h-16 w-16 place-items-center rounded-[22px] text-white"
          style={{ boxShadow: "var(--sg-glow)" }}
        >
          <MessageCircle size={30} />
        </motion.div>

        <HandWrittenTitle
          title="Slangy"
          subtitle={
            previousAccount
              ? `Welcome back, ${previousAccount.name}`
              : "Languages, the way they're actually spoken"
          }
        />

        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          onClick={() => {
            setMode(previousAccount ? "login" : "signup");
            setStarted(true);
          }}
          className="btn-primary mt-2 h-14 w-full text-base"
        >
          {previousAccount ? "Log in" : "Get started"} <ArrowRight size={18} />
        </motion.button>
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7, duration: 0.6 }}
          onClick={() => {
            if (previousAccount) {
              setName("");
              setEmail("");
            }
            setMode(previousAccount ? "signup" : "login");
            setStarted(true);
          }}
          className="mt-3 text-sm font-bold text-sg-sub"
        >
          {previousAccount ? "Use a different account" : "I already have an account"}
        </motion.button>
      </div>
    );
  }

  return (
    <div className="flex min-h-[88vh] flex-col">
      {/* Header: brand + progress */}
      <div className="mb-6 flex items-center gap-3">
        {step > 0 ? (
          <button
            onClick={back}
            className="grid h-9 w-9 place-items-center rounded-full glass text-sg-sub"
            aria-label="Back"
          >
            <ArrowLeft size={18} />
          </button>
        ) : (
          <div
            className="sg-grad grid h-9 w-9 place-items-center rounded-xl text-white"
            style={{ boxShadow: "var(--sg-glow)" }}
          >
            <MessageCircle size={18} />
          </div>
        )}
        <div className="flex flex-1 gap-1.5">
          {Array.from({ length: STEPS }).map((_, i) => (
            <span
              key={i}
              className="h-1.5 flex-1 rounded-full transition-all"
              style={{ background: i <= step ? "var(--sg-primary)" : "rgba(251,116,39,.18)" }}
            />
          ))}
        </div>
      </div>

      <motion.div
        key={step}
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.25 }}
        className="flex flex-1 flex-col"
      >
        {step === 0 && (
          <AuthStep
            mode={mode}
            setMode={setMode}
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            valid={authValid}
            onContinue={next}
          />
        )}

        {step === 1 && (
          <LangStep
            title="I speak…"
            subtitle="Your native language — we'll teach in it."
            selected={learnFrom}
            disabledCode={undefined}
            onPick={(c) => {
              setLearnFrom(c);
              if (learnTarget === c) setLearnTarget(c === "es" ? "en" : "es");
            }}
            onContinue={next}
          />
        )}

        {step === 2 && (
          <LangStep
            title="I want to learn…"
            subtitle="Pick your target language."
            selected={learnTarget}
            disabledCode={learnFrom}
            showAvailability
            onPick={setLearnTarget}
            onContinue={next}
          />
        )}

        {step === 3 && (
          <LevelGoalStep
            level={level}
            setLevel={setLevel}
            goal={goal}
            setGoal={setGoal}
            onContinue={next}
          />
        )}

        {step === 4 && (
          <ProfileStep
            name={name.trim() || email.split("@")[0] || ""}
            avatar={avatar}
            setAvatar={setAvatar}
            learnFrom={learnFrom}
            learnTarget={learnTarget}
            onFinish={finish}
          />
        )}
      </motion.div>
    </div>
  );
}

/* ── Step 0 · Auth ────────────────────────────────── */
function AuthStep({
  mode,
  setMode,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  valid,
  onContinue,
}: {
  mode: "signup" | "login";
  setMode: (m: "signup" | "login") => void;
  name: string;
  setName: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  valid: boolean;
  onContinue: () => void;
}) {
  return (
    <div className="flex flex-1 flex-col">
      <span className="sg-grad-text font-display text-2xl font-900 tracking-tight">Slangy</span>
      <p className="tagline mt-2">Languages · the way they&rsquo;re actually spoken</p>
      <h1 className="mt-1 font-display text-[30px] font-900 leading-tight text-sg-ink">
        {mode === "signup" ? "Create your account" : "Welcome back"}
      </h1>
      <p className="mb-5 mt-1 text-sm text-sg-sub">
        {mode === "signup"
          ? "It&rsquo;s free. Your progress is saved on this device."
          : "Log in to pick up where you left off."}
      </p>

      <div className="space-y-3">
        {mode === "signup" && (
          <div className="relative">
            <User size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sg-light" />
            <input
              className="field pl-11"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}
        <div className="relative">
          <Mail size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sg-light" />
          <input
            className="field pl-11"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="relative">
          <Lock size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sg-light" />
          <input
            className="field pl-11"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <p className="mt-3 text-xs text-sg-light">
        {mode === "signup" ? "Already have an account? " : "New to Slangy? "}
        <button
          className="font-bold text-sg-primary-deep"
          onClick={() => setMode(mode === "signup" ? "login" : "signup")}
        >
          {mode === "signup" ? "Log in" : "Sign up"}
        </button>
      </p>

      <div className="mt-auto" />
      <button className="btn-primary mt-6 h-14 w-full text-base" disabled={!valid} onClick={onContinue}>
        Continue <ArrowRight size={18} />
      </button>
    </div>
  );
}

/* ── Steps 1 & 2 · Language pickers ───────────────── */
function LangStep({
  title,
  subtitle,
  selected,
  disabledCode,
  showAvailability,
  onPick,
  onContinue,
}: {
  title: string;
  subtitle: string;
  selected: LangCode;
  disabledCode?: LangCode;
  showAvailability?: boolean;
  onPick: (c: LangCode) => void;
  onContinue: () => void;
}) {
  return (
    <div className="flex flex-1 flex-col">
      <h1 className="font-display text-[30px] font-900 leading-tight text-sg-ink">{title}</h1>
      <p className="mb-5 mt-1 text-sm text-sg-sub">{subtitle}</p>

      <div className="space-y-2.5">
        {LANGUAGES.map((l) => {
          const isSel = selected === l.code;
          const disabled = disabledCode === l.code;
          const available = !showAvailability || hasCourse(l.code);
          return (
            <button
              key={l.code}
              disabled={disabled}
              onClick={() => onPick(l.code)}
              className="flex w-full items-center gap-3.5 rounded-[20px] border-2 p-3.5 text-left transition-all disabled:opacity-40"
              style={{
                background: isSel ? "rgba(251,116,39,.1)" : "rgba(255,255,255,.55)",
                borderColor: isSel ? "var(--sg-primary)" : "rgba(255,255,255,.7)",
              }}
            >
              <span
                className="grid h-12 w-12 flex-none place-items-center rounded-2xl font-display text-sm font-900 text-white"
                style={{ background: isSel ? "var(--sg-grad)" : "#D7BFA8" }}
              >
                {l.monogram}
              </span>
              <span className="flex-1" dir={l.rtl ? "rtl" : "ltr"}>
                <span className="block font-display text-[15px] font-900 text-sg-ink">
                  {l.native}
                </span>
                <span className="block text-xs text-sg-sub">{l.name}</span>
              </span>
              {showAvailability && !available && !disabled && (
                <span className="chip bg-sg-amber/15 text-[10px] text-sg-primary-deep">SOON</span>
              )}
              {isSel && (
                <span className="sg-grad grid h-6 w-6 flex-none place-items-center rounded-full text-white">
                  <Check size={14} />
                </span>
              )}
            </button>
          );
        })}
      </div>

      {showAvailability && !hasCourse(selected) && (
        <p className="mt-3 rounded-2xl bg-sg-amber/10 px-4 py-3 text-xs font-semibold text-sg-primary-deep">
          {getLanguage(selected).name} lessons are coming soon. You can still set it now and
          start with Spanish in the meantime.
        </p>
      )}

      <div className="mt-auto" />
      <button className="btn-primary mt-6 h-14 w-full text-base" onClick={onContinue}>
        Continue <ArrowRight size={18} />
      </button>
    </div>
  );
}

/* ── Step 3 · Level + goal ────────────────────────── */
function LevelGoalStep({
  level,
  setLevel,
  goal,
  setGoal,
  onContinue,
}: {
  level: Level | null;
  setLevel: (l: Level) => void;
  goal: number;
  setGoal: (g: number) => void;
  onContinue: () => void;
}) {
  return (
    <div className="flex flex-1 flex-col">
      <h1 className="font-display text-[30px] font-900 leading-tight text-sg-ink">
        Where do you start?
      </h1>
      <p className="mb-4 mt-1 text-sm text-sg-sub">We&rsquo;ll set the right pace and unlock as you climb.</p>

      <p className="section-label mb-3">Your level</p>
      <div className="space-y-2.5">
        {LEVELS.map((l) => {
          const isSel = level === l.id;
          const Ico = l.icon;
          return (
            <button
              key={l.id}
              onClick={() => setLevel(l.id)}
              className="flex w-full items-center gap-3.5 rounded-[20px] border-2 p-3.5 text-left transition-all"
              style={{
                background: isSel ? "rgba(251,116,39,.1)" : "rgba(255,255,255,.55)",
                borderColor: isSel ? "var(--sg-primary)" : "rgba(255,255,255,.7)",
              }}
            >
              <span
                className="grid h-11 w-11 flex-none place-items-center rounded-2xl text-white"
                style={{ background: isSel ? "var(--sg-grad)" : "#D7BFA8" }}
              >
                <Ico size={20} />
              </span>
              <span className="flex-1">
                <span className="block font-display text-[15px] font-900 text-sg-ink">{l.title}</span>
                <span className="block text-xs text-sg-sub">{l.desc}</span>
              </span>
              {isSel && (
                <span className="sg-grad grid h-6 w-6 flex-none place-items-center rounded-full text-white">
                  <Check size={14} />
                </span>
              )}
            </button>
          );
        })}
      </div>

      <p className="section-label mb-2.5 mt-5">Daily goal</p>
      <div className="flex gap-2">
        {GOALS.map((g) => {
          const isSel = goal === g.xp;
          return (
            <button
              key={g.xp}
              onClick={() => setGoal(g.xp)}
              className="flex-1 rounded-2xl border-2 py-3 text-center transition-all"
              style={{
                background: isSel ? "rgba(251,116,39,.12)" : "rgba(255,255,255,.55)",
                borderColor: isSel ? "var(--sg-primary)" : "rgba(255,255,255,.7)",
              }}
            >
              <div className="font-display text-sm font-900 text-sg-ink">{g.label}</div>
              <div className="text-[10px] text-sg-sub">{g.sub}</div>
            </button>
          );
        })}
      </div>

      <div className="mt-auto" />
      <button className="btn-primary mt-6 h-14 w-full text-base" disabled={!level} onClick={onContinue}>
        Continue <ArrowRight size={18} />
      </button>
    </div>
  );
}

/* ── Step 4 · Profile setup ───────────────────────── */
function ProfileStep({
  name,
  avatar,
  setAvatar,
  learnFrom,
  learnTarget,
  onFinish,
}: {
  name: string;
  avatar: string;
  setAvatar: (id: string) => void;
  learnFrom: LangCode;
  learnTarget: LangCode;
  onFinish: () => void;
}) {
  const from = getLanguage(learnFrom);
  const target = getLanguage(learnTarget);
  return (
    <div className="flex flex-1 flex-col">
      <h1 className="font-display text-[30px] font-900 leading-tight text-sg-ink">
        Set up your profile
      </h1>
      <p className="mb-5 mt-1 text-sm text-sg-sub">Almost there — make it yours.</p>

      <div className="flex flex-col items-center">
        <div
          className="grid h-24 w-24 place-items-center rounded-[28px] font-display text-3xl font-900 text-white"
          style={{ background: avatarGrad(avatar), boxShadow: "var(--sg-glow)" }}
        >
          {initials(name || "Tú")}
        </div>
        <div className="mt-4 font-display text-lg font-900 text-sg-ink">{name || "Tú"}</div>
      </div>

      <p className="section-label mb-2.5 mt-6">Choose a color</p>
      <div className="flex flex-wrap gap-2.5">
        {AVATARS.map((a) => (
          <button
            key={a.id}
            onClick={() => setAvatar(a.id)}
            className="h-12 w-12 rounded-2xl transition-transform active:scale-95"
            style={{
              background: a.grad,
              outline: avatar === a.id ? "3px solid var(--sg-primary)" : "none",
              outlineOffset: "2px",
            }}
            aria-label={`Avatar ${a.id}`}
          />
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-3 rounded-2xl glass px-4 py-3 text-sm font-bold text-sg-ink">
        <span dir={from.rtl ? "rtl" : "ltr"}>{from.native}</span>
        <ArrowRight size={16} className="text-sg-primary" />
        <span dir={target.rtl ? "rtl" : "ltr"}>{target.native}</span>
      </div>

      <div className="mt-auto" />
      <button className="btn-primary mt-6 h-14 w-full text-base" onClick={onFinish}>
        Start learning <ArrowRight size={18} />
      </button>
    </div>
  );
}
