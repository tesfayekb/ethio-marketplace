# Foundations — turn C2, ruling 1: HOOK-1's line, the two landings outside the first SCOPE, and G1's condition (saved unchanged, 2026-10-28)

```text
RULING 1 — FOUNDATIONS TURN C2, STOP 1 (2026-10-28). Base: dev e987da4 (the stop's landing). This file is a brief in force: it carries the turn's SCOPE, widened by three files, and the rulings below; everything else of docs/governance/briefs/foundations-turn-c2.md stands unchanged and is still read first.

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
SCOPE-END

R1. HOOK-1 — yes. src/lib/env-flags.test.ts gains `__ethioMenuAhead` on app-shell's line of HOOK-1's list, and nothing else in that file changes. A new E2E instrument is named in HOOK-1's list in the same landing — that is HOOK-1's purpose, not a workaround. Re-apply Part C as you kept it.

R2. The two landings outside the first SCOPE (src/routes/settings.tsx :143, src/routes/admin.tsx :69) move onto SIGN_OUT_LANDING in this turn (G0.3: every consumer of the concern is covered in the bundle that builds its mechanism), and their allowlist lines are removed; if the allowlist is then empty, keep the file with a header line saying no exception stands (or drop it and CF-SOL's allowlist read with it — say which, and why). admin.tsx's branch sends both a signed-out visitor and a signed-in visitor without the admin permission to the same page: it uses the constant, with a comment saying the landing is shared by design (if the sign-out landing ever moves, a signed-out visitor on /admin must follow it). Paste CF-SOL-1 green with no allowance.

R3. G1's condition — met. The repeat lane ran on BASE (run 40689208427: its selection ran and correctly found no changed spec, and its skip path ended the lane green), which proves the lane runs and selects; the repetition itself is proven by this turn's own CI run, which repeats the spec files this turn changes. Make the AGENTS.md change as G1 says. If this turn's run shows the repeat lane did not repeat the changed specs, the supervisor reverts that line in the next turn.

R4. ERRT-7 is taken: Part D's planted test takes the next free ERRT id (grep-checked); name it in the report.

HOW: save this ruling (the text between RULING-BEGIN and RULING-END of the message that carried it, title line and fence included, ending with the closing fence and ONE newline) byte for byte by a scripted copy as docs/governance/briefs/foundations-turn-c2-r1.md, paste its sha256sum and byte count; then roadmap.md line 3: the text `docs/governance/briefs/foundations-turn-c2.md` becomes `docs/governance/briefs/foundations-turn-c2-r1.md` (the land hook reads the SCOPE of the file line 3 names). Commit `turn C2: ruling 1 saved`. Then go on from Part C exactly as the brief says, to the end of the turn. The report names this ruling under departures.
```
