-- R-HELP / INC-253 — carry Amharic catalog text through the posting schema.
-- INC-183: the function is re-declared whole from its latest body.
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
    'plan', public.plan_caps(public.seller_plan(auth.uid()))
  );
END $$;

REVOKE ALL ON FUNCTION public.get_posting_schema(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_posting_schema(uuid) TO anon, authenticated;
GRANT ALL ON FUNCTION public.get_posting_schema(uuid) TO service_role;

DO $proof$
DECLARE
  v_cat uuid := gen_random_uuid();
  v_attr uuid := gen_random_uuid();
  v_doc jsonb;
BEGIN
  INSERT INTO public.categories
    (id, name_en, name_am, slug, price_enabled, is_restricted, is_active,
     display_order, is_catchall, allow_listings, capabilities,
     default_price_period, price_period_locked)
  VALUES
    (v_cat, 'e2e-r-help-category', NULL, 'e2e-r-help-' || replace(v_cat::text, '-', ''),
     true, false, true, 999999, false, true, ARRAY[]::text[], 'once', false);

  INSERT INTO public.attributes
    (id, attr_key, name_en, name_am, attr_type, help_text_en, help_text_am)
  VALUES
    (v_attr, 'e2e_r_help_' || replace(v_attr::text, '-', ''),
     'English label', 'የአማርኛ መለያ', 'text', 'English help', 'የአማርኛ እገዛ');

  INSERT INTO public.category_attribute_links
    (category_id, attribute_id, is_required, is_filterable, is_searchable, display_order)
  VALUES (v_cat, v_attr, false, false, false, 1);

  v_doc := public.get_posting_schema(v_cat);
  IF v_doc #>> '{attributes,0,name_am}' IS DISTINCT FROM 'የአማርኛ መለያ'
     OR v_doc #>> '{attributes,0,help_text_am}' IS DISTINCT FROM 'የአማርኛ እገዛ' THEN
    RAISE EXCEPTION 'R-HELP proof failed: Amharic catalog text did not travel';
  END IF;

  RAISE NOTICE 'R-HELP PASS: name_am and help_text_am travel through get_posting_schema';
  RAISE EXCEPTION USING ERRCODE = 'P0001', MESSAGE = 'R_HELP_PROOF_ROLLBACK';
EXCEPTION
  WHEN SQLSTATE 'P0001' THEN
    IF SQLERRM <> 'R_HELP_PROOF_ROLLBACK' THEN RAISE; END IF;
END $proof$;

DO $readback$
DECLARE
  v_def text;
  v_acl text;
BEGIN
  SELECT pg_get_functiondef('public.get_posting_schema(uuid)'::regprocedure),
         array_to_string(coalesce(proacl, acldefault('f', proowner)), ',')
    INTO v_def, v_acl
    FROM pg_proc
   WHERE oid = 'public.get_posting_schema(uuid)'::regprocedure;
  IF position('''name_am'', a.name_am' in v_def) = 0
     OR position('''help_text_am'', a.help_text_am' in v_def) = 0 THEN
    RAISE EXCEPTION 'R-HELP read-back failed: localized fields absent';
  END IF;
  RAISE NOTICE 'READ-BACK get_posting_schema localized=true acl=%', v_acl;
END $readback$;

INSERT INTO public.migration_marks (version)
VALUES ('20260921090000')
ON CONFLICT DO NOTHING;