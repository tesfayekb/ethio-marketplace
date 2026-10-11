# Bundle 11 — the Listings console, turn L1: the console's doors and the seller's notices (one migration): brief, version 1 (saved unchanged, 2026-10-11)

```text
BUNDLE 11 — THE LISTINGS CONSOLE, TURN L1 (2026-10-11). ONE TURN, ONE MIGRATION. Tier A (admin doors that read every listing and write another person's listing, a state-machine amendment, the audit log, a new table with row security). No page, no new string, no package change.
Base: dev 232bfc02ca5509b2931a9f93c516fad36b72f989. This file is public: it is written as build instructions.

ANSWERS TO TURN G3b
- Verified by diff of 7f2db333..232bfc02 (with the platform's two intermediate pushes, afabe235 and e8d045e5): the 15 carrier and map paths and the brief, each byte-identical to the supervisor's copy. Your report named HEAD e8d045e5; the platform's last push, 232bfc02, came after it — expected.
- CI on 232bfc02 (run 38123872191): SUCCESS, promoted to main; no failure, no retried test.

WHAT THIS TURN BUILDS (the approved spec, D134, D136, D137 — it enters the repository with this turn as docs/governance/listings-console-spec.md, with an addendum "as built in turn L1")
- The migration (the appendix; one file), in six parts:
  - A. `seller_notices` — what an admin did to a seller's listing, kept for the seller: the listing, the kind (admin_edit, admin_remove, admin_restore, admin_send_back), the fields named, a reason from a short list, an optional note (at most 500 characters), when, and when read. Row security: the seller reads only their own; no browser role writes.
  - B. `transition_listing` redeclared whole from 20261009070008 with one change: removed → screening (REQ-022 as amended by D137) — enforcement only, with a fresh second factor; a listing removed for a severe screening reason (its screening flag `severe`) by a super admin only. Every other line stands byte for byte.
  - C. `admin_list_listings` — All listings: listings:view; drafts never; the views live (active, reduced), waiting (screening, held), ended (expired, sold), removed (rejected, removed) and all; search by a title's words or a listing's id; filters country (the listing's place), category with everything under it, seller (public name, a business's name; the e-mail too for profiles:view holders), date posted, tier; newest first; at most 100 a page, each row with the total.
  - D. `admin_edit_listing` — an admin's content edit: listings:enforce with a fresh second factor; never a draft ("listing not found"), a removed listing or the admin's own; title, description, category, specs, price, and removing photos (never adding one); the seller's content rules (the seller's validator through step 7); a live listing stays live; one revision (kind edit), one audit row (listing.admin_edit) and one seller notice.
  - E. `admin_move_listing` — Remove, Restore and Send back to review, each with a reason and an optional note: listings:enforce with a fresh second factor; through `transition_listing`; one audit row and one seller notice.
  - F. Proofs F1–F5 (catalogue reads, and calls with no session or with a scratch identity that holds nothing — no account row is written).
- scripts/public-surface-allowlist.txt: five lines (the table and the four doors, each with its reason).
- scripts/e2e-select.ts: the area `admin-listings` (the migration's header names it).
- e2e/admin-listings.spec.ts (NEW): AL-1..AL-9 (below).
- Docs: docs/governance/listings-console-spec.md (NEW: the approved spec and its addendum), docs/features/admin-listings.md (NEW), the changelog, the roadmap (line 3; the L1 line).

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- The admin's edit is judged by the seller's content rules (validate_listing_draft through step 7). Step 8's checks (the seller's public name, legal names, confirmed home country) judge the seller, not the content, so they do not block an admin's correction.
- The reasons:
  - Edit: wrong category, misleading details, contact details in the text, a photo, the site's rules, other.
  - Remove: a prohibited item, misleading details, a duplicate ad, contact details in the text, a photo, the site's rules, other.
  - Restore: removed in error, an appeal accepted, other.
  - Send back: wrong category, misleading details, contact details in the text, a photo, the site's rules, other.
  - "Other" needs a note.
- A severe removal is the listing's screening flag `severe` (the one the state door already reads); nothing sets it before stage 2.
- The notice names the fields as the seller reads them and carries no admin's identity; the audit row does.
- A removed photo's row leaves the listing; its file stays in storage and the revision keeps the whole row (a later Restore-photo).
- The seller's e-mail is returned, and searchable, only for holders of profiles:view (the Users console's rule).
- Moves count against the `revise` dial (120 an hour per person) through the state door, as the reviewer's Approve does.
- Correction to the approved spec (in its addendum): the seller's edit sends a listing to the Screening queue; no automatic screening call exists before stage 2. The admin's door carries the marked seam where stage 2's gateway call goes.

TESTS — e2e/admin-listings.spec.ts (NEW). Scratch sellers, listings, places, categories and roles of the file only, removed in afterEach (J3, G27); rows found by their own id or seller (G28); DB truth through the service client.
- AL-1: All listings refuses a plain account; a listings:view holder reads a listing by its id (the public name, no e-mail) but never a draft, and cannot search by e-mail; a super admin (profiles:view) reads and searches the e-mail.
- AL-2: the views, the filters (category branch, country, tier, date, paging with the total) and newest first.
- AL-3: Edit refuses a plain account, a reviewer, an enforcer without a second factor, the admin's own listing, a draft, a removed listing, a field that is not editable and "other" without a note — and writes nothing.
- AL-4: an edit changes the title, the listing stays active, and one revision, one audit row and one notice are written; the same values again answer "nothing changed".
- AL-5: a title with a phone number is refused for the admin exactly as for the seller (the seller's edit_listing, same refusals); nothing is written.
- AL-6: removing the cover photo — the row goes, the next photo becomes the cover, the revision keeps the removed row.
- AL-7: Remove, then Restore — back to Waiting, never straight to live; two state revisions, two audit rows, two notices.
- AL-8: Restore — not by the owner (the state door), not without a second factor; a severe removal refused for an enforcer and restored by a super admin.
- AL-9: Send back to review; a sold listing cannot be sent back; the seller reads their own notice, cannot write one, and another account reads none.
- Not edited: every other test.

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, turn G3b applied)
- The migration on a local Postgres 16 with stand-ins (listings, photos, places, categories with their tree, profiles, accounts, the audit log, the revisions; has_permission, is_super_admin, the second-factor gate, the validator and the dial as stand-ins with the same arguments; the live transition_listing text, whose body hash equals census (b)): every proof passes, and the doors behave as AL-1..AL-9 expect.
- Eleven variants, each failing its proof: anon allowed to run the list door (F2); the edit door without its second factor (F3); the edit door moving the listing to screening (F3); the list door showing drafts (F3); the move door without the super-admin rule (F3); the notices readable by everyone (F1); the notices writable by the browser (F1); the state door restoring for anyone (F3); the move door without its permission check (F3); the list door VOLATILE (F2); the list door giving e-mails to every viewer (F3).
- scripts/check-migrations.sh on the repository's migrations plus this text, with the five allowlist lines: every guard OK (and the public-surface guard fails without them).
- typecheck, format, lint (0 errors, 33 warnings), 643 unit tests (102 files, the test-id guard included), the usage maps, the hardcoded-string scan, the selector self-test: all clean.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-11-turn-16.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines (expect commit 232bfc02…, conclusion SUCCESS). If it shows another commit or another conclusion, STOP and report. You cannot git-fetch that branch;
  2. step 0;
  3. the census (below). If any result differs from what it expects, STOP and report: write nothing else;
  4. the carrier, then the hashes;
  5. the checks;
  6. the migration LAST, then its read-back;
  7. the report;
  8. END THE TURN.
  Do not stop between steps.
- The migration is the last thing written, because the database tool applies it on ethio-prod the moment it is saved. The operator will see the "Modify Supabase database" dialog and allow it.
- The expected red window (G35): CI on any commit the platform pushes before the migration file exists runs AL-1..AL-9 against a staging database without the doors, so they fail there. That is expected and is not fixed. CI on the final commit stops at its preflight ("STAGING BEHIND") until the operator applies the migration on ethio-staging; then "Re-run failed jobs" judges the turn.
- If any rule of yours conflicts with the text, STOP before saving and quote that rule's exact words in the report.
- Production reads are SELECT-only. Reports carry counts, booleans and names of tables, columns, functions, roles and policies. Never an e-mail address, a user id, a token, a phone number or a row of user data.
- Tests (G38): no assertion loosened, no timeout raised, no retry added. A test this brief does not name is not edited.
- Scope — these files only: the one new migration file (the database tool names it), the 7 carrier paths and the brief. The platform may regenerate src/integrations/supabase/types.ts; that is allowed, name it in the report. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-11-turn-16.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 4 files → each equal to:
  3e2f15aeb663c6dde90b96381c28cbbb812df944e94604e3ae72bef4965f4a24  docs/_changelog.md
  776e7fa0652d9a9d2d569beb3faa1c9f739742658c31c197cc3efa856635101b  roadmap.md
  8ea1a8a97119b6e52d22c66dcaf5eb1f70ac0b02990e16aee58ad6d97bdd0a9d  scripts/e2e-select.ts
  578d3a2c95871d5c73b63ad99986b045f18b5c188a67440a4be73b4e1841cd19  scripts/public-surface-allowlist.txt
- (c) `ls docs/features/admin-listings.md docs/governance/listings-console-spec.md e2e/admin-listings.spec.ts` → "No such file or directory" for each.
- On ethio-prod with your query tool (SELECT only):
- (d) `select md5(prosrc), pg_get_function_identity_arguments(oid), provolatile, prosecdef, proconfig from pg_proc where oid = 'public.transition_listing(uuid,text)'::regprocedure;` → db204ed3a9c0d933f169d9800f6aac30 | p_listing_id uuid, p_new_status text | v | t | {search_path=public}. A different hash means the live state door is not the repository's text: STOP and report.
- (e) `select count(*) from pg_proc where pronamespace = 'public'::regnamespace and proname in ('admin_list_listings', 'admin_edit_listing', 'admin_move_listing');` → 0; `select to_regclass('public.seller_notices');` → null.
- (f) `select proname, pg_get_function_identity_arguments(oid) from pg_proc where pronamespace = 'public'::regnamespace and proname in ('cat_descendants', 'has_permission', 'is_super_admin', 'rate_gate', 'require_step_up_if_needed', 'validate_listing_draft') order by 1, 2;` → six rows:
  - cat_descendants | p_root uuid
  - has_permission | p_user_id uuid, p_resource text, p_action text
  - is_super_admin | p_user_id uuid
  - rate_gate | p_action text
  - require_step_up_if_needed | p_resource text, p_action text
  - validate_listing_draft | p_uid uuid, p_step smallint, p_category_id uuid, p_title text, p_description text, p_video_url text, p_attributes jsonb, p_price_mode text, p_price_amount numeric, p_price_currency character, p_price_period text, p_poster_expires_at timestamp with time zone, p_coverage uuid[], p_contact_pref jsonb, p_prior jsonb, p_price_bp integer, p_price_negotiable boolean
- (g) `select count(*) from information_schema.columns where table_schema = 'public' and ((table_name = 'listings' and column_name in ('screening', 'tier', 'cover_photo_id', 'published_first_at', 'published_at', 'expires_at', 'poster_expires_at', 'video_url', 'price_unit', 'price_unit_text', 'price_bp', 'price_negotiable', 'contact_pref', 'attributes', 'location_id', 'home_country_code', 'category_id', 'seller_id', 'status', 'title', 'description', 'price_mode', 'price_amount', 'price_currency', 'price_period', 'created_at', 'updated_at')) or (table_name = 'listing_photos' and column_name in ('id', 'listing_id', 'paths', 'storage_path', 'display_order')) or (table_name = 'listing_locations' and column_name in ('listing_id', 'location_id', 'position')) or (table_name = 'profiles' and column_name in ('user_id', 'seller_alias', 'seller_type', 'business_name', 'account_status')) or (table_name = 'locations' and column_name in ('id', 'name_en', 'name_am', 'country_code')) or (table_name = 'categories' and column_name in ('id', 'name_en', 'name_am')) or (table_name = 'listing_revisions' and column_name in ('listing_id', 'seller_id', 'kind', 'before', 'after', 'actor')) or (table_name = 'audit_log' and column_name in ('actor_id', 'action', 'entity_type', 'entity_id', 'meta')));` → 58
- (h) `select max(version) from public.migration_marks;` → 20261011030000

THE CARRIER — L1-TURN-CARRIER-2026-10-11.md (45,812 bytes; sha256 ac2b99040fef4619fa6a573bca4cdf3c51fa3f42fea549990ba233f62c5119ab; 8 sections)
- Its first line starts "L1 TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`.
- Modes:
  - NEW: a file that must not exist yet;
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file;
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed.

