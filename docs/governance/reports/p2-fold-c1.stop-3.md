QUESTION — p2-fold c1 step 3: PW-82 cannot be served a scratch reach row without editing a real reference row (J3); SWP-3's "against the reach row" names no assertion
DONE: ruling 5 — the types patch c1b (d056b1d6a); photo.ts onto `listing_photo_cap` with UPH-6–9 (836485253); PP-7, PP-25 and PW-29 on a scratch category's baseline-level override (f75600003)
LEFT: PW-82, SWP-3, the promote_options door test, THE CHECKS, budgets, the self-review, the report, the pull request's CI and the c1 comment
CI: # CI Status (auto-generated — do not edit by hand)
    (blank)
    - Commit: `ec736605320d71fc3af332f8c1d92bc93fa56de9` (short `ec73660`)
    - Conclusion: **FAILURE**
    - Completed (UTC): 2026-11-08T02:29:30Z
    - Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42437089728
    (ec73660 is stop 2's last commit: the four expected reds while staging lacked M-3b. origin/dev
    is still af50ca802 — no drift. The run on this push is the pull request's.)
FILES: (git diff --name-only ec7366053, ruling 5's base)
       docs/features/media-pipeline.md
       e2e/helpers/level-overrides.ts
       e2e/photo-pipeline.spec.ts
       e2e/post-wizard-category.spec.ts
       scripts/conformance/listing-levels-allowlist.txt
       scripts/conformance/non-null-allowlist.txt
       src/integrations/supabase/types.ts
       src/routes/api/upload/photo.test.ts
       src/routes/api/upload/photo.ts
       (and this file)

## The question: PW-82

Ruling 5: "PW-82 moves onto a scratch reach row". The census says the wizard cannot be served one.

- PW-82 (`e2e/post-wizard-place.spec.ts:1143–1185`) asserts step 6's add buttons and
  `post-where-plan-count`'s `data-max` against caps it reads from `coverage_plans`' free row.
- Step 6 draws those caps from the posting schema's `plan` block (`posting-service.ts` `PlanCaps`,
  `step-where.tsx:1704`).
- M-3a builds that block from ONE reach row: `WHERE r.key =
  (public.market_settings_for(NULL::character)).included_reach AND r.kind = 'reach'`
  (`20261107111340_503c2e70-….sql:186`). The schema door takes no market and no listing, so the row
  is always the default market's included reach.
- A scratch reach row therefore reaches the wizard only if the test points the real default
  market row (`market_settings`, `country_code IS NULL`) at it. J3: "Never edit real reference rows
  in ANY project". On ethio-staging that row is also shared with every other test running at the
  same time. M-3a's own proof could do it because it rolls back; a browser test cannot.

The options I can see, none taken:

1. PW-82 reads its expectation from the reach row the schema serves, read only: the default
   market's `included_reach`, then that `listing_packages` row's `max_cities`, `max_regions` and
   `max_countries`. This moves PW-82 off `coverage_plans` onto the reach row, the way it read the
   free row before (read, never written — G27), but the row is real, not scratch.
2. PW-82 stays on `coverage_plans` in c1, with a K2 line for the turn that gives the schema door a
   market (then a scratch market with a scratch included reach can serve it).
3. Pointing the default market at a scratch row inside the test: refused under J3, not offered.

## The question: SWP-3

Ruling 5: "SWP-3 runs against the reach row". SWP-3 (`e2e/my-listings-levels.spec.ts:612–638`)
already uses a scratch market (`scratchMarket`, its own `market_settings` row) whose
`included_reach` is the default market's real key, read only (`includedReach()`, :183). After the
sweep it asserts the three reach columns cleared, the revision's `coverage: [market.cityId]` and the
`listing.reach_ended` audit row. The ruling names no assertion to add. I can see two readings:

1. Keep the real included key and add one assertion: after the sweep,
   `listing_effective_reach(ad)` (service-only, so through the service client, J4) answers the
   scratch market's included reach.
2. Give the scratch market a scratch reach row (`e2e-` key, `kind = 'reach'`, caps of its own) as its
   included reach, seed the ad in more places than that row allows, and assert that the sweep's trim
   keeps the ad within the scratch row's caps and that `listing_effective_reach(ad)` answers its key.
   This changes the fixture of a test that passes today.

## Evidence for the work done (ruling 5)

- The types patch c1b: `sha256sum` matched `20f4506e…a872be`; `git apply`; `bun run typecheck`
  passed. Committed as d056b1d6a; the .patch file is not in the tree.
- `src/routes/api/upload/photo.ts:131–146`: the cap step reads `listing_photo_cap(p_listing)`. A
  NULL cap is refused `levelNotAvailable` (the existing fallback text; no new string); at the cap,
  `tooManyPhotos`. The `MAX_PHOTOS_PER_LISTING` dial is gone (its row in `media-pipeline.md` too):
  a reader names no cap of its own, and D311 lets a level go past 10. `photo.test.ts` 9/9, with
  UPH-6–9 new; a planted `Math.min(10, cap)` turns UPH-7 red.
- PP-7, PP-25 and PW-29: `e2e/helpers/level-overrides.ts` (new) seeds the scratch category's
  `level_overrides` row for the baseline level. Its cap differs from the baseline row's own (3, or 2
  when that row says 3), so a reader that skipped the override cannot pass. Each test reads its
  expectation from the row it wrote. The row is removed in `afterEach` before its category (the
  foreign key), by a destroy that throws. CF-LEVEL-1 gains the helper's reader line
  (`… | DEC-351`). PP-25 lost two non-null assertions: CF-NN-1's count for
  `photo-pipeline.spec.ts` goes 84 → 82.
- PP-7's title is now "PP-7 the photo past the ad's level cap is refused tooManyPhotos" (it said
  "the eleventh photo"); the id is kept.
- Law tests (`bunx vitest run scripts --maxWorkers=2`): 490/492 before the CF-NN-1 line was
  lowered (NH-6 and that line). After it, the two guards it touched pass 5/5. NH-6 is this
  computer's known limit.
- Browser runs (`bun run e2e:local`, each spec whole and alone, both projects, `--retries=0`,
  ethio-staging):
  - `e2e/post-wizard-category.spec.ts`: 46 passed, 2 skipped, 0 failed; PW-29 ran and passed on
    `mobile-360` and `desktop-1280`.
  - `e2e/photo-pipeline.spec.ts`: 65 passed, 1 skipped, 2 failed. PP-7 and PP-25 ran and passed on
    both projects. The two reds are **PP-8** on both projects: "…/cover.webp must be gone from
    storage" (`photo-pipeline.spec.ts:371`), after the DELETE answered ok. The DELETE runs through
    `src/routes/api/listings/photos.$id.ts`, `remove_listing_photo` and `storage.ts`. None of those
    is changed on this branch (`git diff --name-only origin/dev HEAD`; no migration here names
    `remove_listing_photo`). The run logged no `object delete` failure. PP-8 was green in CI's E2E on
    ec7366053. It is not classified: CI's E2E lane on this push is the judge, and I did not repeat it
    locally (DEC-283).
- The browser guard first refused because this shell's `PLAYWRIGHT_BROWSERS_PATH` named a sandbox
  cache. The runs set it to the user cache, which holds the pinned chromium-1208; nothing was
  installed.

## Findings

- PW-82's comment ("the 'free' row is read, never written — G27") and title ("the plan's own
  limits") describe the `coverage_plans` reader. Whichever option is ruled, they change with it.
