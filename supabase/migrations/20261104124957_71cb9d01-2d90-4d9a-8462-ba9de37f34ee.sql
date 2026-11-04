-- e2e-areas: my-listings, admin-listings, ad-page, feed, posting, admin-monetisation
-- P-2 (a) M-1a, part 1 of 2 — the ad's designation: the columns, the baseline flag, the dial
-- (docs/governance/briefs/p2-level-reach-plan.md §1 and §8; ruling 1: Q1 the column stays `tier`,
-- Q6 the baseline is a flag on the level row, Q8 the level's days are the designation's clock, the
-- dial `('promote', 10, 3600)` — DEC-329). Part 2 (the next file) is the pause: the status and
-- transition_listing redeclared. Split by concern for size (rule 30).
--
-- 1. public.listings gains the designation's two dials, each with its own end and source:
--    tier_until, tier_source (money | credits | staff | launch), reach (a listing_packages key of kind
--    reach; NULL = the market's included reach — a typed absence, read through market_settings by
--    its readers, never a default), reach_until, reach_source. `tier` gains a foreign key to
--    listing_packages(key) ON UPDATE CASCADE (levels are rows) and loses the P-1 literal check
--    listings_tier_check, which the key replaces. CHECKs: an end needs a source; a source other than
--    staff needs an end; reach and its source come together. Two partial indexes serve the sweep
--    (tier_until, reach_until, where set).
-- 2. public.listing_packages gains `is_baseline` (exactly one level row; seeded on `regular`), the
--    browser roles' column grant restated with it; public.baseline_level_key() reads it (born closed;
--    the doors and the state machine call it; it raises when no level is the baseline).
-- 3. The rate dial row `promote` (10 an hour per caller) for the seller doors of M-1b.
-- Proofs at the end (one DO block, scratch rows only, rolled back by a sentinel): the structure, the
-- privileges, the baseline's one row and its reader, the dial row, and the CHECKs and the foreign key
-- refusing bad rows.

-- ------------------------------------------------------------ 1. THE COLUMNS
DO $pre$
DECLARE
  v_bad text;
BEGIN
  -- Every tier a listing holds is a level row before the foreign key lands (the one catalogue read).
  SELECT string_agg(DISTINCT l.tier, ', ') INTO v_bad
    FROM public.listings l
   WHERE NOT EXISTS (SELECT 1 FROM public.listing_packages k WHERE k.key = l.tier AND k.kind = 'level');
  IF v_bad IS NOT NULL THEN
    RAISE EXCEPTION 'P-2 M-1a: listings hold a tier with no level row (%)', v_bad;
  END IF;
END $pre$;

-- The P-1 literal check on tier (20260804213701: premium | featured | regular) gives way to the
-- foreign key: a level is a row, and a row staff add in the console (admin_save_listing_package,
-- M-a) must be assignable. The foreign key refuses what the check refused and nothing a row allows.
ALTER TABLE public.listings DROP CONSTRAINT IF EXISTS listings_tier_check;
ALTER TABLE public.listings
  ADD COLUMN tier_until   timestamptz NULL,
  ADD COLUMN tier_source  text NULL CHECK (tier_source IS NULL OR tier_source IN ('money', 'credits', 'staff', 'launch')),
  ADD COLUMN reach        text NULL REFERENCES public.listing_packages(key) ON UPDATE CASCADE,
  ADD COLUMN reach_until  timestamptz NULL,
  ADD COLUMN reach_source text NULL CHECK (reach_source IS NULL OR reach_source IN ('money', 'credits', 'staff', 'launch')),
  ADD CONSTRAINT listings_tier_fkey FOREIGN KEY (tier) REFERENCES public.listing_packages(key) ON UPDATE CASCADE,
  ADD CONSTRAINT listings_tier_end_has_source_check  CHECK (tier_until IS NULL OR tier_source IS NOT NULL),
  ADD CONSTRAINT listings_tier_source_has_end_check  CHECK (tier_source IS NULL OR tier_source = 'staff' OR tier_until IS NOT NULL),
  ADD CONSTRAINT listings_reach_with_source_check    CHECK ((reach IS NULL) = (reach_source IS NULL)),
  ADD CONSTRAINT listings_reach_end_has_source_check CHECK (reach_until IS NULL OR reach_source IS NOT NULL),
  ADD CONSTRAINT listings_reach_source_has_end_check CHECK (reach_source IS NULL OR reach_source = 'staff' OR reach_until IS NOT NULL);

