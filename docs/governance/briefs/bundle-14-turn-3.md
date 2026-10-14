# Bundle 14 — turn 3: D172 at the doors — neither the seller's nor staff's edit moves a posted ad to another category: brief, version 1 (saved unchanged, 2026-10-14)

```text
BUNDLE 14 — TURN 3 (2026-10-14). ONE TURN, ONE MIGRATION. No string. No package change.
Base: dev cf750bc6 (turn 2's landing). The census below proves every file and both doors by content. This file is public: it is written as build instructions.
Tier A: the migration (two definer doors redeclared: `admin_edit_listing` and the seller's `edit_listing`). Tier B: the E2E spec. Tier C: the docs, the roadmap and the changelog.

ANSWERS TO THE LAST TURN
- Turn 2 landed byte for byte: dev cf750bc6 is the supervisor's copy plus the saved brief. The mid-turn commit held the final files, so nothing was lost.
- Its CI run on cf750bc6 is under way; the supervisor reads it when it completes.
- The operator's answers to the seller-states study are D173 (recorded in the roadmap by this turn).

WHY THIS TURN
- D172 (the operator, 2026-10-14): "change category should not be an option on edit gioven so many things change after changing catgeory. so on edit we should never change any category. should disable that feature of changing category by user or admin on published add even waiting in que for approval because so many specification, descriptions etc will change." Turn 2 took "Change category" out of the admin's Edit. The doors still accept a new category: `admin_edit_listing` (any `category_id` in the changes) and the seller's `edit_listing` (its `p_category_id` is written as given). This turn makes both refuse it.

WHAT THIS TURN BUILDS
- The migration (the appendix):
  - A. `admin_edit_listing`, redeclared whole from 20261012042142 with one added check. It sits after the listing is read and before anything is judged or written. Another leaf is refused with "the category of a posted listing is not changed", unless the undo door is the caller (`app.listing_undo` on): undo may put back a category that an edit made before D172 had moved.
  - B. `edit_listing`, redeclared whole from 20261006225254 with one added check after its status check: another leaf is refused with the same words.
  - In both, the listing's own leaf passes, and every other line stands byte for byte. Each header (VOLATILE, SECURITY DEFINER, search_path public), REVOKE and GRANT is restated.
  - C. Proofs: both headers and privileges; each check's place in its body; the rest of each body equal to the earlier one (by md5 with the check taken out); a call with no session refused at the first gate.
- e2e/admin-listings.spec.ts: new AL-29 — the seller's `edit_listing` and staff's `admin_edit_listing` each refuse another leaf; the listing keeps its leaf and stays active, with no revision and no notice.
- docs/features/admin-listings.md ("Bundle 14 turn 3"); the changelog; the roadmap (line 3; turn 3's line; D173 on the My listings line; D149 after it).

DECIDED BY THE OPERATOR (2026-10-14)
- D172, above.
- D173 (his answers to the seller-states study, every recommended option): the seller sets Sold, Reserved and No longer available, each shown as a ribbon; "Price reduced" is automatic, under honesty rules; a Sold ad's page stays 30 days marked Sold; after bundle 14, My listings comes first, then D149. This turn only records D173 in the roadmap. The spec comes next.

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- The words of the refusal: "the category of a posted listing is not changed".
- A change that names the listing's own leaf is no move, and passes.
- The undo door alone may put back a category that an admin edit moved before D172. It restores the seller's own leaf, so it is not a new move.
- The reason "Wrong category" stays accepted by `admin_edit_listing`, but no screen offers it any more for an edit (turn 2). Taking it out of the door would change the undo door's contract for nothing.

TESTS
- New: AL-29 (browser). No other test changes. 845 unit tests (148 files), unchanged.
- Already true and kept: AL-5's seller edit names the listing's own leaf and reaches the content judge (its title refusal); PR-27's `edit_listing` calls name the draft's own leaf, and its second call is refused by the rate gate, which comes first.
- The expected red window (G35): CI on a commit pushed before the migration is on ethio-staging waits at its preflight ("STAGING BEHIND") until the operator has applied it there. AL-29 needs the migration.

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, dev cf750bc6 with this turn's files)
- Clean: typecheck (it covers e2e/), format, lint (0 errors, 33 warnings), 845 unit tests (148 files), the usage maps (they match), the hardcoded-strings guard (0 findings), the selector self-test.
- The migration on a local PostgreSQL 16, over stand-in tables and gates, with the two earlier declarations applied first:
  - before: md5(prosrc) 2b8996b334aa7c8b2140624a0baa7619 (admin_edit_listing) and fb9e713e8429fe55ffc18f85db4570a7 (edit_listing);
  - the migration applied, and its proofs passed;
  - staff with another leaf: refused; staff with the own leaf and a title: ok, fields ["title"]; the undo door's call (`app.listing_undo` on) with another leaf: ok; the seller with another leaf: refused; the seller with the own leaf: ok, status screening;
  - the migration with admin_edit_listing's check cut out failed its proof C2; the true migration then re-applied cleanly;
  - after: md5(prosrc) 07cd57b9091c3befe914e128318a6f44 and 98adc312e33792b177a8383cf8cee8b6; both v | t | {search_path=public}; anon cannot execute, authenticated can.
- `scripts/check-migrations.sh` with this migration as 20261014141500_b14t3-check.sql: "Migration guard OK".
- Not run by the supervisor: the browser tests (its sandbox cannot reach ethio-staging). CI on the final commit runs them.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-14-turn-3.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines. It may name turn 1's or turn 2's commit, with any conclusion. Whatever it shows, go on: the CI read is the supervisor's, and a fix it needs comes in the next turn. Do not stop on it. You cannot git-fetch that branch. Paste `git rev-parse HEAD`: this is <START>;
  2. step 0;
  3. the census (below), files and database. If any result differs from what it expects, STOP and report: write nothing else;
  4. the carrier, then the hashes;
  5. the checks;
  6. the migration LAST, then its read-back;
  7. the report;
  8. END THE TURN.
  Do not stop between steps.
- The migration is the last thing written, because the database tool applies it on ethio-prod the moment it is saved. The operator will see the "Modify Supabase database" dialog and allow it. The published site keeps working: it never sends a new category.
- The carrier's sections end with a newline each, blank lines included: write every section's bytes exactly as they stand between its header line and the next header. Check each written file's sha256 against the table before you go on.
- If any rule of yours conflicts with the text, STOP before saving and quote that rule's exact words in the report.
- Tests (G38): no assertion loosened, no timeout raised, no retry added. A test this brief does not name is not edited.
- Scope — these files only: the 4 carrier paths, the brief and the one new migration file (the database tool names it). The database: ethio-prod through your tools — SELECT only, except the migration itself. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-14-turn-3.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 4 files → each equal to:
  7bf24de65b80b495a3c77751724972bdbcb3e1e1f6b3eac867044f72f04b7416  docs/_changelog.md
  631af11c38785a4c6bf6e59576d095051f068860f1fa34c343a469f04c097e8c  docs/features/admin-listings.md
  1c6e40961c672850a301d7c281015534e0719eacf0891cf23ff541a5e4ce35a5  e2e/admin-listings.spec.ts
  afc4979140f5911194b3a3c2bad95643bf12345f953980c41b1a103d4b2311b0  roadmap.md
- (c) `grep -c "AL-29" e2e/admin-listings.spec.ts` → 0; `ls supabase/migrations | tail -1` → 20261014103719_ff659d97-f576-4881-95e7-01290b58c825.sql (bundle 13 turn 14's; no migration since).
- (d) ethio-prod, your query tool (SELECT only):
  - `select max(version) from public.migration_marks;` → 20261014140000;
  - `select p.proname, md5(p.prosrc), p.provolatile, p.prosecdef, p.proconfig from pg_proc p where p.oid in ('public.admin_edit_listing(uuid,jsonb,text,text)'::regprocedure, 'public.edit_listing(uuid,uuid,text,text,text,jsonb,text,numeric,character,text,timestamp with time zone,uuid[],jsonb,integer,boolean)'::regprocedure) order by 1;` → admin_edit_listing | 2b8996b334aa7c8b2140624a0baa7619 | v | t | {search_path=public}, then edit_listing | fb9e713e8429fe55ffc18f85db4570a7 | v | t | {search_path=public}. If either md5 differs, the live door is not the one this migration was built from: STOP before writing anything.

THE CARRIER — B14T3-TURN-CARRIER-2026-10-14.md (6,753 bytes; sha256 80710924352ed55d2b002c59341c61149310a037fc76cad9f11b1234f4268136; 6 sections)
- Its first line starts "B14T3 TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`. No blank line separates the sections.
- Modes:
  - REPLACE: the section is the whole file;
  - NEW: a new file; the section is the whole file;
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file (INSERT-AFTER 0: at the top of the file);
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed. If your upload arrives under another name, match it by its size and sha256.

