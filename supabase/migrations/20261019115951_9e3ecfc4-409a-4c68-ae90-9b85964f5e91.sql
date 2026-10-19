-- e2e-areas: legal, posting, my-listings
-- Bundle 22 (Stage 1) turn 4 — M4b (part 2 of 2): the three seller doors take the certification. Each is re-declared
-- whole from its last declaration in the repository (publish_listing: 20261004144146 M5; edit_my_listing: 20261015130915;
-- renew_listing: 20261014194317), its header, body, revoke and grants unchanged apart from three named changes:
--  1. two new arguments at the end, p_certified uuid[] DEFAULT NULL and p_language text DEFAULT NULL (the argument
--     list changes, so each door is dropped and created again; every existing call, which names only the old
--     arguments, still resolves);
--  2. one call, public.legal_certify(v_uid, p_listing_id, '<publish|edit|renew>', p_certified, p_language), placed
--     after the door's own checks and validation and before its first write: acceptanceRequired while a Terms or
--     Privacy version is owed, certificationRequired unless the certified ids are exactly the statements in force for
--     the ad, badLanguage; with nothing in force nothing changes;
--  3. the revoke and grants name the new argument list.
-- Gated on M4a's mark; a migration is not DONE until its mark is read back.

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261020050000') THEN
    RAISE EXCEPTION 'bundle 22 turn 4 M4a (mark 20261020050000) must be applied first';
  END IF;
END $$;

DROP FUNCTION public.publish_listing(uuid);
DROP FUNCTION public.edit_my_listing(uuid, jsonb);
DROP FUNCTION public.renew_listing(uuid);

