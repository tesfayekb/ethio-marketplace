# Bundle 10 follow-up — turn 8: the profile is written through its doors only (INC-535): brief, version 1 (saved unchanged, 2026-10-10)

```text
BUNDLE 10 FOLLOW-UP — TURN 8 (2026-10-10). ONE TURN, ONE MIGRATION. Tier A (RLS and grants, identity).
Base: dev 255d5401. This file is public: it is written as build instructions.
No new string, no package change, no screen change.

ANSWERS TO TURN 7
- Verified by diff of 7f87fd30..255d5401: exactly the 13 paths, each byte-identical to the supervisor's copy. 255d5401 is an empty commit (the platform's title).
- CI on 255d5401 (run 38023904234) is GREEN and promoted: main = dev. Turn 7 is CLEAN.

WHAT THIS TURN BUILDS (INC-535)
- public.profiles is written through its doors only:
  - no client role (anon, authenticated) holds INSERT, UPDATE or DELETE on it — on the table or on any column;
  - the owner's UPDATE policy (profiles_owner_update) is dropped;
  - the two read policies stay (profiles_owner_read, profiles_admin_read), and so does authenticated's SELECT.
  Every function that writes profiles is SECURITY DEFINER (save_posting_identity, user_set_preferred_language, confirm_home_country, change_home_country, admin_update_profile, admin_set_account_status, handle_new_user), and no app code writes the table directly, so nothing that works today stops working.
- security_lints(): the count table_writable_by_client also counts a column grant of INSERT or UPDATE to a client role. Its baseline stays 0.
- PR-43 (new, e2e/posting-routes-identity.spec.ts): the owner's own client is refused on every column it could write before; the identity route still saves the same name.
- Docs: identity-schema.md, security-scanning.md, the changelog, the roadmap.
The supervisor ran the migration text on a local Postgres 16 mirror of profiles' grants, policies and the lint:
- every proof passes, and a re-run passes;
- a variant without the REVOKE fails C1; a variant that keeps the policy fails C2; a variant with the old lint fails C4;
- the owner's direct UPDATE is refused ("permission denied for table profiles"); a SECURITY DEFINER door still writes;
- scripts/check-migrations.sh on the repository's migrations plus this text: every guard OK.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-10-d119-turn-8.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines (expect 255d540 SUCCESS). You cannot git-fetch that branch;
  2. step 0;
  3. the census (below). If any result differs from what it expects, STOP and report: write nothing else;
  4. the carrier, then the hashes;
  5. the checks;
  6. the migration LAST, then its read-back;
  7. the report;
  8. END THE TURN.
  Do not stop between steps.
- The migration is the last thing written because the database tool applies it on ethio-prod the moment it is saved. The operator will see the "Modify Supabase database" dialog and allow it.
- If any rule of yours conflicts with the text, STOP before saving and quote that rule's exact words in the report.
- Production reads are SELECT-only. Reports carry counts, booleans and names of tables, columns, functions, roles and policies. Never an e-mail address, a user id, a token or a row of user data.
- Tests (G38): no assertion loosened, no timeout raised, no retry added. A test this brief does not name is not edited.
- Scope — these files only: the one new migration file (the database tool names it); the five carrier paths; the brief. The platform may regenerate src/integrations/supabase/types.ts; that is allowed, name it in the report. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-10-d119-turn-8.md`.
- On ethio-prod with your query tool (SELECT only):
- (b) `select md5(prosrc), provolatile, prosecdef, proconfig::text, pg_get_function_arguments(oid) from pg_proc where proname = 'security_lints';`
  → one row: 42d0b3c765624c162ef43dc648c2b817 | s | t (true) | {"search_path=public, pg_catalog"} | (empty)
- (c) `select string_agg(attname, ', ' order by attname) from pg_attribute where attrelid = 'public.profiles'::regclass and attnum > 0 and not attisdropped and has_column_privilege('authenticated', attrelid, attnum, 'UPDATE');`
  → avatar_url, contact_phone, contact_prefs, contact_telegram, contact_whatsapp, default_post_location_id, display_name, notification_prefs, seller_alias, show_phone, show_telegram, updated_at, viewing_location
- (d) `select c.relname from pg_class c join pg_namespace n on n.oid = c.relnamespace where n.nspname = 'public' and c.relkind in ('r','p') and (has_any_column_privilege('authenticated', c.oid, 'UPDATE') or has_any_column_privilege('authenticated', c.oid, 'INSERT') or has_any_column_privilege('anon', c.oid, 'UPDATE') or has_any_column_privilege('anon', c.oid, 'INSERT'));`
  → one row: profiles
