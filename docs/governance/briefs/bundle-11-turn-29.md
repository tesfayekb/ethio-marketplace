# Bundle 11 — the Listings console, turn L4d: Undo this edit (D141): brief, version 1 (saved unchanged, 2026-10-12)

```text
BUNDLE 11 — THE LISTINGS CONSOLE, TURN L4d (2026-10-12). ONE TURN, ONE MIGRATION. 8 new strings (below). No package change.
Base: dev b6aa7bc5f2ea1b04371ac94348efb5ebe34ab380. This file is public: it is written as build instructions. Tier A: the new undo door, the edit door redeclared (the reasons it takes), the seller notices' reason list, the migration and its proofs. Tier B: the History's Undo button, its dialog and the tests.

ANSWERS TO THE LAST TURN
- Turn G3e: verified (dev b6aa7bc5 holds the delivered tree and the brief as sent). Its CI run is read by the supervisor while you work; a fix it needs comes in the next turn.
- Turns G3d and G3d2: CI run 38198364284 on 4913e366, SUCCESS; main promoted to 4913e366.

THE OPERATOR'S DECISION (D141, 2026-10-12): an admin's saved edit can be undone. "Undo this edit" sits on the newest edit in the listing's History and is offered only while nothing has changed the listing since; it puts the edit's before-values back as a new logged edit with the reason "Undo", and the seller is told.

WHAT THIS TURN BUILDS
- The migration (the appendix; read it whole):
  - A. `seller_notices`: its reason list (the check `seller_notices_reason_check`) gains `undo`.
  - B. `admin_edit_listing`, redeclared whole from 20261011143218 with ONE change: the reason `undo` is taken only while the setting `app.listing_undo` is on, which only the undo door turns on, for its own call. From anyone else `undo` is "unknown reason", as today. Every other line stands byte for byte.
  - C. `admin_undo_listing_edit(p_listing_id uuid, p_at timestamptz, p_note text DEFAULT NULL)` (NEW): listings:enforce with a fresh second factor; the listing (not a draft) is locked; its newest revision must be the one at `p_at` ("the listing has changed since this edit" otherwise), an edit by staff that is not itself an undo ("nothing to undo" otherwise) and removed no photo ("a photo removal is not undone"); every value that edit wrote must still be the listing's ("the listing has changed since this edit"). Then the edit's before-values (the title, the description, the category, the specifications, the price) go back through `admin_edit_listing` with the reason `undo` and the note: the same rules, one revision, one audit row and one seller notice. Its answer is the edit door's (done, or the refusal list).
  - D. The proofs D1–D6.
  - src/integrations/supabase/types.ts: `admin_undo_listing_edit` in Functions (from the carrier). If the platform regenerates the file after the migration, that is allowed: name it in the report.
  - scripts/public-surface-allowlist.txt: the new door's line (from the carrier; the migration guard reads it).
- src/features/admin-listings/undo-edit.ts (NEW): `mayUndo` (the newest line, an edit by staff, not an undo, no photo removed), `undoErrorKey` (the door's refusals in words), `undoRefusalGroups` (the fields whose before-values break today's rules).
- src/features/admin-listings/undo-dialog.tsx (NEW, `listing-undo-dialog`): what the undo does, an optional note for the seller (`listing-undo-note`, at most 500 characters), the door's refusal (`listing-undo-problem`), Cancel (`listing-undo-cancel`) and Undo (`listing-undo-confirm`).
- src/features/admin-listings/use-admin-listing.ts: `undoAdminListingEdit` (one call of the door with the History line's own moment; a refusal list is an answer; every other error is thrown as it came, so the second-factor guard can read it).
- src/features/admin-listings/listing-page.tsx: "Undo this edit" (`listing-history-undo`) on the History's newest line when `mayUndo` and the person may edit the listing (listings:enforce, not their own, not removed); it waits while the page's read is being replaced (INC-558's class); Undo goes through the second factor; done — the dialog closes and the line above says "Undone. The seller is told what changed: Price." (the door's fields); "changed since" — said in the dialog, and the page reads the History again; before-values that break today's rules — said in the dialog, naming the fields, nothing written.

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- An undo goes through the edit door: the same content rules as any admin edit. Before-values that break today's rules (a phone number the edit had taken out of the title, say) are refused, and nothing is written.
- Undo is offered only on the newest line, and only when that line is an edit by staff: a seller's edit, a move or the system's change is not undone here.
- An undo is not undone again: the admin edits the listing instead.
- A photo removal is not undone (the console does not remove photos yet).
- The reason is "Undo"; the note for the seller is optional.
- After "the listing has changed since this edit", the page reads the History again.

STRINGS (G43 — the Amharic below is what ships; English in en.ts, Amharic in am.ts, after `admin.listings.edit.categoryHint`)
- admin.listings.history.undo — en "Undo this edit" · am "ይህን ማስተካከያ ቀልብስ"
- admin.listings.reason.undo — en "Undo" · am "መቀልበስ"
- admin.listings.undo.title — en "Undo this edit?" · am "ይህ ማስተካከያ ይቀለበስ?"
- admin.listings.undo.hint — en "The values from before this edit come back. The seller is told." · am "ከዚህ ማስተካከያ በፊት የነበሩት እሴቶች ይመለሳሉ። ለሻጩ ይነገራል።"
- admin.listings.undo.confirm — en "Undo" · am "ቀልብስ"
- admin.listings.undo.done — en "Undone. The seller is told what changed: {fields}." · am "ተቀልብሷል። የተቀየረው ለሻጩ ይነገራል፦ {fields}።"
- admin.listings.undo.changed — en "The listing has changed since this edit, so it cannot be undone." · am "ከዚህ ማስተካከያ በኋላ ማስታወቂያው ስለተቀየረ መቀልበስ አይቻልም።"
- admin.listings.undo.refused — en "The values from before this edit do not meet today's rules, so it cannot be undone: {fields}." · am "ከዚህ ማስተካከያ በፊት የነበሩት እሴቶች የአሁኑን ደንቦች ስለማያሟሉ መቀልበስ አይቻልም፦ {fields}።"
- Reused, unchanged: admin.listings.move.note, common.cancel, admin.listings.history.reason, admin.listings.history.edited, admin.listings.col.*.

TESTS
- Unit, NEW: src/features/admin-listings/undo-edit.test.ts UE-1 (which line offers Undo), UE-2 (the door's refusals in words), UE-3 (the refused fields as groups; an answer's key reads as Specifications); src/features/admin-listings/undo-dialog.test.tsx UD-1 (no note sends none; a note is sent trimmed; Cancel), UD-2 (the door's refusal shown; nothing pressed while busy).
- e2e/admin-listings.spec.ts:
  - AL-26 (the page, the super admin): two admin edits of a scratch listing (the title, then the price 120); the newest line offers Undo and the older one does not; Undo with a note; the line above names Price; the price is back to 100 ETB and the title stays; the newest line is "Edited: Price" with "Reason: Undo" and the note, and no Undo is left on the page; the stored values, the seller's notice (reason undo) and the third revision.
  - AL-27 (the door, as the super admin): nothing to undo on a listing with no revision; `undo` as an edit reason is "unknown reason" and nothing is written; a line that is no longer the newest; the listing changed since the edit (this test's own row), then put back and undone; the undo undone again; the seller's own line newest (a scratch revision of this listing); before-values that break today's rules (a phone number in the title) — a refusal under the title, nothing written.
  - A helper `newestRevisionAt` (the moment of a listing's newest revision, as its History names it).
  - Every listing and revision is a scratch row of the test (G27); each test leases two accounts (the scratch seller and the super admin).
- Not edited: every other test.

DOCS
- admin-listings.md (Undo this edit; the reasons; the notices; the tests), the spec's reasons (amended, D141), the changelog, the roadmap (line 3; the L4d line).

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, turn G3e applied)
- typecheck, format, lint (0 errors, 33 warnings), 676 unit tests (111 files), the usage maps, the hardcoded-string scan, the import, listing-write, browse and marketplace guards, the root-route check, the selector self-test, the build and the bundle budget (231.1 KiB): all clean. `MIGRATIONS_DIR=<a copy with the migration as 20261011000000_l4d-check.sql> bash scripts/check-migrations.sh`: "Migration guard OK".
- The migration on a local PostgreSQL 16 copy (stand-ins for the tables and the second factor; turns L1, L3 and L4a applied first): it applies and its proofs pass; with part B left out, proof D2 fails; with part A left out, proof D4 fails. Called there: nothing to undo; a stale moment; `undo` refused as an edit reason; the undo lands (the values back, the notice and the audit row with the reason undo); the undo undone again refused; a listing changed since refused; before-values that break the rules refused with nothing written; the seller's own line and a photo removal refused; no right and no second factor refused. The first draft of part B let `undo` through when the setting was unset (a NULL comparison); those calls caught it, and proof D2 now requires the guarded form.
- A local render (Chromium, a node build, mocked answers and a stubbed second factor, nothing sent to a database) at 360, 768 and 1280 px: Undo on the newest line only; the dialog; the refusal naming Title and Specifications; "changed since"; the done line; no sideways scroll.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-11-turn-29.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines (expect commit b6aa7bc5…; any conclusion). If it shows another commit, STOP and report; whatever its conclusion, go on (the supervisor reads that run, and a fix it needs comes in the next turn). You cannot git-fetch that branch;
  2. step 0;
  3. the census (below). If any result differs from what it expects, STOP and report: write nothing else;
  4. the carrier, then the usage maps, then the hashes;
  5. the checks;
  6. the migration LAST, then its read-back;
  7. the report;
  8. END THE TURN.
  Do not stop between steps.
- The migration is the last thing written, because the database tool applies it on ethio-prod the moment it is saved. The operator will see the "Modify Supabase database" dialog and allow it.
- The expected red window (G35): CI on any commit the platform pushes before the migration file exists runs AL-26 and AL-27 against a staging database without the undo door, so they fail there. That is expected and is not fixed. CI on the final commit waits at its preflight ("STAGING BEHIND", up to 25 minutes) until the operator applies the migration on ethio-staging.
- Between the migration and the next Publish, the published site has no Undo button and calls no new door; nothing changes for anyone until the Publish.
- If any rule of yours conflicts with the text, STOP before saving and quote that rule's exact words in the report.
- Production reads are SELECT-only. Reports carry counts, booleans and names of tables, columns, functions, roles, constraints and policies. Never an e-mail address, a user id, a token, a phone number or a row of user data.
- Tests (G38): no assertion loosened, no timeout raised, no retry added. A test this brief does not name is not edited.
- Scope — these files only: the one new migration file (the database tool names it), the 17 carrier paths and the brief. The platform may regenerate src/integrations/supabase/types.ts; that is allowed, name it in the report. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-11-turn-29.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 11 files → each equal to:
  187012a69193baa1cd47bcfb3aaf6bd42047c4141eb98a2cf624446fdbebbb64  docs/_changelog.md
  2bed79bca060d08dbe341e8e0dab3a84cac15fe1c53ae1fc80d581fe16fb3ecc  docs/features/admin-listings.md
  ab2f67d82a7219654bb7de79dac37407f08011a838e6c3b44dc305db13651b12  docs/governance/listings-console-spec.md
  30ccb9de8ccb9fa87dfe34d4ac325f5deb10f2890b197c8103ebd62e296c5ead  e2e/admin-listings.spec.ts
  b6bb77eb5f5932c7b8362f3e96cf5e26b0c524fb8b92e12a9b293c75f272c27b  roadmap.md
  3460cb8c9a7b22be334d29e6cf15d13b3644f461cf28a9c53673623c03cb459f  scripts/public-surface-allowlist.txt
  6c335c858fdf051c083a83a7825bb621dcbf8a959988a4940e6a08a5ff42f4a6  src/features/admin-listings/listing-page.tsx
  0e71cced8d71a37b8c34f7ef49627fc01b609e962fe9f957a93e2ab56cb8da5d  src/features/admin-listings/use-admin-listing.ts
  b4c2992a0e399a60a0b51952b8212e9036f4218cce7235e72ea44adf2c3593cf  src/i18n/locales/am.ts
  d8e4cff063f1838327cd2c367a3a196ec5e3b00a62c2f81108258991e269b75d  src/i18n/locales/en.ts
  b1085f8fbd7160edc8187f94aa44e7d281e95a93c2552015976b45ddf80437ff  src/integrations/supabase/types.ts
- (c) `ls src/features/admin-listings/undo-dialog.test.tsx src/features/admin-listings/undo-dialog.tsx src/features/admin-listings/undo-edit.test.ts src/features/admin-listings/undo-edit.ts` → "No such file or directory" for each.
- On ethio-prod with your query tool (SELECT only):
- (d) `select p.proname, pg_get_function_identity_arguments(p.oid), p.provolatile, p.prosecdef, p.proconfig, md5(p.prosrc) from pg_proc p where p.pronamespace = 'public'::regnamespace and p.proname in ('admin_edit_listing', 'admin_undo_listing_edit') order by 1;` → one row:
  - admin_edit_listing | p_listing_id uuid, p_changes jsonb, p_reason text, p_note text | v | t | {search_path=public} | 59c52ff4b1df124221770d365da6fbf4
  (the md5 is the body of 20261011143218 as applied: the redeclaration starts from it; no undo door yet.)
- (e) `select c.conname, position('''other''' in pg_get_constraintdef(c.oid)) > 0, position('''undo''' in pg_get_constraintdef(c.oid)) > 0 from pg_constraint c where c.conrelid = 'public.seller_notices'::regclass and c.contype = 'c' order by 1;` → three rows:
  - seller_notices_kind_check | f | f
  - seller_notices_note_check | f | f
  - seller_notices_reason_check | t | f
- (f) `select max(version) from public.migration_marks;` → 20261012030000

THE CARRIER — L4D-TURN-CARRIER-2026-10-12.md (32,548 bytes; sha256 ebc3f6948d4c74039c3b01d0318530d75f944c50e6edf0704fe54d2c2aac0401; 26 sections)
- Its first line starts "L4d TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`.
- Modes:
  - REPLACE: the whole file;
  - NEW: a file that must not exist yet;
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file;
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed.

