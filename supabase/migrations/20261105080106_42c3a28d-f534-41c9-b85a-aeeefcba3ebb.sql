-- e2e-areas: my-listings, admin-listings, ad-page, feed, posting
-- P-2 (a) M-1c, part 3 of 7 — the sweep's core (plan §3; ruling 1; ruling 9 H2/H5/H7; ruling 10).
-- ONE service-only core, designation_sweep_core(p_only uuid[]), applies an ad's three clocks in one pass
-- (rule 30: a whole-table statement is proven through a core on scratch ids; part 4 makes
-- expire_stale_listings, the cron's door, its wrapper):
--   expiry — as before: active|reduced AND expires_at < now() → transition_listing(id, 'expired');
--   a level end — tier_until < now() on a live ad: the slot counted BEFORE the fall (seller_regular_live
--     against market_settings_for's free_regular_ads); the tier falls to the baseline (tier_until,
--     tier_source, tier_reminded_for NULL) in both branches, revision 'edit', audit listing.level_ended
--     (actor NULL); no slot → paused through transition_listing (service), audit listing.level_paused,
--     one seller_notices row kind level_paused (D306, DEC-328);
--   a reach end — reach_until < now() on ANY status (H7): the three reach columns NULL, the places trimmed
--     by listing_places_trim (part 2, DEC-330), the removed ids in the revision, audit listing.reach_ended,
--     the feed re-queued; nothing else of the ad touched;
--   the reminder — a live ad whose tier_until is within 3 days, not yet reminded for THAT end
--     (tier_reminded_for IS DISTINCT FROM tier_until): one seller_notices row kind level_ending (H5).
-- Every write is a WHERE'd UPDATE or transition_listing (CF-SQL-1). Law 11: baseline_level_key() into a
-- variable. Proofs on scratch rows, rolled back by the sentinel.
-- Ruling 11 (INC-1059): the scratch level row carries its perks (perks_by_kind_check); proof text only, mark unchanged.

DO $pre$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_attribute WHERE attrelid = 'public.listing_expiry_sweep_runs'::regclass AND attname = 'reminded' AND NOT attisdropped)
     OR to_regprocedure('public.listing_places_trim(uuid)') IS NULL THEN
    RAISE EXCEPTION 'P-2 M-1c part 3: parts 1 and 2 (4e04fad3, 8797b9c8) must be applied first';
  END IF;
  IF to_regprocedure('public.designation_sweep_core(uuid[])') IS NOT NULL THEN
    RAISE EXCEPTION 'P-2 M-1c part 3: designation_sweep_core already exists';
  END IF;
END $pre$;

-- ------------------------------------------------------------ 1. THE CORE
CREATE FUNCTION public.designation_sweep_core(p_only uuid[] DEFAULT NULL)
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
    PERFORM public.transition_listing(v_id, 'expired');
    n_expired := n_expired + 1;
  END LOOP;

  -- 2. A level's end: the slot counted before the fall; the fall in both branches; the pause without a slot.
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
    UPDATE public.listings
       SET tier = v_base, tier_until = NULL, tier_source = NULL, tier_reminded_for = NULL, updated_at = now()
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
    IF v_live >= v_market.free_regular_ads THEN
      PERFORM public.transition_listing(v_row.id, 'paused');
      INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
        VALUES (NULL, 'listing.level_paused', 'listing', v_row.id::text,
                jsonb_build_object('from', v_row.tier, 'live', v_live, 'slots', v_market.free_regular_ads));
      INSERT INTO public.seller_notices (seller_id, listing_id, kind) VALUES (v_row.seller_id, v_row.id, 'level_paused');
      n_level_paused := n_level_paused + 1;
    END IF;
  END LOOP;

  -- 3. A reach's end, on any status: back to the included reach; the places trimmed (part 2, DEC-330).
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
COMMENT ON FUNCTION public.designation_sweep_core(uuid[]) IS
  'The hourly sweep''s work over an ad''s clocks (P-2 M-1c): expiry, a level''s end (the fall to the baseline, the pause without a slot — D306), a reach''s end (the included reach, the places trimmed — DEC-330), the level_ending reminder; p_only scopes it (the proofs), NULL is everything. Service only.';
REVOKE ALL ON FUNCTION public.designation_sweep_core(uuid[]) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.designation_sweep_core(uuid[]) TO service_role;

