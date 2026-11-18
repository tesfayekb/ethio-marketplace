-- e2e-areas: admin-listings, screening, listings

-- Foundations 1, turn F1-6a, part 6 of 9 — THE REVIEWER'S OWN DOOR; TRANSITION_LISTING THE OWNER'S AND THE SERVICE'S
-- (DEC-333; brief docs/governance/briefs/f1-doors-6a.md, ruling 1 §3 DEC-402; census
-- docs/governance/reports/f1-doors-6a.census.md, appendix E).
-- NEW admin_review_listing(uuid, text): the screening console's decision — ONE door_context('staff', listings:review,
-- staff_moderation, global) gate (caller, deactivation, the permission, its second factor, the dial), the review
-- statuses only (active, reduced, rejected, held; else badValue:status), then transition_listing_core, whose
-- reviewer branch and transition table decide, inside the shell.
-- transition_listing is redeclared WHOLE from its last declaration (live md5 checked): the owner gate as before, then
-- a signed-in caller who is not the ad's seller is refused notYourListing (a missing ad the same, DEC-391) before the
-- core; the service role (no caller) reaches the core as before. transition_listing_core is unchanged (md5 checked).

DO $pre$
DECLARE
  v_md5 text;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261118070400') THEN
    RAISE EXCEPTION 'F1-6a part 6: part 5 (mark 20261118070400) must be applied first';
  END IF;
  SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p
   WHERE p.oid = 'public.transition_listing(uuid,text)'::regprocedure;
  IF v_md5 IS DISTINCT FROM '162b76e76b15eb016f0cbb5d0a2629da' THEN
    RAISE EXCEPTION 'F1-6a part 6: the live transition_listing is not its last declaration''s body (%)', v_md5;
  END IF;
  SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p
   WHERE p.oid = 'public.transition_listing_core(uuid,text)'::regprocedure;
  IF v_md5 IS DISTINCT FROM '8281cf2fe98b3e674015f4c089db6f39' THEN
    RAISE EXCEPTION 'F1-6a part 6: the live transition_listing_core is not its last declaration''s body (%)', v_md5;
  END IF;
  IF to_regprocedure('public.admin_review_listing(uuid,text)') IS NOT NULL THEN
    RAISE EXCEPTION 'F1-6a part 6: admin_review_listing already exists';
  END IF;
END $pre$;

