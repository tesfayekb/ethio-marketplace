-- U4e — TRANSLATION HISTORY READ. One gated SECURITY DEFINER read over the
-- append-only public.ui_translation_revisions table (U4c, 20260830045700),
-- which is deny-all to client roles by design.
--
-- NO NEW WRITER: restore in the console REUSES admin_save_translation, so a
-- restore IS a save and captures its own revision. Nothing here mutates.
--
-- Definer law (INC-074): REVOKE/GRANT restated in-file.
-- Declared-mark law (DEC-022 / INC-094): the mark below IS the ledger entry.

CREATE OR REPLACE FUNCTION public.admin_list_translation_revisions(
  p_key text,
  p_lang text,
  p_limit int DEFAULT 20
)
RETURNS TABLE(
  id uuid,
  action text,
  prev_value text,
  prev_status text,
  prev_machine boolean,
  changed_by uuid,
  changed_by_name text,
  changed_at timestamptz
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.has_permission(auth.uid(), 'translations', 'view') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;

  RETURN QUERY
  SELECT r.id,
         r.action,
         r.prev_value,
         r.prev_status,
         r.prev_machine,
         r.changed_by,
         COALESCE(pr.display_name, u.email)::text AS changed_by_name,
         r.changed_at
  FROM public.ui_translation_revisions r
  LEFT JOIN public.profiles pr ON pr.user_id = r.changed_by
  LEFT JOIN auth.users u ON u.id = r.changed_by
  WHERE r.key = p_key
    AND r.lang_code = p_lang
  ORDER BY r.changed_at DESC, r.id DESC
  LIMIT LEAST(GREATEST(COALESCE(p_limit, 20), 1), 200);
END;
$$;

REVOKE ALL ON FUNCTION public.admin_list_translation_revisions(text, text, int) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.admin_list_translation_revisions(text, text, int) FROM anon;
GRANT EXECUTE ON FUNCTION public.admin_list_translation_revisions(text, text, int) TO authenticated;

-- ---------------------------------------------------------------------------
-- PROOFS
-- ---------------------------------------------------------------------------
DO $proof$
DECLARE
  v_msg text;
  v_key text := 'u4e.proof.' || gen_random_uuid()::text;
  v_lang text := 'am';
  v_rows int;
  v_first text;
  v_second text;
  v_acl text;
BEGIN
  -- P1: a caller without translations:view is refused (auth.uid() is NULL here).
  BEGIN
    PERFORM * FROM public.admin_list_translation_revisions(v_key, v_lang, 20);
    RAISE EXCEPTION 'PROOF P1 FAILED: permissionless caller was not refused';
  EXCEPTION
    WHEN OTHERS THEN
      GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
      IF v_msg <> 'permission denied' THEN
        RAISE EXCEPTION 'PROOF P1 FAILED: unexpected message %', v_msg;
      END IF;
      RAISE NOTICE 'PROOF P1 OK: %', v_msg;
  END;

  -- P2: ordering + shape on a scratch key's known pair. The gate is proved by
  -- P1, so the body's query is evaluated directly here (same predicate, same
  -- ORDER BY, same LIMIT clamp).
  INSERT INTO public.ui_translation_revisions
    (key, lang_code, prev_value, prev_status, prev_machine, action, changed_by, changed_at)
  VALUES
    (v_key, v_lang, NULL, 'untranslated', false, 'machine', NULL, now() - interval '2 minutes'),
    (v_key, v_lang, '⟪am⟫ machine text', 'machine', true, 'save', NULL, now() - interval '1 minute');

  SELECT count(*) INTO v_rows
  FROM public.ui_translation_revisions r
  WHERE r.key = v_key AND r.lang_code = v_lang;
  IF v_rows <> 2 THEN
    RAISE EXCEPTION 'PROOF P2 FAILED: expected 2 scratch revisions, got %', v_rows;
  END IF;

  SELECT s.action INTO v_first FROM (
    SELECT r.action, r.changed_at, r.id
    FROM public.ui_translation_revisions r
    WHERE r.key = v_key AND r.lang_code = v_lang
    ORDER BY r.changed_at DESC, r.id DESC
    LIMIT LEAST(GREATEST(20, 1), 200)
  ) s LIMIT 1;

  SELECT s.action INTO v_second FROM (
    SELECT r.action, r.changed_at, r.id
    FROM public.ui_translation_revisions r
    WHERE r.key = v_key AND r.lang_code = v_lang
    ORDER BY r.changed_at DESC, r.id DESC
    OFFSET 1 LIMIT 1
  ) s;

  IF v_first <> 'save' OR v_second <> 'machine' THEN
    RAISE EXCEPTION 'PROOF P2 FAILED: newest-first order wrong (% then %)', v_first, v_second;
  END IF;

  -- Shape: the newest row carries the value the save overwrote.
  PERFORM 1
  FROM public.ui_translation_revisions r
  WHERE r.key = v_key AND r.lang_code = v_lang AND r.action = 'save'
    AND r.prev_value = '⟪am⟫ machine text'
    AND r.prev_status = 'machine'
    AND r.prev_machine = true;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'PROOF P2 FAILED: prev_value/status/machine shape not as recorded';
  END IF;
  RAISE NOTICE 'PROOF P2 OK: newest-first (save, machine) with recorded prior shape';

  DELETE FROM public.ui_translation_revisions WHERE key = v_key;

  -- P3 (grant read-back): authenticated may execute, anon and PUBLIC may not.
  SELECT COALESCE(array_to_string(p.proacl, ' '), '(default)') INTO v_acl
  FROM pg_proc p
  JOIN pg_namespace n ON n.oid = p.pronamespace
  WHERE n.nspname = 'public' AND p.proname = 'admin_list_translation_revisions';
  RAISE NOTICE 'PROOF P3 ACL: %', v_acl;

  IF NOT has_function_privilege('authenticated',
      'public.admin_list_translation_revisions(text, text, int)', 'EXECUTE') THEN
    RAISE EXCEPTION 'PROOF P3 FAILED: authenticated cannot execute';
  END IF;
  IF has_function_privilege('anon',
      'public.admin_list_translation_revisions(text, text, int)', 'EXECUTE') THEN
    RAISE EXCEPTION 'PROOF P3 FAILED: anon can execute';
  END IF;
  RAISE NOTICE 'PROOF P3 OK: EXECUTE = authenticated only';
END
$proof$;

INSERT INTO public.migration_marks(version) VALUES ('20260830120000') ON CONFLICT DO NOTHING;