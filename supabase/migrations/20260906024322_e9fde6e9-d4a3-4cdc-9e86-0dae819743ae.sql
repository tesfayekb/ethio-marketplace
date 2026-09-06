-- L2b — THE ORPHAN DOOR (DEC-037 completion; DRIFT corrective).
--
-- DEC-037's spec carried an orphan-purge capability — audit rows whose
-- actor_id no longer exists in auth.users (deleted accounts, ephemeral e2e
-- actors) — but the landed contract (maintenance_prune_audit) prunes only by
-- NAMED actor list. Rows whose actor is gone can never be named, so they are
-- unprunable today: the dropped half of the spec. This migration lands it as
-- a SECOND door with the same GUC pattern (ethio.audit_maintenance, set LOCAL
-- inside the definer RPC's own transaction — the audit_log_append_only
-- trigger's one exact exception). The landed maintenance_prune_audit is NOT
-- touched.

-- A. The orphan door itself.
CREATE OR REPLACE FUNCTION public.maintenance_prune_audit_orphans(
  p_cutoff timestamptz
)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_deleted integer := 0;
BEGIN
  IF p_cutoff IS NULL THEN
    RAISE EXCEPTION 'maintenance_prune_audit_orphans requires a cutoff';
  END IF;

  PERFORM set_config('ethio.audit_maintenance', 'on', true);
  DELETE FROM public.audit_log
   WHERE created_at < p_cutoff
     AND actor_id IS NOT NULL
     AND actor_id NOT IN (SELECT id FROM auth.users);
  GET DIAGNOSTICS v_deleted = ROW_COUNT;
  PERFORM set_config('ethio.audit_maintenance', 'off', true);

  -- The run is itself audit evidence: ONE summary row, written after.
  INSERT INTO public.audit_log(actor_id, action, entity_type, entity_id, meta)
  VALUES (
    NULL,
    'audit.maintenance_prune',
    'audit_log',
    NULL,
    jsonb_build_object('door', 'maintenance_prune_audit_orphans', 'cutoff', p_cutoff, 'deleted', v_deleted)
  );

  RETURN v_deleted;
END;
$$;

REVOKE ALL ON FUNCTION public.maintenance_prune_audit_orphans(timestamptz) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.maintenance_prune_audit_orphans(timestamptz) FROM anon;
REVOKE ALL ON FUNCTION public.maintenance_prune_audit_orphans(timestamptz) FROM authenticated;
GRANT EXECUTE ON FUNCTION public.maintenance_prune_audit_orphans(timestamptz) TO service_role;

-- B. IN-FILE PROOFS. Every proof leaves the table exactly as it found it.
DO $$
DECLARE
  v_orphan uuid := gen_random_uuid();  -- NOT inserted into auth.users: an orphan actor.
  v_old uuid;
  v_new uuid;
  v_pruned integer;
  v_ok boolean;
BEGIN
  INSERT INTO public.audit_log(actor_id, action, entity_type, entity_id, meta, created_at)
  VALUES (v_orphan, 'l2b.proof', 'proof', 'old-orphan', '{"proof":"l2b"}'::jsonb, now() - interval '30 days')
  RETURNING id INTO v_old;
  INSERT INTO public.audit_log(actor_id, action, entity_type, entity_id, meta, created_at)
  VALUES (v_orphan, 'l2b.proof', 'proof', 'fresh-orphan', '{"proof":"l2b"}'::jsonb, now())
  RETURNING id INTO v_new;

  -- P1: a plain DELETE is still refused (the orphan door changes nothing for
  -- ungated statements).
  v_ok := false;
  BEGIN
    DELETE FROM public.audit_log WHERE id = v_old;
  EXCEPTION WHEN others THEN
    IF SQLERRM LIKE '%append-only%' THEN v_ok := true; END IF;
  END;
  IF NOT v_ok THEN RAISE EXCEPTION 'P1 FAILED: an ungated DELETE was allowed'; END IF;
  RAISE NOTICE 'P1 PASS: ungated DELETE refused';

  -- P2: the door prunes exactly the stale orphan row, returns its count, and
  -- writes the single summary row.
  v_pruned := public.maintenance_prune_audit_orphans(now() - interval '1 day');
  IF v_pruned < 1 THEN RAISE EXCEPTION 'P2 FAILED: expected the orphan scratch row pruned, got %', v_pruned; END IF;
  IF EXISTS (SELECT 1 FROM public.audit_log WHERE id = v_old) THEN
    RAISE EXCEPTION 'P2 FAILED: the stale orphan row survived';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM public.audit_log WHERE id = v_new) THEN
    RAISE EXCEPTION 'P2 FAILED: the fresh orphan row was pruned';
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM public.audit_log
     WHERE action = 'audit.maintenance_prune'
       AND meta->>'door' = 'maintenance_prune_audit_orphans'
       AND (meta->>'deleted')::integer = v_pruned
  ) THEN
    RAISE EXCEPTION 'P2 FAILED: the summary row was not written';
  END IF;
  RAISE NOTICE 'P2 PASS: % stale orphan row(s) pruned incl. the scratch row; summary row written', v_pruned;

  -- P3: the GUC does not leak — the door is closed after the RPC returns.
  IF coalesce(current_setting('ethio.audit_maintenance', true), '') = 'on' THEN
    RAISE EXCEPTION 'P3 FAILED: the maintenance GUC leaked open';
  END IF;
  v_ok := false;
  BEGIN
    DELETE FROM public.audit_log WHERE id = v_new;
  EXCEPTION WHEN others THEN
    IF SQLERRM LIKE '%append-only%' THEN v_ok := true; END IF;
  END;
  IF NOT v_ok THEN RAISE EXCEPTION 'P3 FAILED: the door stayed open'; END IF;
  RAISE NOTICE 'P3 PASS: the door closed behind the RPC (GUC does not leak)';

  -- P4: an authenticated caller is refused (ACL, not merely policy).
  SET LOCAL ROLE authenticated;
  v_ok := false;
  BEGIN
    PERFORM public.maintenance_prune_audit_orphans(now());
  EXCEPTION WHEN insufficient_privilege THEN
    v_ok := true;
  END;
  RESET ROLE;
  IF NOT v_ok THEN RAISE EXCEPTION 'P4 FAILED: an authenticated caller executed the orphan door'; END IF;
  RAISE NOTICE 'P4 PASS: authenticated caller refused';

  -- P5: ACL — anon/authenticated hold no EXECUTE; service_role does.
  IF has_function_privilege('anon', 'public.maintenance_prune_audit_orphans(timestamptz)', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.maintenance_prune_audit_orphans(timestamptz)', 'EXECUTE') THEN
    RAISE EXCEPTION 'P5 FAILED: a client role can execute the orphan door';
  END IF;
  IF NOT has_function_privilege('service_role', 'public.maintenance_prune_audit_orphans(timestamptz)', 'EXECUTE') THEN
    RAISE EXCEPTION 'P5 FAILED: service_role cannot execute the orphan door';
  END IF;
  RAISE NOTICE 'P5 PASS: service_role only';

  -- Cleanup: the fresh scratch row and the proof's summary row(s) leave
  -- through the door's own GUC, exactly as the trigger's exception allows.
  PERFORM set_config('ethio.audit_maintenance', 'on', true);
  DELETE FROM public.audit_log WHERE id = v_new;
  DELETE FROM public.audit_log
   WHERE action = 'audit.maintenance_prune'
     AND meta->>'door' = 'maintenance_prune_audit_orphans';
  PERFORM set_config('ethio.audit_maintenance', 'off', true);
  IF EXISTS (SELECT 1 FROM public.audit_log WHERE actor_id = v_orphan)
     OR EXISTS (SELECT 1 FROM public.audit_log WHERE action = 'audit.maintenance_prune' AND meta->>'door' = 'maintenance_prune_audit_orphans') THEN
    RAISE EXCEPTION 'CLEANUP FAILED: proof rows remain';
  END IF;
  RAISE NOTICE 'CLEANUP OK: proof rows removed';
END $$;

-- Self-mark (last statement, per the self-marking law).
INSERT INTO public.migration_marks(version) VALUES ('20260906050000') ON CONFLICT DO NOTHING;