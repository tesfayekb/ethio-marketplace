-- Foundations turn D1, M1 — INC-963: a pin's precision is known before it is stored.
-- set_listing_pin redeclared whole from its live definition (ethio-prod, 2026-10-28);
-- the one change: a SENT pin (lat and lng given) without a precision is refused
-- ('badPrecision:missing'), never coalesced to 'exact'. A clearing call (lat/lng NULL)
-- still clears the pin. Header unchanged: plpgsql, VOLATILE, SECURITY DEFINER,
-- search_path public; ACL unchanged (authenticated, service_role).
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
  IF NOT coalesce((public.rate_gate('revise')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;

  SELECT * INTO v_row FROM public.listings
   WHERE id = p_listing_id AND seller_id = v_uid;
  IF v_row.id IS NULL THEN RAISE EXCEPTION 'not your listing'; END IF;

  -- Bundle 16 turn E2a (INC-631's rule) — a closed ad is edited like a live one.
  IF v_row.status NOT IN ('draft','active','reduced','closed','rejected','held','expired') THEN
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
    -- INC-963 — a pin's precision is known before it is stored: none sent is refused.
    IF p_precision IS NULL OR btrim(p_precision) = '' THEN
      RAISE EXCEPTION 'badPrecision:missing';
    END IF;
    v_prec := lower(btrim(p_precision));
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
GRANT EXECUTE ON FUNCTION public.set_listing_pin(uuid, numeric, numeric, text, text, smallint, text) TO authenticated, service_role;

-- PROOF (INC-963): scratch rows only, rolled back by the sentinel.
DO $proof$
DECLARE
  v_uid  uuid := gen_random_uuid();
  v_cat  uuid;
  v_lst  uuid;
  v_home char(2);
  v_row  public.listings%ROWTYPE;
  v_revs integer;
  v_msg  text;
BEGIN
  IF has_function_privilege('anon', 'public.set_listing_pin(uuid,numeric,numeric,text,text,smallint,text)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.set_listing_pin(uuid,numeric,numeric,text,text,smallint,text)', 'EXECUTE') THEN
    RAISE EXCEPTION 'INC-963 proof: set_listing_pin ACL changed';
  END IF;
  BEGIN
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at)
    VALUES (v_uid, 'e2e-d1-m1-' || v_uid || '@example.invalid', '{}'::jsonb,
            'authenticated', 'authenticated', now(), now());
    SELECT p.home_country_code INTO v_home FROM public.profiles p WHERE p.user_id = v_uid;
    IF v_home IS NULL THEN
      SELECT k.code INTO v_home FROM public.countries k ORDER BY k.code LIMIT 1;
    END IF;
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES ('E2E D1 M1 Leaf', 'e2e-d1-m1-' || substr(v_uid::text, 1, 8), true, true, true, 9999)
    RETURNING id INTO v_cat;
    INSERT INTO public.listings (seller_id, category_id, title, description, home_country_code)
    VALUES (v_uid, v_cat, 'E2E D1 M1 listing', 'scratch', v_home)
    RETURNING id INTO v_lst;
    PERFORM set_config('request.jwt.claims',
      json_build_object('sub', v_uid::text, 'role', 'authenticated')::text, true);

    -- (a) a sent pin without a precision is refused and stores nothing.
    v_msg := NULL;
    BEGIN
      PERFORM public.set_listing_pin(v_lst, 9.03, 38.74, NULL);
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    IF v_msg IS DISTINCT FROM 'badPrecision:missing' THEN
      RAISE EXCEPTION 'INC-963 proof (a): NULL precision answered %', coalesce(v_msg, 'success');
    END IF;
    -- (b) an empty precision likewise.
    v_msg := NULL;
    BEGIN
      PERFORM public.set_listing_pin(v_lst, 9.03, 38.74, '  ');
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    IF v_msg IS DISTINCT FROM 'badPrecision:missing' THEN
      RAISE EXCEPTION 'INC-963 proof (b): empty precision answered %', coalesce(v_msg, 'success');
    END IF;
    SELECT * INTO v_row FROM public.listings WHERE id = v_lst;
    SELECT count(*) INTO v_revs FROM public.listing_revisions WHERE listing_id = v_lst;
    IF v_row.pin_lat IS NOT NULL OR v_row.pin_lng IS NOT NULL OR v_row.pin_precision IS NOT NULL OR v_revs <> 0 THEN
      RAISE EXCEPTION 'INC-963 proof (a/b): a refused pin was stored (revisions %)', v_revs;
    END IF;

    -- (c) the positive control: a stated precision is stored.
    PERFORM public.set_listing_pin(v_lst, 9.03, 38.74, 'approx');
    SELECT * INTO v_row FROM public.listings WHERE id = v_lst;
    IF v_row.pin_precision IS DISTINCT FROM 'approx' OR v_row.pin_lat IS NULL THEN
      RAISE EXCEPTION 'INC-963 proof (c): approx pin not stored (%)', v_row.pin_precision;
    END IF;

    -- (d) a clearing call (all NULL) succeeds and clears the columns.
    PERFORM public.set_listing_pin(v_lst);
    SELECT * INTO v_row FROM public.listings WHERE id = v_lst;
    IF v_row.pin_lat IS NOT NULL OR v_row.pin_lng IS NOT NULL OR v_row.pin_precision IS NOT NULL
       OR v_row.pin_show_lat IS NOT NULL THEN
      RAISE EXCEPTION 'INC-963 proof (d): clearing call left a pin';
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'd1-m1-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'd1-m1-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261029000000');