import { describe, expect, it } from "vitest";
import { countDue, dueCards, newCard, review } from "@/lib/srs";

const NOW = new Date("2026-06-23T12:00:00.000Z");

describe("newCard", () => {
  it("creates a fresh card due immediately", () => {
    const card = newCard("es:hola");
    expect(card.itemId).toBe("es:hola");
    expect(card.reps).toBe(0);
    expect(card.lapses).toBe(0);
    expect(card.ease).toBe(2.5);
  });

  it("falls back to the item id when the vocab item isn't found", () => {
    const card = newCard("nonexistent:item");
    expect(card.term).toBe("nonexistent:item");
    expect(card.gloss.en).toBe("nonexistent:item");
  });
});

describe("review", () => {
  it("sends an 'again' grade back to near-immediate review and resets reps", () => {
    const card = newCard("x");
    const reviewed = review({ ...card, reps: 3, interval: 10 }, "again", NOW);
    expect(reviewed.reps).toBe(0);
    expect(reviewed.lapses).toBe(1);
    expect(reviewed.interval).toBe(0);
    const dueMs = Date.parse(reviewed.due) - NOW.getTime();
    expect(dueMs).toBeGreaterThan(0);
    expect(dueMs).toBeLessThanOrEqual(10 * 60 * 1000);
  });

  it("grows the interval on consecutive 'good' grades", () => {
    let card = newCard("x");
    card = review(card, "good", NOW); // rep 1
    expect(card.interval).toBe(1);
    card = review(card, "good", NOW); // rep 2
    expect(card.interval).toBe(4);
    const before = card.interval;
    card = review(card, "good", NOW); // rep 3+
    expect(card.interval).toBeGreaterThan(before);
  });

  it("never drops ease below the configured minimum", () => {
    let card = newCard("x");
    for (let i = 0; i < 20; i++) {
      card = review(card, "again", NOW);
    }
    expect(card.ease).toBeGreaterThanOrEqual(1.3);
  });

  it("increments seen on every review regardless of grade", () => {
    const card = newCard("x");
    const reviewed = review(card, "hard", NOW);
    expect(reviewed.seen).toBe(card.seen + 1);
  });
});

describe("dueCards / countDue", () => {
  it("only returns cards whose due time has passed", () => {
    const past = { ...newCard("a"), due: new Date(NOW.getTime() - 1000).toISOString() };
    const future = { ...newCard("b"), due: new Date(NOW.getTime() + 1000).toISOString() };
    const cards = { a: past, b: future };
    expect(dueCards(cards, NOW).map((c) => c.itemId)).toEqual(["a"]);
    expect(countDue(cards, NOW)).toBe(1);
  });

  it("sorts due cards by how overdue they are", () => {
    const mostOverdue = { ...newCard("a"), due: new Date(NOW.getTime() - 5000).toISOString() };
    const leastOverdue = { ...newCard("b"), due: new Date(NOW.getTime() - 1000).toISOString() };
    const cards = { b: leastOverdue, a: mostOverdue };
    expect(dueCards(cards, NOW).map((c) => c.itemId)).toEqual(["a", "b"]);
  });
});
