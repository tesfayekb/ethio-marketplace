-- e2e-areas: my-listings, posting, door-refusals

-- Foundations 1, turn F1-5a, part 12 — EDIT_MY_LISTING ONTO DOOR_CONTEXT AND THE SHELL (DEC-333, DEC-391; brief
-- docs/governance/briefs/f1-doors-5a.md, ruling docs/governance/briefs/f1-doors-5a-ruling-1.md).
-- edit_my_listing is redeclared WHOLE from its last declaration (live md5 checked; its body was computed, now
-- it is whole text): ONE door_context('owner', …, 'revise') gate, its refusals by door_refuse codes, the shell.
-- The order of its checks is kept: the shape of the changes (nothingChanged, notEditable:<key>) before the row.
-- DEC-391: another seller's ad and an id no row holds answer notYourListing alike; the caller's own deleted
-- ad answers listingNotFound. validate_listing_draft's field refusals and legal_certify's raise are kept as
-- they are. Folds: 'not signed in' → notSignedIn; 'account is deactivated' → accountDeactivated; 'nothing to
-- change' → nothingChanged; '<key> is not editable here' → notEditable:<key>; 'not your listing' / 'listing not
-- found' → notYourListing / listingNotFound; 'a draft is edited in the posting form' → draftNotEdited; 'in
-- review' → inReview; 'renew it first' → renewFirst; 'not editable in status <s>' → listingNotEditable:<s>;
-- 'coverage must be …' / 'contact_pref must be …' → badShape:coverage / badShape:contact_pref; the place text's
-- lengths → streetTooLong:<n> / directionsTooLong:<n>; 'contact in the note' → contactInNote.

DO $pre$
DECLARE
  v_pairs text[][] := ARRAY[
    ['public.edit_my_listing(uuid,jsonb,uuid[],text)', '77def52b1ce62164e8f2ee1a84af6715']];
  v_md5  text;
  i      integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261116030900') THEN
    RAISE EXCEPTION 'F1-5a part 12: part 11 (mark 20261116030900) must be applied first';
  END IF;
  IF to_regprocedure('public.door_refuse(text,text)') IS NULL
     OR to_regprocedure('public.door_refused(text,text,text)') IS NULL
     OR NOT EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'door_context' AND pronamespace = 'public'::regnamespace) THEN
    RAISE EXCEPTION 'F1-5a part 12: the door mechanism (door_context, door_refuse, door_refused) is missing';
  END IF;
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_pairs[i][1]::regprocedure;
    IF v_md5 IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-5a part 12: the live % is not its last declaration''s body (%)', v_pairs[i][1], v_md5;
    END IF;
  END LOOP;
END $pre$;

