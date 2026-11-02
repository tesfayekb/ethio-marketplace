-- e2e-areas: admin-packages, admin-roles
-- Turn P-1 part A, M1b (D279–D283; spec v1 §3.2, §3.3, §3.7; ruling 1, answers 3, 4, 5, 8) — the
-- packages, their prices, the one resolver and the resource (the staff doors are M1c's, the next
-- file: one concern per file, the 25 KB ceiling).
-- A package is a per-ad promotion (the tier it grants, for how many days): public.listing_packages,
-- seeded featured_45 and premium_60, read by everyone while enabled (the seller's Promote screen,
-- P-3) and by staff always (packages:view). A price is a row of public.package_prices (package ×
-- market × category-or-any × amount × currency × window); everyone reads the valid rows, staff
-- every row. Nothing reads a price for an ad except public.package_price_for(listing, package):
-- the most specific valid row wins — (market, category) over (market, any) over (any, category)
-- over (any, any), the nearest category ancestor first — and none means the package is not
-- offered (NULL, never free by default). The ad's market is the country of its primary place
-- (locations.country_code of listings.location_id; never home_country_code). SECURITY INVOKER:
-- the caller sees the ad through its own policies.
-- Writes only through three staff doors (M1c) behind the new resource packages (view / update,
-- update with a second factor; the pattern of 20260915162505 §3.1) and the staff_config dial:
-- admin_save_listing_package (upsert), admin_save_package_price (insert only; an overlapping
-- window for the same package, market and category is refused under FOR UPDATE on the package
-- row — no extension, G42) and admin_end_package_price (sets valid_to; history stays; an end that
-- would overlap a later row is refused the same way). Each writes one audit row (package.saved,
-- package_price.saved, package_price.ended); a refusal raises and writes nothing.

-- ------------------------------------------------------------ 1. THE PACKAGES
CREATE TABLE public.listing_packages (
  -- S512 (ruling 2): a letter first, then letters, digits and underscores, 2 to 32 in all.
  key              text PRIMARY KEY CHECK (key ~ '^[a-z][a-z0-9_]{1,31}$'),
  tier             text NOT NULL CHECK (tier IN ('featured', 'premium')),
  days             integer NOT NULL CHECK (days > 0),
  enabled          boolean NOT NULL DEFAULT true,
  self_serve       boolean NOT NULL DEFAULT false,
  extends_lifetime boolean NOT NULL DEFAULT true,
  label_key        text NULL CHECK (label_key IS NULL OR label_key ~ '^[a-z][a-z0-9_.]{1,79}$'),
  sort             integer NOT NULL DEFAULT 0,
  updated_by       uuid NULL REFERENCES public.profiles(user_id) ON DELETE SET NULL,
  created_at       timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now()
);
COMMENT ON TABLE public.listing_packages IS
  'D279/D280 — a per-ad promotion: the tier it grants for how many days; staff add, edit and switch off, never delete (P-1).';
COMMENT ON COLUMN public.listing_packages.extends_lifetime IS
  'Spec §8.1 (P-2 decides): whether applying the package pushes the ad''s expires_at to at least its end.';
CREATE TRIGGER listing_packages_updated_at
  BEFORE UPDATE ON public.listing_packages
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

REVOKE ALL ON public.listing_packages FROM PUBLIC, anon, authenticated;
GRANT ALL ON public.listing_packages TO service_role;
-- The browser roles read every column except updated_by (the coverage_plans rule, T14).
GRANT SELECT (key, tier, days, enabled, self_serve, extends_lifetime, label_key, sort, created_at, updated_at)
  ON public.listing_packages TO anon, authenticated;
ALTER TABLE public.listing_packages ENABLE ROW LEVEL SECURITY;
CREATE POLICY listing_packages_public_read ON public.listing_packages
  FOR SELECT TO anon, authenticated USING (enabled);
CREATE POLICY listing_packages_staff_read ON public.listing_packages
  FOR SELECT TO authenticated USING (public.has_permission(auth.uid(), 'packages', 'view'));
CREATE POLICY listing_packages_no_insert ON public.listing_packages
  FOR INSERT TO anon, authenticated WITH CHECK (false);
CREATE POLICY listing_packages_no_update ON public.listing_packages
  FOR UPDATE TO anon, authenticated USING (false);
