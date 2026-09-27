-- MIGRATION MARK 20260927010000 — D31-M1 (DEC-079 price basis, part M): schema · shape · read.
-- listings.price_bp (basis points, integer — never a float, E4), commission mode,
-- the pair rule, the DEC-079 basis→shape map, the per-category basis read, and
-- get_posting_schema re-declared WHOLE from 20260921081850 with price_basis_key.

ALTER TABLE public.listings ADD COLUMN IF NOT EXISTS price_bp integer NULL;
ALTER TABLE public.listings DROP CONSTRAINT IF EXISTS listings_price_bp_check;
ALTER TABLE public.listings ADD CONSTRAINT listings_price_bp_check
  CHECK (price_bp IS NULL OR price_bp BETWEEN 1 AND 10000);

ALTER TABLE public.listings DROP CONSTRAINT IF EXISTS listings_price_mode_check;
ALTER TABLE public.listings ADD CONSTRAINT listings_price_mode_check
  CHECK (price_mode IN ('fixed','negotiable','free','contact','commission'));

ALTER TABLE public.listings DROP CONSTRAINT IF EXISTS listings_price_pair_check;
ALTER TABLE public.listings ADD CONSTRAINT listings_price_pair_check
  CHECK ((price_mode = 'commission' AND price_bp IS NOT NULL
          AND price_amount IS NULL AND price_currency IS NULL)
      OR (price_mode <> 'commission' AND price_bp IS NULL
          AND ((price_amount IS NULL) = (price_currency IS NULL))));

CREATE OR REPLACE FUNCTION public.price_shape_for_basis(p_value text)
RETURNS TABLE(forced_mode text, period text)
LANGUAGE sql
IMMUTABLE STRICT
SET search_path = public
AS $$
  SELECT CASE p_value
           WHEN 'quote' THEN 'contact'
           WHEN 'negotiable' THEN 'negotiable'
           WHEN 'commission' THEN 'commission'
           ELSE NULL END::text,
         CASE p_value
           WHEN 'hourly' THEN 'hour'
           WHEN 'per_hour' THEN 'hour'
           WHEN 'per_day' THEN 'day'
           WHEN 'per_night' THEN 'day'
           WHEN 'per_week' THEN 'week'
           WHEN 'per_month' THEN 'month'
           WHEN 'per_year' THEN 'year'
           WHEN 'quote' THEN NULL
           ELSE 'once' END::text;
$$;

REVOKE ALL ON FUNCTION public.price_shape_for_basis(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.price_shape_for_basis(text) TO anon, authenticated;
GRANT ALL ON FUNCTION public.price_shape_for_basis(text) TO service_role;

CREATE OR REPLACE FUNCTION public.price_basis_keys(p_category_id uuid)
RETURNS text[]
LANGUAGE sql
STABLE
SET search_path = public
AS $$
  SELECT COALESCE(array_agg(DISTINCT a.attr_key ORDER BY a.attr_key), ARRAY[]::text[])
    FROM public.effective_category_links(p_category_id) e
    JOIN public.attributes a ON a.id = e.attribute_id
   WHERE a.attr_key ~ '^(pricing_type|unit_of_sale)(-|$)';
$$;

REVOKE ALL ON FUNCTION public.price_basis_keys(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.price_basis_keys(uuid) TO anon, authenticated;
GRANT ALL ON FUNCTION public.price_basis_keys(uuid) TO service_role;

-- INC-183: re-declared WHOLE from 20260921081850 (latest). One addition: v_basis.
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
  v_basis text[];
  v_doc jsonb;
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

  v_basis := public.price_basis_keys(p_category_id);

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
      'price_basis_key', CASE WHEN cardinality(v_basis) = 1 THEN v_basis[1] ELSE NULL END
    ),
    'attributes', v_attrs,
    'plan', public.plan_caps(public.seller_plan(auth.uid()))
  );
  IF cardinality(v_basis) >= 2 THEN
    v_doc := v_doc || jsonb_build_object('refusals', jsonb_build_array(
      jsonb_build_object('reason','priceBasisAmbiguous',
                         'detail', array_to_string(v_basis, '|'))));
  END IF;
  RETURN v_doc;
END $$;

