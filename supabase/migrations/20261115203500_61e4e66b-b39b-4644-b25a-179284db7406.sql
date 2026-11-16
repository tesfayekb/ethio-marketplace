-- e2e-areas: posting, door-refusals

-- Foundations 1, turn F1-5a, part 6 — THE POSTING SCHEMA AND OPTIONS READS ONTO DOOR_CONTEXT AND THE SHELL (DEC-333, DEC-391; brief
-- docs/governance/briefs/f1-doors-5a.md, ruling docs/governance/briefs/f1-doors-5a-ruling-1.md).
-- get_posting_schema and get_attribute_options are redeclared WHOLE from their last declarations (live md5
-- checked): ONE door_context('owner', …) gate each on the dial it spent (schema_read, options_read), their
-- refusals by door_refuse codes, the shell. Folds: 'not signed in' → notSignedIn; 'account is deactivated' → accountDeactivated;
-- 'category not found' → categoryNotFound; 'category is inactive' → categoryInactive; 'category does not accept
-- listings' → categoryNotPostable; 'attribute not found' → attributeNotFound.

DO $pre$
DECLARE
  v_pairs text[][] := ARRAY[
    ['public.get_posting_schema(uuid)', 'a1bb0e2a63ce2d61525794c6e403305c'],
    ['public.get_attribute_options(uuid)', 'd2d32fec25ac42b8ab8233bcaecc618c']];
  v_md5  text;
  i      integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261116030300') THEN
    RAISE EXCEPTION 'F1-5a part 6: part 5 (mark 20261116030300) must be applied first';
  END IF;
  IF to_regprocedure('public.door_refuse(text,text)') IS NULL
     OR to_regprocedure('public.door_refused(text,text,text)') IS NULL
     OR NOT EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'door_context' AND pronamespace = 'public'::regnamespace) THEN
    RAISE EXCEPTION 'F1-5a part 6: the door mechanism (door_context, door_refuse, door_refused) is missing';
  END IF;
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_pairs[i][1]::regprocedure;
    IF v_md5 IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-5a part 6: the live % is not its last declaration''s body (%)', v_pairs[i][1], v_md5;
    END IF;
  END LOOP;
END $pre$;

-- ------------------------------------------------------------ 1. get_posting_schema (whole; the owner gate and the shell)
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
  v_deal jsonb;
  v_has_unit boolean;
