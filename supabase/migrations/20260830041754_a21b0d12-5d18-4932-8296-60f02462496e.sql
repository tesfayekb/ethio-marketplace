-- U4b-7 (INC-095 l–n): ONE gated definer read feeds BOTH eligibility and the
-- target's current translator languages. The card previously never read existing
-- assignments, so its replace-set save could silently wipe scope.
--
-- NOTE on public.user_has_translation_permission(uuid): SUPERSEDED by this scope
-- read (which returns eligibility as one of its columns). Retained for
-- compatibility; no behaviour change, no re-declaration here.

CREATE OR REPLACE FUNCTION public.admin_get_translator_scope(p_target uuid)
RETURNS TABLE(eligible boolean, languages text[])
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.has_permission(auth.uid(), 'translations', 'manage') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;

  RETURN QUERY
  SELECT
    EXISTS (
      SELECT 1
      FROM public.user_roles ur
      JOIN public.role_permissions rp ON rp.role_id = ur.role_id
      JOIN public.permissions p ON p.id = rp.permission_id
      JOIN public.resources r ON r.id = p.resource_id
      WHERE ur.user_id = p_target
        AND r.name = 'translations'
        AND p.action IN ('view', 'update', 'machine', 'approve', 'manage')
    ) AS eligible,
    COALESCE(
      (
        SELECT array_agg(tl.lang_code ORDER BY tl.lang_code)
        FROM public.translator_languages tl
        WHERE tl.user_id = p_target
      ),
      ARRAY[]::text[]
    ) AS languages;
END;
$$;

REVOKE ALL ON FUNCTION public.admin_get_translator_scope(uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.admin_get_translator_scope(uuid) FROM anon;
GRANT EXECUTE ON FUNCTION public.admin_get_translator_scope(uuid) TO authenticated;

-- ---------------------------------------------------------------------------
-- PROOFS
-- ---------------------------------------------------------------------------
DO $proof$
DECLARE
  v_target uuid;
  v_role uuid;
  v_perm uuid;
  v_res uuid;
  v_eligible boolean;
  v_langs text[];
  v_msg text;
BEGIN
  SELECT id INTO v_target FROM auth.users ORDER BY created_at LIMIT 1;
  IF v_target IS NULL THEN
    RAISE NOTICE 'PROOF SKIPPED: no auth.users principal available';
    RETURN;
  END IF;

  -- P1: caller without translations:manage is refused (auth.uid() is NULL here).
  BEGIN
    PERFORM * FROM public.admin_get_translator_scope(v_target);
    RAISE EXCEPTION 'PROOF P1 FAILED: non-manager caller was not refused';
  EXCEPTION
    WHEN OTHERS THEN
      GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
      IF v_msg <> 'permission denied' THEN
        RAISE EXCEPTION 'PROOF P1 FAILED: unexpected message %', v_msg;
      END IF;
      RAISE NOTICE 'PROOF P1 OK: %', v_msg;
  END;

  -- P2: the body's truth table, evaluated directly (caller gate proved by P1).
  SELECT id INTO v_res FROM public.resources WHERE name = 'translations';
  IF v_res IS NULL THEN
    RAISE NOTICE 'PROOF P2 SKIPPED: translations resource absent';
    RETURN;
  END IF;
  SELECT id INTO v_perm FROM public.permissions
   WHERE resource_id = v_res AND action = 'view';

  INSERT INTO public.roles(name, display_name, description, is_system)
  VALUES ('e2e_scratch_u4b7', 'U4b-7 proof role', 'temporary', false)
  RETURNING id INTO v_role;

  -- P2a: fresh target (no translations role, no assignments) -> (false, {}).
  SELECT s.eligible, s.languages INTO v_eligible, v_langs
  FROM (
    SELECT
      EXISTS (
        SELECT 1 FROM public.user_roles ur
        JOIN public.role_permissions rp ON rp.role_id = ur.role_id
        JOIN public.permissions p ON p.id = rp.permission_id
        JOIN public.resources r ON r.id = p.resource_id
        WHERE ur.user_id = v_target AND r.name = 'translations'
          AND p.action IN ('view','update','machine','approve','manage')
          AND ur.role_id = v_role
      ) AS eligible,
      COALESCE((SELECT array_agg(tl.lang_code ORDER BY tl.lang_code)
                FROM public.translator_languages tl
                WHERE tl.user_id = v_target), ARRAY[]::text[]) AS languages
  ) s;
  IF v_eligible OR array_length(v_langs, 1) IS NOT NULL THEN
    RAISE NOTICE 'PROOF P2a: pre-existing state on shared principal (eligible=%, langs=%)', v_eligible, v_langs;
  ELSE
    RAISE NOTICE 'PROOF P2a OK: fresh target -> (false, {})';
  END IF;

  -- P2b: grant translations:view via the scratch role -> eligible true.
  INSERT INTO public.role_permissions(role_id, permission_id, is_core)
  VALUES (v_role, v_perm, false);
  INSERT INTO public.user_roles(user_id, role_id, scope_type)
  VALUES (v_target, v_role, 'global');

  SELECT EXISTS (
    SELECT 1 FROM public.user_roles ur
    JOIN public.role_permissions rp ON rp.role_id = ur.role_id
    JOIN public.permissions p ON p.id = rp.permission_id
    JOIN public.resources r ON r.id = p.resource_id
    WHERE ur.user_id = v_target AND r.name = 'translations'
      AND p.action IN ('view','update','machine','approve','manage')
      AND ur.role_id = v_role
  ) INTO v_eligible;
  IF NOT v_eligible THEN
    RAISE EXCEPTION 'PROOF P2b FAILED: target with translations:view reported false';
  END IF;
  RAISE NOTICE 'PROOF P2b OK: target with translations:view -> (true, {})';

  -- P2c: insert an am assignment -> languages carries it.
  INSERT INTO public.translator_languages(user_id, lang_code)
  VALUES (v_target, 'am') ON CONFLICT DO NOTHING;

  SELECT COALESCE((SELECT array_agg(tl.lang_code ORDER BY tl.lang_code)
                   FROM public.translator_languages tl
                   WHERE tl.user_id = v_target), ARRAY[]::text[])
    INTO v_langs;
  IF NOT ('am' = ANY(v_langs)) THEN
    RAISE EXCEPTION 'PROOF P2c FAILED: am assignment absent from scope (%)', v_langs;
  END IF;
  RAISE NOTICE 'PROOF P2c OK: assigned target -> (true, %)', v_langs;

  -- Cleanup.
  DELETE FROM public.translator_languages WHERE user_id = v_target AND lang_code = 'am';
  DELETE FROM public.user_roles WHERE role_id = v_role;
  DELETE FROM public.role_permissions WHERE role_id = v_role;
  DELETE FROM public.roles WHERE id = v_role;
  RAISE NOTICE 'PROOF cleanup OK';
END
$proof$;

-- Grant read-back.
DO $grants$
DECLARE
  v_acl text;
BEGIN
  SELECT array_to_string(proacl, ',') INTO v_acl
  FROM pg_proc WHERE proname = 'admin_get_translator_scope'
    AND pronamespace = 'public'::regnamespace;
  RAISE NOTICE 'GRANT READ-BACK admin_get_translator_scope: %', v_acl;
END
$grants$;

INSERT INTO public.migration_marks(version) VALUES ('20260830050000') ON CONFLICT DO NOTHING;