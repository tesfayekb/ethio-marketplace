-- UX-2 item 7 — THE DATA ROSTER NAMES EACH ROW'S IDENTITY.
--
-- Six attribute definitions may all be labelled "Make"; six categories may all
-- be called "Other". The roster showed the LABEL alone, so those rows were
-- indistinguishable. This adds ONE projected column — `identifier` — carrying
-- the entity's stable machine identity (categories.slug, attributes.attr_key;
-- locations have none and answer NULL).
--
-- INC-183 LAW: no anchored patch. The function is re-declared WHOLE. Its
-- return shape changes, so CREATE OR REPLACE cannot carry it — the old
-- signature is dropped and the whole declaration lands in this file, followed
-- by its REVOKE/GRANT closers and an in-file definition + ACL read-back.
--
-- Everything else is byte-for-byte the deployed behaviour: the same
-- `translations:view` gate, the same universe (active categories + active
-- locations + every attribute), the same status/search filters, the same
-- ORDER BY / LIMIT / OFFSET and the same `total_count` window. Nothing else
-- reads this function, so `get_entity_bundle` and the attribute export are
-- untouched by construction.

DROP FUNCTION IF EXISTS public.admin_list_entity_translations(text, text, text, integer, integer);

CREATE OR REPLACE FUNCTION public.admin_list_entity_translations(
  p_lang text, p_status text DEFAULT NULL::text, p_search text DEFAULT NULL::text,
  p_limit integer DEFAULT 50, p_offset integer DEFAULT 0)
RETURNS TABLE(entity_type text, entity_id uuid, field text, label text, identifier text,
              source_value text, value text, status text, machine boolean, flagged boolean,
              flag_note text, updated_by uuid, updated_at timestamp with time zone,
              approved_by uuid, approved_at timestamp with time zone, total_count bigint)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  IF NOT public.has_permission(auth.uid(), 'translations', 'view') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;

  RETURN QUERY
  WITH universe AS (
    SELECT 'category'::text AS etype, c.id AS eid, 'name'::text AS efield,
           c.name_en AS elabel, c.slug::text AS eident
      FROM public.categories c WHERE c.is_active
    UNION ALL
    -- A location has no operator-facing machine identity in this console.
    SELECT 'location'::text, l.id, 'name'::text, l.name_en, NULL::text
      FROM public.locations l WHERE l.is_active
    UNION ALL
    SELECT 'attribute'::text, a.id, 'label'::text, a.name_en, a.attr_key::text
      FROM public.attributes a
  ),
  joined AS (
    SELECT u.etype, u.eid, u.efield, u.elabel, u.eident,
           t.value, COALESCE(t.status, 'untranslated') AS status,
           COALESCE(t.machine, false) AS machine,
           COALESCE(t.flagged, false) AS flagged,
           t.flag_note, t.updated_by, t.updated_at, t.approved_by, t.approved_at
      FROM universe u
      LEFT JOIN public.entity_translations t
        ON t.entity_type = u.etype AND t.entity_id = u.eid
       AND t.field = u.efield AND t.lang_code = p_lang
  ),
  filtered AS (
    SELECT * FROM joined j
     WHERE (p_status IS NULL OR p_status = '' OR p_status = 'all' OR j.status = p_status)
       AND (p_search IS NULL OR p_search = ''
            OR j.elabel ILIKE '%' || p_search || '%'
            OR COALESCE(j.value, '') ILIKE '%' || p_search || '%')
  )
  SELECT f.etype, f.eid, f.efield, f.elabel, f.eident, f.elabel, f.value, f.status,
         f.machine, f.flagged, f.flag_note, f.updated_by, f.updated_at,
         f.approved_by, f.approved_at, COUNT(*) OVER () AS total_count
    FROM filtered f
   ORDER BY f.etype, f.elabel, f.eid
   LIMIT GREATEST(COALESCE(p_limit, 50), 1)
  OFFSET GREATEST(COALESCE(p_offset, 0), 0);
END $function$;

-- CLOSERS IN-FILE (E2/A8, DEC-022-B).
REVOKE ALL ON FUNCTION public.admin_list_entity_translations(text, text, text, integer, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_list_entity_translations(text, text, text, integer, integer) TO authenticated;
GRANT ALL ON FUNCTION public.admin_list_entity_translations(text, text, text, integer, integer) TO service_role;

-- READ-BACK: the definition really carries the new column, and the ACL is
-- exactly authenticated + service_role, never PUBLIC or anon.
DO $$
DECLARE
  v_def text;
BEGIN
  SELECT pg_get_functiondef(p.oid) INTO v_def
    FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
   WHERE n.nspname = 'public' AND p.proname = 'admin_list_entity_translations';

  IF v_def IS NULL THEN
    RAISE EXCEPTION 'UX-2/7: admin_list_entity_translations is missing after re-declaration';
  END IF;
  IF position('identifier text' in v_def) = 0 THEN
    RAISE EXCEPTION 'UX-2/7: the re-declared function does not project identifier';
  END IF;
  IF position('SECURITY DEFINER' in v_def) = 0 THEN
    RAISE EXCEPTION 'UX-2/7: the re-declared function lost SECURITY DEFINER';
  END IF;
  RAISE NOTICE 'UX-2/7 definition read-back OK (identifier projected)';

  IF has_function_privilege('anon', 'public.admin_list_entity_translations(text,text,text,integer,integer)', 'EXECUTE') THEN
    RAISE EXCEPTION 'UX-2/7: anon may execute the roster read';
  END IF;
  IF NOT (has_function_privilege('authenticated', 'public.admin_list_entity_translations(text,text,text,integer,integer)', 'EXECUTE')
      AND has_function_privilege('service_role', 'public.admin_list_entity_translations(text,text,text,integer,integer)', 'EXECUTE')) THEN
    RAISE EXCEPTION 'UX-2/7: authenticated/service_role lost EXECUTE';
  END IF;
  RAISE NOTICE 'UX-2/7 ACL read-back OK (authenticated + service_role only)';
END $$;

-- IDENTITY PROOF: every listed category row names its slug and every attribute
-- row names its key; a location row names nothing. Read as the definer's own
-- owner context, so the permission gate is bypassed only for this assertion by
-- querying the same universe the function walks.
DO $$
DECLARE
  v_cat_missing bigint;
  v_attr_missing bigint;
BEGIN
  SELECT count(*) INTO v_cat_missing
    FROM public.categories c WHERE c.is_active AND (c.slug IS NULL OR c.slug = '');
  SELECT count(*) INTO v_attr_missing
    FROM public.attributes a WHERE a.attr_key IS NULL OR a.attr_key = '';
  IF v_cat_missing > 0 OR v_attr_missing > 0 THEN
    RAISE EXCEPTION 'UX-2/7: % active categories and % attributes carry no identifier',
      v_cat_missing, v_attr_missing;
  END IF;
  RAISE NOTICE 'UX-2/7 identity proof OK (every active category and attribute has an identifier)';
END $$;

INSERT INTO public.migration_marks(version) VALUES ('20260910080000') ON CONFLICT DO NOTHING;