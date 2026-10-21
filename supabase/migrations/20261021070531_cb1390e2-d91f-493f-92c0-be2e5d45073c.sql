-- e2e-areas: legal
-- Bundle 22 turn 19 — M15 (mark 20261021210000): the periods the approved v2 texts still typed become legal facts
-- (DEC-221; the approved redline rev 108, "Steps outside the text": "the 6-month appeal window, the one-year claims
-- limit and the 30 days to talk first become facts, like the others"; DEC-129 "no fact is typed into the legal text").
--  1. legal_settings gains appeal_months (default 6, 1 to 24), claims_limit_months (default 12, 1 to 60),
--     talk_first_days (default 30, 1 to 90) and complaint_ack_days (default 30, 1 to 90), and a rule that a closed
--     account's identity is kept at least as long as the claims limit (account_keep_months >= claims_limit_months —
--     the proof of acceptance must outlive the window for claims, rev 108 item 2). The texts quote them as
--     {{appeal_months}}, {{claims_limit_months}}, {{talk_first_days}} and {{complaint_ack_days}}; each published
--     version freezes them in its settings_snapshot like every other fact.
--  2. admin_set_legal_settings, re-declared whole from M9 (20261019232513 :16-:143), takes the four with the other
--     numbers (four named changes: the key list, the number list with its bounds, the assignments) and refuses an
--     identity period shorter than the claims limit as badValue:account_keep_months before anything is written.
-- Proofs: the columns, their defaults and checks, the cross rule, the door's header, grants and keys (catalogue only).

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261021200000') THEN
    RAISE EXCEPTION 'bundle 22 turn 17c M14 (mark 20261021200000) must be applied first';
  END IF;
END $$;

-- ===== 1 — the four facts and the rule =====
ALTER TABLE public.legal_settings
  ADD COLUMN appeal_months integer NOT NULL DEFAULT 6
    CONSTRAINT legal_settings_appeal_months_check CHECK (appeal_months BETWEEN 1 AND 24),
  ADD COLUMN claims_limit_months integer NOT NULL DEFAULT 12
    CONSTRAINT legal_settings_claims_limit_months_check CHECK (claims_limit_months BETWEEN 1 AND 60),
  ADD COLUMN talk_first_days integer NOT NULL DEFAULT 30
    CONSTRAINT legal_settings_talk_first_days_check CHECK (talk_first_days BETWEEN 1 AND 90),
  ADD COLUMN complaint_ack_days integer NOT NULL DEFAULT 30
    CONSTRAINT legal_settings_complaint_ack_days_check CHECK (complaint_ack_days BETWEEN 1 AND 90),
  ADD CONSTRAINT legal_settings_proof_outlives_claims_check CHECK (account_keep_months >= claims_limit_months);

