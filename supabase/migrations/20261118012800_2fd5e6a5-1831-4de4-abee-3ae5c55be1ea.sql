-- e2e-areas: admin-listings, screening

-- Foundations 1, turn F1-6a, part 8 of 9 — THE STAFF'S TWO COUNTRY-SCOPED LISTING READERS ONTO DOOR_CONTEXT
-- (DEC-333; brief docs/governance/briefs/f1-doors-6a.md, ruling 1 §5; census docs/governance/reports/f1-doors-6a.census.md).
-- admin_list_listings and admin_screening_facts are redeclared WHOLE from their last declarations (live md5s
-- checked), each changed only where named: ONE door_context('staff-reader', …, 'filter') gate — caller, deactivation,
-- the permission with its countries, no second factor (a read changes nothing), no dial — in place of the bare
-- has_permission checks, and door_refuse codes in place of the sentences; a reader takes no shell (its refusal raises
-- P0D01 to the route). Both read the ad's home country (listings.home_country_code, as the edit's match, ruling 1
-- §5): a country grant reads its countries' ads; a global grant all. Folds: 'not signed in' → notSignedIn;
-- 'permission denied' → permissionDenied; 'unknown view' → badValue:view; 'unknown tier' → badValue:tier; 'listing
-- not found' → listingNotFound (an ad outside the caller's countries alike). Every read after the gate is unchanged.

DO $pre$
DECLARE
  v_fn  text;
  v_md5 text;
  v_was text;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261118070600') THEN
    RAISE EXCEPTION 'F1-6a part 8: part 7 (mark 20261118070600) must be applied first';
  END IF;
  FOR v_fn, v_was IN VALUES
    ('public.admin_list_listings(text,text,text,uuid,text,date,date,text,integer,integer)', '05a60d67383ba629298d497c65afe6ab'),
    ('public.admin_screening_facts(uuid)', '82067755383e42a9b344edc3888fac0f')
  LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_fn::regprocedure;
    IF v_md5 IS DISTINCT FROM v_was THEN
      RAISE EXCEPTION 'F1-6a part 8: the live % is not its last declaration''s body (%)', v_fn, v_md5;
    END IF;
  END LOOP;
END $pre$;

