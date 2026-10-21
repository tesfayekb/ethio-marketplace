-- e2e-areas: legal
-- Bundle 22 turn 23 M17 (DEC-228). Published translations are added once.
-- Ruling: the finality trigger maintains updated_at on allowed draft updates.
CREATE TABLE public.legal_version_texts (
  version_id uuid NOT NULL REFERENCES public.legal_versions(id) ON DELETE CASCADE,
  language text NOT NULL REFERENCES public.languages(code),
  body text NOT NULL CHECK (length(btrim(body)) > 0 AND length(body) <= 200000),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (version_id, language),
  CHECK (language NOT IN ('en', 'am'))
);
REVOKE ALL ON TABLE public.legal_version_texts FROM PUBLIC, anon, authenticated;
GRANT ALL ON TABLE public.legal_version_texts TO service_role;
ALTER TABLE public.legal_version_texts ENABLE ROW LEVEL SECURITY;
CREATE POLICY legal_version_texts_deny_select ON public.legal_version_texts FOR SELECT TO anon, authenticated USING (false);
CREATE POLICY legal_version_texts_deny_insert ON public.legal_version_texts FOR INSERT TO anon, authenticated WITH CHECK (false);
CREATE POLICY legal_version_texts_deny_update ON public.legal_version_texts FOR UPDATE TO anon, authenticated USING (false) WITH CHECK (false);
CREATE POLICY legal_version_texts_deny_delete ON public.legal_version_texts FOR DELETE TO anon, authenticated USING (false);

CREATE FUNCTION public.legal_version_texts_finality()
 RETURNS trigger
 LANGUAGE plpgsql
 VOLATILE SECURITY INVOKER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_published boolean;
  v_scratch boolean;
BEGIN
  SELECT v.status = 'published', d.kind ~ '^e2e-'
    INTO v_published, v_scratch
    FROM public.legal_versions v
    JOIN public.legal_documents d ON d.id = v.document_id
   WHERE v.id = OLD.version_id;
  IF coalesce(v_published, false) THEN
    IF TG_OP = 'UPDATE' THEN RAISE EXCEPTION 'publishedIsFinal'; END IF;
    IF TG_OP = 'DELETE' AND NOT (coalesce(v_scratch, false) AND coalesce(auth.role() = 'service_role', false)) THEN
      RAISE EXCEPTION 'publishedIsFinal';
    END IF;
  END IF;
  IF TG_OP = 'UPDATE' THEN
    NEW.updated_at := now();
    RETURN NEW;
  END IF;
  RETURN OLD;
END;
$function$;
REVOKE ALL ON FUNCTION public.legal_version_texts_finality() FROM PUBLIC, anon, authenticated;
CREATE TRIGGER legal_version_texts_finality BEFORE UPDATE OR DELETE ON public.legal_version_texts
FOR EACH ROW EXECUTE FUNCTION public.legal_version_texts_finality();

DROP FUNCTION public.admin_save_legal_draft(text,character,text,text,text,text);

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
REVOKE ALL ON FUNCTION public.admin_save_legal_draft(text,character,text,text,text,text,jsonb) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.admin_save_legal_draft(text,character,text,text,text,text,jsonb) TO authenticated;
GRANT ALL ON FUNCTION public.admin_save_legal_draft(text,character,text,text,text,text,jsonb) TO service_role;

