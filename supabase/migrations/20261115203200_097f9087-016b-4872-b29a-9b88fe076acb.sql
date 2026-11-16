-- e2e-areas: admin-listings, my-listings

-- Foundations 1, turn F1-5a, part 3 — THE STATE MACHINE'S SQL CALLERS ONTO THE CORE (DEC-333, DEC-391; brief
-- docs/governance/briefs/f1-doors-5a.md, ruling docs/governance/briefs/f1-doors-5a-ruling-1.md).
-- admin_move_listing_core (SECURITY INVOKER, under the definer admin_move_listing; F1-6's door) and
-- designation_sweep_core (the expiry and level sweep; cron, no caller) are redeclared WHOLE from their last
-- declarations (live md5 checked); each calls transition_listing_core where it called transition_listing, so
-- neither meets the door's returned answer when the last part puts transition_listing on the shell. Ruling 1 §4: the
-- staff move spends revise where the transition spent it (rate_gate, before the core); the sweep spends none, as
-- before (no caller). Their grants are restated as they stand: the move's only its owner's, the sweep's the
-- service role's.

DO $pre$
DECLARE
  v_pairs text[][] := ARRAY[
    ['public.admin_move_listing_core(uuid,text,text,text)', '59c64012ffe2501ad34dd2570669cefb'],
    ['public.designation_sweep_core(uuid[])', '1d10d4f569f2cf8f6bfe5483ece5f022']];
  v_md5  text;
  i      integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261116030000') THEN
    RAISE EXCEPTION 'F1-5a part 3: part 2 (mark 20261116030000) must be applied first';
  END IF;
  IF to_regprocedure('public.door_refuse(text,text)') IS NULL
     OR to_regprocedure('public.door_refused(text,text,text)') IS NULL
     OR NOT EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'door_context' AND pronamespace = 'public'::regnamespace) THEN
    RAISE EXCEPTION 'F1-5a part 3: the door mechanism (door_context, door_refuse, door_refused) is missing';
  END IF;
  IF to_regprocedure('public.transition_listing_core(uuid,text)') IS NULL THEN
    RAISE EXCEPTION 'F1-5a part 3: transition_listing_core (part 2) is missing';
  END IF;
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_pairs[i][1]::regprocedure;
    IF v_md5 IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-5a part 3: the live % is not its last declaration''s body (%)', v_pairs[i][1], v_md5;
    END IF;
  END LOOP;
END $pre$;

