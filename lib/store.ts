"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Grade, Level, SrsCard } from "@/lib/types";
import { levelForXp, maxLevel } from "@/lib/types";
import { newCard, review as reviewCard } from "@/lib/srs";

const MAX_HEARTS = 5;

function dateKey(d = new Date()): string {
  return d.toISOString().slice(0, 10); // YYYY-MM-DD
}

function daysBetween(aKey: string, bKey: string): number {
  const a = Date.parse(aKey + "T00:00:00Z");
  const b = Date.parse(bKey + "T00:00:00Z");
  return Math.round((b - a) / (24 * 60 * 60 * 1000));
}

export interface LessonResult {
  correct: number;
  total: number;
  xp: number;
}

interface SlangyState {
  hydrated: boolean;
  onboarded: boolean;
  level: Level;
  dailyGoalXp: number;

  xp: number;
  todayXp: number;
  todayKey: string;
  streak: number;
  lastStreakDay: string | null;

  hearts: number;
  gems: number;

  completedSkills: Record<string, number>; // skillId -> lessons completed count
  cards: Record<string, SrsCard>;

  // actions
  setHydrated: () => void;
  completeOnboarding: (level: Level, dailyGoalXp: number) => void;
  rollDay: () => void;
  loseHeart: () => void;
  refillHearts: (cost?: number) => boolean;
  seeItem: (itemId: string) => void;
  gradeItem: (itemId: string, grade: Grade) => void;
  finishLesson: (skillId: string, result: LessonResult) => void;
  setLevel: (level: Level) => void;
  reset: () => void;
}

const initial = {
  hydrated: false,
  onboarded: false,
  level: "beginner" as Level,
  dailyGoalXp: 30,
  xp: 0,
  todayXp: 0,
  todayKey: dateKey(),
  streak: 0,
  lastStreakDay: null as string | null,
  hearts: MAX_HEARTS,
  gems: 50,
  completedSkills: {} as Record<string, number>,
  cards: {} as Record<string, SrsCard>,
};

export const useStore = create<SlangyState>()(
  persist(
    (set, get) => ({
      ...initial,

      setHydrated: () => set({ hydrated: true }),

      completeOnboarding: (level, dailyGoalXp) =>
        set({ onboarded: true, level, dailyGoalXp }),

      setLevel: (level) => set({ level }),

      // Reset today's counters when the calendar day changes; also refill hearts daily.
      rollDay: () => {
        const today = dateKey();
        if (get().todayKey !== today) {
          set({ todayKey: today, todayXp: 0, hearts: MAX_HEARTS });
        }
      },

      loseHeart: () => set((s) => ({ hearts: Math.max(0, s.hearts - 1) })),

      refillHearts: (cost = 30) => {
        const s = get();
        if (s.hearts >= MAX_HEARTS) return false;
        if (s.gems < cost) return false;
        set({ hearts: MAX_HEARTS, gems: s.gems - cost });
        return true;
      },

      // First time an item is drilled, create its SRS card.
      seeItem: (itemId) =>
        set((s) => {
          if (s.cards[itemId]) return {};
          return { cards: { ...s.cards, [itemId]: newCard(itemId) } };
        }),

      gradeItem: (itemId, grade) =>
        set((s) => {
          const existing = s.cards[itemId] ?? newCard(itemId);
          return { cards: { ...s.cards, [itemId]: reviewCard(existing, grade) } };
        }),

      finishLesson: (skillId, result) =>
        set((s) => {
          const today = dateKey();
          // Streak handling.
          let streak = s.streak;
          let lastStreakDay = s.lastStreakDay;
          if (lastStreakDay !== today) {
            if (lastStreakDay && daysBetween(lastStreakDay, today) === 1) {
              streak = s.streak + 1;
            } else {
              streak = 1; // first day or broken streak
            }
            lastStreakDay = today;
          }

          const todayXp =
            (s.todayKey === today ? s.todayXp : 0) + result.xp;

          // Earn level progression from total XP — only ever promotes upward, so a
          // learner who onboarded at a higher level is never demoted.
          const newXp = s.xp + result.xp;
          const level = maxLevel(s.level, levelForXp(newXp));

          return {
            xp: newXp,
            todayXp,
            todayKey: today,
            streak,
            lastStreakDay,
            level,
            gems: s.gems + Math.round(result.xp / 5),
            completedSkills: {
              ...s.completedSkills,
              [skillId]: (s.completedSkills[skillId] ?? 0) + 1,
            },
          };
        }),

      reset: () => set({ ...initial, hydrated: true }),
    }),
    {
      name: "slangy-state-v1",
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => {
        const { hydrated, setHydrated, ...rest } = s as any;
        return rest;
      },
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
        state?.rollDay();
      },
    }
  )
);
