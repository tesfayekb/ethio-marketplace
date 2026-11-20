-- e2e-areas: admin-categories, admin-attributes, admin-imports

-- Foundations 1, turn F1-7b, part 3 of 8 — THE CATEGORY FAMILY'S UNKNOWN SCOPE BY ITS CODE (DEC-333, F1-4a decision
-- 4; brief docs/governance/briefs/f1-doors-7b.md; census docs/governance/reports/f1-doors-7b.census.md).
-- The sentence `unknown category scope` becomes door_refuse('unknownCategory') — the code the family's row reasons
-- already use — in the three SQL callers that raise it: cat_import_plan and attr_import_plan (bodies over 10 KB and
-- not doors: redeclared by computed insertion from the live body, md5-guarded before and after — rule 30, DEC-383)
-- and attr_export_payload (written out whole from its live body). Every other byte, the headers and the grants as
-- live. The doors that read them (the two previews, the two commits, admin_export_attributes) are unchanged: a
-- preview or the export raises the code (P0D01), a commit's shell answers it as a refusal.

DO $pre$
DECLARE
  v_md5 text;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261120050100') THEN
    RAISE EXCEPTION 'F1-7b part 3: part 2 (e6a3d930) must be applied first';
  END IF;
  SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p
   WHERE p.oid = 'public.attr_export_payload(text)'::regprocedure;
  IF v_md5 IS DISTINCT FROM '5cec4c6a3f3b2fdf68a739722bba05be' THEN
    RAISE EXCEPTION 'F1-7b part 3: the live attr_export_payload is not the body this file was built from (%)', v_md5;
  END IF;
END $pre$;

-- ------------------------------------------------------------ 1. cat_import_plan (computed; old md5
-- c668f8b04c903f60f0117051107cf800, new md5 e3d3f9e586a9b2a809a1ee3aa2c1cd47)
DO $f17b_cat_import_plan$
DECLARE
  v_src      text;
  v_new      text;
  v_args     text;
  v_result   text;
  v_secdef   boolean;
  v_volatile "char";
  v_config   text;
  v_defaults text;
  v_acl      text;
  v_pairs    text[][] := ARRAY[
      [E'    IF v_scope IS NULL THEN RAISE EXCEPTION ''unknown category scope''; END IF;',
       E'    IF v_scope IS NULL THEN PERFORM public.door_refuse(''unknownCategory''); END IF;']];
  i          integer;
BEGIN
  SELECT p.prosrc, pg_get_function_arguments(p.oid), pg_get_function_result(p.oid), p.prosecdef, p.provolatile,
         coalesce(p.proconfig::text, ''), coalesce(p.proargdefaults::text, ''), coalesce(p.proacl::text, '')
    INTO v_src, v_args, v_result, v_secdef, v_volatile, v_config, v_defaults, v_acl
    FROM pg_proc p WHERE p.oid = 'public.cat_import_plan(jsonb,text)'::regprocedure;
  v_new := replace(v_src, chr(13), '');
  IF md5(v_new) IS DISTINCT FROM 'c668f8b04c903f60f0117051107cf800' OR v_config <> '{search_path=public}' THEN
    RAISE EXCEPTION 'F1-7b: the live cat_import_plan is not the body this file was built from (%)', md5(v_new);
  END IF;
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    IF (length(v_new) - length(replace(v_new, v_pairs[i][1], ''))) / length(v_pairs[i][1]) <> 1 THEN
      RAISE EXCEPTION 'F1-7b: change % of cat_import_plan does not find its one anchor', i;
    END IF;
    v_new := replace(v_new, v_pairs[i][1], v_pairs[i][2]);
  END LOOP;
  IF md5(v_new) IS DISTINCT FROM 'e3d3f9e586a9b2a809a1ee3aa2c1cd47' THEN
    RAISE EXCEPTION 'F1-7b: the new cat_import_plan is not the body this file names (%)', md5(v_new);
  END IF;
  EXECUTE format('CREATE OR REPLACE FUNCTION public.cat_import_plan(%s) RETURNS %s LANGUAGE plpgsql %s SECURITY %s SET search_path = public AS $f17b$%s$f17b$',
    v_args, v_result,
    CASE v_volatile WHEN 's' THEN 'STABLE' WHEN 'i' THEN 'IMMUTABLE' ELSE 'VOLATILE' END,
    CASE WHEN v_secdef THEN 'DEFINER' ELSE 'INVOKER' END,
    v_new);
  IF NOT EXISTS (
    SELECT 1 FROM pg_proc p WHERE p.oid = 'public.cat_import_plan(jsonb,text)'::regprocedure
       AND p.prosecdef = v_secdef AND p.provolatile = v_volatile
       AND coalesce(p.proconfig::text, '') = v_config
       AND coalesce(p.proargdefaults::text, '') = v_defaults
       AND coalesce(p.proacl::text, '') = v_acl
       AND pg_get_function_result(p.oid) = v_result
       AND md5(replace(p.prosrc, chr(13), '')) = 'e3d3f9e586a9b2a809a1ee3aa2c1cd47') THEN
    RAISE EXCEPTION 'F1-7b: cat_import_plan drifted in its header, grants or body after the redeclaration';
  END IF;
