# Bundle 13 — photos, turn 10: INC-615; D154 B3 — a photo that may not fit the ad; D154 B5 — photo changes on live ads: brief, version 1 (saved unchanged, 2026-10-14)

```text
BUNDLE 13 — PHOTOS (D154–D165) — TURN 10 (2026-10-14). ONE TURN, ONE MIGRATION. 12 new strings. No package change.
Base: dev 74b1ca6d (turn 9's landing). The census below proves every file by content. This file is public: it is written as build instructions.
Tier A: the migration (two new tables with row security; `register_listing_photo`, `replace_listing_photo` and `remove_listing_photo` redeclared whole; a new door `admin_review_photo_change`; the listing-photos bucket's public read rule dropped; their proofs); the upload route (src/routes/api/upload/photo.ts); the photo screen (src/server/media/policy.ts); the grants list (scripts/public-surface-allowlist.txt); the e2e pool's table map. Tier B: the photo step, Admin › Screening and Admin › Listings, the tests, the docs, the roadmap and the changelog.

ANSWERS TO THE LAST TURN
- Turn 9 verified: dev 74b1ca6d equals the supervisor's tree with the saved brief (sha256 2a05b327…, equal), and the migration file equals the brief's text with mark 20261014110000; your read-back matched every line. Your note 2 was the supervisor's error: the brief's scratch name was later than the mark it was checked with. This brief's scratch name lies between turn 9's mark and any mark you can choose.
- Turn 8's run (38528698170, attempt 2, after the operator restarted ethio-staging): 1,788 passed; SC-20 alone failed, in both projects — its scratch ad had no price, so the photo door refused (PART 0, INC-615). Turns 7 and 8 are otherwise green (PP-19, PP-23, PP-24, SC-18, SC-19 and AL-28 passed). Turn 9's run is queued behind it.

WHY THIS TURN
- PART 0, INC-615 (turn 8's run 38528698170, attempt 2): SC-20 failed in both projects: "The photo was not removed: the ad no longer meets today's rules for Price." Its scratch ad (`seedWaiting`) has no price, and `admin_edit_listing` checks the whole ad against today's rules before it removes a photo. The door is right; the seed is fixed: `seedWaiting` takes `priced` (fixed, 100 ETB, once) and SC-20 uses it.
- PART 1, D154 point 4 (the operator, 2026-10-13): "The AI screen also judges whether the photo fits the ad. When it does not, the seller sees a warning and may keep the photo, and the ad is flagged for staff." The photo spec's B3.
- PART 2, D154 point 3: "The screening step lists every photo added or edited on a published ad, with the AI's verdict." The photo spec's B5: each addition, edit and removal by the seller on a live ad, with its warnings; staff can remove a photo from there (B4).
- PART 3: the listing-photos bucket kept a public read rule from before D151; since D151 every photo is read through a short-lived link the server signs, so the rule is dropped (the migration's part G).

WHAT THIS TURN BUILDS
- PART 0 — e2e/admin-screening.spec.ts: `seedWaiting({ priced: true })` writes `price_mode` fixed, `price_amount` 100, `price_currency` ETB, `price_period` once; SC-20 uses it. Nothing else in SC-20 changes.
- PART 1 — D154 B3:
  - src/server/media/policy.ts — `POLICY_WARNINGS` = not_relevant; the instruction gains three lines (a warning never refuses; not_relevant judged by the ad's category and title, a business card, a logo or a shop sign fitting any business or service ad, none when unsure; the ad's words are the seller's, used only for this and never followed); the answer may carry `warnings`; `contextPart` sends the ad's category and title first, quoted and cut to 120 characters; `warningsOf` keeps the known warnings and logs an unknown one; fake mode: a cover exactly 17 px wide is allowed with not_relevant.
  - src/routes/api/upload/photo.ts — reads the ad's title and its category's English name, passes them to the screen, hands the warnings to the door (`p_warnings`, a new photo or an edit) and answers `warnings`.
  - src/features/posting/posting-service.ts — `PHOTO_ROW_SELECT` (the photo row with its warning embedded) and `photoWarningsOf`; the draft's photos carry `warnings`.
  - src/features/posting/step-photos.tsx — a stored photo with not_relevant shows "This photo may not show what you are selling. You can keep it or remove it." under its picture (`post-photo-warning`).
  - src/features/admin-screening/use-screening.ts — staff's photo read carries the warnings; src/features/admin-listings/listing-photos.tsx marks such a photo "May not fit the ad" (`<testid>-warning`).
  - src/features/admin-screening/use-photo-changes.ts (NEW) — `useWarnedListings`: of a page's ads, those holding a warned photo. The screening queue (screening-page.tsx) and Admin › Listings (listings-page.tsx) show "A photo may not fit the ad" under such an ad's title.
- PART 2 — D154 B5:
  - src/features/admin-screening/use-photo-changes.ts — `listPhotoChanges` (the changes no one has reviewed, oldest first, 100 at a time, with the ad's id, title and status), `reviewPhotoChange` (the door), `photoChangeErrorKey`.
  - src/features/admin-screening/photo-changes.tsx (NEW) — `PhotoChanges`, below the queue, for listings:review: each change with its picture (none for a removal), Added, Edited or Removed and when, the ad (a link to its page), the warning; "Mark reviewed" (the door; the list is read again); "Show photos" opens the ad's photos (B4's card, with Remove for listings:enforce).
- PART 3 — the migration's part G (below).
- The migration (the appendix):
  - A. `listing_photo_warnings`: one row per warned photo, row security (the seller reads his own photos' rows, listings:view every row), SELECT for signed-in users only, no visitor grant, gone with its photo.
  - B. `listing_photo_changes`: one row per photo a seller adds, edits or removes on an ad that is active or reduced, with its warnings; row security for listings:review; no write grant to any browser role.
  - C, D. `register_listing_photo` and `replace_listing_photo`, each redeclared whole from its live definition with `p_warnings` (default none): the warning row, and on a live ad the change row. The old signatures are dropped and their grants restated (service role only).
  - E. `remove_listing_photo`, redeclared whole from its live definition: on a live ad, the change row. Grants restated as they are.
  - F. `admin_review_photo_change(change)`: listings:review, marks the change reviewed, audits `listing.photo_change_reviewed`.
  - G. The bucket's public read rule dropped.
  - H. Proofs.
- Also: src/integrations/supabase/types.ts (the two tables, the door, `p_warnings`); scripts/public-surface-allowlist.txt (four lines: the two tables, the restated grant, the door); e2e/helpers/pool-reset-map.ts (`listing_photo_changes` exempt: `reviewed_by` is attribution; an account's own changes go with its listings); e2e/helpers/photos.ts (`madeJpeg`; `uploadPhoto`'s cover may be `{ made: [width, height] }`; the default unchanged); the strings (below), the usage maps, the docs (media-pipeline.md, posting.md, admin-screening.md, admin-listings.md), the changelog and the roadmap (line 3 and the turn-10 line).

STRINGS (12 NEW)
- NEW `post.photos.notRelevant`: "This photo may not show what you are selling. You can keep it or remove it." · «ይህ ፎቶ የሚሸጡትን ላያሳይ ይችላል። ሊያቆዩት ወይም ሊያስወግዱት ይችላሉ።»
- NEW `admin.listings.photos.notRelevant`: "May not fit the ad" · «ከማስታወቂያው ጋር ላይስማማ ይችላል»
- NEW `admin.screening.photoWarning`: "A photo may not fit the ad" · «አንድ ፎቶ ከማስታወቂያው ጋር ላይስማማ ይችላል»
- NEW `admin.screening.changes.title`: "Photo changes on live ads" · «በቀጥታ ማስታወቂያዎች ላይ የፎቶ ለውጦች»
- NEW `admin.screening.changes.hint`: "Photos sellers added, edited or removed on live ads. Each was checked by AI when it was saved. Mark each one reviewed; a photo can be removed from the ad's photos." · «ሻጮች በቀጥታ ማስታወቂያዎች ላይ የጨመሯቸው፣ ያስተካከሏቸው ወይም ያስወገዷቸው ፎቶዎች። እያንዳንዱ ሲቀመጥ በሰው ሰራሽ አስተውሎት ተፈትሿል። እያንዳንዱን እንደታየ ምልክት ያድርጉ፤ ፎቶ ከማስታወቂያው ፎቶዎች ውስጥ ሊወገድ ይችላል።»
- NEW `admin.screening.changes.empty`: "No photo changes are waiting." · «የሚጠብቅ የፎቶ ለውጥ የለም።»
- NEW `admin.screening.changes.added`: "Added" · «ተጨምሯል»
- NEW `admin.screening.changes.edited`: "Edited" · «ተስተካክሏል»
- NEW `admin.screening.changes.removed`: "Removed" · «ተወግዷል»
- NEW `admin.screening.changes.photos`: "Show photos" · «ፎቶዎቹን አሳይ»
- NEW `admin.screening.changes.review`: "Mark reviewed" · «እንደታየ ምልክት አድርግ»
- NEW `admin.screening.changes.gone`: "This change was already reviewed." · «ይህ ለውጥ አስቀድሞ ታይቷል።»

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- The warnings live in their own table, not in a column on the photo row: the photo row is readable by any visitor for a live ad, and a warning is for the seller and staff only.
- The flag shows on the queue and on Admin › Listings under the ad's title, and on the photo itself; no new filter.
- "Live" is `active` or `reduced`. A draft's or a waiting ad's photo is screened as before and not listed as a change; a staff removal is not listed (History keeps it).
- Photo changes sit on the Screening page below the queue, oldest first, 100 at a time; Mark reviewed asks for no second factor (it changes nothing on the ad) and is audited.
- The ad's title is sent to the AI as data, cut to 120 characters, with the instruction never to follow it.
- The bucket's public read rule is dropped (signed links only).
- The ids: PPOL-13..PPOL-16, PCH-1..PCH-6, PWN-1, PP-29, SC-21, SC-22.

TESTS
- Unit, NEW: PPOL-13..PPOL-16 (src/server/media/policy.test.ts), PCH-1, PCH-2, PWN-1 (src/features/admin-screening/use-photo-changes.test.ts), PCH-3..PCH-6 (src/features/admin-screening/photo-changes.test.tsx). 808 in all.
- E2E, NEW: PP-29 (e2e/photo-pipeline.spec.ts, last — a warned photo, made 17 px wide, is stored with its warning row and the seller's tile says so; a plain photo has none; a visitor reads neither new table; a draft's photo is no change), SC-21 (e2e/admin-screening.spec.ts — on a live scratch ad the seller, through the upload route, adds a warned photo and a plain one, edits the plain one and removes the warned one: the four changes in order with their warnings; a visitor cannot download the remaining photo straight from the bucket; Admin › Screening lists the four with the warning; Show photos opens the one photo with Remove; Mark reviewed takes the removal off the list, writes who and when, and one audit row), SC-22 (e2e/admin-screening.spec.ts — a waiting scratch ad with a warned photo row is flagged in the queue, on the preview's photo and in Admin › Listings).
- E2E, edited: SC-20 (PART 0, its seed only).
- Seeds name every column in every row (INC-614). SC-21 stores real photo objects and purges them, with the seller's upload counter, after the test.
- Reached without an edit (CI runs them): every upload test (the route's path is the same; the screen's call carries the ad's words only when it knows them; PPOL-5, PPOL-9, PPOL-10 read the image parts), every photo-step test (the warning line shows only for a warned photo), PP-13 and PP-21 (photos are read through signed links), every screening and listings test (the flag is new and only for a warned photo).
- Red first: PP-29, SC-21, SC-22 fail on the base (no warning, no change list, no flag; the bucket rule still lets a visitor download). SC-20's fix is shown by its own red in turn 8's run. The unit tests prove new behaviour.
- Leases: PP-29 one scratch seller; SC-21 the scratch seller of `seedWaiting` and the super admin; SC-22 the super admin.

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, dev 74b1ca6d with this turn's files)
- Clean: typecheck (it covers e2e/), format, lint (0 errors, 33 warnings), 808 unit tests (139 files), the usage maps (they match), the hardcoded-strings guard (0 findings), the selector self-test, the listing-write guard, a build, the bundle budget (JS 311.2 KiB of 320).
- The migration on a local PostgreSQL 16 copy with stand-in tables, after turn 9's migration file: it applied and its proofs passed. On stand-in rows: a warned photo on a live ad wrote its warning row and an `added` change; a plain one an `added` change with no codes; a draft's photo a warning row and no change; an edit of the warned photo an `edited` change naming it, its warning row gone with it; the seller's removal on the live ad a `removed` change and none on the draft. As the seller (authenticated), his own warning rows only and no changes; as a person with listings:review, every row; a visitor has no grant. The review door: refused without the right ("forbidden"), marked once with one audit row, refused again ("changeGone").
- `scripts/check-migrations.sh` with this migration as 20261014111500_b13t10-check.sql: "Migration guard OK".
- Not run by the supervisor: the browser tests (its sandbox cannot reach ethio-staging). CI on the final commit runs them.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-13-turn-10.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines. It may name turn 9's commit or an earlier one, with any conclusion. Whatever it shows, go on: the CI read is the supervisor's, and a fix it needs comes in the next turn. Do not stop on it. You cannot git-fetch that branch. Paste `git rev-parse HEAD`: this is <START>;
  2. step 0;
  3. the census (below). If any result differs from what it expects, STOP and report: write nothing else;
  4. the carrier, then the hashes;
  5. the checks;
  6. the migration LAST, then its read-back;
  7. the report;
  8. END THE TURN.
  Do not stop between steps.
- The carrier's sections end with a newline each, blank lines included: write every section's bytes exactly as they stand between its header line and the next header (turn 9's first write lost blank lines at section ends).
- The migration is the last thing written, because the database tool applies it on ethio-prod the moment it is saved. The operator will see the "Modify Supabase database" dialog and allow it. The published site keeps working: it calls `register_listing_photo` and `replace_listing_photo` by name without `p_warnings`, which the new doors accept (it has a default); it reads photos through signed links, which no bucket rule governs.
- The expected red window (G35): CI on a commit pushed before the migration file exists runs PP-29, SC-21 and SC-22 against a staging without the new tables, and they fail; so do the uploads of every test (the route hands `p_warnings` to a door that does not take it yet). That is expected and is not fixed. CI on the final commit waits at its preflight ("STAGING BEHIND", up to 25 minutes) until the operator applies the migration on ethio-staging.
- If any rule of yours conflicts with the text, STOP before saving and quote that rule's exact words in the report.
- Production reads are SELECT-only. Reports carry counts, booleans and names of tables, columns, functions, roles and policies. Never an e-mail address, a user id, a token, a phone number or a row of user data.
- Tests (G38): no assertion loosened, no timeout raised, no retry added. A test this brief does not name is not edited.
- Scope — these files only: the one new migration file (the database tool names it), the 29 carrier paths and the brief. src/integrations/supabase/types.ts is in the carrier; if the platform regenerates it after the migration, name it in the report and paste `git diff src/integrations/supabase/types.ts`. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-13-turn-10.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 25 files → each equal to:
  3f8216bba94c94c4183c51a03710d3cf48fa71877c122afd3350c9ef18c6384a  docs/_changelog.md
  61abcf79ee1ab67e9625bc13a847b3273ecab499023bf3e219bece3816b8f56c  docs/features/admin-listings.md
  0923f011e110d34a4567d9ad1e915eae4611826cd1dd80aa5539c01fb79ed1d2  docs/features/admin-screening.md
  4d143a4f365b78770593cad8911c38330b4286466025c33494b29488d674740b  docs/features/media-pipeline.md
  5cdd700c7d5853028127e1296e1510e2edebfea4aa30b83a47bece5392fb55bd  docs/features/posting.md
  b3b8770a79b6c37cb0beb009b1de26fcb0a28f45cdaf96765c2bdc72894653cc  docs/generated/i18n-usage.json
  16b480560e8caf1c46ff06474b745c530d83e0a5920c04d2d09d0d1b1d7b57d0  e2e/admin-screening.spec.ts
  3c0f891a2c188f437bbdca7792ee3c71439e0f7206ce09c41138926981cc8a50  e2e/helpers/photos.ts
  7e675a0c665c8d8bca666d7e3e12b4e87fc355725379a4e73cc55b61267827ae  e2e/helpers/pool-reset-map.ts
  4840689845cb58791f8e2ba353b1f5315fbe1edf7f40dba041203e39b1deed80  e2e/photo-pipeline.spec.ts
  b3b8770a79b6c37cb0beb009b1de26fcb0a28f45cdaf96765c2bdc72894653cc  public/i18n-usage.json
  b70a5c9230777ef1050a2647141b3e20f36ff865d44d584b86f460794f3f6904  roadmap.md
  693c118ef8cfd2407d7e11c795701f337e0339a59c4e71d303183bb50777a156  scripts/public-surface-allowlist.txt
  6013d8116435e5d8bcd37b10b0c795ad23457b83c3979588b161ee4c0a85a365  src/features/admin-listings/listing-photos.tsx
  7db1624796e6fecaca37fffce21f12b59d32304594c716f5e22e6f30aa5265a6  src/features/admin-listings/listings-page.tsx
  e3d9843f5ae3fca313dfd13846bd865fd13b3264f744fde98c31882cee8fa69e  src/features/admin-screening/screening-page.tsx
  f69d992a6e033e5b443b555652480b853a0b8b9bfd63f90f31e886a17fde1186  src/features/admin-screening/use-screening.ts
  2ea066138a2970943a7795f40495a5204dc390bc1e2710db5011c7573484e7b3  src/features/posting/posting-service.ts
  87e2f478a0fabff2feb9fbbfc08923a3050e52ca35023598ba40957c815641e3  src/features/posting/step-photos.tsx
  0347f07813daabfe304c9956815c9dfd9b7bfbd1bfda3a1778320246bb0a8973  src/i18n/locales/am.ts
  ac073214648c2d3f6d7e5d60bbdc4da2818b969fda8348f9b75d2d782f8e79a8  src/i18n/locales/en.ts
  dc89992156d88951816eca2cbe263da278a628e8aa77227325b8574c1160ecbc  src/integrations/supabase/types.ts
  6e2a2ecc27ecc52a0cf36f0f9a635735e67846726075e4027cd33ef502ed21ba  src/routes/api/upload/photo.ts
  1e2dbb3a9b4debf8f96e495fe18a1b9de5c9bc963a1b2c1383eec141c0cc672d  src/server/media/policy.test.ts
  60f34b5624a6c8fa5764585d8a23bb394d4fa531f33450cefd828daee929323e  src/server/media/policy.ts
- (c) `ls src/features/admin-screening/photo-changes.tsx src/features/admin-screening/use-photo-changes.ts` → no such files.
- On ethio-prod with your query tool (SELECT only):
- (d) `select p.proname, md5(p.prosrc), length(p.prosrc), p.provolatile, p.prosecdef, p.proconfig from pg_proc p where p.oid in ('public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer, boolean)'::regprocedure, 'public.replace_listing_photo(uuid, uuid, uuid, jsonb, integer, integer, integer, boolean)'::regprocedure, 'public.remove_listing_photo(uuid, uuid)'::regprocedure) order by 1;` → three rows:
  register_listing_photo | a4c2954330f3c60b373979e4cc4721f3 | 1809 | v | t | {search_path=public}
  remove_listing_photo | 10d36cf408f6d0bf06d7db98cd5d2aa4 | 1005 | v | t | {search_path=public}
  replace_listing_photo | 452339cc7d60f7a9f83f3dc46e9788fa | 1939 | v | t | {search_path=public}
  Any other value is a STOP.
- (e) `select to_regclass('public.listing_photo_warnings') is null, to_regclass('public.listing_photo_changes') is null, to_regprocedure('public.admin_review_photo_change(uuid)') is null, exists (select 1 from pg_policy where polname = 'listing_photos_object_public_read' and polrelid = 'storage.objects'::regclass);` → t | t | t | t.
- (f) `select max(version) from public.migration_marks;` → 20261014110000 (turn 9's mark).

THE CARRIER — B13T10-TURN-CARRIER-2026-10-14.md (66,590 bytes; sha256 199df0bcf215bb0e85f1441bbf6735bbebc38fc107a323ae32378b67e8aa6bd6; 88 sections)
- Its first line starts "B13T10 TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`. No blank line separates the sections.
- Modes:
  - REPLACE: the section is the whole file;
  - NEW: a new file; the section is the whole file;
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file (INSERT-AFTER 0: at the top of the file);
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed. If your upload arrives under another name, match it by its size and sha256.

