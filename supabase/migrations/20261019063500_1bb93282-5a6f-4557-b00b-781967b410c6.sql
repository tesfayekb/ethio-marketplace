-- e2e-areas: legal
-- Bundle 22 (Stage 1) turn 1, part 1 of 2 — the legal documents' database (L1 v2, approved 2026-10-04;
-- brief docs/governance/briefs/bundle-22-turn-1-v2.md).
-- D1: the resource "legal" and its permissions (view, edit, publish; edit and publish need a fresh
--     second factor). No role is granted any of them: the super admin holds every permission (has_permission).
-- D2: five tables — legal_documents, legal_versions, legal_settings, legal_acceptances, legal_notices.
--     Browser roles are born closed: REVOKE ALL from PUBLIC/anon/authenticated, GRANT ALL to service_role,
--     RLS enabled with deny policies on all four DML operations; every read and write goes through a door.
-- D3: triggers — a published version is final (no UPDATE, no DELETE except service-role cleanup of e2e-
--     scratch kinds); an acceptance and a notice are final (no UPDATE); a document's kind and country are
--     immutable once a version exists.
-- D4: the reader doors (legal_in_force, my_legal_status, accept_legal, my_legal_history, my_legal_version,
--     record_legal_notice). The staff doors and the proofs are part 2.

-- ===== D1 — the resource and its permissions =====
INSERT INTO public.resources (name, display_name, description)
VALUES ('legal', 'Legal documents', 'Legal documents: Terms, Privacy, the publishing statement and their settings')
ON CONFLICT (name) DO NOTHING;

INSERT INTO public.permissions (resource_id, action, description, requires_step_up, assignable)
SELECT r.id, v.action, v.descr, v.step_up, true
  FROM public.resources r
  CROSS JOIN (VALUES
    ('view',    'See the legal documents, their versions and the change logs', false),
    ('edit',    'Draft legal versions, discard drafts and set the legal settings', true),
    ('publish', 'Publish a legal version', true)
  ) AS v(action, descr, step_up)
 WHERE r.name = 'legal'
   AND NOT EXISTS (
     SELECT 1 FROM public.permissions p
      WHERE p.resource_id = r.id AND p.action = v.action);

-- ===== D2 — the tables =====
CREATE TABLE public.legal_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  kind text NOT NULL CONSTRAINT legal_documents_kind_check CHECK (
    kind IN ('terms', 'privacy', 'publishing') OR kind ~ '^e2e-[a-z0-9-]{1,40}$'),
  country_code char(2) NULL REFERENCES public.countries(code),
  created_at timestamptz NOT NULL DEFAULT now()
);
-- One document per kind and country; country NULL is the global document.
CREATE UNIQUE INDEX legal_documents_kind_country ON public.legal_documents(kind, coalesce(country_code, '--'));

CREATE TABLE public.legal_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id uuid NOT NULL REFERENCES public.legal_documents(id) ON DELETE RESTRICT,
  version integer NOT NULL CONSTRAINT legal_versions_version_check CHECK (version >= 1),
  status text NOT NULL DEFAULT 'draft' CONSTRAINT legal_versions_status_check CHECK (status IN ('draft', 'published')),
  label text NOT NULL CONSTRAINT legal_versions_label_check CHECK (length(btrim(label)) BETWEEN 1 AND 60),
  body_en text NULL CONSTRAINT legal_versions_body_en_check CHECK (body_en IS NULL OR length(body_en) <= 200000),
  body_am text NULL CONSTRAINT legal_versions_body_am_check CHECK (body_am IS NULL OR length(body_am) <= 200000),
  changelog text NULL CONSTRAINT legal_versions_changelog_check CHECK (changelog IS NULL OR length(changelog) <= 10000),
  material boolean NOT NULL DEFAULT false,
  effective_at timestamptz NULL,
  published_at timestamptz NULL,
  published_by uuid NULL REFERENCES public.profiles(user_id) ON DELETE SET NULL,
  created_by uuid NULL REFERENCES public.profiles(user_id) ON DELETE SET NULL,
  settings_snapshot jsonb NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (document_id, version),
  UNIQUE (document_id, label),
  CONSTRAINT legal_versions_published_check CHECK (
    status = 'draft'
    OR (length(btrim(body_en)) > 0 AND length(btrim(body_am)) > 0
        AND material IS NOT NULL AND effective_at IS NOT NULL AND published_at IS NOT NULL
        AND settings_snapshot IS NOT NULL))
);
-- At most one draft per document.
CREATE UNIQUE INDEX legal_versions_one_draft ON public.legal_versions(document_id) WHERE status = 'draft';

