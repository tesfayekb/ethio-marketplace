-- Self-test fixture for the spanning-literal guard (INC-1089): a proof's
-- compared fragment written across a line break. The guard must refuse it.
DO $proof$
DECLARE
  v_src text := 'x';
BEGIN
  IF position(',
    ''caps'', public.listing_caps(v_row.id)' IN v_src) = 0 THEN
    RAISE EXCEPTION 'e2e-mig-fixture: not found';
  END IF;
END $proof$;
