# Bundle 16 — turn 3c: a sold ad in the feed for 30 days, and the ribbons: brief, version 1 (saved unchanged, 2026-10-15)

```text
BUNDLE 16 — TURN 3c (2026-10-15). ONE TURN, ONE MIGRATION, STRINGS, TEST EDITS AND NEW TESTS WRITTEN BY YOU. No package change.
Base: dev 86c2d6e8 (turn 3b). The census below proves every file and the database by content. This file is public: it is written as build instructions.
Tier A: the migration (the feed index's refresh, check, triggers, queue and daily sweep, `feed_page`, the three public reads and one column grant). Tier B: the card, the pages, the E2E tests. Tier C: the strings, the docs, the plan file, the roadmap and the changelog.

ANSWERS TO THE LAST TURN
- Turn 3b is verified on dev 86c2d6e8: the 14 table paths, the brief (5893f9d9…), your two test files (0e587b6e… and 5d3ced8c…) and the migration (the brief's text with mark 20261015130000) are as written; the read-back matches. The staging apply is done (CI's preflight passed on 86c2d6e8). Thank you.
- The operator walked turns 2–3b on the published site. Lines 1, 5, 6, 7 and 8 passed. His findings become this turn's ribbons and visibility line (D180) and a later rethink of the page (D181, not this turn).

WHY THIS TURN
- D175 1 (the operator, 2026-10-14): a sold (rented, filled) ad stays in the feed for 30 days with its ribbon, its contact closed, then leaves. Today it leaves the feed the moment it is sold.
- D173: the Reserved, Sold and Price reduced marks on the feed card.
- D180 (the operator's walk of turns 2–3b, 2026-10-14): "I don't see ribbons. All these should have ribbons, probably using our second color of the site"; for a closed ad, "still needs ribbon, and also a message it's not live for the seller". The site's second colour is the gold (`bg-gold`, `text-gold-foreground`).

WHAT THIS TURN BUILDS
- The migration (the appendix). THE RULE, in one place for every reader: an ad is shown to buyers while it is live (active), and a sold one for 30 days after `sold_at`. Contact stays closed on a sold ad (`reveal_listing_contact` answers only a live ad; not changed).
  A. `feed_index_refresh`, redeclared whole from 20261009052418: a sold ad keeps its rows for its 30 days with rank -1, so a page reads it after every live ad of its place, the newest first among the sold.
  B. `feed_index_check`, redeclared whole from 20261009052418: the same rule; a new count `sold_shown`.
  C. `feed_index_on_listing_insert` and `feed_index_on_listing_update`, redeclared whole from 20261009052418: a sale, a relist and a deletion of a sold ad rewrite its rows.
  D. `feed_reindex_enqueue_categories` and `feed_reindex_enqueue_places`, redeclared whole from 20261009052418: a moved category or place queues the sold ads under it too.
  E. `feed_index_check_sweep`, redeclared whole from 20261009052418 (the daily feed-index-check job): first the rows of a sold ad whose 30 days are over go; its answer gains `sold_left_feed`. No new job: `feed_page` leaves such an ad out the moment its 30 days end.
  F. `feed_page`, redeclared whole from 20261014022725: live ads and sold ones for 30 days; the widening counts live ads only; each card gains `soldWord` (sold, rented or filled; null for a live ad), `reserved` and `priceWas` (the old price while "Price reduced" stands, 14 days) — the same texts as `my_listings`' row (proof P4).
  G. The public reads (`listings_public_read`, `listing_photos_public_read`, `listing_locations_public_read`) show a sold ad for its 30 days, so its cover keeps its link; buyers may read `sold_at` (a column grant), which the photo and place reads need.
  P. Proofs: the headers and privileges; each redeclared body equal to its earlier body beyond the named changes (carriage returns removed first); the card's texts equal to `my_listings`'; the three policies and the column grant; the triggers in place. No proof creates or reads a listing.
- The carrier:
  - the ribbon (src/components/marketplace/listing-picture.tsx): `ListingRibbon`, one word on a gold band across the picture's lower corner (the photos-soon band's corner and angle); `ListingPicture` takes `ribbon` (null by default — no other screen changes) and the ribbon replaces the photos-soon band;
  - the ribbon's words (src/features/feed/feed-page.ts): `FEED_SOLD_WORDS`, `SOLD_RIBBON`, `ribbonOf` — the most important first: Sold (Rented, Filled) alone; else No longer available (the seller's own views only), Reserved, Price reduced; the card's answer reads `soldWord`, `reserved`, `priceWas` (an answer without them reads as a live ad with no mark — a page cached from before);
  - the feed card (src/components/marketplace/listing-card.tsx): the ribbon (`ribbonOf`'s first word) and, while "Price reduced" stands on a live ad, the old price struck through before the price (`listing-card-price-was`; a screen reader hears "Was <price>");
  - the ad's page in My listings (src/features/my-listings/my-listing-page.tsx): the marks as gold tags (`my-listing-sold-mark`, `my-listing-closed-mark`, `my-listing-reserved`, `my-listing-price-reduced`); the ribbon on the picture of "as buyers see it" (`ListingDetail` and `PhotoGallery` take `ribbon`, null by default); the line `my-listing-visibility` (`data-visible`: seen, soldSeen or hidden) from `visibilityOf` (src/features/my-listings/state-line.ts);
  - the list (src/features/my-listings/my-listings-page.tsx): the rows' marks as gold tags, with `my-listing-<id>-sold-mark` and `my-listing-<id>-closed-mark` beside the Reserved and Price reduced tags (no Price reduced on a sold ad);
  - the comments that said "an active listing's photos" (src/routes/api/media/photo-links.ts, src/server/media/links.ts, src/features/feed/use-card-photos.ts);
  - the unit tests FP-12, FP-13, LC-4, LC-5, ML-U11 (the cards' fixtures gain the three fields);
  - the strings (below), the docs (my-listings, feed-engine), the public-surface allowlist's `listings` and `feed_page` lines, the plan file docs/governance/plans/ahead-of-jiji.md (D179, NEW), the changelog and the roadmap.
- The usage maps (docs/generated/i18n-usage.json, public/i18n-usage.json) are regenerated by you with `bun run i18n:usage`; the hashes below say what they must be.
- THE TESTS (below): you edit FR-6 and FE-13 where this turn changes what they see, and write FR-9…FR-11, FE-15, FS-15 and MLA-11.

THE STRINGS (English / Amharic; the supervisor's, read before they ship — G43; they travel in the carrier). New, 10:
  - `feed.ribbon.sold`: "Sold" / «የተሸጠ»
  - `feed.ribbon.rented`: "Rented" / «የተከራየ»
  - `feed.ribbon.filled`: "Filled" / «የተሞላ»
  - `feed.ribbon.closed`: "No longer available" / «ከእንግዲህ አይገኝም»
  - `feed.reserved`: "Reserved" / «ተይዟል»
  - `feed.priceReduced`: "Price reduced" / «ዋጋው ቀንሷል»
  - `feed.priceWas`: "Was {price}" / «የቀድሞ ዋጋ፦ {price}»
  - `myListings.ad.seen`: "Buyers can see this ad." / «ገዢዎች ይህን ማስታወቂያ ያዩታል።»
  - `myListings.ad.hidden`: "Buyers can't see this ad right now." / «ገዢዎች አሁን ይህን ማስታወቂያ አያዩትም።»
  - `myListings.ad.soldSeen`: "Buyers see it marked {word} for 30 days, and can't contact you." / «ገዢዎች ለ30 ቀናት {word} የሚል ምልክት ይዞ ያዩታል፤ ሊያገኙዎት አይችሉም።»

DECIDED BY THE OPERATOR (2026-10-14)
- D175 1 and D173 as written; D180: the marks are ribbons in the site's second colour, and the seller is told when his ad is not live.

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- In a place's feed a sold ad comes after every live ad (whatever its tier), the newest sale first among them; it never counts toward the feed's widening.
- One ribbon per picture, the most important word first (Sold, Rented or Filled; No longer available; Reserved; Price reduced); every mark is a gold tag in My listings; no Price reduced on a sold ad.
- The ad page's line: live → "Buyers can see this ad."; sold within its 30 days → "Buyers see it marked <word> for 30 days, and can't contact you."; any other state → "Buyers can't see this ad right now." A reduced ad reads as live (reach is staff's lever and is not shown).
- No new scheduled job: `feed_page` and the public reads drop a sold ad the moment its 30 days end; the daily feed check removes its rows.

THE TESTS — you edit and write them this turn, from the descriptions below (Tier B). The supervisor ran the migration's behaviour on its local stand-in; your tests prove the feed, the reads, the card and the page on ethio-staging.
General rules (each applies to every test):
- Each new test goes in its file's own `test.describe`, after the file's last test, titled exactly as below; reuse the file's own helpers (named below). At most two leased accounts per test (DEC-174).
- Every listing, category, place and photo row is a scratch row the test seeds through the service client and removes (J3, G27); no real row is changed; every row is found by its own id (G28). A scratch leaf's capabilities are changed only on the test's own leaf and set back to [] in `finally`. No test writes `listing_policy`.
- A listing is made sold by the service client's update `{ status: "sold" }` (the database stamps `sold_at`); its 30 days are moved by updating `sold_at` alone.
- A price drop is seeded in TWO service updates: first the price (`price_mode` "fixed", `price_amount`, `price_currency` "ETB"), then `{ price_was, price_drop_at }` alone — an update that touches a price column rewrites the two marks.
- Words are asserted from en.ts (`en["…"]`), with `{word}` and `{price}` filled as the page fills them.
- G38: no assertion loosened, no timeout raised, no retry added, no dial raised.

THE EDITS (nothing else in these tests changes):
- FR-6 (e2e/feed-route.spec.ts): the exact key list gains "soldWord", "reserved" and "priceWas".
- FE-13 (e2e/feed-index.spec.ts): the sweep's key list gains "sold_left_feed".

FR-9 "FR-9 a sold ad stays in the feed for 30 days after it sold, after the live ads (D175 1)" (e2e/feed-route.spec.ts; `seedPage`, `addListing`, `getFeed`)
- In the seed's city: A regular 10 minutes ago, B regular 20 minutes ago, S premium 5 minutes ago. Mark S sold. `getFeed` (the seed's leaf, the city): the step-1 cards' ids are exactly [A, B, S]; S's card has soldWord "sold", reserved false, priceWas null; A's card has soldWord null.
- Move S's `sold_at` to 31 days ago: S is not among the cards, and the service client reads no `feed_index` row for S. Move it back to now: S is again the last step-1 card.

FR-10 "FR-10 the card carries Reserved, the old price while Price reduced stands, and its category's sold word (D173)" (e2e/feed-route.spec.ts)
- In the seed's city: A live. Set A's `reserved_at` to now: A's card has reserved true. Seed a drop (price 900, then price_was 1000 and price_drop_at one day ago): priceWas 1000. Move price_drop_at to 15 days ago: priceWas null, reserved still true.
- Give the seed's own leaf the capabilities ["rented"]; B live there; mark B sold: B's card has soldWord "rented". Capabilities back to [] in `finally`.

FR-11 "FR-11 a buyer reads a sold ad's row, photo and places for its 30 days only (D175 1)" (e2e/feed-route.spec.ts; the anonymous client as FR-8 builds it)
- S live in the seed's city, with an extra place (a `listing_locations` row for the seed's second city) and one photo row inserted as e2e/admin-screening.spec.ts inserts one (storage_path `e2e-fr/<random>.webp`, display_order 0, exif_stripped true, unscreened false).
- The anonymous client reads S's listing row (`id, sold_at`), its photo row and its place row: one each, no error. Mark S sold: one each, no error. Move `sold_at` to 31 days ago: none of the three, no error.

FE-15 "FE-15 a sold ad keeps its rows for 30 days at rank -1; a relist or a deletion takes them away; the check counts it" (e2e/feed-index.spec.ts; `seedIndexedListing`, `setListing`, `rowsOf`, `check`, `expectedSets`, `pairs`, `pairsOf`)
- `setListing(status "sold")`: the rows' pairs equal `pairs(categories, places)` and every rank is -1; `check(listingId)`: sold_shown 1, active_without_rows 0, listings_with_wrong_rows 0, rows_for_inactive 0.
- `sold_at` 31 days ago: no rows. `sold_at` now: the same pairs at -1 again.
- status "screening": no rows; status "active": rank 0; status "sold": rank -1; status "removed": no rows.

FS-15 "FS-15 the card's ribbon and the old price (D173, D175 1, D180)" (e2e/feed-screens.spec.ts; `seller`, `branch`, `chain`, `addListing`, `cardIds`)
- On the branch's leaf in the chain's city: N plain, R with `reserved_at` now, P with a drop (price 900, then price_was 1000 and price_drop_at one day ago), S sold. Open `/c/<leaf slug>` as FS-1 does and wait for the four cards; S's card is the last.
- R's card: `listing-ribbon-text` reads en["feed.reserved"]. P's card: `listing-ribbon-text` reads en["feed.priceReduced"]; its `listing-card-price-was` holds an `s` element with text and a screen-reader text that starts with "Was ". S's card: `listing-ribbon-text` reads en["feed.ribbon.sold"] and it has no `listing-card-price-was`. N's card has no `listing-ribbon`.

MLA-11 "MLA-11 the ad's page says what buyers see; its marks and its picture's ribbon (D180)" (e2e/my-listings-ad.spec.ts; `scratchSeller`, `seed`, `openAd`, `twin`, the reaping)
- One seller; X live. Open /my-listings/<X>: `my-listing-visibility` has `data-visible` "seen" and reads en["myListings.ad.seen"]; `my-listing-as-seen` holds no `listing-ribbon`.
- Mark as reserved: `my-listing-reserved` is there and `my-listing-as-seen`'s `listing-ribbon-text` reads en["feed.reserved"].
- No longer available: `data-visible` "hidden", en["myListings.ad.hidden"]; `my-listing-closed-mark` and the ribbon read en["feed.ribbon.closed"]; on /my-listings, Closed group, X's row has `my-listing-<X>-closed-mark`.
- Reopen, then Mark as sold (Yes): `data-visible` "soldSeen", the line reads en["myListings.ad.soldSeen"] with {word} = en["feed.ribbon.sold"]; `my-listing-sold-mark` and the ribbon read en["feed.ribbon.sold"]; on /my-listings, Sold group, X's row has `my-listing-<X>-sold-mark`.

After writing them: `node_modules/.bin/prettier --write e2e/feed-route.spec.ts e2e/feed-index.spec.ts e2e/feed-screens.spec.ts e2e/my-listings-ad.spec.ts`. No other test is edited.

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, dev 86c2d6e8 with this turn's carrier files)
- Clean: typecheck (it covers e2e/), format, lint (0 errors, 33 warnings), 867 unit tests (151 files), the usage maps regenerated (they match), the hardcoded-strings guard (0 findings).
- The migration on a local PostgreSQL 16 over stand-in tables holding the live feed engine (20261009032615, 20261009052418, 20261014022725) and turns 1–3b, with ethio-prod's column grants for buyers: applied cleanly, its proofs passed, with LF and with CRLF line endings. Behaviour: live ads first and the sold ones after them, a premium sold ad included, across two pages; the sold, rented, Reserved and old-price fields; an ad sold 40 days ago absent; the rows at rank -1; the check clean with sold_shown; the 30 days ending under standing rows — the feed leaves the ad out at once, the check counts its rows, the daily sweep removes them (sold_left_feed 1); a relist and a deletion take the rows away; three live and five sold ads in a city still widen; a moved category queues a sold ad; an anonymous reader sees a sold ad's row and photo for its 30 days only. The same script fails on the earlier state. Four tampered copies were each refused by their proof: a feed_page body changed beyond the named changes (P3), a refresh body changed (P3), a place read without the rule (P5), the column grant left out (P5).
- `scripts/check-migrations.sh` with this migration as 20261015170000_b16t3c-check.sql: "Migration guard OK".
- The 10 Amharic strings were checked by script: NFC, Ethiopic letters and punctuation only, the placeholders equal to the English.
- Not run by the supervisor: the browser tests (its sandbox cannot reach ethio-staging). CI on the final commit runs them.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-16-turn-3c.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines. Whatever it shows, go on: the CI read is the supervisor's, and a fix it needs comes in the next turn. Do not stop on it. You cannot git-fetch that branch. Paste `git rev-parse HEAD`: this is <START>;
  2. step 0;
  3. the census (below), files and database. If any result differs from what it expects, STOP and report: write nothing else. One exception, known in advance: if the platform has regenerated src/integrations/supabase/types.ts or src/routeTree.gen.ts since turn 3b, name the difference and go on;
  4. the carrier, then `bun run i18n:usage`, then the hashes;
  5. THE TESTS (the edits, then the new tests);
  6. the checks;
  7. the migration LAST, then its read-back;
  8. the report;
  9. END THE TURN.
  Do not stop between steps.
- The migration is the last thing written, because the database tool applies it on ethio-prod the moment it is saved. The operator will see the "Modify Supabase database" dialog and allow it. The published site keeps working: the feed's door keeps its arguments and gains three keys per card, which the published client ignores until the next Publish.
- The carrier's sections end with a newline each, blank lines included: write every section's bytes exactly as they stand between its header line and the next header. Check each written file's sha256 against the table before you go on.
- This turn changes no column type and no door's arguments: src/integrations/supabase/types.ts stays as it is. If the platform regenerates it after the migration, compare it with the census's hash; if it differs, keep the census's file and name the difference in the report.
- If any rule of yours conflicts with the text, STOP before saving and quote that rule's exact words in the report.
- Scope — these files only: the 24 paths of the hash table (the carrier's files and the two usage maps), the brief, e2e/feed-route.spec.ts, e2e/feed-index.spec.ts, e2e/feed-screens.spec.ts, e2e/my-listings-ad.spec.ts and the one new migration file (the database tool names it). The database: ethio-prod through your tools — SELECT only, except the migration itself. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-16-turn-3c.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 21 files → each equal to:
  0c9996516a38044c3bfd684b6604ccd5b4c10429ea33bfd5edd9a96e3d3452b8  docs/_changelog.md
  79d5116652bd3213cf675e580b314756451bd09f90d57ec0721de4ca951abdb4  docs/features/feed-engine.md
  4558abe34e1d8ff0f0b937451ef2125c1ae8da3d54000badb5f95c64b24e339d  docs/features/my-listings.md
  2f5e62886095ac3595c9702d4a7d83979c69ee647086a0a5b5b03aa4805807eb  roadmap.md
  7744a4356e594dd45e00d1609c9dcc6f03d54fdfccea9a5780554a31b280183e  scripts/public-surface-allowlist.txt
  f1bce844e0a759b66112959f352ba8cb5d908e55b474668ad625b81a486d3729  src/components/marketplace/listing-card.test.tsx
  14dbd1b62bfe797b3a927450244c0f221b30e0e82f6c2b838fed5ca69d68b6f5  src/components/marketplace/listing-card.tsx
  15d51f2c6d50301719e576bbc67b6e067ead5ed5456e81420d97c3f0cff1117a  src/components/marketplace/listing-picture.tsx
  0d5e6f4e2c593f0d9592b935512aa111e9638b3614a955c2e1346d154aa93b76  src/features/feed/feed-page.test.ts
  da374bc1bdd43bfb307b0cfdf36c6ff04018da3fff17eb7a96881479f1083da4  src/features/feed/feed-page.ts
  3a66bead0a7e71de26232c5e7b5fe5e33173a938abb2d5d0097aaece65d1a509  src/features/feed/use-card-photos.ts
  77d253c34eab95a43f22b82be0b60227fbf62ea40fdf80e27156fd85c892d2be  src/features/my-listings/my-listing-page.tsx
  4a7ce0cfb836618bbac2b7a2b08e891d7a2b01e07afa4b5a1c8f870d2ef65b81  src/features/my-listings/my-listings-page.tsx
  91fb19061d0059cd99bbe4230817dce32eb8f4e2fe9c25eb7fe0b49fbd4dd31d  src/features/my-listings/my-listings.test.ts
  2115a58669bec11291149bcfb88f98a9b1fe1e34a48dbb3e298ac1b46b472360  src/features/my-listings/state-line.ts
  b6f2d4b3d6f5567f85f2f6e977d3a4a05db495aab41ca36048cc9394bc9ab333  src/features/posting/preview/listing-detail.tsx
  a87c47e9c54432473361b687344e4e05d0555cb68ab83247550cc38c3eaee05d  src/features/posting/preview/photo-gallery.tsx
  6c7dbc0dd57aea9e5993aa2d8acf4a3ddfb973e0ef8539035a0133530dad3315  src/i18n/locales/am.ts
  443ed62651688aac3470b99c00a40d8f21e7c8876a72b1c0419514a016640bed  src/i18n/locales/en.ts
  c69c8402bf3570e8aa151b0d9e3fe9a7a0a24d2581c8a55df0b686b7238b65c3  src/routes/api/media/photo-links.ts
  f393e831164caed4e9df751fb0829336aa30714b5ddf322b7f2705ccd804c04c  src/server/media/links.ts
  and `ls docs/governance/plans 2>/dev/null` → nothing (the folder does not exist yet).
- (c) `sha256sum e2e/feed-route.spec.ts e2e/feed-index.spec.ts e2e/feed-screens.spec.ts e2e/my-listings-ad.spec.ts` → 57fbf17b701a2ef9af6a51cc4980d100aa7c3e0be171c3684d7aa2c9f81879c3, e6f6a8e20e3100c6ab0c2a344a0dd33377ab79e442a55d8e2e124fe379d6566a, 3a3e720bcf48ddaecad2ef3187e38acec4334c4462fc3e0d4e6d58e0da11eddd and 0e587b6ee5192f84866acbaa07a9437b960cf4dbb4c84914f9877f505763423c; `sha256sum src/integrations/supabase/types.ts` → bae3713c975d32e06e7895ac9e3c30e9d3e38cd2bf71c8befc89d28c596df278; `ls supabase/migrations | tail -1` → 20261015012743_a5300c28-14fb-4318-8450-bd900cf5c527.sql (turn 3b's; no migration since).
- (d) ethio-prod, your query tool (SELECT only):
  - `select max(version) from public.migration_marks;` → 20261015130000;
  - `select p.proname, md5(replace(p.prosrc, chr(13), '')) from pg_proc p where p.oid in ('public.feed_index_refresh(uuid)'::regprocedure, 'public.feed_index_check(uuid)'::regprocedure, 'public.feed_index_on_listing_insert()'::regprocedure, 'public.feed_index_on_listing_update()'::regprocedure, 'public.feed_reindex_enqueue_categories(uuid[])'::regprocedure, 'public.feed_reindex_enqueue_places(uuid[])'::regprocedure, 'public.feed_index_check_sweep()'::regprocedure, 'public.feed_page(uuid,uuid,jsonb,integer)'::regprocedure) order by p.proname;` →
    feed_index_check | 03d01e1e56694cc5aee9d321e96cf1ae
    feed_index_check_sweep | 13aa387232bc8602f1202ff814fde0ed
    feed_index_on_listing_insert | 971972c1996f3bd60c2192633cbddbd5
    feed_index_on_listing_update | 623c60df8a8256cf6aa7ad522ef366f7
    feed_index_refresh | 0917d2701afb9acd5759627cb91cf3af
    feed_page | e300681b63d67ed4d5e4a6e1456f9479
    feed_reindex_enqueue_categories | 526bf60b06f650fc560a9ef28f992166
    feed_reindex_enqueue_places | d1282e1c98b6729a5406114e7e818299
  - `select policyname, qual like '%sold%' from pg_policies where schemaname = 'public' and policyname in ('listings_public_read', 'listing_photos_public_read', 'listing_locations_public_read') order by policyname;` → three rows, each f;
  - `select has_column_privilege('anon', 'public.listings', 'sold_at', 'SELECT');` → f.

THE CARRIER — B16T3c-TURN-CARRIER-2026-10-15.md (62,550 bytes; sha256 d1ef69158532ed3101fe5c6d3f80114928ae6aa660369a885d7d3e90b1976a1b; 65 sections)
- Its first line starts "B16T3c TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`. No blank line separates the sections.
- Modes:
  - REPLACE: the section is the whole file;
  - NEW: a new file; the section is the whole file (create its folder if needed);
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file (INSERT-AFTER 0: at the top of the file);
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed. If your upload arrives under another name, match it by its size and sha256.
- The two usage maps are not in the carrier: after the carrier, run `bun run i18n:usage`; it writes them from the tree, and their hashes are in the table.

