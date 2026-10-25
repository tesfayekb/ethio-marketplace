# Foundations turn 26 — completion report

Brief: docs/governance/briefs/foundations-turn-26.md (speed S3 — resilientLazy; INC-897 closed; admin crumbs off the first download; D234).

## 1. Start and CI (Part A)

- `git rev-parse HEAD` → `6eb3576ea82ddb2c926a23b29b9dc3e1737af83b` (<START>).
- ci-status.md, first six lines:

```text
# CI Status (auto-generated — do not edit by hand)

- Commit: `6eb3576ea82ddb2c926a23b29b9dc3e1737af83b` (short `6eb3576`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-10-25T18:40:58Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40220690758
```

- e2e-last-failure.md: `last E2E run 40220690758 passed`. guards-last-failure.md: `No failed build/guard jobs in this run.` Nothing to fix.

## 2. STEP 0

- `d3cb555b0d614f43cddf1944004dde7a231057c7a73fd25adbe0aa88ba4cd90f  docs/governance/briefs/foundations-turn-26.md`; `44289` bytes — equal to the carrying message.
- roadmap.md line 3 names the turn-26 brief; the turn-26 line added after turn 25's.

## 3. Done by part

- A1 done. B0 done (landed first, red-first run below). B1–B6 done. C1, C2 done. D1–D4 done (D3: changelog entry and the roadmap tick).

## 4. Files (`git diff --name-only <START>`)

AGENTS.md · docs/_changelog.md · docs/features/performance-strategy.md · docs/generated/i18n-usage.json · docs/governance/briefs/foundations-turn-26.md · docs/governance/mechanisms.md · public/i18n-usage.json · roadmap.md · scripts/check-bundle-size.mjs · scripts/conformance/on-demand-imports-allowlist.txt · scripts/conformance/on-demand-imports.test.ts · scripts/route-budgets.mjs · src/components/shell/admin-detail-crumbs.tsx · src/components/shell/breadcrumbs.tsx · src/features/posting/preview/listing-detail.tsx · src/features/posting/step-where.tsx · src/i18n/compiled-catalog.ts · src/lib/resilient-lazy.test.tsx · src/lib/resilient-lazy.ts — plus this report. New files (src/lib/resilient-lazy.ts, src/lib/resilient-lazy.test.tsx, the brief, this report) are committed by the platform at the turn's end; `git ls-files` proof falls to the supervisor's fresh clone.

## 5. THE CHECKS — sha256

```text
882302a9b5ff84a9b5a25ab8ada9aa59a83dafcc8629bfae8c6b6a432e4d2c0d  src/lib/resilient-lazy.ts
2286950b971471b1bbbbf19a02c967e9064140c002c18edc20d76479de748f3d  src/lib/resilient-lazy.test.tsx
9f344d6a8ae5ab69202f922c8db3d314beeb20d8ec93a6f1cfb6d4ab1a641088  scripts/conformance/on-demand-imports-allowlist.txt
2d002c44ce0d6c9c3a87746f6ba06ffd03c51d4e8921e063b8ed5ff59c26fb6b  scripts/route-budgets.mjs
0d231b962fb54a0752f6c4abeb68e3fd17f39f0a314a0e8e28cca5349635bbcf  scripts/conformance/on-demand-imports.test.ts
a4c1bb730ec7fecedd89be59d2cf32338d37fc7317ba54cfec54cbe5a8ab0140  src/components/shell/breadcrumbs.tsx
a279848d6fc493a7ce1162ecbad38df3052ed6b5022aec1ac8bc8d5b2ff71795  src/components/shell/admin-detail-crumbs.tsx
de675ab64a7881f3589eccfb7358d0e8f5a976595a711160c3f10193d625179c  src/features/posting/preview/listing-detail.tsx
27758a94ff288cd72be4555dcb214685a107a6e3c6d2f24c9287512ff971d862  src/features/posting/step-where.tsx
2e090311ab749429b3959ea73b1ba91aea058fb2a9a8015ddb70b615c5430d79  src/i18n/compiled-catalog.ts
9863825662b67b8bbdd9502ef521924f4dea76aa3b4945e5840287745e2f6d9d  scripts/check-bundle-size.mjs
150288e8b6056ed0813990ae9a81aaa38d73963f97fb412082a70001652efe1d  AGENTS.md
```

