# Foundations turn 27 — completion report

Brief: docs/governance/briefs/foundations-turn-27.md (speed S4 — the reads every page makes start with the page; D234).

## 1. Start and CI (Part A)

`git rev-parse HEAD` at A1: `a025b400d4ff845574b1b7ed5619be1223b6151e` (<START>).

First six lines of ci-status.md, at A1 and at the final evidence read:

```text
# CI Status (auto-generated — do not edit by hand)

- Commit: `a025b400d4ff845574b1b7ed5619be1223b6151e` (short `a025b40`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-10-25T19:22:45Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40224308814
```

E2E evidence: `last E2E run 40224308814 passed`. Guards evidence: `No failed build/guard jobs in this run.` Nothing to fix. The operator verified main promotion and every lowered bundle ceiling; no separate promotion read was made here.

## 2. STEP 0

```text
36eb852ea6809b1938969fc6b55e8f6547605b3479d2853263a0dd7fd90018f8  docs/governance/briefs/foundations-turn-27.md
30821 docs/governance/briefs/foundations-turn-27.md
```

Byte-equal to the carrying message. Roadmap line 3 names this brief; its line was added directly after Foundations turn 26, and only that line was ticked on completion.

## 3. Done by part and step

A1, STEP 0, B1–B4, C1 and D1–D4 done. Exact FILE/EDIT blocks copied by a temporary script from the saved brief. No migration, strings, package, endpoint or ceiling change. Four anonymous fetch preloads use the readers' own builders; client navigation returns an empty firstReads list. The end-to-end check and completion report are done. Final commit CI remains the supervisor's judgment.

## 4. Files and tracked new files

`git diff --name-only <START>` before the report, plus this report:

```text
AGENTS.md
docs/_changelog.md
docs/features/performance-strategy.md
docs/generated/i18n-usage.json
docs/governance/briefs/foundations-turn-27.md
docs/governance/mechanisms.md
e2e/shell.spec.ts
public/i18n-usage.json
roadmap.md
src/components/shell/location-data.ts
src/features/categories/category-tree.ts
src/lib/first-reads.test.ts
src/lib/first-reads.ts
src/routes/__root.tsx
docs/governance/reports/foundations-turn-27.report.md
```

`git ls-files` returned all three new files available at that point:

```text
docs/governance/briefs/foundations-turn-27.md
src/lib/first-reads.test.ts
src/lib/first-reads.ts
```

The report is saved by the platform after creation; its tracking proof is checked below. Last observed code HEAD: `fb879aea87e10ff078019c0d0b8c246ab1ed7679`. The final report/roadmap commit ID cannot be known before the platform creates it; no stateful git command was run.

## 5. THE CHECKS — hashes

```text
82236e2b32d4c83d5b9569b45d01b7076723965989d53aee041ce043ed880974  src/lib/first-reads.ts
acccdc07acded4eab89da5408b9c3ada2fcad593d8f76159d7bff4f91494f075  src/lib/first-reads.test.ts
338185b3493fc4318c73f730b6df37a80d220e2bb57eb154c4cc97c12a70d218  src/components/shell/location-data.ts
ab039c636a5c6f5090b9ce34798d3cdfab537b99b8f3236585e19f06f16acad2  src/features/categories/category-tree.ts
8f9635807c982fd3d5cd396a488e8dcd97d0fb558204fab2b464cc7c96b7b845  src/routes/__root.tsx
f417f03a766d30ead144c09530c02c6df14b5a323cdd18fd067c18da7955cbb8  e2e/shell.spec.ts
f01185f8131838a92fd789e62229915bb2b2bf6c24079084ac002e575c051910  AGENTS.md
```

All seven match the brief. `wc -c AGENTS.md`: `6440`.

## 6. THE CHECKS — lint and unit

`bun run lint`: `39 problems (0 errors, 39 warnings)`.

`bun run test:unit`:

```text
Test Files  1 failed | 292 passed (293)
Tests  4 failed | 1831 passed | 1 skipped (1836)
Duration  358.84s
✓ src/lib/first-reads.test.ts (5 tests) 129ms
```

Focused new and existing category-reader tests: 2 files, 19 tests passed. The requested location-data.test.ts path matched no test file; location hooks are exercised directly by FRL-5. No test was changed or skipped to work around a failure.

```text
[32m✓[39m src/lib/first-reads.test.ts[2m > [22mfirstReadLinks (D234 S4)[2m > [22mFRL-1 a saved market and a listed star: the tree, the markets, that market's tree, the star's strings[32m 5[2mms[22m[39m
[32m✓[39m src/lib/first-reads.test.ts[2m > [22mfirstReadLinks (D234 S4)[2m > [22mFRL-2 no saved market (none, or every area): no market tree; no star: the base language[32m 1[2mms[22m[39m
[32m✓[39m src/lib/first-reads.test.ts[2m > [22mfirstReadLinks (D234 S4)[2m > [22mFRL-3 the address's ?lang wins when the gate lists it; an unlisted one, or an unlisted star, gives the base[32m 1[2mms[22m[39m
[32m✓[39m src/lib/first-reads.test.ts[2m > [22mfirstReadLinks (D234 S4)[2m > [22mFRL-4 every link is a fetch preload in the readers' own mode (anonymous, same-origin credentials)[32m 2[2mms[22m[39m
[32m✓[39m src/lib/first-reads.test.ts[2m > [22mfirstReadLinks (D234 S4)[2m > [22mFRL-5 each link is the very address its reader asks, so the preloaded answer is the one it takes[32m 115[2mms[22m[39m
```

