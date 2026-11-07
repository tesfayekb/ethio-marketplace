QUESTION — p2-promote: two test files outside scope that ruling 2's order reaches (`priceLine` onto `moneyText`; MLP-6's menu list)
DONE: ruling 2's order up to and including "tests PMS, PMV, ALV, LVP-1…4" — the service and the sheet (promote_options and set_listing_level only, the answer read through `parsePromoteOptions`; the temporary check-doors allowlist line removed in the service commit, 10 → 9), the row menu and the page (`promotable`, E9), the band stays, staff Days on both pages with source, until and the typed absence, `moneyText` with ONE of its two callers (`product-prices-table.tsx`), DOOR_CODES by the family's codes, the strings by script (33 keys, both layers, 0 differ from p2b-strings.json), PMS-1…6, PMV-1…6, ALV-1…2, LVP-1…4 (e2e/my-listings-promote.spec.ts, by hand)
LEFT: `priceLine` onto `moneyText` (E6's second caller); the touched specs' edits this question asks for; docs (my-listings.md, admin-listings.md, doors.md, the changelog line); budgets measured (E11); THE CHECKS whole; the self-review; the report; push, READY, the pull request's CI, the green comment
CI: # CI Status (auto-generated — do not edit by hand)
    (blank)
    - Commit: `87cbc5777651bd2876eecf554b746b790f2d9417` (short `87cbc57`)
    - Conclusion: **SUCCESS**
    - Completed (UTC): 2026-11-07T06:04:42Z
    - Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42313906462
    (87cbc5777 is this branch's last pushed commit, ruling 2's base; origin/dev is still 7acae2b4d — no drift.)
FILES: docs/generated/i18n-usage.json
       docs/governance/briefs/p2-promote-ruling-1.md
       docs/governance/briefs/p2-promote.md
       docs/governance/reports/p2-promote.stop-1.md
       docs/governance/reports/p2-promote.stop-2.md
       docs/governance/reports/p2-promote.stop-3.md
       e2e/my-listings-promote.spec.ts
       public/i18n-usage.json
       roadmap.md
       scripts/conformance/holds-its-box-allowlist.txt
       scripts/conformance/listing-levels-allowlist.txt
       scripts/doors/manifest.txt
       scripts/public-surface-allowlist.txt
       src/features/admin-listings/change-listing-tier.test.ts
       src/features/admin-listings/change-listing-tier.ts
       src/features/admin-listings/history.test.ts
       src/features/admin-listings/listing-page.tsx
       src/features/admin-listings/listings-page.tsx
       src/features/admin-listings/tier-dialog.test.tsx
       src/features/admin-listings/tier-dialog.tsx
       src/features/admin-listings/tier-reasons.test.ts
       src/features/admin-listings/tier-reasons.ts
       src/features/admin-listings/use-admin-listing.test.ts
       src/features/admin-listings/use-admin-listing.ts
       src/features/admin-listings/use-admin-listings.ts
       src/features/admin-monetisation/product-prices-table.tsx
       src/features/my-listings/my-listing-page.tsx
       src/features/my-listings/my-listing.test.ts
       src/features/my-listings/my-listing.ts
       src/features/my-listings/my-listings-page.tsx
       src/features/my-listings/promote-service.test.ts
       src/features/my-listings/promote-service.ts
       src/features/my-listings/promote-sheet-lazy.ts
       src/features/my-listings/promote-sheet.test.tsx
       src/features/my-listings/promote-sheet.tsx
       src/i18n/locales/am-admin.ts
       src/i18n/locales/am-member.ts
       src/i18n/locales/en-admin.ts
       src/i18n/locales/en-member.ts
       src/integrations/supabase/types.ts
       src/lib/door-codes.test.ts
       src/lib/door-codes.ts
       src/lib/format.test.ts
       src/lib/format.ts
       supabase/migrations/20261106233808_bc86fa74-d073-4c1d-8250-f767b6251152.sql

Q1 — `priceLine` onto `moneyText` reaches a test outside scope, and leaves a key with no caller.
Ruling 1 E6 puts `price-line.ts` and `price-line.test.ts` in scope and says `priceLine` calls
`moneyText`. The fixed-price branch today is
`fill(t("post.review.priceLine"), { amount, currency, period: "" }).replace(/\s+/g, " ").trim()`
(src/features/posting/price-line.ts:64), and that line is the key's only caller in `src/` outside
the locale files (`rg -n "post.review.priceLine" src --glob '!src/i18n/**'`). Moving it onto
`moneyText` changes two things the scope does not cover:
- `src/test/own-key-sites.test.ts:45-53` ("a price period naming an inherited member prints the
  plain amount") feeds `t = (key) => "t:" + key` and expects `"t:post.review.priceLine"`; through
  `moneyText` the line prints `"5 ETB"`, so that test goes red. Its point (an inherited period
  name never reaches `PERIOD_KEYS`) still holds; only its expected text names the key.
- `post.review.priceLine` (`src/i18n/locales/en-base.ts:654`, `am-base.ts:607`,
  `"{amount} {currency} {period}"` in both) would be left with no caller. Neither base file is in
  scope, and the brief carries no FLAG on strings.
Asked: either (a) `src/test/own-key-sites.test.ts` joins scope (its expectation becomes the plain
amount from `moneyText`), with a ruling on the orphaned key (removed from en-base.ts and am-base.ts
in this turn, or left for a later turn and named in the report); or (b) `priceLine` keeps its
template in this turn, and `moneyText` has the one caller it has now, with E6's second caller as a
K2 line.

Q2 — MLP-6's row-menu list (e2e/my-listings-page.spec.ts:693-700) is a spec edit the brief did not
enumerate (rule 20). E9 adds Promote to the row menu of a live or paused ad, between the offer
actions and Copy (`my-listings-page.tsx:515-524`), so the menu of MLP-6's live ad X now reads
`open, share, reserve, sell, close, promote, copy`. The test's `toEqual` list has no `promote`, so
MLP-6 goes red on CI once it reaches line 693. The edit is one line,
`` `my-listing-${X}-more-promote`, `` between `-close` and `-copy`. Asked: may
`e2e/my-listings-page.spec.ts` join scope for that one line?

THE TOUCHED SPECS, EACH WHOLE, ALONE, 0 RETRIES, BOTH PROJECTS (bun run e2e:local, ethio-staging):
- e2e/my-listings-promote.spec.ts (new): 8 passed (46.3s), and again after the `ownValue` edit,
  8 passed (46.5s), before its commit 5e37960d7.
- e2e/my-listings-levels.spec.ts: 26 passed (1.2m).
- e2e/my-listings-page.spec.ts: 14 passed, 2 failed — MLP-6 on both projects at line 671, the step
  after line 669's `Control+A` (INC-1066, open: macOS Chromium moves the caret, the search keeps
  its text). The test never reached line 693, so Q2's red is not shown locally; it follows from the
  list and the menu as built.
- e2e/my-listings-ad.spec.ts: 34 passed, 2 failed — MLA-13 on both projects at line 1017
  (`priceOf(X)` toBe 90), after line 1008's `Control+A` (INC-1066).
- e2e/admin-listings.spec.ts: 70 passed, 6 failed — AL-20 (line 1479), AL-23 (line 1711), AL-30
  (line 2135) on both projects, each after a `Control+A` (lines 1470, 1680, 2131; INC-1066). Every
  Set tier test passed.
- e2e/admin-monetisation.spec.ts: 30 passed, 4 failed — MON-11 (line 1303,
  `valid_to <= Date.now()`) and MON-17 (line 1724, `unpricedPairs(new Date().toISOString())` still
  lists the pair) on both projects. Each compares a time the staging server stamped with this
  computer's clock, which `sntp time.apple.com` reads +0.302577 s behind; neither assertion reads
  the amount cell, the one part of that screen this turn changed. The class is not in
  incidental-findings; a candidate finding for the supervisor, and CI (Linux, a synchronised clock)
  judges both.
