-- =====================================================================
-- M-MAINT-3 — MAINTENANCE MIGRATION III (doors half)
--
-- D24 CONDITIONAL ATTRIBUTES — `category_attribute_links.visible_when`:
--   { "key": "<sibling definition key in the same category>", "in": [ … ] }
--   at most eight values, shape guarded by the IMMUTABLE checker
--   public.attr_visible_when_ok(jsonb) and by a CHECK constraint.
--   THE LAW: a link whose condition is NOT met is treated as ABSENT for
--   `required` (never refused as missing) and any value sent for it is
--   DROPPED from the normalised attrs — a hidden answer is never stored.
--
-- D22 PLAN PHOTO CAP — the plans editor door takes p_max_photos (0..30,
--   refusal `badMaxPhotos`). The plan document already travels with
--   get_posting_schema (M-MAINT-2 Part A, plan_caps + seller_plan); it is
--   restated here because the schema read is re-declared WHOLE.
--
-- LINK-CELL DOORS — admin_link_attribute and admin_update_attribute_link
--   accept allowed_options, default_value and visible_when, with the same
--   judgements the file planner applies (`badAllowedOption:<detail>`,
--   `badDefault:<detail>`, `badVisibleWhen:<detail>`).
--
-- NAMED DEFERRAL (operator-approved this landing): the ATTRIBUTES FILE cell
--   for visible_when (attr_import_plan / admin_commit_attribute_import /
--   admin_undo_attribute_import / attr_export_payload) rides the NEXT landing
--   that re-declares those four routines WHOLE. Nothing here half-supports it:
--   the file simply does not carry the cell yet.
--
-- INC-183: get_posting_schema and validate_listing_attributes are re-declared
-- WHOLE from their latest bodies (20260919054044_5631bf8d-…); the three doors
-- are DROPped and re-CREATEd because their shapes change.
-- INC-212: every SECURITY DEFINER function restates its closers in this file.
-- INC-222: the in-file proofs run on SCRATCH identities and rows with an
-- in-transaction role grant — never a real user id, never a step-up toggle.
-- =====================================================================

-- ------------------------------------------ 1. THE SHAPE CHECKER (IMMUTABLE)
CREATE OR REPLACE FUNCTION public.attr_visible_when_ok(p_vw jsonb)
RETURNS boolean
LANGUAGE sql
IMMUTABLE
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

-- --------------------------------------------------- 2. THE COLUMN + CHECK
ALTER TABLE public.category_attribute_links
  ADD COLUMN IF NOT EXISTS visible_when jsonb;

ALTER TABLE public.category_attribute_links
  DROP CONSTRAINT IF EXISTS category_attribute_links_visible_when_shape;

ALTER TABLE public.category_attribute_links
  ADD CONSTRAINT category_attribute_links_visible_when_shape
  CHECK (public.attr_visible_when_ok(visible_when));

COMMENT ON COLUMN public.category_attribute_links.visible_when IS
  'D24 — { "key": "<sibling key in the same category>", "in": [values] }. An unmet condition means the link is absent: never required, and a value sent for it is never stored.';

-- ------------------------------- 3. IS THE CONDITION MET? (IMMUTABLE reader)
CREATE OR REPLACE FUNCTION public.attr_visible_when_met(p_attrs jsonb, p_prior jsonb, p_vw jsonb)
RETURNS boolean
LANGUAGE sql
IMMUTABLE
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

-- ------------------------- 4. THE THREE CELLS, JUDGED ONCE FOR BOTH DOORS
-- Returns NULL when every supplied cell is legal, otherwise the refusal id
-- the door raises verbatim. The judgements mirror the file planner's
-- (20260919061105_41548d66-…): a shortlist is a SUBSET of the definition's own
-- option values, a default matches the definition's TYPE and — when a
-- shortlist is in force — one of ITS values, and a condition names a SIBLING
-- linked to the same category, never the row's own key.
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

