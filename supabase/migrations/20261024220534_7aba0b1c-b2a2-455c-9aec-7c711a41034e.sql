CREATE OR REPLACE FUNCTION public.import_gate_audit(p_family text, p_event text, p_batch uuid, p_counts jsonb)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_actor uuid := auth.uid();
  v_resource text;
  v_verb text;
BEGIN
  IF v_actor IS NULL THEN
    RAISE EXCEPTION 'permission denied: not signed in' USING ERRCODE = '42501';
  END IF;
  IF coalesce(p_family, '') = '' OR p_event NOT IN ('preview', 'commit', 'undo', 'refused') THEN
    RAISE EXCEPTION 'import: unknown gate event' USING ERRCODE = '22023';
  END IF;
  SELECT f.resource, f.verb INTO v_resource, v_verb
    FROM (VALUES ('attributes', 'categories', 'import'),
                 ('categories', 'categories', 'import'),
                 ('locations', 'locations', 'import'),
                 ('translations', 'translations', 'update')) AS f(family, resource, verb)
   WHERE f.family = p_family;
  IF v_resource IS NULL OR NOT public.has_permission(v_actor, v_resource, v_verb) THEN
    RAISE EXCEPTION 'permission denied: import %', p_family USING ERRCODE = '42501';
  END IF;

  INSERT INTO public.audit_log(actor_id, action, entity_type, entity_id, meta)
  VALUES (
    v_actor,
    'import.' || p_event,
    'import:' || p_family,
    p_batch,
    public.import_sanitize(coalesce(p_counts, '{}'::jsonb))
  );
END;
$function$
;

REVOKE ALL ON FUNCTION public.import_gate_audit(text, text, uuid, jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.import_gate_audit(text, text, uuid, jsonb) TO authenticated;
GRANT ALL ON FUNCTION public.import_gate_audit(text, text, uuid, jsonb) TO service_role;

DO $proof$
DECLARE
  v_definition text;
  v_definer boolean;
  v_config text[];
  v_volatility "char";
BEGIN
  SELECT pg_get_functiondef(p.oid), p.prosecdef, p.proconfig, p.provolatile
    INTO v_definition, v_definer, v_config, v_volatility
    FROM pg_proc p
   WHERE p.oid = 'public.import_gate_audit(text, text, uuid, jsonb)'::regprocedure;
  IF position('(''translations'', ''translations'', ''update'')' IN v_definition) = 0
     OR position('(''translations'', ''translations'', ''manage'')' IN v_definition) > 0
     OR v_definer IS DISTINCT FROM true
     OR v_config IS DISTINCT FROM ARRAY['search_path=public']::text[]
     OR v_volatility IS DISTINCT FROM 'v'::"char" THEN
    RAISE EXCEPTION 'IMD-7: import audit permission or function header differs';
  END IF;
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261025120000') ON CONFLICT DO NOTHING;