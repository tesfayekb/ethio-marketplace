# Foundations turn 22 — completion report (2026-10-25)

## 1. Files

START for this resumed ruling: `104b8b131dba10a8913c4e8fb5379af213ef329e`; original brief BASE: `a48a2171eac2f3f11432aceaf45696d3b268e62e`. Closure HEAD: `e415c7e02a76a86b235aa6300cb285797ccaf8d8`. The platform's final commit carries this report and roadmap closure; its hash cannot be predicted here.

`git diff --name-only 104b8b131dba10a8913c4e8fb5379af213ef329e` before report creation named 26 files. With this report, the delivery is 27 files:

```text
AGENTS.md
docs/_changelog.md
docs/features/ci-guards.md
docs/features/routes.md
docs/generated/i18n-usage.json
docs/governance/briefs/foundations-turn-22.md
docs/governance/mechanisms.md
docs/governance/reports/foundations-turn-22.report.md
eslint.config.js
public/i18n-usage.json
roadmap.md
scripts/admin-tables.ts
scripts/conformance/kit-adoption-allowlist.txt
scripts/conformance/kit-adoption.test.ts
scripts/conformance/routes-allowlist.txt
scripts/conformance/routes.test.ts
scripts/destructive-red.ts
scripts/list-action-labels.ts
src/components/shell/location-data.ts
src/components/shell/place-carry.ts
src/features/legal/agree-to-document.test.tsx
src/features/legal/use-legal-gate.test.tsx
src/features/posting/post-prefill.test.ts
src/features/posting/post-prefill.ts
src/lib/schemas/primitives.ts
src/lib/uuid.ts
src/look-law.test.ts
```

`git ls-files src/lib/uuid.ts` prints `src/lib/uuid.ts`; `git ls-files docs/governance/briefs/foundations-turn-22.md` prints that path. This report's tracked-file proof is checked after its save. No e2e file, package, migration, .claude file or CLAUDE.md changed.

## 2. Part A — CI first

Part A stands from the previous stop. START then was `a48a2171eac2f3f11432aceaf45696d3b268e62e`. The authoritative ci-evidence URLs were read again for this completion (not dev/main files):

```text
# CI Status (auto-generated — do not edit by hand)

- Commit: `a48a2171eac2f3f11432aceaf45696d3b268e62e` (short `a48a217`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-10-25T14:42:10Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40201962164
```

`e2e-last-failure.md`: `last E2E run 40201962164 passed`. `guards-last-failure.md`: `No failed build/guard jobs in this run.` Nothing to fix. Turn 22's final CI is not yet proved.

## 3. Done by part and step

- STEP 0: exactly one EOF newline appended per the supervisor's ruling; no other brief bytes changed. SHA-256 `aa6ef5e1d0ff1eb48d86557281009ed9d5e36db98c9e11fda1ab67c74a5cb124`. Roadmap line 3 names turn 22, and the new task followed turn 21; no other task ticked.
- B1: import-free `src/lib/uuid.ts` owns the UUID shape.
- B2: primitives imports and re-exports UUID_RE; uuid and translate consumers unchanged.
- B3: location-data and place-carry import the same shape; their uses unchanged.
- B4: post-prefill keeps valid uppercase ids and lowercases them; PF-1 title and second expectation changed as specified, all other assertions retained.
- B5: CF-RT-3's sole-definition path/title changed; routes allowlist and ESLint ignores shrank together, 4 → 1; platform INC-087 is retained with the prescribed reason.
- C1: removed the six allowances first; CF-ADOPT-1 failed naming every walker. Final floor 13 and prescribed comment.
- C2: look-law uses walkFiles and visitTs; UI directory skip covers both slash styles. Temporary planted file detected and deleted.
- C3–C5: admin-tables, destructive-red and list-action-labels use walkFiles, retaining the specified roots, extensions, UTF-8 reads and mapping; first two retain their final relative-path sort.
- C6: agreement census uses walkFiles with ts/tsx and skipTests, then the existing two content checks.
- C7: legal-gate census dynamically imports the kit and restricts matches to direct auth*.tsx children of src/routes.
- D1–D3: only the specified documentation/register replacements; each old text counted exactly once before replacement.
- D4: AGENTS.md's one phrase only; byte count 5841 → 5873.
- D5: append-only changelog entry; roadmap closed with totals and closure HEAD.
- THE CHECKS, E2E and this completion report: done, with limits below.

