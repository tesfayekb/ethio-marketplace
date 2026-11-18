-- e2e-areas: admin-listings

-- Foundations 1, turn F1-6a, part 3 of 9 — THE PHOTO DOORS ONTO DOOR_CONTEXT AND THE SHELL
-- (DEC-333; brief docs/governance/briefs/f1-doors-6a.md, ruling 1 §2 DEC-401; census
-- docs/governance/reports/f1-doors-6a.census.md).
-- admin_allow_listing_photo and admin_review_photo_change are redeclared WHOLE from their last declarations (live md5s
-- checked): each opens with ONE door_context('staff', listings:review, staff_moderation, global) gate — caller,
-- deactivation, the permission, the second factor the permission asks, the dial — then calls its core (part 1:
-- codes), inside the shell. admin_review_photo_change gains the second factor (DEC-401: its manifest line says
-- `row`) and the deactivation gate; its sentences 'not authenticated' → notSignedIn and 'forbidden' →
-- permissionDenied. admin_allow_listing_photo's 'not signed in', 'permission denied', 'account is deactivated',
-- 'rateLimited' fold into door_context's codes. The cores' own refusals (reviewGone, ownListing, changeGone) reach the
-- shell as codes.

DO $pre$
DECLARE
  v_md5 text;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261118070100') THEN
    RAISE EXCEPTION 'F1-6a part 3: part 2 (mark 20261118070100) must be applied first';
  END IF;
  SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p
   WHERE p.oid = 'public.admin_allow_listing_photo(uuid)'::regprocedure;
  IF v_md5 IS DISTINCT FROM '9f5b886f04da4fcfb9df0dfaa5ee7518' THEN
    RAISE EXCEPTION 'F1-6a part 3: the live admin_allow_listing_photo is not its last declaration''s body (%)', v_md5;
  END IF;
  SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p
   WHERE p.oid = 'public.admin_review_photo_change(uuid)'::regprocedure;
  IF v_md5 IS DISTINCT FROM 'a51ff98a20f550365c5e39ae8646a39e' THEN
    RAISE EXCEPTION 'F1-6a part 3: the live admin_review_photo_change is not its last declaration''s body (%)', v_md5;
  END IF;
END $pre$;