THE USAGE MAPS — run `bun run i18n:map-guard`. It rewrites docs/generated/i18n-usage.json and public/i18n-usage.json (the new keys; keys moved between lines), then exits 1. Run it again: it must print "usage maps match the tree."

THE HASHES — `sha256sum` each of the 17 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  e4ba88b10bf4557ed98270fa6fc017878464f03771a8cd505efab205c99c117e  docs/_changelog.md
  0c708c2b8f61b807510286c0e69c5811a8d2ff8135a742afd5dc773a5791ec6a  docs/features/admin-listings.md
  124155d584fc2944adbdec7b6eff19f162276e1729dea964e535644c7334d7ad  docs/generated/i18n-usage.json
  6f8ffd488fafe8725d481ec173a1a3d1e78b3b250562599d8f0291ad290302e8  docs/governance/listings-console-spec.md
  15359236bfadc748cca926dc68a44fd1005967b91e80651be3cb858824df54bf  e2e/admin-listings.spec.ts
  124155d584fc2944adbdec7b6eff19f162276e1729dea964e535644c7334d7ad  public/i18n-usage.json
  e91b1c49cde558918db5231e45d97cdc4aea4f53066e4f8a41b174bb2a3a583e  roadmap.md
  1b6d0c9abff4736207346e8d69f2e6b48406ee34a0dbc495037ce025f50ba92b  scripts/public-surface-allowlist.txt
  2edc29df45a6c24192baa9ca4d429cc6d35cb76c3f1d173b2984790640e10d18  src/features/admin-listings/listing-page.tsx
  063c7fb0efd346094d82a4eff1dbc06957e1376ebdd8cc0f73ff3c4f91a02bda  src/features/admin-listings/undo-dialog.test.tsx
  c5383e689a34d1a1fc166754dc1ae39b38c6175953119ee942562b1dd1a5efd4  src/features/admin-listings/undo-dialog.tsx
  1b4e017b6200020879d7f5d184a1c6abbdd459b06040c6f5a68349a60ebf917a  src/features/admin-listings/undo-edit.test.ts
  09241ec9fd16c816997c12cd93f986469b838df72650bd230f3358ce0f98ce27  src/features/admin-listings/undo-edit.ts
  e003b00b89ae12694eb3298ea40b0ab00a774bf4510c2078ec3081c1563ae31c  src/features/admin-listings/use-admin-listing.ts
  4c212f7e7ec7fb0cc4a41cf4e8bf91f74b5e29c91427f66259334348e4a70112  src/i18n/locales/am.ts
  fa6be90247048ad31767f23889f9f1c9791098fa191e25dade4a830a3f336a69  src/i18n/locales/en.ts
  086e084f11d5fa3ed4cd0264948568d9e0637f3857cb2286a691a270a7ac0dea  src/integrations/supabase/types.ts

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run typecheck` clean;
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings;
- `bun run test:unit` 676 passed (111 files);
- `bun run i18n:map-guard` as above;
- `bun run scripts/e2e-select.ts --self-test` OK;
- `bun run scripts/check-root-routes.ts` "every root segment is safe";
- `bash scripts/check-hardcoded-strings.sh` findings: 0;
- `bun run build` clean.

THE BROWSER RUN — not this turn. AL-26 and AL-27 need the migration on ethio-staging, which the operator applies after the turn; CI on the final commit is the proof (and the local browser does not start, INC-506).

THE MIGRATION RULES (G39 — every one applies)
- The text is between the BEGIN and END lines of the appendix below. Write it EXACTLY, changing only `<MARK>`. Before the change, its sha256 is 5b39d0b0785b90cad22bf8d8fbe66389699bf756180e71a9dcec6f79da8f41d9 (19,928 bytes, 379 lines, ending with a newline).
- Check it in a scratch folder first (after the carrier):
  - copy supabase/migrations/*.sql into a temporary folder;
  - add the text under the name 20261011000000_l4d-check.sql (a stamp earlier than any mark you will choose);
  - run `MIGRATIONS_DIR=<that folder> bash scripts/check-migrations.sh`.
  Paste its "guard OK" lines and "Migration guard OK".
- `<MARK>` is chosen at apply time:
  - read now() at time zone 'utc' on ethio-prod;
  - round it up to the next whole hour and add one hour (add twelve hours instead if the save dialog may wait);
  - the mark must be later than the saved file's own stamp AND above 20261012030000 (the newest mark).
- Then hand the FINAL text to the database tool ONCE. Never a stub, a comment or a draft (INC-491).
- A clean apply is the proofs' pass: they RAISE EXCEPTION on any failure.

THE READ-BACK (ethio-prod, your query tool, SELECT only; paste each result)
- `select version from public.migration_marks where version = '<MARK>';` → one row;
- `select proname, prosecdef, provolatile, proconfig, has_function_privilege('anon', oid, 'EXECUTE'), has_function_privilege('authenticated', oid, 'EXECUTE') from pg_proc where oid in ('public.admin_edit_listing(uuid,jsonb,text,text)'::regprocedure, 'public.admin_undo_listing_edit(uuid,timestamptz,text)'::regprocedure) order by 1;` → admin_edit_listing | t | v | {search_path=public} | f | t; admin_undo_listing_edit | t | v | {search_path=public} | f | t;
- `select position('app.listing_undo' in pg_get_functiondef('public.admin_edit_listing(uuid,jsonb,text,text)'::regprocedure)) > 0, position('''undo''' in pg_get_constraintdef(c.oid)) > 0 from pg_constraint c where c.conrelid = 'public.seller_notices'::regclass and c.conname = 'seller_notices_reason_check';` → t | t.

THE REPORT
- Done or not done, by step.
- The six ci-status lines.
- The census results (a)–(f).
- The 17 sha256sum lines and the brief's.
- `git diff --name-only b6aa7bc5f2ea1b04371ac94348efb5ebe34ab380` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only b6aa7bc5f2ea1b04371ac94348efb5ebe34ab380 HEAD` too. Expect the 17 carrier paths, the brief and the one migration file (and types.ts again if regenerated).
- The 8 new strings, key by key, English and Amharic, as written in en.ts and am.ts (G43).
- The checks.
- The check-migrations "guard OK" lines; the mark and the now() reading it came from; the apply outcome; the read-back.
- The line "apply <uuid-fragment of the migration's filename> → expect mark <MARK>", for the operator's staging apply.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only). The database change is undone only by a new migration — never by editing this file.

