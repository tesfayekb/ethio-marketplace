-- Bundle 13 (photos), turn 12 (2026-10-14). Tier A. D155b / D159 — the cover photo's background, removed by Photoroom
-- (D156): background removal becomes an AI feature with its own switch, price and meter (D158).
-- e2e-areas: posting, admin-services
--
-- A. The feature's name joins `ai_features`' check: the six names of 20261013184636 and `background_removal`; scratch
--    `e2e-` rows as before. The constraint is dropped and added again under its own name, in one transaction.
-- B. Its row: on, a call at 20,000 millionths of a dollar ($0.02, Photoroom's listed price, read 2026-10-13), no budget
--    (the operator sets one in Admin › Services › AI). `admin_ai_features()` lists it; `ai_feature_gate` and
--    `ai_record_spend` answer for it as for the others. No function, table, grant or policy is created or changed.
-- C. Proofs (RAISE EXCEPTION on any failure; a clean apply is the pass): the row as written; the gate answers on; a
--    name outside the list is still refused by the check (inside a block that rolls itself back).

-- A
ALTER TABLE public.ai_features DROP CONSTRAINT ai_features_feature_check;
ALTER TABLE public.ai_features ADD CONSTRAINT ai_features_feature_check CHECK (
  feature IN ('photo_screen', 'writing_helper', 'name_check', 'category_images', 'category_icons', 'translations',
              'background_removal')
  OR feature ~ '^e2e-[a-z0-9-]{1,40}$');

-- B
INSERT INTO public.ai_features (feature, unit, unit_cost_microusd)
VALUES ('background_removal', 'call', 20000)
ON CONFLICT (feature) DO NOTHING;

-- C
DO $$
DECLARE
  v      public.ai_features%ROWTYPE;
  v_gate jsonb;
BEGIN
  SELECT * INTO v FROM public.ai_features WHERE feature = 'background_removal';
  IF NOT FOUND THEN RAISE EXCEPTION 'proof C1 failed: no background_removal row'; END IF;
  IF v.unit <> 'call' OR v.unit_cost_microusd <> 20000 OR NOT v.enabled OR v.off_reason IS NOT NULL
     OR v.monthly_budget_cents IS NOT NULL THEN
    RAISE EXCEPTION 'proof C1 failed: the row is %', row_to_json(v);
  END IF;

  v_gate := public.ai_feature_gate('background_removal');
  IF (v_gate->>'on')::boolean IS DISTINCT FROM true THEN
    RAISE EXCEPTION 'proof C2 failed: the gate answered %', v_gate;
  END IF;

  BEGIN
    INSERT INTO public.ai_features (feature, unit_cost_microusd) VALUES ('background_removal_x', 1);
    RAISE EXCEPTION 'proof C3 failed: a name outside the list was accepted';
  EXCEPTION WHEN check_violation THEN
    NULL;
  END;
END $$;

INSERT INTO public.migration_marks (version) VALUES ('20261014130000') ON CONFLICT (version) DO NOTHING;
