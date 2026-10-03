-- bundle 3 M1b — corrective for M1 (20261003220000): brief dials, step-12 home
-- country at publish, owner reads drop home_country_code, validate_listing_draft
-- leaves the browser, and the deny-all follow-up gets its ledger row from a file.
-- e2e-areas: posting, routes

-- 4. Dials return to the brief (exactly six rows).
DELETE FROM public.rate_dials WHERE action IN ('geocode', 'upload', 'assist:listing');
INSERT INTO public.rate_dials (action, max_count, window_seconds) VALUES
  ('draft', 600, 3600),
  ('post', 10, 86400),
  ('identity', 20, 86400),
  ('alias_check', 60, 3600),
  ('schema_read', 120, 3600),
  ('contact_reveal', 30, 86400)
ON CONFLICT (action) DO UPDATE
  SET max_count = EXCLUDED.max_count, window_seconds = EXCLUDED.window_seconds;

-- 5. publish_listing, whole from live; the one change is the step-12 refusal.
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

  -- Bundle 3 step 12 — a post needs a home country the seller confirmed.
  IF coalesce((SELECT d.country_source FROM public.user_directory d WHERE d.user_id = v_uid), '')
       <> 'user_confirmed' THEN
    RETURN jsonb_build_object('ok', false, 'refusals', jsonb_build_array(
      jsonb_build_object('field', 'home_country_code', 'reason', 'required')));
  END IF;

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

