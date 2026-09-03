-- C5a PART A — storage access law for the category-assets bucket.
-- The bucket row itself is created by the platform storage tool (public buckets
-- are blocked by workspace policy, so it is PRIVATE; the read policy below is
-- the app-facing read path).

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'category-assets') THEN
    RAISE EXCEPTION 'C5a: bucket category-assets missing — create it with the storage tool first';
  END IF;
END $$;

DROP POLICY IF EXISTS "category_assets_public_read" ON storage.objects;
CREATE POLICY "category_assets_public_read"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'category-assets');

DROP POLICY IF EXISTS "category_assets_service_insert" ON storage.objects;
CREATE POLICY "category_assets_service_insert"
  ON storage.objects FOR INSERT
  TO service_role
  WITH CHECK (bucket_id = 'category-assets');

DROP POLICY IF EXISTS "category_assets_service_update" ON storage.objects;
CREATE POLICY "category_assets_service_update"
  ON storage.objects FOR UPDATE
  TO service_role
  USING (bucket_id = 'category-assets')
  WITH CHECK (bucket_id = 'category-assets');

DROP POLICY IF EXISTS "category_assets_service_delete" ON storage.objects;
CREATE POLICY "category_assets_service_delete"
  ON storage.objects FOR DELETE
  TO service_role
  USING (bucket_id = 'category-assets');

-- ---- PROOFS (in-file, fail the migration if the law is not what we declared)
DO $$
DECLARE
  v_read int;
  v_write int;
  v_anon_write int;
BEGIN
  SELECT count(*) INTO v_read
    FROM pg_policies
   WHERE schemaname = 'storage' AND tablename = 'objects'
     AND policyname = 'category_assets_public_read'
     AND cmd = 'SELECT' AND 'anon' = ANY (roles);
  IF v_read <> 1 THEN RAISE EXCEPTION 'C5a proof 1 failed: public read policy absent'; END IF;

  SELECT count(*) INTO v_write
    FROM pg_policies
   WHERE schemaname = 'storage' AND tablename = 'objects'
     AND policyname IN ('category_assets_service_insert',
                        'category_assets_service_update',
                        'category_assets_service_delete')
     AND roles = ARRAY['service_role']::name[];
  IF v_write <> 3 THEN RAISE EXCEPTION 'C5a proof 2 failed: service-role write policies = %', v_write; END IF;

  SELECT count(*) INTO v_anon_write
    FROM pg_policies
   WHERE schemaname = 'storage' AND tablename = 'objects'
     AND cmd IN ('INSERT','UPDATE','DELETE')
     AND ('anon' = ANY (roles) OR 'public' = ANY (roles))
     AND qual IS NOT DISTINCT FROM qual
     AND (coalesce(qual,'') || coalesce(with_check,'')) LIKE '%category-assets%';
  IF v_anon_write <> 0 THEN RAISE EXCEPTION 'C5a proof 3 failed: anon write path exists'; END IF;
END $$;

INSERT INTO public.migration_marks(version) VALUES ('20260904090000') ON CONFLICT DO NOTHING;