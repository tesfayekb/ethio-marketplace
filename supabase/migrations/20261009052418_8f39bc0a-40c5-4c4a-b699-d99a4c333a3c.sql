-- lovable-cron-fallback-reviewed: bundle 10 brief version 4 (E2a) - feed-reindex-drain runs every minute ONLY while the tree-change queue holds listings: it is scheduled when listings are queued and unschedules itself when the queue is empty; the five write triggers are the main path. The only standing schedule is the daily feed-index-check.
-- E2a (bundle 10, the feed engine): the index keeps itself right. The tier sets the rank (D108: premium, then featured, then regular); every write to a listing or its places refreshes that listing's rows in the same transaction; a moved category or place queues the listings under it and wakes a drain that runs every minute until the queue is empty, with a heartbeat; a daily check writes its counts. Spec: docs/governance/feed-engine-spec.md.
-- e2e-areas: feed, posting

-- 1. The tier's rank: premium 2, featured 1, regular 0; read first when higher.
CREATE FUNCTION public.feed_tier_rank(p_tier text)
RETURNS smallint
LANGUAGE plpgsql
IMMUTABLE
SET search_path TO 'public'
AS $fn$
DECLARE
  v_rank smallint;
BEGIN
  v_rank := CASE p_tier WHEN 'premium' THEN 2 WHEN 'featured' THEN 1 WHEN 'regular' THEN 0 END;
  IF v_rank IS NULL THEN
    RAISE EXCEPTION 'feed_tier_rank: unknown tier %', p_tier;
  END IF;
  RETURN v_rank;
