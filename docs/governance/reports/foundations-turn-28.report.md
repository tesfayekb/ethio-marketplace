# Foundations turn 28 — completion report

Brief: docs/governance/briefs/foundations-turn-28.md (sha256 94497124dfb027ca030fea627a5734eb5b6f03cbfe4bb958ba8861e19e238ce6, 82068 bytes). START: 7460ca061c8243bf29f56ac0a632899ef7b7afb7.

## 1. Part A — CI first

```text
# CI Status (auto-generated — do not edit by hand)

- Commit: `7460ca061c8243bf29f56ac0a632899ef7b7afb7` (short `7460ca0`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-10-25T20:04:46Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40227242752
```

e2e-last-failure.md: "last E2E run 40227242752 passed". guards-last-failure.md: no failed job, no warning step. Nothing to fix.

## 2. STEP 0

Saved byte for byte; sha256 and byte count equal the carrying message. roadmap.md line 3 and the turn-28 line added as specified.

## 3. Parts done

- B1–B4 done (location-data.ts, its new test, app-shell.tsx, category-tree.ts + test, feed-page.ts + test).
- C1–C5 done (four handlers exported, first-screen.ts + test, use-feed.ts + new test, __root.tsx, feed.tsx).
- D1 done (three tests carry the E2E-only cookie; AP-53 added).
- E1–E4 done (performance-strategy §11, mechanisms row 46, changelog, roadmap tick, AGENTS.md = 6594 bytes).

## 4. Files (`git diff --name-only 7460ca06` plus the new files)

AGENTS.md, docs/_changelog.md, docs/features/performance-strategy.md, docs/generated/i18n-usage.json, docs/governance/briefs/foundations-turn-28.md (new), docs/governance/mechanisms.md, docs/governance/reports/foundations-turn-28.report.md (new), e2e/ad-page.spec.ts, e2e/feed-screens.spec.ts, e2e/shell.spec.ts, public/i18n-usage.json, roadmap.md, src/components/app-shell.tsx, src/components/marketplace/feed.tsx, src/components/shell/location-data.test.ts (new), src/components/shell/location-data.ts, src/features/categories/category-tree.test.ts, src/features/categories/category-tree.ts, src/features/feed/feed-page.test.ts, src/features/feed/feed-page.ts, src/features/feed/use-feed.test.ts (new), src/features/feed/use-feed.ts, src/routes/__root.tsx, src/routes/api/categories.tree.ts, src/routes/api/feed.ts, src/routes/api/locations.$country.ts, src/routes/api/locations.ts, src/server/first-screen.test.ts (new), src/server/first-screen.ts (new). New files are tracked by the platform's save at the end of the turn (no stateful git run).

## 5. THE CHECKS — sha256 (every line equals the brief's)

```text
40d0dccfd87dcfab2afc09fb43bed72688f26a55247e16bfeabc2ddfb9f4cca5  src/components/shell/location-data.test.ts
bf4977f824f59b72cb1cf6eb3dc7822380342a0fb862b942787d7b723deb926b  src/server/first-screen.ts
1d51c002fe538275f8ce77c9e40c8ee98d6857fad8981aae1ce30416c8745794  src/server/first-screen.test.ts
a0ab9aa389b14d6d92108c4cf3018e58b6d7262541c9f20f1307dd4442cb07a1  src/features/feed/use-feed.test.ts
c0a4cdcb9176e32616e6ec608e43080fdf2a30af7be58f492636fffde8e49ec4  src/components/shell/location-data.ts
e012aa149cee50292b97c1d70144f67824fb41036c9cefec0dcd894d9d8cab16  src/components/app-shell.tsx
7838e5c5c95361e4a2f9760b486e2369552be063785e4393a3c0f3d2749e965d  src/features/categories/category-tree.ts
e58f7003d8909391ed0a5fcf629a0dfb169d535d09bed495c15cc610a1ef6c2f  src/features/categories/category-tree.test.ts
9b8ed69243dc1cad067a7d27d6ff27536230455eff84477e9fcf6542753aaa84  src/features/feed/feed-page.ts
68f0544105938b6ab8e8c4ca98741a87b0fc5a5b234e26a2ee1d814c31bd4377  src/features/feed/feed-page.test.ts
2230af7224a67e99357a9706d961dd12c7fd306bebf2546570c57bf29e13eb15  src/routes/api/locations.ts
49761528bf0caa381fe8927cd00ba6a11ab1895eb5d6d504e700ad67d9927c2b  src/routes/api/locations.$country.ts
10c11cecaff9e06828ce0a4741c13a1e073c8af814ff7c3c1012b5ec311de668  src/routes/api/categories.tree.ts
d851086779d4a43b9023a76d755255294585566345c0894dfa45be671700a2e2  src/routes/api/feed.ts
b286de4fedf7843791ea538e284723721d853530cace9d44faf0968382dab336  src/features/feed/use-feed.ts
de214a68b4baddefad56143b47002743d2a8d76353602fb87b3f7cb4af63b49e  src/routes/__root.tsx
79398387751850b891f8d1ba99a9432e8eb2adafad034ae9363b9ba92f5bf645  src/components/marketplace/feed.tsx
71546304b79316f83161a47e7a6ba138388be62169739d05ddf276915c9c5536  e2e/shell.spec.ts
5491887a5c3b276de0b6c6b649f4ff2824f4b13968189e2bc5e319e155ea0690  e2e/feed-screens.spec.ts
647cc90a646e9ece41ed3aa6dfae8588314ea99987470d98776db6682dfd9fbd  e2e/ad-page.spec.ts
837b1056fa4637fc01bafcd27eeb441f7e5875b5f3a785ea8c13d6471c6ce0c5  AGENTS.md
```

