-- C3-UX-2b PART A — DEFINER CLOSERS for the five functions redeclared in
-- 20260907050122_84bead12-f50a-4e83-b3e5-e7bc34a0ec21.sql (INC-074 / DEC-022-B).
-- CREATE OR REPLACE preserves live ACLs, but the file must be self-describing.
-- This corrective restates the grant law and READS BACK every ACL in-file.

REVOKE ALL ON FUNCTION public.entity_source_value(text, uuid, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.entity_source_value(text, uuid, text) TO authenticated;
GRANT ALL ON FUNCTION public.entity_source_value(text, uuid, text) TO service_role;

REVOKE ALL ON FUNCTION public.admin_list_entity_translations(text, text, text, integer, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_list_entity_translations(text, text, text, integer, integer) TO authenticated;
GRANT ALL ON FUNCTION public.admin_list_entity_translations(text, text, text, integer, integer) TO service_role;

REVOKE ALL ON FUNCTION public.admin_entity_translation_stats(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_entity_translation_stats(text) TO authenticated;
GRANT ALL ON FUNCTION public.admin_entity_translation_stats(text) TO service_role;

REVOKE ALL ON FUNCTION public.admin_save_entity_translation(text, uuid, text, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_save_entity_translation(text, uuid, text, text, text) TO authenticated;
GRANT ALL ON FUNCTION public.admin_save_entity_translation(text, uuid, text, text, text) TO service_role;

REVOKE ALL ON FUNCTION public.admin_machine_entity_translation(text, uuid, text, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_machine_entity_translation(text, uuid, text, text, text) TO authenticated;
GRANT ALL ON FUNCTION public.admin_machine_entity_translation(text, uuid, text, text, text) TO service_role;

-- ---------------------------------------------------------------------------
-- READ-BACK (law F4: a silent grant is not a proof).
-- ---------------------------------------------------------------------------
DO $$
DECLARE
  v_sig text;
  v_sigs text[] := ARRAY[
    'public.entity_source_value(text, uuid, text)',
    'public.admin_list_entity_translations(text, text, text, integer, integer)',
    'public.admin_entity_translation_stats(text)',
    'public.admin_save_entity_translation(text, uuid, text, text, text)',
    'public.admin_machine_entity_translation(text, uuid, text, text, text)'
  ];
BEGIN
  FOREACH v_sig IN ARRAY v_sigs LOOP
    IF has_function_privilege('anon', v_sig, 'EXECUTE') THEN
      RAISE EXCEPTION 'CLOSER FAILED: anon can execute %', v_sig;
    END IF;
    IF NOT has_function_privilege('authenticated', v_sig, 'EXECUTE') THEN
      RAISE EXCEPTION 'CLOSER FAILED: authenticated cannot execute %', v_sig;
    END IF;
    IF NOT has_function_privilege('service_role', v_sig, 'EXECUTE') THEN
      RAISE EXCEPTION 'CLOSER FAILED: service_role cannot execute %', v_sig;
    END IF;
    RAISE NOTICE 'ACL OK: % (anon=no, authenticated=yes, service_role=yes)', v_sig;
  END LOOP;
END $$;

INSERT INTO public.migration_marks(version) VALUES ('20260907060100') ON CONFLICT DO NOTHING;