END $fn$;
REVOKE ALL ON FUNCTION public.feed_tier_rank(text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.feed_tier_rank(text) TO service_role;

COMMENT ON COLUMN public.feed_index.tier_rank IS
  'The listing''s tier (D108): premium 2, featured 1, regular 0 (feed_tier_rank). A higher rank is read first; newest first inside a rank.';

-- 2. The refresh, redeclared whole from E1 with one change: the rank comes from the listing's tier.
CREATE OR REPLACE FUNCTION public.feed_index_refresh(p_listing_id uuid)
RETURNS integer
LANGUAGE plpgsql
VOLATILE SECURITY DEFINER
SET search_path TO 'public'
AS $fn$
DECLARE
  v_status      text;
  v_published   timestamptz;
  v_category_id uuid;
  v_location_id uuid;
  v_tier        text;
  v_n           integer := 0;
BEGIN
  -- The listing's row lock serialises two refreshes of the same listing.
  SELECT l.status, l.published_at, l.category_id, l.location_id, l.tier
    INTO v_status, v_published, v_category_id, v_location_id, v_tier
    FROM public.listings l
   WHERE l.id = p_listing_id
     FOR UPDATE;
  DELETE FROM public.feed_index WHERE listing_id = p_listing_id;
  IF v_status IS DISTINCT FROM 'active' OR v_published IS NULL THEN
    RETURN 0;
  END IF;
  INSERT INTO public.feed_index (category_key, place_key, tier_rank, published_at, listing_id)
  SELECT k.category_key, k.place_key, public.feed_tier_rank(v_tier), v_published, p_listing_id
    FROM public.feed_keys(
           v_category_id,
           ARRAY[v_location_id] || ARRAY(
             SELECT ll.location_id FROM public.listing_locations ll WHERE ll.listing_id = p_listing_id)) k;
  GET DIAGNOSTICS v_n = ROW_COUNT;
  RETURN v_n;
END $fn$;
REVOKE ALL ON FUNCTION public.feed_index_refresh(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.feed_index_refresh(uuid) TO service_role;

-- 3. The check, redeclared whole from E1 with one change: the expected rank comes from the tier.
CREATE OR REPLACE FUNCTION public.feed_index_check(p_listing_id uuid DEFAULT NULL)
RETURNS jsonb
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $fn$
  WITH scope AS (
    SELECT l.id, l.status, l.published_at, l.category_id, l.location_id, l.tier
      FROM public.listings l
     WHERE p_listing_id IS NULL OR l.id = p_listing_id
  ),
  live AS (
    SELECT * FROM scope WHERE status = 'active' AND published_at IS NOT NULL
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
    'active_without_rows',
      (SELECT count(*) FROM live v WHERE NOT EXISTS (SELECT 1 FROM indexed i WHERE i.listing_id = v.id)),
    'rows_for_inactive',
      (SELECT count(*) FROM public.feed_index f JOIN scope s ON s.id = f.listing_id
        WHERE s.status <> 'active' OR s.published_at IS NULL),
    'listings_with_wrong_rows',
      (SELECT count(*) FROM live v
        WHERE EXISTS (SELECT 1 FROM indexed i WHERE i.listing_id = v.id)
          AND EXISTS (
            (SELECT f.category_key, f.place_key, f.tier_rank, f.published_at
               FROM public.feed_index f WHERE f.listing_id = v.id
             EXCEPT
             SELECT k.category_key, k.place_key, public.feed_tier_rank(v.tier), v.published_at
               FROM public.feed_keys(v.category_id, ARRAY[v.location_id] || ARRAY(
                      SELECT ll.location_id FROM public.listing_locations ll WHERE ll.listing_id = v.id)) k)
            UNION ALL
            (SELECT k.category_key, k.place_key, public.feed_tier_rank(v.tier), v.published_at
               FROM public.feed_keys(v.category_id, ARRAY[v.location_id] || ARRAY(
                      SELECT ll.location_id FROM public.listing_locations ll WHERE ll.listing_id = v.id)) k
             EXCEPT
             SELECT f.category_key, f.place_key, f.tier_rank, f.published_at
               FROM public.feed_index f WHERE f.listing_id = v.id)))
  );
$fn$;
REVOKE ALL ON FUNCTION public.feed_index_check(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.feed_index_check(uuid) TO service_role;

-- 4. Every write to a listing refreshes it in the same transaction (statement-level, one refresh per listing).
CREATE FUNCTION public.feed_index_on_listing_insert()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $fn$
BEGIN
  PERFORM public.feed_index_refresh(n.id) FROM new_rows n WHERE n.status = 'active';
  RETURN NULL;
END $fn$;
REVOKE ALL ON FUNCTION public.feed_index_on_listing_insert() FROM PUBLIC, anon, authenticated;
CREATE TRIGGER feed_index_on_listing_insert
  AFTER INSERT ON public.listings
  REFERENCING NEW TABLE AS new_rows
  FOR EACH STATEMENT EXECUTE FUNCTION public.feed_index_on_listing_insert();

CREATE FUNCTION public.feed_index_on_listing_update()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $fn$
BEGIN
  PERFORM public.feed_index_refresh(n.id)
     FROM new_rows n
     JOIN old_rows o ON o.id = n.id
    WHERE (o.status = 'active' OR n.status = 'active')
      AND (o.status, o.published_at, o.category_id, o.location_id, o.tier)
          IS DISTINCT FROM (n.status, n.published_at, n.category_id, n.location_id, n.tier);
  RETURN NULL;
END $fn$;
REVOKE ALL ON FUNCTION public.feed_index_on_listing_update() FROM PUBLIC, anon, authenticated;
CREATE TRIGGER feed_index_on_listing_update
  AFTER UPDATE ON public.listings
  REFERENCING OLD TABLE AS old_rows NEW TABLE AS new_rows
  FOR EACH STATEMENT EXECUTE FUNCTION public.feed_index_on_listing_update();

-- 5. Every write to a listing's extra places refreshes that listing (an active one only).
CREATE FUNCTION public.feed_index_on_place_insert()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $fn$
BEGIN
  PERFORM public.feed_index_refresh(x.listing_id)
     FROM (SELECT DISTINCT n.listing_id FROM new_rows n) x
     JOIN public.listings l ON l.id = x.listing_id
    WHERE l.status = 'active';
  RETURN NULL;
END $fn$;
REVOKE ALL ON FUNCTION public.feed_index_on_place_insert() FROM PUBLIC, anon, authenticated;
CREATE TRIGGER feed_index_on_place_insert
  AFTER INSERT ON public.listing_locations
  REFERENCING NEW TABLE AS new_rows
  FOR EACH STATEMENT EXECUTE FUNCTION public.feed_index_on_place_insert();

CREATE FUNCTION public.feed_index_on_place_delete()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $fn$
BEGIN
  PERFORM public.feed_index_refresh(x.listing_id)
     FROM (SELECT DISTINCT o.listing_id FROM old_rows o) x
     JOIN public.listings l ON l.id = x.listing_id
    WHERE l.status = 'active';
  RETURN NULL;
END $fn$;
REVOKE ALL ON FUNCTION public.feed_index_on_place_delete() FROM PUBLIC, anon, authenticated;
CREATE TRIGGER feed_index_on_place_delete
  AFTER DELETE ON public.listing_locations
  REFERENCING OLD TABLE AS old_rows
  FOR EACH STATEMENT EXECUTE FUNCTION public.feed_index_on_place_delete();

CREATE FUNCTION public.feed_index_on_place_update()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $fn$
BEGIN
  PERFORM public.feed_index_refresh(x.listing_id)
     FROM (SELECT n.listing_id FROM new_rows n UNION SELECT o.listing_id FROM old_rows o) x
     JOIN public.listings l ON l.id = x.listing_id
    WHERE l.status = 'active';
  RETURN NULL;
END $fn$;
REVOKE ALL ON FUNCTION public.feed_index_on_place_update() FROM PUBLIC, anon, authenticated;
CREATE TRIGGER feed_index_on_place_update
  AFTER UPDATE ON public.listing_locations
  REFERENCING OLD TABLE AS old_rows NEW TABLE AS new_rows
  FOR EACH STATEMENT EXECUTE FUNCTION public.feed_index_on_place_update();

-- 6. A moved category or place queues the active listings under it; a sweep refreshes them.
CREATE TABLE public.feed_reindex_queue (
  listing_id uuid NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
  queued_at  timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT feed_reindex_queue_pkey PRIMARY KEY (listing_id)
);
CREATE INDEX feed_reindex_queue_queued_idx ON public.feed_reindex_queue (queued_at);
COMMENT ON TABLE public.feed_reindex_queue IS
  'Listings whose feed rows must be rewritten after a category or place moved; drained by feed_reindex_sweep, which the job feed-reindex-drain runs every minute while this queue holds rows.';
REVOKE ALL ON TABLE public.feed_reindex_queue FROM PUBLIC, anon, authenticated;
GRANT ALL ON TABLE public.feed_reindex_queue TO service_role;
ALTER TABLE public.feed_reindex_queue ENABLE ROW LEVEL SECURITY;
CREATE POLICY "feed_reindex_queue_no_client_access" ON public.feed_reindex_queue
  FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);

CREATE TABLE public.feed_reindex_runs (
  id        bigserial PRIMARY KEY,
  ran_at    timestamptz NOT NULL DEFAULT now(),
  refreshed integer NOT NULL,
  remaining integer NOT NULL
);
COMMENT ON TABLE public.feed_reindex_runs IS
  'Heartbeat of feed_reindex_sweep: one row per run, "nothing to do" included; kept 14 days.';
REVOKE ALL ON TABLE public.feed_reindex_runs FROM PUBLIC, anon, authenticated;
GRANT ALL ON TABLE public.feed_reindex_runs TO service_role;
REVOKE ALL ON SEQUENCE public.feed_reindex_runs_id_seq FROM PUBLIC, anon, authenticated;
GRANT USAGE, SELECT ON SEQUENCE public.feed_reindex_runs_id_seq TO service_role;
ALTER TABLE public.feed_reindex_runs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "feed_reindex_runs_no_client_access" ON public.feed_reindex_runs
  FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);

CREATE TABLE public.feed_index_check_runs (
  id     bigserial PRIMARY KEY,
  ran_at timestamptz NOT NULL DEFAULT now(),
  result jsonb NOT NULL
);
COMMENT ON TABLE public.feed_index_check_runs IS
  'Heartbeat and counts of the daily feed_index_check_sweep (counts only, no listing id); kept 60 days.';
REVOKE ALL ON TABLE public.feed_index_check_runs FROM PUBLIC, anon, authenticated;
GRANT ALL ON TABLE public.feed_index_check_runs TO service_role;
REVOKE ALL ON SEQUENCE public.feed_index_check_runs_id_seq FROM PUBLIC, anon, authenticated;
GRANT USAGE, SELECT ON SEQUENCE public.feed_index_check_runs_id_seq TO service_role;
ALTER TABLE public.feed_index_check_runs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "feed_index_check_runs_no_client_access" ON public.feed_index_check_runs
  FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);

