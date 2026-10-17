-- Bundle 19 turn 9c (2026-10-17). Tier A. D201 §4 — M2 PART a OF EIGHT: THE fact_rank COLUMN, THE LINK READERS, THE SET DOOR.
-- e2e-areas: admin-attributes, admin-categories, posting, ad-page
-- The key-facts strip (the operator's ruling of 2026-10-16: CURATED like the card facts). This part: the column
-- category_attribute_links.fact_rank smallint NULL, CHECK 1–4, UNIQUE (category_id, fact_rank) DEFERRABLE INITIALLY
-- IMMEDIATE (the card rank's shape, 20260906035541 :49; no inherited-rank rule); effective_category_links [last declared
-- 20260916235955], get_posting_schema [20261005172453] and the two admin link lists [20260920035859] redeclared WHOLE
-- with the fact cell where the card cell travels (the three table-returning doors change shape: DROP, CREATE, grants
-- restated); admin_set_fact_attributes(p_category_id, p_ordered_attribute_ids) born closed — the link manager's "Key
-- fact" ticks in the shape of admin_set_card_attributes (20260911223202): categories.update + step-up, at most four,
-- links must exist, old ranks cleared then the order written, audited attribute.set_facts; EXECUTE to authenticated
-- (scripts/public-surface-allowlist.txt names it). Parts b–e carry the other five doors.
-- BODY PROOFS (DEC-190): a body is proven by its FINGERPRINT — md5 of the text with carriage returns and `--` comments
-- removed and, outside single-quoted literals, every run of whitespace collapsed to one space — so the spacing a
-- retyped submission may change never refuses an apply (INC-685), while any changed token or literal still does;
-- header attributes (volatility, SECURITY DEFINER, search_path) are proven as before. A clean apply is the pass.
-- Proofs P1–P5, RAISE EXCEPTION on any failure: the column and its two constraints; every body by fingerprint and
-- header; the grants; the set door refused with no caller; on scratch e2e-mig- rows (created and removed here) the
-- effective links carry the rank and the unique and the check refuse. The mark 20261018150000.
-- Applied on ethio-prod by the executor's migration tool (DEC-188); the operator applies the saved files on ethio-staging
-- in order and reads back the marks. The eight parts are applied in order a → b → c1 → c2 → c3 → c4 → d → e in one turn,
-- nothing between them; each later part's first block refuses to run before the earlier one has landed; every part is
-- idempotent (a second apply changes nothing and the proofs still run).

-- ===== A — the column =====
ALTER TABLE public.category_attribute_links
  ADD COLUMN IF NOT EXISTS fact_rank smallint NULL;
DO $ddl$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                   WHERE conrelid = 'public.category_attribute_links'::regclass
                    AND conname = 'category_attribute_links_fact_rank_range') THEN
    ALTER TABLE public.category_attribute_links
      ADD CONSTRAINT category_attribute_links_fact_rank_range CHECK (fact_rank IS NULL OR fact_rank BETWEEN 1 AND 4);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conrelid = 'public.category_attribute_links'::regclass
                    AND conname = 'category_attribute_links_fact_rank_unique') THEN
    ALTER TABLE public.category_attribute_links
      ADD CONSTRAINT category_attribute_links_fact_rank_unique UNIQUE (category_id, fact_rank) DEFERRABLE INITIALLY IMMEDIATE;
  END IF;
END $ddl$;

-- ===== B — the readers of the link (effective_category_links changes return shape: dropped, re-created) =====
DROP FUNCTION IF EXISTS public.effective_category_links(uuid);
CREATE OR REPLACE FUNCTION public.effective_category_links(p_category_id uuid)
RETURNS TABLE (
  attribute_id  uuid,
  is_required   boolean,
  is_filterable boolean,
  is_searchable boolean,
  display_order integer,
  card_rank     integer,
  fact_rank     integer,
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
           l.fact_rank::integer AS fact,
           anc.depth AS depth, anc.src_id AS src, l.id AS lid
      FROM anc
      JOIN public.category_attribute_links l ON l.category_id = anc.src_id
     ORDER BY l.attribute_id, anc.depth ASC, l.id
  )
  SELECT eff.aid, eff.req, eff.filt, eff.srch, eff.ord, eff.rank, eff.fact,
         (eff.depth > 0), eff.src, eff.lid
    FROM eff;
