-- ---------------------------------------------------------------------
-- LEDGER RECONCILIATION, PART 2 (INC-094) — bookkeeping only.
--
-- Root cause (durable): the migration TOOL assigns a file's 14-digit stamp at
-- WRITE time, after the SQL was authored, so a migration can never contain its
-- own filename stamp as a literal, and the files are not editable afterwards.
-- The self-marking law is therefore re-based on the DECLARED mark: each file
-- declares a unique 14-digit stamp, and the tooling (scripts/check-migrations.sh
-- and scripts/e2e-migration-preflight.ts) reads that declared literal out of the
-- file instead of assuming it equals the filename. That makes every migration
-- self-consistent by construction and ends the correction recursion.
--
-- This migration restores the one declared mark the previous reconciliation
-- deleted, so every migration file on disk has its declared mark present in
-- public.migration_marks on any environment that applied the files in order.
-- Idempotent.
-- ---------------------------------------------------------------------

-- Declared mark of 20260829060103_e9f7988f-e584-4944-9c5e-f3e7fa32b07d.sql
INSERT INTO public.migration_marks(version) VALUES ('20260829060232') ON CONFLICT DO NOTHING;
-- Filename stamp of the reconciliation migration, kept as a courtesy alias.
INSERT INTO public.migration_marks(version) VALUES ('20260829060155') ON CONFLICT DO NOTHING;

DO $verify$
DECLARE v_missing text;
BEGIN
  SELECT string_agg(v, ', ') INTO v_missing
  FROM unnest(ARRAY['20260829060103', '20260829060155', '20260829060232', '20260829060500']) v
  WHERE NOT EXISTS (SELECT 1 FROM public.migration_marks m WHERE m.version = v);
  IF v_missing IS NOT NULL THEN
    RAISE EXCEPTION 'LEDGER RECONCILIATION 2 FAILED: missing %', v_missing;
  END IF;
  RAISE NOTICE 'LEDGER RECONCILIATION 2 OK';
END $verify$;

-- This migration's own DECLARED mark (see the note above: it is intentionally
-- not the filename stamp, which does not exist yet while this SQL is written).
INSERT INTO public.migration_marks(version) VALUES ('20260829061000') ON CONFLICT DO NOTHING;