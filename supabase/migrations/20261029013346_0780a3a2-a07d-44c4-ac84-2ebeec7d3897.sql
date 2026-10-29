-- Foundations turn D1, M6b-cat1 — INC-951 part 3c, the staff_config gate on the categories and attributes doors of M6b-catalogue (ruling, stop 10, item 2: M6b split by concern — legal / catalogue / roles — because the 22
-- bodies pass 60 KB).
--   * Each door: its live body (ethio-prod, read at write time) redeclared whole; the ONLY change is the
--     rate_gate('staff_config') line right after its step-up line (its last authority check) and before its
--     first write. admin_upsert_location has two branches (create / update), each with its own authority
--     checks, so it gains one gate per branch — every path through the door passes exactly one gate.
--     Name, arguments, return type, header (SECURITY DEFINER, search_path public) and grants unchanged;
--     the existing grants are restated (E2), none added.
--   * Census (ethio-prod, stop 12 report): no public function calls any of the eleven, so no bulk caller
--     spends this dial.
--   * Fingerprints normalise CR (INC-968): md5(replace(prosrc, E'\r', '')).
-- The dial: staff_config 600 / 3600 (M6a's rate_dials row; src/lib/dials.ts staffConfig).

-- admin_link_attribute: live body (ethio-prod, md5(replace(prosrc, E'\r', '')) dcad930ee0b63565f93d6cf1f16a6a6b) whole; the only change: the staff_config gate,
-- inserted as body line(s) 12, right after the step-up line and before the first write.
CREATE OR REPLACE FUNCTION public.admin_link_attribute(p_category_id uuid, p_attribute_id uuid, p_is_required boolean, p_is_filterable boolean, p_display_order integer, p_allowed_options text[] DEFAULT NULL::text[], p_default_value jsonb DEFAULT NULL::jsonb, p_visible_when jsonb DEFAULT NULL::jsonb)
 RETURNS uuid
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_id uuid;
  v_refusal text;
  v_akey text;
  v_basis text;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'update') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('categories', 'update');
  -- INC-951 3c (D1 M6b-catalogue) — after the door's authority, before its first write: its dial (staff_config).
  IF NOT coalesce((public.rate_gate('staff_config')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;

  IF NOT EXISTS (SELECT 1 FROM public.categories c WHERE c.id = p_category_id) THEN
    RAISE EXCEPTION 'admin.categories.error.notFound' USING ERRCODE = 'P0010';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM public.attributes a WHERE a.id = p_attribute_id) THEN
    RAISE EXCEPTION 'admin.attributes.error.notFound' USING ERRCODE = 'P0010';
  END IF;
  IF EXISTS (SELECT 1 FROM public.category_attribute_links l
              WHERE l.category_id = p_category_id AND l.attribute_id = p_attribute_id) THEN
    RAISE EXCEPTION 'admin.attributes.error.alreadyLinked' USING ERRCODE = 'P0010';
  END IF;

  -- M-MAINT-3 — the three cells are judged BEFORE anything is written (F5).
  v_refusal := public.attr_link_cells_refusal(
    p_category_id, p_attribute_id, p_allowed_options, p_default_value, p_visible_when);
  IF v_refusal IS NOT NULL THEN
    RAISE EXCEPTION '%', v_refusal USING ERRCODE = 'P0010';
  END IF;

  -- DEC-079 — one price basis per category lineage (F5: judged before writing).
  SELECT a.attr_key INTO v_akey FROM public.attributes a WHERE a.id = p_attribute_id;
  IF v_akey ~ '^(pricing_type|unit_of_sale)(-|$)' THEN
    v_basis := public.price_basis_conflict(p_category_id, v_akey, '[]'::jsonb);
    IF v_basis IS NOT NULL THEN
      RAISE EXCEPTION 'priceBasisDuplicate: %', v_basis USING ERRCODE = 'P0010';
    END IF;
  END IF;

  INSERT INTO public.category_attribute_links
    (category_id, attribute_id, is_required, is_filterable, display_order,
     allowed_options, default_value, visible_when)
  VALUES (p_category_id, p_attribute_id,
          COALESCE(p_is_required, false), COALESCE(p_is_filterable, true),
          COALESCE(p_display_order,
                   (SELECT COALESCE(max(l.display_order) + 1, 0)
                      FROM public.category_attribute_links l
                     WHERE l.category_id = p_category_id)),
          p_allowed_options,
          CASE WHEN p_default_value IS NULL OR jsonb_typeof(p_default_value) = 'null'
               THEN NULL ELSE p_default_value END,
          CASE WHEN p_visible_when IS NULL OR jsonb_typeof(p_visible_when) = 'null'
               THEN NULL ELSE p_visible_when END)
  RETURNING id INTO v_id;

  PERFORM public.log_audit('attribute.link', 'category_attribute_links', v_id::text,
    jsonb_build_object('category_id', p_category_id, 'attribute_id', p_attribute_id,
      'new', (SELECT jsonb_build_object(
                       'is_required', l.is_required, 'is_filterable', l.is_filterable,
                       'allowed_options', l.allowed_options,
                       'default_value', l.default_value,
                       'visible_when', l.visible_when)
                FROM public.category_attribute_links l WHERE l.id = v_id)));
  RETURN v_id;
END $function$;
REVOKE ALL ON FUNCTION public.admin_link_attribute(uuid, uuid, boolean, boolean, integer, text[], jsonb, jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_link_attribute(uuid, uuid, boolean, boolean, integer, text[], jsonb, jsonb) TO authenticated, service_role;

-- admin_upsert_attribute: live body (ethio-prod, md5(replace(prosrc, E'\r', '')) 1c319bd66ad12913e87635df02069d36) whole; the only change: the staff_config gate,
-- inserted as body line(s) 20, right after the step-up line and before the first write.
CREATE OR REPLACE FUNCTION public.admin_upsert_attribute(p_id uuid, p_attr_key text, p_name_en text, p_attr_type text, p_options jsonb, p_help_text_en text, p_depends_on text DEFAULT NULL::text, p_unit text DEFAULT NULL::text, p_unit_am text DEFAULT NULL::text, p_min_bound text DEFAULT NULL::text, p_max_bound text DEFAULT NULL::text, p_decimals smallint DEFAULT NULL::smallint, p_format text DEFAULT NULL::text, p_preset text DEFAULT NULL::text, p_max_length integer DEFAULT NULL::integer, p_help_text_am text DEFAULT NULL::text)
 RETURNS uuid
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_id uuid; v_old jsonb; v_dep uuid; v_dep_key text; v_dep_type text;
  v_vals text[]; v_parent text; v_entry jsonb;
  v_cellmsg text; v_optmsg text; v_tkey text; v_ttype text;
  v_ocats uuid[]; v_tcats uuid[]; v_allowed jsonb;
  -- INC-200 — the EFFECTIVE cells: what the row will actually carry once a
  -- type change has cleared what no longer applies.
  v_stored_type text; v_newtype text;
  v_e_unit text; v_e_min text; v_e_max text; v_e_dec smallint; v_e_fmt text;
  v_e_pset text; v_e_maxlen integer; v_e_opts jsonb;
  -- M8c / C5 — unit_am: NULL keeps the stored value (a caller that does not
  -- send it never drops it, INC-188); '' clears; a type change off number clears.
  v_e_unit_am text;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'update') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('categories', 'update');
  -- INC-951 3c (D1 M6b-catalogue) — after the door's authority, before its first write: its dial (staff_config).
  IF NOT coalesce((public.rate_gate('staff_config')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;

  IF p_attr_key IS NULL OR btrim(p_attr_key) = '' THEN
    RAISE EXCEPTION 'admin.attributes.error.keyRequired' USING ERRCODE = 'P0010';
  END IF;

  IF EXISTS (SELECT 1 FROM public.attributes a
              WHERE a.attr_key = p_attr_key AND (p_id IS NULL OR a.id <> p_id)) THEN
    RAISE EXCEPTION 'admin.attributes.error.keyTaken' USING ERRCODE = 'P0010';
  END IF;

  -- INC-200 — A TYPE CHANGE CLEARS THE CELLS THAT NO LONGER APPLY, whatever
  -- the caller passed: text cells (preset, max_length) off anything but text,
  -- number cells (unit, min, max, decimals, format) off anything but number,
  -- options off text/number/boolean. When the type is UNCHANGED, a NULL
  -- parameter keeps its old meaning exactly as before.
  v_e_unit   := p_unit;
  v_e_unit_am := NULLIF(btrim(p_unit_am), '');
  IF p_unit_am IS NULL AND p_id IS NOT NULL THEN
    SELECT a.unit_am INTO v_e_unit_am FROM public.attributes a WHERE a.id = p_id;
  END IF;
  v_e_min    := p_min_bound;
  v_e_max    := p_max_bound;
  v_e_dec    := p_decimals;
  v_e_fmt    := p_format;
  v_e_pset   := p_preset;
  v_e_maxlen := p_max_length;
  v_e_opts   := p_options;
  IF p_id IS NOT NULL THEN
    SELECT a.attr_type INTO v_stored_type FROM public.attributes a WHERE a.id = p_id;
    v_newtype := COALESCE(p_attr_type, v_stored_type);
    IF v_stored_type IS NOT NULL AND v_newtype IS DISTINCT FROM v_stored_type THEN
      IF v_newtype <> 'text' THEN
        v_e_pset := NULL;
        v_e_maxlen := NULL;
      END IF;
      IF v_newtype <> 'number' THEN
        v_e_unit := NULL;
        v_e_unit_am := NULL;
        v_e_min := NULL;
        v_e_max := NULL;
        v_e_dec := NULL;
        v_e_fmt := NULL;
      END IF;
      IF v_newtype IN ('text','number','boolean') THEN
        v_e_opts := NULL;
      END IF;
    END IF;
  END IF;

  -- DEC-045 — exactly one parent, single_select, no self, no cycle.
  v_dep_key := NULLIF(btrim(COALESCE(p_depends_on, '')), '');
  IF v_dep_key IS NOT NULL THEN
    SELECT a.id, a.attr_type INTO v_dep, v_dep_type
      FROM public.attributes a WHERE a.attr_key = v_dep_key;
    IF v_dep IS NULL THEN
      RAISE EXCEPTION 'admin.attributes.error.dependsUnknown:%', v_dep_key USING ERRCODE = 'P0010';
    END IF;
    IF v_dep_type IS DISTINCT FROM 'single_select' THEN
      RAISE EXCEPTION 'admin.attributes.error.dependsNotSelect:%', v_dep_key USING ERRCODE = 'P0010';
    END IF;
    IF p_id IS NOT NULL AND v_dep = p_id THEN
      RAISE EXCEPTION 'admin.attributes.error.dependsSelf' USING ERRCODE = 'P0010';
    END IF;
    IF public.attr_dep_cycle(p_id, v_dep) THEN
      RAISE EXCEPTION 'admin.attributes.error.dependsCycle:%', v_dep_key USING ERRCODE = 'P0010';
    END IF;
    v_vals := public.attr_option_values(v_dep);
  END IF;

  -- Every `parent` names a value of the depended-on definition; a `parent`
  -- without a dependency is refused outright (never silently dropped).
  FOR v_entry IN
    SELECT value FROM jsonb_array_elements(public.attr_option_norm(v_e_opts))
  LOOP
    v_parent := NULLIF(btrim(COALESCE(v_entry->>'parent','')), '');
    CONTINUE WHEN v_parent IS NULL;
    IF v_dep IS NULL THEN
      RAISE EXCEPTION 'admin.attributes.error.parentWithoutDepends:%', v_parent
        USING ERRCODE = 'P0010';
    END IF;
    IF NOT (v_parent = ANY (COALESCE(v_vals, ARRAY[]::text[]))) THEN
      RAISE EXCEPTION 'admin.attributes.error.parentNotInParent:%', v_parent
        USING ERRCODE = 'P0010';
    END IF;
  END LOOP;

  -- DEC-050 — the definition v2 cells, judged by the shared judge.
  v_cellmsg := public.attr_cell_check(p_attr_type, v_e_unit, v_e_min, v_e_max,
                                      v_e_dec::int, v_e_fmt, v_e_pset, v_e_maxlen,
                                      p_help_text_en, p_help_text_am, v_e_unit_am);
  IF v_cellmsg IS NOT NULL THEN
    RAISE EXCEPTION 'admin.attributes.error.badCell:%', v_cellmsg USING ERRCODE = 'P0010';
  END IF;

  -- DEC-050 — the strict option shape. An unknown key is a refusal, never a
  -- silent drop; the refusal names the definition, the option and the reason.
  v_optmsg := public.attr_option_shape(p_attr_key, v_e_opts);
  IF v_optmsg IS NOT NULL THEN
    RAISE EXCEPTION 'admin.attributes.error.badOption:%', v_optmsg USING ERRCODE = 'P0010';
  END IF;

  -- DEC-050 — a bounds target is a NUMBER definition linked, directly or by
  -- inheritance, in AT LEAST ONE category where this definition is linked (LIVE links) — DEC-057b.
  v_ocats := public.attr_postplan_cats(p_attr_key, '[]'::jsonb);
  FOREACH v_tkey IN ARRAY public.attr_bounds_targets(v_e_opts)
  LOOP
    SELECT a.attr_type INTO v_ttype FROM public.attributes a WHERE a.attr_key = v_tkey;
    IF v_ttype IS DISTINCT FROM 'number' THEN
      RAISE EXCEPTION 'admin.attributes.error.boundsTargetNotNumber:%|%', p_attr_key, v_tkey
        USING ERRCODE = 'P0010';
    END IF;
    v_tcats := public.attr_cats_expand(public.attr_postplan_cats(v_tkey, '[]'::jsonb));
    IF COALESCE(array_length(v_ocats, 1), 0) > 0 AND NOT EXISTS (SELECT 1 FROM unnest(v_ocats) c WHERE c = ANY (v_tcats)) THEN
      RAISE EXCEPTION 'admin.attributes.error.boundsTargetNotColinked:%|%', p_attr_key, v_tkey
        USING ERRCODE = 'P0010';
    END IF;
  END LOOP;

  -- DEC-057 — option-conditioned allowed values, judged against LIVE links by
  -- the single rule. Refusals are named exactly as the bounds path names its own.
  v_allowed := public.attr_allowed_check(p_attr_key, v_e_opts, '[]'::jsonb);
  IF v_allowed IS NOT NULL THEN
    RAISE EXCEPTION 'admin.attributes.error.%:%', v_allowed->>'reason', v_allowed->>'detail'
      USING ERRCODE = 'P0010';
  END IF;

  IF p_id IS NULL THEN
    INSERT INTO public.attributes (attr_key, name_en, attr_type, options, help_text_en, depends_on,
                                   unit, min_bound, max_bound, decimals, format, preset,
                                   max_length, help_text_am, unit_am)
    VALUES (p_attr_key, p_name_en, p_attr_type, v_e_opts, p_help_text_en, v_dep,
            v_e_unit, v_e_min, v_e_max, v_e_dec, v_e_fmt, v_e_pset,
            v_e_maxlen, p_help_text_am, v_e_unit_am)
    RETURNING id INTO v_id;

    PERFORM public.log_audit('attribute.create', 'attributes', v_id::text,
      jsonb_build_object('attr_key', p_attr_key, 'attr_type', p_attr_type,
                         'depends_on', COALESCE(v_dep_key, ''),
                         'unit', v_e_unit, 'unit_am', v_e_unit_am, 'min_bound', v_e_min, 'max_bound', v_e_max,
                         'decimals', v_e_dec, 'format', v_e_fmt, 'preset', v_e_pset,
                         'max_length', v_e_maxlen, 'help_text_am', p_help_text_am));
  ELSE
    SELECT to_jsonb(a) INTO v_old FROM public.attributes a WHERE a.id = p_id;
    IF v_old IS NULL THEN
      RAISE EXCEPTION 'admin.attributes.error.notFound' USING ERRCODE = 'P0010';
    END IF;

    -- INC-200 — the type and every cell travel in ONE statement, so no
    -- inapplicable cell is ever briefly held against the new type.
    UPDATE public.attributes a
       SET attr_key     = p_attr_key,
           name_en      = COALESCE(p_name_en, a.name_en),
           attr_type    = COALESCE(p_attr_type, a.attr_type),
           options      = v_e_opts,
           help_text_en = p_help_text_en,
           depends_on   = v_dep,
           unit         = v_e_unit,
           unit_am      = v_e_unit_am,
           min_bound    = v_e_min,
           max_bound    = v_e_max,
           decimals     = v_e_dec,
           format       = v_e_fmt,
           preset       = v_e_pset,
           max_length   = v_e_maxlen,
           help_text_am = p_help_text_am,
           updated_at   = now()
     WHERE a.id = p_id;
    v_id := p_id;

    PERFORM public.log_audit('attribute.update', 'attributes', p_id::text,
      jsonb_build_object(
        'old', jsonb_build_object('attr_key', v_old->>'attr_key', 'name_en', v_old->>'name_en',
                                  'attr_type', v_old->>'attr_type', 'options', v_old->'options',
                                  'depends_on', v_old->>'depends_on',
                                  'unit', v_old->>'unit', 'unit_am', v_old->>'unit_am', 'min_bound', v_old->>'min_bound',
                                  'max_bound', v_old->>'max_bound', 'decimals', v_old->>'decimals',
                                  'format', v_old->>'format', 'preset', v_old->>'preset',
                                  'max_length', v_old->>'max_length',
                                  'help_text_en', v_old->>'help_text_en',
                                  'help_text_am', v_old->>'help_text_am'),
        'new', (SELECT jsonb_build_object('attr_key', a.attr_key, 'name_en', a.name_en,
                                          'attr_type', a.attr_type, 'options', a.options,
                                          'depends_on', a.depends_on,
                                          'unit', a.unit, 'unit_am', a.unit_am, 'min_bound', a.min_bound,
                                          'max_bound', a.max_bound, 'decimals', a.decimals,
                                          'format', a.format, 'preset', a.preset,
                                          'max_length', a.max_length,
                                          'help_text_en', a.help_text_en,
                                          'help_text_am', a.help_text_am)
                  FROM public.attributes a WHERE a.id = p_id)));
  END IF;

  RETURN v_id;
END $function$;
REVOKE ALL ON FUNCTION public.admin_upsert_attribute(uuid, text, text, text, jsonb, text, text, text, text, text, text, smallint, text, text, integer, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_upsert_attribute(uuid, text, text, text, jsonb, text, text, text, text, text, text, smallint, text, text, integer, text) TO authenticated, service_role;


DO $proof$
DECLARE
  v_fn text; v_old text; v_new text; v_oid oid; v_src text;
  v_gate text := E'  -- INC-951 3c (D1 M6b-catalogue) — after the door''s authority, before its first write: its dial (staff_config).\n  IF NOT coalesce((public.rate_gate(''staff_config'')->>''allowed'')::boolean, false) THEN RAISE EXCEPTION ''rateLimited''; END IF;\n';
  v_uid uuid := gen_random_uuid();
  v_session uuid := gen_random_uuid();
  v_rand uuid := gen_random_uuid();
  v_msg text; v_before text; v_after text;
  v_calls text[] := ARRAY[
    'SELECT public.admin_link_attribute(%L::uuid, %L::uuid, false, false, 0)',
    'SELECT public.admin_upsert_attribute(NULL, NULL, ''x'', ''text'', NULL, NULL)'];
  v_call text;
BEGIN
  -- (1) each door: the live body plus exactly the gate line; header and ACL unchanged; the gate after the
  -- step-up line and before the first write.
  FOR v_fn, v_old, v_new IN VALUES
    ('admin_link_attribute(uuid, uuid, boolean, boolean, integer, text[], jsonb, jsonb)', 'dcad930ee0b63565f93d6cf1f16a6a6b', '83b40e3ba442a448e502892a44d4c64a'),
    ('admin_upsert_attribute(uuid, text, text, text, jsonb, text, text, text, text, text, text, smallint, text, text, integer, text)', '1c319bd66ad12913e87635df02069d36', '0a8ecf076448436e9e8e713a74fe44ec')
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
      RAISE EXCEPTION 'M6b-cat1 proof (1): % failed [md5=%, stripped=%, stepup=%, gate=%, firstwrite=%, secdef=%, config=%, anon=%, auth=%, svc=%]',
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
        EXECUTE format(v_call, v_rand::text, v_rand::text);
      EXCEPTION WHEN OTHERS THEN v_msg := SQLERRM;
      END;
      IF v_msg = 'rateLimited' OR v_msg IN ('permission denied', 'not authenticated', 'not signed in') OR v_msg LIKE '%step-up%' THEN
        RAISE EXCEPTION 'M6b-cat1 proof (2): a first call did not pass the gate: % -> %', v_call, v_msg;
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
        EXECUTE format(v_call, v_rand::text, v_rand::text);
      EXCEPTION WHEN OTHERS THEN v_msg := SQLERRM;
      END;
      IF v_msg IS DISTINCT FROM 'rateLimited' THEN
        RAISE EXCEPTION 'M6b-cat1 proof (2): the n+1th call was not refused: % -> %', v_call, v_msg;
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
      RAISE EXCEPTION 'M6b-cat1 proof (2): a refused call wrote something';
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'd1-m6b-cat1-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'd1-m6b-cat1-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261029090000');
