-- e2e-areas: legal
-- Bundle 22 (Stage 1) turn 3 — M3b (part 2 of 2): the settings and publish doors. Every re-declared door
-- keeps its header and body apart from the named change.
--  7. admin_set_legal_settings accepts the six new facts of M3a: the company details and the phone may be
--     empty (cleared), the phone is digits, spaces, + ( ) and -, the security e-mail is an e-mail, each
--     period a whole number of months from 1 to 120.
--  8. admin_publish_legal_version refuses a text that uses a token which is not a fact (unknownFact:<name>)
--     or whose fact is empty (factMissing:<name>), through legal_text_fact_problem (new; not granted to
--     the browser roles).
-- Gated on M3a's mark; a migration is not DONE until its mark is read back.

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261020020000') THEN
    RAISE EXCEPTION 'bundle 22 turn 3 M3a (mark 20261020020000) must be applied first';
  END IF;
END $$;

-- ===== 7 — admin_set_legal_settings accepts the new facts =====
-- Set the legal settings: a full row; every field is validated, an unknown key is a refusal.
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
                     'account_keep_months','technical_keep_months') THEN
      RAISE EXCEPTION 'badValue:%', v_key;
    END IF;
  END LOOP;
  -- Every number is checked before anything is written, so a bad value is refused as badValue:<key>
  -- and never reaches the table's CHECK constraints (INC-762).
  FOR v_key IN SELECT k FROM jsonb_object_keys(p_settings) AS k LOOP
    IF v_key IN ('liability_limit_usd','notice_days','response_days','response_extra_days',
                 'deleted_ad_keep_months','dispute_keep_years','listed_ad_keep_months',
                 'account_keep_months','technical_keep_months') THEN
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
             AND (v_num < 1 OR v_num > 120)) THEN
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

-- ===== 8 — a published text never shows a token without its fact =====
-- The first problem with a text's tokens against a settings snapshot, or NULL: 'unknownFact:<name>' for a
-- token that is not a fact, 'factMissing:<name>' for a fact that is empty. Tokens are {{name}} with name
-- of lower-case letters and _, as LegalText reads them; names are checked in alphabetical order.
CREATE FUNCTION public.legal_text_fact_problem(p_text text, p_snapshot jsonb)
RETURNS text
LANGUAGE sql
IMMUTABLE
SET search_path TO 'public'
AS $$
  SELECT CASE WHEN NOT (coalesce(p_snapshot, '{}'::jsonb) ? t.name) THEN 'unknownFact:' || t.name
              ELSE 'factMissing:' || t.name END
    FROM (SELECT DISTINCT (regexp_matches(coalesce(p_text, ''), '\{\{([a-z_]+)\}\}', 'g'))[1] AS name) t
   WHERE NOT (coalesce(p_snapshot, '{}'::jsonb) ? t.name)
      OR p_snapshot ->> t.name IS NULL
      OR btrim(p_snapshot ->> t.name) = ''
   ORDER BY t.name
   LIMIT 1;
$$;
REVOKE ALL ON FUNCTION public.legal_text_fact_problem(text, jsonb) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.legal_text_fact_problem(text, jsonb) TO service_role;