## 4. Red-first

C1, before converting the walkers:

```text
[kit-adoption] census: 19 files, allowances: 11, breaches: 8
FAIL CF-ADOPT-1
scripts/admin-tables.ts:38 imports a tree enumerator
scripts/admin-tables.ts:62 imports a tree enumerator
scripts/destructive-red.ts:24 imports a tree enumerator
scripts/list-action-labels.ts:23 imports a tree enumerator
src/features/legal/agree-to-document.test.tsx:2 imports a tree enumerator
src/features/legal/use-legal-gate.test.tsx:158 imports a tree enumerator
src/look-law.test.ts:1 imports a tree enumerator
src/look-law.test.ts:29 calls createSourceFile(
Test Files 1 failed; Tests 1 failed | 1 passed
```

Eight findings cover the six files; the existing matcher can produce more than one finding per file. No scanner change made to hide them.

C2 planted `src/features/zz-planted.tsx` with `rounded-lg border border-border bg-card`:

```text
FAIL src/look-law.test.ts > LL-1 cards never carry a plain border
AssertionError: 1 sites in 1 files
src/features/zz-planted.tsx:1
Test Files 1 failed; Tests 1 failed | 1 skipped
```

The temporary file was removed immediately. After removal, LL-1/LL-2 pass. Seven C-batch files / 40 tests passed; final focused check 4 files / 16 tests passed, including CF-RT-1…8, CF-ADOPT-1/2, LL-1/2 and PF-1…3.

```text
[kit-adoption] census: 13 files, allowances: 11, breaches: 0
[routes-allowlist] 1 allowances
```

## 5. The checks

Prescribed order:

1. `bun run lint`: exit 0; `40 problems (0 errors, 40 warnings)`.
2. `bun run test:unit`: exit 1; files `1 failed | 282 passed (283)`; tests `2 failed | 1795 passed | 1 skipped (1798)`; duration 291.64s. Only INC-890 kit timeouts below failed. All other unit tests passed, including the touched walkers, CF-RT, CF-ADOPT, LL and PF. Final focused verbose check: 16 passed / 4 files, 4.90s.
3. `/tmp/observability/build-errors.log`: `build OK` at 2026-10-25T14:52:44Z and later 14:58:21Z; no `error TS` line. No manual standalone build/typecheck run; the mandated e2e:local wrapper performs its own build.
4. `bun run i18n:usage`: exit 0; 1736 keys across 564 files, 395 dynamic call sites. Both maps changed only `scanned: 563 → 564` because uuid.ts is new; no key/call-site change.
5. `bun run format:check`: exit 0; `All matched files use Prettier code style!`.

Touched source/script lint exit 0; markdown paths report ignored/no matching configuration (not proof of markdown lint). Prettier checked the guard scripts separately and the prescribed full formatting check includes docs. Closure/report formatting is checked again last.

## 6. End-to-end check

All runs started through `bun run e2e:local`, targeting ethio-staging, both projects (mobile-360 and desktop-1280), 2 workers, fake mode, E2E_RETRIES=0; Chromium override `/opt/ms-playwright/chromium-1194/chrome-linux/chrome`. Port 4173 was free before the first run. No repeat, background rerun, spec/helper modification or timeout override.

| File / selection | Result | Server `[ssr-error]` count |
| --- | --- | --- |
| post-wizard-category.spec.ts --grep "PW-181 &#124;PW-182 " | 4 passed (44.1s) | 0; no path-labelled entries |
| post-wizard-where.spec.ts --grep "PW-180 " | 2 passed (39.7s) | 0; no path-labelled entries |
| locations-tree.spec.ts whole | 8 passed (45.0s) | 0; no path-labelled entries |

All 14 requested E2E checks passed. Category PW-182 exercised the password and callback return with real test accounts and invite ids. The category server log separately contains two `Error in renderToReadableStream: ReferenceError: window is not defined` messages from the auth callback; these are not `[ssr-error]` lines, and are not presented as absent. Source location and scope limit below. All three teardown summaries report 0 transport retries and deleted 3 process-owned users.

## 7. K2 — every remaining UUID shape and census file

Non-test UUID regex definitions under src/:

