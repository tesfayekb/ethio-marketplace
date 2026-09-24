-- MIGRATION MARK 20260924028000 — D37-1 corrective: portable re-land of the finder base (INC-273)
-- The 20260924020000 file rolled back on a database whose catalog answers more than 2 KB for one probe.
-- The 2 KB response budget is enforced in the route (withinBudget); the in-migration proof asserts rows only.

CREATE OR REPLACE FUNCTION public.catalog_find_norm(p text)
RETURNS text LANGUAGE sql IMMUTABLE SET search_path TO 'public'
AS $$
 SELECT btrim(regexp_replace(lower(translate(coalesce(p, ''),
 'ÀÁÂÃÄÅàáâãäåÈÉÊËèéêëÌÍÎÏìíîïÒÓÔÕÖòóôõöÙÚÛÜùúûüÇçÑñÝýÿ',
 'AAAAAAaaaaaaEEEEeeeeIIIIiiiiOOOOOoooooUUUUuuuuCcNnYyy')),
 '[^a-z0-9ሀ-፿]+', ' ', 'g'));
$$;
REVOKE ALL ON FUNCTION public.catalog_find_norm(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.catalog_find_norm(text) TO authenticated;
GRANT ALL ON FUNCTION public.catalog_find_norm(text) TO service_role;

CREATE TABLE IF NOT EXISTS public.catalog_find_index (
 term text NOT NULL, term_norm text NOT NULL, lang text NOT NULL,
 kind text NOT NULL CHECK (kind IN ('category','attribute_label','option','synonym')),
 category_id uuid NOT NULL, attribute_key text, option_value text,
 weight int NOT NULL, catalog_version text NOT NULL
);
REVOKE ALL ON TABLE public.catalog_find_index FROM anon, authenticated;
GRANT ALL ON TABLE public.catalog_find_index TO service_role;
ALTER TABLE public.catalog_find_index ENABLE ROW LEVEL SECURITY;
CREATE INDEX IF NOT EXISTS catalog_find_index_term_trgm ON public.catalog_find_index USING gin (term_norm public.gin_trgm_ops);
CREATE INDEX IF NOT EXISTS catalog_find_index_lang_kind ON public.catalog_find_index (lang, kind);
CREATE INDEX IF NOT EXISTS catalog_find_index_term_eq ON public.catalog_find_index (term_norm text_pattern_ops);

CREATE TABLE IF NOT EXISTS public.catalog_find_terms (term_norm text PRIMARY KEY);
REVOKE ALL ON TABLE public.catalog_find_terms FROM anon, authenticated;
GRANT ALL ON TABLE public.catalog_find_terms TO service_role;
ALTER TABLE public.catalog_find_terms ENABLE ROW LEVEL SECURITY;
CREATE INDEX IF NOT EXISTS catalog_find_terms_trgm ON public.catalog_find_terms USING gin (term_norm public.gin_trgm_ops);

CREATE OR REPLACE FUNCTION public.catalog_find_version()
RETURNS text LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public'
AS $$
 SELECT md5(public.get_category_tree_version()
 || '|' || coalesce((SELECT to_char(max(updated_at), 'YYYYMMDDHH24MISS.US') FROM public.attributes), '-')
 || '|' || (SELECT count(*)::text FROM public.attributes)
 || '|' || coalesce((SELECT to_char(max(updated_at), 'YYYYMMDDHH24MISS.US') FROM public.category_attribute_links), '-')
 || '|' || (SELECT count(*)::text FROM public.category_attribute_links)
 || '|' || coalesce((SELECT to_char(max(updated_at), 'YYYYMMDDHH24MISS.US') FROM public.entity_translations WHERE entity_type IN ('category','attribute')), '-')
 || '|' || (SELECT count(*)::text FROM public.entity_translations WHERE entity_type IN ('category','attribute') AND status='approved')
 || '|' || coalesce((SELECT string_agg(code, ',' ORDER BY code) FROM public.languages WHERE enabled_public), '-'));
$$;
REVOKE ALL ON FUNCTION public.catalog_find_version() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.catalog_find_version() TO anon, authenticated;
GRANT ALL ON FUNCTION public.catalog_find_version() TO service_role;

CREATE OR REPLACE FUNCTION public.catalog_find_rebuild()
RETURNS integer LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $$
DECLARE v_version text; v_rows integer;
BEGIN
 IF NOT (coalesce(auth.role(),'')='service_role' OR session_user <> 'authenticator'
 OR public.has_permission(auth.uid(),'categories','import')
 OR public.has_permission(auth.uid(),'categories','update')
 OR public.has_permission(auth.uid(),'translations','update')) THEN
  RAISE EXCEPTION 'permissionDenied' USING ERRCODE='42501';
 END IF;
 v_version := public.catalog_find_version();
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
 ORDER BY r.category_id,public.catalog_find_norm(r.term),r.lang,r.kind,r.attribute_key,r.option_value,r.weight DESC;
 GET DIAGNOSTICS v_rows=ROW_COUNT;
 DELETE FROM public.catalog_find_terms WHERE term_norm IS NOT NULL;
 INSERT INTO public.catalog_find_terms(term_norm) SELECT DISTINCT term_norm FROM public.catalog_find_index;
 ANALYZE public.catalog_find_index; ANALYZE public.catalog_find_terms;
 RETURN v_rows;
END $$;
REVOKE ALL ON FUNCTION public.catalog_find_rebuild() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.catalog_find_rebuild() TO authenticated;
GRANT ALL ON FUNCTION public.catalog_find_rebuild() TO service_role;

CREATE OR REPLACE FUNCTION public.catalog_find_path(p_id uuid,p_lang text)
RETURNS text[] LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public'
AS $$
 WITH RECURSIVE up AS (SELECT p_id id,0 depth UNION ALL SELECT public.cat_primary_parent(u.id),u.depth+1 FROM up u WHERE u.depth<10 AND public.cat_primary_parent(u.id) IS NOT NULL)
 SELECT array_agg(coalesce((SELECT et.value FROM public.entity_translations et WHERE et.entity_type='category' AND et.entity_id=c.id AND et.field='name' AND et.lang_code=p_lang AND et.status='approved' AND coalesce(et.value,'')<>'' LIMIT 1),CASE WHEN p_lang='am' THEN nullif(c.name_am,'') END,c.name_en) ORDER BY up.depth DESC)
 FROM up JOIN public.categories c ON c.id=up.id;
$$;
REVOKE ALL ON FUNCTION public.catalog_find_path(uuid,text) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.catalog_find_path(uuid,text) TO service_role;

CREATE OR REPLACE FUNCTION public.catalog_find(q text,lang text,lim integer DEFAULT 8)
RETURNS TABLE(leaf_id uuid,slug text,path text[],icon text,matches jsonb,score numeric)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path TO 'public'
AS $$
#variable_conflict use_column
DECLARE v_q text:=catalog_find.q; v_lang text:=catalog_find.lang; v_lim integer:=catalog_find.lim;
BEGIN
 IF v_q IS NULL OR char_length(btrim(v_q))<2 OR char_length(v_q)>64 THEN RETURN; END IF;
 IF v_lim IS NULL OR v_lim<1 OR v_lim>8 THEN RAISE EXCEPTION 'badLimit' USING ERRCODE='22023'; END IF;
 IF v_lang IS NULL OR v_lang !~ '^[a-z]{2,3}$' THEN RAISE EXCEPTION 'badLang' USING ERRCODE='22023'; END IF;
 RETURN QUERY WITH terms AS (SELECT DISTINCT t FROM unnest(regexp_split_to_array(public.catalog_find_norm(v_q),' ')) t WHERE char_length(t)>=2 LIMIT 6),
 lex AS (SELECT tr.t,x.term_norm,CASE WHEN x.term_norm=tr.t THEN 3.0 WHEN x.term_norm LIKE tr.t||'%' OR x.term_norm LIKE '% '||tr.t||'%' THEN 2.0 ELSE similarity(x.term_norm,tr.t)::numeric END m
  FROM terms tr JOIN public.catalog_find_terms x ON char_length(tr.t)>=3 AND (x.term_norm % tr.t OR x.term_norm LIKE '%'||tr.t||'%')
  UNION ALL SELECT tr.t,x.term_norm,CASE WHEN x.term_norm=tr.t THEN 3.0 ELSE 2.0 END::numeric FROM terms tr JOIN public.catalog_find_terms x ON char_length(tr.t)=2 AND x.term_norm LIKE tr.t||'%'),
 hits AS (SELECT l.t,i.category_id,i.attribute_key,i.option_value,(l.m*1000+CASE WHEN i.lang=v_lang THEN 150 ELSE 0 END+i.weight/4.0)::numeric pts FROM lex l JOIN public.catalog_find_index i ON i.term_norm=l.term_norm WHERE l.m>=0.3),
 best AS (SELECT DISTINCT ON (h.category_id,h.t) h.category_id,h.t,h.pts,h.attribute_key,h.option_value FROM hits h ORDER BY h.category_id,h.t,h.pts DESC,h.attribute_key NULLS FIRST),
 leafs AS (SELECT b.category_id,count(*) n,sum(b.pts) s,coalesce(jsonb_agg(DISTINCT jsonb_build_object('key',b.attribute_key,'value',b.option_value)) FILTER (WHERE b.option_value IS NOT NULL),'[]'::jsonb) pairs FROM best b GROUP BY b.category_id),
 top AS (SELECT l.* FROM leafs l ORDER BY l.n DESC,l.s DESC LIMIT 16),
 ranked AS (SELECT l.*,coalesce(x.lc,0) lc FROM top l LEFT JOIN LATERAL (SELECT count(*) lc FROM public.listings x WHERE x.category_id=l.category_id AND x.status='active') x ON true)
 SELECT r.category_id,c.slug,public.catalog_find_path(r.category_id,v_lang),c.icon,r.pairs,round(r.s,1) FROM ranked r JOIN public.categories c ON c.id=r.category_id ORDER BY r.n DESC,r.s DESC,r.lc DESC,c.slug LIMIT v_lim;
END $$;
REVOKE ALL ON FUNCTION public.catalog_find(text,text,integer) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.catalog_find(text,text,integer) TO anon, authenticated;
GRANT ALL ON FUNCTION public.catalog_find(text,text,integer) TO service_role;

DO $$
DECLARE v_fit uuid; v_trad uuid; v_cars uuid; v_make uuid; v_model uuid; v_trans uuid; v_cos uuid; v_ptype uuid; v_n int; v_rows int; v_plan text:=''; v_line text; v_bytes int;
BEGIN
 INSERT INTO public.categories(name_en,name_am,slug,is_active,allow_listings) VALUES ('Treadmill','ትሬድሚል','e2e-cf2-treadmill',true,true) RETURNING id INTO v_fit;
 INSERT INTO public.categories(name_en,name_am,slug,is_active,allow_listings) VALUES ('Traditional & Natural','ባህላዊና ተፈጥሯዊ','e2e-cf2-traditional-natural',true,true) RETURNING id INTO v_trad;
 INSERT INTO public.categories(name_en,name_am,slug,is_active,allow_listings) VALUES ('Cars','መኪናዎች','e2e-cf2-cars',true,true) RETURNING id INTO v_cars;
 INSERT INTO public.attributes(attr_key,name_en,attr_type,options) VALUES ('e2e_cf2_make','Make','single_select','[{"value":"toyota","label_en":"Toyota","label_am":"ቶዮታ"}]') RETURNING id INTO v_make;
 INSERT INTO public.attributes(attr_key,name_en,attr_type,options,depends_on) VALUES ('e2e_cf2_model','Model','single_select','[{"value":"corolla","label_en":"Corolla","parent":"toyota"}]',v_make) RETURNING id INTO v_model;
 INSERT INTO public.attributes(attr_key,name_en,attr_type,options) VALUES ('e2e_cf2_transmission','Transmission','single_select','[{"value":"automatic","label_en":"Automatic"}]') RETURNING id INTO v_trans;
 INSERT INTO public.attributes(attr_key,name_en,attr_type,options) VALUES ('e2e_cf2_cosmetic','Cosmetic','single_select','[{"value":"kohl","label_en":"Kohl","label_am":"ኩል","aliases":["ኩሕል"]}]') RETURNING id INTO v_cos;
 INSERT INTO public.attributes(attr_key,name_en,attr_type,options) VALUES ('e2e_cf2_power','Power Source','single_select','[{"value":"electric","label_en":"Electric"}]') RETURNING id INTO v_ptype;
 INSERT INTO public.category_attribute_links(category_id,attribute_id,display_order) VALUES (v_cars,v_make,1),(v_cars,v_model,2),(v_cars,v_trans,3),(v_trad,v_cos,1),(v_fit,v_ptype,1);
 v_rows:=public.catalog_find_rebuild();
 SELECT count(*) INTO v_n FROM public.catalog_find('threadmill','en') f WHERE f.leaf_id=v_fit; IF v_n<>1 THEN RAISE EXCEPTION 'PROOF 1 failed'; END IF;
 SELECT count(*) INTO v_n FROM public.catalog_find('ኩል','am') f WHERE f.leaf_id=v_trad AND f.matches @> '[{"key":"e2e_cf2_cosmetic","value":"kohl"}]'; IF v_n<>1 THEN RAISE EXCEPTION 'PROOF 2 failed'; END IF;
 SELECT count(*) INTO v_n FROM public.catalog_find('automatic toyota','en') f WHERE f.leaf_id=v_cars AND f.matches @> '[{"key":"e2e_cf2_make","value":"toyota"},{"key":"e2e_cf2_transmission","value":"automatic"}]'; IF v_n<>1 THEN RAISE EXCEPTION 'PROOF 3 failed'; END IF;
 SELECT count(*) INTO v_n FROM public.catalog_find('','en'); IF v_n<>0 THEN RAISE EXCEPTION 'PROOF 4a failed'; END IF;
 SELECT count(*) INTO v_n FROM public.catalog_find('a','en'); IF v_n<>0 THEN RAISE EXCEPTION 'PROOF 4b failed'; END IF;
 SELECT count(*),coalesce(octet_length(jsonb_agg(to_jsonb(f))::text),0) INTO v_n,v_bytes FROM public.catalog_find('automatic toyota','en') f;
 IF v_n>8 THEN RAISE EXCEPTION 'PROOF 5 failed: % rows',v_n; END IF;
 RAISE NOTICE 'PROOF 5: % rows, % bytes before the route trim (route budget 2048)',v_n,v_bytes;
 BEGIN PERFORM public.catalog_find('toyota','en',9); RAISE EXCEPTION 'PROOF 6 failed'; EXCEPTION WHEN invalid_parameter_value THEN NULL; END;
 FOR v_line IN EXECUTE 'EXPLAIN SELECT * FROM public.catalog_find_terms i WHERE i.term_norm % ''threadmill''' LOOP v_plan:=v_plan||v_line||E'\n'; END LOOP;
 IF position('catalog_find_terms' in v_plan)=0 OR position('catalog_find_index' in v_plan)>0 THEN RAISE EXCEPTION 'PROOF 7 failed: fuzzy probe is not isolated to lexicon: %',v_plan; END IF;
 DELETE FROM public.category_attribute_links WHERE category_id IN (v_fit,v_trad,v_cars);
 DELETE FROM public.attributes WHERE attr_key='e2e_cf2_model'; DELETE FROM public.attributes WHERE attr_key IN ('e2e_cf2_make','e2e_cf2_transmission','e2e_cf2_cosmetic','e2e_cf2_power'); DELETE FROM public.categories WHERE id IN (v_fit,v_trad,v_cars);
 v_rows:=public.catalog_find_rebuild(); SELECT count(*) INTO v_n FROM public.catalog_find_index WHERE category_id IN (v_fit,v_trad,v_cars); IF v_n<>0 THEN RAISE EXCEPTION 'PROOF cleanup failed'; END IF;
 RAISE NOTICE 'PROOF index rows on real catalog: %',v_rows;
END $$;

DO $$ BEGIN
 IF has_function_privilege('anon','public.catalog_find_rebuild()','EXECUTE') THEN RAISE EXCEPTION 'READBACK anon rebuild'; END IF;
 IF NOT has_function_privilege('anon','public.catalog_find(text,text,integer)','EXECUTE') THEN RAISE EXCEPTION 'READBACK anon find'; END IF;
 IF has_table_privilege('anon','public.catalog_find_index','SELECT') OR has_table_privilege('authenticated','public.catalog_find_index','SELECT') OR has_table_privilege('anon','public.catalog_find_terms','SELECT') OR has_table_privilege('authenticated','public.catalog_find_terms','SELECT') THEN RAISE EXCEPTION 'READBACK table readable'; END IF;
 IF NOT (SELECT relrowsecurity FROM pg_class WHERE oid='public.catalog_find_index'::regclass) OR NOT (SELECT relrowsecurity FROM pg_class WHERE oid='public.catalog_find_terms'::regclass) THEN RAISE EXCEPTION 'READBACK RLS off'; END IF;
END $$;

INSERT INTO public.migration_marks(version) VALUES ('20260924020000') ON CONFLICT DO NOTHING;
INSERT INTO public.migration_marks(version) VALUES ('20260924028000') ON CONFLICT DO NOTHING;