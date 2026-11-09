-- e2e-areas: feed, ad-page, admin-monetisation
-- P-2 turn (c) M-3c-a, part 1 of 6 — THE CARD LOOK PRECOMPUTED INTO THE FEED INDEX: THE CACHE (docs/governance/
-- briefs/p2-fold-c2a-ruling-2.md §1–§3, DEC-352). Ruling 2's five parts, its first split again by concern (rule 30:
-- about 25 KB a file): this cache, then its keepers (part 2), then the feed, the seller's page, the saved page and
-- the ad page, each reading the look from the index row it already reads.
--   A. public.feed_index gains placement (text NULL, CHECK standard | boost | top) and badge (boolean NULL), no
--      defaults: the card look of the ad's level, as level_perks_for answers it for the ad's category and its
--      location's country; NULL perks (a level unknown or switched off) write NULL axes.
--   B. feed_index_refresh redeclared WHOLE from 20261104153313 (f5c8063d) :119 (md5
--      cdf73a660fc0341833c86db338250961, checked live below): its first read joins the location for its country
--      (the row set_listing_level reads), and one level_perks_for call a refresh gives the two axes it writes into
--      every row it inserts. Nothing else in it changes.
--   C. The rows already in the index take their ads' look once, set-based (the refresh's read).
-- Proofs at the end on scratch rows (market XZ, currency XTS, e2e_mig_ keys), rolled back by the sentinel.

DO $pre$
DECLARE
  v_md5 text;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261107140500') THEN
    RAISE EXCEPTION 'P-2 (c) M-3c-a part 1: M-3b''s last part (mark 20261107140500) must be applied first';
  END IF;
  -- G39: the body this file redeclares is, live, the body of its last declaration.
  SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p
   WHERE p.oid = 'public.feed_index_refresh(uuid)'::regprocedure;
  IF v_md5 IS DISTINCT FROM 'cdf73a660fc0341833c86db338250961' THEN
    RAISE EXCEPTION 'P-2 (c) M-3c-a part 1: live feed_index_refresh is not 20261104153313''s body (%)', v_md5;
  END IF;
END $pre$;

-- ------------------------------------------------------------ A. THE TWO COLUMNS
ALTER TABLE public.feed_index
  ADD COLUMN placement text NULL
    CONSTRAINT feed_index_placement_check CHECK (placement IS NULL OR placement IN ('standard', 'boost', 'top')),
  ADD COLUMN badge boolean NULL;
COMMENT ON COLUMN public.feed_index.placement IS
  'The card look''s placement of the ad''s level (standard, boost, top), as level_perks_for answers it for the ad''s category and its location''s country; NULL for a level unknown or switched off. Written only by feed_index_refresh; compared by feed_index_check (P-2 (c), DEC-352).';
COMMENT ON COLUMN public.feed_index.badge IS
  'The card look''s badge of the ad''s level, as level_perks_for answers it for the ad''s category and its location''s country; NULL for a level unknown or switched off. Written only by feed_index_refresh; compared by feed_index_check (P-2 (c), DEC-352).';

-- ------------------------------------------------------------ B. THE WRITER
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
  v_sold_at     timestamptz;
  v_rank        smallint;
  v_country     character(2);
  v_perks       jsonb;
  v_n           integer := 0;
BEGIN
  -- The listing's row lock serialises two refreshes of the same listing.
  -- P-2 (a), DEC-341 — the level's feed rank is a row of level_ranks, read here with the status.
  -- P-2 (c) M-3c-a (DEC-352) — and the location's country (the row set_listing_level reads), for the look.
  SELECT l.status, l.published_at, l.category_id, l.location_id, l.tier, l.sold_at, r.feed_rank, loc.country_code
    INTO v_status, v_published, v_category_id, v_location_id, v_tier, v_sold_at, v_rank, v_country
    FROM public.listings l
    LEFT JOIN public.level_ranks r ON r.key = l.tier
    LEFT JOIN public.locations loc ON loc.id = l.location_id
   WHERE l.id = p_listing_id
     FOR UPDATE OF l;
  DELETE FROM public.feed_index WHERE listing_id = p_listing_id;
  -- Bundle 16 turn 3c (D175 1) — a sold ad stays in the feed for 30 days after it sold, read after the live ones.
  IF v_published IS NULL
     OR NOT (v_status = 'active' OR (v_status = 'sold' AND v_sold_at > (SELECT public.sold_cutoff()))) THEN
    RETURN 0;
  END IF;
  IF v_rank IS NULL THEN
    RAISE EXCEPTION 'feed_index_refresh: no rank for level %', v_tier;
  END IF;
  -- P-2 (c) M-3c-a (DEC-352): the card's look, one level_perks_for call a refresh, for the ad's category and its
  -- location's country; NULL perks write NULL axes.
  v_perks := public.level_perks_for(v_tier, v_category_id, v_country);
  INSERT INTO public.feed_index (category_key, place_key, tier_rank, published_at, listing_id, placement, badge)
  SELECT k.category_key, k.place_key,
         CASE WHEN v_status = 'sold' THEN -1 ELSE v_rank END, v_published, p_listing_id,
         v_perks->>'placement', (v_perks->>'badge')::boolean
    FROM public.feed_keys(
           v_category_id,
           ARRAY[v_location_id] || ARRAY(
             SELECT ll.location_id FROM public.listing_locations ll WHERE ll.listing_id = p_listing_id)) k;
  GET DIAGNOSTICS v_n = ROW_COUNT;
  RETURN v_n;
