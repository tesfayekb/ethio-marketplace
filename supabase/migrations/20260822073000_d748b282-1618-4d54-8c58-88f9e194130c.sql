-- ============================================================================
-- Phase U3 — Audit & Security (Tier A). DEC-016 impersonation v1 guardrails.
-- Self-marking (U1f-3). Definer law (INC-074): every definer function's
-- REVOKE/GRANT lines are restated in-file.
-- ============================================================================

-- A. IMPERSONATION SESSIONS -------------------------------------------------
CREATE TABLE IF NOT EXISTS public.impersonation_sessions (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id     uuid NOT NULL,
  target_id    uuid NOT NULL,
  reason       text NOT NULL CHECK (length(btrim(reason)) >= 5),
  started_at   timestamptz NOT NULL DEFAULT now(),
  expires_at   timestamptz NOT NULL,
  ended_at     timestamptz,
  ended_reason text
);

REVOKE ALL ON public.impersonation_sessions FROM anon, authenticated;
GRANT ALL ON public.impersonation_sessions TO service_role;
ALTER TABLE public.impersonation_sessions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS impersonation_sessions_deny_all ON public.impersonation_sessions;
CREATE POLICY impersonation_sessions_deny_all
  ON public.impersonation_sessions FOR ALL TO anon, authenticated
  USING (false) WITH CHECK (false);

CREATE INDEX IF NOT EXISTS impersonation_sessions_actor_active_idx
  ON public.impersonation_sessions (actor_id, expires_at DESC) WHERE ended_at IS NULL;
CREATE INDEX IF NOT EXISTS audit_log_created_idx ON public.audit_log (created_at DESC);
CREATE INDEX IF NOT EXISTS audit_log_action_created_idx ON public.audit_log (action, created_at DESC);
CREATE INDEX IF NOT EXISTS audit_log_actor_created_idx ON public.audit_log (actor_id, created_at DESC);

-- Gate tier: the audit page is moderator+ (census showed moderator lacked it).
INSERT INTO public.role_permissions (role_id, permission_id, is_core)
SELECT r.id, p.id, false
FROM public.roles r
JOIN public.permissions p ON p.action = 'view'
JOIN public.resources res ON res.id = p.resource_id AND res.name = 'audit_logs'
WHERE r.name = 'moderator'
ON CONFLICT DO NOTHING;

-- B. AUDIT READ RPCs ---------------------------------------------------------
CREATE OR REPLACE FUNCTION public.admin_list_audit(
  p_search text DEFAULT NULL, p_action text DEFAULT NULL, p_entity_type text DEFAULT NULL,
  p_from timestamptz DEFAULT NULL, p_to timestamptz DEFAULT NULL,
  p_limit int DEFAULT 50, p_offset int DEFAULT 0)
RETURNS TABLE(id uuid, actor_id uuid, actor_name text, action text, entity_type text,
              entity_id text, meta jsonb, created_at timestamptz, total_count bigint)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
#variable_conflict use_column
BEGIN
  IF NOT public.has_permission(auth.uid(), 'audit_logs', 'view') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;

  RETURN QUERY
  WITH filtered AS (
    SELECT a.id, a.actor_id, pr.display_name AS actor_name, a.action, a.entity_type,
           a.entity_id, a.meta, a.created_at
    FROM public.audit_log a
    LEFT JOIN public.profiles pr ON pr.user_id = a.actor_id
    WHERE (p_action IS NULL OR p_action = '' OR p_action = 'all' OR a.action = p_action)
      AND (p_entity_type IS NULL OR p_entity_type = '' OR p_entity_type = 'all'
           OR a.entity_type = p_entity_type)
      AND (p_from IS NULL OR a.created_at >= p_from)
      AND (p_to IS NULL OR a.created_at <= p_to)
      AND (p_search IS NULL OR p_search = ''
           OR COALESCE(pr.display_name, '') ILIKE '%' || p_search || '%'
           OR COALESCE(a.entity_id, '') ILIKE '%' || p_search || '%')
  )
  SELECT f.id, f.actor_id, f.actor_name, f.action, f.entity_type, f.entity_id, f.meta,
         f.created_at, COUNT(*) OVER () AS total_count
  FROM filtered f
  ORDER BY f.created_at DESC
  LIMIT GREATEST(COALESCE(p_limit, 50), 1)
  OFFSET GREATEST(COALESCE(p_offset, 0), 0);