- (e) `select policyname, cmd from pg_policies where schemaname = 'public' and tablename = 'profiles' order by 1;`
  → profiles_admin_read SELECT; profiles_owner_read SELECT; profiles_owner_update UPDATE
- (f) `select max(version) from public.migration_marks;` → 20261009220000

THE CARRIER — INC535-TURN8-CARRIER-2026-10-10.md (49,856 bytes; sha256 35bf7c2748e54ba4a88dcd853e8e9949211db6cbfa64c545e1c1b7af23d896f7; 5 sections)
- Its first line starts "INC-535 TURN 8 CARRIER". Each section starts with a line `===== <path> ===== <mode>`.
- Modes: REPLACE (the whole file); APPEND.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed.

THE HASHES — `sha256sum` each of the 5 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  9fc0c2a7e00de0e8ca5a0094403d8b4dd1dcf47e2efdb951bbe43b364f74a683  e2e/posting-routes-identity.spec.ts
  2719db87c818afba738cfb43aec7c873d81e45614de2ba97e65d24dc77323da4  docs/features/identity-schema.md
  928ba4f7f86cf90c55d51971f851bc6b8c32a4277c8d0fbc5b65d250d5108268  docs/features/security-scanning.md
  99bcb656b03be5d36edc65d4fa0cfd37f68b3d238b6f3553f59536b80b4c7f84  roadmap.md
  92efe710a2ec1086b9efb6ba1a2b56c2f31f23a634ecc941036ad824c8e094bd  docs/_changelog.md

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run typecheck` clean;
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings;
- `bun run test:unit` 595 passed;
- `bun run i18n:map-guard` "usage maps match the tree." on the first run (no key changes);
- `bun run scripts/e2e-select.ts --self-test` OK;
- `bun run build` clean.

THE BROWSER RUN — not this turn. PR-43 needs this migration on ethio-staging, which the operator applies after the turn; CI on the final commit is the proof (and the local browser does not start, INC-506).

THE MIGRATION RULES (G39 — every one applies)
- The text is between the BEGIN and END lines of the appendix below. Write it EXACTLY, changing only `<MARK>`. Before the change, its sha256 is 80a71ae32cd749a4fbcc0dc49eb6538e0b047be55754ac07f052586ad020c34d (7,887 bytes, 131 lines, ending with a newline).
- Check it in a scratch folder first:
  - copy supabase/migrations/*.sql into a temporary folder;
  - add the text under a name of the form 20261010000000_inc535-check.sql;
  - run `MIGRATIONS_DIR=<that folder> bash scripts/check-migrations.sh`.
  Paste its "guard OK" lines: Born-closed, Definer, Self-marking, Public-surface, Real-row proof, and "Migration guard OK".
- `<MARK>` is chosen at apply time:
  - read now() at time zone 'utc' on ethio-prod;
  - round it up to the next whole hour and add one hour (add twelve hours instead if the save dialog may wait);
  - the mark must be later than the saved file's own stamp and above 20261009220000.
- Then hand the FINAL text to the database tool ONCE. Never a stub, a comment or a draft (INC-491).
- A clean apply is the proofs' pass: they RAISE EXCEPTION on any failure.

THE READ-BACK (ethio-prod, your query tool, SELECT only; paste each result)
- `select version from public.migration_marks where version = '<MARK>';` → one row;
- census (c) again → NULL (no column);
- census (d) again → no rows;
- census (e) again → profiles_admin_read SELECT; profiles_owner_read SELECT;
- `select md5(prosrc) from pg_proc where proname = 'security_lints';` → 5b28264e213bb814054a93d17ea118bb.

THE REPORT
- Done or not done, by step.
- The six ci-status lines.
- The census results (a)–(f).
- The 5 sha256sum lines and the brief's.
- `git diff --name-only 255d5401` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only 255d5401 HEAD` too. Expect the five carrier paths, the brief and the one migration file (and types.ts if regenerated).
- The checks.
- The check-migrations "guard OK" lines; the mark and the now() reading it came from; the apply outcome; the read-back.
- The line "apply <uuid-fragment of the migration's filename> → expect mark <MARK>", for the operator's staging apply.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only). The database change is undone only by a new migration that restores the grant — never by editing this file.

AFTER THIS TURN (for the operator): apply the migration on ethio-staging (the SQL editor), read back its mark, then "Re-run failed jobs" on the CI run (its E2E preflight waits for staging); send the executor nothing until CI on the final commit is read.

