-- DEC-050 L1 — ATTRIBUTE DEFINITION v2: SCHEMA AND DOORS.
--
-- Nine nullable definition cells on public.attributes, three optional option
-- keys (active, bounds, aliases), the retirement of the dead `range` type and
-- an Amharic option-coverage read. Additive throughout: every new door
-- parameter defaults to NULL, the planner reads a new cell only when the file
-- carries it, and no file format or screen changes until L2/L3.
--
-- INC-183 law: every function below is re-declared WHOLE (the newest body,
-- changed only where DEC-050 names it), never patched by text anchor. Closers
-- are restated in-file; the file ends with definition and ACL read-backs.
--
-- Pass-2 spec: docs/governance/dec-050-spec.md (sha256 8428493f…).

/* ============================ 1. SINGLE SOURCES OF TRUTH ================== */

-- The preset allowlist. NEVER a free regex, never a contact-data preset.
CREATE OR REPLACE FUNCTION public.attr_preset_ok(p_preset text)
RETURNS boolean
LANGUAGE sql
IMMUTABLE
SET search_path TO 'public'
AS $function$
  SELECT CASE
    WHEN p_preset IS NULL THEN true
    WHEN p_preset IN ('vin', 'plate-et') THEN true
    WHEN p_preset ~ '^digits:[0-9]{1,2}$'
      THEN (split_part(p_preset, ':', 2))::int BETWEEN 1 AND 64
    WHEN p_preset ~ '^free:[0-9]{1,4}$'
      THEN (split_part(p_preset, ':', 2))::int BETWEEN 1 AND 1000
    WHEN p_preset ~ '^alnum:[0-9]{1,2}-[0-9]{1,2}$'
      THEN (split_part(split_part(p_preset, ':', 2), '-', 1))::int BETWEEN 1 AND 64
       AND (split_part(split_part(p_preset, ':', 2), '-', 2))::int BETWEEN 1 AND 64
       AND (split_part(split_part(p_preset, ':', 2), '-', 1))::int
           <= (split_part(split_part(p_preset, ':', 2), '-', 2))::int
    ELSE false
  END;
$function$;

