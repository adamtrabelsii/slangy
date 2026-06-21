# Slangy — Design Spec

**Date:** 2026-06-19
**Status:** Approved (user delegated full autonomy to decide & build)

## Vision

Slangy is a web-first language-learning app — "Duolingo but better" — that teaches
**Spanish to English speakers** across the full beginner → advanced range, with three
differentiators baked in:

1. **Real talk, not textbook talk.** Beyond standard vocabulary/grammar, Slangy teaches
   how people *actually* speak — slang, idioms, and colloquialisms. This content is
   **gated to advanced / advanced-intermediate levels** so learners earn it once they
   have a foundation.
2. **A real AI conversation tutor.** A chat-based tutor powered by **Gemini 2.5 Flash**
   that roleplays real scenarios, corrects mistakes inline, and adapts to the learner.
3. **A smarter learning engine.** A spaced-repetition system (SM-2 lite) schedules vocab
   review instead of rote linear lessons + streak-chasing.

Plus the table-stakes Duolingo gamification: XP, streaks, hearts/lives, daily goal,
levels, and a course path.

**Platform:** Web first (Next.js + TypeScript + Tailwind), architected so a mobile
client can be added later. v1 uses local persistence (no auth/backend DB).

## First slice (what we build now)

A complete vertical slice that demonstrates all three pillars end to end:

- **Onboarding** — pick a starting level (Beginner / Intermediate / Advanced) + daily goal.
- **Course path (home)** — Duolingo-style map of units → skills, with locks. Slang skills
  are visibly locked until the learner reaches Advanced.
- **Lesson player** — the core loop: prompt → answer → instant feedback → XP/score, with
  multiple exercise types (multiple choice, translate-by-typing, word-bank assembly,
  listen-and-choose via browser TTS, match pairs). Hearts deplete on mistakes; lesson
  summary at the end.
- **Review (SRS)** — a review session built from items due per the spaced-repetition engine.
- **AI practice** — pick a scenario, converse with the Gemini tutor, get corrections and a
  short recap. Falls back to a built-in simulated tutor when no API key is configured, so
  the app always runs.
- **Profile** — streak, total XP, level, words learned, SRS stats.

## Architecture

```
Next.js (App Router, TS, Tailwind)
├─ app/
│  ├─ layout.tsx            root shell + top bar
│  ├─ page.tsx              course path (home)
│  ├─ onboarding/           level + goal selection
│  ├─ lesson/[skillId]/     lesson player
│  ├─ review/               SRS review session
│  ├─ practice/             AI conversation tutor
│  ├─ profile/              stats dashboard
│  └─ api/chat/route.ts     server proxy → Gemini 2.5 Flash (+ simulated fallback)
├─ lib/
│  ├─ types.ts              shared domain types
│  ├─ content/spanish.ts    course data (units → skills → lessons → exercises)
│  ├─ srs.ts                SM-2 lite scheduling
│  ├─ store.ts              Zustand store (persisted to localStorage)
│  ├─ tts.ts                browser speech synthesis helper
│  └─ gemini.ts             server-side Gemini client + system prompts
└─ components/              TopBar, PathNode, exercise renderers, chat UI, etc.
```

**Data flow:** All learner state (XP, streak, hearts, level, per-item SRS schedule,
completed skills) lives in the Zustand store, persisted to `localStorage`. The lesson
player reads content from `lib/content`, records results into the store + SRS engine on
completion. The AI practice screen posts the conversation to `/api/chat`, which calls
Gemini server-side (key from `GEMINI_API_KEY`) and returns the tutor reply + any
correction; with no key it returns a deterministic simulated reply.

**Slang gating:** Each skill has a `minLevel`. Slang skills require `advanced`. The path
renders them locked with a "Reach Advanced to unlock" hint until the learner's level
qualifies.

## Error handling

- AI route: try Gemini → on missing key or error, fall back to the local simulator and
  flag `simulated: true` so the UI can show a subtle "practice mode" badge. Never hard-fail.
- TTS: feature-detect `speechSynthesis`; hide listen exercises / audio buttons if absent.
- Store: versioned persisted state; if shape mismatches, reset gracefully to defaults.

## Out of scope for v1 (future iterations)

Real accounts/auth, server-side DB sync, payments/subscription, leaderboards & friends,
multiple languages, audio recording / speech recognition scoring, content authoring tools,
native mobile build.

## Success criteria

- `npm run dev` serves a working app; `npm run build` compiles with no type errors.
- A learner can onboard, complete a lesson (all exercise types working), see XP/streak/
  hearts update and persist across reload, run an SRS review, hold an AI conversation
  (real or simulated), and view their profile.
- Slang skills are unlocked only at Advanced.
