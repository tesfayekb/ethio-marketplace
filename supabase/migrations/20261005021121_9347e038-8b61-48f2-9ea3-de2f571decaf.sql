-- M7 — bundle 4, INC-432: name_folds_rebuild callable from the import routes.
-- The server connection runs with safe-update on, which refuses a DELETE with no
-- WHERE clause; the one change is `DELETE FROM public.name_folds WHERE true`.
-- Redeclared whole from the live definition (pg_get_functiondef, ethio-prod):
-- args (), provolatile v, prosecdef true, proconfig {search_path=public} — all kept.
-- e2e-areas: admin-attributes, admin-categories, admin-locations

CREATE OR REPLACE FUNCTION public.name_folds_rebuild()
 RETURNS integer
 LANGUAGE plpgsql
 VOLATILE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_rows integer;
BEGIN
  -- One rebuild at a time; the whole table is replaced in this transaction,
  -- so a reader sees the old set or the new one, never a half.
  PERFORM pg_advisory_xact_lock(hashtext('name_folds_rebuild'));
  -- M7 / INC-432 — WHERE true: the API connection's safe-update refuses a bare DELETE.
  DELETE FROM public.name_folds WHERE true;
  INSERT INTO public.name_folds (kind, fold)
  SELECT DISTINCT s.kind, s.fold FROM (
              SELECT 'site'::text AS kind, public.name_fold(w.word) AS fold FROM public.site_words w
    UNION ALL SELECT 'role', public.name_fold(w.word) FROM public.site_words w WHERE w.kind = 'role'
    UNION ALL SELECT 'function', public.name_fold(w.word) FROM public.site_words w WHERE w.kind = 'function'
    UNION ALL SELECT 'category', public.name_fold_latin(c.slug) FROM public.categories c
    UNION ALL SELECT 'category', public.name_fold_latin(c.name_en) FROM public.categories c
    UNION ALL SELECT 'place', public.name_fold_latin(l.name_en) FROM public.locations l
    UNION ALL SELECT 'country', public.name_fold_latin(k.name_en) FROM public.countries k
    UNION ALL SELECT 'brand', b.f FROM public.name_brand_folds() b(f)
    UNION ALL SELECT 'handle', h.handle_fold FROM public.protected_handles h
    UNION ALL SELECT 'exact_only', public.name_fold(e.word) FROM public.exact_only_words e
    UNION ALL SELECT 'claim', c.f FROM public.name_claim_folds() c(f)
    UNION ALL SELECT 'name_latin', public.name_fold_latin(n.name_en) FROM public.protected_names n
    UNION ALL SELECT 'name_am', public.name_fold_am(n.name_am) FROM public.protected_names n
               WHERE n.name_am IS NOT NULL
  ) s
  WHERE s.fold IS NOT NULL;
  GET DIAGNOSTICS v_rows = ROW_COUNT;
  INSERT INTO public.name_folds_runs (rows) VALUES (v_rows);
  DELETE FROM public.name_folds_runs WHERE ran_at < now() - interval '14 days';
  RETURN v_rows;
END $function$;

REVOKE ALL ON FUNCTION public.name_folds_rebuild() FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.name_folds_rebuild() TO service_role;

-- Proof: the rebuild runs under safe-update (as the API connection does), returns
-- rows above zero, and writes one new name_folds_runs row. The rebuild's rows are
-- the same derived set the cron writes; the run row it adds is removed here.
DO $p$
DECLARE
  v_before bigint;
  v_max_id bigint;
  v_rows integer;
BEGIN
  SELECT count(*), coalesce(max(id), 0) INTO v_before, v_max_id FROM public.name_folds_runs;
  BEGIN
    PERFORM set_config('safeupdate.enabled', '1', true);
  EXCEPTION WHEN OTHERS THEN NULL;
  END;
  v_rows := public.name_folds_rebuild();
  ASSERT v_rows > 0, 'M7: name_folds_rebuild returned no rows';
  ASSERT (SELECT count(*) FROM public.name_folds) = v_rows, 'M7: name_folds row count differs from the return';
  ASSERT (SELECT count(*) FROM public.name_folds_runs WHERE id > v_max_id AND rows = v_rows) = 1,
    'M7: no new name_folds_runs row';
  ASSERT (SELECT p.provolatile = 'v' AND p.prosecdef AND p.proconfig = ARRAY['search_path=public']
            FROM pg_proc p WHERE p.oid = 'public.name_folds_rebuild()'::regprocedure),
    'M7: header attributes changed';
  ASSERT NOT has_function_privilege('authenticated', 'public.name_folds_rebuild()', 'EXECUTE')
     AND NOT has_function_privilege('anon', 'public.name_folds_rebuild()', 'EXECUTE')
     AND has_function_privilege('service_role', 'public.name_folds_rebuild()', 'EXECUTE'),
    'M7: ACL changed';
  DELETE FROM public.name_folds_runs WHERE id > v_max_id;
END $p$;

INSERT INTO public.migration_marks (version) VALUES ('20261005040000') ON CONFLICT DO NOTHING;