-- U1 — Users section (Tier A, DEC-014).
-- Additive only. account_status rider on profiles + status guard trigger +
-- deactivation enforcement at the listing write seams + staff RPCs.

-- A. RIDER -------------------------------------------------------------------
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS account_status text NOT NULL DEFAULT 'active',
  ADD COLUMN IF NOT EXISTS status_changed_at timestamptz,
  ADD COLUMN IF NOT EXISTS status_reason text;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'profiles_account_status_check'
  ) THEN
    ALTER TABLE public.profiles
      ADD CONSTRAINT profiles_account_status_check
      CHECK (account_status IN ('active','deactivated'));
  END IF;
END $$;

-- B. TRIGGER LAW -------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.profiles_status_guard()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  IF NEW.account_status = 'deactivated' THEN
    IF public.is_super_admin(NEW.user_id) THEN
      RAISE EXCEPTION 'cannot deactivate a super admin';
    END IF;
    IF auth.uid() IS NOT NULL AND auth.uid() = NEW.user_id THEN
      RAISE EXCEPTION 'cannot deactivate yourself';
    END IF;
  END IF;
  NEW.status_changed_at := now();
  RETURN NEW;
END $$;

REVOKE ALL ON FUNCTION public.profiles_status_guard() FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS profiles_status_guard ON public.profiles;
CREATE TRIGGER profiles_status_guard
  BEFORE UPDATE OF account_status ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.profiles_status_guard();

-- C. SEAM ENFORCEMENT --------------------------------------------------------
CREATE OR REPLACE FUNCTION public.submit_listing(p_seller_id uuid, p_category_id uuid, p_location_id uuid, p_title text, p_description text, p_home_country_code character, p_attributes jsonb DEFAULT '{}'::jsonb, p_price_amount numeric DEFAULT NULL::numeric, p_price_currency character DEFAULT NULL::bpchar, p_price_mode text DEFAULT 'fixed'::text, p_status text DEFAULT 'draft'::text, p_listing_id uuid DEFAULT NULL::uuid)
 RETURNS uuid
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_cat        public.categories%ROWTYPE;
  v_attr       record;
  v_id         uuid;
  v_prev       public.listings%ROWTYPE;
  v_expires    timestamptz;
  v_published  timestamptz;
