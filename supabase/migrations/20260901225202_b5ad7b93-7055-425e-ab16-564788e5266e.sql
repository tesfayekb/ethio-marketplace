-- =====================================================================
-- Phase U4h — per-device default language with account sync (Tier A).
--
-- Census (A3 honesty): public.profiles.preferred_language ALREADY EXISTS
-- (20260730015333) as `text NOT NULL DEFAULT 'en'` with no FK. This migration
-- brings it to the U4h contract — NULLABLE, FK to languages(code) — rather
-- than adding a new column, and adds the audited own-row writer.
--
-- Declared-mark law (DEC-022 / INC-094): the last statement declares the mark.
-- Definer law (INC-074): every re-declared seam restates its REVOKE/GRANT.
-- Writer law (F5): gates -> capture -> mutate, in that order.
-- =====================================================================

-- ---------------------------------------------------------------------
-- A. profiles.preferred_language — nullable, referential.
-- ---------------------------------------------------------------------
ALTER TABLE public.profiles ALTER COLUMN preferred_language DROP DEFAULT;
ALTER TABLE public.profiles ALTER COLUMN preferred_language DROP NOT NULL;

-- Any historical value that is not a registered language becomes "unset"
-- rather than blocking the constraint (additive-first; no row is deleted).
UPDATE public.profiles p
   SET preferred_language = NULL
 WHERE p.preferred_language IS NOT NULL
   AND NOT EXISTS (SELECT 1 FROM public.languages l WHERE l.code = p.preferred_language);

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
     WHERE conname = 'profiles_preferred_language_fkey'
       AND conrelid = 'public.profiles'::regclass
  ) THEN
    ALTER TABLE public.profiles
      ADD CONSTRAINT profiles_preferred_language_fkey
      FOREIGN KEY (preferred_language) REFERENCES public.languages(code)
      ON UPDATE CASCADE ON DELETE SET NULL;
  END IF;
END $$;

-- The audited RPC is the ONLY writer (F3/E7): a direct column UPDATE would
-- bypass the publication check and the audit capture.
REVOKE UPDATE (preferred_language) ON public.profiles FROM authenticated;
GRANT ALL ON public.profiles TO service_role;

-- ---------------------------------------------------------------------
-- B. user_set_preferred_language — own-row only, audited.
--
-- OWN-ROW BY CONSTRUCTION: the function takes NO target-user parameter and
-- filters on auth.uid(); there is no argument through which another row can
-- be named. NULL clears the account preference (the device star still rules).
-- ---------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.user_set_preferred_language(p_code text)
RETURNS text
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_uid  uuid := auth.uid();
  v_prev text;
BEGIN
  -- GATE 1 — identity.
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'not signed in';
  END IF;

  -- GATE 2 — publication: base or enabled_public only (U4f gate, server-side).
  IF p_code IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM public.languages l
     WHERE l.code = p_code AND (l.is_base OR l.enabled_public)
  ) THEN
    RAISE EXCEPTION 'language not published';
  END IF;

  -- CAPTURE (old value) before MUTATE.
  SELECT pr.preferred_language INTO v_prev
    FROM public.profiles pr WHERE pr.user_id = v_uid;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'no profile row';
  END IF;

  -- MUTATE — own row only.
  UPDATE public.profiles pr
     SET preferred_language = p_code, updated_at = now()
   WHERE pr.user_id = v_uid;

  PERFORM public.log_audit('profile.preferred_language', 'profiles', v_uid::text,
    jsonb_build_object('old', v_prev, 'new', p_code));

  RETURN p_code;
END $$;

