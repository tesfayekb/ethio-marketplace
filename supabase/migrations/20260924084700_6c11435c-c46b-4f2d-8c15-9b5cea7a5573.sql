-- D37-1 corrective: refresh once at publish call sites, not per statement
DROP TRIGGER IF EXISTS catalog_find_categories_published ON public.categories;
DROP TRIGGER IF EXISTS catalog_find_category_links_published ON public.category_attribute_links;
DROP TRIGGER IF EXISTS catalog_find_entity_translations_published ON public.entity_translations;
DROP FUNCTION IF EXISTS public.catalog_find_refresh_after_publish();

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_trigger WHERE NOT tgisinternal AND tgname LIKE 'catalog_find_%_published') THEN
    RAISE EXCEPTION 'READBACK: per-statement finder hook remains';
  END IF;
END
$$;

INSERT INTO public.migration_marks(version) VALUES ('20260924024000') ON CONFLICT DO NOTHING;