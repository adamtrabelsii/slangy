// Generates localized lessons/exercises from a skill's vocab items.
// Because exercises are derived from (target term + localized gloss) and all
// instruction text comes from i18n, every course works in any native language.

import type { Exercise, Gloss, Lesson, Skill, VocabItem } from "@/lib/types";
import type { LangCode } from "@/lib/content/languages";
import { translate } from "@/lib/i18n";

const ITEMS_PER_LESSON = 5;

/** The meaning to show a learner whose native language is `from`. */
export function glossOf(gloss: Gloss, from: LangCode): string {
  return gloss[from] ?? gloss.en;
}

export function lessonCount(skill: Skill): number {
  return Math.max(1, Math.ceil(skill.items.length / ITEMS_PER_LESSON));
}

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

/** Pick up to n items from `pool` excluding `exclude`, stable order. */
function distractors(pool: VocabItem[], exclude: VocabItem, n: number): VocabItem[] {
  return pool.filter((i) => i.id !== exclude.id).slice(0, n);
}

/** Build the generated lessons for a skill, localized to `from`. */
export function lessonsForSkill(skill: Skill, from: LangCode): Lesson[] {
  const groups = chunk(skill.items, ITEMS_PER_LESSON);
  return groups.map((items, gi) => ({
    id: `${skill.id}-l${gi + 1}`,
    exercises: buildExercises(items, skill.items, from),
  }));
}

function buildExercises(items: VocabItem[], pool: VocabItem[], from: LangCode): Exercise[] {
  const exercises: Exercise[] = [];

  items.forEach((item, i) => {
    const gloss = glossOf(item.gloss, from);
    const kind = i % 3;

    if (kind === 0) {
      // Multiple choice: what does this term mean? (choices are glosses)
      const others = distractors(pool, item, 3).map((d) => glossOf(d.gloss, from));
      const choices = uniq([gloss, ...others]);
      if (choices.length >= 2) {
        exercises.push({
          id: `${item.id}-mc`,
          kind: "multipleChoice",
          itemId: item.id,
          prompt: translate(from, "ex_whatMeans", { term: item.term }),
          audio: item.term,
          choices,
          answer: gloss,
        });
        return;
      }
    }

    if (kind === 1) {
      // Translate: given the meaning, write it in the target language.
      exercises.push({
        id: `${item.id}-tr`,
        kind: "translate",
        itemId: item.id,
        prompt: gloss,
        direction: "en-es",
        answers: [item.term],
        hint: item.roman,
      });
      return;
    }

    // Listen: hear the term, pick what you heard (choices are terms).
    const otherTerms = distractors(pool, item, 2).map((d) => d.term);
    const choices = uniq([item.term, ...otherTerms]);
    if (choices.length >= 2) {
      exercises.push({
        id: `${item.id}-ls`,
        kind: "listen",
        itemId: item.id,
        audio: item.term,
        choices,
        answer: item.term,
        translation: gloss,
      });
    } else {
      // Fallback when there aren't enough distractors.
      exercises.push({
        id: `${item.id}-tr`,
        kind: "translate",
        itemId: item.id,
        prompt: gloss,
        direction: "en-es",
        answers: [item.term],
        hint: item.roman,
      });
    }
  });

  // One match exercise per lesson reinforcing the group (3-4 pairs).
  if (items.length >= 3) {
    const pairs = items.slice(0, 4).map((it) => ({ es: it.term, en: glossOf(it.gloss, from) }));
    exercises.push({
      id: `${items[0].id}-match`,
      kind: "match",
      itemId: items[0].id,
      pairs,
    });
  }

  return exercises;
}

function uniq(arr: string[]): string[] {
  return Array.from(new Set(arr));
}