REVOKE ALL ON FUNCTION public.user_set_preferred_language(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.user_set_preferred_language(text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.user_set_preferred_language(text) TO service_role;

-- ---------------------------------------------------------------------
-- C. PROOFS — read back from the live database.
-- ---------------------------------------------------------------------
DO $proof$
DECLARE
  v_lang    text := 'zxh-u4h';
  v_uid     uuid;
  v_prev    text;
  v_after   text;
  v_src     text;
  v_refused boolean := false;
BEGIN
  -- Scratch, non-public language (J3 discipline: reaped below).
  INSERT INTO public.languages (code, name_en, name_native, enabled_public, is_base, sort)
  VALUES (v_lang, 'U4h scratch', 'U4h scratch', false, false, 999)
  ON CONFLICT (code) DO NOTHING;

  -- 1. Column contract.
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
     WHERE table_schema = 'public' AND table_name = 'profiles'
       AND column_name = 'preferred_language' AND is_nullable = 'NO'
  ) THEN
    RAISE EXCEPTION 'PROOF FAILED: preferred_language is still NOT NULL';
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
     WHERE conname = 'profiles_preferred_language_fkey'
       AND conrelid = 'public.profiles'::regclass
  ) THEN
    RAISE EXCEPTION 'PROOF FAILED: languages(code) FK missing';
  END IF;

  -- 2. OTHER-ROW IMPOSSIBLE BY CONSTRUCTION: one text argument, own-row filter.
  v_src := pg_get_functiondef('public.user_set_preferred_language(text)'::regprocedure);
  IF v_src NOT LIKE '%WHERE pr.user_id = v_uid%' THEN
    RAISE EXCEPTION 'PROOF FAILED: writer does not filter on auth.uid()';
  END IF;
  IF (SELECT pronargs FROM pg_proc
       WHERE oid = 'public.user_set_preferred_language(text)'::regprocedure) <> 1 THEN
    RAISE EXCEPTION 'PROOF FAILED: writer takes more than the one code argument';
  END IF;

  -- 3. Behaviour under a simulated session.
  SELECT pr.user_id, pr.preferred_language INTO v_uid, v_prev
    FROM public.profiles pr ORDER BY pr.created_at LIMIT 1;

  IF v_uid IS NULL THEN
    RAISE NOTICE 'U4h proof: no profile rows exist yet — behaviour proofs skipped (named deferral)';
  ELSE
    PERFORM set_config('request.jwt.claims',
      json_build_object('sub', v_uid::text, 'role', 'authenticated')::text, true);

    -- 3a. NON-PUBLIC REFUSED.
    BEGIN
      PERFORM public.user_set_preferred_language(v_lang);
    EXCEPTION WHEN others THEN
      v_refused := (SQLERRM = 'language not published');
    END;
    IF NOT v_refused THEN
      RAISE EXCEPTION 'PROOF FAILED: a non-public language was accepted';
    END IF;

    -- 3b. OWN-ROW WRITE (base language is always published).
    PERFORM public.user_set_preferred_language('en');
    SELECT pr.preferred_language INTO v_after
      FROM public.profiles pr WHERE pr.user_id = v_uid;
    IF v_after IS DISTINCT FROM 'en' THEN
      RAISE EXCEPTION 'PROOF FAILED: own-row write did not land (got %)', v_after;
    END IF;
    IF NOT EXISTS (
      SELECT 1 FROM public.audit_log
       WHERE action = 'profile.preferred_language' AND entity_id = v_uid::text
    ) THEN
      RAISE EXCEPTION 'PROOF FAILED: the write was not audited';
    END IF;

    -- 3c. NULL CLEARS.
    PERFORM public.user_set_preferred_language(NULL);
    SELECT pr.preferred_language INTO v_after
      FROM public.profiles pr WHERE pr.user_id = v_uid;
    IF v_after IS NOT NULL THEN
      RAISE EXCEPTION 'PROOF FAILED: NULL did not clear the preference';
    END IF;

    -- No trace left on the sampled row.
    UPDATE public.profiles SET preferred_language = v_prev WHERE user_id = v_uid;
    PERFORM set_config('request.jwt.claims', NULL, true);
    RAISE NOTICE 'U4h behaviour proofs OK: non-public refused, own-row write landed + audited, NULL cleared';
  END IF;

  -- 4. Grants read back: anon never, authenticated only through the gate.
  IF has_function_privilege('anon', 'public.user_set_preferred_language(text)', 'EXECUTE') THEN
    RAISE EXCEPTION 'PROOF FAILED: anon can reach the writer';
  END IF;
  IF NOT (has_function_privilege('authenticated', 'public.user_set_preferred_language(text)', 'EXECUTE')
      AND has_function_privilege('service_role', 'public.user_set_preferred_language(text)', 'EXECUTE')) THEN
    RAISE EXCEPTION 'PROOF FAILED: expected EXECUTE grant missing';
  END IF;
  IF has_column_privilege('authenticated', 'public.profiles', 'preferred_language', 'UPDATE') THEN
    RAISE EXCEPTION 'PROOF FAILED: authenticated can still write the column directly';
  END IF;

  RAISE NOTICE 'U4h grant proofs OK: anon none, authenticated gate-only, direct column UPDATE revoked';

  DELETE FROM public.languages WHERE code = v_lang;
END $proof$;

INSERT INTO public.migration_marks(version) VALUES ('20260902080000') ON CONFLICT DO NOTHING;