# L22b — every rate-limit sentence says WHEN, plus the two Guide lines (PLAN)

Branch `lovable/reset-words-b` · base commit `96b53abfe` (read at HEAD = `96b53abfe`, tree clean vs base).

## (a) Families — where the tail is lost, the change, callers
| Family | Loses tail at | Change | Callers |
|---|---|---|---|
| Monetisation | `use-monetisation-error.ts:36` stores `{key: read.key}` | family gets `when: { rateLimited: "admin.packages.error.rateLimitedWhen" }`; hook stores the `read` and draws `refusalText(read, t, undefined, language)` | product-editor, price-dialog, price-end-dialog, override-dialog, market-dialog, monetisation-dialogs (read `refusal.key` — census at build; each switches to the drawn text) |
| Listings move | `move-reasons.ts:60` returns `.key` | new `moveRefusalText(refusal, t, language)` beside the key reader; `when` → `admin.listings.move.error.rateLimitedWhen` | listing-photos.tsx + move dialog (census at build) |
| My listings | `my-listing.ts:284` `actionErrorKey` returns `.key` | `SELLER_DOOR_REFUSALS.when` → `myListings.error.rateLimitedWhen`; `actionErrorText` returns the filled sentence; key reader kept for testid/state | my-listings-page, promote-sheet.tsx:165 |
| Posting | `refusal-text.ts:171` (`draftRefusalKey`), `:185` (`photoRefusalKey`) | `DRAFT_REFUSALS.when` → `post.refusal.rateLimitedWhen`, `PHOTO_REFUSALS.when` → `post.photo.refusal.rateLimitedWhen`; text readers beside key readers; `isRateRefusal` (`:180`) unchanged | wizard, step-who/where/specifications/review/pricing/photos/details (seven steps read the key) ; posting-service pin answer |
| Ad page | `ad-page-refusals.ts:59/69/85` collapse to the literal `"rateLimited"` | return the read's instant alongside (`{ kind, until }`); three new `when` keys (save/report/contact) | save.ts, report.ts, contact.ts, l.$slug.tsx, report-ad-dialog.tsx, listing-detail.tsx |
| Screening reveal | `use-screening.ts:387-388` returns `reason: "rateLimited"` only | result carries `until`; `revealProblemText` fills `admin.screening.revealLimitedWhen` | screening-page.tsx, photo-reviews.tsx |

A refusal with no instant, or a past/unparseable one, draws today's plain sentence (mechanism already does this).

## (b) Keys
Add (English; Amharic from the supervisor):
- `admin.packages.error.rateLimitedWhen` — "Too many changes in the last hour. Try again {when}." (supervisor holds AM)
- `admin.listings.move.error.rateLimitedWhen` — same wording as its plain key + "Try again {when}." (AM held)
- `myListings.error.rateLimitedWhen` (AM held)
- `post.refusal.rateLimitedWhen` (AM held)
- `post.photo.refusal.rateLimitedWhen` (AM held)
- `adPage.save.rateLimitedWhen`, `adPage.report.rateLimitedWhen`, `adPage.contact.rateLimitedWhen`, `admin.screening.revealLimitedWhen` — NEW, need English ruled + Amharic (exact English proposed in the build turn's first step from each plain key's text with "{when}" replacing "tomorrow/later").
Keep every plain key (fallback). Retire none. Key census (`rg -n 't\("'` per changed file) is pasted at build start; every other drawn key is kept.

## Part 2 — Guide lines (options)
- A. New prefix `admin.monetisation.levels.guide.*`: move the whole `level` guide block (what, how, next + 20 col keys = 23 keys × 2 locales); 21 unchanged keys keep Amharic byte for byte, `what` and `how` new values need new Amharic; old 23 retired; admin-guides census and the block spec's `prefix` change. Cost: 23 adds, 23 retires.
- B. (recommended) `block-guide-sheet.tsx` spec gains optional `keys?: { what?, how? }` override read before the suffix rule; two new keys `admin.monetisation.level.guide.whatSpecific`, `...howSpecific` (English: lines 34/60 with "specific perks"), two retired. Cost: 2 adds, 2 retires, but it touches the shared guide sheet (shell) and needs CF-GUIDE-1 to accept the override — may need a scripts change, which is Cursor's; if so, A.

## (c) First download
Not run in plan mode (build writes `dist/`). First build step: `bun run build`, read `dist/.chunk-modules.json`, name each changed module's chunk; any `index`/`shared-shell` module whose imports change → STOP. Risk: `l.$slug.tsx`, `listing-detail.tsx`, `ad-page-refusals.ts` (public page) — `refusalText` must not add `refusal-tail` or admin keys there; ad-page `when` keys live in base layer.

## (d) Tests
One per family (RTW-11 … RTW-17, ids checked free with `rg`): future instant draws the `when` sentence with the relative time; no instant draws the plain sentence. Result shapes (`until` field) proven with `expectTypeOf`.

## (e) e2e
Hits read codes/reasons only (`ad-page-doors` 562/771-886 `saveRefusal/reportRefusal(...) toBe("rateLimited")`; `post-wizard-specs:399` `data-reason="rateLimited"`; door-refusals, posting-routes*, import-security, viewing-place, fixtures). None reads sentence text. Breakage: `ad-page-doors` 773/779/880/886 if `saveRefusal`/`reportRefusal` change return shape — so keep those functions' return value and add a separate `rateUntil` reader. No spec edit needed. `per-category` hits are comments/test titles, unaffected.

## (f) Guards
String scan; strings-layers (ad-page + posting keys → base/member layer files, admin ones → admin layer); usage maps regenerated (new keys; no file moves expected); test-ids; non-null; admin-guides (Part 2); forms guard; refusal-readers census (new text readers go through `readRefusal`).

## (g) Count and split
About 35 source files. Proposed split:
- L22b (this): monetisation, listings move, my listings, screening reveal, Part 2 (~18 files).
- L22c: posting + ad page (member/public, ~17 files, needs the four unheld Amharic texts and first-download check on public chunks).

## (h) Differently
- Ad page: keep the code-returning readers (e2e contracts) and add an instant reader beside, rather than changing their return.
- Part 2: prefer B only if the guide census accepts it without a scripts change; otherwise A.

## Not changed
No door, query, permission, database call, testid, scripts/, src/integrations/, src/features/auth/, src/server/, src/routes/api/. use-draft.ts, translations AI route words, geocode words, auth.errorRateLimited out of scope.