THE HASHES — `sha256sum` each of the 7 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  630f84e2e75b84469bc01d37b38ced03fb101a83b49c020ccd7eab864b9aee84  docs/_changelog.md
  fcc896d86f55ac275d28b671f4f75f858064552dc69e2fa53dde792595f5acaf  docs/features/admin-listings.md
  66d7c5c659aaec902eda2689f3ec5ad83ce57c06aa6cb9d3e4648b2a8e08dd09  docs/governance/listings-console-spec.md
  1bef04c6a9b927c3b294558faf4c819d1310f24876594a2846fb81687223f546  e2e/admin-listings.spec.ts
  3042f94af69c52141bbd53f65549e8ec933eb1f367a8de654829b1d161667398  roadmap.md
  0b28358605524952877f20ef709647ed08df9397d11fe778c868b2c33e42fad6  scripts/e2e-select.ts
  9a0aaef5469301b791dc5ba716e1d91822c08c5b31d28dde741c6bf301d9d0ec  scripts/public-surface-allowlist.txt

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run typecheck` clean;
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings;
- `bun run test:unit` 643 passed (102 files);
- `bun run i18n:map-guard` "usage maps match the tree." on the first run (no key changes);
- `bun run scripts/e2e-select.ts --self-test` OK;
- `bash scripts/check-hardcoded-strings.sh` findings: 0.

THE BROWSER RUN — not this turn. AL-1..AL-9 need the doors on ethio-staging, which the operator applies after the turn; CI on the final commit is the proof (and the local browser does not start, INC-506).

THE MIGRATION RULES (G39 — every one applies)
- The text is between the BEGIN and END lines of the appendix below. Write it EXACTLY, changing only `<MARK>`. Before the change, its sha256 is 7f2a91e18e102a482b87b1872b711e3acba5a676ad11aa73b36f7273557d8ba2 (33,884 bytes, 650 lines, ending with a newline).
- Check it in a scratch folder first (after the carrier, so the allowlist holds the five lines):
  - copy supabase/migrations/*.sql into a temporary folder;
  - add the text under a name of the form 20261011120000_l1-check.sql;
  - run `MIGRATIONS_DIR=<that folder> bash scripts/check-migrations.sh`.
  Paste its "guard OK" lines and "Migration guard OK".
- `<MARK>` is chosen at apply time:
  - read now() at time zone 'utc' on ethio-prod;
  - round it up to the next whole hour and add one hour (add twelve hours instead if the save dialog may wait);
  - the mark must be later than the saved file's own stamp AND above 20261011030000 (the newest mark).
- Then hand the FINAL text to the database tool ONCE. Never a stub, a comment or a draft (INC-491).
- A clean apply is the proofs' pass: they RAISE EXCEPTION on any failure.

THE READ-BACK (ethio-prod, your query tool, SELECT only; paste each result)
- `select version from public.migration_marks where version = '<MARK>';` → one row;
- census (d) again → 076dbf787bf3b483a6bd011de15b660a | p_listing_id uuid, p_new_status text | v | t | {search_path=public};
- `select proname, prosecdef, provolatile, has_function_privilege('anon', oid, 'EXECUTE'), has_function_privilege('authenticated', oid, 'EXECUTE') from pg_proc where pronamespace = 'public'::regnamespace and proname in ('admin_list_listings', 'admin_edit_listing', 'admin_move_listing') order by 1;` → admin_edit_listing | t | v | f | t; admin_list_listings | t | s | f | t; admin_move_listing | t | v | f | t;
- `select c.relrowsecurity, has_table_privilege('anon', c.oid, 'SELECT'), has_table_privilege('authenticated', c.oid, 'SELECT'), has_table_privilege('authenticated', c.oid, 'INSERT') from pg_class c where c.oid = 'public.seller_notices'::regclass;` → t | f | t | f.

THE REPORT
- Done or not done, by step.
- The six ci-status lines.
- The census results (a)–(h).
- The 7 sha256sum lines and the brief's.
- `git diff --name-only 232bfc02ca5509b2931a9f93c516fad36b72f989` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only 232bfc02ca5509b2931a9f93c516fad36b72f989 HEAD` too. Expect the 7 carrier paths, the brief and the one migration file (and types.ts if regenerated).
- The checks.
- The check-migrations "guard OK" lines; the mark and the now() reading it came from; the apply outcome; the read-back.
- The line "apply <uuid-fragment of the migration's filename> → expect mark <MARK>", for the operator's staging apply.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only). The database change is undone only by a new migration — never by editing this file.

