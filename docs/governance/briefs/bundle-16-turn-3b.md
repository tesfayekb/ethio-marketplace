# Bundle 16 — turn 3b: My listings, Delete and the Rented and Filled words: brief, version 1 (saved unchanged, 2026-10-14)

```text
BUNDLE 16 — TURN 3b (2026-10-14). ONE TURN, ONE MIGRATION, STRINGS, TEST EDITS AND NEW TESTS WRITTEN BY YOU. No package change.
Base: dev f195b870 (turn 3 and the ML-9 ruling). The census below proves every file and the database by content. This file is public: it is written as build instructions.
Tier A: the migration (`transition_listing`, `my_listings`, `my_listing` and `cat_import_plan` redeclared whole; one column; the capability words). Tier B: the page, the E2E tests. Tier C: the strings, the docs, the roadmap and the changelog.

ANSWERS TO THE LAST TURN
- Turn 3 landed byte for byte: dev `44cb8c58` held the 17 table paths, the brief, your two test files and the migration (mark 20261015120000; your choice of the twelve-hour form was right — the brief's fallback mark sat below its own scratch-check stamp, the supervisor's slip). The operator applied it on ethio-staging.
- Its CI run (38652175756) was red on ML-9 only (the history's key list, INC-629); the ruling's one-line fix landed as `f195b870`, byte for byte. Its CI run (38661744866) was running when this brief was written; the supervisor reads it, and a fix it needs comes as the first part of the next brief.
- Your note on `.first()` (the test linter's J5): accepted.

WHY THIS TURN
- Turn 3 is split again (G10): turn 3b is the seller's side — Delete (call F) and the Rented and Filled words (call H); turn 3c, the next brief, brings a sold ad into the feed for 30 days and the ribbons on the card.
- Call F (D175, agreed): "Delete — removes the ad for good (confirm)"; a deleted ad leaves My listings; its record is kept only as the retention rules say. Today the owner can move his ad to `removed` through `transition_listing`, but: a seller who also holds listings:enforce is sent through staff's branch and asked for a second factor; and a removed ad shows under "Needs attention" as "Removed by staff".
- Call H (D175, agreed): "Mark as rented" in rental categories and "Mark as filled" in jobs, from two category capability words, `rented` and `filled`. The allowed words today are `bookable`, `map_pin`, `own_place` (the table's check and the categories import's list, which refuses any other word as badCapability).

WHAT THIS TURN BUILDS
- The migration (the appendix):
  A. `listings.deleted_at` (timestamptz): when the ad's owner deleted it.
  B. The allowed capability words gain `rented` and `filled`.
  C. `cat_import_plan`, redeclared whole from its live definition (20261005165621): its list of allowed words gains the two. Nothing else changes (proof P4).
  D. `transition_listing`, redeclared whole from 20261014194317: the owner deletes his own ad as its owner, whatever staff role he also holds; the deletion stamps `deleted_at`; an ad its owner deleted is not restored ("a listing its owner deleted is not restored"), by staff or the service. An ad refused for a severe reason is still removed by staff only. Nothing else changes (P4).
  E. `my_listings`, redeclared whole from 20261014212353: both reads leave out a deleted ad; each row carries `soldWord` — "sold", "rented" or "filled", from the ad's leaf category.
  F. `my_listing`, redeclared whole from 20261014230715: a deleted ad answers "not your listing"; the row carries `soldWord` — the same row object as `my_listings` (P5).
  P. Proofs: the column; the constraint; the headers and privileges; each redeclared body equal to its earlier body beyond the named changes (carriage returns removed first); the reads keyed by the caller and leaving out a deleted ad; the two doors' row objects equal; calls with no session refused; a scratch identity that owns nothing refused or answered with six zero counts.
- The carrier:
  - the page (src/features/my-listings/my-listing-page.tsx): Delete, last among the actions of every ad but a removed one, red-outlined, behind the confirm; after a delete the page goes back to My listings. Mark as sold reads "Mark as rented" or "Mark as filled" by the ad's word, with its confirm and its done line; the sold date line reads "Rented <date>" or "Filled <date>". A new line `my-listing-info` says why an action is not there (an ad in review waits; renewing switched off); `my-listing-no-action` ("Nothing to change here right now.") is left for a removed ad. A draft shows Continue and Delete.
  - the actions and their words (src/features/my-listings/my-listing.ts: `actionsFor`, `ASKS_FIRST`, `actionKey`, `doneKey`, `confirmKeys`, `SELL_KEY`, `SOLD_DONE_KEY`, the severe refusal's words), the row's `soldWord` (src/features/my-listings/my-listings.ts), the sold line by word (src/features/my-listings/state-line.ts, `SOLD_ON`), the unit tests (ML-U3 and ML-U6 updated, ML-U7 widened, ML-U10 new);
  - the strings (below), the generated type of `listings.deleted_at`, the docs (my-listings), the changelog and the roadmap.
- The usage maps (docs/generated/i18n-usage.json, public/i18n-usage.json) are regenerated by you with `bun run i18n:usage`; the hashes below say what they must be.
- THE TESTS (below): you edit MLA-3, MLA-4, MLA-5 and MLA-6 where this turn changes what they see, and write MLA-7…MLA-10 in e2e/my-listings-ad.spec.ts and CT-46 in e2e/admin-categories-lifecycle.spec.ts.

THE ACTIONS AFTER THIS TURN (each door re-checks everything)
- Live: Mark as reserved (or Remove the reserved mark), Mark as sold / rented / filled (asks first), No longer available, Delete (asks first).
- Closed: Reopen, Mark as sold / rented / filled, Delete. Expired: Renew (when allowed), Delete. Draft: Continue, Delete. In review, refused, sold: Delete. Removed: none.

THE STRINGS (English / Amharic; the supervisor's, read before they ship — G43; they travel in the carrier). New, 14:
  - `myListings.rentedOn`: "Rented {date}" / «የተከራየበት ቀን፦ {date}»
  - `myListings.filledOn`: "Filled {date}" / «የተሞላበት ቀን፦ {date}»
  - `myListings.action.rent`: "Mark as rented" / «እንደተከራየ ምልክት አድርግ»
  - `myListings.action.fill`: "Mark as filled" / «እንደተሞላ ምልክት አድርግ»
  - `myListings.action.delete`: "Delete" / «ሰርዝ»
  - `myListings.done.rent`: "Marked as rented." / «እንደተከራየ ምልክት ተደርጓል።»
  - `myListings.done.fill`: "Marked as filled." / «እንደተሞላ ምልክት ተደርጓል።»
  - `myListings.confirm.rentTitle`: "Mark this ad as rented?" / «ይህ ማስታወቂያ እንደተከራየ ምልክት ይደረግበት?»
  - `myListings.confirm.rentBody`: "People will see it as rented and can no longer contact you about it. You cannot undo this." / «ሰዎች እንደተከራየ ያዩታል፤ ስለእሱ ከእንግዲህ ሊያገኙዎት አይችሉም። ይህን መቀልበስ አይችሉም።»
  - `myListings.confirm.fillTitle`: "Mark this ad as filled?" / «ይህ ማስታወቂያ እንደተሞላ ምልክት ይደረግበት?»
  - `myListings.confirm.fillBody`: "Job seekers will see it as filled and can no longer contact you about it. You cannot undo this." / «ሥራ ፈላጊዎች እንደተሞላ ያዩታል፤ ስለእሱ ከእንግዲህ ሊያገኙዎት አይችሉም። ይህን መቀልበስ አይችሉም።»
  - `myListings.confirm.deleteTitle`: "Delete this ad?" / «ይህ ማስታወቂያ ይሰረዝ?»
  - `myListings.confirm.deleteBody`: "It is removed from your listings and from the site for good. You cannot undo this." / «ከማስታወቂያዎችዎ እና ከድረ-ገጹ ለዘለቄታው ይወገዳል። ይህን መቀልበስ አይችሉም።»
  - `myListings.error.severe`: "This ad was refused for a serious reason; only staff can remove it." / «ይህ ማስታወቂያ በከባድ ምክንያት አልጸደቀም፤ ሊያስወግዱት የሚችሉት ሠራተኞች ብቻ ናቸው።»

DECIDED BY THE OPERATOR (2026-10-14)
- D175 with calls F and H as written.

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- Delete is offered on every ad but a removed one — a draft, an ad in review, a refused or a sold one included — last, behind a confirm.
- An ad its owner deleted is never restored, by staff or the service; its record and history stay.
- A seller who also holds a staff role deletes his own ad as its owner, without staff's second factor.
- The Rented and Filled words are set on leaves through the curator's categories file (the leaf's own words; a parent's are not inherited, as for the other words).
- Turn 3 split again: the feed's sold ads and the card's ribbons are turn 3c.

THE TESTS — you edit and write them this turn, from the descriptions below (Tier B). The supervisor ran the doors' behaviour on its local stand-in; your tests prove the doors, the page and the import on ethio-staging.
General rules (each applies to every test):
- In e2e/my-listings-ad.spec.ts, inside the same `test.describe`, after MLA-6, add MLA-7…MLA-10, titled exactly as below, in that order; reuse the file's own helpers (`scratchSeller`, `seed`, `asPerson`, `box`, `twin`, the reaping, `grantRole` if the file has it — else copy it from your e2e/my-listings-doors.spec.ts as ML-2 uses it, DEC-174). In e2e/admin-categories-lifecycle.spec.ts add CT-46 right after CT-34, built as CT-34 is built.
- At most two leased accounts per test (DEC-174). Every listing and category is a scratch row the test seeds through the service client and removes (J3, G27); no real category's capabilities are ever changed; every row is found by its own id (G28). No test writes `listing_policy`.
- Words are asserted from en.ts (`en["…"]`), with `{date}` and `{days}` filled as the page fills them; a date's own text is not asserted, only the words around it.
- G38: no assertion loosened, no timeout raised, no retry added, no dial raised. The edits to MLA-3…MLA-6 below follow this turn's change of what the page shows; each stays exact.

THE EDITS (what this turn changes in turn 3's tests; nothing else in them changes):
- MLA-3: the live ad's actions are exactly four: `my-listing-action-reserve`, `my-listing-action-sell`, `my-listing-action-close`, `my-listing-action-delete` ("Delete").
- MLA-4: the closed ad's actions are exactly `my-listing-action-reopen`, `my-listing-action-sell` and `my-listing-action-delete`.
- MLA-5: after Yes, the sold ad's only button is `my-listing-action-delete`; `my-listing-no-action` is not there.
- MLA-6: the ad in review: `my-listing-info` reads "It is waiting for review. You can change it once the review is done." and its only button is `my-listing-action-delete`; `my-listing-no-action` is not there. The draft: `my-listing-continue` and `my-listing-action-delete` are both there.

MLA-7 "MLA-7 Delete asks first; the deleted ad leaves My listings for good (call F)"
- One seller: X live, D a draft. Open /my-listings/<X>; press `my-listing-action-delete`: `my-listing-confirm` holds "Delete this ad?". Press `my-listing-confirm-cancel`: the dialog is gone; the database status is "active".
- Press it again, then `my-listing-confirm-yes`: the URL becomes /my-listings. As the seller (`asPerson`): `my_listings` lists X in none of the six groups and its "live" count is 0; `my_listing(X)` → "not your listing". /my-listings/<X> shows `my-listing-not-found`. The database (service client): status "removed", `deleted_at` set; a `listing_revisions` line of kind "state" to status "removed" whose actor is the seller.
- /my-listings/<D>: `my-listing-continue` and `my-listing-action-delete` are there; delete it (confirm, Yes): D leaves the Drafts group (count 0).

MLA-8 "MLA-8 A seller who also holds listings:enforce deletes his own ad as its owner; a deleted ad is never restored"
- One seller, given listings:enforce through `grantRole` (DEC-174). X live. As the seller, `transition_listing(X, "removed")` → no error (no second factor asked). The database: `deleted_at` set.
- The service client: `transition_listing(X, "screening")` → error "a listing its owner deleted is not restored"; the status stays "removed".

MLA-9 "MLA-9 Rented and Filled: a sold ad takes its category's word (call H)"
- One seller; seed X live on the seller's own scratch leaf category (the one the file seeds on, never a real one). Before any word is set, as the seller, `my_listing(X).listing.soldWord` is "sold". Then, through the service client, give that scratch leaf the capabilities ["rented"]. Open /my-listings/<X>: `my-listing-action-sell` reads "Mark as rented"; press it: `my-listing-confirm` holds "Mark this ad as rented?"; Yes: `my-listing-notice` reads "Marked as rented."; `my-listing-sold` starts with "Rented ". As the seller: `my_listing(X).listing.soldWord` is "rented", and X's row in `my_listings("sold")` has soldWord "rented"; /my-listings, Sold group: X's state line starts with "Rented ".
- Set the same scratch leaf's capabilities to ["filled"]; seed Y live there: `my-listing-action-sell` reads "Mark as filled"; Yes: "Marked as filled."; `my-listing-sold` starts with "Filled ".
- Set the leaf's capabilities back to [] in `finally`.

MLA-10 "MLA-10 A refused ad's Delete is answered in words when it was refused for a severe reason"
- One seller; seed R rejected with `screening` holding {"severe": true} (the service client). /my-listings/<R>: `my-listing-action-delete` is there; Delete, Yes: `my-listing-problem` reads "This ad was refused for a serious reason; only staff can remove it."; the database status stays "rejected" and `deleted_at` stays null.

CT-46 "CT-46 rented and filled are accepted by the import and an unknown token is still refused" (in e2e/admin-categories-lifecycle.spec.ts, right after CT-34, built as CT-34 is: super admin, a scratch parent, a preview of a categories file)
- Three scratch rows under the scratch parent: capabilities "rented", "filled|map_pin", and "rentedx". The preview (status 200) holds exactly one `badCapability` refusal, its detail "rentedx". The preview writes nothing (the three scratch slugs read back null). Everything is removed in `finally`.

After writing them: `node_modules/.bin/prettier --write e2e/my-listings-ad.spec.ts e2e/admin-categories-lifecycle.spec.ts`. No other test is edited.

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, dev f195b870 with this turn's carrier files)
- Clean: typecheck (it covers e2e/), format, lint (0 errors, 33 warnings), 862 unit tests (151 files), the usage maps regenerated (they match), the hardcoded-strings guard (0 findings), the selector self-test.
- The migration on a local PostgreSQL 16 over stand-in tables with turns 1, 2 and 3 applied: applied cleanly, its proofs passed, with LF and with CRLF line endings. As sellers: the sold word (rented on a leaf holding `rented`, sold otherwise, in both doors); a live ad and a draft deleted by their owner (status removed, deleted_at set, gone from every group and count, `my_listing` refused); an owner who also holds listings:enforce deleting as owner; a restore of a deleted ad refused even for the service; the deletion's revision by the owner. Four tampered copies were each refused by their proof: a transition body changed beyond the named changes (P4), an import plan changed beyond its list (P4), a list read that kept deleted ads (P6), a row object that differed between the two doors (P5).
- `scripts/check-migrations.sh` with this migration as 20261015130000_b16t3b-check.sql: "Migration guard OK".
- The 14 Amharic strings were checked by script: NFC, Ethiopic letters and punctuation only, the placeholders equal to the English.
- Not run by the supervisor: the browser tests (its sandbox cannot reach ethio-staging). CI on the final commit runs them.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-16-turn-3b.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines. Whatever it shows, go on: the CI read is the supervisor's, and a fix it needs comes in the next turn. Do not stop on it. You cannot git-fetch that branch. Paste `git rev-parse HEAD`: this is <START>;
  2. step 0;
  3. the census (below), files and database. If any result differs from what it expects, STOP and report: write nothing else. One exception, known in advance: if the platform has regenerated src/integrations/supabase/types.ts or src/routeTree.gen.ts since turn 3, name the difference and go on — the carrier's sections hold those files' lines;
  4. the carrier, then `bun run i18n:usage`, then the hashes;
  5. THE TESTS (the edits, then the new tests);
  6. the checks;
  7. the migration LAST, then its read-back;
  8. the report;
  9. END THE TURN.
  Do not stop between steps.
- The migration is the last thing written, because the database tool applies it on ethio-prod the moment it is saved. The operator will see the "Modify Supabase database" dialog and allow it. The published site keeps working: its doors keep their arguments, the rows gain a key, and only an owner's deletion changes.
- The carrier's sections end with a newline each, blank lines included: write every section's bytes exactly as they stand between its header line and the next header. Check each written file's sha256 against the table before you go on.
- If the platform regenerates src/integrations/supabase/types.ts after the migration, compare it with the carrier's file. If they differ, keep the carrier's file and name the difference in the report.
- If any rule of yours conflicts with the text, STOP before saving and quote that rule's exact words in the report.
- Scope — these files only: the 14 paths of the hash table (the carrier's files and the two usage maps), the brief, e2e/my-listings-ad.spec.ts, e2e/admin-categories-lifecycle.spec.ts (CT-46 only) and the one new migration file (the database tool names it). The database: ethio-prod through your tools — SELECT only, except the migration itself. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-16-turn-3b.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 12 files → each equal to:
  30d8226e76417cff2d362dae5452836edea6fe11eeb8a9e1fc28e02cb5314e97  docs/_changelog.md
  d489854b72770d50901102365ee78efda35f4f7f0b5529614098fd30f2445c00  docs/features/my-listings.md
  6ceb36600b2ca8009ff0f2ce7dc3bbf8009d72fa735484193418c57b2452e30b  roadmap.md
  3280e66017a898e04f36bec146ec7a58c043f870f9210a6614ec9739dc48401b  src/features/my-listings/my-listing-page.tsx
  60e2ac831986bd2920c717adb3cf28c385f763c7f37eb896e3b08dbe68ec6b80  src/features/my-listings/my-listing.test.ts
  7b6dabb1715862aa92bd4f11aff661a7b3266162a353d86aabe0e69f15d171d6  src/features/my-listings/my-listing.ts
  aa9c3ff848b99948316033d60ee7b9bac23cc90ab14707162b8491486131dbb3  src/features/my-listings/my-listings.test.ts
  72022aa005afd11b3223ea8cc50deaf3c68ff87fb23125501190689f697c3258  src/features/my-listings/my-listings.ts
  ef2fffdc8ff78d8b3013c7bfe1a144a91b8290c9fdd34333a6fa886ba5225600  src/features/my-listings/state-line.ts
  a8e4c8ec956d2dd2ecf9d0f0b960392b0f32e361b324f7cbb41e76cc7ffbb6f9  src/i18n/locales/am.ts
  50f3748404066f528624e81369c9032ac70841a2c5bacb49aa9a7876c864a93d  src/i18n/locales/en.ts
  f79b1814b71e6a7508d26e8bf2dbf2e66c13899f6cfd0bde19a8a4092fbc746b  src/integrations/supabase/types.ts
- (c) `sha256sum e2e/my-listings-ad.spec.ts e2e/admin-categories-lifecycle.spec.ts` → 5a97246202a700ccd2c20861fdcf2c80b3720036019aa6adf54a0ade13b311a6 and 3139825838ffe9943677b692cbfded4cf4f5fb817b72f96b6774ebcaf567ffc7; `ls supabase/migrations | tail -1` → 20261014230715_3853703f-4ef3-46a1-b2b8-4129c05ac9f5.sql (turn 3's; no migration since).
- (d) ethio-prod, your query tool (SELECT only):
  - `select max(version) from public.migration_marks;` → 20261015120000;
  - `select count(*) from information_schema.columns where table_schema = 'public' and table_name = 'listings' and column_name = 'deleted_at';` → 0;
  - `select p.proname, md5(replace(p.prosrc, chr(13), '')) from pg_proc p where p.oid in ('public.transition_listing(uuid,text)'::regprocedure, 'public.my_listings(text,integer,integer)'::regprocedure, 'public.my_listing(uuid)'::regprocedure, 'public.cat_import_plan(jsonb,text)'::regprocedure) order by p.proname;` →
    cat_import_plan | 2d0680045f12d614348ae1e4bb89b136
    my_listing | 7c0d39afb885e1e18ca2b1aadabde768
    my_listings | b5647978d443b0c8b502929872299673
    transition_listing | 91d00f3f7f47c7ff0ff213f18a99b355
  - `select pg_get_constraintdef(oid) from pg_constraint where conname = 'categories_capabilities_check';` → CHECK ((capabilities <@ ARRAY['bookable'::text, 'map_pin'::text, 'own_place'::text]))

THE CARRIER — B16T3b-TURN-CARRIER-2026-10-14.md (24,262 bytes; sha256 402b8f68d16c3ec0b9e35497755ba6edefe7cf007a4ab29fa95964553b9e4b03; 52 sections)
- Its first line starts "B16T3b TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`. No blank line separates the sections.
- Modes:
  - REPLACE: the section is the whole file;
  - NEW: a new file; the section is the whole file;
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file (INSERT-AFTER 0: at the top of the file);
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed. If your upload arrives under another name, match it by its size and sha256.
- The two usage maps are not in the carrier: after the carrier, run `bun run i18n:usage`; it writes them from the tree, and their hashes are in the table.