-- ------------------------------------------------------------ 1. admin_allow_listing_photo (whole from 20261028233839 :65; door_context, the shell)
CREATE OR REPLACE FUNCTION public.admin_allow_listing_photo(p_photo_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 VOLATILE
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  -- D178 — showing a photo the screen held back is a person's decision, made as an ad's approval is: the gate asks
  -- listings:review's second factor, then the dial, then the shared core.
  PERFORM public.door_context('staff', 'listings', 'review', 'staff_moderation', NULL, 'global');
  RETURN public.admin_allow_listing_photo_core(p_photo_id);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_allow_listing_photo', 'staff_moderation', SQLERRM);
END $function$;
REVOKE ALL ON FUNCTION public.admin_allow_listing_photo(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_allow_listing_photo(uuid) TO authenticated, service_role;

-- ------------------------------------------------------------ 2. admin_review_photo_change (whole from 20261028233839 :115; door_context, the shell)
CREATE OR REPLACE FUNCTION public.admin_review_photo_change(p_change_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 VOLATILE
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  -- DEC-401 — marking a photo change seen is the reviewer's decision: the gate asks listings:review's second factor,
  -- then the dial, then the shared core.
  PERFORM public.door_context('staff', 'listings', 'review', 'staff_moderation', NULL, 'global');
  RETURN public.admin_review_photo_change_core(p_change_id);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_review_photo_change', 'staff_moderation', SQLERRM);
END $function$;
REVOKE ALL ON FUNCTION public.admin_review_photo_change(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_review_photo_change(uuid) TO authenticated, service_role;

-- ------------------------------------------------------------ 3. PROOFS
-- (a) catalog facts of both doors: VOLATILE SECURITY DEFINER, RETURNS jsonb, EXECUTE for authenticated and the service
--     role, never anon or PUBLIC; each body this file's (md5).
-- (b) the gates of both: no caller notSignedIn (401); a person without listings:review permissionDenied (403); a
--     deactivated holder accountDeactivated (403); a holder with no verified factor 'step-up required: no verified
--     factor' (P0009) — the change review's new second factor (DEC-401).
-- (c) the codes with every earlier check cleared: reviewGone, ownListing (the reviewer's own ad), changeGone; 400,
--     nothing written.
-- (d) the reviewer allows a held photo and marks a change seen: {ok:true}, one audit row each.
-- (e) staff_moderation counted once per call past the gate (5); none for a caller the gate refused; every refusal
--     metered (5 + 4).
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
  v_nf      uuid := gen_random_uuid();
  v_plain   uuid := gen_random_uuid();
  v_deact   uuid := gen_random_uuid();
  v_sess    uuid := gen_random_uuid();
  v_cs      text;
  v_role    uuid;
  v_anc     uuid;
  v_region  uuid;
  v_city    uuid;
  v_cat     uuid;
  v_l1      uuid := gen_random_uuid();
  v_l2      uuid := gen_random_uuid();
  v_p1      uuid;
  v_p2      uuid;
  v_ch      uuid;
  v_answer  jsonb;
  v_allow0  bigint;
  v_review0 bigint;
  v_count   integer;
  v_msg     text;
  v_door    text;
  v_fn      regprocedure;
BEGIN
  FOREACH v_door IN ARRAY ARRAY['admin_allow_listing_photo', 'admin_review_photo_change'] LOOP
    v_fn := ('public.' || v_door || '(uuid)')::regprocedure;
    IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' OR prorettype <> 'jsonb'::regtype
          FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-6a part 3 proof (a): %''s header, return type or grants differ', v_door;
    END IF;
  END LOOP;
  IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = 'public.admin_allow_listing_photo(uuid)'::regprocedure)
     IS DISTINCT FROM '9f5c856e1af165ead24b31da2f678f7a'
     OR (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = 'public.admin_review_photo_change(uuid)'::regprocedure)
     IS DISTINCT FROM '1a2128b78faff0b67d2d8737ce1acf9c' THEN
    RAISE EXCEPTION 'F1-6a part 3 proof (a): a photo door''s body differs from this file';
  END IF;

  v_tag := 'e2e-mig-f16a3-' || substr(v_hex, 1, 10);
  v_r0 := 'e2e_mig_r0_' || substr(v_hex, 11, 8);
  v_cs := json_build_object('sub', v_s::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text;
  BEGIN
    PERFORM set_config('request.jwt.claims', '{}', true);
    IF EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
      RAISE EXCEPTION 'F1-6a part 3 proof: scratch code % already exists', v_code;
    END IF;
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_code, v_tag, true);
    SELECT a.id INTO v_anc FROM public.locations a WHERE a.country_code = v_code AND a.level = 'country' AND a.name_en = v_tag
     AND a.name_en LIKE 'e2e-mig-%';
    IF v_anc IS NULL THEN RAISE EXCEPTION 'F1-6a part 3 proof: the scratch market has no anchor'; END IF;
    UPDATE public.locations SET is_active = true WHERE id = v_anc AND name_en = v_tag AND name_en LIKE 'e2e-mig-%';
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id)
    VALUES ('region', v_code, v_tag || ' region', v_tag || '-r', true, v_anc) RETURNING id INTO v_region;
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id, center_lat, center_lng)
    VALUES ('city', v_code, v_tag || ' city', v_tag || '-c', true, v_region, 9.03, 38.74) RETURNING id INTO v_city;
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
      (v_a, v_tag || '-a@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_s, v_tag || '-s@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_nf, v_tag || '-n@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_plain, v_tag || '-p@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_deact, v_tag || '-d@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO public.legal_acceptances (user_id, version_id, language, method)
    SELECT u, v.id, v_lang, 'e2e-mig' FROM public.legal_versions v, unnest(ARRAY[v_a, v_s, v_nf, v_plain, v_deact]) u
     WHERE v.status = 'published' AND v.effective_at <= now();
    -- The scratch callers' own ceiling: no verdict below rests on the live dial's value (rule 30 scan, point 4).
    INSERT INTO public.rate_overrides (user_id, action, max_count)
    SELECT u, 'staff_moderation', 1000 FROM unnest(ARRAY[v_s, v_nf, v_plain, v_deact]) u;
    UPDATE public.profiles SET account_status = 'deactivated'
     WHERE user_id = v_deact
       AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = v_deact AND u.email LIKE 'e2e-mig-%');
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-review', v_tag) RETURNING id INTO v_role;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'listings' AND p.action = 'review';
    IF (SELECT count(*) FROM public.role_permissions WHERE role_id = v_role) <> 1 THEN
      RAISE EXCEPTION 'F1-6a part 3 proof: listings:review is not declared';
    END IF;
    INSERT INTO public.user_roles (user_id, role_id, scope_type)
    VALUES (v_s, v_role, 'global'), (v_nf, v_role, 'global'), (v_deact, v_role, 'global');
    INSERT INTO auth.mfa_factors (id, user_id, friendly_name, factor_type, status, created_at, updated_at)
    VALUES (gen_random_uuid(), v_s, v_tag || '-f', 'totp', 'verified', now(), now());
    INSERT INTO auth.sessions (id, user_id, created_at, updated_at, aal) VALUES (v_sess, v_s, now(), now(), 'aal2');
    INSERT INTO auth.mfa_amr_claims (id, session_id, created_at, updated_at, authentication_method)
    VALUES (gen_random_uuid(), v_sess, now(), now(), 'totp');
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES (v_tag || ' leaf', v_tag, true, true, true, 9999) RETURNING id INTO v_cat;
    INSERT INTO public.listing_packages (key, kind, name_en, days, enabled, self_serve, extends_lifetime, sort)
    VALUES (v_r0, 'reach', v_tag || ' reach', 30, true, true, false, 9001);
    INSERT INTO public.market_settings (country_code, free_regular_ads, included_reach, paid_levels)
    VALUES (v_code, 20, v_r0, false);
    -- v_l1 is a seller's; v_l2 the reviewer's own.
    INSERT INTO public.listings (id, seller_id, category_id, location_id, title, description, home_country_code, price_mode,
                                 status, published_at, published_first_at, expires_at)
    VALUES (v_l1, v_a, v_cat, v_city, v_tag || ' scratch ad', 'A scratch ad for the photo proof.', v_code, 'free', 'active',
            now(), now(), now() + interval '10 days'),
           (v_l2, v_s, v_cat, v_city, v_tag || ' own ad', 'A scratch ad for the photo proof.', v_code, 'free', 'active',
            now(), now(), now() + interval '10 days');
    INSERT INTO public.listing_photos (listing_id, storage_path, display_order, unscreened)
    VALUES (v_l1, v_tag || '/' || v_l1 || '/1.webp', 0, true) RETURNING id INTO v_p1;
    INSERT INTO public.listing_photos (listing_id, storage_path, display_order, unscreened)
    VALUES (v_l2, v_tag || '/' || v_l2 || '/1.webp', 0, true) RETURNING id INTO v_p2;
    INSERT INTO public.listing_photo_reviews (photo_id, listing_id, label) VALUES (v_p1, v_l1, 'held'), (v_p2, v_l2, 'held');
    INSERT INTO public.listing_photo_changes (listing_id, kind, photo_id) VALUES (v_l1, 'added', v_p1) RETURNING id INTO v_ch;
    SELECT coalesce(sum(count), 0) INTO v_allow0 FROM public.door_refusals
     WHERE day = current_date AND door = 'admin_allow_listing_photo';
    SELECT coalesce(sum(count), 0) INTO v_review0 FROM public.door_refusals
     WHERE day = current_date AND door = 'admin_review_photo_change';

    -- (b) the gates, each door.
    FOREACH v_door IN ARRAY ARRAY['admin_allow_listing_photo', 'admin_review_photo_change'] LOOP
      PERFORM set_config('request.jwt.claims', '{}', true);
      EXECUTE format('SELECT public.%I($1)', v_door) INTO v_answer USING CASE v_door WHEN 'admin_allow_listing_photo' THEN v_p1 ELSE v_ch END;
      IF (v_answer ->> 'message', current_setting('response.status', true)) IS DISTINCT FROM ('notSignedIn', '401') THEN
        RAISE EXCEPTION 'F1-6a part 3 proof (b): no caller''s % answered %', v_door, v_answer;
      END IF;
      PERFORM set_config('request.jwt.claims', json_build_object('sub', v_plain::text, 'role', 'authenticated')::text, true);
      EXECUTE format('SELECT public.%I($1)', v_door) INTO v_answer USING CASE v_door WHEN 'admin_allow_listing_photo' THEN v_p1 ELSE v_ch END;
      IF (v_answer ->> 'message', current_setting('response.status', true)) IS DISTINCT FROM ('permissionDenied', '403') THEN
        RAISE EXCEPTION 'F1-6a part 3 proof (b): % without listings:review answered %', v_door, v_answer;
      END IF;
      PERFORM set_config('request.jwt.claims', json_build_object('sub', v_deact::text, 'role', 'authenticated')::text, true);
      EXECUTE format('SELECT public.%I($1)', v_door) INTO v_answer USING CASE v_door WHEN 'admin_allow_listing_photo' THEN v_p1 ELSE v_ch END;
      IF (v_answer ->> 'message', current_setting('response.status', true)) IS DISTINCT FROM ('accountDeactivated', '403') THEN
        RAISE EXCEPTION 'F1-6a part 3 proof (b): a deactivated holder''s % answered %', v_door, v_answer;
      END IF;
      PERFORM set_config('request.jwt.claims', json_build_object('sub', v_nf::text, 'role', 'authenticated')::text, true);
      BEGIN
        EXECUTE format('SELECT public.%I($1)', v_door) INTO v_answer USING CASE v_door WHEN 'admin_allow_listing_photo' THEN v_p1 ELSE v_ch END;
        v_msg := 'answered ' || coalesce(v_answer::text, 'NULL');
      EXCEPTION WHEN SQLSTATE 'P0009' THEN
        GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
      END;
      IF v_msg IS DISTINCT FROM 'step-up required: no verified factor' THEN
        RAISE EXCEPTION 'F1-6a part 3 proof (b): a holder without a factor got % from %', v_msg, v_door;
      END IF;
    END LOOP;

    -- (c) the codes: the reviewer passes the gate.
    PERFORM set_config('request.jwt.claims', v_cs, true);
    v_answer := public.admin_allow_listing_photo(gen_random_uuid());
    IF (v_answer ->> 'message', current_setting('response.status', true)) IS DISTINCT FROM ('reviewGone', '400') THEN
      RAISE EXCEPTION 'F1-6a part 3 proof (c): allowing no held photo answered %', v_answer;
    END IF;
    v_answer := public.admin_allow_listing_photo(v_p2);
    IF (v_answer ->> 'message', current_setting('response.status', true)) IS DISTINCT FROM ('ownListing', '400') THEN
      RAISE EXCEPTION 'F1-6a part 3 proof (c): allowing the reviewer''s own photo answered %', v_answer;
    END IF;
    v_answer := public.admin_review_photo_change(gen_random_uuid());
    IF (v_answer ->> 'message', current_setting('response.status', true)) IS DISTINCT FROM ('changeGone', '400') THEN
      RAISE EXCEPTION 'F1-6a part 3 proof (c): marking no change seen answered %', v_answer;
    END IF;
    IF EXISTS (SELECT 1 FROM public.listing_photo_reviews WHERE photo_id IN (v_p1, v_p2) AND decided_at IS NOT NULL)
       OR EXISTS (SELECT 1 FROM public.listing_photos WHERE id IN (v_p1, v_p2) AND NOT unscreened)
       OR EXISTS (SELECT 1 FROM public.listing_photo_changes WHERE id = v_ch AND reviewed_at IS NOT NULL)
       OR EXISTS (SELECT 1 FROM public.audit_log WHERE entity_type = 'listing' AND entity_id IN (v_l1::text, v_l2::text)) THEN
      RAISE EXCEPTION 'F1-6a part 3 proof (c): a refused call wrote a row';
    END IF;

    -- (d) the decisions.
    v_answer := public.admin_allow_listing_photo(v_p1);
    IF v_answer IS DISTINCT FROM jsonb_build_object('ok', true, 'photo', v_p1, 'listing', v_l1) THEN
      RAISE EXCEPTION 'F1-6a part 3 proof (d): allowing a held photo answered %', v_answer;
    END IF;
    v_answer := public.admin_review_photo_change(v_ch);
    IF v_answer IS DISTINCT FROM jsonb_build_object('ok', true, 'change', v_ch) THEN
      RAISE EXCEPTION 'F1-6a part 3 proof (d): marking a change seen answered %', v_answer;
    END IF;
    IF NOT coalesce((SELECT decided_by = v_s AND decision = 'allowed' FROM public.listing_photo_reviews WHERE photo_id = v_p1), false)
       OR NOT coalesce((SELECT reviewed_by = v_s FROM public.listing_photo_changes WHERE id = v_ch), false)
       OR (SELECT count(*) FROM public.audit_log WHERE actor_id = v_s AND entity_id = v_l1::text
             AND action IN ('listing.photo_allowed', 'listing.photo_change_reviewed')) <> 2 THEN
      RAISE EXCEPTION 'F1-6a part 3 proof (d): a decision was not written once';
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);

    -- (e) the tallies: the reviewer's 5 calls past the gate.
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_s::text AND action = 'staff_moderation';
    IF v_count <> 5 THEN
      RAISE EXCEPTION 'F1-6a part 3 proof (e): staff_moderation counted % for the reviewer (expected 5)', v_count;
    END IF;
    IF EXISTS (SELECT 1 FROM public.rate_limits WHERE key IN (v_nf::text, v_plain::text, v_deact::text, v_a::text))
       OR EXISTS (SELECT 1 FROM public.rate_limits WHERE key = v_s::text AND action <> 'staff_moderation') THEN
      RAISE EXCEPTION 'F1-6a part 3 proof (e): a refused caller or another dial was counted';
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date AND door = 'admin_allow_listing_photo')
         IS DISTINCT FROM v_allow0 + 5
       OR (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date AND door = 'admin_review_photo_change')
         IS DISTINCT FROM v_review0 + 4 THEN
      RAISE EXCEPTION 'F1-6a part 3 proof (e): door_refusals did not meter the 5 + 4 refusals';
    END IF;

    RAISE EXCEPTION 'f1-6a-part-3-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f1-6a-part-3-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261118070200') ON CONFLICT DO NOTHING;
