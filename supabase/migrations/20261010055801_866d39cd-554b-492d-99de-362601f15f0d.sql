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

INSERT INTO public.migration_marks (version) VALUES ('20261010180000') ON CONFLICT (version) DO NOTHING;