-- e2e-areas: admin-translations
-- Foundations 1, turn F1-3, part 7 of 12 — THE LANGUAGE DOORS ONTO DOOR_CONTEXT AND THE SHELL (DEC-333; brief
-- docs/governance/briefs/f1-doors-3.md; ruling 1). admin_upsert_language,
-- admin_delete_language, admin_set_language_flags, admin_set_language_order and set_language_order_impl are redeclared
-- WHOLE from their last declarations (live md5 checked). Each gate becomes ONE door_context('staff',
-- translations:manage, staff_config, global) and the shell — admin_upsert_language global by ruling 1 item 1
-- (DEC-383) —; the refusal sentences become door_refuse codes (badValue:code, nameRequired, badLanguage, baseLanguage,
-- languagePublished, pseudoLanguage, catalogEmpty, notFullyApproved:<remaining>, emptyList) and the pseudo literal a
-- language_code call. Three returned void: DROP + CREATE as RETURNS jsonb {ok:true}, grants restated. Proofs on
-- scratch rows under a sentinel rollback.

DO $pre$
DECLARE
  v_pairs text[][] := ARRAY[
    ['public.admin_upsert_language(text,text,text,boolean,text[])', 'e5f0383974332ee98bd1e4b7da8fdeb1'],
    ['public.admin_delete_language(text)', '4270f579415c587bf64505d7b5dc4b4e'],
    ['public.admin_set_language_flags(text,boolean,boolean)', '7fd039e6acd98c3192c8b5524c5a3eb5'],
    ['public.admin_set_language_order(text[])', '2cee1d7fcc888468bca66e73c523e2ba'],
    ['public.set_language_order_impl(text[])', '56ab6d2e38647d1e45c7e729d0293d50']];
  v_md5  text;
  i      integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261114130500') THEN
    RAISE EXCEPTION 'F1-3 part 7: part 6 (337ffc64) must be applied first';
  END IF;
  IF to_regprocedure('public.language_code(text)') IS NULL THEN
    RAISE EXCEPTION 'F1-3 part 7: part 1''s language_code is missing';
  END IF;
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_pairs[i][1]::regprocedure;
    IF v_md5 IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-3 part 7: the live % is not its last declaration''s body (%)', v_pairs[i][1], v_md5;
    END IF;
  END LOOP;
END $pre$;

-- ------------------------------------------------------------ 1. admin_upsert_language (whole from 20261029015903 :173; void → jsonb, the gate on door_context (global) and the shell)
DROP FUNCTION public.admin_upsert_language(text, text, text, boolean, text[]);
CREATE FUNCTION public.admin_upsert_language(p_code text, p_name_en text, p_name_native text, p_rtl boolean DEFAULT false, p_country_codes text[] DEFAULT '{}'::text[])
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE v_code text; v_sort integer; v_countries text[];
BEGIN
  PERFORM public.door_context('staff', 'translations', 'manage', 'staff_config', NULL, 'global');

  v_code := lower(btrim(COALESCE(p_code, '')));
  IF v_code !~ '^[a-z]{2,8}(-[a-z0-9]{2,8})?$' THEN
    PERFORM public.door_refuse('badValue', 'code');
  END IF;
  IF btrim(COALESCE(p_name_en, '')) = '' OR btrim(COALESCE(p_name_native, '')) = '' THEN
    PERFORM public.door_refuse('nameRequired');
  END IF;

  SELECT COALESCE(array_agg(DISTINCT upper(btrim(c))), '{}'::text[]) INTO v_countries
    FROM unnest(COALESCE(p_country_codes, '{}'::text[])) AS c
   WHERE btrim(c) <> '';

  v_sort := public.next_language_sort();

  INSERT INTO public.languages (code, name_en, name_native, rtl, sort, country_codes)
  VALUES (v_code, btrim(p_name_en), btrim(p_name_native), COALESCE(p_rtl, false),
          v_sort, v_countries)
  ON CONFLICT (code) DO UPDATE
    SET name_en = EXCLUDED.name_en, name_native = EXCLUDED.name_native,
        rtl = EXCLUDED.rtl, country_codes = EXCLUDED.country_codes,
        updated_at = now();

  PERFORM public.log_audit('translation.language_upsert', 'languages', v_code,
    jsonb_build_object('lang', v_code, 'action', 'upsert', 'machine', false,
                       'countries', to_jsonb(v_countries)));
  RETURN jsonb_build_object('ok', true);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_upsert_language', 'staff_config', SQLERRM);
