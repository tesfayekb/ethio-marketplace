-- MIGRATION MARK 20260924120000 — INC-273: finder rebuild decoupled from every write path; lazy, serialized rebuild on stale read.
-- Removed save-path call sites: triggers catalog_find_categories_publish (categories),
-- catalog_find_links_publish (category_attribute_links), catalog_find_entity_translation_publish
-- (entity_translations) and their function catalog_find_schedule_rebuild(). Never wire a rebuild into a write path again.

DROP TRIGGER IF EXISTS catalog_find_categories_publish ON public.categories;
DROP TRIGGER IF EXISTS catalog_find_links_publish ON public.category_attribute_links;
DROP TRIGGER IF EXISTS catalog_find_entity_translation_publish ON public.entity_translations;
DROP FUNCTION IF EXISTS public.catalog_find_schedule_rebuild();

-- Internal, ungated body. Serialized by a transaction advisory lock; re-checks staleness after the lock so
-- waiters that arrive during a rebuild reuse it. DELETE (not TRUNCATE): TRUNCATE's ACCESS EXCLUSIVE lock would
-- deadlock against a concurrent reader already holding ACCESS SHARE while it waits on the advisory lock.
CREATE OR REPLACE FUNCTION public.catalog_find_refresh(p_force boolean)
RETURNS integer LANGUAGE plpgsql VOLATILE SECURITY DEFINER SET search_path TO 'public'
AS $$
DECLARE v_version text; v_rows integer;
BEGIN
 PERFORM pg_advisory_xact_lock(hashtext('catalog_find_rebuild')::bigint);
 IF current_setting('catalog_find.fail_test', true) = '1' THEN
  RAISE EXCEPTION 'catalog_find_refresh: injected failure';
 END IF;
 v_version := public.catalog_find_version();
 IF NOT p_force AND EXISTS (SELECT 1 FROM public.catalog_find_index WHERE catalog_version = v_version) THEN
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

-- Administrative repair door (gated, WHOLE): forced rebuild through the same serialized body.
CREATE OR REPLACE FUNCTION public.catalog_find_rebuild()
RETURNS integer LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $$
BEGIN
 IF NOT (coalesce(auth.role(),'')='service_role' OR session_user <> 'authenticator'
 OR public.has_permission(auth.uid(),'categories','import')
 OR public.has_permission(auth.uid(),'categories','update')
 OR public.has_permission(auth.uid(),'translations','update')) THEN
  RAISE EXCEPTION 'permissionDenied' USING ERRCODE='42501';
 END IF;
 RETURN public.catalog_find_refresh(true);
END $$;
REVOKE ALL ON FUNCTION public.catalog_find_rebuild() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.catalog_find_rebuild() TO authenticated;
GRANT ALL ON FUNCTION public.catalog_find_rebuild() TO service_role;

-- Finder (WHOLE, now VOLATILE so the lazy rebuild may write): stale index → one serialized rebuild;
-- a rebuild failure is logged and rolled back to the last good index, never raised.
CREATE OR REPLACE FUNCTION public.catalog_find(q text,lang text,lim integer DEFAULT 8)
RETURNS TABLE(leaf_id uuid,slug text,path text[],icon text,matches jsonb,score numeric)
LANGUAGE plpgsql VOLATILE SECURITY DEFINER SET search_path TO 'public'
AS $$
#variable_conflict use_column
DECLARE v_q text:=catalog_find.q; v_lang text:=catalog_find.lang; v_lim integer:=catalog_find.lim; v_ver text;
BEGIN
 IF v_q IS NULL OR char_length(btrim(v_q))<2 OR char_length(v_q)>64 THEN RETURN; END IF;
 IF v_lim IS NULL OR v_lim<1 OR v_lim>8 THEN RAISE EXCEPTION 'badLimit' USING ERRCODE='22023'; END IF;
 IF v_lang IS NULL OR v_lang !~ '^[a-z]{2,3}$' THEN RAISE EXCEPTION 'badLang' USING ERRCODE='22023'; END IF;
 v_ver := public.catalog_find_version();
 IF NOT EXISTS (SELECT 1 FROM public.catalog_find_index i WHERE i.catalog_version = v_ver) THEN
  BEGIN
   PERFORM public.catalog_find_refresh(false);
  EXCEPTION WHEN OTHERS THEN
   RAISE WARNING '[catalog-find] lazy rebuild failed, serving last good index: %', SQLERRM;
  END;
 END IF;
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

