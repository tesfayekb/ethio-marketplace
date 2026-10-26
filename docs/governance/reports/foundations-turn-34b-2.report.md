# Foundations turn 34b-2 — completion report

Brief: docs/governance/briefs/foundations-turn-34b-2.md (sha256 71236dd6be2da475cf72fbd55d5b21e590c4d072ad089bc2ec36110c34e122b1, 97458 bytes). Reviewer: NOT READY — two census MAJORs, listed in §9, not fixed (they sit in BLOCK 1, whose bytes are pinned by the hash list).

## 1. Done by part

- A: `git rev-parse HEAD` = 3d699f4a4d637292e94ad5e50f9f78e8daaa9f21 = BASE (<START>). CI evidence read; see §11.
- STEP 0: brief saved; sha256 and byte count match.
- B: BLOCKs 1–3 and the 13 test EDITs applied by script from the saved brief; red run as expected (§4).
- C: BLOCKs 4, 6, 7, 8; strings; resilientLazy; shell notice. `bun run i18n:usage`: 1738 keys across 592 files.
- D: overlays, dialog primitives, step-up gate, pin map, auth-service — every EDIT matched once.
- E: BLOCKs 9 and 5; supabase-door and e2e-select EDITs. Self-test: `e2e-select self-test OK: every spec is reachable; every area glob matches.`
- F: roadmap line 3, mechanisms rows 48/52, harness, changelog, roadmap ticks (34b-1, K1), AGENTS.md line (8892 bytes).
- THE CHECKS, THE END-TO-END CHECK, the reviewer: done (§5–§9).

## 2. Files (`git diff --name-only <START>` plus new files)

AGENTS.md; docs/_changelog.md; docs/features/e2e-harness.md; docs/generated/i18n-usage.json; docs/governance/briefs/foundations-turn-34b-2.md; docs/governance/mechanisms.md; docs/governance/reports/foundations-turn-34b-2.report.md; e2e/helpers/on-demand.ts; e2e/on-demand-failure.spec.ts; e2e/supabase-door.spec.ts; public/i18n-usage.json; roadmap.md; scripts/conformance/on-demand-failure-allowlist.txt; scripts/conformance/on-demand-failure.test.ts; scripts/e2e-select.ts; src/components/app-shell.tsx; src/components/shell/on-demand-notice.test.tsx; src/components/shell/on-demand-notice.tsx; src/components/ui/alert-dialog-primitive.tsx; src/components/ui/dialog-primitive.tsx; src/components/ui/overlay-facade-failure.test.tsx; src/components/ui/overlay-facade.tsx; src/components/ui/overlay-loader.ts; src/features/auth/auth-client.test.ts; src/features/auth/auth-service.ts; src/features/auth/mfa/step-up-gate.test.tsx; src/features/auth/mfa/step-up-gate.tsx; src/features/auth/mfa/use-step-up.ts; src/features/posting/step-where.tsx; src/i18n/locales/am-base.ts; src/i18n/locales/en-base.ts; src/lib/on-demand-failure.test.ts; src/lib/on-demand-failure.ts; src/lib/resilient-lazy.test.tsx; src/lib/resilient-lazy.ts.

## 3. Behaviour contract (before → after)

- Menu's code fails: the tap does nothing and nobody is told → the shell notice shows `common.loadFailed` with Refresh and Close (ODE-1, OVF-9).
- Dialog's code fails (step-up gate): the dialog closes and the gate rejects StepUpCancelled → the notice shows and the gate rejects StepUpUnavailable through `onUnavailable` (OVF-16/20, SUG-1).
- Map preview / crumb fails: the fallback is drawn and only logged → the fallback is drawn and the shell notice shows (RLZ-2).
- Pin map fails: a "Try again" that reloads → LoadFailedHere in place (words and Refresh), with no shell report (RLZ-3).
- Sign-in code fails: `auth.errorGeneric` → `common.loadFailed` in the screen's own alert (ASC-1/3, SBE-4/5).
- When every download succeeds: no change; the notice never shows.

## 4. Red first (on BASE's code)

```
FAIL src/lib/resilient-lazy.test.tsx — Failed to resolve import "./on-demand-failure"
× ASC-1, × ASC-3, × SUG-1 (expected StepUpCancelled: step-up cancelled to be an instance of StepUpUnavailable)
× OVF-9 expected [] to deeply equal [ 'a menu\'s code' ]
× OVF-16 expected [] to deeply equal [ 'a dialog\'s code' ]
× OVF-20 expected [ 'open false' ] to deeply equal [ 'unavailable', 'open false' ]
× ODC-1 expected 'src/components/ui/overlay-facade.tsx:…' to be ''
× ODC-3 … to match /reportOnDemandFailure\(label, error\)/
Test Files  5 failed (5)   Tests  8 failed | 6 passed (14)
```

