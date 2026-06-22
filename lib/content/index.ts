// Course registry — one course per target language, plus lookup helpers.

import type { Course, Skill, VocabItem } from "@/lib/types";
import type { LangCode } from "./languages";
import { SPANISH } from "./courses/spanish";
import { FRENCH } from "./courses/french";
import { ITALIAN } from "./courses/italian";
import { GERMAN } from "./courses/german";
import { PORTUGUESE } from "./courses/portuguese";
import { CZECH } from "./courses/czech";
import { RUSSIAN } from "./courses/russian";
import { CHINESE } from "./courses/chinese";
import { JAPANESE } from "./courses/japanese";

export const COURSES: Partial<Record<LangCode, Course>> = {
  es: SPANISH,
  fr: FRENCH,
  it: ITALIAN,
  de: GERMAN,
  pt: PORTUGUESE,
  cs: CZECH,
  ru: RUSSIAN,
  zh: CHINESE,
  ja: JAPANESE,
};

export function getCourse(target: LangCode): Course | undefined {
  return COURSES[target];
}

export function hasCourse(target: LangCode): boolean {
  return !!COURSES[target];
}

export function courseSkills(target: LangCode): Skill[] {
  return getCourse(target)?.units.flatMap((u) => u.skills) ?? [];
}

export function getSkill(target: LangCode, id: string): Skill | undefined {
  return courseSkills(target).find((s) => s.id === id);
}

// Global item index for the SRS engine (item ids are namespaced by target).
const ITEM_INDEX: Record<string, VocabItem> = {};
for (const course of Object.values(COURSES)) {
  if (!course) continue;
  for (const unit of course.units) {
    for (const skill of unit.skills) {
      for (const item of skill.items) ITEM_INDEX[item.id] = item;
    }
  }
}

export function getItem(id: string): VocabItem | undefined {
  return ITEM_INDEX[id];
}