-- Publish a draft: both languages, a label and a change log are required. Version 1 and every non-material
-- version take effect now; a material version takes effect no earlier than the notice period. Every fact
-- in the text is a setting token, so the settings row is frozen into the version at publish; a token that
-- is not a fact, or whose fact is empty, is refused (M3).
CREATE OR REPLACE FUNCTION public.admin_publish_legal_version(
  p_version_id uuid,
  p_material boolean,
  p_effective_at timestamptz DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid       uuid := auth.uid();
  v_v         public.legal_versions%ROWTYPE;
  v_notice    integer;
  v_effective timestamptz;
  v_snapshot  jsonb;
  v_problem   text;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF NOT public.has_permission(v_uid, 'legal', 'publish') THEN RAISE EXCEPTION 'permission denied'; END IF;
  PERFORM public.require_step_up_if_needed('legal', 'publish');
  IF p_material IS NULL THEN RAISE EXCEPTION 'badValue:material'; END IF;
  SELECT * INTO v_v FROM public.legal_versions v WHERE v.id = p_version_id FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'unknownVersion'; END IF;
  IF v_v.status <> 'draft' THEN RAISE EXCEPTION 'notDraft'; END IF;
  IF v_v.label IS NULL OR length(btrim(v_v.label)) NOT BETWEEN 1 AND 60 THEN
    RAISE EXCEPTION 'labelRequired';
  END IF;
  IF v_v.body_en IS NULL OR v_v.body_am IS NULL
     OR length(btrim(v_v.body_en)) = 0 OR length(btrim(v_v.body_am)) = 0 THEN
    RAISE EXCEPTION 'bothLanguages';
  END IF;
  IF v_v.changelog IS NULL OR length(btrim(v_v.changelog)) = 0 THEN
    RAISE EXCEPTION 'changelogRequired';
  END IF;
  SELECT s.notice_days INTO v_notice FROM public.legal_settings s WHERE s.id;
  SELECT to_jsonb(s) - 'id' - 'updated_at' - 'updated_by' INTO v_snapshot
    FROM public.legal_settings s WHERE s.id;
  v_problem := public.legal_text_fact_problem(v_v.body_en || E'\n' || v_v.body_am, v_snapshot);
  IF v_problem IS NOT NULL THEN RAISE EXCEPTION '%', v_problem; END IF;
  IF p_material THEN
    v_effective := coalesce(p_effective_at, now() + make_interval(days => v_notice));
    IF v_effective < now() + make_interval(days => v_notice) THEN
      RAISE EXCEPTION 'noticeTooShort';
    END IF;
  ELSE
    v_effective := coalesce(p_effective_at, now());
  END IF;
  UPDATE public.legal_versions
     SET status = 'published',
         material = p_material,
         effective_at = v_effective,
         published_at = now(),
         published_by = v_uid,
         settings_snapshot = v_snapshot
   WHERE id = v_v.id
  RETURNING * INTO v_v;
  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
  VALUES (v_uid, 'legal.published', 'legal_version', v_v.id::text,
          jsonb_build_object('document_id', v_v.document_id, 'version', v_v.version,
                             'label', v_v.label, 'material', p_material, 'effective_at', v_effective));
  RETURN jsonb_build_object('version_id', v_v.id, 'effective_at', v_effective);
END;
$$;
REVOKE ALL ON FUNCTION public.admin_publish_legal_version(uuid, boolean, timestamptz) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_publish_legal_version(uuid, boolean, timestamptz) TO authenticated;
GRANT ALL ON FUNCTION public.admin_publish_legal_version(uuid, boolean, timestamptz) TO service_role;

-- Proofs, with no caller (G39): the token rule; the two caller-bound doors refuse a missing caller;
-- headers and grants as declared. Answers that need a person (the settings, the publish refusal) are
-- proven by LG-13 and LG-14.
DO $$
DECLARE
  v_vol  "char";
  v_def  boolean;
  v_conf text[];
  r      record;
BEGIN
  IF public.legal_text_fact_problem('a {{legal_email}} b', '{"legal_email": "x@example.invalid"}'::jsonb) IS NOT NULL
     OR public.legal_text_fact_problem('{{nope}} {{legal_email}}', '{"legal_email": "x@example.invalid"}'::jsonb)
        IS DISTINCT FROM 'unknownFact:nope'
     OR public.legal_text_fact_problem('{{legal_phone}}', '{"legal_phone": null}'::jsonb)
        IS DISTINCT FROM 'factMissing:legal_phone'
     OR public.legal_text_fact_problem('{{copyright_agent}}', '{"copyright_agent": "  "}'::jsonb)
        IS DISTINCT FROM 'factMissing:copyright_agent'
     OR public.legal_text_fact_problem('{{b_fact}} {{a_fact}}', '{}'::jsonb) IS DISTINCT FROM 'unknownFact:a_fact'
     OR public.legal_text_fact_problem('no tokens, {single} braces', '{}'::jsonb) IS NOT NULL THEN
    RAISE EXCEPTION 'proof failed: legal_text_fact_problem';
  END IF;
  FOR r IN SELECT * FROM (VALUES ('settings'), ('publish')) AS t(door) LOOP
    BEGIN
      IF r.door = 'settings' THEN PERFORM public.admin_set_legal_settings('{"legal_phone": "x"}'::jsonb);
      ELSE PERFORM public.admin_publish_legal_version(gen_random_uuid(), false);
      END IF;
      RAISE EXCEPTION 'proof failed: % answered a missing caller', r.door;
    EXCEPTION WHEN raise_exception THEN
      IF SQLERRM <> 'not authenticated' THEN RAISE; END IF;
    END;
  END LOOP;
  FOR r IN SELECT * FROM (VALUES
      ('public.admin_set_legal_settings(jsonb)', 'v'::"char", true, true),
      ('public.admin_publish_legal_version(uuid, boolean, timestamp with time zone)', 'v'::"char", true, true),
      ('public.legal_text_fact_problem(text, jsonb)', 'i'::"char", false, false)) AS t(sig, vol, definer, auth_ok) LOOP
    SELECT p.provolatile, p.prosecdef, p.proconfig INTO v_vol, v_def, v_conf
      FROM pg_proc p WHERE p.oid = r.sig::regprocedure;
    IF v_vol IS DISTINCT FROM r.vol OR v_def IS DISTINCT FROM r.definer
       OR v_conf IS DISTINCT FROM ARRAY['search_path=public'] THEN
      RAISE EXCEPTION 'proof failed: % header (%, %, %)', r.sig, v_vol, v_def, v_conf;
    END IF;
    IF has_function_privilege('anon', r.sig, 'EXECUTE') THEN
      RAISE EXCEPTION 'proof failed: anon may execute %', r.sig;
    END IF;
    IF has_function_privilege('authenticated', r.sig, 'EXECUTE') IS DISTINCT FROM r.auth_ok THEN
      RAISE EXCEPTION 'proof failed: % authenticated EXECUTE is not %', r.sig, r.auth_ok;
    END IF;
  END LOOP;
END $$;

INSERT INTO public.migration_marks (version) VALUES ('20261020030000') ON CONFLICT (version) DO NOTHING;