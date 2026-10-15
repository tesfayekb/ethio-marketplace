-- Bundle 16 (My listings), turn R2 (2026-10-15). Tier A. The seller's edit in boxes (D172, D177) and Post a similar
-- ad (D182 4).
-- e2e-areas: my-listings
--
-- A. edit_my_listing(listing, changes) — the seller's edit of a published ad, box by box: the title and the description,
--    the video link, the specifications, the price. Only the fields the seller changed travel; the category, the places,
--    the contact and the end date are never changed here (D172). It takes a live, reduced, closed or refused ad; an ad
--    in review waits for its answer (call G), an expired ad is renewed first (D174 3), a draft is written in the posting
--    form, any other is not edited. Judged as staff's edit is judged: the posting judge through step 5 with every
--    field the seller did not change read from the ad (INC-552). What goes to review (D177): free text — the title, the
--    description, the video link, a typed price note, a typed answer (a text question or the words of an "Other") —
--    and every edit of a refused ad; then the ad waits in review with the days it had left (call A, as edit_listing).
--    Amounts and answers picked from a list apply at once: the ad keeps its status. One `edit` revision with the
--    fields that changed; "nothing changed" when none did. The answer: ok, the status, review.
-- B. copy_my_listing(listing) — Post a similar ad (D182 4): a new draft of the seller's own with the ad's category,
--    words, answers, price, video link, places, pin and contact choice, and none of its photos, dates or marks; it
--    counts against the posting dial ('draft') and takes the server's residency fact for its home country (DEC-068),
--    as submit_listing does. Its `create` revision names the ad it was copied from. Not a draft, not a removed or refused
--    ad, not another seller's.
-- P. Proofs (RAISE EXCEPTION on any failure; a clean apply is the pass): the headers and privileges of both; a call
--    with no session refused by both; a scratch identity's empty or forbidden changes refused before anything is read.
--    The behaviour — what applies at once and what goes to review, the refusals, the copy — is proven by ML-11…ML-13
--    (e2e/my-listings-doors.spec.ts), MLA-13 and MLA-14 (e2e/my-listings-ad.spec.ts).

