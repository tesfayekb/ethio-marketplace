-- DEC-340 — PLANTED FAILURE (commit 1 of lane ci-db-error-record only; removed in commit 2).
-- This file reaches no project: it fails on purpose so the temporary backend's evidence shows the
-- database server's own ERROR record with its PL/pgSQL CONTEXT stack (INC-1051).
CREATE OR REPLACE FUNCTION public.dec340_planted_raise()
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  RAISE EXCEPTION 'DEC-340 planted failure: the server record must show this stack'
    USING DETAIL = 'dec340_planted_raise() raised on purpose',
          HINT = 'commit 2 of the ci-db-error-record lane removes this file';
END;
$$;
REVOKE ALL ON FUNCTION public.dec340_planted_raise() FROM PUBLIC, anon, authenticated;

DO $$
BEGIN
  PERFORM public.dec340_planted_raise();
END;
$$;

-- Never reached (the DO block above aborts the file): kept so the file describes its own clean-up.
DROP FUNCTION public.dec340_planted_raise();

INSERT INTO public.migration_marks (version) VALUES ('20261105041445') ON CONFLICT DO NOTHING;