$$;
REVOKE ALL ON FUNCTION public.effective_category_links(uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.effective_category_links(uuid) FROM anon;
REVOKE ALL ON FUNCTION public.effective_category_links(uuid) FROM authenticated;
GRANT ALL ON FUNCTION public.effective_category_links(uuid) TO service_role;

CREATE OR REPLACE FUNCTION public.get_posting_schema(p_category_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
VOLATILE SECURITY DEFINER
SET search_path TO 'public'
AS $m8c$
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
               -- B19 M2 (D201 §4) — the key-facts rank and the filter flag travel to every
               -- preview, so one reader rule draws the strip on the page and in the previews.
               'fact_rank', e.fact_rank,
               'is_filterable', e.is_filterable,
               'unit', a.unit,
               'unit_am', a.unit_am,
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
END $m8c$;
REVOKE ALL ON FUNCTION public.get_posting_schema(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_posting_schema(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.get_posting_schema(uuid) TO service_role;

DROP FUNCTION IF EXISTS public.admin_list_category_attribute_links(uuid);
CREATE OR REPLACE FUNCTION public.admin_list_category_attribute_links(p_category_id uuid)
RETURNS TABLE(link_id uuid, attribute_id uuid, attr_key text, name_en text, attr_type text,
              options jsonb, is_required boolean, is_filterable boolean,
              display_order integer, card_rank integer, fact_rank integer, depends_on_key text,
              allowed_options text[], default_value jsonb, visible_when jsonb)
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'view') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;

  RETURN QUERY
  SELECT l.id, a.id, a.attr_key, a.name_en, a.attr_type, a.options,
         l.is_required, l.is_filterable, l.display_order, l.card_rank, l.fact_rank::integer,
         (SELECT p.attr_key FROM public.attributes p WHERE p.id = a.depends_on),
         l.allowed_options, l.default_value, l.visible_when
    FROM public.category_attribute_links l
    JOIN public.attributes a ON a.id = l.attribute_id
   WHERE l.category_id = p_category_id
   ORDER BY l.display_order, a.name_en;
END $function$;
REVOKE ALL ON FUNCTION public.admin_list_category_attribute_links(uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.admin_list_category_attribute_links(uuid) FROM anon;
GRANT EXECUTE ON FUNCTION public.admin_list_category_attribute_links(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.admin_list_category_attribute_links(uuid) TO service_role;

DROP FUNCTION IF EXISTS public.admin_list_effective_category_links(uuid);
CREATE OR REPLACE FUNCTION public.admin_list_effective_category_links(p_category_id uuid)
RETURNS TABLE(link_id uuid, attribute_id uuid, attr_key text, name_en text, attr_type text,
              options jsonb, is_required boolean, is_filterable boolean,
              display_order integer, card_rank integer, fact_rank integer, inherited boolean,
              origin_id uuid, origin_slug text, origin_name_en text, depends_on_key text,
              allowed_options text[], default_value jsonb, visible_when jsonb)
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
         e.is_required, e.is_filterable, e.display_order, e.card_rank, e.fact_rank,
         e.inherited, src.id, src.slug, src.name_en,
         (SELECT p.attr_key FROM public.attributes p WHERE p.id = a.depends_on),
         l.allowed_options, l.default_value, l.visible_when
    FROM public.effective_category_links(p_category_id) e
    JOIN public.attributes a ON a.id = e.attribute_id
    JOIN public.categories src ON src.id = e.origin_id
    JOIN public.category_attribute_links l ON l.id = e.link_id
   ORDER BY e.inherited, e.display_order, a.name_en;
END $function$;
REVOKE ALL ON FUNCTION public.admin_list_effective_category_links(uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.admin_list_effective_category_links(uuid) FROM anon;
GRANT EXECUTE ON FUNCTION public.admin_list_effective_category_links(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.admin_list_effective_category_links(uuid) TO service_role;

-- ===== C — admin_set_fact_attributes (new; the link manager's Key fact ticks) =====
CREATE OR REPLACE FUNCTION public.admin_set_fact_attributes(
  p_category_id uuid, p_ordered_attribute_ids uuid[]
) RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_ids uuid[];
  v_old jsonb;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'update') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('categories', 'update');

  v_ids := COALESCE(p_ordered_attribute_ids, '{}');

  IF array_length(v_ids, 1) > 4 THEN
    RAISE EXCEPTION 'admin.attributes.error.factLimit' USING ERRCODE = 'P0010';
  END IF;

  IF EXISTS (
    SELECT 1 FROM unnest(v_ids) AS aid
     WHERE NOT EXISTS (SELECT 1 FROM public.category_attribute_links l
                        WHERE l.category_id = p_category_id AND l.attribute_id = aid)
  ) THEN
    RAISE EXCEPTION 'admin.attributes.error.linkNotFound' USING ERRCODE = 'P0010';
  END IF;

  SELECT COALESCE(jsonb_agg(jsonb_build_object('attribute_id', l.attribute_id, 'fact_rank', l.fact_rank)
                            ORDER BY l.fact_rank), '[]'::jsonb)
    INTO v_old
    FROM public.category_attribute_links l
   WHERE l.category_id = p_category_id AND l.fact_rank IS NOT NULL;

  UPDATE public.category_attribute_links
     SET fact_rank = NULL, updated_at = now()
   WHERE category_id = p_category_id AND fact_rank IS NOT NULL;

  UPDATE public.category_attribute_links l
     SET fact_rank = u.ord::smallint, updated_at = now()
    FROM unnest(v_ids) WITH ORDINALITY AS u(aid, ord)
   WHERE l.category_id = p_category_id AND l.attribute_id = u.aid;

  PERFORM public.log_audit('attribute.set_facts', 'categories', p_category_id::text,
    jsonb_build_object('old', v_old, 'new', to_jsonb(v_ids)));
END $$;
REVOKE ALL ON FUNCTION public.admin_set_fact_attributes(uuid, uuid[]) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_set_fact_attributes(uuid, uuid[]) TO authenticated;
GRANT ALL ON FUNCTION public.admin_set_fact_attributes(uuid, uuid[]) TO service_role;

-- ===== D — proofs =====
DO $proof$
DECLARE
  v_fp text; v_vol "char"; v_def boolean; v_cfg text; v_n integer; v_err text;
  v_root uuid; v_leaf uuid; v_a1 uuid; v_a2 uuid; v_a3 uuid;
  v_slug text := 'e2e-mig-b19m2a-' || substr(md5(random()::text), 1, 8);
BEGIN
  -- P1. The column, its range check and its uniqueness.
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                  WHERE table_schema = 'public' AND table_name = 'category_attribute_links'
                    AND column_name = 'fact_rank' AND data_type = 'smallint' AND is_nullable = 'YES') THEN
    RAISE EXCEPTION 'B19M2a P1: category_attribute_links.fact_rank is not a nullable smallint';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conrelid = 'public.category_attribute_links'::regclass
                    AND conname = 'category_attribute_links_fact_rank_range' AND contype = 'c') THEN
    RAISE EXCEPTION 'B19M2a P1: the range check is missing';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conrelid = 'public.category_attribute_links'::regclass
                    AND conname = 'category_attribute_links_fact_rank_unique' AND contype = 'u' AND condeferrable) THEN
    RAISE EXCEPTION 'B19M2a P1: the deferrable unique constraint is missing';
  END IF;
  -- P2. Every body landed (fingerprint), with its header attributes.
  SELECT (SELECT md5(string_agg(CASE WHEN t.ord % 2 = 1 THEN btrim(regexp_replace(t.seg, '\s+', ' ', 'g')) ELSE t.seg END, '''' ORDER BY t.ord)) FROM regexp_split_to_table(regexp_replace(replace(p.prosrc, chr(13), ''), '--[^\n]*', '', 'g'), '''') WITH ORDINALITY AS t(seg, ord)), p.provolatile, p.prosecdef, coalesce(array_to_string(p.proconfig, ','), '')
    INTO v_fp, v_vol, v_def, v_cfg FROM pg_proc p WHERE p.oid = 'public.effective_category_links(uuid)'::regprocedure;
  IF v_fp <> '5a88d8bd4e368abdef43f17fcd8cebdf' THEN RAISE EXCEPTION 'B19M2a P2: effective_category_links body is not the one written (fingerprint %)', v_fp; END IF;
  IF v_vol <> 's' OR v_def <> true OR v_cfg NOT LIKE '%search_path=public%' THEN
    RAISE EXCEPTION 'B19M2a P2: effective_category_links header changed (volatile %, definer %, config %)', v_vol, v_def, v_cfg;
  END IF;
  SELECT (SELECT md5(string_agg(CASE WHEN t.ord % 2 = 1 THEN btrim(regexp_replace(t.seg, '\s+', ' ', 'g')) ELSE t.seg END, '''' ORDER BY t.ord)) FROM regexp_split_to_table(regexp_replace(replace(p.prosrc, chr(13), ''), '--[^\n]*', '', 'g'), '''') WITH ORDINALITY AS t(seg, ord)), p.provolatile, p.prosecdef, coalesce(array_to_string(p.proconfig, ','), '')
    INTO v_fp, v_vol, v_def, v_cfg FROM pg_proc p WHERE p.oid = 'public.get_posting_schema(uuid)'::regprocedure;
  IF v_fp <> '0a58edc034b18a3975d230f5cb1ece51' THEN RAISE EXCEPTION 'B19M2a P2: get_posting_schema body is not the one written (fingerprint %)', v_fp; END IF;
  IF v_vol <> 'v' OR v_def <> true OR v_cfg NOT LIKE '%search_path=public%' THEN
    RAISE EXCEPTION 'B19M2a P2: get_posting_schema header changed (volatile %, definer %, config %)', v_vol, v_def, v_cfg;
  END IF;
  SELECT (SELECT md5(string_agg(CASE WHEN t.ord % 2 = 1 THEN btrim(regexp_replace(t.seg, '\s+', ' ', 'g')) ELSE t.seg END, '''' ORDER BY t.ord)) FROM regexp_split_to_table(regexp_replace(replace(p.prosrc, chr(13), ''), '--[^\n]*', '', 'g'), '''') WITH ORDINALITY AS t(seg, ord)), p.provolatile, p.prosecdef, coalesce(array_to_string(p.proconfig, ','), '')
    INTO v_fp, v_vol, v_def, v_cfg FROM pg_proc p WHERE p.oid = 'public.admin_list_category_attribute_links(uuid)'::regprocedure;
  IF v_fp <> '92d01d341d053e3609da7bee11a6fbdd' THEN RAISE EXCEPTION 'B19M2a P2: admin_list_category_attribute_links body is not the one written (fingerprint %)', v_fp; END IF;
  IF v_vol <> 's' OR v_def <> true OR v_cfg NOT LIKE '%search_path=public%' THEN
    RAISE EXCEPTION 'B19M2a P2: admin_list_category_attribute_links header changed (volatile %, definer %, config %)', v_vol, v_def, v_cfg;
  END IF;
  SELECT (SELECT md5(string_agg(CASE WHEN t.ord % 2 = 1 THEN btrim(regexp_replace(t.seg, '\s+', ' ', 'g')) ELSE t.seg END, '''' ORDER BY t.ord)) FROM regexp_split_to_table(regexp_replace(replace(p.prosrc, chr(13), ''), '--[^\n]*', '', 'g'), '''') WITH ORDINALITY AS t(seg, ord)), p.provolatile, p.prosecdef, coalesce(array_to_string(p.proconfig, ','), '')
    INTO v_fp, v_vol, v_def, v_cfg FROM pg_proc p WHERE p.oid = 'public.admin_list_effective_category_links(uuid)'::regprocedure;
  IF v_fp <> '81d4e9f828a6cf383e5a2c81bd6f5bde' THEN RAISE EXCEPTION 'B19M2a P2: admin_list_effective_category_links body is not the one written (fingerprint %)', v_fp; END IF;
  IF v_vol <> 's' OR v_def <> true OR v_cfg NOT LIKE '%search_path=public%' THEN
    RAISE EXCEPTION 'B19M2a P2: admin_list_effective_category_links header changed (volatile %, definer %, config %)', v_vol, v_def, v_cfg;
  END IF;
  SELECT (SELECT md5(string_agg(CASE WHEN t.ord % 2 = 1 THEN btrim(regexp_replace(t.seg, '\s+', ' ', 'g')) ELSE t.seg END, '''' ORDER BY t.ord)) FROM regexp_split_to_table(regexp_replace(replace(p.prosrc, chr(13), ''), '--[^\n]*', '', 'g'), '''') WITH ORDINALITY AS t(seg, ord)), p.provolatile, p.prosecdef, coalesce(array_to_string(p.proconfig, ','), '')
    INTO v_fp, v_vol, v_def, v_cfg FROM pg_proc p WHERE p.oid = 'public.admin_set_fact_attributes(uuid, uuid[])'::regprocedure;
  IF v_fp <> 'e58443e813b92db49f70d22921e6efa3' THEN RAISE EXCEPTION 'B19M2a P2: admin_set_fact_attributes body is not the one written (fingerprint %)', v_fp; END IF;
  IF v_vol <> 'v' OR v_def <> true OR v_cfg NOT LIKE '%search_path=public%' THEN
    RAISE EXCEPTION 'B19M2a P2: admin_set_fact_attributes header changed (volatile %, definer %, config %)', v_vol, v_def, v_cfg;
  END IF;
  -- P3. The grants.
  IF has_function_privilege('anon', 'public.effective_category_links(uuid)', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.effective_category_links(uuid)', 'EXECUTE')
     OR has_function_privilege('anon', 'public.admin_set_fact_attributes(uuid, uuid[])', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.admin_set_fact_attributes(uuid, uuid[])', 'EXECUTE')
     OR has_function_privilege('anon', 'public.admin_list_category_attribute_links(uuid)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.admin_list_category_attribute_links(uuid)', 'EXECUTE')
     OR has_function_privilege('anon', 'public.admin_list_effective_category_links(uuid)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.admin_list_effective_category_links(uuid)', 'EXECUTE')
     OR has_function_privilege('anon', 'public.get_posting_schema(uuid)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.get_posting_schema(uuid)', 'EXECUTE') THEN
    RAISE EXCEPTION 'B19M2a P3: the grants are not as written';
  END IF;
  -- P4. The set door with no caller is refused at its first gate.
  BEGIN
    PERFORM public.admin_set_fact_attributes(gen_random_uuid(), ARRAY[]::uuid[]);
    RAISE EXCEPTION 'B19M2a P4: admin_set_fact_attributes answered with no caller';
  EXCEPTION WHEN OTHERS THEN
    GET STACKED DIAGNOSTICS v_err = MESSAGE_TEXT;
    IF v_err NOT LIKE '%permission denied%' THEN RAISE; END IF;
  END;
  -- Scratch rows (e2e-mig-, removed below): a root, an active leaf, three attributes, three links — ranks 2, 1 and none.
  INSERT INTO public.categories (name_en, slug, is_active, allow_listings)
  VALUES ('e2e-mig- B19M2a root', v_slug || '-root', true, false) RETURNING id INTO v_root;
  INSERT INTO public.categories (name_en, slug, is_active, allow_listings)
  VALUES ('e2e-mig- B19M2a leaf', v_slug, true, true) RETURNING id INTO v_leaf;
  INSERT INTO public.category_tree_pointers (parent_id, child_id) VALUES (v_root, v_leaf);
  INSERT INTO public.attributes (attr_key, name_en, attr_type, options)
  VALUES (v_slug || '-a1', 'e2e-mig- A1', 'single_select', '[{"value":"x","label":"X"}]'::jsonb) RETURNING id INTO v_a1;
  INSERT INTO public.attributes (attr_key, name_en, attr_type)
  VALUES (v_slug || '-a2', 'e2e-mig- A2', 'number') RETURNING id INTO v_a2;
  INSERT INTO public.attributes (attr_key, name_en, attr_type)
  VALUES (v_slug || '-a3', 'e2e-mig- A3', 'text') RETURNING id INTO v_a3;
  INSERT INTO public.category_attribute_links (category_id, attribute_id, display_order, is_filterable, fact_rank)
  VALUES (v_leaf, v_a1, 1, true, 2), (v_leaf, v_a2, 2, true, 1), (v_leaf, v_a3, 3, false, NULL);
  -- P5. The effective links carry the rank; the unique and the check refuse.
  SELECT count(*) INTO v_n FROM public.effective_category_links(v_leaf) e
   WHERE (e.attribute_id = v_a1 AND e.fact_rank = 2) OR (e.attribute_id = v_a2 AND e.fact_rank = 1)
      OR (e.attribute_id = v_a3 AND e.fact_rank IS NULL);
  IF v_n <> 3 THEN RAISE EXCEPTION 'B19M2a P5: effective_category_links does not carry the ranks (n=%)', v_n; END IF;
  BEGIN
    UPDATE public.category_attribute_links SET fact_rank = 2 WHERE category_id = v_leaf AND attribute_id = v_a3;
    RAISE EXCEPTION 'B19M2a P5: two links of one category took rank 2';
  EXCEPTION WHEN unique_violation THEN NULL;
  END;
  BEGIN
    UPDATE public.category_attribute_links SET fact_rank = 5 WHERE category_id = v_leaf AND attribute_id = v_a3;
    RAISE EXCEPTION 'B19M2a P5: rank 5 was accepted';
  EXCEPTION WHEN check_violation THEN NULL;
  END;
  -- (the two admin lists gate on has_permission and need a caller: their bodies are proven by fingerprint in P2 and the
  --  helper they wrap by P5; their rows are proven by the admin-attributes route tests of turn 10.)
  DELETE FROM public.category_attribute_links WHERE category_id IN (v_root, v_leaf);
  DELETE FROM public.category_tree_pointers WHERE child_id = v_leaf;
  DELETE FROM public.attributes WHERE id IN (v_a1, v_a2, v_a3) AND attr_key LIKE 'e2e-mig-%';
  DELETE FROM public.categories WHERE id IN (v_root, v_leaf) AND slug LIKE 'e2e-mig-%';
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261018150000') ON CONFLICT (version) DO NOTHING;