All twelve equal the brief's. `wc -c AGENTS.md` → 6322.

## 6. Other checks

- `bun run lint`: `✖ 39 problems (0 errors, 39 warnings)` — unchanged.
- `bun run test:unit`: `Test Files 2 failed | 290 passed (292)`; `Tests 4 failed | 1826 passed | 1 skipped (1831)`.
  - `✓ OD-3 INC-897 is closed: no allowance waits on it, and no React.lazy site is left in the browser's code`; OD-1 `[OD-1] on-demand imports outside loadOnce: 3; allowlist: 3`; OD-1, OD-2 pass (focused run: 5 of 5 with RLZ).
  - `✓ RLZ-1 a downloaded component renders with its props, as React.lazy does`; `✓ RLZ-2 a failed download renders the fallback and logs once — never the error boundary`.
  - Failures (see §9): EXH-11, EXH-17, EXH-19 (executor-hooks.test.ts) and LL-1 (`src/look-law.test.ts`, `Error: Test timed out in 5000ms.`; alone: `Tests 2 passed (2)`).
- /tmp/observability/build-errors.log: latest entries `build OK`; no `error TS` line.
- `bun run i18n:usage`: `1736 keys across 570 files` — keys unchanged; the maps' `scanned` count moved 569 → 570 (the new source file), both maps carried.
- `bun run format:check` (last): `All matched files use Prettier code style!`

## 7. Red-first for OD-3

At <START> with B0 alone: `× OD-3 INC-897 is closed …` — Received the four INC-897 allowances: src/components/shell/breadcrumbs.tsx, src/features/posting/preview/listing-detail.tsx, src/features/posting/step-where.tsx, src/i18n/compiled-catalog.ts (`Tests 1 failed | 2 passed (3)`; the allowance assertion fails first, so the React.lazy file list was not reached at that point). After B5: `✓ OD-3`.

## 8. THE END-TO-END CHECK

- e2e/breadcrumbs.spec.ts `BR-1 |BR-3 ` + e2e/admin-users.spec.ts `AU-7 ` (one run): `6 passed (1.4m)`.
- e2e/ad-page.spec.ts `AP-9 |AP-39 |AP-43 ` + e2e/post-wizard-where.spec.ts `PW-100 |PW-96 ` (one run): `10 passed (1.7m)`.
- Both projects, 0 retries, fake mode; no `[ssr-error]` line in either log.

## 9. Limits

- EXH-11, EXH-17 (INC-890, named) and EXH-19 (same file, same sandbox timeout class, not named in the brief) time out in this sandbox; unchanged, not skipped.
- LL-1 hit Vitest's 5 s timeout under whole-suite load and passes alone; unchanged.
- The lowered ceilings are judged by CI's bundle-budget job on the final commit; no local build was run (platform rule).

## 10. K2

- Browser dynamic imports outside loadOnce and resilientLazy (equals the three dated allowances): src/features/admin-categories/category-images-service.ts:108 · src/routes/legal.publishing.tsx:50 · src/routes/post\_.$listingId.tsx:31.
- Suspense boundaries left in Part B's files: breadcrumbs.tsx:147 (AdTitleCrumb), :311, :315, :319, :323, :411 (PendingCrumb); listing-detail.tsx:1143, :1182 (`post.pin.title` text); step-where.tsx:1833 (null), :1903 (`post.pin.searching` text). compiled-catalog.ts has none.

## 11. Departures

- THE END-TO-END CHECK ran its four specs in two `bun run e2e:local` invocations (two spec files each, their greps joined) rather than four; the same tests ran.
- The i18n maps moved by the scanned-file count only (permitted by THE FILES).

## 12. CI wait

The final commit's CI is the supervisor's to read; its bundle-budget job judges the lowered ceilings.
