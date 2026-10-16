# Bundle 17 — turn 4: the header during the status read, Back discards, a closed ad's tick, the days left as built (INC-667, INC-668, C15, INC-666, D195): brief, version 1 (saved unchanged, 2026-10-16)

```text
BUNDLE 17 — TURN 4 (2026-10-16). ONE TURN: CODE BY CARRIER, ONE MIGRATION, ONE TEST CHANGED AND TWO WRITTEN BY YOU, ONE TEST HELPER ORDERED. No new string. No package change. No file deleted. The first item is the fix of run 960's red board (INC-667: 28 of its 35 red attempts).
Base: dev d0644eef (turn 3b). The census below proves every file by content. This file is public: it is written as build instructions.
Tier A: the auth shell (INC-667, INC-668); the migration (a seller door's status list). Tier B: the Edit's Back; the tests.

ANSWERS TO THE LAST TURN
- Turn 3b is verified on dev d0644eef ("Applied Turn 3b fixes"): the three manifest lines verbatim, AL-20 with its two revisions and two notices, AL-21 the title typed back, SC-25's notice assertion gone, MLA-13's Tab before the clearing check, the [auth-dump] in `signIn` (names only, the same error rethrown) — all as asked. Your "not foreseen": right on both counts — `noticeRows` gets its sort order in this turn (test 2 below), and the dump's fallback is accepted.
- Run 960 (d0644eef) was RED, read whole by the supervisor: the build job green (the manifest line took), AL-20, AL-21, SC-25 and MLA-13 green; 28 red attempts of 14 tests at `signIn` with the dump — it named the page (the WHY block: INC-667, the fix is this turn's first item; no test helper changes); MLP-3 red at its second sign-out — INC-668, the same class, fixed in this turn; SC-26 red on shard 1 (the queue's row still on the page after the Reject: the queue was not re-read on return) — fixed in this turn (the screening page re-reads the queue when it returns with `decided` or `open`); PW-17 passed on retry on "[e2e:seller] confirming profiles failed: undefined" (a fixture's transport error, watched); CT-18 passed on retry (INC-497, watched). Nothing of 3b's work is open.

WHY THIS TURN
- INC-667 (run 960's [auth-dump], read by the supervisor — FIRST): the red board since turn 1. Every dump reads the same: when `signIn` asked for /auth, the page was HOME, SIGNED IN, with the previous persona's session still in storage. The chain: `switchUser` (e2e/helpers/ui.ts) waits until the header shows the account menu OR the "Sign in" link and signs out only when it saw the menu; the header (app-header.tsx) rendered "Sign in" whenever the user was not set — INCLUDING while the session was still being read — and turn 1's INC-661 hold (use-auth.ts) keeps the user unset until the profile read answers; so on every full load of a signed-in tab the header showed "Sign in" for the length of that read (a signed-in person saw it flash on each load since turn 1), the helper read it as signed out, skipped the sign-out, and the next sign-in reached /auth with a session, which sends it home. The bottom bar already renders nothing while the session is read ("never the signed-out set flashing", bottom-bar.tsx); the header now follows that rule: nothing in its auth slot while `authLoading`. The test helper is unchanged: with the link absent during the read, it waits for the menu.
- INC-668 (MLP-3, red since turn 1 — the same class, its second reader): the shell's live guard (app-shell.tsx) evacuated /account and /my-listings on a sign-out only when it had already rendered a user; the hold delays that user, so a sign-out that landed during the read was taken for a fresh signed-out visit (INC-627's rule) and the tab stood on /account. `useAuth` now exposes `hadSession`, true from the first auth event that carries a user, before the read answers; the guard reads it.
- C15 (the supervisor, from run 958's AL-21 — listed to the operator; his paste approves it): in the Edit, a step left by Back kept what was typed on it, so the Review could show words the ad does not hold and a step opened again started from an unsaved value. Back now DISCARDS the step's typed answers (the fields go back to the ad as saved, the step's refusals clear); only Save changes writes.
- INC-666 (found in turn 2's build): `set_listing_photos_soon` refuses a closed ad while its sibling doors take one (INC-631: the photo routes; E2a: `set_listing_pin`) — the third door of the class. The door gains `closed`; the wizard draws the "Photos coming soon" tick on a closed ad again (turn 2 hid it).
- D195 (the operator, 2026-10-16): the days until expiry wherever the seller sees his live ad — read in the code: the ad's page already draws the list's state line (`my-listing-state`: "Days left: N" / "Ends today" / "No end date", state-line.ts) under the status, and the list's rows and phone cards draw the same line; nothing is built, the docs say so. A draft's "removed in N days" waits for D14's purge (not in bundle 17, C6).

WHAT THIS TURN BUILDS (the carrier)
- src/features/auth/use-auth.ts — `hadSession` (INC-668): set from the session event, before the INC-661 hold; returned beside `user` and `loading`.
- src/components/app-shell.tsx — the live guard evacuates /account and /my-listings on `hadSession` (the `hadUser` ref removed).
- src/components/shell/app-header.tsx — the auth slot renders nothing while `authLoading` (INC-667); the account menu and the "Sign in" link are otherwise unchanged.
- docs/features/admin-users.md and docs/features/admin-shell.md — a later word each (INC-667, INC-668).
- src/features/posting/use-edit-draft.ts — `discard(step)`: the step's fields back to the baseline (the ad as the door holds it), the place lines for step 6, the step's refusals cleared, the save state idle.
- src/features/posting/wizard.tsx — in edit mode Back and "Back to review" call `discard` before returning to the Review; the photos-soon tick is drawn on every editable ad (the turn-2 guard on `closed` removed).
- src/features/posting/use-edit-draft.test.ts — EW-6 (the supervisor's unit test of `discard`).
- docs/features/my-listings.md (a section), the changelog, roadmap.md (line 3 and the bundle-17 block: turns 3b and 4 ticked; turn 5 = D193 with its census; INC-657 and INC-667 as open lines).
- The usage maps are NOT in the carrier and do not change (no key change): `bun run i18n:map-guard` proves it.
- THE MIGRATION (the appendix; written LAST in the turn, after the tests and the checks — the platform applies it on save, G35): `set_listing_photos_soon` redeclared whole from its live definition with `closed` in its status list, grants restated, proofs P1–P3 on no real row (the body's marker and header; the grants; no session refused). The allowlist line is unchanged (the door is already listed).

THE TESTS (yours; Claude writes none; by hand):
1. e2e/admin-listings.spec.ts, AL-21: the "nothing changed" part reads the discard now — after the contact-in-text refusal, `post-back` → `post-review`; Edit on data-step 5 again → `post-title` holds `live.title` (assert `toHaveValue(live.title)`: the refused text is gone, C15); then `post-next` with nothing typed → `post-review`, `post-edit-notice` `data-shown` "false", the revision count unchanged. Remove turn 3b's lines that typed the title back. Nothing else in AL-21 changes.
2. e2e/admin-listings.spec.ts, `noticeRows`: add `.order("created_at", { ascending: true })` to its query (seller_notices has `created_at`; the two-row order was unspecified in AL-20's expectation).
3. e2e/auth-signout.spec.ts — a new test after SO-9: "SO-10 a signed-in tab's reload never shows the Sign in link before the account menu (INC-667)": sign in a scratch user through the form (`signIn`), `page.reload()`, then sample every 50 ms until the account menu (`account-menu`) is visible (at most 15 s): at no sample is the header's "Sign in" link present (`page.getByRole("link", { name: en["auth.signIn"] })` count 0 — on mobile-360 the link is in the DOM when it renders, hidden by CSS, so count it, do not test visibility); then the account menu is visible. Both projects. SO-9 stays as it is: it is INC-661's proof and must stay green (the menu never shows for a deactivated account).
4. e2e/my-listings-ad.spec.ts — a new test after MLA-15: "MLA-16 a closed ad's Edit offers Photos coming soon; the tick saves and clears through the door (INC-666)": seed a CLOSED ad X of the seller (`seed(seller, "closed")`, as the file seeds live ads), sign in, open its page, Edit → /my-listings/<X>/edit, `post-review`; Edit on data-step 2 → `post-step-2` → the tick `post-photos-soon` visible (the ad has no photo); `tick.check()` → poll the service read of `listings.photos_soon` for X to `true` (as PW-141 polls it, e2e/post-wizard-category.spec.ts :582–594); `tick.uncheck()` → polled back to `false`; then `revisionRows`-style read: two `edit` revisions on X whose `after` carries `photos_soon` (true, then false) — read `listing_revisions` with the service client as the file's helpers do. Both projects.
RULE: a test never locates a real row by page position (G28); every fixture is scratch (G27); nothing in a test touches a real account.

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- C15 Back on a step of the Edit discards what was typed on it; Save changes is the only way a change leaves the step.
- C16 D195 is recorded as built (the state line on the ad's page and the list); no new countdown until D14's purge exists.
- C17 D193 (Next closed until the step's required answers are present) is turn 5, on its own: it reaches about twelve posting tests that provoke a `required` refusal through Next, each re-described — sized by its tests (G37), it is not folded into this turn. ESTIMATE for the bundle: one more build turn (turn 5), then the close.
- INC-667's fix follows the bottom bar's existing rule (nothing while the session is read) rather than a new "loading" look for the header: the slot is empty for the length of one profile read.

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, dev d0644eef with this turn's carrier files)
- Clean: typecheck, format, lint (0 errors, 33 warnings), 932 unit tests (161 files), the usage maps unchanged (map guard), the hardcoded-strings guard (0 findings); the migration text in a scratch folder through scripts/check-migrations.sh — every guard OK; the carrier split on a clean copy of the base: the tree equals the supervisor's file for file.
- Not run by the supervisor: the browser tests; the migration against a database (its apply is yours, on ethio-prod; the operator's on ethio-staging).

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-17-turn-4.md (roadmap.md line 3 comes from the carrier).

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines. Whatever it shows, go on: the CI read is the supervisor's. Do not stop on it. You cannot git-fetch that branch. Paste `git rev-parse HEAD`: this is <START>;
  2. step 0;
  3. the census (below), files and database. If any result differs from what it expects, STOP and report: write nothing else. One exception, known in advance: if the platform has regenerated src/routeTree.gen.ts or src/integrations/supabase/types.ts since the base, name the difference and go on (neither is in this turn's carrier);
  4. the carrier, then the hashes;
  5. the tests (1–4 above), by hand;
  6. the checks;
  7. the migration: the scratch check, the mark, the apply (the "Modify Supabase database" dialog: the operator allows it), the read-back;
  8. the report (the migration's stop lines included);
  9. END THE TURN.
  Do not stop between steps. The migration is the LAST file written: it is live on ethio-prod the moment it is saved.
- The carrier's sections end with a newline each, blank lines included: write every section's bytes exactly as they stand between its header line and the next header, reading each file whole before any file is opened for writing. Check each written file's sha256 against the table before you go on.
- If any rule of yours conflicts with the text, STOP before saving and quote that rule's exact words in the report.
- Scope — these files only: the 12 paths of the hash table, the brief, e2e/admin-listings.spec.ts, e2e/auth-signout.spec.ts and e2e/my-listings-ad.spec.ts (the tests), and the one new migration file. The database: the one migration, on ethio-prod, through your tool. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.
- THE BROWSER RUN — not this turn: the local browser does not start (INC-506). CI on the final commit runs every spec, SO-10 and MLA-16 included; the supervisor reads the 14 tests of INC-667's class (AT-1, AS-1, CO-1, CV-1, LT-1, RP-1, AU-1, A-5, TR-7b, CT-7b, the five IG-3 cases, MF-2, MF-4, MF-7b), MLP-3 and SO-9 on that run.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-17-turn-4.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 12 files → each equal to:
  835e972f8ee77a70c369bcc640a304c423f238b91bbbb420345dc6969722305c  docs/_changelog.md
  504d6af6babb9cb3f4eb05dc62e1f82f9a88dc1bd49172a88e7247cd5b95b020  docs/features/admin-shell.md
  9a9674d5923200fbf5a2bb2d893c26c607329fdc485b52489a126525b06c30d8  docs/features/admin-users.md
  d8feb9a2350e4fe43a625d05853c9c3cf5fd7097027909baddc3cf90b1da587e  docs/features/my-listings.md
  0c88fddb50af80273e93224d5e22cd86af7d6212caff17f7a03ac22c9f0c1fea  roadmap.md
  6d7a9fe58d65e1bac3905836a357b2953c56b189c06e8f31b1affdc2ff654697  src/components/app-shell.tsx
  5f0b6fa4c39a442d2b7eec9a4282aa1682927f64ed99039e8f76d60e26dac1cd  src/components/shell/app-header.tsx
  5feb0d442b56f2b6468c3559d776ee371051950ad3f41e6f3fe62d02152287c9  src/features/admin-screening/screening-page.tsx
  c4836d4401854a23f198d936307265d7017ba599214f780c7d013cf6ae5d21a0  src/features/auth/use-auth.ts
  d9c33738e3cc7a4919b2d66384beccbc7988197bb640703fa1a59b013fd866f2  src/features/posting/use-edit-draft.test.ts
  5ece9a18ff3260ff16f640af97fcac4fc66ab91a2ebe73f5784d4f6172105d18  src/features/posting/use-edit-draft.ts
  08e259fb49117242f800780d5d70317dfcdbb9fa31bf5e5a811ecc13b30b5336  src/features/posting/wizard.tsx
- (c) `sha256sum e2e/admin-listings.spec.ts e2e/auth-signout.spec.ts e2e/my-listings-ad.spec.ts` → ff6e0d3b7044e777779b2493d8471e3f352115d1029caefdbe14022112ad803c, 6c397f89e00fa130277a8e9d208e82a02d043868b67499113f9fbf4a6c2efb0b and dddc93af50e3425f72d18f6b8d603a61253ebfe41fa468ef2047210e97dc3429; `ls supabase/migrations | tail -1` → 20261015204631_c99005e8-3799-499f-b6b8-ec439d4b9c35.sql (bundle 16's last; no migration since).
- (d) ethio-prod, your query tool (SELECT only):
  - `select version from public.migration_marks order by version desc limit 3;` → paste the three (the newest is bundle 16's S3 mark, 20261016090000);
  - `select md5(replace(prosrc, chr(13), '')) from pg_proc where oid = 'public.set_listing_photos_soon(uuid, boolean)'::regprocedure;` → 82ce6dcd01b8e4e8800e11b59d01fb03 (the live body equals the file's, 20261004144146 :290–322, apart from nothing);
  - `select prosecdef, provolatile, proconfig from pg_proc where oid = 'public.set_listing_photos_soon(uuid, boolean)'::regprocedure;` → t | v | {search_path=public};
  - `select pg_get_functiondef('public.set_listing_photos_soon(uuid, boolean)'::regprocedure);` → paste it whole in the report (G39: the live definition beside the file).

THE CARRIER — B17T4-TURN-CARRIER-2026-10-16.md (14,437 bytes; sha256 a79a5309c564d1904c84156f885010d0bf9bb04cd8868b7afbedf40c80e0e459; 26 sections)
- Its first line starts "B17T4 TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`. No blank line separates the sections.
- Modes:
  - REPLACE: the section is the whole file;
  - NEW: a new file; the section is the whole file;
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file;
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed. If your upload arrives under another name, match it by its size and sha256.

