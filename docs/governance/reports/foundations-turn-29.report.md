# Foundations turn 29 — report (2026-10-25)

Status: **NOT COMPLETE — AP-54 fails in both browser projects.** Starting HEAD: `e50648f1e7df5795c501247e847458f081b86415`. Last observed implementation HEAD: `9d451d9eb8de3eea18ccfa9d82ee0e042bf697e0`; the platform's report landing will follow. No stateful git command, migration, new string or package change.

## 1. Part A — CI first

```text
# CI Status (auto-generated — do not edit by hand)

- Commit: `e50648f1e7df5795c501247e847458f081b86415` (short `e50648f`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-10-25T20:52:36Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40231475359
```

E2E evidence passed; guards/build evidence named no failed jobs. Nothing corrected at A1.

## 2. STEP 0

Saved the user message's title through closing fence and one newline; SHA-256 `ade421c80dcf6082268c815dd02cf130a6d622712b5264a741fbab0db80bde5f`, 62,349 bytes. Roadmap line 3 names turn 29; its task is open because AP-54 is not green.

## 3. Parts done and not done

- B: exact HeldFirstPage module, adapter, tests and root hand-over installed. HFP-1…3 pass.
- C: exact feed page/place shape, first-screen diagnostics, held rendering, route Suspense and two sibling migrations installed. FSP-7, FP-16 and UFS-1…7 pass.
- D: exact AP-54 installed. Its server HTML assertions pass, but retained-node equality is false at :1741 in both widths. This central proof is NOT DONE; no test assertion was weakened and no exact block was altered to hide it.
- E: performance section 12, mechanism row 47, changelog and exact AGENTS speed line installed (6,776 bytes). Roadmap completion tick intentionally withheld.
- THE CHECKS completed. All requested browser groups ran; AP-54 remains red.

## 4. Files

`git diff --name-only <START>` plus this report:

```text
AGENTS.md
docs/_changelog.md
docs/features/performance-strategy.md
docs/generated/i18n-usage.json
docs/governance/briefs/foundations-turn-29.md
docs/governance/mechanisms.md
e2e/ad-page.spec.ts
public/i18n-usage.json
roadmap.md
src/components/marketplace/feed.tsx
src/components/shell/app-rail.tsx
src/features/ad-page/similar.ts
src/features/feed/feed-page.test.ts
src/features/feed/feed-page.ts
src/features/feed/held-first-page.test.ts
src/features/feed/held-first-page.ts
src/features/feed/use-feed.test.ts
src/features/feed/use-feed.ts
src/routes/__root.tsx
src/routes/c.$slug.tsx
src/routes/index.tsx
src/server/first-screen.test.ts
src/server/first-screen.ts
src/start.ts
docs/governance/reports/foundations-turn-29.report.md
```

`git ls-files` printed the three new files:

```text
docs/governance/briefs/foundations-turn-29.md
src/features/feed/held-first-page.test.ts
src/features/feed/held-first-page.ts
```

## 5. THE CHECKS — sha256

All 17 specified hashes matched:

```text
c2a168150d351f645ef7912e047651102b424c24a774423ce90d32aa7f320310  src/features/feed/held-first-page.ts
d2b54052a3dfe5ba26f16bf02b91a0dc150095f7f4bc9b465300ef622e0f86ba  src/features/feed/held-first-page.test.ts
b22ba8eb3bd208a7e48c7da6324d7259c080ff535fe1c2e60b08ff56db34127c  src/features/feed/use-feed.test.ts
2b8cb870ab375d159c5d20a388588a977613f27a2df2c41315de0e0673e8894c  src/start.ts
a1d6e36ce975bf115f061e91297f18eb11ac2b20d25b906d4e9faaf71b4adb5f  src/routes/__root.tsx
8c57086c1615c197f46dc3a7fe556f73339f55c7ccb556d38d86cace603482cf  src/features/feed/feed-page.ts
784800e08561761b551ee3578546bee615ae6cc9b7fad89919df2e82432ec326  src/features/feed/feed-page.test.ts
8eca888c0457315b834bcf8c2855bbc0b4096c9ed242211b64c8d8da45cc05a7  src/server/first-screen.ts
085a385c85c2041e236db30492c439734863889e335f3de95b9d3abda67d1e5d  src/server/first-screen.test.ts
ca7a3b49537b0f860bf20f5b4aa5ef0b570bfec8be639908f78fda39a121c4f8  src/features/feed/use-feed.ts
80395c4123014d85af0a2d3f05f01018362b613588f9dd2425de5be1ef69f22a  src/components/marketplace/feed.tsx
5ad13ea27c618c81cc41bfea19a0ac73499bcfa11014e2cb8447fadaa8cb85b5  src/routes/index.tsx
8791ed0cda93ce217f3eee4b8a0869f554bed1d0105fd707e37745efa2bd7917  src/routes/c.$slug.tsx
7d9a6aef9376b8e6d06a545b344cb12ee1c6ac3e193a8eced1b2190e32285d61  src/features/ad-page/similar.ts
00e174d8fcc5c8c8c229b19fd1d09f217506e3814c37ce4f61ce5cacfa5a41d8  src/components/shell/app-rail.tsx
00bf926c0f9ae2faa2fd00bab5a0d0671613f1efce2b53d050b30fc33db1dc39  e2e/ad-page.spec.ts
55088272b7a6f60a64fd0a5904fdcfe175cc2d4386535733bda4f73bd6926f43  AGENTS.md
```

## 6. Lint, unit, build, maps and formatting

