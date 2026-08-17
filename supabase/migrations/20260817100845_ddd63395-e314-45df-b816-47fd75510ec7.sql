-- =====================================================================
-- U1f-4 — STEP-UP MUST NOT TRUST A STALE aal2 CLAIM (INC-081) — Tier A
--
-- Operator repro: after unenrolling the only TOTP factor the session still
-- carried an `aal2` JWT claim, so `deactivate` succeeded; and the enrollment
-- verify itself elevated the session indefinitely, so no later prompt fired.
--
-- THE TWO-CONDITION LAW (documented in the function comment below):
--   a sensitive action is stepped up ONLY IF
--     (1) the caller currently OWNS a verified TOTP factor
--         (auth.mfa_factors, status='verified', factor_type='totp'), AND
--     (2) the JWT claims aal2 AND the CURRENT session shows a TOTP factor
--         verification within the last 10 minutes
--         (auth.mfa_amr_claims.authentication_method='totp',
--          updated_at > now() - interval '10 minutes').
--   A bearer claim alone is never enough.
--
-- NOTE: enrollment's own verify writes an amr row too, so an action within
-- 10 minutes of enrolling is legitimately stepped up (accepted, documented).
-- After that window a fresh verification is required.
--
-- Additive + idempotent. No table is created. The definer function is
-- re-declared and its REVOKE/GRANT lines are restated in-file (INC-074).
-- =====================================================================

CREATE OR REPLACE FUNCTION public.require_step_up_if_needed(p_resource text, p_action text)
RETURNS void
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_needs      boolean;
  v_user       uuid := auth.uid();
  v_session    uuid;
  v_has_factor boolean;
  v_fresh      boolean;
BEGIN
  SELECT COALESCE(bool_or(p.requires_step_up), false) INTO v_needs
    FROM public.permissions p
    JOIN public.resources r ON r.id = p.resource_id
   WHERE r.name = p_resource AND p.action = p_action;

  IF NOT v_needs THEN
    RETURN;
  END IF;

  -- (1) the caller must currently OWN a verified TOTP factor. A stale aal2
  -- claim left over from before an unenroll cannot pass this.
  SELECT EXISTS (
    SELECT 1 FROM auth.mfa_factors f
     WHERE f.user_id = v_user
       AND f.status::text = 'verified'
       AND f.factor_type::text = 'totp'
  ) INTO v_has_factor;

  IF NOT v_has_factor THEN
    RAISE EXCEPTION 'step-up required: no verified factor'
      USING ERRCODE = 'P0009',
            HINT = 'Set up an authenticator app (TOTP) and retry this action.';
  END IF;

  -- (2) aal2 claim AND a fresh TOTP verification on THIS session.
  IF COALESCE(auth.jwt() ->> 'aal', 'aal1') IS DISTINCT FROM 'aal2' THEN
    RAISE EXCEPTION 'step-up required'
      USING ERRCODE = 'P0009',
            HINT = 'Verify a second factor (TOTP) and retry this action.';
  END IF;

  BEGIN
    v_session := NULLIF(auth.jwt() ->> 'session_id', '')::uuid;
  EXCEPTION WHEN others THEN
    v_session := NULL;
  END;

  SELECT EXISTS (
    SELECT 1 FROM auth.mfa_amr_claims c
     WHERE c.session_id = v_session
       AND c.authentication_method = 'totp'
       AND c.updated_at > now() - interval '10 minutes'
  ) INTO v_fresh;

  IF NOT v_fresh THEN
    RAISE EXCEPTION 'step-up required: verification expired'
      USING ERRCODE = 'P0009',
            HINT = 'Enter a fresh code from your authenticator app.';
  END IF;
END $$;

COMMENT ON FUNCTION public.require_step_up_if_needed(text, text) IS
  'U1f-4 (INC-081): sensitive-action gate. Two conditions, both server-verified: '
  '(1) the caller owns a verified TOTP factor in auth.mfa_factors; '
  '(2) the JWT claims aal2 AND auth.mfa_amr_claims shows a totp verification on '
  'the current session within 10 minutes. A bearer aal2 claim alone is never enough.';

