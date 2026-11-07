QUESTION — p2-promote step 1: the plan (census at 7acae2b4d), with seven STOP lines for ruling 1
DONE: step 0 (task saved byte for byte, sha256 65d9bf40dabdeccf77e99d5a5b7737a88cbf9fddc29aa3d8a6eb3e00a10a0dec matches; roadmap line 3; draft PR #29), step 1 (the census below)
LEFT: step 2 (the build), the checks, the browser check, the self-review, the report, the pull request's CI
CI: # CI Status (auto-generated — do not edit by hand)
    (blank)
    - Commit: `f8fb55bc0887cabc4b1def60f6d995b382292541` (short `f8fb55b`)
    - Conclusion: **SUCCESS**
    - Completed (UTC): 2026-11-06T15:40:52Z
    - Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42241564230
    Two-step check: f8fb55b is the second parent of origin/dev 7acae2b4d (the merge of PR #28);
    `git diff --stat f8fb55b 7acae2b` is empty (the same tree). dev's own CI on 7acae2b (run
    42283476499) was in progress when read; "Push on dev" 42283474658 green. guards-last-failure
    and e2e-last-failure read: no red of an earlier turn on this tree. Flake ledger read whole: MON-9
    has 2 lines in 7 days (under 3), nothing at 3.
FILES: docs/governance/briefs/p2-promote.md
       roadmap.md
       (and this file)

Base `7acae2b4d` = `origin/dev` at the start (no drift). Nothing outside the brief, the roadmap and
this report is changed. Every line number below is read at `7acae2b4d`.

## (a) CONSUMERS — every place a level, its days, its until, a promote or a resume shows or is set

A1. The seller's row menu — `src/features/my-listings/my-listings-page.tsx:437–516` (`rowActions` →
`RowActions` from `src/components/shell/row-actions.tsx`): Edit, Remove, and `more` = Open, Share
(`shareable`, `my-listings.ts:120`), the offer's actions (`rowActionsFor`, `my-listing.ts:237`), Post
similar (`copyable`, `my-listing.ts:568`). The verb rule is `offerFor` (`my-listing.ts:200`): live →
reserve/unreserve, sell, close, delete; paused → resume, sell, delete. Running: `runListAction` →
`runAction` (`my-listing.ts:291`), on the raw platform client (`supabase.rpc`), refusals by sentence
substring in `actionErrorKey` (`my-listing.ts:253`).

A2. The seller's ad page — `src/features/my-listings/my-listing-page.tsx`: the actions block
`my-listing-actions` at `:450` (near the TOP of the page: Open, Edit, the offer's one-tap steps at
`:510` `my-listing-action-${action}`, Resume among them, Post similar, Delete); the status card
`my-listing-status` at `:562` with `stateLine` at `:581` and the paused help
`my-listing-paused-help` at `:584`. `stateLine` (`state-line.ts:80`) already appends
`myListings.levelEnding` ("Level ends {date}") to a live ad's line when `levelUntil` is set; paused
(`:98`) says `myListings.paused` and the days kept. Resume: `act("resume")` → `runAction` →
`supabase.rpc("resume_listing")` (`my-listing.ts:331`), done notice `myListings.done.reopen` (`:418`).

A3. The staff ad page — `src/features/admin-listings/listing-page.tsx`: `tierLabel` closure `:174`;
`maySetTier` `:209`; `runTier` `:354` (→ `changeListingTier`); badge `listing-tier` `:442`; the level
line, Fact `listing-fact-tier` `:709`; `<TierDialog>` `:872`. `TierDialog`
(`tier-dialog.tsx`): FilterChoices of `TIERS` (`tier-reasons.ts:17`) + `ReasonNote`; `onConfirm(tier,
reason, note)`. `changeListingTier` (`change-listing-tier.ts:21`) passes `days = null` at `:30`.
`setAdminListingTier` (`use-admin-listing.ts:272`) already takes `days` and sends `p_days` only when
non-null (`:284`). `tierErrorKey` (`tier-reasons.ts:54`) maps the door's sentences; `badDays` falls to
`common.error`. `tierProblem` (`tier-reasons.ts:39`) has no days check.