REVOKE ALL ON FUNCTION public.get_posting_schema(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_posting_schema(uuid) TO anon, authenticated;
GRANT ALL ON FUNCTION public.get_posting_schema(uuid) TO service_role;

-- Census (reported as numbers, not asserted — D31-M ruling).
DO $census$
DECLARE v_c1 int; v_c1s text; v_c2 int; v_c2s text;
BEGIN
  SELECT count(*), string_agg(slug, ',' ORDER BY slug) INTO v_c1, v_c1s
    FROM public.categories c
   WHERE c.price_period_locked AND cardinality(public.price_basis_keys(c.id)) >= 1;
  SELECT count(*), string_agg(slug || '=' || array_to_string(public.price_basis_keys(c.id), '|'), ', ' ORDER BY slug)
    INTO v_c2, v_c2s
    FROM public.categories c
   WHERE cardinality(public.price_basis_keys(c.id)) >= 2;
  RAISE NOTICE 'CENSUS C1 = % slugs=%', v_c1, COALESCE(v_c1s, '');
  RAISE NOTICE 'CENSUS C2 = % %', v_c2, COALESCE(v_c2s, '');
END $census$;

-- Proofs on scratch rows only; rolled back by sentinel.
DO $proof$
DECLARE
  v_leaf uuid := gen_random_uuid();
  v_bare uuid := gen_random_uuid();
  v_a1 uuid := gen_random_uuid();
  v_a2 uuid := gen_random_uuid();
  v_doc jsonb;
  v_r record;
  v_tok text;
  v_exp text[][] := ARRAY[
    ['hourly','','hour'],['per_hour','','hour'],['per_day','','day'],['per_night','','day'],
    ['per_week','','week'],['per_month','','month'],['per_year','','year'],
    ['quote','contact',''],['negotiable','negotiable','once'],['commission','commission','once'],
    ['per_quintal','','once'],['other','','once']];
  i int;
BEGIN
  FOR i IN 1..array_length(v_exp, 1) LOOP
    SELECT * INTO v_r FROM public.price_shape_for_basis(v_exp[i][1]);
    IF COALESCE(v_r.forced_mode,'') <> v_exp[i][2] OR COALESCE(v_r.period,'') <> v_exp[i][3] THEN
      RAISE EXCEPTION 'PROOF S1 failed on %: (%,%)', v_exp[i][1], v_r.forced_mode, v_r.period;
    END IF;
  END LOOP;
  RAISE NOTICE 'PROOF S1 ok';

  IF position('commission' in pg_get_constraintdef((SELECT oid FROM pg_constraint WHERE conname='listings_price_mode_check'))) = 0
     OR position('price_bp' in pg_get_constraintdef((SELECT oid FROM pg_constraint WHERE conname='listings_price_pair_check'))) = 0
     OR position('commission' in pg_get_constraintdef((SELECT oid FROM pg_constraint WHERE conname='listings_price_pair_check'))) = 0
     OR position('10000' in pg_get_constraintdef((SELECT oid FROM pg_constraint WHERE conname='listings_price_bp_check'))) = 0 THEN
    RAISE EXCEPTION 'PROOF S2 failed';
  END IF;
  RAISE NOTICE 'PROOF S2 ok';

  INSERT INTO public.categories
    (id, name_en, slug, price_enabled, is_restricted, is_active, display_order,
     is_catchall, allow_listings, capabilities, default_price_period, price_period_locked)
  VALUES
    (v_leaf, 'e2e-d31m-leaf', 'e2e-d31m-' || replace(v_leaf::text,'-',''), true, false, true, 999999,
     false, true, ARRAY[]::text[], 'once', false),
    (v_bare, 'e2e-d31m-bare', 'e2e-d31m-' || replace(v_bare::text,'-',''), true, false, true, 999999,
     false, true, ARRAY[]::text[], 'once', false);
  INSERT INTO public.attributes (id, attr_key, name_en, attr_type)
  VALUES (v_a1, 'pricing_type-zzd31', 'e2e d31 basis 1', 'text'),
         (v_a2, 'unit_of_sale-zzd31', 'e2e d31 basis 2', 'text');
  INSERT INTO public.category_attribute_links
    (category_id, attribute_id, is_required, is_filterable, is_searchable, display_order)
  VALUES (v_leaf, v_a1, false, false, false, 1);

  v_doc := public.get_posting_schema(v_leaf);
  IF v_doc #>> '{category,price_basis_key}' IS DISTINCT FROM 'pricing_type-zzd31' OR v_doc ? 'refusals' THEN
    RAISE EXCEPTION 'PROOF S3 failed %', v_doc->'category';
  END IF;
  RAISE NOTICE 'PROOF S3 ok';

  INSERT INTO public.category_attribute_links
    (category_id, attribute_id, is_required, is_filterable, is_searchable, display_order)
  VALUES (v_leaf, v_a2, false, false, false, 2);
  v_doc := public.get_posting_schema(v_leaf);
  IF v_doc #>> '{category,price_basis_key}' IS NOT NULL
     OR v_doc #>> '{refusals,0,reason}' IS DISTINCT FROM 'priceBasisAmbiguous' THEN
    RAISE EXCEPTION 'PROOF S4 failed %', v_doc;
  END IF;
  RAISE NOTICE 'PROOF S4 ok';

  v_doc := public.get_posting_schema(v_bare);
  IF v_doc #>> '{category,price_basis_key}' IS NOT NULL OR v_doc ? 'refusals' THEN
    RAISE EXCEPTION 'PROOF S5 failed';
  END IF;
  RAISE NOTICE 'PROOF S5 ok';

  RAISE EXCEPTION USING ERRCODE = 'P0001', MESSAGE = 'D31M1_PROOF_ROLLBACK';
EXCEPTION
  WHEN SQLSTATE 'P0001' THEN
    IF SQLERRM <> 'D31M1_PROOF_ROLLBACK' THEN RAISE; END IF;
END $proof$;

DO $readback$
DECLARE v_fn text; v_acl text;
BEGIN
  FOREACH v_fn IN ARRAY ARRAY['public.price_shape_for_basis(text)','public.price_basis_keys(uuid)','public.get_posting_schema(uuid)']
  LOOP
    SELECT array_to_string(coalesce(proacl, acldefault('f', proowner)), ',') INTO v_acl
      FROM pg_proc WHERE oid = v_fn::regprocedure;
    RAISE NOTICE 'READ-BACK % acl=%', v_fn, v_acl;
  END LOOP;
  IF position('price_basis_key' in pg_get_functiondef('public.get_posting_schema(uuid)'::regprocedure)) = 0 THEN
    RAISE EXCEPTION 'READ-BACK failed: price_basis_key absent';
  END IF;
END $readback$;

INSERT INTO public.migration_marks (version)
VALUES ('20260927010000')
ON CONFLICT DO NOTHING;