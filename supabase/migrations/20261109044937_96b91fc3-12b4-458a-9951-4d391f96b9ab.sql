-- e2e-areas: posting, admin-monetisation
-- P-2 turn (c) M-3c-b, part 5 of 5 — THE PLAN SEAM DROPPED (docs/governance/briefs/p2-fold-c2b-ruling-1.md §4 (v)).
-- It follows part 4 (5c76824a, mark 20261109070300).
-- An ad's caps come from its level and reach rows (listing_photo_cap, listing_effective_reach, listing_caps — part
-- 1); the plans' table and its four functions have no reader left: public.plan_photo_cap(text),
-- public.seller_plan(uuid), public.plan_caps(text) (20260919054044 :73–120), public.admin_set_coverage_plan(…)
-- (20261102081500 :52) and the table public.coverage_plans (its policy goes with it). The apply first reads the
-- live body of EVERY function in schema public, its `--` comments stripped (a comment's mention is history, a
-- mention in code is a reader — the file reader cannot see computed insertions, INC-1083), and refuses when a body
-- other than the four dropped ones names any of the five; then the four functions, then the table. No CASCADE: a
-- dependent object refuses the drop. Proofs at the end: the five are gone and no live body names them.

DO $pre$
DECLARE
  v_hits text;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261109070300') THEN
    RAISE EXCEPTION 'P-2 (c) M-3c-b part 5: part 4 (5c76824a, mark 20261109070300) must be applied first';
  END IF;
  SELECT string_agg(p.oid::regprocedure::text, ', ' ORDER BY p.oid::regprocedure::text) INTO v_hits
    FROM pg_proc p
   WHERE p.pronamespace = 'public'::regnamespace
     AND p.proname NOT IN ('plan_photo_cap', 'seller_plan', 'plan_caps', 'admin_set_coverage_plan')
     AND regexp_replace(p.prosrc, '--[^\n]*', '', 'g')
         ~ '\m(plan_photo_cap|seller_plan|plan_caps|admin_set_coverage_plan|coverage_plans)\M';
  IF v_hits IS NOT NULL THEN
    RAISE EXCEPTION 'P-2 (c) M-3c-b part 5: a live body still names the plan seam: %', v_hits;
  END IF;
END $pre$;

-- ------------------------------------------------------------ 1. THE DROPS
DROP FUNCTION public.admin_set_coverage_plan(text, integer, integer, integer, boolean, smallint, integer, integer, boolean, text);
DROP FUNCTION public.plan_caps(text);
DROP FUNCTION public.plan_photo_cap(text);
DROP FUNCTION public.seller_plan(uuid);
DROP TABLE public.coverage_plans;

-- ------------------------------------------------------------ 2. PROOFS
--   (a) the table, its policy and the four functions are gone (by name, every signature);
--   (b) no live body in schema public names any of the five outside a comment.
DO $proof$
DECLARE
  v_hits text;
BEGIN
  -- (a)
  IF to_regclass('public.coverage_plans') IS NOT NULL
     OR EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND policyname = 'coverage_plans_public_read')
     OR EXISTS (SELECT 1 FROM pg_proc p
                 WHERE p.pronamespace = 'public'::regnamespace
                   AND p.proname IN ('plan_photo_cap', 'seller_plan', 'plan_caps', 'admin_set_coverage_plan')) THEN
    RAISE EXCEPTION 'P-2 (c) M-3c-b part 5 proof (a): a dropped object remains';
  END IF;
  -- (b)
  SELECT string_agg(p.oid::regprocedure::text, ', ') INTO v_hits
    FROM pg_proc p
   WHERE p.pronamespace = 'public'::regnamespace
     AND regexp_replace(p.prosrc, '--[^\n]*', '', 'g')
         ~ '\m(plan_photo_cap|seller_plan|plan_caps|admin_set_coverage_plan|coverage_plans)\M';
  IF v_hits IS NOT NULL THEN
    RAISE EXCEPTION 'P-2 (c) M-3c-b part 5 proof (b): a live body names the plan seam: %', v_hits;
  END IF;
END;
$proof$;

-- ------------------------------------------------------------ 3. CLOSERS
INSERT INTO public.migration_marks (version) VALUES ('20261109070400') ON CONFLICT DO NOTHING;
