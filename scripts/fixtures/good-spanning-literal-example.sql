-- Self-test fixture for the spanning-literal guard (INC-1089): the same
-- fragment on one line (chr(10), and an E'\n' escape), a doubled quote, a
-- comment holding an apostrophe — it's here — and a dollar-quoted block that
-- spans lines. The guard must pass it.
DO $proof$
DECLARE
  v_src text := 'it''s';
BEGIN
  IF position(',' || chr(10) || '    ''caps'', public.listing_caps(v_row.id)' IN v_src) = 0
     AND position(E',\n    ''caps''' IN v_src) = 0
     AND position('--[^\n]*' IN v_src) = 0 THEN
    RAISE EXCEPTION 'e2e-mig-fixture: not found';
  END IF;
END $proof$;
COMMENT ON TABLE public.e2e_mig_fixture IS $c$a comment
over two lines$c$;
