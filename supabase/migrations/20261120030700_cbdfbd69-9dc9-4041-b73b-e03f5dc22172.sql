-- e2e-areas: admin-categories, admin-attributes

-- Foundations 1, turn F1-7b, part 8 of 8 — READ RULES NOTHING NEEDS (DEC-333, INC-1166; brief
-- docs/governance/briefs/f1-doors-7b.md; census docs/governance/reports/f1-doors-7b.census.md).
-- * attributes.attributes_public_read and category_attribute_links.cal_public_read (SELECT, anon and authenticated,
--   USING (true)) are dropped: neither browser role holds SELECT on either table, so neither rule admits a row today;
--   what the drop stops: the day a SELECT grant reached either table, the whole table would open to every visitor.
--   Each table keeps row security and its three deny rules; the service role and the definer readers read as before.
-- * category_attributes: the census found no reader through the browser roles (src none; e2e only the service client;
--   SQL readers admin_delete_category_core, under its definer door, and get_category_attributes, closed in F1-7a), so
--   its SELECT grants to anon and authenticated (the table's and its column grants) and category_attributes_public_read
--   leave; what that stops: a visitor or member reading the legacy per-category attribute rows straight from the data
--   API, which no screen does. Row security stays on; the service role keeps every privilege.

DO $pre$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261120050600') THEN
    RAISE EXCEPTION 'F1-7b part 8: part 7 (002796c4) must be applied first';
  END IF;
  IF (SELECT count(*) FROM pg_policies
       WHERE schemaname = 'public' AND cmd = 'SELECT' AND qual = 'true' AND roles = ARRAY['anon', 'authenticated']::name[]
         AND (tablename, policyname) IN (('attributes', 'attributes_public_read'),
                                         ('category_attribute_links', 'cal_public_read'),
                                         ('category_attributes', 'category_attributes_public_read'))) <> 3 THEN
    RAISE EXCEPTION 'F1-7b part 8: the three read rules are not as the census read them';
  END IF;
  IF has_table_privilege('anon', 'public.attributes', 'SELECT')
     OR has_table_privilege('authenticated', 'public.attributes', 'SELECT')
     OR has_table_privilege('anon', 'public.category_attribute_links', 'SELECT')
     OR has_table_privilege('authenticated', 'public.category_attribute_links', 'SELECT')
     OR NOT has_table_privilege('anon', 'public.category_attributes', 'SELECT')
     OR NOT has_table_privilege('authenticated', 'public.category_attributes', 'SELECT') THEN
    RAISE EXCEPTION 'F1-7b part 8: the three tables'' grants are not as the census read them';
  END IF;
END $pre$;

DROP POLICY attributes_public_read ON public.attributes;
DROP POLICY cal_public_read ON public.category_attribute_links;
DROP POLICY category_attributes_public_read ON public.category_attributes;
REVOKE SELECT ON public.category_attributes FROM anon, authenticated;

-- PROOFS:
-- (a) the three rules are gone; each table keeps row security; attributes and category_attribute_links keep their
--     three deny rules each.
-- (b) neither browser role may SELECT any of the three tables, by the table or by any column, nor write
--     category_attributes; the service role keeps SELECT on all three.
DO $proof$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_policies
              WHERE schemaname = 'public'
                AND policyname IN ('attributes_public_read', 'cal_public_read', 'category_attributes_public_read'))
     OR (SELECT count(*) FROM pg_class
          WHERE relnamespace = 'public'::regnamespace AND relrowsecurity
            AND relname IN ('attributes', 'category_attribute_links', 'category_attributes')) <> 3
     OR (SELECT count(*) FROM pg_policies
          WHERE schemaname = 'public' AND tablename IN ('attributes', 'category_attribute_links')
            AND policyname IN ('attributes_no_client_delete', 'attributes_no_client_insert', 'attributes_no_client_update',
                               'cal_no_client_delete', 'cal_no_client_insert', 'cal_no_client_update')) <> 6 THEN
    RAISE EXCEPTION 'F1-7b part 8 proof (a): the read rules or row security differ';
  END IF;
  IF has_table_privilege('anon', 'public.category_attributes', 'SELECT')
     OR has_table_privilege('authenticated', 'public.category_attributes', 'SELECT')
     OR has_any_column_privilege('anon', 'public.category_attributes', 'SELECT')
     OR has_any_column_privilege('authenticated', 'public.category_attributes', 'SELECT')
     OR has_table_privilege('authenticated', 'public.category_attributes', 'INSERT, UPDATE, DELETE')
     OR has_any_column_privilege('anon', 'public.attributes', 'SELECT')
     OR has_any_column_privilege('authenticated', 'public.attributes', 'SELECT')
     OR has_any_column_privilege('anon', 'public.category_attribute_links', 'SELECT')
     OR has_any_column_privilege('authenticated', 'public.category_attribute_links', 'SELECT')
     OR NOT has_table_privilege('service_role', 'public.category_attributes', 'SELECT')
     OR NOT has_table_privilege('service_role', 'public.attributes', 'SELECT')
     OR NOT has_table_privilege('service_role', 'public.category_attribute_links', 'SELECT') THEN
    RAISE EXCEPTION 'F1-7b part 8 proof (b): a browser role still reads one of the three tables, or the service role lost one';
  END IF;
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261120050700') ON CONFLICT DO NOTHING;
