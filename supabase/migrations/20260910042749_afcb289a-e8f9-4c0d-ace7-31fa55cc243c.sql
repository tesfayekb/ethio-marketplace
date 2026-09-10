-- UX-2 PART 6 / IE-8 — THE RENAME DETECTOR (attributes).
--
-- LAW: an attribute key is an IDENTITY. A file that introduces a NEW key whose
-- label_en + type + options equal an existing definition the file no longer
-- carries is not creating an attribute — it is renaming a key, which would
-- orphan every export, link and code reference. Such a row is REFUSED with the
-- old key named, exactly as the categories planner already refuses slugRename.
--
-- SURGICAL, GUARDED REWRITE, in the IE-5 pattern: the planner's 500-line body
-- is untouched apart from one declaration and the add verdict. Idempotent: a
-- body already carrying the rule is left alone. No new function is declared, so
-- there is no new ACL surface; attr_import_plan's own closers are restated
-- below and read back (A8).

DO $ie8$
DECLARE
  v_src      text;
  v_decl_old text := E'  -- IE-6 — is this links row a DIRECT row, or an inherited echo?\n  v_direct     boolean;\nBEGIN';
  v_decl_new text := E'  -- IE-6 — is this links row a DIRECT row, or an inherited echo?\n  v_direct     boolean;\n  -- IE-8 — the existing key a brand-new key would silently rename.\n  v_rename     text;\nBEGIN';
  v_add_old  text := E'    IF v_att.id IS NULL THEN\n      v_change := ''add'';';
  v_add_new  text := E'    IF v_att.id IS NULL THEN\n      -- IE-8 — RENAME DETECTOR. A new key whose label_en + type + options match\n      -- a definition ABSENT from this file is a renamed identity, not an add.\n      SELECT a.attr_key INTO v_rename\n        FROM public.attributes a\n       WHERE a.attr_key <> v_key\n         AND NOT (a.attr_key = ANY (v_seen_defs))\n         AND btrim(COALESCE(a.name_en, '''')) = COALESCE(v_entry->>''name_en'', '''')\n         AND a.attr_type = COALESCE(v_entry->>''attr_type'', '''')\n         AND public.attr_option_norm(a.options) IS NOT DISTINCT FROM public.attr_option_norm(v_options)\n       ORDER BY a.attr_key\n       LIMIT 1;\n      IF v_rename IS NOT NULL THEN\n        v_refusals := v_refusals || jsonb_build_object(\n          ''file'',''definitions'',''row'',v_row,''key'',v_key,\n          ''reason'',''keyRename'',''detail'',v_rename);\n        CONTINUE;\n      END IF;\n      v_change := ''add'';';
BEGIN
  SELECT pg_get_functiondef(p.oid) INTO v_src
    FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
   WHERE n.nspname = 'public' AND p.proname = 'attr_import_plan';
  IF v_src IS NULL THEN
    RAISE EXCEPTION 'IE-8: public.attr_import_plan not found';
  END IF;

  IF position('keyRename' IN v_src) > 0 THEN
    RAISE NOTICE 'IE-8: attr_import_plan already carries the rename detector';
  ELSE
    IF position(v_decl_old IN v_src) = 0 THEN
      RAISE EXCEPTION 'IE-8: the planner declaration block did not match';
    END IF;
    IF position(v_add_old IN v_src) = 0 THEN
      RAISE EXCEPTION 'IE-8: the planner add verdict did not match';
    END IF;
    v_src := replace(v_src, v_decl_old, v_decl_new);
    v_src := replace(v_src, v_add_old, v_add_new);
    EXECUTE v_src;

    SELECT pg_get_functiondef(p.oid) INTO v_src
      FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
     WHERE n.nspname = 'public' AND p.proname = 'attr_import_plan';
    IF position('keyRename' IN v_src) = 0 OR position('v_rename' IN v_src) = 0 THEN
      RAISE EXCEPTION 'IE-8: the planner rewrite did not stick';
    END IF;
    RAISE NOTICE 'IE-8: attr_import_plan refuses a renamed key';
  END IF;
END $ie8$;

-- A8 — closers restated in-file for the re-declared SECURITY DEFINER function.
REVOKE ALL ON FUNCTION public.attr_import_plan(jsonb, jsonb, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.attr_import_plan(jsonb, jsonb, text) TO authenticated;
GRANT ALL ON FUNCTION public.attr_import_plan(jsonb, jsonb, text) TO service_role;

DO $proof$
DECLARE v_acl text;
BEGIN
  SELECT array_to_string(proacl, ',') INTO v_acl FROM pg_proc WHERE proname = 'attr_import_plan';
  RAISE NOTICE 'ACL attr_import_plan: %', v_acl;
  IF v_acl LIKE '%anon=X%' THEN
    RAISE EXCEPTION 'IE-8: anon must hold no EXECUTE on attr_import_plan';
  END IF;
  IF v_acl NOT LIKE '%authenticated=X%' THEN
    RAISE EXCEPTION 'IE-8: authenticated must hold EXECUTE on attr_import_plan';
  END IF;
END $proof$;

-- Ledger (DEC-022): declared mark, monotonic and >= this file's stamp.
INSERT INTO public.migration_marks(version) VALUES ('20260910050000') ON CONFLICT DO NOTHING;