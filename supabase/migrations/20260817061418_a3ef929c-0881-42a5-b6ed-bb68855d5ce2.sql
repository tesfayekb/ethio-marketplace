-- =====================================================================
-- Phase U1g — EDIT USER (admin_update_profile) — Tier A
--
-- Additive. No table is created. ONE new SECURITY DEFINER mutation RPC that
-- lets staff correct a user's display name, seller alias and home country.
--
-- THE RULE (U1f): a mutation RPC checks the permission FIRST, then calls
-- public.require_step_up_if_needed(...) — so a caller without the permission
-- sees 'permission denied' and never learns that a code would help.
--
-- Validation is the profile's OWN constraints: the alias CHECK + the
-- case-insensitive unique index on lower(seller_alias) already live on
-- public.profiles; the country must exist (and be active) in public.countries.
-- =====================================================================

CREATE OR REPLACE FUNCTION public.admin_update_profile(
  p_user_id uuid,
  p_display_name text,
  p_seller_alias text DEFAULT NULL,
  p_home_country_code char(2) DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_old   record;
  v_name  text;
  v_alias text;
  v_meta  jsonb := '{}'::jsonb;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'profiles', 'update') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('profiles', 'update');

  v_name  := btrim(COALESCE(p_display_name, ''));
  IF v_name = '' THEN
    RAISE EXCEPTION 'display name is required';
  END IF;
  v_alias := NULLIF(btrim(COALESCE(p_seller_alias, '')), '');

  IF p_home_country_code IS NOT NULL
     AND NOT EXISTS (SELECT 1 FROM public.countries c
                      WHERE c.code = p_home_country_code AND c.is_active) THEN
    RAISE EXCEPTION 'unknown country';
  END IF;

  SELECT display_name, seller_alias, home_country_code
    INTO v_old
    FROM public.profiles
   WHERE user_id = p_user_id;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'user not found';
  END IF;

  -- Surface the unique index as a clean, matchable message (the index still
  -- has the last word — this is the friendly path, not the authority).
  IF v_alias IS NOT NULL
     AND EXISTS (SELECT 1 FROM public.profiles p
                  WHERE p.user_id <> p_user_id
                    AND lower(p.seller_alias) = lower(v_alias)) THEN
    RAISE EXCEPTION 'seller alias already taken' USING ERRCODE = '23505';
  END IF;

  UPDATE public.profiles
     SET display_name      = v_name,
         seller_alias      = v_alias,
         home_country_code = COALESCE(p_home_country_code, home_country_code),
         updated_at        = now()
   WHERE user_id = p_user_id;

  IF v_old.display_name IS DISTINCT FROM v_name THEN
    v_meta := v_meta || jsonb_build_object('display_name',
      jsonb_build_object('old', v_old.display_name, 'new', v_name));
  END IF;
  IF v_old.seller_alias IS DISTINCT FROM v_alias THEN
    v_meta := v_meta || jsonb_build_object('seller_alias',
      jsonb_build_object('old', v_old.seller_alias, 'new', v_alias));
  END IF;
  IF p_home_country_code IS NOT NULL
     AND v_old.home_country_code IS DISTINCT FROM p_home_country_code THEN
    v_meta := v_meta || jsonb_build_object('home_country_code',
      jsonb_build_object('old', v_old.home_country_code, 'new', p_home_country_code));
  END IF;

  PERFORM public.log_audit('user.profile_edit', 'profiles', p_user_id::text, v_meta);
END $$;

-- Definer law (INC-074): the file states its own grants.
REVOKE ALL ON FUNCTION public.admin_update_profile(uuid, text, text, char(2)) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_update_profile(uuid, text, text, char(2)) TO authenticated;

-- ---------- IN-MIGRATION PROOFS ---------------------------------------------
DO $$
DECLARE
  v_super uuid; v_base uuid; v_other uuid; ok boolean;
  v_name text; v_alias text; v_country char(2); v_other_alias text;