AFTER THIS TURN (for the operator): apply the migration on ethio-staging (the SQL editor), read back its mark, then "Re-run failed jobs" on the CI run (its E2E preflight waits for staging); send the executor nothing until CI on the final commit is read.

APPENDIX — THE MIGRATION TEXT (write it exactly; change only <MARK>)
----- BEGIN MIGRATION -----
-- Bundle 11, the Listings console, turn L1 (2026-10-11). Tier A. The console's doors and the seller's notices
-- (D134, D136, D137; the spec docs/governance/listings-console-spec.md, approved by the operator 2026-10-11).
-- e2e-areas: admin-listings
-- A. seller_notices — what an admin did to a seller's listing, kept for the seller: the listing, the kind
--    (admin_edit, admin_remove, admin_restore, admin_send_back), the fields named, a reason from a short list and
--    an optional note, when, and when read. The seller reads only their own rows; no browser role writes. Nothing
--    shows them yet: My ads (stage 4, D138) and notifications (stage 6) will.
-- B. transition_listing, redeclared whole from 20261009070008 with one change: removed -> screening (REQ-022 as
--    amended by D137) — enforcement only, with a fresh second factor; a listing removed for a severe screening
--    reason (screening->>'severe') by a super admin only. Every other line stands byte for byte.
-- C. admin_list_listings — All listings: listings:view; drafts never; the views live (active, reduced), waiting
--    (screening, held), ended (expired, sold), removed (rejected, removed) and all; search by title or listing id;
--    filters country (the listing's place), category branch, seller (public name or business name; e-mail too for
--    profiles:view holders), date posted, tier; newest first; paged with a total.
-- D. admin_edit_listing — an admin's content edit: listings:enforce with a fresh second factor; not a draft, not a
--    removed listing, not the admin's own; title, description, category, specs, price, and removing photos (never
--    adding one); the seller's content rules (validate_listing_draft through step 7 — the seller's own identity
--    checks of step 8 judge the seller, not the content); a live listing stays live; one revision (edit), one
--    audit row (listing.admin_edit) and one seller notice per edit.
-- E. admin_move_listing — Remove, Restore and Send back to review from the console: listings:enforce with a fresh
--    second factor, a reason and an optional note; through transition_listing; one audit row and one seller notice.
-- F. Proofs: catalogue reads and calls with no session only; the doors' behaviour is proven by AL-1..AL-9.

