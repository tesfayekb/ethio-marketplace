-- e2e-areas: admin-listings
-- P-2 turn (c) M-3c-b, part 3 of 5 — THE LISTINGS CONSOLE'S LEVEL FILTER (docs/governance/briefs/p2-fold-c2b-ruling-1.md
-- §3 Q11, §4 (iii)). It follows part 2 (b2f1fad4, mark 20261109070100).
-- public.admin_list_listings redeclared whole from its last declaration (20261105080110 :32, md5 901086604a4975acd5073b63a5dccea6),
-- header, grants and every byte as before apart from one condition: p_tier is refused `unknown tier` when no
-- level row of the levels dictionary holds that key (enabled or not — staff may filter by a level that was
-- switched off; ads still carry it), in place of the literal set of three words (DEC-352). New md5 05a60d67383ba629298d497c65afe6ab.
-- Proofs at the end on scratch rows (a scratch admin, scratch levels, a scratch ad), rolled back by the sentinel.

DO $pre$
DECLARE
  v_md5 text;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261109070100') THEN
    RAISE EXCEPTION 'P-2 (c) M-3c-b part 3: part 2 (b2f1fad4, mark 20261109070100) must be applied first';
  END IF;
  -- G39: the body this file redeclares is, live, the body of its last declaration.
  SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p
   WHERE p.oid = 'public.admin_list_listings(text, text, text, uuid, text, date, date, text, integer, integer)'::regprocedure;
  IF v_md5 IS DISTINCT FROM '901086604a4975acd5073b63a5dccea6' THEN
    RAISE EXCEPTION 'P-2 (c) M-3c-b part 3: live admin_list_listings is not 20261105080110''s body (%)', v_md5;
  END IF;
END $pre$;

-- ------------------------------------------------------------ 1. admin_list_listings (whole from 20261105080110 :32)
CREATE OR REPLACE FUNCTION public.admin_list_listings(
  p_view text DEFAULT 'all', p_search text DEFAULT NULL, p_country text DEFAULT NULL,
  p_category uuid DEFAULT NULL, p_seller text DEFAULT NULL, p_from date DEFAULT NULL,
  p_to date DEFAULT NULL, p_tier text DEFAULT NULL, p_limit integer DEFAULT 25, p_offset integer DEFAULT 0)