BEGIN
  SELECT ur.user_id INTO v_super
    FROM public.user_roles ur JOIN public.roles r ON r.id = ur.role_id
   WHERE r.name = 'super_admin' LIMIT 1;
  SELECT p.user_id INTO v_base
    FROM public.profiles p
   WHERE NOT public.is_super_admin(p.user_id)
     AND NOT public.has_permission(p.user_id, 'profiles', 'view')
   ORDER BY p.created_at LIMIT 1;
  SELECT p.user_id INTO v_other
    FROM public.profiles p
   WHERE p.user_id <> v_base AND p.user_id <> v_super
   ORDER BY p.created_at LIMIT 1;
  IF v_super IS NULL OR v_base IS NULL OR v_other IS NULL THEN
    RAISE EXCEPTION 'PROOFS FAILED: need a super_admin, a base user and one more profile';
  END IF;

  SELECT display_name, seller_alias, home_country_code
    INTO v_name, v_alias, v_country FROM public.profiles WHERE user_id = v_base;
  SELECT seller_alias INTO v_other_alias FROM public.profiles WHERE user_id = v_other;

  -- P1 base user (no permission) → permission denied
  ok := false;
  BEGIN
    PERFORM set_config('request.jwt.claims',
      json_build_object('sub', v_base::text, 'role', 'authenticated', 'aal', 'aal2')::text, true);
    SET LOCAL ROLE authenticated;
    PERFORM public.admin_update_profile(v_base, 'U1g nope', NULL, NULL);
    RESET ROLE;
  EXCEPTION WHEN others THEN
    RESET ROLE;
    IF SQLERRM ILIKE '%permission denied%' THEN ok := true; ELSE RAISE; END IF;
  END;
  IF NOT ok THEN RAISE EXCEPTION 'P1 FAILED: base user edited a profile'; END IF;
  RAISE NOTICE 'P1 PASS: base user refused (permission denied)';

  -- P2 staff on an aal1 session → step-up required
  ok := false;
  BEGIN
    PERFORM set_config('request.jwt.claims',
      json_build_object('sub', v_super::text, 'role', 'authenticated', 'aal', 'aal1')::text, true);
    SET LOCAL ROLE authenticated;
    PERFORM public.admin_update_profile(v_base, 'U1g nope', NULL, NULL);
    RESET ROLE;
  EXCEPTION WHEN others THEN
    RESET ROLE;
    IF SQLERRM ILIKE '%step-up required%' THEN ok := true; ELSE RAISE; END IF;
  END;
  IF NOT ok THEN RAISE EXCEPTION 'P2 FAILED: aal1 staff edited a profile'; END IF;
  RAISE NOTICE 'P2 PASS: aal1 staff refused (step-up required)';

  -- P3 staff at aal2 → applied + audited (scratch user, restored below)
  PERFORM set_config('request.jwt.claims',
    json_build_object('sub', v_super::text, 'role', 'authenticated', 'aal', 'aal2')::text, true);
  SET LOCAL ROLE authenticated;
  PERFORM public.admin_update_profile(v_base, 'U1g proof name', 'u1g-proof-alias', NULL);
  RESET ROLE;
  IF NOT EXISTS (SELECT 1 FROM public.profiles
                  WHERE user_id = v_base AND display_name = 'U1g proof name'
                    AND seller_alias = 'u1g-proof-alias') THEN
    RAISE EXCEPTION 'P3 FAILED: the edit did not apply';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM public.audit_log
                  WHERE action = 'user.profile_edit' AND entity_id = v_base::text) THEN
    RAISE EXCEPTION 'P3 FAILED: no audit row';
  END IF;
  RAISE NOTICE 'P3 PASS: aal2 staff edit applied and audited';

  -- P4 duplicate alias → clean, matchable error
  IF v_other_alias IS NOT NULL THEN
    ok := false;
    BEGIN
      PERFORM set_config('request.jwt.claims',
        json_build_object('sub', v_super::text, 'role', 'authenticated', 'aal', 'aal2')::text, true);
      SET LOCAL ROLE authenticated;
      PERFORM public.admin_update_profile(v_base, 'U1g proof name', v_other_alias, NULL);
      RESET ROLE;
    EXCEPTION WHEN others THEN
      RESET ROLE;
      IF SQLERRM ILIKE '%alias already taken%' THEN ok := true; ELSE RAISE; END IF;
    END;
    IF NOT ok THEN RAISE EXCEPTION 'P4 FAILED: duplicate alias accepted'; END IF;
    RAISE NOTICE 'P4 PASS: duplicate alias refused (seller alias already taken)';
  ELSE
    -- No second alias exists yet: prove the same rule against the row we just set.
    ok := false;
    BEGIN
      PERFORM set_config('request.jwt.claims',
        json_build_object('sub', v_super::text, 'role', 'authenticated', 'aal', 'aal2')::text, true);
      SET LOCAL ROLE authenticated;
      PERFORM public.admin_update_profile(v_other, 'U1g other', 'U1G-PROOF-ALIAS', NULL);
      RESET ROLE;
    EXCEPTION WHEN others THEN
      RESET ROLE;
      IF SQLERRM ILIKE '%alias already taken%' THEN ok := true; ELSE RAISE; END IF;
    END;
    IF NOT ok THEN RAISE EXCEPTION 'P4 FAILED: duplicate alias accepted (case-insensitive)'; END IF;
    RAISE NOTICE 'P4 PASS: duplicate alias refused case-insensitively';
  END IF;

  -- restore the scratch user verbatim
  UPDATE public.profiles
     SET display_name = v_name, seller_alias = v_alias, home_country_code = v_country
   WHERE user_id = v_base;

  PERFORM set_config('request.jwt.claims', NULL, true);
END $$;

-- Self-mark (last statement, per the self-marking law).
INSERT INTO public.migration_marks(version) VALUES ('20260817061418') ON CONFLICT DO NOTHING;
