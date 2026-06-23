# Slangy — Project Status

_Last updated: 2026-06-23_

## What this project is

**Slangy** is a web-first language-learning app — "Duolingo but better" — with a **vocab-driven,
multi-language course engine**: 9 target-language courses (Spanish, French, Italian, German,
Portuguese, Czech, Russian, Chinese, Japanese) whose lessons are **generated** from vocab lists
and **localized to the learner's native language**. Three differentiators:

1. **Real talk, not textbook talk.** Teaches slang, idioms, and colloquialisms — gated to the
   **Advanced** level so learners earn it.
2. **A real AI conversation tutor** ("Lola") powered by **Google Gemini 2.5 Flash** that roleplays
   scenarios, corrects mistakes inline, and adapts to the learner — with a built-in simulated
   fallback so the app always works.
3. **A smarter learning engine** — an SM-2-lite spaced-repetition system (SRS) schedules review.

Plus gamification (XP, streaks, hearts, gems, daily goal) and **earned level progression**.

**Platform:** Web (Next.js App Router). **Local-only persistence** — all state lives in a Zustand
store in `localStorage`; auth is a local mock (no backend yet).

Full design rationale: [docs/superpowers/specs/2026-06-19-slangy-design.md](docs/superpowers/specs/2026-06-19-slangy-design.md)

## Tech stack

| Area | Choice |
|------|--------|
| Framework | Next.js 14.2.18 (App Router), React 18, TypeScript 5.6 |
| Styling | Tailwind CSS 3.4, custom warm "sunset" theme, glassmorphism |
| Animation | framer-motion 11 (onboarding, hand-drawn title, transitions) |
| State | Zustand 5 (persisted to localStorage, key `slangy-state-v2`) |
| AI | `@google/generative-ai` → Gemini 2.5 Flash (structured JSON output) |
| Audio | Browser `speechSynthesis`, target-language voice selection |
| Fonts | Baloo 2 (display) + Nunito (body), via Google Fonts |
| Icons | lucide-react (no emoji used as UI icons) |

## Architecture

```
app/
├─ layout.tsx              shell, fonts, LangSync, bottom TabBar
├─ page.tsx                home — "LA RUTA" course path + HUD (+ coming-soon for non-ES targets)
├─ onboarding/             welcome → auth → speak → learn → level/goal → profile setup
├─ lesson/[skillId]/       lesson player + summary (level-up celebration)
├─ review/                 SRS flashcard session
├─ practice/               AI tutor chat ("Lola")
├─ profile/                stats, achievements, language editing, account actions
└─ api/chat/route.ts       server proxy → Gemini (+ simulated fallback)
components/
├─ TabBar.tsx              bottom nav (localized, hides on onboarding/lesson)
├─ LangSync.tsx            syncs document lang/dir + TTS voice to the learner
├─ Icon.tsx                lucide icon map for skill nodes
├─ ui/hand-writing-text.tsx  animated SVG path-draw title (shadcn-convention folder)
└─ exercises/             ExerciseShell + 5 exercise renderers
lib/
├─ types.ts               domain types, level thresholds + helpers
├─ i18n.ts                en/fr/es/ar UI dictionaries + useT() hook
├─ store.ts               Zustand store (account, languages, progress, SRS)
├─ gemini.ts              Gemini client, per-scenario system prompt, fallback
├─ tts.ts                 speech synthesis with target-language voice
├─ srs.ts                 SM-2 lite scheduling
├─ avatars.ts             warm gradient avatars + initials
├─ text.ts               answer normalization / shuffle
├─ content/
│  ├─ index.ts            course registry (target → Course) + getCourse/getSkill/getItem/hasCourse
│  ├─ generate.ts         generates localized lessons/exercises from a skill's vocab
│  ├─ languages.ts        11 selectable languages (LangCode, names, monograms, RTL)
│  ├─ scenarios.ts        8 AI practice scenarios (Spanish)
│  └─ courses/            one file per target: spanish, french, italian, german,
│                         portuguese, czech, russian, chinese, japanese
```

## Status: what's done ✅

Verified throughout: `npx tsc --noEmit` clean and `npm run build` green (8/8 routes).

### Core learning loop
- **Onboarding** — animated welcome (hand-drawn title), local mock **auth** (sign up / log in),
  pick the language you **speak** and the one you want to **learn**, level + daily goal, and a
  **profile setup** (gradient avatar + name). Multi-step with motion transitions.
- **Course path (home)** — "LA RUTA" timeline with a HUD (streak/gems/hearts/daily goal), unit
  headers, current/done/locked skill nodes, and Advanced-gated slang cards.
- **Lesson player** — 5 exercise types (multiple choice, translate, word-bank, listen/TTS, match),
  hearts that deplete on mistakes, out-of-hearts gate, and a summary that celebrates level-ups.
- **SRS review** — flashcards built from due items, DUE/LEARNED/MASTERED stats, 4-grade scheduling.
- **AI practice** — "Lola" chat per scenario; real Gemini replies with inline corrections, plus a
  simulated fallback when no key/quota.
- **Profile** — stats, achievements, level progress, **language editing** (speak ↔ learn), and
  **account actions** (log out / switch account).

### Content & course engine
- **Vocab-driven, multi-language engine.** Courses are authored as vocab lists (target term +
  localized glosses + optional romanization); lessons/exercises are **generated** per learner
  ([lib/content/generate.ts](lib/content/generate.ts)), so each course works in any native
  language automatically. A registry ([lib/content/index.ts](lib/content/index.ts)) maps each
  target `LangCode` to its `Course`.