CREATE TABLE public.legal_settings (
  id boolean PRIMARY KEY DEFAULT true CONSTRAINT legal_settings_singleton_check CHECK (id),
  operator_name text NOT NULL DEFAULT 'Ethio.com LLC',
  operator_address text NOT NULL DEFAULT '300 Colonial Center Parkway, Ste 100N, Roswell, GA 30076, United States',
  legal_email text NOT NULL DEFAULT 'legal@ethio.com',
  privacy_email text NOT NULL DEFAULT 'privacy@ethio.com',
  governing_law text NOT NULL DEFAULT 'the State of Georgia, United States',
  providers text NOT NULL DEFAULT E'Resend (email)\nLovable (hosting)',
  copyright_agent text NULL,
  liability_limit_usd integer NOT NULL DEFAULT 100
    CONSTRAINT legal_settings_liability_check CHECK (liability_limit_usd BETWEEN 0 AND 1000000),
  notice_days integer NOT NULL DEFAULT 30
    CONSTRAINT legal_settings_notice_check CHECK (notice_days BETWEEN 0 AND 365),
  response_days integer NOT NULL DEFAULT 30
    CONSTRAINT legal_settings_response_check CHECK (response_days BETWEEN 1 AND 90),
  response_extra_days integer NOT NULL DEFAULT 60
    CONSTRAINT legal_settings_response_extra_check CHECK (response_extra_days BETWEEN 0 AND 90),
  deleted_ad_keep_months integer NOT NULL DEFAULT 12
    CONSTRAINT legal_settings_keep_months_check CHECK (deleted_ad_keep_months BETWEEN 1 AND 120),
  dispute_keep_years integer NOT NULL DEFAULT 3
    CONSTRAINT legal_settings_keep_years_check CHECK (dispute_keep_years BETWEEN 0 AND 20),
  updated_at timestamptz NOT NULL DEFAULT now(),
  updated_by uuid NULL REFERENCES public.profiles(user_id) ON DELETE SET NULL
);

CREATE TABLE public.legal_acceptances (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  version_id uuid NOT NULL REFERENCES public.legal_versions(id) ON DELETE RESTRICT,
  accepted_at timestamptz NOT NULL DEFAULT now(),
  language text NOT NULL REFERENCES public.languages(code),
  method text NOT NULL,
  adult_confirmed boolean NOT NULL DEFAULT false,
  home_country_code char(2) NULL REFERENCES public.countries(code),
  UNIQUE (user_id, version_id)
);

CREATE TABLE public.legal_notices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  version_id uuid NOT NULL REFERENCES public.legal_versions(id) ON DELETE RESTRICT,
  channel text NOT NULL CONSTRAINT legal_notices_channel_check CHECK (channel IN ('email')),
  status text NOT NULL CONSTRAINT legal_notices_status_check CHECK (status IN ('sent', 'failed', 'bounced')),
  sent_at timestamptz NOT NULL DEFAULT now(),
  provider_ref text NULL CONSTRAINT legal_notices_ref_check CHECK (provider_ref IS NULL OR length(provider_ref) <= 200),
  home_country_code char(2) NULL REFERENCES public.countries(code)
);
-- The e-mail address itself is not stored; the notice row proves the send.

DO $acl$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY['legal_documents', 'legal_versions', 'legal_settings', 'legal_acceptances', 'legal_notices'] LOOP
    EXECUTE format('REVOKE ALL ON public.%I FROM PUBLIC, anon, authenticated', t);
    EXECUTE format('GRANT ALL ON public.%I TO service_role', t);
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);
    EXECUTE format('CREATE POLICY %I ON public.%I FOR SELECT TO anon, authenticated USING (false)', t || '_deny_select', t);
    EXECUTE format('CREATE POLICY %I ON public.%I FOR INSERT TO anon, authenticated WITH CHECK (false)', t || '_deny_insert', t);
    EXECUTE format('CREATE POLICY %I ON public.%I FOR UPDATE TO anon, authenticated USING (false)', t || '_deny_update', t);
    EXECUTE format('CREATE POLICY %I ON public.%I FOR DELETE TO anon, authenticated USING (false)', t || '_deny_delete', t);
  END LOOP;