-- ------------------------------------------------------------ 1. edit_my_listing (whole; the owner gate and the shell)
CREATE OR REPLACE FUNCTION public.edit_my_listing(p_listing_id uuid, p_changes jsonb, p_certified uuid[] DEFAULT NULL,
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
  PERFORM public.door_context('owner', NULL, NULL, 'revise');
  -- What a seller's box may change (D172, D187): never the category or the end date.
  IF p_changes IS NULL OR jsonb_typeof(p_changes) <> 'object' OR p_changes = '{}'::jsonb THEN
    PERFORM public.door_refuse('nothingChanged');
  END IF;
  FOR v_key IN SELECT k FROM jsonb_object_keys(p_changes) k LOOP
    IF v_key NOT IN ('title','description','video_url','attributes','price_mode','price_amount',
                     'price_currency','price_period','price_bp','price_negotiable',
                     'coverage','contact_pref','street_address','directions') THEN
      PERFORM public.door_refuse('notEditable', v_key);
    END IF;
  END LOOP;

  SELECT * INTO v_prev FROM public.listings WHERE id = p_listing_id FOR UPDATE;
  -- DEC-391 (F1-5a) — an ad that is not the caller's, or no ad at all, is one answer; the caller's own deleted
  -- ad is gone.
  IF NOT FOUND OR v_prev.seller_id <> v_uid THEN PERFORM public.door_refuse('notYourListing'); END IF;
  IF v_prev.deleted_at IS NOT NULL THEN PERFORM public.door_refuse('listingNotFound'); END IF;
  IF v_prev.status = 'draft' THEN PERFORM public.door_refuse('draftNotEdited'); END IF;
  -- Call G — an ad in review waits for its answer.
  IF v_prev.status IN ('screening','held') THEN
    PERFORM public.door_refuse('inReview');
  END IF;
  -- D174 3 — an expired ad is renewed before it is edited; an edit never renews it.
  IF v_prev.status = 'expired' THEN
    PERFORM public.door_refuse('renewFirst');
  END IF;
  IF v_prev.status NOT IN ('active','reduced','closed','paused','rejected') THEN
    PERFORM public.door_refuse('listingNotEditable', v_prev.status);
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
    IF jsonb_typeof(p_changes->'coverage') <> 'array' THEN PERFORM public.door_refuse('badShape', 'coverage'); END IF;
    BEGIN
      SELECT coalesce(array_agg(x.value::uuid ORDER BY x.ordinality), ARRAY[]::uuid[]) INTO v_cov
        FROM jsonb_array_elements_text(p_changes->'coverage') WITH ORDINALITY x(value, ordinality);
    EXCEPTION WHEN invalid_text_representation THEN
      PERFORM public.door_refuse('badShape', 'coverage');
    END;
    v_step := 6;
  ELSE
    v_cov := v_cov_prev;
  END IF;
  IF p_changes ? 'contact_pref' THEN
    IF jsonb_typeof(p_changes->'contact_pref') <> 'object' THEN PERFORM public.door_refuse('badShape', 'contact_pref'); END IF;
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
  IF v_street IS NOT NULL AND char_length(v_street) > 200 THEN PERFORM public.door_refuse('streetTooLong', char_length(v_street)::text); END IF;
  IF v_street IS NOT NULL AND v_street IS DISTINCT FROM v_prev.street_address AND public.attr_contact_like(v_street) THEN
    PERFORM public.door_refuse('contactInNote');
  END IF;
  v_dirs := CASE WHEN p_changes ? 'directions'
                 THEN nullif(btrim(regexp_replace(regexp_replace(coalesce(p_changes->>'directions', ''),
                                                                  '[[:cntrl:]<>]', ' ', 'g'), '\s+', ' ', 'g')), '')
                 ELSE v_prev.directions END;
  IF v_dirs IS NOT NULL AND char_length(v_dirs) > 200 THEN PERFORM public.door_refuse('directionsTooLong', char_length(v_dirs)::text); END IF;
  IF v_dirs IS NOT NULL AND v_dirs IS DISTINCT FROM v_prev.directions AND public.attr_contact_like(v_dirs) THEN
    PERFORM public.door_refuse('contactInNote');
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
         ELSE v_prev.price_negotiable END, p_listing_id);
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
    clock_kept       = CASE WHEN v_review AND v_prev.status IN ('active','reduced','closed','paused') THEN true
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
    PERFORM public.door_refuse('nothingChanged');
  END IF;

  INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
    VALUES (p_listing_id, v_uid, 'edit', v_diff_b, v_diff_a, v_uid);

  RETURN jsonb_build_object('ok', true, 'status', v_row.status, 'review', v_review);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('edit_my_listing', 'revise', SQLERRM);
