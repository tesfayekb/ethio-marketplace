-- e2e-areas: feed, posting, admin-users, admin-categories, admin-attributes, shell

-- Foundations 1, turn F1-7a, part 9 of 10 — SEVEN READERS CLOSE TO BROWSER ROLES (DEC-333, DEC-407; brief
-- docs/governance/briefs/f1-doors-7a.md; ruling docs/governance/briefs/f1-doors-7a-ruling-1.md, decision 6;
-- census docs/governance/reports/f1-doors-7a.census.md).
-- Seven readers whose every caller now runs as its owner lose their browser grant: catalog_find_version,
-- get_browse_tree, get_category_attributes, get_ui_bundle, level_perks_for, price_shape_for_basis (their callers are
-- definer functions; no browser code calls them) and impersonation_target (called only by the two impersonation
-- readers, definers on the gate since part 6; its body untouched). Their EXECUTE leaves anon, authenticated and
-- PUBLIC; the service role keeps what it held. The bodies are unchanged (live md5s checked).

DO $pre$
DECLARE
  v_md5  text;
  v_fn   text;
  v_want text;
  v_svc  boolean;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261119170700') THEN
    RAISE EXCEPTION 'F1-7a part 9: the mark 20261119170700 must be applied first';
  END IF;
  FOR v_fn, v_want, v_svc IN VALUES
      ('public.catalog_find_version()', '1b5e2af66273a0c6354ae408b5edaf30', true),
      ('public.get_browse_tree(text)', 'f2f15bba0a10fd29d49ecec7498a90fe', false),
      ('public.get_category_attributes(uuid,boolean)', '8a2b9e09355e4c9a27977d98fbfcf65f', false),
      ('public.get_ui_bundle(text)', 'c0228102995224952a4b7fac3f41cc97', false),
      ('public.impersonation_target(uuid)', 'a50583be2e3d2768b10b9cefd04a06d3', true),
      ('public.level_perks_for(text,uuid,character)', '662e1195e9779ac614ac4c929f4e51f3', true),
      ('public.price_shape_for_basis(text)', 'cdae788c71d87c7e04fb1265ebde2142', true) LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_fn::regprocedure;
    IF v_md5 IS DISTINCT FROM v_want THEN
      RAISE EXCEPTION 'F1-7a part 9: the live % is not its last declaration''s body (%)', v_fn, v_md5;
    END IF;
  END LOOP;
END $pre$;

-- ------------------------------------------------------------ 1. the browser grants leave
REVOKE EXECUTE ON FUNCTION public.catalog_find_version() FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.get_browse_tree(text) FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.get_category_attributes(uuid, boolean) FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.get_ui_bundle(text) FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.impersonation_target(uuid) FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.level_perks_for(text, uuid, character) FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.price_shape_for_basis(text) FROM anon, authenticated, PUBLIC;

-- ------------------------------------------------------------ PROOFS (scratch rows only, rolled back by the sentinel)
--   (a) every body is unchanged; none is callable by anon, authenticated or PUBLIC; the service role keeps what it
--       held;
--   (b) THE CALLERS THAT PROVE IT, read from the live catalogue: starting from each closed function, every function
--       of public that names it is either SECURITY DEFINER (it runs it as its owner) or an INVOKER function that no
--       browser role may run, which is followed in turn; a trigger function among them sits only on tables the
--       browser roles may neither INSERT, UPDATE nor DELETE; no policy, view or CHECK constraint of a browser-writable
--       table names any function of the chain.
--   (c) the impersonation readers still read through impersonation_target as their owner: a scratch staff
DO $proof$
DECLARE
  v_fn      text;
  v_want    text;
  v_svc     boolean;
  v_chain   text[];
  v_i       integer;
  v_name    text;
  v_p       record;
  v_where   text;
  v_msg     text;
  v_stem    text := translate(substr(md5(gen_random_uuid()::text), 1, 10), '0123456789', 'ghijkmnopr');
  v_tag     text;
  v_a       uuid := gen_random_uuid();
  v_b       uuid := gen_random_uuid();
  v_s       uuid := gen_random_uuid();
  v_got     uuid;
  v_direct  text;
