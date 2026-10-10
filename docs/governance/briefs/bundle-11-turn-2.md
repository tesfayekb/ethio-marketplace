# Bundle 11 — turn A1: Admin › Screening's preview doors — the facts a reviewer may read and the logged "Show number": brief, version 1 (saved unchanged, 2026-10-10)

```text
BUNDLE 11 — TURN A1 (2026-10-10). ONE TURN, ONE MIGRATION. Tier A (an admin door, a second-factor gate, a rate dial, the audit log).
Base: dev 78c7f665. This file is public: it is written as build instructions.
No new string, no package change, no screen change. The screen uses these doors in turn A2, once they are on both databases.

ANSWERS TO TURN 1
- Verified by diff of 9c40c53f..78c7f665: the 20 carrier paths and the brief, each byte-identical to the supervisor's copy.
- CI on 78c7f665 (run 38042467630) is GREEN and promoted: main = dev. INC-536 is fixed.

WHAT THIS TURN BUILDS (D120, 2026-10-09; D128, 2026-10-10 — the operator's rulings)
- "Preview as buyer" in Admin › Screening shows the contact methods, the number behind "Show number" with every reveal logged, and the seller's public name only. A reveal is read in Admin › Audit by holders of audit access and is never shown to the seller.
- This turn is the database half, one migration:
  - the dial review_reveal: 60 an hour per reviewer;
  - admin_screening_facts(p_listing_id uuid) — STABLE definer. For an ad with status 'screening' only, to a holder of listings:review only. Returns {country, channels: {phone, phone2, telegram, whatsapp → true/false}, seller: {alias, business_name}}. The business name is returned only when the seller posts as a business. It never returns a contact value, a legal name or an e-mail;
  - admin_reveal_listing_contact(p_listing_id uuid, p_channel text) — VOLATILE definer, "Show number". Its gates, in order: listings:review; a fresh second factor (require_step_up_if_needed('listings','review')); a channel of phone, phone2 or whatsapp; the dial; status 'screening'; the channel shown by the seller. It returns {ok:true, channel, value} and writes one audit_log row (action listing.contact_revealed, entity listing, meta {channel}) — never the number. Refusals: "not signed in", "permission denied", the step-up error, "unknown channel", {ok:false, reason:"rateLimited"}, "listing not found", {ok:false, reason:"notShown"};
  - both doors on scripts/public-surface-allowlist.txt, each with its reason.
- Tests: e2e/admin-screening.spec.ts —
  - SC-7: a reviewer reads the facts; no value leaves the door;
  - SC-8: a person who is not a reviewer reads nothing, and a reviewer without a fresh second factor reveals nothing;
  - SC-9: a reveal returns the number and writes one row naming the channel alone; a hidden channel and Telegram are refused and write nothing;
  - SC-10: an ad not waiting for review answers neither door.
  The spec's seed gives each scratch seller a public name (leaseSeller({ alias: true })) and can set the contact methods, a business name and the status. SC-1..SC-6 are unchanged.
- Docs: docs/features/admin-screening.md (a turn A1 section), the changelog, the roadmap (line 3).
The supervisor ran the migration text on a local Postgres 16 mirror (listings, profiles, places, the dial tables and rate_gate as in the repository; has_permission and the step-up helper as stand-ins with the same arguments):
- every proof passes;
- the doors behave as SC-7..SC-10 expect:
  - the facts carry the flags, the public name and the business name of a business seller, never a person's business name, legal name or a value;
  - a reveal of a shown phone returns it and writes one row {channel} with the reviewer as actor;
  - a hidden phone is notShown, Telegram is an unknown channel, an active ad is not found, a non-reviewer is refused and the dial refuses the 61st reveal in its hour;
- six variants each fail their proof: anon allowed to run the facts door (D2), the step-up line removed (D3), the number written into the audit row (D3), another dial size (D1), the facts door made VOLATILE (D2), the facts door without its permission check (D3);
- scripts/check-migrations.sh on the repository's migrations plus this text, with the two allowlist lines: every guard OK.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-11-turn-2.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines (expect 78c7f66 SUCCESS). If it shows FAILURE, STOP and report. You cannot git-fetch that branch;
  2. step 0;
  3. the census (below). If any result differs from what it expects, STOP and report: write nothing else;
  4. the carrier, then the hashes;
  5. the checks;
  6. the migration LAST, then its read-back;
  7. the report;
  8. END THE TURN.
  Do not stop between steps.
- The migration is the last thing written, because the database tool applies it on ethio-prod the moment it is saved. The operator will see the "Modify Supabase database" dialog and allow it.
- The expected red window (G35): CI on any commit the platform pushes before the migration file exists runs SC-7..SC-10 against a staging database without the doors, so they fail there. That is expected and is not fixed. CI on the final commit stops at its preflight until the operator applies the migration on ethio-staging; then "Re-run failed jobs" judges the turn.
- If any rule of yours conflicts with the text, STOP before saving and quote that rule's exact words in the report.
- Production reads are SELECT-only. Reports carry counts, booleans and names of tables, columns, functions, roles and policies. Never an e-mail address, a user id, a token, a phone number or a row of user data.
- Tests (G38): no assertion loosened, no timeout raised, no retry added. A test this brief does not name is not edited.
- Scope — these files only: the one new migration file (the database tool names it), the 5 carrier paths and the brief. The platform may regenerate src/integrations/supabase/types.ts; that is allowed, name it in the report. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-11-turn-2.md`, or nothing if the platform has already committed the brief.
- On ethio-prod with your query tool (SELECT only):
- (b) `select count(*) from pg_proc where proname in ('admin_screening_facts', 'admin_reveal_listing_contact');` → 0
- (c) `select count(*) from public.rate_dials where action = 'review_reveal';` → 0
- (d) `select proname, pg_get_function_identity_arguments(oid) from pg_proc where pronamespace = 'public'::regnamespace and proname in ('has_permission', 'require_step_up_if_needed', 'rate_gate') order by 1;` → has_permission | p_user_id uuid, p_resource text, p_action text; rate_gate | p_action text; require_step_up_if_needed | p_resource text, p_action text
- (e) `select count(*) from information_schema.columns where table_schema = 'public' and ((table_name = 'audit_log' and column_name in ('actor_id', 'action', 'entity_type', 'entity_id', 'meta')) or (table_name = 'listings' and column_name in ('contact_pref', 'location_id', 'home_country_code', 'status', 'seller_id')) or (table_name = 'profiles' and column_name in ('seller_alias', 'seller_type', 'business_name')));` → 13
- (f) `select max(version) from public.migration_marks;` → 20261010190000

