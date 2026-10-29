-- Foundations turn A2: services:view last-call read (DEC-247), scratch-only proof.
-- ACR-P1 deny; P2 core ACL; P3 keyset; P4 filters; P5 retention; P6 person privacy.
-- Existing indexes cover time and feature/time. No planner-choice assertion.
CREATE OR REPLACE FUNCTION public.admin_list_ai_calls_core(
  p_task text, p_outcome text, p_before_at timestamptz, p_before_id uuid,
  p_limit integer, p_hide_e2e boolean, p_feature text, p_show_person boolean)
RETURNS jsonb LANGUAGE sql STABLE SECURITY INVOKER SET search_path TO 'public'
AS $core$
  WITH page AS (
    SELECT c.* FROM public.ai_calls c
    WHERE c.created_at > now() - interval '90 days'
      AND (NOT p_hide_e2e OR c.feature !~ '^e2e-')
      AND (p_feature IS NULL OR c.feature = p_feature)
      AND (p_task IS NULL OR c.task = p_task)
      AND (p_outcome IS NULL OR c.outcome = p_outcome)
      AND (p_before_at IS NULL OR (c.created_at,c.id) < (p_before_at,p_before_id))
    ORDER BY c.created_at DESC,c.id DESC LIMIT p_limit + 1
  ), shown AS (
    SELECT * FROM page ORDER BY created_at DESC,id DESC LIMIT p_limit
  )
  SELECT jsonb_build_object('rows',coalesce((
    SELECT jsonb_agg(jsonb_build_object(
      'id',c.id,'created_at',c.created_at,'feature',c.feature,'task',c.task,
      'task_version',c.task_version,'model',c.model,'outcome',c.outcome,
      'provider_status',c.provider_status,'latency_ms',c.latency_ms,'fake',c.fake,
      'actor',CASE WHEN c.actor_id IS NULL THEN jsonb_build_object('kind','system')
                   WHEN p_show_person THEN jsonb_build_object('kind','person','name',p.display_name)
                   ELSE jsonb_build_object('kind','hidden') END)
      ORDER BY c.created_at DESC,c.id DESC)
      FROM shown c LEFT JOIN public.profiles p ON p.user_id=c.actor_id),'[]'::jsonb),
    'next',CASE WHEN (SELECT count(*) FROM page)>p_limit THEN (
      SELECT jsonb_build_object('at',created_at,'id',id) FROM shown
      ORDER BY created_at ASC,id ASC LIMIT 1) ELSE NULL END);
$core$;
REVOKE ALL ON FUNCTION public.admin_list_ai_calls_core(text,text,timestamptz,uuid,integer,boolean,text,boolean) FROM PUBLIC,anon,authenticated,service_role;

CREATE OR REPLACE FUNCTION public.admin_list_ai_calls(
  p_task text DEFAULT NULL, p_outcome text DEFAULT NULL,
  p_before_at timestamptz DEFAULT NULL,p_before_id uuid DEFAULT NULL,
  p_limit integer DEFAULT 50)
RETURNS jsonb LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path TO 'public'
AS $door$
DECLARE v_uid uuid := auth.uid();
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF NOT public.has_permission(v_uid,'services','view') THEN RAISE EXCEPTION 'permission denied'; END IF;
  IF p_limit IS NULL OR p_limit<1 OR p_limit>100 THEN RAISE EXCEPTION 'badValue:limit'; END IF;
  IF p_task IS NOT NULL AND p_task !~ '^[a-z][a-z0-9_]{0,39}$' THEN RAISE EXCEPTION 'badValue:task'; END IF;
  IF p_outcome IS NOT NULL AND p_outcome NOT IN ('ok','featureOff','budget','unavailable','timeout','providerError','unusableAnswer') THEN RAISE EXCEPTION 'badValue:outcome'; END IF;
  IF (p_before_at IS NULL) <> (p_before_id IS NULL) THEN RAISE EXCEPTION 'badValue:cursor'; END IF;
  -- profiles:view is the existing staff users console's permission; no new permission.
  RETURN public.admin_list_ai_calls_core(p_task,p_outcome,p_before_at,p_before_id,p_limit,true,NULL,
    public.has_permission(v_uid,'profiles','view'));
END;
$door$;
REVOKE ALL ON FUNCTION public.admin_list_ai_calls(text,text,timestamptz,uuid,integer) FROM PUBLIC,anon,authenticated,service_role;
GRANT EXECUTE ON FUNCTION public.admin_list_ai_calls(text,text,timestamptz,uuid,integer) TO authenticated;
GRANT ALL ON FUNCTION public.admin_list_ai_calls(text,text,timestamptz,uuid,integer) TO service_role;

DO $proof$
DECLARE
 v_uid uuid := gen_random_uuid(); v_role uuid := gen_random_uuid();
 v_feature text := 'e2e-a2-' || substr(replace(gen_random_uuid()::text,'-',''),1,16);
 v_one jsonb; v_two jsonb;
