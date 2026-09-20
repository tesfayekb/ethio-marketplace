-- =====================================================================
-- M-ORDER — DEC-022 LEDGER REPAIR.
-- The two M-ORDER files declared marks (20260920120000 / 20260920120002) BELOW
-- the filename stamps the authoring tool assigned them:
--   20260920150901_bd008b3e-1ac4-44f6-8143-1441cc365b81.sql  (the planner)
--   20260920151236_fa43c991-291b-4197-b7c7-0dc8bbfc8fec.sql  (commit + export)
-- A migration file cannot be edited once written, so this corrective RECORDS
-- both stamps in the ledger and is cited by the two allowlist entries in
-- scripts/migration-mark-allowlist.txt. Its own mark is above its stamp.
-- No schema, no data, no ACL change.
-- =====================================================================
INSERT INTO public.migration_marks (version)
VALUES ('20260920150901'), ('20260920151236'), ('20260920200000')
ON CONFLICT (version) DO NOTHING;

DO $readback$
DECLARE r record;
BEGIN
  FOR r IN
    SELECT m.version FROM public.migration_marks m
     WHERE m.version IN ('20260920120000','20260920120002',
                         '20260920150901','20260920151236','20260920200000')
     ORDER BY m.version
  LOOP
    RAISE NOTICE 'READ-BACK mark %', r.version;
  END LOOP;
END $readback$;