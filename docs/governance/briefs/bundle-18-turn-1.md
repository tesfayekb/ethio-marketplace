# Bundle 18 — turn 1: the seller pages' breadcrumbs (D198); the AI counter reads the door before any try (INC-669); one ribbon (INC-670): brief, version 1 (saved unchanged, 2026-10-16)

```text
BUNDLE 18 — TURN 1 (2026-10-16). ONE TURN: CODE BY CARRIER, ONE MIGRATION (written LAST), THREE TESTS BY YOU (one new spec file, one test added, one test changed). One string CHANGED in both languages (no new key). No package change. No file deleted.
Base: dev 64767df2 (bundle 17's records turn). The census below proves every file by content. This file is public: it is written as build instructions.
Tier A: the migration (a rate door's sibling — read-only) and the route's new GET; the rest Tier B (the shell's trail, the details step, the ribbon); Tier C the docs.

ANSWERS TO THE LAST TURN
- Turn 6's report: CLEAN pending CI on 64767df2 (run 964, in progress as this brief is written; the supervisor reads it). Its "not foreseen" 2 (where `judge("d")` leaves the wizard before the Amharic part clears the basis) is decided by PW-162 on that run: if it is red there, the ruling comes with the fix in this turn's next ruling, not here. Nothing else is owed from bundle 17.
- Bundle 17 is closed in the records; this is bundle 18's first turn.

WHY THIS TURN (the operator's bundle-17 walk, 2026-10-16)
- D198 — "breadcrumb in edit should show seller center, all listings etc; breadcrumb should also allow navigation when clicked": the Edit showed Home › Seller Centre with nothing to click. The route-owned pages of the Seller Centre and the Account get a route-derived trail like the admin's, every segment but the current one a link.
- INC-669 — "it already used 1/5 on the first posting so it should have been only 4/5 left and enforced and tested": the details step printed the screen's own count (5 of 5) until the first call answered; the door's budget was always enforced (consume_rate_limit, INC-299) — the display was wrong. The screen now asks the door what is left before any try, through a read that spends nothing.
- INC-670 — "the thickness of all ribbons should look the same including text color, size, style. I see some ribbons appear thin than others": the photos-soon band had its own smaller class set (3.6cqw letters, 1.4cqw padding, 0.04em) beside the status ribbon's (clamp(9px, 6cqw, 22px), 1.6cqw, 0.06em). Every band is now one component with one class set; the band's words are shortened so one size fits every ribbon.

WHAT THIS TURN BUILDS (the carrier)
- src/components/shell/breadcrumbs.tsx — a branch before the feed's for /my-listings, /my-listings/<id>, /my-listings/<id>/edit, /post, /post/<id>, /settings: Home › <panel> › <page> [› <ad> [› Edit]]. The panel crumb (`breadcrumb-panel`) links to the panel's home (panels.ts `homePath`) whenever the address is deeper than it, else a plain name; the page crumb (`breadcrumb-page`: nav.myListings / nav.postListing / settings.navLabel) is a link only under an ad; the ad's crumb is lazy (below); "Edit" (`breadcrumb-edit`, myListings.edit) is current on the Edit. The admin branch takes `/admin/listings/<id>/edit`: the listing crumb becomes a link and "Edit" follows it. The feed, /c/<slug>, /account and /auth keep their trails.
- src/components/shell/seller-crumbs.tsx (NEW) — `MyListingCrumb`: the ad's title from the ad page's own query key (`authKey("my-listing", id)`, `readMyListing`), a link to the ad's page on the Edit, the current segment on the ad's page; "—" until read; truncated at 16rem with the title as tooltip. Loaded only on those two pages (React.lazy, like admin-detail-crumbs).
- src/components/shell/admin-detail-crumbs.tsx — `AdminListingCrumb` takes `link`: a Link to /admin/listings/$listingId when true.
- src/server/supabase/user-client.ts — `peekRate(action, key, limit, window)`: `peek_rate_limit` through the server-only client; `{ remaining, resetsAt }`.
- src/routes/api/listings/assist.ts — `GET /api/listings/assist?listingId=<id>` → `{ ok: true, triesLeft }`: a session; the listing is the caller's own (`ownListingRefusal`, written once for the try and the peek — the POST's owner check moved into it, unchanged); `peekRate("assist:listing", id, 5, "10 years")`. No dial of its own. Refusals: `listingId required`, `listingId notYourListing`, `assist providerUnavailable` on a read error.
- src/features/posting/posting-service.ts — `peekAssist(listingId)`: the GET with the bearer; a number, or null when the route could not say.
- src/features/posting/step-details.tsx — on mount with a listing, `peekAssist` sets `triesLeft`; the counter line (`post-assist-tries`, `data-left`) renders only once the peek has answered (`peeked`); without a listing it renders at once as before. The assist button does not wait for the peek.
- src/components/marketplace/listing-picture.tsx — `ListingRibbon` takes `testId` / `textTestId`; `RIBBON_BAND_CLASS`, `RIBBON_TEXT_CLASS`, `RIBBON_TEXT_STYLE` exported; the photos-soon band is `<ListingRibbon testId="listing-photos-soon-ribbon" textTestId="listing-photos-soon-text">` — its own class set is gone. The ids every test reads are unchanged.
- src/i18n/locales/en.ts and am.ts — `listing.photosSoon`: "PHOTOS SOON" / the first two words of the Amharic value (the value's third word removed; nothing retyped — the carrier carries the bytes). The band's visible run between the picture's edges is about 59cqw; at the one size that fits 14 characters (RB-1's cap).
- src/components/marketplace/ribbon-words.test.ts — RB-1b: 14 characters (was 18). src/components/marketplace/listing-card.test.tsx — LC-6: the band and a status ribbon share one class set and one text style.
- scripts/e2e-select.ts — `e2e/breadcrumbs.spec.ts` in the `shell` and `feed` areas (the self-test requires every spec reachable; the file is yours, test 1 below).
- docs/features/panels.md, docs/features/posting.md, docs/features/admin-listings.md (APPEND / one line), docs/_changelog.md (APPEND), roadmap.md (line 3; the bundle-18 turn-1 line).
- The usage maps change (breadcrumbs.tsx uses four existing keys anew): docs/generated/i18n-usage.json and public/i18n-usage.json are regenerated by `bun run i18n:map-guard` (its first run rewrites them and exits 1; its second run says "usage maps match the tree"); their hashes are in the table.
- THE MIGRATION (the appendix; written LAST in the turn, after the tests and the checks — the platform applies it on save, G35): `peek_rate_limit(text, text, integer, interval)` — the remaining of the current window for an action and key, read without inserting; the same window expression as consume_rate_limit (20260917000149); STABLE SECURITY DEFINER, search_path pinned; REVOKE from PUBLIC, anon, authenticated; EXECUTE to service_role only (no allowlist line: nothing is granted to a client role). Proofs P1–P3 in one DO block on a scratch key under the e2e-mig- namespace: the header; the grants; on the scratch key the peek reads the limit with no row, equals the spend's own answer after each spend, and reads zero past the limit; the scratch rows are deleted (WHERE key AND action) and proven gone. The platform regenerates src/integrations/supabase/types.ts on the apply (the new function's entry); the typecheck is CI's.

THE TESTS (yours; Claude writes none; by hand — three spec files this turn, G37: e2e/breadcrumbs.spec.ts (new), e2e/my-listings-ad.spec.ts, e2e/post-wizard-category.spec.ts)
1. e2e/breadcrumbs.spec.ts (NEW; its `describe` titled "breadcrumbs — the seller's and the account's pages (D198)"). Fixtures modelled on e2e/my-listings-ad.spec.ts: `scratchSeller()` (:209–220 — leaseSeller with alias and name, a scratch category branch, a scratch ET chain) and `seed(seller, "active")` (:229 — a scratch ad of that seller), with the same `afterEach` cleanup as that file's (:184 — the listings, the branches, the chain, the leased accounts); every row scratch (G27); no page-position reads (G28). Read every expected word from `en` (../src/i18n/locales/en). In each test locate the trail as `page.getByTestId("breadcrumbs")` and each crumb by its test id INSIDE it.
   - BC-1 "the ad's page and its Edit: Home › Seller Centre › My listings › <title> › Edit, every segment but the current a link": sign in as the scratch seller (`signInViaSession`), `gotoReady` the ad's page `/my-listings/<id>`: `breadcrumb-home` is a link with href ending "/"; `breadcrumb-panel` is a link (tag A) with text en["panel.myListings"] and href ending "/my-listings"; `breadcrumb-page` is a link with text en["nav.myListings"] and href ending "/my-listings"; `breadcrumb-my-listing` has text the ad's title, is NOT a link (tag not A) and carries aria-current="page"; `breadcrumb-edit` has count 0. Then open the Edit by its URL `/my-listings/<id>/edit` (gotoReady): `breadcrumb-my-listing` is now a link (tag A) with the title as text and href ending `/my-listings/<id>`; `breadcrumb-edit` has text en["myListings.edit"] and aria-current="page". Click `breadcrumb-my-listing`: the URL ends `/my-listings/<id>` (the ad's page). Click `breadcrumb-page`: the URL ends `/my-listings`.
   - BC-2 "the panel's home, Post listing and Settings: Home › Seller Centre › My listings; Home › Seller Centre › Post listing; Home › Account › Settings": the same seller, signed in. On `/my-listings`: `breadcrumb-panel` has text en["panel.myListings"] and is NOT a link (tag SPAN); `breadcrumb-page` has text en["nav.myListings"], is not a link and has aria-current="page"; `breadcrumb-my-listing` count 0. On `/post` (gotoReady; the wizard's step 1): `breadcrumb-panel` is a link with href ending "/my-listings"; `breadcrumb-page` has text en["nav.postListing"] and aria-current="page". On `/settings` (gotoReady): `breadcrumb-panel` is a link with text en["panel.account"] and href ending "/account"; `breadcrumb-page` has text en["settings.navLabel"] and aria-current="page". Click `breadcrumb-panel` on /settings: the URL ends "/account".
   - BC-3 "the admin's listing Edit: … › All listings › <title> › Edit": a scratch seller's active ad as above; `useJobSuperAdmin(page)` as e2e/admin-listings.spec.ts :356 does (imported from ./helpers/ui, as that file's :7–8); `gotoReady` `/admin/listings/<id>/edit`: `breadcrumb-admin-listing` is a link (tag A) with the ad's title as text and href ending `/admin/listings/<id>`; `breadcrumb-edit` has text en["myListings.edit"] and aria-current="page"; `breadcrumb-admin-section` is a link with href ending "/admin/listings". Then `gotoReady` `/admin/listings/<id>`: `breadcrumb-admin-listing` is not a link and has aria-current="page"; `breadcrumb-edit` count 0. The step-up gate may hold the page's body: the trail is read regardless (it is the shell's).
2. e2e/my-listings-ad.spec.ts — add MLA-18 "the Edit's AI counter reads the door: one try spent on the posting leaves 4 of 5 on the Edit, and a try there leaves 3 (INC-669)": a scratch seller with an active scratch ad (the file's `scratchSeller` and `seed`); as that seller, spend ONE try through the route: `POST /api/listings/assist` with a bearer from `passwordGrant` (the file imports it) and the JSON body `{ listingId: <the ad's id>, categoryId: <seller.leafId>, categoryPath: "e2e", attrs: {}, negotiable: false, period: null, locale: "en", photoIds: [], title: "e2e counter", description: "e2e counter body", previous: [] }` (fake mode answers; expect status 200 and payload.ok true, payload.triesLeft 4). Then sign in in the browser (`signInViaSession`), `gotoReady` `/my-listings/<id>/edit`, click the Edit on the Title section (`page.locator('[data-testid="post-review-edit"][data-step="5"]')`, as MLA-13 :997 does) and wait for `post-step-5` (:998) and `post-details`; assert `post-assist-tries` is visible and has attribute `data-left` = "4" BEFORE any click on `post-assist` (its text contains "4"); then click `post-assist`, wait for `post-assist-suggestion` count 1 (timeout 30 s), and assert `data-left` = "3". Nothing else changes in the file.
3. e2e/post-wizard-category.spec.ts — PW-141 (the photos-soon ribbon), its letter-size assertion only (:606–614): the band's letters are no longer 3.6 % of the picture's width; they follow the one ribbon size `clamp(9px, 6cqw, 22px)`. Replace the expectation with: `const expected = Math.min(22, Math.max(9, 0.06 * (imgBox?.width ?? 0)));` and `expect(Math.abs(fontPx - expected), …).toBeLessThan(0.75)`; its message says "PW-141: letters ${fontPx}px on a ${imgBox?.width}px picture do not follow the one ribbon size (INC-670)". Update the comment above it (:596–597) to say the letters are the one ribbon size, clamp(9px, 6cqw, 22px) of the drawn picture's width (INC-670). The "inside the picture" assertions stand. Nothing else in the file changes.
RULE: a test never locates a real row by page position (G28); every fixture is scratch (G27); no assertion is loosened — PW-141 keeps its geometry and its tolerance class.

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- D198 shape: Home › Seller Centre › My listings › <title> › Edit on the Edit; Seller Centre and My listings both lead to /my-listings (the panel's home IS the My listings page); on /my-listings itself Seller Centre is a plain name (INC-557's rule — one current segment). /post and /post/<id>: Home › Seller Centre › Post listing. /settings: Home › Account › Settings. /account keeps Home › Account. The admin's listing Edit gains its Edit level. No new string.
- INC-669 design: a read-only sibling of consume_rate_limit (one new SQL function; the window math repeated once and proven equal by the proofs) and a GET on the assist route, instead of carrying the count on the listing read (which would redeclare my_listing whole) or reading the rate table from the route (which would copy the window math into TypeScript). The peek has no dial: an authenticated one-row read of the caller's own listing, like the options route. The counter line is hidden until the peek answers, so "5 of 5" is never shown for an ad that spent tries; the assist button does not wait.
- INC-670 words: "PHOTOS COMING SOON" → "PHOTOS SOON" and the Amharic to its first two words (ፎቶዎች በቅርቡ — "photos soon"), so that every ribbon has ONE size; the alternative (every ribbon smaller, to fit 18 characters) was declined as the thinner look the walk complained of. RB-1b's cap goes to 14 with the status words'.
- PR-52 (the peek route's deny cases — notYourListing for another seller's ad, required without an id) is owed to turn 2: this turn's three spec files are taken (G37).

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, dev 64767df2 with this turn's carrier files)
- Clean: typecheck (with the types.ts entry the platform will regenerate), format, lint (0 errors, 33 warnings), 933 unit tests (161 files; LC-6 and RB-1b at 14 among them), the map guard (the two maps regenerated), the hardcoded-strings guard (0 findings), the selector's self-test with the new spec present; the migration text in a scratch folder through scripts/check-migrations.sh — every guard OK; the carrier split on a clean copy of the base: the tree equals the supervisor's file for file.
- Measured: the ribbon words' widths in the site's font (Inter bold, upper case, 0.06em): "PHOTOS COMING SOON" 12.9em, "PHOTOS SOON" about 7.9em, "Price reduced" 8.7em, "Not available" 8.7em; the band's visible run between the picture's edges 59.4cqw (TAPE_REACH's geometry). At 6cqw the old words needed 78cqw and were clipped; the new fit with the status words.
- Not run by the supervisor: the browser tests; the migration against a database (its apply is yours, on ethio-prod; the operator's on ethio-staging).

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-18-turn-1.md (roadmap.md line 3 comes from the carrier).

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines (run 964 on 64767df2 was in progress when this brief was written; whatever it shows, go on: the supervisor reads it and rules). You cannot git-fetch that branch. Paste `git rev-parse HEAD`: this is <START>;
  2. step 0;
  3. the census (below). If any result differs from what it expects, STOP and report: write nothing else. One exception, known in advance: if the platform has regenerated src/routeTree.gen.ts or src/integrations/supabase/types.ts since the base, name the difference and go on (neither is in this turn's carrier);
  4. the carrier, then the hashes (the two maps after `bun run i18n:map-guard` has run twice);
  5. the tests (1–3 above), by hand;
  6. the checks;
  7. the local browser run (below);
  8. the migration: the scratch check, the mark, the apply (the "Modify Supabase database" dialog: the operator allows it), the read-back;
  9. the report;
  10. END THE TURN.
  Do not stop between steps. The migration is the LAST file written: it is live on ethio-prod the moment it is saved; after the apply, `git status` shows src/integrations/supabase/types.ts changed (the platform's regeneration) — if it does not, say so in the report.
- The carrier's sections end with a newline each, blank lines included: write every section's bytes exactly as they stand between its header line and the next header, reading each file whole before any file is opened for writing. Check each written file's sha256 against the table before you go on. Never retype the Amharic: the carrier carries its bytes.
- If any rule of yours conflicts with the text, STOP before saving and quote that rule's exact words in the report.
- Scope — these files only: the 20 paths of the hash table, the brief, e2e/breadcrumbs.spec.ts (new), e2e/my-listings-ad.spec.ts and e2e/post-wizard-category.spec.ts (the tests), the one new migration file, and src/integrations/supabase/types.ts by the platform's regeneration only. The database: the one migration, on ethio-prod, through your tool. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool. No new dependency.
- THE LOCAL BROWSER RUN (G37): if the local browser starts (INC-506: it may not), run each of the three touched spec files whole, alone, 0 retries, both projects, 2 workers, fake mode, and paste each file's last lines; a file that is not fully green is not committed — fix and re-run. If the browser does not start, say so in one line: CI on this commit runs every spec.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-18-turn-1.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 19 files → each equal to:
  45341a61ae1e07f96a5ed71b75331fe7262802474fc3f3ebba358949a3a39a68  docs/_changelog.md
  980f4a028c1019e89b62e54b2603a535cf8cdfd6b8a46d5126f2cdcdeac4b467  docs/features/admin-listings.md
  16bd16f9d45cd925e9e87ac73feb9274193935100379aca72bbeab3f3af347f9  docs/features/panels.md
  265ee7e0584ba9e4e1515e186b4ba72b73de04e0cf626c75ae5c4abf2a4d0373  docs/features/posting.md
  2dcc8278d6e887038d5c9ab8a4aee7202e46e107513768b01c5cb3bf9dfccf1b  docs/generated/i18n-usage.json
  2dcc8278d6e887038d5c9ab8a4aee7202e46e107513768b01c5cb3bf9dfccf1b  public/i18n-usage.json
  6e395dcc335a012337248518251d7a861774d37c0efa105320db9c389a6c7769  roadmap.md
  b0f0aa616e95270bb11d0b27a812e49f56347ce7fef2ffb87e286d8158bee866  scripts/e2e-select.ts
  1cbaf571c5a7f8c40f4bedad1d9e4c5c288b9a1b8ea803095d33da1d4d2ce7b7  src/components/marketplace/listing-card.test.tsx
  8255f9dd75637dfa90ac9cc205275a135348a6d71719c253ddb5d451385c2abd  src/components/marketplace/listing-picture.tsx
  2b5ebf5be5d6d847bc08494ed1713995995ef696d611651c3ae524daf05a7111  src/components/marketplace/ribbon-words.test.ts
  42d333b60e2a0312418b687e3fe5574a47c7c328d2296d6a860a444b3317df05  src/components/shell/admin-detail-crumbs.tsx
  f0d442b02240e248f12e305ac02a457ef6864ba68f6650e5e893418feca82a88  src/components/shell/breadcrumbs.tsx
  e889ebb0d04a600febf1f23df81a0fcaef4887bcc761652108d8d9b2a828e5f4  src/features/posting/posting-service.ts
  935cc42ea592c98e491e210c0a913e0165d46a051885a6cc553e7c87dd28f65a  src/features/posting/step-details.tsx
  e862c63ddad4f9920ff3edaa860583ee8b4ade3228376a27c9db43476ea4531a  src/i18n/locales/am.ts
  8e693df2dfa57e8135a5b5ced3770bf350c969a138cf922dc7f21b79bba8e7d5  src/i18n/locales/en.ts
  36bba039ecadc0b08ed51cd9de08b6bdd71b593f59f1c4150619cf935a3f7e7c  src/routes/api/listings/assist.ts
  80351302efa5f6c03d4e7f7bdfb58ed4f4bb72a2fa25030a5d7b64a322531036  src/server/supabase/user-client.ts
- (c) `sha256sum e2e/my-listings-ad.spec.ts e2e/post-wizard-category.spec.ts` → 74653d81e3ff28b26a6e76a629018cea18b6d8a1707dd0b525585cce38fd34d2 and 5e1c25eafc31d76f8a433d512f65ea9d2b642050298cc38360a591c4e83a3292; `ls e2e/breadcrumbs.spec.ts` → no such file; `ls supabase/migrations | tail -1` → 20261016150556_19d4f9d4-882a-4812-82ca-abd412070915.sql (bundle 17's; no migration since).
- (d) The database (ethio-prod, your query tool, SELECT only):
  - `select version from public.migration_marks order by version desc limit 3;` → paste the three (the newest is bundle 17's mark, 20261017120000);
  - `select count(*) from pg_proc where proname = 'peek_rate_limit';` → 0;
  - `select md5(replace(prosrc, chr(13), '')) from pg_proc where oid = 'public.consume_rate_limit(text, text, integer, interval)'::regprocedure;` → paste it (the supervisor compares it with the file 20260917000149 :124–157; the peek's window line is that function's).

THE CARRIER — B18T1-TURN-CARRIER-2026-10-16.md (31,391 bytes; sha256 b7684aa0161fa6478d47212f700204c37defbc35d4bad545d992051648f156dc; 39 sections)
- Its first line starts "B18T1 TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`. No blank line separates the sections.
- Modes:
  - REPLACE: the section is the whole file;
  - NEW: a new file; the section is the whole file;
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file;
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed. If your upload arrives under another name, match it by its size and sha256.

THE HASHES — `sha256sum` each of the 20 paths below; each must equal the table (the two maps after the guard's second run). On any mismatch, STOP. Also paste the saved brief's sha256sum.
  ddc55716e598e9c36302b48fcc51ed553efb32ccd6600a1fcc0b6dc9cd690693  docs/_changelog.md
  ac39a8a3c18b51bb5827f2b96ffd2b23578b6a55d7968402bf341dc1ca9aa2a8  docs/features/admin-listings.md
  46d0a9ca95fc2e0b0d837430d4823bb00e50a261fca13d305a5a21cb083176f8  docs/features/panels.md
  ebebdaa20dca39f9f81331477f083b9a702efa2308219b60a219c5f12cc68924  docs/features/posting.md
  57ce4b5ce8bb848ab15ffae4d0b75b876ae946ef9416b248e79d8ab8fab11cc9  docs/generated/i18n-usage.json
  57ce4b5ce8bb848ab15ffae4d0b75b876ae946ef9416b248e79d8ab8fab11cc9  public/i18n-usage.json
  f05072be49050a2ee563861e3bc383474f2965775e16b0649cfa72f453ed75cb  roadmap.md
  d1672395c8ef6e6dfd688e2376df041440b31b4f4927869bfdb2130a8b074468  scripts/e2e-select.ts
  2533084019cb89d32f93844b37ae9d7d7be5ce9fa3a6729acac5f19725567c7c  src/components/marketplace/listing-card.test.tsx
  56dd0e727411728c16ace34da27d2456bfdc2da183790a1ece2e24821f99e403  src/components/marketplace/listing-picture.tsx
  34fc63698c9558062c199edc0748f7d3787998b1e1b710901da427e518e3cc27  src/components/marketplace/ribbon-words.test.ts
  a6cb15da4116b8f68ae35ce5e766ea996373ae047860d168315d189a461a90f9  src/components/shell/admin-detail-crumbs.tsx
  bd5304c5423f096306bc383bf775217f2f76e44239117deccd59abd3da2786e4  src/components/shell/breadcrumbs.tsx
  82aacc8ed7bb42d068f6dd1010fee1be91798f467f6db0fd928f315bd16ec94e  src/components/shell/seller-crumbs.tsx
  3c9d94a79d6ea4db33abb95f410e42d3c0ebcf3484a0a9dcc3030891fb6d6f7b  src/features/posting/posting-service.ts
  9327d18e2a80d9177da91850c3487c973c662279c40f8c3e6958b0f2a6d032d9  src/features/posting/step-details.tsx
  8c399d95727ce0e44ea72875d8f74efba1be9df4af77f90f365b49e838430dc6  src/i18n/locales/am.ts
  5e586d55579a62028449fd6d754ac1ec8c97d75739942a73ad5498a3dad0edd4  src/i18n/locales/en.ts
  aa921978af07daadf8c08218fc8f96b33e274f7ead59e6a7611e1c7e02e5a4da  src/routes/api/listings/assist.ts
  92693ecf8bd2b476195c53fdec51376c685cd935a0d59226a10706ecbf8071fe  src/server/supabase/user-client.ts

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run format:check` clean (the docs, the maps and the spec files included);
- `bun run lint` 0 errors / 33 warnings;
- `bun run test:unit 2>&1 | tee /tmp/unit-b18t1.log` — 933 passed (161 files); paste the count;
- `bun run i18n:map-guard` "usage maps match the tree" (its second run);
- `bash scripts/check-hardcoded-strings.sh` "findings: 0";
- `bun run scripts/e2e-select.ts --self-test` "e2e-select self-test OK: every spec is reachable; every area glob matches." (after test 1 exists);
- Not run by you: the typecheck, the build, the bundle budget. CI judges them.

THE MIGRATION RULES (G39 — every one applies)
- The text is between the BEGIN and END lines of the appendix below. Write it EXACTLY, changing only `<MARK>` (its last line). Before the change, its sha256 is 457eae90459a86fcad9060828af88d5c61118749260c70d929e18e0b625b4005 (4,961 bytes, 98 lines, ending with a newline). Hand it to the database tool by copying the text, never by retyping it (INC-639).
- Check it in a scratch folder first (after the checks):
  - copy supabase/migrations/*.sql into a temporary folder;
  - add the text, its `<MARK>` replaced by the mark you will use, under the name 20261018120000_b18t1-check.sql;
  - run `MIGRATIONS_DIR=<that folder> bash scripts/check-migrations.sh`.
  Paste its "guard OK" lines and "Migration guard OK".
- `<MARK>` is chosen at apply time:
  - read now() at time zone 'utc' on ethio-prod;
  - round it up to the next whole hour and add one hour (add twelve hours instead if the save dialog may wait);
  - if the result is below 20261018120000, use 20261018120000 (above the newest mark in census (d) and equal to the scratch check's stamp);
  - the mark must also be later than the saved file's own stamp.
- Then hand the FINAL text to the database tool ONCE. Never a stub, a comment or a draft (INC-491).
- A clean apply is the proofs' pass: they RAISE EXCEPTION on any failure. The proofs' scratch rows are removed by the block itself.

THE READ-BACK (ethio-prod, your query tool, SELECT only; paste each result)
- `select version from public.migration_marks where version = '<MARK>';` → one row;
- `select provolatile, prosecdef, proconfig from pg_proc where oid = 'public.peek_rate_limit(text, text, integer, interval)'::regprocedure;` → s | t | {search_path=public};
- `select has_function_privilege('authenticated', 'public.peek_rate_limit(text, text, integer, interval)', 'EXECUTE'), has_function_privilege('anon', 'public.peek_rate_limit(text, text, integer, interval)', 'EXECUTE'), has_function_privilege('service_role', 'public.peek_rate_limit(text, text, integer, interval)', 'EXECUTE');` → f | f | t;
- `select count(*) from public.rate_limits where action = 'e2e-mig-b18t1-peek';` → 0.
- If a read-back differs, STOP and report what you read: the supervisor rules (DEC-182).

THE REPORT
- Done or not done, by step.
- The six ci-status lines, and <START>.
- The census results (a)–(d).
- The 20 sha256sum lines and the brief's; the sha256sum and line count of each of the three spec files, and `git diff <START> -- e2e/` whole.
- `git diff --name-only <START>` plus `git ls-files --others --exclude-standard`; `git ls-files` proof that e2e/breadcrumbs.spec.ts, src/components/shell/seller-crumbs.tsx and the migration file are tracked (G20). If the platform committed mid-turn, give `git diff --name-only <START> HEAD` too. Expect the 20 paths, the brief, the three spec files, the migration file and src/integrations/supabase/types.ts (regenerated).
- The checks; the local browser run's last lines per file, or the one line that the browser did not start.
- The check-migrations "guard OK" lines; the mark and the now() reading it came from; the apply outcome; the read-back.
- The line "apply <uuid-fragment of the migration's filename> → expect mark <MARK>", for the operator's staging apply.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only). The database change is undone only by a new migration — never by editing this file.

AFTER THIS TURN (for the operator), in this order:
1. Apply the migration on ethio-staging: open the new migration file on GitHub (Raw), paste it into the ethio-staging SQL editor and run it; read back its mark with the line the report gives (`select version from public.migration_marks where version = '<MARK>';`, never max()).
2. Bring the supervisor Lovable's report and the read-back. Do not wait for CI (DEC-181).
3. On this turn's green: Publish, then Admin › Translations › "Sync keys" (the band's words changed in both languages — INC-603's rule); then check Admin › Translations › Amharic › `listing.photosSoon` reads the two-word text; if it still reads three words (a person's revision is kept by the sync), set it to the two words and approve. The walk comes at the bundle's close, not now.

APPENDIX — THE MIGRATION (between the BEGIN and END lines; not including them)
-----BEGIN B18T1 MIGRATION-----
-- Bundle 18 turn 1 (2026-10-16). Tier A. INC-669 — THE WRITING BUDGET'S COUNT, READ WITHOUT SPENDING. The
-- e2e-areas: posting, my-listings
-- assist route spends a listing's five tries through consume_rate_limit (20260917000149) and the screen
-- printed "5 of 5 tries left" on every fresh open (the Edit; a draft reopened) until its first call answered,
-- because only consume_rate_limit could say the count and it cannot be asked without spending. peek_rate_limit
-- answers the remaining of the CURRENT window for an action and key and inserts nothing.
--
-- A. peek_rate_limit(text, text, integer, interval): the same window as consume_rate_limit (the one line of
--    window math, repeated and then proven equal), one row read by its key, STABLE, SECURITY DEFINER (the
--    table is closed to every client role), closed to PUBLIC, anon and authenticated, open to service_role —
--    the route's server-only client calls it after the caller and the listing's ownership are verified.
-- B. Proofs P1–P3 on no real row: the header; the grants; on a scratch key, the peek equals the spend's own
--    answer after every try and reads the limit when no row exists, and the scratch rows are removed.

-- ===== A — peek_rate_limit =====
CREATE OR REPLACE FUNCTION public.peek_rate_limit(
  p_action text,
  p_key text,
  p_limit integer,
  p_window interval
)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_secs numeric := extract(epoch from p_window);
  v_start timestamptz;
  v_count integer;
BEGIN
  IF v_secs IS NULL OR v_secs <= 0 THEN
    RAISE EXCEPTION 'badWindow';
  END IF;
  -- The window consume_rate_limit counts in (20260917000149): the same expression, so both name one row.
  v_start := to_timestamp(floor(extract(epoch from clock_timestamp()) / v_secs) * v_secs);

  SELECT r.count INTO v_count FROM public.rate_limits r
   WHERE r.key = p_key AND r.action = p_action AND r.window_start = v_start;

  RETURN jsonb_build_object(
    'remaining', greatest(p_limit - coalesce(v_count, 0), 0),
    'resets_at', v_start + p_window
  );
END $$;
REVOKE ALL ON FUNCTION public.peek_rate_limit(text, text, integer, interval) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.peek_rate_limit(text, text, integer, interval) TO service_role;

-- ===== B — proofs =====
DO $proof$
DECLARE
  v_key    text := 'e2e-mig-b18t1-' || gen_random_uuid()::text;
  v_action text := 'e2e-mig-b18t1-peek';
  v_spend  jsonb;
  v_peek   jsonb;
  v_left   integer;
BEGIN
  -- P1. The header: stable, definer, search_path pinned.
  IF NOT EXISTS (
    SELECT 1 FROM pg_proc
     WHERE oid = 'public.peek_rate_limit(text, text, integer, interval)'::regprocedure
       AND prosecdef AND provolatile = 's' AND proconfig = ARRAY['search_path=public']) THEN
    RAISE EXCEPTION 'B18T1 P1: the header of peek_rate_limit is not as written';
  END IF;

  -- P2. Closed to every client role; open to the server's role.
  IF has_function_privilege('anon', 'public.peek_rate_limit(text, text, integer, interval)', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.peek_rate_limit(text, text, integer, interval)', 'EXECUTE')
     OR NOT has_function_privilege('service_role', 'public.peek_rate_limit(text, text, integer, interval)', 'EXECUTE') THEN
    RAISE EXCEPTION 'B18T1 P2: a grant of peek_rate_limit is not as written';
  END IF;

  -- P3. On a scratch key: no row reads the whole limit; after each spend the peek equals the spend's own
  --     answer (the two window expressions name one row); a spend past the limit leaves the peek at zero.
  v_peek := public.peek_rate_limit(v_action, v_key, 3, interval '10 years');
  IF (v_peek->>'remaining')::integer <> 3 THEN
    RAISE EXCEPTION 'B18T1 P3: a key with no row did not read the limit: %', v_peek;
  END IF;
  FOR v_left IN REVERSE 2..0 LOOP
    v_spend := public.consume_rate_limit(v_action, v_key, 3, interval '10 years');
    v_peek  := public.peek_rate_limit(v_action, v_key, 3, interval '10 years');
    IF (v_spend->>'remaining')::integer <> v_left OR (v_peek->>'remaining')::integer <> v_left THEN
      RAISE EXCEPTION 'B18T1 P3: after a spend the peek did not equal it: spend % peek %', v_spend, v_peek;
    END IF;
  END LOOP;
  v_spend := public.consume_rate_limit(v_action, v_key, 3, interval '10 years');
  v_peek  := public.peek_rate_limit(v_action, v_key, 3, interval '10 years');
  IF (v_spend->>'allowed')::boolean OR (v_peek->>'remaining')::integer <> 0 THEN
    RAISE EXCEPTION 'B18T1 P3: past the limit: spend % peek %', v_spend, v_peek;
  END IF;
  DELETE FROM public.rate_limits WHERE key = v_key AND action = v_action;
  IF EXISTS (SELECT 1 FROM public.rate_limits WHERE key = v_key AND action = v_action) THEN
    RAISE EXCEPTION 'B18T1 P3: the scratch rows were not removed';
  END IF;
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('<MARK>') ON CONFLICT (version) DO NOTHING;
-----END B18T1 MIGRATION-----
```
