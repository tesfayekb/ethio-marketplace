-- N1b-2a M1 (INC-977, N1b-2 ruling R1): the public seller-name helpers and the previous name's recorded state.
-- seller_public_alias: the seller's alias, or NULL while its check is 'imitates' on that exact text.
-- seller_public_previous_alias: the latest released alias within 365 days, only when it was released 'clean'.
-- Both are service-only: they are called from inside the public SECURITY DEFINER doors, never by a browser role.

ALTER TABLE public.alias_history ADD COLUMN released_state text;
ALTER TABLE public.alias_history ADD CONSTRAINT alias_history_released_state_ok
  CHECK (released_state IS NULL OR released_state IN ('clean', 'unchecked', 'imitates'));
COMMENT ON COLUMN public.alias_history.released_state IS
  'N1b-2 R1: the name check''s state when this alias was released; NULL for releases before N1b-2. Public reads show a previous name only when clean.';

CREATE FUNCTION public.seller_public_alias(p_profile uuid, p_subject text DEFAULT 'alias')
RETURNS text
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, pg_temp
AS $function$
  -- One profiles primary-key read and one name_checks primary-key read. A subject this
  -- function does not know yet (the business name, D222) answers NULL: hidden, never leaked.
  SELECT pr.seller_alias
    FROM public.profiles pr
   WHERE pr.user_id = p_profile
     AND p_subject = 'alias'
     AND NOT EXISTS (
       SELECT 1 FROM public.name_checks c
        WHERE c.profile_id = p_profile AND c.subject = p_subject
          AND c.state = 'imitates' AND c.checked_text = pr.seller_alias);