BEGIN
  -- (a)
  FOR v_fn, v_want, v_svc IN VALUES
      ('public.catalog_find_version()', '1b5e2af66273a0c6354ae408b5edaf30', true),
      ('public.get_browse_tree(text)', 'f2f15bba0a10fd29d49ecec7498a90fe', false),
      ('public.get_category_attributes(uuid,boolean)', '8a2b9e09355e4c9a27977d98fbfcf65f', false),
      ('public.get_ui_bundle(text)', 'c0228102995224952a4b7fac3f41cc97', false),
      ('public.impersonation_target(uuid)', 'a50583be2e3d2768b10b9cefd04a06d3', true),
      ('public.level_perks_for(text,uuid,character)', '662e1195e9779ac614ac4c929f4e51f3', true),
      ('public.price_shape_for_basis(text)', 'cdae788c71d87c7e04fb1265ebde2142', true) LOOP
    IF (SELECT md5(replace(prosrc, chr(13), '')) FROM pg_proc WHERE oid = v_fn::regprocedure) IS DISTINCT FROM v_want
       OR has_function_privilege('anon', v_fn::regprocedure, 'EXECUTE')
       OR has_function_privilege('authenticated', v_fn::regprocedure, 'EXECUTE')
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn::regprocedure)) a
                   WHERE a.grantee = 0)
       OR has_function_privilege('service_role', v_fn::regprocedure, 'EXECUTE') IS DISTINCT FROM v_svc THEN
      RAISE EXCEPTION 'F1-7a part 9 proof (a): % is not its old body closed to browser roles', v_fn;
    END IF;

    -- (b)
    v_chain := ARRAY[(SELECT proname::text FROM pg_proc WHERE oid = v_fn::regprocedure)];
    v_i := 1;
    WHILE v_i <= array_length(v_chain, 1) LOOP
      v_name := v_chain[v_i];
      SELECT string_agg(schemaname || '.' || tablename || '.' || policyname, ', ') INTO v_where FROM pg_policies
       WHERE coalesce(qual, '') ~ ('\m' || v_name || '\M') OR coalesce(with_check, '') ~ ('\m' || v_name || '\M');
      IF v_where IS NOT NULL THEN
        RAISE EXCEPTION 'F1-7a part 9 proof (b): % (chain of %) is named by the policy %', v_name, v_fn, v_where;
      END IF;
      SELECT string_agg(schemaname || '.' || viewname, ', ') INTO v_where FROM pg_views
       WHERE schemaname NOT IN ('pg_catalog', 'information_schema') AND definition ~ ('\m' || v_name || '\M');
      IF v_where IS NOT NULL THEN
        RAISE EXCEPTION 'F1-7a part 9 proof (b): % (chain of %) is named by the view %', v_name, v_fn, v_where;
      END IF;
      SELECT string_agg(c.conrelid::regclass::text || '.' || c.conname, ', ') INTO v_where FROM pg_constraint c
       WHERE c.contype = 'c' AND pg_get_constraintdef(c.oid) ~ ('\m' || v_name || '\M')
         AND (has_table_privilege('anon', c.conrelid, 'INSERT') OR has_table_privilege('anon', c.conrelid, 'UPDATE')
              OR has_table_privilege('authenticated', c.conrelid, 'INSERT')
              OR has_table_privilege('authenticated', c.conrelid, 'UPDATE'));
      IF v_where IS NOT NULL THEN
        RAISE EXCEPTION 'F1-7a part 9 proof (b): % (chain of %) is named by a CHECK of a browser-writable table: %',
          v_name, v_fn, v_where;
      END IF;
      FOR v_p IN
        SELECT p.oid, p.proname::text AS proname, p.prosecdef, p.prorettype = 'trigger'::regtype AS is_trigger
          FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
         WHERE n.nspname NOT IN ('pg_catalog', 'information_schema')
           AND p.proname <> v_name AND p.prosrc ~ ('\m' || v_name || '\M')
      LOOP
        CONTINUE WHEN v_p.prosecdef OR v_p.proname = ANY (v_chain);
        IF v_p.is_trigger THEN
          SELECT string_agg(t.tgrelid::regclass::text, ', ') INTO v_where FROM pg_trigger t
           WHERE t.tgfoid = v_p.oid AND NOT t.tgisinternal
             AND (has_table_privilege('anon', t.tgrelid, 'INSERT') OR has_table_privilege('anon', t.tgrelid, 'UPDATE')
                  OR has_table_privilege('anon', t.tgrelid, 'DELETE')
                  OR has_table_privilege('authenticated', t.tgrelid, 'INSERT')
                  OR has_table_privilege('authenticated', t.tgrelid, 'UPDATE')
                  OR has_table_privilege('authenticated', t.tgrelid, 'DELETE'));
          IF v_where IS NOT NULL THEN
            RAISE EXCEPTION 'F1-7a part 9 proof (b): the trigger function % (chain of %) fires on browser-writable %',
              v_p.proname, v_fn, v_where;
          END IF;
        ELSIF has_function_privilege('anon', v_p.oid, 'EXECUTE') OR has_function_privilege('authenticated', v_p.oid, 'EXECUTE') THEN
          RAISE EXCEPTION 'F1-7a part 9 proof (b): the INVOKER function % (chain of %) is open to a browser role',
            v_p.proname, v_fn;
        END IF;
        v_chain := v_chain || v_p.proname;
      END LOOP;
      v_i := v_i + 1;
    END LOOP;
  END LOOP;
  -- session on a scratch person reads the person's profile through the browser role, while the browser role's direct
  -- call of impersonation_target is refused.
  BEGIN
    v_tag := 'e2e-mig-f17a9-' || v_stem;
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
      (v_a, v_tag || '-a@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_b, v_tag || '-b@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO public.impersonation_sessions (id, actor_id, target_id, reason, expires_at)
    VALUES (v_s, v_b, v_a, 'e2e migration proof scratch', now() + interval '1 hour');
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_b::text, 'role', 'authenticated')::text, true);
    SET LOCAL ROLE authenticated;
    SELECT t.target_id INTO v_got FROM public.impersonated_get_profile(v_s) t;
    BEGIN
      PERFORM public.impersonation_target(v_s);
      v_direct := 'answered';
    EXCEPTION WHEN insufficient_privilege THEN
      v_direct := 'refused';
    END;
    RESET ROLE;
    IF v_got IS DISTINCT FROM v_a OR v_direct IS DISTINCT FROM 'refused' THEN
      RAISE EXCEPTION 'F1-7a part 9 proof (c): the impersonation reader read % (want %), the direct call %', v_got, v_a, v_direct;
    END IF;
    RAISE EXCEPTION 'f1-7a-part-9-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f1-7a-part-9-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261119170800') ON CONFLICT DO NOTHING;