AFTER THIS TURN (for the operator): apply the migration on ethio-staging (the SQL editor), read back its mark; CI's preflight waits for it (up to 25 minutes) — if the run has already failed at the preflight, use "Re-run failed jobs". Then Publish and walk once CI is green.

APPENDIX — THE MIGRATION TEXT (write it exactly; change only <MARK>)
----- BEGIN MIGRATION -----
-- Bundle 11, the Listings console, turn L4d (2026-10-12). Tier A. Undo an admin's edit (D141).
-- e2e-areas: admin-listings
-- A. seller_notices: the reason list gains 'undo' (the seller is told that an admin's edit was undone).
-- B. admin_edit_listing, redeclared whole from 20261011143218 with one change: the reason 'undo' is accepted only
--    while app.listing_undo is on, which only admin_undo_listing_edit turns on, for its own call; every other caller
--    still gets 'unknown reason'. Every other line stands byte for byte.
-- C. admin_undo_listing_edit(listing, at, note) — NEW: listings:enforce with a fresh second factor; the listing's
--    newest revision must be the one at `at`, an edit by staff that is not itself an undo and removed no photo; every
--    value that edit wrote must still be the listing's; then the edit's before-values (the content, the category,
--    the specifications and the price) are sent back through admin_edit_listing with the reason 'undo' — the same
--    rules, one revision, one audit row and one seller notice, as any admin edit. Refusals: 'nothing to undo', 'the
--    listing has changed since this edit', 'a photo removal is not undone', and admin_edit_listing's own.
-- D. Proofs: catalogue reads and calls with no session or a scratch identity that holds nothing; the doors'
--    behaviour is proven by AL-26 and AL-27.

-- ===== A — the seller's notices: the reason 'undo' =====
ALTER TABLE public.seller_notices DROP CONSTRAINT seller_notices_reason_check;
ALTER TABLE public.seller_notices ADD CONSTRAINT seller_notices_reason_check
  CHECK (reason IN ('wrong_category','misleading','prohibited','duplicate','contact_in_text','photo','rules',
                    'removed_in_error','appeal_accepted','other','undo'));

-- ===== B — an admin's content edit: the reason 'undo' from the undo door only =====
CREATE OR REPLACE FUNCTION public.admin_edit_listing(
  p_listing_id uuid, p_changes jsonb, p_reason text, p_note text DEFAULT NULL)
RETURNS jsonb
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid      uuid := auth.uid();
  v_prev     public.listings%ROWTYPE;
  v_row      public.listings%ROWTYPE;
  v_key      text;
  v_note     text := nullif(btrim(coalesce(p_note, '')), '');
  v_val      jsonb;
  v_photos   uuid[] := ARRAY[]::uuid[];
  v_removed  jsonb := '[]'::jsonb;
  v_next     uuid;
  v_before   jsonb;
  v_after    jsonb;
  v_diff_a   jsonb := '{}'::jsonb;
  v_diff_b   jsonb := '{}'::jsonb;
  v_fields   text[];
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'not signed in';
  END IF;
  IF NOT public.has_permission(v_uid, 'listings', 'enforce') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  IF EXISTS (SELECT 1 FROM public.profiles WHERE user_id = v_uid AND account_status = 'deactivated') THEN
    RAISE EXCEPTION 'account is deactivated';
  END IF;
  PERFORM public.require_step_up_if_needed('listings', 'enforce');
  -- D141 — 'undo' is accepted only from admin_undo_listing_edit, which turns app.listing_undo on for its own call.
  IF p_reason IS NULL OR (p_reason NOT IN ('wrong_category','misleading','contact_in_text','photo','rules','other')
                          AND NOT (p_reason = 'undo' AND coalesce(current_setting('app.listing_undo', true), '') = 'on')) THEN
    RAISE EXCEPTION 'unknown reason';
  END IF;
  IF p_reason = 'other' AND v_note IS NULL THEN
    RAISE EXCEPTION 'a note is required';
  END IF;
  IF v_note IS NOT NULL AND char_length(v_note) > 500 THEN
    RAISE EXCEPTION 'the note is too long';
  END IF;
  IF p_changes IS NULL OR jsonb_typeof(p_changes) <> 'object' OR p_changes = '{}'::jsonb THEN
    RAISE EXCEPTION 'nothing to change';
  END IF;
  FOR v_key IN SELECT k FROM jsonb_object_keys(p_changes) k LOOP
    IF v_key NOT IN ('title','description','category_id','attributes','price_mode','price_amount',
                     'price_currency','price_period','price_bp','price_negotiable','remove_photos') THEN
      RAISE EXCEPTION 'not editable: %', v_key;
    END IF;
  END LOOP;

  SELECT * INTO v_prev FROM public.listings WHERE id = p_listing_id FOR UPDATE;
  -- A draft is the seller's private work: it is not found here (D136).
  IF NOT FOUND OR v_prev.status = 'draft' THEN
    RAISE EXCEPTION 'listing not found';
  END IF;
  IF v_prev.status = 'removed' THEN
    RAISE EXCEPTION 'a removed listing is not edited';
  END IF;
  IF v_prev.seller_id = v_uid THEN
    RAISE EXCEPTION 'your own listing is edited the seller''s way';
  END IF;

  IF p_changes ? 'remove_photos' THEN
    IF jsonb_typeof(p_changes->'remove_photos') <> 'array' THEN
      RAISE EXCEPTION 'remove_photos must be a list';
    END IF;
    SELECT coalesce(array_agg(DISTINCT x::uuid), ARRAY[]::uuid[]) INTO v_photos
      FROM jsonb_array_elements_text(p_changes->'remove_photos') x;
    IF EXISTS (SELECT 1 FROM unnest(v_photos) r(id)
                WHERE NOT EXISTS (SELECT 1 FROM public.listing_photos ph
                                   WHERE ph.id = r.id AND ph.listing_id = p_listing_id)) THEN
      RAISE EXCEPTION 'photo not found on this listing';
    END IF;
  END IF;

  -- The seller's content rules for what an admin can change (D140, DEC-173; INC-552): the category, the
  -- specifications, the price, the title and the description — validate_listing_draft through step 5, with every
  -- field the admin does not change read from the listing as it stands. The seller's own end date and places are not
  -- sent, and the contact step (7) is not reached: they are the seller's choices, judged when the seller saves.
  v_val := public.validate_listing_draft(v_prev.seller_id, 5::smallint,
    CASE WHEN p_changes ? 'category_id' THEN (p_changes->>'category_id')::uuid ELSE v_prev.category_id END,
    CASE WHEN p_changes ? 'title' THEN p_changes->>'title' ELSE v_prev.title END,
    CASE WHEN p_changes ? 'description' THEN p_changes->>'description' ELSE v_prev.description END,
    v_prev.video_url,
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

  -- ==== REQ-021 SCREENING GATEWAY (stage 2, DEC-145) ====
  -- The automatic screening call judges an admin's edit at this point, as it judges the seller's. Until stage 2
  -- nothing is called: the enforcer's edit is itself a human judgment, and a live listing stays live (D136).

  IF cardinality(v_photos) > 0 THEN
    SELECT coalesce(jsonb_agg(to_jsonb(ph) ORDER BY ph.display_order), '[]'::jsonb) INTO v_removed
      FROM public.listing_photos ph WHERE ph.listing_id = p_listing_id AND ph.id = ANY (v_photos);
    UPDATE public.listings SET cover_photo_id = NULL
     WHERE id = p_listing_id AND cover_photo_id = ANY (v_photos);
    -- The row goes; the file stays in storage until the listing's retention ends (the revision keeps its paths).
    DELETE FROM public.listing_photos WHERE listing_id = p_listing_id AND id = ANY (v_photos);
    SELECT ph.id INTO v_next FROM public.listing_photos ph
     WHERE ph.listing_id = p_listing_id ORDER BY ph.display_order LIMIT 1;
  END IF;

  UPDATE public.listings SET
    category_id      = CASE WHEN p_changes ? 'category_id' THEN (p_changes->>'category_id')::uuid ELSE category_id END,
    title            = v_val->>'title',
    description      = v_val->>'description',
    attributes       = v_val->'attrs',
    price_amount     = (v_val->>'price_amount')::numeric,
    price_currency   = (v_val->>'price_currency')::char(3),
    price_mode       = v_val->>'price_mode',
    price_period     = v_val->>'price_period',
    price_bp         = (v_val->>'price_bp')::integer,
    price_negotiable = coalesce((v_val->>'price_negotiable')::boolean, false),
    price_unit       = v_val->>'price_unit',
    price_unit_text  = v_val->>'price_unit_text',
    cover_photo_id   = CASE WHEN cardinality(v_photos) > 0 THEN coalesce(cover_photo_id, v_next) ELSE cover_photo_id END,
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
  IF jsonb_array_length(v_removed) > 0 THEN
    v_diff_b := v_diff_b || jsonb_build_object('photos_removed', v_removed);
    v_diff_a := v_diff_a || jsonb_build_object('photos_removed', to_jsonb(v_photos));
  END IF;

  -- The fields as the seller will read them.
  SELECT coalesce(array_agg(DISTINCT f ORDER BY f), ARRAY[]::text[]) INTO v_fields
    FROM (SELECT CASE
                   WHEN k = 'title' THEN 'title'
                   WHEN k = 'description' THEN 'description'
                   WHEN k = 'category_id' THEN 'category'
                   WHEN k = 'attributes' THEN 'specs'
                   WHEN k LIKE 'price%' THEN 'price'
                   WHEN k IN ('photos_removed','cover_photo_id') THEN 'photos'
                 END AS f
            FROM jsonb_object_keys(v_diff_a) k) g
   WHERE f IS NOT NULL;
  IF cardinality(v_fields) = 0 THEN
    RAISE EXCEPTION 'nothing changed';
  END IF;

  INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
    VALUES (p_listing_id, v_prev.seller_id, 'edit', v_diff_b, v_diff_a, v_uid);
  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
    VALUES (v_uid, 'listing.admin_edit', 'listing', p_listing_id::text,
            jsonb_strip_nulls(jsonb_build_object('fields', to_jsonb(v_fields), 'reason', p_reason, 'note', v_note)));
  INSERT INTO public.seller_notices (seller_id, listing_id, kind, fields, reason, note)
    VALUES (v_prev.seller_id, p_listing_id, 'admin_edit', v_fields, p_reason, v_note);

  RETURN jsonb_build_object('ok', true, 'status', v_row.status, 'fields', to_jsonb(v_fields));
END $$;

REVOKE ALL ON FUNCTION public.admin_edit_listing(uuid, jsonb, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_edit_listing(uuid, jsonb, text, text) TO authenticated;
GRANT ALL ON FUNCTION public.admin_edit_listing(uuid, jsonb, text, text) TO service_role;

-- ===== C — undo an admin's edit =====
CREATE OR REPLACE FUNCTION public.admin_undo_listing_edit(
  p_listing_id uuid, p_at timestamptz, p_note text DEFAULT NULL)
RETURNS jsonb
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid     uuid := auth.uid();
  v_row     public.listings%ROWTYPE;
  v_rev     public.listing_revisions%ROWTYPE;
  v_now     jsonb;
  v_key     text;
  v_changes jsonb := '{}'::jsonb;
  v_out     jsonb;
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'not signed in';
  END IF;
  IF NOT public.has_permission(v_uid, 'listings', 'enforce') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  IF EXISTS (SELECT 1 FROM public.profiles WHERE user_id = v_uid AND account_status = 'deactivated') THEN
    RAISE EXCEPTION 'account is deactivated';
  END IF;
  PERFORM public.require_step_up_if_needed('listings', 'enforce');

  SELECT * INTO v_row FROM public.listings WHERE id = p_listing_id FOR UPDATE;
  -- A draft is the seller's private work: it is not found here (D136).
  IF NOT FOUND OR v_row.status = 'draft' THEN
    RAISE EXCEPTION 'listing not found';
  END IF;

  -- The listing's newest revision, in the order its History shows them.
  SELECT * INTO v_rev FROM public.listing_revisions r
   WHERE r.listing_id = p_listing_id
   ORDER BY r.created_at DESC, r.id DESC
   LIMIT 1;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'nothing to undo';
  END IF;
  IF p_at IS NULL OR v_rev.created_at <> p_at THEN
    RAISE EXCEPTION 'the listing has changed since this edit';
  END IF;
  IF v_rev.kind <> 'edit' OR v_rev.actor IS NULL OR v_rev.actor = v_rev.seller_id
     OR jsonb_typeof(v_rev.before) IS DISTINCT FROM 'object' OR jsonb_typeof(v_rev.after) IS DISTINCT FROM 'object'
     -- An undo is not undone again: the admin edits the listing instead.
     OR EXISTS (SELECT 1 FROM public.seller_notices sn
                 WHERE sn.listing_id = p_listing_id AND sn.created_at = v_rev.created_at AND sn.reason = 'undo') THEN
    RAISE EXCEPTION 'nothing to undo';
  END IF;
  IF v_rev.after ? 'photos_removed' THEN
    RAISE EXCEPTION 'a photo removal is not undone';
  END IF;

  -- Every value the edit wrote must still be the listing's.
  v_now := to_jsonb(v_row);
  FOR v_key IN SELECT k FROM jsonb_object_keys(v_rev.after) k LOOP
    IF (v_now->v_key) IS DISTINCT FROM (v_rev.after->v_key) THEN
      RAISE EXCEPTION 'the listing has changed since this edit';
    END IF;
  END LOOP;

  -- The edit's before-values for what an admin can change; the price's unit follows from them.
  FOR v_key IN SELECT k FROM jsonb_object_keys(v_rev.before) k LOOP
    IF v_key IN ('title','description','category_id','attributes','price_mode','price_amount',
                 'price_currency','price_period','price_bp','price_negotiable') THEN
      v_changes := v_changes || jsonb_build_object(v_key, v_rev.before->v_key);
    END IF;
  END LOOP;
  IF v_changes = '{}'::jsonb THEN
    RAISE EXCEPTION 'nothing to undo';
  END IF;

  -- The same door as any admin edit: the same rules, one revision, one audit row and one seller notice.
  PERFORM set_config('app.listing_undo', 'on', true);
  v_out := public.admin_edit_listing(p_listing_id, v_changes, 'undo', p_note);
  PERFORM set_config('app.listing_undo', 'off', true);
  RETURN v_out;
END $$;

REVOKE ALL ON FUNCTION public.admin_undo_listing_edit(uuid, timestamptz, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_undo_listing_edit(uuid, timestamptz, text) TO authenticated;
GRANT ALL ON FUNCTION public.admin_undo_listing_edit(uuid, timestamptz, text) TO service_role;

-- ===== D — proofs (catalogue reads, and calls with no session or a scratch identity that holds nothing) =====
DO $proof$
DECLARE
  v_fn  text;
  v_def text;
  v_err text;
  v_who uuid := gen_random_uuid();
BEGIN
  -- D1: both doors are volatile definers with a fixed search path; the signed-in role runs them, anon and PUBLIC
  -- do not.
  FOREACH v_fn IN ARRAY ARRAY[
      'public.admin_edit_listing(uuid,jsonb,text,text)',
      'public.admin_undo_listing_edit(uuid,timestamptz,text)'] LOOP
    IF NOT (SELECT p.prosecdef FROM pg_catalog.pg_proc p WHERE p.oid = v_fn::regprocedure)
       OR (SELECT p.proconfig FROM pg_catalog.pg_proc p WHERE p.oid = v_fn::regprocedure) <> ARRAY['search_path=public']
       OR (SELECT p.provolatile FROM pg_catalog.pg_proc p WHERE p.oid = v_fn::regprocedure) <> 'v' THEN
      RAISE EXCEPTION 'L4d D1: % is not a volatile definer with its search path', v_fn;
    END IF;
    IF has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE')
       OR EXISTS (SELECT 1 FROM pg_catalog.pg_proc p, aclexplode(p.proacl) x
                   WHERE p.oid = v_fn::regprocedure AND x.grantee = 0) THEN
      RAISE EXCEPTION 'L4d D1: % privileges', v_fn;
    END IF;
  END LOOP;

  -- D2: the edit's gates and rules as before; 'undo' only while the undo door's setting is on.
  v_def := pg_get_functiondef('public.admin_edit_listing(uuid,jsonb,text,text)'::regprocedure);
  IF v_def NOT LIKE '%has_permission(v_uid, ''listings'', ''enforce'')%require_step_up_if_needed(''listings'', ''enforce'')%AND NOT (p_reason = ''undo'' AND coalesce(current_setting(''app.listing_undo'', true), '''') = ''on'')%v_prev.status = ''draft''%v_prev.status = ''removed''%v_prev.seller_id = v_uid%validate_listing_draft(v_prev.seller_id, 5::smallint,%INSERT INTO public.listing_revisions%INSERT INTO public.audit_log%INSERT INTO public.seller_notices%' THEN
    RAISE EXCEPTION 'L4d D2: admin_edit_listing''s gates, its reasons or its rules';
  END IF;

  -- D3: the undo door's gates in order, its checks, and the one call it makes.
  v_def := pg_get_functiondef('public.admin_undo_listing_edit(uuid,timestamptz,text)'::regprocedure);
  IF v_def NOT LIKE '%has_permission(v_uid, ''listings'', ''enforce'')%require_step_up_if_needed(''listings'', ''enforce'')%FOR UPDATE%v_rev.created_at <> p_at%v_rev.kind <> ''edit''%sn.reason = ''undo''%photos_removed%IS DISTINCT FROM (v_rev.after->v_key)%set_config(''app.listing_undo'', ''on'', true)%public.admin_edit_listing(p_listing_id, v_changes, ''undo'', p_note)%set_config(''app.listing_undo'', ''off'', true)%' THEN
    RAISE EXCEPTION 'L4d D3: admin_undo_listing_edit''s gates or its checks';
  END IF;
  IF v_def LIKE '%UPDATE public.%' OR v_def LIKE '%INSERT INTO%' OR v_def LIKE '%DELETE%' THEN
    RAISE EXCEPTION 'L4d D3: the undo door writes only through admin_edit_listing';
  END IF;

  -- D4: the seller's notices take the reason 'undo'.
  IF pg_get_constraintdef((SELECT c.oid FROM pg_catalog.pg_constraint c
                            WHERE c.conrelid = 'public.seller_notices'::regclass
                              AND c.conname = 'seller_notices_reason_check')) NOT LIKE '%''undo''%' THEN
    RAISE EXCEPTION 'L4d D4: seller_notices does not take the reason undo';
  END IF;

  -- D5: with no session, both doors refuse before reading anything; 'undo' is refused without the undo door.
  PERFORM set_config('request.jwt.claims', '', true);
  FOREACH v_fn IN ARRAY ARRAY['edit', 'undo'] LOOP
    v_err := NULL;
    BEGIN
      IF v_fn = 'edit' THEN
        PERFORM public.admin_edit_listing(NULL, '{"title":"x"}'::jsonb, 'misleading');
      ELSE
        PERFORM public.admin_undo_listing_edit(NULL, now());
      END IF;
    EXCEPTION WHEN OTHERS THEN
      v_err := SQLERRM;
    END;
    IF v_err IS DISTINCT FROM 'not signed in' THEN
      RAISE EXCEPTION 'L4d D5: the % door answered % to a call with no session', v_fn, coalesce(v_err, 'nothing');
    END IF;
  END LOOP;
  IF current_setting('app.listing_undo', true) IS NOT DISTINCT FROM 'on' THEN
    RAISE EXCEPTION 'L4d D5: the undo setting is on outside the undo door';
  END IF;

  -- D6: a scratch identity that holds no permission (no account row is written) is refused by both.
  PERFORM set_config('request.jwt.claims', json_build_object('sub', v_who, 'role', 'authenticated')::text, true);
  FOREACH v_fn IN ARRAY ARRAY['edit', 'undo'] LOOP
    v_err := NULL;
    BEGIN
      IF v_fn = 'edit' THEN
        PERFORM public.admin_edit_listing(NULL, '{"title":"x"}'::jsonb, 'undo');
      ELSE
        PERFORM public.admin_undo_listing_edit(NULL, now());
      END IF;
    EXCEPTION WHEN OTHERS THEN
      v_err := SQLERRM;
    END;
    IF v_err IS DISTINCT FROM 'permission denied' THEN
      RAISE EXCEPTION 'L4d D6: the % door answered % to an identity with no permission', v_fn, coalesce(v_err, 'nothing');
    END IF;
  END LOOP;
  PERFORM set_config('request.jwt.claims', '', true);
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('<MARK>') ON CONFLICT (version) DO NOTHING;
----- END MIGRATION -----
```
