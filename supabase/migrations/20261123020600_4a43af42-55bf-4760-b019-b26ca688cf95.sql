-- e2e-areas: admin-screening, admin-listings

-- Cursor bundle 4, part 2, file 1 — THE STAFF'S FIVE PHOTO READS BEHIND CHECKED DOORS (INC-1242; DEC-430; brief
-- docs/governance/briefs/cursor-bundle-4.md, ruling docs/governance/briefs/cursor-bundle-4-ruling-1.md decision 14).
-- The staff screens read five things straight from the tables, through the tables' own row rules (a role rule on a table
-- the browser may read): a listing's photos with the screen's warning and review, the open photo changes, the open photo
-- reviews, the ads that hold a warned photo, and the rows the photo-links route signs for staff. Each becomes a staff
-- reader on the gate — `door_context('staff-reader', 'listings', <action>, NULL, NULL, 'filter')`: caller, deactivation,
-- the permission with its countries, no second factor (a read changes nothing), no dial — and answers, for the rows in the
-- caller's reach (the ad's home country: a country grant reads its countries' ads, a global grant all), exactly what its
-- reader asked: the same columns, the same filter, the same order and limit. A reader takes no shell: its refusal is
-- raised as PGRST with the body the route reads (F1-7c). Nothing is dropped and nothing is revoked here: the readers move
-- in the next step, and the table rules and grants go in the one file that follows them (DEC-430's order: the doors, the
-- readers, the drop).
--   1. admin_listing_photos(uuid)       listings:view   a listing's photos (id, display_order, paths, storage_path,
--                                       unscreened, warning {codes}, review {label, code, evidence, decided_at}), in
--                                       display order. A missing ad and an ad out of reach are listingNotFound. The
--                                       review of a photo is read, as the table's rule read it, by a holder of
--                                       listings:review only (a holder of listings:view alone reads it as null).
--   2. admin_photo_changes()            listings:review the open photo changes (id, kind, photo_id, replaced_photo_id,
--                                       codes, created_at, listing {id, title, status}), oldest first, id the tie,
--                                       at most 100 (PHOTO_CHANGES_LIMIT). A row out of reach is absent.
--   3. admin_photo_reviews()            listings:review the open photo reviews (photo_id, label, code, evidence,
--                                       created_at, listing {id, title, status}) on ads a buyer may come to see, oldest
--                                       first, photo_id the tie, at most 100 (PHOTO_REVIEWS_LIMIT). The statuses that hide
--                                       an ad from the list (draft, removed, rejected) are written ONCE, in this body.
--   4. admin_warned_listings(uuid[])    listings:view   the warnings (listing_id, codes) of the given ads in reach;
--                                       badSize above 100 ids, the largest page any staff list draws (PAGE_SIZE_OPTIONS,
--                                       SCREENING_PAGE_SIZES).
--   5. admin_photo_link_rows(uuid[])    listings:view   the rows the links route signs (id, paths, exif_stripped) of the
--                                       given photos on ads in reach; badSize above 30 ids (MAX_LINK_PHOTOS).
-- No new index: the two queues' open indexes (listing_photo_changes_open_idx, listing_photo_reviews_open_idx) carry the
-- filter and the order, the warnings have listing_photo_warnings_listing_idx, and the photo lookups are by key.

DO $pre$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261122040400') THEN
    RAISE EXCEPTION 'cursor-bundle-4 part 2: cursor-bundle-2 part 5 (mark 20261122040400) must be applied first';
  END IF;
END $pre$;

-- ------------------------------------------------------------ 1. admin_listing_photos
CREATE OR REPLACE FUNCTION public.admin_listing_photos(p_listing_id uuid)
RETURNS TABLE (
  id uuid, display_order integer, paths jsonb, storage_path text, unscreened boolean,
  warning jsonb, review jsonb)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_ctx    public.door_ctx;
  v_home   character(2);
  v_review boolean;
