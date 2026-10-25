-- Foundations turn 15 M2 (2026-10-25), operator ruling: nullable audit arguments.
-- e2e-areas: posting, admin-categories, admin-services
-- No application caller exists yet; preserve the INSERT body and service-only access.
DROP FUNCTION public.ai_record_call(text,text,integer,text,uuid,text,text,integer,integer,boolean);

CREATE FUNCTION public.ai_record_call(
  p_feature text, p_task text, p_task_version integer, p_model text,
  p_input_hash text, p_outcome text, p_latency_ms integer, p_fake boolean,
  p_actor uuid DEFAULT NULL, p_provider_status integer DEFAULT NULL
)
RETURNS uuid
LANGUAGE plpgsql
VOLATILE SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
  v_id uuid;
BEGIN
  INSERT INTO public.ai_calls (
    feature, task, task_version, model, actor_id, input_hash, outcome, provider_status, latency_ms, fake
  ) VALUES (
    p_feature, p_task, p_task_version, p_model, p_actor, p_input_hash, p_outcome, p_provider_status, p_latency_ms, p_fake
  ) RETURNING id INTO v_id;
  RETURN v_id;
END;
$function$;
REVOKE ALL ON FUNCTION public.ai_record_call(text,text,integer,text,text,text,integer,boolean,uuid,integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.ai_record_call(text,text,integer,text,text,text,integer,boolean,uuid,integer) TO service_role;

-- Behaviour-only proof: every row belongs to this e2e-mig- scratch identity/feature.
DO $proof$
DECLARE
  v_feature text := 'e2e-mig-' || replace(gen_random_uuid()::text, '-', '');
  v_actor uuid := gen_random_uuid();
  v_email text := 'e2e-mig-' || v_actor::text || '@example.invalid';
  v_hash text := repeat('b', 64);
  v_omitted uuid;
  v_explicit uuid;
  v_role text;
BEGIN
  IF to_regprocedure('public.ai_record_call(text,text,integer,text,uuid,text,text,integer,integer,boolean)') IS NOT NULL THEN
    RAISE EXCEPTION 'ai audit M2 proof: old signature remains';
  END IF;
  FOREACH v_role IN ARRAY ARRAY['anon','authenticated'] LOOP
    IF has_function_privilege(v_role, 'public.ai_record_call(text,text,integer,text,text,text,integer,boolean,uuid,integer)', 'EXECUTE') THEN
      RAISE EXCEPTION 'ai audit M2 proof: browser can execute new signature: %', v_role;
    END IF;
  END LOOP;
  IF NOT has_function_privilege('service_role', 'public.ai_record_call(text,text,integer,text,text,text,integer,boolean,uuid,integer)', 'EXECUTE') THEN
    RAISE EXCEPTION 'ai audit M2 proof: service cannot execute new signature';
  END IF;

  INSERT INTO public.ai_features (feature, unit, unit_cost_microusd) VALUES (v_feature, 'call', 0);
  -- The normal signup trigger creates the proof's own profile and base role.
  INSERT INTO auth.users (id, email, raw_user_meta_data, created_at, updated_at)
  VALUES (v_actor, v_email, '{}'::jsonb, now(), now());
  -- e2e-mig- identity only: never borrow a real profile for the FK proof.
  IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE user_id=v_actor) THEN
    RAISE EXCEPTION 'ai audit M2 proof: scratch profile missing';
  END IF;

  v_omitted := public.ai_record_call(v_feature, 'name_check', 1, 'e2e-model', v_hash, 'ok', 3, true);
  IF v_omitted IS NULL OR (SELECT count(*) FROM public.ai_calls WHERE feature=v_feature) <> 1
     OR NOT EXISTS (SELECT 1 FROM public.ai_calls WHERE id=v_omitted AND feature=v_feature
       AND task='name_check' AND task_version=1 AND model='e2e-model' AND input_hash=v_hash
       AND outcome='ok' AND latency_ms=3 AND fake AND actor_id IS NULL AND provider_status IS NULL) THEN
    RAISE EXCEPTION 'ai audit M2 proof: omitted arguments did not write exact null row';
  END IF;

  v_explicit := public.ai_record_call(v_feature, 'name_check', 1, 'e2e-model', v_hash, 'ok', 7, false, v_actor, 201);
  IF v_explicit IS NULL OR (SELECT count(*) FROM public.ai_calls WHERE feature=v_feature) <> 2
     OR NOT EXISTS (SELECT 1 FROM public.ai_calls WHERE id=v_explicit AND feature=v_feature
       AND task='name_check' AND task_version=1 AND model='e2e-model' AND input_hash=v_hash
       AND outcome='ok' AND latency_ms=7 AND NOT fake AND actor_id=v_actor AND provider_status=201) THEN
    RAISE EXCEPTION 'ai audit M2 proof: explicit arguments did not write exact row';
  END IF;

  DELETE FROM public.ai_calls WHERE feature=v_feature;
  DELETE FROM public.ai_features WHERE feature=v_feature;
  -- e2e-mig- scratch identity: normal FK cascades remove its profile/base role/directory.
  DELETE FROM auth.users WHERE id=v_actor AND email=v_email;
  IF EXISTS (SELECT 1 FROM public.ai_calls WHERE feature=v_feature OR id IN (v_omitted,v_explicit))
     OR EXISTS (SELECT 1 FROM public.ai_features WHERE feature=v_feature) THEN
    RAISE EXCEPTION 'ai audit M2 proof: scratch audit/feature residue';
  END IF;
  -- e2e-mig- scratch identity only.
  IF EXISTS (SELECT 1 FROM auth.users WHERE id=v_actor OR email=v_email)
     OR EXISTS (SELECT 1 FROM public.profiles WHERE user_id=v_actor)
     OR EXISTS (SELECT 1 FROM public.user_roles WHERE user_id=v_actor)
     OR EXISTS (SELECT 1 FROM public.user_directory WHERE user_id=v_actor) THEN
    RAISE EXCEPTION 'ai audit M2 proof: scratch identity residue';
  END IF;
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261025150000');