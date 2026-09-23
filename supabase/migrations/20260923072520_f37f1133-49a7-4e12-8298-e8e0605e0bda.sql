-- MIGRATION MARK 20260923073000 — INC-268 ledger repair, part 2 (marks only)
--
-- WHY: the parity preflight keys on the mark a file DECLARES, falling back to
-- its FILENAME stamp when the file declares none (INC-094). File
-- 20260923070512_caeccd7a… declares no mark, so parity demands the ledger row
-- '20260923070512'. The first corrective (20260923070813) recorded
-- '20260923070000' and '20260923071000' instead, so both environments still
-- read as BEHIND on 20260923070512. This records the filename row itself.
-- No function, table, policy or grant is touched.

INSERT INTO public.migration_marks (version)
VALUES ('20260923070512') ON CONFLICT DO NOTHING;

INSERT INTO public.migration_marks (version)
VALUES ('20260923073000') ON CONFLICT DO NOTHING;

DO $do$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20260923070512')
     OR NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20260923073000') THEN
    RAISE EXCEPTION 'READ-BACK failed: a mark is missing';
  END IF;
  RAISE NOTICE 'READ-BACK ok: marks 20260923070512 and 20260923073000 recorded';
END $do$;