A4. The staff roster — `src/features/admin-listings/listings-page.tsx`: `tierLabel` `:219`; the row
menu's Set tier; `runTier` `:351`; `<TierDialog>` `:885` — the SAME dialog. Giving the dialog a Days
field reaches the roster's row dialog too (STOP line E5).

A5. The readers' fields (the task's "the same fields"): `my_listings` / `my_listing`
(20261105080109 `:124`, `:216`) answer camelCase `level`, `levelUntil`, `levelSource`, `reach`,
`reachUntil` (no `reachSource`), parsed in `my-listings.ts:166–198`; `my_listing` adds `countryCode` =
`coalesce(loc.country_code, l.home_country_code)` (`:264`). `admin_listing_detail` (20261105080110
`:177`) answers snake_case `tier`, `tier_until`, `tier_source`, `reach`, `reach_until`,
`reach_source`; `detailOf` maps them (`use-admin-listing.ts:121–126`). `admin_list_listings`: `tier`
only. The two sentinels the task names hold where it says: `use-admin-listing.ts:121`
`tier: String(l["tier"] ?? "regular")`, `use-admin-listings.ts:88` `tier: String(row["tier"] ??
"regular")`. Generated types carry every door (`src/integrations/supabase/types.ts`:
`set_listing_level` 6381, `resume_listing` 6325, `admin_set_listing_tier` 5205 with `p_days?`,
`level_perks_for` 6035, `product_price_for` 6225, `package_price_for` 6192).

A6. The doors, at their last declaration:
- `set_listing_level` (20261104153958 `:53–112`) — refusals by plain `RAISE EXCEPTION` (SQLSTATE
  P0001; not on the door shell yet — F1-5a moves it): `notSignedIn` `:53`; the sentence 'account is
  deactivated' (`assert_caller_active` `:54`); `listingNotFound` `:56`; `notLive` `:57`; `rateLimited`
  `:58`; `unknownLevel` `:62`, `:64`; `sameLevel` `:66` with `USING DETAIL =
  coalesce(tier_until::text, '')` — the until reaches the browser in PostgREST's `details` field, not
  the message, in Postgres's text form; `lowerLevel` `:68`; `listingNotPlaced` `:71` (the location's
  country only — no home-country fallback, unlike `my_listing`'s `countryCode`); `levelNotAvailable`
  `:73`; `seasonEnded` `:75`; `notOffered` `:77`; `marketNotSet` (from `market_settings_for`,
  20261104153957 `:37`); `creditsNotAvailable` `:79` (paid levels ON refuse until P-3). The task's
  list omits the last two and the deactivated sentence; the plan keys all of them. Success:
  `{ok, level, until, source, status}` `:111`; a paused ad resumes to `resume_status` `:107`.
- `resume_listing` (20261105080111): `notSignedIn`, 'account is deactivated', `listingNotFound`,
  `notPaused`, and `noFreeSlot` (DETAIL = slots) from the free-slot guard through
  `transition_listing`.
- `admin_set_listing_tier` (20261105080112): the sentences `tierErrorKey` reads, plus `badDays` `:88`
  (days < 1, > 3650, or a days value on the baseline level).

A7. Strings already present: `myListings.levelEnding` "Level ends {date}", `myListings.pausedHelp`
(en-member); `myListings.paused`, `myListings.ad.resume` "Resume ad", `myListings.error.rateLimited`
/ `deactivated` / `notYours` / `changed` / `failed`, `post.refusal.noFreeSlot`, `door.refused`,
`tier.premium`, `tier.featured` (en-base); `admin.listings.tier.*`, `admin.listings.action.tier`
"Set tier" (en-admin); `admin.listings.filter.tier`, `admin.listings.error.noFreeSlot` (en-member).
`admin.listings.tier.hint` says "The tier stays until staff change it or the ad is removed." — false
once Days exists, so it needs a NEW key (a renamed string is a new key).