END $f17b_cat_import_plan$;
REVOKE ALL ON FUNCTION public.cat_import_plan(jsonb, text) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.cat_import_plan(jsonb, text) TO service_role;

-- ------------------------------------------------------------ 2. attr_import_plan (computed; old md5
-- 7a2cb3062a843c2d16ce1b5be5be90ef, new md5 b8a140b73f535e16bf7997af3b74c994)
DO $f17b_attr_import_plan$
DECLARE
  v_src      text;
  v_new      text;
  v_args     text;
  v_result   text;
  v_secdef   boolean;
  v_volatile "char";
  v_config   text;
  v_defaults text;
  v_acl      text;
  v_pairs    text[][] := ARRAY[
      [E'      RAISE EXCEPTION ''unknown category scope'';',
       E'      PERFORM public.door_refuse(''unknownCategory'');']];
  i          integer;
BEGIN
  SELECT p.prosrc, pg_get_function_arguments(p.oid), pg_get_function_result(p.oid), p.prosecdef, p.provolatile,
         coalesce(p.proconfig::text, ''), coalesce(p.proargdefaults::text, ''), coalesce(p.proacl::text, '')
    INTO v_src, v_args, v_result, v_secdef, v_volatile, v_config, v_defaults, v_acl
    FROM pg_proc p WHERE p.oid = 'public.attr_import_plan(jsonb,jsonb,text)'::regprocedure;
  v_new := replace(v_src, chr(13), '');
  IF md5(v_new) IS DISTINCT FROM '7a2cb3062a843c2d16ce1b5be5be90ef' OR v_config <> '{search_path=public}' THEN
    RAISE EXCEPTION 'F1-7b: the live attr_import_plan is not the body this file was built from (%)', md5(v_new);
  END IF;
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    IF (length(v_new) - length(replace(v_new, v_pairs[i][1], ''))) / length(v_pairs[i][1]) <> 1 THEN
      RAISE EXCEPTION 'F1-7b: change % of attr_import_plan does not find its one anchor', i;
    END IF;
    v_new := replace(v_new, v_pairs[i][1], v_pairs[i][2]);
  END LOOP;
  IF md5(v_new) IS DISTINCT FROM 'b8a140b73f535e16bf7997af3b74c994' THEN
    RAISE EXCEPTION 'F1-7b: the new attr_import_plan is not the body this file names (%)', md5(v_new);
  END IF;
  EXECUTE format('CREATE OR REPLACE FUNCTION public.attr_import_plan(%s) RETURNS %s LANGUAGE plpgsql %s SECURITY %s SET search_path = public AS $f17b$%s$f17b$',
    v_args, v_result,
    CASE v_volatile WHEN 's' THEN 'STABLE' WHEN 'i' THEN 'IMMUTABLE' ELSE 'VOLATILE' END,
    CASE WHEN v_secdef THEN 'DEFINER' ELSE 'INVOKER' END,
    v_new);
  IF NOT EXISTS (
    SELECT 1 FROM pg_proc p WHERE p.oid = 'public.attr_import_plan(jsonb,jsonb,text)'::regprocedure
       AND p.prosecdef = v_secdef AND p.provolatile = v_volatile
       AND coalesce(p.proconfig::text, '') = v_config
       AND coalesce(p.proargdefaults::text, '') = v_defaults
       AND coalesce(p.proacl::text, '') = v_acl
       AND pg_get_function_result(p.oid) = v_result
       AND md5(replace(p.prosrc, chr(13), '')) = 'b8a140b73f535e16bf7997af3b74c994') THEN
    RAISE EXCEPTION 'F1-7b: attr_import_plan drifted in its header, grants or body after the redeclaration';
  END IF;
