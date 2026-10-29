-- Foundations turn N1b-1, M1 (INC-979): every seller alias saved before N1a has a name_checks row.
-- save_posting_identity writes a row only when the alias changes, so a legacy name saved again unchanged
-- never got one; markClean then found no row, and the catch-up could not see the name. This backfills
-- each alias without a row as 'unchecked' (checked_text = the lower-cased alias, since = now()), so the
-- catch-up asks each once. Idempotent: an existing row is never touched.

-- Proof (INC-970): scratch e2e-n1b users only; every row it reads it creates; the sentinel rolls it all back.
DO $proof$
DECLARE
  v_hex text := replace(gen_random_uuid()::text,'-','');
  v_tag text := 'e2e-n1b-' || substr(v_hex,1,12);
  v_u1  uuid := gen_random_uuid();
  v_u2  uuid := gen_random_uuid();
  v_u3  uuid := gen_random_uuid();
  v_a1  text := 'qz' || translate(substr(v_hex,1,10),'0123456789','ghijkmnopr');
  v_a2  text := 'qx' || translate(substr(v_hex,11,10),'0123456789','ghijkmnopr');
  v_c   public.name_checks%ROWTYPE;
  v_n   integer;
BEGIN
 BEGIN
  INSERT INTO auth.users(id,email,raw_user_meta_data,aud,role,created_at,updated_at) VALUES
    (v_u1, v_tag||'-a@example.invalid','{}','authenticated','authenticated',now(),now()),
    (v_u2, v_tag||'-b@example.invalid','{}','authenticated','authenticated',now(),now()),
    (v_u3, v_tag||'-c@example.invalid','{}','authenticated','authenticated',now(),now());
  -- u1: a legacy alias with no row (upper case, to prove the lower-cased text).
  UPDATE public.profiles SET seller_alias = upper(v_a1), home_country_code = 'ET' WHERE user_id = v_u1;
  -- u2: an alias whose row is already 'clean' (must stay untouched).
  UPDATE public.profiles SET seller_alias = v_a2 WHERE user_id = v_u2;
  DELETE FROM public.name_checks WHERE profile_id IN (v_u1, v_u2, v_u3);
  INSERT INTO public.name_checks(profile_id,subject,checked_text,state,since,attempts)
    VALUES (v_u2,'alias',v_a2,'clean',now() - interval '3 days',2);
  -- u3: no alias (must get no row).
  UPDATE public.profiles SET seller_alias = NULL WHERE user_id = v_u3;

  INSERT INTO public.name_checks(profile_id, subject, checked_text, state, since, home_country_code)
  SELECT p.user_id, 'alias', lower(p.seller_alias), 'unchecked', now(), p.home_country_code
    FROM public.profiles p
   WHERE p.seller_alias IS NOT NULL
  ON CONFLICT (profile_id, subject) DO NOTHING;

  SELECT * INTO v_c FROM public.name_checks WHERE profile_id = v_u1 AND subject = 'alias';
  IF NOT FOUND OR v_c.state <> 'unchecked' OR v_c.checked_text <> lower(v_a1) OR v_c.attempts <> 0
     OR v_c.home_country_code IS DISTINCT FROM 'ET' THEN
    RAISE EXCEPTION 'BF-1 legacy alias backfilled: % % %', v_c.state, v_c.checked_text, v_c.home_country_code; END IF;
  SELECT * INTO v_c FROM public.name_checks WHERE profile_id = v_u2 AND subject = 'alias';
  IF v_c.state <> 'clean' OR v_c.attempts <> 2 OR v_c.since > now() - interval '2 days' THEN
    RAISE EXCEPTION 'BF-2 existing row touched: % %', v_c.state, v_c.attempts; END IF;
  IF EXISTS (SELECT 1 FROM public.name_checks WHERE profile_id = v_u3) THEN
    RAISE EXCEPTION 'BF-3 a profile without an alias got a row'; END IF;
  -- BF-4: run again; nothing changes (idempotent).
  INSERT INTO public.name_checks(profile_id, subject, checked_text, state, since, home_country_code)
  SELECT p.user_id, 'alias', lower(p.seller_alias), 'unchecked', now(), p.home_country_code
    FROM public.profiles p WHERE p.seller_alias IS NOT NULL
  ON CONFLICT (profile_id, subject) DO NOTHING;
  GET DIAGNOSTICS v_n = ROW_COUNT;
  IF v_n <> 0 THEN RAISE EXCEPTION 'BF-4 second run inserted %', v_n; END IF;
  IF EXISTS (SELECT 1 FROM public.profiles p WHERE p.seller_alias IS NOT NULL
               AND NOT EXISTS (SELECT 1 FROM public.name_checks c WHERE c.profile_id = p.user_id AND c.subject = 'alias')) THEN
    RAISE EXCEPTION 'BF-5 an alias still has no row'; END IF;

  RAISE EXCEPTION 'M1 proof ok';
 EXCEPTION WHEN OTHERS THEN IF SQLERRM <> 'M1 proof ok' THEN RAISE; END IF; END;
 IF EXISTS (SELECT 1 FROM auth.users WHERE id IN (v_u1,v_u2,v_u3))
    OR EXISTS (SELECT 1 FROM public.name_checks WHERE profile_id IN (v_u1,v_u2,v_u3)) THEN
   RAISE EXCEPTION 'BF rollback failed'; END IF;
END;
$proof$;

-- The backfill itself.
INSERT INTO public.name_checks(profile_id, subject, checked_text, state, since, home_country_code)
SELECT p.user_id, 'alias', lower(p.seller_alias), 'unchecked', now(), p.home_country_code
  FROM public.profiles p
 WHERE p.seller_alias IS NOT NULL
ON CONFLICT (profile_id, subject) DO NOTHING;

-- Read-back: no alias is left without a row.
DO $rb$
BEGIN
  IF EXISTS (SELECT 1 FROM public.profiles p WHERE p.seller_alias IS NOT NULL
               AND NOT EXISTS (SELECT 1 FROM public.name_checks c WHERE c.profile_id = p.user_id AND c.subject = 'alias')) THEN
    RAISE EXCEPTION 'M1 read-back: an alias has no name_checks row'; END IF;
END;
$rb$;

INSERT INTO public.migration_marks(version) VALUES('20261029220000');