-- ===== A — the seller's notices =====
CREATE TABLE IF NOT EXISTS public.seller_notices (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id  uuid NOT NULL,
  listing_id uuid NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
  kind       text NOT NULL CHECK (kind IN ('admin_edit','admin_remove','admin_restore','admin_send_back')),
  fields     text[] NOT NULL DEFAULT '{}'::text[],
  reason     text NOT NULL CHECK (reason IN ('wrong_category','misleading','prohibited','duplicate',
                                             'contact_in_text','photo','rules','removed_in_error',
                                             'appeal_accepted','other')),
  note       text CHECK (note IS NULL OR char_length(note) BETWEEN 1 AND 500),
  created_at timestamptz NOT NULL DEFAULT now(),
  read_at    timestamptz
);
CREATE INDEX IF NOT EXISTS seller_notices_seller_idx ON public.seller_notices (seller_id, created_at DESC);
CREATE INDEX IF NOT EXISTS seller_notices_listing_idx ON public.seller_notices (listing_id);

-- Supabase's default privileges hand a new table to the browser roles at birth: take them back, then grant the
-- seller's read alone.
REVOKE ALL ON public.seller_notices FROM PUBLIC, anon, authenticated;
GRANT SELECT ON public.seller_notices TO authenticated;
GRANT ALL ON public.seller_notices TO service_role;
ALTER TABLE public.seller_notices ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS seller_notices_own_read ON public.seller_notices;
CREATE POLICY seller_notices_own_read ON public.seller_notices
  FOR SELECT TO authenticated USING (seller_id = auth.uid());

