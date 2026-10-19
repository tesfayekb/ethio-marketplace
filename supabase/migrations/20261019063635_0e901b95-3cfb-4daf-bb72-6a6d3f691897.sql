-- e2e-areas: legal
-- Bundle 22 (Stage 1) turn 1, part 2 of 2 — the staff doors (D5) and the proofs (D6). Gated on part 1's
-- mark; a migration is not DONE until the mark is read back from the live database.

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261019200000') THEN
    RAISE EXCEPTION 'part 1 (mark 20261019200000) must be applied first';
  END IF;
END $$;

-- ===== D5 — the staff doors =====
-- Every staff door checks its own permission (has_permission); the mutating ones also call
-- require_step_up_if_needed('legal', <action>). A missing caller and a caller without the permission get
-- 'permission denied'-class refusals; e2e- scratch documents are excluded from the staff lists.

CREATE OR REPLACE FUNCTION public.admin_legal_documents()
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid uuid := auth.uid();
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF NOT public.has_permission(v_uid, 'legal', 'view') THEN RAISE EXCEPTION 'permission denied'; END IF;
  RETURN coalesce((
    SELECT jsonb_agg(jsonb_build_object(
             'document_id', d.id,
             'kind', d.kind,
             'country_code', d.country_code,
             'versions', coalesce((
               SELECT jsonb_agg(jsonb_build_object(
                        'version_id', v.id,
                        'version', v.version,
                        'status', v.status,
                        'label', v.label,
                        'material', v.material,
                        'effective_at', v.effective_at,
                        'published_at', v.published_at,
                        'created_at', v.created_at)
                      ORDER BY v.version DESC)
                 FROM public.legal_versions v WHERE v.document_id = d.id), '[]'::jsonb))
           ORDER BY d.kind, d.country_code NULLS FIRST)
      FROM public.legal_documents d
     WHERE d.kind !~ '^e2e-'), '[]'::jsonb);
END;
$$;
REVOKE ALL ON FUNCTION public.admin_legal_documents() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_legal_documents() TO authenticated;
GRANT ALL ON FUNCTION public.admin_legal_documents() TO service_role;

