-- MIGRATION MARK 20260924100000 — D37-1 ledger closer (DEC-022). No schema change.
-- The ten D37-1 files declared marks below their filename stamps; this closer
-- records their declared marks and its own mark (>= its filename stamp).
INSERT INTO public.migration_marks(version) VALUES
  ('20260924020000'),('20260924021000'),('20260924022000'),('20260924023000'),
  ('20260924024000'),('20260924025000'),('20260924026000'),('20260924027000'),
  ('20260924028000'),('20260924091500')
ON CONFLICT DO NOTHING;

DO $$
DECLARE n int;
BEGIN
  SELECT count(*) INTO n FROM public.migration_marks WHERE version IN
   ('20260924020000','20260924021000','20260924022000','20260924023000','20260924024000',
    '20260924025000','20260924026000','20260924027000','20260924028000','20260924091500');
  IF n <> 10 THEN RAISE EXCEPTION 'READBACK failed: % of 10 D37-1 marks present', n; END IF;
END $$;

INSERT INTO public.migration_marks(version) VALUES ('20260924100000') ON CONFLICT DO NOTHING;