-- e2e-areas: legal
-- Bundle 22 turn 33 continued (2) — M23: legal doors own missing languages.
-- Live admin_legal_documents(): provolatile=s, prosecdef=true, proconfig={search_path=public}.
-- Live admin_legal_version(uuid): provolatile=s, prosecdef=true, proconfig={search_path=public}.
-- Both live ACLs: postgres, authenticated and service_role EXECUTE; anon false.
-- Each complete live definition gains only missing_languages; live ACLs are restated.
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
                        'missing_languages', (SELECT coalesce(jsonb_agg(jsonb_build_object('code', l.code, 'name_en', l.name_en) ORDER BY l.sort, l.code), '[]'::jsonb) FROM public.languages l WHERE l.enabled_admin AND l.code NOT IN ('en', 'am', 'zxa') AND NOT EXISTS (SELECT 1 FROM public.legal_version_texts t WHERE t.version_id = v.id AND t.language = l.code)),
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

CREATE OR REPLACE FUNCTION public.admin_legal_version(p_version_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
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
             'texts', (SELECT coalesce(jsonb_object_agg(t.language, t.body ORDER BY t.language), '{}'::jsonb) FROM public.legal_version_texts t WHERE t.version_id = v_v.id),
    'missing_languages', (SELECT coalesce(jsonb_agg(jsonb_build_object('code', l.code, 'name_en', l.name_en) ORDER BY l.sort, l.code), '[]'::jsonb) FROM public.languages l WHERE l.enabled_admin AND l.code NOT IN ('en', 'am', 'zxa') AND NOT EXISTS (SELECT 1 FROM public.legal_version_texts t WHERE t.version_id = v_v.id AND t.language = l.code)),
    'changelog', v_v.changelog,
    'material', v_v.material,
    'effective_at', v_v.effective_at,
    'published_at', v_v.published_at,
    'published_by', v_v.published_by,
    'created_by', v_v.created_by,
    'settings_snapshot', v_v.settings_snapshot,
    'created_at', v_v.created_at);
END;
$function$;

REVOKE ALL ON FUNCTION public.admin_legal_version(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.admin_legal_version(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.admin_legal_version(uuid) TO service_role;


DO $proof$
DECLARE
  v_signature text;
  v_oid oid;
  v_definition text;
  v_volatility "char";
  v_security boolean;
  v_config text[];
BEGIN
  FOREACH v_signature IN ARRAY ARRAY['public.admin_legal_documents()', 'public.admin_legal_version(uuid)'] LOOP
    v_oid := to_regprocedure(v_signature);
    IF v_oid IS NULL THEN
      RAISE EXCEPTION 'M23: missing function %', v_signature;
    END IF;
    SELECT pg_get_functiondef(p.oid), p.provolatile, p.prosecdef, p.proconfig
      INTO v_definition, v_volatility, v_security, v_config
      FROM pg_proc p WHERE p.oid = v_oid;
    IF (length(v_definition) - length(replace(v_definition, '''missing_languages''', ''))) / length('''missing_languages''') <> 1 THEN
      RAISE EXCEPTION 'M23: missing_languages must occur exactly once in %', v_signature;
    END IF;
    IF position('enabled_admin' IN v_definition) = 0 THEN
      RAISE EXCEPTION 'M23: enabled_admin missing from %', v_signature;
    END IF;
    IF v_volatility IS DISTINCT FROM 's'::"char" OR v_security IS DISTINCT FROM true OR v_config IS DISTINCT FROM ARRAY['search_path=public']::text[] THEN
      RAISE EXCEPTION 'M23: header changed for %', v_signature;
    END IF;
    IF has_function_privilege('anon', v_oid, 'EXECUTE') THEN
      RAISE EXCEPTION 'M23: anon may execute %', v_signature;
    END IF;
    IF NOT has_function_privilege('authenticated', v_oid, 'EXECUTE') THEN
      RAISE EXCEPTION 'M23: authenticated cannot execute %', v_signature;
    END IF;
  END LOOP;
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261024190000') ON CONFLICT DO NOTHING;