-- The drain wakes when listings are queued and stops when the queue is empty. One advisory lock orders
-- a wake against the drain's last look at the queue, so a queued listing is never left without a drain.
CREATE FUNCTION public.feed_reindex_wake()
RETURNS void
LANGUAGE plpgsql
VOLATILE SECURITY DEFINER
SET search_path TO 'public'
AS $fn$
BEGIN
  PERFORM pg_advisory_xact_lock(hashtext('public.feed_reindex_queue'));
  PERFORM cron.schedule('feed-reindex-drain', '* * * * *', 'SELECT public.feed_reindex_sweep(500)');
END $fn$;
REVOKE ALL ON FUNCTION public.feed_reindex_wake() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.feed_reindex_wake() TO service_role;

CREATE FUNCTION public.feed_reindex_enqueue_categories(p_category_ids uuid[])
RETURNS integer
LANGUAGE plpgsql
VOLATILE SECURITY DEFINER
SET search_path TO 'public'
AS $fn$
DECLARE
  v_n integer := 0;
BEGIN
  WITH RECURSIVE sub(id) AS (
    SELECT u.id FROM unnest(p_category_ids) AS u(id) WHERE u.id IS NOT NULL
    UNION
    SELECT t.child_id
      FROM sub s
      JOIN public.category_tree_pointers t ON t.parent_id = s.id
  )
  INSERT INTO public.feed_reindex_queue (listing_id)
  SELECT l.id
    FROM public.listings l
   WHERE l.status = 'active'
     AND l.category_id IN (SELECT id FROM sub)
  ON CONFLICT (listing_id) DO NOTHING;
  GET DIAGNOSTICS v_n = ROW_COUNT;
  IF v_n > 0 THEN
    PERFORM public.feed_reindex_wake();
  END IF;
  RETURN v_n;
