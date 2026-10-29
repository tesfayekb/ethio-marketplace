-- Foundations turn D1, M6b-cat2a — INC-951 part 3c, the staff_config gate on the countries/coverage/policy doors of M6b-catalogue (ruling, stop 10, item 2; split again per the stop-14 ruling: an inline-applied
-- migration stays at or under about 25 KB).
--   * Each door: its live body (ethio-prod, read at write time) redeclared whole; the ONLY change is the
--     rate_gate('staff_config') line right after its step-up line (its last authority check) and before its
--     first write.
--     Name, arguments, return type, header (SECURITY DEFINER, search_path public) and grants unchanged;
--     the existing grants are restated (E2), none added.
--   * Census (ethio-prod, stop 12 report): no public function calls any of these, so no bulk caller
--     spends this dial.
--   * Fingerprints normalise CR (INC-968): md5(replace(prosrc, E'\r', '')).
-- The dial: staff_config 600 / 3600 (M6a's rate_dials row; src/lib/dials.ts staffConfig).

-- admin_set_ai_feature: live body (ethio-prod, md5(replace(prosrc, E'\r', '')) 419432efe6ccd594ed9e6fc5b0f97580) whole; the only change: the staff_config gate,
-- inserted right after the step-up line and before the first write (1 gate(s)).
CREATE OR REPLACE FUNCTION public.admin_set_ai_feature(p_feature text, p_enabled boolean, p_monthly_budget_cents integer, p_unit_cost_microusd integer)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid    uuid := auth.uid();
  v        public.ai_features%ROWTYPE;
  v_before jsonb;
  v_first  date := date_trunc('month', now() AT TIME ZONE 'utc')::date;
  v_month  timestamptz := (date_trunc('month', now() AT TIME ZONE 'utc')) AT TIME ZONE 'utc';
  v_spent  bigint;
  v_level  smallint := 0;
  v_on     boolean;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF NOT public.has_permission(v_uid, 'services', 'manage') THEN RAISE EXCEPTION 'permission denied'; END IF;
  PERFORM public.require_step_up_if_needed('services', 'manage');
  -- INC-951 3c (D1 M6b-catalogue) — after the door's authority, before its first write: its dial (staff_config).
  IF NOT coalesce((public.rate_gate('staff_config')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;
  IF p_enabled IS NULL THEN RAISE EXCEPTION 'badValue:enabled'; END IF;
  IF p_unit_cost_microusd IS NULL OR p_unit_cost_microusd < 0 OR p_unit_cost_microusd > 10000000 THEN
    RAISE EXCEPTION 'badValue:unitCost';
  END IF;
  IF p_monthly_budget_cents IS NOT NULL AND (p_monthly_budget_cents < 0 OR p_monthly_budget_cents > 100000000) THEN
    RAISE EXCEPTION 'badValue:budget';
  END IF;
  SELECT * INTO v FROM public.ai_features WHERE feature = p_feature FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'unknownFeature'; END IF;
  -- D158 (bundle 13 turn 6) — photo screening may be switched off: new photos are then held
  -- for staff (listing_photos.unscreened) and shown to no buyer until the ad is approved.
  v_before := to_jsonb(v) - 'updated_by';
  SELECT coalesce(sum(s.cost_microusd), 0)::bigint INTO v_spent
    FROM public.ai_spend_days s
   WHERE s.feature = v.feature AND s.day >= v_first;
  IF p_monthly_budget_cents IS NOT NULL THEN
    v_level := CASE WHEN v_spent >= p_monthly_budget_cents::bigint * 10000 THEN 100
                    WHEN v_spent * 10 >= p_monthly_budget_cents::bigint * 10000 * 8 THEN 80
                    ELSE 0 END;
  END IF;
  -- D184 (bundle 16 turn S1): no feature, photo screening included, is switched on past its budget.
  IF p_enabled AND v_level = 100 THEN RAISE EXCEPTION 'overBudget'; END IF;
  v_on := v.enabled OR (v.off_reason = 'budget' AND v.off_at < v_month);
  UPDATE public.ai_features
     SET enabled = p_enabled,
         off_reason = CASE WHEN p_enabled THEN NULL WHEN v_on THEN 'staff' ELSE v.off_reason END,
         off_at = CASE WHEN p_enabled THEN NULL WHEN v_on THEN now() ELSE v.off_at END,
         monthly_budget_cents = p_monthly_budget_cents,
         unit_cost_microusd = p_unit_cost_microusd,
         alert_month = v_first,
         alert_level = v_level,
         updated_at = now(),
         updated_by = v_uid
   WHERE feature = v.feature
  RETURNING * INTO v;
  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
  VALUES (v_uid, 'ai.feature_set', 'ai_feature', v.feature,
          jsonb_build_object('before', v_before, 'after', to_jsonb(v) - 'updated_by'));
  RETURN jsonb_build_object('ok', true, 'feature', v.feature, 'on', v.enabled, 'off_reason', v.off_reason,
                            'monthly_budget_cents', v.monthly_budget_cents,
                            'unit_cost_microusd', v.unit_cost_microusd, 'alert_level', v.alert_level);
END;
$function$;
REVOKE ALL ON FUNCTION public.admin_set_ai_feature(text, boolean, integer, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_set_ai_feature(text, boolean, integer, integer) TO authenticated, service_role;

-- admin_set_country_active: live body (ethio-prod, md5(replace(prosrc, E'\r', '')) dc460bd3c0d636bb5ceffaabc352471b) whole; the only change: the staff_config gate,
-- inserted right after the step-up line and before the first write (1 gate(s)).
CREATE OR REPLACE FUNCTION public.admin_set_country_active(p_code text, p_active boolean, p_force_hide boolean DEFAULT false)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_code   char(2);
  v_row    public.countries;
  v_anchor uuid;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'countries', 'activate') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('countries', 'activate');
  -- INC-951 3c (D1 M6b-catalogue) — after the door's authority, before its first write: its dial (staff_config).
  IF NOT coalesce((public.rate_gate('staff_config')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;

  v_code := upper(coalesce(p_code, ''));
  IF v_code !~ '^[A-Z]{2}$' THEN RAISE EXCEPTION 'badCountryCode'; END IF;
  SELECT * INTO v_row FROM public.countries WHERE code = v_code;
  IF NOT FOUND THEN RAISE EXCEPTION 'unknownCountry'; END IF;

  IF p_active THEN
    UPDATE public.countries SET is_active = true WHERE code = v_code;

    SELECT id INTO v_anchor FROM public.locations
     WHERE level = 'country' AND country_code = v_code LIMIT 1;
    IF v_anchor IS NULL THEN
      INSERT INTO public.locations (parent_id, level, country_code, name_en, slug, is_active, source)
      VALUES (NULL, 'country', v_code, v_row.name_en,
              public.location_slug_candidate(v_row.name_en, NULL), true, 'admin')
      RETURNING id INTO v_anchor;
    ELSE
      UPDATE public.locations SET is_active = true WHERE id = v_anchor;
    END IF;

    PERFORM public.log_audit('country.open', 'country', v_code,
      jsonb_build_object('anchor', v_anchor, 'force_hide', p_force_hide));
  ELSE
    IF NOT p_force_hide AND EXISTS (
      SELECT 1 FROM public.user_roles ur WHERE ur.scope_country = v_code
    ) THEN
      RAISE EXCEPTION 'scopedRolesExist';
    END IF;

    UPDATE public.countries SET is_active = false WHERE code = v_code;
    -- the path rule hides the subtree; child rows are not written.
    UPDATE public.locations SET is_active = false
     WHERE level = 'country' AND country_code = v_code;

    PERFORM public.log_audit('country.close', 'country', v_code,
      jsonb_build_object('force_hide', p_force_hide));
  END IF;
END $function$;
REVOKE ALL ON FUNCTION public.admin_set_country_active(text, boolean, boolean) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_set_country_active(text, boolean, boolean) TO authenticated, service_role;

-- admin_set_country_root_order: live body (ethio-prod, md5(replace(prosrc, E'\r', '')) c7c308a37b9a97b0aac0f825ccf4b26a) whole; the only change: the staff_config gate,
-- inserted right after the step-up line and before the first write (1 gate(s)).
CREATE OR REPLACE FUNCTION public.admin_set_country_root_order(p_code text, p_category_ids uuid[])
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_code char(2);
  v_ids  uuid[] := coalesce(p_category_ids, '{}'::uuid[]);
  v_old  jsonb;
  v_bad  int;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'countries', 'update') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('countries', 'update');
  -- INC-951 3c (D1 M6b-catalogue) — after the door's authority, before its first write: its dial (staff_config).
  IF NOT coalesce((public.rate_gate('staff_config')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;

  v_code := upper(coalesce(p_code, ''));
  IF v_code !~ '^[A-Z]{2}$' THEN RAISE EXCEPTION 'badCountryCode'; END IF;
  IF NOT EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
    RAISE EXCEPTION 'unknownCountry';
  END IF;

  IF (SELECT count(DISTINCT u) FROM unnest(v_ids) u) <> array_length(v_ids, 1)
     AND array_length(v_ids, 1) IS NOT NULL THEN
    RAISE EXCEPTION 'duplicateCategory';
  END IF;

  SELECT count(*) INTO v_bad
    FROM unnest(v_ids) AS u(id)
   WHERE NOT EXISTS (
     SELECT 1 FROM public.categories c
      JOIN public.category_tree_pointers p ON p.child_id = c.id AND p.parent_id IS NULL
     WHERE c.id = u.id AND c.is_active);
  IF v_bad > 0 THEN RAISE EXCEPTION 'notARoot'; END IF;

  SELECT to_jsonb(array_agg(x.category_id ORDER BY x.position)) INTO v_old
    FROM public.country_root_order x WHERE x.country_code = v_code;

  DELETE FROM public.country_root_order WHERE country_code = v_code;
  INSERT INTO public.country_root_order (country_code, category_id, position, created_by)
  SELECT v_code, t.id, t.ordinality::integer, auth.uid()
    FROM unnest(v_ids) WITH ORDINALITY AS t(id, ordinality);

  PERFORM public.log_audit('country.rootOrder', 'country', v_code,
    jsonb_build_object('old', v_old, 'new', to_jsonb(v_ids)));
END $function$;
REVOKE ALL ON FUNCTION public.admin_set_country_root_order(text, uuid[]) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_set_country_root_order(text, uuid[]) TO authenticated, service_role;

-- admin_set_coverage_plan: live body (ethio-prod, md5(replace(prosrc, E'\r', '')) 221b8aa90c3ae5d35e30806c07f4ca30) whole; the only change: the staff_config gate,
-- inserted right after the step-up line and before the first write (1 gate(s)).
CREATE OR REPLACE FUNCTION public.admin_set_coverage_plan(p_plan text, p_max_cities integer, p_max_regions integer, p_max_countries integer, p_allow_everywhere boolean, p_max_photos smallint DEFAULT NULL::smallint)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_old public.coverage_plans;
  v_photos smallint;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'coverage', 'update') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('coverage', 'update');
  -- INC-951 3c (D1 M6b-catalogue) — after the door's authority, before its first write: its dial (staff_config).
  IF NOT coalesce((public.rate_gate('staff_config')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;

  IF coalesce(p_plan, '') !~ '^[a-z_]{2,32}$' THEN RAISE EXCEPTION 'badPlan'; END IF;
  IF coalesce(p_max_cities, 0) < 1 OR coalesce(p_max_regions, 0) < 1
     OR coalesce(p_max_countries, 0) < 1 THEN
    RAISE EXCEPTION 'belowMinimum';
  END IF;
  IF p_max_photos IS NOT NULL AND (p_max_photos < 0 OR p_max_photos > 30) THEN
    RAISE EXCEPTION 'badMaxPhotos';
  END IF;

  SELECT * INTO v_old FROM public.coverage_plans WHERE plan = p_plan;

  -- An absent cap means NO CHANGE: the stored cap for an existing plan, the
  -- column's own default for a new one.
  v_photos := COALESCE(p_max_photos, v_old.max_photos, 10::smallint);

  INSERT INTO public.coverage_plans (plan, max_cities, max_regions, max_countries,
                                     allow_everywhere, max_photos, updated_by, updated_at)
  VALUES (p_plan, p_max_cities, p_max_regions, p_max_countries,
          coalesce(p_allow_everywhere, false), v_photos, auth.uid(), now())
  ON CONFLICT (plan) DO UPDATE
    SET max_cities = EXCLUDED.max_cities,
        max_regions = EXCLUDED.max_regions,
        max_countries = EXCLUDED.max_countries,
        allow_everywhere = EXCLUDED.allow_everywhere,
        max_photos = EXCLUDED.max_photos,
        updated_by = EXCLUDED.updated_by,
        updated_at = now();

  PERFORM public.log_audit('coverage.plan.update', 'coverage_plan', p_plan,
    jsonb_build_object(
      'old', CASE WHEN v_old.plan IS NULL THEN NULL ELSE jsonb_build_object(
        'max_cities', v_old.max_cities, 'max_regions', v_old.max_regions,
        'max_countries', v_old.max_countries, 'allow_everywhere', v_old.allow_everywhere,
        'max_photos', v_old.max_photos) END,
      'new', jsonb_build_object(
        'max_cities', p_max_cities, 'max_regions', p_max_regions,
        'max_countries', p_max_countries,
        'allow_everywhere', coalesce(p_allow_everywhere, false),
        'max_photos', v_photos)));
END $function$;
REVOKE ALL ON FUNCTION public.admin_set_coverage_plan(text, integer, integer, integer, boolean, smallint) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_set_coverage_plan(text, integer, integer, integer, boolean, smallint) TO authenticated, service_role;

-- admin_set_listing_policy: live body (ethio-prod, md5(replace(prosrc, E'\r', '')) d3147af9e6e170403659c3d94c133e9f) whole; the only change: the staff_config gate,
-- inserted right after the step-up line and before the first write (1 gate(s)).
CREATE OR REPLACE FUNCTION public.admin_set_listing_policy(p_renew_allowed boolean, p_renew_days integer)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid    uuid := auth.uid();
  v_before public.listing_policy%ROWTYPE;
  v_after  public.listing_policy%ROWTYPE;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not signed in'; END IF;
  IF NOT public.has_permission(v_uid, 'listings', 'enforce') THEN RAISE EXCEPTION 'permission denied'; END IF;
  PERFORM public.require_step_up_if_needed('listings', 'enforce');
  -- INC-951 3c (D1 M6b-catalogue) — after the door's authority, before its first write: its dial (staff_config).
  IF NOT coalesce((public.rate_gate('staff_config')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;
  IF p_renew_allowed IS NULL OR p_renew_days IS NULL OR p_renew_days < 1 OR p_renew_days > 365 THEN
    RAISE EXCEPTION 'renew days are 1 to 365';
  END IF;
  SELECT * INTO v_before FROM public.listing_policy WHERE id FOR UPDATE;
  UPDATE public.listing_policy SET
    renew_allowed = p_renew_allowed, renew_days = p_renew_days, updated_at = now(), updated_by = v_uid
  WHERE id
  RETURNING * INTO v_after;
  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
  VALUES (v_uid, 'listing.policy_set', 'listing_policy', 'renew',
          jsonb_build_object('before', jsonb_build_object('renew_allowed', v_before.renew_allowed,
                                                          'renew_days', v_before.renew_days),
                             'after', jsonb_build_object('renew_allowed', v_after.renew_allowed,
                                                         'renew_days', v_after.renew_days)));
  RETURN jsonb_build_object('ok', true, 'renew_allowed', v_after.renew_allowed, 'renew_days', v_after.renew_days);
END $function$;
REVOKE ALL ON FUNCTION public.admin_set_listing_policy(boolean, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_set_listing_policy(boolean, integer) TO authenticated, service_role;

DO $proof$
DECLARE
  v_fn text; v_old text; v_new text; v_oid oid; v_src text;
  v_gate text := E'  -- INC-951 3c (D1 M6b-catalogue) — after the door''s authority, before its first write: its dial (staff_config).\n  IF NOT coalesce((public.rate_gate(''staff_config'')->>''allowed'')::boolean, false) THEN RAISE EXCEPTION ''rateLimited''; END IF;\n';
  v_uid uuid := gen_random_uuid();
  v_session uuid := gen_random_uuid();
  v_msg text; v_before text; v_after text;
  v_calls text[] := ARRAY[
    'SELECT public.admin_set_ai_feature(''e2e-mig-nope'', false, NULL, NULL)',
    'SELECT public.admin_set_country_active(''zz'', false, false)',
    'SELECT public.admin_set_country_root_order(''zz'', ARRAY[]::uuid[])',
    'SELECT public.admin_set_coverage_plan(''e2e-mig-nope'', 1, 1, 1, false, 1::smallint)',
    'SELECT public.admin_set_listing_policy(NULL, NULL)'];
  v_call text;
BEGIN
  -- (1) each door: the live body plus exactly the gate line; header and ACL unchanged; the gate after the
  -- step-up line and before the first write.
  FOR v_fn, v_old, v_new IN VALUES
    ('admin_set_ai_feature(text, boolean, integer, integer)', '419432efe6ccd594ed9e6fc5b0f97580', '91bdeb81c03d4a00d7d07362324f175e'),
    ('admin_set_country_active(text, boolean, boolean)', 'dc460bd3c0d636bb5ceffaabc352471b', '2b5e63633c558226538386b9708b02b0'),
    ('admin_set_country_root_order(text, uuid[])', 'c7c308a37b9a97b0aac0f825ccf4b26a', '469796970d43dd930d182f6d02784c9c'),
    ('admin_set_coverage_plan(text, integer, integer, integer, boolean, smallint)', '221b8aa90c3ae5d35e30806c07f4ca30', 'c45aa8a3edbc9b45cb4df01273bdaf3b'),
    ('admin_set_listing_policy(boolean, integer)', 'd3147af9e6e170403659c3d94c133e9f', 'a2f41e81addb52bd99550cc57931b6d1')
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
      RAISE EXCEPTION 'M6b-cat2a proof (1): % failed [md5=%, stripped=%, stepup=%, gate=%, firstwrite=%, secdef=%, config=%, anon=%, auth=%, svc=%]',
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
        RAISE EXCEPTION 'M6b-cat2a proof (2): a first call did not pass the gate: % -> %', v_call, v_msg;
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
        RAISE EXCEPTION 'M6b-cat2a proof (2): the n+1th call was not refused: % -> %', v_call, v_msg;
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
      RAISE EXCEPTION 'M6b-cat2a proof (2): a refused call wrote something';
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'd1-m6b-cat2a-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'd1-m6b-cat2a-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261029100000');