THE HASHES — `sha256sum` each of the 29 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  5cb5f4cb03cd9e1ecc02a8420991a23eab1ca83698c0a859b46540ccae51bed7  docs/_changelog.md
  56a3f7aaa029673d674ea229f8ace7bea899d0fa85f117378ee31a2e20f43f42  docs/features/admin-listings.md
  78216fd63ba62e908aa1842c7cb21233fed05a689c855afec9ebd358e8393af1  docs/features/admin-screening.md
  584fe0828ed715541cff2e4e76c91003b8decadafd601346e938c3de0994880f  docs/features/media-pipeline.md
  154d67fe4c5ca8a0db04bb63fae879b291769d905215ea6d9b32dc37ee961e48  docs/features/posting.md
  020d4e482a4c43db477b6c2121ee11d7beafeafd196b0757491b5a72b34c3026  docs/generated/i18n-usage.json
  ae9475f7474fab1f14dbcf86b5d02864d9d6bd71d0bf23e943fc4b3ccba63f91  e2e/admin-screening.spec.ts
  58b2950ac2923ede8ec57a5fd57e10325b96fef41497706df1f5b25f02be5f4a  e2e/helpers/photos.ts
  7b12e6bbfb4a1e4b56b61210c732573b4f462c223b6156f3373e985c55d7dcdc  e2e/helpers/pool-reset-map.ts
  863478e864ac8073e603e08970c847483e1ae37e475031ff2793d9734801eabb  e2e/photo-pipeline.spec.ts
  020d4e482a4c43db477b6c2121ee11d7beafeafd196b0757491b5a72b34c3026  public/i18n-usage.json
  c7966b8fd456c02d7ddd0a1703515b917745d07aab34d7afa57900fa56e2e5d7  roadmap.md
  8271712dbea54f422a1b25bab30fbb6f9d9c9db6766ebd27adcaaf24d9250ec0  scripts/public-surface-allowlist.txt
  24ab2ebb01b3e15f9c7a826df7b11aac3098697846f6ccd667c587b2e5cd9c51  src/features/admin-listings/listing-photos.tsx
  540ce56bac0c0ca46c95b2a74aaba581d5a0ed87c7694ee18a5bbec40c0d92ba  src/features/admin-listings/listings-page.tsx
  4df92cc303b1c9d73cbe69629a09330f83c06faef8044fe3d217a60dbd22a666  src/features/admin-screening/photo-changes.test.tsx
  25b44bfdedb3a62345c0accacda3ac563364ff718a159c4f5a426448106d95ca  src/features/admin-screening/photo-changes.tsx
  91f7f25bf647f58e4920171867eda4f24186245fb32f594fd003d18d74c176ad  src/features/admin-screening/screening-page.tsx
  9aa70331ba89457642e5b7d351818c9c9f616fda3445456f3eaa6c889b007df0  src/features/admin-screening/use-photo-changes.test.ts
  8eadb41a15f6cc2b9a729056e17484974523abaec46939bde67c0d6a43889d17  src/features/admin-screening/use-photo-changes.ts
  c6b983f6daf582ca8d4b449b80142fe24de5e49bb68dedc2fdf1aef4bd00b75b  src/features/admin-screening/use-screening.ts
  f7cff07b3d9834d949160c9d4a48356473e8d7a67b57da0db14c798df479cb3e  src/features/posting/posting-service.ts
  86007b93b5725a32a2e08c6f33c85222cf14fe17b5eda060820ac486c3f7dc7c  src/features/posting/step-photos.tsx
  a6568c37289c9a35b0a2045505a6965e72c682275f13bd27de16c49ecdb406b6  src/i18n/locales/am.ts
  b8b24e86db2ac0c68cc083661b770a50b9821488bebe508208d1d8e3db0c6355  src/i18n/locales/en.ts
  57b1518c3da9d7412ad314304a87d963f93e1c4437259b00697244e37703f044  src/integrations/supabase/types.ts
  ae25b2c85120307e5665bc27cdef7e66ae9c5ec78ff94cfecf803c5c6a5ed7c4  src/routes/api/upload/photo.ts
  67393dd82e6a1502707da60972c079619581acd2065e87dec7e39d582e0307e2  src/server/media/policy.test.ts
  847d2ba1784dfc0dcbbee3878a83c9b612a1021abcd964a7d9699b415b096893  src/server/media/policy.ts

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings;
- `bun run test:unit 2>&1 | tee /tmp/unit-b13t10.log` — 808 passed (139 files). Keep the whole output; if any test fails, paste its name and its first error line;
- `bun run i18n:map-guard` "usage maps match the tree." (the carrier already holds the regenerated maps);
- `bash scripts/check-hardcoded-strings.sh` "findings: 0";
- `bun run scripts/e2e-select.ts --self-test` OK;
- Not run by you: the typecheck, the build and the bundle budget (your platform's rule: "Do not run the Lovable project's builds or typechecks manually because the harness runs them automatically."). CI's jobs judge them; the supervisor ran the typecheck and a build on its own copy.

THE BROWSER RUN — not this turn: the local browser does not start (INC-506). CI on the final commit runs PP-29, SC-20, SC-21, SC-22 and every other spec.

THE MIGRATION RULES (G39 — every one applies)
- The text is between the BEGIN and END lines of the appendix below. Write it EXACTLY, changing only `<MARK>`. Before the change, its sha256 is f3e7d57bb4a48ac10471650d06760478e4ad4ba7d41f8e04ebdd6c79bfbc0e63 (21,978 bytes, 379 lines, ending with a newline).
- Check it in a scratch folder first (after the carrier):
  - copy supabase/migrations/*.sql into a temporary folder;
  - add the text, its `<MARK>` replaced by the mark you will use, under the name 20261014111500_b13t10-check.sql (a stamp later than turn 9's mark and earlier than any mark you will choose);
  - run `MIGRATIONS_DIR=<that folder> bash scripts/check-migrations.sh`.
  Paste its "guard OK" lines and "Migration guard OK".
- `<MARK>` is chosen at apply time:
  - read now() at time zone 'utc' on ethio-prod;
  - round it up to the next whole hour and add one hour (add twelve hours instead if the save dialog may wait);
  - the mark must be later than the saved file's own stamp AND above 20261014110000 (the newest mark): if the reading gives 20261014110000 or less, use 20261014120000.
- Then hand the FINAL text to the database tool ONCE. Never a stub, a comment or a draft (INC-491).
- A clean apply is the proofs' pass: they RAISE EXCEPTION on any failure.

THE READ-BACK (ethio-prod, your query tool, SELECT only; paste each result)
- `select version from public.migration_marks where version = '<MARK>';` → one row;
- `select p.proname, pg_get_function_identity_arguments(p.oid), md5(p.prosrc), length(p.prosrc), p.provolatile, p.prosecdef, p.proconfig from pg_proc p where p.pronamespace = 'public'::regnamespace and p.proname in ('register_listing_photo', 'replace_listing_photo', 'remove_listing_photo', 'admin_review_photo_change') order by 1;` → four rows, one per name:
  admin_review_photo_change | p_change_id uuid | 93e1798802419e4a8b9a9e436d9805ef | 758 | v | t | {search_path=public}
  register_listing_photo | p_listing_id uuid, p_photo_id uuid, p_paths jsonb, p_width integer, p_height integer, p_bytes integer, p_unscreened boolean, p_warnings text[] | 467b47c223738f65c4c0132fc198c793 | 2416 | v | t | {search_path=public}
  remove_listing_photo | p_listing_id uuid, p_photo_id uuid | cc3deda81f2c56644358030e2209dfef | 1372 | v | t | {search_path=public}
  replace_listing_photo | p_listing_id uuid, p_old_photo_id uuid, p_photo_id uuid, p_paths jsonb, p_width integer, p_height integer, p_bytes integer, p_unscreened boolean, p_warnings text[] | 6f68316be1209f6d4c426bd039d65c21 | 2583 | v | t | {search_path=public}
- `select c.relname, c.relrowsecurity, has_table_privilege('anon', c.oid, 'SELECT'), has_table_privilege('authenticated', c.oid, 'SELECT'), has_table_privilege('authenticated', c.oid, 'INSERT') from pg_class c where c.oid in ('public.listing_photo_changes'::regclass, 'public.listing_photo_warnings'::regclass) order by 1;` → listing_photo_changes | t | f | t | f and listing_photo_warnings | t | f | t | f;
- `select has_function_privilege('anon', 'public.admin_review_photo_change(uuid)', 'EXECUTE'), has_function_privilege('authenticated', 'public.admin_review_photo_change(uuid)', 'EXECUTE'), has_function_privilege('authenticated', 'public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer, boolean, text[])', 'EXECUTE'), has_function_privilege('authenticated', 'public.remove_listing_photo(uuid, uuid)', 'EXECUTE');` → f | t | f | t;
- `select count(*) from pg_policy where polname = 'listing_photos_object_public_read';` → 0;
- `select count(*) from public.listing_photo_warnings;` and `select count(*) from public.listing_photo_changes;` → 0 and 0 (the published site has not sent a warning yet).

THE REPORT
- Done or not done, by step.
- The six ci-status lines, and <START>.
- The census results (a)–(f).
- The 29 sha256sum lines and the brief's.
- `git diff --name-only <START>` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only <START> HEAD` too. Expect the 29 carrier paths, the brief and the one migration file. `git ls-files src/features/admin-screening/photo-changes.tsx src/features/admin-screening/photo-changes.test.tsx src/features/admin-screening/use-photo-changes.ts src/features/admin-screening/use-photo-changes.test.ts`, so the new files are shown tracked (G20).
- The checks.
- The check-migrations "guard OK" lines; the mark and the now() reading it came from; the apply outcome; the read-back.
- The line "apply <uuid-fragment of the migration's filename> → expect mark <MARK>", for the operator's staging apply.
- The strings: each new key, its English and its Amharic, as written (G43).
- In this report ONLY (never in a file — the repository is public): from the database tool's security warnings, each warning that names `listing_photo_warnings`, `listing_photo_changes`, `register_listing_photo`, `replace_listing_photo`, `remove_listing_photo`, `admin_review_photo_change` or `listing_photos_object_public_read`: the warning's title and the object's name, and the total count. Change nothing for them.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only). The database change is undone only by a new migration — never by editing this file.

AFTER THIS TURN (for the operator), in this order:
1. Apply the migration on ethio-staging (the SQL editor) and read back its mark. CI's preflight waits for it (up to 25 minutes); if the run has already failed at the preflight, use "Re-run failed jobs".
2. Bring the supervisor Lovable's report. The next prompt comes back at once: send it to Lovable as soon as you have it. Do not wait for CI (DEC-181).
3. Publish only when the supervisor says the newest commit is green and Lovable is idle.
4. Then the supervisor's walk.

APPENDIX — THE MIGRATION TEXT (write it exactly; change only <MARK>)
----- BEGIN MIGRATION -----
-- Bundle 13 (photos), turn 10 (2026-10-14). Tier A. D154 B3 — a photo that may not show what the ad sells is stored with a
-- warning; D154 B5 — the photo changes a seller makes on a live ad are listed for staff.
--
-- A. listing_photo_warnings (NEW): one row per photo the screen warned about — its codes (today only `not_relevant`). It
--    is a table of its own, not a column on listing_photos, so that no visitor reads a warning: the seller reads his own
--    photos' rows, staff with listings:view read every row, and nobody else reads any. Rows are written only by the photo
--    doors below; a photo's row goes with the photo (ON DELETE CASCADE).
-- B. listing_photo_changes (NEW): one row per photo a seller adds, edits or removes while the ad is live (`active` or
--    `reduced`), with the screen's warnings; staff with listings:review read it and mark a row reviewed through the door
--    in F. A staff removal is not a seller's change (History keeps it) and is not listed.
-- C. register_listing_photo, redeclared whole from its live definition (20261014022725; census (d)) with `p_warnings`
--    (default none): the warning row, and on a live ad an `added` change. The seven-argument signature is dropped and its
--    grants are restated for the eight.
-- D. replace_listing_photo, redeclared whole from its live definition (turn 9; census (d)) with `p_warnings`: the new
--    photo's warning row, and on a live ad an `edited` change naming the photo it replaced. The eight-argument signature is
--    dropped and its grants are restated for the nine.
-- E. remove_listing_photo, redeclared whole from its live definition (20260917113152; census (d)): on a live ad, a
--    `removed` change. Its signature does not change; its grants are restated.
-- F. admin_review_photo_change (NEW): listings:review marks one change reviewed and audits
--    `listing.photo_change_reviewed`.
-- G. The listing-photos bucket's public read rule (`listing_photos_object_public_read`, 20260804174739) is dropped: since
--    D151 (INC-588) every photo is read through a short-lived link the server signs with the service role, which no
--    storage rule governs, so a visitor needs no rule of his own on the bucket. The owner's rules stay as they are.
-- H. Proofs (structure, body markers, policies, grants; RAISE EXCEPTION on any failure). No proof touches a real row or
--    auth.users. What the doors write is proven by the routes' own tests (PP-29, SC-21), through the app's connection.

-- ===== A — listing_photo_warnings =====
CREATE TABLE IF NOT EXISTS public.listing_photo_warnings (
  photo_id   uuid PRIMARY KEY REFERENCES public.listing_photos(id) ON DELETE CASCADE,
  -- The listing is the photo's (no second foreign key: the row goes with its photo, and the
  -- photo with its listing).
  listing_id uuid NOT NULL,
  codes      text[] NOT NULL CHECK (cardinality(codes) > 0),
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS listing_photo_warnings_listing_idx ON public.listing_photo_warnings (listing_id);
ALTER TABLE public.listing_photo_warnings ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.listing_photo_warnings FROM PUBLIC, anon, authenticated;
GRANT SELECT ON public.listing_photo_warnings TO authenticated;
GRANT ALL ON public.listing_photo_warnings TO service_role;
DROP POLICY IF EXISTS listing_photo_warnings_seller_read ON public.listing_photo_warnings;
CREATE POLICY listing_photo_warnings_seller_read ON public.listing_photo_warnings
  FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.listings l
                 WHERE l.id = listing_photo_warnings.listing_id AND l.seller_id = auth.uid()));
DROP POLICY IF EXISTS listing_photo_warnings_admin_read ON public.listing_photo_warnings;
CREATE POLICY listing_photo_warnings_admin_read ON public.listing_photo_warnings
  FOR SELECT TO authenticated
  USING (public.has_permission(auth.uid(), 'listings', 'view'));

-- ===== B — listing_photo_changes =====
CREATE TABLE IF NOT EXISTS public.listing_photo_changes (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id       uuid NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
  kind             text NOT NULL CHECK (kind IN ('added', 'edited', 'removed')),
  photo_id         uuid NOT NULL,
  replaced_photo_id uuid NULL,
  codes            text[] NOT NULL DEFAULT '{}',
  created_at       timestamptz NOT NULL DEFAULT now(),
  reviewed_at      timestamptz NULL,
  reviewed_by      uuid NULL
);
CREATE INDEX IF NOT EXISTS listing_photo_changes_open_idx
  ON public.listing_photo_changes (created_at) WHERE reviewed_at IS NULL;
CREATE INDEX IF NOT EXISTS listing_photo_changes_listing_idx ON public.listing_photo_changes (listing_id);
ALTER TABLE public.listing_photo_changes ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.listing_photo_changes FROM PUBLIC, anon, authenticated;
GRANT SELECT ON public.listing_photo_changes TO authenticated;
GRANT ALL ON public.listing_photo_changes TO service_role;
DROP POLICY IF EXISTS listing_photo_changes_admin_read ON public.listing_photo_changes;
CREATE POLICY listing_photo_changes_admin_read ON public.listing_photo_changes
  FOR SELECT TO authenticated
  USING (public.has_permission(auth.uid(), 'listings', 'review'));

-- ===== C — register_listing_photo, whole, with p_warnings =====
DROP FUNCTION IF EXISTS public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer, boolean);

CREATE OR REPLACE FUNCTION public.register_listing_photo(
  p_listing_id uuid,
  p_photo_id uuid,
  p_paths jsonb,
  p_width integer,
  p_height integer,
  p_bytes integer,
  p_unscreened boolean DEFAULT false,
  p_warnings text[] DEFAULT '{}'::text[]
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE v_order int; v_path text; v_seller uuid; v_status text; v_cap smallint; v_count int;
BEGIN
  -- Service-only: the strip route is the sole writer, because only it can
  -- attest that the EXIF was removed.
  IF auth.uid() IS NOT NULL THEN
    RAISE EXCEPTION 'register_listing_photo is called by the photo route only';
  END IF;
  SELECT seller_id, status INTO v_seller, v_status FROM public.listings WHERE id = p_listing_id;
  IF v_seller IS NULL THEN
    RAISE EXCEPTION 'listing not found';
  END IF;
  v_path := p_paths->>'original';
  IF v_path IS NULL OR btrim(v_path) = '' THEN
    RAISE EXCEPTION 'paths.original is required';
  END IF;
  -- D22 — the plan's photo cap is the authority; the route's cap is a mirror.
  v_cap := public.plan_photo_cap(public.seller_plan(v_seller));
  SELECT count(*) INTO v_count FROM public.listing_photos WHERE listing_id = p_listing_id;
  IF v_count >= v_cap THEN
    RAISE EXCEPTION 'tooManyPhotos:%', v_cap;
  END IF;
  SELECT coalesce(max(display_order), -1) + 1 INTO v_order
    FROM public.listing_photos WHERE listing_id = p_listing_id;
  -- D158 (bundle 13 turn 6) — a photo stored while photo screening is off is HELD:
  -- `unscreened`, shown to no buyer until staff approve the ad.
  INSERT INTO public.listing_photos (id, listing_id, storage_path, paths, display_order,
                                     exif_stripped, width, height, bytes, unscreened)
  VALUES (coalesce(p_photo_id, gen_random_uuid()), p_listing_id, v_path, p_paths, v_order,
          true, p_width, p_height, p_bytes, coalesce(p_unscreened, false))
  RETURNING id INTO p_photo_id;
  -- D154 B3 (bundle 13 turn 10) — the screen's warnings, seen by the seller and staff only.
  IF cardinality(coalesce(p_warnings, '{}'::text[])) > 0 THEN
    INSERT INTO public.listing_photo_warnings (photo_id, listing_id, codes)
    VALUES (p_photo_id, p_listing_id, p_warnings);
  END IF;
  -- D154 B5 — a photo added to a live ad is listed for staff.
  IF v_status IN ('active', 'reduced') THEN
    INSERT INTO public.listing_photo_changes (listing_id, kind, photo_id, codes)
    VALUES (p_listing_id, 'added', p_photo_id, coalesce(p_warnings, '{}'::text[]));
  END IF;
  UPDATE public.listings SET cover_photo_id = coalesce(cover_photo_id, p_photo_id),
    updated_at = now() WHERE id = p_listing_id;
  RETURN jsonb_build_object('ok', true, 'photo_id', p_photo_id, 'display_order', v_order);
END $$;

REVOKE ALL ON FUNCTION public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer, boolean, text[]) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer, boolean, text[]) TO service_role;

-- ===== D — replace_listing_photo, whole, with p_warnings =====
DROP FUNCTION IF EXISTS public.replace_listing_photo(uuid, uuid, uuid, jsonb, integer, integer, integer, boolean);

CREATE OR REPLACE FUNCTION public.replace_listing_photo(
  p_listing_id uuid,
  p_old_photo_id uuid,
  p_photo_id uuid,
  p_paths jsonb,
  p_width integer,
  p_height integer,
  p_bytes integer,
  p_unscreened boolean DEFAULT false,
  p_warnings text[] DEFAULT '{}'::text[]
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE v_order int; v_path text; v_cover uuid; v_status text;
BEGIN
  -- Service-only: the strip route is the sole writer, because only it can
  -- attest that the EXIF was removed.
  IF auth.uid() IS NOT NULL THEN
    RAISE EXCEPTION 'replace_listing_photo is called by the photo route only';
  END IF;
  IF p_photo_id IS NULL OR p_old_photo_id IS NULL THEN
    RAISE EXCEPTION 'photo ids are required';
  END IF;
  -- One edit of an ad's photos at a time: the listing row is locked.
  SELECT status INTO v_status FROM public.listings WHERE id = p_listing_id FOR UPDATE;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'listing not found';
  END IF;
  v_path := p_paths->>'original';
  IF v_path IS NULL OR btrim(v_path) = '' THEN
    RAISE EXCEPTION 'paths.original is required';
  END IF;
  SELECT display_order INTO v_order FROM public.listing_photos
   WHERE id = p_old_photo_id AND listing_id = p_listing_id;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'photoGone';
  END IF;
  UPDATE public.listings SET cover_photo_id = NULL
   WHERE id = p_listing_id AND cover_photo_id = p_old_photo_id;
  DELETE FROM public.listing_photos WHERE id = p_old_photo_id AND listing_id = p_listing_id;
  -- D158 — a photo stored while photo screening is off is HELD (`unscreened`).
  INSERT INTO public.listing_photos (id, listing_id, storage_path, paths, display_order,
                                     exif_stripped, width, height, bytes, unscreened)
  VALUES (p_photo_id, p_listing_id, v_path, p_paths, v_order,
          true, p_width, p_height, p_bytes, coalesce(p_unscreened, false));
  -- D154 B3 (bundle 13 turn 10) — the screen's warnings, seen by the seller and staff only.
  IF cardinality(coalesce(p_warnings, '{}'::text[])) > 0 THEN
    INSERT INTO public.listing_photo_warnings (photo_id, listing_id, codes)
    VALUES (p_photo_id, p_listing_id, p_warnings);
  END IF;
  -- D154 B5 — a photo edited on a live ad is listed for staff.
  IF v_status IN ('active', 'reduced') THEN
    INSERT INTO public.listing_photo_changes (listing_id, kind, photo_id, replaced_photo_id, codes)
    VALUES (p_listing_id, 'edited', p_photo_id, p_old_photo_id, coalesce(p_warnings, '{}'::text[]));
  END IF;
  SELECT id INTO v_cover FROM public.listing_photos
   WHERE listing_id = p_listing_id ORDER BY display_order LIMIT 1;
  UPDATE public.listings SET cover_photo_id = v_cover, updated_at = now()
   WHERE id = p_listing_id;
  RETURN jsonb_build_object('ok', true, 'photo_id', p_photo_id, 'display_order', v_order,
                            'replaced', p_old_photo_id, 'cover_photo_id', v_cover);
END $$;

REVOKE ALL ON FUNCTION public.replace_listing_photo(uuid, uuid, uuid, jsonb, integer, integer, integer, boolean, text[]) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.replace_listing_photo(uuid, uuid, uuid, jsonb, integer, integer, integer, boolean, text[]) TO service_role;

-- ===== E — remove_listing_photo, whole =====
CREATE OR REPLACE FUNCTION public.remove_listing_photo(p_listing_id uuid, p_photo_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE v_uid uuid := auth.uid(); v_next uuid; v_status text;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF NOT EXISTS (SELECT 1 FROM public.listings WHERE id = p_listing_id AND seller_id = v_uid) THEN
    RAISE EXCEPTION 'not your listing';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM public.listing_photos
                  WHERE id = p_photo_id AND listing_id = p_listing_id) THEN
    RAISE EXCEPTION 'photo not found on this listing';
  END IF;
  UPDATE public.listings SET cover_photo_id = NULL
   WHERE id = p_listing_id AND cover_photo_id = p_photo_id;
  DELETE FROM public.listing_photos WHERE id = p_photo_id AND listing_id = p_listing_id;
  -- D154 B5 (bundle 13 turn 10) — a photo the seller removes from a live ad is listed for staff.
  SELECT status INTO v_status FROM public.listings WHERE id = p_listing_id;
  IF v_status IN ('active', 'reduced') THEN
    INSERT INTO public.listing_photo_changes (listing_id, kind, photo_id)
    VALUES (p_listing_id, 'removed', p_photo_id);
  END IF;
  SELECT id INTO v_next FROM public.listing_photos
   WHERE listing_id = p_listing_id ORDER BY display_order LIMIT 1;
  UPDATE public.listings SET cover_photo_id = coalesce(cover_photo_id, v_next), updated_at = now()
   WHERE id = p_listing_id;
  RETURN jsonb_build_object('ok', true, 'removed', p_photo_id, 'cover_photo_id', v_next);
END $$;

REVOKE ALL ON FUNCTION public.remove_listing_photo(uuid, uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.remove_listing_photo(uuid, uuid) TO authenticated;
GRANT ALL ON FUNCTION public.remove_listing_photo(uuid, uuid) TO service_role;

-- ===== F — admin_review_photo_change =====
CREATE OR REPLACE FUNCTION public.admin_review_photo_change(p_change_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE v_uid uuid := auth.uid(); v_listing uuid;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF NOT public.has_permission(v_uid, 'listings', 'review') THEN
    RAISE EXCEPTION 'forbidden';
  END IF;
  UPDATE public.listing_photo_changes SET reviewed_at = now(), reviewed_by = v_uid
   WHERE id = p_change_id AND reviewed_at IS NULL
  RETURNING listing_id INTO v_listing;
  IF v_listing IS NULL THEN
    RAISE EXCEPTION 'changeGone';
  END IF;
  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
  VALUES (v_uid, 'listing.photo_change_reviewed', 'listing', v_listing::text,
          jsonb_build_object('change', p_change_id));
  RETURN jsonb_build_object('ok', true, 'change', p_change_id);
END $$;

REVOKE ALL ON FUNCTION public.admin_review_photo_change(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_review_photo_change(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.admin_review_photo_change(uuid) TO service_role;

-- ===== G — the bucket's public read rule =====
DROP POLICY IF EXISTS listing_photos_object_public_read ON storage.objects;

-- ===== H — proofs =====
DO $proof$
DECLARE
  v_src text;
  v_n   integer;
BEGIN
  -- A
  SELECT count(*) INTO v_n FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace
   WHERE n.nspname = 'public' AND c.relname = 'listing_photo_warnings' AND c.relrowsecurity;
  IF v_n <> 1 THEN RAISE EXCEPTION 'proof A failed: listing_photo_warnings is missing or has no row security'; END IF;
  SELECT count(*) INTO v_n FROM pg_policy
   WHERE polrelid = 'public.listing_photo_warnings'::regclass
     AND polname IN ('listing_photo_warnings_seller_read', 'listing_photo_warnings_admin_read') AND polcmd = 'r';
  IF v_n <> 2 THEN RAISE EXCEPTION 'proof A failed: the warnings table''s two read policies are not as written'; END IF;
  IF has_table_privilege('anon', 'public.listing_photo_warnings', 'SELECT')
     OR has_table_privilege('authenticated', 'public.listing_photo_warnings', 'INSERT')
     OR has_table_privilege('authenticated', 'public.listing_photo_warnings', 'UPDATE')
     OR has_table_privilege('authenticated', 'public.listing_photo_warnings', 'DELETE') THEN
    RAISE EXCEPTION 'proof A failed: a browser role can read the warnings without a session, or write them';
  END IF;
  -- B
  SELECT count(*) INTO v_n FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace
   WHERE n.nspname = 'public' AND c.relname = 'listing_photo_changes' AND c.relrowsecurity;
  IF v_n <> 1 THEN RAISE EXCEPTION 'proof B failed: listing_photo_changes is missing or has no row security'; END IF;
  SELECT count(*) INTO v_n FROM pg_policy
   WHERE polrelid = 'public.listing_photo_changes'::regclass
     AND polname = 'listing_photo_changes_admin_read' AND polcmd = 'r'
     AND pg_get_expr(polqual, polrelid) LIKE '%''listings''%''review''%';
  IF v_n <> 1 THEN RAISE EXCEPTION 'proof B failed: the changes table''s read policy is not as written'; END IF;
  IF has_table_privilege('anon', 'public.listing_photo_changes', 'SELECT')
     OR has_table_privilege('authenticated', 'public.listing_photo_changes', 'INSERT')
     OR has_table_privilege('authenticated', 'public.listing_photo_changes', 'UPDATE')
     OR has_table_privilege('authenticated', 'public.listing_photo_changes', 'DELETE') THEN
    RAISE EXCEPTION 'proof B failed: a browser role can read the changes without a session, or write them';
  END IF;
  -- C
  IF to_regprocedure('public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer, boolean)') IS NOT NULL THEN
    RAISE EXCEPTION 'proof C failed: the seven-argument register_listing_photo is still there';
  END IF;
  SELECT prosrc INTO v_src FROM pg_proc
   WHERE oid = 'public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer, boolean, text[])'::regprocedure
     AND prosecdef AND provolatile = 'v' AND proconfig = ARRAY['search_path=public'];
  IF v_src IS NULL OR v_src NOT LIKE '%register_listing_photo is called by the photo route only%'
     OR v_src NOT LIKE '%INSERT INTO public.listing_photo_warnings%'
     OR v_src NOT LIKE '%v_status IN (''active'', ''reduced'')%'
     OR v_src NOT LIKE '%''added''%' OR v_src NOT LIKE '%tooManyPhotos%' THEN
    RAISE EXCEPTION 'proof C failed: the body of register_listing_photo is not as written';
  END IF;
  IF has_function_privilege('authenticated', 'public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer, boolean, text[])', 'EXECUTE')
     OR has_function_privilege('anon', 'public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer, boolean, text[])', 'EXECUTE')
     OR NOT has_function_privilege('service_role', 'public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer, boolean, text[])', 'EXECUTE') THEN
    RAISE EXCEPTION 'proof C failed: register_listing_photo is not the service role''s alone';
  END IF;
  -- D
  IF to_regprocedure('public.replace_listing_photo(uuid, uuid, uuid, jsonb, integer, integer, integer, boolean)') IS NOT NULL THEN
    RAISE EXCEPTION 'proof D failed: the eight-argument replace_listing_photo is still there';
  END IF;
  SELECT prosrc INTO v_src FROM pg_proc
   WHERE oid = 'public.replace_listing_photo(uuid, uuid, uuid, jsonb, integer, integer, integer, boolean, text[])'::regprocedure
     AND prosecdef AND provolatile = 'v' AND proconfig = ARRAY['search_path=public'];
  IF v_src IS NULL OR v_src NOT LIKE '%replace_listing_photo is called by the photo route only%'
     OR v_src NOT LIKE '%RAISE EXCEPTION ''photoGone''%' OR v_src NOT LIKE '%FOR UPDATE%'
     OR v_src NOT LIKE '%INSERT INTO public.listing_photo_warnings%' OR v_src NOT LIKE '%''edited''%' THEN
    RAISE EXCEPTION 'proof D failed: the body of replace_listing_photo is not as written';
  END IF;
  IF has_function_privilege('authenticated', 'public.replace_listing_photo(uuid, uuid, uuid, jsonb, integer, integer, integer, boolean, text[])', 'EXECUTE')
     OR has_function_privilege('anon', 'public.replace_listing_photo(uuid, uuid, uuid, jsonb, integer, integer, integer, boolean, text[])', 'EXECUTE')
     OR NOT has_function_privilege('service_role', 'public.replace_listing_photo(uuid, uuid, uuid, jsonb, integer, integer, integer, boolean, text[])', 'EXECUTE') THEN
    RAISE EXCEPTION 'proof D failed: replace_listing_photo is not the service role''s alone';
  END IF;
  -- E
  SELECT prosrc INTO v_src FROM pg_proc
   WHERE oid = 'public.remove_listing_photo(uuid, uuid)'::regprocedure
     AND prosecdef AND proconfig = ARRAY['search_path=public'];
  IF v_src IS NULL OR v_src NOT LIKE '%not your listing%' OR v_src NOT LIKE '%photo not found on this listing%'
     OR v_src NOT LIKE '%''removed''%' THEN
    RAISE EXCEPTION 'proof E failed: the body of remove_listing_photo is not as written';
  END IF;
  -- F
  SELECT prosrc INTO v_src FROM pg_proc
   WHERE oid = 'public.admin_review_photo_change(uuid)'::regprocedure
     AND prosecdef AND proconfig = ARRAY['search_path=public'];
  IF v_src IS NULL OR v_src NOT LIKE '%has_permission(v_uid, ''listings'', ''review'')%'
     OR v_src NOT LIKE '%''listing.photo_change_reviewed''%' OR v_src NOT LIKE '%reviewed_at IS NULL%' THEN
    RAISE EXCEPTION 'proof F failed: the body of admin_review_photo_change is not as written';
  END IF;
  IF has_function_privilege('anon', 'public.admin_review_photo_change(uuid)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.admin_review_photo_change(uuid)', 'EXECUTE') THEN
    RAISE EXCEPTION 'proof F failed: admin_review_photo_change''s grants are not as written';
  END IF;
  -- G
  IF EXISTS (SELECT 1 FROM pg_policy WHERE polname = 'listing_photos_object_public_read'
              AND polrelid = 'storage.objects'::regclass) THEN
    RAISE EXCEPTION 'proof G failed: the bucket''s public read rule is still there';
  END IF;
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('<MARK>') ON CONFLICT (version) DO NOTHING;
----- END MIGRATION -----
```
