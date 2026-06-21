import type { Grade, SrsCard } from "@/lib/types";
import { vocabFor } from "@/lib/content/vocab";

// A compact SM-2 variant. Tuned so "good" answers grow intervals smoothly and
// "again" lapses send a card back to near-immediate review.

const MIN_EASE = 1.3;
const DAY_MS = 24 * 60 * 60 * 1000;

export function todayISO(): string {
  return new Date().toISOString();
}

export function newCard(itemId: string): SrsCard {
  const v = vocabFor(itemId);
  return {
    itemId,
    es: v.es,
    en: v.en,
    ease: 2.5,
    interval: 0,
    reps: 0,
    due: todayISO(),
    seen: 0,
    lapses: 0,
  };
}

function addDays(fromISO: string, days: number): string {
  return new Date(Date.parse(fromISO) + days * DAY_MS).toISOString();
}

/** Apply a review grade, returning the next state of the card. */
export function review(card: SrsCard, grade: Grade, now = new Date()): SrsCard {
  const c: SrsCard = { ...card, seen: card.seen + 1 };
  const nowISO = now.toISOString();

  if (grade === "again") {
    c.reps = 0;
    c.lapses += 1;
    c.ease = Math.max(MIN_EASE, c.ease - 0.2);
    c.interval = 0;
    // Due again in ~10 minutes.
    c.due = new Date(now.getTime() + 10 * 60 * 1000).toISOString();
    return c;
  }

  // Ease adjustment per grade.
  const easeDelta = grade === "hard" ? -0.15 : grade === "easy" ? 0.15 : 0;
  c.ease = Math.max(MIN_EASE, c.ease + easeDelta);
  c.reps = card.reps + 1;

  if (c.reps === 1) {
    c.interval = grade === "easy" ? 3 : 1;
  } else if (c.reps === 2) {
    c.interval = grade === "easy" ? 6 : grade === "hard" ? 3 : 4;
  } else {
    const factor = grade === "hard" ? 1.2 : grade === "easy" ? c.ease * 1.3 : c.ease;
    c.interval = Math.round(Math.max(1, card.interval) * factor);
  }

  c.due = addDays(nowISO, c.interval);
  return c;
}

/** Cards whose due time has passed. */
export function dueCards(cards: Record<string, SrsCard>, now = new Date()): SrsCard[] {
  const t = now.getTime();
  return Object.values(cards)
    .filter((c) => Date.parse(c.due) <= t)
    .sort((a, b) => Date.parse(a.due) - Date.parse(b.due));
}

export function countDue(cards: Record<string, SrsCard>, now = new Date()): number {
  return dueCards(cards, now).length;
}

/** Human-friendly "next review" label for a card. */
export function dueLabel(card: SrsCard, now = new Date()): string {
  const diff = Date.parse(card.due) - now.getTime();
  if (diff <= 0) return "due now";
  const days = diff / DAY_MS;
  if (days < 1) return "today";
  if (days < 2) return "tomorrow";
  return `in ${Math.round(days)} days`;
}
