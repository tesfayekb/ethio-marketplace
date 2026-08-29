-- ---------------------------------------------------------------------
-- U4b PREREQUISITE — translations console read seams.
--
-- WHY: public.languages carries the RLS policy
--   USING (enabled_public OR is_base)
-- so a signed-in admin can read ONLY en + am. om/ti (enabled_admin, not yet
-- public) are invisible to the browser, and admin_translation_stats returns
-- counts keyed by lang_code with no roster metadata. The U4b console therefore
-- has no way to render the roster, the enabled_admin/enabled_public switches,
-- or the coverage-gate state.
--
-- RESOLUTION (operator ruling 2026-08-29): a definer READ rpc, matching the
-- project's every-read-through-a-gated-RPC architecture — NOT a widened table
-- policy (which would leak the roster row shape to the client and mix policy
-- styles). Supervisor gap logged: the U4a spec registered the mutation RPCs
-- and the restrictive policy but omitted the matching read.
--
-- Additive and read-only: no table, column, policy or grant is altered.
-- ---------------------------------------------------------------------

-- ---------------------------------------------------------------------
-- A. ROSTER READ — gated on translations:view, no step-up (reads never
--    require step-up; DEC-017 registered `view` as the only non-step-up verb).
-- ---------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.admin_list_languages()
RETURNS TABLE (
  code text,
  name_en text,
  name_native text,
  rtl boolean,
  is_base boolean,
  enabled_admin boolean,
  enabled_public boolean,
  sort int,
  created_at timestamptz,
  updated_at timestamptz)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
#variable_conflict use_column
BEGIN
  IF NOT public.has_permission(auth.uid(), 'translations', 'view') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;

  RETURN QUERY
  SELECT l.code, l.name_en, l.name_native, l.rtl, l.is_base,
         l.enabled_admin, l.enabled_public, l.sort, l.created_at, l.updated_at
    FROM public.languages l
   ORDER BY l.sort, l.code;
END $$;
REVOKE ALL ON FUNCTION public.admin_list_languages() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_list_languages() TO authenticated;

-- ---------------------------------------------------------------------
-- B. SELF-READ — the caller's own translator scope.
--
-- Auth-callable with NO permission gate: it discloses only the caller's own
-- assignment row set, which the caller may always know. It upgrades the
-- strings page from attempt-and-toast to informed controls. Law F3 is
-- unchanged — every mutation still re-checks has_permission,
-- require_step_up_if_needed and translation_scope_ok server-side; this read
-- only lets the UI state "not assigned" honestly.
--
-- Holders of translations:manage are scope-EXEMPT (translation_scope_ok
-- short-circuits for them), so this returns their explicit rows only; the
-- console must consult the permission, not this list, before concluding a
-- manage holder is unassigned.
-- ---------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.get_my_translator_languages()
RETURNS TABLE (lang_code text)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
#variable_conflict use_column
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'not authenticated';
  END IF;

  RETURN QUERY
  SELECT tl.lang_code
    FROM public.translator_languages tl
   WHERE tl.user_id = auth.uid()
   ORDER BY tl.lang_code;
END $$;
REVOKE ALL ON FUNCTION public.get_my_translator_languages() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_my_translator_languages() TO authenticated;

-- ---------------------------------------------------------------------
-- C. PROOFS — dynamic principals, fail loudly, scratch rows cleaned up.
-- ---------------------------------------------------------------------
DO $proof$
DECLARE
  v_super uuid;
  v_base  uuid;
  ok      boolean;
  n       bigint;
  v_codes text[];