-- ------------------------------------------------------------ 1. transition_listing (whole from 20261115204400 :40; the owner's own ad)
CREATE OR REPLACE FUNCTION public.transition_listing(p_listing_id uuid, p_new_status text)
 RETURNS jsonb
 LANGUAGE plpgsql
 VOLATILE
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid    uuid := auth.uid();
  v_seller uuid;
BEGIN
  -- F1-6a (ruling 1 §3, DEC-402) — the owner's door: the owner gate (signed in, active, revise), then the caller's ad only
  -- (a missing one alike, DEC-391); a reviewer decides through admin_review_listing, an enforcer through
  -- admin_move_listing. The service role (no caller) reaches the state machine as before.
  PERFORM public.door_context('owner', NULL, NULL, 'revise');
  IF v_uid IS NOT NULL THEN
    SELECT l.seller_id INTO v_seller FROM public.listings l WHERE l.id = p_listing_id;
    IF v_seller IS DISTINCT FROM v_uid THEN
      PERFORM public.door_refuse('notYourListing');
    END IF;
  END IF;
  RETURN public.transition_listing_core(p_listing_id, p_new_status);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('transition_listing', 'revise', SQLERRM);
END $function$;
REVOKE ALL ON FUNCTION public.transition_listing(uuid, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.transition_listing(uuid, text) TO authenticated, service_role;

-- ------------------------------------------------------------ 2. admin_review_listing (new; the reviewer's decision)
CREATE FUNCTION public.admin_review_listing(p_listing_id uuid, p_new_status text)
 RETURNS jsonb
 LANGUAGE plpgsql
 VOLATILE
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  -- DEC-402 — the reviewer's door: listings:review with its second factor, the dial staff_moderation, then the state
  -- machine's review transitions only (screening or held → active, reduced, rejected, held).
  PERFORM public.door_context('staff', 'listings', 'review', 'staff_moderation', NULL, 'global');
  IF p_new_status IS NULL OR p_new_status NOT IN ('active','reduced','rejected','held') THEN
    PERFORM public.door_refuse('badValue', 'status');
  END IF;
  RETURN public.transition_listing_core(p_listing_id, p_new_status);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_review_listing', 'staff_moderation', SQLERRM);
END $function$;
COMMENT ON FUNCTION public.admin_review_listing(uuid, text) IS
  'DEC-402 (F1-6a): the screening console''s decision on an ad in screening or held — listings:review with its second factor, staff_moderation, the review statuses only, then transition_listing_core; refusals through door_refused.';
REVOKE ALL ON FUNCTION public.admin_review_listing(uuid, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_review_listing(uuid, text) TO authenticated, service_role;

-- ------------------------------------------------------------ 3. PROOFS
-- (a) catalog facts of both: VOLATILE SECURITY DEFINER, RETURNS jsonb, EXECUTE for authenticated and the service role,
--     never anon or PUBLIC; each body this file's (md5).
-- (b) the review door's gates: no caller notSignedIn (401); a person without listings:review permissionDenied (403); a
--     deactivated reviewer accountDeactivated (403); a reviewer with no verified factor 'step-up required: no
--     verified factor' (P0009). transition_listing's: no caller notSignedIn (401); a deactivated seller
--     accountDeactivated (403).
-- (c) transition_listing refuses every signed-in caller but the seller, notYourListing (400): a person, a reviewer, an
--     enforcer, and a missing ad. The review door's codes: badValue:status, illegalTransition:active-held,
--     ownerOnly:closed-active; nothing written.
-- (d) the reviewer approves an ad in screening ({ok, status active}, a state revision by the reviewer); the seller
--     closes their live ad; the service role (no caller) pauses one, spending no dial.
-- (e) staff_moderation 4 for the reviewer; revise once per transition_listing call past the gate; none for a caller
--     the gate refused; every refusal metered (review 6, transition 6).
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
  v_e       uuid := gen_random_uuid();
  v_nf      uuid := gen_random_uuid();
  v_plain   uuid := gen_random_uuid();
  v_deact   uuid := gen_random_uuid();
  v_sess    uuid := gen_random_uuid();
  v_cs      text;
  v_role    uuid;
  v_role_e  uuid;
  v_anc     uuid;
  v_region  uuid;
  v_city    uuid;
  v_cat     uuid;
  v_live    uuid := gen_random_uuid();
  v_scr     uuid := gen_random_uuid();
  v_closed  uuid := gen_random_uuid();
  v_pause   uuid := gen_random_uuid();
  v_dead    uuid := gen_random_uuid();
  v_answer  jsonb;
  v_rev0    bigint;
  v_tr0     bigint;
  v_count   integer;
  v_msg     text;
  v_fn      regprocedure;
  v_who     uuid;
BEGIN
  FOREACH v_fn IN ARRAY ARRAY['public.transition_listing(uuid,text)'::regprocedure,
                              'public.admin_review_listing(uuid,text)'::regprocedure] LOOP
    IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' OR prorettype <> 'jsonb'::regtype
          FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-6a part 6 proof (a): %''s header, return type or grants differ', v_fn;
    END IF;
  END LOOP;
  IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = 'public.transition_listing(uuid,text)'::regprocedure)
     IS DISTINCT FROM '7bd2fb3ba90fca00b806d82e1619ba41'
     OR (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = 'public.admin_review_listing(uuid,text)'::regprocedure)
     IS DISTINCT FROM '3680b277e612ee5a8c29843be78b28e8' THEN
    RAISE EXCEPTION 'F1-6a part 6 proof (a): a body differs from this file';
  END IF;

  v_tag := 'e2e-mig-f16a6-' || substr(v_hex, 1, 10);
  v_r0 := 'e2e_mig_r0_' || substr(v_hex, 11, 8);
  v_cs := json_build_object('sub', v_s::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text;
  BEGIN
    PERFORM set_config('request.jwt.claims', '{}', true);
    IF EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
      RAISE EXCEPTION 'F1-6a part 6 proof: scratch code % already exists', v_code;
    END IF;
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_code, v_tag, true);
    SELECT a.id INTO v_anc FROM public.locations a WHERE a.country_code = v_code AND a.level = 'country' AND a.name_en = v_tag
     AND a.name_en LIKE 'e2e-mig-%';
    IF v_anc IS NULL THEN RAISE EXCEPTION 'F1-6a part 6 proof: the scratch market has no anchor'; END IF;
    UPDATE public.locations SET is_active = true WHERE id = v_anc AND name_en = v_tag AND name_en LIKE 'e2e-mig-%';
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id)
    VALUES ('region', v_code, v_tag || ' region', v_tag || '-r', true, v_anc) RETURNING id INTO v_region;
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id, center_lat, center_lng)
    VALUES ('city', v_code, v_tag || ' city', v_tag || '-c', true, v_region, 9.03, 38.74) RETURNING id INTO v_city;
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
      (v_a, v_tag || '-a@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_s, v_tag || '-s@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_e, v_tag || '-e@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_nf, v_tag || '-n@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_plain, v_tag || '-p@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_deact, v_tag || '-d@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO public.legal_acceptances (user_id, version_id, language, method)
    SELECT u, v.id, v_lang, 'e2e-mig' FROM public.legal_versions v, unnest(ARRAY[v_a, v_s, v_e, v_nf, v_plain, v_deact]) u
     WHERE v.status = 'published' AND v.effective_at <= now();
    -- The scratch callers' own ceiling: no verdict below rests on the live dial's value (rule 30 scan, point 4).
    INSERT INTO public.rate_overrides (user_id, action, max_count)
    SELECT u, d, 1000 FROM unnest(ARRAY[v_a, v_s, v_e, v_nf, v_plain, v_deact]) u, unnest(ARRAY['staff_moderation', 'revise']) d;
    UPDATE public.profiles SET account_status = 'deactivated'
     WHERE user_id = v_deact
       AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = v_deact AND u.email LIKE 'e2e-mig-%');
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-review', v_tag) RETURNING id INTO v_role;
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-enforce', v_tag) RETURNING id INTO v_role_e;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'listings' AND p.action = 'review';
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role_e, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'listings' AND p.action = 'enforce';
    IF (SELECT count(*) FROM public.role_permissions WHERE role_id IN (v_role, v_role_e)) <> 2 THEN
      RAISE EXCEPTION 'F1-6a part 6 proof: listings:review or listings:enforce is not declared';
    END IF;
    INSERT INTO public.user_roles (user_id, role_id, scope_type)
    VALUES (v_s, v_role, 'global'), (v_nf, v_role, 'global'), (v_deact, v_role, 'global'), (v_e, v_role_e, 'global');
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
    -- The seller's ads: live, in screening, closed (it resumes to active), live (the service pauses it); and the
    -- deactivated reviewer's own live ad.
    INSERT INTO public.listings (id, seller_id, category_id, location_id, title, description, home_country_code, price_mode,
                                 status, published_at, published_first_at, expires_at, clock_kept, kept_remaining, resume_status)
    VALUES (v_live, v_a, v_cat, v_city, v_tag || ' live ad', 'A scratch ad for the review proof.', v_code, 'free', 'active',
            now(), now(), now() + interval '10 days', false, NULL, NULL),
           (v_scr, v_a, v_cat, v_city, v_tag || ' new ad', 'A scratch ad for the review proof.', v_code, 'free', 'screening',
            NULL, NULL, NULL, false, NULL, NULL),
           (v_closed, v_a, v_cat, v_city, v_tag || ' closed ad', 'A scratch ad for the review proof.', v_code, 'free', 'closed',
            now(), now(), NULL, true, interval '5 days', 'active'),
           (v_pause, v_a, v_cat, v_city, v_tag || ' paused ad', 'A scratch ad for the review proof.', v_code, 'free', 'active',
            now(), now(), now() + interval '10 days', false, NULL, NULL),
           (v_dead, v_deact, v_cat, v_city, v_tag || ' own ad', 'A scratch ad for the review proof.', v_code, 'free', 'active',
            now(), now(), now() + interval '10 days', false, NULL, NULL);
    SELECT coalesce(sum(count), 0) INTO v_rev0 FROM public.door_refusals WHERE day = current_date AND door = 'admin_review_listing';
    SELECT coalesce(sum(count), 0) INTO v_tr0 FROM public.door_refusals WHERE day = current_date AND door = 'transition_listing';

    -- (b) the gates.
    v_answer := public.admin_review_listing(v_scr, 'active');
    IF (v_answer ->> 'message', current_setting('response.status', true)) IS DISTINCT FROM ('notSignedIn', '401') THEN
      RAISE EXCEPTION 'F1-6a part 6 proof (b): no caller''s review answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_plain::text, 'role', 'authenticated')::text, true);
    v_answer := public.admin_review_listing(v_scr, 'active');
    IF (v_answer ->> 'message', current_setting('response.status', true)) IS DISTINCT FROM ('permissionDenied', '403') THEN
      RAISE EXCEPTION 'F1-6a part 6 proof (b): a review without listings:review answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_deact::text, 'role', 'authenticated')::text, true);
    v_answer := public.admin_review_listing(v_scr, 'active');
    IF (v_answer ->> 'message', current_setting('response.status', true)) IS DISTINCT FROM ('accountDeactivated', '403') THEN
      RAISE EXCEPTION 'F1-6a part 6 proof (b): a deactivated reviewer''s review answered %', v_answer;
    END IF;
    v_answer := public.transition_listing(v_dead, 'closed');
    IF (v_answer ->> 'message', current_setting('response.status', true)) IS DISTINCT FROM ('accountDeactivated', '403') THEN
      RAISE EXCEPTION 'F1-6a part 6 proof (b): a deactivated seller''s close answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_nf::text, 'role', 'authenticated')::text, true);
    BEGIN
      v_answer := public.admin_review_listing(v_scr, 'active');
      v_msg := 'answered ' || coalesce(v_answer::text, 'NULL');
    EXCEPTION WHEN SQLSTATE 'P0009' THEN
      GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    END;
    IF v_msg IS DISTINCT FROM 'step-up required: no verified factor' THEN
      RAISE EXCEPTION 'F1-6a part 6 proof (b): a reviewer without a factor got %', v_msg;
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    v_answer := public.transition_listing(v_live, 'closed');
    IF (v_answer ->> 'message', current_setting('response.status', true)) IS DISTINCT FROM ('notSignedIn', '401') THEN
      RAISE EXCEPTION 'F1-6a part 6 proof (b): no caller''s close answered %', v_answer;
    END IF;

    -- (c) transition_listing: only the seller.
    FOREACH v_who IN ARRAY ARRAY[v_plain, v_s, v_e] LOOP
      IF v_who = v_s THEN PERFORM set_config('request.jwt.claims', v_cs, true);
      ELSE PERFORM set_config('request.jwt.claims', json_build_object('sub', v_who::text, 'role', 'authenticated')::text, true); END IF;
      v_answer := public.transition_listing(CASE WHEN v_who = v_s THEN v_scr ELSE v_live END,
                                            CASE v_who WHEN v_plain THEN 'closed' WHEN v_s THEN 'active' ELSE 'removed' END);
      IF (v_answer ->> 'message', current_setting('response.status', true)) IS DISTINCT FROM ('notYourListing', '400') THEN
        RAISE EXCEPTION 'F1-6a part 6 proof (c): a non-owner''s transition answered %', v_answer;
      END IF;
    END LOOP;
    v_answer := public.transition_listing(gen_random_uuid(), 'removed');
    IF (v_answer ->> 'message', current_setting('response.status', true)) IS DISTINCT FROM ('notYourListing', '400') THEN
      RAISE EXCEPTION 'F1-6a part 6 proof (c): a transition of no ad answered %', v_answer;
    END IF;

    -- (c) the review door's codes: the reviewer passes the gate.
    PERFORM set_config('request.jwt.claims', v_cs, true);
    v_answer := public.admin_review_listing(v_scr, 'removed');
    IF (v_answer ->> 'message', current_setting('response.status', true)) IS DISTINCT FROM ('badValue:status', '400') THEN
      RAISE EXCEPTION 'F1-6a part 6 proof (c): a review to removed answered %', v_answer;
    END IF;
    v_answer := public.admin_review_listing(v_live, 'held');
    IF (v_answer ->> 'message', current_setting('response.status', true)) IS DISTINCT FROM ('illegalTransition:active-held', '400') THEN
      RAISE EXCEPTION 'F1-6a part 6 proof (c): holding a live ad answered %', v_answer;
    END IF;
    v_answer := public.admin_review_listing(v_closed, 'active');
    IF (v_answer ->> 'message', current_setting('response.status', true)) IS DISTINCT FROM ('ownerOnly:closed-active', '400') THEN
      RAISE EXCEPTION 'F1-6a part 6 proof (c): reopening a closed ad answered %', v_answer;
    END IF;
    IF EXISTS (SELECT 1 FROM public.listing_revisions WHERE listing_id IN (v_live, v_scr, v_closed, v_pause, v_dead))
       OR (SELECT array_agg(status ORDER BY title) FROM public.listings WHERE id IN (v_live, v_scr, v_closed, v_pause, v_dead))
          IS DISTINCT FROM ARRAY['closed', 'active', 'screening', 'active', 'active'] THEN
      RAISE EXCEPTION 'F1-6a part 6 proof (c): a refused call wrote a row';
    END IF;

    -- (d) the reviewer approves; the seller closes; the service pauses.
    v_answer := public.admin_review_listing(v_scr, 'active');
    IF v_answer IS DISTINCT FROM jsonb_build_object('ok', true, 'status', 'active') THEN
      RAISE EXCEPTION 'F1-6a part 6 proof (d): the approval answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_a::text, 'role', 'authenticated')::text, true);
    v_answer := public.transition_listing(v_live, 'closed');
    IF v_answer IS DISTINCT FROM jsonb_build_object('ok', true, 'status', 'closed') THEN
      RAISE EXCEPTION 'F1-6a part 6 proof (d): the seller''s close answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('role', 'service_role')::text, true);
    v_answer := public.transition_listing(v_pause, 'paused');
    IF v_answer IS DISTINCT FROM jsonb_build_object('ok', true, 'status', 'paused') THEN
      RAISE EXCEPTION 'F1-6a part 6 proof (d): the service''s pause answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    IF NOT EXISTS (SELECT 1 FROM public.listing_revisions WHERE listing_id = v_scr AND kind = 'state' AND actor = v_s
                     AND after ->> 'status' = 'active')
       OR NOT EXISTS (SELECT 1 FROM public.listing_revisions WHERE listing_id = v_live AND kind = 'state' AND actor = v_a
                        AND after ->> 'status' = 'closed')
       OR NOT EXISTS (SELECT 1 FROM public.listing_revisions WHERE listing_id = v_pause AND kind = 'state' AND actor IS NULL
                        AND after ->> 'status' = 'paused')
       OR (SELECT count(*) FROM public.listing_revisions WHERE listing_id IN (v_live, v_scr, v_closed, v_pause, v_dead)) <> 3 THEN
      RAISE EXCEPTION 'F1-6a part 6 proof (d): a decision was not written once';
    END IF;

    -- (e) the tallies: the reviewer's 4 review calls past the gate (3 refusals, 1 approval) and 1 transition_listing
    --     call; the person's 1, the enforcer's 2, the seller's 1 transition_listing calls; nothing for the service.
    IF (SELECT coalesce(sum(count), 0) FROM public.rate_limits WHERE key = v_s::text AND action = 'staff_moderation') <> 4
       OR (SELECT coalesce(sum(count), 0) FROM public.rate_limits WHERE key = v_s::text AND action = 'revise') <> 1
       OR (SELECT coalesce(sum(count), 0) FROM public.rate_limits WHERE key = v_plain::text AND action = 'revise') <> 1
       OR (SELECT coalesce(sum(count), 0) FROM public.rate_limits WHERE key = v_e::text AND action = 'revise') <> 2
       OR (SELECT coalesce(sum(count), 0) FROM public.rate_limits WHERE key = v_a::text AND action = 'revise') <> 1 THEN
      RAISE EXCEPTION 'F1-6a part 6 proof (e): the dials were not counted once per call past the gate';
    END IF;
    IF EXISTS (SELECT 1 FROM public.rate_limits WHERE key IN (v_nf::text, v_deact::text))
       OR EXISTS (SELECT 1 FROM public.rate_limits WHERE key IN (v_plain::text, v_e::text, v_a::text) AND action <> 'revise')
       OR EXISTS (SELECT 1 FROM public.rate_limits WHERE key = v_s::text AND action NOT IN ('staff_moderation', 'revise')) THEN
      RAISE EXCEPTION 'F1-6a part 6 proof (e): a refused caller or another dial was counted';
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date AND door = 'admin_review_listing')
         IS DISTINCT FROM v_rev0 + 6
       OR (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date AND door = 'transition_listing')
         IS DISTINCT FROM v_tr0 + 6 THEN
      RAISE EXCEPTION 'F1-6a part 6 proof (e): door_refusals did not meter the 6 + 6 refusals';
    END IF;

    RAISE EXCEPTION 'f1-6a-part-6-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f1-6a-part-6-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261118070500') ON CONFLICT DO NOTHING;
