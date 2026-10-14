# Bundle 16 — turn 3: My listings, one ad's page and its actions: brief, version 1 (saved unchanged, 2026-10-14)

```text
BUNDLE 16 — TURN 3 (2026-10-14). ONE TURN: FIRST THE FIX OF TURN 2b'S RED (one test), THEN ONE MIGRATION, STRINGS, ONE NEW TEST FILE WRITTEN BY YOU. No package change.
Base: dev bc9a0c6d (turn 2b's landing). The census below proves every file and the database by content. This file is public: it is written as build instructions.
Tier A: the migration (one new read door, `my_listing`; `listing_history` redeclared with one key more) and the page's calls to turn 1's write doors. Tier B: the page, the list's Open, the route, the E2E tests. Tier C: the strings, the docs, the roadmap and the changelog.

ANSWERS TO THE LAST TURN
- Turn 2b landed byte for byte: dev `bc9a0c6d` holds the 5 carrier paths as the table, the brief and your test file (24979a60…, 492 lines). Your note on admin-shell.md (a first write without the section's last blank line, committed mid-turn and rewritten): seen and accepted; the file at `bc9a0c6d` equals the table.
- Its CI run (38646586143 on `bc9a0c6d`) is red with one test only: MLP-3, on both projects, in its shard and in the fast lane (1,698 passed, 4 failed). MLP-2 and the guard's fix pass. The fix is the FIRST part of this turn (below).

FIRST — THE FIX OF TURN 2b'S RED (Tier B; you, in e2e/my-listings-page.spec.ts only)
- The failure (e2e-last-failure.md, run 38646586143, MLP-3 on both projects): "[e2e:session] injected identity mismatch — expected user <the seller>, page holds no session", thrown by `signInViaSession` at your spec's line 460 — the second sign-in, after the same-tab sign-out on /my-listings.
- Cause (read in e2e/helpers/session.ts, `injectSession`): the injection is written once per user — its init script returns at once when the sentinel `__ethio-e2e-injected` already holds that user's id. The app's sign-out removes the session but not the sentinel, so signing the SAME user into the same page again writes nothing, and the page holds no session. (The session the helper caches for that user was also ended by the sign-out.) The page and the guard are right; the test's second sign-in is not.
- INC-628 (registered by the supervisor): a test signs the same user back into a page after a sign-out there; the session helper keeps a same-user injection a no-op. Class: a test step that relies on a helper without reading the helper's guard.
- The fix: the /account leg of MLP-3 signs in a SECOND scratch seller (`scratchSeller()`; MLP-3 then holds two accounts, within DEC-174), with `signInViaSession` on the same page — a different user, so the helper clears the old identity and writes the new one — then opens /account and signs out in the tab as now; the URL becomes "/". Every other line and assertion of MLP-3 stays as it is; no other test is edited; no file under e2e/helpers/ is changed.
- Then `node_modules/.bin/prettier --write e2e/my-listings-page.spec.ts`.

WHY THIS TURN
- D138 and D173–D176: the seller sees one of his ads and acts on it — Reserved on and off, Mark as sold, No longer available and Reopen, Renew. The doors exist since turn 1 (`set_listing_reserved`, `mark_sold`, `transition_listing` to close and reopen, `renew_listing`); nothing in the app calls them yet. The operator's walk of bundle 14 (2026-10-14): "I am not able to edit my own advert".
- The column grants of `listings` do not cover turn 1's columns (the days left or kept, the Reserved mark, the price record, the status a closed ad reopens to), so the page reads one ad through a door, as the list does.
- Turn 3 is split (G10): a sold ad in the feed for 30 days, the card's ribbons, Rented and Filled (call H) and Delete (call F) are turn 3b, the next brief. Until 3b, a sold ad leaves the feed at once, and every category's button says "Mark as sold".

WHAT THIS TURN BUILDS
- The migration (the appendix):
  A. `my_listing(id)` — STABLE, SECURITY DEFINER; the caller's own ad only (its read is keyed by `auth.uid()`); one answer, "not your listing", for another seller's ad and for one that does not exist. It returns `listing` — the same row object as `my_listings`, byte for byte (proof P5) — and `group`, `resumeStatus` (the live status a closed ad reopens to), `countryCode`, `renewAllowed` and `renewDays` (the admin's setting).
  B. `listing_history`, redeclared whole from 20261014194317 with one key more: `reserved`, a Reserved change's new value (true, false, or null for any other line). Nothing else changes (proof P6).
  P. Proofs: the headers, the privileges, the read keyed by the caller, the row object equal to `my_listings`', `listing_history` equal to its earlier body beyond the key, calls with no session refused, and — as a fresh scratch identity that owns nothing — an id that is not its own refused by both doors.
- The carrier:
  - the route /my-listings/<id> (src/routes/my-listings_.$listingId.tsx; signed-in only — a signed-out visitor goes to sign in and back to the same ad) and the route tree (src/routeTree.gen.ts) with it;
  - the page (src/features/my-listings/my-listing-page.tsx): the way back to My listings; the title; the status card (the group, the Reserved and Price reduced marks, the state line, the dates: first posted, renewed, ends, sold); "What you can do" (the actions, or why there are none); "As buyers see it" (the shared `ListingDetail`); the history;
  - the door's client, the actions and the history's parser (src/features/my-listings/my-listing.ts) and their unit tests ML-U5…ML-U9 (src/features/my-listings/my-listing.test.ts);
  - the state line moves to src/features/my-listings/state-line.ts, shared by the list and the page (the list's words do not change); the list's rows that are not drafts get Open (src/features/my-listings/my-listings-page.tsx); `parseRow` is exported (src/features/my-listings/my-listings.ts);
  - the strings (below), the generated type of the new door, the allowlist (the new door; `listing_history`'s line), the docs (my-listings), the changelog and the roadmap.
- The usage maps (docs/generated/i18n-usage.json, public/i18n-usage.json) are regenerated by you with `bun run i18n:usage`; the hashes below say what they must be.
- THE TESTS (below): you write e2e/my-listings-ad.spec.ts (MLA-1…MLA-6).

THE ACTIONS (each one tap; Mark as sold asks first; the door re-checks everything)
- A live ad (active, reduced): Mark as reserved (or Remove the reserved mark), Mark as sold, No longer available.
- A closed ad: Reopen (to the status it was closed from, with its days), Mark as sold.
- An expired ad: "Renew for N days" (N: the admin's days per renewal) when the admin allows it; else the words "Renewing is switched off for now."
- A draft: Continue (the posting form). In review: "It is waiting for review. You can change it once the review is done." Not approved, removed, sold: "Nothing to change here right now."
- After any action, whatever the answer, the ad, its history and the list are read again; a refusal is said in words.

THE STRINGS (English / Amharic; the supervisor's, read before they ship — G43; they travel in the carrier). New, 34:
  - `myListings.open`: "Open" / «ክፈት»
  - `myListings.ad.firstPosted`: "First posted {date}" / «መጀመሪያ የተለጠፈው፦ {date}»
  - `myListings.ad.renewed`: "Renewed {date}" / «የታደሰው፦ {date}»
  - `myListings.ad.ends`: "Ends {date}" / «የሚያበቃው፦ {date}»
  - `myListings.ad.actions`: "What you can do" / «ማድረግ የሚችሉት»
  - `myListings.ad.waiting`: "It is waiting for review. You can change it once the review is done." / «ግምገማ በመጠበቅ ላይ ነው። ግምገማው ሲጠናቀቅ መቀየር ይችላሉ።»
  - `myListings.ad.none`: "Nothing to change here right now." / «አሁን እዚህ የሚቀየር ነገር የለም።»
  - `myListings.ad.loadError`: "This ad could not be loaded." / «ይህን ማስታወቂያ መጫን አልተቻለም።»
  - `myListings.ad.notFound`: "This ad is not one of yours, or it no longer exists." / «ይህ ማስታወቂያ የእርስዎ አይደለም፣ ወይም ከእንግዲህ የለም።»
  - `myListings.renewOff`: "Renewing is switched off for now." / «ማደስ ለጊዜው ተዘግቷል።»
  - `myListings.action.reserve`: "Mark as reserved" / «እንደተያዘ ምልክት አድርግ»
  - `myListings.action.unreserve`: "Remove the reserved mark" / «የተያዘ ምልክቱን አንሳ»
  - `myListings.action.sell`: "Mark as sold" / «እንደተሸጠ ምልክት አድርግ»
  - `myListings.action.close`: "No longer available" / «ከእንግዲህ አይገኝም»
  - `myListings.action.reopen`: "Reopen" / «እንደገና ክፈት»
  - `myListings.action.renew`: "Renew for {days} days" / «ለ{days} ቀናት አድስ»
  - `myListings.confirm.sellTitle`: "Mark this ad as sold?" / «ይህ ማስታወቂያ እንደተሸጠ ምልክት ይደረግበት?»
  - `myListings.confirm.sellBody`: "Buyers will see it as sold and can no longer contact you about it. You cannot undo this." / «ገዢዎች እንደተሸጠ ያዩታል፤ ስለእሱ ከእንግዲህ ሊያገኙዎት አይችሉም። ይህን መቀልበስ አይችሉም።»
  - `myListings.done.reserve`: "Marked as reserved." / «እንደተያዘ ምልክት ተደርጓል።»
  - `myListings.done.unreserve`: "The reserved mark is removed." / «የተያዘ ምልክቱ ተነስቷል።»
  - `myListings.done.sell`: "Marked as sold." / «እንደተሸጠ ምልክት ተደርጓል።»
  - `myListings.done.close`: "Closed. Its remaining days are kept until you reopen it." / «ተዘግቷል። የቀሩት ቀናት እንደገና እስኪከፍቱት ድረስ ይቆያሉ።»
  - `myListings.done.reopen`: "Reopened. It is live again." / «እንደገና ተከፍቷል። አሁን በቀጥታ ነው።»
  - `myListings.done.renew`: "Renewed. It is live again." / «ታድሷል። አሁን በቀጥታ ነው።»
  - `myListings.error.rateLimited`: "Too many changes in a short time. Try again in a little while." / «በአጭር ጊዜ ውስጥ ብዙ ለውጦች ተደርገዋል። ትንሽ ቆይተው እንደገና ይሞክሩ።»
  - `myListings.error.deactivated`: "Your account is deactivated." / «መለያዎ ተቋርጧል።»
  - `myListings.error.notYours`: "This ad could not be found." / «ይህ ማስታወቂያ አልተገኘም።»
  - `myListings.error.changed`: "This ad has changed. The page now shows it as it is." / «ይህ ማስታወቂያ ተቀይሯል። ገጹ አሁን ያለበትን ሁኔታ ያሳያል።»
  - `myListings.error.failed`: "That did not work. Try again." / «አልተሳካም። እንደገና ይሞክሩ።»
  - `myListings.history.you`: "You" / «እርስዎ»
  - `myListings.history.empty`: "No changes yet." / «እስካሁን ምንም ለውጥ የለም።»
  - `myListings.history.reserved`: "Marked as reserved" / «እንደተያዘ ምልክት ተደርጓል»
  - `myListings.history.unreserved`: "Reserved mark removed" / «የተያዘ ምልክቱ ተነስቷል»
  - `myListings.status.draft`: "Draft" / «ረቂቅ»
Reused, unchanged: "History" (`admin.listings.detail.history`), "As buyers see it" (`post.preview.title`), "Created", "Renewed", "Status: {from} → {to}", "Edited: {fields}", "Reason: {reason}", "Note: {note}", "Staff", "System" (`admin.listings.history.*`), "Removed" and "Expired" (`admin.listings.status.*`), and the list's own words.

DECIDED BY THE OPERATOR (2026-10-14)
- D138, D173–D176 (turn 1's brief): what each action does; a renewed ad live at once (D176); both dates on a renewed ad (D175 3).

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- Mark as sold asks first: it cannot be undone by the seller. No longer available and Reserved need no confirm: each is undone with one tap.
- The history shows who as You, Staff or System, never a staff member's name; a change only of reach (active and reduced) or of review queue (screening and held) is staff's and is not listed.
- Turn 3 split: the feed's sold ads and ribbons, Rented and Filled, and Delete are turn 3b.
- MLP-3's fix uses a second scratch seller rather than a change to the session helper (the harness is a closed surface, G22).

THE TESTS — you write them this turn, from the descriptions below (Tier B). The supervisor ran the door's behaviour on its local stand-in; your tests prove the doors, the page and the route on ethio-staging.
General rules (each applies to every test):
- New file e2e/my-listings-ad.spec.ts: one `test.describe("MY LISTINGS — one ad's page (bundle 16 turn 3)", …)` with MLA-1…MLA-6, titled exactly as below, in that order. `test` and `expect` come from "./fixtures". Open the file with a comment that says what it proves and names D138, D173 and D174.
- Copy into the new file the local helpers you need from your e2e/my-listings-page.spec.ts (`restBase`, `asPerson`, `token`, `scratchSeller`, `seed`, `listingTruth`, `box` and the afterEach reaping), with the log prefix "[e2e:mla]". Do not change any other spec or any file under e2e/helpers/.
- At most two leased accounts per test (DEC-174). Every seller is a `scratchSeller()`; every listing is a scratch row this file seeds through the service client on the seller's own scratch category branch and place, removed in afterEach (J3, G27); every row is found by its own id (G28). No test writes `listing_policy`: the renew days are read (as the seller, `renew_days` from `listing_policy`), never set.
- Words are asserted from en.ts (`en["…"]`, with `{date}`, `{count}`, `{days}` filled as the page fills them); a date's own text is not asserted, only the words around it ("First posted ", "Ends ", "Renewed ", "Sold ").
- G38: no assertion loosened, no timeout raised, no retry added, no dial raised.

MLA-1 "MLA-1 my_listing: the seller's own ad with the list's row, its group, the status it reopens to and the renew setting; nobody else's"
- Seller A: X live (status active, first published and published 20 days ago, ending in 10 days minus one hour); C live, ending in 10 days minus one hour, which seller A then closes through `transition_listing` (to "closed"). Seller B: Y live.
- As seller A, `my_listing(X)`: `listing` deep-equals X's row in `my_listings("live")`'s rows; `group` "live"; `resumeStatus` null; `renewAllowed` true; `renewDays` equals the `renew_days` seller A reads from `listing_policy`; `countryCode` is a two-letter code.
- `my_listing(C)`: `group` "closed", `resumeStatus` "active", `listing.daysKept` 10, `listing.status` "closed".
- Refused with "not your listing": seller A on Y; seller A on a random uuid; seller B on X. An anonymous call (the publishable key, no bearer) → an error and no data.

MLA-2 "MLA-2 listing_history says which way a Reserved change went"
- One seller, X live. As the seller: `set_listing_reserved(X, true)`, then `set_listing_reserved(X, false)`.
- `listing_history(X)`: its first line has `reserved` false, its second `reserved` true; both have `by` "you", `fields` ["reserved"], `from` and `to` null.
- `listing_history` on a random uuid: refused with "not your listing".

MLA-3 "MLA-3 The ad's page: Open from the list, the status and dates, Reserved on and off (D173)"
- One seller, X live as in MLA-1. Sign in (`signInViaSession`) and open /my-listings: `my-listing-<X>-open` inside `box(page, X)` is visible; pressing it opens /my-listings/<X>; `my-listing-page` is visible.
- `my-listing-group` reads "Live"; `my-listing-state` reads "Days left: 10"; `my-listing-first-posted` starts with "First posted "; `my-listing-ends` starts with "Ends "; `my-listing-renewed` and `my-listing-sold` are absent.
- In `my-listing-actions`: exactly three buttons, `my-listing-action-reserve` ("Mark as reserved"), `my-listing-action-sell` ("Mark as sold"), `my-listing-action-close` ("No longer available").
- Press reserve: `my-listing-notice` reads "Marked as reserved."; `my-listing-reserved` reads "Reserved"; `my-listing-action-unreserve` reads "Remove the reserved mark"; the first `my-listing-history-line` contains "You" and "Marked as reserved"; the database (service client) holds X's `reserved_at` set.
- Press unreserve: `my-listing-notice` reads "The reserved mark is removed."; `my-listing-reserved` is gone; the first history line contains "Reserved mark removed"; `reserved_at` is null.
- `my-listing-as-seen` contains X's title. `my-listing-back` opens /my-listings.

MLA-4 "MLA-4 No longer available keeps the days left; Reopen gives them back (D174 2)"
- One seller, X live, ending in 10 days minus one hour. Open /my-listings/<X>; press close.
- `my-listing-notice` reads "Closed. Its remaining days are kept until you reopen it."; `my-listing-group` reads "Closed"; `my-listing-state` reads "No longer available · Days kept: 10"; the buttons are exactly `my-listing-action-reopen` ("Reopen") and `my-listing-action-sell`; the first history line contains "Status: Live → No longer available". The database: status "closed", `resume_status` "active".
- Press reopen: `my-listing-notice` reads "Reopened. It is live again."; `my-listing-group` reads "Live"; `my-listing-state` reads "Days left: 10". The database: status "active", `resume_status` null.

MLA-5 "MLA-5 Mark as sold asks first; then the ad is sold for good (D175 1)"
- One seller, X live. Open /my-listings/<X>; press sell: `my-listing-confirm` is visible and holds "Mark this ad as sold?". Press `my-listing-confirm-cancel`: the dialog is gone; `my-listing-group` still reads "Live"; the database status is "active".
- Press sell again, then `my-listing-confirm-yes`: `my-listing-notice` reads "Marked as sold."; `my-listing-group` reads "Sold"; `my-listing-sold` starts with "Sold "; `my-listing-no-action` reads "Nothing to change here right now."; no `my-listing-action-*` button; the first history line contains "Status: Live → Sold". The database: status "sold", `sold_at` set.
- /my-listings, press `my-listings-group-sold`: the row `my-listing-<X>` (its twin below 1280 px) is there.

MLA-6 "MLA-6 Renew an expired ad; a draft continues; an ad in review waits; another seller's ad and a signed-out visit"
- Seller A: E expired (ended 3 days ago, first published and published 40 days ago), D a draft, S in review (status screening). Seller B: Y live.
- As seller A, /my-listings/<E>: `my-listing-group` reads "Closed"; `my-listing-state` starts with "Expired "; `my-listing-action-renew` reads "Renew for N days" (N: `renew_days` as read in MLA-1). Press it: `my-listing-notice` reads "Renewed. It is live again."; `my-listing-group` reads "Live"; `my-listing-renewed` starts with "Renewed "; `my-listing-first-posted` is still there. The database: status "active", `renewed_at` set, `published_first_at` unchanged.
- /my-listings/<D>: `my-listing-continue` opens /post/<D>.
- /my-listings/<S>: `my-listing-no-action` reads "It is waiting for review. You can change it once the review is done."; no `my-listing-action-*` button.
- /my-listings/<Y> (seller B's ad, signed in as A): `my-listing-not-found` reads "This ad is not one of yours, or it no longer exists."
- Signed out (a fresh context, no session): /my-listings/<E> goes to /auth with return /my-listings/<E>.

After writing it: `node_modules/.bin/prettier --write e2e/my-listings-ad.spec.ts`. No other test is edited.

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, dev bc9a0c6d with this turn's carrier files)
- The fix of MLP-3: read in e2e/helpers/session.ts (`injectSession`'s first line, the sentinel) and e2e/helpers/ui.ts (`signInViaSession`); not run (its sandbox cannot reach ethio-staging).
- Clean: typecheck (it covers e2e/), format, lint (0 errors, 33 warnings), 861 unit tests (151 files), the usage maps regenerated (they match), the hardcoded-strings guard (0 findings), the selector self-test (the new spec's name is in the my-listings area: e2e/my-listings*.spec.ts).
- The migration on a local PostgreSQL 16 over stand-in tables with turns 1 and 2 applied: applied cleanly, its proofs passed, with LF and with CRLF line endings. As two sellers: the page's row equal to the list's row; the group, the reopen status, the country, the renew setting (and the setting switched off); another seller's ad and a missing one refused with the one answer; the history's Reserved values in order. Three tampered copies were each refused by their proof: a row object that differed (P5), a history that let another seller read (P6), a read not keyed by the caller (P1b).
- `scripts/check-migrations.sh` with this migration as 20261015120000_b16t3-check.sql and this turn's allowlist: "Migration guard OK".
- The route tree was regenerated with the router's own generator: the only change is the new route.
- The 34 Amharic strings were checked by script: NFC, Ethiopic letters and punctuation only, the placeholders equal to the English.
- Not run by the supervisor: the browser tests (its sandbox cannot reach ethio-staging). CI on the final commit runs them.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-16-turn-3.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines. Whatever it shows, go on: the CI read is the supervisor's, and a fix it needs comes in the next turn. Do not stop on it. You cannot git-fetch that branch. Paste `git rev-parse HEAD`: this is <START>;
  2. step 0;
  3. the census (below), files and database. If any result differs from what it expects, STOP and report: write nothing else. One exception, known in advance: if the platform has regenerated src/integrations/supabase/types.ts or src/routeTree.gen.ts since turn 2b, name the difference and go on — the carrier's sections hold those files' lines;
  4. the carrier, then `bun run i18n:usage`, then the hashes;
  5. the fix of MLP-3 (FIRST, above), then THE TESTS;
  6. the checks;
  7. the migration LAST, then its read-back;
  8. the report;
  9. END THE TURN.
  Do not stop between steps.
- The migration is the last thing written, because the database tool applies it on ethio-prod the moment it is saved. The operator will see the "Modify Supabase database" dialog and allow it. The published site keeps working: it does not call the new door until the next Publish, and `listing_history`'s answer only gains a key.
- The carrier's sections end with a newline each, blank lines included: write every section's bytes exactly as they stand between its header line and the next header. Check each written file's sha256 against the table before you go on.
- If the platform regenerates src/integrations/supabase/types.ts or src/routeTree.gen.ts after the migration or the route, compare it with the carrier's file. If they differ, keep the carrier's file and name the difference in the report.
- If any rule of yours conflicts with the text, STOP before saving and quote that rule's exact words in the report.
- Scope — these files only: the 17 paths of the hash table (the carrier's files and the two usage maps), the brief, e2e/my-listings-page.spec.ts (MLP-3's fix only), e2e/my-listings-ad.spec.ts (new) and the one new migration file (the database tool names it). The database: ethio-prod through your tools — SELECT only, except the migration itself. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-16-turn-3.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 10 files → each equal to:
  18066317d3061f44e364d093feb211cbca9414f3ad8f14c944664497281c0fea  docs/_changelog.md
  b599b0f24eeb841369a1f0256df4c1c6ff97cc14e1b5b9aa87c185fb2f41f7df  docs/features/my-listings.md
  a35c2e0d7f76c141da33452dda49d9d900d5d6e1d92be6a8feab76d5e394914a  roadmap.md
  ae1032c5a12177db321275ddf71987721f785b0132a5b9584a3f776fba38ce31  scripts/public-surface-allowlist.txt
  04f3681a3aa762214e86c9031368841379113f471816354bb57e5fc4345b828c  src/features/my-listings/my-listings-page.tsx
  d8bcb50d42e792058ca43a5265dc2889be23107cb2452128ba2c2fc9d9388208  src/features/my-listings/my-listings.ts
  fcf7373bca45754f0c5eb6c2f7f4da2809f7e892338ca0c34425f715dd3fdab3  src/i18n/locales/am.ts
  f8a719c2e2ea0ce486b67d5fe0693fbde3440bfd775e884d31054f42b8b91feb  src/i18n/locales/en.ts
  c1a3671d7a4210809050e3f8b101f0dbb5367bf3025971d5cee20b01ea10dfc4  src/integrations/supabase/types.ts
  75220bb4f1dbe820007c9acd008fab5dde6d3777905b03a964081105a08f68e9  src/routeTree.gen.ts
- (c) `sha256sum e2e/my-listings-page.spec.ts` → 24979a60fa8f1d1336ba12b553228eaa2759cd6dac75fe9d17a195ccebc7ca98 (turn 2b's); `ls src/features/my-listings/my-listing.ts src/features/my-listings/my-listing-page.tsx src/features/my-listings/state-line.ts 'src/routes/my-listings_.$listingId.tsx' e2e/my-listings-ad.spec.ts` → no such file or directory, for each; `ls supabase/migrations | tail -1` → 20261014212353_bfa3b7fc-a891-4c2a-b47b-8ac58761dd8e.sql (turn 2's; no migration since).
- (d) ethio-prod, your query tool (SELECT only):
  - `select max(version) from public.migration_marks;` → 20261015100000;
  - `select count(*) from pg_proc where pronamespace = 'public'::regnamespace and proname = 'my_listing';` → 0;
  - `select md5(replace(prosrc, chr(13), '')) from pg_proc where oid = 'public.listing_history(uuid)'::regprocedure;` → fdfa8a65b00f20b724f01f7715113188 (turn 1's body).

THE CARRIER — B16T3-TURN-CARRIER-2026-10-14.md (56,268 bytes; sha256 c88fed0b19217430e656c3c450b4658bbe273f3ae9600a07d4f265bbe3bd999a; 36 sections)
- Its first line starts "B16T3 TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`. No blank line separates the sections.
- Modes:
  - REPLACE: the section is the whole file;
  - NEW: a new file; the section is the whole file;
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file (INSERT-AFTER 0: at the top of the file);
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed. If your upload arrives under another name, match it by its size and sha256.
- The two usage maps are not in the carrier: after the carrier, run `bun run i18n:usage`; it writes them from the tree, and their hashes are in the table.

