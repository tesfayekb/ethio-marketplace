# UF-1 — component tests for the one-screen rows (public, posting, member)

Base: `lovable/next` = dev `3c9086dc0` (verified: HEAD is `3c9086dc0`). This plan changed no file but itself.

Read first: `docs/features/user-facing-list.md`; each row's words from `scripts/conformance/user-facing-manifest.txt`; each row's "must do" and defect column from `docs/governance/census/user-facing-8d64790.md` (counted by script, all 103 rows found). Test ids `UFP-` (Part 1), `UFW-` (Part 2), `UFM-` (Part 3): `rg` finds none in src, e2e or scripts (K7).

Totals: 103 rows → Lovable 98, Cursor 5 (S6d.2, S6e.4, S11.3, S11.7, S12.5). Three of the Lovable rows have an open defect (S2.5, S7s6.1, S7s6.2): their tests check only what the code does correctly now, and the rest waits for your ruling. Every test title is `<id> <what it proves> uf:<row>`.

## Part 1 — public screens (35 rows)

Feed — `src/components/marketplace/feed.tsx`, test file `src/components/marketplace/feed.test.tsx` (existing; its `use-feed`/`callRoute` and `useShell` mocks reused)
- S1.5 · feed.tsx:394 PageGuide · UFP-1 "the Guide button opens the feed's guide and names Post as its next step" · opens by role/name, guide heading from `guide` layer, next link `/post` (href only).
- S1.7 · feed.tsx:232 `feed-category-failed` · UFP-2 "a failed category lookup says so and Retry refreshes the page" · `feed.errorTitle` + FailureNotice words; Retry calls the mocked `refreshPage` once.
- S1.8 · feed.tsx:209-226 Spinner · UFP-3 "the first read in flight shows Loading listings" · `role=status` named `feed.loading`; no cards.
- S1.10 + S1.11 · feed.tsx:240 `feed-error` (use-feed.ts readPage → `routeFailure`) · UFP-4 "a 404 unknownPlace / unknownCategory answer reads as gone, with no Retry" · mocked callRoute answers 404 with each code; notice words from FailureNotice's gone row, `feed-retry` absent. One rendering per code, one test (two tokens).
- S1.12 · same · UFP-5 "a 400 badCursor/badSize/badCategory/badPlace answer shows its refused words" · each code, words read through the same reader, never copied.
- S1.14 · feed.tsx:256 `feed-step-none` · UFP-6 "a wider first band with no invitation shows Nothing here yet in your area".
- S1.19 · feed.tsx:311 `feed-more-error` / `feed-more-retry` · UFP-7 "a failed next page shows the notice and Retry reads that page again" · second callRoute called with the same cursor.
- S1.22 · feed.tsx · UFP-8 "in Amharic the feed's words are the Amharic catalogue's" · heading, loading, empty, error words equal `am` values and differ from `en`.