END $f17b_attr_import_plan$;
REVOKE ALL ON FUNCTION public.attr_import_plan(jsonb, jsonb, text) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.attr_import_plan(jsonb, jsonb, text) TO service_role;

-- ------------------------------------------------------------ 3. attr_export_payload
CREATE OR REPLACE FUNCTION public.attr_export_payload(p_scope_slug text)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY INVOKER
SET search_path = public
AS $$
DECLARE
  v_defs  jsonb;
  v_links jsonb;
  v_scope uuid;
  v_keys  text[];
BEGIN
  IF p_scope_slug IS NOT NULL THEN
    SELECT c.id INTO v_scope FROM public.categories c WHERE c.slug = p_scope_slug;
    IF v_scope IS NULL THEN
      PERFORM public.door_refuse('unknownCategory');
    END IF;
  END IF;

  -- INH-1: both walks follow the PRIMARY lineage only.
  WITH RECURSIVE scope AS (
    SELECT v_scope AS id, 0 AS d
    UNION ALL
    SELECT c.id, s.d + 1
      FROM scope s
      JOIN public.categories c ON public.cat_primary_parent(c.id) = s.id
     WHERE s.d < 10
  ),
  anc AS (
    SELECT c.id AS cat_id, c.id AS src_id, 0 AS depth
      FROM public.categories c
    UNION ALL
    SELECT a.cat_id, public.cat_primary_parent(a.src_id), a.depth + 1
      FROM anc a
     WHERE a.depth < 10
       AND public.cat_primary_parent(a.src_id) IS NOT NULL
  ),
  pathq AS (
    SELECT c.id, c.id AS cur, c.name_en::text AS path, 0 AS d
      FROM public.categories c
    UNION ALL
    -- INC-306 / DEC-080 — the home is the one home reader's verdict; the walk
    -- stops where it answers NULL (a root).
    SELECT q.id, pp.parent_id, cp.name_en || ' / ' || q.path, q.d + 1
      FROM pathq q
      JOIN LATERAL (
             SELECT public.cat_primary_parent(q.cur) AS parent_id
           ) pp ON pp.parent_id IS NOT NULL
      JOIN public.categories cp ON cp.id = pp.parent_id
     WHERE q.d < 10
  ),
  best_path AS (
    SELECT DISTINCT ON (id) id, path FROM pathq ORDER BY id, d DESC
  ),
  eff AS (
    SELECT DISTINCT ON (anc.cat_id, l.attribute_id)
           anc.cat_id,
           l.attribute_id,
           l.is_required,
           l.is_filterable,
           l.card_rank,
           l.fact_rank,
           -- M-MAINT-2 Part B — the two per-link cells travel with the link.
           l.allowed_options,
           l.default_value,
           -- M-MAINT-3b — and the D24 condition.
           l.visible_when,
           -- M-ORDER — the link's own display_order travels with it.
           l.display_order,
           src.slug AS origin
      FROM anc
      JOIN public.category_attribute_links l ON l.category_id = anc.src_id
      JOIN public.categories src ON src.id = anc.src_id
     WHERE p_scope_slug IS NULL OR anc.cat_id IN (SELECT s.id FROM scope s)
     ORDER BY anc.cat_id, l.attribute_id, anc.depth ASC, src.slug
  )
  SELECT COALESCE(jsonb_agg(r.row ORDER BY r.path, r.attr_key), '[]'::jsonb)
    INTO v_links
    FROM (
      SELECT bp.path,
             a.attr_key,
             jsonb_build_object(
               'category_path', bp.path,
               'category_slug', c.slug,
               'attribute_key', a.attr_key,
               'is_required', CASE WHEN eff.is_required THEN 'true' ELSE 'false' END,
               'is_filterable', CASE WHEN eff.is_filterable THEN 'true' ELSE 'false' END,
               'card_rank', COALESCE(eff.card_rank::text, ''),
               'origin', COALESCE(eff.origin, ''),
               -- the two new cells, AFTER the existing ones (round-trip shape)
               'allowed_options', COALESCE(array_to_string(eff.allowed_options, '|'), ''),
               'default_value', COALESCE(
                 CASE WHEN eff.default_value IS NULL THEN NULL
                      WHEN jsonb_typeof(eff.default_value) = 'array'
                        THEN (SELECT string_agg(t.v, '|')
                                FROM jsonb_array_elements_text(eff.default_value) AS t(v))
                      ELSE eff.default_value #>> '{}' END,
                 ''),
               -- M-MAINT-3b — the condition, AFTER default_value, as
               -- '<sibling key>=<value>|<value>…'. NULL → '' (a blank cell
               -- changes nothing on re-import, so the export round-trips).
               'visible_when', COALESCE(
                 CASE WHEN eff.visible_when IS NULL
                        OR jsonb_typeof(eff.visible_when) = 'null' THEN NULL
                      ELSE (eff.visible_when->>'key') || '='
                           || (SELECT string_agg(t.v, '|')
                                 FROM jsonb_array_elements_text(eff.visible_when->'in') AS t(v))
                           -- M6 / INC-381 — the second pair as '&<key>=<value>|…'.
                           || CASE WHEN jsonb_typeof(eff.visible_when->'and') = 'object'
                                   THEN '&' || (eff.visible_when->'and'->>'key') || '='
                                        || (SELECT string_agg(t.v, '|')
                                              FROM jsonb_array_elements_text(eff.visible_when->'and'->'in') AS t(v))
                                   ELSE '' END
                 END,
                 ''),
               -- M-ORDER — display_order, AFTER visible_when, plain text.
               'display_order', COALESCE(eff.display_order::text, ''),
               -- B19 M2 (D201 §4) — the key-facts rank 1–4, LAST, plain text; NULL → ''.
               'fact_rank', COALESCE(eff.fact_rank::text, '')
             ) AS row
        FROM eff
        JOIN public.categories c ON c.id = eff.cat_id
        JOIN public.attributes a ON a.id = eff.attribute_id
        JOIN best_path bp ON bp.id = eff.cat_id
    ) r;

  SELECT array_agg(DISTINCT x->>'attribute_key')
    INTO v_keys
    FROM jsonb_array_elements(v_links) x;

  SELECT COALESCE(jsonb_agg(d.row ORDER BY d.attr_key), '[]'::jsonb)
    INTO v_defs
    FROM (
      SELECT a.attr_key,
             jsonb_build_object(
               'attribute_key', a.attr_key,
               'label_en', COALESCE(a.name_en, ''),
               'label_am', COALESCE(t.value, a.name_am, ''),
               'type', COALESCE(a.attr_type, ''),
               'options', COALESCE(
                 (SELECT string_agg(o.x, '|' ORDER BY o.ord)
                    FROM jsonb_array_elements_text(
                           CASE WHEN jsonb_typeof(a.options) = 'array'
                                THEN a.options ELSE '[]'::jsonb END
                         ) WITH ORDINALITY AS o(x, ord)),
                 ''),
               'depends_on', COALESCE(
                 (SELECT p.attr_key FROM public.attributes p WHERE p.id = a.depends_on), ''),
               -- DEC-050 L2b-mig — the nine v2 cells, plain text, NULL → ''.
               'unit', COALESCE(a.unit, ''),
               -- M8c / C5 — the Amharic unit, after unit.
               'unit_am', COALESCE(a.unit_am, ''),
               'min', COALESCE(a.min_bound, ''),
               'max', COALESCE(a.max_bound, ''),
               'decimals', COALESCE(a.decimals::text, ''),
               'format', COALESCE(a.format, ''),
               'preset', COALESCE(a.preset, ''),
               'max_length', COALESCE(a.max_length::text, ''),
               'help_text_en', COALESCE(a.help_text_en, ''),
               'help_text_am', COALESCE(a.help_text_am, ''),
               'is_per_variant', '',
               'direct_link_count',
                 (SELECT count(*)::text FROM public.category_attribute_links l
                   WHERE l.attribute_id = a.id)
             ) AS row
        FROM public.attributes a
        LEFT JOIN public.entity_translations t
               ON t.entity_type = 'attribute'
              AND t.entity_id = a.id
              AND t.field = 'label'
              AND t.lang_code = 'am'
              AND t.status = 'approved'
       WHERE p_scope_slug IS NULL
          OR a.attr_key = ANY(COALESCE(v_keys, ARRAY[]::text[]))
    ) d;

  RETURN jsonb_build_object('definitions', v_defs, 'links', v_links);
