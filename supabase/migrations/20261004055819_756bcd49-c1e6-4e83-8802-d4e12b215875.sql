-- M4c — mark healer for M4b (5118f016).
-- M4b (20261004055007_5118f016…) landed without its INSERT INTO
-- public.migration_marks, so the self-marking guard refuses it and staging
-- (applied via the SQL editor) carries no ledger row for it. The file is
-- immutable (append-only, E2), so this healer records M4b's ledger row
-- 20261004055007 (the mark already reported: "apply 5118f016 → expect mark
-- 20261004055007") and its own mark. M4b is listed in
-- scripts/migration-mark-allowlist.txt citing this healer.
-- Changes no table, policy, function or grant.
-- e2e-areas: none (ledger-only change; no e2e spec area touched).

INSERT INTO public.migration_marks (version) VALUES ('20261004055007') ON CONFLICT DO NOTHING;
INSERT INTO public.migration_marks (version) VALUES ('20261004070000') ON CONFLICT DO NOTHING;

-- PROOF (behaviour): both ledger rows exist after this file runs.
DO $$
BEGIN
  ASSERT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261004055007'),
    'M4b ledger row 20261004055007 must exist';
  ASSERT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261004070000'),
    'M4c ledger row 20261004070000 must exist';
END $$;
