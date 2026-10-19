-- e2e-areas: legal
-- Bundle 22 (Stage 1) turn 4 — M4a (part 1 of 2): the publishing certification's record and its rules (the approved
-- L1 v2 spec of 2026-10-04, item 4; D149, D150, D152). Additive; no existing function is touched. Part 2 (M4b) adds the
-- certification and the acceptance check to the three seller doors.
--  1. listing_certifications — one row per certification: the ad, the seller, the action (publish, edit, renew), the
--     statement versions certified, the ad's countries, the language shown, the time, the seller's home country. Closed
--     to the browser roles; final (no update); erased with its ad.
--  2. legal_listing_countries(listing) — the countries an ad is shown in (its places and its main place).
--  3. legal_publishing_set(listing) — the statements that apply to an ad: the version in force of every publishing
--     statement for all countries, for each country the ad is shown in, and for the seller's home country. The E2E
--     seam: a scratch document of kind e2e-pub-<the listing id without dashes> applies to that listing only (none
--     exists on production).
--  4. legal_acceptance_pending(user, listing) — true while the user has a Terms or Privacy document in force to
--     accept (the rule of my_legal_status). The E2E seam: a scratch kind e2e-acc-<the listing id without dashes>
--     counts for that listing only.
--  5. legal_certify(user, listing, action, certified, language) — refuses acceptanceRequired while an acceptance is
--     pending; when statements apply, refuses certificationRequired unless the certified ids are exactly their
--     versions, badLanguage unless the language is a public one; then records the certification. Nothing applies,
--     nothing is recorded: today's publishing is unchanged until a publishing statement is published.
--  6. my_listing_certification(listing) — the seller's read for the screens: the statements and whether an
--     acceptance is pending. admin_listing_certifications(listing) — staff with listings:view read an ad's record.
-- Gated on M3b's mark; a migration is not DONE until its mark is read back.

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261020030000') THEN
    RAISE EXCEPTION 'bundle 22 turn 3 M3b (mark 20261020030000) must be applied first';
  END IF;
END $$;

-- ===== 1 — the record =====
CREATE TABLE public.listing_certifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id uuid NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  action text NOT NULL CONSTRAINT listing_certifications_action_check CHECK (action IN ('publish', 'edit', 'renew')),
  version_ids uuid[] NOT NULL CONSTRAINT listing_certifications_versions_check CHECK (cardinality(version_ids) >= 1),
  countries char(2)[] NOT NULL DEFAULT '{}',
  language text NOT NULL REFERENCES public.languages(code),
  certified_at timestamptz NOT NULL DEFAULT now(),
  home_country_code char(2) NULL REFERENCES public.countries(code)
);
CREATE INDEX listing_certifications_listing ON public.listing_certifications (listing_id, certified_at DESC);
CREATE INDEX listing_certifications_user ON public.listing_certifications (user_id);
REVOKE ALL ON public.listing_certifications FROM PUBLIC, anon, authenticated;
GRANT ALL ON public.listing_certifications TO service_role;
ALTER TABLE public.listing_certifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY listing_certifications_deny_select ON public.listing_certifications
  FOR SELECT TO anon, authenticated USING (false);
CREATE POLICY listing_certifications_deny_insert ON public.listing_certifications
  FOR INSERT TO anon, authenticated WITH CHECK (false);
CREATE POLICY listing_certifications_deny_update ON public.listing_certifications
  FOR UPDATE TO anon, authenticated USING (false);
CREATE POLICY listing_certifications_deny_delete ON public.listing_certifications
  FOR DELETE TO anon, authenticated USING (false);

-- A certification is final: it never changes (it is deleted only with its ad or its account).
CREATE FUNCTION public.listing_certifications_finality()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO 'public'
AS $$
BEGIN
  RAISE EXCEPTION 'certificationIsFinal';
END;
$$;
REVOKE ALL ON FUNCTION public.listing_certifications_finality() FROM PUBLIC, anon, authenticated;
CREATE TRIGGER listing_certifications_final BEFORE UPDATE ON public.listing_certifications
FOR EACH ROW EXECUTE FUNCTION public.listing_certifications_finality();

