-- e2e-areas: feed, admin-categories, admin-listings

-- Cursor bundle 1, part 1 of 2 — THE FEED ENQUEUERS HOLD THEIR LISTING (INC-1187; brief
-- docs/governance/briefs/cursor-bundle-1.md item 5, census docs/governance/reports/cursor-bundle-1.census.md).
-- feed_reindex_enqueue_listings, feed_reindex_enqueue_categories and feed_reindex_enqueue_places are redeclared
-- WHOLE from their last declarations (live md5 checked). The one change in each: every read of public.listings
-- that feeds the keyed insert takes FOR KEY SHARE OF l (F1-5b's law, INC-786), so a DELETE of the ad waits for the
-- call, or the read finds the ad gone and queues nothing for it, never 23503 on feed_reindex_queue_pkey's
-- listing_id key. feed_reindex_enqueue_places holds a UNION at its top level, where a locking clause is refused:
-- its two listing reads become two CTEs that take the lock, and the insert reads their UNION (the same rows).
-- Service-role bodies: no grant changes (the closers restate them as they stand).

DO $pre$
DECLARE
  v_pairs text[][] := ARRAY[
    ['public.feed_reindex_enqueue_listings(uuid[])', '28b6ccb09d0736cf826f3274fe6ba8b9'],
    ['public.feed_reindex_enqueue_categories(uuid[])', '55d421a866e45ac0066ec541631b9ae0'],
    ['public.feed_reindex_enqueue_places(uuid[])', '6c3e807ef39e8dbf290fe768127ab49f']];
  v_md5  text;
  i      integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261120120300') THEN
    RAISE EXCEPTION 'cursor-bundle-1 part 1: the ledger''s newest mark 20261120120300 must be applied first';
  END IF;
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_pairs[i][1]::regprocedure;
    IF v_md5 IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'cursor-bundle-1 part 1: the live % is not its last declaration''s body (%)', v_pairs[i][1], v_md5;
    END IF;
  END LOOP;
END $pre$;

-- ===== A — feed_reindex_enqueue_listings (redeclared whole from 20261104153313) =====
CREATE OR REPLACE FUNCTION public.feed_reindex_enqueue_listings(p_listing_ids uuid[])
RETURNS integer
LANGUAGE plpgsql
VOLATILE SECURITY DEFINER
SET search_path TO 'public'
AS $fn$
DECLARE
  v_n integer := 0;
BEGIN
  INSERT INTO public.feed_reindex_queue (listing_id)
  SELECT l.id
    FROM public.listings l
   WHERE l.status IN ('active', 'sold')
     AND l.id = ANY (p_listing_ids)
     FOR KEY SHARE OF l
  ON CONFLICT (listing_id) DO NOTHING;
  GET DIAGNOSTICS v_n = ROW_COUNT;
  IF v_n > 0 THEN
    PERFORM public.feed_reindex_wake();
  END IF;
  RETURN v_n;
END $fn$;
REVOKE ALL ON FUNCTION public.feed_reindex_enqueue_listings(uuid[]) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.feed_reindex_enqueue_listings(uuid[]) TO service_role;

-- ===== B — feed_reindex_enqueue_categories (redeclared whole from 20261015023155) =====
CREATE OR REPLACE FUNCTION public.feed_reindex_enqueue_categories(p_category_ids uuid[])
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
   WHERE l.status IN ('active', 'sold')
     AND l.category_id IN (SELECT id FROM sub)
     FOR KEY SHARE OF l
  ON CONFLICT (listing_id) DO NOTHING;
  GET DIAGNOSTICS v_n = ROW_COUNT;
  IF v_n > 0 THEN
    PERFORM public.feed_reindex_wake();
  END IF;
  RETURN v_n;
END $fn$;
REVOKE ALL ON FUNCTION public.feed_reindex_enqueue_categories(uuid[]) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.feed_reindex_enqueue_categories(uuid[]) TO service_role;

-- ===== C — feed_reindex_enqueue_places (redeclared whole from 20261015023155; the two arms are CTEs) =====
CREATE OR REPLACE FUNCTION public.feed_reindex_enqueue_places(p_location_ids uuid[])
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
  ),
  held_here AS (
    SELECT l.id
      FROM public.listings l
     WHERE l.status IN ('active', 'sold')
       AND l.location_id IN (SELECT id FROM sub)
       FOR KEY SHARE OF l
  ),
  held_listed AS (
    SELECT l.id
      FROM public.listing_locations ll
      JOIN public.listings l ON l.id = ll.listing_id
     WHERE l.status IN ('active', 'sold')
       AND ll.location_id IN (SELECT id FROM sub)
       FOR KEY SHARE OF l
  )
  INSERT INTO public.feed_reindex_queue (listing_id)
  SELECT h.id FROM held_here h
  UNION
  SELECT h.id FROM held_listed h
  ON CONFLICT (listing_id) DO NOTHING;
  GET DIAGNOSTICS v_n = ROW_COUNT;
  IF v_n > 0 THEN
    PERFORM public.feed_reindex_wake();
  END IF;
  RETURN v_n;
