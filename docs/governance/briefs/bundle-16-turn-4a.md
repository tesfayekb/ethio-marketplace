# Bundle 16 — turn 4a: the photo review, server side: brief, version 1 (saved unchanged, 2026-10-15)

```text
BUNDLE 16 — TURN 4a (2026-10-15). ONE TURN: ONE MIGRATION, THE UPLOAD ROUTE, ONE TEST FILE'S CHANGES AND TWO NEW TESTS WRITTEN BY YOU, DOCS. No package change.
Base: dev cc64a2db (turn S2). The census below proves every file and the database by content. This file is public: it is written as build instructions.
Tier A: the migration (the photo doors, the approval trigger, the new staff door, the review table) and the upload route. Tier B: the tests. Tier C: the docs, the roadmap and the changelog.

ANSWERS TO THE LAST TURN
- Turn S2 is verified on dev cc64a2db: the 12 carrier paths equal the supervisor's copy byte for byte; the brief (ef40298f…) is saved; the four fixes (ML-12, ML-13, MLA-14, PW-41) and SU-2 and PR-50 are as described; the migration file was saved by script (sha256 b45e2071…, equal). Stopping before the database tool was right: the operator applied the file on ethio-staging and ethio-prod from GitHub (the M6 precedent). Census (d) below reads S2 on ethio-prod first.
- The platform's own change in commit 464d7f31 (@lovable.dev/vite-tanstack-config 2.25.3 → 2.26.5) is recorded as INC-637; package.json and bun.lock are not touched in this turn either.
- CI: the run on 1dadfbbf was cancelled by the newer push; the run on cc64a2db judges turn S2. SU-2 stays red until the operator switches the sign-up hook on in ethio-staging.

WHY THIS TURN — D178 and D183 (the operator, 2026-10-14 and 2026-10-15)
- "EACH PHOTO TO HAVE AI REVIEW PASS FAIL ETC, AND MAY BE SOMETHING ELSE LIKE AMBIGUOUS, NOT APPROPRIATE FOR THE CATEGORY ETC LABEL, IF PASS GOES TO LIVE, OTHERS FOR SECONDARY REVIEW … NOW ON EDIT IF A PHOTO CHANGED, THEN NEEDS SAME REVIEW AND PASS PROCESS."
- "FAILED PHOTO WILL NOT GO LIVE. JUST SAVE, AND ADMIN CAN FINALLY DECIDE TO REMOVE, ALLOW, OR EVEN DECLINE THE WHOLE ADVERTISEMENT IF VIOLATING TERMS."
- D183: a photo the screen flags for nudity is still refused at upload and never stored; every other failed photo is saved hidden for staff.
- This turn is the server side. Turn 4b puts it on screen: Admin › Screening's "Photos to review" with Allow and Remove, and the seller's "Waiting for review" with its reason. Between the two, a judged photo is stored hidden and shows the seller today's "Not checked by AI" mark.

WHAT THIS TURN BUILDS
- The migration (its text in the appendix):
  A. `listing_photo_reviews` (NEW): one row per photo kept hidden for a person — label (unsure, not_right, fail, held), a fail's code and short phrase, and once decided, when, who and how (allowed, approved_with_ad). Row security: the seller reads his own photos' rows, listings:review reads every row, no browser role writes, anon reads nothing. A row goes with its photo and with its ad.
  B. `listing_photo_review_label(p_unscreened, p_review)` (NEW, caller's rights, reads no table, service role only): the one rule — a photo under review is stored hidden; its label is unsure, not_right or fail; a fail names one of eight codes (never nudity, never variant_mismatch); a hidden photo with no review is `held`.
  C. `register_listing_photo` and D. `replace_listing_photo`, each redeclared whole from its live definition with one new argument, `p_review jsonb DEFAULT NULL`: the rule's check first, then the review row. The old signatures are dropped and the grants restated (service role only).
  E. `listing_photos_approved_with_ad`, redeclared whole from its live definition: approving the ad shows only its `held` photos (and a photo held before this turn, which has no review row) and marks their reviews decided; a photo the screen judged stays hidden.
  F. `admin_allow_listing_photo(p_photo_id)` (NEW): listings:review with the second factor, never the caller's own ad, an open review only; shows the photo, marks the review allowed, audits `listing.photo_allowed`.
  G. A backfill: every photo held today gets a `held` row.
  H. Proofs P1–P5.
- The carrier:
  - src/server/media/policy.ts: the warning `unsure` (with one short phrase in `evidence`), its instruction lines, and fake mode's two new widths (11 px → refused `nudity`; 19 px → allowed with `unsure`). 13 px still answers `not_a_photo`; 17 px still answers `not_relevant`.
  - src/server/media/hold.ts: `photoScreenPlan(gate)` answers screen, hold or unavailable (`paused` retired: with screening off a photo on any ad is held); `photoOutcome(verdict)` — show a clean pass; keep for review an unsure, a not_relevant (label not_right) and a fail with one of the eight codes; refuse nudity, variant_mismatch and the provider's failure; `STORED_FAIL_CODES`.
  - src/routes/api/upload/photo.ts: the outcome decides; a kept photo goes to the door with `p_unscreened` true and `p_review`; the answer carries `review` (`{label, code?}`; the phrase is for staff only).
  - src/integrations/supabase/types.ts (the table, the two new functions, `p_review`), e2e/helpers/pool-reset-map.ts (`listing_photo_reviews` exempt: `decided_by` is attribution; the account's own reviews go with its photos), the unit tests (hold.test.ts PH-1…PH-8; policy.test.ts PPOL-13 changed, PPOL-17 NEW), scripts/public-surface-allowlist.txt (two lines), the docs (media-pipeline), the roadmap and the changelog.
- THE TESTS (below): you change PP-5, PP-26 and PP-29 and write PP-32 and SC-23.

DECIDED BY THE OPERATOR (D178, D183)
- Only a clean pass is shown. Unsure, not right for the ad and failed photos are kept hidden for a person, who allows, removes or declines the whole ad. Nudity is refused at upload and never stored.

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- A smaller copy that shows another picture (variant_mismatch) stays refused: the stored sizes would disagree.
- With screening off, a photo on a live ad is held for staff instead of refused (staff now see every held photo).
- Approving an ad in Screening shows only photos held while screening was off; a photo the screen judged waits for its own decision.
- Allowing a photo needs listings:review and the second factor, as approving an ad does; removing it stays the existing staff Remove.
- A photo of a personal document (ID card, passport) is kept hidden for staff like the other fails, as D183 says; staff remove it.

THE TESTS — you write them this turn, from the descriptions below (Tier B).
General rules:
- Each new test goes in its file's own `test.describe`, after the file's last test, titled exactly as below; reuse the file's own helpers. At most two leased accounts per test (DEC-174).
- Every row a test makes is its own and is removed in its `finally` (J3, G27). No real row is changed.
- G38: no assertion loosened, no timeout raised, no retry added, no dial raised.

PP-5 (e2e/photo-pipeline.spec.ts) — CHANGED: the 13-px marker is now kept hidden for review, so the refusal uses the nudity width. The cover is `{ made: [11, 11] }` (fake mode: refused `nudity`); the expected reason is "nudity"; nothing is registered and nothing is stored, as before. Its comment names the 11-px width. Its title is unchanged.

PP-26 (e2e/photo-pipeline.spec.ts) — CHANGED: the edit the screen refuses uses `{ made: [11, 11] }` and expects the reason "nudity"; its comment says so. Everything else in it is unchanged.

PP-29 (e2e/photo-pipeline.spec.ts) — CHANGED, assertions added, none removed:
- the warned upload's answer: `unscreened` is true and `review` equals `{ label: "not_right" }`; the plain upload's answer: `unscreened` is false and has no `review` key;
- through the service client: `listing_photo_reviews` for the listing (photo_id, label, code) equals one row, the warned photo's, label "not_right", code null; the warned photo's `listing_photos.unscreened` is true;
- the visitor loop also reads "listing_photo_reviews" and is refused.

PP-32 "PP-32 a failed or unsure photo is kept hidden with its review; nudity is refused and stored nowhere (D178, D183)" (e2e/photo-pipeline.spec.ts; `seller`, `draft`, `uploadPhoto`, `photoRowsOf`, `objectsUnder`)
- Seller A, a draft of A's.
- Upload `{ name: "marker-13px.jpg" }` → status 200, `ok` true, `unscreened` true, `review` equals `{ label: "fail", code: "not_a_photo" }`.
- Upload `{ made: [19, 19] }` → `ok` true, `unscreened` true, `review` equals `{ label: "unsure" }`.
- Upload `{ made: [11, 11] }` → the refusal `[{ field: "cover", reason: "nudity" }]`.
- `photoRowsOf(listing)` → two rows, both `unscreened` true. Through the service client, `listing_photo_reviews` of the listing, ordered by created_at (label, code, evidence, decided_at): ["fail", "not_a_photo", "fake mode: fixture marker width", null] and ["unsure", null, "fake mode: fixture marker width", null].
- As A (A's own token, a client with the publishable key): `listing_photo_reviews` of the listing → two rows. As seller B (a second lease): → zero rows.
- `objectsUnder(A, listing)` holds the objects of the two stored photos only (none of the refused one's: every key names one of the two photo ids).

SC-23 "SC-23 approving an ad shows its held photos only; a failed photo waits for its own decision (D178)" (e2e/admin-screening.spec.ts; `seedWaiting`, `findRow`, `rowMenu`, `useJobSuperAdmin`, `stepUpIfPrompted`, `heldTruth`, `approvedRows`, `buyerPhotoIds`)
- `seedWaiting()` (an ad in screening). Through the service client, three photos through the door `register_listing_photo` (p_paths `{ original: "e2e-sc/<rand>-<name>.webp" }`, width, height and bytes 1, as the stored rows need no file): "held" with `p_unscreened` true; "failed" with `p_unscreened` true and `p_review` `{ label: "fail", code: "weapon", evidence: "e2e" }`; "plain" with `p_unscreened` false.
- The job super admin approves the ad in the preview, as SC-18 does (open, Approve, confirm, `stepUpIfPrompted`), and sees en["admin.screening.approved"].
- Then: the listing is "active"; `heldTruth(held)` false; `heldTruth(failed)` true; `approvedRows(ad)` → one row, meta `{ count: 1, from: "screening", to: "active" }`; `buyerPhotoIds(ad)` → held and plain, sorted (never failed).
- Through the service client, `listing_photo_reviews` of the ad (photo_id, label, decision, decided_by): held → "held", "approved_with_ad", the super admin's id; failed → "fail", null, null.
- The ad's seller, signed in (a client with the seller's token): `rpc("admin_allow_listing_photo", { p_photo_id: failed })` → an error whose message is "permission denied"; `heldTruth(failed)` still true.
- `finally`: the file's own reaping (the ad's rows go with it).

After writing them: `node_modules/.bin/prettier --write e2e/photo-pipeline.spec.ts e2e/admin-screening.spec.ts`. No other test is edited.

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, dev cc64a2db with this turn's carrier files)
- Clean: typecheck (it covers e2e/), format, lint (0 errors, 33 warnings), 891 unit tests (154 files), the hardcoded-strings guard (0 findings), the build and the bundle budget.
- The migration on a local PostgreSQL 16 over stand-in tables holding the live definitions: applied cleanly, its proofs passed, with LF and with CRLF line endings. Behaviour: a fail stored hidden with its code and trimmed phrase; held, plain and not_right rows as written; nudity, a shown photo under review, a code on unsure and a non-object review refused, nothing stored; a move to live with no session approved nothing; a person's approval showed only the held photo and marked its review; allow refused without the permission and on one's own ad, then shown, decided and audited, and a second allow refused 'reviewGone'; a replaced or removed photo took its review with it; row security let the seller read his own rows, staff every row, another user none; the backfill gave today's held photo its row. Two tampered copies (the label rule granted to signed-in users; the trigger approving every label) were refused by P3 and P4.
- `scripts/check-migrations.sh` with this migration as a scratch file: every guard OK, "Migration guard OK".
- Not run by the supervisor: the browser tests (its sandbox cannot reach ethio-staging). CI on the final commit runs them.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-16-turn-4a.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines. Whatever it shows, go on: the CI read is the supervisor's. Do not stop on it. You cannot git-fetch that branch. Paste `git rev-parse HEAD`: this is <START>;
  2. step 0;
  3. the census (below), files and database. If any result differs from what it expects, STOP and report: write nothing else. One exception, known in advance: if the platform has regenerated src/routeTree.gen.ts since turn S2, name the difference and go on;
  4. the carrier, then the hashes;
  5. THE TESTS;
  6. the checks;
  7. the migration LAST, then its read-back;
  8. the report;
  9. END THE TURN.
  Do not stop between steps.
- The migration is the last thing written, because the database tool applies it on ethio-prod the moment it is saved. The operator will see the "Modify Supabase database" dialog and allow it. The published upload route keeps calling the doors with its eight named arguments, which the new signatures accept (`p_review` has a default), so nothing changes for any visitor or seller until the next Publish.
- The carrier's sections end with a newline each, blank lines included: write every section's bytes exactly as they stand between its header line and the next header. Check each written file's sha256 against the table before you go on.
- If any rule of yours conflicts with the text, STOP before saving and quote that rule's exact words in the report.
- Scope — these files only: the 11 paths of the hash table, the brief, e2e/photo-pipeline.spec.ts, e2e/admin-screening.spec.ts and the one new migration file (the database tool names it). The database: ethio-prod through your tools — SELECT only, except the migration itself. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-16-turn-4a.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 11 files → each equal to:
  f43501ae1d2b48a3ee8147e3d9b3dcbe787bf4f2fb682a662194fed87ca60236  docs/_changelog.md
  a19ea0aceebf199f1dd3e59efcd39a78d5a60433060531208fa65d4e99be913e  docs/features/media-pipeline.md
  68b41349ea2a334f61b23ce76c09a82150d55a9feb31d8bd82fdf096bf0fb541  e2e/helpers/pool-reset-map.ts
  0ece532ccb6b19bc2253dda64fc2d9764f3db632a5784462e0f51e5c47e0f85e  roadmap.md
  8bebe6f4fde88630c2767909cf7779bc2f5d5d12ff3e18515fb951ec5ff75851  scripts/public-surface-allowlist.txt
  b2843fe7d09f35d358722ab1a15cfb9c0c9c25bed921c781325306aa493bda2d  src/integrations/supabase/types.ts
  3683f4635680ac1de0754da9856da28c58be48ca58ffcdb7f72f68aa57977d04  src/routes/api/upload/photo.ts
  21b3046e1d7e970667fba4a21774d1a6aedc3ffd7739a220327b7b1297d7c1d8  src/server/media/hold.test.ts
  b13c28018846d4c4113c892d9cdab384934315905e9d551aa1fa332c0a39f54d  src/server/media/hold.ts
  67393dd82e6a1502707da60972c079619581acd2065e87dec7e39d582e0307e2  src/server/media/policy.test.ts
  5886867fdb650fc284308efd2999204a3373b0e5056b2de7c2e9af598652fe8a  src/server/media/policy.ts
- (c) `sha256sum e2e/photo-pipeline.spec.ts e2e/admin-screening.spec.ts` → 869af674c33ba7a383e5f4f470660cf78867ec105a4272f76d26b3c71bc46e72 and 9e8fa342f5ffbdce16cf5afed4f748f366e97502ab15dc4abbc580ba430a0cf4; `ls supabase/migrations | tail -1` → 20261015110000_ed5dcaf6-f56d-41f7-94d4-eb1a1bad15d0.sql (turn S2's file, saved by script; no migration since).
- (d) ethio-prod, your query tool (SELECT only):
  - `select max(version) from public.migration_marks;` → 20261016020000 (turn S2's mark: the operator applied S2's file on ethio-prod from GitHub; if it is not there, STOP);
  - turn S2's read-back: `select count(*) from public.blocked_email_domains;` → 9892; `select (select schedule from cron.job where jobname = 'rate-limits-prune'), has_function_privilege('supabase_auth_admin', 'public.hook_before_user_created(jsonb)', 'EXECUTE'), has_function_privilege('authenticated', 'public.hook_before_user_created(jsonb)', 'EXECUTE');` → 43 3 * * * | t | f;
  - `select md5(replace(prosrc, chr(13), '')) from pg_proc where oid = 'public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer, boolean, text[])'::regprocedure;` → 467b47c223738f65c4c0132fc198c793;
  - `select md5(replace(prosrc, chr(13), '')) from pg_proc where oid = 'public.replace_listing_photo(uuid, uuid, uuid, jsonb, integer, integer, integer, boolean, text[])'::regprocedure;` → 6f68316be1209f6d4c426bd039d65c21;
  - `select md5(replace(prosrc, chr(13), '')) from pg_proc where oid = 'public.listing_photos_approved_with_ad()'::regprocedure;` → 57a8e5a40056c16d217c67f9f6511a7b;
  - `select to_regclass('public.listing_photo_reviews') is null, to_regprocedure('public.admin_allow_listing_photo(uuid)') is null, to_regprocedure('public.listing_photo_review_label(boolean, jsonb)') is null;` → t | t | t.

THE CARRIER — B16T4A-TURN-CARRIER-2026-10-15.md (25,130 bytes; sha256 3e105e06e03aa68ecd85c76627094da108427a5b792a11eec383a188d1910e84; 39 sections)
- Its first line starts "B16T4A TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`. No blank line separates the sections.
- Modes:
  - REPLACE: the section is the whole file;
  - NEW: a new file; the section is the whole file;
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file;
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed. If your upload arrives under another name, match it by its size and sha256.

