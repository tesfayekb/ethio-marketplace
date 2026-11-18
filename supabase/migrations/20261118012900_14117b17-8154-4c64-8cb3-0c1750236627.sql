-- e2e-areas: admin-listings, screening, admin-name-checks

-- Foundations 1, turn F1-6a, part 9 of 9 — THE STAFF'S SIX GLOBAL LISTING READERS ONTO DOOR_CONTEXT
-- (DEC-333; brief docs/governance/briefs/f1-doors-6a.md, ruling 1 §5; census docs/governance/reports/f1-doors-6a.census.md).
-- admin_listing_certifications, admin_listing_detail, admin_listing_reports, admin_name_check_list,
-- admin_name_check_summary and admin_open_report_counts are redeclared WHOLE from their last declarations (live md5s
-- checked), each changed only where named: ONE door_context('staff-reader', …, 'global') gate — caller,
-- deactivation, the permission held globally (their manifest lines' scope), no second factor, no dial — in place of
-- the bare has_permission checks, and door_refuse codes in place of the sentences; a reader takes no shell. Folds:
-- 'not signed in' / 'not authenticated' → notSignedIn; 'permission denied' → permissionDenied; 'listing not found' →
-- listingNotFound; 'admin_open_report_counts: badSize' → badSize. Every read after the gate is unchanged.

DO $pre$
DECLARE
  v_fn  text;
  v_md5 text;
  v_was text;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261118070700') THEN
    RAISE EXCEPTION 'F1-6a part 9: part 8 (mark 20261118070700) must be applied first';
  END IF;
  FOR v_fn, v_was IN VALUES
    ('public.admin_listing_certifications(uuid)', '0c2c2d7b46c5c7cd07ee69cade2c5139'),
    ('public.admin_listing_detail(uuid)', '3bf9681c1ea9b072c5974d28812bc1dc'),
    ('public.admin_listing_reports(uuid)', 'e03c16828dbaa3b5bf44b90e92f5d629'),
    ('public.admin_name_check_list(timestamp with time zone,uuid,integer)', 'b98d555a96d8b8928c4d03ec026737e9'),
    ('public.admin_name_check_summary()', 'e8f5a9307894d3d743618af43d5668af'),
    ('public.admin_open_report_counts(uuid[])', '529ec4553039d0320a8aeeeb18bbbb05')
  LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_fn::regprocedure;
    IF v_md5 IS DISTINCT FROM v_was THEN
      RAISE EXCEPTION 'F1-6a part 9: the live % is not its last declaration''s body (%)', v_fn, v_md5;
    END IF;
  END LOOP;
END $pre$;

-- ------------------------------------------------------------ 1. admin_listing_certifications (whole from 20261019115742 :234; listings:view)
CREATE OR REPLACE FUNCTION public.admin_listing_certifications(p_listing_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  PERFORM public.door_context('staff-reader', 'listings', 'view', NULL, NULL, 'global');
  RETURN coalesce((
    SELECT jsonb_agg(jsonb_build_object(
             'id', c.id,
             'action', c.action,
             'certified_at', c.certified_at,
             'language', c.language,
             'countries', to_jsonb(c.countries),
             'versions', coalesce((
               SELECT jsonb_agg(jsonb_build_object(
                        'version_id', v.id, 'kind', d.kind, 'country_code', d.country_code,
                        'version', v.version, 'label', v.label)
                      ORDER BY d.country_code NULLS FIRST, d.kind)
                 FROM public.legal_versions v
                 JOIN public.legal_documents d ON d.id = v.document_id
                WHERE v.id = ANY (c.version_ids)), '[]'::jsonb))
           ORDER BY c.certified_at DESC)
      FROM public.listing_certifications c
     WHERE c.listing_id = p_listing_id), '[]'::jsonb);
END;
$$;
REVOKE ALL ON FUNCTION public.admin_listing_certifications(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_listing_certifications(uuid) TO authenticated, service_role;

-- ------------------------------------------------------------ 2. admin_listing_detail (whole from 20261105080110 :133; listings:view, codes)
CREATE OR REPLACE FUNCTION public.admin_listing_detail(p_listing_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid     uuid := auth.uid();
  v_row     public.listings%ROWTYPE;
  v_email   boolean;
  v_names   boolean;
  v_pref    jsonb;
  v_listing jsonb;
  v_seller  jsonb;
  v_history jsonb;
  v_total   integer;
  -- The values the history shows; every other changed column is named only.
  v_keep    text[] := ARRAY['title','description','category_id','attributes','price_mode','price_amount',
                            'price_currency','price_period','price_bp','price_negotiable','price_unit',
                            'price_unit_text','status','tier','tier_until','tier_source','reach','reach_until',
                            'reach_source','location_id','expires_at','poster_expires_at',
                            'renewed_count','photos_soon','published_at','published_first_at'];
  v_noise   text[] := ARRAY['search_tsv','updated_at','draft_updated_at','draft_step'];
BEGIN
  PERFORM public.door_context('staff-reader', 'listings', 'view', NULL, NULL, 'global');

  SELECT * INTO v_row FROM public.listings l WHERE l.id = p_listing_id;
  IF NOT FOUND OR v_row.status = 'draft' THEN
    PERFORM public.door_refuse('listingNotFound');
  END IF;
  v_email := public.has_permission(v_uid, 'profiles', 'view');
  v_names := public.has_permission(v_uid, 'audit_logs', 'view');
  v_pref := coalesce(v_row.contact_pref, '{}'::jsonb);

  SELECT jsonb_build_object(
           'id', v_row.id, 'title', v_row.title, 'description', v_row.description,
           'status', v_row.status, 'tier', v_row.tier,
           -- P-2 (a) — the level and reach as they stand (DEC-328 / DEC-330; a null until is no end).
           'tier_until', v_row.tier_until, 'tier_source', v_row.tier_source,
           'reach', v_row.reach, 'reach_until', v_row.reach_until, 'reach_source', v_row.reach_source,
           'severe', coalesce(v_row.screening->>'severe', 'false') = 'true',
           'category_id', v_row.category_id, 'category_name_en', c.name_en, 'category_name_am', c.name_am,
           'location_id', v_row.location_id, 'place_name_en', loc.name_en, 'place_name_am', loc.name_am,
           'country_code', coalesce(loc.country_code, v_row.home_country_code),
           'price_mode', v_row.price_mode, 'price_amount', v_row.price_amount,
           'price_currency', v_row.price_currency, 'price_period', v_row.price_period,
           'price_bp', v_row.price_bp, 'price_negotiable', v_row.price_negotiable,
           'price_unit', v_row.price_unit, 'price_unit_text', v_row.price_unit_text,
           'attributes', v_row.attributes, 'photos_soon', v_row.photos_soon,
           'photo_count', (SELECT count(*)::integer FROM public.listing_photos ph WHERE ph.listing_id = v_row.id),
           'created_at', v_row.created_at, 'published_first_at', v_row.published_first_at,
           'published_at', v_row.published_at, 'expires_at', v_row.expires_at,
           'poster_expires_at', v_row.poster_expires_at, 'renewed_count', v_row.renewed_count,
           'updated_at', v_row.updated_at)
    INTO v_listing
    FROM (SELECT 1) one
    LEFT JOIN public.categories c ON c.id = v_row.category_id
    LEFT JOIN public.locations loc ON loc.id = v_row.location_id;

  SELECT jsonb_build_object(
           'id', v_row.seller_id,
           'alias', p.seller_alias,
           'business_name', CASE WHEN p.seller_type = 'business' THEN p.business_name END,
           'email', CASE WHEN v_email THEN u.email::text END,
           'member_since', p.created_at,
           'account_status', p.account_status)
    INTO v_seller
    FROM (SELECT 1) one
    LEFT JOIN public.profiles p ON p.user_id = v_row.seller_id
    LEFT JOIN auth.users u ON u.id = v_row.seller_id;

  SELECT count(*)::integer INTO v_total FROM public.listing_revisions r WHERE r.listing_id = v_row.id;

  SELECT coalesce(jsonb_agg(jsonb_build_object(
           'at', h.created_at,
           'kind', h.kind,
           'by', CASE WHEN h.actor IS NULL THEN 'system' WHEN h.actor = h.seller_id THEN 'seller' ELSE 'staff' END,
           'by_name', CASE WHEN v_names AND h.actor IS NOT NULL AND h.actor <> h.seller_id THEN p.display_name END,
           'fields', (SELECT coalesce(jsonb_agg(k.key ORDER BY k.key), '[]'::jsonb)
                        FROM (SELECT jsonb_object_keys(h.b) AS key
                              UNION
                              SELECT jsonb_object_keys(h.a)) k
                       WHERE k.key <> ALL (v_noise)),
           'before', (SELECT coalesce(jsonb_object_agg(e.key, e.value), '{}'::jsonb)
                        FROM jsonb_each(h.b) e WHERE e.key = ANY (v_keep))
                     || CASE WHEN jsonb_typeof(h.b->'photos_removed') = 'array'
                             THEN jsonb_build_object('photos_removed', jsonb_array_length(h.b->'photos_removed'))
                             ELSE '{}'::jsonb END,
           'after',  (SELECT coalesce(jsonb_object_agg(e.key, e.value), '{}'::jsonb)
                        FROM jsonb_each(h.a) e WHERE e.key = ANY (v_keep))
                     || CASE WHEN jsonb_typeof(h.a->'photos_removed') = 'array'
                             THEN jsonb_build_object('photos_removed', jsonb_array_length(h.a->'photos_removed'))
                             ELSE '{}'::jsonb END,
           'reason', n.reason,
           'note', n.note)
         ORDER BY h.created_at DESC, h.id DESC), '[]'::jsonb)
    INTO v_history
    FROM (SELECT r.id, r.kind, r.actor, r.seller_id, r.created_at, r.listing_id,
                 CASE WHEN jsonb_typeof(r.before) = 'object' THEN r.before ELSE '{}'::jsonb END AS b,
                 CASE WHEN jsonb_typeof(r.after) = 'object' THEN r.after ELSE '{}'::jsonb END AS a
            FROM public.listing_revisions r
           WHERE r.listing_id = v_row.id
           ORDER BY r.created_at DESC, r.id DESC
           LIMIT 200) h
    LEFT JOIN public.profiles p ON p.user_id = h.actor
    LEFT JOIN LATERAL (
      SELECT sn.reason, sn.note
        FROM public.seller_notices sn
       WHERE sn.listing_id = h.listing_id AND sn.created_at = h.created_at
       ORDER BY sn.id
       LIMIT 1) n ON true;

  RETURN jsonb_build_object(
    'listing', v_listing,
    'seller', v_seller,
    'channels', jsonb_build_object(
      'phone',    coalesce((v_pref->'phone'->>'show')::boolean, false),
      'phone2',   coalesce((v_pref->'phone2'->>'show')::boolean, false),
      'telegram', coalesce((v_pref->'telegram'->>'show')::boolean, false),
      'whatsapp', coalesce((v_pref->'whatsapp'->>'show')::boolean, false)),
    'history', v_history,
    'history_total', v_total);
END $$;
REVOKE ALL ON FUNCTION public.admin_listing_detail(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_listing_detail(uuid) TO authenticated, service_role;

-- ------------------------------------------------------------ 3. admin_listing_reports (whole from 20261017115807 :113; listings:review)
CREATE OR REPLACE FUNCTION public.admin_listing_reports(p_listing_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  PERFORM public.door_context('staff-reader', 'listings', 'review', NULL, NULL, 'global');
  RETURN coalesce((SELECT jsonb_agg(jsonb_build_object(
                            'id', r.id, 'reason', r.reason, 'note', r.note, 'status', r.status,
                            'createdAt', r.created_at, 'closedAt', r.closed_at, 'outcome', r.outcome)
                          ORDER BY r.status DESC, r.created_at DESC)
                     FROM public.listing_reports r WHERE r.listing_id = p_listing_id), '[]'::jsonb);
END $$;
REVOKE ALL ON FUNCTION public.admin_listing_reports(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_listing_reports(uuid) TO authenticated, service_role;

-- ------------------------------------------------------------ 4. admin_name_check_list (whole from 20261029104632 :60; listings:view)
CREATE OR REPLACE FUNCTION public.admin_name_check_list(p_after_since timestamp with time zone DEFAULT NULL::timestamp with time zone, p_after_profile uuid DEFAULT NULL::uuid, p_limit integer DEFAULT 50)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  PERFORM public.door_context('staff-reader', 'listings', 'view', NULL, NULL, 'global');
  RETURN public.name_check_queue_page(p_after_since, p_after_profile, p_limit,
                                      public.has_permission(auth.uid(), 'profiles', 'view'), NULL);
END $function$;
REVOKE ALL ON FUNCTION public.admin_name_check_list(timestamptz, uuid, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_name_check_list(timestamptz, uuid, integer) TO authenticated, service_role;

-- ------------------------------------------------------------ 5. admin_name_check_summary (whole from 20261029063150 :296; listings:view)
CREATE OR REPLACE FUNCTION public.admin_name_check_summary()
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  PERFORM public.door_context('staff-reader', 'listings', 'view', NULL, NULL, 'global');
  RETURN (SELECT jsonb_build_object('unchecked', count(*), 'oldest_since', min(since))
            FROM public.name_checks WHERE state = 'unchecked');
END $function$;
REVOKE ALL ON FUNCTION public.admin_name_check_summary() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_name_check_summary() TO authenticated, service_role;

-- ------------------------------------------------------------ 6. admin_open_report_counts (whole from 20261017115807 :134; listings:review, codes)
CREATE OR REPLACE FUNCTION public.admin_open_report_counts(p_listing_ids uuid[])
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  PERFORM public.door_context('staff-reader', 'listings', 'review', NULL, NULL, 'global');
  IF p_listing_ids IS NULL OR cardinality(p_listing_ids) > 100 THEN
    PERFORM public.door_refuse('badSize');
  END IF;
  RETURN coalesce((SELECT jsonb_object_agg(r.listing_id::text, r.n)
                     FROM (SELECT x.listing_id, count(*) AS n
                              FROM public.listing_reports x
                            WHERE x.listing_id = ANY (p_listing_ids) AND x.status = 'open'
                            GROUP BY x.listing_id) r), '{}'::jsonb);
END $$;
REVOKE ALL ON FUNCTION public.admin_open_report_counts(uuid[]) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_open_report_counts(uuid[]) TO authenticated, service_role;

-- ------------------------------------------------------------ 7. PROOFS
-- (a) catalog facts of the six: STABLE SECURITY DEFINER, RETURNS jsonb, EXECUTE for authenticated and the service
--     role, never anon or PUBLIC; each body this file's (md5).
-- (b) the gates of each: no caller notSignedIn; a person without the permission permissionDenied; a deactivated holder
--     accountDeactivated; a country holder permissionDenied:scope (each is global) — raised P0D01, exact. A global
--     holder without a second factor reads every one (no step-up).
-- (c) the codes with every earlier check cleared: listingNotFound (the detail's no ad), badSize (none; 101).
-- (d) no reader spends a dial or meters a refusal (no shell).
DO $proof$
DECLARE
  v_hex     text := replace(gen_random_uuid()::text, '-', '');
  v_tag     text;
  -- 'XZ': a scratch code no market holds, as earlier proofs' (K4: a recorded proof exception)
  v_code    character(2) := 'XZ';
  v_lang    text := public.language_code('base');
  v_r0      text;
  v_a       uuid := gen_random_uuid();
  v_s       uuid := gen_random_uuid();
  v_c       uuid := gen_random_uuid();
  v_plain   uuid := gen_random_uuid();
  v_deact   uuid := gen_random_uuid();
  v_role    uuid;
  v_anc     uuid;
  v_region  uuid;
  v_city    uuid;
  v_cat     uuid;
  v_live    uuid := gen_random_uuid();
  v_ref0    bigint;
  v_msg     text;
  v_call    text;
  v_want    text;
  v_who     uuid;
  v_fn      regprocedure;
  v_calls   text[];
  v_doors   text[] := ARRAY['admin_listing_certifications', 'admin_listing_detail', 'admin_listing_reports',
                            'admin_name_check_list', 'admin_name_check_summary', 'admin_open_report_counts'];
BEGIN
  FOR v_fn, v_want IN VALUES
    ('public.admin_listing_certifications(uuid)'::regprocedure, 'ce25e449941e3954ac440eceb3643e2a'),
    ('public.admin_listing_detail(uuid)'::regprocedure, 'bc064c03d395a6b26ea1953f4de0f562'),
    ('public.admin_listing_reports(uuid)'::regprocedure, '2364e8acbabebf70ada6ce6c680c8446'),
    ('public.admin_name_check_list(timestamp with time zone,uuid,integer)'::regprocedure, 'ab24f20bf4a8e06801abb86fe6aa2d29'),
    ('public.admin_name_check_summary()'::regprocedure, 'adae2b5cf2860813cef052e8d9ac76a0'),
    ('public.admin_open_report_counts(uuid[])'::regprocedure, 'e136f99f7e2e2bba8f0443eff7039560')
  LOOP
    IF (SELECT NOT prosecdef OR provolatile <> 's' OR proconfig::text <> '{search_path=public}' OR prorettype <> 'jsonb'::regtype
          FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-6a part 9 proof (a): %''s header, return type or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_want THEN
      RAISE EXCEPTION 'F1-6a part 9 proof (a): %''s body differs from this file', v_fn;
    END IF;
  END LOOP;

  v_tag := 'e2e-mig-f16a9-' || substr(v_hex, 1, 10);
  v_r0 := 'e2e_mig_r0_' || substr(v_hex, 11, 8);
  BEGIN
    PERFORM set_config('request.jwt.claims', '{}', true);
    IF EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
      RAISE EXCEPTION 'F1-6a part 9 proof: scratch code % already exists', v_code;
    END IF;
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_code, v_tag, true);
    SELECT a.id INTO v_anc FROM public.locations a WHERE a.country_code = v_code AND a.level = 'country' AND a.name_en = v_tag
     AND a.name_en LIKE 'e2e-mig-%';
    IF v_anc IS NULL THEN RAISE EXCEPTION 'F1-6a part 9 proof: the scratch market has no anchor'; END IF;
    UPDATE public.locations SET is_active = true WHERE id = v_anc AND name_en = v_tag AND name_en LIKE 'e2e-mig-%';
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id)
    VALUES ('region', v_code, v_tag || ' region', v_tag || '-r', true, v_anc) RETURNING id INTO v_region;
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id, center_lat, center_lng)
    VALUES ('city', v_code, v_tag || ' city', v_tag || '-c', true, v_region, 9.03, 38.74) RETURNING id INTO v_city;
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
      RAISE EXCEPTION 'F1-6a part 9 proof: listings:view or listings:review is not declared';
    END IF;
    INSERT INTO public.user_roles (user_id, role_id, scope_type) VALUES (v_s, v_role, 'global'), (v_deact, v_role, 'global');
    INSERT INTO public.user_roles (user_id, role_id, scope_type, scope_country) VALUES (v_c, v_role, 'country', v_code);
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES (v_tag || ' leaf', v_tag, true, true, true, 9999) RETURNING id INTO v_cat;
    INSERT INTO public.listing_packages (key, kind, name_en, days, enabled, self_serve, extends_lifetime, sort)
    VALUES (v_r0, 'reach', v_tag || ' reach', 30, true, true, false, 9001);
    INSERT INTO public.market_settings (country_code, free_regular_ads, included_reach, paid_levels)
    VALUES (v_code, 20, v_r0, false);
    INSERT INTO public.listings (id, seller_id, category_id, location_id, title, description, home_country_code, price_mode,
                                 status, published_at, published_first_at, expires_at)
    VALUES (v_live, v_a, v_cat, v_city, v_tag || ' live ad', 'A scratch ad for the readers proof.', v_code, 'free', 'active',
            now(), now(), now() + interval '10 days');
    SELECT coalesce(sum(count), 0) INTO v_ref0 FROM public.door_refusals WHERE day = current_date AND door = ANY (v_doors);

    v_calls := ARRAY[
      format('SELECT public.admin_listing_certifications(%L)::text', v_live),
      format('SELECT public.admin_listing_detail(%L)::text', v_live),
      format('SELECT public.admin_listing_reports(%L)::text', v_live),
      'SELECT public.admin_name_check_list(NULL, NULL, 50)::text',
      'SELECT public.admin_name_check_summary()::text',
      format('SELECT public.admin_open_report_counts(ARRAY[%L]::uuid[])::text', v_live)];

    -- (b) the gates of each reader; the global holder without a second factor reads each.
    FOREACH v_call IN ARRAY v_calls LOOP
      FOR v_who, v_want IN VALUES (NULL::uuid, 'notSignedIn'), (v_plain, 'permissionDenied'), (v_deact, 'accountDeactivated'),
                                  (v_c, 'permissionDenied:scope'), (v_s, NULL::text) LOOP
        PERFORM set_config('request.jwt.claims',
          CASE WHEN v_who IS NULL THEN '{}' ELSE json_build_object('sub', v_who::text, 'role', 'authenticated')::text END, true);
        BEGIN
          EXECUTE v_call INTO v_msg;
          v_msg := NULL;
        EXCEPTION WHEN SQLSTATE 'P0D01' THEN
          GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
        END;
        IF v_msg IS DISTINCT FROM v_want THEN
          RAISE EXCEPTION 'F1-6a part 9 proof (b): % for % answered % (expected %)', v_call, coalesce(v_who::text, 'no caller'),
            coalesce(v_msg, 'a read'), coalesce(v_want, 'a read');
        END IF;
      END LOOP;
    END LOOP;

    -- (c) the codes: the global holder passes every gate.
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_s::text, 'role', 'authenticated')::text, true);
    FOR v_call, v_want IN VALUES
      (format('SELECT public.admin_listing_detail(%L)::text', gen_random_uuid()), 'listingNotFound'),
      ('SELECT public.admin_open_report_counts(NULL)::text', 'badSize'),
      ('SELECT public.admin_open_report_counts(array_fill(gen_random_uuid(), ARRAY[101]))::text', 'badSize')
    LOOP
      BEGIN
        EXECUTE v_call INTO v_msg;
        v_msg := 'a read';
      EXCEPTION WHEN SQLSTATE 'P0D01' THEN
        GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
      END;
      IF v_msg IS DISTINCT FROM v_want THEN
        RAISE EXCEPTION 'F1-6a part 9 proof (c): % answered % (expected %)', v_call, v_msg, v_want;
      END IF;
    END LOOP;
    PERFORM set_config('request.jwt.claims', '{}', true);

    -- (d) nothing spent, nothing metered.
    IF EXISTS (SELECT 1 FROM public.rate_limits WHERE key IN (v_a::text, v_s::text, v_c::text, v_plain::text, v_deact::text)) THEN
      RAISE EXCEPTION 'F1-6a part 9 proof (d): a reader spent a dial';
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date AND door = ANY (v_doors))
         IS DISTINCT FROM v_ref0 THEN
      RAISE EXCEPTION 'F1-6a part 9 proof (d): a reader metered a refusal';
    END IF;

    RAISE EXCEPTION 'f1-6a-part-9-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f1-6a-part-9-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261118070800') ON CONFLICT DO NOTHING;