RETURNS TABLE (
  id uuid, title text, status text, tier text, severe boolean,
  seller_id uuid, seller_alias text, seller_business_name text, seller_email text,
  category_id uuid, category_name_en text, category_name_am text,
  place_name_en text, place_name_am text, country_code text,
  price_mode text, price_amount numeric, price_currency text, price_period text,
  price_bp integer, price_negotiable boolean, price_unit text, price_unit_text text,
  cover_paths jsonb, cover_storage_path text, photo_count integer,
  created_at timestamptz, published_at timestamptz, expires_at timestamptz, updated_at timestamptz,
  total_count bigint)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid      uuid := auth.uid();
  v_email    boolean;
  v_statuses text[];
  v_term     text := lower(btrim(coalesce(p_search, '')));
  v_id       uuid;
  v_seller   text := lower(btrim(coalesce(p_seller, '')));
  v_country  text := upper(btrim(coalesce(p_country, '')));
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'not signed in';
  END IF;
  IF NOT public.has_permission(v_uid, 'listings', 'view') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  v_statuses := CASE coalesce(p_view, 'all')
    WHEN 'live'    THEN ARRAY['active','reduced']
    WHEN 'waiting' THEN ARRAY['screening','held']
    WHEN 'ended'   THEN ARRAY['expired','sold','closed']
    WHEN 'removed' THEN ARRAY['rejected','removed']
    WHEN 'all'     THEN ARRAY['screening','active','reduced','rejected','held','expired','sold','removed','closed','paused']
  END;
  IF v_statuses IS NULL THEN
    RAISE EXCEPTION 'unknown view';
  END IF;
  -- P-2 (c) M-3c-b (ruling 1 §3 Q11): a level is a row of the levels dictionary, switched off or not.
  IF p_tier IS NOT NULL AND NOT EXISTS (SELECT 1 FROM public.listing_packages k
                                         WHERE k.key = p_tier AND k.kind = 'level') THEN
    RAISE EXCEPTION 'unknown tier';
  END IF;
  -- The seller's e-mail is read only by holders of profiles:view (the Users console's own rule).
  v_email := public.has_permission(v_uid, 'profiles', 'view');
  IF v_term ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$' THEN
    v_id := v_term::uuid;
  END IF;

  RETURN QUERY
  SELECT l.id, l.title, l.status, l.tier,
         coalesce(l.screening->>'severe', 'false') = 'true',
         l.seller_id, p.seller_alias,
         CASE WHEN p.seller_type = 'business' THEN p.business_name END,
         CASE WHEN v_email THEN u.email::text END,
         l.category_id, c.name_en, c.name_am,
         loc.name_en, loc.name_am, coalesce(loc.country_code, l.home_country_code)::text,
         l.price_mode, l.price_amount, l.price_currency::text, l.price_period,
         l.price_bp, l.price_negotiable, l.price_unit, l.price_unit_text,
         cover.paths, cover.storage_path,
         (SELECT count(*)::integer FROM public.listing_photos ph WHERE ph.listing_id = l.id),
         l.created_at, l.published_at, l.expires_at, l.updated_at,
         count(*) OVER ()
    FROM public.listings l
    LEFT JOIN public.profiles p ON p.user_id = l.seller_id
    LEFT JOIN auth.users u ON u.id = l.seller_id
    LEFT JOIN public.categories c ON c.id = l.category_id
    LEFT JOIN public.locations loc ON loc.id = l.location_id
    LEFT JOIN LATERAL (
      SELECT ph.paths, ph.storage_path
        FROM public.listing_photos ph
       WHERE ph.listing_id = l.id
       ORDER BY (ph.id = l.cover_photo_id) DESC, ph.display_order
       LIMIT 1) cover ON true
   WHERE l.status = ANY (v_statuses)
     AND l.status <> 'draft'
     AND (v_term = ''
          OR (v_id IS NOT NULL AND l.id = v_id)
          OR (v_id IS NULL AND position(v_term IN lower(l.title)) > 0))
     AND (v_country = '' OR coalesce(loc.country_code, l.home_country_code) = v_country)
     AND (p_category IS NULL OR l.category_id IN (SELECT d.id FROM public.cat_descendants(p_category) d))
     AND (v_seller = ''
          OR position(v_seller IN lower(coalesce(p.seller_alias, ''))) > 0
          OR (p.seller_type = 'business' AND position(v_seller IN lower(coalesce(p.business_name, ''))) > 0)
          OR (v_email AND position(v_seller IN lower(coalesce(u.email::text, ''))) > 0))
     AND (p_from IS NULL OR coalesce(l.published_first_at, l.created_at)::date >= p_from)
     AND (p_to IS NULL OR coalesce(l.published_first_at, l.created_at)::date <= p_to)
     AND (p_tier IS NULL OR l.tier = p_tier)
   ORDER BY coalesce(l.published_at, l.created_at) DESC, l.id DESC
   LIMIT LEAST(GREATEST(coalesce(p_limit, 25), 1), 100)
  OFFSET GREATEST(coalesce(p_offset, 0), 0);