CREATE FUNCTION public.admin_add_legal_translation(p_version_id uuid, p_language text, p_body text)
 RETURNS jsonb
 LANGUAGE plpgsql
 VOLATILE SECURITY DEFINER
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
REVOKE ALL ON FUNCTION public.admin_add_legal_translation(uuid,text,text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_add_legal_translation(uuid,text,text) TO authenticated;
GRANT ALL ON FUNCTION public.admin_add_legal_translation(uuid,text,text) TO service_role;

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
REVOKE ALL ON FUNCTION public.admin_publish_legal_version(uuid,boolean,timestamp with time zone) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.admin_publish_legal_version(uuid,boolean,timestamp with time zone) TO authenticated;
GRANT ALL ON FUNCTION public.admin_publish_legal_version(uuid,boolean,timestamp with time zone) TO service_role;

DO $proof$
DECLARE
  v_kind text := 'e2e-m17-' || substr(replace(gen_random_uuid()::text, '-', ''), 1, 12);
  v_doc uuid;
  v_pub uuid;
  v_draft uuid;
  v_before timestamptz;
  v_after timestamptz;
  v_claims text := current_setting('request.jwt.claims', true);
  v_sub text := current_setting('request.jwt.claim.sub', true);
  v_role text := current_setting('request.jwt.claim.role', true);
  v_result jsonb;
  v_row record;
  v_oid oid;
BEGIN
  IF NOT (SELECT relrowsecurity FROM pg_class WHERE oid = 'public.legal_version_texts'::regclass) THEN
    RAISE EXCEPTION 'M17 proof: RLS missing';
  END IF;
  IF has_table_privilege('anon', 'public.legal_version_texts', 'SELECT,INSERT,UPDATE,DELETE,TRUNCATE,REFERENCES,TRIGGER')
     OR has_table_privilege('authenticated', 'public.legal_version_texts', 'SELECT,INSERT,UPDATE,DELETE,TRUNCATE,REFERENCES,TRIGGER') THEN
    RAISE EXCEPTION 'M17 proof: browser table privileges';
  END IF;
  IF (SELECT count(*) FROM pg_policy WHERE polrelid = 'public.legal_version_texts'::regclass
      AND polcmd IN ('r','a','w','d') AND polroles @> ARRAY['anon'::regrole::oid,'authenticated'::regrole::oid]
      AND CASE polcmd WHEN 'a' THEN pg_get_expr(polwithcheck, polrelid) = 'false'
        WHEN 'w' THEN pg_get_expr(polqual, polrelid) = 'false' AND pg_get_expr(polwithcheck, polrelid) = 'false'
        ELSE pg_get_expr(polqual, polrelid) = 'false' END) <> 4 THEN
    RAISE EXCEPTION 'M17 proof: four deny policies missing';
  END IF;
  INSERT INTO public.languages (code,name_en,name_native,enabled_admin)
    VALUES ('e2e-m17','e2e-m17','e2e-m17',true);
  INSERT INTO public.legal_documents (kind) VALUES (v_kind) RETURNING id INTO v_doc;
  INSERT INTO public.legal_versions (document_id,version,status,label,body_en,body_am,effective_at,published_at,settings_snapshot)
    VALUES (v_doc,1,'published','e2e-published','e2e English','e2e Amharic',now()-interval '1 day',now(),'{}'::jsonb)
    RETURNING id INTO v_pub;
  INSERT INTO public.legal_versions (document_id,version,label,body_en,body_am)
    VALUES (v_doc,2,'e2e-draft','e2e English','e2e Amharic') RETURNING id INTO v_draft;
  PERFORM set_config('request.jwt.claims', '{}', true);
  PERFORM set_config('request.jwt.claim.sub', '', true);
  PERFORM set_config('request.jwt.claim.role', '', true);
  -- INSERT onto a published version is allowed; its content becomes final.
  INSERT INTO public.legal_version_texts (version_id,language,body) VALUES (v_pub,'e2e-m17','e2e translated');
  BEGIN
    UPDATE public.legal_version_texts SET body = 'changed' WHERE version_id = v_pub;
    RAISE EXCEPTION 'M17 proof: published update passed';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'publishedIsFinal' THEN RAISE; END IF;
  END;
  BEGIN
    DELETE FROM public.legal_version_texts WHERE version_id = v_pub;
    RAISE EXCEPTION 'M17 proof: published delete passed';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'publishedIsFinal' THEN RAISE; END IF;
  END;
  INSERT INTO public.legal_version_texts (version_id,language,body,updated_at)
    VALUES (v_draft,'e2e-m17','e2e draft',now()-interval '1 day') RETURNING updated_at INTO v_before;
  UPDATE public.legal_version_texts SET body = 'e2e draft changed' WHERE version_id = v_draft RETURNING updated_at INTO v_after;
  IF v_after <= v_before OR NOT EXISTS (SELECT 1 FROM public.legal_version_texts WHERE version_id = v_draft AND body = 'e2e draft changed') THEN
    RAISE EXCEPTION 'M17 proof: draft update or updated_at failed';
  END IF;
  BEGIN
    INSERT INTO public.legal_version_texts (version_id,language,body) VALUES (v_draft,'en','e2e forbidden');
    RAISE EXCEPTION 'M17 proof: en CHECK passed';
  EXCEPTION WHEN check_violation THEN NULL;
  END;
  BEGIN
    UPDATE public.legal_version_texts SET body = '  ' WHERE version_id = v_draft;
    RAISE EXCEPTION 'M17 proof: blank CHECK passed';
  EXCEPTION WHEN check_violation THEN NULL;
  END;
  IF to_regprocedure('public.admin_save_legal_draft(text,character,text,text,text,text)') IS NOT NULL
     OR to_regprocedure('public.admin_save_legal_draft(text,character,text,text,text,text,jsonb)') IS NULL THEN
    RAISE EXCEPTION 'M17 proof: draft signature';
  END IF;
  BEGIN
    PERFORM public.admin_save_legal_draft(v_kind,NULL,'e2e-missing','en','am','e2e');
    RAISE EXCEPTION 'M17 proof: unauthenticated draft passed';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'not authenticated' THEN RAISE; END IF;
  END;
  BEGIN
    PERFORM public.admin_add_legal_translation(v_pub,'e2e-m17','e2e');
    RAISE EXCEPTION 'M17 proof: unauthenticated translation passed';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'not authenticated' THEN RAISE; END IF;
  END;
  FOR v_row IN SELECT * FROM (VALUES
    ('legal_version_texts_finality()',false,'v',false,false,'NEW.updated_at := now()'),
    ('admin_save_legal_draft(text,character,text,text,text,text,jsonb)',true,'v',true,false,'legal_version_texts'),
    ('admin_add_legal_translation(uuid,text,text)',true,'v',true,false,'translationExists'),
    ('admin_publish_legal_version(uuid,boolean,timestamp with time zone)',true,'v',true,false,'string_agg(t.body')
  ) AS expected(sig,definer,volatility,authenticated_execute,anon_execute,needle) LOOP
    v_oid := to_regprocedure('public.' || v_row.sig);
    IF v_oid IS NULL OR NOT EXISTS (SELECT 1 FROM pg_proc WHERE oid = v_oid
       AND prosecdef = v_row.definer AND provolatile::text = v_row.volatility AND proconfig = ARRAY['search_path=public']) THEN
      RAISE EXCEPTION 'M17 proof: header %',v_row.sig;
    END IF;
    IF has_function_privilege('authenticated',v_oid,'EXECUTE') IS DISTINCT FROM v_row.authenticated_execute
       OR has_function_privilege('anon',v_oid,'EXECUTE') IS DISTINCT FROM v_row.anon_execute THEN
      RAISE EXCEPTION 'M17 proof: ACL %',v_row.sig;
    END IF;
    IF position(v_row.needle IN pg_get_functiondef(v_oid)) = 0 THEN
      RAISE EXCEPTION 'M17 proof: definition %',v_row.sig;
    END IF;
  END LOOP;
  PERFORM set_config('request.jwt.claims','{"role":"service_role"}',true);
  PERFORM set_config('request.jwt.claim.role','service_role',true);
  DELETE FROM public.legal_version_texts WHERE version_id IN (v_pub,v_draft);
  DELETE FROM public.legal_versions WHERE id IN (v_pub,v_draft);
  DELETE FROM public.legal_documents WHERE id = v_doc;
  DELETE FROM public.languages WHERE code = 'e2e-m17';
  PERFORM set_config('request.jwt.claims',coalesce(v_claims,''),true);
  PERFORM set_config('request.jwt.claim.sub',coalesce(v_sub,''),true);
  PERFORM set_config('request.jwt.claim.role',coalesce(v_role,''),true);
END;
$proof$;
INSERT INTO public.migration_marks (version) VALUES ('20261022120000') ON CONFLICT DO NOTHING;