END $function$;
COMMENT ON FUNCTION public.admin_upsert_language(text, text, text, boolean, text[]) IS
  'F1-3 on the door shell (DEC-333): adds or renames a language behind door_context(staff, translations:manage, staff_config, global — languages are configuration, DEC-383); refuses badValue:code / nameRequired; audits translation.language_upsert; answers {ok:true}.';
REVOKE ALL ON FUNCTION public.admin_upsert_language(text, text, text, boolean, text[]) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_upsert_language(text, text, text, boolean, text[]) TO authenticated;

-- ------------------------------------------------------------ 2. admin_delete_language (whole from 20260902021248 :48; the gate on door_context and the shell)
CREATE OR REPLACE FUNCTION public.admin_delete_language(p_code text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_is_base boolean; v_public boolean;
  c_assign bigint; c_ui bigint; c_entity bigint; c_rev bigint;
BEGIN
  PERFORM public.door_context('staff', 'translations', 'manage', 'staff_config', NULL, 'global');

  SELECT l.is_base, l.enabled_public INTO v_is_base, v_public
    FROM public.languages l WHERE l.code = p_code;
  IF NOT FOUND THEN PERFORM public.door_refuse('badLanguage'); END IF;

  IF v_is_base THEN
    PERFORM public.door_refuse('baseLanguage');
  END IF;
  IF v_public THEN
    PERFORM public.door_refuse('languagePublished');
  END IF;

  WITH d AS (
    DELETE FROM public.ui_translation_revisions WHERE lang_code = p_code RETURNING 1
  ) SELECT count(*) INTO c_rev FROM d;

  WITH d AS (
    DELETE FROM public.ui_translations WHERE lang_code = p_code RETURNING 1
  ) SELECT count(*) INTO c_ui FROM d;

  WITH d AS (
    DELETE FROM public.entity_translations WHERE lang_code = p_code RETURNING 1
  ) SELECT count(*) INTO c_entity FROM d;

  WITH d AS (
    DELETE FROM public.translator_languages WHERE lang_code = p_code RETURNING 1
  ) SELECT count(*) INTO c_assign FROM d;

  DELETE FROM public.languages WHERE code = p_code;

  PERFORM public.log_audit('translation.language_delete', 'languages', p_code,
    jsonb_build_object(
      'lang', p_code,
      'action', 'delete',
      'machine', false,
      'assignments', COALESCE(c_assign, 0),
      'ui_rows', COALESCE(c_ui, 0),
      'entity_rows', COALESCE(c_entity, 0),
      'revisions', COALESCE(c_rev, 0)
    ));

  RETURN jsonb_build_object(
    'code', p_code,
    'assignments', COALESCE(c_assign, 0),
    'ui_rows', COALESCE(c_ui, 0),
    'entity_rows', COALESCE(c_entity, 0),
    'revisions', COALESCE(c_rev, 0)
  );
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_delete_language', 'staff_config', SQLERRM);
END $function$;
REVOKE ALL ON FUNCTION public.admin_delete_language(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_delete_language(text) TO authenticated;

-- ------------------------------------------------------------ 3. admin_set_language_flags (whole from 20260901234603 :230; void → jsonb, the gate on door_context and the shell, the pseudo literal as a role)
DROP FUNCTION public.admin_set_language_flags(text, boolean, boolean);
CREATE FUNCTION public.admin_set_language_flags(p_code text, p_enabled_admin boolean, p_enabled_public boolean)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_base text; v_total bigint; v_approved bigint; v_is_base boolean;
BEGIN
  PERFORM public.door_context('staff', 'translations', 'manage', 'staff_config', NULL, 'global');

  SELECT l.is_base INTO v_is_base FROM public.languages l WHERE l.code = p_code;
  IF NOT FOUND THEN PERFORM public.door_refuse('badLanguage'); END IF;
  SELECT l.code INTO v_base FROM public.languages l WHERE l.is_base LIMIT 1;

  -- U4i ⑦: 'zxa' is the reserved pseudo-localization row (layout QA only).
  IF p_enabled_public AND p_code = public.language_code('pseudo') THEN
    PERFORM public.door_refuse('pseudoLanguage');
  END IF;

  IF p_enabled_public AND NOT v_is_base THEN
    SELECT count(*) INTO v_total
      FROM public.ui_translations t
     WHERE t.lang_code = v_base AND NOT t.orphaned;
    IF v_total = 0 THEN
      PERFORM public.door_refuse('catalogEmpty');
    END IF;
    SELECT count(*) INTO v_approved
      FROM public.ui_translations t
     WHERE t.lang_code = p_code AND t.status = 'approved'
       AND t.value IS NOT NULL AND NOT t.orphaned;
    IF v_approved < v_total THEN
      PERFORM public.door_refuse('notFullyApproved', (v_total - v_approved)::text);
    END IF;
  END IF;

  UPDATE public.languages
     SET enabled_admin = COALESCE(p_enabled_admin, enabled_admin),
         enabled_public = COALESCE(p_enabled_public, enabled_public),
         updated_at = now()
   WHERE code = p_code;

  PERFORM public.log_audit('translation.language_flags', 'languages', p_code,
    jsonb_build_object('lang', p_code, 'action', 'flags', 'machine', false,
                       'enabled_admin', p_enabled_admin,
                       'enabled_public', p_enabled_public));
  RETURN jsonb_build_object('ok', true);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_set_language_flags', 'staff_config', SQLERRM);
END $function$;
COMMENT ON FUNCTION public.admin_set_language_flags(text, boolean, boolean) IS
  'F1-3 on the door shell (DEC-333): sets a language''s admin and public flags behind door_context(staff, translations:manage, staff_config, global); refuses badLanguage / pseudoLanguage / catalogEmpty / notFullyApproved:<remaining>; audits translation.language_flags; answers {ok:true}.';
REVOKE ALL ON FUNCTION public.admin_set_language_flags(text, boolean, boolean) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_set_language_flags(text, boolean, boolean) TO authenticated;

-- ------------------------------------------------------------ 4. admin_set_language_order (whole from 20260831060745 :143; void → jsonb, the gate on door_context and the shell)
DROP FUNCTION public.admin_set_language_order(text[]);
CREATE FUNCTION public.admin_set_language_order(p_codes text[])
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  PERFORM public.door_context('staff', 'translations', 'manage', 'staff_config', NULL, 'global');
  PERFORM public.set_language_order_impl(p_codes);
  RETURN jsonb_build_object('ok', true);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_set_language_order', 'staff_config', SQLERRM);
END $$;
COMMENT ON FUNCTION public.admin_set_language_order(text[]) IS
  'F1-3 on the door shell (DEC-333): orders the language roster behind door_context(staff, translations:manage, staff_config, global); the impl refuses emptyList / badLanguage and audits translation.language_order; answers {ok:true}.';
REVOKE ALL ON FUNCTION public.admin_set_language_order(text[]) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_set_language_order(text[]) TO authenticated;

-- ------------------------------------------------------------ 5. set_language_order_impl (whole from 20260831060745 :97; the refusals as codes)
CREATE OR REPLACE FUNCTION public.set_language_order_impl(p_codes text[])
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_codes text[];
  v_old   jsonb;
  v_new   jsonb;
BEGIN
  v_codes := COALESCE(p_codes, ARRAY[]::text[]);
  IF array_length(v_codes, 1) IS NULL THEN
    PERFORM public.door_refuse('emptyList');
  END IF;
  IF EXISTS (
    SELECT 1 FROM unnest(v_codes) c
     WHERE NOT EXISTS (SELECT 1 FROM public.languages l WHERE l.code = c)
  ) THEN
    PERFORM public.door_refuse('badLanguage');
  END IF;

  SELECT jsonb_agg(x.code ORDER BY x.sort, x.code) INTO v_old
    FROM (SELECT l.code, l.sort FROM public.languages l) x;

  UPDATE public.languages l
     SET sort = pos.ord::int - 1, updated_at = now()
    FROM unnest(v_codes) WITH ORDINALITY AS pos(code, ord)
   WHERE l.code = pos.code;

  -- Everyone not named keeps their relative order, after the named block.
  WITH rest AS (
    SELECT l.code, row_number() OVER (ORDER BY l.sort, l.code) AS rn
      FROM public.languages l
     WHERE NOT (l.code = ANY (v_codes))
  )
  UPDATE public.languages l
     SET sort = array_length(v_codes, 1) + rest.rn::int - 1, updated_at = now()
    FROM rest
   WHERE l.code = rest.code;

  SELECT jsonb_agg(x.code ORDER BY x.sort, x.code) INTO v_new
    FROM (SELECT l.code, l.sort FROM public.languages l) x;

  PERFORM public.log_audit('translation.language_order', 'languages', 'roster',
    jsonb_build_object('action', 'order', 'machine', false,
                       'old', v_old, 'new', v_new));
END $$;
REVOKE ALL ON FUNCTION public.set_language_order_impl(text[]) FROM PUBLIC, anon, authenticated;

-- ------------------------------------------------------------ 6. PROOFS
-- (a) catalog facts: the four doors VOLATILE SECURITY DEFINER, RETURNS jsonb, EXECUTE for authenticated and not for
--     anon or PUBLIC; the order impl closed to browser roles; every body this file's (md5).
-- (b) the gates: accountDeactivated, permissionDenied for a caller without translations:manage (a translator
--     included), none spending staff_config or writing.
-- (c) each door's own codes, every earlier check cleared, the exact message, a 400, nothing written; a new language and
--     its deletion, and a language's admin flag, each with its row and audit line. admin_set_language_order spans the
--     whole roster: proven on its refusals only. catalogEmpty needs an empty base catalogue and is not driven (the
--     proof's own base rows make it non-empty). staff_config counted once per call past the gates; every refusal
--     metered.
DO $proof$
DECLARE
  v_hex     text := replace(gen_random_uuid()::text, '-', '');
  v_tag     text;
  v_letters text;
  v_lang    text;
  v_lang2   text;
  v_nolang  text;
  v_key     text;
  v_key2    text;
  v_keyf    text;
  v_staff   uuid := gen_random_uuid();
  v_plain   uuid := gen_random_uuid();
  v_deact   uuid := gen_random_uuid();
  v_tr      uuid := gen_random_uuid();
  v_sess    uuid := gen_random_uuid();
  v_sess_t  uuid := gen_random_uuid();
  v_role_s  uuid;
  v_role_t  uuid;
  v_cat     uuid;
  v_cat2    uuid;
  v_answer  jsonb;
  v_count   integer;
  v_refused bigint;
  v_msg     text;
  v_fn      regprocedure;
  v_pairs   text[][];
  i         integer;
BEGIN
  v_tag := 'e2e-mig-f13p7-' || substr(v_hex, 1, 10);
  -- one draw: letters only, for the scratch language codes
  v_letters := translate(substr(v_hex, 11, 10), '0123456789', 'ghijkmnopr');
  v_lang := 'q' || substr(v_letters, 1, 7);
  v_lang2 := 'r' || substr(v_letters, 1, 7);
  v_nolang := 's' || substr(v_letters, 1, 7);
  v_key := v_tag || '.key';
  v_key2 := v_tag || '.key2';
  v_keyf := v_tag || '.flagged';
  -- (a)
  v_pairs := ARRAY[
    ['public.admin_upsert_language(text,text,text,boolean,text[])', 'b1304a766a88f64b00822b93f7017876'],
    ['public.admin_delete_language(text)', 'e0b17f0abad66980849d14f497f2bedb'],
    ['public.admin_set_language_flags(text,boolean,boolean)', 'ab7993b06e8f156b6bd4599322bf1d9d'],
    ['public.admin_set_language_order(text[])', 'df9fdf14a3f1dc05e84da2275b9e73bc']];
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    v_fn := v_pairs[i][1]::regprocedure;
    IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' OR prorettype <> 'jsonb'::regtype
          FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-3 part 7 proof (a): the door %''s header, return type or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-3 part 7 proof (a): %''s body differs from this file', v_fn;
    END IF;
  END LOOP;
  v_pairs := ARRAY[
    ['public.set_language_order_impl(text[])', 'cb7d4f1c45b93b483551842b74c20f1f']];
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    v_fn := v_pairs[i][1]::regprocedure;
    IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' OR prorettype <> 'void'::regtype
          FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR has_function_privilege('authenticated', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-3 part 7 proof (a): the impl %''s header, return type or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-3 part 7 proof (a): %''s body differs from this file', v_fn;
    END IF;
  END LOOP;

  BEGIN
    IF EXISTS (SELECT 1 FROM public.languages WHERE code IN (v_lang, v_lang2, v_nolang)) THEN
      RAISE EXCEPTION 'F1-3 part 7 proof: a scratch language code already exists';
    END IF;
    INSERT INTO public.languages (code, name_en, name_native, enabled_admin, enabled_public, sort)
    VALUES (v_lang, v_tag, v_tag, true, false, 9001);
    INSERT INTO public.ui_translations (key, lang_code, value, status)
    VALUES (v_key, public.language_code('base'), 'Hello {name}', 'approved'),
           (v_key2, public.language_code('base'), 'Bye {name}', 'approved'),
           (v_keyf, public.language_code('base'), 'Flag', 'approved');
    INSERT INTO public.categories (name_en, slug) VALUES (v_tag, v_tag) RETURNING id INTO v_cat;
    INSERT INTO public.categories (name_en, slug) VALUES (v_tag || ' two', v_tag || '-two') RETURNING id INTO v_cat2;
    INSERT INTO auth.users (id, email, encrypted_password, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
      (v_staff, v_tag || '-staff@example.invalid', NULL, '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_plain, v_tag || '-plain@example.invalid', NULL, '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_deact, v_tag || '-deact@example.invalid', NULL, '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_tr, v_tag || '-tr@example.invalid', NULL, '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO auth.mfa_factors (id, user_id, friendly_name, factor_type, status, created_at, updated_at)
    SELECT gen_random_uuid(), u, v_tag || '-f', 'totp', 'verified', now(), now() FROM unnest(ARRAY[v_staff, v_tr]) u;
    INSERT INTO auth.sessions (id, user_id, created_at, updated_at, aal) VALUES (v_sess, v_staff, now(), now(), 'aal2'), (v_sess_t, v_tr, now(), now(), 'aal2');
    INSERT INTO auth.mfa_amr_claims (id, session_id, created_at, updated_at, authentication_method)
    VALUES (gen_random_uuid(), v_sess, now(), now(), 'totp'), (gen_random_uuid(), v_sess_t, now(), now(), 'totp');
    UPDATE public.profiles SET account_status = 'deactivated'
     WHERE user_id = v_deact
       AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = v_deact AND u.email LIKE 'e2e-mig-%');
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-staff', v_tag) RETURNING id INTO v_role_s;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role_s, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'translations' AND p.action IN ('view', 'update', 'machine', 'approve', 'manage');
    IF (SELECT count(*) FROM public.role_permissions WHERE role_id = v_role_s) <> 5 THEN
      RAISE EXCEPTION 'F1-3 part 7 proof: a translations permission of the staff role is not declared';
    END IF;
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-translator', v_tag) RETURNING id INTO v_role_t;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role_t, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'translations' AND p.action IN ('view', 'update', 'approve');
    IF (SELECT count(*) FROM public.role_permissions WHERE role_id = v_role_t) <> 3 THEN
      RAISE EXCEPTION 'F1-3 part 7 proof: a translations permission of the translator role is not declared';
    END IF;
    INSERT INTO public.user_roles (user_id, role_id, scope_type)
    VALUES (v_staff, v_role_s, 'global'), (v_deact, v_role_s, 'global'), (v_tr, v_role_t, 'global');
    INSERT INTO public.languages (code, name_en, name_native, enabled_admin, enabled_public, sort)
    VALUES (v_lang2, v_tag || ' public', v_tag || ' public', true, true, 9002);
    IF NOT EXISTS (SELECT 1 FROM public.languages WHERE code = public.language_code('pseudo')) THEN
      INSERT INTO public.languages (code, name_en, name_native, enabled_admin, enabled_public, sort)
      VALUES (public.language_code('pseudo'), v_tag || ' pseudo', v_tag || ' pseudo', true, false, 9003);
    END IF;

    -- (b) the gates
    SELECT coalesce(sum(count), 0) INTO v_refused FROM public.door_refusals WHERE day = current_date
       AND door IN ('admin_upsert_language', 'admin_delete_language', 'admin_set_language_flags', 'admin_set_language_order');
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_deact::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);
    v_answer := public.admin_delete_language(v_lang);
    IF v_answer ->> 'message' IS DISTINCT FROM 'accountDeactivated' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-3 part 7 proof: (b) a deactivated holder answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_plain::text, 'role', 'authenticated')::text, true);
    v_answer := public.admin_upsert_language(v_nolang, 'x', 'x');
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-3 part 7 proof: (b) a caller without translations:manage answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_tr::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess_t::text)::text, true);
    v_answer := public.admin_set_language_flags(v_lang, false, NULL);
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-3 part 7 proof: (b) a translator (flags) answered %', v_answer;
    END IF;
    v_answer := public.admin_set_language_order(ARRAY[v_lang]);
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-3 part 7 proof: (b) a translator (order) answered %', v_answer;
    END IF;
    v_answer := public.admin_delete_language(v_lang);
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-3 part 7 proof: (b) a translator (delete) answered %', v_answer;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_deact::text AND action = 'staff_config';
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-3 part 7 proof: the dial staff_config counted % for (b) the refused callers (expected %)', v_count, 0;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_plain::text AND action = 'staff_config';
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-3 part 7 proof: the dial staff_config counted % for (b) the refused callers (expected %)', v_count, 0;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_tr::text AND action = 'staff_config';
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-3 part 7 proof: the dial staff_config counted % for (b) the refused callers (expected %)', v_count, 0;
    END IF;
    IF NOT (NOT EXISTS (SELECT 1 FROM public.languages WHERE code = v_nolang) AND EXISTS (SELECT 1 FROM public.languages WHERE code = v_lang AND enabled_admin)) THEN
      RAISE EXCEPTION 'F1-3 part 7 proof: (b) a refused call wrote';
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date
          AND door IN ('admin_upsert_language', 'admin_delete_language', 'admin_set_language_flags', 'admin_set_language_order')) IS DISTINCT FROM v_refused + 5 THEN
      RAISE EXCEPTION 'F1-3 part 7 (b) proof: door_refusals did not meter the 5 refusals';
    END IF;

    -- (c) the codes
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_staff::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);
    SELECT coalesce(sum(count), 0) INTO v_refused FROM public.door_refusals WHERE day = current_date
       AND door IN ('admin_upsert_language', 'admin_delete_language', 'admin_set_language_flags', 'admin_set_language_order');
    v_answer := public.admin_upsert_language('Q!', 'x', 'x');
    IF v_answer ->> 'message' IS DISTINCT FROM 'badValue:code' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-3 part 7 proof: (c) a language code out of shape answered %', v_answer;
    END IF;
    v_answer := public.admin_upsert_language(v_nolang, ' ', 'x');
    IF v_answer ->> 'message' IS DISTINCT FROM 'nameRequired' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-3 part 7 proof: (c) a language without names answered %', v_answer;
    END IF;
    v_answer := public.admin_upsert_language(v_nolang, v_tag || ' new', v_tag || ' new');
    IF NOT (v_answer = '{"ok": true}'::jsonb) THEN
      RAISE EXCEPTION 'F1-3 part 7 proof: (c) the upsert did not answer ok';
    END IF;
    IF NOT (EXISTS (SELECT 1 FROM public.languages WHERE code = v_nolang AND name_en = v_tag || ' new' AND country_codes = '{}'::text[])) THEN
      RAISE EXCEPTION 'F1-3 part 7 proof: (c) the new language differs';
    END IF;
    v_answer := public.admin_delete_language(v_nolang || 'x');
    IF v_answer ->> 'message' IS DISTINCT FROM 'badLanguage' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-3 part 7 proof: (c) deleting an unknown language answered %', v_answer;
    END IF;
    v_answer := public.admin_delete_language(public.language_code('base'));
    IF v_answer ->> 'message' IS DISTINCT FROM 'baseLanguage' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-3 part 7 proof: (c) deleting the base language answered %', v_answer;
    END IF;
    v_answer := public.admin_delete_language(v_lang2);
    IF v_answer ->> 'message' IS DISTINCT FROM 'languagePublished' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-3 part 7 proof: (c) deleting a public language answered %', v_answer;
    END IF;
    v_answer := public.admin_delete_language(v_nolang);
    IF NOT (v_answer IS NOT NULL AND NOT (v_answer ? 'refusals')) THEN
      RAISE EXCEPTION 'F1-3 part 7 proof: (c) the delete answered a refusal';
    END IF;
    IF NOT (NOT EXISTS (SELECT 1 FROM public.languages WHERE code = v_nolang)) THEN
      RAISE EXCEPTION 'F1-3 part 7 proof: (c) the deleted language remains';
    END IF;
    v_answer := public.admin_set_language_flags(v_nolang, true, NULL);
    IF v_answer ->> 'message' IS DISTINCT FROM 'badLanguage' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-3 part 7 proof: (c) flags of an unknown language answered %', v_answer;
    END IF;
    v_answer := public.admin_set_language_flags(public.language_code('pseudo'), NULL, true);
    IF v_answer ->> 'message' IS DISTINCT FROM 'pseudoLanguage' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-3 part 7 proof: (c) the pseudo language made public answered %', v_answer;
    END IF;
    v_answer := public.admin_set_language_flags(v_lang, NULL, true);
    IF NOT (v_answer ->> 'message' ~ '^notFullyApproved:[1-9][0-9]*$' AND current_setting('response.status', true) = '400') THEN
      RAISE EXCEPTION 'F1-3 part 7 proof: (c) a language not fully approved was made public';
    END IF;
    v_answer := public.admin_set_language_flags(v_lang, false, NULL);
    IF NOT (v_answer = '{"ok": true}'::jsonb) THEN
      RAISE EXCEPTION 'F1-3 part 7 proof: (c) the flags did not answer ok';
    END IF;
    IF NOT (EXISTS (SELECT 1 FROM public.languages WHERE code = v_lang AND NOT enabled_admin AND NOT enabled_public)) THEN
      RAISE EXCEPTION 'F1-3 part 7 proof: (c) the flags differ';
    END IF;
    v_answer := public.admin_set_language_order(ARRAY[]::text[]);
    IF v_answer ->> 'message' IS DISTINCT FROM 'emptyList' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-3 part 7 proof: (c) an empty order answered %', v_answer;
    END IF;
    v_answer := public.admin_set_language_order(ARRAY[v_lang, v_nolang]);
    IF v_answer ->> 'message' IS DISTINCT FROM 'badLanguage' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-3 part 7 proof: (c) an order naming an unknown language answered %', v_answer;
    END IF;
    IF (SELECT count(*) FROM public.audit_log WHERE actor_id = v_staff AND action IN ('translation.language_upsert', 'translation.language_delete', 'translation.language_flags')) <> 3 THEN
      RAISE EXCEPTION 'F1-3 part 7 proof: the staff successes wrote % audit lines (expected 3)',
        (SELECT count(*) FROM public.audit_log WHERE actor_id = v_staff AND action IN ('translation.language_upsert', 'translation.language_delete', 'translation.language_flags'));
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_staff::text AND action = 'staff_config';
    IF v_count <> 13 THEN
      RAISE EXCEPTION 'F1-3 part 7 proof: the dial staff_config counted % for (c) the staff manager (expected %)', v_count, 13;
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date
          AND door IN ('admin_upsert_language', 'admin_delete_language', 'admin_set_language_flags', 'admin_set_language_order')) IS DISTINCT FROM v_refused + 10 THEN
      RAISE EXCEPTION 'F1-3 part 7 (c) proof: door_refusals did not meter the 10 refusals';
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'f13p7-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f13p7-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261114130600') ON CONFLICT DO NOTHING;