-- PROOFS (behaviour only, scratch rows)
DO $$
DECLARE v_cat uuid; v_h0 text; v_h1 text; v_h2 text; v_n int; v_r int; v_ver text;
BEGIN
 -- P1: no write path reaches the finder.
 IF EXISTS (SELECT 1 FROM pg_trigger t WHERE NOT t.tgisinternal AND t.tgrelid IN ('public.categories'::regclass,'public.category_attribute_links'::regclass,'public.entity_translations'::regclass,'public.attributes'::regclass,'public.category_tree_pointers'::regclass) AND pg_get_triggerdef(t.oid) ILIKE '%catalog_find%') THEN RAISE EXCEPTION 'PROOF 1 failed: a finder hook remains on a write path'; END IF;
 IF to_regprocedure('public.catalog_find_schedule_rebuild()') IS NOT NULL THEN RAISE EXCEPTION 'PROOF 1 failed: schedule function remains'; END IF;

 -- Bring the index current, then fingerprint it.
 v_r := public.catalog_find_refresh(true);
 SELECT md5(coalesce(string_agg(ctid::text, ',' ORDER BY ctid),'')) INTO v_h0 FROM public.catalog_find_index;

 -- P2: a category save does not touch the index (it only makes it stale).
 INSERT INTO public.categories(name_en,name_am,slug,is_active,allow_listings) VALUES ('Zebrawood Lathe','የዜብራ መፍጫ','e2e-cf3-zebrawood-lathe',true,true) RETURNING id INTO v_cat;
 UPDATE public.categories SET name_en='Zebrawood Lathes' WHERE id=v_cat;
 SELECT md5(coalesce(string_agg(ctid::text, ',' ORDER BY ctid),'')) INTO v_h1 FROM public.catalog_find_index;
 IF v_h1 <> v_h0 THEN RAISE EXCEPTION 'PROOF 2 failed: category save touched the index'; END IF;
 v_ver := public.catalog_find_version();
 IF EXISTS (SELECT 1 FROM public.catalog_find_index WHERE catalog_version = v_ver) THEN RAISE EXCEPTION 'PROOF 2 failed: save did not make the index stale'; END IF;

 -- P3: a rebuild failure on a stale read never raises and serves the last good index.
 PERFORM set_config('catalog_find.fail_test','1',true);
 SELECT count(*) INTO v_n FROM public.catalog_find('zebrawood','en');
 PERFORM set_config('catalog_find.fail_test','',true);
 SELECT md5(coalesce(string_agg(ctid::text, ',' ORDER BY ctid),'')) INTO v_h1 FROM public.catalog_find_index;
 IF v_h1 <> v_h0 OR v_n <> 0 THEN RAISE EXCEPTION 'PROOF 3 failed: failed rebuild changed the index or raised'; END IF;

 -- P4: the first stale read rebuilds once (and finds the new leaf); the next read serves the cached index.
 SELECT count(*) INTO v_n FROM public.catalog_find('zebrawood','en') f WHERE f.leaf_id=v_cat;
 IF v_n <> 1 THEN RAISE EXCEPTION 'PROOF 4 failed: stale read did not rebuild'; END IF;
 v_ver := public.catalog_find_version();
 IF NOT EXISTS (SELECT 1 FROM public.catalog_find_index WHERE catalog_version = v_ver) THEN RAISE EXCEPTION 'PROOF 4 failed: index not current after stale read'; END IF;
 SELECT md5(coalesce(string_agg(ctid::text, ',' ORDER BY ctid),'')) INTO v_h1 FROM public.catalog_find_index;
 SELECT count(*) INTO v_n FROM public.catalog_find('zebrawood','en') f WHERE f.leaf_id=v_cat;
 SELECT md5(coalesce(string_agg(ctid::text, ',' ORDER BY ctid),'')) INTO v_h2 FROM public.catalog_find_index;
 IF v_n <> 1 OR v_h2 <> v_h1 THEN RAISE EXCEPTION 'PROOF 4 failed: current read rebuilt again'; END IF;
 IF public.catalog_find_refresh(false) <> -1 THEN RAISE EXCEPTION 'PROOF 4 failed: non-forced refresh rebuilt a current index'; END IF;

 -- P5: rebuilds serialize — each holds the finder advisory lock; back-to-back rebuilds leave no duplicate lexicon rows.
 IF NOT EXISTS (SELECT 1 FROM pg_locks WHERE locktype='advisory' AND pid=pg_backend_pid() AND granted) THEN RAISE EXCEPTION 'PROOF 5 failed: rebuild not serialized by advisory lock'; END IF;
 v_r := public.catalog_find_refresh(true);
 IF (SELECT count(*) FROM public.catalog_find_terms) <> (SELECT count(DISTINCT term_norm) FROM public.catalog_find_index) THEN RAISE EXCEPTION 'PROOF 5 failed: lexicon out of step'; END IF;

 -- Cleanup, leave the index current.
 DELETE FROM public.categories WHERE id=v_cat;
 v_r := public.catalog_find_refresh(true);
 IF EXISTS (SELECT 1 FROM public.catalog_find_index WHERE category_id=v_cat) THEN RAISE EXCEPTION 'PROOF cleanup failed'; END IF;
 RAISE NOTICE 'PROOFS OK; index rows %', v_r;
END $$;

-- READBACK: ACLs and volatility.
DO $$ BEGIN
 IF has_function_privilege('anon','public.catalog_find_refresh(boolean)','EXECUTE') OR has_function_privilege('authenticated','public.catalog_find_refresh(boolean)','EXECUTE') THEN RAISE EXCEPTION 'READBACK refresh exposed'; END IF;
 IF has_function_privilege('anon','public.catalog_find_rebuild()','EXECUTE') THEN RAISE EXCEPTION 'READBACK anon rebuild'; END IF;
 IF NOT has_function_privilege('anon','public.catalog_find(text,text,integer)','EXECUTE') THEN RAISE EXCEPTION 'READBACK anon find'; END IF;
 IF (SELECT provolatile FROM pg_proc WHERE oid='public.catalog_find(text,text,integer)'::regprocedure) <> 'v' THEN RAISE EXCEPTION 'READBACK finder not volatile'; END IF;
END $$;

INSERT INTO public.migration_marks(version) VALUES ('20260924120000') ON CONFLICT DO NOTHING;