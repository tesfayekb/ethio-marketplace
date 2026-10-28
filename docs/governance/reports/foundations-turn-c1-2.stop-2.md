STOP — turn C1-2, stop 1's ruling R4b: no map-frame chunk any more, but four pages are still over their ceiling (+0.4 to +0.6 KiB above their Part B value)
DONE: Part A, STEP 0, parts B–G (stop 1); the ruling's R1 and R2 (commit 20826a3); R4a, R4b (red, below), R4c, R4d
LEFT: the ruling's R5 (S465), R6 (THE CHECKS, THE END-TO-END CHECK, THE INDEPENDENT REVIEW, THE COMPLETION REPORT)
CI: (the newest completed run on ci-evidence names BASE; stop 1's landing, 09fd6cf5, has not reported yet — STALE for it)
# CI Status (auto-generated — do not edit by hand)

- Commit: `24815c467d781a9b7781d174561258f86231fd05` (short `24815c4`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-10-28T08:32:21Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40655391634
FILES:
docs/_changelog.md
docs/features/posting.md
docs/governance/briefs/foundations-turn-c1-2.md
docs/governance/instructions-amendments.md
docs/governance/mechanisms.md
docs/governance/reports/foundations-turn-c1-2.stop-1.md
docs/tracking/incidental-findings.md
e2e/ad-page.spec.ts
roadmap.md
scripts/conformance/kit.ts
scripts/conformance/on-demand-failure.test.ts
scripts/conformance/resilient-fallbacks.test.ts
scripts/route-budgets.mjs
src/features/posting/map/map-frame.tsx
src/features/posting/map/map-large.tsx
src/features/posting/map/map-offline.test.tsx
src/features/posting/map/map-preview.tsx
src/features/posting/preview/listing-detail-map-failed.test.tsx
src/features/posting/preview/listing-detail.tsx
src/features/posting/step-where.tsx
src/i18n/locales/am-base.ts

R1 and R2 applied by hand, as the ruling words them (map-preview.tsx: the import of MapFailedHere removed,
LoadFailedHere imported from @/components/shell/on-demand-notice, `MAP_FAILED_IDS` exported with the
ruling's docblock between `snap` and `MapPreview`, the comment and the element changed; map-large.tsx: the
same import, `import { MAP_FAILED_IDS, snap } from "./map-preview";`, the element changed). map-frame.tsx
untouched (R3).

R4a — `grep -rn "map-frame" src/features/posting/map/map-preview.tsx src/features/posting/map/map-large.tsx`
is not empty, only because the docblock the ruling dictates names the file; no import remains:

```text
src/features/posting/map/map-preview.tsx:48:/** The test ids of a map's failure in its place when Leaflet or the tile plan cannot download (INC-956) — the same pairs MapFailedHere (map-frame.tsx) draws for the map's own chunk; MOF-1/2 and LDF-1 hold the two to the same ids. */
```

R4b — `bun run build` (exit 0), `node scripts/check-bundle-size.mjs` (exit 1); `ls dist/client/assets | grep -c map-frame` → 0:

```text
JS: 205.7 KiB / 207 KiB — ok
CSS: 20.5 KiB / 40 KiB — ok
Per-page budget failed (D234):
  /admin/listings_/$listingId: 375.6 KiB, over its ceiling of 375 KiB
  /admin/listings_/$listingId_/edit: 399.1 KiB, over its ceiling of 399 KiB
  /admin/screening: 373.5 KiB, over its ceiling of 373 KiB
  /l/$slug: 247.3 KiB, over its ceiling of 247 KiB
```

The table (after Part B → stop 1's tree → this tree), KiB / ceiling:

```text
/admin/listings_/$listingId         374.9 → 375.7 → 375.6 / 375   over
/admin/listings_/$listingId_/edit   398.5 → 399.3 → 399.1 / 399   over
/admin/screening                    372.9 → 373.7 → 373.5 / 373   over
/l/$slug                            246.7 → 247.5 → 247.3 / 247   over
/my-listings_/$listingId            314.2 → 315.0 → 314.9 / 315   within, +0.7 over Part B
/post                               393.1 → 393.9 → 393.7 / 397   within, +0.6 over Part B
/post_/$listingId                   393.1 → 393.9 → 393.7 / 397   within, +0.6 over Part B
/my-listings_/$listingId_/edit      393.2 → 394.0 → 393.8 / 397   within, +0.6 over Part B
/                                   219.2 → 219.2 → 219.2 / 220   unchanged
```

So the map-frame chunk accounted for about 0.2 KiB of the 0.8; between 0.4 and 0.7 KiB stays on every page
that draws a map frame. The ruling's own condition ("If a page is still above its Part B value, STOP with the
table; do not raise a ceiling") applies, so I stopped here. No ceiling is raised.

What I could read without a comparison build (a diagnostic script in my scratchpad lists a page's
first-download closure through scripts/bundle-closure.mjs): /l/$slug's first download now carries, among its
chunks, `error-text-URNEoF6b.js` (421 bytes gzipped), `use-near-viewport-C5U4dhra.js` (336),
`still-map-CaLjG-HM.js` (245), `pin-DMJCAAXE.js` (327) and `listing-detail-CG25Qg8B.js` (13601). A candidate,
not proven: map-preview.tsx and map-large.tsx now import `errorText` from @/lib/error-text directly (before
Part D they reached it only through @/lib/on-demand-failure), so error-text.ts may have become a module
shared between the pages' code and the on-demand maps, with a chunk of its own — the same shape as
map-frame.tsx. I could not build Part B's tree beside this one to compare the two closures: the Bash guard
refused the copy step ("a shell write together with cd/pushd"), and I did not look for another way to do it.

R4c — `bunx vitest run scripts/conformance src/features/posting src/components`: `Test Files  128 passed (128)`,
`Tests  758 passed (758)`. R4d — `bun run typecheck` exit 0; `bun run lint` `✖ 39 problems (0 errors, 39
warnings)`; `bunx prettier --check` on the two files: `All matched files use Prettier code style!`.

Committed: 20826a3 (R1–R2, green-shaped; title says four pages remain over). Not done: R5's S465 line and
R6. The question: which cure for the remaining 0.4–0.7 KiB — and if the error-text import is the cause, may
the two maps log through a module the entry already carries (a change to the ruling's R1/R2 text)?