END $fn$;
REVOKE ALL ON FUNCTION public.feed_reindex_enqueue_categories(uuid[]) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.feed_reindex_enqueue_categories(uuid[]) TO service_role;

CREATE FUNCTION public.feed_reindex_enqueue_places(p_location_ids uuid[])
RETURNS integer
LANGUAGE plpgsql
VOLATILE SECURITY DEFINER
SET search_path TO 'public'
AS $fn$
DECLARE
  v_n integer := 0;
BEGIN
  WITH RECURSIVE sub(id) AS (
    SELECT u.id FROM unnest(p_location_ids) AS u(id) WHERE u.id IS NOT NULL
    UNION
    SELECT l.id
      FROM sub s
      JOIN public.locations l ON l.parent_id = s.id
  )
  INSERT INTO public.feed_reindex_queue (listing_id)
  SELECT l.id
    FROM public.listings l
   WHERE l.status = 'active'
     AND l.location_id IN (SELECT id FROM sub)
  UNION
  SELECT l.id
    FROM public.listing_locations ll
    JOIN public.listings l ON l.id = ll.listing_id
   WHERE l.status = 'active'
     AND ll.location_id IN (SELECT id FROM sub)
  ON CONFLICT (listing_id) DO NOTHING;
  GET DIAGNOSTICS v_n = ROW_COUNT;
  IF v_n > 0 THEN
    PERFORM public.feed_reindex_wake();
  END IF;
  RETURN v_n;
END $fn$;
REVOKE ALL ON FUNCTION public.feed_reindex_enqueue_places(uuid[]) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.feed_reindex_enqueue_places(uuid[]) TO service_role;

