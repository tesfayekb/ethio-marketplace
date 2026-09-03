-- =====================================================================
-- INC-129 — admin_list_audit bounded rewrite (C2-audit-rewrite, Tier A)
-- Approved spec 2026-09-03; supersedes the index-only plan the census overturned.
--
-- CAUSE: the previous body computed COUNT(*) OVER () across the whole
-- filtered set (materialising every matching row before LIMIT) and applied a
-- leading-wildcard ILIKE over the LEFT JOINed public.profiles.display_name,
-- so the join + scan grew with total log volume, not with page size.
--
-- CENSUS FACTS: prod public.audit_log = 2,221 rows; action-filtered inlined
-- plan pre-rewrite = 6.3 ms on prod, but the same shape times out on staging
-- at E2E volume (statement timeout class).
--
-- All pre-existing composite indexes on public.audit_log are RETAINED
-- ((action, created_at DESC), (entity_type, created_at DESC),
--  (actor_id, created_at DESC) and friends); this migration is additive.
--
-- CONTRACT FROZEN (E7): identical signature, argument names and return table.
-- =====================================================================

-- STEP 1 — extension + trigram index for entity_id search
CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE INDEX IF NOT EXISTS audit_log_entity_id_trgm_idx
  ON public.audit_log USING gin (entity_id gin_trgm_ops);

-- STEP 2 — bounded rewrite
CREATE OR REPLACE FUNCTION public.admin_list_audit(
  p_search text DEFAULT NULL::text,
  p_action text DEFAULT NULL::text,
  p_entity_type text DEFAULT NULL::text,
  p_from timestamp with time zone DEFAULT NULL::timestamp with time zone,
  p_to timestamp with time zone DEFAULT NULL::timestamp with time zone,
  p_limit integer DEFAULT 50,
  p_offset integer DEFAULT 0
)
RETURNS TABLE(
  id uuid,
  actor_id uuid,
  actor_name text,
  action text,
  entity_type text,
  entity_id text,
  meta jsonb,
  created_at timestamp with time zone,
  total_count bigint
)
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
#variable_conflict use_column
DECLARE
  v_actor_ids uuid[] := ARRAY[]::uuid[];
  v_has_search boolean := p_search IS NOT NULL AND p_search <> '';
  v_total bigint;
BEGIN
  -- (a) gate first, unchanged
  IF NOT public.has_permission(auth.uid(), 'audit_logs', 'view') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;

  -- (b) pre-resolve name search against profiles, off the audit page path
  IF v_has_search THEN
    v_actor_ids := ARRAY(
      SELECT pr.user_id FROM public.profiles pr
      WHERE pr.display_name ILIKE '%' || p_search || '%'
    );
  END IF;

  -- (d) capped count: exact to 10,000; 10,001 means "10,000+"
  SELECT count(*) INTO v_total FROM (
    SELECT 1
    FROM public.audit_log a2
    WHERE (p_action IS NULL OR p_action = '' OR p_action = 'all' OR a2.action = p_action)
      AND (p_entity_type IS NULL OR p_entity_type = '' OR p_entity_type = 'all'
           OR a2.entity_type = p_entity_type)
      AND (p_from IS NULL OR a2.created_at >= p_from)
      AND (p_to IS NULL OR a2.created_at <= p_to)
      AND (NOT v_has_search
           OR a2.entity_id ILIKE '%' || p_search || '%'
           OR a2.actor_id = ANY(v_actor_ids))
    LIMIT 10001
  ) c;

  -- (c) page from audit_log alone, then join profiles over the page only
  RETURN QUERY
  WITH page AS (
    SELECT a.id, a.actor_id, a.action, a.entity_type, a.entity_id, a.meta, a.created_at
    FROM public.audit_log a
    WHERE (p_action IS NULL OR p_action = '' OR p_action = 'all' OR a.action = p_action)
      AND (p_entity_type IS NULL OR p_entity_type = '' OR p_entity_type = 'all'
           OR a.entity_type = p_entity_type)
      AND (p_from IS NULL OR a.created_at >= p_from)
      AND (p_to IS NULL OR a.created_at <= p_to)
      AND (NOT v_has_search
           OR a.entity_id ILIKE '%' || p_search || '%'
           OR a.actor_id = ANY(v_actor_ids))
    ORDER BY a.created_at DESC
    LIMIT GREATEST(COALESCE(p_limit, 50), 1)
    OFFSET GREATEST(COALESCE(p_offset, 0), 0)
  )
  SELECT p.id, p.actor_id, pr.display_name AS actor_name, p.action, p.entity_type,
         p.entity_id, p.meta, p.created_at, v_total AS total_count
  FROM page p
  LEFT JOIN public.profiles pr ON pr.user_id = p.actor_id
  ORDER BY p.created_at DESC;
END $function$;

-- ACL posture restated in-file (census: postgres=X, authenticated=X, service_role=X)
REVOKE ALL ON FUNCTION public.admin_list_audit(text, text, text, timestamptz, timestamptz, integer, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_list_audit(text, text, text, timestamptz, timestamptz, integer, integer) TO authenticated, service_role;

-- §6 proofs -----------------------------------------------------------
DO $proof$
DECLARE
  v_names text;
  v_ret text;
BEGIN
  SELECT array_to_string(p.proargnames, ',') INTO v_names
  FROM pg_proc p WHERE p.oid = 'public.admin_list_audit'::regproc;
  IF v_names <> 'p_search,p_action,p_entity_type,p_from,p_to,p_limit,p_offset,id,actor_id,actor_name,action,entity_type,entity_id,meta,created_at,total_count' THEN
    RAISE EXCEPTION 'P1 FAILED: contract drift in argnames: %', v_names;
  END IF;

  SELECT pg_get_function_result('public.admin_list_audit'::regproc) INTO v_ret;
  IF v_ret NOT LIKE '%total_count bigint%' OR v_ret NOT LIKE '%actor_name text%' THEN
    RAISE EXCEPTION 'P2 FAILED: return table drift: %', v_ret;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE schemaname = 'public'
                 AND indexname = 'audit_log_entity_id_trgm_idx') THEN
    RAISE EXCEPTION 'P3 FAILED: trigram index missing';
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_proc p WHERE p.oid = 'public.admin_list_audit'::regproc
                 AND p.prosecdef AND p.provolatile = 's') THEN
    RAISE EXCEPTION 'P4 FAILED: function is not STABLE SECURITY DEFINER';
  END IF;

  IF has_function_privilege('anon', 'public.admin_list_audit(text, text, text, timestamptz, timestamptz, integer, integer)', 'EXECUTE') THEN
    RAISE EXCEPTION 'P5 FAILED: anon holds EXECUTE';
  END IF;
  IF NOT has_function_privilege('authenticated', 'public.admin_list_audit(text, text, text, timestamptz, timestamptz, integer, integer)', 'EXECUTE') THEN
    RAISE EXCEPTION 'P6 FAILED: authenticated lost EXECUTE';
  END IF;

  RAISE NOTICE 'INC-129 proofs P1-P6 OK';
END $proof$;

INSERT INTO public.migration_marks(version) VALUES ('20260903050000') ON CONFLICT DO NOTHING;