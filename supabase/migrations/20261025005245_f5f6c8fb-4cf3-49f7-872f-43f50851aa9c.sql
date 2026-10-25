-- Foundations turn 15 (2026-10-25), DEC-237 / DEC-247.
-- e2e-areas: posting, admin-categories, admin-services
-- Content-free per-call attribution; service-only writes and daily 90-day retention.
CREATE TABLE public.ai_calls (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  feature text NOT NULL REFERENCES public.ai_features(feature) ON UPDATE CASCADE,
  task text NOT NULL CHECK (task ~ '^[a-z][a-z0-9_]{0,39}$'),
  task_version integer NOT NULL CHECK (task_version > 0),
  model text NOT NULL CHECK (char_length(model) BETWEEN 1 AND 80),
  actor_id uuid NULL REFERENCES public.profiles(user_id) ON DELETE SET NULL,
  input_hash text NOT NULL CHECK (input_hash ~ '^[0-9a-f]{64}$'),
  outcome text NOT NULL CHECK (outcome IN ('ok','featureOff','budget','unavailable','timeout','providerError','unusableAnswer')),
  provider_status integer NULL CHECK (provider_status BETWEEN 100 AND 599),
  latency_ms integer NOT NULL CHECK (latency_ms >= 0),
  fake boolean NOT NULL DEFAULT false
);
REVOKE ALL ON public.ai_calls FROM PUBLIC, anon, authenticated;
GRANT ALL ON public.ai_calls TO service_role;
ALTER TABLE public.ai_calls ENABLE ROW LEVEL SECURITY;
CREATE POLICY ai_calls_deny_select ON public.ai_calls FOR SELECT TO anon, authenticated USING (false);
CREATE POLICY ai_calls_deny_insert ON public.ai_calls FOR INSERT TO anon, authenticated WITH CHECK (false);
CREATE POLICY ai_calls_deny_update ON public.ai_calls FOR UPDATE TO anon, authenticated USING (false) WITH CHECK (false);
CREATE POLICY ai_calls_deny_delete ON public.ai_calls FOR DELETE TO anon, authenticated USING (false);
CREATE INDEX ai_calls_created_at_idx ON public.ai_calls (created_at DESC);
CREATE INDEX ai_calls_feature_created_at_idx ON public.ai_calls (feature, created_at DESC);
CREATE INDEX ai_calls_actor_id_idx ON public.ai_calls (actor_id) WHERE actor_id IS NOT NULL;
CREATE TRIGGER ai_calls_updated_at BEFORE UPDATE ON public.ai_calls
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.ai_calls_prune_runs (
  id bigserial PRIMARY KEY,
  ran_at timestamptz NOT NULL DEFAULT now(),
  deleted integer NOT NULL CHECK (deleted >= 0),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
REVOKE ALL ON public.ai_calls_prune_runs FROM PUBLIC, anon, authenticated;
GRANT ALL ON public.ai_calls_prune_runs TO service_role;
ALTER TABLE public.ai_calls_prune_runs ENABLE ROW LEVEL SECURITY;
CREATE POLICY ai_calls_prune_runs_deny_select ON public.ai_calls_prune_runs FOR SELECT TO anon, authenticated USING (false);
CREATE POLICY ai_calls_prune_runs_deny_insert ON public.ai_calls_prune_runs FOR INSERT TO anon, authenticated WITH CHECK (false);
CREATE POLICY ai_calls_prune_runs_deny_update ON public.ai_calls_prune_runs FOR UPDATE TO anon, authenticated USING (false) WITH CHECK (false);
CREATE POLICY ai_calls_prune_runs_deny_delete ON public.ai_calls_prune_runs FOR DELETE TO anon, authenticated USING (false);
REVOKE ALL ON SEQUENCE public.ai_calls_prune_runs_id_seq FROM PUBLIC, anon, authenticated;
GRANT ALL ON SEQUENCE public.ai_calls_prune_runs_id_seq TO service_role;
CREATE TRIGGER ai_calls_prune_runs_updated_at BEFORE UPDATE ON public.ai_calls_prune_runs
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE FUNCTION public.ai_calls_prune()
RETURNS integer
LANGUAGE plpgsql
VOLATILE SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
  v_count integer;
BEGIN
  DELETE FROM public.ai_calls WHERE created_at < now() - interval '90 days';
  GET DIAGNOSTICS v_count = ROW_COUNT;
  INSERT INTO public.ai_calls_prune_runs (deleted) VALUES (v_count);
  DELETE FROM public.ai_calls_prune_runs WHERE ran_at < now() - interval '14 days';
  RETURN v_count;
END;
$function$;
REVOKE ALL ON FUNCTION public.ai_calls_prune() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.ai_calls_prune() TO service_role;

DO $cron$
BEGIN
  IF EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'ai-calls-prune') THEN
    PERFORM cron.unschedule('ai-calls-prune');
  END IF;
  PERFORM cron.schedule('ai-calls-prune', '17 4 * * *', 'SELECT public.ai_calls_prune()');