- `src/lib/uuid.ts:7` — the shared shape, sole matching definition.
- `src/integrations/supabase/previewAuthStorage.ts:48` — the platform's distinct v4 preview-host pattern, retained under INC-087. Not edited.

No remaining browser/server copies of the shared regex. CF-RT-3/4 prove this concern. Plain UUID values in fixtures or the feed's all-zero sentinel are not regex definitions.

Final exact existing kit matcher output, 13 distinct files (line numbers retained, duplicates per file shown):

```text
scripts/check-bundle-size.mjs:17
scripts/check-root-routes.ts:14
scripts/conformance/kit-adoption.test.ts:16,56
scripts/conformance/kit.ts:1,37
scripts/e2e-failure-report.ts:30
scripts/e2e-leases.ts:23,55
scripts/e2e-migration-preflight.ts:30
scripts/e2e-select.ts:27
scripts/i18n-usage-map.ts:32
scripts/test-ids.ts:14
src/features/posting/price-basis.test.ts:1
src/i18n/locales/admin-layer.test.ts:1
src/lib/refresh-after-write.test.ts:1
```

`kit.ts` implements the concern; `kit-adoption.test.ts` imports it. The other 11 are allowlisted: five guard walkers until INC-858 (check-root-routes, e2e-leases, test-ids, admin-layer, refresh-after-write), six non-guard enumerators until DEC-244 (check-bundle-size, e2e-failure-report, e2e-migration-preflight, e2e-select, i18n-usage-map, price-basis). None touched. Converted six files no longer produce census findings.

Out-of-scope runtime sibling found during the requested E2E flow: `src/routes/auth_.callback.tsx:49` reads window.location.search in a useState initializer during SSR. Two category-run render errors; not fixed because the file is outside THE FILES. Supervisor follow-up required.

## 8. Counts and contracts

- Routes allowances 4 → 1; matching lint ignore lines 4 → 1 in the same batch.
- Kit-adoption allowances 17 → 11; census 19 → 13 distinct files; final breaches 0.
- AGENTS bytes 5841 → 5873; each D3 old text count 1.
- Only recorded product behaviour change: uppercase category/place ids kept in lowercase. PF-1's changed assertion is deliberate, not weakened. Other parser rules and walker checks retained.
- No schema migration, new visible string, package update or screen redesign.

## 9. Limits

Whole-suite failures, unchanged under the known INC-890 limit:

```text
FAIL scripts/conformance/executor-hooks.test.ts > the landing door (land.ts) > EXH-11 refuses a red check (and the stop gate refuses the unlanded turn); with the checks green it lands, and the gate lets the turn end
Error: Test timed out in 5000ms.
FAIL scripts/conformance/executor-hooks.test.ts > the landing door (land.ts) > EXH-17 when the session's git refuses dev and hold/*, the door parks the commits on the session's own branch — never anywhere else
Error: Test timed out in 5000ms.
```

No skip, workaround or edits to the other executor's kit. Unit suite is not claimed fully green. Auth callback SSR error at :49 remains outside scope; tests pass despite those messages. Final-commit CI not yet readable; no CI success claim for this landing.

## 10. Departures

- STEP 0 ruling (2026-10-25 14:48 UTC, base 104b8b13): the supervisor's byte comparison identified only the missing final newline. Appended exactly one newline with the file-edit command, changing nothing else; checksum matched. This authorized repair replaces the prior STOP.
- i18n usage expected no change; only its scanned-file count increased by one because the new import-free module is included. Both generated maps included under the brief's explicit allowance.
- A final focused guard/parser check was run after removing the LL planted file and fixing the prescribed cross-platform skip pattern, to verify the final saved state. No local E2E repeats.

## 11. CI wait report

Closure HEAD `e415c7e02a76a86b235aa6300cb285797ccaf8d8` precedes this report/roadmap's platform save. Last authoritative readable CI remains run 40201962164 on a48a2171, SUCCESS. END THE TURN after final checks; the supervisor judges the final commit's CI. No publish action.

## 12. Summary

Parts A–D complete. Brief checksum verified. One UUID shape, six walkers on the kit, INC-857 closed; all 14 requested E2E checks passed; lint 0/40; focused 16 passed; harness build OK; formatting clean. Known EXH-11/17 sandbox timeouts and the out-of-scope callback rendering errors are disclosed. All changed files listed above.