BEGIN
  SELECT ur.user_id INTO v_super FROM public.user_roles ur
    JOIN public.roles r ON r.id = ur.role_id WHERE r.name = 'super_admin' LIMIT 1;
  SELECT ur.user_id INTO v_base FROM public.user_roles ur
    JOIN public.roles r ON r.id = ur.role_id
   WHERE r.name = 'user' AND NOT public.is_super_admin(ur.user_id) LIMIT 1;
  IF v_super IS NULL OR v_base IS NULL THEN
    RAISE EXCEPTION 'U4b-PRE PROOFS FAILED: no dynamic principals available';
  END IF;

  -- P1 (deny-case): a base user is refused the roster.
  PERFORM set_config('request.jwt.claims',
    json_build_object('sub', v_base::text, 'role', 'authenticated', 'aal', 'aal1')::text, true);
  ok := false;
  BEGIN
    PERFORM * FROM public.admin_list_languages();
  EXCEPTION WHEN others THEN
    IF SQLERRM ILIKE '%permission denied%' THEN ok := true; ELSE RAISE; END IF;
  END;
  IF NOT ok THEN
    RAISE EXCEPTION 'P1 FAILED: base user was not refused admin_list_languages';
  END IF;
  RAISE NOTICE 'P1 OK: roster refused to a permissionless principal';

  -- P2: a superadmin sees the WHOLE roster, including the admin-only languages
  --     the table policy hides from the client (om, ti).
  PERFORM set_config('request.jwt.claims',
    json_build_object('sub', v_super::text, 'role', 'authenticated', 'aal', 'aal2')::text, true);
  SELECT count(*) INTO n FROM public.admin_list_languages();
  IF n <> (SELECT count(*) FROM public.languages) THEN
    RAISE EXCEPTION 'P2 FAILED: roster returned % of % rows', n, (SELECT count(*) FROM public.languages);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM public.admin_list_languages() l
                  WHERE l.code = 'om' AND l.enabled_admin AND NOT l.enabled_public) THEN
    RAISE EXCEPTION 'P2 FAILED: om not visible with its admin-only flag shape';
  END IF;
  RAISE NOTICE 'P2 OK: full roster (% rows) incl. admin-only languages', n;

  -- P3 (self-read correctness): the caller sees exactly their OWN rows.
  INSERT INTO public.translator_languages (user_id, lang_code)
  VALUES (v_base, 'am'), (v_base, 'om')
  ON CONFLICT DO NOTHING;
  INSERT INTO public.translator_languages (user_id, lang_code)
  VALUES (v_super, 'ti')
  ON CONFLICT DO NOTHING;

  PERFORM set_config('request.jwt.claims',
    json_build_object('sub', v_base::text, 'role', 'authenticated', 'aal', 'aal1')::text, true);
  SELECT array_agg(g.lang_code ORDER BY g.lang_code) INTO v_codes
    FROM public.get_my_translator_languages() g;
  IF v_codes IS DISTINCT FROM ARRAY['am', 'om']::text[] THEN
    RAISE EXCEPTION 'P3 FAILED: self-read returned % for the base principal', v_codes;
  END IF;
  IF 'ti' = ANY(COALESCE(v_codes, ARRAY[]::text[])) THEN
    RAISE EXCEPTION 'P3 FAILED: self-read leaked another user''s assignment';
  END IF;
  RAISE NOTICE 'P3 OK: self-read returned exactly the caller''s own codes %', v_codes;

  -- P4: the self-read is scoped per principal, not global.
  PERFORM set_config('request.jwt.claims',
    json_build_object('sub', v_super::text, 'role', 'authenticated', 'aal', 'aal2')::text, true);
  SELECT array_agg(g.lang_code ORDER BY g.lang_code) INTO v_codes
    FROM public.get_my_translator_languages() g;
  IF v_codes IS DISTINCT FROM ARRAY['ti']::text[] THEN
    RAISE EXCEPTION 'P4 FAILED: superadmin self-read returned %', v_codes;
  END IF;
  RAISE NOTICE 'P4 OK: self-read is per-principal';

  -- Cleanup: the proof's scratch assignments never survive the migration.
  DELETE FROM public.translator_languages
   WHERE (user_id = v_base AND lang_code IN ('am', 'om'))
      OR (user_id = v_super AND lang_code = 'ti');

  PERFORM set_config('request.jwt.claims', NULL, true);
  RAISE NOTICE 'U4b-PRE PROOFS OK (P1-P4)';
END $proof$;

-- ---------------------------------------------------------------------
-- D. GRANT MATRIX — anon must never reach either read.
-- ---------------------------------------------------------------------
DO $grants$
DECLARE v_bad text;
BEGIN
  SELECT string_agg(f, ', ') INTO v_bad
  FROM (
    SELECT f FROM unnest(ARRAY[
      'admin_list_languages()',
      'get_my_translator_languages()']) f
    WHERE NOT has_function_privilege('authenticated', 'public.' || f, 'EXECUTE')
       OR has_function_privilege('anon', 'public.' || f, 'EXECUTE')
  ) x;
  IF v_bad IS NOT NULL THEN RAISE EXCEPTION 'GRANT MATRIX FAILED: %', v_bad; END IF;
  IF has_table_privilege('authenticated', 'public.translator_languages', 'SELECT') THEN
    RAISE EXCEPTION 'GRANT MATRIX FAILED: translator_languages is reachable directly';
  END IF;
  RAISE NOTICE 'GRANT MATRIX OK';
END $grants$;

INSERT INTO public.migration_marks(version) VALUES ('20260829060232') ON CONFLICT DO NOTHING;