CREATE FUNCTION public.feed_reindex_on_pointer_insert()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $fn$
BEGIN
  PERFORM public.feed_reindex_enqueue_categories(ARRAY(SELECT DISTINCT n.child_id FROM new_rows n));
  RETURN NULL;
END $fn$;
REVOKE ALL ON FUNCTION public.feed_reindex_on_pointer_insert() FROM PUBLIC, anon, authenticated;
CREATE TRIGGER feed_reindex_on_pointer_insert
  AFTER INSERT ON public.category_tree_pointers
  REFERENCING NEW TABLE AS new_rows
  FOR EACH STATEMENT EXECUTE FUNCTION public.feed_reindex_on_pointer_insert();

CREATE FUNCTION public.feed_reindex_on_pointer_delete()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $fn$
BEGIN
  PERFORM public.feed_reindex_enqueue_categories(ARRAY(SELECT DISTINCT o.child_id FROM old_rows o));
  RETURN NULL;
END $fn$;
REVOKE ALL ON FUNCTION public.feed_reindex_on_pointer_delete() FROM PUBLIC, anon, authenticated;
CREATE TRIGGER feed_reindex_on_pointer_delete
  AFTER DELETE ON public.category_tree_pointers
  REFERENCING OLD TABLE AS old_rows
  FOR EACH STATEMENT EXECUTE FUNCTION public.feed_reindex_on_pointer_delete();

CREATE FUNCTION public.feed_reindex_on_pointer_update()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $fn$
BEGIN
  PERFORM public.feed_reindex_enqueue_categories(ARRAY(
    SELECT n.child_id
      FROM new_rows n
      JOIN old_rows o ON o.id = n.id
     WHERE (o.parent_id, o.child_id) IS DISTINCT FROM (n.parent_id, n.child_id)
    UNION
    SELECT o.child_id
      FROM old_rows o
      JOIN new_rows n ON n.id = o.id
     WHERE (o.parent_id, o.child_id) IS DISTINCT FROM (n.parent_id, n.child_id)));
  RETURN NULL;
END $fn$;
REVOKE ALL ON FUNCTION public.feed_reindex_on_pointer_update() FROM PUBLIC, anon, authenticated;
CREATE TRIGGER feed_reindex_on_pointer_update
  AFTER UPDATE ON public.category_tree_pointers
  REFERENCING OLD TABLE AS old_rows NEW TABLE AS new_rows
  FOR EACH STATEMENT EXECUTE FUNCTION public.feed_reindex_on_pointer_update();

CREATE FUNCTION public.feed_reindex_on_place_move()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $fn$
DECLARE
  v_moved uuid[];
BEGIN
  v_moved := ARRAY(
    SELECT n.id
      FROM new_rows n
      JOIN old_rows o ON o.id = n.id
     WHERE o.parent_id IS DISTINCT FROM n.parent_id);
  IF cardinality(v_moved) > 0 THEN
    PERFORM public.feed_reindex_enqueue_places(v_moved);
  END IF;
  RETURN NULL;
END $fn$;
REVOKE ALL ON FUNCTION public.feed_reindex_on_place_move() FROM PUBLIC, anon, authenticated;
CREATE TRIGGER feed_reindex_on_place_move
  AFTER UPDATE ON public.locations
  REFERENCING OLD TABLE AS old_rows NEW TABLE AS new_rows
  FOR EACH STATEMENT EXECUTE FUNCTION public.feed_reindex_on_place_move();

CREATE FUNCTION public.feed_reindex_sweep(p_limit integer DEFAULT 500)
RETURNS integer
LANGUAGE plpgsql
VOLATILE SECURITY DEFINER
SET search_path TO 'public'
AS $fn$
DECLARE
  v_ids  uuid[];
  v_id   uuid;
  v_left integer;
