-- e2e-areas: my-listings, admin-listings, ad-page

-- Foundations 1, turn F1-5a, part 2 — THE STATE MACHINE'S CORE, SERVICE-ONLY (DEC-333, DEC-391; brief
-- docs/governance/briefs/f1-doors-5a.md, ruling docs/governance/briefs/f1-doors-5a-ruling-1.md).
-- transition_listing_core(uuid,text) is new: transition_listing's state machine, whole from its last declaration
-- (live md5 checked), its refusals by door_refuse codes, without the deactivation check and the dial (the door's
-- door_context and the staff move's own checks gate before it; the core spends none). It answers
-- {ok, status}. It raises — never returns — a refusal, so every SQL caller (the next part's two, resume_listing,
-- set_listing_level and transition_listing, each in a later part) meets it
-- as an exception or its own shell's answer. DEC-391: a signed-in caller learns nothing of an id no row holds
-- (notYourListing); the service path keeps listingNotFound. Service-only: no browser role executes it. Folds:
-- 'unknown status' → badValue:status; 'listing not found' → listingNotFound / notYourListing; 'not allowed' →
-- notYourListing; 'only the owner reopens' → ownerOnly:<from>-<to>; 'reviewer only' → reviewerOnly:<from>-<to>;
-- 'deleted by its owner' → ownerDeleted; 'enforcement only' → enforcementOnly:<from>-<to>; 'severe' →
-- severeRestore / severeRemove; 'service only' → serviceOnly:<from>-paused; 'illegal transition' →
-- illegalTransition:<from>-<to>.

DO $pre$
DECLARE
  v_pairs text[][] := ARRAY[
    ['public.transition_listing(uuid,text)', 'bddd751f0404d011f2279b818c2245dd']];
  v_md5  text;
  i      integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261115220000') THEN
    RAISE EXCEPTION 'F1-5a part 2: part 1 (mark 20261115220000) must be applied first';
  END IF;
  IF to_regprocedure('public.door_refuse(text,text)') IS NULL
     OR to_regprocedure('public.door_refused(text,text,text)') IS NULL
     OR NOT EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'door_context' AND pronamespace = 'public'::regnamespace) THEN
    RAISE EXCEPTION 'F1-5a part 2: the door mechanism (door_context, door_refuse, door_refused) is missing';
  END IF;
  IF to_regprocedure('public.transition_listing_core(uuid,text)') IS NOT NULL THEN
    RAISE EXCEPTION 'F1-5a part 2: transition_listing_core already exists';
  END IF;
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_pairs[i][1]::regprocedure;
    IF v_md5 IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-5a part 2: the live % is not its last declaration''s body (%)', v_pairs[i][1], v_md5;
    END IF;
  END LOOP;
END $pre$;

