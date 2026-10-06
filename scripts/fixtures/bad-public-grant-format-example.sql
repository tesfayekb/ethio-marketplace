-- Fixture for the public-surface guard (INC-443): a grant built in a loop that
-- names a function the allowlist does not list.
DO $closers$
DECLARE f text;
BEGIN
  FOREACH f IN ARRAY ARRAY['public.e2e_fixture_loop_fn(uuid)'] LOOP
    EXECUTE format('REVOKE ALL ON FUNCTION %s FROM PUBLIC, anon', f);
    EXECUTE format('GRANT EXECUTE ON FUNCTION %s TO authenticated', f);
  END LOOP;
END $closers$;