$function$;
REVOKE ALL ON FUNCTION public.seller_public_alias(uuid, text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.seller_public_alias(uuid, text) TO service_role;

CREATE FUNCTION public.seller_public_previous_alias(p_profile uuid)
RETURNS text
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, pg_temp
AS $function$
  -- The latest release is chosen first (my_seller_line's rule); it shows only when it was
  -- released 'clean'. 'unchecked', 'imitates' and a pre-N1b-2 NULL are withheld (R1).
  SELECT CASE WHEN h.released_state = 'clean' THEN h.alias END
    FROM public.alias_history h
    JOIN public.profiles pr ON pr.user_id = h.user_id
   WHERE h.user_id = p_profile AND h.released_at IS NOT NULL
     AND h.released_at > now() - interval '365 days'
     AND h.alias_fold IS DISTINCT FROM public.name_fold(pr.seller_alias)
   ORDER BY h.released_at DESC
   LIMIT 1;
$function$;
REVOKE ALL ON FUNCTION public.seller_public_previous_alias(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.seller_public_previous_alias(uuid) TO service_role;

-- Proof (INC-980): one scratch e2e-n1b2 seller; every row it reads it creates; the sentinel rolls it all back.
DO $proof$
DECLARE
  v_hex  text := replace(gen_random_uuid()::text, '-', '');
  v_tag  text := 'e2e-n1b2-' || substr(v_hex, 1, 12);
  v_u    uuid := gen_random_uuid();
  v_a    text := 'qz' || translate(substr(v_hex, 1, 10), '0123456789', 'ghijkmnopr');
  v_lang text := (SELECT code FROM public.languages ORDER BY code LIMIT 1);
  v_r    jsonb;
BEGIN
 BEGIN
  INSERT INTO auth.users(id, email, raw_user_meta_data, aud, role, created_at, updated_at)
    VALUES (v_u, v_tag || '@example.invalid', '{}', 'authenticated', 'authenticated', now(), now());
  INSERT INTO public.legal_acceptances(user_id, version_id, language, method)
  SELECT v_u, v.id, v_lang, v_tag FROM public.legal_versions v WHERE v.status = 'published' AND v.effective_at <= now();
  PERFORM set_config('request.jwt.claims', jsonb_build_object('sub', v_u, 'role', 'authenticated')::text, true);
  PERFORM set_config('request.jwt.claim.sub', v_u::text, true);
  v_r := public.save_posting_identity(p_alias => v_a);
  IF (v_r->>'ok')::boolean IS NOT TRUE THEN RAISE EXCEPTION 'SPA proof setup: save %', v_r; END IF;
  PERFORM set_config('request.jwt.claims', '', true);
  PERFORM set_config('request.jwt.claim.sub', '', true);

  -- SPA-1a: 'unchecked' shows the name.
  IF public.seller_public_alias(v_u) IS DISTINCT FROM v_a THEN RAISE EXCEPTION 'SPA-1a unchecked hidden'; END IF;
  -- SPA-1b: 'clean' shows the name.
  PERFORM public.name_check_mark(v_u, 'alias', v_a, 'clean');
  IF public.seller_public_alias(v_u) IS DISTINCT FROM v_a THEN RAISE EXCEPTION 'SPA-1b clean hidden'; END IF;
  -- SPA-1c: 'imitates' on the exact text hides it; the column still holds it (owner and staff read the column).
  PERFORM public.name_check_mark(v_u, 'alias', v_a, 'imitates');
  IF public.seller_public_alias(v_u) IS NOT NULL THEN RAISE EXCEPTION 'SPA-1c imitates shown'; END IF;
  IF (SELECT seller_alias FROM public.profiles WHERE user_id = v_u) IS DISTINCT FROM v_a THEN RAISE EXCEPTION 'SPA-1c column changed'; END IF;
  -- SPA-1d: an unknown subject answers NULL.
  IF public.seller_public_alias(v_u, 'business_name') IS NOT NULL THEN RAISE EXCEPTION 'SPA-1d subject'; END IF;

  -- SPA-5: the previous name shows only when released 'clean' (scratch history rows of this seller).
  INSERT INTO public.alias_history(user_id, alias, alias_fold, taken_at, released_at, released_state)
    VALUES (v_u, v_a || 'p', public.name_fold(v_a || 'p'), now() - interval '3 days', now() - interval '2 days', NULL);
  IF public.seller_public_previous_alias(v_u) IS NOT NULL THEN RAISE EXCEPTION 'SPA-5a legacy NULL shown'; END IF;
  UPDATE public.alias_history SET released_state = 'unchecked' WHERE user_id = v_u AND alias = v_a || 'p';
  IF public.seller_public_previous_alias(v_u) IS NOT NULL THEN RAISE EXCEPTION 'SPA-5b unchecked shown'; END IF;
  UPDATE public.alias_history SET released_state = 'imitates' WHERE user_id = v_u AND alias = v_a || 'p';
  IF public.seller_public_previous_alias(v_u) IS NOT NULL THEN RAISE EXCEPTION 'SPA-5c imitates shown'; END IF;
  UPDATE public.alias_history SET released_state = 'clean' WHERE user_id = v_u AND alias = v_a || 'p';
  IF public.seller_public_previous_alias(v_u) IS DISTINCT FROM v_a || 'p' THEN RAISE EXCEPTION 'SPA-5d clean hidden'; END IF;
  -- SPA-5e: a newer unclean release is not replaced by an older clean one.
  INSERT INTO public.alias_history(user_id, alias, alias_fold, taken_at, released_at, released_state)
    VALUES (v_u, v_a || 'q', public.name_fold(v_a || 'q'), now() - interval '2 days', now() - interval '1 day', 'imitates');
  IF public.seller_public_previous_alias(v_u) IS NOT NULL THEN RAISE EXCEPTION 'SPA-5e older clean shown'; END IF;

  -- SPA-1e: closed to every browser role.
  IF has_function_privilege('anon', 'public.seller_public_alias(uuid, text)', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.seller_public_alias(uuid, text)', 'EXECUTE')
     OR has_function_privilege('anon', 'public.seller_public_previous_alias(uuid)', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.seller_public_previous_alias(uuid)', 'EXECUTE')
     OR NOT has_function_privilege('service_role', 'public.seller_public_alias(uuid, text)', 'EXECUTE') THEN
    RAISE EXCEPTION 'SPA-1e acl'; END IF;
  RAISE EXCEPTION 'M1 proof ok';
 EXCEPTION WHEN OTHERS THEN IF SQLERRM <> 'M1 proof ok' THEN RAISE; END IF; END;
 IF EXISTS (SELECT 1 FROM auth.users WHERE id = v_u) OR EXISTS (SELECT 1 FROM public.alias_history WHERE user_id = v_u) THEN
   RAISE EXCEPTION 'M1 rollback failed'; END IF;
END;
$proof$;

INSERT INTO public.migration_marks(version) VALUES ('20261030010000');