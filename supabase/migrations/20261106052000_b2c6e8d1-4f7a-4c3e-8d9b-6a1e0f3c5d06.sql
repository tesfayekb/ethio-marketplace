-- e2e-areas: auth-caller-gates, my-listings-doors, my-listings-page, posting-routes-dials, admin-listings, legal-certify
-- Foundations 1, turn F1-1, M-F1a part 6 of 6 — INC-836 PART 2: THREE SELLER DOORS WITHOUT A CALLER ARE RETIRED
-- (DEC-335; plan docs/governance/reports/f1-doors.stop-1.md §4.4; ruling 1 §26). No screen calls relist_listing(uuid),
-- edit_listing(…15 arguments) or set_listing_price(uuid, text, numeric, character, text, integer, boolean): the
-- seller's edits go through edit_my_listing, and copy_my_listing is the seller's way to post an item again today;
-- relist returns, if stage 4 wants it, as a new seller door on door_context with its own spec. The form is INC-836
-- part 1's (20261023100132 B7): the browser roles lose EXECUTE, the service_role grant and the body stay — a signed-in
-- caller is answered 42501 as CG-2 reads it for the first three. (The plan's §4.4 wrote DROP; a DROP of a function
-- granted after the public-surface floor in 20261014194317 cannot satisfy both the migration guard, which reads
-- that grant, and the smoke lane's stale-line check — named in the F1-1 stop report for the supervisor's ruling.)
-- Their twelve tests move onto edit_my_listing / service seeding in the same turn; CG-2 widens from three retired
-- doors to six; their acceptance-doors allowlist lines go (the smoke census lists only authenticated-executable
-- doors). The live bodies are checked by md5 first (G39): a body this file does not know is a STOP, not a revoke.

DO $pre$
DECLARE
  v_pairs text[][] := ARRAY[
    ['public.relist_listing(uuid)', '848fef36c446b081c4ed3008a961681e'],
    ['public.edit_listing(uuid, uuid, text, text, text, jsonb, text, numeric, character, text, timestamp with time zone, uuid[], jsonb, integer, boolean)', 'ce57a0f007bb2f13029648475e074b6e'],
    ['public.set_listing_price(uuid, text, numeric, character, text, integer, boolean)', '15e599df63caf7f023401e3ca8a04137']];
  v_md5  text;
  i      integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261106060500') THEN
    RAISE EXCEPTION 'F1-1 M-F1a part 6: part 5 (a9d4c7e2) must be applied first';
  END IF;
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_pairs[i][1]::regprocedure;
    IF v_md5 IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-1 M-F1a part 6: the live % is not its last declaration''s body (%)', v_pairs[i][1], v_md5;
    END IF;
  END LOOP;
END $pre$;

REVOKE EXECUTE ON FUNCTION public.relist_listing(uuid) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.edit_listing(uuid, uuid, text, text, text, jsonb, text, numeric, character, text, timestamp with time zone, uuid[], jsonb, integer, boolean) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.set_listing_price(uuid, text, numeric, character, text, integer, boolean) FROM PUBLIC, anon, authenticated;

-- PROOF: each of the three still exists, no browser role may execute it, service_role still may; nothing in
-- public still names them (no other function body, no policy), so no browser-callable path reaches them.
DO $proof$
DECLARE
  v_fns  text[] := ARRAY[
    'public.relist_listing(uuid)',
    'public.edit_listing(uuid, uuid, text, text, text, jsonb, text, numeric, character, text, timestamp with time zone, uuid[], jsonb, integer, boolean)',
    'public.set_listing_price(uuid, text, numeric, character, text, integer, boolean)'];
  v_fn   text;
  v_name text;
BEGIN
  FOREACH v_fn IN ARRAY v_fns LOOP
    IF has_function_privilege('authenticated', v_fn::regprocedure, 'EXECUTE')
       OR has_function_privilege('anon', v_fn::regprocedure, 'EXECUTE')
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn::regprocedure)) a WHERE a.grantee = 0)
       OR NOT has_function_privilege('service_role', v_fn::regprocedure, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-1 M-F1a part 6 proof: % is not retired as INC-836 part 1 retires (browser roles out, service_role kept)', v_fn;
    END IF;
  END LOOP;
  FOREACH v_name IN ARRAY ARRAY['relist_listing', 'edit_listing', 'set_listing_price'] LOOP
    IF EXISTS (SELECT 1 FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
                WHERE n.nspname = 'public' AND p.prokind = 'f' AND p.proname <> v_name
                  AND p.prosrc ~ ('\m' || v_name || '\s*\(')) THEN
      RAISE EXCEPTION 'F1-1 M-F1a part 6 proof: a function in public still calls %', v_name;
    END IF;
    IF EXISTS (SELECT 1 FROM pg_policies pol WHERE pol.schemaname = 'public'
                 AND (coalesce(pol.qual, '') || coalesce(pol.with_check, '')) ~ ('\m' || v_name || '\s*\(')) THEN
      RAISE EXCEPTION 'F1-1 M-F1a part 6 proof: a policy still names %', v_name;
    END IF;
  END LOOP;
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261106060600') ON CONFLICT DO NOTHING;