-- ------------------------------------------------------------ 1. admin_move_listing_core (whole; onto the core, revise spent before it)
CREATE OR REPLACE FUNCTION public.admin_move_listing_core(p_listing_id uuid, p_to text, p_reason text, p_note text DEFAULT NULL::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY INVOKER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid  uuid := auth.uid();
  v_row  public.listings%ROWTYPE;
  v_note text := nullif(btrim(coalesce(p_note, '')), '');
  v_kind text;
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'not signed in';
  END IF;
  IF NOT public.has_permission(v_uid, 'listings', 'enforce') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  IF EXISTS (SELECT 1 FROM public.profiles WHERE user_id = v_uid AND account_status = 'deactivated') THEN
    RAISE EXCEPTION 'account is deactivated';
  END IF;
  IF p_to IS NULL OR p_to NOT IN ('removed','screening') THEN
    RAISE EXCEPTION 'unknown move';
  END IF;

  SELECT * INTO v_row FROM public.listings WHERE id = p_listing_id FOR UPDATE;
  IF NOT FOUND OR v_row.status = 'draft' THEN
    RAISE EXCEPTION 'listing not found';
  END IF;
  IF v_row.seller_id = v_uid THEN
    RAISE EXCEPTION 'your own listing is changed the seller''s way';
  END IF;
  v_kind := CASE
    WHEN p_to = 'removed' AND v_row.status <> 'removed' THEN 'admin_remove'
    WHEN p_to = 'screening' AND v_row.status = 'removed' THEN 'admin_restore'
    WHEN p_to = 'screening' AND v_row.status IN ('active','reduced') THEN 'admin_send_back'
  END;
  IF v_kind IS NULL THEN
    RAISE EXCEPTION 'illegal move: % -> %', v_row.status, p_to;
  END IF;

  IF p_reason IS NULL OR NOT (
       (v_kind = 'admin_remove' AND p_reason IN ('prohibited','misleading','duplicate','contact_in_text','photo','rules','other'))
    OR (v_kind = 'admin_restore' AND p_reason IN ('removed_in_error','appeal_accepted','other'))
    OR (v_kind = 'admin_send_back' AND p_reason IN ('wrong_category','misleading','contact_in_text','photo','rules','other'))) THEN
    RAISE EXCEPTION 'unknown reason';
  END IF;
  IF p_reason = 'other' AND v_note IS NULL THEN
    RAISE EXCEPTION 'a note is required';
  END IF;
  IF v_note IS NOT NULL AND char_length(v_note) > 500 THEN
    RAISE EXCEPTION 'the note is too long';
  END IF;
  -- D137 — read before the second factor is asked, so the refusal names the rule.
  IF v_kind = 'admin_restore' AND coalesce(v_row.screening->>'severe','false') = 'true'
     AND NOT public.is_super_admin(v_uid) THEN
    RAISE EXCEPTION 'a listing removed for a severe reason is restored by a super admin only';
  END IF;
  PERFORM public.require_step_up_if_needed('listings', 'enforce');

  -- The state machine moves the listing and writes its revision (kind state). F1-5a (ruling 1 §4) — the
  -- staff move spends revise where the transition spent it, and moves the listing through the core.
  IF NOT coalesce((public.rate_gate('revise')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;
  PERFORM public.transition_listing_core(p_listing_id, p_to);

  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
    VALUES (v_uid, 'listing.' || v_kind, 'listing', p_listing_id::text,
            jsonb_strip_nulls(jsonb_build_object('from', v_row.status, 'to', p_to, 'reason', p_reason, 'note', v_note)));
  INSERT INTO public.seller_notices (seller_id, listing_id, kind, fields, reason, note)
    VALUES (v_row.seller_id, p_listing_id, v_kind, ARRAY['status'], p_reason, v_note);

  RETURN jsonb_build_object('ok', true, 'kind', v_kind, 'status', p_to);
END $function$;
REVOKE ALL ON FUNCTION public.admin_move_listing_core(uuid, text, text, text) FROM PUBLIC, anon, authenticated, service_role;

-- ------------------------------------------------------------ 2. designation_sweep_core (whole; its expiry onto the core)
CREATE OR REPLACE FUNCTION public.designation_sweep_core(p_only uuid[] DEFAULT NULL)
RETURNS TABLE (n_expired integer, n_level_ended integer, n_level_paused integer, n_reach_ended integer, n_reminded integer)
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path TO 'public'
AS $fn$
DECLARE
  v_id       uuid;
  v_row      public.listings%ROWTYPE;
  v_after    public.listings%ROWTYPE;
  v_base     text;
  v_country  char(2);
  v_market   public.market_settings%ROWTYPE;
  v_live     integer;
  v_pause    boolean;
  v_before   uuid[];
  v_after_pl uuid[];
  v_removed  uuid[];
BEGIN
  n_expired := 0; n_level_ended := 0; n_level_paused := 0; n_reach_ended := 0; n_reminded := 0;
  v_base := public.baseline_level_key();  -- law 11 (DEC-341)

  -- 1. Expiry (INC-470, INC-626): each due ad expires through the state machine.
  FOR v_id IN
    SELECT l.id FROM public.listings l
     WHERE l.status IN ('active','reduced') AND l.expires_at IS NOT NULL AND l.expires_at < now()
       AND (p_only IS NULL OR l.id = ANY (p_only))
     ORDER BY l.expires_at
  LOOP
    PERFORM public.transition_listing_core(v_id, 'expired');
    n_expired := n_expired + 1;
  END LOOP;

  -- 2. A level's end: the slot counted before the fall; the pause without a slot.
  FOR v_row IN
    SELECT l.* FROM public.listings l
     WHERE l.tier_until IS NOT NULL AND l.tier_until < now() AND l.status IN ('active','reduced')
       AND (p_only IS NULL OR l.id = ANY (p_only))
     ORDER BY l.tier_until, l.id
     FOR UPDATE
  LOOP
    SELECT loc.country_code INTO v_country FROM public.locations loc
     WHERE loc.id = coalesce(v_row.location_id,
                             (SELECT ll.location_id FROM public.listing_locations ll
                               WHERE ll.listing_id = v_row.id ORDER BY ll.position, ll.location_id LIMIT 1));
    v_market := public.market_settings_for(v_country);
    v_live   := public.seller_regular_live(v_row.seller_id, v_country);
    v_pause  := v_live >= v_market.free_regular_ads;
    -- DEC-342: fall and pause in ONE UPDATE (a paused row never enters part 8's counted set).
    UPDATE public.listings
       SET tier = v_base, tier_until = NULL, tier_source = NULL, tier_reminded_for = NULL,
           status = CASE WHEN v_pause THEN 'paused' ELSE status END,
           clock_kept = CASE WHEN v_pause THEN true ELSE clock_kept END,
           kept_remaining = CASE WHEN v_pause THEN (CASE WHEN expires_at IS NULL THEN NULL
                                                        ELSE greatest(expires_at - now(), interval '0') END)
                                 ELSE kept_remaining END,
           resume_status = CASE WHEN v_pause THEN status ELSE resume_status END,
           updated_at = now()
     WHERE id = v_row.id
     RETURNING * INTO v_after;
    INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
      VALUES (v_row.id, v_row.seller_id, 'edit',
              jsonb_build_object('tier', v_row.tier, 'tier_until', v_row.tier_until, 'tier_source', v_row.tier_source),
              jsonb_build_object('tier', v_after.tier, 'tier_until', v_after.tier_until, 'tier_source', v_after.tier_source),
              NULL);
    INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
      VALUES (NULL, 'listing.level_ended', 'listing', v_row.id::text,
              jsonb_strip_nulls(jsonb_build_object('from', v_row.tier, 'to', v_base, 'until', v_row.tier_until,
                                                   'source', v_row.tier_source)));
    n_level_ended := n_level_ended + 1;
    IF v_pause THEN
      INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
      VALUES (v_row.id, v_row.seller_id, 'state', jsonb_build_object('status', v_row.status),
              jsonb_build_object('status', 'paused'), NULL);
      INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
        VALUES (NULL, 'listing.level_paused', 'listing', v_row.id::text,
                jsonb_build_object('from', v_row.tier, 'live', v_live, 'slots', v_market.free_regular_ads));
      INSERT INTO public.seller_notices (seller_id, listing_id, kind) VALUES (v_row.seller_id, v_row.id, 'level_paused');
      n_level_paused := n_level_paused + 1;
    END IF;
  END LOOP;

  -- 3. A reach's end, on any status: the places trimmed (part 2, DEC-330).
  FOR v_row IN
    SELECT l.* FROM public.listings l
     WHERE l.reach_until IS NOT NULL AND l.reach_until < now()
       AND (p_only IS NULL OR l.id = ANY (p_only))
     ORDER BY l.reach_until, l.id
     FOR UPDATE
  LOOP
    SELECT coalesce(array_agg(ll.location_id ORDER BY ll.position, ll.location_id), ARRAY[]::uuid[])
      INTO v_before FROM public.listing_locations ll WHERE ll.listing_id = v_row.id;
    v_removed := public.listing_places_trim(v_row.id);
    SELECT coalesce(array_agg(ll.location_id ORDER BY ll.position, ll.location_id), ARRAY[]::uuid[])
      INTO v_after_pl FROM public.listing_locations ll WHERE ll.listing_id = v_row.id;
    UPDATE public.listings
       SET reach = NULL, reach_until = NULL, reach_source = NULL, updated_at = now()
     WHERE id = v_row.id;
    INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
      VALUES (v_row.id, v_row.seller_id, 'edit',
              jsonb_build_object('reach', v_row.reach, 'reach_until', v_row.reach_until, 'reach_source', v_row.reach_source,
                                 'coverage', to_jsonb(v_before)),
              jsonb_build_object('reach', NULL, 'reach_until', NULL, 'reach_source', NULL,
                                 'coverage', to_jsonb(v_after_pl), 'removed', to_jsonb(v_removed)),
              NULL);
    INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
      VALUES (NULL, 'listing.reach_ended', 'listing', v_row.id::text,
              jsonb_strip_nulls(jsonb_build_object('from', v_row.reach, 'until', v_row.reach_until, 'source', v_row.reach_source,
                                                   'removed', cardinality(v_removed))));
    IF cardinality(v_removed) > 0 THEN
      PERFORM public.feed_reindex_enqueue_listings(ARRAY[v_row.id]);
    END IF;
    n_reach_ended := n_reach_ended + 1;
  END LOOP;

  -- 4. The reminder: once per end (D306).
  FOR v_row IN
    SELECT l.* FROM public.listings l
     WHERE l.status IN ('active','reduced') AND l.tier_until IS NOT NULL
       AND l.tier_until > now() AND l.tier_until <= now() + interval '3 days'
       AND l.tier_reminded_for IS DISTINCT FROM l.tier_until
       AND (p_only IS NULL OR l.id = ANY (p_only))
     ORDER BY l.tier_until, l.id
     FOR UPDATE
  LOOP
    INSERT INTO public.seller_notices (seller_id, listing_id, kind) VALUES (v_row.seller_id, v_row.id, 'level_ending');
    UPDATE public.listings SET tier_reminded_for = v_row.tier_until WHERE id = v_row.id;
    n_reminded := n_reminded + 1;
  END LOOP;

  RETURN NEXT;
  RETURN;
END $fn$;
REVOKE ALL ON FUNCTION public.designation_sweep_core(uuid[]) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.designation_sweep_core(uuid[]) TO service_role;

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
  v_due     uuid := gen_random_uuid();
  v_bl      uuid := gen_random_uuid();
  v_s       uuid := gen_random_uuid();
  v_sess    uuid := gen_random_uuid();
  v_role    uuid;
BEGIN
  v_pairs := ARRAY[
    ['public.admin_move_listing_core(uuid,text,text,text)', '403c8acf9fa61ebe3dd3a87676ddba53', 'owner', 'f', 'jsonb'],
    ['public.designation_sweep_core(uuid[])', 'df68f448b67d7bba8dbb6d23328fd118', 'service', 't', 'record']];
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    v_fn := v_pairs[i][1]::regprocedure;
    IF (SELECT prosecdef <> (v_pairs[i][4] = 't') OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}'
               OR prorettype <> v_pairs[i][5]::regtype FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR has_function_privilege('authenticated', v_fn, 'EXECUTE') <> (v_pairs[i][3] = 'browser')
       OR has_function_privilege('service_role', v_fn, 'EXECUTE') <> (v_pairs[i][3] <> 'owner') THEN
      RAISE EXCEPTION 'F1-5a part 3 proof (a): %''s header, return type or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-5a part 3 proof (a): %''s body differs from this file', v_fn;
    END IF;
  END LOOP;

  v_tag := 'e2e-mig-f15a3-' || substr(v_hex, 1, 10);
  v_r0 := 'e2e_mig_r0_' || substr(v_hex, 11, 8);
  BEGIN
    PERFORM set_config('request.jwt.claims', '{}', true);
    IF EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
      RAISE EXCEPTION 'F1-5a part 3 proof: scratch code % already exists', v_code;
    END IF;
    IF EXISTS (SELECT 1 FROM public.listings WHERE id = v_none) THEN
      RAISE EXCEPTION 'F1-5a part 3 proof: the id no row holds is held';
    END IF;
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_code, v_tag, true);
    SELECT a.id INTO v_anc FROM public.locations a WHERE a.country_code = v_code AND a.level = 'country' AND a.name_en = v_tag
     AND a.name_en LIKE 'e2e-mig-%';
    IF v_anc IS NULL THEN RAISE EXCEPTION 'F1-5a part 3 proof: the scratch market has no anchor'; END IF;
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
    VALUES (v_due, v_a, v_cat, v_city, v_tag || ' due', 'scratch', v_code, 'active',
            now(), now(), now() + interval '10 days');
    INSERT INTO public.listings (id, seller_id, category_id, location_id, title, description, home_country_code, status,
                                 published_at, published_first_at, expires_at)
    VALUES (v_bl, v_b, v_cat, v_city, v_tag || ' bl', 'scratch', v_code, 'active',
            now(), now(), now() + interval '10 days');
    UPDATE public.listings SET expires_at = now() - interval '1 minute' WHERE id = v_due;
    -- (b) the sweep expires a due ad through the core, with no caller.
    PERFORM set_config('request.jwt.claims', '{}', true);
    SELECT n_expired INTO v_count FROM public.designation_sweep_core(ARRAY[v_due]);
    IF NOT coalesce(v_count = 1, false) THEN
      RAISE EXCEPTION 'F1-5a part 3 proof: the sweep did not expire the due ad';
    END IF;
    IF NOT coalesce((SELECT status = 'expired' AND resume_status = 'active' FROM public.listings WHERE id = v_due), false) THEN
      RAISE EXCEPTION 'F1-5a part 3 proof: the due ad did not expire';
    END IF;
    IF NOT coalesce((SELECT count(*) = 1 FROM public.listing_revisions WHERE listing_id = v_due AND kind = 'state' AND actor IS NULL), false) THEN
      RAISE EXCEPTION 'F1-5a part 3 proof: the expiry''s revision is missing';
    END IF;
    -- (c) a staff member with listings:enforce and a fresh second factor removes another seller's ad.
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at)
    VALUES (v_s, v_tag || '-s@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-enforce', v_tag) RETURNING id INTO v_role;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'listings' AND p.action = 'enforce';
    IF NOT EXISTS (SELECT 1 FROM public.role_permissions WHERE role_id = v_role) THEN
      RAISE EXCEPTION 'F1-5a part 3 proof: listings:enforce is not declared';
    END IF;
    INSERT INTO public.user_roles (user_id, role_id, scope_type) VALUES (v_s, v_role, 'global');
    INSERT INTO auth.mfa_factors (id, user_id, friendly_name, factor_type, status, created_at, updated_at)
    VALUES (gen_random_uuid(), v_s, v_tag || '-f', 'totp', 'verified', now(), now());
    INSERT INTO auth.sessions (id, user_id, created_at, updated_at, aal) VALUES (v_sess, v_s, now(), now(), 'aal2');
    INSERT INTO auth.mfa_amr_claims (id, session_id, created_at, updated_at, authentication_method)
    VALUES (gen_random_uuid(), v_sess, now(), now(), 'totp');
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_s::text, 'role', 'authenticated', 'aal', 'aal2',
                                                               'session_id', v_sess::text)::text, true);
    v_answer := public.admin_move_listing_core(v_bl, 'removed', 'rules', NULL);
    IF NOT coalesce(v_answer = jsonb_build_object('ok', true, 'kind', 'admin_remove', 'status', 'removed'), false) THEN
      RAISE EXCEPTION 'F1-5a part 3 proof: the staff move did not answer ok';
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    IF NOT coalesce((SELECT status = 'removed' FROM public.listings WHERE id = v_bl), false) THEN
      RAISE EXCEPTION 'F1-5a part 3 proof: the staff move did not remove the ad';
    END IF;
    IF NOT coalesce((SELECT count(*) = 1 FROM public.listing_revisions WHERE listing_id = v_bl AND kind = 'state' AND actor = v_s)
       AND (SELECT count(*) = 1 FROM public.audit_log WHERE entity_id = v_bl::text AND action = 'listing.admin_remove')
       AND (SELECT count(*) = 1 FROM public.seller_notices WHERE listing_id = v_bl AND kind = 'admin_remove'), false) THEN
      RAISE EXCEPTION 'F1-5a part 3 proof: the staff move''s revision, audit line or notice is missing';
    END IF;
    -- (d) ruling 1 §4: the staff move spent revise once; the sweep spent nothing.
    IF NOT coalesce((SELECT coalesce(sum(count), 0) = 1 FROM public.rate_limits WHERE key = v_s::text AND action = 'revise')
       AND NOT EXISTS (SELECT 1 FROM public.rate_limits WHERE key IN (v_a::text, v_b::text)), false) THEN
      RAISE EXCEPTION 'F1-5a part 3 proof: the dials are not as the move and the sweep spend them';
    END IF;

    RAISE EXCEPTION 'f1-5a-part-3-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f1-5a-part-3-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261116030100') ON CONFLICT DO NOTHING;