THE HASHES — `sha256sum` each of the 11 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  527a805e6e9b52ae33cb059a470f89d6f9ce1afc032a9ee4fc406238d6907155  docs/_changelog.md
  0ffde1eeefb09bad1a47a587d93290f4f7ad6e4208323976fad107cedcc181d1  docs/features/media-pipeline.md
  888c303aafb620d91065a1d55c13e4875cd1706c4113e10babbb1d33bf7ea433  e2e/helpers/pool-reset-map.ts
  9a7e6aa23bf87703ff5bfe31607eecdb2d8a1c5ad4d194f85b23c31a9ece19ab  roadmap.md
  e1a9f85390f4e6c7dbef5ffad7ba29d748d7037c3c2968c83ce9477411e64c56  scripts/public-surface-allowlist.txt
  4bd5190ea0e7069cfa39cc6e1adfc1c3fd7eb6a925bc9a8fd6f6ec487c94e6dd  src/integrations/supabase/types.ts
  bd086efd327bad52695dc977a0fedd79a6cec557e6a9423b689850db0adb4761  src/routes/api/upload/photo.ts
  df6665f8b53e1e2c8564c0423139785f77de8aef5aa00a5b1685f053afd30c12  src/server/media/hold.test.ts
  d9197d20eed3d460f816812740e4ce27126e52b69caa85b9ce83a20d0bebd420  src/server/media/hold.ts
  38d1ee4075bea6e52f607a8228ff5f4d52882907ef741dc9de0344141ae6b80a  src/server/media/policy.test.ts
  f2f7313d92124ff426ae6e53ebd64f935f3f1bee784dfa15c5fc0c79a00cf824  src/server/media/policy.ts

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings — a warning in your tests is fixed, not left;
- `bun run test:unit 2>&1 | tee /tmp/unit-b16t4a.log` — 891 passed (154 files);
- `bash scripts/check-hardcoded-strings.sh` "findings: 0";
- `grep -n 'test("PP-32\|test("SC-23' e2e/*.spec.ts` → two lines, each in its file;
- `git grep -n "made: \[11, 11\]" e2e/photo-pipeline.spec.ts` → at least three lines (PP-5, PP-26, PP-32);
- Not run by you: the typecheck, the build, the bundle budget and the browser tests. CI judges them.

