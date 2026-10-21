-- e2e-areas: legal
-- Bundle 22 turn 23 M17b: readers and actual shown-language acceptance (DEC-228).
CREATE OR REPLACE FUNCTION public.legal_in_force(p_kind text, p_country character DEFAULT NULL::bpchar)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
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
             'texts', (SELECT coalesce(jsonb_object_agg(t.language, t.body ORDER BY t.language), '{}'::jsonb) FROM public.legal_version_texts t WHERE t.version_id = v.id),
             'material', v.material,
             'effective_at', v.effective_at,
             'published_at', v.published_at,
             'settings_snapshot', v.settings_snapshot)
      FROM public.legal_documents d
      JOIN public.legal_versions v ON v.document_id = d.id
     WHERE d.kind = p_kind
       AND d.country_code IS NOT DISTINCT FROM p_country
       AND v.status = 'published'
       AND v.effective_at <= now()
     ORDER BY v.version DESC
     LIMIT 1);
END;
$function$;
REVOKE ALL ON FUNCTION public.legal_in_force(text,character) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.legal_in_force(text,character) TO anon, authenticated;
GRANT ALL ON FUNCTION public.legal_in_force(text,character) TO service_role;

CREATE OR REPLACE FUNCTION public.legal_scheduled(p_kind text, p_country character DEFAULT NULL::bpchar)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
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
             'texts', (SELECT coalesce(jsonb_object_agg(t.language, t.body ORDER BY t.language), '{}'::jsonb) FROM public.legal_version_texts t WHERE t.version_id = v.id),
             'material', v.material,
             'effective_at', v.effective_at,
             'published_at', v.published_at,
             'settings_snapshot', v.settings_snapshot)
      FROM public.legal_documents d
      JOIN public.legal_versions v ON v.document_id = d.id
     WHERE d.kind = p_kind
       AND d.country_code IS NOT DISTINCT FROM p_country
       AND v.status = 'published'
       AND v.effective_at > now()
     ORDER BY v.effective_at, v.version
     LIMIT 1);
END;
$function$;
REVOKE ALL ON FUNCTION public.legal_scheduled(text,character) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.legal_scheduled(text,character) TO anon, authenticated;
GRANT ALL ON FUNCTION public.legal_scheduled(text,character) TO service_role;

