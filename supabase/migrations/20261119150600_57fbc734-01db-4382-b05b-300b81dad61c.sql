-- e2e-areas: posting, ad-page, admin-attributes, admin-translations

-- Foundations 1, turn F1-7a, part 7 of 10 — THREE READERS SPLIT FROM THEIR SQL CALLERS (DEC-333; brief
-- docs/governance/briefs/f1-doors-7a.md; ruling docs/governance/briefs/f1-doors-7a-ruling-1.md, decisions 1–3).
-- get_attribute_options_version, listing_contact_refusals and translation_scope_ok are each called by the app AND by
-- other functions of public. The old functions keep their names, bodies and headers for their SQL callers, which
-- run them as their owner; their browser EXECUTE leaves anon, authenticated and PUBLIC. The app reads three new
-- readers instead — `<old>_read`, the same arguments and return type, SECURITY DEFINER, STABLE, door_context('reader')
-- first, then the old function's answer — granted to authenticated (and the service role) only.

DO $pre$
DECLARE
  v_md5  text;
  v_fn   text;
  v_want text;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261119170500') THEN
    RAISE EXCEPTION 'F1-7a part 7: the mark 20261119170500 must be applied first';
  END IF;
  FOR v_fn, v_want IN VALUES
      ('public.get_attribute_options_version(uuid)', 'aa19b177393e2622497490154b9cc07c'),
      ('public.listing_contact_refusals(jsonb)', 'd8b57864116db16570058346b4a9e04e'),
      ('public.translation_scope_ok(text)', 'df925ba6ca44fe98a2f67eea830e4d26') LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_fn::regprocedure;
    IF v_md5 IS DISTINCT FROM v_want THEN
      RAISE EXCEPTION 'F1-7a part 7: the live % is not its last declaration''s body (%)', v_fn, v_md5;
    END IF;
  END LOOP;
  IF to_regprocedure('public.get_attribute_options_version_read(uuid)') IS NOT NULL
     OR to_regprocedure('public.listing_contact_refusals_read(jsonb)') IS NOT NULL
     OR to_regprocedure('public.translation_scope_ok_read(text)') IS NOT NULL THEN
    RAISE EXCEPTION 'F1-7a part 7: a _read reader already exists';
  END IF;
END $pre$;

-- ------------------------------------------------------------ 1. get_attribute_options_version_read
CREATE FUNCTION public.get_attribute_options_version_read(p_attribute_id uuid)
 RETURNS text
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path = public
AS $function$
BEGIN
  PERFORM public.door_context('reader');
  RETURN public.get_attribute_options_version(p_attribute_id);
