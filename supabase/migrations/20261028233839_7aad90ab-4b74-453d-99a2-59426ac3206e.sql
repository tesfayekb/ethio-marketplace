-- Foundations turn D1, M5a — INC-951 part 3b, the boundary/core split (ruling, stop 7; G0.2, G54a).
-- Eight staff moderation and translation doors. For each door:
--   * public.<door>_core: the door's live body (ethio-prod, 2026-10-28 23:26 UTC) byte for byte, the
--     same arguments and return type; plpgsql, SECURITY INVOKER, search_path public; no gate;
--     REVOKE ALL FROM PUBLIC, anon, authenticated, service_role (only the owner and the DEFINER
--     doors it owns run it). The core keeps the body's own checks, as the body had them.
--   * public.<door>: name, header and grants unchanged; its body is its own authority checks in
--     today's order (signed in, permission, deactivated, step-up), then the dial's rate_gate line,
--     then RETURN/PERFORM of the core.
--     admin_move_listing: its step-up sits after its validations (D137: the severe-restore refusal is
--     read before the second factor is asked), so its door carries signed in, permission and
--     deactivated, then the gate; the step-up stays where it is, inside the core.
--     admin_review_photo_change has no step-up.
-- The dials (src/lib/dials.ts, countedBy "door"):
--   staff_moderation          600 / 3600   admin_allow_listing_photo, admin_review_photo_change,
--                                          admin_edit_listing, admin_move_listing
--   staff_translation        2000 / 3600   admin_save_translation, admin_save_entity_translation
--   staff_machine_translation 12000 / 3600 admin_machine_translation, admin_machine_entity_translation
--                                          = TRANSLATE_MAX_ITEMS (600) × machineTranslatePress (20/h)
-- The six bulk callers move to the cores in M5b; until then they still reach the doors.
INSERT INTO public.rate_dials (action, max_count, window_seconds) VALUES
  ('staff_moderation', 600, 3600),
  ('staff_translation', 2000, 3600),
  ('staff_machine_translation', 12000, 3600);