THE HASHES — `sha256sum` each of the 14 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  0c9996516a38044c3bfd684b6604ccd5b4c10429ea33bfd5edd9a96e3d3452b8  docs/_changelog.md
  4558abe34e1d8ff0f0b937451ef2125c1ae8da3d54000badb5f95c64b24e339d  docs/features/my-listings.md
  2926cdfc39c783180f5d88f10e97d0c34e05e4f9b815d1809b0ce4b3c37394db  docs/generated/i18n-usage.json
  2926cdfc39c783180f5d88f10e97d0c34e05e4f9b815d1809b0ce4b3c37394db  public/i18n-usage.json
  2f5e62886095ac3595c9702d4a7d83979c69ee647086a0a5b5b03aa4805807eb  roadmap.md
  77d253c34eab95a43f22b82be0b60227fbf62ea40fdf80e27156fd85c892d2be  src/features/my-listings/my-listing-page.tsx
  ca09cd0c554d5584d6e6ffa09c6d9ced47e01aa1a3980f6a952dc7a4d440e066  src/features/my-listings/my-listing.test.ts
  682a9546fcec7e1f98763c171edec166b58e332223337af1263015972ab74a90  src/features/my-listings/my-listing.ts
  91fb19061d0059cd99bbe4230817dce32eb8f4e2fe9c25eb7fe0b49fbd4dd31d  src/features/my-listings/my-listings.test.ts
  7d221c407d2bd64e391fc17cf618b704cea8e5111c9a5e7898c50ab3e7350f4f  src/features/my-listings/my-listings.ts
  2115a58669bec11291149bcfb88f98a9b1fe1e34a48dbb3e298ac1b46b472360  src/features/my-listings/state-line.ts
  6c7dbc0dd57aea9e5993aa2d8acf4a3ddfb973e0ef8539035a0133530dad3315  src/i18n/locales/am.ts
  443ed62651688aac3470b99c00a40d8f21e7c8876a72b1c0419514a016640bed  src/i18n/locales/en.ts
  bae3713c975d32e06e7895ac9e3c30e9d3e38cd2bf71c8befc89d28c596df278  src/integrations/supabase/types.ts

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings — a warning in a test file of yours is fixed, not left;
- `bun run test:unit 2>&1 | tee /tmp/unit-b16t3b.log` — 862 passed (151 files). Keep the whole output; if any test fails, paste its name and its first error line;
- `bun run i18n:map-guard` "usage maps match the tree.";
- `bash scripts/check-hardcoded-strings.sh` "findings: 0";
- `bun run scripts/e2e-select.ts --self-test` OK;
- `grep -n 'test("MLA-' e2e/my-listings-ad.spec.ts` → the ten titles, in order; `grep -n 'test("CT-46' e2e/admin-categories-lifecycle.spec.ts` → one line, after CT-34's;
- Not run by you: the typecheck, the build and the bundle budget (your platform's rule). CI judges them.

THE BROWSER RUN — not this turn: the local browser does not start (INC-506). CI on the final commit runs every spec, yours included. A red in your tests is fixed in the next turn, at its cause (G38).

THE MIGRATION RULES (G39 — every one applies)
- The text is between the BEGIN and END lines of the appendix below. Write it EXACTLY, changing only `<MARK>`. Before the change, its sha256 is e5d66f8cb218e7f2b9c9f383594fe45e73695f346c9d904df2b542f9dc364663 (56,459 bytes, 1091 lines, ending with a newline).
- Check it in a scratch folder first (after the checks):
  - copy supabase/migrations/*.sql into a temporary folder;
  - add the text, its `<MARK>` replaced by the mark you will use, under the name 20261015130000_b16t3b-check.sql;
  - run `MIGRATIONS_DIR=<that folder> bash scripts/check-migrations.sh`.
  Paste its "guard OK" lines and "Migration guard OK".
- `<MARK>` is chosen at apply time:
  - read now() at time zone 'utc' on ethio-prod;
  - round it up to the next whole hour and add one hour (add twelve hours instead if the save dialog may wait);
  - if the result is not above 20261015130000, use 20261015130000 (above 20261015120000, turn 3's mark, and equal to the scratch check's stamp);
  - the mark must also be later than the saved file's own stamp.
- Then hand the FINAL text to the database tool ONCE. Never a stub, a comment or a draft (INC-491).
- A clean apply is the proofs' pass: they RAISE EXCEPTION on any failure.

THE READ-BACK (ethio-prod, your query tool, SELECT only; paste each result)
- `select version from public.migration_marks where version = '<MARK>';` → one row;
- the census (d) query of the four bodies again → 
    cat_import_plan | c668f8b04c903f60f0117051107cf800
    my_listing | 6ec24960451f1436c82f87596058365b
    my_listings | b53c2225fc95924b99817d57d56ee9cb
    transition_listing | f2b4a89cedf83e4dce63d17be85e1ce8
- `select p.proname, p.provolatile, p.prosecdef, p.proconfig, has_function_privilege('anon', p.oid, 'EXECUTE'), has_function_privilege('authenticated', p.oid, 'EXECUTE') from pg_proc p where p.oid in ('public.transition_listing(uuid,text)'::regprocedure, 'public.my_listings(text,integer,integer)'::regprocedure, 'public.my_listing(uuid)'::regprocedure, 'public.cat_import_plan(jsonb,text)'::regprocedure) order by p.proname;` →
    cat_import_plan | v | t | {search_path=public} | f | f
    my_listing | s | t | {search_path=public} | f | t
    my_listings | s | t | {search_path=public} | f | t
    transition_listing | v | t | {search_path=public} | f | t
- the census (d) constraint query → CHECK ((capabilities <@ ARRAY['bookable'::text, 'map_pin'::text, 'own_place'::text, 'rented'::text, 'filled'::text]))

THE REPORT
- Done or not done, by step.
- The six ci-status lines, and <START>.
- The census results (a)–(d).
- The 14 sha256sum lines and the brief's; the sha256sum and line count of each of your two test files, and `git diff <START> -- e2e/my-listings-ad.spec.ts e2e/admin-categories-lifecycle.spec.ts | head -400`.
- `git diff --name-only <START>` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only <START> HEAD` too. Expect the 14 paths, the brief, your two test files and the one migration file.
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
-- Bundle 16 (My listings), turn 3b (2026-10-14). Tier A. Delete (call F) and the Rented / Filled words (call H) for the
-- seller's ad page (D138; D173; spec: docs/features/my-listings.md).
-- e2e-areas: my-listings, admin-categories
--
-- A. listings.deleted_at: the moment the ad's owner deleted it. A deleted ad is `removed` (the state machine's word) and
--    leaves My listings: `my_listings` counts and lists it nowhere and `my_listing` answers "not your listing". Its record
--    stays, as the retention rules say (call F).
-- B. The allowed category capability words gain `rented` and `filled` (call H): a sold ad of a category holding one of
--    them is called Rented or Filled.
-- C. cat_import_plan, redeclared whole from its live definition (20261005165621): the categories import accepts the two
--    words (it refused any word outside its list as badCapability). Nothing else changes (P4).
-- D. transition_listing, redeclared whole from 20261014194317: the owner deletes his own ad as its owner — a seller who
--    also holds a staff role is not asked for staff's second factor — and the deletion stamps deleted_at; an ad its owner
--    deleted is not restored. Nothing else changes (P4).
-- E. my_listings, redeclared whole from 20261014212353: both reads leave out a deleted ad; each row carries `soldWord`
--    (sold, rented or filled, from the ad's category).
-- F. my_listing, redeclared whole from 20261014230715: a deleted ad is "not your listing"; the row carries `soldWord`,
--    the same row object as my_listings (P5).
-- P. Proofs (RAISE EXCEPTION on any failure; a clean apply is the pass): the column; the constraint; the headers and
--    privileges; each redeclared body equal to its earlier body beyond the named changes (carriage returns removed
--    first); the reads keyed by the caller and leaving out a deleted ad; the row object of the two doors equal; calls with
--    no session refused; a scratch identity that owns nothing (no real row, no auth.users row) refused or answered with
--    zero counts. What the doors do with real ads is proven by MLA-7…MLA-10 (e2e/my-listings-ad.spec.ts).

-- ===== A — the deletion mark =====
ALTER TABLE public.listings ADD COLUMN IF NOT EXISTS deleted_at timestamptz;
COMMENT ON COLUMN public.listings.deleted_at IS
  'Bundle 16 turn 3b (call F) — when the ad''s owner deleted it (its status is removed); it leaves My listings and is never restored.';

-- ===== B — the capability words =====
ALTER TABLE public.categories DROP CONSTRAINT IF EXISTS categories_capabilities_check;
ALTER TABLE public.categories ADD CONSTRAINT categories_capabilities_check
  CHECK (capabilities <@ ARRAY['bookable','map_pin','own_place','rented','filled']::text[]);

-- ===== C — cat_import_plan (redeclared whole) =====
CREATE OR REPLACE FUNCTION public.cat_import_plan(p_rows jsonb, p_scope text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_scope uuid;
  v_scope_set uuid[] := NULL;
  v_row jsonb;
  v_num int;
  v_slug text;
  v_action text;
  v_cat public.categories%ROWTYPE;
  v_parent public.categories%ROWTYPE;
  v_parent_slug text;
  v_seen text[] := '{}';
  v_infile text[] := '{}';
  v_ref jsonb := '[]'::jsonb;
  v_items jsonb := '[]'::jsonb;
  v_delta jsonb;
  v_cur jsonb;
  v_adds int := 0; v_changes int := 0; v_retires int := 0;
  v_reacts int := 0; v_deletes int := 0; v_unchanged int := 0;
  v_children int; v_listings int;
  v_name_am text;
  v_order int;
  v_export jsonb := NULL;
  v_rename text;
  v_kids text[];
  v_active_txt text;
  v_want_active boolean;
  v_detail text;
  -- DEC-052 / DEC-067 cells
  v_caps text[];
  v_period text;
  v_lock text;
  v_bad text;
  -- INC-275 — ONE tree read per plan: the export keyed by slug, and the file's
  -- own slug set. No per-row export, walk or version call below.
  v_by_slug jsonb;
  v_file_slugs jsonb;
  -- DEC-079 — categories that carry, or hold a descendant carrying, a price
  -- basis (primary lineage), read ONCE per plan: id -> the basis key.
  v_basis_map jsonb;
  v_bkey text;
BEGIN
  v_export := public.cat_export_rows(NULL);
  WITH RECURSIVE d AS (
    SELECT l.category_id AS cid, a.attr_key AS k
      FROM public.category_attribute_links l
      JOIN public.attributes a ON a.id = l.attribute_id
     WHERE a.attr_key ~ '^(pricing_type|unit_of_sale)(-|$)'
  ),
  up AS (
    SELECT cid, k FROM d
    UNION
    SELECT public.cat_primary_parent(up.cid), up.k FROM up
     WHERE public.cat_primary_parent(up.cid) IS NOT NULL
  ),
  down AS (
    SELECT cid, k FROM d
    UNION
    SELECT c.id, down.k FROM public.categories c JOIN down ON down.cid = public.cat_primary_parent(c.id)
  ),
  hit AS (SELECT cid, min(k) AS k FROM (SELECT * FROM up UNION SELECT * FROM down) u GROUP BY cid)
  SELECT COALESCE(jsonb_object_agg(cid::text, k), '{}'::jsonb) INTO v_basis_map FROM hit;
  SELECT COALESCE(jsonb_object_agg(r->>'category_slug', r), '{}'::jsonb)
    INTO v_by_slug FROM jsonb_array_elements(v_export) r;
  SELECT COALESCE(jsonb_object_agg(k, true), '{}'::jsonb) INTO v_file_slugs
    FROM (SELECT DISTINCT lower(btrim(COALESCE(o->>'category_slug',''))) k
            FROM jsonb_array_elements(COALESCE(p_rows,'[]'::jsonb)) o) f
   WHERE k <> '';

  IF p_scope IS NOT NULL AND btrim(p_scope) <> '' THEN
    SELECT c.id INTO v_scope FROM public.categories c WHERE c.slug = lower(btrim(p_scope));
    IF v_scope IS NULL THEN RAISE EXCEPTION 'unknown category scope'; END IF;
    SELECT array_agg(d.id) INTO v_scope_set FROM public.cat_descendants(v_scope) d;
  END IF;

  FOR v_row IN SELECT * FROM jsonb_array_elements(COALESCE(p_rows, '[]'::jsonb))
  LOOP
    v_num := COALESCE(public.cat_int(v_row->>'row'), 0);
    v_slug := lower(COALESCE(public.cat_text(v_row->>'category_slug'), ''));
    v_action := lower(COALESCE(public.cat_text(v_row->>'action'), 'upsert'));
    v_parent_slug := lower(COALESCE(public.cat_text(v_row->>'parent_slug'), ''));

    IF v_slug = '' THEN
      v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key','',
                                           'reason','missingSlug');
      CONTINUE;
    END IF;

    IF v_slug = ANY (v_seen) THEN
      v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                           'reason','duplicateSlug');
      CONTINUE;
    END IF;
    v_seen := v_seen || v_slug;

    IF v_action NOT IN ('upsert','create-root','retire','reactivate','delete') THEN
      v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                           'reason','badAction');
      CONTINUE;
    END IF;

    v_caps := ARRAY(SELECT lower(btrim(x))
                      FROM unnest(string_to_array(COALESCE(v_row->>'capabilities',''), '|')) x
                     WHERE btrim(x) <> '');
    v_bad := NULL;
    -- DEC-105 — own_place is an allowed capability token. Bundle 16 turn 3b (call H) — rented and filled too: the
    -- word a sold ad of the category takes.
    SELECT x INTO v_bad FROM unnest(v_caps) x
     WHERE x NOT IN ('bookable','map_pin','own_place','rented','filled') LIMIT 1;
    IF v_bad IS NOT NULL THEN
      v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                           'reason','badCapability','detail',v_bad);
      CONTINUE;
    END IF;
    IF (SELECT count(DISTINCT u) FROM unnest(v_caps) u) <> COALESCE(array_length(v_caps,1),0) THEN
      v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                           'reason','badCapability','detail','duplicate');
      CONTINUE;
    END IF;
    v_period := lower(COALESCE(public.cat_text(v_row->>'default_price_period'), ''));
    IF v_period <> '' AND v_period NOT IN ('once','hour','day','week','month','year') THEN
      v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                           'reason','badPeriod','detail',v_period);
      CONTINUE;
    END IF;
    v_lock := public.cat_text(v_row->>'price_period_locked');

    SELECT * INTO v_cat FROM public.categories c WHERE c.slug = v_slug;

    -- DEC-079 — a row may not CREATE a period lock on a basis-carrying lineage
    -- (the basis decides the period). A row restating a stored lock passes.
    IF v_action <> 'delete'
       AND v_lock IS NOT NULL AND btrim(v_lock) <> ''
       AND public.cat_bool(v_lock, false)
       AND (v_cat.id IS NULL OR NOT v_cat.price_period_locked) THEN
      v_bkey := CASE WHEN v_cat.id IS NULL THEN NULL ELSE v_basis_map ->> v_cat.id::text END;
      IF v_bkey IS NOT NULL THEN
        v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                             'reason','periodLockedWithBasis','detail',v_bkey);
        CONTINUE;
      END IF;
    END IF;

    IF v_scope_set IS NOT NULL AND v_cat.id IS NOT NULL
       AND NOT (v_cat.id = ANY (v_scope_set)) THEN
      v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                           'reason','outOfScope');
      CONTINUE;
    END IF;

    -- ---------- CREATE ----------
    IF v_cat.id IS NULL THEN
      IF v_action IN ('retire','reactivate') THEN
        v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                             'reason','unknownSlug');
        CONTINUE;
      END IF;
      IF v_action = 'delete' THEN
        v_unchanged := v_unchanged + 1;
        v_items := v_items || jsonb_build_object('row',v_num,'slug',v_slug,'op','noop',
                                                 'detail','alreadyDeleted');
        CONTINUE;
      END IF;

      IF v_action <> 'create-root'
         AND btrim(COALESCE(v_row->>'category_path','')) <> '' THEN
        v_rename := NULL;
        SELECT r->>'category_slug' INTO v_rename
          FROM jsonb_array_elements(v_export) r
         WHERE btrim(COALESCE(r->>'category_path','')) = btrim(COALESCE(v_row->>'category_path',''))
           AND lower(btrim(COALESCE(r->>'parent_slug',''))) = v_parent_slug
           AND lower(btrim(COALESCE(r->>'category_slug',''))) <> v_slug
           AND NOT (v_file_slugs ? lower(btrim(COALESCE(r->>'category_slug',''))))
         LIMIT 1;
        IF v_rename IS NOT NULL THEN
          v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                               'reason','slugRename','detail', v_rename);
          CONTINUE;
        END IF;
      END IF;

      IF v_parent_slug = '' AND v_action <> 'create-root' THEN
        v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                             'reason','unknownSlug');
        CONTINUE;
      END IF;
      IF v_parent_slug <> '' THEN
        SELECT * INTO v_parent FROM public.categories c WHERE c.slug = v_parent_slug;
        IF v_parent.id IS NULL AND v_parent_slug = ANY (v_infile) THEN
          v_parent := NULL;
        END IF;
        IF v_parent.id IS NULL AND NOT (v_parent_slug = ANY (v_infile)) THEN
          v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                               'reason','unknownParent');
          CONTINUE;
        END IF;
        IF v_parent.id IS NOT NULL AND v_parent.is_catchall THEN
          v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                               'reason','catchallParent');
          CONTINUE;
        END IF;
        IF v_parent.id IS NOT NULL AND v_scope_set IS NOT NULL
           AND NOT (v_parent.id = ANY (v_scope_set)) THEN
          v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                               'reason','outOfScope');
          CONTINUE;
        END IF;
        IF v_parent.id IS NOT NULL THEN
          SELECT sib.slug INTO v_rename
            FROM public.categories sib
            JOIN public.category_tree_pointers p ON p.child_id = sib.id
           WHERE p.parent_id = v_parent.id
             AND lower(btrim(sib.name_en)) = lower(btrim(COALESCE(v_row->>'name_en','')))
           LIMIT 1;
          IF v_rename IS NOT NULL THEN
            v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                                 'reason','slugRename','detail', v_rename);
            CONTINUE;
          END IF;
        END IF;
      ELSE
        v_parent := NULL;
      END IF;

      IF public.cat_text(v_row->>'name_en') IS NULL THEN
        v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                             'reason','missingName');
        CONTINUE;
      END IF;

      IF (public.cat_text(v_row->>'visible_from') IS NOT NULL
            AND public.cat_ts(v_row->>'visible_from') IS NULL)
         OR (public.cat_text(v_row->>'visible_until') IS NOT NULL
            AND public.cat_ts(v_row->>'visible_until') IS NULL) THEN
        v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                             'reason','badDate');
        CONTINUE;
      END IF;

      -- M8a A2 (INC-314) — a create row's guest parents: each names a category
      -- of the export map that is not a catch-all, or a create row EARLIER in
      -- this file; otherwise the row is refused, naming the slug.
      SELECT s INTO v_rename
        FROM unnest(public.cat_pipe(v_row->>'secondary_parents')) s
       WHERE NOT ((v_by_slug ? s AND COALESCE(v_by_slug -> s ->> 'is_catchall', '') <> 'true')
                  OR s = ANY (v_infile))
       LIMIT 1;
      IF v_rename IS NOT NULL THEN
        v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                             'reason','unknownParent','detail', v_rename);
        CONTINUE;
      END IF;

      v_adds := v_adds + 1;
      v_infile := v_infile || v_slug;
      v_items := v_items || jsonb_build_object(
        'row', v_num, 'slug', v_slug, 'op', 'create',
        'parent_slug', NULLIF(v_parent_slug, ''),
        'fields', jsonb_build_object(
          'name_en', public.cat_text(v_row->>'name_en'),
          'name_am', public.cat_text(v_row->>'name_am'),
          'icon', public.cat_text(v_row->>'icon'),
          'allow_listings', public.cat_bool(v_row->>'allow_listings', true),
          'price_enabled', public.cat_bool(v_row->>'price_enabled', true),
          'expiry_days', public.cat_int(v_row->>'expiry_days'),
          'display_order', public.cat_int(v_row->>'display_order'),
          'visible_from', public.cat_ts(v_row->>'visible_from'),
          'visible_until', public.cat_ts(v_row->>'visible_until'),
          'excluded_country_codes', to_jsonb(public.cat_pipe(v_row->>'excluded_country_codes')),
          'secondary_parents', to_jsonb(public.cat_pipe(v_row->>'secondary_parents')))
        || CASE WHEN v_row ? 'capabilities'
                THEN jsonb_build_object('capabilities', to_jsonb(v_caps))
                ELSE '{}'::jsonb END
        || CASE WHEN v_period <> ''
                THEN jsonb_build_object('default_price_period', v_period)
                ELSE '{}'::jsonb END
        || CASE WHEN v_lock IS NOT NULL AND btrim(v_lock) <> ''
                THEN jsonb_build_object('price_period_locked',
                                        public.cat_bool(v_lock, false))
                ELSE '{}'::jsonb END);
      CONTINUE;
    END IF;

    -- ---------- DELETE ----------
    IF v_action = 'delete' THEN
      SELECT count(*)::int INTO v_children FROM public.category_tree_pointers p
       WHERE p.parent_id = v_cat.id;
      IF v_children > 0 THEN
        SELECT array_agg(c.slug ORDER BY c.slug) INTO v_kids
          FROM public.category_tree_pointers p
          JOIN public.categories c ON c.id = p.child_id
         WHERE p.parent_id = v_cat.id;
        v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                          'reason','hasChildren',
                          'detail', array_to_string(COALESCE(v_kids, ARRAY[]::text[]), ', '),
                          'children', to_jsonb(COALESCE(v_kids, ARRAY[]::text[])));
        CONTINUE;
      END IF;
      SELECT count(*)::int INTO v_listings FROM public.listings l WHERE l.category_id = v_cat.id;
      IF v_listings > 0 THEN
        v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                          'reason','hasListings','detail', v_listings::text);
        CONTINUE;
      END IF;
      IF v_cat.is_active THEN
        v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                             'reason','deleteActive');
        CONTINUE;
      END IF;
      v_deletes := v_deletes + 1;
      v_items := v_items || jsonb_build_object('row',v_num,'slug',v_slug,'op','delete');
      CONTINUE;
    END IF;

    -- ---------- STATUS CELL (INC-199 part 1) ----------
    v_active_txt := public.cat_text(v_row->>'is_active');
    v_want_active := NULL;
    IF v_active_txt IS NOT NULL AND btrim(v_active_txt) <> '' THEN
      v_want_active := public.cat_bool(v_active_txt, v_cat.is_active);
    END IF;
    IF v_action NOT IN ('retire','reactivate')
       AND v_want_active IS NOT NULL
       AND v_want_active IS DISTINCT FROM v_cat.is_active THEN
      v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                        'reason','statusNeedsAction',
                        'detail', 'stored=' || CASE WHEN v_cat.is_active THEN 'true' ELSE 'false' END
                                  || ' requested=' || CASE WHEN v_want_active THEN 'true' ELSE 'false' END);
      CONTINUE;
    END IF;

    -- ---------- CELL DIFF (semantic, against the export shape) ----------
    -- INC-275: the current row comes from the once-per-plan export map.
    v_cur := COALESCE(v_by_slug -> v_cat.slug, 'null'::jsonb);
    v_delta := '{}'::jsonb;

    IF (public.cat_text(v_row->>'visible_from') IS NOT NULL
          AND public.cat_ts(v_row->>'visible_from') IS NULL)
       OR (public.cat_text(v_row->>'visible_until') IS NOT NULL
          AND public.cat_ts(v_row->>'visible_until') IS NULL) THEN
      v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                           'reason','badDate');
      CONTINUE;
    END IF;

    IF public.cat_text(v_row->>'name_en') IS NOT NULL
       AND public.cat_text(v_row->>'name_en') IS DISTINCT FROM btrim(v_cat.name_en) THEN
      v_delta := v_delta || jsonb_build_object('name_en', public.cat_text(v_row->>'name_en'));
    END IF;

    IF COALESCE(public.cat_text(v_row->>'icon'), '')
       IS DISTINCT FROM COALESCE(v_cur->>'icon', '') THEN
      v_delta := v_delta || jsonb_build_object('icon', COALESCE(public.cat_text(v_row->>'icon'), ''));
    END IF;

    IF public.cat_bool(v_row->>'allow_listings', v_cat.allow_listings) IS DISTINCT FROM v_cat.allow_listings THEN
      v_delta := v_delta || jsonb_build_object('allow_listings',
                    public.cat_bool(v_row->>'allow_listings', v_cat.allow_listings));
    END IF;

    IF public.cat_bool(v_row->>'price_enabled', v_cat.price_enabled) IS DISTINCT FROM v_cat.price_enabled THEN
      v_delta := v_delta || jsonb_build_object('price_enabled',
                    public.cat_bool(v_row->>'price_enabled', v_cat.price_enabled));
    END IF;

    IF public.cat_int(v_row->>'expiry_days') IS DISTINCT FROM v_cat.expiry_days THEN
      v_delta := v_delta || jsonb_build_object('expiry_days', public.cat_int(v_row->>'expiry_days'));
    END IF;

    IF v_row ? 'capabilities'
       AND array_to_string(v_caps,'|') IS DISTINCT FROM COALESCE(v_cur->>'capabilities','') THEN
      v_delta := v_delta || jsonb_build_object('capabilities', to_jsonb(v_caps));
    END IF;
    IF v_period <> ''
       AND v_period IS DISTINCT FROM COALESCE(v_cur->>'default_price_period','') THEN
      v_delta := v_delta || jsonb_build_object('default_price_period', v_period);
    END IF;
    IF v_lock IS NOT NULL AND btrim(v_lock) <> ''
       AND public.cat_bool(v_lock, v_cat.price_period_locked)
           IS DISTINCT FROM v_cat.price_period_locked THEN
      v_delta := v_delta || jsonb_build_object('price_period_locked',
                    public.cat_bool(v_lock, v_cat.price_period_locked));
    END IF;

    v_order := public.cat_int(v_row->>'display_order');
    IF NOT v_cat.is_catchall
       AND v_order IS NOT NULL
       AND v_order IS DISTINCT FROM public.cat_int(v_cur->>'display_order') THEN
      v_delta := v_delta || jsonb_build_object('display_order', v_order);
    END IF;

    v_name_am := public.cat_text(v_row->>'name_am');
    IF v_name_am IS NOT NULL AND btrim(v_name_am) <> ''
       AND btrim(v_name_am) IS DISTINCT FROM btrim(COALESCE(v_cur->>'name_am', '')) THEN
      v_delta := v_delta || jsonb_build_object('name_am', btrim(v_name_am));
    END IF;

    IF public.cat_ts(v_row->>'visible_from') IS DISTINCT FROM v_cat.visible_from
       OR public.cat_ts(v_row->>'visible_until') IS DISTINCT FROM v_cat.visible_until THEN
      v_delta := v_delta || jsonb_build_object(
        'visible_from', public.cat_ts(v_row->>'visible_from'),
        'visible_until', public.cat_ts(v_row->>'visible_until'));
    END IF;

    IF public.cat_pipe(v_row->>'excluded_country_codes')
       IS DISTINCT FROM public.cat_pipe(v_cur->>'excluded_country_codes') THEN
      IF EXISTS (SELECT 1 FROM unnest(public.cat_pipe(v_row->>'excluded_country_codes')) code
                  WHERE NOT EXISTS (SELECT 1 FROM public.countries c
                                    WHERE lower(c.code) = code)) THEN
        v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                             'reason','unknownCountry');
        CONTINUE;
      END IF;
      v_delta := v_delta || jsonb_build_object('excluded_country_codes',
                    to_jsonb(public.cat_pipe(v_row->>'excluded_country_codes')));
    END IF;

    IF v_parent_slug IS DISTINCT FROM COALESCE(v_cur->>'parent_slug', '') THEN
      IF v_parent_slug = '' THEN
        v_delta := v_delta || jsonb_build_object('parent_slug', '');
      ELSE
        SELECT * INTO v_parent FROM public.categories c WHERE c.slug = v_parent_slug;
        IF v_parent.id IS NULL THEN
          v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                               'reason','unknownParent');
          CONTINUE;
        END IF;
        IF v_parent.is_catchall THEN
          v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                               'reason','catchallParent');
          CONTINUE;
        END IF;
        IF v_parent.id = v_cat.id
           OR v_parent.id IN (SELECT d.id FROM public.cat_descendants(v_cat.id) d) THEN
          v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                               'reason','cycle');
          CONTINUE;
        END IF;
        v_delta := v_delta || jsonb_build_object('parent_slug', v_parent_slug);
      END IF;
    END IF;

    -- INC-275: secondary parents checked against the in-memory export map.
    IF public.cat_pipe(v_row->>'secondary_parents')
       IS DISTINCT FROM public.cat_pipe(v_cur->>'secondary_parents') THEN
      IF EXISTS (SELECT 1 FROM unnest(public.cat_pipe(v_row->>'secondary_parents')) s
                  WHERE NOT (v_by_slug ? s)
                     OR v_by_slug -> s ->> 'is_catchall' = 'true') THEN
        v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                             'reason','unknownParent');
        CONTINUE;
      END IF;
      v_delta := v_delta || jsonb_build_object('secondary_parents',
                    to_jsonb(public.cat_pipe(v_row->>'secondary_parents')));
    END IF;

    v_detail := NULLIF(array_to_string(
                  ARRAY(SELECT k FROM jsonb_object_keys(v_delta) k ORDER BY k), ', '), '');

    -- ---------- RETIRE ----------
    IF v_action = 'retire' THEN
      IF v_cat.is_active THEN
        SELECT count(*)::int INTO v_listings FROM public.listings l
         WHERE l.category_id = v_cat.id AND l.status = 'active';
        IF v_listings > 0 THEN
          v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                             'reason','hasListings','detail', v_listings::text);
          CONTINUE;
        END IF;
        v_retires := v_retires + 1;
        v_items := v_items || jsonb_build_object('row',v_num,'slug',v_slug,'op','retire',
                                                 'fields', v_delta,
                                                 'detail', v_detail);
      ELSIF v_delta = '{}'::jsonb THEN
        v_unchanged := v_unchanged + 1;
        v_items := v_items || jsonb_build_object('row',v_num,'slug',v_slug,'op','noop',
                                                 'detail','alreadyRetired');
      ELSE
        v_changes := v_changes + 1;
        v_items := v_items || jsonb_build_object('row',v_num,'slug',v_slug,'op','update',
                                                 'fields', v_delta,
                                                 'detail','alreadyRetired');
      END IF;
      CONTINUE;
    END IF;

    -- ---------- REACTIVATE ----------
    IF v_action = 'reactivate' THEN
      IF NOT v_cat.is_active THEN
        v_reacts := v_reacts + 1;
        v_items := v_items || jsonb_build_object('row',v_num,'slug',v_slug,'op','reactivate',
                                                 'fields', v_delta,
                                                 'detail', v_detail);
      ELSIF v_delta = '{}'::jsonb THEN
        v_unchanged := v_unchanged + 1;
        v_items := v_items || jsonb_build_object('row',v_num,'slug',v_slug,'op','noop',
                                                 'detail','alreadyActive');
      ELSE
        v_changes := v_changes + 1;
        v_items := v_items || jsonb_build_object('row',v_num,'slug',v_slug,'op','update',
                                                 'fields', v_delta,
                                                 'detail','alreadyActive');
      END IF;
      CONTINUE;
    END IF;

    -- ---------- UPSERT ----------
    IF v_delta = '{}'::jsonb THEN
      v_unchanged := v_unchanged + 1;
    ELSE
      v_changes := v_changes + 1;
      v_items := v_items || jsonb_build_object('row',v_num,'slug',v_slug,'op','update',
                                               'fields', v_delta,
                                               'detail', v_detail);
    END IF;
  END LOOP;

  RETURN jsonb_build_object(
    'counts', jsonb_build_object(
      'adds', v_adds, 'changes', v_changes, 'retires', v_retires,
      'reactivations', v_reacts, 'deletes', v_deletes,
      'unchanged', v_unchanged, 'refusals', jsonb_array_length(v_ref)),
    'refusals', v_ref,
    'items', v_items);
END $$;
REVOKE ALL ON FUNCTION public.cat_import_plan(jsonb, text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.cat_import_plan(jsonb, text) TO service_role;
GRANT ALL ON FUNCTION public.cat_import_plan(jsonb, text) TO service_role;

-- ===== D — transition_listing (redeclared whole) =====
CREATE OR REPLACE FUNCTION public.transition_listing(p_listing_id uuid, p_new_status text)
 RETURNS void
 LANGUAGE plpgsql
 VOLATILE
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid      uuid := auth.uid();
  v_row      public.listings%ROWTYPE;
  v_service  boolean := (v_uid IS NULL AND current_setting('role', true) IS DISTINCT FROM 'anon');
  v_reviewer boolean := false;
  v_enforcer boolean := false;
  v_owner    boolean := false;
  v_ok       boolean := false;
BEGIN
  IF p_new_status NOT IN ('draft','screening','active','reduced','rejected','held','expired','sold','removed','closed') THEN
    RAISE EXCEPTION 'unknown status: %', p_new_status;
  END IF;

  SELECT * INTO v_row FROM public.listings WHERE id = p_listing_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'listing not found'; END IF;

  IF v_uid IS NOT NULL THEN
    IF EXISTS (SELECT 1 FROM public.profiles WHERE user_id = v_uid AND account_status = 'deactivated') THEN
      RAISE EXCEPTION 'account is deactivated';
    END IF;
    IF NOT coalesce((public.rate_gate('revise')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;
    v_owner    := (v_row.seller_id = v_uid);
    v_reviewer := public.has_permission(v_uid, 'listings', 'review');
    v_enforcer := public.has_permission(v_uid, 'listings', 'enforce');
    IF NOT (v_owner OR v_reviewer OR v_enforcer) THEN
      RAISE EXCEPTION 'not your listing';
    END IF;
  END IF;

  -- D174 2 (bundle 16 turn 1) — the owner reopens his own closed ad, to the live status it was closed from and
  -- with the time it had left. Nothing about it changed while it was closed (edit_listing sends a closed ad to
  -- screening), so it needs no new review. Staff never reopen a seller's closed ad.
  IF v_row.status = 'closed' AND p_new_status IN ('active','reduced') THEN
    IF NOT v_owner THEN
      RAISE EXCEPTION 'owner only: closed -> %', p_new_status;
    END IF;
    v_ok := (p_new_status = v_row.resume_status);
  -- The gateway/reviewer branch: only these roles may put a listing in front of
  -- a visitor. No owner door reaches 'active' (the reopen above returns an ad to the place it already held).
  ELSIF p_new_status IN ('active','reduced','rejected','held') THEN
    IF NOT (v_service OR v_reviewer) THEN
      RAISE EXCEPTION 'reviewer only: % -> %', v_row.status, p_new_status;
    END IF;
    IF NOT v_service THEN
      PERFORM public.require_step_up_if_needed('listings', 'review');
    END IF;
    v_ok := CASE v_row.status
      WHEN 'screening' THEN p_new_status IN ('active','reduced','rejected','held')
      WHEN 'held'      THEN p_new_status IN ('active','reduced','rejected')
      ELSE false
    END;
  ELSIF p_new_status = 'screening' THEN
    IF v_row.status = 'removed' THEN
      -- Bundle 16 turn 3b (call F) — an ad its owner deleted is not brought back.
      IF v_row.deleted_at IS NOT NULL THEN
        RAISE EXCEPTION 'a listing its owner deleted is not restored';
      END IF;
      -- D137 (REQ-022 amended, the operator, 2026-10-11): a removed listing comes
      -- back only to screening, never straight to live; by enforcement with a
      -- fresh second factor; one removed for a severe screening reason by a
      -- super admin only.
      IF NOT (v_service OR v_enforcer) THEN
        RAISE EXCEPTION 'enforcement only: removed -> screening';
      END IF;
      IF coalesce(v_row.screening->>'severe','false') = 'true'
         AND NOT (v_service OR public.is_super_admin(v_uid)) THEN
        RAISE EXCEPTION 'a listing removed for a severe reason is restored by a super admin only';
      END IF;
      IF NOT v_service THEN
        PERFORM public.require_step_up_if_needed('listings', 'enforce');
      END IF;
      v_ok := true;
    ELSE
      v_ok := v_row.status IN ('draft','active','reduced','rejected','expired','sold');
    END IF;
  ELSIF p_new_status IN ('sold','expired') THEN
    v_ok := v_row.status IN ('active','reduced') OR (p_new_status = 'sold' AND v_row.status = 'closed');
  ELSIF p_new_status = 'closed' THEN
    -- D174 2 — "No longer available": only the owner closes his live ad; the time it had left is kept.
    IF NOT v_owner THEN
      RAISE EXCEPTION 'owner only: % -> closed', v_row.status;
    END IF;
    v_ok := v_row.status IN ('active','reduced');
  ELSIF p_new_status = 'removed' THEN
    -- Bundle 16 turn 3b (call F) — the owner deletes his own ad as its owner, whatever staff role he also holds.
    IF v_owner AND NOT v_service THEN
      IF v_row.status = 'rejected' AND coalesce(v_row.screening->>'severe','false') = 'true' THEN
        RAISE EXCEPTION 'a listing rejected for a severe reason is removed by enforcement only';
      END IF;
      v_ok := true;
    ELSE
      v_ok := (v_service OR v_enforcer);
      IF NOT v_ok THEN
        RAISE EXCEPTION 'enforcement only: % -> removed', v_row.status;
      END IF;
      IF NOT v_service THEN
        PERFORM public.require_step_up_if_needed('listings', 'enforce');
      END IF;
    END IF;
  ELSE
    v_ok := false;
  END IF;

  IF NOT v_ok THEN
    RAISE EXCEPTION 'illegal transition: % -> %', v_row.status, p_new_status;
  END IF;

  IF p_new_status IN ('active','reduced') AND v_row.status = 'closed' THEN
    -- D174 2 — reopened: the time it had left when it was closed.
    UPDATE public.listings SET
      status = p_new_status,
      expires_at = CASE WHEN v_row.kept_remaining IS NULL THEN NULL ELSE now() + v_row.kept_remaining END,
      clock_kept = false, kept_remaining = NULL, resume_status = NULL,
      updated_at = now()
    WHERE id = p_listing_id;
  ELSIF p_new_status IN ('active','reduced') AND v_row.clock_kept THEN
    -- Bundle 16 call A — after the review of an edit, the ad gets back the time it had when it was edited; an edit
    -- never renews an ad.
    UPDATE public.listings SET
      status = p_new_status,
      published_at = coalesce(published_at, now()),
      published_first_at = coalesce(published_first_at, now()),
      expires_at = CASE WHEN v_row.kept_remaining IS NULL THEN NULL ELSE now() + v_row.kept_remaining END,
      clock_kept = false, kept_remaining = NULL, resume_status = NULL,
      updated_at = now()
    WHERE id = p_listing_id;
  ELSIF p_new_status IN ('active','reduced') THEN
    UPDATE public.listings SET
      status = p_new_status,
      published_at = coalesce(published_at, now()),
      published_first_at = coalesce(published_first_at, now()),
      -- M5 / DEC-117 — LEAST(the seller's date, now() + the category's days);
      -- each side is left out when absent (LEAST skips NULL); NULL when both are.
      expires_at = LEAST(v_row.poster_expires_at,
        now() + make_interval(days => (SELECT c.expiry_days FROM public.categories c WHERE c.id = v_row.category_id))),
      updated_at = now()
    WHERE id = p_listing_id;
  ELSIF p_new_status = 'closed' THEN
    UPDATE public.listings SET
      status = 'closed',
      clock_kept = true,
      kept_remaining = CASE WHEN v_row.expires_at IS NULL THEN NULL
                            ELSE greatest(v_row.expires_at - now(), interval '0') END,
      resume_status = v_row.status,
      updated_at = now()
    WHERE id = p_listing_id;
  ELSIF p_new_status = 'expired' THEN
    -- Bundle 16 — the live status a renewal returns it to.
    UPDATE public.listings SET status = 'expired', resume_status = v_row.status, updated_at = now()
     WHERE id = p_listing_id;
  ELSIF p_new_status = 'removed' AND v_owner THEN
    -- Bundle 16 turn 3b (call F) — deleted by its owner: it leaves My listings (deleted_at); the record stays.
    UPDATE public.listings SET status = 'removed', deleted_at = now(), updated_at = now()
     WHERE id = p_listing_id;
  ELSE
    UPDATE public.listings SET status = p_new_status, updated_at = now()
     WHERE id = p_listing_id;
  END IF;

  INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
    VALUES (p_listing_id, v_row.seller_id, 'state',
            jsonb_build_object('status', v_row.status),
            jsonb_build_object('status', p_new_status), v_uid);
END $function$;

REVOKE ALL ON FUNCTION public.transition_listing(uuid, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.transition_listing(uuid, text) TO authenticated;
GRANT ALL ON FUNCTION public.transition_listing(uuid, text) TO service_role;

-- ===== E — my_listings (redeclared whole) =====
CREATE OR REPLACE FUNCTION public.my_listings(p_group text, p_limit integer DEFAULT 50, p_offset integer DEFAULT 0)
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
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF p_group IS NULL OR p_group NOT IN ('live','review','attention','closed','sold','drafts') THEN
    RAISE EXCEPTION 'unknown group';
  END IF;
  IF p_limit IS NULL OR p_limit < 1 OR p_limit > 100 OR p_offset IS NULL OR p_offset < 0 THEN
    RAISE EXCEPTION 'bad page';
  END IF;

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

  RETURN jsonb_build_object('counts', v_counts, 'rows', v_rows);
END $function$;
REVOKE ALL ON FUNCTION public.my_listings(text, integer, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.my_listings(text, integer, integer) TO authenticated;
GRANT ALL ON FUNCTION public.my_listings(text, integer, integer) TO service_role;

-- ===== F — my_listing (redeclared whole) =====
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
   WHERE l.id = p_listing_id AND l.seller_id = v_uid
     AND l.deleted_at IS NULL;

  -- One answer for "not yours" and "not there".
  IF v_out IS NULL THEN RAISE EXCEPTION 'not your listing'; END IF;
  RETURN v_out;
END $function$;
REVOKE ALL ON FUNCTION public.my_listing(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.my_listing(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.my_listing(uuid) TO service_role;

-- ===== P — proofs (RAISE EXCEPTION on any failure; a clean apply is the pass) =====
DO $proof$
DECLARE
  v_n    integer;
  v_msg  text;
  v_src  text;
  v_seg  text;
  v_md5  text;
  v_out  jsonb;
BEGIN
  -- P1. The column and the constraint.
  SELECT count(*) INTO v_n FROM information_schema.columns
   WHERE table_schema = 'public' AND table_name = 'listings' AND column_name = 'deleted_at'
     AND data_type = 'timestamp with time zone';
  IF v_n <> 1 THEN RAISE EXCEPTION 'B16T3b P1: listings.deleted_at is missing or not timestamptz'; END IF;
  SELECT count(*) INTO v_n FROM pg_constraint
   WHERE conname = 'categories_capabilities_check' AND conrelid = 'public.categories'::regclass
     AND pg_get_constraintdef(oid) LIKE '%rented%' AND pg_get_constraintdef(oid) LIKE '%filled%'
     AND pg_get_constraintdef(oid) LIKE '%own_place%' AND pg_get_constraintdef(oid) LIKE '%bookable%'
     AND pg_get_constraintdef(oid) LIKE '%map_pin%';
  IF v_n <> 1 THEN RAISE EXCEPTION 'B16T3b P1: the capability words are not bookable, map_pin, own_place, rented, filled'; END IF;

  -- P2. The headers.
  SELECT count(*) INTO v_n FROM pg_proc
   WHERE oid IN ('public.my_listing(uuid)'::regprocedure, 'public.my_listings(text,integer,integer)'::regprocedure)
     AND provolatile = 's' AND prosecdef AND proconfig = ARRAY['search_path=public'];
  IF v_n <> 2 THEN RAISE EXCEPTION 'B16T3b P2: my_listing or my_listings is not STABLE SECURITY DEFINER with search_path public'; END IF;
  SELECT count(*) INTO v_n FROM pg_proc
   WHERE oid IN ('public.transition_listing(uuid,text)'::regprocedure, 'public.cat_import_plan(jsonb,text)'::regprocedure)
     AND provolatile = 'v' AND prosecdef AND proconfig = ARRAY['search_path=public'];
  IF v_n <> 2 THEN RAISE EXCEPTION 'B16T3b P2: transition_listing or cat_import_plan is not VOLATILE SECURITY DEFINER with search_path public'; END IF;

  -- P3. Who may call them: the seller's doors — a signed-in user, never anon; the import plan — the service only.
  IF has_function_privilege('anon', 'public.my_listing(uuid)', 'EXECUTE')
     OR has_function_privilege('anon', 'public.my_listings(text,integer,integer)', 'EXECUTE')
     OR has_function_privilege('anon', 'public.transition_listing(uuid,text)', 'EXECUTE')
     OR has_function_privilege('anon', 'public.cat_import_plan(jsonb,text)', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.cat_import_plan(jsonb,text)', 'EXECUTE') THEN
    RAISE EXCEPTION 'B16T3b P3: a door is open to a role it must not be';
  END IF;
  IF NOT has_function_privilege('authenticated', 'public.my_listing(uuid)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.my_listings(text,integer,integer)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.transition_listing(uuid,text)', 'EXECUTE') THEN
    RAISE EXCEPTION 'B16T3b P3: authenticated may not execute a seller door';
  END IF;

  -- P4. Each redeclared body is its earlier body beyond the named changes.
  SELECT md5(replace(replace(replace(replace(p.prosrc, chr(13), ''), replace('    -- Bundle 16 turn 3b (call F) — the owner deletes his own ad as its owner, whatever staff role he also holds.
    IF v_owner AND NOT v_service THEN
', chr(13), ''), replace('    IF v_owner AND NOT (v_service OR v_enforcer) THEN
', chr(13), '')), replace('      -- Bundle 16 turn 3b (call F) — an ad its owner deleted is not brought back.
      IF v_row.deleted_at IS NOT NULL THEN
        RAISE EXCEPTION ''a listing its owner deleted is not restored'';
      END IF;
', chr(13), ''), replace('', chr(13), '')), replace('  ELSIF p_new_status = ''removed'' AND v_owner THEN
    -- Bundle 16 turn 3b (call F) — deleted by its owner: it leaves My listings (deleted_at); the record stays.
    UPDATE public.listings SET status = ''removed'', deleted_at = now(), updated_at = now()
     WHERE id = p_listing_id;
', chr(13), ''), replace('', chr(13), '')))
    INTO v_md5 FROM pg_proc p WHERE p.oid = 'public.transition_listing(uuid,text)'::regprocedure;
  IF v_md5 IS DISTINCT FROM '91d00f3f7f47c7ff0ff213f18a99b355' THEN
    RAISE EXCEPTION 'B16T3b P4: transition_listing differs from its earlier body beyond the named changes';
  END IF;
  SELECT md5(replace(replace(replace(regexp_replace(replace(p.prosrc, chr(13), ''), '               -- Bundle 16 turn 3b \(call H\)[^\n]*\n[^\n]*\n[^\n]*\n[^\n]*\n', ''), chr(13), ''), replace('         AND l.deleted_at IS NULL
', chr(13), ''), replace('', chr(13), '')), replace('       AND l.deleted_at IS NULL
', chr(13), ''), replace('', chr(13), '')))
    INTO v_md5 FROM pg_proc p WHERE p.oid = 'public.my_listings(text,integer,integer)'::regprocedure;
  IF v_md5 IS DISTINCT FROM 'b5647978d443b0c8b502929872299673' THEN
    RAISE EXCEPTION 'B16T3b P4: my_listings differs from its earlier body beyond the named changes';
  END IF;
  SELECT md5(replace(replace(regexp_replace(replace(p.prosrc, chr(13), ''), '               -- Bundle 16 turn 3b \(call H\)[^\n]*\n[^\n]*\n[^\n]*\n[^\n]*\n', ''), chr(13), ''), replace('   WHERE l.id = p_listing_id AND l.seller_id = v_uid
     AND l.deleted_at IS NULL;
', chr(13), ''), replace('   WHERE l.id = p_listing_id AND l.seller_id = v_uid;
', chr(13), '')))
    INTO v_md5 FROM pg_proc p WHERE p.oid = 'public.my_listing(uuid)'::regprocedure;
  IF v_md5 IS DISTINCT FROM '7c0d39afb885e1e18ca2b1aadabde768' THEN
    RAISE EXCEPTION 'B16T3b P4: my_listing differs from its earlier body beyond the named changes';
  END IF;
  SELECT md5(replace(replace(replace(p.prosrc, chr(13), ''), replace('     WHERE x NOT IN (''bookable'',''map_pin'',''own_place'',''rented'',''filled'') LIMIT 1;
', chr(13), ''), replace('     WHERE x NOT IN (''bookable'',''map_pin'',''own_place'') LIMIT 1;
', chr(13), '')), replace('    -- DEC-105 — own_place is an allowed capability token. Bundle 16 turn 3b (call H) — rented and filled too: the
    -- word a sold ad of the category takes.
', chr(13), ''), replace('    -- DEC-105 — own_place is an allowed capability token.
', chr(13), '')))
    INTO v_md5 FROM pg_proc p WHERE p.oid = 'public.cat_import_plan(jsonb,text)'::regprocedure;
  IF v_md5 IS DISTINCT FROM '2d0680045f12d614348ae1e4bb89b136' THEN
    RAISE EXCEPTION 'B16T3b P4: cat_import_plan differs from its earlier body beyond the named changes';
  END IF;

  -- P5. my_listing's row object is my_listings' row object, byte for byte.
  SELECT replace(prosrc, chr(13), '') INTO v_src FROM pg_proc WHERE oid = 'public.my_listing(uuid)'::regprocedure;
  v_seg := substring(v_src FROM strpos(v_src, 'jsonb_build_object(' || chr(10) || '               ''id'', l.id,'));
  v_seg := substring(v_seg FOR strpos(v_seg, 'LIMIT 1) END)') + length('LIMIT 1) END)') - 1);
  SELECT count(*) INTO v_n FROM pg_proc
   WHERE oid = 'public.my_listings(text,integer,integer)'::regprocedure
     AND length(v_seg) > 2000 AND strpos(v_seg, '''soldWord''') > 0
     AND strpos(replace(prosrc, chr(13), ''), v_seg) > 0;
  IF v_n <> 1 THEN RAISE EXCEPTION 'B16T3b P5: my_listing''s row object differs from my_listings'''; END IF;

  -- P6. The reads are keyed by the caller and leave out a deleted ad.
  IF strpos(v_src, 'WHERE l.id = p_listing_id AND l.seller_id = v_uid' || chr(10) || '     AND l.deleted_at IS NULL;') = 0 THEN
    RAISE EXCEPTION 'B16T3b P6: my_listing''s read is not keyed by the caller or keeps a deleted ad';
  END IF;
  SELECT count(*) INTO v_n FROM pg_proc
   WHERE oid = 'public.my_listings(text,integer,integer)'::regprocedure
     AND strpos(replace(prosrc, chr(13), ''), 'WHERE l.seller_id = v_uid' || chr(10) || '       AND l.deleted_at IS NULL' || chr(10) || '  )') > 0
     AND strpos(replace(prosrc, chr(13), ''), 'WHERE l.seller_id = v_uid' || chr(10) || '         AND l.deleted_at IS NULL' || chr(10) || '         AND CASE l.status') > 0;
  IF v_n <> 1 THEN RAISE EXCEPTION 'B16T3b P6: a read of my_listings is not keyed by the caller or keeps a deleted ad'; END IF;

  -- P7. No session: refused at the first gate.
  PERFORM set_config('request.jwt.claims', '', true);
  BEGIN
    PERFORM public.my_listing(gen_random_uuid());
    RAISE EXCEPTION 'B16T3b P7: my_listing answered a call with no session';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'not authenticated' THEN RAISE EXCEPTION 'B16T3b P7: my_listing: %', v_msg; END IF;
  END;
  BEGIN
    PERFORM public.my_listings('live');
    RAISE EXCEPTION 'B16T3b P7: my_listings answered a call with no session';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'not authenticated' THEN RAISE EXCEPTION 'B16T3b P7: my_listings: %', v_msg; END IF;
  END;

  -- P8. A scratch identity that owns nothing (a fresh uuid; no auth.users row is read or written).
  PERFORM set_config('request.jwt.claims', json_build_object('sub', gen_random_uuid())::text, true);
  BEGIN
    PERFORM public.my_listing(gen_random_uuid());
    RAISE EXCEPTION 'B16T3b P8: my_listing answered for an ad the caller does not own';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'not your listing' THEN RAISE EXCEPTION 'B16T3b P8: my_listing: %', v_msg; END IF;
  END;
  v_out := public.my_listings('sold', 20, 0);
  IF v_out IS DISTINCT FROM jsonb_build_object(
       'counts', jsonb_build_object('live', 0, 'review', 0, 'attention', 0, 'closed', 0, 'sold', 0, 'drafts', 0),
       'rows', '[]'::jsonb) THEN
    RAISE EXCEPTION 'B16T3b P8: an identity that owns nothing got %', v_out;
  END IF;
  PERFORM set_config('request.jwt.claims', '', true);
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('<MARK>') ON CONFLICT (version) DO NOTHING;
----- END MIGRATION -----
```
