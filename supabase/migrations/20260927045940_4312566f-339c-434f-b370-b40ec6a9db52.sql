-- D31-C part 2 (DEC-079) — the publish door, the edit door and the admin
-- impersonation list carry the commission basis points.
-- Bases (re-declared WHOLE, INC-183):
--   publish_listing(uuid)            ← 20260917112956_9add760c (section F)
--   edit_listing(13 args)            ← 20260917112956_9add760c (section G)
--   impersonated_list_listings(...)  ← 20260822073000_d748b282
-- publish: re-checks the stored row through validate_listing_draft, now passing
--   v_row.price_bp. edit: appends p_price_bp integer DEFAULT NULL (old signature
--   DROPPED — an overload pair is ambiguous, PGRST203), passes it through and
--   writes price_bp beside the other price fields. impersonation: returns
--   price_mode and price_bp (return shape changes → DROP + CREATE).
-- Proofs P8–P10 on scratch rows, rolled back by sentinel. Mark 20260927050000.

-- ---------------------------------------------------------------- publish
CREATE OR REPLACE FUNCTION public.publish_listing(p_listing_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid uuid := auth.uid();
  v_row public.listings%ROWTYPE;
  v_cov uuid[];
  v_val jsonb;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  SELECT * INTO v_row FROM public.listings WHERE id = p_listing_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'listing not found'; END IF;
  IF v_row.seller_id <> v_uid THEN RAISE EXCEPTION 'not your listing'; END IF;
  IF v_row.status NOT IN ('draft','rejected') THEN
    RAISE EXCEPTION 'illegal transition: % -> screening', v_row.status;
  END IF;

  SELECT array_agg(ll.location_id) INTO v_cov
    FROM public.listing_locations ll WHERE ll.listing_id = p_listing_id;

  v_val := public.validate_listing_draft(v_uid, 8::smallint, v_row.category_id, v_row.title,
             v_row.description, v_row.video_url, v_row.attributes, v_row.price_mode,
             v_row.price_amount, v_row.price_currency, v_row.price_period,
             v_row.poster_expires_at, v_cov, v_row.contact_pref, v_row.attributes,
             v_row.price_bp);
  IF NOT coalesce((v_val->>'ok')::boolean, false) THEN
    RETURN v_val;
  END IF;

  UPDATE public.listings SET
    status = 'screening',
    published_first_at = coalesce(published_first_at, now()),
    draft_step = 8,
    updated_at = now()
  WHERE id = p_listing_id;

  INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
    VALUES (p_listing_id, v_uid, 'state',
            jsonb_build_object('status', v_row.status),
            jsonb_build_object('status', 'screening'), v_uid);

  RETURN jsonb_build_object('ok', true, 'status', 'screening');
END $$;

REVOKE ALL ON FUNCTION public.publish_listing(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.publish_listing(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.publish_listing(uuid) TO service_role;

-- ---------------------------------------------------------------- edit
DROP FUNCTION public.edit_listing(uuid, uuid, text, text, text, jsonb, text, numeric, char, text, timestamptz, uuid[], jsonb);

CREATE OR REPLACE FUNCTION public.edit_listing(
  p_listing_id uuid,
  p_category_id uuid,
  p_title text,
  p_description text,
  p_video_url text,
  p_attributes jsonb,
  p_price_mode text,
  p_price_amount numeric,
  p_price_currency char(3),
  p_price_period text,
  p_poster_expires_at timestamptz,
  p_coverage uuid[],
  p_contact_pref jsonb,
  p_price_bp integer DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid    uuid := auth.uid();
  v_prev   public.listings%ROWTYPE;
  v_row    public.listings%ROWTYPE;
  v_val    jsonb;
  v_before jsonb;
  v_after  jsonb;
  v_diff_a jsonb := '{}'::jsonb;
  v_diff_b jsonb := '{}'::jsonb;
  v_key    text;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF EXISTS (SELECT 1 FROM public.profiles WHERE user_id = v_uid AND account_status = 'deactivated') THEN
    RAISE EXCEPTION 'account is deactivated';
  END IF;
  SELECT * INTO v_prev FROM public.listings WHERE id = p_listing_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'listing not found'; END IF;
  IF v_prev.seller_id <> v_uid THEN RAISE EXCEPTION 'not your listing'; END IF;
  IF v_prev.status NOT IN ('active','reduced','rejected','held','expired') THEN
    RAISE EXCEPTION 'edit_listing takes a published listing; a draft writes through submit_listing';
  END IF;

  v_val := public.validate_listing_draft(v_uid, 8::smallint, p_category_id, p_title, p_description,
             p_video_url, p_attributes, p_price_mode, p_price_amount, p_price_currency,
             p_price_period, p_poster_expires_at, p_coverage, p_contact_pref, v_prev.attributes,
             p_price_bp);
  IF NOT coalesce((v_val->>'ok')::boolean, false) THEN
    RETURN v_val;
  END IF;

  UPDATE public.listings SET
    category_id       = p_category_id,
    location_id       = (v_val->>'location_id')::uuid,
    title             = v_val->>'title',
    description       = v_val->>'description',
    attributes        = v_val->'attrs',
    price_amount      = (v_val->>'price_amount')::numeric,
    price_currency    = (v_val->>'price_currency')::char(3),
    price_mode        = v_val->>'price_mode',
    price_period      = v_val->>'price_period',
    price_bp          = (v_val->>'price_bp')::integer,
    poster_expires_at = p_poster_expires_at,
    video_url         = p_video_url,
    contact_pref      = p_contact_pref,
    status            = 'screening',
    updated_at        = now()
  WHERE id = p_listing_id
  RETURNING * INTO v_row;

  DELETE FROM public.listing_locations WHERE listing_id = p_listing_id;
  INSERT INTO public.listing_locations (listing_id, location_id)
    SELECT p_listing_id, c.id FROM unnest(p_coverage) c(id) ON CONFLICT DO NOTHING;

  v_after  := to_jsonb(v_row) - 'search_tsv';
  v_before := to_jsonb(v_prev) - 'search_tsv';
  FOR v_key IN SELECT k FROM jsonb_object_keys(v_after) k LOOP
    IF (v_after->v_key) IS DISTINCT FROM (v_before->v_key) THEN
      v_diff_a := v_diff_a || jsonb_build_object(v_key, v_after->v_key);
      v_diff_b := v_diff_b || jsonb_build_object(v_key, v_before->v_key);
    END IF;
  END LOOP;

  INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
    VALUES (p_listing_id, v_uid, 'edit', v_diff_b, v_diff_a, v_uid);

  RETURN jsonb_build_object('ok', true, 'status', 'screening');
END $$;

REVOKE ALL ON FUNCTION public.edit_listing(uuid, uuid, text, text, text, jsonb, text, numeric, char, text, timestamptz, uuid[], jsonb, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.edit_listing(uuid, uuid, text, text, text, jsonb, text, numeric, char, text, timestamptz, uuid[], jsonb, integer) TO authenticated;
GRANT ALL ON FUNCTION public.edit_listing(uuid, uuid, text, text, text, jsonb, text, numeric, char, text, timestamptz, uuid[], jsonb, integer) TO service_role;

-- ---------------------------------------------------------------- impersonation
DROP FUNCTION public.impersonated_list_listings(uuid, int, int);

CREATE FUNCTION public.impersonated_list_listings(
  p_session uuid, p_limit int DEFAULT 25, p_offset int DEFAULT 0)
RETURNS TABLE(id uuid, title text, status text, price_amount numeric,
              price_currency char(3), price_mode text, price_bp integer,
              created_at timestamptz, total_count bigint)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
DECLARE v_target uuid := public.impersonation_target(p_session);
BEGIN
  RETURN QUERY
  SELECT l.id, l.title, l.status, l.price_amount, l.price_currency,
         l.price_mode, l.price_bp, l.created_at,
         COUNT(*) OVER () AS total_count
  FROM public.listings l
  WHERE l.seller_id = v_target
  ORDER BY l.created_at DESC
  LIMIT GREATEST(COALESCE(p_limit, 25), 1)
  OFFSET GREATEST(COALESCE(p_offset, 0), 0);
END $$;

REVOKE ALL ON FUNCTION public.impersonated_list_listings(uuid, int, int) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.impersonated_list_listings(uuid, int, int) TO authenticated, service_role;
GRANT ALL ON FUNCTION public.impersonated_list_listings(uuid, int, int) TO service_role;

-- ---------------------------------------------------------------- proofs
-- A scratch seller is BORROWED (an existing active account) so the doors'
-- auth.uid() gates run for real; every scratch row is rolled back by sentinel.
DO $proof$
DECLARE
  v_uid  uuid;
  v_home char(2);
  v_loc  uuid;
  v_leaf uuid := gen_random_uuid();
  v_bare uuid := gen_random_uuid();
  v_attr uuid := gen_random_uuid();
  v_com  uuid := gen_random_uuid();
  v_fix  uuid := gen_random_uuid();
  v_cur  char(3);
  v_r    jsonb;
  v_l    public.listings%ROWTYPE;
  v_attrs jsonb := jsonb_build_object('pricing_type-zzd31d', 'commission');
BEGIN
  SELECT d.user_id, d.home_country_code INTO v_uid, v_home
    FROM public.user_directory d
    JOIN public.profiles p ON p.user_id = d.user_id
   WHERE d.account_status = 'active' AND p.account_status = 'active'
     AND d.home_country_code IS NOT NULL
   ORDER BY d.created_at LIMIT 1;
  SELECT l.id INTO v_loc FROM public.locations l JOIN public.countries k ON k.code = l.country_code
   WHERE l.is_active AND k.is_active AND l.level = 'city' ORDER BY l.created_at LIMIT 1;
  IF v_uid IS NULL OR v_loc IS NULL THEN
    RAISE EXCEPTION 'PROOF setup failed: no active seller (%) or active city (%)', v_uid, v_loc;
  END IF;
  SELECT code INTO v_cur FROM public.currencies ORDER BY code LIMIT 1;
  PERFORM set_config('request.jwt.claims', json_build_object('sub', v_uid, 'role', 'authenticated')::text, true);
  PERFORM set_config('request.jwt.claim.sub', v_uid::text, true);

  INSERT INTO public.categories
    (id, name_en, slug, price_enabled, is_restricted, is_active, display_order,
     is_catchall, allow_listings, capabilities, default_price_period, price_period_locked)
  VALUES
    (v_leaf, 'e2e-d31d-leaf', 'e2e-d31d-' || replace(v_leaf::text,'-',''), true, false, true, 999999,
     false, true, ARRAY[]::text[], 'once', false),
    (v_bare, 'e2e-d31d-bare', 'e2e-d31d-' || replace(v_bare::text,'-',''), true, false, true, 999999,
     false, true, ARRAY[]::text[], 'once', false);
  INSERT INTO public.attributes (id, attr_key, name_en, attr_type, options)
  VALUES (v_attr, 'pricing_type-zzd31d', 'e2e d31d basis', 'single_select', jsonb_build_array(
    jsonb_build_object('value','commission','label_en','Commission','label_am','ኮሚሽን'),
    jsonb_build_object('value','fixed','label_en','Fixed','label_am','ቋሚ')));
  INSERT INTO public.category_attribute_links
    (category_id, attribute_id, is_required, is_filterable, is_searchable, display_order, card_rank)
  VALUES (v_leaf, v_attr, true, false, false, 1, 2);

  INSERT INTO public.listings (id, seller_id, category_id, location_id, title, description, attributes,
      price_mode, price_amount, price_currency, price_period, price_bp, status,
      home_country_code, contact_pref, draft_step)
  VALUES
    (v_com, v_uid, v_leaf, v_loc, 'e2e d31d commission', '', v_attrs,
     'commission', NULL, NULL, 'once', 1250, 'draft', v_home, '{"messages":true}'::jsonb, 7),
    (v_fix, v_uid, v_bare, v_loc, 'e2e d31d fixed', '', '{}'::jsonb,
     'fixed', 100, v_cur, 'once', NULL, 'draft', v_home, '{"messages":true}'::jsonb, 7);
  INSERT INTO public.listing_locations (listing_id, location_id) VALUES (v_com, v_loc), (v_fix, v_loc);

  -- P8 a commission draft publishes to screening with price_bp intact
  v_r := public.publish_listing(v_com);
  SELECT * INTO v_l FROM public.listings WHERE id = v_com;
  IF NOT coalesce((v_r->>'ok')::boolean, false) OR v_l.status <> 'screening'
     OR v_l.price_bp IS DISTINCT FROM 1250 OR v_l.price_mode <> 'commission' THEN
    RAISE EXCEPTION 'PROOF P8 failed % / status=% bp=%', v_r, v_l.status, v_l.price_bp; END IF;
  RAISE NOTICE 'PROOF P8 ok — commission 1250 bp publishes to screening, bp intact';

  -- P9 edit round-trip keeps price_bp; an amount on a commission refuses mustBeEmpty
  UPDATE public.listings SET status = 'active' WHERE id = v_com;
  v_r := public.edit_listing(v_com, v_leaf, 'e2e d31d commission', '', NULL, v_attrs,
           'commission', 500, NULL, NULL, NULL, ARRAY[v_loc], '{"messages":true}'::jsonb, 1250);
  IF NOT coalesce(v_r->'refusals', '[]') @> '[{"field":"price_amount","reason":"mustBeEmpty"}]' THEN
    RAISE EXCEPTION 'PROOF P9a failed %', v_r; END IF;
  v_r := public.edit_listing(v_com, v_leaf, 'e2e d31d commission 2', '', NULL, v_attrs,
           'commission', NULL, NULL, NULL, NULL, ARRAY[v_loc], '{"messages":true}'::jsonb, 1250);
  SELECT * INTO v_l FROM public.listings WHERE id = v_com;
  IF NOT coalesce((v_r->>'ok')::boolean, false) OR v_l.price_bp IS DISTINCT FROM 1250
     OR v_l.price_amount IS NOT NULL OR v_l.title <> 'e2e d31d commission 2' THEN
    RAISE EXCEPTION 'PROOF P9b failed % / bp=%', v_r, v_l.price_bp; END IF;
  RAISE NOTICE 'PROOF P9 ok — edit keeps 1250 bp; an amount on a commission refuses mustBeEmpty';

  -- P10 a fixed-mode listing publishes and edits exactly as before
  v_r := public.publish_listing(v_fix);
  IF NOT coalesce((v_r->>'ok')::boolean, false) THEN RAISE EXCEPTION 'PROOF P10a failed %', v_r; END IF;
  UPDATE public.listings SET status = 'active' WHERE id = v_fix;
  v_r := public.edit_listing(v_fix, v_bare, 'e2e d31d fixed', '', NULL, '{}'::jsonb,
           'fixed', 150, v_cur, 'once', NULL, ARRAY[v_loc], '{"messages":true}'::jsonb);
  SELECT * INTO v_l FROM public.listings WHERE id = v_fix;
  IF NOT coalesce((v_r->>'ok')::boolean, false) OR v_l.price_amount <> 150
     OR v_l.price_currency IS DISTINCT FROM v_cur OR v_l.price_bp IS NOT NULL
     OR v_l.price_mode <> 'fixed' OR v_l.status <> 'screening' THEN
    RAISE EXCEPTION 'PROOF P10b failed % / %', v_r, to_jsonb(v_l) - 'search_tsv'; END IF;
  RAISE NOTICE 'PROOF P10 ok — fixed publishes and edits as before (150 %, bp NULL)', v_cur;

  RAISE EXCEPTION USING ERRCODE = 'P0001', MESSAGE = 'D31D_PROOF_ROLLBACK';
EXCEPTION
  WHEN SQLSTATE 'P0001' THEN
    IF SQLERRM <> 'D31D_PROOF_ROLLBACK' THEN RAISE; END IF;
END $proof$;

DO $readback$
DECLARE v_fn text; v_acl text; v_n int;
BEGIN
  SELECT count(*) INTO v_n FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
   WHERE n.nspname = 'public' AND p.proname IN ('publish_listing','edit_listing','impersonated_list_listings');
  IF v_n <> 3 THEN RAISE EXCEPTION 'READ-BACK failed: % overloads', v_n; END IF;
  FOREACH v_fn IN ARRAY ARRAY['public.publish_listing(uuid)',
    'public.edit_listing(uuid, uuid, text, text, text, jsonb, text, numeric, char, text, timestamptz, uuid[], jsonb, integer)',
    'public.impersonated_list_listings(uuid, int, int)']
  LOOP
    SELECT array_to_string(coalesce(proacl, acldefault('f', proowner)), ',') INTO v_acl
      FROM pg_proc WHERE oid = v_fn::regprocedure;
    IF v_acl LIKE '%anon=%' OR v_acl ~ '(^|,)=X' THEN
      RAISE EXCEPTION 'READ-BACK failed: % acl=%', v_fn, v_acl; END IF;
    IF v_acl NOT LIKE '%authenticated=X%' THEN
      RAISE EXCEPTION 'READ-BACK failed: % lacks authenticated EXECUTE (%)', v_fn, v_acl; END IF;
    RAISE NOTICE 'READ-BACK % acl=%', v_fn, v_acl;
  END LOOP;
  IF NOT EXISTS (SELECT 1 FROM pg_proc WHERE oid = 'public.publish_listing(uuid)'::regprocedure
                  AND prosrc LIKE '%v_row.price_bp%') THEN
    RAISE EXCEPTION 'READ-BACK failed: publish_listing does not pass price_bp'; END IF;
END $readback$;

INSERT INTO public.migration_marks (version) VALUES ('20260927050000') ON CONFLICT DO NOTHING;
