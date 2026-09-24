-- D37-1 publication call sites: defer one rebuild at transaction commit
CREATE OR REPLACE FUNCTION public.catalog_find_schedule_rebuild()
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
REVOKE ALL ON FUNCTION public.catalog_find_schedule_rebuild() FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.catalog_find_schedule_rebuild() TO service_role;

CREATE CONSTRAINT TRIGGER catalog_find_categories_publish
AFTER INSERT OR UPDATE OR DELETE ON public.categories
DEFERRABLE INITIALLY DEFERRED
FOR EACH ROW EXECUTE FUNCTION public.catalog_find_schedule_rebuild();

CREATE CONSTRAINT TRIGGER catalog_find_links_publish
AFTER INSERT OR UPDATE OR DELETE ON public.category_attribute_links
DEFERRABLE INITIALLY DEFERRED
FOR EACH ROW EXECUTE FUNCTION public.catalog_find_schedule_rebuild();

CREATE CONSTRAINT TRIGGER catalog_find_entity_translation_publish
AFTER INSERT OR UPDATE OR DELETE ON public.entity_translations
DEFERRABLE INITIALLY DEFERRED
FOR EACH ROW EXECUTE FUNCTION public.catalog_find_schedule_rebuild();

DO $$
BEGIN
 IF (SELECT count(*) FROM pg_trigger WHERE NOT tgisinternal AND tgname IN ('catalog_find_categories_publish','catalog_find_links_publish','catalog_find_entity_translation_publish') AND tgdeferrable AND tginitdeferred) <> 3 THEN
  RAISE EXCEPTION 'READBACK: deferred finder publication hooks incomplete';
 END IF;
END
$$;

INSERT INTO public.migration_marks(version) VALUES ('20260924025000') ON CONFLICT DO NOTHING;