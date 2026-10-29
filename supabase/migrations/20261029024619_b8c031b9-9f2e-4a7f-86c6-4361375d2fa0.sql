-- Foundations turn D1, M6c-6 — INC-951 part 3c, the import_commit / import_undo database gates
-- (ruling, stop 10, item 2; method ruled at stop 16, item 3: a door body over about 10 KB is
-- redeclared by computed insertion with md5 guards, never retyped).
--   * the translations commit (admin_import_translations) and undo (admin_undo_import) doors gated with import_commit / import_undo; their grants stay as live (no service_role — E2 restates, never adds).
--   * Method: the live body is read inside the migration, CR-normalised (INC-968), checked against
--     the expected old md5, the gate inserted with replace() on the unique step-up anchor, checked
--     against the expected new md5, then applied with EXECUTE CREATE OR REPLACE whose header comes
--     from the live definition; post-apply, prosecdef/provolatile/proconfig/proargdefaults/ACL and
--     the applied md5 are asserted. The ONLY change is the gate block, right after the step-up line
--     (the door's last authority check) and before its first write.
--   * admin_import_translations: old md5 d9480129cde6ed8ccf23a4b8fb249d77, new md5 1a043985654770be62cdf12358c7b269; anchor "PERFORM public.require_step_up_if_needed('translations', 'update');"; last whole in-file declaration: 20261028235443_3e3ea913-f01e-472e-a2dd-671adba96a2e.sql.
--   * admin_undo_import: old md5 ee0e979fa9b96654b5329ede136d0711, new md5 9f49201faa7c3284707c3e51a41b9f40; anchor "PERFORM public.require_step_up_if_needed('translations', 'manage');"; last whole in-file declaration: 20260902031954_494fcabd-9448-4713-8e1c-e202877a71f1.sql.

DO $$
DECLARE
  v_src text; v_norm text; v_new text;
  v_args text; v_result text;
  v_secdef boolean; v_volatile "char"; v_config text[]; v_defaults text; v_acl text;
  v_anchor text := E'  PERFORM public.require_step_up_if_needed(''translations'', ''update'');';
  v_gate text := E'  -- INC-951 3c (D1 M6c) — after the door''s authority, before its first write: its dial (import_commit).\n  IF NOT coalesce((public.rate_gate(''import_commit'')->>''allowed'')::boolean, false) THEN RAISE EXCEPTION ''rateLimited''; END IF;\n';
BEGIN
  SELECT p.prosrc, pg_get_function_arguments(p.oid), pg_get_function_result(p.oid),
         p.prosecdef, p.provolatile, p.proconfig,
         coalesce(p.proargdefaults::text, ''), coalesce(p.proacl::text, '')
    INTO v_src, v_args, v_result, v_secdef, v_volatile, v_config, v_defaults, v_acl
    FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
   WHERE n.nspname = 'public' AND p.proname = 'admin_import_translations';
  IF NOT FOUND THEN RAISE EXCEPTION 'M6c-6: the door admin_import_translations is missing'; END IF;
  v_norm := replace(v_src, E'\r', '');
  IF md5(v_norm) <> 'd9480129cde6ed8ccf23a4b8fb249d77' THEN
    RAISE EXCEPTION 'M6c-6: old body md5 mismatch for admin_import_translations: %', md5(v_norm);
  END IF;
  IF (length(v_norm) - length(replace(v_norm, v_anchor, ''))) / length(v_anchor) <> 1 THEN
    RAISE EXCEPTION 'M6c-6: the step-up anchor is not unique in admin_import_translations';
  END IF;
  v_new := replace(v_norm, v_anchor, v_anchor || E'\n' || v_gate);
  IF md5(v_new) <> '1a043985654770be62cdf12358c7b269' THEN
    RAISE EXCEPTION 'M6c-6: new body md5 mismatch for admin_import_translations: %', md5(v_new);
  END IF;
  EXECUTE format('CREATE OR REPLACE FUNCTION public.admin_import_translations(%s) RETURNS %s LANGUAGE plpgsql SECURITY %s %s SET search_path = public AS $m6c$%s$m6c$',
    v_args, v_result,
    CASE WHEN v_secdef THEN 'DEFINER' ELSE 'INVOKER' END,
    CASE v_volatile WHEN 's' THEN 'STABLE' WHEN 'i' THEN 'IMMUTABLE' ELSE 'VOLATILE' END,
    v_new);
  PERFORM 1 FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
   WHERE n.nspname = 'public' AND p.proname = 'admin_import_translations'
     AND p.prosecdef = v_secdef AND p.provolatile = v_volatile
     AND coalesce(p.proconfig::text, '') = coalesce(v_config::text, '')
     AND coalesce(p.proargdefaults::text, '') = v_defaults
     AND coalesce(p.proacl::text, '') = v_acl
     AND md5(replace(p.prosrc, E'\r', '')) = '1a043985654770be62cdf12358c7b269';
  IF NOT FOUND THEN RAISE EXCEPTION 'M6c-6: post-apply drift for admin_import_translations'; END IF;
END $$;

DO $$
DECLARE
  v_src text; v_norm text; v_new text;
  v_args text; v_result text;
  v_secdef boolean; v_volatile "char"; v_config text[]; v_defaults text; v_acl text;
  v_anchor text := E'  PERFORM public.require_step_up_if_needed(''translations'', ''manage'');';
  v_gate text := E'  -- INC-951 3c (D1 M6c) — after the door''s authority, before its first write: its dial (import_undo).\n  IF NOT coalesce((public.rate_gate(''import_undo'')->>''allowed'')::boolean, false) THEN RAISE EXCEPTION ''rateLimited''; END IF;\n';
BEGIN
  SELECT p.prosrc, pg_get_function_arguments(p.oid), pg_get_function_result(p.oid),
         p.prosecdef, p.provolatile, p.proconfig,
         coalesce(p.proargdefaults::text, ''), coalesce(p.proacl::text, '')
    INTO v_src, v_args, v_result, v_secdef, v_volatile, v_config, v_defaults, v_acl
    FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
   WHERE n.nspname = 'public' AND p.proname = 'admin_undo_import';
  IF NOT FOUND THEN RAISE EXCEPTION 'M6c-6: the door admin_undo_import is missing'; END IF;
  v_norm := replace(v_src, E'\r', '');
  IF md5(v_norm) <> 'ee0e979fa9b96654b5329ede136d0711' THEN
    RAISE EXCEPTION 'M6c-6: old body md5 mismatch for admin_undo_import: %', md5(v_norm);
  END IF;
  IF (length(v_norm) - length(replace(v_norm, v_anchor, ''))) / length(v_anchor) <> 1 THEN
    RAISE EXCEPTION 'M6c-6: the step-up anchor is not unique in admin_undo_import';
  END IF;
  v_new := replace(v_norm, v_anchor, v_anchor || E'\n' || v_gate);
  IF md5(v_new) <> '9f49201faa7c3284707c3e51a41b9f40' THEN
    RAISE EXCEPTION 'M6c-6: new body md5 mismatch for admin_undo_import: %', md5(v_new);
  END IF;
  EXECUTE format('CREATE OR REPLACE FUNCTION public.admin_undo_import(%s) RETURNS %s LANGUAGE plpgsql SECURITY %s %s SET search_path = public AS $m6c$%s$m6c$',
    v_args, v_result,
    CASE WHEN v_secdef THEN 'DEFINER' ELSE 'INVOKER' END,
    CASE v_volatile WHEN 's' THEN 'STABLE' WHEN 'i' THEN 'IMMUTABLE' ELSE 'VOLATILE' END,
    v_new);
  PERFORM 1 FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
   WHERE n.nspname = 'public' AND p.proname = 'admin_undo_import'
     AND p.prosecdef = v_secdef AND p.provolatile = v_volatile
     AND coalesce(p.proconfig::text, '') = coalesce(v_config::text, '')
     AND coalesce(p.proargdefaults::text, '') = v_defaults
     AND coalesce(p.proacl::text, '') = v_acl
     AND md5(replace(p.prosrc, E'\r', '')) = '9f49201faa7c3284707c3e51a41b9f40';
  IF NOT FOUND THEN RAISE EXCEPTION 'M6c-6: post-apply drift for admin_undo_import'; END IF;
END $$;

DO $proof$
DECLARE
  v_fn text; v_old text; v_new text; v_svc boolean; v_oid oid; v_src text; v_gate text;
  v_uid uuid := gen_random_uuid();
  v_session uuid := gen_random_uuid();
  v_msg text; v_before text; v_after text;
  v_calls text[] := ARRAY[
    'SELECT public.admin_import_translations(''zz'', ''1''::jsonb)',
    'SELECT public.admin_undo_import(gen_random_uuid())'];
  v_call text;
BEGIN
  -- (1) structure: the live body is the old body plus exactly the gate block; the gate sits after the
  -- step-up line and before the first write; the header and the ACL are unchanged.
  FOR v_fn, v_old, v_new, v_gate, v_svc IN VALUES
    ('admin_import_translations(text, jsonb)', 'd9480129cde6ed8ccf23a4b8fb249d77', '1a043985654770be62cdf12358c7b269', E'  -- INC-951 3c (D1 M6c) — after the door''s authority, before its first write: its dial (import_commit).\n  IF NOT coalesce((public.rate_gate(''import_commit'')->>''allowed'')::boolean, false) THEN RAISE EXCEPTION ''rateLimited''; END IF;\n', false),
    ('admin_undo_import(uuid)', 'ee0e979fa9b96654b5329ede136d0711', '9f49201faa7c3284707c3e51a41b9f40', E'  -- INC-951 3c (D1 M6c) — after the door''s authority, before its first write: its dial (import_undo).\n  IF NOT coalesce((public.rate_gate(''import_undo'')->>''allowed'')::boolean, false) THEN RAISE EXCEPTION ''rateLimited''; END IF;\n', false)
  LOOP
    v_oid := ('public.' || v_fn)::regprocedure;
    SELECT replace(prosrc, E'\r', '') INTO v_src FROM pg_proc WHERE oid = v_oid;
    IF md5(v_src) <> v_new
       OR md5(replace(v_src, v_gate || E'\n', '')) <> v_old
       OR position('require_step_up_if_needed' IN v_src) > position('rate_gate(' IN v_src)
       OR position('rate_gate(' IN v_src) > least(
            coalesce(nullif(position('INSERT INTO' IN v_src), 0), 1000000),
            coalesce(nullif(position('UPDATE public.' IN v_src), 0), 1000000),
            coalesce(nullif(position('DELETE FROM' IN v_src), 0), 1000000))
       OR (SELECT NOT prosecdef OR proconfig::text <> '{search_path=public}' FROM pg_proc WHERE oid = v_oid)
       OR has_function_privilege('anon', v_oid, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_oid, 'EXECUTE')
       OR has_function_privilege('service_role', v_oid, 'EXECUTE') <> v_svc THEN
      RAISE EXCEPTION 'M6c-6 proof (1): % failed [md5=%, stripped=%, stepup=%, gate=%]',
        v_fn, md5(v_src), md5(replace(v_src, v_gate || E'\n', '')),
        position('require_step_up_if_needed' IN v_src), position('rate_gate(' IN v_src);
    END IF;
  END LOOP;

  -- (2) behaviour, the dial overridden to 1, a scratch super admin at aal2: each door's first call passes
  -- the gate (it answers its own refusal for scratch arguments, and a refused call's gate increment rolls
  -- back with it); with the window spent, each door's next call is refused rateLimited and writes nothing
  -- (no audit row by the caller, the family tables unchanged).
  BEGIN
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
      (v_uid, 'e2e-d1-m6c-' || v_uid || '@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO public.user_roles (user_id, role_id, scope_type)
    SELECT v_uid, r.id, 'global' FROM public.roles r WHERE r.name = 'super_admin';
    INSERT INTO auth.sessions (id, user_id, created_at, updated_at, aal) VALUES (v_session, v_uid, now(), now(), 'aal2');
    INSERT INTO auth.mfa_factors (id, user_id, friendly_name, factor_type, status, created_at, updated_at, secret)
    VALUES (gen_random_uuid(), v_uid, 'd1-m6c-proof', 'totp', 'verified', now(), now(), 'PROOFSECRET');
    INSERT INTO auth.mfa_amr_claims (id, session_id, created_at, updated_at, authentication_method)
    VALUES (gen_random_uuid(), v_session, now(), now(), 'totp');
    PERFORM set_config('request.jwt.claims',
      json_build_object('sub', v_uid::text, 'role', 'authenticated', 'aal', 'aal2',
                        'session_id', v_session::text,
                        'amr', json_build_array(json_build_object('method', 'totp')))::text, true);
    INSERT INTO public.rate_overrides (user_id, action, max_count) VALUES (v_uid, 'import_commit', 1);
    INSERT INTO public.rate_overrides (user_id, action, max_count) VALUES (v_uid, 'import_undo', 1);

    FOREACH v_call IN ARRAY v_calls LOOP
      v_msg := 'answered';
      BEGIN
        EXECUTE v_call;
      EXCEPTION WHEN OTHERS THEN v_msg := SQLERRM;
      END;
      IF v_msg = 'rateLimited' OR v_msg IN ('permission denied', 'not authenticated', 'not signed in') OR v_msg LIKE '%step-up%' THEN
        RAISE EXCEPTION 'M6c-6 proof (2): a first call did not pass the gate: % -> %', v_call, v_msg;
      END IF;
    END LOOP;

    PERFORM public.rate_gate('import_commit');
    PERFORM public.rate_gate('import_undo');
    SELECT md5(concat_ws('|', (SELECT count(*) FROM public.ui_translation_revisions), (SELECT count(*) FROM public.ui_translations), (SELECT count(*) FROM public.audit_log WHERE actor_id = v_uid), (SELECT coalesce(sum(count), 0) FROM public.rate_limits WHERE key = v_uid::text))) INTO v_before;
    FOREACH v_call IN ARRAY v_calls LOOP
      v_msg := 'answered';
      BEGIN
        EXECUTE v_call;
      EXCEPTION WHEN OTHERS THEN v_msg := SQLERRM;
      END;
      IF v_msg IS DISTINCT FROM 'rateLimited' THEN
        RAISE EXCEPTION 'M6c-6 proof (2): the n+1th call was not refused: % -> %', v_call, v_msg;
      END IF;
    END LOOP;
    SELECT md5(concat_ws('|', (SELECT count(*) FROM public.ui_translation_revisions), (SELECT count(*) FROM public.ui_translations), (SELECT count(*) FROM public.audit_log WHERE actor_id = v_uid), (SELECT coalesce(sum(count), 0) FROM public.rate_limits WHERE key = v_uid::text))) INTO v_after;
    IF v_before IS DISTINCT FROM v_after THEN
      RAISE EXCEPTION 'M6c-6 proof (2): a refused call wrote something';
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'd1-m6c-6-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'd1-m6c-6-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261029170000');