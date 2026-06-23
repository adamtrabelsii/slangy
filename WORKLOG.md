# Worklog

## 2026-06-23 — Automated tests + CI

The project had zero tests and no CI. Added both rather than just one, since a CI workflow
with nothing to run in it isn't a real gate.

- Installed `vitest` and added `vitest.config.ts` (Node environment, `@` path alias matching
  `tsconfig.json`). Deliberately scoped to logic-only tests — no jsdom/React Testing Library —
  since the highest-confidence, fastest-to-verify coverage for this pass is `lib/`, and
  component tests would need visual/interaction verification this environment can't do well.
- `lib/text.test.ts`: `normalize`/`matchesAny` (accent/punctuation/case-insensitive answer
  matching) and `shuffle` (same elements, no mutation).
- `lib/srs.test.ts`: SM-2 scheduling — `newCard` defaults, the ease floor never going below 1.3
  even after repeated lapses, interval growth across consecutive "good" grades, and
  `dueCards`/`countDue` filtering + sort order.
- `lib/types.test.ts`: `levelForXp` threshold crossings, `levelAtLeast`, `nextLevel`, `maxLevel`.
- `lib/content/index.test.ts`: registry integrity directly exercising this session's course
  additions — every selectable language has a real course, every item id is namespaced by its
  course's target language, no duplicate item ids across the whole registry, every item has an
  English gloss fallback.
- `lib/content/generate.test.ts`: `glossOf` native-language lookup + English fallback,
  `lessonCount` grouping, and `lessonsForSkill` producing at least one exercise per item with
  valid choice counts.
- Added `npm test` (`vitest run`) to `package.json`.
- Added `.github/workflows/ci.yml`: typecheck → lint → test → build on push/PR to `main`.
  Verified `npm ci` installs cleanly from the committed lockfile (ran it in this environment to
  confirm before trusting the CI config).
- Verified `npx tsc --noEmit`, `npm run lint`, `npm test` (35 passing), and `npm run build` all
  pass clean.

## 2026-06-23 — Accessibility pass: focus visibility + contrast

Audited for the most common, verifiable a11y gaps (no browser available in this environment,
so anything needing visual/screen-reader confirmation was deferred rather than guessed at):

- `app/globals.css`: added a global `:focus-visible` outline. A few elements suppress the
  native focus ring via Tailwind's `outline-none` (the `.field` input style, the practice chat
  textarea, the exercise free-text textarea) without providing any replacement, which left
  keyboard users with zero focus indicator on those controls.
- `app/onboarding/page.tsx`: the avatar-picker swatches set an inline `style.outline` to show
  the *selected* swatch, which had the side effect of permanently overriding `outline: none`
  on every other swatch — silently cancelling the new global focus-visible rule for them.
  Switched the selection indicator to `box-shadow` (frees up `outline` for focus) and added
  `aria-pressed` so screen readers announce the selection state (the buttons had no text
  content, just a color swatch).
- `components/TabBar.tsx`: added `aria-current="page"` to the active tab link.
- `tailwind.config.ts`: `sg.light` (`#B8A698`) measured at ~2.1:1 contrast against the app's
  cream background — well under WCAG AA (4.5:1 for normal text) despite being used for real
  copy (placeholders, hint text, section labels) rather than pure decoration. Darkened to
  `#86715F` (~4.2:1).
- Verified `npx tsc --noEmit`, `npm run lint`, and `npm run build` all pass clean.
- Did NOT attempt a full RTL audit (physical `ml-`/`mr-`/`pl-`/`pr-` → logical `ms-`/`me-`
  utilities) or a tap-target sizing sweep — both need visual verification in an actual RTL
  browser session, which isn't possible headless. Documented as a follow-up in
  `PROJECT_STATUS.md` rather than making blind changes across dozens of call sites.

## 2026-06-23 — Deepen course content + more AI scenarios

- Added a "Unit 3 · Everyday Life" to French, Italian, German, Portuguese, and English courses:
  two new skills each (Time & Weather, Feelings & Health), ~15 vocab items per course, same
  authoring pattern as existing units (`lib/content/courses/{french,italian,german,portuguese,english}.ts`).
- Added 3 AI practice scenarios to `lib/content/scenarios.ts`: hotel check-in (beginner),
  buying clothes (beginner), and a phone reservation call (advanced, no visual cues) —
  bringing the total from 8 to 11 and rounding out the level/topic spread.
- While wiring openers for the new scenarios, noticed the scripted "first line" for each
  scenario was hardcoded into two separate `OPENERS` dictionaries (`lib/gemini.ts` and
  `app/practice/page.tsx`) that had to be kept in sync by hand. Added `opener` to the
  `Scenario` type and moved every opener into `lib/content/scenarios.ts` as the single source
  of truth; both consumers now read `scenario.opener`.