END $$;
REVOKE ALL ON FUNCTION public.admin_list_listings(text, text, text, uuid, text, date, date, text, integer, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_list_listings(text, text, text, uuid, text, date, date, text, integer, integer) TO authenticated;
GRANT ALL ON FUNCTION public.admin_list_listings(text, text, text, uuid, text, date, date, text, integer, integer) TO service_role;

-- ------------------------------------------------------------ 2. PROOFS
-- Scratch rows only, rolled back by the sentinel; the one real row read is the super_admin role's id.
--   (a) the header and grants as before;
--   (b) the body, with its fragment taken back, is 20261105080110's (md5);
--   (c) as a scratch super admin: a scratch level's key filters to its scratch ad; a switched-off scratch level's
--       key filters without refusal (no rows); a made-up key and a scratch reach row's key are refused
--       `unknown tier`.
DO $proof$
DECLARE
  v_lst    regprocedure := 'public.admin_list_listings(text, text, text, uuid, text, date, date, text, integer, integer)'::regprocedure;
  v_admin  uuid := gen_random_uuid();
  v_seller uuid := gen_random_uuid();
  v_tag    text := 'e2e-mig-p2c-m3cb3-' || substr(gen_random_uuid()::text, 1, 8);
  v_code   char(2) := 'XZ';
  v_anc    uuid;
  v_stem   text := substr(replace(gen_random_uuid()::text, '-', ''), 1, 8);
  v_lv     text := 'e2e_mig_lv_' || v_stem;
  v_off    text := 'e2e_mig_off_' || v_stem;
  v_rc     text := 'e2e_mig_rc_' || v_stem;
  v_none   text := 'e2e_mig_none_' || v_stem;
  v_sl     integer := (SELECT coalesce(max(sort), 0) + 100 FROM public.listing_packages WHERE kind = 'level');
  v_sr     integer := (SELECT coalesce(max(sort), 0) + 100 FROM public.listing_packages WHERE kind = 'reach');
  v_cat    uuid;
  v_ad     uuid;
  v_key    text;
  v_n      integer;
  v_src    text;
  v_pair   text[];
  v_pairs  text[][];
  v_md5    text;
  v_msg    text;
BEGIN
  -- (a)
  IF (SELECT NOT prosecdef OR provolatile <> 's' OR proconfig::text <> '{search_path=public}' FROM pg_proc WHERE oid = v_lst)
     OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_lst)) a WHERE a.grantee = 0)
     OR has_function_privilege('anon', v_lst, 'EXECUTE')
     OR NOT has_function_privilege('authenticated', v_lst, 'EXECUTE')
     OR NOT has_function_privilege('service_role', v_lst, 'EXECUTE') THEN
    RAISE EXCEPTION 'P-2 (c) M-3c-b part 3 proof (a): admin_list_listings''s header or grants differ';
  END IF;

  -- (b) Both sides without chr(13), every fragment on one line of this file (INC-1056, INC-1089).
  SELECT replace(p.prosrc, chr(13), '') INTO v_src FROM pg_proc p WHERE p.oid = v_lst;
  IF md5(v_src) IS DISTINCT FROM '05a60d67383ba629298d497c65afe6ab' THEN
    RAISE EXCEPTION 'P-2 (c) M-3c-b part 3 proof (b): the live body is not this file''s (%)', md5(v_src);
  END IF;
  v_pairs := ARRAY[
    ['  -- P-2 (c) M-3c-b (ruling 1 §3 Q11): a level is a row of the levels dictionary, switched off or not.' || chr(10)
     || '  IF p_tier IS NOT NULL AND NOT EXISTS (SELECT 1 FROM public.listing_packages k' || chr(10)
     || '                                         WHERE k.key = p_tier AND k.kind = ''level'') THEN' || chr(10),
     '  IF p_tier IS NOT NULL AND p_tier NOT IN (''premium'',''featured'',''regular'') THEN' || chr(10)]];
  FOREACH v_pair SLICE 1 IN ARRAY v_pairs LOOP
    v_n := (length(v_src) - length(replace(v_src, replace(v_pair[1], chr(13), ''), ''))) / length(replace(v_pair[1], chr(13), ''));
    IF v_n <> 1 THEN
      RAISE EXCEPTION 'P-2 (c) M-3c-b part 3 proof (b): the admin_list_listings fragment occurs % times', v_n;
    END IF;
    v_src := replace(v_src, replace(v_pair[1], chr(13), ''), replace(v_pair[2], chr(13), ''));
  END LOOP;
  v_md5 := md5(v_src);
  IF v_md5 IS DISTINCT FROM '901086604a4975acd5073b63a5dccea6' THEN
    RAISE EXCEPTION 'P-2 (c) M-3c-b part 3 proof (b): admin_list_listings differs from its last declaration beyond this file''s fragment (%)', v_md5;
  END IF;

  BEGIN
    -- The scratch market: a published ad needs a place (listings_place_unless_draft); the anchor serves.
    IF EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
      RAISE EXCEPTION 'P-2 (c) M-3c-b part 3 proof: scratch code % already exists', v_code;
    END IF;
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_code, 'e2e-mig-p2c-m3cb3', true);
    SELECT a.id INTO v_anc FROM public.locations a
     WHERE a.country_code = v_code AND a.level = 'country' AND a.name_en = 'e2e-mig-p2c-m3cb3';
    IF v_anc IS NULL THEN RAISE EXCEPTION 'P-2 (c) M-3c-b part 3 proof: the scratch market has no anchor'; END IF;
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
      (v_admin,  v_tag || '-admin@example.invalid',  '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_seller, v_tag || '-seller@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO public.user_roles (user_id, role_id, scope_type)
    SELECT v_admin, r.id, 'global' FROM public.roles r WHERE r.name = 'super_admin';
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES ('E2E P2c M3cb3 Leaf', v_tag, true, true, true, 9999) RETURNING id INTO v_cat;
    -- Rows above every real one (sorts derived, never a real value).
    INSERT INTO public.listing_packages (key, kind, name_en, days, max_photos, placement, badge, enabled, self_serve, extends_lifetime, sort) VALUES
      (v_lv,  'level', 'E2E P2c M3cb3 level', 10, 6, 'boost',    false, true,  true,  false, v_sl + 1),
      (v_off, 'level', 'E2E P2c M3cb3 off',   10, 6, 'standard', false, false, false, false, v_sl + 2);
    INSERT INTO public.listing_packages (key, kind, name_en, days, enabled, self_serve, extends_lifetime, sort, max_cities, max_regions, max_countries)
    VALUES (v_rc, 'reach', 'E2E P2c M3cb3 reach', 30, true, true, false, v_sr + 1, 1, 1, 1);
    INSERT INTO public.listings (seller_id, category_id, location_id, title, description, home_country_code,
                                 status, published_at, published_first_at, expires_at, tier, tier_source)
    VALUES (v_seller, v_cat, v_anc, 'E2E P2c M3cb3 live', 'scratch', v_code, 'active', now(), now(), now() + interval '10 days',
            v_lv, 'staff')
    RETURNING id INTO v_ad;

    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_admin::text, 'role', 'authenticated')::text, true);
    -- (c)
    SELECT count(*) INTO v_n FROM public.admin_list_listings('all', v_ad::text, p_tier => v_lv) r WHERE r.id = v_ad;
    IF v_n <> 1 THEN
      RAISE EXCEPTION 'P-2 (c) M-3c-b part 3 proof (c): the scratch level did not filter to its ad (%)', v_n;
    END IF;
    SELECT count(*) INTO v_n FROM public.admin_list_listings('all', v_ad::text, p_tier => v_off);
    IF v_n <> 0 THEN
      RAISE EXCEPTION 'P-2 (c) M-3c-b part 3 proof (c): the switched-off level answered % rows', v_n;
    END IF;
    FOREACH v_key IN ARRAY ARRAY[v_none, v_rc] LOOP
      v_msg := NULL;
      BEGIN
        PERFORM 1 FROM public.admin_list_listings('all', NULL, p_tier => v_key);
      EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
      END;
      IF v_msg IS DISTINCT FROM 'unknown tier' THEN
        RAISE EXCEPTION 'P-2 (c) M-3c-b part 3 proof (c): % answered %', v_key, coalesce(v_msg, 'success');
      END IF;
    END LOOP;

    RAISE EXCEPTION 'p2c-m3cb3-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2c-m3cb3-proof-ok' THEN RAISE; END IF;
  END;
  IF EXISTS (SELECT 1 FROM auth.users WHERE id IN (v_admin, v_seller) AND email LIKE 'e2e-mig-%')
     OR EXISTS (SELECT 1 FROM public.listing_packages WHERE key IN (v_lv, v_off, v_rc)) THEN
    RAISE EXCEPTION 'P-2 (c) M-3c-b part 3 proof: the scratch rows outlived the sentinel';
  END IF;
END;
$proof$;

-- ------------------------------------------------------------ 3. CLOSERS
REVOKE ALL ON FUNCTION public.admin_list_listings(text, text, text, uuid, text, date, date, text, integer, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_list_listings(text, text, text, uuid, text, date, date, text, integer, integer) TO authenticated;
GRANT ALL ON FUNCTION public.admin_list_listings(text, text, text, uuid, text, date, date, text, integer, integer) TO service_role;

INSERT INTO public.migration_marks (version) VALUES ('20261109070200') ON CONFLICT DO NOTHING;
