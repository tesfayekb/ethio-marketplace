# Bundle 16 — turn R2: the seller's edit in boxes, Post similar, the renew settings: brief, version 1 (saved unchanged, 2026-10-15)

```text
BUNDLE 16 — TURN R2 (2026-10-15). ONE TURN, ONE MIGRATION, STRINGS, TEST EDITS AND NEW TESTS WRITTEN BY YOU. No package change.
Base: dev 92b359aa (turn R1). The census below proves every file and the database by content. This file is public: it is written as build instructions.
Tier A: the migration (`edit_my_listing`, the seller's edit of a published ad; `copy_my_listing`, a new draft from one of the seller's ads). Tier B: the pages, the edit form's seller form, the photo routes' status list, the E2E tests. Tier C: the strings, the docs, the allowlist, the roadmap and the changelog.

ANSWERS TO THE LAST TURN
- Turn R1 is verified on dev 92b359aa: the 23 carrier paths equal the supervisor's copy byte for byte; the brief (aba51adb…), your two test files and the migration (the brief's text, mark 20261015200000) are as written. This turn's census (d) reads that mark on ethio-prod.
- The two test diffs you did not paste were read by the supervisor from dev. MLA-12's last step (Reopen's colour against the closed ad's own Mark as sold) is right as written.
- CI: turn 3c's commit af5998e0 is green (run 38671571434, its re-run after the staging apply). The run on 92b359aa (turn R1) was still running when this brief was written; the supervisor reads it, and a fix it needs comes in the next turn.
- The operator's walk of R1's published site: a published ad has no Edit. This turn builds it.

WHY THIS TURN
- The operator's walk of turn R1 (2026-10-15): "I don't see where a user can do edit of own listing. Still not there. User needs to be able to edit an advert."
- D172 (the edit in boxes: photos, title and description, specifications, price; the category never changes), D177 (what applies at once and what goes to review), D182 4 (Post a similar ad in each ad's menu, with the edit turn), D174 3 and D175 2 (the admin's renew settings).
- INC-631: the photo routes refused a closed ad's photos — their list of open statuses (`PHOTO_OPEN_STATUSES`, src/server/media/hold.ts) predates the closed status.

WHAT THIS TURN BUILDS
- The migration (the appendix):
  A. `edit_my_listing(p_listing_id uuid, p_changes jsonb)` (NEW; VOLATILE SECURITY DEFINER, search_path public; signed-in users only). The seller's edit of a published ad. The order of its checks:
    - no session → 'not authenticated';
    - `p_changes` not an object, or empty → 'nothing to change';
    - a key other than title, description, video_url, attributes, price_mode, price_amount, price_currency, price_period, price_bp, price_negotiable → 'not editable: <key>';
    - a deactivated account → 'account is deactivated';
    - the 'revise' rate dial → 'rateLimited';
    - the ad, locked: missing or deleted → 'listing not found'; another seller's → 'not your listing'; a draft → 'a draft is written in the posting form'; screening or held → 'an ad in review is edited once its review is done'; expired → 'an expired listing is renewed before it is edited'; anything but active, reduced, closed or rejected → 'this listing is not edited'.
    - The judge: `validate_listing_draft` through step 5, every field the seller did not send read from the ad. A refusal is the answer (`{ok:false, refusals}`) and nothing is written.
    - What goes to review (D177): a changed title, description, video link or typed price note; an answer whose "Other" words changed; a changed answer to a question that is not a pick (a text question, or a key the leaf does not ask); and any edit of a refused ad. The ad goes to screening with the days it had left kept (call A, as `edit_listing` does). Anything else — an amount, an answer picked from a list — applies at once and the ad keeps its status.
    - No change at all → 'nothing changed'. Otherwise one `edit` revision with the changed fields.
    - The answer: `{ok:true, status, review}`.
  B. `copy_my_listing(p_listing_id uuid)` (NEW; same header and grants). Post similar (D182 4):
    - no session; deactivated; the 'draft' rate dial; missing or deleted; another seller's; a draft → 'a draft is not copied'; a removed or refused ad → 'a removed or refused listing is not copied'; no residency fact → 'residencyUnknown'.
    - It inserts a new draft of the caller's own: the ad's category, place, title, description, answers, price fields, unit, video link, contact choice, pin, street address and directions; status draft, `draft_step` 1, the home country from `user_directory.observed_country_code` (DEC-068). No photos, no dates, no marks. Its places are copied from `listing_locations`. One `create` revision whose `after` names `copied_from`.
    - The answer: `{ok:true, listing_id}`.
  P. Proofs: both headers and privileges; a call with no session refused by both; a scratch identity's empty, category or contact change refused before any table is read. No proof creates or reads a listing.
- The carrier:
  - the ad's page (src/features/my-listings/my-listing-page.tsx):
    - **Edit** (`my-listing-edit`, outlined, pencil, first in the bar) on a live, closed or refused ad;
    - it opens the edit panel (`my-listing-edit-panel`) in the place of the ad as buyers see it: the heading `my-listing-edit-heading` ("Edit your ad"), then the admin's edit form in its seller form. While it is open the bar's buttons are hidden;
    - Save sends the changed fields to `edit_my_listing`: the line `my-listing-notice` says "Your changes are saved." or, when they went to review, `myListings.editBox.doneReview`, and the panel closes; a refusal lands under its field and the panel stays open; Cancel closes it;
    - **Post similar** (`my-listing-copy`, outlined, before Delete) on any ad but a draft, a removed or a refused one: it calls `copy_my_listing` and opens the new draft at /post/<id>;
    - `?edit=1` in the address opens the page with the panel open (src/routes/my-listings_.$listingId.tsx, `validateSearch`);
  - the list (src/features/my-listings/my-listings-page.tsx): a live, closed or refused ad's row has **Edit** (`my-listing-<id>-edit`), which opens /my-listings/<id>?edit=1; the three-dots gain **Post similar** (`my-listing-<id>-more-copy`), last, on the same ads as the page;
  - the doors' callers (src/features/my-listings/my-listing.ts): `EDITABLE_STATUSES`, `copyable`, `editMyListing`, `copyMyListing`, and three refusals in words in `actionErrorKey`;
  - the edit form (src/features/admin-listings/edit-form.tsx, edit-listing.ts): `variant="seller"` (no reason; the seller's words on the save box; "Nothing has changed yet." when nothing changed) and a Photos box first (`listing-edit-photos-box`: the posting form's photo tools — a photo is added, moved or removed at once — and the video link, `post-video`). `EditableListing` and the video link in `valuesOf` and `editChanges`; the admin's form is unchanged and never sends the video link;
  - Admin › Listings › All listings: **Settings** in the header (`listings-settings`, listings:enforce only) opens the dialog `listings-settings-dialog` (src/features/admin-listings/listing-settings.tsx, NEW; listing-policy.ts, NEW): the switch `listings-settings-renew`, the days `listings-settings-days` (1–365), Save (`listings-settings-save`, through `admin_set_listing_policy` with a fresh second factor), Cancel (`listings-settings-cancel`); the saved line is the page's notice (`listings-notice`);
  - `PHOTO_OPEN_STATUSES` gains `closed` (INC-631);
  - the two doors in src/integrations/supabase/types.ts;
  - the unit tests ML-U17…ML-U20 (my-listing-edit.test.ts, NEW), RS-1…RS-3 (listing-policy.test.ts, NEW), LE-7;
  - the strings (below), the docs (my-listings, admin-listings), the public-surface allowlist's two lines, the changelog and the roadmap.
- The usage maps (docs/generated/i18n-usage.json, public/i18n-usage.json) are regenerated by you with `bun run i18n:usage`; the hashes below say what they must be.
- THE TESTS (below): you edit MLP-6 and write ML-11, ML-12, ML-13, MLA-13, MLA-14 and AL-30.

THE STRINGS (English / Amharic; the supervisor's, read before they ship — G43; they travel in the carrier).
New, 18:
  - `myListings.editBox.title`: "Edit your ad" / «ማስታወቂያዎን ያስተካክሉ»
  - `myListings.editBox.save`: "Save changes" / «ለውጦቹን አስቀምጥ»
  - `myListings.editBox.hint`: "The price and the answers you pick from a list change at once. New words — the title, the description, the video link or an answer you type — go to review first, and the ad is out of search until they are approved." / «ዋጋው እና ከዝርዝር የሚመርጧቸው መልሶች ወዲያውኑ ይቀየራሉ። አዲስ ቃላት — አርዕስቱ፣ መግለጫው፣ የቪዲዮ ሊንኩ ወይም የሚጽፉት መልስ — መጀመሪያ ለግምገማ ይሄዳሉ፤ እስኪጸድቁ ድረስ ማስታወቂያው በፍለጋ አይታይም።»
  - `myListings.editBox.photosHint`: "Photos are saved as you add, change or remove them." / «ፎቶዎች ሲጨምሩ፣ ሲቀይሩ ወይም ሲያስወግዱ ወዲያውኑ ይቀመጣሉ።»
  - `myListings.editBox.done`: "Your changes are saved." / «ለውጦችዎ ተቀምጠዋል።»
  - `myListings.editBox.doneReview`: "Your changes are saved and sent for review. The ad is out of search until they are approved; then it is live again with the days it had left." / «ለውጦችዎ ተቀምጠው ለግምገማ ተልከዋል። እስኪጸድቁ ድረስ ማስታወቂያው በፍለጋ አይታይም፤ ከዚያም በቀሩት ቀናቱ እንደገና በቀጥታ ይሆናል።»
  - `myListings.editBox.nothing`: "Nothing has changed yet." / «እስካሁን ምንም አልተቀየረም።»
  - `myListings.action.copy`: "Post similar" / «ተመሳሳይ ይለጥፉ»
  - `admin.listings.settings.open`: "Settings" / «ቅንብሮች»
  - `admin.listings.settings.title`: "Renewing ads" / «ማስታወቂያዎችን ማደስ»
  - `admin.listings.settings.body`: "A seller renews an expired ad for a new run. These two settings apply to every renewal from now on." / «ሻጭ ጊዜው ያለፈበትን ማስታወቂያ ለአዲስ ጊዜ ያድሳል። እነዚህ ሁለት ቅንብሮች ከአሁን ጀምሮ ለእያንዳንዱ እድሳት ይሠራሉ።»
  - `admin.listings.settings.renewAllowed`: "Sellers may renew an expired ad" / «ሻጮች ጊዜው ያለፈበትን ማስታወቂያ ማደስ ይችላሉ»
  - `admin.listings.settings.renewDays`: "Days per renewal" / «ለእያንዳንዱ እድሳት ቀናት»
  - `admin.listings.settings.daysHelp`: "A whole number from 1 to 365." / «ከ1 እስከ 365 ያለ ሙሉ ቁጥር።»
  - `admin.listings.settings.save`: "Save settings" / «ቅንብሮችን አስቀምጥ»
  - `admin.listings.settings.saved`: "The renew settings are saved." / «የእድሳት ቅንብሮቹ ተቀምጠዋል።»
  - `admin.listings.settings.loadError`: "The settings could not be read." / «ቅንብሮቹ ሊነበቡ አልቻሉም።»
  - `admin.listings.settings.failed`: "The settings were not saved." / «ቅንብሮቹ አልተቀመጡም።»

DECIDED BY THE OPERATOR
- D172: the edit in boxes; the category never changes. D177: amounts and picked answers apply at once, words go to review. D182 4: Post a similar ad in each ad's menu. D174 3, D175 2: the admin's two renew settings.

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- The edit opens on the ad's own page, in the place of the ad as buyers see it; the list's Edit goes there with `?edit=1`. Edit is on live, closed and refused ads; an ad in review, an expired, sold or removed ad has none (the door says the same).
- The seller's boxes are the admin's edit form in a seller form, so the two never drift apart: the same boxes and judge, no reason, the Photos box first.
- Photos are added, moved and removed at once, as in the posting form. On a live ad each change is recorded for staff in Admin › Screening (D154 B5), and the photo review of every change is turn 4 (D178).
- A refused ad's edit is its resubmission: it always goes to review.
- The label is "Post similar" («ተመሳሳይ ይለጥፉ»): the house's action labels are at most three words with no article (scripts/list-action-labels.ts). It is on every ad but a draft, a removed one (staff's) or a refused one (it is edited instead); the copy has no photos, and the posting form opens on it.
- The renew Settings dialog reads the row once when it opens; a days box outside 1–365 is refused before any call.

THE TESTS — you edit and write them this turn, from the descriptions below (Tier B). The supervisor ran the migration's behaviour on its local stand-in; your tests prove the doors, the pages and the dialog on ethio-staging.
General rules (each applies to every test):
- Each new test goes in its file's own `test.describe`, after the file's last test, titled exactly as below; reuse the file's own helpers (named below). At most two leased accounts per test (DEC-174).
- Every listing, category, attribute, place and notice row is a scratch row the test seeds through the service client or the seller's own doors and removes (J3, G27): push every new listing id (a copy's too) to the file's `listingIds`; remove a spec set with `destroySpecSet` in the test's `finally`. No real row is changed; every row is found by its own id (G28). No test writes `listing_policy`.
- Text is typed by the keyboard (`click`, then `page.keyboard.type`); a box is cleared with Control+A and Backspace.
- Words are asserted from en.ts (`en["…"]`), with `{count}` and `{days}` filled as the page fills them.
- G38: no assertion loosened, no timeout raised, no retry added, no dial raised.

THE EDIT (nothing else in this test changes):
- MLP-6 (e2e/my-listings-page.spec.ts): X's box — `my-listing-<X>-edit` is now visible (it was asserted to count 0); click it: the URL is /my-listings/<X>?edit=1 and `my-listing-edit-heading` is visible; go back to /my-listings and continue as before. The menu's items, in order, gain `my-listing-<X>-more-copy` last.

ML-11 "ML-11 edit_my_listing: amounts and picked answers apply at once; words and a refused ad's edit go to review (D177)" (e2e/my-listings-doors.spec.ts; `scratchSeller`, `seed`, `asPerson`, `listingTruth`, `revisionRows`; `seedSpecSet` and `destroySpecSet` from ./helpers/posting)
- Seller A; a spec set on A's leaf (`seedSpecSet(A.leafId)`; its text question is required). X, Y, Z, W live; C closed (`seed(A, "closed")`); R refused (`seed(A, "rejected")`). Through the service client, set each one's `attributes` to `{ [text]: "first words", [select]: optionValues[0] }`.
- As A, through `edit_my_listing` with named arguments:
  - X, `attributes` with the select changed to optionValues[1] (the text unchanged) → `{ ok: true, status: "active", review: false }`; X's truth: status active, the select's answer optionValues[1]; one new `edit` revision;
  - X, the price — `price_mode` "fixed", `price_amount` 80, `price_currency` "ETB", `price_period` "once" → review false; status active; `price_amount` 80;
  - Y, `attributes` with the text changed to "other words" → `{ ok: true, status: "screening", review: true }`; Y's `clock_kept` is true;
  - Z, `title` "E2E new words <token>" → review true, status screening;
  - W, `video_url` "https://youtu.be/dQw4w9WgXcQ" → review true, status screening;
  - C, the price at 70 → `{ ok: true, status: "closed", review: false }`;
  - R, the price at 70 → `{ ok: true, status: "screening", review: true }`.

ML-12 "ML-12 edit_my_listing refuses what a box may not change, an ad it may not edit and another seller's, and writes nothing" (e2e/my-listings-doors.spec.ts; `scratchSeller`, `seed`, `asPerson`, `snapshot`, `revisionCount`)
- Seller A and seller B (`scratchSeller` each). A's ads: X live; D draft; S screening; E expired; O sold; G live, then deleted through the service client (`deleted_at` now). B's ad: Q live.
- As A, each call's error is the exact text, and each ad's `snapshot` and `revisionCount` are unchanged after it:
  - X `{}` → 'nothing to change'; X `{ category_id: <A's parent id> }` → 'not editable: category_id'; X `{ contact_pref: {} }` → 'not editable: contact_pref';
  - D → 'a draft is written in the posting form'; S → 'an ad in review is edited once its review is done'; E → 'an expired listing is renewed before it is edited'; O → 'this listing is not edited'; G → 'listing not found'; Q → 'not your listing';
  - X `{ title: <X's own title> }` → 'nothing changed'.
- As A, X with `price_amount` -5 (the other price fields as seeded) → the data `{ ok: false, refusals: [...] }` with a refusal whose field starts with "price"; X unchanged; no new revision.

ML-13 "ML-13 copy_my_listing: a new draft with the ad's details and places, without photos or dates; drafts, removed, refused and others' ads are not copied (D182 4)" (e2e/my-listings-doors.spec.ts; `scratchSeller`, `seed`, `asPerson`, `listingTruth`)
- Seller A and seller B. A's X: sold (`seed(A, "sold")`), its `video_url` set through the service client. A's D draft, M removed, R refused. B's Q live.
- As A, `copy_my_listing` X → `{ ok: true, listing_id: N }` (push N to `listingIds`). N's truth: status draft, `draft_step` 1, `seller_id` A, the same `category_id`, title, description, attributes, `price_amount`, `price_currency`, `video_url` and `contact_pref` as X; `home_country_code` equal to A's `user_directory.observed_country_code` (read through the service client); `published_at`, `expires_at`, `sold_at` null. N's `listing_locations` equal X's; N has no `listing_photos` row; N has one `create` revision whose `after.copied_from` is X.
- As A: D → 'a draft is not copied'; M and R → 'a removed or refused listing is not copied'; Q → 'not your listing'.

MLA-13 "MLA-13 Edit on the ad's page: a price at once, new words to review, a refusal under its field (D172, D177)" (e2e/my-listings-ad.spec.ts; `scratchSeller`, `seed`, `openAd`, `listingTruth`; both projects)
- Seller A; X live. `openAd(page, X)`.
- `my-listing-edit` is visible and comes before `my-listing-action-sell` in `my-listing-actions` (document order). Click it: `my-listing-edit-heading` reads en["myListings.editBox.title"]; `listing-edit-photos-box` holds `post-video`; `my-listing-as-seen` and `my-listing-action-sell` count 0.
- `listing-edit-save` with nothing changed: `listing-edit-problem` reads en["myListings.editBox.nothing"].
- Clear `post-price-amount` and type "90"; Save: `my-listing-notice` reads en["myListings.editBox.done"]; the panel is gone; X's truth: status active, `price_amount` 90.
- Edit again; clear `listing-edit-title` and type "E2E new words <token>"; Save: the notice reads en["myListings.editBox.doneReview"]; X's status is screening; `my-listing-info` reads en["myListings.ad.waiting"] and `my-listing-edit` counts 0.
- Seller A's Y live: open it, Edit, clear the title (leave it empty); Save: `listing-edit-title-field` contains en["post.refusal.required"]; the panel stays open; Y's title is unchanged in the database.

MLA-14 "MLA-14 Edit from the list's row opens the boxes; Post similar opens a new draft (D172, D182 4)" (e2e/my-listings-ad.spec.ts; `scratchSeller`, `seed`, `openAd`; both projects)
- Seller A; X live; S sold.
- Open /my-listings: on X's row (the table row from 1280 px, the card below) `my-listing-<X>-edit`: the URL becomes /my-listings/<X>?edit=1 and `my-listing-edit-heading` is visible.
- `openAd(page, S)`: `my-listing-edit` counts 0; `my-listing-copy` reads en["myListings.action.copy"]; click it: the URL becomes /post/<N> for a new id N (push N to `listingIds`); N's truth is a draft of A with S's title.

AL-30 "AL-30 Settings in All listings: the renew settings as stored, Cancel changes nothing, a day count outside 1 to 365 is refused before any call; no Settings without listings:enforce (D174 3, D175 2)" (e2e/admin-listings.spec.ts; `scratchHolder` and the file's sign-in as AL-28 uses them; both projects)
- Read `listing_policy`'s renew_allowed and renew_days through the service client: P.
- A holder of listings:view and listings:enforce opens Admin › Listings: `listings-settings` is visible in `listings-header`; click it: `listings-settings-dialog` shows `listings-settings-renew` checked as P says and `listings-settings-days` holding P's days.
- Clear the days and type "0"; `listings-settings-save`: `listings-settings-problem` reads en["admin.listings.settings.daysHelp"]; the dialog stays open.
- `listings-settings-cancel`: the dialog is gone; open it again: the values are P's again. `listing_policy` still equals P (no write).
- A holder of listings:view only: `listings-settings` counts 0.

After writing them: `node_modules/.bin/prettier --write e2e/my-listings-page.spec.ts e2e/my-listings-doors.spec.ts e2e/my-listings-ad.spec.ts e2e/admin-listings.spec.ts`. No other test is edited.

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, dev 92b359aa with this turn's carrier files)
- Clean: typecheck (it covers e2e/), format, lint (0 errors, 33 warnings), 883 unit tests (153 files), the usage maps regenerated (they match), the hardcoded-strings guard (0 findings), the import and listing-write guards, the e2e selector's self-test, the build and the bundle budget (first-paint JS 315.0 KiB of 320).
- The census of what this turn changes, in the tests: `git grep -n "my-listing-no-action\|more-close\|my-listing-edit\|listings-header\|actionButtons" e2e` — MLP-6's two lines are the only ones that change; MLA-5 and MLA-6 keep `my-listing-no-action` at 0 (a sold ad and an ad in review now show Post similar, which is not one of `actionButtons`); AL's heading read in `listings-header` is unchanged.
- The migration on a local PostgreSQL 16 over stand-in tables holding turns 1–R1: applied cleanly, its proofs passed, with LF and with CRLF line endings. Behaviour: a picked answer and an amount at once; the text, title, video link and a refused ad's edit to review with the clock kept; every refusal above; the judge's refusal writing nothing; the copy with its places and revision, and its refusals. A copy that opened `copy_my_listing` to anon was refused by P2.
- `scripts/check-migrations.sh` with this migration as 20261015230000_b16r2-check.sql: "Migration guard OK".
- The Amharic strings were checked by script: Ethiopic letters and punctuation only, the placeholders equal to the English.
- Not run by the supervisor: the browser tests (its sandbox cannot reach ethio-staging). CI on the final commit runs them.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-16-turn-r2.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines. Whatever it shows, go on: the CI read is the supervisor's, and a fix it needs comes in the next turn. Do not stop on it. You cannot git-fetch that branch. Paste `git rev-parse HEAD`: this is <START>;
  2. step 0;
  3. the census (below), files and database. If any result differs from what it expects, STOP and report: write nothing else. One exception, known in advance: if the platform has regenerated src/routeTree.gen.ts since turn R1, name the difference and go on;
  4. the carrier, then `bun run i18n:usage`, then the hashes;
  5. THE TESTS (the edit, then the new tests);
  6. the checks;
  7. the migration LAST, then its read-back;
  8. the report;
  9. END THE TURN.
  Do not stop between steps.
- The migration is the last thing written, because the database tool applies it on ethio-prod the moment it is saved. The operator will see the "Modify Supabase database" dialog and allow it. The two doors are new; nothing published calls them until the next Publish.
- The carrier's sections end with a newline each, blank lines included: write every section's bytes exactly as they stand between its header line and the next header. Check each written file's sha256 against the table before you go on.
- src/integrations/supabase/types.ts travels in the carrier with the two doors, in the generator's own form. If the platform regenerates that file after the migration and its sha256 then differs from the table, paste `git diff` of it in the report and keep the platform's file.
- If any rule of yours conflicts with the text, STOP before saving and quote that rule's exact words in the report.
- Scope — these files only: the 23 paths of the hash table (the carrier's files and the two usage maps), the brief, e2e/my-listings-page.spec.ts, e2e/my-listings-doors.spec.ts, e2e/my-listings-ad.spec.ts, e2e/admin-listings.spec.ts and the one new migration file (the database tool names it). The database: ethio-prod through your tools — SELECT only, except the migration itself. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-16-turn-r2.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 17 files → each equal to:
  8263c925e1532e827512ec1942b3e271b06069820f934a15285b11d7da117b0e  docs/_changelog.md
  8d8be12cb2c1282e9f40cdce76fc9656f98accd9db33ae2530b14010c640449e  docs/features/admin-listings.md
  bd247056c26681098ebc104602937048f4dbe29db3bcc6b139f92c74167d98d1  docs/features/my-listings.md
  3317d8aa9ad7c292bc5a2bcde72fc584216988b4f5e94ab7bd7fadb64ffa5299  roadmap.md
  7777c15cfa84ba14ae32034449a1d94d1aeb7c5db9df2a13365188925ca7b7c3  scripts/public-surface-allowlist.txt
  e9cb8f655d3e1f4710402dd02bcfdd9e0b6d7d0093ee8e83c620717c04e3e61f  src/features/admin-listings/edit-form.tsx
  075477db110b479e637da633c44c234655e9b2a6f8e327c39b4c3c013dc33de7  src/features/admin-listings/edit-listing.test.ts
  f203660d95bfc662f918f35cdf54ae3b40550b0bab2c273c494f56cd86637d8a  src/features/admin-listings/edit-listing.ts
  b2b792ac733f892092c2de5475f29539a17b7c3aa0a1d02a09fdf9f5dbfd5374  src/features/admin-listings/listings-page.tsx
  415431493ae769407e45d82a71d7d843dd013b36de4690fc617cced82c692382  src/features/my-listings/my-listing-page.tsx
  1bf906b9902fca3f9077171372ec4dd4acf03a612062d5dad0161268780f6126  src/features/my-listings/my-listing.ts
  f30afe83d5384d1e62139534d266a889c9e6069e7384be1f2ccedf3d77c1a6b1  src/features/my-listings/my-listings-page.tsx
  a6b087eeef6d8213df4829d355861ed1d57d7237eeb2e3129d370e0a2d752067  src/i18n/locales/am.ts
  7910f04b2d510ab6b311a306290b32d8f174b56bd0640ace5dc020053896542b  src/i18n/locales/en.ts
  c32787480a6f56038192dab2ed88332536fdea8b8f468c968b907d6ceda5b274  src/integrations/supabase/types.ts
  68fdc9d71d3c063f353f76e45559cf959c2ac8a7d12cdb1095ea433d033d21b3  src/routes/my-listings_.$listingId.tsx
  d6cd402f601d0cc06de9083a8265d8c74fcca54dad7c27db1cb2546a9190a69f  src/server/media/hold.ts
  and `ls src/features/admin-listings/listing-settings.tsx src/features/admin-listings/listing-policy.ts 2>/dev/null` → nothing (the files do not exist yet).
- (c) `sha256sum e2e/my-listings-page.spec.ts e2e/my-listings-doors.spec.ts e2e/my-listings-ad.spec.ts e2e/admin-listings.spec.ts` → db528ca58f13cf7620623ee61d0f65f57892370811b09285f0d27bfc4bc557fb, 7bef68689fb34a10183574ac915bfb83f997216409e1c39cc1966eb53ee94ce7, 3a5b830feb14a4b26bcd685ecd10ccd32e3faa41bd6f19480bc1f26dc32f5c47 and 6e3227d552de09c88f83548e6c257d1ec8181f12e8ac0f6db8c68b445a37abd7; `ls supabase/migrations | tail -1` → 20261015071455_998967c9-c033-4e41-b4d4-94908cd5439d.sql (turn R1's; no migration since).
- (d) ethio-prod, your query tool (SELECT only):
  - `select max(version) from public.migration_marks;` → 20261015200000;
  - `select to_regprocedure('public.edit_my_listing(uuid,jsonb)') is null, to_regprocedure('public.copy_my_listing(uuid)') is null, to_regprocedure('public.validate_listing_draft(uuid,smallint,uuid,text,text,text,jsonb,text,numeric,character,text,timestamp with time zone,uuid[],jsonb,jsonb,integer,boolean)') is not null, to_regprocedure('public.attr_answer_other_text(jsonb)') is not null;` → t | t | t | t.

THE CARRIER — B16R2-TURN-CARRIER-2026-10-15.md (73,854 bytes; sha256 7f394e7c72724cf6a1e529ed93ddc7a1118f767fad5e0d108a36fbdd604025e7; 53 sections)
- Its first line starts "B16R2 TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`. No blank line separates the sections.
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
  0f7cbd55d7c8c4cc13dd508bbc47e3196439cfee12602195f7ce5e57941e1bc0  docs/_changelog.md
  62f9c18c7d12432e49adce055afc492ef358763ef6ebfec5158438c914f882fc  docs/features/admin-listings.md
  84b6adeabc61631589417644635785f1133d1f5f2cdc80b776bb3b86e417f800  docs/features/my-listings.md
  843665844494b4148e52f5e7da20c48417a95ff0c965a302a58a439e28a26e3a  docs/generated/i18n-usage.json
  843665844494b4148e52f5e7da20c48417a95ff0c965a302a58a439e28a26e3a  public/i18n-usage.json
  b37f7270c18c07c662d71b312660fe5d8835609b53c324ac0319011d5a51c63a  roadmap.md
  8bebe6f4fde88630c2767909cf7779bc2f5d5d12ff3e18515fb951ec5ff75851  scripts/public-surface-allowlist.txt
  b5c4e70bb38683d44232df2765d7614123dc915ba14239f553884bb39d1d4fa1  src/features/admin-listings/edit-form.tsx
  61a07f26a6315d0aa84c3d1322d7f417750672c51fe1cd2460841776ed52c4ad  src/features/admin-listings/edit-listing.test.ts
  bf9d42bcd4238ce78b2370b27deabe8589e2aabc4d00218eb7dff4753775db56  src/features/admin-listings/edit-listing.ts
  b25dec00bf95fb7c5d9a67dc86dcf004136ddcd68af2fee0a53d74fc0fc6724f  src/features/admin-listings/listing-policy.test.ts
  27279d63170d2ff14454009b17d808d5f76b1cb896d0cb7f4674fb84639164f9  src/features/admin-listings/listing-policy.ts
  9451199a109876237318a0d6c9530e1885ce07952fdbaaa5764551d364d26b80  src/features/admin-listings/listing-settings.tsx
  94feb58a61e6996c1934ccc7be52ca69b7ef3e2d90b152fd263fc1f2e704dc06  src/features/admin-listings/listings-page.tsx
  d54bde7eced6076825df4ae13bdf2e60b8298e82f48a28539484375502aea9a4  src/features/my-listings/my-listing-edit.test.ts
  9e48079569cbf518e910f063648ece40d8df4851c1d55cd86dd780fff915b171  src/features/my-listings/my-listing-page.tsx
  f8a7f61ed35e1d77b29bd15bc6c6e59d0d1a7283a3583f2d9466be91739106f6  src/features/my-listings/my-listing.ts
  4c98bbe1a2b3c992a25b8d7417637c0dc6ed58d8be4bff6418f7b87a82882e54  src/features/my-listings/my-listings-page.tsx
  1f0afb3fc25e7d014255f3cf30d6317122434411e7d2ac578d4a80e557eafd7e  src/i18n/locales/am.ts
  3018736bc8384a98da3822aed339c097fa7d99fb80b4b39c358962808ab9a0e3  src/i18n/locales/en.ts
  b2843fe7d09f35d358722ab1a15cfb9c0c9c25bed921c781325306aa493bda2d  src/integrations/supabase/types.ts
  bc158c2bc0c57fd4ba9a45c8b3d7fe7a760589ccaccbf74d732548d49af2ac40  src/routes/my-listings_.$listingId.tsx
  0995673f99de5da5b70c9b3b83c9265af17c32309466b748771b2d8c7e3df8a2  src/server/media/hold.ts

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings — a warning in a test file of yours is fixed, not left;
- `bun run test:unit 2>&1 | tee /tmp/unit-b16r2.log` — 883 passed (153 files). Keep the whole output; if any test fails, paste its name and its first error line;
- `bun run i18n:map-guard` "usage maps match the tree.";
- `bash scripts/check-hardcoded-strings.sh` "findings: 0";
- `bun run scripts/e2e-select.ts --self-test` OK;
- `grep -n 'test("ML-11\|test("ML-12\|test("ML-13\|test("MLA-13\|test("MLA-14\|test("AL-30' e2e/*.spec.ts` → six lines, each in its file;
- Not run by you: the typecheck, the build and the bundle budget (your platform's rule). CI judges them.

THE BROWSER RUN — not this turn: the local browser does not start (INC-506). CI on the final commit runs every spec, yours included. A red in your tests is fixed in the next turn, at its cause (G38).

THE MIGRATION RULES (G39 — every one applies)
- The text is between the BEGIN and END lines of the appendix below. Write it EXACTLY, changing only `<MARK>`. Before the change, its sha256 is ac85bde8d7bbd1f00145135ca8fd2e062828807c5759abc760417ef3ef83b7ec (17,154 bytes, 297 lines, ending with a newline).
- Check it in a scratch folder first (after the checks):
  - copy supabase/migrations/*.sql into a temporary folder;
  - add the text, its `<MARK>` replaced by the mark you will use, under the name 20261015230000_b16r2-check.sql;
  - run `MIGRATIONS_DIR=<that folder> bash scripts/check-migrations.sh`.
  Paste its "guard OK" lines and "Migration guard OK".
- `<MARK>` is chosen at apply time:
  - read now() at time zone 'utc' on ethio-prod;
  - round it up to the next whole hour and add one hour (add twelve hours instead if the save dialog may wait);
  - if the result is below 20261015230000, use 20261015230000 (above 20261015200000, turn R1's mark, and equal to the scratch check's stamp);
  - the mark must also be later than the saved file's own stamp.
- Then hand the FINAL text to the database tool ONCE. Never a stub, a comment or a draft (INC-491).
- A clean apply is the proofs' pass: they RAISE EXCEPTION on any failure.

THE READ-BACK (ethio-prod, your query tool, SELECT only; paste each result)
- `select version from public.migration_marks where version = '<MARK>';` → one row;
- `select p.oid::regprocedure, p.provolatile, p.prosecdef, p.proconfig, has_function_privilege('anon', p.oid, 'EXECUTE'), has_function_privilege('authenticated', p.oid, 'EXECUTE') from pg_proc p where p.proname in ('edit_my_listing', 'copy_my_listing') and p.pronamespace = 'public'::regnamespace order by 1;` → two rows: copy_my_listing(uuid) | v | t | {search_path=public} | f | t, and edit_my_listing(uuid,jsonb) | v | t | {search_path=public} | f | t.

THE REPORT
- Done or not done, by step.
- The six ci-status lines, and <START>.
- The census results (a)–(d).
- The 23 sha256sum lines and the brief's; the sha256sum and line count of each of your four test files, and `git diff <START> -- e2e/my-listings-page.spec.ts e2e/my-listings-doors.spec.ts e2e/my-listings-ad.spec.ts e2e/admin-listings.spec.ts | head -900`.
- `git diff --name-only <START>` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only <START> HEAD` too. Expect the 23 paths, the brief, your four test files and the one migration file.
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
-- Bundle 16 (My listings), turn R2 (2026-10-15). Tier A. The seller's edit in boxes (D172, D177) and Post a similar
-- ad (D182 4).
-- e2e-areas: my-listings
--
-- A. edit_my_listing(listing, changes) — the seller's edit of a published ad, box by box: the title and the description,
--    the video link, the specifications, the price. Only the fields the seller changed travel; the category, the places,
--    the contact and the end date are never changed here (D172). It takes a live, reduced, closed or refused ad; an ad
--    in review waits for its answer (call G), an expired ad is renewed first (D174 3), a draft is written in the posting
--    form, any other is not edited. Judged as staff's edit is judged: the posting judge through step 5 with every
--    field the seller did not change read from the ad (INC-552). What goes to review (D177): free text — the title, the
--    description, the video link, a typed price note, a typed answer (a text question or the words of an "Other") —
--    and every edit of a refused ad; then the ad waits in review with the days it had left (call A, as edit_listing).
--    Amounts and answers picked from a list apply at once: the ad keeps its status. One `edit` revision with the
--    fields that changed; "nothing changed" when none did. The answer: ok, the status, review.
-- B. copy_my_listing(listing) — Post a similar ad (D182 4): a new draft of the seller's own with the ad's category,
--    words, answers, price, video link, places, pin and contact choice, and none of its photos, dates or marks; it
--    counts against the posting dial ('draft') and takes the server's residency fact for its home country (DEC-068),
--    as submit_listing does. Its `create` revision names the ad it was copied from. Not a draft, not a removed or refused
--    ad, not another seller's.
-- P. Proofs (RAISE EXCEPTION on any failure; a clean apply is the pass): the headers and privileges of both; a call
--    with no session refused by both; a scratch identity's empty or forbidden changes refused before anything is read.
--    The behaviour — what applies at once and what goes to review, the refusals, the copy — is proven by ML-11…ML-13
--    (e2e/my-listings-doors.spec.ts), MLA-13 and MLA-14 (e2e/my-listings-ad.spec.ts).

-- ===== A — edit_my_listing =====
CREATE OR REPLACE FUNCTION public.edit_my_listing(p_listing_id uuid, p_changes jsonb)
 RETURNS jsonb
 LANGUAGE plpgsql
 VOLATILE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid    uuid := auth.uid();
  v_prev   public.listings%ROWTYPE;
  v_row    public.listings%ROWTYPE;
  v_val    jsonb;
  v_key    text;
  v_attrs  jsonb;
  v_video  text;
  v_review boolean;
  v_before jsonb;
  v_after  jsonb;
  v_diff_a jsonb := '{}'::jsonb;
  v_diff_b jsonb := '{}'::jsonb;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  -- What a seller's box may change (D172): never the category, the places, the contact or the end date.
  IF p_changes IS NULL OR jsonb_typeof(p_changes) <> 'object' OR p_changes = '{}'::jsonb THEN
    RAISE EXCEPTION 'nothing to change';
  END IF;
  FOR v_key IN SELECT k FROM jsonb_object_keys(p_changes) k LOOP
    IF v_key NOT IN ('title','description','video_url','attributes','price_mode','price_amount',
                     'price_currency','price_period','price_bp','price_negotiable') THEN
      RAISE EXCEPTION 'not editable: %', v_key;
    END IF;
  END LOOP;
  IF EXISTS (SELECT 1 FROM public.profiles WHERE user_id = v_uid AND account_status = 'deactivated') THEN
    RAISE EXCEPTION 'account is deactivated';
  END IF;
  IF NOT coalesce((public.rate_gate('revise')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;

  SELECT * INTO v_prev FROM public.listings WHERE id = p_listing_id FOR UPDATE;
  IF NOT FOUND OR v_prev.deleted_at IS NOT NULL THEN RAISE EXCEPTION 'listing not found'; END IF;
  IF v_prev.seller_id <> v_uid THEN RAISE EXCEPTION 'not your listing'; END IF;
  IF v_prev.status = 'draft' THEN RAISE EXCEPTION 'a draft is written in the posting form'; END IF;
  -- Call G — an ad in review waits for its answer.
  IF v_prev.status IN ('screening','held') THEN
    RAISE EXCEPTION 'an ad in review is edited once its review is done';
  END IF;
  -- D174 3 — an expired ad is renewed before it is edited; an edit never renews it.
  IF v_prev.status = 'expired' THEN
    RAISE EXCEPTION 'an expired listing is renewed before it is edited';
  END IF;
  IF v_prev.status NOT IN ('active','reduced','closed','rejected') THEN
    RAISE EXCEPTION 'this listing is not edited';
  END IF;

  -- The seller's content rules for what a box changes (staff's edit is judged the same way, INC-552):
  -- validate_listing_draft through step 5, every field the seller does not change read from the ad as it stands;
  -- the end date and the places are not sent and the contact step is not reached — a box does not change them.
  v_video := CASE WHEN p_changes ? 'video_url' THEN nullif(btrim(coalesce(p_changes->>'video_url', '')), '')
                  ELSE v_prev.video_url END;
  v_val := public.validate_listing_draft(v_uid, 5::smallint, v_prev.category_id,
    CASE WHEN p_changes ? 'title' THEN p_changes->>'title' ELSE v_prev.title END,
    CASE WHEN p_changes ? 'description' THEN p_changes->>'description' ELSE v_prev.description END,
    v_video,
    CASE WHEN p_changes ? 'attributes' THEN p_changes->'attributes' ELSE v_prev.attributes END,
    CASE WHEN p_changes ? 'price_mode' THEN p_changes->>'price_mode' ELSE v_prev.price_mode END,
    CASE WHEN p_changes ? 'price_amount' THEN (p_changes->>'price_amount')::numeric ELSE v_prev.price_amount END,
    CASE WHEN p_changes ? 'price_currency' THEN (p_changes->>'price_currency')::char(3) ELSE v_prev.price_currency END,
    CASE WHEN p_changes ? 'price_period' THEN p_changes->>'price_period' ELSE v_prev.price_period END,
    NULL, NULL, v_prev.contact_pref, v_prev.attributes,
    CASE WHEN p_changes ? 'price_bp' THEN (p_changes->>'price_bp')::integer ELSE v_prev.price_bp END,
    CASE WHEN p_changes ? 'price_negotiable' THEN coalesce((p_changes->>'price_negotiable')::boolean, false)
         ELSE v_prev.price_negotiable END);
  IF NOT coalesce((v_val->>'ok')::boolean, false) THEN
    RETURN v_val;
  END IF;
  v_attrs := coalesce(v_val->'attrs', '{}'::jsonb);

  -- D177 (the operator, 2026-10-14) — what goes to review: free text — the title, the description, the video link,
  -- a typed price note, a typed answer (a text question, or the words of an "Other"); a refused ad's edit is its
  -- resubmission. Amounts and answers picked from a list apply at once and the ad stays as it is.
  v_review := v_prev.status = 'rejected'
    OR (v_val->>'title') IS DISTINCT FROM v_prev.title
    OR (v_val->>'description') IS DISTINCT FROM v_prev.description
    OR v_video IS DISTINCT FROM v_prev.video_url
    OR (v_val->>'price_unit_text') IS DISTINCT FROM v_prev.price_unit_text
    OR EXISTS (
      SELECT 1
        FROM (SELECT k FROM jsonb_object_keys(v_attrs) k
              UNION
              SELECT k FROM jsonb_object_keys(coalesce(v_prev.attributes, '{}'::jsonb)) k) ak(k)
       WHERE (v_attrs -> ak.k) IS DISTINCT FROM (v_prev.attributes -> ak.k)
         AND (public.attr_answer_other_text(v_attrs -> ak.k)
                IS DISTINCT FROM public.attr_answer_other_text(v_prev.attributes -> ak.k)
              OR NOT EXISTS (SELECT 1
                               FROM public.effective_category_links(v_prev.category_id) e
                               JOIN public.attributes a ON a.id = e.attribute_id
                              WHERE a.attr_key = ak.k AND a.attr_type <> 'text')));

  UPDATE public.listings SET
    title            = v_val->>'title',
    description      = v_val->>'description',
    video_url        = v_video,
    attributes       = v_attrs,
    price_amount     = (v_val->>'price_amount')::numeric,
    price_currency   = (v_val->>'price_currency')::char(3),
    price_mode       = v_val->>'price_mode',
    price_period     = v_val->>'price_period',
    price_bp         = (v_val->>'price_bp')::integer,
    price_negotiable = coalesce((v_val->>'price_negotiable')::boolean, false),
    price_unit       = v_val->>'price_unit',
    price_unit_text  = v_val->>'price_unit_text',
    status           = CASE WHEN v_review THEN 'screening' ELSE v_prev.status END,
    -- Bundle 16 call A, as edit_listing — an ad that goes to review keeps the time it had left until its answer.
    clock_kept       = CASE WHEN v_review AND v_prev.status IN ('active','reduced','closed') THEN true
                            ELSE v_prev.clock_kept END,
    kept_remaining   = CASE WHEN v_review AND v_prev.status IN ('active','reduced') THEN
                              CASE WHEN v_prev.expires_at IS NULL THEN NULL
                                   ELSE greatest(v_prev.expires_at - now(), interval '0') END
                            ELSE v_prev.kept_remaining END,
    resume_status    = CASE WHEN v_review THEN NULL ELSE v_prev.resume_status END,
    updated_at       = now()
  WHERE id = p_listing_id
  RETURNING * INTO v_row;

  v_after  := to_jsonb(v_row) - 'search_tsv' - 'updated_at';
  v_before := to_jsonb(v_prev) - 'search_tsv' - 'updated_at';
  FOR v_key IN SELECT k FROM jsonb_object_keys(v_after) k LOOP
    IF (v_after->v_key) IS DISTINCT FROM (v_before->v_key) THEN
      v_diff_a := v_diff_a || jsonb_build_object(v_key, v_after->v_key);
      v_diff_b := v_diff_b || jsonb_build_object(v_key, v_before->v_key);
    END IF;
  END LOOP;
  IF v_diff_a = '{}'::jsonb THEN
    RAISE EXCEPTION 'nothing changed';
  END IF;

  INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
    VALUES (p_listing_id, v_uid, 'edit', v_diff_b, v_diff_a, v_uid);

  RETURN jsonb_build_object('ok', true, 'status', v_row.status, 'review', v_review);
END $function$;
REVOKE ALL ON FUNCTION public.edit_my_listing(uuid, jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.edit_my_listing(uuid, jsonb) TO authenticated;
GRANT ALL ON FUNCTION public.edit_my_listing(uuid, jsonb) TO service_role;

-- ===== B — copy_my_listing =====
CREATE OR REPLACE FUNCTION public.copy_my_listing(p_listing_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 VOLATILE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid  uuid := auth.uid();
  v_src  public.listings%ROWTYPE;
  v_row  public.listings%ROWTYPE;
  v_obs  char(2);
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF EXISTS (SELECT 1 FROM public.profiles WHERE user_id = v_uid AND account_status = 'deactivated') THEN
    RAISE EXCEPTION 'account is deactivated';
  END IF;
  -- A copy is a new draft: it counts against the posting form's own dial.
  IF NOT coalesce((public.rate_gate('draft')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;

  SELECT * INTO v_src FROM public.listings WHERE id = p_listing_id;
  IF NOT FOUND OR v_src.deleted_at IS NOT NULL THEN RAISE EXCEPTION 'listing not found'; END IF;
  IF v_src.seller_id <> v_uid THEN RAISE EXCEPTION 'not your listing'; END IF;
  IF v_src.status = 'draft' THEN RAISE EXCEPTION 'a draft is not copied'; END IF;
  -- A removed ad (staff's) or a refused one (screening's) is not posted again by copying it; a refused ad is edited.
  IF v_src.status IN ('removed', 'rejected') THEN RAISE EXCEPTION 'a removed or refused listing is not copied'; END IF;
  -- DEC-068 — the home country of a new ad is the server's residency fact, as submit_listing writes it.
  SELECT d.observed_country_code INTO v_obs FROM public.user_directory d WHERE d.user_id = v_uid;
  IF v_obs IS NULL THEN RAISE EXCEPTION 'residencyUnknown'; END IF;

  -- D182 4 — Post a similar ad: a new draft with the ad's details — its category, words, answers, price, video
  -- link, places, pin and contact choice — and none of its photos, dates or marks. The posting form opens it on
  -- the photos step and judges every step again as the seller saves it.
  INSERT INTO public.listings (
    seller_id, category_id, location_id, title, description, attributes,
    price_amount, price_currency, price_bp, price_negotiable, price_mode, price_period,
    video_url, contact_pref, status, home_country_code, draft_step, draft_updated_at,
    price_unit, price_unit_text,
    pin_lat, pin_lng, pin_precision, pin_show_lat, pin_show_lng, pin_zoom, street_address, directions
  ) VALUES (
    v_uid, v_src.category_id, v_src.location_id, v_src.title, v_src.description, v_src.attributes,
    v_src.price_amount, v_src.price_currency, v_src.price_bp, v_src.price_negotiable, v_src.price_mode,
    v_src.price_period,
    v_src.video_url, v_src.contact_pref, 'draft', v_obs, 1, now(),
    v_src.price_unit, v_src.price_unit_text,
    v_src.pin_lat, v_src.pin_lng, v_src.pin_precision, v_src.pin_show_lat, v_src.pin_show_lng, v_src.pin_zoom,
    v_src.street_address, v_src.directions
  ) RETURNING * INTO v_row;

  INSERT INTO public.listing_locations (listing_id, location_id, position)
    SELECT v_row.id, ll.location_id, ll.position
      FROM public.listing_locations ll
     WHERE ll.listing_id = p_listing_id;

  INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
    VALUES (v_row.id, v_uid, 'create', NULL,
            (to_jsonb(v_row) - 'search_tsv') || jsonb_build_object('copied_from', p_listing_id), v_uid);

  RETURN jsonb_build_object('ok', true, 'listing_id', v_row.id);
END $function$;
REVOKE ALL ON FUNCTION public.copy_my_listing(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.copy_my_listing(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.copy_my_listing(uuid) TO service_role;

-- ===== P — proofs (RAISE EXCEPTION on any failure; a clean apply is the pass) =====
DO $proof$
DECLARE
  v_n   integer;
  v_msg text;
BEGIN
  -- P1. The headers.
  SELECT count(*) INTO v_n FROM pg_proc
   WHERE oid IN ('public.edit_my_listing(uuid,jsonb)'::regprocedure, 'public.copy_my_listing(uuid)'::regprocedure)
     AND provolatile = 'v' AND prosecdef AND proconfig = ARRAY['search_path=public'];
  IF v_n <> 2 THEN RAISE EXCEPTION 'B16R2 P1: the two doors are not VOLATILE SECURITY DEFINER with search_path public'; END IF;

  -- P2. Who may call them: a signed-in user, never anon.
  IF has_function_privilege('anon', 'public.edit_my_listing(uuid,jsonb)', 'EXECUTE')
     OR has_function_privilege('anon', 'public.copy_my_listing(uuid)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.edit_my_listing(uuid,jsonb)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.copy_my_listing(uuid)', 'EXECUTE') THEN
    RAISE EXCEPTION 'B16R2 P2: a door is open to anon or closed to signed-in users';
  END IF;

  -- P3. No session: refused at the first gate.
  PERFORM set_config('request.jwt.claims', '', true);
  BEGIN
    PERFORM public.edit_my_listing(gen_random_uuid(), jsonb_build_object('title', 'x'));
    RAISE EXCEPTION 'B16R2 P3: edit_my_listing answered a call with no session';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'not authenticated' THEN RAISE EXCEPTION 'B16R2 P3: edit_my_listing: %', v_msg; END IF;
  END;
  BEGIN
    PERFORM public.copy_my_listing(gen_random_uuid());
    RAISE EXCEPTION 'B16R2 P3: copy_my_listing answered a call with no session';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'not authenticated' THEN RAISE EXCEPTION 'B16R2 P3: copy_my_listing: %', v_msg; END IF;
  END;

  -- P4. A scratch identity (a fresh uuid; no auth.users row is read or written): empty or forbidden changes are refused
  -- before any table is read.
  PERFORM set_config('request.jwt.claims', json_build_object('sub', gen_random_uuid())::text, true);
  BEGIN
    PERFORM public.edit_my_listing(gen_random_uuid(), '{}'::jsonb);
    RAISE EXCEPTION 'B16R2 P4: empty changes were taken';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'nothing to change' THEN RAISE EXCEPTION 'B16R2 P4: empty changes: %', v_msg; END IF;
  END;
  BEGIN
    PERFORM public.edit_my_listing(gen_random_uuid(), jsonb_build_object('category_id', gen_random_uuid()));
    RAISE EXCEPTION 'B16R2 P4: a category change was taken';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'not editable: category_id' THEN RAISE EXCEPTION 'B16R2 P4: category: %', v_msg; END IF;
  END;
  BEGIN
    PERFORM public.edit_my_listing(gen_random_uuid(), jsonb_build_object('contact_pref', '{}'::jsonb));
    RAISE EXCEPTION 'B16R2 P4: a contact change was taken';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'not editable: contact_pref' THEN RAISE EXCEPTION 'B16R2 P4: contact: %', v_msg; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '', true);
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('<MARK>') ON CONFLICT (version) DO NOTHING;
----- END MIGRATION -----
```