THE HASHES — `sha256sum` each of the 12 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  1a347deee1bc94aee132dea38c2c2e0aa68adb80d87ed9972affa7ce99adfd7b  docs/_changelog.md
  83257caac6da406650b47e100127598e02919d9fa55e9d826550e2a18ff74615  docs/features/admin-shell.md
  96f8ec8d0e57b0648e3f9323683c3368ac83605b8cb4568a7f233a6ac4ba6134  docs/features/admin-users.md
  830a77ad16a49ce601eef1c8d57297bcb175b274a4caa6c925b014b1bcc9ab2f  docs/features/my-listings.md
  803788c4030c1390fd8bec8ec3635b9ec11d772bccef298e215dee4a1f50a53c  roadmap.md
  c10ed106569915f565c5388638568e514820f4155507ec0e43042e34c08997f7  src/components/app-shell.tsx
  e55d83b7369825caa517abfc586a92e72d69c8d86ddbd392507b6cdab74eeb59  src/components/shell/app-header.tsx
  1abf5bcc385159632e660aa87d4b72bd59bbcd54a9b5290cdb6f3fb22501af63  src/features/admin-screening/screening-page.tsx
  2f5584551b70d23f52c93ba89d4fd37482f1f258d38d3230078d5318e8b0c2b7  src/features/auth/use-auth.ts
  98e31fe3f07e1d651aee31fa25f952a60b718560017ba50311d7bf5c211239e3  src/features/posting/use-edit-draft.test.ts
  cb7d92c4d2eecee3b14322988abd6da82bc35be7cd151c31b41e36f31df14a75  src/features/posting/use-edit-draft.ts
  b2dcf4821f0a72172bea66a1bc06a2aa5cb63edc72b7bc6d3e11ccdabdb37b9e  src/features/posting/wizard.tsx

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run format:check` clean (the three spec files included);
- `bun run lint` 0 errors / 33 warnings;
- `bun run test:unit 2>&1 | tee /tmp/unit-b17t4.log` — 932 passed (161 files); paste the count;
- `bun run i18n:map-guard` "usage maps match the tree";
- `bash scripts/check-hardcoded-strings.sh` "findings: 0";
- Not run by you: the typecheck, the build, the bundle budget and the browser tests. CI judges them.

THE MIGRATION RULES (G39 — every one applies)
- The text is between the BEGIN and END lines of the appendix below. Write it EXACTLY, changing only `<MARK>` (its last line). Before the change, its sha256 is 40fb4e40a7c58076a50617e3193fc5a9a2364b15ee23f672166d36c06f1cb2eb (4,975 bytes, 88 lines, ending with a newline). Hand it to the database tool by copying the text, never by retyping it (INC-639).
- Before the apply, compare the live definition pasted in census (d) with section A of the text: they differ in exactly two lines — the comment above the status check and the status check itself (`'closed'` added). Any other difference: STOP and report both texts.
- Check it in a scratch folder first (after the checks):
  - copy supabase/migrations/*.sql into a temporary folder;
  - add the text, its `<MARK>` replaced by the mark you will use, under the name 20261017120000_b17t4-check.sql;
  - run `MIGRATIONS_DIR=<that folder> bash scripts/check-migrations.sh`.
  Paste its "guard OK" lines and "Migration guard OK".
- `<MARK>` is chosen at apply time:
  - read now() at time zone 'utc' on ethio-prod;
  - round it up to the next whole hour and add one hour (add twelve hours instead if the save dialog may wait);
  - if the result is below 20261017120000, use 20261017120000 (above the newest mark in census (d) and equal to the scratch check's stamp);
  - the mark must also be later than the saved file's own stamp.
- Then hand the FINAL text to the database tool ONCE. Never a stub, a comment or a draft (INC-491).
- A clean apply is the proofs' pass: they RAISE EXCEPTION on any failure.

THE READ-BACK (ethio-prod, your query tool, SELECT only; paste each result)
- `select version from public.migration_marks where version = '<MARK>';` → one row;
- `select md5(replace(prosrc, chr(13), '')) from pg_proc where oid = 'public.set_listing_photos_soon(uuid, boolean)'::regprocedure;` → dd5dba986255e5ec34844ac100ad399e;
- `select has_function_privilege('authenticated', 'public.set_listing_photos_soon(uuid, boolean)', 'EXECUTE'), has_function_privilege('anon', 'public.set_listing_photos_soon(uuid, boolean)', 'EXECUTE');` → t | f.
- If a read-back differs from the expected md5, STOP and report the md5 you read and the text you handed over: the supervisor rules (DEC-182).

THE REPORT
- Done or not done, by step.
- The six ci-status lines, and <START>.
- The census results (a)–(d), the live definition whole.
- The 12 sha256sum lines and the brief's; the sha256sum and line count of each of the three test files, and `git diff <START> -- e2e/` whole.
- `git diff --name-only <START>` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only <START> HEAD` too. Expect the 12 paths, the brief, the three test files and the one migration file; `git ls-files` proof that the migration file is tracked (G20).
- The checks.
- The check-migrations "guard OK" lines; the mark and the now() reading it came from; the apply outcome; the read-back.
- The line "apply <uuid-fragment of the migration's filename> → expect mark <MARK>", for the operator's staging apply.
- In this report ONLY (never in a file — the repository is public): from the database tool's security warnings, each NEW warning, and the total count.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only). The database change is undone only by a new migration — never by editing this file.

