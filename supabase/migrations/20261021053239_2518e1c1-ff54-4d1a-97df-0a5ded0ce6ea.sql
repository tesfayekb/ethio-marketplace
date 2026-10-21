-- e2e-areas: legal
-- Bundle 22 turn 17c — M14 (mark 20261021200000): Admin › Legal counts, per version, the accounts that signed in after
-- it took effect without accepting (D227 (3): tests never run on production, so this number is the check there).
--  1. legal_signed_in_unaccepted(version) — new. For a published version in force of a document asked at sign-in
--     (terms, privacy, or the person seam e2e-acc-u<the user id without dashes>): the number of accounts whose last
--     sign-in (auth.users.last_sign_in_at, as admin_get_user reads it — 20260816120338 :287, :306) is at or after the
--     version's effective time and that have not accepted the version legal_acceptance_pending asks for at that
--     version (the newest published material version, or version 1, up to it) or a later one; the document's country
--     rule is legal_acceptance_pending's. Any other version or kind: NULL. Closed to the browser roles.
--  2. admin_legal_documents() — redeclared whole from M2 (20261019084720 :20-:61); one change: each version also
--     carries 'signed_in_unaccepted'.
-- Proofs: headers and grants; on scratch rows (removed), a person-seam version of an account that does not exist
-- counts 0, its draft and a kind not asked at sign-in count NULL. The count through the screen is LGA-15.

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261021180000') THEN
    RAISE EXCEPTION 'bundle 22 turn 17b M13 (mark 20261021180000) must be applied first';
  END IF;
END $$;

-- ===== 1 — the count =====
CREATE FUNCTION public.legal_signed_in_unaccepted(p_version_id uuid)
RETURNS bigint
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT (
    SELECT count(*)
      FROM auth.users u
      LEFT JOIN public.profiles p ON p.user_id = u.id
     WHERE u.last_sign_in_at >= v.effective_at
       AND (d.country_code IS NULL OR p.home_country_code = d.country_code)
       AND (d.kind NOT LIKE 'e2e-acc-u%' OR d.kind = 'e2e-acc-u' || replace(u.id::text, '-', ''))
       AND NOT EXISTS (
             SELECT 1
               FROM public.legal_acceptances a
               JOIN public.legal_versions va ON va.id = a.version_id
              WHERE a.user_id = u.id
                AND va.document_id = d.id
                AND va.version >= (
                      SELECT max(v3.version) FROM public.legal_versions v3
                       WHERE v3.document_id = d.id
                         AND v3.status = 'published'
                         AND v3.effective_at <= now()
                         AND v3.version <= v.version
                         AND (v3.material OR v3.version = 1))))
    FROM public.legal_versions v
    JOIN public.legal_documents d ON d.id = v.document_id
   WHERE v.id = p_version_id
     AND v.status = 'published'
     AND v.effective_at <= now()
     AND (d.kind IN ('terms', 'privacy') OR d.kind LIKE 'e2e-acc-u%');
$$;
REVOKE ALL ON FUNCTION public.legal_signed_in_unaccepted(uuid) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.legal_signed_in_unaccepted(uuid) TO service_role;

-- ===== 2 — the staff list (redeclared whole; one field added) =====
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
                        'published_by_name', p.display_name,
                        'acceptances', (SELECT count(*) FROM public.legal_acceptances a
                                         WHERE a.version_id = v.id),
                        'signed_in_unaccepted', public.legal_signed_in_unaccepted(v.id),
                        'created_at', v.created_at)
                      ORDER BY v.version DESC)
                 FROM public.legal_versions v
                 LEFT JOIN public.profiles p ON p.user_id = v.published_by
                WHERE v.document_id = d.id), '[]'::jsonb))
           ORDER BY array_position(ARRAY['terms', 'privacy', 'publishing'], d.kind) NULLS LAST,
                    d.kind, d.country_code NULLS FIRST)
      FROM public.legal_documents d), '[]'::jsonb);
END;
$$;
REVOKE ALL ON FUNCTION public.admin_legal_documents() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_legal_documents() TO authenticated;
GRANT ALL ON FUNCTION public.admin_legal_documents() TO service_role;

