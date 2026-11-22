-- e2e-areas: admin-screening

-- Cursor bundle 2, part 4 of 5 — THE SCREENING QUEUE'S OWN READER (ACT-022; DEC-422; brief
-- docs/governance/briefs/cursor-bundle-2.md item 2, ruling docs/governance/briefs/cursor-bundle-2-ruling-1.md answers 2 and
-- 6; census docs/governance/reports/cursor-bundle-2.census.md). The queue read the listings table through the browser's own
-- read and filtered it by the ad's place; a country scope could not be applied that way, and the seller's name is a staff
-- reading. `admin_screening_queue` is the queue's own staff door: `door_context('staff-reader', 'listings', 'review', …,
-- 'filter')` — listings:review, a country grant reading its countries' ads by the ad's home country, a global grant all.
-- It answers {total, rows}: the ads in screening that match (the title or an ad's id; a country list read by the list rule
-- against the market of the ad's place; the level; the seller by public name, by business name and — for holders of
-- profiles:view only — by e-mail), oldest change first, one page of at most 100, the total counted apart from the page.
-- Each row carries exactly the columns the queue's read selected, flat (the category's and the place's names and the place's
-- country as keys of the row), and the seller's public name, business name and — for holders of profiles:view only — e-mail.
-- An ad that is not in screening is never a row. New function: closed to PUBLIC and anon, granted to authenticated and the
-- service role.

DO $pre$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261122040200') THEN
    RAISE EXCEPTION 'cursor-bundle-2 part 4: part 3 (mark 20261122040200) must be applied first';
  END IF;
  IF to_regprocedure('public.door_filter_countries(text[],text)') IS NULL
     OR to_regprocedure('public.door_context(text,text,text,text,character,text)') IS NULL THEN
    RAISE EXCEPTION 'cursor-bundle-2 part 4: a door mechanism function is missing';
  END IF;
END $pre$;

-- ------------------------------------------------------------ 1. admin_screening_queue
CREATE FUNCTION public.admin_screening_queue(
  p_search text DEFAULT NULL, p_country text[] DEFAULT NULL, p_tier text DEFAULT NULL,
  p_seller text DEFAULT NULL, p_limit integer DEFAULT 25, p_offset integer DEFAULT 0)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid       uuid := auth.uid();
  v_ctx       public.door_ctx;
  v_email     boolean;
  v_countries character(2)[];
  v_term      text := lower(btrim(coalesce(p_search, '')));
  v_id        uuid;
  v_seller    text := lower(btrim(coalesce(p_seller, '')));
  v_limit     integer := LEAST(GREATEST(coalesce(p_limit, 25), 1), 100);
  v_offset    integer := GREATEST(coalesce(p_offset, 0), 0);
  v_answer    jsonb;
BEGIN
  -- ACT-022 (DEC-422): the Screening queue's own door — listings:review with its scope: a country grant reads the
  -- ads of its countries (the ad's home country), a global grant all.
  v_ctx := public.door_context('staff-reader', 'listings', 'review', NULL, NULL, 'filter');
  -- A level is a row of the levels dictionary, switched off or not (as admin_list_listings reads it).
  IF p_tier IS NOT NULL AND NOT EXISTS (SELECT 1 FROM public.listing_packages k
                                         WHERE k.key = p_tier AND k.kind = 'level') THEN
    PERFORM public.door_refuse('badValue', 'tier');
  END IF;
  -- cursor-bundle-2 (DEC-420, DEC-423): a country list read by the list rule; the market of the ad's place.
  v_countries := public.door_filter_countries(p_country, 'country');
  -- The seller's e-mail is shown and matched only for holders of profiles:view (the Users console's own rule).
  v_email := public.has_permission(v_uid, 'profiles', 'view');
  IF v_term ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$' THEN
    v_id := v_term::uuid;
  END IF;

  -- The hits are the ids that match, counted apart from the page; the page is joined back for its rows.
  WITH hits AS MATERIALIZED (
    SELECT l.id, l.updated_at
      FROM public.listings l
      LEFT JOIN public.locations loc ON loc.id = l.location_id
      LEFT JOIN public.profiles p ON p.user_id = l.seller_id
      LEFT JOIN auth.users u ON u.id = l.seller_id
     WHERE l.status = 'screening'
       AND (v_ctx.countries IS NULL OR l.home_country_code = ANY (v_ctx.countries))
       AND (v_term = ''
            OR (v_id IS NOT NULL AND l.id = v_id)
            OR (v_id IS NULL AND position(v_term IN lower(l.title)) > 0))
       AND (v_countries IS NULL OR loc.country_code = ANY (v_countries))
       AND (p_tier IS NULL OR l.tier = p_tier)
       AND (v_seller = ''
            OR position(v_seller IN lower(coalesce(p.seller_alias, ''))) > 0
            OR (p.seller_type = 'business' AND position(v_seller IN lower(coalesce(p.business_name, ''))) > 0)
            OR (v_email AND position(v_seller IN lower(coalesce(u.email::text, ''))) > 0))
  ), page AS (
    SELECT h.id, h.updated_at FROM hits h ORDER BY h.updated_at ASC, h.id ASC LIMIT v_limit OFFSET v_offset
  )
  SELECT jsonb_build_object(
           'total', (SELECT count(*) FROM hits),
           'rows', coalesce((
             SELECT jsonb_agg(jsonb_build_object(
                      'id', l.id, 'title', l.title, 'description', l.description,
                      'category_id', l.category_id, 'location_id', l.location_id,
                      'price_mode', l.price_mode, 'price_amount', l.price_amount, 'price_currency', l.price_currency,
                      'price_period', l.price_period, 'price_bp', l.price_bp, 'price_negotiable', l.price_negotiable,
                      'price_unit', l.price_unit, 'price_unit_text', l.price_unit_text,
                      'attributes', l.attributes, 'photos_soon', l.photos_soon, 'tier', l.tier,
                      'updated_at', l.updated_at,
                      'category_name_en', c.name_en, 'category_name_am', c.name_am,
                      'place_name_en', loc.name_en, 'place_name_am', loc.name_am, 'country_code', loc.country_code,
                      'seller_alias', p.seller_alias,
                      'seller_business_name', CASE WHEN p.seller_type = 'business' THEN p.business_name END,
                      'seller_email', CASE WHEN v_email THEN u.email::text END)
                    ORDER BY pg.updated_at ASC, pg.id ASC)
               FROM page pg
               JOIN public.listings l ON l.id = pg.id
               LEFT JOIN public.categories c ON c.id = l.category_id
               LEFT JOIN public.locations loc ON loc.id = l.location_id
               LEFT JOIN public.profiles p ON p.user_id = l.seller_id
               LEFT JOIN auth.users u ON u.id = l.seller_id), '[]'::jsonb))
    INTO v_answer;
  RETURN v_answer;
END $$;
REVOKE ALL ON FUNCTION public.admin_screening_queue(text, text[], text, text, integer, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_screening_queue(text, text[], text, text, integer, integer) TO authenticated, service_role;

-- ------------------------------------------------------------ 2. PROOFS
-- (a) catalog facts: STABLE SECURITY DEFINER with search_path public, returns jsonb, EXECUTE for authenticated and the
--     service role, never anon or PUBLIC; the body this file's (md5).
-- (b) the answer on scratch ads (three in screening, one live): {total, rows}; a row's keys are exactly the 25 below, its
--     values the ad's own and its category's and place's; rows ordered by the change then the id; the live ad is never a row.
-- (c) the page: a limit of one answers one row and the total of all three; an offset past the end answers no row.
-- (d) the seller's e-mail: a holder of listings:review without profiles:view reads no e-mail and an e-mail term matches
--     nothing; a holder of both reads it and matches by it; the alias and the business name match for both.
-- (e) the gates: no listings:review (with or without listings:view) is permissionDenied, no caller notSignedIn, each before
--     the lists are read; badValue:tier, and badValue:country for 21 values, a three-letter and a NULL value.
-- (f) the lists and the reach: two countries OR-ed, a well-formed code naming no market matches no row; an XZ-scoped holder
--     reads XZ's ads only, in every list form, and its total counts only its own.
-- (g) the plan: a country list keeps locations_country_idx.
DO $proof$
DECLARE
  v_hex     text := replace(gen_random_uuid()::text, '-', '');
  v_tag     text;
  -- 'XZ' and 'XY': scratch codes no market holds, as earlier proofs' (K4: a recorded proof exception); 'XQ' names no market
  v_code    character(2) := 'XZ';
  v_code2   character(2) := 'XY';
  v_lang    text := public.language_code('base');
  v_a       uuid := gen_random_uuid();
  v_rev     uuid := gen_random_uuid();
  v_revp    uuid := gen_random_uuid();
  v_c       uuid := gen_random_uuid();
  v_viewer  uuid := gen_random_uuid();
  v_plain   uuid := gen_random_uuid();
  v_role_r  uuid;
  v_role_p  uuid;
  v_role_v  uuid;
  v_anc     uuid;
  v_anc2    uuid;
  v_region  uuid;
  v_city    uuid;
  v_city2   uuid;
  v_cat     uuid;
  v_s1      uuid := gen_random_uuid();
  v_s2      uuid := gen_random_uuid();
  v_s3      uuid := gen_random_uuid();
  v_live    uuid := gen_random_uuid();
  v_alias   text;
  v_fn      regprocedure := 'public.admin_screening_queue(text,text[],text,text,integer,integer)'::regprocedure;
  v_want    text;
  v_call    text;
  v_who     uuid;
  v_exp     uuid[];
  v_got     uuid[];
  v_answer  jsonb;
  v_row     jsonb;
  v_keys    text[];
  v_msg     text;
  v_st      text;
  v_plan    text;
  v_line    text;
  -- the door's read: its rows' ids in the order it answered them; %s the named arguments after the tag
  v_read    text := 'SELECT coalesce(array_agg((x ->> ''id'')::uuid ORDER BY o), ARRAY[]::uuid[]) FROM jsonb_array_elements(public.admin_screening_queue(p_search => %L%s) -> ''rows'') WITH ORDINALITY AS t(x, o)';
BEGIN
  -- (a)
  IF (SELECT NOT prosecdef OR provolatile <> 's' OR proconfig::text <> '{search_path=public}' OR prorettype <> 'jsonb'::regtype
        FROM pg_proc WHERE oid = v_fn)
     OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
     OR has_function_privilege('anon', v_fn, 'EXECUTE')
     OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE')
     OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
    RAISE EXCEPTION 'cursor-bundle-2 part 4 proof (a): % header or grants differ', v_fn;
  END IF;
  IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM 'b9361dc3860adf0b6ddeb541933fe93d' THEN
    RAISE EXCEPTION 'cursor-bundle-2 part 4 proof (a): % body differs from this file', v_fn;
  END IF;

  v_tag := 'e2e-mig-b2b-' || substr(v_hex, 1, 10);
  BEGIN
    PERFORM set_config('request.jwt.claims', '{}', true);
    IF EXISTS (SELECT 1 FROM public.countries WHERE code IN (v_code, v_code2, 'XQ')) THEN
      RAISE EXCEPTION 'cursor-bundle-2 part 4 proof: a scratch code already exists';
    END IF;
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_code, v_tag, true), (v_code2, v_tag || '-2', true);
    SELECT a.id INTO v_anc FROM public.locations a WHERE a.country_code = v_code AND a.level = 'country' AND a.name_en = v_tag
     AND a.name_en LIKE 'e2e-mig-%';
    SELECT a.id INTO v_anc2 FROM public.locations a WHERE a.country_code = v_code2 AND a.level = 'country'
     AND a.name_en = v_tag || '-2' AND a.name_en LIKE 'e2e-mig-%';
    IF v_anc IS NULL OR v_anc2 IS NULL THEN RAISE EXCEPTION 'cursor-bundle-2 part 4 proof: a scratch market has no anchor'; END IF;
    UPDATE public.locations SET is_active = true WHERE id IN (v_anc, v_anc2) AND name_en LIKE 'e2e-mig-b2b-%';
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
      (v_rev, v_tag || '-rev@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_revp, v_tag || '-revp@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_c, v_tag || '-c@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_viewer, v_tag || '-viewer@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_plain, v_tag || '-p@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO public.legal_acceptances (user_id, version_id, language, method)
    SELECT u, v.id, v_lang, 'e2e-mig'
      FROM public.legal_versions v, unnest(ARRAY[v_a, v_rev, v_revp, v_c, v_viewer, v_plain]) u
     WHERE v.status = 'published' AND v.effective_at <= now();
    -- Three roles: listings:review (global for v_rev, XZ only for v_c); listings:review with profiles:view (v_revp);
    -- listings:view alone (v_viewer).
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-review', v_tag) RETURNING id INTO v_role_r;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role_r, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'listings' AND p.action = 'review';
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-people', v_tag) RETURNING id INTO v_role_p;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role_p, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'profiles' AND p.action = 'view';
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-view', v_tag) RETURNING id INTO v_role_v;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role_v, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'listings' AND p.action = 'view';
    IF (SELECT count(*) FROM public.role_permissions WHERE role_id IN (v_role_r, v_role_p, v_role_v)) <> 3 THEN
      RAISE EXCEPTION 'cursor-bundle-2 part 4 proof: listings:review, profiles:view or listings:view is not declared';
    END IF;
    INSERT INTO public.user_roles (user_id, role_id, scope_type)
    VALUES (v_rev, v_role_r, 'global'), (v_revp, v_role_r, 'global'), (v_revp, v_role_p, 'global'), (v_viewer, v_role_v, 'global');
    INSERT INTO public.user_roles (user_id, role_id, scope_type, scope_country) VALUES (v_c, v_role_r, 'country', v_code);
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES (v_tag || ' leaf', v_tag, true, true, true, 9999) RETURNING id INTO v_cat;
    -- The seller is a business with a public name and a business name.
    UPDATE public.profiles SET seller_type = 'business', business_name = v_tag || ' trading',
           seller_alias = 'seller' || translate(substr(v_hex, 1, 10), '0123456789', 'ghijkmnopr')
     WHERE user_id = v_a AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = v_a AND u.email LIKE 'e2e-mig-%')
    RETURNING seller_alias INTO v_alias;
    IF v_alias IS NULL OR v_alias = '' THEN
      RAISE EXCEPTION 'cursor-bundle-2 part 4 proof: the scratch seller has no public name';
    END IF;
    -- XZ: s1 and s3 in screening; XY: s2 in screening; a live ad in XZ that is never a row.
    INSERT INTO public.listings (id, seller_id, category_id, location_id, title, description, home_country_code, price_mode,
                                 status, published_at, published_first_at, expires_at)
    VALUES (v_s1, v_a, v_cat, v_city, v_tag || ' first ad', 'A scratch ad for the queue proof.', v_code, 'free', 'screening',
            NULL, NULL, NULL),
           (v_s2, v_a, v_cat, v_city2, v_tag || ' second ad', 'A scratch ad for the queue proof.', v_code2, 'free', 'screening',
            NULL, NULL, NULL),
           (v_s3, v_a, v_cat, v_city, v_tag || ' third ad', 'A scratch ad for the queue proof.', v_code, 'free', 'screening',
            NULL, NULL, NULL),
           (v_live, v_a, v_cat, v_city, v_tag || ' live ad', 'A scratch ad for the queue proof.', v_code, 'free', 'active',
            now(), now(), now() + interval '10 days');

    -- (b) the answer, as the global reviewer
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_rev::text, 'role', 'authenticated')::text, true);
    v_answer := public.admin_screening_queue(p_search => v_tag);
    IF jsonb_typeof(v_answer) <> 'object' OR (v_answer ->> 'total')::integer <> 3
       OR jsonb_array_length(v_answer -> 'rows') <> 3
       OR (SELECT array_agg(k ORDER BY k) FROM jsonb_object_keys(v_answer) k) IS DISTINCT FROM ARRAY['rows', 'total'] THEN
      RAISE EXCEPTION 'cursor-bundle-2 part 4 proof (b): the answer is not {total: 3, rows: 3} (%)', v_answer;
    END IF;
    v_row := (v_answer -> 'rows') -> 0;
    SELECT array_agg(k ORDER BY k) INTO v_keys FROM jsonb_object_keys(v_row) k;
    IF v_keys IS DISTINCT FROM ARRAY[
         'attributes', 'category_id', 'category_name_am', 'category_name_en', 'country_code', 'description', 'id',
         'location_id', 'photos_soon', 'place_name_am', 'place_name_en', 'price_amount', 'price_bp', 'price_currency',
         'price_mode', 'price_negotiable', 'price_period', 'price_unit', 'price_unit_text', 'seller_alias',
         'seller_business_name', 'seller_email', 'tier', 'title', 'updated_at']::text[] THEN
      RAISE EXCEPTION 'cursor-bundle-2 part 4 proof (b): a row''s keys are not the queue''s columns and the seller''s three: %', v_keys;
    END IF;
    -- the order: the change, then the id, as the table reads them
    SELECT coalesce(array_agg(l.id ORDER BY l.updated_at ASC, l.id ASC), ARRAY[]::uuid[]) INTO v_exp
      FROM public.listings l WHERE l.title LIKE v_tag || '%' AND l.status = 'screening';
    EXECUTE format(v_read, v_tag, '') INTO v_got;
    IF v_got IS DISTINCT FROM v_exp OR cardinality(v_got) <> 3 OR v_live = ANY (v_got) THEN
      RAISE EXCEPTION 'cursor-bundle-2 part 4 proof (b): the rows % are not the screening ads in their order %', v_got, v_exp;
    END IF;
    -- a row's values: the ad's own, its category's and its place's, the seller's public name and business name
    SELECT r INTO v_row FROM jsonb_array_elements(v_answer -> 'rows') r WHERE r ->> 'id' = v_s1::text;
    IF v_row ->> 'title' IS DISTINCT FROM v_tag || ' first ad' OR v_row ->> 'category_name_en' IS DISTINCT FROM v_tag || ' leaf'
       OR v_row ->> 'place_name_en' IS DISTINCT FROM v_tag || ' city' OR v_row ->> 'country_code' IS DISTINCT FROM v_code::text
       OR v_row ->> 'category_id' IS DISTINCT FROM v_cat::text OR v_row ->> 'location_id' IS DISTINCT FROM v_city::text
       OR v_row ->> 'price_mode' IS DISTINCT FROM 'free' OR v_row ->> 'seller_alias' IS DISTINCT FROM v_alias
       OR v_row ->> 'seller_business_name' IS DISTINCT FROM v_tag || ' trading' THEN
      RAISE EXCEPTION 'cursor-bundle-2 part 4 proof (b): a row''s values are not the ad''s own: %', v_row;
    END IF;
    -- an ad's id finds it; an id that is the live ad's finds nothing (it is not in screening)
    EXECUTE format(v_read, v_s2::text, '') INTO v_got;
    IF v_got IS DISTINCT FROM ARRAY[v_s2] THEN
      RAISE EXCEPTION 'cursor-bundle-2 part 4 proof (b): an ad''s id did not find that ad (%)', v_got;
    END IF;
    EXECUTE format(v_read, v_live::text, '') INTO v_got;
    IF cardinality(v_got) <> 0 THEN
      RAISE EXCEPTION 'cursor-bundle-2 part 4 proof (b): an ad not in screening was a row';
    END IF;

    -- (c) the page: the total is of all the hits, the rows are the page
    v_answer := public.admin_screening_queue(p_search => v_tag, p_limit => 1, p_offset => 1);
    IF (v_answer ->> 'total')::integer <> 3 OR jsonb_array_length(v_answer -> 'rows') <> 1
       OR ((v_answer -> 'rows') -> 0 ->> 'id')::uuid IS DISTINCT FROM v_exp[2] THEN
      RAISE EXCEPTION 'cursor-bundle-2 part 4 proof (c): a page of one at offset one is not the second of three (%)', v_answer;
    END IF;
    v_answer := public.admin_screening_queue(p_search => v_tag, p_offset => 50);
    IF (v_answer ->> 'total')::integer <> 3 OR jsonb_array_length(v_answer -> 'rows') <> 0 THEN
      RAISE EXCEPTION 'cursor-bundle-2 part 4 proof (c): an offset past the end is not an empty page of the same total (%)', v_answer;
    END IF;

    -- (d) the e-mail: shown and matched only for profiles:view
    v_answer := public.admin_screening_queue(p_search => v_tag);
    IF EXISTS (SELECT 1 FROM jsonb_array_elements(v_answer -> 'rows') r WHERE r -> 'seller_email' <> 'null'::jsonb) THEN
      RAISE EXCEPTION 'cursor-bundle-2 part 4 proof (d): a holder without profiles:view read the seller''s e-mail';
    END IF;
    EXECUTE format(v_read, v_tag, format(', p_seller => %L', v_tag || '-a@example.invalid')) INTO v_got;
    IF cardinality(v_got) <> 0 THEN
      RAISE EXCEPTION 'cursor-bundle-2 part 4 proof (d): an e-mail term matched for a holder without profiles:view';
    END IF;
    FOR v_call IN VALUES (format(', p_seller => %L', v_alias)), (format(', p_seller => %L', upper(v_tag) || ' TRAD')) LOOP
      EXECUTE format(v_read, v_tag, v_call) INTO v_got;
      IF cardinality(v_got) <> 3 THEN
        RAISE EXCEPTION 'cursor-bundle-2 part 4 proof (d): % matched % of the 3 ads without profiles:view', v_call, cardinality(v_got);
      END IF;
    END LOOP;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_revp::text, 'role', 'authenticated')::text, true);
    v_answer := public.admin_screening_queue(p_search => v_tag);
    IF EXISTS (SELECT 1 FROM jsonb_array_elements(v_answer -> 'rows') r WHERE r ->> 'seller_email' IS DISTINCT FROM v_tag || '-a@example.invalid') THEN
      RAISE EXCEPTION 'cursor-bundle-2 part 4 proof (d): a holder of profiles:view did not read the seller''s e-mail';
    END IF;
    EXECUTE format(v_read, v_tag, format(', p_seller => %L', upper(v_tag) || '-A@EXAMPLE')) INTO v_got;
    IF cardinality(v_got) <> 3 THEN
      RAISE EXCEPTION 'cursor-bundle-2 part 4 proof (d): an e-mail term did not match for a holder of profiles:view';
    END IF;

    -- (e) the gates, before the lists are read: a reader's refusal is raised as PGRST with the body PostgREST answers (F1-7c)
    FOR v_who, v_call, v_want IN VALUES
      (v_plain, format(v_read, v_tag, ', p_country => ARRAY[''XYZ'']'), 'permissionDenied'),
      (v_viewer, format(v_read, v_tag, ', p_country => ARRAY[''XYZ'']'), 'permissionDenied'),
      (NULL::uuid, format(v_read, v_tag, ', p_country => ARRAY[''XYZ'']'), 'notSignedIn'),
      (v_rev, format(v_read, v_tag, ', p_tier => ''nope'''), 'badValue:tier'),
      (v_rev, format(v_read, v_tag, ', p_country => ARRAY(SELECT ''XZ'' FROM generate_series(1, 21))'), 'badValue:country'),
      (v_rev, format(v_read, v_tag, ', p_country => ARRAY[''XYZ'']'), 'badValue:country'),
      (v_rev, format(v_read, v_tag, ', p_country => ARRAY[''XZ'', NULL]'), 'badValue:country')
    LOOP
      PERFORM set_config('request.jwt.claims',
        CASE WHEN v_who IS NULL THEN '{}' ELSE json_build_object('sub', v_who::text, 'role', 'authenticated')::text END, true);
      v_msg := NULL; v_st := NULL;
      PERFORM set_config('door.outer', '', true);
      BEGIN
        EXECUTE v_call INTO v_got;
      EXCEPTION WHEN OTHERS THEN
        GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_st = RETURNED_SQLSTATE;
      END;
      IF v_st IS DISTINCT FROM 'PGRST'
         OR v_msg::jsonb IS DISTINCT FROM jsonb_build_object('code', 'P0D01', 'message', v_want) THEN
        RAISE EXCEPTION 'cursor-bundle-2 part 4 proof (e): % answered % (%), not %', v_call, coalesce(v_msg, 'a read'), v_st, v_want;
      END IF;
    END LOOP;

    -- (f) the lists and the reach
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_rev::text, 'role', 'authenticated')::text, true);
    FOR v_call, v_exp IN VALUES
      (format(v_read, v_tag, ', p_country => ARRAY[''XZ'', ''XY'']'), ARRAY[v_s1, v_s2, v_s3]),
      (format(v_read, v_tag, ', p_country => ARRAY[''xy'', '' XZ '', ''XZ'']'), ARRAY[v_s1, v_s2, v_s3]),
      (format(v_read, v_tag, ', p_country => ARRAY[''XZ'']'), ARRAY[v_s1, v_s3]),
      (format(v_read, v_tag, ', p_country => ARRAY[''XY'']'), ARRAY[v_s2]),
      (format(v_read, v_tag, ', p_country => ARRAY[''XQ'']'), ARRAY[]::uuid[]),
      (format(v_read, v_tag, ', p_country => ARRAY[]::text[]'), ARRAY[v_s1, v_s2, v_s3]),
      (format(v_read, v_tag, ', p_country => NULL'), ARRAY[v_s1, v_s2, v_s3])
    LOOP
      EXECUTE v_call INTO v_got;
      IF (SELECT coalesce(array_agg(x ORDER BY x), ARRAY[]::uuid[]) FROM unnest(v_got) x)
           IS DISTINCT FROM (SELECT coalesce(array_agg(x ORDER BY x), ARRAY[]::uuid[]) FROM unnest(v_exp) x) THEN
        RAISE EXCEPTION 'cursor-bundle-2 part 4 proof (f): % read % (expected %)', v_call, v_got, v_exp;
      END IF;
    END LOOP;
    v_answer := public.admin_screening_queue(p_search => v_tag, p_country => ARRAY['XQ']);
    IF (v_answer ->> 'total')::integer <> 0 THEN
      RAISE EXCEPTION 'cursor-bundle-2 part 4 proof (f): a country naming no market counted ads (%)', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_c::text, 'role', 'authenticated')::text, true);
    FOR v_call, v_exp IN VALUES
      (format(v_read, v_tag, ''), ARRAY[v_s1, v_s3]),
      (format(v_read, v_tag, ', p_country => ARRAY[''XZ'', ''XY'']'), ARRAY[v_s1, v_s3]),
      (format(v_read, v_tag, ', p_country => ARRAY[''XY'']'), ARRAY[]::uuid[]),
      (format(v_read, v_s2::text, ''), ARRAY[]::uuid[])
    LOOP
      EXECUTE v_call INTO v_got;
      IF (SELECT coalesce(array_agg(x ORDER BY x), ARRAY[]::uuid[]) FROM unnest(v_got) x)
           IS DISTINCT FROM (SELECT coalesce(array_agg(x ORDER BY x), ARRAY[]::uuid[]) FROM unnest(v_exp) x) THEN
        RAISE EXCEPTION 'cursor-bundle-2 part 4 proof (f): the XZ holder''s % read % (expected %)', v_call, v_got, v_exp;
      END IF;
    END LOOP;
    v_answer := public.admin_screening_queue(p_search => v_tag, p_country => ARRAY['XZ', 'XY'], p_limit => 1);
    IF (v_answer ->> 'total')::integer <> 2 OR jsonb_array_length(v_answer -> 'rows') <> 1 THEN
      RAISE EXCEPTION 'cursor-bundle-2 part 4 proof (f): the XZ holder''s total counted ads beyond its reach (%)', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);

    -- (g) the plan: a country list is an index condition on locations_country_idx
    PERFORM set_config('enable_seqscan', 'off', true);
    v_plan := '';
    FOR v_line IN EXECUTE 'EXPLAIN (COSTS OFF) SELECT l.id FROM public.listings l JOIN public.locations loc ON loc.id = l.location_id WHERE l.status = ''screening'' AND loc.country_code = ANY ($1) AND loc.slug LIKE ''e2e-mig-%'''
                  USING public.door_filter_countries(ARRAY['XZ', 'XY'], 'country') LOOP
      v_plan := v_plan || v_line || E'\n';
    END LOOP;
    PERFORM set_config('enable_seqscan', 'on', true);
    IF position('locations_country_idx' IN v_plan) = 0 THEN
      RAISE EXCEPTION 'cursor-bundle-2 part 4 proof (g): a country list does not use locations_country_idx: %', v_plan;
    END IF;

    RAISE EXCEPTION 'cursor-bundle-2-part-4-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'cursor-bundle-2-part-4-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
  PERFORM set_config('door.outer', '', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261122040300') ON CONFLICT DO NOTHING;
