-- Foundations turn D1, M6b-cat2b — INC-951 part 3c, the staff_config gate on the sync/country/language/location doors of M6b-catalogue (ruling, stop 10, item 2; split again per the stop-14 ruling: an inline-applied
-- migration stays at or under about 25 KB).
--   * Each door: its live body (ethio-prod, read at write time) redeclared whole; the ONLY change is the
--     rate_gate('staff_config') line right after its step-up line (its last authority check) and before its
--     first write. admin_upsert_location has two branches (create / update), each with its own authority
--     checks, so it gains one gate per branch — every path through the door passes exactly one gate.
--     Name, arguments, return type, header (SECURITY DEFINER, search_path public) and grants unchanged;
--     the existing grants are restated (E2), none added.
--   * Census (ethio-prod, stop 12 report): no public function calls any of these, so no bulk caller
--     spends this dial.
--   * Fingerprints normalise CR (INC-968): md5(replace(prosrc, E'\r', '')).
-- The dial: staff_config 600 / 3600 (M6a's rate_dials row; src/lib/dials.ts staffConfig).

-- admin_sync_ui_keys: live body (ethio-prod, md5(replace(prosrc, E'\r', '')) 9d7779e20bec8797d1063b724a4ab689) whole; the only change: the staff_config gate,
-- inserted right after the step-up line and before the first write (1 gate(s)).
CREATE OR REPLACE FUNCTION public.admin_sync_ui_keys(p_en jsonb, p_am jsonb DEFAULT NULL::jsonb)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_base     text;
  v_en       bigint := 0;
  v_am       bigint := 0;
  v_added    jsonb := '{}'::jsonb;
  v_lang     record;
  v_n        bigint;
  v_orphaned bigint := 0;
  v_restored bigint := 0;
  v_marks    jsonb;
  v_new      bigint := 0;
  v_langs    bigint := 0;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'translations', 'manage') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('translations', 'manage');
  -- INC-951 3c (D1 M6b-catalogue) — after the door's authority, before its first write: its dial (staff_config).
  IF NOT coalesce((public.rate_gate('staff_config')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;
  IF jsonb_typeof(COALESCE(p_en, 'null'::jsonb)) <> 'object' THEN
    RAISE EXCEPTION 'p_en must be a json object';
  END IF;

  SELECT l.code INTO v_base FROM public.languages l WHERE l.is_base LIMIT 1;

  -- INC-607 — the keys this sync ADDS, counted before the upsert (whose own
  -- count is every key of the catalogue).
  SELECT count(*) INTO v_new
    FROM jsonb_object_keys(p_en) AS k(key)
   WHERE NOT EXISTS (SELECT 1 FROM public.ui_translations x
                      WHERE x.key = k.key AND x.lang_code = v_base);

  INSERT INTO public.ui_translations (key, lang_code, value, status, machine,
                                      updated_by, updated_at, approved_by, approved_at,
                                      origin)
  SELECT e.key, v_base, e.value, 'approved', false, auth.uid(), now(), auth.uid(), now(),
         'sync'
    FROM jsonb_each_text(p_en) AS e(key, value)
  ON CONFLICT (key, lang_code) DO UPDATE
    SET value = EXCLUDED.value, status = 'approved',
        updated_by = auth.uid(), updated_at = now(), origin = 'sync';
  GET DIAGNOSTICS v_en = ROW_COUNT;

  FOR v_lang IN
    SELECT l.code FROM public.languages l WHERE l.enabled_admin AND NOT l.is_base
  LOOP
    INSERT INTO public.ui_translations (key, lang_code, status, origin)
    SELECT e.key, v_lang.code, 'untranslated', 'sync'
      FROM jsonb_each_text(p_en) AS e(key, value)
    ON CONFLICT (key, lang_code) DO UPDATE SET origin = 'sync';
    GET DIAGNOSTICS v_n = ROW_COUNT;
    v_added := v_added || jsonb_build_object(v_lang.code, v_n);
    v_langs := v_langs + 1;
  END LOOP;

  IF p_am IS NOT NULL AND jsonb_typeof(p_am) = 'object' THEN
    UPDATE public.ui_translations t
       SET value = a.value, status = 'approved', machine = false, flagged = false,
           flag_note = NULL, updated_by = auth.uid(), updated_at = now(),
           approved_by = auth.uid(), approved_at = now()
      FROM jsonb_each_text(p_am) AS a(key, value)
     WHERE t.lang_code = 'am' AND t.key = a.key
       AND (t.status = 'untranslated' OR t.value IS NULL OR t.value = ''
            -- INC-603 — an Amharic text no person ever wrote (no 'save' or
            -- 'machine' revision: the console, an import and machine
            -- translation all write one) follows the code's changed text. A
            -- text a person wrote is kept.
            OR (t.value IS DISTINCT FROM a.value
                AND NOT EXISTS (SELECT 1 FROM public.ui_translation_revisions r
                                 WHERE r.key = t.key AND r.lang_code = 'am'
                                   AND r.action IN ('save', 'machine'))));
    GET DIAGNOSTICS v_am = ROW_COUNT;
  END IF;

  v_marks := public.ui_sync_mark_orphans(p_en);
  v_orphaned := (v_marks->>'orphaned')::bigint;
  v_restored := (v_marks->>'restored')::bigint;

  PERFORM public.log_audit('translation.sync', 'ui_translations', v_base,
    jsonb_build_object('lang', v_base, 'action', 'sync', 'machine', false,
                       'en_upserted', v_en, 'keys_added_per_lang', v_added,
                       'am_seeded', v_am, 'orphaned', v_orphaned,
                       'orphans_restored', v_restored, 'keys_added', v_new,
                       'languages', v_langs));

  RETURN jsonb_build_object('en_upserted', v_en, 'keys_added_per_lang', v_added,
                            'am_seeded', v_am, 'orphaned', v_orphaned,
                            'orphans_restored', v_restored, 'keys_added', v_new,
                            'languages', v_langs);
END $function$;
REVOKE ALL ON FUNCTION public.admin_sync_ui_keys(jsonb, jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_sync_ui_keys(jsonb, jsonb) TO authenticated, service_role;

-- admin_upsert_country: live body (ethio-prod, md5(replace(prosrc, E'\r', '')) 5697f34b220d90baf31147f3a457c3fb) whole; the only change: the staff_config gate,
-- inserted right after the step-up line and before the first write (1 gate(s)).
CREATE OR REPLACE FUNCTION public.admin_upsert_country(p_code text, p_name_en text, p_unit_system text, p_currency_code text, p_display_order integer)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_code char(2);
  v_old  public.countries;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'countries', 'update') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('countries', 'update');
  -- INC-951 3c (D1 M6b-catalogue) — after the door's authority, before its first write: its dial (staff_config).
  IF NOT coalesce((public.rate_gate('staff_config')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;

  v_code := upper(coalesce(p_code, ''));
  IF v_code !~ '^[A-Z]{2}$' THEN RAISE EXCEPTION 'badCountryCode'; END IF;
  IF p_unit_system IS NOT NULL AND p_unit_system NOT IN ('metric','imperial') THEN
    RAISE EXCEPTION 'badUnitSystem';
  END IF;
  IF p_currency_code IS NOT NULL AND upper(p_currency_code) !~ '^[A-Z]{3}$' THEN
    RAISE EXCEPTION 'badCurrency';
  END IF;

  SELECT * INTO v_old FROM public.countries WHERE code = v_code;
  IF NOT FOUND THEN
    IF coalesce(trim(coalesce(p_name_en, '')), '') = '' THEN RAISE EXCEPTION 'nameRequired'; END IF;
    INSERT INTO public.countries (code, name_en, is_active, unit_system, currency_code, display_order)
    VALUES (v_code, p_name_en, false, coalesce(p_unit_system, 'metric'),
            upper(p_currency_code), coalesce(p_display_order, 0));
  ELSE
    -- never touches is_active: opening a market is admin_set_country_active.
    UPDATE public.countries c
       SET name_en       = coalesce(p_name_en, c.name_en),
           unit_system   = coalesce(p_unit_system, c.unit_system),
           currency_code = coalesce(upper(p_currency_code), c.currency_code),
           display_order = coalesce(p_display_order, c.display_order)
     WHERE c.code = v_code;
  END IF;

  PERFORM public.log_audit('country.upsert', 'country', v_code,
    jsonb_build_object(
      'old', CASE WHEN v_old.code IS NULL THEN NULL ELSE jsonb_build_object(
        'name_en', v_old.name_en, 'unit_system', v_old.unit_system,
        'currency_code', v_old.currency_code, 'display_order', v_old.display_order) END,
      'new', (SELECT jsonb_build_object('name_en', n.name_en, 'unit_system', n.unit_system,
        'currency_code', n.currency_code, 'display_order', n.display_order)
        FROM public.countries n WHERE n.code = v_code)));
END $function$;
REVOKE ALL ON FUNCTION public.admin_upsert_country(text, text, text, text, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_upsert_country(text, text, text, text, integer) TO authenticated, service_role;

-- admin_upsert_language: live body (ethio-prod, md5(replace(prosrc, E'\r', '')) 245d5b3444a414cf907a5a50fa628625) whole; the only change: the staff_config gate,
-- inserted right after the step-up line and before the first write (1 gate(s)).
CREATE OR REPLACE FUNCTION public.admin_upsert_language(p_code text, p_name_en text, p_name_native text, p_rtl boolean DEFAULT false, p_country_codes text[] DEFAULT '{}'::text[])
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE v_code text; v_sort integer; v_countries text[];
BEGIN
  IF NOT public.has_permission(auth.uid(), 'translations', 'manage') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('translations', 'manage');
  -- INC-951 3c (D1 M6b-catalogue) — after the door's authority, before its first write: its dial (staff_config).
  IF NOT coalesce((public.rate_gate('staff_config')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;

  v_code := lower(btrim(COALESCE(p_code, '')));
  IF v_code !~ '^[a-z]{2,8}(-[a-z0-9]{2,8})?$' THEN
    RAISE EXCEPTION 'invalid language code';
  END IF;
  IF btrim(COALESCE(p_name_en, '')) = '' OR btrim(COALESCE(p_name_native, '')) = '' THEN
    RAISE EXCEPTION 'language names are required';
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
END $function$;
REVOKE ALL ON FUNCTION public.admin_upsert_language(text, text, text, boolean, text[]) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_upsert_language(text, text, text, boolean, text[]) TO authenticated, service_role;

-- admin_upsert_location: live body (ethio-prod, md5(replace(prosrc, E'\r', '')) ee4c7ffdb7ac6b36d4d5fc5fb5f11e3b) whole; the only change: the staff_config gate,
-- inserted right after the step-up line and before the first write (2 gate(s)).
CREATE OR REPLACE FUNCTION public.admin_upsert_location(p_id uuid, p_parent_id uuid, p_level text, p_name_en text, p_slug text, p_iso_3166_2 text, p_aliases text[], p_display_order integer, p_center_lat double precision, p_center_lng double precision)
 RETURNS uuid
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_old     public.locations;
  v_slug    text;
  v_country char(2);
  v_id      uuid;
BEGIN
  IF p_id IS NULL THEN
    IF NOT public.has_permission(auth.uid(), 'locations', 'create') THEN
      RAISE EXCEPTION 'permission denied';
    END IF;
    PERFORM public.require_step_up_if_needed('locations', 'create');
  -- INC-951 3c (D1 M6b-catalogue) — after the door's authority, before its first write: its dial (staff_config).
  IF NOT coalesce((public.rate_gate('staff_config')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;

    IF p_level IS NULL OR p_level NOT IN ('country','region','city','sub_city') THEN
      RAISE EXCEPTION 'badLevel';
    END IF;
    IF p_iso_3166_2 IS NOT NULL AND p_level <> 'region' THEN
      RAISE EXCEPTION 'isoOnRegionsOnly';
    END IF;
    IF coalesce(trim(p_name_en), '') = '' THEN
      RAISE EXCEPTION 'nameRequired';
    END IF;

    IF p_level = 'country' THEN
      IF p_parent_id IS NOT NULL THEN RAISE EXCEPTION 'rootMustBeCountry'; END IF;
      SELECT c.code INTO v_country FROM public.countries c
       WHERE c.code = upper(coalesce(p_slug, ''));
      IF v_country IS NULL THEN
        RAISE EXCEPTION 'unknownCountry';
      END IF;
      v_slug := public.location_slug_candidate(p_name_en, NULL);
    ELSE
      SELECT l.country_code INTO v_country FROM public.locations l WHERE l.id = p_parent_id;
      IF v_country IS NULL THEN RAISE EXCEPTION 'parentMissing'; END IF;
      v_slug := coalesce(nullif(trim(coalesce(p_slug, '')), ''),
                         public.location_slug_candidate(p_name_en, p_parent_id));
    END IF;

    INSERT INTO public.locations (parent_id, level, country_code, name_en, slug,
                                  iso_3166_2, aliases, display_order,
                                  center_lat, center_lng, is_active, source)
    VALUES (p_parent_id, p_level, v_country, p_name_en, v_slug,
            p_iso_3166_2, coalesce(p_aliases, '{}'::text[]), coalesce(p_display_order, 0),
            p_center_lat, p_center_lng, false, 'admin')
    RETURNING id INTO v_id;

    PERFORM public.log_audit('location.create', 'location', v_id::text,
      jsonb_build_object('new', jsonb_build_object(
        'level', p_level, 'country_code', v_country, 'name_en', p_name_en,
        'slug', v_slug, 'parent_id', p_parent_id, 'iso_3166_2', p_iso_3166_2,
        'aliases', coalesce(p_aliases, '{}'::text[]),
        'display_order', coalesce(p_display_order, 0),
        'center_lat', p_center_lat, 'center_lng', p_center_lng)));
    RETURN v_id;
  END IF;

  IF NOT public.has_permission(auth.uid(), 'locations', 'update') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('locations', 'update');
  -- INC-951 3c (D1 M6b-catalogue) — after the door's authority, before its first write: its dial (staff_config).
  IF NOT coalesce((public.rate_gate('staff_config')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;

  SELECT * INTO v_old FROM public.locations WHERE id = p_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'locationMissing'; END IF;

  -- parent, level and activation are NOT this door's business.
  IF p_parent_id IS DISTINCT FROM v_old.parent_id THEN RAISE EXCEPTION 'useMoveDoor'; END IF;
  IF p_level IS NOT NULL AND p_level IS DISTINCT FROM v_old.level THEN
    RAISE EXCEPTION 'useMoveDoor';
  END IF;
  IF p_iso_3166_2 IS NOT NULL AND v_old.level <> 'region' THEN
    RAISE EXCEPTION 'isoOnRegionsOnly';
  END IF;
  IF coalesce(trim(coalesce(p_name_en, v_old.name_en)), '') = '' THEN
    RAISE EXCEPTION 'nameRequired';
  END IF;

  UPDATE public.locations l
     SET name_en       = coalesce(p_name_en, l.name_en),
         slug          = coalesce(nullif(trim(coalesce(p_slug, '')), ''), l.slug),
         iso_3166_2    = p_iso_3166_2,
         aliases       = coalesce(p_aliases, l.aliases),
         display_order = coalesce(p_display_order, l.display_order),
         center_lat    = coalesce(p_center_lat, l.center_lat),
         center_lng    = coalesce(p_center_lng, l.center_lng)
   WHERE l.id = p_id;

  PERFORM public.log_audit('location.update', 'location', p_id::text,
    jsonb_build_object(
      'old', jsonb_build_object('name_en', v_old.name_en, 'slug', v_old.slug,
        'iso_3166_2', v_old.iso_3166_2, 'aliases', v_old.aliases,
        'display_order', v_old.display_order,
        'center_lat', v_old.center_lat, 'center_lng', v_old.center_lng),
      'new', (SELECT jsonb_build_object('name_en', n.name_en, 'slug', n.slug,
        'iso_3166_2', n.iso_3166_2, 'aliases', n.aliases,
        'display_order', n.display_order,
        'center_lat', n.center_lat, 'center_lng', n.center_lng)
        FROM public.locations n WHERE n.id = p_id)));
  RETURN p_id;
END $function$;
REVOKE ALL ON FUNCTION public.admin_upsert_location(uuid, uuid, text, text, text, text, text[], integer, double precision, double precision) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_upsert_location(uuid, uuid, text, text, text, text, text[], integer, double precision, double precision) TO authenticated, service_role;

DO $proof$
DECLARE
  v_fn text; v_old text; v_new text; v_oid oid; v_src text;
  v_gate text := E'  -- INC-951 3c (D1 M6b-catalogue) — after the door''s authority, before its first write: its dial (staff_config).\n  IF NOT coalesce((public.rate_gate(''staff_config'')->>''allowed'')::boolean, false) THEN RAISE EXCEPTION ''rateLimited''; END IF;\n';
  v_uid uuid := gen_random_uuid();
  v_session uuid := gen_random_uuid();
  v_msg text; v_before text; v_after text;
  v_calls text[] := ARRAY[
    'SELECT public.admin_sync_ui_keys(''[]''::jsonb, NULL)',
    'SELECT public.admin_upsert_country(''zz'', NULL, NULL, NULL, NULL)',
    'SELECT public.admin_upsert_language(''zz'', NULL, NULL, false, NULL)',
    'SELECT public.admin_upsert_location(NULL, NULL, ''city'', NULL, ''e2e-mig-x'', NULL, NULL, 0, NULL, NULL)'];
  v_call text;
BEGIN
  -- (1) each door: the live body plus exactly the gate line; header and ACL unchanged; the gate after the
  -- step-up line and before the first write.
  FOR v_fn, v_old, v_new IN VALUES
    ('admin_sync_ui_keys(jsonb, jsonb)', '9d7779e20bec8797d1063b724a4ab689', '170ca82d0eb1df40052a0af41ac86c42'),
    ('admin_upsert_country(text, text, text, text, integer)', '5697f34b220d90baf31147f3a457c3fb', 'c758ed59da93c3f4739a1a862239047d'),
    ('admin_upsert_language(text, text, text, boolean, text[])', '245d5b3444a414cf907a5a50fa628625', 'e5f0383974332ee98bd1e4b7da8fdeb1'),
    ('admin_upsert_location(uuid, uuid, text, text, text, text, text[], integer, double precision, double precision)', 'ee4c7ffdb7ac6b36d4d5fc5fb5f11e3b', '5e34ea13998c57e8d182c13b2c669597')
  LOOP
    v_oid := ('public.' || v_fn)::regprocedure;
    SELECT replace(prosrc, E'\r', '') INTO v_src FROM pg_proc WHERE oid = v_oid;
    IF md5(v_src) <> v_new
       OR md5(replace(v_src, v_gate, '')) <> v_old
       OR position('require_step_up_if_needed' IN v_src) > position('rate_gate(''staff_config'')' IN v_src)
       OR position('rate_gate(''staff_config'')' IN v_src) > least(
            coalesce(nullif(position('INSERT INTO' IN v_src), 0), 1000000),
            coalesce(nullif(position('UPDATE public.' IN v_src), 0), 1000000),
            coalesce(nullif(position('DELETE FROM' IN v_src), 0), 1000000))
       OR (SELECT NOT prosecdef OR proconfig::text <> '{search_path=public}' FROM pg_proc WHERE oid = v_oid)
       OR has_function_privilege('anon', v_oid, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_oid, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_oid, 'EXECUTE') THEN
      RAISE EXCEPTION 'M6b-cat2b proof (1): % failed [md5=%, stripped=%, stepup=%, gate=%, firstwrite=%, secdef=%, config=%, anon=%, auth=%, svc=%]',
        v_fn, md5(v_src), md5(replace(v_src, v_gate, '')),
        position('require_step_up_if_needed' IN v_src), position('rate_gate(''staff_config'')' IN v_src),
        least(coalesce(nullif(position('INSERT INTO' IN v_src), 0), 1000000),
              coalesce(nullif(position('UPDATE public.' IN v_src), 0), 1000000),
              coalesce(nullif(position('DELETE FROM' IN v_src), 0), 1000000)),
        (SELECT prosecdef FROM pg_proc WHERE oid = v_oid),
        (SELECT proconfig::text FROM pg_proc WHERE oid = v_oid),
        has_function_privilege('anon', v_oid, 'EXECUTE'),
        has_function_privilege('authenticated', v_oid, 'EXECUTE'),
        has_function_privilege('service_role', v_oid, 'EXECUTE');
    END IF;
  END LOOP;

  -- (2) behaviour, staff_config overridden to 1, scratch super admin at aal2: each door's first call passes
  -- the gate (it answers its own refusal for scratch arguments, and a refused call's gate increment rolls
  -- back with it); with the window spent, each door's next call is refused rateLimited and writes nothing
  -- (no audit row by the caller, the catalogue tables unchanged).
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
    INSERT INTO public.rate_overrides (user_id, action, max_count) VALUES (v_uid, 'staff_config', 1);
    PERFORM set_config('request.jwt.claims',
      json_build_object('sub', v_uid::text, 'role', 'authenticated', 'aal', 'aal2',
                        'session_id', v_session::text,
                        'amr', json_build_array(json_build_object('method', 'totp')))::text, true);

    FOREACH v_call IN ARRAY v_calls LOOP
      v_msg := 'answered';
      BEGIN
        EXECUTE v_call;
      EXCEPTION WHEN OTHERS THEN v_msg := SQLERRM;
      END;
      IF v_msg = 'rateLimited' OR v_msg IN ('permission denied', 'not authenticated', 'not signed in') OR v_msg LIKE '%step-up%' THEN
        RAISE EXCEPTION 'M6b-cat2b proof (2): a first call did not pass the gate: % -> %', v_call, v_msg;
      END IF;
    END LOOP;

    PERFORM public.rate_gate('staff_config');
    SELECT md5(concat_ws('|',
      (SELECT count(*) FROM public.ai_features), (SELECT count(*) FROM public.countries),
      (SELECT count(*) FROM public.country_root_order), (SELECT count(*) FROM public.coverage_plans),
      (SELECT count(*) FROM public.listing_policy), (SELECT count(*) FROM public.ui_translations),
      (SELECT count(*) FROM public.languages), (SELECT count(*) FROM public.category_attribute_links),
      (SELECT count(*) FROM public.locations WHERE slug LIKE 'e2e-mig-%'),
      (SELECT count(*) FROM public.attributes WHERE attr_key LIKE 'e2e-mig-%'),
      (SELECT count(*) FROM public.audit_log WHERE actor_id = v_uid),
      (SELECT coalesce(sum(count), 0) FROM public.rate_limits WHERE key = v_uid::text))) INTO v_before;
    FOREACH v_call IN ARRAY v_calls LOOP
      v_msg := 'answered';
      BEGIN
        EXECUTE v_call;
      EXCEPTION WHEN OTHERS THEN v_msg := SQLERRM;
      END;
      IF v_msg IS DISTINCT FROM 'rateLimited' THEN
        RAISE EXCEPTION 'M6b-cat2b proof (2): the n+1th call was not refused: % -> %', v_call, v_msg;
      END IF;
    END LOOP;
    SELECT md5(concat_ws('|',
      (SELECT count(*) FROM public.ai_features), (SELECT count(*) FROM public.countries),
      (SELECT count(*) FROM public.country_root_order), (SELECT count(*) FROM public.coverage_plans),
      (SELECT count(*) FROM public.listing_policy), (SELECT count(*) FROM public.ui_translations),
      (SELECT count(*) FROM public.languages), (SELECT count(*) FROM public.category_attribute_links),
      (SELECT count(*) FROM public.locations WHERE slug LIKE 'e2e-mig-%'),
      (SELECT count(*) FROM public.attributes WHERE attr_key LIKE 'e2e-mig-%'),
      (SELECT count(*) FROM public.audit_log WHERE actor_id = v_uid),
      (SELECT coalesce(sum(count), 0) FROM public.rate_limits WHERE key = v_uid::text))) INTO v_after;
    IF v_before IS DISTINCT FROM v_after THEN
      RAISE EXCEPTION 'M6b-cat2b proof (2): a refused call wrote something';
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'd1-m6b-cat2b-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'd1-m6b-cat2b-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261029110000');
