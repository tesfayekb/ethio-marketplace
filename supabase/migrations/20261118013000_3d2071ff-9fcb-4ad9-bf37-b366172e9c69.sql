-- e2e-areas: admin-listings, screening, listings

-- Foundations 1, turn F1-6a, part 10 — THE CORRECTION: OWN ADS AND THE REVIEW DOOR'S SCOPE (DEC-333; brief
-- docs/governance/briefs/f1-doors-6a.md, ruling 2 Part B, DEC-403 and DEC-404).
-- transition_listing_core is redeclared WHOLE from its last declaration (live md5 checked) with only DEC-403's two
-- refusals added: a reviewer never decides their own ad (the reviewer branch: active, reduced, rejected, held) and an
-- enforcer never restores their own removed ad (removed → screening); each is ownListing, after the branch's own staff
-- refusal, and never for the service role. The owner's own branches are unchanged. Both doors that reach these
-- branches — admin_review_listing and the owner's transition_listing — therefore honour it.
-- admin_review_listing is redeclared WHOLE from part 6 (live md5 checked) with only DEC-404's scope added: it reads
-- the ad's home country before door_context and gates in match mode, as admin_edit_listing does.

DO $pre$
DECLARE
  v_md5 text;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261118070800') THEN
    RAISE EXCEPTION 'F1-6a part 10: part 9 (mark 20261118070800) must be applied first';
  END IF;
  SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p
   WHERE p.oid = 'public.transition_listing_core(uuid,text)'::regprocedure;
  IF v_md5 IS DISTINCT FROM '8281cf2fe98b3e674015f4c089db6f39' THEN
    RAISE EXCEPTION 'F1-6a part 10: the live transition_listing_core is not its last declaration''s body (%)', v_md5;
  END IF;
  SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p
   WHERE p.oid = 'public.admin_review_listing(uuid,text)'::regprocedure;
  IF v_md5 IS DISTINCT FROM '3680b277e612ee5a8c29843be78b28e8' THEN
    RAISE EXCEPTION 'F1-6a part 10: the live admin_review_listing is not part 6''s body (%)', v_md5;
  END IF;
END $pre$;

-- ------------------------------------------------------------ 1. transition_listing_core (whole from 20261115203100 :45; DEC-403)
CREATE OR REPLACE FUNCTION public.transition_listing_core(p_listing_id uuid, p_new_status text)
 RETURNS jsonb
 LANGUAGE plpgsql
 VOLATILE
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid      uuid := auth.uid();
  v_row      public.listings%ROWTYPE;
  v_service  boolean := (v_uid IS NULL AND current_setting('role', true) IS DISTINCT FROM 'anon');
  v_reviewer boolean := false;
  v_enforcer boolean := false;
  v_owner    boolean := false;
  v_ok       boolean := false;
