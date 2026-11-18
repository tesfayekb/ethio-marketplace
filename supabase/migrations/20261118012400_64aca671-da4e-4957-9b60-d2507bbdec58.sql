-- e2e-areas: admin-listings

-- Foundations 1, turn F1-6a, part 4 of 9 — THE MOVE AND EDIT DOORS ONTO DOOR_CONTEXT AND THE SHELL
-- (DEC-333; brief docs/governance/briefs/f1-doors-6a.md, ruling 1 §4–7; census
-- docs/governance/reports/f1-doors-6a.census.md).
-- admin_move_listing and admin_edit_listing are redeclared WHOLE from their last declarations (live md5s checked):
-- each opens with ONE door_context gate on listings:enforce — caller, deactivation, the permission, the second factor
-- (the move's now before its core's validation, ruling 1 §7), the dial staff_moderation — then calls its core (part 1:
-- codes), inside the shell. The move's scope is global; the edit's is the listing's home country, matched
-- (ruling 1 §5: a country grant edits only its country's ads; a missing ad's NULL country passes a global grant only,
-- and the core then says listingNotFound). Folds: 'not signed in' → notSignedIn; 'permission denied' →
-- permissionDenied; 'account is deactivated' → accountDeactivated; 'rateLimited' → door_context's rateLimited.

DO $pre$
DECLARE
  v_md5 text;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261118070200') THEN
    RAISE EXCEPTION 'F1-6a part 4: part 3 (mark 20261118070200) must be applied first';
  END IF;
  SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p
   WHERE p.oid = 'public.admin_move_listing(uuid,text,text,text)'::regprocedure;
  IF v_md5 IS DISTINCT FROM '759b06a21541fe7b7a9c55daaa6a05b9' THEN
    RAISE EXCEPTION 'F1-6a part 4: the live admin_move_listing is not its last declaration''s body (%)', v_md5;
  END IF;
  SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p
   WHERE p.oid = 'public.admin_edit_listing(uuid,jsonb,text,text)'::regprocedure;
  IF v_md5 IS DISTINCT FROM 'aa0fa15263cb1d903fb29d6d25b6e0ba' THEN
    RAISE EXCEPTION 'F1-6a part 4: the live admin_edit_listing is not its last declaration''s body (%)', v_md5;
  END IF;
END $pre$;