END $function$;
REVOKE ALL ON FUNCTION public.edit_my_listing(uuid, jsonb, uuid[], text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.edit_my_listing(uuid, jsonb, uuid[], text) TO authenticated, service_role;

-- Proof: catalog facts, then the calls on scratch rows under a sentinel rollback.
DO $proof$
DECLARE
  v_hex     text := replace(gen_random_uuid()::text, '-', '');
  v_tag     text;
  -- 'XZ': a scratch code no market holds, as earlier proofs' (K4: a recorded proof exception)
  v_code    character(2) := 'XZ';
  v_lang    text := public.language_code('base');
  v_a       uuid := gen_random_uuid();
  v_b       uuid := gen_random_uuid();
  v_d       uuid := gen_random_uuid();
  v_none    uuid := gen_random_uuid();
  v_ca      text := json_build_object('sub', v_a::text, 'role', 'authenticated')::text;
  v_cb      text := json_build_object('sub', v_b::text, 'role', 'authenticated')::text;
  v_cd      text := json_build_object('sub', v_d::text, 'role', 'authenticated')::text;
  v_r0      text;
  v_anc     uuid;
  v_region  uuid;
  v_city    uuid;
  v_cat     uuid;
  v_answer  jsonb;
  v_count   integer;
  v_refused bigint;
  v_snap    text;
  v_snap2   text;
  v_msg     text;
  v_fn      regprocedure;
  v_pairs   text[][];
  i         integer;
  v_al      uuid := gen_random_uuid();
  v_ad      uuid := gen_random_uuid();
  v_as      uuid := gen_random_uuid();
  v_ae      uuid := gen_random_uuid();
  v_arm     uuid := gen_random_uuid();
  v_ax      uuid := gen_random_uuid();
  v_bl      uuid := gen_random_uuid();
BEGIN
  v_pairs := ARRAY[
    ['public.edit_my_listing(uuid,jsonb,uuid[],text)', '4acef9fce78323a237d2edabc3fcfeb1', 'browser', 't', 'jsonb']];
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    v_fn := v_pairs[i][1]::regprocedure;
    IF (SELECT prosecdef <> (v_pairs[i][4] = 't') OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}'
               OR prorettype <> v_pairs[i][5]::regtype FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR has_function_privilege('authenticated', v_fn, 'EXECUTE') <> (v_pairs[i][3] = 'browser')
       OR has_function_privilege('service_role', v_fn, 'EXECUTE') <> (v_pairs[i][3] <> 'owner') THEN
      RAISE EXCEPTION 'F1-5a part 12 proof (a): %''s header, return type or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-5a part 12 proof (a): %''s body differs from this file', v_fn;
    END IF;
  END LOOP;

  v_tag := 'e2e-mig-f15a12-' || substr(v_hex, 1, 10);
  v_r0 := 'e2e_mig_r0_' || substr(v_hex, 11, 8);
  BEGIN
    PERFORM set_config('request.jwt.claims', '{}', true);
    IF EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
      RAISE EXCEPTION 'F1-5a part 12 proof: scratch code % already exists', v_code;
    END IF;
    IF EXISTS (SELECT 1 FROM public.listings WHERE id = v_none) THEN
      RAISE EXCEPTION 'F1-5a part 12 proof: the id no row holds is held';
    END IF;
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_code, v_tag, true);
    SELECT a.id INTO v_anc FROM public.locations a WHERE a.country_code = v_code AND a.level = 'country' AND a.name_en = v_tag
     AND a.name_en LIKE 'e2e-mig-%';
    IF v_anc IS NULL THEN RAISE EXCEPTION 'F1-5a part 12 proof: the scratch market has no anchor'; END IF;
    UPDATE public.locations SET is_active = true WHERE id = v_anc AND name_en = v_tag AND name_en LIKE 'e2e-mig-%';
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id)
    VALUES ('region', v_code, v_tag || ' region', v_tag || '-r', true, v_anc) RETURNING id INTO v_region;
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id, center_lat, center_lng)
    VALUES ('city', v_code, v_tag || ' city', v_tag || '-c', true, v_region, 9.03, 38.74) RETURNING id INTO v_city;
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
      (v_a, v_tag || '-a@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_b, v_tag || '-b@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_d, v_tag || '-d@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO public.legal_acceptances (user_id, version_id, language, method)
    SELECT u, v.id, v_lang, 'e2e-mig' FROM public.legal_versions v, unnest(ARRAY[v_a, v_b, v_d]) u
     WHERE v.status = 'published' AND v.effective_at <= now();
    UPDATE public.profiles SET account_status = 'deactivated'
     WHERE user_id = v_d
       AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = v_d AND u.email LIKE 'e2e-mig-%');
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES (v_tag || ' leaf', v_tag, true, true, true, 9999) RETURNING id INTO v_cat;
    INSERT INTO public.listing_packages (key, kind, name_en, days, enabled, self_serve, extends_lifetime, sort)
    VALUES (v_r0, 'reach', v_tag || ' reach', 30, true, true, false, 9001);
    INSERT INTO public.market_settings (country_code, free_regular_ads, included_reach, paid_levels)
    VALUES (v_code, 20, v_r0, false);

    INSERT INTO public.listings (id, seller_id, category_id, location_id, title, description, home_country_code, status,
                                 published_at, published_first_at, expires_at)
    VALUES (v_al, v_a, v_cat, v_city, v_tag || ' al', 'scratch', v_code, 'active',
            now(), now(), now() + interval '10 days');
    INSERT INTO public.listings (id, seller_id, category_id, location_id, title, description, home_country_code, status,
                                 published_at, published_first_at, expires_at)
    VALUES (v_ad, v_a, v_cat, v_city, v_tag || ' ad', 'scratch', v_code, 'draft',
            NULL, NULL, NULL);
    INSERT INTO public.listings (id, seller_id, category_id, location_id, title, description, home_country_code, status,
                                 published_at, published_first_at, expires_at)
    VALUES (v_as, v_a, v_cat, v_city, v_tag || ' as', 'scratch', v_code, 'screening',
            NULL, NULL, NULL);
    INSERT INTO public.listings (id, seller_id, category_id, location_id, title, description, home_country_code, status,
                                 published_at, published_first_at, expires_at)
    VALUES (v_ae, v_a, v_cat, v_city, v_tag || ' ae', 'scratch', v_code, 'expired',
            now(), now(), now() + interval '10 days');
    INSERT INTO public.listings (id, seller_id, category_id, location_id, title, description, home_country_code, status,
                                 published_at, published_first_at, expires_at)
    VALUES (v_arm, v_a, v_cat, v_city, v_tag || ' arm', 'scratch', v_code, 'removed',
            NULL, NULL, NULL);
    INSERT INTO public.listings (id, seller_id, category_id, location_id, title, description, home_country_code, status,
                                 published_at, published_first_at, expires_at)
    VALUES (v_ax, v_a, v_cat, v_city, v_tag || ' ax', 'scratch', v_code, 'removed',
            NULL, NULL, NULL);
    INSERT INTO public.listings (id, seller_id, category_id, location_id, title, description, home_country_code, status,
                                 published_at, published_first_at, expires_at)
    VALUES (v_bl, v_b, v_cat, v_city, v_tag || ' bl', 'scratch', v_code, 'active',
            now(), now(), now() + interval '10 days');
    UPDATE public.listings SET deleted_at = now() WHERE id = v_ax;
    SELECT coalesce(sum(count), 0) INTO v_refused FROM public.door_refusals WHERE day = current_date AND door IN ('edit_my_listing');
    PERFORM set_config('request.jwt.claims', '{}', true);
    SELECT coalesce((SELECT string_agg(to_jsonb(l)::text, '|' ORDER BY l.id) FROM public.listings l WHERE l.seller_id IN (v_a, v_b, v_d)), '')
        || '#' || (SELECT count(*) FROM public.listing_revisions r WHERE r.seller_id IN (v_a, v_b, v_d))
        || '#' || coalesce((SELECT string_agg(p.id::text || '@' || p.display_order, ',' ORDER BY p.id) FROM public.listing_photos p
                              JOIN public.listings l ON l.id = p.listing_id WHERE l.seller_id IN (v_a, v_b, v_d)), '')
        || '#' || (SELECT count(*) FROM public.listing_photo_changes c JOIN public.listings l ON l.id = c.listing_id
                    WHERE l.seller_id IN (v_a, v_b, v_d))
        || '#' || (SELECT count(*) FROM storage.objects o WHERE o.name LIKE v_tag || '%')
        || '#' || coalesce((SELECT string_agg(to_jsonb(s)::text, '|' ORDER BY s.user_id) FROM public.seller_places s
                              WHERE s.user_id IN (v_a, v_b, v_d)), '')
        || '#' || coalesce((SELECT string_agg(to_jsonb(p)::text, '|' ORDER BY p.user_id) FROM public.profiles p
                              WHERE p.user_id IN (v_a, v_b, v_d)
                                AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = p.user_id AND u.email LIKE 'e2e-mig-%')), '')
        || '#' || (SELECT count(*) FROM public.audit_log a WHERE a.actor_id IN (v_a, v_b, v_d)
                    OR a.entity_id IN (SELECT l.id::text FROM public.listings l WHERE l.seller_id IN (v_a, v_b, v_d)))
        || '#' || (SELECT count(*) FROM public.seller_notices n WHERE n.seller_id IN (v_a, v_b, v_d))
      INTO v_snap;
    v_answer := public.edit_my_listing(v_al, '{"title": "e2e"}'::jsonb, NULL, NULL);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('notSignedIn', 'notSignedIn', 'false', '401') THEN
      RAISE EXCEPTION 'F1-5a part 12 proof: edit_my_listing with no caller answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', v_cd, true);
    v_answer := public.edit_my_listing(v_al, '{"title": "e2e"}'::jsonb, NULL, NULL);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('accountDeactivated', 'accountDeactivated', 'false', '403') THEN
      RAISE EXCEPTION 'F1-5a part 12 proof: edit_my_listing for a deactivated caller answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', v_cb, true);
    v_answer := public.edit_my_listing(v_al, '{"title": "e2e"}'::jsonb, NULL, NULL);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('notYourListing', 'notYourListing', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5a part 12 proof: edit_my_listing on another seller''s ad answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', v_ca, true);
    v_answer := public.edit_my_listing(v_none, '{"title": "e2e"}'::jsonb, NULL, NULL);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('notYourListing', 'notYourListing', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5a part 12 proof: edit_my_listing on an id no row holds answered %', v_answer;
    END IF;
    v_answer := public.edit_my_listing(v_al, '{}'::jsonb, NULL, NULL);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('nothingChanged', 'nothingChanged', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5a part 12 proof: an empty change answered %', v_answer;
    END IF;
    v_answer := public.edit_my_listing(v_al, '{"category_id": "x"}'::jsonb, NULL, NULL);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('notEditable:category_id', 'notEditable', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5a part 12 proof: a change of the category answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', v_cb, true);
    v_answer := public.edit_my_listing(v_al, '{"category_id": "x"}'::jsonb, NULL, NULL);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('notEditable:category_id', 'notEditable', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5a part 12 proof: another seller''s category change (the shape first) answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', v_ca, true);
    v_answer := public.edit_my_listing(v_ax, '{"title": "e2e"}'::jsonb, NULL, NULL);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('listingNotFound', 'listingNotFound', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5a part 12 proof: an edit of the caller''s deleted ad answered %', v_answer;
    END IF;
    v_answer := public.edit_my_listing(v_ad, '{"title": "e2e"}'::jsonb, NULL, NULL);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('draftNotEdited', 'draftNotEdited', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5a part 12 proof: an edit of a draft answered %', v_answer;
    END IF;
    v_answer := public.edit_my_listing(v_as, '{"title": "e2e"}'::jsonb, NULL, NULL);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('inReview', 'inReview', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5a part 12 proof: an edit of an ad in review answered %', v_answer;
    END IF;
    v_answer := public.edit_my_listing(v_ae, '{"title": "e2e"}'::jsonb, NULL, NULL);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('renewFirst', 'renewFirst', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5a part 12 proof: an edit of an expired ad answered %', v_answer;
    END IF;
    v_answer := public.edit_my_listing(v_arm, '{"title": "e2e"}'::jsonb, NULL, NULL);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('listingNotEditable:removed', 'listingNotEditable', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5a part 12 proof: an edit of a removed ad answered %', v_answer;
    END IF;
    v_answer := public.edit_my_listing(v_al, '{"coverage": "x"}'::jsonb, NULL, NULL);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('badShape:coverage', 'badShape', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5a part 12 proof: a coverage that is not a list answered %', v_answer;
    END IF;
    v_answer := public.edit_my_listing(v_al, '{"coverage": ["x"]}'::jsonb, NULL, NULL);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('badShape:coverage', 'badShape', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5a part 12 proof: a coverage of no ids answered %', v_answer;
    END IF;
    v_answer := public.edit_my_listing(v_al, '{"contact_pref": 1}'::jsonb, NULL, NULL);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('badShape:contact_pref', 'badShape', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5a part 12 proof: a contact that is not an object answered %', v_answer;
    END IF;
    v_answer := public.edit_my_listing(v_al, jsonb_build_object('street_address', repeat('a', 201)), NULL, NULL);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('streetTooLong:201', 'streetTooLong', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5a part 12 proof: a street line too long answered %', v_answer;
    END IF;
    v_answer := public.edit_my_listing(v_al, jsonb_build_object('directions', repeat('a', 201)), NULL, NULL);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('directionsTooLong:201', 'directionsTooLong', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5a part 12 proof: a directions line too long answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    SELECT coalesce((SELECT string_agg(to_jsonb(l)::text, '|' ORDER BY l.id) FROM public.listings l WHERE l.seller_id IN (v_a, v_b, v_d)), '')
        || '#' || (SELECT count(*) FROM public.listing_revisions r WHERE r.seller_id IN (v_a, v_b, v_d))
        || '#' || coalesce((SELECT string_agg(p.id::text || '@' || p.display_order, ',' ORDER BY p.id) FROM public.listing_photos p
                              JOIN public.listings l ON l.id = p.listing_id WHERE l.seller_id IN (v_a, v_b, v_d)), '')
        || '#' || (SELECT count(*) FROM public.listing_photo_changes c JOIN public.listings l ON l.id = c.listing_id
                    WHERE l.seller_id IN (v_a, v_b, v_d))
        || '#' || (SELECT count(*) FROM storage.objects o WHERE o.name LIKE v_tag || '%')
        || '#' || coalesce((SELECT string_agg(to_jsonb(s)::text, '|' ORDER BY s.user_id) FROM public.seller_places s
                              WHERE s.user_id IN (v_a, v_b, v_d)), '')
        || '#' || coalesce((SELECT string_agg(to_jsonb(p)::text, '|' ORDER BY p.user_id) FROM public.profiles p
                              WHERE p.user_id IN (v_a, v_b, v_d)
                                AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = p.user_id AND u.email LIKE 'e2e-mig-%')), '')
        || '#' || (SELECT count(*) FROM public.audit_log a WHERE a.actor_id IN (v_a, v_b, v_d)
                    OR a.entity_id IN (SELECT l.id::text FROM public.listings l WHERE l.seller_id IN (v_a, v_b, v_d)))
        || '#' || (SELECT count(*) FROM public.seller_notices n WHERE n.seller_id IN (v_a, v_b, v_d))
      INTO v_snap2;
    IF v_snap2 IS DISTINCT FROM v_snap THEN
      RAISE EXCEPTION 'F1-5a part 12 proof: a refused edit wrote a row';
    END IF;
    SELECT coalesce(jsonb_object_agg(t.k, t.n), '{}'::jsonb) INTO v_answer
      FROM (SELECT CASE r.key WHEN v_a::text THEN 'a' WHEN v_b::text THEN 'b' ELSE 'd' END || '/' || r.action AS k,
                   sum(r.count) AS n
              FROM public.rate_limits r WHERE r.key IN (v_a::text, v_b::text, v_d::text) GROUP BY 1) t;
    IF v_answer IS DISTINCT FROM '{"a/revise":13,"b/revise":2}'::jsonb THEN
      RAISE EXCEPTION 'F1-5a part 12 proof: the dials counted %', v_answer;
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date AND door IN ('edit_my_listing'))
         IS DISTINCT FROM v_refused + 17 THEN
      RAISE EXCEPTION 'F1-5a part 12 proof: door_refusals did not meter the 17 refusals';
    END IF;

    RAISE EXCEPTION 'f1-5a-part-12-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f1-5a-part-12-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261116031000') ON CONFLICT DO NOTHING;
