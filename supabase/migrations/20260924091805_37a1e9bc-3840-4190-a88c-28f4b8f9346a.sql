-- MIGRATION MARK 20260924091500 — D37-1 corrective (E1): explicit deny-all policies on the finder tables.
-- Behaviour-only proofs (no EXPLAIN). service_role bypasses RLS.

ALTER TABLE public.catalog_find_index ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.catalog_find_terms ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON public.catalog_find_index FROM anon, authenticated;
REVOKE ALL ON public.catalog_find_terms FROM anon, authenticated;
GRANT ALL ON public.catalog_find_index TO service_role;
GRANT ALL ON public.catalog_find_terms TO service_role;

DROP POLICY IF EXISTS catalog_find_index_deny_select ON public.catalog_find_index;
DROP POLICY IF EXISTS catalog_find_index_deny_insert ON public.catalog_find_index;
DROP POLICY IF EXISTS catalog_find_index_deny_update ON public.catalog_find_index;
DROP POLICY IF EXISTS catalog_find_index_deny_delete ON public.catalog_find_index;
CREATE POLICY catalog_find_index_deny_select ON public.catalog_find_index FOR SELECT TO anon, authenticated USING (false);
CREATE POLICY catalog_find_index_deny_insert ON public.catalog_find_index FOR INSERT TO anon, authenticated WITH CHECK (false);
CREATE POLICY catalog_find_index_deny_update ON public.catalog_find_index FOR UPDATE TO anon, authenticated USING (false) WITH CHECK (false);
CREATE POLICY catalog_find_index_deny_delete ON public.catalog_find_index FOR DELETE TO anon, authenticated USING (false);

DROP POLICY IF EXISTS catalog_find_terms_deny_select ON public.catalog_find_terms;
DROP POLICY IF EXISTS catalog_find_terms_deny_insert ON public.catalog_find_terms;
DROP POLICY IF EXISTS catalog_find_terms_deny_update ON public.catalog_find_terms;
DROP POLICY IF EXISTS catalog_find_terms_deny_delete ON public.catalog_find_terms;
CREATE POLICY catalog_find_terms_deny_select ON public.catalog_find_terms FOR SELECT TO anon, authenticated USING (false);
CREATE POLICY catalog_find_terms_deny_insert ON public.catalog_find_terms FOR INSERT TO anon, authenticated WITH CHECK (false);
CREATE POLICY catalog_find_terms_deny_update ON public.catalog_find_terms FOR UPDATE TO anon, authenticated USING (false) WITH CHECK (false);
CREATE POLICY catalog_find_terms_deny_delete ON public.catalog_find_terms FOR DELETE TO anon, authenticated USING (false);

-- READ-BACK: 8 policies, RLS on.
DO $$
DECLARE n int;
BEGIN
  SELECT count(*) INTO n FROM pg_policies
   WHERE schemaname='public' AND tablename IN ('catalog_find_index','catalog_find_terms')
     AND policyname LIKE '%_deny_%';
  IF n <> 8 THEN RAISE EXCEPTION 'READBACK failed: % deny policies, expected 8', n; END IF;
  IF EXISTS (SELECT 1 FROM pg_class WHERE oid IN ('public.catalog_find_index'::regclass,'public.catalog_find_terms'::regclass) AND NOT relrowsecurity)
    THEN RAISE EXCEPTION 'READBACK failed: RLS off'; END IF;
END $$;

-- PROOF: anon and authenticated read zero rows (or are refused) and cannot write.
DO $$
DECLARE r text; t text; n int; wrote boolean;
BEGIN
  FOREACH r IN ARRAY ARRAY['anon','authenticated'] LOOP
    FOREACH t IN ARRAY ARRAY['catalog_find_index','catalog_find_terms'] LOOP
      EXECUTE format('SET LOCAL ROLE %I', r);
      BEGIN
        EXECUTE format('SELECT count(*) FROM public.%I', t) INTO n;
        IF n <> 0 THEN RESET ROLE; RAISE EXCEPTION 'PROOF failed: % read % rows of %', r, n, t; END IF;
      EXCEPTION WHEN insufficient_privilege THEN NULL;
      END;
      wrote := true;
      BEGIN
        IF t = 'catalog_find_terms' THEN
          EXECUTE 'INSERT INTO public.catalog_find_terms(term_norm) VALUES (''e2e-deny-proof'')';
        ELSE
          EXECUTE 'DELETE FROM public.catalog_find_index WHERE true';
          EXECUTE 'UPDATE public.catalog_find_index SET weight = weight WHERE true';
          GET DIAGNOSTICS n = ROW_COUNT;
          IF n = 0 THEN wrote := false; END IF;
        END IF;
      EXCEPTION WHEN insufficient_privilege THEN wrote := false;
      END;
      RESET ROLE;
      IF wrote THEN RAISE EXCEPTION 'PROOF failed: % wrote to %', r, t; END IF;
    END LOOP;
  END LOOP;
END $$;

INSERT INTO public.migration_marks(version) VALUES ('20260924091500') ON CONFLICT DO NOTHING;