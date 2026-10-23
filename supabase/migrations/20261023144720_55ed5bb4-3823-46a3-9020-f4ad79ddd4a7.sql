-- e2e-areas: auth, legal
-- Bundle 22 turn 32 — M21. D230: the signup trigger records the sign-up form's tick.
--
-- WHY: the sign-up form's agreement tick travels as auth metadata legal_accept {version_ids, language, adult,
-- data_consent}. handle_new_user records an acceptance only for versions that are published and in force at that
-- moment, of the gate's kinds (terms, privacy and the E2E scratch kinds — legal-kinds.ts legalRole), applicable to the
-- account's country, with adult true. Anything else is ignored and never refuses a sign-up (RAISE WARNING); the
-- acceptance screen asks after sign-in (D227). The function is redeclared whole from its live definition
-- (ethio-prod, pg_get_functiondef, bundle 22 turn 32 B0); the only change is the three DECLARE lines and the one
-- block after the profiles INSERT (the acceptance row references profiles) and before the user_roles INSERT.
CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_name text;
  v_country char(2);
  v_source text;
  v_accept jsonb;
  v_lang text;
  v_vid uuid;
BEGIN
  v_name := COALESCE(
    NULLIF(NEW.raw_user_meta_data->>'full_name',''),
    NULLIF(NEW.raw_user_meta_data->>'name',''),
    split_part(NEW.email, '@', 1),
    'user'
  );
  v_country := upper(NULLIF(NEW.raw_user_meta_data->>'country_guess',''));
  IF v_country IS NULL OR NOT EXISTS (SELECT 1 FROM public.countries WHERE code = v_country) THEN
    v_country := NULL;
    v_source := 'unknown';
  ELSE
    v_source := 'ip_guess';
  END IF;

  INSERT INTO public.user_directory (user_id, home_country_code, country_source)
    VALUES (NEW.id, v_country, v_source);
  INSERT INTO public.profiles (user_id, home_country_code, country_source, display_name)
    VALUES (NEW.id, v_country, v_source, v_name);

  -- D230 (bundle 22 turn 32) — the sign-up form's tick travels as metadata legal_accept {version_ids, language, adult, data_consent}
  -- and is recorded here for the versions in force of the gate's kinds; anything else is ignored: a sign-up is never refused by this block
  -- (the acceptance screen asks after sign-in — D227).
  BEGIN
    v_accept := NEW.raw_user_meta_data -> 'legal_accept';
    IF jsonb_typeof(v_accept) = 'object'
       AND jsonb_typeof(v_accept -> 'version_ids') = 'array'
       AND (v_accept ->> 'adult')::boolean IS TRUE THEN
      v_lang := v_accept ->> 'language';
      IF v_lang IS NULL OR NOT EXISTS (SELECT 1 FROM public.languages l WHERE l.code = v_lang AND l.enabled_public) THEN
        v_lang := 'en';
      END IF;
      FOR v_vid IN
        SELECT (e #>> '{}')::uuid FROM jsonb_array_elements(v_accept -> 'version_ids') e
         WHERE (e #>> '{}') ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
      LOOP
        INSERT INTO public.legal_acceptances
          (user_id, version_id, language, method, adult_confirmed, home_country_code, data_consent)
        SELECT NEW.id, v.id,
               CASE WHEN v_lang IN ('en', 'am')
                      OR EXISTS (SELECT 1 FROM public.legal_version_texts t WHERE t.version_id = v.id AND t.language = v_lang)
                    THEN v_lang ELSE 'en' END,
               'signup', true, v_country,
               (d.kind = 'privacy' OR d.kind ~ '^e2e-[a-z0-9-]*-privacy$') AND (v_accept ->> 'data_consent')::boolean IS TRUE
          FROM public.legal_versions v
          JOIN public.legal_documents d ON d.id = v.document_id
         WHERE v.id = v_vid
           AND v.status = 'published'
           AND v.effective_at <= now()
           AND (d.kind IN ('terms', 'privacy') OR d.kind ~ '^e2e-[a-z0-9-]*-(terms|privacy)$')
           AND (d.country_code IS NULL OR d.country_code = v_country)
        ON CONFLICT (user_id, version_id) DO NOTHING;
      END LOOP;
    END IF;
  EXCEPTION WHEN others THEN
    RAISE WARNING 'handle_new_user: legal_accept metadata ignored (%)', SQLERRM;
  END;

  -- Phase R1: every account carries the base 'user' role.
  INSERT INTO public.user_roles (user_id, role_id)
    VALUES (NEW.id, (SELECT id FROM public.roles WHERE name = 'user'))
    ON CONFLICT DO NOTHING;

  RETURN NEW;
END; $function$;

-- The live catalogue's ACL is {postgres=X/postgres}: no browser role, no service_role grant. Restated as it stands.
REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;

-- Proofs (B4): the SQL only; no auth.users row is created. The trigger's behaviour is proven by SU-4.
DO $proof$
DECLARE
  v_def text := pg_get_functiondef('public.handle_new_user()'::regprocedure);
  v_needle text;
BEGIN
  FOREACH v_needle IN ARRAY ARRAY['''legal_accept''', '''signup''', 'jsonb_array_elements'] LOOP
    IF (length(v_def) - length(replace(v_def, v_needle, ''))) / length(v_needle) <> 1 THEN
      RAISE EXCEPTION 'M21 proof: % does not appear exactly once in handle_new_user', v_needle;
    END IF;
  END LOOP;
  IF NOT (SELECT prosecdef FROM pg_proc WHERE oid = 'public.handle_new_user()'::regprocedure) THEN
    RAISE EXCEPTION 'M21 proof: handle_new_user is not SECURITY DEFINER';
  END IF;
  IF (SELECT proconfig FROM pg_proc WHERE oid = 'public.handle_new_user()'::regprocedure)
     IS DISTINCT FROM ARRAY['search_path=public'] THEN
    RAISE EXCEPTION 'M21 proof: handle_new_user search_path changed';
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger t
     WHERE t.tgrelid = 'auth.users'::regclass AND t.tgname = 'on_auth_user_created' AND NOT t.tgisinternal
       AND t.tgfoid = 'public.handle_new_user()'::regprocedure AND t.tgenabled = 'O'
       AND (t.tgtype & 1) = 1 AND (t.tgtype & 2) = 0 AND (t.tgtype & 4) = 4
  ) THEN
    RAISE EXCEPTION 'M21 proof: on_auth_user_created is not AFTER INSERT FOR EACH ROW and enabled on auth.users';
  END IF;
  IF has_function_privilege('anon', 'public.handle_new_user()', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.handle_new_user()', 'EXECUTE') THEN
    RAISE EXCEPTION 'M21 proof: a browser role may execute handle_new_user';
  END IF;
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261024030000') ON CONFLICT DO NOTHING;