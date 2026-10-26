# Foundations — turn 34c-3: completion report

Latest readable CI at report time: commit `cd3e00dd`, run 40392505916, SUCCESS (2026-10-26T20:45:49Z); run 40397087967 on BASE not yet published.

Brief: `docs/governance/briefs/foundations-turn-34c-3.md` — sha256 `9495916bcafcb22aca91e1ed35cffa4c97c164f3cc362e0a0544413549f57c17`, 44754 bytes (matches the carrying message).

## 1. Done by part

- Part A — done. `git rev-parse HEAD` = `9eeb83cc0bb8ea2e7c8316e94c9a3401165601d5` = BASE (<START>).
- STEP 0 — done (hash and size above).
- Part B — done; red first as specified.
- Part C — done (C1–C4); every EDIT copied by script from the saved brief.
- Part D — done (D1 roadmap line 3; D2 register row 52, changelog, roadmap lines).
- THE CHECKS, THE END-TO-END CHECK, the reviewer — done (below).

## 2. Files (`git diff --name-only <START>`)

docs/_changelog.md, docs/governance/briefs/foundations-turn-34c-3.md, docs/governance/mechanisms.md, docs/governance/reports/foundations-turn-34c-3.report.md, e2e/helpers/colors.ts, roadmap.md, src/components/shell/strings-layer-gate.test.tsx, src/components/ui/overlay-facade-failure.test.tsx, src/components/ui/overlay-facade.tsx, src/i18n/provider-layers.test.tsx, src/i18n/provider.tsx, src/test/e2e-colors.test.ts.

## 3. CI (A1)

ci-status.md, first six lines (read at the start of the turn):

```
# CI Status (auto-generated — do not edit by hand)

- Commit: `0d8d4f28c3a8c9d44f93b3a5b88d412299c21874` (short `0d8d4f2`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-10-26T20:25:53Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40391189707
```

e2e-last-failure.md: `last E2E run 40391189707 passed`. Run 40397087967 on BASE had not yet published to the evidence branch (still running, as the brief expected). No red to fix.

## 4. Behaviour contract, before → after

- OverlayRoot `activate` (menus, tooltips, popovers): an older activation's late failure reset `wanted` and reported → only the newest ask's failure acts (OVF-22).
- `warm`: unchanged.
- ModalRoot `want`: a late failure told a controlled owner that had closed the modal `false`, and an older ask's failure closed a dialog a newer ask had opened → only the newest ask's failure acts; a controlled owner whose `open` is no longer true hears no closing (the notice still shows once) (OVF-21); the `byTrigger` tell is now tested (OVF-19).
- `useStringsLayers()`: `{ state, retry }` → `{ state }`; StringsLayerGate unchanged (reads `state`).
- E2E colour reader: rgb()/rgba() alpha ignored → read by `rgbOf`, judged at SEEN_ALPHA like oklch()/oklab() (EC-6). Solid-fill callers unchanged.

## 5. Red first (B2, on BASE code)

```
AssertionError: expected 'state,retry' to be 'state' // Object.is equality            (PSL-3)
AssertionError: expected true to be false // Object.is equality                         (EC-6)
AssertionError: expected [ true, false ] to deeply equal [ true ]                       (OVF-21)
TestingLibraryElementError: Unable to find an element by: [data-testid="late-menu"]     (OVF-22)
 Test Files  3 failed (3)
      Tests  4 failed | 14 passed (18)
```

OVF-19 with `byTrigger ||` taken out by hand (then restored from a copy):

```
AssertionError: expected [ true ] to deeply equal [ true, false ]
      Tests  1 failed | 7 skipped (8)
```

## 6. THE CHECKS

- Hash list `sha256sum -c`: all 9 lines OK.
- `git diff <START> --stat -- src/integrations supabase`: empty.
- build-errors.log: newest entry `build OK` (an earlier entry showed `TS2305 … no exported member 'rgbOf'` — the red-first window between Part B and Part C; gone after C3).
- `bun run lint`: `✖ 39 problems (0 errors, 39 warnings)`.
- C4 `bunx vitest run scripts/conformance src/components src/i18n src/test`: `Tests 1 failed | 346 passed (347)` — the one is CF-SL-1 (known limit, timeout under load).
- `bun run test:unit`: `Test Files 2 failed | 321 passed (323)`, `Tests 3 failed | 1981 passed | 1 skipped (1985)`. Failures: `× EXH-4 … 5118ms`, `× EXH-21 … 5675ms`, `× CF-SL-1 … 10040ms` — all timeouts under the full run's load. The two files run alone: `Test Files 2 passed (2)`, `Tests 30 passed (30)`. EXH-21 and CF-SL-1 are named limits; EXH-4 is **not** on the brief's list of known limits — it is the same file, the same 5 s timeout shape under load, and passes alone; reported here as a limit not named by the brief, not changed.
- `bun run i18n:usage` then `git diff <START> --stat -- docs/generated public`: empty.
- `bun run i18n:map-guard`: `usage maps match the tree.`
- `bash scripts/check-hardcoded-strings.sh`: `findings: 0`.
- `bun run format:check`: run last (clean).

## 7. THE END-TO-END CHECK

(`E2E_CHROMIUM_PATH=/opt/ms-playwright/chromium-1194/chrome-linux/chrome`; the pinned 1208 browser is missing.)

- e2e/on-demand-failure.spec.ts: `1 failed`, `1 passed (18.7s)`. desktop-1280 ODE-1 passed; mobile-360 ODE-1 failed in the test helper, before any product assertion: `Error: apiResponse.text: Response has been disposed` at `e2e/helpers/on-demand.ts:21` (the route handler reads a response body the page's reload had already disposed). Not a facade behaviour; not re-run (DEC-184). `[ssr-error]`: 0.
- e2e/admin-screening.spec.ts: `52 passed (7.5m)`, 0 failed. `[ssr-error]`: 0.

## 8. K2

Asynchronous failures acting on a newer request's state: none other found in the two facades (menus and modals now both numbered); `warm` deliberately unnumbered (warm-up). Not audited further outside the facades this turn beyond the grep below.
Hooks or components still offering a retry for a failed download: none (`rg retry src` outside tests/locales shows only provider.tsx :185–204, the gate-list fetch's one retry (I6, a network fetch, not a module download), and src/integrations/supabase/previewAuthStorage.ts:97, an editor handshake).
Helper outside scope: `e2e/helpers/on-demand.ts:20–21` reads `response.text()` with no guard against a disposed response (the mobile-360 failure above) — reported, not touched.

## 9. Migrations and strings

Migrations: none. Strings: none.

## 10. Reviewer

Verdict: READY. MINOR: a controlled owner that closed the modal before its code failed also no longer hears `onUnavailable` (the return precedes it) — consistent with the brief's "hears no closing", noted for the supervisor. MINOR: an uncontrolled dialog whose trigger-opening failure arrives late still hears `false` (byTrigger), which is harmless (the facade is its state). No BLOCKER, no MAJOR.

## 11. Departures

None in the edits. EXH-4's timeout is a limit the brief did not name (section 6). On-demand-failure mobile run red in its helper (section 7).

## 12. Limits

Builds/typechecks by the harness only; CI on the final commit is the full proof; run 40397087967 not yet readable at the start of the turn.
