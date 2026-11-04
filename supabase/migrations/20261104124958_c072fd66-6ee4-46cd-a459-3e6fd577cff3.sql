-- e2e-areas: my-listings, admin-listings, ad-page, feed, posting
-- P-2 (a) M-1a, part 2 of 2 — the pause (D306; ruling 1: the pause is a STATUS — DEC-328). Part 1
-- (the file before this one) gave listings its designation columns and listing_packages its
-- baseline flag with public.baseline_level_key(); this file needs them.
--
-- `paused` joins listings_status_check: written only by transition_listing, which is redeclared
-- whole from its last declaration (20261102052535) with these changes and nothing else:
--   the status list takes 'paused';
--   active|reduced → paused is service-only (the sweep, M-1c; no owner's or staff hand) and keeps the
--     clock as a close does (clock_kept, kept_remaining, resume_status);
--   paused → active|reduced is the owner's, to the status it was paused from, with the time it had
--     left (the closed reopen branch, widened; its refusal names the status it refuses from);
--   paused → sold is the owner's, as closed → sold is;
--   every removal (the owner's delete and the shared last UPDATE) clears the five designation
--     columns and sets the tier to the baseline level (baseline_level_key(); no literal).
-- The header and the grants are restated. The feed follows through feed_index_on_listing_update: a
-- paused ad leaves the feed, a resumed one returns. Not here: the edit doors' own status lists do
-- not name 'paused' yet (named in the stop report). paused → screening, expired or closed is not a
-- transition. Proofs at the end.

DO $pre$
BEGIN
  IF to_regprocedure('public.baseline_level_key()') IS NULL
     OR NOT EXISTS (SELECT 1 FROM information_schema.columns
                     WHERE table_schema = 'public' AND table_name = 'listings' AND column_name = 'reach_source') THEN
    RAISE EXCEPTION 'P-2 M-1a part 2: part 1 (71cb9d01, mark 20261104200000) must be applied first';
  END IF;
END $pre$;

ALTER TABLE public.listings DROP CONSTRAINT IF EXISTS listings_status_check;
ALTER TABLE public.listings
  ADD CONSTRAINT listings_status_check
  CHECK (status IN ('draft','screening','active','reduced','rejected','held','expired','sold','removed','closed','paused'));

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
  IF p_new_status NOT IN ('draft','screening','active','reduced','rejected','held','expired','sold','removed','closed','paused') THEN
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
  -- P-2 (a), DEC-328 — a paused ad (its level ended with no free slot at the baseline) resumes the same way.
  IF v_row.status IN ('closed','paused') AND p_new_status IN ('active','reduced') THEN
    IF NOT v_owner THEN
      RAISE EXCEPTION 'owner only: % -> %', v_row.status, p_new_status;
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
    v_ok := v_row.status IN ('active','reduced') OR (p_new_status = 'sold' AND v_row.status IN ('closed','paused'));
  ELSIF p_new_status = 'closed' THEN
    -- D174 2 — "No longer available": only the owner closes his live ad; the time it had left is kept.
    IF NOT v_owner THEN
      RAISE EXCEPTION 'owner only: % -> closed', v_row.status;
    END IF;
    v_ok := v_row.status IN ('active','reduced');
  ELSIF p_new_status = 'paused' THEN
    -- P-2 (a), D306 / DEC-328 — the sweep pauses a live ad whose level ended with no free slot at the baseline;
    -- the time it had left is kept, as a close keeps it. Service only: no owner's or staff hand pauses an ad.
    IF NOT v_service THEN
      RAISE EXCEPTION 'service only: % -> paused', v_row.status;
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
END $function$;
REVOKE ALL ON FUNCTION public.transition_listing(uuid, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.transition_listing(uuid, text) TO authenticated;
GRANT ALL ON FUNCTION public.transition_listing(uuid, text) TO service_role;

-- PROOFS: scratch rows only, rolled back by the sentinel.
--   (a) the status check takes paused; the header and the grants are the ones the door had.
--   (b) the body with this file's changes reverted (each new fragment put back to its live text) is
--       byte for byte the body declared in 20261102052535 (md5 20a5644eef70395f27730ecc9ddd160a).
--   (c) the pause: the owner cannot pause (no trace); the service pauses an active Premium ad —
--       paused, the clock kept, the resume status active, out of the feed, one state revision; the
--       service cannot resume it; a paused ad is not expired; the owner cannot resume it to a status
--       it did not hold; the owner resumes it — active, the kept time back on the clock, back in
--       the feed at its rank.
--   (d) the owner sells a paused ad; its tier stays.
--   (e) removal clears the five columns and sets the baseline tier: the service path and the
--       owner's delete (deleted_at set), on ads holding a staff level with an end and a staff reach.
--   The scratch seller holds every published acceptance: the owner's resume is a step up, which the
--   acceptance guard (20261021035320) holds while terms are owed.
DO $proof$
DECLARE
  v_fn     regprocedure := 'public.transition_listing(uuid,text)'::regprocedure;
  v_src    text;
  v_md5    text;
  v_seller uuid := gen_random_uuid();
  v_tag    text := 'e2e-mig-p2-m1a2-' || substr(gen_random_uuid()::text, 1, 8);
  v_rc     text := 'e2e_mig_rc_' || substr(replace(gen_random_uuid()::text, '-', ''), 1, 8);
  v_code   char(2) := 'XZ';
  v_lang   text := (SELECT code FROM public.languages ORDER BY code LIMIT 1);
  v_anc    uuid;
  v_region uuid;
  v_city   uuid;
  v_cat    uuid;
  v_a      uuid;
  v_b      uuid;
  v_c      uuid;
  v_d      uuid;
  v_row    public.listings%ROWTYPE;
  v_kept   interval;
  v_msg    text;
BEGIN
  -- (a)
  IF (SELECT pg_get_constraintdef(c.oid) FROM pg_constraint c
       WHERE c.conrelid = 'public.listings'::regclass AND c.conname = 'listings_status_check') NOT LIKE '%''paused''%' THEN
    RAISE EXCEPTION 'P-2 M-1a part 2 proof (a): the status check does not take paused';
  END IF;
  IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}'
        FROM pg_proc WHERE oid = v_fn)
     OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
     OR has_function_privilege('anon', v_fn, 'EXECUTE')
     OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE')
     OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
    RAISE EXCEPTION 'P-2 M-1a part 2 proof (a): the header or the grants differ';
  END IF;

  -- (b)
  SELECT replace(p.prosrc, chr(13), '') INTO v_src FROM pg_proc p WHERE p.oid = v_fn;
  v_src := replace(v_src, '''sold'',''removed'',''closed'',''paused'')', '''sold'',''removed'',''closed'')');
  v_src := replace(v_src, '  -- P-2 (a), DEC-328 — a paused ad (its level ended with no free slot at the baseline) resumes the same way.
', '');
  v_src := replace(v_src, 'IF v_row.status IN (''closed'',''paused'') AND p_new_status IN (''active'',''reduced'') THEN',
                          'IF v_row.status = ''closed'' AND p_new_status IN (''active'',''reduced'') THEN');
  v_src := replace(v_src, 'RAISE EXCEPTION ''owner only: % -> %'', v_row.status, p_new_status;',
                          'RAISE EXCEPTION ''owner only: closed -> %'', p_new_status;');
  v_src := replace(v_src, '(p_new_status = ''sold'' AND v_row.status IN (''closed'',''paused''))',
                          '(p_new_status = ''sold'' AND v_row.status = ''closed'')');
  v_src := replace(v_src, '  ELSIF p_new_status = ''paused'' THEN
    -- P-2 (a), D306 / DEC-328 — the sweep pauses a live ad whose level ended with no free slot at the baseline;
    -- the time it had left is kept, as a close keeps it. Service only: no owner''s or staff hand pauses an ad.
    IF NOT v_service THEN
      RAISE EXCEPTION ''service only: % -> paused'', v_row.status;
    END IF;
    v_ok := v_row.status IN (''active'',''reduced'');
', '');
  v_src := replace(v_src, 'IF p_new_status IN (''active'',''reduced'') AND v_row.status IN (''closed'',''paused'') THEN',
                          'IF p_new_status IN (''active'',''reduced'') AND v_row.status = ''closed'' THEN');
  v_src := replace(v_src, '  ELSIF p_new_status = ''paused'' THEN
    -- P-2 (a), DEC-328 — paused by the sweep: the time it had left and the live status it resumes to are kept.
    UPDATE public.listings SET
      status = ''paused'',
      clock_kept = true,
      kept_remaining = CASE WHEN v_row.expires_at IS NULL THEN NULL
                            ELSE greatest(v_row.expires_at - now(), interval ''0'') END,
      resume_status = v_row.status,
      updated_at = now()
    WHERE id = p_listing_id;
', '');
  v_src := replace(v_src, 'tier = public.baseline_level_key(), tier_until = NULL, tier_source = NULL, reach = NULL, reach_until = NULL, reach_source = NULL, deleted_at = now()',
                          'tier = ''regular'', deleted_at = now()');
  v_src := replace(v_src, 'tier = CASE WHEN p_new_status = ''removed'' THEN public.baseline_level_key() ELSE tier END, tier_until = CASE WHEN p_new_status = ''removed'' THEN NULL ELSE tier_until END, tier_source = CASE WHEN p_new_status = ''removed'' THEN NULL ELSE tier_source END, reach = CASE WHEN p_new_status = ''removed'' THEN NULL ELSE reach END, reach_until = CASE WHEN p_new_status = ''removed'' THEN NULL ELSE reach_until END, reach_source = CASE WHEN p_new_status = ''removed'' THEN NULL ELSE reach_source END, updated_at',
                          'tier = CASE WHEN p_new_status = ''removed'' THEN ''regular'' ELSE tier END, updated_at');
  v_md5 := md5(v_src);
  IF v_md5 IS DISTINCT FROM '20a5644eef70395f27730ecc9ddd160a' THEN
    RAISE EXCEPTION 'P-2 M-1a part 2 proof (b): transition_listing differs from its live body beyond this file''s changes (%)', v_md5;
  END IF;

  BEGIN
    -- A scratch market (the INC-949 proof's way): the country is named in the scratch namespace; its
    -- anchor row (the countries trigger copies name_en) is read and switched on by that name.
    IF EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
      RAISE EXCEPTION 'P-2 M-1a part 2 proof: scratch code % already exists', v_code;
    END IF;
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_code, 'e2e-mig-p2-m1a2', true);
    SELECT a.id INTO v_anc FROM public.locations a
     WHERE a.country_code = v_code AND a.level = 'country' AND a.name_en = 'e2e-mig-p2-m1a2';
    IF v_anc IS NULL OR (SELECT count(*) FROM public.locations a
                          WHERE a.country_code = v_code AND a.level = 'country' AND a.name_en = 'e2e-mig-p2-m1a2') <> 1 THEN
      RAISE EXCEPTION 'P-2 M-1a part 2 proof: the scratch market has no single anchor';
    END IF;
    UPDATE public.locations SET is_active = true WHERE id = v_anc AND name_en = 'e2e-mig-p2-m1a2';
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id)
    VALUES ('region', v_code, 'E2E P2 M1a2 Region', v_tag || '-r', true, v_anc) RETURNING id INTO v_region;
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id, center_lat, center_lng)
    VALUES ('city', v_code, 'E2E P2 M1a2 City', v_tag || '-c', true, v_region, 9.03, 38.74) RETURNING id INTO v_city;
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at)
    VALUES (v_seller, v_tag || '-seller@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO public.legal_acceptances (user_id, version_id, language, method)
    SELECT v_seller, v.id, v_lang, v_tag FROM public.legal_versions v
     WHERE v.status = 'published' AND v.effective_at <= now();
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES ('E2E P2 M1a2 Leaf', v_tag, true, true, true, 9999)
    RETURNING id INTO v_cat;
    INSERT INTO public.listing_packages (key, kind, name_en, days, enabled, self_serve, extends_lifetime, sort)
    VALUES (v_rc, 'reach', 'E2E P2 M1a2 reach', 30, true, true, false, 99);

    -- Four live ads in the scratch city: a (the pause), b and c (a staff Premium with an end and the
    -- scratch reach — the removals), d (the sale of a paused ad).
    INSERT INTO public.listings (seller_id, category_id, location_id, title, description, home_country_code,
                                 status, tier, tier_source, published_at, published_first_at, expires_at)
    VALUES (v_seller, v_cat, v_city, 'E2E P2 M1a2 a', 'scratch', v_code, 'active', 'premium', 'staff', now(), now(), now() + interval '28 days')
    RETURNING id INTO v_a;
    INSERT INTO public.listings (seller_id, category_id, location_id, title, description, home_country_code,
                                 status, tier, tier_until, tier_source, reach, reach_until, reach_source,
                                 published_at, published_first_at, expires_at)
    VALUES (v_seller, v_cat, v_city, 'E2E P2 M1a2 b', 'scratch', v_code, 'active', 'premium', now() + interval '10 days', 'staff',
            v_rc, now() + interval '10 days', 'staff', now(), now(), now() + interval '28 days')
    RETURNING id INTO v_b;
    INSERT INTO public.listings (seller_id, category_id, location_id, title, description, home_country_code,
                                 status, tier, tier_until, tier_source, reach, reach_source,
                                 published_at, published_first_at, expires_at)
    VALUES (v_seller, v_cat, v_city, 'E2E P2 M1a2 c', 'scratch', v_code, 'active', 'premium', now() + interval '10 days', 'staff',
            v_rc, 'staff', now(), now(), now() + interval '28 days')
    RETURNING id INTO v_c;
    INSERT INTO public.listings (seller_id, category_id, location_id, title, description, home_country_code,
                                 status, tier, tier_source, published_at, published_first_at, expires_at)
    VALUES (v_seller, v_cat, v_city, 'E2E P2 M1a2 d', 'scratch', v_code, 'active', 'premium', 'staff', now(), now(), now() + interval '28 days')
    RETURNING id INTO v_d;
    IF NOT EXISTS (SELECT 1 FROM public.feed_index WHERE listing_id = v_a AND tier_rank = 2) THEN
      RAISE EXCEPTION 'P-2 M-1a part 2 proof: the active Premium ad is not in the feed at rank 2';
    END IF;

    -- (c) the owner cannot pause.
    PERFORM set_config('request.jwt.claims',
      json_build_object('sub', v_seller::text, 'role', 'authenticated')::text, true);
    BEGIN
      PERFORM public.transition_listing(v_a, 'paused');
      RAISE EXCEPTION 'P-2 M-1a part 2 proof (c): the owner paused his ad';
    EXCEPTION WHEN raise_exception THEN
      IF SQLERRM <> 'service only: active -> paused' THEN RAISE; END IF;
    END;
    PERFORM set_config('request.jwt.claims', '{}', true);
    IF (SELECT status FROM public.listings WHERE id = v_a) <> 'active'
       OR EXISTS (SELECT 1 FROM public.listing_revisions WHERE listing_id = v_a) THEN
      RAISE EXCEPTION 'P-2 M-1a part 2 proof (c): the refused pause left a trace';
    END IF;
    -- The service pauses a.
    PERFORM public.transition_listing(v_a, 'paused');
    SELECT * INTO v_row FROM public.listings WHERE id = v_a;
    IF v_row.status <> 'paused' OR NOT v_row.clock_kept OR v_row.resume_status <> 'active'
       OR v_row.kept_remaining IS NULL OR v_row.kept_remaining > interval '28 days' OR v_row.kept_remaining < interval '27 days 23 hours'
       OR v_row.tier <> 'premium' OR v_row.tier_source <> 'staff'
       OR (SELECT count(*) FROM public.listing_revisions WHERE listing_id = v_a) <> 1
       OR NOT EXISTS (SELECT 1 FROM public.listing_revisions WHERE listing_id = v_a AND kind = 'state'
                        AND before = '{"status": "active"}'::jsonb AND after = '{"status": "paused"}'::jsonb)
       OR EXISTS (SELECT 1 FROM public.feed_index WHERE listing_id = v_a) THEN
      RAISE EXCEPTION 'P-2 M-1a part 2 proof (c): the pause did not keep the clock (status % kept % resume %)',
        v_row.status, v_row.kept_remaining, v_row.resume_status;
    END IF;
    v_kept := v_row.kept_remaining;
    -- The service cannot resume it; a paused ad is not expired.
    BEGIN
      PERFORM public.transition_listing(v_a, 'active');
      RAISE EXCEPTION 'P-2 M-1a part 2 proof (c): the service resumed a paused ad';
    EXCEPTION WHEN raise_exception THEN
      IF SQLERRM <> 'owner only: paused -> active' THEN RAISE; END IF;
    END;
    BEGIN
      PERFORM public.transition_listing(v_a, 'expired');
      RAISE EXCEPTION 'P-2 M-1a part 2 proof (c): a paused ad was expired';
    EXCEPTION WHEN raise_exception THEN
      IF SQLERRM <> 'illegal transition: paused -> expired' THEN RAISE; END IF;
    END;
    -- The owner cannot resume it to a status it did not hold; the owner resumes it.
    PERFORM set_config('request.jwt.claims',
      json_build_object('sub', v_seller::text, 'role', 'authenticated')::text, true);
    BEGIN
      PERFORM public.transition_listing(v_a, 'reduced');
      RAISE EXCEPTION 'P-2 M-1a part 2 proof (c): the owner resumed to a status the ad did not hold';
    EXCEPTION WHEN raise_exception THEN
      IF SQLERRM <> 'illegal transition: paused -> reduced' THEN RAISE; END IF;
    END;
    PERFORM public.transition_listing(v_a, 'active');
    PERFORM set_config('request.jwt.claims', '{}', true);
    SELECT * INTO v_row FROM public.listings WHERE id = v_a;
    IF v_row.status <> 'active' OR v_row.clock_kept OR v_row.kept_remaining IS NOT NULL OR v_row.resume_status IS NOT NULL
       OR v_row.expires_at IS NULL OR v_row.expires_at > now() + v_kept OR v_row.expires_at < now() + v_kept - interval '1 minute'
       OR v_row.tier <> 'premium'
       OR (SELECT count(*) FROM public.listing_revisions WHERE listing_id = v_a) <> 2
       OR NOT EXISTS (SELECT 1 FROM public.feed_index WHERE listing_id = v_a AND tier_rank = 2) THEN
      RAISE EXCEPTION 'P-2 M-1a part 2 proof (c): the resume did not give the time back (status % expires % kept %)',
        v_row.status, v_row.expires_at, v_kept;
    END IF;

    -- (d) the owner sells a paused ad; its tier stays.
    PERFORM public.transition_listing(v_d, 'paused');
    PERFORM set_config('request.jwt.claims',
      json_build_object('sub', v_seller::text, 'role', 'authenticated')::text, true);
    PERFORM public.transition_listing(v_d, 'sold');
    PERFORM set_config('request.jwt.claims', '{}', true);
    IF (SELECT status || ':' || tier || ':' || tier_source FROM public.listings WHERE id = v_d) <> 'sold:premium:staff' THEN
      RAISE EXCEPTION 'P-2 M-1a part 2 proof (d): the sale of a paused ad went wrong';
    END IF;

    -- (e) the service removes b: the five columns cleared, the tier at the baseline.
    PERFORM public.transition_listing(v_b, 'removed');
    SELECT * INTO v_row FROM public.listings WHERE id = v_b;
    IF v_row.status <> 'removed' OR v_row.deleted_at IS NOT NULL
       OR v_row.tier IS DISTINCT FROM public.baseline_level_key()
       OR v_row.tier_until IS NOT NULL OR v_row.tier_source IS NOT NULL
       OR v_row.reach IS NOT NULL OR v_row.reach_until IS NOT NULL OR v_row.reach_source IS NOT NULL
       OR EXISTS (SELECT 1 FROM public.feed_index WHERE listing_id = v_b) THEN
      RAISE EXCEPTION 'P-2 M-1a part 2 proof (e): the service removal left a designation (tier % until % source % reach %)',
        v_row.tier, v_row.tier_until, v_row.tier_source, v_row.reach;
    END IF;
    -- The owner deletes c.
    PERFORM set_config('request.jwt.claims',
      json_build_object('sub', v_seller::text, 'role', 'authenticated')::text, true);
    PERFORM public.transition_listing(v_c, 'removed');
    PERFORM set_config('request.jwt.claims', '{}', true);
    SELECT * INTO v_row FROM public.listings WHERE id = v_c;
    IF v_row.status <> 'removed' OR v_row.deleted_at IS NULL
       OR v_row.tier IS DISTINCT FROM public.baseline_level_key()
       OR v_row.tier_until IS NOT NULL OR v_row.tier_source IS NOT NULL
       OR v_row.reach IS NOT NULL OR v_row.reach_until IS NOT NULL OR v_row.reach_source IS NOT NULL THEN
      RAISE EXCEPTION 'P-2 M-1a part 2 proof (e): the owner''s delete left a designation (tier % until % source % reach %)',
        v_row.tier, v_row.tier_until, v_row.tier_source, v_row.reach;
    END IF;

    RAISE EXCEPTION 'p2-m1a2-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1a2-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

-- CLOSERS
REVOKE ALL ON FUNCTION public.transition_listing(uuid, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.transition_listing(uuid, text) TO authenticated;
GRANT ALL ON FUNCTION public.transition_listing(uuid, text) TO service_role;

INSERT INTO public.migration_marks (version) VALUES ('20261104201000') ON CONFLICT DO NOTHING;