- Verified `npx tsc --noEmit`, `npm run lint`, and `npm run build` all pass clean.

## 2026-06-23 — English and Arabic courses

Checked `lib/content/index.ts` against the "What's next" item "build real courses for
French/English/Arabic" — French already had a full course (`lib/content/courses/french.ts`,
2 units), so that part of the backlog note was stale. Built the two genuinely missing ones:

- `lib/content/courses/english.ts`: 2 units (foundations + out-in-the-world), ~50 items
  covering basics/food/family/travel/numbers/slang. Since the term itself is already English,
  `gloss.en` is a short clarifying definition rather than a translation, and the real
  translations live in `es`/`fr`/`ar` (the app's other fully-localized native languages).
- `lib/content/courses/arabic.ts`: foundational greetings + numbers, Arabic script with a
  `roman` transliteration field, mirroring the existing Czech/Russian pattern.
- Registered both in `COURSES` in `lib/content/index.ts`. TTS (`lib/tts.ts`) already had
  voice preferences for both `en` and `ar`, so spoken playback works without further changes.
- Verified `npx tsc --noEmit`, `npm run lint`, and `npm run build` all pass clean.

## 2026-06-23 — Real lint/build gate

`next lint` had never actually been run — it was still on the unconfigured interactive
prompt, so the project had no working ESLint gate despite the build claiming to be green.

- Added `.eslintrc.json` extending `next/core-web-vitals`.
- Installed `eslint@8.57.1` + `eslint-config-next@14.2.35` (eslint-config-next's default
  install pulled eslint 9 / flat config, incompatible with Next 14's `next lint` CLI).
- Fixed everything ESLint then surfaced:
  - Two `react/no-unescaped-entities` errors in `app/onboarding/page.tsx` (apostrophes in copy).
  - `@next/next/no-page-custom-font`: replaced the manual Google Fonts `<link>` tags in
    `app/layout.tsx` with `next/font/google` (`Baloo_2`, `Nunito`), wired to the same
    `--font-display` / `--font-sans` CSS variables Tailwind already expected.
  - `react-hooks/exhaustive-deps` warnings in `app/review/page.tsx` and
    `components/exercises/Exercises.tsx` — all were intentional (snapshot a shuffled
    exercise/SRS queue once per id, not on every parent re-render); annotated with
    `eslint-disable-next-line` plus a comment explaining why, rather than silencing by
    over-including deps and breaking the snapshot behavior.
- Bumped `next` 14.2.18 → 14.2.35 (patch-only) to close most `npm audit` advisories without
  pulling in Next 15/16's breaking changes. Documented the remaining residual-risk advisories
  as a deliberate decision in `PROJECT_STATUS.md` (this app has no middleware and one trivial
  API route, so the residual RSC/middleware classes don't have a real exploit surface here).
- Verified `npx tsc --noEmit`, `npm run lint`, and `npm run build` all pass clean.

## 2026-06-23 — Pre-fill auth after soft log-out

`logout()` in `lib/store.ts` only flips `onboarded` to `false` and deliberately keeps `account`
(that's how progress survives a soft log-out), so the data needed for one-tap re-login was
already there — the onboarding screen just never used it.

- `app/onboarding/page.tsx` reads the store's `account` as `previousAccount` and seeds the
  `name`/`email` state and default `mode` ("login") from it.
- The pre-auth welcome screen now greets a returning learner by name, swaps the primary CTA to
  "Log in", and offers "Use a different account" (clears the pre-filled fields, switches to
  sign-up) instead of the generic "Get started" / "I already have an account" pair.
- Verified `npx tsc --noEmit`, `npm run lint`, and `npm run build` all pass clean.

## 2026-06-23 — Localize AI correction notes

The Gemini tutor's correction `note` was hardcoded to English regardless of the learner's
native language. Plumbed `learnFrom` end to end:

- `app/practice/page.tsx` reads `learnFrom` from the store and sends it in the `/api/chat`
  request body.
- `app/api/chat/route.ts` validates it against `LANGUAGES` (defaulting to `en`) and forwards
  it to `askTutor`.
- `lib/gemini.ts`: `systemPrompt` now tells Gemini to write `correction.note` in the learner's
  native language by name; the no-API-key `simulatedTutor` fallback has translated canned
  notes for en/es/fr/ar (the four languages the UI itself is localized into) and falls back to
  English for the rest — real Gemini calls cover all 11 native languages.
- Verified `npx tsc --noEmit`, `npm run lint`, and `npm run build` all pass clean.