-- ------------------------------------------------------------ 2. PROOFS
-- (a) the header and the grants (catalog facts); (b) the core on scratch ads, scoped by p_only: a level ended with a
-- slot → the baseline, live, its revision and audit row; a second level ended without a slot → the baseline,
-- paused through the state machine (clock kept), audit level_paused, one notice; a reach ended → the three
-- columns NULL, the places trimmed (the primary kept; part 2 proves the walk), the removed ids in the
-- revision, the audit row, the feed queue; a level ending in two days → one level_ending notice, the end
-- remembered; an expired ad → expired; an ad outside the scope untouched; a second run moves nothing.
DO $proof$
DECLARE
  v_core    regprocedure := 'public.designation_sweep_core(uuid[])'::regprocedure;
  v_seller  uuid := gen_random_uuid();
  v_tag     text := 'e2e-mig-p2-m1c3-' || substr(gen_random_uuid()::text, 1, 8);
  v_stem    text := substr(replace(gen_random_uuid()::text, '-', ''), 1, 8);
  v_lv      text := 'e2e_mig_lv_' || v_stem;
  v_r0      text := 'e2e_mig_r0_' || v_stem;
  v_r1      text := 'e2e_mig_r1_' || v_stem;
  v_code    char(2) := 'XZ';
  v_anc     uuid;
  v_regA    uuid;
  v_regB    uuid;
  v_c1      uuid;
  v_c2      uuid;
  v_c3      uuid;
  v_cat     uuid;
  v_a       uuid := gen_random_uuid();
  v_b       uuid := gen_random_uuid();
  v_c       uuid := gen_random_uuid();
  v_d       uuid := gen_random_uuid();
  v_e       uuid := gen_random_uuid();
  v_g       uuid := gen_random_uuid();
  v_until_d timestamptz := now() + interval '2 days';
  v_row     public.listings%ROWTYPE;
  v_was     public.listings%ROWTYPE;
  v_n       record;
  v_base    text;
  v_rank    smallint;
  v_snap    text;
  v_snap2   text;
  v_msg     text;