COMMENT ON COLUMN public.listings.tier IS
  'The ad''s level: a listing_packages key of kind level (P-2, D294; the column keeps its P-1 name — ruling 1 Q1). The baseline level (listing_packages.is_baseline) is free; the others end at tier_until.';
COMMENT ON COLUMN public.listings.tier_until IS
  'When the level ends (P-2, D297): NULL = no end (the baseline, or a staff mark — D276). The sweep (M-1c) returns an ended level to the baseline or pauses the ad.';
COMMENT ON COLUMN public.listings.tier_source IS
  'How the level was set: money, credits, staff or launch (the launch season, nothing charged). NULL only at the baseline.';
COMMENT ON COLUMN public.listings.reach IS
  'The ad''s bought reach: a listing_packages key of kind reach. NULL = the market''s included reach (market_settings.included_reach for the ad''s country) — a typed absence, never a default in a reader.';
COMMENT ON COLUMN public.listings.reach_until IS
  'When the bought reach ends; NULL = no end (a staff mark).';
COMMENT ON COLUMN public.listings.reach_source IS
  'How the reach was set: money, credits, staff or launch. Set exactly when reach is.';

CREATE INDEX listings_tier_until_idx  ON public.listings (tier_until)  WHERE tier_until IS NOT NULL;
CREATE INDEX listings_reach_until_idx ON public.listings (reach_until) WHERE reach_until IS NOT NULL;

-- ------------------------------------------------------------ 2. THE BASELINE LEVEL
ALTER TABLE public.listing_packages
  ADD COLUMN is_baseline boolean NOT NULL DEFAULT false;
COMMENT ON COLUMN public.listing_packages.is_baseline IS
  'The one free level every ad holds unless it is raised (P-2, ruling 1 Q6 — DEC-329): exactly one level row; the console shows it as a read-only mark. What varies per country is the number of such ads a seller may run (market_settings.free_regular_ads).';
CREATE UNIQUE INDEX listing_packages_one_baseline_idx
  ON public.listing_packages ((kind)) WHERE kind = 'level' AND is_baseline;
UPDATE public.listing_packages SET is_baseline = true WHERE key = 'regular' AND kind = 'level';
DO $seed$
BEGIN
  IF (SELECT count(*) FROM public.listing_packages WHERE kind = 'level' AND is_baseline) <> 1 THEN
    RAISE EXCEPTION 'P-2 M-1a: the baseline level was not seeded (no `regular` level row?)';
  END IF;
END $seed$;
-- The browser roles' column grant restated with the flag (never created_by or updated_by).
GRANT SELECT (key, kind, name_en, name_am, days, max_photos, placement, badge, enabled, self_serve, extends_lifetime, sort, is_baseline, created_at, updated_at)
  ON public.listing_packages TO anon, authenticated;

CREATE FUNCTION public.baseline_level_key()
RETURNS text
LANGUAGE plpgsql
STABLE
SET search_path TO 'public'
AS $fn$
DECLARE
  v_key text;
BEGIN
  SELECT k.key INTO v_key FROM public.listing_packages k WHERE k.kind = 'level' AND k.is_baseline;
  IF v_key IS NULL THEN
    RAISE EXCEPTION 'baselineMissing';
  END IF;
  RETURN v_key;
END $fn$;
COMMENT ON FUNCTION public.baseline_level_key() IS
  'The key of the one baseline level (listing_packages.is_baseline). Raises when none is marked — never a literal, never a default (P-2 M-1a, DEC-329).';
REVOKE ALL ON FUNCTION public.baseline_level_key() FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.baseline_level_key() TO service_role;