BEGIN
  IF auth.uid() IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF auth.uid() <> p_seller_id THEN RAISE EXCEPTION 'not your listing'; END IF;

  -- U1: a deactivated account may not write.
  IF EXISTS (
    SELECT 1 FROM public.profiles
     WHERE user_id = auth.uid() AND account_status = 'deactivated'
  ) THEN
    RAISE EXCEPTION 'account is deactivated';
  END IF;

  IF p_status NOT IN ('draft','active') THEN
    RAISE EXCEPTION 'submit_listing accepts only draft or active; use transition_listing';
  END IF;

  SELECT * INTO v_cat FROM public.categories WHERE id = p_category_id AND is_active;
  IF NOT FOUND THEN RAISE EXCEPTION 'unknown or inactive category'; END IF;

  IF NOT EXISTS (SELECT 1 FROM public.locations WHERE id = p_location_id AND is_active) THEN
    RAISE EXCEPTION 'unknown or inactive location';
  END IF;

  IF NOT EXISTS (SELECT 1 FROM public.countries WHERE code = upper(p_home_country_code)) THEN
    RAISE EXCEPTION 'unknown country';
  END IF;

  IF NOT v_cat.price_enabled AND p_price_amount IS NOT NULL THEN
    RAISE EXCEPTION 'category does not allow a price';
  END IF;

  IF jsonb_typeof(COALESCE(p_attributes,'{}'::jsonb)) <> 'object' THEN
    RAISE EXCEPTION 'attributes must be a json object';
  END IF;
  FOR v_attr IN
    SELECT * FROM public.category_attributes WHERE category_id = p_category_id
  LOOP
    IF v_attr.is_required AND NOT (p_attributes ? v_attr.attr_key) THEN
      RAISE EXCEPTION 'missing required attribute: %', v_attr.attr_key;
    END IF;
    IF p_attributes ? v_attr.attr_key AND jsonb_typeof(p_attributes -> v_attr.attr_key) <> 'null' THEN
      IF v_attr.attr_type = 'number' AND jsonb_typeof(p_attributes -> v_attr.attr_key) <> 'number' THEN
        RAISE EXCEPTION 'attribute % must be a number', v_attr.attr_key;
      ELSIF v_attr.attr_type = 'boolean' AND jsonb_typeof(p_attributes -> v_attr.attr_key) <> 'boolean' THEN
        RAISE EXCEPTION 'attribute % must be a boolean', v_attr.attr_key;
      ELSIF v_attr.attr_type IN ('text','select') AND jsonb_typeof(p_attributes -> v_attr.attr_key) <> 'string' THEN
        RAISE EXCEPTION 'attribute % must be a string', v_attr.attr_key;
      END IF;
      IF v_attr.attr_type = 'select' AND v_attr.options IS NOT NULL THEN
        IF NOT (v_attr.options @> jsonb_build_array(p_attributes -> v_attr.attr_key)) THEN
          RAISE EXCEPTION 'attribute % is not one of the allowed options', v_attr.attr_key;
        END IF;
      END IF;
    END IF;
  END LOOP;

  -- ==== REQ-021 SCREENING GATEWAY LANDS HERE (P2-d) ====================

  IF p_listing_id IS NOT NULL THEN
    SELECT * INTO v_prev FROM public.listings WHERE id = p_listing_id;
    IF NOT FOUND THEN RAISE EXCEPTION 'listing not found'; END IF;
    IF v_prev.seller_id <> auth.uid() THEN RAISE EXCEPTION 'not your listing'; END IF;
    IF v_prev.status IN ('sold','removed') THEN
      RAISE EXCEPTION 'listing is closed and cannot be edited';
    END IF;
  END IF;

  IF p_status = 'active' THEN
    v_expires   := now() + make_interval(days => v_cat.expiry_days);
    v_published := COALESCE(v_prev.published_at, now());
  ELSE
    v_expires   := v_prev.expires_at;
    v_published := v_prev.published_at;
  END IF;

  IF p_listing_id IS NULL THEN
    INSERT INTO public.listings (
      seller_id, category_id, location_id, title, description, attributes,
      price_amount, price_currency, price_mode, status, home_country_code,
      published_at, expires_at
    ) VALUES (
      p_seller_id, p_category_id, p_location_id, p_title, p_description,
      COALESCE(p_attributes,'{}'::jsonb), p_price_amount, p_price_currency,
      p_price_mode, p_status, upper(p_home_country_code), v_published, v_expires
    ) RETURNING id INTO v_id;
  ELSE
    UPDATE public.listings SET
      category_id = p_category_id,
      location_id = p_location_id,
      title = p_title,
      description = p_description,
      attributes = COALESCE(p_attributes,'{}'::jsonb),
      price_amount = p_price_amount,
      price_currency = p_price_currency,
      price_mode = p_price_mode,
      status = p_status,
      home_country_code = upper(p_home_country_code),
      published_at = v_published,
      expires_at = v_expires
    WHERE id = p_listing_id
    RETURNING id INTO v_id;
  END IF;

  RETURN v_id;
END; $function$;

CREATE OR REPLACE FUNCTION public.transition_listing(p_listing_id uuid, p_new_status text)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_row public.listings%ROWTYPE;
  v_ok  boolean := false;
BEGIN
  IF auth.uid() IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;

  -- U1: a deactivated account may not write.
  IF EXISTS (
    SELECT 1 FROM public.profiles
     WHERE user_id = auth.uid() AND account_status = 'deactivated'
  ) THEN
    RAISE EXCEPTION 'account is deactivated';
  END IF;

  SELECT * INTO v_row FROM public.listings WHERE id = p_listing_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'listing not found'; END IF;
  IF v_row.seller_id <> auth.uid() THEN RAISE EXCEPTION 'not your listing'; END IF;

  v_ok := CASE v_row.status
    WHEN 'draft'   THEN p_new_status IN ('active','removed')
    WHEN 'active'  THEN p_new_status IN ('active','expired','sold','removed')
    WHEN 'expired' THEN p_new_status IN ('active','removed')
    WHEN 'sold'    THEN p_new_status IN ('removed')
    ELSE false
  END;

  IF NOT v_ok THEN
    RAISE EXCEPTION 'illegal transition: % -> %', v_row.status, p_new_status;
  END IF;

  IF p_new_status = 'active' THEN
    UPDATE public.listings SET
      status = 'active',
      published_at = COALESCE(published_at, now()),
      expires_at = now() + make_interval(days => (
        SELECT expiry_days FROM public.categories WHERE id = v_row.category_id))
    WHERE id = p_listing_id;
  ELSE
    UPDATE public.listings SET status = p_new_status WHERE id = p_listing_id;
  END IF;
END; $function$;