END $$;

REVOKE ALL ON FUNCTION public.admin_list_audit(text, text, text, timestamptz, timestamptz, int, int) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_list_audit(text, text, text, timestamptz, timestamptz, int, int) TO authenticated, service_role;

CREATE OR REPLACE FUNCTION public.admin_audit_facets()
RETURNS TABLE(kind text, value text)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT public.has_permission(auth.uid(), 'audit_logs', 'view') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  RETURN QUERY
    SELECT 'action'::text, a.action FROM public.audit_log a GROUP BY a.action
    UNION ALL
    SELECT 'entity_type'::text, a.entity_type FROM public.audit_log a GROUP BY a.entity_type
    ORDER BY 1, 2;
END $$;

REVOKE ALL ON FUNCTION public.admin_audit_facets() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_audit_facets() TO authenticated, service_role;

CREATE OR REPLACE FUNCTION public.admin_audit_stats(p_days int DEFAULT 14)
RETURNS TABLE(days jsonb, top_actions jsonb, count_24h bigint, count_7d bigint,
              active_impersonations bigint)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
DECLARE v_days int := LEAST(GREATEST(COALESCE(p_days, 14), 1), 90);
BEGIN
  IF NOT public.has_permission(auth.uid(), 'audit_logs', 'view') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;

  RETURN QUERY
  WITH span AS (
    SELECT (current_date - (v_days - 1) + s)::date AS day
    FROM generate_series(0, v_days - 1) s
  ), per_day AS (
    SELECT sp.day,
           (SELECT count(*) FROM public.audit_log a
             WHERE a.created_at >= sp.day::timestamptz
               AND a.created_at < (sp.day + 1)::timestamptz) AS n
    FROM span sp
  ), tops AS (
    SELECT a.action, count(*) AS n
    FROM public.audit_log a
    WHERE a.created_at >= now() - make_interval(days => v_days)
    GROUP BY a.action ORDER BY count(*) DESC, a.action LIMIT 5
  )
  SELECT
    COALESCE((SELECT jsonb_agg(jsonb_build_object('day', d.day, 'count', d.n) ORDER BY d.day)
                FROM per_day d), '[]'::jsonb),
    COALESCE((SELECT jsonb_agg(jsonb_build_object('action', t.action, 'count', t.n))
                FROM tops t), '[]'::jsonb),
    (SELECT count(*) FROM public.audit_log a WHERE a.created_at >= now() - interval '24 hours'),
    (SELECT count(*) FROM public.audit_log a WHERE a.created_at >= now() - interval '7 days'),
    (SELECT count(*) FROM public.impersonation_sessions s
      WHERE s.ended_at IS NULL AND s.expires_at > now());
END $$;

REVOKE ALL ON FUNCTION public.admin_audit_stats(int) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_audit_stats(int) TO authenticated, service_role;

-- C. IMPERSONATION RPCs ------------------------------------------------------
-- Gate order: super-admin -> self -> target-super -> single-active -> STEP-UP.
-- Every refusal precedes any write; step-up still gates the INSERT.
CREATE OR REPLACE FUNCTION public.begin_impersonation(p_target uuid, p_reason text)
RETURNS TABLE(session_id uuid, expires_at timestamptz)
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE v_reason text; v_id uuid; v_expires timestamptz;
BEGIN
  IF NOT public.is_super_admin(auth.uid()) THEN
    RAISE EXCEPTION 'impersonation is super-admin only';
  END IF;
  IF p_target = auth.uid() THEN RAISE EXCEPTION 'cannot impersonate yourself'; END IF;
  IF public.is_super_admin(p_target) THEN RAISE EXCEPTION 'cannot impersonate a super admin'; END IF;
  IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE user_id = p_target) THEN
    RAISE EXCEPTION 'user not found';
  END IF;

  v_reason := btrim(COALESCE(p_reason, ''));
  IF length(v_reason) < 5 THEN RAISE EXCEPTION 'a reason of at least 5 characters is required'; END IF;

  IF EXISTS (SELECT 1 FROM public.impersonation_sessions s
              WHERE s.actor_id = auth.uid() AND s.ended_at IS NULL AND s.expires_at > now()) THEN
    RAISE EXCEPTION 'an impersonation session is already active';
  END IF;

  PERFORM public.require_step_up_if_needed('impersonation', 'use');

  v_expires := now() + interval '15 minutes';
  INSERT INTO public.impersonation_sessions (actor_id, target_id, reason, expires_at)
  VALUES (auth.uid(), p_target, v_reason, v_expires)
  RETURNING id INTO v_id;

  PERFORM public.log_audit('impersonation.start', 'impersonation_sessions', v_id::text,
    jsonb_build_object('actor', auth.uid(), 'target', p_target, 'reason', v_reason,
                       'expires_at', v_expires));

  RETURN QUERY SELECT v_id, v_expires;
