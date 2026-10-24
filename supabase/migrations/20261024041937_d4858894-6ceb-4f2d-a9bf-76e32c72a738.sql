-- e2e-areas: legal
-- Bundle 22 turn 33 continuation — M22: list-version translation languages.
-- Live catalogue before apply: provolatile=s, prosecdef=true, proconfig={search_path=public}.
-- The sole definition change is languages in the versions object; live ACLs are restated.
-- LGA-21 proves returned language codes using a permission holder; this proof block
-- has no permission holder and therefore checks definition/configuration/ACLs only.
CREATE OR REPLACE FUNCTION public.admin_legal_documents()
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
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
             'review', (SELECT jsonb_build_object('at', e.at, 'kind', e.kind, 'by_name', p.display_name,
                                                  'note', e.note, 'due_at', public.legal_review_due(d.id))
                          FROM (SELECT v.published_at AS at, 'publish'::text AS kind, v.published_by AS who,
                                       NULL::text AS note
                                  FROM public.legal_versions v
                                 WHERE v.document_id = d.id AND v.status = 'published'
                                UNION ALL
                                SELECT r.reviewed_at, 'review', r.reviewed_by, r.note
                                  FROM public.legal_reviews r
                                 WHERE r.document_id = d.id) e
                          LEFT JOIN public.profiles p ON p.user_id = e.who
                         ORDER BY e.at DESC, (e.kind = 'review') DESC
                         LIMIT 1),
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
                        'languages', (SELECT coalesce(jsonb_agg(t.language ORDER BY t.language), '[]'::jsonb) FROM public.legal_version_texts t WHERE t.version_id = v.id),
                        'created_at', v.created_at)
                      ORDER BY v.version DESC)
                 FROM public.legal_versions v
                 LEFT JOIN public.profiles p ON p.user_id = v.published_by
                WHERE v.document_id = d.id), '[]'::jsonb))
           ORDER BY array_position(ARRAY['terms', 'privacy', 'publishing'], d.kind) NULLS LAST,
                    d.kind, d.country_code NULLS FIRST)
      FROM public.legal_documents d), '[]'::jsonb);
END;
$function$;
REVOKE ALL ON FUNCTION public.admin_legal_documents() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_legal_documents() TO authenticated;
GRANT ALL ON FUNCTION public.admin_legal_documents() TO service_role;

DO $proof$
DECLARE
  v_definition text;
  v_security boolean;
  v_config text[];
BEGIN
  SELECT pg_get_functiondef(p.oid), p.prosecdef, p.proconfig
    INTO v_definition, v_security, v_config
    FROM pg_proc p WHERE p.oid = 'public.admin_legal_documents()'::regprocedure;
  IF (length(v_definition) - length(replace(v_definition, '''languages''', ''))) / length('''languages''') <> 1 THEN
    RAISE EXCEPTION 'M22: languages must occur exactly once in the definition';
  END IF;
  IF position('legal_version_texts' IN v_definition) = 0 THEN
    RAISE EXCEPTION 'M22: legal_version_texts missing from the definition';
  END IF;
  IF v_security IS DISTINCT FROM true OR v_config IS DISTINCT FROM ARRAY['search_path=public']::text[] THEN
    RAISE EXCEPTION 'M22: security or search_path changed';
  END IF;
  IF has_function_privilege('anon', 'public.admin_legal_documents()', 'EXECUTE') THEN
    RAISE EXCEPTION 'M22: anon may execute the list door';
  END IF;
  IF NOT has_function_privilege('authenticated', 'public.admin_legal_documents()', 'EXECUTE') THEN
    RAISE EXCEPTION 'M22: authenticated cannot execute the list door';
  END IF;
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261024180000') ON CONFLICT DO NOTHING;