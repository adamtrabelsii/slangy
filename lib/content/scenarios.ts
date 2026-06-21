import type { Scenario } from "@/lib/types";

export const SCENARIOS: Scenario[] = [
  {
    id: "cafe",
    title: "At the Café",
    emoji: "☕",
    description: "Order a coffee and a snack, ask for the bill.",
    level: "beginner",
    setup:
      "You are a friendly barista at a café in Madrid. The learner is a customer ordering. Keep it simple and warm.",
  },
  {
    id: "directions",
    title: "Lost in the City",
    emoji: "🗺️",
    description: "Ask a local for directions to the train station.",
    level: "intermediate",
    setup:
      "You are a helpful local on the street. The learner is a tourist asking for directions to la estación de tren.",
  },
  {
    id: "market",
    title: "At the Market",
    emoji: "🍅",
    description: "Haggle over fruit and practice numbers and prices.",
    level: "intermediate",
    setup:
      "You are a market vendor selling fruit and vegetables. Encourage the learner to ask prices and quantities.",
  },
  {
    id: "introductions",
    title: "Meeting Someone New",
    emoji: "👋",
    description: "Introduce yourself, your name, and where you're from.",
    level: "beginner",
    setup:
      "You are a friendly person meeting the learner for the first time at a language exchange. Ask their name, where they're from, and what they do. Keep sentences short and beginner-friendly.",
  },
  {
    id: "doctor",
    title: "At the Doctor",
    emoji: "🩺",
    description: "Describe symptoms and understand simple advice.",
    level: "intermediate",
    setup:
      "You are a calm doctor at a clinic. The learner is a patient describing how they feel. Ask about symptoms (¿qué te duele?) and give simple advice. Be patient and reassuring.",
  },
  {
    id: "interview",
    title: "Job Interview",
    emoji: "💼",
    description: "Talk about your experience and answer questions formally.",
    level: "advanced",
    setup:
      "You are a hiring manager conducting a job interview in professional Spanish (using 'usted'). Ask about the learner's experience, strengths, and why they want the role. Keep it polite and formal.",
  },
  {
    id: "friends",
    title: "Real Talk: Hanging with Friends",
    emoji: "😎",
    description: "Casual chat full of slang — only if you're advanced.",
    level: "advanced",
    slang: true,
    setup:
      "You are a close friend chatting casually in informal, slang-rich Spanish (mix of Spain and Latin American expressions like 'tío', 'guay', 'chido', 'qué onda'). Be playful but still help them learn.",
  },
  {
    id: "nightout",
    title: "Real Talk: Night Out",
    emoji: "🎉",
    description: "Make plans, react, and joke around like a native.",
    level: "advanced",
    slang: true,
    setup:
      "You are a Spanish-speaking friend making plans for a night out, using natural colloquial speech and idioms. Keep it lively and authentic.",
  },
];

export function getScenario(id: string): Scenario | undefined {
  return SCENARIOS.find((s) => s.id === id);
}
