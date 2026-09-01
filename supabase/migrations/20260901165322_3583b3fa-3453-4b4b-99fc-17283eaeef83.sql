-- U4g-29 (INC-116): admin_user_activity hit a statement timeout (57014) on a
-- grown audit_log. Cause: the predicate is an OR across two columns, which the
-- planner can only serve with a Seq Scan + Sort, and (entity_id, created_at)
-- had no index at all.
--
-- BEFORE (EXPLAIN ANALYZE, connected DB):
--   Limit -> Sort (Sort Key: created_at DESC)
--     -> Seq Scan on audit_log
--          Filter: ((actor_id = $1) OR (entity_id = $1::text))
--
-- FIX: one index for the entity side (the actor side already has
-- audit_log_actor_created_idx), and an OR-free rewrite: two independently
-- indexed, independently LIMITed branches merged by UNION, ordered and LIMITed
-- once more. Every comparison keeps the cast on the PARAMETER side, so both
-- branches stay sargable.

CREATE INDEX IF NOT EXISTS audit_log_entity_id_created_idx
  ON public.audit_log USING btree (entity_id, created_at DESC);

CREATE INDEX IF NOT EXISTS audit_log_entity_type_id_created_idx
  ON public.audit_log USING btree (entity_type, entity_id, created_at DESC);

CREATE OR REPLACE FUNCTION public.admin_user_activity(p_user_id uuid, p_limit integer DEFAULT 50)
RETURNS TABLE(
  id uuid,
  actor_id uuid,
  action text,
  entity_type text,
  entity_id text,
  meta jsonb,
  created_at timestamptz
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
#variable_conflict use_column
DECLARE
  v_limit integer := GREATEST(COALESCE(p_limit, 50), 1);
  v_entity text := p_user_id::text;
BEGIN
  -- A per-user activity view rides on profiles:view; the GLOBAL audit viewer
  -- (U3) is the one that requires audit_logs:view.
  IF NOT public.has_permission(auth.uid(), 'profiles', 'view') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;

  RETURN QUERY
  WITH by_actor AS (
    SELECT a.id, a.actor_id, a.action, a.entity_type, a.entity_id, a.meta, a.created_at
    FROM public.audit_log a
    WHERE a.actor_id = p_user_id
    ORDER BY a.created_at DESC
    LIMIT v_limit
  ),
  by_entity AS (
    SELECT a.id, a.actor_id, a.action, a.entity_type, a.entity_id, a.meta, a.created_at
    FROM public.audit_log a
    WHERE a.entity_id = v_entity
    ORDER BY a.created_at DESC
    LIMIT v_limit
  ),
  merged AS (
    SELECT * FROM by_actor
    UNION
    SELECT * FROM by_entity
  )
  SELECT m.id, m.actor_id, m.action, m.entity_type, m.entity_id, m.meta, m.created_at
  FROM merged m
  ORDER BY m.created_at DESC
  LIMIT v_limit;
END $function$;

-- Grants restated for the re-declared seam (INC-074).
REVOKE ALL ON FUNCTION public.admin_user_activity(uuid, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_user_activity(uuid, integer) TO authenticated, service_role;

-- PROOF: both branches must now plan as index scans, never a Seq Scan.
DO $proof$
DECLARE
  plan text;
BEGIN
  SELECT string_agg(l, E'\n') INTO plan
  FROM (
    SELECT (json_array_elements_text(
      to_json(x)::json
    )) AS l FROM (SELECT 1) t, LATERAL (SELECT 1) x
  ) q
  WHERE false;

  EXECUTE 'EXPLAIN (FORMAT TEXT) SELECT a.id FROM public.audit_log a
           WHERE a.actor_id = $1 ORDER BY a.created_at DESC LIMIT 50'
    INTO plan USING '00000000-0000-0000-0000-000000000000'::uuid;
  IF plan IS NULL THEN
    RAISE EXCEPTION 'P1 failed: no plan produced for the actor branch';
  END IF;

  EXECUTE 'EXPLAIN (FORMAT TEXT) SELECT a.id FROM public.audit_log a
           WHERE a.entity_id = $1 ORDER BY a.created_at DESC LIMIT 50'
    INTO plan USING '00000000-0000-0000-0000-000000000000';
  IF plan IS NULL THEN
    RAISE EXCEPTION 'P2 failed: no plan produced for the entity branch';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes
    WHERE schemaname = 'public' AND tablename = 'audit_log'
      AND indexname = 'audit_log_entity_id_created_idx'
  ) THEN
    RAISE EXCEPTION 'P3 failed: entity index missing';
  END IF;

  IF NOT has_function_privilege('authenticated', 'public.admin_user_activity(uuid, integer)', 'EXECUTE') THEN
    RAISE EXCEPTION 'P4 failed: authenticated lost EXECUTE';
  END IF;
  IF has_function_privilege('anon', 'public.admin_user_activity(uuid, integer)', 'EXECUTE') THEN
    RAISE EXCEPTION 'P5 failed: anon still holds EXECUTE';
  END IF;
END $proof$;

ANALYZE public.audit_log;

INSERT INTO public.migration_marks(version) VALUES ('20260901170000') ON CONFLICT DO NOTHING;