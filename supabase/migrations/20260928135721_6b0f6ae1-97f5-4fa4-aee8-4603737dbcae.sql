-- INC-321 — the door's answer carries the stored currency.
-- submit_listing re-declared WHOLE (INC-183), same signature; base 20260928034942:699–840
-- verbatim except the RETURN of the ok path. Closers restated in-file.

CREATE OR REPLACE FUNCTION public.submit_listing(
  p_listing_id uuid,
  p_step smallint,
  p_category_id uuid,
  p_title text,
  p_description text,
  p_video_url text,
  p_attributes jsonb,
  p_price_mode text,
  p_price_amount numeric,
  p_price_currency char(3),
  p_price_period text,
  p_poster_expires_at timestamptz,
  p_coverage uuid[],
  p_contact_pref jsonb,
  p_price_bp integer DEFAULT NULL,
  p_price_negotiable boolean DEFAULT false
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid    uuid := auth.uid();
  v_obs    char(2);
  v_prev   public.listings%ROWTYPE;
  v_row    public.listings%ROWTYPE;
  v_val    jsonb;
  v_step   smallint;
  v_id     uuid;
  v_before jsonb;
  v_after  jsonb;
  v_diff_b jsonb := '{}'::jsonb;
  v_diff_a jsonb := '{}'::jsonb;
  v_key    text;
BEGIN
  -- F5: gates -> capture -> mutate. A refusal writes nothing.
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF EXISTS (SELECT 1 FROM public.profiles WHERE user_id = v_uid AND account_status = 'deactivated') THEN
    RAISE EXCEPTION 'account is deactivated';
  END IF;
  IF p_step IS NULL OR p_step < 1 OR p_step > 8 THEN RAISE EXCEPTION 'unknown step'; END IF;

  IF p_listing_id IS NOT NULL THEN
    SELECT * INTO v_prev FROM public.listings WHERE id = p_listing_id;
    IF NOT FOUND THEN RAISE EXCEPTION 'listing not found'; END IF;
    IF v_prev.seller_id <> v_uid THEN RAISE EXCEPTION 'not your listing'; END IF;
    IF v_prev.status <> 'draft' THEN
      RAISE EXCEPTION 'only a draft is writable here; a live listing edits through edit_listing';
    END IF;
  END IF;

  -- DEC-068: residency is a server fact, never client-supplied.
  SELECT d.observed_country_code INTO v_obs FROM public.user_directory d WHERE d.user_id = v_uid;
  IF v_obs IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'refusals',
      jsonb_build_array(jsonb_build_object('field','residency','reason','residencyUnknown')));
  END IF;

  v_step := greatest(coalesce(v_prev.draft_step, 0::smallint), p_step);

  v_val := public.validate_listing_draft(v_uid, p_step, p_category_id, p_title, p_description,
             p_video_url, p_attributes, p_price_mode, p_price_amount, p_price_currency,
             p_price_period, p_poster_expires_at, p_coverage, p_contact_pref,
             coalesce(v_prev.attributes, '{}'::jsonb), p_price_bp, p_price_negotiable);
  IF NOT coalesce((v_val->>'ok')::boolean, false) THEN
    RETURN v_val;
  END IF;

  IF p_listing_id IS NULL THEN
    INSERT INTO public.listings (
      seller_id, category_id, location_id, title, description, attributes,
      price_amount, price_currency, price_bp, price_negotiable, price_mode, price_period, poster_expires_at,
      video_url, contact_pref, status, home_country_code, draft_step, draft_updated_at
    ) VALUES (
      v_uid, p_category_id, (v_val->>'location_id')::uuid, v_val->>'title', v_val->>'description',
      v_val->'attrs', (v_val->>'price_amount')::numeric, (v_val->>'price_currency')::char(3),
      (v_val->>'price_bp')::int, coalesce((v_val->>'price_negotiable')::boolean, false), v_val->>'price_mode', v_val->>'price_period', p_poster_expires_at,
      p_video_url, coalesce(p_contact_pref, '{"messages": true}'::jsonb), 'draft', v_obs,
      v_step, now()
    ) RETURNING * INTO v_row;
    v_id := v_row.id;
  ELSE
    UPDATE public.listings SET
      category_id       = p_category_id,
      location_id       = coalesce((v_val->>'location_id')::uuid, location_id),
      title             = v_val->>'title',
      description       = v_val->>'description',
      attributes        = v_val->'attrs',
      price_amount      = (v_val->>'price_amount')::numeric,
      price_currency    = (v_val->>'price_currency')::char(3),
      price_bp          = (v_val->>'price_bp')::int,
      price_negotiable  = coalesce((v_val->>'price_negotiable')::boolean, false),
      price_mode        = v_val->>'price_mode',
      price_period      = v_val->>'price_period',
      poster_expires_at = p_poster_expires_at,
      video_url         = p_video_url,
      contact_pref      = coalesce(p_contact_pref, contact_pref),
      home_country_code = v_obs,
      draft_step        = v_step,
      draft_updated_at  = now(),
      updated_at        = now()
    WHERE id = p_listing_id
    RETURNING * INTO v_row;
    v_id := v_row.id;
  END IF;

  -- Coverage replaces wholesale (batch) once step 6 has spoken.
  IF p_coverage IS NOT NULL AND array_length(p_coverage, 1) IS NOT NULL THEN
    DELETE FROM public.listing_locations WHERE listing_id = v_id;
    INSERT INTO public.listing_locations (listing_id, location_id)
      SELECT v_id, c.id FROM unnest(p_coverage) c(id)
      ON CONFLICT DO NOTHING;
  END IF;

  -- Revision: the changed fields only.
  v_after  := to_jsonb(v_row) - 'search_tsv';
  v_before := CASE WHEN p_listing_id IS NULL THEN NULL ELSE to_jsonb(v_prev) - 'search_tsv' END;
  IF v_before IS NOT NULL THEN
    FOR v_key IN SELECT k FROM jsonb_object_keys(v_after) k LOOP
      IF (v_after->v_key) IS DISTINCT FROM (v_before->v_key) THEN
        v_diff_a := v_diff_a || jsonb_build_object(v_key, v_after->v_key);
        v_diff_b := v_diff_b || jsonb_build_object(v_key, v_before->v_key);
      END IF;
    END LOOP;
  ELSE
    v_diff_a := v_after;
    v_diff_b := NULL;
  END IF;

  INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
    VALUES (v_id, v_uid, CASE WHEN p_listing_id IS NULL THEN 'create' ELSE 'edit' END,
            v_diff_b, v_diff_a, v_uid);

  -- INC-321 — the answer names the currency the door stored (its own home fill
  -- included) so the client can mirror it; nothing else in the answer changes.
  RETURN jsonb_build_object('ok', true, 'listing_id', v_id, 'draft_step', v_step,
                            'price_currency', v_row.price_currency);