A8. Read, not changing: the buyer's page `/l/$slug` and the cards (CF-TIER-3, the tier flag on card
pages only); the screening queue's `.eq("tier", …)` (`src/features/admin-screening/use-screening.ts:175`,
K2).

## (b) MECHANISMS ALREADY PRESENT

B1. On-demand sheet: `resilientLazy` (`src/lib/resilient-lazy.ts`) + Suspense, mounted on the first
tap and kept mounted shut — the shape of `src/components/shell/page-guide.tsx:41–97`; the body uses
the `Sheet` facade (`src/components/ui/sheet.tsx`, over `overlay-facade.tsx`). Censuses:
`on-demand-imports.test.ts` (OD-1: an `import(` inside `resilientLazy` passes) and
`on-demand-failure.test.ts` (ODC-1: a `resilientLazy` caller is answered by it). Neither needs an
allowlist line. `check-bundle-size`'s MUST_NOT_CARRY binds public pages only.

B2. Door contracts. Server side (routes): `doorCall` (`src/server/door.ts:32`) → `doorRefusal`
(`src/features/posting/door-error.ts:24`) and `doorAnswer` (`src/server/supabase/user-client.ts:361`).
Browser side: `rpc()` (`src/lib/supabase-door.ts:298`) answers `RpcError {message, code, details,
hint}` (`:47`); `doorCode` (`src/lib/door-codes.ts:69`) reads the message's `code[:detail]` against
the CLOSED `DOOR_CODES` (`:21`: notSignedIn, accountDeactivated, permissionDenied, stepUpRequired,
rateLimited, lastSignInMethod, languageNotPublished, noProfile); an unknown code is `null` → the key
`door.refused`; it never reads `details`. e2e: `e2e/helpers/door-answer.ts` (envelope doors —
`set_listing_level` is not one). See E1.

B3. Money formatter: NONE YET. The one price look is `priceLine` (`src/features/posting/price-line.ts:37`:
`formatNumber` + the template `post.review.priceLine` "{amount} {currency} {period}"); the hand-made
amount the task's K2 names now sits at `src/features/admin-monetisation/product-prices-table.tsx:103`
(`${number.format(row.amount)} ${row.currency}`; `package-prices.tsx` no longer exists). See E6.

B4. Dates: `formatDate` / `dateFormatter` (`src/lib/format.ts:101`, `:84`). There is no intent named
`date`; the pages use `dateFormatter("day", language)`. The plan uses intent `day` (premise E8).

B5. Names: `catalogText` (`src/i18n/entity.ts`) over a level row's `name_en` / `name_am` — as the
console's `use-monetisation-names.ts` does.

B6. Guards: CF-PRICE-1 (`scripts/conformance/package-price.ts:32`, `PRICE_READER_HOMES` = one file,
`monetisation-service.ts`; Q7's widening is NOT in the tree yet). CF-LEVEL-1
(`scripts/conformance/listing-levels.ts:34`, `LEVEL_READER_HOMES` = the same one file; its read forms
include `.from("listing_packages")`, `.from("level_overrides")` and `level_perks_for`). See E3.

B7. The level rows for a member: NONE YET (no store, no seller reader). The rows are
`listing_packages` (browser-readable enabled rows, `scripts/public-surface-allowlist.txt`); the one
reader is the staff console's `admin_list_monetisation` (packages:view).

B8. The market's paid switch: `market_settings` is browser-readable, but its one rule — "the
country's row, else the default row, else marketNotSet" — is `market_settings_for` (20261104153957
`:23–44`), service-only (REVOKE … authenticated), commented "Never a default in a caller." No browser
door answers it. See E4.

