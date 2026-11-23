-- e2e-areas: admin-screening, admin-listings, admin-roles, admin-users, admin-audit, admin-monetisation

-- Cursor bundle 4, part 2, file 2 — THE STAFF'S TABLE RULES GO (INC-1242; DEC-430; brief docs/governance/briefs/cursor-bundle-4.md,
-- rulings docs/governance/briefs/cursor-bundle-4-ruling-1.md decisions 14-18 and cursor-bundle-4-ruling-2.md decisions 1-3).
-- File 1 (mark 20261123040000) gave the staff screens' five photo reads their checked doors, and the readers moved onto them.
-- Nothing reads a table through a role rule any more, so the role rules go: a rule that asks has_permission(auth.uid(), …) lets a
-- holder read a table straight, past the gate's caller check, deactivation test and country reach. What stays is what the
-- browser reads for itself: an owner's own rows, the public's rows, and the four storage-bucket rules.
--   1. admin_listing_photos is redeclared WHOLE from file 1 and changed in one place: a photo's review is read by a holder of
--      listings:review FOR THE AD'S COUNTRY (has_permission_scoped, match: a global grant or a grant of that country), where
--      file 1 asked for the permission anywhere. The door's reach and the review's reach are now one.
--   2. The eighteen public-table rules that call has_permission are dropped: user_roles_read, audit_log_read,
--      listings_admin_read, listings_admin_update, listing_photos_admin_read, profiles_admin_read, resources_rbac_select,
--      permissions_rbac_select, roles_rbac_select, role_permissions_rbac_select, listing_locations_admin_read,
--      listing_photo_warnings_admin_read, listing_photo_changes_admin_read, listing_photo_reviews_admin_read,
--      reveal_flags_staff_read, listing_reports_staff_read, listing_packages_staff_read, package_prices_staff_read.
--   3. SELECT is revoked on the eight tables no rule reads for a browser role any more: audit_log, listing_photo_changes,
--      permissions, resources, reveal_flags, role_permissions, roles, user_roles. The service role keeps its grant; the doors
--      read them as their owner. No other privilege is touched, and nothing is dropped from the doors' side.
-- The four storage rules (category_assets_assets_insert, _update, _delete and category_assets_public_read) stay: the storage
-- schema is the platform's, its reader is a bucket write the browser makes for a category's image.
-- Every reader of the eight tables was found by census (src/ .from() reads: none; the readers' RPCs: the doors of file 1 and
-- the earlier staff doors; the triggers: four function bodies name audit_log, user_roles or roles — on_auth_user_created,
-- user_roles_protect and listing_photos_approved_with_ad are SECURITY DEFINER, attributes_type_lists only inserts into
-- audit_log and fires inside a door — and no browser role holds a write grant on the tables they sit on).

DO $pre$
DECLARE
  v_md5 text;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261123040000') THEN
    RAISE EXCEPTION 'cursor-bundle-4 part 2 file 2: file 1 (mark 20261123040000) must be applied first';
  END IF;
  SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5
    FROM pg_proc p WHERE p.oid = 'public.admin_listing_photos(uuid)'::regprocedure;
  IF v_md5 IS DISTINCT FROM '7ad565d3adf63eee60350ebab868ffc7' THEN
    RAISE EXCEPTION 'cursor-bundle-4 part 2 file 2: the live admin_listing_photos is not file 1''s body (%)', v_md5;
  END IF;
END $pre$;

-- ------------------------------------------------------------ 1. admin_listing_photos (whole from file 1; the review's reach)
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
  -- The review is read by a holder of listings:review for this ad's country (the match scope: a global grant or a grant
  -- of this country); a holder of listings:view alone reads null.
  v_review := v_ctx.role = 'service_role' OR (SELECT s.allowed FROM public.has_permission_scoped(v_ctx.uid, 'listings', 'review', v_home, 'match') s);
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
  'cursor-bundle-4 (INC-1242): a staff reader on door_context (listings:view, filter) — one ad''s photos with the screen''s warning and, for a holder of listings:review for the ad''s country, the review; an ad missing or out of reach is listingNotFound.';
