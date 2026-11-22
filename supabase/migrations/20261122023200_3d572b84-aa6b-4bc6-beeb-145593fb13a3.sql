-- e2e-areas: admin-listings, my-listings

-- Cursor bundle 2, part 2 of 5 — THE LISTINGS' TWO LIST DOORS TAKE SEVERAL VALUES (DEC-420; brief
-- docs/governance/briefs/cursor-bundle-2.md item 1, ruling docs/governance/briefs/cursor-bundle-2-ruling-1.md answers 1 and
-- 6; census docs/governance/reports/cursor-bundle-2.census.md). admin_list_listings takes `p_country text[]` and
-- `p_category uuid[]` where it took one text and one uuid; my_listings takes `p_category uuid[]`. Each list is read by the
-- list rule (door_filter_countries / door_filter_categories, part 1): NULL or empty is no filter, at most 20 values, a
-- country is two letters once read as the doors read it, a category answers its roots with their subtrees; a list that
-- matches nothing matches no row. Values within a list are OR-ed; the two lists, the view and every other filter are AND-ed;
-- the caller's reach (admin_list_listings) stays AND-ed after them. Both functions are redeclared WHOLE from their last
-- declarations (live md5s checked) and changed only where named; an argument's type changes, so each is DROPped and
-- CREATEd, and its grants restated. Their status arrays stay verbatim (CF-STATUS-1).

DO $pre$
DECLARE
  v_fn  text;
  v_md5 text;
  v_was text;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261122040000') THEN
    RAISE EXCEPTION 'cursor-bundle-2 part 2: part 1 (mark 20261122040000) must be applied first';
  END IF;
  FOR v_fn, v_was IN VALUES
    ('public.admin_list_listings(text,text,text,uuid,text,date,date,text,integer,integer)', 'ec92e6b6d2453d53a24fb9622f9ec9d7'),
    ('public.my_listings(text,integer,integer,text,uuid,text)', 'de99323ea3dfe39e78fa49ce8c7d8aa9')
  LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_fn::regprocedure;
    IF v_md5 IS DISTINCT FROM v_was THEN
      RAISE EXCEPTION 'cursor-bundle-2 part 2: the live % is not its last declaration''s body (%)', v_fn, v_md5;
    END IF;
  END LOOP;
END $pre$;

