-- e2e-areas: admin-listings, screening, admin-name-checks

-- Foundations 1, turn F1-6a, part 7 of 9 — LISTINGS:REVEAL; THE REVEAL AND THE NAME-CHECK CLEAR ONTO THE SHELL
-- (DEC-333; brief docs/governance/briefs/f1-doors-6a.md, ruling 1 §1 DEC-400, §6; census
-- docs/governance/reports/f1-doors-6a.census.md).
-- 1. A permission of its own for the seller's-contact reveal (DEC-400): listings:reveal, no second factor (D129), assignable;
--    granted to every role that holds listings:review at this apply (a role given review later is not given reveal).
-- 2. admin_reveal_listing_contact is redeclared WHOLE from its last declaration (live md5 checked): ONE
--    door_context('staff', listings:reveal, review_reveal, global) gate — caller, deactivation (new), the permission,
--    no second factor (the permission asks none), the dial, whose refusal is now door_context's raised rateLimited
--    (ruling 1 §6) — then its codes: 'unknown channel' → badValue:channel; 'listing not found' → listingNotFound; the
--    returned notShown stays a 200 answer; the audit row stays; the shell.
-- 3. admin_name_check_clear is redeclared WHOLE from its last declaration (live md5 checked): ONE door_context('staff',
--    profiles:update, staff_moderation, global) gate — caller (new: notSignedIn), deactivation (new), the permission,
--    its second factor, the dial (new) — then its codes badValue:name and badValue:reason (raised before as those
--    sentences); the returned stale stays a 200 answer; log_audit stays; the shell.

DO $pre$
DECLARE
  v_md5 text;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261118070500') THEN
    RAISE EXCEPTION 'F1-6a part 7: part 6 (mark 20261118070500) must be applied first';
  END IF;
  SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p
   WHERE p.oid = 'public.admin_reveal_listing_contact(uuid,text)'::regprocedure;
  IF v_md5 IS DISTINCT FROM '5b65091cbf005c3e825f233d10bcf983' THEN
    RAISE EXCEPTION 'F1-6a part 7: the live admin_reveal_listing_contact is not its last declaration''s body (%)', v_md5;
  END IF;
  SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p
   WHERE p.oid = 'public.admin_name_check_clear(uuid,text,text,text)'::regprocedure;
  IF v_md5 IS DISTINCT FROM '533ef73c75df3e7563f664731981dc8f' THEN
    RAISE EXCEPTION 'F1-6a part 7: the live admin_name_check_clear is not its last declaration''s body (%)', v_md5;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
                  WHERE r.name = 'listings' AND p.action = 'review') THEN
    RAISE EXCEPTION 'F1-6a part 7: listings:review is not declared';
  END IF;
END $pre$;

-- ------------------------------------------------------------ 1. listings:reveal (DEC-400)
INSERT INTO public.permissions (resource_id, action, description, requires_step_up, assignable)
SELECT r.id, 'reveal', 'Reveal a screened listing''s contact', false, true
  FROM public.resources r
 WHERE r.name = 'listings'
   AND NOT EXISTS (
     SELECT 1 FROM public.permissions p
      WHERE p.resource_id = r.id AND p.action = 'reveal');

-- Every role that holds listings:review at this apply also holds listings:reveal (its core flag copied).
INSERT INTO public.role_permissions (role_id, permission_id, is_core)
SELECT DISTINCT rp.role_id, np.id, rp.is_core
  FROM public.role_permissions rp
  JOIN public.permissions mp ON mp.id = rp.permission_id AND mp.action = 'review'
  JOIN public.resources r ON r.id = mp.resource_id AND r.name = 'listings'
  JOIN public.permissions np ON np.resource_id = r.id AND np.action = 'reveal'
 WHERE NOT EXISTS (
     SELECT 1 FROM public.role_permissions x
      WHERE x.role_id = rp.role_id AND x.permission_id = np.id);

-- ------------------------------------------------------------ 2. admin_reveal_listing_contact (whole from 20261010145454 :14; listings:reveal, codes, the shell)
CREATE OR REPLACE FUNCTION public.admin_reveal_listing_contact(p_listing_id uuid, p_channel text)
RETURNS jsonb
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid   uuid := auth.uid();
  v_row   public.listings%ROWTYPE;
  v_entry jsonb;
  v_value text;
