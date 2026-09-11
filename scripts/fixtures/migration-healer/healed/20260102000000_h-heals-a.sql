-- FIXTURE (DEC-054, case a): healer H rewrites A's ledger row to A's own stamp.
UPDATE public.migration_marks SET version = '20260101000000' WHERE version = '20250101000000';
INSERT INTO public.migration_marks (version) VALUES ('20260102000000')
ON CONFLICT (version) DO NOTHING;
