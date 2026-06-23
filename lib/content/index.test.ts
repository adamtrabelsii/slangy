import { describe, expect, it } from "vitest";
import { COURSES, getCourse, getItem, getSkill, hasCourse } from "@/lib/content";
import { LANGUAGES } from "@/lib/content/languages";

describe("course registry", () => {
  it("has a real course for every selectable language", () => {
    for (const lang of LANGUAGES) {
      expect(hasCourse(lang.code)).toBe(true);
    }
  });

  it("namespaces every vocab item id by its course's target language", () => {
    for (const course of Object.values(COURSES)) {
      if (!course) continue;
      for (const unit of course.units) {
        for (const skill of unit.skills) {
          for (const item of skill.items) {
            expect(item.id.startsWith(`${course.target}:`)).toBe(true);
          }
        }
      }
    }
  });

  it("never has duplicate item ids across the whole registry", () => {
    const seen = new Set<string>();
    for (const course of Object.values(COURSES)) {
      if (!course) continue;
      for (const unit of course.units) {
        for (const skill of unit.skills) {
          for (const item of skill.items) {
            expect(seen.has(item.id)).toBe(false);
            seen.add(item.id);
          }
        }
      }
    }
  });

  it("gives every vocab item an English gloss as the fallback pivot", () => {
    for (const course of Object.values(COURSES)) {
      if (!course) continue;
      for (const unit of course.units) {
        for (const skill of unit.skills) {
          for (const item of skill.items) {
            expect(item.gloss.en).toBeTruthy();
          }
        }
      }
    }
  });

  it("looks up a known skill and item from the Spanish course", () => {
    expect(getCourse("es")).toBeDefined();
    const skill = getSkill("es", "es-basics");
    expect(skill).toBeDefined();
    expect(skill?.items.length).toBeGreaterThan(0);
    const item = getItem(skill!.items[0].id);
    expect(item).toEqual(skill!.items[0]);
  });

  it("returns undefined for an unknown skill or item id", () => {
    expect(getSkill("es", "nonexistent")).toBeUndefined();
    expect(getItem("nonexistent:item")).toBeUndefined();
  });
});
