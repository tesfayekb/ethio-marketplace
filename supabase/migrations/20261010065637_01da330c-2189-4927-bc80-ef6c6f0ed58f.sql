-- D106, part 1 (2026-10-10; bundle 10 follow-up, turn 9). Tier A. The chosen browsing place is kept on the account.
-- e2e-areas: shell, feed
-- A. profiles.viewing_location_id (the place) and profiles.viewing_location_at (when it was picked, so the newest
--    pick wins between a device and the account). The untyped legacy column viewing_location stays, unread.
--    No client role may write either column (INC-535): the door below is the only writer.
-- B. The dial viewing_place: 60 an hour per account (the operator, 2026-10-10).
-- C. user_set_viewing_location(p_location uuid): own row only, rate-gated, the place must be visible in an open
--    market's tree (the rule of get_location_tree, reused), NULL clears. A browsing preference, not identity:
--    no audit line, updated_at untouched.
-- D. my_viewing_location(): the owner's read — the place, its market, when it was picked, and whether it is
--    still visible.
-- E. Proofs: catalogue reads and calls with no session only; the doors' behaviour is proven by VP-1..VP-6.

-- ===== A — the place and its time =====
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS viewing_location_id uuid REFERENCES public.locations(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS viewing_location_at timestamptz;

-- ===== B — the dial =====
INSERT INTO public.rate_dials (action, max_count, window_seconds) VALUES ('viewing_place', 60, 3600)
  ON CONFLICT (action) DO UPDATE SET max_count = EXCLUDED.max_count, window_seconds = EXCLUDED.window_seconds;

-- ===== C — the writer =====
CREATE OR REPLACE FUNCTION public.user_set_viewing_location(p_location uuid)
RETURNS jsonb
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid     uuid := auth.uid();
  v_rate    jsonb;
  v_country text;
  v_at      timestamptz;
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'not signed in';
  END IF;

  v_rate := public.rate_gate('viewing_place');
  IF NOT coalesce((v_rate->>'allowed')::boolean, false) THEN
    RETURN jsonb_build_object('ok', false, 'reason', 'rateLimited', 'resets_at', v_rate->>'resets_at');
  END IF;

  IF p_location IS NOT NULL THEN
    SELECT l.country_code INTO v_country FROM public.locations l WHERE l.id = p_location;
    IF v_country IS NULL
       OR NOT EXISTS (SELECT 1 FROM public.get_location_tree(v_country) t WHERE t.id = p_location) THEN
      RETURN jsonb_build_object('ok', false, 'reason', 'placeNotOpen');
    END IF;
    v_at := now();
  END IF;

  UPDATE public.profiles p
     SET viewing_location_id = p_location,
         viewing_location_at = v_at
   WHERE p.user_id = v_uid;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'no profile row';
  END IF;

  RETURN jsonb_build_object('ok', true, 'id', p_location, 'country', v_country, 'at', v_at);
END $$;

REVOKE ALL ON FUNCTION public.user_set_viewing_location(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.user_set_viewing_location(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.user_set_viewing_location(uuid) TO service_role;

-- ===== D — the owner's read =====
CREATE OR REPLACE FUNCTION public.my_viewing_location()
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid     uuid := auth.uid();
  v_id      uuid;
  v_at      timestamptz;
  v_country text;
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'not signed in';
  END IF;

  SELECT p.viewing_location_id, p.viewing_location_at INTO v_id, v_at
    FROM public.profiles p
   WHERE p.user_id = v_uid;
  IF v_id IS NULL THEN
    RETURN jsonb_build_object('id', NULL, 'country', NULL, 'at', NULL, 'usable', false);
  END IF;

  SELECT l.country_code INTO v_country FROM public.locations l WHERE l.id = v_id;
  RETURN jsonb_build_object(
    'id', v_id,
    'country', v_country,
    'at', v_at,
    'usable', v_country IS NOT NULL
              AND EXISTS (SELECT 1 FROM public.get_location_tree(v_country) t WHERE t.id = v_id));
END $$;

REVOKE ALL ON FUNCTION public.my_viewing_location() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.my_viewing_location() TO authenticated;
GRANT ALL ON FUNCTION public.my_viewing_location() TO service_role;

-- ===== E — proofs =====
DO $proof$
DECLARE
  v_fn   text;
  v_ok   boolean;
BEGIN
  -- E1: the two columns, and the place's delete rule (a deleted place leaves no dangling id).
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                  WHERE table_schema = 'public' AND table_name = 'profiles'
                    AND column_name = 'viewing_location_id' AND data_type = 'uuid')
     OR NOT EXISTS (SELECT 1 FROM information_schema.columns
                     WHERE table_schema = 'public' AND table_name = 'profiles'
                       AND column_name = 'viewing_location_at' AND data_type = 'timestamp with time zone') THEN
    RAISE EXCEPTION 'D106 E1: the columns';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_catalog.pg_constraint c
                  WHERE c.conrelid = 'public.profiles'::regclass AND c.contype = 'f'
                    AND c.confrelid = 'public.locations'::regclass AND c.confdeltype = 'n'
                    AND c.conkey = ARRAY[(SELECT a.attnum FROM pg_catalog.pg_attribute a
                                           WHERE a.attrelid = 'public.profiles'::regclass
                                             AND a.attname = 'viewing_location_id')]) THEN
    RAISE EXCEPTION 'D106 E1: the place reference';
  END IF;

  -- E2: the dial.
  IF NOT EXISTS (SELECT 1 FROM public.rate_dials
                  WHERE action = 'viewing_place' AND max_count = 60 AND window_seconds = 3600) THEN
    RAISE EXCEPTION 'D106 E2: the dial';
  END IF;

  -- E3: both doors are definers with a fixed search path; the signed-in role runs them, anon and PUBLIC do not.
  FOREACH v_fn IN ARRAY ARRAY['public.user_set_viewing_location(uuid)', 'public.my_viewing_location()'] LOOP
    IF NOT (SELECT p.prosecdef FROM pg_catalog.pg_proc p WHERE p.oid = v_fn::regprocedure)
       OR NOT EXISTS (SELECT 1 FROM pg_catalog.pg_proc p, unnest(p.proconfig) cfg
                       WHERE p.oid = v_fn::regprocedure AND cfg LIKE 'search_path=%') THEN
      RAISE EXCEPTION 'D106 E3: % is not a definer with a search path', v_fn;
    END IF;
    IF pg_catalog.has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT pg_catalog.has_function_privilege('authenticated', v_fn, 'EXECUTE')
       OR EXISTS (SELECT 1 FROM pg_catalog.pg_proc p, aclexplode(p.proacl) x
                   WHERE p.oid = v_fn::regprocedure AND x.grantee = 0) THEN
      RAISE EXCEPTION 'D106 E3: % privileges', v_fn;
    END IF;
  END LOOP;

  -- E4: own row by construction — one argument at most, and the row is found by auth.uid() alone.
  IF (SELECT p.pronargs FROM pg_catalog.pg_proc p
       WHERE p.oid = 'public.user_set_viewing_location(uuid)'::regprocedure) <> 1
     OR pg_get_functiondef('public.user_set_viewing_location(uuid)'::regprocedure) NOT LIKE '%WHERE p.user_id = v_uid;%'
     OR pg_get_functiondef('public.my_viewing_location()'::regprocedure) NOT LIKE '%WHERE p.user_id = v_uid;%' THEN
    RAISE EXCEPTION 'D106 E4: a door is not keyed by auth.uid()';
  END IF;

  -- E5: no client role writes the new columns (INC-535 holds).
  IF pg_catalog.has_column_privilege('authenticated', 'public.profiles', 'viewing_location_id', 'UPDATE')
     OR pg_catalog.has_column_privilege('authenticated', 'public.profiles', 'viewing_location_at', 'UPDATE')
     OR pg_catalog.has_any_column_privilege('anon', 'public.profiles', 'UPDATE')
     OR pg_catalog.has_any_column_privilege('authenticated', 'public.profiles', 'UPDATE') THEN
    RAISE EXCEPTION 'D106 E5: a client role can write profiles';
  END IF;

  -- E6: with no session, both doors refuse.
  v_ok := false;
  BEGIN
    PERFORM public.user_set_viewing_location(NULL);
  EXCEPTION WHEN OTHERS THEN
    v_ok := (SQLERRM = 'not signed in');
  END;
  IF NOT v_ok THEN
    RAISE EXCEPTION 'D106 E6: the writer did not refuse a call with no session';
  END IF;
  v_ok := false;
  BEGIN
    PERFORM public.my_viewing_location();
  EXCEPTION WHEN OTHERS THEN
    v_ok := (SQLERRM = 'not signed in');
  END;
  IF NOT v_ok THEN
    RAISE EXCEPTION 'D106 E6: the read did not refuse a call with no session';
  END IF;
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261010190000') ON CONFLICT (version) DO NOTHING;