THE CARRIER — A1-TURN-CARRIER-2026-10-10.md (50,075 bytes; sha256 e9c7ad6dbf267b826a685f8fe55c982a0383daf5cc9b92fb76f417d21718110c; 5 sections)
- Its first line starts "A1 TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`.
- Modes: REPLACE (the whole file); APPEND (added at the end of the file).
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed.

THE HASHES — `sha256sum` each of the 5 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  578d3a2c95871d5c73b63ad99986b045f18b5c188a67440a4be73b4e1841cd19  scripts/public-surface-allowlist.txt
  f45a25f1f6cdd1e40986a731350293d51f4e3d2707f66f0b2ed6cc9df9b2d481  e2e/admin-screening.spec.ts
  4fb0e8371f431971b7f8b6ac38c29e09979793e22d4e4f234d7b5fed26213326  docs/features/admin-screening.md
  e726bd23852ce73709ae948b2c18b9e1e0e40528380cbbba3a842ac7834e22ed  roadmap.md
  d0688603b60608390ae27c200502d714185e3768cf17e8b47241b196c7c1bde4  docs/_changelog.md

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run typecheck` clean;
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings;
- `bun run test:unit` 605 passed (92 files);
- `bun run i18n:map-guard` "usage maps match the tree." on the first run (no key changes);
- `bun run scripts/e2e-select.ts --self-test` OK;
- `bun run build` clean.

THE BROWSER RUN — not this turn. SC-7..SC-10 need the doors on ethio-staging, which the operator applies after the turn; CI on the final commit is the proof (and the local browser does not start, INC-506).

THE MIGRATION RULES (G39 — every one applies)
- The text is between the BEGIN and END lines of the appendix below. Write it EXACTLY, changing only `<MARK>`. Before the change, its sha256 is 581260dc157c24f84d37886a4668ea3d0122af7bd1f976f282635733d9e79434 (8,506 bytes, 187 lines, ending with a newline).
- Check it in a scratch folder first (after the carrier, so the allowlist holds the two doors):
  - copy supabase/migrations/*.sql into a temporary folder;
  - add the text under a name of the form 20261010120000_a1-check.sql;
  - run `MIGRATIONS_DIR=<that folder> bash scripts/check-migrations.sh`.
  Paste its "guard OK" lines and "Migration guard OK".
- `<MARK>` is chosen at apply time:
  - read now() at time zone 'utc' on ethio-prod;
  - round it up to the next whole hour and add one hour (add twelve hours instead if the save dialog may wait);
  - the mark must be later than the saved file's own stamp AND above 20261010190000 (the newest mark). If the time rule gives a mark at or below 20261010190000, use 20261010200000.
- Then hand the FINAL text to the database tool ONCE. Never a stub, a comment or a draft (INC-491).
- A clean apply is the proofs' pass: they RAISE EXCEPTION on any failure.

THE READ-BACK (ethio-prod, your query tool, SELECT only; paste each result)
- `select version from public.migration_marks where version = '<MARK>';` → one row;
- census (b) again → 2; census (c) again → 1;
- `select proname, prosecdef, provolatile, has_function_privilege('anon', oid, 'EXECUTE'), has_function_privilege('authenticated', oid, 'EXECUTE') from pg_proc where proname in ('admin_screening_facts', 'admin_reveal_listing_contact') order by 1;` → admin_reveal_listing_contact | t | v | f | t; admin_screening_facts | t | s | f | t;
- `select count(*) from public.audit_log where action = 'listing.contact_revealed';` → 0 (no reveal has run on production).

THE REPORT
- Done or not done, by step.
- The six ci-status lines.
- The census results (a)–(f).
- The 5 sha256sum lines and the brief's.
- `git diff --name-only 78c7f665` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only 78c7f665 HEAD` too. Expect the 5 carrier paths, the brief and the one migration file (and types.ts if regenerated).
- The checks.
- The check-migrations "guard OK" lines; the mark and the now() reading it came from; the apply outcome; the read-back.
- The line "apply <uuid-fragment of the migration's filename> → expect mark <MARK>", for the operator's staging apply.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only). The database change is undone only by a new migration — never by editing this file.

