-- MIGRATION MARK 20260924121000 — INC-273: a rebuild that waited on the finder lock reuses the rebuild it waited for.
-- catalog_find_refresh re-declared WHOLE; only the lock acquisition and skip condition change.
CREATE OR REPLACE FUNCTION public.catalog_find_refresh(p_force boolean)
RETURNS integer LANGUAGE plpgsql VOLATILE SECURITY DEFINER SET search_path TO 'public'
AS $$
DECLARE v_version text; v_rows integer; v_waited boolean;
BEGIN
 v_waited := NOT pg_try_advisory_xact_lock(hashtext('catalog_find_rebuild')::bigint);
 IF v_waited THEN PERFORM pg_advisory_xact_lock(hashtext('catalog_find_rebuild')::bigint); END IF;
 IF current_setting('catalog_find.fail_test', true) = '1' THEN
  RAISE EXCEPTION 'catalog_find_refresh: injected failure';
 END IF;
 v_version := public.catalog_find_version();
 IF (NOT p_force OR v_waited) AND EXISTS (SELECT 1 FROM public.catalog_find_index WHERE catalog_version = v_version) THEN
  RETURN -1;
 END IF;
 DELETE FROM public.catalog_find_index WHERE term_norm IS NOT NULL;
 WITH RECURSIVE
 pub AS (SELECT code FROM public.languages WHERE enabled_public),
 leaf AS (SELECT c.id FROM public.categories c WHERE c.is_active AND c.allow_listings AND NOT EXISTS
   (SELECT 1 FROM public.category_tree_pointers p JOIN public.categories k ON k.id=p.child_id AND k.is_active WHERE p.parent_id=c.id)),
 anc AS (SELECT l.id leaf_id,l.id cat_id,0 depth FROM leaf l UNION ALL
   SELECT a.leaf_id,public.cat_primary_parent(a.cat_id),a.depth+1 FROM anc a WHERE a.depth<10 AND public.cat_primary_parent(a.cat_id) IS NOT NULL),
 cname AS (SELECT id cat_id,'en' lang,name_en term FROM public.categories
   UNION ALL SELECT id,'am',name_am FROM public.categories WHERE coalesce(name_am,'')<>''
   UNION ALL SELECT entity_id,lang_code,value FROM public.entity_translations WHERE entity_type='category' AND field='name' AND status='approved' AND coalesce(value,'')<>''),
 links AS (SELECT l.id leaf_id,e.attribute_id,e.link_id FROM leaf l CROSS JOIN LATERAL public.effective_category_links(l.id) e),
 attr AS (SELECT a.*,(a.depends_on IS NOT NULL OR EXISTS (SELECT 1 FROM public.attributes b WHERE b.depends_on=a.id)
   OR EXISTS (SELECT 1 FROM jsonb_array_elements(CASE WHEN jsonb_typeof(a.options)='array' THEN a.options ELSE '[]'::jsonb END) o WHERE o.value ? 'facts' OR o.value ? 'allowed')) is_fold FROM public.attributes a),
 alabel AS (SELECT id attribute_id,'en' lang,name_en term FROM public.attributes
   UNION ALL SELECT id,'am',name_am FROM public.attributes WHERE coalesce(name_am,'')<>''
   UNION ALL SELECT entity_id,lang_code,value FROM public.entity_translations WHERE entity_type='attribute' AND field='label' AND status='approved' AND coalesce(value,'')<>''),
 opt AS (SELECT lk.leaf_id,a.attr_key,a.is_fold,o.value rec FROM links lk JOIN attr a ON a.id=lk.attribute_id JOIN public.category_attribute_links cl ON cl.id=lk.link_id
   CROSS JOIN LATERAL jsonb_array_elements(CASE WHEN jsonb_typeof(a.options)='array' THEN a.options ELSE '[]'::jsonb END) o
   WHERE coalesce((o.value->>'active')::boolean,true) AND coalesce(o.value->>'value','')<>'' AND (cl.allowed_options IS NULL OR (o.value->>'value')=ANY(cl.allowed_options))),
 oterm AS (SELECT leaf_id,attr_key,is_fold,rec->>'value' val,'en' lang,rec->>'label_en' term FROM opt
   UNION ALL SELECT leaf_id,attr_key,is_fold,rec->>'value','am',rec->>'label_am' FROM opt
   UNION ALL SELECT leaf_id,attr_key,is_fold,rec->>'value',CASE WHEN al ~ '[ሀ-፿]' THEN 'am' ELSE 'en' END,al FROM opt
    CROSS JOIN LATERAL jsonb_array_elements_text(CASE WHEN jsonb_typeof(rec->'aliases')='array' THEN rec->'aliases' ELSE '[]'::jsonb END) al),
 allrows AS (
  SELECT n.term,n.lang,'category'::text kind,a.leaf_id category_id,NULL::text attribute_key,NULL::text option_value,CASE WHEN a.depth=0 THEN 400 ELSE greatest(200-a.depth*10,100) END weight FROM anc a JOIN cname n ON n.cat_id=a.cat_id
  UNION ALL SELECT l.term,l.lang,'attribute_label',lk.leaf_id,a.attr_key,NULL,150 FROM links lk JOIN attr a ON a.id=lk.attribute_id JOIN alabel l ON l.attribute_id=a.id
  UNION ALL SELECT a.unit,'en','attribute_label',lk.leaf_id,a.attr_key,NULL,120 FROM links lk JOIN attr a ON a.id=lk.attribute_id WHERE a.attr_type='number' AND coalesce(a.unit,'')<>''
  UNION ALL SELECT t.term,t.lang,'option',t.leaf_id,t.attr_key,t.val,CASE WHEN t.is_fold THEN 300 ELSE 200 END FROM oterm t WHERE coalesce(t.term,'')<>'')
 INSERT INTO public.catalog_find_index(term,term_norm,lang,kind,category_id,attribute_key,option_value,weight,catalog_version)
 SELECT DISTINCT ON (r.category_id,public.catalog_find_norm(r.term),r.lang,r.kind,r.attribute_key,r.option_value)
 r.term,public.catalog_find_norm(r.term),r.lang,r.kind,r.category_id,r.attribute_key,r.option_value,r.weight,v_version FROM allrows r
 WHERE r.lang IN (SELECT code FROM pub) AND public.catalog_find_norm(r.term)<>''
 ORDER BY r.category_id,public.catalog_find_norm(r.term),r.lang,r.kind,r.attribute_key,r.option_value,r.weight DESC
 ON CONFLICT DO NOTHING;
 GET DIAGNOSTICS v_rows=ROW_COUNT;
 DELETE FROM public.catalog_find_terms WHERE term_norm IS NOT NULL;
 INSERT INTO public.catalog_find_terms(term_norm) SELECT DISTINCT term_norm FROM public.catalog_find_index ON CONFLICT DO NOTHING;
 ANALYZE public.catalog_find_index; ANALYZE public.catalog_find_terms;
 RETURN v_rows;
