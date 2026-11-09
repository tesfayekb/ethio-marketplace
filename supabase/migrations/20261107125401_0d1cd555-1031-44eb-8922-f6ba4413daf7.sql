-- e2e-areas: my-listings, admin-listings
-- P-2 turn (c) M-3b, part 6 of 6 — THE DOORS THAT SEND NO PLACES PASS THEIR AD (docs/governance/briefs/p2-fold.md
-- STEP 2; ruling 1 of docs/governance/briefs/p2-fold-ruling-1.md §4; ruling 3 — DEC-351). Split by concern
-- (rule 30: about 25 KB a file); with it every caller of the judge passes its ad.
-- 1. public.set_listing_price redeclared whole from 20261014194317 (its last declaration; service-only since
--    20261106052000, retired by DEC-335), header, arguments and grants unchanged, one fragment: the judge's last
--    argument is its ad.
-- 2. public.admin_edit_listing_core redeclared whole from 20261028233839 (its last declaration; SECURITY
--    INVOKER, executable by no role — admin_edit_listing's body calls it), header, arguments and grants
--    unchanged, one fragment: the judge's last argument is its ad.
-- Proofs: both headers and grants; each body its last declaration's but for its fragment (md5 with the
-- fragment put back, law 13). Neither door gains a behaviour proof here: both send the judge no places
-- (coverage NULL), so the reach's caps never apply to their calls.

DO $pre$
DECLARE
  v_md5 text;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261107140400') THEN
    RAISE EXCEPTION 'P-2 (c) M-3b part 6: part 5 (19c38d6c, mark 20261107140400) must be applied first';
  END IF;
  -- G39: each body this file redeclares is, live, the body of its last declaration.
  SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p
   WHERE p.oid = 'public.set_listing_price(uuid, text, numeric, character, text, integer, boolean)'::regprocedure;
  IF v_md5 IS DISTINCT FROM '15e599df63caf7f023401e3ca8a04137' THEN
    RAISE EXCEPTION 'P-2 (c) M-3b part 6: live set_listing_price is not 20261014194317''s body (%)', v_md5;
  END IF;
  SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p
   WHERE p.oid = 'public.admin_edit_listing_core(uuid, jsonb, text, text)'::regprocedure;
  IF v_md5 IS DISTINCT FROM '07cd57b9091c3befe914e128318a6f44' THEN
    RAISE EXCEPTION 'P-2 (c) M-3b part 6: live admin_edit_listing_core is not 20261028233839''s body (%)', v_md5;
  END IF;
END $pre$;

-- ------------------------------------------------------------ 1. set_listing_price (whole from 20261014194317 :702)
CREATE OR REPLACE FUNCTION public.set_listing_price(p_listing_id uuid, p_price_mode text, p_price_amount numeric,
  p_price_currency character, p_price_period text, p_price_bp integer DEFAULT NULL::integer,
  p_price_negotiable boolean DEFAULT false)
 RETURNS jsonb
 LANGUAGE plpgsql
 VOLATILE
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid    uuid := auth.uid();
  v_prev   public.listings%ROWTYPE;
  v_row    public.listings%ROWTYPE;
  v_val    jsonb;
  v_before jsonb := '{}'::jsonb;
  v_after  jsonb := '{}'::jsonb;
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
  -- D174 1, D177 — a price change on a live or closed ad applies at once, with no review: it carries no free text
  -- (a typed price note goes through edit_listing and its review).
  IF v_prev.status NOT IN ('active','reduced','closed') THEN
    RAISE EXCEPTION 'the price of this listing is changed through its edit';
  END IF;
  -- The posting judge through step 5, as staff's edit is judged (D140, DEC-173, INC-552): the price with every other
  -- field the price does not change read from the listing as it stands; the seller's own end date and places are not
  -- sent, and the contact and review steps are not reached — a price box cannot answer their refusals.
  v_val := public.validate_listing_draft(v_uid, 5::smallint, v_prev.category_id, v_prev.title, v_prev.description,
             v_prev.video_url, v_prev.attributes, p_price_mode, p_price_amount, p_price_currency,
             p_price_period, NULL, NULL, v_prev.contact_pref, v_prev.attributes,
             p_price_bp, p_price_negotiable, p_listing_id);
  IF NOT coalesce((v_val->>'ok')::boolean, false) THEN
    RETURN v_val;
  END IF;
  UPDATE public.listings SET
    price_mode       = v_val->>'price_mode',
    price_amount     = (v_val->>'price_amount')::numeric,
    price_currency   = (v_val->>'price_currency')::char(3),
    price_period     = v_val->>'price_period',
    price_bp         = (v_val->>'price_bp')::integer,
    price_negotiable = coalesce((v_val->>'price_negotiable')::boolean, false),
    price_unit       = v_val->>'price_unit',
    price_unit_text  = v_val->>'price_unit_text',
    updated_at       = now()
  WHERE id = p_listing_id
  RETURNING * INTO v_row;
  FOREACH v_key IN ARRAY ARRAY['price_mode','price_amount','price_currency','price_period','price_bp',
                               'price_negotiable','price_unit','price_unit_text','price_was','price_drop_at'] LOOP
    IF (to_jsonb(v_row)->v_key) IS DISTINCT FROM (to_jsonb(v_prev)->v_key) THEN
      v_after := v_after || jsonb_build_object(v_key, to_jsonb(v_row)->v_key);
      v_before := v_before || jsonb_build_object(v_key, to_jsonb(v_prev)->v_key);
    END IF;
  END LOOP;
  IF v_after <> '{}'::jsonb THEN
    INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
      VALUES (p_listing_id, v_uid, 'edit', v_before, v_after, v_uid);
  END IF;
  RETURN jsonb_build_object('ok', true, 'status', v_row.status, 'price_was', v_row.price_was,
                            'price_drop_at', v_row.price_drop_at);
