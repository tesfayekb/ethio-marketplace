-- INC-321 mark healer (DEC-022 / INC-094): 6b0f6ae1 declared mark 20260928100000,
-- which precedes its filename stamp 20260928135721. A tool-written file cannot be
-- edited, so this corrective records the filename row parity keys on; the file is
-- allowlisted in scripts/migration-mark-allowlist.txt citing this healer.
INSERT INTO public.migration_marks (version) VALUES ('20260928135721') ON CONFLICT DO NOTHING;

DO $readback$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20260928100000')
     OR NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20260928135721') THEN
    RAISE EXCEPTION 'READ-BACK failed: INC-321 ledger rows missing'; END IF;
END $readback$;

INSERT INTO public.migration_marks (version) VALUES ('20260928150000') ON CONFLICT DO NOTHING;