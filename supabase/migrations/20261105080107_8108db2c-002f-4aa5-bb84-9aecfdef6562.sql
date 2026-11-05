-- e2e-areas: my-listings, admin-listings, ad-page, feed, posting
-- P-2 (a) M-1c, part 4 of 7 — the cron's door becomes the core's wrapper (plan §3; ruling 1; DEC-332).
-- expire_stale_listings() (listing-expiry-sweep, cron '17 * * * *', 20261004144146 :1794) is redeclared
-- WHOLE from its last declaration (20261014194317 :822; the live body's md5 checked first, G39): the same
-- header and closers; its body now runs designation_sweep_core(NULL) (part 3) over everything, writes the
-- heartbeat row with the four new counters beside `expired` (part 1, DEC-332), keeps its 14-day trim and
-- answers the expired count as before, so its two e2e callers keep their shape. Rule 30: the live wrapper is
-- never called by a proof — the core's work is proven in part 3 on scratch ids; this file proves the header,
-- the grants, the new body's md5 and that the body names the core and every heartbeat counter.

DO $pre$
DECLARE
  v_fn  regprocedure := 'public.expire_stale_listings()'::regprocedure;
  v_md5 text;
BEGIN
  IF to_regprocedure('public.designation_sweep_core(uuid[])') IS NULL
     OR NOT EXISTS (SELECT 1 FROM pg_attribute WHERE attrelid = 'public.listing_expiry_sweep_runs'::regclass AND attname = 'reminded' AND NOT attisdropped) THEN
    RAISE EXCEPTION 'P-2 M-1c part 4: parts 1 and 3 (4e04fad3, 42c3a28d) must be applied first';
  END IF;
  -- G39: the wrapper is rewritten from the body 20261014194317 declared; a different live body is a STOP.
  SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_fn;
  IF v_md5 IS DISTINCT FROM 'cec313509d82262584e6c83fe0fae6ee' THEN
    RAISE EXCEPTION 'P-2 M-1c part 4: the live expire_stale_listings is not 20261014194317''s body (%)', v_md5;
  END IF;
END $pre$;

-- ------------------------------------------------------------ 1. THE WRAPPER (whole from 20261014194317 :822)
CREATE OR REPLACE FUNCTION public.expire_stale_listings()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_counts record;
BEGIN
  -- INC-470 (bundle 16 turn 1) — each due ad expires through the state machine, which writes its revision and keeps
  -- the live status a renewal returns it to. INC-626 — an ad with reduced reach expires too (it was never swept).
  -- The scheduled job runs with no session, as the service.
  -- P-2 M-1c — the three clocks in one pass (expiry → level → reach → the reminder): designation_sweep_core.
  SELECT * INTO v_counts FROM public.designation_sweep_core(NULL);
  -- M5 / DEC-117 — one heartbeat row per run (scheduled as listing-expiry-sweep); DEC-332 — its four counters.
  INSERT INTO public.listing_expiry_sweep_runs (expired, level_ended, level_paused, reach_ended, reminded)
  VALUES (v_counts.n_expired, v_counts.n_level_ended, v_counts.n_level_paused, v_counts.n_reach_ended, v_counts.n_reminded);
  DELETE FROM public.listing_expiry_sweep_runs WHERE ran_at < now() - interval '14 days';
  RETURN v_counts.n_expired;
END; $$;
REVOKE ALL ON FUNCTION public.expire_stale_listings() FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.expire_stale_listings() TO service_role;

-- ------------------------------------------------------------ 2. PROOFS
-- (a) the header, the grants and the body (catalog facts: prosecdef, provolatile, proconfig, the ACL, the
-- new body's md5 — the text above, CR-stripped on both sides per law 13 — and the heartbeat columns the body
-- writes); the schedule still names the door. No call: the live wrapper is never run by a proof (rule 30).
DO $proof$
DECLARE
  v_fn   regprocedure := 'public.expire_stale_listings()'::regprocedure;
  v_src  text;
BEGIN
  IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' OR prorettype <> 'integer'::regtype
        FROM pg_proc WHERE oid = v_fn)
     OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
     OR has_function_privilege('anon', v_fn, 'EXECUTE') OR has_function_privilege('authenticated', v_fn, 'EXECUTE')
     OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
    RAISE EXCEPTION 'P-2 M-1c part 4 proof (a): the header or the grants differ';
  END IF;
  SELECT replace(p.prosrc, chr(13), '') INTO v_src FROM pg_proc p WHERE p.oid = v_fn;
  IF md5(v_src) IS DISTINCT FROM 'd8f7e12743bd7c0fbed2005b29143bd8' THEN
    RAISE EXCEPTION 'P-2 M-1c part 4 proof (a): the new body''s md5 is % (law 13: the text above, CR-stripped)', md5(v_src);
  END IF;
  IF (SELECT count(*) FROM pg_attribute
       WHERE attrelid = 'public.listing_expiry_sweep_runs'::regclass AND NOT attisdropped
         AND attname IN ('expired', 'level_ended', 'level_paused', 'reach_ended', 'reminded')
         AND atttypid = 'integer'::regtype AND attnotnull) <> 5 THEN
    RAISE EXCEPTION 'P-2 M-1c part 4 proof (a): the heartbeat row lacks a counter the wrapper writes';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'listing-expiry-sweep' AND command LIKE '%public.expire_stale_listings()%') THEN
    RAISE EXCEPTION 'P-2 M-1c part 4 proof (a): listing-expiry-sweep no longer names the door';
  END IF;
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261105100400') ON CONFLICT DO NOTHING;
