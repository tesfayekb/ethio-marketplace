-- L2 (DEC-037) — THE AUDIT MAINTENANCE DOOR (closes INC-159's second half).
--
-- public.audit_log is append-only BY LAW: the audit_log_append_only trigger
-- raises on every UPDATE and DELETE, for every role, including service_role.
-- global-setup's DEC-036 maintenance sweep therefore deletes NOTHING today —
-- its per-batch `.delete().in('actor_id', …)` calls have always been refused
-- (the error surfaces as a thrown setup failure only when the batch is
-- non-empty, which is why the growth was invisible).
--
-- The door is deliberately ONE door, not a widened trigger:
--   * the trigger still refuses every UPDATE, and every DELETE that does not
--     arrive through the door (the door announces itself with a LOCAL GUC that
--     only the definer RPC sets, inside its own transaction);
--   * the RPC is SECURITY DEFINER, service_role-only, and bounds the delete to
--     (actor_id = ANY(p_actor_ids)) AND created_at < p_cutoff — a NULL/empty
--     actor list deletes nothing (E6: the empty set is named, not implied);
--   * it returns the deleted count so the caller logs evidence, never a guess.

-- A. The trigger gains ONE exact exception and restates its ACL (definer law).
CREATE OR REPLACE FUNCTION public.audit_log_append_only()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  -- The maintenance door: DELETE only, and only inside the definer RPC's own
  -- transaction (the GUC is set LOCAL there and can never outlive it).
  IF TG_OP = 'DELETE'
     AND coalesce(current_setting('ethio.audit_maintenance', true), '') = 'on' THEN
    RETURN OLD;
  END IF;
  RAISE EXCEPTION 'audit log is append-only';
END;
$$;

REVOKE ALL ON FUNCTION public.audit_log_append_only() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.audit_log_append_only() FROM anon;
REVOKE ALL ON FUNCTION public.audit_log_append_only() FROM authenticated;

-- B. The door itself.
CREATE OR REPLACE FUNCTION public.maintenance_prune_audit(
  p_cutoff timestamptz,
  p_actor_ids uuid[]
)
RETURNS bigint
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_deleted bigint := 0;
BEGIN
  IF p_cutoff IS NULL THEN
    RAISE EXCEPTION 'maintenance_prune_audit requires a cutoff';
  END IF;
  IF p_actor_ids IS NULL OR array_length(p_actor_ids, 1) IS NULL THEN
    RETURN 0;  -- E6: the empty actor set prunes nothing, explicitly.
  END IF;

  PERFORM set_config('ethio.audit_maintenance', 'on', true);
  DELETE FROM public.audit_log
   WHERE actor_id = ANY(p_actor_ids)
     AND created_at < p_cutoff;
  GET DIAGNOSTICS v_deleted = ROW_COUNT;
  PERFORM set_config('ethio.audit_maintenance', 'off', true);

  RETURN v_deleted;
END;
$$;

REVOKE ALL ON FUNCTION public.maintenance_prune_audit(timestamptz, uuid[]) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.maintenance_prune_audit(timestamptz, uuid[]) FROM anon;
REVOKE ALL ON FUNCTION public.maintenance_prune_audit(timestamptz, uuid[]) FROM authenticated;
GRANT EXECUTE ON FUNCTION public.maintenance_prune_audit(timestamptz, uuid[]) TO service_role;

-- C. IN-FILE PROOFS. Every proof leaves the table exactly as it found it.
DO $$
DECLARE
  v_actor uuid := gen_random_uuid();
  v_other uuid := gen_random_uuid();
  v_old uuid;
  v_new uuid;
  v_keep uuid;
  v_pruned bigint;
  v_ok boolean;
BEGIN
  INSERT INTO public.audit_log(actor_id, action, entity_type, entity_id, meta, created_at)
  VALUES (v_actor, 'dec037.proof', 'proof', 'old', '{}'::jsonb, now() - interval '30 days')
  RETURNING id INTO v_old;
  INSERT INTO public.audit_log(actor_id, action, entity_type, entity_id, meta, created_at)
  VALUES (v_actor, 'dec037.proof', 'proof', 'new', '{}'::jsonb, now())
  RETURNING id INTO v_new;
  INSERT INTO public.audit_log(actor_id, action, entity_type, entity_id, meta, created_at)
  VALUES (v_other, 'dec037.proof', 'proof', 'keep', '{}'::jsonb, now() - interval '30 days')
  RETURNING id INTO v_keep;

  -- P1: a plain DELETE is still refused.
  v_ok := false;
  BEGIN
    DELETE FROM public.audit_log WHERE id = v_old;
  EXCEPTION WHEN others THEN
    IF SQLERRM LIKE '%append-only%' THEN v_ok := true; END IF;
  END;
  IF NOT v_ok THEN RAISE EXCEPTION 'P1 FAILED: an ungated DELETE was allowed'; END IF;
  RAISE NOTICE 'P1 PASS: ungated DELETE refused';

  -- P2: UPDATE is still refused, door or no door.
  v_ok := false;
  BEGIN
    PERFORM set_config('ethio.audit_maintenance', 'on', true);
    UPDATE public.audit_log SET action = 'tampered' WHERE id = v_old;
  EXCEPTION WHEN others THEN
    IF SQLERRM LIKE '%append-only%' THEN v_ok := true; END IF;
  END;
  PERFORM set_config('ethio.audit_maintenance', 'off', true);
  IF NOT v_ok THEN RAISE EXCEPTION 'P2 FAILED: UPDATE was allowed'; END IF;
  RAISE NOTICE 'P2 PASS: UPDATE refused even with the door open';

  -- P3: the empty actor set prunes nothing.
  IF public.maintenance_prune_audit(now(), NULL) <> 0
     OR public.maintenance_prune_audit(now(), ARRAY[]::uuid[]) <> 0 THEN
    RAISE EXCEPTION 'P3 FAILED: the empty actor set pruned rows';
  END IF;
  RAISE NOTICE 'P3 PASS: empty actor set prunes 0';

  -- P4: the door prunes exactly (named actor AND older than the cutoff).
  v_pruned := public.maintenance_prune_audit(now() - interval '1 day', ARRAY[v_actor]);
  IF v_pruned <> 1 THEN RAISE EXCEPTION 'P4 FAILED: expected 1 pruned, got %', v_pruned; END IF;
  IF EXISTS (SELECT 1 FROM public.audit_log WHERE id = v_old) THEN
    RAISE EXCEPTION 'P4 FAILED: the stale row survived';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM public.audit_log WHERE id = v_new) THEN
    RAISE EXCEPTION 'P4 FAILED: the fresh row was pruned';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM public.audit_log WHERE id = v_keep) THEN
    RAISE EXCEPTION 'P4 FAILED: another actor''s row was pruned';
  END IF;
  RAISE NOTICE 'P4 PASS: pruned only the stale row of the named actor';

  -- P5: the door closes behind itself — a DELETE after the RPC is refused.
  v_ok := false;
  BEGIN
    DELETE FROM public.audit_log WHERE id = v_new;
  EXCEPTION WHEN others THEN
    IF SQLERRM LIKE '%append-only%' THEN v_ok := true; END IF;
  END;
  IF NOT v_ok THEN RAISE EXCEPTION 'P5 FAILED: the door stayed open'; END IF;
  RAISE NOTICE 'P5 PASS: the door closed behind the RPC';

  -- P6: ACL — anon/authenticated cannot execute the door.
  IF has_function_privilege('anon', 'public.maintenance_prune_audit(timestamptz, uuid[])', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.maintenance_prune_audit(timestamptz, uuid[])', 'EXECUTE') THEN
    RAISE EXCEPTION 'P6 FAILED: a client role can execute the maintenance door';
  END IF;
  IF NOT has_function_privilege('service_role', 'public.maintenance_prune_audit(timestamptz, uuid[])', 'EXECUTE') THEN
    RAISE EXCEPTION 'P6 FAILED: service_role cannot execute the maintenance door';
  END IF;
  RAISE NOTICE 'P6 PASS: service_role only';

  -- Cleanup: the proofs leave nothing behind (through the door, by law).
  v_pruned := public.maintenance_prune_audit(now() + interval '1 day', ARRAY[v_actor, v_other]);
  IF EXISTS (SELECT 1 FROM public.audit_log WHERE actor_id IN (v_actor, v_other)) THEN
    RAISE EXCEPTION 'CLEANUP FAILED: proof rows remain';
  END IF;
  RAISE NOTICE 'CLEANUP OK: % proof row(s) removed', v_pruned;
END $$;

-- Self-mark (last statement, per the self-marking law).
INSERT INTO public.migration_marks(version) VALUES ('20260906030000') ON CONFLICT DO NOTHING;