// Shared domain types for Slangy.

export type Level = "beginner" | "intermediate" | "advanced";

export const LEVEL_ORDER: Level[] = ["beginner", "intermediate", "advanced"];

export function levelAtLeast(have: Level, need: Level): boolean {
  return LEVEL_ORDER.indexOf(have) >= LEVEL_ORDER.indexOf(need);
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

export interface Skill {
  id: string;
  title: string;
  /** Short subtitle / theme. */
  blurb: string;
  icon: string; // lucide icon name
  color: string; // tailwind-ish accent for the node
  minLevel: Level;
  /** True for "real talk" slang skills (advanced-gated, visually badged). */
  slang?: boolean;
  lessons: Lesson[];
}

export interface Unit {
  id: string;
  title: string;
  description: string;
  skills: Skill[];
}

export interface Course {
  id: string;
  language: string;
  from: string;
  units: Unit[];
}

// ---- SRS model -----------------------------------------------------------

export interface SrsCard {
  itemId: string;
  /** Spanish term. */
  es: string;
  /** English meaning. */
  en: string;
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