BEGIN
  IF p_limit IS NULL OR p_limit < 1 THEN
    RAISE EXCEPTION 'feed_reindex_sweep: the limit must be a positive number';
  END IF;
  v_ids := ARRAY(
    SELECT q.listing_id
      FROM public.feed_reindex_queue q
     ORDER BY q.queued_at, q.listing_id
     LIMIT p_limit
       FOR UPDATE SKIP LOCKED);
  FOREACH v_id IN ARRAY v_ids LOOP
    PERFORM public.feed_index_refresh(v_id);
  END LOOP;
  DELETE FROM public.feed_reindex_queue WHERE listing_id = ANY (v_ids);
  PERFORM pg_advisory_xact_lock(hashtext('public.feed_reindex_queue'));
  SELECT count(*) INTO v_left FROM public.feed_reindex_queue;
  INSERT INTO public.feed_reindex_runs (refreshed, remaining) VALUES (cardinality(v_ids), v_left);
  DELETE FROM public.feed_reindex_runs WHERE ran_at < now() - interval '14 days';
  IF v_left = 0 AND EXISTS (SELECT 1 FROM cron.job j WHERE j.jobname = 'feed-reindex-drain') THEN
    PERFORM cron.unschedule('feed-reindex-drain');
  END IF;
  RETURN cardinality(v_ids);
END $fn$;
REVOKE ALL ON FUNCTION public.feed_reindex_sweep(integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.feed_reindex_sweep(integer) TO service_role;

CREATE FUNCTION public.feed_index_check_sweep()
RETURNS jsonb
LANGUAGE plpgsql
VOLATILE SECURITY DEFINER
SET search_path TO 'public'
AS $fn$
DECLARE
  v_result jsonb;
BEGIN
  v_result := public.feed_index_check(NULL)
              || jsonb_build_object('queued', (SELECT count(*) FROM public.feed_reindex_queue));
  INSERT INTO public.feed_index_check_runs (result) VALUES (v_result);
  DELETE FROM public.feed_index_check_runs WHERE ran_at < now() - interval '60 days';
  -- A queue that still holds rows is woken again (its drain stops only when the queue is empty).
  IF (v_result->>'queued')::int > 0 THEN
    PERFORM public.feed_reindex_wake();
  END IF;
  RETURN v_result;
END $fn$;
REVOKE ALL ON FUNCTION public.feed_index_check_sweep() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.feed_index_check_sweep() TO service_role;

-- 7. Rewrite every active listing's rows with its tier, and check, on one state.
DO $backfill$
DECLARE
  v_check jsonb;
BEGIN
  LOCK TABLE public.listings, public.listing_locations, public.category_tree_pointers, public.locations IN SHARE MODE;
  PERFORM public.feed_index_refresh(l.id) FROM public.listings l WHERE l.status = 'active';
  v_check := public.feed_index_check(NULL);
  IF (v_check->>'active_without_rows')::int <> 0
     OR (v_check->>'rows_for_inactive')::int <> 0
     OR (v_check->>'listings_with_wrong_rows')::int <> 0 THEN
    RAISE EXCEPTION 'E2a backfill check failed: %', v_check;
  END IF;
END $backfill$;

-- 8. Schedules: the check daily. The drain has no standing schedule: feed_reindex_wake starts it.
DO $cron$
BEGIN
  IF EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'feed-index-check') THEN
    PERFORM cron.unschedule('feed-index-check');
  END IF;
  PERFORM cron.schedule('feed-index-check', '53 3 * * *', 'SELECT public.feed_index_check_sweep()');
END $cron$;

-- 9. Proofs. Behaviour on listings is proven by e2e/feed-index.spec.ts (a proof cannot create a listing:
--    listings.seller_id references auth.users). These prove the rank, the wiring and the privileges.
DO $proof$
DECLARE
  v_role text;
  v_priv text;
  v_fn   text;
  v_tab  text;
  v_n    integer;
  v_runs integer;
  v_res  jsonb;
