# Bundle 16 — turn R1: My listings on the site's table blocks: brief, version 1 (saved unchanged, 2026-10-15)

```text
BUNDLE 16 — TURN R1 (2026-10-15). ONE TURN, ONE MIGRATION, STRINGS, TEST EDITS AND NEW TESTS WRITTEN BY YOU. No package change.
Base: dev af5998e0 (turn 3c). The census below proves every file and the database by content. This file is public: it is written as build instructions.
Tier A: the migration (`my_listings`, the seller's own read, with three new filters). Tier B: the pages, the table block's two options, the table check, the E2E tests. Tier C: the strings, the docs, the roadmap and the changelog.

ANSWERS TO THE LAST TURN
- Turn 3c is verified on dev af5998e0: the 24 carrier paths equal the supervisor's copy byte for byte; the brief (24f2dc48…), your four test files and the migration (the brief's text, mark 20261015170000) are as written. This turn's census (d) reads that mark on ethio-prod.
- CI on af5998e0 stopped at its preflight because ethio-staging did not yet hold turn 3c's migration. That is the operator's staging step, not a defect of yours.
- This turn is the rethink of My listings that turn 3c's answers named (D181), with the operator's answers (D182).

WHY THIS TURN
- D181 (the operator's walk of turns 2–3b, 2026-10-14): the action buttons "need to be well organized as in rest of our system in different screen sizes"; the table "should have the same feature like other tables — filter, columns, the three dots or icons"; "I am surprised I don't see any edit button"; "My listing panel and my listing menu item are confusing and needs a better name"; "small screen presentation should be the best … this is one of the user facing tables and needs to have the best, consistent presentation as well as performance".
- INC-630: the site's tables follow one set of rules, T1–T9 (docs/features/display-primitives.md), checked by scripts/admin-tables.ts — but the check read only the admin's folders, so My listings was built without the toolbar, Columns or the row's actions and nothing refused it.
- D182 (the operator's answers, 2026-10-15): below.

WHAT THIS TURN BUILDS
- The migration (the appendix):
  A. `my_listings`, redeclared whole from 20261015012743 (turn 3b) with three new arguments, each optional: `p_search` (words of the title; case and outer spaces ignored; at most 100 characters, else 'bad search'), `p_category` (a category with everything under it, through `cat_descendants`) and `p_mark` ('reserved', or 'reduced' — "Price reduced" while its 14 days stand, never on a sold ad; anything else 'unknown mark'). The six counts follow the search and the filters, as the rows do. The answer gains the admin's renew setting, `renewAllowed` and `renewDays` (the values `my_listing` gives). The argument list changes, so the old signature is dropped and its REVOKE and GRANT are restated for the new one. The row object is unchanged: it is still `my_listing`'s, byte for byte.
  P. Proofs: the header and privileges; the old signature gone; the body equal to its earlier body beyond the named changes (carriage returns removed first); the filter in both reads; the row object equal to `my_listing`'s; a call with no session refused; a scratch identity that owns nothing answered with six zero counts under every filter, with the renew setting; an unknown mark and a long search refused. No proof creates or reads a listing.
- The carrier:
  - the list (src/features/my-listings/my-listings-page.tsx) rebuilt on the agreed blocks:
    - the header (`TableActions`, testid `my-listings-header`): the page's heading and **Post listing** (`my-listings-post`, to /post);
    - the outcome line above the list (`ActionMessage`, `my-listings-notice`), then the status groups with their counts (`my-listings-group`, as before);
    - the toolbar (`TableToolbar`, `my-listings-toolbar`): the search (`my-listings-search`); Filters (`my-listings-filters`: a top category `my-listings-filter-category`, the marks `my-listings-filter-mark` — Reserved, Price reduced) with their chips (`my-listings-chips`); Columns (`my-listings-columns`: Photo, Title — locked, Price, Status, Posted, Ends);
    - each row's actions (`RowActions`, testid `my-listing-<id>`): a draft — Edit (`my-listing-<id>-edit`, to the posting form) and Delete; any other ad — a red Delete (`my-listing-<id>-delete`) when it can be deleted, and the three-dots (`my-listing-<id>-more`) with Open (`-more-open`) and what the ad offers (`-more-reserve`, `-more-unreserve`, `-more-sell`, `-more-close`, `-more-reopen`, `-more-renew`); the ad's name opens it (`my-listing-<id>-open`; a draft's `my-listing-<id>-continue`). Mark as sold and Delete ask first (`my-listings-confirm`, `-confirm-cancel`, `-confirm-yes`);
    - tick-boxes from tablet width up, and the bar's actions for the ticked ads that offer each: `my-listings-bulk-sell`, `-close`, `-renew`, `-delete`; each asks first with the count;
    - on a phone one card per ad with its photo on the left (`my-listing-<id>-lead`);
  - what an ad offers, one rule for the list and the ad's page (src/features/my-listings/my-listing.ts): `offerFor`, `actionsFor`, `rowActionsFor`; `runListAction` reads the ad again before an action from the list runs; the bulk helpers (`BULK_ACTIONS`, `bulkTargets`, `soldWordsOf`, `bulkLabelKey`, `BULK_BODY_KEY`); `primaryAction`; `DELETED_KEY`;
  - the list's read (src/features/my-listings/my-listings.ts): the filters (`MyListingsFilters`, `NO_FILTERS`, `filterArgs`, `LISTING_MARKS`, `SEARCH_MAX`) and the renew setting in the answer;
  - the ad's page (src/features/my-listings/my-listing-page.tsx): the actions are one bar under the title (`my-listing-actions`, no heading), the main next step filled (Reopen, Renew, Mark as sold; Continue on a draft), each button full width on a phone; Delete's confirm button red;
  - the table block (src/components/shell/data-table.tsx): two options, each off unless asked — `cardLeadKind: "picture"` (a card's lead is the row's own picture, 80 px, testid `<row>-lead`) and `selectionFrom: "md"` (the cards' tick-boxes from tablet width up);
  - the phone's bottom bar (src/components/shell/bottom-bar.tsx) names the seller's panel with the panel's name;
  - the search's pause (src/hooks/use-debounced.ts, NEW; the admin users' hooks re-export it);
  - `my_listings`' arguments in src/integrations/supabase/types.ts;
  - the check (scripts/admin-tables.ts): every file under src/features that draws a `DataTable`, not only the admin's (TBL-5);
  - the unit tests ML-U1…ML-U3 (the answer's renew fields), ML-U12…ML-U16, TBL-4, TBL-5, HS-26, HS-27;
  - the strings (below), the docs (my-listings, display-primitives), the public-surface allowlist's `my_listings` line, the changelog and the roadmap.
- The usage maps (docs/generated/i18n-usage.json, public/i18n-usage.json) are regenerated by you with `bun run i18n:usage`; the hashes below say what they must be.
- THE TESTS (below): you edit MLP-3 and two helpers, and write MLP-5, MLP-6, MLP-7 and MLA-12.

THE STRINGS (English / Amharic; the supervisor's, read before they ship — G43; they travel in the carrier).
New, 13:
  - `myListings.col.photo`: "Photo" / «ፎቶ»
  - `myListings.edit`: "Edit" / «አርትዕ»
  - `myListings.searchPlaceholder`: "Search your ads by title" / «ማስታወቂያዎችዎን በአርዕስት ይፈልጉ»
  - `myListings.filter.mark`: "Marks" / «ምልክቶች»
  - `myListings.done.delete`: "Deleted." / «ተሰርዟል።»
  - `myListings.bulk.title`: "{count} ads selected" / «{count} ማስታወቂያዎች ተመርጠዋል»
  - `myListings.bulk.sellMixed`: "Mark as sold, rented or filled" / «እንደተሸጠ፣ እንደተከራየ ወይም እንደተሞላ ምልክት አድርግ»
  - `myListings.bulk.sellBody`: "People will see each one marked {word} and can no longer contact you about it. You cannot undo this." / «ሰዎች እያንዳንዱን {word} የሚል ምልክት ይዞ ያዩታል፤ ስለእሱ ከእንግዲህ ሊያገኙዎት አይችሉም። ይህን መቀልበስ አይችሉም።»
  - `myListings.bulk.closeBody`: "They leave the site. Each one keeps its remaining days until you reopen it." / «ከድረ-ገጹ ይወጣሉ። እያንዳንዱ እንደገና እስኪከፍቱት ድረስ የቀሩት ቀናቱ ይቆያሉ።»
  - `myListings.bulk.renewBody`: "Each one is live again for {days} days." / «እያንዳንዱ ለ{days} ቀናት እንደገና በቀጥታ ይሆናል።»
  - `myListings.bulk.deleteBody`: "They are removed from your listings and from the site for good. You cannot undo this." / «ከማስታወቂያዎችዎ እና ከድረ-ገጹ ለዘለቄታው ይወገዳሉ። ይህን መቀልበስ አይችሉም።»
  - `myListings.bulk.done`: "Changed: {count}." / «የተቀየሩ፦ {count}።»
  - `myListings.bulk.refused`: "Not changed: {count}. {reason}" / «ያልተቀየሩ፦ {count}። {reason}»
Changed, 1 (the panel's name, D182 1):
  - `panel.myListings`: "Seller Centre" / «የሻጭ ማዕከል» (was "My Listings" / «የእኔ ማስታወቂያዎች»)
Removed, 1 (the ad page's action bar has no heading):
  - `myListings.ad.actions` (was "What you can do" / «ማድረግ የሚችሉት»)

DECIDED BY THE OPERATOR (D182, 2026-10-15)
- The panel is named "Seller Centre" («የሻጭ ማዕከል»); its item stays "My listings".
- Several ads at once: yes, on computers — tick-boxes from tablet width up; a phone acts one ad at a time.
- The menu items not built yet (Dashboard, Messages, Featured) stay visible.
- "Post a similar ad" in each ad's menu — it comes with the edit turn.

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- A published ad's Edit comes with the edit turn (D172, next): this turn, Edit is on a draft (the posting form); every ad keeps Open, its own actions and Delete.
- The status groups stay the house's pills above the table, as the admin's All listings shows its views (the walk passed them: "ok for now").
- Columns: Photo, Title (locked), Price, Status, Posted, Ends; Posted and Ends only in the table (from 1280 px).
- Several ads at once: Mark as sold (by the ads' word, or "Mark as sold, rented or filled" for a mix), No longer available, Renew, Delete — each for the ticked ads that offer it, asking first with their count, run ad by ad; the rate limit stops the set.
- The phone's bottom bar carries the panel's name, "Seller Centre", as it carries "Account".
- The admin's renew setting comes with the list's answer, so a row offers Renew only when it is on.
- One ad's page: the main next step is filled; Delete's confirm button is red on both pages.
- The next turns: the edit in boxes with Post a similar ad and the admin's renew Settings box (D172, D182 4), then the photo review (D178).

THE TESTS — you edit and write them this turn, from the descriptions below (Tier B). The supervisor ran the migration's behaviour on its local stand-in; your tests prove the door, the pages and the actions on ethio-staging.
General rules (each applies to every test):
- Each new test goes in its file's own `test.describe`, after the file's last test, titled exactly as below; reuse the file's own helpers (named below). At most two leased accounts per test (DEC-174).
- Every listing, category, place and notice row is a scratch row the test seeds through the service client or the seller's own doors and removes (J3, G27); no real row is changed; every row is found by its own id (G28). No test writes `listing_policy`.
- Text is typed by the keyboard (`click`, then `page.keyboard.type`); a box is cleared with Control+A and Backspace.
- Words are asserted from en.ts (`en["…"]`), with `{count}`, `{word}` and `{days}` filled as the page fills them.
- G38: no assertion loosened, no timeout raised, no retry added, no dial raised.

THE EDITS (nothing else in these tests changes):
- e2e/my-listings-page.spec.ts, `scratchSeller`: it also returns `parentId` (the branch's parent's id). `seed`: its options gain `title?: string` (used in place of the generated title when given; the default unchanged).
- MLP-3 (e2e/my-listings-page.spec.ts), after `expectActivePanel(page, "my-listings")`: the panel is named en["panel.myListings"] — from 768 px `panel-tab-my-listings` contains it; below, `bottom-bar-my-listings` contains it — and the panel's item (`rail-item-ml-listings`, or `strip-item-ml-listings` below 768 px, as the test already reads it) contains en["nav.myListings"].

MLP-5 "MLP-5 my_listings: the search, the filters and the renew setting; the counts follow them (D181)" (e2e/my-listings-page.spec.ts; `scratchSeller`, `seed`, `asPerson`, `seedCategoryBranch`)
- Seller A (`scratchSeller`, branch 1); a second branch for A's ads (`seedCategoryBranch`, pushed to `branches` so it is removed with the others). A's ads, all live unless said: X1 on branch 1's leaf titled "Red phone"; X2 on branch 1's leaf titled "RED PHONE case", Reserved through `set_listing_reserved` as A; X3 on branch 2's leaf titled "Blue chair", its price dropped through `set_listing_price` as A (100 to 90, as `seedBoth` does for X); X4 on branch 1's leaf titled "Old phone", its price dropped the same way, then sold (the service client's update `{ status: "sold" }`). Seller B (`scratchSeller`): B1 live titled "Red phone". (The door reads the caller's own ads only, so these plain titles cannot meet another test's.)
- As A, through `my_listings` with named arguments (group "live" unless said; compare ids as sorted sets):
  - p_search "red phone" → {X1, X2}; counts live 2, every other group 0;
  - p_search "  PHONE " (capitals, spaces around) → {X1, X2}; counts live 2, sold 1, every other group 0;
  - p_category branch 1's parent → {X1, X2}, counts live 2, sold 1; p_category branch 2's parent → {X3}, counts live 1, sold 0;
  - p_mark "reserved" → {X2}; p_mark "reduced" → {X3}; group "sold" with p_mark "reduced" → no row, counts sold 0;
  - p_search "phone", p_category branch 1's parent and p_mark "reserved" together → {X2};
  - no answer of A's holds B1; as B, p_search "red phone" → {B1}, counts live 1;
  - the answer's `renewAllowed` and `renewDays` equal `my_listing`'s for X1;
  - p_search of 101 letters → the error "bad search"; p_mark "gone" → "unknown mark".

MLP-6 "MLP-6 My listings on the table blocks: the header, the search, Filters with chips, Columns and each row's actions (D181)" (e2e/my-listings-page.spec.ts; `scratchSeller`, `seed`, `twin`, `box`, `listingTruth`, `isMobile`, `expectNoHorizontalOverflow` from ./helpers/ui; both projects)
- Seller A; k = `token()`; X live titled "<k> Red phone"; Y live titled "<k> Blue chair"; D a draft. Open /my-listings.
- `my-listings-header`'s level-1 heading reads en["nav.myListings"]; `my-listings-post` is visible; it opens /post; back to /my-listings. The toolbar's order is `my-listings-search`, `my-listings-filters`, `my-listings-columns` (as AL-10 reads the admin's). No sideways scroll (`expectNoHorizontalOverflow`).
- Type "<k> red" in `my-listings-search`: X's twin is visible, Y's twins (`my-listing-<Y>` and `my-listing-<Y>-card`) count 0, `my-listings-group-live` reads `${en["myListings.group.live"]} (1)`. Clear the box: both again, (2).
- X's box: `my-listing-<X>-delete` is visible, `my-listing-<X>-edit` counts 0. Open `my-listing-<X>-more`: `my-listing-<X>-menu`'s items, in order, are `-more-open`, `-more-reserve`, `-more-sell`, `-more-close`. Choose `my-listing-<X>-more-reserve`: `my-listings-notice` reads en["myListings.done.reserve"]; X's twin shows `my-listing-<X>-reserved`; X's `reserved_at` is set.
- Filters: open `my-listings-filters`, choose `my-listings-filter-mark-reserved` in `my-listings-filters-panel`, Escape: `my-listings-chips-chip-mark` contains en["myListings.reserved"]; X's twin visible, Y's count 0; then `my-listings-chips-clear`: Y's twin visible again.
- From 1280 px only: open `my-listings-columns`; `my-listings-columns-title` is disabled; switch `my-listings-columns-price` off, Escape: `data-table-col-price` counts 0, and still 0 after the page is opened again; switch it back on.
- Below 768 px only: X's card box holds `my-listing-<X>-lead` with `my-listing-<X>-picture` in it.
- `my-listings-group-drafts`: D's box holds `my-listing-<D>-edit` and `my-listing-<D>-delete` and no `my-listing-<D>-more`; `my-listing-<D>-edit` opens /post/<D>.
- Back on /my-listings: Y's `my-listing-<Y>-delete`; `my-listings-confirm` contains en["myListings.confirm.deleteTitle"]; `my-listings-confirm-yes`: `my-listings-notice` reads en["myListings.done.delete"], Y's twins count 0, and Y's `deleted_at` is set (read through the service client).

MLP-7 "MLP-7 several ads at once from tablet width up; a phone acts one ad at a time (D182 2)" (e2e/my-listings-page.spec.ts; `scratchSeller`, `seed`, `asPerson`, `box`; both projects)
- Seller A; X and Y live; S sold. Open /my-listings.
- Below 768 px: X's box holds `my-listing-<X>-select` and it is not visible; `data-table-selection` counts 0. The test ends there for this project.
- From 768 px: tick X and Y (from 1280 px the table's `my-listing-<id>-select-cell`; below it the card's `my-listing-<id>-select`). `data-table-selection` holds `my-listings-bulk-sell` reading en["myListings.action.sell"], `my-listings-bulk-close` and `my-listings-bulk-delete`, and no `my-listings-bulk-renew`. Choose `my-listings-bulk-close`: `my-listings-confirm` contains en["myListings.bulk.title"] with {count} 2 and en["myListings.bulk.closeBody"]; `my-listings-confirm-yes`: `my-listings-notice` reads en["myListings.bulk.done"] with {count} 2; X and Y are closed in the database; `my-listings-group-closed` reads `${en["myListings.group.closed"]} (2)`.
- In Closed, tick X and Y, choose `my-listings-bulk-delete`, Yes: the notice reads en["myListings.bulk.done"] with {count} 2; both `deleted_at` set; S untouched (still sold, not deleted).

MLA-12 "MLA-12 the ad's actions are one bar under the title, its main next step filled (D181)" (e2e/my-listings-ad.spec.ts; `scratchSeller`, `seed`, `openAd`, `actionButtons`; both projects)
- X live. Open its page: `my-listing-actions` holds no heading; its top is below the page's level-1 heading and above `my-listing-status`'s top (bounding boxes).
- `my-listing-action-sell`'s computed background colour differs from `my-listing-action-close`'s (the main step is filled; the others are outlined).
- Below 768 px every one of `actionButtons(page)` is as wide as `my-listing-actions` (within 1 px); from 1280 px they share one row (equal tops).
- No longer available: then `my-listing-action-reopen`'s background colour differs from `my-listing-action-sell`'s.

After writing them: `node_modules/.bin/prettier --write e2e/my-listings-page.spec.ts e2e/my-listings-ad.spec.ts`. No other test is edited.

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, dev af5998e0 with this turn's carrier files)
- Clean: typecheck (it covers e2e/), format, lint (0 errors, 33 warnings), 875 unit tests (151 files), the usage maps regenerated (they match), the hardcoded-strings guard (0 findings), the import, listing-write and browse-path guards, the e2e selector's self-test, the root-routes check, the build and the bundle budget (first-paint JS 315.2 KiB of 320; 315.1 on the base).
- TBL-5 red first: the check, run on the base's my-listings-page.tsx, refuses it under T1, T2, T3 and T5; on this turn's tree every table passes.
- The migration on a local PostgreSQL 16 over stand-in tables holding turns 1–3c and `cat_descendants`: applied cleanly, its proofs passed, with LF and with CRLF line endings. Behaviour: the search (case and spaces ignored), a category with its descendants, Reserved, Price reduced (a sold ad excluded), the three together, the counts following each, named arguments, another seller's ad never answered, the renew setting on and off. A copy changed beyond the named changes was refused by P3.
- `scripts/check-migrations.sh` with this migration as 20261015200000_b16r1-check.sql: "Migration guard OK".
- The Amharic strings were checked by script: Ethiopic letters and punctuation only, the placeholders equal to the English.
- Not run by the supervisor: the browser tests (its sandbox cannot reach ethio-staging). CI on the final commit runs them.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-16-turn-r1.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines. Whatever it shows, go on: the CI read is the supervisor's, and a fix it needs comes in the next turn. Do not stop on it. You cannot git-fetch that branch. Paste `git rev-parse HEAD`: this is <START>;
  2. step 0;
  3. the census (below), files and database. If any result differs from what it expects, STOP and report: write nothing else. One exception, known in advance: if the platform has regenerated src/routeTree.gen.ts since turn 3c, name the difference and go on;
  4. the carrier, then `bun run i18n:usage`, then the hashes;
  5. THE TESTS (the edits, then the new tests);
  6. the checks;
  7. the migration LAST, then its read-back;
  8. the report;
  9. END THE TURN.
  Do not stop between steps.
- The migration is the last thing written, because the database tool applies it on ethio-prod the moment it is saved. The operator will see the "Modify Supabase database" dialog and allow it. The published site keeps working: the published page calls `my_listings` with three named arguments, which the new door still takes (the new ones have defaults), and it ignores the two new keys of the answer until the next Publish.
- The carrier's sections end with a newline each, blank lines included: write every section's bytes exactly as they stand between its header line and the next header. Check each written file's sha256 against the table before you go on.
- This turn changes `my_listings`' arguments, and src/integrations/supabase/types.ts travels in the carrier with them, in the generator's own form. If the platform regenerates that file after the migration and its sha256 then differs from the table, paste `git diff` of it in the report and keep the platform's file.
- If any rule of yours conflicts with the text, STOP before saving and quote that rule's exact words in the report.
- Scope — these files only: the 23 paths of the hash table (the carrier's files and the two usage maps), the brief, e2e/my-listings-page.spec.ts, e2e/my-listings-ad.spec.ts and the one new migration file (the database tool names it). The database: ethio-prod through your tools — SELECT only, except the migration itself. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-16-turn-r1.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 20 files → each equal to:
  f484e1537d6a0f6f54531a778683d3e7e6261ec36f5e57b8185c0fbf2cd55a94  docs/_changelog.md
  4389e6045aa410bffa14799fafc66c57c6bea6d171ff078c1caed8ce2270e6d0  docs/features/display-primitives.md
  083f1b1141fdb7c4779cb5f0bd85864145b88a4a5164370b4d6e310a68c06904  docs/features/my-listings.md
  78ee1a6a10d6f23ec7ebac6f8bfde381be62840ef1ada8ff47738dfa2baea3cf  roadmap.md
  6a7da62c5914f6405e7c8dd3a58274207bb7ed8b5929b061feb01bebde0ede0b  scripts/admin-tables.test.ts
  34bcbc2194be961cb511badf6d8c320dcf8f988031bac3ab5cfdf11ba8dccbc6  scripts/admin-tables.ts
  2d46133dd43fef4dc811c414167422e48c5ae0ed327b0ce15e0a6f7d5d748008  scripts/public-surface-allowlist.txt
  6c2875b34e6a1ed39b30920228b6683b85e82209033093d7df3c3a2c5ee26dd5  src/components/shell/bottom-bar.tsx
  8fdea5b4dbfad684894d683f1e8dc18aff712d1db68dcf3b717aeb40b8d79525  src/components/shell/data-table.test.tsx
  6a43502e669d3415ad693aebeb14d429f863bd9c302052542f9b9f8753bc72e0  src/components/shell/data-table.tsx
  e2ca97817392e9f2758f7b8bfabc237adce9a02b536553143c74fb83917af041  src/features/admin/users/use-admin-users.ts
  4571787b1d5fa0666c0e89738554c6bcc5461ae48a11dcf82df5b1e17aae2e07  src/features/my-listings/my-listing-page.tsx
  ca09cd0c554d5584d6e6ffa09c6d9ced47e01aa1a3980f6a952dc7a4d440e066  src/features/my-listings/my-listing.test.ts
  682a9546fcec7e1f98763c171edec166b58e332223337af1263015972ab74a90  src/features/my-listings/my-listing.ts
  27ec56b084b9bcb7f108ec36c8926fe8209469599cb94821c512c45630dab20b  src/features/my-listings/my-listings-page.tsx
  4d7119e03a79d273e21bc0205f20b6bf81bbfe26005f51978256f5e40fe577c5  src/features/my-listings/my-listings.test.ts
  7d221c407d2bd64e391fc17cf618b704cea8e5111c9a5e7898c50ab3e7350f4f  src/features/my-listings/my-listings.ts
  c7e36499a18737c74feffc8d12937484ebc3385ac4af26cd39a797399f780709  src/i18n/locales/am.ts
  b9b6a183bc30d6ad0c9908cf711aef24e2d3c5eafb4a86e45675e4cd0d1fb559  src/i18n/locales/en.ts
  bae3713c975d32e06e7895ac9e3c30e9d3e38cd2bf71c8befc89d28c596df278  src/integrations/supabase/types.ts
  and `ls src/hooks/use-debounced.ts 2>/dev/null` → nothing (the file does not exist yet).
- (c) `sha256sum e2e/my-listings-page.spec.ts e2e/my-listings-ad.spec.ts` → 37e30577d3f23455c76393bfc7623928eccfd56faebef2d30d51b7c8a07b9da6 and 6c933876342dc2f3dd9c662bb4a4a03b36e5847af80230c4e29619163bdc13d2; `ls supabase/migrations | tail -1` → 20261015023155_3600a562-cf32-4d54-9319-940dfc144aeb.sql (turn 3c's; no migration since).
- (d) ethio-prod, your query tool (SELECT only):
  - `select max(version) from public.migration_marks;` → 20261015170000;
  - `select p.oid::regprocedure, md5(replace(p.prosrc, chr(13), '')) from pg_proc p where p.proname = 'my_listings' and p.pronamespace = 'public'::regnamespace;` → one row: my_listings(text,integer,integer) | b53c2225fc95924b99817d57d56ee9cb;
  - `select to_regprocedure('public.cat_descendants(uuid)') is not null;` → t.

THE CARRIER — B16R1-TURN-CARRIER-2026-10-15.md (71,177 bytes; sha256 c454699f2d48b17d668262b3295dfec03a34e4df359e727b178ea2fec41ca57c; 66 sections)
- Its first line starts "B16R1 TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`. No blank line separates the sections.
- Modes:
  - REPLACE: the section is the whole file;
  - NEW: a new file; the section is the whole file (create its folder if needed);
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file (INSERT-AFTER 0: at the top of the file);
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed. If your upload arrives under another name, match it by its size and sha256.
- The two usage maps are not in the carrier: after the carrier, run `bun run i18n:usage`; it writes them from the tree, and their hashes are in the table.

