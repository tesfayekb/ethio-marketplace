-- Intentionally BAD migration used only by scripts/check-migrations.sh self-test.
-- Do NOT apply. Missing: the self-mark statement entirely.
-- Filename version for the self-test: 29990101000000.
CREATE OR REPLACE FUNCTION public.self_test_unmarked()
RETURNS void LANGUAGE sql AS $$ SELECT 1 $$;