APPENDIX — THE MIGRATION TEXT (write it exactly; change only <MARK>)
----- BEGIN MIGRATION -----
-- INC-535 (2026-10-10; bundle 10 follow-up, turn 8). Tier A.
-- A. public.profiles is written through its doors only: no client role holds INSERT, UPDATE or
--    DELETE on it, on the table or on any column, and the owner's UPDATE policy is dropped.
--    A table-level REVOKE also removes every column grant. Every function that writes profiles is
--    SECURITY DEFINER (save_posting_identity, user_set_preferred_language, confirm_home_country,
--    change_home_country, admin_update_profile, admin_set_account_status, handle_new_user), and
--    no client code writes the table, so nothing that works today stops working.
-- B. security_lints(): table_writable_by_client also counts a column grant of INSERT or UPDATE
--    (has_any_column_privilege). A whole redeclaration from 20261007033719; that clause is the
--    only change. The baseline stays 0.
-- C. Proofs: catalogue reads and one scratch table only; no row of any account is read or written.

-- ===== A — the profile is written through its doors only =====
REVOKE INSERT, UPDATE, DELETE ON public.profiles FROM anon, authenticated;
DROP POLICY IF EXISTS profiles_owner_update ON public.profiles;

-- ===== B — the client-writable lint also counts column grants =====
-- DEC-132 layer B, option ii: Supabase's lints 0013, 0010 and 0011, plus the client-writable count
CREATE OR REPLACE FUNCTION public.security_lints()
RETURNS jsonb
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public', 'pg_catalog'
AS $sl$
  SELECT jsonb_build_array(
    jsonb_build_object('name', 'rls_disabled_in_public', 'level', 'ERROR', 'count',
      (SELECT count(*)::int FROM pg_catalog.pg_class c JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
        WHERE n.nspname = 'public' AND c.relkind = 'r' AND NOT c.relrowsecurity)),
    jsonb_build_object('name', 'security_definer_view', 'level', 'ERROR', 'count',
      (SELECT count(*)::int FROM pg_catalog.pg_class c JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
         LEFT JOIN pg_catalog.pg_depend dep ON dep.objid = c.oid AND dep.deptype = 'e'
              AND dep.classid = 'pg_catalog.pg_class'::regclass
        WHERE n.nspname = 'public' AND c.relkind = 'v' AND dep.objid IS NULL
          AND NOT (lower(COALESCE(c.reloptions::text, '{}'))::text[]
                   && ARRAY['security_invoker=1','security_invoker=true','security_invoker=yes','security_invoker=on']))),
    jsonb_build_object('name', 'function_executable_by_anon', 'level', 'ERROR', 'count',
      (SELECT count(*)::int FROM pg_catalog.pg_proc p JOIN pg_catalog.pg_namespace n ON n.oid = p.pronamespace
         LEFT JOIN pg_catalog.pg_depend dep ON dep.objid = p.oid AND dep.deptype = 'e'
              AND dep.classid = 'pg_catalog.pg_proc'::regclass
        WHERE n.nspname = 'public' AND dep.objid IS NULL
          AND pg_catalog.has_function_privilege('anon', p.oid, 'EXECUTE'))),
    jsonb_build_object('name', 'function_search_path_mutable', 'level', 'WARN', 'count',
      (SELECT count(*)::int FROM pg_catalog.pg_proc p JOIN pg_catalog.pg_namespace n ON n.oid = p.pronamespace
         LEFT JOIN pg_catalog.pg_depend dep ON dep.objid = p.oid AND dep.deptype = 'e'
              AND dep.classid = 'pg_catalog.pg_proc'::regclass
        WHERE n.nspname = 'public' AND dep.objid IS NULL
          AND NOT EXISTS (SELECT 1 FROM unnest(COALESCE(p.proconfig, '{}')) cfg WHERE cfg LIKE 'search_path=%'))),
    jsonb_build_object('name', 'table_writable_by_client', 'level', 'WARN', 'count',
      (SELECT count(*)::int FROM pg_catalog.pg_class c JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
        WHERE n.nspname = 'public' AND c.relkind IN ('r','p')
          AND EXISTS (SELECT 1 FROM unnest(ARRAY['anon','authenticated']) r(role),
                                    unnest(ARRAY['INSERT','UPDATE','DELETE','TRUNCATE']) v(priv)
                       WHERE pg_catalog.has_table_privilege(r.role, c.oid, v.priv)
                          OR (v.priv IN ('INSERT','UPDATE')
                              AND pg_catalog.has_any_column_privilege(r.role, c.oid, v.priv)))))
  );