END $$;
REVOKE ALL ON FUNCTION public.attr_export_payload(text) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.attr_export_payload(text) TO service_role;

-- PROOFS (under a sentinel rollback; scratch users, roles and sessions only):
-- (a) each body this file's (md5), header and grants as live: service role only.
-- (b) each function called with a scope no category holds: P0D01 unknownCategory (the sentence is gone); with no
--     scope each answers its document.
-- (c) through the doors, as a scratch holder of categories:import and categories:view with a fresh second factor:
--     both previews and admin_export_attributes raise unknownCategory; both commits answer {ok:false} with it at 400,
--     nothing written.
DO $proof$
DECLARE
  v_hex    text := replace(gen_random_uuid()::text, '-', '');
  v_tag    text;
  v_staff  uuid := gen_random_uuid();
  v_sess   uuid := gen_random_uuid();
  v_role   uuid;
  v_doc    jsonb;
  v_answer jsonb;
  v_msg    text;
  v_cases  text[][];
  i        integer;
BEGIN
  v_tag := 'e2e-mig-f17b3-' || substr(v_hex, 1, 10);
  -- (a)
  v_cases := ARRAY[
    ['public.cat_import_plan(jsonb,text)', 'e3d3f9e586a9b2a809a1ee3aa2c1cd47', 'v', 'true'],
    ['public.attr_import_plan(jsonb,jsonb,text)', 'b8a140b73f535e16bf7997af3b74c994', 's', 'true'],
    ['public.attr_export_payload(text)', 'd77732ed7c37a4363b0a969577b74d38', 's', 'false']];
  FOR i IN 1..array_length(v_cases, 1) LOOP
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) IS DISTINCT FROM v_cases[i][2] OR p.provolatile::text <> v_cases[i][3]
               OR p.prosecdef <> v_cases[i][4]::boolean OR p.proconfig::text <> '{search_path=public}'
          FROM pg_proc p WHERE p.oid = v_cases[i][1]::regprocedure)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_cases[i][1]::regprocedure)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_cases[i][1]::regprocedure, 'EXECUTE')
       OR has_function_privilege('authenticated', v_cases[i][1]::regprocedure, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_cases[i][1]::regprocedure, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-7b part 3 proof (a): %''s body, header or grants differ', v_cases[i][1];
    END IF;
  END LOOP;

  BEGIN
    PERFORM set_config('request.jwt.claims', '{}', true);
    IF EXISTS (SELECT 1 FROM public.categories WHERE slug LIKE 'e2e-mig-%' AND slug = v_tag) THEN
      RAISE EXCEPTION 'F1-7b part 3 proof: the scratch scope names a category';
    END IF;
    -- (b)
    v_cases := ARRAY[
      ['cat_import_plan', format('SELECT public.cat_import_plan(''[]''::jsonb, %L)', v_tag)],
      ['attr_import_plan', format('SELECT public.attr_import_plan(''[]''::jsonb, ''[]''::jsonb, %L)', v_tag)],
      ['attr_export_payload', format('SELECT public.attr_export_payload(%L)', v_tag)]];
    FOR i IN 1..array_length(v_cases, 1) LOOP
      BEGIN
        EXECUTE v_cases[i][2];
        RAISE EXCEPTION 'F1-7b part 3 proof: (b) % answered an unknown scope without a refusal', v_cases[i][1];
      EXCEPTION WHEN SQLSTATE 'P0D01' THEN
        GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
        IF v_msg IS DISTINCT FROM 'unknownCategory' THEN
          RAISE EXCEPTION 'F1-7b part 3 proof: (b) % answered % (expected unknownCategory)', v_cases[i][1], v_msg;
        END IF;
      END;
    END LOOP;
    v_doc := public.cat_import_plan('[]'::jsonb, NULL);
    IF v_doc IS NULL OR NOT (v_doc ? 'counts') THEN
      RAISE EXCEPTION 'F1-7b part 3 proof: (b) cat_import_plan with no scope answered %', v_doc;
    END IF;
    v_doc := public.attr_import_plan('[]'::jsonb, '[]'::jsonb, NULL);
    IF v_doc IS NULL OR jsonb_typeof(v_doc) <> 'object' THEN
      RAISE EXCEPTION 'F1-7b part 3 proof: (b) attr_import_plan with no scope answered %', v_doc;
    END IF;
    v_doc := public.attr_export_payload(NULL);
    IF v_doc IS NULL OR jsonb_typeof(v_doc) <> 'object' THEN
      RAISE EXCEPTION 'F1-7b part 3 proof: (b) attr_export_payload with no scope answered nothing';
    END IF;

    -- (c)
    INSERT INTO auth.users (id, email, encrypted_password, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
      (v_staff, v_tag || '-staff@example.invalid', NULL, '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO auth.mfa_factors (id, user_id, friendly_name, factor_type, status, created_at, updated_at)
    VALUES (gen_random_uuid(), v_staff, v_tag || '-f', 'totp', 'verified', now(), now());
    INSERT INTO auth.sessions (id, user_id, created_at, updated_at, aal) VALUES (v_sess, v_staff, now(), now(), 'aal2');
    INSERT INTO auth.mfa_amr_claims (id, session_id, created_at, updated_at, authentication_method)
    VALUES (gen_random_uuid(), v_sess, now(), now(), 'totp');
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-categories', v_tag) RETURNING id INTO v_role;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'categories' AND p.action IN ('view', 'import');
    IF (SELECT count(*) FROM public.role_permissions WHERE role_id = v_role) <> 2 THEN
      RAISE EXCEPTION 'F1-7b part 3 proof: a categories permission of the scratch role is not declared';
    END IF;
    INSERT INTO public.user_roles (user_id, role_id, scope_type) VALUES (v_staff, v_role, 'global');
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_staff::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);
    v_cases := ARRAY[
      ['admin_preview_category_import', format('SELECT public.admin_preview_category_import(''[]''::jsonb, %L)', v_tag)],
      ['admin_preview_attribute_import', format('SELECT public.admin_preview_attribute_import(''[]''::jsonb, ''[]''::jsonb, %L)', v_tag)],
      ['admin_export_attributes', format('SELECT public.admin_export_attributes(%L)', v_tag)]];
    FOR i IN 1..array_length(v_cases, 1) LOOP
      BEGIN
        EXECUTE v_cases[i][2];
        RAISE EXCEPTION 'F1-7b part 3 proof: (c) % answered an unknown scope without a refusal', v_cases[i][1];
      EXCEPTION WHEN SQLSTATE 'P0D01' THEN
        GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
        IF v_msg IS DISTINCT FROM 'unknownCategory' THEN
          RAISE EXCEPTION 'F1-7b part 3 proof: (c) % answered % (expected unknownCategory)', v_cases[i][1], v_msg;
        END IF;
      END;
    END LOOP;
    v_answer := public.admin_commit_category_import('[]'::jsonb, v_tag, v_tag);
    IF (v_answer ->> 'ok') IS DISTINCT FROM 'false' OR v_answer ->> 'message' IS DISTINCT FROM 'unknownCategory'
       OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-7b part 3 proof: (c) the category commit answered %', v_answer;
    END IF;
    v_answer := public.admin_commit_attribute_import('[]'::jsonb, '[]'::jsonb, v_tag, v_tag);
    IF (v_answer ->> 'ok') IS DISTINCT FROM 'false' OR v_answer ->> 'message' IS DISTINCT FROM 'unknownCategory'
       OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-7b part 3 proof: (c) the attribute commit answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    IF EXISTS (SELECT 1 FROM public.audit_log WHERE actor_id = v_staff) THEN
      RAISE EXCEPTION 'F1-7b part 3 proof: (c) a refused commit wrote an audit line';
    END IF;

    RAISE EXCEPTION 'f17b3-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f17b3-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261120050200') ON CONFLICT DO NOTHING;
