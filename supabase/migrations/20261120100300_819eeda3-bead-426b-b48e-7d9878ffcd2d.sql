-- e2e-areas: auth-caller-gates, my-listings, posting, admin-listings, legal

-- Foundations 1, turn F1-7c, part 4 of 4 — THE SEVEN RETIRED FUNCTIONS DROPPED (DEC-347; INC-1068; brief
-- docs/governance/briefs/f1-doors-7c.md; census docs/governance/reports/f1-doors-7c.census.md; ruling
-- docs/governance/briefs/f1-doors-7c-ruling-1.md, decision 4).
-- edit_listing, relist_listing and set_listing_price (retired by F1-1, DEC-335), get_browse_tree,
-- get_category_attributes and get_ui_bundle (F1-7a part 9) and package_price_for (F1-6b part 7): their browser
-- EXECUTE was revoked when they retired; the census found no caller in any SQL body, policy, route or published
-- screen, and the supervisor's read of ethio-prod's edge log for the 24 hours to 2026-11-20 09:50Z found no call.
-- Each RETIRED line in scripts/public-surface-allowlist.txt leaves with this file: the migration guard reads a later
-- DROP as closing the function's earlier grants (DEC-357), and the live lint no longer meets a line whose function
-- is absent. The pre-check proves on the database it runs on that nothing still calls them; the drops take no
-- CASCADE, so a dependent object stops the file. A wrong drop is answered by one file that restores it.

DO $pre$
DECLARE
  v_fns  text[] := ARRAY[
    'public.edit_listing(uuid,uuid,text,text,text,jsonb,text,numeric,character,text,timestamp with time zone,uuid[],jsonb,integer,boolean)',
    'public.relist_listing(uuid)',
    'public.set_listing_price(uuid,text,numeric,character,text,integer,boolean)',
    'public.get_browse_tree(text)',
    'public.get_category_attributes(uuid,boolean)',
    'public.get_ui_bundle(text)',
    'public.package_price_for(uuid,text)'];
  v_fn   text;
  v_oid  oid;
  v_name text;
  v_hits text;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261120120200') THEN
    RAISE EXCEPTION 'F1-7c part 4: part 3 (9dbc0091) must be applied first';
  END IF;
  FOREACH v_fn IN ARRAY v_fns LOOP
    v_oid := to_regprocedure(v_fn);
    IF v_oid IS NULL THEN
      RAISE EXCEPTION 'F1-7c part 4: % is not there to drop', v_fn;
    END IF;
    v_name := (SELECT proname FROM pg_proc WHERE oid = v_oid);
    IF (SELECT count(*) FROM pg_proc WHERE pronamespace = 'public'::regnamespace AND proname = v_name) <> 1 THEN
      RAISE EXCEPTION 'F1-7c part 4: % has another overload; the drop names one', v_name;
    END IF;
    IF has_function_privilege('anon', v_oid, 'EXECUTE') OR has_function_privilege('authenticated', v_oid, 'EXECUTE')
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_oid)) a WHERE a.grantee = 0) THEN
      RAISE EXCEPTION 'F1-7c part 4: % is still browser-callable; it was never retired here', v_fn;
    END IF;
    SELECT string_agg(p.proname, ', ') INTO v_hits FROM pg_proc p
     WHERE p.pronamespace = 'public'::regnamespace AND p.oid <> v_oid
       AND p.prosrc ~* ('\m' || v_name || '\s*\(');
    IF v_hits IS NOT NULL THEN
      RAISE EXCEPTION 'F1-7c part 4: % is still called by %', v_name, v_hits;
    END IF;
    SELECT string_agg(pol.policyname, ', ') INTO v_hits FROM pg_policies pol
     WHERE coalesce(pol.qual, '') ~* ('\m' || v_name || '\s*\(') OR coalesce(pol.with_check, '') ~* ('\m' || v_name || '\s*\(');
    IF v_hits IS NOT NULL THEN
      RAISE EXCEPTION 'F1-7c part 4: % is still called by the policies %', v_name, v_hits;
    END IF;
    IF to_regclass('cron.job') IS NOT NULL THEN
      EXECUTE 'SELECT string_agg(jobname, '', '') FROM cron.job WHERE command ~* $1'
        INTO v_hits USING '\m' || v_name || '\s*\(';
      IF v_hits IS NOT NULL THEN
        RAISE EXCEPTION 'F1-7c part 4: % is still called by the cron jobs %', v_name, v_hits;
      END IF;
    END IF;
  END LOOP;
END $pre$;

DROP FUNCTION public.edit_listing(uuid, uuid, text, text, text, jsonb, text, numeric, character, text, timestamp with time zone, uuid[], jsonb, integer, boolean);
DROP FUNCTION public.relist_listing(uuid);
DROP FUNCTION public.set_listing_price(uuid, text, numeric, character, text, integer, boolean);
DROP FUNCTION public.get_browse_tree(text);
DROP FUNCTION public.get_category_attributes(uuid, boolean);
DROP FUNCTION public.get_ui_bundle(text);
DROP FUNCTION public.package_price_for(uuid, text);

-- PROOF: none of the seven names a function of schema public any more, and product_price_for — the resolver
-- package_price_for wrapped — stands, closed to browser roles.
DO $proof$
DECLARE
  v_names text[] := ARRAY['edit_listing', 'relist_listing', 'set_listing_price', 'get_browse_tree',
                          'get_category_attributes', 'get_ui_bundle', 'package_price_for'];
BEGIN
  IF EXISTS (SELECT 1 FROM pg_proc WHERE pronamespace = 'public'::regnamespace AND proname = ANY (v_names)) THEN
    RAISE EXCEPTION 'F1-7c part 4 proof: a dropped function still stands';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_proc WHERE pronamespace = 'public'::regnamespace AND proname = 'product_price_for') THEN
    RAISE EXCEPTION 'F1-7c part 4 proof: product_price_for is gone';
  END IF;
  IF EXISTS (SELECT 1 FROM pg_proc p WHERE p.pronamespace = 'public'::regnamespace AND p.proname = 'product_price_for'
               AND (has_function_privilege('anon', p.oid, 'EXECUTE') OR has_function_privilege('authenticated', p.oid, 'EXECUTE'))) THEN
    RAISE EXCEPTION 'F1-7c part 4 proof: product_price_for became browser-callable';
  END IF;
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261120120300') ON CONFLICT DO NOTHING;
