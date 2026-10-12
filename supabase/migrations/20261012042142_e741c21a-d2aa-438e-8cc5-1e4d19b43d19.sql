-- Bundle 11, the Listings console, turn L4d (2026-10-12). Tier A. Undo an admin's edit (D141).
-- e2e-areas: admin-listings
-- A. seller_notices: the reason list gains 'undo' (the seller is told that an admin's edit was undone).
-- B. admin_edit_listing, redeclared whole from 20261011143218 with one change: the reason 'undo' is accepted only
--    while app.listing_undo is on, which only admin_undo_listing_edit turns on, for its own call; every other caller
--    still gets 'unknown reason'. Every other line stands byte for byte.
-- C. admin_undo_listing_edit(listing, at, note) — NEW: listings:enforce with a fresh second factor; the listing's
--    newest revision must be the one at `at`, an edit by staff that is not itself an undo and removed no photo; every
--    value that edit wrote must still be the listing's; then the edit's before-values (the content, the category,
--    the specifications and the price) are sent back through admin_edit_listing with the reason 'undo' — the same
--    rules, one revision, one audit row and one seller notice, as any admin edit. Refusals: 'nothing to undo', 'the
--    listing has changed since this edit', 'a photo removal is not undone', and admin_edit_listing's own.
-- D. Proofs: catalogue reads and calls with no session or a scratch identity that holds nothing; the doors'
--    behaviour is proven by AL-26 and AL-27.

-- ===== A — the seller's notices: the reason 'undo' =====
ALTER TABLE public.seller_notices DROP CONSTRAINT seller_notices_reason_check;
ALTER TABLE public.seller_notices ADD CONSTRAINT seller_notices_reason_check
  CHECK (reason IN ('wrong_category','misleading','prohibited','duplicate','contact_in_text','photo','rules',
                    'removed_in_error','appeal_accepted','other','undo'));

-- ===== B — an admin's content edit: the reason 'undo' from the undo door only =====
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

-- ===== C — undo an admin's edit =====
CREATE OR REPLACE FUNCTION public.admin_undo_listing_edit(
  p_listing_id uuid, p_at timestamptz, p_note text DEFAULT NULL)
RETURNS jsonb
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid     uuid := auth.uid();
  v_row     public.listings%ROWTYPE;
  v_rev     public.listing_revisions%ROWTYPE;
  v_now     jsonb;
  v_key     text;
  v_changes jsonb := '{}'::jsonb;
  v_out     jsonb;
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

  SELECT * INTO v_row FROM public.listings WHERE id = p_listing_id FOR UPDATE;
  -- A draft is the seller's private work: it is not found here (D136).
  IF NOT FOUND OR v_row.status = 'draft' THEN
    RAISE EXCEPTION 'listing not found';
  END IF;

  -- The listing's newest revision, in the order its History shows them.
  SELECT * INTO v_rev FROM public.listing_revisions r
   WHERE r.listing_id = p_listing_id
   ORDER BY r.created_at DESC, r.id DESC
   LIMIT 1;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'nothing to undo';
  END IF;
  IF p_at IS NULL OR v_rev.created_at <> p_at THEN
    RAISE EXCEPTION 'the listing has changed since this edit';
  END IF;
  IF v_rev.kind <> 'edit' OR v_rev.actor IS NULL OR v_rev.actor = v_rev.seller_id
     OR jsonb_typeof(v_rev.before) IS DISTINCT FROM 'object' OR jsonb_typeof(v_rev.after) IS DISTINCT FROM 'object'
     -- An undo is not undone again: the admin edits the listing instead.
     OR EXISTS (SELECT 1 FROM public.seller_notices sn
                 WHERE sn.listing_id = p_listing_id AND sn.created_at = v_rev.created_at AND sn.reason = 'undo') THEN
    RAISE EXCEPTION 'nothing to undo';
  END IF;
  IF v_rev.after ? 'photos_removed' THEN
    RAISE EXCEPTION 'a photo removal is not undone';
  END IF;

  -- Every value the edit wrote must still be the listing's.
  v_now := to_jsonb(v_row);
  FOR v_key IN SELECT k FROM jsonb_object_keys(v_rev.after) k LOOP
    IF (v_now->v_key) IS DISTINCT FROM (v_rev.after->v_key) THEN
      RAISE EXCEPTION 'the listing has changed since this edit';
    END IF;
  END LOOP;

  -- The edit's before-values for what an admin can change; the price's unit follows from them.
  FOR v_key IN SELECT k FROM jsonb_object_keys(v_rev.before) k LOOP
    IF v_key IN ('title','description','category_id','attributes','price_mode','price_amount',
                 'price_currency','price_period','price_bp','price_negotiable') THEN
      v_changes := v_changes || jsonb_build_object(v_key, v_rev.before->v_key);
    END IF;
  END LOOP;
  IF v_changes = '{}'::jsonb THEN
    RAISE EXCEPTION 'nothing to undo';
  END IF;

  -- The same door as any admin edit: the same rules, one revision, one audit row and one seller notice.
  PERFORM set_config('app.listing_undo', 'on', true);
  v_out := public.admin_edit_listing(p_listing_id, v_changes, 'undo', p_note);
  PERFORM set_config('app.listing_undo', 'off', true);
  RETURN v_out;
END $$;

REVOKE ALL ON FUNCTION public.admin_undo_listing_edit(uuid, timestamptz, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_undo_listing_edit(uuid, timestamptz, text) TO authenticated;
GRANT ALL ON FUNCTION public.admin_undo_listing_edit(uuid, timestamptz, text) TO service_role;

-- ===== D — proofs (catalogue reads, and calls with no session or a scratch identity that holds nothing) =====
DO $proof$
DECLARE
  v_fn  text;
  v_def text;
  v_err text;
  v_who uuid := gen_random_uuid();
BEGIN
  -- D1: both doors are volatile definers with a fixed search path; the signed-in role runs them, anon and PUBLIC
  -- do not.
  FOREACH v_fn IN ARRAY ARRAY[
      'public.admin_edit_listing(uuid,jsonb,text,text)',
      'public.admin_undo_listing_edit(uuid,timestamptz,text)'] LOOP
    IF NOT (SELECT p.prosecdef FROM pg_catalog.pg_proc p WHERE p.oid = v_fn::regprocedure)
       OR (SELECT p.proconfig FROM pg_catalog.pg_proc p WHERE p.oid = v_fn::regprocedure) <> ARRAY['search_path=public']
       OR (SELECT p.provolatile FROM pg_catalog.pg_proc p WHERE p.oid = v_fn::regprocedure) <> 'v' THEN
      RAISE EXCEPTION 'L4d D1: % is not a volatile definer with its search path', v_fn;
    END IF;
    IF has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE')
       OR EXISTS (SELECT 1 FROM pg_catalog.pg_proc p, aclexplode(p.proacl) x
                   WHERE p.oid = v_fn::regprocedure AND x.grantee = 0) THEN
      RAISE EXCEPTION 'L4d D1: % privileges', v_fn;
    END IF;
  END LOOP;

  -- D2: the edit's gates and rules as before; 'undo' only while the undo door's setting is on.
  v_def := pg_get_functiondef('public.admin_edit_listing(uuid,jsonb,text,text)'::regprocedure);
  IF v_def NOT LIKE '%has_permission(v_uid, ''listings'', ''enforce'')%require_step_up_if_needed(''listings'', ''enforce'')%AND NOT (p_reason = ''undo'' AND coalesce(current_setting(''app.listing_undo'', true), '''') = ''on'')%v_prev.status = ''draft''%v_prev.status = ''removed''%v_prev.seller_id = v_uid%validate_listing_draft(v_prev.seller_id, 5::smallint,%INSERT INTO public.listing_revisions%INSERT INTO public.audit_log%INSERT INTO public.seller_notices%' THEN
    RAISE EXCEPTION 'L4d D2: admin_edit_listing''s gates, its reasons or its rules';
  END IF;

  -- D3: the undo door's gates in order, its checks, and the one call it makes.
  v_def := pg_get_functiondef('public.admin_undo_listing_edit(uuid,timestamptz,text)'::regprocedure);
  IF v_def NOT LIKE '%has_permission(v_uid, ''listings'', ''enforce'')%require_step_up_if_needed(''listings'', ''enforce'')%FOR UPDATE%v_rev.created_at <> p_at%v_rev.kind <> ''edit''%sn.reason = ''undo''%photos_removed%IS DISTINCT FROM (v_rev.after->v_key)%set_config(''app.listing_undo'', ''on'', true)%public.admin_edit_listing(p_listing_id, v_changes, ''undo'', p_note)%set_config(''app.listing_undo'', ''off'', true)%' THEN
    RAISE EXCEPTION 'L4d D3: admin_undo_listing_edit''s gates or its checks';
  END IF;
  IF v_def LIKE '%UPDATE public.%' OR v_def LIKE '%INSERT INTO%' OR v_def LIKE '%DELETE%' THEN
    RAISE EXCEPTION 'L4d D3: the undo door writes only through admin_edit_listing';
  END IF;

  -- D4: the seller's notices take the reason 'undo'.
  IF pg_get_constraintdef((SELECT c.oid FROM pg_catalog.pg_constraint c
                            WHERE c.conrelid = 'public.seller_notices'::regclass
                              AND c.conname = 'seller_notices_reason_check')) NOT LIKE '%''undo''%' THEN
    RAISE EXCEPTION 'L4d D4: seller_notices does not take the reason undo';
  END IF;

  -- D5: with no session, both doors refuse before reading anything; 'undo' is refused without the undo door.
  PERFORM set_config('request.jwt.claims', '', true);
  FOREACH v_fn IN ARRAY ARRAY['edit', 'undo'] LOOP
    v_err := NULL;
    BEGIN
      IF v_fn = 'edit' THEN
        PERFORM public.admin_edit_listing(NULL, '{"title":"x"}'::jsonb, 'misleading');
      ELSE
        PERFORM public.admin_undo_listing_edit(NULL, now());
      END IF;
    EXCEPTION WHEN OTHERS THEN
      v_err := SQLERRM;
    END;
    IF v_err IS DISTINCT FROM 'not signed in' THEN
      RAISE EXCEPTION 'L4d D5: the % door answered % to a call with no session', v_fn, coalesce(v_err, 'nothing');
    END IF;
  END LOOP;
  IF current_setting('app.listing_undo', true) IS NOT DISTINCT FROM 'on' THEN
    RAISE EXCEPTION 'L4d D5: the undo setting is on outside the undo door';
  END IF;

  -- D6: a scratch identity that holds no permission (no account row is written) is refused by both.
  PERFORM set_config('request.jwt.claims', json_build_object('sub', v_who, 'role', 'authenticated')::text, true);
  FOREACH v_fn IN ARRAY ARRAY['edit', 'undo'] LOOP
    v_err := NULL;
    BEGIN
      IF v_fn = 'edit' THEN
        PERFORM public.admin_edit_listing(NULL, '{"title":"x"}'::jsonb, 'undo');
      ELSE
        PERFORM public.admin_undo_listing_edit(NULL, now());
      END IF;
    EXCEPTION WHEN OTHERS THEN
      v_err := SQLERRM;
    END;
    IF v_err IS DISTINCT FROM 'permission denied' THEN
      RAISE EXCEPTION 'L4d D6: the % door answered % to an identity with no permission', v_fn, coalesce(v_err, 'nothing');
    END IF;
  END LOOP;
  PERFORM set_config('request.jwt.claims', '', true);
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261012170000') ON CONFLICT (version) DO NOTHING;
