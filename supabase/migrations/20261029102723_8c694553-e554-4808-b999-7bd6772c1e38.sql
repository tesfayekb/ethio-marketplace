-- N1b-3b M1 (INC-977, N1b-3 R3/R4): the model's stated reason for a held name, kept for staff.
-- name_checks gains imitates_of: at most 80 characters (the nameCheckOutput bound), and only on an
-- 'imitates' row — both declared as CHECKs. A BEFORE UPDATE trigger nulls it when a writer moves the
-- row to any other state, so the doors' existing upserts (save_posting_identity, admin_update_profile)
-- keep working unchanged. name_check_mark is dropped and created with p_of text DEFAULT NULL (its
-- argument list grows; G39, R3): every header attribute, the text match and the service-only closers
-- are restated; the catch-up's four-argument call keeps working through the default.

ALTER TABLE public.name_checks ADD COLUMN imitates_of text NULL;
ALTER TABLE public.name_checks
  ADD CONSTRAINT name_checks_imitates_of_length CHECK (imitates_of IS NULL OR char_length(imitates_of) <= 80),
  ADD CONSTRAINT name_checks_imitates_of_state CHECK (imitates_of IS NULL OR state = 'imitates');

CREATE FUNCTION public.name_checks_clear_imitates_of()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO ''
AS $function$
BEGIN
  -- A writer that moves the row out of 'imitates' takes the stated reason with it. A write that
  -- keeps the state is left to the CHECKs (a reason on a 'clean' row is refused, never nulled).
  IF NEW.state IS DISTINCT FROM OLD.state AND NEW.state <> 'imitates' THEN
    NEW.imitates_of := NULL;
  END IF;
  RETURN NEW;
END $function$;
REVOKE ALL ON FUNCTION public.name_checks_clear_imitates_of() FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.name_checks_clear_imitates_of() TO service_role;

CREATE TRIGGER name_checks_clear_imitates_of
  BEFORE UPDATE ON public.name_checks
  FOR EACH ROW EXECUTE FUNCTION public.name_checks_clear_imitates_of();

DROP FUNCTION public.name_check_mark(uuid, text, text, text);
CREATE FUNCTION public.name_check_mark(p_profile uuid, p_subject text, p_text text, p_state text, p_of text DEFAULT NULL::text)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE v_n integer;
        v_of text := nullif(btrim(coalesce(p_of, '')), '');
BEGIN
  IF p_state IS NULL OR p_state NOT IN ('clean','imitates','unavailable') THEN RAISE EXCEPTION 'badValue:state'; END IF;
  -- N1b-3 R4: the reason is bounded (80, nameCheckOutput) and kept only with 'imitates'.
  IF v_of IS NOT NULL AND char_length(v_of) > 80 THEN RAISE EXCEPTION 'badValue:of'; END IF;
  IF p_state = 'unavailable' THEN
    UPDATE public.name_checks
       SET attempts = attempts + 1, last_attempt_at = now()
     WHERE profile_id = p_profile AND subject = p_subject AND checked_text = p_text;
  ELSE
    UPDATE public.name_checks
       SET state = p_state, attempts = attempts + 1, last_attempt_at = now(),
           imitates_of = CASE WHEN p_state = 'imitates' THEN v_of ELSE NULL END
     WHERE profile_id = p_profile AND subject = p_subject AND checked_text = p_text;
  END IF;
  GET DIAGNOSTICS v_n = ROW_COUNT;
  RETURN v_n > 0;
END $function$;
REVOKE ALL ON FUNCTION public.name_check_mark(uuid, text, text, text, text) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.name_check_mark(uuid, text, text, text, text) TO service_role;

-- PROOF (NCQ-7a…h, NCQ-8): its own scratch user only, mutation and readback in separate statements,
-- rolled back whole, raising on failure. It never reads the Vault and never calls job_call.
DO $proof$
DECLARE
  v_hex  text := replace(gen_random_uuid()::text, '-', '');
  v_tag  text := 'e2e-mig-n1b3m1-' || substr(v_hex, 1, 12);
  v_u    uuid := gen_random_uuid();
  v_a    text := 'qz' || translate(substr(v_hex, 1, 10), '0123456789', 'ghijkmnopr');
  v_lang text := (SELECT code FROM public.languages ORDER BY code LIMIT 1);
  v_r    jsonb;
  v_ok   boolean;
  v_n    integer;
  v_refused boolean;