END $acl$;

-- The seeded settings row (reference data; the operator edits it through admin_set_legal_settings).
INSERT INTO public.legal_settings (id) VALUES (true) ON CONFLICT (id) DO NOTHING;

-- ===== D3 — the finality triggers =====
-- A published version never changes and is never deleted, except that the service role may DELETE a
-- published version of an e2e- scratch document (test cleanup). A draft may be updated, deleted, and
-- changed to published exactly once.
CREATE OR REPLACE FUNCTION public.legal_versions_finality()
RETURNS trigger
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path TO 'public'
AS $$
DECLARE
  v_scratch boolean;
BEGIN
  IF TG_OP = 'UPDATE' AND OLD.status = 'published' THEN
    RAISE EXCEPTION 'publishedIsFinal';
  END IF;
  IF TG_OP = 'DELETE' AND OLD.status = 'published' THEN
    SELECT d.kind ~ '^e2e-' INTO v_scratch FROM public.legal_documents d WHERE d.id = OLD.document_id;
    IF NOT (coalesce(v_scratch, false) AND auth.role() = 'service_role') THEN
      RAISE EXCEPTION 'publishedIsFinal';
    END IF;
  END IF;
  IF TG_OP = 'UPDATE' THEN
    NEW.updated_at := now();
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$;
REVOKE ALL ON FUNCTION public.legal_versions_finality() FROM PUBLIC, anon, authenticated;

CREATE TRIGGER legal_versions_finality
BEFORE UPDATE OR DELETE ON public.legal_versions
FOR EACH ROW EXECUTE FUNCTION public.legal_versions_finality();

-- An acceptance never changes; rows may still be deleted (user deletion cascade, pool reset).
CREATE OR REPLACE FUNCTION public.legal_acceptances_finality()
RETURNS trigger
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path TO 'public'
AS $$
BEGIN
  RAISE EXCEPTION 'acceptanceIsFinal';
END;
$$;
REVOKE ALL ON FUNCTION public.legal_acceptances_finality() FROM PUBLIC, anon, authenticated;

CREATE TRIGGER legal_acceptances_finality
BEFORE UPDATE ON public.legal_acceptances
FOR EACH ROW EXECUTE FUNCTION public.legal_acceptances_finality();

-- A notice never changes; rows may still be deleted (user deletion cascade, pool reset).
CREATE OR REPLACE FUNCTION public.legal_notices_finality()
RETURNS trigger
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path TO 'public'
AS $$
BEGIN
  RAISE EXCEPTION 'noticeIsFinal';
END;
$$;
REVOKE ALL ON FUNCTION public.legal_notices_finality() FROM PUBLIC, anon, authenticated;

CREATE TRIGGER legal_notices_finality
BEFORE UPDATE ON public.legal_notices
FOR EACH ROW EXECUTE FUNCTION public.legal_notices_finality();

-- A document's kind and country are immutable once a version exists for it.
CREATE OR REPLACE FUNCTION public.legal_documents_immutable()
RETURNS trigger
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path TO 'public'
AS $$
BEGIN
  IF (NEW.kind IS DISTINCT FROM OLD.kind OR NEW.country_code IS DISTINCT FROM OLD.country_code)
     AND EXISTS (SELECT 1 FROM public.legal_versions v WHERE v.document_id = OLD.id) THEN
    RAISE EXCEPTION 'kindIsFinal';
  END IF;
  RETURN NEW;
END;
$$;
REVOKE ALL ON FUNCTION public.legal_documents_immutable() FROM PUBLIC, anon, authenticated;

CREATE TRIGGER legal_documents_immutable
BEFORE UPDATE ON public.legal_documents
FOR EACH ROW EXECUTE FUNCTION public.legal_documents_immutable();