REVOKE ALL ON FUNCTION public.attr_preset_ok(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.attr_preset_ok(text) TO authenticated;
GRANT ALL ON FUNCTION public.attr_preset_ok(text) TO service_role;

-- A bound cell is a numeric literal or a year token.
CREATE OR REPLACE FUNCTION public.attr_bound_ok(p_bound text)
RETURNS boolean
LANGUAGE sql
IMMUTABLE
SET search_path TO 'public'
AS $function$
  SELECT p_bound IS NULL
      OR p_bound ~ '^-?[0-9]+(\.[0-9]+)?$'
      OR p_bound ~ '^year([+-][1-9][0-9]?)?$';
$function$;

REVOKE ALL ON FUNCTION public.attr_bound_ok(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.attr_bound_ok(text) TO authenticated;
GRANT ALL ON FUNCTION public.attr_bound_ok(text) TO service_role;

-- THE SINGLE RESOLVER. A literal is itself; `year`, `year+N`, `year-N` resolve
-- against the UTC calendar year; NULL stays NULL.
CREATE OR REPLACE FUNCTION public.attr_bound_value(p_bound text)
RETURNS numeric
LANGUAGE sql
STABLE
SET search_path TO 'public'
AS $function$
  SELECT CASE
    WHEN p_bound IS NULL THEN NULL
    WHEN p_bound ~ '^-?[0-9]+(\.[0-9]+)?$' THEN p_bound::numeric
    WHEN p_bound = 'year' THEN extract(year from (now() at time zone 'UTC'))::numeric
    WHEN p_bound ~ '^year[+-][1-9][0-9]?$'
      THEN extract(year from (now() at time zone 'UTC'))::numeric
           + (substring(p_bound from 5))::numeric
    ELSE NULL
  END;
$function$;

REVOKE ALL ON FUNCTION public.attr_bound_value(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.attr_bound_value(text) TO authenticated;
GRANT ALL ON FUNCTION public.attr_bound_value(text) TO service_role;

/* ============================ 2. THE NINE CELLS =========================== */

ALTER TABLE public.attributes
  ADD COLUMN IF NOT EXISTS unit         text,
  ADD COLUMN IF NOT EXISTS min_bound    text,
  ADD COLUMN IF NOT EXISTS max_bound    text,
  ADD COLUMN IF NOT EXISTS decimals     smallint,
  ADD COLUMN IF NOT EXISTS format       text,
  ADD COLUMN IF NOT EXISTS preset       text,
  ADD COLUMN IF NOT EXISTS max_length   integer,
  ADD COLUMN IF NOT EXISTS help_text_am text;

ALTER TABLE public.attributes
  DROP CONSTRAINT IF EXISTS attributes_unit_check,
  DROP CONSTRAINT IF EXISTS attributes_bounds_check,
  DROP CONSTRAINT IF EXISTS attributes_bounds_order_check,
  DROP CONSTRAINT IF EXISTS attributes_decimals_check,
  DROP CONSTRAINT IF EXISTS attributes_format_check,
  DROP CONSTRAINT IF EXISTS attributes_preset_check,
  DROP CONSTRAINT IF EXISTS attributes_max_length_check,
  DROP CONSTRAINT IF EXISTS attributes_help_text_check;

ALTER TABLE public.attributes
  ADD CONSTRAINT attributes_unit_check CHECK (
    unit IS NULL OR (attr_type = 'number' AND char_length(unit) BETWEEN 1 AND 16)),
  ADD CONSTRAINT attributes_bounds_check CHECK (
    (min_bound IS NULL OR (attr_type = 'number' AND public.attr_bound_ok(min_bound)))
    AND (max_bound IS NULL OR (attr_type = 'number' AND public.attr_bound_ok(max_bound)))),
  ADD CONSTRAINT attributes_bounds_order_check CHECK (
    min_bound IS NULL OR max_bound IS NULL
    OR min_bound !~ '^-?[0-9]+(\.[0-9]+)?$' OR max_bound !~ '^-?[0-9]+(\.[0-9]+)?$'
    OR min_bound::numeric <= max_bound::numeric),
  ADD CONSTRAINT attributes_decimals_check CHECK (
    decimals IS NULL
    OR (attr_type = 'number' AND decimals BETWEEN 0 AND 3
        AND (format IS DISTINCT FROM 'year' OR decimals = 0))),
  ADD CONSTRAINT attributes_format_check CHECK (
    format IS NULL OR (attr_type = 'number' AND format IN ('plain', 'year'))),
  ADD CONSTRAINT attributes_preset_check CHECK (
    preset IS NULL OR (attr_type = 'text' AND public.attr_preset_ok(preset))),
  ADD CONSTRAINT attributes_max_length_check CHECK (
    max_length IS NULL OR (attr_type = 'text' AND max_length BETWEEN 1 AND 1000)),
  ADD CONSTRAINT attributes_help_text_check CHECK (
    char_length(COALESCE(help_text_en, '')) <= 240
    AND char_length(COALESCE(help_text_am, '')) <= 240);

-- `range` RETIRED (censused: attributes_attr_type_check, zero rows carry it).
ALTER TABLE public.attributes DROP CONSTRAINT attributes_attr_type_check;
ALTER TABLE public.attributes
  ADD CONSTRAINT attributes_attr_type_check CHECK (
    attr_type = ANY (ARRAY['text','number','single_select','multi_select','boolean','date']));

/* ==================== 3. THE SHARED JUDGES (door + planner) =============== */

-- Every definition cell, judged once. Returns NULL when clean, otherwise
-- 'cell|reason|value' so a caller can name the cell and the value it refused.
CREATE OR REPLACE FUNCTION public.attr_cell_check(
  p_type text, p_unit text, p_min text, p_max text, p_decimals int,
  p_format text, p_preset text, p_max_length int, p_help_en text, p_help_am text)
RETURNS text
LANGUAGE plpgsql
IMMUTABLE
SET search_path TO 'public'
AS $function$
BEGIN
  IF p_unit IS NOT NULL THEN
    IF p_type IS DISTINCT FROM 'number' THEN RETURN 'unit|onlyNumber|' || p_unit; END IF;
    IF char_length(p_unit) < 1 OR char_length(p_unit) > 16 THEN RETURN 'unit|badLength|' || p_unit; END IF;
  END IF;

  IF p_min IS NOT NULL THEN
    IF p_type IS DISTINCT FROM 'number' THEN RETURN 'min_bound|onlyNumber|' || p_min; END IF;
    IF NOT public.attr_bound_ok(p_min) THEN RETURN 'min_bound|badBound|' || p_min; END IF;
  END IF;
  IF p_max IS NOT NULL THEN
    IF p_type IS DISTINCT FROM 'number' THEN RETURN 'max_bound|onlyNumber|' || p_max; END IF;
    IF NOT public.attr_bound_ok(p_max) THEN RETURN 'max_bound|badBound|' || p_max; END IF;
  END IF;
  IF p_min ~ '^-?[0-9]+(\.[0-9]+)?$' AND p_max ~ '^-?[0-9]+(\.[0-9]+)?$'
     AND p_min::numeric > p_max::numeric THEN
    RETURN 'min_bound|minAboveMax|' || p_min || '>' || p_max;
  END IF;

  IF p_decimals IS NOT NULL THEN
    IF p_type IS DISTINCT FROM 'number' THEN RETURN 'decimals|onlyNumber|' || p_decimals::text; END IF;
    IF p_decimals < 0 OR p_decimals > 3 THEN RETURN 'decimals|outOfRange|' || p_decimals::text; END IF;
    IF p_format = 'year' AND p_decimals <> 0 THEN RETURN 'decimals|yearForcesZero|' || p_decimals::text; END IF;
  END IF;

  IF p_format IS NOT NULL THEN
    IF p_type IS DISTINCT FROM 'number' THEN RETURN 'format|onlyNumber|' || p_format; END IF;
    IF p_format NOT IN ('plain', 'year') THEN RETURN 'format|unknown|' || p_format; END IF;
  END IF;

  IF p_preset IS NOT NULL THEN
    IF p_type IS DISTINCT FROM 'text' THEN RETURN 'preset|onlyText|' || p_preset; END IF;
    IF NOT public.attr_preset_ok(p_preset) THEN RETURN 'preset|notAllowed|' || p_preset; END IF;
  END IF;

  IF p_max_length IS NOT NULL THEN
    IF p_type IS DISTINCT FROM 'text' THEN RETURN 'max_length|onlyText|' || p_max_length::text; END IF;
    IF p_max_length < 1 OR p_max_length > 1000 THEN RETURN 'max_length|outOfRange|' || p_max_length::text; END IF;
  END IF;

  IF char_length(COALESCE(p_help_en, '')) > 240 THEN
    RETURN 'help_text_en|tooLong|' || char_length(p_help_en)::text;
  END IF;
  IF char_length(COALESCE(p_help_am, '')) > 240 THEN
    RETURN 'help_text_am|tooLong|' || char_length(p_help_am)::text;
  END IF;

  RETURN NULL;
END $function$;

REVOKE ALL ON FUNCTION public.attr_cell_check(text, text, text, text, int, text, text, int, text, text)
  FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.attr_cell_check(text, text, text, text, int, text, text, int, text, text)
  TO authenticated;
GRANT ALL ON FUNCTION public.attr_cell_check(text, text, text, text, int, text, text, int, text, text)
  TO service_role;

-- THE STRICT OPTION SHAPE. Allowed keys exactly: value, label_en, label_am,
-- parent, active, bounds, aliases. Unknown keys are REFUSED, naming the key.
-- Co-linkage of a bounds target is judged by the caller (live links at the
-- door, the post-plan link set at the planner).
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
      IF v_k NOT IN ('value','label_en','label_am','parent','active','bounds','aliases') THEN
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
  END LOOP;

  RETURN NULL;
END $function$;

REVOKE ALL ON FUNCTION public.attr_option_shape(text, jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.attr_option_shape(text, jsonb) TO authenticated;
GRANT ALL ON FUNCTION public.attr_option_shape(text, jsonb) TO service_role;

-- The distinct bounds targets a definition's options name.
CREATE OR REPLACE FUNCTION public.attr_bounds_targets(p_options jsonb)
RETURNS text[]
LANGUAGE sql
IMMUTABLE
SET search_path TO 'public'
AS $function$
  SELECT COALESCE(array_agg(DISTINCT k), ARRAY[]::text[])
    FROM jsonb_array_elements(
           CASE WHEN jsonb_typeof(p_options) = 'array' THEN p_options ELSE '[]'::jsonb END) o
   CROSS JOIN LATERAL jsonb_object_keys(
           CASE WHEN jsonb_typeof(o.value) = 'object' AND jsonb_typeof(o.value->'bounds') = 'object'
                THEN o.value->'bounds' ELSE '{}'::jsonb END) k;
$function$;

REVOKE ALL ON FUNCTION public.attr_bounds_targets(jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.attr_bounds_targets(jsonb) TO authenticated;
GRANT ALL ON FUNCTION public.attr_bounds_targets(jsonb) TO service_role;

-- The categories a definition is DIRECTLY linked to after a plan is applied
-- (live links, minus the plan's unlinks, plus the plan's adds and changes).
-- Passing '[]' asks the LIVE question — that is what the door does.
CREATE OR REPLACE FUNCTION public.attr_postplan_cats(p_key text, p_links jsonb)
RETURNS uuid[]
LANGUAGE sql
STABLE
SET search_path TO 'public'
AS $function$
  SELECT COALESCE(array_agg(DISTINCT cid), ARRAY[]::uuid[]) FROM (
    SELECT l.category_id AS cid
      FROM public.category_attribute_links l
      JOIN public.attributes a ON a.id = l.attribute_id
     WHERE a.attr_key = p_key
       AND NOT EXISTS (
         SELECT 1 FROM jsonb_array_elements(COALESCE(p_links, '[]'::jsonb)) x
          WHERE x.value->>'key' = p_key AND x.value->>'change' = 'unlink'
            AND NULLIF(x.value->>'category_id', '')::uuid = l.category_id)
    UNION
    SELECT NULLIF(x.value->>'category_id', '')::uuid
      FROM jsonb_array_elements(COALESCE(p_links, '[]'::jsonb)) x
     WHERE x.value->>'key' = p_key
       AND x.value->>'change' IN ('add', 'change')
       AND NULLIF(x.value->>'category_id', '') IS NOT NULL
  ) s WHERE cid IS NOT NULL;
$function$;

REVOKE ALL ON FUNCTION public.attr_postplan_cats(text, jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.attr_postplan_cats(text, jsonb) TO authenticated;
GRANT ALL ON FUNCTION public.attr_postplan_cats(text, jsonb) TO service_role;

-- INH-1 — inheritance follows the PRIMARY lineage only: a link on a category
-- reaches every primary descendant of it.
CREATE OR REPLACE FUNCTION public.attr_cats_expand(p_cats uuid[])
RETURNS uuid[]
LANGUAGE sql
STABLE
SET search_path TO 'public'
AS $function$
  WITH RECURSIVE sub AS (
    SELECT c.id FROM public.categories c WHERE c.id = ANY (COALESCE(p_cats, ARRAY[]::uuid[]))
    UNION
    SELECT c.id FROM public.categories c JOIN sub s ON s.id = public.cat_primary_parent(c.id)
  )
  SELECT COALESCE(array_agg(id), ARRAY[]::uuid[]) FROM sub;
$function$;

REVOKE ALL ON FUNCTION public.attr_cats_expand(uuid[]) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.attr_cats_expand(uuid[]) TO authenticated;
GRANT ALL ON FUNCTION public.attr_cats_expand(uuid[]) TO service_role;

-- Change detection that SEES the new option keys. attr_option_norm is left
-- untouched: the export and the entity bundle depend on its exact shape.
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
                                     THEN x.value->>'parent' END, '')),
               'active',
                 CASE WHEN jsonb_typeof(x.value) = 'object' AND x.value ? 'active'
                      THEN x.value->'active' ELSE 'true'::jsonb END,
               'bounds',
                 CASE WHEN jsonb_typeof(x.value) = 'object' AND jsonb_typeof(x.value->'bounds') = 'object'
                      THEN x.value->'bounds' ELSE '{}'::jsonb END,
               'aliases',
                 CASE WHEN jsonb_typeof(x.value) = 'object' AND jsonb_typeof(x.value->'aliases') = 'array'
                      THEN x.value->'aliases' ELSE '[]'::jsonb END
             ) AS norm
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

/* ================= 4. THE UPSERT DOOR (whole re-declaration) ============== */

-- INC-183: the 7-parameter declaration is DROPPED and the door is re-declared
-- WHOLE. The eight new parameters all default to NULL, so every existing
-- 7-argument caller resolves to this declaration unchanged.
DROP FUNCTION IF EXISTS public.admin_upsert_attribute(uuid, text, text, text, jsonb, text, text);

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
  v_ocats uuid[]; v_tcats uuid[];
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

/* ================ 5. THE IMPORT PLANNER (whole re-declaration) ============ */

-- INC-183: the whole body, taken from 20260910053535 and changed only where
-- DEC-050 names it — the v2 cells are read, judged and diffed; the strict
-- option shape is enforced; `range` leaves the accepted type list; bounds
-- co-linkage is judged against the POST-PLAN link set.

CREATE OR REPLACE FUNCTION public.attr_import_plan(p_definitions jsonb, p_links jsonb, p_scope text)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_types      text[] := ARRAY['text','number','single_select','multi_select','boolean','date'];
  v_scope_id   uuid;
  v_scope_ids  uuid[] := NULL;
  v_defs       jsonb := '[]'::jsonb;
  v_out        jsonb;
  v_ordered    jsonb;
  v_pending    jsonb;
  v_next       jsonb;
  v_guard      int;
  v_lnks       jsonb := '[]'::jsonb;
  v_refusals   jsonb := '[]'::jsonb;
  v_seen_defs  text[] := ARRAY[]::text[];
  v_seen_lnks  text[] := ARRAY[]::text[];
  v_new_keys   text[] := ARRAY[]::text[];
  e            jsonb;
  v_row        int;
  v_key        text;
  v_action     text;
  v_type       text;
  v_raw        text;
  v_seg        text;
  v_piece      jsonb;
  v_options    jsonb;
  v_depends    text;
  v_entry      jsonb;
  v_option     jsonb;
  v_parent     text;
  v_parent_ok  boolean;
  v_dep_vals   text[];
  v_att        public.attributes%ROWTYPE;
  v_name       text;
  v_change     text;
  v_cat        public.categories%ROWTYPE;
  v_origin     text;
  v_req        boolean;
  v_filt       boolean;
  v_rank       int;
  v_link       public.category_attribute_links%ROWTYPE;
  v_attr_id    uuid;
  v_bad        boolean;
  v_cats       text[];
  v_label_am   text;
  v_cur_am     text;
  v_am_change  boolean;
  v_pentry     jsonb;
  v_ptype      text;
  v_popts      jsonb;
  v_walk       text;
  v_step       text;
  v_hops       int;
  v_reason     text;
  v_cur_dep    text;
  v_dep_change boolean;
  -- IE-5 — the file's own unlinks, keyed '<category slug>|<attribute key>'.
  v_unlinks    text[] := ARRAY[]::text[];
  -- IE-6 — is this links row a DIRECT row, or an inherited echo?
  v_direct     boolean;
  -- IE-8 — the existing key a brand-new key would silently rename.
  v_rename     text;
  -- DEC-050 — definition v2 cells and the strict option shape.
  v_cells      jsonb;
  v_cell       text;
  v_calias     text;
  v_cellval    text;
  v_cell_change boolean;
  v_bad_cell   text;
  v_optmsg     text;
  v_unit       text;
  v_minb       text;
  v_maxb       text;
  v_fmt        text;
  v_pset       text;
  v_help_en    text;
  v_help_am    text;
  v_dec        int;
  v_maxlen     int;
  v_ocats      uuid[];
  v_tcats      uuid[];
  v_detail     text;
BEGIN
  IF p_scope IS NOT NULL AND btrim(p_scope) <> '' THEN
    SELECT id INTO v_scope_id FROM public.categories WHERE slug = btrim(p_scope);
    IF v_scope_id IS NULL THEN
      RAISE EXCEPTION 'unknown category scope';
    END IF;
    WITH RECURSIVE sub AS (
      SELECT v_scope_id AS id
      UNION
      SELECT c.id FROM public.categories c JOIN sub s ON s.id = public.cat_primary_parent(c.id)
    )
    SELECT array_agg(id) INTO v_scope_ids FROM sub;
  END IF;

  -- IE-5 — the file's unlinks are read BEFORE the definition verdicts, so a
  -- delete is judged against the links that SURVIVE this same pass.
  SELECT COALESCE(array_agg(c.slug || '|' || btrim(COALESCE(x.value->>'attribute_key', ''))), ARRAY[]::text[])
    INTO v_unlinks
    FROM jsonb_array_elements(COALESCE(p_links, '[]'::jsonb)) x
    JOIN public.categories c ON c.slug = btrim(COALESCE(x.value->>'category_slug', ''))
   WHERE lower(btrim(COALESCE(x.value->>'action', ''))) = 'unlink'
     AND (v_scope_ids IS NULL OR c.id = ANY (v_scope_ids))
     AND btrim(COALESCE(x.value->>'origin', '')) IN ('', c.slug);

  ---------------------------------------------------------------- definitions
  FOR e IN SELECT value FROM jsonb_array_elements(COALESCE(p_definitions, '[]'::jsonb))
  LOOP
    v_row := COALESCE((e->>'row')::int, 0);
    v_key := btrim(COALESCE(e->>'attribute_key', ''));
    v_action := lower(COALESCE(NULLIF(btrim(COALESCE(e->>'action','')), ''), 'upsert'));

    IF v_key = '' THEN
      v_refusals := v_refusals || jsonb_build_object('file','definitions','row',v_row,'key','','reason','missingKey');
      CONTINUE;
    END IF;
    IF v_key = ANY (v_seen_defs) THEN
      v_refusals := v_refusals || jsonb_build_object('file','definitions','row',v_row,'key',v_key,'reason','duplicateKey');
      CONTINUE;
    END IF;
    v_seen_defs := v_seen_defs || v_key;

    IF v_action NOT IN ('upsert','delete') THEN
      v_refusals := v_refusals || jsonb_build_object('file','definitions','row',v_row,'key',v_key,'reason','badAction');
      CONTINUE;
    END IF;

    SELECT * INTO v_att FROM public.attributes WHERE attr_key = v_key;

    IF v_action = 'delete' THEN
      IF v_att.id IS NULL THEN
        v_defs := v_defs || jsonb_build_object('row',v_row,'key',v_key,'action','delete','change','none');
        CONTINUE;
      END IF;
      -- IE-4b — the refusal NAMES the categories that hold the attribute down.
      -- IE-5 — a link this SAME FILE unlinks holds nothing down.
      SELECT array_agg(c.slug ORDER BY c.slug) INTO v_cats
        FROM public.category_attribute_links l
        JOIN public.categories c ON c.id = l.category_id
       WHERE l.attribute_id = v_att.id
         AND NOT ((c.slug || '|' || v_key) = ANY (v_unlinks));
      IF COALESCE(array_length(v_cats, 1), 0) > 0 THEN
        v_refusals := v_refusals || jsonb_build_object(
          'file','definitions','row',v_row,'key',v_key,'reason','blastRadius',
          'detail', array_to_string(COALESCE(v_cats, ARRAY[]::text[]), ', '),
          'categories', to_jsonb(COALESCE(v_cats, ARRAY[]::text[])));
        CONTINUE;
      END IF;
      -- DEC-045b — a parent with dependents is held down by them, too.
      IF EXISTS (SELECT 1 FROM public.attributes d WHERE d.depends_on = v_att.id) THEN
        SELECT array_agg(d.attr_key ORDER BY d.attr_key) INTO v_cats
          FROM public.attributes d WHERE d.depends_on = v_att.id;
        v_refusals := v_refusals || jsonb_build_object(
          'file','definitions','row',v_row,'key',v_key,'reason','hasDependents',
          'detail', array_to_string(COALESCE(v_cats, ARRAY[]::text[]), ', '));
        CONTINUE;
      END IF;
      v_defs := v_defs || jsonb_build_object('row',v_row,'key',v_key,'action','delete','change','delete','id',v_att.id);
      CONTINUE;
    END IF;

    v_type := lower(btrim(COALESCE(e->>'type','')));
    IF NOT (v_type = ANY (v_types)) THEN
      v_refusals := v_refusals || jsonb_build_object('file','definitions','row',v_row,'key',v_key,'reason','unknownType');
      CONTINUE;
    END IF;

    v_raw := COALESCE(e->>'options', '');
    v_options := NULL;
    v_bad := false;
    IF btrim(v_raw) <> '' THEN
      IF left(btrim(v_raw), 1) = '[' THEN
        v_options := public.attr_json_or_null(btrim(v_raw));
        IF v_options IS NULL OR jsonb_typeof(v_options) <> 'array' THEN v_bad := true; END IF;
      ELSE
        v_options := '[]'::jsonb;
        FOREACH v_seg IN ARRAY string_to_array(v_raw, '|')
        LOOP
          CONTINUE WHEN btrim(v_seg) = '';
          IF left(btrim(v_seg), 1) = '{' THEN
            v_piece := public.attr_json_or_null(btrim(v_seg));
            IF v_piece IS NULL OR jsonb_typeof(v_piece) <> 'object' THEN
              v_bad := true;
              EXIT;
            END IF;
            v_options := v_options || jsonb_build_array(v_piece);
          ELSE
            v_options := v_options || jsonb_build_array(to_jsonb(v_seg));
          END IF;
        END LOOP;
        IF NOT v_bad AND jsonb_array_length(v_options) = 0 THEN v_options := NULL; END IF;
      END IF;
    END IF;
    IF v_bad THEN
      v_refusals := v_refusals || jsonb_build_object('file','definitions','row',v_row,'key',v_key,'reason','malformedOptions');
      CONTINUE;
    END IF;

    -- DEC-045b — the dependency is a COLUMN of its own. The legacy
    -- `{"depends_on": "<key>"}` option entry is still read (files authored
    -- before this landing), and never survives into the stored options.
    v_depends := btrim(COALESCE(e->>'depends_on',''));
    IF v_options IS NOT NULL THEN
      v_out := '[]'::jsonb;
      FOR v_entry IN SELECT value FROM jsonb_array_elements(v_options) LOOP
        IF jsonb_typeof(v_entry) = 'object' AND v_entry ? 'depends_on' AND NOT (v_entry ? 'value') THEN
          IF v_depends = '' THEN v_depends := btrim(COALESCE(v_entry->>'depends_on','')); END IF;
          CONTINUE;
        END IF;
        IF jsonb_typeof(v_entry) = 'object' AND NOT (v_entry ? 'value') THEN
          v_bad := true;
        ELSIF jsonb_typeof(v_entry) NOT IN ('object','string') THEN
          v_bad := true;
        END IF;
        v_out := v_out || jsonb_build_array(v_entry);
      END LOOP;
      v_options := CASE WHEN jsonb_array_length(v_out) = 0 THEN NULL ELSE v_out END;
    END IF;
    IF v_bad THEN
      v_refusals := v_refusals || jsonb_build_object('file','definitions','row',v_row,'key',v_key,'reason','malformedOptions');
      CONTINUE;
    END IF;

    -- DEC-050 — THE STRICT OPTION SHAPE. An unknown key, a non-boolean
    -- `active`, a bad alias or a malformed `bounds` is a refusal that names
    -- the definition, the option value and the reason. Never a silent drop.
    v_optmsg := public.attr_option_shape(v_key, v_options);
    IF v_optmsg IS NOT NULL THEN
      v_refusals := v_refusals || jsonb_build_object(
        'file','definitions','row',v_row,'key',v_key,'reason','badOption','detail',v_optmsg);
      CONTINUE;
    END IF;

    v_name := COALESCE(NULLIF(btrim(COALESCE(e->>'label_en','')), ''), v_key);

    -- IE-4b — label_am. The live value is read exactly as the EXPORT writes it
    -- (approved translation > the legacy column), so a file taken from the
    -- export is silent, and an EMPTY cell is never a change.
    v_label_am := btrim(COALESCE(e->>'label_am',''));
    v_cur_am := '';
    IF v_att.id IS NOT NULL THEN
      SELECT COALESCE(
               (SELECT t.value FROM public.entity_translations t
                 WHERE t.entity_type = 'attribute' AND t.entity_id = v_att.id
                   AND t.field = 'label' AND t.lang_code = 'am' AND t.status = 'approved'),
               v_att.name_am, '')
        INTO v_cur_am;
    END IF;
    v_am_change := v_label_am <> '' AND v_label_am IS DISTINCT FROM btrim(COALESCE(v_cur_am,''));

    -- DEC-050 — THE DEFINITION v2 CELLS. ABSENT = no change; a PRESENT and
    -- EMPTY cell clears it. Every present cell is judged by the door's judge,
    -- and every present cell is diffed (INC-187: nothing is silently dropped).
    v_cells := '{}'::jsonb;
    v_cell_change := false;
    v_bad_cell := NULL;
    FOREACH v_cell IN ARRAY ARRAY['unit','min_bound','max_bound','decimals','format',
                                  'preset','max_length','help_text_en','help_text_am']
    LOOP
      v_calias := CASE v_cell WHEN 'min_bound' THEN 'min'
                              WHEN 'max_bound' THEN 'max' ELSE v_cell END;
      CONTINUE WHEN NOT (e ? v_cell) AND NOT (e ? v_calias);
      v_cellval := NULLIF(btrim(COALESCE(e->>v_cell, e->>v_calias, '')), '');
      v_cells := v_cells || jsonb_build_object(
        v_cell, CASE WHEN v_cellval IS NULL THEN 'null'::jsonb ELSE to_jsonb(v_cellval) END);
    END LOOP;

    v_unit    := CASE WHEN v_cells ? 'unit'         THEN v_cells->>'unit'         ELSE v_att.unit END;
    v_minb    := CASE WHEN v_cells ? 'min_bound'    THEN v_cells->>'min_bound'    ELSE v_att.min_bound END;
    v_maxb    := CASE WHEN v_cells ? 'max_bound'    THEN v_cells->>'max_bound'    ELSE v_att.max_bound END;
    v_fmt     := CASE WHEN v_cells ? 'format'       THEN v_cells->>'format'       ELSE v_att.format END;
    v_pset    := CASE WHEN v_cells ? 'preset'       THEN v_cells->>'preset'       ELSE v_att.preset END;
    v_help_en := CASE WHEN v_cells ? 'help_text_en' THEN v_cells->>'help_text_en' ELSE v_att.help_text_en END;
    v_help_am := CASE WHEN v_cells ? 'help_text_am' THEN v_cells->>'help_text_am' ELSE v_att.help_text_am END;

    v_dec := v_att.decimals;
    IF v_cells ? 'decimals' THEN
      BEGIN
        v_dec := NULLIF(v_cells->>'decimals', '')::int;
      EXCEPTION WHEN others THEN
        v_bad_cell := 'decimals|notANumber|' || COALESCE(v_cells->>'decimals', '');
      END;
    END IF;
    v_maxlen := v_att.max_length;
    IF v_bad_cell IS NULL AND v_cells ? 'max_length' THEN
      BEGIN
        v_maxlen := NULLIF(v_cells->>'max_length', '')::int;
      EXCEPTION WHEN others THEN
        v_bad_cell := 'max_length|notANumber|' || COALESCE(v_cells->>'max_length', '');
      END;
    END IF;

    IF v_bad_cell IS NULL THEN
      v_bad_cell := public.attr_cell_check(v_type, v_unit, v_minb, v_maxb, v_dec,
                                           v_fmt, v_pset, v_maxlen, v_help_en, v_help_am);
    END IF;

    IF v_bad_cell IS NOT NULL THEN
      v_refusals := v_refusals || jsonb_build_object(
        'file','definitions','row',v_row,'key',v_key,'reason','badCell',
        'cell', split_part(v_bad_cell, '|', 1),
        'detail', split_part(v_bad_cell, '|', 2),
        'value', split_part(v_bad_cell, '|', 3));
      CONTINUE;
    END IF;

    IF v_att.id IS NULL THEN
      v_cell_change := (v_cells <> '{}'::jsonb);
    ELSE
      v_cell_change :=
           ((v_cells ? 'unit')         AND v_unit    IS DISTINCT FROM v_att.unit)
        OR ((v_cells ? 'min_bound')    AND v_minb    IS DISTINCT FROM v_att.min_bound)
        OR ((v_cells ? 'max_bound')    AND v_maxb    IS DISTINCT FROM v_att.max_bound)
        OR ((v_cells ? 'decimals')     AND v_dec     IS DISTINCT FROM v_att.decimals::int)
        OR ((v_cells ? 'format')       AND v_fmt     IS DISTINCT FROM v_att.format)
        OR ((v_cells ? 'preset')       AND v_pset    IS DISTINCT FROM v_att.preset)
        OR ((v_cells ? 'max_length')   AND v_maxlen  IS DISTINCT FROM v_att.max_length)
        OR ((v_cells ? 'help_text_en') AND v_help_en IS DISTINCT FROM v_att.help_text_en)
        OR ((v_cells ? 'help_text_am') AND v_help_am IS DISTINCT FROM v_att.help_text_am);
    END IF;

    -- The verdict itself is deferred: only the WHOLE file can say whether a
    -- dependency names a definition this same file creates.
    v_defs := v_defs || jsonb_build_object(
      'row', v_row, 'key', v_key, 'action', 'upsert',
      'id', v_att.id, 'name_en', v_name,
      'attr_type', v_type, 'options', v_options,
      'depends_on', v_depends,
      'depends_col', (e ? 'depends_on') OR v_depends <> '',
      'am_change', v_am_change,
      'label_am', CASE WHEN v_label_am <> '' AND (v_att.id IS NULL OR v_am_change)
                       THEN v_label_am ELSE NULL END,
      'cells', v_cells, 'cell_change', v_cell_change);
  END LOOP;

  --------------------------------------------- DEC-045b: dependency verdicts
  v_out := '[]'::jsonb;
  FOR v_entry IN SELECT value FROM jsonb_array_elements(v_defs)
  LOOP
    IF v_entry->>'action' <> 'upsert' THEN
      v_out := v_out || jsonb_build_array(v_entry);
      CONTINUE;
    END IF;

    v_key := v_entry->>'key';
    v_row := COALESCE((v_entry->>'row')::int, 0);
    v_depends := btrim(COALESCE(v_entry->>'depends_on',''));
    v_options := CASE WHEN v_entry->'options' = 'null'::jsonb THEN NULL ELSE v_entry->'options' END;
    v_reason := NULL;
    v_dep_vals := NULL;

    IF v_depends <> '' THEN
      IF v_depends = v_key THEN
        v_reason := 'dependsSelf';
      ELSE
        SELECT x.value INTO v_pentry
          FROM jsonb_array_elements(v_defs) x
         WHERE x.value->>'key' = v_depends AND x.value->>'action' = 'upsert'
         LIMIT 1;
        v_ptype := NULL;
        v_popts := NULL;
        IF v_pentry IS NOT NULL THEN
          v_ptype := v_pentry->>'attr_type';
          v_popts := CASE WHEN v_pentry->'options' = 'null'::jsonb THEN NULL ELSE v_pentry->'options' END;
        ELSE
          SELECT a.attr_type, a.options INTO v_ptype, v_popts
            FROM public.attributes a WHERE a.attr_key = v_depends;
          IF v_ptype IS NULL THEN v_reason := 'unknownParent'; END IF;
        END IF;

        IF v_reason IS NULL AND v_ptype IS DISTINCT FROM 'single_select' THEN
          v_reason := 'dependsNotSelect';
        END IF;

        -- CYCLE: walk the chain the file would leave behind (file overlays DB).
        IF v_reason IS NULL THEN
          v_walk := v_depends;
          v_hops := 0;
          WHILE v_walk IS NOT NULL AND v_walk <> '' AND v_hops < 32 LOOP
            v_hops := v_hops + 1;
            SELECT btrim(COALESCE(x.value->>'depends_on','')) INTO v_step
              FROM jsonb_array_elements(v_defs) x
             WHERE x.value->>'key' = v_walk AND x.value->>'action' = 'upsert'
             LIMIT 1;
            IF NOT FOUND THEN
              SELECT COALESCE((SELECT p.attr_key FROM public.attributes p WHERE p.id = a.depends_on), '')
                INTO v_step FROM public.attributes a WHERE a.attr_key = v_walk;
            END IF;
            EXIT WHEN v_step IS NULL OR v_step = '';
            IF v_step = v_key THEN
              v_reason := 'dependsCycle';
              EXIT;
            END IF;
            v_walk := v_step;
          END LOOP;
        END IF;

        -- AT-25's law: every `parent` names a VALUE of the parent definition.
        IF v_reason IS NULL THEN
          SELECT array_agg(COALESCE(x.value->>'value', trim(both '"' from x.value::text)))
            INTO v_dep_vals
            FROM jsonb_array_elements(COALESCE(v_popts, '[]'::jsonb)) x
           WHERE NOT (jsonb_typeof(x.value) = 'object' AND NOT (x.value ? 'value'));
          v_parent_ok := true;
          FOR v_option IN SELECT value FROM jsonb_array_elements(COALESCE(v_options, '[]'::jsonb)) LOOP
            IF jsonb_typeof(v_option) = 'object'
               AND btrim(COALESCE(v_option->>'parent','')) <> '' THEN
              v_parent := btrim(v_option->>'parent');
              IF v_dep_vals IS NULL OR NOT (v_parent = ANY (v_dep_vals)) THEN
                v_parent_ok := false;
              END IF;
            END IF;
          END LOOP;
          IF NOT v_parent_ok THEN v_reason := 'badParent'; END IF;
        END IF;
      END IF;
    ELSE
      -- A `parent` without a dependency has nothing to be a parent of.
      IF EXISTS (
        SELECT 1 FROM jsonb_array_elements(COALESCE(v_options, '[]'::jsonb)) x
         WHERE jsonb_typeof(x.value) = 'object' AND x.value ? 'parent'
           AND btrim(COALESCE(x.value->>'parent','')) <> ''
      ) THEN
        v_reason := 'badParent';
      END IF;
    END IF;

    IF v_reason IS NOT NULL THEN
      v_refusals := v_refusals || jsonb_build_object(
        'file','definitions','row',v_row,'key',v_key,'reason',v_reason,'detail',v_depends);
      CONTINUE;
    END IF;

    -- THE VERDICT, dependency included.
    SELECT * INTO v_att FROM public.attributes WHERE attr_key = v_key;
    v_cur_dep := NULL;
    IF v_att.id IS NOT NULL THEN
      SELECT COALESCE((SELECT p.attr_key FROM public.attributes p WHERE p.id = v_att.depends_on), '')
        INTO v_cur_dep;
    END IF;
    v_dep_change := COALESCE((v_entry->>'depends_col')::boolean, false)
                    AND COALESCE(v_cur_dep,'') IS DISTINCT FROM v_depends;

    IF v_att.id IS NULL THEN
      -- IE-8 — RENAME DETECTOR. A new key whose label_en + type + options match
      -- a definition ABSENT from this file is a renamed identity, not an add.
      SELECT a.attr_key INTO v_rename
        FROM public.attributes a
       WHERE a.attr_key <> v_key
         AND NOT (a.attr_key = ANY (v_seen_defs))
         AND btrim(COALESCE(a.name_en, '')) = COALESCE(v_entry->>'name_en', '')
         AND a.attr_type = COALESCE(v_entry->>'attr_type', '')
         AND public.attr_option_norm(a.options) IS NOT DISTINCT FROM public.attr_option_norm(v_options)
       ORDER BY a.attr_key
       LIMIT 1;
      IF v_rename IS NOT NULL THEN
        v_refusals := v_refusals || jsonb_build_object(
          'file','definitions','row',v_row,'key',v_key,
          'reason','keyRename','detail',v_rename);
        CONTINUE;
      END IF;
      v_change := 'add';
    ELSIF btrim(COALESCE(v_att.name_en,'')) IS DISTINCT FROM (v_entry->>'name_en')
       OR v_att.attr_type IS DISTINCT FROM (v_entry->>'attr_type')
       OR public.attr_option_norm(v_att.options) IS DISTINCT FROM public.attr_option_norm(v_options)
       OR public.attr_option_norm_v2(v_att.options) IS DISTINCT FROM public.attr_option_norm_v2(v_options)
       OR COALESCE((v_entry->>'am_change')::boolean, false)
       OR COALESCE((v_entry->>'cell_change')::boolean, false)
       OR v_dep_change THEN
      v_change := 'change';
    ELSE
      v_change := 'none';
    END IF;

    v_out := v_out || jsonb_build_array(v_entry || jsonb_build_object('change', v_change));
  END LOOP;
  v_defs := v_out;

  ------------------------------------- DEC-045b: PARENT BEFORE DEPENDENT
  v_ordered := '[]'::jsonb;
  v_pending := v_defs;
  v_guard := 0;
  WHILE jsonb_array_length(v_pending) > 0 AND v_guard < 64 LOOP
    v_guard := v_guard + 1;
    v_next := '[]'::jsonb;
    FOR v_entry IN SELECT value FROM jsonb_array_elements(v_pending) LOOP
      v_depends := btrim(COALESCE(v_entry->>'depends_on',''));
      IF v_depends = '' OR NOT EXISTS (
        SELECT 1 FROM jsonb_array_elements(v_pending) x
         WHERE x.value->>'key' = v_depends AND x.value->>'key' <> v_entry->>'key'
      ) THEN
        v_ordered := v_ordered || jsonb_build_array(v_entry);
      ELSE
        v_next := v_next || jsonb_build_array(v_entry);
      END IF;
    END LOOP;
    EXIT WHEN jsonb_array_length(v_next) = jsonb_array_length(v_pending);
    v_pending := v_next;
  END LOOP;
  v_defs := v_ordered || v_pending;

  -- Only a SURVIVING add lets a link name an attribute that does not exist yet.
  SELECT COALESCE(array_agg(x.value->>'key'), ARRAY[]::text[]) INTO v_new_keys
    FROM jsonb_array_elements(v_defs) x WHERE x.value->>'change' = 'add';

  --------------------------------------------------------------------- links
  FOR e IN SELECT value FROM jsonb_array_elements(COALESCE(p_links, '[]'::jsonb))
  LOOP
    v_row := COALESCE((e->>'row')::int, 0);
    v_key := btrim(COALESCE(e->>'attribute_key',''));
    v_action := lower(COALESCE(NULLIF(btrim(COALESCE(e->>'action','')), ''), 'upsert'));
    v_origin := btrim(COALESCE(e->>'origin',''));

    IF v_action NOT IN ('upsert','unlink') THEN
      v_refusals := v_refusals || jsonb_build_object('file','links','row',v_row,'key',v_key,'reason','badAction');
      CONTINUE;
    END IF;

    SELECT * INTO v_cat FROM public.categories WHERE slug = btrim(COALESCE(e->>'category_slug',''));
    IF v_cat.id IS NULL THEN
      v_refusals := v_refusals || jsonb_build_object('file','links','row',v_row,'key',v_key,'reason','unknownCategory');
      CONTINUE;
    END IF;

    IF v_scope_ids IS NOT NULL AND NOT (v_cat.id = ANY (v_scope_ids)) THEN
      v_refusals := v_refusals || jsonb_build_object('file','links','row',v_row,'key',v_key,'reason','outOfScope');
      CONTINUE;
    END IF;

    -- IE-6 (INC-180) — DIRECTNESS IS READ FIRST. An inherited ECHO row is
    -- read-only: it is neither counted as a duplicate nor allowed to make one,
    -- so a DIRECT row for the same category and key in the same file is
    -- accepted and becomes the NEAREST link. Only an attempt to UNLINK through
    -- an echo is refused — a category cannot unlink what it does not hold.
    v_direct := (v_origin = '' OR v_origin = v_cat.slug);
    IF NOT v_direct THEN
      IF v_action = 'unlink' THEN
        v_refusals := v_refusals || jsonb_build_object(
          'file','links','row',v_row,'key',v_key,'reason','inheritedRow','detail',v_origin);
      ELSE
        v_lnks := v_lnks || jsonb_build_object(
          'row',v_row,'key',v_key,'slug',v_cat.slug,'action','upsert','change','none');
      END IF;
      CONTINUE;
    END IF;

    IF (v_cat.slug || '|' || v_key) = ANY (v_seen_lnks) THEN
      v_refusals := v_refusals || jsonb_build_object('file','links','row',v_row,'key',v_key,'reason','duplicateKey');
      CONTINUE;
    END IF;
    v_seen_lnks := v_seen_lnks || (v_cat.slug || '|' || v_key);

    SELECT id INTO v_attr_id FROM public.attributes WHERE attr_key = v_key;
    IF v_attr_id IS NULL AND NOT (v_key = ANY (v_new_keys)) THEN
      v_refusals := v_refusals || jsonb_build_object('file','links','row',v_row,'key',v_key,'reason','unknownAttribute');
      CONTINUE;
    END IF;

    v_req := lower(btrim(COALESCE(e->>'is_required','false'))) IN ('true','t','1','yes');
    v_filt := lower(btrim(COALESCE(e->>'is_filterable','false'))) IN ('true','t','1','yes');
    v_rank := NULL;
    IF btrim(COALESCE(e->>'card_rank','')) <> '' THEN
      BEGIN
        v_rank := btrim(e->>'card_rank')::int;
      EXCEPTION WHEN others THEN
        v_rank := -1;
      END;
      IF v_rank IS NULL OR v_rank < 1 OR v_rank > 3 THEN
        v_refusals := v_refusals || jsonb_build_object('file','links','row',v_row,'key',v_key,'reason','badCardRank');
        CONTINUE;
      END IF;
    END IF;

    v_link := NULL;
    IF v_attr_id IS NOT NULL THEN
      SELECT * INTO v_link FROM public.category_attribute_links
       WHERE category_id = v_cat.id AND attribute_id = v_attr_id;
    END IF;

    IF v_action = 'unlink' THEN
      IF v_link.id IS NULL THEN
        v_lnks := v_lnks || jsonb_build_object('row',v_row,'key',v_key,'slug',v_cat.slug,'action','unlink','change','none');
      ELSE
        v_lnks := v_lnks || jsonb_build_object('row',v_row,'key',v_key,'slug',v_cat.slug,'action','unlink',
                                              'change','unlink','link_id',v_link.id,
                                              'category_id',v_cat.id,'attribute_id',v_attr_id);
      END IF;
      CONTINUE;
    END IF;

    IF v_link.id IS NULL THEN
      v_change := 'add';
    ELSIF v_link.is_required IS DISTINCT FROM v_req
       OR v_link.is_filterable IS DISTINCT FROM v_filt
       OR v_link.card_rank IS DISTINCT FROM v_rank THEN
      v_change := 'change';
    ELSE
      v_change := 'none';
    END IF;

    v_lnks := v_lnks || jsonb_build_object(
      'row',v_row,'key',v_key,'slug',v_cat.slug,'action','upsert','change',v_change,
      'link_id',v_link.id,'category_id',v_cat.id,'attribute_id',v_attr_id,
      'is_required',v_req,'is_filterable',v_filt,'card_rank',v_rank);
  END LOOP;

  ------------------------------------------- DEC-050: bounds co-linkage
  -- A bounds target is a NUMBER definition linked, directly or by inheritance,
  -- in EVERY category where the owner is linked AFTER this plan is applied.
  v_out := '[]'::jsonb;
  FOR v_entry IN SELECT value FROM jsonb_array_elements(v_defs)
  LOOP
    v_reason := NULL;
    v_detail := NULL;
    IF v_entry->>'action' = 'upsert'
       AND v_entry->'options' IS NOT NULL AND v_entry->'options' <> 'null'::jsonb THEN
      v_key := v_entry->>'key';
      v_row := COALESCE((v_entry->>'row')::int, 0);
      v_ocats := public.attr_postplan_cats(v_key, v_lnks);
      FOREACH v_step IN ARRAY public.attr_bounds_targets(v_entry->'options')
      LOOP
        v_ptype := NULL;
        SELECT x.value->>'attr_type' INTO v_ptype
          FROM jsonb_array_elements(v_defs) x
         WHERE x.value->>'key' = v_step AND x.value->>'action' = 'upsert'
         LIMIT 1;
        IF v_ptype IS NULL THEN
          SELECT a.attr_type INTO v_ptype FROM public.attributes a WHERE a.attr_key = v_step;
        END IF;
        IF v_ptype IS DISTINCT FROM 'number' THEN
          v_reason := 'boundsTargetNotNumber';
          v_detail := v_step;
          EXIT;
        END IF;
        v_tcats := public.attr_cats_expand(public.attr_postplan_cats(v_step, v_lnks));
        IF EXISTS (SELECT 1 FROM unnest(v_ocats) c WHERE NOT (c = ANY (v_tcats))) THEN
          v_reason := 'boundsTargetNotColinked';
          v_detail := v_step;
          EXIT;
        END IF;
      END LOOP;
    END IF;

    IF v_reason IS NOT NULL THEN
      v_refusals := v_refusals || jsonb_build_object(
        'file','definitions','row',v_row,'key',v_key,'reason',v_reason,'detail',v_detail);
      CONTINUE;
    END IF;
    v_out := v_out || jsonb_build_array(v_entry);
  END LOOP;
  v_defs := v_out;

  RETURN jsonb_build_object(
    'definitions', v_defs,
    'links', v_lnks,
    'refusals', v_refusals,
    'counts', jsonb_build_object(
      'adds', (SELECT count(*) FROM jsonb_array_elements(v_defs) x WHERE x.value->>'change' = 'add')
            + (SELECT count(*) FROM jsonb_array_elements(v_lnks) x WHERE x.value->>'change' = 'add'),
      'changes', (SELECT count(*) FROM jsonb_array_elements(v_defs) x WHERE x.value->>'change' = 'change')
               + (SELECT count(*) FROM jsonb_array_elements(v_lnks) x WHERE x.value->>'change' = 'change'),
      'unlinks', (SELECT count(*) FROM jsonb_array_elements(v_lnks) x WHERE x.value->>'change' = 'unlink'),
      'deletes', (SELECT count(*) FROM jsonb_array_elements(v_defs) x WHERE x.value->>'change' = 'delete'),
      'unchanged', (SELECT count(*) FROM jsonb_array_elements(v_defs) x WHERE x.value->>'change' = 'none')
                 + (SELECT count(*) FROM jsonb_array_elements(v_lnks) x WHERE x.value->>'change' = 'none'),
      'refusals', jsonb_array_length(v_refusals)));
END $function$;

-- Closers restated in-file. The planner's ACL is UNCHANGED (not widened, not
-- narrowed): EXECUTE for authenticated exactly as it stands today.
REVOKE ALL ON FUNCTION public.attr_import_plan(jsonb, jsonb, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.attr_import_plan(jsonb, jsonb, text) TO authenticated;
GRANT ALL ON FUNCTION public.attr_import_plan(jsonb, jsonb, text) TO service_role;

/* ============ 6. COMMIT AND UNDO (whole re-declarations, INC-183) ========= */

-- The bodies from 20260909035656, changed only where DEC-050 names them: the
-- definition snapshot carries the nine cells, the commit applies every present
-- cell, and the undo restores every cell from the captured prev.
--
-- DEVIATION, stated plainly: the commit keeps writing the row directly rather
-- than calling admin_upsert_attribute. The door's gate is categories:update
-- while the import gate is categories:import; routing the commit through the
-- door would silently demand a second permission of every importer. The cells
-- written here are exactly the cells the door writes.

CREATE OR REPLACE FUNCTION public.admin_commit_attribute_import(
  p_definitions jsonb, p_links jsonb, p_scope text DEFAULT NULL::text, p_digest text DEFAULT NULL::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_plan    jsonb;
  v_batch   uuid := gen_random_uuid();
  v_item    jsonb;
  v_prev    jsonb;
  v_post    jsonb;
  v_id      uuid;
  v_order   int;
  v_applied int := 0;
  v_am      jsonb;
  v_dep     uuid;
  v_cells   jsonb;
BEGIN
  -- (1) GATES
  IF NOT public.has_permission(auth.uid(), 'categories', 'import') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('categories', 'import');

  IF NOT pg_try_advisory_xact_lock(hashtext('attribute-import'), hashtext(auth.uid()::text)) THEN
    RAISE EXCEPTION 'import already running';
  END IF;

  v_plan := public.attr_import_plan(p_definitions, p_links, p_scope);

  ------------------------------------------- PHASE 1 — DEFINITION UPSERTS
  -- DEC-045b — the planner ordered the definitions PARENT BEFORE DEPENDENT.
  FOR v_item IN SELECT value FROM jsonb_array_elements(v_plan->'definitions')
  LOOP
    CONTINUE WHEN v_item->>'change' IN ('none', 'delete');

    v_id := NULLIF(v_item->>'id','')::uuid;
    v_prev := NULL;
    IF v_id IS NOT NULL THEN
      SELECT jsonb_build_object('attr_key',a.attr_key,'name_en',a.name_en,'attr_type',a.attr_type,
                                'options',a.options,'help_text_en',a.help_text_en,
                                'unit',a.unit,'min_bound',a.min_bound,'max_bound',a.max_bound,
                                'decimals',a.decimals,'format',a.format,'preset',a.preset,
                                'max_length',a.max_length,'help_text_am',a.help_text_am,
                                'depends_on',
                                COALESCE((SELECT p.attr_key FROM public.attributes p WHERE p.id = a.depends_on), ''))
        INTO v_prev FROM public.attributes a WHERE a.id = v_id;
      v_am := NULL;
      SELECT jsonb_build_object('value', t.value, 'status', t.status, 'machine', t.machine)
        INTO v_am
        FROM public.entity_translations t
       WHERE t.entity_type = 'attribute' AND t.entity_id = v_id
         AND t.field = 'label' AND t.lang_code = 'am';
      v_prev := v_prev || jsonb_build_object('am_state', COALESCE(v_am, 'null'::jsonb));
    END IF;

    IF v_id IS NULL THEN
      INSERT INTO public.attributes (attr_key, name_en, attr_type, options)
      VALUES (v_item->>'key', v_item->>'name_en', v_item->>'attr_type',
              CASE WHEN v_item->'options' = 'null'::jsonb THEN NULL ELSE v_item->'options' END)
      RETURNING id INTO v_id;
    ELSE
      UPDATE public.attributes
         SET name_en = v_item->>'name_en',
             attr_type = v_item->>'attr_type',
             options = CASE WHEN v_item->'options' = 'null'::jsonb THEN NULL ELSE v_item->'options' END,
             updated_at = now()
       WHERE id = v_id;
    END IF;

    -- DEC-050 — every PRESENT v2 cell is applied; an ABSENT cell is left
    -- alone. INC-187's lesson: what the planner diffed, the commit applies.
    v_cells := COALESCE(v_item->'cells', '{}'::jsonb);
    IF v_cells <> '{}'::jsonb THEN
      UPDATE public.attributes a
         SET unit         = CASE WHEN v_cells ? 'unit'         THEN NULLIF(v_cells->>'unit','')         ELSE a.unit END,
             min_bound    = CASE WHEN v_cells ? 'min_bound'    THEN NULLIF(v_cells->>'min_bound','')    ELSE a.min_bound END,
             max_bound    = CASE WHEN v_cells ? 'max_bound'    THEN NULLIF(v_cells->>'max_bound','')    ELSE a.max_bound END,
             decimals     = CASE WHEN v_cells ? 'decimals'     THEN NULLIF(v_cells->>'decimals','')::smallint  ELSE a.decimals END,
             format       = CASE WHEN v_cells ? 'format'       THEN NULLIF(v_cells->>'format','')       ELSE a.format END,
             preset       = CASE WHEN v_cells ? 'preset'       THEN NULLIF(v_cells->>'preset','')       ELSE a.preset END,
             max_length   = CASE WHEN v_cells ? 'max_length'   THEN NULLIF(v_cells->>'max_length','')::integer ELSE a.max_length END,
             help_text_en = CASE WHEN v_cells ? 'help_text_en' THEN NULLIF(v_cells->>'help_text_en','') ELSE a.help_text_en END,
             help_text_am = CASE WHEN v_cells ? 'help_text_am' THEN NULLIF(v_cells->>'help_text_am','') ELSE a.help_text_am END,
             updated_at   = now()
       WHERE a.id = v_id;
    END IF;

    IF COALESCE((v_item->>'depends_col')::boolean, false) THEN
      SELECT p.id INTO v_dep FROM public.attributes p
       WHERE p.attr_key = NULLIF(btrim(COALESCE(v_item->>'depends_on','')), '');
      UPDATE public.attributes SET depends_on = v_dep, updated_at = now() WHERE id = v_id;
    END IF;

    IF btrim(COALESCE(v_item->>'label_am','')) <> '' THEN
      PERFORM public.admin_save_entity_translation('attribute', v_id, 'label', 'am',
                                                   btrim(v_item->>'label_am'));
    END IF;

    SELECT jsonb_build_object('attr_key',a.attr_key,'name_en',a.name_en,'attr_type',a.attr_type,
                              'options',a.options,'help_text_en',a.help_text_en,
                                'unit',a.unit,'min_bound',a.min_bound,'max_bound',a.max_bound,
                                'decimals',a.decimals,'format',a.format,'preset',a.preset,
                                'max_length',a.max_length,'help_text_am',a.help_text_am,
                              'depends_on',
                              COALESCE((SELECT p.attr_key FROM public.attributes p WHERE p.id = a.depends_on), ''))
      INTO v_post FROM public.attributes a WHERE a.id = v_id;

    INSERT INTO public.attribute_import_revisions
      (batch_id, kind, action, entity_key, prev, post, created_by)
    VALUES (v_batch, 'definition', v_item->>'action', v_item->>'key', v_prev, v_post, auth.uid());
    v_applied := v_applied + 1;
  END LOOP;

  ------------------------------------------------ PHASE 2 — LINK UPSERTS
  FOR v_item IN SELECT value FROM jsonb_array_elements(v_plan->'links')
  LOOP
    CONTINUE WHEN v_item->>'change' IN ('none', 'unlink');

    v_prev := NULL;
    SELECT jsonb_build_object('category_id',l.category_id,'attribute_id',l.attribute_id,
                              'is_required',l.is_required,'is_filterable',l.is_filterable,
                              'display_order',l.display_order,'card_rank',l.card_rank)
      INTO v_prev FROM public.category_attribute_links l
     WHERE l.id = NULLIF(v_item->>'link_id','')::uuid;

    v_id := NULLIF(v_item->>'attribute_id','')::uuid;
    IF v_id IS NULL THEN
      SELECT id INTO v_id FROM public.attributes WHERE attr_key = v_item->>'key';
    END IF;

    IF v_item->>'change' = 'add' THEN
      SELECT COALESCE(max(l.display_order), 0) + 1 INTO v_order
        FROM public.category_attribute_links l
       WHERE l.category_id = (v_item->>'category_id')::uuid;
      INSERT INTO public.category_attribute_links
        (category_id, attribute_id, is_required, is_filterable, display_order, card_rank)
      VALUES ((v_item->>'category_id')::uuid, v_id,
              (v_item->>'is_required')::boolean, (v_item->>'is_filterable')::boolean,
              v_order, NULLIF(v_item->>'card_rank','')::int)
      RETURNING id INTO v_id;
    ELSE
      v_id := (v_item->>'link_id')::uuid;
      UPDATE public.category_attribute_links
         SET is_required = (v_item->>'is_required')::boolean,
             is_filterable = (v_item->>'is_filterable')::boolean,
             card_rank = NULLIF(v_item->>'card_rank','')::int,
             updated_at = now()
       WHERE id = v_id;
    END IF;

    SELECT jsonb_build_object('category_id',l.category_id,'attribute_id',l.attribute_id,
                              'is_required',l.is_required,'is_filterable',l.is_filterable,
                              'display_order',l.display_order,'card_rank',l.card_rank)
      INTO v_post FROM public.category_attribute_links l WHERE l.id = v_id;

    INSERT INTO public.attribute_import_revisions
      (batch_id, kind, action, entity_key, prev, post, created_by)
    VALUES (v_batch, 'link', v_item->>'action',
            (v_item->>'slug') || '|' || (v_item->>'key'), v_prev, v_post, auth.uid());
    v_applied := v_applied + 1;
  END LOOP;

  ------------------------------------------------ PHASE 3 — LINK UNLINKS
  FOR v_item IN SELECT value FROM jsonb_array_elements(v_plan->'links')
  LOOP
    CONTINUE WHEN v_item->>'change' <> 'unlink';

    v_prev := NULL;
    SELECT jsonb_build_object('category_id',l.category_id,'attribute_id',l.attribute_id,
                              'is_required',l.is_required,'is_filterable',l.is_filterable,
                              'display_order',l.display_order,'card_rank',l.card_rank)
      INTO v_prev FROM public.category_attribute_links l
     WHERE l.id = NULLIF(v_item->>'link_id','')::uuid;

    DELETE FROM public.category_attribute_links WHERE id = (v_item->>'link_id')::uuid;

    INSERT INTO public.attribute_import_revisions
      (batch_id, kind, action, entity_key, prev, post, created_by)
    VALUES (v_batch, 'link', v_item->>'action',
            (v_item->>'slug') || '|' || (v_item->>'key'), v_prev, NULL, auth.uid());
    v_applied := v_applied + 1;
  END LOOP;

  -------------------------------------------- PHASE 4 — DEFINITION DELETES
  -- IE-5 — last, so a link removed by the SAME FILE no longer holds it down.
  FOR v_item IN SELECT value FROM jsonb_array_elements(v_plan->'definitions')
  LOOP
    CONTINUE WHEN v_item->>'change' <> 'delete';

    v_id := NULLIF(v_item->>'id','')::uuid;
    CONTINUE WHEN v_id IS NULL;

    SELECT jsonb_build_object('attr_key',a.attr_key,'name_en',a.name_en,'attr_type',a.attr_type,
                              'options',a.options,'help_text_en',a.help_text_en,
                                'unit',a.unit,'min_bound',a.min_bound,'max_bound',a.max_bound,
                                'decimals',a.decimals,'format',a.format,'preset',a.preset,
                                'max_length',a.max_length,'help_text_am',a.help_text_am,
                              'depends_on',
                              COALESCE((SELECT p.attr_key FROM public.attributes p WHERE p.id = a.depends_on), ''))
      INTO v_prev FROM public.attributes a WHERE a.id = v_id;
    v_am := NULL;
    SELECT jsonb_build_object('value', t.value, 'status', t.status, 'machine', t.machine)
      INTO v_am
      FROM public.entity_translations t
     WHERE t.entity_type = 'attribute' AND t.entity_id = v_id
       AND t.field = 'label' AND t.lang_code = 'am';
    v_prev := v_prev || jsonb_build_object('am_state', COALESCE(v_am, 'null'::jsonb));

    DELETE FROM public.entity_translations
     WHERE entity_type = 'attribute' AND entity_id = v_id AND field = 'label';
    DELETE FROM public.attributes WHERE id = v_id;

    INSERT INTO public.attribute_import_revisions
      (batch_id, kind, action, entity_key, prev, post, created_by)
    VALUES (v_batch, 'definition', v_item->>'action', v_item->>'key', v_prev, NULL, auth.uid());
    v_applied := v_applied + 1;
  END LOOP;

  PERFORM public.log_audit('attribute.import', 'attributes', v_batch::text,
    jsonb_build_object('batch_id', v_batch, 'scope', p_scope, 'digest', p_digest,
                       'applied', v_applied, 'counts', v_plan->'counts'));

  RETURN jsonb_build_object('batch_id', v_batch, 'applied', v_applied,
                            'counts', v_plan->'counts', 'refusals', v_plan->'refusals');
END $function$;

-- UNDO REVERSES THAT ORDER: definition deletes restored FIRST, then links, then
-- this batch's own definition creations removed last.
CREATE OR REPLACE FUNCTION public.admin_undo_attribute_import(p_batch uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_rev        record;
  v_restored   int := 0;
  v_conflicted int := 0;
  v_slug       text;
  v_key        text;
  v_attr       uuid;
  v_cat        uuid;
  v_exists     boolean;
  v_am         jsonb;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'import') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('categories', 'import');
  IF p_batch IS NULL THEN
    RAISE EXCEPTION 'batch id required';
  END IF;

  PERFORM 1 FROM public.attribute_import_revisions WHERE batch_id = p_batch LIMIT 1;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'unknown import batch';
  END IF;

  -- DEC-045b — a parent and its dependent can both be CREATIONS of this batch.
  UPDATE public.attributes a
     SET depends_on = NULL
   WHERE a.depends_on IS NOT NULL
     AND a.attr_key IN (SELECT r.entity_key FROM public.attribute_import_revisions r
                         WHERE r.batch_id = p_batch AND r.kind = 'definition'
                           AND r.prev IS NULL AND r.undone_at IS NULL);

  FOR v_rev IN
    SELECT * FROM public.attribute_import_revisions
     WHERE batch_id = p_batch AND undone_at IS NULL
     ORDER BY CASE
                WHEN kind = 'definition' AND prev IS NOT NULL AND post IS NULL THEN 0
                WHEN kind = 'link' THEN 1
                ELSE 2
              END ASC,
              created_at DESC
  LOOP
    IF v_rev.kind = 'definition' THEN
      IF v_rev.prev IS NULL THEN
        IF EXISTS (SELECT 1 FROM public.category_attribute_links l
                     JOIN public.attributes a ON a.id = l.attribute_id
                    WHERE a.attr_key = v_rev.entity_key) THEN
          v_conflicted := v_conflicted + 1;
          CONTINUE;
        END IF;
        SELECT id INTO v_attr FROM public.attributes WHERE attr_key = v_rev.entity_key;
        IF v_attr IS NOT NULL AND EXISTS (
          SELECT 1 FROM public.attributes d WHERE d.depends_on = v_attr
        ) THEN
          v_conflicted := v_conflicted + 1;
          CONTINUE;
        END IF;
        IF v_attr IS NOT NULL THEN
          DELETE FROM public.entity_translations
           WHERE entity_type = 'attribute' AND entity_id = v_attr AND field = 'label';
          PERFORM public.log_audit('entity_translation.undo_remove', 'attributes', v_attr::text,
            jsonb_build_object('batch_id', p_batch, 'lang', 'am', 'field', 'label'));
        END IF;
        DELETE FROM public.attributes WHERE attr_key = v_rev.entity_key;
      ELSE
        SELECT EXISTS (SELECT 1 FROM public.attributes WHERE attr_key = v_rev.entity_key) INTO v_exists;
        IF v_exists THEN
          UPDATE public.attributes
             SET name_en = v_rev.prev->>'name_en',
                 attr_type = v_rev.prev->>'attr_type',
                 options = CASE WHEN v_rev.prev->'options' = 'null'::jsonb THEN NULL ELSE v_rev.prev->'options' END,
                 depends_on = (SELECT p.id FROM public.attributes p
                                WHERE p.attr_key = NULLIF(btrim(COALESCE(v_rev.prev->>'depends_on','')), '')),
                 -- DEC-050 — the v2 cells come back exactly as they were.
                 unit         = CASE WHEN v_rev.prev ? 'unit'         THEN v_rev.prev->>'unit'         ELSE unit END,
                 min_bound    = CASE WHEN v_rev.prev ? 'min_bound'    THEN v_rev.prev->>'min_bound'    ELSE min_bound END,
                 max_bound    = CASE WHEN v_rev.prev ? 'max_bound'    THEN v_rev.prev->>'max_bound'    ELSE max_bound END,
                 decimals     = CASE WHEN v_rev.prev ? 'decimals'     THEN (v_rev.prev->>'decimals')::smallint  ELSE decimals END,
                 format       = CASE WHEN v_rev.prev ? 'format'       THEN v_rev.prev->>'format'       ELSE format END,
                 preset       = CASE WHEN v_rev.prev ? 'preset'       THEN v_rev.prev->>'preset'       ELSE preset END,
                 max_length   = CASE WHEN v_rev.prev ? 'max_length'   THEN (v_rev.prev->>'max_length')::integer ELSE max_length END,
                 help_text_en = CASE WHEN v_rev.prev ? 'help_text_en' THEN v_rev.prev->>'help_text_en' ELSE help_text_en END,
                 help_text_am = CASE WHEN v_rev.prev ? 'help_text_am' THEN v_rev.prev->>'help_text_am' ELSE help_text_am END,
                 updated_at = now()
           WHERE attr_key = v_rev.entity_key;
        ELSE
          INSERT INTO public.attributes (attr_key, name_en, attr_type, options, help_text_en, depends_on,
                                         unit, min_bound, max_bound, decimals, format, preset,
                                         max_length, help_text_am)
          VALUES (v_rev.prev->>'attr_key', v_rev.prev->>'name_en', v_rev.prev->>'attr_type',
                  CASE WHEN v_rev.prev->'options' = 'null'::jsonb THEN NULL ELSE v_rev.prev->'options' END,
                  v_rev.prev->>'help_text_en',
                  (SELECT p.id FROM public.attributes p
                    WHERE p.attr_key = NULLIF(btrim(COALESCE(v_rev.prev->>'depends_on','')), '')),
                  v_rev.prev->>'unit', v_rev.prev->>'min_bound', v_rev.prev->>'max_bound',
                  (v_rev.prev->>'decimals')::smallint, v_rev.prev->>'format', v_rev.prev->>'preset',
                  (v_rev.prev->>'max_length')::integer, v_rev.prev->>'help_text_am');
        END IF;

        SELECT id INTO v_attr FROM public.attributes WHERE attr_key = v_rev.entity_key;
        v_am := v_rev.prev->'am_state';
        IF v_attr IS NOT NULL AND v_am IS NOT NULL AND jsonb_typeof(v_am) = 'object' THEN
          INSERT INTO public.entity_translations
            (entity_type, entity_id, field, lang_code, value, status, machine, updated_by)
          VALUES ('attribute', v_attr, 'label', 'am', v_am->>'value',
                  COALESCE(v_am->>'status', 'edited'),
                  COALESCE((v_am->>'machine')::boolean, false), auth.uid())
          ON CONFLICT (entity_type, entity_id, field, lang_code) DO UPDATE
            SET value = EXCLUDED.value, status = EXCLUDED.status,
                machine = EXCLUDED.machine, updated_by = EXCLUDED.updated_by,
                updated_at = now();
          PERFORM public.log_audit('entity_translation.undo_restore', 'attributes', v_attr::text,
            jsonb_build_object('batch_id', p_batch, 'lang', 'am', 'field', 'label',
                               'restored', v_am));
        ELSIF v_attr IS NOT NULL AND v_am IS NOT NULL AND jsonb_typeof(v_am) = 'null' THEN
          DELETE FROM public.entity_translations
           WHERE entity_type = 'attribute' AND entity_id = v_attr
             AND field = 'label' AND lang_code = 'am';
          PERFORM public.log_audit('entity_translation.undo_remove', 'attributes', v_attr::text,
            jsonb_build_object('batch_id', p_batch, 'lang', 'am', 'field', 'label'));
        END IF;
      END IF;
    ELSE
      v_slug := split_part(v_rev.entity_key, '|', 1);
      v_key := split_part(v_rev.entity_key, '|', 2);
      SELECT id INTO v_cat FROM public.categories WHERE slug = v_slug;
      SELECT id INTO v_attr FROM public.attributes WHERE attr_key = v_key;
      IF v_cat IS NULL OR v_attr IS NULL THEN
        v_conflicted := v_conflicted + 1;
        CONTINUE;
      END IF;

      IF v_rev.prev IS NULL THEN
        DELETE FROM public.category_attribute_links
         WHERE category_id = v_cat AND attribute_id = v_attr;
      ELSE
        INSERT INTO public.category_attribute_links
          (category_id, attribute_id, is_required, is_filterable, display_order, card_rank)
        VALUES (v_cat, v_attr,
                (v_rev.prev->>'is_required')::boolean,
                (v_rev.prev->>'is_filterable')::boolean,
                COALESCE((v_rev.prev->>'display_order')::int, 0),
                NULLIF(v_rev.prev->>'card_rank','')::int)
        ON CONFLICT (category_id, attribute_id) DO UPDATE
          SET is_required = EXCLUDED.is_required,
              is_filterable = EXCLUDED.is_filterable,
              display_order = EXCLUDED.display_order,
              card_rank = EXCLUDED.card_rank,
              updated_at = now();
      END IF;
    END IF;

    UPDATE public.attribute_import_revisions SET undone_at = now() WHERE id = v_rev.id;
    v_restored := v_restored + 1;
  END LOOP;

  PERFORM public.log_audit('attribute.import_undo', 'attributes', p_batch::text,
    jsonb_build_object('batch_id', p_batch, 'restored', v_restored, 'conflicted', v_conflicted));

  RETURN jsonb_build_object('batch_id', p_batch, 'restored', v_restored,
                            'conflicted', v_conflicted);
END $function$;

-- CLOSERS (A8 / DEC-022-B), restated in-file.
REVOKE ALL ON FUNCTION public.admin_commit_attribute_import(jsonb, jsonb, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_commit_attribute_import(jsonb, jsonb, text, text) TO authenticated;
GRANT ALL ON FUNCTION public.admin_commit_attribute_import(jsonb, jsonb, text, text) TO service_role;

REVOKE ALL ON FUNCTION public.admin_undo_attribute_import(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_undo_attribute_import(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.admin_undo_attribute_import(uuid) TO service_role;

/* ================= 7. THE AMHARIC OPTION-COVERAGE READ ==================== */

-- Gated with the SAME line the upsert door uses (censused 1.c).
CREATE OR REPLACE FUNCTION public.admin_attribute_option_coverage()
RETURNS TABLE (attribute_id uuid, attr_key text, options_total int, options_with_am int)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'update') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;

  RETURN QUERY
    SELECT a.id,
           a.attr_key,
           COALESCE(o.total, 0)::int,
           COALESCE(o.with_am, 0)::int
      FROM public.attributes a
      LEFT JOIN LATERAL (
        SELECT count(*)::int AS total,
               count(*) FILTER (
                 WHERE btrim(COALESCE(x.value->>'label_am', '')) <> '')::int AS with_am
          FROM jsonb_array_elements(
                 CASE WHEN jsonb_typeof(a.options) = 'array' THEN a.options ELSE '[]'::jsonb END) x
         WHERE jsonb_typeof(x.value) = 'object'
      ) o ON true
     WHERE a.attr_type IN ('single_select', 'multi_select')
     ORDER BY a.attr_key;
END $function$;

REVOKE ALL ON FUNCTION public.admin_attribute_option_coverage() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_attribute_option_coverage() TO authenticated;
GRANT ALL ON FUNCTION public.admin_attribute_option_coverage() TO service_role;

/* ================================= PROOFS ================================= */

-- PROOF 1 — the resolver.
DO $proof$
DECLARE v_y numeric := extract(year from (now() at time zone 'UTC'))::numeric;
BEGIN
  IF public.attr_bound_value('year') IS DISTINCT FROM v_y THEN
    RAISE EXCEPTION 'PROOF FAILED: attr_bound_value(year)';
  END IF;
  IF public.attr_bound_value('year+1') IS DISTINCT FROM v_y + 1 THEN
    RAISE EXCEPTION 'PROOF FAILED: attr_bound_value(year+1)';
  END IF;
  IF public.attr_bound_value('year-99') IS DISTINCT FROM v_y - 99 THEN
    RAISE EXCEPTION 'PROOF FAILED: attr_bound_value(year-99)';
  END IF;
  IF public.attr_bound_value('1999.5') IS DISTINCT FROM 1999.5 THEN
    RAISE EXCEPTION 'PROOF FAILED: attr_bound_value(literal)';
  END IF;
  IF public.attr_bound_value(NULL) IS NOT NULL THEN
    RAISE EXCEPTION 'PROOF FAILED: attr_bound_value(NULL)';
  END IF;
  RAISE NOTICE 'DEC-050 PROOF 1 OK: attr_bound_value resolves year, year+N, year-N and literals';
END $proof$;

-- PROOF 2 — the preset allowlist, and three rejects.
DO $proof$
BEGIN
  IF NOT (public.attr_preset_ok('digits:10') AND public.attr_preset_ok('vin')
          AND public.attr_preset_ok('plate-et') AND public.attr_preset_ok('alnum:3-12')
          AND public.attr_preset_ok('free:1000')) THEN
    RAISE EXCEPTION 'PROOF FAILED: the allowlist rejected an allowed preset';
  END IF;
  IF public.attr_preset_ok('regex:.*') OR public.attr_preset_ok('alnum:12-3')
     OR public.attr_preset_ok('digits:65') OR public.attr_preset_ok('free:1001')
     OR public.attr_preset_ok('email') THEN
    RAISE EXCEPTION 'PROOF FAILED: the allowlist accepted a forbidden preset';
  END IF;
  RAISE NOTICE 'DEC-050 PROOF 2 OK: attr_preset_ok is an allowlist, never a free regex';
END $proof$;

-- PROOF 3 — every CHECK refuses one bad value, and `range` is gone.
DO $proof$
DECLARE v_k text := 'e2e-dec050-check-probe';
BEGIN
  DELETE FROM public.attributes WHERE attr_key = v_k;

  BEGIN
    INSERT INTO public.attributes(attr_key, name_en, attr_type, unit)
      VALUES (v_k, 'probe', 'text', 'kg');
    RAISE EXCEPTION 'PROOF FAILED: unit accepted on a text definition';
  EXCEPTION WHEN check_violation THEN NULL; END;

  BEGIN
    INSERT INTO public.attributes(attr_key, name_en, attr_type, min_bound, max_bound)
      VALUES (v_k, 'probe', 'number', '10', '5');
    RAISE EXCEPTION 'PROOF FAILED: min above max accepted';
  EXCEPTION WHEN check_violation THEN NULL; END;

  BEGIN
    INSERT INTO public.attributes(attr_key, name_en, attr_type, decimals)
      VALUES (v_k, 'probe', 'number', 4);
    RAISE EXCEPTION 'PROOF FAILED: decimals 4 accepted';
  EXCEPTION WHEN check_violation THEN NULL; END;

  BEGIN
    INSERT INTO public.attributes(attr_key, name_en, attr_type, format, decimals)
      VALUES (v_k, 'probe', 'number', 'year', 2);
    RAISE EXCEPTION 'PROOF FAILED: format year with decimals 2 accepted';
  EXCEPTION WHEN check_violation THEN NULL; END;

  BEGIN
    INSERT INTO public.attributes(attr_key, name_en, attr_type, format)
      VALUES (v_k, 'probe', 'number', 'x');
    RAISE EXCEPTION 'PROOF FAILED: format x accepted';
  EXCEPTION WHEN check_violation THEN NULL; END;

  BEGIN
    INSERT INTO public.attributes(attr_key, name_en, attr_type, preset)
      VALUES (v_k, 'probe', 'text', 'regex:.*');
    RAISE EXCEPTION 'PROOF FAILED: a free regex preset accepted';
  EXCEPTION WHEN check_violation THEN NULL; END;

  BEGIN
    INSERT INTO public.attributes(attr_key, name_en, attr_type, max_length)
      VALUES (v_k, 'probe', 'text', 0);
    RAISE EXCEPTION 'PROOF FAILED: max_length 0 accepted';
  EXCEPTION WHEN check_violation THEN NULL; END;

  BEGIN
    INSERT INTO public.attributes(attr_key, name_en, attr_type, help_text_am)
      VALUES (v_k, 'probe', 'text', repeat('h', 241));
    RAISE EXCEPTION 'PROOF FAILED: a 241-character help text accepted';
  EXCEPTION WHEN check_violation THEN NULL; END;

  BEGIN
    INSERT INTO public.attributes(attr_key, name_en, attr_type)
      VALUES (v_k, 'probe', 'range');
    RAISE EXCEPTION 'PROOF FAILED: attr_type range still accepted';
  EXCEPTION WHEN check_violation THEN NULL; END;

  IF EXISTS (SELECT 1 FROM public.attributes WHERE attr_type = 'range') THEN
    RAISE EXCEPTION 'PROOF FAILED: a row still carries attr_type range';
  END IF;
  IF EXISTS (SELECT 1 FROM public.attributes WHERE attr_key = v_k) THEN
    RAISE EXCEPTION 'PROOF FAILED: the probe row survived';
  END IF;

  RAISE NOTICE 'DEC-050 PROOF 3 OK: every v2 CHECK refuses its bad value; range is retired';
END $proof$;

-- PROOF 4 — the strict option shape refuses hostile records.
DO $proof$
DECLARE v_m text;
BEGIN
  v_m := public.attr_option_shape('k', '[{"value":"a","colour":"red"}]'::jsonb);
  IF v_m IS NULL OR position('unknownOptionKey:colour' IN v_m) = 0 THEN
    RAISE EXCEPTION 'PROOF FAILED: an unknown option key was tolerated (%)', v_m;
  END IF;

  v_m := public.attr_option_shape('k', ('[{"value":"a","aliases":["' || repeat('x', 33) || '"]}]')::jsonb);
  IF v_m IS NULL OR position('aliasLength' IN v_m) = 0 THEN
    RAISE EXCEPTION 'PROOF FAILED: a 33-character alias was tolerated (%)', v_m;
  END IF;

  v_m := public.attr_option_shape('k', '[{"value":"a","aliases":["a","b","c","d","e","f"]}]'::jsonb);
  IF v_m IS NULL OR position('aliasesCount:6' IN v_m) = 0 THEN
    RAISE EXCEPTION 'PROOF FAILED: six aliases were tolerated (%)', v_m;
  END IF;

  v_m := public.attr_option_shape('k', '[{"value":"a","aliases":["Ab","aB"]}]'::jsonb);
  IF v_m IS NULL OR position('aliasDuplicate' IN v_m) = 0 THEN
    RAISE EXCEPTION 'PROOF FAILED: a case-insensitive duplicate alias was tolerated (%)', v_m;
  END IF;

  v_m := public.attr_option_shape('k', '[{"value":"a","active":"yes"}]'::jsonb);
  IF v_m IS NULL OR position('activeNotBoolean' IN v_m) = 0 THEN
    RAISE EXCEPTION 'PROOF FAILED: a non-boolean active was tolerated (%)', v_m;
  END IF;

  v_m := public.attr_option_shape('k', '[{"value":"a","bounds":{"year":{"min":2010,"max":1999}}}]'::jsonb);
  IF v_m IS NULL OR position('boundsMinAboveMax' IN v_m) = 0 THEN
    RAISE EXCEPTION 'PROOF FAILED: an inverted bounds pair was tolerated (%)', v_m;
  END IF;

  IF public.attr_option_shape('k',
       '[{"value":"a","label_en":"A","label_am":"ሀ","active":false,"aliases":["alfa"],"bounds":{"year":{"min":"year-10"}}}]'::jsonb)
     IS NOT NULL THEN
    RAISE EXCEPTION 'PROOF FAILED: a well-formed option record was refused';
  END IF;

  RAISE NOTICE 'DEC-050 PROOF 4 OK: the option shape is strict and names what it refuses';
END $proof$;

-- PROOF 5 — the planner: hostile payloads refused, a valid v2 payload accepted.
DO $proof$
DECLARE
  v_slug text;
  v_plan jsonb;
BEGIN
  SELECT c.slug INTO v_slug FROM public.categories c
   WHERE c.is_active AND NOT c.is_catchall ORDER BY c.slug LIMIT 1;
  IF v_slug IS NULL THEN
    RAISE EXCEPTION 'PROOF FAILED: no category to plan against';
  END IF;

  -- (a) an unknown option key.
  v_plan := public.attr_import_plan(
    '[{"row":2,"attribute_key":"e2e-dec050-p1","label_en":"P1","type":"single_select",
       "options":"[{\"value\":\"a\",\"colour\":\"red\"}]"}]'::jsonb, '[]'::jsonb, NULL);
  IF NOT (v_plan->'refusals') @> '[{"reason":"badOption"}]'::jsonb THEN
    RAISE EXCEPTION 'PROOF FAILED: the planner tolerated an unknown option key (%)', v_plan->'refusals';
  END IF;

  -- (b) a bad cell.
  v_plan := public.attr_import_plan(
    '[{"row":2,"attribute_key":"e2e-dec050-p2","label_en":"P2","type":"number","decimals":"4"}]'::jsonb,
    '[]'::jsonb, NULL);
  IF NOT (v_plan->'refusals') @> '[{"reason":"badCell","cell":"decimals"}]'::jsonb THEN
    RAISE EXCEPTION 'PROOF FAILED: the planner tolerated decimals 4 (%)', v_plan->'refusals';
  END IF;

  -- (c) a preset on a number definition.
  v_plan := public.attr_import_plan(
    '[{"row":2,"attribute_key":"e2e-dec050-p3","label_en":"P3","type":"number","preset":"vin"}]'::jsonb,
    '[]'::jsonb, NULL);
  IF NOT (v_plan->'refusals') @> '[{"reason":"badCell","cell":"preset"}]'::jsonb THEN
    RAISE EXCEPTION 'PROOF FAILED: the planner tolerated a preset on a number (%)', v_plan->'refusals';
  END IF;

  -- (d) a bounds target that is NOT co-linked: the owner is linked to a
  --     category by this same file, the target is linked nowhere.
  v_plan := public.attr_import_plan(
    ('[{"row":2,"attribute_key":"e2e-dec050-owner","label_en":"Owner","type":"single_select",
        "options":"[{\"value\":\"a\",\"bounds\":{\"e2e-dec050-num\":{\"min\":\"year-10\"}}}]"},
       {"row":3,"attribute_key":"e2e-dec050-num","label_en":"Num","type":"number"}]')::jsonb,
    ('[{"row":2,"category_slug":"' || v_slug || '","attribute_key":"e2e-dec050-owner"}]')::jsonb,
    NULL);
  IF NOT (v_plan->'refusals') @> '[{"reason":"boundsTargetNotColinked"}]'::jsonb THEN
    RAISE EXCEPTION 'PROOF FAILED: the planner tolerated a bounds target that is not co-linked (%)',
      v_plan->'refusals';
  END IF;

  -- (e) a bounds target that is not a number definition.
  v_plan := public.attr_import_plan(
    '[{"row":2,"attribute_key":"e2e-dec050-owner2","label_en":"Owner2","type":"single_select",
       "options":"[{\"value\":\"a\",\"bounds\":{\"e2e-dec050-nowhere\":{\"min\":\"1\"}}}]"}]'::jsonb,
    '[]'::jsonb, NULL);
  IF NOT (v_plan->'refusals') @> '[{"reason":"boundsTargetNotNumber"}]'::jsonb THEN
    RAISE EXCEPTION 'PROOF FAILED: the planner tolerated a non-number bounds target (%)',
      v_plan->'refusals';
  END IF;

  -- (f) `range` is refused as a type.
  v_plan := public.attr_import_plan(
    '[{"row":2,"attribute_key":"e2e-dec050-p4","label_en":"P4","type":"range"}]'::jsonb,
    '[]'::jsonb, NULL);
  IF NOT (v_plan->'refusals') @> '[{"reason":"unknownType"}]'::jsonb THEN
    RAISE EXCEPTION 'PROOF FAILED: the planner still accepts the range type (%)', v_plan->'refusals';
  END IF;

  -- (g) a VALID payload carrying every new cell is accepted, and every cell
  --     survives into the plan the commit will apply.
  v_plan := public.attr_import_plan(
    '[{"row":2,"attribute_key":"e2e-dec050-ok","label_en":"OK","type":"number",
       "unit":"km","min":"0","max":"year+1","decimals":"0","format":"year",
       "help_text_en":"how far","help_text_am":"ርቀት"}]'::jsonb, '[]'::jsonb, NULL);
  IF jsonb_array_length(v_plan->'refusals') <> 0 THEN
    RAISE EXCEPTION 'PROOF FAILED: a valid v2 payload was refused (%)', v_plan->'refusals';
  END IF;
  IF NOT (v_plan->'definitions') @> '[{"key":"e2e-dec050-ok","change":"add"}]'::jsonb THEN
    RAISE EXCEPTION 'PROOF FAILED: the valid v2 payload did not plan an add (%)', v_plan->'definitions';
  END IF;
  IF NOT (v_plan->'definitions') @> '[{"cells":{"unit":"km","format":"year","help_text_am":"ርቀት"}}]'::jsonb THEN
    RAISE EXCEPTION 'PROOF FAILED: the v2 cells were dropped from the plan (%)', v_plan->'definitions';
  END IF;

  RAISE NOTICE 'DEC-050 PROOF 5 OK: the planner refuses hostile v2 payloads and carries valid cells';
END $proof$;

-- PROOF 6 — the 7-argument upsert call still RESOLVES (it reaches the gate and
-- is refused there, which is only possible if the signature matched).
DO $proof$
DECLARE v_n int; v_d int; v_id uuid;
BEGIN
  SELECT count(*)::int INTO v_n FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
   WHERE n.nspname = 'public' AND p.proname = 'admin_upsert_attribute';
  IF v_n <> 1 THEN
    RAISE EXCEPTION 'PROOF FAILED: % declarations of admin_upsert_attribute', v_n;
  END IF;
  SELECT p.pronargs, p.pronargdefaults INTO v_n, v_d
    FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
   WHERE n.nspname = 'public' AND p.proname = 'admin_upsert_attribute';
  IF v_n <> 15 OR v_d <> 9 THEN
    RAISE EXCEPTION 'PROOF FAILED: signature is %/% args/defaults, expected 15/9', v_n, v_d;
  END IF;

  BEGIN
    v_id := public.admin_upsert_attribute(NULL, 'e2e-dec050-resolve', 'R', 'text',
                                          NULL, NULL, NULL);
    RAISE EXCEPTION 'PROOF FAILED: the ungated 7-argument call wrote a row';
  EXCEPTION
    WHEN undefined_function THEN
      RAISE EXCEPTION 'PROOF FAILED: a 7-argument call no longer resolves';
    WHEN others THEN
      IF SQLERRM <> 'permission denied' THEN
        RAISE EXCEPTION 'PROOF FAILED: unexpected refusal from the 7-argument call (%)', SQLERRM;
      END IF;
  END;
  RAISE NOTICE 'DEC-050 PROOF 6 OK: 15 parameters, 9 defaults, and 7-argument callers still resolve';
END $proof$;

-- PROOF 7 — admin_merge_attributes is UNCHANGED (census body).
DO $proof$
DECLARE v_src text;
BEGIN
  SELECT pg_get_functiondef(p.oid) INTO v_src FROM pg_proc p
    JOIN pg_namespace n ON n.oid = p.pronamespace
   WHERE n.nspname = 'public' AND p.proname = 'admin_merge_attributes';
  IF v_src IS NULL THEN
    RAISE EXCEPTION 'PROOF FAILED: admin_merge_attributes is missing';
  END IF;
  IF position('merge_attributes_impl' IN v_src) = 0
     OR position($m$has_permission(auth.uid(), 'categories', 'restructure')$m$ IN v_src) = 0 THEN
    RAISE EXCEPTION 'PROOF FAILED: admin_merge_attributes is not the census body';
  END IF;
  RAISE NOTICE 'DEC-050 PROOF 7 OK: admin_merge_attributes untouched';
END $proof$;

-- PROOF 8 — ACL read-backs for every function this file declares.
DO $proof$
DECLARE
  v_sig text;
  v_acl text;
BEGIN
  FOREACH v_sig IN ARRAY ARRAY[
    'public.attr_preset_ok(text)',
    'public.attr_bound_ok(text)',
    'public.attr_bound_value(text)',
    'public.attr_cell_check(text,text,text,text,int,text,text,int,text,text)',
    'public.attr_option_shape(text,jsonb)',
    'public.attr_bounds_targets(jsonb)',
    'public.attr_postplan_cats(text,jsonb)',
    'public.attr_cats_expand(uuid[])',
    'public.attr_option_norm_v2(jsonb)',
    'public.attr_import_plan(jsonb,jsonb,text)',
    'public.admin_upsert_attribute(uuid,text,text,text,jsonb,text,text,text,text,text,smallint,text,text,integer,text)',
    'public.admin_commit_attribute_import(jsonb,jsonb,text,text)',
    'public.admin_undo_attribute_import(uuid)',
    'public.admin_attribute_option_coverage()']
  LOOP
    IF to_regprocedure(v_sig) IS NULL THEN
      RAISE EXCEPTION 'PROOF FAILED: % is not declared', v_sig;
    END IF;
    IF has_function_privilege('anon', v_sig, 'EXECUTE') THEN
      RAISE EXCEPTION 'PROOF FAILED: anon holds EXECUTE on %', v_sig;
    END IF;
    IF NOT has_function_privilege('authenticated', v_sig, 'EXECUTE') THEN
      RAISE EXCEPTION 'PROOF FAILED: authenticated lost EXECUTE on %', v_sig;
    END IF;
    IF NOT has_function_privilege('service_role', v_sig, 'EXECUTE') THEN
      RAISE EXCEPTION 'PROOF FAILED: service_role lost EXECUTE on %', v_sig;
    END IF;
    SELECT array_to_string(p.proacl, ',') INTO v_acl FROM pg_proc p WHERE p.oid = to_regprocedure(v_sig);
    RAISE NOTICE 'DEC-050 ACL % : %', v_sig, v_acl;
  END LOOP;
  RAISE NOTICE 'DEC-050 PROOF 8 OK: closers as declared for every function in this file';
END $proof$;

-- Ledger (DEC-022): declared mark, monotonic and >= this file's stamp.
INSERT INTO public.migration_marks (version) VALUES ('20260911200000') ON CONFLICT DO NOTHING;