BEGIN
 IF has_function_privilege('anon','public.admin_list_ai_calls(text,text,timestamptz,uuid,integer)','EXECUTE')
 OR NOT has_function_privilege('authenticated','public.admin_list_ai_calls(text,text,timestamptz,uuid,integer)','EXECUTE')
 OR EXISTS (SELECT 1 FROM pg_proc p, LATERAL aclexplode(p.proacl) a
   WHERE p.oid='public.admin_list_ai_calls_core(text,text,timestamptz,uuid,integer,boolean,text,boolean)'::regprocedure
     AND a.grantee<>p.proowner AND a.privilege_type='EXECUTE')
 OR (SELECT prosecdef FROM pg_proc WHERE oid='public.admin_list_ai_calls_core(text,text,timestamptz,uuid,integer,boolean,text,boolean)'::regprocedure)
 THEN RAISE EXCEPTION 'ACR-P2 ACL/security'; END IF;
 BEGIN
  INSERT INTO auth.users(id,email,raw_user_meta_data,aud,role,created_at,updated_at)
  VALUES(v_uid,'e2e-a2-'||v_uid||'@example.invalid','{}','authenticated','authenticated',now(),now());
  UPDATE public.profiles SET display_name=v_feature WHERE user_id=v_uid;
  INSERT INTO public.ai_features(feature,enabled,unit,unit_cost_microusd) VALUES(v_feature,true,'call',0);
  INSERT INTO public.ai_calls(feature,task,task_version,model,actor_id,input_hash,outcome,latency_ms,created_at)
  SELECT v_feature,CASE WHEN n=3 THEN 'writing_helper' ELSE 'name_check' END,1,'e2e-a2-model',
    CASE WHEN n=2 THEN NULL ELSE v_uid END,repeat('a',64),CASE WHEN n=3 THEN 'timeout' ELSE 'ok' END,n,
    now()-CASE WHEN n=4 THEN interval '89 days' WHEN n=5 THEN interval '91 days' ELSE n*interval '1 minute' END
  FROM generate_series(1,5) n;
  PERFORM set_config('request.jwt.claims','{}',true);
  BEGIN PERFORM public.admin_list_ai_calls(); RAISE EXCEPTION 'ACR-P1 anonymous allowed';
  EXCEPTION WHEN OTHERS THEN IF SQLERRM<>'not authenticated' THEN RAISE; END IF; END;
  PERFORM set_config('request.jwt.claims',jsonb_build_object('sub',v_uid,'role','authenticated')::text,true);
  BEGIN PERFORM public.admin_list_ai_calls(); RAISE EXCEPTION 'ACR-P1 plain allowed';
  EXCEPTION WHEN OTHERS THEN IF SQLERRM<>'permission denied' THEN RAISE; END IF; END;
  -- Scratch role grants the existing permission (schema metadata, not a real user fixture).
  INSERT INTO public.roles(id,name) VALUES(v_role,v_feature);
  INSERT INTO public.role_permissions(role_id,permission_id)
  SELECT v_role,p.id FROM public.permissions p JOIN public.resources r ON r.id=p.resource_id
  WHERE r.name='services' AND p.action='view';
  INSERT INTO public.user_roles(user_id,role_id,scope_type) VALUES(v_uid,v_role,'global');
  IF NOT public.has_permission(v_uid,'services','view') OR public.has_permission(v_uid,'profiles','view')
  THEN RAISE EXCEPTION 'ACR-P1 scratch permissions'; END IF;
  -- Invalid input proves boundary accepts services:view before any audit read.
  BEGIN PERFORM public.admin_list_ai_calls(p_limit=>0); RAISE EXCEPTION 'ACR-P1 validation absent';
  EXCEPTION WHEN OTHERS THEN IF SQLERRM<>'badValue:limit' THEN RAISE; END IF; END;
  -- Prove core's private name projection and scratch page contract without widening the door.
  v_one:=public.admin_list_ai_calls_core(NULL,NULL,NULL,NULL,2,false,v_feature,false);
  v_two:=public.admin_list_ai_calls_core(NULL,NULL,(v_one->'next'->>'at')::timestamptz,(v_one->'next'->>'id')::uuid,2,false,v_feature,false);
  IF jsonb_array_length(v_one->'rows')<>2 OR jsonb_array_length(v_two->'rows')<>2 OR v_two->'next'<>'null'::jsonb
     OR EXISTS(SELECT 1 FROM jsonb_array_elements(v_one->'rows') a JOIN jsonb_array_elements(v_two->'rows') b ON a->>'id'=b->>'id')
     OR v_one->'rows'->0->'actor'->>'kind'<>'hidden' OR v_one->'rows'->1->'actor'->>'kind'<>'system'
     OR (v_two->'rows'->1->>'latency_ms')::integer<>4 THEN RAISE EXCEPTION 'ACR-P3/P5/P6 page or privacy'; END IF;
  v_one:=public.admin_list_ai_calls_core('writing_helper','timeout',NULL,NULL,50,false,v_feature,true);
  IF jsonb_array_length(v_one->'rows')<>1 OR v_one->'rows'->0->'actor'->>'name'<>v_feature
    OR v_one->'rows'->0 ? 'input_hash' OR v_one->'rows'->0 ? 'actor_id' THEN RAISE EXCEPTION 'ACR-P4/P6 filter or projection'; END IF;
  v_one:=public.admin_list_ai_calls_core(NULL,NULL,NULL,NULL,50,true,v_feature,true);
  IF jsonb_array_length(v_one->'rows')<>0 THEN RAISE EXCEPTION 'ACR-P4 e2e exclusion'; END IF;
  RAISE EXCEPTION 'A2 proof ok';
 EXCEPTION WHEN OTHERS THEN IF SQLERRM<>'A2 proof ok' THEN RAISE; END IF; END;
 IF EXISTS(SELECT 1 FROM public.ai_features WHERE feature=v_feature)
 OR EXISTS(SELECT 1 FROM auth.users WHERE id=v_uid) THEN RAISE EXCEPTION 'ACR rollback failed'; END IF;
END;
$proof$;
INSERT INTO public.migration_marks(version) VALUES('20261029190000');