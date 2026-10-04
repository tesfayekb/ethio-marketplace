-- M5 — bundle 4, step 25: the door side of Parts A to F, one file.
-- Brief: docs/governance/briefs/bundle-4.md (steps 3, 6, 7, 10, 15, 16, 18,
-- 19, 20, 22, 24). Censuses: docs/governance/briefs/bundle-4-census.md.
-- Every function below is redeclared WHOLE from live (pg_get_functiondef read
-- back on ethio-prod; each live body's md5 equals the latest migration
-- declaration), keeping its arguments, defaults, volatility, SECURITY DEFINER
-- and search_path, except get_attribute_options, which becomes VOLATILE on
-- purpose (it now writes the options_read meter).
-- No function is dropped: no argument list changes.
-- e2e-areas: posting, routes, feed, admin-attributes, admin-categories, admin-locations
-- Mark: 20261004090000 (chosen at apply: now() UTC on ethio-prod rounded up to
-- the next hour, plus one hour).

-- ── 0. Before: the name rules timed against the LIVE functions ───────────
-- Ten runs each of alias_rule and alias_taken for three names; medians are
-- kept in a temporary table and written with the "after" medians to one
-- audit_log row at the end (RAISE NOTICE prints them too).
CREATE TEMP TABLE m5_timing (phase text, fn text, name text, ms numeric);
CREATE TEMP TABLE m5_verdicts (kind text, name text, verdict text);

DO $t$
DECLARE
  v_name text; i int; t0 timestamptz; v text; b boolean;
BEGIN
  -- The fold sets the rewrite relies on hold no NULL (a NULL in a NOT IN set
  -- would change a verdict); proven against live before anything changes.
  ASSERT NOT EXISTS (SELECT 1 FROM public.name_claim_folds() f WHERE f IS NULL), 'claim folds hold a NULL';
  ASSERT NOT EXISTS (SELECT 1 FROM public.name_protected_folds() f WHERE f IS NULL), 'protected folds hold a NULL';
  ASSERT NOT EXISTS (SELECT 1 FROM public.exact_only_words w WHERE public.name_fold(w.word) IS NULL), 'exact-only fold NULL';
  FOREACH v_name IN ARRAY ARRAY['abebe_phones', 'telebirr1', 'selam_telebirr1'] LOOP
    FOR i IN 1..10 LOOP
      t0 := clock_timestamp();
      v := public.alias_rule(v_name);
      INSERT INTO m5_timing VALUES ('before', 'alias_rule', v_name,
        extract(epoch FROM clock_timestamp() - t0) * 1000);
      t0 := clock_timestamp();
      b := public.alias_taken(v_name, NULL);
      INSERT INTO m5_timing VALUES ('before', 'alias_taken', v_name,
        extract(epoch FROM clock_timestamp() - t0) * 1000);
    END LOOP;
  END LOOP;
END $t$;

-- The verdicts of the live rules for every name the proofs of M2, M4, M4b
-- and M5 use; after the rewrite each must be identical (step 24).
INSERT INTO m5_verdicts
SELECT 'alias', x, public.alias_rule(x) FROM unnest(ARRAY[
  'ethio_coffee','abebe_ethio','ethi0_coffee','admin_abebe','abebeadmin','abebe_support','telebirr_official',
  'login_help','account','settings','telebirr','gmail_com','kenya','telebirr_store','store_telebirr',
  'telebirrstore','te1ebirr_store','telebirr_agent','cbe_agent','cbe_kenya','telebirr_et','abc_1234567',
  'abel','_abebe','abebe__shop','12345abc','badminton_shop','selam_telebirr','abebe_kenya','abebe_et',
  'made_by_us','tiger_store','awash_market','abebe_phones','abebephones','selam2shop','mekdes_boutique',
  'hana_store','telebirr2024','telebirr_2024','2024telebirr','te1ebirr77','telebirr1','telebirr_1','cbe123',
  'te1ebirr1','awashbank2','telebirr_shop1','telebirr1_store','store2_telebirr','telebirrstore9','abebe1',
  'tiger1','bolt24','abebe_2024','hana_store2','selam_telebirr1','phones24','addis_phones','bole_shop',
  'ethiopia','addis','bole','selam','mobile','phones','cbe','awash','dashen','abyssinia','safaricom',
  'ethiotelecom','helpdesk','moderator_x','support_team','official_store','genuine_telebirr']) x
UNION ALL
SELECT 'business', x, public.business_name_rule(x) FROM unnest(ARRAY[
  'Ethio Coffee','ኢትዮ ቡና','Telebirr','Awash Bank','አዋሽ ባንክ','Telebirr Agent','Selam Telebirr Shop',
  'Awash Coffee','Hana Boutique','Telebirr 2024','Telebirr 1','Awash Bank 2','Telebirr Shop 24',
  'Selam Phones 2','Bolt 24','Dashen Bank','ዳሽን ባንክ','Commercial Bank of Ethiopia','Safaricom Shop',
  'Abebe Phones','Bole Market']) x;

-- ── 1. name_folds (step 24, INC-425) ────────────────────────────────────
-- Every list the name rules read, folded once. No user id; no client access.
CREATE TABLE public.name_folds (
  kind text NOT NULL,
  fold text NOT NULL,
  PRIMARY KEY (kind, fold)
);
CREATE INDEX name_folds_fold_idx ON public.name_folds (fold, kind);
CREATE TABLE public.name_folds_runs (
  id bigserial PRIMARY KEY,
  ran_at timestamptz NOT NULL DEFAULT now(),
  rows integer NOT NULL
);
-- Lifetime sweep heartbeat (step 16). No user id; no client access.
CREATE TABLE public.listing_expiry_sweep_runs (
  id bigserial PRIMARY KEY,
  ran_at timestamptz NOT NULL DEFAULT now(),
  expired integer NOT NULL
);
-- The seller's shop or office (step 18). Personal data: home_country_code (E3).
CREATE TABLE public.seller_places (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  location_id uuid NOT NULL REFERENCES public.locations(id),
  pin_lat numeric,
  pin_lng numeric,
  pin_precision text,
  pin_zoom smallint,
  street_address text,
  directions text,
  home_country_code character(2) REFERENCES public.countries(code),
  updated_at timestamptz NOT NULL DEFAULT now()
);

DO $acl$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY['name_folds','name_folds_runs','listing_expiry_sweep_runs','seller_places'] LOOP
    EXECUTE format('REVOKE ALL ON public.%I FROM PUBLIC, anon, authenticated', t);
    EXECUTE format('GRANT ALL ON public.%I TO service_role', t);
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);
    EXECUTE format('CREATE POLICY %I ON public.%I FOR SELECT TO anon, authenticated USING (false)', t || '_deny_select', t);
    EXECUTE format('CREATE POLICY %I ON public.%I FOR INSERT TO anon, authenticated WITH CHECK (false)', t || '_deny_insert', t);
    EXECUTE format('CREATE POLICY %I ON public.%I FOR UPDATE TO anon, authenticated USING (false)', t || '_deny_update', t);
    EXECUTE format('CREATE POLICY %I ON public.%I FOR DELETE TO anon, authenticated USING (false)', t || '_deny_delete', t);
  END LOOP;
END $acl$;
REVOKE ALL ON SEQUENCE public.name_folds_runs_id_seq FROM PUBLIC, anon, authenticated;
REVOKE ALL ON SEQUENCE public.listing_expiry_sweep_runs_id_seq FROM PUBLIC, anon, authenticated;
GRANT USAGE, SELECT ON SEQUENCE public.name_folds_runs_id_seq TO service_role;
GRANT USAGE, SELECT ON SEQUENCE public.listing_expiry_sweep_runs_id_seq TO service_role;

-- alias_taken reads profiles by the fold of the name: index it (alias_history
-- already holds alias_history_fold_idx). alias_taken itself is unchanged.
CREATE INDEX profiles_alias_fold_idx ON public.profiles (public.name_fold(seller_alias))
  WHERE seller_alias IS NOT NULL;

CREATE FUNCTION public.name_folds_rebuild()
 RETURNS integer
 LANGUAGE plpgsql
 VOLATILE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_rows integer;
BEGIN
  -- One rebuild at a time; the whole table is replaced in this transaction,
  -- so a reader sees the old set or the new one, never a half.
  PERFORM pg_advisory_xact_lock(hashtext('name_folds_rebuild'));
  DELETE FROM public.name_folds;
  INSERT INTO public.name_folds (kind, fold)
  SELECT DISTINCT s.kind, s.fold FROM (
              SELECT 'site'::text AS kind, public.name_fold(w.word) AS fold FROM public.site_words w
    UNION ALL SELECT 'role', public.name_fold(w.word) FROM public.site_words w WHERE w.kind = 'role'
    UNION ALL SELECT 'function', public.name_fold(w.word) FROM public.site_words w WHERE w.kind = 'function'
    UNION ALL SELECT 'category', public.name_fold_latin(c.slug) FROM public.categories c
    UNION ALL SELECT 'category', public.name_fold_latin(c.name_en) FROM public.categories c
    UNION ALL SELECT 'place', public.name_fold_latin(l.name_en) FROM public.locations l
    UNION ALL SELECT 'country', public.name_fold_latin(k.name_en) FROM public.countries k
    UNION ALL SELECT 'brand', b.f FROM public.name_brand_folds() b(f)
    UNION ALL SELECT 'handle', h.handle_fold FROM public.protected_handles h
    UNION ALL SELECT 'exact_only', public.name_fold(e.word) FROM public.exact_only_words e
    UNION ALL SELECT 'claim', c.f FROM public.name_claim_folds() c(f)
    UNION ALL SELECT 'name_latin', public.name_fold_latin(n.name_en) FROM public.protected_names n
    UNION ALL SELECT 'name_am', public.name_fold_am(n.name_am) FROM public.protected_names n
               WHERE n.name_am IS NOT NULL
  ) s
  WHERE s.fold IS NOT NULL;
  GET DIAGNOSTICS v_rows = ROW_COUNT;
  INSERT INTO public.name_folds_runs (rows) VALUES (v_rows);
  DELETE FROM public.name_folds_runs WHERE ran_at < now() - interval '14 days';
  RETURN v_rows;
END $function$;
REVOKE ALL ON FUNCTION public.name_folds_rebuild() FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.name_folds_rebuild() TO service_role;

-- The protected set: brands and handles, less the exact-only words
-- (name_protected_folds() as a keyed lookup).
CREATE FUNCTION public.name_folds_protected(p text)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT EXISTS (SELECT 1 FROM public.name_folds f WHERE f.kind IN ('brand', 'handle') AND f.fold = p)
     AND NOT EXISTS (SELECT 1 FROM public.name_folds f WHERE f.kind = 'exact_only' AND f.fold = p)
$function$;
REVOKE ALL ON FUNCTION public.name_folds_protected(text) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.name_folds_protected(text) TO service_role;

SELECT public.name_folds_rebuild();

-- ── 2. Columns, dial ─────────────────────────────────────────────────────
ALTER TABLE public.listings
  ADD COLUMN price_unit text,
  ADD COLUMN price_unit_text text,
  ADD COLUMN photos_soon boolean NOT NULL DEFAULT false,
  ADD COLUMN attested_at timestamptz;
-- The public card reads the unit and the ribbon flag; attested_at has no client grant.
GRANT SELECT (price_unit, price_unit_text, photos_soon) ON public.listings TO anon, authenticated;

INSERT INTO public.rate_dials (action, max_count, window_seconds) VALUES ('options_read', 400, 3600)
  ON CONFLICT (action) DO UPDATE SET max_count = EXCLUDED.max_count, window_seconds = EXCLUDED.window_seconds;

-- ── 3. The deal rows and the basis in force (steps 6, 7, 10) ───────────
CREATE FUNCTION public.deal_group(p_key text, p_has_unit boolean)
 RETURNS text
 LANGUAGE sql
 IMMUTABLE
 SET search_path TO 'public'
AS $function$
  SELECT CASE
    WHEN p_key ~ '^(pricing_type|unit_of_sale)(-|$)' THEN 'basis'
    WHEN p_key ~ '^(pack_quantity|net_weight_g|volume_ml)(-|$)' THEN
      CASE WHEN coalesce(p_has_unit, false) THEN 'size' END
    WHEN p_key ~ '^quantity_available(-|$)' THEN 'quantity'
    WHEN p_key ~ '^(lease_term|payment_frequency|payment_plan|min_hire_days)(-|$)'
      OR p_key ~ '^term_' THEN 'terms'
  END
$function$;
REVOKE ALL ON FUNCTION public.deal_group(text, boolean) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.deal_group(text, boolean) TO service_role;

-- The category's deal keys (the price page's rows), display order. Server-only,
-- like price_basis_keys.
CREATE FUNCTION public.deal_keys(p_category_id uuid)
 RETURNS text[]
 LANGUAGE sql
 STABLE
 SET search_path TO 'public'
AS $function$
  WITH l AS (
    SELECT a.attr_key, e.display_order
      FROM public.effective_category_links(p_category_id) e
      JOIN public.attributes a ON a.id = e.attribute_id
  ), u AS (
    SELECT EXISTS (SELECT 1 FROM l WHERE l.attr_key ~ '^unit_of_sale(-|$)') AS has_unit
  )
  SELECT coalesce(array_agg(l.attr_key ORDER BY l.display_order, l.attr_key), ARRAY[]::text[])
    FROM l, u
   WHERE public.deal_group(l.attr_key, u.has_unit) IS NOT NULL
$function$;
REVOKE ALL ON FUNCTION public.deal_keys(uuid) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.deal_keys(uuid) TO service_role;

-- The basis in force under the answers: {"key": text|null, "ambiguous": bool}.
-- Candidates are basis keys whose link condition is met (no condition: always).
-- One → it; several → the single pricing_type one if exactly one (a rent period
-- outranks a unit of sale), else ambiguous; none → null.
CREATE FUNCTION public.price_basis_in_force(p_category_id uuid, p_attrs jsonb, p_prior jsonb)
 RETURNS jsonb
 LANGUAGE sql
 STABLE
 SET search_path TO 'public'
AS $function$
  WITH c AS (
    SELECT DISTINCT a.attr_key
      FROM public.effective_category_links(p_category_id) e
      JOIN public.attributes a ON a.id = e.attribute_id
      JOIN public.category_attribute_links l ON l.id = e.link_id
     WHERE a.attr_key ~ '^(pricing_type|unit_of_sale)(-|$)'
       AND public.attr_visible_when_met(coalesce(p_attrs, '{}'::jsonb), p_prior, l.visible_when)
  ), n AS (
    SELECT count(*) AS total,
           count(*) FILTER (WHERE attr_key ~ '^pricing_type(-|$)') AS rent,
           min(attr_key) AS only_key,
           min(attr_key) FILTER (WHERE attr_key ~ '^pricing_type(-|$)') AS rent_key
      FROM c
  )
  SELECT CASE
    WHEN n.total = 0 THEN jsonb_build_object('key', NULL, 'ambiguous', false)
    WHEN n.total = 1 THEN jsonb_build_object('key', n.only_key, 'ambiguous', false)
    WHEN n.rent = 1  THEN jsonb_build_object('key', n.rent_key, 'ambiguous', false)
    ELSE jsonb_build_object('key', NULL, 'ambiguous', true)
  END
  FROM n