END $$;
REVOKE ALL ON FUNCTION public.catalog_find_refresh(boolean) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.catalog_find_refresh(boolean) TO service_role;

DO $$
DECLARE v_r int; v_ver text;
BEGIN
 -- An uncontended forced rebuild still rebuilds; a non-forced call on a current index does not.
 v_r := public.catalog_find_refresh(true);
 IF v_r < 1 THEN RAISE EXCEPTION 'PROOF 1 failed: forced uncontended rebuild skipped'; END IF;
 IF public.catalog_find_refresh(false) <> -1 THEN RAISE EXCEPTION 'PROOF 2 failed: current index rebuilt'; END IF;
 v_ver := public.catalog_find_version();
 IF NOT EXISTS (SELECT 1 FROM public.catalog_find_index WHERE catalog_version=v_ver) THEN RAISE EXCEPTION 'PROOF 3 failed: index not current'; END IF;
 IF has_function_privilege('anon','public.catalog_find_refresh(boolean)','EXECUTE') OR has_function_privilege('authenticated','public.catalog_find_refresh(boolean)','EXECUTE') THEN RAISE EXCEPTION 'READBACK refresh exposed'; END IF;
END $$;

INSERT INTO public.migration_marks(version) VALUES ('20260924121000') ON CONFLICT DO NOTHING;