BEGIN
  -- D129, DEC-400 — the reveal is its own permission and asks no second factor; its dial is review_reveal.
  PERFORM public.door_context('staff', 'listings', 'reveal', 'review_reveal', NULL, 'global');
  IF p_channel IS NULL OR p_channel NOT IN ('phone', 'phone2', 'whatsapp') THEN
    PERFORM public.door_refuse('badValue', 'channel');
  END IF;

  SELECT * INTO v_row FROM public.listings l WHERE l.id = p_listing_id;
  IF NOT FOUND OR v_row.status <> 'screening' THEN
    PERFORM public.door_refuse('listingNotFound');
  END IF;

  v_entry := coalesce(v_row.contact_pref, '{}'::jsonb) -> p_channel;
  v_value := btrim(coalesce(v_entry->>'value', ''));
  IF coalesce((v_entry->>'show')::boolean, false) IS NOT TRUE OR v_value = '' THEN
    RETURN jsonb_build_object('ok', false, 'reason', 'notShown');
  END IF;

  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
    VALUES (v_uid, 'listing.contact_revealed', 'listing', p_listing_id::text,
            jsonb_build_object('channel', p_channel));

  RETURN jsonb_build_object('ok', true, 'channel', p_channel, 'value', v_value);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_reveal_listing_contact', 'review_reveal', SQLERRM);