END $fn$;
REVOKE ALL ON FUNCTION public.feed_index_refresh(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.feed_index_refresh(uuid) TO service_role;

-- ------------------------------------------------------------ C. THE ROWS ALREADY IN THE INDEX, ONCE
-- The refresh's read, set-based: each indexed ad's level, category and location's country (G39: a WHERE).
UPDATE public.feed_index f
   SET placement = w.p->>'placement', badge = (w.p->>'badge')::boolean
  FROM (SELECT l.id, public.level_perks_for(l.tier, l.category_id, loc.country_code) AS p
          FROM public.listings l
          LEFT JOIN public.locations loc ON loc.id = l.location_id
         WHERE EXISTS (SELECT 1 FROM public.feed_index g WHERE g.listing_id = l.id)) w
 WHERE f.listing_id = w.id
   AND (f.placement, f.badge) IS DISTINCT FROM (w.p->>'placement', (w.p->>'badge')::boolean);

-- ------------------------------------------------------------ PROOFS
-- Scratch rows only, rolled back by the sentinel; the only real rows read are the level rows (a derived sort), read
-- only.
--   (a) the columns (types, no default, nullable; the CHECK by name on placement, and it refuses another value);
--       the writer's header and grants, volatile;
--   (b) the writer's body is its last declaration's but for this file's fragments (md5 with the fragments put
--       back);
--   (c) a live ad at a scratch level: its rows carry the resolver's look (standard, no badge); a live ad at a
--       switched-off scratch level: its rows carry NULL axes and are still written.
DO $proof$
DECLARE
  v_tbl     regclass := 'public.feed_index'::regclass;
  v_rf      regprocedure := 'public.feed_index_refresh(uuid)'::regprocedure;
  v_fn      regprocedure;
  v_tag     text := 'e2e-mig-p2c-m3ca1-' || substr(gen_random_uuid()::text, 1, 8);
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
  v_lvoff   text := 'e2e_mig_lookoff_' || v_stem;
  v_b       uuid;