BEGIN
  PERFORM public.door_context('owner', NULL, NULL, 'schema_read');

  SELECT * INTO v_cat FROM public.categories WHERE id = p_category_id;
  IF v_cat.id IS NULL THEN
    PERFORM public.door_refuse('categoryNotFound');
  END IF;
  IF NOT v_cat.is_active THEN
    PERFORM public.door_refuse('categoryInactive');
  END IF;
  IF NOT v_cat.allow_listings THEN
    PERFORM public.door_refuse('categoryNotPostable');
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
    -- P-2 (c) M-3a (D311, DEC-351) — a new ad's caps: the baseline level's photos for this category and
    -- the default market's included reach (a NULL cap = no limit); an ad being edited reads its own.
    'plan', (SELECT jsonb_build_object(
               'plan', r.key,
               'max_photos', public.level_perks_for(public.baseline_level_key(), p_category_id, NULL::character)->'max_photos',
               'max_cities', r.max_cities,
               'max_regions', r.max_regions,
               'max_countries', r.max_countries)
               FROM public.listing_packages r
              WHERE r.key = (public.market_settings_for(NULL::character)).included_reach AND r.kind = 'reach')
  );
  -- M5 / DEC-109 — no schema-time priceBasisAmbiguous: ambiguity is judged
  -- with the answers (price_basis_in_force, validate_listing_draft step 4).
  RETURN v_doc;
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('get_posting_schema', 'schema_read', SQLERRM);
END $m8c$
;
REVOKE ALL ON FUNCTION public.get_posting_schema(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_posting_schema(uuid) TO authenticated, service_role;

-- ------------------------------------------------------------ 2. get_attribute_options (whole; the owner gate and the shell)
CREATE OR REPLACE FUNCTION public.get_attribute_options(p_attribute_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 VOLATILE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_opts jsonb;
  v_found boolean;
BEGIN
  -- M5 step 20 — every read counts under options_read; the function is
  -- VOLATILE on purpose because the gate writes the meter.
  PERFORM public.door_context('owner', NULL, NULL, 'options_read');

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
                      'allowed',  CASE WHEN jsonb_typeof(o.value->'allowed') = 'object' THEN o.value->'allowed' END,
                      'facts',    CASE WHEN jsonb_typeof(o.value->'facts')   = 'object' THEN o.value->'facts' END,
                      -- D28 / M-SWATCH — the declared colour, projected for the
                      -- posting form. A non-string cell is silence (the shape
                      -- rule refuses one at the door).
                      'swatch',   CASE WHEN jsonb_typeof(o.value->'swatch')  = 'string' THEN o.value->'swatch' END
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
    PERFORM public.door_refuse('attributeNotFound');
  END IF;

  RETURN jsonb_build_object(
    'options', v_opts,
    'version', public.get_attribute_options_version(p_attribute_id),
    'retired', coalesce((
      SELECT jsonb_agg(jsonb_build_object(
        'value', o.value->>'value', 'label_en', o.value->>'label_en',
        'label_am', o.value->>'label_am') ORDER BY o.ordinality)
        FROM public.attributes a
        CROSS JOIN LATERAL jsonb_array_elements(
          CASE WHEN jsonb_typeof(a.options) = 'array' THEN a.options ELSE '[]'::jsonb END)
          WITH ORDINALITY o(value, ordinality)
       WHERE a.id = p_attribute_id AND (o.value->>'active')::boolean = false
    ), '[]'::jsonb)
  );
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('get_attribute_options', 'options_read', SQLERRM);
END $function$
;
REVOKE ALL ON FUNCTION public.get_attribute_options(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_attribute_options(uuid) TO authenticated, service_role;


-- Proof: catalog facts, then the calls on scratch rows under a sentinel rollback.
DO $proof$
DECLARE
  v_hex     text := replace(gen_random_uuid()::text, '-', '');
  v_tag     text;
  -- 'XZ': a scratch code no market holds, as earlier proofs' (K4: a recorded proof exception)
  v_code    character(2) := 'XZ';
  v_lang    text := public.language_code('base');
  v_a       uuid := gen_random_uuid();
  v_b       uuid := gen_random_uuid();
  v_d       uuid := gen_random_uuid();
  v_none    uuid := gen_random_uuid();
  v_ca      text := json_build_object('sub', v_a::text, 'role', 'authenticated')::text;
  v_cb      text := json_build_object('sub', v_b::text, 'role', 'authenticated')::text;
  v_cd      text := json_build_object('sub', v_d::text, 'role', 'authenticated')::text;
  v_r0      text;
  v_anc     uuid;
  v_region  uuid;
  v_city    uuid;
  v_cat     uuid;
  v_answer  jsonb;
  v_count   integer;
  v_refused bigint;
  v_snap    text;
  v_snap2   text;
  v_msg     text;
  v_fn      regprocedure;
  v_pairs   text[][];
  i         integer;
  v_al      uuid := gen_random_uuid();
  v_bl      uuid := gen_random_uuid();
  v_cat_off uuid;
  v_cat_np  uuid;
  v_attr    uuid;
BEGIN
  v_pairs := ARRAY[
    ['public.get_posting_schema(uuid)', '3035c8fc2cc6a84dc5771cea230d7afd', 'browser', 't', 'jsonb'],
    ['public.get_attribute_options(uuid)', 'c3c84437d7273a9b73bffbe5c0d40eba', 'browser', 't', 'jsonb']];
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    v_fn := v_pairs[i][1]::regprocedure;
    IF (SELECT prosecdef <> (v_pairs[i][4] = 't') OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}'
               OR prorettype <> v_pairs[i][5]::regtype FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR has_function_privilege('authenticated', v_fn, 'EXECUTE') <> (v_pairs[i][3] = 'browser')
       OR has_function_privilege('service_role', v_fn, 'EXECUTE') <> (v_pairs[i][3] <> 'owner') THEN
      RAISE EXCEPTION 'F1-5a part 6 proof (a): %''s header, return type or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-5a part 6 proof (a): %''s body differs from this file', v_fn;
    END IF;
  END LOOP;

  v_tag := 'e2e-mig-f15a6-' || substr(v_hex, 1, 10);
  v_r0 := 'e2e_mig_r0_' || substr(v_hex, 11, 8);
  BEGIN
    PERFORM set_config('request.jwt.claims', '{}', true);
    IF EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
      RAISE EXCEPTION 'F1-5a part 6 proof: scratch code % already exists', v_code;
    END IF;
    IF EXISTS (SELECT 1 FROM public.listings WHERE id = v_none) THEN
      RAISE EXCEPTION 'F1-5a part 6 proof: the id no row holds is held';
    END IF;
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_code, v_tag, true);
    SELECT a.id INTO v_anc FROM public.locations a WHERE a.country_code = v_code AND a.level = 'country' AND a.name_en = v_tag
     AND a.name_en LIKE 'e2e-mig-%';
    IF v_anc IS NULL THEN RAISE EXCEPTION 'F1-5a part 6 proof: the scratch market has no anchor'; END IF;
    UPDATE public.locations SET is_active = true WHERE id = v_anc AND name_en = v_tag AND name_en LIKE 'e2e-mig-%';
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id)
    VALUES ('region', v_code, v_tag || ' region', v_tag || '-r', true, v_anc) RETURNING id INTO v_region;
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id, center_lat, center_lng)
    VALUES ('city', v_code, v_tag || ' city', v_tag || '-c', true, v_region, 9.03, 38.74) RETURNING id INTO v_city;
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
      (v_a, v_tag || '-a@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_b, v_tag || '-b@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_d, v_tag || '-d@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO public.legal_acceptances (user_id, version_id, language, method)
    SELECT u, v.id, v_lang, 'e2e-mig' FROM public.legal_versions v, unnest(ARRAY[v_a, v_b, v_d]) u
     WHERE v.status = 'published' AND v.effective_at <= now();
    UPDATE public.profiles SET account_status = 'deactivated'
     WHERE user_id = v_d
       AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = v_d AND u.email LIKE 'e2e-mig-%');
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES (v_tag || ' leaf', v_tag, true, true, true, 9999) RETURNING id INTO v_cat;
    INSERT INTO public.listing_packages (key, kind, name_en, days, enabled, self_serve, extends_lifetime, sort)
    VALUES (v_r0, 'reach', v_tag || ' reach', 30, true, true, false, 9001);
    INSERT INTO public.market_settings (country_code, free_regular_ads, included_reach, paid_levels)
    VALUES (v_code, 20, v_r0, false);

    INSERT INTO public.listings (id, seller_id, category_id, location_id, title, description, home_country_code, status,
                                 published_at, published_first_at, expires_at)
    VALUES (v_al, v_a, v_cat, v_city, v_tag || ' al', 'scratch', v_code, 'active',
            now(), now(), now() + interval '10 days');
    INSERT INTO public.listings (id, seller_id, category_id, location_id, title, description, home_country_code, status,
                                 published_at, published_first_at, expires_at)
    VALUES (v_bl, v_b, v_cat, v_city, v_tag || ' bl', 'scratch', v_code, 'active',
            now(), now(), now() + interval '10 days');
    INSERT INTO public.categories (name_en, slug, is_active, allow_listings, display_order)
    VALUES (v_tag || ' off', v_tag || '-off', false, true, 9999) RETURNING id INTO v_cat_off;
    INSERT INTO public.categories (name_en, slug, is_active, allow_listings, display_order)
    VALUES (v_tag || ' parent', v_tag || '-np', true, false, 9999) RETURNING id INTO v_cat_np;
    INSERT INTO public.attributes (attr_key, attr_type, name_en)
    VALUES ('e2e_mig_' || substr(v_hex, 1, 8), 'single_select', v_tag) RETURNING id INTO v_attr;
    SELECT coalesce(sum(count), 0) INTO v_refused FROM public.door_refusals WHERE day = current_date AND door IN ('get_attribute_options', 'get_posting_schema');
    PERFORM set_config('request.jwt.claims', '{}', true);
    SELECT coalesce((SELECT string_agg(to_jsonb(l)::text, '|' ORDER BY l.id) FROM public.listings l WHERE l.seller_id IN (v_a, v_b, v_d)), '')
        || '#' || (SELECT count(*) FROM public.listing_revisions r WHERE r.seller_id IN (v_a, v_b, v_d))
        || '#' || coalesce((SELECT string_agg(p.id::text || '@' || p.display_order, ',' ORDER BY p.id) FROM public.listing_photos p
                              JOIN public.listings l ON l.id = p.listing_id WHERE l.seller_id IN (v_a, v_b, v_d)), '')
        || '#' || (SELECT count(*) FROM public.listing_photo_changes c JOIN public.listings l ON l.id = c.listing_id
                    WHERE l.seller_id IN (v_a, v_b, v_d))
        || '#' || (SELECT count(*) FROM storage.objects o WHERE o.name LIKE v_tag || '%')
        || '#' || coalesce((SELECT string_agg(to_jsonb(s)::text, '|' ORDER BY s.user_id) FROM public.seller_places s
                              WHERE s.user_id IN (v_a, v_b, v_d)), '')
        || '#' || coalesce((SELECT string_agg(to_jsonb(p)::text, '|' ORDER BY p.user_id) FROM public.profiles p
                              WHERE p.user_id IN (v_a, v_b, v_d)
                                AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = p.user_id AND u.email LIKE 'e2e-mig-%')), '')
        || '#' || (SELECT count(*) FROM public.audit_log a WHERE a.actor_id IN (v_a, v_b, v_d)
                    OR a.entity_id IN (SELECT l.id::text FROM public.listings l WHERE l.seller_id IN (v_a, v_b, v_d)))
        || '#' || (SELECT count(*) FROM public.seller_notices n WHERE n.seller_id IN (v_a, v_b, v_d))
      INTO v_snap;
    v_answer := public.get_posting_schema(v_cat);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('notSignedIn', 'notSignedIn', 'false', '401') THEN
      RAISE EXCEPTION 'F1-5a part 6 proof: get_posting_schema with no caller answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', v_cd, true);
    v_answer := public.get_posting_schema(v_cat);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('accountDeactivated', 'accountDeactivated', 'false', '403') THEN
      RAISE EXCEPTION 'F1-5a part 6 proof: get_posting_schema for a deactivated caller answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    v_answer := public.get_attribute_options(v_attr);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('notSignedIn', 'notSignedIn', 'false', '401') THEN
      RAISE EXCEPTION 'F1-5a part 6 proof: get_attribute_options with no caller answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', v_cd, true);
    v_answer := public.get_attribute_options(v_attr);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('accountDeactivated', 'accountDeactivated', 'false', '403') THEN
      RAISE EXCEPTION 'F1-5a part 6 proof: get_attribute_options for a deactivated caller answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', v_ca, true);
    v_answer := public.get_posting_schema(v_none);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('categoryNotFound', 'categoryNotFound', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5a part 6 proof: the schema of no category answered %', v_answer;
    END IF;
    v_answer := public.get_posting_schema(v_cat_off);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('categoryInactive', 'categoryInactive', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5a part 6 proof: the schema of an inactive category answered %', v_answer;
    END IF;
    v_answer := public.get_posting_schema(v_cat_np);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('categoryNotPostable', 'categoryNotPostable', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5a part 6 proof: the schema of a category that takes no ads answered %', v_answer;
    END IF;
    v_answer := public.get_attribute_options(v_none);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('attributeNotFound', 'attributeNotFound', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5a part 6 proof: the options of no attribute answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    SELECT coalesce((SELECT string_agg(to_jsonb(l)::text, '|' ORDER BY l.id) FROM public.listings l WHERE l.seller_id IN (v_a, v_b, v_d)), '')
        || '#' || (SELECT count(*) FROM public.listing_revisions r WHERE r.seller_id IN (v_a, v_b, v_d))
        || '#' || coalesce((SELECT string_agg(p.id::text || '@' || p.display_order, ',' ORDER BY p.id) FROM public.listing_photos p
                              JOIN public.listings l ON l.id = p.listing_id WHERE l.seller_id IN (v_a, v_b, v_d)), '')
        || '#' || (SELECT count(*) FROM public.listing_photo_changes c JOIN public.listings l ON l.id = c.listing_id
                    WHERE l.seller_id IN (v_a, v_b, v_d))
        || '#' || (SELECT count(*) FROM storage.objects o WHERE o.name LIKE v_tag || '%')
        || '#' || coalesce((SELECT string_agg(to_jsonb(s)::text, '|' ORDER BY s.user_id) FROM public.seller_places s
                              WHERE s.user_id IN (v_a, v_b, v_d)), '')
        || '#' || coalesce((SELECT string_agg(to_jsonb(p)::text, '|' ORDER BY p.user_id) FROM public.profiles p
                              WHERE p.user_id IN (v_a, v_b, v_d)
                                AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = p.user_id AND u.email LIKE 'e2e-mig-%')), '')
        || '#' || (SELECT count(*) FROM public.audit_log a WHERE a.actor_id IN (v_a, v_b, v_d)
                    OR a.entity_id IN (SELECT l.id::text FROM public.listings l WHERE l.seller_id IN (v_a, v_b, v_d)))
        || '#' || (SELECT count(*) FROM public.seller_notices n WHERE n.seller_id IN (v_a, v_b, v_d))
      INTO v_snap2;
    IF v_snap2 IS DISTINCT FROM v_snap THEN
      RAISE EXCEPTION 'F1-5a part 6 proof: a refused place or schema call wrote a row';
    END IF;
    PERFORM set_config('request.jwt.claims', v_ca, true);
    v_answer := public.get_posting_schema(v_cat);
    IF NOT coalesce(v_answer -> 'category' ->> 'id' = v_cat::text, false) THEN
      RAISE EXCEPTION 'F1-5a part 6 proof: the schema answered %', v_answer;
    END IF;
    v_answer := public.get_attribute_options(v_attr);
    IF NOT coalesce(jsonb_typeof(v_answer -> 'options') = 'array' AND v_answer ? 'version', false) THEN
      RAISE EXCEPTION 'F1-5a part 6 proof: the options answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    SELECT coalesce(jsonb_object_agg(t.k, t.n), '{}'::jsonb) INTO v_answer
      FROM (SELECT CASE r.key WHEN v_a::text THEN 'a' WHEN v_b::text THEN 'b' ELSE 'd' END || '/' || r.action AS k,
                   sum(r.count) AS n
              FROM public.rate_limits r WHERE r.key IN (v_a::text, v_b::text, v_d::text) GROUP BY 1) t;
    IF v_answer IS DISTINCT FROM '{"a/options_read":2,"a/schema_read":4}'::jsonb THEN
      RAISE EXCEPTION 'F1-5a part 6 proof: the dials counted %', v_answer;
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date AND door IN ('get_attribute_options', 'get_posting_schema'))
         IS DISTINCT FROM v_refused + 8 THEN
      RAISE EXCEPTION 'F1-5a part 6 proof: door_refusals did not meter the 8 refusals';
    END IF;

    RAISE EXCEPTION 'f1-5a-part-6-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f1-5a-part-6-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261116030400') ON CONFLICT DO NOTHING;