-- ===== B — the state door, with Restore (D137) =====
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
  IF p_new_status NOT IN ('draft','screening','active','reduced','rejected','held','expired','sold','removed') THEN
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

  -- The gateway/reviewer branch: only these roles may put a listing in front of
  -- a visitor. No owner door reaches 'active'.
  IF p_new_status IN ('active','reduced','rejected','held') THEN
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
    v_ok := v_row.status IN ('active','reduced');
  ELSIF p_new_status = 'removed' THEN
    IF v_owner AND NOT (v_service OR v_enforcer) THEN
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

  IF p_new_status IN ('active','reduced') THEN
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

-- ===== C — All listings =====
CREATE OR REPLACE FUNCTION public.admin_list_listings(
  p_view text DEFAULT 'all', p_search text DEFAULT NULL, p_country text DEFAULT NULL,
  p_category uuid DEFAULT NULL, p_seller text DEFAULT NULL, p_from date DEFAULT NULL,
  p_to date DEFAULT NULL, p_tier text DEFAULT NULL, p_limit integer DEFAULT 25, p_offset integer DEFAULT 0)
RETURNS TABLE (
  id uuid, title text, status text, tier text, severe boolean,
  seller_id uuid, seller_alias text, seller_business_name text, seller_email text,
  category_id uuid, category_name_en text, category_name_am text,
  place_name_en text, place_name_am text, country_code text,
  price_mode text, price_amount numeric, price_currency text, price_period text,
  price_bp integer, price_negotiable boolean,
  cover_paths jsonb, cover_storage_path text, photo_count integer,
  created_at timestamptz, published_at timestamptz, expires_at timestamptz, updated_at timestamptz,
  total_count bigint)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid      uuid := auth.uid();
  v_email    boolean;
  v_statuses text[];
  v_term     text := lower(btrim(coalesce(p_search, '')));
  v_id       uuid;
  v_seller   text := lower(btrim(coalesce(p_seller, '')));
  v_country  text := upper(btrim(coalesce(p_country, '')));
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'not signed in';
  END IF;
  IF NOT public.has_permission(v_uid, 'listings', 'view') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  v_statuses := CASE coalesce(p_view, 'all')
    WHEN 'live'    THEN ARRAY['active','reduced']
    WHEN 'waiting' THEN ARRAY['screening','held']
    WHEN 'ended'   THEN ARRAY['expired','sold']
    WHEN 'removed' THEN ARRAY['rejected','removed']
    WHEN 'all'     THEN ARRAY['screening','active','reduced','rejected','held','expired','sold','removed']
  END;
  IF v_statuses IS NULL THEN
    RAISE EXCEPTION 'unknown view';
  END IF;
  IF p_tier IS NOT NULL AND p_tier NOT IN ('premium','featured','regular') THEN
    RAISE EXCEPTION 'unknown tier';
  END IF;
  -- The seller's e-mail is read only by holders of profiles:view (the Users console's own rule).
  v_email := public.has_permission(v_uid, 'profiles', 'view');
  IF v_term ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$' THEN
    v_id := v_term::uuid;
  END IF;

  RETURN QUERY
  SELECT l.id, l.title, l.status, l.tier,
         coalesce(l.screening->>'severe', 'false') = 'true',
         l.seller_id, p.seller_alias,
         CASE WHEN p.seller_type = 'business' THEN p.business_name END,
         CASE WHEN v_email THEN u.email::text END,
         l.category_id, c.name_en, c.name_am,
         loc.name_en, loc.name_am, coalesce(loc.country_code, l.home_country_code)::text,
         l.price_mode, l.price_amount, l.price_currency::text, l.price_period,
         l.price_bp, l.price_negotiable,
         cover.paths, cover.storage_path,
         (SELECT count(*)::integer FROM public.listing_photos ph WHERE ph.listing_id = l.id),
         l.created_at, l.published_at, l.expires_at, l.updated_at,
         count(*) OVER ()
    FROM public.listings l
    LEFT JOIN public.profiles p ON p.user_id = l.seller_id
    LEFT JOIN auth.users u ON u.id = l.seller_id
    LEFT JOIN public.categories c ON c.id = l.category_id
    LEFT JOIN public.locations loc ON loc.id = l.location_id
    LEFT JOIN LATERAL (
      SELECT ph.paths, ph.storage_path
        FROM public.listing_photos ph
       WHERE ph.listing_id = l.id
       ORDER BY (ph.id = l.cover_photo_id) DESC, ph.display_order
       LIMIT 1) cover ON true
   WHERE l.status = ANY (v_statuses)
     AND l.status <> 'draft'
     AND (v_term = ''
          OR (v_id IS NOT NULL AND l.id = v_id)
          OR (v_id IS NULL AND position(v_term IN lower(l.title)) > 0))
     AND (v_country = '' OR coalesce(loc.country_code, l.home_country_code) = v_country)
     AND (p_category IS NULL OR l.category_id IN (SELECT d.id FROM public.cat_descendants(p_category) d))
     AND (v_seller = ''
          OR position(v_seller IN lower(coalesce(p.seller_alias, ''))) > 0
          OR (p.seller_type = 'business' AND position(v_seller IN lower(coalesce(p.business_name, ''))) > 0)
          OR (v_email AND position(v_seller IN lower(coalesce(u.email::text, ''))) > 0))
     AND (p_from IS NULL OR coalesce(l.published_first_at, l.created_at)::date >= p_from)
     AND (p_to IS NULL OR coalesce(l.published_first_at, l.created_at)::date <= p_to)
     AND (p_tier IS NULL OR l.tier = p_tier)
   ORDER BY coalesce(l.published_at, l.created_at) DESC, l.id DESC
   LIMIT LEAST(GREATEST(coalesce(p_limit, 25), 1), 100)
  OFFSET GREATEST(coalesce(p_offset, 0), 0);