-- ===== 2 — the ad's countries =====
CREATE FUNCTION public.legal_listing_countries(p_listing_id uuid)
RETURNS char(2)[]
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT coalesce(array_agg(DISTINCT s.c ORDER BY s.c), '{}'::char(2)[])
    FROM (SELECT l.country_code AS c
            FROM public.listing_locations ll
            JOIN public.locations l ON l.id = ll.location_id
           WHERE ll.listing_id = p_listing_id
          UNION
          SELECT l.country_code
            FROM public.listings x
            JOIN public.locations l ON l.id = x.location_id
           WHERE x.id = p_listing_id) s;
$$;
REVOKE ALL ON FUNCTION public.legal_listing_countries(uuid) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.legal_listing_countries(uuid) TO service_role;

-- ===== 3 — the statements that apply to an ad =====
CREATE FUNCTION public.legal_publishing_set(p_listing_id uuid)
RETURNS jsonb
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT coalesce(jsonb_agg(jsonb_build_object(
           'version_id', x.version_id,
           'kind', x.kind,
           'country_code', x.country_code,
           'version', x.version,
           'label', x.label,
           'body_en', x.body_en,
           'body_am', x.body_am,
           'settings_snapshot', x.settings_snapshot)
         ORDER BY x.country_code NULLS FIRST, x.kind), '[]'::jsonb)
    FROM (
      SELECT DISTINCT ON (d.id)
             d.kind, d.country_code, v.id AS version_id, v.version, v.label, v.body_en, v.body_am,
             v.settings_snapshot
        FROM public.legal_documents d
        JOIN public.legal_versions v ON v.document_id = d.id
       WHERE (d.kind = 'publishing' OR d.kind = 'e2e-pub-' || replace(p_listing_id::text, '-', ''))
         AND v.status = 'published'
         AND v.effective_at <= now()
         AND (d.country_code IS NULL
              OR d.country_code = ANY (public.legal_listing_countries(p_listing_id))
              OR d.country_code = (SELECT p.home_country_code
                                     FROM public.listings x
                                     JOIN public.profiles p ON p.user_id = x.seller_id
                                    WHERE x.id = p_listing_id))
       ORDER BY d.id, v.version DESC
    ) x;
$$;
REVOKE ALL ON FUNCTION public.legal_publishing_set(uuid) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.legal_publishing_set(uuid) TO service_role;