- `bun run lint`: 0 errors, 39 warnings.
- `bun run test:unit`: 297 files passed; 1,861 tests passed, 1 skipped (1,862). No sandbox hook timed out in this run.
- Focused four files: 34 passed. HFP-1…3, UFS-1…7, FSP-7 and FP-16 all pass; verbose proof captured locally. Part B: 3 passed; Part C: 34 passed.
- Build log: latest `build OK` at 2026-10-25T21:06:21Z. Interim Part B typecheck named `held-first-page.test.ts(16,3): error TS2353: Object literal may only specify known properties, and 'places' does not exist in type 'FirstFeedPage'`; Part C added the brief's places field and subsequent builds are OK.
- `bun run i18n:usage`: 1,736 keys across 573 files (395 dynamic call sites); both maps' scanned count moves 572 → 573, no key changes.
- `bun run format:check`: all matched files use Prettier style; repeated last after report and roadmap.

## 7. Red-first and first-of-kind evidence

FSP-7 ran against the BASE first-screen implementation with only the brief's test edits:

```text
FAIL src/server/first-screen.test.ts > readFirstFeedPage (D234 S5) > FSP-7 a feed or category tree answered whole but malformed: no first page, one [first-screen] line naming it
AssertionError: expected "warn" to be called with arguments: [ '[first-screen]', '/api/feed', …(1) ]
Number of calls: 0
Test Files 1 failed (1)
Tests 1 failed | 6 skipped (7)
```

After C2, FSP-7 passes. Installed exports: `node_modules/@tanstack/react-router/src/index.tsx:24` names `createSerializationAdapter`; router-core index.ts:476 exports it from `./ssr/serializer/transformer`. HFP-3 is the minimal adapter smoke proof.

## 8. THE END-TO-END CHECK

All run through `bun run e2e:local`, two workers, both projects, fake mode, zero retries; each under 600 seconds.

```text
ad-page AP-32 |AP-49 |AP-53 |AP-54 : 2 failed, 6 passed (1.4m)
feed-screens FS-1 |FS-2 |FS-6 : 6 passed (41.4s)
shell spinner renders|LS-3 |LS-6 |LS-10 |LS-12 |EV-1 |FRL-6 |PK-1 : 1 skipped, 15 passed (1.3m)
```

AP-54 mobile-360 and desktop-1280: Expected true, Received false at `expect(kept).toBe(true)` (:1741). The test reached ready and two cards; its retained server node was not the current card node. No conclusion about its later `failures` assertion can be made, since equality failed first. Screenshots/traces were generated by the runner. Desktop PK-1 is its existing mobile-only skip. The three captured logs each contain 0 `[ssr-error]` lines; this does not establish absence of other client errors.

The first invocation stopped before any test because pinned Chromium 1208 was absent. Subsequent runs used the brief's specified installed Chromium override `/opt/ms-playwright/chromium-1194/chrome-linux/chrome`. No dependency installed, no background rerun.

## 9. K2 — after this turn

- Root firstFeed declaration/producer: __root.tsx:121, :295–303, HeldFirstPage. Reader: marketplace/feed.tsx:81–84, passed at :102/:109 and awaited through `.page` at :328. All on the shared wrapper.
- Addresses: feed-page.ts:277–291 owns feedPath; use-feed.ts read and match use it; first-screen.ts:125 and ad-page/similar.ts:26 use it. Similar's BASE :25–27 bypass is moved.
- Listings-address shape: category-tree.ts's feedRouteOf; first-screen.ts:81 and app-rail.tsx:839 use it. Rail's BASE :837 bypass is moved.
- Browser-first-load waits/failures: ad-page.spec.ts:1643–1645 AP-49; shell.spec.ts:573–575 spinner; feed-screens.spec.ts:361–363 FS-6 all carry e2e_first_screen=off. Feed-screens.spec.ts:133 records requests for pagination rather than holding a first-load read. AP-53:1681 records absence of reads, not a wait.
- Existing raw buttons left unchanged: __root.tsx:243; app-rail.tsx:373, :464, :793 (INC-899). No new control.
- LEFT by brief: shell's own first state and category invitation's browser tree. No additional in-scope bypass found by the census.

## 10. Mechanism and guard

One concern extends readFirstFeedPage → HeldFirstPage → useFeed/useHeldFirstPage. Row 47 and AGENTS record it; HFP/UFS/FSP/FP tests and AP-54 accompany it. The browser guard is currently red, so this report makes no claim that the server nodes are kept or that speed S6 is complete. Leaf routes index and c.$slug retain their existing full head metadata. No unrelated route metadata changed.

## 11. Departures

- AP-54 failed on the exact files; fixing code would depart from required hash equality, and weakening the guard is forbidden. The brief's exact implementation is preserved pending the supervisor's corrective ruling.
- Roadmap remains open instead of E3's completion tick, because its defining browser proof failed.
- The unavailable pinned browser caused one no-test invocation; the explicitly allowed override supplied the available browser.
- Unit totals are the observed counts (fully green), not a copied expectation. No known hook limit occurred.

## 12. CI wait and blocker

Latest readable evidence is the base success above, not final-turn CI. Supervisor reads the final run after the platform landing. **Open task: retain the server card node through hydration, proven by AP-54 on both widths. Blocker: a corrective ruling permitting changes to the byte-exact implementation.** No local repeat/flake run or test weakening was attempted. No completion tick or CI-success claim for this turn.

J-audit: AP-54 uses existing namespaced scratch seller/ads seeded before navigation, checks its own cards and retains the shared throwing afterEach cleanup; no real reference row mutation; + cleanup-survives-timeout.
