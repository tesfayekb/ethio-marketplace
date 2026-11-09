-- e2e-areas: admin-roles
-- P-2 turn (c) M-3c-b, part 4 of 5 — THE COVERAGE PERMISSION RETIRED (docs/governance/briefs/p2-fold-c2b-ruling-1.md
-- §4 (iv); the census, docs/governance/reports/p2-fold-c2b.stop-1.md §5). It follows part 3 (68fda306, mark
-- 20261109070200).
-- The `coverage` resource (seeded 20260915162505 :39–90: actions view and update, granted to every role holding
-- locations:manage with is_core = false) guarded only the plans console's door, admin_set_coverage_plan, which
-- part 5 drops. Its rows leave: the apply refuses when any of its role grants is core (the core lock is never
-- disabled), deletes the resource (the foreign keys cascade to its permissions and their role grants), and refuses
-- when any row under it remains. Proofs at the end on scratch rows (a scratch role holding locations:manage),
-- rolled back by the sentinel.

DO $pre$
DECLARE
  v_n integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261109070200') THEN
    RAISE EXCEPTION 'P-2 (c) M-3c-b part 4: part 3 (68fda306, mark 20261109070200) must be applied first';
  END IF;
  -- The core lock (role_permissions_core_lock) refuses a core grant's delete: say so before anything moves.
  SELECT count(*) INTO v_n
    FROM public.role_permissions rp
    JOIN public.permissions p ON p.id = rp.permission_id
    JOIN public.resources res ON res.id = p.resource_id
   WHERE res.name = 'coverage' AND rp.is_core;
  IF v_n <> 0 THEN
    RAISE EXCEPTION 'P-2 (c) M-3c-b part 4: % core role grant(s) under coverage; the resource cannot leave', v_n;
  END IF;
END $pre$;

-- ------------------------------------------------------------ 1. THE ROWS
DELETE FROM public.resources WHERE name = 'coverage';

DO $after$
DECLARE
  v_n integer;
BEGIN
  SELECT count(*) INTO v_n FROM public.resources WHERE name = 'coverage';
  IF v_n <> 0 THEN RAISE EXCEPTION 'P-2 (c) M-3c-b part 4: the coverage resource remains'; END IF;
  SELECT count(*) INTO v_n FROM public.permissions p
   WHERE NOT EXISTS (SELECT 1 FROM public.resources res WHERE res.id = p.resource_id);
  IF v_n <> 0 THEN RAISE EXCEPTION 'P-2 (c) M-3c-b part 4: % permission row(s) without a resource', v_n; END IF;
  SELECT count(*) INTO v_n FROM public.role_permissions rp
   WHERE NOT EXISTS (SELECT 1 FROM public.permissions p WHERE p.id = rp.permission_id);
  IF v_n <> 0 THEN RAISE EXCEPTION 'P-2 (c) M-3c-b part 4: % role grant(s) without a permission', v_n; END IF;
END $after$;

-- ------------------------------------------------------------ 2. PROOFS
-- Scratch rows only, rolled back by the sentinel; the one real row read is locations:manage's id.
--   (a) a scratch staff member on a scratch role holding locations:manage — the grant that carried coverage — holds
--       locations:view (the control: the caller is real) and neither coverage:view nor coverage:update;
--   (b) no permission names an action under a resource called coverage.
DO $proof$
DECLARE
  v_staff uuid := gen_random_uuid();
  v_tag   text := 'e2e-mig-p2c-m3cb4-' || substr(gen_random_uuid()::text, 1, 8);
  v_perm  uuid;
  v_role  uuid;
  v_msg   text;
BEGIN
  SELECT p.id INTO v_perm FROM public.permissions p JOIN public.resources res ON res.id = p.resource_id
   WHERE res.name = 'locations' AND p.action = 'manage';
  IF v_perm IS NULL THEN RAISE EXCEPTION 'P-2 (c) M-3c-b part 4 proof: no locations:manage permission'; END IF;
  BEGIN
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at)
    VALUES (v_staff, v_tag || '-staff@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-locations', v_tag) RETURNING id INTO v_role;
    INSERT INTO public.role_permissions (role_id, permission_id) VALUES (v_role, v_perm);
    INSERT INTO public.user_roles (user_id, role_id, scope_type) VALUES (v_staff, v_role, 'global');
    PERFORM set_config('request.jwt.claims', '{}', true);

    -- (a)
    IF NOT public.has_permission(v_staff, 'locations', 'view') THEN
      RAISE EXCEPTION 'P-2 (c) M-3c-b part 4 proof (a): the scratch staff member does not hold locations:view';
    END IF;
    IF public.has_permission(v_staff, 'coverage', 'view') OR public.has_permission(v_staff, 'coverage', 'update') THEN
      RAISE EXCEPTION 'P-2 (c) M-3c-b part 4 proof (a): a coverage permission is still held';
    END IF;
    -- (b)
    IF EXISTS (SELECT 1 FROM public.permissions p JOIN public.resources res ON res.id = p.resource_id
                WHERE res.name = 'coverage') THEN
      RAISE EXCEPTION 'P-2 (c) M-3c-b part 4 proof (b): a coverage permission row remains';
    END IF;

    RAISE EXCEPTION 'p2c-m3cb4-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2c-m3cb4-proof-ok' THEN RAISE; END IF;
  END;
  IF EXISTS (SELECT 1 FROM auth.users WHERE id = v_staff AND email LIKE 'e2e-mig-%')
     OR EXISTS (SELECT 1 FROM public.roles WHERE name = v_tag || '-locations') THEN
    RAISE EXCEPTION 'P-2 (c) M-3c-b part 4 proof: the scratch rows outlived the sentinel';
  END IF;
END;
$proof$;

-- ------------------------------------------------------------ 3. CLOSERS
INSERT INTO public.migration_marks (version) VALUES ('20261109070300') ON CONFLICT DO NOTHING;
