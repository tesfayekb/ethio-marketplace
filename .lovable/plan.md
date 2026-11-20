# L22 reset-words — plan (no code)

Branch `lovable/reset-words`, base dev `8df5d28db` (verified HEAD = merge of #84).

## (a) Every screen that draws a rate limit, today

Words chosen in a family module (tail reaches `refusalText`, so `{when}` can be filled):
- Staff consoles, one shared key `admin.error.rateLimited` "Too many changes in the last hour. Try again later." via `RATE_LIMITED_KEY` / `ADMIN_REFUSALS` (src/lib/refusal-tail.ts:20,23,38): location-refusals.ts:22, category-refusals.ts:16, country-refusals.ts:17, ai-refusals.ts:25, attribute-refusals.ts:18, roles/users services (generic).
- monetisation-refusals.ts:74 `admin.packages.error.rateLimited` "Too many changes in a row; try again later."
- listing-refusals.ts:22 `admin.listings.move.error.rateLimited` "Too many changes in the last hour. Try again later."
- my-listing.ts:261, promote-service.ts:181 `myListings.error.rateLimited` "Too many changes in a short time. Try again in a little while."
- refusal-text.ts:45 `post.refusal.rateLimited`, :122 `post.photo.refusal.rateLimited`.
- translations-service.ts:435 maps rateLimited to `admin.translations.error.fileTooMany`; :436 `admin.translations.ai.rateLimited` (a route word, no instant).

Words chosen by a STATE that has already dropped the instant (the tail never reaches the drawing):
- ad-page: ad-page-refusals.ts:11,17,26 -> `SaveRefusal`/`ReportRefusal`/contact reason strings; drawn at l.$slug.tsx:146-166, report-ad-dialog.tsx:73-74, listing-detail.tsx:794-795,1522-1523 (`adPage.save/report/contact.rateLimited`, "... today — try again tomorrow.").
- posting: step-where.tsx:2136,2230 (`post.refusal.rateLimited` via LineState), posting-service.ts:1147-1152,1245 (pin answer string), step-specifications.tsx:1194,1207,1756 (`post.specs.rateLimited`, a boolean), map-pin-dropper.tsx:71 + geocode.ts:44 (`post.pin.geocodeRateLimited`, route reason), use-draft.ts:425 (already reads the instant as a seconds pause — has its own countdown words).
- admin-screening/use-screening.ts:364-388 (`admin.screening.revealLimited`, reason string).
- my-listings-page.tsx:389 compares the key only (no drawing).
- `auth.errorRateLimited` (src/features/auth) — Cursor's.

Not drawing: l.$slug.tsx:40 (log), listings-page.tsx:317 (loop stop), door-codes/door-error/reader-failure/refusal.ts comments and lists.

## (b) The mechanism

- `{when}` is filled in ONE place: `fillRefusal(text, tail, language?)` in src/lib/refusal.ts. One change: an optional `language`; when the text holds `{when}`, it is `relativeTime(tail, language)` (src/lib/relative-time.ts, which already uses `formatRelative`/Intl in the active language). `refusalText(read, t, values?, language?)` passes it through; callers pass `useI18n().language`.
- Fallback, in the same place: a family declares the pair, not one key. New in refusal-tail.ts: `RATE_WORDS` — `{ when: MessageKey; plain: MessageKey }` per family, and `rateText(read, t, language, words)`: an instant that parses and lies in the future -> `when` key filled; no tail, a bad instant or a past one -> the `plain` key (today's sentence, so nothing shows a raw time). `fillRefusal` alone cannot choose a key, so this one helper is the needed addition; it lives beside `RATE_LIMITED_KEY`.
- Plain keys are KEPT (they are the fallback), not retired. Only keys nothing reads afterwards retire.

## (c) Keys

New (English only; Amharic from the supervisor):
- `admin.error.rateLimitedWhen`: "Too many changes in the last hour. Try again {when}."
- `admin.packages.error.rateLimitedWhen`: "Too many changes in a row. Try again {when}."
- `admin.listings.move.error.rateLimitedWhen`: "Too many changes in the last hour. Try again {when}."
- `myListings.error.rateLimitedWhen`: "Too many changes in a short time. Try again {when}."
- `post.refusal.rateLimitedWhen`: "You have saved many times in a short while. Try again {when}."
- `post.photo.refusal.rateLimitedWhen`: "Too many photos in a short while. Try again {when}." (exact current English of the plain key read at build; wording follows it)
- (turn 2) `adPage.save.rateLimitedWhen` "You have saved many ads today. Try again {when}.", `adPage.report.rateLimitedWhen`, `adPage.contact.rateLimitedWhen`, `admin.screening.revealLimitedWhen`, `post.specs.rateLimitedWhen`.
- Guide: `admin.monetisation.level.guide.whatSpecific` "The levels an ad can have — Regular, Featured, Premium and any you add. A level sets how long an ad runs, how many photos it may carry, where it is placed and whether it wears a badge. Open a level to set its specific perks and its prices."; `admin.monetisation.level.guide.howSpecific` "... Open a row to add specific perks and prices for this level."
Retired: `admin.monetisation.level.guide.what`, `admin.monetisation.level.guide.how` (readers listed at build by `rg -n '<key>' src e2e --glob '!src/i18n/locales/**'`; guide keys may be read by prefix — the census confirms how the guide resolves `guide.what`/`guide.how` before renaming; if it reads them by fixed suffix, the change is the VALUE under a renamed key is impossible and I STOP for a ruling).
Kept: every plain rate key above (fallback). Full per-file `t("` census of each changed file is pasted in the build report.

## Part 3

legal-version-view.tsx:160 `errorText(version.error) === "unknownVersion"` -> `splitRefusal(errorText(version.error).trim()).key === "unknownVersion"`.

## (d) First download

I cannot run `bun run build` in plan mode. Known from L21-3: `door-codes`/`refusal-split` are outside first paint, and `refusal.ts` imports `door-codes`, so `refusal.ts` is too. Adding `relative-time` to `refusal.ts` is safe only if that stays true; `legal-version-view.tsx` is an admin chunk. The build turn's first step reads `dist/.chunk-modules.json` and names each changed module's chunk; any `index`/`shared-shell` module whose imports change is a STOP.

## (e) Tests

New ids RTW-1..n (free: verified at build by rg).
- refusal.test.ts: RTW-1 an instant 2 h ahead -> "in 2 hours" (en) and the Amharic Intl phrase (am); RTW-2 no tail / "not-a-time" / a past instant -> the plain key.
- refusal-tail test: RTW-3 `rateText` picks `when` vs `plain`; type of `RATE_WORDS` via `expectTypeOf`.
- each family's own test: one line each that a rateLimited:<instant> draws the When key.
- legal-version-view test: RTW-n `unknownVersion:x` is read as unknownVersion.
- admin-guides census covers the two guide keys.

## (f) e2e

- ad-page-doors.spec.ts:562-886, door-refusals.spec.ts:288-329, viewing-place:186, import-security:834, posting-routes*, photo-pipeline:445, post-wizard-*: read the CODE, not the sentence — unaffected.
- post-wizard-specs.spec.ts:401 reads `en["post.specs.rateLimited"]` with a mocked refusal that carries NO instant -> still the plain key; unaffected (turn 2 only).
- admin-monetisation.spec.ts:97,797,819: comments and a test title, no text read — unaffected.
- No spec edit needed.

## (g) Guards

String scan (new keys only), both usage maps regenerated, test-ids (RTW free), non-null (none added), admin-guides (two guide keys renamed: guide census reads them), forms guard (no form change).

## (h) Size and the split

All of Part 1 touches about 30 source files plus tests, beyond the 25 ceiling. Proposed:
- L22 (this turn): the mechanism (refusal.ts, refusal-tail.ts) + the families whose tail already reaches `refusalText` (consoles' shared key, monetisation, listings move, my-listings, posting refusal-text) + Part 2 + Part 3. About 14 source files.
- L22b: the screens that hold a state and drop the instant (ad-page three, step-where, pin, step-specifications, screening reveal). Each needs its state shape to carry the instant — a change to what services return, so it wants its own plan.

## (i) Different

- Keep the plain keys as live fallbacks instead of retiring them; retiring would leave nothing to show for a refusal with no instant (the route envelopes and the mocked e2e send none).
- `use-draft.ts` already counts down from the instant in its own words; left as it is.
- `admin.translations.ai.rateLimited` and `post.pin.geocodeRateLimited` are route words with no instant: out of scope.
- `auth.errorRateLimited` is Cursor's.