-- C1. PRIVILEGE RESTATEMENT (definer law, INC-074) ----------------------------
-- The two seams above are RE-DECLARED in this file; CREATE OR REPLACE preserves
-- the live grants, so these four lines change nothing in production -- they make
-- this file self-describing about its privilege posture. Idempotent: safe to
-- re-run. Staging already applied this migration; the operator re-runs ONLY
-- these four lines there. Restated verbatim from the creating migration
-- 20260804174739_0ce87c13-1bf0-4cc8-8d61-8dd8212d961c.sql (lines 319-323) and
-- identical to the applied record in rider 20260817023555.
REVOKE ALL ON FUNCTION public.submit_listing(uuid, uuid, uuid, text, text, char, jsonb, numeric, char, text, text, uuid) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.transition_listing(uuid, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.submit_listing(uuid, uuid, uuid, text, text, char, jsonb, numeric, char, text, text, uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.transition_listing(uuid, text) TO authenticated;

-- D. STAFF RPCs --------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.admin_list_users(
  p_search text DEFAULT NULL,
  p_status text DEFAULT NULL,
  p_role text DEFAULT NULL,
  p_limit integer DEFAULT 25,
  p_offset integer DEFAULT 0
)
RETURNS TABLE(
  user_id uuid, display_name text, email text, home_country_code character(2),
  account_status text, created_at timestamptz, roles text[], total_count bigint
)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path TO 'public'
AS $$
#variable_conflict use_column
BEGIN
  IF NOT public.has_permission(auth.uid(), 'profiles', 'view') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;

  RETURN QUERY
  WITH base AS (
    SELECT p.user_id AS uid, p.display_name AS dname, u.email::text AS mail,
           p.home_country_code AS country, p.account_status AS status,
           p.created_at AS joined, p.seller_alias AS alias,
           COALESCE(ARRAY(
             SELECT r.name FROM public.user_roles ur
             JOIN public.roles r ON r.id = ur.role_id
             WHERE ur.user_id = p.user_id
             ORDER BY r.priority DESC
           ), ARRAY[]::text[]) AS role_names
    FROM public.profiles p
    JOIN auth.users u ON u.id = p.user_id
  ), filtered AS (
    SELECT * FROM base b
    WHERE (p_status IS NULL OR p_status = 'all' OR b.status = p_status)
      AND (p_role IS NULL OR p_role = 'all' OR p_role = ANY (b.role_names))
      AND (
        p_search IS NULL OR p_search = ''
        OR b.dname ILIKE '%' || p_search || '%'
        OR b.mail ILIKE '%' || p_search || '%'
        OR COALESCE(b.alias, '') ILIKE '%' || p_search || '%'
      )
  )
  SELECT f.uid, f.dname, f.mail, f.country, f.status, f.joined, f.role_names,
         COUNT(*) OVER () AS total_count
  FROM filtered f
  ORDER BY f.joined DESC
  LIMIT GREATEST(COALESCE(p_limit, 25), 1)
  OFFSET GREATEST(COALESCE(p_offset, 0), 0);
END $$;

CREATE OR REPLACE FUNCTION public.admin_get_user(p_user_id uuid)
RETURNS TABLE(
  user_id uuid, display_name text, email text, home_country_code character(2),
  account_status text, created_at timestamptz, roles text[],
  seller_alias text, show_phone boolean, show_telegram boolean, contact_whatsapp boolean,
  status_reason text, status_changed_at timestamptz, last_sign_in_at timestamptz
)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path TO 'public'
AS $$
#variable_conflict use_column
BEGIN
  IF NOT public.has_permission(auth.uid(), 'profiles', 'view') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;

  RETURN QUERY
  SELECT p.user_id, p.display_name, u.email::text, p.home_country_code,
         p.account_status, p.created_at,
         COALESCE(ARRAY(
           SELECT r.name FROM public.user_roles ur
           JOIN public.roles r ON r.id = ur.role_id
           WHERE ur.user_id = p.user_id ORDER BY r.priority DESC
         ), ARRAY[]::text[]),
         p.seller_alias, p.show_phone, p.show_telegram, p.contact_whatsapp,
         p.status_reason, p.status_changed_at, u.last_sign_in_at
  FROM public.profiles p
  JOIN auth.users u ON u.id = p.user_id
  WHERE p.user_id = p_user_id;
END $$;

CREATE OR REPLACE FUNCTION public.admin_set_account_status(
  p_user_id uuid, p_status text, p_reason text DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $$
BEGIN
  IF NOT public.has_permission(auth.uid(), 'profiles', 'update') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  IF p_status NOT IN ('active','deactivated') THEN
    RAISE EXCEPTION 'unknown account status';
  END IF;
  IF p_status = 'deactivated' AND COALESCE(btrim(p_reason), '') = '' THEN
    RAISE EXCEPTION 'a reason is required to deactivate';
  END IF;

  UPDATE public.profiles
     SET account_status = p_status,
         status_reason = CASE WHEN p_status = 'deactivated' THEN btrim(p_reason) ELSE NULL END,
         updated_at = now()
   WHERE user_id = p_user_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'user not found'; END IF;

  PERFORM public.log_audit('user.status_change', 'profiles', p_user_id::text,
    jsonb_build_object('status', p_status, 'reason', btrim(COALESCE(p_reason, ''))));
END $$;

CREATE OR REPLACE FUNCTION public.admin_user_activity(p_user_id uuid, p_limit integer DEFAULT 50)
RETURNS TABLE(
  id uuid, actor_id uuid, action text, entity_type text, entity_id text,
  meta jsonb, created_at timestamptz
)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path TO 'public'
AS $$
#variable_conflict use_column
BEGIN
  -- A per-user activity view rides on profiles:view; the GLOBAL audit viewer
  -- (U3) is the one that requires audit_logs:view.
  IF NOT public.has_permission(auth.uid(), 'profiles', 'view') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;

  RETURN QUERY
  SELECT a.id, a.actor_id, a.action, a.entity_type, a.entity_id, a.meta, a.created_at
  FROM public.audit_log a
  WHERE a.actor_id = p_user_id OR a.entity_id = p_user_id::text
  ORDER BY a.created_at DESC
  LIMIT GREATEST(COALESCE(p_limit, 50), 1);
END $$;

CREATE OR REPLACE FUNCTION public.admin_list_roles()
RETURNS TABLE(name text, display_name text, is_system boolean, priority integer)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path TO 'public'
AS $$
#variable_conflict use_column
BEGIN
  IF NOT (public.has_permission(auth.uid(), 'profiles', 'view')
       OR public.has_permission(auth.uid(), 'roles', 'view')) THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  RETURN QUERY
  SELECT r.name, r.display_name, r.is_system, r.priority
  FROM public.roles r ORDER BY r.priority DESC;
END $$;

REVOKE ALL ON FUNCTION public.admin_list_users(text, text, text, integer, integer) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.admin_get_user(uuid) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.admin_set_account_status(uuid, text, text) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.admin_user_activity(uuid, integer) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.admin_list_roles() FROM PUBLIC, anon;

GRANT EXECUTE ON FUNCTION public.admin_list_users(text, text, text, integer, integer) TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_get_user(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_set_account_status(uuid, text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_user_activity(uuid, integer) TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_list_roles() TO authenticated;

-- F. IN-MIGRATION PROOFS ------------------------------------------------------
DO $$
DECLARE
  v_super uuid; v_base uuid; v_rows integer; v_total bigint; ok boolean;
BEGIN
  SELECT ur.user_id INTO v_super
    FROM public.user_roles ur JOIN public.roles r ON r.id = ur.role_id
   WHERE r.name = 'super_admin' LIMIT 1;
  SELECT p.user_id INTO v_base
    FROM public.profiles p
   WHERE NOT public.is_super_admin(p.user_id)
     AND NOT public.has_permission(p.user_id, 'profiles', 'view')
   ORDER BY p.created_at LIMIT 1;

  IF v_super IS NULL OR v_base IS NULL THEN
    RAISE EXCEPTION 'PROOFS FAILED: need one super_admin and one base user (super=%, base=%)', v_super, v_base;
  END IF;

  -- P1 base user is denied
  ok := false;
  BEGIN
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_base::text, 'role', 'authenticated')::text, true);
    SET LOCAL ROLE authenticated;
    PERFORM 1 FROM public.admin_list_users(NULL, NULL, NULL, 5, 0);
    RESET ROLE;
  EXCEPTION WHEN others THEN
    RESET ROLE;
    IF SQLERRM ILIKE '%permission denied%' THEN ok := true; ELSE RAISE; END IF;
  END;
  IF NOT ok THEN RAISE EXCEPTION 'P1 FAILED: base user could list users'; END IF;
  RAISE NOTICE 'P1 PASS: base user denied on admin_list_users';

  -- P2 super_admin sees rows with a total
  PERFORM set_config('request.jwt.claims', json_build_object('sub', v_super::text, 'role', 'authenticated')::text, true);
  SET LOCAL ROLE authenticated;
  SELECT count(*), max(l.total_count) INTO v_rows, v_total
    FROM public.admin_list_users(NULL, NULL, NULL, 5, 0) l;
  RESET ROLE;
  IF v_rows < 1 OR COALESCE(v_total, 0) < 1 THEN
    RAISE EXCEPTION 'P2 FAILED: super_admin got % rows / total %', v_rows, v_total;
  END IF;
  RAISE NOTICE 'P2 PASS: super_admin listed % rows, total_count %', v_rows, v_total;

  -- P3 status change + audit row
  PERFORM set_config('request.jwt.claims', json_build_object('sub', v_super::text, 'role', 'authenticated')::text, true);
  SET LOCAL ROLE authenticated;
  PERFORM public.admin_set_account_status(v_base, 'deactivated', 'U1 proof');
  RESET ROLE;
  IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE user_id = v_base AND account_status = 'deactivated') THEN
    RAISE EXCEPTION 'P3 FAILED: status not applied';
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM public.audit_log
     WHERE action = 'user.status_change' AND entity_id = v_base::text
  ) THEN RAISE EXCEPTION 'P3 FAILED: no audit row'; END IF;
  RAISE NOTICE 'P3 PASS: deactivated + audited';

  -- P4 a super admin cannot be deactivated
  ok := false;
  BEGIN
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_super::text, 'role', 'authenticated')::text, true);
    SET LOCAL ROLE authenticated;
    PERFORM public.admin_set_account_status(v_super, 'deactivated', 'U1 proof');
    RESET ROLE;
  EXCEPTION WHEN others THEN
    RESET ROLE;
    IF SQLERRM ILIKE '%super admin%' THEN ok := true; ELSE RAISE; END IF;
  END;
  IF NOT ok THEN RAISE EXCEPTION 'P4 FAILED: super admin deactivated'; END IF;
  RAISE NOTICE 'P4 PASS: cannot deactivate a super admin';

  -- P5 self-deactivation refused
  ok := false;
  BEGIN
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_base::text, 'role', 'authenticated')::text, true);
    UPDATE public.profiles SET account_status = 'deactivated' WHERE user_id = v_base;
  EXCEPTION WHEN others THEN
    IF SQLERRM ILIKE '%yourself%' THEN ok := true; ELSE RAISE; END IF;
  END;
  IF NOT ok THEN RAISE EXCEPTION 'P5 FAILED: self-deactivation allowed'; END IF;
  RAISE NOTICE 'P5 PASS: cannot deactivate yourself';

  -- P6 write seam refuses a deactivated caller
  ok := false;
  BEGIN
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_base::text, 'role', 'authenticated')::text, true);
    SET LOCAL ROLE authenticated;
    PERFORM public.submit_listing(v_base, gen_random_uuid(), gen_random_uuid(),
      'U1 proof', 'U1 proof', 'ET');
    RESET ROLE;
  EXCEPTION WHEN others THEN
    RESET ROLE;
    IF SQLERRM ILIKE '%account is deactivated%' THEN ok := true; ELSE RAISE; END IF;
  END;
  IF NOT ok THEN RAISE EXCEPTION 'P6 FAILED: deactivated user reached the seam'; END IF;
  RAISE NOTICE 'P6 PASS: submit_listing refuses a deactivated account';

  -- RESTORE
  PERFORM set_config('request.jwt.claims', json_build_object('sub', v_super::text, 'role', 'authenticated')::text, true);
  SET LOCAL ROLE authenticated;
  PERFORM public.admin_set_account_status(v_base, 'active', NULL);
  RESET ROLE;
  PERFORM set_config('request.jwt.claims', NULL, true);
  IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE user_id = v_base AND account_status = 'active') THEN
    RAISE EXCEPTION 'RESTORE FAILED: scratch user still deactivated';
  END IF;
  RAISE NOTICE 'RESTORE PASS: scratch user active again';
END $$;

-- READ-BACKS ------------------------------------------------------------------
DO $$
DECLARE fn text;
BEGIN
  FOREACH fn IN ARRAY ARRAY[
    'public.admin_list_users(text, text, text, integer, integer)',
    'public.admin_get_user(uuid)',
    'public.admin_set_account_status(uuid, text, text)',
    'public.admin_user_activity(uuid, integer)',
    'public.admin_list_roles()'
  ] LOOP
    IF has_function_privilege('anon', fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'READ-BACK FAILED: anon may execute %', fn;
    END IF;
    IF NOT has_function_privilege('authenticated', fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'READ-BACK FAILED: authenticated may not execute %', fn;
    END IF;
  END LOOP;
  IF has_function_privilege('anon', 'public.profiles_status_guard()', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.profiles_status_guard()', 'EXECUTE') THEN
    RAISE EXCEPTION 'READ-BACK FAILED: status guard is executable by a client role';
  END IF;
  RAISE NOTICE 'READ-BACKS PASS: anon denied, authenticated granted, guard revoked';
END $$;