END $fn$;
REVOKE ALL ON FUNCTION public.feed_reindex_enqueue_places(uuid[]) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.feed_reindex_enqueue_places(uuid[]) TO service_role;

-- Proof: catalog facts (header, return type, grants, the body as this file declares it, every listing read held),
-- then the calls on scratch rows under a sentinel rollback. A proof runs in one session, so the concurrent DELETE
-- itself is not staged here: the held read is proven by the body (its FOR KEY SHARE OF l, once per listing read)
-- and a gone ad by its answer: no error and no queue row for it.
DO $proof$
DECLARE
  v_hex     text := replace(gen_random_uuid()::text, '-', '');
  v_tag     text;
  -- 'XZ': a scratch code no market holds, as earlier proofs' (K4: a recorded proof exception)
  v_code    character(2) := 'XZ';
  v_lang    text := public.language_code('base');
  v_a       uuid := gen_random_uuid();
  v_al      uuid := gen_random_uuid();
  v_none    uuid := gen_random_uuid();
  v_anc     uuid;
  v_region  uuid;
  v_city    uuid;
  v_city2   uuid;
  v_cat     uuid;
  v_n       integer;
  v_msg     text;
  v_fn      regprocedure;
  v_pairs   text[][];
  i         integer;
BEGIN
  v_pairs := ARRAY[
    ['public.feed_reindex_enqueue_listings(uuid[])', 'bb34f140e16803d5f2fb62eeb283908f', '1'], -- new md5: feed_reindex_enqueue_listings
    ['public.feed_reindex_enqueue_categories(uuid[])', '6a9604372d2f1b3f6374a0bbdf4e27b7', '1'], -- new md5: feed_reindex_enqueue_categories
    ['public.feed_reindex_enqueue_places(uuid[])', '49b86d1bc95feec03c3658472a096462', '2']]; -- new md5: feed_reindex_enqueue_places
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    v_fn := v_pairs[i][1]::regprocedure;
    IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}'
               OR prorettype <> 'integer'::regtype FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR has_function_privilege('authenticated', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'cursor-bundle-1 part 1 proof (a): %''s header, return type or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'cursor-bundle-1 part 1 proof (a): %''s body differs from this file', v_fn;
    END IF;
    -- every read of public.listings that feeds the insert is held: one lock per listing read.
    IF (SELECT (length(replace(p.prosrc, chr(13), '')) - length(replace(replace(p.prosrc, chr(13), ''), 'FOR KEY SHARE OF l', '')))
               / length('FOR KEY SHARE OF l') <> v_pairs[i][3]::integer FROM pg_proc p WHERE p.oid = v_fn) THEN
      RAISE EXCEPTION 'cursor-bundle-1 part 1 proof (a): %''s listing reads are not all held', v_fn;
    END IF;
  END LOOP;

  v_tag := 'e2e-mig-cb1-' || substr(v_hex, 1, 10);
  BEGIN
    PERFORM set_config('request.jwt.claims', '{}', true);
    IF EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
      RAISE EXCEPTION 'cursor-bundle-1 part 1 proof: scratch code % already exists', v_code;
    END IF;
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_code, v_tag, true);
    SELECT a.id INTO v_anc FROM public.locations a WHERE a.country_code = v_code AND a.level = 'country' AND a.name_en = v_tag
     AND a.name_en LIKE 'e2e-mig-%';
    IF v_anc IS NULL THEN RAISE EXCEPTION 'cursor-bundle-1 part 1 proof: the scratch market has no anchor'; END IF;
    UPDATE public.locations SET is_active = true WHERE id = v_anc AND name_en = v_tag AND name_en LIKE 'e2e-mig-%';
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id)
    VALUES ('region', v_code, v_tag || ' region', v_tag || '-r', true, v_anc) RETURNING id INTO v_region;
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id, center_lat, center_lng)
    VALUES ('city', v_code, v_tag || ' city', v_tag || '-c', true, v_region, 9.03, 38.74) RETURNING id INTO v_city;
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id, center_lat, center_lng)
    VALUES ('city', v_code, v_tag || ' city 2', v_tag || '-d', true, v_region, 9.04, 38.75) RETURNING id INTO v_city2;
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
      (v_a, v_tag || '-a@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO public.legal_acceptances (user_id, version_id, language, method)
    SELECT v_a, v.id, v_lang, 'e2e-mig' FROM public.legal_versions v
     WHERE v.status = 'published' AND v.effective_at <= now();
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES (v_tag || ' leaf', v_tag, true, true, true, 9999) RETURNING id INTO v_cat;
    INSERT INTO public.listings (id, seller_id, category_id, location_id, title, description, home_country_code, status,
                                 published_at, published_first_at, expires_at)
    VALUES (v_al, v_a, v_cat, v_city, v_tag || ' al', 'scratch', v_code, 'active',
            now(), now(), now() + interval '10 days');
    INSERT INTO public.listing_locations (listing_id, location_id) VALUES (v_al, v_city2);

    -- (b) a live ad is queued by each enqueuer once: by its id, by its category, by its place and by its listed place.
    DELETE FROM public.feed_reindex_queue WHERE listing_id = v_al;
    v_n := public.feed_reindex_enqueue_listings(ARRAY[v_al, v_none]);
    IF v_n IS DISTINCT FROM 1 OR NOT EXISTS (SELECT 1 FROM public.feed_reindex_queue WHERE listing_id = v_al) THEN
      RAISE EXCEPTION 'cursor-bundle-1 part 1 proof (b): the id enqueuer did not queue the live ad (%)', v_n;
    END IF;
    DELETE FROM public.feed_reindex_queue WHERE listing_id = v_al;
    v_n := public.feed_reindex_enqueue_categories(ARRAY[v_cat, v_none]);
    IF v_n IS DISTINCT FROM 1 OR NOT EXISTS (SELECT 1 FROM public.feed_reindex_queue WHERE listing_id = v_al) THEN
      RAISE EXCEPTION 'cursor-bundle-1 part 1 proof (b): the category enqueuer did not queue the live ad (%)', v_n;
    END IF;
    DELETE FROM public.feed_reindex_queue WHERE listing_id = v_al;
    v_n := public.feed_reindex_enqueue_places(ARRAY[v_city, v_none]);
    IF v_n IS DISTINCT FROM 1 OR NOT EXISTS (SELECT 1 FROM public.feed_reindex_queue WHERE listing_id = v_al) THEN
      RAISE EXCEPTION 'cursor-bundle-1 part 1 proof (b): the place enqueuer did not queue the ad by its place (%)', v_n;
    END IF;
    DELETE FROM public.feed_reindex_queue WHERE listing_id = v_al;
    v_n := public.feed_reindex_enqueue_places(ARRAY[v_city2]);
    IF v_n IS DISTINCT FROM 1 OR NOT EXISTS (SELECT 1 FROM public.feed_reindex_queue WHERE listing_id = v_al) THEN
      RAISE EXCEPTION 'cursor-bundle-1 part 1 proof (b): the place enqueuer did not queue the ad by its listed place (%)', v_n;
    END IF;
    -- a place both arms reach queues the ad once (the UNION), and a second call queues nothing new.
    DELETE FROM public.feed_reindex_queue WHERE listing_id = v_al;
    v_n := public.feed_reindex_enqueue_places(ARRAY[v_city, v_city2]);
    IF v_n IS DISTINCT FROM 1 THEN
      RAISE EXCEPTION 'cursor-bundle-1 part 1 proof (b): both arms did not queue the ad once (%)', v_n;
    END IF;
    v_n := public.feed_reindex_enqueue_listings(ARRAY[v_al]);
    IF v_n IS DISTINCT FROM 0 THEN
      RAISE EXCEPTION 'cursor-bundle-1 part 1 proof (b): a queued ad was queued again (%)', v_n;
    END IF;

    -- (c) the ad is gone: each enqueuer answers 0, raises nothing, and no queue row stands for it.
    DELETE FROM public.listings WHERE id = v_al AND seller_id = v_a;
    IF EXISTS (SELECT 1 FROM public.listings WHERE id = v_al) THEN
      RAISE EXCEPTION 'cursor-bundle-1 part 1 proof (c): the scratch ad was not deleted';
    END IF;
    v_n := public.feed_reindex_enqueue_listings(ARRAY[v_al]);
    IF v_n IS DISTINCT FROM 0 THEN
      RAISE EXCEPTION 'cursor-bundle-1 part 1 proof (c): the id enqueuer queued a gone ad (%)', v_n;
    END IF;
    v_n := public.feed_reindex_enqueue_categories(ARRAY[v_cat]);
    IF v_n IS DISTINCT FROM 0 THEN
      RAISE EXCEPTION 'cursor-bundle-1 part 1 proof (c): the category enqueuer queued a gone ad (%)', v_n;
    END IF;
    v_n := public.feed_reindex_enqueue_places(ARRAY[v_city, v_city2]);
    IF v_n IS DISTINCT FROM 0 THEN
      RAISE EXCEPTION 'cursor-bundle-1 part 1 proof (c): the place enqueuer queued a gone ad (%)', v_n;
    END IF;
    IF EXISTS (SELECT 1 FROM public.feed_reindex_queue WHERE listing_id = v_al) THEN
      RAISE EXCEPTION 'cursor-bundle-1 part 1 proof (c): a gone ad kept a queue row';
    END IF;

    RAISE EXCEPTION 'cursor-bundle-1-part-1-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'cursor-bundle-1-part-1-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261121160000') ON CONFLICT DO NOTHING;
