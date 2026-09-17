-- Mark healer (DEC-022): the corrective P3/P4 proof declared 20260917214500,
-- which the tool then stamped 20260917214504; the ledger records the stamp.
INSERT INTO public.migration_marks(version) VALUES ('20260917214504') ON CONFLICT DO NOTHING;
INSERT INTO public.migration_marks(version) VALUES ('20260917215500') ON CONFLICT DO NOTHING;