BEGIN
  IF p_new_status NOT IN ('draft','screening','active','reduced','rejected','held','expired','sold','removed','closed','paused') THEN
    PERFORM public.door_refuse('badValue', 'status');
  END IF;

  SELECT * INTO v_row FROM public.listings WHERE id = p_listing_id;
  -- DEC-391 (F1-5a) — a signed-in caller learns nothing of an id no row holds: it is not his.
  IF NOT FOUND THEN
    IF v_service THEN PERFORM public.door_refuse('listingNotFound'); END IF;
    PERFORM public.door_refuse('notYourListing');
  END IF;

  IF v_uid IS NOT NULL THEN
    -- F1-5a — the caller's account and dial are gated before this core: the door's door_context, the staff
    -- move's own checks; the core spends no dial.
    v_owner    := (v_row.seller_id = v_uid);
    v_reviewer := public.has_permission(v_uid, 'listings', 'review');
    v_enforcer := public.has_permission(v_uid, 'listings', 'enforce');
    IF NOT (v_owner OR v_reviewer OR v_enforcer) THEN
      PERFORM public.door_refuse('notYourListing');
    END IF;
  END IF;

  -- D174 2 (bundle 16 turn 1) — the owner reopens his own closed ad, to the live status it was closed from and
  -- with the time it had left. Nothing about it changed while it was closed (edit_listing sends a closed ad to
  -- screening), so it needs no new review. Staff never reopen a seller's closed ad.
  -- P-2 (a), DEC-328 — a paused ad (its level ended with no free slot at the baseline) resumes the same way.
  IF v_row.status IN ('closed','paused') AND p_new_status IN ('active','reduced') THEN
    IF NOT v_owner THEN
      PERFORM public.door_refuse('ownerOnly', v_row.status || '-' || p_new_status);
    END IF;
    v_ok := (p_new_status = v_row.resume_status);
  -- The gateway/reviewer branch: only these roles may put a listing in front of
  -- a visitor. No owner door reaches 'active' (the reopen above returns an ad to the place it already held).
  ELSIF p_new_status IN ('active','reduced','rejected','held') THEN
    IF NOT (v_service OR v_reviewer) THEN
      PERFORM public.door_refuse('reviewerOnly', v_row.status || '-' || p_new_status);
    END IF;
    -- DEC-403 (F1-6a ruling 2) — a reviewer never decides their own ad; after the staff refusal, so a seller who
    -- holds no staff permission keeps reviewerOnly.
    IF v_owner AND NOT v_service THEN
      PERFORM public.door_refuse('ownListing');
    END IF;
    IF NOT v_service THEN
      PERFORM public.require_step_up_if_needed('listings', 'review');
    END IF;
    v_ok := CASE v_row.status
      WHEN 'screening' THEN p_new_status IN ('active','reduced','rejected','held')
      WHEN 'held'      THEN p_new_status IN ('active','reduced','rejected')
      ELSE false
    END;
  ELSIF p_new_status = 'screening' THEN
    IF v_row.status = 'removed' THEN
      -- Bundle 16 turn 3b (call F) — an ad its owner deleted is not brought back.
      IF v_row.deleted_at IS NOT NULL THEN
        PERFORM public.door_refuse('ownerDeleted');
      END IF;
      -- D137 (REQ-022 amended, the operator, 2026-10-11): a removed listing comes
      -- back only to screening, never straight to live; by enforcement with a
      -- fresh second factor; one removed for a severe screening reason by a
      -- super admin only.
      IF NOT (v_service OR v_enforcer) THEN
        PERFORM public.door_refuse('enforcementOnly', 'removed-screening');
      END IF;
      -- DEC-403 — an enforcer never restores their own removed ad; after the staff refusal.
      IF v_owner AND NOT v_service THEN
        PERFORM public.door_refuse('ownListing');
      END IF;
      IF coalesce(v_row.screening->>'severe','false') = 'true'
         AND NOT (v_service OR public.is_super_admin(v_uid)) THEN
        PERFORM public.door_refuse('severeRestore');
      END IF;
      IF NOT v_service THEN
        PERFORM public.require_step_up_if_needed('listings', 'enforce');
      END IF;
      v_ok := true;
    ELSE
      v_ok := v_row.status IN ('draft','active','reduced','rejected','expired','sold');
    END IF;
  ELSIF p_new_status IN ('sold','expired') THEN
    v_ok := v_row.status IN ('active','reduced') OR (p_new_status = 'sold' AND v_row.status IN ('closed','paused'));
  ELSIF p_new_status = 'closed' THEN
    -- D174 2 — "No longer available": only the owner closes his live ad; the time it had left is kept.
    IF NOT v_owner THEN
      PERFORM public.door_refuse('ownerOnly', v_row.status || '-closed');
    END IF;
    v_ok := v_row.status IN ('active','reduced');
  ELSIF p_new_status = 'paused' THEN
    -- P-2 (a), D306 / DEC-328 — the sweep pauses a live ad whose level ended with no free slot at the baseline;
    -- the time it had left is kept, as a close keeps it. Service only: no owner's or staff hand pauses an ad.
    IF NOT v_service THEN
      PERFORM public.door_refuse('serviceOnly', v_row.status || '-paused');
    END IF;
    v_ok := v_row.status IN ('active','reduced');
  ELSIF p_new_status = 'removed' THEN
    -- Bundle 16 turn 3b (call F) — the owner deletes his own ad as its owner, whatever staff role he also holds.
    IF v_owner AND NOT v_service THEN
      IF v_row.status = 'rejected' AND coalesce(v_row.screening->>'severe','false') = 'true' THEN
        PERFORM public.door_refuse('severeRemove');
      END IF;
      v_ok := true;
    ELSE
      v_ok := (v_service OR v_enforcer);
      IF NOT v_ok THEN
        PERFORM public.door_refuse('enforcementOnly', v_row.status || '-removed');
      END IF;
      IF NOT v_service THEN
        PERFORM public.require_step_up_if_needed('listings', 'enforce');
      END IF;
    END IF;
  ELSE
    v_ok := false;
  END IF;

  IF NOT v_ok THEN
    PERFORM public.door_refuse('illegalTransition', v_row.status || '-' || p_new_status);
  END IF;

  IF p_new_status IN ('active','reduced') AND v_row.status IN ('closed','paused') THEN
    -- D174 2 — reopened: the time it had left when it was closed.
    UPDATE public.listings SET
      status = p_new_status,
      expires_at = CASE WHEN v_row.kept_remaining IS NULL THEN NULL ELSE now() + v_row.kept_remaining END,
      clock_kept = false, kept_remaining = NULL, resume_status = NULL,
      updated_at = now()
    WHERE id = p_listing_id;
  ELSIF p_new_status IN ('active','reduced') AND v_row.clock_kept THEN
    -- Bundle 16 call A — after the review of an edit, the ad gets back the time it had when it was edited; an edit
    -- never renews an ad.
    UPDATE public.listings SET
      status = p_new_status,
      published_at = coalesce(published_at, now()),
      published_first_at = coalesce(published_first_at, now()),
      expires_at = CASE WHEN v_row.kept_remaining IS NULL THEN NULL ELSE now() + v_row.kept_remaining END,
      clock_kept = false, kept_remaining = NULL, resume_status = NULL,
      updated_at = now()
    WHERE id = p_listing_id;
  ELSIF p_new_status IN ('active','reduced') THEN
    UPDATE public.listings SET
      status = p_new_status,
      published_at = coalesce(published_at, now()),
      published_first_at = coalesce(published_first_at, now()),
      -- M5 / DEC-117 — LEAST(the seller's date, now() + the category's days);
      -- each side is left out when absent (LEAST skips NULL); NULL when both are.
      expires_at = LEAST(v_row.poster_expires_at,
        now() + make_interval(days => (SELECT c.expiry_days FROM public.categories c WHERE c.id = v_row.category_id))),
      updated_at = now()
    WHERE id = p_listing_id;
  ELSIF p_new_status = 'closed' THEN
    UPDATE public.listings SET
      status = 'closed',
      clock_kept = true,
      kept_remaining = CASE WHEN v_row.expires_at IS NULL THEN NULL
                            ELSE greatest(v_row.expires_at - now(), interval '0') END,
      resume_status = v_row.status,
      updated_at = now()
    WHERE id = p_listing_id;
  ELSIF p_new_status = 'paused' THEN
    -- P-2 (a), DEC-328 — paused by the sweep: the time it had left and the live status it resumes to are kept.
    UPDATE public.listings SET
      status = 'paused',
      clock_kept = true,
      kept_remaining = CASE WHEN v_row.expires_at IS NULL THEN NULL
                            ELSE greatest(v_row.expires_at - now(), interval '0') END,
      resume_status = v_row.status,
      updated_at = now()
    WHERE id = p_listing_id;
  ELSIF p_new_status = 'expired' THEN
    -- Bundle 16 — the live status a renewal returns it to.
    UPDATE public.listings SET status = 'expired', resume_status = v_row.status, updated_at = now()
     WHERE id = p_listing_id;
  ELSIF p_new_status = 'removed' AND v_owner THEN
    -- Bundle 16 turn 3b (call F) — deleted by its owner: it leaves My listings (deleted_at); the record stays.
    UPDATE public.listings SET status = 'removed', tier = public.baseline_level_key(), tier_until = NULL, tier_source = NULL, reach = NULL, reach_until = NULL, reach_source = NULL, deleted_at = now(), updated_at = now()
     WHERE id = p_listing_id;
  ELSE
    UPDATE public.listings SET status = p_new_status, tier = CASE WHEN p_new_status = 'removed' THEN public.baseline_level_key() ELSE tier END, tier_until = CASE WHEN p_new_status = 'removed' THEN NULL ELSE tier_until END, tier_source = CASE WHEN p_new_status = 'removed' THEN NULL ELSE tier_source END, reach = CASE WHEN p_new_status = 'removed' THEN NULL ELSE reach END, reach_until = CASE WHEN p_new_status = 'removed' THEN NULL ELSE reach_until END, reach_source = CASE WHEN p_new_status = 'removed' THEN NULL ELSE reach_source END, updated_at = now()
     WHERE id = p_listing_id;
  END IF;

  INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
    VALUES (p_listing_id, v_row.seller_id, 'state',
            jsonb_build_object('status', v_row.status),
            jsonb_build_object('status', p_new_status), v_uid);
  RETURN jsonb_build_object('ok', true, 'status', p_new_status);
