-- D37-1 publication refresh deduplication
CREATE OR REPLACE FUNCTION public.catalog_find_schedule_rebuild()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public', 'pg_temp'
AS $$
BEGIN
  CREATE TEMP TABLE IF NOT EXISTS catalog_find_refresh_once (done boolean PRIMARY KEY) ON COMMIT DROP;
  IF EXISTS (SELECT 1 FROM catalog_find_refresh_once WHERE done) THEN RETURN NULL; END IF;
  INSERT INTO catalog_find_refresh_once(done) VALUES (true);
  PERFORM public.catalog_find_rebuild();
  RETURN NULL;
END
$$;
REVOKE ALL ON FUNCTION public.catalog_find_schedule_rebuild() FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.catalog_find_schedule_rebuild() TO service_role;

DO $$
BEGIN
  IF position('catalog_find_refresh_once' in pg_get_functiondef('public.catalog_find_schedule_rebuild()'::regprocedure)) = 0 THEN
    RAISE EXCEPTION 'READBACK: publication rebuild is not transaction-deduplicated';
  END IF;
END
$$;

INSERT INTO public.migration_marks(version) VALUES ('20260924026000') ON CONFLICT DO NOTHING;