-- =====================================================================
-- M-MAINT-3 — H2 CLOSER. The three helpers introduced by mark 20260920000004
-- are re-declared WHOLE with `SET search_path = public` (linter 0011,
-- "Function Search Path Mutable"). Behaviour is unchanged; INC-212: each
-- restates its closers in this file. They stay SECURITY INVOKER — they are
-- read helpers called by the gated DEFINER doors.
-- =====================================================================

CREATE OR REPLACE FUNCTION public.attr_visible_when_ok(p_vw jsonb)
RETURNS boolean
LANGUAGE sql
IMMUTABLE
SET search_path = public
AS $$
  SELECT CASE
    WHEN p_vw IS NULL OR jsonb_typeof(p_vw) = 'null' THEN true
    WHEN jsonb_typeof(p_vw) <> 'object' THEN false
    WHEN EXISTS (SELECT 1 FROM jsonb_object_keys(p_vw) k WHERE k NOT IN ('key','in')) THEN false
    WHEN jsonb_typeof(p_vw->'key') <> 'string' THEN false
    WHEN COALESCE(p_vw->>'key','') !~ '^[a-z][a-z0-9_]{1,63}$' THEN false
    WHEN jsonb_typeof(p_vw->'in') <> 'array' THEN false
    WHEN jsonb_array_length(p_vw->'in') < 1 OR jsonb_array_length(p_vw->'in') > 8 THEN false
    WHEN EXISTS (SELECT 1 FROM jsonb_array_elements(p_vw->'in') e
                  WHERE jsonb_typeof(e.value) <> 'string'
                     OR btrim(e.value #>> '{}') = '') THEN false
    ELSE true
  END;
$$;

REVOKE ALL ON FUNCTION public.attr_visible_when_ok(jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.attr_visible_when_ok(jsonb) TO authenticated;
GRANT ALL ON FUNCTION public.attr_visible_when_ok(jsonb) TO service_role;

CREATE OR REPLACE FUNCTION public.attr_visible_when_met(p_attrs jsonb, p_prior jsonb, p_vw jsonb)
RETURNS boolean
LANGUAGE sql
IMMUTABLE
SET search_path = public
AS $$
  SELECT CASE
    WHEN p_vw IS NULL OR jsonb_typeof(p_vw) = 'null' THEN true
    ELSE EXISTS (
      SELECT 1
        FROM (SELECT COALESCE(p_attrs -> (p_vw->>'key'), p_prior -> (p_vw->>'key')) AS val) x,
             jsonb_array_elements_text(p_vw->'in') AS t(v)
       WHERE x.val IS NOT NULL
         AND ((jsonb_typeof(x.val) = 'string' AND (x.val #>> '{}') = t.v)
           OR (jsonb_typeof(x.val) = 'array'  AND x.val @> to_jsonb(t.v))
           OR (jsonb_typeof(x.val) = 'object' AND (x.val->>'value') = t.v)))
  END;
$$;

REVOKE ALL ON FUNCTION public.attr_visible_when_met(jsonb, jsonb, jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.attr_visible_when_met(jsonb, jsonb, jsonb) TO authenticated;
GRANT ALL ON FUNCTION public.attr_visible_when_met(jsonb, jsonb, jsonb) TO service_role;

CREATE OR REPLACE FUNCTION public.attr_link_cells_refusal(
  p_category_id  uuid,
  p_attribute_id uuid,
  p_allowed      text[],
  p_default      jsonb,
  p_visible_when jsonb
)
RETURNS text
LANGUAGE plpgsql
STABLE
SET search_path = public
AS $$
DECLARE
  v_self   text;
  v_type   text;
  v_opts   jsonb;
  v_vals   text[];
  v_eff    text[];
  v_pool   text[];
  v_seg    text;
BEGIN
  SELECT a.attr_key, a.attr_type, a.options INTO v_self, v_type, v_opts
    FROM public.attributes a WHERE a.id = p_attribute_id;
  IF v_self IS NULL THEN
    RETURN 'admin.attributes.error.notFound';
  END IF;

  SELECT COALESCE(array_agg(o->>'value'), ARRAY[]::text[]) INTO v_vals
    FROM jsonb_array_elements(public.attr_option_norm(v_opts)) o;

  ---------------------------------------------------------- allowed_options
  IF p_allowed IS NOT NULL THEN
    IF COALESCE(v_type,'') NOT IN ('single_select','multi_select') THEN
      RETURN 'badAllowedOption:typeNotSelect';
    END IF;
    IF COALESCE(array_length(p_allowed, 1), 0) = 0 THEN
      RETURN 'badAllowedOption:empty';
    END IF;
    FOREACH v_seg IN ARRAY p_allowed
    LOOP
      IF NOT (v_seg = ANY (v_vals)) THEN
        RETURN 'badAllowedOption:' || v_seg;
      END IF;
    END LOOP;
  END IF;

  v_eff := COALESCE(p_allowed, v_vals);

  ------------------------------------------------------------ default_value
  IF p_default IS NOT NULL AND jsonb_typeof(p_default) <> 'null' THEN
    CASE COALESCE(v_type,'')
      WHEN 'number' THEN
        IF jsonb_typeof(p_default) <> 'number' THEN RETURN 'badDefault:notANumber'; END IF;
      WHEN 'boolean' THEN
        IF jsonb_typeof(p_default) <> 'boolean' THEN RETURN 'badDefault:notABoolean'; END IF;
      WHEN 'date' THEN
        IF jsonb_typeof(p_default) <> 'string'
           OR (p_default #>> '{}') !~ '^[0-9]{4}-[0-9]{2}-[0-9]{2}$' THEN
          RETURN 'badDefault:notADate';
        END IF;
      WHEN 'text' THEN
        IF jsonb_typeof(p_default) <> 'string' THEN RETURN 'badDefault:notText'; END IF;
      WHEN 'single_select' THEN
        IF jsonb_typeof(p_default) <> 'string' THEN RETURN 'badDefault:notAValue'; END IF;
        IF NOT ((p_default #>> '{}') = ANY (v_eff)) THEN
          RETURN 'badDefault:notInOptions:' || (p_default #>> '{}');
        END IF;
      WHEN 'multi_select' THEN
        IF jsonb_typeof(p_default) <> 'array' THEN RETURN 'badDefault:notAList'; END IF;
        FOR v_seg IN SELECT t.v FROM jsonb_array_elements_text(p_default) AS t(v)
        LOOP
          IF NOT (v_seg = ANY (v_eff)) THEN
            RETURN 'badDefault:notInOptions:' || v_seg;
          END IF;
        END LOOP;
      ELSE
        NULL;
    END CASE;
  END IF;

  ------------------------------------------------------------- visible_when
  IF p_visible_when IS NOT NULL AND jsonb_typeof(p_visible_when) <> 'null' THEN
    IF NOT public.attr_visible_when_ok(p_visible_when) THEN
      RETURN 'badVisibleWhen:badShape';
    END IF;
    IF (p_visible_when->>'key') = v_self THEN
      RETURN 'badVisibleWhen:self';
    END IF;
    IF NOT EXISTS (
      SELECT 1
        FROM public.effective_category_links(p_category_id) el
        JOIN public.attributes a2 ON a2.id = el.attribute_id
       WHERE a2.attr_key = (p_visible_when->>'key')) THEN
      RETURN 'badVisibleWhen:unknownSibling:' || (p_visible_when->>'key');
    END IF;
    SELECT COALESCE(array_agg(o.value->>'value'), ARRAY[]::text[]) INTO v_pool
      FROM public.attributes a2
      CROSS JOIN LATERAL jsonb_array_elements(public.attr_option_norm(a2.options)) o
     WHERE a2.attr_key = (p_visible_when->>'key');
    FOR v_seg IN SELECT t.v FROM jsonb_array_elements_text(p_visible_when->'in') AS t(v)
    LOOP
      IF NOT (v_seg = ANY (COALESCE(v_pool, ARRAY[]::text[]))) THEN
        RETURN 'badVisibleWhen:notInOptions:' || v_seg;
      END IF;
    END LOOP;
  END IF;

  RETURN NULL;
END $$;

REVOKE ALL ON FUNCTION public.attr_link_cells_refusal(uuid, uuid, text[], jsonb, jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.attr_link_cells_refusal(uuid, uuid, text[], jsonb, jsonb) TO authenticated;
GRANT ALL ON FUNCTION public.attr_link_cells_refusal(uuid, uuid, text[], jsonb, jsonb) TO service_role;

DO $readback$
DECLARE r record;
BEGIN
  FOR r IN
    SELECT p.proname AS name, p.proconfig::text AS config
      FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
     WHERE n.nspname = 'public'
       AND p.proname IN ('attr_visible_when_ok','attr_visible_when_met','attr_link_cells_refusal')
     ORDER BY 1
  LOOP
    RAISE NOTICE 'READ-BACK % config=%', r.name, r.config;
  END LOOP;
END $readback$;

INSERT INTO public.migration_marks (version)
VALUES ('20260920000006')
ON CONFLICT DO NOTHING;