CREATE POLICY listing_packages_no_delete ON public.listing_packages
  FOR DELETE TO anon, authenticated USING (false);

-- D280, D283 — the seeds: Featured 45 days, Premium 60 days, on, self-serve. No price row: the
-- operator creates the free promotion in the admin when he chooses (none = not offered).
INSERT INTO public.listing_packages (key, tier, days, enabled, self_serve, extends_lifetime, label_key, sort)
VALUES ('featured_45', 'featured', 45, true, true, true, 'package.featured_45', 10),
       ('premium_60', 'premium', 60, true, true, true, 'package.premium_60', 20)
ON CONFLICT (key) DO NOTHING;

-- ------------------------------------------------------------ 2. THE PRICES
CREATE TABLE public.package_prices (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  package_key  text NOT NULL REFERENCES public.listing_packages(key),
  country_code char(2) NULL REFERENCES public.countries(code),
  category_id  uuid NULL REFERENCES public.categories(id),
  amount       numeric(12,2) NOT NULL CHECK (amount >= 0),
  currency     char(3) NOT NULL REFERENCES public.currencies(code),
  valid_from   timestamptz NOT NULL DEFAULT now(),
  valid_to     timestamptz NULL,
  updated_by   uuid NULL REFERENCES public.profiles(user_id) ON DELETE SET NULL,
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT package_prices_window_check CHECK (valid_to IS NULL OR valid_to > valid_from)
);
COMMENT ON TABLE public.package_prices IS
  'D281 — a package''s price for a market (NULL = every) and a category (NULL = every) over a window; 0 = free; ended by valid_to, never deleted (P-1).';
CREATE INDEX package_prices_lookup
  ON public.package_prices (package_key, country_code, category_id, valid_from, valid_to);
CREATE TRIGGER package_prices_updated_at
  BEFORE UPDATE ON public.package_prices
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

REVOKE ALL ON public.package_prices FROM PUBLIC, anon, authenticated;
GRANT ALL ON public.package_prices TO service_role;
GRANT SELECT (id, package_key, country_code, category_id, amount, currency, valid_from, valid_to, created_at, updated_at)
  ON public.package_prices TO anon, authenticated;
ALTER TABLE public.package_prices ENABLE ROW LEVEL SECURITY;
CREATE POLICY package_prices_public_read ON public.package_prices
  FOR SELECT TO anon, authenticated
  USING (valid_from <= now() AND (valid_to IS NULL OR valid_to > now()));
CREATE POLICY package_prices_staff_read ON public.package_prices
  FOR SELECT TO authenticated USING (public.has_permission(auth.uid(), 'packages', 'view'));
CREATE POLICY package_prices_no_insert ON public.package_prices
  FOR INSERT TO anon, authenticated WITH CHECK (false);
CREATE POLICY package_prices_no_update ON public.package_prices
  FOR UPDATE TO anon, authenticated USING (false);
CREATE POLICY package_prices_no_delete ON public.package_prices
  FOR DELETE TO anon, authenticated USING (false);

-- ------------------------------------------------------------ 3. THE RESOLVER
-- The one reader of a price for an ad (CF-PRICE-1). The category chain is the feed's walk
-- (feed_keys, 20261009032615): the ad's category, then each parent through category_tree_pointers,
-- with its distance; a price on a nearer category wins over one on a farther ancestor.
CREATE FUNCTION public.package_price_for(p_listing_id uuid, p_package_key text)
RETURNS jsonb
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public
AS $fn$
  WITH RECURSIVE
  ad AS (
    SELECT l.id, l.category_id, loc.country_code AS market
      FROM public.listings l
      LEFT JOIN public.locations loc ON loc.id = l.location_id
     WHERE l.id = p_listing_id
  ),
  cats(id, depth) AS (
    SELECT a.category_id, 0 FROM ad a WHERE a.category_id IS NOT NULL
    UNION
    SELECT t.parent_id, c.depth + 1
      FROM cats c
      JOIN public.category_tree_pointers t ON t.child_id = c.id
     WHERE t.parent_id IS NOT NULL
  ),
  picked AS (
    SELECT p.id, p.amount, p.currency, p.valid_from, p.valid_to, p.country_code, p.category_id
      FROM public.package_prices p
      JOIN public.listing_packages k ON k.key = p.package_key AND k.enabled
      CROSS JOIN ad a
      LEFT JOIN cats c ON c.id = p.category_id
     WHERE p.package_key = p_package_key
       AND p.valid_from <= now()
       AND (p.valid_to IS NULL OR p.valid_to > now())
       AND (p.country_code IS NULL OR p.country_code = a.market)
       AND (p.category_id IS NULL OR c.id IS NOT NULL)
     ORDER BY (p.country_code IS NOT NULL) DESC,
              (p.category_id IS NOT NULL) DESC,
              c.depth ASC NULLS LAST,
              p.valid_from DESC,
              p.id
     LIMIT 1
  )
  SELECT jsonb_build_object(
           'price_id', picked.id,
           'amount', picked.amount,
           'currency', picked.currency,
           'valid_from', picked.valid_from,
           'valid_to', picked.valid_to,
           'country_code', picked.country_code,
           'category_id', picked.category_id)
    FROM picked;
