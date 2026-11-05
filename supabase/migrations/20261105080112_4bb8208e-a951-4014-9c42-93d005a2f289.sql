-- e2e-areas: admin-listings
-- P-2 (a) M-1c, part 9 of 9 — staff lowering a live ad to the baseline with no free slot pause it (ruling 12,
-- DEC-342). admin_set_listing_tier redeclared WHOLE from 20261104154000 :28 (live md5 checked, G39): for a LIVE
-- (active|reduced) ad going to the baseline, the ad's market (primary place) and seller_regular_live decide;
-- no slot → the fall and the pause in the ONE UPDATE (the paused row never enters part 8's counted set, so the
-- guard stays quiet; with a slot the guard counts and passes), a 'state' revision, audit listing.level_paused,
-- one seller_notices row (the sweep's way, D306); the answer carries 'status'; staff are never refused for a
-- live ad. A screening or held ad lowered with no slot is refused noFreeSlot by the guard (it cannot pause:
-- listings_resume_status_check) — reported. Split from part 8 by rule 30 (one file at 25 KB). Law 11; CF-SQL-1;
-- proofs on scratch rows (a stepped-up scratch admin), sentinel.

DO $pre$
DECLARE
  v_md5 text;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261105100800')
     OR to_regprocedure('public.listings_free_slot_guard()') IS NULL THEN
    RAISE EXCEPTION 'P-2 M-1c part 9: part 8 (811e9980) must be applied first';
  END IF;
  SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p
   WHERE p.oid = 'public.admin_set_listing_tier(uuid,text,text,text,integer)'::regprocedure;
  IF v_md5 IS DISTINCT FROM '58168fb4fc5595b0f231d46afaf7d9fa' THEN
    RAISE EXCEPTION 'P-2 M-1c part 9: the live admin_set_listing_tier is not 20261104154000''s body (%)', v_md5;
  END IF;
END $pre$;

-- ------------------------------------------------------------ 1. admin_set_listing_tier (whole from 20261104154000 :28)
-- New: a LIVE ad lowered to the baseline with no free slot in its market falls and pauses in the ONE UPDATE
-- (clock kept, resume_status the live status), with a 'state' revision, audit listing.level_paused and one
-- seller_notices row (as the sweep does, D306); the answer carries 'status'. Every other byte as before.
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
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'not signed in';
  END IF;
  IF NOT public.has_permission(v_uid, 'listings', 'enforce') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  IF EXISTS (SELECT 1 FROM public.profiles WHERE user_id = v_uid AND account_status = 'deactivated') THEN
    RAISE EXCEPTION 'account is deactivated';
  END IF;
  IF NOT coalesce((public.rate_gate('staff_moderation')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;

  SELECT * INTO v_level FROM public.listing_packages WHERE key = p_tier AND kind = 'level' AND enabled FOR SHARE;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'unknown tier';
  END IF;
  SELECT * INTO v_row FROM public.listings WHERE id = p_listing_id FOR UPDATE;
  IF NOT FOUND OR v_row.status = 'draft' THEN
    RAISE EXCEPTION 'listing not found';
  END IF;
  IF v_row.seller_id = v_uid THEN
    RAISE EXCEPTION 'your own listing is changed the seller''s way';
  END IF;
  IF v_row.status = 'removed' THEN
    RAISE EXCEPTION 'a removed listing takes no tier';
  END IF;
  IF v_row.tier = p_tier THEN
    RAISE EXCEPTION 'nothing changed';
  END IF;
  IF p_reason IS NULL OR p_reason NOT IN ('promotion','promotion_ended','other') THEN
    RAISE EXCEPTION 'unknown reason';
  END IF;
  IF p_reason = 'other' AND v_note IS NULL THEN
    RAISE EXCEPTION 'a note is required';
  END IF;
  IF v_note IS NOT NULL AND char_length(v_note) > 500 THEN
    RAISE EXCEPTION 'the note is too long';
  END IF;
  IF p_days IS NOT NULL AND (p_days < 1 OR p_days > 3650 OR v_level.is_baseline) THEN
    RAISE EXCEPTION 'badDays';
  END IF;
  PERFORM public.require_step_up_if_needed('listings', 'enforce');

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
END $function$;
COMMENT ON FUNCTION public.admin_set_listing_tier(uuid, text, text, text, integer) IS
  'Staff set an ad''s level (T1 M1, D242, D276; P-2 M-1b adds days): listings:enforce with a fresh second factor; a level row; days set tier_until (NULL = open-ended), source staff; the baseline clears both; a live ad lowered to the baseline with no free slot pauses in the same call (DEC-342); a revision and an audit row.';
REVOKE ALL ON FUNCTION public.admin_set_listing_tier(uuid, text, text, text, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_set_listing_tier(uuid, text, text, text, integer) TO authenticated, service_role;

-- ------------------------------------------------------------ 2. PROOFS
-- (a) header, grants, the new body's md5. (b) scratch market XZ with ONE free slot, a live baseline ad a and
-- two live level ads: staff lower l1 → paused at the baseline in the same call (clock kept, resume_status
-- active, 'edit' and 'state' revisions, audits listing.admin_tier (paused) and listing.level_paused, one
-- notice); with slots (N = 3) l2 → live at the baseline, no pause records; (c) a screening level ad lowered
-- with no slot is refused noFreeSlot and leaves nothing (reported above).
DO $proof$
DECLARE
  v_adm     regprocedure := 'public.admin_set_listing_tier(uuid,text,text,text,integer)'::regprocedure;
  v_seller  uuid := gen_random_uuid();
  v_admin   uuid := gen_random_uuid();
  v_session uuid := gen_random_uuid();
  v_tag     text := 'e2e-mig-p2-m1c9-' || substr(gen_random_uuid()::text, 1, 8);
  v_stem    text := substr(replace(gen_random_uuid()::text, '-', ''), 1, 8);
  v_lv      text := 'e2e_mig_lv_' || v_stem;
  v_r0      text := 'e2e_mig_r0_' || v_stem;
  v_code    char(2) := 'XZ';
  v_anc     uuid;
  v_region  uuid;
  v_city    uuid;
  v_cat     uuid;
  v_a       uuid := gen_random_uuid();
  v_l1      uuid := gen_random_uuid();
  v_l2      uuid := gen_random_uuid();
  v_w       uuid := gen_random_uuid();
  v_row     public.listings%ROWTYPE;
  v_answer  jsonb;
  v_base    text;
  v_msg     text;
  v_detail  text;
  v_snap    text;
  v_snap2   text;
BEGIN
  v_base := public.baseline_level_key();
  -- (a)
  IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' FROM pg_proc WHERE oid = v_adm)
     OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_adm)) a WHERE a.grantee = 0)
     OR has_function_privilege('anon', v_adm, 'EXECUTE')
     OR NOT has_function_privilege('authenticated', v_adm, 'EXECUTE')
     OR NOT has_function_privilege('service_role', v_adm, 'EXECUTE') THEN
    RAISE EXCEPTION 'P-2 M-1c part 9 proof (a): the header or the grants differ';
  END IF;
  IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_adm) IS DISTINCT FROM '93aad2bb17b61bbdac3f3ba886d81861' THEN
    RAISE EXCEPTION 'P-2 M-1c part 9 proof (a): the body differs from this file';
  END IF;

  BEGIN
    IF EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
      RAISE EXCEPTION 'P-2 M-1c part 9 proof: scratch code % already exists', v_code;
    END IF;
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_code, 'e2e-mig-p2-m1c9', true);
    SELECT a.id INTO v_anc FROM public.locations a
     WHERE a.country_code = v_code AND a.level = 'country' AND a.name_en = 'e2e-mig-p2-m1c9';
    IF v_anc IS NULL THEN RAISE EXCEPTION 'P-2 M-1c part 9 proof: the scratch market has no anchor'; END IF;
    UPDATE public.locations SET is_active = true WHERE id = v_anc AND name_en = 'e2e-mig-p2-m1c9';
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id)
    VALUES ('region', v_code, 'E2E P2 M1c9 Region', v_tag || '-r', true, v_anc) RETURNING id INTO v_region;
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id, center_lat, center_lng)
    VALUES ('city', v_code, 'E2E P2 M1c9 City', v_tag || '-c', true, v_region, 9.03, 38.74) RETURNING id INTO v_city;
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
      (v_seller, v_tag || '-seller@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_admin,  v_tag || '-admin@example.invalid',  '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO public.user_roles (user_id, role_id, scope_type)
    SELECT v_admin, r.id, 'global' FROM public.roles r WHERE r.name = 'super_admin';
    INSERT INTO auth.sessions (id, user_id, created_at, updated_at, aal) VALUES (v_session, v_admin, now(), now(), 'aal2');
    INSERT INTO auth.mfa_factors (id, user_id, friendly_name, factor_type, status, created_at, updated_at, secret)
    VALUES (gen_random_uuid(), v_admin, v_tag, 'totp', 'verified', now(), now(), encode(gen_random_bytes(16), 'hex'));
    INSERT INTO auth.mfa_amr_claims (id, session_id, created_at, updated_at, authentication_method)
    VALUES (gen_random_uuid(), v_session, now(), now(), 'totp');
    INSERT INTO public.rate_overrides (user_id, action, max_count) VALUES (v_admin, 'staff_moderation', 10);
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES ('E2E P2 M1c9 Leaf', v_tag, true, true, true, 9999) RETURNING id INTO v_cat;
    INSERT INTO public.listing_packages (key, kind, name_en, days, max_photos, placement, badge, enabled, self_serve, extends_lifetime, sort) VALUES
      (v_lv, 'level', 'E2E P2 level', 10, 6, 'boost', false, true, true, false, 9000),
      (v_r0, 'reach', 'E2E P2 reach 0', 30, NULL, NULL, false, true, true, false, 9001);
    INSERT INTO public.market_settings (country_code, free_regular_ads, included_reach, paid_levels) VALUES (v_code, 1, v_r0, false);
    PERFORM set_config('request.jwt.claims', '{}', true);
    -- a: the one live baseline ad; l1, l2: live at the level (open-ended, staff); w: at the level, in screening.
    INSERT INTO public.listings (id, seller_id, category_id, location_id, title, description, home_country_code, status,
                                 published_at, published_first_at, expires_at, tier, tier_source)
    SELECT x.id, v_seller, v_cat, v_city, 'E2E P2 M1c9 ' || x.nm, 'scratch', v_code, x.st, x.pub, x.pub, x.exp, coalesce(x.lv, v_base), x.ls
      FROM (VALUES
        (v_a,  'a',  'active',    now(), now() + interval '10 days', NULL, NULL),
        (v_l1, 'l1', 'active',    now(), now() + interval '10 days', v_lv, 'staff'),
        (v_l2, 'l2', 'active',    now(), now() + interval '10 days', v_lv, 'staff'),
        (v_w,  'w',  'screening', NULL,  NULL,                       v_lv, 'staff'))
        AS x(id, nm, st, pub, exp, lv, ls);
    PERFORM set_config('request.jwt.claims',
      json_build_object('sub', v_admin::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_session::text,
                        'amr', json_build_array(json_build_object('method', 'totp')))::text, true);

    -- (b) l1 lowered with no slot: paused at the baseline in the same call.
    v_answer := public.admin_set_listing_tier(v_l1, v_base, 'promotion_ended');
    SELECT * INTO v_row FROM public.listings WHERE id = v_l1;
    IF (v_answer->>'ok')::boolean IS NOT TRUE OR v_answer->>'to' <> v_base OR v_answer->>'status' <> 'paused'
       OR v_row.status <> 'paused' OR v_row.tier <> v_base OR v_row.tier_until IS NOT NULL OR v_row.tier_source IS NOT NULL
       OR NOT v_row.clock_kept OR v_row.resume_status <> 'active'
       OR v_row.kept_remaining IS NULL OR v_row.kept_remaining > interval '10 days' OR v_row.kept_remaining < interval '9 days 23 hours'
       OR (SELECT count(*) FROM public.listing_revisions WHERE listing_id = v_l1) <> 2
       OR NOT EXISTS (SELECT 1 FROM public.listing_revisions WHERE listing_id = v_l1 AND kind = 'edit' AND actor = v_admin
                        AND before->>'tier' = v_lv AND after->>'tier' = v_base)
       OR NOT EXISTS (SELECT 1 FROM public.listing_revisions WHERE listing_id = v_l1 AND kind = 'state' AND actor = v_admin
                        AND before = '{"status": "active"}'::jsonb AND after = '{"status": "paused"}'::jsonb)
       OR (SELECT count(*) FROM public.audit_log WHERE entity_id = v_l1::text) <> 2
       OR NOT EXISTS (SELECT 1 FROM public.audit_log WHERE entity_id = v_l1::text AND actor_id = v_admin AND action = 'listing.admin_tier'
                        AND (meta->>'paused')::boolean AND meta->>'to' = v_base AND meta->>'reason' = 'promotion_ended')
       OR NOT EXISTS (SELECT 1 FROM public.audit_log WHERE entity_id = v_l1::text AND actor_id = v_admin AND action = 'listing.level_paused'
                        AND meta->>'from' = v_lv AND (meta->>'live')::int = 1 AND (meta->>'slots')::int = 1)
       OR (SELECT count(*) FROM public.seller_notices WHERE listing_id = v_l1) <> 1
       OR NOT EXISTS (SELECT 1 FROM public.seller_notices WHERE listing_id = v_l1 AND seller_id = v_seller AND kind = 'level_paused') THEN
      RAISE EXCEPTION 'P-2 M-1c part 9 proof (b): l1 is not paused at the baseline with its records (% / % % %)', v_answer, v_row.status, v_row.tier, v_row.kept_remaining;
    END IF;
    -- With slots (N = 3; a is the one counted ad), l2 goes live at the baseline, nothing paused.
    UPDATE public.market_settings SET free_regular_ads = 3 WHERE country_code = v_code;
    v_answer := public.admin_set_listing_tier(v_l2, v_base, 'promotion_ended');
    SELECT * INTO v_row FROM public.listings WHERE id = v_l2;
    IF v_answer->>'status' <> 'active' OR v_row.status <> 'active' OR v_row.tier <> v_base OR v_row.clock_kept OR v_row.resume_status IS NOT NULL
       OR v_row.kept_remaining IS NOT NULL OR v_row.expires_at > now() + interval '10 days' OR v_row.expires_at < now() + interval '9 days 23 hours'
       OR (SELECT count(*) FROM public.listing_revisions WHERE listing_id = v_l2) <> 1
       OR (SELECT count(*) FROM public.audit_log WHERE entity_id = v_l2::text) <> 1
       OR EXISTS (SELECT 1 FROM public.audit_log WHERE entity_id = v_l2::text AND meta ? 'paused')
       OR EXISTS (SELECT 1 FROM public.seller_notices WHERE listing_id = v_l2) THEN
      RAISE EXCEPTION 'P-2 M-1c part 9 proof (b): l2 did not go live at the baseline (% / % %)', v_answer, v_row.status, v_row.tier;
    END IF;

    -- (c) N back to 1 (a and l2 are counted); w, in screening at the level, lowered: the guard refuses, nothing written.
    UPDATE public.market_settings SET free_regular_ads = 1 WHERE country_code = v_code;
    SELECT concat_ws('|',
             (SELECT count(*) FROM public.listing_revisions WHERE listing_id = v_w),
             (SELECT count(*) FROM public.audit_log WHERE entity_id = v_w::text),
             (SELECT count(*) FROM public.seller_notices WHERE listing_id = v_w),
             (SELECT status || ':' || tier FROM public.listings WHERE id = v_w)) INTO v_snap;
    v_msg := NULL; v_detail := NULL;
    BEGIN
      PERFORM public.admin_set_listing_tier(v_w, v_base, 'promotion_ended');
    EXCEPTION WHEN raise_exception THEN
      GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_detail = PG_EXCEPTION_DETAIL;
    END;
    SELECT concat_ws('|',
             (SELECT count(*) FROM public.listing_revisions WHERE listing_id = v_w),
             (SELECT count(*) FROM public.audit_log WHERE entity_id = v_w::text),
             (SELECT count(*) FROM public.seller_notices WHERE listing_id = v_w),
             (SELECT status || ':' || tier FROM public.listings WHERE id = v_w)) INTO v_snap2;
    IF v_msg IS DISTINCT FROM 'noFreeSlot' OR v_detail IS DISTINCT FROM '1' OR v_snap2 IS DISTINCT FROM v_snap THEN
      RAISE EXCEPTION 'P-2 M-1c part 9 proof (c): w answered % (detail %), % -> %', coalesce(v_msg, 'success'), v_detail, v_snap, v_snap2;
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2-m1c9-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c9-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261105100900') ON CONFLICT DO NOTHING;