-- admin_allow_listing_photo_core: the live body of admin_allow_listing_photo byte for byte (md5(prosrc) 04b61455ec2985e302ab9474b02b38ea); no gate.
CREATE FUNCTION public.admin_allow_listing_photo_core(p_photo_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY INVOKER
 SET search_path TO 'public'
AS $function$
DECLARE v_uid uuid := auth.uid(); v_listing uuid; v_seller uuid; v_label text; v_code text;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not signed in'; END IF;
  IF NOT public.has_permission(v_uid, 'listings', 'review') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  IF EXISTS (SELECT 1 FROM public.profiles WHERE user_id = v_uid AND account_status = 'deactivated') THEN
    RAISE EXCEPTION 'account is deactivated';
  END IF;
  -- D178 — showing a photo the screen held back is a person's decision, made as an ad's approval is.
  PERFORM public.require_step_up_if_needed('listings', 'review');
  SELECT r.listing_id, r.label, r.code INTO v_listing, v_label, v_code
    FROM public.listing_photo_reviews r
   WHERE r.photo_id = p_photo_id AND r.decided_at IS NULL
   FOR UPDATE;
  IF v_listing IS NULL THEN
    RAISE EXCEPTION 'reviewGone';
  END IF;
  SELECT seller_id INTO v_seller FROM public.listings WHERE id = v_listing;
  IF v_seller = v_uid THEN
    RAISE EXCEPTION 'your own listing is changed the seller''s way';
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

CREATE OR REPLACE FUNCTION public.admin_allow_listing_photo(p_photo_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE v_uid uuid := auth.uid();
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not signed in'; END IF;
  IF NOT public.has_permission(v_uid, 'listings', 'review') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  IF EXISTS (SELECT 1 FROM public.profiles WHERE user_id = v_uid AND account_status = 'deactivated') THEN
    RAISE EXCEPTION 'account is deactivated';
  END IF;
  -- D178 — showing a photo the screen held back is a person's decision, made as an ad's approval is.
  PERFORM public.require_step_up_if_needed('listings', 'review');
  -- INC-951 3b — the door's authority, then its dial (staff_moderation), then the shared core.
  IF NOT coalesce((public.rate_gate('staff_moderation')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;
  RETURN public.admin_allow_listing_photo_core(p_photo_id);
END $function$;
REVOKE ALL ON FUNCTION public.admin_allow_listing_photo(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_allow_listing_photo(uuid) TO authenticated, service_role;

-- admin_review_photo_change_core: the live body of admin_review_photo_change byte for byte (md5(prosrc) 93e1798802419e4a8b9a9e436d9805ef); no gate.
CREATE FUNCTION public.admin_review_photo_change_core(p_change_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY INVOKER
 SET search_path TO 'public'
AS $function$
DECLARE v_uid uuid := auth.uid(); v_listing uuid;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF NOT public.has_permission(v_uid, 'listings', 'review') THEN
    RAISE EXCEPTION 'forbidden';
  END IF;
  UPDATE public.listing_photo_changes SET reviewed_at = now(), reviewed_by = v_uid
   WHERE id = p_change_id AND reviewed_at IS NULL
  RETURNING listing_id INTO v_listing;
  IF v_listing IS NULL THEN
    RAISE EXCEPTION 'changeGone';
  END IF;
  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
  VALUES (v_uid, 'listing.photo_change_reviewed', 'listing', v_listing::text,
          jsonb_build_object('change', p_change_id));
  RETURN jsonb_build_object('ok', true, 'change', p_change_id);
END $function$;
REVOKE ALL ON FUNCTION public.admin_review_photo_change_core(uuid) FROM PUBLIC, anon, authenticated, service_role;

CREATE OR REPLACE FUNCTION public.admin_review_photo_change(p_change_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE v_uid uuid := auth.uid();
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF NOT public.has_permission(v_uid, 'listings', 'review') THEN
    RAISE EXCEPTION 'forbidden';
  END IF;
  -- INC-951 3b — the door's authority, then its dial (staff_moderation), then the shared core.
  IF NOT coalesce((public.rate_gate('staff_moderation')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;
  RETURN public.admin_review_photo_change_core(p_change_id);
END $function$;
REVOKE ALL ON FUNCTION public.admin_review_photo_change(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_review_photo_change(uuid) TO authenticated, service_role;

-- admin_edit_listing_core: the live body of admin_edit_listing byte for byte (md5(prosrc) 07cd57b9091c3befe914e128318a6f44); no gate.
CREATE FUNCTION public.admin_edit_listing_core(p_listing_id uuid, p_changes jsonb, p_reason text, p_note text DEFAULT NULL::text)
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
    RAISE EXCEPTION 'not signed in';
  END IF;
  IF NOT public.has_permission(v_uid, 'listings', 'enforce') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  IF EXISTS (SELECT 1 FROM public.profiles WHERE user_id = v_uid AND account_status = 'deactivated') THEN
    RAISE EXCEPTION 'account is deactivated';
  END IF;
  PERFORM public.require_step_up_if_needed('listings', 'enforce');
  -- D141 — 'undo' is accepted only from admin_undo_listing_edit, which turns app.listing_undo on for its own call.
  IF p_reason IS NULL OR (p_reason NOT IN ('wrong_category','misleading','contact_in_text','photo','rules','other')
                          AND NOT (p_reason = 'undo' AND coalesce(current_setting('app.listing_undo', true), '') = 'on')) THEN
    RAISE EXCEPTION 'unknown reason';
  END IF;
  IF p_reason = 'other' AND v_note IS NULL THEN
    RAISE EXCEPTION 'a note is required';
  END IF;
  IF v_note IS NOT NULL AND char_length(v_note) > 500 THEN
    RAISE EXCEPTION 'the note is too long';
  END IF;
  IF p_changes IS NULL OR jsonb_typeof(p_changes) <> 'object' OR p_changes = '{}'::jsonb THEN
    RAISE EXCEPTION 'nothing to change';
  END IF;
  FOR v_key IN SELECT k FROM jsonb_object_keys(p_changes) k LOOP
    IF v_key NOT IN ('title','description','category_id','attributes','price_mode','price_amount',
                     'price_currency','price_period','price_bp','price_negotiable','remove_photos') THEN
      RAISE EXCEPTION 'not editable: %', v_key;
    END IF;
  END LOOP;

  SELECT * INTO v_prev FROM public.listings WHERE id = p_listing_id FOR UPDATE;
  -- A draft is the seller's private work: it is not found here (D136).
  IF NOT FOUND OR v_prev.status = 'draft' THEN
    RAISE EXCEPTION 'listing not found';
  END IF;
  IF v_prev.status = 'removed' THEN
    RAISE EXCEPTION 'a removed listing is not edited';
  END IF;
  IF v_prev.seller_id = v_uid THEN
    RAISE EXCEPTION 'your own listing is edited the seller''s way';
  END IF;
  -- D172 (the operator, 2026-10-14) — a posted ad's category is never changed. The undo door alone may put back a
  -- category that an edit made before D172 had moved: app.listing_undo is on only for its own call.
  IF p_changes ? 'category_id'
     AND (p_changes->>'category_id')::uuid IS DISTINCT FROM v_prev.category_id
     AND coalesce(current_setting('app.listing_undo', true), '') <> 'on' THEN
    RAISE EXCEPTION 'the category of a posted listing is not changed';
  END IF;

  IF p_changes ? 'remove_photos' THEN
    IF jsonb_typeof(p_changes->'remove_photos') <> 'array' THEN
      RAISE EXCEPTION 'remove_photos must be a list';
    END IF;
    SELECT coalesce(array_agg(DISTINCT x::uuid), ARRAY[]::uuid[]) INTO v_photos
      FROM jsonb_array_elements_text(p_changes->'remove_photos') x;
    IF EXISTS (SELECT 1 FROM unnest(v_photos) r(id)
                WHERE NOT EXISTS (SELECT 1 FROM public.listing_photos ph
                                   WHERE ph.id = r.id AND ph.listing_id = p_listing_id)) THEN
      RAISE EXCEPTION 'photo not found on this listing';
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
         ELSE v_prev.price_negotiable END);
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
    RAISE EXCEPTION 'nothing changed';
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

CREATE OR REPLACE FUNCTION public.admin_edit_listing(p_listing_id uuid, p_changes jsonb, p_reason text, p_note text DEFAULT NULL::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE v_uid uuid := auth.uid();
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'not signed in';
  END IF;
  IF NOT public.has_permission(v_uid, 'listings', 'enforce') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  IF EXISTS (SELECT 1 FROM public.profiles WHERE user_id = v_uid AND account_status = 'deactivated') THEN
    RAISE EXCEPTION 'account is deactivated';
  END IF;
  PERFORM public.require_step_up_if_needed('listings', 'enforce');
  -- INC-951 3b — the door's authority, then its dial (staff_moderation), then the shared core.
  IF NOT coalesce((public.rate_gate('staff_moderation')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;
  RETURN public.admin_edit_listing_core(p_listing_id, p_changes, p_reason, p_note);
END $function$;
REVOKE ALL ON FUNCTION public.admin_edit_listing(uuid, jsonb, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_edit_listing(uuid, jsonb, text, text) TO authenticated, service_role;

-- admin_move_listing_core: the live body of admin_move_listing byte for byte (md5(prosrc) 59c64012ffe2501ad34dd2570669cefb); no gate.
CREATE FUNCTION public.admin_move_listing_core(p_listing_id uuid, p_to text, p_reason text, p_note text DEFAULT NULL::text)
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
    RAISE EXCEPTION 'not signed in';
  END IF;
  IF NOT public.has_permission(v_uid, 'listings', 'enforce') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  IF EXISTS (SELECT 1 FROM public.profiles WHERE user_id = v_uid AND account_status = 'deactivated') THEN
    RAISE EXCEPTION 'account is deactivated';
  END IF;
  IF p_to IS NULL OR p_to NOT IN ('removed','screening') THEN
    RAISE EXCEPTION 'unknown move';
  END IF;

  SELECT * INTO v_row FROM public.listings WHERE id = p_listing_id FOR UPDATE;
  IF NOT FOUND OR v_row.status = 'draft' THEN
    RAISE EXCEPTION 'listing not found';
  END IF;
  IF v_row.seller_id = v_uid THEN
    RAISE EXCEPTION 'your own listing is changed the seller''s way';
  END IF;
  v_kind := CASE
    WHEN p_to = 'removed' AND v_row.status <> 'removed' THEN 'admin_remove'
    WHEN p_to = 'screening' AND v_row.status = 'removed' THEN 'admin_restore'
    WHEN p_to = 'screening' AND v_row.status IN ('active','reduced') THEN 'admin_send_back'
  END;
  IF v_kind IS NULL THEN
    RAISE EXCEPTION 'illegal move: % -> %', v_row.status, p_to;
  END IF;

  IF p_reason IS NULL OR NOT (
       (v_kind = 'admin_remove' AND p_reason IN ('prohibited','misleading','duplicate','contact_in_text','photo','rules','other'))
    OR (v_kind = 'admin_restore' AND p_reason IN ('removed_in_error','appeal_accepted','other'))
    OR (v_kind = 'admin_send_back' AND p_reason IN ('wrong_category','misleading','contact_in_text','photo','rules','other'))) THEN
    RAISE EXCEPTION 'unknown reason';
  END IF;
  IF p_reason = 'other' AND v_note IS NULL THEN
    RAISE EXCEPTION 'a note is required';
  END IF;
  IF v_note IS NOT NULL AND char_length(v_note) > 500 THEN
    RAISE EXCEPTION 'the note is too long';
  END IF;
  -- D137 — read before the second factor is asked, so the refusal names the rule.
  IF v_kind = 'admin_restore' AND coalesce(v_row.screening->>'severe','false') = 'true'
     AND NOT public.is_super_admin(v_uid) THEN
    RAISE EXCEPTION 'a listing removed for a severe reason is restored by a super admin only';
  END IF;
  PERFORM public.require_step_up_if_needed('listings', 'enforce');

  -- The state machine moves the listing and writes its revision (kind state).
  PERFORM public.transition_listing(p_listing_id, p_to);

  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
    VALUES (v_uid, 'listing.' || v_kind, 'listing', p_listing_id::text,
            jsonb_strip_nulls(jsonb_build_object('from', v_row.status, 'to', p_to, 'reason', p_reason, 'note', v_note)));
  INSERT INTO public.seller_notices (seller_id, listing_id, kind, fields, reason, note)
    VALUES (v_row.seller_id, p_listing_id, v_kind, ARRAY['status'], p_reason, v_note);

  RETURN jsonb_build_object('ok', true, 'kind', v_kind, 'status', p_to);
END $function$;
REVOKE ALL ON FUNCTION public.admin_move_listing_core(uuid, text, text, text) FROM PUBLIC, anon, authenticated, service_role;

CREATE OR REPLACE FUNCTION public.admin_move_listing(p_listing_id uuid, p_to text, p_reason text, p_note text DEFAULT NULL::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE v_uid uuid := auth.uid();
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'not signed in';
  END IF;
  IF NOT public.has_permission(v_uid, 'listings', 'enforce') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  IF EXISTS (SELECT 1 FROM public.profiles WHERE user_id = v_uid AND account_status = 'deactivated') THEN
    RAISE EXCEPTION 'account is deactivated';
  END IF;
  -- INC-951 3b — the door's authority, then its dial (staff_moderation), then the shared core.
  IF NOT coalesce((public.rate_gate('staff_moderation')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;
  RETURN public.admin_move_listing_core(p_listing_id, p_to, p_reason, p_note);
END $function$;
REVOKE ALL ON FUNCTION public.admin_move_listing(uuid, text, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_move_listing(uuid, text, text, text) TO authenticated, service_role;

-- admin_save_translation_core: the live body of admin_save_translation byte for byte (md5(prosrc) 05ae84291234466d01b27dde965b71af); no gate.
CREATE FUNCTION public.admin_save_translation_core(p_key text, p_lang text, p_value text)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY INVOKER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_base    text;
  v_src     text;
  v_want    text[];
  v_got     text[];
  v_flag    boolean := false;
  v_note    text := NULL;
  v_prev    public.ui_translations%ROWTYPE;
  v_had     boolean := false;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'translations', 'update') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('translations', 'update');
  IF NOT public.translation_scope_ok(p_lang) THEN
    RAISE EXCEPTION 'not assigned to this language';
  END IF;

  SELECT l.code INTO v_base FROM public.languages l WHERE l.is_base LIMIT 1;
  IF p_lang = v_base THEN
    RAISE EXCEPTION 'base language rows are sync-owned';
  END IF;

  SELECT t.value INTO v_src
    FROM public.ui_translations t WHERE t.key = p_key AND t.lang_code = v_base;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'unknown translation key';
  END IF;

  v_want := public.translation_placeholders(v_src);
  v_got  := public.translation_placeholders(p_value);
  IF v_want IS DISTINCT FROM v_got THEN
    v_flag := true;
    v_note := 'placeholder mismatch: expected {' ||
              array_to_string(v_want, '}, {') || '}';
  END IF;

  SELECT * INTO v_prev FROM public.ui_translations
   WHERE key = p_key AND lang_code = p_lang;
  v_had := FOUND;

  -- U4c revision capture: a prior VALUE, or a status that this write changes.
  IF v_had AND (v_prev.value IS NOT NULL OR v_prev.status IS DISTINCT FROM 'edited') THEN
    INSERT INTO public.ui_translation_revisions
      (key, lang_code, prev_value, prev_status, prev_machine, action, changed_by)
    VALUES (p_key, p_lang, v_prev.value, v_prev.status,
            COALESCE(v_prev.machine, false), 'save', auth.uid());
  END IF;

  INSERT INTO public.ui_translations (key, lang_code, value, status, machine,
                                      flagged, flag_note, updated_by, updated_at)
  VALUES (p_key, p_lang, p_value, 'edited', false, v_flag, v_note, auth.uid(), now())
  ON CONFLICT (key, lang_code) DO UPDATE
    SET value = EXCLUDED.value, status = 'edited', machine = false,
        flagged = EXCLUDED.flagged, flag_note = EXCLUDED.flag_note,
        updated_by = auth.uid(), updated_at = now();

  PERFORM public.log_audit('translation.save', 'ui_translations', p_key,
    jsonb_build_object('key', p_key, 'lang', p_lang, 'action', 'save',
                       'machine', false, 'flagged', v_flag,
                       'old_value', left(COALESCE(v_prev.value, ''), 200),
                       'new_value', left(COALESCE(p_value, ''), 200)));
END $function$;
REVOKE ALL ON FUNCTION public.admin_save_translation_core(text, text, text) FROM PUBLIC, anon, authenticated, service_role;

CREATE OR REPLACE FUNCTION public.admin_save_translation(p_key text, p_lang text, p_value text)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  IF NOT public.has_permission(auth.uid(), 'translations', 'update') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('translations', 'update');
  -- INC-951 3b — the door's authority, then its dial (staff_translation), then the shared core.
  IF NOT coalesce((public.rate_gate('staff_translation')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;
  PERFORM public.admin_save_translation_core(p_key, p_lang, p_value);
END $function$;
REVOKE ALL ON FUNCTION public.admin_save_translation(text, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_save_translation(text, text, text) TO authenticated;

-- admin_save_entity_translation_core: the live body of admin_save_entity_translation byte for byte (md5(prosrc) 66c953cd0ef9f4c53d194a525342bc4c); no gate.
CREATE FUNCTION public.admin_save_entity_translation_core(p_type text, p_id uuid, p_field text, p_lang text, p_value text)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY INVOKER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_base text;
  v_src  text;
  v_prev text;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'translations', 'update') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('translations', 'update');
  IF NOT public.translation_scope_ok(p_lang) THEN
    RAISE EXCEPTION 'not assigned to this language';
  END IF;

  IF NOT ((p_type IN ('category', 'location') AND p_field = 'name')
          OR (p_type = 'attribute' AND p_field = 'label')
          OR (p_type = 'attribute' AND p_field LIKE 'option:%' AND p_lang IS DISTINCT FROM 'am')) THEN
    RAISE EXCEPTION 'unknown entity field';
  END IF;

  SELECT l.code INTO v_base FROM public.languages l WHERE l.is_base LIMIT 1;
  IF p_lang = v_base THEN
    RAISE EXCEPTION 'base language rows are sync-owned';
  END IF;

  v_src := public.entity_source_value(p_type, p_id, p_field);
  IF v_src IS NULL THEN
    RAISE EXCEPTION 'unknown entity';
  END IF;

  SELECT t.value INTO v_prev FROM public.entity_translations t
   WHERE t.entity_type = p_type AND t.entity_id = p_id
     AND t.field = p_field AND t.lang_code = p_lang;

  INSERT INTO public.entity_translations
    (entity_type, entity_id, field, lang_code, value, status, machine,
     flagged, flag_note, updated_by, updated_at)
  VALUES (p_type, p_id, p_field, p_lang, p_value, 'edited', false,
          false, NULL, auth.uid(), now())
  ON CONFLICT (entity_type, entity_id, field, lang_code) DO UPDATE
    SET value = EXCLUDED.value, status = 'edited', machine = false,
        flagged = false, flag_note = NULL,
        updated_by = auth.uid(), updated_at = now();

  PERFORM public.log_audit('entity_translation.save', 'entity_translations', p_id::text,
    jsonb_build_object('type', p_type, 'id', p_id, 'field', p_field, 'lang', p_lang,
                       'action', 'save', 'machine', false,
                       'old_value', left(COALESCE(v_prev, ''), 200),
                       'new_value', left(COALESCE(p_value, ''), 200)));
END $function$;
REVOKE ALL ON FUNCTION public.admin_save_entity_translation_core(text, uuid, text, text, text) FROM PUBLIC, anon, authenticated, service_role;

CREATE OR REPLACE FUNCTION public.admin_save_entity_translation(p_type text, p_id uuid, p_field text, p_lang text, p_value text)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  IF NOT public.has_permission(auth.uid(), 'translations', 'update') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('translations', 'update');
  -- INC-951 3b — the door's authority, then its dial (staff_translation), then the shared core.
  IF NOT coalesce((public.rate_gate('staff_translation')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;
  PERFORM public.admin_save_entity_translation_core(p_type, p_id, p_field, p_lang, p_value);
END $function$;
REVOKE ALL ON FUNCTION public.admin_save_entity_translation(text, uuid, text, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_save_entity_translation(text, uuid, text, text, text) TO authenticated, service_role;

-- admin_machine_translation_core: the live body of admin_machine_translation byte for byte (md5(prosrc) 4baa491f62e3f5d4599e278292c82556); no gate.
CREATE FUNCTION public.admin_machine_translation_core(p_key text, p_lang text, p_value text)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY INVOKER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_base text; v_src text; v_want text[]; v_got text[];
  v_flag boolean := false; v_note text := NULL;
  v_prev public.ui_translations%ROWTYPE;
  v_had  boolean := false;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'translations', 'machine') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('translations', 'machine');
  IF NOT public.translation_scope_ok(p_lang) THEN
    RAISE EXCEPTION 'not assigned to this language';
  END IF;

  SELECT l.code INTO v_base FROM public.languages l WHERE l.is_base LIMIT 1;
  IF p_lang = v_base THEN
    RAISE EXCEPTION 'base language rows are sync-owned';
  END IF;

  SELECT t.value INTO v_src
    FROM public.ui_translations t WHERE t.key = p_key AND t.lang_code = v_base;
  IF NOT FOUND THEN RAISE EXCEPTION 'unknown translation key'; END IF;

  v_want := public.translation_placeholders(v_src);
  v_got  := public.translation_placeholders(p_value);
  IF v_want IS DISTINCT FROM v_got THEN
    v_flag := true;
    v_note := 'placeholder mismatch: expected {' || array_to_string(v_want, '}, {') || '}';
  END IF;

  SELECT * INTO v_prev FROM public.ui_translations
   WHERE key = p_key AND lang_code = p_lang;
  v_had := FOUND;

  IF v_had AND (v_prev.value IS NOT NULL OR v_prev.status IS DISTINCT FROM 'machine') THEN
    INSERT INTO public.ui_translation_revisions
      (key, lang_code, prev_value, prev_status, prev_machine, action, changed_by)
    VALUES (p_key, p_lang, v_prev.value, v_prev.status,
            COALESCE(v_prev.machine, false), 'machine', auth.uid());
  END IF;

  INSERT INTO public.ui_translations (key, lang_code, value, status, machine,
                                      flagged, flag_note, updated_by, updated_at)
  VALUES (p_key, p_lang, p_value, 'machine', true, v_flag, v_note, auth.uid(), now())
  ON CONFLICT (key, lang_code) DO UPDATE
    SET value = EXCLUDED.value, status = 'machine', machine = true,
        flagged = EXCLUDED.flagged, flag_note = EXCLUDED.flag_note,
        updated_by = auth.uid(), updated_at = now();

  PERFORM public.log_audit('translation.machine', 'ui_translations', p_key,
    jsonb_build_object('key', p_key, 'lang', p_lang, 'action', 'machine',
                       'machine', true, 'flagged', v_flag,
                       'old_value', left(COALESCE(v_prev.value, ''), 200),
                       'new_value', left(COALESCE(p_value, ''), 200)));
END $function$;
REVOKE ALL ON FUNCTION public.admin_machine_translation_core(text, text, text) FROM PUBLIC, anon, authenticated, service_role;

CREATE OR REPLACE FUNCTION public.admin_machine_translation(p_key text, p_lang text, p_value text)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  IF NOT public.has_permission(auth.uid(), 'translations', 'machine') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('translations', 'machine');
  -- INC-951 3b — the door's authority, then its dial (staff_machine_translation), then the shared core.
  IF NOT coalesce((public.rate_gate('staff_machine_translation')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;
  PERFORM public.admin_machine_translation_core(p_key, p_lang, p_value);
END $function$;
REVOKE ALL ON FUNCTION public.admin_machine_translation(text, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_machine_translation(text, text, text) TO authenticated;

-- admin_machine_entity_translation_core: the live body of admin_machine_entity_translation byte for byte (md5(prosrc) 99dd2893c7d979f9a0703dcf6272a8ee); no gate.
CREATE FUNCTION public.admin_machine_entity_translation_core(p_type text, p_id uuid, p_field text, p_lang text, p_value text)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY INVOKER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_base text;
  v_src  text;
  v_prev text;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'translations', 'machine') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('translations', 'machine');
  IF NOT public.translation_scope_ok(p_lang) THEN
    RAISE EXCEPTION 'not assigned to this language';
  END IF;

  IF NOT ((p_type IN ('category', 'location') AND p_field = 'name')
          OR (p_type = 'attribute' AND p_field = 'label')
          OR (p_type = 'attribute' AND p_field LIKE 'option:%' AND p_lang IS DISTINCT FROM 'am')) THEN
    RAISE EXCEPTION 'unknown entity field';
  END IF;

  SELECT l.code INTO v_base FROM public.languages l WHERE l.is_base LIMIT 1;
  IF p_lang = v_base THEN
    RAISE EXCEPTION 'base language rows are sync-owned';
  END IF;

  v_src := public.entity_source_value(p_type, p_id, p_field);
  IF v_src IS NULL THEN
    RAISE EXCEPTION 'unknown entity';
  END IF;

  IF btrim(COALESCE(p_value, '')) = '' THEN
    RAISE EXCEPTION 'empty machine value';
  END IF;

  SELECT t.value INTO v_prev FROM public.entity_translations t
   WHERE t.entity_type = p_type AND t.entity_id = p_id
     AND t.field = p_field AND t.lang_code = p_lang;

  INSERT INTO public.entity_translations
    (entity_type, entity_id, field, lang_code, value, status, machine,
     flagged, flag_note, updated_by, updated_at)
  VALUES (p_type, p_id, p_field, p_lang, p_value, 'machine', true,
          false, NULL, auth.uid(), now())
  ON CONFLICT (entity_type, entity_id, field, lang_code) DO UPDATE
    SET value = EXCLUDED.value, status = 'machine', machine = true,
        flagged = false, flag_note = NULL,
        approved_by = NULL, approved_at = NULL,
        updated_by = auth.uid(), updated_at = now();

  PERFORM public.log_audit('entity_translation.machine', 'entity_translations', p_id::text,
    jsonb_build_object('type', p_type, 'id', p_id, 'field', p_field, 'lang', p_lang,
                       'action', 'machine', 'machine', true,
                       'old_value', left(COALESCE(v_prev, ''), 200),
                       'new_value', left(COALESCE(p_value, ''), 200)));
END $function$;
REVOKE ALL ON FUNCTION public.admin_machine_entity_translation_core(text, uuid, text, text, text) FROM PUBLIC, anon, authenticated, service_role;

CREATE OR REPLACE FUNCTION public.admin_machine_entity_translation(p_type text, p_id uuid, p_field text, p_lang text, p_value text)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  IF NOT public.has_permission(auth.uid(), 'translations', 'machine') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('translations', 'machine');
  -- INC-951 3b — the door's authority, then its dial (staff_machine_translation), then the shared core.
  IF NOT coalesce((public.rate_gate('staff_machine_translation')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;
  PERFORM public.admin_machine_entity_translation_core(p_type, p_id, p_field, p_lang, p_value);
END $function$;
REVOKE ALL ON FUNCTION public.admin_machine_entity_translation(text, uuid, text, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_machine_entity_translation(text, uuid, text, text, text) TO authenticated, service_role;

-- PROOF (M5a): scratch rows only, rolled back by the sentinel.
--   (1) each core: same body as the live door (md5 of prosrc), INVOKER, closed to anon,
--       authenticated and service_role; each door: DEFINER, its grants, its gate before its core
--       call and no write of its own.
--   (2) each door: with the caller's window already full (override 1, count 1), the next direct call
--       is refused 'rateLimited' and writes nothing.
--   (3) two full cycles: admin_review_photo_change and admin_save_translation — call 1 writes,
--       call 2 is refused and writes nothing.
DO $proof$
DECLARE
  v_uid     uuid := gen_random_uuid();
  v_seller  uuid := gen_random_uuid();
  v_session uuid := gen_random_uuid();
  v_door    text;
  v_dial    text;
  v_md5     text;
  v_grant   text;
  v_core    oid;
  v_def     text;
  v_cat     uuid;
  v_lst     uuid;
  v_p1      uuid;
  v_c1      uuid;
  v_c2      uuid;
  v_base    text;
  v_lang    text;
  v_key     text := 'e2e-d1-m5a.' || substr(gen_random_uuid()::text, 1, 8);
  v_msg     text;
  v_n       integer;
  v_win     integer;
BEGIN
  FOR v_door, v_dial, v_md5, v_grant IN VALUES
    ('admin_allow_listing_photo', 'staff_moderation', '04b61455ec2985e302ab9474b02b38ea', 'svc'),
    ('admin_review_photo_change', 'staff_moderation', '93e1798802419e4a8b9a9e436d9805ef', 'svc'),
    ('admin_edit_listing', 'staff_moderation', '07cd57b9091c3befe914e128318a6f44', 'svc'),
    ('admin_move_listing', 'staff_moderation', '59c64012ffe2501ad34dd2570669cefb', 'svc'),
    ('admin_save_translation', 'staff_translation', '05ae84291234466d01b27dde965b71af', 'auth'),
    ('admin_save_entity_translation', 'staff_translation', '66c953cd0ef9f4c53d194a525342bc4c', 'svc'),
    ('admin_machine_translation', 'staff_machine_translation', '4baa491f62e3f5d4599e278292c82556', 'auth'),
    ('admin_machine_entity_translation', 'staff_machine_translation', '99dd2893c7d979f9a0703dcf6272a8ee', 'svc')
  LOOP
    SELECT p.oid INTO v_core FROM pg_proc p
     WHERE p.pronamespace = 'public'::regnamespace AND p.proname = v_door || '_core';
    IF v_core IS NULL OR (SELECT md5(prosrc) FROM pg_proc WHERE oid = v_core) <> v_md5 THEN
      RAISE EXCEPTION 'M5a proof (1): % core differs from the live body', v_door;
    END IF;
    IF (SELECT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}'
          FROM pg_proc WHERE oid = v_core)
       OR has_function_privilege('anon', v_core, 'EXECUTE')
       OR has_function_privilege('authenticated', v_core, 'EXECUTE')
       OR has_function_privilege('service_role', v_core, 'EXECUTE') THEN
      RAISE EXCEPTION 'M5a proof (1): % core header or ACL differs', v_door;
    END IF;
    SELECT p.prosrc INTO v_def FROM pg_proc p
     WHERE p.pronamespace = 'public'::regnamespace AND p.proname = v_door;
    IF position('rate_gate(''' || v_dial || ''')' IN v_def) = 0
       OR position(v_door || '_core(' IN v_def) < position('rate_gate(' IN v_def)
       OR v_def ~ '(INSERT INTO|UPDATE public\.|DELETE FROM)' THEN
      RAISE EXCEPTION 'M5a proof (1): % door body is not checks, gate, core', v_door;
    END IF;
    IF NOT (SELECT prosecdef FROM pg_proc WHERE pronamespace = 'public'::regnamespace AND proname = v_door)
       OR has_function_privilege('anon', (SELECT oid FROM pg_proc WHERE pronamespace = 'public'::regnamespace AND proname = v_door), 'EXECUTE')
       OR NOT has_function_privilege('authenticated', (SELECT oid FROM pg_proc WHERE pronamespace = 'public'::regnamespace AND proname = v_door), 'EXECUTE')
       OR (v_grant = 'svc') <> has_function_privilege('service_role', (SELECT oid FROM pg_proc WHERE pronamespace = 'public'::regnamespace AND proname = v_door), 'EXECUTE') THEN
      RAISE EXCEPTION 'M5a proof (1): % door header or ACL differs', v_door;
    END IF;
  END LOOP;

  BEGIN
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
      (v_uid, 'e2e-d1-m5a-' || v_uid || '@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_seller, 'e2e-d1-m5a-' || v_seller || '@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO public.user_roles (user_id, role_id, scope_type)
    SELECT v_uid, r.id, 'global' FROM public.roles r WHERE r.name = 'super_admin';
    INSERT INTO auth.sessions (id, user_id, created_at, updated_at, aal)
    VALUES (v_session, v_uid, now(), now(), 'aal2');
    INSERT INTO auth.mfa_factors (id, user_id, friendly_name, factor_type, status, created_at, updated_at, secret)
    VALUES (gen_random_uuid(), v_uid, 'd1-m5a-proof', 'totp', 'verified', now(), now(), 'PROOFSECRET');
    INSERT INTO auth.mfa_amr_claims (id, session_id, created_at, updated_at, authentication_method)
    VALUES (gen_random_uuid(), v_session, now(), now(), 'totp');
    INSERT INTO public.rate_overrides (user_id, action, max_count) VALUES
      (v_uid, 'staff_moderation', 1), (v_uid, 'staff_translation', 1), (v_uid, 'staff_machine_translation', 1);
    PERFORM set_config('request.jwt.claims',
      json_build_object('sub', v_uid::text, 'role', 'authenticated', 'aal', 'aal2',
                        'session_id', v_session::text,
                        'amr', json_build_array(json_build_object('method', 'totp')))::text, true);

    -- (3a) admin_review_photo_change: call 1 writes, call 2 refused.
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES ('E2E D1 M5a Leaf', 'e2e-d1-m5a-' || substr(v_uid::text, 1, 8), true, true, true, 9999)
    RETURNING id INTO v_cat;
    INSERT INTO public.listings (seller_id, category_id, title, description, home_country_code)
    VALUES (v_seller, v_cat, 'E2E D1 M5a listing', 'scratch',
            (SELECT k.code FROM public.countries k ORDER BY k.code LIMIT 1))
    RETURNING id INTO v_lst;
    INSERT INTO public.listing_photos (listing_id, storage_path, display_order)
    VALUES (v_lst, 'e2e-d1-m5a/' || v_lst || '/1.webp', 0) RETURNING id INTO v_p1;
    INSERT INTO public.listing_photo_changes (listing_id, kind, photo_id) VALUES (v_lst, 'removed', v_p1) RETURNING id INTO v_c1;
    INSERT INTO public.listing_photo_changes (listing_id, kind, photo_id) VALUES (v_lst, 'removed', v_p1) RETURNING id INTO v_c2;
    PERFORM public.admin_review_photo_change(v_c1);
    v_msg := NULL;
    BEGIN
      PERFORM public.admin_review_photo_change(v_c2);
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    IF v_msg IS DISTINCT FROM 'rateLimited'
       OR (SELECT reviewed_at FROM public.listing_photo_changes WHERE id = v_c2) IS NOT NULL
       OR (SELECT count(*) FROM public.audit_log WHERE actor_id = v_uid AND action = 'listing.photo_change_reviewed') <> 1 THEN
      RAISE EXCEPTION 'M5a proof (3a): %', coalesce(v_msg, 'success');
    END IF;

    -- (3b) admin_save_translation: call 1 writes, call 2 refused.
    SELECT l.code INTO v_base FROM public.languages l WHERE l.is_base LIMIT 1;
    SELECT l.code INTO v_lang FROM public.languages l WHERE l.code <> v_base ORDER BY l.code LIMIT 1;
    INSERT INTO public.ui_translations (key, lang_code, value, status) VALUES (v_key, v_base, 'Probe', 'approved');
    PERFORM public.admin_save_translation(v_key, v_lang, 'One');
    v_msg := NULL;
    BEGIN
      PERFORM public.admin_save_translation(v_key, v_lang, 'Two');
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    IF v_msg IS DISTINCT FROM 'rateLimited'
       OR (SELECT value FROM public.ui_translations WHERE key = v_key AND lang_code = v_lang) IS DISTINCT FROM 'One'
       OR (SELECT count(*) FROM public.ui_translation_revisions WHERE key = v_key) <> 0
       OR (SELECT count(*) FROM public.audit_log WHERE actor_id = v_uid AND action = 'translation.save') <> 1 THEN
      RAISE EXCEPTION 'M5a proof (3b): %', coalesce(v_msg, 'success');
    END IF;

    -- (2) every door, its caller's window already full: the next direct call is refused, writes nothing.
    PERFORM public.rate_gate('staff_machine_translation');  -- fills the third dial's window (1 of 1)
    SELECT count(*) INTO v_n FROM public.audit_log WHERE actor_id = v_uid;
    SELECT coalesce(sum(count), 0) INTO v_win FROM public.rate_limits WHERE key = v_uid::text;
    FOR v_door IN VALUES ('allow'), ('review'), ('edit'), ('move'), ('save'), ('save_entity'), ('machine'), ('machine_entity') LOOP
      v_msg := NULL;
      BEGIN
        CASE v_door
          WHEN 'allow' THEN PERFORM public.admin_allow_listing_photo(v_p1);
          WHEN 'review' THEN PERFORM public.admin_review_photo_change(v_c2);
          WHEN 'edit' THEN PERFORM public.admin_edit_listing(v_lst, '{"title":"E2E D1 M5a edited"}'::jsonb, 'rules');
          WHEN 'move' THEN PERFORM public.admin_move_listing(v_lst, 'removed', 'rules');
          WHEN 'save' THEN PERFORM public.admin_save_translation(v_key, v_lang, 'Three');
          WHEN 'save_entity' THEN PERFORM public.admin_save_entity_translation('category', v_cat, 'name', v_lang, 'Three');
          WHEN 'machine' THEN PERFORM public.admin_machine_translation(v_key, v_lang, 'Three');
          WHEN 'machine_entity' THEN PERFORM public.admin_machine_entity_translation('category', v_cat, 'name', v_lang, 'Three');
        END CASE;
      EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
      END;
      IF v_msg IS DISTINCT FROM 'rateLimited' THEN
        RAISE EXCEPTION 'M5a proof (2): % answered %', v_door, coalesce(v_msg, 'success');
      END IF;
    END LOOP;
    IF (SELECT count(*) FROM public.audit_log WHERE actor_id = v_uid) <> v_n
       OR (SELECT coalesce(sum(count), 0) FROM public.rate_limits WHERE key = v_uid::text) <> v_win
       OR (SELECT value FROM public.ui_translations WHERE key = v_key AND lang_code = v_lang) IS DISTINCT FROM 'One'
       OR (SELECT title FROM public.listings WHERE id = v_lst) <> 'E2E D1 M5a listing'
       OR (SELECT status FROM public.listings WHERE id = v_lst) = 'removed'
       OR (SELECT reviewed_at FROM public.listing_photo_changes WHERE id = v_c2) IS NOT NULL
       OR EXISTS (SELECT 1 FROM public.entity_translations WHERE entity_id::text = v_cat::text) THEN
      RAISE EXCEPTION 'M5a proof (2): a refused call wrote';
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'd1-m5a-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'd1-m5a-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261029050000');
