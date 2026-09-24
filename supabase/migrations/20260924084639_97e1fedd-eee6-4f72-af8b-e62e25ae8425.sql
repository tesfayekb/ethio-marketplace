-- D37-1 finder publication hooks
CREATE OR REPLACE FUNCTION public.catalog_find_refresh_after_publish()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  PERFORM public.catalog_find_rebuild();
  RETURN NULL;
END
$$;
REVOKE ALL ON FUNCTION public.catalog_find_refresh_after_publish() FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.catalog_find_refresh_after_publish() TO service_role;

CREATE TRIGGER catalog_find_categories_published
AFTER INSERT OR UPDATE OR DELETE ON public.categories
FOR EACH STATEMENT EXECUTE FUNCTION public.catalog_find_refresh_after_publish();

CREATE TRIGGER catalog_find_category_links_published
AFTER INSERT OR UPDATE OR DELETE ON public.category_attribute_links
FOR EACH STATEMENT EXECUTE FUNCTION public.catalog_find_refresh_after_publish();

CREATE TRIGGER catalog_find_entity_translations_published
AFTER INSERT OR UPDATE OR DELETE ON public.entity_translations
FOR EACH STATEMENT EXECUTE FUNCTION public.catalog_find_refresh_after_publish();

DO $$
BEGIN
  IF (SELECT count(*) FROM pg_trigger WHERE NOT tgisinternal AND tgname IN ('catalog_find_categories_published','catalog_find_category_links_published','catalog_find_entity_translations_published')) <> 3 THEN
    RAISE EXCEPTION 'READBACK: finder publication hooks incomplete';
  END IF;
END
$$;

INSERT INTO public.migration_marks(version) VALUES ('20260924023000') ON CONFLICT DO NOTHING;