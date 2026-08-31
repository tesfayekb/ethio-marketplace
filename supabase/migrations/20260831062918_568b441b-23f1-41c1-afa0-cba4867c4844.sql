-- U4g-2 (INC-099): the wrapper/_impl split re-declared functions; this migration
-- censuses every overload, drops stale ones, restates authenticated EXECUTE on
-- every public-facing translation wrapper, and ends with a TOTALITY proof.
-- Declared mark: 20260831080000

-- ---------------------------------------------------------------------------
-- (1) CENSUS — every function touched by c719360f, all overloads, with the
--     authenticated EXECUTE verdict per signature.
-- ---------------------------------------------------------------------------
DO $census$
DECLARE
  r record;
BEGIN
  FOR r IN
    SELECT p.proname,
           pg_get_function_identity_arguments(p.oid) AS sig,
           has_function_privilege('authenticated', p.oid, 'EXECUTE') AS auth_exec,
           has_function_privilege('anon', p.oid, 'EXECUTE') AS anon_exec
      FROM pg_proc p
      JOIN pg_namespace n ON n.oid = p.pronamespace
     WHERE n.nspname = 'public'
       AND p.proname IN (
         'admin_approve_all_translations', 'approve_all_translations_impl',
         'admin_set_language_order', 'set_language_order_impl',
         'admin_sync_ui_keys', 'ui_sync_mark_orphans',
         'get_ui_bundle', 'admin_translation_stats',
         'admin_set_language_flags', 'admin_list_translations'
       )
     ORDER BY p.proname, sig
  LOOP
    RAISE NOTICE 'CENSUS: public.%(%) authenticated=% anon=%',
      r.proname, r.sig, r.auth_exec, r.anon_exec;
  END LOOP;
END $census$;

-- ---------------------------------------------------------------------------
--     Drop any stale overload that predates the split: for each name the app
--     calls, exactly ONE non-_impl signature may survive (the canonical one).
-- ---------------------------------------------------------------------------
DO $stale$
DECLARE
  canon text[][] := ARRAY[
    ARRAY['admin_approve_all_translations', 'p_lang text'],
    ARRAY['admin_set_language_order', 'p_codes text[]'],
    ARRAY['admin_sync_ui_keys', 'p_en jsonb, p_am jsonb'],
    ARRAY['get_ui_bundle', 'p_lang text'],
    ARRAY['admin_translation_stats', 'p_lang text'],
    ARRAY['admin_set_language_flags', 'p_code text, p_enabled_admin boolean, p_enabled_public boolean'],
    ARRAY['admin_list_translations', 'p_lang text, p_status text, p_flagged boolean, p_search text, p_limit integer, p_offset integer, p_orphaned boolean']
  ];
  i int;
  fname text;
  fsig text;
  r record;
BEGIN
  FOR i IN 1 .. array_length(canon, 1) LOOP
    fname := canon[i][1];
    fsig := canon[i][2];
    FOR r IN
      SELECT pg_get_function_identity_arguments(p.oid) AS sig
        FROM pg_proc p
        JOIN pg_namespace n ON n.oid = p.pronamespace
       WHERE n.nspname = 'public' AND p.proname = fname
    LOOP
      IF r.sig IS DISTINCT FROM fsig THEN
        RAISE NOTICE 'STALE OVERLOAD DROPPED: public.%(%)', fname, r.sig;
        EXECUTE format('DROP FUNCTION public.%I(%s)', fname, r.sig);
      END IF;
    END LOOP;
  END LOOP;
END $stale$;

-- ---------------------------------------------------------------------------
-- (2) GRANTS — public-facing wrappers get authenticated EXECUTE restated;
--     *_impl stays revoked from every client role.
-- ---------------------------------------------------------------------------
REVOKE ALL ON FUNCTION public.admin_translation_stats(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_translation_stats(text) TO authenticated;

REVOKE ALL ON FUNCTION public.admin_list_translations(text, text, boolean, text, int, int, boolean) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_list_translations(text, text, boolean, text, int, int, boolean) TO authenticated;

REVOKE ALL ON FUNCTION public.admin_approve_all_translations(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_approve_all_translations(text) TO authenticated;

REVOKE ALL ON FUNCTION public.admin_set_language_order(text[]) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_set_language_order(text[]) TO authenticated;

REVOKE ALL ON FUNCTION public.admin_sync_ui_keys(jsonb, jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_sync_ui_keys(jsonb, jsonb) TO authenticated;

REVOKE ALL ON FUNCTION public.admin_set_language_flags(text, boolean, boolean) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_set_language_flags(text, boolean, boolean) TO authenticated;

REVOKE ALL ON FUNCTION public.get_ui_bundle(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_ui_bundle(text) TO anon, authenticated;

REVOKE ALL ON FUNCTION public.approve_all_translations_impl(text) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.set_language_order_impl(text[]) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.ui_sync_mark_orphans(jsonb) FROM PUBLIC, anon, authenticated;

-- ---------------------------------------------------------------------------
-- (3) TOTALITY PROOF (E6 applied to grants) — zero public-facing translation
--     wrappers may lack authenticated EXECUTE, each name has exactly one
--     non-_impl overload, and no *_impl is reachable by a client role.
-- ---------------------------------------------------------------------------
DO $proof$
DECLARE
  names text[] := ARRAY[
    'admin_approve_all_translations', 'admin_set_language_order',
    'admin_sync_ui_keys', 'get_ui_bundle', 'admin_translation_stats',
    'admin_set_language_flags', 'admin_list_translations',
    'admin_list_languages', 'admin_list_translation_revisions',
    'admin_save_translation', 'admin_set_translation_status',
    'admin_machine_translation', 'admin_set_translator_languages',
    'admin_upsert_language', 'get_my_translator_languages',
    'admin_list_entity_translations', 'admin_save_entity_translation',
    'admin_set_entity_translation_status', 'get_entity_bundle',
    'user_has_translation_permission', 'admin_get_translator_scope'
  ];
  missing int;
  dupes int;
  leaked int;
BEGIN
  SELECT count(*) INTO missing
    FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
   WHERE n.nspname = 'public' AND p.proname = ANY(names)
     AND NOT has_function_privilege('authenticated', p.oid, 'EXECUTE');
  IF missing > 0 THEN
    RAISE EXCEPTION 'P1 FAIL: % translation wrapper signature(s) lack authenticated EXECUTE', missing;
  END IF;

  SELECT count(*) INTO dupes FROM (
    SELECT p.proname
      FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
     WHERE n.nspname = 'public' AND p.proname = ANY(names)
     GROUP BY p.proname HAVING count(*) > 1
  ) d;
  IF dupes > 0 THEN
    RAISE EXCEPTION 'P2 FAIL: % translation wrapper name(s) still carry multiple overloads', dupes;
  END IF;

  SELECT count(*) INTO leaked
    FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
   WHERE n.nspname = 'public' AND p.proname LIKE '%\_impl'
     AND (has_function_privilege('authenticated', p.oid, 'EXECUTE')
       OR has_function_privilege('anon', p.oid, 'EXECUTE'));
  IF leaked > 0 THEN
    RAISE EXCEPTION 'P3 FAIL: % _impl function(s) reachable by a client role', leaked;
  END IF;

  RAISE NOTICE 'PROOF OK: every translation wrapper is authenticated-executable, single-overload, and no _impl is client-reachable.';
END $proof$;

INSERT INTO public.migration_marks(version) VALUES ('20260831080000') ON CONFLICT DO NOTHING;