AFTER THIS TURN (for the operator), in this order:
1. Apply the migration on ethio-staging: open the new migration file on GitHub (Raw), paste it into the ethio-staging SQL editor and run it; read back its mark with the line the report gives (`select version from public.migration_marks where version = '<MARK>';`, never max()).
2. If CI's run has already failed at the preflight ("STAGING BEHIND"), use "Re-run failed jobs".
3. Bring the supervisor Lovable's report. Do not wait for CI (DEC-181).
4. Turn 5 (D193) follows from the supervisor; Publish waits for the bundle's close.

APPENDIX — THE MIGRATION (between the BEGIN and END lines; not including them)
-----BEGIN B17T4 MIGRATION-----
-- Bundle 17 turn 4 (2026-10-16). Tier A. INC-666 — A CLOSED AD'S "PHOTOS COMING SOON" TICK. A closed ad is edited like a
-- live one (INC-631, bundle 16 turn R2: the photo routes take its photos; E2a: set_listing_pin takes its pin; D194: the
-- Edit is the posting wizard, whose Photos step draws the tick), but set_listing_photos_soon (20261004144146) still
-- refused 'closed' — the third door of INC-631's class. The wizard hid the tick on a closed ad meanwhile (turn 2).
--
-- A. set_listing_photos_soon, redeclared whole from its live definition (20261004144146; the executor pastes the live
--    pg_get_functiondef beside this file before the apply — G39): 'closed' joins the status list; nothing else changes.
--    Grants restated; the allowlist line is unchanged (the door was already listed).
-- B. Proofs P1–P3 on no real row: the body's marker and header; the grants; no session refused at the first gate.
--    A closed ad's tick is proven through the app (the wizard's Photos step on a closed ad: the turn's browser test).