CREATE OR REPLACE FUNCTION public.legal_publishing_set(p_listing_id uuid)
 RETURNS jsonb
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT coalesce(jsonb_agg(jsonb_build_object(
           'version_id', x.version_id,
           'kind', x.kind,
           'country_code', x.country_code,
           'version', x.version,
           'label', x.label,
           'body_en', x.body_en,
           'body_am', x.body_am,
             'texts', (SELECT coalesce(jsonb_object_agg(t.language, t.body ORDER BY t.language), '{}'::jsonb) FROM public.legal_version_texts t WHERE t.version_id = x.version_id),
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
$function$;
REVOKE ALL ON FUNCTION public.legal_publishing_set(uuid) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.legal_publishing_set(uuid) TO service_role;

CREATE OR REPLACE FUNCTION public.my_legal_version(p_version_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
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
             'texts', (SELECT coalesce(jsonb_object_agg(t.language, t.body ORDER BY t.language), '{}'::jsonb) FROM public.legal_version_texts t WHERE t.version_id = v_v.id),
    'material', v_v.material,
    'effective_at', v_v.effective_at,
    'published_at', v_v.published_at,
    'settings_snapshot', v_v.settings_snapshot);
END;
$function$;
REVOKE ALL ON FUNCTION public.my_legal_version(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.my_legal_version(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.my_legal_version(uuid) TO service_role;

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

CREATE OR REPLACE FUNCTION public.accept_legal(p_version_ids uuid[], p_language text, p_adult boolean, p_data_consent boolean DEFAULT false)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid     uuid := auth.uid();
  v_method  text;
  v_home    char(2);
  v_vid     uuid;
  v_v       public.legal_versions%ROWTYPE;
  v_privacy boolean;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF p_version_ids IS NULL OR array_length(p_version_ids, 1) IS NULL THEN
    RAISE EXCEPTION 'emptyList';
  END IF;
  IF p_adult IS DISTINCT FROM true AND NOT EXISTS (
       SELECT 1 FROM public.legal_acceptances a WHERE a.user_id = v_uid AND a.adult_confirmed) THEN
    RAISE EXCEPTION 'adultRequired';
  END IF;
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
    SELECT (d.kind = 'privacy' OR d.kind ~ '^e2e-[a-z0-9-]*-privacy$') INTO v_privacy
      FROM public.legal_documents d WHERE d.id = v_v.document_id;
    INSERT INTO public.legal_acceptances
      (user_id, version_id, language, method, adult_confirmed, home_country_code, data_consent)
    VALUES (v_uid, v_vid, CASE WHEN p_language IN ('en', 'am') OR EXISTS (SELECT 1 FROM public.legal_version_texts t WHERE t.version_id = v_vid AND t.language = p_language) THEN p_language ELSE 'en' END, v_method, p_adult IS TRUE, v_home, v_privacy AND p_data_consent IS TRUE)
    ON CONFLICT (user_id, version_id) DO NOTHING;
  END LOOP;
  RETURN jsonb_build_object('ok', true);
END;
$function$;
REVOKE ALL ON FUNCTION public.accept_legal(uuid[],text,boolean,boolean) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.accept_legal(uuid[],text,boolean,boolean) TO authenticated;
GRANT ALL ON FUNCTION public.accept_legal(uuid[],text,boolean,boolean) TO service_role;
DO $proof$
DECLARE
  v_kind text := 'e2e-m17-' || substr(replace(gen_random_uuid()::text, '-', ''), 1, 12);
  v_doc uuid;
  v_pub uuid;
  v_claims text := current_setting('request.jwt.claims',true);
  v_role text := current_setting('request.jwt.claim.role',true);
  v_row record;
  v_oid oid;
  v_result jsonb;
BEGIN
  INSERT INTO public.languages (code,name_en,name_native,enabled_admin) VALUES ('e2e-m17','e2e-m17','e2e-m17',true);
  INSERT INTO public.legal_documents (kind) VALUES (v_kind) RETURNING id INTO v_doc;
  INSERT INTO public.legal_versions (document_id,version,status,label,body_en,body_am,effective_at,published_at,settings_snapshot)
    VALUES (v_doc,1,'published','e2e-published','e2e English','e2e Amharic',now()-interval '1 day',now(),'{}'::jsonb) RETURNING id INTO v_pub;
  INSERT INTO public.legal_version_texts (version_id,language,body) VALUES (v_pub,'e2e-m17','e2e translated');
  v_result := public.legal_in_force(v_kind,NULL);
  IF v_result -> 'texts' ->> 'e2e-m17' IS DISTINCT FROM 'e2e translated' THEN RAISE EXCEPTION 'M17b proof: reader texts'; END IF;
  FOR v_row IN SELECT * FROM (VALUES
    ('legal_in_force(text,character)','s',true,true,'''texts'''),
    ('legal_scheduled(text,character)','s',true,true,'''texts'''),
    ('legal_publishing_set(uuid)','s',false,false,'''texts'''),
    ('my_legal_version(uuid)','s',true,false,'''texts'''),
    ('admin_legal_version(uuid)','s',true,false,'''texts'''),
    ('accept_legal(uuid[],text,boolean,boolean)','v',true,false,'legal_version_texts')
  ) AS expected(sig,volatility,authenticated_execute,anon_execute,needle) LOOP
    v_oid := to_regprocedure('public.' || v_row.sig);
    IF v_oid IS NULL OR NOT EXISTS (SELECT 1 FROM pg_proc WHERE oid = v_oid AND prosecdef
      AND provolatile::text = v_row.volatility AND proconfig = ARRAY['search_path=public']) THEN RAISE EXCEPTION 'M17b proof: header %',v_row.sig; END IF;
    IF has_function_privilege('authenticated',v_oid,'EXECUTE') IS DISTINCT FROM v_row.authenticated_execute
      OR has_function_privilege('anon',v_oid,'EXECUTE') IS DISTINCT FROM v_row.anon_execute THEN RAISE EXCEPTION 'M17b proof: ACL %',v_row.sig; END IF;
    IF position(v_row.needle IN pg_get_functiondef(v_oid)) = 0 THEN RAISE EXCEPTION 'M17b proof: definition %',v_row.sig; END IF;
  END LOOP;
  PERFORM set_config('request.jwt.claims','{"role":"service_role"}',true);
  PERFORM set_config('request.jwt.claim.role','service_role',true);
  DELETE FROM public.legal_version_texts WHERE version_id = v_pub;
  DELETE FROM public.legal_versions WHERE id = v_pub;
  DELETE FROM public.legal_documents WHERE id = v_doc;
  DELETE FROM public.languages WHERE code = 'e2e-m17';
  PERFORM set_config('request.jwt.claims',coalesce(v_claims,''),true);
  PERFORM set_config('request.jwt.claim.role',coalesce(v_role,''),true);
END;
$proof$;
INSERT INTO public.migration_marks (version) VALUES ('20261022130000') ON CONFLICT DO NOTHING;
