-- MIGRATION MARK 20260923071000 — INC-268 ledger repair (marks only, no rule change)
--
-- The INC-268 landing (file caeccd7a, mark 20260923070000) omitted its own
-- self-marking INSERT, which the migration guard refuses. A tool-written file
-- cannot be edited afterwards, so the mark is recorded here alongside this
-- file's own. No function, table, policy or grant is touched.

INSERT INTO public.migration_marks (version)
VALUES ('20260923070000') ON CONFLICT DO NOTHING;

INSERT INTO public.migration_marks (version)
VALUES ('20260923071000') ON CONFLICT DO NOTHING;

DO $do$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20260923070000')
     OR NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20260923071000') THEN
    RAISE EXCEPTION 'READ-BACK failed: a mark is missing';
  END IF;
  RAISE NOTICE 'READ-BACK ok: marks 20260923070000 and 20260923071000 recorded';
END $do$;