THE HASHES — `sha256sum` each of the 23 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  8263c925e1532e827512ec1942b3e271b06069820f934a15285b11d7da117b0e  docs/_changelog.md
  70705c4620257727ae25cc99c287d5aa45931032caed464c7f8b59b539cd84f2  docs/features/display-primitives.md
  bd247056c26681098ebc104602937048f4dbe29db3bcc6b139f92c74167d98d1  docs/features/my-listings.md
  4550b9f9f6a00d14d800071c183b87b3ea1d6f7953f0fbf447394748149b9004  docs/generated/i18n-usage.json
  4550b9f9f6a00d14d800071c183b87b3ea1d6f7953f0fbf447394748149b9004  public/i18n-usage.json
  3317d8aa9ad7c292bc5a2bcde72fc584216988b4f5e94ab7bd7fadb64ffa5299  roadmap.md
  3637141ae20e88b719655800a47636df55bf4b7e10c4da99dfae5b76bdb74f84  scripts/admin-tables.test.ts
  12fc6655cc8822996486e37894af7175767ba9ba3f276406e6c856b4e30e6fbb  scripts/admin-tables.ts
  7777c15cfa84ba14ae32034449a1d94d1aeb7c5db9df2a13365188925ca7b7c3  scripts/public-surface-allowlist.txt
  fbb5448d915cb5c39f44872d727bc037407128b2b03a7cb3bbe4de5356131b98  src/components/shell/bottom-bar.tsx
  c6c070a923330de2651016453018e153892aa4b41c030bd8c66c67754c207b9d  src/components/shell/data-table.test.tsx
  a31953806f8902f56fd7c85bb7d430b73df1c3f7f6b0d2271ff6d34d026ee969  src/components/shell/data-table.tsx
  0f3576870b3a076bd0e9de4164e02b27f556546dc4bb09ab58c9d74d4aa3f117  src/features/admin/users/use-admin-users.ts
  415431493ae769407e45d82a71d7d843dd013b36de4690fc617cced82c692382  src/features/my-listings/my-listing-page.tsx
  9504977c244277ae1a043d92d29b9c6ed2b73fcc0e3639e93af01490de67392f  src/features/my-listings/my-listing.test.ts
  1bf906b9902fca3f9077171372ec4dd4acf03a612062d5dad0161268780f6126  src/features/my-listings/my-listing.ts
  f30afe83d5384d1e62139534d266a889c9e6069e7384be1f2ccedf3d77c1a6b1  src/features/my-listings/my-listings-page.tsx
  084ac0155c14cf4174da1c223b0a3457a6dbae58d398c4015aed5bd4fa0b31a7  src/features/my-listings/my-listings.test.ts
  91f07a64fd7a94df4b5818c7a27c65e7769be1313a5b3f337de6fde3c54ea28c  src/features/my-listings/my-listings.ts
  da8b5ba57dcf266fc38311fb53cfec8fcaa6440afcd78223aa56dd8ee1348f05  src/hooks/use-debounced.ts
  a6b087eeef6d8213df4829d355861ed1d57d7237eeb2e3129d370e0a2d752067  src/i18n/locales/am.ts
  7910f04b2d510ab6b311a306290b32d8f174b56bd0640ace5dc020053896542b  src/i18n/locales/en.ts
  c32787480a6f56038192dab2ed88332536fdea8b8f468c968b907d6ceda5b274  src/integrations/supabase/types.ts

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings — a warning in a test file of yours is fixed, not left;
- `bun run test:unit 2>&1 | tee /tmp/unit-b16r1.log` — 875 passed (151 files). Keep the whole output; if any test fails, paste its name and its first error line;
- `bun run i18n:map-guard` "usage maps match the tree.";
- `bash scripts/check-hardcoded-strings.sh` "findings: 0";
- `bun run scripts/e2e-select.ts --self-test` OK;
- `grep -n 'test("MLP-5\|test("MLP-6\|test("MLP-7\|test("MLA-12' e2e/*.spec.ts` → four lines, each in its file;
- Not run by you: the typecheck, the build and the bundle budget (your platform's rule). CI judges them.

THE BROWSER RUN — not this turn: the local browser does not start (INC-506). CI on the final commit runs every spec, yours included. A red in your tests is fixed in the next turn, at its cause (G38).

THE MIGRATION RULES (G39 — every one applies)
- The text is between the BEGIN and END lines of the appendix below. Write it EXACTLY, changing only `<MARK>`. Before the change, its sha256 is 70cb23938e77fc295e1f0ce36872b889a77e9e255ddfa420d6cde13925269e00 (16,008 bytes, 266 lines, ending with a newline).
- Check it in a scratch folder first (after the checks):
  - copy supabase/migrations/*.sql into a temporary folder;
  - add the text, its `<MARK>` replaced by the mark you will use, under the name 20261015200000_b16r1-check.sql;
  - run `MIGRATIONS_DIR=<that folder> bash scripts/check-migrations.sh`.
  Paste its "guard OK" lines and "Migration guard OK".
- `<MARK>` is chosen at apply time:
  - read now() at time zone 'utc' on ethio-prod;
  - round it up to the next whole hour and add one hour (add twelve hours instead if the save dialog may wait);
  - if the result is below 20261015200000, use 20261015200000 (above 20261015170000, turn 3c's mark, and equal to the scratch check's stamp);
  - the mark must also be later than the saved file's own stamp.
- Then hand the FINAL text to the database tool ONCE. Never a stub, a comment or a draft (INC-491).
- A clean apply is the proofs' pass: they RAISE EXCEPTION on any failure.

THE READ-BACK (ethio-prod, your query tool, SELECT only; paste each result)
- `select version from public.migration_marks where version = '<MARK>';` → one row;
- the census (d) query of the body again → one row: my_listings(text,integer,integer,text,uuid,text) | a83c2bd9f15b608e75b4c1893b5ac320;
- `select p.provolatile, p.prosecdef, p.proconfig, has_function_privilege('anon', p.oid, 'EXECUTE'), has_function_privilege('authenticated', p.oid, 'EXECUTE') from pg_proc p where p.oid = 'public.my_listings(text,integer,integer,text,uuid,text)'::regprocedure;` → s | t | {search_path=public} | f | t.

THE REPORT
- Done or not done, by step.
- The six ci-status lines, and <START>.
- The census results (a)–(d).
- The 23 sha256sum lines and the brief's; the sha256sum and line count of each of your two test files, and `git diff <START> -- e2e/my-listings-page.spec.ts e2e/my-listings-ad.spec.ts | head -700`.
- `git diff --name-only <START>` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only <START> HEAD` too. Expect the 23 paths, the brief, your two test files and the one migration file.
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
-- Bundle 16 (My listings), turn R1 (2026-10-15). Tier A. The seller's search and filters on My listings (D181: the
-- page on the site's agreed table blocks — the search, Filters and Columns; INC-630).
-- e2e-areas: my-listings
--
-- A. my_listings, redeclared whole from 20261015012743 (turn 3b) with three new arguments, each optional:
--    p_search (words of the title, at most 100 characters), p_category (a category with everything under it,
--    cat_descendants) and p_mark ('reserved' or 'reduced' — the "Price reduced" mark while its 14 days stand, never on a
--    sold ad). The six counts follow the search and the filters, as the rows do. The argument list changes, so the old
--    signature is dropped and its REVOKE and GRANT are restated for the new one. The answer gains the admin's renew
--    setting (renewAllowed, renewDays — the same values my_listing gives), so a row offers Renew only when it is on.
--    The row object is unchanged: it is still my_listing's, byte for byte (P4).
-- P. Proofs (RAISE EXCEPTION on any failure; a clean apply is the pass): the header and privileges; the old signature
--    gone; the body equal to its earlier body beyond the named changes (carriage returns removed first); the filter in
--    both reads; the row object equal to my_listing's; calls with no session refused; a scratch identity that owns
--    nothing answered with six zero counts under every filter, and with the renew setting; an unknown mark and a long
--    search refused. What the filters do with real ads is proven by MLP-5 and MLP-6 (e2e/my-listings-page.spec.ts).

-- ===== A — my_listings (redeclared whole, three new arguments) =====
DROP FUNCTION IF EXISTS public.my_listings(text, integer, integer);
CREATE OR REPLACE FUNCTION public.my_listings(p_group text, p_limit integer DEFAULT 50, p_offset integer DEFAULT 0,
                                             p_search text DEFAULT NULL, p_category uuid DEFAULT NULL,
                                             p_mark text DEFAULT NULL)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid    uuid := auth.uid();
  v_counts jsonb;
  v_rows   jsonb;
  v_term   text := lower(btrim(coalesce(p_search, '')));
  v_policy public.listing_policy%ROWTYPE;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF p_group IS NULL OR p_group NOT IN ('live','review','attention','closed','sold','drafts') THEN
    RAISE EXCEPTION 'unknown group';
  END IF;
  IF p_limit IS NULL OR p_limit < 1 OR p_limit > 100 OR p_offset IS NULL OR p_offset < 0 THEN
    RAISE EXCEPTION 'bad page';
  END IF;
  -- Bundle 16 turn R1 (D181) — the seller's search (words of the title) and filters (a category with everything
  -- under it; Reserved; Price reduced).
  IF length(v_term) > 100 THEN RAISE EXCEPTION 'bad search'; END IF;
  IF p_mark IS NOT NULL AND p_mark NOT IN ('reserved','reduced') THEN RAISE EXCEPTION 'unknown mark'; END IF;

  -- The groups of My listings (D138, D173–D175): live (active, reduced — reach is staff's lever and is not shown),
  -- in review (screening, held), needs attention (rejected, removed), closed (closed, expired), sold, drafts.
  WITH mine AS (
    SELECT l.status,
           CASE l.status
             WHEN 'active' THEN 'live'      WHEN 'reduced' THEN 'live'
             WHEN 'screening' THEN 'review' WHEN 'held' THEN 'review'
             WHEN 'rejected' THEN 'attention' WHEN 'removed' THEN 'attention'
             WHEN 'closed' THEN 'closed'    WHEN 'expired' THEN 'closed'
             WHEN 'sold' THEN 'sold'        WHEN 'draft' THEN 'drafts'
           END AS grp
      FROM public.listings l
     WHERE l.seller_id = v_uid
       AND l.deleted_at IS NULL
       -- Bundle 16 turn R1 (D181) — the seller's search and filters; the counts follow them.
       AND (v_term = '' OR position(v_term IN lower(coalesce(l.title, ''))) > 0)
       AND (p_category IS NULL OR l.category_id IN (SELECT d.id FROM public.cat_descendants(p_category) d))
       AND (p_mark IS NULL
            OR (p_mark = 'reserved' AND l.reserved_at IS NOT NULL)
            OR (p_mark = 'reduced' AND l.status <> 'sold' AND l.price_drop_at > now() - interval '14 days'))
  )
  SELECT jsonb_build_object(
           'live',      count(*) FILTER (WHERE grp = 'live'),
           'review',    count(*) FILTER (WHERE grp = 'review'),
           'attention', count(*) FILTER (WHERE grp = 'attention'),
           'closed',    count(*) FILTER (WHERE grp = 'closed'),
           'sold',      count(*) FILTER (WHERE grp = 'sold'),
           'drafts',    count(*) FILTER (WHERE grp = 'drafts'))
    INTO v_counts
    FROM mine;

  SELECT coalesce(jsonb_agg(r.row ORDER BY r.changed DESC, r.id DESC), '[]'::jsonb)
    INTO v_rows
    FROM (
      SELECT l.id, coalesce(l.updated_at, l.created_at) AS changed,
             jsonb_build_object(
               'id', l.id,
               'status', l.status,
               'title', l.title,
               'categoryId', l.category_id,
               'coverPhotoId', (SELECT p.id FROM public.listing_photos p
                                 WHERE p.listing_id = l.id AND p.exif_stripped
                                 ORDER BY p.display_order
                                 LIMIT 1),
               'photosSoon', l.photos_soon,
               'priceMode', l.price_mode,
               'priceAmount', l.price_amount,
               'priceCurrency', l.price_currency,
               'pricePeriod', l.price_period,
               'priceBp', l.price_bp,
               'priceNegotiable', l.price_negotiable,
               'priceUnit', l.price_unit,
               'priceUnitText', l.price_unit_text,
               -- D173 2 — the "Price reduced" record while its 14 days stand.
               'priceWas', CASE WHEN l.price_drop_at > now() - interval '14 days' THEN l.price_was END,
               'reserved', l.reserved_at IS NOT NULL,
               'publishedFirstAt', l.published_first_at,
               'publishedAt', l.published_at,
               'renewedAt', l.renewed_at,
               'expiresAt', l.expires_at,
               -- The days an ad has left (live) or keeps while closed: whole days, rounded up; null with no end date.
               'daysLeft', CASE WHEN l.status IN ('active','reduced') AND l.expires_at IS NOT NULL
                                THEN greatest(0, ceil(extract(epoch FROM (l.expires_at - now())) / 86400))::integer END,
               'daysKept', CASE WHEN l.status = 'closed' AND l.kept_remaining IS NOT NULL
                                THEN greatest(0, ceil(extract(epoch FROM l.kept_remaining) / 86400))::integer END,
               'soldAt', l.sold_at,
               -- Bundle 16 turn 3b (call H) — the word a sold ad takes: Rented or Filled when its category says so.
               'soldWord', coalesce((SELECT CASE WHEN 'rented' = ANY (c.capabilities) THEN 'rented'
                                                 WHEN 'filled' = ANY (c.capabilities) THEN 'filled' END
                                       FROM public.categories c WHERE c.id = l.category_id), 'sold'),
               'createdAt', l.created_at,
               'updatedAt', l.updated_at,
               -- A removed ad's latest staff reason (seller_notices, which the seller already reads).
               'removedReason', CASE WHEN l.status = 'removed' THEN
                                  (SELECT sn.reason FROM public.seller_notices sn
                                    WHERE sn.listing_id = l.id AND sn.seller_id = v_uid AND sn.kind = 'admin_remove'
                                    ORDER BY sn.created_at DESC
                                    LIMIT 1) END) AS row
        FROM public.listings l
       WHERE l.seller_id = v_uid
         AND l.deleted_at IS NULL
         -- Bundle 16 turn R1 (D181) — the seller's search and filters; the counts follow them.
         AND (v_term = '' OR position(v_term IN lower(coalesce(l.title, ''))) > 0)
         AND (p_category IS NULL OR l.category_id IN (SELECT d.id FROM public.cat_descendants(p_category) d))
         AND (p_mark IS NULL
              OR (p_mark = 'reserved' AND l.reserved_at IS NOT NULL)
              OR (p_mark = 'reduced' AND l.status <> 'sold' AND l.price_drop_at > now() - interval '14 days'))
         AND CASE l.status
               WHEN 'active' THEN 'live'      WHEN 'reduced' THEN 'live'
               WHEN 'screening' THEN 'review' WHEN 'held' THEN 'review'
               WHEN 'rejected' THEN 'attention' WHEN 'removed' THEN 'attention'
               WHEN 'closed' THEN 'closed'    WHEN 'expired' THEN 'closed'
               WHEN 'sold' THEN 'sold'        WHEN 'draft' THEN 'drafts'
             END = p_group
       ORDER BY coalesce(l.updated_at, l.created_at) DESC, l.id DESC
       LIMIT p_limit OFFSET p_offset
    ) r;

  -- Bundle 16 turn R1 (D181) — the admin's renew setting, as my_listing gives it, for the rows' Renew.
  SELECT * INTO v_policy FROM public.listing_policy WHERE id;
  RETURN jsonb_build_object('counts', v_counts, 'rows', v_rows,
                            'renewAllowed', coalesce(v_policy.renew_allowed, false),
                            'renewDays', v_policy.renew_days);
END $function$;
REVOKE ALL ON FUNCTION public.my_listings(text, integer, integer, text, uuid, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.my_listings(text, integer, integer, text, uuid, text) TO authenticated;
GRANT ALL ON FUNCTION public.my_listings(text, integer, integer, text, uuid, text) TO service_role;

-- ===== P — proofs (RAISE EXCEPTION on any failure; a clean apply is the pass) =====
DO $proof$
DECLARE
  v_n    integer;
  v_msg  text;
  v_md5  text;
  v_src  text;
  v_seg  text;
  v_out  jsonb;
  v_zero jsonb := jsonb_build_object(
    'counts', jsonb_build_object('live', 0, 'review', 0, 'attention', 0, 'closed', 0, 'sold', 0, 'drafts', 0),
    'rows', '[]'::jsonb);
BEGIN
  -- P1. The header; the old signature is gone.
  SELECT count(*) INTO v_n FROM pg_proc
   WHERE oid = 'public.my_listings(text,integer,integer,text,uuid,text)'::regprocedure
     AND provolatile = 's' AND prosecdef AND proconfig = ARRAY['search_path=public'];
  IF v_n <> 1 THEN RAISE EXCEPTION 'B16R1 P1: my_listings is not STABLE SECURITY DEFINER with search_path public'; END IF;
  IF to_regprocedure('public.my_listings(text,integer,integer)') IS NOT NULL THEN
    RAISE EXCEPTION 'B16R1 P1: the old signature of my_listings is still there';
  END IF;

  -- P2. Who may call it: a signed-in user, never anon.
  IF has_function_privilege('anon', 'public.my_listings(text,integer,integer,text,uuid,text)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.my_listings(text,integer,integer,text,uuid,text)', 'EXECUTE') THEN
    RAISE EXCEPTION 'B16R1 P2: my_listings is open to anon or closed to signed-in users';
  END IF;

  -- P3. The body is its earlier body beyond the named changes.
  SELECT md5(replace(replace(replace(replace(regexp_replace(replace(p.prosrc, chr(13), ''), ' *-- Bundle 16 turn R1 \(D181\) — the seller''s search and filters; the counts follow them\.\n([^\n]*\n){5}', '', 'g'), chr(13), ''), replace('  v_rows   jsonb;
  v_term   text := lower(btrim(coalesce(p_search, '''')));
  v_policy public.listing_policy%ROWTYPE;
BEGIN
', chr(13), ''), replace('  v_rows   jsonb;
BEGIN
', chr(13), '')), replace('    RAISE EXCEPTION ''bad page'';
  END IF;
  -- Bundle 16 turn R1 (D181) — the seller''s search (words of the title) and filters (a category with everything
  -- under it; Reserved; Price reduced).
  IF length(v_term) > 100 THEN RAISE EXCEPTION ''bad search''; END IF;
  IF p_mark IS NOT NULL AND p_mark NOT IN (''reserved'',''reduced'') THEN RAISE EXCEPTION ''unknown mark''; END IF;
', chr(13), ''), replace('    RAISE EXCEPTION ''bad page'';
  END IF;
', chr(13), '')), replace('  -- Bundle 16 turn R1 (D181) — the admin''s renew setting, as my_listing gives it, for the rows'' Renew.
  SELECT * INTO v_policy FROM public.listing_policy WHERE id;
  RETURN jsonb_build_object(''counts'', v_counts, ''rows'', v_rows,
                            ''renewAllowed'', coalesce(v_policy.renew_allowed, false),
                            ''renewDays'', v_policy.renew_days);
', chr(13), ''), replace('  RETURN jsonb_build_object(''counts'', v_counts, ''rows'', v_rows);
', chr(13), '')))
    INTO v_md5 FROM pg_proc p WHERE p.oid = 'public.my_listings(text,integer,integer,text,uuid,text)'::regprocedure;
  IF v_md5 IS DISTINCT FROM 'b53c2225fc95924b99817d57d56ee9cb' THEN
    RAISE EXCEPTION 'B16R1 P3: my_listings differs from its earlier body beyond the named changes';
  END IF;

  -- P4. The row object is still my_listing's, byte for byte; the filter is in both reads.
  SELECT replace(prosrc, chr(13), '') INTO v_src FROM pg_proc WHERE oid = 'public.my_listing(uuid)'::regprocedure;
  v_seg := substring(v_src FROM strpos(v_src, 'jsonb_build_object(' || chr(10) || '               ''id'', l.id,'));
  v_seg := substring(v_seg FOR strpos(v_seg, 'LIMIT 1) END)') + length('LIMIT 1) END)') - 1);
  SELECT count(*) INTO v_n FROM pg_proc
   WHERE oid = 'public.my_listings(text,integer,integer,text,uuid,text)'::regprocedure
     AND length(v_seg) > 2000 AND strpos(replace(prosrc, chr(13), ''), v_seg) > 0;
  IF v_n <> 1 THEN RAISE EXCEPTION 'B16R1 P4: my_listings'' row object differs from my_listing''s'; END IF;
  SELECT (length(s) - length(replace(s, 'cat_descendants(p_category)', ''))) / length('cat_descendants(p_category)')
    INTO v_n
    FROM (SELECT replace(prosrc, chr(13), '') AS s FROM pg_proc
           WHERE oid = 'public.my_listings(text,integer,integer,text,uuid,text)'::regprocedure) x;
  IF v_n <> 2 THEN RAISE EXCEPTION 'B16R1 P4: the filter is not in both reads (% found)', v_n; END IF;

  -- P5. No session: refused at the first gate.
  PERFORM set_config('request.jwt.claims', '', true);
  BEGIN
    PERFORM public.my_listings('live', 20, 0, 'a', NULL, 'reserved');
    RAISE EXCEPTION 'B16R1 P5: my_listings answered a call with no session';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'not authenticated' THEN RAISE EXCEPTION 'B16R1 P5: my_listings: %', v_msg; END IF;
  END;

  -- P6. A scratch identity that owns nothing (a fresh uuid; no auth.users row is read or written).
  PERFORM set_config('request.jwt.claims', json_build_object('sub', gen_random_uuid())::text, true);
  v_out := public.my_listings('live', 20, 0);
  IF v_out - 'renewAllowed' - 'renewDays' IS DISTINCT FROM v_zero THEN
    RAISE EXCEPTION 'B16R1 P6: an identity that owns nothing got %', v_out;
  END IF;
  IF jsonb_typeof(v_out -> 'renewAllowed') IS DISTINCT FROM 'boolean'
     OR jsonb_typeof(v_out -> 'renewDays') NOT IN ('number', 'null') THEN
    RAISE EXCEPTION 'B16R1 P6: the renew setting is missing from %', v_out;
  END IF;
  v_out := public.my_listings('sold', 20, 0, 'word', gen_random_uuid(), 'reduced');
  IF v_out - 'renewAllowed' - 'renewDays' IS DISTINCT FROM v_zero THEN
    RAISE EXCEPTION 'B16R1 P6: filtered, an identity that owns nothing got %', v_out;
  END IF;
  BEGIN
    PERFORM public.my_listings('live', 20, 0, NULL, NULL, 'gone');
    RAISE EXCEPTION 'B16R1 P6: an unknown mark was answered';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'unknown mark' THEN RAISE EXCEPTION 'B16R1 P6: unknown mark: %', v_msg; END IF;
  END;
  BEGIN
    PERFORM public.my_listings('live', 20, 0, repeat('a', 101), NULL, NULL);
    RAISE EXCEPTION 'B16R1 P6: a search of 101 characters was answered';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'bad search' THEN RAISE EXCEPTION 'B16R1 P6: bad search: %', v_msg; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '', true);
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('<MARK>') ON CONFLICT (version) DO NOTHING;
----- END MIGRATION -----
```