-- 7. Owner reads, whole from live; the one change is home_country_code removed.
CREATE OR REPLACE FUNCTION public.my_listing_private(p_listing_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid uuid := auth.uid();
  v_row public.listings%ROWTYPE;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  SELECT * INTO v_row FROM public.listings
   WHERE id = p_listing_id AND seller_id = v_uid;
  IF NOT FOUND THEN RAISE EXCEPTION 'not your listing'; END IF;
  RETURN jsonb_build_object(
    'listing_id', v_row.id,
    'contact_pref', v_row.contact_pref,
    'pin_lat', v_row.pin_lat,
    'pin_lng', v_row.pin_lng,
    'pin_precision', v_row.pin_precision,
    'pin_zoom', v_row.pin_zoom,
    'street_address', v_row.street_address,
    'directions', v_row.directions
  );
END $function$;
REVOKE ALL ON FUNCTION public.my_listing_private(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.my_listing_private(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.my_listing_private(uuid) TO service_role;

CREATE OR REPLACE FUNCTION public.my_last_listing_private(p_exclude uuid DEFAULT NULL::uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid uuid := auth.uid();
  v_row public.listings%ROWTYPE;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  SELECT * INTO v_row FROM public.listings
   WHERE seller_id = v_uid
     AND status <> 'draft'
     AND (p_exclude IS NULL OR id <> p_exclude)
   ORDER BY created_at DESC
   LIMIT 1;
  IF NOT FOUND THEN RETURN NULL; END IF;
  RETURN jsonb_build_object(
    'listing_id', v_row.id,
    'contact_pref', v_row.contact_pref,
    'pin_lat', v_row.pin_lat,
    'pin_lng', v_row.pin_lng,
    'pin_precision', v_row.pin_precision,
    'pin_zoom', v_row.pin_zoom,
    'street_address', v_row.street_address,
    'directions', v_row.directions
  );
END $function$;
REVOKE ALL ON FUNCTION public.my_last_listing_private(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.my_last_listing_private(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.my_last_listing_private(uuid) TO service_role;

-- 8. validate_listing_draft leaves the browser; the doors call it as owner.
REVOKE EXECUTE ON FUNCTION public.validate_listing_draft(uuid, smallint, uuid, text, text, text, jsonb, text, numeric, character, text, timestamp with time zone, uuid[], jsonb, jsonb, integer, boolean) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.validate_listing_draft(uuid, smallint, uuid, text, text, text, jsonb, text, numeric, character, text, timestamp with time zone, uuid[], jsonb, jsonb, integer, boolean) TO service_role;

-- 6. The three deny-all policies, restated from a file.
DROP POLICY IF EXISTS rate_dials_no_client ON public.rate_dials;
CREATE POLICY rate_dials_no_client ON public.rate_dials
  FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);
DROP POLICY IF EXISTS rate_overrides_no_client ON public.rate_overrides;
CREATE POLICY rate_overrides_no_client ON public.rate_overrides
  FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);
DROP POLICY IF EXISTS contact_reveals_no_client ON public.contact_reveals;
CREATE POLICY contact_reveals_no_client ON public.contact_reveals
  FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);

-- PROOFS (behaviour; scratch writes live in a sub-transaction that is rolled back).
DO $$
DECLARE
  v_n int;
  v_bad text;
  v_uid uuid;
  v_cat uuid;
  v_lid uuid;
  v_r jsonb;
  v_lat numeric;
  v_lng numeric;
BEGIN
  -- P4: exactly the brief's six dials.
  SELECT count(*), string_agg(action, ',') FILTER (WHERE (action, max_count, window_seconds) NOT IN (
           ('draft',600,3600),('post',10,86400),('identity',20,86400),
           ('alias_check',60,3600),('schema_read',120,3600),('contact_reveal',30,86400)))
    INTO v_n, v_bad FROM public.rate_dials;
  IF v_n <> 6 OR v_bad IS NOT NULL THEN
    RAISE EXCEPTION 'PROOF dials: % rows, off-brief: %', v_n, v_bad;
  END IF;

  -- P6: three deny-all policies.
  SELECT count(*) INTO v_n FROM pg_policies
   WHERE schemaname = 'public'
     AND (tablename, policyname) IN (('rate_dials','rate_dials_no_client'),
          ('rate_overrides','rate_overrides_no_client'),('contact_reveals','contact_reveals_no_client'))
     AND qual = 'false' AND with_check = 'false';
  IF v_n <> 3 THEN RAISE EXCEPTION 'PROOF policies: % of 3', v_n; END IF;

  -- P8 + ACLs.
  IF has_function_privilege('authenticated', 'public.validate_listing_draft(uuid, smallint, uuid, text, text, text, jsonb, text, numeric, character, text, timestamp with time zone, uuid[], jsonb, jsonb, integer, boolean)', 'EXECUTE')
     OR has_function_privilege('anon', 'public.validate_listing_draft(uuid, smallint, uuid, text, text, text, jsonb, text, numeric, character, text, timestamp with time zone, uuid[], jsonb, jsonb, integer, boolean)', 'EXECUTE') THEN
    RAISE EXCEPTION 'PROOF validate_listing_draft: still callable by a browser role';
  END IF;
  IF has_function_privilege('anon', 'public.publish_listing(uuid)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.publish_listing(uuid)', 'EXECUTE')
     OR has_function_privilege('anon', 'public.my_listing_private(uuid)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.my_listing_private(uuid)', 'EXECUTE')
     OR has_function_privilege('anon', 'public.my_last_listing_private(uuid)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.my_last_listing_private(uuid)', 'EXECUTE') THEN
    RAISE EXCEPTION 'PROOF ACL: owner reads / publish grants are wrong';
  END IF;

  -- P9: no browser role reads the five private columns.
  SELECT string_agg(r || '.' || c, ',') INTO v_bad
    FROM unnest(ARRAY['anon','authenticated']) r,
         unnest(ARRAY['contact_pref','pin_lat','pin_lng','home_country_code','search_tsv']) c
   WHERE has_column_privilege(r, 'public.listings', c, 'SELECT');
  IF v_bad IS NOT NULL THEN RAISE EXCEPTION 'PROOF private columns readable: %', v_bad; END IF;

  -- Scratch behaviour, rolled back by the closing RAISE.
  SELECT id INTO v_uid FROM auth.users ORDER BY created_at LIMIT 1;
  SELECT id INTO v_cat FROM public.categories WHERE is_active AND allow_listings ORDER BY slug LIMIT 1;
  IF v_uid IS NULL OR v_cat IS NULL THEN RAISE EXCEPTION 'PROOF setup: no user or category'; END IF;
  BEGIN
    PERFORM set_config('request.jwt.claims',
      jsonb_build_object('sub', v_uid, 'role', 'authenticated')::text, true);

    -- P9a rate_gate: allows up to the dial, refuses after it, honours an override.
    INSERT INTO public.rate_dials VALUES ('e2e-proof-gate', 2, 3600);
    IF NOT (public.rate_gate('e2e-proof-gate')->>'allowed')::boolean
       OR NOT (public.rate_gate('e2e-proof-gate')->>'allowed')::boolean THEN
      RAISE EXCEPTION 'PROOF rate_gate: refused within the dial';
    END IF;
    v_r := public.rate_gate('e2e-proof-gate');
    IF (v_r->>'allowed')::boolean OR v_r->>'resets_at' IS NULL THEN
      RAISE EXCEPTION 'PROOF rate_gate: third call allowed or no resets_at: %', v_r;
    END IF;
    INSERT INTO public.rate_overrides (user_id, action, max_count) VALUES (v_uid, 'e2e-proof-gate', 5);
    IF NOT (public.rate_gate('e2e-proof-gate')->>'allowed')::boolean THEN
      RAISE EXCEPTION 'PROOF rate_gate: override not honoured';
    END IF;

    -- P9b pin_show: exact keeps the pin, approx rounds to two decimals.
    INSERT INTO public.listings (seller_id, category_id, title, description, home_country_code, status)
      VALUES (v_uid, v_cat, 'e2e-proof', 'e2e-proof', 'ET', 'draft') RETURNING id INTO v_lid;
    PERFORM public.set_listing_pin(v_lid, 9.012345, 38.765432, 'exact', NULL, 15::smallint, NULL);
    SELECT pin_show_lat, pin_show_lng INTO v_lat, v_lng FROM public.listings WHERE id = v_lid;
    IF v_lat <> 9.012345 OR v_lng <> 38.765432 THEN
      RAISE EXCEPTION 'PROOF pin_show exact: % %', v_lat, v_lng;
    END IF;
    PERFORM public.set_listing_pin(v_lid, 9.012345, 38.765432, 'approx', NULL, 15::smallint, NULL);
    SELECT pin_show_lat, pin_show_lng INTO v_lat, v_lng FROM public.listings WHERE id = v_lid;
    IF v_lat <> 9.01 OR v_lng <> 38.77 THEN
      RAISE EXCEPTION 'PROOF pin_show approx: % %', v_lat, v_lng;
    END IF;

    -- P7 owner read no longer names the home country.
    IF public.my_listing_private(v_lid) ? 'home_country_code' THEN
      RAISE EXCEPTION 'PROOF my_listing_private still returns home_country_code';
    END IF;

    -- P5 publish refuses an unconfirmed home country at that field.
    INSERT INTO public.rate_overrides (user_id, action, max_count) VALUES (v_uid, 'post', 1000)
      ON CONFLICT (user_id, action) DO UPDATE SET max_count = 1000;
    UPDATE public.user_directory SET country_source = 'ip_guess' WHERE user_id = v_uid;
    v_r := public.publish_listing(v_lid);
    IF coalesce((v_r->>'ok')::boolean, true)
       OR v_r->'refusals'->0->>'field' <> 'home_country_code'
       OR v_r->'refusals'->0->>'reason' <> 'required' THEN
      RAISE EXCEPTION 'PROOF publish home country: %', v_r;
    END IF;
    UPDATE public.user_directory SET country_source = 'user_confirmed' WHERE user_id = v_uid;
    v_r := public.publish_listing(v_lid);
    IF v_r->'refusals' @> '[{"field":"home_country_code"}]' THEN
      RAISE EXCEPTION 'PROOF publish: confirmed seller still refused for home country';
    END IF;

    RAISE EXCEPTION 'e2e-proof-rollback';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'e2e-proof-rollback' THEN RAISE; END IF;
  END;

  IF EXISTS (SELECT 1 FROM public.rate_dials WHERE action = 'e2e-proof-gate')
     OR EXISTS (SELECT 1 FROM public.listings WHERE title = 'e2e-proof') THEN
    RAISE EXCEPTION 'PROOF scratch rows survived';
  END IF;
END $$;

INSERT INTO public.migration_marks (version) VALUES ('20261003215042') ON CONFLICT DO NOTHING;
INSERT INTO public.migration_marks (version) VALUES ('20261003223000') ON CONFLICT DO NOTHING;