Ad page — `src/features/posting/preview/listing-detail.tsx`, test file `listing-detail.test.tsx` (existing); share dialog `src/features/ad-page/share-ad.test.tsx` (existing)
- S2.5 · listing-detail.tsx:797-804 `listing-save-refusal` · UFP-9 "a refused Save shows the rate words with their time, else the failed words" · **defect (partial)**: `src/routes/l.$slug.tsx:167-169` maps `listingNotAvailable` to `"failed"`, so a gone ad shows "could not be saved — try again"; Contact (listing-detail.tsx:1539) shows `failure.gone`. I test rateLimited, rateLimitedWhen, failed only; gone awaits your ruling.
- S2.8 · listing-detail.tsx:1534-1540 `listing-contact-refusal` · UFP-10 "a refused contact shows the cap, rate, gone or failed words".
- S2.12 · share-ad-dialog.tsx:131 `listing-share-status` · UFP-11 "Copy says copied, or that it could not" · clipboard mocked to resolve and to reject.
- S2.17 · listing-detail.tsx:1285-1414 (`listing-map-enlarge`, `-dialog`, `-google`, `listing-maps-app`/`-web`/`-cancel`) · UFP-12 "the map enlarges into its dialog and the maps chooser offers app, web and cancel" · hrefs asserted, Cancel closes; no navigation.
- S2.19 · listing-detail.tsx:663-694 · UFP-13 "the owner sees counts and a failed count read says so" · `adPage.counts.unavailable`.
- S2.20 · `src/routes/l.$slug.tsx`:315, :329, :197-213 · new `src/routes/ad-page-owner.test.tsx` · UFP-14 "the owner's own page has no Save or Report and shows the name-under-review notice" · route component rendered with loader data mocked.
- S2.23 · listing-detail.tsx · UFP-15 "in Amharic the ad page's words are the Amharic catalogue's" (768 half: the crawl's).

Seller page — `src/features/seller/seller-page.tsx`, test `seller-page.test.tsx` (existing; `use-seller-feed` mocked)
- S3.4 · :121 · UFP-16 "a seller with no ads shows sellerPage.empty".
- S3.5 · :67 `seller-page-not-found` · UFP-17 "a seller gone after the loader shows not found".
- S3.6 · :78 · UFP-18 "a failed read says so and Retry reads again".
- S3.7 · :126-146 · UFP-19 "the end in view loads the next page; a failed next page shows its notice" · IntersectionObserver stubbed.
- S3.8 · UFP-20 "signed in and out the page draws the same words, and in Amharic they are the catalogue's".

Legal — `legal-document-page.test.tsx`, `legal-accept-screen.test.tsx` (existing); publishing error: new `src/routes/legal-publishing-error.test.tsx`
- S4.5 · legal-document-page.tsx:55, :146 · UFP-21 "a failed page read shows This page could not be loaded with Retry".
- S4.6 · :134 `legal-public-section` · UFP-22 "each country's section draws under its own heading".
- S5.3 · legal-accept-screen.tsx:33, :107 · UFP-23 "a failed document text read says so with Retry".
- S5.5 · :160 `legal-accept-error` · UFP-24 "notInForce shows legal.accept.changed, unticks and re-reads; other refusals show legal.accept.error" · service mocked; no write reaches a server.
- S5.6 · :100-105 · UFP-25 "a failed status read offers Try again, which reads again".
- S5.10 · legal.publishing.tsx:88-100 `PublishingError` · UFP-26 "the publishing read's failure draws the page's notice and carries its class".
- S5.11 · UFP-27 "in Amharic the accept screen's words are the catalogue's".

Shell
- S6a.2 · app-header.tsx:200 `search-toggle`, `search-row`, :64-66 · new `src/components/shell/app-header.test.tsx` · UFP-28 "the search toggle opens the row; Close search and Escape close it".
- S6b.4 + S6b.5 · app-rail.tsx:680, :721, :737 `rail-categories-failed` · new `src/components/shell/app-rail.test.tsx` · UFP-29 "loading draws skeletons, an empty tree says No categories yet" · UFP-30 "a failed tree read shows the notice, never also empty, and Retry asks again".
- S6c.2 · breadcrumbs.tsx:141-279 · `breadcrumbs.test.tsx` (existing) · UFP-31 "the trail is named Breadcrumb with Home first for ad, auth, account and admin pages".
- S6c.4 · location-selector.tsx:288 `location-error`, `location.empty` · new `src/components/shell/location-selector.test.tsx` · UFP-32 "a failed area read says so and Retry asks the failed read; none says empty".
- S6d.2 · app-shell.tsx:1037-1048 · **Cursor**: needs a real session ending.
- S6e.4 · app-footer.tsx:9-11, :94 · **Cursor**: goes to /terms and /privacy.

## Part 2 — the posting form (45 rows)

Mocks: `./posting-service` (as `step-who.test.tsx` does), `@/i18n` provider with real catalogues, `@/lib/on-demand-failure`. Each step rendered alone with its props; the wizard frame with `use-draft` mocked.

Frame — `src/features/posting/wizard.tsx`, new `src/features/posting/wizard-frame.test.tsx`
- S7.2 · :871 · UFW-1 "the form opening shows Opening the form…".
- S7.7 · :1171 · UFW-2 "a held draft dial shows Saving paused for {seconds} s with the seconds filled".
- S7.8 · :1162 `post-edit-problem` · UFW-3 "an edit's problem draws its words".
- S7.15 · submit refusals · UFW-4 "notYourListing / notADraft / listingNotFound from submit show refusal-text's words".
- S7.17 · UFW-5 "in Amharic the frame's words are the catalogue's".

Step 1 `step-category.tsx` → `step-category-retry.test.tsx` (existing)
- S7s1.9 · :240 `post-category-error` · UFW-6 "a failed tree read shows The categories could not be loaded, with Retry".
- S7s1.10 · refusal-text.ts:47 · UFW-7 "categoryNotPostable at Next shows its words".
- S7s1.12 · UFW-8 Amharic.

Step 2 `step-photos.tsx` → `step-photos.test.tsx` (existing)
- S7s2.5 · :713 `post-photo-row-refusal` · UFW-9 "each row refusal code shows its own words" · every code in the row, words via `photoRefusalKey`/`draftRefusalKey`.
- S7s2.14 · :975 · UFW-10 "a failed photos-soon save says so".
- S7s2.16 · UFW-11 Amharic.

Step 3 `step-specifications.tsx` → new `step-specifications-states.test.tsx`
- S7s3.1 · :1195 · UFW-12 "no category asks for one first".
- S7s3.2 · :1205, :1221 `post-specs-error` · UFW-13 "a failed schema read says so (or the dial's time) and Retry reads again".
- S7s3.9 · :1715 · UFW-14 "a dependent field says Choose {parent} first, and none-for-parent".
- S7s3.10 · :1689-1759 · UFW-15 "model values: set by model, from model, and Use model's value fills it".
- S7s3.12 · :1769-1793 · UFW-16 "Help and More show the field's help".
- S7s3.16 · UFW-17 Amharic.

Step 4 `step-pricing.tsx` → `step-pricing.test.tsx` (existing)
- S7s4.2 · :442 · UFW-18 "a priceless category says so".
- S7s4.3 · :446 `post-price-mode-refusal` · UFW-19 "a mode refusal shows its words".
- S7s4.5 · :466 `post-price-currency-error` · UFW-20 "a failed currency list says so with Retry".
- S7s4.10 · UFW-21 "the price door refusals show their field words at Next".
- S7s4.11 · UFW-22 Amharic.

Step 5 `step-details.tsx` → `step-details-assist.test.tsx` (existing)
- S7s5.3 · judgeContact :226/:319/:355 · UFW-23 "a phone typed into the text warns Leave phone numbers out".
- S7s5.7 · :467 `post-assist-refusal` · UFW-24 "budget, featureOff, providerUnavailable and rate refusals show their words".
- S7s5.8 · button :429 (`spent`) · UFW-25 "after featureOff the assist button is disabled and stays so after a remount" — the ruled D19 behaviour (10b part 2); the census's "drawn until a press" is the design, not pinned as a defect.
- S7s5.9 · UFW-26 Amharic.

Step 6 `step-where.tsx` → `step-where.test.tsx` (existing); pin: `map/map-pin-dropper-offline.test.tsx` (existing)
- S7s6.1 · :725-744, :1574, :1622 · UFW-27 "market label, loading, failed and unresolved words".
- S7s6.2 · :1627-1631 · UFW-28 "tree loading and failed words".
- S7s6.1, S7s6.2 · **defect**: census D18-kind "no Retry" — at :1574 and :1631 the market and tree failures are plain text with no Retry still. UFW-27/28 assert words only; Retry awaits your ruling. Neither has a data-testid (C9).
- S7s6.4 · :453, :581 · UFW-29 "no regions, and All of".
- S7s6.10 · map-pin-dropper.tsx:490 `post-pin-outside`, `post-pin-error`, step-where.tsx:49 `MapFailedHere` · UFW-30.
- S7s6.11 · refusal-text.ts:111-115 · UFW-31 "badLatitude/badLongitude/badPrecision/badZoom/directionsTooLong show their words".
- S7s6.12 · UFW-32 Amharic.

Step 7 `step-who.tsx` → `step-who.test.tsx` (existing)
- S7s7.1 · :701 `post-who-read-failed` · UFW-33 "a failed identity read says so, carries its class, Retry reads again".
- S7s7.3 · :724-754 · UFW-34 "person/business choice and its refusal".
- S7s7.6 · :860-949 · UFW-35 "alias checking, available and suggestions" (alias check mocked).
- S7s7.7 · :920-935 · UFW-36 "the alias change rule words".
- S7s7.10 · :1019, :1091 · UFW-37 "a failed phone library says so and offers Refresh page".
- S7s7.11 · :1034 · UFW-38 "carried contact from the last post".
- S7s7.12 · validate.ts:68 · UFW-39 "messages off shows messagesRequired".
- S7s7.13 · UFW-40 Amharic.

Step 8 `step-review.tsx` → `step-review.test.tsx` (existing)
- S7s8.2 · :604 `post-review-identity-error` · UFW-41.
- S7s8.4 · :754-802 · UFW-42 "the take-down switch sets an end date".
- S7s8.7 · :853 `post-review-refusal`, `post-review-fix` · UFW-43 "each refusal shows its words and Fix calls onGoTo with its step".
- S7s8.8 · :842 `post-review-failed` · UFW-44.
- S7s8.11 · UFW-45 Amharic.

## Part 3 — member pages (23 rows)

Mocks: `my-listings` services (`my-listings.ts`, `my-listing.ts`), `account` reads, `legal-service`; `useSession` from the auth seam mocked (no file under src/features/auth touched).

- S8.4 · my-listings-page.tsx:737, :756 · new `src/features/my-listings/my-listings-page.test.tsx` · UFM-1 "loading, then No listings here yet".
- S8.5 · :743-755 `my-listings-error` · UFM-2 "a failed read says so, carries its class, Retry refetches".
- S8.9 · my-listing.ts:268-300 · UFM-3 "each seller-door refusal code shows its words" (actions mocked to refuse).
- S8.10 · DataTable keyset · UFM-4 "Next and Previous page with the cursor".
- S8.11 · UFM-5 Amharic.
- S9.2 · my-listing-page.tsx:361-385 · new `my-listing-page.test.tsx` · UFM-6 "loading, error with Retry, not found".
- S9.11 · :671 `my-listing-identity-error` · UFM-7.
- S9.13 · UFM-8 Amharic.
- S10.3 · my-listing.ts:274-297 · `my-listing-words.test.ts` (existing) · UFM-9 "every edit_my_listing code has its words" (D25 now fixed: each code has a line).
- S11.1 · account-overview.tsx:141 `account-overview-failed` · new `account-overview.test.tsx` · UFM-10 (D26 fixed: Retry present).
- S11.3 · **Cursor**: Edit profile goes to /settings.
- S11.5 · :242-257 · UFM-11 "saved and notifications cards with their empty words".
- S11.7 · **Cursor**: quick actions go to other pages.
- S11.8 · seller-review-notice.tsx · new `seller-review-notice.test.tsx` · UFM-12 "shows the review state's words".
- S11.9 · UFM-13 Amharic.
- S12.1 · saved-page.tsx:96-101 · new `saved-page.test.tsx` · UFM-14.
- S12.5 · **Cursor**: Remove changes data the server holds.
- S12.6 · :159 · UFM-15 "Show more reads the next page".
- S12.8 · UFM-16 Amharic.
- S13.1 · my-legal-page.tsx:50-54 · new `my-legal-page.test.tsx` · UFM-17.
- S13.5 · UFM-18 Amharic.
- S14.3 · my-legal-version.tsx:46-50 · new `my-legal-version.test.tsx` · UFM-19.
- S14.5 · UFM-20 Amharic.

Cursor rows (5): S6d.2, S6e.4, S11.3, S11.7, S12.5. S1.5 and S2.17 stay Lovable: their tests check where the links point but never follow them. If you rule them as crossing pages, they go to Cursor.
Defects (named, not pinned): S2.5 (save `listingNotAvailable`), S7s6.1 and S7s6.2 (no Retry), and no data-testid on the step-where market/tree failure lines and the feed's first Spinner (I locate them by role).

## How the services are mocked
Each test `vi.mock`s the feature's own service module (feed: `@/lib/route-client` `callRoute`; ad page: `save.ts`/`contact.ts`; seller: `use-seller-feed`; legal: `legal-service`; posting: `posting-service`, `use-draft`; member: `my-listings.ts`, `my-listing.ts`, account and legal reads). Refusals are returned as the service's own typed answers or `ReaderError`s, so the words come through the screen's reader. Amharic tests render through the provider with `language: "am"` as in `error-reports-page.test.tsx` and compare to the `am` catalogue.

## Strings
No new strings.

## Files I would touch
Existing tests: feed.test.tsx, listing-detail.test.tsx, share-ad.test.tsx, seller-page.test.tsx, legal-document-page.test.tsx, legal-accept-screen.test.tsx, breadcrumbs.test.tsx, step-category-retry.test.tsx, step-photos.test.tsx, step-pricing.test.tsx, step-details-assist.test.tsx, step-where.test.tsx, map-pin-dropper-offline.test.tsx, step-who.test.tsx, step-review.test.tsx, my-listing-words.test.ts.
New tests: src/routes/ad-page-owner.test.tsx, src/routes/legal-publishing-error.test.tsx, src/components/shell/app-header.test.tsx, app-rail.test.tsx, location-selector.test.tsx, src/features/posting/wizard-frame.test.tsx, step-specifications-states.test.tsx, src/features/my-listings/my-listings-page.test.tsx, my-listing-page.test.tsx, src/features/account/account-overview.test.tsx, saved-page.test.tsx, src/features/seller/seller-review-notice.test.tsx, src/features/legal/my-legal-page.test.tsx, my-legal-version.test.tsx.
scripts/conformance/user-facing-allowlist.txt: removal of exactly the answered rows' lines, per part.
New files under src/ mean both i18n usage maps are regenerated (not committed).

## Build order
Part 1, Part 2, Part 3, one commit each, A6 checks after each part, write-back last. No app code.