-- ------------------------------------------------------------ 3. THE DIAL
-- Ten sets an hour per caller for set_listing_level / set_listing_reach (M-1b); staff edit the row
-- (ON CONFLICT DO NOTHING keeps their value on a re-apply). A later RAISE in the door rolls the
-- count back (INC-844); the doors' refusal proofs assert it.
INSERT INTO public.rate_dials (action, max_count, window_seconds) VALUES ('promote', 10, 3600)
  ON CONFLICT (action) DO NOTHING;

-- ------------------------------------------------------------ 4. PROOFS
-- Scratch rows only, rolled back by the sentinel; no real row is read but the catalogue's levels.
--   (a) the columns, CHECKs, foreign keys, indexes; the literal tier check gone; the baseline flag,
--       its one row and its browser column grant; baseline_level_key() born closed and answering
--       the flagged row; the dial row.
--   (b) the CHECKs and the foreign key refuse: an end without a source, a bought source without an
--       end, a reach without its source, a tier that is no level row; and accept a staff level with
--       an end beside a staff reach (a scratch reach row — the key follows ON UPDATE CASCADE).
DO $proof$
DECLARE
  v_bl     regprocedure := 'public.baseline_level_key()'::regprocedure;
  v_seller uuid := gen_random_uuid();
  v_tag    text := 'e2e-mig-p2-m1a-' || substr(gen_random_uuid()::text, 1, 8);
  v_rc     text := 'e2e_mig_rc_' || substr(replace(gen_random_uuid()::text, '-', ''), 1, 8);
  v_code   char(2) := 'XZ';
  v_anc    uuid;
  v_region uuid;
  v_city   uuid;
  v_cat    uuid;
  v_a      uuid;
  v_n      integer;
  v_role   text;
  v_col    text;
  v_msg    text;