-- ===== D4 — the reader doors =====
-- The version in force: the highest published version of the document for this kind and country whose
-- effective time has passed. The change log is never returned.
CREATE OR REPLACE FUNCTION public.legal_in_force(p_kind text, p_country char(2) DEFAULT NULL)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  RETURN (
    SELECT jsonb_build_object(
             'version_id', v.id,
             'kind', d.kind,
             'country_code', d.country_code,
             'version', v.version,
             'label', v.label,
             'body_en', v.body_en,
             'body_am', v.body_am,
             'material', v.material,
             'effective_at', v.effective_at,
             'published_at', v.published_at)
      FROM public.legal_documents d
      JOIN public.legal_versions v ON v.document_id = d.id
     WHERE d.kind = p_kind
       AND d.kind !~ '^e2e-'
       AND d.country_code IS NOT DISTINCT FROM p_country
       AND v.status = 'published'
       AND v.effective_at <= now()
     ORDER BY v.version DESC
     LIMIT 1);
END;
$$;
REVOKE ALL ON FUNCTION public.legal_in_force(text, char) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.legal_in_force(text, char) TO anon, authenticated;
GRANT ALL ON FUNCTION public.legal_in_force(text, char) TO service_role;

-- The caller's standing per kind: the version in force is listed while he has accepted no version at or
-- above the newest material one (or version 1).
CREATE OR REPLACE FUNCTION public.my_legal_status(p_kinds text[] DEFAULT ARRAY['terms','privacy'])
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
  RETURN coalesce((
    SELECT jsonb_agg(jsonb_build_object(
             'kind', d.kind,
             'country_code', d.country_code,
             'version_id', v.id,
             'version', v.version,
             'label', v.label,
             'material', v.material,
             'effective_at', v.effective_at)
           ORDER BY d.kind, v.version DESC)
      FROM public.legal_documents d
      JOIN public.legal_versions v ON v.document_id = d.id
     WHERE d.kind = ANY (p_kinds)
       AND d.kind !~ '^e2e-'
       AND v.status = 'published'
       AND v.effective_at <= now()
       AND (d.country_code IS NULL
            OR d.country_code = (SELECT p.home_country_code FROM public.profiles p WHERE p.user_id = v_uid))
       AND NOT EXISTS (
         SELECT 1 FROM public.legal_acceptances a
          WHERE a.user_id = v_uid
            AND a.version_id IN (
              SELECT v2.id FROM public.legal_versions v2
               WHERE v2.document_id = v.document_id
                 AND v2.status = 'published'
                 AND (v2.version >= (
                       SELECT max(v3.version) FROM public.legal_versions v3
                        WHERE v3.document_id = v.document_id
                          AND v3.status = 'published'
                          AND (v3.material OR v3.version = 1)))))), '[]'::jsonb);
END;
$$;
REVOKE ALL ON FUNCTION public.my_legal_status(text[]) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.my_legal_status(text[]) TO authenticated;
GRANT ALL ON FUNCTION public.my_legal_status(text[]) TO service_role;

-- The caller accepts versions for himself: one row per version, with the language shown, the 18+
-- statement and the sign-in method read from the session token. No IP address is stored.
CREATE OR REPLACE FUNCTION public.accept_legal(p_version_ids uuid[], p_language text, p_adult boolean)
RETURNS jsonb
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid    uuid := auth.uid();
  v_method text;
  v_home   char(2);
  v_vid    uuid;
  v_v      public.legal_versions%ROWTYPE;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF p_version_ids IS NULL OR array_length(p_version_ids, 1) IS NULL THEN
    RAISE EXCEPTION 'emptyList';
  END IF;
  IF p_adult IS DISTINCT FROM true THEN RAISE EXCEPTION 'adultRequired'; END IF;
  IF p_language IS NULL OR NOT EXISTS (
       SELECT 1 FROM public.languages l WHERE l.code = p_language AND l.enabled_public) THEN
    RAISE EXCEPTION 'badLanguage';
  END IF;
  v_method := coalesce(
    auth.jwt() -> 'app_metadata' ->> 'provider',
    (auth.jwt() -> 'amr' -> 0 ->> 'method'),
    'unknown');
  SELECT p.home_country_code INTO v_home FROM public.profiles p WHERE p.user_id = v_uid;
  FOREACH v_vid IN ARRAY p_version_ids LOOP
    SELECT * INTO v_v FROM public.legal_versions v WHERE v.id = v_vid;
    IF NOT FOUND OR v_v.status <> 'published' OR v_v.effective_at > now() THEN
      RAISE EXCEPTION 'notInForce';
    END IF;
    IF EXISTS (SELECT 1 FROM public.legal_documents d
                WHERE d.id = v_v.document_id
                  AND d.country_code IS NOT NULL
                  AND d.country_code IS DISTINCT FROM v_home) THEN
      RAISE EXCEPTION 'notApplicable';
    END IF;
    INSERT INTO public.legal_acceptances
      (user_id, version_id, language, method, adult_confirmed, home_country_code)
    VALUES (v_uid, v_vid, p_language, v_method, true, v_home)
    ON CONFLICT (user_id, version_id) DO NOTHING;
  END LOOP;
  RETURN jsonb_build_object('ok', true);
