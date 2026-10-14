-- Bundle 14 (the admin's page of one ad), turn 3 (2026-10-14). Tier A. D172 (the operator, 2026-10-14): "change
-- category should not be an option on edit ... should disable that feature of changing category by user or admin on
-- published add even waiting in que for approval because so many specification, descriptions etc will change." The
-- admin's Edit no longer offers it (turn 2); here both doors refuse it.
-- e2e-areas: admin-listings, posting
--
-- A. admin_edit_listing, redeclared whole from 20261012042142 with one change: after the listing is read and before
--    anything is judged or written, a change of category is refused ('the category of a posted listing is not
--    changed'), unless the undo door is the caller (app.listing_undo on): it may put back a category an edit made
--    before D172 had moved. A change that names the listing's own leaf is no move and passes. Every other line stands
--    byte for byte; its header (VOLATILE, SECURITY DEFINER, search_path public), REVOKE and GRANTs are restated.
-- B. edit_listing (the seller's edit of a published listing), redeclared whole from 20261006225254 with one change:
--    after the status check, another leaf is refused with the same words. Every other line stands byte for byte; its
--    header, REVOKE and GRANTs are restated.
-- C. Proofs (RAISE EXCEPTION on any failure; a clean apply is the pass): both headers and privileges; each check is
--    in its body and comes before the content judge and every write; the rest of each body is the earlier body;
--    calls with no session are refused at the first gate. The doors' behaviour is proven by AL-29 (and AL-5, whose
--    seller edit names the listing's own leaf and reaches the content judge).

-- ===== A — an admin's edit never moves a posted listing to another category =====
CREATE OR REPLACE FUNCTION public.admin_edit_listing(
  p_listing_id uuid, p_changes jsonb, p_reason text, p_note text DEFAULT NULL)
RETURNS jsonb
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
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
END $$;

REVOKE ALL ON FUNCTION public.admin_edit_listing(uuid, jsonb, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_edit_listing(uuid, jsonb, text, text) TO authenticated;
GRANT ALL ON FUNCTION public.admin_edit_listing(uuid, jsonb, text, text) TO service_role;

-- ===== B — the seller's edit never moves a posted listing to another category =====
CREATE OR REPLACE FUNCTION public.edit_listing(p_listing_id uuid, p_category_id uuid, p_title text, p_description text, p_video_url text, p_attributes jsonb, p_price_mode text, p_price_amount numeric, p_price_currency character, p_price_period text, p_poster_expires_at timestamp with time zone, p_coverage uuid[], p_contact_pref jsonb, p_price_bp integer DEFAULT NULL::integer, p_price_negotiable boolean DEFAULT false)
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
  v_before jsonb;
  v_after  jsonb;
  v_diff_a jsonb := '{}'::jsonb;
  v_diff_b jsonb := '{}'::jsonb;
  v_key    text;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF EXISTS (SELECT 1 FROM public.profiles WHERE user_id = v_uid AND account_status = 'deactivated') THEN
    RAISE EXCEPTION 'account is deactivated';
  END IF;
  IF NOT coalesce((public.rate_gate('revise')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;
  SELECT * INTO v_prev FROM public.listings WHERE id = p_listing_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'listing not found'; END IF;
  IF v_prev.seller_id <> v_uid THEN RAISE EXCEPTION 'not your listing'; END IF;
  IF v_prev.status NOT IN ('active','reduced','rejected','held','expired') THEN
    RAISE EXCEPTION 'edit_listing takes a published listing; a draft writes through submit_listing';
  END IF;
  -- D172 (the operator, 2026-10-14) — a posted ad's category is never changed.
  IF p_category_id IS DISTINCT FROM v_prev.category_id THEN
    RAISE EXCEPTION 'the category of a posted listing is not changed';
  END IF;

  -- M5 — the judge at step 8 also refuses an unnamed seller and an
  -- unconfirmed home country, with the same fields as on publish.
  v_val := public.validate_listing_draft(v_uid, 8::smallint, p_category_id, p_title, p_description,
             p_video_url, p_attributes, p_price_mode, p_price_amount, p_price_currency,
             p_price_period, p_poster_expires_at, p_coverage, p_contact_pref, v_prev.attributes,
             p_price_bp, p_price_negotiable);
  IF NOT coalesce((v_val->>'ok')::boolean, false) THEN
    RETURN v_val;
  END IF;

  UPDATE public.listings SET
    category_id       = p_category_id,
    location_id       = (v_val->>'location_id')::uuid,
    title             = v_val->>'title',
    description       = v_val->>'description',
    attributes        = v_val->'attrs',
    price_amount      = (v_val->>'price_amount')::numeric,
    price_currency    = (v_val->>'price_currency')::char(3),
    price_mode        = v_val->>'price_mode',
    price_period      = v_val->>'price_period',
    price_bp          = (v_val->>'price_bp')::integer,
    price_negotiable  = coalesce((v_val->>'price_negotiable')::boolean, false),
    poster_expires_at = p_poster_expires_at,
    video_url         = p_video_url,
    contact_pref      = p_contact_pref,
    -- M5 / DEC-109 — the unit the ad is sold per, from the basis in force.
    price_unit        = v_val->>'price_unit',
    price_unit_text   = v_val->>'price_unit_text',
    status            = 'screening',
    updated_at        = now()
  WHERE id = p_listing_id
  RETURNING * INTO v_row;

  DELETE FROM public.listing_locations WHERE listing_id = p_listing_id;
  INSERT INTO public.listing_locations (listing_id, location_id, position)
      SELECT p_listing_id, c.id, row_number() OVER (ORDER BY c.first_position)::integer
        FROM (SELECT u.id, min(u.ordinality) AS first_position
                FROM unnest(p_coverage) WITH ORDINALITY u(id, ordinality)
               GROUP BY u.id) c ON CONFLICT DO NOTHING;

  v_after  := to_jsonb(v_row) - 'search_tsv';
  v_before := to_jsonb(v_prev) - 'search_tsv';
  FOR v_key IN SELECT k FROM jsonb_object_keys(v_after) k LOOP
    IF (v_after->v_key) IS DISTINCT FROM (v_before->v_key) THEN
      v_diff_a := v_diff_a || jsonb_build_object(v_key, v_after->v_key);
      v_diff_b := v_diff_b || jsonb_build_object(v_key, v_before->v_key);
    END IF;
  END LOOP;

  INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
    VALUES (p_listing_id, v_uid, 'edit', v_diff_b, v_diff_a, v_uid);

  RETURN jsonb_build_object('ok', true, 'status', 'screening');
END $function$;
REVOKE ALL ON FUNCTION public.edit_listing(uuid, uuid, text, text, text, jsonb, text, numeric, character, text, timestamp with time zone, uuid[], jsonb, integer, boolean) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.edit_listing(uuid, uuid, text, text, text, jsonb, text, numeric, character, text, timestamp with time zone, uuid[], jsonb, integer, boolean) TO authenticated;
GRANT ALL ON FUNCTION public.edit_listing(uuid, uuid, text, text, text, jsonb, text, numeric, character, text, timestamp with time zone, uuid[], jsonb, integer, boolean) TO service_role;

-- ===== C — proofs =====
DO $proof$
DECLARE
  v_fn  text;
  v_def text;
  v_msg text;
BEGIN
  -- C1. Headers and privileges, as before.
  FOREACH v_fn IN ARRAY ARRAY[
    'public.admin_edit_listing(uuid,jsonb,text,text)',
    'public.edit_listing(uuid,uuid,text,text,text,jsonb,text,numeric,character,text,timestamp with time zone,uuid[],jsonb,integer,boolean)'] LOOP
    IF NOT EXISTS (SELECT 1 FROM pg_proc p WHERE p.oid = v_fn::regprocedure
                    AND p.provolatile = 'v' AND p.prosecdef
                    AND p.proconfig = ARRAY['search_path=public']) THEN
      RAISE EXCEPTION 'D172 C1: % is not a volatile definer with its search path', v_fn;
    END IF;
    IF has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'D172 C1: % privileges', v_fn;
    END IF;
  END LOOP;

  -- C2. Each check is in its body, before the content judge and every write; the rest is the earlier body.
  SELECT p.prosrc INTO v_def FROM pg_proc p
   WHERE p.oid = 'public.admin_edit_listing(uuid,jsonb,text,text)'::regprocedure;
  IF v_def NOT LIKE '%v_prev.seller_id = v_uid%the category of a posted listing is not changed%remove_photos must be a list%validate_listing_draft(v_prev.seller_id, 5::smallint,%UPDATE public.listings SET%' THEN
    RAISE EXCEPTION 'D172 C2: admin_edit_listing''s category check is missing or out of place';
  END IF;
  IF md5(replace(v_def, '  -- D172 (the operator, 2026-10-14) — a posted ad''s category is never changed. The undo door alone may put back a
  -- category that an edit made before D172 had moved: app.listing_undo is on only for its own call.
  IF p_changes ? ''category_id''
     AND (p_changes->>''category_id'')::uuid IS DISTINCT FROM v_prev.category_id
     AND coalesce(current_setting(''app.listing_undo'', true), '''') <> ''on'' THEN
    RAISE EXCEPTION ''the category of a posted listing is not changed'';
  END IF;
', '')) <> '2b8996b334aa7c8b2140624a0baa7619' THEN
    RAISE EXCEPTION 'D172 C2: admin_edit_listing differs from 20261012042142 beyond the category check';
  END IF;
  SELECT p.prosrc INTO v_def FROM pg_proc p
   WHERE p.oid = 'public.edit_listing(uuid,uuid,text,text,text,jsonb,text,numeric,character,text,timestamp with time zone,uuid[],jsonb,integer,boolean)'::regprocedure;
  IF v_def NOT LIKE '%a draft writes through submit_listing%the category of a posted listing is not changed%validate_listing_draft(v_uid, 8::smallint,%UPDATE public.listings SET%' THEN
    RAISE EXCEPTION 'D172 C2: edit_listing''s category check is missing or out of place';
  END IF;
  IF md5(replace(v_def, '  -- D172 (the operator, 2026-10-14) — a posted ad''s category is never changed.
  IF p_category_id IS DISTINCT FROM v_prev.category_id THEN
    RAISE EXCEPTION ''the category of a posted listing is not changed'';
  END IF;
', '')) <> 'fb9e713e8429fe55ffc18f85db4570a7' THEN
    RAISE EXCEPTION 'D172 C2: edit_listing differs from 20261006225254 beyond the category check';
  END IF;

  -- C3. No session: refused at the first gate, before any read.
  BEGIN
    PERFORM public.admin_edit_listing(gen_random_uuid(), jsonb_build_object('category_id', gen_random_uuid()), 'misleading');
    RAISE EXCEPTION 'D172 C3: admin_edit_listing answered a call with no session';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'not signed in' THEN RAISE EXCEPTION 'D172 C3: admin_edit_listing: %', v_msg; END IF;
  END;
  BEGIN
    PERFORM public.edit_listing(gen_random_uuid(), gen_random_uuid(), 't', 'd', NULL, '{}'::jsonb, 'fixed', 1::numeric,
                                'ETB'::character(3), 'once', NULL::timestamptz, ARRAY[]::uuid[], '{}'::jsonb);
    RAISE EXCEPTION 'D172 C3: edit_listing answered a call with no session';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'not authenticated' THEN RAISE EXCEPTION 'D172 C3: edit_listing: %', v_msg; END IF;
  END;
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261015040000') ON CONFLICT (version) DO NOTHING;