END $function$;
REVOKE ALL ON FUNCTION public.set_listing_price(uuid, text, numeric, character, text, integer, boolean) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.set_listing_price(uuid, text, numeric, character, text, integer, boolean) TO service_role;

-- ------------------------------------------------------------ 2. admin_edit_listing_core (whole from 20261028233839 :135)
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

-- ------------------------------------------------------------ 3. PROOFS
DO $proof$
DECLARE
  v_fn     regprocedure;
  v_secdef boolean;
  v_svc    boolean;
  v_new    text;
  v_old    text;
  v_want   text;
  v_src    text;
  v_k      integer;
BEGIN
  -- Both sides without chr(13) (INC-1056, law 13): prosrc, and each literal.
  FOR v_fn, v_secdef, v_svc, v_new, v_old, v_want IN
    SELECT * FROM (VALUES
      ('public.set_listing_price(uuid, text, numeric, character, text, integer, boolean)'::regprocedure,
       true, true,
       E'             p_price_bp, p_price_negotiable, p_listing_id);\n',
       E'             p_price_bp, p_price_negotiable);\n',
       '15e599df63caf7f023401e3ca8a04137'),
      ('public.admin_edit_listing_core(uuid, jsonb, text, text)'::regprocedure,
       false, false,
       E'         ELSE v_prev.price_negotiable END, p_listing_id);\n',
       E'         ELSE v_prev.price_negotiable END);\n',
       '07cd57b9091c3befe914e128318a6f44')) t(f, d, s, n, o, m)
  LOOP
    IF (SELECT prosecdef IS DISTINCT FROM v_secdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR has_function_privilege('authenticated', v_fn, 'EXECUTE')
       OR has_function_privilege('service_role', v_fn, 'EXECUTE') IS DISTINCT FROM v_svc THEN
      RAISE EXCEPTION 'P-2 (c) M-3b part 6 proof: the header or grants of % differ', v_fn;
    END IF;
    SELECT replace(p.prosrc, chr(13), '') INTO v_src FROM pg_proc p WHERE p.oid = v_fn;
    v_k := (length(v_src) - length(replace(v_src, v_new, ''))) / length(v_new);
    IF v_k <> 1 THEN
      RAISE EXCEPTION 'P-2 (c) M-3b part 6 proof: the fragment of % occurs % times', v_fn, v_k;
    END IF;
    IF md5(replace(v_src, v_new, v_old)) IS DISTINCT FROM v_want THEN
      RAISE EXCEPTION 'P-2 (c) M-3b part 6 proof: % differs from its last declaration beyond this file''s fragment (%)',
        v_fn, md5(replace(v_src, v_new, v_old));
    END IF;
  END LOOP;
END;
$proof$;

-- ------------------------------------------------------------ 4. CLOSERS
REVOKE ALL ON FUNCTION public.set_listing_price(uuid, text, numeric, character, text, integer, boolean) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.set_listing_price(uuid, text, numeric, character, text, integer, boolean) TO service_role;
REVOKE ALL ON FUNCTION public.admin_edit_listing_core(uuid, jsonb, text, text) FROM PUBLIC, anon, authenticated, service_role;

INSERT INTO public.migration_marks (version) VALUES ('20261107140500') ON CONFLICT DO NOTHING;