-- ===== 4 — an acceptance still owed =====
-- The rule of my_legal_status: a document applies while the user has accepted no version at or above the newest
-- material version in force (or version 1).
CREATE FUNCTION public.legal_acceptance_pending(p_uid uuid, p_listing_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT EXISTS (
    SELECT 1
      FROM (
        SELECT DISTINCT ON (d.id) d.id AS document_id
          FROM public.legal_documents d
          JOIN public.legal_versions v ON v.document_id = d.id
         WHERE d.kind = ANY (ARRAY['terms', 'privacy', 'e2e-acc-' || replace(p_listing_id::text, '-', '')])
           AND v.status = 'published'
           AND v.effective_at <= now()
           AND (d.country_code IS NULL
                OR d.country_code = (SELECT p.home_country_code FROM public.profiles p WHERE p.user_id = p_uid))
         ORDER BY d.id, v.version DESC
      ) x
     WHERE NOT EXISTS (
       SELECT 1
         FROM public.legal_acceptances a
         JOIN public.legal_versions va ON va.id = a.version_id
        WHERE a.user_id = p_uid
          AND va.document_id = x.document_id
          AND va.version >= (
                SELECT max(v3.version) FROM public.legal_versions v3
                 WHERE v3.document_id = x.document_id
                   AND v3.status = 'published'
                   AND v3.effective_at <= now()
                   AND (v3.material OR v3.version = 1))));
$$;
REVOKE ALL ON FUNCTION public.legal_acceptance_pending(uuid, uuid) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.legal_acceptance_pending(uuid, uuid) TO service_role;

-- ===== 5 — the check and the record, for the seller doors =====
CREATE FUNCTION public.legal_certify(p_uid uuid, p_listing_id uuid, p_action text, p_certified uuid[],
                                     p_language text)
RETURNS void
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_set  jsonb;
  v_ids  uuid[];
  v_sent uuid[];
BEGIN
  IF p_action IS NULL OR p_action NOT IN ('publish', 'edit', 'renew') THEN RAISE EXCEPTION 'badValue:action'; END IF;
  IF public.legal_acceptance_pending(p_uid, p_listing_id) THEN RAISE EXCEPTION 'acceptanceRequired'; END IF;
  v_set := public.legal_publishing_set(p_listing_id);
  IF jsonb_array_length(v_set) = 0 THEN RETURN; END IF;
  SELECT array_agg((e ->> 'version_id')::uuid ORDER BY (e ->> 'version_id')::uuid) INTO v_ids
    FROM jsonb_array_elements(v_set) e;
  SELECT array_agg(c ORDER BY c) INTO v_sent FROM unnest(p_certified) c;
  IF v_sent IS DISTINCT FROM v_ids THEN RAISE EXCEPTION 'certificationRequired'; END IF;
  IF p_language IS NULL OR NOT EXISTS (
       SELECT 1 FROM public.languages l WHERE l.code = p_language AND l.enabled_public) THEN
    RAISE EXCEPTION 'badLanguage';
  END IF;
  INSERT INTO public.listing_certifications
    (listing_id, user_id, action, version_ids, countries, language, home_country_code)
  VALUES (p_listing_id, p_uid, p_action, v_ids, public.legal_listing_countries(p_listing_id), p_language,
          (SELECT p.home_country_code FROM public.profiles p WHERE p.user_id = p_uid));
END;
$$;
REVOKE ALL ON FUNCTION public.legal_certify(uuid, uuid, text, uuid[], text) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.legal_certify(uuid, uuid, text, uuid[], text) TO service_role;

-- ===== 6 — the reads =====
-- The seller's read for the publish, edit and renew screens: the statements that apply to his ad, and whether an
-- acceptance is still owed. Another seller's ad is refused.
CREATE FUNCTION public.my_listing_certification(p_listing_id uuid)
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
  IF NOT EXISTS (SELECT 1 FROM public.listings x
                  WHERE x.id = p_listing_id AND x.seller_id = v_uid AND x.deleted_at IS NULL) THEN
    RAISE EXCEPTION 'not your listing';
  END IF;
  RETURN jsonb_build_object(
    'statements', public.legal_publishing_set(p_listing_id),
    'acceptance_pending', public.legal_acceptance_pending(v_uid, p_listing_id));
END;
$$;
REVOKE ALL ON FUNCTION public.my_listing_certification(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.my_listing_certification(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.my_listing_certification(uuid) TO service_role;

-- An ad's certifications for staff with listings:view, newest first, each with the versions certified.
CREATE FUNCTION public.admin_listing_certifications(p_listing_id uuid)
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
  IF NOT public.has_permission(v_uid, 'listings', 'view') THEN RAISE EXCEPTION 'permission denied'; END IF;
  RETURN coalesce((
    SELECT jsonb_agg(jsonb_build_object(
             'id', c.id,
             'action', c.action,
             'certified_at', c.certified_at,
             'language', c.language,
             'countries', to_jsonb(c.countries),
             'versions', coalesce((
               SELECT jsonb_agg(jsonb_build_object(
                        'version_id', v.id, 'kind', d.kind, 'country_code', d.country_code,
                        'version', v.version, 'label', v.label)
                      ORDER BY d.country_code NULLS FIRST, d.kind)
                 FROM public.legal_versions v
                 JOIN public.legal_documents d ON d.id = v.document_id
                WHERE v.id = ANY (c.version_ids)), '[]'::jsonb))
           ORDER BY c.certified_at DESC)
      FROM public.listing_certifications c
     WHERE c.listing_id = p_listing_id), '[]'::jsonb);
END;
$$;
REVOKE ALL ON FUNCTION public.admin_listing_certifications(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_listing_certifications(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.admin_listing_certifications(uuid) TO service_role;

-- Proofs, with no caller and on scratch rows only (G39; the scratch kinds are created and rolled back here): the
-- statement set and the pending acceptance answer a scratch document tied to a listing id and nothing else; the
-- certify rule refuses as declared before it writes; the two reads refuse a missing caller; the table is closed and
-- final; headers and grants as declared. The record written with a person is proven by LG-15 to LG-18. The certify
-- refusals below take the order acceptance, statements, language; they hold while no Terms or Privacy version is in
-- force (2026-10-19: nothing is published on either database).
DO $$
DECLARE
  v_lid  uuid := gen_random_uuid();
  v_hex  text;
  v_doc  uuid;
  v_set  jsonb;
  v_vol  "char";
  v_def  boolean;
  v_conf text[];
  r      record;
BEGIN
  v_hex := replace(v_lid::text, '-', '');
  BEGIN
    IF jsonb_array_length(public.legal_publishing_set(v_lid)) <> 0
       OR public.legal_acceptance_pending(gen_random_uuid(), v_lid) THEN
      RAISE EXCEPTION 'proof failed: a listing with no scratch document has statements or a pending acceptance';
    END IF;
    PERFORM public.legal_certify(gen_random_uuid(), v_lid, 'publish', NULL, NULL);
    INSERT INTO public.legal_documents (kind) VALUES ('e2e-pub-' || v_hex) RETURNING id INTO v_doc;
    INSERT INTO public.legal_versions (document_id, version, status, label, body_en, body_am, changelog,
                                       material, effective_at, published_at, settings_snapshot)
    VALUES (v_doc, 1, 'published', 'v1', 'e', 'a', 'c', false, now() - interval '1 day', now(), '{}'::jsonb),
           (v_doc, 2, 'published', 'v2', 'e', 'a', 'c', true, now() + interval '30 days', now(), '{}'::jsonb);
    v_set := public.legal_publishing_set(v_lid);
    IF jsonb_array_length(v_set) <> 1 OR (v_set -> 0 ->> 'version')::int <> 1
       OR v_set -> 0 ? 'changelog' THEN
      RAISE EXCEPTION 'proof failed: legal_publishing_set answered %', v_set;
    END IF;
    IF jsonb_array_length(public.legal_publishing_set(gen_random_uuid())) <> 0 THEN
      RAISE EXCEPTION 'proof failed: a scratch statement applied to another listing';
    END IF;
    BEGIN
      PERFORM public.legal_certify(gen_random_uuid(), v_lid, 'publish', NULL, 'en');
      RAISE EXCEPTION 'proof failed: certify passed without the certified versions';
    EXCEPTION WHEN raise_exception THEN
      IF SQLERRM <> 'certificationRequired' THEN RAISE; END IF;
    END;
    BEGIN
      PERFORM public.legal_certify(gen_random_uuid(), v_lid, 'publish',
                                   ARRAY[(v_set -> 0 ->> 'version_id')::uuid, gen_random_uuid()], 'en');
      RAISE EXCEPTION 'proof failed: certify passed with a different set';
    EXCEPTION WHEN raise_exception THEN
      IF SQLERRM <> 'certificationRequired' THEN RAISE; END IF;
    END;
    BEGIN
      PERFORM public.legal_certify(gen_random_uuid(), v_lid, 'publish',
                                   ARRAY[(v_set -> 0 ->> 'version_id')::uuid], 'zz');
      RAISE EXCEPTION 'proof failed: certify passed with an unknown language';
    EXCEPTION WHEN raise_exception THEN
      IF SQLERRM <> 'badLanguage' THEN RAISE; END IF;
    END;
    BEGIN
      PERFORM public.legal_certify(gen_random_uuid(), v_lid, 'delete', NULL, 'en');
      RAISE EXCEPTION 'proof failed: certify passed an unknown action';
    EXCEPTION WHEN raise_exception THEN
      IF SQLERRM <> 'badValue:action' THEN RAISE; END IF;
    END;
    INSERT INTO public.legal_documents (kind) VALUES ('e2e-acc-' || v_hex) RETURNING id INTO v_doc;
    INSERT INTO public.legal_versions (document_id, version, status, label, body_en, body_am, changelog,
                                       material, effective_at, published_at, settings_snapshot)
    VALUES (v_doc, 1, 'published', 'v1', 'e', 'a', 'c', false, now() - interval '1 day', now(), '{}'::jsonb);
    IF NOT public.legal_acceptance_pending(gen_random_uuid(), v_lid)
       OR public.legal_acceptance_pending(gen_random_uuid(), gen_random_uuid()) THEN
      RAISE EXCEPTION 'proof failed: legal_acceptance_pending did not answer the scratch document alone';
    END IF;
    BEGIN
      PERFORM public.legal_certify(gen_random_uuid(), v_lid, 'publish',
                                   ARRAY[(v_set -> 0 ->> 'version_id')::uuid], 'en');
      RAISE EXCEPTION 'proof failed: certify passed with an acceptance pending';
    EXCEPTION WHEN raise_exception THEN
      IF SQLERRM <> 'acceptanceRequired' THEN RAISE; END IF;
    END;
    RAISE EXCEPTION '__m4a_proof_rollback__';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> '__m4a_proof_rollback__' THEN RAISE; END IF;
  END;
  IF EXISTS (SELECT 1 FROM public.legal_documents WHERE kind LIKE 'e2e-pub-' || v_hex OR kind LIKE 'e2e-acc-' || v_hex) THEN
    RAISE EXCEPTION 'proof failed: the scratch documents survived the rollback';
  END IF;
  FOR r IN SELECT * FROM (VALUES ('mine'), ('staff')) AS t(door) LOOP
    BEGIN
      IF r.door = 'mine' THEN PERFORM public.my_listing_certification(gen_random_uuid());
      ELSE PERFORM public.admin_listing_certifications(gen_random_uuid());
      END IF;
      RAISE EXCEPTION 'proof failed: % answered a missing caller', r.door;
    EXCEPTION WHEN raise_exception THEN
      IF SQLERRM <> 'not authenticated' THEN RAISE; END IF;
    END;
  END LOOP;
  IF has_table_privilege('anon', 'public.listing_certifications', 'SELECT')
     OR has_table_privilege('authenticated', 'public.listing_certifications', 'SELECT')
     OR has_table_privilege('authenticated', 'public.listing_certifications', 'INSERT')
     OR NOT (SELECT relrowsecurity FROM pg_class WHERE oid = 'public.listing_certifications'::regclass) THEN
    RAISE EXCEPTION 'proof failed: listing_certifications is not closed to the browser roles';
  END IF;
  FOR r IN SELECT * FROM (VALUES
      ('public.legal_listing_countries(uuid)', 's'::"char", false),
      ('public.legal_publishing_set(uuid)', 's'::"char", false),
      ('public.legal_acceptance_pending(uuid, uuid)', 's'::"char", false),
      ('public.legal_certify(uuid, uuid, text, uuid[], text)', 'v'::"char", false),
      ('public.my_listing_certification(uuid)', 's'::"char", true),
      ('public.admin_listing_certifications(uuid)', 's'::"char", true)) AS t(sig, vol, auth_ok) LOOP
    SELECT p.provolatile, p.prosecdef, p.proconfig INTO v_vol, v_def, v_conf
      FROM pg_proc p WHERE p.oid = r.sig::regprocedure;
    IF v_vol IS DISTINCT FROM r.vol OR v_def IS DISTINCT FROM true
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

INSERT INTO public.migration_marks (version) VALUES ('20261020050000') ON CONFLICT (version) DO NOTHING;
