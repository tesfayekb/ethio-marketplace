-- Bundle 16 turn E2a (2026-10-15). Tier A. D187 (the operator, 2026-10-15) — THE SELLER'S EDIT IS COMPLETE: the places
-- the ad covers and the way buyers reach the seller are edited in the same boxes as the rest, and apply at once
-- (places and contact are picked from lists — D177); the written street and directions lines are typed text and go
-- to review like the title. The category and the end date stay as posted (D172).
--
-- A. edit_my_listing, redeclared whole from its live definition (20261015081040; census (d)): the allowlist gains
--    `coverage` (a list of place ids, judged at step 6 — the plan's caps, a city or sub-city each), `contact_pref`
--    (judged at step 7), `street_address` and `directions` (sanitised as set_listing_pin sanitises them, 200
--    characters, contactInNote); the first place becomes the ad's own place, listing_locations is rewritten in the sent
--    order (the feed index follows through its own triggers); a changed text line sends the ad to review; the
--    revision carries `coverage` when it changed. Everything else byte for byte. Grants restated.
-- B. set_listing_pin, redeclared whole from its live definition (20261006010039; census (d)): `closed` joins its
--    statuses (INC-631: a closed ad is edited like a live one). Grants restated.
-- C. Proofs P1–P6 on scratch rows — a scratch country, region and city, a scratch seller id and a scratch listing,
--    all inside one block that removes them; RAISE EXCEPTION on any failure. No real row is read or written.

-- ===== A — edit_my_listing, whole, with the places, the contact and the place text =====
CREATE OR REPLACE FUNCTION public.edit_my_listing(p_listing_id uuid, p_changes jsonb)
 RETURNS jsonb
 LANGUAGE plpgsql
 VOLATILE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid    uuid := auth.uid();
  v_prev   public.listings%ROWTYPE;
  v_row    public.listings%ROWTYPE;
  v_val    jsonb;
  v_key    text;
  v_attrs  jsonb;
  v_video  text;
  v_review boolean;
  v_before jsonb;
  v_after  jsonb;
  v_diff_a jsonb := '{}'::jsonb;
  v_diff_b jsonb := '{}'::jsonb;
  -- Bundle 16 turn E2a (D187) — the places, the contact and the place text a box may change.
  v_step     smallint := 5;
  v_cov_prev uuid[];
  v_cov      uuid[];
  v_contact  jsonb;
  v_street   text;
  v_dirs     text;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  -- What a seller's box may change (D172, D187): never the category or the end date.
  IF p_changes IS NULL OR jsonb_typeof(p_changes) <> 'object' OR p_changes = '{}'::jsonb THEN
    RAISE EXCEPTION 'nothing to change';
  END IF;
  FOR v_key IN SELECT k FROM jsonb_object_keys(p_changes) k LOOP
    IF v_key NOT IN ('title','description','video_url','attributes','price_mode','price_amount',
                     'price_currency','price_period','price_bp','price_negotiable',
                     'coverage','contact_pref','street_address','directions') THEN
      RAISE EXCEPTION 'not editable: %', v_key;
    END IF;
  END LOOP;
  IF EXISTS (SELECT 1 FROM public.profiles WHERE user_id = v_uid AND account_status = 'deactivated') THEN
    RAISE EXCEPTION 'account is deactivated';
  END IF;
  IF NOT coalesce((public.rate_gate('revise')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;

  SELECT * INTO v_prev FROM public.listings WHERE id = p_listing_id FOR UPDATE;
  IF NOT FOUND OR v_prev.deleted_at IS NOT NULL THEN RAISE EXCEPTION 'listing not found'; END IF;
  IF v_prev.seller_id <> v_uid THEN RAISE EXCEPTION 'not your listing'; END IF;
  IF v_prev.status = 'draft' THEN RAISE EXCEPTION 'a draft is written in the posting form'; END IF;
  -- Call G — an ad in review waits for its answer.
  IF v_prev.status IN ('screening','held') THEN
    RAISE EXCEPTION 'an ad in review is edited once its review is done';
  END IF;
  -- D174 3 — an expired ad is renewed before it is edited; an edit never renews it.
  IF v_prev.status = 'expired' THEN
    RAISE EXCEPTION 'an expired listing is renewed before it is edited';
  END IF;
  IF v_prev.status NOT IN ('active','reduced','closed','rejected') THEN
    RAISE EXCEPTION 'this listing is not edited';
  END IF;

  -- The seller's content rules for what a box changes (staff's edit is judged the same way, INC-552):
  -- validate_listing_draft through step 5, every field the seller does not change read from the ad as it stands;
  -- the end date is not sent — a box does not change it. Bundle 16 turn E2a (D187): the places are judged at step 6
  -- when sent (the plan's caps, a city or sub-city each), the contact at step 7 when sent; what is not sent is
  -- read from the ad as it stands.
  v_video := CASE WHEN p_changes ? 'video_url' THEN nullif(btrim(coalesce(p_changes->>'video_url', '')), '')
                  ELSE v_prev.video_url END;
  SELECT coalesce(array_agg(ll.location_id ORDER BY ll.position, ll.location_id), ARRAY[]::uuid[])
    INTO v_cov_prev FROM public.listing_locations ll WHERE ll.listing_id = p_listing_id;
  IF p_changes ? 'coverage' THEN
    IF jsonb_typeof(p_changes->'coverage') <> 'array' THEN RAISE EXCEPTION 'coverage must be a list'; END IF;
    BEGIN
      SELECT coalesce(array_agg(x.value::uuid ORDER BY x.ordinality), ARRAY[]::uuid[]) INTO v_cov
        FROM jsonb_array_elements_text(p_changes->'coverage') WITH ORDINALITY x(value, ordinality);
    EXCEPTION WHEN invalid_text_representation THEN
      RAISE EXCEPTION 'coverage must be a list of place ids';
    END;
    v_step := 6;
  ELSE
    v_cov := v_cov_prev;
  END IF;
  IF p_changes ? 'contact_pref' THEN
    IF jsonb_typeof(p_changes->'contact_pref') <> 'object' THEN RAISE EXCEPTION 'contact_pref must be an object'; END IF;
    v_contact := p_changes->'contact_pref';
    v_step := 7;
  ELSE
    v_contact := v_prev.contact_pref;
  END IF;
  -- The place text, sanitised as set_listing_pin sanitises it (bundle 2 step 10): a line the seller does not send is
  -- kept as it stands; a sent empty line clears it.
  v_street := CASE WHEN p_changes ? 'street_address'
                   THEN nullif(btrim(regexp_replace(regexp_replace(coalesce(p_changes->>'street_address', ''),
                                                                     '[[:cntrl:]<>]', ' ', 'g'), '\s+', ' ', 'g')), '')
                   ELSE v_prev.street_address END;
  IF v_street IS NOT NULL AND char_length(v_street) > 200 THEN RAISE EXCEPTION 'streetTooLong:%', char_length(v_street); END IF;
  IF v_street IS NOT NULL AND v_street IS DISTINCT FROM v_prev.street_address AND public.attr_contact_like(v_street) THEN
    RAISE EXCEPTION 'contactInNote';
  END IF;
  v_dirs := CASE WHEN p_changes ? 'directions'
                 THEN nullif(btrim(regexp_replace(regexp_replace(coalesce(p_changes->>'directions', ''),
                                                                  '[[:cntrl:]<>]', ' ', 'g'), '\s+', ' ', 'g')), '')
                 ELSE v_prev.directions END;
  IF v_dirs IS NOT NULL AND char_length(v_dirs) > 200 THEN RAISE EXCEPTION 'directionsTooLong:%', char_length(v_dirs); END IF;
  IF v_dirs IS NOT NULL AND v_dirs IS DISTINCT FROM v_prev.directions AND public.attr_contact_like(v_dirs) THEN
    RAISE EXCEPTION 'contactInNote';
  END IF;
  v_val := public.validate_listing_draft(v_uid, v_step, v_prev.category_id,
    CASE WHEN p_changes ? 'title' THEN p_changes->>'title' ELSE v_prev.title END,
    CASE WHEN p_changes ? 'description' THEN p_changes->>'description' ELSE v_prev.description END,
    v_video,
    CASE WHEN p_changes ? 'attributes' THEN p_changes->'attributes' ELSE v_prev.attributes END,
    CASE WHEN p_changes ? 'price_mode' THEN p_changes->>'price_mode' ELSE v_prev.price_mode END,
    CASE WHEN p_changes ? 'price_amount' THEN (p_changes->>'price_amount')::numeric ELSE v_prev.price_amount END,
    CASE WHEN p_changes ? 'price_currency' THEN (p_changes->>'price_currency')::char(3) ELSE v_prev.price_currency END,
    CASE WHEN p_changes ? 'price_period' THEN p_changes->>'price_period' ELSE v_prev.price_period END,
    NULL, CASE WHEN cardinality(v_cov) = 0 THEN NULL ELSE v_cov END, v_contact, v_prev.attributes,
    CASE WHEN p_changes ? 'price_bp' THEN (p_changes->>'price_bp')::integer ELSE v_prev.price_bp END,
    CASE WHEN p_changes ? 'price_negotiable' THEN coalesce((p_changes->>'price_negotiable')::boolean, false)
         ELSE v_prev.price_negotiable END);
  IF NOT coalesce((v_val->>'ok')::boolean, false) THEN
    RETURN v_val;
  END IF;
  v_attrs := coalesce(v_val->'attrs', '{}'::jsonb);

  -- D177 (the operator, 2026-10-14) — what goes to review: free text — the title, the description, the video link,
  -- a typed price note, a typed answer (a text question, or the words of an "Other"); a refused ad's edit is its
  -- resubmission. Amounts and answers picked from a list apply at once and the ad stays as it is.
  -- Bundle 16 turn E2a (D187): a place or a contact change applies at once; a changed street or directions line is
  -- typed text and goes to review like the title.
  v_review := v_prev.status = 'rejected'
    OR v_street IS DISTINCT FROM v_prev.street_address
    OR v_dirs IS DISTINCT FROM v_prev.directions
    OR (v_val->>'title') IS DISTINCT FROM v_prev.title
    OR (v_val->>'description') IS DISTINCT FROM v_prev.description
    OR v_video IS DISTINCT FROM v_prev.video_url
    OR (v_val->>'price_unit_text') IS DISTINCT FROM v_prev.price_unit_text
    OR EXISTS (
      SELECT 1
        FROM (SELECT k FROM jsonb_object_keys(v_attrs) k
              UNION
              SELECT k FROM jsonb_object_keys(coalesce(v_prev.attributes, '{}'::jsonb)) k) ak(k)
       WHERE (v_attrs -> ak.k) IS DISTINCT FROM (v_prev.attributes -> ak.k)
         AND (public.attr_answer_other_text(v_attrs -> ak.k)
                IS DISTINCT FROM public.attr_answer_other_text(v_prev.attributes -> ak.k)
              OR NOT EXISTS (SELECT 1
                               FROM public.effective_category_links(v_prev.category_id) e
                               JOIN public.attributes a ON a.id = e.attribute_id
                              WHERE a.attr_key = ak.k AND a.attr_type <> 'text')));

  UPDATE public.listings SET
    title            = v_val->>'title',
    description      = v_val->>'description',
    video_url        = v_video,
    attributes       = v_attrs,
    price_amount     = (v_val->>'price_amount')::numeric,
    price_currency   = (v_val->>'price_currency')::char(3),
    price_mode       = v_val->>'price_mode',
    price_period     = v_val->>'price_period',
    price_bp         = (v_val->>'price_bp')::integer,
    price_negotiable = coalesce((v_val->>'price_negotiable')::boolean, false),
    price_unit       = v_val->>'price_unit',
    price_unit_text  = v_val->>'price_unit_text',
    -- D187 — the first place is the ad's own; the contact and the place text as sent.
    location_id      = CASE WHEN p_changes ? 'coverage' AND cardinality(v_cov) > 0 THEN v_cov[1] ELSE location_id END,
    contact_pref     = v_contact,
    street_address   = v_street,
    directions       = v_dirs,
    status           = CASE WHEN v_review THEN 'screening' ELSE v_prev.status END,
    -- Bundle 16 call A, as edit_listing — an ad that goes to review keeps the time it had left until its answer.
    clock_kept       = CASE WHEN v_review AND v_prev.status IN ('active','reduced','closed') THEN true
                            ELSE v_prev.clock_kept END,
    kept_remaining   = CASE WHEN v_review AND v_prev.status IN ('active','reduced') THEN
                              CASE WHEN v_prev.expires_at IS NULL THEN NULL
                                   ELSE greatest(v_prev.expires_at - now(), interval '0') END
                            ELSE v_prev.kept_remaining END,
    resume_status    = CASE WHEN v_review THEN NULL ELSE v_prev.resume_status END,
    updated_at       = now()
  WHERE id = p_listing_id
  RETURNING * INTO v_row;

  -- D187 — the places, rewritten in the sent order; the feed index follows (its listing_locations triggers).
  IF p_changes ? 'coverage' AND v_cov IS DISTINCT FROM v_cov_prev THEN
    DELETE FROM public.listing_locations WHERE listing_id = p_listing_id;
    INSERT INTO public.listing_locations (listing_id, location_id, position)
      SELECT p_listing_id, u.id, u.ordinality
        FROM unnest(v_cov) WITH ORDINALITY u(id, ordinality);
  END IF;

  v_after  := to_jsonb(v_row) - 'search_tsv' - 'updated_at';
  v_before := to_jsonb(v_prev) - 'search_tsv' - 'updated_at';
  IF v_cov IS DISTINCT FROM v_cov_prev THEN
    v_after  := v_after  || jsonb_build_object('coverage', to_jsonb(v_cov));
    v_before := v_before || jsonb_build_object('coverage', to_jsonb(v_cov_prev));
  END IF;
  FOR v_key IN SELECT k FROM jsonb_object_keys(v_after) k LOOP
    IF (v_after->v_key) IS DISTINCT FROM (v_before->v_key) THEN
      v_diff_a := v_diff_a || jsonb_build_object(v_key, v_after->v_key);
      v_diff_b := v_diff_b || jsonb_build_object(v_key, v_before->v_key);
    END IF;
  END LOOP;
  IF v_diff_a = '{}'::jsonb THEN
    RAISE EXCEPTION 'nothing changed';
  END IF;

  INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
    VALUES (p_listing_id, v_uid, 'edit', v_diff_b, v_diff_a, v_uid);

  RETURN jsonb_build_object('ok', true, 'status', v_row.status, 'review', v_review);
END $function$;
REVOKE ALL ON FUNCTION public.edit_my_listing(uuid, jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.edit_my_listing(uuid, jsonb) TO authenticated;
GRANT ALL ON FUNCTION public.edit_my_listing(uuid, jsonb) TO service_role;

-- ===== B — set_listing_pin, whole: a closed ad takes a pin =====
CREATE OR REPLACE FUNCTION public.set_listing_pin(p_listing_id uuid, p_lat numeric DEFAULT NULL::numeric, p_lng numeric DEFAULT NULL::numeric, p_precision text DEFAULT NULL::text, p_street text DEFAULT NULL::text, p_zoom smallint DEFAULT NULL::smallint, p_directions text DEFAULT NULL::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 VOLATILE
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

-- ===== C — proofs =====
DO $proof$
DECLARE
  v_src text;
  v_msg text;
BEGIN
  -- P1. The bodies carry the change, with their headers kept.
  SELECT prosrc INTO v_src FROM pg_proc
   WHERE oid = 'public.edit_my_listing(uuid, jsonb)'::regprocedure
     AND prosecdef AND provolatile = 'v' AND proconfig = ARRAY['search_path=public'];
  IF v_src IS NULL
     OR v_src NOT LIKE '%''coverage'',''contact_pref'',''street_address'',''directions'') THEN%'
     OR v_src NOT LIKE '%v_step := 6;%' OR v_src NOT LIKE '%v_step := 7;%'
     OR v_src NOT LIKE '%public.validate_listing_draft(v_uid, v_step, v_prev.category_id,%'
     OR v_src NOT LIKE '%OR v_street IS DISTINCT FROM v_prev.street_address%'
     OR v_src NOT LIKE '%OR v_dirs IS DISTINCT FROM v_prev.directions%'
     OR v_src NOT LIKE '%DELETE FROM public.listing_locations WHERE listing_id = p_listing_id;%'
     OR v_src NOT LIKE '%jsonb_build_object(''coverage'', to_jsonb(v_cov))%'
     OR v_src NOT LIKE '%an ad in review is edited once its review is done%'
     OR v_src NOT LIKE '%an expired listing is renewed before it is edited%' THEN
    RAISE EXCEPTION 'B16E2a P1: the body of edit_my_listing is not as written';
  END IF;
  SELECT prosrc INTO v_src FROM pg_proc
   WHERE oid = 'public.set_listing_pin(uuid, numeric, numeric, text, text, smallint, text)'::regprocedure
     AND prosecdef AND provolatile = 'v' AND proconfig = ARRAY['search_path=public'];
  IF v_src IS NULL
     OR v_src NOT LIKE '%NOT IN (''draft'',''active'',''reduced'',''closed'',''rejected'',''held'',''expired'')%'
     OR v_src NOT LIKE '%pinNotEditable:%' OR v_src NOT LIKE '%contactInNote%' THEN
    RAISE EXCEPTION 'B16E2a P1: the body of set_listing_pin is not as written';
  END IF;

  -- P2. Grants: signed-in users call both doors; anon calls neither.
  IF has_function_privilege('anon', 'public.edit_my_listing(uuid, jsonb)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.edit_my_listing(uuid, jsonb)', 'EXECUTE')
     OR has_function_privilege('anon', 'public.set_listing_pin(uuid, numeric, numeric, text, text, smallint, text)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.set_listing_pin(uuid, numeric, numeric, text, text, smallint, text)', 'EXECUTE') THEN
    RAISE EXCEPTION 'B16E2a P2: a door is open to anon or closed to signed-in users';
  END IF;

  -- P3. No session: refused at the first gate.
  PERFORM set_config('request.jwt.claims', '', true);
  BEGIN
    PERFORM public.edit_my_listing(gen_random_uuid(), jsonb_build_object('coverage', '[]'::jsonb));
    RAISE EXCEPTION 'B16E2a P3: edit_my_listing answered a call with no session';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'not authenticated' THEN RAISE EXCEPTION 'B16E2a P3: edit_my_listing: %', v_msg; END IF;
  END;

  -- P4. A scratch identity (a fresh uuid; no auth.users row is read or written): the keys a box may never send are
  -- still refused before any table is read; the four new keys pass the allowlist (the next gate then answers).
  PERFORM set_config('request.jwt.claims', json_build_object('sub', gen_random_uuid())::text, true);
  BEGIN
    PERFORM public.edit_my_listing(gen_random_uuid(), jsonb_build_object('category_id', gen_random_uuid()));
    RAISE EXCEPTION 'B16E2a P4: a category change was taken';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'not editable: category_id' THEN RAISE EXCEPTION 'B16E2a P4: category: %', v_msg; END IF;
  END;
  BEGIN
    PERFORM public.edit_my_listing(gen_random_uuid(), jsonb_build_object('poster_expires_at', now()));
    RAISE EXCEPTION 'B16E2a P4: an end-date change was taken';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'not editable: poster_expires_at' THEN RAISE EXCEPTION 'B16E2a P4: end date: %', v_msg; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '', true);
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261016040000') ON CONFLICT (version) DO NOTHING;