END;
$$;
REVOKE ALL ON FUNCTION public.accept_legal(uuid[], text, boolean) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.accept_legal(uuid[], text, boolean) TO authenticated;
GRANT ALL ON FUNCTION public.accept_legal(uuid[], text, boolean) TO service_role;

-- The caller's own legal history: his acceptances and the legal e-mails sent to him, newest first.
CREATE OR REPLACE FUNCTION public.my_legal_history()
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
       WHERE a.user_id = v_uid), '[]'::jsonb),
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
       WHERE n.user_id = v_uid), '[]'::jsonb));
END;
$$;
REVOKE ALL ON FUNCTION public.my_legal_history() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.my_legal_history() TO authenticated;
GRANT ALL ON FUNCTION public.my_legal_history() TO service_role;

-- The whole text of a version the caller accepted, was sent a notice for, or that is in force. An
-- accepted version stays readable after newer versions replace it. The change log is never returned.
CREATE OR REPLACE FUNCTION public.my_legal_version(p_version_id uuid)
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
  v_ok  boolean;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  SELECT * INTO v_v FROM public.legal_versions v WHERE v.id = p_version_id;
  IF NOT FOUND OR v_v.status <> 'published' THEN RAISE EXCEPTION 'notYours'; END IF;
  SELECT * INTO v_d FROM public.legal_documents d WHERE d.id = v_v.document_id;
  v_ok := v_v.effective_at <= now()
    OR EXISTS (SELECT 1 FROM public.legal_acceptances a WHERE a.user_id = v_uid AND a.version_id = v_v.id)
    OR EXISTS (SELECT 1 FROM public.legal_notices n WHERE n.user_id = v_uid AND n.version_id = v_v.id);
  IF NOT v_ok THEN RAISE EXCEPTION 'notYours'; END IF;
  RETURN jsonb_build_object(
    'version_id', v_v.id,
    'kind', v_d.kind,
    'country_code', v_d.country_code,
    'version', v_v.version,
    'label', v_v.label,
    'body_en', v_v.body_en,
    'body_am', v_v.body_am,
    'material', v_v.material,
    'effective_at', v_v.effective_at,
    'published_at', v_v.published_at);
END;
$$;
REVOKE ALL ON FUNCTION public.my_legal_version(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.my_legal_version(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.my_legal_version(uuid) TO service_role;

-- The sender records each legal e-mail it sent. Service role only; a draft version is refused.
CREATE OR REPLACE FUNCTION public.record_legal_notice(
  p_user_id uuid,
  p_version_id uuid,
  p_channel text,
  p_status text,
  p_provider_ref text DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_home char(2);
BEGIN
  IF auth.role() <> 'service_role' THEN RAISE EXCEPTION 'permission denied'; END IF;
  IF NOT EXISTS (SELECT 1 FROM public.legal_versions v
                  WHERE v.id = p_version_id AND v.status = 'published') THEN
    RAISE EXCEPTION 'notPublished';
  END IF;
  SELECT p.home_country_code INTO v_home FROM public.profiles p WHERE p.user_id = p_user_id;
  INSERT INTO public.legal_notices (user_id, version_id, channel, status, provider_ref, home_country_code)
  VALUES (p_user_id, p_version_id, p_channel, p_status, p_provider_ref, v_home);
  RETURN jsonb_build_object('ok', true);
END;
$$;
REVOKE ALL ON FUNCTION public.record_legal_notice(uuid, uuid, text, text, text) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.record_legal_notice(uuid, uuid, text, text, text) TO service_role;

INSERT INTO public.migration_marks (version) VALUES ('20261019200000') ON CONFLICT (version) DO NOTHING;
