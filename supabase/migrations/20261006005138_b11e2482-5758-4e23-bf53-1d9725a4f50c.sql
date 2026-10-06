-- M9a — bundle 6 Part A (INC-444, DEC-136): the revise dial.
-- e2e-areas: posting
-- One statement of substance: the dial the six seller writing doors will count
-- against in M9b. A test lowers it for its own user through rate_overrides.
INSERT INTO public.rate_dials (action, max_count, window_seconds) VALUES ('revise', 120, 3600) ON CONFLICT (action) DO UPDATE SET max_count = EXCLUDED.max_count, window_seconds = EXCLUDED.window_seconds;

DO $p$
DECLARE v_max integer; v_win integer;
BEGIN
  SELECT max_count, window_seconds INTO v_max, v_win FROM public.rate_dials WHERE action = 'revise';
  IF v_max IS DISTINCT FROM 120 OR v_win IS DISTINCT FROM 3600 THEN
    RAISE EXCEPTION 'M9a: revise dial reads back (%, %), expected (120, 3600)', v_max, v_win;
  END IF;
END $p$;

INSERT INTO public.migration_marks (version) VALUES ('20261007120000') ON CONFLICT DO NOTHING;