REVOKE ALL ON FUNCTION public.admin_listing_photos(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_listing_photos(uuid) TO authenticated, service_role;

-- ------------------------------------------------------------ 2. the eighteen role rules
DROP POLICY user_roles_read ON public.user_roles;
DROP POLICY audit_log_read ON public.audit_log;
DROP POLICY listings_admin_read ON public.listings;
DROP POLICY listings_admin_update ON public.listings;
DROP POLICY listing_photos_admin_read ON public.listing_photos;
DROP POLICY profiles_admin_read ON public.profiles;
DROP POLICY resources_rbac_select ON public.resources;
DROP POLICY permissions_rbac_select ON public.permissions;
DROP POLICY roles_rbac_select ON public.roles;
DROP POLICY role_permissions_rbac_select ON public.role_permissions;
DROP POLICY listing_locations_admin_read ON public.listing_locations;
DROP POLICY listing_photo_warnings_admin_read ON public.listing_photo_warnings;
DROP POLICY listing_photo_changes_admin_read ON public.listing_photo_changes;
DROP POLICY listing_photo_reviews_admin_read ON public.listing_photo_reviews;
DROP POLICY reveal_flags_staff_read ON public.reveal_flags;
DROP POLICY listing_reports_staff_read ON public.listing_reports;
DROP POLICY listing_packages_staff_read ON public.listing_packages;
DROP POLICY package_prices_staff_read ON public.package_prices;

-- ------------------------------------------------------------ 3. the eight tables no browser role reads
REVOKE SELECT ON public.audit_log FROM anon, authenticated;
REVOKE SELECT ON public.listing_photo_changes FROM anon, authenticated;
REVOKE SELECT ON public.permissions FROM anon, authenticated;
REVOKE SELECT ON public.resources FROM anon, authenticated;
REVOKE SELECT ON public.reveal_flags FROM anon, authenticated;
REVOKE SELECT ON public.role_permissions FROM anon, authenticated;
REVOKE SELECT ON public.roles FROM anon, authenticated;
REVOKE SELECT ON public.user_roles FROM anon, authenticated;

-- ------------------------------------------------------------ 4. PROOFS
-- (a) catalog facts: admin_listing_photos keeps its header and grants and its body is this file's (md5); the eighteen rules
--     are gone and the four storage rules stand; the eight tables answer no SELECT to a browser role and the service role
--     keeps its grant; the tables the owner and the public read keep theirs.
-- (b) a browser role holding EVERY permission (a global role of all of them), judged as the authenticated role through
--     row security: another person's row on each table whose role rule went is no row (an ad of someone else's that is not
--     public, its photo, its warning, its review, its place, a report, a disabled package, an ended price, another's
--     profile); each of the eight tables is refused (42501); an update of another's ad changes no row.
-- (c) what the browser still reads for itself: the owner's own ad, photo, warning, review, place and profile; the reporter's own
--     report; the public's enabled package and current price; has_permission and get_my_permissions answer.
-- (d) the review's reach (planted): a holder of listings:review for XY alone reads the review of an XY ad and null on an XZ
--     ad (file 1 gave both); the global holder and the XZ holder read as file 1's proof (d) left them; a holder of
--     listings:view alone reads none; the service role reads.
DO $proof$
DECLARE
  v_hex     text := replace(gen_random_uuid()::text, '-', '');
  v_tag     text;
  -- 'XZ' and 'XY': scratch codes no market holds, as earlier proofs' (K4: a recorded proof exception)
  v_code    character(2) := 'XZ';
  v_code2   character(2) := 'XY';
  v_lang    text := public.language_code('base');
  v_r0      text;
  v_r1      text;
  -- 'XTS': a scratch currency no market holds, as earlier proofs' (K4: a recorded proof exception)
  v_cur     character(3) := 'XTS';
  v_a       uuid := gen_random_uuid();
  v_s       uuid := gen_random_uuid();
  v_c       uuid := gen_random_uuid();
  v_vo      uuid := gen_random_uuid();
  v_x       uuid := gen_random_uuid();
  v_big     uuid := gen_random_uuid();
  v_rep     uuid := gen_random_uuid();
  v_role    uuid;
  v_role_v  uuid;
  v_role_r  uuid;
  v_role_a  uuid;
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
  v_pr_old  uuid := gen_random_uuid();
  v_pr_cur  uuid := gen_random_uuid();
  v_rep_id  uuid := gen_random_uuid();
  v_who     uuid;
  v_as      text;
  v_call    text;
  v_want    text;
  v_msg     text;
  v_st      text;
  v_text    text;
  v_rows    bigint;
  v_md5     text;
  v_name    text;
  v_table   text;
