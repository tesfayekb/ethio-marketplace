-- e2e-areas: posting, my-listings, admin-monetisation
-- P-2 turn (c) M-3a, part 1 of 2 — A NEW AD'S CAPS AND LEVEL (docs/governance/briefs/p2-fold.md STEP 2;
-- ruling 1 of docs/governance/briefs/p2-fold-ruling-1.md §1, §2, §5, §6, §9 — DEC-351; D311). Split from
-- part 2 (an ad's photo cap) by concern (rule 30: about 25 KB a file). Nothing is dropped here: the plan
-- seam (seller_plan, plan_caps, plan_photo_cap, coverage_plans) stays until every reader has moved (M-3c-b).
-- 1. public.listing_packages gains max_cities, max_regions, max_countries (nullable; at least 1 when
--    set): on a reach row NULL means "no limit" (a typed absence, never 0); on a level row all three
--    are NULL (a CHECK by kind, as the perks are NULL on reach rows). Seeds: city 1 / 1 / 1 (today's
--    free plan), nationwide NULL / NULL / 1, worldwide NULL / NULL / NULL. No allow_everywhere column
--    (ruling 1 §6). The browser roles' column grant is not widened: the caps are read through doors.
-- 2. public.get_posting_schema redeclared whole from 20261017091410 (its last declaration), header,
--    argument and grants unchanged, one fragment: the `plan` block keeps its name and the keys the
--    app reads (plan, max_photos, max_cities, max_regions, max_countries) — `plan` is the included
--    reach's key, max_photos the baseline level's perks for the category (no country), the three
--    caps the default market's included reach row's; the allow_everywhere key leaves with the
--    column it read (ruling 1 §6). An ad being edited reads its own caps from the edit reader
--    (ruling 1 §3, M-3b).
-- 3. listings.tier defaults to public.baseline_level_key() (ruling 1 §9), never a level's word.
-- Proofs at the end on scratch rows (market XZ, currency XTS, e2e_mig_ keys), rolled back by the
-- sentinel.

DO $pre$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261107001000') THEN
    RAISE EXCEPTION 'P-2 (c) M-3a part 1: P-2 (b) M-2a (mark 20261107001000) must be applied first';
  END IF;
END $pre$;

-- ------------------------------------------------------------ 1. THE REACH CAPS
ALTER TABLE public.listing_packages
  ADD COLUMN max_cities    integer NULL CHECK (max_cities IS NULL OR max_cities >= 1),
  ADD COLUMN max_regions   integer NULL CHECK (max_regions IS NULL OR max_regions >= 1),
  ADD COLUMN max_countries integer NULL CHECK (max_countries IS NULL OR max_countries >= 1);
COMMENT ON COLUMN public.listing_packages.max_cities IS
  'P-2 (c) M-3a (DEC-351): a reach row''s most cities an ad may name; NULL = no limit. NULL on every level row.';
COMMENT ON COLUMN public.listing_packages.max_regions IS
  'P-2 (c) M-3a (DEC-351): a reach row''s most regions an ad''s places may span; NULL = no limit. NULL on every level row.';
COMMENT ON COLUMN public.listing_packages.max_countries IS
  'P-2 (c) M-3a (DEC-351): a reach row''s most countries an ad''s places may span; NULL = no limit. NULL on every level row.';

-- The three reach rows this file seeds must be the ones P-1b M-c seeded: the apply stops and says so
-- otherwise (a finding, never a silent no-op).
DO $seed$
DECLARE v_keys text;
BEGIN
  SELECT string_agg(k.key, ', ' ORDER BY k.key) INTO v_keys
    FROM public.listing_packages k WHERE k.kind = 'reach' AND k.key IN ('city', 'nationwide', 'worldwide');
  IF v_keys IS DISTINCT FROM 'city, nationwide, worldwide' THEN
    RAISE EXCEPTION 'P-2 (c) M-3a part 1: the reach rows city, nationwide and worldwide are not all present (found %)', v_keys;
  END IF;
END $seed$;
UPDATE public.listing_packages SET max_cities = 1, max_regions = 1, max_countries = 1
 WHERE key = 'city' AND kind = 'reach';
UPDATE public.listing_packages SET max_cities = NULL, max_regions = NULL, max_countries = 1
 WHERE key = 'nationwide' AND kind = 'reach';
UPDATE public.listing_packages SET max_cities = NULL, max_regions = NULL, max_countries = NULL
 WHERE key = 'worldwide' AND kind = 'reach';

ALTER TABLE public.listing_packages
  ADD CONSTRAINT listing_packages_caps_by_kind_check CHECK (
    kind <> 'level' OR (max_cities IS NULL AND max_regions IS NULL AND max_countries IS NULL));

-- ------------------------------------------------------------ 2. get_posting_schema
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
END $m8c$;
REVOKE ALL ON FUNCTION public.get_posting_schema(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_posting_schema(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.get_posting_schema(uuid) TO service_role;

-- ------------------------------------------------------------ 3. THE COLUMN DEFAULT
-- Every writer of listings is a SECURITY DEFINER door or the service role (no browser role holds
-- INSERT on listings), so the default runs with the service-only function's grant.
ALTER TABLE public.listings ALTER COLUMN tier SET DEFAULT public.baseline_level_key();

-- ------------------------------------------------------------ 4. PROOFS
-- Scratch rows only, rolled back by the sentinel; the only real rows read are the catalogue's levels
-- and reach rows (read only), and the default market row and the baseline flag are moved inside it.
--   (a) get_posting_schema's header and grants;
--   (b) its body is its last declaration's body but for this file's one fragment (md5 with the fragment
--       put back: 94fc6a18126d8582fd7ef6260eed7b3e, the body of 20261017091410);
--   (c) the caps: the seeds; no level row holds one; a level row with a cap and a reach row with a cap
--       under 1 are refused; a reach row with caps and NULLs is taken;
--   (d) the plan block for a scratch category is exactly {plan, max_photos, max_cities, max_regions,
--       max_countries}: the baseline level's perks (a category override, 1) and a scratch default
--       market's included reach (2, no limit, 3);
--   (e) the column default: an insert without a tier takes baseline_level_key(); with is_baseline
--       moved to a scratch level, the next insert takes that level.
DO $proof$
DECLARE
  v_sch     regprocedure := 'public.get_posting_schema(uuid)'::regprocedure;
  v_seller  uuid := gen_random_uuid();
  v_tag     text := 'e2e-mig-p2c-m3a1-' || substr(gen_random_uuid()::text, 1, 8);
  v_stem    text := substr(replace(gen_random_uuid()::text, '-', ''), 1, 8);
  v_lb      text := 'e2e_mig_lb_' || v_stem;
  v_lx      text := 'e2e_mig_lx_' || v_stem;
  v_rc      text := 'e2e_mig_rc_' || v_stem;
  v_rx      text := 'e2e_mig_rx_' || v_stem;
  v_code    char(2) := 'XZ';
  v_cur     char(3) := 'XTS';
  v_s       integer := (SELECT coalesce(max(sort), 0) + 100 FROM public.listing_packages WHERE kind = 'level');
  v_base    text;
  v_cat     uuid;
  v_d       uuid;
  v_e       uuid;
  v_n       integer;
  v_src     text;
  v_pair    text[];
  v_pairs   text[][];
  v_md5     text;
  v_msg     text;
  v_state   text;
  v_plan    jsonb;
BEGIN
  -- (a)
  IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' FROM pg_proc WHERE oid = v_sch)
     OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_sch)) a WHERE a.grantee = 0)
     OR has_function_privilege('anon', v_sch, 'EXECUTE')
     OR NOT has_function_privilege('authenticated', v_sch, 'EXECUTE')
     OR NOT has_function_privilege('service_role', v_sch, 'EXECUTE') THEN
    RAISE EXCEPTION 'P-2 (c) M-3a part 1 proof (a): get_posting_schema''s header or grants differ';
  END IF;

  -- (b) Both sides without chr(13) (INC-1056, law 13): prosrc, and each literal.
  SELECT replace(p.prosrc, chr(13), '') INTO v_src FROM pg_proc p WHERE p.oid = v_sch;
  v_pairs := ARRAY[
    ['    -- P-2 (c) M-3a (D311, DEC-351) — a new ad''s caps: the baseline level''s photos for this category and
    -- the default market''s included reach (a NULL cap = no limit); an ad being edited reads its own.
    ''plan'', (SELECT jsonb_build_object(
               ''plan'', r.key,
               ''max_photos'', public.level_perks_for(public.baseline_level_key(), p_category_id, NULL::character)->''max_photos'',
               ''max_cities'', r.max_cities,
               ''max_regions'', r.max_regions,
               ''max_countries'', r.max_countries)
               FROM public.listing_packages r
              WHERE r.key = (public.market_settings_for(NULL::character)).included_reach AND r.kind = ''reach'')
',
     '    ''plan'', public.plan_caps(public.seller_plan(auth.uid()))
']];
  FOREACH v_pair SLICE 1 IN ARRAY v_pairs LOOP
    v_n := (length(v_src) - length(replace(v_src, replace(v_pair[1], chr(13), ''), ''))) / length(replace(v_pair[1], chr(13), ''));
    IF v_n <> 1 THEN
      RAISE EXCEPTION 'P-2 (c) M-3a part 1 proof (b): a get_posting_schema fragment occurs % times', v_n;
    END IF;
    v_src := replace(v_src, replace(v_pair[1], chr(13), ''), replace(v_pair[2], chr(13), ''));
  END LOOP;
  v_md5 := md5(v_src);
  IF v_md5 IS DISTINCT FROM '94fc6a18126d8582fd7ef6260eed7b3e' THEN
    RAISE EXCEPTION 'P-2 (c) M-3a part 1 proof (b): get_posting_schema differs from its last declaration beyond this file''s fragment (%)', v_md5;
  END IF;

  BEGIN
    -- (c) the seeds (the catalogue's reach rows, read only), then the CHECKs both ways on scratch rows.
    IF (SELECT count(*) FROM public.listing_packages k
         WHERE k.kind = 'reach'
           AND ((k.key = 'city' AND k.max_cities = 1 AND k.max_regions = 1 AND k.max_countries = 1)
             OR (k.key = 'nationwide' AND k.max_cities IS NULL AND k.max_regions IS NULL AND k.max_countries = 1)
             OR (k.key = 'worldwide' AND k.max_cities IS NULL AND k.max_regions IS NULL AND k.max_countries IS NULL))) <> 3 THEN
      RAISE EXCEPTION 'P-2 (c) M-3a part 1 proof (c): the reach rows'' caps are not the seeds';
    END IF;
    IF EXISTS (SELECT 1 FROM public.listing_packages k WHERE k.kind = 'level'
                AND (k.max_cities IS NOT NULL OR k.max_regions IS NOT NULL OR k.max_countries IS NOT NULL)) THEN
      RAISE EXCEPTION 'P-2 (c) M-3a part 1 proof (c): a level row holds a cap';
    END IF;
    FOREACH v_msg IN ARRAY ARRAY['level', 'reach'] LOOP
      v_state := NULL;
      BEGIN
        IF v_msg = 'level' THEN
          INSERT INTO public.listing_packages (key, kind, name_en, days, max_photos, placement, badge, enabled, self_serve, extends_lifetime, sort, max_cities)
          VALUES (v_lx, 'level', 'E2E P2c M3a capped level', 10, 3, 'standard', false, true, true, false, v_s + 9, 1);
        ELSE
          INSERT INTO public.listing_packages (key, kind, name_en, days, enabled, self_serve, extends_lifetime, sort, max_cities)
          VALUES (v_rx, 'reach', 'E2E P2c M3a zero reach', 30, true, false, false, 9009, 0);
        END IF;
      EXCEPTION WHEN check_violation THEN v_state := 'refused';
      END;
      IF v_state IS DISTINCT FROM 'refused' THEN
        RAISE EXCEPTION 'P-2 (c) M-3a part 1 proof (c): a % row with a bad cap was taken', v_msg;
      END IF;
    END LOOP;
    INSERT INTO public.listing_packages (key, kind, name_en, days, enabled, self_serve, extends_lifetime, sort, max_cities, max_regions, max_countries)
    VALUES (v_rc, 'reach', 'E2E P2c M3a reach', 30, true, false, false, 9001, 2, NULL, 3);
    INSERT INTO public.listing_packages (key, kind, name_en, days, max_photos, placement, badge, enabled, self_serve, extends_lifetime, sort)
    VALUES (v_lb, 'level', 'E2E P2c M3a baseline', 30, 5, 'standard', false, true, true, false, v_s + 1);

    -- (d) a scratch market (the INC-949 proof's way) to park the real default row on, a scratch category
    --     with a baseline override, and a scratch default market whose included reach is the scratch row.
    IF EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
      RAISE EXCEPTION 'P-2 (c) M-3a part 1 proof: the scratch code % already exists', v_code;
    END IF;
    -- ISO 4217 keeps XTS for testing; no market ever prices in it (K4 exception, as 'XZ').
    INSERT INTO public.currencies (code, name_en, minor_units) VALUES (v_cur, 'e2e-mig-p2c-m3a1', 2);
    INSERT INTO public.countries (code, name_en, is_active, currency_code) VALUES (v_code, 'e2e-mig-p2c-m3a1', true, v_cur);
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at)
    VALUES (v_seller, v_tag || '-seller@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES ('E2E P2c M3a1 Leaf', v_tag, true, true, true, 9999) RETURNING id INTO v_cat;
    v_base := public.baseline_level_key();
    INSERT INTO public.level_overrides (level_key, category_id, country_code, max_photos)
    VALUES (v_base, v_cat, NULL, 1);
    UPDATE public.market_settings SET country_code = v_code WHERE country_code IS NULL;
    INSERT INTO public.market_settings (country_code, free_regular_ads, included_reach, paid_levels)
    VALUES (NULL, 1, v_rc, false);
    PERFORM set_config('request.jwt.claims', '{}', true);
    v_plan := public.get_posting_schema(v_cat)->'plan';
    IF v_plan IS DISTINCT FROM jsonb_build_object('plan', v_rc, 'max_photos', 1, 'max_cities', 2,
                                                  'max_regions', NULL, 'max_countries', 3) THEN
      RAISE EXCEPTION 'P-2 (c) M-3a part 1 proof (d): the plan block answered %', v_plan;
    END IF;

    -- (e) the column default follows the flag.
    INSERT INTO public.listings (seller_id, category_id, title, description, home_country_code)
    VALUES (v_seller, v_cat, 'E2E P2c M3a1 d', 'scratch', v_code) RETURNING id INTO v_d;
    UPDATE public.listing_packages SET is_baseline = false WHERE kind = 'level' AND is_baseline;
    UPDATE public.listing_packages SET is_baseline = true WHERE key = v_lb AND key LIKE 'e2e_mig_%';
    INSERT INTO public.listings (seller_id, category_id, title, description, home_country_code)
    VALUES (v_seller, v_cat, 'E2E P2c M3a1 e', 'scratch', v_code) RETURNING id INTO v_e;
    IF (SELECT tier FROM public.listings WHERE id = v_d) IS DISTINCT FROM v_base
       OR public.baseline_level_key() IS DISTINCT FROM v_lb
       OR (SELECT tier FROM public.listings WHERE id = v_e) IS DISTINCT FROM v_lb THEN
      RAISE EXCEPTION 'P-2 (c) M-3a part 1 proof (e): the default did not follow the baseline flag (% then %)',
        (SELECT tier FROM public.listings WHERE id = v_d), (SELECT tier FROM public.listings WHERE id = v_e);
    END IF;

    RAISE EXCEPTION 'p2c-m3a1-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2c-m3a1-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

-- ------------------------------------------------------------ 5. CLOSERS
REVOKE ALL ON FUNCTION public.get_posting_schema(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_posting_schema(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.get_posting_schema(uuid) TO service_role;

INSERT INTO public.migration_marks (version) VALUES ('20261107120000') ON CONFLICT DO NOTHING;