$sl$;
REVOKE ALL ON FUNCTION public.security_lints() FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.security_lints() TO service_role;

-- ===== C — proofs =====
DO $proof$
DECLARE
  v_role text;
  v_cols text;
  v_lints jsonb;
  v_n int;
  v_t text;
BEGIN
  -- C1: no client role can insert, update or delete profiles, on the table or on any column.
  FOREACH v_role IN ARRAY ARRAY['anon', 'authenticated'] LOOP
    IF pg_catalog.has_any_column_privilege(v_role, 'public.profiles', 'INSERT')
       OR pg_catalog.has_any_column_privilege(v_role, 'public.profiles', 'UPDATE')
       OR pg_catalog.has_table_privilege(v_role, 'public.profiles', 'DELETE') THEN
      RAISE EXCEPTION 'INC-535 C1: % can still write public.profiles', v_role;
    END IF;
  END LOOP;
  SELECT string_agg(a.attname, ', ' ORDER BY a.attname) INTO v_cols
    FROM pg_catalog.pg_attribute a
   WHERE a.attrelid = 'public.profiles'::regclass AND a.attnum > 0 AND NOT a.attisdropped
     AND pg_catalog.has_column_privilege('authenticated', a.attrelid, a.attnum, 'UPDATE');
  IF v_cols IS NOT NULL THEN
    RAISE EXCEPTION 'INC-535 C1: authenticated can still update columns: %', v_cols;
  END IF;

  -- C2: no write policy is left on profiles; the owner still reads their own row.
  IF EXISTS (SELECT 1 FROM pg_catalog.pg_policies
              WHERE schemaname = 'public' AND tablename = 'profiles' AND cmd <> 'SELECT') THEN
    RAISE EXCEPTION 'INC-535 C2: a write policy is left on public.profiles';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_catalog.pg_policies
                  WHERE schemaname = 'public' AND tablename = 'profiles'
                    AND policyname = 'profiles_owner_read' AND cmd = 'SELECT')
     OR NOT pg_catalog.has_table_privilege('authenticated', 'public.profiles', 'SELECT') THEN
    RAISE EXCEPTION 'INC-535 C2: the owner can no longer read public.profiles';
  END IF;

  -- C3: the lint keeps its five names and levels; the client-writable count is 0 (the baseline).
  v_lints := public.security_lints();
  IF jsonb_array_length(v_lints) <> 5
     OR (SELECT string_agg((e->>'name') || '/' || (e->>'level'), ',' ORDER BY i)
           FROM jsonb_array_elements(v_lints) WITH ORDINALITY x(e, i))
        <> 'rls_disabled_in_public/ERROR,security_definer_view/ERROR,function_executable_by_anon/ERROR,function_search_path_mutable/WARN,table_writable_by_client/WARN' THEN
    RAISE EXCEPTION 'INC-535 C3: lint shape';
  END IF;
  v_n := (v_lints->4->>'count')::int;
  IF v_n <> 0 THEN
    RAISE EXCEPTION 'INC-535 C3: table_writable_by_client is %, expected 0', v_n;
  END IF;

  -- C4: the lint now sees a column grant: a scratch table given one is counted, then dropped.
  v_t := 'e2e_mig_inc535_' || substr(md5(random()::text), 1, 8);
  EXECUTE format('CREATE TABLE public.%I (id int, note text)', v_t);
  EXECUTE format('GRANT UPDATE (note) ON public.%I TO authenticated', v_t);
  IF (public.security_lints()->4->>'count')::int <> v_n + 1 THEN
    RAISE EXCEPTION 'INC-535 C4: the lint did not count a column grant';  -- the exception undoes the table
  END IF;
  EXECUTE format('DROP TABLE public.%I', v_t);
  IF (public.security_lints()->4->>'count')::int <> v_n THEN
    RAISE EXCEPTION 'INC-535 C4: the scratch table was not removed';
  END IF;

  -- C5: the lint stays the service role's only.
  IF pg_catalog.has_function_privilege('anon', 'public.security_lints()', 'EXECUTE')
     OR pg_catalog.has_function_privilege('authenticated', 'public.security_lints()', 'EXECUTE')
     OR NOT pg_catalog.has_function_privilege('service_role', 'public.security_lints()', 'EXECUTE') THEN
    RAISE EXCEPTION 'INC-535 C5: lint privileges';
  END IF;
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('<MARK>') ON CONFLICT (version) DO NOTHING;
----- END MIGRATION -----
```
