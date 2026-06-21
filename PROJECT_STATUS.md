# Slangy — Project Status

_Last updated: 2026-06-21_

## What this project is

**Slangy** is a web-first language-learning app — "Duolingo but better" — that teaches
**Spanish to English speakers** from beginner to advanced. It has three differentiators on
top of the usual gamified-lesson formula:

1. **Real talk, not textbook talk.** Teaches slang, idioms, and colloquialisms — how people
   *actually* speak. This content is **gated to the Advanced level** so learners earn it.
2. **A real AI conversation tutor.** A chat tutor powered by **Google Gemini 2.5 Flash** that
   roleplays scenarios, corrects mistakes inline, and adapts to the learner. Falls back to a
   built-in simulated tutor when no API key is set, so the app always runs.
3. **A smarter learning engine.** An SM-2-lite spaced-repetition system (SRS) schedules vocab
   review instead of pure linear lessons.

Plus table-stakes gamification: XP, streaks, hearts/lives, daily goal, gems, and a course path.

**Platform:** Web first (Next.js App Router). v1 uses **local persistence only** — all learner
state lives in a Zustand store persisted to `localStorage`; no auth or backend DB.

Full design rationale: [docs/superpowers/specs/2026-06-19-slangy-design.md](docs/superpowers/specs/2026-06-19-slangy-design.md)

## Tech stack

| Area | Choice |
|------|--------|
| Framework | Next.js 14.2.18 (App Router), React 18, TypeScript 5.6 |
| Styling | Tailwind CSS 3.4, custom theme tokens, framer-motion, lucide-react icons |
| State | Zustand 5 (persisted to localStorage) |
| AI | `@google/generative-ai` → Gemini 2.5 Flash (server-side proxy) |
| Audio | Browser `speechSynthesis` (TTS) for listen exercises |

## Architecture

```
app/
├─ layout.tsx              root shell + top bar
├─ page.tsx                course path (home) — units → skills, with locks
├─ onboarding/             level + daily-goal selection
├─ lesson/[skillId]/       lesson player (the core loop)
├─ review/                 SRS review session
├─ practice/               AI conversation tutor
├─ profile/                stats dashboard
└─ api/chat/route.ts       server proxy → Gemini (+ simulated fallback)
lib/
├─ types.ts                shared domain types
├─ content/spanish.ts      course data (units → skills → lessons → exercises)
├─ content/scenarios.ts    AI practice scenarios
├─ content/vocab.ts        vocabulary items
├─ srs.ts                  SM-2 lite scheduling
├─ store.ts                Zustand store (persisted)
├─ tts.ts                  browser speech-synthesis helper
├─ text.ts                 answer-normalization / shuffle helpers
└─ gemini.ts               server-side Gemini client + system prompts
components/
├─ TopBar.tsx, Icon.tsx
└─ exercises/              ExerciseShell + 5 exercise renderers
```

## What we've done so far ✅

The full v1 vertical slice from the design spec is **implemented and type-checks clean**
(`npx tsc --noEmit` → exit 0).

- **Onboarding** — pick starting level (Beginner / Intermediate / Advanced) + daily goal.
- **Course path (home)** — units → skills map with locking; slang skills visibly locked until Advanced.
- **Lesson player** with all **5 exercise types** working:
  - Multiple choice
  - Translate-by-typing (with answer normalization + multiple accepted answers)
  - Word-bank sentence assembly
  - Listen-and-choose (browser TTS, with graceful text fallback when TTS is absent)
  - Match pairs
- **Gamification** — XP, daily XP goal, streak tracking, hearts (deplete on mistakes, refill
  daily / buyable with gems), gems earned from XP.
- **SRS engine** (`lib/srs.ts`) — SM-2-lite cards created on first sight, graded on answers,
  scheduled for review.
- **Review session** — built from items due per the SRS engine.
- **AI practice** — scenario picker + chat with Gemini tutor via `/api/chat`; deterministic
  **simulated fallback** when `GEMINI_API_KEY` is unset (flagged so UI can show "practice mode").
- **Profile** — streak, total XP, level, words learned, SRS stats.
- **Persistence** — versioned Zustand store in localStorage, with graceful reset on shape mismatch.
- **Design spec** written and approved.
- Dev server boots successfully (`dev-boot.log` shows all routes compiling and serving 200s).

## Current state notes

- **Not yet committed to git.** The branch `master` has **zero commits**; everything is
  untracked. First commit is the immediate next step.
- **No `.env` file** — only `.env.example`. The app runs in simulated tutor mode until a
  real `GEMINI_API_KEY` is added.
- **Content is a thin demo slice** — 3 units, ~7 skills, mostly 1 lesson each. Enough to
  demonstrate every feature, not enough for real learning depth.
- A `graphify-out/` knowledge-graph artifact exists for the codebase.

## What we need to do next 📋

### Immediate
- [x] **Initialize git history** — first commit `6a5d686` (32 files; `node_modules`, `.env`,
      `dev-boot.log`, `graphify-out/` ignored).
- [x] **Run `npm run build`** — clean production build, all 8 routes generated, exit 0.
- [ ] **Add a real `GEMINI_API_KEY`** locally and smoke-test the live AI tutor path
      (the simulated fallback is the only path exercised so far). _Needs your API key._
- [ ] **Manual end-to-end pass** — onboard → complete a lesson (all 5 exercise types) →
      verify XP/streak/hearts persist across reload → run an SRS review → hold an AI
      conversation → view profile.

### Content & polish
- [x] **Expand course content** — now **4 units, 13 skills, 21 lessons, 84 vocab items**.
      Added Family & People, Shopping, a whole "Everyday Life" unit (Daily Life, Feelings,
      Making Plans), extra lessons on existing skills, and a new "Texting & Online" slang skill.
      Every exercise `itemId` is backed by a VOCAB entry (verified). _(tsc + build green)_
- [x] **Add more AI practice scenarios** — added Meeting Someone New, At the Doctor, and a
      formal Job Interview (now 8 scenarios across all levels).
- [ ] **Further content depth** — more lessons per skill, audio variety, harder advanced material.
- [ ] **Accessibility & mobile polish** — keyboard nav, focus states, responsive layout checks.
- [ ] **Empty/edge states** — out of hearts, no items due for review, network/API errors in chat.

### Future iterations (explicitly out of scope for v1)
- [ ] Real accounts / auth and server-side DB sync (replace localStorage-only persistence).
- [ ] Payments / subscription.
- [ ] Leaderboards & friends (social).
- [ ] Multiple target languages.
- [ ] Audio recording + speech-recognition scoring.
- [ ] Content-authoring tools.
- [ ] Native mobile client (architecture already keeps this open).

## How to run

```bash
npm install
cp .env.example .env   # optional: add GEMINI_API_KEY for the live AI tutor
npm run dev            # http://localhost:3210 (per dev-boot.log)
```

Without a key, the AI tutor runs in built-in simulated "practice mode" and the app still
works end to end.

## Success criteria (from spec)

- `npm run dev` serves a working app; `npm run build` compiles with no type errors. _(tsc clean ✅; full build TBD)_
- A learner can onboard, complete a lesson (all exercise types), see XP/streak/hearts update
  and persist across reload, run an SRS review, hold an AI conversation (real or simulated),
  and view their profile.
- Slang skills are unlocked only at Advanced.