-- ===== 3 — proofs (a failure raises; a clean apply is the pass) =====
DO $$
DECLARE
  v_ghost   uuid := gen_random_uuid();
  v_doc     uuid;
  v_version uuid;
  v_draft   uuid;
  v_plain   uuid;
  v_plain_v uuid;
BEGIN
  -- Both headers: SECURITY DEFINER, STABLE, search_path public.
  IF (SELECT count(*) FROM pg_proc p
       WHERE p.oid IN ('public.legal_signed_in_unaccepted(uuid)'::regprocedure,
                       'public.admin_legal_documents()'::regprocedure)
         AND p.prosecdef AND p.provolatile = 's' AND p.proconfig @> ARRAY['search_path=public']) <> 2 THEN
    RAISE EXCEPTION 'proof: a header is not SECURITY DEFINER, STABLE with search_path public';
  END IF;
  -- The count is closed to the browser roles; the staff list keeps its grants (signed-in callers; legal:view inside).
  IF has_function_privilege('anon', 'public.legal_signed_in_unaccepted(uuid)', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.legal_signed_in_unaccepted(uuid)', 'EXECUTE') THEN
    RAISE EXCEPTION 'proof: legal_signed_in_unaccepted is executable by a browser role';
  END IF;
  IF has_function_privilege('anon', 'public.admin_legal_documents()', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.admin_legal_documents()', 'EXECUTE') THEN
    RAISE EXCEPTION 'proof: admin_legal_documents grants changed';
  END IF;
  IF position('''signed_in_unaccepted'', public.legal_signed_in_unaccepted(v.id)'
              in pg_get_functiondef('public.admin_legal_documents()'::regprocedure)) = 0 THEN
    RAISE EXCEPTION 'proof: admin_legal_documents does not carry the count';
  END IF;
  -- Scratch rows: the person seam of an account that does not exist counts 0; its draft counts NULL.
  INSERT INTO public.legal_documents (kind, country_code)
  VALUES ('e2e-acc-u' || replace(v_ghost::text, '-', ''), NULL)
  RETURNING id INTO v_doc;
  INSERT INTO public.legal_versions (document_id, version, status, label, body_en, body_am, changelog, material,
                                     effective_at, published_at, settings_snapshot)
  VALUES (v_doc, 1, 'published', 'v1', 'M14 proof', 'M14 proof', 'M14 proof', false,
          now() - interval '1 minute', now() - interval '1 minute', '{"seed": "M14 proof"}'::jsonb)
  RETURNING id INTO v_version;
  INSERT INTO public.legal_versions (document_id, version, status, label)
  VALUES (v_doc, 2, 'draft', 'v2')
  RETURNING id INTO v_draft;
  IF public.legal_signed_in_unaccepted(v_version) IS DISTINCT FROM 0 THEN
    RAISE EXCEPTION 'proof: the person seam of an account that does not exist does not count 0';
  END IF;
  IF public.legal_signed_in_unaccepted(v_draft) IS NOT NULL THEN
    RAISE EXCEPTION 'proof: a draft is counted';
  END IF;
  -- A kind not asked at sign-in counts NULL.
  INSERT INTO public.legal_documents (kind, country_code)
  VALUES ('e2e-m14-' || substr(replace(gen_random_uuid()::text, '-', ''), 1, 12), NULL)
  RETURNING id INTO v_plain;
  INSERT INTO public.legal_versions (document_id, version, status, label, body_en, body_am, changelog, material,
                                     effective_at, published_at, settings_snapshot)
  VALUES (v_plain, 1, 'published', 'v1', 'M14 proof', 'M14 proof', 'M14 proof', false,
          now() - interval '1 minute', now() - interval '1 minute', '{"seed": "M14 proof"}'::jsonb)
  RETURNING id INTO v_plain_v;
  IF public.legal_signed_in_unaccepted(v_plain_v) IS NOT NULL THEN
    RAISE EXCEPTION 'proof: a kind not asked at sign-in is counted';
  END IF;
  DELETE FROM public.legal_versions WHERE id IN (v_version, v_draft, v_plain_v);
  DELETE FROM public.legal_documents WHERE id IN (v_doc, v_plain);
END $$;

INSERT INTO public.migration_marks (version) VALUES ('20261021200000') ON CONFLICT DO NOTHING;