$function$;
REVOKE ALL ON FUNCTION public.price_basis_in_force(uuid, jsonb, jsonb) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.price_basis_in_force(uuid, jsonb, jsonb) TO service_role;

-- Unit words only: {token: {"en", "am"}} for every option of every basis key;
-- on a clash the first list by attr_key wins (the proof prints every clash).
CREATE FUNCTION public.price_unit_labels()
 RETURNS jsonb
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT coalesce(jsonb_object_agg(t.token, jsonb_build_object('en', t.label_en, 'am', t.label_am)), '{}'::jsonb)
    FROM (
      SELECT DISTINCT ON (o.value->>'value')
             o.value->>'value' AS token, o.value->>'label_en' AS label_en, o.value->>'label_am' AS label_am
        FROM public.attributes a,
             jsonb_array_elements(CASE WHEN jsonb_typeof(a.options) = 'array' THEN a.options ELSE '[]'::jsonb END)
               WITH ORDINALITY o(value, ord)
       WHERE a.attr_key ~ '^(pricing_type|unit_of_sale)(-|$)'
         AND jsonb_typeof(o.value) = 'object'
         AND coalesce(o.value->>'value', '') <> ''
       ORDER BY o.value->>'value', a.attr_key, o.ord
    ) t
$function$;
REVOKE ALL ON FUNCTION public.price_unit_labels() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.price_unit_labels() TO anon, authenticated;
GRANT ALL ON FUNCTION public.price_unit_labels() TO service_role;

-- ── 4. Photos coming soon (step 15) ─────────────────────────────────────
CREATE FUNCTION public.set_listing_photos_soon(p_listing_id uuid, p_on boolean)
 RETURNS jsonb
 LANGUAGE plpgsql
 VOLATILE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid  uuid := auth.uid();
  v_row  public.listings%ROWTYPE;
  v_on   boolean := coalesce(p_on, false);
  v_rate jsonb;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  v_rate := public.rate_gate('draft');
  IF NOT coalesce((v_rate->>'allowed')::boolean, false) THEN
    RETURN jsonb_build_object('ok', false, 'refusals', jsonb_build_array(
      jsonb_build_object('field', 'rate', 'reason', 'rateLimited', 'resets_at', v_rate->>'resets_at')));
  END IF;
  SELECT * INTO v_row FROM public.listings WHERE id = p_listing_id FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'listing not found'; END IF;
  IF v_row.seller_id <> v_uid THEN RAISE EXCEPTION 'not your listing'; END IF;
  -- The statuses set_listing_pin accepts.
  IF v_row.status NOT IN ('draft','active','reduced','rejected','held','expired') THEN
    RAISE EXCEPTION 'photosSoonNotEditable:%', v_row.status;
  END IF;
  IF v_row.photos_soon IS DISTINCT FROM v_on THEN
    UPDATE public.listings SET photos_soon = v_on, updated_at = now() WHERE id = p_listing_id;
    INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
      VALUES (p_listing_id, v_uid, 'edit',
              jsonb_build_object('photos_soon', v_row.photos_soon),
              jsonb_build_object('photos_soon', v_on), v_uid);
  END IF;
  RETURN jsonb_build_object('ok', true, 'photos_soon', v_on);
END $function$;
REVOKE ALL ON FUNCTION public.set_listing_photos_soon(uuid, boolean) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.set_listing_photos_soon(uuid, boolean) TO authenticated;
GRANT ALL ON FUNCTION public.set_listing_photos_soon(uuid, boolean) TO service_role;

-- ── 5. The seller's shop or office (step 18) ───────────────────────────
CREATE FUNCTION public.save_seller_place(p_listing_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 VOLATILE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid  uuid := auth.uid();
  v_row  public.listings%ROWTYPE;
  v_loc  uuid;
  v_rate jsonb;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  v_rate := public.rate_gate('draft');
  IF NOT coalesce((v_rate->>'allowed')::boolean, false) THEN
    RETURN jsonb_build_object('ok', false, 'refusals', jsonb_build_array(
      jsonb_build_object('field', 'rate', 'reason', 'rateLimited', 'resets_at', v_rate->>'resets_at')));
  END IF;
  SELECT * INTO v_row FROM public.listings WHERE id = p_listing_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'listing not found'; END IF;
  IF v_row.seller_id <> v_uid THEN RAISE EXCEPTION 'not your listing'; END IF;
  -- The ad's first place: the listing's own place, else its first coverage row.
  v_loc := coalesce(v_row.location_id,
    (SELECT ll.location_id FROM public.listing_locations ll
      WHERE ll.listing_id = p_listing_id ORDER BY ll.created_at, ll.id LIMIT 1));
  IF v_loc IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'refusals', jsonb_build_array(
      jsonb_build_object('field', 'coverage', 'reason', 'required')));
  END IF;
  INSERT INTO public.seller_places AS s (user_id, location_id, pin_lat, pin_lng, pin_precision, pin_zoom,
                                         street_address, directions, home_country_code, updated_at)
  VALUES (v_uid, v_loc, v_row.pin_lat, v_row.pin_lng, v_row.pin_precision, v_row.pin_zoom,
          v_row.street_address, v_row.directions,
          (SELECT d.home_country_code FROM public.user_directory d WHERE d.user_id = v_uid), now())
  ON CONFLICT (user_id) DO UPDATE SET
    location_id = EXCLUDED.location_id, pin_lat = EXCLUDED.pin_lat, pin_lng = EXCLUDED.pin_lng,
    pin_precision = EXCLUDED.pin_precision, pin_zoom = EXCLUDED.pin_zoom,
    street_address = EXCLUDED.street_address, directions = EXCLUDED.directions,
    home_country_code = EXCLUDED.home_country_code, updated_at = now();
  RETURN jsonb_build_object('ok', true);
