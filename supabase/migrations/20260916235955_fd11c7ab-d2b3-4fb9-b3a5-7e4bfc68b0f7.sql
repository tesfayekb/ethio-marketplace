-- U6-A1-1 — POSTING SCHEMA: capabilities, price period, search column, the
-- shared effective-links resolution, the public posting read, lazy options and
-- the single validation authority.
--
-- u6-posting-spec §3/§4 A1; DEC-050/051/052/053/067; INC-183 (whole
-- re-declarations — admin_list_effective_category_links is re-declared in full,
-- never patched by text anchor).
--
-- No door lands here (A2 owns submit/publish/transition) and no client policy
-- is widened. Category cells for the new columns ride A2's code turn.

-- ===================================================================== 2.1
-- categories: capabilities (DEC-052 allowlist) + price period (DEC-067).
ALTER TABLE public.categories
  ADD COLUMN IF NOT EXISTS capabilities text[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS default_price_period text NOT NULL DEFAULT 'once',
  ADD COLUMN IF NOT EXISTS price_period_locked boolean NOT NULL DEFAULT true;

ALTER TABLE public.categories
  DROP CONSTRAINT IF EXISTS categories_capabilities_check;
ALTER TABLE public.categories
  ADD CONSTRAINT categories_capabilities_check
  CHECK (capabilities <@ ARRAY['bookable','map_pin']::text[]);

ALTER TABLE public.categories
  DROP CONSTRAINT IF EXISTS categories_default_price_period_check;
ALTER TABLE public.categories
  ADD CONSTRAINT categories_default_price_period_check
  CHECK (default_price_period IN ('once','hour','day','week','month','year'));

-- ===================================================================== 2.2
-- listings: the poster's own columns, the screening seam, the search column and
-- the widened state set.
ALTER TABLE public.listings
  ADD COLUMN IF NOT EXISTS price_period text NOT NULL DEFAULT 'once',
  ADD COLUMN IF NOT EXISTS poster_expires_at timestamptz NULL,
  ADD COLUMN IF NOT EXISTS video_url text NULL,
  ADD COLUMN IF NOT EXISTS cover_photo_id uuid NULL,
  ADD COLUMN IF NOT EXISTS contact_pref jsonb NOT NULL DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS screening jsonb NULL,
  ADD COLUMN IF NOT EXISTS search_tsv tsvector;

ALTER TABLE public.listings DROP CONSTRAINT IF EXISTS listings_price_period_check;
ALTER TABLE public.listings
  ADD CONSTRAINT listings_price_period_check
  CHECK (price_period IN ('once','hour','day','week','month','year'));

ALTER TABLE public.listings DROP CONSTRAINT IF EXISTS listings_video_url_check;
ALTER TABLE public.listings
  ADD CONSTRAINT listings_video_url_check
  CHECK (video_url IS NULL OR video_url ~ '^https://(www\.)?(youtube\.com/watch\?v=|youtu\.be/)[A-Za-z0-9_-]{6,20}');

-- The screening states (DEC-070). transition_listing is NOT touched here: A2
-- re-declares it whole with the new machine.
ALTER TABLE public.listings DROP CONSTRAINT IF EXISTS listings_status_check;
ALTER TABLE public.listings
  ADD CONSTRAINT listings_status_check
  CHECK (status IN ('draft','screening','active','reduced','rejected','held','expired','sold','removed'));

CREATE OR REPLACE FUNCTION public.listings_search_tsv_refresh()
RETURNS trigger
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
DECLARE
  v_attr_text text;
BEGIN
  -- 'simple' on purpose: a language-aware dictionary per listing language is
  -- U7's call, not this landing's.
  SELECT coalesce(string_agg(t.txt, ' '), '')
    INTO v_attr_text
    FROM (
      SELECT CASE
               WHEN jsonb_typeof(e.value) = 'string' THEN e.value #>> '{}'
               WHEN jsonb_typeof(e.value) = 'array' THEN (
                 SELECT coalesce(string_agg(x #>> '{}', ' '), '')
                   FROM jsonb_array_elements(e.value) x
                  WHERE jsonb_typeof(x) = 'string'
               )
               WHEN jsonb_typeof(e.value) = 'object' AND jsonb_typeof(e.value->'text') = 'string'
                 THEN e.value->>'text'
               ELSE NULL
             END AS txt
        FROM jsonb_each(CASE WHEN jsonb_typeof(NEW.attributes) = 'object'
                             THEN NEW.attributes ELSE '{}'::jsonb END) e
    ) t
   WHERE t.txt IS NOT NULL AND t.txt <> '';

  NEW.search_tsv :=
      setweight(to_tsvector('simple', coalesce(NEW.title, '')), 'A')
   || setweight(to_tsvector('simple', coalesce(NEW.description, '')), 'B')
   || setweight(to_tsvector('simple', v_attr_text), 'C');
  RETURN NEW;
END $$;

DROP TRIGGER IF EXISTS listings_search_tsv_refresh ON public.listings;
CREATE TRIGGER listings_search_tsv_refresh
  BEFORE INSERT OR UPDATE OF title, description, attributes ON public.listings
  FOR EACH ROW EXECUTE FUNCTION public.listings_search_tsv_refresh();

CREATE INDEX IF NOT EXISTS listings_search_tsv_idx
  ON public.listings USING gin (search_tsv);

-- ===================================================================== 2.3
-- B1 — ONE resolution, shared by the admin reader and the posting read: the
-- nearest link along the PRIMARY lineage of category_tree_pointers wins.
CREATE OR REPLACE FUNCTION public.effective_category_links(p_category_id uuid)
RETURNS TABLE (
  attribute_id  uuid,
  is_required   boolean,
  is_filterable boolean,
  is_searchable boolean,
  display_order integer,
  card_rank     integer,
  inherited     boolean,
  origin_id     uuid,
  link_id       uuid
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  WITH RECURSIVE anc AS (
    SELECT p_category_id AS src_id, 0 AS depth
    UNION ALL
    SELECT public.cat_primary_parent(a.src_id), a.depth + 1
      FROM anc a
     WHERE a.depth < 10
       AND public.cat_primary_parent(a.src_id) IS NOT NULL
  ),
  eff AS (
    SELECT DISTINCT ON (l.attribute_id)
           l.attribute_id AS aid, l.is_required AS req, l.is_filterable AS filt,
           l.is_searchable AS srch, l.display_order AS ord, l.card_rank AS rank,
           anc.depth AS depth, anc.src_id AS src, l.id AS lid
      FROM anc
      JOIN public.category_attribute_links l ON l.category_id = anc.src_id
     ORDER BY l.attribute_id, anc.depth ASC, l.id
  )
  SELECT eff.aid, eff.req, eff.filt, eff.srch, eff.ord, eff.rank,
         (eff.depth > 0), eff.src, eff.lid
    FROM eff;
$$;

REVOKE ALL ON FUNCTION public.effective_category_links(uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.effective_category_links(uuid) FROM anon;
REVOKE ALL ON FUNCTION public.effective_category_links(uuid) FROM authenticated;
GRANT ALL ON FUNCTION public.effective_category_links(uuid) TO service_role;

-- INC-183 — the admin reader re-declared WHOLE over the shared helper. Same
-- signature, same gate, same ordering, byte-identical rows.
CREATE OR REPLACE FUNCTION public.admin_list_effective_category_links(p_category_id uuid)
 RETURNS TABLE(link_id uuid, attribute_id uuid, attr_key text, name_en text, attr_type text, options jsonb, is_required boolean, is_filterable boolean, display_order integer, card_rank integer, inherited boolean, origin_id uuid, origin_slug text, origin_name_en text, depends_on_key text)
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'view') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;

  RETURN QUERY
  SELECT e.link_id, a.id, a.attr_key, a.name_en, a.attr_type, a.options,
         e.is_required, e.is_filterable, e.display_order, e.card_rank,
         e.inherited, src.id, src.slug, src.name_en,
         (SELECT p.attr_key FROM public.attributes p WHERE p.id = a.depends_on)
    FROM public.effective_category_links(p_category_id) e
    JOIN public.attributes a ON a.id = e.attribute_id
    JOIN public.categories src ON src.id = e.origin_id
   ORDER BY e.inherited, e.display_order, a.name_en;
END $function$;

REVOKE ALL ON FUNCTION public.admin_list_effective_category_links(uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.admin_list_effective_category_links(uuid) FROM anon;
GRANT EXECUTE ON FUNCTION public.admin_list_effective_category_links(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.admin_list_effective_category_links(uuid) TO service_role;

-- ===================================================================== 2.4
-- The PUBLIC posting read. No has_permission: a category is public knowledge.
-- Option lists are NOT included (DEC-053) — only their count and allow_other.
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
               'option_count', (
                 SELECT count(*)
                   FROM jsonb_array_elements(
                          CASE WHEN jsonb_typeof(a.options) = 'array' THEN a.options ELSE '[]'::jsonb END) o
                  WHERE coalesce((o.value->>'active')::boolean, true)
               ),
               'allow_other', EXISTS (
                 SELECT 1
                   FROM jsonb_array_elements(
                          CASE WHEN jsonb_typeof(a.options) = 'array' THEN a.options ELSE '[]'::jsonb END) o
                  WHERE o.value->>'value' = 'other'
               )
             ) AS row
        FROM public.effective_category_links(p_category_id) e
        JOIN public.attributes a ON a.id = e.attribute_id
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
    'attributes', v_attrs
  );
END $$;

REVOKE ALL ON FUNCTION public.get_posting_schema(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_posting_schema(uuid) TO anon, authenticated;
GRANT ALL ON FUNCTION public.get_posting_schema(uuid) TO service_role;

-- ===================================================================== 2.5
-- Lazy options, versioned for the route's ETag (the route is A2's code turn).
CREATE OR REPLACE FUNCTION public.get_attribute_options_version(p_attribute_id uuid)
RETURNS text
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT md5(
           coalesce(to_char(a.updated_at, 'YYYYMMDDHH24MISSUS'), '-')
           || ':' || (
             SELECT count(*)::text
               FROM jsonb_array_elements(
                      CASE WHEN jsonb_typeof(a.options) = 'array' THEN a.options ELSE '[]'::jsonb END) o
              WHERE coalesce((o.value->>'active')::boolean, true)
           )
         )
    FROM public.attributes a
   WHERE a.id = p_attribute_id;
$$;

REVOKE ALL ON FUNCTION public.get_attribute_options_version(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_attribute_options_version(uuid) TO anon, authenticated;
GRANT ALL ON FUNCTION public.get_attribute_options_version(uuid) TO service_role;

CREATE OR REPLACE FUNCTION public.get_attribute_options(p_attribute_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_opts jsonb;
  v_found boolean;
BEGIN
  SELECT true,
         coalesce((
           SELECT jsonb_agg(
                    jsonb_strip_nulls(jsonb_build_object(
                      'value',    o.value->>'value',
                      'label_en', o.value->>'label_en',
                      'label_am', o.value->>'label_am',
                      'parent',   o.value->>'parent',
                      'aliases',  CASE WHEN jsonb_typeof(o.value->'aliases') = 'array' THEN o.value->'aliases' END,
                      'bounds',   CASE WHEN jsonb_typeof(o.value->'bounds')  = 'object' THEN o.value->'bounds' END,
                      'allowed',  CASE WHEN jsonb_typeof(o.value->'allowed') = 'object' THEN o.value->'allowed' END
                    ))
                    ORDER BY o.ordinality)
             FROM jsonb_array_elements(
                    CASE WHEN jsonb_typeof(a.options) = 'array' THEN a.options ELSE '[]'::jsonb END)
                  WITH ORDINALITY o(value, ordinality)
            WHERE coalesce((o.value->>'active')::boolean, true)
         ), '[]'::jsonb)
    INTO v_found, v_opts
    FROM public.attributes a
   WHERE a.id = p_attribute_id;

  IF NOT coalesce(v_found, false) THEN
    RAISE EXCEPTION 'attributeNotFound';
  END IF;

  RETURN jsonb_build_object(
    'options', v_opts,
    'version', public.get_attribute_options_version(p_attribute_id)
  );
END $$;

REVOKE ALL ON FUNCTION public.get_attribute_options(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_attribute_options(uuid) TO anon, authenticated;
GRANT ALL ON FUNCTION public.get_attribute_options(uuid) TO service_role;

-- ===================================================================== 2.6
-- THE ONE VALIDATION AUTHORITY (DEC-051). Every posting path — A2's door, the
-- console, any future importer — judges attributes here and nowhere else.
--
-- p_prior is the listing's stored attributes on an EDIT: an option that has
-- since been deactivated stays valid while its value is UNCHANGED. It defaults
-- to NULL so the two-argument call form in the spec keeps working.
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
           e.is_required, e.display_order
      FROM public.effective_category_links(p_category_id) e
      JOIN public.attributes a ON a.id = e.attribute_id
     ORDER BY e.display_order, a.attr_key
  LOOP
    v_val := v_attrs -> v_def.attr_key;
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
        -- plate-et, alnum:a-b, free:n. `plate-et` is the Ethiopian civil plate
        -- shape carried by the curation library: a region/code group of one or
        -- two digits, a serial of four to six digits and a two-letter plate
        -- class, separated by hyphens (e.g. 3-12345-AA).
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

-- ===================================================================== PROOFS
DO $proof$
DECLARE
  v_row record;
  v_diff bigint;
  v_txt text;
  v_leaf uuid;
  v_schema jsonb;
  v_cat uuid := gen_random_uuid();
  v_t1 uuid; v_t2 uuid; v_n1 uuid; v_b1 uuid; v_s1 uuid; v_m1 uuid; v_d1 uuid;
  v_cases jsonb;
  v_case jsonb;
  v_res jsonb;
BEGIN
  -- P1 (2.3) — the shared helper reproduces the OLD resolution EXACTLY for
  -- three real categories. The admin reader itself cannot be called here (its
  -- gate needs a session), so the comparison is against an inline copy of the
  -- previous definition's CTE — the substance of the re-declaration.
  FOR v_row IN
    SELECT id, slug FROM public.categories WHERE slug IN ('houses','cars','apartments-condos')
  LOOP
    WITH RECURSIVE anc AS (
      SELECT v_row.id AS src_id, 0 AS depth
      UNION ALL
      SELECT public.cat_primary_parent(a.src_id), a.depth + 1
        FROM anc a
       WHERE a.depth < 10 AND public.cat_primary_parent(a.src_id) IS NOT NULL
    ),
    old AS (
      SELECT DISTINCT ON (l.attribute_id)
             l.id AS lid, l.attribute_id AS aid, l.is_required AS req,
             l.is_filterable AS filt, l.is_searchable AS srch,
             l.display_order AS ord, l.card_rank AS rank,
             (anc.depth > 0) AS inh, anc.src_id AS src
        FROM anc
        JOIN public.category_attribute_links l ON l.category_id = anc.src_id
       ORDER BY l.attribute_id, anc.depth ASC, l.id
    ),
    neu AS (
      SELECT link_id AS lid, attribute_id AS aid, is_required AS req,
             is_filterable AS filt, is_searchable AS srch, display_order AS ord,
             card_rank AS rank, inherited AS inh, origin_id AS src
        FROM public.effective_category_links(v_row.id)
    ),
    d AS (
      (SELECT * FROM old EXCEPT SELECT * FROM neu)
      UNION ALL
      (SELECT * FROM neu EXCEPT SELECT * FROM old)
    )
    SELECT count(*) INTO v_diff FROM d;

    IF v_diff <> 0 THEN
      RAISE EXCEPTION 'PROOF 2.3 FAILED: % rows differ for %', v_diff, v_row.slug;
    END IF;
    RAISE NOTICE 'PROOF 2.3 ok: % — resolution identical (0 differing rows, % effective links)',
      v_row.slug, (SELECT count(*) FROM public.effective_category_links(v_row.id));
  END LOOP;

  -- P2 (2.4) — the public posting read over a real leaf category, plus EXPLAIN.
  SELECT id INTO v_leaf FROM public.categories WHERE slug = 'cars';
  v_schema := public.get_posting_schema(v_leaf);
  IF v_schema->'category'->>'slug' <> 'cars'
     OR jsonb_array_length(v_schema->'attributes') = 0
     OR EXISTS (SELECT 1 FROM jsonb_array_elements(v_schema->'attributes') a WHERE a.value ? 'options') THEN
    RAISE EXCEPTION 'PROOF 2.4 FAILED: %', v_schema;
  END IF;
  RAISE NOTICE 'PROOF 2.4 ok: cars — % attributes, no option lists, first row %',
    jsonb_array_length(v_schema->'attributes'), v_schema->'attributes'->0;
  FOR v_txt IN
    EXECUTE format('EXPLAIN SELECT * FROM public.effective_category_links(%L)', v_leaf)
  LOOP
    RAISE NOTICE 'PROOF 2.4 EXPLAIN: %', v_txt;
  END LOOP;

  -- P3 (2.6) — scratch definitions and links; every refusal reason fires
  -- exactly once, and the ok path normalises. Everything is deleted below; a
  -- failure aborts the migration, so nothing can survive either way.
  INSERT INTO public.categories (id, name_en, slug, price_enabled, is_restricted,
                                 is_active, display_order, is_catchall, allow_listings)
  VALUES (v_cat, 'zz-u6a1-proof', 'zz-u6a1-proof', true, false, true, 9999, false, true);

  INSERT INTO public.attributes (attr_key, name_en, attr_type, max_length)
    VALUES ('zz-u6a1-t1', 'zz t1', 'text', 5) RETURNING id INTO v_t1;
  INSERT INTO public.attributes (attr_key, name_en, attr_type, preset)
    VALUES ('zz-u6a1-t2', 'zz t2', 'text', 'digits:3') RETURNING id INTO v_t2;
  INSERT INTO public.attributes (attr_key, name_en, attr_type, decimals, min_bound, max_bound)
    VALUES ('zz-u6a1-n1', 'zz n1', 'number', 1, '10', '20') RETURNING id INTO v_n1;
  INSERT INTO public.attributes (attr_key, name_en, attr_type)
    VALUES ('zz-u6a1-b1', 'zz b1', 'boolean') RETURNING id INTO v_b1;
  INSERT INTO public.attributes (attr_key, name_en, attr_type, options)
    VALUES ('zz-u6a1-s1', 'zz s1', 'single_select', jsonb_build_array(
      jsonb_build_object('value','a','label_en','A','bounds', jsonb_build_object('zz-u6a1-n1', jsonb_build_object('min', 50))),
      jsonb_build_object('value','other','label_en','Other'),
      jsonb_build_object('value','dead','label_en','Dead','active', false)))
    RETURNING id INTO v_s1;
  INSERT INTO public.attributes (attr_key, name_en, attr_type, options)
    VALUES ('zz-u6a1-m1', 'zz m1', 'multi_select', jsonb_build_array(
      jsonb_build_object('value','a','label_en','A'),
      jsonb_build_object('value','b','label_en','B')))
    RETURNING id INTO v_m1;
  INSERT INTO public.attributes (attr_key, name_en, attr_type, options, depends_on)
    VALUES ('zz-u6a1-d1', 'zz d1', 'single_select', jsonb_build_array(
      jsonb_build_object('value','x','label_en','X','parent','a')), v_s1)
    RETURNING id INTO v_d1;

  INSERT INTO public.category_attribute_links (category_id, attribute_id, is_required, display_order)
  VALUES (v_cat, v_t1, false, 1), (v_cat, v_t2, false, 2), (v_cat, v_n1, false, 3),
         (v_cat, v_b1, true, 4), (v_cat, v_s1, false, 5), (v_cat, v_m1, false, 6),
         (v_cat, v_d1, false, 7);

  v_cases := jsonb_build_array(
    jsonb_build_object('reason','required',         'attrs', '{}'::jsonb),
    jsonb_build_object('reason','unknownAttribute', 'attrs', '{"zz-u6a1-b1": true, "zz-nope": 1}'::jsonb),
    jsonb_build_object('reason','badType',          'attrs', '{"zz-u6a1-b1": true, "zz-u6a1-n1": "abc"}'::jsonb),
    jsonb_build_object('reason','unknownOption',    'attrs', '{"zz-u6a1-b1": true, "zz-u6a1-s1": "zz"}'::jsonb),
    jsonb_build_object('reason','inactiveOption',   'attrs', '{"zz-u6a1-b1": true, "zz-u6a1-s1": "dead"}'::jsonb),
    jsonb_build_object('reason','otherNeedsText',   'attrs', '{"zz-u6a1-b1": true, "zz-u6a1-s1": {"value": "other"}}'::jsonb),
    jsonb_build_object('reason','outOfBounds',      'attrs', '{"zz-u6a1-b1": true, "zz-u6a1-n1": 5}'::jsonb),
    jsonb_build_object('reason','outOfBounds',      'attrs', '{"zz-u6a1-b1": true, "zz-u6a1-s1": "a", "zz-u6a1-n1": 15}'::jsonb),
    jsonb_build_object('reason','badDecimals',      'attrs', '{"zz-u6a1-b1": true, "zz-u6a1-n1": 12.345}'::jsonb),
    jsonb_build_object('reason','badPreset',        'attrs', '{"zz-u6a1-b1": true, "zz-u6a1-t2": "ab"}'::jsonb),
    jsonb_build_object('reason','tooLong',          'attrs', '{"zz-u6a1-b1": true, "zz-u6a1-t1": "abcdefgh"}'::jsonb),
    jsonb_build_object('reason','badMulti',         'attrs', '{"zz-u6a1-b1": true, "zz-u6a1-m1": ["a", "a"]}'::jsonb),
    jsonb_build_object('reason','dependentMissing', 'attrs', '{"zz-u6a1-b1": true, "zz-u6a1-d1": "x"}'::jsonb)
  );

  FOR v_case IN SELECT c.value FROM jsonb_array_elements(v_cases) c LOOP
    v_res := public.validate_listing_attributes(v_cat, v_case->'attrs');
    IF coalesce(v_res->>'ok', '') <> 'false'
       OR jsonb_array_length(v_res->'refusals') <> 1
       OR v_res->'refusals'->0->>'reason' <> (v_case->>'reason') THEN
      RAISE EXCEPTION 'PROOF 2.6 FAILED: expected exactly one % — got %', v_case->>'reason', v_res;
    END IF;
    RAISE NOTICE 'PROOF 2.6 ok: % -> %', v_case->>'reason', v_res->'refusals'->0;
  END LOOP;

  -- inactiveOption is legal on an EDIT while the value is unchanged.
  v_res := public.validate_listing_attributes(v_cat,
    '{"zz-u6a1-b1": true, "zz-u6a1-s1": "dead"}'::jsonb,
    '{"zz-u6a1-s1": "dead"}'::jsonb);
  IF coalesce(v_res->>'ok', '') <> 'true' THEN
    RAISE EXCEPTION 'PROOF 2.6 FAILED: an unchanged inactive option was refused — %', v_res;
  END IF;
  RAISE NOTICE 'PROOF 2.6 ok: unchanged inactive option accepted on edit -> %', v_res;

  -- The ok path normalises: trim, decimal coercion, canonical `other`.
  v_res := public.validate_listing_attributes(v_cat,
    '{"zz-u6a1-b1": true, "zz-u6a1-t1": "  hi  ", "zz-u6a1-t2": "123",
      "zz-u6a1-n1": 15.2, "zz-u6a1-m1": ["a", "b"],
      "zz-u6a1-s1": {"value": "other", "text": "  custom  "}}'::jsonb);
  IF coalesce(v_res->>'ok', '') <> 'true'
     OR v_res->'attrs'->>'zz-u6a1-t1' <> 'hi'
     OR (v_res->'attrs'->>'zz-u6a1-n1')::numeric <> 15.2
     OR v_res->'attrs'->'zz-u6a1-s1'->>'text' <> 'custom'
     OR v_res->'attrs'->'zz-u6a1-s1'->>'value' <> 'other' THEN
    RAISE EXCEPTION 'PROOF 2.6 FAILED: the ok path did not normalise — %', v_res;
  END IF;
  RAISE NOTICE 'PROOF 2.6 ok: normalised -> %', v_res->'attrs';

  -- The posting read over the scratch category carries counts, never lists.
  v_schema := public.get_posting_schema(v_cat);
  IF (SELECT (a.value->>'option_count')::int
        FROM jsonb_array_elements(v_schema->'attributes') a
       WHERE a.value->>'attr_key' = 'zz-u6a1-s1') <> 2
     OR NOT (SELECT (a.value->>'allow_other')::boolean
               FROM jsonb_array_elements(v_schema->'attributes') a
              WHERE a.value->>'attr_key' = 'zz-u6a1-s1') THEN
    RAISE EXCEPTION 'PROOF 2.4 FAILED: option_count/allow_other wrong — %', v_schema;
  END IF;
  RAISE NOTICE 'PROOF 2.4 ok: s1 option_count 2 (the inactive one excluded), allow_other true';

  -- Lazy options: the inactive option is absent and the version is stable.
  v_res := public.get_attribute_options(v_s1);
  IF jsonb_array_length(v_res->'options') <> 2
     OR v_res->>'version' <> public.get_attribute_options_version(v_s1) THEN
    RAISE EXCEPTION 'PROOF 2.5 FAILED: %', v_res;
  END IF;
  RAISE NOTICE 'PROOF 2.5 ok: % ', v_res;

  DELETE FROM public.category_attribute_links WHERE category_id = v_cat;
  DELETE FROM public.attributes WHERE attr_key LIKE 'zz-u6a1-%';
  DELETE FROM public.categories WHERE id = v_cat;
  RAISE NOTICE 'PROOFS: scratch rows removed (% categories left named zz-u6a1-%%)',
    (SELECT count(*) FROM public.categories WHERE slug LIKE 'zz-u6a1-%');
END $proof$;

INSERT INTO public.migration_marks(version) VALUES ('20260917000000') ON CONFLICT DO NOTHING;