-- ------------------------------------------------------------ 1. admin_move_listing (whole from 20261028233839 :415; door_context, the shell)
CREATE OR REPLACE FUNCTION public.admin_move_listing(p_listing_id uuid, p_to text, p_reason text, p_note text DEFAULT NULL::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 VOLATILE
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  -- The door's authority and second factor, then its dial (staff_moderation, once per move), then the shared core.
  PERFORM public.door_context('staff', 'listings', 'enforce', 'staff_moderation', NULL, 'global');
  RETURN public.admin_move_listing_core(p_listing_id, p_to, p_reason, p_note);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_move_listing', 'staff_moderation', SQLERRM);
END $function$;
REVOKE ALL ON FUNCTION public.admin_move_listing(uuid, text, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_move_listing(uuid, text, text, text) TO authenticated, service_role;

-- ------------------------------------------------------------ 2. admin_edit_listing (whole from 20261028233839 :316; door_context matched, the shell)
CREATE OR REPLACE FUNCTION public.admin_edit_listing(p_listing_id uuid, p_changes jsonb, p_reason text, p_note text DEFAULT NULL::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 VOLATILE
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_scope character(2);
BEGIN
  -- The door's authority over the ad's home country and its second factor, then its dial, then the shared core.
  SELECT l.home_country_code INTO v_scope FROM public.listings l WHERE l.id = p_listing_id;
  PERFORM public.door_context('staff', 'listings', 'enforce', 'staff_moderation', v_scope, 'match');
  RETURN public.admin_edit_listing_core(p_listing_id, p_changes, p_reason, p_note);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_edit_listing', 'staff_moderation', SQLERRM);
END $function$;
REVOKE ALL ON FUNCTION public.admin_edit_listing(uuid, jsonb, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_edit_listing(uuid, jsonb, text, text) TO authenticated, service_role;

-- ------------------------------------------------------------ 3. PROOFS
-- (a) catalog facts of both doors: VOLATILE SECURITY DEFINER, RETURNS jsonb, EXECUTE for authenticated and the service
--     role, never anon or PUBLIC; each body this file's (md5).
-- (b) the gates of both: no caller notSignedIn (401); a person without listings:enforce permissionDenied (403); a
--     deactivated holder accountDeactivated (403); a holder with no verified factor 'step-up required: no verified
--     factor' (P0009).
-- (c) the codes with every earlier check cleared, 400: the move's badValue:to, listingNotFound, ownListing,
--     illegalTransition:removed-removed; the edit's badValue:reason, nothingChanged, listingNotFound, listingRemoved,
--     ownListing. A country enforcer: the edit of an ad in another country and any move permissionDenied:scope (403).
-- (d) the global enforcer removes an ad; the country enforcer edits an ad of its country: {ok:true}.
-- (e) staff_moderation counted once per call past the gate (the global enforcer 10, the country enforcer 1), no
--     revise; none for a caller the gate refused; every refusal metered (8 + 9).
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
  v_nf      uuid := gen_random_uuid();
  v_plain   uuid := gen_random_uuid();
  v_deact   uuid := gen_random_uuid();
  v_sess    uuid := gen_random_uuid();
  v_sess2   uuid := gen_random_uuid();
  v_cs      text;
  v_cc      text;
  v_role    uuid;
  v_anc     uuid;
  v_anc2    uuid;
  v_region  uuid;
  v_city    uuid;
  v_city2   uuid;
  v_cat     uuid;
  v_l1      uuid := gen_random_uuid();
  v_l2      uuid := gen_random_uuid();
  v_l3      uuid := gen_random_uuid();
  v_l4      uuid := gen_random_uuid();
  v_title   jsonb;
  v_answer  jsonb;
  v_move0   bigint;
  v_edit0   bigint;
  v_count   integer;
  v_msg     text;
  v_door    text;
  v_fn      regprocedure;
BEGIN
  FOREACH v_fn IN ARRAY ARRAY['public.admin_move_listing(uuid,text,text,text)'::regprocedure,
                              'public.admin_edit_listing(uuid,jsonb,text,text)'::regprocedure] LOOP
    IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' OR prorettype <> 'jsonb'::regtype
          FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-6a part 4 proof (a): %''s header, return type or grants differ', v_fn;
    END IF;
  END LOOP;
  IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = 'public.admin_move_listing(uuid,text,text,text)'::regprocedure)
     IS DISTINCT FROM 'ae6ec4a71c3a8b0e602ffd185eebd503'
     OR (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = 'public.admin_edit_listing(uuid,jsonb,text,text)'::regprocedure)
     IS DISTINCT FROM '315d2d2c8c32de07802e10e37719fe31' THEN
    RAISE EXCEPTION 'F1-6a part 4 proof (a): a door''s body differs from this file';
  END IF;

  v_tag := 'e2e-mig-f16a4-' || substr(v_hex, 1, 10);
  v_r0 := 'e2e_mig_r0_' || substr(v_hex, 11, 8);
  v_title := jsonb_build_object('title', v_tag || ' edited ad');
  v_cs := json_build_object('sub', v_s::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text;
  v_cc := json_build_object('sub', v_c::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess2::text)::text;
  BEGIN
    PERFORM set_config('request.jwt.claims', '{}', true);
    IF EXISTS (SELECT 1 FROM public.countries WHERE code IN (v_code, v_code2)) THEN
      RAISE EXCEPTION 'F1-6a part 4 proof: a scratch code (% or %) already exists', v_code, v_code2;
    END IF;
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_code, v_tag, true), (v_code2, v_tag || '-2', true);
    SELECT a.id INTO v_anc FROM public.locations a WHERE a.country_code = v_code AND a.level = 'country' AND a.name_en = v_tag
     AND a.name_en LIKE 'e2e-mig-%';
    SELECT a.id INTO v_anc2 FROM public.locations a WHERE a.country_code = v_code2 AND a.level = 'country'
     AND a.name_en = v_tag || '-2' AND a.name_en LIKE 'e2e-mig-%';
    IF v_anc IS NULL OR v_anc2 IS NULL THEN RAISE EXCEPTION 'F1-6a part 4 proof: a scratch market has no anchor'; END IF;
    UPDATE public.locations SET is_active = true WHERE id IN (v_anc, v_anc2) AND name_en LIKE 'e2e-mig-f16a4-%';
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
      (v_nf, v_tag || '-n@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_plain, v_tag || '-p@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_deact, v_tag || '-d@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO public.legal_acceptances (user_id, version_id, language, method)
    SELECT u, v.id, v_lang, 'e2e-mig' FROM public.legal_versions v, unnest(ARRAY[v_a, v_s, v_c, v_nf, v_plain, v_deact]) u
     WHERE v.status = 'published' AND v.effective_at <= now();
    -- The scratch callers' own ceiling: no verdict below rests on the live dial's value (rule 30 scan, point 4).
    INSERT INTO public.rate_overrides (user_id, action, max_count)
    SELECT u, d, 1000 FROM unnest(ARRAY[v_s, v_c, v_nf, v_plain, v_deact]) u, unnest(ARRAY['staff_moderation', 'revise']) d;
    UPDATE public.profiles SET account_status = 'deactivated'
     WHERE user_id = v_deact
       AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = v_deact AND u.email LIKE 'e2e-mig-%');
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-enforce', v_tag) RETURNING id INTO v_role;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'listings' AND p.action = 'enforce';
    IF (SELECT count(*) FROM public.role_permissions WHERE role_id = v_role) <> 1 THEN
      RAISE EXCEPTION 'F1-6a part 4 proof: listings:enforce is not declared';
    END IF;
    INSERT INTO public.user_roles (user_id, role_id, scope_type)
    VALUES (v_s, v_role, 'global'), (v_nf, v_role, 'global'), (v_deact, v_role, 'global');
    INSERT INTO public.user_roles (user_id, role_id, scope_type, scope_country) VALUES (v_c, v_role, 'country', v_code);
    INSERT INTO auth.mfa_factors (id, user_id, friendly_name, factor_type, status, created_at, updated_at)
    VALUES (gen_random_uuid(), v_s, v_tag || '-f', 'totp', 'verified', now(), now()),
           (gen_random_uuid(), v_c, v_tag || '-f2', 'totp', 'verified', now(), now());
    INSERT INTO auth.sessions (id, user_id, created_at, updated_at, aal)
    VALUES (v_sess, v_s, now(), now(), 'aal2'), (v_sess2, v_c, now(), now(), 'aal2');
    INSERT INTO auth.mfa_amr_claims (id, session_id, created_at, updated_at, authentication_method)
    VALUES (gen_random_uuid(), v_sess, now(), now(), 'totp'), (gen_random_uuid(), v_sess2, now(), now(), 'totp');
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES (v_tag || ' leaf', v_tag, true, true, true, 9999) RETURNING id INTO v_cat;
    INSERT INTO public.listing_packages (key, kind, name_en, days, enabled, self_serve, extends_lifetime, sort)
    VALUES (v_r0, 'reach', v_tag || ' reach', 30, true, true, false, 9001);
    INSERT INTO public.market_settings (country_code, free_regular_ads, included_reach, paid_levels)
    VALUES (v_code, 20, v_r0, false), (v_code2, 20, v_r0, false);
    -- v_l1, v_l2: a seller's in XZ; v_l3: the global enforcer's own; v_l4: a seller's in XY.
    INSERT INTO public.listings (id, seller_id, category_id, location_id, title, description, home_country_code, price_mode,
                                 status, published_at, published_first_at, expires_at)
    VALUES (v_l1, v_a, v_cat, v_city, v_tag || ' scratch ad', 'A scratch ad for the move proof.', v_code, 'free', 'active',
            now(), now(), now() + interval '10 days'),
           (v_l2, v_a, v_cat, v_city, v_tag || ' scratch ad', 'A scratch ad for the edit proof.', v_code, 'free', 'active',
            now(), now(), now() + interval '10 days'),
           (v_l3, v_s, v_cat, v_city, v_tag || ' own ad', 'A scratch ad for the move proof.', v_code, 'free', 'active',
            now(), now(), now() + interval '10 days'),
           (v_l4, v_a, v_cat, v_city2, v_tag || ' other ad', 'A scratch ad for the edit proof.', v_code2, 'free', 'active',
            now(), now(), now() + interval '10 days');
    SELECT coalesce(sum(count), 0) INTO v_move0 FROM public.door_refusals WHERE day = current_date AND door = 'admin_move_listing';
    SELECT coalesce(sum(count), 0) INTO v_edit0 FROM public.door_refusals WHERE day = current_date AND door = 'admin_edit_listing';

    -- (b) the gates, each door.
    FOREACH v_door IN ARRAY ARRAY['admin_move_listing', 'admin_edit_listing'] LOOP
      PERFORM set_config('request.jwt.claims', '{}', true);
      IF v_door = 'admin_move_listing' THEN v_answer := public.admin_move_listing(v_l1, 'removed', 'rules', NULL);
      ELSE v_answer := public.admin_edit_listing(v_l2, v_title, 'rules', NULL); END IF;
      IF (v_answer ->> 'message', current_setting('response.status', true)) IS DISTINCT FROM ('notSignedIn', '401') THEN
        RAISE EXCEPTION 'F1-6a part 4 proof (b): no caller''s % answered %', v_door, v_answer;
      END IF;
      PERFORM set_config('request.jwt.claims', json_build_object('sub', v_plain::text, 'role', 'authenticated')::text, true);
      IF v_door = 'admin_move_listing' THEN v_answer := public.admin_move_listing(v_l1, 'removed', 'rules', NULL);
      ELSE v_answer := public.admin_edit_listing(v_l2, v_title, 'rules', NULL); END IF;
      IF (v_answer ->> 'message', current_setting('response.status', true)) IS DISTINCT FROM ('permissionDenied', '403') THEN
        RAISE EXCEPTION 'F1-6a part 4 proof (b): % without listings:enforce answered %', v_door, v_answer;
      END IF;
      PERFORM set_config('request.jwt.claims', json_build_object('sub', v_deact::text, 'role', 'authenticated')::text, true);
      IF v_door = 'admin_move_listing' THEN v_answer := public.admin_move_listing(v_l1, 'removed', 'rules', NULL);
      ELSE v_answer := public.admin_edit_listing(v_l2, v_title, 'rules', NULL); END IF;
      IF (v_answer ->> 'message', current_setting('response.status', true)) IS DISTINCT FROM ('accountDeactivated', '403') THEN
        RAISE EXCEPTION 'F1-6a part 4 proof (b): a deactivated holder''s % answered %', v_door, v_answer;
      END IF;
      PERFORM set_config('request.jwt.claims', json_build_object('sub', v_nf::text, 'role', 'authenticated')::text, true);
      BEGIN
        IF v_door = 'admin_move_listing' THEN v_answer := public.admin_move_listing(v_l1, 'removed', 'rules', NULL);
        ELSE v_answer := public.admin_edit_listing(v_l2, v_title, 'rules', NULL); END IF;
        v_msg := 'answered ' || coalesce(v_answer::text, 'NULL');
      EXCEPTION WHEN SQLSTATE 'P0009' THEN
        GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
      END;
      IF v_msg IS DISTINCT FROM 'step-up required: no verified factor' THEN
        RAISE EXCEPTION 'F1-6a part 4 proof (b): a holder without a factor got % from %', v_msg, v_door;
      END IF;
    END LOOP;

    -- (c) the codes: the global enforcer passes the gate.
    PERFORM set_config('request.jwt.claims', v_cs, true);
    v_answer := public.admin_move_listing(v_l1, 'bogus', 'rules', NULL);
    IF (v_answer ->> 'message', current_setting('response.status', true)) IS DISTINCT FROM ('badValue:to', '400') THEN
      RAISE EXCEPTION 'F1-6a part 4 proof (c): a move to no status answered %', v_answer;
    END IF;
    v_answer := public.admin_move_listing(gen_random_uuid(), 'removed', 'rules', NULL);
    IF (v_answer ->> 'message', current_setting('response.status', true)) IS DISTINCT FROM ('listingNotFound', '400') THEN
      RAISE EXCEPTION 'F1-6a part 4 proof (c): a move of no ad answered %', v_answer;
    END IF;
    v_answer := public.admin_move_listing(v_l3, 'removed', 'rules', NULL);
    IF (v_answer ->> 'message', current_setting('response.status', true)) IS DISTINCT FROM ('ownListing', '400') THEN
      RAISE EXCEPTION 'F1-6a part 4 proof (c): a move of the enforcer''s own ad answered %', v_answer;
    END IF;
    v_answer := public.admin_edit_listing(v_l2, v_title, 'bogus', NULL);
    IF (v_answer ->> 'message', current_setting('response.status', true)) IS DISTINCT FROM ('badValue:reason', '400') THEN
      RAISE EXCEPTION 'F1-6a part 4 proof (c): an edit with no reason answered %', v_answer;
    END IF;
    v_answer := public.admin_edit_listing(v_l2, '{}'::jsonb, 'rules', NULL);
    IF (v_answer ->> 'message', current_setting('response.status', true)) IS DISTINCT FROM ('nothingChanged', '400') THEN
      RAISE EXCEPTION 'F1-6a part 4 proof (c): an empty edit answered %', v_answer;
    END IF;
    v_answer := public.admin_edit_listing(gen_random_uuid(), v_title, 'rules', NULL);
    IF (v_answer ->> 'message', current_setting('response.status', true)) IS DISTINCT FROM ('listingNotFound', '400') THEN
      RAISE EXCEPTION 'F1-6a part 4 proof (c): an edit of no ad answered %', v_answer;
    END IF;
    v_answer := public.admin_edit_listing(v_l3, v_title, 'rules', NULL);
    IF (v_answer ->> 'message', current_setting('response.status', true)) IS DISTINCT FROM ('ownListing', '400') THEN
      RAISE EXCEPTION 'F1-6a part 4 proof (c): an edit of the enforcer''s own ad answered %', v_answer;
    END IF;
    IF EXISTS (SELECT 1 FROM public.listings WHERE id IN (v_l1, v_l2, v_l3) AND (status <> 'active' OR title LIKE '%edited ad'))
       OR EXISTS (SELECT 1 FROM public.audit_log WHERE entity_type = 'listing' AND entity_id IN (v_l1::text, v_l2::text, v_l3::text))
       OR EXISTS (SELECT 1 FROM public.seller_notices WHERE listing_id IN (v_l1, v_l2, v_l3)) THEN
      RAISE EXCEPTION 'F1-6a part 4 proof (c): a refused call wrote a row';
    END IF;

    -- (d) the global enforcer removes v_l1; then its move again and its edit find it removed.
    v_answer := public.admin_move_listing(v_l1, 'removed', 'rules', NULL);
    IF v_answer IS DISTINCT FROM jsonb_build_object('ok', true, 'kind', 'admin_remove', 'status', 'removed') THEN
      RAISE EXCEPTION 'F1-6a part 4 proof (d): the removal answered %', v_answer;
    END IF;
    v_answer := public.admin_move_listing(v_l1, 'removed', 'rules', NULL);
    IF (v_answer ->> 'message', current_setting('response.status', true))
         IS DISTINCT FROM ('illegalTransition:removed-removed', '400') THEN
      RAISE EXCEPTION 'F1-6a part 4 proof (c): a second removal answered %', v_answer;
    END IF;
    v_answer := public.admin_edit_listing(v_l1, v_title, 'rules', NULL);
    IF (v_answer ->> 'message', current_setting('response.status', true)) IS DISTINCT FROM ('listingRemoved', '400') THEN
      RAISE EXCEPTION 'F1-6a part 4 proof (c): an edit of a removed ad answered %', v_answer;
    END IF;

    -- (c, d) the country enforcer: its country's ad, never another's, and no move (the move is global).
    PERFORM set_config('request.jwt.claims', v_cc, true);
    v_answer := public.admin_edit_listing(v_l4, v_title, 'rules', NULL);
    IF (v_answer ->> 'message', current_setting('response.status', true)) IS DISTINCT FROM ('permissionDenied:scope', '403') THEN
      RAISE EXCEPTION 'F1-6a part 4 proof (c): a country enforcer''s edit of another country''s ad answered %', v_answer;
    END IF;
    v_answer := public.admin_move_listing(v_l2, 'removed', 'rules', NULL);
    IF (v_answer ->> 'message', current_setting('response.status', true)) IS DISTINCT FROM ('permissionDenied:scope', '403') THEN
      RAISE EXCEPTION 'F1-6a part 4 proof (c): a country enforcer''s move answered %', v_answer;
    END IF;
    v_answer := public.admin_edit_listing(v_l2, v_title, 'rules', NULL);
    IF NOT coalesce(v_answer ->> 'ok' = 'true', false) THEN
      RAISE EXCEPTION 'F1-6a part 4 proof (d): a country enforcer''s edit of its country''s ad answered %', v_answer;
    END IF;
    IF NOT coalesce((SELECT title = v_tag || ' edited ad' FROM public.listings WHERE id = v_l2), false)
       OR NOT coalesce((SELECT status = 'removed' FROM public.listings WHERE id = v_l1), false)
       OR EXISTS (SELECT 1 FROM public.listings WHERE id IN (v_l3, v_l4) AND (status <> 'active' OR title LIKE '%edited ad')) THEN
      RAISE EXCEPTION 'F1-6a part 4 proof (d): the decisions did not land as answered';
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);

    -- (e) the tallies.
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_s::text AND action = 'staff_moderation';
    IF v_count <> 10 THEN
      RAISE EXCEPTION 'F1-6a part 4 proof (e): staff_moderation counted % for the global enforcer (expected 10)', v_count;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_c::text AND action = 'staff_moderation';
    IF v_count <> 1 THEN
      RAISE EXCEPTION 'F1-6a part 4 proof (e): staff_moderation counted % for the country enforcer (expected 1)', v_count;
    END IF;
    IF EXISTS (SELECT 1 FROM public.rate_limits WHERE key IN (v_nf::text, v_plain::text, v_deact::text, v_a::text))
       OR EXISTS (SELECT 1 FROM public.rate_limits WHERE key IN (v_s::text, v_c::text) AND action <> 'staff_moderation') THEN
      RAISE EXCEPTION 'F1-6a part 4 proof (e): a refused caller or another dial (revise) was counted';
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date AND door = 'admin_move_listing')
         IS DISTINCT FROM v_move0 + 8
       OR (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date AND door = 'admin_edit_listing')
         IS DISTINCT FROM v_edit0 + 9 THEN
      RAISE EXCEPTION 'F1-6a part 4 proof (e): door_refusals did not meter the 8 + 9 refusals';
    END IF;

    RAISE EXCEPTION 'f1-6a-part-4-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f1-6a-part-4-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261118070300') ON CONFLICT DO NOTHING;
