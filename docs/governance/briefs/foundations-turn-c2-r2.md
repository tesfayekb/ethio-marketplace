# Foundations — turn C2, ruling 2: the fetch-ahead itself off every page's first download (saved unchanged, 2026-10-28)

```text
RULING 2 — FOUNDATIONS TURN C2, STOP 2 (2026-10-28). Base: dev a8adebe (stop 2's landing). This file is the brief in force: it carries the turn's SCOPE, widened by two files, and the rulings below; docs/governance/briefs/foundations-turn-c2.md and foundations-turn-c2-r1.md stand unchanged and are still read first.

BASE: a05e5c9594b077ec41fb3ffecc129ea98195eb70

FLAGS: no-migration, no-new-string, no-package-change
SCOPE-BEGIN
src/lib/sign-out-landing.ts
src/lib/sign-out-landing.test.ts
src/components/app-shell.tsx
src/components/shell/app-header.tsx
src/components/ui/overlay-loader.ts
src/lib/on-demand-failure.ts
src/lib/resilient-lazy.ts
src/components/shell/date-field.tsx
src/lib/on-demand-failure.test.ts
src/lib/error-text.ts
src/lib/error-text.test.ts
src/features/posting/map/**
src/features/posting/preview/listing-detail.tsx
src/features/posting/preview/listing-detail-map-failed.test.tsx
src/features/posting/step-where.tsx
src/features/posting/step-where*.test.tsx
src/features/posting/step-who.tsx
src/routes/l.$slug.tsx
e2e/**
scripts/**
src/test/e2e-route-guard.test.ts
AGENTS.md
docs/features/**
docs/governance/mechanisms.md
docs/tracking/incidental-findings.md
docs/_changelog.md
docs/generated/i18n-usage.json
public/i18n-usage.json
src/lib/env-flags.test.ts
src/routes/settings.tsx
src/routes/admin.tsx
src/lib/home-ahead.ts
src/lib/home-ahead.test.ts
SCOPE-END

The stop was right, and so was the DEC-018 fix you found on the way (two E2E names shipping in the production build — keep it, and name it under departures as a finding).

R5. Option (b). The code that fetches ahead serves only a signed-in visitor, and only after the page has loaded, so it does not belong in the entry. `createHomeAhead` and its types move to src/lib/home-ahead.ts (the module's doc comment moves with it; src/lib/sign-out-landing.ts keeps `SIGN_OUT_LANDING` and a one-line pointer). The shell asks for that module once the page is idle (requestIdleCallback with a timeout, a timer where it is missing — as warmOverlaysWhenIdle does, src/components/ui/overlay-loader.ts :63) and only for a signed-in visitor while online; it fetches through the repository's on-demand mechanism (`loadOnce`), its loader declared where the on-demand census's DEFINERS can list it (scripts/conformance/on-demand-failure.test.ts) — add it there, so ODC-1/ODC-3 judge it with no new allowance. A failed download of that module is logged once (the `[client-error]` line) and never raises the shell's notice: the person asked for nothing (warmOverlaysWhenIdle's rule). The E2E state names stay inside `isE2E`.
R6. Tests: HA-…/SAH-… move to src/lib/home-ahead.test.ts and keep every assertion; one more test proves the module is not asked for before idle, nor for a signed-out visitor (planted on the shell's call, or on a small exported scheduler — your design, said in the report).
R7. The measure, lock-exact: `bun run build`, `node scripts/check-bundle-size.mjs` — the entry's JS line and every page's line must be at or BELOW BASE's numbers (paste the table against BASE's and against stop 2's). A page above BASE is a STOP with the table; nothing is trimmed only to change a rounding.
R8. Then go on exactly as the brief says from Part D to the end of the turn (Part C's commit is `turn C2 part C: the offline sign-out's code fetched ahead, off the first download (INC-960; ruling 2)`).

HOW: save this ruling (the text between RULING-BEGIN and RULING-END, title line and fence included, ending with the closing fence and ONE newline) byte for byte by a scripted copy as docs/governance/briefs/foundations-turn-c2-r2.md, paste its sha256sum and byte count; then roadmap.md line 3: `docs/governance/briefs/foundations-turn-c2-r1.md` becomes `docs/governance/briefs/foundations-turn-c2-r2.md`. Commit `turn C2: ruling 2 saved`. The report names both rulings under departures; it is filed under the name the land hook gives it.
```