BEGIN
  -- P1: the rank of each tier, and an unknown tier is refused.
  IF public.feed_tier_rank('premium') <> 2 OR public.feed_tier_rank('featured') <> 1
     OR public.feed_tier_rank('regular') <> 0 THEN
    RAISE EXCEPTION 'E2a P1: the tier ranks differ';
  END IF;
  BEGIN
    PERFORM public.feed_tier_rank('gold');
    RAISE EXCEPTION 'E2a P1: an unknown tier was ranked';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM NOT LIKE 'feed_tier_rank: unknown tier%' THEN
      RAISE;
    END IF;
  END;

  -- P2: the nine triggers are in place and enabled.
  SELECT count(*) INTO v_n
    FROM pg_trigger t
   WHERE NOT t.tgisinternal AND t.tgenabled = 'O'
     AND (t.tgrelid, t.tgname) IN (
       ('public.listings'::regclass, 'feed_index_on_listing_insert'),
       ('public.listings'::regclass, 'feed_index_on_listing_update'),
       ('public.listing_locations'::regclass, 'feed_index_on_place_insert'),
       ('public.listing_locations'::regclass, 'feed_index_on_place_delete'),
       ('public.listing_locations'::regclass, 'feed_index_on_place_update'),
       ('public.category_tree_pointers'::regclass, 'feed_reindex_on_pointer_insert'),
       ('public.category_tree_pointers'::regclass, 'feed_reindex_on_pointer_delete'),
       ('public.category_tree_pointers'::regclass, 'feed_reindex_on_pointer_update'),
       ('public.locations'::regclass, 'feed_reindex_on_place_move'));
  IF v_n <> 9 THEN
    RAISE EXCEPTION 'E2a P2: % of the nine triggers are in place', v_n;
  END IF;

  -- P3: the daily check is scheduled; the standing sweep schedule of version 2 does not exist.
  IF NOT EXISTS (SELECT 1 FROM cron.job j WHERE j.jobname = 'feed-index-check' AND j.schedule = '53 3 * * *') THEN
    RAISE EXCEPTION 'E2a P3: the daily check is not scheduled';
  END IF;
  IF EXISTS (SELECT 1 FROM cron.job j WHERE j.jobname = 'feed-reindex-sweep') THEN
    RAISE EXCEPTION 'E2a P3: a standing sweep schedule exists';
  END IF;

  -- P4: a wake schedules the drain; a sweep writes its heartbeat row and stops the drain when the
  -- queue is empty; a check writes its row (all rolled back).
  BEGIN
    PERFORM public.feed_reindex_wake();
    IF NOT EXISTS (SELECT 1 FROM cron.job j WHERE j.jobname = 'feed-reindex-drain' AND j.schedule = '* * * * *') THEN
      RAISE EXCEPTION 'E2a P4: a wake did not schedule the drain';
    END IF;
    SELECT count(*) INTO v_runs FROM public.feed_reindex_runs;
    PERFORM public.feed_reindex_sweep(500);
    IF (SELECT count(*) FROM public.feed_reindex_runs) <> v_runs + 1 THEN
      RAISE EXCEPTION 'E2a P4: the sweep wrote no heartbeat row';
    END IF;
    IF (SELECT count(*) FROM public.feed_reindex_queue) = 0
       AND EXISTS (SELECT 1 FROM cron.job j WHERE j.jobname = 'feed-reindex-drain') THEN
      RAISE EXCEPTION 'E2a P4: the drain kept running on an empty queue';
    END IF;
    IF (SELECT count(*) FROM public.feed_reindex_queue) > 0
       AND NOT EXISTS (SELECT 1 FROM cron.job j WHERE j.jobname = 'feed-reindex-drain') THEN
      RAISE EXCEPTION 'E2a P4: the drain stopped while the queue holds rows';
    END IF;
    BEGIN
      PERFORM public.feed_reindex_sweep(0);
      RAISE EXCEPTION 'E2a P4: a zero limit was accepted';
    EXCEPTION WHEN raise_exception THEN
      IF SQLERRM NOT LIKE 'feed_reindex_sweep: the limit%' THEN
        RAISE;
      END IF;
    END;
    SELECT count(*) INTO v_runs FROM public.feed_index_check_runs;
    v_res := public.feed_index_check_sweep();
    IF NOT (v_res ?& ARRAY['active_listings', 'active_without_published_at', 'active_without_rows',
                           'rows_for_inactive', 'listings_with_wrong_rows', 'queued'])
       OR (SELECT count(*) FROM public.feed_index_check_runs) <> v_runs + 1 THEN
      RAISE EXCEPTION 'E2a P4: the check sweep wrote no complete row';
    END IF;
    RAISE EXCEPTION USING ERRCODE = 'P0099', MESSAGE = 'e2e-mig-feed-e2a-rollback';
  EXCEPTION WHEN SQLSTATE 'P0099' THEN
    IF SQLERRM <> 'e2e-mig-feed-e2a-rollback' THEN
      RAISE;
    END IF;
  END;

  -- P5: the three new tables are closed to the browser roles; the new functions run for service_role only.
  FOREACH v_tab IN ARRAY ARRAY['public.feed_reindex_queue', 'public.feed_reindex_runs', 'public.feed_index_check_runs'] LOOP
    IF NOT (SELECT c.relrowsecurity FROM pg_class c WHERE c.oid = v_tab::regclass) THEN
      RAISE EXCEPTION 'E2a P5: row level security is off on %', v_tab;
    END IF;
    FOREACH v_role IN ARRAY ARRAY['anon', 'authenticated'] LOOP
      FOREACH v_priv IN ARRAY ARRAY['SELECT', 'INSERT', 'UPDATE', 'DELETE'] LOOP
        IF has_table_privilege(v_role, v_tab, v_priv) THEN
          RAISE EXCEPTION 'E2a P5: % holds % on %', v_role, v_priv, v_tab;
        END IF;
      END LOOP;
    END LOOP;
  END LOOP;
  FOREACH v_fn IN ARRAY ARRAY[
    'public.feed_tier_rank(text)', 'public.feed_index_refresh(uuid)', 'public.feed_index_check(uuid)',
    'public.feed_reindex_enqueue_categories(uuid[])', 'public.feed_reindex_enqueue_places(uuid[])',
    'public.feed_reindex_wake()', 'public.feed_reindex_sweep(integer)', 'public.feed_index_check_sweep()'] LOOP
    FOREACH v_role IN ARRAY ARRAY['anon', 'authenticated'] LOOP
      IF has_function_privilege(v_role, v_fn, 'EXECUTE') THEN
        RAISE EXCEPTION 'E2a P5: % can execute %', v_role, v_fn;
      END IF;
    END LOOP;
    IF NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'E2a P5: service_role cannot execute %', v_fn;
    END IF;
  END LOOP;
  FOREACH v_fn IN ARRAY ARRAY[
    'public.feed_index_on_listing_insert()', 'public.feed_index_on_listing_update()',
    'public.feed_index_on_place_insert()', 'public.feed_index_on_place_delete()',
    'public.feed_index_on_place_update()', 'public.feed_reindex_on_pointer_insert()',
    'public.feed_reindex_on_pointer_delete()', 'public.feed_reindex_on_pointer_update()',
    'public.feed_reindex_on_place_move()'] LOOP
    FOREACH v_role IN ARRAY ARRAY['anon', 'authenticated'] LOOP
      IF has_function_privilege(v_role, v_fn, 'EXECUTE') THEN
        RAISE EXCEPTION 'E2a P5: % can execute %', v_role, v_fn;
      END IF;
    END LOOP;
  END LOOP;

  -- P6: header facts of the two redeclared functions are E1's.
  IF NOT EXISTS (SELECT 1 FROM pg_proc p WHERE p.oid = 'public.feed_index_refresh(uuid)'::regprocedure
                  AND p.prosecdef AND p.provolatile = 'v' AND p.proconfig = ARRAY['search_path=public']) THEN
    RAISE EXCEPTION 'E2a P6: feed_index_refresh header facts differ';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_proc p WHERE p.oid = 'public.feed_index_check(uuid)'::regprocedure
                  AND p.prosecdef AND p.provolatile = 's' AND p.proconfig = ARRAY['search_path=public']) THEN
    RAISE EXCEPTION 'E2a P6: feed_index_check header facts differ';
  END IF;
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261009180000') ON CONFLICT (version) DO NOTHING;