-- ===== 2 — the settings door (re-declared whole; four keys added, the identity rule) =====
CREATE OR REPLACE FUNCTION public.admin_set_legal_settings(p_settings jsonb)
RETURNS jsonb
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid    uuid := auth.uid();
  v_before jsonb;
  v_after  public.legal_settings%ROWTYPE;
  v_key    text;
  v_text   text;
  v_num    integer;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF NOT public.has_permission(v_uid, 'legal', 'edit') THEN RAISE EXCEPTION 'permission denied'; END IF;
  PERFORM public.require_step_up_if_needed('legal', 'edit');
  IF p_settings IS NULL OR jsonb_typeof(p_settings) <> 'object' THEN RAISE EXCEPTION 'badValue:settings'; END IF;
  FOR v_key IN SELECT k FROM jsonb_object_keys(p_settings) AS k LOOP
    IF v_key NOT IN ('operator_name','operator_address','legal_email','privacy_email','governing_law',
                     'providers','copyright_agent','liability_limit_usd','notice_days','response_days',
                     'response_extra_days','deleted_ad_keep_months','dispute_keep_years',
                     'operator_details','legal_phone','security_email','listed_ad_keep_months',
                     'account_keep_months','technical_keep_months','sold_visible_days',
                     'appeal_months','claims_limit_months','talk_first_days','complaint_ack_days') THEN
      RAISE EXCEPTION 'badValue:%', v_key;
    END IF;
  END LOOP;
  -- Every number is checked before anything is written, so a bad value is refused as badValue:<key>
  -- and never reaches the table's CHECK constraints (INC-762).
  FOR v_key IN SELECT k FROM jsonb_object_keys(p_settings) AS k LOOP
    IF v_key IN ('liability_limit_usd','notice_days','response_days','response_extra_days',
                 'deleted_ad_keep_months','dispute_keep_years','listed_ad_keep_months',
                 'account_keep_months','technical_keep_months','sold_visible_days',
                 'appeal_months','claims_limit_months','talk_first_days','complaint_ack_days') THEN
      v_text := p_settings ->> v_key;
      IF v_text IS NULL OR v_text !~ '^[0-9]{1,7}$' THEN RAISE EXCEPTION 'badValue:%', v_key; END IF;
      v_num := v_text::integer;
      IF (v_key = 'liability_limit_usd' AND v_num > 1000000)
         OR (v_key = 'notice_days' AND v_num > 365)
         OR (v_key = 'response_days' AND (v_num < 1 OR v_num > 90))
         OR (v_key = 'response_extra_days' AND v_num > 90)
         OR (v_key = 'deleted_ad_keep_months' AND (v_num < 1 OR v_num > 120))
         OR (v_key = 'dispute_keep_years' AND v_num > 20)
         OR (v_key IN ('listed_ad_keep_months','account_keep_months','technical_keep_months')
             AND (v_num < 1 OR v_num > 120))
         OR (v_key = 'sold_visible_days' AND (v_num < 1 OR v_num > 365))
         OR (v_key = 'appeal_months' AND (v_num < 1 OR v_num > 24))
         OR (v_key = 'claims_limit_months' AND (v_num < 1 OR v_num > 60))
         OR (v_key IN ('talk_first_days','complaint_ack_days') AND (v_num < 1 OR v_num > 90)) THEN
        RAISE EXCEPTION 'badValue:%', v_key;
      END IF;
    END IF;
  END LOOP;
  -- The new texts are checked before anything is written as well (M3).
  IF p_settings ? 'operator_details' AND length(coalesce(p_settings ->> 'operator_details', '')) > 2000 THEN
    RAISE EXCEPTION 'badValue:operator_details';
  END IF;
  IF p_settings ? 'legal_phone' AND coalesce(p_settings ->> 'legal_phone', '') <> ''
     AND (p_settings ->> 'legal_phone') !~ '^\+?[0-9][0-9 ()-]{4,37}[0-9]$' THEN
    RAISE EXCEPTION 'badValue:legal_phone';
  END IF;
  IF p_settings ? 'security_email'
     AND coalesce(p_settings ->> 'security_email', '') !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' THEN
    RAISE EXCEPTION 'badValue:security_email';
  END IF;
  IF p_settings ? 'security_email' AND length(p_settings ->> 'security_email') > 320 THEN
    RAISE EXCEPTION 'badValue:security_email';
  END IF;
  SELECT to_jsonb(s) - 'id' - 'updated_by' INTO v_before FROM public.legal_settings s WHERE s.id FOR UPDATE;
  -- The proof of acceptance must outlive the window for claims (rev 108 item 2): a closed account's identity is
  -- kept at least as long as the claims limit, checked here so it is refused as badValue:<key>, never by the CHECK.
  IF (CASE WHEN p_settings ? 'account_keep_months' THEN (p_settings ->> 'account_keep_months')::integer
           ELSE (v_before ->> 'account_keep_months')::integer END)
     < (CASE WHEN p_settings ? 'claims_limit_months' THEN (p_settings ->> 'claims_limit_months')::integer
             ELSE (v_before ->> 'claims_limit_months')::integer END) THEN
    RAISE EXCEPTION 'badValue:account_keep_months';
  END IF;
  UPDATE public.legal_settings SET
    operator_name = CASE WHEN p_settings ? 'operator_name' THEN p_settings ->> 'operator_name' ELSE operator_name END,
    operator_address = CASE WHEN p_settings ? 'operator_address' THEN p_settings ->> 'operator_address' ELSE operator_address END,
    legal_email = CASE WHEN p_settings ? 'legal_email' THEN p_settings ->> 'legal_email' ELSE legal_email END,
    privacy_email = CASE WHEN p_settings ? 'privacy_email' THEN p_settings ->> 'privacy_email' ELSE privacy_email END,
    governing_law = CASE WHEN p_settings ? 'governing_law' THEN p_settings ->> 'governing_law' ELSE governing_law END,
    providers = CASE WHEN p_settings ? 'providers' THEN p_settings ->> 'providers' ELSE providers END,
    copyright_agent = CASE WHEN p_settings ? 'copyright_agent'
                           THEN NULLIF(p_settings ->> 'copyright_agent', '') ELSE copyright_agent END,
    liability_limit_usd = CASE WHEN p_settings ? 'liability_limit_usd'
                               THEN (p_settings ->> 'liability_limit_usd')::integer ELSE liability_limit_usd END,
    notice_days = CASE WHEN p_settings ? 'notice_days'
                       THEN (p_settings ->> 'notice_days')::integer ELSE notice_days END,
    response_days = CASE WHEN p_settings ? 'response_days'
                         THEN (p_settings ->> 'response_days')::integer ELSE response_days END,
    response_extra_days = CASE WHEN p_settings ? 'response_extra_days'
                               THEN (p_settings ->> 'response_extra_days')::integer ELSE response_extra_days END,
    deleted_ad_keep_months = CASE WHEN p_settings ? 'deleted_ad_keep_months'
                                  THEN (p_settings ->> 'deleted_ad_keep_months')::integer ELSE deleted_ad_keep_months END,
    dispute_keep_years = CASE WHEN p_settings ? 'dispute_keep_years'
                              THEN (p_settings ->> 'dispute_keep_years')::integer ELSE dispute_keep_years END,
    operator_details = CASE WHEN p_settings ? 'operator_details'
                            THEN NULLIF(btrim(coalesce(p_settings ->> 'operator_details', '')), '') ELSE operator_details END,
    legal_phone = CASE WHEN p_settings ? 'legal_phone'
                       THEN NULLIF(btrim(coalesce(p_settings ->> 'legal_phone', '')), '') ELSE legal_phone END,
    security_email = CASE WHEN p_settings ? 'security_email' THEN p_settings ->> 'security_email' ELSE security_email END,
    listed_ad_keep_months = CASE WHEN p_settings ? 'listed_ad_keep_months'
                                 THEN (p_settings ->> 'listed_ad_keep_months')::integer ELSE listed_ad_keep_months END,
    account_keep_months = CASE WHEN p_settings ? 'account_keep_months'
                               THEN (p_settings ->> 'account_keep_months')::integer ELSE account_keep_months END,
    technical_keep_months = CASE WHEN p_settings ? 'technical_keep_months'
                                 THEN (p_settings ->> 'technical_keep_months')::integer ELSE technical_keep_months END,
    sold_visible_days = CASE WHEN p_settings ? 'sold_visible_days'
                             THEN (p_settings ->> 'sold_visible_days')::integer ELSE sold_visible_days END,
    appeal_months = CASE WHEN p_settings ? 'appeal_months'
                         THEN (p_settings ->> 'appeal_months')::integer ELSE appeal_months END,
    claims_limit_months = CASE WHEN p_settings ? 'claims_limit_months'
                               THEN (p_settings ->> 'claims_limit_months')::integer ELSE claims_limit_months END,
    talk_first_days = CASE WHEN p_settings ? 'talk_first_days'
                           THEN (p_settings ->> 'talk_first_days')::integer ELSE talk_first_days END,
    complaint_ack_days = CASE WHEN p_settings ? 'complaint_ack_days'
                              THEN (p_settings ->> 'complaint_ack_days')::integer ELSE complaint_ack_days END,
    updated_at = now(),
    updated_by = v_uid
   WHERE id
  RETURNING * INTO v_after;
  -- Per-field validation after assignment so the CHECK bounds and the text rules share one refusal shape.
  FOREACH v_text IN ARRAY ARRAY[v_after.legal_email, v_after.privacy_email] LOOP
    IF v_text IS NULL OR v_text !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' THEN RAISE EXCEPTION 'badValue:email'; END IF;
  END LOOP;
  IF v_after.operator_name IS NULL OR length(btrim(v_after.operator_name)) = 0
     OR length(v_after.operator_name) > 2000 THEN RAISE EXCEPTION 'badValue:operator_name'; END IF;
  IF v_after.operator_address IS NULL OR length(btrim(v_after.operator_address)) = 0
     OR length(v_after.operator_address) > 2000 THEN RAISE EXCEPTION 'badValue:operator_address'; END IF;
  IF v_after.governing_law IS NULL OR length(btrim(v_after.governing_law)) = 0
     OR length(v_after.governing_law) > 2000 THEN RAISE EXCEPTION 'badValue:governing_law'; END IF;
  IF v_after.providers IS NULL OR length(btrim(v_after.providers)) = 0
     OR length(v_after.providers) > 2000 THEN RAISE EXCEPTION 'badValue:providers'; END IF;
  IF v_after.copyright_agent IS NOT NULL AND length(v_after.copyright_agent) > 2000 THEN
    RAISE EXCEPTION 'badValue:copyright_agent';
  END IF;
  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
  VALUES (v_uid, 'legal.settings_set', 'legal_settings', 'settings',
          jsonb_build_object('before', v_before, 'after', to_jsonb(v_after) - 'id' - 'updated_by'));
  RETURN jsonb_build_object('ok', true);
