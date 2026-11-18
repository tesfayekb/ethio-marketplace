-- Self-test fixture for the random-text guard (INC-1202): a proof that sends a random
-- draw's hex through a door as a title, a description or a name. The guard must refuse
-- each of the four statements that carry one.
DO $proof$
DECLARE
  v_hex     text := replace(gen_random_uuid()::text, '-', '');
  v_tag     text;
  v_stem    text;
  v_mid     text;
  v_l       uuid := gen_random_uuid();
  v_answer  jsonb;
  v_changes jsonb;
BEGIN
  v_tag := 'e2e-mig-fixture-' || substr(v_hex, 1, 10);
  v_stem := substr(replace(gen_random_uuid()::text, '-', ''), 1, 8);
  v_mid := 'e2e ' || v_stem;
  -- the door's answer is read below
  v_answer := public.admin_edit_listing(v_l, jsonb_build_object('title', v_tag || ' edited ad'), 'rules', NULL);
  PERFORM public.edit_my_listing(v_l, jsonb_build_object('description', 'e2e ' || md5(random()::text)));
  PERFORM public.submit_listing(p_listing_id => v_l, p_title => v_mid || ' title');
  v_changes := jsonb_build_object('name', 'e2e_' || to_hex((random() * 1e9)::bigint));
  IF v_answer IS NULL OR v_changes IS NULL THEN
    RAISE EXCEPTION 'e2e-mig-fixture: no answer';
  END IF;
END $proof$;