END $function$;
REVOKE ALL ON FUNCTION public.save_seller_place(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.save_seller_place(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.save_seller_place(uuid) TO service_role;

CREATE FUNCTION public.clear_seller_place()
 RETURNS jsonb
 LANGUAGE plpgsql
 VOLATILE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid uuid := auth.uid();
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  DELETE FROM public.seller_places WHERE user_id = v_uid;
  RETURN jsonb_build_object('ok', true);
END $function$;
REVOKE ALL ON FUNCTION public.clear_seller_place() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.clear_seller_place() TO authenticated;
GRANT ALL ON FUNCTION public.clear_seller_place() TO service_role;

CREATE FUNCTION public.my_seller_place()
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid uuid := auth.uid();
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  RETURN (SELECT jsonb_build_object(
            'location_id', s.location_id, 'pin_lat', s.pin_lat, 'pin_lng', s.pin_lng,
            'pin_precision', s.pin_precision, 'pin_zoom', s.pin_zoom,
            'street_address', s.street_address, 'directions', s.directions,
            'updated_at', s.updated_at)
            FROM public.seller_places s WHERE s.user_id = v_uid);
END $function$;
REVOKE ALL ON FUNCTION public.my_seller_place() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.my_seller_place() TO authenticated;
GRANT ALL ON FUNCTION public.my_seller_place() TO service_role;

-- ── 6. Redeclared whole from live (each with its closers beside it) ──────
-- alias_rule
CREATE OR REPLACE FUNCTION public.alias_rule(p_alias text, p_shape boolean DEFAULT true)
 RETURNS text
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v      text := lower(btrim(coalesce(p_alias, '')));
  v_f    text;
  v_f2   text;
  v_parts text[];
  v_parts2 text[];
  v_kept text[];
BEGIN
  IF p_shape AND (char_length(v) NOT BETWEEN 5 AND 30
      OR v !~ '^[a-z][a-z0-9_]*$'
      OR char_length(regexp_replace(v, '[^a-z]', '', 'g')) < 3
      OR v ~ '[0-9]{7}' OR v ~ '_$' OR v ~ '__') THEN
    RETURN 'a';
  END IF;
  v_f := public.name_fold(v);
  IF v_f = '' THEN RETURN 'a'; END IF;
  IF position('ethio' IN v_f) > 0 THEN RETURN 'b'; END IF;

  SELECT array_agg(public.name_fold(x) ORDER BY o) INTO v_parts
    FROM unnest(string_to_array(v, '_')) WITH ORDINALITY AS u(x, o) WHERE x <> '';

  -- M5 / INC-425 — every list is read from name_folds by key (built by
  -- name_folds_rebuild() with the same fold functions); nothing is folded here.
  IF EXISTS (SELECT 1 FROM public.name_folds w
              WHERE w.kind IN ('role', 'function')
                AND (w.fold = ANY (v_parts)
                     OR left(v_f, char_length(w.fold)) = w.fold
                     OR right(v_f, char_length(w.fold)) = w.fold)) THEN
    RETURN 'c';
  END IF;

  IF EXISTS (SELECT 1 FROM public.name_folds k
              WHERE k.kind IN ('site', 'category', 'place', 'country', 'brand', 'handle')
                AND k.fold = v_f) THEN
    RETURN 'd';
  END IF;

  SELECT array_agg(p ORDER BY o) INTO v_kept
    FROM unnest(v_parts) WITH ORDINALITY AS u(p, o)
   WHERE NOT EXISTS (SELECT 1 FROM public.name_folds c WHERE c.kind = 'claim' AND c.fold = p);
  IF coalesce(cardinality(v_kept), 0) BETWEEN 1 AND cardinality(v_parts) - 1
     AND public.name_folds_protected(array_to_string(v_kept, '')) THEN
    RETURN 'e';
  END IF;
  IF EXISTS (SELECT 1 FROM (SELECT f.fold AS w FROM public.name_folds f WHERE f.kind = 'claim') c
              WHERE char_length(v_f) >= char_length(c.w) + 5
                AND ((right(v_f, char_length(c.w)) = c.w
                      AND public.name_folds_protected(left(v_f, char_length(v_f) - char_length(c.w))))
                  OR (left(v_f, char_length(c.w)) = c.w
                      AND public.name_folds_protected(right(v_f, char_length(v_f) - char_length(c.w)))))) THEN
    RETURN 'e';
  END IF;

  -- Second reading: edge digits stripped per part, digit-only parts dropped.
  -- M4b: the 'd' check reads the protected set (brands AND handles, less the
  -- exact-only words); M5 reads it from name_folds (name_folds_protected).
  v_f2 := public.name_second_fold(v);
  IF v_f2 IS NOT NULL AND v_f2 IS DISTINCT FROM v_f THEN
    SELECT array_agg(public.name_fold(x) ORDER BY o) INTO v_parts2
      FROM (
        SELECT regexp_replace(x, '^[0-9]+|[0-9]+$', '', 'g') AS x, o
          FROM unnest(string_to_array(v, '_')) WITH ORDINALITY AS u(x, o)
      ) s
     WHERE s.x <> '' AND s.x !~ '^[0-9]+$';
    IF public.name_folds_protected(v_f2) THEN
      RETURN 'd';
    END IF;
    SELECT array_agg(p ORDER BY o) INTO v_kept
      FROM unnest(v_parts2) WITH ORDINALITY AS u(p, o)
     WHERE NOT EXISTS (SELECT 1 FROM public.name_folds c WHERE c.kind = 'claim' AND c.fold = p);
    IF coalesce(cardinality(v_kept), 0) BETWEEN 1 AND cardinality(v_parts2) - 1
       AND public.name_folds_protected(array_to_string(v_kept, '')) THEN
      RETURN 'e';
    END IF;
    IF EXISTS (SELECT 1 FROM (SELECT f.fold AS w FROM public.name_folds f WHERE f.kind = 'claim') c
                WHERE char_length(v_f2) >= char_length(c.w) + 5
                  AND ((right(v_f2, char_length(c.w)) = c.w
                        AND public.name_folds_protected(left(v_f2, char_length(v_f2) - char_length(c.w))))
                    OR (left(v_f2, char_length(c.w)) = c.w
                        AND public.name_folds_protected(right(v_f2, char_length(v_f2) - char_length(c.w)))))) THEN
      RETURN 'e';
    END IF;
  END IF;
  RETURN NULL;
END $function$;
REVOKE ALL ON FUNCTION public.alias_rule(text, boolean) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.alias_rule(text, boolean) TO service_role;

-- business_name_rule
CREATE OR REPLACE FUNCTION public.business_name_rule(p_name text)
 RETURNS text
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_lat   text := public.name_fold_latin(p_name);
  v_am    text := public.name_fold_am(p_name);
  v_lat2  text;
  v_parts text[];
  v_parts2 text[];
  v_kept  text[];
BEGIN
  IF position('ethio' IN v_lat) > 0 OR position('ኢትዮ' IN v_am) > 0 THEN RETURN 'b'; END IF;
  -- M5 / INC-425 — read from name_folds by key: brand, handle and the
  -- protected names' Latin fold (name_latin); the Amharic fold (name_am).
  IF (v_lat <> '' AND EXISTS (SELECT 1 FROM public.name_folds k
                               WHERE k.kind IN ('brand', 'handle', 'name_latin') AND k.fold = v_lat))
     OR (v_am <> '' AND EXISTS (SELECT 1 FROM public.name_folds k
                                 WHERE k.kind = 'name_am' AND k.fold = v_am)) THEN
    RETURN 'd';
  END IF;
  IF v_lat = '' THEN RETURN NULL; END IF;
  SELECT array_agg(public.name_fold(x) ORDER BY o) INTO v_parts
    FROM unnest(regexp_split_to_array(lower(p_name), '[^a-z0-9]+')) WITH ORDINALITY AS u(x, o) WHERE x <> '';
  SELECT array_agg(p ORDER BY o) INTO v_kept
    FROM unnest(v_parts) WITH ORDINALITY AS u(p, o)
   WHERE NOT EXISTS (SELECT 1 FROM public.name_folds c WHERE c.kind = 'claim' AND c.fold = p);
  IF coalesce(cardinality(v_kept), 0) BETWEEN 1 AND cardinality(v_parts) - 1
     AND public.name_folds_protected(array_to_string(v_kept, '')) THEN
    RETURN 'e';
  END IF;
  IF EXISTS (SELECT 1 FROM (SELECT f.fold AS w FROM public.name_folds f WHERE f.kind = 'claim') c
              WHERE char_length(v_lat) >= char_length(c.w) + 5
                AND ((right(v_lat, char_length(c.w)) = c.w
                      AND public.name_folds_protected(left(v_lat, char_length(v_lat) - char_length(c.w))))
                  OR (left(v_lat, char_length(c.w)) = c.w
                      AND public.name_folds_protected(right(v_lat, char_length(v_lat) - char_length(c.w)))))) THEN
    RETURN 'e';
  END IF;

  -- Second reading on the Latin fold.
  -- M4b: the 'd' check reads the protected set (brands AND handles, less the
  -- exact-only words); M5 reads it from name_folds (name_folds_protected).
  v_lat2 := public.name_second_fold(regexp_replace(lower(p_name), '[^a-z0-9]+', '_', 'g'));
  IF v_lat2 IS NOT NULL AND v_lat2 IS DISTINCT FROM v_lat THEN
    SELECT array_agg(public.name_fold(x) ORDER BY o) INTO v_parts2
      FROM (
        SELECT regexp_replace(x, '^[0-9]+|[0-9]+$', '', 'g') AS x, o
          FROM unnest(regexp_split_to_array(lower(p_name), '[^a-z0-9]+')) WITH ORDINALITY AS u(x, o)
      ) s
     WHERE s.x <> '' AND s.x !~ '^[0-9]+$';
    IF public.name_folds_protected(v_lat2) THEN
      RETURN 'd';
    END IF;
    SELECT array_agg(p ORDER BY o) INTO v_kept
      FROM unnest(v_parts2) WITH ORDINALITY AS u(p, o)
     WHERE NOT EXISTS (SELECT 1 FROM public.name_folds c WHERE c.kind = 'claim' AND c.fold = p);
    IF coalesce(cardinality(v_kept), 0) BETWEEN 1 AND cardinality(v_parts2) - 1
       AND public.name_folds_protected(array_to_string(v_kept, '')) THEN
      RETURN 'e';
    END IF;
    IF EXISTS (SELECT 1 FROM (SELECT f.fold AS w FROM public.name_folds f WHERE f.kind = 'claim') c
                WHERE char_length(v_lat2) >= char_length(c.w) + 5
                  AND ((right(v_lat2, char_length(c.w)) = c.w
                        AND public.name_folds_protected(left(v_lat2, char_length(v_lat2) - char_length(c.w))))
                    OR (left(v_lat2, char_length(c.w)) = c.w
                        AND public.name_folds_protected(right(v_lat2, char_length(v_lat2) - char_length(c.w)))))) THEN
      RETURN 'e';
    END IF;
  END IF;
  RETURN NULL;
END $function$;
REVOKE ALL ON FUNCTION public.business_name_rule(text) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.business_name_rule(text) TO service_role;

-- validate_listing_draft
CREATE OR REPLACE FUNCTION public.validate_listing_draft(
  p_uid uuid, p_step smallint, p_category_id uuid, p_title text, p_description text,
  p_video_url text, p_attributes jsonb, p_price_mode text, p_price_amount numeric,
  p_price_currency character(3), p_price_period text, p_poster_expires_at timestamptz,
  p_coverage uuid[], p_contact_pref jsonb, p_prior jsonb, p_price_bp integer DEFAULT NULL,
  p_price_negotiable boolean DEFAULT false)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_ref     jsonb := '[]'::jsonb;
  v_cat     public.categories%ROWTYPE;
  v_res     jsonb;
  v_attrs   jsonb := '{}'::jsonb;
  v_title   text := btrim(coalesce(p_title, ''));
  v_desc    text := coalesce(p_description, '');
  -- D62-1b / INC-309 — 'negotiable' is an ALIAS at every step: a fixed price
  -- with the flag. It is resolved here, once, so no step stores it as a mode.
  v_mode    text := CASE WHEN p_price_mode = 'negotiable' THEN 'fixed' ELSE coalesce(p_price_mode, 'fixed') END;
  v_cur     char(3);
  v_period  text;
  v_home    char(2);
  v_days    int;
  v_plan    public.coverage_plans%ROWTYPE;
  v_market  char(2);
  v_cities  int := 0;
  v_regions int := 0;
  v_lands   int := 0;
  v_anchors int := 0;
  v_bad     uuid;
  v_place   uuid;
  v_basis   text[];
  v_bval    text;
  v_fmode   text;
  v_fperiod text;
  v_derived text;
  v_ans     jsonb;
  v_kid     record;
  v_pval    text;
  v_kval    jsonb;
  v_neg     boolean := coalesce(p_price_negotiable, false) OR p_price_mode IS NOT DISTINCT FROM 'negotiable';
  -- M5 (bundle 4 steps 3, 7, 10, 16, 20, 22).
  v_deal    text[];
  v_bif     jsonb;
  v_bkey    text;
  v_unit    text;
  v_unit_tx text;
  v_prof    public.profiles%ROWTYPE;
BEGIN
  -- ---- step 1 — the category (leaf, postable) ----
  -- D34 — a catch-all leaf is postable. `is_catchall` orders a level (D30) and
  -- guides curation; it is not a refusal.
  IF p_step >= 1 THEN
    SELECT * INTO v_cat FROM public.categories WHERE id = p_category_id;
    IF p_category_id IS NULL THEN
      v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','category_id','reason','required'));
    ELSIF NOT FOUND
       OR NOT v_cat.is_active
       OR NOT v_cat.allow_listings
       OR EXISTS (SELECT 1 FROM public.category_tree_pointers t WHERE t.parent_id = v_cat.id) THEN
      v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','category_id','reason','categoryNotPostable'));
    END IF;
  END IF;

  -- Nothing downstream is meaningful without a postable category.
  IF jsonb_array_length(v_ref) > 0 THEN
    RETURN jsonb_build_object('ok', false, 'refusals', v_ref);
  END IF;

  -- ---- step 2 — photos: registered through their own door, nothing here ----

  -- ---- step 3 — attributes (the A1 validation authority) ----
  -- M5 / DEC-109 — the price page (door step 4) owns the deal rows
  -- (deal_keys: basis, size, quantity, terms); they are deferred while
  -- p_step < 4, in place of "price_basis_keys while p_step < 5".
  IF p_step >= 3 THEN
    v_deal := CASE WHEN p_step < 4 THEN public.deal_keys(p_category_id) ELSE ARRAY[]::text[] END;
    v_res := public.validate_listing_attributes(p_category_id, coalesce(p_attributes, '{}'::jsonb), p_prior,
             CASE WHEN p_step < 4 THEN v_deal ELSE NULL END);
    IF coalesce((v_res->>'ok')::boolean, false) THEN
      v_attrs := coalesce(v_res->'attrs', '{}'::jsonb);
    ELSE
      v_ref := v_ref || coalesce(v_res->'refusals', '[]'::jsonb);
    END IF;
  ELSE
    v_attrs := coalesce(p_attributes, '{}'::jsonb);
  END IF;

  -- DEC-086 — AN EXACT-MODEL QUESTION IS REQUIRED WHENEVER IT MATTERS. A
  -- dependent pick-list whose options carry facts, allowed or bounds is
  -- required once its parent is answered AND that answer offers 2+ child
  -- options ('other' counts, and is a valid answer). Never doubled.
  IF p_step >= 3 THEN
    v_ans := CASE WHEN coalesce((v_res->>'ok')::boolean, false) THEN v_attrs
                  ELSE coalesce(p_attributes, '{}'::jsonb) END;
    FOR v_kid IN
      SELECT c.attr_key, c.options, l.allowed_options, l.visible_when, p.attr_key AS parent_key
        FROM public.effective_category_links(p_category_id) e
        JOIN public.attributes c ON c.id = e.attribute_id
        JOIN public.category_attribute_links l ON l.id = e.link_id
        JOIN public.attributes p ON p.id = c.depends_on
       WHERE c.attr_type IN ('single_select', 'multi_select')
         AND jsonb_typeof(c.options) = 'array'
         AND EXISTS (SELECT 1 FROM jsonb_array_elements(c.options) o
                      WHERE jsonb_typeof(o.value) = 'object'
                        AND (o.value ? 'facts' OR o.value ? 'allowed' OR o.value ? 'bounds'))
    LOOP
      IF v_kid.visible_when IS NOT NULL
         AND NOT public.attr_visible_when_met(v_ans, p_prior, v_kid.visible_when) THEN
        CONTINUE;
      END IF;
      -- M5 — a deal row is judged on the price page: skipped while p_step < 4.
      IF v_kid.attr_key = ANY (v_deal) THEN
        CONTINUE;
      END IF;
      v_pval := CASE jsonb_typeof(v_ans->v_kid.parent_key)
                  WHEN 'string' THEN v_ans->>v_kid.parent_key
                  WHEN 'object' THEN v_ans->v_kid.parent_key->>'value'
                  ELSE NULL END;
      IF btrim(coalesce(v_pval, '')) = '' THEN CONTINUE; END IF;
      IF (SELECT count(*) FROM jsonb_array_elements(v_kid.options) o
           WHERE jsonb_typeof(o.value) = 'object'
             AND coalesce((o.value->>'active')::boolean, true)
             AND (v_kid.allowed_options IS NULL OR (o.value->>'value') = ANY (v_kid.allowed_options))
             AND ((o.value->>'parent') = v_pval
                  OR (o.value->>'value' = 'other' AND (o.value->>'parent') IS NULL))) < 2 THEN
        CONTINUE;
      END IF;
      v_kval := v_ans -> v_kid.attr_key;
      IF (v_kval IS NULL OR jsonb_typeof(v_kval) = 'null'
          OR (jsonb_typeof(v_kval) = 'string' AND btrim(v_kval #>> '{}') = '')
          OR (jsonb_typeof(v_kval) = 'array' AND jsonb_array_length(v_kval) = 0)
          OR (jsonb_typeof(v_kval) = 'object' AND btrim(coalesce(v_kval->>'value', '')) = ''))
         AND NOT v_ref @> jsonb_build_array(jsonb_build_object('attr_key', v_kid.attr_key, 'reason', 'required')) THEN
        v_ref := v_ref || jsonb_build_array(jsonb_build_object('attr_key', v_kid.attr_key, 'reason', 'required'));
      END IF;
    END LOOP;
  END IF;

  -- M5 / DEC-110 — the basis in force, from the answers, at every step: it
  -- names the unit the ad is sold per (price_unit, and the seller's written
  -- unit when the token is other). Ambiguous or none → no unit.
  v_bif  := public.price_basis_in_force(p_category_id, v_attrs, p_prior);
  v_bkey := v_bif->>'key';
  IF v_bkey IS NOT NULL THEN
    v_unit := CASE jsonb_typeof(v_attrs->v_bkey)
                WHEN 'string' THEN v_attrs->>v_bkey
                WHEN 'object' THEN v_attrs->v_bkey->>'value'
                ELSE NULL END;
    IF btrim(coalesce(v_unit, '')) = '' THEN v_unit := NULL; END IF;
    IF v_unit = 'other' THEN
      v_unit_tx := nullif(btrim(coalesce(public.attr_answer_other_text(v_attrs->v_bkey), '')), '');
    END IF;
  END IF;

  -- M5 / DEC-110 — the video link's shape is judged whenever a link is sent,
  -- at any step, so the photos page refuses it on its own Next.
  IF p_video_url IS NOT NULL
     AND p_video_url !~ '^https://(www\.)?(youtube\.com/watch\?v=|youtu\.be/)[A-Za-z0-9_-]{6,20}' THEN
    v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','video_url','reason','badShape'));
  END IF;

  -- ---- step 5 — title, description (M5 / DEC-110: the title step is 5) ----
  IF p_step >= 5 THEN
    IF char_length(v_title) = 0 THEN
      v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','title','reason','required'));
    ELSIF char_length(v_title) > 120 THEN
      v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','title','reason','tooLong','detail','120'));
    END IF;
    IF char_length(v_desc) > 5000 THEN
      v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','description','reason','tooLong','detail','5000'));
    END IF;
    -- Bundle 2 step 4 — the title and the description are free text: the
    -- phone rule applies, reason contactInText at that field.
    IF public.attr_contact_like(v_title) THEN
      v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','title','reason','contactInText'));
    END IF;
    IF public.attr_contact_like(v_desc) THEN
      v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','description','reason','contactInText'));
    END IF;
  END IF;

  -- ---- step 4 — price, currency, period (DEC-067, D13; M5: the price step is 4) ----
  -- DEC-079 / D31 — the basis IN FORCE (price_basis_in_force, M5 / DEC-109)
  -- lets the seller's basis answer decide the price type and the period
  -- (price_shape_for_basis). The basis outranks the DEC-067 period lock (L5).
  -- No basis in force → DEC-067 unchanged; a basis not in force decides nothing.
  IF p_step >= 4 THEN
    IF coalesce((v_bif->>'ambiguous')::boolean, false) THEN
      v_basis := public.price_basis_keys(p_category_id);
      v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','price_mode','reason','priceBasisAmbiguous','detail',array_to_string(v_basis,'|')));
    ELSIF v_bkey IS NOT NULL THEN
      v_bval := v_unit;
      -- DEC-081 — the basis is judged HERE (deferred at step 3). The step-3 pass
      -- at p_step >= 4 may already carry the same refusal; it is never doubled.
      IF v_bval IS NULL
         AND EXISTS (SELECT 1 FROM public.effective_category_links(p_category_id) e
                      JOIN public.attributes a ON a.id = e.attribute_id
                     WHERE a.attr_key = v_bkey AND e.is_required)
         AND NOT v_ref @> jsonb_build_array(jsonb_build_object('attr_key', v_bkey, 'reason', 'required')) THEN
        v_ref := v_ref || jsonb_build_array(jsonb_build_object('attr_key', v_bkey, 'reason', 'required'));
      END IF;
    END IF;

    -- DEC-081 — Negotiable is a FLAG on a price, never a mode.
    v_neg := v_neg OR v_bval IS NOT DISTINCT FROM 'negotiable';

    IF v_bval IS NOT NULL THEN
      SELECT s.forced_mode, s.period INTO v_fmode, v_fperiod FROM public.price_shape_for_basis(v_bval) s;
      -- The comparison reads the alias-resolved v_mode; an ABSENT mode (NULL
      -- argument) still defers to the basis without a refusal, as before.
      IF v_fmode IS NOT NULL AND p_price_mode IS NOT NULL AND v_mode <> v_fmode THEN
        v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','price_mode','reason','modeFollowsBasis','detail',v_fmode));
      END IF;
      v_mode := coalesce(v_fmode, v_mode);
    END IF;

    IF v_mode NOT IN ('fixed','free','contact','commission') THEN
      v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','price_mode','reason','badValue','detail',v_mode));
    ELSIF v_mode = 'commission' THEN
      IF v_bval IS DISTINCT FROM 'commission' THEN
        v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','price_mode','reason','commissionNotOffered'));
      END IF;
      IF p_price_bp IS NULL THEN
        v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','price_bp','reason','required'));
      END IF;
      IF p_price_amount IS NOT NULL THEN
        v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','price_amount','reason','mustBeEmpty'));
      END IF;
      IF p_price_currency IS NOT NULL THEN
        v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','price_currency','reason','mustBeEmpty'));
      END IF;
      v_cur := NULL;
    ELSIF v_mode = 'fixed' THEN
      IF NOT v_cat.price_enabled THEN
        v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','price_mode','reason','priceNotAllowed'));
      ELSIF p_price_amount IS NULL THEN
        v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','price_amount','reason','required'));
      ELSIF p_price_amount <= 0 THEN
        v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','price_amount','reason','notPositive'));
      END IF;
      SELECT d.home_country_code INTO v_home FROM public.user_directory d WHERE d.user_id = p_uid;
      v_cur := upper(coalesce(p_price_currency,
        (SELECT k.currency_code FROM public.countries k WHERE k.code = v_home)));
      IF v_cur IS NULL THEN
        v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','price_currency','reason','required'));
      ELSIF NOT EXISTS (SELECT 1 FROM public.currencies c WHERE c.code = v_cur) THEN
        v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','price_currency','reason','unknownCurrency','detail',v_cur));
        v_cur := NULL;
      END IF;
    ELSE
      IF p_price_amount IS NOT NULL THEN
        v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','price_amount','reason','mustBeEmpty'));
      END IF;
      v_cur := NULL;
    END IF;

    IF v_mode IN ('free','contact') THEN
      v_neg := false;
    END IF;

    IF v_mode <> 'commission' AND p_price_bp IS NOT NULL THEN
      v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','price_bp','reason','mustBeEmpty'));
    END IF;

    IF v_bval IS NOT NULL THEN
      v_derived := coalesce(v_fperiod, v_cat.default_price_period);
      IF p_price_period IS NOT NULL AND p_price_period <> v_derived THEN
        v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','price_period','reason','periodFollowsBasis','detail',v_derived));
      END IF;
      v_period := v_derived;
      IF v_period NOT IN ('once','hour','day','week','month','year') THEN
        v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','price_period','reason','badValue','detail',v_period));
      END IF;
    ELSE
      v_period := coalesce(p_price_period, v_cat.default_price_period);
      IF v_period NOT IN ('once','hour','day','week','month','year') THEN
        v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','price_period','reason','badValue','detail',v_period));
      ELSIF v_cat.price_period_locked AND v_period <> v_cat.default_price_period THEN
        v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','price_period','reason','periodLocked','detail',v_cat.default_price_period));
      END IF;
    END IF;

  ELSE
    v_period := coalesce(p_price_period, v_cat.default_price_period);
    v_cur := upper(p_price_currency);
  END IF;

  -- ---- the seller's own end date (M5 / DEC-117; INC-400, INC-414, INC-415) ----
  -- An ad has no end unless the seller sets a date or its category holds a
  -- limit: no 60-day fallback. Judged whenever a date is sent, at any step.
  v_days := v_cat.expiry_days;
  IF p_poster_expires_at IS NOT NULL THEN
    IF p_poster_expires_at < now() + interval '1 day' THEN
      v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','poster_expires_at','reason','posterExpiryTooSoon'));
    ELSIF v_days IS NOT NULL AND p_poster_expires_at > now() + make_interval(days => v_days) THEN
      v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','poster_expires_at','reason','posterExpiryTooLate','detail',v_days::text));
    END IF;
  END IF;

  -- ---- step 6 — coverage against the plan (DEC-064 as amended 2026-09-29, D19) ----
  -- W6 ruling (1): places that are SENT are judged at ANY step, because
  -- submit_listing writes them on every send. Only "a place is required" waits
  -- for step 6. W6 INC-337: every place is a CITY or a SUB-CITY; a region or a
  -- country alone never counts. The one-market refusal is retired (2026-09-29):
  -- countries are counted against the plan's max_countries.
  IF p_coverage IS NOT NULL AND array_length(p_coverage, 1) IS NOT NULL THEN
    SELECT c.id INTO v_bad
      FROM unnest(p_coverage) c(id)
     WHERE NOT EXISTS (
       SELECT 1 FROM public.locations l
        JOIN public.countries k ON k.code = l.country_code
       WHERE l.id = c.id AND l.is_active AND k.is_active)
     LIMIT 1;
    IF v_bad IS NOT NULL THEN
      v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','coverage','reason','unknownPlace','detail',v_bad::text));
    ELSE
      SELECT c.id INTO v_bad
        FROM unnest(p_coverage) c(id)
        JOIN public.locations l ON l.id = c.id
       WHERE l.level NOT IN ('city','sub_city')
       LIMIT 1;
      IF v_bad IS NOT NULL THEN
        v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','coverage','reason','cityRequired','detail',v_bad::text));
      ELSE
        -- G29 — each count lands in its OWN variable (1dc182d8:298 named v_lands twice).
        -- INC-341 — every place is a city or a sub-city: a sub-city counts as
        -- its own city, regions are the distinct regions of the chosen places.
        SELECT count(DISTINCT l.country_code),
               count(DISTINCT coalesce(l.city_id, l.id)),
               count(DISTINCT l.region_id),
               count(*) FILTER (WHERE l.level = 'country'),
               min(l.country_code)
          INTO v_lands, v_cities, v_regions, v_anchors, v_market
          FROM public.locations l WHERE l.id = ANY (p_coverage);
        SELECT * INTO v_plan FROM public.coverage_plans WHERE plan = 'free';
        IF v_cities > v_plan.max_cities THEN
          v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','coverage','reason','coverageExceedsPlan:city','detail',v_cities::text));
        END IF;
        IF v_regions > v_plan.max_regions THEN
          v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','coverage','reason','coverageExceedsPlan:region','detail',v_regions::text));
        END IF;
        IF v_lands > v_plan.max_countries THEN
          v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','coverage','reason','coverageExceedsPlan:country','detail',v_lands::text));
        END IF;
        IF p_step >= 6 THEN
          v_place := p_coverage[1];
        END IF;
      END IF;
    END IF;
  ELSIF p_step >= 6 THEN
    v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','coverage','reason','required'));
  END IF;

  -- ---- step 7 — the contact shape ----
  IF p_step >= 7 THEN
    v_ref := v_ref || public.listing_contact_refusals(p_contact_pref);
  END IF;

  -- ---- step 8 — review (M5): the seller is named and the home country is
  -- confirmed. Publish and edit_listing judge at step 8, so these refusals
  -- arrive with any others; saves on the contact step (7) are not refused.
  IF p_step >= 8 THEN
    -- Bundle 3 step 12 / M5 step 20 — a post needs a home country the seller confirmed.
    IF coalesce((SELECT d.country_source FROM public.user_directory d WHERE d.user_id = p_uid), '')
         <> 'user_confirmed' THEN
      v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','home_country_code','reason','required'));
    END IF;
    -- M5 step 22 (INC-423) — a public name always; a person also a first and
    -- a last name; a business a business name (its two names may stay empty).
    SELECT * INTO v_prof FROM public.profiles WHERE user_id = p_uid;
    IF btrim(coalesce(v_prof.seller_alias, '')) = '' THEN
      v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','alias','reason','required'));
    END IF;
    IF coalesce(v_prof.seller_type, 'person') = 'business' THEN
      IF btrim(coalesce(v_prof.business_name, '')) = '' THEN
        v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','business_name','reason','required'));
      END IF;
    ELSE
      IF btrim(coalesce(v_prof.first_name, '')) = '' THEN
        v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','first_name','reason','required'));
      END IF;
      IF btrim(coalesce(v_prof.last_name, '')) = '' THEN
        v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','last_name','reason','required'));
      END IF;
    END IF;
  END IF;

  IF jsonb_array_length(v_ref) > 0 THEN
    RETURN jsonb_build_object('ok', false, 'refusals', v_ref);
  END IF;

  RETURN jsonb_build_object(
    'ok', true,
    'attrs', v_attrs,
    'title', v_title,
    'description', v_desc,
    'price_mode', v_mode,
    'price_amount', CASE WHEN v_mode = 'fixed' THEN p_price_amount ELSE NULL END,
    'price_currency', CASE WHEN v_mode = 'fixed' THEN v_cur ELSE NULL END,
    'price_period', v_period,
    'price_bp', CASE WHEN v_mode = 'commission' THEN p_price_bp ELSE NULL END,
    'price_negotiable', v_neg,
    'location_id', v_place,
    'market', v_market,
    'price_unit', v_unit,
    'price_unit_text', v_unit_tx
  );
END $$;
REVOKE ALL ON FUNCTION public.validate_listing_draft(uuid, smallint, uuid, text, text, text, jsonb, text, numeric, character, text, timestamptz, uuid[], jsonb, jsonb, integer, boolean) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.validate_listing_draft(uuid, smallint, uuid, text, text, text, jsonb, text, numeric, character, text, timestamptz, uuid[], jsonb, jsonb, integer, boolean) TO service_role;

-- submit_listing
CREATE OR REPLACE FUNCTION public.submit_listing(p_listing_id uuid, p_step smallint, p_category_id uuid, p_title text, p_description text, p_video_url text, p_attributes jsonb, p_price_mode text, p_price_amount numeric, p_price_currency character, p_price_period text, p_poster_expires_at timestamp with time zone, p_coverage uuid[], p_contact_pref jsonb, p_price_bp integer DEFAULT NULL::integer, p_price_negotiable boolean DEFAULT false)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid    uuid := auth.uid();
  v_obs    char(2);
  v_prev   public.listings%ROWTYPE;
  v_row    public.listings%ROWTYPE;
  v_val    jsonb;
  v_step   smallint;
  v_id     uuid;
  v_before jsonb;
  v_after  jsonb;
  v_diff_b jsonb := '{}'::jsonb;
  v_diff_a jsonb := '{}'::jsonb;
  v_key    text;
  v_rate   jsonb;
BEGIN
  -- F5: gates -> capture -> mutate. A refusal writes nothing.
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF EXISTS (SELECT 1 FROM public.profiles WHERE user_id = v_uid AND account_status = 'deactivated') THEN
    RAISE EXCEPTION 'account is deactivated';
  END IF;

  v_rate := public.rate_gate('draft');
  IF NOT coalesce((v_rate->>'allowed')::boolean, false) THEN
    RETURN jsonb_build_object('ok', false, 'refusals', jsonb_build_array(
      jsonb_build_object('field', 'rate', 'reason', 'rateLimited',
                         'resets_at', v_rate->>'resets_at')));
  END IF;

  IF p_step IS NULL OR p_step < 1 OR p_step > 8 THEN RAISE EXCEPTION 'unknown step'; END IF;

  IF p_listing_id IS NOT NULL THEN
    SELECT * INTO v_prev FROM public.listings WHERE id = p_listing_id FOR UPDATE;
    IF NOT FOUND THEN RAISE EXCEPTION 'listing not found'; END IF;
    IF v_prev.seller_id <> v_uid THEN RAISE EXCEPTION 'not your listing'; END IF;
    IF v_prev.status <> 'draft' THEN
      RAISE EXCEPTION 'only a draft is writable here; a live listing edits through edit_listing';
    END IF;
  END IF;

  -- DEC-068: residency is a server fact, never client-supplied.
  SELECT d.observed_country_code INTO v_obs FROM public.user_directory d WHERE d.user_id = v_uid;
  IF v_obs IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'refusals',
      jsonb_build_array(jsonb_build_object('field','residency','reason','residencyUnknown')));
  END IF;

  v_step := greatest(coalesce(v_prev.draft_step, 0::smallint), p_step);

  v_val := public.validate_listing_draft(v_uid, p_step, p_category_id, p_title, p_description,
             p_video_url, p_attributes, p_price_mode, p_price_amount, p_price_currency,
             p_price_period, p_poster_expires_at, p_coverage, p_contact_pref,
             coalesce(v_prev.attributes, '{}'::jsonb), p_price_bp, p_price_negotiable);
  IF NOT coalesce((v_val->>'ok')::boolean, false) THEN
    RETURN v_val;
  END IF;

  IF p_listing_id IS NULL THEN
    INSERT INTO public.listings (
      seller_id, category_id, location_id, title, description, attributes,
      price_amount, price_currency, price_bp, price_negotiable, price_mode, price_period, poster_expires_at,
      video_url, contact_pref, status, home_country_code, draft_step, draft_updated_at,
      price_unit, price_unit_text
    ) VALUES (
      v_uid, p_category_id, (v_val->>'location_id')::uuid, v_val->>'title', v_val->>'description',
      v_val->'attrs', (v_val->>'price_amount')::numeric, (v_val->>'price_currency')::char(3),
      (v_val->>'price_bp')::int, coalesce((v_val->>'price_negotiable')::boolean, false), v_val->>'price_mode', v_val->>'price_period', p_poster_expires_at,
      p_video_url, coalesce(p_contact_pref, '{"messages": true}'::jsonb), 'draft', v_obs,
      v_step, now(),
      v_val->>'price_unit', v_val->>'price_unit_text'
    ) RETURNING * INTO v_row;
    v_id := v_row.id;
  ELSE
    UPDATE public.listings SET
      category_id       = p_category_id,
      location_id       = coalesce((v_val->>'location_id')::uuid, location_id),
      title             = v_val->>'title',
      description       = v_val->>'description',
      attributes        = v_val->'attrs',
      price_amount      = (v_val->>'price_amount')::numeric,
      price_currency    = (v_val->>'price_currency')::char(3),
      price_bp          = (v_val->>'price_bp')::int,
      price_negotiable  = coalesce((v_val->>'price_negotiable')::boolean, false),
      price_mode        = v_val->>'price_mode',
      price_period      = v_val->>'price_period',
      poster_expires_at = p_poster_expires_at,
      video_url         = p_video_url,
      contact_pref      = coalesce(p_contact_pref, contact_pref),
      price_unit        = v_val->>'price_unit',
      price_unit_text   = v_val->>'price_unit_text',
      home_country_code = v_obs,
      draft_step        = v_step,
      draft_updated_at  = now(),
      updated_at        = now()
    WHERE id = p_listing_id
    RETURNING * INTO v_row;
    -- INC-324: the row is locked for the save; a delete that won the race is
    -- answered as not found, never as a null write.
    IF NOT FOUND THEN RAISE EXCEPTION 'listing not found'; END IF;
    v_id := v_row.id;
  END IF;

  -- Coverage replaces wholesale (batch) once step 6 has spoken.
  IF p_coverage IS NOT NULL AND array_length(p_coverage, 1) IS NOT NULL THEN
    DELETE FROM public.listing_locations WHERE listing_id = v_id;
    INSERT INTO public.listing_locations (listing_id, location_id)
      SELECT v_id, c.id FROM unnest(p_coverage) c(id)
      ON CONFLICT DO NOTHING;
  END IF;

  -- Revision: the changed fields only.
  v_after  := to_jsonb(v_row) - 'search_tsv';
  v_before := CASE WHEN p_listing_id IS NULL THEN NULL ELSE to_jsonb(v_prev) - 'search_tsv' END;
  IF v_before IS NOT NULL THEN
    FOR v_key IN SELECT k FROM jsonb_object_keys(v_after) k LOOP
      IF (v_after->v_key) IS DISTINCT FROM (v_before->v_key) THEN
        v_diff_a := v_diff_a || jsonb_build_object(v_key, v_after->v_key);
        v_diff_b := v_diff_b || jsonb_build_object(v_key, v_before->v_key);
      END IF;
    END LOOP;
  ELSE
    v_diff_a := v_after;
    v_diff_b := NULL;
  END IF;

  INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
    VALUES (v_id, v_uid, CASE WHEN p_listing_id IS NULL THEN 'create' ELSE 'edit' END,
            v_diff_b, v_diff_a, v_uid);

  -- INC-321 — the answer names the currency the door stored (its own home fill
  -- included) so the client can mirror it; nothing else in the answer changes.
  RETURN jsonb_build_object('ok', true, 'listing_id', v_id, 'draft_step', v_step,
                            'price_currency', v_row.price_currency);
END $function$;
REVOKE ALL ON FUNCTION public.submit_listing(uuid, smallint, uuid, text, text, text, jsonb, text, numeric, character, text, timestamptz, uuid[], jsonb, integer, boolean) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.submit_listing(uuid, smallint, uuid, text, text, text, jsonb, text, numeric, character, text, timestamptz, uuid[], jsonb, integer, boolean) TO authenticated;
GRANT ALL ON FUNCTION public.submit_listing(uuid, smallint, uuid, text, text, text, jsonb, text, numeric, character, text, timestamptz, uuid[], jsonb, integer, boolean) TO service_role;

-- edit_listing
CREATE OR REPLACE FUNCTION public.edit_listing(
  p_listing_id uuid,
  p_category_id uuid,
  p_title text,
  p_description text,
  p_video_url text,
  p_attributes jsonb,
  p_price_mode text,
  p_price_amount numeric,
  p_price_currency char(3),
  p_price_period text,
  p_poster_expires_at timestamptz,
  p_coverage uuid[],
  p_contact_pref jsonb,
  p_price_bp integer DEFAULT NULL,
  p_price_negotiable boolean DEFAULT false
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid    uuid := auth.uid();
  v_prev   public.listings%ROWTYPE;
  v_row    public.listings%ROWTYPE;
  v_val    jsonb;
  v_before jsonb;
  v_after  jsonb;
  v_diff_a jsonb := '{}'::jsonb;
  v_diff_b jsonb := '{}'::jsonb;
  v_key    text;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF EXISTS (SELECT 1 FROM public.profiles WHERE user_id = v_uid AND account_status = 'deactivated') THEN
    RAISE EXCEPTION 'account is deactivated';
  END IF;
  SELECT * INTO v_prev FROM public.listings WHERE id = p_listing_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'listing not found'; END IF;
  IF v_prev.seller_id <> v_uid THEN RAISE EXCEPTION 'not your listing'; END IF;
  IF v_prev.status NOT IN ('active','reduced','rejected','held','expired') THEN
    RAISE EXCEPTION 'edit_listing takes a published listing; a draft writes through submit_listing';
  END IF;

  -- M5 — the judge at step 8 also refuses an unnamed seller and an
  -- unconfirmed home country, with the same fields as on publish.
  v_val := public.validate_listing_draft(v_uid, 8::smallint, p_category_id, p_title, p_description,
             p_video_url, p_attributes, p_price_mode, p_price_amount, p_price_currency,
             p_price_period, p_poster_expires_at, p_coverage, p_contact_pref, v_prev.attributes,
             p_price_bp, p_price_negotiable);
  IF NOT coalesce((v_val->>'ok')::boolean, false) THEN
    RETURN v_val;
  END IF;

  UPDATE public.listings SET
    category_id       = p_category_id,
    location_id       = (v_val->>'location_id')::uuid,
    title             = v_val->>'title',
    description       = v_val->>'description',
    attributes        = v_val->'attrs',
    price_amount      = (v_val->>'price_amount')::numeric,
    price_currency    = (v_val->>'price_currency')::char(3),
    price_mode        = v_val->>'price_mode',
    price_period      = v_val->>'price_period',
    price_bp          = (v_val->>'price_bp')::integer,
    price_negotiable  = coalesce((v_val->>'price_negotiable')::boolean, false),
    poster_expires_at = p_poster_expires_at,
    video_url         = p_video_url,
    contact_pref      = p_contact_pref,
    -- M5 / DEC-109 — the unit the ad is sold per, from the basis in force.
    price_unit        = v_val->>'price_unit',
    price_unit_text   = v_val->>'price_unit_text',
    status            = 'screening',
    updated_at        = now()
  WHERE id = p_listing_id
  RETURNING * INTO v_row;

  DELETE FROM public.listing_locations WHERE listing_id = p_listing_id;
  INSERT INTO public.listing_locations (listing_id, location_id)
    SELECT p_listing_id, c.id FROM unnest(p_coverage) c(id) ON CONFLICT DO NOTHING;

  v_after  := to_jsonb(v_row) - 'search_tsv';
  v_before := to_jsonb(v_prev) - 'search_tsv';
  FOR v_key IN SELECT k FROM jsonb_object_keys(v_after) k LOOP
    IF (v_after->v_key) IS DISTINCT FROM (v_before->v_key) THEN
      v_diff_a := v_diff_a || jsonb_build_object(v_key, v_after->v_key);
      v_diff_b := v_diff_b || jsonb_build_object(v_key, v_before->v_key);
    END IF;
  END LOOP;

  INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
    VALUES (p_listing_id, v_uid, 'edit', v_diff_b, v_diff_a, v_uid);

  RETURN jsonb_build_object('ok', true, 'status', 'screening');
END $$;
REVOKE ALL ON FUNCTION public.edit_listing(uuid, uuid, text, text, text, jsonb, text, numeric, character, text, timestamptz, uuid[], jsonb, integer, boolean) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.edit_listing(uuid, uuid, text, text, text, jsonb, text, numeric, character, text, timestamptz, uuid[], jsonb, integer, boolean) TO authenticated;
GRANT ALL ON FUNCTION public.edit_listing(uuid, uuid, text, text, text, jsonb, text, numeric, character, text, timestamptz, uuid[], jsonb, integer, boolean) TO service_role;

-- publish_listing
CREATE OR REPLACE FUNCTION public.publish_listing(p_listing_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid uuid := auth.uid();
  v_row public.listings%ROWTYPE;
  v_cov uuid[];
  v_val jsonb;
  v_rate jsonb;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;

  v_rate := public.rate_gate('post');
  IF NOT coalesce((v_rate->>'allowed')::boolean, false) THEN
    RETURN jsonb_build_object('ok', false, 'refusals', jsonb_build_array(
      jsonb_build_object('field', 'rate', 'reason', 'rateLimited',
                         'resets_at', v_rate->>'resets_at')));
  END IF;

  SELECT * INTO v_row FROM public.listings WHERE id = p_listing_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'listing not found'; END IF;
  IF v_row.seller_id <> v_uid THEN RAISE EXCEPTION 'not your listing'; END IF;
  IF v_row.status NOT IN ('draft','rejected') THEN
    RAISE EXCEPTION 'illegal transition: % -> screening', v_row.status;
  END IF;

  -- M5 step 20 — the home-country check (bundle 3 step 12) and the naming
  -- check (step 22) live in the judge at step 8, so their refusals arrive
  -- with any others.
  SELECT array_agg(ll.location_id) INTO v_cov
    FROM public.listing_locations ll WHERE ll.listing_id = p_listing_id;

  v_val := public.validate_listing_draft(v_uid, 8::smallint, v_row.category_id, v_row.title,
             v_row.description, v_row.video_url, v_row.attributes, v_row.price_mode,
             v_row.price_amount, v_row.price_currency, v_row.price_period,
             v_row.poster_expires_at, v_cov, v_row.contact_pref, v_row.attributes,
             v_row.price_bp, v_row.price_negotiable);
  IF NOT coalesce((v_val->>'ok')::boolean, false) THEN
    RETURN v_val;
  END IF;

  UPDATE public.listings SET
    status = 'screening',
    published_first_at = coalesce(published_first_at, now()),
    draft_step = 8,
    attested_at = now(),  -- M5 step 19 — the seller's statement, stamped on every publish
    updated_at = now()
  WHERE id = p_listing_id;

  INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
    VALUES (p_listing_id, v_uid, 'state',
            jsonb_build_object('status', v_row.status),
            jsonb_build_object('status', 'screening'), v_uid);

  RETURN jsonb_build_object('ok', true, 'status', 'screening');
END $function$;
REVOKE ALL ON FUNCTION public.publish_listing(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.publish_listing(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.publish_listing(uuid) TO service_role;

-- get_posting_schema
CREATE OR REPLACE FUNCTION public.get_posting_schema(p_category_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_cat public.categories;
  v_attrs jsonb;
  v_basis text[];
  v_doc jsonb;
  v_rate jsonb;
  v_deal jsonb;
  v_has_unit boolean;
BEGIN
  v_rate := public.rate_gate('schema_read');
  IF NOT coalesce((v_rate->>'allowed')::boolean, false) THEN
    RAISE EXCEPTION 'rateLimited';
  END IF;

  SELECT * INTO v_cat FROM public.categories WHERE id = p_category_id;
  IF v_cat.id IS NULL THEN
    RAISE EXCEPTION 'categoryNotFound';
  END IF;
  IF NOT v_cat.is_active THEN
    RAISE EXCEPTION 'categoryInactive';
  END IF;
  IF NOT v_cat.allow_listings THEN
    RAISE EXCEPTION 'categoryNotPostable';
  END IF;

  v_basis := public.price_basis_keys(p_category_id);

  -- M5 / DEC-109 — the price page's rows, grouped by deal_group, display order.
  SELECT EXISTS (SELECT 1 FROM public.effective_category_links(p_category_id) e
                   JOIN public.attributes a ON a.id = e.attribute_id
                  WHERE a.attr_key ~ '^unit_of_sale(-|$)')
    INTO v_has_unit;
  SELECT jsonb_build_object('basis', '[]'::jsonb, 'size', '[]'::jsonb,
                            'quantity', '[]'::jsonb, 'terms', '[]'::jsonb)
         || coalesce(jsonb_object_agg(g.grp, g.keys), '{}'::jsonb)
    INTO v_deal
    FROM (SELECT public.deal_group(a.attr_key, v_has_unit) AS grp,
                 jsonb_agg(a.attr_key ORDER BY e.display_order, a.attr_key) AS keys
            FROM public.effective_category_links(p_category_id) e
            JOIN public.attributes a ON a.id = e.attribute_id
           WHERE public.deal_group(a.attr_key, v_has_unit) IS NOT NULL
           GROUP BY 1) g;

  SELECT coalesce(jsonb_agg(row ORDER BY ord, key), '[]'::jsonb)
    INTO v_attrs
    FROM (
      SELECT e.display_order AS ord, a.attr_key AS key,
             jsonb_build_object(
               'attribute_id', a.id,
               'attr_key', a.attr_key,
               'attr_type', a.attr_type,
               'name_en', a.name_en,
               'name_am', a.name_am,
               'help_text_en', a.help_text_en,
               'help_text_am', a.help_text_am,
               'is_required', e.is_required,
               'display_order', e.display_order,
               'card_rank', e.card_rank,
               'unit', a.unit,
               'min_bound', a.min_bound,
               'max_bound', a.max_bound,
               'decimals', a.decimals,
               'format', a.format,
               'preset', a.preset,
               'max_length', a.max_length,
               'allowed_options', to_jsonb(l.allowed_options),
               'default_value', l.default_value,
               'visible_when', l.visible_when,
               'option_count', (
                 SELECT count(*)
                   FROM jsonb_array_elements(
                          CASE WHEN jsonb_typeof(a.options) = 'array' THEN a.options ELSE '[]'::jsonb END) o
                  WHERE coalesce((o.value->>'active')::boolean, true)
                    AND (l.allowed_options IS NULL
                         OR (o.value->>'value') = ANY (l.allowed_options))
               ),
               'allow_other', EXISTS (
                 SELECT 1
                   FROM jsonb_array_elements(
                          CASE WHEN jsonb_typeof(a.options) = 'array' THEN a.options ELSE '[]'::jsonb END) o
                  WHERE o.value->>'value' = 'other'
                    AND (l.allowed_options IS NULL
                         OR 'other' = ANY (l.allowed_options))
               )
             ) AS row
        FROM public.effective_category_links(p_category_id) e
        JOIN public.attributes a ON a.id = e.attribute_id
        JOIN public.category_attribute_links l ON l.id = e.link_id
    ) s;

  v_doc := jsonb_build_object(
    'category', jsonb_build_object(
      'id', v_cat.id,
      'slug', v_cat.slug,
      'name_en', v_cat.name_en,
      'price_enabled', v_cat.price_enabled,
      'default_price_period', v_cat.default_price_period,
      'price_period_locked', v_cat.price_period_locked,
      'expiry_days', v_cat.expiry_days,
      'is_restricted', v_cat.is_restricted,
      'capabilities', to_jsonb(v_cat.capabilities),
      'illustration', v_cat.image_url,
      -- Kept through M5 so the old screen keeps reading it; dropped in M6.
      'price_basis_key', CASE WHEN cardinality(v_basis) = 1 THEN v_basis[1] ELSE NULL END,
      'deal', v_deal
    ),
    'attributes', v_attrs,
    'plan', public.plan_caps(public.seller_plan(auth.uid()))
  );
  -- M5 / DEC-109 — no schema-time priceBasisAmbiguous: ambiguity is judged
  -- with the answers (price_basis_in_force, validate_listing_draft step 4).
  RETURN v_doc;
END $$;
REVOKE ALL ON FUNCTION public.get_posting_schema(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_posting_schema(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.get_posting_schema(uuid) TO service_role;

-- get_attribute_options
CREATE OR REPLACE FUNCTION public.get_attribute_options(p_attribute_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 VOLATILE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_opts jsonb;
  v_found boolean;
  v_rate  jsonb;
BEGIN
  -- M5 step 20 — every read counts under options_read; the function is
  -- VOLATILE on purpose because rate_gate writes the meter.
  v_rate := public.rate_gate('options_read');
  IF NOT coalesce((v_rate->>'allowed')::boolean, false) THEN
    RAISE EXCEPTION 'rateLimited';
  END IF;

  SELECT true,
         coalesce((
           SELECT jsonb_agg(
                    jsonb_strip_nulls(jsonb_build_object(
                      'value',    o.value->>'value',
                      'label_en', o.value->>'label_en',
                      'label_am', o.value->>'label_am',
                      'parent',   o.value->>'parent',
                      'aliases',  CASE WHEN jsonb_typeof(o.value->'aliases') = 'array' THEN o.value->'aliases' END,
                      'bounds',   CASE WHEN jsonb_typeof(o.value->'bounds')  = 'object' THEN o.value->'bounds' END,
                      'allowed',  CASE WHEN jsonb_typeof(o.value->'allowed') = 'object' THEN o.value->'allowed' END,
                      'facts',    CASE WHEN jsonb_typeof(o.value->'facts')   = 'object' THEN o.value->'facts' END,
                      -- D28 / M-SWATCH — the declared colour, projected for the
                      -- posting form. A non-string cell is silence (the shape
                      -- rule refuses one at the door).
                      'swatch',   CASE WHEN jsonb_typeof(o.value->'swatch')  = 'string' THEN o.value->'swatch' END
                    ))
                    ORDER BY o.ordinality)
             FROM jsonb_array_elements(
                    CASE WHEN jsonb_typeof(a.options) = 'array' THEN a.options ELSE '[]'::jsonb END)
                  WITH ORDINALITY o(value, ordinality)
            WHERE coalesce((o.value->>'active')::boolean, true)
         ), '[]'::jsonb)
    INTO v_found, v_opts
    FROM public.attributes a
   WHERE a.id = p_attribute_id;

  IF NOT coalesce(v_found, false) THEN
    RAISE EXCEPTION 'attributeNotFound';
  END IF;

  RETURN jsonb_build_object(
    'options', v_opts,
    'version', public.get_attribute_options_version(p_attribute_id)
  );
END $function$;
REVOKE ALL ON FUNCTION public.get_attribute_options(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_attribute_options(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.get_attribute_options(uuid) TO service_role;

-- transition_listing
CREATE OR REPLACE FUNCTION public.transition_listing(p_listing_id uuid, p_new_status text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid      uuid := auth.uid();
  v_row      public.listings%ROWTYPE;
  v_service  boolean := (v_uid IS NULL AND current_setting('role', true) IS DISTINCT FROM 'anon');
  v_reviewer boolean := false;
  v_enforcer boolean := false;
  v_owner    boolean := false;
  v_ok       boolean := false;
BEGIN
  IF p_new_status NOT IN ('draft','screening','active','reduced','rejected','held','expired','sold','removed') THEN
    RAISE EXCEPTION 'unknown status: %', p_new_status;
  END IF;

  SELECT * INTO v_row FROM public.listings WHERE id = p_listing_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'listing not found'; END IF;

  IF v_uid IS NOT NULL THEN
    IF EXISTS (SELECT 1 FROM public.profiles WHERE user_id = v_uid AND account_status = 'deactivated') THEN
      RAISE EXCEPTION 'account is deactivated';
    END IF;
    v_owner    := (v_row.seller_id = v_uid);
    v_reviewer := public.has_permission(v_uid, 'listings', 'review');
    v_enforcer := public.has_permission(v_uid, 'listings', 'enforce');
    IF NOT (v_owner OR v_reviewer OR v_enforcer) THEN
      RAISE EXCEPTION 'not your listing';
    END IF;
  END IF;

  -- The gateway/reviewer branch: only these roles may put a listing in front of
  -- a visitor. No owner door reaches 'active'.
  IF p_new_status IN ('active','reduced','rejected','held') THEN
    IF NOT (v_service OR v_reviewer) THEN
      RAISE EXCEPTION 'reviewer only: % -> %', v_row.status, p_new_status;
    END IF;
    v_ok := CASE v_row.status
      WHEN 'screening' THEN p_new_status IN ('active','reduced','rejected','held')
      WHEN 'held'      THEN p_new_status IN ('active','reduced','rejected')
      ELSE false
    END;
  ELSIF p_new_status = 'screening' THEN
    v_ok := v_row.status IN ('draft','active','reduced','rejected','expired','sold');
  ELSIF p_new_status IN ('sold','expired') THEN
    v_ok := v_row.status IN ('active','reduced');
  ELSIF p_new_status = 'removed' THEN
    IF v_owner AND NOT (v_service OR v_enforcer) THEN
      IF v_row.status = 'rejected' AND coalesce(v_row.screening->>'severe','false') = 'true' THEN
        RAISE EXCEPTION 'a listing rejected for a severe reason is removed by enforcement only';
      END IF;
      v_ok := true;
    ELSE
      v_ok := (v_service OR v_enforcer);
      IF NOT v_ok THEN
        RAISE EXCEPTION 'enforcement only: % -> removed', v_row.status;
      END IF;
    END IF;
  ELSE
    v_ok := false;
  END IF;

  IF NOT v_ok THEN
    RAISE EXCEPTION 'illegal transition: % -> %', v_row.status, p_new_status;
  END IF;

  IF p_new_status IN ('active','reduced') THEN
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
  ELSE
    UPDATE public.listings SET status = p_new_status, updated_at = now()
     WHERE id = p_listing_id;
  END IF;

  INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
    VALUES (p_listing_id, v_row.seller_id, 'state',
            jsonb_build_object('status', v_row.status),
            jsonb_build_object('status', p_new_status), v_uid);
END $$;
REVOKE ALL ON FUNCTION public.transition_listing(uuid, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.transition_listing(uuid, text) TO authenticated;
GRANT ALL ON FUNCTION public.transition_listing(uuid, text) TO service_role;

-- renew_listing
CREATE OR REPLACE FUNCTION public.renew_listing(p_listing_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE v_uid uuid := auth.uid(); v_row public.listings%ROWTYPE; v_last timestamptz;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  SELECT * INTO v_row FROM public.listings WHERE id = p_listing_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'listing not found'; END IF;
  IF v_row.seller_id <> v_uid THEN RAISE EXCEPTION 'not your listing'; END IF;
  IF v_row.status <> 'active' THEN
    RETURN jsonb_build_object('ok', false, 'refusals',
      jsonb_build_array(jsonb_build_object('field','status','reason','renewNeedsActive')));
  END IF;
  SELECT max(r.created_at) INTO v_last FROM public.listing_revisions r
   WHERE r.listing_id = p_listing_id AND r.kind = 'state' AND r.after ? 'renewed_count';
  IF v_last IS NOT NULL AND v_last > now() - interval '7 days' THEN
    RETURN jsonb_build_object('ok', false, 'refusals',
      jsonb_build_array(jsonb_build_object('field','renew','reason','renewTooSoon')));
  END IF;
  -- M5 / DEC-117 — a seller's date that has passed is cleared; the new end is
  -- LEAST(the seller's date, now() + the category's days), NULL when both are absent.
  UPDATE public.listings SET
    poster_expires_at = CASE WHEN v_row.poster_expires_at <= now() THEN NULL ELSE v_row.poster_expires_at END,
    expires_at = LEAST(CASE WHEN v_row.poster_expires_at <= now() THEN NULL ELSE v_row.poster_expires_at END,
      now() + make_interval(days => (SELECT c.expiry_days FROM public.categories c WHERE c.id = v_row.category_id))),
    renewed_count = renewed_count + 1,
    updated_at = now()
  WHERE id = p_listing_id;
  INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
    VALUES (p_listing_id, v_uid, 'state',
            jsonb_build_object('renewed_count', v_row.renewed_count, 'expires_at', v_row.expires_at,
                               'poster_expires_at', v_row.poster_expires_at),
            jsonb_build_object('renewed_count', v_row.renewed_count + 1), v_uid);
  RETURN jsonb_build_object('ok', true, 'renewed_count', v_row.renewed_count + 1);
END $$;
REVOKE ALL ON FUNCTION public.renew_listing(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.renew_listing(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.renew_listing(uuid) TO service_role;

-- expire_stale_listings
CREATE OR REPLACE FUNCTION public.expire_stale_listings()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE v_count integer;
BEGIN
  UPDATE public.listings
     SET status = 'expired'
   WHERE status = 'active'
     AND expires_at IS NOT NULL
     AND expires_at < now();
  GET DIAGNOSTICS v_count = ROW_COUNT;
  -- M5 / DEC-117 — one heartbeat row per run (scheduled as listing-expiry-sweep).
  INSERT INTO public.listing_expiry_sweep_runs (expired) VALUES (v_count);
  DELETE FROM public.listing_expiry_sweep_runs WHERE ran_at < now() - interval '14 days';
  RETURN v_count;
END; $$;
REVOKE ALL ON FUNCTION public.expire_stale_listings() FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.expire_stale_listings() TO service_role;

-- set_listing_pin
CREATE OR REPLACE FUNCTION public.set_listing_pin(p_listing_id uuid, p_lat numeric DEFAULT NULL::numeric, p_lng numeric DEFAULT NULL::numeric, p_precision text DEFAULT NULL::text, p_street text DEFAULT NULL::text, p_zoom smallint DEFAULT NULL::smallint, p_directions text DEFAULT NULL::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid    uuid := auth.uid();
  v_row    public.listings%ROWTYPE;
  v_lat    numeric;
  v_lng    numeric;
  v_prec   text;
  v_street text;
  v_dirs   text;
  v_zoom   smallint;
  v_before jsonb;
  v_after  jsonb;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;

  SELECT * INTO v_row FROM public.listings
   WHERE id = p_listing_id AND seller_id = v_uid;
  IF v_row.id IS NULL THEN RAISE EXCEPTION 'not your listing'; END IF;

  IF v_row.status NOT IN ('draft','active','reduced','rejected','held','expired') THEN
    RAISE EXCEPTION 'pinNotEditable:%', v_row.status;
  END IF;

  v_street := nullif(btrim(regexp_replace(
                regexp_replace(coalesce(p_street, ''), '[[:cntrl:]<>]', ' ', 'g'),
                '\s+', ' ', 'g')), '');
  IF v_street IS NOT NULL AND char_length(v_street) > 200 THEN
    RAISE EXCEPTION 'streetTooLong:%', char_length(v_street);
  END IF;
  IF v_street IS NOT NULL AND public.attr_contact_like(v_street) THEN
    RAISE EXCEPTION 'contactInNote';
  END IF;

  -- step 5 / step 10 — the directions line is sanitised as the note is and
  -- refused with contactInNote under the same rule.
  v_dirs := nullif(btrim(regexp_replace(
              regexp_replace(coalesce(p_directions, ''), '[[:cntrl:]<>]', ' ', 'g'),
              '\s+', ' ', 'g')), '');
  IF v_dirs IS NOT NULL AND char_length(v_dirs) > 200 THEN
    RAISE EXCEPTION 'directionsTooLong:%', char_length(v_dirs);
  END IF;
  IF v_dirs IS NOT NULL AND public.attr_contact_like(v_dirs) THEN
    RAISE EXCEPTION 'contactInNote';
  END IF;

  IF p_lat IS NULL OR p_lng IS NULL THEN
    v_lat := NULL; v_lng := NULL; v_prec := NULL; v_zoom := NULL;
  ELSE
    IF p_lat < -90 OR p_lat > 90 THEN
      RAISE EXCEPTION 'badLatitude:%', p_lat;
    END IF;
    IF p_lng < -180 OR p_lng > 180 THEN
      RAISE EXCEPTION 'badLongitude:%', p_lng;
    END IF;
    v_prec := lower(btrim(coalesce(p_precision, 'exact')));
    IF v_prec NOT IN ('exact','approx') THEN
      RAISE EXCEPTION 'badPrecision:%', v_prec;
    END IF;
    IF p_zoom IS NOT NULL AND (p_zoom < 3 OR p_zoom > 20) THEN
      RAISE EXCEPTION 'badZoom:%', p_zoom;
    END IF;
    v_lat := round(p_lat, 6);
    v_lng := round(p_lng, 6);
    -- A re-sent pin without a zoom keeps the zoom it was saved at.
    v_zoom := coalesce(p_zoom, CASE WHEN v_row.pin_lat IS NOT NULL THEN v_row.pin_zoom END);
  END IF;

  v_before := jsonb_build_object('pin_lat', v_row.pin_lat, 'pin_lng', v_row.pin_lng,
                                 'pin_precision', v_row.pin_precision, 'pin_zoom', v_row.pin_zoom,
                                 'street_address', v_row.street_address,
                                 'directions', v_row.directions);
  v_after  := jsonb_build_object('pin_lat', v_lat, 'pin_lng', v_lng,
                                 'pin_precision', v_prec, 'pin_zoom', v_zoom,
                                 'street_address', v_street,
                                 'directions', v_dirs);

  UPDATE public.listings
     SET pin_lat = v_lat, pin_lng = v_lng, pin_precision = v_prec, pin_zoom = v_zoom,
         street_address = v_street, directions = v_dirs,
         pin_show_lat = CASE WHEN v_lat IS NULL THEN NULL
                             WHEN v_prec = 'approx' THEN round(v_lat, 2)
                             ELSE v_lat END,
         pin_show_lng = CASE WHEN v_lng IS NULL THEN NULL
                             WHEN v_prec = 'approx' THEN round(v_lng, 2)
                             ELSE v_lng END,
         updated_at = now()
   WHERE id = p_listing_id;

  INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
  VALUES (p_listing_id, v_uid, 'edit', v_before, v_after, v_uid);

  RETURN jsonb_build_object('ok', true) || v_after;
END $function$;
REVOKE ALL ON FUNCTION public.set_listing_pin(uuid, numeric, numeric, text, text, smallint, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.set_listing_pin(uuid, numeric, numeric, text, text, smallint, text) TO authenticated;
GRANT ALL ON FUNCTION public.set_listing_pin(uuid, numeric, numeric, text, text, smallint, text) TO service_role;

-- ── 7. Data fixes ────────────────────────────────────────────────────────
-- Step 3: a draft whose draft_step is 4 (title judged, price not) becomes 3.
UPDATE public.listings SET draft_step = 3 WHERE status = 'draft' AND draft_step = 4;

-- Step 16: a live listing whose category holds no limit ends at its seller's
-- date (NULL when none).
UPDATE public.listings l SET expires_at = l.poster_expires_at
  FROM public.categories c
 WHERE c.id = l.category_id AND c.expiry_days IS NULL
   AND l.status IN ('active', 'reduced')
   AND l.expires_at IS DISTINCT FROM l.poster_expires_at;

-- Step 10: the unit each listing is sold per, from the basis in force.
WITH b AS (
  SELECT l.id, l.attributes AS a,
         public.price_basis_in_force(l.category_id, l.attributes, l.attributes)->>'key' AS k
    FROM public.listings l
), u AS (
  SELECT b.id, b.a -> b.k AS ans,
         nullif(btrim(coalesce(CASE jsonb_typeof(b.a -> b.k)
                                 WHEN 'string' THEN b.a ->> b.k
                                 WHEN 'object' THEN b.a -> b.k ->> 'value' END, '')), '') AS unit
    FROM b WHERE b.k IS NOT NULL
)
UPDATE public.listings l
   SET price_unit = u.unit,
       price_unit_text = CASE WHEN u.unit = 'other'
                              THEN nullif(btrim(coalesce(public.attr_answer_other_text(u.ans), '')), '') END
  FROM u
 WHERE l.id = u.id AND u.unit IS NOT NULL;

-- ── 8. Schedules ─────────────────────────────────────────────────────────
DO $cron$
BEGIN
  IF EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'listing-expiry-sweep') THEN
    PERFORM cron.unschedule('listing-expiry-sweep');
  END IF;
  PERFORM cron.schedule('listing-expiry-sweep', '17 * * * *', 'SELECT public.expire_stale_listings()');
  IF EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'name-folds-rebuild') THEN
    PERFORM cron.unschedule('name-folds-rebuild');
  END IF;
  PERFORM cron.schedule('name-folds-rebuild', '41 * * * *', 'SELECT public.name_folds_rebuild()');
END $cron$;

-- ── 9. Proofs (behaviour only; every scratch row is rolled back) ────────
DO $proof$
DECLARE
  r text[];
  v_user uuid; v_ghost uuid := gen_random_uuid(); v_loc uuid;
  a_offer uuid; a_ua uuid; a_ub uuid; a_rent uuid; a_pack uuid;
  c_a uuid; c_b uuid; c_c uuid; c_d uuid; c_lim uuid;
  l1 uuid; l2 uuid; l3 uuid; l4 uuid;
  v jsonb; v_doc jsonb; v_n int; v_m int; v_t timestamptz; v_clash int := 0; k record;
  C_UA constant text := 'unit_of_sale-e2em5a';
  C_UB constant text := 'unit_of_sale-e2em5b';
  C_RENT constant text := 'pricing_type-e2em5';
  C_OFFER constant text := 'e2e_m5_offer';
BEGIN
  -- ── step 6: deal_group rows ──
  ASSERT public.deal_group('unit_of_sale-food', false) = 'basis', 'unit_of_sale-food';
  ASSERT public.deal_group('pricing_type', false) = 'basis', 'pricing_type';
  ASSERT public.deal_group('pricing_type-travel', false) = 'basis', 'pricing_type-travel';
  ASSERT public.deal_group('pack_quantity', true) = 'size', 'pack_quantity with a unit';
  ASSERT public.deal_group('pack_quantity', false) IS NULL, 'pack_quantity without';
  ASSERT public.deal_group('volume_ml', false) IS NULL, 'volume_ml without';
  ASSERT public.deal_group('quantity_available', false) = 'quantity', 'quantity_available';
  ASSERT public.deal_group('lease_term', false) = 'terms', 'lease_term';
  ASSERT public.deal_group('payment_plan', false) = 'terms', 'payment_plan';
  ASSERT public.deal_group('min_hire_days', false) = 'terms', 'min_hire_days';
  ASSERT public.deal_group('term_deposit', false) = 'terms', 'term_deposit';
  ASSERT public.deal_group('offer_type', true) IS NULL, 'offer_type';
  ASSERT public.deal_group('offer_type-real-estate', true) IS NULL, 'offer_type-real-estate';
  ASSERT public.deal_group('terminal_type', true) IS NULL, 'terminal_type';
  ASSERT public.deal_group('condition', true) IS NULL, 'condition';

  -- ── step 24: every name-rule row of M2, M4 and M4b, on name_folds ──
  ASSERT (SELECT count(*) FROM public.name_folds) > 0, 'name_folds built';
  ASSERT (SELECT count(*) FROM public.name_folds_runs) >= 1, 'rebuild heartbeat';
  FOREACH r SLICE 1 IN ARRAY ARRAY[
    ['ethio_coffee','b'],['abebe_ethio','b'],['ethi0_coffee','b'],['admin_abebe','c'],
    ['abebeadmin','c'],['abebe_support','c'],['telebirr_official','c'],['login_help','c'],
    ['account','d'],['settings','d'],['telebirr','d'],['gmail_com','d'],['kenya','d'],
    ['telebirr_store','e'],['store_telebirr','e'],['telebirrstore','e'],['te1ebirr_store','e'],
    ['telebirr_agent','e'],['cbe_agent','e'],['cbe_kenya','e'],['telebirr_et','e'],
    ['abc_1234567','a'],['abel','a'],['_abebe','a'],['abebe__shop','a'],['12345abc','a'],
    ['telebirr2024','d'],['telebirr_2024','d'],['2024telebirr','a'],['te1ebirr77','d'],
    ['telebirr1','d'],['telebirr_1','d'],['cbe123','d'],['te1ebirr1','d'],['awashbank2','d'],
    ['telebirr_shop1','e'],['telebirr1_store','e'],['store2_telebirr','e'],['telebirrstore9','e']] LOOP
    ASSERT public.alias_rule(r[1]) IS NOT DISTINCT FROM r[2],
      format('judge %s: expected %s, got %s', r[1], r[2], public.alias_rule(r[1]));
  END LOOP;
  FOREACH r SLICE 1 IN ARRAY ARRAY[['badminton_shop'],['selam_telebirr'],['abebe_kenya'],['abebe_et'],
    ['made_by_us'],['tiger_store'],['awash_market'],['abebe_phones'],['abebephones'],['selam2shop'],
    ['mekdes_boutique'],['hana_store'],['abebe1'],['tiger1'],['bolt24'],['abebe_2024'],['hana_store2'],
    ['selam_telebirr1'],['phones24']] LOOP
    ASSERT public.alias_rule(r[1]) IS NULL, format('judge %s should pass, got %s', r[1], public.alias_rule(r[1]));
  END LOOP;
  FOREACH r SLICE 1 IN ARRAY ARRAY[['Ethio Coffee','b'],['ኢትዮ ቡና','b'],['Telebirr','d'],['Awash Bank','d'],
    ['አዋሽ ባንክ','d'],['Telebirr Agent','e'],['Telebirr 2024','d'],['Telebirr 1','d'],['Awash Bank 2','d'],
    ['Telebirr Shop 24','e']] LOOP
    ASSERT public.business_name_rule(r[1]) IS NOT DISTINCT FROM r[2],
      format('business %s: expected %s, got %s', r[1], r[2], public.business_name_rule(r[1]));
  END LOOP;
  FOREACH r SLICE 1 IN ARRAY ARRAY[['Selam Telebirr Shop'],['Awash Coffee'],['Hana Boutique'],
    ['Selam Phones 2'],['Bolt 24']] LOOP
    ASSERT public.business_name_rule(r[1]) IS NULL, format('business %s should pass', r[1]);
  END LOOP;
  -- Every verdict read from the live rules before the rewrite is unchanged.
  SELECT count(*) INTO v_n FROM m5_verdicts t
   WHERE t.verdict IS DISTINCT FROM CASE t.kind WHEN 'alias' THEN public.alias_rule(t.name)
                                                ELSE public.business_name_rule(t.name) END;
  ASSERT v_n = 0, format('%s verdicts changed by the name_folds rewrite', v_n);

  -- ── scratch rows (rolled back at the end of this inner block) ──
  BEGIN
    -- M2's live-catalogue proofs, now through name_folds_rebuild().
    INSERT INTO public.attributes (attr_key, name_en, attr_type, options)
    VALUES ('e2e_m5_brand', 'E2E M5 Brand', 'single_select',
            '[{"value":"zorblax","label_en":"Zorblax","label_am":"ዞርብላክስ"}]'::jsonb);
    INSERT INTO public.categories (name_en, slug) VALUES ('Qwyxcat', 'e2e-m5-qwyxcat');
    INSERT INTO public.locations (level, country_code, name_en, slug)
    VALUES ('country', 'ET', 'Vrendolia', 'e2e-m5-vrendolia');
    ASSERT public.alias_rule('zorblax') IS NULL, 'before the rebuild the new brand is unknown';
    PERFORM public.name_folds_rebuild();
    ASSERT public.alias_rule('zorblax') = 'd', 'scratch brand exact';
    ASSERT public.alias_rule('zorblax_store') = 'e', 'scratch brand beside store';
    ASSERT public.alias_rule('selam_zorblax') IS NULL, 'scratch brand beside selam passes';
    ASSERT public.alias_rule('qwyxcat') = 'd', 'scratch category name exact';
    ASSERT public.alias_rule('vrendolia') = 'd', 'scratch place name exact';

    -- Scratch catalogue for steps 6, 7, 10, 16.
    INSERT INTO public.attributes (attr_key, name_en, attr_type, options) VALUES
      (C_OFFER, 'E2E M5 Offer', 'single_select',
       '[{"value":"sale","label_en":"Sale","label_am":"ሽያጭ"},{"value":"hire","label_en":"Hire","label_am":"ኪራይ"}]')
      RETURNING id INTO a_offer;
    INSERT INTO public.attributes (attr_key, name_en, attr_type, options) VALUES
      (C_UA, 'E2E M5 Unit A', 'single_select',
       '[{"value":"per_kg","label_en":"per kg","label_am":"በኪሎ"},{"value":"per_pack","label_en":"per pack","label_am":"በፓኬት"},{"value":"other","label_en":"Other","label_am":"ሌላ"}]')
      RETURNING id INTO a_ua;
    INSERT INTO public.attributes (attr_key, name_en, attr_type, options) VALUES
      (C_UB, 'E2E M5 Unit B', 'single_select', '[{"value":"per_kg","label_en":"per kilo","label_am":"በኪሎ"}]')
      RETURNING id INTO a_ub;
    INSERT INTO public.attributes (attr_key, name_en, attr_type, options) VALUES
      (C_RENT, 'E2E M5 Rent', 'single_select',
       '[{"value":"per_month","label_en":"per month","label_am":"በወር"},{"value":"per_day","label_en":"per day","label_am":"በቀን"}]')
      RETURNING id INTO a_rent;
    INSERT INTO public.attributes (attr_key, name_en, attr_type) VALUES
      ('pack_quantity-e2em5', 'E2E M5 Pack', 'number') RETURNING id INTO a_pack;

    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, default_price_period)
      VALUES ('E2E M5 A', 'e2e-m5-a', true, true, true, 'once') RETURNING id INTO c_a;
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, default_price_period)
      VALUES ('E2E M5 B', 'e2e-m5-b', true, true, true, 'once') RETURNING id INTO c_b;
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, default_price_period)
      VALUES ('E2E M5 C', 'e2e-m5-c', true, true, true, 'once') RETURNING id INTO c_c;
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, default_price_period)
      VALUES ('E2E M5 D', 'e2e-m5-d', true, true, true, 'month') RETURNING id INTO c_d;
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, default_price_period, expiry_days)
      VALUES ('E2E M5 Limit', 'e2e-m5-limit', true, true, true, 'once', 30) RETURNING id INTO c_lim;

    INSERT INTO public.category_attribute_links (category_id, attribute_id, is_required, display_order, visible_when) VALUES
      (c_a, a_ua, false, 1, NULL), (c_a, a_pack, false, 2, NULL),
      (c_b, a_offer, false, 1, NULL), (c_b, a_ua, false, 2, NULL),
      (c_b, a_rent, false, 3, jsonb_build_object('key', C_OFFER, 'in', jsonb_build_array('hire'))),
      (c_c, a_ua, false, 1, NULL), (c_c, a_ub, false, 2, NULL),
      (c_d, a_offer, false, 1, NULL),
      (c_d, a_ua, false, 2, jsonb_build_object('key', C_OFFER, 'in', jsonb_build_array('hire')));

    ASSERT public.deal_keys(c_a) = ARRAY[C_UA, 'pack_quantity-e2em5'], 'deal_keys A';
    ASSERT public.deal_keys(c_b) = ARRAY[C_UA, C_RENT], 'deal_keys B';
    v_doc := public.get_posting_schema(c_b);
    ASSERT v_doc->'category'->'deal'->'basis' = jsonb_build_array(C_UA, C_RENT), 'schema deal basis';
    ASSERT v_doc->'category'->'deal'->'size' = '[]'::jsonb, 'schema deal size empty';
    v_doc := public.get_posting_schema(c_c);
    ASSERT NOT (v_doc ? 'refusals'), 'no schema-time ambiguity';
    ASSERT v_doc->'category'->'deal'->'basis' = jsonb_build_array(C_UA, C_UB), 'schema deal basis C';

    -- step 7 (a) one unconditional unit key.
    ASSERT public.price_basis_in_force(c_a, '{}', '{}')->>'key' = C_UA, '(a) key';
    -- (b) unit + rent shown when offer = hire.
    ASSERT public.price_basis_in_force(c_b, '{}', '{}')->>'key' = C_UA, '(b) offer absent';
    ASSERT public.price_basis_in_force(c_b, jsonb_build_object(C_OFFER, 'sale'), '{}')->>'key' = C_UA, '(b) sale';
    ASSERT public.price_basis_in_force(c_b, jsonb_build_object(C_OFFER, 'hire'), '{}')->>'key' = C_RENT, '(b) hire';
    -- (c) two unit keys both in force.
    ASSERT (public.price_basis_in_force(c_c, '{}', '{}')->>'ambiguous')::boolean, '(c) ambiguous';
    -- (d) one conditional basis, hidden.
    ASSERT public.price_basis_in_force(c_d, '{}', '{}')->>'key' IS NULL, '(d) no key';

    -- The judge (validate_listing_draft) on those cases.
    SELECT id INTO v_user FROM auth.users ORDER BY created_at LIMIT 1;
    ASSERT v_user IS NOT NULL, 'an account exists';
    ASSERT EXISTS (SELECT 1 FROM public.profiles WHERE user_id = v_user), 'the account has a profile';
    v := public.validate_listing_draft(v_user, 4::smallint, c_a, '', '', NULL,
           jsonb_build_object(C_UA, 'per_kg'), 'fixed', 100, 'ETB', NULL, NULL, NULL, NULL, '{}'::jsonb, NULL, false);
    ASSERT (v->>'ok')::boolean, format('(a) step 4 with no title passes: %s', v);
    ASSERT v->>'price_unit' = 'per_kg' AND v->>'price_period' = 'once', format('(a) unit: %s', v);
    v := public.validate_listing_draft(v_user, 4::smallint, c_a, '', '', NULL,
           jsonb_build_object(C_UA, jsonb_build_object('value', 'other', 'text', 'per sack')),
           'fixed', 100, 'ETB', NULL, NULL, NULL, NULL, '{}'::jsonb, NULL, false);
    ASSERT v->>'price_unit' = 'other' AND v->>'price_unit_text' = 'per sack', format('(a) other unit: %s', v);
    v := public.validate_listing_draft(v_user, 4::smallint, c_a, '', '', NULL,
           '{}', 'fixed', NULL, 'ETB', NULL, NULL, NULL, NULL, '{}'::jsonb, NULL, false);
    ASSERT v->'refusals' @> '[{"field":"price_amount","reason":"required"}]', format('step 4 with no price refused: %s', v);
    v := public.validate_listing_draft(v_user, 5::smallint, c_a, '', '', NULL,
           '{}', 'fixed', 100, 'ETB', NULL, NULL, NULL, NULL, '{}'::jsonb, NULL, false);
    ASSERT v->'refusals' @> '[{"field":"title","reason":"required"}]', format('step 5 with no title refused: %s', v);
    v := public.validate_listing_draft(v_user, 2::smallint, c_a, '', '', 'not a link',
           '{}', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{}'::jsonb, NULL, false);
    ASSERT v->'refusals' @> '[{"field":"video_url","reason":"badShape"}]', format('video judged at any step: %s', v);
    v := public.validate_listing_draft(v_user, 4::smallint, c_b, '', '', NULL,
           jsonb_build_object(C_OFFER, 'hire', C_RENT, 'per_month'), 'fixed', 100, 'ETB', NULL, NULL, NULL, NULL,
           '{}'::jsonb, NULL, false);
    ASSERT (v->>'ok')::boolean AND v->>'price_period' = 'month' AND v->>'price_unit' = 'per_month',
      format('(b) hire: the period follows the rent key: %s', v);
    v := public.validate_listing_draft(v_user, 4::smallint, c_c, '', '', NULL,
           jsonb_build_object(C_UA, 'per_kg', C_UB, 'per_kg'), 'fixed', 100, 'ETB', NULL, NULL, NULL, NULL,
           '{}'::jsonb, NULL, false);
    ASSERT v->'refusals' @> '[{"field":"price_mode","reason":"priceBasisAmbiguous"}]', format('(c) ambiguous at step 4: %s', v);
    v := public.validate_listing_draft(v_user, 4::smallint, c_d, '', '', NULL,
           '{}', 'fixed', 100, 'ETB', NULL, NULL, NULL, NULL, '{}'::jsonb, NULL, false);
    ASSERT (v->>'ok')::boolean AND v->>'price_period' = 'month' AND v->>'price_unit' IS NULL,
      format('(d) hidden basis: the category period: %s', v);

    -- step 16: a seller's date 90 days ahead passes with no limit; refused with one.
    v := public.validate_listing_draft(v_user, 2::smallint, c_a, '', '', NULL,
           '{}', NULL, NULL, NULL, NULL, now() + interval '90 days', NULL, NULL, '{}'::jsonb, NULL, false);
    ASSERT NOT coalesce(v->'refusals', '[]') @> '[{"field":"poster_expires_at"}]', format('90 days, no limit: %s', v);
    v := public.validate_listing_draft(v_user, 2::smallint, c_lim, '', '', NULL,
           '{}', NULL, NULL, NULL, NULL, now() + interval '90 days', NULL, NULL, '{}'::jsonb, NULL, false);
    ASSERT v->'refusals' @> '[{"field":"poster_expires_at","reason":"posterExpiryTooLate"}]', format('90 days, limit 30: %s', v);

    -- step 20 / 22: country and names at step 8, not at step 7.
    v := public.validate_listing_draft(v_ghost, 7::smallint, c_a, 't', '', NULL,
           '{}', 'contact', NULL, NULL, NULL, NULL, NULL, '{"messages": true}'::jsonb, '{}'::jsonb, NULL, false);
    ASSERT NOT coalesce(v->'refusals', '[]') @> '[{"field":"home_country_code"}]', format('step 7 unconfirmed passes: %s', v);
    v := public.validate_listing_draft(v_ghost, 8::smallint, c_a, 't', '', NULL,
           '{}', 'contact', NULL, NULL, NULL, NULL, NULL, '{"messages": true}'::jsonb, '{}'::jsonb, NULL, false);
    ASSERT v->'refusals' @> '[{"field":"home_country_code","reason":"required"}]', format('step 8 unconfirmed refused: %s', v);
    ASSERT v->'refusals' @> '[{"field":"alias","reason":"required"}]', format('no public name refused: %s', v);
    ASSERT v->'refusals' @> '[{"field":"first_name","reason":"required"}]', format('person, no first name: %s', v);
    UPDATE public.user_directory SET country_source = 'user_confirmed', home_country_code = 'ET' WHERE user_id = v_user;
    UPDATE public.profiles SET seller_alias = 'e2em5seller', seller_type = 'business',
                               business_name = 'E2E M5 Business', first_name = NULL, last_name = NULL
     WHERE user_id = v_user;
    v := public.validate_listing_draft(v_user, 8::smallint, c_a, 't', '', NULL,
           '{}', 'contact', NULL, NULL, NULL, NULL, NULL, '{"messages": true}'::jsonb, '{}'::jsonb, NULL, false);
    ASSERT NOT coalesce(v->'refusals', '[]') @> '[{"field":"home_country_code"}]'
       AND NOT coalesce(v->'refusals', '[]') @> '[{"field":"alias"}]'
       AND NOT coalesce(v->'refusals', '[]') @> '[{"field":"first_name"}]'
       AND NOT coalesce(v->'refusals', '[]') @> '[{"field":"last_name"}]'
       AND NOT coalesce(v->'refusals', '[]') @> '[{"field":"business_name"}]', format('named business passes: %s', v);
    UPDATE public.profiles SET seller_type = 'person', first_name = NULL, last_name = 'Kebede' WHERE user_id = v_user;
    v := public.validate_listing_draft(v_user, 8::smallint, c_a, 't', '', NULL,
           '{}', 'contact', NULL, NULL, NULL, NULL, NULL, '{"messages": true}'::jsonb, '{}'::jsonb, NULL, false);
    ASSERT v->'refusals' @> '[{"field":"first_name","reason":"required"}]'
       AND NOT v->'refusals' @> '[{"field":"alias"}]', format('named person with no first name: %s', v);

    -- step 16: transition and renew give the LEAST rule; the sweep writes its row.
    SELECT id INTO v_loc FROM public.locations WHERE level = 'city' ORDER BY slug LIMIT 1;
    INSERT INTO public.listings (seller_id, category_id, location_id, title, description, attributes,
                                 price_mode, status, home_country_code, poster_expires_at)
    VALUES (v_user, c_a, v_loc, 'e2e m5 one', '', '{}', 'contact', 'screening', 'ET', NULL) RETURNING id INTO l1;
    INSERT INTO public.listings (seller_id, category_id, location_id, title, description, attributes,
                                 price_mode, status, home_country_code, poster_expires_at)
    VALUES (v_user, c_a, v_loc, 'e2e m5 two', '', '{}', 'contact', 'screening', 'ET', now() + interval '90 days')
      RETURNING id INTO l2;
    INSERT INTO public.listings (seller_id, category_id, location_id, title, description, attributes,
                                 price_mode, status, home_country_code, poster_expires_at)
    VALUES (v_user, c_lim, v_loc, 'e2e m5 three', '', '{}', 'contact', 'screening', 'ET', now() + interval '90 days')
      RETURNING id INTO l3;
    INSERT INTO public.listings (seller_id, category_id, location_id, title, description, attributes,
                                 price_mode, status, home_country_code, poster_expires_at)
    VALUES (v_user, c_lim, v_loc, 'e2e m5 four', '', '{}', 'contact', 'screening', 'ET', NULL) RETURNING id INTO l4;
    PERFORM public.transition_listing(l1, 'active');
    PERFORM public.transition_listing(l2, 'active');
    PERFORM public.transition_listing(l3, 'active');
    PERFORM public.transition_listing(l4, 'active');
    ASSERT (SELECT expires_at FROM public.listings WHERE id = l1) IS NULL, 'no limit, no date: no end';
    ASSERT (SELECT expires_at = poster_expires_at FROM public.listings WHERE id = l2), 'no limit: the seller''s date';
    ASSERT (SELECT expires_at BETWEEN now() + interval '29 days' AND now() + interval '31 days'
              FROM public.listings WHERE id = l3), 'limit 30 and a 90-day date: 30 days';
    ASSERT (SELECT expires_at BETWEEN now() + interval '29 days' AND now() + interval '31 days'
              FROM public.listings WHERE id = l4), 'limit 30, no date: 30 days';

    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_user::text, 'role', 'authenticated')::text, true);
    UPDATE public.listings SET poster_expires_at = now() - interval '1 day' WHERE id = l2;
    v := public.renew_listing(l2);
    ASSERT (v->>'ok')::boolean, format('renew: %s', v);
    ASSERT (SELECT poster_expires_at IS NULL AND expires_at IS NULL FROM public.listings WHERE id = l2),
      'renew clears a passed seller date; no limit: no end';
    v := public.renew_listing(l3);
    ASSERT (SELECT expires_at BETWEEN now() + interval '29 days' AND now() + interval '31 days'
              FROM public.listings WHERE id = l3), 'renew with a limit: LEAST';

    -- step 15: photos coming soon, owner only.
    v := public.set_listing_photos_soon(l2, true);
    ASSERT (v->>'ok')::boolean AND (SELECT photos_soon FROM public.listings WHERE id = l2), 'photos_soon saved';
    ASSERT EXISTS (SELECT 1 FROM public.listing_revisions WHERE listing_id = l2 AND after ? 'photos_soon'),
      'photos_soon revision';

    -- step 18: the seller's place, owner only.
    v := public.save_seller_place(l2);
    ASSERT (v->>'ok')::boolean AND EXISTS (SELECT 1 FROM public.seller_places WHERE user_id = v_user), 'place saved';
    ASSERT public.my_seller_place()->>'location_id' = v_loc::text, 'my_seller_place';
    PERFORM public.clear_seller_place();
    ASSERT NOT EXISTS (SELECT 1 FROM public.seller_places WHERE user_id = v_user), 'place cleared';
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_ghost::text, 'role', 'authenticated')::text, true);
    BEGIN
      PERFORM public.save_seller_place(l2);
      ASSERT false, 'another user saved a place from a listing they do not own';
    EXCEPTION WHEN raise_exception THEN
      ASSERT SQLERRM = 'not your listing', format('refusal: %s', SQLERRM);
    END;
    ASSERT public.my_seller_place() IS NULL, 'another user reads nothing';
    PERFORM set_config('request.jwt.claims', '', true);

    -- step 16: one sweep run writes its row and expires a passed listing.
    UPDATE public.listings SET expires_at = now() - interval '1 hour' WHERE id = l1;
    SELECT count(*) INTO v_n FROM public.listing_expiry_sweep_runs;
    PERFORM public.expire_stale_listings();
    ASSERT (SELECT count(*) FROM public.listing_expiry_sweep_runs) = v_n + 1, 'sweep heartbeat';
    ASSERT (SELECT status FROM public.listings WHERE id = l1) = 'expired', 'sweep expired the passed listing';

    RAISE EXCEPTION 'm5 scratch rollback' USING ERRCODE = 'P0R99';
  EXCEPTION WHEN SQLSTATE 'P0R99' THEN NULL;
  END;
  ASSERT NOT EXISTS (SELECT 1 FROM public.attributes WHERE attr_key LIKE 'e2e_m5%' OR attr_key LIKE '%-e2em5%'), 'scratch attributes left';
  ASSERT NOT EXISTS (SELECT 1 FROM public.categories WHERE slug LIKE 'e2e-m5-%'), 'scratch categories left';
  ASSERT NOT EXISTS (SELECT 1 FROM public.locations WHERE slug = 'e2e-m5-vrendolia'), 'scratch place left';
  ASSERT NOT EXISTS (SELECT 1 FROM public.listings WHERE title LIKE 'e2e m5 %'), 'scratch listings left';
  ASSERT public.alias_rule('zorblax') IS NULL, 'name_folds back to the real set';

  -- Unit-label clashes (printed; the first list by attr_key wins).
  FOR k IN
    SELECT o.value->>'value' AS token, count(DISTINCT coalesce(o.value->>'label_en','')||'|'||coalesce(o.value->>'label_am','')) AS n,
           string_agg(DISTINCT a.attr_key || '=' || coalesce(o.value->>'label_en',''), ', ') AS lists
      FROM public.attributes a, jsonb_array_elements(CASE WHEN jsonb_typeof(a.options) = 'array' THEN a.options ELSE '[]'::jsonb END) o
     WHERE a.attr_key ~ '^(pricing_type|unit_of_sale)(-|$)' AND jsonb_typeof(o.value) = 'object'
     GROUP BY 1 HAVING count(DISTINCT coalesce(o.value->>'label_en','')||'|'||coalesce(o.value->>'label_am','')) > 1
  LOOP
    v_clash := v_clash + 1;
    RAISE NOTICE 'price_unit_labels clash: % (% labels): %', k.token, k.n, k.lists;
  END LOOP;
  ASSERT jsonb_typeof(public.price_unit_labels()) = 'object', 'price_unit_labels';
  INSERT INTO m5_timing VALUES ('meta', 'clashes', '', v_clash);

  -- ACL read-backs.
  ASSERT has_column_privilege('anon', 'public.listings', 'price_unit', 'SELECT'), 'anon price_unit';
  ASSERT has_column_privilege('anon', 'public.listings', 'price_unit_text', 'SELECT'), 'anon price_unit_text';
  ASSERT has_column_privilege('anon', 'public.listings', 'photos_soon', 'SELECT'), 'anon photos_soon';
  ASSERT NOT has_column_privilege('anon', 'public.listings', 'attested_at', 'SELECT'), 'anon attested_at';
  ASSERT NOT has_column_privilege('authenticated', 'public.listings', 'attested_at', 'SELECT'), 'auth attested_at';
  ASSERT NOT has_table_privilege('anon', 'public.seller_places', 'SELECT'), 'anon seller_places';
  ASSERT NOT has_table_privilege('authenticated', 'public.seller_places', 'SELECT'), 'auth seller_places';
  ASSERT NOT has_table_privilege('authenticated', 'public.seller_places', 'INSERT'), 'auth seller_places insert';
  ASSERT NOT has_table_privilege('authenticated', 'public.name_folds', 'SELECT'), 'auth name_folds';
  ASSERT NOT has_table_privilege('authenticated', 'public.listing_expiry_sweep_runs', 'SELECT'), 'auth sweep runs';
  ASSERT NOT has_function_privilege('authenticated', 'public.validate_listing_draft(uuid, smallint, uuid, text, text, text, jsonb, text, numeric, character, text, timestamptz, uuid[], jsonb, jsonb, integer, boolean)', 'EXECUTE'), 'judge server-only';
  ASSERT NOT has_function_privilege('authenticated', 'public.alias_rule(text, boolean)', 'EXECUTE'), 'alias_rule server-only';
  ASSERT NOT has_function_privilege('authenticated', 'public.name_folds_rebuild()', 'EXECUTE'), 'rebuild server-only';
  ASSERT NOT has_function_privilege('authenticated', 'public.deal_keys(uuid)', 'EXECUTE'), 'deal_keys server-only';
  ASSERT NOT has_function_privilege('anon', 'public.set_listing_photos_soon(uuid, boolean)', 'EXECUTE'), 'anon photos door';
  ASSERT has_function_privilege('authenticated', 'public.set_listing_photos_soon(uuid, boolean)', 'EXECUTE'), 'auth photos door';
  ASSERT has_function_privilege('anon', 'public.price_unit_labels()', 'EXECUTE'), 'anon unit labels';
  ASSERT NOT has_function_privilege('anon', 'public.save_seller_place(uuid)', 'EXECUTE'), 'anon place door';
  ASSERT has_function_privilege('authenticated', 'public.submit_listing(uuid, smallint, uuid, text, text, text, jsonb, text, numeric, character, text, timestamptz, uuid[], jsonb, integer, boolean)', 'EXECUTE'), 'submit door';
  ASSERT (SELECT provolatile FROM pg_proc WHERE oid = 'public.get_attribute_options(uuid)'::regprocedure) = 'v', 'options read volatile';
  ASSERT (SELECT max_count = 400 AND window_seconds = 3600 FROM public.rate_dials WHERE action = 'options_read'), 'options_read dial';
  ASSERT (SELECT count(*) FROM public.rate_dials) = 7, 'seven dials';
  ASSERT EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'listing-expiry-sweep' AND schedule = '17 * * * *'), 'expiry sweep scheduled';
  ASSERT EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'name-folds-rebuild' AND schedule = '41 * * * *'), 'rebuild scheduled';
  ASSERT NOT EXISTS (SELECT 1 FROM public.listings WHERE status = 'draft' AND draft_step = 4), 'no draft at step 4';
END $proof$;

-- ── 10. After: the same timings on the new rules ───────────────────────
DO $t$
DECLARE
  v_name text; i int; t0 timestamptz; v text; b boolean; f text;
  v_meta jsonb;
BEGIN
  FOREACH v_name IN ARRAY ARRAY['abebe_phones', 'telebirr1', 'selam_telebirr1'] LOOP
    f := public.name_fold(v_name);
    FOR i IN 1..10 LOOP
      t0 := clock_timestamp();
      v := public.alias_rule(v_name);
      INSERT INTO m5_timing VALUES ('after', 'alias_rule', v_name, extract(epoch FROM clock_timestamp() - t0) * 1000);
      t0 := clock_timestamp();
      b := public.alias_taken(v_name, NULL);
      INSERT INTO m5_timing VALUES ('after', 'alias_taken', v_name, extract(epoch FROM clock_timestamp() - t0) * 1000);
      t0 := clock_timestamp();
      b := EXISTS (SELECT 1 FROM public.name_folds n WHERE n.fold = f) OR public.name_folds_protected(f);
      INSERT INTO m5_timing VALUES ('after', 'name_folds_lookup', v_name, extract(epoch FROM clock_timestamp() - t0) * 1000);
    END LOOP;
  END LOOP;
  SELECT jsonb_object_agg(x.phase || ':' || x.fn || ':' || x.name, round(x.med, 3)) INTO v_meta
    FROM (SELECT phase, fn, name, percentile_cont(0.5) WITHIN GROUP (ORDER BY ms)::numeric AS med
            FROM m5_timing WHERE phase IN ('before', 'after') GROUP BY 1, 2, 3) x;
  v_meta := v_meta || jsonb_build_object('unit_label_clashes',
              (SELECT ms FROM m5_timing WHERE phase = 'meta' AND fn = 'clashes'));
  RAISE NOTICE 'M5 timing medians (ms): %', v_meta;
  -- The medians are kept with the migration's own audit row so they can be
  -- read back after apply (the read-only role cannot run the name rules).
  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
  VALUES (NULL, 'migration.m5_timing', 'migration', '20261004090000', v_meta);
END $t$;

DROP TABLE m5_timing;
DROP TABLE m5_verdicts;

-- Healer line: 20261004072852_d59800cd… is a comment-only file ("-- placeholder")
-- applied in error just before this file; it executes nothing. Its ledger row
-- is recorded here, as M2 did for 60b466e2.
INSERT INTO public.migration_marks (version) VALUES ('20261004072852') ON CONFLICT DO NOTHING;
INSERT INTO public.migration_marks (version) VALUES ('20261004090000') ON CONFLICT DO NOTHING;