-- One version for staff, change log included (staff-only, D4's rule).
CREATE OR REPLACE FUNCTION public.admin_legal_version(p_version_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid uuid := auth.uid();
  v_v   public.legal_versions%ROWTYPE;
  v_d   public.legal_documents%ROWTYPE;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF NOT public.has_permission(v_uid, 'legal', 'view') THEN RAISE EXCEPTION 'permission denied'; END IF;
  SELECT * INTO v_v FROM public.legal_versions v WHERE v.id = p_version_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'unknownVersion'; END IF;
  SELECT * INTO v_d FROM public.legal_documents d WHERE d.id = v_v.document_id;
  RETURN jsonb_build_object(
    'version_id', v_v.id,
    'document_id', v_d.id,
    'kind', v_d.kind,
    'country_code', v_d.country_code,
    'version', v_v.version,
    'status', v_v.status,
    'label', v_v.label,
    'body_en', v_v.body_en,
    'body_am', v_v.body_am,
    'changelog', v_v.changelog,
    'material', v_v.material,
    'effective_at', v_v.effective_at,
    'published_at', v_v.published_at,
    'published_by', v_v.published_by,
    'created_by', v_v.created_by,
    'settings_snapshot', v_v.settings_snapshot,
    'created_at', v_v.created_at);
END;
$$;
REVOKE ALL ON FUNCTION public.admin_legal_version(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_legal_version(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.admin_legal_version(uuid) TO service_role;

-- Save a draft: creates the document when none exists, updates the one open draft, or opens the next
-- version. A published version is never touched; a label another version of the document holds is refused.
CREATE OR REPLACE FUNCTION public.admin_save_legal_draft(
  p_kind text,
  p_country char(2),
  p_label text,
  p_body_en text,
  p_body_am text,
  p_changelog text
)
RETURNS jsonb
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid uuid := auth.uid();
  v_d   public.legal_documents%ROWTYPE;
  v_v   public.legal_versions%ROWTYPE;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF NOT public.has_permission(v_uid, 'legal', 'edit') THEN RAISE EXCEPTION 'permission denied'; END IF;
  PERFORM public.require_step_up_if_needed('legal', 'edit');
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
  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
  VALUES (v_uid, 'legal.draft_saved', 'legal_version', v_v.id::text,
          jsonb_build_object('kind', v_d.kind, 'country_code', v_d.country_code,
                             'version', v_v.version, 'label', p_label));
  RETURN jsonb_build_object('ok', true, 'document_id', v_d.id, 'version_id', v_v.id, 'version', v_v.version);
END;
$$;
REVOKE ALL ON FUNCTION public.admin_save_legal_draft(text, char, text, text, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_save_legal_draft(text, char, text, text, text, text) TO authenticated;
GRANT ALL ON FUNCTION public.admin_save_legal_draft(text, char, text, text, text, text) TO service_role;

-- Discard the one open draft; a published version is refused.
CREATE OR REPLACE FUNCTION public.admin_discard_legal_draft(p_version_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid uuid := auth.uid();
  v_v   public.legal_versions%ROWTYPE;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF NOT public.has_permission(v_uid, 'legal', 'edit') THEN RAISE EXCEPTION 'permission denied'; END IF;
  PERFORM public.require_step_up_if_needed('legal', 'edit');
  SELECT * INTO v_v FROM public.legal_versions v WHERE v.id = p_version_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'unknownVersion'; END IF;
  IF v_v.status <> 'draft' THEN RAISE EXCEPTION 'notDraft'; END IF;
  DELETE FROM public.legal_versions WHERE id = v_v.id;
  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
  VALUES (v_uid, 'legal.draft_discarded', 'legal_version', v_v.id::text,
          jsonb_build_object('document_id', v_v.document_id, 'version', v_v.version, 'label', v_v.label));
  RETURN jsonb_build_object('ok', true);
END;
$$;
REVOKE ALL ON FUNCTION public.admin_discard_legal_draft(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_discard_legal_draft(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.admin_discard_legal_draft(uuid) TO service_role;

-- Publish a draft: both languages, a label and a change log are required. Version 1 and every non-material
-- version take effect now; a material version takes effect no earlier than the notice period. Every fact
-- in the text is a setting token, so the settings row is frozen into the version at publish.
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

-- The settings row for staff.
CREATE OR REPLACE FUNCTION public.admin_legal_settings()
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid uuid := auth.uid();
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF NOT public.has_permission(v_uid, 'legal', 'view') THEN RAISE EXCEPTION 'permission denied'; END IF;
  RETURN (SELECT to_jsonb(s) - 'id' FROM public.legal_settings s WHERE s.id);
END;
$$;
REVOKE ALL ON FUNCTION public.admin_legal_settings() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_legal_settings() TO authenticated;
GRANT ALL ON FUNCTION public.admin_legal_settings() TO service_role;

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
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF NOT public.has_permission(v_uid, 'legal', 'edit') THEN RAISE EXCEPTION 'permission denied'; END IF;
  PERFORM public.require_step_up_if_needed('legal', 'edit');
  IF p_settings IS NULL OR jsonb_typeof(p_settings) <> 'object' THEN RAISE EXCEPTION 'badValue:settings'; END IF;
  FOR v_key IN SELECT k FROM jsonb_object_keys(p_settings) AS k LOOP
    IF v_key NOT IN ('operator_name','operator_address','legal_email','privacy_email','governing_law',
                     'providers','copyright_agent','liability_limit_usd','notice_days','response_days',
                     'response_extra_days','deleted_ad_keep_months','dispute_keep_years') THEN
      RAISE EXCEPTION 'badValue:%', v_key;
    END IF;
  END LOOP;
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

-- One person's legal history for staff with profiles:view: his acceptances and the legal e-mails sent to
-- him, newest first.
CREATE OR REPLACE FUNCTION public.admin_user_legal_history(p_user_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid uuid := auth.uid();
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF NOT public.has_permission(v_uid, 'profiles', 'view') THEN RAISE EXCEPTION 'permission denied'; END IF;
  IF NOT EXISTS (SELECT 1 FROM public.profiles p WHERE p.user_id = p_user_id) THEN
    RAISE EXCEPTION 'unknownUser';
  END IF;
  RETURN jsonb_build_object(
    'acceptances', coalesce((
      SELECT jsonb_agg(jsonb_build_object(
               'version_id', a.version_id,
               'kind', d.kind,
               'country_code', d.country_code,
               'version', v.version,
               'label', v.label,
               'accepted_at', a.accepted_at,
               'language', a.language,
               'method', a.method,
               'adult_confirmed', a.adult_confirmed)
             ORDER BY a.accepted_at DESC)
        FROM public.legal_acceptances a
        JOIN public.legal_versions v ON v.id = a.version_id
        JOIN public.legal_documents d ON d.id = v.document_id
       WHERE a.user_id = p_user_id), '[]'::jsonb),
    'notices', coalesce((
      SELECT jsonb_agg(jsonb_build_object(
               'version_id', n.version_id,
               'kind', d.kind,
               'country_code', d.country_code,
               'version', v.version,
               'channel', n.channel,
               'status', n.status,
               'sent_at', n.sent_at)
             ORDER BY n.sent_at DESC)
        FROM public.legal_notices n
        JOIN public.legal_versions v ON v.id = n.version_id
        JOIN public.legal_documents d ON d.id = v.document_id
       WHERE n.user_id = p_user_id), '[]'::jsonb));
END;
$$;
REVOKE ALL ON FUNCTION public.admin_user_legal_history(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_user_legal_history(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.admin_user_legal_history(uuid) TO service_role;

-- The 18+ statement is part of every acceptance (D2); the column carries no meaning when false.
ALTER TABLE public.legal_acceptances
  ADD CONSTRAINT legal_acceptances_adult_check CHECK (adult_confirmed);

-- ===== D6 — the proofs =====
-- Every proof runs inside one block that ends by raising a sentinel the outer block catches, so no proof
-- row survives the apply. Behaviour is asserted, never a planner choice; a clean apply is the pass (G39).
-- Only here may a real kind be used.
DO $$
DECLARE
  v_uid   uuid := gen_random_uuid();
  v_doc   uuid;
  v_draft uuid;
  v_acc   uuid;
  v_ntc   uuid;
BEGIN
  -- the resource and its permissions, with their second-factor flags
  IF NOT EXISTS (SELECT 1 FROM public.resources r WHERE r.name = 'legal') THEN
    RAISE EXCEPTION 'proof failed: legal resource missing';
  END IF;
  IF (SELECT count(*) FROM public.permissions p
        JOIN public.resources r ON r.id = p.resource_id
       WHERE r.name = 'legal' AND p.action IN ('view','edit','publish')) <> 3 THEN
    RAISE EXCEPTION 'proof failed: legal permissions missing';
  END IF;
  IF NOT (SELECT bool_and(NOT p.requires_step_up) FROM public.permissions p
        JOIN public.resources r ON r.id = p.resource_id
       WHERE r.name = 'legal' AND p.action = 'view')
     OR NOT (SELECT bool_and(p.requires_step_up) FROM public.permissions p
        JOIN public.resources r ON r.id = p.resource_id
       WHERE r.name = 'legal' AND p.action IN ('edit','publish')) THEN
    RAISE EXCEPTION 'proof failed: step-up flags wrong';
  END IF;
  -- the seeded settings row
  IF NOT EXISTS (SELECT 1 FROM public.legal_settings s
                  WHERE s.id AND s.operator_name = 'Ethio.com LLC'
                    AND s.legal_email = 'legal@ethio.com' AND s.privacy_email = 'privacy@ethio.com'
                    AND s.notice_days = 30 AND s.liability_limit_usd = 100) THEN
    RAISE EXCEPTION 'proof failed: settings row wrong';
  END IF;
  -- an existing profile to accept as (profiles references auth.users, so no scratch profile is possible;
  -- the acceptance and notice rows below are deleted by the rollback)
  SELECT p.user_id INTO v_uid FROM public.profiles p ORDER BY p.created_at LIMIT 1;
  IF v_uid IS NULL THEN RAISE EXCEPTION 'proof failed: no profile to accept as'; END IF;

  -- a real-kind global document, drafted then published by direct update (the doors' own refusal tests
  -- live in e2e/legal-doors.spec.ts; here the model's guarantees are proven)
  INSERT INTO public.legal_documents (kind, country_code) VALUES ('terms', NULL) RETURNING id INTO v_doc;
  INSERT INTO public.legal_versions (document_id, version, label, body_en, body_am, changelog, created_by)
  VALUES (v_doc, 1, 'v1', 'English body', 'Amharic body', 'first version', v_uid)
  RETURNING id INTO v_draft;
  -- a second draft beside the open one is refused (partial unique index)
  BEGIN
    INSERT INTO public.legal_versions (document_id, version, label, body_en, body_am)
    VALUES (v_doc, 2, 'v2', 'x', 'x');
    RAISE EXCEPTION 'proof failed: second draft allowed';
  EXCEPTION WHEN unique_violation THEN NULL;
  END;
  UPDATE public.legal_versions
     SET status = 'published', material = false, effective_at = now(), published_at = now(),
         published_by = v_uid, settings_snapshot = jsonb_build_object('proof', true)
   WHERE id = v_draft;
  -- the reader returns the version in force
  IF public.legal_in_force('terms') IS NULL
     OR (public.legal_in_force('terms') ->> 'version_id')::uuid <> v_draft THEN
    RAISE EXCEPTION 'proof failed: legal_in_force';
  END IF;
  IF public.legal_in_force('terms') ? 'changelog' THEN
    RAISE EXCEPTION 'proof failed: legal_in_force leaks the change log';
  END IF;
  -- a published version is final
  BEGIN
    UPDATE public.legal_versions SET label = 'moved' WHERE id = v_draft;
    RAISE EXCEPTION 'proof failed: published UPDATE allowed';
  EXCEPTION WHEN raise_exception THEN NULL;
  END;
  BEGIN
    DELETE FROM public.legal_versions WHERE id = v_draft;
    RAISE EXCEPTION 'proof failed: published DELETE allowed';
  EXCEPTION WHEN raise_exception THEN NULL;
  END;
  -- an acceptance without the 18+ statement is refused
  BEGIN
    INSERT INTO public.legal_acceptances (user_id, version_id, language, method, adult_confirmed)
    VALUES (v_uid, v_draft, 'en', 'email', false);
    RAISE EXCEPTION 'proof failed: adult_confirmed false allowed';
  EXCEPTION WHEN not_null_violation OR check_violation THEN NULL;
  END;
  INSERT INTO public.legal_acceptances (user_id, version_id, language, method, adult_confirmed)
  VALUES (v_uid, v_draft, 'en', 'email', true) RETURNING id INTO v_acc;
  -- an acceptance is final
  BEGIN
    UPDATE public.legal_acceptances SET language = 'am' WHERE id = v_acc;
    RAISE EXCEPTION 'proof failed: acceptance UPDATE allowed';
  EXCEPTION WHEN raise_exception THEN NULL;
  END;
  -- a notice is final
  INSERT INTO public.legal_notices (user_id, version_id, channel, status)
  VALUES (v_uid, v_draft, 'email', 'sent') RETURNING id INTO v_ntc;
  BEGIN
    UPDATE public.legal_notices SET status = 'failed' WHERE id = v_ntc;
    RAISE EXCEPTION 'proof failed: notice UPDATE allowed';
  EXCEPTION WHEN raise_exception THEN NULL;
  END;
  -- a document's kind is immutable once a version exists
  BEGIN
    UPDATE public.legal_documents SET kind = 'privacy' WHERE id = v_doc;
    RAISE EXCEPTION 'proof failed: kind change allowed';
  EXCEPTION WHEN raise_exception THEN NULL;
  END;
  -- every door refuses a missing caller (the definer read of auth.uid() is NULL inside this block)
  BEGIN
    PERFORM public.my_legal_status();
    RAISE EXCEPTION 'proof failed: my_legal_status without caller';
  EXCEPTION WHEN raise_exception THEN NULL;
  END;
  BEGIN
    PERFORM public.accept_legal(ARRAY[v_draft], 'en', true);
    RAISE EXCEPTION 'proof failed: accept_legal without caller';
  EXCEPTION WHEN raise_exception THEN NULL;
  END;
  BEGIN
    PERFORM public.my_legal_history();
    RAISE EXCEPTION 'proof failed: my_legal_history without caller';
  EXCEPTION WHEN raise_exception THEN NULL;
  END;
  BEGIN
    PERFORM public.my_legal_version(v_draft);
    RAISE EXCEPTION 'proof failed: my_legal_version without caller';
  EXCEPTION WHEN raise_exception THEN NULL;
  END;
  BEGIN
    PERFORM public.admin_legal_documents();
    RAISE EXCEPTION 'proof failed: admin_legal_documents without caller';
  EXCEPTION WHEN raise_exception THEN NULL;
  END;
  BEGIN
    PERFORM public.admin_legal_version(v_draft);
    RAISE EXCEPTION 'proof failed: admin_legal_version without caller';
  EXCEPTION WHEN raise_exception THEN NULL;
  END;
  BEGIN
    PERFORM public.admin_save_legal_draft('terms', NULL, 'x', 'x', 'x', 'x');
    RAISE EXCEPTION 'proof failed: admin_save_legal_draft without caller';
  EXCEPTION WHEN raise_exception THEN NULL;
  END;
  BEGIN
    PERFORM public.admin_discard_legal_draft(v_draft);
    RAISE EXCEPTION 'proof failed: admin_discard_legal_draft without caller';
  EXCEPTION WHEN raise_exception THEN NULL;
  END;
  BEGIN
    PERFORM public.admin_publish_legal_version(v_draft, false);
    RAISE EXCEPTION 'proof failed: admin_publish_legal_version without caller';
  EXCEPTION WHEN raise_exception THEN NULL;
  END;
  BEGIN
    PERFORM public.admin_legal_settings();
    RAISE EXCEPTION 'proof failed: admin_legal_settings without caller';
  EXCEPTION WHEN raise_exception THEN NULL;
  END;
  BEGIN
    PERFORM public.admin_set_legal_settings('{}'::jsonb);
    RAISE EXCEPTION 'proof failed: admin_set_legal_settings without caller';
  EXCEPTION WHEN raise_exception THEN NULL;
  END;
  BEGIN
    PERFORM public.admin_user_legal_history(v_uid);
    RAISE EXCEPTION 'proof failed: admin_user_legal_history without caller';
  EXCEPTION WHEN raise_exception THEN NULL;
  END;
  -- the proof rows leave no trace
  RAISE EXCEPTION '__proof_rollback__';
EXCEPTION WHEN raise_exception THEN
  IF SQLERRM <> '__proof_rollback__' THEN RAISE; END IF;
  -- (the profile row is a real user's — borrowed, not proof data — so it stays; only the rows the
  -- proofs wrote must be gone)
  IF EXISTS (SELECT 1 FROM public.legal_versions v WHERE v.document_id = v_doc)
     OR EXISTS (SELECT 1 FROM public.legal_documents d WHERE d.id = v_doc)
     OR EXISTS (SELECT 1 FROM public.legal_acceptances a WHERE a.user_id = v_uid AND a.version_id = v_draft)
     OR EXISTS (SELECT 1 FROM public.legal_notices n WHERE n.user_id = v_uid AND n.version_id = v_draft) THEN
    RAISE EXCEPTION 'proof failed: proof rows survived the rollback';
  END IF;
END $$;

INSERT INTO public.migration_marks (version) VALUES ('20261019210000') ON CONFLICT (version) DO NOTHING;