B9. Days field: no `src/lib` number parser; the typed one is `wholeNumber`
(`src/features/admin-monetisation/monetisation-forms.ts:35`, null on blank or non-number). Admin
dialog fields draw through `FormField` (`src/components/shell/form-section.tsx`), as `reason-note.tsx`
does.

B10. Strings layers: the seller's routes declare `strings: ["member"]`; `admin.tsx` declares admin and
member. The layers load on demand (DEC-258), so a key in `en-member` / `en-admin` does not enter any
first download; a key in `en-base` would ride every page. New keys go in the layers.

## (c) FILES AND TESTS (the plan, pending ruling 1)

New:
- `src/features/my-listings/promote-sheet.tsx` (on demand) + `promote-sheet.test.tsx` PMS-1…6.
- `src/features/my-listings/promote-service.ts` + `promote-service.test.ts` — proposed prefix PMV
  (grep: free).
- `e2e/my-listings-promote.spec.ts` LVP-1…5.
- `src/features/admin-listings/use-admin-listing.test.ts` — the typed absence (`detailOf`,
  `listAdminListings` row) — proposed prefix ALV (grep: free; AT is taken).

Changed:
- `src/features/my-listings/my-listing.ts` (+ `.test.ts`): `promotable(status)` beside `copyable` —
  one rule for the row and the page; `resume` refusals as E1 rules.
- `src/features/my-listings/my-listings-page.tsx`: the row menu's Promote, the lazy sheet.
- `src/features/my-listings/my-listing-page.tsx`: the Promote control (placement E9), the band.
- `src/features/my-listings/state-line.ts` only if E10 rules a new band key.
- `src/features/admin-listings/listing-page.tsx`: the level line gains source and until; the
  typed-absence words; Days through the dialog.
- `src/features/admin-listings/listings-page.tsx` and `change-listing-tier.ts` (+ test): the days
  argument (E5 — not named by the task).
- `src/features/admin-listings/tier-dialog.tsx` (+ test), `tier-reasons.ts` (+ test): the Days field,
  its problem (1…3650, blank = open-ended, none on the baseline), `badDays` keyed.
- `src/features/admin-listings/use-admin-listing.ts`, `use-admin-listings.ts`: `?? "regular"` → a
  typed absence.
- `src/features/posting/price-line.ts` (+ `price-line.test.ts`) if E6 rules there.
- `src/lib/door-codes.ts` (+ `door-codes.test.ts`) if E1 rules there.
- `scripts/conformance/package-price.ts`, `listing-levels.ts` (+ their tests, planted bypass) — E3.
- `src/i18n/locales/en-member.ts`, `am-member.ts`, `en-admin.ts`, `am-admin.ts`;
  `docs/generated/i18n-usage.json`, `public/i18n-usage.json`.
- `docs/features/my-listings.md`, `docs/features/admin-listings.md` (and `docs/features/doors.md` if
  `DOOR_CODES` grows).

Lists a new name must join: none expected (no on-demand allowlist line, no route-budget line, no
listing-levels allowlist line if E3 widens the homes; `tier-dialog.tsx` is not in
`listing-levels-allowlist.txt`, so the baseline check for Days lives in `tier-reasons.ts`, which is).

Route budgets at the base — lock-exact build (`bun install --frozen-lockfile`: no changes; `bun run
build`; `node scripts/check-bundle-size.mjs`, "Bundle budget OK"):

| Page | Base reading / ceiling (KiB) |
| --- | --- |
| entry JS | 211.9 / 215 |
| `/my-listings` | 319.4 / 322 |
| `/my-listings_/$listingId` | 326.2 / 329 |
| `/admin/listings_/$listingId` | 350.3 / 353 (the task says 401 — E7) |
| `/admin/listings` | 348.9 / 351 (carries `TierDialog` — E5) |
| `/l/$slug` (buyer) | 261.9 / 265 (must not move) |
| `/my-listings_/$listingId_/edit` | 405.9 / 408 |
| `/admin/listings_/$listingId_/edit` | 411.3 / 414 |
| `/post`, `/post_/$listingId` | 405.8 / 408 each |