END $$;
REVOKE ALL ON FUNCTION public.admin_reveal_listing_contact(uuid, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_reveal_listing_contact(uuid, text) TO authenticated, service_role;

-- ------------------------------------------------------------ 3. admin_name_check_clear (whole from 20261029233828 :133; door_context, codes, the shell)
CREATE OR REPLACE FUNCTION public.admin_name_check_clear(p_profile uuid, p_subject text, p_text text, p_reason text DEFAULT NULL::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 VOLATILE
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_text   text := lower(btrim(coalesce(p_text, '')));
  v_reason text := nullif(btrim(coalesce(p_reason, '')), '');
  v_row    record;
BEGIN
  PERFORM public.door_context('staff', 'profiles', 'update', 'staff_moderation', NULL, 'global');
  IF p_profile IS NULL OR p_subject IS NULL OR v_text = '' THEN PERFORM public.door_refuse('badValue', 'name'); END IF;
  IF v_reason IS NOT NULL AND char_length(v_reason) > 500 THEN PERFORM public.door_refuse('badValue', 'reason'); END IF;
  SELECT c.state, c.checked_text, c.imitates_of INTO v_row
    FROM public.name_checks c
   WHERE c.profile_id = p_profile AND c.subject = p_subject
   FOR UPDATE;
  IF NOT FOUND OR v_row.state NOT IN ('imitates', 'needs_review') OR v_row.checked_text IS DISTINCT FROM v_text THEN
    RETURN jsonb_build_object('ok', false, 'reason', 'stale');
  END IF;
  UPDATE public.name_checks SET state = 'clean', since = now(), unusable_streak = 0
   WHERE profile_id = p_profile AND subject = p_subject;
  PERFORM public.log_audit('name_check.cleared', 'profiles', p_profile::text,
    jsonb_build_object('subject', p_subject, 'text', v_text,
                       'old', jsonb_build_object('state', v_row.state, 'of', v_row.imitates_of),
                       'new', jsonb_build_object('state', 'clean'),
                       'reason', v_reason));
  RETURN jsonb_build_object('ok', true);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_name_check_clear', 'staff_moderation', SQLERRM);
END $function$;
REVOKE ALL ON FUNCTION public.admin_name_check_clear(uuid, text, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_name_check_clear(uuid, text, text, text) TO authenticated, service_role;

-- ------------------------------------------------------------ 4. PROOFS
-- (a) listings:reveal: no second factor, assignable, its description; every role holding listings:review holds it,
--     with review's core flag. A scratch role given review, the grant run again: it holds reveal; a role without
--     review does not. Catalog facts of both doors (VOLATILE SECURITY DEFINER, RETURNS jsonb, EXECUTE for
--     authenticated and the service role, never anon or PUBLIC) and their bodies (md5).
-- (b) the gates of both: no caller notSignedIn (401); a person without the permission permissionDenied (403); a
--     deactivated holder accountDeactivated (403). The reveal asks no second factor: a holder without one reveals;
--     the clear asks profiles:update's: 'step-up required: no verified factor' (P0009). The reveal's dial spent:
--     rateLimited (429).
-- (c) the codes with every earlier check cleared, 400: badValue:channel, listingNotFound (no ad; a live ad);
--     badValue:name, badValue:reason; nothing written. The returned answers stay 200: notShown, stale.
-- (d) the reviewer reveals a shown number (one audit row) and clears a name (state clean, one audit row).
-- (e) review_reveal 5 for the reviewer and 2 for the holder without a factor (its reveal, and its refused attempt,
--     which door_refused counts again as every refusal after the gate, INC-844); staff_moderation 4 for the
--     reviewer; none for a caller the gate refused; every refusal metered (7 + 5).
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
  v_role_p  uuid;
  v_reveal  uuid;
  v_anc     uuid;
  v_region  uuid;
  v_city    uuid;
  v_cat     uuid;
  v_scr     uuid := gen_random_uuid();
  v_live    uuid := gen_random_uuid();
  v_answer  jsonb;
  v_rv0     bigint;
  v_nc0     bigint;
  v_msg     text;
  v_door    text;
  v_fn      regprocedure;
BEGIN
  -- (a) the permission and its grant.
  SELECT p.id INTO v_reveal FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
   WHERE r.name = 'listings' AND p.action = 'reveal' AND NOT p.requires_step_up AND p.assignable
     AND p.description = 'Reveal a screened listing''s contact';
  IF v_reveal IS NULL THEN
    RAISE EXCEPTION 'F1-6a part 7 proof (a): listings:reveal is not declared as written';
  END IF;
  IF EXISTS (SELECT 1 FROM public.role_permissions rp
               JOIN public.permissions mp ON mp.id = rp.permission_id AND mp.action = 'review'
               JOIN public.resources r ON r.id = mp.resource_id AND r.name = 'listings'
              WHERE NOT EXISTS (SELECT 1 FROM public.role_permissions x
                                 WHERE x.role_id = rp.role_id AND x.permission_id = v_reveal AND x.is_core = rp.is_core)) THEN
    RAISE EXCEPTION 'F1-6a part 7 proof (a): a role holding listings:review does not hold listings:reveal';
  END IF;
  FOREACH v_fn IN ARRAY ARRAY['public.admin_reveal_listing_contact(uuid,text)'::regprocedure,
                              'public.admin_name_check_clear(uuid,text,text,text)'::regprocedure] LOOP
    IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' OR prorettype <> 'jsonb'::regtype
          FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-6a part 7 proof (a): %''s header, return type or grants differ', v_fn;
    END IF;
  END LOOP;
  IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p
       WHERE p.oid = 'public.admin_reveal_listing_contact(uuid,text)'::regprocedure)
     IS DISTINCT FROM '61aaa18012b7b36eda9b3b000af60946'
     OR (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p
          WHERE p.oid = 'public.admin_name_check_clear(uuid,text,text,text)'::regprocedure)
     IS DISTINCT FROM 'f11f36b3c22e3221f9a11cc1157da9ff' THEN
    RAISE EXCEPTION 'F1-6a part 7 proof (a): a door''s body differs from this file';
  END IF;

  v_tag := 'e2e-mig-f16a7-' || substr(v_hex, 1, 10);
  v_r0 := 'e2e_mig_r0_' || substr(v_hex, 11, 8);
  v_cs := json_build_object('sub', v_s::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text;
  BEGIN
    PERFORM set_config('request.jwt.claims', '{}', true);
    -- (a) a scratch role given listings:review, the grant run again: it holds reveal; a role without review does not.
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-review', v_tag) RETURNING id INTO v_role;
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-profiles', v_tag) RETURNING id INTO v_role_p;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'listings' AND p.action = 'review';
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role_p, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'profiles' AND p.action = 'update';
    IF (SELECT count(*) FROM public.role_permissions WHERE role_id IN (v_role, v_role_p)) <> 2 THEN
      RAISE EXCEPTION 'F1-6a part 7 proof: listings:review or profiles:update is not declared';
    END IF;
    INSERT INTO public.role_permissions (role_id, permission_id, is_core)
    SELECT DISTINCT rp.role_id, np.id, rp.is_core
      FROM public.role_permissions rp
      JOIN public.permissions mp ON mp.id = rp.permission_id AND mp.action = 'review'
      JOIN public.resources r ON r.id = mp.resource_id AND r.name = 'listings'
      JOIN public.permissions np ON np.resource_id = r.id AND np.action = 'reveal'
     WHERE NOT EXISTS (
         SELECT 1 FROM public.role_permissions x
          WHERE x.role_id = rp.role_id AND x.permission_id = np.id);
    IF NOT EXISTS (SELECT 1 FROM public.role_permissions WHERE role_id = v_role AND permission_id = v_reveal AND NOT is_core)
       OR EXISTS (SELECT 1 FROM public.role_permissions WHERE role_id = v_role_p AND permission_id = v_reveal) THEN
      RAISE EXCEPTION 'F1-6a part 7 proof (a): the grant did not follow listings:review';
    END IF;

    IF EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
      RAISE EXCEPTION 'F1-6a part 7 proof: scratch code % already exists', v_code;
    END IF;
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_code, v_tag, true);
    SELECT a.id INTO v_anc FROM public.locations a WHERE a.country_code = v_code AND a.level = 'country' AND a.name_en = v_tag
     AND a.name_en LIKE 'e2e-mig-%';
    IF v_anc IS NULL THEN RAISE EXCEPTION 'F1-6a part 7 proof: the scratch market has no anchor'; END IF;
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
    -- The scratch callers' own ceiling: no verdict below rests on the live dial's value (rule 30 scan, point 4); the
    -- holder without a factor may reveal once.
    INSERT INTO public.rate_overrides (user_id, action, max_count)
    SELECT u, d, CASE WHEN u = v_nf AND d = 'review_reveal' THEN 1 ELSE 1000 END
      FROM unnest(ARRAY[v_s, v_nf, v_plain, v_deact]) u, unnest(ARRAY['review_reveal', 'staff_moderation']) d;
    UPDATE public.profiles SET account_status = 'deactivated'
     WHERE user_id = v_deact
       AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = v_deact AND u.email LIKE 'e2e-mig-%');
    INSERT INTO public.user_roles (user_id, role_id, scope_type)
    SELECT u, ro, 'global' FROM unnest(ARRAY[v_s, v_nf, v_deact]) u, unnest(ARRAY[v_role, v_role_p]) ro;
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
    -- The seller's ad in screening shows one number; a live ad is not the reveal's.
    INSERT INTO public.listings (id, seller_id, category_id, location_id, title, description, home_country_code, price_mode,
                                 status, published_at, published_first_at, expires_at, contact_pref)
    VALUES (v_scr, v_a, v_cat, v_city, v_tag || ' new ad', 'A scratch ad for the reveal proof.', v_code, 'free', 'screening',
            NULL, NULL, NULL, jsonb_build_object('phone', jsonb_build_object('value', v_tag, 'show', true))),
           (v_live, v_a, v_cat, v_city, v_tag || ' live ad', 'A scratch ad for the reveal proof.', v_code, 'free', 'active',
            now(), now(), now() + interval '10 days', jsonb_build_object('phone', jsonb_build_object('value', v_tag, 'show', true)));
    INSERT INTO public.name_checks (profile_id, subject, checked_text, state, imitates_of)
    VALUES (v_a, 'alias', 'e2e scratch name', 'imitates', v_tag);
    SELECT coalesce(sum(count), 0) INTO v_rv0 FROM public.door_refusals WHERE day = current_date AND door = 'admin_reveal_listing_contact';
    SELECT coalesce(sum(count), 0) INTO v_nc0 FROM public.door_refusals WHERE day = current_date AND door = 'admin_name_check_clear';

    -- (b) the gates, each door.
    FOREACH v_door IN ARRAY ARRAY['admin_reveal_listing_contact', 'admin_name_check_clear'] LOOP
      PERFORM set_config('request.jwt.claims', '{}', true);
      IF v_door = 'admin_reveal_listing_contact' THEN v_answer := public.admin_reveal_listing_contact(v_scr, 'phone');
      ELSE v_answer := public.admin_name_check_clear(v_a, 'alias', 'e2e scratch name', NULL); END IF;
      IF (v_answer ->> 'message', current_setting('response.status', true)) IS DISTINCT FROM ('notSignedIn', '401') THEN
        RAISE EXCEPTION 'F1-6a part 7 proof (b): no caller''s % answered %', v_door, v_answer;
      END IF;
      PERFORM set_config('request.jwt.claims', json_build_object('sub', v_plain::text, 'role', 'authenticated')::text, true);
      IF v_door = 'admin_reveal_listing_contact' THEN v_answer := public.admin_reveal_listing_contact(v_scr, 'phone');
      ELSE v_answer := public.admin_name_check_clear(v_a, 'alias', 'e2e scratch name', NULL); END IF;
      IF (v_answer ->> 'message', current_setting('response.status', true)) IS DISTINCT FROM ('permissionDenied', '403') THEN
        RAISE EXCEPTION 'F1-6a part 7 proof (b): % without the permission answered %', v_door, v_answer;
      END IF;
      PERFORM set_config('request.jwt.claims', json_build_object('sub', v_deact::text, 'role', 'authenticated')::text, true);
      IF v_door = 'admin_reveal_listing_contact' THEN v_answer := public.admin_reveal_listing_contact(v_scr, 'phone');
      ELSE v_answer := public.admin_name_check_clear(v_a, 'alias', 'e2e scratch name', NULL); END IF;
      IF (v_answer ->> 'message', current_setting('response.status', true)) IS DISTINCT FROM ('accountDeactivated', '403') THEN
        RAISE EXCEPTION 'F1-6a part 7 proof (b): a deactivated holder''s % answered %', v_door, v_answer;
      END IF;
    END LOOP;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_nf::text, 'role', 'authenticated')::text, true);
    BEGIN
      v_answer := public.admin_name_check_clear(v_a, 'alias', 'e2e scratch name', NULL);
      v_msg := 'answered ' || coalesce(v_answer::text, 'NULL');
    EXCEPTION WHEN SQLSTATE 'P0009' THEN
      GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    END;
    IF v_msg IS DISTINCT FROM 'step-up required: no verified factor' THEN
      RAISE EXCEPTION 'F1-6a part 7 proof (b): a name clear without a factor got %', v_msg;
    END IF;
    -- D129: the reveal asks no second factor; then its dial is spent.
    v_answer := public.admin_reveal_listing_contact(v_scr, 'phone');
    IF v_answer IS DISTINCT FROM jsonb_build_object('ok', true, 'channel', 'phone', 'value', v_tag) THEN
      RAISE EXCEPTION 'F1-6a part 7 proof (b): a reveal without a second factor answered %', v_answer;
    END IF;
    v_answer := public.admin_reveal_listing_contact(v_scr, 'phone');
    IF (v_answer ->> 'message', current_setting('response.status', true)) IS DISTINCT FROM ('rateLimited', '429') THEN
      RAISE EXCEPTION 'F1-6a part 7 proof (b): a reveal past the dial answered %', v_answer;
    END IF;

    -- (c) the codes and the returned answers: the reviewer passes both gates.
    PERFORM set_config('request.jwt.claims', v_cs, true);
    v_answer := public.admin_reveal_listing_contact(v_scr, 'email');
    IF (v_answer ->> 'message', current_setting('response.status', true)) IS DISTINCT FROM ('badValue:channel', '400') THEN
      RAISE EXCEPTION 'F1-6a part 7 proof (c): an unknown channel answered %', v_answer;
    END IF;
    v_answer := public.admin_reveal_listing_contact(gen_random_uuid(), 'phone');
    IF (v_answer ->> 'message', current_setting('response.status', true)) IS DISTINCT FROM ('listingNotFound', '400') THEN
      RAISE EXCEPTION 'F1-6a part 7 proof (c): a reveal of no ad answered %', v_answer;
    END IF;
    v_answer := public.admin_reveal_listing_contact(v_live, 'phone');
    IF (v_answer ->> 'message', current_setting('response.status', true)) IS DISTINCT FROM ('listingNotFound', '400') THEN
      RAISE EXCEPTION 'F1-6a part 7 proof (c): a reveal of a live ad answered %', v_answer;
    END IF;
    PERFORM set_config('response.status', '', true);
    v_answer := public.admin_reveal_listing_contact(v_scr, 'whatsapp');
    IF v_answer IS DISTINCT FROM jsonb_build_object('ok', false, 'reason', 'notShown')
       OR coalesce(current_setting('response.status', true), '') <> '' THEN
      RAISE EXCEPTION 'F1-6a part 7 proof (c): a hidden channel answered % (status %)', v_answer, current_setting('response.status', true);
    END IF;
    v_answer := public.admin_name_check_clear(v_a, 'alias', '  ', NULL);
    IF (v_answer ->> 'message', current_setting('response.status', true)) IS DISTINCT FROM ('badValue:name', '400') THEN
      RAISE EXCEPTION 'F1-6a part 7 proof (c): an empty name answered %', v_answer;
    END IF;
    v_answer := public.admin_name_check_clear(v_a, 'alias', 'e2e scratch name', repeat('r', 501));
    IF (v_answer ->> 'message', current_setting('response.status', true)) IS DISTINCT FROM ('badValue:reason', '400') THEN
      RAISE EXCEPTION 'F1-6a part 7 proof (c): a long reason answered %', v_answer;
    END IF;
    PERFORM set_config('response.status', '', true);
    v_answer := public.admin_name_check_clear(v_a, 'alias', 'another name', NULL);
    IF v_answer IS DISTINCT FROM jsonb_build_object('ok', false, 'reason', 'stale')
       OR coalesce(current_setting('response.status', true), '') <> '' THEN
      RAISE EXCEPTION 'F1-6a part 7 proof (c): a stale name answered % (status %)', v_answer, current_setting('response.status', true);
    END IF;
    IF (SELECT count(*) FROM public.audit_log WHERE entity_id IN (v_scr::text, v_live::text, v_a::text)) <> 1
       OR NOT coalesce((SELECT state = 'imitates' FROM public.name_checks WHERE profile_id = v_a), false) THEN
      RAISE EXCEPTION 'F1-6a part 7 proof (c): a refused or returned call wrote a row';
    END IF;

    -- (d) the decisions.
    v_answer := public.admin_reveal_listing_contact(v_scr, 'phone');
    IF v_answer IS DISTINCT FROM jsonb_build_object('ok', true, 'channel', 'phone', 'value', v_tag) THEN
      RAISE EXCEPTION 'F1-6a part 7 proof (d): the reviewer''s reveal answered %', v_answer;
    END IF;
    v_answer := public.admin_name_check_clear(v_a, 'alias', 'E2E Scratch Name ', 'e2e');
    IF v_answer IS DISTINCT FROM jsonb_build_object('ok', true) THEN
      RAISE EXCEPTION 'F1-6a part 7 proof (d): the clear answered %', v_answer;
    END IF;
    IF NOT coalesce((SELECT state = 'clean' FROM public.name_checks WHERE profile_id = v_a), false)
       OR (SELECT count(*) FROM public.audit_log WHERE actor_id = v_s AND action = 'listing.contact_revealed'
             AND entity_id = v_scr::text) <> 1
       OR (SELECT count(*) FROM public.audit_log WHERE action = 'name_check.cleared' AND entity_id = v_a::text) <> 1 THEN
      RAISE EXCEPTION 'F1-6a part 7 proof (d): a decision was not written once';
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);

    -- (e) the tallies.
    IF (SELECT coalesce(sum(count), 0) FROM public.rate_limits WHERE key = v_s::text AND action = 'review_reveal') <> 5
       OR (SELECT coalesce(sum(count), 0) FROM public.rate_limits WHERE key = v_s::text AND action = 'staff_moderation') <> 4
       OR (SELECT coalesce(sum(count), 0) FROM public.rate_limits WHERE key = v_nf::text AND action = 'review_reveal') <> 2 THEN
      RAISE EXCEPTION 'F1-6a part 7 proof (e): the dials were not counted once per call past the gate (% % %)',
        (SELECT coalesce(sum(count), 0) FROM public.rate_limits WHERE key = v_s::text AND action = 'review_reveal'),
        (SELECT coalesce(sum(count), 0) FROM public.rate_limits WHERE key = v_s::text AND action = 'staff_moderation'),
        (SELECT coalesce(sum(count), 0) FROM public.rate_limits WHERE key = v_nf::text AND action = 'review_reveal');
    END IF;
    IF EXISTS (SELECT 1 FROM public.rate_limits WHERE key IN (v_plain::text, v_deact::text, v_a::text))
       OR EXISTS (SELECT 1 FROM public.rate_limits WHERE key = v_nf::text AND action <> 'review_reveal')
       OR EXISTS (SELECT 1 FROM public.rate_limits WHERE key = v_s::text AND action NOT IN ('review_reveal', 'staff_moderation')) THEN
      RAISE EXCEPTION 'F1-6a part 7 proof (e): a refused caller or another dial was counted';
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date AND door = 'admin_reveal_listing_contact')
         IS DISTINCT FROM v_rv0 + 7
       OR (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date AND door = 'admin_name_check_clear')
         IS DISTINCT FROM v_nc0 + 5 THEN
      RAISE EXCEPTION 'F1-6a part 7 proof (e): door_refusals did not meter the 7 + 5 refusals';
    END IF;

    RAISE EXCEPTION 'f1-6a-part-7-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f1-6a-part-7-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261118070600') ON CONFLICT DO NOTHING;