## 5. Checks

- Hash list `sha256sum -c`: every line OK.
- `git diff <START> --stat -- src/integrations supabase`: empty.
- Lint: 0 errors, 39 warnings.
- Unit (full): Test Files 315 passed (315); Tests 1956 passed | 1 skipped (1957).
- D4 subset run: 1 failed, 918 passed. The failure was CF-SL-1, which timed out at 5000 ms (INC-921). Run alone: 6 passed.
- i18n:map-guard: usage maps match the tree. Hardcoded strings: findings 0. Build log: build OK. format:check: run last (§12).

## 6. End-to-end (both projects, fake mode, 0 retries)

- on-demand-failure: 2 passed.
- supabase-door: 10 passed.
- mfa-stepup: 18 passed.
- overlays: 5 passed, 1 skipped (an existing project skip).
- breadcrumbs: 6 passed.
- i18n-bundle: 6 passed.
- smoke-auth-i18n: 2 passed.
- post-wizard-where: 32 passed (5.2 min). See the departure in §10.
- `[ssr-error]` lines in the server logs: 0.

## 7. Consumer census (ODC-1 at the turn's end: loader callers 15; outside the mechanism 14; allowlist 14)

Moved here: overlay-facade.tsx :127; step-up-gate.tsx / use-step-up.ts; every resilientLazy piece (breadcrumbs.tsx :49–:78, step-where.tsx :53/:58, listing-detail.tsx :48/:53); auth-service.ts.

The allowlist's 14 lines are BLOCK 2's, unchanged:
- Four for good: app-shell.tsx, auth-service.ts, routes/auth.tsx, legal.publishing.tsx.
- Ten until INC-911: date-field.tsx :49, use-category-glyphs.ts :39, use-auth.ts :71, map-large.tsx :41, map-pin-dropper.tsx :191, map-preview.tsx :74, listing-detail.tsx :49, step-who.tsx :210, i18n/provider.tsx :594, settings.tsx :173.

## 8. K2

- Loader callers outside the mechanism: the 14 allowlisted files above. None is left without a line.
- In-place "didn't load" messages not drawn by LoadFailedHere: date-field.tsx (calendar), step-who.tsx (phone box), map-pin-dropper.tsx, and strings-layer-gate.tsx (INC-909).
- "Try again" still offered for a failed download: date-field.tsx:186 and step-who.tsx :210. Both are expected for 34b-3.

## 9. Reviewer (independent, on the final tree) — VERDICT: NOT READY

- MAJOR 1, scripts/conformance/on-demand-failure.test.ts:96: loaders are matched by their literal name. An aliased import (`getSupabase as client`) or a namespace call escapes the census.
- MAJOR 2, the same file :79–80, :114: any reference to an imported answer exempts the whole file, even one that does not handle the failure (`void refreshPage` next to a silent catch).
- Not fixed, because both are in BLOCK 1, whose bytes the hash list pins (c2dcfff0…). Changing them would break THE CHECKS, which allow only a re-copy. Neither is exploited at <START>: the census finds the supervisor's 15 callers. A corrective ruling or turn 34b-3 can tighten them.
- The reviewer also confirmed: `onUnavailable` is stripped before Radix gets its props, the notice hydrates without a mismatch, the pin map does not report twice, the step-up gate rejects only once, and the success paths are unchanged.

## 10. Departures

- post-wizard-where: my first run was cut off by a 140-second cap I had set myself, well under the 600-second ceiling. That run left its test server holding port 4173 (PID 20453), and the port guard refused the next start. I stopped that stale server and ran the spec once in the foreground with the full allowance: 32 passed. This was a second local run after a run cut short, not a repeat of a finished run.

## 11. Strings, migrations, CI

- common.loadFailed — en "Part of this page didn't load. Check your connection, then refresh the page." — am «የዚህ ገጽ ክፍል አልተጫነም። ግንኙነትዎን ይፈትሹና ገጹን ያድሱ።»
- common.refreshPage — en "Refresh page" — am «ገጹን ያድሱ»
- Migrations: none.
- ci-status.md, first lines (the latest readable run, on c1b6b4e5, not yet on BASE):

```
# CI Status (auto-generated — do not edit by hand)

- Commit: `c1b6b4e5edada0c66524eed2fd79c7eec6a65fc0` (short `c1b6b4e`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-10-26T14:05:56Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40333117660
```

## 12. Limits

- CF-SL-1 timed out under the D4 subset run's load (INC-921) and passes alone.
- The pinned browser is missing in this sandbox, so the runs used Chromium 1194 (E2E_CHROMIUM_PATH).
- I could not read CI for this turn's own commit.
- format:check runs last, after this file is written.