END $function$
;
REVOKE ALL ON FUNCTION public.transition_listing_core(uuid, text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.transition_listing_core(uuid, text) TO service_role;

-- ------------------------------------------------------------ 2. admin_review_listing (whole from part 6; DEC-404)
CREATE OR REPLACE FUNCTION public.admin_review_listing(p_listing_id uuid, p_new_status text)
 RETURNS jsonb
 LANGUAGE plpgsql
 VOLATILE
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_scope character(2);
BEGIN
  -- DEC-402 — the reviewer's door: listings:review with its second factor, the dial staff_moderation, then the state
  -- machine's review transitions only (screening or held → active, reduced, rejected, held).
  -- DEC-404 — its authority is over the ad's home country, matched as the edit's is.
  SELECT l.home_country_code INTO v_scope FROM public.listings l WHERE l.id = p_listing_id;
  PERFORM public.door_context('staff', 'listings', 'review', 'staff_moderation', v_scope, 'match');
  IF p_new_status IS NULL OR p_new_status NOT IN ('active','reduced','rejected','held') THEN
    PERFORM public.door_refuse('badValue', 'status');
  END IF;
  RETURN public.transition_listing_core(p_listing_id, p_new_status);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_review_listing', 'staff_moderation', SQLERRM);
END $function$;
COMMENT ON FUNCTION public.admin_review_listing(uuid, text) IS
  'DEC-402, DEC-404 (F1-6a): the screening console''s decision on an ad in screening or held — listings:review over the ad''s home country (match) with its second factor, staff_moderation, the review statuses only, then transition_listing_core (never on the caller''s own ad, DEC-403); refusals through door_refused.';
REVOKE ALL ON FUNCTION public.admin_review_listing(uuid, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_review_listing(uuid, text) TO authenticated, service_role;

-- ------------------------------------------------------------ 3. PROOFS
-- (a) catalog facts: transition_listing_core VOLATILE SECURITY DEFINER, RETURNS jsonb, EXECUTE for the service role
--     only; admin_review_listing VOLATILE SECURITY DEFINER, RETURNS jsonb, EXECUTE for authenticated and the service
--     role, never anon or PUBLIC; each body this file's (md5).
-- (b) DEC-403: a seller who holds listings:review is refused ownListing (400) on their own screening ad through the
--     review door AND through transition_listing; a seller who holds listings:enforce is refused ownListing restoring
--     their own removed ad; a seller with no staff permission still gets reviewerOnly:screening-active; nothing
--     written.
-- (c) the same reviewer approves another seller's ad: {ok, status active}.
-- (d) DEC-404: a country reviewer XZ rejects an XZ ad and is refused permissionDenied:scope (403) on an XY ad.
-- (e) the service role (no caller) rejects an ad through the review door, spending no dial.
-- (f) one state revision per decision; staff_moderation counted once per review call past the gate (the reviewer 2,
--     the country reviewer 1), revise once per transition_listing call (the reviewer, the enforcer, the seller 1
--     each); every refusal metered (review 2, transition 3).
DO $proof$
DECLARE
  v_hex     text := replace(gen_random_uuid()::text, '-', '');
  v_tag     text;
  -- 'XZ', 'XY': scratch codes no market holds, as earlier proofs' (K4: a recorded proof exception)
  v_code    character(2) := 'XZ';
  v_code2   character(2) := 'XY';
  v_lang    text := public.language_code('base');
  v_r0      text;
  v_a       uuid := gen_random_uuid();
  v_s       uuid := gen_random_uuid();
  v_e       uuid := gen_random_uuid();
  v_c       uuid := gen_random_uuid();
  v_sess    uuid := gen_random_uuid();
  v_sess2   uuid := gen_random_uuid();
  v_sess3   uuid := gen_random_uuid();
  v_cs      text;
  v_ce      text;
  v_cc      text;
  v_role    uuid;
  v_role_e  uuid;
  v_anc     uuid;
  v_anc2    uuid;
  v_region  uuid;
  v_city    uuid;
  v_city2   uuid;
  v_cat     uuid;
  v_sown    uuid := gen_random_uuid();
  v_eown    uuid := gen_random_uuid();
  v_aown    uuid := gen_random_uuid();
  v_aw1     uuid := gen_random_uuid();
  v_aw2     uuid := gen_random_uuid();
  v_aw3     uuid := gen_random_uuid();
  v_aw4     uuid := gen_random_uuid();
  v_answer  jsonb;
  v_rev0    bigint;
  v_tr0     bigint;
  v_msg     text;
  v_fn      regprocedure;
BEGIN
  IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' OR prorettype <> 'jsonb'::regtype
        FROM pg_proc WHERE oid = 'public.transition_listing_core(uuid,text)'::regprocedure)
     OR has_function_privilege('anon', 'public.transition_listing_core(uuid,text)', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.transition_listing_core(uuid,text)', 'EXECUTE')
     OR NOT has_function_privilege('service_role', 'public.transition_listing_core(uuid,text)', 'EXECUTE') THEN
    RAISE EXCEPTION 'F1-6a part 10 proof (a): transition_listing_core''s header, return type or grants differ';
  END IF;
  v_fn := 'public.admin_review_listing(uuid,text)'::regprocedure;
  IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' OR prorettype <> 'jsonb'::regtype
        FROM pg_proc WHERE oid = v_fn)
     OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
     OR has_function_privilege('anon', v_fn, 'EXECUTE')
     OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE')
     OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
    RAISE EXCEPTION 'F1-6a part 10 proof (a): admin_review_listing''s header, return type or grants differ';
  END IF;
  IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = 'public.transition_listing_core(uuid,text)'::regprocedure)
     IS DISTINCT FROM '6b5b2342f2922a2a59b4fab4a32ad829'
     OR (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = 'public.admin_review_listing(uuid,text)'::regprocedure)
     IS DISTINCT FROM '803f3638b72b982befe4c58181d523d3' THEN
    RAISE EXCEPTION 'F1-6a part 10 proof (a): a body differs from this file';
  END IF;

  v_tag := 'e2e-mig-f16a10-' || substr(v_hex, 1, 10);
  v_r0 := 'e2e_mig_r0_' || substr(v_hex, 11, 8);
  v_cs := json_build_object('sub', v_s::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text;
  v_ce := json_build_object('sub', v_e::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess2::text)::text;
  v_cc := json_build_object('sub', v_c::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess3::text)::text;
  BEGIN
    PERFORM set_config('request.jwt.claims', '{}', true);
    IF EXISTS (SELECT 1 FROM public.countries WHERE code IN (v_code, v_code2)) THEN
      RAISE EXCEPTION 'F1-6a part 10 proof: a scratch code (% or %) already exists', v_code, v_code2;
    END IF;
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_code, v_tag, true), (v_code2, v_tag || '-2', true);
    SELECT a.id INTO v_anc FROM public.locations a WHERE a.country_code = v_code AND a.level = 'country' AND a.name_en = v_tag
     AND a.name_en LIKE 'e2e-mig-%';
    SELECT a.id INTO v_anc2 FROM public.locations a WHERE a.country_code = v_code2 AND a.level = 'country'
     AND a.name_en = v_tag || '-2' AND a.name_en LIKE 'e2e-mig-%';
    IF v_anc IS NULL OR v_anc2 IS NULL THEN RAISE EXCEPTION 'F1-6a part 10 proof: a scratch market has no anchor'; END IF;
    UPDATE public.locations SET is_active = true WHERE id IN (v_anc, v_anc2) AND name_en LIKE 'e2e-mig-f16a10-%';
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
      (v_e, v_tag || '-e@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_c, v_tag || '-c@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO public.legal_acceptances (user_id, version_id, language, method)
    SELECT u, v.id, v_lang, 'e2e-mig' FROM public.legal_versions v, unnest(ARRAY[v_a, v_s, v_e, v_c]) u
     WHERE v.status = 'published' AND v.effective_at <= now();
    -- The scratch callers' own ceiling: no verdict below rests on the live dial's value (rule 30 scan, point 4).
    INSERT INTO public.rate_overrides (user_id, action, max_count)
    SELECT u, d, 1000 FROM unnest(ARRAY[v_a, v_s, v_e, v_c]) u, unnest(ARRAY['staff_moderation', 'revise']) d;
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-review', v_tag) RETURNING id INTO v_role;
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-enforce', v_tag) RETURNING id INTO v_role_e;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'listings' AND p.action = 'review';
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role_e, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'listings' AND p.action = 'enforce';
    IF (SELECT count(*) FROM public.role_permissions WHERE role_id IN (v_role, v_role_e)) <> 2 THEN
      RAISE EXCEPTION 'F1-6a part 10 proof: listings:review or listings:enforce is not declared';
    END IF;
    INSERT INTO public.user_roles (user_id, role_id, scope_type) VALUES (v_s, v_role, 'global'), (v_e, v_role_e, 'global');
    INSERT INTO public.user_roles (user_id, role_id, scope_type, scope_country) VALUES (v_c, v_role, 'country', v_code);
    INSERT INTO auth.mfa_factors (id, user_id, friendly_name, factor_type, status, created_at, updated_at)
    VALUES (gen_random_uuid(), v_s, v_tag || '-f', 'totp', 'verified', now(), now()),
           (gen_random_uuid(), v_e, v_tag || '-f2', 'totp', 'verified', now(), now()),
           (gen_random_uuid(), v_c, v_tag || '-f3', 'totp', 'verified', now(), now());
    INSERT INTO auth.sessions (id, user_id, created_at, updated_at, aal)
    VALUES (v_sess, v_s, now(), now(), 'aal2'), (v_sess2, v_e, now(), now(), 'aal2'), (v_sess3, v_c, now(), now(), 'aal2');
    INSERT INTO auth.mfa_amr_claims (id, session_id, created_at, updated_at, authentication_method)
    VALUES (gen_random_uuid(), v_sess, now(), now(), 'totp'), (gen_random_uuid(), v_sess2, now(), now(), 'totp'),
           (gen_random_uuid(), v_sess3, now(), now(), 'totp');
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES (v_tag || ' leaf', v_tag, true, true, true, 9999) RETURNING id INTO v_cat;
    INSERT INTO public.listing_packages (key, kind, name_en, days, enabled, self_serve, extends_lifetime, sort)
    VALUES (v_r0, 'reach', v_tag || ' reach', 30, true, true, false, 9001);
    INSERT INTO public.market_settings (country_code, free_regular_ads, included_reach, paid_levels)
    VALUES (v_code, 20, v_r0, false), (v_code2, 20, v_r0, false);
    -- The reviewer's, the enforcer's and the plain seller's own ads; the plain seller's four ads waiting (three in XZ,
    -- one in XY).
    INSERT INTO public.listings (id, seller_id, category_id, location_id, title, description, home_country_code, price_mode,
                                 status)
    VALUES (v_sown, v_s, v_cat, v_city, v_tag || ' a reviewer''s own', 'A scratch ad for the own-ad proof.', v_code, 'free', 'screening'),
           (v_eown, v_e, v_cat, v_city, v_tag || ' b enforcer''s own', 'A scratch ad for the own-ad proof.', v_code, 'free', 'removed'),
           (v_aown, v_a, v_cat, v_city, v_tag || ' c seller''s own', 'A scratch ad for the own-ad proof.', v_code, 'free', 'screening'),
           (v_aw1, v_a, v_cat, v_city, v_tag || ' d waiting 1', 'A scratch ad for the own-ad proof.', v_code, 'free', 'screening'),
           (v_aw2, v_a, v_cat, v_city, v_tag || ' e waiting 2', 'A scratch ad for the own-ad proof.', v_code, 'free', 'screening'),
           (v_aw3, v_a, v_cat, v_city2, v_tag || ' f waiting 3', 'A scratch ad for the own-ad proof.', v_code2, 'free', 'screening'),
           (v_aw4, v_a, v_cat, v_city, v_tag || ' g waiting 4', 'A scratch ad for the own-ad proof.', v_code, 'free', 'screening');
    SELECT coalesce(sum(count), 0) INTO v_rev0 FROM public.door_refusals WHERE day = current_date AND door = 'admin_review_listing';
    SELECT coalesce(sum(count), 0) INTO v_tr0 FROM public.door_refusals WHERE day = current_date AND door = 'transition_listing';

    -- (b) DEC-403: no staff decision on one's own ad; a seller with no staff permission keeps reviewerOnly.
    PERFORM set_config('request.jwt.claims', v_cs, true);
    v_answer := public.admin_review_listing(v_sown, 'active');
    IF (v_answer ->> 'message', current_setting('response.status', true)) IS DISTINCT FROM ('ownListing', '400') THEN
      RAISE EXCEPTION 'F1-6a part 10 proof (b): a reviewer''s review of their own ad answered %', v_answer;
    END IF;
    v_answer := public.transition_listing(v_sown, 'active');
    IF (v_answer ->> 'message', current_setting('response.status', true)) IS DISTINCT FROM ('ownListing', '400') THEN
      RAISE EXCEPTION 'F1-6a part 10 proof (b): a reviewer''s transition of their own ad answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', v_ce, true);
    v_answer := public.transition_listing(v_eown, 'screening');
    IF (v_answer ->> 'message', current_setting('response.status', true)) IS DISTINCT FROM ('ownListing', '400') THEN
      RAISE EXCEPTION 'F1-6a part 10 proof (b): an enforcer''s restore of their own ad answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_a::text, 'role', 'authenticated')::text, true);
    v_answer := public.transition_listing(v_aown, 'active');
    IF (v_answer ->> 'message', current_setting('response.status', true))
       IS DISTINCT FROM ('reviewerOnly:screening-active', '400') THEN
      RAISE EXCEPTION 'F1-6a part 10 proof (b): a plain seller''s approval of their own ad answered %', v_answer;
    END IF;
    IF EXISTS (SELECT 1 FROM public.listing_revisions WHERE listing_id IN (v_sown, v_eown, v_aown))
       OR (SELECT array_agg(status ORDER BY title) FROM public.listings WHERE id IN (v_sown, v_eown, v_aown))
          IS DISTINCT FROM ARRAY['screening', 'removed', 'screening'] THEN
      RAISE EXCEPTION 'F1-6a part 10 proof (b): a refused call wrote a row';
    END IF;

    -- (c) the same reviewer approves another seller's ad.
    PERFORM set_config('request.jwt.claims', v_cs, true);
    v_answer := public.admin_review_listing(v_aw1, 'active');
    IF v_answer IS DISTINCT FROM jsonb_build_object('ok', true, 'status', 'active') THEN
      RAISE EXCEPTION 'F1-6a part 10 proof (c): the reviewer''s approval answered %', v_answer;
    END IF;

    -- (d) DEC-404: the country reviewer decides in their country only.
    PERFORM set_config('request.jwt.claims', v_cc, true);
    v_answer := public.admin_review_listing(v_aw2, 'rejected');
    IF v_answer IS DISTINCT FROM jsonb_build_object('ok', true, 'status', 'rejected') THEN
      RAISE EXCEPTION 'F1-6a part 10 proof (d): the country reviewer''s rejection in XZ answered %', v_answer;
    END IF;
    v_answer := public.admin_review_listing(v_aw3, 'rejected');
    IF (v_answer ->> 'message', current_setting('response.status', true)) IS DISTINCT FROM ('permissionDenied:scope', '403') THEN
      RAISE EXCEPTION 'F1-6a part 10 proof (d): the country reviewer''s rejection in XY answered %', v_answer;
    END IF;

    -- (e) the service role decides with no dial.
    PERFORM set_config('request.jwt.claims', json_build_object('role', 'service_role')::text, true);
    v_answer := public.admin_review_listing(v_aw4, 'rejected');
    IF v_answer IS DISTINCT FROM jsonb_build_object('ok', true, 'status', 'rejected') THEN
      RAISE EXCEPTION 'F1-6a part 10 proof (e): the service''s rejection answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);

    -- (f) one revision per decision; the dials and the meter.
    IF NOT EXISTS (SELECT 1 FROM public.listing_revisions WHERE listing_id = v_aw1 AND kind = 'state' AND actor = v_s
                     AND after ->> 'status' = 'active')
       OR NOT EXISTS (SELECT 1 FROM public.listing_revisions WHERE listing_id = v_aw2 AND kind = 'state' AND actor = v_c
                        AND after ->> 'status' = 'rejected')
       OR NOT EXISTS (SELECT 1 FROM public.listing_revisions WHERE listing_id = v_aw4 AND kind = 'state' AND actor IS NULL
                        AND after ->> 'status' = 'rejected')
       OR (SELECT count(*) FROM public.listing_revisions
            WHERE listing_id IN (v_sown, v_eown, v_aown, v_aw1, v_aw2, v_aw3, v_aw4)) <> 3
       OR (SELECT status FROM public.listings WHERE id = v_aw3) <> 'screening' THEN
      RAISE EXCEPTION 'F1-6a part 10 proof (f): a decision was not written once';
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.rate_limits WHERE key = v_s::text AND action = 'staff_moderation') <> 2
       OR (SELECT coalesce(sum(count), 0) FROM public.rate_limits WHERE key = v_s::text AND action = 'revise') <> 1
       OR (SELECT coalesce(sum(count), 0) FROM public.rate_limits WHERE key = v_c::text AND action = 'staff_moderation') <> 1
       OR (SELECT coalesce(sum(count), 0) FROM public.rate_limits WHERE key = v_e::text AND action = 'revise') <> 1
       OR (SELECT coalesce(sum(count), 0) FROM public.rate_limits WHERE key = v_a::text AND action = 'revise') <> 1 THEN
      RAISE EXCEPTION 'F1-6a part 10 proof (f): the dials were not counted once per call past the gate';
    END IF;
    IF EXISTS (SELECT 1 FROM public.rate_limits WHERE key IN (v_e::text, v_a::text) AND action <> 'revise')
       OR EXISTS (SELECT 1 FROM public.rate_limits WHERE key = v_c::text AND action <> 'staff_moderation')
       OR EXISTS (SELECT 1 FROM public.rate_limits WHERE key = v_s::text AND action NOT IN ('staff_moderation', 'revise')) THEN
      RAISE EXCEPTION 'F1-6a part 10 proof (f): another dial was counted';
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date AND door = 'admin_review_listing')
         IS DISTINCT FROM v_rev0 + 2
       OR (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date AND door = 'transition_listing')
         IS DISTINCT FROM v_tr0 + 3 THEN
      RAISE EXCEPTION 'F1-6a part 10 proof (f): door_refusals did not meter the 2 + 3 refusals';
    END IF;

    RAISE EXCEPTION 'f1-6a-part-10-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f1-6a-part-10-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261118110000') ON CONFLICT DO NOTHING;