The last four pages carry `my-listing.ts` and `use-admin-listing.ts` through
`src/features/posting/use-edit-draft.ts` (imports at its lines 6 and 9), and `price-line.ts` rides
`src/components/marketplace/listing-card.tsx` (every card page). A change to those modules moves those
pages by tens of bytes (E11).

Tests to extend: `my-listing.test.ts`, `tier-dialog.test.tsx`, `change-listing-tier.test.ts`,
`tier-reasons.test.ts`, `price-line.test.ts` (E6), `door-codes.test.ts` (E1),
`package-price.test.ts` / `listing-levels.test.ts` (E3). e2e already covering parts of the task:
`e2e/my-listings-levels.spec.ts` FSL-3 (Resume refused with the no-free-slot words, then live once
another ad is sold) and LDR-4 (staff days through the door) — see E12. Specs touching changed screens
that the browser check will run whole: `my-listings-page.spec.ts` (10), `my-listings-ad.spec.ts` (20),
`my-listings-levels.spec.ts`, `admin-listings.spec.ts` (40 tests — over the 25 split line, K2).

## (d) STRINGS — new EN keys, draft text (the supervisor writes the Amharic; born "level", Q1)

Seller (member layer):
- `myListings.action.promote` — "Promote ad"
- `myListings.promote.title` — "Promote this ad"
- `myListings.promote.hint` — "A higher level shows your ad above others for a set number of days."
- `myListings.promote.days` — "{count} days"
- `myListings.promote.freeLaunch` — "Free while the launch runs"
- `myListings.promote.current` — "Current level"
- `myListings.promote.notAvailable` — "Not available"
- `myListings.promote.choose` — "Choose level"
- `myListings.promote.until` — "Until {date}"
- `myListings.promote.done` — "Level set until {date}."
- `myListings.promote.empty` — "No higher level is offered for this ad."
- `myListings.promote.error.notLive` — "Only a live or paused ad can be promoted."
- `myListings.promote.error.sameLevel` — "This ad already has this level until {date}."
- `myListings.promote.error.lowerLevel` — "Choose a level above the current one."
- `myListings.promote.error.unknownLevel` — "This level is no longer offered."
- `myListings.promote.error.listingNotPlaced` — "Add the ad's place before promoting it."
- `myListings.promote.error.levelNotAvailable` — "This level is not offered in this category or place."
- `myListings.promote.error.seasonEnded` — "This level's season has ended."
- `myListings.promote.error.notOffered` — "This level has no price here yet."
- `myListings.promote.error.marketNotSet` — "Levels are not open in {country} yet."
- `myListings.promote.error.creditsNotAvailable` — "Paid levels are not open yet."
- (only if E10 rules a new band) `myListings.levelBand` — "{level} until {date}"

Reused: `myListings.error.rateLimited`, `myListings.error.notYours` (listingNotFound),
`myListings.error.deactivated`, `myListings.levelEnding`, `door.refused`, `tier.premium` /
`tier.featured` only where the row has no name.

