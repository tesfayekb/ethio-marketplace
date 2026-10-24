-- e2e-areas: legal
-- Foundations turn 1 (D236): the audience of a legal kind — publishing and its scratch class are read by signed-in people only; the two public readers call it before reading; mirrored by signedInOnlyKind in src/features/legal/legal-kinds.ts.
CREATE OR REPLACE FUNCTION public.legal_kind_signed_in_only(p_kind text)
 RETURNS boolean
 LANGUAGE sql
 IMMUTABLE PARALLEL SAFE
 SET search_path TO 'public'
AS $function$
 SELECT p_kind = 'publishing' OR p_kind ~ '^e2e-pub-'
$function$;
REVOKE ALL ON FUNCTION public.legal_kind_signed_in_only(text) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.legal_kind_signed_in_only(text) TO service_role;

CREATE OR REPLACE FUNCTION public.legal_in_force(p_kind text, p_country character DEFAULT NULL::bpchar)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  IF public.legal_kind_signed_in_only(p_kind) AND auth.uid() IS NULL THEN
    RAISE EXCEPTION 'permission denied' USING ERRCODE = '42501';
  END IF;
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
  IF public.legal_kind_signed_in_only(p_kind) AND auth.uid() IS NULL THEN
    RAISE EXCEPTION 'permission denied' USING ERRCODE = '42501';
  END IF;
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

DO $proof$
DECLARE
  v_claims text := current_setting('request.jwt.claims', true);
  v_sub text := current_setting('request.jwt.claim.sub', true);
  v_role text := current_setting('request.jwt.claim.role', true);
  v_uid uuid := gen_random_uuid();
BEGIN
  PERFORM set_config('request.jwt.claims', '{}', true);
  PERFORM set_config('request.jwt.claim.sub', '', true);
  PERFORM set_config('request.jwt.claim.role', '', true);
  BEGIN
    PERFORM public.legal_in_force('e2e-pub-m24proof');
    RAISE EXCEPTION 'M24 proof: an anonymous read of a publishing kind passed';
  EXCEPTION WHEN insufficient_privilege THEN
    NULL;
  END;
  BEGIN
    PERFORM public.legal_scheduled('e2e-pub-m24proof');
    RAISE EXCEPTION 'M24 proof: an anonymous scheduled read of a publishing kind passed';
  EXCEPTION WHEN insufficient_privilege THEN
    NULL;
  END;
  PERFORM public.legal_in_force('e2e-m24proof-terms');
  PERFORM set_config('request.jwt.claims', jsonb_build_object('sub', v_uid::text, 'role', 'authenticated')::text, true);
  PERFORM set_config('request.jwt.claim.sub', v_uid::text, true);
  PERFORM set_config('request.jwt.claim.role', 'authenticated', true);
  PERFORM public.legal_in_force('e2e-pub-m24proof');
  PERFORM public.legal_scheduled('e2e-pub-m24proof');
  PERFORM set_config('request.jwt.claims', coalesce(v_claims, ''), true);
  PERFORM set_config('request.jwt.claim.sub', coalesce(v_sub, ''), true);
  PERFORM set_config('request.jwt.claim.role', coalesce(v_role, ''), true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261024200000') ON CONFLICT DO NOTHING;
-- In-file closers: all three functions revoke PUBLIC; only the two gated readers grant anon/authenticated EXECUTE; service_role retains all privileges.
