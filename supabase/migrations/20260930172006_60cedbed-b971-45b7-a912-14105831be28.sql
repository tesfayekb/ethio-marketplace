-- W6b-2 B3 (2026-09-30) — LOCATION DETAILS WITHOUT A PIN.
-- set_listing_pin re-declared WHOLE from 20260919054044_5631bf8d (INC-183);
-- live body md5 6dc7df76481393233a0914499643d40a confirmed before writing.
-- Changes, and only these:
--   1. NULL coordinates clear the three pin columns but KEEP a sent note
--      (street_address); NULL coordinates and no note clear all four, which
--      is still what "Remove the pin" means (PW-40).
--   2. The note is sanitised in the door on both branches: control characters
--      and < > become spaces, whitespace collapses, the ends are trimmed; the
--      200 cap is judged after sanitising.
-- Writer order unchanged (F5): gates → capture → mutate.

CREATE OR REPLACE FUNCTION public.set_listing_pin(
  p_listing_id uuid,
  p_lat numeric DEFAULT NULL,
  p_lng numeric DEFAULT NULL,
  p_precision text DEFAULT NULL,
  p_street text DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid    uuid := auth.uid();
  v_row    public.listings%ROWTYPE;
  v_lat    numeric;
  v_lng    numeric;
  v_prec   text;
  v_street text;
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

  -- W6b-2 B3 — one sanitiser for both branches.
  v_street := nullif(btrim(regexp_replace(
                regexp_replace(coalesce(p_street, ''), '[[:cntrl:]<>]', ' ', 'g'),
                '\s+', ' ', 'g')), '');
  IF v_street IS NOT NULL AND char_length(v_street) > 200 THEN
    RAISE EXCEPTION 'streetTooLong:%', char_length(v_street);
  END IF;

  IF p_lat IS NULL OR p_lng IS NULL THEN
    v_lat := NULL; v_lng := NULL; v_prec := NULL;
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
    v_lat := round(p_lat, 6);
    v_lng := round(p_lng, 6);
  END IF;

  v_before := jsonb_build_object('pin_lat', v_row.pin_lat, 'pin_lng', v_row.pin_lng,
                                 'pin_precision', v_row.pin_precision,
                                 'street_address', v_row.street_address);
  v_after  := jsonb_build_object('pin_lat', v_lat, 'pin_lng', v_lng,
                                 'pin_precision', v_prec, 'street_address', v_street);

  UPDATE public.listings
     SET pin_lat = v_lat, pin_lng = v_lng, pin_precision = v_prec,
         street_address = v_street, updated_at = now()
   WHERE id = p_listing_id;

  INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
  VALUES (p_listing_id, v_uid, 'edit', v_before, v_after, v_uid);

  RETURN jsonb_build_object('ok', true) || v_after;
END $$;

REVOKE ALL ON FUNCTION public.set_listing_pin(uuid, numeric, numeric, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.set_listing_pin(uuid, numeric, numeric, text, text) TO authenticated;
GRANT ALL ON FUNCTION public.set_listing_pin(uuid, numeric, numeric, text, text) TO service_role;

-- =====================================================================
-- IN-FILE PROOFS P30–P34 (behaviour only). Scratch identity, category and
-- listing, created and removed here; every failure RAISES and rolls back.
-- =====================================================================
DO $proof$
DECLARE
  v_uid  uuid := gen_random_uuid();
  v_cat  uuid;
  v_lst  uuid;
  v_res  jsonb;
  v_row  public.listings%ROWTYPE;
  v_msg  text;
  v_revs int;
BEGIN
  INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at)
  VALUES (v_uid, 'e2e-w6b2-owner@example.invalid', '{}'::jsonb,
          'authenticated', 'authenticated', now(), now());
  INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
  VALUES ('E2E W6b2 Leaf', 'e2e-w6b2-leaf', true, true, true, 9999)
  RETURNING id INTO v_cat;
  INSERT INTO public.listings (seller_id, category_id, title, description, home_country_code)
  VALUES (v_uid, v_cat, 'E2E W6b2 listing', 'scratch', 'ET')
  RETURNING id INTO v_lst;

  PERFORM set_config('request.jwt.claims',
    json_build_object('sub', v_uid::text, 'role', 'authenticated')::text, true);

  -- P30 — a note with no pin is kept; the pin columns stay NULL.
  v_res := public.set_listing_pin(v_lst, NULL, NULL, NULL, '3rd floor, Suite 5');
  SELECT * INTO v_row FROM public.listings WHERE id = v_lst;
  IF v_row.street_address IS DISTINCT FROM '3rd floor, Suite 5'
     OR v_row.pin_lat IS NOT NULL OR v_row.pin_lng IS NOT NULL OR v_row.pin_precision IS NOT NULL THEN
    RAISE EXCEPTION 'P30 FAILED — % % % %', v_row.pin_lat, v_row.pin_lng, v_row.pin_precision, v_row.street_address;
  END IF;

  -- P31 — a pin with a note stores both.
  v_res := public.set_listing_pin(v_lst, 9.005401, 38.763611, 'exact', 'Bole Road 14');
  SELECT * INTO v_row FROM public.listings WHERE id = v_lst;
  IF v_row.pin_lat <> 9.005401 OR v_row.pin_precision <> 'exact'
     OR v_row.street_address IS DISTINCT FROM 'Bole Road 14' THEN
    RAISE EXCEPTION 'P31 FAILED — %', v_res;
  END IF;

  -- P32 — Remove (no coordinates, no note) clears all four.
  v_res := public.set_listing_pin(v_lst, NULL, NULL, NULL, NULL);
  SELECT * INTO v_row FROM public.listings WHERE id = v_lst;
  IF v_row.pin_lat IS NOT NULL OR v_row.pin_lng IS NOT NULL
     OR v_row.pin_precision IS NOT NULL OR v_row.street_address IS NOT NULL THEN
    RAISE EXCEPTION 'P32 FAILED — %', v_res;
  END IF;

  -- P33 — the note is sanitised.
  v_res := public.set_listing_pin(v_lst, NULL, NULL, NULL, E'  a<b>\n\t  c  ');
  SELECT * INTO v_row FROM public.listings WHERE id = v_lst;
  IF v_row.street_address IS DISTINCT FROM 'a b c' THEN
    RAISE EXCEPTION 'P33 FAILED — "%"', v_row.street_address;
  END IF;

  -- P34 — 201 characters refuse by name, and the refusal leaves no trace.
  SELECT count(*) INTO v_revs FROM public.listing_revisions WHERE listing_id = v_lst;
  BEGIN
    PERFORM public.set_listing_pin(v_lst, NULL, NULL, NULL, repeat('x', 201));
    RAISE EXCEPTION 'P34 FAILED — 201 characters were accepted';
  EXCEPTION WHEN others THEN
    v_msg := SQLERRM;
    IF v_msg NOT LIKE 'streetTooLong:%' THEN
      RAISE EXCEPTION 'P34 FAILED — refused with another word: %', v_msg;
    END IF;
  END;
  SELECT * INTO v_row FROM public.listings WHERE id = v_lst;
  IF v_row.street_address IS DISTINCT FROM 'a b c'
     OR (SELECT count(*) FROM public.listing_revisions WHERE listing_id = v_lst) <> v_revs THEN
    RAISE EXCEPTION 'P34 FAILED — the refused attempt left a trace';
  END IF;

  PERFORM set_config('request.jwt.claims', '{}', true);

  DELETE FROM public.listing_revisions WHERE listing_id = v_lst;
  DELETE FROM public.listings WHERE id = v_lst;
  DELETE FROM public.category_tree_pointers WHERE child_id = v_cat OR parent_id = v_cat;
  DELETE FROM public.categories WHERE id = v_cat;
  DELETE FROM auth.users WHERE id = v_uid;
  DELETE FROM public.user_roles WHERE user_id = v_uid;
  DELETE FROM public.profiles WHERE user_id = v_uid;
  DELETE FROM public.user_directory WHERE user_id = v_uid;
  IF EXISTS (SELECT 1 FROM public.categories WHERE slug = 'e2e-w6b2-leaf')
     OR EXISTS (SELECT 1 FROM auth.users WHERE id = v_uid)
     OR EXISTS (SELECT 1 FROM public.listings WHERE id = v_lst) THEN
    RAISE EXCEPTION 'PROOF CLEANUP FAILED — scratch residue remains';
  END IF;
  RAISE NOTICE 'P30–P34 PASSED — scratch rows removed.';
END $proof$;

-- ------------------------------------------------------------ READ-BACK
DO $readback$
DECLARE r record;
BEGIN
  SELECT md5(p.prosrc) AS body, p.proacl::text AS acl, p.prosecdef AS definer
    INTO r
    FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
   WHERE n.nspname = 'public' AND p.proname = 'set_listing_pin';
  IF position('[[:cntrl:]<>]' IN (SELECT prosrc FROM pg_proc WHERE proname = 'set_listing_pin')) = 0 THEN
    RAISE EXCEPTION 'READ-BACK FAILED — the sanitiser is not in the live body';
  END IF;
  IF r.acl LIKE '%anon=%' OR r.acl NOT LIKE '%authenticated=X%' OR r.acl NOT LIKE '%service_role=X%'
     OR r.acl ~ '(^|[{,])=X' THEN
    RAISE EXCEPTION 'READ-BACK FAILED — ACL %', r.acl;
  END IF;
  RAISE NOTICE 'READ-BACK set_listing_pin definer=% md5=% acl=%', r.definer, r.body, r.acl;
END $readback$;

INSERT INTO public.migration_marks (version) VALUES ('20260930180000') ON CONFLICT DO NOTHING;