-- ------------------------------- 5. get_posting_schema — WHOLE re-declaration
-- Adds 'visible_when' to every attribute row. The plan document (D22) is
-- unchanged from M-MAINT-2 Part A and restated here in full.
CREATE OR REPLACE FUNCTION public.get_posting_schema(p_category_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_cat public.categories;
  v_attrs jsonb;
BEGIN
  SELECT * INTO v_cat FROM public.categories WHERE id = p_category_id;
  IF v_cat.id IS NULL THEN
    RAISE EXCEPTION 'categoryNotFound';
  END IF;
  IF NOT v_cat.is_active THEN
    RAISE EXCEPTION 'categoryInactive';
  END IF;
  IF NOT v_cat.allow_listings THEN
    RAISE EXCEPTION 'categoryNotPostable';
  END IF;

  SELECT coalesce(jsonb_agg(row ORDER BY ord, key), '[]'::jsonb)
    INTO v_attrs
    FROM (
      SELECT e.display_order AS ord, a.attr_key AS key,
             jsonb_build_object(
               'attribute_id', a.id,
               'attr_key', a.attr_key,
               'attr_type', a.attr_type,
               'name_en', a.name_en,
               'help_text_en', a.help_text_en,
               'is_required', e.is_required,
               'display_order', e.display_order,
               'card_rank', e.card_rank,
               'unit', a.unit,
               'min_bound', a.min_bound,
               'max_bound', a.max_bound,
               'decimals', a.decimals,
               'format', a.format,
               'preset', a.preset,
               'max_length', a.max_length,
               -- D-spec 12 — the per-link narrowing and default.
               'allowed_options', to_jsonb(l.allowed_options),
               'default_value', l.default_value,
               -- D24 — the condition travels to the wizard.
               'visible_when', l.visible_when,
               'option_count', (
                 SELECT count(*)
                   FROM jsonb_array_elements(
                          CASE WHEN jsonb_typeof(a.options) = 'array' THEN a.options ELSE '[]'::jsonb END) o
                  WHERE coalesce((o.value->>'active')::boolean, true)
                    AND (l.allowed_options IS NULL
                         OR (o.value->>'value') = ANY (l.allowed_options))
               ),
               'allow_other', EXISTS (
                 SELECT 1
                   FROM jsonb_array_elements(
                          CASE WHEN jsonb_typeof(a.options) = 'array' THEN a.options ELSE '[]'::jsonb END) o
                  WHERE o.value->>'value' = 'other'
                    AND (l.allowed_options IS NULL
                         OR 'other' = ANY (l.allowed_options))
               )
             ) AS row
        FROM public.effective_category_links(p_category_id) e
        JOIN public.attributes a ON a.id = e.attribute_id
        JOIN public.category_attribute_links l ON l.id = e.link_id
    ) s;

  RETURN jsonb_build_object(
    'category', jsonb_build_object(
      'id', v_cat.id,
      'slug', v_cat.slug,
      'name_en', v_cat.name_en,
      'price_enabled', v_cat.price_enabled,
      'default_price_period', v_cat.default_price_period,
      'price_period_locked', v_cat.price_period_locked,
      'expiry_days', v_cat.expiry_days,
      'is_restricted', v_cat.is_restricted,
      'capabilities', to_jsonb(v_cat.capabilities),
      'illustration', v_cat.image_url
    ),
    'attributes', v_attrs,
    -- D22 — the caller's plan caps travel with the schema read.
    'plan', public.plan_caps(public.seller_plan(auth.uid()))
  );
END $$;

REVOKE ALL ON FUNCTION public.get_posting_schema(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_posting_schema(uuid) TO anon, authenticated;
GRANT ALL ON FUNCTION public.get_posting_schema(uuid) TO service_role;

-- ------------------- 6. validate_listing_attributes — WHOLE re-declaration
-- D24 — a link whose condition is NOT met is treated as ABSENT for `required`
-- and any value sent for it is DROPPED from the normalised attrs.
CREATE OR REPLACE FUNCTION public.validate_listing_attributes(
  p_category_id uuid,
  p_attrs jsonb,
  p_prior jsonb DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_attrs jsonb := CASE WHEN jsonb_typeof(p_attrs) = 'object' THEN p_attrs ELSE '{}'::jsonb END;
  v_prior jsonb := CASE WHEN jsonb_typeof(p_prior) = 'object' THEN p_prior ELSE '{}'::jsonb END;
  v_ref   jsonb := '[]'::jsonb;
  v_norm  jsonb := '{}'::jsonb;
  v_keys  text[];
  v_def   record;
  v_opt   jsonb;
  v_val   jsonb;
  v_folds jsonb := '{}'::jsonb;
  v_key   text;
  v_txt   text;
  v_num   numeric;
  v_min   numeric;
  v_max   numeric;
  v_bmin  numeric;
  v_bmax  numeric;
  v_absent boolean;
  v_allow_other boolean;
  v_active boolean;
  v_found  boolean;
  v_seen   text[];
  v_list   jsonb;
  v_elem   jsonb;
  v_parent_key text;
  v_bad    boolean;
BEGIN
  SELECT array_agg(a.attr_key)
    INTO v_keys
    FROM public.effective_category_links(p_category_id) e
    JOIN public.attributes a ON a.id = e.attribute_id;
  v_keys := coalesce(v_keys, ARRAY[]::text[]);

  -- unknownAttribute — a key that the effective set does not carry.
  FOR v_key IN SELECT k FROM jsonb_object_keys(v_attrs) k LOOP
    IF NOT (v_key = ANY (v_keys)) THEN
      v_ref := v_ref || jsonb_build_array(
        jsonb_build_object('attr_key', v_key, 'reason', 'unknownAttribute'));
    END IF;
  END LOOP;

  -- DEC-050 FOLD — a selected option may tighten a sibling's bounds.
  FOR v_def IN
    SELECT a.attr_key, a.options
      FROM public.effective_category_links(p_category_id) e
      JOIN public.attributes a ON a.id = e.attribute_id
     WHERE jsonb_typeof(a.options) = 'array'
  LOOP
    v_val := v_attrs -> v_def.attr_key;
    CONTINUE WHEN v_val IS NULL;
    FOR v_opt IN
      SELECT o.value
        FROM jsonb_array_elements(v_def.options) o
       WHERE jsonb_typeof(o.value->'bounds') = 'object'
    LOOP
      IF (jsonb_typeof(v_val) = 'string' AND (v_val #>> '{}') = v_opt->>'value')
         OR (jsonb_typeof(v_val) = 'array' AND v_val @> jsonb_build_array(v_opt->>'value'))
         OR (jsonb_typeof(v_val) = 'object' AND v_val->>'value' = v_opt->>'value') THEN
        FOR v_key IN SELECT k FROM jsonb_object_keys(v_opt->'bounds') k LOOP
          v_bmin := NULLIF(v_opt->'bounds'->v_key->>'min', '')::numeric;
          v_bmax := NULLIF(v_opt->'bounds'->v_key->>'max', '')::numeric;
          IF v_folds ? v_key THEN
            v_bmin := greatest(v_bmin, NULLIF(v_folds->v_key->>'min','')::numeric);
            v_bmax := least(v_bmax, NULLIF(v_folds->v_key->>'max','')::numeric);
            -- greatest/least ignore NULLs in Postgres, which is exactly the
            -- "tightest stated bound wins" rule.
          END IF;
          v_folds := v_folds || jsonb_build_object(v_key,
            jsonb_strip_nulls(jsonb_build_object('min', v_bmin, 'max', v_bmax)));
        END LOOP;
      END IF;
    END LOOP;
  END LOOP;

  -- The judgement, definition by definition, in display order.
  FOR v_def IN
    SELECT a.id, a.attr_key, a.attr_type, a.options, a.min_bound, a.max_bound,
           a.decimals, a.format, a.preset, a.max_length, a.depends_on,
           e.is_required, e.display_order,
           l.allowed_options, l.visible_when
      FROM public.effective_category_links(p_category_id) e
      JOIN public.attributes a ON a.id = e.attribute_id
      JOIN public.category_attribute_links l ON l.id = e.link_id
     ORDER BY e.display_order, a.attr_key
  LOOP
    v_val := v_attrs -> v_def.attr_key;

    -- M-MAINT-3 / D24 — A LINK WHOSE CONDITION IS NOT MET IS NOT THERE.
    -- It is never refused as `required`, and any value sent for it is DROPPED
    -- from the normalised attrs — so a hidden answer is never stored.
    IF v_def.visible_when IS NOT NULL
       AND NOT public.attr_visible_when_met(v_attrs, v_prior, v_def.visible_when) THEN
      CONTINUE;
    END IF;

    v_absent := v_val IS NULL
             OR jsonb_typeof(v_val) = 'null'
             OR (jsonb_typeof(v_val) = 'string' AND btrim(v_val #>> '{}') = '')
             OR (jsonb_typeof(v_val) = 'array' AND jsonb_array_length(v_val) = 0);

    IF v_absent THEN
      IF v_def.is_required THEN
        v_ref := v_ref || jsonb_build_array(
          jsonb_build_object('attr_key', v_def.attr_key, 'reason', 'required'));
      END IF;
      CONTINUE;
    END IF;

    -- dependentMissing — a definition conditioned on a sibling answered first.
    IF v_def.depends_on IS NOT NULL THEN
      SELECT p.attr_key INTO v_parent_key FROM public.attributes p WHERE p.id = v_def.depends_on;
      IF v_parent_key IS NOT NULL
         AND (v_attrs -> v_parent_key) IS NULL THEN
        v_ref := v_ref || jsonb_build_array(jsonb_build_object(
          'attr_key', v_def.attr_key, 'reason', 'dependentMissing', 'detail', v_parent_key));
        CONTINUE;
      END IF;
    END IF;

    v_allow_other := EXISTS (
      SELECT 1 FROM jsonb_array_elements(
        CASE WHEN jsonb_typeof(v_def.options) = 'array' THEN v_def.options ELSE '[]'::jsonb END) o
       WHERE o.value->>'value' = 'other');

    IF v_def.attr_type = 'text' THEN
      IF jsonb_typeof(v_val) <> 'string' THEN
        v_ref := v_ref || jsonb_build_array(jsonb_build_object('attr_key', v_def.attr_key, 'reason', 'badType', 'detail', 'text'));
        CONTINUE;
      END IF;
      v_txt := btrim(v_val #>> '{}');
      IF v_def.max_length IS NOT NULL AND char_length(v_txt) > v_def.max_length THEN
        v_ref := v_ref || jsonb_build_array(jsonb_build_object('attr_key', v_def.attr_key, 'reason', 'tooLong', 'detail', v_def.max_length::text));
        CONTINUE;
      END IF;
      IF v_def.preset IS NOT NULL THEN
        -- The preset allowlist is attr_preset_ok's (DEC-050): digits:n, vin,
        -- plate-et, alnum:a-b, free:n.
        v_bad := CASE
          WHEN v_def.preset ~ '^digits:[0-9]{1,2}$'
            THEN v_txt !~ ('^[0-9]{' || split_part(v_def.preset, ':', 2) || '}$')
          WHEN v_def.preset = 'vin'
            THEN char_length(v_txt) <> 17 OR upper(v_txt) !~ '^[A-HJ-NPR-Z0-9]{17}$'
          WHEN v_def.preset = 'plate-et'
            THEN upper(v_txt) !~ '^[0-9]{1,2}-[0-9]{4,6}-[A-Z]{2}$'
          WHEN v_def.preset ~ '^alnum:[0-9]{1,2}-[0-9]{1,2}$'
            THEN v_txt !~ ('^[A-Za-z0-9]{'
                 || split_part(split_part(v_def.preset, ':', 2), '-', 1) || ','
                 || split_part(split_part(v_def.preset, ':', 2), '-', 2) || '}$')
          WHEN v_def.preset ~ '^free:[0-9]{1,4}$'
            THEN char_length(v_txt) > (split_part(v_def.preset, ':', 2))::int
          ELSE false
        END;
        IF v_bad THEN
          v_ref := v_ref || jsonb_build_array(jsonb_build_object('attr_key', v_def.attr_key, 'reason', 'badPreset', 'detail', v_def.preset));
          CONTINUE;
        END IF;
      END IF;
      v_norm := v_norm || jsonb_build_object(v_def.attr_key, to_jsonb(v_txt));

    ELSIF v_def.attr_type = 'number' THEN
      IF jsonb_typeof(v_val) <> 'number' THEN
        v_ref := v_ref || jsonb_build_array(jsonb_build_object('attr_key', v_def.attr_key, 'reason', 'badType', 'detail', 'number'));
        CONTINUE;
      END IF;
      v_num := (v_val #>> '{}')::numeric;
      IF v_def.decimals IS NOT NULL AND scale(v_num) > v_def.decimals THEN
        v_ref := v_ref || jsonb_build_array(jsonb_build_object('attr_key', v_def.attr_key, 'reason', 'badDecimals', 'detail', v_def.decimals::text));
        CONTINUE;
      END IF;
      v_min := public.attr_bound_value(v_def.min_bound);
      v_max := public.attr_bound_value(v_def.max_bound);
      IF v_folds ? v_def.attr_key THEN
        v_min := greatest(v_min, NULLIF(v_folds->v_def.attr_key->>'min','')::numeric);
        v_max := least(v_max, NULLIF(v_folds->v_def.attr_key->>'max','')::numeric);
      END IF;
      IF (v_min IS NOT NULL AND v_num < v_min) OR (v_max IS NOT NULL AND v_num > v_max) THEN
        v_ref := v_ref || jsonb_build_array(jsonb_build_object(
          'attr_key', v_def.attr_key, 'reason', 'outOfBounds',
          'detail', coalesce(v_min::text,'-') || '..' || coalesce(v_max::text,'-')));
        CONTINUE;
      END IF;
      IF v_def.decimals IS NOT NULL THEN v_num := round(v_num, v_def.decimals); END IF;
      v_norm := v_norm || jsonb_build_object(v_def.attr_key, to_jsonb(v_num));

    ELSIF v_def.attr_type = 'boolean' THEN
      IF jsonb_typeof(v_val) <> 'boolean' THEN
        v_ref := v_ref || jsonb_build_array(jsonb_build_object('attr_key', v_def.attr_key, 'reason', 'badType', 'detail', 'boolean'));
        CONTINUE;
      END IF;
      v_norm := v_norm || jsonb_build_object(v_def.attr_key, v_val);

    ELSIF v_def.attr_type = 'date' THEN
      IF jsonb_typeof(v_val) <> 'string' OR (v_val #>> '{}') !~ '^[0-9]{4}-[0-9]{2}-[0-9]{2}$' THEN
        v_ref := v_ref || jsonb_build_array(jsonb_build_object('attr_key', v_def.attr_key, 'reason', 'badType', 'detail', 'date'));
        CONTINUE;
      END IF;
      v_norm := v_norm || jsonb_build_object(v_def.attr_key, to_jsonb(v_val #>> '{}'));

    ELSIF v_def.attr_type = 'range' THEN
      IF jsonb_typeof(v_val) <> 'object'
         OR jsonb_typeof(v_val->'min') <> 'number' OR jsonb_typeof(v_val->'max') <> 'number' THEN
        v_ref := v_ref || jsonb_build_array(jsonb_build_object('attr_key', v_def.attr_key, 'reason', 'badType', 'detail', 'range'));
        CONTINUE;
      END IF;
      v_norm := v_norm || jsonb_build_object(v_def.attr_key,
        jsonb_build_object('min', v_val->'min', 'max', v_val->'max'));

    ELSIF v_def.attr_type IN ('single_select','multi_select') THEN
      IF v_def.attr_type = 'single_select' THEN
        IF jsonb_typeof(v_val) = 'string' THEN
          v_list := jsonb_build_array(v_val);
        ELSIF jsonb_typeof(v_val) = 'object' AND jsonb_typeof(v_val->'value') = 'string' THEN
          v_list := jsonb_build_array(v_val->'value');
        ELSE
          v_ref := v_ref || jsonb_build_array(jsonb_build_object('attr_key', v_def.attr_key, 'reason', 'badType', 'detail', 'single_select'));
          CONTINUE;
        END IF;
      ELSE
        IF jsonb_typeof(v_val) <> 'array'
           OR EXISTS (SELECT 1 FROM jsonb_array_elements(v_val) x WHERE jsonb_typeof(x.value) <> 'string') THEN
          v_ref := v_ref || jsonb_build_array(jsonb_build_object('attr_key', v_def.attr_key, 'reason', 'badType', 'detail', 'multi_select'));
          CONTINUE;
        END IF;
        v_list := v_val;
        IF jsonb_array_length(v_list) > 20
           OR (SELECT count(DISTINCT x.value) FROM jsonb_array_elements(v_list) x) <> jsonb_array_length(v_list) THEN
          v_ref := v_ref || jsonb_build_array(jsonb_build_object('attr_key', v_def.attr_key, 'reason', 'badMulti'));
          CONTINUE;
        END IF;
      END IF;

      v_bad := false;
      v_seen := ARRAY[]::text[];
      FOR v_elem IN SELECT x.value FROM jsonb_array_elements(v_list) x LOOP
        v_txt := btrim(v_elem #>> '{}');
        SELECT true, coalesce((o.value->>'active')::boolean, true)
          INTO v_found, v_active
          FROM jsonb_array_elements(
                 CASE WHEN jsonb_typeof(v_def.options) = 'array' THEN v_def.options ELSE '[]'::jsonb END) o
         WHERE o.value->>'value' = v_txt
         LIMIT 1;
        IF NOT coalesce(v_found, false) THEN
          v_ref := v_ref || jsonb_build_array(jsonb_build_object('attr_key', v_def.attr_key, 'reason', 'unknownOption', 'detail', v_txt));
          v_bad := true;
        ELSIF NOT v_active
              AND NOT coalesce((v_prior -> v_def.attr_key) @> to_jsonb(v_txt), false)
              AND coalesce(v_prior ->> v_def.attr_key, '') <> v_txt THEN
          v_ref := v_ref || jsonb_build_array(jsonb_build_object('attr_key', v_def.attr_key, 'reason', 'inactiveOption', 'detail', v_txt));
          v_bad := true;
        ELSIF v_def.allowed_options IS NOT NULL
              AND NOT (v_txt = ANY (v_def.allowed_options))
              AND NOT coalesce((v_prior -> v_def.attr_key) @> to_jsonb(v_txt), false)
              AND coalesce(v_prior ->> v_def.attr_key, '') <> v_txt THEN
          -- D-spec 12 — the LINK narrows the definition's options.
          v_ref := v_ref || jsonb_build_array(jsonb_build_object('attr_key', v_def.attr_key, 'reason', 'optionNotAllowed', 'detail', v_txt));
          v_bad := true;
        END IF;
        v_seen := v_seen || v_txt;
        v_found := NULL; v_active := NULL;
      END LOOP;
      CONTINUE WHEN v_bad;

      -- `other` canonicalisation: { value:'other', text } with text <= 120.
      IF v_def.attr_type = 'single_select' AND 'other' = ANY (v_seen) AND v_allow_other THEN
        v_txt := btrim(coalesce(v_val->>'text', ''));
        IF v_txt = '' OR char_length(v_txt) > 120 THEN
          v_ref := v_ref || jsonb_build_array(jsonb_build_object('attr_key', v_def.attr_key, 'reason', 'otherNeedsText'));
          CONTINUE;
        END IF;
        v_norm := v_norm || jsonb_build_object(v_def.attr_key,
          jsonb_build_object('value', 'other', 'text', v_txt));
      ELSIF v_def.attr_type = 'single_select' THEN
        v_norm := v_norm || jsonb_build_object(v_def.attr_key, to_jsonb(v_seen[1]));
      ELSE
        v_norm := v_norm || jsonb_build_object(v_def.attr_key, to_jsonb(v_seen));
      END IF;

    ELSE
      v_ref := v_ref || jsonb_build_array(jsonb_build_object('attr_key', v_def.attr_key, 'reason', 'badType', 'detail', v_def.attr_type));
    END IF;
  END LOOP;

  IF jsonb_array_length(v_ref) > 0 THEN
    RETURN jsonb_build_object('ok', false, 'refusals', v_ref);
  END IF;
  RETURN jsonb_build_object('ok', true, 'attrs', v_norm);
END $$;

REVOKE ALL ON FUNCTION public.validate_listing_attributes(uuid, jsonb, jsonb) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.validate_listing_attributes(uuid, jsonb, jsonb) FROM anon;
GRANT EXECUTE ON FUNCTION public.validate_listing_attributes(uuid, jsonb, jsonb) TO authenticated;
GRANT ALL ON FUNCTION public.validate_listing_attributes(uuid, jsonb, jsonb) TO service_role;

-- ------------------- 7. admin_link_attribute — WHOLE, with the three cells
DROP FUNCTION IF EXISTS public.admin_link_attribute(uuid, uuid, boolean, boolean, integer);

CREATE OR REPLACE FUNCTION public.admin_link_attribute(
  p_category_id uuid,
  p_attribute_id uuid,
  p_is_required boolean,
  p_is_filterable boolean,
  p_display_order integer,
  p_allowed_options text[] DEFAULT NULL,
  p_default_value jsonb DEFAULT NULL,
  p_visible_when jsonb DEFAULT NULL
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_id uuid;
  v_refusal text;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'update') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('categories', 'update');

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
END $$;

REVOKE ALL ON FUNCTION public.admin_link_attribute(uuid, uuid, boolean, boolean, integer, text[], jsonb, jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_link_attribute(uuid, uuid, boolean, boolean, integer, text[], jsonb, jsonb) TO authenticated;
GRANT ALL ON FUNCTION public.admin_link_attribute(uuid, uuid, boolean, boolean, integer, text[], jsonb, jsonb) TO service_role;

-- ---------------- 8. admin_update_attribute_link — WHOLE, with the cells
-- p_clear_cells names the cells to CLEAR ('allowed_options', 'default_value',
-- 'visible_when'); a NULL parameter alone means "no change", so clearing is
-- always deliberate and never a silent side effect of an absent value.
DROP FUNCTION IF EXISTS public.admin_update_attribute_link(uuid, boolean, boolean);

CREATE OR REPLACE FUNCTION public.admin_update_attribute_link(
  p_link_id uuid,
  p_is_required boolean DEFAULT NULL,
  p_is_filterable boolean DEFAULT NULL,
  p_allowed_options text[] DEFAULT NULL,
  p_default_value jsonb DEFAULT NULL,
  p_visible_when jsonb DEFAULT NULL,
  p_clear_cells text[] DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_old public.category_attribute_links%ROWTYPE;
  v_new public.category_attribute_links%ROWTYPE;
  v_clear text[] := COALESCE(p_clear_cells, ARRAY[]::text[]);
  v_alw text[];
  v_dflt jsonb;
  v_vw jsonb;
  v_refusal text;
  v_seg text;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'update') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('categories', 'update');

  FOREACH v_seg IN ARRAY v_clear
  LOOP
    IF v_seg NOT IN ('allowed_options','default_value','visible_when') THEN
      RAISE EXCEPTION 'badClearCell:%', v_seg USING ERRCODE = 'P0010';
    END IF;
  END LOOP;

  SELECT * INTO v_old FROM public.category_attribute_links l WHERE l.id = p_link_id;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'admin.attributes.error.notFound' USING ERRCODE = 'P0010';
  END IF;

  -- The TARGET state of each cell: cleared, supplied, or unchanged.
  v_alw := CASE WHEN 'allowed_options' = ANY (v_clear) THEN NULL
                WHEN p_allowed_options IS NOT NULL THEN p_allowed_options
                ELSE v_old.allowed_options END;
  v_dflt := CASE WHEN 'default_value' = ANY (v_clear) THEN NULL
                 WHEN p_default_value IS NOT NULL AND jsonb_typeof(p_default_value) <> 'null'
                   THEN p_default_value
                 ELSE v_old.default_value END;
  v_vw := CASE WHEN 'visible_when' = ANY (v_clear) THEN NULL
               WHEN p_visible_when IS NOT NULL AND jsonb_typeof(p_visible_when) <> 'null'
                 THEN p_visible_when
               ELSE v_old.visible_when END;

  v_refusal := public.attr_link_cells_refusal(
    v_old.category_id, v_old.attribute_id, v_alw, v_dflt, v_vw);
  IF v_refusal IS NOT NULL THEN
    RAISE EXCEPTION '%', v_refusal USING ERRCODE = 'P0010';
  END IF;

  UPDATE public.category_attribute_links l
     SET is_required     = COALESCE(p_is_required, l.is_required),
         is_filterable   = COALESCE(p_is_filterable, l.is_filterable),
         allowed_options = v_alw,
         default_value   = v_dflt,
         visible_when    = v_vw,
         updated_at      = now()
   WHERE l.id = p_link_id;

  SELECT * INTO v_new FROM public.category_attribute_links l WHERE l.id = p_link_id;

  PERFORM public.log_audit('attribute.link_update', 'category_attribute_links', p_link_id::text,
    jsonb_build_object(
      'category_id', v_old.category_id,
      'attribute_id', v_old.attribute_id,
      'old', jsonb_build_object('is_required', v_old.is_required,
                                'is_filterable', v_old.is_filterable,
                                'allowed_options', v_old.allowed_options,
                                'default_value', v_old.default_value,
                                'visible_when', v_old.visible_when),
      'new', jsonb_build_object('is_required', v_new.is_required,
                                'is_filterable', v_new.is_filterable,
                                'allowed_options', v_new.allowed_options,
                                'default_value', v_new.default_value,
                                'visible_when', v_new.visible_when)));
END $$;

REVOKE ALL ON FUNCTION public.admin_update_attribute_link(uuid, boolean, boolean, text[], jsonb, jsonb, text[]) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_update_attribute_link(uuid, boolean, boolean, text[], jsonb, jsonb, text[]) TO authenticated;
GRANT ALL ON FUNCTION public.admin_update_attribute_link(uuid, boolean, boolean, text[], jsonb, jsonb, text[]) TO service_role;

-- --------------- 9. admin_set_coverage_plan — WHOLE, with the photo cap (D22)
DROP FUNCTION IF EXISTS public.admin_set_coverage_plan(text, integer, integer, integer, boolean);

CREATE OR REPLACE FUNCTION public.admin_set_coverage_plan(
  p_plan text,
  p_max_cities integer,
  p_max_regions integer,
  p_max_countries integer,
  p_allow_everywhere boolean,
  p_max_photos smallint DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_old public.coverage_plans;
  v_photos smallint;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'coverage', 'update') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('coverage', 'update');

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
END $$;

REVOKE ALL ON FUNCTION public.admin_set_coverage_plan(text, integer, integer, integer, boolean, smallint) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_set_coverage_plan(text, integer, integer, integer, boolean, smallint) TO authenticated;
GRANT ALL ON FUNCTION public.admin_set_coverage_plan(text, integer, integer, integer, boolean, smallint) TO service_role;

-- =====================================================================
-- IN-FILE PROOFS — P1 (D24), P2 (the cells through the door), P3 (D22).
-- Every assertion RAISES on failure. INC-222: a SCRATCH identity with an
-- in-transaction role grant and its own scratch session/factor/amr rows —
-- never a real user id, never a permission or step-up TOGGLE. Every scratch
-- row is removed at the end, the account FIRST.
-- =====================================================================
DO $proof$
DECLARE
  v_uid      uuid := gen_random_uuid();
  v_session  uuid := gen_random_uuid();
  v_factor   uuid := gen_random_uuid();
  v_cat      uuid;
  v_fuel     uuid;
  v_charge   uuid;
  v_link_f   uuid;
  v_link_c   uuid;
  v_res      jsonb;
  v_doc      jsonb;
  v_row      public.category_attribute_links%ROWTYPE;
  v_free     smallint;
  v_caps     jsonb;
  v_can      boolean := true;
  v_msg      text;
BEGIN
  ---------------------------------------------- scratch identity (INC-222)
  INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role,
                          created_at, updated_at)
  VALUES (v_uid, 'e2e-mmaint3-admin@example.invalid', '{}'::jsonb,
          'authenticated', 'authenticated', now(), now());

  INSERT INTO public.user_roles (user_id, role_id, scope_type)
  SELECT v_uid, r.id, 'global' FROM public.roles r WHERE r.name = 'super_admin';

  BEGIN
    INSERT INTO auth.sessions(id, user_id, created_at, updated_at, aal)
    VALUES (v_session, v_uid, now(), now(), 'aal2');
    INSERT INTO auth.mfa_factors(id, user_id, friendly_name, factor_type, status,
                                 created_at, updated_at, secret)
    VALUES (v_factor, v_uid, 'mmaint3-proof', 'totp', 'verified', now(), now(), 'PROOFSECRET');
    INSERT INTO auth.mfa_amr_claims(id, session_id, created_at, updated_at, authentication_method)
    VALUES (gen_random_uuid(), v_session, now(), now(), 'totp');
  EXCEPTION WHEN others THEN
    v_can := false;
  END;

  ---------------------------------------------- scratch taxonomy (a leaf)
  INSERT INTO public.categories (name_en, slug, price_enabled, is_active,
                                 allow_listings, display_order)
  VALUES ('E2E MMaint3 Leaf', 'e2e-mmaint3-leaf', true, true, true, 9997)
  RETURNING id INTO v_cat;

  INSERT INTO public.attributes (attr_key, name_en, attr_type, options)
  VALUES ('e2e_mmaint3_fuel', 'E2E MMaint3 Fuel', 'single_select',
          '[{"value":"petrol","label_en":"Petrol"},
            {"value":"electric","label_en":"Electric"},
            {"value":"plug_in_hybrid","label_en":"Plug-in hybrid"}]'::jsonb)
  RETURNING id INTO v_fuel;

  INSERT INTO public.attributes (attr_key, name_en, attr_type, options)
  VALUES ('e2e_mmaint3_charging_type', 'E2E MMaint3 Charging type', 'single_select',
          '[{"value":"type2","label_en":"Type 2"},
            {"value":"chademo","label_en":"CHAdeMO"}]'::jsonb)
  RETURNING id INTO v_charge;

  INSERT INTO public.category_attribute_links
    (category_id, attribute_id, is_required, is_filterable, display_order)
  VALUES (v_cat, v_fuel, false, false, 1)
  RETURNING id INTO v_link_f;

  INSERT INTO public.category_attribute_links
    (category_id, attribute_id, is_required, is_filterable, display_order)
  VALUES (v_cat, v_charge, true, false, 2)
  RETURNING id INTO v_link_c;

  IF v_can THEN
    PERFORM set_config('request.jwt.claims',
      json_build_object('sub', v_uid::text, 'role', 'authenticated', 'aal', 'aal2',
                        'session_id', v_session::text)::text, true);

    -- P1 — the CONDITION is set THROUGH THE LINK DOOR.
    PERFORM public.admin_update_attribute_link(
      v_link_c, NULL, NULL, NULL, NULL,
      jsonb_build_object('key', 'e2e_mmaint3_fuel',
                         'in', jsonb_build_array('electric', 'plug_in_hybrid')));
  ELSE
    RAISE NOTICE 'P1/P2/P3 DOOR PATH DEFERRED: auth.* is not writable here';
    UPDATE public.category_attribute_links
       SET visible_when = jsonb_build_object('key', 'e2e_mmaint3_fuel',
                            'in', jsonb_build_array('electric', 'plug_in_hybrid'))
     WHERE id = v_link_c;
  END IF;

  SELECT * INTO v_row FROM public.category_attribute_links WHERE id = v_link_c;
  IF v_row.visible_when IS DISTINCT FROM
     jsonb_build_object('key','e2e_mmaint3_fuel','in',jsonb_build_array('electric','plug_in_hybrid')) THEN
    RAISE EXCEPTION 'P1 FAILED (set) — %', v_row.visible_when;
  END IF;

  -- P1a — condition NOT met: charging_type is absent, not required.
  v_res := public.validate_listing_attributes(v_cat,
             jsonb_build_object('e2e_mmaint3_fuel', 'petrol'), NULL);
  IF (v_res->>'ok') <> 'true' OR (v_res->'attrs') ? 'e2e_mmaint3_charging_type' THEN
    RAISE EXCEPTION 'P1 FAILED (unmet condition should pass) — %', v_res;
  END IF;

  -- P1b — condition MET and the answer missing: refused by name.
  v_res := public.validate_listing_attributes(v_cat,
             jsonb_build_object('e2e_mmaint3_fuel', 'electric'), NULL);
  IF (v_res->>'ok') <> 'false'
     OR NOT EXISTS (SELECT 1 FROM jsonb_array_elements(v_res->'refusals') r
                     WHERE r.value->>'attr_key' = 'e2e_mmaint3_charging_type'
                       AND r.value->>'reason' = 'required') THEN
    RAISE EXCEPTION 'P1 FAILED (met condition should require) — %', v_res;
  END IF;

  -- P1c — a value sent for an UNMET condition is DROPPED, never stored.
  v_res := public.validate_listing_attributes(v_cat,
             jsonb_build_object('e2e_mmaint3_fuel', 'petrol',
                                'e2e_mmaint3_charging_type', 'type2'), NULL);
  IF (v_res->>'ok') <> 'true' OR (v_res->'attrs') ? 'e2e_mmaint3_charging_type' THEN
    RAISE EXCEPTION 'P1 FAILED (hidden value must be dropped) — %', v_res;
  END IF;

  -- P1d — the posting read projects the condition AND the plan document.
  v_doc := public.get_posting_schema(v_cat);
  IF NOT EXISTS (SELECT 1 FROM jsonb_array_elements(v_doc->'attributes') x
                  WHERE x.value->>'attr_key' = 'e2e_mmaint3_charging_type'
                    AND x.value->'visible_when'->>'key' = 'e2e_mmaint3_fuel')
     OR (v_doc->'plan'->>'max_photos') IS NULL THEN
    RAISE EXCEPTION 'P1 FAILED (schema projection) — %', v_doc->'plan';
  END IF;

  IF v_can THEN
    -- P1e — a condition naming a key NOT in the category refuses BY NAME.
    v_msg := NULL;
    BEGIN
      PERFORM public.admin_update_attribute_link(
        v_link_c, NULL, NULL, NULL, NULL,
        jsonb_build_object('key', 'e2e_mmaint3_absent', 'in', jsonb_build_array('x')));
    EXCEPTION WHEN others THEN
      v_msg := SQLERRM;
    END;
    IF COALESCE(v_msg,'') NOT LIKE 'badVisibleWhen:unknownSibling%' THEN
      RAISE EXCEPTION 'P1 FAILED (badVisibleWhen) — %', COALESCE(v_msg, 'no refusal');
    END IF;
    SELECT * INTO v_row FROM public.category_attribute_links WHERE id = v_link_c;
    IF v_row.visible_when->>'key' <> 'e2e_mmaint3_fuel' THEN
      RAISE EXCEPTION 'P1 FAILED — a refused attempt left a trace';
    END IF;

    -- ------------------------------------------------------------- P2
    -- All three cells set, then cleared, through the same door.
    PERFORM public.admin_update_attribute_link(
      v_link_c, true, NULL, ARRAY['type2'], to_jsonb('type2'::text),
      jsonb_build_object('key','e2e_mmaint3_fuel','in',jsonb_build_array('electric')));
    SELECT * INTO v_row FROM public.category_attribute_links WHERE id = v_link_c;
    IF v_row.allowed_options IS DISTINCT FROM ARRAY['type2']
       OR v_row.default_value IS DISTINCT FROM '"type2"'::jsonb
       OR v_row.visible_when->'in' <> jsonb_build_array('electric') THEN
      RAISE EXCEPTION 'P2 FAILED (set) — % / % / %',
        v_row.allowed_options, v_row.default_value, v_row.visible_when;
    END IF;

    IF NOT EXISTS (
      SELECT 1 FROM public.audit_log a
       WHERE a.action = 'attribute.link_update'
         AND a.entity_id = v_link_c::text
         AND a.meta->'new'->'allowed_options' @> '["type2"]'::jsonb
         AND (a.meta->'old') IS NOT NULL) THEN
      RAISE EXCEPTION 'P2 FAILED — the revision did not capture before/after';
    END IF;

    -- a default outside the shortlist refuses BY NAME, writing nothing
    v_msg := NULL;
    BEGIN
      PERFORM public.admin_update_attribute_link(
        v_link_c, NULL, NULL, NULL, to_jsonb('chademo'::text), NULL);
    EXCEPTION WHEN others THEN
      v_msg := SQLERRM;
    END;
    IF COALESCE(v_msg,'') NOT LIKE 'badDefault:notInOptions%' THEN
      RAISE EXCEPTION 'P2 FAILED (badDefault) — %', COALESCE(v_msg, 'no refusal');
    END IF;

    PERFORM public.admin_update_attribute_link(
      v_link_c, NULL, NULL, NULL, NULL, NULL,
      ARRAY['allowed_options','default_value','visible_when']);
    SELECT * INTO v_row FROM public.category_attribute_links WHERE id = v_link_c;
    IF v_row.allowed_options IS NOT NULL OR v_row.default_value IS NOT NULL
       OR v_row.visible_when IS NOT NULL THEN
      RAISE EXCEPTION 'P2 FAILED (clear) — % / % / %',
        v_row.allowed_options, v_row.default_value, v_row.visible_when;
    END IF;

    -- ------------------------------------------------------------- P3 (D22)
    -- Plans are NOT per-seller: seller_plan() answers 'free' for everyone, so
    -- the cap is read back through plan_caps for the scratch plan by name.
    SELECT max_photos INTO v_free FROM public.coverage_plans WHERE plan = 'free';

    -- The door's plan shape is `^[a-z_]{2,32}$` — letters only, so the scratch
    -- plan's axes are SPELLED (the CV-5 convention).
    PERFORM public.admin_set_coverage_plan('e_probe_mmaint_three', 1, 1, 1, false, 3::smallint);
    v_caps := public.plan_caps('e_probe_mmaint_three');
    IF (v_caps->>'max_photos') <> '3' THEN
      RAISE EXCEPTION 'P3 FAILED (cap not stored) — %', v_caps;
    END IF;

    v_msg := NULL;
    BEGIN
      PERFORM public.admin_set_coverage_plan('e_probe_mmaint_three', 1, 1, 1, false, 31::smallint);
    EXCEPTION WHEN others THEN
      v_msg := SQLERRM;
    END;
    IF COALESCE(v_msg,'') <> 'badMaxPhotos' THEN
      RAISE EXCEPTION 'P3 FAILED (badMaxPhotos) — %', COALESCE(v_msg, 'no refusal');
    END IF;
    IF (public.plan_caps('e_probe_mmaint_three')->>'max_photos') <> '3' THEN
      RAISE EXCEPTION 'P3 FAILED — a refused attempt changed the cap';
    END IF;

    IF (SELECT max_photos FROM public.coverage_plans WHERE plan = 'free') IS DISTINCT FROM v_free THEN
      RAISE EXCEPTION 'P3 FAILED — the real free plan was touched';
    END IF;

    DELETE FROM public.coverage_plans WHERE plan = 'e_probe_mmaint_three';
    PERFORM set_config('request.jwt.claims', '{}', true);
  END IF;

  ---------------- cleanup: the account FIRST, then the scratch rows ----------
  DELETE FROM auth.users WHERE id = v_uid;
  DELETE FROM public.user_roles WHERE user_id = v_uid;
  DELETE FROM public.profiles WHERE user_id = v_uid;
  DELETE FROM public.user_directory WHERE user_id = v_uid;
  DELETE FROM auth.mfa_amr_claims WHERE session_id = v_session;
  DELETE FROM auth.mfa_factors WHERE id = v_factor;
  DELETE FROM auth.sessions WHERE id = v_session;
  -- public.audit_log is APPEND-ONLY (its own trigger refuses a delete): the
  -- proof's audit trail stays, which is the point of a ledger.
  DELETE FROM public.coverage_plans WHERE plan = 'e_probe_mmaint_three';
  DELETE FROM public.category_attribute_links WHERE category_id = v_cat;
  DELETE FROM public.attributes WHERE id IN (v_fuel, v_charge);
  DELETE FROM public.category_tree_pointers WHERE child_id = v_cat OR parent_id = v_cat;
  DELETE FROM public.categories WHERE id = v_cat;

  IF EXISTS (SELECT 1 FROM public.categories WHERE slug = 'e2e-mmaint3-leaf')
     OR EXISTS (SELECT 1 FROM public.attributes WHERE attr_key LIKE 'e2e_mmaint3%')
     OR EXISTS (SELECT 1 FROM public.coverage_plans WHERE plan = 'e_probe_mmaint_three')
     OR EXISTS (SELECT 1 FROM auth.users WHERE id = v_uid) THEN
    RAISE EXCEPTION 'PROOF CLEANUP FAILED — scratch residue remains';
  END IF;

  RAISE NOTICE 'P1 + P2 + P3 PASSED — scratch identity and rows removed.';
END $proof$;

-- ------------------------------------------------------------ READ-BACKS
DO $readback$
DECLARE r record;
BEGIN
  FOR r IN
    SELECT p.proname || '(' || pg_get_function_identity_arguments(p.oid) || ')' AS sig,
           md5(p.prosrc) AS body_md5,
           p.prosecdef AS definer
      FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
     WHERE n.nspname = 'public'
       AND p.proname IN ('attr_visible_when_ok','attr_visible_when_met',
                         'attr_link_cells_refusal','get_posting_schema',
                         'validate_listing_attributes','admin_link_attribute',
                         'admin_update_attribute_link','admin_set_coverage_plan')
     ORDER BY 1
  LOOP
    RAISE NOTICE 'READ-BACK fn % definer=% md5=%', r.sig, r.definer, r.body_md5;
  END LOOP;

  FOR r IN
    SELECT c.column_name, c.data_type, c.is_nullable
      FROM information_schema.columns c
     WHERE c.table_schema = 'public' AND c.table_name = 'category_attribute_links'
     ORDER BY c.ordinal_position
  LOOP
    RAISE NOTICE 'READ-BACK category_attribute_links.% % null=%',
      r.column_name, r.data_type, r.is_nullable;
  END LOOP;

  FOR r IN
    SELECT con.conname, pg_get_constraintdef(con.oid) AS def
      FROM pg_constraint con
      JOIN pg_class cl ON cl.oid = con.conrelid
     WHERE cl.relname = 'category_attribute_links' AND con.contype = 'c'
     ORDER BY 1
  LOOP
    RAISE NOTICE 'READ-BACK check % = %', r.conname, r.def;
  END LOOP;
END $readback$;

-- --------------------------------------------------------------- THE MARK
INSERT INTO public.migration_marks (version)
VALUES ('20260920000004')
ON CONFLICT DO NOTHING;