THE HASHES — `sha256sum` each of the 24 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  f484e1537d6a0f6f54531a778683d3e7e6261ec36f5e57b8185c0fbf2cd55a94  docs/_changelog.md
  c249d6bd660c81f1ed8fe87405e71e834b9f22e8f2fe90c31cdd0389e828bd94  docs/features/feed-engine.md
  083f1b1141fdb7c4779cb5f0bd85864145b88a4a5164370b4d6e310a68c06904  docs/features/my-listings.md
  710094bbbc65e35c4a8bde198e19690eea4d68ff8ded8e0310899c85db06441f  docs/generated/i18n-usage.json
  02f6a5dc26fc0b0ea0c1374b3ee0a6acdd9bdc8aa3c012e7c9efbf1fe9e94c4e  docs/governance/plans/ahead-of-jiji.md
  710094bbbc65e35c4a8bde198e19690eea4d68ff8ded8e0310899c85db06441f  public/i18n-usage.json
  78ee1a6a10d6f23ec7ebac6f8bfde381be62840ef1ada8ff47738dfa2baea3cf  roadmap.md
  2d46133dd43fef4dc811c414167422e48c5ae0ed327b0ce15e0a6f7d5d748008  scripts/public-surface-allowlist.txt
  dae09753a023d0090f951e45778aecd21b7d6d7a955143f4c38457255bc491ae  src/components/marketplace/listing-card.test.tsx
  5c66353f593198a4f0e12f945f3da60ab10a56ad6ad887abcb9960ce600570a6  src/components/marketplace/listing-card.tsx
  f5eedbc8c77e25fa4597cf94b2dfa9059a6883df3ab29fce54b8260c89a25932  src/components/marketplace/listing-picture.tsx
  96c60e2a992080bb2a8e2dbcdcfe67724fecd411eb906413b012f347954d058e  src/features/feed/feed-page.test.ts
  09bb04699f90735bfc974236acbeabc71e7116c22b5382ca71423db199130ec6  src/features/feed/feed-page.ts
  9e83697032a7fbffd631732d7b32846f829eed5f1bb7e68d9cd5180828b74610  src/features/feed/use-card-photos.ts
  4571787b1d5fa0666c0e89738554c6bcc5461ae48a11dcf82df5b1e17aae2e07  src/features/my-listings/my-listing-page.tsx
  27ec56b084b9bcb7f108ec36c8926fe8209469599cb94821c512c45630dab20b  src/features/my-listings/my-listings-page.tsx
  4d7119e03a79d273e21bc0205f20b6bf81bbfe26005f51978256f5e40fe577c5  src/features/my-listings/my-listings.test.ts
  bd45b2a772576988985e25b2d5b866aabf0df119b50c53a75f9b6e3a1c740241  src/features/my-listings/state-line.ts
  674213219ea5f8a9904ca766a4a4550b7bd352e7e56ff72572bcc55df10a979d  src/features/posting/preview/listing-detail.tsx
  2149b66ed7794f650cde497fd9e99545f8b034d12f9d20893793d1efc4742901  src/features/posting/preview/photo-gallery.tsx
  c7e36499a18737c74feffc8d12937484ebc3385ac4af26cd39a797399f780709  src/i18n/locales/am.ts
  b9b6a183bc30d6ad0c9908cf711aef24e2d3c5eafb4a86e45675e4cd0d1fb559  src/i18n/locales/en.ts
  416715aadfa5b41c4c6c1597c880e753f8da6b22b9645b519bb6ee19dcafba21  src/routes/api/media/photo-links.ts
  809baedb81919612c9f5a984bf48dd11193c7ff5a1a9902d1a497db996b7cdf4  src/server/media/links.ts

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings — a warning in a test file of yours is fixed, not left;
- `bun run test:unit 2>&1 | tee /tmp/unit-b16t3c.log` — 867 passed (151 files). Keep the whole output; if any test fails, paste its name and its first error line;
- `bun run i18n:map-guard` "usage maps match the tree.";
- `bash scripts/check-hardcoded-strings.sh` "findings: 0";
- `bun run scripts/e2e-select.ts --self-test` OK;
- `grep -n 'test("FR-9\|test("FR-10\|test("FR-11\|test("FE-15\|test("FS-15\|test("MLA-11' e2e/*.spec.ts` → six lines, each in its file;
- Not run by you: the typecheck, the build and the bundle budget (your platform's rule). CI judges them.

THE BROWSER RUN — not this turn: the local browser does not start (INC-506). CI on the final commit runs every spec, yours included. A red in your tests is fixed in the next turn, at its cause (G38).

THE MIGRATION RULES (G39 — every one applies)
- The text is between the BEGIN and END lines of the appendix below. Write it EXACTLY, changing only `<MARK>`. Before the change, its sha256 is 9b517627576bfa175b5714449fed2946791562b84596b0d16f143a36bcaf990b (36,606 bytes, 689 lines, ending with a newline).
- Check it in a scratch folder first (after the checks):
  - copy supabase/migrations/*.sql into a temporary folder;
  - add the text, its `<MARK>` replaced by the mark you will use, under the name 20261015170000_b16t3c-check.sql;
  - run `MIGRATIONS_DIR=<that folder> bash scripts/check-migrations.sh`.
  Paste its "guard OK" lines and "Migration guard OK".
- `<MARK>` is chosen at apply time:
  - read now() at time zone 'utc' on ethio-prod;
  - round it up to the next whole hour and add one hour (add twelve hours instead if the save dialog may wait);
  - if the result is not above 20261015170000, use 20261015170000 (above 20261015130000, turn 3b's mark, and equal to the scratch check's stamp);
  - the mark must also be later than the saved file's own stamp.
- Then hand the FINAL text to the database tool ONCE. Never a stub, a comment or a draft (INC-491).
- A clean apply is the proofs' pass: they RAISE EXCEPTION on any failure.

THE READ-BACK (ethio-prod, your query tool, SELECT only; paste each result)
- `select version from public.migration_marks where version = '<MARK>';` → one row;
- the census (d) query of the eight bodies again →
    feed_index_check | 60b75a9267ab699be1c3bd78b04fabc3
    feed_index_check_sweep | 4f61a990a4f85b6090296c7db56b1923
    feed_index_on_listing_insert | 43184f599e49db90f191e23adf41d446
    feed_index_on_listing_update | f3c47c62acda88445645717aea936dcb
    feed_index_refresh | 4e228b35d7ec2892245c7d8fb221cdb2
    feed_page | bb4ce97d7eeb47f8271c97e055e071f2
    feed_reindex_enqueue_categories | 55d421a866e45ac0066ec541631b9ae0
    feed_reindex_enqueue_places | 6c3e807ef39e8dbf290fe768127ab49f
- `select p.proname, p.provolatile, p.prosecdef, p.proconfig, has_function_privilege('anon', p.oid, 'EXECUTE'), has_function_privilege('authenticated', p.oid, 'EXECUTE') from pg_proc p where p.oid in ('public.feed_index_refresh(uuid)'::regprocedure, 'public.feed_index_check_sweep()'::regprocedure, 'public.feed_page(uuid,uuid,jsonb,integer)'::regprocedure) order by p.proname;` →
    feed_index_check_sweep | v | t | {search_path=public} | f | f
    feed_index_refresh | v | t | {search_path=public} | f | f
    feed_page | s | t | {search_path=public} | t | t
- the census (d) policy query → three rows, each t; the column query → t.

THE REPORT
- Done or not done, by step.
- The six ci-status lines, and <START>.
- The census results (a)–(d).
- The 24 sha256sum lines and the brief's; the sha256sum and line count of each of your four test files, and `git diff <START> -- e2e/feed-route.spec.ts e2e/feed-index.spec.ts e2e/feed-screens.spec.ts e2e/my-listings-ad.spec.ts | head -500`.
- `git diff --name-only <START>` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only <START> HEAD` too. Expect the 24 paths, the brief, your four test files and the one migration file.
- The checks.
- The check-migrations "guard OK" lines; the mark and the now() reading it came from; the apply outcome; the read-back.
- The line "apply <uuid-fragment of the migration's filename> → expect mark <MARK>", for the operator's staging apply.
- In this report ONLY (never in a file — the repository is public): from the database tool's security warnings, each NEW warning, and the total count.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only). The database change is undone only by a new migration — never by editing this file.

AFTER THIS TURN (for the operator), in this order:
1. Apply the migration on ethio-staging: open the new migration file on GitHub (Raw), paste it into the ethio-staging SQL editor and run it; read back its mark with the line the report gives. CI's preflight waits for it (up to 25 minutes); if the run has already failed at the preflight, use "Re-run failed jobs".
2. Bring the supervisor Lovable's report. The next prompt comes back at once: send it to Lovable as soon as you have it. Do not wait for CI (DEC-181).
3. Publish only when the supervisor says the newest commit is green and Lovable is idle. Then press "Sync keys" in Admin › Translations (this turn's words).

APPENDIX — THE MIGRATION TEXT (write it exactly; change only <MARK>)
----- BEGIN MIGRATION -----
-- Bundle 16 (My listings), turn 3c (2026-10-15). Tier A. A sold ad stays in the feed and the public reads for 30 days
-- after it sold, with its Sold (Rented, Filled) ribbon and its contact closed (D175 1); the feed card carries the
-- Reserved and "Price reduced" marks (D173). Spec: docs/features/my-listings.md.
-- e2e-areas: feed, my-listings
--
-- THE RULE, in one place for every reader below: an ad is shown to buyers while it is live (active), and a sold ad
-- for 30 days after it sold (sold_at). Contact stays closed on a sold ad: reveal_listing_contact answers only a live ad
-- and is not changed here.
-- A. feed_index_refresh, redeclared whole from 20261009052418: a sold ad keeps its rows for its 30 days, with rank -1, so
--    a page reads it after every live ad of its place (newest first among the sold).
-- B. feed_index_check, redeclared whole from 20261009052418: the same rule; a new count `sold_shown`.
-- C. feed_index_on_listing_insert and feed_index_on_listing_update, redeclared whole from 20261009052418: a sale, a
--    relist and a deletion of a sold ad rewrite its rows (they looked at live ads only).
-- D. feed_reindex_enqueue_categories and feed_reindex_enqueue_places, redeclared whole from 20261009052418: a moved
--    category or place queues the sold ads under it too.
-- E. feed_index_check_sweep, redeclared whole from 20261009052418 (the daily feed-index-check job): first, the rows of a
--    sold ad whose 30 days are over go; its answer gains `sold_left_feed`. No new job: feed_page already leaves such an
--    ad out the moment its 30 days end.
-- F. feed_page, redeclared whole from 20261014022725: the live ads and the sold ones for 30 days; the widening counts
--    live ads only; each card gains `soldWord` (sold, rented or filled — null for a live ad), `reserved` and `priceWas`
--    (the old price while the "Price reduced" mark stands, 14 days) — the same texts as my_listings' row (P4).
-- G. The public reads (listings_public_read, listing_photos_public_read, listing_locations_public_read) show a sold ad
--    for its 30 days, so its cover photo is still given a link; buyers may read `sold_at` (a column grant), which the
--    photo and place reads need.
-- P. Proofs (RAISE EXCEPTION on any failure; a clean apply is the pass): the headers and privileges; each redeclared body
--    equal to its earlier body beyond the named changes (carriage returns removed first); the card's texts equal to
--    my_listings'; the three policies and the column grant; the triggers in place. No proof creates or reads a listing
--    (a proof cannot create one): the behaviour is proven by FR-9…FR-11 (e2e/feed-route.spec.ts), FE-15
--    (e2e/feed-index.spec.ts), FS-15 (e2e/feed-screens.spec.ts) and MLA-11 (e2e/my-listings-ad.spec.ts).

-- ===== A — feed_index_refresh (redeclared whole) =====
CREATE OR REPLACE FUNCTION public.feed_index_refresh(p_listing_id uuid)
RETURNS integer
LANGUAGE plpgsql
VOLATILE SECURITY DEFINER
SET search_path TO 'public'
AS $fn$
DECLARE
  v_status      text;
  v_published   timestamptz;
  v_category_id uuid;
  v_location_id uuid;
  v_tier        text;
  v_sold_at     timestamptz;
  v_n           integer := 0;
BEGIN
  -- The listing's row lock serialises two refreshes of the same listing.
  SELECT l.status, l.published_at, l.category_id, l.location_id, l.tier, l.sold_at
    INTO v_status, v_published, v_category_id, v_location_id, v_tier, v_sold_at
    FROM public.listings l
   WHERE l.id = p_listing_id
     FOR UPDATE;
  DELETE FROM public.feed_index WHERE listing_id = p_listing_id;
  -- Bundle 16 turn 3c (D175 1) — a sold ad stays in the feed for 30 days after it sold, read after the live ones.
  IF v_published IS NULL
     OR NOT (v_status = 'active' OR (v_status = 'sold' AND v_sold_at > now() - interval '30 days')) THEN
    RETURN 0;
  END IF;
  INSERT INTO public.feed_index (category_key, place_key, tier_rank, published_at, listing_id)
  SELECT k.category_key, k.place_key,
         CASE WHEN v_status = 'sold' THEN -1 ELSE public.feed_tier_rank(v_tier) END, v_published, p_listing_id
    FROM public.feed_keys(
           v_category_id,
           ARRAY[v_location_id] || ARRAY(
             SELECT ll.location_id FROM public.listing_locations ll WHERE ll.listing_id = p_listing_id)) k;
  GET DIAGNOSTICS v_n = ROW_COUNT;
  RETURN v_n;
END $fn$;
REVOKE ALL ON FUNCTION public.feed_index_refresh(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.feed_index_refresh(uuid) TO service_role;

-- ===== B — feed_index_check (redeclared whole) =====
CREATE OR REPLACE FUNCTION public.feed_index_check(p_listing_id uuid DEFAULT NULL)
RETURNS jsonb
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $fn$
  WITH scope AS (
    SELECT l.id, l.status, l.published_at, l.category_id, l.location_id, l.tier, l.sold_at
      FROM public.listings l
     WHERE p_listing_id IS NULL OR l.id = p_listing_id
  ),
  live AS (
    -- Bundle 16 turn 3c (D175 1) — a sold ad stays in the feed for 30 days after it sold, read after the live ones.
    SELECT * FROM scope
     WHERE published_at IS NOT NULL
       AND (status = 'active' OR (status = 'sold' AND sold_at > now() - interval '30 days'))
  ),
  indexed AS (
    SELECT DISTINCT f.listing_id
      FROM public.feed_index f
     WHERE p_listing_id IS NULL OR f.listing_id = p_listing_id
  )
  SELECT jsonb_build_object(
    'active_listings',
      (SELECT count(*) FROM scope WHERE status = 'active'),
    'active_without_published_at',
      (SELECT count(*) FROM scope WHERE status = 'active' AND published_at IS NULL),
    'sold_shown',
      (SELECT count(*) FROM live WHERE status = 'sold'),
    'active_without_rows',
      (SELECT count(*) FROM live v WHERE NOT EXISTS (SELECT 1 FROM indexed i WHERE i.listing_id = v.id)),
    'rows_for_inactive',
      (SELECT count(*) FROM public.feed_index f JOIN scope s ON s.id = f.listing_id
        WHERE NOT EXISTS (SELECT 1 FROM live v WHERE v.id = s.id)),
    'listings_with_wrong_rows',
      (SELECT count(*) FROM live v
        WHERE EXISTS (SELECT 1 FROM indexed i WHERE i.listing_id = v.id)
          AND EXISTS (
            (SELECT f.category_key, f.place_key, f.tier_rank, f.published_at
               FROM public.feed_index f WHERE f.listing_id = v.id
             EXCEPT
             SELECT k.category_key, k.place_key, CASE WHEN v.status = 'sold' THEN -1 ELSE public.feed_tier_rank(v.tier) END, v.published_at
               FROM public.feed_keys(v.category_id, ARRAY[v.location_id] || ARRAY(
                      SELECT ll.location_id FROM public.listing_locations ll WHERE ll.listing_id = v.id)) k)
            UNION ALL
            (SELECT k.category_key, k.place_key, CASE WHEN v.status = 'sold' THEN -1 ELSE public.feed_tier_rank(v.tier) END, v.published_at
               FROM public.feed_keys(v.category_id, ARRAY[v.location_id] || ARRAY(
                      SELECT ll.location_id FROM public.listing_locations ll WHERE ll.listing_id = v.id)) k
             EXCEPT
             SELECT f.category_key, f.place_key, f.tier_rank, f.published_at
               FROM public.feed_index f WHERE f.listing_id = v.id)))
  );
$fn$;
REVOKE ALL ON FUNCTION public.feed_index_check(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.feed_index_check(uuid) TO service_role;

-- ===== C — the listing triggers' functions (redeclared whole; the triggers are unchanged) =====
CREATE OR REPLACE FUNCTION public.feed_index_on_listing_insert()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $fn$
BEGIN
  -- Bundle 16 turn 3c (D175 1) — a sold ad too: the refresh decides whether it is shown.
  PERFORM public.feed_index_refresh(n.id) FROM new_rows n WHERE n.status IN ('active', 'sold');
  RETURN NULL;
END $fn$;
REVOKE ALL ON FUNCTION public.feed_index_on_listing_insert() FROM PUBLIC, anon, authenticated;

CREATE OR REPLACE FUNCTION public.feed_index_on_listing_update()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $fn$
BEGIN
  PERFORM public.feed_index_refresh(n.id)
     FROM new_rows n
     JOIN old_rows o ON o.id = n.id
    -- Bundle 16 turn 3c (D175 1) — a sold ad too: a sale, a relist or a deletion rewrites its rows.
    WHERE (o.status IN ('active', 'sold') OR n.status IN ('active', 'sold'))
      AND (o.status, o.published_at, o.category_id, o.location_id, o.tier, o.sold_at)
          IS DISTINCT FROM (n.status, n.published_at, n.category_id, n.location_id, n.tier, n.sold_at);
  RETURN NULL;
END $fn$;
REVOKE ALL ON FUNCTION public.feed_index_on_listing_update() FROM PUBLIC, anon, authenticated;

-- ===== D — the reindex queue (redeclared whole) =====
CREATE OR REPLACE FUNCTION public.feed_reindex_enqueue_categories(p_category_ids uuid[])
RETURNS integer
LANGUAGE plpgsql
VOLATILE SECURITY DEFINER
SET search_path TO 'public'
AS $fn$
DECLARE
  v_n integer := 0;
BEGIN
  WITH RECURSIVE sub(id) AS (
    SELECT u.id FROM unnest(p_category_ids) AS u(id) WHERE u.id IS NOT NULL
    UNION
    SELECT t.child_id
      FROM sub s
      JOIN public.category_tree_pointers t ON t.parent_id = s.id
  )
  INSERT INTO public.feed_reindex_queue (listing_id)
  SELECT l.id
    FROM public.listings l
   WHERE l.status IN ('active', 'sold')
     AND l.category_id IN (SELECT id FROM sub)
  ON CONFLICT (listing_id) DO NOTHING;
  GET DIAGNOSTICS v_n = ROW_COUNT;
  IF v_n > 0 THEN
    PERFORM public.feed_reindex_wake();
  END IF;
  RETURN v_n;
END $fn$;
REVOKE ALL ON FUNCTION public.feed_reindex_enqueue_categories(uuid[]) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.feed_reindex_enqueue_categories(uuid[]) TO service_role;

CREATE OR REPLACE FUNCTION public.feed_reindex_enqueue_places(p_location_ids uuid[])
RETURNS integer
LANGUAGE plpgsql
VOLATILE SECURITY DEFINER
SET search_path TO 'public'
AS $fn$
DECLARE
  v_n integer := 0;
BEGIN
  WITH RECURSIVE sub(id) AS (
    SELECT u.id FROM unnest(p_location_ids) AS u(id) WHERE u.id IS NOT NULL
    UNION
    SELECT l.id
      FROM sub s
      JOIN public.locations l ON l.parent_id = s.id
  )
  INSERT INTO public.feed_reindex_queue (listing_id)
  SELECT l.id
    FROM public.listings l
   WHERE l.status IN ('active', 'sold')
     AND l.location_id IN (SELECT id FROM sub)
  UNION
  SELECT l.id
    FROM public.listing_locations ll
    JOIN public.listings l ON l.id = ll.listing_id
   WHERE l.status IN ('active', 'sold')
     AND ll.location_id IN (SELECT id FROM sub)
  ON CONFLICT (listing_id) DO NOTHING;
  GET DIAGNOSTICS v_n = ROW_COUNT;
  IF v_n > 0 THEN
    PERFORM public.feed_reindex_wake();
  END IF;
  RETURN v_n;
END $fn$;
REVOKE ALL ON FUNCTION public.feed_reindex_enqueue_places(uuid[]) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.feed_reindex_enqueue_places(uuid[]) TO service_role;

-- ===== E — feed_index_check_sweep (redeclared whole) =====
CREATE OR REPLACE FUNCTION public.feed_index_check_sweep()
RETURNS jsonb
LANGUAGE plpgsql
VOLATILE SECURITY DEFINER
SET search_path TO 'public'
AS $fn$
DECLARE
  v_result jsonb;
  v_id     uuid;
  v_gone   integer := 0;
BEGIN
  -- Bundle 16 turn 3c (D175 1) — a sold ad whose 30 days are over leaves the feed: its rows go (feed_page already
  -- reads only the ads it shows).
  FOR v_id IN
    SELECT DISTINCT f.listing_id
      FROM public.feed_index f
      JOIN public.listings l ON l.id = f.listing_id
     WHERE l.status = 'sold' AND (l.sold_at IS NULL OR l.sold_at <= now() - interval '30 days')
  LOOP
    PERFORM public.feed_index_refresh(v_id);
    v_gone := v_gone + 1;
  END LOOP;
  v_result := public.feed_index_check(NULL)
              || jsonb_build_object('queued', (SELECT count(*) FROM public.feed_reindex_queue),
                                    'sold_left_feed', v_gone);
  INSERT INTO public.feed_index_check_runs (result) VALUES (v_result);
  DELETE FROM public.feed_index_check_runs WHERE ran_at < now() - interval '60 days';
  -- A queue that still holds rows is woken again (its drain stops only when the queue is empty).
  IF (v_result->>'queued')::int > 0 THEN
    PERFORM public.feed_reindex_wake();
  END IF;
  RETURN v_result;
END $fn$;
REVOKE ALL ON FUNCTION public.feed_index_check_sweep() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.feed_index_check_sweep() TO service_role;

-- ===== F — feed_page (redeclared whole) =====
CREATE OR REPLACE FUNCTION public.feed_page(
  p_category_id uuid DEFAULT NULL,
  p_location_id uuid DEFAULT NULL,
  p_after jsonb DEFAULT NULL,
  p_size integer DEFAULT 20)
RETURNS jsonb
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $fn$
DECLARE
  c_nil     constant uuid := '00000000-0000-0000-0000-000000000000';
  c_widen   constant integer := 8;
  v_cat     uuid;
  v_steps   uuid[];
  v_last    integer;
  v_first   integer := 1;
  v_has_cur boolean := false;
  v_c_tier  smallint;
  v_c_pub   timestamptz;
  v_c_id    uuid;
  v_s       integer;
  v_left    integer;
  v_got     integer;
  v_cards   jsonb := '[]'::jsonb;
  v_n       integer := 0;
  v_rec     record;
  v_end_s   integer;
  v_end_t   smallint;
  v_end_p   timestamptz;
  v_end_i   uuid;
  v_steps_j jsonb := '[]'::jsonb;
BEGIN
  IF p_size IS NULL OR p_size < 1 OR p_size > 50 THEN
    RAISE EXCEPTION 'feed_page: badSize';
  END IF;

  -- The category: none means all categories (the named all key); one must be a live category.
  IF p_category_id IS NULL THEN
    v_cat := c_nil;
  ELSIF EXISTS (SELECT 1 FROM public.categories c WHERE c.id = p_category_id AND c.is_active) THEN
    v_cat := p_category_id;
  ELSE
    RAISE EXCEPTION 'feed_page: unknownCategory';
  END IF;

  -- The ladder: the chosen place, each parent up to its country, then everywhere.
  IF p_location_id IS NULL THEN
    v_steps := ARRAY[c_nil];
  ELSIF EXISTS (SELECT 1 FROM public.locations l WHERE l.id = p_location_id AND l.is_active) THEN
    v_steps := ARRAY(
      WITH RECURSIVE up(id, depth) AS (
        SELECT p_location_id, 0
        UNION ALL
        SELECT l.parent_id, u.depth + 1
          FROM up u
          JOIN public.locations l ON l.id = u.id
         WHERE l.parent_id IS NOT NULL AND u.depth < 8
      )
      SELECT up.id FROM up ORDER BY up.depth) || c_nil;
  ELSE
    RAISE EXCEPTION 'feed_page: unknownPlace';
  END IF;

  -- The widest step read: the first step that holds at least 8 listings, else everywhere. Bundle 16 turn 3c — only live
  -- listings count: a sold ad (rank -1) never stops the widening.
  v_last := cardinality(v_steps);
  FOR v_s IN 1 .. cardinality(v_steps) LOOP
    IF (SELECT count(*) FROM (
          SELECT 1 FROM public.feed_index f
           WHERE f.category_key = v_cat AND f.place_key = v_steps[v_s]
             AND f.tier_rank >= 0
           LIMIT c_widen) x) >= c_widen THEN
      v_last := v_s;
      EXIT;
    END IF;
  END LOOP;

  -- The cursor: the step and the last card's (tier, publish time, id) of the previous page.
  IF p_after IS NOT NULL THEN
    BEGIN
      v_first  := (p_after->>'s')::integer;
      v_c_tier := (p_after->>'t')::smallint;
      v_c_pub  := (p_after->>'p')::timestamptz;
      v_c_id   := (p_after->>'i')::uuid;
    EXCEPTION WHEN others THEN
      RAISE EXCEPTION 'feed_page: badCursor';
    END;
    IF v_first IS NULL OR v_c_tier IS NULL OR v_c_pub IS NULL OR v_c_id IS NULL
       OR v_first < 1 OR v_first > cardinality(v_steps) THEN
      RAISE EXCEPTION 'feed_page: badCursor';
    END IF;
    v_has_cur := true;
  END IF;

  FOR v_s IN v_first .. v_last LOOP
    v_left := p_size - v_n;
    EXIT WHEN v_left = 0;
    v_got := 0;
    FOR v_rec IN
      SELECT f.tier_rank, f.published_at, f.listing_id,
             l.title, l.price_amount, l.price_currency, l.price_mode, l.price_bp,
             l.price_negotiable, l.price_period, l.price_unit, l.price_unit_text,
             l.photos_soon, l.tier, l.category_id, l.location_id,
             -- Bundle 16 turn 3c (D173, D175 1) — the card's marks: the sold word, Reserved, the old price.
             CASE WHEN l.status = 'sold' THEN coalesce((SELECT CASE WHEN 'rented' = ANY (c.capabilities) THEN 'rented'
                                                 WHEN 'filled' = ANY (c.capabilities) THEN 'filled' END
                                       FROM public.categories c WHERE c.id = l.category_id), 'sold') END AS sold_word,
             l.reserved_at IS NOT NULL AS reserved,
             CASE WHEN l.price_drop_at > now() - interval '14 days' THEN l.price_was END AS price_was,
             loc.name_en AS location_name_en, loc.name_am AS location_name_am,
             -- INC-606 — the card's photo: the listing's first stripped photo (the cover, D154).
             -- D158 (bundle 13 turn 6) — a photo held for staff is never a buyer's cover.
             (SELECT p.id FROM public.listing_photos p
               WHERE p.listing_id = f.listing_id AND p.exif_stripped AND NOT p.unscreened
               ORDER BY p.display_order
               LIMIT 1) AS cover_photo_id
        FROM public.feed_index f
        -- Bundle 16 turn 3c (D175 1) — the live ads and the sold ones for 30 days after they sold.
        JOIN public.listings l ON l.id = f.listing_id
         AND (l.status = 'active' OR (l.status = 'sold' AND l.sold_at > now() - interval '30 days'))
        LEFT JOIN public.locations loc ON loc.id = l.location_id
       WHERE f.category_key = v_cat
         AND f.place_key = v_steps[v_s]
         AND (NOT v_has_cur OR v_s <> v_first
              OR (f.tier_rank, f.published_at, f.listing_id) < (v_c_tier, v_c_pub, v_c_id))
         AND (v_s = 1 OR NOT EXISTS (
               SELECT 1 FROM public.feed_index g
                WHERE g.category_key = v_cat AND g.place_key = v_steps[v_s - 1]
                  AND g.tier_rank = f.tier_rank AND g.published_at = f.published_at
                  AND g.listing_id = f.listing_id))
       ORDER BY f.tier_rank DESC, f.published_at DESC, f.listing_id DESC
       LIMIT v_left
    LOOP
      v_cards := v_cards || jsonb_build_array(jsonb_build_object(
        'id', v_rec.listing_id,
        'title', v_rec.title,
        'priceAmount', v_rec.price_amount,
        'priceCurrency', v_rec.price_currency,
        'priceMode', v_rec.price_mode,
        'priceBp', v_rec.price_bp,
        'priceNegotiable', v_rec.price_negotiable,
        'pricePeriod', v_rec.price_period,
        'priceUnit', v_rec.price_unit,
        'priceUnitText', v_rec.price_unit_text,
        'photosSoon', v_rec.photos_soon,
        'coverPhotoId', v_rec.cover_photo_id,
        'soldWord', v_rec.sold_word,
        'reserved', v_rec.reserved,
        'priceWas', v_rec.price_was,
        'tier', v_rec.tier,
        'publishedAt', v_rec.published_at,
        'categoryId', v_rec.category_id,
        'locationId', v_rec.location_id,
        'locationNameEn', v_rec.location_name_en,
        'locationNameAm', v_rec.location_name_am,
        'step', v_s));
      v_n := v_n + 1;
      v_got := v_got + 1;
      v_end_s := v_s;
      v_end_t := v_rec.tier_rank;
      v_end_p := v_rec.published_at;
      v_end_i := v_rec.listing_id;
    END LOOP;
    IF v_got > 0 THEN
      v_steps_j := v_steps_j || jsonb_build_array(jsonb_build_object('step', v_s, 'placeId', v_steps[v_s], 'shown', v_got));
    END IF;
  END LOOP;

  RETURN jsonb_build_object(
    'cards', v_cards,
    'ladder', to_jsonb(v_steps[1:v_last]),
    'steps', v_steps_j,
    'next', CASE WHEN v_n = p_size
                 THEN jsonb_build_object('s', v_end_s, 't', v_end_t, 'p', v_end_p, 'i', v_end_i)
            END);
END $fn$;

REVOKE ALL ON FUNCTION public.feed_page(uuid, uuid, jsonb, integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.feed_page(uuid, uuid, jsonb, integer) TO anon, authenticated, service_role;

-- ===== G — the public reads =====
GRANT SELECT (sold_at) ON public.listings TO anon, authenticated;

DROP POLICY IF EXISTS listings_public_read ON public.listings;
CREATE POLICY listings_public_read ON public.listings
  FOR SELECT TO anon, authenticated
  USING (status = 'active' OR (status = 'sold' AND sold_at > now() - interval '30 days'));

DROP POLICY IF EXISTS listing_photos_public_read ON public.listing_photos;
CREATE POLICY listing_photos_public_read ON public.listing_photos
  FOR SELECT TO anon, authenticated
  USING (
    exif_stripped
    AND NOT unscreened
    AND EXISTS (
      SELECT 1 FROM public.listings l
       WHERE l.id = listing_photos.listing_id
         AND (l.status = 'active' OR (l.status = 'sold' AND l.sold_at > now() - interval '30 days'))
    )
  );

DROP POLICY IF EXISTS listing_locations_public_read ON public.listing_locations;
CREATE POLICY listing_locations_public_read
  ON public.listing_locations FOR SELECT TO anon, authenticated
  USING (EXISTS (
    SELECT 1 FROM public.listings l
     WHERE l.id = listing_id
       AND (l.status = 'active' OR (l.status = 'sold' AND l.sold_at > now() - interval '30 days'))));

COMMENT ON TABLE public.feed_index IS
  'The feed''s ordered index (docs/governance/feed-engine-spec.md): one row per (category key, place key) of each shown listing with a publish time — a live one, and a sold one for 30 days after it sold (bundle 16 turn 3c, D175 1). A page is one range of the primary key read backwards: higher tier first, then newest, then id. Written only by feed_index_refresh; read by the feed''s read door (E2). Holds no personal data.';
COMMENT ON COLUMN public.feed_index.tier_rank IS
  'The listing''s tier (D108): premium 2, featured 1, regular 0 (feed_tier_rank); a sold ad -1, read after every live one (bundle 16 turn 3c). A higher rank is read first; newest first inside a rank.';

-- ===== P — proofs (RAISE EXCEPTION on any failure; a clean apply is the pass) =====
DO $proof$
DECLARE
  v_n    integer;
  v_md5  text;
  v_src  text;
  v_row  text;
  v_seg  text;
BEGIN
  -- P1. The headers: each function keeps its volatility, its definer and its search path.
  SELECT count(*) INTO v_n FROM pg_proc
   WHERE oid IN ('public.feed_index_refresh(uuid)'::regprocedure, 'public.feed_reindex_enqueue_categories(uuid[])'::regprocedure,
                 'public.feed_reindex_enqueue_places(uuid[])'::regprocedure, 'public.feed_index_check_sweep()'::regprocedure)
     AND provolatile = 'v' AND prosecdef AND proconfig = ARRAY['search_path=public'];
  IF v_n <> 4 THEN RAISE EXCEPTION 'B16T3c P1: a VOLATILE SECURITY DEFINER function lost its header'; END IF;
  SELECT count(*) INTO v_n FROM pg_proc
   WHERE oid IN ('public.feed_index_check(uuid)'::regprocedure, 'public.feed_page(uuid,uuid,jsonb,integer)'::regprocedure)
     AND provolatile = 's' AND prosecdef AND proconfig = ARRAY['search_path=public'];
  IF v_n <> 2 THEN RAISE EXCEPTION 'B16T3c P1: feed_index_check or feed_page is not STABLE SECURITY DEFINER with search_path public'; END IF;
  SELECT count(*) INTO v_n FROM pg_proc
   WHERE oid IN ('public.feed_index_on_listing_insert()'::regprocedure, 'public.feed_index_on_listing_update()'::regprocedure)
     AND prosecdef AND proconfig = ARRAY['search_path=public'];
  IF v_n <> 2 THEN RAISE EXCEPTION 'B16T3c P1: a listing trigger''s function lost its header'; END IF;

  -- P2. Who may call them: feed_page anyone (the public feed); the rest the service only.
  IF NOT has_function_privilege('anon', 'public.feed_page(uuid,uuid,jsonb,integer)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.feed_page(uuid,uuid,jsonb,integer)', 'EXECUTE') THEN
    RAISE EXCEPTION 'B16T3c P2: feed_page is not readable by buyers';
  END IF;
  IF has_function_privilege('anon', 'public.feed_index_refresh(uuid)', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.feed_index_refresh(uuid)', 'EXECUTE')
     OR has_function_privilege('anon', 'public.feed_index_check(uuid)', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.feed_index_check(uuid)', 'EXECUTE')
     OR has_function_privilege('anon', 'public.feed_index_check_sweep()', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.feed_index_check_sweep()', 'EXECUTE')
     OR has_function_privilege('anon', 'public.feed_reindex_enqueue_categories(uuid[])', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.feed_reindex_enqueue_places(uuid[])', 'EXECUTE')
     OR has_function_privilege('anon', 'public.feed_index_on_listing_update()', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.feed_index_on_listing_insert()', 'EXECUTE') THEN
    RAISE EXCEPTION 'B16T3c P2: a service-only function is open to a browser role';
  END IF;

  -- P3. Each redeclared body is its earlier body beyond the named changes.
  SELECT md5(replace(replace(replace(replace(replace(p.prosrc, chr(13), ''), replace('  v_tier        text;
  v_sold_at     timestamptz;
', chr(13), ''), replace('  v_tier        text;
', chr(13), '')), replace('  SELECT l.status, l.published_at, l.category_id, l.location_id, l.tier, l.sold_at
    INTO v_status, v_published, v_category_id, v_location_id, v_tier, v_sold_at
', chr(13), ''), replace('  SELECT l.status, l.published_at, l.category_id, l.location_id, l.tier
    INTO v_status, v_published, v_category_id, v_location_id, v_tier
', chr(13), '')), replace('  -- Bundle 16 turn 3c (D175 1) — a sold ad stays in the feed for 30 days after it sold, read after the live ones.
  IF v_published IS NULL
     OR NOT (v_status = ''active'' OR (v_status = ''sold'' AND v_sold_at > now() - interval ''30 days'')) THEN
', chr(13), ''), replace('  IF v_status IS DISTINCT FROM ''active'' OR v_published IS NULL THEN
', chr(13), '')), replace('  SELECT k.category_key, k.place_key,
         CASE WHEN v_status = ''sold'' THEN -1 ELSE public.feed_tier_rank(v_tier) END, v_published, p_listing_id
', chr(13), ''), replace('  SELECT k.category_key, k.place_key, public.feed_tier_rank(v_tier), v_published, p_listing_id
', chr(13), '')))
    INTO v_md5 FROM pg_proc p WHERE p.oid = 'public.feed_index_refresh(uuid)'::regprocedure;
  IF v_md5 IS DISTINCT FROM '0917d2701afb9acd5759627cb91cf3af' THEN
    RAISE EXCEPTION 'B16T3c P3: feed_index_refresh differs from its earlier body beyond the named changes';
  END IF;
  SELECT md5(replace(replace(replace(replace(replace(replace(p.prosrc, chr(13), ''), replace('    SELECT l.id, l.status, l.published_at, l.category_id, l.location_id, l.tier, l.sold_at
', chr(13), ''), replace('    SELECT l.id, l.status, l.published_at, l.category_id, l.location_id, l.tier
', chr(13), '')), replace('    -- Bundle 16 turn 3c (D175 1) — a sold ad stays in the feed for 30 days after it sold, read after the live ones.
    SELECT * FROM scope
     WHERE published_at IS NOT NULL
       AND (status = ''active'' OR (status = ''sold'' AND sold_at > now() - interval ''30 days''))
', chr(13), ''), replace('    SELECT * FROM scope WHERE status = ''active'' AND published_at IS NOT NULL
', chr(13), '')), replace('        WHERE NOT EXISTS (SELECT 1 FROM live v WHERE v.id = s.id)),
', chr(13), ''), replace('        WHERE s.status <> ''active'' OR s.published_at IS NULL),
', chr(13), '')), replace('    ''active_without_published_at'',
      (SELECT count(*) FROM scope WHERE status = ''active'' AND published_at IS NULL),
    ''sold_shown'',
      (SELECT count(*) FROM live WHERE status = ''sold''),
', chr(13), ''), replace('    ''active_without_published_at'',
      (SELECT count(*) FROM scope WHERE status = ''active'' AND published_at IS NULL),
', chr(13), '')), replace('CASE WHEN v.status = ''sold'' THEN -1 ELSE public.feed_tier_rank(v.tier) END', chr(13), ''), replace('public.feed_tier_rank(v.tier)', chr(13), '')))
    INTO v_md5 FROM pg_proc p WHERE p.oid = 'public.feed_index_check(uuid)'::regprocedure;
  IF v_md5 IS DISTINCT FROM '03d01e1e56694cc5aee9d321e96cf1ae' THEN
    RAISE EXCEPTION 'B16T3c P3: feed_index_check differs from its earlier body beyond the named changes';
  END IF;
  SELECT md5(replace(replace(p.prosrc, chr(13), ''), replace('  -- Bundle 16 turn 3c (D175 1) — a sold ad too: the refresh decides whether it is shown.
  PERFORM public.feed_index_refresh(n.id) FROM new_rows n WHERE n.status IN (''active'', ''sold'');
', chr(13), ''), replace('  PERFORM public.feed_index_refresh(n.id) FROM new_rows n WHERE n.status = ''active'';
', chr(13), '')))
    INTO v_md5 FROM pg_proc p WHERE p.oid = 'public.feed_index_on_listing_insert()'::regprocedure;
  IF v_md5 IS DISTINCT FROM '971972c1996f3bd60c2192633cbddbd5' THEN
    RAISE EXCEPTION 'B16T3c P3: feed_index_on_listing_insert differs from its earlier body beyond the named changes';
  END IF;
  SELECT md5(replace(replace(p.prosrc, chr(13), ''), replace('    -- Bundle 16 turn 3c (D175 1) — a sold ad too: a sale, a relist or a deletion rewrites its rows.
    WHERE (o.status IN (''active'', ''sold'') OR n.status IN (''active'', ''sold''))
      AND (o.status, o.published_at, o.category_id, o.location_id, o.tier, o.sold_at)
          IS DISTINCT FROM (n.status, n.published_at, n.category_id, n.location_id, n.tier, n.sold_at);
', chr(13), ''), replace('    WHERE (o.status = ''active'' OR n.status = ''active'')
      AND (o.status, o.published_at, o.category_id, o.location_id, o.tier)
          IS DISTINCT FROM (n.status, n.published_at, n.category_id, n.location_id, n.tier);
', chr(13), '')))
    INTO v_md5 FROM pg_proc p WHERE p.oid = 'public.feed_index_on_listing_update()'::regprocedure;
  IF v_md5 IS DISTINCT FROM '623c60df8a8256cf6aa7ad522ef366f7' THEN
    RAISE EXCEPTION 'B16T3c P3: feed_index_on_listing_update differs from its earlier body beyond the named changes';
  END IF;
  SELECT md5(replace(replace(p.prosrc, chr(13), ''), replace('   WHERE l.status IN (''active'', ''sold'')
', chr(13), ''), replace('   WHERE l.status = ''active''
', chr(13), '')))
    INTO v_md5 FROM pg_proc p WHERE p.oid = 'public.feed_reindex_enqueue_categories(uuid[])'::regprocedure;
  IF v_md5 IS DISTINCT FROM '526bf60b06f650fc560a9ef28f992166' THEN
    RAISE EXCEPTION 'B16T3c P3: feed_reindex_enqueue_categories differs from its earlier body beyond the named changes';
  END IF;
  SELECT md5(replace(replace(p.prosrc, chr(13), ''), replace('   WHERE l.status IN (''active'', ''sold'')
', chr(13), ''), replace('   WHERE l.status = ''active''
', chr(13), '')))
    INTO v_md5 FROM pg_proc p WHERE p.oid = 'public.feed_reindex_enqueue_places(uuid[])'::regprocedure;
  IF v_md5 IS DISTINCT FROM 'd1282e1c98b6729a5406114e7e818299' THEN
    RAISE EXCEPTION 'B16T3c P3: feed_reindex_enqueue_places differs from its earlier body beyond the named changes';
  END IF;
  SELECT md5(replace(replace(replace(p.prosrc, chr(13), ''), replace('DECLARE
  v_result jsonb;
  v_id     uuid;
  v_gone   integer := 0;
BEGIN
  -- Bundle 16 turn 3c (D175 1) — a sold ad whose 30 days are over leaves the feed: its rows go (feed_page already
  -- reads only the ads it shows).
  FOR v_id IN
    SELECT DISTINCT f.listing_id
      FROM public.feed_index f
      JOIN public.listings l ON l.id = f.listing_id
     WHERE l.status = ''sold'' AND (l.sold_at IS NULL OR l.sold_at <= now() - interval ''30 days'')
  LOOP
    PERFORM public.feed_index_refresh(v_id);
    v_gone := v_gone + 1;
  END LOOP;
', chr(13), ''), replace('DECLARE
  v_result jsonb;
BEGIN
', chr(13), '')), replace('              || jsonb_build_object(''queued'', (SELECT count(*) FROM public.feed_reindex_queue),
                                    ''sold_left_feed'', v_gone);
', chr(13), ''), replace('              || jsonb_build_object(''queued'', (SELECT count(*) FROM public.feed_reindex_queue));
', chr(13), '')))
    INTO v_md5 FROM pg_proc p WHERE p.oid = 'public.feed_index_check_sweep()'::regprocedure;
  IF v_md5 IS DISTINCT FROM '13aa387232bc8602f1202ff814fde0ed' THEN
    RAISE EXCEPTION 'B16T3c P3: feed_index_check_sweep differs from its earlier body beyond the named changes';
  END IF;
  SELECT md5(replace(replace(replace(replace(replace(regexp_replace(replace(p.prosrc, chr(13), ''), '             -- Bundle 16 turn 3c \(D173, D175 1\)[^\n]*\n([^\n]*\n){5}', ''), chr(13), ''), replace('  -- The widest step read: the first step that holds at least 8 listings, else everywhere. Bundle 16 turn 3c — only live
  -- listings count: a sold ad (rank -1) never stops the widening.
', chr(13), ''), replace('  -- The widest step read: the first step that holds at least 8 listings, else everywhere.
', chr(13), '')), replace('           WHERE f.category_key = v_cat AND f.place_key = v_steps[v_s]
             AND f.tier_rank >= 0
           LIMIT c_widen) x) >= c_widen THEN
', chr(13), ''), replace('           WHERE f.category_key = v_cat AND f.place_key = v_steps[v_s]
           LIMIT c_widen) x) >= c_widen THEN
', chr(13), '')), replace('        -- Bundle 16 turn 3c (D175 1) — the live ads and the sold ones for 30 days after they sold.
        JOIN public.listings l ON l.id = f.listing_id
         AND (l.status = ''active'' OR (l.status = ''sold'' AND l.sold_at > now() - interval ''30 days''))
', chr(13), ''), replace('        JOIN public.listings l ON l.id = f.listing_id AND l.status = ''active''
', chr(13), '')), replace('        ''soldWord'', v_rec.sold_word,
        ''reserved'', v_rec.reserved,
        ''priceWas'', v_rec.price_was,
', chr(13), ''), replace('', chr(13), '')))
    INTO v_md5 FROM pg_proc p WHERE p.oid = 'public.feed_page(uuid,uuid,jsonb,integer)'::regprocedure;
  IF v_md5 IS DISTINCT FROM 'e300681b63d67ed4d5e4a6e1456f9479' THEN
    RAISE EXCEPTION 'B16T3c P3: feed_page differs from its earlier body beyond the named changes';
  END IF;

  -- P4. The card's texts are my_listings' texts: the sold word and the old price.
  SELECT replace(prosrc, chr(13), '') INTO v_src FROM pg_proc WHERE oid = 'public.feed_page(uuid,uuid,jsonb,integer)'::regprocedure;
  SELECT replace(prosrc, chr(13), '') INTO v_row FROM pg_proc WHERE oid = 'public.my_listings(text,integer,integer)'::regprocedure;
  v_seg := substring(v_row FROM strpos(v_row, 'coalesce((SELECT CASE WHEN ''rented'''));
  v_seg := substring(v_seg FOR strpos(v_seg, '), ''sold'')') + length('), ''sold'')') - 1);
  IF length(v_seg) < 150 OR strpos(v_src, 'CASE WHEN l.status = ''sold'' THEN ' || v_seg || ' END AS sold_word') = 0 THEN
    RAISE EXCEPTION 'B16T3c P4: feed_page''s sold word is not my_listings'' text';
  END IF;
  v_seg := 'CASE WHEN l.price_drop_at > now() - interval ''14 days'' THEN l.price_was END';
  IF strpos(v_row, v_seg) = 0 OR strpos(v_src, v_seg || ' AS price_was') = 0 THEN
    RAISE EXCEPTION 'B16T3c P4: feed_page''s old price is not my_listings'' text';
  END IF;

  -- P5. The public reads: the three policies, for buyers, with the rule; buyers may read sold_at.
  SELECT count(*) INTO v_n FROM pg_policies
   WHERE schemaname = 'public'
     AND ((tablename = 'listings' AND policyname = 'listings_public_read')
       OR (tablename = 'listing_photos' AND policyname = 'listing_photos_public_read')
       OR (tablename = 'listing_locations' AND policyname = 'listing_locations_public_read'))
     AND cmd = 'SELECT' AND roles @> ARRAY['anon', 'authenticated']::name[] AND cardinality(roles) = 2
     AND qual LIKE '%''active''%' AND qual LIKE '%''sold''%' AND qual LIKE '%sold_at > (now() - ''30 days''::interval)%';
  IF v_n <> 3 THEN RAISE EXCEPTION 'B16T3c P5: a public read does not carry the rule (% of 3)', v_n; END IF;
  SELECT count(*) INTO v_n FROM pg_policies
   WHERE schemaname = 'public' AND tablename = 'listing_photos' AND policyname = 'listing_photos_public_read'
     AND qual LIKE '%exif_stripped%' AND qual LIKE '%NOT unscreened%';
  IF v_n <> 1 THEN RAISE EXCEPTION 'B16T3c P5: the photo read lost its stripped and held-photo rules'; END IF;
  IF NOT has_column_privilege('anon', 'public.listings', 'sold_at', 'SELECT')
     OR NOT has_column_privilege('authenticated', 'public.listings', 'sold_at', 'SELECT') THEN
    RAISE EXCEPTION 'B16T3c P5: buyers may not read sold_at';
  END IF;
  IF has_column_privilege('anon', 'public.listings', 'reserved_at', 'SELECT')
     OR has_column_privilege('anon', 'public.listings', 'price_was', 'SELECT') THEN
    RAISE EXCEPTION 'B16T3c P5: a column beyond sold_at was opened to buyers';
  END IF;

  -- P6. The feed's triggers are in place on listings.
  SELECT count(*) INTO v_n FROM pg_trigger
   WHERE tgrelid = 'public.listings'::regclass AND NOT tgisinternal
     AND tgname IN ('feed_index_on_listing_insert', 'feed_index_on_listing_update');
  IF v_n <> 2 THEN RAISE EXCEPTION 'B16T3c P6: a feed trigger on listings is missing'; END IF;
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('<MARK>') ON CONFLICT (version) DO NOTHING;
----- END MIGRATION -----
```
