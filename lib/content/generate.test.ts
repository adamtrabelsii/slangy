import { describe, expect, it } from "vitest";
import { glossOf, lessonCount, lessonsForSkill } from "@/lib/content/generate";
import { getCourse } from "@/lib/content";

describe("glossOf", () => {
  it("returns the gloss for the learner's native language when present", () => {
    expect(glossOf({ en: "hello", es: "hola" }, "es")).toBe("hola");
  });

  it("falls back to English when the native language has no gloss", () => {
    expect(glossOf({ en: "hello", es: "hola" }, "fr")).toBe("hello");
  });
});

describe("lessonCount", () => {
  it("is at least 1 even for an empty skill", () => {
    expect(
      lessonCount({
        id: "x",
        title: "x",
        blurb: "x",
        icon: "Sparkles",
        color: "#000",
        minLevel: "beginner",
        items: [],
      })
    ).toBe(1);
  });

  it("groups items into lessons of 5", () => {
    const items = Array.from({ length: 12 }, (_, i) => ({
      id: `es:item${i}`,
      term: `term${i}`,
      gloss: { en: `meaning${i}` },
    }));
    expect(
      lessonCount({
        id: "x",
        title: "x",
        blurb: "x",
        icon: "Sparkles",
        color: "#000",
        minLevel: "beginner",
        items,
      })
    ).toBe(3);
  });
});

describe("lessonsForSkill", () => {
  it("generates at least one exercise per item, localized to the learner", () => {
    const course = getCourse("es");
    const skill = course!.units[0].skills[0];
    const lessons = lessonsForSkill(skill, "es");
    expect(lessons.length).toBe(lessonCount(skill));
    const totalExercises = lessons.reduce((n, l) => n + l.exercises.length, 0);
    // Every lesson group also gets a trailing match exercise, so there are at
    // least as many exercises as items.
    expect(totalExercises).toBeGreaterThanOrEqual(skill.items.length);
  });

  it("never produces an exercise with fewer than 2 choices where choices are required", () => {
    const course = getCourse("en");
    const skill = course!.units[0].skills[0];
    const lessons = lessonsForSkill(skill, "es");
    for (const lesson of lessons) {
      for (const ex of lesson.exercises) {
        if (ex.kind === "multipleChoice" || ex.kind === "listen") {
          expect(ex.choices.length).toBeGreaterThanOrEqual(2);
        }
      }
    }
  });
});
