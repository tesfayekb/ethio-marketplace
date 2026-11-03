-- e2e-areas: admin-monetisation
-- Turn P-1b part A, M-b (model v2 §1, §4; D287, D288, D301, D304; ruling 1 §2 Q1, Q4, §3 g, h) —
-- one prices table for every product kind. public.package_prices gains credit_cost (what the row
-- costs in credits, D304; NOT NULL with no default — the table holds no row on either database,
-- ruling 1 Q4; a non-empty table stops the apply, which is the finding), used_count (P-2's apply
-- door counts the row's uses; staff never write it) and created_by. The resolver splits into a
-- core, public.product_price_for(product, category, country) — M1b's precedence over the given
-- category chain and market, any product kind while enabled — and the listing wrapper
-- public.package_price_for(listing, package), redeclared over the core (same signature); both
-- answer credit_cost and used_count beside the price. Doors behind packages:update with a second
-- factor and the staff_config dial: admin_save_package_price takes the credit cost (a new
-- argument list: DROP + CREATE), admin_edit_package_price edits a row until its first use (D288:
-- used_count > 0 refuses 'price in use'; the window and scope rules of the save door; overlap
-- judged without itself), admin_end_package_price is unchanged (M1c's live body).

-- ------------------------------------------------------------ 1. THE COLUMNS
ALTER TABLE public.package_prices
  ADD COLUMN credit_cost integer NOT NULL CHECK (credit_cost >= 0),
  ADD COLUMN used_count  integer NOT NULL DEFAULT 0 CHECK (used_count >= 0),
  ADD COLUMN created_by  uuid NULL REFERENCES public.profiles(user_id) ON DELETE SET NULL;
UPDATE public.package_prices SET created_by = updated_by;
COMMENT ON COLUMN public.package_prices.credit_cost IS
  'D304 — the row''s cost in credits (0 = free with credits); the money price is amount + currency (P-1b).';
COMMENT ON COLUMN public.package_prices.used_count IS
  'D288 — how many times the row priced an ad (P-2''s apply door); a used row is ended, never edited (P-1b).';
-- The browser roles' column grant restated for the new shape (ruling 1 §3 g): never created_by
-- or updated_by.
GRANT SELECT (id, package_key, country_code, category_id, amount, currency, credit_cost, used_count, valid_from, valid_to, created_at, updated_at)
  ON public.package_prices TO anon, authenticated;

-- ------------------------------------------------------------ 2. THE RESOLVER
-- The core (CF-PRICE-1): the most specific valid row for a product, a category chain and a market
-- — (market, category) over (market, any) over (any, category) over (any, any), the nearest
-- ancestor first; none = not offered (NULL).
CREATE FUNCTION public.product_price_for(p_product_key text, p_category_id uuid, p_country_code character)
RETURNS jsonb
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public
AS $fn$
  WITH RECURSIVE
  cats(id, depth) AS (
    SELECT p_category_id, 0 WHERE p_category_id IS NOT NULL
    UNION
    SELECT t.parent_id, c.depth + 1
      FROM cats c
      JOIN public.category_tree_pointers t ON t.child_id = c.id
     WHERE t.parent_id IS NOT NULL AND c.depth < 32
  ),
  picked AS (
    SELECT p.id, p.amount, p.currency, p.credit_cost, p.used_count, p.valid_from, p.valid_to, p.country_code, p.category_id
      FROM public.package_prices p
      JOIN public.listing_packages k ON k.key = p.package_key AND k.enabled
      LEFT JOIN cats c ON c.id = p.category_id
     WHERE p.package_key = p_product_key
       AND p.valid_from <= now()
       AND (p.valid_to IS NULL OR p.valid_to > now())
       AND (p.country_code IS NULL OR p.country_code = p_country_code)
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
           'credit_cost', picked.credit_cost,
           'used_count', picked.used_count,
           'valid_from', picked.valid_from,
           'valid_to', picked.valid_to,
           'country_code', picked.country_code,
           'category_id', picked.category_id)
    FROM picked;
$fn$;
REVOKE ALL ON FUNCTION public.product_price_for(text, uuid, character) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.product_price_for(text, uuid, character) TO anon, authenticated, service_role;

-- The listing wrapper: the ad's category and the country of its primary place (M1b's rule), then
-- the core. SECURITY INVOKER: the caller sees the ad through its own policies; an unknown ad is NULL.
CREATE OR REPLACE FUNCTION public.package_price_for(p_listing_id uuid, p_package_key text)
RETURNS jsonb
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public
AS $fn$
  SELECT public.product_price_for(p_package_key, l.category_id, loc.country_code)
    FROM public.listings l
    LEFT JOIN public.locations loc ON loc.id = l.location_id
   WHERE l.id = p_listing_id;
$fn$;
REVOKE ALL ON FUNCTION public.package_price_for(uuid, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.package_price_for(uuid, text) TO anon, authenticated, service_role;

-- ------------------------------------------------------------ 3. THE DOORS
DROP FUNCTION public.admin_save_package_price(text, numeric, character, character, uuid, timestamp with time zone, timestamp with time zone);

CREATE FUNCTION public.admin_save_package_price(p_package_key text, p_amount numeric, p_currency character, p_credit_cost integer, p_country_code character DEFAULT NULL::bpchar, p_category_id uuid DEFAULT NULL::uuid, p_valid_from timestamp with time zone DEFAULT NULL::timestamp with time zone, p_valid_to timestamp with time zone DEFAULT NULL::timestamp with time zone)
 RETURNS jsonb
 LANGUAGE plpgsql
 VOLATILE
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid  uuid := auth.uid();
  v_from timestamptz := coalesce(p_valid_from, now());
  v_row  public.package_prices%ROWTYPE;
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'not signed in';
  END IF;
  IF NOT public.has_permission(v_uid, 'packages', 'update') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('packages', 'update');
  IF NOT coalesce((public.rate_gate('staff_config')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;

  -- The product row is the lock for every window of its prices.
  PERFORM 1 FROM public.listing_packages k WHERE k.key = p_package_key FOR UPDATE;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'unknown package';
  END IF;
  IF p_amount IS NULL OR p_amount < 0 THEN
    RAISE EXCEPTION 'bad amount';
  END IF;
  IF p_credit_cost IS NULL OR p_credit_cost < 0 THEN
    RAISE EXCEPTION 'bad credit cost';
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

  INSERT INTO public.package_prices
    (package_key, country_code, category_id, amount, currency, credit_cost, valid_from, valid_to, created_by, updated_by)
  VALUES (p_package_key, p_country_code, p_category_id, p_amount, p_currency, p_credit_cost, v_from, p_valid_to, v_uid, v_uid)
  RETURNING * INTO v_row;
  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
    VALUES (v_uid, 'package_price.saved', 'package_price', v_row.id::text,
            jsonb_strip_nulls(jsonb_build_object(
              'package', p_package_key, 'country_code', p_country_code, 'category_id', p_category_id,
              'amount', p_amount, 'currency', p_currency, 'credit_cost', p_credit_cost,
              'valid_from', v_from, 'valid_to', p_valid_to)));

  RETURN jsonb_build_object('ok', true, 'id', v_row.id);
END $function$;
REVOKE ALL ON FUNCTION public.admin_save_package_price(text, numeric, character, integer, character, uuid, timestamptz, timestamptz) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_save_package_price(text, numeric, character, integer, character, uuid, timestamptz, timestamptz) TO authenticated, service_role;

-- D288 — a row is edited until its first use; after that it is ended and a new row written. A
-- NULL p_valid_from keeps the stored start; the scope (market, category) and the window are the
-- save door's rules; the overlap is judged against every other row of the product.
CREATE FUNCTION public.admin_edit_package_price(p_id uuid, p_amount numeric, p_currency character, p_credit_cost integer, p_country_code character DEFAULT NULL::bpchar, p_category_id uuid DEFAULT NULL::uuid, p_valid_from timestamp with time zone DEFAULT NULL::timestamp with time zone, p_valid_to timestamp with time zone DEFAULT NULL::timestamp with time zone)
 RETURNS jsonb
 LANGUAGE plpgsql
 VOLATILE
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid  uuid := auth.uid();
  v_old  public.package_prices%ROWTYPE;
  v_new  public.package_prices%ROWTYPE;
  v_from timestamptz;
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'not signed in';
  END IF;
  IF NOT public.has_permission(v_uid, 'packages', 'update') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('packages', 'update');
  IF NOT coalesce((public.rate_gate('staff_config')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;

  PERFORM 1 FROM public.listing_packages k
    JOIN public.package_prices x ON x.package_key = k.key
   WHERE x.id = p_id
   FOR UPDATE OF k;
  SELECT * INTO v_old FROM public.package_prices WHERE id = p_id FOR UPDATE;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'price not found';
  END IF;
  IF v_old.used_count > 0 THEN
    RAISE EXCEPTION 'price in use';
  END IF;
  IF v_old.valid_to IS NOT NULL AND v_old.valid_to <= now() THEN
    RAISE EXCEPTION 'price already ended';
  END IF;
  v_from := coalesce(p_valid_from, v_old.valid_from);
  IF p_amount IS NULL OR p_amount < 0 THEN
    RAISE EXCEPTION 'bad amount';
  END IF;
  IF p_credit_cost IS NULL OR p_credit_cost < 0 THEN
    RAISE EXCEPTION 'bad credit cost';
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
              WHERE x.package_key = v_old.package_key
                AND x.id <> v_old.id
                AND x.country_code IS NOT DISTINCT FROM p_country_code
                AND x.category_id IS NOT DISTINCT FROM p_category_id
                AND x.valid_from < coalesce(p_valid_to, 'infinity'::timestamptz)
                AND coalesce(x.valid_to, 'infinity'::timestamptz) > v_from) THEN
    RAISE EXCEPTION 'overlapping window';
  END IF;

  UPDATE public.package_prices
     SET country_code = p_country_code, category_id = p_category_id, amount = p_amount, currency = p_currency,
         credit_cost = p_credit_cost, valid_from = v_from, valid_to = p_valid_to, updated_by = v_uid
   WHERE id = p_id
  RETURNING * INTO v_new;
  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
    VALUES (v_uid, 'package_price.edited', 'package_price', p_id::text,
            jsonb_build_object(
              'old', to_jsonb(v_old) - 'created_by' - 'updated_by' - 'updated_at' - 'created_at',
              'new', to_jsonb(v_new) - 'created_by' - 'updated_by' - 'updated_at' - 'created_at'));

  RETURN jsonb_build_object('ok', true, 'id', p_id);
END $function$;
REVOKE ALL ON FUNCTION public.admin_edit_package_price(uuid, numeric, character, integer, character, uuid, timestamptz, timestamptz) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_edit_package_price(uuid, numeric, character, integer, character, uuid, timestamptz, timestamptz) TO authenticated, service_role;

-- PROOF (P-1b M-b): scratch rows only, rolled back by the sentinel; no real row read (G27; the
-- currency is a scratch row, INC-1040).
--   (a) the two resolvers' headers and grants (STABLE, INVOKER, search_path public; anon,
--       authenticated, service_role); the two doors' (VOLATILE, DEFINER; closed to PUBLIC and
--       anon, open to authenticated and service_role); the old save signature gone; the browser
--       roles read credit_cost and used_count, never created_by or updated_by.
--   (b) the core's precedence on six scratch rows for (leaf, XZ): (market, leaf) → (market, any)
--       → (any, leaf) → (any, root) → (any, any) → NULL as each is ended; a row for another
--       category is never picked; a future window is not yet valid; credit_cost and used_count
--       are in the answer; the wrapper answers the same for a scratch ad in the scratch city; a
--       reach-kind product is priced and resolved; a switched-off or unknown product and an
--       unknown ad answer NULL.
--   (c) a row saved with a credit cost: the row (created_by), its audit row (credit_cost).
--   (d) the row edited: amount, credit cost and window; its audit row old → new; an edit that
--       would overlap another row is refused; a row with used_count 1 is refused 'price in use'
--       and nothing is written.
--   (e) each refusal with its own words, each writing nothing; (f) a plain user: 'permission
--       denied'; (g) aal1: P0009; (h) the dial: 'rateLimited'.
DO $proof$
DECLARE
  v_core    regprocedure := 'public.product_price_for(text,uuid,character)'::regprocedure;
  v_wrap    regprocedure := 'public.package_price_for(uuid,text)'::regprocedure;
  v_save    regprocedure := 'public.admin_save_package_price(text,numeric,character,integer,character,uuid,timestamptz,timestamptz)'::regprocedure;
  v_edit    regprocedure := 'public.admin_edit_package_price(uuid,numeric,character,integer,character,uuid,timestamptz,timestamptz)'::regprocedure;
  v_fn      regprocedure;
  v_admin   uuid := gen_random_uuid();
  v_plain   uuid := gen_random_uuid();
  v_seller  uuid := gen_random_uuid();
  v_session uuid := gen_random_uuid();
  v_tag     text := 'e2e-mig-p1b-mb-' || substr(gen_random_uuid()::text, 1, 8);
  v_lv      text := 'e2e_mig_lv_' || translate(substr(gen_random_uuid()::text, 1, 8), '0123456789-', 'abcdefghijk');
  v_rc      text := 'e2e_mig_rc_' || translate(substr(gen_random_uuid()::text, 1, 8), '0123456789-', 'abcdefghijk');
  v_code    char(2) := 'XZ';
  v_cur     char(3) := 'XTS';
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
  v_h       uuid;
  v_i       uuid;
  v_answer  jsonb;
  v_msg     text;
  v_state   text;
  v_case    text;
  v_col     text;
  v_role    text;
  v_n       integer;
BEGIN
  -- (a)
  FOREACH v_fn IN ARRAY ARRAY[v_core, v_wrap] LOOP
    IF (SELECT prosecdef OR provolatile <> 's' OR proconfig::text <> '{search_path=public}' FROM pg_proc WHERE oid = v_fn)
       OR NOT has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'P-1b M-b proof (a): the header or grants of % differ', v_fn;
    END IF;
  END LOOP;
  FOREACH v_fn IN ARRAY ARRAY[v_save, v_edit] LOOP
    IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'P-1b M-b proof (a): the header or the grants of % differ', v_fn;
    END IF;
  END LOOP;
  IF to_regprocedure('public.admin_save_package_price(text,numeric,character,character,uuid,timestamptz,timestamptz)') IS NOT NULL THEN
    RAISE EXCEPTION 'P-1b M-b proof (a): the old save signature is still declared';
  END IF;
  FOREACH v_role IN ARRAY ARRAY['anon', 'authenticated'] LOOP
    FOREACH v_col IN ARRAY ARRAY['id', 'package_key', 'country_code', 'category_id', 'amount', 'currency', 'credit_cost', 'used_count', 'valid_from', 'valid_to', 'created_at', 'updated_at'] LOOP
      IF NOT has_column_privilege(v_role, 'public.package_prices', v_col, 'SELECT') THEN
        RAISE EXCEPTION 'P-1b M-b proof (a): % cannot read package_prices.%', v_role, v_col;
      END IF;
    END LOOP;
    IF has_column_privilege(v_role, 'public.package_prices', 'created_by', 'SELECT')
       OR has_column_privilege(v_role, 'public.package_prices', 'updated_by', 'SELECT')
       OR has_table_privilege(v_role, 'public.package_prices', 'INSERT, UPDATE, DELETE') THEN
      RAISE EXCEPTION 'P-1b M-b proof (a): % holds a privilege it must not', v_role;
    END IF;
  END LOOP;

  BEGIN
    -- The scratch market XZ with a region and a city (the M1b way), a scratch currency, a scratch
    -- tree (root → leaf, another root), a seller with a live ad in the leaf placed in the city,
    -- a scratch level and a scratch reach, the staff users.
    IF EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
      RAISE EXCEPTION 'P-1b M-b proof: scratch code % already exists', v_code;
    END IF;
    IF EXISTS (SELECT 1 FROM public.currencies WHERE code = v_cur) THEN
      RAISE EXCEPTION 'P-1b M-b proof: scratch currency % already exists', v_cur;
    END IF;
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_code, 'e2e-mig-p1b-mb', true);
    SELECT a.id INTO v_anc FROM public.locations a
     WHERE a.country_code = v_code AND a.level = 'country' AND a.name_en = 'e2e-mig-p1b-mb';
    IF v_anc IS NULL THEN RAISE EXCEPTION 'P-1b M-b proof: the scratch market has no anchor'; END IF;
    UPDATE public.locations SET is_active = true WHERE id = v_anc AND name_en = 'e2e-mig-p1b-mb';
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id)
    VALUES ('region', v_code, 'E2E P1b Region', v_tag || '-r', true, v_anc) RETURNING id INTO v_region;
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id, center_lat, center_lng)
    VALUES ('city', v_code, 'E2E P1b City', v_tag || '-c', true, v_region, 9.03, 38.74) RETURNING id INTO v_city;
    -- ISO 4217 keeps XTS for testing; no market ever prices in it (K4 exception, as 'XZ').
    INSERT INTO public.currencies (code, name_en, minor_units) VALUES (v_cur, 'e2e-mig-p1b-mb', 2);
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES ('E2E P1b Root', v_tag || '-root', true, true, false, 9997) RETURNING id INTO v_root;
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES ('E2E P1b Leaf', v_tag || '-leaf', true, true, true, 9998) RETURNING id INTO v_leaf;
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES ('E2E P1b Other', v_tag || '-other', true, true, true, 9999) RETURNING id INTO v_other;
    INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order)
    VALUES (NULL, v_root, 9997), (v_root, v_leaf, 1), (NULL, v_other, 9999);
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
      (v_seller, v_tag || '-seller@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_admin, v_tag || '-admin@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_plain, v_tag || '-plain@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO public.listings (seller_id, category_id, location_id, title, description, home_country_code,
                                 status, published_at, published_first_at, expires_at)
    VALUES (v_seller, v_leaf, v_city, 'E2E P1b live', 'scratch', v_code, 'active', now(), now(), now() + interval '28 days')
    RETURNING id INTO v_live;
    INSERT INTO public.listing_packages (key, kind, name_en, days, max_photos, placement, badge, enabled, self_serve, extends_lifetime, sort)
    VALUES (v_lv, 'level', 'E2E level', 7, 5, 'boost', false, true, true, true, 99);
    INSERT INTO public.listing_packages (key, kind, name_en, days, enabled, self_serve, extends_lifetime, sort)
    VALUES (v_rc, 'reach', 'E2E reach', 30, true, true, false, 199);
    INSERT INTO public.user_roles (user_id, role_id, scope_type)
    SELECT v_admin, r.id, 'global' FROM public.roles r WHERE r.name = 'super_admin';
    INSERT INTO auth.sessions (id, user_id, created_at, updated_at, aal)
    VALUES (v_session, v_admin, now(), now(), 'aal2');
    INSERT INTO auth.mfa_factors (id, user_id, friendly_name, factor_type, status, created_at, updated_at, secret)
    VALUES (gen_random_uuid(), v_admin, v_tag, 'totp', 'verified', now(), now(), 'PROOFSECRET');
    INSERT INTO auth.mfa_amr_claims (id, session_id, created_at, updated_at, authentication_method)
    VALUES (gen_random_uuid(), v_session, now(), now(), 'totp');
    INSERT INTO public.rate_overrides (user_id, action, max_count) VALUES (v_admin, 'staff_config', 1);

    -- (b) the six rows, written by the migration's own role, and a future one.
    INSERT INTO public.package_prices (id, package_key, country_code, category_id, amount, currency, credit_cost, valid_from, valid_to) VALUES
      (v_a, v_lv, v_code, v_leaf,  1.00, v_cur, 3, now() - interval '1 hour', NULL),
      (v_b, v_lv, v_code, NULL,    2.00, v_cur, 2, now() - interval '1 hour', NULL),
      (v_c, v_lv, NULL,   v_leaf,  3.00, v_cur, 2, now() - interval '1 hour', NULL),
      (v_d, v_lv, NULL,   v_root,  5.00, v_cur, 1, now() - interval '1 hour', NULL),
      (v_e, v_lv, NULL,   NULL,    4.00, v_cur, 1, now() - interval '1 hour', NULL),
      (v_f, v_lv, v_code, v_other, 9.00, v_cur, 9, now() - interval '1 hour', NULL),
      (v_g, v_lv, v_code, v_leaf,  0.50, v_cur, 0, now() + interval '1 day', now() + interval '2 days');
    v_answer := public.product_price_for(v_lv, v_leaf, v_code);
    IF v_answer IS NULL OR (v_answer->>'price_id')::uuid <> v_a OR (v_answer->>'amount')::numeric <> 1.00
       OR v_answer->>'currency' <> v_cur OR (v_answer->>'credit_cost')::integer <> 3 OR (v_answer->>'used_count')::integer <> 0
       OR v_answer->>'country_code' <> v_code OR (v_answer->>'category_id')::uuid <> v_leaf OR v_answer->>'valid_to' IS NOT NULL THEN
      RAISE EXCEPTION 'P-1b M-b proof (b): (market, leaf) answered %', v_answer;
    END IF;
    IF public.package_price_for(v_live, v_lv) IS DISTINCT FROM v_answer THEN
      RAISE EXCEPTION 'P-1b M-b proof (b): the wrapper answered differently for the scratch ad';
    END IF;
    UPDATE public.package_prices SET valid_to = now() WHERE id = v_a;
    IF (public.product_price_for(v_lv, v_leaf, v_code)->>'price_id')::uuid <> v_b THEN
      RAISE EXCEPTION 'P-1b M-b proof (b): after A, (market, any) was not picked';
    END IF;
    UPDATE public.package_prices SET valid_to = now() WHERE id = v_b;
    IF (public.product_price_for(v_lv, v_leaf, v_code)->>'price_id')::uuid <> v_c THEN
      RAISE EXCEPTION 'P-1b M-b proof (b): after B, (any, leaf) was not picked';
    END IF;
    UPDATE public.package_prices SET valid_to = now() WHERE id = v_c;
    IF (public.product_price_for(v_lv, v_leaf, v_code)->>'price_id')::uuid <> v_d THEN
      RAISE EXCEPTION 'P-1b M-b proof (b): after C, (any, root) was not picked';
    END IF;
    UPDATE public.package_prices SET valid_to = now() WHERE id = v_d;
    IF (public.product_price_for(v_lv, v_leaf, v_code)->>'price_id')::uuid <> v_e THEN
      RAISE EXCEPTION 'P-1b M-b proof (b): after D, (any, any) was not picked';
    END IF;
    UPDATE public.package_prices SET valid_to = now() WHERE id = v_e;
    IF public.product_price_for(v_lv, v_leaf, v_code) IS NOT NULL OR public.package_price_for(v_live, v_lv) IS NOT NULL THEN
      RAISE EXCEPTION 'P-1b M-b proof (b): with no valid row, a price was answered';
    END IF;
    UPDATE public.package_prices SET valid_to = NULL WHERE id = v_a;
    UPDATE public.listing_packages SET enabled = false WHERE key = v_lv;
    IF public.product_price_for(v_lv, v_leaf, v_code) IS NOT NULL THEN
      RAISE EXCEPTION 'P-1b M-b proof (b): a switched-off product resolved a price';
    END IF;
    UPDATE public.listing_packages SET enabled = true WHERE key = v_lv;
    IF (public.product_price_for(v_lv, v_leaf, v_code)->>'price_id')::uuid <> v_a
       OR public.product_price_for('e2e_mig_none', v_leaf, v_code) IS NOT NULL
       OR public.package_price_for(gen_random_uuid(), v_lv) IS NOT NULL THEN
      RAISE EXCEPTION 'P-1b M-b proof (b): an unknown product or ad answered, or A did not return';
    END IF;
    INSERT INTO public.package_prices (package_key, country_code, amount, currency, credit_cost, valid_from)
    VALUES (v_rc, v_code, 7.00, v_cur, 2, now() - interval '1 hour');
    v_answer := public.product_price_for(v_rc, NULL, v_code);
    IF (v_answer->>'amount')::numeric <> 7.00 OR (v_answer->>'credit_cost')::integer <> 2 THEN
      RAISE EXCEPTION 'P-1b M-b proof (b): the reach product answered %', v_answer;
    END IF;
    DELETE FROM public.package_prices WHERE package_key IN (v_lv, v_rc);

    -- (c) the save door as the scratch super admin on aal2.
    PERFORM set_config('request.jwt.claims',
      json_build_object('sub', v_admin::text, 'role', 'authenticated', 'aal', 'aal2',
                        'session_id', v_session::text,
                        'amr', json_build_array(json_build_object('method', 'totp')))::text, true);
    v_h := (public.admin_save_package_price(v_lv, 1.00, v_cur, 3, NULL, v_leaf, now() - interval '1 hour')->>'id')::uuid;
    IF NOT EXISTS (SELECT 1 FROM public.package_prices
                    WHERE id = v_h AND amount = 1.00 AND currency = v_cur AND credit_cost = 3 AND used_count = 0
                      AND country_code IS NULL AND category_id = v_leaf AND valid_from = now() - interval '1 hour'
                      AND valid_to IS NULL AND created_by = v_admin AND updated_by = v_admin)
       OR NOT EXISTS (SELECT 1 FROM public.audit_log
                       WHERE action = 'package_price.saved' AND entity_id = v_h::text AND actor_id = v_admin
                         AND entity_type = 'package_price' AND meta->>'package' = v_lv AND meta->>'credit_cost' = '3') THEN
      RAISE EXCEPTION 'P-1b M-b proof (c): the saved row or its audit row differ';
    END IF;
    -- (h) the window of 1 is full.
    v_msg := NULL;
    BEGIN
      PERFORM public.admin_save_package_price(v_lv, 2.00, v_cur, 2);
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    IF v_msg IS DISTINCT FROM 'rateLimited' OR (SELECT count(*) FROM public.package_prices WHERE package_key = v_lv) <> 1 THEN
      RAISE EXCEPTION 'P-1b M-b proof (h): answered % or wrote', coalesce(v_msg, 'success');
    END IF;
    UPDATE public.rate_overrides SET max_count = 1000 WHERE user_id = v_admin AND action = 'staff_config';
    v_i := (public.admin_save_package_price(v_lv, 2.00, v_cur, 2, NULL, NULL, now() - interval '1 hour')->>'id')::uuid;

    -- (d) edit H: amount, credit cost, an end; old → new.
    v_answer := public.admin_edit_package_price(v_h, 1.50, v_cur, 4, NULL, v_leaf, NULL, now() + interval '30 days');
    IF v_answer IS DISTINCT FROM jsonb_build_object('ok', true, 'id', v_h)
       OR NOT EXISTS (SELECT 1 FROM public.package_prices
                       WHERE id = v_h AND amount = 1.50 AND credit_cost = 4 AND valid_from = now() - interval '1 hour'
                         AND valid_to = now() + interval '30 days' AND category_id = v_leaf)
       OR NOT EXISTS (SELECT 1 FROM public.audit_log
                       WHERE action = 'package_price.edited' AND entity_id = v_h::text AND actor_id = v_admin
                         AND entity_type = 'package_price'
                         AND meta->'old'->>'credit_cost' = '3' AND meta->'new'->>'credit_cost' = '4'
                         AND meta->'old'->>'amount' = '1.00' AND meta->'new'->>'amount' = '1.50') THEN
      RAISE EXCEPTION 'P-1b M-b proof (d): the edited row or its audit row differ (%)', v_answer;
    END IF;
    -- an edit moving H onto I's scope overlaps I.
    v_msg := NULL;
    BEGIN
      PERFORM public.admin_edit_package_price(v_h, 1.50, v_cur, 4, NULL, NULL);
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    IF v_msg IS DISTINCT FROM 'overlapping window'
       OR (SELECT category_id FROM public.package_prices WHERE id = v_h) IS DISTINCT FROM v_leaf THEN
      RAISE EXCEPTION 'P-1b M-b proof (d): the overlapping edit answered % or wrote', coalesce(v_msg, 'success');
    END IF;
    -- a used row is refused and keeps its values.
    UPDATE public.package_prices SET used_count = 1 WHERE id = v_i;
    v_msg := NULL;
    BEGIN
      PERFORM public.admin_edit_package_price(v_i, 9.00, v_cur, 9);
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    IF v_msg IS DISTINCT FROM 'price in use'
       OR (SELECT amount FROM public.package_prices WHERE id = v_i) <> 2.00
       OR EXISTS (SELECT 1 FROM public.audit_log WHERE action = 'package_price.edited' AND entity_id = v_i::text) THEN
      RAISE EXCEPTION 'P-1b M-b proof (d): the used row answered % or wrote', coalesce(v_msg, 'success');
    END IF;
    UPDATE public.package_prices SET used_count = 0, valid_to = now() - interval '1 minute' WHERE id = v_i;

    -- (e) each refusal with its own words; nothing written after them. I is ended now.
    FOR v_case IN VALUES ('unknown package'), ('bad amount'), ('bad credit cost'), ('unknown currency'), ('unknown country'),
                         ('unknown category'), ('bad window'), ('price not found'), ('price already ended'),
                         ('edit bad amount'), ('edit bad credit cost'), ('edit unknown currency'), ('edit unknown country'),
                         ('edit unknown category'), ('edit bad window') LOOP
      v_msg := NULL;
      BEGIN
        CASE v_case
          WHEN 'unknown package' THEN PERFORM public.admin_save_package_price('e2e_mig_none', 0, v_cur, 0);
          WHEN 'bad amount' THEN PERFORM public.admin_save_package_price(v_lv, -1, v_cur, 0);
          WHEN 'bad credit cost' THEN PERFORM public.admin_save_package_price(v_lv, 0, v_cur, -1);
          WHEN 'unknown currency' THEN PERFORM public.admin_save_package_price(v_lv, 0, 'e2e', 0);
          -- 'XQ' is no market: a scratch code the countries table never holds (K4 exception, as 'XZ').
          WHEN 'unknown country' THEN PERFORM public.admin_save_package_price(v_lv, 0, v_cur, 0, 'XQ');
          WHEN 'unknown category' THEN PERFORM public.admin_save_package_price(v_lv, 0, v_cur, 0, NULL, gen_random_uuid());
          WHEN 'bad window' THEN PERFORM public.admin_save_package_price(v_lv, 0, v_cur, 0, NULL, NULL, now(), now() - interval '1 minute');
          WHEN 'price not found' THEN PERFORM public.admin_edit_package_price(gen_random_uuid(), 1, v_cur, 1);
          WHEN 'price already ended' THEN PERFORM public.admin_edit_package_price(v_i, 1, v_cur, 1);
          WHEN 'edit bad amount' THEN PERFORM public.admin_edit_package_price(v_h, -1, v_cur, 1, NULL, v_leaf);
          WHEN 'edit bad credit cost' THEN PERFORM public.admin_edit_package_price(v_h, 1, v_cur, -1, NULL, v_leaf);
          WHEN 'edit unknown currency' THEN PERFORM public.admin_edit_package_price(v_h, 1, 'e2e', 1, NULL, v_leaf);
          WHEN 'edit unknown country' THEN PERFORM public.admin_edit_package_price(v_h, 1, v_cur, 1, 'XQ', v_leaf);
          WHEN 'edit unknown category' THEN PERFORM public.admin_edit_package_price(v_h, 1, v_cur, 1, NULL, gen_random_uuid());
          WHEN 'edit bad window' THEN PERFORM public.admin_edit_package_price(v_h, 1, v_cur, 1, NULL, v_leaf, now(), now() - interval '1 minute');
        END CASE;
      EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
      END;
      IF v_msg IS DISTINCT FROM regexp_replace(v_case, '^edit ', '') THEN
        RAISE EXCEPTION 'P-1b M-b proof (e): % answered %', v_case, coalesce(v_msg, 'success');
      END IF;
    END LOOP;

    -- (f) a plain user; (g) the super admin on aal1.
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_plain::text, 'role', 'authenticated')::text, true);
    FOR v_case IN VALUES ('save'), ('edit') LOOP
      v_msg := NULL;
      BEGIN
        CASE v_case
          WHEN 'save' THEN PERFORM public.admin_save_package_price(v_lv, 0, v_cur, 0);
          WHEN 'edit' THEN PERFORM public.admin_edit_package_price(v_h, 1, v_cur, 1, NULL, v_leaf);
        END CASE;
      EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
      END;
      IF v_msg IS DISTINCT FROM 'permission denied' THEN
        RAISE EXCEPTION 'P-1b M-b proof (f): % answered %', v_case, coalesce(v_msg, 'success');
      END IF;
    END LOOP;
    PERFORM set_config('request.jwt.claims',
      json_build_object('sub', v_admin::text, 'role', 'authenticated', 'aal', 'aal1', 'session_id', v_session::text)::text, true);
    FOR v_case IN VALUES ('save'), ('edit') LOOP
      v_state := NULL;
      BEGIN
        CASE v_case
          WHEN 'save' THEN PERFORM public.admin_save_package_price(v_lv, 0, v_cur, 0);
          WHEN 'edit' THEN PERFORM public.admin_edit_package_price(v_h, 1, v_cur, 1, NULL, v_leaf);
        END CASE;
      EXCEPTION WHEN OTHERS THEN v_state := SQLSTATE; v_msg := SQLERRM;
      END;
      IF v_state IS DISTINCT FROM 'P0009' THEN
        RAISE EXCEPTION 'P-1b M-b proof (g): % answered % %', v_case, coalesce(v_state, 'success'), v_msg;
      END IF;
    END LOOP;
    PERFORM set_config('request.jwt.claims', '{}', true);
    -- Nothing refused wrote: one check per condition (INC-1033 d).
    SELECT count(*) INTO v_n FROM public.package_prices WHERE package_key = v_lv;
    IF v_n <> 2 THEN RAISE EXCEPTION 'P-1b M-b proof (c-h): price rows % expected 2', v_n; END IF;
    SELECT credit_cost INTO v_n FROM public.package_prices WHERE id = v_h;
    IF v_n IS DISTINCT FROM 4 THEN RAISE EXCEPTION 'P-1b M-b proof (c-h): H credit_cost % expected 4', v_n; END IF;
    SELECT count(*) INTO v_n FROM public.audit_log WHERE action = 'package_price.saved' AND entity_id IN (v_h::text, v_i::text);
    IF v_n <> 2 THEN RAISE EXCEPTION 'P-1b M-b proof (c-h): package_price.saved rows % expected 2', v_n; END IF;
    SELECT count(*) INTO v_n FROM public.audit_log WHERE action = 'package_price.edited' AND entity_id IN (v_h::text, v_i::text);
    IF v_n <> 1 THEN RAISE EXCEPTION 'P-1b M-b proof (c-h): package_price.edited rows % expected 1', v_n; END IF;

    RAISE EXCEPTION 'p1b-mb-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1b-mb-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261103170000') ON CONFLICT DO NOTHING;