-- ------------------------------------------------------------ 1. transition_listing_core (new; transition_listing's body, whole, from its last declaration)
CREATE FUNCTION public.transition_listing_core(p_listing_id uuid, p_new_status text)
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

-- Proof: catalog facts, then the calls on scratch rows under a sentinel rollback.
DO $proof$
DECLARE
  v_hex     text := replace(gen_random_uuid()::text, '-', '');
  v_tag     text;
  -- 'XZ': a scratch code no market holds, as earlier proofs' (K4: a recorded proof exception)
  v_code    character(2) := 'XZ';
  v_lang    text := public.language_code('base');
  v_a       uuid := gen_random_uuid();
  v_b       uuid := gen_random_uuid();
  v_d       uuid := gen_random_uuid();
  v_none    uuid := gen_random_uuid();
  v_ca      text := json_build_object('sub', v_a::text, 'role', 'authenticated')::text;
  v_cb      text := json_build_object('sub', v_b::text, 'role', 'authenticated')::text;
  v_cd      text := json_build_object('sub', v_d::text, 'role', 'authenticated')::text;
  v_r0      text;
  v_anc     uuid;
  v_region  uuid;
  v_city    uuid;
  v_cat     uuid;
  v_answer  jsonb;
  v_count   integer;
  v_refused bigint;
  v_snap    text;
  v_snap2   text;
  v_msg     text;
  v_fn      regprocedure;
  v_pairs   text[][];
  i         integer;
  v_al      uuid := gen_random_uuid();
  v_ad      uuid := gen_random_uuid();
  v_ar      uuid := gen_random_uuid();
  v_ax      uuid := gen_random_uuid();
  v_as      uuid := gen_random_uuid();
  v_bl      uuid := gen_random_uuid();
BEGIN
  v_pairs := ARRAY[
    ['public.transition_listing_core(uuid,text)', '8281cf2fe98b3e674015f4c089db6f39', 'service', 't', 'jsonb']];
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    v_fn := v_pairs[i][1]::regprocedure;
    IF (SELECT prosecdef <> (v_pairs[i][4] = 't') OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}'
               OR prorettype <> v_pairs[i][5]::regtype FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR has_function_privilege('authenticated', v_fn, 'EXECUTE') <> (v_pairs[i][3] = 'browser')
       OR has_function_privilege('service_role', v_fn, 'EXECUTE') <> (v_pairs[i][3] <> 'owner') THEN
      RAISE EXCEPTION 'F1-5a part 2 proof (a): %''s header, return type or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-5a part 2 proof (a): %''s body differs from this file', v_fn;
    END IF;
  END LOOP;

  v_tag := 'e2e-mig-f15a2-' || substr(v_hex, 1, 10);
  v_r0 := 'e2e_mig_r0_' || substr(v_hex, 11, 8);
  BEGIN
    PERFORM set_config('request.jwt.claims', '{}', true);
    IF EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
      RAISE EXCEPTION 'F1-5a part 2 proof: scratch code % already exists', v_code;
    END IF;
    IF EXISTS (SELECT 1 FROM public.listings WHERE id = v_none) THEN
      RAISE EXCEPTION 'F1-5a part 2 proof: the id no row holds is held';
    END IF;
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_code, v_tag, true);
    SELECT a.id INTO v_anc FROM public.locations a WHERE a.country_code = v_code AND a.level = 'country' AND a.name_en = v_tag
     AND a.name_en LIKE 'e2e-mig-%';
    IF v_anc IS NULL THEN RAISE EXCEPTION 'F1-5a part 2 proof: the scratch market has no anchor'; END IF;
    UPDATE public.locations SET is_active = true WHERE id = v_anc AND name_en = v_tag AND name_en LIKE 'e2e-mig-%';
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id)
    VALUES ('region', v_code, v_tag || ' region', v_tag || '-r', true, v_anc) RETURNING id INTO v_region;
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id, center_lat, center_lng)
    VALUES ('city', v_code, v_tag || ' city', v_tag || '-c', true, v_region, 9.03, 38.74) RETURNING id INTO v_city;
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
      (v_a, v_tag || '-a@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_b, v_tag || '-b@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_d, v_tag || '-d@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO public.legal_acceptances (user_id, version_id, language, method)
    SELECT u, v.id, v_lang, 'e2e-mig' FROM public.legal_versions v, unnest(ARRAY[v_a, v_b, v_d]) u
     WHERE v.status = 'published' AND v.effective_at <= now();
    UPDATE public.profiles SET account_status = 'deactivated'
     WHERE user_id = v_d
       AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = v_d AND u.email LIKE 'e2e-mig-%');
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES (v_tag || ' leaf', v_tag, true, true, true, 9999) RETURNING id INTO v_cat;
    INSERT INTO public.listing_packages (key, kind, name_en, days, enabled, self_serve, extends_lifetime, sort)
    VALUES (v_r0, 'reach', v_tag || ' reach', 30, true, true, false, 9001);
    INSERT INTO public.market_settings (country_code, free_regular_ads, included_reach, paid_levels)
    VALUES (v_code, 20, v_r0, false);

    INSERT INTO public.listings (id, seller_id, category_id, location_id, title, description, home_country_code, status,
                                 published_at, published_first_at, expires_at)
    VALUES (v_al, v_a, v_cat, v_city, v_tag || ' al', 'scratch', v_code, 'active',
            now(), now(), now() + interval '10 days');
    INSERT INTO public.listings (id, seller_id, category_id, location_id, title, description, home_country_code, status,
                                 published_at, published_first_at, expires_at)
    VALUES (v_ad, v_a, v_cat, v_city, v_tag || ' ad', 'scratch', v_code, 'draft',
            NULL, NULL, NULL);
    INSERT INTO public.listings (id, seller_id, category_id, location_id, title, description, home_country_code, status,
                                 published_at, published_first_at, expires_at)
    VALUES (v_ar, v_a, v_cat, v_city, v_tag || ' ar', 'scratch', v_code, 'removed',
            NULL, NULL, NULL);
    INSERT INTO public.listings (id, seller_id, category_id, location_id, title, description, home_country_code, status,
                                 published_at, published_first_at, expires_at)
    VALUES (v_ax, v_a, v_cat, v_city, v_tag || ' ax', 'scratch', v_code, 'removed',
            NULL, NULL, NULL);
    INSERT INTO public.listings (id, seller_id, category_id, location_id, title, description, home_country_code, status,
                                 published_at, published_first_at, expires_at)
    VALUES (v_as, v_a, v_cat, v_city, v_tag || ' as', 'scratch', v_code, 'screening',
            NULL, NULL, NULL);
    INSERT INTO public.listings (id, seller_id, category_id, location_id, title, description, home_country_code, status,
                                 published_at, published_first_at, expires_at)
    VALUES (v_bl, v_b, v_cat, v_city, v_tag || ' bl', 'scratch', v_code, 'active',
            now(), now(), now() + interval '10 days');
    UPDATE public.listings SET deleted_at = now() WHERE id = v_ax;
    PERFORM set_config('request.jwt.claims', '{}', true);
    SELECT coalesce((SELECT string_agg(to_jsonb(l)::text, '|' ORDER BY l.id) FROM public.listings l WHERE l.seller_id IN (v_a, v_b, v_d)), '')
        || '#' || (SELECT count(*) FROM public.listing_revisions r WHERE r.seller_id IN (v_a, v_b, v_d))
        || '#' || coalesce((SELECT string_agg(p.id::text || '@' || p.display_order, ',' ORDER BY p.id) FROM public.listing_photos p
                              JOIN public.listings l ON l.id = p.listing_id WHERE l.seller_id IN (v_a, v_b, v_d)), '')
        || '#' || (SELECT count(*) FROM public.listing_photo_changes c JOIN public.listings l ON l.id = c.listing_id
                    WHERE l.seller_id IN (v_a, v_b, v_d))
        || '#' || (SELECT count(*) FROM storage.objects o WHERE o.name LIKE v_tag || '%')
        || '#' || coalesce((SELECT string_agg(to_jsonb(s)::text, '|' ORDER BY s.user_id) FROM public.seller_places s
                              WHERE s.user_id IN (v_a, v_b, v_d)), '')
        || '#' || coalesce((SELECT string_agg(to_jsonb(p)::text, '|' ORDER BY p.user_id) FROM public.profiles p
                              WHERE p.user_id IN (v_a, v_b, v_d)
                                AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = p.user_id AND u.email LIKE 'e2e-mig-%')), '')
        || '#' || (SELECT count(*) FROM public.audit_log a WHERE a.actor_id IN (v_a, v_b, v_d)
                    OR a.entity_id IN (SELECT l.id::text FROM public.listings l WHERE l.seller_id IN (v_a, v_b, v_d)))
        || '#' || (SELECT count(*) FROM public.seller_notices n WHERE n.seller_id IN (v_a, v_b, v_d))
      INTO v_snap;
    -- (b) the service path: no caller.
    PERFORM set_config('request.jwt.claims', '{}', true);
    BEGIN
      PERFORM public.transition_listing_core(v_al, 'bogus');
      RAISE EXCEPTION 'F1-5a part 2 proof: an unknown status did not refuse';
    EXCEPTION WHEN SQLSTATE 'P0D01' THEN
      IF SQLERRM IS DISTINCT FROM 'badValue:status' THEN
        RAISE EXCEPTION 'F1-5a part 2 proof: an unknown status refused %', SQLERRM;
      END IF;
    END;
    BEGIN
      PERFORM public.transition_listing_core(v_none, 'sold');
      RAISE EXCEPTION 'F1-5a part 2 proof: the service path on an id no row holds did not refuse';
    EXCEPTION WHEN SQLSTATE 'P0D01' THEN
      IF SQLERRM IS DISTINCT FROM 'listingNotFound' THEN
        RAISE EXCEPTION 'F1-5a part 2 proof: the service path on an id no row holds refused %', SQLERRM;
      END IF;
    END;
    BEGIN
      PERFORM public.transition_listing_core(v_ad, 'sold');
      RAISE EXCEPTION 'F1-5a part 2 proof: a draft sold did not refuse';
    EXCEPTION WHEN SQLSTATE 'P0D01' THEN
      IF SQLERRM IS DISTINCT FROM 'illegalTransition:draft-sold' THEN
        RAISE EXCEPTION 'F1-5a part 2 proof: a draft sold refused %', SQLERRM;
      END IF;
    END;
    -- (c) the owner path: DEC-391, then each rule with every earlier check cleared.
    PERFORM set_config('request.jwt.claims', v_ca, true);
    BEGIN
      PERFORM public.transition_listing_core(v_none, 'sold');
      RAISE EXCEPTION 'F1-5a part 2 proof: an owner on an id no row holds did not refuse';
    EXCEPTION WHEN SQLSTATE 'P0D01' THEN
      IF SQLERRM IS DISTINCT FROM 'notYourListing' THEN
        RAISE EXCEPTION 'F1-5a part 2 proof: an owner on an id no row holds refused %', SQLERRM;
      END IF;
    END;
    BEGIN
      PERFORM public.transition_listing_core(v_bl, 'sold');
      RAISE EXCEPTION 'F1-5a part 2 proof: an owner on another seller''s ad did not refuse';
    EXCEPTION WHEN SQLSTATE 'P0D01' THEN
      IF SQLERRM IS DISTINCT FROM 'notYourListing' THEN
        RAISE EXCEPTION 'F1-5a part 2 proof: an owner on another seller''s ad refused %', SQLERRM;
      END IF;
    END;
    BEGIN
      PERFORM public.transition_listing_core(v_as, 'active');
      RAISE EXCEPTION 'F1-5a part 2 proof: an owner approving his own ad did not refuse';
    EXCEPTION WHEN SQLSTATE 'P0D01' THEN
      IF SQLERRM IS DISTINCT FROM 'reviewerOnly:screening-active' THEN
        RAISE EXCEPTION 'F1-5a part 2 proof: an owner approving his own ad refused %', SQLERRM;
      END IF;
    END;
    BEGIN
      PERFORM public.transition_listing_core(v_al, 'paused');
      RAISE EXCEPTION 'F1-5a part 2 proof: an owner pausing did not refuse';
    EXCEPTION WHEN SQLSTATE 'P0D01' THEN
      IF SQLERRM IS DISTINCT FROM 'serviceOnly:active-paused' THEN
        RAISE EXCEPTION 'F1-5a part 2 proof: an owner pausing refused %', SQLERRM;
      END IF;
    END;
    BEGIN
      PERFORM public.transition_listing_core(v_ar, 'screening');
      RAISE EXCEPTION 'F1-5a part 2 proof: an owner restoring a removed ad did not refuse';
    EXCEPTION WHEN SQLSTATE 'P0D01' THEN
      IF SQLERRM IS DISTINCT FROM 'enforcementOnly:removed-screening' THEN
        RAISE EXCEPTION 'F1-5a part 2 proof: an owner restoring a removed ad refused %', SQLERRM;
      END IF;
    END;
    BEGIN
      PERFORM public.transition_listing_core(v_ax, 'screening');
      RAISE EXCEPTION 'F1-5a part 2 proof: an owner restoring his deleted ad did not refuse';
    EXCEPTION WHEN SQLSTATE 'P0D01' THEN
      IF SQLERRM IS DISTINCT FROM 'ownerDeleted' THEN
        RAISE EXCEPTION 'F1-5a part 2 proof: an owner restoring his deleted ad refused %', SQLERRM;
      END IF;
    END;
    BEGIN
      PERFORM public.transition_listing_core(v_ad, 'closed');
      RAISE EXCEPTION 'F1-5a part 2 proof: a draft closed did not refuse';
    EXCEPTION WHEN SQLSTATE 'P0D01' THEN
      IF SQLERRM IS DISTINCT FROM 'illegalTransition:draft-closed' THEN
        RAISE EXCEPTION 'F1-5a part 2 proof: a draft closed refused %', SQLERRM;
      END IF;
    END;
    PERFORM set_config('request.jwt.claims', '{}', true);
    SELECT coalesce((SELECT string_agg(to_jsonb(l)::text, '|' ORDER BY l.id) FROM public.listings l WHERE l.seller_id IN (v_a, v_b, v_d)), '')
        || '#' || (SELECT count(*) FROM public.listing_revisions r WHERE r.seller_id IN (v_a, v_b, v_d))
        || '#' || coalesce((SELECT string_agg(p.id::text || '@' || p.display_order, ',' ORDER BY p.id) FROM public.listing_photos p
                              JOIN public.listings l ON l.id = p.listing_id WHERE l.seller_id IN (v_a, v_b, v_d)), '')
        || '#' || (SELECT count(*) FROM public.listing_photo_changes c JOIN public.listings l ON l.id = c.listing_id
                    WHERE l.seller_id IN (v_a, v_b, v_d))
        || '#' || (SELECT count(*) FROM storage.objects o WHERE o.name LIKE v_tag || '%')
        || '#' || coalesce((SELECT string_agg(to_jsonb(s)::text, '|' ORDER BY s.user_id) FROM public.seller_places s
                              WHERE s.user_id IN (v_a, v_b, v_d)), '')
        || '#' || coalesce((SELECT string_agg(to_jsonb(p)::text, '|' ORDER BY p.user_id) FROM public.profiles p
                              WHERE p.user_id IN (v_a, v_b, v_d)
                                AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = p.user_id AND u.email LIKE 'e2e-mig-%')), '')
        || '#' || (SELECT count(*) FROM public.audit_log a WHERE a.actor_id IN (v_a, v_b, v_d)
                    OR a.entity_id IN (SELECT l.id::text FROM public.listings l WHERE l.seller_id IN (v_a, v_b, v_d)))
        || '#' || (SELECT count(*) FROM public.seller_notices n WHERE n.seller_id IN (v_a, v_b, v_d))
      INTO v_snap2;
    IF v_snap2 IS DISTINCT FROM v_snap THEN
      RAISE EXCEPTION 'F1-5a part 2 proof: a refusal of the core left a trace';
    END IF;
    -- (d) the owner closes his live ad; the service pauses one; each writes its revision.
    PERFORM set_config('request.jwt.claims', v_ca, true);
    v_answer := public.transition_listing_core(v_al, 'closed');
    IF NOT coalesce(v_answer = jsonb_build_object('ok', true, 'status', 'closed'), false) THEN
      RAISE EXCEPTION 'F1-5a part 2 proof: the owner''s close did not answer ok';
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    v_answer := public.transition_listing_core(v_bl, 'paused');
    IF NOT coalesce(v_answer = jsonb_build_object('ok', true, 'status', 'paused'), false) THEN
      RAISE EXCEPTION 'F1-5a part 2 proof: the service''s pause did not answer ok';
    END IF;
    IF NOT coalesce((SELECT status = 'closed' AND resume_status = 'active' AND clock_kept FROM public.listings WHERE id = v_al), false) THEN
      RAISE EXCEPTION 'F1-5a part 2 proof: the close did not keep the ad''s time and status';
    END IF;
    IF NOT coalesce((SELECT status = 'paused' AND resume_status = 'active' FROM public.listings WHERE id = v_bl), false) THEN
      RAISE EXCEPTION 'F1-5a part 2 proof: the pause did not keep the ad''s status';
    END IF;
    IF NOT coalesce((SELECT count(*) = 1 FROM public.listing_revisions WHERE listing_id = v_al AND kind = 'state' AND actor = v_a)
       AND (SELECT count(*) = 1 FROM public.listing_revisions WHERE listing_id = v_bl AND kind = 'state' AND actor IS NULL), false) THEN
      RAISE EXCEPTION 'F1-5a part 2 proof: a transition''s revision is missing';
    END IF;
    -- (e) the core spends no dial.
    IF NOT coalesce(NOT EXISTS (SELECT 1 FROM public.rate_limits WHERE key IN (v_a::text, v_b::text, v_d::text)), false) THEN
      RAISE EXCEPTION 'F1-5a part 2 proof: the core spent a dial';
    END IF;

    RAISE EXCEPTION 'f1-5a-part-2-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f1-5a-part-2-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261116030000') ON CONFLICT DO NOTHING;