END;
$cron$;

CREATE FUNCTION public.ai_record_call(
  p_feature text, p_task text, p_task_version integer, p_model text,
  p_actor uuid, p_input_hash text, p_outcome text, p_provider_status integer,
  p_latency_ms integer, p_fake boolean
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
REVOKE ALL ON FUNCTION public.ai_record_call(text,text,integer,text,uuid,text,text,integer,integer,boolean) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.ai_record_call(text,text,integer,text,uuid,text,text,integer,integer,boolean) TO service_role;

-- Behaviour-only proof: scratch rows are removed; no existing feature is touched.
DO $proof$
DECLARE
  v_feature text := 'e2e-a-' || replace(gen_random_uuid()::text, '-', '');
  v_unknown text := 'e2e-m-' || replace(gen_random_uuid()::text, '-', '');
  v_hash text := repeat('a', 64);
  v_fresh uuid;
  v_old uuid;
  v_boundary uuid;
  v_heartbeat bigint;
  v_old_heartbeat bigint;
  v_boundary_heartbeat bigint;
  v_role text;
  v_table text;
  v_function text;
  v_count integer;
  v_before bigint;
  v_refused boolean;
BEGIN
  FOREACH v_table IN ARRAY ARRAY['ai_calls', 'ai_calls_prune_runs'] LOOP
    IF NOT (SELECT relrowsecurity FROM pg_class WHERE oid = ('public.' || v_table)::regclass) THEN
      RAISE EXCEPTION 'ai audit proof: RLS off on %', v_table;
    END IF;
    SELECT count(*) INTO v_count FROM pg_policy WHERE polrelid = ('public.' || v_table)::regclass;
    IF v_count <> 4 OR EXISTS (
      SELECT 1 FROM pg_policy
      WHERE polrelid = ('public.' || v_table)::regclass AND (
        polname NOT IN (v_table || '_deny_select', v_table || '_deny_insert', v_table || '_deny_update', v_table || '_deny_delete')
        OR polroles <> ARRAY[(SELECT oid FROM pg_roles WHERE rolname='anon'), (SELECT oid FROM pg_roles WHERE rolname='authenticated')]::oid[]
        OR (polcmd IN ('r','w','d') AND pg_get_expr(polqual, polrelid) IS DISTINCT FROM 'false')
        OR (polcmd IN ('a','w') AND pg_get_expr(polwithcheck, polrelid) IS DISTINCT FROM 'false')
      )
    ) THEN RAISE EXCEPTION 'ai audit proof: not exactly four closed policies on %', v_table; END IF;
    FOREACH v_role IN ARRAY ARRAY['anon','authenticated'] LOOP
      IF has_table_privilege(v_role, 'public.' || v_table, 'SELECT,INSERT,UPDATE,DELETE,TRUNCATE,REFERENCES,TRIGGER')
         OR has_any_column_privilege(v_role, 'public.' || v_table, 'SELECT,INSERT,UPDATE,REFERENCES') THEN
        RAISE EXCEPTION 'ai audit proof: browser table privilege %, %', v_role, v_table;
      END IF;
    END LOOP;
  END LOOP;
  FOREACH v_function IN ARRAY ARRAY[
    'public.ai_record_call(text,text,integer,text,uuid,text,text,integer,integer,boolean)',
    'public.ai_calls_prune()'
  ] LOOP
    FOREACH v_role IN ARRAY ARRAY['anon','authenticated'] LOOP
      IF has_function_privilege(v_role, v_function, 'EXECUTE') THEN
        RAISE EXCEPTION 'ai audit proof: browser function privilege %, %', v_role, v_function;
      END IF;
    END LOOP;
    IF NOT has_function_privilege('service_role', v_function, 'EXECUTE') THEN
      RAISE EXCEPTION 'ai audit proof: service cannot execute %', v_function;
    END IF;
  END LOOP;
  IF has_sequence_privilege('anon', 'public.ai_calls_prune_runs_id_seq', 'USAGE,SELECT,UPDATE')
     OR has_sequence_privilege('authenticated', 'public.ai_calls_prune_runs_id_seq', 'USAGE,SELECT,UPDATE') THEN
    RAISE EXCEPTION 'ai audit proof: browser sequence privilege';
  END IF;

  INSERT INTO public.ai_features (feature, unit, unit_cost_microusd) VALUES (v_feature, 'call', 0);
  v_fresh := public.ai_record_call(v_feature, 'name_check', 1, 'e2e-model', NULL, v_hash, 'ok', 200, 1, true);
  IF v_fresh IS NULL OR (SELECT count(*) FROM public.ai_calls WHERE feature=v_feature) <> 1
     OR NOT EXISTS (SELECT 1 FROM public.ai_calls WHERE id=v_fresh AND input_hash=v_hash AND actor_id IS NULL
        AND task='name_check' AND task_version=1 AND model='e2e-model' AND outcome='ok'
        AND provider_status=200 AND latency_ms=1 AND fake) THEN
    RAISE EXCEPTION 'ai audit proof: record door did not write the exact row';
  END IF;
  v_refused := false;
  BEGIN
    PERFORM public.ai_record_call(v_feature, 'name_check', 1, 'e2e-model', NULL, 'bad-hash', 'ok', 200, 1, false);
  EXCEPTION WHEN check_violation THEN v_refused := true;
  END;
  IF NOT v_refused THEN RAISE EXCEPTION 'ai audit proof: bad hash accepted'; END IF;
  v_refused := false;
  BEGIN
    PERFORM public.ai_record_call(v_feature, 'name_check', 1, 'e2e-model', NULL, v_hash, 'bad-outcome', 200, 1, false);
  EXCEPTION WHEN check_violation THEN v_refused := true;
  END;
  IF NOT v_refused THEN RAISE EXCEPTION 'ai audit proof: bad outcome accepted'; END IF;
  v_refused := false;
  BEGIN
    PERFORM public.ai_record_call(v_unknown, 'name_check', 1, 'e2e-model', NULL, v_hash, 'ok', 200, 1, false);
  EXCEPTION WHEN foreign_key_violation THEN v_refused := true;
  END;
  IF NOT v_refused THEN RAISE EXCEPTION 'ai audit proof: unknown feature accepted'; END IF;
  IF (SELECT count(*) FROM public.ai_calls WHERE feature IN (v_feature,v_unknown)) <> 1 THEN
    RAISE EXCEPTION 'ai audit proof: refusal left a row';
  END IF;

  v_old := public.ai_record_call(v_feature, 'name_check', 1, 'e2e-model', NULL, v_hash, 'ok', 200, 1, false);
  UPDATE public.ai_calls SET created_at=now()-interval '91 days' WHERE id=v_old;
  v_boundary := public.ai_record_call(v_feature, 'name_check', 1, 'e2e-model', NULL, v_hash, 'ok', 200, 1, false);
  UPDATE public.ai_calls SET created_at=now()-interval '90 days' WHERE id=v_boundary;
  INSERT INTO public.ai_calls_prune_runs (ran_at, deleted) VALUES (now()-interval '15 days', 0) RETURNING id INTO v_old_heartbeat;
  INSERT INTO public.ai_calls_prune_runs (ran_at, deleted) VALUES (now()-interval '14 days', 0) RETURNING id INTO v_boundary_heartbeat;
  SELECT count(*) INTO v_before FROM public.ai_calls_prune_runs;
  v_count := public.ai_calls_prune();
  IF v_count <> 1 OR EXISTS (SELECT 1 FROM public.ai_calls WHERE id=v_old)
     OR NOT EXISTS (SELECT 1 FROM public.ai_calls WHERE id=v_fresh)
     OR NOT EXISTS (SELECT 1 FROM public.ai_calls WHERE id=v_boundary)
     OR (SELECT count(*) FROM public.ai_calls_prune_runs) <> v_before
     OR EXISTS (SELECT 1 FROM public.ai_calls_prune_runs WHERE id=v_old_heartbeat)
     OR NOT EXISTS (SELECT 1 FROM public.ai_calls_prune_runs WHERE id=v_boundary_heartbeat) THEN
    RAISE EXCEPTION 'ai audit proof: 90-day purge, fresh/boundary retention or heartbeat failed';
  END IF;
  SELECT id INTO STRICT v_heartbeat FROM public.ai_calls_prune_runs WHERE id<>v_boundary_heartbeat AND deleted=1;
  IF (SELECT count(*) FROM cron.job WHERE jobname='ai-calls-prune' AND schedule='17 4 * * *'
      AND command='SELECT public.ai_calls_prune()') <> 1 THEN
    RAISE EXCEPTION 'ai audit proof: daily schedule missing';
  END IF;
  DELETE FROM public.ai_calls WHERE feature=v_feature;
  DELETE FROM public.ai_features WHERE feature=v_feature;
  DELETE FROM public.ai_calls_prune_runs WHERE id IN (v_heartbeat,v_boundary_heartbeat);
  IF EXISTS (SELECT 1 FROM public.ai_calls WHERE feature IN (v_feature,v_unknown))
     OR EXISTS (SELECT 1 FROM public.ai_features WHERE feature=v_feature)
     OR EXISTS (SELECT 1 FROM public.ai_calls_prune_runs WHERE id IN (v_heartbeat,v_old_heartbeat,v_boundary_heartbeat)) THEN
    RAISE EXCEPTION 'ai audit proof: scratch residue';
  END IF;
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261025140000');