END $$;

REVOKE ALL ON FUNCTION public.submit_listing(uuid, smallint, uuid, text, text, text, jsonb, text, numeric, char, text, timestamptz, uuid[], jsonb, integer, boolean) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.submit_listing(uuid, smallint, uuid, text, text, text, jsonb, text, numeric, char, text, timestamptz, uuid[], jsonb, integer, boolean) TO authenticated;
GRANT ALL ON FUNCTION public.submit_listing(uuid, smallint, uuid, text, text, text, jsonb, text, numeric, char, text, timestamptz, uuid[], jsonb, integer, boolean) TO service_role;

-- ---------------------------------------------------------------- proofs
DO $proof$
DECLARE
  v_uid  uuid;
  v_home char(2);
  v_hcur char(3);
  v_bare uuid := gen_random_uuid();
  v_r    jsonb;
  v_l    public.listings%ROWTYPE;
BEGIN
  SELECT d.user_id, d.home_country_code, k.currency_code INTO v_uid, v_home, v_hcur
    FROM public.user_directory d
    JOIN public.profiles p ON p.user_id = d.user_id
    JOIN public.countries k ON k.code = d.home_country_code
    JOIN public.currencies c ON c.code = k.currency_code
   WHERE d.account_status = 'active' AND p.account_status = 'active'
   ORDER BY d.created_at LIMIT 1;
  IF v_uid IS NULL THEN RAISE EXCEPTION 'PROOF setup failed: no active seller with a home currency'; END IF;
  UPDATE public.user_directory SET observed_country_code = v_home WHERE user_id = v_uid;
  PERFORM set_config('request.jwt.claims', json_build_object('sub', v_uid, 'role', 'authenticated')::text, true);
  PERFORM set_config('request.jwt.claim.sub', v_uid::text, true);
  INSERT INTO public.categories
    (id, name_en, slug, price_enabled, is_restricted, is_active, display_order,
     is_catchall, allow_listings, capabilities, default_price_period, price_period_locked)
  VALUES (v_bare, 'e2e-inc321-bare', 'e2e-inc321-' || replace(v_bare::text,'-',''), true, false, true, 999999,
     false, true, ARRAY[]::text[], 'once', false);

  -- P15 step 1, no price: answer price_currency null
  v_r := public.submit_listing(NULL, 1::smallint, v_bare, NULL, NULL, NULL, '{}'::jsonb,
           NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, false);
  IF NOT coalesce((v_r->>'ok')::boolean, false) OR NOT (v_r ? 'price_currency')
     OR jsonb_typeof(v_r->'price_currency') <> 'null' THEN
    RAISE EXCEPTION 'PROOF P15 failed %', v_r; END IF;
  RAISE NOTICE 'PROOF P15 ok — step 1 answer price_currency=null';
  SELECT * INTO v_l FROM public.listings WHERE id = (v_r->>'listing_id')::uuid;

  -- P14 step 5 fixed 100, no currency: the home fill is named in the answer and stored
  v_r := public.submit_listing(v_l.id, 5::smallint, v_bare, 'e2e inc321', 'e2e inc321 body', NULL, '{}'::jsonb,
           'fixed', 100, NULL, 'once', NULL, NULL, NULL, NULL, false);
  SELECT * INTO v_l FROM public.listings WHERE id = v_l.id;
  IF NOT coalesce((v_r->>'ok')::boolean, false) OR (v_r->>'price_currency') IS DISTINCT FROM v_hcur::text
     OR v_l.price_currency IS DISTINCT FROM v_hcur THEN
    RAISE EXCEPTION 'PROOF P14 failed % / home=% stored=%', v_r, v_hcur, v_l.price_currency; END IF;
  RAISE NOTICE 'PROOF P14 ok — answer price_currency=% = stored = home', v_r->>'price_currency';

  -- P16 step 5 contact: answer price_currency null
  v_r := public.submit_listing(v_l.id, 5::smallint, v_bare, 'e2e inc321', 'e2e inc321 body', NULL, '{}'::jsonb,
           'contact', NULL, NULL, NULL, NULL, NULL, NULL, NULL, false);
  IF NOT coalesce((v_r->>'ok')::boolean, false) OR jsonb_typeof(v_r->'price_currency') <> 'null' THEN
    RAISE EXCEPTION 'PROOF P16 failed %', v_r; END IF;
  RAISE NOTICE 'PROOF P16 ok — contact answer price_currency=null';

  RAISE EXCEPTION USING ERRCODE = 'P0001', MESSAGE = 'INC321_PROOF_ROLLBACK';
