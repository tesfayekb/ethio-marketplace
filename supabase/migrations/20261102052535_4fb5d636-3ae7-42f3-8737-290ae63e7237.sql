-- e2e-areas: my-listings, admin-listings, ad-page, feed
-- Turn T1 part B, M2 (D276 "until the listing gets removed"; ruling 1, answer 7) — a removed
-- listing's tier is cleared inside the state machine. public.transition_listing is redeclared
-- whole from its last declaration (20261015012743, section D) with two insertions and nothing
-- else: the owner's delete (`removed`, deleted_at) also sets `tier = 'regular'`; the shared last
-- UPDATE (staff and service removals, and every other plain status change) sets the tier to
-- 'regular' only when the new status is 'removed' — a sale, an expiry, a hold or a rejection
-- keeps the tier, so a relisted or restored ad does not silently lose what staff gave it. The
-- header (VOLATILE, SECURITY DEFINER, search_path public) and the grants are restated. The feed
-- index follows through feed_index_on_listing_update, as before.
CREATE OR REPLACE FUNCTION public.transition_listing(p_listing_id uuid, p_new_status text)
 RETURNS void
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
  IF p_new_status NOT IN ('draft','screening','active','reduced','rejected','held','expired','sold','removed','closed') THEN
    RAISE EXCEPTION 'unknown status: %', p_new_status;
  END IF;

  SELECT * INTO v_row FROM public.listings WHERE id = p_listing_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'listing not found'; END IF;

  IF v_uid IS NOT NULL THEN
    IF EXISTS (SELECT 1 FROM public.profiles WHERE user_id = v_uid AND account_status = 'deactivated') THEN
      RAISE EXCEPTION 'account is deactivated';
    END IF;
    IF NOT coalesce((public.rate_gate('revise')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;
    v_owner    := (v_row.seller_id = v_uid);
    v_reviewer := public.has_permission(v_uid, 'listings', 'review');
    v_enforcer := public.has_permission(v_uid, 'listings', 'enforce');
    IF NOT (v_owner OR v_reviewer OR v_enforcer) THEN
      RAISE EXCEPTION 'not your listing';
    END IF;
  END IF;

  -- D174 2 (bundle 16 turn 1) — the owner reopens his own closed ad, to the live status it was closed from and
  -- with the time it had left. Nothing about it changed while it was closed (edit_listing sends a closed ad to
  -- screening), so it needs no new review. Staff never reopen a seller's closed ad.
  IF v_row.status = 'closed' AND p_new_status IN ('active','reduced') THEN
    IF NOT v_owner THEN
      RAISE EXCEPTION 'owner only: closed -> %', p_new_status;
    END IF;
    v_ok := (p_new_status = v_row.resume_status);
  -- The gateway/reviewer branch: only these roles may put a listing in front of
  -- a visitor. No owner door reaches 'active' (the reopen above returns an ad to the place it already held).
  ELSIF p_new_status IN ('active','reduced','rejected','held') THEN
    IF NOT (v_service OR v_reviewer) THEN
      RAISE EXCEPTION 'reviewer only: % -> %', v_row.status, p_new_status;
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
        RAISE EXCEPTION 'a listing its owner deleted is not restored';
      END IF;
      -- D137 (REQ-022 amended, the operator, 2026-10-11): a removed listing comes
      -- back only to screening, never straight to live; by enforcement with a
      -- fresh second factor; one removed for a severe screening reason by a
      -- super admin only.
      IF NOT (v_service OR v_enforcer) THEN
        RAISE EXCEPTION 'enforcement only: removed -> screening';
      END IF;
      IF coalesce(v_row.screening->>'severe','false') = 'true'
         AND NOT (v_service OR public.is_super_admin(v_uid)) THEN
        RAISE EXCEPTION 'a listing removed for a severe reason is restored by a super admin only';
      END IF;
      IF NOT v_service THEN
        PERFORM public.require_step_up_if_needed('listings', 'enforce');
      END IF;
      v_ok := true;
    ELSE
      v_ok := v_row.status IN ('draft','active','reduced','rejected','expired','sold');
    END IF;
  ELSIF p_new_status IN ('sold','expired') THEN
    v_ok := v_row.status IN ('active','reduced') OR (p_new_status = 'sold' AND v_row.status = 'closed');
  ELSIF p_new_status = 'closed' THEN
    -- D174 2 — "No longer available": only the owner closes his live ad; the time it had left is kept.
    IF NOT v_owner THEN
      RAISE EXCEPTION 'owner only: % -> closed', v_row.status;
    END IF;
    v_ok := v_row.status IN ('active','reduced');
  ELSIF p_new_status = 'removed' THEN
    -- Bundle 16 turn 3b (call F) — the owner deletes his own ad as its owner, whatever staff role he also holds.
    IF v_owner AND NOT v_service THEN
      IF v_row.status = 'rejected' AND coalesce(v_row.screening->>'severe','false') = 'true' THEN
        RAISE EXCEPTION 'a listing rejected for a severe reason is removed by enforcement only';
      END IF;
      v_ok := true;
    ELSE
      v_ok := (v_service OR v_enforcer);
      IF NOT v_ok THEN
        RAISE EXCEPTION 'enforcement only: % -> removed', v_row.status;
      END IF;
      IF NOT v_service THEN
        PERFORM public.require_step_up_if_needed('listings', 'enforce');
      END IF;
    END IF;
  ELSE
    v_ok := false;
  END IF;

  IF NOT v_ok THEN
    RAISE EXCEPTION 'illegal transition: % -> %', v_row.status, p_new_status;
  END IF;

  IF p_new_status IN ('active','reduced') AND v_row.status = 'closed' THEN
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
  ELSIF p_new_status = 'expired' THEN
    -- Bundle 16 — the live status a renewal returns it to.
    UPDATE public.listings SET status = 'expired', resume_status = v_row.status, updated_at = now()
     WHERE id = p_listing_id;
  ELSIF p_new_status = 'removed' AND v_owner THEN
    -- Bundle 16 turn 3b (call F) — deleted by its owner: it leaves My listings (deleted_at); the record stays.
    UPDATE public.listings SET status = 'removed', tier = 'regular', deleted_at = now(), updated_at = now()
     WHERE id = p_listing_id;
  ELSE
    UPDATE public.listings SET status = p_new_status, tier = CASE WHEN p_new_status = 'removed' THEN 'regular' ELSE tier END, updated_at = now()
     WHERE id = p_listing_id;
  END IF;

  INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
    VALUES (p_listing_id, v_row.seller_id, 'state',
            jsonb_build_object('status', v_row.status),
            jsonb_build_object('status', p_new_status), v_uid);
END $function$;
REVOKE ALL ON FUNCTION public.transition_listing(uuid, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.transition_listing(uuid, text) TO authenticated;
GRANT ALL ON FUNCTION public.transition_listing(uuid, text) TO service_role;

-- PROOF (T1 M2): scratch rows only, rolled back by the sentinel.
--   (a) the header and the grants are the ones the door had.
--   (b) the body, with the two insertions stripped, is byte for byte the body declared in
--       20261015012743 section D (md5 f2b4a89cedf83e4dce63d17be85e1ce8).
--   (c) the service path removes an active Premium ad: status removed, tier regular, one state
--       revision, no feed rows.
--   (d) the owner deletes his own active Premium ad: status removed, deleted_at set, tier regular.
--   (e) an active Premium ad sold keeps premium; another expired keeps premium; a held ad sent
--       on from screening keeps premium (the shared UPDATE clears the tier for 'removed' only).
--   The rows are scratch: a market XZ (country, its anchor, a region, a city — the INC-949 proof's
--   way, as M1), a seller, a category and five listings; the proof reads no real row (G27).
DO $proof$
DECLARE
  v_fn     regprocedure := 'public.transition_listing(uuid,text)'::regprocedure;
  v_md5    text;
  v_seller uuid := gen_random_uuid();
  v_tag    text := 'e2e-mig-t1-m2-' || substr(gen_random_uuid()::text, 1, 8);
  v_code   char(2) := 'XZ';
  v_anc    uuid;
  v_region uuid;
  v_city   uuid;
  v_cat    uuid;
  v_a      uuid;
  v_b      uuid;
  v_c      uuid;
  v_d      uuid;
  v_e      uuid;
  v_row    public.listings%ROWTYPE;
BEGIN
  -- (a)
  IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}'
        FROM pg_proc WHERE oid = v_fn)
     OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
     OR has_function_privilege('anon', v_fn, 'EXECUTE')
     OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE')
     OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
    RAISE EXCEPTION 'T1 M2 proof (a): the header or the grants differ';
  END IF;
  -- (b)
  SELECT md5(replace(replace(replace(p.prosrc, chr(13), ''),
                             'tier = 'regular', ', ''),
                     'tier = CASE WHEN p_new_status = 'removed' THEN 'regular' ELSE tier END, ', ''))
    INTO v_md5 FROM pg_proc p WHERE p.oid = v_fn;
  IF v_md5 IS DISTINCT FROM 'f2b4a89cedf83e4dce63d17be85e1ce8' THEN
    RAISE EXCEPTION 'T1 M2 proof (b): transition_listing differs from its earlier body beyond the two insertions (%)', v_md5;
  END IF;

  BEGIN
    -- A scratch market (the INC-949 proof's way, as M1): the country is named in the scratch
    -- namespace; its anchor row (the countries trigger copies name_en) is read and switched on
    -- by that name.
    IF EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
      RAISE EXCEPTION 'T1 M2 proof: scratch code % already exists', v_code;
    END IF;
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_code, 'e2e-mig-t1-m2', true);
    SELECT a.id INTO v_anc FROM public.locations a
     WHERE a.country_code = v_code AND a.level = 'country' AND a.name_en = 'e2e-mig-t1-m2';
    IF v_anc IS NULL OR (SELECT count(*) FROM public.locations a
                          WHERE a.country_code = v_code AND a.level = 'country' AND a.name_en = 'e2e-mig-t1-m2') <> 1 THEN
      RAISE EXCEPTION 'T1 M2 proof: the scratch market has no single anchor';
    END IF;
    UPDATE public.locations SET is_active = true WHERE id = v_anc AND name_en = 'e2e-mig-t1-m2';
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id)
    VALUES ('region', v_code, 'E2E T1 M2 Region', v_tag || '-r', true, v_anc) RETURNING id INTO v_region;
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id, center_lat, center_lng)
    VALUES ('city', v_code, 'E2E T1 M2 City', v_tag || '-c', true, v_region, 9.03, 38.74) RETURNING id INTO v_city;

    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at)
    VALUES (v_seller, v_tag || '-seller@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES ('E2E T1 M2 Leaf', v_tag, true, true, true, 9999)
    RETURNING id INTO v_cat;
    -- Five active Premium ads, placed in the scratch city (listings_place_unless_draft).
    INSERT INTO public.listings (seller_id, category_id, location_id, title, description, home_country_code,
                                 status, tier, published_at, published_first_at, expires_at)
    VALUES (v_seller, v_cat, v_city, 'E2E T1 M2 a', 'scratch', v_code, 'active', 'premium', now(), now(), now() + interval '28 days')
    RETURNING id INTO v_a;
    INSERT INTO public.listings (seller_id, category_id, location_id, title, description, home_country_code,
                                 status, tier, published_at, published_first_at, expires_at)
    VALUES (v_seller, v_cat, v_city, 'E2E T1 M2 b', 'scratch', v_code, 'active', 'premium', now(), now(), now() + interval '28 days')
    RETURNING id INTO v_b;
    INSERT INTO public.listings (seller_id, category_id, location_id, title, description, home_country_code,
                                 status, tier, published_at, published_first_at, expires_at)
    VALUES (v_seller, v_cat, v_city, 'E2E T1 M2 c', 'scratch', v_code, 'active', 'premium', now(), now(), now() + interval '28 days')
    RETURNING id INTO v_c;
    INSERT INTO public.listings (seller_id, category_id, location_id, title, description, home_country_code,
                                 status, tier, published_at, published_first_at, expires_at)
    VALUES (v_seller, v_cat, v_city, 'E2E T1 M2 d', 'scratch', v_code, 'active', 'premium', now(), now(), now() + interval '28 days')
    RETURNING id INTO v_d;
    INSERT INTO public.listings (seller_id, category_id, location_id, title, description, home_country_code,
                                 status, tier, published_at, published_first_at, expires_at)
    VALUES (v_seller, v_cat, v_city, 'E2E T1 M2 e', 'scratch', v_code, 'screening', 'premium', now(), now(), now() + interval '28 days')
    RETURNING id INTO v_e;
    IF NOT EXISTS (SELECT 1 FROM public.feed_index WHERE listing_id = v_a AND tier_rank = 2) THEN
      RAISE EXCEPTION 'T1 M2 proof: the active Premium ad is not in the feed at rank 2';
    END IF;

    -- (c) the service path (no caller) removes a.
    PERFORM set_config('request.jwt.claims', '{}', true);
    PERFORM public.transition_listing(v_a, 'removed');
    SELECT * INTO v_row FROM public.listings WHERE id = v_a;
    IF v_row.status <> 'removed' OR v_row.tier <> 'regular' OR v_row.deleted_at IS NOT NULL
       OR (SELECT count(*) FROM public.listing_revisions WHERE listing_id = v_a) <> 1
       OR NOT EXISTS (SELECT 1 FROM public.listing_revisions WHERE listing_id = v_a AND kind = 'state'
                        AND before = '{"status": "active"}'::jsonb AND after = '{"status": "removed"}'::jsonb)
       OR EXISTS (SELECT 1 FROM public.feed_index WHERE listing_id = v_a) THEN
      RAISE EXCEPTION 'T1 M2 proof (c): status % tier % deleted_at %', v_row.status, v_row.tier, v_row.deleted_at;
    END IF;

    -- (d) the owner deletes b.
    PERFORM set_config('request.jwt.claims',
      json_build_object('sub', v_seller::text, 'role', 'authenticated')::text, true);
    PERFORM public.transition_listing(v_b, 'removed');
    PERFORM set_config('request.jwt.claims', '{}', true);
    SELECT * INTO v_row FROM public.listings WHERE id = v_b;
    IF v_row.status <> 'removed' OR v_row.tier <> 'regular' OR v_row.deleted_at IS NULL
       OR EXISTS (SELECT 1 FROM public.feed_index WHERE listing_id = v_b) THEN
      RAISE EXCEPTION 'T1 M2 proof (d): status % tier % deleted_at %', v_row.status, v_row.tier, v_row.deleted_at;
    END IF;

    -- (e) sold, expired and held keep the tier.
    PERFORM public.transition_listing(v_c, 'sold');
    PERFORM public.transition_listing(v_d, 'expired');
    PERFORM public.transition_listing(v_e, 'held');
    IF (SELECT status || ':' || tier FROM public.listings WHERE id = v_c) <> 'sold:premium'
       OR (SELECT status || ':' || tier FROM public.listings WHERE id = v_d) <> 'expired:premium'
       OR (SELECT status || ':' || tier FROM public.listings WHERE id = v_e) <> 'held:premium' THEN
      RAISE EXCEPTION 'T1 M2 proof (e): a status other than removed changed the tier';
    END IF;

    RAISE EXCEPTION 't1-m2-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 't1-m2-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261102210000') ON CONFLICT DO NOTHING;