THE HASHES — `sha256sum` each of the 4 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  e4b443f6eec887fccce8b4d2a39b935ce142ac209a6058ee4ff4b5c6c2030f6b  docs/_changelog.md
  3fdf0627c0e3f9187fc4e098f3b23b1eb7eb6171f2cca66760dc02d936620ad7  docs/features/admin-listings.md
  6e3227d552de09c88f83548e6c257d1ec8181f12e8ac0f6db8c68b445a37abd7  e2e/admin-listings.spec.ts
  533a80f09cd4126716adbf9ecf89a022a57d9756f05eaf8aab3a48c004d0a7ec  roadmap.md

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings;
- `bun run test:unit 2>&1 | tee /tmp/unit-b14t3.log` — 845 passed (148 files). Keep the whole output; if any test fails, paste its name and its first error line;
- `bun run i18n:map-guard` "usage maps match the tree.";
- `bash scripts/check-hardcoded-strings.sh` "findings: 0";
- `bun run scripts/e2e-select.ts --self-test` OK;
- Not run by you: the typecheck, the build and the bundle budget (your platform's rule: "Do not run the Lovable project's builds or typechecks manually because the harness runs them automatically."). CI's jobs judge them; the supervisor ran the typecheck on its own copy.

THE BROWSER RUN — not this turn: the local browser does not start (INC-506). CI on the final commit runs every spec.

THE MIGRATION RULES (G39 — every one applies)
- The text is between the BEGIN and END lines of the appendix below. Write it EXACTLY, changing only `<MARK>`. Before the change, its sha256 is 06311e3e057f7b85cb02b477aab7370fa71fac0e55ddc0a391898accc09d300c (20,782 bytes, 368 lines, ending with a newline).
- Check it in a scratch folder first (after the carrier):
  - copy supabase/migrations/*.sql into a temporary folder;
  - add the text, its `<MARK>` replaced by the mark you will use, under the name 20261014141500_b14t3-check.sql (a stamp later than the newest mark and earlier than any mark you can choose);
  - run `MIGRATIONS_DIR=<that folder> bash scripts/check-migrations.sh`.
  Paste its "guard OK" lines and "Migration guard OK".
- `<MARK>` is chosen at apply time:
  - read now() at time zone 'utc' on ethio-prod;
  - round it up to the next whole hour and add one hour (add twelve hours instead if the save dialog may wait);
  - the mark must be later than the saved file's own stamp AND above 20261014140000 (the newest mark).
- Then hand the FINAL text to the database tool ONCE. Never a stub, a comment or a draft (INC-491).
- A clean apply is the proofs' pass: they RAISE EXCEPTION on any failure.

THE READ-BACK (ethio-prod, your query tool, SELECT only; paste each result)
- `select version from public.migration_marks where version = '<MARK>';` → one row;
- the census (d) query again → admin_edit_listing | 07cd57b9091c3befe914e128318a6f44 | v | t | {search_path=public}, then edit_listing | 98adc312e33792b177a8383cf8cee8b6 | v | t | {search_path=public};
- `select has_function_privilege('anon', 'public.admin_edit_listing(uuid,jsonb,text,text)', 'EXECUTE'), has_function_privilege('anon', 'public.edit_listing(uuid,uuid,text,text,text,jsonb,text,numeric,character,text,timestamp with time zone,uuid[],jsonb,integer,boolean)', 'EXECUTE');` → f | f.

THE REPORT
- Done or not done, by step.
- The six ci-status lines, and <START>.
- The census results (a)–(d).
- The 4 sha256sum lines and the brief's.
- `git diff --name-only <START>` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only <START> HEAD` too. Expect the 4 carrier paths, the brief and the one migration file.
- The checks.
- The check-migrations "guard OK" lines; the mark and the now() reading it came from; the apply outcome; the read-back.
- The line "apply <uuid-fragment of the migration's filename> → expect mark <MARK>", for the operator's staging apply.
- In this report ONLY (never in a file — the repository is public): from the database tool's security warnings, each warning that names `admin_edit_listing` or `edit_listing`, and the total count.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only). The database change is undone only by a new migration — never by editing this file.

AFTER THIS TURN (for the operator), in this order:
1. Apply the migration on ethio-staging: open the new migration file on GitHub (Raw), paste it into the ethio-staging SQL editor and run it; read back its mark with the line the report gives. CI's preflight waits for it (up to 25 minutes); if the run has already failed at the preflight, use "Re-run failed jobs".
2. Bring the supervisor Lovable's report. The next prompt comes back at once: send it to Lovable as soon as you have it. Do not wait for CI (DEC-181).
3. Publish only when the supervisor says the newest commit is green and Lovable is idle. Then press "Sync keys" in Admin › Translations (turn 2's words). Then the supervisor's walk of turns 1–3.

APPENDIX — THE MIGRATION TEXT (write it exactly; change only <MARK>)
----- BEGIN MIGRATION -----
-- Bundle 14 (the admin's page of one ad), turn 3 (2026-10-14). Tier A. D172 (the operator, 2026-10-14): "change
-- category should not be an option on edit ... should disable that feature of changing category by user or admin on
-- published add even waiting in que for approval because so many specification, descriptions etc will change." The
-- admin's Edit no longer offers it (turn 2); here both doors refuse it.
-- e2e-areas: admin-listings, posting
--
-- A. admin_edit_listing, redeclared whole from 20261012042142 with one change: after the listing is read and before
--    anything is judged or written, a change of category is refused ('the category of a posted listing is not
--    changed'), unless the undo door is the caller (app.listing_undo on): it may put back a category an edit made
--    before D172 had moved. A change that names the listing's own leaf is no move and passes. Every other line stands
--    byte for byte; its header (VOLATILE, SECURITY DEFINER, search_path public), REVOKE and GRANTs are restated.
-- B. edit_listing (the seller's edit of a published listing), redeclared whole from 20261006225254 with one change:
--    after the status check, another leaf is refused with the same words. Every other line stands byte for byte; its
--    header, REVOKE and GRANTs are restated.
-- C. Proofs (RAISE EXCEPTION on any failure; a clean apply is the pass): both headers and privileges; each check is
--    in its body and comes before the content judge and every write; the rest of each body is the earlier body;
--    calls with no session are refused at the first gate. The doors' behaviour is proven by AL-29 (and AL-5, whose
--    seller edit names the listing's own leaf and reaches the content judge).

-- ===== A — an admin's edit never moves a posted listing to another category =====
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
  -- D172 (the operator, 2026-10-14) — a posted ad's category is never changed. The undo door alone may put back a
  -- category that an edit made before D172 had moved: app.listing_undo is on only for its own call.
  IF p_changes ? 'category_id'
     AND (p_changes->>'category_id')::uuid IS DISTINCT FROM v_prev.category_id
     AND coalesce(current_setting('app.listing_undo', true), '') <> 'on' THEN
    RAISE EXCEPTION 'the category of a posted listing is not changed';
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

-- ===== B — the seller's edit never moves a posted listing to another category =====
CREATE OR REPLACE FUNCTION public.edit_listing(p_listing_id uuid, p_category_id uuid, p_title text, p_description text, p_video_url text, p_attributes jsonb, p_price_mode text, p_price_amount numeric, p_price_currency character, p_price_period text, p_poster_expires_at timestamp with time zone, p_coverage uuid[], p_contact_pref jsonb, p_price_bp integer DEFAULT NULL::integer, p_price_negotiable boolean DEFAULT false)
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
  v_before jsonb;
  v_after  jsonb;
  v_diff_a jsonb := '{}'::jsonb;
  v_diff_b jsonb := '{}'::jsonb;
  v_key    text;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF EXISTS (SELECT 1 FROM public.profiles WHERE user_id = v_uid AND account_status = 'deactivated') THEN
    RAISE EXCEPTION 'account is deactivated';
  END IF;
  IF NOT coalesce((public.rate_gate('revise')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;
  SELECT * INTO v_prev FROM public.listings WHERE id = p_listing_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'listing not found'; END IF;
  IF v_prev.seller_id <> v_uid THEN RAISE EXCEPTION 'not your listing'; END IF;
  IF v_prev.status NOT IN ('active','reduced','rejected','held','expired') THEN
    RAISE EXCEPTION 'edit_listing takes a published listing; a draft writes through submit_listing';
  END IF;
  -- D172 (the operator, 2026-10-14) — a posted ad's category is never changed.
  IF p_category_id IS DISTINCT FROM v_prev.category_id THEN
    RAISE EXCEPTION 'the category of a posted listing is not changed';
  END IF;

  -- M5 — the judge at step 8 also refuses an unnamed seller and an
  -- unconfirmed home country, with the same fields as on publish.
  v_val := public.validate_listing_draft(v_uid, 8::smallint, p_category_id, p_title, p_description,
             p_video_url, p_attributes, p_price_mode, p_price_amount, p_price_currency,
             p_price_period, p_poster_expires_at, p_coverage, p_contact_pref, v_prev.attributes,
             p_price_bp, p_price_negotiable);
  IF NOT coalesce((v_val->>'ok')::boolean, false) THEN
    RETURN v_val;
  END IF;

  UPDATE public.listings SET
    category_id       = p_category_id,
    location_id       = (v_val->>'location_id')::uuid,
    title             = v_val->>'title',
    description       = v_val->>'description',
    attributes        = v_val->'attrs',
    price_amount      = (v_val->>'price_amount')::numeric,
    price_currency    = (v_val->>'price_currency')::char(3),
    price_mode        = v_val->>'price_mode',
    price_period      = v_val->>'price_period',
    price_bp          = (v_val->>'price_bp')::integer,
    price_negotiable  = coalesce((v_val->>'price_negotiable')::boolean, false),
    poster_expires_at = p_poster_expires_at,
    video_url         = p_video_url,
    contact_pref      = p_contact_pref,
    -- M5 / DEC-109 — the unit the ad is sold per, from the basis in force.
    price_unit        = v_val->>'price_unit',
    price_unit_text   = v_val->>'price_unit_text',
    status            = 'screening',
    updated_at        = now()
  WHERE id = p_listing_id
  RETURNING * INTO v_row;

  DELETE FROM public.listing_locations WHERE listing_id = p_listing_id;
  INSERT INTO public.listing_locations (listing_id, location_id, position)
      SELECT p_listing_id, c.id, row_number() OVER (ORDER BY c.first_position)::integer
        FROM (SELECT u.id, min(u.ordinality) AS first_position
                FROM unnest(p_coverage) WITH ORDINALITY u(id, ordinality)
               GROUP BY u.id) c ON CONFLICT DO NOTHING;

  v_after  := to_jsonb(v_row) - 'search_tsv';
  v_before := to_jsonb(v_prev) - 'search_tsv';
  FOR v_key IN SELECT k FROM jsonb_object_keys(v_after) k LOOP
    IF (v_after->v_key) IS DISTINCT FROM (v_before->v_key) THEN
      v_diff_a := v_diff_a || jsonb_build_object(v_key, v_after->v_key);
      v_diff_b := v_diff_b || jsonb_build_object(v_key, v_before->v_key);
    END IF;
  END LOOP;

  INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
    VALUES (p_listing_id, v_uid, 'edit', v_diff_b, v_diff_a, v_uid);

  RETURN jsonb_build_object('ok', true, 'status', 'screening');
END $function$;
REVOKE ALL ON FUNCTION public.edit_listing(uuid, uuid, text, text, text, jsonb, text, numeric, character, text, timestamp with time zone, uuid[], jsonb, integer, boolean) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.edit_listing(uuid, uuid, text, text, text, jsonb, text, numeric, character, text, timestamp with time zone, uuid[], jsonb, integer, boolean) TO authenticated;
GRANT ALL ON FUNCTION public.edit_listing(uuid, uuid, text, text, text, jsonb, text, numeric, character, text, timestamp with time zone, uuid[], jsonb, integer, boolean) TO service_role;

-- ===== C — proofs =====
DO $proof$
DECLARE
  v_fn  text;
  v_def text;
  v_msg text;
BEGIN
  -- C1. Headers and privileges, as before.
  FOREACH v_fn IN ARRAY ARRAY[
    'public.admin_edit_listing(uuid,jsonb,text,text)',
    'public.edit_listing(uuid,uuid,text,text,text,jsonb,text,numeric,character,text,timestamp with time zone,uuid[],jsonb,integer,boolean)'] LOOP
    IF NOT EXISTS (SELECT 1 FROM pg_proc p WHERE p.oid = v_fn::regprocedure
                    AND p.provolatile = 'v' AND p.prosecdef
                    AND p.proconfig = ARRAY['search_path=public']) THEN
      RAISE EXCEPTION 'D172 C1: % is not a volatile definer with its search path', v_fn;
    END IF;
    IF has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'D172 C1: % privileges', v_fn;
    END IF;
  END LOOP;

  -- C2. Each check is in its body, before the content judge and every write; the rest is the earlier body.
  SELECT p.prosrc INTO v_def FROM pg_proc p
   WHERE p.oid = 'public.admin_edit_listing(uuid,jsonb,text,text)'::regprocedure;
  IF v_def NOT LIKE '%v_prev.seller_id = v_uid%the category of a posted listing is not changed%remove_photos must be a list%validate_listing_draft(v_prev.seller_id, 5::smallint,%UPDATE public.listings SET%' THEN
    RAISE EXCEPTION 'D172 C2: admin_edit_listing''s category check is missing or out of place';
  END IF;
  IF md5(replace(v_def, '  -- D172 (the operator, 2026-10-14) — a posted ad''s category is never changed. The undo door alone may put back a
  -- category that an edit made before D172 had moved: app.listing_undo is on only for its own call.
  IF p_changes ? ''category_id''
     AND (p_changes->>''category_id'')::uuid IS DISTINCT FROM v_prev.category_id
     AND coalesce(current_setting(''app.listing_undo'', true), '''') <> ''on'' THEN
    RAISE EXCEPTION ''the category of a posted listing is not changed'';
  END IF;
', '')) <> '2b8996b334aa7c8b2140624a0baa7619' THEN
    RAISE EXCEPTION 'D172 C2: admin_edit_listing differs from 20261012042142 beyond the category check';
  END IF;
  SELECT p.prosrc INTO v_def FROM pg_proc p
   WHERE p.oid = 'public.edit_listing(uuid,uuid,text,text,text,jsonb,text,numeric,character,text,timestamp with time zone,uuid[],jsonb,integer,boolean)'::regprocedure;
  IF v_def NOT LIKE '%a draft writes through submit_listing%the category of a posted listing is not changed%validate_listing_draft(v_uid, 8::smallint,%UPDATE public.listings SET%' THEN
    RAISE EXCEPTION 'D172 C2: edit_listing''s category check is missing or out of place';
  END IF;
  IF md5(replace(v_def, '  -- D172 (the operator, 2026-10-14) — a posted ad''s category is never changed.
  IF p_category_id IS DISTINCT FROM v_prev.category_id THEN
    RAISE EXCEPTION ''the category of a posted listing is not changed'';
  END IF;
', '')) <> 'fb9e713e8429fe55ffc18f85db4570a7' THEN
    RAISE EXCEPTION 'D172 C2: edit_listing differs from 20261006225254 beyond the category check';
  END IF;

  -- C3. No session: refused at the first gate, before any read.
  BEGIN
    PERFORM public.admin_edit_listing(gen_random_uuid(), jsonb_build_object('category_id', gen_random_uuid()), 'misleading');
    RAISE EXCEPTION 'D172 C3: admin_edit_listing answered a call with no session';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'not signed in' THEN RAISE EXCEPTION 'D172 C3: admin_edit_listing: %', v_msg; END IF;
  END;
  BEGIN
    PERFORM public.edit_listing(gen_random_uuid(), gen_random_uuid(), 't', 'd', NULL, '{}'::jsonb, 'fixed', 1::numeric,
                                'ETB'::character(3), 'once', NULL::timestamptz, ARRAY[]::uuid[], '{}'::jsonb);
    RAISE EXCEPTION 'D172 C3: edit_listing answered a call with no session';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'not authenticated' THEN RAISE EXCEPTION 'D172 C3: edit_listing: %', v_msg; END IF;
  END;
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('<MARK>') ON CONFLICT (version) DO NOTHING;
----- END MIGRATION -----
```