END $function$;
REVOKE ALL ON FUNCTION public.get_attribute_options_version_read(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_attribute_options_version_read(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.get_attribute_options_version_read(uuid) TO service_role;

-- ------------------------------------------------------------ 2. listing_contact_refusals_read
CREATE FUNCTION public.listing_contact_refusals_read(p_pref jsonb)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path = public
AS $function$
BEGIN
  PERFORM public.door_context('reader');
  RETURN public.listing_contact_refusals(p_pref);
END $function$;
REVOKE ALL ON FUNCTION public.listing_contact_refusals_read(jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.listing_contact_refusals_read(jsonb) TO authenticated;
GRANT ALL ON FUNCTION public.listing_contact_refusals_read(jsonb) TO service_role;

-- ------------------------------------------------------------ 3. translation_scope_ok_read
CREATE FUNCTION public.translation_scope_ok_read(p_lang text)
 RETURNS boolean
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path = public
AS $function$
BEGIN
  PERFORM public.door_context('reader');
  RETURN public.translation_scope_ok(p_lang);
END $function$;
REVOKE ALL ON FUNCTION public.translation_scope_ok_read(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.translation_scope_ok_read(text) TO authenticated;
GRANT ALL ON FUNCTION public.translation_scope_ok_read(text) TO service_role;

-- ------------------------------------------------------------ 4. the old names close to browser roles
REVOKE EXECUTE ON FUNCTION public.get_attribute_options_version(uuid) FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.listing_contact_refusals(jsonb) FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.translation_scope_ok(text) FROM anon, authenticated, PUBLIC;

-- ------------------------------------------------------------ PROOFS (scratch rows only, rolled back by the sentinel)
--   (a) the three old functions keep their bodies and headers and are closed to browser roles (the service role
--       keeps what it held); the three readers are STABLE SECURITY DEFINER with search_path public, callable by
--       authenticated and the service role, never by anon or PUBLIC;
--   (b) through the browser role each reader answers what its old function answers on the same input — an
--       attribute's options version, a contact preference's refusals, a language's translation scope for a person
--       without the scope and one with it — while the old name's direct call is refused;
--   (c) signed out → notSignedIn; a deactivated caller → accountDeactivated;
--   (d) the cost: 200 calls of each reader beside its old function, medians as a NOTICE; a new median over 5 ms
--       fails (ruling 7's bar, F1-1).
DO $proof$
DECLARE
  v_stem    text := translate(substr(md5(gen_random_uuid()::text), 1, 10), '0123456789', 'ghijkmnopr');
  v_tag     text;
  v_a       uuid := gen_random_uuid();
  v_s       uuid := gen_random_uuid();
  v_d       uuid := gen_random_uuid();
  v_role    uuid;
  v_attr    uuid;
  v_lang    text;
  v_pref    jsonb := '{"phone": true, "chat": false}'::jsonb;
  v_fn      text;
  v_want    text;
  v_who     text;
  v_call    text;
  v_got     text;
  v_st      text;
  v_old     jsonb;
  v_new     jsonb;
  v_msg     text;
  v_t0      timestamptz;
  v_old_ms  double precision[];
  v_new_ms  double precision[];
  v_mo      double precision;
  v_mn      double precision;
  i         integer;
BEGIN
  -- (a)
  FOR v_fn, v_want IN VALUES
      ('public.get_attribute_options_version(uuid)', 'aa19b177393e2622497490154b9cc07c'),
      ('public.listing_contact_refusals(jsonb)', 'd8b57864116db16570058346b4a9e04e'),
      ('public.translation_scope_ok(text)', 'df925ba6ca44fe98a2f67eea830e4d26') LOOP
    IF (SELECT md5(replace(prosrc, chr(13), '')) FROM pg_proc WHERE oid = v_fn::regprocedure) IS DISTINCT FROM v_want
       OR has_function_privilege('anon', v_fn::regprocedure, 'EXECUTE')
       OR has_function_privilege('authenticated', v_fn::regprocedure, 'EXECUTE')
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn::regprocedure)) a
                   WHERE a.grantee = 0) THEN
      RAISE EXCEPTION 'F1-7a part 7 proof (a): % is not its old body closed to browser roles', v_fn;
    END IF;
  END LOOP;
  IF NOT has_function_privilege('service_role', 'public.get_attribute_options_version(uuid)', 'EXECUTE')
     OR NOT has_function_privilege('service_role', 'public.listing_contact_refusals(jsonb)', 'EXECUTE') THEN
    RAISE EXCEPTION 'F1-7a part 7 proof (a): the service role lost an old function it held';
  END IF;
  FOREACH v_fn IN ARRAY ARRAY['public.get_attribute_options_version_read(uuid)',
                              'public.listing_contact_refusals_read(jsonb)',
                              'public.translation_scope_ok_read(text)'] LOOP
    IF (SELECT proconfig::text <> '{search_path=public}' OR provolatile <> 's' OR NOT prosecdef
          FROM pg_proc WHERE oid = v_fn::regprocedure)
       OR has_function_privilege('anon', v_fn::regprocedure, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn::regprocedure, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn::regprocedure, 'EXECUTE')
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn::regprocedure)) a
                   WHERE a.grantee = 0) THEN
      RAISE EXCEPTION 'F1-7a part 7 proof (a): % is not a STABLE DEFINER reader for authenticated', v_fn;
    END IF;
  END LOOP;

  BEGIN
    v_tag := 'e2e-mig-f17a7-' || v_stem;
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
      (v_a, v_tag || '-a@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_s, v_tag || '-s@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_d, v_tag || '-d@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    UPDATE public.profiles SET account_status = 'deactivated'
     WHERE user_id = v_d
       AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = v_d AND u.email LIKE 'e2e-mig-%');
    INSERT INTO public.roles (name, description) VALUES (v_tag, v_tag) RETURNING id INTO v_role;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'translations' AND p.action = 'manage';
    IF NOT FOUND THEN
      RAISE EXCEPTION 'F1-7a part 7 proof: the translations:manage permission is not declared';
    END IF;
    INSERT INTO public.user_roles (user_id, role_id, scope_type) VALUES (v_s, v_role, 'global');
    v_lang := public.language_code('base');
    v_attr := gen_random_uuid();

    -- (b) each reader beside its old function, by caller; the old name's direct call refused
    FOR v_who, v_call, v_fn IN VALUES
        ('a', format('get_attribute_options_version%%s(%L::uuid)', v_attr), 'get_attribute_options_version'),
        ('a', format('listing_contact_refusals%%s(%L::jsonb)', v_pref), 'listing_contact_refusals'),
        ('a', format('translation_scope_ok%%s(%L)', v_lang), 'translation_scope_ok'),
        ('s', format('translation_scope_ok%%s(%L)', v_lang), 'translation_scope_ok') LOOP
      PERFORM set_config('request.jwt.claims',
        json_build_object('sub', CASE v_who WHEN 'a' THEN v_a ELSE v_s END::text, 'role', 'authenticated')::text, true);
      EXECUTE 'SELECT to_jsonb(public.' || format(v_call, '') || ')' INTO v_old;
      SET LOCAL ROLE authenticated;
      EXECUTE 'SELECT to_jsonb(public.' || format(v_call, '_read') || ')' INTO v_new;
      v_got := NULL;
      BEGIN
        EXECUTE 'SELECT to_jsonb(public.' || format(v_call, '') || ')';
        v_got := 'answered';
      EXCEPTION WHEN insufficient_privilege THEN
        v_got := 'refused';
      END;
      RESET ROLE;
      IF v_new IS DISTINCT FROM v_old OR v_got IS DISTINCT FROM 'refused' THEN
        RAISE EXCEPTION 'F1-7a part 7 proof (b): %_read as % read %, its old function % (old name: %)',
          v_fn, v_who, v_new, v_old, v_got;
      END IF;
    END LOOP;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_s::text, 'role', 'authenticated')::text, true);
    IF public.translation_scope_ok_read(v_lang) IS NOT TRUE THEN
      RAISE EXCEPTION 'F1-7a part 7 proof (b): the scoped person''s translation scope did not read true';
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_a::text, 'role', 'authenticated')::text, true);
    IF public.translation_scope_ok_read(v_lang) IS NOT FALSE THEN
      RAISE EXCEPTION 'F1-7a part 7 proof (b): a person without the scope did not read false';
    END IF;

    -- (c) the gate's refusals, through the browser role
    FOR v_who, v_call IN
      SELECT w.who, c.call
        FROM (VALUES ('out'), ('deactivated')) AS w(who)
       CROSS JOIN (VALUES (format('get_attribute_options_version_read(%L::uuid)', v_attr)),
                          (format('listing_contact_refusals_read(%L::jsonb)', v_pref)),
                          (format('translation_scope_ok_read(%L)', v_lang))) AS c(call)
    LOOP
      PERFORM set_config('request.jwt.claims',
        CASE v_who WHEN 'out' THEN '{}'
                   ELSE json_build_object('sub', v_d::text, 'role', 'authenticated')::text END, true);
      v_want := CASE v_who WHEN 'out' THEN 'notSignedIn' ELSE 'accountDeactivated' END;
      v_got := NULL; v_st := NULL;
      SET LOCAL ROLE authenticated;
      BEGIN
        EXECUTE 'SELECT to_jsonb(public.' || v_call || ')' INTO v_new;
      EXCEPTION WHEN OTHERS THEN
        GET STACKED DIAGNOSTICS v_got = MESSAGE_TEXT, v_st = RETURNED_SQLSTATE;
      END;
      RESET ROLE;
      IF v_got IS DISTINCT FROM v_want OR v_st IS DISTINCT FROM 'P0D01' THEN
        RAISE EXCEPTION 'F1-7a part 7 proof (c): % as % answered % (%), not %', v_call, v_who,
          coalesce(v_got, 'success'), v_st, v_want;
      END IF;
    END LOOP;

    -- (d) the cost, a scoped staff member's reads
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_s::text, 'role', 'authenticated')::text, true);
    FOR v_call, v_fn IN VALUES
        (format('get_attribute_options_version%%s(%L::uuid)', v_attr), 'get_attribute_options_version_read'),
        (format('listing_contact_refusals%%s(%L::jsonb)', v_pref), 'listing_contact_refusals_read'),
        (format('translation_scope_ok%%s(%L)', v_lang), 'translation_scope_ok_read') LOOP
      v_old_ms := ARRAY[]::double precision[];
      v_new_ms := ARRAY[]::double precision[];
      FOR i IN 1..200 LOOP
        v_t0 := clock_timestamp();
        EXECUTE 'SELECT to_jsonb(public.' || format(v_call, '') || ')' INTO v_old;
        v_old_ms := array_append(v_old_ms, extract(epoch FROM clock_timestamp() - v_t0) * 1000.0);
        v_t0 := clock_timestamp();
        EXECUTE 'SELECT to_jsonb(public.' || format(v_call, '_read') || ')' INTO v_new;
        v_new_ms := array_append(v_new_ms, extract(epoch FROM clock_timestamp() - v_t0) * 1000.0);
      END LOOP;
      SELECT percentile_cont(0.5) WITHIN GROUP (ORDER BY s) INTO v_mo FROM unnest(v_old_ms) AS s;
      SELECT percentile_cont(0.5) WITHIN GROUP (ORDER BY s) INTO v_mn FROM unnest(v_new_ms) AS s;
      RAISE NOTICE 'F1-7a part 7 cost: % median old % ms, new % ms', v_fn, round(v_mo::numeric, 4), round(v_mn::numeric, 4);
      IF v_mn > 5 THEN
        RAISE EXCEPTION 'F1-7a part 7 proof (d): % takes % ms a call (ruling 7''s bar: 5 ms)', v_fn, round(v_mn::numeric, 3);
      END IF;
    END LOOP;

    RAISE EXCEPTION 'f1-7a-part-7-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f1-7a-part-7-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261119170600') ON CONFLICT DO NOTHING;