-- ------------------------------------------------------------ 1. admin_list_listings (whole from 20261109044935 :26; listings:view filtered by the ad's home country, codes)
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
GRANT EXECUTE ON FUNCTION public.admin_list_listings(text, text, text, uuid, text, date, date, text, integer, integer) TO authenticated, service_role;

-- ------------------------------------------------------------ 2. admin_screening_facts (whole from 20261010103356 :20; listings:review filtered by the ad's home country, codes)
CREATE OR REPLACE FUNCTION public.admin_screening_facts(p_listing_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_ctx     public.door_ctx;
  v_row     public.listings%ROWTYPE;
  v_country text;
  v_alias   text;
  v_type    text;
  v_biz     text;
  v_pref    jsonb;
BEGIN
  -- F1-6a — listings:review with its scope: an ad outside the caller's countries is not found.
  v_ctx := public.door_context('staff-reader', 'listings', 'review', NULL, NULL, 'filter');

  SELECT * INTO v_row FROM public.listings l WHERE l.id = p_listing_id;
  IF NOT FOUND OR v_row.status <> 'screening'
     OR NOT (v_ctx.countries IS NULL OR v_row.home_country_code = ANY (v_ctx.countries)) THEN
    PERFORM public.door_refuse('listingNotFound');
  END IF;

  SELECT l.country_code INTO v_country FROM public.locations l WHERE l.id = v_row.location_id;
  SELECT p.seller_alias, p.seller_type, p.business_name INTO v_alias, v_type, v_biz
    FROM public.profiles p
   WHERE p.user_id = v_row.seller_id;
  v_pref := coalesce(v_row.contact_pref, '{}'::jsonb);

  RETURN jsonb_build_object(
    'country', coalesce(v_country, v_row.home_country_code),
    'channels', jsonb_build_object(
      'phone',    coalesce((v_pref->'phone'->>'show')::boolean, false),
      'phone2',   coalesce((v_pref->'phone2'->>'show')::boolean, false),
      'telegram', coalesce((v_pref->'telegram'->>'show')::boolean, false),
      'whatsapp', coalesce((v_pref->'whatsapp'->>'show')::boolean, false)),
    'seller', jsonb_build_object(
      'alias', v_alias,
      'business_name', CASE WHEN v_type = 'business' THEN v_biz END));
END $$;
REVOKE ALL ON FUNCTION public.admin_screening_facts(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_screening_facts(uuid) TO authenticated, service_role;

-- ------------------------------------------------------------ 3. PROOFS
-- (a) catalog facts of both: STABLE SECURITY DEFINER, their return types, EXECUTE for authenticated and the service
--     role, never anon or PUBLIC; each body this file's (md5).
-- (b) the gates of each: no caller notSignedIn; a person without the permission permissionDenied; a deactivated holder
--     accountDeactivated — raised P0D01, exact. A holder without a second factor reads both (no step-up).
-- (c) the codes with every earlier check cleared: badValue:view, badValue:tier, listingNotFound (no ad; a live ad).
-- (d) the scope: a country holder lists its country's ads and not another's, and reads the facts of its country's ad
--     in screening and not another's (listingNotFound); a global holder and the service role list all.
-- (e) no reader spends a dial or meters a refusal (no shell).
DO $proof$
DECLARE
  v_hex     text := replace(gen_random_uuid()::text, '-', '');
  v_tag     text;
  -- 'XZ' and 'XY': scratch codes no market holds, as earlier proofs' (K4: a recorded proof exception)
  v_code    character(2) := 'XZ';
  v_code2   character(2) := 'XY';
  v_lang    text := public.language_code('base');
  v_r0      text;
  v_a       uuid := gen_random_uuid();
  v_s       uuid := gen_random_uuid();
  v_c       uuid := gen_random_uuid();
  v_plain   uuid := gen_random_uuid();
  v_deact   uuid := gen_random_uuid();
  v_role    uuid;
  v_anc     uuid;
  v_anc2    uuid;
  v_region  uuid;
  v_city    uuid;
  v_city2   uuid;
  v_cat     uuid;
  v_live    uuid := gen_random_uuid();
  v_scr     uuid := gen_random_uuid();
  v_scr2    uuid := gen_random_uuid();
  v_answer  jsonb;
  v_count   integer;
  v_ref0    bigint;
  v_msg     text;
  v_call    text;
  v_want    text;
  v_who     uuid;
  v_fn      regprocedure;
  v_calls   text[];
BEGIN
  FOR v_fn, v_want IN VALUES
    ('public.admin_list_listings(text,text,text,uuid,text,date,date,text,integer,integer)'::regprocedure, 'ec92e6b6d2453d53a24fb9622f9ec9d7'),
    ('public.admin_screening_facts(uuid)'::regprocedure, 'e76530247270677fd16020c762fedaef')
  LOOP
    IF (SELECT NOT prosecdef OR provolatile <> 's' OR proconfig::text <> '{search_path=public}'
               OR prorettype <> CASE WHEN v_fn::text LIKE 'admin_list_listings(%' THEN 'record'::regtype ELSE 'jsonb'::regtype END
          FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-6a part 8 proof (a): %''s header, return type or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_want THEN
      RAISE EXCEPTION 'F1-6a part 8 proof (a): %''s body differs from this file', v_fn;
    END IF;
  END LOOP;

  v_tag := 'e2e-mig-f16a8-' || substr(v_hex, 1, 10);
  v_r0 := 'e2e_mig_r0_' || substr(v_hex, 11, 8);
  BEGIN
    PERFORM set_config('request.jwt.claims', '{}', true);
    IF EXISTS (SELECT 1 FROM public.countries WHERE code IN (v_code, v_code2)) THEN
      RAISE EXCEPTION 'F1-6a part 8 proof: a scratch code (% or %) already exists', v_code, v_code2;
    END IF;
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_code, v_tag, true), (v_code2, v_tag || '-2', true);
    SELECT a.id INTO v_anc FROM public.locations a WHERE a.country_code = v_code AND a.level = 'country' AND a.name_en = v_tag
     AND a.name_en LIKE 'e2e-mig-%';
    SELECT a.id INTO v_anc2 FROM public.locations a WHERE a.country_code = v_code2 AND a.level = 'country'
     AND a.name_en = v_tag || '-2' AND a.name_en LIKE 'e2e-mig-%';
    IF v_anc IS NULL OR v_anc2 IS NULL THEN RAISE EXCEPTION 'F1-6a part 8 proof: a scratch market has no anchor'; END IF;
    UPDATE public.locations SET is_active = true WHERE id IN (v_anc, v_anc2) AND name_en LIKE 'e2e-mig-f16a8-%';
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
      (v_s, v_tag || '-s@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_c, v_tag || '-c@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_plain, v_tag || '-p@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_deact, v_tag || '-d@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO public.legal_acceptances (user_id, version_id, language, method)
    SELECT u, v.id, v_lang, 'e2e-mig' FROM public.legal_versions v, unnest(ARRAY[v_a, v_s, v_c, v_plain, v_deact]) u
     WHERE v.status = 'published' AND v.effective_at <= now();
    UPDATE public.profiles SET account_status = 'deactivated'
     WHERE user_id = v_deact
       AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = v_deact AND u.email LIKE 'e2e-mig-%');
    -- One role with listings:view and listings:review: global for the holder (no second factor) and the deactivated
    -- one, XZ only for the country holder.
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-read', v_tag) RETURNING id INTO v_role;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'listings' AND p.action IN ('view', 'review');
    IF (SELECT count(*) FROM public.role_permissions WHERE role_id = v_role) <> 2 THEN
      RAISE EXCEPTION 'F1-6a part 8 proof: listings:view or listings:review is not declared';
    END IF;
    INSERT INTO public.user_roles (user_id, role_id, scope_type) VALUES (v_s, v_role, 'global'), (v_deact, v_role, 'global');
    INSERT INTO public.user_roles (user_id, role_id, scope_type, scope_country) VALUES (v_c, v_role, 'country', v_code);
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES (v_tag || ' leaf', v_tag, true, true, true, 9999) RETURNING id INTO v_cat;
    INSERT INTO public.listing_packages (key, kind, name_en, days, enabled, self_serve, extends_lifetime, sort)
    VALUES (v_r0, 'reach', v_tag || ' reach', 30, true, true, false, 9001);
    INSERT INTO public.market_settings (country_code, free_regular_ads, included_reach, paid_levels)
    VALUES (v_code, 20, v_r0, false), (v_code2, 20, v_r0, false);
    -- XZ: a live ad and one in screening; XY: one in screening.
    INSERT INTO public.listings (id, seller_id, category_id, location_id, title, description, home_country_code, price_mode,
                                 status, published_at, published_first_at, expires_at)
    VALUES (v_live, v_a, v_cat, v_city, v_tag || ' live ad', 'A scratch ad for the readers proof.', v_code, 'free', 'active',
            now(), now(), now() + interval '10 days'),
           (v_scr, v_a, v_cat, v_city, v_tag || ' new ad', 'A scratch ad for the readers proof.', v_code, 'free', 'screening',
            NULL, NULL, NULL),
           (v_scr2, v_a, v_cat, v_city2, v_tag || ' other ad', 'A scratch ad for the readers proof.', v_code2, 'free', 'screening',
            NULL, NULL, NULL);
    SELECT coalesce(sum(count), 0) INTO v_ref0 FROM public.door_refusals WHERE day = current_date
       AND door IN ('admin_list_listings', 'admin_screening_facts');

    v_calls := ARRAY[
      format('SELECT count(*)::text FROM public.admin_list_listings(''all'', %L, NULL, NULL, NULL, NULL, NULL, NULL, 100, 0)', v_tag),
      format('SELECT public.admin_screening_facts(%L)::text', v_scr)];

    -- (b) the gates of each reader; the holder without a second factor reads each.
    FOREACH v_call IN ARRAY v_calls LOOP
      FOR v_who, v_want IN VALUES (NULL::uuid, 'notSignedIn'), (v_plain, 'permissionDenied'), (v_deact, 'accountDeactivated'),
                                  (v_s, NULL::text) LOOP
        PERFORM set_config('request.jwt.claims',
          CASE WHEN v_who IS NULL THEN '{}' ELSE json_build_object('sub', v_who::text, 'role', 'authenticated')::text END, true);
        BEGIN
          EXECUTE v_call INTO v_msg;
          v_msg := NULL;
        EXCEPTION WHEN SQLSTATE 'P0D01' THEN
          GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
        END;
        IF v_msg IS DISTINCT FROM v_want THEN
          RAISE EXCEPTION 'F1-6a part 8 proof (b): % for % answered % (expected %)', v_call, coalesce(v_who::text, 'no caller'),
            coalesce(v_msg, 'a read'), coalesce(v_want, 'a read');
        END IF;
      END LOOP;
    END LOOP;

    -- (c) the codes: the global holder passes every gate.
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_s::text, 'role', 'authenticated')::text, true);
    FOR v_call, v_want IN VALUES
      ('SELECT count(*)::text FROM public.admin_list_listings(''bogus'')', 'badValue:view'),
      ('SELECT count(*)::text FROM public.admin_list_listings(''all'', NULL, NULL, NULL, NULL, NULL, NULL, ''bogus'')', 'badValue:tier'),
      (format('SELECT public.admin_screening_facts(%L)::text', gen_random_uuid()), 'listingNotFound'),
      (format('SELECT public.admin_screening_facts(%L)::text', v_live), 'listingNotFound')
    LOOP
      BEGIN
        EXECUTE v_call INTO v_msg;
        v_msg := 'a read';
      EXCEPTION WHEN SQLSTATE 'P0D01' THEN
        GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
      END;
      IF v_msg IS DISTINCT FROM v_want THEN
        RAISE EXCEPTION 'F1-6a part 8 proof (c): % answered % (expected %)', v_call, v_msg, v_want;
      END IF;
    END LOOP;

    -- (d) the scope: the global holder lists all three; the service role too.
    SELECT count(*)::integer INTO v_count FROM public.admin_list_listings('all', v_tag, NULL, NULL, NULL, NULL, NULL, NULL, 100, 0);
    IF v_count <> 3 THEN
      RAISE EXCEPTION 'F1-6a part 8 proof (d): the global holder listed % of the 3 scratch ads', v_count;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('role', 'service_role')::text, true);
    SELECT count(*)::integer INTO v_count FROM public.admin_list_listings('all', v_tag, NULL, NULL, NULL, NULL, NULL, NULL, 100, 0);
    IF v_count <> 3 THEN
      RAISE EXCEPTION 'F1-6a part 8 proof (d): the service role listed % of the 3 scratch ads', v_count;
    END IF;
    -- The country holder: XZ's two, never XY's; XZ's facts, not XY's.
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_c::text, 'role', 'authenticated')::text, true);
    IF (SELECT array_agg(l.id ORDER BY l.id) FROM public.admin_list_listings('all', v_tag, NULL, NULL, NULL, NULL, NULL, NULL, 100, 0) l)
         IS DISTINCT FROM (SELECT array_agg(x ORDER BY x) FROM unnest(ARRAY[v_live, v_scr]) x) THEN
      RAISE EXCEPTION 'F1-6a part 8 proof (d): the country holder''s list is not its country''s two ads';
    END IF;
    v_answer := public.admin_screening_facts(v_scr);
    IF v_answer ->> 'country' IS DISTINCT FROM v_code::text THEN
      RAISE EXCEPTION 'F1-6a part 8 proof (d): the country holder''s facts of its own country''s ad read %', v_answer;
    END IF;
    BEGIN
      v_answer := public.admin_screening_facts(v_scr2);
      v_msg := 'a read';
    EXCEPTION WHEN SQLSTATE 'P0D01' THEN
      GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    END;
    IF v_msg IS DISTINCT FROM 'listingNotFound' THEN
      RAISE EXCEPTION 'F1-6a part 8 proof (d): the country holder''s facts of another country''s ad answered %', v_msg;
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);

    -- (e) nothing spent, nothing metered.
    IF EXISTS (SELECT 1 FROM public.rate_limits WHERE key IN (v_a::text, v_s::text, v_c::text, v_plain::text, v_deact::text)) THEN
      RAISE EXCEPTION 'F1-6a part 8 proof (e): a reader spent a dial';
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date
           AND door IN ('admin_list_listings', 'admin_screening_facts'))
         IS DISTINCT FROM v_ref0 THEN
      RAISE EXCEPTION 'F1-6a part 8 proof (e): a reader metered a refusal';
    END IF;

    RAISE EXCEPTION 'f1-6a-part-8-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f1-6a-part-8-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261118070700') ON CONFLICT DO NOTHING;