BEGIN
  v_ctx := public.door_context('staff-reader', 'listings', 'view', NULL, NULL, 'filter');
  SELECT l.home_country_code INTO v_home FROM public.listings l WHERE l.id = p_listing_id;
  IF NOT FOUND OR NOT (v_ctx.countries IS NULL OR v_home = ANY (v_ctx.countries)) THEN
    PERFORM public.door_refuse('listingNotFound');
  END IF;
  -- The review row was read by listings:review only (the table's rule); a holder of listings:view alone reads null.
  v_review := v_ctx.role = 'service_role' OR public.has_permission(v_ctx.uid, 'listings', 'review');
  RETURN QUERY
  SELECT ph.id, ph.display_order, ph.paths, ph.storage_path, ph.unscreened,
         (SELECT jsonb_build_object('codes', to_jsonb(w.codes))
            FROM public.listing_photo_warnings w WHERE w.photo_id = ph.id),
         CASE WHEN v_review THEN
           (SELECT jsonb_build_object('label', r.label, 'code', r.code, 'evidence', r.evidence,
                                      'decided_at', r.decided_at)
              FROM public.listing_photo_reviews r WHERE r.photo_id = ph.id)
         END
    FROM public.listing_photos ph
   WHERE ph.listing_id = p_listing_id
   ORDER BY ph.display_order ASC;
END $$;
COMMENT ON FUNCTION public.admin_listing_photos(uuid) IS
  'cursor-bundle-4 (INC-1242): a staff reader on door_context (listings:view, filter) — one ad''s photos with the screen''s warning and, for a holder of listings:review, the review; an ad missing or out of reach is listingNotFound.';

-- ------------------------------------------------------------ 2. admin_photo_changes
CREATE OR REPLACE FUNCTION public.admin_photo_changes()
RETURNS TABLE (
  id uuid, kind text, photo_id uuid, replaced_photo_id uuid, codes text[], created_at timestamptz,
  listing jsonb)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_ctx public.door_ctx;
BEGIN
  v_ctx := public.door_context('staff-reader', 'listings', 'review', NULL, NULL, 'filter');
  RETURN QUERY
  SELECT c.id, c.kind, c.photo_id, c.replaced_photo_id, c.codes, c.created_at,
         jsonb_build_object('id', l.id, 'title', l.title, 'status', l.status)
    FROM public.listing_photo_changes c
    JOIN public.listings l ON l.id = c.listing_id
   WHERE c.reviewed_at IS NULL
     AND (v_ctx.countries IS NULL OR l.home_country_code = ANY (v_ctx.countries))
   ORDER BY c.created_at ASC, c.id ASC
   LIMIT 100;
END $$;
COMMENT ON FUNCTION public.admin_photo_changes() IS
  'cursor-bundle-4 (INC-1242): a staff reader on door_context (listings:review, filter) — the open photo changes on ads in the caller''s reach, oldest first, at most 100.';

-- ------------------------------------------------------------ 3. admin_photo_reviews
CREATE OR REPLACE FUNCTION public.admin_photo_reviews()
RETURNS TABLE (
  photo_id uuid, label text, code text, evidence text, created_at timestamptz, listing jsonb)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_ctx    public.door_ctx;
  -- The ads whose photos wait here are those a buyer may come to see: never a draft, a removed ad or a refused one.
  v_hidden CONSTANT text[] := ARRAY['draft', 'removed', 'rejected'];
BEGIN
  v_ctx := public.door_context('staff-reader', 'listings', 'review', NULL, NULL, 'filter');
  RETURN QUERY
  SELECT r.photo_id, r.label, r.code, r.evidence, r.created_at,
         jsonb_build_object('id', l.id, 'title', l.title, 'status', l.status)
    FROM public.listing_photo_reviews r
    JOIN public.listings l ON l.id = r.listing_id
   WHERE r.decided_at IS NULL
     AND NOT (l.status = ANY (v_hidden))
     AND (v_ctx.countries IS NULL OR l.home_country_code = ANY (v_ctx.countries))
   ORDER BY r.created_at ASC, r.photo_id ASC
   LIMIT 100;
END $$;
COMMENT ON FUNCTION public.admin_photo_reviews() IS
  'cursor-bundle-4 (INC-1242): a staff reader on door_context (listings:review, filter) — the open photo reviews on ads a buyer may see (not draft, removed or rejected) in the caller''s reach, oldest first, at most 100.';

-- ------------------------------------------------------------ 4. admin_warned_listings
CREATE OR REPLACE FUNCTION public.admin_warned_listings(p_listing_ids uuid[])
RETURNS TABLE (listing_id uuid, codes text[])
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_ctx public.door_ctx;
BEGIN
  v_ctx := public.door_context('staff-reader', 'listings', 'view', NULL, NULL, 'filter');
  IF cardinality(p_listing_ids) > 100 THEN
    PERFORM public.door_refuse('badSize');
  END IF;
  RETURN QUERY
  SELECT w.listing_id, w.codes
    FROM public.listing_photo_warnings w
    JOIN public.listings l ON l.id = w.listing_id
   WHERE w.listing_id = ANY (p_listing_ids)
     AND (v_ctx.countries IS NULL OR l.home_country_code = ANY (v_ctx.countries));
END $$;
COMMENT ON FUNCTION public.admin_warned_listings(uuid[]) IS
  'cursor-bundle-4 (INC-1242): a staff reader on door_context (listings:view, filter) — the screen''s warnings of the given ads (at most 100, else badSize) in the caller''s reach.';

-- ------------------------------------------------------------ 5. admin_photo_link_rows
CREATE OR REPLACE FUNCTION public.admin_photo_link_rows(p_photo_ids uuid[])
RETURNS TABLE (id uuid, paths jsonb, exif_stripped boolean)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_ctx public.door_ctx;
BEGIN
  v_ctx := public.door_context('staff-reader', 'listings', 'view', NULL, NULL, 'filter');
  IF cardinality(p_photo_ids) > 30 THEN
    PERFORM public.door_refuse('badSize');
  END IF;
  RETURN QUERY
  SELECT ph.id, ph.paths, ph.exif_stripped
    FROM public.listing_photos ph
    JOIN public.listings l ON l.id = ph.listing_id
   WHERE ph.id = ANY (p_photo_ids)
     AND (v_ctx.countries IS NULL OR l.home_country_code = ANY (v_ctx.countries));
END $$;
COMMENT ON FUNCTION public.admin_photo_link_rows(uuid[]) IS
  'cursor-bundle-4 (INC-1242): a staff reader on door_context (listings:view, filter) — the rows the photo-links route signs for staff (id, paths, exif_stripped) of the given photos (at most 30, else badSize) on ads in the caller''s reach.';

-- ------------------------------------------------------------ 6. CLOSERS: born closed, the browser's grant is the reader's only
REVOKE ALL ON FUNCTION public.admin_listing_photos(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_listing_photos(uuid) TO authenticated, service_role;
REVOKE ALL ON FUNCTION public.admin_photo_changes() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_photo_changes() TO authenticated, service_role;
REVOKE ALL ON FUNCTION public.admin_photo_reviews() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_photo_reviews() TO authenticated, service_role;
REVOKE ALL ON FUNCTION public.admin_warned_listings(uuid[]) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_warned_listings(uuid[]) TO authenticated, service_role;
REVOKE ALL ON FUNCTION public.admin_photo_link_rows(uuid[]) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_photo_link_rows(uuid[]) TO authenticated, service_role;

-- ------------------------------------------------------------ 7. PROOFS
-- (a) catalog facts of the five: STABLE SECURITY DEFINER, search_path public, a record return, EXECUTE for authenticated
--     and the service role, never anon or PUBLIC; each body this file's (md5).
-- (b) the gates, raised as PGRST with the body the route reads: no caller notSignedIn, a person without the permission
--     permissionDenied, a deactivated holder accountDeactivated; a holder of listings:view alone is refused the two queues
--     and reads the other three.
-- (c) the codes with every earlier check cleared: listingNotFound (no ad; an ad out of reach), badSize above each ceiling
--     and none at it.
-- (d) the answers and the reach, judged on the scratch rows only (the scratch rows sort first): a global holder reads every
--     scratch row its rule gives, a country holder only its country's, the service role as the global holder; the queues'
--     filters (open only, the hidden statuses out, a reviewed change out), the order, the review that only listings:review
--     reads.
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
  v_vo      uuid := gen_random_uuid();
  v_plain   uuid := gen_random_uuid();
  v_deact   uuid := gen_random_uuid();
  v_role    uuid;
  v_role_v  uuid;
  v_anc     uuid;
  v_anc2    uuid;
  v_region  uuid;
  v_city    uuid;
  v_city2   uuid;
  v_cat     uuid;
  v_l1      uuid := gen_random_uuid();
  v_l2      uuid := gen_random_uuid();
  v_l3      uuid := gen_random_uuid();
  v_p1      uuid := gen_random_uuid();
  v_p2      uuid := gen_random_uuid();
  v_p3      uuid := gen_random_uuid();
  v_p4      uuid := gen_random_uuid();
  v_c1      uuid := gen_random_uuid();
  v_c2      uuid := gen_random_uuid();
  v_c3      uuid := gen_random_uuid();
  v_got     uuid[];
  v_want_a  uuid[];
  v_count   integer;
  v_ref0    bigint;
  v_msg     text;
  v_st      text;
  v_call    text;
  v_want    text;
  v_who     uuid;
  v_fn      regprocedure;
  v_md5     text;
  v_text    text;
BEGIN
  FOR v_fn, v_want IN VALUES
    ('public.admin_listing_photos(uuid)'::regprocedure, '7ad565d3adf63eee60350ebab868ffc7'),
    ('public.admin_photo_changes()'::regprocedure, 'f5f2535c58136a339bacb547f33d81ef'),
    ('public.admin_photo_reviews()'::regprocedure, 'a9411ee130eecdb50e8a532a6b32fff1'),
    ('public.admin_warned_listings(uuid[])'::regprocedure, '6495fe5ed5b855f1301552f33e31393a'),
    ('public.admin_photo_link_rows(uuid[])'::regprocedure, '24d9742263a5bf653094c3c1071c4076')
  LOOP
    IF (SELECT NOT prosecdef OR provolatile <> 's' OR proconfig::text <> '{search_path=public}'
               OR prorettype <> 'record'::regtype
          FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'cursor-bundle-4 part 2 proof (a): %''s header, return type or grants differ', v_fn;
    END IF;
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_fn;
    IF v_md5 IS DISTINCT FROM v_want THEN
      RAISE EXCEPTION 'cursor-bundle-4 part 2 proof (a): %''s body differs from this file (%)', v_fn, v_md5;
    END IF;
  END LOOP;

  v_tag := 'e2e-mig-cb4p2-' || substr(v_hex, 1, 10);
  v_r0 := 'e2e_mig_r0_' || substr(v_hex, 11, 8);
  BEGIN
    PERFORM set_config('request.jwt.claims', '{}', true);
    IF EXISTS (SELECT 1 FROM public.countries WHERE code IN (v_code, v_code2)) THEN
      RAISE EXCEPTION 'cursor-bundle-4 part 2 proof: a scratch code (% or %) already exists', v_code, v_code2;
    END IF;
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_code, v_tag, true), (v_code2, v_tag || '-2', true);
    SELECT a.id INTO v_anc FROM public.locations a WHERE a.country_code = v_code AND a.level = 'country' AND a.name_en = v_tag
     AND a.name_en LIKE 'e2e-mig-%';
    SELECT a.id INTO v_anc2 FROM public.locations a WHERE a.country_code = v_code2 AND a.level = 'country'
     AND a.name_en = v_tag || '-2' AND a.name_en LIKE 'e2e-mig-%';
    IF v_anc IS NULL OR v_anc2 IS NULL THEN RAISE EXCEPTION 'cursor-bundle-4 part 2 proof: a scratch market has no anchor'; END IF;
    UPDATE public.locations SET is_active = true WHERE id IN (v_anc, v_anc2) AND name_en LIKE 'e2e-mig-cb4p2-%';
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
      (v_vo, v_tag || '-v@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_plain, v_tag || '-p@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_deact, v_tag || '-d@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO public.legal_acceptances (user_id, version_id, language, method)
    SELECT u, v.id, v_lang, 'e2e-mig' FROM public.legal_versions v, unnest(ARRAY[v_a, v_s, v_c, v_vo, v_plain, v_deact]) u
     WHERE v.status = 'published' AND v.effective_at <= now();
    UPDATE public.profiles SET account_status = 'deactivated'
     WHERE user_id = v_deact
       AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = v_deact AND u.email LIKE 'e2e-mig-%');
    -- One role with listings:view and listings:review: global for the holder and the deactivated one, XZ only for the
    -- country holder; one role with listings:view alone for the view-only holder.
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-both', v_tag) RETURNING id INTO v_role;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'listings' AND p.action IN ('view', 'review');
    IF (SELECT count(*) FROM public.role_permissions WHERE role_id = v_role) <> 2 THEN
      RAISE EXCEPTION 'cursor-bundle-4 part 2 proof: listings:view or listings:review is not declared';
    END IF;
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-view', v_tag) RETURNING id INTO v_role_v;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role_v, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'listings' AND p.action = 'view';
    INSERT INTO public.user_roles (user_id, role_id, scope_type)
    VALUES (v_s, v_role, 'global'), (v_deact, v_role, 'global'), (v_vo, v_role_v, 'global');
    INSERT INTO public.user_roles (user_id, role_id, scope_type, scope_country) VALUES (v_c, v_role, 'country', v_code);
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES (v_tag || ' leaf', v_tag, true, true, true, 9999) RETURNING id INTO v_cat;
    INSERT INTO public.listing_packages (key, kind, name_en, days, enabled, self_serve, extends_lifetime, sort)
    VALUES (v_r0, 'reach', v_tag || ' reach', 30, true, true, false, 9001);
    INSERT INTO public.market_settings (country_code, free_regular_ads, included_reach, paid_levels)
    VALUES (v_code, 20, v_r0, false), (v_code2, 20, v_r0, false);
    -- l1: a live ad of XZ; l2: a live ad of XY; l3: a refused ad of XZ.
    INSERT INTO public.listings (id, seller_id, category_id, location_id, title, description, home_country_code, price_mode,
                                 status, published_at, published_first_at, expires_at)
    VALUES (v_l1, v_a, v_cat, v_city, v_tag || ' one', 'A scratch ad for the photo readers proof.', v_code, 'free', 'active',
            now(), now(), now() + interval '10 days'),
           (v_l2, v_a, v_cat, v_city2, v_tag || ' two', 'A scratch ad for the photo readers proof.', v_code2, 'free', 'active',
            now(), now(), now() + interval '10 days'),
           (v_l3, v_a, v_cat, v_city, v_tag || ' three', 'A scratch ad for the photo readers proof.', v_code, 'free', 'rejected',
            NULL, NULL, NULL);
    -- p1, p2 on l1 (orders 0 and 1), p3 on l2, p4 on l3.
    INSERT INTO public.listing_photos (id, listing_id, storage_path, paths, display_order, exif_stripped, unscreened)
    VALUES (v_p1, v_l1, v_tag || '/p1', '{"original": "a"}'::jsonb, 0, true, false),
           (v_p2, v_l1, v_tag || '/p2', '{}'::jsonb, 1, false, true),
           (v_p3, v_l2, v_tag || '/p3', '{}'::jsonb, 0, true, false),
           (v_p4, v_l3, v_tag || '/p4', '{}'::jsonb, 0, true, false);
    -- The warning of p1 and p3; the open review of p1 (unsure), p3 (held) and p4 (on the refused ad), the decided one of p2.
    INSERT INTO public.listing_photo_warnings (photo_id, listing_id, codes)
    VALUES (v_p1, v_l1, ARRAY['not_relevant']), (v_p3, v_l2, ARRAY['not_relevant', 'other']);
    INSERT INTO public.listing_photo_reviews (photo_id, listing_id, label, code, evidence, created_at)
    VALUES (v_p1, v_l1, 'unsure', NULL, 'scratch evidence', timestamptz '1970-01-01 00:00:01+00'),
           (v_p3, v_l2, 'held', NULL, NULL, timestamptz '1970-01-01 00:00:02+00'),
           (v_p4, v_l3, 'held', NULL, NULL, timestamptz '1970-01-01 00:00:03+00');
    INSERT INTO public.listing_photo_reviews (photo_id, listing_id, label, code, evidence, created_at, decided_at, decision)
    VALUES (v_p2, v_l1, 'unsure', NULL, NULL, timestamptz '1970-01-01 00:00:04+00', now(), 'allowed');
    -- c1 (l1) and c2 (l2) open; c3 (l1) reviewed. They sort first: before any real row.
    INSERT INTO public.listing_photo_changes (id, listing_id, kind, photo_id, codes, created_at, reviewed_at)
    VALUES (v_c1, v_l1, 'added', v_p1, ARRAY['not_relevant'], timestamptz '1970-01-01 00:00:01+00', NULL),
           (v_c2, v_l2, 'added', v_p3, '{}', timestamptz '1970-01-01 00:00:02+00', NULL),
           (v_c3, v_l1, 'removed', v_p2, '{}', timestamptz '1970-01-01 00:00:03+00', now());
    SELECT coalesce(sum(count), 0) INTO v_ref0 FROM public.door_refusals WHERE day = current_date
       AND door IN ('admin_listing_photos', 'admin_photo_changes', 'admin_photo_reviews', 'admin_warned_listings',
                    'admin_photo_link_rows');

    -- (b) the gates, before anything is read: raised as PGRST with the body PostgREST answers (F1-7c)
    FOR v_who, v_call, v_want IN VALUES
      (NULL::uuid, format('SELECT count(*)::text FROM public.admin_listing_photos(%L)', v_l1), 'notSignedIn'),
      (v_plain, format('SELECT count(*)::text FROM public.admin_listing_photos(%L)', v_l1), 'permissionDenied'),
      (v_deact, format('SELECT count(*)::text FROM public.admin_listing_photos(%L)', v_l1), 'accountDeactivated'),
      (NULL::uuid, 'SELECT count(*)::text FROM public.admin_photo_changes()', 'notSignedIn'),
      (v_plain, 'SELECT count(*)::text FROM public.admin_photo_changes()', 'permissionDenied'),
      (v_deact, 'SELECT count(*)::text FROM public.admin_photo_changes()', 'accountDeactivated'),
      (v_vo, 'SELECT count(*)::text FROM public.admin_photo_changes()', 'permissionDenied'),
      (NULL::uuid, 'SELECT count(*)::text FROM public.admin_photo_reviews()', 'notSignedIn'),
      (v_plain, 'SELECT count(*)::text FROM public.admin_photo_reviews()', 'permissionDenied'),
      (v_deact, 'SELECT count(*)::text FROM public.admin_photo_reviews()', 'accountDeactivated'),
      (v_vo, 'SELECT count(*)::text FROM public.admin_photo_reviews()', 'permissionDenied'),
      (NULL::uuid, format('SELECT count(*)::text FROM public.admin_warned_listings(ARRAY[%L]::uuid[])', v_l1), 'notSignedIn'),
      (v_plain, format('SELECT count(*)::text FROM public.admin_warned_listings(ARRAY[%L]::uuid[])', v_l1), 'permissionDenied'),
      (v_deact, format('SELECT count(*)::text FROM public.admin_warned_listings(ARRAY[%L]::uuid[])', v_l1), 'accountDeactivated'),
      (NULL::uuid, format('SELECT count(*)::text FROM public.admin_photo_link_rows(ARRAY[%L]::uuid[])', v_p1), 'notSignedIn'),
      (v_plain, format('SELECT count(*)::text FROM public.admin_photo_link_rows(ARRAY[%L]::uuid[])', v_p1), 'permissionDenied'),
      (v_deact, format('SELECT count(*)::text FROM public.admin_photo_link_rows(ARRAY[%L]::uuid[])', v_p1), 'accountDeactivated')
    LOOP
      PERFORM set_config('request.jwt.claims',
        CASE WHEN v_who IS NULL THEN '{}' ELSE json_build_object('sub', v_who::text, 'role', 'authenticated')::text END, true);
      v_msg := NULL; v_st := NULL;
      PERFORM set_config('door.outer', '', true);
      BEGIN
        EXECUTE v_call INTO v_text;
      EXCEPTION WHEN OTHERS THEN
        GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_st = RETURNED_SQLSTATE;
      END;
      IF v_st IS DISTINCT FROM 'PGRST'
         OR v_msg::jsonb IS DISTINCT FROM jsonb_build_object('code', 'P0D01', 'message', v_want) THEN
        RAISE EXCEPTION 'cursor-bundle-4 part 2 proof (b): % for % answered % (%), not %', v_call,
          coalesce(v_who::text, 'no caller'), coalesce(v_msg, 'a read'), v_st, v_want;
      END IF;
    END LOOP;
    -- the view-only holder reads the three readers of listings:view (no second factor, no refusal)
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_vo::text, 'role', 'authenticated')::text, true);
    PERFORM set_config('door.outer', '', true);
    PERFORM count(*) FROM public.admin_listing_photos(v_l1);
    PERFORM count(*) FROM public.admin_warned_listings(ARRAY[v_l1]);
    PERFORM count(*) FROM public.admin_photo_link_rows(ARRAY[v_p1]);

    -- (c) the codes, as the global holder
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_s::text, 'role', 'authenticated')::text, true);
    FOR v_call, v_want IN VALUES
      (format('SELECT count(*)::text FROM public.admin_listing_photos(%L)', gen_random_uuid()), 'listingNotFound'),
      (format('SELECT count(*)::text FROM public.admin_warned_listings(ARRAY(SELECT gen_random_uuid() FROM generate_series(1, 101)))'), 'badSize'),
      (format('SELECT count(*)::text FROM public.admin_photo_link_rows(ARRAY(SELECT gen_random_uuid() FROM generate_series(1, 31)))'), 'badSize'),
      ('SELECT count(*)::text FROM public.admin_warned_listings(ARRAY(SELECT gen_random_uuid() FROM generate_series(1, 100)))', NULL),
      ('SELECT count(*)::text FROM public.admin_photo_link_rows(ARRAY(SELECT gen_random_uuid() FROM generate_series(1, 30)))', NULL)
    LOOP
      v_msg := NULL; v_st := NULL;
      PERFORM set_config('door.outer', '', true);
      BEGIN
        EXECUTE v_call INTO v_text;
      EXCEPTION WHEN OTHERS THEN
        GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_st = RETURNED_SQLSTATE;
      END;
      IF v_want IS NULL THEN
        IF v_st IS NOT NULL OR v_text IS DISTINCT FROM '0' THEN
          RAISE EXCEPTION 'cursor-bundle-4 part 2 proof (c): % at its ceiling answered % (%)', v_call, coalesce(v_msg, v_text), v_st;
        END IF;
      ELSIF v_st IS DISTINCT FROM 'PGRST'
         OR v_msg::jsonb IS DISTINCT FROM jsonb_build_object('code', 'P0D01', 'message', v_want) THEN
        RAISE EXCEPTION 'cursor-bundle-4 part 2 proof (c): % answered % (%), not %', v_call, coalesce(v_msg, 'a read'), v_st, v_want;
      END IF;
    END LOOP;
    -- the country holder: an ad of XY is not found
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_c::text, 'role', 'authenticated')::text, true);
    v_msg := NULL; v_st := NULL;
    PERFORM set_config('door.outer', '', true);
    BEGIN
      PERFORM count(*) FROM public.admin_listing_photos(v_l2);
    EXCEPTION WHEN OTHERS THEN
      GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_st = RETURNED_SQLSTATE;
    END;
    IF v_st IS DISTINCT FROM 'PGRST'
       OR v_msg::jsonb IS DISTINCT FROM jsonb_build_object('code', 'P0D01', 'message', 'listingNotFound') THEN
      RAISE EXCEPTION 'cursor-bundle-4 part 2 proof (c): the country holder read an ad of another country (% / %)', v_st, v_msg;
    END IF;

    -- (d) the answers and the reach: the global holder, then the country holder, then the service role
    FOR v_who IN VALUES (v_s), (v_c), (NULL::uuid) LOOP
      PERFORM set_config('request.jwt.claims',
        CASE WHEN v_who IS NULL THEN json_build_object('role', 'service_role')::text
             ELSE json_build_object('sub', v_who::text, 'role', 'authenticated')::text END, true);
      PERFORM set_config('door.outer', '', true);
      -- the changes: l1's open change; l2's too for all but the country holder; the reviewed one never; oldest first
      v_want_a := CASE WHEN v_who IS NOT DISTINCT FROM v_c THEN ARRAY[v_c1] ELSE ARRAY[v_c1, v_c2] END;
      SELECT coalesce(array_agg(f.id ORDER BY f.created_at, f.id), '{}') INTO v_got
        FROM public.admin_photo_changes() f WHERE f.id = ANY (ARRAY[v_c1, v_c2, v_c3]);
      IF v_got IS DISTINCT FROM v_want_a THEN
        RAISE EXCEPTION 'cursor-bundle-4 part 2 proof (d): the changes of % are % (expected %)', coalesce(v_who::text, 'the service role'), v_got, v_want_a;
      END IF;
      -- the reviews: l1's and l2's open ones for all but the country holder; the decided one and the refused ad's never
      v_want_a := CASE WHEN v_who IS NOT DISTINCT FROM v_c THEN ARRAY[v_p1] ELSE ARRAY[v_p1, v_p3] END;
      SELECT coalesce(array_agg(f.photo_id ORDER BY f.created_at, f.photo_id), '{}') INTO v_got
        FROM public.admin_photo_reviews() f WHERE f.photo_id = ANY (ARRAY[v_p1, v_p2, v_p3, v_p4]);
      IF v_got IS DISTINCT FROM v_want_a THEN
        RAISE EXCEPTION 'cursor-bundle-4 part 2 proof (d): the reviews of % are % (expected %)', coalesce(v_who::text, 'the service role'), v_got, v_want_a;
      END IF;
      -- the warned ads
      v_want_a := CASE WHEN v_who IS NOT DISTINCT FROM v_c THEN ARRAY[v_l1] ELSE ARRAY[v_l1, v_l2] END;
      SELECT coalesce(array_agg(f.listing_id ORDER BY f.listing_id), '{}') INTO v_got
        FROM public.admin_warned_listings(ARRAY[v_l1, v_l2, v_l3]) f;
      IF v_got IS DISTINCT FROM (SELECT coalesce(array_agg(x ORDER BY x), '{}') FROM unnest(v_want_a) x) THEN
        RAISE EXCEPTION 'cursor-bundle-4 part 2 proof (d): the warned ads of % are % (expected %)', coalesce(v_who::text, 'the service role'), v_got, v_want_a;
      END IF;
      -- the link rows: every photo on an ad in reach, whatever the ad's status
      v_want_a := CASE WHEN v_who IS NOT DISTINCT FROM v_c THEN ARRAY[v_p1, v_p2, v_p4] ELSE ARRAY[v_p1, v_p2, v_p3, v_p4] END;
      SELECT coalesce(array_agg(f.id ORDER BY f.id), '{}') INTO v_got
        FROM public.admin_photo_link_rows(ARRAY[v_p1, v_p2, v_p3, v_p4]) f;
      IF v_got IS DISTINCT FROM (SELECT coalesce(array_agg(x ORDER BY x), '{}') FROM unnest(v_want_a) x) THEN
        RAISE EXCEPTION 'cursor-bundle-4 part 2 proof (d): the link rows of % are % (expected %)', coalesce(v_who::text, 'the service role'), v_got, v_want_a;
      END IF;
      -- the photos of l1: two, in display order, with the warning and (a holder of listings:review) the review
      SELECT coalesce(array_agg(f.id ORDER BY f.display_order), '{}') INTO v_got FROM public.admin_listing_photos(v_l1) f;
      IF v_got IS DISTINCT FROM ARRAY[v_p1, v_p2] THEN
        RAISE EXCEPTION 'cursor-bundle-4 part 2 proof (d): the photos of l1 for % are % ', coalesce(v_who::text, 'the service role'), v_got;
      END IF;
      IF (SELECT f.warning ->> 'codes' FROM public.admin_listing_photos(v_l1) f WHERE f.id = v_p1) IS DISTINCT FROM '["not_relevant"]'
         OR (SELECT f.review ->> 'label' FROM public.admin_listing_photos(v_l1) f WHERE f.id = v_p1) IS DISTINCT FROM 'unsure'
         OR (SELECT f.review ->> 'evidence' FROM public.admin_listing_photos(v_l1) f WHERE f.id = v_p1) IS DISTINCT FROM 'scratch evidence'
         OR (SELECT f.review ->> 'decided_at' FROM public.admin_listing_photos(v_l1) f WHERE f.id = v_p2) IS NULL
         OR (SELECT f.paths ->> 'original' FROM public.admin_listing_photos(v_l1) f WHERE f.id = v_p1) IS DISTINCT FROM 'a'
         OR (SELECT f.unscreened FROM public.admin_listing_photos(v_l1) f WHERE f.id = v_p2) IS NOT TRUE
         OR (SELECT f.warning FROM public.admin_listing_photos(v_l1) f WHERE f.id = v_p2) IS NOT NULL THEN
        RAISE EXCEPTION 'cursor-bundle-4 part 2 proof (d): the photo rows of l1 for % are not the table''s', coalesce(v_who::text, 'the service role');
      END IF;
    END LOOP;
    -- the holder of listings:view alone: the warning, never the review
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_vo::text, 'role', 'authenticated')::text, true);
    PERFORM set_config('door.outer', '', true);
    IF (SELECT f.warning ->> 'codes' FROM public.admin_listing_photos(v_l1) f WHERE f.id = v_p1) IS DISTINCT FROM '["not_relevant"]'
       OR EXISTS (SELECT 1 FROM public.admin_listing_photos(v_l1) f WHERE f.review IS NOT NULL) THEN
      RAISE EXCEPTION 'cursor-bundle-4 part 2 proof (d): a holder of listings:view alone read a review or missed a warning';
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);

    -- (e) nothing spent, nothing metered.
    IF EXISTS (SELECT 1 FROM public.rate_limits WHERE key IN (v_a::text, v_s::text, v_c::text, v_vo::text, v_plain::text, v_deact::text)) THEN
      RAISE EXCEPTION 'cursor-bundle-4 part 2 proof (e): a reader spent a dial';
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date
           AND door IN ('admin_listing_photos', 'admin_photo_changes', 'admin_photo_reviews', 'admin_warned_listings',
                        'admin_photo_link_rows'))
         IS DISTINCT FROM v_ref0 THEN
      RAISE EXCEPTION 'cursor-bundle-4 part 2 proof (e): a reader metered a refusal';
    END IF;

    RAISE EXCEPTION 'cursor-bundle-4-part-2-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'cursor-bundle-4-part-2-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261123040000') ON CONFLICT DO NOTHING;