-- ------------------------------------------------------------ 1. admin_list_listings (whole from 20261118012800 :35; the two lists)
DROP FUNCTION public.admin_list_listings(text, text, text, uuid, text, date, date, text, integer, integer);
CREATE FUNCTION public.admin_list_listings(
  p_view text DEFAULT 'all', p_search text DEFAULT NULL, p_country text[] DEFAULT NULL,
  p_category uuid[] DEFAULT NULL, p_seller text DEFAULT NULL, p_from date DEFAULT NULL,
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
  v_countries  character(2)[];
  v_categories uuid[];
  v_ctx      public.door_ctx;
BEGIN
  -- F1-6a — listings:view with its scope: a country grant reads its countries' ads (the ad's home country).
  v_ctx := public.door_context('staff-reader', 'listings', 'view', NULL, NULL, 'filter');
  v_statuses := CASE coalesce(p_view, 'all')
    WHEN 'live'    THEN ARRAY['active','reduced']
    WHEN 'waiting' THEN ARRAY['screening','held']
    WHEN 'ended'   THEN ARRAY['expired','sold','closed']
    WHEN 'removed' THEN ARRAY['rejected','removed']
    WHEN 'all'     THEN ARRAY['screening','active','reduced','rejected','held','expired','sold','removed','closed','paused']
  END;
  IF v_statuses IS NULL THEN
    PERFORM public.door_refuse('badValue', 'view');
  END IF;
  -- P-2 (c) M-3c-b (ruling 1 §3 Q11): a level is a row of the levels dictionary, switched off or not.
  IF p_tier IS NOT NULL AND NOT EXISTS (SELECT 1 FROM public.listing_packages k
                                         WHERE k.key = p_tier AND k.kind = 'level') THEN
    PERFORM public.door_refuse('badValue', 'tier');
  END IF;
  -- cursor-bundle-2 (DEC-420, DEC-423): a country list and a category list, each read by the list rule; NULL or
  -- empty is no filter, and a list that matches nothing matches no row.
  v_countries := public.door_filter_countries(p_country, 'country');
  v_categories := public.door_filter_categories(p_category, 'category');
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
     AND (v_ctx.countries IS NULL OR l.home_country_code = ANY (v_ctx.countries))
     AND (v_term = ''
          OR (v_id IS NOT NULL AND l.id = v_id)
          OR (v_id IS NULL AND position(v_term IN lower(l.title)) > 0))
     AND (v_countries IS NULL OR coalesce(loc.country_code, l.home_country_code) = ANY (v_countries))
     AND (v_categories IS NULL OR l.category_id = ANY (v_categories))
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
REVOKE ALL ON FUNCTION public.admin_list_listings(text, text, text[], uuid[], text, date, date, text, integer, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_list_listings(text, text, text[], uuid[], text, date, date, text, integer, integer) TO authenticated, service_role;

-- ------------------------------------------------------------ 2. my_listings (whole from 20261119150200 :43; the category list)
DROP FUNCTION public.my_listings(text, integer, integer, text, uuid, text);
CREATE FUNCTION public.my_listings(p_group text, p_limit integer DEFAULT 50, p_offset integer DEFAULT 0,
                                             p_search text DEFAULT NULL, p_category uuid[] DEFAULT NULL,
                                             p_mark text DEFAULT NULL)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_ctx    public.door_ctx := public.door_context('reader');
  v_uid    uuid := v_ctx.uid;
  v_counts jsonb;
  v_rows   jsonb;
  v_term   text := lower(btrim(coalesce(p_search, '')));
  v_policy public.listing_policy%ROWTYPE;
  v_categories uuid[];
BEGIN
  IF v_uid IS NULL THEN PERFORM public.door_refuse('notSignedIn'); END IF;
  IF p_group IS NULL OR p_group NOT IN ('live','review','attention','closed','sold','drafts') THEN
    PERFORM public.door_refuse('badValue', 'group');
  END IF;
  IF p_limit IS NULL OR p_limit < 1 OR p_limit > 100 OR p_offset IS NULL OR p_offset < 0 THEN
    PERFORM public.door_refuse('badValue', 'page');
  END IF;
  -- Bundle 16 turn R1 (D181) — the seller's search (words of the title) and filters (a category with everything
  -- under it; Reserved; Price reduced).
  IF length(v_term) > 100 THEN PERFORM public.door_refuse('badValue', 'search'); END IF;
  IF p_mark IS NOT NULL AND p_mark NOT IN ('reserved','reduced') THEN PERFORM public.door_refuse('badValue', 'mark'); END IF;
  -- cursor-bundle-2 (DEC-420, DEC-423): a category list, each root with its subtree, read by the list rule.
  v_categories := public.door_filter_categories(p_category, 'category');

  -- The groups of My listings (D138, D173–D175; P-2 M-1c, D317): live (active, reduced), in review (screening,
  -- held), needs attention (rejected, removed, paused — a level ended with no free slot), closed (closed,
  -- expired), sold, drafts — one mapper, listing_group_of, which raises on a status it does not know (INC-1057).
  WITH mine AS (
    SELECT l.status,
           public.listing_group_of(l.status) AS grp
      FROM public.listings l
     WHERE l.seller_id = v_uid
       AND l.deleted_at IS NULL
       -- Bundle 16 turn R1 (D181) — the seller's search and filters; the counts follow them.
       AND (v_term = '' OR position(v_term IN lower(coalesce(l.title, ''))) > 0)
       AND (v_categories IS NULL OR l.category_id = ANY (v_categories))
       AND (p_mark IS NULL
            OR (p_mark = 'reserved' AND l.reserved_at IS NOT NULL)
            OR (p_mark = 'reduced' AND l.status <> 'sold' AND l.price_drop_at > now() - interval '14 days'))
  )
  SELECT jsonb_build_object(
           'live',      count(*) FILTER (WHERE grp = 'live'),
           'review',    count(*) FILTER (WHERE grp = 'review'),
           'attention', count(*) FILTER (WHERE grp = 'attention'),
           'closed',    count(*) FILTER (WHERE grp = 'closed'),
           'sold',      count(*) FILTER (WHERE grp = 'sold'),
           'drafts',    count(*) FILTER (WHERE grp = 'drafts'))
    INTO v_counts
    FROM mine;

  SELECT coalesce(jsonb_agg(r.row ORDER BY r.changed DESC, r.id DESC), '[]'::jsonb)
    INTO v_rows
    FROM (
      SELECT l.id, coalesce(l.updated_at, l.created_at) AS changed,
             jsonb_build_object(
               'id', l.id,
               'publicId', l.public_id,
               'status', l.status,
               -- P-2 (a) — the ad's level and reach as they stand (DEC-328 / DEC-330; null until = no end).
               'level', l.tier,
               'levelUntil', l.tier_until,
               'levelSource', l.tier_source,
               'reach', l.reach,
               'reachUntil', l.reach_until,
               'title', l.title,
               'categoryId', l.category_id,
               'coverPhotoId', (SELECT p.id FROM public.listing_photos p
                                 WHERE p.listing_id = l.id AND p.exif_stripped
                                 ORDER BY p.display_order
                                 LIMIT 1),
               'photosSoon', l.photos_soon,
               'priceMode', l.price_mode,
               'priceAmount', l.price_amount,
               'priceCurrency', l.price_currency,
               'pricePeriod', l.price_period,
               'priceBp', l.price_bp,
               'priceNegotiable', l.price_negotiable,
               'priceUnit', l.price_unit,
               'priceUnitText', l.price_unit_text,
               -- D173 2 — the "Price reduced" record while its 14 days stand.
               'priceWas', CASE WHEN l.price_drop_at > now() - interval '14 days' THEN l.price_was END,
               'reserved', l.reserved_at IS NOT NULL,
               'publishedFirstAt', l.published_first_at,
               'publishedAt', l.published_at,
               'renewedAt', l.renewed_at,
               'expiresAt', l.expires_at,
               -- The days an ad has left (live) or keeps while closed: whole days, rounded up; null with no end date.
               'daysLeft', CASE WHEN l.status IN ('active','reduced') AND l.expires_at IS NOT NULL
                                THEN greatest(0, ceil(extract(epoch FROM (l.expires_at - now())) / 86400))::integer END,
               'daysKept', CASE WHEN l.status IN ('closed','paused') AND l.kept_remaining IS NOT NULL
                                THEN greatest(0, ceil(extract(epoch FROM l.kept_remaining) / 86400))::integer END,
               'soldAt', l.sold_at,
               -- Bundle 16 turn 3b (call H) — the word a sold ad takes: Rented or Filled when its category says so.
               'soldWord', coalesce((SELECT CASE WHEN 'rented' = ANY (c.capabilities) THEN 'rented'
                                                 WHEN 'filled' = ANY (c.capabilities) THEN 'filled' END
                                       FROM public.categories c WHERE c.id = l.category_id), 'sold'),
               'createdAt', l.created_at,
               'updatedAt', l.updated_at,
               -- A removed ad's latest staff reason (seller_notices, which the seller already reads).
               'removedReason', CASE WHEN l.status = 'removed' THEN
                                  (SELECT sn.reason FROM public.seller_notices sn
                                    WHERE sn.listing_id = l.id AND sn.seller_id = v_uid AND sn.kind = 'admin_remove'
                                    ORDER BY sn.created_at DESC
                                    LIMIT 1) END) AS row
        FROM public.listings l
       WHERE l.seller_id = v_uid
         AND l.deleted_at IS NULL
         -- Bundle 16 turn R1 (D181) — the seller's search and filters; the counts follow them.
         AND (v_term = '' OR position(v_term IN lower(coalesce(l.title, ''))) > 0)
         AND (v_categories IS NULL OR l.category_id = ANY (v_categories))
         AND (p_mark IS NULL
              OR (p_mark = 'reserved' AND l.reserved_at IS NOT NULL)
              OR (p_mark = 'reduced' AND l.status <> 'sold' AND l.price_drop_at > now() - interval '14 days'))
         AND public.listing_group_of(l.status) = p_group
       ORDER BY coalesce(l.updated_at, l.created_at) DESC, l.id DESC
       LIMIT p_limit OFFSET p_offset
    ) r;

  -- Bundle 16 turn R1 (D181) — the admin's renew setting, as my_listing gives it, for the rows' Renew.
  SELECT * INTO v_policy FROM public.listing_policy WHERE id;
  RETURN jsonb_build_object('counts', v_counts, 'rows', v_rows,
                            'renewAllowed', coalesce(v_policy.renew_allowed, false),
                            'renewDays', v_policy.renew_days);