BEGIN
 BEGIN
  INSERT INTO auth.users(id, email, raw_user_meta_data, aud, role, created_at, updated_at)
    VALUES (v_u, v_tag || '@example.invalid', '{}', 'authenticated', 'authenticated', now(), now());
  INSERT INTO public.legal_acceptances(user_id, version_id, language, method)
  SELECT v_u, v.id, v_lang, v_tag FROM public.legal_versions v
   WHERE v.status = 'published' AND v.effective_at <= now();
  PERFORM set_config('request.jwt.claims', jsonb_build_object('sub', v_u, 'role', 'authenticated')::text, true);
  PERFORM set_config('request.jwt.claim.sub', v_u::text, true);
  v_r := public.save_posting_identity(p_alias => v_a);
  IF (v_r->>'ok')::boolean IS NOT TRUE THEN RAISE EXCEPTION 'NCQ-7 setup: save %', v_r; END IF;
  PERFORM set_config('request.jwt.claims', '', true);
  PERFORM set_config('request.jwt.claim.sub', '', true);

  -- NCQ-7a (R3): the catch-up's four-argument call still resolves, through p_of's default.
  v_ok := public.name_check_mark(p_profile => v_u, p_subject => 'alias', p_text => v_a, p_state => 'imitates');
  IF v_ok IS NOT TRUE THEN RAISE EXCEPTION 'NCQ-7a four-argument call'; END IF;
  IF (SELECT state FROM public.name_checks WHERE profile_id = v_u AND subject = 'alias') IS DISTINCT FROM 'imitates'
     OR (SELECT imitates_of FROM public.name_checks WHERE profile_id = v_u AND subject = 'alias') IS NOT NULL
  THEN RAISE EXCEPTION 'NCQ-7a readback'; END IF;

  -- NCQ-7b: the reason is kept with 'imitates'.
  v_ok := public.name_check_mark(v_u, 'alias', v_a, 'imitates', '  Ethio Telecom  ');
  IF v_ok IS NOT TRUE THEN RAISE EXCEPTION 'NCQ-7b mark'; END IF;
  IF (SELECT imitates_of FROM public.name_checks WHERE profile_id = v_u AND subject = 'alias') IS DISTINCT FROM 'Ethio Telecom'
  THEN RAISE EXCEPTION 'NCQ-7b readback'; END IF;

  -- NCQ-7c (R4): 'unavailable' leaves the state and the reason as they were; attempts move.
  SELECT attempts INTO v_n FROM public.name_checks WHERE profile_id = v_u AND subject = 'alias';
  v_ok := public.name_check_mark(v_u, 'alias', v_a, 'unavailable', 'ignored');
  IF v_ok IS NOT TRUE THEN RAISE EXCEPTION 'NCQ-7c mark'; END IF;
  IF (SELECT state FROM public.name_checks WHERE profile_id = v_u AND subject = 'alias') IS DISTINCT FROM 'imitates'
     OR (SELECT imitates_of FROM public.name_checks WHERE profile_id = v_u AND subject = 'alias') IS DISTINCT FROM 'Ethio Telecom'
     OR (SELECT attempts FROM public.name_checks WHERE profile_id = v_u AND subject = 'alias') IS DISTINCT FROM v_n + 1
  THEN RAISE EXCEPTION 'NCQ-7c readback'; END IF;

  -- NCQ-7d: a reason over 80 characters is refused, and nothing changed.
  v_refused := false;
  BEGIN
    PERFORM public.name_check_mark(v_u, 'alias', v_a, 'imitates', repeat('x', 81));
  EXCEPTION WHEN OTHERS THEN
    IF SQLERRM <> 'badValue:of' THEN RAISE; END IF;
    v_refused := true;
  END;
  IF NOT v_refused THEN RAISE EXCEPTION 'NCQ-7d not refused'; END IF;
  IF (SELECT imitates_of FROM public.name_checks WHERE profile_id = v_u AND subject = 'alias') IS DISTINCT FROM 'Ethio Telecom'
     OR (SELECT attempts FROM public.name_checks WHERE profile_id = v_u AND subject = 'alias') IS DISTINCT FROM v_n + 1
  THEN RAISE EXCEPTION 'NCQ-7d readback'; END IF;

  -- NCQ-7e: a stale text changes nothing.
  v_ok := public.name_check_mark(v_u, 'alias', v_a || 'z', 'clean');
  IF v_ok IS NOT FALSE THEN RAISE EXCEPTION 'NCQ-7e stale matched'; END IF;
  IF (SELECT state FROM public.name_checks WHERE profile_id = v_u AND subject = 'alias') IS DISTINCT FROM 'imitates'
     OR (SELECT imitates_of FROM public.name_checks WHERE profile_id = v_u AND subject = 'alias') IS DISTINCT FROM 'Ethio Telecom'
  THEN RAISE EXCEPTION 'NCQ-7e readback'; END IF;

  -- NCQ-7f: 'clean' takes the reason away.
  v_ok := public.name_check_mark(v_u, 'alias', v_a, 'clean', 'ignored');
  IF v_ok IS NOT TRUE THEN RAISE EXCEPTION 'NCQ-7f mark'; END IF;
  IF (SELECT state FROM public.name_checks WHERE profile_id = v_u AND subject = 'alias') IS DISTINCT FROM 'clean'
     OR (SELECT imitates_of FROM public.name_checks WHERE profile_id = v_u AND subject = 'alias') IS NOT NULL
  THEN RAISE EXCEPTION 'NCQ-7f readback'; END IF;

  -- NCQ-7g (R4): a direct write of a reason on a 'clean' row is refused by the CHECK, and nothing changed.
  v_refused := false;
  BEGIN
    UPDATE public.name_checks SET imitates_of = 'planted' WHERE profile_id = v_u AND subject = 'alias';
  EXCEPTION WHEN check_violation THEN
    v_refused := true;
  END;
  IF NOT v_refused THEN RAISE EXCEPTION 'NCQ-7g not refused'; END IF;
  IF (SELECT imitates_of FROM public.name_checks WHERE profile_id = v_u AND subject = 'alias') IS NOT NULL
  THEN RAISE EXCEPTION 'NCQ-7g readback'; END IF;

  -- NCQ-7h (R4): the owner door's reset (a new name → 'unchecked') nulls the reason through the trigger.
  v_ok := public.name_check_mark(v_u, 'alias', v_a, 'imitates', 'Ethio Telecom');
  IF v_ok IS NOT TRUE THEN RAISE EXCEPTION 'NCQ-7h mark'; END IF;
  PERFORM set_config('request.jwt.claims', jsonb_build_object('sub', v_u, 'role', 'authenticated')::text, true);
  PERFORM set_config('request.jwt.claim.sub', v_u::text, true);
  v_r := public.save_posting_identity(p_alias => v_a || 'b');
  PERFORM set_config('request.jwt.claims', '', true);
  PERFORM set_config('request.jwt.claim.sub', '', true);
  IF (v_r->>'ok')::boolean IS NOT TRUE THEN RAISE EXCEPTION 'NCQ-7h rename %', v_r; END IF;
  IF (SELECT state FROM public.name_checks WHERE profile_id = v_u AND subject = 'alias') IS DISTINCT FROM 'unchecked'
     OR (SELECT imitates_of FROM public.name_checks WHERE profile_id = v_u AND subject = 'alias') IS NOT NULL
  THEN RAISE EXCEPTION 'NCQ-7h readback'; END IF;

  -- NCQ-8: the header and the closers read back; the old four-argument signature is gone.
  IF to_regprocedure('public.name_check_mark(uuid, text, text, text)') IS NOT NULL THEN RAISE EXCEPTION 'NCQ-8 old signature'; END IF;
  IF NOT (SELECT prosecdef FROM pg_proc WHERE oid = 'public.name_check_mark(uuid, text, text, text, text)'::regprocedure)
     OR position('search_path TO ''public''' IN pg_get_functiondef('public.name_check_mark(uuid, text, text, text, text)'::regprocedure)) = 0
     OR position('checked_text = p_text' IN pg_get_functiondef('public.name_check_mark(uuid, text, text, text, text)'::regprocedure)) = 0
  THEN RAISE EXCEPTION 'NCQ-8 header'; END IF;
  IF has_function_privilege('anon', 'public.name_check_mark(uuid, text, text, text, text)', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.name_check_mark(uuid, text, text, text, text)', 'EXECUTE')
     OR NOT has_function_privilege('service_role', 'public.name_check_mark(uuid, text, text, text, text)', 'EXECUTE')
     OR has_function_privilege('anon', 'public.name_checks_clear_imitates_of()', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.name_checks_clear_imitates_of()', 'EXECUTE')
  THEN RAISE EXCEPTION 'NCQ-8 acl'; END IF;
  RAISE EXCEPTION 'M1 proof ok';
 EXCEPTION WHEN OTHERS THEN IF SQLERRM <> 'M1 proof ok' THEN RAISE; END IF; END;
 IF EXISTS (SELECT 1 FROM auth.users WHERE id = v_u AND email LIKE 'e2e-mig-%') OR EXISTS (SELECT 1 FROM public.name_checks WHERE profile_id = v_u) THEN
   RAISE EXCEPTION 'M1 rollback failed'; END IF;
END;
$proof$;

INSERT INTO public.migration_marks(version) VALUES ('20261030030000');