-- ===== A — edit_my_listing =====
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
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  -- What a seller's box may change (D172): never the category, the places, the contact or the end date.
  IF p_changes IS NULL OR jsonb_typeof(p_changes) <> 'object' OR p_changes = '{}'::jsonb THEN
    RAISE EXCEPTION 'nothing to change';
  END IF;
  FOR v_key IN SELECT k FROM jsonb_object_keys(p_changes) k LOOP
    IF v_key NOT IN ('title','description','video_url','attributes','price_mode','price_amount',
                     'price_currency','price_period','price_bp','price_negotiable') THEN
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
  -- the end date and the places are not sent and the contact step is not reached — a box does not change them.
  v_video := CASE WHEN p_changes ? 'video_url' THEN nullif(btrim(coalesce(p_changes->>'video_url', '')), '')
                  ELSE v_prev.video_url END;
  v_val := public.validate_listing_draft(v_uid, 5::smallint, v_prev.category_id,
    CASE WHEN p_changes ? 'title' THEN p_changes->>'title' ELSE v_prev.title END,
    CASE WHEN p_changes ? 'description' THEN p_changes->>'description' ELSE v_prev.description END,
    v_video,
    CASE WHEN p_changes ? 'attributes' THEN p_changes->'attributes' ELSE v_prev.attributes END,
    CASE WHEN p_changes ? 'price_mode' THEN p_changes->>'price_mode' ELSE v_prev.price_mode END,
    CASE WHEN p_changes ? 'price_amount' THEN (p_changes->>'price_amount')::numeric ELSE v_prev.price_amount END,
    CASE WHEN p_changes ? 'price_currency' THEN (p_changes->>'price_currency')::char(3) ELSE v_prev.price_currency END,
    CASE WHEN p_changes ? 'price_period' THEN p_changes->>'price_period' ELSE v_prev.price_period END,
    NULL, NULL, v_prev.contact_pref, v_prev.attributes,
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
  v_review := v_prev.status = 'rejected'
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

  v_after  := to_jsonb(v_row) - 'search_tsv' - 'updated_at';
  v_before := to_jsonb(v_prev) - 'search_tsv' - 'updated_at';
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

-- ===== B — copy_my_listing =====
CREATE OR REPLACE FUNCTION public.copy_my_listing(p_listing_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 VOLATILE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid  uuid := auth.uid();
  v_src  public.listings%ROWTYPE;
  v_row  public.listings%ROWTYPE;
  v_obs  char(2);
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF EXISTS (SELECT 1 FROM public.profiles WHERE user_id = v_uid AND account_status = 'deactivated') THEN
    RAISE EXCEPTION 'account is deactivated';
  END IF;
  -- A copy is a new draft: it counts against the posting form's own dial.
  IF NOT coalesce((public.rate_gate('draft')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;

  SELECT * INTO v_src FROM public.listings WHERE id = p_listing_id;
  IF NOT FOUND OR v_src.deleted_at IS NOT NULL THEN RAISE EXCEPTION 'listing not found'; END IF;
  IF v_src.seller_id <> v_uid THEN RAISE EXCEPTION 'not your listing'; END IF;
  IF v_src.status = 'draft' THEN RAISE EXCEPTION 'a draft is not copied'; END IF;
  -- A removed ad (staff's) or a refused one (screening's) is not posted again by copying it; a refused ad is edited.
  IF v_src.status IN ('removed', 'rejected') THEN RAISE EXCEPTION 'a removed or refused listing is not copied'; END IF;
  -- DEC-068 — the home country of a new ad is the server's residency fact, as submit_listing writes it.
  SELECT d.observed_country_code INTO v_obs FROM public.user_directory d WHERE d.user_id = v_uid;
  IF v_obs IS NULL THEN RAISE EXCEPTION 'residencyUnknown'; END IF;

  -- D182 4 — Post a similar ad: a new draft with the ad's details — its category, words, answers, price, video
  -- link, places, pin and contact choice — and none of its photos, dates or marks. The posting form opens it on
  -- the photos step and judges every step again as the seller saves it.
  INSERT INTO public.listings (
    seller_id, category_id, location_id, title, description, attributes,
    price_amount, price_currency, price_bp, price_negotiable, price_mode, price_period,
    video_url, contact_pref, status, home_country_code, draft_step, draft_updated_at,
    price_unit, price_unit_text,
    pin_lat, pin_lng, pin_precision, pin_show_lat, pin_show_lng, pin_zoom, street_address, directions
  ) VALUES (
    v_uid, v_src.category_id, v_src.location_id, v_src.title, v_src.description, v_src.attributes,
    v_src.price_amount, v_src.price_currency, v_src.price_bp, v_src.price_negotiable, v_src.price_mode,
    v_src.price_period,
    v_src.video_url, v_src.contact_pref, 'draft', v_obs, 1, now(),
    v_src.price_unit, v_src.price_unit_text,
    v_src.pin_lat, v_src.pin_lng, v_src.pin_precision, v_src.pin_show_lat, v_src.pin_show_lng, v_src.pin_zoom,
    v_src.street_address, v_src.directions
  ) RETURNING * INTO v_row;

  INSERT INTO public.listing_locations (listing_id, location_id, position)
    SELECT v_row.id, ll.location_id, ll.position
      FROM public.listing_locations ll
     WHERE ll.listing_id = p_listing_id;

  INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
    VALUES (v_row.id, v_uid, 'create', NULL,
            (to_jsonb(v_row) - 'search_tsv') || jsonb_build_object('copied_from', p_listing_id), v_uid);

  RETURN jsonb_build_object('ok', true, 'listing_id', v_row.id);
END $function$;
REVOKE ALL ON FUNCTION public.copy_my_listing(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.copy_my_listing(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.copy_my_listing(uuid) TO service_role;

-- ===== P — proofs (RAISE EXCEPTION on any failure; a clean apply is the pass) =====
DO $proof$
DECLARE
  v_n   integer;
  v_msg text;
BEGIN
  -- P1. The headers.
  SELECT count(*) INTO v_n FROM pg_proc
   WHERE oid IN ('public.edit_my_listing(uuid,jsonb)'::regprocedure, 'public.copy_my_listing(uuid)'::regprocedure)
     AND provolatile = 'v' AND prosecdef AND proconfig = ARRAY['search_path=public'];
  IF v_n <> 2 THEN RAISE EXCEPTION 'B16R2 P1: the two doors are not VOLATILE SECURITY DEFINER with search_path public'; END IF;

  -- P2. Who may call them: a signed-in user, never anon.
  IF has_function_privilege('anon', 'public.edit_my_listing(uuid,jsonb)', 'EXECUTE')
     OR has_function_privilege('anon', 'public.copy_my_listing(uuid)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.edit_my_listing(uuid,jsonb)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.copy_my_listing(uuid)', 'EXECUTE') THEN
    RAISE EXCEPTION 'B16R2 P2: a door is open to anon or closed to signed-in users';
  END IF;

  -- P3. No session: refused at the first gate.
  PERFORM set_config('request.jwt.claims', '', true);
  BEGIN
    PERFORM public.edit_my_listing(gen_random_uuid(), jsonb_build_object('title', 'x'));
    RAISE EXCEPTION 'B16R2 P3: edit_my_listing answered a call with no session';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'not authenticated' THEN RAISE EXCEPTION 'B16R2 P3: edit_my_listing: %', v_msg; END IF;
  END;
  BEGIN
    PERFORM public.copy_my_listing(gen_random_uuid());
    RAISE EXCEPTION 'B16R2 P3: copy_my_listing answered a call with no session';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'not authenticated' THEN RAISE EXCEPTION 'B16R2 P3: copy_my_listing: %', v_msg; END IF;
  END;

  -- P4. A scratch identity (a fresh uuid; no auth.users row is read or written): empty or forbidden changes are refused
  -- before any table is read.
  PERFORM set_config('request.jwt.claims', json_build_object('sub', gen_random_uuid())::text, true);
  BEGIN
    PERFORM public.edit_my_listing(gen_random_uuid(), '{}'::jsonb);
    RAISE EXCEPTION 'B16R2 P4: empty changes were taken';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'nothing to change' THEN RAISE EXCEPTION 'B16R2 P4: empty changes: %', v_msg; END IF;
  END;
  BEGIN
    PERFORM public.edit_my_listing(gen_random_uuid(), jsonb_build_object('category_id', gen_random_uuid()));
    RAISE EXCEPTION 'B16R2 P4: a category change was taken';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'not editable: category_id' THEN RAISE EXCEPTION 'B16R2 P4: category: %', v_msg; END IF;
  END;
  BEGIN
    PERFORM public.edit_my_listing(gen_random_uuid(), jsonb_build_object('contact_pref', '{}'::jsonb));
    RAISE EXCEPTION 'B16R2 P4: a contact change was taken';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'not editable: contact_pref' THEN RAISE EXCEPTION 'B16R2 P4: contact: %', v_msg; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '', true);
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261015230000') ON CONFLICT (version) DO NOTHING;