-- ===== A — set_listing_photos_soon, whole: a closed ad takes the tick =====
CREATE OR REPLACE FUNCTION public.set_listing_photos_soon(p_listing_id uuid, p_on boolean)
 RETURNS jsonb
 LANGUAGE plpgsql
 VOLATILE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid  uuid := auth.uid();
  v_row  public.listings%ROWTYPE;
  v_on   boolean := coalesce(p_on, false);
  v_rate jsonb;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  v_rate := public.rate_gate('draft');
  IF NOT coalesce((v_rate->>'allowed')::boolean, false) THEN
    RETURN jsonb_build_object('ok', false, 'refusals', jsonb_build_array(
      jsonb_build_object('field', 'rate', 'reason', 'rateLimited', 'resets_at', v_rate->>'resets_at')));
  END IF;
  SELECT * INTO v_row FROM public.listings WHERE id = p_listing_id FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'listing not found'; END IF;
  IF v_row.seller_id <> v_uid THEN RAISE EXCEPTION 'not your listing'; END IF;
  -- The statuses set_listing_pin accepts (bundle 17 turn 4, INC-666: 'closed' joins them, as it joined the pin door).
  IF v_row.status NOT IN ('draft','active','reduced','closed','rejected','held','expired') THEN
    RAISE EXCEPTION 'photosSoonNotEditable:%', v_row.status;
  END IF;
  IF v_row.photos_soon IS DISTINCT FROM v_on THEN
    UPDATE public.listings SET photos_soon = v_on, updated_at = now() WHERE id = p_listing_id;
    INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
      VALUES (p_listing_id, v_uid, 'edit',
              jsonb_build_object('photos_soon', v_row.photos_soon),
              jsonb_build_object('photos_soon', v_on), v_uid);
  END IF;
  RETURN jsonb_build_object('ok', true, 'photos_soon', v_on);
