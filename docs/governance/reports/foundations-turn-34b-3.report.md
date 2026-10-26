# Foundations turn 34b-3 — completion report

Brief: `docs/governance/briefs/foundations-turn-34b-3.md`. Status: **done, all parts**. Reviewer verdict: **NOT READY** (two census MAJORs, not fixed; see §9).

## 1. Parts

- A — done. `git rev-parse HEAD` = `470d16baef25173a3993588d6d9076b0bfc822c7` = BASE (<START>). The CI read at A1 was run 40358294719 on `a8c025e`: FAILURE. Its only failures were sign-out SO-12, marked flaky at desktop, and the auth-signout reds the brief expects, plus one flaky AP-32 retry. Both are turn 34w's, so nothing was touched.
- STEP 0 — done. `d080b9a6afe0ecc994cbd88843de4bcf4e8a7c08c56e3050a83e3c50b496ff98`, 77727 bytes; the brief was taken from the saved message text by script.
- B — done (blocks copied by script). C — done. D — done (roadmap line 3 updated by script; the three D2 edits applied).
- THE CHECKS, THE END-TO-END CHECK, review, report — done.

## 2. Files (`git diff --name-only <START>`)

docs/_changelog.md, docs/generated/i18n-usage.json, docs/governance/briefs/foundations-turn-34b-3.md, docs/governance/mechanisms.md, public/i18n-usage.json, roadmap.md, scripts/conformance/on-demand-failure-allowlist.txt, scripts/conformance/on-demand-failure.test.ts, src/components/shell/date-field-offline.test.tsx, src/components/shell/date-field.tsx, src/components/shell/strings-layer-gate.test.tsx, src/components/shell/strings-layer-gate.tsx, src/components/shell/use-category-glyphs.ts, src/components/shell/use-footer-inset.ts, src/features/auth/use-auth.ts, src/features/posting/map/map-large.tsx, src/features/posting/map/map-pin-dropper-offline.test.tsx, src/features/posting/map/map-pin-dropper.tsx, src/features/posting/map/map-preview.tsx, src/features/posting/phone-parse.ts, src/features/posting/preview/listing-detail.tsx, src/features/posting/step-who.test.tsx, src/features/posting/step-who.tsx, src/i18n/compiled-catalog.ts, src/i18n/locales/am-member.ts, src/i18n/locales/en-member.ts, src/i18n/provider.tsx, src/lib/load-once.ts, src/routes/settings.tsx, plus this report (it replaces the STOP report).

## 3. Behaviour contract (failed download: before → after)

- Calendar: "Try again" that cannot work → LoadFailedHere with Refresh (date-field.tsx :49).
- A page's strings layer: `auth.errorGeneric` with "Try again" → LoadFailedHere.
- Glyphs: logged, rows without glyphs → reported to the shell's notice, rows without glyphs.
- Large map (map-large.tsx :41) and map preview (map-preview.tsx :74): logged or silent → reported.
- Pin map's own map (map-pin-dropper.tsx :191): "Tap the map instead" with no map → LoadFailedHere plus a `[client-error]` line.
- Map's links (listing-detail.tsx :49): logged → reported.
- Phone library (step-who.tsx :210): "Try again" → Refresh on the shared Button, with its own words kept.
- A language's strings (provider.tsx :594): an unhandled rejection → reported, base left empty. A failed layer part → reported.
- Account read (use-auth.ts :71) and Settings (settings.tsx :173): logged → reported.
- Footer font wait: silent → `[client-error]` line.
- With every download succeeding: unchanged.

## 4. Red first (B2, on BASE code)

`Tests  7 failed | 5 passed (12)`: ODC-1 (`expected 'src/components/shell/date-field.tsx:4…' to be ''`), ODC-2 (`expected 'node_modules/.cache/on-demand-failure…' to be …`), ODC-4 (`expected [ …(4) ] to deeply equal [ …(6) ]`), DF-6 (`Unable to find … df-calendar-failed`), SLG-3 (`expected 'auth.errorGenericcommon.tryAgain' to contain 'common.loadFailed'`), PMD-1 (`… post-pin-load-failed`), PLF-1 (`… post-who-phone-lib-refresh`). This matches the brief.

