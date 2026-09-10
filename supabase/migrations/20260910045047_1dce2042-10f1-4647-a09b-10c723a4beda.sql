-- UX-2 PART 6 / IE-8b — WHITESPACE-TOLERANT RENAME DETECTOR (corrective).
--
-- 20260910042749 anchored the planner rewrite on two EXACT text blocks. The
-- declaration anchor did not match on ethio-staging ("the planner declaration
-- block did not match"), so the rule landed on prod only. Append-only law:
-- that file stands; THIS file supersedes it.
--
-- Two changes make it portable:
--   1. ONE anchor instead of two — the rename check lives in a NESTED
--      DECLARE/BEGIN/END block, so no top-level declaration is injected.
--   2. The anchor is a REGEX tolerant of whitespace/indentation drift.
-- Idempotent: a body already carrying 'keyRename' is left untouched (so on
-- prod this file is a no-op beyond restating the closers).

DO $ie8b$
DECLARE
  v_src   text;
  v_new   text;
  v_pat   text := '(IF\s+v_att\.id\s+IS\s+NULL\s+THEN\s*\r?\n[ \t]*)v_change\s*:=\s*''add'';';
  v_rep   text := $repl$\1-- IE-8 — RENAME DETECTOR. A new key whose label_en + type + options match
      -- a definition ABSENT from this file is a renamed identity, not an add.
      DECLARE
        v_rename text;
      BEGIN
        SELECT a.attr_key INTO v_rename
          FROM public.attributes a
         WHERE a.attr_key <> v_key
           AND NOT (a.attr_key = ANY (v_seen_defs))
           AND btrim(COALESCE(a.name_en, '')) = COALESCE(v_entry->>'name_en', '')
           AND a.attr_type = COALESCE(v_entry->>'attr_type', '')
           AND public.attr_option_norm(a.options) IS NOT DISTINCT FROM public.attr_option_norm(v_options)
         ORDER BY a.attr_key
         LIMIT 1;
        IF v_rename IS NOT NULL THEN
          v_refusals := v_refusals || jsonb_build_object(
            'file','definitions','row',v_row,'key',v_key,
            'reason','keyRename','detail',v_rename);
          CONTINUE;
        END IF;
      END;
      v_change := 'add';$repl$;
BEGIN
  SELECT pg_get_functiondef(p.oid) INTO v_src
    FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
   WHERE n.nspname = 'public' AND p.proname = 'attr_import_plan';
  IF v_src IS NULL THEN
    RAISE EXCEPTION 'IE-8b: public.attr_import_plan not found';
  END IF;

  IF position('keyRename' IN v_src) > 0 THEN
    RAISE NOTICE 'IE-8b: attr_import_plan already refuses a renamed key — nothing to do';
  ELSE
    IF to_regprocedure('public.attr_option_norm(jsonb)') IS NULL THEN
      RAISE EXCEPTION 'IE-8b: public.attr_option_norm(jsonb) is missing — this database is behind';
    END IF;
    IF v_src !~ v_pat THEN
      RAISE EXCEPTION 'IE-8b: the planner add verdict did not match; body around v_change: %',
        substring(v_src from GREATEST(position('v_change := ''add''' IN v_src) - 200, 1) for 400);
    END IF;

    v_new := regexp_replace(v_src, v_pat, v_rep);
    IF v_new = v_src THEN
      RAISE EXCEPTION 'IE-8b: the rewrite produced no change';
    END IF;
    EXECUTE v_new;

    SELECT pg_get_functiondef(p.oid) INTO v_src
      FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
     WHERE n.nspname = 'public' AND p.proname = 'attr_import_plan';
    IF position('keyRename' IN v_src) = 0 OR position('v_rename' IN v_src) = 0 THEN
      RAISE EXCEPTION 'IE-8b: the planner rewrite did not stick';
    END IF;
    RAISE NOTICE 'IE-8b: attr_import_plan refuses a renamed key';
  END IF;
END $ie8b$;

-- A8 — closers restated in-file for the (re-)declared SECURITY DEFINER function.
REVOKE ALL ON FUNCTION public.attr_import_plan(jsonb, jsonb, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.attr_import_plan(jsonb, jsonb, text) TO authenticated;
GRANT ALL ON FUNCTION public.attr_import_plan(jsonb, jsonb, text) TO service_role;

DO $proof$
DECLARE v_acl text;
BEGIN
  SELECT array_to_string(proacl, ',') INTO v_acl FROM pg_proc WHERE proname = 'attr_import_plan';
  RAISE NOTICE 'ACL attr_import_plan: %', v_acl;
  IF v_acl LIKE '%anon=X%' THEN
    RAISE EXCEPTION 'IE-8b: anon must hold no EXECUTE on attr_import_plan';
  END IF;
  IF v_acl NOT LIKE '%authenticated=X%' THEN
    RAISE EXCEPTION 'IE-8b: authenticated must hold EXECUTE on attr_import_plan';
  END IF;
END $proof$;

-- Ledger (DEC-022): declared mark, monotonic and >= this file's stamp.
INSERT INTO public.migration_marks(version) VALUES ('20260910060000') ON CONFLICT DO NOTHING;
INSERT INTO public.migration_marks(version) VALUES ('20260910050000') ON CONFLICT DO NOTHING;