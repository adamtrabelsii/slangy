# Worklog

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