CREATE FUNCTION public.publish_listing(p_listing_id uuid, p_certified uuid[] DEFAULT NULL,
                                       p_language text DEFAULT NULL)
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

  -- Bundle 22 turn 4 (L1 v2 item 4) — the acceptance and the publishing certification, before anything is written.
  PERFORM public.legal_certify(v_uid, p_listing_id, 'publish', p_certified, p_language);

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
REVOKE ALL ON FUNCTION public.publish_listing(uuid, uuid[], text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.publish_listing(uuid, uuid[], text) TO authenticated;
GRANT ALL ON FUNCTION public.publish_listing(uuid, uuid[], text) TO service_role;

CREATE FUNCTION public.edit_my_listing(p_listing_id uuid, p_changes jsonb, p_certified uuid[] DEFAULT NULL,
                                       p_language text DEFAULT NULL)
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

  -- Bundle 22 turn 4 (L1 v2 item 4) — the acceptance and the publishing certification, before anything is written.
  PERFORM public.legal_certify(v_uid, p_listing_id, 'edit', p_certified, p_language);

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
REVOKE ALL ON FUNCTION public.edit_my_listing(uuid, jsonb, uuid[], text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.edit_my_listing(uuid, jsonb, uuid[], text) TO authenticated;
GRANT ALL ON FUNCTION public.edit_my_listing(uuid, jsonb, uuid[], text) TO service_role;

CREATE FUNCTION public.renew_listing(p_listing_id uuid, p_certified uuid[] DEFAULT NULL,
                                     p_language text DEFAULT NULL)
 RETURNS jsonb
 LANGUAGE plpgsql
 VOLATILE
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid    uuid := auth.uid();
  v_row    public.listings%ROWTYPE;
  v_policy public.listing_policy%ROWTYPE;
  v_poster timestamptz;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF NOT coalesce((public.rate_gate('revise')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;
  SELECT * INTO v_row FROM public.listings WHERE id = p_listing_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'listing not found'; END IF;
  IF v_row.seller_id <> v_uid THEN RAISE EXCEPTION 'not your listing'; END IF;
  IF EXISTS (SELECT 1 FROM public.profiles WHERE user_id = v_uid AND account_status = 'deactivated') THEN
    RAISE EXCEPTION 'account is deactivated';
  END IF;
  -- D174 3, D175 2 (bundle 16) — an EXPIRED ad is renewed (a live one is not renewed early), when the admin allows it,
  -- for the admin's number of days; there is no waiting time between renewals.
  IF v_row.status <> 'expired' THEN
    RETURN jsonb_build_object('ok', false, 'refusals',
      jsonb_build_array(jsonb_build_object('field','status','reason','renewNeedsExpired')));
  END IF;
  SELECT * INTO v_policy FROM public.listing_policy WHERE id;
  IF NOT FOUND OR NOT v_policy.renew_allowed THEN
    RETURN jsonb_build_object('ok', false, 'refusals',
      jsonb_build_array(jsonb_build_object('field','renew','reason','renewOff')));
  END IF;
  -- D176 (the operator, 2026-10-14) — until the REQ-021 screening gateway exists, a renewed ad goes live at once: its
  -- content was approved and has not changed (an expired ad cannot be edited — edit_listing). It returns to the live
  -- status it expired from, with a fresh posting date (call D) and renewed_at; published_first_at is kept (D175 3).
  -- When the gateway is built, renewals pass through it.
  v_poster := CASE WHEN v_row.poster_expires_at <= now() THEN NULL ELSE v_row.poster_expires_at END;
  -- Bundle 22 turn 4 (L1 v2 item 4) — the acceptance and the publishing certification, before anything is written.
  PERFORM public.legal_certify(v_uid, p_listing_id, 'renew', p_certified, p_language);

  UPDATE public.listings SET
    status = coalesce(v_row.resume_status, 'active'),
    poster_expires_at = v_poster,
    expires_at = LEAST(v_poster, now() + make_interval(days => v_policy.renew_days)),
    published_at = now(),
    renewed_at = now(),
    renewed_count = renewed_count + 1,
    clock_kept = false, kept_remaining = NULL, resume_status = NULL,
    updated_at = now()
  WHERE id = p_listing_id;
  INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
    VALUES (p_listing_id, v_uid, 'state',
            jsonb_build_object('status', v_row.status, 'renewed_count', v_row.renewed_count,
                               'expires_at', v_row.expires_at, 'poster_expires_at', v_row.poster_expires_at),
            jsonb_build_object('status', coalesce(v_row.resume_status, 'active'),
                               'renewed_count', v_row.renewed_count + 1), v_uid);
  RETURN jsonb_build_object('ok', true, 'renewed_count', v_row.renewed_count + 1,
                            'status', coalesce(v_row.resume_status, 'active'));
END $function$;
REVOKE ALL ON FUNCTION public.renew_listing(uuid, uuid[], text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.renew_listing(uuid, uuid[], text) TO authenticated;
GRANT ALL ON FUNCTION public.renew_listing(uuid, uuid[], text) TO service_role;

-- Proofs, with no caller (G39): the old argument lists are gone; each door refuses a missing caller first, as before;
-- headers and grants as declared. The certification with a person is proven by LG-16 to LG-18.
DO $$
DECLARE
  v_vol  "char";
  v_def  boolean;
  v_conf text[];
  r      record;
BEGIN
  IF to_regprocedure('public.publish_listing(uuid)') IS NOT NULL
     OR to_regprocedure('public.edit_my_listing(uuid, jsonb)') IS NOT NULL
     OR to_regprocedure('public.renew_listing(uuid)') IS NOT NULL THEN
    RAISE EXCEPTION 'proof failed: an old argument list still exists';
  END IF;
  FOR r IN SELECT * FROM (VALUES ('publish'), ('edit'), ('renew')) AS t(door) LOOP
    BEGIN
      IF r.door = 'publish' THEN PERFORM public.publish_listing(gen_random_uuid());
      ELSIF r.door = 'edit' THEN PERFORM public.edit_my_listing(gen_random_uuid(), '{"title": "x"}'::jsonb);
      ELSE PERFORM public.renew_listing(gen_random_uuid());
      END IF;
      RAISE EXCEPTION 'proof failed: % answered a missing caller', r.door;
    EXCEPTION WHEN raise_exception THEN
      IF SQLERRM <> 'not authenticated' THEN RAISE; END IF;
    END;
  END LOOP;
  FOR r IN SELECT * FROM (VALUES
      ('public.publish_listing(uuid, uuid[], text)'),
      ('public.edit_my_listing(uuid, jsonb, uuid[], text)'),
      ('public.renew_listing(uuid, uuid[], text)')) AS t(sig) LOOP
    SELECT p.provolatile, p.prosecdef, p.proconfig INTO v_vol, v_def, v_conf
      FROM pg_proc p WHERE p.oid = r.sig::regprocedure;
    IF v_vol IS DISTINCT FROM 'v' OR v_def IS DISTINCT FROM true
       OR v_conf IS DISTINCT FROM ARRAY['search_path=public'] THEN
      RAISE EXCEPTION 'proof failed: % header (%, %, %)', r.sig, v_vol, v_def, v_conf;
    END IF;
    IF has_function_privilege('anon', r.sig, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', r.sig, 'EXECUTE') THEN
      RAISE EXCEPTION 'proof failed: % grants', r.sig;
    END IF;
  END LOOP;
END $$;

INSERT INTO public.migration_marks (version) VALUES ('20261020060000') ON CONFLICT (version) DO NOTHING;