END $$;

REVOKE ALL ON FUNCTION public.admin_list_listings(text, text, text, uuid, text, date, date, text, integer, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_list_listings(text, text, text, uuid, text, date, date, text, integer, integer) TO authenticated;
GRANT ALL ON FUNCTION public.admin_list_listings(text, text, text, uuid, text, date, date, text, integer, integer) TO service_role;

-- ===== D — an admin's content edit =====
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
  v_coverage uuid[];
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
  IF p_reason IS NULL OR p_reason NOT IN ('wrong_category','misleading','contact_in_text','photo','rules','other') THEN
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

  SELECT coalesce(array_agg(ll.location_id ORDER BY ll.position), ARRAY[]::uuid[]) INTO v_coverage
    FROM public.listing_locations ll WHERE ll.listing_id = p_listing_id;

  -- The seller's content rules, judged through the contact step (7), with every field the admin does not change
  -- read from the listing as it stands.
  v_val := public.validate_listing_draft(v_prev.seller_id, 7::smallint,
    CASE WHEN p_changes ? 'category_id' THEN (p_changes->>'category_id')::uuid ELSE v_prev.category_id END,
    CASE WHEN p_changes ? 'title' THEN p_changes->>'title' ELSE v_prev.title END,
    CASE WHEN p_changes ? 'description' THEN p_changes->>'description' ELSE v_prev.description END,
    v_prev.video_url,
    CASE WHEN p_changes ? 'attributes' THEN p_changes->'attributes' ELSE v_prev.attributes END,
    CASE WHEN p_changes ? 'price_mode' THEN p_changes->>'price_mode' ELSE v_prev.price_mode END,
    CASE WHEN p_changes ? 'price_amount' THEN (p_changes->>'price_amount')::numeric ELSE v_prev.price_amount END,
    CASE WHEN p_changes ? 'price_currency' THEN (p_changes->>'price_currency')::char(3) ELSE v_prev.price_currency END,
    CASE WHEN p_changes ? 'price_period' THEN p_changes->>'price_period' ELSE v_prev.price_period END,
    v_prev.poster_expires_at, v_coverage, v_prev.contact_pref, v_prev.attributes,
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

-- ===== E — Remove, Restore, Send back to review =====
CREATE OR REPLACE FUNCTION public.admin_move_listing(
  p_listing_id uuid, p_to text, p_reason text, p_note text DEFAULT NULL)
RETURNS jsonb
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid  uuid := auth.uid();
  v_row  public.listings%ROWTYPE;
  v_note text := nullif(btrim(coalesce(p_note, '')), '');
  v_kind text;
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
  IF p_to IS NULL OR p_to NOT IN ('removed','screening') THEN
    RAISE EXCEPTION 'unknown move';
  END IF;

  SELECT * INTO v_row FROM public.listings WHERE id = p_listing_id FOR UPDATE;
  IF NOT FOUND OR v_row.status = 'draft' THEN
    RAISE EXCEPTION 'listing not found';
  END IF;
  IF v_row.seller_id = v_uid THEN
    RAISE EXCEPTION 'your own listing is changed the seller''s way';
  END IF;
  v_kind := CASE
    WHEN p_to = 'removed' AND v_row.status <> 'removed' THEN 'admin_remove'
    WHEN p_to = 'screening' AND v_row.status = 'removed' THEN 'admin_restore'
    WHEN p_to = 'screening' AND v_row.status IN ('active','reduced') THEN 'admin_send_back'
  END;
  IF v_kind IS NULL THEN
    RAISE EXCEPTION 'illegal move: % -> %', v_row.status, p_to;
  END IF;

  IF p_reason IS NULL OR NOT (
       (v_kind = 'admin_remove' AND p_reason IN ('prohibited','misleading','duplicate','contact_in_text','photo','rules','other'))
    OR (v_kind = 'admin_restore' AND p_reason IN ('removed_in_error','appeal_accepted','other'))
    OR (v_kind = 'admin_send_back' AND p_reason IN ('wrong_category','misleading','contact_in_text','photo','rules','other'))) THEN
    RAISE EXCEPTION 'unknown reason';
  END IF;
  IF p_reason = 'other' AND v_note IS NULL THEN
    RAISE EXCEPTION 'a note is required';
  END IF;
  IF v_note IS NOT NULL AND char_length(v_note) > 500 THEN
    RAISE EXCEPTION 'the note is too long';
  END IF;
  -- D137 — read before the second factor is asked, so the refusal names the rule.
  IF v_kind = 'admin_restore' AND coalesce(v_row.screening->>'severe','false') = 'true'
     AND NOT public.is_super_admin(v_uid) THEN
    RAISE EXCEPTION 'a listing removed for a severe reason is restored by a super admin only';
  END IF;
  PERFORM public.require_step_up_if_needed('listings', 'enforce');

  -- The state machine moves the listing and writes its revision (kind state).
  PERFORM public.transition_listing(p_listing_id, p_to);

  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
    VALUES (v_uid, 'listing.' || v_kind, 'listing', p_listing_id::text,
            jsonb_strip_nulls(jsonb_build_object('from', v_row.status, 'to', p_to, 'reason', p_reason, 'note', v_note)));
  INSERT INTO public.seller_notices (seller_id, listing_id, kind, fields, reason, note)
    VALUES (v_row.seller_id, p_listing_id, v_kind, ARRAY['status'], p_reason, v_note);

  RETURN jsonb_build_object('ok', true, 'kind', v_kind, 'status', p_to);
END $$;

REVOKE ALL ON FUNCTION public.admin_move_listing(uuid, text, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_move_listing(uuid, text, text, text) TO authenticated;
GRANT ALL ON FUNCTION public.admin_move_listing(uuid, text, text, text) TO service_role;

-- ===== F — proofs (catalogue reads, and calls with no session or a scratch identity that holds nothing) =====
DO $proof$
DECLARE
  v_fn  text;
  v_def text;
  v_ok  boolean;
  v_err text;
  v_who uuid := gen_random_uuid();
BEGIN
  -- F1: the notices table — row security on, the seller's read policy alone, the browser roles read only.
  IF NOT (SELECT c.relrowsecurity FROM pg_catalog.pg_class c WHERE c.oid = 'public.seller_notices'::regclass) THEN
    RAISE EXCEPTION 'L1 F1: row security is off on seller_notices';
  END IF;
  IF (SELECT count(*) FROM pg_catalog.pg_policies p WHERE p.schemaname = 'public' AND p.tablename = 'seller_notices') <> 1
     OR NOT EXISTS (SELECT 1 FROM pg_catalog.pg_policies p
                     WHERE p.schemaname = 'public' AND p.tablename = 'seller_notices'
                       AND p.policyname = 'seller_notices_own_read' AND p.cmd = 'SELECT'
                       AND p.qual = '(seller_id = auth.uid())') THEN
    RAISE EXCEPTION 'L1 F1: the notices policy';
  END IF;
  IF has_table_privilege('anon', 'public.seller_notices', 'SELECT')
     OR NOT has_table_privilege('authenticated', 'public.seller_notices', 'SELECT')
     OR has_table_privilege('authenticated', 'public.seller_notices', 'INSERT')
     OR has_table_privilege('authenticated', 'public.seller_notices', 'UPDATE')
     OR has_table_privilege('authenticated', 'public.seller_notices', 'DELETE') THEN
    RAISE EXCEPTION 'L1 F1: the notices privileges';
  END IF;

  -- F2: the four doors are definers with a fixed search path; the signed-in role runs them, anon and PUBLIC do not.
  FOREACH v_fn IN ARRAY ARRAY[
      'public.transition_listing(uuid,text)',
      'public.admin_list_listings(text,text,text,uuid,text,date,date,text,integer,integer)',
      'public.admin_edit_listing(uuid,jsonb,text,text)',
      'public.admin_move_listing(uuid,text,text,text)'] LOOP
    IF NOT (SELECT p.prosecdef FROM pg_catalog.pg_proc p WHERE p.oid = v_fn::regprocedure)
       OR (SELECT p.proconfig FROM pg_catalog.pg_proc p WHERE p.oid = v_fn::regprocedure) <> ARRAY['search_path=public'] THEN
      RAISE EXCEPTION 'L1 F2: % is not a definer with its search path', v_fn;
    END IF;
    IF has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE')
       OR EXISTS (SELECT 1 FROM pg_catalog.pg_proc p, aclexplode(p.proacl) x
                   WHERE p.oid = v_fn::regprocedure AND x.grantee = 0) THEN
      RAISE EXCEPTION 'L1 F2: % privileges', v_fn;
    END IF;
  END LOOP;
  IF (SELECT p.provolatile FROM pg_catalog.pg_proc p WHERE p.oid = 'public.admin_list_listings(text,text,text,uuid,text,date,date,text,integer,integer)'::regprocedure) <> 's'
     OR (SELECT p.provolatile FROM pg_catalog.pg_proc p WHERE p.oid = 'public.admin_edit_listing(uuid,jsonb,text,text)'::regprocedure) <> 'v'
     OR (SELECT p.provolatile FROM pg_catalog.pg_proc p WHERE p.oid = 'public.admin_move_listing(uuid,text,text,text)'::regprocedure) <> 'v'
     OR (SELECT p.provolatile FROM pg_catalog.pg_proc p WHERE p.oid = 'public.transition_listing(uuid,text)'::regprocedure) <> 'v' THEN
    RAISE EXCEPTION 'L1 F2: volatility';
  END IF;

  -- F3: the gates, in order.
  v_def := pg_get_functiondef('public.transition_listing(uuid,text)'::regprocedure);
  IF v_def NOT LIKE '%require_step_up_if_needed(''listings'', ''review'')%'
     OR v_def NOT LIKE '%ELSIF p_new_status = ''screening'' THEN%IF v_row.status = ''removed'' THEN%IF NOT (v_service OR v_enforcer) THEN%restored by a super admin only%require_step_up_if_needed(''listings'', ''enforce'')%v_ok := v_row.status IN (''draft'',''active'',''reduced'',''rejected'',''expired'',''sold'');%require_step_up_if_needed(''listings'', ''enforce'')%' THEN
    RAISE EXCEPTION 'L1 F3: transition_listing''s restore branch or a step-up call';
  END IF;
  v_def := pg_get_functiondef('public.admin_list_listings(text,text,text,uuid,text,date,date,text,integer,integer)'::regprocedure);
  IF v_def NOT LIKE '%has_permission(v_uid, ''listings'', ''view'')%has_permission(v_uid, ''profiles'', ''view'')%CASE WHEN v_email THEN u.email::text END%l.status <> ''draft''%' THEN
    RAISE EXCEPTION 'L1 F3: admin_list_listings''s gates';
  END IF;
  v_def := pg_get_functiondef('public.admin_edit_listing(uuid,jsonb,text,text)'::regprocedure);
  IF v_def NOT LIKE '%has_permission(v_uid, ''listings'', ''enforce'')%require_step_up_if_needed(''listings'', ''enforce'')%v_prev.status = ''draft''%v_prev.seller_id = v_uid%validate_listing_draft(v_prev.seller_id, 7::smallint,%INSERT INTO public.listing_revisions%INSERT INTO public.audit_log%INSERT INTO public.seller_notices%' THEN
    RAISE EXCEPTION 'L1 F3: admin_edit_listing''s gates';
  END IF;
  IF v_def LIKE '%status%=%''screening''%' THEN
    RAISE EXCEPTION 'L1 F3: an admin''s edit must not move the listing';
  END IF;
  v_def := pg_get_functiondef('public.admin_move_listing(uuid,text,text,text)'::regprocedure);
  IF v_def NOT LIKE '%has_permission(v_uid, ''listings'', ''enforce'')%v_row.status = ''draft''%v_row.seller_id = v_uid%is_super_admin(v_uid)%require_step_up_if_needed(''listings'', ''enforce'')%transition_listing(p_listing_id, p_to)%INSERT INTO public.audit_log%INSERT INTO public.seller_notices%' THEN
    RAISE EXCEPTION 'L1 F3: admin_move_listing''s gates';
  END IF;

  -- F4: with no session, the three new doors refuse before reading anything.
  FOREACH v_fn IN ARRAY ARRAY['list', 'edit', 'move'] LOOP
    v_ok := false;
    BEGIN
      IF v_fn = 'list' THEN
        PERFORM * FROM public.admin_list_listings();
      ELSIF v_fn = 'edit' THEN
        PERFORM public.admin_edit_listing(NULL, '{"title":"x"}'::jsonb, 'misleading');
      ELSE
        PERFORM public.admin_move_listing(NULL, 'removed', 'rules');
      END IF;
    EXCEPTION WHEN OTHERS THEN
      v_ok := (SQLERRM = 'not signed in');
    END;
    IF NOT v_ok THEN
      RAISE EXCEPTION 'L1 F4: the % door did not refuse a call with no session', v_fn;
    END IF;
  END LOOP;

  -- F5: a scratch identity that holds no permission (no account row is written) is refused by every new door.
  PERFORM set_config('request.jwt.claims', json_build_object('sub', v_who, 'role', 'authenticated')::text, true);
  FOREACH v_fn IN ARRAY ARRAY['list', 'edit', 'move'] LOOP
    v_err := NULL;
    BEGIN
      IF v_fn = 'list' THEN
        PERFORM * FROM public.admin_list_listings();
      ELSIF v_fn = 'edit' THEN
        PERFORM public.admin_edit_listing(NULL, '{"title":"x"}'::jsonb, 'misleading');
      ELSE
        PERFORM public.admin_move_listing(NULL, 'removed', 'rules');
      END IF;
    EXCEPTION WHEN OTHERS THEN
      v_err := SQLERRM;
    END;
    IF v_err IS DISTINCT FROM 'permission denied' THEN
      RAISE EXCEPTION 'L1 F5: the % door answered % to an identity with no permission', v_fn, coalesce(v_err, 'nothing');
    END IF;
  END LOOP;
  PERFORM set_config('request.jwt.claims', '', true);
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('<MARK>') ON CONFLICT (version) DO NOTHING;
----- END MIGRATION -----
```
