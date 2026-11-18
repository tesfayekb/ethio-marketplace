-- e2e-areas: admin-listings, admin-screening

-- Foundations 1, turn F1-6a, part 1 of 9 — THE FAMILY'S FOUR CORES ONTO CODES (DEC-333; brief
-- docs/governance/briefs/f1-doors-6a.md, ruling docs/governance/briefs/f1-doors-6a-ruling-1.md, census
-- docs/governance/reports/f1-doors-6a.census.md). admin_allow_listing_photo_core, admin_review_photo_change_core,
-- admin_move_listing_core and admin_edit_listing_core are redeclared WHOLE from their last declarations (live md5
-- checked): every raised sentence becomes a door_refuse code (P0D01), so the doors' shells (parts 3 and 4) answer it
-- and a door not yet on the shell lets it reach the client as an error whose message is the code. Each core keeps its
-- own gates, as codes, in their order: every part is applied alone, and a core never drops a gate before its door
-- holds it. Ruling 1 §4: the move core's rate_gate('revise') goes — one staff move spends staff_moderation once, at
-- its door. Folds: 'not signed in' / 'not authenticated' → notSignedIn; 'permission denied' / 'forbidden' →
-- permissionDenied; 'account is deactivated' → accountDeactivated; 'reviewGone'; 'changeGone'; "your own listing is
-- changed / edited the seller's way" → ownListing; 'unknown move' → badValue:to; 'listing not found' →
-- listingNotFound; 'illegal move: <a> -> <b>' → illegalTransition:<a>-<b>; 'unknown reason' → badValue:reason; 'a note
-- is required' → noteRequired; 'the note is too long' → noteTooLong; the severe restore → severeRestore; 'nothing to
-- change' / 'nothing changed' → nothingChanged; 'not editable: <key>' → badValue:<key>; 'a removed listing is not
-- edited' → listingRemoved; the posted category → categoryFixed; 'remove_photos must be a list' →
-- badValue:remove_photos; 'photo not found on this listing' → photoNotFound. The edit's validate_listing_draft answer
-- stays RETURNED (the seller's refusals, ruling 1 §6). Step-up (P0009) is unchanged.

DO $pre$
DECLARE
  v_pairs text[][] := ARRAY[
    ['public.admin_allow_listing_photo_core(uuid)', '04b61455ec2985e302ab9474b02b38ea'],
    ['public.admin_review_photo_change_core(uuid)', '93e1798802419e4a8b9a9e436d9805ef'],
    ['public.admin_move_listing_core(uuid,text,text,text)', '403c8acf9fa61ebe3dd3a87676ddba53'],
    ['public.admin_edit_listing_core(uuid,jsonb,text,text)', '5afb24b3a7aaa4bc0b08e3c6bb400014']];
  v_md5   text;
  i       integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261117060500') THEN
    RAISE EXCEPTION 'F1-6a part 1: the ledger''s newest mark 20261117060500 (F1-5b part 6) must be applied first';
  END IF;
  IF to_regprocedure('public.door_refuse(text,text)') IS NULL THEN
    RAISE EXCEPTION 'F1-6a part 1: door_refuse is missing';
  END IF;
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_pairs[i][1]::regprocedure;
    IF v_md5 IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-6a part 1: the live % is not its last declaration''s body (%)', v_pairs[i][1], v_md5;
    END IF;
  END LOOP;
END $pre$;

-- ------------------------------------------------------------ 1. admin_allow_listing_photo_core (whole from 20261028233839 :27; codes)
CREATE OR REPLACE FUNCTION public.admin_allow_listing_photo_core(p_photo_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY INVOKER
 SET search_path TO 'public'
AS $function$
DECLARE v_uid uuid := auth.uid(); v_listing uuid; v_seller uuid; v_label text; v_code text;
BEGIN
  IF v_uid IS NULL THEN PERFORM public.door_refuse('notSignedIn'); END IF;
  IF NOT public.has_permission(v_uid, 'listings', 'review') THEN
    PERFORM public.door_refuse('permissionDenied');
  END IF;
  IF EXISTS (SELECT 1 FROM public.profiles WHERE user_id = v_uid AND account_status = 'deactivated') THEN
    PERFORM public.door_refuse('accountDeactivated');
  END IF;
  -- D178 — showing a photo the screen held back is a person's decision, made as an ad's approval is.
  PERFORM public.require_step_up_if_needed('listings', 'review');
  SELECT r.listing_id, r.label, r.code INTO v_listing, v_label, v_code
    FROM public.listing_photo_reviews r
   WHERE r.photo_id = p_photo_id AND r.decided_at IS NULL
   FOR UPDATE;
  IF v_listing IS NULL THEN
    PERFORM public.door_refuse('reviewGone');
  END IF;
  SELECT seller_id INTO v_seller FROM public.listings WHERE id = v_listing;
  IF v_seller = v_uid THEN
    PERFORM public.door_refuse('ownListing');
  END IF;
  UPDATE public.listing_photos SET unscreened = false WHERE id = p_photo_id AND listing_id = v_listing;
  UPDATE public.listing_photo_reviews SET decided_at = now(), decided_by = v_uid, decision = 'allowed'
   WHERE photo_id = p_photo_id;
  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
  VALUES (v_uid, 'listing.photo_allowed', 'listing', v_listing::text,
          jsonb_strip_nulls(jsonb_build_object('photo', p_photo_id, 'label', v_label, 'code', v_code)));
  RETURN jsonb_build_object('ok', true, 'photo', p_photo_id, 'listing', v_listing);
END $function$;
REVOKE ALL ON FUNCTION public.admin_allow_listing_photo_core(uuid) FROM PUBLIC, anon, authenticated, service_role;

-- ------------------------------------------------------------ 2. admin_review_photo_change_core (whole from 20261028233839 :90; codes)
CREATE OR REPLACE FUNCTION public.admin_review_photo_change_core(p_change_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY INVOKER
 SET search_path TO 'public'
AS $function$
DECLARE v_uid uuid := auth.uid(); v_listing uuid;
BEGIN
  IF v_uid IS NULL THEN PERFORM public.door_refuse('notSignedIn'); END IF;
  IF NOT public.has_permission(v_uid, 'listings', 'review') THEN
    PERFORM public.door_refuse('permissionDenied');
  END IF;
  UPDATE public.listing_photo_changes SET reviewed_at = now(), reviewed_by = v_uid
   WHERE id = p_change_id AND reviewed_at IS NULL
  RETURNING listing_id INTO v_listing;
  IF v_listing IS NULL THEN
    PERFORM public.door_refuse('changeGone');
  END IF;
  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
  VALUES (v_uid, 'listing.photo_change_reviewed', 'listing', v_listing::text,
          jsonb_build_object('change', p_change_id));
  RETURN jsonb_build_object('ok', true, 'change', p_change_id);
END $function$;
REVOKE ALL ON FUNCTION public.admin_review_photo_change_core(uuid) FROM PUBLIC, anon, authenticated, service_role;

-- ------------------------------------------------------------ 3. admin_move_listing_core (whole from 20261115203200 :41; codes; revise leaves)
CREATE OR REPLACE FUNCTION public.admin_move_listing_core(p_listing_id uuid, p_to text, p_reason text, p_note text DEFAULT NULL::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY INVOKER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid  uuid := auth.uid();
  v_row  public.listings%ROWTYPE;
  v_note text := nullif(btrim(coalesce(p_note, '')), '');
  v_kind text;
BEGIN
  IF v_uid IS NULL THEN
    PERFORM public.door_refuse('notSignedIn');
  END IF;
  IF NOT public.has_permission(v_uid, 'listings', 'enforce') THEN
    PERFORM public.door_refuse('permissionDenied');
  END IF;
  IF EXISTS (SELECT 1 FROM public.profiles WHERE user_id = v_uid AND account_status = 'deactivated') THEN
    PERFORM public.door_refuse('accountDeactivated');
  END IF;
  IF p_to IS NULL OR p_to NOT IN ('removed','screening') THEN
    PERFORM public.door_refuse('badValue', 'to');
  END IF;

  SELECT * INTO v_row FROM public.listings WHERE id = p_listing_id FOR UPDATE;
  IF NOT FOUND OR v_row.status = 'draft' THEN
    PERFORM public.door_refuse('listingNotFound');
  END IF;
  IF v_row.seller_id = v_uid THEN
    PERFORM public.door_refuse('ownListing');
  END IF;
  v_kind := CASE
    WHEN p_to = 'removed' AND v_row.status <> 'removed' THEN 'admin_remove'
    WHEN p_to = 'screening' AND v_row.status = 'removed' THEN 'admin_restore'
    WHEN p_to = 'screening' AND v_row.status IN ('active','reduced') THEN 'admin_send_back'
  END;
  IF v_kind IS NULL THEN
    PERFORM public.door_refuse('illegalTransition', v_row.status || '-' || p_to);
  END IF;

  IF p_reason IS NULL OR NOT (
       (v_kind = 'admin_remove' AND p_reason IN ('prohibited','misleading','duplicate','contact_in_text','photo','rules','other'))
    OR (v_kind = 'admin_restore' AND p_reason IN ('removed_in_error','appeal_accepted','other'))
    OR (v_kind = 'admin_send_back' AND p_reason IN ('wrong_category','misleading','contact_in_text','photo','rules','other'))) THEN
    PERFORM public.door_refuse('badValue', 'reason');
  END IF;
  IF p_reason = 'other' AND v_note IS NULL THEN
    PERFORM public.door_refuse('noteRequired');
  END IF;
  IF v_note IS NOT NULL AND char_length(v_note) > 500 THEN
    PERFORM public.door_refuse('noteTooLong');
  END IF;
  -- D137 — the severe rule is named before this core's own step-up check; the door on the shell (F1-6a part 4) asks
  -- the second factor first (ruling 1 §7).
  IF v_kind = 'admin_restore' AND coalesce(v_row.screening->>'severe','false') = 'true'
     AND NOT public.is_super_admin(v_uid) THEN
    PERFORM public.door_refuse('severeRestore');
  END IF;
  PERFORM public.require_step_up_if_needed('listings', 'enforce');

  -- The state machine moves the listing and writes its revision (kind state). F1-6a (ruling 1 §4) — the move spends
  -- no dial here: its door spends staff_moderation once.
  PERFORM public.transition_listing_core(p_listing_id, p_to);

  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
    VALUES (v_uid, 'listing.' || v_kind, 'listing', p_listing_id::text,
            jsonb_strip_nulls(jsonb_build_object('from', v_row.status, 'to', p_to, 'reason', p_reason, 'note', v_note)));
  INSERT INTO public.seller_notices (seller_id, listing_id, kind, fields, reason, note)
    VALUES (v_row.seller_id, p_listing_id, v_kind, ARRAY['status'], p_reason, v_note);

  RETURN jsonb_build_object('ok', true, 'kind', v_kind, 'status', p_to);
END $function$;
REVOKE ALL ON FUNCTION public.admin_move_listing_core(uuid, text, text, text) FROM PUBLIC, anon, authenticated, service_role;

-- ------------------------------------------------------------ 4. admin_edit_listing_core (whole from 20261107125401 :107; codes)
CREATE OR REPLACE FUNCTION public.admin_edit_listing_core(p_listing_id uuid, p_changes jsonb, p_reason text, p_note text DEFAULT NULL::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY INVOKER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid      uuid := auth.uid();
  v_prev     public.listings%ROWTYPE;
  v_row      public.listings%ROWTYPE;
  v_key      text;
  v_note     text := nullif(btrim(coalesce(p_note, '')), '');
  v_val      jsonb;
  v_photos   uuid[] := ARRAY[]::uuid[];
  v_removed  jsonb := '[]'::jsonb;
  v_next     uuid;
  v_before   jsonb;
  v_after    jsonb;
  v_diff_a   jsonb := '{}'::jsonb;
  v_diff_b   jsonb := '{}'::jsonb;
  v_fields   text[];
BEGIN
  IF v_uid IS NULL THEN
    PERFORM public.door_refuse('notSignedIn');
  END IF;
  IF NOT public.has_permission(v_uid, 'listings', 'enforce') THEN
    PERFORM public.door_refuse('permissionDenied');
  END IF;
  IF EXISTS (SELECT 1 FROM public.profiles WHERE user_id = v_uid AND account_status = 'deactivated') THEN
    PERFORM public.door_refuse('accountDeactivated');
  END IF;
  PERFORM public.require_step_up_if_needed('listings', 'enforce');
  -- D141 — 'undo' is accepted only from admin_undo_listing_edit, which turns app.listing_undo on for its own call.
  IF p_reason IS NULL OR (p_reason NOT IN ('wrong_category','misleading','contact_in_text','photo','rules','other')
                          AND NOT (p_reason = 'undo' AND coalesce(current_setting('app.listing_undo', true), '') = 'on')) THEN
    PERFORM public.door_refuse('badValue', 'reason');
  END IF;
  IF p_reason = 'other' AND v_note IS NULL THEN
    PERFORM public.door_refuse('noteRequired');
  END IF;
  IF v_note IS NOT NULL AND char_length(v_note) > 500 THEN
    PERFORM public.door_refuse('noteTooLong');
  END IF;
  IF p_changes IS NULL OR jsonb_typeof(p_changes) <> 'object' OR p_changes = '{}'::jsonb THEN
    PERFORM public.door_refuse('nothingChanged');
  END IF;
  FOR v_key IN SELECT k FROM jsonb_object_keys(p_changes) k LOOP
    IF v_key NOT IN ('title','description','category_id','attributes','price_mode','price_amount',
                     'price_currency','price_period','price_bp','price_negotiable','remove_photos') THEN
      PERFORM public.door_refuse('badValue', v_key);
    END IF;
  END LOOP;

  SELECT * INTO v_prev FROM public.listings WHERE id = p_listing_id FOR UPDATE;
  -- A draft is the seller's private work: it is not found here (D136).
  IF NOT FOUND OR v_prev.status = 'draft' THEN
    PERFORM public.door_refuse('listingNotFound');
  END IF;
  IF v_prev.status = 'removed' THEN
    PERFORM public.door_refuse('listingRemoved');
  END IF;
  IF v_prev.seller_id = v_uid THEN
    PERFORM public.door_refuse('ownListing');
  END IF;
  -- D172 (the operator, 2026-10-14) — a posted ad's category is never changed. The undo door alone may put back a
  -- category that an edit made before D172 had moved: app.listing_undo is on only for its own call.
  IF p_changes ? 'category_id'
     AND (p_changes->>'category_id')::uuid IS DISTINCT FROM v_prev.category_id
     AND coalesce(current_setting('app.listing_undo', true), '') <> 'on' THEN
    PERFORM public.door_refuse('categoryFixed');
  END IF;

  IF p_changes ? 'remove_photos' THEN
    IF jsonb_typeof(p_changes->'remove_photos') <> 'array' THEN
      PERFORM public.door_refuse('badValue', 'remove_photos');
    END IF;
    SELECT coalesce(array_agg(DISTINCT x::uuid), ARRAY[]::uuid[]) INTO v_photos
      FROM jsonb_array_elements_text(p_changes->'remove_photos') x;
    IF EXISTS (SELECT 1 FROM unnest(v_photos) r(id)
                WHERE NOT EXISTS (SELECT 1 FROM public.listing_photos ph
                                   WHERE ph.id = r.id AND ph.listing_id = p_listing_id)) THEN
      PERFORM public.door_refuse('photoNotFound');
    END IF;
  END IF;

  -- The seller's content rules for what an admin can change (D140, DEC-173; INC-552): the category, the
  -- specifications, the price, the title and the description — validate_listing_draft through step 5, with every
  -- field the admin does not change read from the listing as it stands. The seller's own end date and places are not
  -- sent, and the contact step (7) is not reached: they are the seller's choices, judged when the seller saves.
  v_val := public.validate_listing_draft(v_prev.seller_id, 5::smallint,
    CASE WHEN p_changes ? 'category_id' THEN (p_changes->>'category_id')::uuid ELSE v_prev.category_id END,
    CASE WHEN p_changes ? 'title' THEN p_changes->>'title' ELSE v_prev.title END,
    CASE WHEN p_changes ? 'description' THEN p_changes->>'description' ELSE v_prev.description END,
    v_prev.video_url,
    CASE WHEN p_changes ? 'attributes' THEN p_changes->'attributes' ELSE v_prev.attributes END,
    CASE WHEN p_changes ? 'price_mode' THEN p_changes->>'price_mode' ELSE v_prev.price_mode END,
    CASE WHEN p_changes ? 'price_amount' THEN (p_changes->>'price_amount')::numeric ELSE v_prev.price_amount END,
    CASE WHEN p_changes ? 'price_currency' THEN (p_changes->>'price_currency')::char(3) ELSE v_prev.price_currency END,
    CASE WHEN p_changes ? 'price_period' THEN p_changes->>'price_period' ELSE v_prev.price_period END,
    NULL, NULL, v_prev.contact_pref, v_prev.attributes,
    CASE WHEN p_changes ? 'price_bp' THEN (p_changes->>'price_bp')::integer ELSE v_prev.price_bp END,
    CASE WHEN p_changes ? 'price_negotiable' THEN coalesce((p_changes->>'price_negotiable')::boolean, false)
         ELSE v_prev.price_negotiable END, p_listing_id);
  IF NOT coalesce((v_val->>'ok')::boolean, false) THEN
    RETURN v_val;
  END IF;

  -- ==== REQ-021 SCREENING GATEWAY (stage 2, DEC-145) ====
  -- The automatic screening call judges an admin's edit at this point, as it judges the seller's. Until stage 2
  -- nothing is called: the enforcer's edit is itself a human judgment, and a live listing stays live (D136).

  IF cardinality(v_photos) > 0 THEN
    SELECT coalesce(jsonb_agg(to_jsonb(ph) ORDER BY ph.display_order), '[]'::jsonb) INTO v_removed
      FROM public.listing_photos ph WHERE ph.listing_id = p_listing_id AND ph.id = ANY (v_photos);
    UPDATE public.listings SET cover_photo_id = NULL
     WHERE id = p_listing_id AND cover_photo_id = ANY (v_photos);
    -- The row goes; the file stays in storage until the listing's retention ends (the revision keeps its paths).
    DELETE FROM public.listing_photos WHERE listing_id = p_listing_id AND id = ANY (v_photos);
    SELECT ph.id INTO v_next FROM public.listing_photos ph
     WHERE ph.listing_id = p_listing_id ORDER BY ph.display_order LIMIT 1;
  END IF;

  UPDATE public.listings SET
    category_id      = CASE WHEN p_changes ? 'category_id' THEN (p_changes->>'category_id')::uuid ELSE category_id END,
    title            = v_val->>'title',
    description      = v_val->>'description',
    attributes       = v_val->'attrs',
    price_amount     = (v_val->>'price_amount')::numeric,
    price_currency   = (v_val->>'price_currency')::char(3),
    price_mode       = v_val->>'price_mode',
    price_period     = v_val->>'price_period',
    price_bp         = (v_val->>'price_bp')::integer,
    price_negotiable = coalesce((v_val->>'price_negotiable')::boolean, false),
    price_unit       = v_val->>'price_unit',
    price_unit_text  = v_val->>'price_unit_text',
    cover_photo_id   = CASE WHEN cardinality(v_photos) > 0 THEN coalesce(cover_photo_id, v_next) ELSE cover_photo_id END,
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
  IF jsonb_array_length(v_removed) > 0 THEN
    v_diff_b := v_diff_b || jsonb_build_object('photos_removed', v_removed);
    v_diff_a := v_diff_a || jsonb_build_object('photos_removed', to_jsonb(v_photos));
  END IF;

  -- The fields as the seller will read them.
  SELECT coalesce(array_agg(DISTINCT f ORDER BY f), ARRAY[]::text[]) INTO v_fields
    FROM (SELECT CASE
                   WHEN k = 'title' THEN 'title'
                   WHEN k = 'description' THEN 'description'
                   WHEN k = 'category_id' THEN 'category'
                   WHEN k = 'attributes' THEN 'specs'
                   WHEN k LIKE 'price%' THEN 'price'
                   WHEN k IN ('photos_removed','cover_photo_id') THEN 'photos'
                 END AS f
            FROM jsonb_object_keys(v_diff_a) k) g
   WHERE f IS NOT NULL;
  IF cardinality(v_fields) = 0 THEN
    PERFORM public.door_refuse('nothingChanged');
  END IF;

  INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
    VALUES (p_listing_id, v_prev.seller_id, 'edit', v_diff_b, v_diff_a, v_uid);
  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
    VALUES (v_uid, 'listing.admin_edit', 'listing', p_listing_id::text,
            jsonb_strip_nulls(jsonb_build_object('fields', to_jsonb(v_fields), 'reason', p_reason, 'note', v_note)));
  INSERT INTO public.seller_notices (seller_id, listing_id, kind, fields, reason, note)
    VALUES (v_prev.seller_id, p_listing_id, 'admin_edit', v_fields, p_reason, v_note);

  RETURN jsonb_build_object('ok', true, 'status', v_row.status, 'fields', to_jsonb(v_fields));
END $function$;
REVOKE ALL ON FUNCTION public.admin_edit_listing_core(uuid, jsonb, text, text) FROM PUBLIC, anon, authenticated, service_role;

-- ------------------------------------------------------------ 5. PROOFS
-- (a) catalog facts: the 4 cores VOLATILE SECURITY INVOKER, search_path public, RETURNS jsonb, no browser role or the
--     service role may EXECUTE them; every body this file's (md5).
-- (b) the cores' own gates as codes (P0D01, raised): no caller notSignedIn; a signed-in person without the permission
--     permissionDenied; a deactivated holder permissionDenied (has_permission answers false for him first).
-- (c) ruling 1 §4: an enforcer's move through the core moves the ad and spends no dial at all.
DO $proof$
DECLARE
  v_hex     text := replace(gen_random_uuid()::text, '-', '');
  v_tag     text;
  -- 'XZ': a scratch code no market holds, as earlier proofs' (K4: a recorded proof exception)
  v_code    character(2) := 'XZ';
  v_lang    text := public.language_code('base');
  v_r0      text;
  v_a       uuid := gen_random_uuid();
  v_s       uuid := gen_random_uuid();
  v_plain   uuid := gen_random_uuid();
  v_deact   uuid := gen_random_uuid();
  v_sess    uuid := gen_random_uuid();
  v_role    uuid;
  v_anc     uuid;
  v_region  uuid;
  v_city    uuid;
  v_cat     uuid;
  v_l       uuid := gen_random_uuid();
  v_answer  jsonb;
  v_msg     text;
  v_fn      regprocedure;
  v_pairs   text[][];
  v_calls   text[];
  v_claims  text[];
  v_want    text[] := ARRAY['notSignedIn', 'permissionDenied', 'permissionDenied'];
  i         integer;
  j         integer;
BEGIN
  v_pairs := ARRAY[
    ['public.admin_allow_listing_photo_core(uuid)', '4f5c45441d844fb9eb7634f5c82b2a76'],
    ['public.admin_review_photo_change_core(uuid)', 'a7cd2532d0a88ce3c1995e1ed1707f93'],
    ['public.admin_move_listing_core(uuid,text,text,text)', 'c5d16cb19ada2a87bc88df3dfa45ec98'],
    ['public.admin_edit_listing_core(uuid,jsonb,text,text)', '91f8926e5c94cc2a56d14f06731ab8b7']];
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    v_fn := v_pairs[i][1]::regprocedure;
    IF (SELECT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' OR prorettype <> 'jsonb'::regtype
          FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR has_function_privilege('authenticated', v_fn, 'EXECUTE')
       OR has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-6a part 1 proof (a): %''s header, return type or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-6a part 1 proof (a): %''s body differs from this file', v_fn;
    END IF;
  END LOOP;

  v_tag := 'e2e-mig-f16a1-' || substr(v_hex, 1, 10);
  v_r0 := 'e2e_mig_r0_' || substr(v_hex, 11, 8);
  BEGIN
    PERFORM set_config('request.jwt.claims', '{}', true);
    IF EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
      RAISE EXCEPTION 'F1-6a part 1 proof: scratch code % already exists', v_code;
    END IF;
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_code, v_tag, true);
    SELECT a.id INTO v_anc FROM public.locations a WHERE a.country_code = v_code AND a.level = 'country' AND a.name_en = v_tag
     AND a.name_en LIKE 'e2e-mig-%';
    IF v_anc IS NULL THEN RAISE EXCEPTION 'F1-6a part 1 proof: the scratch market has no anchor'; END IF;
    UPDATE public.locations SET is_active = true WHERE id = v_anc AND name_en = v_tag AND name_en LIKE 'e2e-mig-%';
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id)
    VALUES ('region', v_code, v_tag || ' region', v_tag || '-r', true, v_anc) RETURNING id INTO v_region;
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id, center_lat, center_lng)
    VALUES ('city', v_code, v_tag || ' city', v_tag || '-c', true, v_region, 9.03, 38.74) RETURNING id INTO v_city;
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
      (v_a, v_tag || '-a@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_s, v_tag || '-s@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_plain, v_tag || '-p@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_deact, v_tag || '-d@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO public.legal_acceptances (user_id, version_id, language, method)
    SELECT u, v.id, v_lang, 'e2e-mig' FROM public.legal_versions v, unnest(ARRAY[v_a, v_s, v_plain, v_deact]) u
     WHERE v.status = 'published' AND v.effective_at <= now();
    UPDATE public.profiles SET account_status = 'deactivated'
     WHERE user_id = v_deact
       AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = v_deact AND u.email LIKE 'e2e-mig-%');
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-staff', v_tag) RETURNING id INTO v_role;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'listings' AND p.action IN ('review', 'enforce');
    IF (SELECT count(*) FROM public.role_permissions WHERE role_id = v_role) <> 2 THEN
      RAISE EXCEPTION 'F1-6a part 1 proof: listings:review or listings:enforce is not declared';
    END IF;
    INSERT INTO public.user_roles (user_id, role_id, scope_type) VALUES (v_s, v_role, 'global'), (v_deact, v_role, 'global');
    INSERT INTO auth.mfa_factors (id, user_id, friendly_name, factor_type, status, created_at, updated_at)
    VALUES (gen_random_uuid(), v_s, v_tag || '-f', 'totp', 'verified', now(), now());
    INSERT INTO auth.sessions (id, user_id, created_at, updated_at, aal) VALUES (v_sess, v_s, now(), now(), 'aal2');
    INSERT INTO auth.mfa_amr_claims (id, session_id, created_at, updated_at, authentication_method)
    VALUES (gen_random_uuid(), v_sess, now(), now(), 'totp');
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES (v_tag || ' leaf', v_tag, true, true, true, 9999) RETURNING id INTO v_cat;
    INSERT INTO public.listing_packages (key, kind, name_en, days, enabled, self_serve, extends_lifetime, sort)
    VALUES (v_r0, 'reach', v_tag || ' reach', 30, true, true, false, 9001);
    INSERT INTO public.market_settings (country_code, free_regular_ads, included_reach, paid_levels)
    VALUES (v_code, 20, v_r0, false);
    INSERT INTO public.listings (id, seller_id, category_id, location_id, title, description, home_country_code, status,
                                 published_at, published_first_at, expires_at)
    VALUES (v_l, v_a, v_cat, v_city, v_tag || ' l', 'scratch', v_code, 'active', now(), now(), now() + interval '10 days');

    -- (b) every core, three callers: no caller, a person without the permission, a deactivated holder.
    v_calls := ARRAY[
      format('public.admin_allow_listing_photo_core(%L::uuid)', gen_random_uuid()),
      format('public.admin_review_photo_change_core(%L::uuid)', gen_random_uuid()),
      format('public.admin_move_listing_core(%L::uuid, %L, %L, NULL)', v_l, 'removed', 'rules'),
      format('public.admin_edit_listing_core(%L::uuid, %L::jsonb, %L, NULL)', v_l, '{"title": "e2e"}', 'rules')];
    v_claims := ARRAY['{}',
      json_build_object('sub', v_plain::text, 'role', 'authenticated')::text,
      json_build_object('sub', v_deact::text, 'role', 'authenticated')::text];
    FOR i IN 1..array_length(v_calls, 1) LOOP
      FOR j IN 1..array_length(v_claims, 1) LOOP
        PERFORM set_config('request.jwt.claims', v_claims[j], true);
        BEGIN
          EXECUTE 'SELECT ' || v_calls[i] INTO v_answer;
          v_msg := 'answered ' || coalesce(v_answer::text, 'NULL');
        EXCEPTION WHEN SQLSTATE 'P0D01' THEN
          GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
        END;
        PERFORM set_config('request.jwt.claims', '{}', true);
        IF v_msg IS DISTINCT FROM v_want[j] THEN
          RAISE EXCEPTION 'F1-6a part 1 proof (b): % for caller % gave % (expected %)', v_calls[i], j, v_msg, v_want[j];
        END IF;
      END LOOP;
    END LOOP;
    IF NOT coalesce((SELECT status = 'active' FROM public.listings WHERE id = v_l), false)
       OR EXISTS (SELECT 1 FROM public.listing_revisions WHERE listing_id = v_l)
       OR EXISTS (SELECT 1 FROM public.audit_log WHERE entity_id = v_l::text) THEN
      RAISE EXCEPTION 'F1-6a part 1 proof (b): a refused core call wrote a row';
    END IF;

    -- (c) ruling 1 §4: the enforcer's move through the core, no dial spent.
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_s::text, 'role', 'authenticated', 'aal', 'aal2',
                                                               'session_id', v_sess::text)::text, true);
    v_answer := public.admin_move_listing_core(v_l, 'removed', 'rules', NULL);
    PERFORM set_config('request.jwt.claims', '{}', true);
    IF NOT coalesce(v_answer = jsonb_build_object('ok', true, 'kind', 'admin_remove', 'status', 'removed'), false) THEN
      RAISE EXCEPTION 'F1-6a part 1 proof (c): the staff move answered %', v_answer;
    END IF;
    IF NOT coalesce((SELECT status = 'removed' FROM public.listings WHERE id = v_l), false) THEN
      RAISE EXCEPTION 'F1-6a part 1 proof (c): the staff move did not remove the ad';
    END IF;
    IF EXISTS (SELECT 1 FROM public.rate_limits WHERE key IN (v_s::text, v_a::text, v_plain::text, v_deact::text)) THEN
      RAISE EXCEPTION 'F1-6a part 1 proof (c): a core spent a dial';
    END IF;

    RAISE EXCEPTION 'f1-6a-part-1-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f1-6a-part-1-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261118070000') ON CONFLICT DO NOTHING;
