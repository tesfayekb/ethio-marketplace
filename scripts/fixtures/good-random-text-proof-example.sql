-- Self-test fixture for the random-text guard (INC-1202): the same proof with every
-- random part a door reads as text mapped to letters. The guard must pass it.
DO $proof$
DECLARE
  v_hex     text := replace(gen_random_uuid()::text, '-', '');
  v_tag     text;
  v_key     text;
  v_l       uuid := gen_random_uuid();
  v_answer  jsonb;
BEGIN
  v_tag := 'e2e-mig-fixture-' || translate(substr(v_hex, 1, 10), '0123456789', 'ghijkmnopr');
  v_key := 'e2e_mig_' || substr(v_hex, 11, 8);
  -- the door's answer: jsonb_build_object('title', v_hex) in a comment is not a call
  v_answer := public.admin_edit_listing(v_l, jsonb_build_object('title', v_tag || ' edited ad'), 'rules', NULL);
  PERFORM public.edit_my_listing(v_l, jsonb_build_object('description', 'it''s; a fixed text', 'id', v_key));
  PERFORM public.submit_listing(p_listing_id => v_l, p_title => 'E2E fixed title', p_note => v_key);
  IF v_answer IS NULL THEN
    RAISE EXCEPTION 'e2e-mig-fixture: no answer';
  END IF;
END $proof$;