THE HASHES — `sha256sum` each of the 17 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  30d8226e76417cff2d362dae5452836edea6fe11eeb8a9e1fc28e02cb5314e97  docs/_changelog.md
  d489854b72770d50901102365ee78efda35f4f7f0b5529614098fd30f2445c00  docs/features/my-listings.md
  871fbb96cbfad9f2dd5a5394c074795001f499b2339006fcd60f410ecea23985  docs/generated/i18n-usage.json
  871fbb96cbfad9f2dd5a5394c074795001f499b2339006fcd60f410ecea23985  public/i18n-usage.json
  6ceb36600b2ca8009ff0f2ce7dc3bbf8009d72fa735484193418c57b2452e30b  roadmap.md
  7744a4356e594dd45e00d1609c9dcc6f03d54fdfccea9a5780554a31b280183e  scripts/public-surface-allowlist.txt
  3280e66017a898e04f36bec146ec7a58c043f870f9210a6614ec9739dc48401b  src/features/my-listings/my-listing-page.tsx
  60e2ac831986bd2920c717adb3cf28c385f763c7f37eb896e3b08dbe68ec6b80  src/features/my-listings/my-listing.test.ts
  7b6dabb1715862aa92bd4f11aff661a7b3266162a353d86aabe0e69f15d171d6  src/features/my-listings/my-listing.ts
  4a7ce0cfb836618bbac2b7a2b08e891d7a2b01e07afa4b5a1c8f870d2ef65b81  src/features/my-listings/my-listings-page.tsx
  72022aa005afd11b3223ea8cc50deaf3c68ff87fb23125501190689f697c3258  src/features/my-listings/my-listings.ts
  ef2fffdc8ff78d8b3013c7bfe1a144a91b8290c9fdd34333a6fa886ba5225600  src/features/my-listings/state-line.ts
  a8e4c8ec956d2dd2ecf9d0f0b960392b0f32e361b324f7cbb41e76cc7ffbb6f9  src/i18n/locales/am.ts
  50f3748404066f528624e81369c9032ac70841a2c5bacb49aa9a7876c864a93d  src/i18n/locales/en.ts
  f79b1814b71e6a7508d26e8bf2dbf2e66c13899f6cfd0bde19a8a4092fbc746b  src/integrations/supabase/types.ts
  2eb6e8d61fabdd73fc5c3ef0f9355170d82c3e5fa5c48a18a0ee7528e504c7b5  src/routeTree.gen.ts
  68fdc9d71d3c063f353f76e45559cf959c2ac8a7d12cdb1095ea433d033d21b3  src/routes/my-listings_.$listingId.tsx

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings — a warning in your test file is fixed, not left;
- `bun run test:unit 2>&1 | tee /tmp/unit-b16t3.log` — 861 passed (151 files). Keep the whole output; if any test fails, paste its name and its first error line;
- `bun run i18n:map-guard` "usage maps match the tree.";
- `bash scripts/check-hardcoded-strings.sh` "findings: 0";
- `bun run scripts/e2e-select.ts --self-test` OK;
- `grep -n 'test("MLA-' e2e/my-listings-ad.spec.ts` → the six titles, in order; `grep -n 'test("MLP-' e2e/my-listings-page.spec.ts` → the four titles, unchanged, in order;
- Not run by you: the typecheck, the build and the bundle budget (your platform's rule: "Do not run the Lovable project's builds or typechecks manually because the harness runs them automatically."). CI's jobs judge them; the supervisor ran the typecheck on its own copy, without your test file.

THE BROWSER RUN — not this turn: the local browser does not start (INC-506). CI on the final commit runs every spec, yours included. A red in your tests is fixed in the next turn, at its cause (G38).

THE MIGRATION RULES (G39 — every one applies)
- The text is between the BEGIN and END lines of the appendix below. Write it EXACTLY, changing only `<MARK>`. Before the change, its sha256 is f811a3ffdbdb5d5c265efb71813d3678b2e2b3095f05316bf07142682a5a32f4 (12,864 bytes, 239 lines, ending with a newline).
- Check it in a scratch folder first (after the checks):
  - copy supabase/migrations/*.sql into a temporary folder;
  - add the text, its `<MARK>` replaced by the mark you will use, under the name 20261015120000_b16t3-check.sql (a stamp later than the newest mark);
  - run `MIGRATIONS_DIR=<that folder> bash scripts/check-migrations.sh`.
  Paste its "guard OK" lines and "Migration guard OK".
- `<MARK>` is chosen at apply time:
  - read now() at time zone 'utc' on ethio-prod;
  - round it up to the next whole hour and add one hour (add twelve hours instead if the save dialog may wait);
  - if the result is not above 20261015100000 (the newest mark, turn 2's), use 20261015110000 instead;
  - the mark must also be later than the saved file's own stamp.
- Then hand the FINAL text to the database tool ONCE. Never a stub, a comment or a draft (INC-491).
- A clean apply is the proofs' pass: they RAISE EXCEPTION on any failure.

THE READ-BACK (ethio-prod, your query tool, SELECT only; paste each result)
- `select version from public.migration_marks where version = '<MARK>';` → one row;
- `select p.proname, md5(replace(p.prosrc, chr(13), '')), p.provolatile, p.prosecdef, p.proconfig from pg_proc p where p.oid in ('public.my_listing(uuid)'::regprocedure, 'public.listing_history(uuid)'::regprocedure) order by p.proname;` →
  listing_history | 8b71b1c3368284e598e18d6f29c2cda7 | s | t | {search_path=public}
  my_listing | 7c0d39afb885e1e18ca2b1aadabde768 | s | t | {search_path=public};
- `select has_function_privilege('anon', 'public.my_listing(uuid)', 'EXECUTE'), has_function_privilege('authenticated', 'public.my_listing(uuid)', 'EXECUTE');` → f | t.

THE REPORT
- Done or not done, by step.
- The six ci-status lines, and <START>.
- The census results (a)–(d).
- The 17 sha256sum lines and the brief's; the sha256sum and line count of each of your two test files, and MLP-3's changed lines (`git diff <START> -- e2e/my-listings-page.spec.ts`).
- `git diff --name-only <START>` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only <START> HEAD` too. Expect the 17 paths, the brief, your two test files and the one migration file.
- The checks.
- The check-migrations "guard OK" lines; the mark and the now() reading it came from; the apply outcome; the read-back.
- The line "apply <uuid-fragment of the migration's filename> → expect mark <MARK>", for the operator's staging apply.
- In this report ONLY (never in a file — the repository is public): from the database tool's security warnings, each warning that names `my_listing`, and the total count.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only). The database change is undone only by a new migration — never by editing this file.

AFTER THIS TURN (for the operator), in this order:
1. Apply the migration on ethio-staging: open the new migration file on GitHub (Raw), paste it into the ethio-staging SQL editor and run it; read back its mark with the line the report gives. CI's preflight waits for it (up to 25 minutes); if the run has already failed at the preflight, use "Re-run failed jobs".
2. Bring the supervisor Lovable's report. The next prompt comes back at once: send it to Lovable as soon as you have it. Do not wait for CI (DEC-181).
3. Publish only when the supervisor says the newest commit is green and Lovable is idle. Then press "Sync keys" in Admin › Translations (this turn's words).

APPENDIX — THE MIGRATION TEXT (write it exactly; change only <MARK>)
----- BEGIN MIGRATION -----
-- Bundle 16 (My listings), turn 3 (2026-10-14). Tier A. The seller's read of ONE of his ads, for its page in My
-- listings (D138; D173–D176; spec: docs/features/my-listings.md, stage "one ad's page"). The page's actions use the
-- doors of turn 1 (set_listing_reserved, mark_sold, transition_listing to close and reopen, renew_listing); nothing
-- that writes changes here.
-- e2e-areas: my-listings
--
-- A. my_listing(listing) (NEW, STABLE, SECURITY DEFINER): the signed-in seller's own ad — the same row object as
--    my_listings (byte for byte: proof P5), its group, the live status a closed ad reopens to, its country, and the
--    admin's renew setting (allowed, days). One answer, "not your listing", for an ad that is not the caller's and
--    for one that does not exist, so the door tells nobody which ads exist.
-- B. listing_history, redeclared whole from 20261014194317: each line also carries a Reserved change's new value
--    (true or false), so the page says "Marked reserved" or "Reserved mark removed". Nothing else changes (P6).
-- P. Proofs (RAISE EXCEPTION on any failure; a clean apply is the pass): the headers and privileges; my_listing's
--    read keyed by the caller; its row object equal to my_listings'; listing_history equal to its earlier body
--    beyond the added key; calls with no session refused; a scratch identity that owns nothing (no real row, no
--    auth.users row) refused by both. What the doors return for real ads is proven by MLA-1…MLA-6
--    (e2e/my-listings-ad.spec.ts).

-- ===== A — my_listing (NEW): one of the seller's own ads =====
CREATE OR REPLACE FUNCTION public.my_listing(p_listing_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid    uuid := auth.uid();
  v_policy public.listing_policy%ROWTYPE;
  v_out    jsonb;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  SELECT * INTO v_policy FROM public.listing_policy WHERE id;

  SELECT jsonb_build_object(
           'listing',
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
               'createdAt', l.created_at,
               'updatedAt', l.updated_at,
               -- A removed ad's latest staff reason (seller_notices, which the seller already reads).
               'removedReason', CASE WHEN l.status = 'removed' THEN
                                  (SELECT sn.reason FROM public.seller_notices sn
                                    WHERE sn.listing_id = l.id AND sn.seller_id = v_uid AND sn.kind = 'admin_remove'
                                    ORDER BY sn.created_at DESC
                                    LIMIT 1) END),
           'group', CASE l.status
               WHEN 'active' THEN 'live'      WHEN 'reduced' THEN 'live'
               WHEN 'screening' THEN 'review' WHEN 'held' THEN 'review'
               WHEN 'rejected' THEN 'attention' WHEN 'removed' THEN 'attention'
               WHEN 'closed' THEN 'closed'    WHEN 'expired' THEN 'closed'
               WHEN 'sold' THEN 'sold'        WHEN 'draft' THEN 'drafts'
             END,
           -- A closed ad reopens to the live status it was closed from (transition_listing takes exactly that one).
           'resumeStatus', l.resume_status,
           'countryCode', coalesce(loc.country_code, l.home_country_code),
           -- D174 3, D175 2 — the admin's renew setting, so the page offers Renew only when it is allowed.
           'renewAllowed', coalesce(v_policy.renew_allowed, false),
           'renewDays', v_policy.renew_days)
    INTO v_out
    FROM public.listings l
    LEFT JOIN public.locations loc ON loc.id = l.location_id
   WHERE l.id = p_listing_id AND l.seller_id = v_uid;

  -- One answer for "not yours" and "not there".
  IF v_out IS NULL THEN RAISE EXCEPTION 'not your listing'; END IF;
  RETURN v_out;
END $function$;
REVOKE ALL ON FUNCTION public.my_listing(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.my_listing(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.my_listing(uuid) TO service_role;

-- ===== B — listing_history (redeclared whole) =====
CREATE OR REPLACE FUNCTION public.listing_history(p_listing_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid    uuid := auth.uid();
  v_seller uuid;
  v_out    jsonb;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  SELECT l.seller_id INTO v_seller FROM public.listings l WHERE l.id = p_listing_id;
  -- One answer for "not yours" and "not there", so the door tells nobody which ads exist.
  IF v_seller IS NULL OR v_seller <> v_uid THEN RAISE EXCEPTION 'not your listing'; END IF;
  SELECT coalesce(jsonb_agg(jsonb_build_object(
           'at', h.created_at,
           'kind', h.kind,
           'by', CASE WHEN h.actor IS NULL THEN 'system' WHEN h.actor = v_uid THEN 'you' ELSE 'staff' END,
           'from', h.b->'status',
           'to', h.a->'status',
           -- Bundle 16 turn 3 — a Reserved change says which way it went (true: marked, false: unmarked).
           'reserved', h.a->'reserved',
           'fields', (SELECT coalesce(jsonb_agg(k ORDER BY k), '[]'::jsonb)
                        FROM jsonb_object_keys(h.a) AS k WHERE k <> 'status'),
           'reason', n.reason,
           'note', n.note)
         ORDER BY h.created_at DESC, h.id DESC), '[]'::jsonb)
    INTO v_out
    FROM (SELECT r.id, r.kind, r.actor, r.created_at,
                 CASE WHEN jsonb_typeof(r.before) = 'object' THEN r.before ELSE '{}'::jsonb END AS b,
                 CASE WHEN jsonb_typeof(r.after) = 'object' THEN r.after ELSE '{}'::jsonb END AS a
            FROM public.listing_revisions r
           WHERE r.listing_id = p_listing_id
           ORDER BY r.created_at DESC, r.id DESC
           LIMIT 200) h
    LEFT JOIN LATERAL (
      SELECT sn.reason, sn.note
        FROM public.seller_notices sn
       WHERE sn.listing_id = p_listing_id AND sn.created_at = h.created_at
       ORDER BY sn.id
       LIMIT 1) n ON true;
  RETURN v_out;
END $function$;
REVOKE ALL ON FUNCTION public.listing_history(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.listing_history(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.listing_history(uuid) TO service_role;

-- ===== P — proofs (RAISE EXCEPTION on any failure; a clean apply is the pass) =====
DO $proof$
DECLARE
  v_n    integer;
  v_msg  text;
  v_src  text;
  v_seg  text;
  v_md5  text;
BEGIN
  -- P1. The headers: STABLE, SECURITY DEFINER, search_path public.
  SELECT count(*) INTO v_n FROM pg_proc
   WHERE oid IN ('public.my_listing(uuid)'::regprocedure, 'public.listing_history(uuid)'::regprocedure)
     AND provolatile = 's' AND prosecdef AND proconfig = ARRAY['search_path=public'];
  IF v_n <> 2 THEN RAISE EXCEPTION 'B16T3 P1: my_listing or listing_history is not STABLE SECURITY DEFINER with search_path public'; END IF;

  -- P1b. my_listing reads the one ad only when the caller owns it.
  SELECT replace(prosrc, chr(13), '') INTO v_src FROM pg_proc WHERE oid = 'public.my_listing(uuid)'::regprocedure;
  IF strpos(v_src, 'WHERE l.id = p_listing_id AND l.seller_id = v_uid;') = 0 THEN
    RAISE EXCEPTION 'B16T3 P1b: my_listing''s read is not keyed by the caller';
  END IF;

  -- P2. Who may call them: anon never, a signed-in user yes.
  IF has_function_privilege('anon', 'public.my_listing(uuid)', 'EXECUTE')
     OR has_function_privilege('anon', 'public.listing_history(uuid)', 'EXECUTE') THEN
    RAISE EXCEPTION 'B16T3 P2: anon may execute my_listing or listing_history';
  END IF;
  IF NOT has_function_privilege('authenticated', 'public.my_listing(uuid)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.listing_history(uuid)', 'EXECUTE') THEN
    RAISE EXCEPTION 'B16T3 P2: authenticated may not execute my_listing or listing_history';
  END IF;

  -- P5. my_listing's row object is my_listings' row object, byte for byte (one row, one truth: the list and the page
  -- cannot disagree about an ad's days, dates or marks).
  v_seg := substring(v_src FROM strpos(v_src, 'jsonb_build_object(' || chr(10) || '               ''id'', l.id,'));
  v_seg := substring(v_seg FOR strpos(v_seg, 'LIMIT 1) END)') + length('LIMIT 1) END)') - 1);
  SELECT count(*) INTO v_n FROM pg_proc
   WHERE oid = 'public.my_listings(text,integer,integer)'::regprocedure
     AND length(v_seg) > 2000
     AND strpos(replace(prosrc, chr(13), ''), v_seg) > 0;
  IF v_n <> 1 THEN RAISE EXCEPTION 'B16T3 P5: my_listing''s row object differs from my_listings'''; END IF;

  -- P6. listing_history is its earlier body (20261014194317) with one key added.
  SELECT md5(replace(replace(p.prosrc, chr(13), ''), replace('           -- Bundle 16 turn 3 — a Reserved change says which way it went (true: marked, false: unmarked).
           ''reserved'', h.a->''reserved'',
', chr(13), ''), ''))
    INTO v_md5 FROM pg_proc p WHERE p.oid = 'public.listing_history(uuid)'::regprocedure;
  IF v_md5 IS DISTINCT FROM 'fdfa8a65b00f20b724f01f7715113188' THEN
    RAISE EXCEPTION 'B16T3 P6: listing_history differs from its earlier body beyond the added key';
  END IF;

  -- P3. No session: refused at the first gate.
  PERFORM set_config('request.jwt.claims', '', true);
  BEGIN
    PERFORM public.my_listing(gen_random_uuid());
    RAISE EXCEPTION 'B16T3 P3: my_listing answered a call with no session';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'not authenticated' THEN RAISE EXCEPTION 'B16T3 P3: my_listing: %', v_msg; END IF;
  END;
  BEGIN
    PERFORM public.listing_history(gen_random_uuid());
    RAISE EXCEPTION 'B16T3 P3: listing_history answered a call with no session';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'not authenticated' THEN RAISE EXCEPTION 'B16T3 P3: listing_history: %', v_msg; END IF;
  END;

  -- P4. A scratch identity that owns nothing (a fresh uuid; no auth.users row is read or written): an ad id that is
  -- not its own gets the one refusal.
  PERFORM set_config('request.jwt.claims', json_build_object('sub', gen_random_uuid())::text, true);
  BEGIN
    PERFORM public.my_listing(gen_random_uuid());
    RAISE EXCEPTION 'B16T3 P4: my_listing answered for an ad the caller does not own';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'not your listing' THEN RAISE EXCEPTION 'B16T3 P4: my_listing: %', v_msg; END IF;
  END;
  BEGIN
    PERFORM public.listing_history(gen_random_uuid());
    RAISE EXCEPTION 'B16T3 P4: listing_history answered for an ad the caller does not own';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'not your listing' THEN RAISE EXCEPTION 'B16T3 P4: listing_history: %', v_msg; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '', true);
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('<MARK>') ON CONFLICT (version) DO NOTHING;
----- END MIGRATION -----
```