Staff (admin layer):
- `admin.listings.level.days` — "Days"
- `admin.listings.level.daysHelp` — "Leave blank to keep the level until staff change it."
- `admin.listings.level.hint` — "The ad moves to this level for the days you set, or until staff change it." (replaces `admin.listings.tier.hint`, now untrue)
- `admin.listings.level.error.days` — "Days must be a whole number from 1 to 3650." (also the door's `badDays`)
- `admin.listings.level.error.baselineDays` — "The basic level takes no days."
- `admin.listings.level.until` — "Until {date}"
- `admin.listings.level.noEnd` — "No end"
- `admin.listings.level.source.launch` — "Launch offer"
- `admin.listings.level.source.staff` — "Set by staff"
- `admin.listings.level.source.money` — "Paid"
- `admin.listings.level.source.credits` — "Credits"
- `admin.listings.level.unknown` — "Level not known" (the typed absence's words)

## (e) CONFLICTS AND QUESTIONS — each a STOP line for ruling 1

E1. "Read through doorAnswer / doorRefusal": those are server-route helpers. The sheet calls the
doors from the browser (`rpc()`), whose reader is `doorCode`, and `DOOR_CODES` is closed ("grows only
by a family turn"; F1-5a is P-2's family). None of `set_listing_level`'s codes (bar notSignedIn and
rateLimited) is in it, and 'account is deactivated' is a sentence `doorCode` does not read.
Question: may (b) add `set_listing_level`'s and `resume_listing`'s codes to `DOOR_CODES` (and read
the deactivated sentence as `accountDeactivated`), or does (b) map them in `promote-service.ts` with a
local exact-match table until F1-5a? Recommended: the first — one reader. Does `resume`'s mapping move
onto `doorCode` in (b) too (it is a behaviour change of the row and page Resume: today substring
matching)?

E2. `sameLevel`'s until arrives in `RpcError.details` as Postgres text, which `doorCode` never
reads. Question: extend `doorCode` to take `details` as the detail when the message has none, with
the sheet parsing Postgres's timestamp text; or show the row's own `levelUntil` (already read).
Recommended: the row's `levelUntil` — no parser of a database text form.

E3. Q7 widens CF-PRICE-1 to `promote-service.ts`, but the sheet also needs CF-LEVEL-1's reader forms
(`level_perks_for` for the days; `.from("listing_packages")` for the names, sort, `self_serve`,
`is_baseline`). Neither guard's homes are widened in the tree. Question: does ruling 1 name
`promote-service.ts` a second home in BOTH guards (editing `package-price.ts`, `listing-levels.ts`
and their tests, with a planted bypass each)? Neither file is in the task's scope.

E4. The paid switch: no browser door answers the market's `paid_levels`. Reading `market_settings`
directly with "the country's row, else the default row" re-implements `market_settings_for`
(service-only, "Never a default in a caller") — a second version of a mechanism (K1). A seller reader
door (`promote_options(p_listing_id)` answering every level's name, days, amount, currency, the
switch and `notOffered`/`levelNotAvailable` per row) would be one call instead of about seven, and
would follow the door's own country rule (location only — `my_listing`'s `countryCode` falls back to
the home country, so the sheet would preview prices for a country the door refuses as
`listingNotPlaced`). That is a migration, which (b) forbids. Question: which way — (i) a reader door
first (a Fable/migration turn, (b) waits), (ii) (b) reads the default-row rule in
`promote-service.ts` as a recorded exception, or (iii) the sheet shows the amount and the
"Free while the launch runs" line from the door's own answer only (no preview of the switch).
Recommended: (i).

E5. `TierDialog` is shared with the roster (`listings-page.tsx:885`); `changeListingTier` is shared
too. The Days field and the days argument reach `listings-page.tsx` and `change-listing-tier.ts`,
neither named by the task. Question: may both join scope (the roster gets the same Days field), or
does the roster keep an open-ended call?

E6. The money formatter is NONE YET. Proposal: `moneyText(amount, currency, t, language)` exported
from `price-line.ts`, the fixed-price branch of `priceLine` (which then calls it — the same output
byte for byte), used by the sheet. `price-line.ts` rides every card page; the refactor keeps the
growth near zero but a few bytes may move `/`, `/c/$slug`, `/l/$slug` (E11). Questions: is
`price-line.ts` the home (outside scope today); does `product-prices-table.tsx:103` move onto it in
(b) (outside scope) or stay K2?

E7. The task's ceiling for `/admin/listings_/$listingId` is 401; the tree's is 353 (reading 350.3).
The plan works to 353.

E8. The task's "formatDate (intent date)": no intent `date` exists; the plan uses `day`, as the pages
do. (Premise only; no question.)

E9. "A Promote control near the bottom" of the seller's ad page: the page's verbs sit in the actions
block near the TOP (`my-listing-page.tsx:450`). Question: put Promote in that block with the other
verbs (one place for the page's verbs), or a separate control at the foot of the status card /
page? Recommended: the actions block, through `promotable`, so the row and the page share one rule.

E10. "Featured until {date}" names the level on the ad page's first paint, but no level-name store
exists for a member (B7); reading names there adds a first-paint read. Question: keep (a)'s "Level
ends {date}" (`stateLine`, already drawn) as the band in (b), with the names only inside the sheet;
or add a names read to the page. Recommended: keep "Level ends {date}".

E11. "A page the change does not touch growing is a STOP": `/post`, `/post_/$listingId` and both
edit pages carry `my-listing.ts` and `use-admin-listing.ts`; every card page carries `price-line.ts`.
Question: do those count as touched pages (expected growth under 0.1 KiB each), or must `promotable`
and the typed absence live where only the three named pages carry them?

E12. LVP-3 (Resume refused with the no-free-slot words, then live after another ad is sold) is
FSL-3 in `my-listings-levels.spec.ts`; LVP-4's door half is LDR-4. Question: LVP-3 re-pointed at the
row menu's Resume (FSL-3 drives the page), or dropped as a duplicate? LVP-4 drives the dialog's Days
field (UI) and leaves the door check to LDR-4.

## FINDINGS (for the records, labels P2b-a…)

- P2b-a: `admin.listings.tier.hint` states the level never ends; untrue once Days ships (fixed by
  the new hint key in the build).
- P2b-b: `my_listing.countryCode` falls back to the home country; `set_listing_level` uses the
  location's country only — any client preview by `countryCode` disagrees with the door for an
  unplaced ad.
- P2b-c: `set_listing_level` and `resume_listing` refuse with plain `RAISE` (P0001), not
  `door_refuse`; the browser reads them by message (F1-5a's subject).
- P2b-d: the deactivated refusal is a sentence on every door that calls `assert_caller_active`.

## K2 — siblings that bypass the mechanism (reported, not touched)

- Level-name closures: `listings-page.tsx:219`, `listing-page.tsx:174`.
- Sentence matchers, not `doorCode`: `my-listing.ts:253` `actionErrorKey`, `tier-reasons.ts:54`
  `tierErrorKey`.
- Hand-made money: `product-prices-table.tsx:103`.
- Raw platform client, not the Supabase door: `my-listing.ts`, `use-admin-listing.ts`,
  `use-admin-listings.ts`.
- Other sentinel defaults beside the two the task fixes: `detailOf` / `listAdminListings`
  (`?? "fixed"`, `?? 0`, `String(l["id"])`).
- Screening's tier filter: `use-screening.ts:175`.
- Files over ~300 lines: `my-listings-page.tsx` (923), `my-listing-page.tsx` (825),
  `listing-page.tsx` (over 1000); `admin-listings.spec.ts` holds 40 tests (over 25).

Greps run: `rg "tier\b|tierUntil|levelUntil|level_perks_for|product_price_for|package_price_for|
market_settings|set_listing_level|resume_listing|admin_set_listing_tier"` across `src/`,
`supabase/migrations/`, `e2e/`, `scripts/`; `rg "number.format|Intl.NumberFormat"`; `rg "?? \"regular\""`;
test-id prefixes `LVP|PMS|PMV|ALV|PRS|MNY` (only LVP and PMS appear, in the two briefs).

## Environment

The three E2E names are set (tested by name only). The build used a lock-exact install.

Ruling 1 is needed on E1–E6 and E9–E12 (E7 and E8 are premises the plan already follows), plus the
approved file list and the Amharic file for (d). No screen code is written until then.
