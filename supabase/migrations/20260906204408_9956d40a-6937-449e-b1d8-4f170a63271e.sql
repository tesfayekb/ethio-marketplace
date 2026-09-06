-- STAB-H PART A (DEC-039) — QUEUE TOLERANCE.
-- A queued read behind a t=0 herd used to die at the old, shorter statement
-- timeout (57014). Both Data API roles now tolerate 30 seconds.
ALTER ROLE authenticated SET statement_timeout = '30s';
ALTER ROLE anon SET statement_timeout = '30s';

DO $$
DECLARE
  v_auth text;
  v_anon text;
BEGIN
  SELECT array_to_string(rolconfig, ' | ') INTO v_auth FROM pg_roles WHERE rolname = 'authenticated';
  SELECT array_to_string(rolconfig, ' | ') INTO v_anon FROM pg_roles WHERE rolname = 'anon';
  RAISE NOTICE 'read-back authenticated: %', v_auth;
  RAISE NOTICE 'read-back anon: %', v_anon;
  IF v_auth IS NULL OR position('statement_timeout=30s' in v_auth) = 0 THEN
    RAISE EXCEPTION 'authenticated statement_timeout not set: %', v_auth;
  END IF;
  IF v_anon IS NULL OR position('statement_timeout=30s' in v_anon) = 0 THEN
    RAISE EXCEPTION 'anon statement_timeout not set: %', v_anon;
  END IF;
END $$;

INSERT INTO public.migration_marks(version) VALUES ('20260906210000') ON CONFLICT DO NOTHING;