END $$;

REVOKE ALL ON FUNCTION public.begin_impersonation(uuid, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.begin_impersonation(uuid, text) TO authenticated, service_role;

CREATE OR REPLACE FUNCTION public.end_impersonation(p_session uuid)
RETURNS void
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE v_row public.impersonation_sessions%ROWTYPE;
BEGIN
  SELECT * INTO v_row FROM public.impersonation_sessions
   WHERE id = p_session AND actor_id = auth.uid() AND ended_at IS NULL;
  IF NOT FOUND THEN RAISE EXCEPTION 'no active impersonation session'; END IF;

  UPDATE public.impersonation_sessions
     SET ended_at = now(), ended_reason = 'manual'
   WHERE id = p_session;

  PERFORM public.log_audit('impersonation.end', 'impersonation_sessions', p_session::text,
    jsonb_build_object('actor', v_row.actor_id, 'target', v_row.target_id, 'reason', 'manual'));
END $$;

REVOKE ALL ON FUNCTION public.end_impersonation(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.end_impersonation(uuid) TO authenticated, service_role;

CREATE OR REPLACE FUNCTION public.get_active_impersonation()
RETURNS TABLE(id uuid, target_id uuid, target_name text, expires_at timestamptz)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF auth.uid() IS NULL THEN RETURN; END IF;
  RETURN QUERY
  SELECT s.id, s.target_id, pr.display_name, s.expires_at
  FROM public.impersonation_sessions s
  LEFT JOIN public.profiles pr ON pr.user_id = s.target_id
  WHERE s.actor_id = auth.uid() AND s.ended_at IS NULL AND s.expires_at > now()
  ORDER BY s.started_at DESC LIMIT 1;
END $$;

REVOKE ALL ON FUNCTION public.get_active_impersonation() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_active_impersonation() TO authenticated, service_role;

-- Shared guard for every impersonated READ. Returns the target or raises.
CREATE OR REPLACE FUNCTION public.impersonation_target(p_session uuid)
RETURNS uuid
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
DECLARE v_target uuid;
BEGIN
  SELECT s.target_id INTO v_target
  FROM public.impersonation_sessions s
  WHERE s.id = p_session AND s.actor_id = auth.uid()
    AND s.ended_at IS NULL AND s.expires_at > now();
  IF v_target IS NULL THEN RAISE EXCEPTION 'impersonation session expired'; END IF;
  RETURN v_target;
END $$;

REVOKE ALL ON FUNCTION public.impersonation_target(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.impersonation_target(uuid) TO authenticated, service_role;

CREATE OR REPLACE FUNCTION public.impersonated_get_profile(p_session uuid)
RETURNS TABLE(target_id uuid, display_name text, seller_alias text,
              home_country_code char(2), account_status text, created_at timestamptz)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
DECLARE v_target uuid := public.impersonation_target(p_session);
BEGIN
  RETURN QUERY
  SELECT p.user_id, p.display_name, p.seller_alias, p.home_country_code,
         p.account_status, p.created_at
  FROM public.profiles p WHERE p.user_id = v_target;
END $$;

REVOKE ALL ON FUNCTION public.impersonated_get_profile(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.impersonated_get_profile(uuid) TO authenticated, service_role;

CREATE OR REPLACE FUNCTION public.impersonated_list_listings(
  p_session uuid, p_limit int DEFAULT 25, p_offset int DEFAULT 0)
RETURNS TABLE(id uuid, title text, status text, price_amount numeric,
              price_currency char(3), created_at timestamptz, total_count bigint)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
DECLARE v_target uuid := public.impersonation_target(p_session);
BEGIN
  RETURN QUERY
  SELECT l.id, l.title, l.status, l.price_amount, l.price_currency, l.created_at,
         COUNT(*) OVER () AS total_count
  FROM public.listings l
  WHERE l.seller_id = v_target
  ORDER BY l.created_at DESC
  LIMIT GREATEST(COALESCE(p_limit, 25), 1)
  OFFSET GREATEST(COALESCE(p_offset, 0), 0);
END $$;

REVOKE ALL ON FUNCTION public.impersonated_list_listings(uuid, int, int) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.impersonated_list_listings(uuid, int, int) TO authenticated, service_role;

-- D. PROOFS (fail loudly; all state cleaned up) ------------------------------
DO $proof$
DECLARE
  v_super uuid; v_target uuid; v_id uuid; v_exp timestamptz; v_msg text; v_n int;
BEGIN
  SELECT ur.user_id INTO v_super FROM public.user_roles ur
    JOIN public.roles r ON r.id = ur.role_id WHERE r.name = 'super_admin' LIMIT 1;
  SELECT p.user_id INTO v_target FROM public.profiles p
   WHERE p.user_id <> v_super
     AND NOT EXISTS (SELECT 1 FROM public.user_roles ur JOIN public.roles r ON r.id = ur.role_id
                      WHERE ur.user_id = p.user_id AND r.name = 'super_admin') LIMIT 1;
  IF v_super IS NULL OR v_target IS NULL THEN
    RAISE EXCEPTION 'PROOF SETUP FAILED: need one super admin and one ordinary account';
  END IF;

  -- P0 anonymous caller is refused outright.
  BEGIN
    PERFORM public.begin_impersonation(v_target, 'proof reason');
    RAISE EXCEPTION 'P0 FAILED: anonymous begin_impersonation succeeded';
  EXCEPTION WHEN others THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'impersonation is super-admin only' THEN
      RAISE EXCEPTION 'P0 FAILED: %', v_msg; END IF;
  END;
  RAISE NOTICE 'P0 OK: anonymous refused (super-admin only)';

  -- Act as the super admin for the rest of the ladder.
  PERFORM set_config('request.jwt.claims',
    json_build_object('sub', v_super, 'role', 'authenticated')::text, true);

  -- P1 self
  BEGIN
    PERFORM public.begin_impersonation(v_super, 'proof reason');
    RAISE EXCEPTION 'P1 FAILED: self-impersonation succeeded';
  EXCEPTION WHEN others THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'cannot impersonate yourself' THEN RAISE EXCEPTION 'P1 FAILED: %', v_msg; END IF;
  END;
  RAISE NOTICE 'P1 OK: self refused';

  -- P2 target is a super admin
  BEGIN
    PERFORM set_config('request.jwt.claims',
      json_build_object('sub', v_target, 'role', 'authenticated')::text, true);
    PERFORM 1; -- (no-op; the next call runs as the super admin again)
    PERFORM set_config('request.jwt.claims',
      json_build_object('sub', v_super, 'role', 'authenticated')::text, true);
    PERFORM public.begin_impersonation(v_super, 'proof reason');
    RAISE EXCEPTION 'P2 FAILED: super-admin target accepted';
  EXCEPTION WHEN others THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg NOT IN ('cannot impersonate yourself', 'cannot impersonate a super admin') THEN
      RAISE EXCEPTION 'P2 FAILED: %', v_msg; END IF;
  END;
  RAISE NOTICE 'P2 OK: super-admin target refused';

  -- P3 short reason
  BEGIN
    PERFORM public.begin_impersonation(v_target, 'no');
    RAISE EXCEPTION 'P3 FAILED: short reason accepted';
  EXCEPTION WHEN others THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'a reason of at least 5 characters is required' THEN
      RAISE EXCEPTION 'P3 FAILED: %', v_msg; END IF;
  END;
  RAISE NOTICE 'P3 OK: short reason refused';

  -- P4 STEP-UP is enforced while impersonation:use requires it.
  BEGIN
    PERFORM public.begin_impersonation(v_target, 'proof reason');
    RAISE EXCEPTION 'P4 FAILED: aal1 caller started a session';
  EXCEPTION WHEN others THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg NOT LIKE 'step-up required%' THEN RAISE EXCEPTION 'P4 FAILED: %', v_msg; END IF;
  END;
  RAISE NOTICE 'P4 OK: step-up enforced';

  -- Temporarily relax step-up so the happy path and its downstream gates are
  -- provable in-transaction; restored (and asserted) below.
  UPDATE public.permissions p SET requires_step_up = false
   FROM public.resources r
   WHERE r.id = p.resource_id AND r.name = 'impersonation' AND p.action = 'use';

  -- P5 happy path + dual audit (start)
  SELECT s.session_id, s.expires_at INTO v_id, v_exp
    FROM public.begin_impersonation(v_target, 'proof reason') s;
  IF v_id IS NULL THEN RAISE EXCEPTION 'P5 FAILED: no session returned'; END IF;
  IF v_exp > now() + interval '15 minutes' + interval '5 seconds'
     OR v_exp < now() + interval '14 minutes' THEN
    RAISE EXCEPTION 'P5 FAILED: expiry box is not 15 minutes (%)', v_exp; END IF;
  IF NOT EXISTS (SELECT 1 FROM public.audit_log a
                  WHERE a.action = 'impersonation.start' AND a.entity_id = v_id::text
                    AND a.meta ? 'target' AND a.meta ? 'actor') THEN
    RAISE EXCEPTION 'P5 FAILED: no dual-actor start audit row'; END IF;
  RAISE NOTICE 'P5 OK: session % opened with dual audit', v_id;

  -- P6 single-active box
  BEGIN
    PERFORM public.begin_impersonation(v_target, 'proof reason');
    RAISE EXCEPTION 'P6 FAILED: a second concurrent session was allowed';
  EXCEPTION WHEN others THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'an impersonation session is already active' THEN
      RAISE EXCEPTION 'P6 FAILED: %', v_msg; END IF;
  END;
  RAISE NOTICE 'P6 OK: one active session per actor';

  -- P7 read-only surfaces work inside the box
  PERFORM public.impersonated_get_profile(v_id);
  PERFORM public.impersonated_list_listings(v_id, 5, 0);
  IF (SELECT count(*) FROM public.get_active_impersonation()) <> 1 THEN
    RAISE EXCEPTION 'P7 FAILED: active session not visible to its actor'; END IF;
  RAISE NOTICE 'P7 OK: read surfaces + active lookup';

  -- P8 expiry
  UPDATE public.impersonation_sessions SET expires_at = now() - interval '1 second'
   WHERE id = v_id;
  BEGIN
    PERFORM public.impersonated_list_listings(v_id, 5, 0);
    RAISE EXCEPTION 'P8 FAILED: expired session still readable';
  EXCEPTION WHEN others THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'impersonation session expired' THEN RAISE EXCEPTION 'P8 FAILED: %', v_msg; END IF;
  END;
  IF (SELECT count(*) FROM public.get_active_impersonation()) <> 0 THEN
    RAISE EXCEPTION 'P8 FAILED: expired session still reported active'; END IF;
  RAISE NOTICE 'P8 OK: expiry closes the box';

  -- P9 end_impersonation on a fresh session writes the dual .end audit row
  UPDATE public.impersonation_sessions SET expires_at = now() + interval '15 minutes'
   WHERE id = v_id;
  PERFORM public.end_impersonation(v_id);
  IF NOT EXISTS (SELECT 1 FROM public.audit_log a
                  WHERE a.action = 'impersonation.end' AND a.entity_id = v_id::text
                    AND a.meta ? 'target' AND a.meta ? 'actor') THEN
    RAISE EXCEPTION 'P9 FAILED: no dual-actor end audit row'; END IF;
  BEGIN
    PERFORM public.end_impersonation(v_id);
    RAISE EXCEPTION 'P9 FAILED: ending an ended session succeeded';
  EXCEPTION WHEN others THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'no active impersonation session' THEN RAISE EXCEPTION 'P9 FAILED: %', v_msg; END IF;
  END;
  RAISE NOTICE 'P9 OK: manual end + idempotence refusal';

  -- P10 audit reads are permission-gated (the target is not staff)
  PERFORM set_config('request.jwt.claims',
    json_build_object('sub', v_target, 'role', 'authenticated')::text, true);
  BEGIN
    PERFORM public.admin_list_audit(NULL, NULL, NULL, NULL, NULL, 5, 0);
    RAISE EXCEPTION 'P10 FAILED: a non-staff account read the audit log';
  EXCEPTION WHEN others THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'permission denied' THEN RAISE EXCEPTION 'P10 FAILED: %', v_msg; END IF;
  END;
  PERFORM set_config('request.jwt.claims',
    json_build_object('sub', v_super, 'role', 'authenticated')::text, true);
  SELECT count(*) INTO v_n FROM public.admin_list_audit(NULL, NULL, NULL, NULL, NULL, 5, 0);
  IF v_n = 0 THEN RAISE EXCEPTION 'P10 FAILED: staff read returned nothing'; END IF;
  IF (SELECT count(*) FROM public.admin_audit_stats(14)) <> 1 THEN
    RAISE EXCEPTION 'P10 FAILED: stats did not return one row'; END IF;
  IF (SELECT count(*) FROM public.admin_audit_facets()) = 0 THEN
    RAISE EXCEPTION 'P10 FAILED: facets empty'; END IF;
  RAISE NOTICE 'P10 OK: audit reads gated on audit_logs:view';

  -- Restore the step-up requirement and clean up the scratch rows.
  UPDATE public.permissions p SET requires_step_up = true
   FROM public.resources r
   WHERE r.id = p.resource_id AND r.name = 'impersonation' AND p.action = 'use';
  DELETE FROM public.impersonation_sessions WHERE id = v_id;
  PERFORM set_config('request.jwt.claims', NULL, true);

  IF NOT (SELECT p.requires_step_up FROM public.permissions p JOIN public.resources r
            ON r.id = p.resource_id WHERE r.name = 'impersonation' AND p.action = 'use') THEN
    RAISE EXCEPTION 'CLEANUP FAILED: impersonation:use no longer requires step-up';
  END IF;
  IF EXISTS (SELECT 1 FROM public.impersonation_sessions) THEN
    RAISE EXCEPTION 'CLEANUP FAILED: scratch session survived';
  END IF;
  RAISE NOTICE 'CLEANUP OK';
END $proof$;

-- Grant read-back
DO $grants$
DECLARE v_bad text;
BEGIN
  SELECT string_agg(f, ', ') INTO v_bad FROM (
    SELECT f FROM unnest(ARRAY[
      'admin_list_audit(text,text,text,timestamptz,timestamptz,int,int)',
      'admin_audit_facets()', 'admin_audit_stats(int)',
      'begin_impersonation(uuid,text)', 'end_impersonation(uuid)',
      'get_active_impersonation()', 'impersonation_target(uuid)',
      'impersonated_get_profile(uuid)', 'impersonated_list_listings(uuid,int,int)']) f
    WHERE NOT has_function_privilege('authenticated', 'public.' || f, 'EXECUTE')
       OR has_function_privilege('anon', 'public.' || f, 'EXECUTE')
  ) x;
  IF v_bad IS NOT NULL THEN RAISE EXCEPTION 'GRANT MATRIX FAILED: %', v_bad; END IF;
  IF has_table_privilege('authenticated', 'public.impersonation_sessions', 'SELECT')
     OR has_table_privilege('anon', 'public.impersonation_sessions', 'SELECT') THEN
    RAISE EXCEPTION 'GRANT MATRIX FAILED: client roles can read impersonation_sessions';
  END IF;
  RAISE NOTICE 'GRANT MATRIX OK';
END $grants$;

INSERT INTO public.migration_marks(version) VALUES ('20260822073000') ON CONFLICT DO NOTHING;
