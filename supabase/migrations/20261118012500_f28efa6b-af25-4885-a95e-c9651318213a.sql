-- e2e-areas: admin-listings

-- Foundations 1, turn F1-6a, part 5 of 9 — THE LEVEL AND RENEWAL-POLICY DOORS ONTO DOOR_CONTEXT AND THE SHELL
-- (DEC-333; brief docs/governance/briefs/f1-doors-6a.md, ruling 1 §7; census
-- docs/governance/reports/f1-doors-6a.census.md).
-- admin_set_listing_tier and admin_set_listing_policy are redeclared WHOLE from their last declarations (live md5s
-- checked): each opens with ONE door_context gate on listings:enforce — caller, deactivation, the permission, the
-- second factor (the tier's now before its validation, ruling 1 §7; its later require_step_up_if_needed goes), the
-- dial (the tier staff_moderation, the policy staff_config) — and refuses by door_refuse codes inside the shell.
-- The tier's folds: 'unknown tier' → badValue:tier; 'listing not found' → listingNotFound; 'your own listing is
-- changed the seller''s way' → ownListing; 'a removed listing takes no tier' → listingRemoved; 'nothing changed' →
-- nothingChanged; 'unknown reason' → badValue:reason; 'a note is required' → noteRequired; 'the note is too long' →
-- noteTooLong; 'badDays' stays badDays. The policy's 'renew days are 1 to 365' → badValue:renew_days. Every write
-- after the gate is unchanged.

DO $pre$
DECLARE
  v_md5 text;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261118070300') THEN
    RAISE EXCEPTION 'F1-6a part 5: part 4 (mark 20261118070300) must be applied first';
  END IF;
  SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p
   WHERE p.oid = 'public.admin_set_listing_tier(uuid,text,text,text,integer)'::regprocedure;
  IF v_md5 IS DISTINCT FROM '93aad2bb17b61bbdac3f3ba886d81861' THEN
    RAISE EXCEPTION 'F1-6a part 5: the live admin_set_listing_tier is not its last declaration''s body (%)', v_md5;
  END IF;
  SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p
   WHERE p.oid = 'public.admin_set_listing_policy(boolean,integer)'::regprocedure;
  IF v_md5 IS DISTINCT FROM 'a2f41e81addb52bd99550cc57931b6d1' THEN
    RAISE EXCEPTION 'F1-6a part 5: the live admin_set_listing_policy is not its last declaration''s body (%)', v_md5;
  END IF;
END $pre$;

-- ------------------------------------------------------------ 1. admin_set_listing_tier (whole from 20261105080112 :31; door_context, codes, the shell)
CREATE OR REPLACE FUNCTION public.admin_set_listing_tier(p_listing_id uuid, p_tier text, p_reason text, p_note text DEFAULT NULL::text, p_days integer DEFAULT NULL::integer)
 RETURNS jsonb
 LANGUAGE plpgsql
 VOLATILE
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid  uuid := auth.uid();
  v_row  public.listings%ROWTYPE;
  v_note text := nullif(btrim(coalesce(p_note, '')), '');
  v_level  public.listing_packages%ROWTYPE;
  v_until  timestamptz;
  v_source text;
  v_country char(2);
  v_market  public.market_settings%ROWTYPE;
  v_live    integer;
  v_pause   boolean := false;
BEGIN
  PERFORM public.door_context('staff', 'listings', 'enforce', 'staff_moderation', NULL, 'global');

  SELECT * INTO v_level FROM public.listing_packages WHERE key = p_tier AND kind = 'level' AND enabled FOR SHARE;
  IF NOT FOUND THEN
    PERFORM public.door_refuse('badValue', 'tier');
  END IF;
  SELECT * INTO v_row FROM public.listings WHERE id = p_listing_id FOR UPDATE;
  IF NOT FOUND OR v_row.status = 'draft' THEN
    PERFORM public.door_refuse('listingNotFound');
  END IF;
  IF v_row.seller_id = v_uid THEN
    PERFORM public.door_refuse('ownListing');
  END IF;
  IF v_row.status = 'removed' THEN
    PERFORM public.door_refuse('listingRemoved');
  END IF;
  IF v_row.tier = p_tier THEN
    PERFORM public.door_refuse('nothingChanged');
  END IF;
  IF p_reason IS NULL OR p_reason NOT IN ('promotion','promotion_ended','other') THEN
    PERFORM public.door_refuse('badValue', 'reason');
  END IF;
  IF p_reason = 'other' AND v_note IS NULL THEN
    PERFORM public.door_refuse('noteRequired');
  END IF;
  IF v_note IS NOT NULL AND char_length(v_note) > 500 THEN
    PERFORM public.door_refuse('noteTooLong');
  END IF;
  IF p_days IS NOT NULL AND (p_days < 1 OR p_days > 3650 OR v_level.is_baseline) THEN
    PERFORM public.door_refuse('badDays');
  END IF;

  v_source := CASE WHEN v_level.is_baseline THEN NULL ELSE 'staff' END;
  v_until  := CASE WHEN v_level.is_baseline OR p_days IS NULL THEN NULL ELSE now() + make_interval(days => p_days) END;
  -- DEC-342: a live ad lowered to the baseline without a free slot pauses in the same UPDATE (the sweep's way, D306).
  IF v_level.is_baseline AND v_row.status IN ('active','reduced') THEN
    SELECT loc.country_code INTO v_country FROM public.locations loc
     WHERE loc.id = coalesce(v_row.location_id,
                             (SELECT ll.location_id FROM public.listing_locations ll
                               WHERE ll.listing_id = v_row.id ORDER BY ll.position, ll.location_id LIMIT 1));
    IF v_country IS NOT NULL THEN
      v_market := public.market_settings_for(v_country);
      v_live   := public.seller_regular_live(v_row.seller_id, v_country);
      v_pause  := v_live >= v_market.free_regular_ads;
    END IF;
  END IF;
  UPDATE public.listings SET
    tier = p_tier,
    tier_until = v_until,
    tier_source = v_source,
    expires_at = CASE WHEN v_level.extends_lifetime AND v_until IS NOT NULL AND status <> 'paused'
                       AND expires_at IS NOT NULL AND expires_at < v_until THEN v_until ELSE expires_at END,
    kept_remaining = CASE WHEN v_pause THEN (CASE WHEN expires_at IS NULL THEN NULL ELSE greatest(expires_at - now(), interval '0') END)
                          WHEN v_level.extends_lifetime AND v_until IS NOT NULL AND status = 'paused'
                           AND kept_remaining IS NOT NULL AND kept_remaining < v_until - now() THEN v_until - now() ELSE kept_remaining END,
    status = CASE WHEN v_pause THEN 'paused' ELSE status END,
    clock_kept = CASE WHEN v_pause THEN true ELSE clock_kept END,
    resume_status = CASE WHEN v_pause THEN status ELSE resume_status END,
    updated_at = CASE WHEN v_pause THEN now() ELSE updated_at END
  WHERE id = p_listing_id;
  INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
    VALUES (p_listing_id, v_row.seller_id, 'edit',
            jsonb_build_object('tier', v_row.tier, 'tier_until', v_row.tier_until, 'tier_source', v_row.tier_source),
            jsonb_build_object('tier', p_tier, 'tier_until', v_until, 'tier_source', v_source), v_uid);
  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
    VALUES (v_uid, 'listing.admin_tier', 'listing', p_listing_id::text,
            jsonb_strip_nulls(jsonb_build_object('from', v_row.tier, 'to', p_tier, 'reason', p_reason, 'note', v_note, 'until', v_until, 'source', v_source,
                                                 'paused', CASE WHEN v_pause THEN true END)));
  IF v_pause THEN
    INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
      VALUES (p_listing_id, v_row.seller_id, 'state', jsonb_build_object('status', v_row.status), jsonb_build_object('status', 'paused'), v_uid);
    INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
      VALUES (v_uid, 'listing.level_paused', 'listing', p_listing_id::text,
              jsonb_build_object('from', v_row.tier, 'live', v_live, 'slots', v_market.free_regular_ads));
    INSERT INTO public.seller_notices (seller_id, listing_id, kind) VALUES (v_row.seller_id, p_listing_id, 'level_paused');
  END IF;

  RETURN jsonb_build_object('ok', true, 'from', v_row.tier, 'to', p_tier, 'until', v_until, 'source', v_source,
                            'status', CASE WHEN v_pause THEN 'paused' ELSE v_row.status END);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_set_listing_tier', 'staff_moderation', SQLERRM);
END $function$;
REVOKE ALL ON FUNCTION public.admin_set_listing_tier(uuid, text, text, text, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_set_listing_tier(uuid, text, text, text, integer) TO authenticated, service_role;

-- ------------------------------------------------------------ 2. admin_set_listing_policy (whole from 20261029015441 :260; door_context, codes, the shell)
CREATE OR REPLACE FUNCTION public.admin_set_listing_policy(p_renew_allowed boolean, p_renew_days integer)
 RETURNS jsonb
 LANGUAGE plpgsql
 VOLATILE
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid    uuid := auth.uid();
  v_before public.listing_policy%ROWTYPE;
  v_after  public.listing_policy%ROWTYPE;
BEGIN
  -- The door's authority and second factor, then its dial (staff_config), before its first write.
  PERFORM public.door_context('staff', 'listings', 'enforce', 'staff_config', NULL, 'global');
  IF p_renew_allowed IS NULL OR p_renew_days IS NULL OR p_renew_days < 1 OR p_renew_days > 365 THEN
    PERFORM public.door_refuse('badValue', 'renew_days');
  END IF;
  SELECT * INTO v_before FROM public.listing_policy WHERE id FOR UPDATE;
  UPDATE public.listing_policy SET
    renew_allowed = p_renew_allowed, renew_days = p_renew_days, updated_at = now(), updated_by = v_uid
  WHERE id
  RETURNING * INTO v_after;
  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
  VALUES (v_uid, 'listing.policy_set', 'listing_policy', 'renew',
          jsonb_build_object('before', jsonb_build_object('renew_allowed', v_before.renew_allowed,
                                                          'renew_days', v_before.renew_days),
                             'after', jsonb_build_object('renew_allowed', v_after.renew_allowed,
                                                         'renew_days', v_after.renew_days)));
  RETURN jsonb_build_object('ok', true, 'renew_allowed', v_after.renew_allowed, 'renew_days', v_after.renew_days);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_set_listing_policy', 'staff_config', SQLERRM);
END $function$;
REVOKE ALL ON FUNCTION public.admin_set_listing_policy(boolean, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_set_listing_policy(boolean, integer) TO authenticated, service_role;

-- ------------------------------------------------------------ 3. PROOFS
-- (a) catalog facts of both doors: VOLATILE SECURITY DEFINER, RETURNS jsonb, EXECUTE for authenticated and the service
--     role, never anon or PUBLIC; each body this file's (md5).
-- (b) the gates of both: no caller notSignedIn (401); a person without listings:enforce permissionDenied (403); a
--     deactivated holder accountDeactivated (403); a holder with no verified factor 'step-up required: no verified
--     factor' (P0009) — the tier's before any of its validation (an unknown tier is not named first).
-- (c) the codes with every earlier check cleared, 400: the tier's badValue:tier, listingNotFound, ownListing,
--     listingRemoved, nothingChanged, badValue:reason, noteRequired, noteTooLong, badDays; the policy's
--     badValue:renew_days; nothing written.
-- (d) the enforcer raises an ad's level and sets the policy: their answers, one audit row each.
-- (e) staff_moderation counted 10 and staff_config 2 for the enforcer (once per call past the gate); none for a
--     caller the gate refused; every refusal metered (12 + 4).
DO $proof$
DECLARE
  v_hex     text := replace(gen_random_uuid()::text, '-', '');
  v_tag     text;
  -- 'XZ': a scratch code no market holds, as earlier proofs' (K4: a recorded proof exception)
  v_code    character(2) := 'XZ';
  v_lang    text := public.language_code('base');
  v_r0      text;
  v_lv      text;
  v_lv2     text;
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
  v_l3      uuid := gen_random_uuid();
  v_l4      uuid := gen_random_uuid();
  v_answer  jsonb;
  v_tier0   bigint;
  v_policy0 bigint;
  v_count   integer;
  v_msg     text;
  v_door    text;
  v_fn      regprocedure;
BEGIN
  FOREACH v_fn IN ARRAY ARRAY['public.admin_set_listing_tier(uuid,text,text,text,integer)'::regprocedure,
                              'public.admin_set_listing_policy(boolean,integer)'::regprocedure] LOOP
    IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' OR prorettype <> 'jsonb'::regtype
          FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-6a part 5 proof (a): %''s header, return type or grants differ', v_fn;
    END IF;
  END LOOP;
  IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p
       WHERE p.oid = 'public.admin_set_listing_tier(uuid,text,text,text,integer)'::regprocedure)
     IS DISTINCT FROM 'b5a0eeee1f4cb8e74bd750ecc4a9f9da'
     OR (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p
          WHERE p.oid = 'public.admin_set_listing_policy(boolean,integer)'::regprocedure)
     IS DISTINCT FROM '5d7b315fb6fb57bd115ac46f942323f1' THEN
    RAISE EXCEPTION 'F1-6a part 5 proof (a): a door''s body differs from this file';
  END IF;

  v_tag := 'e2e-mig-f16a5-' || substr(v_hex, 1, 10);
  v_r0 := 'e2e_mig_r0_' || substr(v_hex, 11, 8);
  v_lv := 'e2e_mig_lv_' || substr(v_hex, 11, 8);
  v_lv2 := 'e2e_mig_lw_' || substr(v_hex, 11, 8);
  v_cs := json_build_object('sub', v_s::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text;
  BEGIN
    PERFORM set_config('request.jwt.claims', '{}', true);
    IF EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
      RAISE EXCEPTION 'F1-6a part 5 proof: scratch code % already exists', v_code;
    END IF;
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_code, v_tag, true);
    SELECT a.id INTO v_anc FROM public.locations a WHERE a.country_code = v_code AND a.level = 'country' AND a.name_en = v_tag
     AND a.name_en LIKE 'e2e-mig-%';
    IF v_anc IS NULL THEN RAISE EXCEPTION 'F1-6a part 5 proof: the scratch market has no anchor'; END IF;
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
    SELECT u, d, 1000 FROM unnest(ARRAY[v_s, v_nf, v_plain, v_deact]) u, unnest(ARRAY['staff_moderation', 'staff_config']) d;
    UPDATE public.profiles SET account_status = 'deactivated'
     WHERE user_id = v_deact
       AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = v_deact AND u.email LIKE 'e2e-mig-%');
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-enforce', v_tag) RETURNING id INTO v_role;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'listings' AND p.action = 'enforce';
    IF (SELECT count(*) FROM public.role_permissions WHERE role_id = v_role) <> 1 THEN
      RAISE EXCEPTION 'F1-6a part 5 proof: listings:enforce is not declared';
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
    INSERT INTO public.listing_packages (key, kind, name_en, days, max_photos, placement, badge, enabled, self_serve, extends_lifetime, sort) VALUES
      (v_lv, 'level', v_tag || ' level', 10, 6, 'boost', false, true, true, false, 9000),
      (v_lv2, 'level', v_tag || ' level 2', 10, 6, 'boost', false, true, true, false, 9002),
      (v_r0, 'reach', v_tag || ' reach', 30, NULL, NULL, false, true, true, false, 9001);
    INSERT INTO public.market_settings (country_code, free_regular_ads, included_reach, paid_levels)
    VALUES (v_code, 20, v_r0, false);
    -- v_l1: a seller's live ad at the scratch level 2; v_l3: the enforcer's own; v_l4: a seller's removed ad.
    INSERT INTO public.listings (id, seller_id, category_id, location_id, title, description, home_country_code, price_mode,
                                 status, published_at, published_first_at, expires_at, tier)
    VALUES (v_l1, v_a, v_cat, v_city, v_tag || ' scratch ad', 'A scratch ad for the level proof.', v_code, 'free', 'active',
            now(), now(), now() + interval '10 days', v_lv2),
           (v_l3, v_s, v_cat, v_city, v_tag || ' own ad', 'A scratch ad for the level proof.', v_code, 'free', 'active',
            now(), now(), now() + interval '10 days', v_lv2),
           (v_l4, v_a, v_cat, v_city, v_tag || ' removed ad', 'A scratch ad for the level proof.', v_code, 'free', 'removed',
            now(), now(), now() + interval '10 days', v_lv2);
    -- The renewal policy is one row: parked on known values inside this rolled-back block (DEC-350), never judged by
    -- the real row's.
    INSERT INTO public.listing_policy (id, renew_allowed, renew_days) VALUES (true, false, 7)
    ON CONFLICT (id) DO UPDATE SET renew_allowed = false, renew_days = 7;
    SELECT coalesce(sum(count), 0) INTO v_tier0 FROM public.door_refusals WHERE day = current_date AND door = 'admin_set_listing_tier';
    SELECT coalesce(sum(count), 0) INTO v_policy0 FROM public.door_refusals WHERE day = current_date AND door = 'admin_set_listing_policy';

    -- (b) the gates, each door; the tier's with an unknown tier, so the gate is named before any validation.
    FOREACH v_door IN ARRAY ARRAY['admin_set_listing_tier', 'admin_set_listing_policy'] LOOP
      PERFORM set_config('request.jwt.claims', '{}', true);
      IF v_door = 'admin_set_listing_tier' THEN v_answer := public.admin_set_listing_tier(v_l1, 'bogus', 'promotion', NULL, NULL);
      ELSE v_answer := public.admin_set_listing_policy(true, 0); END IF;
      IF (v_answer ->> 'message', current_setting('response.status', true)) IS DISTINCT FROM ('notSignedIn', '401') THEN
        RAISE EXCEPTION 'F1-6a part 5 proof (b): no caller''s % answered %', v_door, v_answer;
      END IF;
      PERFORM set_config('request.jwt.claims', json_build_object('sub', v_plain::text, 'role', 'authenticated')::text, true);
      IF v_door = 'admin_set_listing_tier' THEN v_answer := public.admin_set_listing_tier(v_l1, 'bogus', 'promotion', NULL, NULL);
      ELSE v_answer := public.admin_set_listing_policy(true, 0); END IF;
      IF (v_answer ->> 'message', current_setting('response.status', true)) IS DISTINCT FROM ('permissionDenied', '403') THEN
        RAISE EXCEPTION 'F1-6a part 5 proof (b): % without listings:enforce answered %', v_door, v_answer;
      END IF;
      PERFORM set_config('request.jwt.claims', json_build_object('sub', v_deact::text, 'role', 'authenticated')::text, true);
      IF v_door = 'admin_set_listing_tier' THEN v_answer := public.admin_set_listing_tier(v_l1, 'bogus', 'promotion', NULL, NULL);
      ELSE v_answer := public.admin_set_listing_policy(true, 0); END IF;
      IF (v_answer ->> 'message', current_setting('response.status', true)) IS DISTINCT FROM ('accountDeactivated', '403') THEN
        RAISE EXCEPTION 'F1-6a part 5 proof (b): a deactivated holder''s % answered %', v_door, v_answer;
      END IF;
      PERFORM set_config('request.jwt.claims', json_build_object('sub', v_nf::text, 'role', 'authenticated')::text, true);
      BEGIN
        IF v_door = 'admin_set_listing_tier' THEN v_answer := public.admin_set_listing_tier(v_l1, 'bogus', 'promotion', NULL, NULL);
        ELSE v_answer := public.admin_set_listing_policy(true, 0); END IF;
        v_msg := 'answered ' || coalesce(v_answer::text, 'NULL');
      EXCEPTION WHEN SQLSTATE 'P0009' THEN
        GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
      END;
      IF v_msg IS DISTINCT FROM 'step-up required: no verified factor' THEN
        RAISE EXCEPTION 'F1-6a part 5 proof (b): a holder without a factor got % from %', v_msg, v_door;
      END IF;
    END LOOP;

    -- (c) the codes: the enforcer passes the gate; each call clears every earlier check.
    PERFORM set_config('request.jwt.claims', v_cs, true);
    v_answer := public.admin_set_listing_tier(v_l1, 'bogus', 'promotion', NULL, NULL);
    IF (v_answer ->> 'message', current_setting('response.status', true)) IS DISTINCT FROM ('badValue:tier', '400') THEN
      RAISE EXCEPTION 'F1-6a part 5 proof (c): an unknown level answered %', v_answer;
    END IF;
    v_answer := public.admin_set_listing_tier(gen_random_uuid(), v_lv, 'promotion', NULL, NULL);
    IF (v_answer ->> 'message', current_setting('response.status', true)) IS DISTINCT FROM ('listingNotFound', '400') THEN
      RAISE EXCEPTION 'F1-6a part 5 proof (c): no ad answered %', v_answer;
    END IF;
    v_answer := public.admin_set_listing_tier(v_l3, v_lv, 'promotion', NULL, NULL);
    IF (v_answer ->> 'message', current_setting('response.status', true)) IS DISTINCT FROM ('ownListing', '400') THEN
      RAISE EXCEPTION 'F1-6a part 5 proof (c): the enforcer''s own ad answered %', v_answer;
    END IF;
    v_answer := public.admin_set_listing_tier(v_l4, v_lv, 'promotion', NULL, NULL);
    IF (v_answer ->> 'message', current_setting('response.status', true)) IS DISTINCT FROM ('listingRemoved', '400') THEN
      RAISE EXCEPTION 'F1-6a part 5 proof (c): a removed ad answered %', v_answer;
    END IF;
    v_answer := public.admin_set_listing_tier(v_l1, v_lv2, 'promotion', NULL, NULL);
    IF (v_answer ->> 'message', current_setting('response.status', true)) IS DISTINCT FROM ('nothingChanged', '400') THEN
      RAISE EXCEPTION 'F1-6a part 5 proof (c): the ad''s own level answered %', v_answer;
    END IF;
    v_answer := public.admin_set_listing_tier(v_l1, v_lv, 'bogus', NULL, NULL);
    IF (v_answer ->> 'message', current_setting('response.status', true)) IS DISTINCT FROM ('badValue:reason', '400') THEN
      RAISE EXCEPTION 'F1-6a part 5 proof (c): an unknown reason answered %', v_answer;
    END IF;
    v_answer := public.admin_set_listing_tier(v_l1, v_lv, 'other', NULL, NULL);
    IF (v_answer ->> 'message', current_setting('response.status', true)) IS DISTINCT FROM ('noteRequired', '400') THEN
      RAISE EXCEPTION 'F1-6a part 5 proof (c): ''other'' without a note answered %', v_answer;
    END IF;
    v_answer := public.admin_set_listing_tier(v_l1, v_lv, 'other', repeat('n', 501), NULL);
    IF (v_answer ->> 'message', current_setting('response.status', true)) IS DISTINCT FROM ('noteTooLong', '400') THEN
      RAISE EXCEPTION 'F1-6a part 5 proof (c): a long note answered %', v_answer;
    END IF;
    v_answer := public.admin_set_listing_tier(v_l1, v_lv, 'promotion', NULL, 0);
    IF (v_answer ->> 'message', current_setting('response.status', true)) IS DISTINCT FROM ('badDays', '400') THEN
      RAISE EXCEPTION 'F1-6a part 5 proof (c): zero days answered %', v_answer;
    END IF;
    v_answer := public.admin_set_listing_policy(true, 0);
    IF (v_answer ->> 'message', current_setting('response.status', true)) IS DISTINCT FROM ('badValue:renew_days', '400') THEN
      RAISE EXCEPTION 'F1-6a part 5 proof (c): zero renewal days answered %', v_answer;
    END IF;
    IF EXISTS (SELECT 1 FROM public.listings WHERE id IN (v_l1, v_l3, v_l4) AND tier <> v_lv2)
       OR EXISTS (SELECT 1 FROM public.listing_revisions WHERE listing_id IN (v_l1, v_l3, v_l4))
       OR EXISTS (SELECT 1 FROM public.audit_log WHERE actor_id = v_s)
       OR NOT coalesce((SELECT NOT renew_allowed AND renew_days = 7 FROM public.listing_policy WHERE id), false) THEN
      RAISE EXCEPTION 'F1-6a part 5 proof (c): a refused call wrote a row';
    END IF;

    -- (d) the decisions.
    v_answer := public.admin_set_listing_tier(v_l1, v_lv, 'promotion', NULL, 5);
    IF NOT coalesce((v_answer ->> 'ok')::boolean AND v_answer ->> 'from' = v_lv2 AND v_answer ->> 'to' = v_lv
                    AND v_answer ->> 'source' = 'staff' AND v_answer ->> 'status' = 'active', false) THEN
      RAISE EXCEPTION 'F1-6a part 5 proof (d): raising the level answered %', v_answer;
    END IF;
    v_answer := public.admin_set_listing_policy(true, 30);
    IF v_answer IS DISTINCT FROM jsonb_build_object('ok', true, 'renew_allowed', true, 'renew_days', 30) THEN
      RAISE EXCEPTION 'F1-6a part 5 proof (d): setting the policy answered %', v_answer;
    END IF;
    IF NOT coalesce((SELECT tier = v_lv AND tier_source = 'staff' FROM public.listings WHERE id = v_l1), false)
       OR NOT coalesce((SELECT renew_allowed AND renew_days = 30 FROM public.listing_policy WHERE id), false)
       OR (SELECT count(*) FROM public.audit_log WHERE actor_id = v_s AND action = 'listing.admin_tier') <> 1
       OR (SELECT count(*) FROM public.audit_log WHERE actor_id = v_s AND action = 'listing.policy_set') <> 1 THEN
      RAISE EXCEPTION 'F1-6a part 5 proof (d): a decision was not written once';
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);

    -- (e) the tallies.
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_s::text AND action = 'staff_moderation';
    IF v_count <> 10 THEN
      RAISE EXCEPTION 'F1-6a part 5 proof (e): staff_moderation counted % for the enforcer (expected 10)', v_count;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_s::text AND action = 'staff_config';
    IF v_count <> 2 THEN
      RAISE EXCEPTION 'F1-6a part 5 proof (e): staff_config counted % for the enforcer (expected 2)', v_count;
    END IF;
    IF EXISTS (SELECT 1 FROM public.rate_limits WHERE key IN (v_nf::text, v_plain::text, v_deact::text, v_a::text))
       OR EXISTS (SELECT 1 FROM public.rate_limits WHERE key = v_s::text AND action NOT IN ('staff_moderation', 'staff_config')) THEN
      RAISE EXCEPTION 'F1-6a part 5 proof (e): a refused caller or another dial was counted';
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date AND door = 'admin_set_listing_tier')
         IS DISTINCT FROM v_tier0 + 12
       OR (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date AND door = 'admin_set_listing_policy')
         IS DISTINCT FROM v_policy0 + 4 THEN
      RAISE EXCEPTION 'F1-6a part 5 proof (e): door_refusals did not meter the 12 + 4 refusals';
    END IF;

    RAISE EXCEPTION 'f1-6a-part-5-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f1-6a-part-5-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261118070400') ON CONFLICT DO NOTHING;
