-- M5b — mark healer for M5 (923dd4cb).
-- M5 (20261004144146_923dd4cb…) declares mark 20261004090000, which precedes
-- its filename stamp, so the self-marking guard refuses it. The file is
-- immutable (append-only, E2): this healer writes its own mark, later than
-- its stamp. M5's ledger row 20261004090000 was written by M5 itself. M5 is
-- listed in scripts/migration-mark-allowlist.txt citing this healer.
-- Changes no table, policy, function or grant.
-- e2e-areas: none (ledger-only change; no e2e spec area touched).

INSERT INTO public.migration_marks (version) VALUES ('20261004160000') ON CONFLICT DO NOTHING;

-- PROOF (behaviour): M5's and this file's ledger rows exist.
DO $$
BEGIN
  ASSERT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261004090000'),
    'M5 ledger row 20261004090000 must exist';
  ASSERT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261004160000'),
    'M5b ledger row 20261004160000 must exist';
END $$;