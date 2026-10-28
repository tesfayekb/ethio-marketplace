STOP — turn C1-2 THE END-TO-END CHECK: PW-13 red at mobile-360 (the draft's residency read timed out on staging before step 4)
DONE: Part A, STEP 0, parts B–G; ruling 1 R1–R5 (20826a3, 9170aea); ruling 2 R7 (cdb8c5a); THE CHECKS; THE END-TO-END CHECK's first command (green); its second command (one red, below)
LEFT: THE INDEPENDENT REVIEW, THE COMPLETION REPORT
CI: (the newest completed run on ci-evidence names BASE; the landings 09fd6cf5 and 16ca17eb have not reported yet — STALE for them)
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
docs/governance/reports/foundations-turn-c1-2.stop-2.md
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

WHAT RAN (on the last code commit, cdb8c5a; 9170aea after it adds only the S465 line):

- R7: `node scripts/check-bundle-size.mjs` — `Bundle budget OK.`; `375.6 / 379 KiB  /admin/listings_/$listingId`,
  `399.1 / 403 KiB  /admin/listings_/$listingId_/edit`, `373.5 / 377 KiB  /admin/screening`, `247.3 / 251 KiB  /l/$slug`.
- THE CHECKS: `bun .claude/hooks/land.ts --checks` — lint ✓, typecheck ✓, test:unit ✓, format:check ✓ (i18n,
  build, check-migrations not needed for this tree); CHECKS GREEN for code tree 320339ca8af9c685. `bun run test:unit`:
  `Test Files  341 passed (341)`, `Tests  2051 passed (2051)`. The hash list: FAILED for exactly
  docs/governance/instructions-amendments.md, scripts/route-budgets.mjs, src/features/posting/map/map-large.tsx,
  src/features/posting/map/map-preview.tsx (the four the second ruling names); every other line OK. The diff of
  supabase, package.json, bun.lock, AGENTS.md, .claude and .github from BASE: empty. `node scripts/check-bundle-size.mjs`:
  `JS: 205.7 KiB / 207 KiB — ok`, `219.2 / 220 KiB  /`, `247.3 / 251 KiB  /l/$slug`, `393.7 / 397 KiB  /post`,
  `Bundle budget OK.`
- `bun run e2e:local -- e2e/ad-page.spec.ts e2e/on-demand-failure.spec.ts`: `5 skipped`, `75 passed (7.3m)`;
  `[ssr-error]` lines in the server log: 0.
- `bun run e2e:local -- --grep "PW-13 |PW-39 |PW-96 |PW-100 |ALS-1 |FS-3 |FS-4 |FS-11 |FS-13"`: `1 failed`,
  `17 passed (2.6m)`; every id green on both projects except PW-13 at mobile-360 (PW-13 at desktop-1280 passed).
  `[ssr-error]` lines: 1 — `/api/listings/draft` (below).

THE RED, ITS BODY (the brief: "Any red is a STOP with its body"):

```text
[WebServer] [slow-rpc] residency_country_for 10049
[WebServer] [ssr-error] /api/listings/draft residency: Internal server error.
  ✘   3 [mobile-360] › e2e/post-wizard-place.spec.ts:592:3 › POSTING WIZARD › PW-13 review: the preview shows what was answered, and Publish lands in review — never live (19.9s)

  1) [mobile-360] › e2e/post-wizard-place.spec.ts:592:3 › POSTING WIZARD › PW-13 review: the preview shows what was answered, and Publish lands in review — never live

    Error: expect(locator).toBeVisible() failed

    Locator: getByTestId('post-step-4')
    Expected: visible
    Timeout: 10000ms
    Error: element(s) not found

      264 |     const listingId = await reachStep3(page, userId, category);
      265 |     await nextThroughPhotos(page);
    > 266 |     await expect(page.getByTestId("post-step-4")).toBeVisible();
          |                                                   ^
        at reachStep5 (e2e/post-wizard-place.spec.ts:266:51)
        at reachStep7 (e2e/post-wizard-place.spec.ts:439:23)
        at e2e/post-wizard-place.spec.ts:599:37
```

My classification, for the ruling: the test failed at the wizard's step 3 → 4 (photos), before any map or pin is
drawn; the server log shows the draft route's residency read (`residency_country_for`) taking 10 049 ms on
ethio-staging and the route answering a server error, the same moment. No file this turn touched is on that path
(the turn's product changes are the maps' failure in place and one Amharic value). It reads as staging slowness —
40-ci-evidence.md's class (b), not a code finding — but the brief makes any red a STOP, and DEC-184 forbids a
repeat run, so I neither re-ran it nor went on to the review. The trace is local only
(test-results/post-wizard-place-POSTING--4521b-ands-in-review-—-never-live-mobile-360/trace.zip, ignored build
output). CI on the landing runs PW-13 in its own lane on a temporary backend.

The question: proceed to THE INDEPENDENT REVIEW and THE COMPLETION REPORT with this red named under Limits, or
another ruling.
