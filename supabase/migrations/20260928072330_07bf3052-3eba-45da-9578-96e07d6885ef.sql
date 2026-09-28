-- D62-1d (INC-312) — a DRAFT may carry a commission without its percentage yet.
-- Choosing the commission basis sets price_mode 'commission' with price_bp NULL;
-- the step-4 autosave then violated listings_price_pair_check (20260927003341:15–20),
-- whose commission disjunct demanded price_bp IS NOT NULL. The step >= 5 door
-- already refuses {price_bp, required}, so no commission listing publishes without it.
-- Constraint only: no door body, no mode list, no client change.

ALTER TABLE public.listings DROP CONSTRAINT IF EXISTS listings_price_pair_check;
ALTER TABLE public.listings ADD CONSTRAINT listings_price_pair_check
  CHECK ((price_mode = 'commission' AND price_amount IS NULL AND price_currency IS NULL)
      OR (price_mode <> 'commission' AND price_bp IS NULL
          AND ((price_amount IS NULL) = (price_currency IS NULL))));
COMMENT ON CONSTRAINT listings_price_pair_check ON public.listings IS
  'D62-1d / INC-312: a commission carries no amount and no currency; its percentage may be absent on a DRAFT (the step-5 door requires it before publish). Every other mode keeps the amount/currency pair together and no bp.';

-- ---------------------------------------------------------------- proofs
DO $proof$
DECLARE
  v_uid  uuid;
  v_home char(2);
  v_bare uuid := gen_random_uuid();
  v_cur  char(3);
  v_r    jsonb;
  v_l    public.listings%ROWTYPE;
  v_raised boolean;
BEGIN
  SELECT d.user_id, d.home_country_code INTO v_uid, v_home
    FROM public.user_directory d
    JOIN public.profiles p ON p.user_id = d.user_id
   WHERE d.account_status = 'active' AND p.account_status = 'active'
     AND d.home_country_code IS NOT NULL
   ORDER BY d.created_at LIMIT 1;
  IF v_uid IS NULL THEN RAISE EXCEPTION 'PROOF setup failed: no active seller'; END IF;
  UPDATE public.user_directory SET observed_country_code = v_home WHERE user_id = v_uid;
  SELECT code INTO v_cur FROM public.currencies ORDER BY code LIMIT 1;
  PERFORM set_config('request.jwt.claims', json_build_object('sub', v_uid, 'role', 'authenticated')::text, true);
  PERFORM set_config('request.jwt.claim.sub', v_uid::text, true);
  INSERT INTO public.categories
    (id, name_en, slug, price_enabled, is_restricted, is_active, display_order,
     is_catchall, allow_listings, capabilities, default_price_period, price_period_locked)
  VALUES (v_bare, 'e2e-d62d-bare', 'e2e-d62d-' || replace(v_bare::text,'-',''), true, false, true, 999999,
     false, true, ARRAY[]::text[], 'once', false);

  -- P11 step 4, commission without bp: saved
  v_r := public.submit_listing(NULL, 4::smallint, v_bare, 'e2e d62d', 'e2e d62d body', NULL, '{}'::jsonb,
           'commission', NULL, NULL, NULL, NULL, NULL, NULL, NULL, false);
  SELECT * INTO v_l FROM public.listings WHERE id = (v_r->>'listing_id')::uuid;
  IF NOT coalesce((v_r->>'ok')::boolean, false) OR v_l.id IS NULL OR v_l.price_mode <> 'commission'
     OR v_l.price_bp IS NOT NULL OR v_l.price_amount IS NOT NULL OR v_l.price_currency IS NOT NULL THEN
    RAISE EXCEPTION 'PROOF P11 failed % / %', v_r, to_jsonb(v_l) - 'search_tsv'; END IF;
  RAISE NOTICE 'PROOF P11 ok — step 4 commission, bp NULL → stored commission, bp/amount/currency NULL';

  -- P12a commission + amount/currency: refused
  v_raised := false;
  BEGIN
    UPDATE public.listings SET price_mode = 'commission', price_amount = 100, price_currency = v_cur WHERE id = v_l.id;
  EXCEPTION WHEN check_violation THEN v_raised := true;
  END;
  IF NOT v_raised THEN RAISE EXCEPTION 'PROOF P12a failed: commission with an amount was stored'; END IF;
  -- P12b fixed + bp: refused
  v_raised := false;
  BEGIN
    UPDATE public.listings SET price_mode = 'fixed', price_bp = 500 WHERE id = v_l.id;
  EXCEPTION WHEN check_violation THEN v_raised := true;
  END;
  IF NOT v_raised THEN RAISE EXCEPTION 'PROOF P12b failed: fixed with a bp was stored'; END IF;
  RAISE NOTICE 'PROOF P12 ok — commission+amount raises; fixed+bp raises';

  -- P13 step 5 publish gate intact
  v_r := public.validate_listing_draft(v_uid, 5::smallint, v_bare, 'e2e d62d', 'e2e d62d body', NULL, '{}'::jsonb,
           'commission', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, false);
  IF coalesce((v_r->>'ok')::boolean, true)
     OR NOT (v_r->'refusals' @> '[{"field":"price_bp","reason":"required"}]'::jsonb) THEN
    RAISE EXCEPTION 'PROOF P13 failed %', v_r; END IF;
  RAISE NOTICE 'PROOF P13 ok — step 5 commission without bp refused {price_bp, required}';

  RAISE EXCEPTION USING ERRCODE = 'P0001', MESSAGE = 'D62D_PROOF_ROLLBACK';
EXCEPTION
  WHEN SQLSTATE 'P0001' THEN
    IF SQLERRM <> 'D62D_PROOF_ROLLBACK' THEN RAISE; END IF;
END $proof$;

-- READ-BACK
DO $readback$
DECLARE v_def text;
BEGIN
  SELECT pg_get_constraintdef(oid) INTO v_def FROM pg_constraint
   WHERE conrelid = 'public.listings'::regclass AND conname = 'listings_price_pair_check';
  IF v_def IS NULL OR v_def LIKE '%price_bp IS NOT NULL%' OR v_def NOT LIKE '%price_bp IS NULL%' THEN
    RAISE EXCEPTION 'READ-BACK failed: %', v_def; END IF;
  RAISE NOTICE 'READ-BACK ok %', v_def;
END $readback$;

-- ---------------------------------------------------------------- mark
INSERT INTO public.migration_marks (version) VALUES ('20260928090000') ON CONFLICT DO NOTHING;