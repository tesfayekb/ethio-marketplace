-- DEC-057 L1 (part A) — OPTION-CONDITIONED ALLOWED VALUES: shape, rule, door,
-- normalizer. INC-183 law: whole re-declarations, closers in-file, definition
-- and ACL read-backs. The planner lands in part B (same landing).

/* ============ 1. THE STRICT OPTION SHAPE (whole re-declaration) =========== */
-- Allowed keys exactly: value, label_en, label_am, parent, active, bounds,
-- aliases, allowed. Unknown keys are REFUSED, naming the key. Co-linkage of a
-- bounds/allowed target is judged by the caller (live links at the door, the
-- post-plan link set at the planner).
CREATE OR REPLACE FUNCTION public.attr_option_shape(p_key text, p_options jsonb)
RETURNS text
LANGUAGE plpgsql
IMMUTABLE
SET search_path TO 'public'
AS $function$
DECLARE
  v_opt     jsonb;
  v_val     text;
  v_k       text;
  v_alias   text;
  v_all     text[] := ARRAY[]::text[];
  v_n       int;
  v_b       jsonb;
  v_bmin    text;
  v_bmax    text;
BEGIN
  IF p_options IS NULL OR jsonb_typeof(p_options) <> 'array' THEN RETURN NULL; END IF;

  FOR v_opt IN SELECT value FROM jsonb_array_elements(p_options)
  LOOP
    CONTINUE WHEN jsonb_typeof(v_opt) <> 'object';
    v_val := COALESCE(v_opt->>'value', '');

    FOR v_k IN SELECT k FROM jsonb_object_keys(v_opt) k
    LOOP
      IF v_k NOT IN ('value','label_en','label_am','parent','active','bounds','aliases','allowed') THEN
        RETURN p_key || '|' || v_val || '|unknownOptionKey:' || v_k;
      END IF;
    END LOOP;

    IF v_opt ? 'active' AND jsonb_typeof(v_opt->'active') <> 'boolean' THEN
      RETURN p_key || '|' || v_val || '|activeNotBoolean';
    END IF;

    IF v_opt ? 'aliases' THEN
      IF jsonb_typeof(v_opt->'aliases') <> 'array' THEN
        RETURN p_key || '|' || v_val || '|aliasesNotArray';
      END IF;
      v_n := jsonb_array_length(v_opt->'aliases');
      IF v_n < 1 OR v_n > 5 THEN
        RETURN p_key || '|' || v_val || '|aliasesCount:' || v_n::text;
      END IF;
      FOR v_alias IN SELECT x.value #>> '{}' FROM jsonb_array_elements(v_opt->'aliases') x
      LOOP
        IF v_alias IS NULL THEN RETURN p_key || '|' || v_val || '|aliasNotString'; END IF;
        IF char_length(v_alias) < 1 OR char_length(v_alias) > 32 THEN
          RETURN p_key || '|' || v_val || '|aliasLength:' || v_alias;
        END IF;
        IF v_alias ~ '[[:cntrl:]]' THEN
          RETURN p_key || '|' || v_val || '|aliasControlChar';
        END IF;
        IF lower(v_alias) = ANY (v_all) THEN
          RETURN p_key || '|' || v_val || '|aliasDuplicate:' || v_alias;
        END IF;
        v_all := v_all || lower(v_alias);
      END LOOP;
      IF EXISTS (SELECT 1 FROM jsonb_array_elements(v_opt->'aliases') x
                  WHERE jsonb_typeof(x.value) <> 'string') THEN
        RETURN p_key || '|' || v_val || '|aliasNotString';
      END IF;
    END IF;

    IF v_opt ? 'bounds' THEN
      IF jsonb_typeof(v_opt->'bounds') <> 'object' THEN
        RETURN p_key || '|' || v_val || '|boundsNotObject';
      END IF;
      FOR v_k IN SELECT k FROM jsonb_object_keys(v_opt->'bounds') k
      LOOP
        v_b := v_opt->'bounds'->v_k;
        IF jsonb_typeof(v_b) <> 'object' THEN
          RETURN p_key || '|' || v_val || '|boundsNotObject:' || v_k;
        END IF;
        IF EXISTS (SELECT 1 FROM jsonb_object_keys(v_b) bk WHERE bk NOT IN ('min','max')) THEN
          RETURN p_key || '|' || v_val || '|boundsUnknownKey:' || v_k;
        END IF;
        v_bmin := v_b #>> '{min}';
        v_bmax := v_b #>> '{max}';
        IF v_bmin IS NOT NULL AND NOT public.attr_bound_ok(v_bmin) THEN
          RETURN p_key || '|' || v_val || '|boundsBadValue:' || v_bmin;
        END IF;
        IF v_bmax IS NOT NULL AND NOT public.attr_bound_ok(v_bmax) THEN
          RETURN p_key || '|' || v_val || '|boundsBadValue:' || v_bmax;
        END IF;
        IF v_bmin ~ '^-?[0-9]+(\.[0-9]+)?$' AND v_bmax ~ '^-?[0-9]+(\.[0-9]+)?$'
           AND v_bmin::numeric > v_bmax::numeric THEN
          RETURN p_key || '|' || v_val || '|boundsMinAboveMax:' || v_k;
        END IF;
      END LOOP;
    END IF;

    -- DEC-057 — `allowed` is an object of select-target keys to value lists.
    IF v_opt ? 'allowed' THEN
      IF jsonb_typeof(v_opt->'allowed') <> 'object' THEN
        RETURN p_key || '|' || v_val || '|allowedNotObject';
      END IF;
      IF (SELECT count(*) FROM jsonb_object_keys(v_opt->'allowed') ak) > 5 THEN
        RETURN p_key || '|' || v_val || '|allowedTooMany';
      END IF;
      FOR v_k IN SELECT k FROM jsonb_object_keys(v_opt->'allowed') k
      LOOP
        v_b := v_opt->'allowed'->v_k;
        IF jsonb_typeof(v_b) <> 'array' THEN
          RETURN p_key || '|' || v_val || '|allowedValuesNotArray:' || v_k;
        END IF;
        v_n := jsonb_array_length(v_b);
        IF v_n < 1 THEN
          RETURN p_key || '|' || v_val || '|allowedEmpty:' || v_k;
        END IF;
        IF v_n > 50 THEN
          RETURN p_key || '|' || v_val || '|allowedTooMany:' || v_k;
        END IF;
        IF EXISTS (SELECT 1 FROM jsonb_array_elements(v_b) x
                    WHERE jsonb_typeof(x.value) <> 'string') THEN
          RETURN p_key || '|' || v_val || '|allowedValuesNotArray:' || v_k;
        END IF;
        IF (SELECT count(DISTINCT x.value #>> '{}') FROM jsonb_array_elements(v_b) x) <> v_n THEN
          RETURN p_key || '|' || v_val || '|allowedDuplicate:' || v_k;
        END IF;
      END LOOP;
    END IF;
  END LOOP;

  RETURN NULL;
END $function$;

REVOKE ALL ON FUNCTION public.attr_option_shape(text, jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.attr_option_shape(text, jsonb) TO authenticated;
GRANT ALL ON FUNCTION public.attr_option_shape(text, jsonb) TO service_role;

/* ============ 2. THE SINGLE RULE: attr_allowed_check (new) =============== */
-- Returns NULL when clean, else a refusal object naming the owner key, the
-- option value, the target and the reason. p_links is the post-plan link set
-- ('[]' asks the LIVE question — that is what the door does), judged with the
-- same machinery bounds co-linkage uses (attr_postplan_cats/attr_cats_expand).
CREATE OR REPLACE FUNCTION public.attr_allowed_check(p_owner_key text, p_options jsonb, p_links jsonb)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SET search_path TO 'public'
AS $function$
DECLARE
  v_opt     jsonb;
  v_val     text;
  v_tkey    text;
  v_list    jsonb;
  v_ttype   text;
  v_tid     uuid;
  v_tvals   text[];
  v_v       text;
  v_ocats   uuid[];
  v_tcats   uuid[];
  v_parent  text;
  v_cur     uuid;
  v_hops    int;
BEGIN
  IF p_options IS NULL OR jsonb_typeof(p_options) <> 'array' THEN RETURN NULL; END IF;
  IF NOT EXISTS (
    SELECT 1 FROM jsonb_array_elements(p_options) o
     WHERE jsonb_typeof(o.value) = 'object'
       AND jsonb_typeof(o.value->'allowed') = 'object'
       AND (o.value->'allowed') <> '{}'::jsonb) THEN
    RETURN NULL;
  END IF;

  v_ocats := public.attr_cats_expand(public.attr_postplan_cats(p_owner_key, p_links));
  SELECT a.attr_key INTO v_parent
    FROM public.attributes a
    JOIN public.attributes o ON o.depends_on = a.id
   WHERE o.attr_key = p_owner_key;

  FOR v_opt IN SELECT value FROM jsonb_array_elements(p_options)
  LOOP
    CONTINUE WHEN jsonb_typeof(v_opt) <> 'object';
    CONTINUE WHEN jsonb_typeof(v_opt->'allowed') <> 'object';
    v_val := COALESCE(v_opt->>'value', '');

    FOR v_tkey, v_list IN SELECT key, value FROM jsonb_each(v_opt->'allowed')
    LOOP
      -- Never the owner, never the owner's parent.
      IF v_tkey = p_owner_key OR (v_parent IS NOT NULL AND v_tkey = v_parent) THEN
        RETURN jsonb_build_object('key', p_owner_key, 'option', v_val,
                                  'target', v_tkey, 'reason', 'allowedTargetCircular',
                                  'detail', p_owner_key || '|' || v_val || '|' || v_tkey);
      END IF;

      SELECT a.id, a.attr_type INTO v_tid, v_ttype
        FROM public.attributes a WHERE a.attr_key = v_tkey;
      IF v_tid IS NULL OR v_ttype NOT IN ('single_select','multi_select') THEN
        RETURN jsonb_build_object('key', p_owner_key, 'option', v_val,
                                  'target', v_tkey, 'reason', 'allowedTargetNotSelect',
                                  'detail', p_owner_key || '|' || v_val || '|' || v_tkey);
      END IF;

      -- Never a definition that depends on the owner (directly or transitively).
      v_cur := v_tid; v_hops := 0;
      WHILE v_cur IS NOT NULL AND v_hops < 20 LOOP
        SELECT a.depends_on INTO v_cur FROM public.attributes a WHERE a.id = v_cur;
        IF v_cur IS NOT NULL
           AND EXISTS (SELECT 1 FROM public.attributes a
                        WHERE a.id = v_cur AND a.attr_key = p_owner_key) THEN
          RETURN jsonb_build_object('key', p_owner_key, 'option', v_val,
                                    'target', v_tkey, 'reason', 'allowedTargetCircular',
                                    'detail', p_owner_key || '|' || v_val || '|' || v_tkey);
        END IF;
        v_hops := v_hops + 1;
      END LOOP;

      -- Co-linked wherever the owner is linked, after this plan is applied.
      v_tcats := public.attr_cats_expand(public.attr_postplan_cats(v_tkey, p_links));
      IF EXISTS (SELECT 1 FROM unnest(v_ocats) c WHERE NOT (c = ANY (v_tcats))) THEN
        RETURN jsonb_build_object('key', p_owner_key, 'option', v_val,
                                  'target', v_tkey, 'reason', 'allowedTargetNotColinked',
                                  'detail', p_owner_key || '|' || v_val || '|' || v_tkey);
      END IF;

      -- Every listed value exists in the target's option list (active or not).
      v_tvals := public.attr_option_values(v_tid);
      FOR v_v IN SELECT x.value #>> '{}' FROM jsonb_array_elements(
                   CASE WHEN jsonb_typeof(v_list) = 'array' THEN v_list ELSE '[]'::jsonb END) x
      LOOP
        IF v_v IS NULL OR NOT (v_v = ANY (COALESCE(v_tvals, ARRAY[]::text[]))) THEN
          RETURN jsonb_build_object('key', p_owner_key, 'option', v_val,
                                    'target', v_tkey, 'reason', 'allowedUnknownValue',
                                    'value', COALESCE(v_v, ''),
                                    'detail', p_owner_key || '|' || v_val || '|' || v_tkey
                                              || '|' || COALESCE(v_v, ''));
        END IF;
      END LOOP;
    END LOOP;
  END LOOP;

  RETURN NULL;
END $function$;

REVOKE ALL ON FUNCTION public.attr_allowed_check(text, jsonb, jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.attr_allowed_check(text, jsonb, jsonb) TO authenticated;
GRANT ALL ON FUNCTION public.attr_allowed_check(text, jsonb, jsonb) TO service_role;

/* ============ 3. THE NORMALIZER (whole re-declaration) =================== */
-- `allowed` joins the change-detection shape; `{}` is stripped so a spelled-out
-- empty object is a no-op (byte-stability).
CREATE OR REPLACE FUNCTION public.attr_option_norm_v2(p_options jsonb)
RETURNS jsonb
LANGUAGE sql
IMMUTABLE
SET search_path TO 'public'
AS $function$
  SELECT COALESCE(jsonb_agg(o.norm ORDER BY o.ord), '[]'::jsonb)
    FROM (
      SELECT x.ord,
             jsonb_build_object(
               'value',
                 btrim(COALESCE(CASE WHEN jsonb_typeof(x.value) = 'object'
                                     THEN x.value->>'value'
                                     ELSE x.value #>> '{}' END, '')),
               'label_en',
                 btrim(COALESCE(CASE WHEN jsonb_typeof(x.value) = 'object'
                                     THEN x.value->>'label_en' END, '')),
               'label_am',
                 btrim(COALESCE(CASE WHEN jsonb_typeof(x.value) = 'object'
                                     THEN x.value->>'label_am' END, '')),
               'parent',
                 btrim(COALESCE(CASE WHEN jsonb_typeof(x.value) = 'object'
                                     THEN x.value->>'parent' END, ''))
             )
             || CASE
                  WHEN jsonb_typeof(x.value) = 'object'
                   AND x.value ? 'active'
                   AND (x.value->'active') = 'false'::jsonb
                  THEN jsonb_build_object('active', 'false'::jsonb)
                  ELSE '{}'::jsonb
                END
             || CASE
                  WHEN jsonb_typeof(x.value) = 'object'
                   AND jsonb_typeof(x.value->'bounds') = 'object'
                   AND (x.value->'bounds') <> '{}'::jsonb
                  THEN jsonb_build_object('bounds', x.value->'bounds')
                  ELSE '{}'::jsonb
                END
             || CASE
                  WHEN jsonb_typeof(x.value) = 'object'
                   AND jsonb_typeof(x.value->'aliases') = 'array'
                   AND jsonb_array_length(x.value->'aliases') > 0
                  THEN jsonb_build_object('aliases', x.value->'aliases')
                  ELSE '{}'::jsonb
                END
             || CASE
                  WHEN jsonb_typeof(x.value) = 'object'
                   AND jsonb_typeof(x.value->'allowed') = 'object'
                   AND (x.value->'allowed') <> '{}'::jsonb
                  THEN jsonb_build_object('allowed', x.value->'allowed')
                  ELSE '{}'::jsonb
                END AS norm
        FROM jsonb_array_elements(
               CASE WHEN jsonb_typeof(p_options) = 'array'
                    THEN p_options ELSE '[]'::jsonb END
             ) WITH ORDINALITY AS x(value, ord)
       WHERE NOT (jsonb_typeof(x.value) = 'object' AND NOT (x.value ? 'value'))
    ) o;
$function$;

REVOKE ALL ON FUNCTION public.attr_option_norm_v2(jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.attr_option_norm_v2(jsonb) TO authenticated;
GRANT ALL ON FUNCTION public.attr_option_norm_v2(jsonb) TO service_role;

/* ============ 4. THE UPSERT DOOR (whole re-declaration) ================== */
CREATE OR REPLACE FUNCTION public.admin_upsert_attribute(
  p_id uuid, p_attr_key text, p_name_en text, p_attr_type text,
  p_options jsonb, p_help_text_en text, p_depends_on text DEFAULT NULL,
  p_unit text DEFAULT NULL, p_min_bound text DEFAULT NULL, p_max_bound text DEFAULT NULL,
  p_decimals smallint DEFAULT NULL, p_format text DEFAULT NULL, p_preset text DEFAULT NULL,
  p_max_length integer DEFAULT NULL, p_help_text_am text DEFAULT NULL)
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
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'update') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('categories', 'update');

  IF p_attr_key IS NULL OR btrim(p_attr_key) = '' THEN
    RAISE EXCEPTION 'admin.attributes.error.keyRequired' USING ERRCODE = 'P0010';
  END IF;

  IF EXISTS (SELECT 1 FROM public.attributes a
              WHERE a.attr_key = p_attr_key AND (p_id IS NULL OR a.id <> p_id)) THEN
    RAISE EXCEPTION 'admin.attributes.error.keyTaken' USING ERRCODE = 'P0010';
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
    SELECT value FROM jsonb_array_elements(public.attr_option_norm(p_options))
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
  v_cellmsg := public.attr_cell_check(p_attr_type, p_unit, p_min_bound, p_max_bound,
                                      p_decimals::int, p_format, p_preset, p_max_length,
                                      p_help_text_en, p_help_text_am);
  IF v_cellmsg IS NOT NULL THEN
    RAISE EXCEPTION 'admin.attributes.error.badCell:%', v_cellmsg USING ERRCODE = 'P0010';
  END IF;

  -- DEC-050 — the strict option shape. An unknown key is a refusal, never a
  -- silent drop; the refusal names the definition, the option and the reason.
  v_optmsg := public.attr_option_shape(p_attr_key, p_options);
  IF v_optmsg IS NOT NULL THEN
    RAISE EXCEPTION 'admin.attributes.error.badOption:%', v_optmsg USING ERRCODE = 'P0010';
  END IF;

  -- DEC-050 — a bounds target is a NUMBER definition linked, directly or by
  -- inheritance, in EVERY category where this definition is linked (LIVE links).
  v_ocats := public.attr_postplan_cats(p_attr_key, '[]'::jsonb);
  FOREACH v_tkey IN ARRAY public.attr_bounds_targets(p_options)
  LOOP
    SELECT a.attr_type INTO v_ttype FROM public.attributes a WHERE a.attr_key = v_tkey;
    IF v_ttype IS DISTINCT FROM 'number' THEN
      RAISE EXCEPTION 'admin.attributes.error.boundsTargetNotNumber:%|%', p_attr_key, v_tkey
        USING ERRCODE = 'P0010';
    END IF;
    v_tcats := public.attr_cats_expand(public.attr_postplan_cats(v_tkey, '[]'::jsonb));
    IF EXISTS (SELECT 1 FROM unnest(v_ocats) c WHERE NOT (c = ANY (v_tcats))) THEN
      RAISE EXCEPTION 'admin.attributes.error.boundsTargetNotColinked:%|%', p_attr_key, v_tkey
        USING ERRCODE = 'P0010';
    END IF;
  END LOOP;

  -- DEC-057 — option-conditioned allowed values, judged against LIVE links by
  -- the single rule. Refusals are named exactly as the bounds path names its own.
  v_allowed := public.attr_allowed_check(p_attr_key, p_options, '[]'::jsonb);
  IF v_allowed IS NOT NULL THEN
    RAISE EXCEPTION 'admin.attributes.error.%:%', v_allowed->>'reason', v_allowed->>'detail'
      USING ERRCODE = 'P0010';
  END IF;

  IF p_id IS NULL THEN
    INSERT INTO public.attributes (attr_key, name_en, attr_type, options, help_text_en, depends_on,
                                   unit, min_bound, max_bound, decimals, format, preset,
                                   max_length, help_text_am)
    VALUES (p_attr_key, p_name_en, p_attr_type, p_options, p_help_text_en, v_dep,
            p_unit, p_min_bound, p_max_bound, p_decimals, p_format, p_preset,
            p_max_length, p_help_text_am)
    RETURNING id INTO v_id;

    PERFORM public.log_audit('attribute.create', 'attributes', v_id::text,
      jsonb_build_object('attr_key', p_attr_key, 'attr_type', p_attr_type,
                         'depends_on', COALESCE(v_dep_key, ''),
                         'unit', p_unit, 'min_bound', p_min_bound, 'max_bound', p_max_bound,
                         'decimals', p_decimals, 'format', p_format, 'preset', p_preset,
                         'max_length', p_max_length, 'help_text_am', p_help_text_am));
  ELSE
    SELECT to_jsonb(a) INTO v_old FROM public.attributes a WHERE a.id = p_id;
    IF v_old IS NULL THEN
      RAISE EXCEPTION 'admin.attributes.error.notFound' USING ERRCODE = 'P0010';
    END IF;

    UPDATE public.attributes a
       SET attr_key     = p_attr_key,
           name_en      = COALESCE(p_name_en, a.name_en),
           attr_type    = COALESCE(p_attr_type, a.attr_type),
           options      = p_options,
           help_text_en = p_help_text_en,
           depends_on   = v_dep,
           unit         = p_unit,
           min_bound    = p_min_bound,
           max_bound    = p_max_bound,
           decimals     = p_decimals,
           format       = p_format,
           preset       = p_preset,
           max_length   = p_max_length,
           help_text_am = p_help_text_am,
           updated_at   = now()
     WHERE a.id = p_id;
    v_id := p_id;

    PERFORM public.log_audit('attribute.update', 'attributes', p_id::text,
      jsonb_build_object(
        'old', jsonb_build_object('attr_key', v_old->>'attr_key', 'name_en', v_old->>'name_en',
                                  'attr_type', v_old->>'attr_type', 'options', v_old->'options',
                                  'depends_on', v_old->>'depends_on',
                                  'unit', v_old->>'unit', 'min_bound', v_old->>'min_bound',
                                  'max_bound', v_old->>'max_bound', 'decimals', v_old->>'decimals',
                                  'format', v_old->>'format', 'preset', v_old->>'preset',
                                  'max_length', v_old->>'max_length',
                                  'help_text_en', v_old->>'help_text_en',
                                  'help_text_am', v_old->>'help_text_am'),
        'new', (SELECT jsonb_build_object('attr_key', a.attr_key, 'name_en', a.name_en,
                                          'attr_type', a.attr_type, 'options', a.options,
                                          'depends_on', a.depends_on,
                                          'unit', a.unit, 'min_bound', a.min_bound,
                                          'max_bound', a.max_bound, 'decimals', a.decimals,
                                          'format', a.format, 'preset', a.preset,
                                          'max_length', a.max_length,
                                          'help_text_en', a.help_text_en,
                                          'help_text_am', a.help_text_am)
                  FROM public.attributes a WHERE a.id = p_id)));
  END IF;

  RETURN v_id;
END $function$;

REVOKE ALL ON FUNCTION public.admin_upsert_attribute(uuid, text, text, text, jsonb, text, text, text, text, text, smallint, text, text, integer, text)
  FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_upsert_attribute(uuid, text, text, text, jsonb, text, text, text, text, text, smallint, text, text, integer, text)
  TO authenticated;
GRANT ALL ON FUNCTION public.admin_upsert_attribute(uuid, text, text, text, jsonb, text, text, text, text, text, smallint, text, text, integer, text)
  TO service_role;

/* ============ 5. PROOFS IN-FILE (every proof raises on failure) ========== */
DO $p1$
DECLARE
  v_c1 uuid; v_c2 uuid; v_owner uuid; v_target uuid; v_num uuid; v_dep uuid;
  v_r jsonb; v_s text;
BEGIN
  INSERT INTO public.categories (name_en, slug) VALUES ('DEC057 scratch A', 'dec057-scratch-a')
    RETURNING id INTO v_c1;
  INSERT INTO public.categories (name_en, slug) VALUES ('DEC057 scratch B', 'dec057-scratch-b')
    RETURNING id INTO v_c2;

  INSERT INTO public.attributes (attr_key, name_en, attr_type, options)
  VALUES ('dec057_owner', 'DEC057 owner', 'single_select',
          '[{"value":"a"},{"value":"b"}]'::jsonb) RETURNING id INTO v_owner;
  INSERT INTO public.attributes (attr_key, name_en, attr_type, options)
  VALUES ('dec057_target', 'DEC057 target', 'single_select',
          '[{"value":"x"},{"value":"y"},{"value":"z","active":false}]'::jsonb)
    RETURNING id INTO v_target;
  INSERT INTO public.attributes (attr_key, name_en, attr_type)
  VALUES ('dec057_num', 'DEC057 number', 'number') RETURNING id INTO v_num;
  INSERT INTO public.attributes (attr_key, name_en, attr_type, options, depends_on)
  VALUES ('dec057_dep', 'DEC057 dependent', 'single_select',
          '[{"value":"d","parent":"a"}]'::jsonb, v_owner) RETURNING id INTO v_dep;

  INSERT INTO public.category_attribute_links (category_id, attribute_id)
  VALUES (v_c1, v_owner), (v_c2, v_owner), (v_c1, v_target), (v_c2, v_target),
         (v_c1, v_num), (v_c1, v_dep);

  -- (i) HAPPY PATH: a co-linked select target with existing values passes.
  v_r := public.attr_allowed_check('dec057_owner',
           '[{"value":"a","allowed":{"dec057_target":["x","y"]}}]'::jsonb, '[]'::jsonb);
  IF v_r IS NOT NULL THEN RAISE EXCEPTION 'PROOF (i) FAILED: %', v_r; END IF;
  v_s := public.attr_option_shape('dec057_owner',
           '[{"value":"a","allowed":{"dec057_target":["x","y"]}}]'::jsonb);
  IF v_s IS NOT NULL THEN RAISE EXCEPTION 'PROOF (i) SHAPE FAILED: %', v_s; END IF;
  -- an inactive value is still a legal listing
  IF public.attr_allowed_check('dec057_owner',
       '[{"value":"a","allowed":{"dec057_target":["z"]}}]'::jsonb, '[]'::jsonb) IS NOT NULL THEN
    RAISE EXCEPTION 'PROOF (i) FAILED: inactive target value refused';
  END IF;
  RAISE NOTICE 'PROOF (i) OK: co-linked select target with existing values passes';

  -- (ii) UNKNOWN VALUE
  v_r := public.attr_allowed_check('dec057_owner',
           '[{"value":"a","allowed":{"dec057_target":["q"]}}]'::jsonb, '[]'::jsonb);
  IF COALESCE(v_r->>'reason','') <> 'allowedUnknownValue' THEN
    RAISE EXCEPTION 'PROOF (ii) FAILED: %', v_r;
  END IF;
  RAISE NOTICE 'PROOF (ii) OK: %', v_r;

  -- (iii) NOT CO-LINKED (owner in two categories, target in one)
  DELETE FROM public.category_attribute_links
   WHERE category_id = v_c2 AND attribute_id = v_target;
  v_r := public.attr_allowed_check('dec057_owner',
           '[{"value":"a","allowed":{"dec057_target":["x"]}}]'::jsonb, '[]'::jsonb);
  IF COALESCE(v_r->>'reason','') <> 'allowedTargetNotColinked' THEN
    RAISE EXCEPTION 'PROOF (iii) FAILED: %', v_r;
  END IF;
  RAISE NOTICE 'PROOF (iii) OK: %', v_r;
  INSERT INTO public.category_attribute_links (category_id, attribute_id) VALUES (v_c2, v_target);

  -- (iv) NUMBER TARGET
  v_r := public.attr_allowed_check('dec057_owner',
           '[{"value":"a","allowed":{"dec057_num":["1"]}}]'::jsonb, '[]'::jsonb);
  IF COALESCE(v_r->>'reason','') <> 'allowedTargetNotSelect' THEN
    RAISE EXCEPTION 'PROOF (iv) FAILED: %', v_r;
  END IF;
  RAISE NOTICE 'PROOF (iv) OK: %', v_r;

  -- (v) CIRCULAR: owner targets itself; a dependent targets its parent;
  --     the owner targets a definition that depends on it.
  v_r := public.attr_allowed_check('dec057_owner',
           '[{"value":"a","allowed":{"dec057_owner":["b"]}}]'::jsonb, '[]'::jsonb);
  IF COALESCE(v_r->>'reason','') <> 'allowedTargetCircular' THEN
    RAISE EXCEPTION 'PROOF (v.self) FAILED: %', v_r;
  END IF;
  v_r := public.attr_allowed_check('dec057_dep',
           '[{"value":"d","allowed":{"dec057_owner":["a"]}}]'::jsonb, '[]'::jsonb);
  IF COALESCE(v_r->>'reason','') <> 'allowedTargetCircular' THEN
    RAISE EXCEPTION 'PROOF (v.parent) FAILED: %', v_r;
  END IF;
  v_r := public.attr_allowed_check('dec057_owner',
           '[{"value":"a","allowed":{"dec057_dep":["d"]}}]'::jsonb, '[]'::jsonb);
  IF COALESCE(v_r->>'reason','') <> 'allowedTargetCircular' THEN
    RAISE EXCEPTION 'PROOF (v.dependent) FAILED: %', v_r;
  END IF;
  RAISE NOTICE 'PROOF (v) OK: self, parent and dependent targets all refused';

  -- (vi) SIX TARGETS / SHAPE REFUSALS
  v_s := public.attr_option_shape('dec057_owner',
           '[{"value":"a","allowed":{"t1":["x"],"t2":["x"],"t3":["x"],"t4":["x"],"t5":["x"],"t6":["x"]}}]'::jsonb);
  IF v_s IS DISTINCT FROM 'dec057_owner|a|allowedTooMany' THEN
    RAISE EXCEPTION 'PROOF (vi) FAILED (too many): %', v_s;
  END IF;
  IF public.attr_option_shape('k', '[{"value":"a","allowed":[]}]'::jsonb)
     IS DISTINCT FROM 'k|a|allowedNotObject' THEN
    RAISE EXCEPTION 'PROOF (vi) FAILED (not object)';
  END IF;
  IF public.attr_option_shape('k', '[{"value":"a","allowed":{"t":"x"}}]'::jsonb)
     IS DISTINCT FROM 'k|a|allowedValuesNotArray:t' THEN
    RAISE EXCEPTION 'PROOF (vi) FAILED (values not array)';
  END IF;
  IF public.attr_option_shape('k', '[{"value":"a","allowed":{"t":[]}}]'::jsonb)
     IS DISTINCT FROM 'k|a|allowedEmpty:t' THEN
    RAISE EXCEPTION 'PROOF (vi) FAILED (empty)';
  END IF;
  IF public.attr_option_shape('k', '[{"value":"a","allowed":{"t":["x","x"]}}]'::jsonb)
     IS DISTINCT FROM 'k|a|allowedDuplicate:t' THEN
    RAISE EXCEPTION 'PROOF (vi) FAILED (duplicate)';
  END IF;
  IF public.attr_option_shape('k', '[{"value":"a","nope":1}]'::jsonb)
     IS DISTINCT FROM 'k|a|unknownOptionKey:nope' THEN
    RAISE EXCEPTION 'PROOF (vi) FAILED (unknown key still refused)';
  END IF;
  RAISE NOTICE 'PROOF (vi) OK: allowed shape refusals named exactly';

  -- (vii) NORMALIZER: `{}` normalises away; a real map survives.
  IF (public.attr_option_norm_v2('[{"value":"a","allowed":{}}]'::jsonb)->0)::text
     <> '{"value": "a", "parent": "", "label_am": "", "label_en": ""}' THEN
    RAISE EXCEPTION 'PROOF (vii) FAILED (empty allowed not stripped): %',
      public.attr_option_norm_v2('[{"value":"a","allowed":{}}]'::jsonb);
  END IF;
  IF (public.attr_option_norm_v2('[{"value":"a","allowed":{"t":["x"]}}]'::jsonb)->0)::text
     NOT LIKE '%"allowed": {"t": ["x"]}%' THEN
    RAISE EXCEPTION 'PROOF (vii) FAILED (allowed dropped)';
  END IF;
  RAISE NOTICE 'PROOF (vii) OK: empty allowed is a no-op, a real map survives';

  -- scratch rows removed
  DELETE FROM public.category_attribute_links
   WHERE attribute_id IN (v_owner, v_target, v_num, v_dep);
  DELETE FROM public.attributes WHERE id IN (v_dep, v_owner, v_target, v_num);
  DELETE FROM public.categories WHERE id IN (v_c1, v_c2);
  IF EXISTS (SELECT 1 FROM public.attributes WHERE attr_key LIKE 'dec057_%')
     OR EXISTS (SELECT 1 FROM public.categories WHERE slug LIKE 'dec057-scratch-%') THEN
    RAISE EXCEPTION 'PROOF FAILED: scratch rows survived';
  END IF;
  RAISE NOTICE 'SCRATCH OK: rows removed';
END $p1$;

-- (viii) The door really calls the single rule.
DO $p2$
BEGIN
  IF pg_get_functiondef(
       'public.admin_upsert_attribute(uuid, text, text, text, jsonb, text, text, text, text, text, smallint, text, text, integer, text)'::regprocedure)
     NOT LIKE '%attr_allowed_check(p_attr_key, p_options%' THEN
    RAISE EXCEPTION 'CLOSER FAILED: the door does not call attr_allowed_check';
  END IF;
  RAISE NOTICE 'DEFINITION READ-BACK OK: the door calls attr_allowed_check against live links';
END $p2$;

-- (ix) The export payload and the reader pass the options JSON through and are
--      UNCHANGED by this migration: read-back proves their bodies still carry
--      the DEC-050 L2b/L3a-mig shapes and no allowed-specific code.
DO $p3$
DECLARE
  v_exp text := pg_get_functiondef('public.attr_export_payload(text)'::regprocedure);
  v_rdr text := pg_get_functiondef('public.admin_list_attributes()'::regprocedure);
BEGIN
  IF v_exp NOT LIKE '%''max_length'', COALESCE(a.max_length::text, '''')%' THEN
    RAISE EXCEPTION 'READ-BACK FAILED: export payload lost its v2 cells';
  END IF;
  IF v_exp LIKE '%allowed%' THEN
    RAISE EXCEPTION 'READ-BACK FAILED: export payload gained allowed-specific code';
  END IF;
  IF v_rdr NOT LIKE '%a.options%' THEN
    RAISE EXCEPTION 'READ-BACK FAILED: reader no longer returns options';
  END IF;
  IF v_rdr LIKE '%allowed%' THEN
    RAISE EXCEPTION 'READ-BACK FAILED: reader gained allowed-specific code';
  END IF;
  RAISE NOTICE 'READ-BACK OK: export payload and reader unchanged (options JSON passes through)';
END $p3$;

-- (x) ACL read-backs — grants identical to today for every function touched.
DO $p4$
DECLARE v_sig text;
BEGIN
  FOREACH v_sig IN ARRAY ARRAY[
    'public.attr_option_shape(text, jsonb)',
    'public.attr_allowed_check(text, jsonb, jsonb)',
    'public.attr_option_norm_v2(jsonb)',
    'public.admin_upsert_attribute(uuid, text, text, text, jsonb, text, text, text, text, text, smallint, text, text, integer, text)',
    'public.attr_export_payload(text)',
    'public.admin_list_attributes()'
  ] LOOP
    IF has_function_privilege('anon', v_sig, 'EXECUTE') THEN
      RAISE EXCEPTION 'CLOSER FAILED: anon can execute %', v_sig;
    END IF;
    IF NOT has_function_privilege('authenticated', v_sig, 'EXECUTE') THEN
      RAISE EXCEPTION 'CLOSER FAILED: authenticated cannot execute %', v_sig;
    END IF;
    IF NOT has_function_privilege('service_role', v_sig, 'EXECUTE') THEN
      RAISE EXCEPTION 'CLOSER FAILED: service_role cannot execute %', v_sig;
    END IF;
    RAISE NOTICE 'ACL OK: % (anon=no, authenticated=yes, service_role=yes)', v_sig;
  END LOOP;
END $p4$;

INSERT INTO public.migration_marks(version) VALUES ('20260913060000') ON CONFLICT DO NOTHING;