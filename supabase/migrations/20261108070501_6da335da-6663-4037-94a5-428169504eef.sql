-- e2e-areas: feed, ad-page, admin-monetisation
-- P-2 turn (c) M-3c-a, part 2 of 6 — THE CARD LOOK PRECOMPUTED INTO THE FEED INDEX: ITS KEEPERS (docs/governance/
-- briefs/p2-fold-c2a-ruling-2.md §2, §3, DEC-352). It follows part 1 (the cache: feed_index's placement and badge,
-- written by feed_index_refresh).
--   A. feed_index_check redeclared WHOLE from 20261104153313 (f5c8063d) :166 (md5 275d7b2b42350328113f821f0c831b7b,
--      checked live below): one more count, listings_with_wrong_look — a live ad with a row whose look is not the
--      resolver's current answer. feed_index_check_sweep stores the whole answer nightly in feed_index_check_runs,
--      so a drift is a line there; every other count keeps its meaning.
--   B. Two triggers keep the cache true, each queuing through feed_reindex_enqueue_listings (20261104153313 :40),
--      drained by feed_reindex_sweep (500 a run, every minute — DEC-341's window):
--        listing_packages_level_look — AFTER UPDATE OF placement, badge, enabled, FOR EACH ROW, WHEN a level row's
--          triple changed: that level's live ads; any other column queues nothing;
--        level_overrides_level_look — AFTER INSERT OR UPDATE OR DELETE, FOR EACH ROW: every live ad on the
--          override's level (the old and the new level on an update) — a superset of the ads the override reaches.
--      The ad's own changes and the category tree already refresh.
-- Proofs at the end on scratch rows (market XZ, currency XTS, e2e_mig_ keys), rolled back by the sentinel.

DO $pre$
DECLARE
  v_md5 text;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261108090000') THEN
    RAISE EXCEPTION 'P-2 (c) M-3c-a part 2: part 1 (f5397010, mark 20261108090000) must be applied first';
  END IF;
  -- G39: the body this file redeclares is, live, the body of its last declaration.
  SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p
   WHERE p.oid = 'public.feed_index_check(uuid)'::regprocedure;
  IF v_md5 IS DISTINCT FROM '275d7b2b42350328113f821f0c831b7b' THEN
    RAISE EXCEPTION 'P-2 (c) M-3c-a part 2: live feed_index_check is not 20261104153313''s body (%)', v_md5;
  END IF;
END $pre$;

-- ------------------------------------------------------------ A. THE CHECK
CREATE OR REPLACE FUNCTION public.feed_index_check(p_listing_id uuid DEFAULT NULL)
RETURNS jsonb
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $fn$
  WITH scope AS (
    SELECT l.id, l.status, l.published_at, l.category_id, l.location_id, l.tier, l.sold_at
      FROM public.listings l
     WHERE p_listing_id IS NULL OR l.id = p_listing_id
  ),
  live AS (
    -- Bundle 16 turn 3c (D175 1) — a sold ad stays in the feed for 30 days after it sold, read after the live ones.
    SELECT s.*, r.feed_rank
      FROM scope s
      LEFT JOIN public.level_ranks r ON r.key = s.tier
     WHERE s.published_at IS NOT NULL
       AND (s.status = 'active' OR (s.status = 'sold' AND s.sold_at > (SELECT public.sold_cutoff())))
  ),
  indexed AS (
    SELECT DISTINCT f.listing_id
      FROM public.feed_index f
     WHERE p_listing_id IS NULL OR f.listing_id = p_listing_id
  )
  SELECT jsonb_build_object(
    'active_listings',
      (SELECT count(*) FROM scope WHERE status = 'active'),
    'active_without_published_at',
      (SELECT count(*) FROM scope WHERE status = 'active' AND published_at IS NULL),
    'sold_shown',
      (SELECT count(*) FROM live WHERE status = 'sold'),
    'active_without_rows',
      (SELECT count(*) FROM live v WHERE NOT EXISTS (SELECT 1 FROM indexed i WHERE i.listing_id = v.id)),
    'rows_for_inactive',
      (SELECT count(*) FROM public.feed_index f JOIN scope s ON s.id = f.listing_id
        WHERE NOT EXISTS (SELECT 1 FROM live v WHERE v.id = s.id)),
    'listings_with_wrong_rows',
      (SELECT count(*) FROM live v
        WHERE EXISTS (SELECT 1 FROM indexed i WHERE i.listing_id = v.id)
          AND EXISTS (
            (SELECT f.category_key, f.place_key, f.tier_rank, f.published_at
               FROM public.feed_index f WHERE f.listing_id = v.id
             EXCEPT
             SELECT k.category_key, k.place_key, CASE WHEN v.status = 'sold' THEN -1 ELSE v.feed_rank END, v.published_at
               FROM public.feed_keys(v.category_id, ARRAY[v.location_id] || ARRAY(
                      SELECT ll.location_id FROM public.listing_locations ll WHERE ll.listing_id = v.id)) k)
            UNION ALL
            (SELECT k.category_key, k.place_key, CASE WHEN v.status = 'sold' THEN -1 ELSE v.feed_rank END, v.published_at
               FROM public.feed_keys(v.category_id, ARRAY[v.location_id] || ARRAY(
                      SELECT ll.location_id FROM public.listing_locations ll WHERE ll.listing_id = v.id)) k
             EXCEPT
             SELECT f.category_key, f.place_key, f.tier_rank, f.published_at
               FROM public.feed_index f WHERE f.listing_id = v.id))),
    -- P-2 (c) M-3c-a (DEC-352): the look the index caches — a live ad with a row whose placement or badge is
    -- not level_perks_for's current answer for its level, category and location's country (the refresh's read).
    'listings_with_wrong_look',
      (SELECT count(*) FROM live v
         LEFT JOIN public.locations loc ON loc.id = v.location_id
        CROSS JOIN LATERAL (SELECT public.level_perks_for(v.tier, v.category_id, loc.country_code) AS p) w
        WHERE EXISTS (SELECT 1 FROM public.feed_index f
                       WHERE f.listing_id = v.id
                         AND (f.placement, f.badge) IS DISTINCT FROM (w.p->>'placement', (w.p->>'badge')::boolean)))
  );
$fn$;
REVOKE ALL ON FUNCTION public.feed_index_check(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.feed_index_check(uuid) TO service_role;

-- ------------------------------------------------------------ B. THE TWO TRIGGERS
CREATE FUNCTION public.feed_index_level_look_requeue()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $fn$
BEGIN
  -- The trigger's WHEN let through a level row whose placement, badge or enabled changed: its live ads are queued,
  -- and the drain's refresh writes their look again.
  PERFORM public.feed_reindex_enqueue_listings(ARRAY(
    SELECT l.id FROM public.listings l
     WHERE l.tier = NEW.key AND l.status IN ('active', 'sold')));
  RETURN NULL;
END $fn$;
COMMENT ON FUNCTION public.feed_index_level_look_requeue() IS
  'Queues the live ads of a level row whose placement, badge or enabled changed, so the drain rewrites the look feed_index caches (P-2 (c), DEC-352).';
REVOKE ALL ON FUNCTION public.feed_index_level_look_requeue() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.feed_index_level_look_requeue() TO service_role;

CREATE TRIGGER listing_packages_level_look
  AFTER UPDATE OF placement, badge, enabled ON public.listing_packages
  FOR EACH ROW
  WHEN (NEW.kind = 'level'
        AND (OLD.placement, OLD.badge, OLD.enabled) IS DISTINCT FROM (NEW.placement, NEW.badge, NEW.enabled))
  EXECUTE FUNCTION public.feed_index_level_look_requeue();

CREATE FUNCTION public.feed_index_level_override_requeue()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $fn$
DECLARE
  v_keys text[];
BEGIN
  -- Every live ad on the override's level is queued (the old and the new level on an update): a superset of the
  -- ads the override reaches, rewritten unchanged where it does not (ruling 2 §2).
  IF TG_OP = 'INSERT' THEN
    v_keys := ARRAY[NEW.level_key];
  ELSIF TG_OP = 'DELETE' THEN
    v_keys := ARRAY[OLD.level_key];
  ELSE
    v_keys := ARRAY[OLD.level_key, NEW.level_key];
  END IF;
  PERFORM public.feed_reindex_enqueue_listings(ARRAY(
    SELECT l.id FROM public.listings l
     WHERE l.tier = ANY (v_keys) AND l.status IN ('active', 'sold')));
  RETURN NULL;
END $fn$;
COMMENT ON FUNCTION public.feed_index_level_override_requeue() IS
  'Queues every live ad on the level of an override inserted, changed or removed, so the drain rewrites the look feed_index caches (P-2 (c), DEC-352).';
REVOKE ALL ON FUNCTION public.feed_index_level_override_requeue() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.feed_index_level_override_requeue() TO service_role;

CREATE TRIGGER level_overrides_level_look
  AFTER INSERT OR UPDATE OR DELETE ON public.level_overrides
  FOR EACH ROW EXECUTE FUNCTION public.feed_index_level_override_requeue();

-- ------------------------------------------------------------ PROOFS
-- Scratch rows only, rolled back by the sentinel; the only real rows read are the level rows (a derived sort), read
-- only. The drain's core is not run (it would take real queue rows): a direct refresh stands for it.
--   (a) the two triggers (pg_trigger's columns: after, row, events, columns, a WHEN on the first, none on the
--       second, the function, enabled), the three functions' headers and grants, the check sql and stable;
--   (b) the check's body is its last declaration's but for this file's fragment (md5 with the fragment put back);
--   (c) a live ad at a scratch level: the level's placement changes → the ad is queued → a refresh writes the new
--       look; the same for badge; enabled off → queued → NULL axes; on again → queued → the look back; a change to
--       name_en → nothing queued;
--   (d) a scratch override (its category, every country) inserted, updated, deleted → queued each time, and each
--       refresh writes the resolver's answer;
--   (e) a planted drift is counted by feed_index_check(the ad) under listings_with_wrong_look only; after a refresh
--       it counts nothing.
DO $proof$
DECLARE
  v_ck      regprocedure := 'public.feed_index_check(uuid)'::regprocedure;
  v_lq      regprocedure := 'public.feed_index_level_look_requeue()'::regprocedure;
  v_oq      regprocedure := 'public.feed_index_level_override_requeue()'::regprocedure;
  v_fn      regprocedure;
  v_tag     text := 'e2e-mig-p2c-m3ca2-' || substr(gen_random_uuid()::text, 1, 8);
  v_seller  uuid := gen_random_uuid();
  v_stem    text := substr(replace(gen_random_uuid()::text, '-', ''), 1, 8);
  v_code    char(2) := 'XZ';
  v_cur     char(3) := 'XTS';
  v_s       integer := (SELECT coalesce(max(sort), 0) + 100 FROM public.listing_packages WHERE kind = 'level');
  v_anc     uuid;
  v_region  uuid;
  v_city    uuid;
  v_cat     uuid;
  v_a       uuid;
  v_perks   jsonb;
  v_rows    integer;
  v_wrong   integer;
  v_ok      text;
  v_n       integer;
  v_src     text;
  v_pair    text[];
  v_pairs   text[][];
  v_md5     text;
  v_msg     text;
  v_lv      text := 'e2e_mig_look_' || v_stem;
  v_ov      uuid;
  v_check   jsonb;
  v_step    text;
BEGIN
  -- (a)
  -- Catalog columns, never pg_get_triggerdef's text (INC-1054, law 12).
  SELECT 'ok' INTO v_ok
    FROM pg_trigger t
   WHERE t.tgrelid = 'public.listing_packages'::regclass AND t.tgname = 'listing_packages_level_look' AND NOT t.tgisinternal
     AND t.tgfoid = v_lq AND t.tgenabled = 'O' AND t.tgqual IS NOT NULL
     AND (t.tgtype & 1) <> 0 AND (t.tgtype & 2) = 0 AND (t.tgtype & 64) = 0
     AND (t.tgtype & 4) = 0 AND (t.tgtype & 8) = 0 AND (t.tgtype & 16) <> 0
     AND (SELECT array_agg(a.attname::text ORDER BY a.attname)
            FROM unnest(t.tgattr) AS n(attnum)
            JOIN pg_attribute a ON a.attrelid = t.tgrelid AND a.attnum = n.attnum) = ARRAY['badge', 'enabled', 'placement'];
  IF v_ok IS NULL THEN
    RAISE EXCEPTION 'P-2 (c) M-3c-a part 2 proof (a): listing_packages_level_look is missing or differs';
  END IF;
  v_ok := NULL;
  SELECT 'ok' INTO v_ok
    FROM pg_trigger t
   WHERE t.tgrelid = 'public.level_overrides'::regclass AND t.tgname = 'level_overrides_level_look' AND NOT t.tgisinternal
     AND t.tgfoid = v_oq AND t.tgenabled = 'O' AND t.tgqual IS NULL
     AND (t.tgtype & 1) <> 0 AND (t.tgtype & 2) = 0 AND (t.tgtype & 64) = 0
     AND (t.tgtype & 4) <> 0 AND (t.tgtype & 8) <> 0 AND (t.tgtype & 16) <> 0
     AND cardinality(t.tgattr::int2[]) = 0;
  IF v_ok IS NULL THEN
    RAISE EXCEPTION 'P-2 (c) M-3c-a part 2 proof (a): level_overrides_level_look is missing or differs';
  END IF;
  FOREACH v_fn IN ARRAY ARRAY[v_ck, v_lq, v_oq] LOOP
    IF (SELECT NOT prosecdef OR proconfig::text <> '{search_path=public}' FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR has_function_privilege('authenticated', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'P-2 (c) M-3c-a part 2 proof (a): the header or the grants of % differ', v_fn;
    END IF;
  END LOOP;
  IF (SELECT provolatile FROM pg_proc WHERE oid = v_ck) <> 's'
     OR (SELECT l.lanname FROM pg_proc p JOIN pg_language l ON l.oid = p.prolang WHERE p.oid = v_ck) <> 'sql' THEN
    RAISE EXCEPTION 'P-2 (c) M-3c-a part 2 proof (a): the check''s volatility or language differ';
  END IF;

  -- (b) Both sides without chr(13) (INC-1056, law 13): prosrc, and each literal.
  SELECT replace(p.prosrc, chr(13), '') INTO v_src FROM pg_proc p WHERE p.oid = v_ck;
  v_pairs := ARRAY[
    ['               FROM public.feed_index f WHERE f.listing_id = v.id))),
    -- P-2 (c) M-3c-a (DEC-352): the look the index caches — a live ad with a row whose placement or badge is
    -- not level_perks_for''s current answer for its level, category and location''s country (the refresh''s read).
    ''listings_with_wrong_look'',
      (SELECT count(*) FROM live v
         LEFT JOIN public.locations loc ON loc.id = v.location_id
        CROSS JOIN LATERAL (SELECT public.level_perks_for(v.tier, v.category_id, loc.country_code) AS p) w
        WHERE EXISTS (SELECT 1 FROM public.feed_index f
                       WHERE f.listing_id = v.id
                         AND (f.placement, f.badge) IS DISTINCT FROM (w.p->>''placement'', (w.p->>''badge'')::boolean)))
  );
',
     '               FROM public.feed_index f WHERE f.listing_id = v.id)))
  );
']];
  FOREACH v_pair SLICE 1 IN ARRAY v_pairs LOOP
    v_n := (length(v_src) - length(replace(v_src, replace(v_pair[1], chr(13), ''), ''))) / length(replace(v_pair[1], chr(13), ''));
    IF v_n <> 1 THEN
      RAISE EXCEPTION 'P-2 (c) M-3c-a part 2 proof (b): a feed_index_check fragment occurs % times', v_n;
    END IF;
    v_src := replace(v_src, replace(v_pair[1], chr(13), ''), replace(v_pair[2], chr(13), ''));
  END LOOP;
  v_md5 := md5(v_src);
  IF v_md5 IS DISTINCT FROM '275d7b2b42350328113f821f0c831b7b' THEN
    RAISE EXCEPTION 'P-2 (c) M-3c-a part 2 proof (b): feed_index_check differs from its last declaration beyond this file''s fragments (%)', v_md5;
  END IF;

  BEGIN
    -- A scratch market (the INC-949 proof's way).
    IF EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
      RAISE EXCEPTION 'P-2 (c) M-3c-a part 2 proof: the scratch code % already exists', v_code;
    END IF;
    -- ISO 4217 keeps XTS for testing; no market ever prices in it (K4 exception, as 'XZ').
    INSERT INTO public.currencies (code, name_en, minor_units) VALUES (v_cur, 'e2e-mig-p2c-m3ca2', 2);
    INSERT INTO public.countries (code, name_en, is_active, currency_code) VALUES (v_code, 'e2e-mig-p2c-m3ca2', true, v_cur);
    SELECT a.id INTO v_anc FROM public.locations a
     WHERE a.country_code = v_code AND a.level = 'country' AND a.name_en = 'e2e-mig-p2c-m3ca2';
    IF v_anc IS NULL THEN RAISE EXCEPTION 'P-2 (c) M-3c-a part 2 proof: the scratch market has no anchor'; END IF;
    UPDATE public.locations SET is_active = true WHERE id = v_anc AND name_en LIKE 'e2e-mig-p2c-m3ca2%';
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id)
    VALUES ('region', v_code, 'E2E P2c M3ca2 Region', v_tag || '-r', true, v_anc) RETURNING id INTO v_region;
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id, center_lat, center_lng)
    VALUES ('city', v_code, 'E2E P2c M3ca2 City', v_tag || '-c', true, v_region, 9.03, 38.74) RETURNING id INTO v_city;
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at)
    VALUES (v_seller, v_tag || '-seller@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES ('E2E P2c M3ca2 Main', v_tag, true, true, true, 9999) RETURNING id INTO v_cat;
    -- A level above every real one (its sort derived, never a real value): standard, no badge, enabled.
    INSERT INTO public.listing_packages (key, kind, name_en, days, max_photos, placement, badge, enabled, self_serve,
                                         extends_lifetime, sort)
    VALUES (v_lv, 'level', 'E2E P2c look level', 30, 4, 'standard', false, true, false, false, v_s + 1);
    -- A live ad at it (a staff mark: no end); the insert trigger writes its rows.
    INSERT INTO public.listings (seller_id, category_id, location_id, title, description, home_country_code,
                                 status, published_at, published_first_at, expires_at, tier, tier_source)
    VALUES (v_seller, v_cat, v_city, 'E2E P2c M3ca2 a', 'scratch', v_code, 'active', now(), now(), now() + interval '10 days',
            v_lv, 'staff')
    RETURNING id INTO v_a;

    -- (c), (d): each step compares the ad's rows with the resolver's answer, read into a variable (CF-PROOF-1).
    FOR v_step IN SELECT s FROM unnest(ARRAY['insert', 'placement', 'badge', 'off', 'on', 'name',
                                             'ov-insert', 'ov-update', 'ov-delete']) AS s LOOP
      DELETE FROM public.feed_reindex_queue WHERE listing_id = v_a;
      IF v_step = 'placement' THEN
        UPDATE public.listing_packages SET placement = 'top' WHERE key = v_lv;
      ELSIF v_step = 'badge' THEN
        UPDATE public.listing_packages SET badge = true WHERE key = v_lv;
      ELSIF v_step = 'off' THEN
        UPDATE public.listing_packages SET enabled = false WHERE key = v_lv;
      ELSIF v_step = 'on' THEN
        UPDATE public.listing_packages SET enabled = true WHERE key = v_lv;
      ELSIF v_step = 'name' THEN
        UPDATE public.listing_packages SET name_en = 'E2E P2c look level renamed' WHERE key = v_lv;
      ELSIF v_step = 'ov-insert' THEN
        INSERT INTO public.level_overrides (level_key, category_id, country_code, placement)
        VALUES (v_lv, v_cat, NULL, 'boost') RETURNING id INTO v_ov;
      ELSIF v_step = 'ov-update' THEN
        UPDATE public.level_overrides SET badge = false WHERE id = v_ov;
      ELSIF v_step = 'ov-delete' THEN
        DELETE FROM public.level_overrides WHERE id = v_ov;
      END IF;
      IF v_step NOT IN ('insert', 'name')
         AND NOT EXISTS (SELECT 1 FROM public.feed_reindex_queue WHERE listing_id = v_a) THEN
        RAISE EXCEPTION 'P-2 (c) M-3c-a part 2 proof (c/d): step % did not queue the ad', v_step;
      END IF;
      IF v_step = 'name' AND EXISTS (SELECT 1 FROM public.feed_reindex_queue WHERE listing_id = v_a) THEN
        RAISE EXCEPTION 'P-2 (c) M-3c-a part 2 proof (c): a change to name_en queued the ad';
      END IF;
      IF v_step <> 'insert' THEN
        PERFORM public.feed_index_refresh(v_a);
      END IF;
      v_perks := public.level_perks_for(v_lv, v_cat, v_code);
      SELECT count(*), count(*) FILTER (WHERE (f.placement, f.badge)
                                              IS DISTINCT FROM (v_perks->>'placement', (v_perks->>'badge')::boolean))
        INTO v_rows, v_wrong
        FROM public.feed_index f WHERE f.listing_id = v_a;
      IF v_rows = 0 OR v_wrong <> 0
         OR (v_step <> 'off' AND v_perks IS NULL)
         OR (v_step = 'insert'    AND v_perks IS DISTINCT FROM v_perks || '{"placement": "standard", "badge": false}')
         OR (v_step = 'placement' AND v_perks IS DISTINCT FROM v_perks || '{"placement": "top", "badge": false}')
         OR (v_step IN ('badge', 'on', 'name', 'ov-delete')
                                  AND v_perks IS DISTINCT FROM v_perks || '{"placement": "top", "badge": true}')
         OR (v_step = 'off'       AND v_perks IS NOT NULL)
         OR (v_step = 'ov-insert' AND v_perks IS DISTINCT FROM v_perks || '{"placement": "boost", "badge": true}')
         OR (v_step = 'ov-update' AND v_perks IS DISTINCT FROM v_perks || '{"placement": "boost", "badge": false}') THEN
        RAISE EXCEPTION 'P-2 (c) M-3c-a part 2 proof (c/d): after step % the rows (% of %) do not carry the look %',
          v_step, v_wrong, v_rows, v_perks;
      END IF;
    END LOOP;
    IF EXISTS (SELECT 1 FROM public.feed_index f WHERE f.listing_id = v_a AND f.placement IS NULL) THEN
      RAISE EXCEPTION 'P-2 (c) M-3c-a part 2 proof (c): the look did not come back after the level was on again';
    END IF;

    -- (e)
    UPDATE public.feed_index SET placement = 'standard' WHERE listing_id = v_a;
    v_check := public.feed_index_check(v_a);
    IF (v_check->>'listings_with_wrong_look')::int IS DISTINCT FROM 1
       OR (v_check->>'listings_with_wrong_rows')::int IS DISTINCT FROM 0
       OR (v_check->>'active_without_rows')::int IS DISTINCT FROM 0 THEN
      RAISE EXCEPTION 'P-2 (c) M-3c-a part 2 proof (e): a planted drift is not counted as a wrong look alone (%)', v_check;
    END IF;
    PERFORM public.feed_index_refresh(v_a);
    v_check := public.feed_index_check(v_a);
    IF (v_check->>'listings_with_wrong_look')::int IS DISTINCT FROM 0
       OR (v_check->>'listings_with_wrong_rows')::int IS DISTINCT FROM 0 THEN
      RAISE EXCEPTION 'P-2 (c) M-3c-a part 2 proof (e): after a refresh the check still counts a drift (%)', v_check;
    END IF;

    RAISE EXCEPTION 'p2c-m3ca2-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2c-m3ca2-proof-ok' THEN RAISE; END IF;
  END;
  IF EXISTS (SELECT 1 FROM auth.users WHERE id = v_seller AND email LIKE 'e2e-mig-%')
     OR EXISTS (SELECT 1 FROM public.listing_packages WHERE key IN (v_lv)) THEN
    RAISE EXCEPTION 'P-2 (c) M-3c-a part 2 proof: the scratch rows outlived the sentinel';
  END IF;
END;
$proof$;

-- ------------------------------------------------------------ CLOSERS
REVOKE ALL ON FUNCTION public.feed_index_check(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.feed_index_check(uuid) TO service_role;
REVOKE ALL ON FUNCTION public.feed_index_level_look_requeue() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.feed_index_level_look_requeue() TO service_role;
REVOKE ALL ON FUNCTION public.feed_index_level_override_requeue() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.feed_index_level_override_requeue() TO service_role;

INSERT INTO public.migration_marks (version) VALUES ('20261108090100') ON CONFLICT DO NOTHING;
