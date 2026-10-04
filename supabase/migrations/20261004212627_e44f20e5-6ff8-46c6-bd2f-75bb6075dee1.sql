-- M6 — bundle 4, step 30: the door side of Part G (steps 26, 27, 29), one file.
-- Brief: docs/governance/briefs/bundle-4.md (Part G). Censuses (read on
-- ethio-prod 2026-10-04, recorded in docs/governance/briefs/bundle-4-census.md):
--   step 26 — direct readers of a condition's ->>'key': attr_link_cells_refusal,
--     attr_export_payload and attr_import_plan's own parse; every other reader
--     calls attr_visible_when_ok / attr_visible_when_met (validate_listing_attributes,
--     validate_listing_draft, price_basis_in_force) or passes the value through
--     (admin_link_attribute, admin_update_attribute_link, admin_commit/undo_attribute_import,
--     admin_list_*_links, get_posting_schema). CHECK category_attribute_links_visible_when_shape
--     calls attr_visible_when_ok; the widening keeps every stored row valid.
--   step 29 — the one door that judges help text is attr_cell_check, called by
--     admin_upsert_attribute and attr_import_plan; entity_translations holds no
--     attribute help text (attribute.label only). attr_cell_check becomes STABLE
--     (it now reads categories); no constraint or index uses it.
-- Every function is redeclared WHOLE from live (each live prosrc md5 equals the
-- latest declaration in this tree), keeping arguments, defaults, SECURITY
-- DEFINER and search_path; volatility as live except attr_cell_check.
-- get_posting_schema drops price_basis_key only; no code reads it (grep in the
-- M6 report). No function is dropped: no argument list changes.
-- Nothing changes what the present screens receive: no stored row changes,
-- and the new members ("and", "settled", {category:…}) appear only once the
-- curator writes them.
-- e2e-areas: posting, admin-attributes
-- Mark: 20261005100000 (≥ this file's stamp, chosen ≥12 hours ahead).

-- ── 1. attr_visible_when_ok ─────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.attr_visible_when_ok(p_vw jsonb)
RETURNS boolean
LANGUAGE sql
IMMUTABLE
SET search_path TO 'public'
AS $m6$
  -- M6 / INC-381 — one optional "and" pair: {"key","in","and":{"key","in"}}.
  -- The inner object holds key and in only (no second "and"), and its key
  -- differs from the outer key. Each pair is judged as the single pair was.
  SELECT CASE
    WHEN p_vw IS NULL OR jsonb_typeof(p_vw) = 'null' THEN true
    WHEN jsonb_typeof(p_vw) <> 'object' THEN false
    WHEN EXISTS (SELECT 1 FROM jsonb_object_keys(p_vw) k WHERE k NOT IN ('key','in','and')) THEN false
    WHEN jsonb_typeof(p_vw->'key') <> 'string' THEN false
    WHEN COALESCE(p_vw->>'key','') !~ '^[a-z0-9_][a-z0-9_-]{1,63}$' THEN false
    WHEN jsonb_typeof(p_vw->'in') <> 'array' THEN false
    WHEN jsonb_array_length(p_vw->'in') < 1 OR jsonb_array_length(p_vw->'in') > 64 THEN false
    WHEN EXISTS (SELECT 1 FROM jsonb_array_elements(p_vw->'in') e
                  WHERE jsonb_typeof(e.value) <> 'string'
                     OR btrim(e.value #>> '{}') = '') THEN false
    WHEN NOT (p_vw ? 'and') THEN true
    WHEN jsonb_typeof(p_vw->'and') <> 'object' THEN false
    WHEN EXISTS (SELECT 1 FROM jsonb_object_keys(p_vw->'and') k WHERE k NOT IN ('key','in')) THEN false
    WHEN jsonb_typeof(p_vw->'and'->'key') <> 'string' THEN false
    WHEN COALESCE(p_vw->'and'->>'key','') !~ '^[a-z0-9_][a-z0-9_-]{1,63}$' THEN false
    WHEN (p_vw->'and'->>'key') = (p_vw->>'key') THEN false
    WHEN jsonb_typeof(p_vw->'and'->'in') <> 'array' THEN false
    WHEN jsonb_array_length(p_vw->'and'->'in') < 1 OR jsonb_array_length(p_vw->'and'->'in') > 64 THEN false
    WHEN EXISTS (SELECT 1 FROM jsonb_array_elements(p_vw->'and'->'in') e
                  WHERE jsonb_typeof(e.value) <> 'string'
                     OR btrim(e.value #>> '{}') = '') THEN false
    ELSE true
  END;
$m6$;
REVOKE ALL ON FUNCTION public.attr_visible_when_ok(jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.attr_visible_when_ok(jsonb) TO authenticated;
GRANT ALL ON FUNCTION public.attr_visible_when_ok(jsonb) TO service_role;

-- ── 2. attr_visible_when_met ─────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.attr_visible_when_met(p_attrs jsonb, p_prior jsonb, p_vw jsonb)
RETURNS boolean
LANGUAGE sql
IMMUTABLE
SET search_path TO 'public'
AS $m6$
  -- M6 / INC-381 — every pair present (the outer one, and "and" when set)
  -- must hold; a multi-select or "other" answer counts through
  -- attr_answer_tokens as before.
  SELECT CASE
    WHEN p_vw IS NULL OR jsonb_typeof(p_vw) = 'null' THEN true
    ELSE NOT EXISTS (
      SELECT 1
        FROM (VALUES (p_vw), (p_vw->'and')) AS c(pair)
       WHERE c.pair IS NOT NULL
         AND jsonb_typeof(c.pair) = 'object'
         AND NOT EXISTS (
           SELECT 1
             FROM (SELECT COALESCE(p_attrs -> (c.pair->>'key'), p_prior -> (c.pair->>'key')) AS val) x,
                  jsonb_array_elements_text(c.pair->'in') AS t(v)
            WHERE x.val IS NOT NULL
              AND t.v = ANY (public.attr_answer_tokens(x.val))))
  END;
$m6$;
REVOKE ALL ON FUNCTION public.attr_visible_when_met(jsonb, jsonb, jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.attr_visible_when_met(jsonb, jsonb, jsonb) TO authenticated;
GRANT ALL ON FUNCTION public.attr_visible_when_met(jsonb, jsonb, jsonb) TO service_role;

-- ── 3. attr_cell_check ─────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.attr_cell_check(
  p_type text, p_unit text, p_min text, p_max text, p_decimals integer,
  p_format text, p_preset text, p_max_length integer, p_help_en text, p_help_am text)
RETURNS text
LANGUAGE plpgsql
STABLE
SET search_path TO 'public'
AS $m6$
DECLARE
  v_tok text;
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

  -- M6 / DEC-095 — a {category:<slug>} token names an active category that
  -- accepts ads; anything else is refused.
  SELECT 'help_text_' || h.lang || '|unknownCategoryToken|' || m[1] INTO v_tok
    FROM (VALUES (1, 'en', p_help_en), (2, 'am', p_help_am)) AS h(n, lang, txt)
    CROSS JOIN LATERAL regexp_matches(COALESCE(h.txt, ''), '\{category:([^}]*)\}', 'g') AS m
   WHERE NOT EXISTS (SELECT 1 FROM public.categories c
                      WHERE c.slug = m[1] AND c.is_active AND c.allow_listings)
   ORDER BY h.n
   LIMIT 1;
  IF v_tok IS NOT NULL THEN
    RETURN v_tok;
  END IF;

  RETURN NULL;
END $m6$;
REVOKE ALL ON FUNCTION public.attr_cell_check(text, text, text, text, integer, text, text, integer, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.attr_cell_check(text, text, text, text, integer, text, text, integer, text, text) TO authenticated;
GRANT ALL ON FUNCTION public.attr_cell_check(text, text, text, text, integer, text, text, integer, text, text) TO service_role;

-- ── 4. attr_option_shape ─────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.attr_option_shape(p_key text, p_options jsonb)
RETURNS text
LANGUAGE plpgsql
IMMUTABLE
SET search_path TO 'public'
AS $m6$
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
  v_sw      text;
BEGIN
  IF p_options IS NULL OR jsonb_typeof(p_options) <> 'array' THEN RETURN NULL; END IF;

  FOR v_opt IN SELECT value FROM jsonb_array_elements(p_options)
  LOOP
    CONTINUE WHEN jsonb_typeof(v_opt) <> 'object';
    v_val := COALESCE(v_opt->>'value', '');

    FOR v_k IN SELECT k FROM jsonb_object_keys(v_opt) k
    LOOP
      IF v_k NOT IN ('value','label_en','label_am','parent','active','bounds','aliases','allowed','facts','swatch') THEN
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
        IF EXISTS (SELECT 1 FROM jsonb_object_keys(v_b) bk WHERE bk NOT IN ('min','max','settled')) THEN
          RETURN p_key || '|' || v_val || '|boundsUnknownKey:' || v_k;
        END IF;
        -- M6 / INC-374 — "settled" only as the boolean true, and only beside
        -- a numeric min and max.
        IF v_b ? 'settled'
           AND (v_b->'settled' IS DISTINCT FROM 'true'::jsonb
                OR jsonb_typeof(v_b->'min') IS DISTINCT FROM 'number'
                OR jsonb_typeof(v_b->'max') IS DISTINCT FROM 'number') THEN
          RETURN p_key || '|' || v_val || '|boundsSettledNeedsRange:' || v_k;
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
        -- Bundle 2 step 19 — the ceiling on an option's allowed list is 150.
        IF v_n > 150 THEN
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

    -- D18 — `facts` is a PREFILL, never a rule: an object of attribute keys to
    -- a scalar or a list of strings, at most 20 entries. The validator never
    -- reads it; the options read projects it for the form. BOUNDS ENFORCE,
    -- FACTS PREFILL.
    -- INC-236 — the KEY charset is the DEFINITION-KEY charset
    -- (^[a-z0-9_][a-z0-9_-]{1,63}$, hyphens allowed, matching attribute_key),
    -- so a real definition key such as 'fuel_type-vehicles' is accepted. The
    -- refusal text is unchanged: badFacts:key:<k>.
    IF v_opt ? 'facts' THEN
      IF jsonb_typeof(v_opt->'facts') <> 'object' THEN
        RETURN p_key || '|' || v_val || '|badFacts:notObject';
      END IF;
      IF (SELECT count(*) FROM jsonb_object_keys(v_opt->'facts') fk) > 20 THEN
        RETURN p_key || '|' || v_val || '|badFacts:tooMany';
      END IF;
      FOR v_k IN SELECT k FROM jsonb_object_keys(v_opt->'facts') k
      LOOP
        IF v_k !~ '^[a-z0-9_][a-z0-9_-]{1,63}$' THEN
          RETURN p_key || '|' || v_val || '|badFacts:key:' || v_k;
        END IF;
        v_b := v_opt->'facts'->v_k;
        IF jsonb_typeof(v_b) = 'array' THEN
          v_n := jsonb_array_length(v_b);
          IF v_n < 1 OR v_n > 20 THEN
            RETURN p_key || '|' || v_val || '|badFacts:listLength:' || v_k;
          END IF;
          IF EXISTS (SELECT 1 FROM jsonb_array_elements(v_b) x
                      WHERE jsonb_typeof(x.value) <> 'string') THEN
            RETURN p_key || '|' || v_val || '|badFacts:listNotStrings:' || v_k;
          END IF;
        ELSIF jsonb_typeof(v_b) NOT IN ('string','number','boolean') THEN
          RETURN p_key || '|' || v_val || '|badFacts:value:' || v_k;
        END IF;
      END LOOP;
    END IF;

    -- D28 / M-SWATCH — WHAT COLOUR THIS OPTION IS, said by the catalogue. One
    -- STRING in exactly three spellings; anything else is refused by name, so a
    -- colour WORD ('red') or a short hex ('#GGG') can never land.
    IF v_opt ? 'swatch' THEN
      IF jsonb_typeof(v_opt->'swatch') <> 'string' THEN
        RETURN p_key || '|' || v_val || '|badSwatch:notString';
      END IF;
      v_sw := btrim(v_opt->>'swatch');
      IF v_sw = '' THEN
        RETURN p_key || '|' || v_val || '|badSwatch:empty';
      END IF;
      IF v_sw ~ '^pattern:' THEN
        v_k := lower(btrim(substring(v_sw from 9)));
        IF v_k NOT IN ('tabby','brindle','calico','tricolour','multicolour','striped') THEN
          RETURN p_key || '|' || v_val || '|badSwatch:pattern:' || v_k;
        END IF;
      ELSIF v_sw !~ '^#[0-9a-fA-F]{6}$'
        AND v_sw !~ '^#[0-9a-fA-F]{6}\|#[0-9a-fA-F]{6}$' THEN
        RETURN p_key || '|' || v_val || '|badSwatch:' || v_sw;
      END IF;
    END IF;
  END LOOP;

  RETURN NULL;
END $m6$;
REVOKE ALL ON FUNCTION public.attr_option_shape(text, jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.attr_option_shape(text, jsonb) TO authenticated;
GRANT ALL ON FUNCTION public.attr_option_shape(text, jsonb) TO service_role;

-- ── 5. attr_link_cells_refusal ─────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.attr_link_cells_refusal(
  p_category_id uuid, p_attribute_id uuid, p_allowed text[], p_default jsonb, p_visible_when jsonb)
RETURNS text
LANGUAGE plpgsql
STABLE
SET search_path TO 'public'
AS $m6$
DECLARE
  v_self   text;
  v_type   text;
  v_opts   jsonb;
  v_vals   text[];
  v_eff    text[];
  v_pool   text[];
  v_seg    text;
  v_pair   jsonb;
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
    -- M6 / INC-381 — each pair (the outer one, then "and") is judged alike.
    FOR v_pair IN SELECT c.pair FROM (VALUES (1, p_visible_when), (2, p_visible_when->'and')) AS c(n, pair)
                   WHERE c.pair IS NOT NULL ORDER BY c.n
    LOOP
      IF (v_pair->>'key') = v_self THEN
        RETURN 'badVisibleWhen:self';
      END IF;
      IF NOT EXISTS (
        SELECT 1
          FROM public.effective_category_links(p_category_id) el
          JOIN public.attributes a2 ON a2.id = el.attribute_id
         WHERE a2.attr_key = (v_pair->>'key')) THEN
        RETURN 'badVisibleWhen:unknownSibling:' || (v_pair->>'key');
      END IF;
      SELECT COALESCE(array_agg(o.value->>'value'), ARRAY[]::text[]) INTO v_pool
        FROM public.attributes a2
        CROSS JOIN LATERAL jsonb_array_elements(public.attr_option_norm(a2.options)) o
       WHERE a2.attr_key = (v_pair->>'key');
      FOR v_seg IN SELECT t.v FROM jsonb_array_elements_text(v_pair->'in') AS t(v)
      LOOP
        IF NOT (v_seg = ANY (COALESCE(v_pool, ARRAY[]::text[]))) THEN
          RETURN 'badVisibleWhen:notInOptions:' || v_seg;
        END IF;
      END LOOP;
    END LOOP;
  END IF;

  RETURN NULL;
END $m6$;
REVOKE ALL ON FUNCTION public.attr_link_cells_refusal(uuid, uuid, text[], jsonb, jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.attr_link_cells_refusal(uuid, uuid, text[], jsonb, jsonb) TO authenticated;
GRANT ALL ON FUNCTION public.attr_link_cells_refusal(uuid, uuid, text[], jsonb, jsonb) TO service_role;

-- ── 6. attr_export_payload ─────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.attr_export_payload(p_scope_slug text)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SET search_path TO 'public'
AS $m6$
DECLARE
  v_defs  jsonb;
  v_links jsonb;
  v_scope uuid;
  v_keys  text[];
BEGIN
  IF p_scope_slug IS NOT NULL THEN
    SELECT c.id INTO v_scope FROM public.categories c WHERE c.slug = p_scope_slug;
    IF v_scope IS NULL THEN
      RAISE EXCEPTION 'unknown category scope';
    END IF;
  END IF;

  -- INH-1: both walks follow the PRIMARY lineage only.
  WITH RECURSIVE scope AS (
    SELECT v_scope AS id, 0 AS d
    UNION ALL
    SELECT c.id, s.d + 1
      FROM scope s
      JOIN public.categories c ON public.cat_primary_parent(c.id) = s.id
     WHERE s.d < 10
  ),
  anc AS (
    SELECT c.id AS cat_id, c.id AS src_id, 0 AS depth
      FROM public.categories c
    UNION ALL
    SELECT a.cat_id, public.cat_primary_parent(a.src_id), a.depth + 1
      FROM anc a
     WHERE a.depth < 10
       AND public.cat_primary_parent(a.src_id) IS NOT NULL
  ),
  pathq AS (
    SELECT c.id, c.id AS cur, c.name_en::text AS path, 0 AS d
      FROM public.categories c
    UNION ALL
    -- INC-306 / DEC-080 — the home is the one home reader's verdict; the walk
    -- stops where it answers NULL (a root).
    SELECT q.id, pp.parent_id, cp.name_en || ' / ' || q.path, q.d + 1
      FROM pathq q
      JOIN LATERAL (
             SELECT public.cat_primary_parent(q.cur) AS parent_id
           ) pp ON pp.parent_id IS NOT NULL
      JOIN public.categories cp ON cp.id = pp.parent_id
     WHERE q.d < 10
  ),
  best_path AS (
    SELECT DISTINCT ON (id) id, path FROM pathq ORDER BY id, d DESC
  ),
  eff AS (
    SELECT DISTINCT ON (anc.cat_id, l.attribute_id)
           anc.cat_id,
           l.attribute_id,
           l.is_required,
           l.is_filterable,
           l.card_rank,
           -- M-MAINT-2 Part B — the two per-link cells travel with the link.
           l.allowed_options,
           l.default_value,
           -- M-MAINT-3b — and the D24 condition.
           l.visible_when,
           -- M-ORDER — the link's own display_order travels with it.
           l.display_order,
           src.slug AS origin
      FROM anc
      JOIN public.category_attribute_links l ON l.category_id = anc.src_id
      JOIN public.categories src ON src.id = anc.src_id
     WHERE p_scope_slug IS NULL OR anc.cat_id IN (SELECT s.id FROM scope s)
     ORDER BY anc.cat_id, l.attribute_id, anc.depth ASC, src.slug
  )
  SELECT COALESCE(jsonb_agg(r.row ORDER BY r.path, r.attr_key), '[]'::jsonb)
    INTO v_links
    FROM (
      SELECT bp.path,
             a.attr_key,
             jsonb_build_object(
               'category_path', bp.path,
               'category_slug', c.slug,
               'attribute_key', a.attr_key,
               'is_required', CASE WHEN eff.is_required THEN 'true' ELSE 'false' END,
               'is_filterable', CASE WHEN eff.is_filterable THEN 'true' ELSE 'false' END,
               'card_rank', COALESCE(eff.card_rank::text, ''),
               'origin', COALESCE(eff.origin, ''),
               -- the two new cells, AFTER the existing ones (round-trip shape)
               'allowed_options', COALESCE(array_to_string(eff.allowed_options, '|'), ''),
               'default_value', COALESCE(
                 CASE WHEN eff.default_value IS NULL THEN NULL
                      WHEN jsonb_typeof(eff.default_value) = 'array'
                        THEN (SELECT string_agg(t.v, '|')
                                FROM jsonb_array_elements_text(eff.default_value) AS t(v))
                      ELSE eff.default_value #>> '{}' END,
                 ''),
               -- M-MAINT-3b — the condition, AFTER default_value, as
               -- '<sibling key>=<value>|<value>…'. NULL → '' (a blank cell
               -- changes nothing on re-import, so the export round-trips).
               'visible_when', COALESCE(
                 CASE WHEN eff.visible_when IS NULL
                        OR jsonb_typeof(eff.visible_when) = 'null' THEN NULL
                      ELSE (eff.visible_when->>'key') || '='
                           || (SELECT string_agg(t.v, '|')
                                 FROM jsonb_array_elements_text(eff.visible_when->'in') AS t(v))
                           -- M6 / INC-381 — the second pair as '&<key>=<value>|…'.
                           || CASE WHEN jsonb_typeof(eff.visible_when->'and') = 'object'
                                   THEN '&' || (eff.visible_when->'and'->>'key') || '='
                                        || (SELECT string_agg(t.v, '|')
                                              FROM jsonb_array_elements_text(eff.visible_when->'and'->'in') AS t(v))
                                   ELSE '' END
                 END,
                 ''),
               -- M-ORDER — display_order, AFTER visible_when, plain text.
               'display_order', COALESCE(eff.display_order::text, '')
             ) AS row
        FROM eff
        JOIN public.categories c ON c.id = eff.cat_id
        JOIN public.attributes a ON a.id = eff.attribute_id
        JOIN best_path bp ON bp.id = eff.cat_id
    ) r;

  SELECT array_agg(DISTINCT x->>'attribute_key')
    INTO v_keys
    FROM jsonb_array_elements(v_links) x;

  SELECT COALESCE(jsonb_agg(d.row ORDER BY d.attr_key), '[]'::jsonb)
    INTO v_defs
    FROM (
      SELECT a.attr_key,
             jsonb_build_object(
               'attribute_key', a.attr_key,
               'label_en', COALESCE(a.name_en, ''),
               'label_am', COALESCE(t.value, a.name_am, ''),
               'type', COALESCE(a.attr_type, ''),
               'options', COALESCE(
                 (SELECT string_agg(o.x, '|' ORDER BY o.ord)
                    FROM jsonb_array_elements_text(
                           CASE WHEN jsonb_typeof(a.options) = 'array'
                                THEN a.options ELSE '[]'::jsonb END
                         ) WITH ORDINALITY AS o(x, ord)),
                 ''),
               'depends_on', COALESCE(
                 (SELECT p.attr_key FROM public.attributes p WHERE p.id = a.depends_on), ''),
               -- DEC-050 L2b-mig — the nine v2 cells, plain text, NULL → ''.
               'unit', COALESCE(a.unit, ''),
               'min', COALESCE(a.min_bound, ''),
               'max', COALESCE(a.max_bound, ''),
               'decimals', COALESCE(a.decimals::text, ''),
               'format', COALESCE(a.format, ''),
               'preset', COALESCE(a.preset, ''),
               'max_length', COALESCE(a.max_length::text, ''),
               'help_text_en', COALESCE(a.help_text_en, ''),
               'help_text_am', COALESCE(a.help_text_am, ''),
               'is_per_variant', '',
               'direct_link_count',
                 (SELECT count(*)::text FROM public.category_attribute_links l
                   WHERE l.attribute_id = a.id)
             ) AS row
        FROM public.attributes a
        LEFT JOIN public.entity_translations t
               ON t.entity_type = 'attribute'
              AND t.entity_id = a.id
              AND t.field = 'label'
              AND t.lang_code = 'am'
              AND t.status = 'approved'
       WHERE p_scope_slug IS NULL
          OR a.attr_key = ANY(COALESCE(v_keys, ARRAY[]::text[]))
    ) d;

  RETURN jsonb_build_object('definitions', v_defs, 'links', v_links);
END $m6$;
REVOKE ALL ON FUNCTION public.attr_export_payload(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.attr_export_payload(text) TO authenticated;
GRANT ALL ON FUNCTION public.attr_export_payload(text) TO service_role;

-- ── 7. attr_import_plan ─────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.attr_import_plan(p_definitions jsonb, p_links jsonb, p_scope text)
RETURNS jsonb
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $m6$
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
  -- DEC-050 L2a — the inherited card rank a direct row would collide with.
  v_conflict   text;
  -- DEC-057 — the option-conditioned allowed refusal, or NULL.
  v_allowed    jsonb;
  -- M-ORDER — the links file's own display_order cell (integer >= 0).
  v_ord        int;
  v_ord_txt    text;
  v_ord_set    boolean;
  -- DEC-057 L2-mig — the post-plan definitions overlay the rule resolves through.
  v_overlay    jsonb := '[]'::jsonb;
  -- INC-200 — the type this row leaves behind, when it changes.
  v_newtype    text;
  -- M-MAINT-2 Part B — the two per-link cells.
  v_alw_txt    text;
  v_alw        text[];
  v_alw_set    boolean;
  v_dflt_txt   text;
  v_dflt       jsonb;
  v_dflt_set   boolean;
  v_lopts      jsonb;
  v_ltype      text;
  v_lvals      text[];
  v_eff_vals   text[];
  v_bad_link   text;
  v_dt         date;
  -- M-MAINT-3b — the THIRD per-link cell: the D24 condition.
  v_vw_txt     text;
  v_vw         jsonb;
  v_vw_set     boolean;
  v_vw_key     text;
  v_vw_vals    text[];
  v_vw_parts   text[];
  v_vw_pairs   jsonb;
  v_vw_pair    jsonb;
  v_vw_part    text;
  v_sibopts    jsonb;
  v_sibvals    text[];
  -- M-SHAPE — does this row's option cell differ from the stored one?
  v_opt_same   boolean;
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
        -- INC-265 — records separate at the JSON boundary `}|{`, never at a
        -- bare pipe: D28's two-tone swatch and any label carrying a pipe put the
        -- character INSIDE a record, and `string_to_array` cut the record in half.
        FOREACH v_seg IN ARRAY public.attr_split_option_cell(v_raw)
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
    --
    -- M-SHAPE (INC-254) — BUT ONLY FOR A CELL THE FILE CHANGES. An option list
    -- identical to the stored one is the catalog's own state: it was judged when
    -- it was written and re-judging it can only refuse the operator's own
    -- export. So an unchanged cell skips the shape check and falls through to
    -- the ordinary diff, which will report `none`. Every altered cell — and
    -- every cell of a brand-new definition — is judged in full, as before.
    v_opt_same := (v_att.id IS NOT NULL AND v_options IS NOT DISTINCT FROM v_att.options);
    v_optmsg := CASE WHEN v_opt_same THEN NULL
                     ELSE public.attr_option_shape(v_key, v_options) END;
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

    -- INC-200 — A TYPE CHANGE CLEARS THE CELLS THAT NO LONGER APPLY. When the
    -- row's type differs from the STORED type, every inapplicable cell becomes
    -- a CLEAR in the plan itself, whatever the file said: text cells off
    -- anything but text, number cells off anything but number, options off
    -- text/number/boolean. The preview therefore NAMES the clears, the commit
    -- writes them in the same statement as the type, and the export
    -- round-trips the cleared state. A caller cannot keep a preset on a select.
    IF v_att.id IS NOT NULL AND v_type IS DISTINCT FROM v_att.attr_type THEN
      v_newtype := v_type;
      IF v_newtype <> 'text' THEN
        v_cells := v_cells || jsonb_build_object('preset', 'null'::jsonb,
                                                'max_length', 'null'::jsonb);
      END IF;
      IF v_newtype <> 'number' THEN
        v_cells := v_cells || jsonb_build_object('unit', 'null'::jsonb,
                                                'min_bound', 'null'::jsonb,
                                                'max_bound', 'null'::jsonb,
                                                'decimals', 'null'::jsonb,
                                                'format', 'null'::jsonb);
      END IF;
      IF v_newtype IN ('text','number','boolean') THEN
        v_options := NULL;
      END IF;
    END IF;

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

    -- M-ORDER — THE display_order CELL. ABSENT or BLANK changes NOTHING (the
    -- name_am rule), so a console Move up/down survives every import. A
    -- present, non-blank cell must be a NON-NEGATIVE INTEGER; anything else
    -- refuses badDisplayOrder with the offending value. Ties are NOT resolved
    -- here: the posting read keeps its own tie-break (display_order, attr_key).
    v_ord_set := false;
    v_ord := NULL;
    v_ord_txt := NULL;
    IF e ? 'display_order' THEN
      v_ord_txt := btrim(COALESCE(e->>'display_order',''));
      IF v_ord_txt <> '' THEN
        IF v_ord_txt !~ '^[0-9]+$' THEN
          v_refusals := v_refusals || jsonb_build_object(
            'file','links','row',v_row,'key',v_key,'reason','badDisplayOrder',
            'category', v_cat.slug, 'detail', v_ord_txt, 'value', v_ord_txt);
          CONTINUE;
        END IF;
        v_ord_set := true;
        v_ord := v_ord_txt::int;
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

    -- M-MAINT-2 PART B — THE TWO PER-LINK CELLS. ABSENT = no change; a PRESENT
    -- and EMPTY cell clears it. `allowed_options` is a SUBSET of the
    -- definition's own option values — the POST-PLAN definition, so a file that
    -- adds the definition and narrows the link in the same pass is legal.
    -- `default_value` is judged against the definition's TYPE and, when a
    -- shortlist is in force (this row's, or the stored one when the row is
    -- silent), against ITS values. Nothing is silently dropped.
    v_alw_set := (e ? 'allowed_options');
    v_dflt_set := (e ? 'default_value');
    v_alw := NULL;
    v_dflt := NULL;
    v_bad_link := NULL;

    IF v_alw_set OR v_dflt_set THEN
      v_ltype := NULL;
      v_lopts := NULL;
      SELECT x.value->>'attr_type',
             CASE WHEN x.value->'options' = 'null'::jsonb THEN NULL ELSE x.value->'options' END
        INTO v_ltype, v_lopts
        FROM jsonb_array_elements(v_defs) x
       WHERE x.value->>'key' = v_key AND x.value->>'action' = 'upsert'
       LIMIT 1;
      IF v_ltype IS NULL THEN
        SELECT a.attr_type, a.options INTO v_ltype, v_lopts
          FROM public.attributes a WHERE a.attr_key = v_key;
      END IF;
      SELECT COALESCE(array_agg(o->>'value'), ARRAY[]::text[]) INTO v_lvals
        FROM jsonb_array_elements(public.attr_option_norm(v_lopts)) o;
    END IF;

    IF v_alw_set THEN
      v_alw_txt := btrim(COALESCE(e->>'allowed_options',''));
      IF v_alw_txt = '' THEN
        v_alw := NULL;
      ELSIF COALESCE(v_ltype,'') NOT IN ('single_select','multi_select') THEN
        v_bad_link := 'typeNotSelect';
      ELSE
        v_alw := ARRAY[]::text[];
        FOREACH v_seg IN ARRAY string_to_array(v_alw_txt, '|')
        LOOP
          CONTINUE WHEN btrim(v_seg) = '';
          IF NOT (btrim(v_seg) = ANY (v_lvals)) THEN
            v_bad_link := btrim(v_seg);
            EXIT;
          END IF;
          IF NOT (btrim(v_seg) = ANY (v_alw)) THEN
            v_alw := v_alw || btrim(v_seg);
          END IF;
        END LOOP;
        IF v_bad_link IS NULL AND COALESCE(array_length(v_alw, 1), 0) = 0 THEN
          v_alw := NULL;
        END IF;
      END IF;
    END IF;

    IF v_bad_link IS NOT NULL THEN
      v_refusals := v_refusals || jsonb_build_object(
        'file','links','row',v_row,'key',v_key,'reason','badAllowedOption',
        'category', v_cat.slug, 'detail', v_bad_link, 'value', v_bad_link);
      CONTINUE;
    END IF;

    IF v_dflt_set THEN
      v_dflt_txt := btrim(COALESCE(e->>'default_value',''));
      IF v_dflt_txt = '' THEN
        v_dflt := NULL;
      ELSE
        v_eff_vals := CASE
          WHEN v_alw_set AND v_alw IS NOT NULL THEN v_alw
          WHEN NOT v_alw_set AND v_link.id IS NOT NULL AND v_link.allowed_options IS NOT NULL
            THEN v_link.allowed_options
          ELSE v_lvals END;
        CASE COALESCE(v_ltype,'')
          WHEN 'number' THEN
            BEGIN
              v_dflt := to_jsonb(v_dflt_txt::numeric);
            EXCEPTION WHEN others THEN
              v_bad_link := 'notANumber:' || v_dflt_txt;
            END;
          WHEN 'boolean' THEN
            IF lower(v_dflt_txt) IN ('true','t','1','yes') THEN
              v_dflt := to_jsonb(true);
            ELSIF lower(v_dflt_txt) IN ('false','f','0','no') THEN
              v_dflt := to_jsonb(false);
            ELSE
              v_bad_link := 'notABoolean:' || v_dflt_txt;
            END IF;
          WHEN 'date' THEN
            BEGIN
              v_dt := v_dflt_txt::date;
              v_dflt := to_jsonb(v_dt::text);
            EXCEPTION WHEN others THEN
              v_bad_link := 'notADate:' || v_dflt_txt;
            END;
          WHEN 'single_select' THEN
            IF NOT (v_dflt_txt = ANY (v_eff_vals)) THEN
              v_bad_link := 'notInOptions:' || v_dflt_txt;
            ELSE
              v_dflt := to_jsonb(v_dflt_txt);
            END IF;
          WHEN 'multi_select' THEN
            v_dflt := '[]'::jsonb;
            FOREACH v_seg IN ARRAY string_to_array(v_dflt_txt, '|')
            LOOP
              CONTINUE WHEN btrim(v_seg) = '';
              IF NOT (btrim(v_seg) = ANY (v_eff_vals)) THEN
                v_bad_link := 'notInOptions:' || btrim(v_seg);
                EXIT;
              END IF;
              v_dflt := v_dflt || jsonb_build_array(btrim(v_seg));
            END LOOP;
            IF v_bad_link IS NULL AND jsonb_array_length(v_dflt) = 0 THEN
              v_dflt := NULL;
            END IF;
          ELSE
            v_dflt := to_jsonb(v_dflt_txt);
        END CASE;
      END IF;
    END IF;

    IF v_bad_link IS NOT NULL THEN
      v_refusals := v_refusals || jsonb_build_object(
        'file','links','row',v_row,'key',v_key,'reason','badDefault',
        'category', v_cat.slug, 'detail', v_bad_link, 'value', v_dflt_txt);
      CONTINUE;
    END IF;

    -- M-MAINT-3b — THE THIRD PER-LINK CELL: the D24 condition, text form
    -- `<sibling key>=<value>|<value>…`. THE BLANK RULE (the name_am rule): a
    -- BLANK cell changes NOTHING and a MISSING column is ignored, so a
    -- console-set condition survives every import. The judgements MIRROR the
    -- link doors (attr_link_cells_refusal): the shape checker, never the row's
    -- own key, a sibling linked to the same category (or linked by this same
    -- file), and every listed value one of the sibling's own option values.
    v_vw_set := false;
    v_vw := NULL;
    v_vw_txt := NULL;
    IF e ? 'visible_when' THEN
      v_vw_txt := btrim(COALESCE(e->>'visible_when',''));
      IF v_vw_txt <> '' THEN
        v_vw_set := true;
        -- M6 / INC-381 — the cell reads k1=a|b or k1=a|b&k2=c|d (one "and").
        v_vw_parts := string_to_array(v_vw_txt, '&');
        v_vw_pairs := '[]'::jsonb;
        IF array_length(v_vw_parts, 1) > 2 THEN
          v_bad_link := 'badShape';
        ELSE
          FOREACH v_vw_part IN ARRAY v_vw_parts
          LOOP
            v_vw_part := btrim(v_vw_part);
            v_vw_key := btrim(split_part(v_vw_part, '=', 1));
            v_vw_vals := ARRAY[]::text[];
            IF position('=' in v_vw_part) > 0 THEN
              FOREACH v_seg IN ARRAY string_to_array(substr(v_vw_part, position('=' in v_vw_part) + 1), '|')
              LOOP
                CONTINUE WHEN btrim(v_seg) = '';
                IF NOT (btrim(v_seg) = ANY (v_vw_vals)) THEN
                  v_vw_vals := v_vw_vals || btrim(v_seg);
                END IF;
              END LOOP;
            END IF;
            IF position('=' in v_vw_part) = 0 OR v_vw_key = ''
               OR COALESCE(array_length(v_vw_vals, 1), 0) = 0 THEN
              v_bad_link := 'badShape';
              EXIT;
            ELSIF v_vw_key = v_key THEN
              v_bad_link := 'self';
              EXIT;
            END IF;
            v_vw_pairs := v_vw_pairs || jsonb_build_array(
              jsonb_build_object('key', v_vw_key, 'in', to_jsonb(v_vw_vals)));
          END LOOP;
        END IF;

        IF v_bad_link IS NULL THEN
          v_vw := v_vw_pairs->0;
          IF jsonb_array_length(v_vw_pairs) = 2 THEN
            v_vw := v_vw || jsonb_build_object('and', v_vw_pairs->1);
          END IF;
          IF NOT public.attr_visible_when_ok(v_vw) THEN
            v_bad_link := 'badShape';
          END IF;
        END IF;

        IF v_bad_link IS NULL THEN
          FOR v_vw_pair IN SELECT x.value FROM jsonb_array_elements(v_vw_pairs) x
          LOOP
            v_vw_key := v_vw_pair->>'key';
            SELECT COALESCE(array_agg(t.v), ARRAY[]::text[]) INTO v_vw_vals
              FROM jsonb_array_elements_text(v_vw_pair->'in') AS t(v);
            IF NOT EXISTS (
                    SELECT 1 FROM public.effective_category_links(v_cat.id) el
                      JOIN public.attributes a2 ON a2.id = el.attribute_id
                     WHERE a2.attr_key = v_vw_key)
              AND NOT EXISTS (
                    SELECT 1 FROM jsonb_array_elements(v_lnks) x
                     WHERE x.value->>'slug' = v_cat.slug
                       AND x.value->>'key' = v_vw_key
                       AND x.value->>'action' = 'upsert') THEN
              v_bad_link := 'unknownSibling:' || v_vw_key;
              EXIT;
            END IF;
            -- the sibling's option pool, the POST-PLAN one when this file
            -- creates or changes the sibling definition.
            v_sibopts := NULL;
            SELECT CASE WHEN x.value->'options' = 'null'::jsonb THEN NULL ELSE x.value->'options' END
              INTO v_sibopts
              FROM jsonb_array_elements(v_defs) x
             WHERE x.value->>'key' = v_vw_key AND x.value->>'action' = 'upsert'
             LIMIT 1;
            IF v_sibopts IS NULL THEN
              SELECT a2.options INTO v_sibopts
                FROM public.attributes a2 WHERE a2.attr_key = v_vw_key;
            END IF;
            SELECT COALESCE(array_agg(o->>'value'), ARRAY[]::text[]) INTO v_sibvals
              FROM jsonb_array_elements(public.attr_option_norm(v_sibopts)) o;
            FOREACH v_seg IN ARRAY v_vw_vals
            LOOP
              IF NOT (v_seg = ANY (COALESCE(v_sibvals, ARRAY[]::text[]))) THEN
                v_bad_link := 'notInOptions:' || v_seg;
                EXIT;
              END IF;
            END LOOP;
            EXIT WHEN v_bad_link IS NOT NULL;
          END LOOP;
        END IF;
      END IF;
    END IF;

    IF v_bad_link IS NOT NULL THEN
      v_refusals := v_refusals || jsonb_build_object(
        'file','links','row',v_row,'key',v_key,'reason','badVisibleWhen',
        'category', v_cat.slug, 'detail', v_bad_link, 'value', COALESCE(v_vw_txt,''));
      CONTINUE;
    END IF;

    IF v_link.id IS NULL THEN
      v_change := 'add';
    ELSIF v_link.is_required IS DISTINCT FROM v_req
       OR v_link.is_filterable IS DISTINCT FROM v_filt
       OR v_link.card_rank IS DISTINCT FROM v_rank
       OR (v_alw_set AND v_link.allowed_options IS DISTINCT FROM v_alw)
       OR (v_dflt_set AND v_link.default_value IS DISTINCT FROM v_dflt)
       OR (v_vw_set AND v_link.visible_when IS DISTINCT FROM v_vw)
       -- M-ORDER — a display_order-only change is a field change.
       OR (v_ord_set AND v_link.display_order IS DISTINCT FROM v_ord) THEN
      v_change := 'change';
    ELSE
      v_change := 'none';
    END IF;

    v_lnks := v_lnks || jsonb_build_object(
      'row',v_row,'key',v_key,'slug',v_cat.slug,'action','upsert','change',v_change,
      'link_id',v_link.id,'category_id',v_cat.id,'attribute_id',v_attr_id,
      'is_required',v_req,'is_filterable',v_filt,'card_rank',v_rank,
      'allowed_set',v_alw_set,
      'allowed_options', CASE WHEN v_alw IS NULL THEN 'null'::jsonb ELSE to_jsonb(v_alw) END,
      'default_set',v_dflt_set,
      'default_value', COALESCE(v_dflt, 'null'::jsonb),
      'visible_when_set',v_vw_set,
      'visible_when', COALESCE(v_vw, 'null'::jsonb),
      'display_order_set',v_ord_set,
      'display_order', CASE WHEN v_ord IS NULL THEN '' ELSE v_ord::text END);
  END LOOP;

  ------------------------------- DEC-050 L2a: EFFECTIVE CARD-RANK UNIQUENESS
  -- UNIQUE (category_id, card_rank) guards DIRECT links only. An INHERITED
  -- card (primary lineage) occupies its rank in every descendant, so a direct
  -- rank equal to an inherited rank is refused, naming BOTH origins.
  v_out := '[]'::jsonb;
  FOR v_entry IN SELECT value FROM jsonb_array_elements(v_lnks)
  LOOP
    IF v_entry->>'action' = 'upsert'
       AND v_entry->>'change' IN ('add','change')
       AND NULLIF(v_entry->>'card_rank','') IS NOT NULL
       AND NULLIF(v_entry->>'category_id','') IS NOT NULL THEN
      v_conflict := public.attr_rank_conflict(
        (v_entry->>'category_id')::uuid,
        (v_entry->>'card_rank')::int,
        v_entry->>'key',
        v_lnks);
      IF v_conflict IS NOT NULL THEN
        v_refusals := v_refusals || jsonb_build_object(
          'file','links','row', COALESCE((v_entry->>'row')::int, 0),
          'key', v_entry->>'key',
          'reason','rankInherited',
          'category', v_entry->>'slug',
          'rank', (v_entry->>'card_rank')::int,
          'origin_category', split_part(v_conflict, '|', 1),
          'origin_key', split_part(v_conflict, '|', 2),
          'detail', v_entry->>'slug' || ' rank ' || (v_entry->>'card_rank')
                    || ' · ' || (v_entry->>'key')
                    || ' · inherited from ' || split_part(v_conflict, '|', 1)
                    || ' · ' || split_part(v_conflict, '|', 2));
        CONTINUE;
      END IF;
    END IF;
    v_out := v_out || jsonb_build_array(v_entry);
  END LOOP;
  v_lnks := v_out;

  ------------------------------- DEC-079: PRICE-BASIS UNIQUENESS
  -- A category (and every primary descendant) carries at most ONE price-basis
  -- definition (pricing_type* | unit_of_sale*) after the plan is applied; a
  -- link that would make a second one is refused, naming both keys.
  v_out := '[]'::jsonb;
  FOR v_entry IN SELECT value FROM jsonb_array_elements(v_lnks)
  LOOP
    IF v_entry->>'action' = 'upsert'
       AND v_entry->>'change' IN ('add','change')
       AND COALESCE(v_entry->>'key','') ~ '^(pricing_type|unit_of_sale)(-|$)'
       AND NULLIF(v_entry->>'category_id','') IS NOT NULL THEN
      v_conflict := public.price_basis_conflict(
        (v_entry->>'category_id')::uuid, v_entry->>'key', v_lnks);
      IF v_conflict IS NOT NULL THEN
        v_refusals := v_refusals || jsonb_build_object(
          'file','links','row', COALESCE((v_entry->>'row')::int, 0),
          'key', v_entry->>'key',
          'reason','priceBasisDuplicate',
          'category', v_entry->>'slug',
          'detail', v_conflict);
        CONTINUE;
      END IF;
    END IF;
    v_out := v_out || jsonb_build_array(v_entry);
  END LOOP;
  v_lnks := v_out;

  ------------------------------------------- DEC-050: bounds co-linkage
  -- A bounds target is a NUMBER definition linked, directly or by inheritance,
  -- in AT LEAST ONE category where the owner is linked AFTER this plan is applied — DEC-057b.
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
        IF COALESCE(array_length(v_ocats, 1), 0) > 0 AND NOT EXISTS (SELECT 1 FROM unnest(v_ocats) c WHERE c = ANY (v_tcats)) THEN
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

  ------------------------------------------- DEC-057: option-conditioned allowed
  -- The SINGLE RULE (attr_allowed_check) judged against the POST-PLAN link set:
  -- the target is a select definition co-linked wherever the owner is linked,
  -- never the owner, its parent or its dependents, and every listed value
  -- exists in the target's option list. The refusal carries row, key, option
  -- value, target and reason. DEC-057 L2-mig: the target itself resolves
  -- through the plan — every definition this plan creates or changes
  -- (with its post-plan option list) is passed as p_defs.
  SELECT COALESCE(jsonb_agg(jsonb_build_object(
           'attribute_key', d.value->>'key',
           'type',        d.value->>'attr_type',
           'options',     d.value->'options')), '[]'::jsonb)
    INTO v_overlay
    FROM jsonb_array_elements(v_defs) d
   WHERE d.value->>'action' = 'upsert';
  v_out := '[]'::jsonb;
  FOR v_entry IN SELECT value FROM jsonb_array_elements(v_defs)
  LOOP
    v_allowed := NULL;
    IF v_entry->>'action' = 'upsert'
       AND v_entry->'options' IS NOT NULL AND v_entry->'options' <> 'null'::jsonb THEN
      v_key := v_entry->>'key';
      v_row := COALESCE((v_entry->>'row')::int, 0);
      v_allowed := public.attr_allowed_check(v_key, v_entry->'options', v_lnks, v_overlay);
    END IF;

    IF v_allowed IS NOT NULL THEN
      v_refusals := v_refusals || jsonb_build_object(
        'file','definitions','row',v_row,'key',v_key,
        'reason', v_allowed->>'reason',
        'option', v_allowed->>'option',
        'target', v_allowed->>'target',
        'value', COALESCE(v_allowed->>'value',''),
        'detail', v_allowed->>'detail');
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
END $m6$;
REVOKE ALL ON FUNCTION public.attr_import_plan(jsonb, jsonb, text) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.attr_import_plan(jsonb, jsonb, text) FROM authenticated;
GRANT ALL ON FUNCTION public.attr_import_plan(jsonb, jsonb, text) TO service_role;

-- ── 8. validate_listing_attributes ─────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.validate_listing_attributes(
  p_category_id uuid, p_attrs jsonb, p_prior jsonb DEFAULT NULL, p_defer_keys text[] DEFAULT NULL)
RETURNS jsonb
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $m6$
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
  v_set    boolean;
BEGIN
  SELECT array_agg(a.attr_key)
    INTO v_keys
    FROM public.effective_category_links(p_category_id) e
    JOIN public.attributes a ON a.id = e.attribute_id;
  v_keys := coalesce(v_keys, ARRAY[]::text[]);

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
      IF (v_opt->>'value') = ANY (public.attr_answer_tokens(v_val)) THEN
        FOR v_key IN SELECT k FROM jsonb_object_keys(v_opt->'bounds') k LOOP
          v_bmin := NULLIF(v_opt->'bounds'->v_key->>'min', '')::numeric;
          v_bmax := NULLIF(v_opt->'bounds'->v_key->>'max', '')::numeric;
          -- M6 / INC-374 — settled when any contributing option says so.
          v_set := (v_opt->'bounds'->v_key->'settled') = 'true'::jsonb;
          IF v_folds ? v_key THEN
            v_bmin := greatest(v_bmin, NULLIF(v_folds->v_key->>'min','')::numeric);
            v_bmax := least(v_bmax, NULLIF(v_folds->v_key->>'max','')::numeric);
            v_set := v_set OR (v_folds->v_key->'settled') = 'true'::jsonb;
          END IF;
          v_folds := v_folds || jsonb_build_object(v_key,
            jsonb_strip_nulls(jsonb_build_object('min', v_bmin, 'max', v_bmax,
              'settled', CASE WHEN v_set THEN true END)));
        END LOOP;
      END IF;
    END LOOP;
  END LOOP;

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

    IF v_def.visible_when IS NOT NULL
       AND NOT public.attr_visible_when_met(v_attrs, v_prior, v_def.visible_when) THEN
      CONTINUE;
    END IF;

    v_absent := v_val IS NULL
             OR jsonb_typeof(v_val) = 'null'
             OR (jsonb_typeof(v_val) = 'string' AND btrim(v_val #>> '{}') = '')
             OR (jsonb_typeof(v_val) = 'array' AND jsonb_array_length(v_val) = 0);

    IF v_absent THEN
      -- M6 / INC-374 — a key whose folded bounds are settled is not asked.
      IF v_def.is_required AND NOT (v_def.attr_key = ANY (coalesce(p_defer_keys, ARRAY[]::text[])))
         AND (v_folds->v_def.attr_key->'settled') IS DISTINCT FROM 'true'::jsonb THEN
        v_ref := v_ref || jsonb_build_array(
          jsonb_build_object('attr_key', v_def.attr_key, 'reason', 'required'));
      END IF;
      CONTINUE;
    END IF;

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
      -- Part D — free text only. An identity preset (digits:n, vin, plate-et,
      -- alnum) is identity data and is never judged as a phone number.
      IF (v_def.preset IS NULL OR v_def.preset ~ '^free:') AND public.attr_contact_like(v_txt) THEN
        v_ref := v_ref || jsonb_build_array(jsonb_build_object('attr_key', v_def.attr_key, 'reason', 'contactInText'));
        CONTINUE;
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
        -- Part O — every element is a string, except at most ONE
        -- {"value":"other","text":…} object.
        IF jsonb_typeof(v_val) <> 'array'
           OR EXISTS (SELECT 1 FROM jsonb_array_elements(v_val) x
                       WHERE NOT (jsonb_typeof(x.value) = 'string'
                              OR (jsonb_typeof(x.value) = 'object' AND x.value->>'value' = 'other')))
           OR (SELECT count(*) FROM jsonb_array_elements(v_val) x WHERE jsonb_typeof(x.value) = 'object') > 1 THEN
          v_ref := v_ref || jsonb_build_array(jsonb_build_object('attr_key', v_def.attr_key, 'reason', 'badType', 'detail', 'multi_select'));
          CONTINUE;
        END IF;
        v_list := to_jsonb(public.attr_answer_tokens(v_val));
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
              AND NOT (v_txt = ANY (public.attr_answer_tokens(v_prior -> v_def.attr_key))) THEN
          v_ref := v_ref || jsonb_build_array(jsonb_build_object('attr_key', v_def.attr_key, 'reason', 'inactiveOption', 'detail', v_txt));
          v_bad := true;
        ELSIF v_def.allowed_options IS NOT NULL
              AND NOT (v_txt = ANY (v_def.allowed_options))
              AND NOT (v_txt = ANY (public.attr_answer_tokens(v_prior -> v_def.attr_key))) THEN
          v_ref := v_ref || jsonb_build_array(jsonb_build_object('attr_key', v_def.attr_key, 'reason', 'optionNotAllowed', 'detail', v_txt));
          v_bad := true;
        END IF;
        v_seen := v_seen || v_txt;
        v_found := NULL; v_active := NULL;
      END LOOP;
      CONTINUE WHEN v_bad;

      IF 'other' = ANY (v_seen) AND v_allow_other THEN
        v_txt := btrim(coalesce(public.attr_answer_other_text(v_val), ''));
        IF v_txt = '' OR char_length(v_txt) > 120 THEN
          v_ref := v_ref || jsonb_build_array(jsonb_build_object('attr_key', v_def.attr_key, 'reason', 'otherNeedsText'));
          CONTINUE;
        END IF;
        -- Bundle 2 step 3 — an Other write-in is free text: the phone rule
        -- applies, reason contactInText at this attribute.
        IF public.attr_contact_like(v_txt) THEN
          v_ref := v_ref || jsonb_build_array(jsonb_build_object('attr_key', v_def.attr_key, 'reason', 'contactInText'));
          CONTINUE;
        END IF;
        IF v_def.attr_type = 'single_select' THEN
          v_norm := v_norm || jsonb_build_object(v_def.attr_key,
            jsonb_build_object('value', 'other', 'text', v_txt));
        ELSE
          v_norm := v_norm || jsonb_build_object(v_def.attr_key,
            (SELECT jsonb_agg(CASE WHEN u.t = 'other'
                                   THEN jsonb_build_object('value', 'other', 'text', v_txt)
                                   ELSE to_jsonb(u.t) END ORDER BY u.i)
               FROM unnest(v_seen) WITH ORDINALITY u(t, i)));
        END IF;
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
END $m6$;
REVOKE ALL ON FUNCTION public.validate_listing_attributes(uuid, jsonb, jsonb, text[]) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.validate_listing_attributes(uuid, jsonb, jsonb, text[]) TO authenticated;
GRANT ALL ON FUNCTION public.validate_listing_attributes(uuid, jsonb, jsonb, text[]) TO service_role;

-- ── 9. get_posting_schema ─────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.get_posting_schema(p_category_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
VOLATILE SECURITY DEFINER
SET search_path TO 'public'
AS $m6$
DECLARE
  v_cat public.categories;
  v_attrs jsonb;
  v_doc jsonb;
  v_rate jsonb;
  v_deal jsonb;
  v_has_unit boolean;
BEGIN
  v_rate := public.rate_gate('schema_read');
  IF NOT coalesce((v_rate->>'allowed')::boolean, false) THEN
    RAISE EXCEPTION 'rateLimited';
  END IF;

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

  -- M5 / DEC-109 — the price page's rows, grouped by deal_group, display order.
  SELECT EXISTS (SELECT 1 FROM public.effective_category_links(p_category_id) e
                   JOIN public.attributes a ON a.id = e.attribute_id
                  WHERE a.attr_key ~ '^unit_of_sale(-|$)')
    INTO v_has_unit;
  SELECT jsonb_build_object('basis', '[]'::jsonb, 'size', '[]'::jsonb,
                            'quantity', '[]'::jsonb, 'terms', '[]'::jsonb)
         || coalesce(jsonb_object_agg(g.grp, g.keys), '{}'::jsonb)
    INTO v_deal
    FROM (SELECT public.deal_group(a.attr_key, v_has_unit) AS grp,
                 jsonb_agg(a.attr_key ORDER BY e.display_order, a.attr_key) AS keys
            FROM public.effective_category_links(p_category_id) e
            JOIN public.attributes a ON a.id = e.attribute_id
           WHERE public.deal_group(a.attr_key, v_has_unit) IS NOT NULL
           GROUP BY 1) g;

  SELECT coalesce(jsonb_agg(row ORDER BY ord, key), '[]'::jsonb)
    INTO v_attrs
    FROM (
      SELECT e.display_order AS ord, a.attr_key AS key,
             jsonb_build_object(
               'attribute_id', a.id,
               'attr_key', a.attr_key,
               'attr_type', a.attr_type,
               'name_en', a.name_en,
               'name_am', a.name_am,
               'help_text_en', a.help_text_en,
               'help_text_am', a.help_text_am,
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
               'allowed_options', to_jsonb(l.allowed_options),
               'default_value', l.default_value,
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

  v_doc := jsonb_build_object(
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
      'illustration', v_cat.image_url,
      'deal', v_deal
    ),
    'attributes', v_attrs,
    'plan', public.plan_caps(public.seller_plan(auth.uid()))
  );
  -- M5 / DEC-109 — no schema-time priceBasisAmbiguous: ambiguity is judged
  -- with the answers (price_basis_in_force, validate_listing_draft step 4).
  RETURN v_doc;
END $m6$;
REVOKE ALL ON FUNCTION public.get_posting_schema(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_posting_schema(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.get_posting_schema(uuid) TO service_role;

-- ── 10. Proofs: scratch rows inside a rolled-back block ─────────────────
DO $p$
DECLARE
  c_a uuid; a_kind uuid; a_cond uuid; a_tgt uuid; a_model uuid; a_mah uuid;
  v jsonb; r text;
  vw jsonb := '{"key":"e2e_m6_kind","in":["a","other"],"and":{"key":"e2e_m6_cond","in":["x"]}}';
BEGIN
  BEGIN
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, default_price_period)
      VALUES ('E2E M6 A', 'e2e-m6-a', true, true, true, 'once') RETURNING id INTO c_a;
    INSERT INTO public.attributes (attr_key, name_en, attr_type, options) VALUES
      ('e2e_m6_kind', 'E2E M6 Kind', 'multi_select',
       '[{"value":"a","label_en":"A","label_am":"ሀ"},{"value":"b","label_en":"B","label_am":"ለ"},{"value":"other","label_en":"Other","label_am":"ሌላ"}]')
      RETURNING id INTO a_kind;
    INSERT INTO public.attributes (attr_key, name_en, attr_type, options) VALUES
      ('e2e_m6_cond', 'E2E M6 Cond', 'single_select',
       '[{"value":"x","label_en":"X","label_am":"ኤክስ"},{"value":"y","label_en":"Y","label_am":"ዋይ"}]')
      RETURNING id INTO a_cond;
    INSERT INTO public.attributes (attr_key, name_en, attr_type) VALUES
      ('e2e_m6_target', 'E2E M6 Target', 'text') RETURNING id INTO a_tgt;
    INSERT INTO public.attributes (attr_key, name_en, attr_type) VALUES
      ('e2e_m6_mah', 'E2E M6 mAh', 'number') RETURNING id INTO a_mah;

    -- step 27: the option shape of "settled".
    ASSERT public.attr_option_shape('e2e_m6_model',
      '[{"value":"m1","label_en":"M1","label_am":"ም1","bounds":{"e2e_m6_mah":{"min":4056,"max":4288,"settled":true}}}]') IS NULL,
      'settled beside min and max is accepted';
    r := public.attr_option_shape('e2e_m6_model',
      '[{"value":"m1","label_en":"M1","label_am":"ም1","bounds":{"e2e_m6_mah":{"min":4056,"settled":true}}}]');
    ASSERT r LIKE '%|boundsSettledNeedsRange:e2e_m6_mah', format('settled with min only: %s', r);
    r := public.attr_option_shape('e2e_m6_model',
      '[{"value":"m1","label_en":"M1","label_am":"ም1","bounds":{"e2e_m6_mah":{"min":4056,"max":4288,"settled":false}}}]');
    ASSERT r LIKE '%|boundsSettledNeedsRange:e2e_m6_mah', format('settled false: %s', r);

    INSERT INTO public.attributes (attr_key, name_en, attr_type, options) VALUES
      ('e2e_m6_model', 'E2E M6 Model', 'single_select',
       '[{"value":"m1","label_en":"M1","label_am":"ም1","bounds":{"e2e_m6_mah":{"min":4056,"max":4288,"settled":true}}},
         {"value":"m2","label_en":"M2","label_am":"ም2","bounds":{"e2e_m6_mah":{"min":3000,"max":6000}}}]')
      RETURNING id INTO a_model;

    INSERT INTO public.category_attribute_links (category_id, attribute_id, is_required, display_order, visible_when) VALUES
      (c_a, a_kind, false, 1, NULL), (c_a, a_cond, false, 2, NULL),
      (c_a, a_tgt, false, 3, vw), (c_a, a_model, false, 4, NULL), (c_a, a_mah, true, 5, NULL);

    -- step 26: the shape.
    ASSERT public.attr_visible_when_ok(vw), 'two pairs accepted';
    ASSERT NOT public.attr_visible_when_ok('{"key":"e2e_m6_kind","in":["a"],"and":{"key":"e2e_m6_kind","in":["b"]}}'),
      'and with k2 = k1 refused';
    ASSERT NOT public.attr_visible_when_ok('{"key":"e2e_m6_kind","in":["a"],"and":{"key":"e2e_m6_cond","in":["x"],"and":{"key":"e2e_m6_mah","in":["1"]}}}'),
      'and inside and refused';
    ASSERT NOT public.attr_visible_when_ok('{"key":"e2e_m6_kind","in":["a"],"and":{"key":"e2e_m6_cond","in":[]}}'),
      'empty inner list refused';

    -- step 26: the meaning.
    ASSERT public.attr_visible_when_met('{"e2e_m6_kind":["a"],"e2e_m6_cond":"x"}', NULL, vw), 'both met: shown';
    ASSERT NOT public.attr_visible_when_met('{"e2e_m6_kind":["a"],"e2e_m6_cond":"y"}', NULL, vw), 'first only: hidden';
    ASSERT NOT public.attr_visible_when_met('{"e2e_m6_kind":["b"],"e2e_m6_cond":"x"}', NULL, vw), 'second only: hidden';
    ASSERT NOT public.attr_visible_when_met('{"e2e_m6_kind":["b"],"e2e_m6_cond":"y"}', NULL, vw), 'neither: hidden';
    ASSERT public.attr_visible_when_met('{"e2e_m6_kind":["b",{"value":"other","text":"zz"}],"e2e_m6_cond":"x"}', NULL, vw),
      'a multi-select answer holding "other" counts';
    ASSERT public.attr_visible_when_met('{"e2e_m6_kind":["a"]}', '{"e2e_m6_cond":"x"}', vw), 'prior answer counts as before';
    ASSERT public.attr_visible_when_met('{}', NULL, '{"key":"e2e_m6_kind","in":["a"]}') IS FALSE, 'single pair unchanged';

    -- step 26: the form drops a hidden row's value; a shown one is kept.
    v := public.validate_listing_attributes(c_a,
      '{"e2e_m6_kind":["a"],"e2e_m6_cond":"y","e2e_m6_target":"kept?","e2e_m6_mah":4500}');
    ASSERT (v->>'ok')::boolean AND NOT (v->'attrs' ? 'e2e_m6_target'), format('hidden row dropped: %s', v);
    v := public.validate_listing_attributes(c_a,
      '{"e2e_m6_kind":["a"],"e2e_m6_cond":"x","e2e_m6_target":"kept","e2e_m6_mah":4500}');
    ASSERT (v->>'ok')::boolean AND v->'attrs'->>'e2e_m6_target' = 'kept', format('shown row kept: %s', v);

    -- step 26: the link doors judge each pair.
    ASSERT public.attr_link_cells_refusal(c_a, a_tgt, NULL, NULL, vw) IS NULL, 'two-pair link accepted';
    r := public.attr_link_cells_refusal(c_a, a_tgt, NULL, NULL,
      '{"key":"e2e_m6_kind","in":["a"],"and":{"key":"e2e_m6_target","in":["x"]}}');
    ASSERT r = 'badVisibleWhen:self', format('inner self: %s', r);
    r := public.attr_link_cells_refusal(c_a, a_tgt, NULL, NULL,
      '{"key":"e2e_m6_kind","in":["a"],"and":{"key":"e2e_m6_nope","in":["x"]}}');
    ASSERT r = 'badVisibleWhen:unknownSibling:e2e_m6_nope', format('inner unknown sibling: %s', r);
    r := public.attr_link_cells_refusal(c_a, a_tgt, NULL, NULL,
      '{"key":"e2e_m6_kind","in":["a"],"and":{"key":"e2e_m6_cond","in":["q"]}}');
    ASSERT r = 'badVisibleWhen:notInOptions:q', format('inner value not an option: %s', r);
    r := public.attr_link_cells_refusal(c_a, a_tgt, NULL, NULL,
      '{"key":"e2e_m6_kind","in":["a"],"and":{"key":"e2e_m6_kind","in":["b"]}}');
    ASSERT r = 'badVisibleWhen:badShape', format('inner same key: %s', r);

    -- step 27: settled.
    v := public.validate_listing_attributes(c_a, '{"e2e_m6_model":"m1"}');
    ASSERT (v->>'ok')::boolean AND NOT (v->'attrs' ? 'e2e_m6_mah'), format('settled required number absent: accepted: %s', v);
    v := public.validate_listing_attributes(c_a, '{"e2e_m6_model":"m1","e2e_m6_mah":4100}');
    ASSERT (v->>'ok')::boolean AND (v->'attrs'->>'e2e_m6_mah')::numeric = 4100, format('inside the range: stored: %s', v);
    v := public.validate_listing_attributes(c_a, '{"e2e_m6_model":"m1","e2e_m6_mah":5000}');
    ASSERT NOT (v->>'ok')::boolean AND v->'refusals'->0->>'reason' = 'outOfBounds', format('outside: outOfBounds: %s', v);
    v := public.validate_listing_attributes(c_a, '{"e2e_m6_model":"m2"}');
    ASSERT NOT (v->>'ok')::boolean AND v->'refusals'->0->>'reason' = 'required', format('another model asks again: %s', v);

    -- step 29: an unknown category token is refused; an active postable one is not.
    r := public.attr_cell_check('text', NULL, NULL, NULL, NULL, NULL, NULL, NULL,
      'See {category:e2e-m6-nope}.', NULL);
    ASSERT r = 'help_text_en|unknownCategoryToken|e2e-m6-nope', format('unknown token: %s', r);
    r := public.attr_cell_check('text', NULL, NULL, NULL, NULL, NULL, NULL, NULL,
      NULL, 'ይመልከቱ {category:e2e-m6-zz}');
    ASSERT r = 'help_text_am|unknownCategoryToken|e2e-m6-zz', format('unknown token am: %s', r);
    ASSERT public.attr_cell_check('text', NULL, NULL, NULL, NULL, NULL, NULL, NULL,
      'See {category:e2e-m6-a}.', 'ይመልከቱ {category:e2e-m6-a}') IS NULL, 'an active postable category token is accepted';
    UPDATE public.categories SET allow_listings = false WHERE id = c_a;
    ASSERT public.attr_cell_check('text', NULL, NULL, NULL, NULL, NULL, NULL, NULL,
      'See {category:e2e-m6-a}.', NULL) = 'help_text_en|unknownCategoryToken|e2e-m6-a', 'a category taking no ads is refused';

    RAISE EXCEPTION 'm6 scratch rollback' USING ERRCODE = 'P0R99';
  EXCEPTION WHEN SQLSTATE 'P0R99' THEN NULL;
  END;
  ASSERT NOT EXISTS (SELECT 1 FROM public.attributes WHERE attr_key LIKE 'e2e_m6_%'), 'scratch attributes left';
  ASSERT NOT EXISTS (SELECT 1 FROM public.categories WHERE slug LIKE 'e2e-m6-%'), 'scratch categories left';
END $p$;

-- ── 11. Read-back: volatility, definer and ACL of every redeclared door ──
DO $r$
DECLARE f record;
BEGIN
  FOR f IN
    SELECT p.proname, p.provolatile, p.prosecdef, p.proacl::text AS acl
      FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
     WHERE n.nspname = 'public' AND p.proname IN ('attr_visible_when_ok','attr_visible_when_met',
       'attr_cell_check','attr_option_shape','attr_link_cells_refusal','attr_export_payload',
       'attr_import_plan','validate_listing_attributes','get_posting_schema')
  LOOP
    ASSERT f.acl NOT LIKE '%anon=%' AND f.acl NOT LIKE '%{=X%' AND f.acl NOT LIKE '%,=X%', format('%s open to anon/PUBLIC: %s', f.proname, f.acl);
    ASSERT f.acl LIKE '%service_role=X%', format('%s: service_role', f.proname);
    ASSERT (f.proname = 'attr_import_plan') = (f.acl NOT LIKE '%authenticated=X%'), format('%s: authenticated: %s', f.proname, f.acl);
    ASSERT f.prosecdef = (f.proname IN ('attr_import_plan','validate_listing_attributes','get_posting_schema')),
      format('%s: definer', f.proname);
    ASSERT f.provolatile = CASE
      WHEN f.proname IN ('attr_visible_when_ok','attr_visible_when_met','attr_option_shape') THEN 'i'
      WHEN f.proname = 'get_posting_schema' THEN 'v' ELSE 's' END, format('%s: volatility', f.proname);
  END LOOP;
  ASSERT (SELECT count(*) FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
           WHERE n.nspname = 'public' AND p.proname IN ('attr_visible_when_ok','attr_visible_when_met',
       'attr_cell_check','attr_option_shape','attr_link_cells_refusal','attr_export_payload',
       'attr_import_plan','validate_listing_attributes','get_posting_schema')) = 9, 'one of each, no overloads';
  ASSERT (SELECT p.prosrc NOT LIKE '%price_basis_key%' FROM pg_proc p
           WHERE p.oid = 'public.get_posting_schema(uuid)'::regprocedure), 'price_basis_key dropped from the schema document';
END $r$;

INSERT INTO public.migration_marks (version) VALUES ('20261005100000') ON CONFLICT DO NOTHING;