REVOKE ALL ON FUNCTION public.require_step_up_if_needed(text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.require_step_up_if_needed(text, text) TO authenticated;

-- ---------- PROOFS (fail loudly) -------------------------------------------
DO $$
DECLARE
  v_user      uuid;
  v_session   uuid := gen_random_uuid();
  v_factor    uuid := gen_random_uuid();
  ok          boolean;
  can_write   boolean := true;
BEGIN
  SELECT user_id INTO v_user FROM public.profiles ORDER BY created_at LIMIT 1;
  IF v_user IS NULL THEN
    RAISE NOTICE 'PROOFS SKIPPED: no profile rows to impersonate';
    RETURN;
  END IF;

  -- P5: aal2 claim, NO verified factor -> refused.
  PERFORM set_config('request.jwt.claims',
    json_build_object('sub', v_user::text, 'role', 'authenticated', 'aal', 'aal2',
                      'session_id', v_session::text)::text, true);
  ok := false;
  BEGIN
    PERFORM public.require_step_up_if_needed('profiles', 'update');
  EXCEPTION WHEN others THEN
    IF SQLERRM ILIKE '%no verified factor%' THEN ok := true; ELSE RAISE; END IF;
  END;
  IF NOT ok THEN RAISE EXCEPTION 'P5 FAILED: stale aal2 without a factor was accepted'; END IF;
  RAISE NOTICE 'P5 PASS: aal2 claim without a verified factor is refused';

  -- P6/P7 need scratch rows in auth.*; if they are not writable, say so.
  BEGIN
    INSERT INTO auth.sessions(id, user_id, created_at, updated_at, aal)
    VALUES (v_session, v_user, now(), now(), 'aal2');
    INSERT INTO auth.mfa_factors(id, user_id, friendly_name, factor_type, status, created_at, updated_at, secret)
    VALUES (v_factor, v_user, 'u1f4-proof', 'totp', 'verified', now(), now(), 'PROOFSECRET');
  EXCEPTION WHEN others THEN
    can_write := false;
  END;

  IF NOT can_write THEN
    RAISE NOTICE 'P6/P7 DEFERRED: auth.mfa_factors is not writable from this migration; covered by E2E MF-6/MF-7';
  ELSE
    -- P6: factor + aal2 + FRESH amr -> succeeds.
    INSERT INTO auth.mfa_amr_claims(id, session_id, created_at, updated_at, authentication_method)
    VALUES (gen_random_uuid(), v_session, now(), now(), 'totp');
    PERFORM public.require_step_up_if_needed('profiles', 'update');
    RAISE NOTICE 'P6 PASS: verified factor + aal2 + fresh totp amr is accepted';

    -- P7: same, but the amr row is older than the 10-minute window -> refused.
    UPDATE auth.mfa_amr_claims
       SET updated_at = now() - interval '30 minutes'
     WHERE session_id = v_session;
    ok := false;
    BEGIN
      PERFORM public.require_step_up_if_needed('profiles', 'update');
    EXCEPTION WHEN others THEN
      IF SQLERRM ILIKE '%verification expired%' THEN ok := true; ELSE RAISE; END IF;
    END;
    IF NOT ok THEN RAISE EXCEPTION 'P7 FAILED: a stale (>10 min) verification was accepted'; END IF;
    RAISE NOTICE 'P7 PASS: a verification older than 10 minutes is refused';

    DELETE FROM auth.mfa_amr_claims WHERE session_id = v_session;
    DELETE FROM auth.mfa_factors WHERE id = v_factor;
    DELETE FROM auth.sessions WHERE id = v_session;
  END IF;

  -- P8: read paths are unaffected (no permission is marked requires_step_up).
  PERFORM public.require_step_up_if_needed('audit_logs', 'read');
  RAISE NOTICE 'P8 PASS: read RPC resource is unaffected by the gate';

  PERFORM set_config('request.jwt.claims', NULL, true);
END $$;

-- Self-mark (last statement, per the self-marking law).
INSERT INTO public.migration_marks(version) VALUES ('20260817100845') ON CONFLICT DO NOTHING;