BEGIN
  -- (a) the structure.
  SELECT count(*) INTO v_n FROM information_schema.columns
   WHERE table_schema = 'public' AND table_name = 'listings'
     AND ((column_name = 'tier_until'   AND data_type = 'timestamp with time zone' AND is_nullable = 'YES')
       OR (column_name = 'tier_source'  AND data_type = 'text' AND is_nullable = 'YES')
       OR (column_name = 'reach'        AND data_type = 'text' AND is_nullable = 'YES')
       OR (column_name = 'reach_until'  AND data_type = 'timestamp with time zone' AND is_nullable = 'YES')
       OR (column_name = 'reach_source' AND data_type = 'text' AND is_nullable = 'YES'));
  IF v_n <> 5 THEN RAISE EXCEPTION 'P-2 M-1a proof (a): the five columns are not all there (%)', v_n; END IF;
  SELECT count(*) INTO v_n FROM pg_constraint c
   WHERE c.conrelid = 'public.listings'::regclass
     AND c.conname IN ('listings_tier_fkey', 'listings_tier_end_has_source_check', 'listings_tier_source_has_end_check',
                       'listings_reach_with_source_check', 'listings_reach_end_has_source_check', 'listings_reach_source_has_end_check');
  IF v_n <> 6 THEN RAISE EXCEPTION 'P-2 M-1a proof (a): the six constraints are not all there (%)', v_n; END IF;
  IF EXISTS (SELECT 1 FROM pg_constraint c WHERE c.conrelid = 'public.listings'::regclass AND c.conname = 'listings_tier_check') THEN
    RAISE EXCEPTION 'P-2 M-1a proof (a): the literal tier check is still there';
  END IF;
  IF (SELECT count(*) FROM pg_constraint c
       WHERE c.conrelid = 'public.listings'::regclass AND c.contype = 'f'
         AND c.confrelid = 'public.listing_packages'::regclass
         AND c.confupdtype = 'c') <> 2 THEN
    RAISE EXCEPTION 'P-2 M-1a proof (a): tier and reach do not both reference listing_packages ON UPDATE CASCADE';
  END IF;
  IF (SELECT count(*) FROM pg_indexes
       WHERE schemaname = 'public' AND tablename = 'listings'
         AND indexname IN ('listings_tier_until_idx', 'listings_reach_until_idx')
         AND indexdef LIKE '%IS NOT NULL%') <> 2 THEN
    RAISE EXCEPTION 'P-2 M-1a proof (a): the two partial indexes are not there';
  END IF;
  IF (SELECT count(*) FROM public.listing_packages WHERE kind = 'level' AND is_baseline) <> 1
     OR NOT EXISTS (SELECT 1 FROM pg_indexes WHERE schemaname = 'public' AND tablename = 'listing_packages'
                      AND indexname = 'listing_packages_one_baseline_idx' AND indexdef LIKE 'CREATE UNIQUE INDEX%') THEN
    RAISE EXCEPTION 'P-2 M-1a proof (a): the baseline flag is not one row under a unique index';
  END IF;
  IF public.baseline_level_key() IS DISTINCT FROM (SELECT key FROM public.listing_packages WHERE kind = 'level' AND is_baseline) THEN
    RAISE EXCEPTION 'P-2 M-1a proof (a): baseline_level_key() does not answer the flagged row';
  END IF;
  FOREACH v_role IN ARRAY ARRAY['anon', 'authenticated'] LOOP
    FOREACH v_col IN ARRAY ARRAY['key', 'kind', 'name_en', 'name_am', 'days', 'max_photos', 'placement', 'badge', 'enabled', 'self_serve', 'extends_lifetime', 'sort', 'is_baseline', 'created_at', 'updated_at'] LOOP
      IF NOT has_column_privilege(v_role, 'public.listing_packages', v_col, 'SELECT') THEN
        RAISE EXCEPTION 'P-2 M-1a proof (a): % cannot read listing_packages.%', v_role, v_col;
      END IF;
    END LOOP;
    IF has_column_privilege(v_role, 'public.listing_packages', 'created_by', 'SELECT')
       OR has_column_privilege(v_role, 'public.listing_packages', 'updated_by', 'SELECT')
       OR has_table_privilege(v_role, 'public.listing_packages', 'INSERT, UPDATE, DELETE')
       OR has_function_privilege(v_role, v_bl, 'EXECUTE') THEN
      RAISE EXCEPTION 'P-2 M-1a proof (a): % holds a privilege it must not', v_role;
    END IF;
  END LOOP;
  IF (SELECT prosecdef OR provolatile <> 's' OR proconfig::text <> '{search_path=public}' FROM pg_proc WHERE oid = v_bl)
     OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_bl)) a WHERE a.grantee = 0)
     OR NOT has_function_privilege('service_role', v_bl, 'EXECUTE') THEN
    RAISE EXCEPTION 'P-2 M-1a proof (a): baseline_level_key''s header or grants differ';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM public.rate_dials WHERE action = 'promote' AND max_count >= 1 AND window_seconds > 0) THEN
    RAISE EXCEPTION 'P-2 M-1a proof (a): the promote dial row is missing';
  END IF;

  BEGIN
    -- A scratch market (the INC-949 proof's way): the country is named in the scratch namespace; its
    -- anchor row (the countries trigger copies name_en) is read and switched on by that name.
    IF EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
      RAISE EXCEPTION 'P-2 M-1a proof: scratch code % already exists', v_code;
    END IF;
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_code, 'e2e-mig-p2-m1a', true);
    SELECT a.id INTO v_anc FROM public.locations a
     WHERE a.country_code = v_code AND a.level = 'country' AND a.name_en = 'e2e-mig-p2-m1a';
    IF v_anc IS NULL OR (SELECT count(*) FROM public.locations a
                          WHERE a.country_code = v_code AND a.level = 'country' AND a.name_en = 'e2e-mig-p2-m1a') <> 1 THEN
      RAISE EXCEPTION 'P-2 M-1a proof: the scratch market has no single anchor';
    END IF;
    UPDATE public.locations SET is_active = true WHERE id = v_anc AND name_en = 'e2e-mig-p2-m1a';
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id)
    VALUES ('region', v_code, 'E2E P2 M1a Region', v_tag || '-r', true, v_anc) RETURNING id INTO v_region;
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id, center_lat, center_lng)
    VALUES ('city', v_code, 'E2E P2 M1a City', v_tag || '-c', true, v_region, 9.03, 38.74) RETURNING id INTO v_city;
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at)
    VALUES (v_seller, v_tag || '-seller@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES ('E2E P2 M1a Leaf', v_tag, true, true, true, 9999)
    RETURNING id INTO v_cat;
    INSERT INTO public.listing_packages (key, kind, name_en, days, enabled, self_serve, extends_lifetime, sort)
    VALUES (v_rc, 'reach', 'E2E P2 M1a reach', 30, true, true, false, 99);

    -- (b) the CHECKs and the foreign key refuse bad rows (the inserts run with no caller: the
    -- acceptance guard passes; nothing here is a door).
    BEGIN
      INSERT INTO public.listings (seller_id, category_id, location_id, title, description, home_country_code, status, tier, tier_until)
      VALUES (v_seller, v_cat, v_city, 'E2E P2 M1a bad 1', 'scratch', v_code, 'draft', 'premium', now() + interval '1 day');
      RAISE EXCEPTION 'P-2 M-1a proof (b): an end without a source was accepted';
    EXCEPTION WHEN check_violation THEN NULL;
    END;
    BEGIN
      INSERT INTO public.listings (seller_id, category_id, location_id, title, description, home_country_code, status, tier, tier_source)
      VALUES (v_seller, v_cat, v_city, 'E2E P2 M1a bad 2', 'scratch', v_code, 'draft', 'premium', 'money');
      RAISE EXCEPTION 'P-2 M-1a proof (b): a bought level without an end was accepted';
    EXCEPTION WHEN check_violation THEN NULL;
    END;
    BEGIN
      INSERT INTO public.listings (seller_id, category_id, location_id, title, description, home_country_code, status, tier, reach)
      VALUES (v_seller, v_cat, v_city, 'E2E P2 M1a bad 3', 'scratch', v_code, 'draft', 'regular', v_rc);
      RAISE EXCEPTION 'P-2 M-1a proof (b): a reach without its source was accepted';
    EXCEPTION WHEN check_violation THEN NULL;
    END;
    BEGIN
      INSERT INTO public.listings (seller_id, category_id, location_id, title, description, home_country_code, status, tier)
      VALUES (v_seller, v_cat, v_city, 'E2E P2 M1a bad 4', 'scratch', v_code, 'draft', v_rc || '_nolevel');
      RAISE EXCEPTION 'P-2 M-1a proof (b): a tier that is no level row was accepted';
    EXCEPTION WHEN foreign_key_violation THEN NULL;
    END;
    -- A good row: a staff level with an end beside a staff reach with none; the reach key renamed
    -- follows (ON UPDATE CASCADE), as the tier key does.
    INSERT INTO public.listings (seller_id, category_id, location_id, title, description, home_country_code,
                                 status, tier, tier_until, tier_source, reach, reach_source)
    VALUES (v_seller, v_cat, v_city, 'E2E P2 M1a good', 'scratch', v_code, 'draft', 'premium', now() + interval '10 days', 'staff', v_rc, 'staff')
    RETURNING id INTO v_a;
    UPDATE public.listing_packages SET key = v_rc || 'x' WHERE key = v_rc;
    IF (SELECT reach FROM public.listings WHERE id = v_a) IS DISTINCT FROM v_rc || 'x' THEN
      RAISE EXCEPTION 'P-2 M-1a proof (b): the reach did not follow the renamed key';
    END IF;

    RAISE EXCEPTION 'p2-m1a-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1a-proof-ok' THEN RAISE; END IF;
  END;
END;
$proof$;

-- ------------------------------------------------------------ 5. CLOSERS
REVOKE ALL ON FUNCTION public.baseline_level_key() FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.baseline_level_key() TO service_role;

INSERT INTO public.migration_marks (version) VALUES ('20261104200000') ON CONFLICT DO NOTHING;
