// Shared domain types for Slangy.

import type { LangCode } from "@/lib/content/languages";

export type Level = "beginner" | "intermediate" | "advanced";

export const LEVEL_ORDER: Level[] = ["beginner", "intermediate", "advanced"];

export function levelAtLeast(have: Level, need: Level): boolean {
  return LEVEL_ORDER.indexOf(have) >= LEVEL_ORDER.indexOf(need);
}

/** Total XP needed to *earn* each level. Tuned to be reachable with current content. */
export const XP_FOR_LEVEL: Record<Level, number> = {
  beginner: 0,
  intermediate: 50,
  advanced: 150,
};

/** The level a learner has earned purely from their total XP. */
export function levelForXp(xp: number): Level {
  if (xp >= XP_FOR_LEVEL.advanced) return "advanced";
  if (xp >= XP_FOR_LEVEL.intermediate) return "intermediate";
  return "beginner";
}

/** The next level up, or null if already at the top. */
export function nextLevel(level: Level): Level | null {
  const i = LEVEL_ORDER.indexOf(level);
  return i < LEVEL_ORDER.length - 1 ? LEVEL_ORDER[i + 1] : null;
}

/** Return the higher of two levels. */
export function maxLevel(a: Level, b: Level): Level {
  return LEVEL_ORDER.indexOf(a) >= LEVEL_ORDER.indexOf(b) ? a : b;
}

// ---- Content model -------------------------------------------------------

export type ExerciseKind =
  | "multipleChoice" // choose the correct translation/answer
  | "translate" // type the translation
  | "wordBank" // assemble a sentence from word tiles
  | "listen" // hear Spanish (TTS), choose what you heard
  | "match"; // match Spanish ↔ English pairs

export interface BaseExercise {
  id: string;
  kind: ExerciseKind;
  /** The vocab/phrase item this exercise reinforces, used by the SRS engine. */
  itemId: string;
}

export interface MultipleChoiceExercise extends BaseExercise {
  kind: "multipleChoice";
  prompt: string; // e.g. "How do you say 'the house'?"
  /** Spanish audio to optionally play, if any. */
  audio?: string;
  choices: string[];
  answer: string; // must be one of choices
}

export interface TranslateExercise extends BaseExercise {
  kind: "translate";
  prompt: string; // sentence to translate
  direction: "es-en" | "en-es";
  answers: string[]; // accepted answers (normalized compare)
  hint?: string;
}

export interface WordBankExercise extends BaseExercise {
  kind: "wordBank";
  prompt: string; // English sentence to build in Spanish
  /** Correct ordering of tiles. */
  answer: string[];
  /** Distractor tiles mixed in. */
  distractors: string[];
}

export interface ListenExercise extends BaseExercise {
  kind: "listen";
  audio: string; // Spanish text spoken via TTS
  choices: string[]; // what was said, in Spanish
  answer: string;
  translation: string; // English meaning, shown after answering
}

export interface MatchExercise extends BaseExercise {
  kind: "match";
  pairs: { es: string; en: string }[];
}

export type Exercise =
  | MultipleChoiceExercise
  | TranslateExercise
  | WordBankExercise
  | ListenExercise
  | MatchExercise;

export interface Lesson {
  id: string;
  exercises: Exercise[];
}

// ---- Vocab-driven course model -------------------------------------------
// Courses are authored as vocab lists; lessons/exercises are GENERATED from
// them (see lib/content/generate.ts) so every course works in any native
// language automatically — the meaning ("gloss") is localized per learner.

/** A word/phrase taught by a course. `gloss.en` is required as the pivot;
 * other native-language meanings are optional and fall back to English. */
export type Gloss = Partial<Record<LangCode, string>> & { en: string };

export interface VocabItem {
  /** Globally unique, namespaced by target language, e.g. "es:hola". */
  id: string;
  /** The target-language word/phrase — what is taught and spoken aloud. */
  term: string;
  /** Meaning shown to the learner, by their native language. */
  gloss: Gloss;
  /** Optional romanization for non-Latin scripts (shown as a pronunciation hint). */
  roman?: string;
  slang?: boolean;
}

export interface Skill {
  /** Unique, namespaced by target, e.g. "es-basics". */
  id: string;
  title: string;
  /** Short subtitle / theme. */
  blurb: string;
  icon: string; // lucide icon name
  color: string; // accent for the node
  minLevel: Level;
  /** True for "real talk" slang skills (advanced-gated, visually badged). */
  slang?: boolean;
  items: VocabItem[];
}

export interface Unit {
  id: string;
  title: string;
  description: string;
  skills: Skill[];
}

export interface Course {
  target: LangCode;
  units: Unit[];
}

// ---- SRS model -----------------------------------------------------------

export interface SrsCard {
  itemId: string;
  /** The target-language term (front of the card). */
  term: string;
  /** Localized meanings by native language (back of the card). */
  gloss: Gloss;
  /** Optional romanization hint. */
  roman?: string;
  /** SM-2 ease factor. */
  ease: number;
  /** Current interval in days. */
  interval: number;
  /** Consecutive correct count. */
  reps: number;
  /** ISO date string for next due review. */
  due: string;
  /** Times seen. */
  seen: number;
  lapses: number;
}

export type Grade = "again" | "hard" | "good" | "easy";

// ---- AI tutor ------------------------------------------------------------

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface Scenario {
  id: string;
  title: string;
  emoji: string;
  description: string;
  /** Minimum level recommended; slang scenarios are advanced. */
  level: Level;
  slang?: boolean;
  /** System framing for the tutor. */
  setup: string;
}

export interface TutorReply {
  reply: string;
  /** Optional gentle correction of the learner's last message. */
  correction?: { original: string; fixed: string; note: string } | null;
  /** True when produced by the local fallback simulator (no API key). */
  simulated: boolean;
}