## 5. Checks

- Hash list: every line OK. `git diff <START> --stat -- src/integrations supabase e2e`: empty.
- Lint: 0 errors, 39 warnings.
- C2 run: 159 files, 926 passed, 1 failed. The failure was CF-SL-1, a timeout under load (known limit INC-921); strings-layers.test.ts alone: 6 passed.
- `bun run test:unit`: 317 files, 1965 tests: 1962 passed, 1 skipped, 2 failed. Both were timeouts and are known limits: AAN-1 and CF-SL-6 (`Error: Test timed out in 5000ms.`). Alone: auth-answers + strings-layers, 8 passed.
- i18n:map-guard: maps match. Hardcoded strings: findings 0. Build log: `build OK`. format:check: last, clean.

## 6. End-to-end (Chromium 1194 override, both projects, 2 workers, 0 retries)

- settings + smoke-auth-i18n + on-demand-failure + i18n-bundle + category-nav (one run): `29 passed (1.6m)`.
- post-wizard-bundle2: `70 passed (9.1m)`.
- post-wizard-where: `32 passed (5.2m)`.
- post-wizard-place: `38 passed (6.9m)`.
- ad-page: **killed by the 590-second ceiling**, with 75 passed and 1 failed before the kill. The failure was `AP-36 the layout follows the article's width` at desktop (a layout test, not the map's links); its error was not captured before the kill. It was not re-run (S407).
- A first combined run of bundle2 + ad-page was also killed by the ceiling, and it was reported, not re-run in the background. bundle2 was then run alone, once.
- `[ssr-error]` across all logs: 0.

## 7. Consumer census and K2

- Consumers at <START> are as listed in the brief, with the lines in §3. After the change, ODC-1 names no caller beyond the allowlist.
- Allowlist before: 4 lines for good + 10 `until INC-911` (date-field, use-category-glyphs, use-auth, map-large, map-pin-dropper, map-preview, listing-detail, step-who, i18n/provider, settings).
- Allowlist after: 4 lines (app-shell E2E hand-off, auth-service, auth.tsx, legal.publishing).
- K2: there is no in-place "didn't load" message not drawn by LoadFailedHere, except the phone box's own words, as expected. No "Try again" remains for a failed download. `useStringsLayers().retry` has no product caller; it is retired in turn 34c, as its roadmap line says.

## 8. Strings and migrations

- Retired: `post.who.phoneLibRetry`, en "Try again", am «እንደገና ይሞክሩ».
- Migrations: none.

## 9. Reviewer (independent, on the final tree)

Verdict: **NOT READY**. Two MAJORs, both in `scripts/conformance/on-demand-failure.test.ts`:

1. `isSilent` (:136–140) does not count an empty `catch {}` block after an awaited call, or `() => { return undefined; }`, as silent.
2. `rejectionHandler` (:109–110) accepts `.then(ok, undefined)` as a handler.

Both are in SCOPE, but the file's whole text is fixed by the brief's hash list. A fix would break the prescribed hash, so neither was fixed. Both are listed for a ruling, ideally with planted fixtures in ODC-4. Production consumers were judged correct.

## 10. Departures

- The ad-page run was cut by the ceiling (see §6).
- The E2E specs were run in several separate runs within the ceiling, not as one run.

## 11. CI (last readable)

```text
# CI Status (auto-generated — do not edit by hand)

- Commit: `470d16baef25173a3993588d6d9076b0bfc822c7` (short `470d16b`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-10-26T17:18:09Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40360382373
```

That is BASE; its failing jobs were not read in this turn. Turn 34w's SO-11/SO-12 are expected there.

## 12. Limits

- AAN-1, CF-SL-1 and CF-SL-6 time out under full load and pass alone (INC-921).
- The ad-page spec cannot finish within the 600-second ceiling in this sandbox.
- The reviewer could not run the conformance tests while staying read-only.