BEGIN
  -- (a)
  IF (SELECT array_agg(a.attname::text || ':' || format_type(a.atttypid, a.atttypmod) || ':' || a.attnotnull::text
                       || ':' || a.atthasdef::text ORDER BY a.attname)
        FROM pg_attribute a WHERE a.attrelid = v_tbl AND a.attname IN ('placement', 'badge') AND NOT a.attisdropped)
     IS DISTINCT FROM ARRAY['badge:boolean:false:false', 'placement:text:false:false'] THEN
    RAISE EXCEPTION 'P-2 (c) M-3c-a part 1 proof (a): feed_index''s two columns differ';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint c
                  WHERE c.conrelid = v_tbl AND c.conname = 'feed_index_placement_check' AND c.contype = 'c'
                    AND c.conkey = ARRAY[(SELECT a.attnum FROM pg_attribute a
                                           WHERE a.attrelid = v_tbl AND a.attname = 'placement')]) THEN
    RAISE EXCEPTION 'P-2 (c) M-3c-a part 1 proof (a): feed_index''s placement CHECK is missing';
  END IF;
  FOREACH v_fn IN ARRAY ARRAY[v_rf] LOOP
    IF (SELECT NOT prosecdef OR proconfig::text <> '{search_path=public}' FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR has_function_privilege('authenticated', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'P-2 (c) M-3c-a part 1 proof (a): the header or the grants of % differ', v_fn;
    END IF;
  END LOOP;
  IF (SELECT provolatile FROM pg_proc WHERE oid = v_rf) <> 'v' THEN
    RAISE EXCEPTION 'P-2 (c) M-3c-a part 1 proof (a): the writer''s volatility differs';
  END IF;

  -- (b) Both sides without chr(13) (INC-1056, law 13): prosrc, and each literal.
  SELECT replace(p.prosrc, chr(13), '') INTO v_src FROM pg_proc p WHERE p.oid = v_rf;
  v_pairs := ARRAY[
    ['  v_rank        smallint;
  v_country     character(2);
  v_perks       jsonb;
',
     '  v_rank        smallint;
'],
    ['  -- P-2 (c) M-3c-a (DEC-352) — and the location''s country (the row set_listing_level reads), for the look.
  SELECT l.status, l.published_at, l.category_id, l.location_id, l.tier, l.sold_at, r.feed_rank, loc.country_code
    INTO v_status, v_published, v_category_id, v_location_id, v_tier, v_sold_at, v_rank, v_country
    FROM public.listings l
    LEFT JOIN public.level_ranks r ON r.key = l.tier
    LEFT JOIN public.locations loc ON loc.id = l.location_id
',
     '  SELECT l.status, l.published_at, l.category_id, l.location_id, l.tier, l.sold_at, r.feed_rank
    INTO v_status, v_published, v_category_id, v_location_id, v_tier, v_sold_at, v_rank
    FROM public.listings l
    LEFT JOIN public.level_ranks r ON r.key = l.tier
'],
    ['  -- P-2 (c) M-3c-a (DEC-352): the card''s look, one level_perks_for call a refresh, for the ad''s category and its
  -- location''s country; NULL perks write NULL axes.
  v_perks := public.level_perks_for(v_tier, v_category_id, v_country);
  INSERT INTO public.feed_index (category_key, place_key, tier_rank, published_at, listing_id, placement, badge)
  SELECT k.category_key, k.place_key,
         CASE WHEN v_status = ''sold'' THEN -1 ELSE v_rank END, v_published, p_listing_id,
         v_perks->>''placement'', (v_perks->>''badge'')::boolean
',
     '  INSERT INTO public.feed_index (category_key, place_key, tier_rank, published_at, listing_id)
  SELECT k.category_key, k.place_key,
         CASE WHEN v_status = ''sold'' THEN -1 ELSE v_rank END, v_published, p_listing_id
']];
  FOREACH v_pair SLICE 1 IN ARRAY v_pairs LOOP
    v_n := (length(v_src) - length(replace(v_src, replace(v_pair[1], chr(13), ''), ''))) / length(replace(v_pair[1], chr(13), ''));
    IF v_n <> 1 THEN
      RAISE EXCEPTION 'P-2 (c) M-3c-a part 1 proof (b): a feed_index_refresh fragment occurs % times', v_n;
    END IF;
    v_src := replace(v_src, replace(v_pair[1], chr(13), ''), replace(v_pair[2], chr(13), ''));
  END LOOP;
  v_md5 := md5(v_src);
  IF v_md5 IS DISTINCT FROM 'cdf73a660fc0341833c86db338250961' THEN
    RAISE EXCEPTION 'P-2 (c) M-3c-a part 1 proof (b): feed_index_refresh differs from its last declaration beyond this file''s fragments (%)', v_md5;
  END IF;

  BEGIN
    -- A scratch market (the INC-949 proof's way).
    IF EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
      RAISE EXCEPTION 'P-2 (c) M-3c-a part 1 proof: the scratch code % already exists', v_code;
    END IF;
    -- ISO 4217 keeps XTS for testing; no market ever prices in it (K4 exception, as 'XZ').
    INSERT INTO public.currencies (code, name_en, minor_units) VALUES (v_cur, 'e2e-mig-p2c-m3ca1', 2);
    INSERT INTO public.countries (code, name_en, is_active, currency_code) VALUES (v_code, 'e2e-mig-p2c-m3ca1', true, v_cur);
    SELECT a.id INTO v_anc FROM public.locations a
     WHERE a.country_code = v_code AND a.level = 'country' AND a.name_en = 'e2e-mig-p2c-m3ca1';
    IF v_anc IS NULL THEN RAISE EXCEPTION 'P-2 (c) M-3c-a part 1 proof: the scratch market has no anchor'; END IF;
    UPDATE public.locations SET is_active = true WHERE id = v_anc AND name_en LIKE 'e2e-mig-p2c-m3ca1%';
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id)
    VALUES ('region', v_code, 'E2E P2c M3ca1 Region', v_tag || '-r', true, v_anc) RETURNING id INTO v_region;
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id, center_lat, center_lng)
    VALUES ('city', v_code, 'E2E P2c M3ca1 City', v_tag || '-c', true, v_region, 9.03, 38.74) RETURNING id INTO v_city;
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at)
    VALUES (v_seller, v_tag || '-seller@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES ('E2E P2c M3ca1 Main', v_tag, true, true, true, 9999) RETURNING id INTO v_cat;
    -- Two levels above every real one (sorts derived, never a real value): lv enabled (standard, no badge), lvoff
    -- switched off (top, badge) — its perks are NULL.
    INSERT INTO public.listing_packages (key, kind, name_en, days, max_photos, placement, badge, enabled, self_serve,
                                         extends_lifetime, sort) VALUES
      (v_lv,    'level', 'E2E P2c look level',     30, 4, 'standard', false, true,  false, false, v_s + 1),
      (v_lvoff, 'level', 'E2E P2c look level off', 30, 4, 'top',      true,  false, false, false, v_s + 2);
    -- A live ad at each (staff marks: no end); the insert trigger writes their rows through the writer.
    INSERT INTO public.listings (seller_id, category_id, location_id, title, description, home_country_code,
                                 status, published_at, published_first_at, expires_at, tier, tier_source)
    VALUES (v_seller, v_cat, v_city, 'E2E P2c M3ca1 a', 'scratch', v_code, 'active', now(), now(), now() + interval '10 days',
            v_lv, 'staff')
    RETURNING id INTO v_a;
    INSERT INTO public.listings (seller_id, category_id, location_id, title, description, home_country_code,
                                 status, published_at, published_first_at, expires_at, tier, tier_source)
    VALUES (v_seller, v_cat, v_city, 'E2E P2c M3ca1 b', 'scratch', v_code, 'active', now(), now(), now() + interval '10 days',
            v_lvoff, 'staff')
    RETURNING id INTO v_b;

    -- (c) The resolver's answers read into variables (CF-PROOF-1), then compared with the rows.
    v_perks := public.level_perks_for(v_lv, v_cat, v_code);
    SELECT count(*), count(*) FILTER (WHERE (f.placement, f.badge)
                                            IS DISTINCT FROM (v_perks->>'placement', (v_perks->>'badge')::boolean))
      INTO v_rows, v_wrong
      FROM public.feed_index f WHERE f.listing_id = v_a;
    IF v_perks IS NULL OR v_perks->>'placement' IS DISTINCT FROM 'standard' OR v_perks->'badge' IS DISTINCT FROM 'false'::jsonb
       OR v_rows = 0 OR v_wrong <> 0 THEN
      RAISE EXCEPTION 'P-2 (c) M-3c-a part 1 proof (c): the ad''s rows (% of %) do not carry the look %', v_wrong, v_rows, v_perks;
    END IF;
    v_perks := public.level_perks_for(v_lvoff, v_cat, v_code);
    SELECT count(*), count(*) FILTER (WHERE f.placement IS NOT NULL OR f.badge IS NOT NULL)
      INTO v_rows, v_wrong
      FROM public.feed_index f WHERE f.listing_id = v_b;
    IF v_perks IS NOT NULL OR v_rows = 0 OR v_wrong <> 0 THEN
      RAISE EXCEPTION 'P-2 (c) M-3c-a part 1 proof (c): the switched-off level''s ad rows (% of %) do not carry NULL axes', v_wrong, v_rows;
    END IF;

    -- (a) The CHECK refuses another placement.
    BEGIN
      UPDATE public.feed_index SET placement = 'e2e-other' WHERE listing_id = v_a;
      RAISE EXCEPTION 'P-2 (c) M-3c-a part 1 proof (a): feed_index took a placement outside the three';
    EXCEPTION WHEN check_violation THEN
      NULL;
    END;

    RAISE EXCEPTION 'p2c-m3ca1-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2c-m3ca1-proof-ok' THEN RAISE; END IF;
  END;
  IF EXISTS (SELECT 1 FROM auth.users WHERE id = v_seller AND email LIKE 'e2e-mig-%')
     OR EXISTS (SELECT 1 FROM public.listing_packages WHERE key IN (v_lv, v_lvoff)) THEN
    RAISE EXCEPTION 'P-2 (c) M-3c-a part 1 proof: the scratch rows outlived the sentinel';
  END IF;
END;
$proof$;

-- ------------------------------------------------------------ CLOSERS
REVOKE ALL ON FUNCTION public.feed_index_refresh(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.feed_index_refresh(uuid) TO service_role;

INSERT INTO public.migration_marks (version) VALUES ('20261108090000') ON CONFLICT DO NOTHING;