EXCEPTION
  WHEN SQLSTATE 'P0001' THEN
    IF SQLERRM <> 'INC321_PROOF_ROLLBACK' THEN RAISE; END IF;
END $proof$;

-- READ-BACK: body + ACL
DO $readback$
DECLARE v_acl text;
BEGIN
  IF pg_get_functiondef('public.submit_listing(uuid, smallint, uuid, text, text, text, jsonb, text, numeric, char, text, timestamptz, uuid[], jsonb, integer, boolean)'::regprocedure)
     NOT LIKE '%''price_currency'', v_row.price_currency%' THEN
    RAISE EXCEPTION 'READ-BACK failed: price_currency missing from the answer'; END IF;
  SELECT array_to_string(coalesce(proacl, acldefault('f', proowner)), ',') INTO v_acl
    FROM pg_proc WHERE oid = 'public.submit_listing(uuid, smallint, uuid, text, text, text, jsonb, text, numeric, char, text, timestamptz, uuid[], jsonb, integer, boolean)'::regprocedure;
  IF v_acl LIKE '%anon=%' OR v_acl ~ '(^|,)=X' OR v_acl NOT LIKE '%authenticated=X%'
     OR v_acl NOT LIKE '%service_role=X%' THEN
    RAISE EXCEPTION 'READ-BACK failed: acl=%', v_acl; END IF;
  RAISE NOTICE 'READ-BACK ok acl=%', v_acl;
END $readback$;

-- ---------------------------------------------------------------- mark
INSERT INTO public.migration_marks (version) VALUES ('20260928100000') ON CONFLICT DO NOTHING;