END $function$;
REVOKE ALL ON FUNCTION public.my_listings(text, integer, integer, text, uuid[], text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.my_listings(text, integer, integer, text, uuid[], text) TO authenticated;
GRANT ALL ON FUNCTION public.my_listings(text, integer, integer, text, uuid[], text) TO service_role;

-- ------------------------------------------------------------ 3. PROOFS
-- (a) catalog facts of both: the new argument lists, the old ones gone, STABLE SECURITY DEFINER with search_path public,
--     EXECUTE for authenticated and the service role, never anon or PUBLIC; each body this file's (md5).
-- (b) the lists on scratch ads (XZ: two ads, one under a category that has a parent; XY: one ad): two countries OR-ed
--     (case and spaces read as the doors read them), two categories OR-ed, a parent with its subtree, both lists AND-ed,
--     NULL and the empty list filter nothing; a well-formed country naming no market and a category that exists nowhere
--     match no row — a filter never widens by matching nothing.
-- (c) the refusals, each badValue:<field> (21 values, a NULL value, a three-letter country); a caller without the
--     permission is refused before the list is read.
-- (d) the reach: a country-scoped holder lists its country's ads in either list form and never another's; my_listings
--     stays the caller's own whatever the list holds.
-- (e) the plan: a category list keeps listings_category_idx.
DO $proof$
DECLARE
  v_hex     text := replace(gen_random_uuid()::text, '-', '');
  v_tag     text;
  -- 'XZ' and 'XY': scratch codes no market holds, as earlier proofs' (K4: a recorded proof exception); 'XQ' names no market
  v_code    character(2) := 'XZ';
  v_code2   character(2) := 'XY';
  v_lang    text := public.language_code('base');
  v_a       uuid := gen_random_uuid();
  v_b       uuid := gen_random_uuid();
  v_s       uuid := gen_random_uuid();
  v_c       uuid := gen_random_uuid();
  v_plain   uuid := gen_random_uuid();
  v_role    uuid;
  v_anc     uuid;
  v_anc2    uuid;
  v_region  uuid;
  v_city    uuid;
  v_city2   uuid;
  v_parent  uuid;
  v_cat1    uuid;
  v_cat2    uuid;
  v_cat3    uuid;
  v_nowhere uuid := gen_random_uuid();
  v_l1      uuid := gen_random_uuid();
  v_l2      uuid := gen_random_uuid();
  v_l3      uuid := gen_random_uuid();
  v_fn      regprocedure;
  v_want    text;
  v_call    text;
  v_who     uuid;
  v_exp     uuid[];
  v_got     uuid[];
  v_msg     text;
  v_st      text;
  v_plan    text;
  v_line    text;
  v_ids     uuid[];
  -- the two doors' reads, as text with %s for the named list arguments after the first
  v_al      text := 'SELECT coalesce(array_agg(l.id ORDER BY l.id), ARRAY[]::uuid[]) FROM public.admin_list_listings(p_search => %L, p_limit => 100%s) l';
  v_ml      text := 'SELECT coalesce(array_agg((x ->> ''id'')::uuid ORDER BY (x ->> ''id'')::uuid), ARRAY[]::uuid[]) FROM jsonb_array_elements(public.my_listings(''live'', p_limit => 100%s) -> ''rows'') x';
BEGIN
  -- (a)
  IF to_regprocedure('public.admin_list_listings(text,text,text,uuid,text,date,date,text,integer,integer)') IS NOT NULL
     OR to_regprocedure('public.my_listings(text,integer,integer,text,uuid,text)') IS NOT NULL
     OR to_regprocedure('public.admin_list_listings(text,text,text[],uuid[],text,date,date,text,integer,integer)') IS NULL
     OR to_regprocedure('public.my_listings(text,integer,integer,text,uuid[],text)') IS NULL THEN
    RAISE EXCEPTION 'cursor-bundle-2 part 2 proof (a): an old argument list stands or a new one is missing';
  END IF;
  FOR v_fn, v_want IN VALUES
    ('public.admin_list_listings(text,text,text[],uuid[],text,date,date,text,integer,integer)'::regprocedure, 'a9ce9f7a9a65db31ac086883e0b81091'),
    ('public.my_listings(text,integer,integer,text,uuid[],text)'::regprocedure, '619f5b92860683dc5eb6b8686e0306bd')
  LOOP
    IF (SELECT NOT prosecdef OR provolatile <> 's' OR proconfig::text <> '{search_path=public}' FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'cursor-bundle-2 part 2 proof (a): %''s header or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_want THEN
      RAISE EXCEPTION 'cursor-bundle-2 part 2 proof (a): %''s body differs from this file', v_fn;
    END IF;
  END LOOP;

  v_tag := 'e2e-mig-b2a-' || substr(v_hex, 1, 10);
  BEGIN
    PERFORM set_config('request.jwt.claims', '{}', true);
    IF EXISTS (SELECT 1 FROM public.countries WHERE code IN (v_code, v_code2, 'XQ')) THEN
      RAISE EXCEPTION 'cursor-bundle-2 part 2 proof: a scratch code already exists';
    END IF;
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_code, v_tag, true), (v_code2, v_tag || '-2', true);
    SELECT a.id INTO v_anc FROM public.locations a WHERE a.country_code = v_code AND a.level = 'country' AND a.name_en = v_tag
     AND a.name_en LIKE 'e2e-mig-%';
    SELECT a.id INTO v_anc2 FROM public.locations a WHERE a.country_code = v_code2 AND a.level = 'country'
     AND a.name_en = v_tag || '-2' AND a.name_en LIKE 'e2e-mig-%';
    IF v_anc IS NULL OR v_anc2 IS NULL THEN RAISE EXCEPTION 'cursor-bundle-2 part 2 proof: a scratch market has no anchor'; END IF;
    UPDATE public.locations SET is_active = true WHERE id IN (v_anc, v_anc2) AND name_en LIKE 'e2e-mig-b2a-%';
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id)
    VALUES ('region', v_code, v_tag || ' region', v_tag || '-r', true, v_anc) RETURNING id INTO v_region;
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id, center_lat, center_lng)
    VALUES ('city', v_code, v_tag || ' city', v_tag || '-c', true, v_region, 9.03, 38.74) RETURNING id INTO v_city;
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id)
    VALUES ('region', v_code2, v_tag || ' region 2', v_tag || '-r2', true, v_anc2) RETURNING id INTO v_region;
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id, center_lat, center_lng)
    VALUES ('city', v_code2, v_tag || ' city 2', v_tag || '-c2', true, v_region, 9.03, 38.74) RETURNING id INTO v_city2;
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
      (v_a, v_tag || '-a@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_b, v_tag || '-b@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_s, v_tag || '-s@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_c, v_tag || '-c@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_plain, v_tag || '-p@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO public.legal_acceptances (user_id, version_id, language, method)
    SELECT u, v.id, v_lang, 'e2e-mig' FROM public.legal_versions v, unnest(ARRAY[v_a, v_b, v_s, v_c, v_plain]) u
     WHERE v.status = 'published' AND v.effective_at <= now();
    -- One role with listings:view: global for the holder, XZ only for the country holder.
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-read', v_tag) RETURNING id INTO v_role;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'listings' AND p.action = 'view';
    IF (SELECT count(*) FROM public.role_permissions WHERE role_id = v_role) <> 1 THEN
      RAISE EXCEPTION 'cursor-bundle-2 part 2 proof: listings:view is not declared';
    END IF;
    INSERT INTO public.user_roles (user_id, role_id, scope_type) VALUES (v_s, v_role, 'global');
    INSERT INTO public.user_roles (user_id, role_id, scope_type, scope_country) VALUES (v_c, v_role, 'country', v_code);
    -- Four categories: a parent over cat1, and two leaves beside it.
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES (v_tag || ' parent', v_tag || '-p', true, true, true, 9999) RETURNING id INTO v_parent;
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES (v_tag || ' one', v_tag || '-1', true, true, true, 9999) RETURNING id INTO v_cat1;
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES (v_tag || ' two', v_tag || '-2', true, true, true, 9999) RETURNING id INTO v_cat2;
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES (v_tag || ' three', v_tag || '-3', true, true, true, 9999) RETURNING id INTO v_cat3;
    INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order) VALUES (v_parent, v_cat1, 1);
    -- XZ: l1 (cat1) and l3 (cat3); XY: l2 (cat2). All the seller's own.
    INSERT INTO public.listings (id, seller_id, category_id, location_id, title, description, home_country_code, price_mode,
                                 status, published_at, published_first_at, expires_at)
    VALUES (v_l1, v_a, v_cat1, v_city, v_tag || ' one ad', 'A scratch ad for the list proof.', v_code, 'free', 'active',
            now(), now(), now() + interval '10 days'),
           (v_l2, v_a, v_cat2, v_city2, v_tag || ' two ad', 'A scratch ad for the list proof.', v_code2, 'free', 'active',
            now(), now(), now() + interval '10 days'),
           (v_l3, v_a, v_cat3, v_city, v_tag || ' three ad', 'A scratch ad for the list proof.', v_code, 'free', 'active',
            now(), now(), now() + interval '10 days');

    -- (b) the lists, as the global holder: each read's answer is exactly the expected ads
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_s::text, 'role', 'authenticated')::text, true);
    FOR v_call, v_exp IN VALUES
      (format(v_al, v_tag, ''), ARRAY[v_l1, v_l2, v_l3]),
      (format(v_al, v_tag, ', p_country => NULL'), ARRAY[v_l1, v_l2, v_l3]),
      (format(v_al, v_tag, ', p_country => ARRAY[]::text[], p_category => ARRAY[]::uuid[]'), ARRAY[v_l1, v_l2, v_l3]),
      (format(v_al, v_tag, ', p_country => ARRAY[''XZ'', ''XY'']'), ARRAY[v_l1, v_l2, v_l3]),
      (format(v_al, v_tag, ', p_country => ARRAY[''XZ'']'), ARRAY[v_l1, v_l3]),
      (format(v_al, v_tag, ', p_country => ARRAY['' xy '']'), ARRAY[v_l2]),
      (format(v_al, v_tag, ', p_country => ARRAY[''xz'', ''XZ'', ''XY'']'), ARRAY[v_l1, v_l2, v_l3]),
      (format(v_al, v_tag, ', p_country => ARRAY[''XQ'']'), ARRAY[]::uuid[]),
      (format(v_al, v_tag, format(', p_category => ARRAY[%L]::uuid[]', v_cat1)), ARRAY[v_l1]),
      (format(v_al, v_tag, format(', p_category => ARRAY[%L, %L]::uuid[]', v_cat1, v_cat2)), ARRAY[v_l1, v_l2]),
      (format(v_al, v_tag, format(', p_category => ARRAY[%L]::uuid[]', v_parent)), ARRAY[v_l1]),
      (format(v_al, v_tag, format(', p_category => ARRAY[%L, %L]::uuid[]', v_parent, v_cat3)), ARRAY[v_l1, v_l3]),
      (format(v_al, v_tag, format(', p_category => ARRAY[%L]::uuid[]', v_nowhere)), ARRAY[]::uuid[]),
      (format(v_al, v_tag, format(', p_country => ARRAY[''XZ''], p_category => ARRAY[%L, %L]::uuid[]', v_cat1, v_cat2)), ARRAY[v_l1]),
      (format(v_al, v_tag, format(', p_country => ARRAY[''XQ''], p_category => ARRAY[%L]::uuid[]', v_cat1)), ARRAY[]::uuid[])
    LOOP
      EXECUTE v_call INTO v_got;
      IF v_got IS DISTINCT FROM (SELECT coalesce(array_agg(x ORDER BY x), ARRAY[]::uuid[]) FROM unnest(v_exp) x) THEN
        RAISE EXCEPTION 'cursor-bundle-2 part 2 proof (b): % read % (expected %)', v_call, v_got, v_exp;
      END IF;
    END LOOP;

    -- (c) the refusals: the global holder passes the gate and the list rule answers; no caller and no permission first.
    FOR v_who, v_call, v_want IN VALUES
      (v_s, format(v_al, v_tag, ', p_country => ARRAY(SELECT ''XZ'' FROM generate_series(1, 21))'), 'badValue:country'),
      (v_s, format(v_al, v_tag, ', p_country => ARRAY[''XYZ'']'), 'badValue:country'),
      (v_s, format(v_al, v_tag, ', p_country => ARRAY[''XZ'', NULL]'), 'badValue:country'),
      (v_s, format(v_al, v_tag, ', p_category => ARRAY(SELECT gen_random_uuid() FROM generate_series(1, 21))'), 'badValue:category'),
      (v_s, format(v_al, v_tag, ', p_category => ARRAY[NULL]::uuid[]'), 'badValue:category'),
      (v_a, format(v_ml, ', p_category => ARRAY(SELECT gen_random_uuid() FROM generate_series(1, 21))'), 'badValue:category'),
      (v_a, format(v_ml, ', p_category => ARRAY[NULL]::uuid[]'), 'badValue:category'),
      (v_plain, format(v_al, v_tag, ', p_country => ARRAY[''XYZ'']'), 'permissionDenied'),
      (NULL::uuid, format(v_al, v_tag, ', p_country => ARRAY[''XYZ'']'), 'notSignedIn'),
      (NULL::uuid, format(v_ml, ', p_category => ARRAY[NULL]::uuid[]'), 'notSignedIn')
    LOOP
      PERFORM set_config('request.jwt.claims',
        CASE WHEN v_who IS NULL THEN '{}' ELSE json_build_object('sub', v_who::text, 'role', 'authenticated')::text END, true);
      v_msg := NULL; v_st := NULL;
      -- a reader's refusal is raised as PGRST with the body PostgREST answers (F1-7c); the mark is per call
      PERFORM set_config('door.outer', '', true);
      BEGIN
        EXECUTE v_call INTO v_got;
      EXCEPTION WHEN OTHERS THEN
        GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_st = RETURNED_SQLSTATE;
      END;
      IF v_st IS DISTINCT FROM 'PGRST'
         OR v_msg::jsonb IS DISTINCT FROM jsonb_build_object('code', 'P0D01', 'message', v_want) THEN
        RAISE EXCEPTION 'cursor-bundle-2 part 2 proof (c): % answered % (%), not %', v_call, coalesce(v_msg, 'a read'), v_st, v_want;
      END IF;
    END LOOP;
    -- exactly twenty values pass
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_s::text, 'role', 'authenticated')::text, true);
    EXECUTE format(v_al, v_tag, ', p_country => ARRAY(SELECT ''XZ'' FROM generate_series(1, 20))') INTO v_got;
    IF cardinality(v_got) <> 2 THEN
      RAISE EXCEPTION 'cursor-bundle-2 part 2 proof (c): twenty equal countries did not read the XZ ads';
    END IF;

    -- (d) the reach: the XZ holder lists XZ's ads in either list form, never XY's
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_c::text, 'role', 'authenticated')::text, true);
    FOR v_call, v_exp IN VALUES
      (format(v_al, v_tag, ''), ARRAY[v_l1, v_l3]),
      (format(v_al, v_tag, ', p_country => ARRAY[''XZ'', ''XY'']'), ARRAY[v_l1, v_l3]),
      (format(v_al, v_tag, ', p_country => ARRAY[''XY'']'), ARRAY[]::uuid[]),
      (format(v_al, v_tag, format(', p_category => ARRAY[%L, %L]::uuid[]', v_cat1, v_cat2)), ARRAY[v_l1])
    LOOP
      EXECUTE v_call INTO v_got;
      IF v_got IS DISTINCT FROM (SELECT coalesce(array_agg(x ORDER BY x), ARRAY[]::uuid[]) FROM unnest(v_exp) x) THEN
        RAISE EXCEPTION 'cursor-bundle-2 part 2 proof (d): the XZ holder''s % read % (expected %)', v_call, v_got, v_exp;
      END IF;
    END LOOP;
    -- my_listings: the seller's own whatever the list holds; another person's list is empty
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_a::text, 'role', 'authenticated')::text, true);
    FOR v_call, v_exp IN VALUES
      (format(v_ml, ''), ARRAY[v_l1, v_l2, v_l3]),
      (format(v_ml, ', p_category => ARRAY[]::uuid[]'), ARRAY[v_l1, v_l2, v_l3]),
      (format(v_ml, format(', p_category => ARRAY[%L, %L]::uuid[]', v_cat1, v_cat2)), ARRAY[v_l1, v_l2]),
      (format(v_ml, format(', p_category => ARRAY[%L, %L]::uuid[]', v_parent, v_cat3)), ARRAY[v_l1, v_l3]),
      (format(v_ml, format(', p_category => ARRAY[%L]::uuid[]', v_nowhere)), ARRAY[]::uuid[])
    LOOP
      EXECUTE v_call INTO v_got;
      IF v_got IS DISTINCT FROM (SELECT coalesce(array_agg(x ORDER BY x), ARRAY[]::uuid[]) FROM unnest(v_exp) x) THEN
        RAISE EXCEPTION 'cursor-bundle-2 part 2 proof (d): the seller''s % read % (expected %)', v_call, v_got, v_exp;
      END IF;
    END LOOP;
    IF (public.my_listings('live', 100, 0, NULL, ARRAY[v_cat1, v_cat2]) -> 'counts' ->> 'live')::integer <> 2 THEN
      RAISE EXCEPTION 'cursor-bundle-2 part 2 proof (d): the counts do not follow the category list';
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_b::text, 'role', 'authenticated')::text, true);
    EXECUTE format(v_ml, format(', p_category => ARRAY[%L, %L, %L]::uuid[]', v_cat1, v_cat2, v_cat3)) INTO v_got;
    IF cardinality(v_got) <> 0 THEN
      RAISE EXCEPTION 'cursor-bundle-2 part 2 proof (d): another person''s list carried the seller''s ads';
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);

    -- (e) the plan: a category list is an index condition on listings_category_idx
    v_ids := public.door_filter_categories(ARRAY[v_parent, v_cat3], 'category');
    PERFORM set_config('enable_seqscan', 'off', true);
    v_plan := '';
    FOR v_line IN EXECUTE 'EXPLAIN (COSTS OFF) SELECT l.id FROM public.listings l WHERE l.category_id = ANY ($1)' USING v_ids LOOP
      v_plan := v_plan || v_line || E'\n';
    END LOOP;
    PERFORM set_config('enable_seqscan', 'on', true);
    IF position('listings_category_idx' IN v_plan) = 0 THEN
      RAISE EXCEPTION 'cursor-bundle-2 part 2 proof (e): a category list does not use listings_category_idx: %', v_plan;
    END IF;

    RAISE EXCEPTION 'cursor-bundle-2-part-2-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'cursor-bundle-2-part-2-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
  PERFORM set_config('door.outer', '', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261122040100') ON CONFLICT DO NOTHING;
