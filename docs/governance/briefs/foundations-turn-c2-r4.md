# Foundations — turn C2, ruling 4: the two tests of Part E's consumers (saved unchanged, 2026-10-28)

```text
RULING 4 — FOUNDATIONS TURN C2, STOP 4 (2026-10-28). Base: dev f18cb06 (stop 4's landing). This file is the brief in force: the turn's SCOPE widened by the two test files of two consumers the brief already named; foundations-turn-c2.md, -r1.md and -r2.md and ruling 3 stand and are read first.

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
src/lib/resilient-lazy.test.tsx
src/components/shell/date-field-offline.test.tsx
SCOPE-END

R13. Yes: src/lib/resilient-lazy.test.tsx (RLZ-3) and src/components/shell/date-field-offline.test.tsx (DF-6) take the edits your stop report proposes — a partial mock that keeps the real logOnDemandFailure, and each assertion reading the one log line — and nothing else in either file changes. A test of an in-scope consumer belongs to its consumer's change; the brief should have listed both (the supervisor's slip, S468).
R14. Part E's +30 bytes (logOnDemandFailure's own code: 7 page lines +0.1 KiB, one −0.1) are accepted under R11: report them.
R15. Part D's src residue (12 src files outside SCOPE, allowlisted until 2026-12-31): accepted for this turn. Each line's "until" becomes `INC-937` instead of the date, so the lines fall with INC-937's next turn (the supervisor queues it: those files move onto errorText, or each stays with a recorded exception when the read maps a refusal's own message to words); the in-page read in e2e/shell.spec.ts keeps its reason. INC-937's later word (Part G) says it is PARTLY FIXED, with the counts (113 at BASE; the residue left).
R16. Restore Part E as held, apply R13, re-run E6's set (all passed) and the bundle check, commit Part E, then Parts F and G, THE CHECKS, THE END-TO-END CHECK, the review, the report and the landing, exactly as the brief says. The report names rulings 1–4 under departures.

HOW: save this ruling (the text between RULING-BEGIN and RULING-END, title line and fence included, ending with the closing fence and ONE newline) byte for byte by a scripted copy as docs/governance/briefs/foundations-turn-c2-r4.md, paste its sha256sum and byte count; then roadmap.md line 3: `docs/governance/briefs/foundations-turn-c2-r2.md` becomes `docs/governance/briefs/foundations-turn-c2-r4.md`. Commit `turn C2: ruling 4 saved`, then continue.
```