THE BROWSER RUN — not this turn: the local browser does not start (INC-506). CI on the final commit runs every spec, yours included.

THE MIGRATION RULES (G39 — every one applies)
- The text is between the BEGIN and END lines of the appendix below. Write it EXACTLY, changing only `<MARK>` (its last line). Before the change, its sha256 is eb320d588ac232e9493bd5af51a40a4ce863a3fff001873eb46a6a4b9239c22a (27,448 bytes, 468 lines, ending with a newline).
- Check it in a scratch folder first (after the checks):
  - copy supabase/migrations/*.sql into a temporary folder;
  - add the text, its `<MARK>` replaced by the mark you will use, under the name 20261016030000_b16t4a-check.sql;
  - run `MIGRATIONS_DIR=<that folder> bash scripts/check-migrations.sh`.
  Paste its "guard OK" lines and "Migration guard OK".
- `<MARK>` is chosen at apply time:
  - read now() at time zone 'utc' on ethio-prod;
  - round it up to the next whole hour and add one hour (add twelve hours instead if the save dialog may wait);
  - if the result is below 20261016030000, use 20261016030000 (above 20261016020000, turn S2's mark, and equal to the scratch check's stamp);
  - the mark must also be later than the saved file's own stamp.
- Then hand the FINAL text to the database tool ONCE. Never a stub, a comment or a draft (INC-491).
- A clean apply is the proofs' pass: they RAISE EXCEPTION on any failure.

THE READ-BACK (ethio-prod, your query tool, SELECT only; paste each result)
- `select version from public.migration_marks where version = '<MARK>';` → one row;
- `select relrowsecurity from pg_class where oid = 'public.listing_photo_reviews'::regclass;` → t;
- `select to_regprocedure('public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer, boolean, text[], jsonb)') is not null, to_regprocedure('public.replace_listing_photo(uuid, uuid, uuid, jsonb, integer, integer, integer, boolean, text[], jsonb)') is not null, to_regprocedure('public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer, boolean, text[])') is null;` → t | t | t;
- `select (select count(*) from public.listing_photos where unscreened) = (select count(*) from public.listing_photo_reviews where label = 'held' and decided_at is null);` → t (the backfill; no upload has stored a judged photo yet, since the published route is unchanged until Publish).

THE REPORT
- Done or not done, by step.
- The six ci-status lines, and <START>.
- The census results (a)–(d).
- The 11 sha256sum lines and the brief's; the sha256sum and line count of each of the two test files, and `git diff <START> -- e2e/`.
- `git diff --name-only <START>` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only <START> HEAD` too. Expect the 11 paths, the brief, the two test files and the one migration file.
- The checks.
- The check-migrations "guard OK" lines; the mark and the now() reading it came from; the apply outcome; the read-back.
- The line "apply <uuid-fragment of the migration's filename> → expect mark <MARK>", for the operator's staging apply.
- In this report ONLY (never in a file — the repository is public): from the database tool's security warnings, each NEW warning, and the total count.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only). The database change is undone only by a new migration — never by editing this file.

AFTER THIS TURN (for the operator), in this order:
1. Apply the migration on ethio-staging: open the new migration file on GitHub (Raw), paste it into the ethio-staging SQL editor and run it; read back its mark with the line the report gives.
2. If CI's run has already failed at the preflight, use "Re-run failed jobs".
3. Bring the supervisor Lovable's report. The next prompt (turn 4b, the screens) comes back at once: send it to Lovable as soon as you have it. Do not wait for CI (DEC-181).
4. Do not Publish between turn 4a and turn 4b: publish once, after 4b, when the supervisor says the newest commit is green and Lovable is idle.

APPENDIX — THE MIGRATION (between the BEGIN and END lines; not including them)
-----BEGIN B16T4A MIGRATION-----
-- Bundle 16 turn 4a (2026-10-15). Tier A. D178 and D183 (the operator, 2026-10-14 and 2026-10-15) — EVERY PHOTO IS
-- JUDGED AT UPLOAD, AND ONLY A PASS IS SHOWN. A photo the screen passes with no doubt is shown at once. A photo it is
-- unsure about, one that may not show what the ad sells, one it fails (except nudity, which stays refused at upload and
-- is never stored, and a smaller copy that shows another picture), and one stored while photo screening is off, is kept
-- HIDDEN from buyers (`unscreened`) for a person, who allows it, removes it, or declines the whole ad. The ad's other
-- content stays live.
--
-- A. listing_photo_reviews (NEW): one row per photo kept hidden for a person — its label (unsure, not_right, fail,
--    held), for a fail the screen's code and its short phrase, and once a person decides, when, who and how (allowed,
--    or approved with the ad). Row security: the seller reads his own photos' rows, staff with listings:review read
--    every row, nobody else reads any; no browser role writes. Rows are written only by the doors below. A row goes with
--    its photo and with its ad (ON DELETE CASCADE): a removed photo leaves no open review.
-- B. listing_photo_review_label (NEW, caller's rights, no table read): the one rule for what the photo doors accept —
--    a review is stored hidden; its label is unsure, not_right or fail; a fail names one of the eight stored codes
--    (never nudity, never variant_mismatch: D183); a photo stored hidden with no review is `held`. Service only.
-- C. register_listing_photo, redeclared whole from its live definition (20261014084432; census (d)) with `p_review`
--    (default none): the review row. The eight-argument signature is dropped and its grants are restated for the nine.
-- D. replace_listing_photo, redeclared whole from its live definition (20261014084432; census (d)) with `p_review`.
--    The nine-argument signature is dropped and its grants are restated for the ten.
-- E. listing_photos_approved_with_ad, redeclared whole from its live definition (20261014022725; census (d)):
--    approving the ad shows only the photos held while screening was off (label held, or no review row: a photo held
--    before this migration), and marks their reviews decided; a photo the screen judged stays hidden.
-- F. admin_allow_listing_photo (NEW): listings:review with the second factor (as approving an ad); never the staff
--    member's own ad; a photo with an open review only. Shows the photo, marks its review allowed, audits
--    `listing.photo_allowed`. Removing a photo stays the existing staff Remove (admin_edit_listing, reason photo).
-- G. Backfill: every photo held today (`unscreened`, stored while screening was off) gets a `held` row.
-- H. Proofs (structure, body markers, policies, grants; RAISE EXCEPTION on any failure). No proof touches a real row or
--    auth.users. What the doors write is proven by the routes' own tests through the app's connection.

-- ===== A — listing_photo_reviews =====
CREATE TABLE IF NOT EXISTS public.listing_photo_reviews (
  photo_id    uuid PRIMARY KEY REFERENCES public.listing_photos(id) ON DELETE CASCADE,
  listing_id  uuid NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
  label       text NOT NULL CHECK (label IN ('unsure', 'not_right', 'fail', 'held')),
  code        text NULL,
  evidence    text NULL CHECK (evidence IS NULL OR char_length(evidence) <= 200),
  created_at  timestamptz NOT NULL DEFAULT now(),
  decided_at  timestamptz NULL,
  decided_by  uuid NULL,
  decision    text NULL CHECK (decision IN ('allowed', 'approved_with_ad')),
  CONSTRAINT listing_photo_reviews_code_check CHECK (
    (label = 'fail' AND code IN ('violence', 'weapon', 'drugs', 'hate_symbol', 'personal_document',
                                 'contact_in_image', 'stock_watermark', 'not_a_photo'))
    OR (label <> 'fail' AND code IS NULL)),
  CONSTRAINT listing_photo_reviews_decided_check CHECK ((decided_at IS NULL) = (decision IS NULL))
);
CREATE INDEX IF NOT EXISTS listing_photo_reviews_open_idx
  ON public.listing_photo_reviews (created_at) WHERE decided_at IS NULL;
CREATE INDEX IF NOT EXISTS listing_photo_reviews_listing_idx ON public.listing_photo_reviews (listing_id);
ALTER TABLE public.listing_photo_reviews ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.listing_photo_reviews FROM PUBLIC, anon, authenticated;
GRANT SELECT ON public.listing_photo_reviews TO authenticated;
GRANT ALL ON public.listing_photo_reviews TO service_role;
DROP POLICY IF EXISTS listing_photo_reviews_seller_read ON public.listing_photo_reviews;
CREATE POLICY listing_photo_reviews_seller_read ON public.listing_photo_reviews
  FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.listings l
                 WHERE l.id = listing_photo_reviews.listing_id AND l.seller_id = auth.uid()));
DROP POLICY IF EXISTS listing_photo_reviews_admin_read ON public.listing_photo_reviews;
CREATE POLICY listing_photo_reviews_admin_read ON public.listing_photo_reviews
  FOR SELECT TO authenticated
  USING (public.has_permission(auth.uid(), 'listings', 'review'));

-- ===== B — the one rule for a stored photo's review =====
CREATE OR REPLACE FUNCTION public.listing_photo_review_label(p_unscreened boolean, p_review jsonb)
RETURNS text
LANGUAGE plpgsql
IMMUTABLE
SECURITY INVOKER
SET search_path TO 'public'
AS $$
DECLARE v_label text; v_code text;
BEGIN
  IF p_review IS NULL OR p_review = 'null'::jsonb THEN
    -- D158 — stored hidden while photo screening is off: held for staff, approved with the ad.
    RETURN CASE WHEN coalesce(p_unscreened, false) THEN 'held' END;
  END IF;
  IF jsonb_typeof(p_review) <> 'object' THEN
    RAISE EXCEPTION 'review must be an object';
  END IF;
  IF NOT coalesce(p_unscreened, false) THEN
    RAISE EXCEPTION 'a photo kept for review is stored hidden';
  END IF;
  v_label := p_review->>'label';
  v_code := p_review->>'code';
  IF v_label IS NULL OR v_label NOT IN ('unsure', 'not_right', 'fail') THEN
    RAISE EXCEPTION 'unknown review label';
  END IF;
  -- D183 — nudity is refused at upload and never stored; a smaller copy showing another picture is
  -- refused too. A fail names one of the eight codes a person may still allow.
  IF v_label = 'fail' AND (v_code IS NULL OR v_code NOT IN ('violence', 'weapon', 'drugs', 'hate_symbol',
      'personal_document', 'contact_in_image', 'stock_watermark', 'not_a_photo')) THEN
    RAISE EXCEPTION 'a failed photo with this code is not stored';
  END IF;
  IF v_label <> 'fail' AND v_code IS NOT NULL THEN
    RAISE EXCEPTION 'only a failed photo carries a code';
  END IF;
  RETURN v_label;
END $$;

REVOKE ALL ON FUNCTION public.listing_photo_review_label(boolean, jsonb) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.listing_photo_review_label(boolean, jsonb) TO service_role;

-- ===== C — register_listing_photo, whole, with p_review =====
DROP FUNCTION IF EXISTS public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer, boolean, text[]);

CREATE OR REPLACE FUNCTION public.register_listing_photo(
  p_listing_id uuid,
  p_photo_id uuid,
  p_paths jsonb,
  p_width integer,
  p_height integer,
  p_bytes integer,
  p_unscreened boolean DEFAULT false,
  p_warnings text[] DEFAULT '{}'::text[],
  p_review jsonb DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE v_order int; v_path text; v_seller uuid; v_status text; v_cap smallint; v_count int; v_label text;
BEGIN
  -- Service-only: the strip route is the sole writer, because only it can
  -- attest that the EXIF was removed.
  IF auth.uid() IS NOT NULL THEN
    RAISE EXCEPTION 'register_listing_photo is called by the photo route only';
  END IF;
  -- Bundle 16 turn 4a (D178, D183) — a photo kept for a person's review is stored hidden.
  v_label := public.listing_photo_review_label(p_unscreened, p_review);
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
  -- Bundle 16 turn 4a (D178) — the photo's review: why it is hidden, until a person decides.
  IF v_label IS NOT NULL THEN
    INSERT INTO public.listing_photo_reviews (photo_id, listing_id, label, code, evidence)
    VALUES (p_photo_id, p_listing_id, v_label, p_review->>'code',
            left(nullif(btrim(coalesce(p_review->>'evidence', '')), ''), 200));
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

REVOKE ALL ON FUNCTION public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer, boolean, text[], jsonb) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer, boolean, text[], jsonb) TO service_role;

-- ===== D — replace_listing_photo, whole, with p_review =====
DROP FUNCTION IF EXISTS public.replace_listing_photo(uuid, uuid, uuid, jsonb, integer, integer, integer, boolean, text[]);

CREATE OR REPLACE FUNCTION public.replace_listing_photo(
  p_listing_id uuid,
  p_old_photo_id uuid,
  p_photo_id uuid,
  p_paths jsonb,
  p_width integer,
  p_height integer,
  p_bytes integer,
  p_unscreened boolean DEFAULT false,
  p_warnings text[] DEFAULT '{}'::text[],
  p_review jsonb DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE v_order int; v_path text; v_cover uuid; v_status text; v_label text;
BEGIN
  -- Service-only: the strip route is the sole writer, because only it can
  -- attest that the EXIF was removed.
  IF auth.uid() IS NOT NULL THEN
    RAISE EXCEPTION 'replace_listing_photo is called by the photo route only';
  END IF;
  -- Bundle 16 turn 4a (D178, D183) — a photo kept for a person's review is stored hidden.
  v_label := public.listing_photo_review_label(p_unscreened, p_review);
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
  -- Bundle 16 turn 4a (D178) — the photo's review: why it is hidden, until a person decides.
  IF v_label IS NOT NULL THEN
    INSERT INTO public.listing_photo_reviews (photo_id, listing_id, label, code, evidence)
    VALUES (p_photo_id, p_listing_id, v_label, p_review->>'code',
            left(nullif(btrim(coalesce(p_review->>'evidence', '')), ''), 200));
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

REVOKE ALL ON FUNCTION public.replace_listing_photo(uuid, uuid, uuid, jsonb, integer, integer, integer, boolean, text[], jsonb) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.replace_listing_photo(uuid, uuid, uuid, jsonb, integer, integer, integer, boolean, text[], jsonb) TO service_role;

-- ===== E — the approval trigger's function, whole: only held photos are approved with the ad =====
CREATE OR REPLACE FUNCTION public.listing_photos_approved_with_ad()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $fn$
DECLARE v_n integer;
BEGIN
  -- D158 — staff approve held photos with the ad: a person's decision only. A move with no
  -- session (a service caller) leaves them held.
  IF auth.uid() IS NULL THEN
    RETURN NULL;
  END IF;
  -- Bundle 16 turn 4a (D178) — only a photo held while photo screening was off is approved with the
  -- ad. A photo the screen judged (unsure, not right for the ad, failed) stays hidden until a person
  -- allows or removes it (admin_allow_listing_photo; Remove).
  UPDATE public.listing_photos p SET unscreened = false
   WHERE p.listing_id = NEW.id AND p.unscreened
     AND NOT EXISTS (SELECT 1 FROM public.listing_photo_reviews r
                      WHERE r.photo_id = p.id AND r.decided_at IS NULL AND r.label <> 'held');
  GET DIAGNOSTICS v_n = ROW_COUNT;
  UPDATE public.listing_photo_reviews SET decided_at = now(), decided_by = auth.uid(), decision = 'approved_with_ad'
   WHERE listing_id = NEW.id AND label = 'held' AND decided_at IS NULL;
  IF v_n > 0 THEN
    INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
    VALUES (auth.uid(), 'listing.photos_approved', 'listing', NEW.id::text,
            jsonb_build_object('count', v_n, 'from', OLD.status, 'to', NEW.status));
  END IF;
  RETURN NULL;
END $fn$;

REVOKE ALL ON FUNCTION public.listing_photos_approved_with_ad() FROM PUBLIC, anon, authenticated;

-- ===== F — admin_allow_listing_photo =====
CREATE OR REPLACE FUNCTION public.admin_allow_listing_photo(p_photo_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE v_uid uuid := auth.uid(); v_listing uuid; v_seller uuid; v_label text; v_code text;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not signed in'; END IF;
  IF NOT public.has_permission(v_uid, 'listings', 'review') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  IF EXISTS (SELECT 1 FROM public.profiles WHERE user_id = v_uid AND account_status = 'deactivated') THEN
    RAISE EXCEPTION 'account is deactivated';
  END IF;
  -- D178 — showing a photo the screen held back is a person's decision, made as an ad's approval is.
  PERFORM public.require_step_up_if_needed('listings', 'review');
  SELECT r.listing_id, r.label, r.code INTO v_listing, v_label, v_code
    FROM public.listing_photo_reviews r
   WHERE r.photo_id = p_photo_id AND r.decided_at IS NULL
   FOR UPDATE;
  IF v_listing IS NULL THEN
    RAISE EXCEPTION 'reviewGone';
  END IF;
  SELECT seller_id INTO v_seller FROM public.listings WHERE id = v_listing;
  IF v_seller = v_uid THEN
    RAISE EXCEPTION 'your own listing is changed the seller''s way';
  END IF;
  UPDATE public.listing_photos SET unscreened = false WHERE id = p_photo_id AND listing_id = v_listing;
  UPDATE public.listing_photo_reviews SET decided_at = now(), decided_by = v_uid, decision = 'allowed'
   WHERE photo_id = p_photo_id;
  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
  VALUES (v_uid, 'listing.photo_allowed', 'listing', v_listing::text,
          jsonb_strip_nulls(jsonb_build_object('photo', p_photo_id, 'label', v_label, 'code', v_code)));
  RETURN jsonb_build_object('ok', true, 'photo', p_photo_id, 'listing', v_listing);
END $$;

REVOKE ALL ON FUNCTION public.admin_allow_listing_photo(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_allow_listing_photo(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.admin_allow_listing_photo(uuid) TO service_role;

-- ===== G — backfill: every photo held today is held for staff =====
INSERT INTO public.listing_photo_reviews (photo_id, listing_id, label)
SELECT p.id, p.listing_id, 'held' FROM public.listing_photos p
 WHERE p.unscreened
ON CONFLICT (photo_id) DO NOTHING;

-- ===== H — proofs =====
DO $proof$
DECLARE
  v_src text;
  v_n   integer;
  v_m   text;
BEGIN
  -- P1 — the table: row security, its two read policies, no browser write, anon reads nothing.
  SELECT count(*) INTO v_n FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace
   WHERE n.nspname = 'public' AND c.relname = 'listing_photo_reviews' AND c.relrowsecurity;
  IF v_n <> 1 THEN RAISE EXCEPTION 'B16T4a P1: listing_photo_reviews is missing or has no row security'; END IF;
  SELECT count(*) INTO v_n FROM pg_policy
   WHERE polrelid = 'public.listing_photo_reviews'::regclass AND polcmd = 'r'
     AND ((polname = 'listing_photo_reviews_seller_read'
           AND pg_get_expr(polqual, polrelid) LIKE '%seller_id = auth.uid()%')
       OR (polname = 'listing_photo_reviews_admin_read'
           AND pg_get_expr(polqual, polrelid) LIKE '%''listings''%''review''%'));
  IF v_n <> 2 THEN RAISE EXCEPTION 'B16T4a P1: the reviews table''s two read policies are not as written'; END IF;
  SELECT count(*) INTO v_n FROM pg_policy WHERE polrelid = 'public.listing_photo_reviews'::regclass;
  IF v_n <> 2 THEN RAISE EXCEPTION 'B16T4a P1: the reviews table has % policies, not 2', v_n; END IF;
  IF has_table_privilege('anon', 'public.listing_photo_reviews', 'SELECT')
     OR has_table_privilege('authenticated', 'public.listing_photo_reviews', 'INSERT')
     OR has_table_privilege('authenticated', 'public.listing_photo_reviews', 'UPDATE')
     OR has_table_privilege('authenticated', 'public.listing_photo_reviews', 'DELETE') THEN
    RAISE EXCEPTION 'B16T4a P1: a browser role can read the reviews without a session, or write them';
  END IF;

  -- P2 — the label rule answers as written (no table is read).
  IF public.listing_photo_review_label(false, NULL) IS NOT NULL
     OR public.listing_photo_review_label(true, NULL) <> 'held'
     OR public.listing_photo_review_label(true, '{"label":"unsure"}') <> 'unsure'
     OR public.listing_photo_review_label(true, '{"label":"not_right"}') <> 'not_right'
     OR public.listing_photo_review_label(true, '{"label":"fail","code":"weapon","evidence":"a knife"}') <> 'fail' THEN
    RAISE EXCEPTION 'B16T4a P2: a stored review is not labelled as written';
  END IF;
  BEGIN
    PERFORM public.listing_photo_review_label(true, '{"label":"fail","code":"nudity"}');
    RAISE EXCEPTION 'B16T4a P2: a nudity fail would be stored';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_m = MESSAGE_TEXT;
    IF v_m <> 'a failed photo with this code is not stored' THEN RAISE EXCEPTION '%', v_m; END IF;
  END;
  BEGIN
    PERFORM public.listing_photo_review_label(true, '{"label":"fail","code":"variant_mismatch"}');
    RAISE EXCEPTION 'B16T4a P2: a mismatched copy would be stored';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_m = MESSAGE_TEXT;
    IF v_m <> 'a failed photo with this code is not stored' THEN RAISE EXCEPTION '%', v_m; END IF;
  END;
  BEGIN
    PERFORM public.listing_photo_review_label(false, '{"label":"unsure"}');
    RAISE EXCEPTION 'B16T4a P2: a photo under review would be shown';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_m = MESSAGE_TEXT;
    IF v_m <> 'a photo kept for review is stored hidden' THEN RAISE EXCEPTION '%', v_m; END IF;
  END;
  BEGIN
    PERFORM public.listing_photo_review_label(true, '{"label":"pass"}');
    RAISE EXCEPTION 'B16T4a P2: an unknown label would be stored';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_m = MESSAGE_TEXT;
    IF v_m <> 'unknown review label' THEN RAISE EXCEPTION '%', v_m; END IF;
  END;

  -- P3 — the photo doors: the old signatures gone, the bodies carry the rule and the row, service only.
  IF to_regprocedure('public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer, boolean, text[])') IS NOT NULL
     OR to_regprocedure('public.replace_listing_photo(uuid, uuid, uuid, jsonb, integer, integer, integer, boolean, text[])') IS NOT NULL THEN
    RAISE EXCEPTION 'B16T4a P3: an old photo door signature is still there';
  END IF;
  SELECT prosrc INTO v_src FROM pg_proc
   WHERE oid = 'public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer, boolean, text[], jsonb)'::regprocedure
     AND prosecdef AND provolatile = 'v' AND proconfig = ARRAY['search_path=public'];
  IF v_src IS NULL OR v_src NOT LIKE '%register_listing_photo is called by the photo route only%'
     OR v_src NOT LIKE '%listing_photo_review_label(p_unscreened, p_review)%'
     OR v_src NOT LIKE '%INSERT INTO public.listing_photo_reviews%'
     OR v_src NOT LIKE '%INSERT INTO public.listing_photo_warnings%' OR v_src NOT LIKE '%tooManyPhotos%' THEN
    RAISE EXCEPTION 'B16T4a P3: the body of register_listing_photo is not as written';
  END IF;
  SELECT prosrc INTO v_src FROM pg_proc
   WHERE oid = 'public.replace_listing_photo(uuid, uuid, uuid, jsonb, integer, integer, integer, boolean, text[], jsonb)'::regprocedure
     AND prosecdef AND provolatile = 'v' AND proconfig = ARRAY['search_path=public'];
  IF v_src IS NULL OR v_src NOT LIKE '%replace_listing_photo is called by the photo route only%'
     OR v_src NOT LIKE '%listing_photo_review_label(p_unscreened, p_review)%'
     OR v_src NOT LIKE '%INSERT INTO public.listing_photo_reviews%'
     OR v_src NOT LIKE '%RAISE EXCEPTION ''photoGone''%' OR v_src NOT LIKE '%FOR UPDATE%' THEN
    RAISE EXCEPTION 'B16T4a P3: the body of replace_listing_photo is not as written';
  END IF;
  IF has_function_privilege('authenticated', 'public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer, boolean, text[], jsonb)', 'EXECUTE')
     OR has_function_privilege('anon', 'public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer, boolean, text[], jsonb)', 'EXECUTE')
     OR NOT has_function_privilege('service_role', 'public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer, boolean, text[], jsonb)', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.replace_listing_photo(uuid, uuid, uuid, jsonb, integer, integer, integer, boolean, text[], jsonb)', 'EXECUTE')
     OR has_function_privilege('anon', 'public.replace_listing_photo(uuid, uuid, uuid, jsonb, integer, integer, integer, boolean, text[], jsonb)', 'EXECUTE')
     OR NOT has_function_privilege('service_role', 'public.replace_listing_photo(uuid, uuid, uuid, jsonb, integer, integer, integer, boolean, text[], jsonb)', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.listing_photo_review_label(boolean, jsonb)', 'EXECUTE')
     OR has_function_privilege('anon', 'public.listing_photo_review_label(boolean, jsonb)', 'EXECUTE') THEN
    RAISE EXCEPTION 'B16T4a P3: a photo door or the label rule is not the service role''s alone';
  END IF;

  -- P4 — approving the ad approves only held photos.
  SELECT prosrc INTO v_src FROM pg_proc
   WHERE oid = 'public.listing_photos_approved_with_ad()'::regprocedure
     AND prosecdef AND proconfig = ARRAY['search_path=public'];
  IF v_src IS NULL OR v_src NOT LIKE '%r.label <> ''held''%' OR v_src NOT LIKE '%''approved_with_ad''%'
     OR v_src NOT LIKE '%''listing.photos_approved''%' OR v_src NOT LIKE '%IF auth.uid() IS NULL THEN%' THEN
    RAISE EXCEPTION 'B16T4a P4: the body of listing_photos_approved_with_ad is not as written';
  END IF;
  SELECT count(*) INTO v_n FROM pg_trigger
   WHERE tgrelid = 'public.listings'::regclass AND tgname = 'listing_photos_approved_with_ad' AND NOT tgisinternal;
  IF v_n <> 1 THEN RAISE EXCEPTION 'B16T4a P4: the approval trigger is missing'; END IF;

  -- P5 — the staff door: a reviewer with the second factor, never his own ad, audited; signed-in callers only.
  SELECT prosrc INTO v_src FROM pg_proc
   WHERE oid = 'public.admin_allow_listing_photo(uuid)'::regprocedure
     AND prosecdef AND provolatile = 'v' AND proconfig = ARRAY['search_path=public'];
  IF v_src IS NULL OR v_src NOT LIKE '%has_permission(v_uid, ''listings'', ''review'')%'
     OR v_src NOT LIKE '%require_step_up_if_needed(''listings'', ''review'')%'
     OR v_src NOT LIKE '%your own listing is changed the seller''''s way%'
     OR v_src NOT LIKE '%r.decided_at IS NULL%' OR v_src NOT LIKE '%''listing.photo_allowed''%' THEN
    RAISE EXCEPTION 'B16T4a P5: the body of admin_allow_listing_photo is not as written';
  END IF;
  IF has_function_privilege('anon', 'public.admin_allow_listing_photo(uuid)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.admin_allow_listing_photo(uuid)', 'EXECUTE') THEN
    RAISE EXCEPTION 'B16T4a P5: admin_allow_listing_photo''s grants are not as written';
  END IF;
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('<MARK>') ON CONFLICT (version) DO NOTHING;
-----END B16T4A MIGRATION-----
```