## 7. Build signal, usage maps and format

Automatic build log exists; latest read `2026-10-25T19:38:20Z — build OK`; no `error TS` line. No manual project build or typecheck was run; the permitted e2e:local command includes its own test build.

`bun run i18n:usage`: `1736 keys across 571 files (395 dynamic call sites)`. Both maps differ from START only by `scanned: 570 → 571`.

`bun run format:check`, last in THE CHECKS: `All matched files use Prettier code style!` Final report/roadmap formatting is checked again after creation.

## 8. THE END-TO-END CHECK

One invocation, prescribed exact grep, both projects, fake mode, 2 workers, 0 retries:

```text
E2E_CHROMIUM_PATH=/opt/ms-playwright/chromium-1194/chrome-linux/chrome E2E_WORKERS=2 E2E_RETRIES=0 bun run e2e:local -- e2e/shell.spec.ts --grep "FRL-6 |market tree cannot be fetched|TR-27 |TR-28 |TR-41 "
Running 10 tests using 2 workers
10 passed (37.3s)
```

Each project passed INC-282, TR-41, TR-27, TR-28 and FRL-6. FRL-6 proved the three fresh-browser fetch preloads, no saved-market tree preload, ready feed and exactly one markets request. TR-27 exercised sign-in and sign-out, not only the signed-out state. Migration parity and staging target guards passed. TCP 4173 was free; no stale server needed stopping. Transport retries: 0. No `[ssr-error]` line; one existing `[aborted]` warning and one `[client-aborted]` line appeared during navigation. No local repeat browser run.

## 9. Limits

Full-suite failure lines:

```text
FAIL scripts/conformance/executor-hooks.test.ts EXH-11 — Error: Test timed out in 5000ms.
FAIL scripts/conformance/executor-hooks.test.ts EXH-12 — Error: Test timed out in 5000ms.
FAIL scripts/conformance/executor-hooks.test.ts EXH-17 — Error: Test timed out in 5000ms.
FAIL scripts/conformance/executor-hooks.test.ts EXH-19 — Error: Test timed out in 5000ms.
```

EXH-11/17/19 are the brief's known sandbox limits (INC-890), left unchanged. EXH-12 is an additional full-suite timeout, not a named exemption; focused unchanged EXH-12 passed (1 passed, 19 unselected) in 1365ms. LL-1 passed in the full suite. The complete unit run is not claimed green. CI judges bundle ceilings; no local bundle-budget claim is made.

## 10. K2 — every-page shell readers

Four named:

- Category tree: src/features/categories/category-tree.ts:284–285; CATEGORY_TREE_PATH at :276. Preloaded.
- Open markets: src/components/shell/location-data.ts:166–167; MARKETS_PATH at :159; shell caller src/components/app-shell.tsx:185. Preloaded.
- Saved market tree: src/components/shell/location-data.ts:186–187; treePath at :162; shell caller src/components/app-shell.tsx:200. Preloaded only for a saved market.
- Approved language UI strings: src/i18n/bundle.ts:99–102; bundleUrl at :43; src/i18n/provider.tsx:545. Preloaded using ?lang ▸ star ▸ base with the gate list.

Three left, matching the brief:

- Guessed market tree: src/components/shell/location-data.ts:186–187 and src/components/app-shell.tsx:193–200. Its open-market status needs a read; S5 next.
- Publication gate list: src/i18n/provider.tsx:137–159, caller :325. The apikey header cannot ride a preload; INC-113 no-store.
- Entity bundle: src/i18n/bundle.ts:53–54, caller src/i18n/provider.tsx:360. RPC POST.

The existing raw button in the touched root file remains at src/routes/__root.tsx:213 (INC-899); no control added or changed. Existing root defaults and other untouched legacy patterns are outside this turn's scope. Inspected index metadata includes its own title, description, Open Graph and Twitter tags; no metadata changes made.

## 11. Departures

- EXH-12 additionally timed out under whole-suite load; verified unchanged alone, disclosed rather than treating the full suite as green. No source change outside scope.
- Final HEAD and report tracking cannot be asserted before the platform's save; the last observed code HEAD is named, and the final commit is the platform commit after this report.
- The first temporary extraction split at an internal mention of BRIEF-END and failed its assertion before writing anything; corrected to delimiter-line extraction, then exact hash/byte count passed. No incorrect brief was saved.

## 12. CI wait

Last readable CI is SUCCESS for START as quoted in §1. Final commit CI and its bundle-budget job are for the supervisor to read. Roadmap turn 27 is ticked with actual unit/E2E totals and the final-HEAD limitation. No work continues after this turn.
