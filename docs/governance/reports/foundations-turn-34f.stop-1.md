STOP — turn 34f THE END-TO-END CHECK: ALS-1 is red on mobile-360 because a second late part, the place-name line, grows the Location box
DONE: Part A; STEP 0; parts B, C, D, E; THE CHECKS
LEFT: THE END-TO-END CHECK (red, below); THE INDEPENDENT REVIEW; THE COMPLETION REPORT
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `0586d7f28089e02d75d6b896a4661edd836df284` (short `0586d7f`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-10-27T16:06:05Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40532962246
  (the last landed commit is BASE 0586d7f2; this turn's commits have not reached CI)
FILES:
docs/_changelog.md
docs/features/ad-page.md
docs/features/e2e-harness.md
docs/generated/i18n-usage.json
docs/governance/briefs/foundations-turn-34f.md
docs/governance/mechanisms.md
docs/tracking/incidental-findings.md
e2e/ad-page-layout.spec.ts
e2e/ad-page.spec.ts
e2e/helpers/ui.ts
public/i18n-usage.json
roadmap.md
scripts/conformance/holds-its-box-allowlist.txt
scripts/conformance/holds-its-box.test.ts
scripts/conformance/layout-reads-allowlist.txt
scripts/conformance/layout-reads.test.ts
src/features/posting/map/map-frame.test.tsx
src/features/posting/map/map-frame.tsx
src/features/posting/map/map-preview.tsx
src/features/posting/map/still-map.ts
src/features/posting/preview/listing-detail-map.test.tsx
src/features/posting/preview/listing-detail.tsx
src/features/posting/step-where.tsx

## What was done (every number from a command run in this turn)

- Part A: HEAD = origin/dev = BASE 0586d7f28089e02d75d6b896a4661edd836df284; CI SUCCESS on it (lines above).
- STEP 0: the brief saved; sha256 7f9bfad207162934af763bbdf9c3b9989dcbc50326f07a8a06cf8105faf6bf27, 120662 bytes (both as stated); roadmap line 3 names it. Commit 939bb01.
- K1 greps at BASE: `grep -rn "resilientLazy(\|= lazy(\|<Suspense" src … | grep -v test` → 24 lines (23 sites + the doc comment at src/lib/resilient-lazy.ts:10); `grep -rc "boundingBox()" e2e` → 202 in 19 files (e2e/ad-page.spec.ts 59).
- Part B (red, not committed): vitest — 3 failed | 3 passed (6): MFR-2 (shape mismatch), LDM-1 (`Unable to find an element by: [data-testid="map-frame"]`), HB-1 (`[HB-1] late parts: 13; outside the mechanism: 13; allowlist: 11`, the four lines listing-detail.tsx#MapPreview:1147 and :49, step-where.tsx#MapPreview:1833 and :54). `bun run e2e:local -- e2e/ad-page-layout.spec.ts`: 2 failed (ALS-1, both projects, at line 56: Expected <= 0.5, Received 196). The first attempt was refused by the i18n map guard, which regenerated both usage maps (committed with B–C).
- Part C: vitest src/features/posting + HB: 62 files, 456 tests passed; `[HB-1] late parts: 13; outside the mechanism: 11; allowlist: 11`; ALS-1: 2 passed (both projects); typecheck clean; lint 0 errors, 39 warnings. Commit c8d7c65.
- Part D: D1 red — BX-1 failed, `[BX-1] … 78; reads: 201; allowlist: 68`, first line `e2e/ad-page.spec.ts#AP-36:861 reads a box by itself; compare boxes through layoutBoxes (e2e/helpers/ui.ts)`; BX-2 passed (1 failed | 1 passed). D2: 26 blocks applied; `grep -c "boundingBox()" e2e/ad-page.spec.ts` → 0; 2 passed; `[BX-1] tests and helpers reading boxes by themselves: 68; reads: 142; allowlist: 68`. Commit 7bf6c4f.
- Part E: 8 blocks to 6 files (the expected EDIT lines); the three greps as expected (INC-945 :5346, INC-946 :5350, `Numbering: next free INC-947` :5356; rows 60 and 61 at :70, :71; line 3 names foundations-turn-34f.md); `bun run i18n:usage` no further change. Commit 74efae6.
- THE CHECKS: hash list — all 19 OK; the protected-path stat empty; lint 0 errors, 39 warnings; typecheck clean; unit 333 files, 2016 tests passed; i18n:usage unchanged; build exit 0; check-bundle-size `JS: 205.1 KiB / 207 KiB — ok` · `CSS: 20.5 KiB / 40 KiB — ok`, and the same two lines on a BASE build (git archive of 0586d7f2 in the scratchpad); format:check clean.

## The red

`bun run e2e:local -- e2e/ad-page-layout.spec.ts e2e/ad-page.spec.ts e2e/post-wizard-where.spec.ts e2e/post-wizard-place.spec.ts`: Running 148 tests using 2 workers · 3 failed · 5 skipped · 140 passed (17.5m); `[ssr-error]` count 0.

1. ALS-1 [mobile-360] — `e2e/ad-page-layout.spec.ts:56`: Expected <= 0.5, Received 32 (the Location box 32 px taller after the map arrived than before). It passed on both projects in Part C's run of the same code, so it is intermittent. The cause, as far as I could read it (the run's trace was overwritten by the next runs in test-results/; the page snapshot error-context.md was read before that): the Location card (src/features/posting/preview/listing-detail.tsx :1124–1138) draws `{places.length > 0 && <p className="text-sm …">{places.join(", ")}</p>}`, where `places` comes from the country tree (`useCountryTree(view.country)`, :265), which arrives after the page paints. A text-sm line is 20 px; the card's `space-y-3` gap is 12 px; 20 + 12 = 32. The failing page's snapshot shows that line (`e2e-loc-local-0-ls-city-…`) present after the map arrived. So the Location box grows for a second reason that is not a lazy component. The holds-its-box census does not see it (it reads resilientLazy/lazy/Suspense only), and ALS-1 reads its first box before the line has necessarily arrived. AP-36 is not exposed in the same way: layoutBoxes reads all of its row's boxes in one frame.
2. PW-30 [mobile-360] and [desktop-1280] — `e2e/post-wizard-place.spec.ts:782` "PW-30: no place was chosen" (`post-where-chosen` data-count 0). Not this turn's: PW-30 alone (`--grep "PW-30 "`) passed on both projects (2 passed); the whole file on this tree failed PW-30 on both (2 failed, 36 passed); the whole file on BASE (a git archive of 0586d7f2 in the scratchpad, same staging) failed PW-30 on mobile-360 (1 failed, 37 passed), same body. The turn's step-where.tsx changes touch only the pin preview's place (NoMap, its Suspense fallback, a comment), not the region/city pickers PW-30 uses. Reported for the supervisor; not touched.

## The question

ALS-1 is the brief's own proof and is intermittently red. Making it green needs one of:

(a) a product change: the place-name line holds its box while the country tree loads (e.g. the line is drawn at its height from the first paint), in src/features/posting/preview/listing-detail.tsx (in SCOPE, but no block of the brief writes it — EXACT TEXT: "never retyped, never edited or reflowed by hand"); or
(b) a spec change: ALS-1 waits for the place line (or for the country tree) before its first `layoutBoxes` read, in e2e/ad-page-layout.spec.ts around line 46 (20-tests.md: "a spec change the brief did not enumerate is a STOP naming the test and line").

Under 00-executor-protocol.md both are departures beyond the brief's numbered CHANGEs ("a departure from the brief's behaviour contract beyond its numbered CHANGEs"; "a census hit the brief did not anticipate"), so I have done neither. Which do you rule, with its exact text? The four commits land with this stop, so CI judges them; ALS-1 may go red there on mobile-360 for the reason above.
