-- DEC-022 HEALER: L2a (20260911223202_ee224de0) declared mark 20260911223000 < its filename stamp.
-- Append-only law forbids editing that file; raise its ledger row to the filename stamp.
UPDATE public.migration_marks SET version = '20260911223202' WHERE version = '20260911223000';
-- Self-mark (declared mark at/after this file's filename stamp):
INSERT INTO public.migration_marks(version) VALUES ('20260912000000') ON CONFLICT DO NOTHING;