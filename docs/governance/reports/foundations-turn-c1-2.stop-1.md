STOP — turn C1-2 THE CHECKS: five pages over their first-download ceiling after Part D (the bundle budget the brief expected OK)
DONE: Part A, STEP 0, parts B, C, D, E, F, G; THE CHECKS (`bun .claude/hooks/land.ts --checks`: lint, typecheck, test:unit, i18n:usage, i18n maps committed, build, format:check — all ✓; check-migrations not needed; CHECKS GREEN for code tree 7831d21110b34629); the hash list (18 × OK); the protected-paths diff (empty)
LEFT: THE CHECKS' `node scripts/check-bundle-size.mjs` (red, below); THE END-TO-END CHECK; THE INDEPENDENT REVIEW; THE COMPLETION REPORT
CI: (last landed commit, 24815c46 — two-step read: the reported commit is BASE)
# CI Status (auto-generated — do not edit by hand)

- Commit: `24815c467d781a9b7781d174561258f86231fd05` (short `24815c4`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-10-28T08:32:21Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40655391634
FILES:
docs/_changelog.md
docs/governance/briefs/foundations-turn-c1-2.md
docs/governance/instructions-amendments.md
docs/governance/mechanisms.md
docs/features/posting.md
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

THE CONFLICT. THE CHECKS expect `node scripts/check-bundle-size.mjs` — `Bundle budget OK.`, and concern 1's
performance lens says "no page's first download moves (the supervisor's builds: no page changed by 0.05 KiB
or more)". On the turn's final tree (commit a22af22, built by `--checks`, the same lock-exact install whose
BASE build matched CI's numbers to 0.1 KiB in B1) the script exits 1:

```text
JS: 205.7 KiB / 207 KiB — ok
CSS: 20.5 KiB / 40 KiB — ok
Per-page budget failed (D234):
  /admin/listings_/$listingId: 375.7 KiB, over its ceiling of 375 KiB
  /admin/listings_/$listingId_/edit: 399.3 KiB, over its ceiling of 399 KiB
  /admin/screening: 373.7 KiB, over its ceiling of 373 KiB
  /l/$slug: 247.5 KiB, over its ceiling of 247 KiB
  /my-listings_/$listingId: 315.0 KiB, over its ceiling of 315 KiB
```

Each page's value after Part B (B2's run, BASE's code with the new ceilings) → on the final tree:

```text
/admin/listings_/$listingId         374.9 / 375 → 375.7 / 375
/admin/listings_/$listingId_/edit   398.5 / 399 → 399.3 / 399
/admin/screening                    372.9 / 373 → 373.7 / 373
/l/$slug                            246.7 / 247 → 247.5 / 247
/my-listings_/$listingId            314.2 / 315 → 315.0 / 315
/post                               393.1 / 397 → 393.9 / 397   (within)
/post_/$listingId                   393.1 / 397 → 393.9 / 397   (within)
/my-listings_/$listingId_/edit      393.2 / 397 → 394.0 / 397   (within)
/                                   219.2 / 220 → 219.2 / 220   (unchanged)
```

Every page that draws a map frame (the ad page's ListingDetail and the wizard's Where step) grew by 0.8 KiB;
the entry did not move. Between B2 and the final tree only Part D changed product code (E is a spec, F one
shorter Amharic value, G documents). My reading, not proven by a comparison build: map-frame.tsx is now
imported both by the pages' static code and by the on-demand map chunks (map-preview.tsx, map-large.tsx gain
`import { MapFailedHere } from "./map-frame"`), so the bundler emits it as a chunk of its own —
dist/client/assets/map-frame-CNV0pjnK.js, 1048 bytes, 585 bytes gzipped (`gzip -9c | wc -c`) — that every
such page now downloads first.

Not landed as a fix, because each one is outside the brief's exact text: raising the five ceilings
(scripts/route-budgets.mjs lines no block names), or moving MapFailedHere out of map-frame.tsx (a change to
Part D's blocks and hashes). Landing this stop pushes the tree as it is, so the next CI run is expected red
in the first-paint bundle budget on these five pages, every other job as the turn left it. The question for
the supervisor: which cure — the ratchet's own rule for the five lines, or the form moved so the pages'
first download does not move — and its blocks.