## 6. Lint, unit, build log, i18n, format

- `bun run lint`: 0 errors, 39 warnings.
- `bun run test:unit`: Test Files 1 failed | 295 passed (296); Tests 3 failed | 1850 passed | 1 skipped (1854). The new tests: 5 files, 47 passed (DIA-1…6, FSP-1…6, UFS-1…4, FP-15, FRO-1 included).
- /tmp/observability/build-errors.log: latest entries "build OK"; 0 `error TS` lines.
- `bun run i18n:usage`: 1736 keys across 572 files; both maps' "scanned" 571 → 572, nothing else.
- `bun run format:check` (last): All matched files use Prettier code style.

## 7. Limits

Known sandbox timeouts (INC-890), unchanged, not worked around:
- × EXH-11 refuses a red check … 6386ms
- × EXH-12 a final report must carry the twelve sections … 6501ms
- × EXH-17 when the session's git refuses dev and hold/* … 6961ms
EXH-12 is not among the brief's named three; it passed alone (1 passed) — the same full-suite load timeout as turn 27. Final judgment: CI.

## 8. THE END-TO-END CHECK (both projects, fake mode, 0 retries)

- e2e/ad-page.spec.ts `--grep "AP-49 |AP-53 "`: 4 passed (53.8s).
- e2e/feed-screens.spec.ts `--grep "FS-6 "`: 2 passed (27.7s).
- e2e/shell.spec.ts `--grep "spinner renders|LS-3 |LS-6 |LS-10 |LS-12 |EV-1 |FRL-6 "`: 14 passed (1.2m).

## 9. K2 — after this turn

Deriving the first place / its market: src/components/app-shell.tsx:189 (initialCountries), :279 (deriveInitialArea); src/server/first-screen.ts:99, :112. All on the shared functions.
Reading the listings address: src/components/app-shell.tsx:528 (feedRouteOf); src/server/first-screen.ts:81. BYPASS (out of scope, reported, not touched): src/components/shell/app-rail.tsx:837 `pathname === "/" || pathname.startsWith("/c/")`.
Building the feed read's address: src/features/feed/use-feed.ts:35, :58; src/server/first-screen.ts:120 (feedPath). BYPASS (out of scope): src/features/ad-page/similar.ts:25-27 builds `/api/feed?…` with its own size=11 parameters.
Parsing the markets / a tree / the category tree / the feed: location-data.ts:171, :199; category-tree.ts:304; first-screen.ts:93, :103, :117, :121; use-feed.ts:37; similar.ts:29 — all on the exported parsers.
E2E tests that hold, fail or wait for a browser /api/feed read on a listings page's first load: e2e/shell.spec.ts:573 (spinner), e2e/feed-screens.spec.ts:361 (FS-6), e2e/ad-page.spec.ts:1643 (AP-49) — all three carry the cookie. Watched but not dependent on a first browser read: feed-screens.spec.ts:177 (FS-2 counts only `after` reads), :344 (FS-5 unknown slug: the server reads no feed either). Direct route calls, not page loads: feed-route.spec.ts:115, photo-pipeline.spec.ts:1151.

## 10. K1/K3/K4

K1 the mechanism as built; K3 DIA-, FSP-, UFS-, FP-15, FRO-1, AP-53 land with it; K4 no literal language or country code added in src outside tests.

## 11. Departures

None. All blocks applied by script from the saved brief; every hash equal.

## 12. CI

Last readable: the run above on 7460ca06 (SUCCESS). The run on this turn's final commit is the supervisor's to read.