BEGIN
  v_base := public.baseline_level_key();
  -- (a)
  IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' FROM pg_proc WHERE oid = v_core)
     OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_core)) a WHERE a.grantee = 0)
     OR has_function_privilege('anon', v_core, 'EXECUTE') OR has_function_privilege('authenticated', v_core, 'EXECUTE')
     OR NOT has_function_privilege('service_role', v_core, 'EXECUTE') THEN
    RAISE EXCEPTION 'P-2 M-1c part 3 proof (a): the header or the grants differ';
  END IF;

  BEGIN
    IF EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
      RAISE EXCEPTION 'P-2 M-1c part 3 proof: scratch code % already exists', v_code;
    END IF;
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_code, 'e2e-mig-p2-m1c3', true);
    SELECT a.id INTO v_anc FROM public.locations a
     WHERE a.country_code = v_code AND a.level = 'country' AND a.name_en = 'e2e-mig-p2-m1c3';
    IF v_anc IS NULL THEN RAISE EXCEPTION 'P-2 M-1c part 3 proof: the scratch market has no anchor'; END IF;
    UPDATE public.locations SET is_active = true WHERE id = v_anc AND name_en = 'e2e-mig-p2-m1c3';
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id)
    VALUES ('region', v_code, 'E2E P2 M1c3 Region A', v_tag || '-ra', true, v_anc) RETURNING id INTO v_regA;
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id)
    VALUES ('region', v_code, 'E2E P2 M1c3 Region B', v_tag || '-rb', true, v_anc) RETURNING id INTO v_regB;
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id, center_lat, center_lng)
    VALUES ('city', v_code, 'E2E P2 M1c3 City 1', v_tag || '-c1', true, v_regA, 9.03, 38.74) RETURNING id INTO v_c1;
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id, center_lat, center_lng)
    VALUES ('city', v_code, 'E2E P2 M1c3 City 2', v_tag || '-c2', true, v_regA, 9.05, 38.76) RETURNING id INTO v_c2;
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id, center_lat, center_lng)
    VALUES ('city', v_code, 'E2E P2 M1c3 City 3', v_tag || '-c3', true, v_regB, 9.07, 38.78) RETURNING id INTO v_c3;
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at)
    VALUES (v_seller, v_tag || '-seller@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES ('E2E P2 M1c3 Leaf', v_tag, true, true, true, 9999) RETURNING id INTO v_cat;
    INSERT INTO public.listing_packages (key, kind, name_en, days, max_photos, placement, badge, enabled, self_serve, extends_lifetime, sort) VALUES
      (v_lv, 'level', 'E2E P2 level', 10, 6, 'boost', false, true, true, false, 9000),
      (v_r0, 'reach', 'E2E P2 reach 0', 30, NULL, NULL, false, true, true, false, 9001),
      (v_r1, 'reach', 'E2E P2 reach 1', 15, NULL, NULL, false, true, true, false, 9002);
    -- N = 2: c is a live baseline ad in the market, so a takes the second slot and b finds none.
    INSERT INTO public.market_settings (country_code, free_regular_ads, included_reach, paid_levels)
    VALUES (v_code, 2, v_r0, false);
    -- a, b: the level ended (a an hour before b); c: the reach ended, three places; d: the level ending in
    -- two days; e: expired; g: the level ended, outside the scope.
    INSERT INTO public.listings (id, seller_id, category_id, location_id, title, description, home_country_code, status,
                                 published_at, published_first_at, expires_at, tier, tier_until, tier_source,
                                 reach, reach_until, reach_source)
    SELECT x.id, v_seller, v_cat, v_c1, 'E2E P2 M1c3 ' || x.nm, 'scratch', v_code, 'active', now(), now(), x.exp,
           coalesce(x.lv, v_base), x.lu, x.ls, x.rc, x.ru, x.rs
      FROM (VALUES
        (v_a, 'a', now() + interval '10 days', v_lv, now() - interval '2 hours', 'launch', NULL, NULL, NULL),
        (v_b, 'b', now() + interval '10 days', v_lv, now() - interval '1 hour', 'staff', NULL, NULL, NULL),
        (v_c, 'c', now() + interval '10 days', NULL, NULL, NULL, v_r1, now() - interval '1 hour', 'launch'),
        (v_d, 'd', now() + interval '10 days', v_lv, v_until_d, 'launch', NULL, NULL, NULL),
        (v_e, 'e', now() - interval '1 hour', NULL, NULL, NULL, NULL, NULL, NULL),
        (v_g, 'g', now() + interval '10 days', v_lv, now() - interval '1 hour', 'launch', NULL, NULL, NULL))
        AS x(id, nm, exp, lv, lu, ls, rc, ru, rs);
    INSERT INTO public.listing_locations (listing_id, location_id, position) VALUES
      (v_c, v_c1, 0), (v_c, v_c2, 1), (v_c, v_c3, 2);
    PERFORM set_config('request.jwt.claims', '{}', true);

    -- (b) one scoped run.
    SELECT * INTO v_n FROM public.designation_sweep_core(ARRAY[v_a, v_b, v_c, v_d, v_e]);
    IF v_n.n_expired <> 1 OR v_n.n_level_ended <> 2 OR v_n.n_level_paused <> 1 OR v_n.n_reach_ended <> 1 OR v_n.n_reminded <> 1 THEN
      RAISE EXCEPTION 'P-2 M-1c part 3 proof (b): the counts are % % % % %',
        v_n.n_expired, v_n.n_level_ended, v_n.n_level_paused, v_n.n_reach_ended, v_n.n_reminded;
    END IF;
    -- a: the slot was free — the baseline, live.
    SELECT * INTO v_row FROM public.listings WHERE id = v_a;
    SELECT feed_rank INTO STRICT v_rank FROM public.level_ranks WHERE key = v_base;
    IF v_row.status <> 'active' OR v_row.tier <> v_base OR v_row.tier_until IS NOT NULL OR v_row.tier_source IS NOT NULL
       OR (SELECT count(*) FROM public.listing_revisions WHERE listing_id = v_a) <> 1
       OR NOT EXISTS (SELECT 1 FROM public.listing_revisions
                       WHERE listing_id = v_a AND kind = 'edit' AND actor IS NULL AND seller_id = v_seller
                         AND before->>'tier' = v_lv AND before->>'tier_source' = 'launch' AND before->>'tier_until' IS NOT NULL
                         AND after->>'tier' = v_base AND after ? 'tier_until' AND after->>'tier_until' IS NULL)
       OR (SELECT count(*) FROM public.audit_log WHERE entity_id = v_a::text) <> 1
       OR NOT EXISTS (SELECT 1 FROM public.audit_log
                       WHERE entity_id = v_a::text AND actor_id IS NULL AND action = 'listing.level_ended' AND entity_type = 'listing'
                         AND meta->>'from' = v_lv AND meta->>'to' = v_base AND meta->>'source' = 'launch' AND meta ? 'until')
       OR NOT EXISTS (SELECT 1 FROM public.feed_index WHERE listing_id = v_a AND tier_rank = v_rank)
       OR EXISTS (SELECT 1 FROM public.seller_notices WHERE listing_id = v_a) THEN
      RAISE EXCEPTION 'P-2 M-1c part 3 proof (b): a did not fall to the baseline and stay live (% % %)', v_row.status, v_row.tier, v_row.tier_until;
    END IF;
    -- b: c and a hold the two free slots — the baseline, paused with its clock kept, the notice.
    SELECT * INTO v_row FROM public.listings WHERE id = v_b;
    IF v_row.status <> 'paused' OR v_row.tier <> v_base OR v_row.tier_until IS NOT NULL OR v_row.tier_source IS NOT NULL
       OR NOT v_row.clock_kept OR v_row.resume_status <> 'active'
       OR v_row.kept_remaining IS NULL OR v_row.kept_remaining > interval '10 days' OR v_row.kept_remaining < interval '9 days 23 hours'
       OR (SELECT count(*) FROM public.listing_revisions WHERE listing_id = v_b) <> 2
       OR NOT EXISTS (SELECT 1 FROM public.listing_revisions WHERE listing_id = v_b AND kind = 'edit' AND actor IS NULL
                         AND before->>'tier' = v_lv AND after->>'tier' = v_base)
       OR NOT EXISTS (SELECT 1 FROM public.listing_revisions WHERE listing_id = v_b AND kind = 'state'
                         AND before = '{"status": "active"}'::jsonb AND after = '{"status": "paused"}'::jsonb)
       OR (SELECT count(*) FROM public.audit_log WHERE entity_id = v_b::text) <> 2
       OR NOT EXISTS (SELECT 1 FROM public.audit_log WHERE entity_id = v_b::text AND actor_id IS NULL AND action = 'listing.level_ended')
       OR NOT EXISTS (SELECT 1 FROM public.audit_log WHERE entity_id = v_b::text AND actor_id IS NULL AND action = 'listing.level_paused'
                         AND meta->>'from' = v_lv AND (meta->>'live')::integer = 2 AND (meta->>'slots')::integer = 2)
       OR (SELECT count(*) FROM public.seller_notices WHERE listing_id = v_b) <> 1
       OR NOT EXISTS (SELECT 1 FROM public.seller_notices WHERE listing_id = v_b AND seller_id = v_seller
                         AND kind = 'level_paused' AND reason IS NULL AND read_at IS NULL)
       OR EXISTS (SELECT 1 FROM public.feed_index WHERE listing_id = v_b) THEN
      RAISE EXCEPTION 'P-2 M-1c part 3 proof (b): b was not paused at the baseline with its notice (% % kept %)', v_row.status, v_row.tier, v_row.kept_remaining;
    END IF;
    -- c: the reach ended — the columns NULL, the primary kept, two places removed (the free plan's 1/1/1),
    -- the revision with the removed ids, the audit row, the queue.
    SELECT * INTO v_row FROM public.listings WHERE id = v_c;
    IF v_row.status <> 'active' OR v_row.reach IS NOT NULL OR v_row.reach_until IS NOT NULL OR v_row.reach_source IS NOT NULL
       OR v_row.location_id <> v_c1
       OR (SELECT array_agg(ll.location_id ORDER BY ll.position) FROM public.listing_locations ll WHERE ll.listing_id = v_c) <> ARRAY[v_c1]
       OR (SELECT count(*) FROM public.listing_revisions WHERE listing_id = v_c) <> 1
       OR NOT EXISTS (SELECT 1 FROM public.listing_revisions
                       WHERE listing_id = v_c AND kind = 'edit' AND actor IS NULL
                         AND before->>'reach' = v_r1 AND before->>'reach_source' = 'launch'
                         AND before->'coverage' = to_jsonb(ARRAY[v_c1, v_c2, v_c3])
                         AND after ? 'reach' AND after->>'reach' IS NULL
                         AND after->'coverage' = to_jsonb(ARRAY[v_c1])
                         AND after->'removed' = to_jsonb(ARRAY[v_c2, v_c3]))
       OR (SELECT count(*) FROM public.audit_log WHERE entity_id = v_c::text) <> 1
       OR NOT EXISTS (SELECT 1 FROM public.audit_log
                       WHERE entity_id = v_c::text AND actor_id IS NULL AND action = 'listing.reach_ended'
                         AND meta->>'from' = v_r1 AND meta->>'source' = 'launch' AND (meta->>'removed')::integer = 2)
       OR NOT EXISTS (SELECT 1 FROM public.feed_reindex_queue q WHERE q.listing_id = v_c) THEN
      RAISE EXCEPTION 'P-2 M-1c part 3 proof (b): c''s reach end did not trim as DEC-330 says (reach % places %)',
        v_row.reach, (SELECT count(*) FROM public.listing_locations ll WHERE ll.listing_id = v_c);
    END IF;
    -- d: the reminder, once, the end remembered; nothing else of d changed.
    SELECT * INTO v_row FROM public.listings WHERE id = v_d;
    IF v_row.status <> 'active' OR v_row.tier <> v_lv OR v_row.tier_until <> v_until_d OR v_row.tier_reminded_for <> v_until_d
       OR (SELECT count(*) FROM public.seller_notices WHERE listing_id = v_d) <> 1
       OR NOT EXISTS (SELECT 1 FROM public.seller_notices WHERE listing_id = v_d AND seller_id = v_seller AND kind = 'level_ending' AND reason IS NULL)
       OR EXISTS (SELECT 1 FROM public.listing_revisions WHERE listing_id = v_d)
       OR EXISTS (SELECT 1 FROM public.audit_log WHERE entity_id = v_d::text) THEN
      RAISE EXCEPTION 'P-2 M-1c part 3 proof (b): d''s reminder was not written once (notices %)',
        (SELECT count(*) FROM public.seller_notices WHERE listing_id = v_d);
    END IF;
    -- e: expired through the state machine; g: outside the scope, untouched.
    IF (SELECT status FROM public.listings WHERE id = v_e) <> 'expired'
       OR NOT EXISTS (SELECT 1 FROM public.listing_revisions WHERE listing_id = v_e AND kind = 'state' AND after->>'status' = 'expired') THEN
      RAISE EXCEPTION 'P-2 M-1c part 3 proof (b): e did not expire';
    END IF;
    SELECT * INTO v_row FROM public.listings WHERE id = v_g;
    IF v_row.status <> 'active' OR v_row.tier <> v_lv OR v_row.tier_until IS NULL
       OR EXISTS (SELECT 1 FROM public.listing_revisions WHERE listing_id = v_g)
       OR EXISTS (SELECT 1 FROM public.audit_log WHERE entity_id = v_g::text) THEN
      RAISE EXCEPTION 'P-2 M-1c part 3 proof (b): g, outside the scope, was touched';
    END IF;
    -- A second run over the same scope moves nothing.
    FOR i IN 1..2 LOOP
      SELECT concat_ws('|',
               (SELECT count(*) FROM public.listing_revisions WHERE listing_id IN (v_a, v_b, v_c, v_d, v_e)),
               (SELECT count(*) FROM public.audit_log WHERE entity_id IN (v_a::text, v_b::text, v_c::text, v_d::text, v_e::text)),
               (SELECT count(*) FROM public.seller_notices WHERE listing_id IN (v_a, v_b, v_c, v_d, v_e)),
               (SELECT count(*) FROM public.listing_locations WHERE listing_id IN (v_a, v_b, v_c, v_d, v_e)),
               (SELECT string_agg(id::text || ':' || status || ':' || tier || ':' || coalesce(tier_until::text, '-') || ':' || coalesce(reach, '-')
                                  || ':' || coalesce(tier_reminded_for::text, '-'), ',' ORDER BY id)
                  FROM public.listings WHERE id IN (v_a, v_b, v_c, v_d, v_e)))
        INTO v_snap2;
      IF i = 1 THEN
        v_snap := v_snap2;
        SELECT * INTO v_n FROM public.designation_sweep_core(ARRAY[v_a, v_b, v_c, v_d, v_e]);
      END IF;
    END LOOP;
    IF v_n.n_expired + v_n.n_level_ended + v_n.n_level_paused + v_n.n_reach_ended + v_n.n_reminded <> 0 OR v_snap2 IS DISTINCT FROM v_snap THEN
      RAISE EXCEPTION 'P-2 M-1c part 3 proof (b): the second run moved something (% -> %)', v_snap, v_snap2;
    END IF;
    RAISE EXCEPTION 'p2-m1c3-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c3-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261105100300') ON CONFLICT DO NOTHING;
