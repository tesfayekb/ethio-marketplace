-- Foundations turn D1, M7 — INC-939 (bucket allowlists read back) and INC-969 (the
-- category-assets public-read policy let any client list the bucket).
--   * The buckets' limits are operator-set on both projects (2026-10-28); this migration's proof
--     reads them back and refuses on any difference. The CI temporary backend's seed
--     (00000000000000_ci_local_buckets.sql in local-backend-proof.yml) carries the same values,
--     so the proof judges the same law on every backend.
--   * category_assets_public_read is narrowed to authenticated callers with
--     has_permission(auth.uid(), 'categories', 'assets') — the shape of the bucket's insert,
--     update and delete policies. Public object URLs need no SELECT policy. The only browser
--     lister is the staff prune (src/features/admin-categories/category-images-service.ts:165);
--     every e2e caller uses the service-role client, which bypasses RLS.

-- (a) INC-939 — the read-back, refusing on any difference.
DO $$
DECLARE
  v_limit bigint;
  v_mimes text[];
  v_public boolean;
BEGIN
  SELECT file_size_limit, allowed_mime_types, public INTO v_limit, v_mimes, v_public
    FROM storage.buckets WHERE id = 'category-assets';
  IF NOT FOUND THEN RAISE EXCEPTION 'M7 (INC-939): bucket category-assets is missing'; END IF;
  IF v_limit IS DISTINCT FROM 10485760 OR v_mimes IS DISTINCT FROM '{image/png,image/webp}'::text[]
     OR v_public IS NOT TRUE THEN
    RAISE EXCEPTION 'M7 (INC-939): category-assets differs (limit %, mimes %, public %)', v_limit, v_mimes, v_public;
  END IF;
  SELECT file_size_limit, allowed_mime_types, public INTO v_limit, v_mimes, v_public
    FROM storage.buckets WHERE id = 'listing-photos';
  IF NOT FOUND THEN RAISE EXCEPTION 'M7 (INC-939): bucket listing-photos is missing'; END IF;
  IF v_limit IS DISTINCT FROM 1048576 OR v_mimes IS DISTINCT FROM '{image/jpeg,image/png,image/webp}'::text[]
     OR v_public IS NOT FALSE THEN
    RAISE EXCEPTION 'M7 (INC-939): listing-photos differs (limit %, mimes %, public %)', v_limit, v_mimes, v_public;
  END IF;
END $$;

-- (b) INC-969 — the narrowed read policy.
DROP POLICY IF EXISTS "category_assets_public_read" ON storage.objects;
CREATE POLICY "category_assets_public_read"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'category-assets'
    AND public.has_permission(auth.uid(), 'categories', 'assets')
  );

-- (c) Proof, on scratch rows only: an anon list sees nothing; a signed-in caller without the
-- permission sees nothing; a scratch staff caller's list sees the scratch object. The scratch
-- rows roll back with the proof's subtransaction (the ok sentinel) — storage.protect_delete
-- forbids a direct DELETE, and none is needed.
DO $$
DECLARE
  v_staff uuid := gen_random_uuid();
  v_plain uuid := gen_random_uuid();
  v_n     integer;
BEGIN
  BEGIN
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
      (v_staff, 'e2e-d1-m7-s-' || v_staff || '@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_plain, 'e2e-d1-m7-p-' || v_plain || '@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO public.user_roles (user_id, role_id, scope_type)
    SELECT v_staff, r.id, 'global' FROM public.roles r WHERE r.name = 'super_admin';
    INSERT INTO storage.objects (bucket_id, name) VALUES ('category-assets', 'e2e-mig-m7/probe.png');

    -- anon: no rows.
    EXECUTE 'SET LOCAL ROLE anon';
    PERFORM set_config('request.jwt.claims', '{}', true);
    SELECT count(*) INTO v_n FROM storage.objects
     WHERE bucket_id = 'category-assets' AND name = 'e2e-mig-m7/probe.png';
    IF v_n <> 0 THEN RAISE EXCEPTION 'M7 proof (INC-969): an anon list saw % row(s)', v_n; END IF;

    -- authenticated without the permission: no rows.
    EXECUTE 'SET LOCAL ROLE authenticated';
    PERFORM set_config('request.jwt.claims',
      json_build_object('sub', v_plain::text, 'role', 'authenticated')::text, true);
    SELECT count(*) INTO v_n FROM storage.objects
     WHERE bucket_id = 'category-assets' AND name = 'e2e-mig-m7/probe.png';
    IF v_n <> 0 THEN RAISE EXCEPTION 'M7 proof (INC-969): a caller without the permission saw % row(s)', v_n; END IF;

    -- staff: the scratch object is listed.
    PERFORM set_config('request.jwt.claims',
      json_build_object('sub', v_staff::text, 'role', 'authenticated')::text, true);
    SELECT count(*) INTO v_n FROM storage.objects
     WHERE bucket_id = 'category-assets' AND name = 'e2e-mig-m7/probe.png';
    IF v_n <> 1 THEN RAISE EXCEPTION 'M7 proof (INC-969): a staff list saw % row(s), expected 1', v_n; END IF;

    RAISE EXCEPTION 'd1-m7-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'd1-m7-proof-ok' THEN RAISE; END IF;
  END;
END $$;

INSERT INTO public.migration_marks (version) VALUES ('20261029180000');