END;
$$;
REVOKE ALL ON FUNCTION public.admin_set_legal_settings(jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_set_legal_settings(jsonb) TO authenticated;
GRANT ALL ON FUNCTION public.admin_set_legal_settings(jsonb) TO service_role;

-- ===== 3 — proofs (a failure raises; a clean apply is the pass; the catalogue only — no row is read) =====
DO $$
DECLARE
  v_def text := pg_get_functiondef('public.admin_set_legal_settings(jsonb)'::regprocedure);
  v_key text;
BEGIN
  FOREACH v_key IN ARRAY ARRAY['appeal_months', 'claims_limit_months', 'talk_first_days', 'complaint_ack_days'] LOOP
    IF NOT EXISTS (SELECT 1 FROM pg_attribute a
                    WHERE a.attrelid = 'public.legal_settings'::regclass AND a.attname = v_key
                      AND a.attnotnull AND NOT a.attisdropped AND a.atttypid = 'integer'::regtype) THEN
      RAISE EXCEPTION 'proof: legal_settings.% is not an integer NOT NULL column', v_key;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_constraint c
                    WHERE c.conrelid = 'public.legal_settings'::regclass AND c.contype = 'c'
                      AND c.conname = 'legal_settings_' || v_key || '_check') THEN
      RAISE EXCEPTION 'proof: legal_settings.% has no bound', v_key;
    END IF;
    IF position('''' || v_key || '''' IN v_def) = 0 OR position(v_key || ' = CASE' IN v_def) = 0 THEN
      RAISE EXCEPTION 'proof: admin_set_legal_settings does not take %', v_key;
    END IF;
  END LOOP;
  IF (SELECT string_agg(a.attname || '=' || pg_get_expr(d.adbin, d.adrelid), ',' ORDER BY a.attname)
        FROM pg_attrdef d JOIN pg_attribute a ON a.attrelid = d.adrelid AND a.attnum = d.adnum
       WHERE d.adrelid = 'public.legal_settings'::regclass
         AND a.attname IN ('appeal_months', 'claims_limit_months', 'talk_first_days', 'complaint_ack_days'))
     IS DISTINCT FROM 'appeal_months=6,claims_limit_months=12,complaint_ack_days=30,talk_first_days=30' THEN
    RAISE EXCEPTION 'proof: the four defaults are not 6, 12, 30 and 30';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint c
                  WHERE c.conrelid = 'public.legal_settings'::regclass
                    AND c.conname = 'legal_settings_proof_outlives_claims_check') THEN
    RAISE EXCEPTION 'proof: the identity-outlives-claims rule is missing';
  END IF;
  IF position('badValue:account_keep_months' IN v_def) = 0 THEN
    RAISE EXCEPTION 'proof: the door does not refuse a short identity period';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_proc p WHERE p.oid = 'public.admin_set_legal_settings(jsonb)'::regprocedure
                    AND p.prosecdef AND p.provolatile = 'v' AND p.proconfig @> ARRAY['search_path=public']) THEN
    RAISE EXCEPTION 'proof: admin_set_legal_settings header changed';
  END IF;
  IF has_function_privilege('anon', 'public.admin_set_legal_settings(jsonb)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.admin_set_legal_settings(jsonb)', 'EXECUTE') THEN
    RAISE EXCEPTION 'proof: admin_set_legal_settings grants changed';
  END IF;
END $$;

INSERT INTO public.migration_marks (version) VALUES ('20261021210000') ON CONFLICT DO NOTHING;