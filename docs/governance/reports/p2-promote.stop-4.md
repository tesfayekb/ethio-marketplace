STOP — p2-promote budgets (E11): the tree is over three page ceilings, and E11's tolerances cannot be met by the mechanisms the turn uses
DONE: ruling 3 saved (docs/governance/briefs/p2-promote-ruling-3.md, sha256 of the fenced text 83d71f8b4a1b1cba5d4bf9a47b85795627b501a68e37444f6913b1d3ef3c198f); §1 (`priceLine`'s amount through `moneyText`, `own-key-sites.test.ts:52` → "5 ETB", `post.review.priceLine` retired from en-base and am-base, the usage maps regenerated: 1875 → 1874 keys); §2 (MLP-6's list gains `-more-promote`; the census `rg -n "more-promote|more-copy|more-close" e2e` and `rg -n 'my-listing-\$\{[A-Za-z]+\}-more-"' e2e` find no other exact-list reader); the docs (my-listings.md, admin-listings.md, doors.md); budgets measured (below)
LEFT: the budget fix this stop asks for; THE CHECKS whole; the self-review; the report (Records, FINDINGS, K2; the changelog line goes in Records — the brief keeps docs/_changelog.md out, DEC-346); push, READY, the pull request's CI, the green comment
CI: # CI Status (auto-generated — do not edit by hand)
    (blank)
    - Commit: `50b3eb8d242922361719b7b26f05c35959354552` (short `50b3eb8`)
    - Conclusion: **FAILURE**
    - Completed (UTC): 2026-11-07T07:18:08Z
    - Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42349166912
    The three reds on 50b3eb8d2 (stop 3's push), each read: Lane 5 and Lane 13 — MLP-6 on both
    projects at e2e/my-listings-page.spec.ts:693, the received list holding
    `-more-promote` between `-close` and `-copy` (e2e-last-failure.md; stop 3's Q2, answered by
    ruling 3 and committed in 8d16efece, not yet run in CI); the bundle budget — "/admin/listings:
    352.9 KiB, over its ceiling of 351 KiB", "/admin/listings_/$listingId: 354.4 KiB, over its
    ceiling of 353 KiB", "/admin/screening: 373.9 KiB, over its ceiling of 373 KiB" (this stop's
    Q1). Passed 2692, skipped 402, failed 2; the repeat lane ran my-listings-promote.spec.ts
    (56 results) with no failure. origin/dev is still 7acae2b4d — no drift.
FILES: (git diff --name-only 7acae2b4d, adds to stop 3's list)
       docs/features/admin-listings.md
       docs/features/doors.md
       docs/features/my-listings.md
       docs/governance/briefs/p2-promote-ruling-3.md
       docs/governance/reports/p2-promote.stop-4.md
       e2e/my-listings-page.spec.ts
       src/features/posting/price-line.test.ts
       src/features/posting/price-line.ts
       src/i18n/locales/am-base.ts
       src/i18n/locales/en-base.ts
       src/test/own-key-sites.test.ts

## The checks on this tree

`bun run build && node scripts/check-bundle-size.mjs` on the repository's tree at 2528f75f7 (the
docs commit; nothing uncommitted) exits 1, three pages over their ceilings:

    /admin/listings: 353.0 KiB, over its ceiling of 351 KiB
    /admin/listings_/$listingId: 354.5 KiB, over its ceiling of 353 KiB
    /admin/screening: 374.1 KiB, over its ceiling of 373 KiB

The entry: JS 211.9 / 215, CSS 23.1 / 40 — ok. `/my-listings` 320.7 / 322,
`/my-listings_/$listingId` 327.7 / 329, `/settings` 283.3 / 284 — under.

## How it was measured (byte precision)

The check prints 0.1 KiB, too coarse for E11's 0.1 KiB tolerance. Two scratch copies of the
repository under /tmp (no `.git`, no `.env*`, `node_modules` linked; identical but for this
turn's files — in the base copy every `src/` and `public/` file this turn changed holds its
bytes from `git show 7acae2b4d:<path>` and the five new files are absent) were built with
`bun run build`, and every page's first download summed in gzipped bytes by the check's own
functions (`readRouteManifest`, `routePreloads`, `staticClosure` from scripts/bundle-closure.mjs).
No `.env` in either copy makes both about 0.1 KiB lighter than the repository's build; the
differences are like for like. Nothing in the repository changed for this.

