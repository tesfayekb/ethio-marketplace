-- e2e-areas: my-listings, posting, ad-page
-- P-2 (a) M-1c, part 5 of 7 — the seller's doors accept a paused ad (plan §3; ruling 9 H3; ruling 10).
-- A paused ad (D306: a level ended with no free slot; the clock kept) is the seller's to pin, tick, edit
-- and mark sold, as a closed ad is (INC-631's rule, bundle 16 turn E2a). Four doors, one change each — the
-- literal 'paused' beside 'closed' in the status list the door accepts:
--   set_listing_pin           — whole, from 20261028223430 :7   (live md5 4fe67a1f8ea575516e256a5da78a2365);
--   set_listing_photos_soon   — whole, from 20261016150556 :13  (live md5 f33736b4003123d83aeb52c5f765bb88);
--   mark_sold                 — whole, from 20261014194317 :433 (live md5 98a822b8fd9e1a1c66380dceba55242e);
--   edit_my_listing           — 11.7 KB, so by computed insertion guarded by md5 (rule 30; the method of
--     20261029022748): the live body read, CR-normalised (law 13), checked against its md5
--     27060dfa53f8abbeefd0a2421682d662, two unique fragments replaced (the status gate; the clock_kept CASE,
--     where 'closed' already stands), checked against the new md5 12c05d47758d54fe541961e7f5c8ce2d, applied
--     with the live header, asserted post-apply.
-- edit_listing and set_listing_price are left as they are (ruling 10 H3: DEC-335 retires them in F1-1).
-- Headers and closers restated from each last declaration; every body byte for byte apart from the one
-- literal. Proofs on scratch rows (a paused ad through each door; a stranger refused and nothing written;
-- a sold ad still refused by edit_my_listing), rolled back by the sentinel.

DO $pre$
DECLARE
  v_md5 text;
BEGIN
  IF to_regprocedure('public.designation_sweep_core(uuid[])') IS NULL THEN
    RAISE EXCEPTION 'P-2 M-1c part 5: part 3 (42c3a28d) must be applied first';
  END IF;
  -- G39: each door is rewritten from the body its last declaration gave; a different live body is a STOP.
  SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p
   WHERE p.oid = 'public.set_listing_pin(uuid, numeric, numeric, text, text, smallint, text)'::regprocedure;
  IF v_md5 IS DISTINCT FROM '4fe67a1f8ea575516e256a5da78a2365' THEN
    RAISE EXCEPTION 'P-2 M-1c part 5: the live set_listing_pin is not 20261028223430''s body (%)', v_md5;
  END IF;
  SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p
   WHERE p.oid = 'public.set_listing_photos_soon(uuid, boolean)'::regprocedure;
  IF v_md5 IS DISTINCT FROM 'f33736b4003123d83aeb52c5f765bb88' THEN
    RAISE EXCEPTION 'P-2 M-1c part 5: the live set_listing_photos_soon is not 20261016150556''s body (%)', v_md5;
  END IF;
  SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p
   WHERE p.oid = 'public.mark_sold(uuid)'::regprocedure;
  IF v_md5 IS DISTINCT FROM '98a822b8fd9e1a1c66380dceba55242e' THEN
    RAISE EXCEPTION 'P-2 M-1c part 5: the live mark_sold is not 20261014194317''s body (%)', v_md5;
  END IF;
  SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p
   WHERE p.oid = 'public.edit_my_listing(uuid, jsonb, uuid[], text)'::regprocedure;
  IF v_md5 IS DISTINCT FROM '27060dfa53f8abbeefd0a2421682d662' THEN
    RAISE EXCEPTION 'P-2 M-1c part 5: the live edit_my_listing is not 20261019115951''s body (%)', v_md5;
  END IF;
END $pre$;

-- ------------------------------------------------------------ 1. set_listing_pin (whole from 20261028223430 :7)
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
  IF v_row.status NOT IN ('draft','active','reduced','closed','paused','rejected','held','expired') THEN
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

-- ------------------------------------------------------------ 2. set_listing_photos_soon (whole from 20261016150556 :13)
CREATE OR REPLACE FUNCTION public.set_listing_photos_soon(p_listing_id uuid, p_on boolean)
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
  -- The statuses set_listing_pin accepts (bundle 17 turn 4, INC-666: 'closed' joins them, as it joined the pin door).
  IF v_row.status NOT IN ('draft','active','reduced','closed','paused','rejected','held','expired') THEN
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

-- ------------------------------------------------------------ 3. mark_sold (whole from 20261014194317 :433)
CREATE OR REPLACE FUNCTION public.mark_sold(p_listing_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 VOLATILE
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE v_uid uuid := auth.uid(); v_row public.listings%ROWTYPE;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF NOT coalesce((public.rate_gate('revise')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;
  SELECT * INTO v_row FROM public.listings WHERE id = p_listing_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'listing not found'; END IF;
  IF v_row.seller_id <> v_uid THEN RAISE EXCEPTION 'not your listing'; END IF;
  IF v_row.status NOT IN ('active','reduced','closed','paused') THEN
    RAISE EXCEPTION 'illegal transition: % -> sold', v_row.status;
  END IF;
  -- D175 1 (bundle 16) — the seller's contact choice is kept as it is: a sold ad's contact is closed to everyone by
  -- its status (reveal_listing_contact answers only an active ad). sold_at and Reserved: listings_state_marks.
  UPDATE public.listings SET status = 'sold',
    clock_kept = false, kept_remaining = NULL, resume_status = NULL, updated_at = now()
   WHERE id = p_listing_id;
  INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
    VALUES (p_listing_id, v_uid, 'state',
            jsonb_build_object('status', v_row.status),
            jsonb_build_object('status', 'sold'), v_uid);
  RETURN jsonb_build_object('ok', true, 'status', 'sold');
END $function$;
REVOKE ALL ON FUNCTION public.mark_sold(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.mark_sold(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.mark_sold(uuid) TO service_role;

-- ------------------------------------------------------------ 4. edit_my_listing (computed insertion, md5-guarded)
DO $ins$
DECLARE
  v_src text; v_norm text; v_new text;
  v_args text; v_result text;
  v_secdef boolean; v_volatile "char"; v_config text[]; v_defaults text; v_acl text;
  v_f1a text := E'  IF v_prev.status NOT IN (''active'',''reduced'',''closed'',''rejected'') THEN';
  v_f1b text := E'  IF v_prev.status NOT IN (''active'',''reduced'',''closed'',''paused'',''rejected'') THEN';
  v_f2a text := E'    clock_kept       = CASE WHEN v_review AND v_prev.status IN (''active'',''reduced'',''closed'') THEN true';
  v_f2b text := E'    clock_kept       = CASE WHEN v_review AND v_prev.status IN (''active'',''reduced'',''closed'',''paused'') THEN true';
BEGIN
  SELECT p.prosrc, pg_get_function_arguments(p.oid), pg_get_function_result(p.oid),
         p.prosecdef, p.provolatile, p.proconfig,
         coalesce(p.proargdefaults::text, ''), coalesce(p.proacl::text, '')
    INTO v_src, v_args, v_result, v_secdef, v_volatile, v_config, v_defaults, v_acl
    FROM pg_proc p WHERE p.oid = 'public.edit_my_listing(uuid, jsonb, uuid[], text)'::regprocedure;
  v_norm := replace(v_src, E'\r', '');
  IF md5(v_norm) <> '27060dfa53f8abbeefd0a2421682d662' THEN
    RAISE EXCEPTION 'P-2 M-1c part 5: old body md5 mismatch for edit_my_listing: %', md5(v_norm);
  END IF;
  IF (length(v_norm) - length(replace(v_norm, v_f1a, ''))) / length(v_f1a) <> 1
     OR (length(v_norm) - length(replace(v_norm, v_f2a, ''))) / length(v_f2a) <> 1 THEN
    RAISE EXCEPTION 'P-2 M-1c part 5: a fragment is not unique in edit_my_listing';
  END IF;
  v_new := replace(replace(v_norm, v_f1a, v_f1b), v_f2a, v_f2b);
  IF md5(v_new) <> '12c05d47758d54fe541961e7f5c8ce2d' THEN
    RAISE EXCEPTION 'P-2 M-1c part 5: new body md5 mismatch for edit_my_listing: %', md5(v_new);
  END IF;
  EXECUTE format('CREATE OR REPLACE FUNCTION public.edit_my_listing(%s) RETURNS %s LANGUAGE plpgsql SECURITY %s %s SET search_path = public AS $m1c5$%s$m1c5$',
    v_args, v_result,
    CASE WHEN v_secdef THEN 'DEFINER' ELSE 'INVOKER' END,
    CASE v_volatile WHEN 's' THEN 'STABLE' WHEN 'i' THEN 'IMMUTABLE' ELSE 'VOLATILE' END,
    v_new);
  PERFORM 1 FROM pg_proc p
   WHERE p.oid = 'public.edit_my_listing(uuid, jsonb, uuid[], text)'::regprocedure
     AND p.prosecdef = v_secdef AND p.provolatile = v_volatile
     AND coalesce(p.proconfig::text, '') = coalesce(v_config::text, '')
     AND coalesce(p.proargdefaults::text, '') = v_defaults
     AND coalesce(p.proacl::text, '') = v_acl
     AND md5(replace(p.prosrc, E'\r', '')) = '12c05d47758d54fe541961e7f5c8ce2d';
  IF NOT FOUND THEN RAISE EXCEPTION 'P-2 M-1c part 5: post-apply drift for edit_my_listing'; END IF;
END $ins$;
REVOKE ALL ON FUNCTION public.edit_my_listing(uuid, jsonb, uuid[], text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.edit_my_listing(uuid, jsonb, uuid[], text) TO authenticated;
GRANT ALL ON FUNCTION public.edit_my_listing(uuid, jsonb, uuid[], text) TO service_role;

-- ------------------------------------------------------------ 5. PROOFS
-- (a) the four bodies are the texts above (md5, CR-stripped both sides — law 13); headers and grants as
-- before (catalog facts). (b) scratch rows: a seller with his acceptances, two live ads paused by the state
-- machine as the service; as the seller, a pin, a tick and mark_sold land on a paused ad (each its revision);
-- edit_my_listing's status gate lets a paused ad through (its answer is a later refusal, never the gate's
-- 'this listing is not edited') and still refuses the sold one; as a stranger every door answers 'not your
-- listing' and writes nothing. Rolled back by the sentinel.
DO $proof$
DECLARE
  v_pin   regprocedure := 'public.set_listing_pin(uuid, numeric, numeric, text, text, smallint, text)'::regprocedure;
  v_pho   regprocedure := 'public.set_listing_photos_soon(uuid, boolean)'::regprocedure;
  v_sold  regprocedure := 'public.mark_sold(uuid)'::regprocedure;
  v_eml   regprocedure := 'public.edit_my_listing(uuid, jsonb, uuid[], text)'::regprocedure;
  v_fn    regprocedure;
  v_want  text;
  v_seller uuid := gen_random_uuid();
  v_other  uuid := gen_random_uuid();
  v_tag    text := 'e2e-mig-p2-m1c5-' || substr(gen_random_uuid()::text, 1, 8);
  v_lang   text := (SELECT code FROM public.languages ORDER BY code LIMIT 1);
  v_code   char(2) := 'XZ';
  v_anc    uuid;
  v_cat    uuid;
  v_p      uuid;
  v_q      uuid;
  v_row    public.listings%ROWTYPE;
  v_revs   integer;
  v_ans    jsonb;
  v_msg    text;
BEGIN
  -- (a)
  FOR v_fn, v_want IN
    SELECT * FROM (VALUES (v_pin, '34c6bdd95f57c63dae9003dbc2cb9b7a'), (v_pho, 'c5d2c31b7448076f78448f0cf7e22b1b'),
                          (v_sold, 'b48bcfcfacfc144842eca514ee438521'), (v_eml, '12c05d47758d54fe541961e7f5c8ce2d')) t(f, m)
  LOOP
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_want
       OR (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'P-2 M-1c part 5 proof (a): the body, header or grants of % differ', v_fn;
    END IF;
  END LOOP;

  BEGIN
    -- The scratch market: a published ad needs a place (listings_place_unless_draft); the anchor serves.
    IF EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
      RAISE EXCEPTION 'P-2 M-1c part 5 proof: scratch code % already exists', v_code;
    END IF;
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_code, 'e2e-mig-p2-m1c5', true);
    SELECT a.id INTO v_anc FROM public.locations a
     WHERE a.country_code = v_code AND a.level = 'country' AND a.name_en = 'e2e-mig-p2-m1c5';
    IF v_anc IS NULL THEN RAISE EXCEPTION 'P-2 M-1c part 5 proof: the scratch market has no anchor'; END IF;
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
      (v_seller, v_tag || '-seller@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_other,  v_tag || '-other@example.invalid',  '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO public.legal_acceptances (user_id, version_id, language, method)
    SELECT v_seller, v.id, v_lang, v_tag FROM public.legal_versions v
     WHERE v.status = 'published' AND v.effective_at <= now();
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES ('E2E P2 M1c5 Leaf', v_tag, true, true, true, 9999) RETURNING id INTO v_cat;
    INSERT INTO public.listings (seller_id, category_id, location_id, title, description, home_country_code,
                                 status, published_at, published_first_at, expires_at)
    VALUES (v_seller, v_cat, v_anc, 'E2E P2 M1c5 p', 'scratch', v_code, 'active', now(), now(), now() + interval '10 days')
    RETURNING id INTO v_p;
    INSERT INTO public.listings (seller_id, category_id, location_id, title, description, home_country_code,
                                 status, published_at, published_first_at, expires_at)
    VALUES (v_seller, v_cat, v_anc, 'E2E P2 M1c5 q', 'scratch', v_code, 'active', now(), now(), now() + interval '10 days')
    RETURNING id INTO v_q;
    PERFORM set_config('request.jwt.claims', '{}', true);
    PERFORM public.transition_listing(v_p, 'paused');
    PERFORM public.transition_listing(v_q, 'paused');
    IF (SELECT count(*) FROM public.listings WHERE id IN (v_p, v_q) AND status = 'paused') <> 2 THEN
      RAISE EXCEPTION 'P-2 M-1c part 5 proof: the scratch ads were not paused';
    END IF;
    SELECT count(*) INTO v_revs FROM public.listing_revisions WHERE listing_id IN (v_p, v_q);

    -- (b) the seller.
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_seller::text, 'role', 'authenticated')::text, true);
    PERFORM public.set_listing_pin(v_p, 9.03, 38.74, 'approx');
    SELECT * INTO v_row FROM public.listings WHERE id = v_p;
    IF v_row.status <> 'paused' OR v_row.pin_precision IS DISTINCT FROM 'approx' OR v_row.pin_lat IS NULL
       OR (SELECT count(*) FROM public.listing_revisions WHERE listing_id = v_p AND kind = 'edit' AND actor = v_seller AND after ? 'pin_lat') <> 1 THEN
      RAISE EXCEPTION 'P-2 M-1c part 5 proof (b): the pin did not land on the paused ad (% %)', v_row.status, v_row.pin_precision;
    END IF;
    PERFORM public.set_listing_photos_soon(v_p, true);
    SELECT * INTO v_row FROM public.listings WHERE id = v_p;
    IF v_row.status <> 'paused' OR NOT v_row.photos_soon
       OR (SELECT count(*) FROM public.listing_revisions WHERE listing_id = v_p AND kind = 'edit' AND actor = v_seller AND after ? 'photos_soon') <> 1 THEN
      RAISE EXCEPTION 'P-2 M-1c part 5 proof (b): the tick did not land on the paused ad';
    END IF;
    -- Beyond the gate the door answers the judge's refusals as a value (ok:false) or raises a later rule
    -- ('nothing changed'); the gate's own words are the one answer a paused ad must not get.
    v_msg := NULL; v_ans := NULL;
    BEGIN
      v_ans := public.edit_my_listing(v_p, '{}'::jsonb);
    EXCEPTION WHEN OTHERS THEN v_msg := SQLERRM;
    END;
    IF (v_ans IS NULL AND v_msg IS NULL) OR v_msg = 'this listing is not edited'
       OR coalesce((v_ans->>'ok')::boolean, false) THEN
      RAISE EXCEPTION 'P-2 M-1c part 5 proof (b): edit_my_listing on the paused ad answered % / %', v_ans, coalesce(v_msg, 'success');
    END IF;
    PERFORM public.mark_sold(v_q);
    SELECT * INTO v_row FROM public.listings WHERE id = v_q;
    IF v_row.status <> 'sold' OR v_row.clock_kept OR v_row.kept_remaining IS NOT NULL OR v_row.resume_status IS NOT NULL
       OR NOT EXISTS (SELECT 1 FROM public.listing_revisions WHERE listing_id = v_q AND kind = 'state' AND actor = v_seller
                         AND before = '{"status": "paused"}'::jsonb AND after = '{"status": "sold"}'::jsonb) THEN
      RAISE EXCEPTION 'P-2 M-1c part 5 proof (b): mark_sold did not take the paused ad (%)', v_row.status;
    END IF;
    v_msg := NULL;
    BEGIN
      v_ans := public.edit_my_listing(v_q, '{}'::jsonb);
    EXCEPTION WHEN OTHERS THEN v_msg := SQLERRM;
    END;
    IF v_msg IS DISTINCT FROM 'this listing is not edited' THEN
      RAISE EXCEPTION 'P-2 M-1c part 5 proof (b): edit_my_listing let a sold ad through (%)', coalesce(v_msg, 'success');
    END IF;
    SELECT count(*) INTO v_revs FROM public.listing_revisions WHERE listing_id IN (v_p, v_q);

    -- (c) a stranger: refused by each door, nothing written.
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_other::text, 'role', 'authenticated')::text, true);
    FOR v_want IN SELECT unnest(ARRAY['pin', 'photos', 'sold', 'edit']) LOOP
      v_msg := NULL;
      BEGIN
        CASE v_want
          WHEN 'pin'    THEN PERFORM public.set_listing_pin(v_p, 9.03, 38.74, 'exact');
          WHEN 'photos' THEN PERFORM public.set_listing_photos_soon(v_p, false);
          WHEN 'sold'   THEN PERFORM public.mark_sold(v_p);
          ELSE               v_ans := public.edit_my_listing(v_p, '{}'::jsonb);
        END CASE;
      EXCEPTION WHEN OTHERS THEN v_msg := SQLERRM;
      END;
      IF v_msg IS DISTINCT FROM 'not your listing' THEN
        RAISE EXCEPTION 'P-2 M-1c part 5 proof (c): % answered a stranger % instead of a refusal', v_want, coalesce(v_msg, 'success');
      END IF;
    END LOOP;
    SELECT * INTO v_row FROM public.listings WHERE id = v_p;
    IF v_row.status <> 'paused' OR NOT v_row.photos_soon OR v_row.pin_precision IS DISTINCT FROM 'approx'
       OR (SELECT count(*) FROM public.listing_revisions WHERE listing_id IN (v_p, v_q)) <> v_revs THEN
      RAISE EXCEPTION 'P-2 M-1c part 5 proof (c): a stranger''s refused call left a trace';
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2-m1c5-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c5-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261105100500') ON CONFLICT DO NOTHING;