END $function$;
REVOKE ALL ON FUNCTION public.set_listing_photos_soon(uuid, boolean) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.set_listing_photos_soon(uuid, boolean) TO authenticated;
GRANT ALL ON FUNCTION public.set_listing_photos_soon(uuid, boolean) TO service_role;

-- ===== B — proofs =====
DO $proof$
DECLARE
  v_src text;
  v_msg text;
BEGIN
  -- P1. The body carries the change, with its header kept.
  SELECT prosrc INTO v_src FROM pg_proc
   WHERE oid = 'public.set_listing_photos_soon(uuid, boolean)'::regprocedure
     AND prosecdef AND provolatile = 'v' AND proconfig = ARRAY['search_path=public'];
  IF v_src IS NULL
     OR v_src NOT LIKE '%NOT IN (''draft'',''active'',''reduced'',''closed'',''rejected'',''held'',''expired'')%'
     OR v_src NOT LIKE '%photosSoonNotEditable:%'
     OR v_src NOT LIKE '%public.rate_gate(''draft'')%'
     OR v_src NOT LIKE '%jsonb_build_object(''photos_soon'', v_on), v_uid);%' THEN
    RAISE EXCEPTION 'B17T4 P1: the body of set_listing_photos_soon is not as written';
  END IF;

  -- P2. Grants as before: signed-in users call the door; anon does not.
  IF has_function_privilege('anon', 'public.set_listing_photos_soon(uuid, boolean)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.set_listing_photos_soon(uuid, boolean)', 'EXECUTE')
     OR NOT has_function_privilege('service_role', 'public.set_listing_photos_soon(uuid, boolean)', 'EXECUTE') THEN
    RAISE EXCEPTION 'B17T4 P2: a grant is not as before';
  END IF;

  -- P3. No session: refused at the first gate (no row is read).
  PERFORM set_config('request.jwt.claims', '', true);
  BEGIN
    PERFORM public.set_listing_photos_soon(gen_random_uuid(), true);
    RAISE EXCEPTION 'B17T4 P3: set_listing_photos_soon answered a call with no session';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'not authenticated' THEN RAISE EXCEPTION 'B17T4 P3: set_listing_photos_soon: %', v_msg; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '', true);
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('<MARK>') ON CONFLICT (version) DO NOTHING;
-----END B17T4 MIGRATION-----
```