Per page, base → this tree (gzipped KiB, delta in bytes):

    /                                  231.879 → 231.986  +110
    /$name                             229.842 → 229.946  +107
    /account                           274.241 → 274.362  +124
    /account_/legal                    214.333 → 214.447  +117
    /account_/legal_/$versionId        215.021 → 215.059  +39
    /account_/saved                    229.843 → 229.943  +103
    /admin                             212.702 → 212.741  +40
    /admin/                            213.537 → 213.579  +43
    /admin/ai                          326.164 → 326.301  +140
    /admin/attributes                  339.464 → 339.598  +137
    /admin/audit                       299.136 → 299.271  +138
    /admin/categories                  347.505 → 347.640  +138
    /admin/countries                   328.985 → 329.123  +141
    /admin/images                      213.350 → 213.390  +41
    /admin/impersonation_/$sessionId   293.830 → 293.955  +128
    /admin/legal                       284.746 → 284.864  +121
    /admin/legal_/$versionId           282.103 → 282.220  +120
    /admin/legal_/edit                 283.799 → 283.845  +47
    /admin/listings                    348.625 → 352.637  +4108
    /admin/listings_/$listingId        350.008 → 354.129  +4220
    /admin/listings_/$listingId_/edit  411.029 → 411.156  +130
    /admin/locations                   273.396 → 273.437  +41
    /admin/monetisation                338.235 → 338.963  +745
    /admin/places                      330.482 → 330.620  +141
    /admin/roles                       295.967 → 296.018  +52
    /admin/roles_/$roleId              276.357 → 276.400  +44
    /admin/screening                   369.935 → 373.688  +3844
    /admin/translations                306.873 → 306.920  +48
    /admin/translations_/$lang         310.406 → 310.541  +138
    /admin/users                       295.631 → 295.759  +131
    /admin/users_/$userId              290.938 → 291.061  +125
    /auth                              229.200 → 229.478  +284
    /auth_/callback                    215.631 → 215.905  +281
    /auth_/reset                       217.584 → 217.862  +285
    /c/$slug                           231.879 → 231.986  +110
    /dev/primitives                    233.308 → 233.349  +42
    /dev/style                         252.797 → 252.898  +104
    /dev/tall                          212.053 → 212.093  +41
    /l/$slug                           261.766 → 261.867  +104
    /legal/$kind                       216.402 → 216.513  +113
    /legal/accept                      223.444 → 223.482  +39
    /legal/publishing                  217.158 → 217.271  +115
    /my-listings                       319.119 → 320.454  +1367
    /my-listings_/$listingId           325.975 → 327.433  +1493
    /my-listings_/$listingId_/edit     405.600 → 405.723  +126
    /post                              405.561 → 405.684  +126
    /post_/$listingId                  405.524 → 405.647  +126
    /privacy                           216.391 → 216.503  +115
    /settings                          282.649 → 283.007  +366
    /terms                             216.387 → 216.498  +114
    (the entry's closure)              211.739 → 211.776  +38

Against E11: 12 pages inside 0.1 KiB, 31 between 0.1 and 0.3, 7 over 0.3 (the three Promote
pages among them).

## The causes, by chunk (the same functions, per chunk name without its hash)

1. `monetisation-forms` — 3509 B, now a chunk of its own on `/admin/listings`,
   `/admin/listings_/$listingId` and `/admin/screening` (and split out of
   `admin.monetisation`, which falls 2901 B, so `/admin/monetisation` nets +745). Cause:
   `tier-reasons.ts:1` imports `wholeNumber` (a four-line function, monetisation-forms.ts:35-39)
   for the Days parse; a module is never split across chunks, so the whole forms module comes
   with it. This alone puts the three pages over their ceilings.
2. The Promote sheet's preload map — on `/my-listings` and `/my-listings_/$listingId` a new
   static chunk `promote-sheet-lazy` (2699 B), which the bundler merged with `state-line`
   (1574 B, which leaves those pages' list): net +1125 B. Most of it is the dynamic import's
   preload list — the sheet's whole static closure, 62 file names, the entry's among them — and
   the base page chunks had no dynamic import, so the names are new bytes. The sheet itself
   (`promote-sheet`, 2331 B) and its service stay on demand.
3. `format` +79 B on every page that carries it — `moneyText`.
4. The entry +38 B — its preload table's indices for the three new chunks (`promote-sheet`,
   `door-codes`, `monetisation-forms`).
5. `door-codes` — on `/auth`, `/auth_/callback`, `/auth_/reset`, `/settings` a chunk of its own
   (557 B) where it was inside `auth-service` (−287 B): a second consumer (`promote-service`)
   splits it out; the 13 family codes (E1) are in it.
6. The retired key — `provider` (where the English base strings ride, on every page) −11 B;
   `use-price-unit-labels` (the price line) −25 B. The drop is real and smaller than the growth
   above, so no page reads lower.
7. Changed modules: `change-listing-tier` +264 B (the chunk holds the dialog with Days),
   `tier-reasons` +208 B, the listing page +132 B (the level line), `my-listings` +119 B and
   `my-listing-page` +246 B (the verb, the control), `my-listing` +16 B.

## Two experiments on the scratch copy (not in the repository)

- `wholeNumber` moved to a module of its own (`src/lib/whole-number.ts`, which
  monetisation-forms.ts imports and re-exports; tier-reasons.ts imports it from there):
  `/admin/listings` +694 B, `/admin/listings_/$listingId` +821 B, `/admin/screening` +434 B,
  `/admin/monetisation` +209 B; the new chunk `whole-number` is 126 B. The size check then passes
  every ceiling (its one failure on the copy, `/admin/legal_/edit` reading 8 KiB under its
  ceiling, is the copy's missing `.env`; the repository's own build of that page passes).
- Each page defining its own `resilientLazy` for the sheet (no shared wrapper module):
  `/my-listings` +1266 B, `/my-listings_/$listingId` +1370 B — about 100 B less each; the page
  chunk `my-listings` then carries the 62-name preload list itself (+1144 B).
- A static sheet would cost more than the preload list: `promote-sheet` alone is 2331 B.

## QUESTION

Q1 — the three pages over their ceilings. The narrowest fix I can see moves `wholeNumber` into
a module of its own in `src/lib/` and has `monetisation-forms.ts` import it (re-exporting it, so
its importers `caps-forms.ts:3` and `price-forms.ts:9` stay as they are); `tier-reasons.ts`
imports it from there. Neither `monetisation-forms.ts` nor a new `src/lib/` file is in scope.
The alternative inside scope — `tierDays` parsing with its own regex — is a second home for the
parse (K1), so I do not propose it. Asked: may `src/features/admin-monetisation/monetisation-forms.ts`
and a new `src/lib/whole-number.ts` (with its own unit test) join scope, or another arrangement?

Q2 — E11's tolerances. After Q1's fix, the measured growth is still over E11's: the three Promote
pages ≈ +0.8 KiB (`/admin/listings_/$listingId`) and ≈ +1.2 to +1.4 KiB (the two seller pages;
the preload list's floor is about 1.1 KiB for any `resilientLazy` piece these pages did not
have), `/admin/listings` ≈ +0.68, `/admin/screening` ≈ +0.42, `/admin/monetisation` ≈ +0.20,
the auth pages and `/settings` ≈ +0.28 to +0.37 (`door-codes`' split), and 31 pages between 0.1
and 0.3 KiB (`moneyText` +79 B and the entry +38 B, on every page). None of these crosses a
ceiling after Q1's fix (the check on the copy passes), and no ceiling moves. Asked: do these
readings stand with their causes named, or does any of them need another arrangement — and for
the sheet, the shared wrapper module (as now) or one `resilientLazy` per page (about 100 B
lighter on each, the lazy defined twice)?