$fn$;
REVOKE ALL ON FUNCTION public.package_price_for(uuid, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.package_price_for(uuid, text) TO anon, authenticated, service_role;

-- ------------------------------------------------------------ 4. THE RESOURCE (DEC-017 pattern)
INSERT INTO public.resources (name, display_name)
VALUES ('packages', 'Packages')
ON CONFLICT (name) DO NOTHING;

DO $$
DECLARE
  v_pkg uuid;
BEGIN
  SELECT id INTO v_pkg FROM public.resources WHERE name = 'packages';
  IF v_pkg IS NULL THEN
    RAISE EXCEPTION 'P-1 M1b: the packages resource row is missing';
  END IF;
  INSERT INTO public.permissions (resource_id, action, requires_step_up, assignable)
  VALUES (v_pkg, 'view', false, true),
         (v_pkg, 'update', true, true)
  ON CONFLICT DO NOTHING;
  UPDATE public.permissions p SET requires_step_up = true
   WHERE p.resource_id = v_pkg AND p.action = 'update';
  UPDATE public.permissions p SET requires_step_up = false
   WHERE p.resource_id = v_pkg AND p.action = 'view';
END $$;

-- PROOF (P-1 M1b): scratch rows only, rolled back by the sentinel.
--   (a) the resolver's header and grants (STABLE, SECURITY INVOKER, search_path public; open to
--       anon, authenticated and service_role); the resource packages with view (no second factor)
--       and update (a second factor); the tables: every column but updated_by readable by the
--       browser roles, no write privilege, service_role whole, row security on; the two seeds.
--   (b) the resolver's precedence on six scratch price rows for an ad in a scratch market and a
--       scratch leaf under a scratch root: (market, leaf) 1 → (market, any) 2 → (any, leaf) 3 →
--       (any, root) 5 → (any, any) 4 → NULL as each is ended in turn; a row for another category
--       is never picked; a future window is not yet valid; a switched-off package, an unknown
--       package and an unknown ad answer NULL.
--   (c) as anon: enabled packages and valid prices only; updated_by refused.
--   The rows are scratch, written by the migration's own role (the doors are M1c's and proven
--   there): a market XZ (the INC-949 proof's way), one user, three categories, one listing, one
--   package and seven prices; the proof reads no real row (G27).
DO $proof$
DECLARE
  v_res     regprocedure := 'public.package_price_for(uuid,text)'::regprocedure;
  v_seller  uuid := gen_random_uuid();
  v_tag     text := 'e2e-mig-p1-m1b-' || substr(gen_random_uuid()::text, 1, 8);
  v_pkg     text := 'e2e_mig_pk_' || translate(substr(gen_random_uuid()::text, 1, 8), '0123456789-', 'abcdefghijk');
  v_code    char(2) := 'XZ';
  v_cur     char(3);
  v_anc     uuid;
  v_region  uuid;
  v_city    uuid;
  v_root    uuid;
  v_leaf    uuid;
  v_other   uuid;
  v_live    uuid;
  v_a       uuid := gen_random_uuid();
  v_b       uuid := gen_random_uuid();
  v_c       uuid := gen_random_uuid();
  v_d       uuid := gen_random_uuid();
  v_e       uuid := gen_random_uuid();
  v_f       uuid := gen_random_uuid();
  v_g       uuid := gen_random_uuid();
  v_answer  jsonb;
  v_state   text;
  v_col     text;
  v_role    text;
  v_n       integer;
BEGIN
  -- (a) the resolver
  IF (SELECT prosecdef OR provolatile <> 's' OR proconfig::text <> '{search_path=public}' FROM pg_proc WHERE oid = v_res)
     OR NOT has_function_privilege('anon', v_res, 'EXECUTE')
     OR NOT has_function_privilege('authenticated', v_res, 'EXECUTE')
     OR NOT has_function_privilege('service_role', v_res, 'EXECUTE') THEN
    RAISE EXCEPTION 'P-1 M1b proof (a): the resolver''s header or grants differ';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
                  WHERE r.name = 'packages' AND p.action = 'update' AND p.requires_step_up AND p.assignable)
     OR NOT EXISTS (SELECT 1 FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
                     WHERE r.name = 'packages' AND p.action = 'view' AND NOT p.requires_step_up AND p.assignable) THEN
    RAISE EXCEPTION 'P-1 M1b proof (a): the packages permissions differ';
  END IF;
  -- (a) the tables
  FOREACH v_role IN ARRAY ARRAY['anon', 'authenticated'] LOOP
    FOREACH v_col IN ARRAY ARRAY['key', 'tier', 'days', 'enabled', 'self_serve', 'extends_lifetime', 'label_key', 'sort', 'created_at', 'updated_at'] LOOP
      IF NOT has_column_privilege(v_role, 'public.listing_packages', v_col, 'SELECT') THEN
        RAISE EXCEPTION 'P-1 M1b proof (a): % cannot read listing_packages.%', v_role, v_col;
      END IF;
    END LOOP;
    FOREACH v_col IN ARRAY ARRAY['id', 'package_key', 'country_code', 'category_id', 'amount', 'currency', 'valid_from', 'valid_to', 'created_at', 'updated_at'] LOOP
      IF NOT has_column_privilege(v_role, 'public.package_prices', v_col, 'SELECT') THEN
        RAISE EXCEPTION 'P-1 M1b proof (a): % cannot read package_prices.%', v_role, v_col;
      END IF;
    END LOOP;
    IF has_column_privilege(v_role, 'public.listing_packages', 'updated_by', 'SELECT')
       OR has_column_privilege(v_role, 'public.package_prices', 'updated_by', 'SELECT')
       OR has_table_privilege(v_role, 'public.listing_packages', 'INSERT, UPDATE, DELETE')
       OR has_table_privilege(v_role, 'public.package_prices', 'INSERT, UPDATE, DELETE') THEN
      RAISE EXCEPTION 'P-1 M1b proof (a): % holds a privilege it must not', v_role;
    END IF;
  END LOOP;
  IF NOT has_table_privilege('service_role', 'public.listing_packages', 'SELECT, INSERT, UPDATE, DELETE')
     OR NOT has_table_privilege('service_role', 'public.package_prices', 'SELECT, INSERT, UPDATE, DELETE')
     OR NOT (SELECT relrowsecurity FROM pg_class WHERE oid = 'public.listing_packages'::regclass)
     OR NOT (SELECT relrowsecurity FROM pg_class WHERE oid = 'public.package_prices'::regclass) THEN
    RAISE EXCEPTION 'P-1 M1b proof (a): service_role or row security differs';
  END IF;
  IF (SELECT count(*) FROM public.listing_packages
       WHERE (key, tier, days, enabled, self_serve) IN (('featured_45', 'featured', 45, true, true),
                                                        ('premium_60', 'premium', 60, true, true))) <> 2 THEN
    RAISE EXCEPTION 'P-1 M1b proof (a): the seeds differ';
  END IF;

  BEGIN
    -- A scratch market (the INC-949 proof's way, as T1 M1): the country is named in the scratch
    -- namespace; its anchor row (the countries trigger copies name_en) is read and switched on by
    -- that name.
    IF EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
      RAISE EXCEPTION 'P-1 M1b proof: scratch code % already exists', v_code;
    END IF;
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_code, 'e2e-mig-p1-m1b', true);
    SELECT a.id INTO v_anc FROM public.locations a
     WHERE a.country_code = v_code AND a.level = 'country' AND a.name_en = 'e2e-mig-p1-m1b';
    IF v_anc IS NULL OR (SELECT count(*) FROM public.locations a
                          WHERE a.country_code = v_code AND a.level = 'country' AND a.name_en = 'e2e-mig-p1-m1b') <> 1 THEN
      RAISE EXCEPTION 'P-1 M1b proof: the scratch market has no single anchor';
    END IF;
    UPDATE public.locations SET is_active = true WHERE id = v_anc AND name_en = 'e2e-mig-p1-m1b';
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id)
    VALUES ('region', v_code, 'E2E P1 M1b Region', v_tag || '-r', true, v_anc) RETURNING id INTO v_region;
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id, center_lat, center_lng)
    VALUES ('city', v_code, 'E2E P1 M1b City', v_tag || '-c', true, v_region, 9.03, 38.74) RETURNING id INTO v_city;
    -- A currency the table holds, read by its order (no code is written here).
    SELECT c.code INTO v_cur FROM public.currencies c ORDER BY c.display_order, c.code LIMIT 1;
    IF v_cur IS NULL THEN RAISE EXCEPTION 'P-1 M1b proof: no currency row'; END IF;

    -- A scratch tree: root → leaf, and another root (no caller is set: the catalogue guard
    -- judges signed-in writes only).
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES ('E2E P1 M1b Root', v_tag || '-root', true, true, false, 9997) RETURNING id INTO v_root;
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES ('E2E P1 M1b Leaf', v_tag || '-leaf', true, true, true, 9998) RETURNING id INTO v_leaf;
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES ('E2E P1 M1b Other', v_tag || '-other', true, true, true, 9999) RETURNING id INTO v_other;
    INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order)
    VALUES (NULL, v_root, 9997), (v_root, v_leaf, 1), (NULL, v_other, 9999);

    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at)
    VALUES (v_seller, v_tag || '-seller@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    -- A live listing in the leaf, placed in the scratch city (listings_place_unless_draft).
    INSERT INTO public.listings (seller_id, category_id, location_id, title, description, home_country_code,
                                 status, published_at, published_first_at, expires_at)
    VALUES (v_seller, v_leaf, v_city, 'E2E P1 M1b live', 'scratch', v_code,
            'active', now(), now(), now() + interval '28 days')
    RETURNING id INTO v_live;

    -- The package and its prices, written directly (the doors are M1c's).
    INSERT INTO public.listing_packages (key, tier, days, enabled, self_serve, extends_lifetime, label_key, sort)
    VALUES (v_pkg, 'premium', 7, true, true, true, 'package.e2e_mig', 99);
    INSERT INTO public.package_prices (id, package_key, country_code, category_id, amount, currency, valid_from, valid_to) VALUES
      (v_a, v_pkg, v_code, v_leaf,  1.00, v_cur, now() - interval '1 hour', NULL),
      (v_b, v_pkg, v_code, NULL,    2.00, v_cur, now() - interval '1 hour', NULL),
      (v_c, v_pkg, NULL,   v_leaf,  3.00, v_cur, now() - interval '1 hour', NULL),
      (v_d, v_pkg, NULL,   v_root,  5.00, v_cur, now() - interval '1 hour', NULL),
      (v_e, v_pkg, NULL,   NULL,    4.00, v_cur, now() - interval '1 hour', NULL),
      (v_f, v_pkg, v_code, v_other, 9.00, v_cur, now() - interval '1 hour', NULL),
      (v_g, v_pkg, v_code, v_leaf,  0.50, v_cur, now() + interval '1 day', now() + interval '2 days');

    -- (b) the precedence: (market, leaf) first, every field of the answer.
    v_answer := public.package_price_for(v_live, v_pkg);
    IF v_answer IS NULL OR (v_answer->>'price_id')::uuid <> v_a OR (v_answer->>'amount')::numeric <> 1.00
       OR v_answer->>'currency' <> v_cur OR v_answer->>'country_code' <> v_code
       OR (v_answer->>'category_id')::uuid <> v_leaf OR v_answer->>'valid_to' IS NOT NULL
       OR (v_answer->>'valid_from')::timestamptz <> now() - interval '1 hour' THEN
      RAISE EXCEPTION 'P-1 M1b proof (b): (market, leaf) answered %', v_answer;
    END IF;
    -- A → B (market, any); the future G on A's scope is not yet valid.
    UPDATE public.package_prices SET valid_to = now() WHERE id = v_a;
    IF (public.package_price_for(v_live, v_pkg)->>'price_id')::uuid <> v_b THEN
      RAISE EXCEPTION 'P-1 M1b proof (b): after A, (market, any) was not picked';
    END IF;
    -- B → C (leaf, depth 0) → D (root, depth 1) → E (any, any) → NULL; F (other) never.
    UPDATE public.package_prices SET valid_to = now() WHERE id = v_b;
    IF (public.package_price_for(v_live, v_pkg)->>'price_id')::uuid <> v_c THEN
      RAISE EXCEPTION 'P-1 M1b proof (b): after B, (any, leaf) was not picked';
    END IF;
    UPDATE public.package_prices SET valid_to = now() WHERE id = v_c;
    IF (public.package_price_for(v_live, v_pkg)->>'price_id')::uuid <> v_d THEN
      RAISE EXCEPTION 'P-1 M1b proof (b): after C, (any, root) was not picked';
    END IF;
    UPDATE public.package_prices SET valid_to = now() WHERE id = v_d;
    IF (public.package_price_for(v_live, v_pkg)->>'price_id')::uuid <> v_e THEN
      RAISE EXCEPTION 'P-1 M1b proof (b): after D, (any, any) was not picked';
    END IF;
    UPDATE public.package_prices SET valid_to = now() WHERE id = v_e;
    IF public.package_price_for(v_live, v_pkg) IS NOT NULL THEN
      RAISE EXCEPTION 'P-1 M1b proof (b): with no valid row for the ad, a price was answered';
    END IF;
    -- Back to A's window: a switched-off package, an unknown package and an unknown ad.
    UPDATE public.package_prices SET valid_to = NULL WHERE id = v_a;
    UPDATE public.listing_packages SET enabled = false WHERE key = v_pkg;
    IF public.package_price_for(v_live, v_pkg) IS NOT NULL THEN
      RAISE EXCEPTION 'P-1 M1b proof (b): a switched-off package resolved a price';
    END IF;
    UPDATE public.listing_packages SET enabled = true WHERE key = v_pkg;
    IF (public.package_price_for(v_live, v_pkg)->>'price_id')::uuid <> v_a
       OR public.package_price_for(v_live, 'e2e_mig_none') IS NOT NULL
       OR public.package_price_for(gen_random_uuid(), v_pkg) IS NOT NULL THEN
      RAISE EXCEPTION 'P-1 M1b proof (b): an unknown package or ad answered, or A did not return';
    END IF;

    -- (c) as anon: the package while on; of the seven prices A and F are valid now (B–E ended at
    -- now(), G starts tomorrow); never updated_by.
    SET LOCAL ROLE anon;
    SELECT count(*) INTO v_n FROM public.listing_packages WHERE key = v_pkg;
    IF v_n <> 1 THEN RESET ROLE; RAISE EXCEPTION 'P-1 M1b proof (c): anon does not see the enabled package'; END IF;
    SELECT count(*) INTO v_n FROM public.package_prices WHERE package_key = v_pkg AND id NOT IN (v_a, v_f);
    IF v_n <> 0 THEN RESET ROLE; RAISE EXCEPTION 'P-1 M1b proof (c): anon sees % ended or future prices', v_n; END IF;
    SELECT count(*) INTO v_n FROM public.package_prices WHERE id IN (v_a, v_f);
    IF v_n <> 2 THEN RESET ROLE; RAISE EXCEPTION 'P-1 M1b proof (c): anon does not see the valid prices'; END IF;
    v_state := NULL;
    BEGIN
      PERFORM p.updated_by FROM public.package_prices p WHERE false;
    EXCEPTION WHEN OTHERS THEN v_state := SQLSTATE;
    END;
    IF v_state IS DISTINCT FROM '42501' THEN RESET ROLE; RAISE EXCEPTION 'P-1 M1b proof (c): anon read updated_by (%)', coalesce(v_state, 'no error'); END IF;
    RESET ROLE;
    UPDATE public.listing_packages SET enabled = false WHERE key = v_pkg;
    SET LOCAL ROLE anon;
    SELECT count(*) INTO v_n FROM public.listing_packages WHERE key = v_pkg;
    RESET ROLE;
    IF v_n <> 0 THEN RAISE EXCEPTION 'P-1 M1b proof (c): anon sees a switched-off package'; END IF;

    RAISE EXCEPTION 'p1-m1b-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1-m1b-proof-ok' THEN RAISE; END IF;
  END;
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261102230000') ON CONFLICT DO NOTHING;