BEGIN
  -- (a) the catalogue
  IF (SELECT NOT prosecdef OR provolatile <> 's' OR proconfig::text <> '{search_path=public}' OR prorettype <> 'record'::regtype
        FROM pg_proc WHERE oid = 'public.admin_listing_photos(uuid)'::regprocedure)
     OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = 'public.admin_listing_photos(uuid)'::regprocedure)) a
                 WHERE a.grantee = 0)
     OR has_function_privilege('anon', 'public.admin_listing_photos(uuid)'::regprocedure, 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.admin_listing_photos(uuid)'::regprocedure, 'EXECUTE')
     OR NOT has_function_privilege('service_role', 'public.admin_listing_photos(uuid)'::regprocedure, 'EXECUTE') THEN
    RAISE EXCEPTION 'cursor-bundle-4 part 2 file 2 proof (a): admin_listing_photos''s header, return type or grants differ';
  END IF;
  SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5
    FROM pg_proc p WHERE p.oid = 'public.admin_listing_photos(uuid)'::regprocedure;
  IF v_md5 IS DISTINCT FROM '730f84c7e0e5350268b04c2cfa0aa52e' THEN
    RAISE EXCEPTION 'cursor-bundle-4 part 2 file 2 proof (a): admin_listing_photos''s body differs from this file (%)', v_md5;
  END IF;
  IF EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND policyname IN (
       'user_roles_read', 'audit_log_read', 'listings_admin_read', 'listings_admin_update', 'listing_photos_admin_read',
       'profiles_admin_read', 'resources_rbac_select', 'permissions_rbac_select', 'roles_rbac_select',
       'role_permissions_rbac_select', 'listing_locations_admin_read', 'listing_photo_warnings_admin_read',
       'listing_photo_changes_admin_read', 'listing_photo_reviews_admin_read', 'reveal_flags_staff_read',
       'listing_reports_staff_read', 'listing_packages_staff_read', 'package_prices_staff_read') ) THEN
    RAISE EXCEPTION 'cursor-bundle-4 part 2 file 2 proof (a): a role rule still stands';
  END IF;
  -- no rule of any public table still asks has_permission
  IF EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public'
              AND coalesce(qual, '') || ' ' || coalesce(with_check, '') ~ 'has_permission') THEN
    RAISE EXCEPTION 'cursor-bundle-4 part 2 file 2 proof (a): a public rule still asks has_permission';
  END IF;
  IF (SELECT count(*) FROM pg_policies WHERE schemaname = 'storage' AND policyname IN (
        'category_assets_assets_insert', 'category_assets_assets_update', 'category_assets_assets_delete',
        'category_assets_public_read')) <> 4 THEN
    RAISE EXCEPTION 'cursor-bundle-4 part 2 file 2 proof (a): a storage rule of the category assets is missing';
  END IF;
  FOREACH v_table IN ARRAY ARRAY['audit_log', 'listing_photo_changes', 'permissions', 'resources', 'reveal_flags',
                                 'role_permissions', 'roles', 'user_roles'] LOOP
    IF has_table_privilege('anon', 'public.' || v_table, 'SELECT')
       OR has_table_privilege('authenticated', 'public.' || v_table, 'SELECT')
       OR NOT has_table_privilege('service_role', 'public.' || v_table, 'SELECT') THEN
      RAISE EXCEPTION 'cursor-bundle-4 part 2 file 2 proof (a): the SELECT grants of % are not the service role''s alone', v_table;
    END IF;
  END LOOP;
  FOREACH v_table IN ARRAY ARRAY['listing_photo_warnings', 'listing_photo_reviews', 'listing_reports', 'listing_packages',
                                 'package_prices', 'listing_locations', 'listing_photos', 'profiles'] LOOP
    IF NOT has_table_privilege('authenticated', 'public.' || v_table, 'SELECT')
       AND NOT has_any_column_privilege('authenticated', 'public.' || v_table, 'SELECT') THEN
      RAISE EXCEPTION 'cursor-bundle-4 part 2 file 2 proof (a): % lost the browser''s own read', v_table;
    END IF;
  END LOOP;

  v_tag := 'e2e-mig-cb4p2f2-' || substr(v_hex, 1, 8);
  v_r0 := 'e2e_mig_r0_' || substr(v_hex, 11, 8);
  v_r1 := 'e2e_mig_r1_' || substr(v_hex, 11, 8);
  BEGIN
    PERFORM set_config('request.jwt.claims', '{}', true);
    IF EXISTS (SELECT 1 FROM public.countries WHERE code IN (v_code, v_code2)) THEN
      RAISE EXCEPTION 'cursor-bundle-4 part 2 file 2 proof: a scratch code (% or %) already exists', v_code, v_code2;
    END IF;
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_code, v_tag, true), (v_code2, v_tag || '-2', true);
    SELECT a.id INTO v_anc FROM public.locations a WHERE a.country_code = v_code AND a.level = 'country' AND a.name_en = v_tag
     AND a.name_en LIKE 'e2e-mig-%';
    SELECT a.id INTO v_anc2 FROM public.locations a WHERE a.country_code = v_code2 AND a.level = 'country'
     AND a.name_en = v_tag || '-2' AND a.name_en LIKE 'e2e-mig-%';
    IF v_anc IS NULL OR v_anc2 IS NULL THEN RAISE EXCEPTION 'cursor-bundle-4 part 2 file 2 proof: a scratch market has no anchor'; END IF;
    UPDATE public.locations SET is_active = true WHERE id IN (v_anc, v_anc2) AND name_en LIKE 'e2e-mig-cb4p2f2-%';
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
      (v_x, v_tag || '-x@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_big, v_tag || '-b@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_rep, v_tag || '-r@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO public.legal_acceptances (user_id, version_id, language, method)
    SELECT u, v.id, v_lang, 'e2e-mig' FROM public.legal_versions v, unnest(ARRAY[v_a, v_s, v_c, v_vo, v_x, v_big, v_rep]) u
     WHERE v.status = 'published' AND v.effective_at <= now();
    -- roles: -both (listings:view and listings:review) global for v_s, XZ only for v_c; -view (listings:view) global for v_vo
    -- and v_x; -rev (listings:review) for XY only for v_x; -all (every permission) global for v_big
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-both', v_tag) RETURNING id INTO v_role;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'listings' AND p.action IN ('view', 'review');
    IF (SELECT count(*) FROM public.role_permissions WHERE role_id = v_role) <> 2 THEN
      RAISE EXCEPTION 'cursor-bundle-4 part 2 file 2 proof: listings:view or listings:review is not declared';
    END IF;
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-view', v_tag) RETURNING id INTO v_role_v;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role_v, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'listings' AND p.action = 'view';
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-rev', v_tag) RETURNING id INTO v_role_r;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role_r, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'listings' AND p.action = 'review';
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-all', v_tag) RETURNING id INTO v_role_a;
    INSERT INTO public.role_permissions (role_id, permission_id) SELECT v_role_a, p.id FROM public.permissions p;
    INSERT INTO public.user_roles (user_id, role_id, scope_type)
    VALUES (v_s, v_role, 'global'), (v_vo, v_role_v, 'global'), (v_x, v_role_v, 'global'), (v_big, v_role_a, 'global');
    INSERT INTO public.user_roles (user_id, role_id, scope_type, scope_country)
    VALUES (v_c, v_role, 'country', v_code), (v_x, v_role_r, 'country', v_code2);
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES (v_tag || ' leaf', v_tag, true, true, true, 9999) RETURNING id INTO v_cat;
    INSERT INTO public.listing_packages (key, kind, name_en, days, enabled, self_serve, extends_lifetime, sort)
    VALUES (v_r0, 'reach', v_tag || ' reach', 30, true, true, false, 9001),
           (v_r1, 'reach', v_tag || ' reach off', 30, false, true, false, 9002);
    INSERT INTO public.market_settings (country_code, free_regular_ads, included_reach, paid_levels)
    VALUES (v_code, 20, v_r0, false), (v_code2, 20, v_r0, false);
    IF EXISTS (SELECT 1 FROM public.currencies WHERE code = v_cur) THEN
      RAISE EXCEPTION 'cursor-bundle-4 part 2 file 2 proof: the scratch currency % already exists', v_cur;
    END IF;
    INSERT INTO public.currencies (code, name_en, minor_units) VALUES (v_cur, v_tag, 2);
    INSERT INTO public.package_prices (id, package_key, amount, currency, credit_cost, valid_from, valid_to)
    VALUES (v_pr_old, v_r0, 1, v_cur, 0, timestamptz '1970-01-01 00:00:00+00', timestamptz '1970-01-02 00:00:00+00'),
           (v_pr_cur, v_r0, 1, v_cur, 0, timestamptz '1970-01-03 00:00:00+00', NULL);
    -- l1: a live ad of XZ; l2: a live ad of XY; l3: a refused ad of XZ (not public). All the seller v_a's.
    INSERT INTO public.listings (id, seller_id, category_id, location_id, title, description, home_country_code, price_mode,
                                 status, published_at, published_first_at, expires_at)
    VALUES (v_l1, v_a, v_cat, v_city, v_tag || ' one', 'A scratch ad for the staff rules proof.', v_code, 'free', 'active',
            now(), now(), now() + interval '10 days'),
           (v_l2, v_a, v_cat, v_city2, v_tag || ' two', 'A scratch ad for the staff rules proof.', v_code2, 'free', 'active',
            now(), now(), now() + interval '10 days'),
           (v_l3, v_a, v_cat, v_city, v_tag || ' three', 'A scratch ad for the staff rules proof.', v_code, 'free', 'rejected',
            NULL, NULL, NULL);
    INSERT INTO public.listing_locations (listing_id, location_id) VALUES (v_l3, v_city);
    INSERT INTO public.listing_photos (id, listing_id, storage_path, paths, display_order, exif_stripped, unscreened)
    VALUES (v_p1, v_l1, v_tag || '/p1', '{"original": "a"}'::jsonb, 0, true, false),
           (v_p2, v_l1, v_tag || '/p2', '{}'::jsonb, 1, false, true),
           (v_p3, v_l2, v_tag || '/p3', '{}'::jsonb, 0, true, false),
           (v_p4, v_l3, v_tag || '/p4', '{}'::jsonb, 0, true, false);
    INSERT INTO public.listing_photo_warnings (photo_id, listing_id, codes)
    VALUES (v_p1, v_l1, ARRAY['not_relevant']), (v_p3, v_l2, ARRAY['not_relevant', 'other']);
    INSERT INTO public.listing_photo_reviews (photo_id, listing_id, label, code, evidence, created_at)
    VALUES (v_p1, v_l1, 'unsure', NULL, 'scratch evidence', timestamptz '1970-01-01 00:00:01+00'),
           (v_p3, v_l2, 'held', NULL, NULL, timestamptz '1970-01-01 00:00:02+00');
    INSERT INTO public.listing_reports (id, listing_id, reporter_id, reason) VALUES (v_rep_id, v_l1, v_rep, 'spam');

    -- (b) and (c): each probe is run (e2e-mig- scratch rows only) as a browser role through row security: a number is the
    -- rows counted, 'denied' the refusal of the table's privilege (42501), 'some' any positive count, 'true' a true answer.
    FOR v_who, v_as, v_call, v_want IN VALUES
      -- (b) the holder of every permission: no row of another person's, the eight tables refused
      (v_big, 'authenticated', format('SELECT count(*)::text FROM public.listings WHERE id = %L', v_l3), '0'),
      (v_big, 'authenticated', format('SELECT count(*)::text FROM public.listing_photos WHERE id = %L', v_p4), '0'),
      (v_big, 'authenticated', format('SELECT count(*)::text FROM public.listing_photo_warnings WHERE photo_id = %L', v_p1), '0'),
      (v_big, 'authenticated', format('SELECT count(*)::text FROM public.listing_photo_reviews WHERE photo_id = %L', v_p1), '0'),
      (v_big, 'authenticated', format('SELECT count(*)::text FROM public.listing_locations WHERE listing_id = %L', v_l3), '0'),
      (v_big, 'authenticated', format('SELECT count(*)::text FROM public.profiles WHERE user_id = %L', v_a), '0'),
      (v_big, 'authenticated', format('SELECT count(*)::text FROM public.listing_reports WHERE id = %L', v_rep_id), '0'),
      (v_big, 'authenticated', format('SELECT count(*)::text FROM public.listing_packages WHERE key = %L', v_r1), '0'),
      (v_big, 'authenticated', format('SELECT count(*)::text FROM public.package_prices WHERE id = %L', v_pr_old), '0'),
      (v_big, 'authenticated', 'SELECT count(*)::text FROM public.audit_log', 'denied'),
      (v_big, 'authenticated', 'SELECT count(*)::text FROM public.listing_photo_changes', 'denied'),
      (v_big, 'authenticated', 'SELECT count(*)::text FROM public.permissions', 'denied'),
      (v_big, 'authenticated', 'SELECT count(*)::text FROM public.resources', 'denied'),
      (v_big, 'authenticated', 'SELECT count(*)::text FROM public.reveal_flags', 'denied'),
      (v_big, 'authenticated', 'SELECT count(*)::text FROM public.role_permissions', 'denied'),
      (v_big, 'authenticated', 'SELECT count(*)::text FROM public.roles', 'denied'),
      (v_big, 'authenticated', 'SELECT count(*)::text FROM public.user_roles', 'denied'),
      (NULL::uuid, 'anon', 'SELECT count(*)::text FROM public.audit_log', 'denied'),
      (NULL::uuid, 'anon', 'SELECT count(*)::text FROM public.user_roles', 'denied'),
      -- (c) the owner's own rows and the public's
      (v_a, 'authenticated', format('SELECT count(*)::text FROM public.listings WHERE id = %L', v_l3), '1'),
      (v_a, 'authenticated', format('SELECT count(*)::text FROM public.listing_photos WHERE id = %L', v_p4), '1'),
      (v_a, 'authenticated', format('SELECT count(*)::text FROM public.listing_photo_warnings WHERE photo_id = %L', v_p1), '1'),
      (v_a, 'authenticated', format('SELECT count(*)::text FROM public.listing_photo_reviews WHERE photo_id = %L', v_p1), '1'),
      (v_a, 'authenticated', format('SELECT count(*)::text FROM public.listing_locations WHERE listing_id = %L', v_l3), '1'),
      (v_a, 'authenticated', format('SELECT count(*)::text FROM public.profiles WHERE user_id = %L', v_a), '1'),
      (v_rep, 'authenticated', format('SELECT count(*)::text FROM public.listing_reports WHERE id = %L', v_rep_id), '1'),
      (v_big, 'authenticated', format('SELECT count(*)::text FROM public.listing_packages WHERE key = %L', v_r0), '1'),
      (v_big, 'authenticated', format('SELECT count(*)::text FROM public.package_prices WHERE id = %L', v_pr_cur), '1'),
      (NULL::uuid, 'anon', format('SELECT count(*)::text FROM public.listing_packages WHERE key = %L', v_r0), '1'),
      (NULL::uuid, 'anon', format('SELECT count(*)::text FROM public.listings WHERE id = %L', v_l1), '1'),
      (NULL::uuid, 'anon', format('SELECT count(*)::text FROM public.listings WHERE id = %L', v_l3), '0'),
      (v_big, 'authenticated', format('SELECT public.has_permission(%L, ''listings'', ''view'')::text', v_big), 'true'),
      (v_a, 'authenticated', format('SELECT public.has_permission(%L, ''listings'', ''view'')::text', v_a), 'false'),
      (v_big, 'authenticated', 'SELECT count(*)::text FROM public.get_my_permissions()', 'some')
    LOOP
      PERFORM set_config('request.jwt.claims',
        CASE WHEN v_who IS NULL THEN '{}' ELSE json_build_object('sub', v_who::text, 'role', v_as)::text END, true);
      EXECUTE format('SET LOCAL ROLE %I', v_as);
      v_msg := NULL; v_st := NULL; v_text := NULL;
      BEGIN
        EXECUTE v_call INTO v_text;
      EXCEPTION WHEN OTHERS THEN
        GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_st = RETURNED_SQLSTATE;
      END;
      EXECUTE 'RESET ROLE';
      IF v_want = 'denied' THEN
        IF v_st IS DISTINCT FROM '42501' THEN
          RAISE EXCEPTION 'cursor-bundle-4 part 2 file 2 proof (b): % as % was not refused (% / %)', v_call, v_as, v_st, coalesce(v_msg, v_text);
        END IF;
      ELSIF v_st IS NOT NULL
         OR (v_want = 'some' AND v_text IS NOT DISTINCT FROM '0')
         OR (v_want <> 'some' AND v_text IS DISTINCT FROM v_want) THEN
        RAISE EXCEPTION 'cursor-bundle-4 part 2 file 2 proof (b/c): % as % answered % (% %), not %', v_call, v_as, v_text, v_st, v_msg, v_want;
      END IF;
    END LOOP;

    -- an update of another person's ad changes no row (or is refused outright): the title stays
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_big::text, 'role', 'authenticated')::text, true);
    EXECUTE 'SET LOCAL ROLE authenticated';
    v_st := NULL; v_rows := NULL;
    BEGIN
      EXECUTE format('UPDATE public.listings SET title = %L WHERE id = %L', 'changed', v_l3);
      GET DIAGNOSTICS v_rows = ROW_COUNT;
    EXCEPTION WHEN OTHERS THEN
      GET STACKED DIAGNOSTICS v_st = RETURNED_SQLSTATE;
    END;
    EXECUTE 'RESET ROLE';
    IF (v_st IS NULL AND v_rows IS DISTINCT FROM 0) OR (v_st IS NOT NULL AND v_st <> '42501')
       OR (SELECT l.title FROM public.listings l WHERE l.id = v_l3) IS DISTINCT FROM v_tag || ' three' THEN
      RAISE EXCEPTION 'cursor-bundle-4 part 2 file 2 proof (b): a holder of every permission changed another person''s ad (% rows, %)', v_rows, v_st;
    END IF;

    -- (d) the review's reach: planted. The global holder and the XZ holder read an XZ ad's review; the XY-only reviewer reads
    -- an XY ad's and null on an XZ ad's; the view-only holder none; the service role reads.
    FOR v_who, v_want, v_text IN VALUES
      (v_s, 'unsure', 'held'),
      (v_c, 'unsure', NULL),
      (v_x, NULL, 'held'),
      (v_vo, NULL, NULL),
      (NULL::uuid, 'unsure', 'held')
    LOOP
      PERFORM set_config('request.jwt.claims',
        CASE WHEN v_who IS NULL THEN json_build_object('role', 'service_role')::text
             ELSE json_build_object('sub', v_who::text, 'role', 'authenticated')::text END, true);
      PERFORM set_config('door.outer', '', true);
      -- an XZ ad: the photo p1's review
      v_msg := (SELECT f.review ->> 'label' FROM public.admin_listing_photos(v_l1) f WHERE f.id = v_p1);
      IF v_msg IS DISTINCT FROM v_want THEN
        RAISE EXCEPTION 'cursor-bundle-4 part 2 file 2 proof (d): the review of an XZ ad for % is % (expected %)',
          coalesce(v_who::text, 'the service role'), v_msg, v_want;
      END IF;
      -- an XY ad (the XZ holder is refused the ad itself, as file 1 left it): the photo p3's review
      IF v_who IS DISTINCT FROM v_c THEN
        v_msg := (SELECT f.review ->> 'label' FROM public.admin_listing_photos(v_l2) f WHERE f.id = v_p3);
        IF v_msg IS DISTINCT FROM v_text THEN
          RAISE EXCEPTION 'cursor-bundle-4 part 2 file 2 proof (d): the review of an XY ad for % is % (expected %)',
            coalesce(v_who::text, 'the service role'), v_msg, v_text;
        END IF;
      END IF;
      -- the warning is read by every holder of listings:view, as file 1 left it
      IF (SELECT f.warning ->> 'codes' FROM public.admin_listing_photos(v_l1) f WHERE f.id = v_p1) IS DISTINCT FROM '["not_relevant"]' THEN
        RAISE EXCEPTION 'cursor-bundle-4 part 2 file 2 proof (d): the warning of an XZ ad was not read by %', coalesce(v_who::text, 'the service role');
      END IF;
    END LOOP;
    PERFORM set_config('request.jwt.claims', '{}', true);

    RAISE EXCEPTION 'cursor-bundle-4-part-2-file-2-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'cursor-bundle-4-part-2-file-2-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261123050100') ON CONFLICT DO NOTHING;