AFTER THIS TURN (for the operator): apply the migration on ethio-staging (the SQL editor), read back its mark, then "Re-run failed jobs" on the CI run (its E2E preflight waits for staging); send the executor nothing until CI on the final commit is read.

APPENDIX — THE MIGRATION TEXT (write it exactly; change only <MARK>)
----- BEGIN MIGRATION -----
-- Bundle 11 Part A, turn A1 (2026-10-10). Tier A. Admin › Screening's "Preview as buyer" reads what a buyer will see (D120, D128).
-- e2e-areas: admin-screening
-- A. The dial review_reveal: 60 an hour per reviewer.
-- B. admin_screening_facts(p_listing_id uuid): for an ad waiting for review (status 'screening'), to a holder of
--    listings:review — the ad's country (its place's market), which contact methods the seller chose to show
--    (true/false per channel, never a value), and the seller's public name (the public name, and the business
--    name when the seller posts as a business). Nothing else of the seller: no legal name, e-mail or number.
-- C. admin_reveal_listing_contact(p_listing_id uuid, p_channel text): "Show number" — for an ad waiting for review,
--    to a holder of listings:review with a fresh second factor, rate-gated review_reveal; the channel is phone,
--    phone2 or whatsapp and must be one the seller chose to show. Each reveal writes one audit_log row
--    (action listing.contact_revealed, the listing, the channel — never the number), read in Admin › Audit (D128).
--    It is an internal moderation record: nothing shows it to the seller.
-- D. Proofs: catalogue reads and calls with no session only; the doors' behaviour is proven by SC-7..SC-10.