- **9 target courses:** Spanish (4 units, 13 skills, ~80 items incl. slang/idioms), French,
  Italian, German, Portuguese (each ~2 units, ~45 items with en+es glosses), and foundational
  Czech / Russian / Chinese / Japanese (greetings + numbers, with romanization).
- **11 selectable languages** (es/en/fr/it/de/pt/ar/cs/ru/zh/ja) for both "speak" and "learn".
- **8 AI scenarios** (café, directions, market, introductions, doctor, interview, friends, night out).

### Systems
- **Earned level progression** — levels earned from total XP (Intermediate @ 50, Advanced @ 150);
  upward-only, celebrated in the lesson summary.
- **Localization** — full UI in **English / French / Spanish / Arabic** (~67 keys each), keyed to
  the learner's native language; document `lang`/`dir` follow it (**RTL for Arabic**). Lesson
  content stays in the target language.
- **Working AI tutor** — conversation starts on a user turn, Gemini **structured JSON output**,
  2048-token budget (avoids 2.5-flash thinking truncation), rich per-scenario system prompt,
  mandatory corrections for English input and real grammar mistakes.
- **Correct TTS** — picks a native voice for the **target** language (es-ES/es-MX preferred) and
  waits for async voice loading instead of using an English voice on Spanish words.
- **Design** — warm sunset palette (orange→amber gradient, cream bg), glassmorphism, bottom tab
  bar, lucide icons throughout. Guided by the ui-ux-pro-max skill.

### Infra
- Git history on GitHub: `https://github.com/adamtrabelsii/slangy` (branch `main`).
- `.env` holds `GEMINI_API_KEY` and is gitignored (the key never leaves the device).

## Known limitations / honest notes

- **Auth is cosmetic/local.** It accepts any email/password and stores the profile in
  localStorage — no real accounts, sessions, or password checks. "Log out" keeps local progress;
  "switch account" wipes it. Real accounts would need a backend (e.g. Supabase).
- **Course depth varies.** Spanish is deep; French/Italian/German/Portuguese are ~2 units each;
  Czech/Russian/Chinese/Japanese are foundational (greetings + numbers). English-as-target has no
  course yet → shows "coming soon." All are easy to grow: just add vocab to the course file.
- **Gloss localization is partial.** Glosses exist in English everywhere, Spanish on the new
  courses, and French/German on Spanish; other native languages fall back to English meanings.
- **The AI tutor is Spanish-only** for now (scenarios + prompt), regardless of the chosen target.
- **TTS quality depends on the OS** having a voice for the target language installed.
- **AI correction tips** are localized to the learner's native language via Gemini; the
  simulated (no-API-key) fallback only has translated tips for en/es/fr/ar and falls back to
  English for the other 7 native languages.
- **No tests** and no CI yet.

## What's next 📋

- [x] Set up a real lint/build gate — `next lint` was never actually configured (interactive
  prompt, never run); added `.eslintrc.json` (`next/core-web-vitals`) pinned to
  eslint@8.57.1 + eslint-config-next matching the Next version, fixed the errors/warnings it
  surfaced (unescaped entities, font loading via `next/font/google` instead of manual `<link>`,
  intentional-dependency `useMemo`s annotated with `eslint-disable-next-line`), and bumped
  Next 14.2.18 → 14.2.35 (patch-only) to close most known CVEs without a 15/16 migration.
- [x] Localize AI correction "notes" into the learner's native language — `learnFrom` is now
  plumbed from the practice page → `/api/chat` → `askTutor`; Gemini is instructed to write
  `correction.note` in the learner's native language, and the simulated (no-API-key) fallback
  has translated canned notes for en/es/fr/ar (other native languages fall back to English in
  simulated mode only — Gemini handles all 11 when a key is present).
- [ ] Pre-fill name/email on the onboarding auth step after a soft log-out (one-tap re-login).
- [ ] Build real courses for French / English / Arabic targets (or stub lessons).
- [ ] Deeper content per skill; more AI scenarios.
- [ ] Accessibility & mobile polish pass (focus states, contrast, RTL layout edge cases).
- [ ] Automated tests + CI; consider deploying (Vercel).
- [ ] Future: real auth + DB sync, payments, leaderboards/social, speech-recognition scoring, native mobile.

## Decisions & Assumptions

- **Next.js stayed on the 14.x line** (14.2.18 → 14.2.35) rather than jumping to 15/16. The
  remaining `npm audit` findings (RSC/middleware DoS, cache-poisoning classes) require a major
  upgrade and don't have a realistic exploit path here — this app has one trivial API route and
  no middleware. Revisit when doing the broader test/CI pass.

## How to run

```bash
npm install
# .env already holds GEMINI_API_KEY (gitignored). Without it the tutor runs in simulated mode.
npm run dev        # http://localhost:3000
```

## Commit history

```
5158c45 Profile: language editing + log out / switch account, drop reset
7aed4cb Make the AI tutor fully functional with per-scenario context
16217d6 Localize UI by native language, fix TTS voice, add fonts + motion
cd89539 Rework onboarding (auth + languages), warm theme, drop emoji
bec70f4 Redesign UI from Claude Design (neuro-tone light theme)
aa92cd4 Add earned XP-based level progression
779dffd Expand course content and AI scenarios
6a5d686 Initial commit: Slangy v1 vertical slice
```
