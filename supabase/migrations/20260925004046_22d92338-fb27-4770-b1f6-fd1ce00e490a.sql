-- MIGRATION MARK 20260925010000 — INC-274 audit retention sweep for e2e-namespaced rows.
CREATE OR REPLACE FUNCTION public.maintenance_prune_e2e_audit(
  p_cutoff timestamptz,
  p_include_orphans boolean DEFAULT false,
  p_batch integer DEFAULT 20000
)
RETURNS bigint
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_deleted bigint := 0;
BEGIN
  IF auth.role() IS DISTINCT FROM 'service_role' AND session_user = 'authenticator' THEN
    RAISE EXCEPTION 'permission denied' USING ERRCODE = '42501';
  END IF;
  IF p_cutoff IS NULL THEN
    RAISE EXCEPTION 'maintenance_prune_e2e_audit requires a cutoff';
  END IF;
  IF p_batch IS NULL OR p_batch < 1 OR p_batch > 50000 THEN
    RAISE EXCEPTION 'maintenance_prune_e2e_audit batch must be 1..50000';
  END IF;

  PERFORM set_config('ethio.audit_maintenance', 'on', true);
  WITH doomed AS (
    SELECT a.id
      FROM public.audit_log a
      LEFT JOIN auth.users u ON u.id = a.actor_id
     WHERE a.created_at < p_cutoff
       AND (
             (u.email LIKE 'e2e+%' AND u.email LIKE '%@ethio-e2e.invalid')
          OR a.entity_id LIKE 'e2e%'
          OR a.meta->>'slug' LIKE 'e2e-%'
          OR a.meta->>'key' LIKE 'e2e.%'
          OR (p_include_orphans AND a.actor_id IS NOT NULL AND u.id IS NULL)
           )
     LIMIT p_batch
  )
  DELETE FROM public.audit_log a USING doomed WHERE a.id = doomed.id;
  GET DIAGNOSTICS v_deleted = ROW_COUNT;
  PERFORM set_config('ethio.audit_maintenance', 'off', true);
  RETURN v_deleted;
END;
$function$;

REVOKE ALL ON FUNCTION public.maintenance_prune_e2e_audit(timestamptz, boolean, integer) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.maintenance_prune_e2e_audit(timestamptz, boolean, integer) TO service_role;

-- PROOFS (behaviour, scratch rows; rolled back by the savepoint-free DO block's own delete).
DO $proof$
DECLARE
  v_real uuid := gen_random_uuid();
  v_orphan uuid := gen_random_uuid();
  v_n bigint;
BEGIN
  PERFORM set_config('ethio.audit_maintenance', 'on', true);
  INSERT INTO public.audit_log(actor_id, action, entity_type, entity_id, meta, created_at) VALUES
    (NULL, 'proof.keep', 'proof', 'real-row', '{}'::jsonb, now() - interval '2 days'),
    (NULL, 'proof.drop', 'proof', 'e2e-inc274-a', '{}'::jsonb, now() - interval '2 days'),
    (NULL, 'proof.fresh', 'proof', 'e2e-inc274-b', '{}'::jsonb, now()),
    (v_orphan, 'proof.orphan', 'proof', 'inc274-orphan', '{}'::jsonb, now() - interval '2 days');
  PERFORM set_config('ethio.audit_maintenance', 'off', true);

  v_n := public.maintenance_prune_e2e_audit(now() - interval '1 day', false, 50000);
  IF EXISTS (SELECT 1 FROM public.audit_log WHERE entity_id = 'e2e-inc274-a') THEN
    RAISE EXCEPTION 'PROOF 1 failed: stale e2e row survived';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM public.audit_log WHERE entity_id = 'e2e-inc274-b') THEN
    RAISE EXCEPTION 'PROOF 2 failed: fresh e2e row pruned';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM public.audit_log WHERE entity_id = 'real-row' AND action = 'proof.keep') THEN
    RAISE EXCEPTION 'PROOF 3 failed: real row pruned';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM public.audit_log WHERE entity_id = 'inc274-orphan') THEN
    RAISE EXCEPTION 'PROOF 4 failed: orphan pruned without opt-in';
  END IF;
  BEGIN
    PERFORM public.maintenance_prune_e2e_audit(now(), false, 0);
    RAISE EXCEPTION 'PROOF 5 failed: batch 0 accepted';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM LIKE 'PROOF%' THEN RAISE; END IF;
  END;

  PERFORM set_config('ethio.audit_maintenance', 'on', true);
  DELETE FROM public.audit_log WHERE action IN ('proof.keep','proof.drop','proof.fresh','proof.orphan');
  PERFORM set_config('ethio.audit_maintenance', 'off', true);
END
$proof$;

-- READBACK: ACL
DO $rb$
BEGIN
  IF has_function_privilege('anon', 'public.maintenance_prune_e2e_audit(timestamptz, boolean, integer)', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.maintenance_prune_e2e_audit(timestamptz, boolean, integer)', 'EXECUTE') THEN
    RAISE EXCEPTION 'READBACK failed: client roles can execute the prune door';
  END IF;
  IF NOT has_function_privilege('service_role', 'public.maintenance_prune_e2e_audit(timestamptz, boolean, integer)', 'EXECUTE') THEN
    RAISE EXCEPTION 'READBACK failed: service_role cannot execute';
  END IF;
END
$rb$;

INSERT INTO public.migration_marks(version) VALUES ('20260925010000') ON CONFLICT DO NOTHING;