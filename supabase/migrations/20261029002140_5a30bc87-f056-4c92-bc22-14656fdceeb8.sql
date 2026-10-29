-- Foundations turn D1, M6b-legal — INC-951 part 3c, the staff_config gate on the six legal config doors
-- (ruling, stop 10, item 2: M6b split by concern — legal / catalogue / roles — because the 22 bodies pass 60 KB).
--   * Each door: its live body (ethio-prod, read at write time) redeclared whole; the ONLY change is one
--     rate_gate('staff_config') line right after its step-up line (its last authority check) and before its
--     first write. Name, arguments, return type, header (SECURITY DEFINER, search_path public) and grants
--     unchanged; the existing grants are restated (E2), none added.
--   * Census (ethio-prod): no public function calls any of the six, so no bulk caller spends this dial.
--   * Fingerprints normalise CR (INC-968): md5(replace(prosrc, E'\r', '')).
-- The dial: staff_config 600 / 3600 (M6a's rate_dials row; src/lib/dials.ts staffConfig).

-- admin_add_legal_translation: live body (ethio-prod, md5(replace(prosrc, E'\r', '')) 97b996345eba02109957e236d6de9b99) whole; the only change: the staff_config gate,
-- inserted as body line 16, right after the step-up line and before the first write.
CREATE OR REPLACE FUNCTION public.admin_add_legal_translation(p_version_id uuid, p_language text, p_body text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid uuid := auth.uid();
  v_v public.legal_versions%ROWTYPE;
  v_d public.legal_documents%ROWTYPE;
  v_problem text;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF NOT public.has_permission(v_uid, 'legal', 'publish') THEN RAISE EXCEPTION 'permission denied'; END IF;
  PERFORM public.require_step_up_if_needed('legal', 'publish');
  -- INC-951 3c (D1 M6b-legal) — after the door's authority, before its first write: its dial (staff_config).
  IF NOT coalesce((public.rate_gate('staff_config')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;
  SELECT * INTO v_v FROM public.legal_versions WHERE id = p_version_id FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'unknownVersion'; END IF;
  IF v_v.status <> 'published' THEN RAISE EXCEPTION 'notPublished'; END IF;
  IF p_language IS NULL OR p_language IN ('en', 'am') OR NOT EXISTS (
    SELECT 1 FROM public.languages l WHERE l.code = p_language AND l.enabled_admin
  ) THEN RAISE EXCEPTION 'badLanguage'; END IF;
  IF p_body IS NULL OR length(btrim(p_body)) = 0 THEN RAISE EXCEPTION 'badValue:body'; END IF;
  IF length(p_body) > 200000 THEN RAISE EXCEPTION 'tooLong'; END IF;
  IF EXISTS (SELECT 1 FROM public.legal_version_texts t WHERE t.version_id = v_v.id AND t.language = p_language) THEN
    RAISE EXCEPTION 'translationExists';
  END IF;
  v_problem := public.legal_text_fact_problem(p_body, v_v.settings_snapshot);
  IF v_problem IS NOT NULL THEN RAISE EXCEPTION '%', v_problem; END IF;
  SELECT * INTO v_d FROM public.legal_documents WHERE id = v_v.document_id;
  INSERT INTO public.legal_version_texts (version_id, language, body) VALUES (v_v.id, p_language, p_body);
  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
  VALUES (v_uid, 'legal.translation_added', 'legal_version', v_v.id::text,
    jsonb_build_object('kind', v_d.kind, 'country_code', v_d.country_code,
      'version', v_v.version, 'label', v_v.label, 'language', p_language));
  RETURN jsonb_build_object('ok', true, 'version_id', v_v.id, 'language', p_language);
END;
$function$;
REVOKE ALL ON FUNCTION public.admin_add_legal_translation(uuid, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_add_legal_translation(uuid, text, text) TO authenticated, service_role;

-- admin_discard_legal_draft: live body (ethio-prod, md5(replace(prosrc, E'\r', '')) fc8a0e85da924b6b9821148d400ac4b3) whole; the only change: the staff_config gate,
-- inserted as body line 14, right after the step-up line and before the first write.
CREATE OR REPLACE FUNCTION public.admin_discard_legal_draft(p_version_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid uuid := auth.uid();
  v_v   public.legal_versions%ROWTYPE;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF NOT public.has_permission(v_uid, 'legal', 'edit') THEN RAISE EXCEPTION 'permission denied'; END IF;
  PERFORM public.require_step_up_if_needed('legal', 'edit');
  -- INC-951 3c (D1 M6b-legal) — after the door's authority, before its first write: its dial (staff_config).
  IF NOT coalesce((public.rate_gate('staff_config')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;
  SELECT * INTO v_v FROM public.legal_versions v WHERE v.id = p_version_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'unknownVersion'; END IF;
  IF v_v.status <> 'draft' THEN RAISE EXCEPTION 'notDraft'; END IF;
  DELETE FROM public.legal_versions WHERE id = v_v.id;
  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
  VALUES (v_uid, 'legal.draft_discarded', 'legal_version', v_v.id::text,
          jsonb_build_object('document_id', v_v.document_id, 'version', v_v.version, 'label', v_v.label));
  RETURN jsonb_build_object('ok', true);
END;
$function$;
REVOKE ALL ON FUNCTION public.admin_discard_legal_draft(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_discard_legal_draft(uuid) TO authenticated, service_role;

-- admin_mark_legal_reviewed: live body (ethio-prod, md5(replace(prosrc, E'\r', '')) 6fa71a02a30774c87ecf2c744e9bdd5d) whole; the only change: the staff_config gate,
-- inserted as body line 15, right after the step-up line and before the first write.
CREATE OR REPLACE FUNCTION public.admin_mark_legal_reviewed(p_document_id uuid, p_note text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid  uuid := auth.uid();
  v_note text := btrim(coalesce(p_note, ''));
  v_row  public.legal_reviews%ROWTYPE;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF NOT public.has_permission(v_uid, 'legal', 'edit') THEN RAISE EXCEPTION 'permission denied'; END IF;
  PERFORM public.require_step_up_if_needed('legal', 'edit');
  -- INC-951 3c (D1 M6b-legal) — after the door's authority, before its first write: its dial (staff_config).
  IF NOT coalesce((public.rate_gate('staff_config')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;
  IF p_document_id IS NULL OR NOT EXISTS (SELECT 1 FROM public.legal_versions v
                                           WHERE v.document_id = p_document_id AND v.status = 'published') THEN
    RAISE EXCEPTION 'nothingToReview';
  END IF;
  IF length(v_note) < 1 OR length(v_note) > 2000 THEN RAISE EXCEPTION 'badValue:note'; END IF;
  INSERT INTO public.legal_reviews (document_id, reviewed_by, home_country_code, note)
  VALUES (p_document_id, v_uid,
          (SELECT p.home_country_code FROM public.profiles p WHERE p.user_id = v_uid), v_note)
  RETURNING * INTO v_row;
  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
  VALUES (v_uid, 'legal.reviewed', 'legal_document', p_document_id::text,
          jsonb_build_object('review_id', v_row.id, 'note', v_note));
  RETURN jsonb_build_object('reviewed_at', v_row.reviewed_at, 'due_at', public.legal_review_due(p_document_id));
END;
$function$;
REVOKE ALL ON FUNCTION public.admin_mark_legal_reviewed(uuid, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_mark_legal_reviewed(uuid, text) TO authenticated, service_role;

-- admin_publish_legal_version: live body (ethio-prod, md5(replace(prosrc, E'\r', '')) c46e44df17f1592e45dbe7528174a920) whole; the only change: the staff_config gate,
-- inserted as body line 18, right after the step-up line and before the first write.
CREATE OR REPLACE FUNCTION public.admin_publish_legal_version(p_version_id uuid, p_material boolean, p_effective_at timestamp with time zone DEFAULT NULL::timestamp with time zone)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
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
  -- INC-951 3c (D1 M6b-legal) — after the door's authority, before its first write: its dial (staff_config).
  IF NOT coalesce((public.rate_gate('staff_config')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;
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
  v_problem := public.legal_text_fact_problem(v_v.body_en || E'\n' || v_v.body_am || E'\n' || (SELECT coalesce(string_agg(t.body, E'\n' ORDER BY t.language), '') FROM public.legal_version_texts t WHERE t.version_id = v_v.id), v_snapshot);
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
$function$;
REVOKE ALL ON FUNCTION public.admin_publish_legal_version(uuid, boolean, timestamp with time zone) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_publish_legal_version(uuid, boolean, timestamp with time zone) TO authenticated, service_role;

-- admin_save_legal_draft: live body (ethio-prod, md5(replace(prosrc, E'\r', '')) a092f71816a95880683767643cd4d6ad) whole; the only change: the staff_config gate,
-- inserted as body line 17, right after the step-up line and before the first write.
CREATE OR REPLACE FUNCTION public.admin_save_legal_draft(p_kind text, p_country character, p_label text, p_body_en text, p_body_am text, p_changelog text, p_texts jsonb DEFAULT '{}'::jsonb)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid uuid := auth.uid();
  v_d   public.legal_documents%ROWTYPE;
  v_v   public.legal_versions%ROWTYPE;
  v_text record;
  v_languages jsonb;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF NOT public.has_permission(v_uid, 'legal', 'edit') THEN RAISE EXCEPTION 'permission denied'; END IF;
  PERFORM public.require_step_up_if_needed('legal', 'edit');
  -- INC-951 3c (D1 M6b-legal) — after the door's authority, before its first write: its dial (staff_config).
  IF NOT coalesce((public.rate_gate('staff_config')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;
  IF p_texts IS NULL OR jsonb_typeof(p_texts) <> 'object' THEN RAISE EXCEPTION 'badValue:texts'; END IF;
  FOR v_text IN SELECT key, value FROM jsonb_each(p_texts) LOOP
    IF v_text.key IN ('en', 'am') OR NOT EXISTS (
      SELECT 1 FROM public.languages l WHERE l.code = v_text.key AND l.enabled_admin
    ) THEN RAISE EXCEPTION 'badLanguage'; END IF;
    IF jsonb_typeof(v_text.value) <> 'string' THEN RAISE EXCEPTION 'badValue:texts'; END IF;
    IF length(v_text.value #>> '{}') > 200000 THEN RAISE EXCEPTION 'tooLong'; END IF;
  END LOOP;
  IF p_kind IS NULL OR (p_kind NOT IN ('terms', 'privacy', 'publishing') AND p_kind !~ '^e2e-[a-z0-9-]{1,40}$') THEN
    RAISE EXCEPTION 'badValue:kind';
  END IF;
  IF p_country IS NOT NULL AND NOT EXISTS (SELECT 1 FROM public.countries c WHERE c.code = p_country) THEN
    RAISE EXCEPTION 'badValue:country';
  END IF;
  SELECT * INTO v_d FROM public.legal_documents d
   WHERE d.kind = p_kind AND d.country_code IS NOT DISTINCT FROM p_country;
  IF NOT FOUND THEN
    INSERT INTO public.legal_documents (kind, country_code) VALUES (p_kind, p_country)
    RETURNING * INTO v_d;
  END IF;
  IF p_label IS NULL OR length(btrim(p_label)) NOT BETWEEN 1 AND 60 THEN
    RAISE EXCEPTION 'labelRequired';
  END IF;
  IF EXISTS (SELECT 1 FROM public.legal_versions v
              WHERE v.document_id = v_d.id AND v.label = p_label AND v.status <> 'draft') THEN
    RAISE EXCEPTION 'labelTaken';
  END IF;
  SELECT * INTO v_v FROM public.legal_versions v WHERE v.document_id = v_d.id AND v.status = 'draft';
  IF FOUND THEN
    IF EXISTS (SELECT 1 FROM public.legal_versions v
                WHERE v.document_id = v_d.id AND v.label = p_label AND v.id <> v_v.id) THEN
      RAISE EXCEPTION 'labelTaken';
    END IF;
    UPDATE public.legal_versions
       SET label = p_label, body_en = p_body_en, body_am = p_body_am, changelog = p_changelog
     WHERE id = v_v.id
    RETURNING * INTO v_v;
  ELSE
    INSERT INTO public.legal_versions (document_id, version, label, body_en, body_am, changelog, created_by)
    VALUES (v_d.id,
            coalesce((SELECT max(v.version) FROM public.legal_versions v WHERE v.document_id = v_d.id), 0) + 1,
            p_label, p_body_en, p_body_am, p_changelog, v_uid)
    RETURNING * INTO v_v;
  END IF;
  DELETE FROM public.legal_version_texts WHERE version_id = v_v.id;
  INSERT INTO public.legal_version_texts (version_id, language, body)
  SELECT v_v.id, key, value #>> '{}' FROM jsonb_each(p_texts)
   WHERE length(btrim(value #>> '{}')) > 0;
  SELECT coalesce(jsonb_agg(t.language ORDER BY t.language), '[]'::jsonb) INTO v_languages
    FROM public.legal_version_texts t WHERE t.version_id = v_v.id;
  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
  VALUES (v_uid, 'legal.draft_saved', 'legal_version', v_v.id::text,
          jsonb_build_object('kind', v_d.kind, 'country_code', v_d.country_code,
                             'version', v_v.version, 'label', p_label, 'languages', v_languages));
  RETURN jsonb_build_object('ok', true, 'document_id', v_d.id, 'version_id', v_v.id, 'version', v_v.version);
END;
$function$;
REVOKE ALL ON FUNCTION public.admin_save_legal_draft(text, character, text, text, text, text, jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_save_legal_draft(text, character, text, text, text, text, jsonb) TO authenticated, service_role;

-- admin_set_legal_settings: live body (ethio-prod, md5(replace(prosrc, E'\r', '')) 8d08a9c42d29bc074a5a36fc13c12c2b) whole; the only change: the staff_config gate,
-- inserted as body line 18, right after the step-up line and before the first write.
CREATE OR REPLACE FUNCTION public.admin_set_legal_settings(p_settings jsonb)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
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
  -- INC-951 3c (D1 M6b-legal) — after the door's authority, before its first write: its dial (staff_config).
  IF NOT coalesce((public.rate_gate('staff_config')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;
  IF p_settings IS NULL OR jsonb_typeof(p_settings) <> 'object' THEN RAISE EXCEPTION 'badValue:settings'; END IF;
  FOR v_key IN SELECT k FROM jsonb_object_keys(p_settings) AS k LOOP
    IF v_key NOT IN ('operator_name','operator_address','legal_email','privacy_email','governing_law',
                     'providers','copyright_agent','liability_limit_usd','notice_days','response_days',
                     'response_extra_days','deleted_ad_keep_months','dispute_keep_years',
                     'operator_details','legal_phone','security_email','listed_ad_keep_months',
                     'account_keep_months','technical_keep_months','sold_visible_days',
                     'appeal_months','claims_limit_months','talk_first_days','complaint_ack_days',
                     'review_months') THEN
      RAISE EXCEPTION 'badValue:%', v_key;
    END IF;
  END LOOP;
  -- Every number is checked before anything is written, so a bad value is refused as badValue:<key>
  -- and never reaches the table's CHECK constraints (INC-762).
  FOR v_key IN SELECT k FROM jsonb_object_keys(p_settings) AS k LOOP
    IF v_key IN ('liability_limit_usd','notice_days','response_days','response_extra_days',
                 'deleted_ad_keep_months','dispute_keep_years','listed_ad_keep_months',
                 'account_keep_months','technical_keep_months','sold_visible_days',
                 'appeal_months','claims_limit_months','talk_first_days','complaint_ack_days',
                 'review_months') THEN
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
         OR (v_key IN ('talk_first_days','complaint_ack_days') AND (v_num < 1 OR v_num > 90))
         OR (v_key = 'review_months' AND (v_num < 1 OR v_num > 24)) THEN
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
    review_months = CASE WHEN p_settings ? 'review_months'
                         THEN (p_settings ->> 'review_months')::integer ELSE review_months END,
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
$function$;
REVOKE ALL ON FUNCTION public.admin_set_legal_settings(jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_set_legal_settings(jsonb) TO authenticated, service_role;

DO $proof$
DECLARE
  v_fn text; v_old text; v_new text; v_oid oid; v_src text;
  v_gate text := E'  -- INC-951 3c (D1 M6b-legal) — after the door''s authority, before its first write: its dial (staff_config).\n  IF NOT coalesce((public.rate_gate(''staff_config'')->>''allowed'')::boolean, false) THEN RAISE EXCEPTION ''rateLimited''; END IF;\n';
  v_uid uuid := gen_random_uuid();
  v_session uuid := gen_random_uuid();
  v_rand uuid := gen_random_uuid();
  v_msg text; v_before text; v_after text;
  v_calls text[] := ARRAY[
    'SELECT public.admin_add_legal_translation(%L::uuid, ''e2e'', ''x'')',
    'SELECT public.admin_discard_legal_draft(%L::uuid)',
    'SELECT public.admin_mark_legal_reviewed(%L::uuid, ''e2e'')',
    'SELECT public.admin_publish_legal_version(%L::uuid, false)',
    'SELECT public.admin_save_legal_draft(''e2e-'' || %L, ''ZZ'', ''e2e'', ''x'', ''x'', ''e2e'')',
    'SELECT public.admin_set_legal_settings(NULL::jsonb) WHERE %L IS NOT NULL'];
  v_call text;
BEGIN
  -- (1) each door: the live body plus exactly the gate line; header and ACL unchanged; the gate after the
  -- step-up line and before the first write.
  FOR v_fn, v_old, v_new IN VALUES
    ('admin_add_legal_translation(uuid, text, text)', '97b996345eba02109957e236d6de9b99', 'dcc64aace95421a2ee96b27af948b744'),
    ('admin_discard_legal_draft(uuid)', 'fc8a0e85da924b6b9821148d400ac4b3', 'd2e79240e6784b25781c9c6cdc6dfd99'),
    ('admin_mark_legal_reviewed(uuid, text)', '6fa71a02a30774c87ecf2c744e9bdd5d', '390bb8aaa7135d8808845d562c9fa0fe'),
    ('admin_publish_legal_version(uuid, boolean, timestamp with time zone)', 'c46e44df17f1592e45dbe7528174a920', '61baef330e15b4f8fc829e0f519a22e0'),
    ('admin_save_legal_draft(text, character, text, text, text, text, jsonb)', 'a092f71816a95880683767643cd4d6ad', 'baf0a1bb63062668a0335b1f9647db0f'),
    ('admin_set_legal_settings(jsonb)', '8d08a9c42d29bc074a5a36fc13c12c2b', 'cf9f949f3122bb41efec8a8993a9a8b4')
  LOOP
    v_oid := ('public.' || v_fn)::regprocedure;
    SELECT replace(prosrc, E'\r', '') INTO v_src FROM pg_proc WHERE oid = v_oid;
    IF md5(v_src) <> v_new
       OR md5(replace(v_src, v_gate, '')) <> v_old
       OR position('require_step_up_if_needed' IN v_src) > position('rate_gate(''staff_config'')' IN v_src)
       OR position('rate_gate(''staff_config'')' IN v_src) > least(
            coalesce(nullif(position('INSERT INTO' IN v_src), 0), 1000000),
            coalesce(nullif(position('UPDATE public.' IN v_src), 0), 1000000),
            coalesce(nullif(position('DELETE FROM' IN v_src), 0), 1000000))
       OR (SELECT NOT prosecdef OR proconfig::text <> '{search_path=public}' FROM pg_proc WHERE oid = v_oid)
       OR has_function_privilege('anon', v_oid, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_oid, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_oid, 'EXECUTE') THEN
      RAISE EXCEPTION 'M6b-legal proof (1): % is not the live body plus the gate (or its header/ACL changed)', v_fn;
    END IF;
  END LOOP;

  -- (2) behaviour, staff_config overridden to 1, scratch super admin at aal2: each door's first call passes
  -- the gate (it answers its own refusal for a scratch id); with the window spent, each door's next call is
  -- refused rateLimited and writes nothing (no audit row by the caller, legal tables unchanged).
  BEGIN
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
      (v_uid, 'e2e-d1-m6b-' || v_uid || '@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO public.user_roles (user_id, role_id, scope_type)
    SELECT v_uid, r.id, 'global' FROM public.roles r WHERE r.name = 'super_admin';
    INSERT INTO auth.sessions (id, user_id, created_at, updated_at, aal) VALUES (v_session, v_uid, now(), now(), 'aal2');
    INSERT INTO auth.mfa_factors (id, user_id, friendly_name, factor_type, status, created_at, updated_at, secret)
    VALUES (gen_random_uuid(), v_uid, 'd1-m6b-proof', 'totp', 'verified', now(), now(), 'PROOFSECRET');
    INSERT INTO auth.mfa_amr_claims (id, session_id, created_at, updated_at, authentication_method)
    VALUES (gen_random_uuid(), v_session, now(), now(), 'totp');
    INSERT INTO public.rate_overrides (user_id, action, max_count) VALUES (v_uid, 'staff_config', 1);
    PERFORM set_config('request.jwt.claims',
      json_build_object('sub', v_uid::text, 'role', 'authenticated', 'aal', 'aal2',
                        'session_id', v_session::text,
                        'amr', json_build_array(json_build_object('method', 'totp')))::text, true);

    FOREACH v_call IN ARRAY v_calls LOOP
      v_msg := 'answered';
      BEGIN
        EXECUTE format(v_call, v_rand::text);
      EXCEPTION WHEN OTHERS THEN v_msg := SQLERRM;
      END;
      IF v_msg = 'rateLimited' OR v_msg IN ('permission denied', 'not authenticated') OR v_msg LIKE '%step-up%' THEN
        RAISE EXCEPTION 'M6b-legal proof (2): a first call did not pass the gate: % -> %', v_call, v_msg;
      END IF;
    END LOOP;

    PERFORM public.rate_gate('staff_config');
    SELECT md5(concat_ws('|',
      (SELECT count(*) FROM public.legal_documents), (SELECT count(*) FROM public.legal_versions),
      (SELECT count(*) FROM public.legal_version_texts), (SELECT count(*) FROM public.legal_reviews),
      (SELECT md5(string_agg(to_jsonb(s)::text, '')) FROM public.legal_settings s),
      (SELECT count(*) FROM public.audit_log WHERE actor_id = v_uid),
      (SELECT coalesce(sum(count), 0) FROM public.rate_limits WHERE key = v_uid::text))) INTO v_before;
    FOREACH v_call IN ARRAY v_calls LOOP
      v_msg := 'answered';
      BEGIN
        EXECUTE format(v_call, v_rand::text);
      EXCEPTION WHEN OTHERS THEN v_msg := SQLERRM;
      END;
      IF v_msg IS DISTINCT FROM 'rateLimited' THEN
        RAISE EXCEPTION 'M6b-legal proof (2): the n+1th call was not refused: % -> %', v_call, v_msg;
      END IF;
    END LOOP;
    SELECT md5(concat_ws('|',
      (SELECT count(*) FROM public.legal_documents), (SELECT count(*) FROM public.legal_versions),
      (SELECT count(*) FROM public.legal_version_texts), (SELECT count(*) FROM public.legal_reviews),
      (SELECT md5(string_agg(to_jsonb(s)::text, '')) FROM public.legal_settings s),
      (SELECT count(*) FROM public.audit_log WHERE actor_id = v_uid),
      (SELECT coalesce(sum(count), 0) FROM public.rate_limits WHERE key = v_uid::text))) INTO v_after;
    IF v_before IS DISTINCT FROM v_after THEN
      RAISE EXCEPTION 'M6b-legal proof (2): a refused call wrote something';
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'd1-m6b-legal-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'd1-m6b-legal-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261029080000');