# Worklog

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
