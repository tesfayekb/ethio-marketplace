-- e2e-areas: admin-packages, admin-roles
-- Turn P-1 part A, M1b (D279–D283; spec v1 §3.2, §3.3, §3.7; ruling 1, answers 3, 4, 5, 8) — the
-- packages, their prices, the one resolver and the staff doors.
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
-- Writes only through three staff doors behind the new resource packages (view / update, update
-- with a second factor; the pattern of 20260915162505 §3.1) and the staff_config dial:
-- admin_save_listing_package (upsert), admin_save_package_price (insert only; an overlapping
-- window for the same package, market and category is refused under FOR UPDATE on the package
-- row — no extension, G42) and admin_end_package_price (sets valid_to; history stays; an end that
-- would overlap a later row is refused the same way). Each writes one audit row (package.saved,
-- package_price.saved, package_price.ended); a refusal raises and writes nothing.

-- ------------------------------------------------------------ 1. THE PACKAGES
CREATE TABLE public.listing_packages (
  key              text PRIMARY KEY CHECK (key ~ '^[a-z_]{2,32}$'),
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

-- ------------------------------------------------------------ 5. THE DOORS
-- The shape of the staff doors (admin_set_listing_tier, T1 M1): signed in, packages:update, not
-- deactivated, the staff_config dial; the door's own rules; the second factor; then the write,
-- one audit row, a jsonb answer. A refusal raises, so nothing it reached is kept (INC-844).
CREATE FUNCTION public.admin_save_listing_package(p_key text, p_tier text, p_days integer, p_enabled boolean, p_self_serve boolean, p_extends_lifetime boolean, p_label_key text DEFAULT NULL::text, p_sort integer DEFAULT NULL::integer)
 RETURNS jsonb
 LANGUAGE plpgsql
 VOLATILE
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid uuid := auth.uid();
  v_old public.listing_packages%ROWTYPE;
  v_new public.listing_packages%ROWTYPE;
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'not signed in';
  END IF;
  IF NOT public.has_permission(v_uid, 'packages', 'update') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  IF EXISTS (SELECT 1 FROM public.profiles WHERE user_id = v_uid AND account_status = 'deactivated') THEN
    RAISE EXCEPTION 'account is deactivated';
  END IF;
  IF NOT coalesce((public.rate_gate('staff_config')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;

  IF coalesce(p_key, '') !~ '^[a-z_]{2,32}$' THEN
    RAISE EXCEPTION 'bad key';
  END IF;
  IF p_tier IS NULL OR p_tier NOT IN ('featured', 'premium') THEN
    RAISE EXCEPTION 'unknown tier';
  END IF;
  IF coalesce(p_days, 0) < 1 THEN
    RAISE EXCEPTION 'bad days';
  END IF;
  IF p_label_key IS NOT NULL AND p_label_key !~ '^[a-z][a-z0-9_.]{1,79}$' THEN
    RAISE EXCEPTION 'bad label key';
  END IF;
  PERFORM public.require_step_up_if_needed('packages', 'update');

  SELECT * INTO v_old FROM public.listing_packages WHERE key = p_key FOR UPDATE;
  INSERT INTO public.listing_packages (key, tier, days, enabled, self_serve, extends_lifetime, label_key, sort, updated_by, updated_at)
  VALUES (p_key, p_tier, p_days, coalesce(p_enabled, true), coalesce(p_self_serve, false), coalesce(p_extends_lifetime, true),
          coalesce(p_label_key, v_old.label_key), coalesce(p_sort, v_old.sort, 0), v_uid, now())
  ON CONFLICT (key) DO UPDATE
    SET tier = EXCLUDED.tier,
        days = EXCLUDED.days,
        enabled = EXCLUDED.enabled,
        self_serve = EXCLUDED.self_serve,
        extends_lifetime = EXCLUDED.extends_lifetime,
        label_key = EXCLUDED.label_key,
        sort = EXCLUDED.sort,
        updated_by = EXCLUDED.updated_by,
        updated_at = now()
  RETURNING * INTO v_new;
  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
    VALUES (v_uid, 'package.saved', 'listing_package', p_key,
            jsonb_build_object(
              'old', CASE WHEN v_old.key IS NULL THEN NULL
                          ELSE to_jsonb(v_old) - 'updated_by' - 'updated_at' - 'created_at' END,
              'new', to_jsonb(v_new) - 'updated_by' - 'updated_at' - 'created_at'));

  RETURN jsonb_build_object('ok', true, 'key', p_key, 'created', v_old.key IS NULL);
END $function$;
REVOKE ALL ON FUNCTION public.admin_save_listing_package(text, text, integer, boolean, boolean, boolean, text, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_save_listing_package(text, text, integer, boolean, boolean, boolean, text, integer) TO authenticated, service_role;

-- A price row is born here and only ends (admin_end_package_price); its amount, currency, market,
-- category and start never change — a correction is a new row. The overlap rule: for the same
-- package, market and category, two windows [from, to) never intersect; the package row is locked
-- FOR UPDATE so two staff cannot slip adjacent overlaps past each other (answer 4).
CREATE FUNCTION public.admin_save_package_price(p_package_key text, p_amount numeric, p_currency character, p_country_code character DEFAULT NULL::bpchar, p_category_id uuid DEFAULT NULL::uuid, p_valid_from timestamp with time zone DEFAULT NULL::timestamp with time zone, p_valid_to timestamp with time zone DEFAULT NULL::timestamp with time zone)
 RETURNS jsonb
 LANGUAGE plpgsql
 VOLATILE
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid  uuid := auth.uid();
  v_pkg  public.listing_packages%ROWTYPE;
  v_from timestamptz := coalesce(p_valid_from, now());
  v_row  public.package_prices%ROWTYPE;
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'not signed in';
  END IF;
  IF NOT public.has_permission(v_uid, 'packages', 'update') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  IF EXISTS (SELECT 1 FROM public.profiles WHERE user_id = v_uid AND account_status = 'deactivated') THEN
    RAISE EXCEPTION 'account is deactivated';
  END IF;
  IF NOT coalesce((public.rate_gate('staff_config')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;

  SELECT * INTO v_pkg FROM public.listing_packages WHERE key = p_package_key FOR UPDATE;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'unknown package';
  END IF;
  IF p_amount IS NULL OR p_amount < 0 THEN
    RAISE EXCEPTION 'bad amount';
  END IF;
  IF p_currency IS NULL OR NOT EXISTS (SELECT 1 FROM public.currencies c WHERE c.code = p_currency) THEN
    RAISE EXCEPTION 'unknown currency';
  END IF;
  IF p_country_code IS NOT NULL AND NOT EXISTS (SELECT 1 FROM public.countries c WHERE c.code = p_country_code) THEN
    RAISE EXCEPTION 'unknown country';
  END IF;
  IF p_category_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM public.categories c WHERE c.id = p_category_id) THEN
    RAISE EXCEPTION 'unknown category';
  END IF;
  IF p_valid_to IS NOT NULL AND p_valid_to <= v_from THEN
    RAISE EXCEPTION 'bad window';
  END IF;
  IF EXISTS (SELECT 1 FROM public.package_prices x
              WHERE x.package_key = p_package_key
                AND x.country_code IS NOT DISTINCT FROM p_country_code
                AND x.category_id IS NOT DISTINCT FROM p_category_id
                AND x.valid_from < coalesce(p_valid_to, 'infinity'::timestamptz)
                AND coalesce(x.valid_to, 'infinity'::timestamptz) > v_from) THEN
    RAISE EXCEPTION 'overlapping window';
  END IF;
  PERFORM public.require_step_up_if_needed('packages', 'update');

  INSERT INTO public.package_prices (package_key, country_code, category_id, amount, currency, valid_from, valid_to, updated_by)
  VALUES (p_package_key, p_country_code, p_category_id, p_amount, p_currency, v_from, p_valid_to, v_uid)
  RETURNING * INTO v_row;
  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
    VALUES (v_uid, 'package_price.saved', 'package_price', v_row.id::text,
            jsonb_strip_nulls(jsonb_build_object(
              'package', p_package_key, 'country_code', p_country_code, 'category_id', p_category_id,
              'amount', p_amount, 'currency', p_currency, 'valid_from', v_from, 'valid_to', p_valid_to)));

  RETURN jsonb_build_object('ok', true, 'id', v_row.id);
END $function$;
REVOKE ALL ON FUNCTION public.admin_save_package_price(text, numeric, character, character, uuid, timestamp with time zone, timestamp with time zone) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_save_package_price(text, numeric, character, character, uuid, timestamp with time zone, timestamp with time zone) TO authenticated, service_role;

CREATE FUNCTION public.admin_end_package_price(p_id uuid, p_valid_to timestamp with time zone DEFAULT now())
 RETURNS jsonb
 LANGUAGE plpgsql
 VOLATILE
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid uuid := auth.uid();
  v_row public.package_prices%ROWTYPE;
  v_to  timestamptz := coalesce(p_valid_to, now());
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'not signed in';
  END IF;
  IF NOT public.has_permission(v_uid, 'packages', 'update') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  IF EXISTS (SELECT 1 FROM public.profiles WHERE user_id = v_uid AND account_status = 'deactivated') THEN
    RAISE EXCEPTION 'account is deactivated';
  END IF;
  IF NOT coalesce((public.rate_gate('staff_config')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;

  -- The package row is the lock for every window of its prices (as the save door takes it).
  PERFORM 1 FROM public.listing_packages k
    JOIN public.package_prices x ON x.package_key = k.key
   WHERE x.id = p_id
   FOR UPDATE OF k;
  SELECT * INTO v_row FROM public.package_prices WHERE id = p_id FOR UPDATE;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'price not found';
  END IF;
  IF v_row.valid_to IS NOT NULL AND v_row.valid_to <= now() THEN
    RAISE EXCEPTION 'price already ended';
  END IF;
  IF v_to <= v_row.valid_from THEN
    RAISE EXCEPTION 'bad window';
  END IF;
  IF EXISTS (SELECT 1 FROM public.package_prices x
              WHERE x.package_key = v_row.package_key
                AND x.id <> v_row.id
                AND x.country_code IS NOT DISTINCT FROM v_row.country_code
                AND x.category_id IS NOT DISTINCT FROM v_row.category_id
                AND x.valid_from < v_to
                AND coalesce(x.valid_to, 'infinity'::timestamptz) > v_row.valid_from) THEN
    RAISE EXCEPTION 'overlapping window';
  END IF;
  PERFORM public.require_step_up_if_needed('packages', 'update');

  UPDATE public.package_prices SET valid_to = v_to, updated_by = v_uid WHERE id = p_id;
  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
    VALUES (v_uid, 'package_price.ended', 'package_price', p_id::text,
            jsonb_strip_nulls(jsonb_build_object(
              'package', v_row.package_key, 'from', v_row.valid_to, 'to', v_to)));

  RETURN jsonb_build_object('ok', true, 'id', p_id, 'valid_to', v_to);
END $function$;
REVOKE ALL ON FUNCTION public.admin_end_package_price(uuid, timestamp with time zone) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_end_package_price(uuid, timestamp with time zone) TO authenticated, service_role;

-- PROOF (P-1 M1b): scratch rows only, rolled back by the sentinel.
--   (a) the headers and the grants of the resolver (STABLE, SECURITY INVOKER, open to anon) and
--       the three doors (VOLATILE, SECURITY DEFINER, search_path public; closed to PUBLIC and anon,
--       open to authenticated and service_role); the resource packages with view (no second
--       factor) and update (a second factor); the tables: every column but updated_by readable by
--       the browser roles, no write privilege, service_role whole; the two seeds.
--   (b) the save door creates and edits a scratch package: the row, two audit rows (old null, then
--       old → new); switched off it leaves the public read and the resolver answers NULL.
--   (c) the resolver's precedence on six scratch price rows for an ad in a scratch market and a
--       scratch leaf under a scratch root: (market, leaf) 1 → (market, any) 2 → (any, leaf) 3 →
--       (any, root) 5 → (any, any) 4 → NULL as each is ended in turn; a row for another category
--       is never picked; an unknown package answers NULL.
--   (d) an overlapping window is refused under the package lock and writes nothing; an adjacent
--       future window is accepted; an end that would overlap a later row is refused.
--   (e) each refusal of each door writes nothing: bad key, unknown tier, bad days, bad label key;
--       unknown package, bad amount, unknown currency, unknown country, unknown category, bad
--       window; price not found, bad window, price already ended.
--   (f) a signed-in user without packages:update is refused 'permission denied' by each door.
--   (g) the second factor: the super admin on an aal1 session is refused (P0009) by each door.
--   (h) the dial: with the window full, the next call is refused 'rateLimited' and writes nothing.
--   (i) as anon: enabled packages and valid prices only; updated_by refused.
--   The rows are scratch: a market XZ (the INC-949 proof's way), three users, three categories,
--   one listing, one package and its prices; the proof reads no real row (G27).
DO $proof$
DECLARE
  v_res     regprocedure := 'public.package_price_for(uuid,text)'::regprocedure;
  v_save    regprocedure := 'public.admin_save_listing_package(text,text,integer,boolean,boolean,boolean,text,integer)'::regprocedure;
  v_price   regprocedure := 'public.admin_save_package_price(text,numeric,character,character,uuid,timestamptz,timestamptz)'::regprocedure;
  v_end     regprocedure := 'public.admin_end_package_price(uuid,timestamptz)'::regprocedure;
  v_fn      regprocedure;
  v_admin   uuid := gen_random_uuid();
  v_plain   uuid := gen_random_uuid();
  v_seller  uuid := gen_random_uuid();
  v_session uuid := gen_random_uuid();
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
  v_a       uuid;
  v_b       uuid;
  v_c       uuid;
  v_d       uuid;
  v_e       uuid;
  v_f       uuid;
  v_g       uuid;
  v_h       uuid;
  v_prices  integer;
  v_answer  jsonb;
  v_msg     text;
  v_state   text;
  v_case    text;
  v_col     text;
  v_role    text;
  v_n       integer;
BEGIN
  -- (a) the functions
  IF (SELECT prosecdef OR provolatile <> 's' OR proconfig::text <> '{search_path=public}' FROM pg_proc WHERE oid = v_res)
     OR NOT has_function_privilege('anon', v_res, 'EXECUTE')
     OR NOT has_function_privilege('authenticated', v_res, 'EXECUTE')
     OR NOT has_function_privilege('service_role', v_res, 'EXECUTE') THEN
    RAISE EXCEPTION 'P-1 M1b proof (a): the resolver''s header or grants differ';
  END IF;
  FOREACH v_fn IN ARRAY ARRAY[v_save, v_price, v_end] LOOP
    IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}'
          FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'P-1 M1b proof (a): the header or the grants of % differ', v_fn;
    END IF;
  END LOOP;
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

    -- A scratch tree: root → leaf, and another root; written before any caller is set (the
    -- catalogue guard judges signed-in writes only).
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES ('E2E P1 M1b Root', v_tag || '-root', true, true, false, 9997) RETURNING id INTO v_root;
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES ('E2E P1 M1b Leaf', v_tag || '-leaf', true, true, true, 9998) RETURNING id INTO v_leaf;
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES ('E2E P1 M1b Other', v_tag || '-other', true, true, true, 9999) RETURNING id INTO v_other;
    INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order)
    VALUES (NULL, v_root, 9997), (v_root, v_leaf, 1), (NULL, v_other, 9999);

    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
      (v_admin, v_tag || '-admin@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_plain, v_tag || '-plain@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_seller, v_tag || '-seller@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO public.user_roles (user_id, role_id, scope_type)
    SELECT v_admin, r.id, 'global' FROM public.roles r WHERE r.name = 'super_admin';
    INSERT INTO auth.sessions (id, user_id, created_at, updated_at, aal)
    VALUES (v_session, v_admin, now(), now(), 'aal2');
    INSERT INTO auth.mfa_factors (id, user_id, friendly_name, factor_type, status, created_at, updated_at, secret)
    VALUES (gen_random_uuid(), v_admin, v_tag, 'totp', 'verified', now(), now(), 'PROOFSECRET');
    INSERT INTO auth.mfa_amr_claims (id, session_id, created_at, updated_at, authentication_method)
    VALUES (gen_random_uuid(), v_session, now(), now(), 'totp');
    -- (h) the dial: one success fills the window; the override is widened after the check.
    INSERT INTO public.rate_overrides (user_id, action, max_count) VALUES (v_admin, 'staff_config', 1);

    -- A live listing in the leaf, placed in the scratch city (listings_place_unless_draft).
    INSERT INTO public.listings (seller_id, category_id, location_id, title, description, home_country_code,
                                 status, published_at, published_first_at, expires_at)
    VALUES (v_seller, v_leaf, v_city, 'E2E P1 M1b live', 'scratch', v_code,
            'active', now(), now(), now() + interval '28 days')
    RETURNING id INTO v_live;

    PERFORM set_config('request.jwt.claims',
      json_build_object('sub', v_admin::text, 'role', 'authenticated', 'aal', 'aal2',
                        'session_id', v_session::text,
                        'amr', json_build_array(json_build_object('method', 'totp')))::text, true);

    -- (b) create
    v_answer := public.admin_save_listing_package(v_pkg, 'premium', 7, true, true, true, 'package.e2e_mig', 99);
    IF v_answer IS DISTINCT FROM jsonb_build_object('ok', true, 'key', v_pkg, 'created', true) THEN
      RAISE EXCEPTION 'P-1 M1b proof (b): create answered %', v_answer;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.listing_packages
                    WHERE key = v_pkg AND tier = 'premium' AND days = 7 AND enabled AND self_serve AND extends_lifetime
                      AND label_key = 'package.e2e_mig' AND sort = 99 AND updated_by = v_admin)
       OR (SELECT count(*) FROM public.audit_log WHERE action = 'package.saved' AND entity_id = v_pkg) <> 1
       OR NOT EXISTS (SELECT 1 FROM public.audit_log
                       WHERE action = 'package.saved' AND entity_id = v_pkg AND actor_id = v_admin
                         AND entity_type = 'listing_package'
                         AND meta->'old' = 'null'::jsonb AND meta->'new'->>'days' = '7') THEN
      RAISE EXCEPTION 'P-1 M1b proof (b): the created row or its audit row differ';
    END IF;

    -- (h) the window of 1 is full: the next call is refused and writes nothing.
    v_msg := NULL;
    BEGIN
      PERFORM public.admin_save_listing_package(v_pkg, 'premium', 8, true, true, true);
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    IF v_msg IS DISTINCT FROM 'rateLimited'
       OR (SELECT days FROM public.listing_packages WHERE key = v_pkg) <> 7
       OR (SELECT count(*) FROM public.audit_log WHERE action = 'package.saved' AND entity_id = v_pkg) <> 1 THEN
      RAISE EXCEPTION 'P-1 M1b proof (h): answered % or wrote', coalesce(v_msg, 'success');
    END IF;
    UPDATE public.rate_overrides SET max_count = 1000 WHERE user_id = v_admin AND action = 'staff_config';

    -- (b) edit: old → new; days 14, switched off.
    v_answer := public.admin_save_listing_package(v_pkg, 'featured', 14, false, false, false, NULL, NULL);
    IF v_answer IS DISTINCT FROM jsonb_build_object('ok', true, 'key', v_pkg, 'created', false)
       OR NOT EXISTS (SELECT 1 FROM public.listing_packages
                       WHERE key = v_pkg AND tier = 'featured' AND days = 14 AND NOT enabled AND NOT self_serve
                         AND NOT extends_lifetime AND label_key = 'package.e2e_mig' AND sort = 99)
       OR NOT EXISTS (SELECT 1 FROM public.audit_log
                       WHERE action = 'package.saved' AND entity_id = v_pkg
                         AND meta->'old'->>'days' = '7' AND meta->'new'->>'days' = '14'
                         AND meta->'old'->>'enabled' = 'true' AND meta->'new'->>'enabled' = 'false') THEN
      RAISE EXCEPTION 'P-1 M1b proof (b): the edited row or its audit row differ';
    END IF;

    -- (c) six price rows, each a window open since an hour ago.
    v_a := (public.admin_save_package_price(v_pkg, 1.00, v_cur, v_code, v_leaf, now() - interval '1 hour')->>'id')::uuid;
    v_b := (public.admin_save_package_price(v_pkg, 2.00, v_cur, v_code, NULL, now() - interval '1 hour')->>'id')::uuid;
    v_c := (public.admin_save_package_price(v_pkg, 3.00, v_cur, NULL, v_leaf, now() - interval '1 hour')->>'id')::uuid;
    v_d := (public.admin_save_package_price(v_pkg, 5.00, v_cur, NULL, v_root, now() - interval '1 hour')->>'id')::uuid;
    v_e := (public.admin_save_package_price(v_pkg, 4.00, v_cur, NULL, NULL, now() - interval '1 hour')->>'id')::uuid;
    v_f := (public.admin_save_package_price(v_pkg, 9.00, v_cur, v_code, v_other, now() - interval '1 hour')->>'id')::uuid;
    IF (SELECT count(*) FROM public.package_prices WHERE package_key = v_pkg) <> 6
       OR (SELECT count(*) FROM public.audit_log WHERE action = 'package_price.saved'
            AND entity_id IN (v_a::text, v_b::text, v_c::text, v_d::text, v_e::text, v_f::text)) <> 6
       OR NOT EXISTS (SELECT 1 FROM public.package_prices
                       WHERE id = v_a AND amount = 1.00 AND currency = v_cur AND country_code = v_code
                         AND category_id = v_leaf AND valid_to IS NULL AND updated_by = v_admin) THEN
      RAISE EXCEPTION 'P-1 M1b proof (c): the price rows or their audit rows differ';
    END IF;
    -- The package is off (b): not offered.
    IF public.package_price_for(v_live, v_pkg) IS NOT NULL THEN
      RAISE EXCEPTION 'P-1 M1b proof (b): a switched-off package resolved a price';
    END IF;
    PERFORM public.admin_save_listing_package(v_pkg, 'featured', 14, true, true, true, NULL, NULL);
    -- The precedence.
    v_answer := public.package_price_for(v_live, v_pkg);
    IF v_answer IS NULL OR (v_answer->>'price_id')::uuid <> v_a OR (v_answer->>'amount')::numeric <> 1.00
       OR v_answer->>'currency' <> v_cur OR v_answer->>'country_code' <> v_code
       OR (v_answer->>'category_id')::uuid <> v_leaf THEN
      RAISE EXCEPTION 'P-1 M1b proof (c): (market, leaf) answered %', v_answer;
    END IF;

    -- (d) overlaps before anything ends: the same scope again, open and future.
    FOR v_case IN VALUES ('same'), ('future') LOOP
      v_msg := NULL;
      BEGIN
        CASE v_case
          WHEN 'same' THEN PERFORM public.admin_save_package_price(v_pkg, 1.50, v_cur, v_code, v_leaf);
          WHEN 'future' THEN PERFORM public.admin_save_package_price(v_pkg, 1.50, v_cur, v_code, v_leaf, now() + interval '1 day', now() + interval '2 days');
        END CASE;
      EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
      END;
      IF v_msg IS DISTINCT FROM 'overlapping window' THEN
        RAISE EXCEPTION 'P-1 M1b proof (d): % answered %', v_case, coalesce(v_msg, 'success');
      END IF;
    END LOOP;
    IF (SELECT count(*) FROM public.package_prices WHERE package_key = v_pkg) <> 6 THEN
      RAISE EXCEPTION 'P-1 M1b proof (d): a refused overlap wrote';
    END IF;

    -- (c) end A → B.
    v_answer := public.admin_end_package_price(v_a, now());
    IF v_answer->>'ok' <> 'true' OR (SELECT valid_to FROM public.package_prices WHERE id = v_a) IS DISTINCT FROM now()
       OR NOT EXISTS (SELECT 1 FROM public.audit_log
                       WHERE action = 'package_price.ended' AND entity_id = v_a::text AND actor_id = v_admin
                         AND meta->>'package' = v_pkg AND meta ? 'to' AND NOT meta ? 'from') THEN
      RAISE EXCEPTION 'P-1 M1b proof (c): ending A differs (%)', v_answer;
    END IF;
    IF (public.package_price_for(v_live, v_pkg)->>'price_id')::uuid <> v_b THEN
      RAISE EXCEPTION 'P-1 M1b proof (c): after A, (market, any) was not picked';
    END IF;
    -- (d) adjacent future windows on A's scope are accepted; an end that would overlap is refused.
    v_g := (public.admin_save_package_price(v_pkg, 1.50, v_cur, v_code, v_leaf, now() + interval '1 day', now() + interval '2 days')->>'id')::uuid;
    v_h := (public.admin_save_package_price(v_pkg, 1.75, v_cur, v_code, v_leaf, now() + interval '2 days', now() + interval '3 days')->>'id')::uuid;
    v_msg := NULL;
    BEGIN
      PERFORM public.admin_end_package_price(v_g, now() + interval '2 days 12 hours');
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    IF v_msg IS DISTINCT FROM 'overlapping window'
       OR (SELECT valid_to FROM public.package_prices WHERE id = v_g) IS DISTINCT FROM now() + interval '2 days' THEN
      RAISE EXCEPTION 'P-1 M1b proof (d): the overlapping end answered % or wrote', coalesce(v_msg, 'success');
    END IF;
    -- A future row is not yet valid: B still answers.
    IF (public.package_price_for(v_live, v_pkg)->>'price_id')::uuid <> v_b THEN
      RAISE EXCEPTION 'P-1 M1b proof (c): a future window was picked';
    END IF;
    -- (c) end B → C (leaf, depth 0) → D (root, depth 1) → E (any) → NULL.
    PERFORM public.admin_end_package_price(v_b, now());
    IF (public.package_price_for(v_live, v_pkg)->>'price_id')::uuid <> v_c THEN
      RAISE EXCEPTION 'P-1 M1b proof (c): after B, (any, leaf) was not picked';
    END IF;
    PERFORM public.admin_end_package_price(v_c, now());
    IF (public.package_price_for(v_live, v_pkg)->>'price_id')::uuid <> v_d THEN
      RAISE EXCEPTION 'P-1 M1b proof (c): after C, (any, root) was not picked';
    END IF;
    PERFORM public.admin_end_package_price(v_d, now());
    IF (public.package_price_for(v_live, v_pkg)->>'price_id')::uuid <> v_e THEN
      RAISE EXCEPTION 'P-1 M1b proof (c): after D, (any, any) was not picked';
    END IF;
    PERFORM public.admin_end_package_price(v_e, now());
    IF public.package_price_for(v_live, v_pkg) IS NOT NULL THEN
      RAISE EXCEPTION 'P-1 M1b proof (c): with no row left, a price was answered';
    END IF;
    IF public.package_price_for(v_live, 'e2e_mig_none') IS NOT NULL
       OR public.package_price_for(gen_random_uuid(), v_pkg) IS NOT NULL THEN
      RAISE EXCEPTION 'P-1 M1b proof (c): an unknown package or listing answered a price';
    END IF;
    IF (SELECT count(*) FROM public.package_prices WHERE package_key = v_pkg) <> 8
       OR (SELECT count(*) FROM public.audit_log WHERE action = 'package_price.ended'
            AND entity_id IN (v_a::text, v_b::text, v_c::text, v_d::text, v_e::text, v_f::text, v_g::text, v_h::text)) <> 5 THEN
      RAISE EXCEPTION 'P-1 M1b proof (c): the rows or the end audit rows differ';
    END IF;

    -- (e) each refusal with its own words; nothing written after them.
    SELECT count(*) INTO v_prices FROM public.package_prices WHERE package_key = v_pkg;
    FOR v_case IN VALUES ('bad key'), ('unknown tier'), ('bad days'), ('bad label key'),
                         ('unknown package'), ('bad amount'), ('unknown currency'), ('unknown country'),
                         ('unknown category'), ('bad window'), ('price not found'), ('end bad window'),
                         ('price already ended') LOOP
      v_msg := NULL;
      BEGIN
        CASE v_case
          WHEN 'bad key' THEN PERFORM public.admin_save_listing_package('Bad', 'premium', 7, true, true, true);
          WHEN 'unknown tier' THEN PERFORM public.admin_save_listing_package(v_pkg, 'gold', 7, true, true, true);
          WHEN 'bad days' THEN PERFORM public.admin_save_listing_package(v_pkg, 'premium', 0, true, true, true);
          WHEN 'bad label key' THEN PERFORM public.admin_save_listing_package(v_pkg, 'premium', 7, true, true, true, 'Bad Key');
          WHEN 'unknown package' THEN PERFORM public.admin_save_package_price('e2e_mig_none', 0, v_cur);
          WHEN 'bad amount' THEN PERFORM public.admin_save_package_price(v_pkg, -1, v_cur);
          WHEN 'unknown currency' THEN PERFORM public.admin_save_package_price(v_pkg, 0, 'e2e');
          -- 'XQ' is no market: a scratch code the countries table never holds (K4 exception, as 'XZ').
          WHEN 'unknown country' THEN PERFORM public.admin_save_package_price(v_pkg, 0, v_cur, 'XQ');
          WHEN 'unknown category' THEN PERFORM public.admin_save_package_price(v_pkg, 0, v_cur, NULL, gen_random_uuid());
          WHEN 'bad window' THEN PERFORM public.admin_save_package_price(v_pkg, 0, v_cur, NULL, NULL, now(), now() - interval '1 minute');
          WHEN 'price not found' THEN PERFORM public.admin_end_package_price(gen_random_uuid());
          WHEN 'end bad window' THEN PERFORM public.admin_end_package_price(v_h, now() + interval '1 day');
          WHEN 'price already ended' THEN PERFORM public.admin_end_package_price(v_a, now() + interval '1 day');
        END CASE;
      EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
      END;
      IF v_msg IS DISTINCT FROM (CASE v_case WHEN 'end bad window' THEN 'bad window' ELSE v_case END) THEN
        RAISE EXCEPTION 'P-1 M1b proof (e): % answered %', v_case, coalesce(v_msg, 'success');
      END IF;
    END LOOP;

    -- (f) a plain user; (g) the super admin on aal1.
    PERFORM set_config('request.jwt.claims',
      json_build_object('sub', v_plain::text, 'role', 'authenticated')::text, true);
    FOR v_case IN VALUES ('save'), ('price'), ('end') LOOP
      v_msg := NULL;
      BEGIN
        CASE v_case
          WHEN 'save' THEN PERFORM public.admin_save_listing_package(v_pkg, 'premium', 7, true, true, true);
          WHEN 'price' THEN PERFORM public.admin_save_package_price(v_pkg, 0, v_cur);
          WHEN 'end' THEN PERFORM public.admin_end_package_price(v_h);
        END CASE;
      EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
      END;
      IF v_msg IS DISTINCT FROM 'permission denied' THEN
        RAISE EXCEPTION 'P-1 M1b proof (f): % answered %', v_case, coalesce(v_msg, 'success');
      END IF;
    END LOOP;
    PERFORM set_config('request.jwt.claims',
      json_build_object('sub', v_admin::text, 'role', 'authenticated', 'aal', 'aal1',
                        'session_id', v_session::text)::text, true);
    FOR v_case IN VALUES ('save'), ('price'), ('end') LOOP
      v_state := NULL;
      BEGIN
        CASE v_case
          WHEN 'save' THEN PERFORM public.admin_save_listing_package(v_pkg, 'premium', 7, true, true, true);
          WHEN 'price' THEN PERFORM public.admin_save_package_price(v_pkg, 0, v_cur);
          WHEN 'end' THEN PERFORM public.admin_end_package_price(v_h);
        END CASE;
      EXCEPTION WHEN OTHERS THEN v_state := SQLSTATE; v_msg := SQLERRM;
      END;
      IF v_state IS DISTINCT FROM 'P0009' THEN
        RAISE EXCEPTION 'P-1 M1b proof (g): % answered % %', v_case, coalesce(v_state, 'success'), v_msg;
      END IF;
    END LOOP;
    PERFORM set_config('request.jwt.claims', '{}', true);
    IF (SELECT count(*) FROM public.package_prices WHERE package_key = v_pkg) <> v_prices
       OR (SELECT days FROM public.listing_packages WHERE key = v_pkg) <> 14
       OR (SELECT valid_to FROM public.package_prices WHERE id = v_h) IS DISTINCT FROM now() + interval '3 days'
       OR (SELECT count(*) FROM public.audit_log WHERE action = 'package.saved' AND entity_id = v_pkg) <> 3
       OR (SELECT count(*) FROM public.audit_log WHERE action = 'package_price.ended'
            AND entity_id IN (v_a::text, v_b::text, v_c::text, v_d::text, v_e::text, v_f::text, v_g::text, v_h::text)) <> 5 THEN
      RAISE EXCEPTION 'P-1 M1b proof (e-g): a refused call wrote';
    END IF;

    -- (i) as anon: the package while on; of the eight prices only F is valid now (A–E ended at
    -- now(), G and H start tomorrow); never updated_by.
    SET LOCAL ROLE anon;
    SELECT count(*) INTO v_n FROM public.listing_packages WHERE key = v_pkg;
    IF v_n <> 1 THEN RESET ROLE; RAISE EXCEPTION 'P-1 M1b proof (i): anon does not see the enabled package'; END IF;
    SELECT count(*) INTO v_n FROM public.package_prices WHERE package_key = v_pkg AND id <> v_f;
    IF v_n <> 0 THEN RESET ROLE; RAISE EXCEPTION 'P-1 M1b proof (i): anon sees % ended or future prices', v_n; END IF;
    SELECT count(*) INTO v_n FROM public.package_prices WHERE id = v_f;
    IF v_n <> 1 THEN RESET ROLE; RAISE EXCEPTION 'P-1 M1b proof (i): anon does not see the valid price'; END IF;
    v_state := NULL;
    BEGIN
      PERFORM p.updated_by FROM public.package_prices p WHERE false;
    EXCEPTION WHEN OTHERS THEN v_state := SQLSTATE;
    END;
    IF v_state IS DISTINCT FROM '42501' THEN RESET ROLE; RAISE EXCEPTION 'P-1 M1b proof (i): anon read updated_by (%)', coalesce(v_state, 'no error'); END IF;
    RESET ROLE;
    UPDATE public.listing_packages SET enabled = false WHERE key = v_pkg;
    SET LOCAL ROLE anon;
    SELECT count(*) INTO v_n FROM public.listing_packages WHERE key = v_pkg;
    RESET ROLE;
    IF v_n <> 0 THEN RAISE EXCEPTION 'P-1 M1b proof (i): anon sees a switched-off package'; END IF;

    RAISE EXCEPTION 'p1-m1b-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1-m1b-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261102230000') ON CONFLICT DO NOTHING;