-- ===== A — the dial =====
INSERT INTO public.rate_dials (action, max_count, window_seconds) VALUES ('review_reveal', 60, 3600)
  ON CONFLICT (action) DO UPDATE SET max_count = EXCLUDED.max_count, window_seconds = EXCLUDED.window_seconds;

-- ===== B — the preview's facts =====
CREATE OR REPLACE FUNCTION public.admin_screening_facts(p_listing_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid     uuid := auth.uid();
  v_row     public.listings%ROWTYPE;
  v_country text;
  v_alias   text;
  v_type    text;
  v_biz     text;
  v_pref    jsonb;
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'not signed in';
  END IF;
  IF NOT public.has_permission(v_uid, 'listings', 'review') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;

  SELECT * INTO v_row FROM public.listings l WHERE l.id = p_listing_id;
  IF NOT FOUND OR v_row.status <> 'screening' THEN
    RAISE EXCEPTION 'listing not found';
  END IF;

  SELECT l.country_code INTO v_country FROM public.locations l WHERE l.id = v_row.location_id;
  SELECT p.seller_alias, p.seller_type, p.business_name INTO v_alias, v_type, v_biz
    FROM public.profiles p
   WHERE p.user_id = v_row.seller_id;
  v_pref := coalesce(v_row.contact_pref, '{}'::jsonb);

  RETURN jsonb_build_object(
    'country', coalesce(v_country, v_row.home_country_code),
    'channels', jsonb_build_object(
      'phone',    coalesce((v_pref->'phone'->>'show')::boolean, false),
      'phone2',   coalesce((v_pref->'phone2'->>'show')::boolean, false),
      'telegram', coalesce((v_pref->'telegram'->>'show')::boolean, false),
      'whatsapp', coalesce((v_pref->'whatsapp'->>'show')::boolean, false)),
    'seller', jsonb_build_object(
      'alias', v_alias,
      'business_name', CASE WHEN v_type = 'business' THEN v_biz END));
END $$;

REVOKE ALL ON FUNCTION public.admin_screening_facts(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_screening_facts(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.admin_screening_facts(uuid) TO service_role;

-- ===== C — "Show number", logged =====
CREATE OR REPLACE FUNCTION public.admin_reveal_listing_contact(p_listing_id uuid, p_channel text)
RETURNS jsonb
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid   uuid := auth.uid();
  v_rate  jsonb;
  v_row   public.listings%ROWTYPE;
  v_entry jsonb;
  v_value text;
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'not signed in';
  END IF;
  IF NOT public.has_permission(v_uid, 'listings', 'review') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('listings', 'review');
  IF p_channel IS NULL OR p_channel NOT IN ('phone', 'phone2', 'whatsapp') THEN
    RAISE EXCEPTION 'unknown channel';
  END IF;

  v_rate := public.rate_gate('review_reveal');
  IF NOT coalesce((v_rate->>'allowed')::boolean, false) THEN
    RETURN jsonb_build_object('ok', false, 'reason', 'rateLimited', 'resets_at', v_rate->>'resets_at');
  END IF;

  SELECT * INTO v_row FROM public.listings l WHERE l.id = p_listing_id;
  IF NOT FOUND OR v_row.status <> 'screening' THEN
    RAISE EXCEPTION 'listing not found';
  END IF;

  v_entry := coalesce(v_row.contact_pref, '{}'::jsonb) -> p_channel;
  v_value := btrim(coalesce(v_entry->>'value', ''));
  IF coalesce((v_entry->>'show')::boolean, false) IS NOT TRUE OR v_value = '' THEN
    RETURN jsonb_build_object('ok', false, 'reason', 'notShown');
  END IF;

  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
    VALUES (v_uid, 'listing.contact_revealed', 'listing', p_listing_id::text,
            jsonb_build_object('channel', p_channel));

  RETURN jsonb_build_object('ok', true, 'channel', p_channel, 'value', v_value);
END $$;

REVOKE ALL ON FUNCTION public.admin_reveal_listing_contact(uuid, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_reveal_listing_contact(uuid, text) TO authenticated;
GRANT ALL ON FUNCTION public.admin_reveal_listing_contact(uuid, text) TO service_role;

-- ===== D — proofs =====
DO $proof$
DECLARE
  v_fn text;
  v_ok boolean;
BEGIN
  -- D1: the dial.
  IF NOT EXISTS (SELECT 1 FROM public.rate_dials
                  WHERE action = 'review_reveal' AND max_count = 60 AND window_seconds = 3600) THEN
    RAISE EXCEPTION 'A1 D1: the dial';
  END IF;

  -- D2: both doors are definers with a fixed search path; the signed-in role runs them, anon and PUBLIC do not.
  FOREACH v_fn IN ARRAY ARRAY['public.admin_screening_facts(uuid)', 'public.admin_reveal_listing_contact(uuid,text)'] LOOP
    IF NOT (SELECT p.prosecdef FROM pg_catalog.pg_proc p WHERE p.oid = v_fn::regprocedure)
       OR NOT EXISTS (SELECT 1 FROM pg_catalog.pg_proc p, unnest(p.proconfig) cfg
                       WHERE p.oid = v_fn::regprocedure AND cfg = 'search_path=public') THEN
      RAISE EXCEPTION 'A1 D2: % is not a definer with a search path', v_fn;
    END IF;
    IF pg_catalog.has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT pg_catalog.has_function_privilege('authenticated', v_fn, 'EXECUTE')
       OR EXISTS (SELECT 1 FROM pg_catalog.pg_proc p, aclexplode(p.proacl) x
                   WHERE p.oid = v_fn::regprocedure AND x.grantee = 0) THEN
      RAISE EXCEPTION 'A1 D2: % privileges', v_fn;
    END IF;
  END LOOP;
  IF (SELECT p.provolatile FROM pg_catalog.pg_proc p WHERE p.oid = 'public.admin_screening_facts(uuid)'::regprocedure) <> 's'
     OR (SELECT p.provolatile FROM pg_catalog.pg_proc p WHERE p.oid = 'public.admin_reveal_listing_contact(uuid,text)'::regprocedure) <> 'v' THEN
    RAISE EXCEPTION 'A1 D2: volatility';
  END IF;

  -- D3: the gates are in place, in order, and the log never carries the value.
  IF pg_get_functiondef('public.admin_screening_facts(uuid)'::regprocedure)
       NOT LIKE '%has_permission(v_uid, ''listings'', ''review'')%'
     OR pg_get_functiondef('public.admin_reveal_listing_contact(uuid,text)'::regprocedure)
       NOT LIKE '%has_permission(v_uid, ''listings'', ''review'')%require_step_up_if_needed(''listings'', ''review'')%rate_gate(''review_reveal'')%INSERT INTO public.audit_log%' THEN
    RAISE EXCEPTION 'A1 D3: a gate is missing or out of order';
  END IF;
  IF pg_get_functiondef('public.admin_reveal_listing_contact(uuid,text)'::regprocedure)
       NOT LIKE '%jsonb_build_object(''channel'', p_channel));%' THEN
    RAISE EXCEPTION 'A1 D3: the audit row must carry the channel alone';
  END IF;

  -- D4: with no session, both doors refuse before reading anything.
  v_ok := false;
  BEGIN
    PERFORM public.admin_screening_facts(NULL);
  EXCEPTION WHEN OTHERS THEN
    v_ok := (SQLERRM = 'not signed in');
  END;
  IF NOT v_ok THEN
    RAISE EXCEPTION 'A1 D4: the facts door did not refuse a call with no session';
  END IF;
  v_ok := false;
  BEGIN
    PERFORM public.admin_reveal_listing_contact(NULL, 'phone');
  EXCEPTION WHEN OTHERS THEN
    v_ok := (SQLERRM = 'not signed in');
  END;
  IF NOT v_ok THEN
    RAISE EXCEPTION 'A1 D4: the reveal door did not refuse a call with no session';
  END IF;
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('<MARK>') ON CONFLICT (version) DO NOTHING;
----- END MIGRATION -----
```
