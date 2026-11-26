-- e2e-areas: admin-roles

-- Cursor bundle 8b, Part 1, file A of two — OUR OWN ERROR REPORTS: THE TABLE, ITS WRITE, ITS CORES, ITS ERASE (DEC-474
-- Part F; brief docs/governance/briefs/cursor-bundle-8b.md STEP 2). Every failure in the field that is ours is recorded
-- once, cleaned of personal data before this write, grouped, kept 12 months (DEC-130). G74's order: the write function
-- and the cores (this file), then the doors (file B).
--   1. error_report_kinds() — the one list of a report's kinds, read by the table's CHECK and file B's filter.
--   2. error_reports — born closed (four deny policies, no browser grant); no column names a person, an address, a query
--      string or a body. Two indexes: (seen_at, id) for a window and the erase; (group_key, seen_at, id) for one group's
--      keyset page.
--   3. record_error_report(…) — the service-only write. It computes the message's shape (ids, quoted values and digits
--      replaced) and the group key: md5 of the kind, the code, the shape and the place.
--   4. error_groups_core, error_occurrences_core, error_stats_core — the reads, each with an id scope (p_only) so a proof
--      reads its own scratch rows only (INC-980's form); the doors pass NULL.
--   5. error_reports_prune_core(uuid[]) / error_reports_prune() and their heartbeat (the prune family's form,
--      job_runs_prune), scheduled daily.
-- Every function here is the service role's alone. Proofs on scratch rows under a sentinel rollback.

DO $pre$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261126040000') THEN
    RAISE EXCEPTION 'cursor-bundle-8b part 1 file A: the mark 20261126040000 must be applied first';
  END IF;
  IF to_regclass('public.error_reports') IS NOT NULL THEN
    RAISE EXCEPTION 'cursor-bundle-8b part 1 file A: error_reports already exists';
  END IF;
END $pre$;

-- ------------------------------------------------------------ 1. the kinds
CREATE FUNCTION public.error_report_kinds()
RETURNS text[]
LANGUAGE sql
IMMUTABLE
SET search_path = public
AS $function$ SELECT ARRAY['notice', 'crash', 'unhandled', 'route', 'upstream', 'render']::text[] $function$;
COMMENT ON FUNCTION public.error_report_kinds() IS
  'DEC-474 Part F: a report''s kinds — notice (a failure the notice draws as the server''s), crash (the crash boundary), unhandled (an error or rejection no code caught, in the browser), route (a 500 our server answered), upstream (an outside service our server reads failed), render (the server render failed).';
REVOKE ALL ON FUNCTION public.error_report_kinds() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.error_report_kinds() TO service_role;

-- ------------------------------------------------------------ 2. the table and its heartbeat
CREATE TABLE public.error_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  seen_at timestamptz NOT NULL DEFAULT now(),
  kind text NOT NULL CHECK (kind = ANY (public.error_report_kinds())),
  code text CHECK (code ~ '^[A-Za-z0-9][A-Za-z0-9_.:-]{0,63}$'),
  message text NOT NULL CHECK (char_length(message) BETWEEN 1 AND 500),
  shape text NOT NULL CHECK (char_length(shape) BETWEEN 1 AND 2000),
  place text CHECK (char_length(place) BETWEEN 1 AND 300 AND place !~ '[?#]'),
  path text NOT NULL CHECK (char_length(path) <= 300 AND path ~ '^/[^?#[:cntrl:]]*$'),
  browser text CHECK (char_length(browser) BETWEEN 1 AND 40),
  engine text CHECK (char_length(engine) BETWEEN 1 AND 40),
  browser_version text CHECK (browser_version ~ '^[0-9A-Za-z._-]{1,20}$'),
  device text CHECK (device IN ('phone', 'tablet', 'desktop')),
  language text CHECK (language ~ '^[a-z]{2,3}(-[A-Za-z0-9]{2,8})?$'),
  app_version text CHECK (app_version ~ '^[0-9A-Za-z._-]{1,40}$'),
  signed_in boolean NOT NULL,
  group_key text NOT NULL CHECK (group_key ~ '^[0-9a-f]{32}$'),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
COMMENT ON TABLE public.error_reports IS
  'DEC-474 Part F: one row per failure in the field that is ours, cleaned before the write (the one cleaner, run by the browser and again by the server). Never an account, a name, an e-mail, a phone number, an address, a token, a query string, a body or a cookie. Written by record_error_report (service only), read by the three errors:view doors, erased after 12 months (error_reports_prune).';
REVOKE ALL ON public.error_reports FROM PUBLIC, anon, authenticated;
GRANT ALL ON public.error_reports TO service_role;
ALTER TABLE public.error_reports ENABLE ROW LEVEL SECURITY;
CREATE POLICY error_reports_deny_select ON public.error_reports FOR SELECT TO anon, authenticated USING (false);
CREATE POLICY error_reports_deny_insert ON public.error_reports FOR INSERT TO anon, authenticated WITH CHECK (false);
CREATE POLICY error_reports_deny_update ON public.error_reports FOR UPDATE TO anon, authenticated USING (false) WITH CHECK (false);
CREATE POLICY error_reports_deny_delete ON public.error_reports FOR DELETE TO anon, authenticated USING (false);
CREATE INDEX error_reports_seen_idx ON public.error_reports (seen_at DESC, id DESC);
CREATE INDEX error_reports_group_idx ON public.error_reports (group_key, seen_at DESC, id DESC);
CREATE TRIGGER error_reports_updated_at BEFORE UPDATE ON public.error_reports
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.error_reports_prune_runs (
  id bigserial PRIMARY KEY,
  ran_at timestamptz NOT NULL DEFAULT now(),
  deleted integer NOT NULL CHECK (deleted >= 0),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
REVOKE ALL ON public.error_reports_prune_runs FROM PUBLIC, anon, authenticated;
GRANT ALL ON public.error_reports_prune_runs TO service_role;
ALTER TABLE public.error_reports_prune_runs ENABLE ROW LEVEL SECURITY;
CREATE POLICY error_reports_prune_runs_deny_select ON public.error_reports_prune_runs FOR SELECT TO anon, authenticated USING (false);
CREATE POLICY error_reports_prune_runs_deny_insert ON public.error_reports_prune_runs FOR INSERT TO anon, authenticated WITH CHECK (false);
CREATE POLICY error_reports_prune_runs_deny_update ON public.error_reports_prune_runs FOR UPDATE TO anon, authenticated USING (false) WITH CHECK (false);
CREATE POLICY error_reports_prune_runs_deny_delete ON public.error_reports_prune_runs FOR DELETE TO anon, authenticated USING (false);
REVOKE ALL ON SEQUENCE public.error_reports_prune_runs_id_seq FROM PUBLIC, anon, authenticated;
GRANT ALL ON SEQUENCE public.error_reports_prune_runs_id_seq TO service_role;
CREATE TRIGGER error_reports_prune_runs_updated_at BEFORE UPDATE ON public.error_reports_prune_runs
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ------------------------------------------------------------ 3. the write
CREATE FUNCTION public.record_error_report(
  p_kind text, p_code text, p_message text, p_place text, p_path text, p_browser text, p_engine text,
  p_browser_version text, p_device text, p_language text, p_app_version text, p_signed_in boolean)
RETURNS uuid
LANGUAGE plpgsql
VOLATILE SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
  v_shape text;
  v_id    uuid;
BEGIN
  -- The message's shape: a uuid, a quoted value, a long hex id, then every run of digits, each by one placeholder.
  v_shape := regexp_replace(regexp_replace(regexp_replace(regexp_replace(p_message,
               '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}', '<id>', 'gi'),
               '"[^"]*"|''[^'']*''|`[^`]*`', '<q>', 'g'),
               '\m[0-9a-f]{12,}\M', '<id>', 'gi'),
               '[0-9]+', '<n>', 'g');
  INSERT INTO public.error_reports (kind, code, message, shape, place, path, browser, engine, browser_version, device,
                                    language, app_version, signed_in, group_key)
  VALUES (p_kind, p_code, p_message, v_shape, p_place, p_path, p_browser, p_engine, p_browser_version, p_device,
          p_language, p_app_version, p_signed_in,
          md5(concat_ws(chr(31), p_kind, coalesce(p_code, ''), v_shape, coalesce(p_place, ''))))
  RETURNING id INTO v_id;
  RETURN v_id;
END $function$;
COMMENT ON FUNCTION public.record_error_report(text, text, text, text, text, text, text, text, text, text, text, boolean) IS
  'DEC-474 Part F: the one write of an error report, called by the server (service role only) after the cleaner ran; the group key is md5(kind, code, the message''s shape, place).';
REVOKE ALL ON FUNCTION public.record_error_report(text, text, text, text, text, text, text, text, text, text, text, boolean) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.record_error_report(text, text, text, text, text, text, text, text, text, text, text, boolean) TO service_role;

-- ------------------------------------------------------------ 4. the cores (p_only scopes a proof; the doors pass NULL)
CREATE FUNCTION public.error_groups_core(p_days integer, p_kind text, p_only uuid[])
RETURNS jsonb
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $function$
  WITH scope AS (
    SELECT r.group_key, r.kind, r.code, r.shape, r.place, r.seen_at FROM public.error_reports r
     WHERE r.seen_at > now() - make_interval(days => p_days)
       AND (p_kind IS NULL OR r.kind = p_kind)
       AND (p_only IS NULL OR r.id = ANY (p_only))
  ), grouped AS (
    SELECT s.group_key, min(s.kind) AS kind, min(s.code) AS code, min(s.shape) AS shape, min(s.place) AS place,
           count(*)::integer AS count, min(s.seen_at) AS first_seen, max(s.seen_at) AS last_seen
      FROM scope s GROUP BY s.group_key
  ), page AS (
    SELECT * FROM grouped ORDER BY last_seen DESC, group_key LIMIT 201
  )
  SELECT jsonb_build_object(
    'rows', coalesce((
      SELECT jsonb_agg(jsonb_build_object('group', g.group_key, 'kind', g.kind, 'code', g.code, 'shape', g.shape,
                                          'place', g.place, 'count', g.count, 'first_seen', g.first_seen,
                                          'last_seen', g.last_seen) ORDER BY g.last_seen DESC, g.group_key)
        FROM (SELECT * FROM page ORDER BY last_seen DESC, group_key LIMIT 200) g), '[]'::jsonb),
    'more', (SELECT count(*) FROM page) > 200);
$function$;
REVOKE ALL ON FUNCTION public.error_groups_core(integer, text, uuid[]) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.error_groups_core(integer, text, uuid[]) TO service_role;

CREATE FUNCTION public.error_occurrences_core(p_group text, p_before_at timestamptz, p_before_id uuid, p_limit integer,
                                              p_only uuid[])
RETURNS jsonb
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $function$
  WITH page AS (
    SELECT r.* FROM public.error_reports r
     WHERE r.group_key = p_group
       AND (p_only IS NULL OR r.id = ANY (p_only))
       AND (p_before_at IS NULL OR (r.seen_at, r.id) < (p_before_at, p_before_id))
     ORDER BY r.seen_at DESC, r.id DESC LIMIT p_limit + 1
  ), shown AS (
    SELECT * FROM page ORDER BY seen_at DESC, id DESC LIMIT p_limit
  )
  SELECT jsonb_build_object(
    'rows', coalesce((
      SELECT jsonb_agg(jsonb_build_object('id', s.id, 'seen_at', s.seen_at, 'kind', s.kind, 'code', s.code,
                                          'message', s.message, 'place', s.place, 'path', s.path, 'browser', s.browser,
                                          'engine', s.engine, 'browser_version', s.browser_version, 'device', s.device,
                                          'language', s.language, 'app_version', s.app_version,
                                          'signed_in', s.signed_in) ORDER BY s.seen_at DESC, s.id DESC)
        FROM shown s), '[]'::jsonb),
    'next', CASE WHEN (SELECT count(*) FROM page) > p_limit THEN (
      SELECT jsonb_build_object('at', seen_at, 'id', id) FROM shown ORDER BY seen_at ASC, id ASC LIMIT 1) END);
$function$;
REVOKE ALL ON FUNCTION public.error_occurrences_core(text, timestamp with time zone, uuid, integer, uuid[]) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.error_occurrences_core(text, timestamp with time zone, uuid, integer, uuid[]) TO service_role;

CREATE FUNCTION public.error_stats_core(p_days integer, p_only uuid[])
RETURNS jsonb
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $function$
  WITH scope AS (
    SELECT r.seen_at, r.kind, r.path, r.browser, r.browser_version, r.app_version FROM public.error_reports r
     WHERE r.seen_at > now() - make_interval(days => p_days)
       AND (p_only IS NULL OR r.id = ANY (p_only))
  )
  SELECT jsonb_build_object(
    'days', coalesce((
      SELECT jsonb_agg(jsonb_build_object('day', d.day, 'kind', d.kind, 'count', d.count) ORDER BY d.day, d.kind)
        FROM (SELECT (s.seen_at AT TIME ZONE 'utc')::date AS day, s.kind, count(*)::integer AS count
                FROM scope s GROUP BY 1, 2) d), '[]'::jsonb),
    'pages', coalesce((
      SELECT jsonb_agg(jsonb_build_object('path', t.path, 'count', t.count) ORDER BY t.count DESC, t.path)
        FROM (SELECT s.path, count(*)::integer AS count FROM scope s
               GROUP BY s.path ORDER BY count(*) DESC, s.path LIMIT 10) t), '[]'::jsonb),
    'browsers', coalesce((
      SELECT jsonb_agg(jsonb_build_object('browser', t.browser, 'version', t.browser_version, 'count', t.count)
                       ORDER BY t.count DESC, t.browser NULLS LAST, t.browser_version NULLS LAST)
        FROM (SELECT s.browser, s.browser_version, count(*)::integer AS count FROM scope s
               GROUP BY s.browser, s.browser_version
               ORDER BY count(*) DESC, s.browser NULLS LAST, s.browser_version NULLS LAST LIMIT 10) t), '[]'::jsonb),
    'versions', coalesce((
      SELECT jsonb_agg(jsonb_build_object('app_version', t.app_version, 'count', t.count)
                       ORDER BY t.count DESC, t.app_version NULLS LAST)
        FROM (SELECT s.app_version, count(*)::integer AS count FROM scope s
               GROUP BY s.app_version ORDER BY count(*) DESC, s.app_version NULLS LAST LIMIT 10) t), '[]'::jsonb));
$function$;
REVOKE ALL ON FUNCTION public.error_stats_core(integer, uuid[]) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.error_stats_core(integer, uuid[]) TO service_role;

-- ------------------------------------------------------------ 5. the erase (12 months, DEC-130) and its schedule
CREATE FUNCTION public.error_reports_prune_core(p_only uuid[])
RETURNS integer
LANGUAGE plpgsql
VOLATILE SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
  v_count integer;
BEGIN
  DELETE FROM public.error_reports r
   WHERE r.seen_at < now() - interval '12 months'
     AND (p_only IS NULL OR r.id = ANY (p_only));
  GET DIAGNOSTICS v_count = ROW_COUNT;
  INSERT INTO public.error_reports_prune_runs (deleted) VALUES (v_count);
  IF p_only IS NULL THEN
    DELETE FROM public.error_reports_prune_runs WHERE ran_at < now() - interval '14 days';
  END IF;
  RETURN v_count;
END;
$function$;
REVOKE ALL ON FUNCTION public.error_reports_prune_core(uuid[]) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.error_reports_prune_core(uuid[]) TO service_role;

CREATE FUNCTION public.error_reports_prune()
RETURNS integer
LANGUAGE sql
VOLATILE SECURITY DEFINER
SET search_path = public
AS $function$ SELECT public.error_reports_prune_core(NULL) $function$;
REVOKE ALL ON FUNCTION public.error_reports_prune() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.error_reports_prune() TO service_role;

DO $cron$
BEGIN
  IF EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'error-reports-prune') THEN
    PERFORM cron.unschedule('error-reports-prune');
  END IF;
  PERFORM cron.schedule('error-reports-prune', '29 4 * * *', 'SELECT public.error_reports_prune()');
END;
$cron$;

-- ------------------------------------------------------------ PROOFS (scratch rows only, rolled back by the sentinel)
--   (a) the table and its heartbeat closed to the browser roles (no privilege, row security, four deny policies each);
--       every function here executed by the service role only; the schedule.
--   (b) the write: the shape and the group key (digits, ids and quoted values replaced; a different place, another
--       group); a kind, a path, a code or a device out of shape is refused by the table.
--   (c) the cores on scratch ids: the groups (count, first and last seen, the kind filter, the window), one group's keyset
--       pages, the stats.
--   (d) the erase: only the scratch row older than 12 months goes; its heartbeat counts it; a scoped run trims none.
--   (e) the plans: one group's page by error_reports_group_idx, a window by error_reports_seen_idx.
DO $proof$
DECLARE
  -- Letters only (law 15): a scratch key never reads as a number.
  v_stem    text := translate(substr(md5(gen_random_uuid()::text), 1, 10), '0123456789', 'ghijkmnopr');
  v_tag     text;
  v_path    text;
  v_shape   text;
  v_r1      uuid;
  v_r2      uuid;
  v_r3      uuid;
  v_r4      uuid;
  v_r5      uuid;
  v_old     uuid;
  v_young   uuid;
  v_ids     uuid[];
  v_g1      text;
  v_answer  jsonb;
  v_page    jsonb;
  v_call    text;
  v_st      text;
  v_msg     text;
  v_fn      text;
  v_n       integer;
  v_hb      bigint;
  v_text    text;
  v_plan    text := '';
BEGIN
  -- (a)
  FOREACH v_fn IN ARRAY ARRAY['public.error_reports', 'public.error_reports_prune_runs'] LOOP
    IF has_table_privilege('anon', v_fn, 'SELECT, INSERT, UPDATE, DELETE')
       OR has_table_privilege('authenticated', v_fn, 'SELECT, INSERT, UPDATE, DELETE')
       OR NOT (SELECT relrowsecurity FROM pg_class WHERE oid = v_fn::regclass)
       OR (SELECT count(*) FROM pg_policies p WHERE p.schemaname = 'public' AND p.tablename = split_part(v_fn, '.', 2)
             AND p.roles @> ARRAY['anon', 'authenticated']::name[]
             AND coalesce(p.qual, 'false') = 'false' AND coalesce(p.with_check, 'false') = 'false') <> 4 THEN
      RAISE EXCEPTION 'cursor-bundle-8b part 1 file A proof (a): % is not closed to the browser roles', v_fn;
    END IF;
  END LOOP;
  IF has_sequence_privilege('anon', 'public.error_reports_prune_runs_id_seq', 'USAGE')
     OR has_sequence_privilege('authenticated', 'public.error_reports_prune_runs_id_seq', 'USAGE') THEN
    RAISE EXCEPTION 'cursor-bundle-8b part 1 file A proof (a): the heartbeat''s sequence is open';
  END IF;
  FOREACH v_fn IN ARRAY ARRAY[
    'public.error_report_kinds()',
    'public.record_error_report(text,text,text,text,text,text,text,text,text,text,text,boolean)',
    'public.error_groups_core(integer,text,uuid[])',
    'public.error_occurrences_core(text,timestamp with time zone,uuid,integer,uuid[])',
    'public.error_stats_core(integer,uuid[])',
    'public.error_reports_prune_core(uuid[])',
    'public.error_reports_prune()'] LOOP
    IF EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn::regprocedure)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn::regprocedure, 'EXECUTE')
       OR has_function_privilege('authenticated', v_fn::regprocedure, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn::regprocedure, 'EXECUTE') THEN
      RAISE EXCEPTION 'cursor-bundle-8b part 1 file A proof (a): % is not the service role''s alone', v_fn;
    END IF;
  END LOOP;
  IF NOT EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'error-reports-prune' AND schedule = '29 4 * * *'
                  AND command = 'SELECT public.error_reports_prune()' AND active) THEN
    RAISE EXCEPTION 'cursor-bundle-8b part 1 file A proof (a): the erase is not scheduled';
  END IF;

  v_tag := 'e2e-mig-b8b-' || v_stem;
  v_path := '/' || v_tag;
  v_shape := 'Read of item <n> failed for <q> e<n>e-mig-b<n>b-' || v_stem;
  BEGIN
    -- (b)
    v_r1 := public.record_error_report('notice', 'unknownCode', 'Read of item 123 failed for "abc" ' || v_tag,
      'src/e2e-mig.ts:10', v_path, 'Chrome', 'Blink', '131.0', 'phone', NULL, NULL, false);
    v_r2 := public.record_error_report('notice', 'unknownCode',
      'Read of item 98765 failed for "zz" ' || v_tag || ' ' || gen_random_uuid()::text,
      'src/e2e-mig.ts:10', v_path, 'Chrome', 'Blink', '131.0', 'phone', NULL, NULL, true);
    v_r3 := public.record_error_report('notice', 'unknownCode', 'Read of item 123 failed for "abc" ' || v_tag,
      'src/e2e-mig.ts:11', v_path, 'Safari', 'WebKit', '18.1', 'desktop', NULL, NULL, false);
    v_r4 := public.record_error_report('crash', NULL, 'TypeError: x is undefined ' || v_tag, NULL, v_path || '/b',
      NULL, NULL, NULL, NULL, NULL, NULL, true);
    -- r5, shaped as r2 by other digits and quotes, joins r2's group
    v_r5 := public.record_error_report('notice', 'unknownCode',
      'Read of item 4 failed for ''q'' ' || v_tag || ' ' || gen_random_uuid()::text,
      'src/e2e-mig.ts:10', v_path, NULL, NULL, NULL, 'tablet', NULL, NULL, false);
    v_old := public.record_error_report('route', '500', 'Old ' || v_tag, NULL, v_path, NULL, NULL, NULL, NULL, NULL,
      NULL, false);
    v_young := public.record_error_report('route', '500', 'Young ' || v_tag, NULL, v_path, NULL, NULL, NULL, NULL,
      NULL, NULL, false);
    UPDATE public.error_reports SET seen_at = now() - interval '13 months' WHERE id = v_old;
    UPDATE public.error_reports SET seen_at = now() - interval '11 months' WHERE id = v_young;
    UPDATE public.error_reports SET seen_at = now() - interval '2 days' WHERE id = v_r1;
    UPDATE public.error_reports SET seen_at = now() - interval '1 day' WHERE id = v_r2;
    v_ids := ARRAY[v_r1, v_r2, v_r3, v_r4, v_r5, v_old, v_young];
    SELECT group_key INTO STRICT v_g1 FROM public.error_reports WHERE id = v_r2;
    IF (SELECT shape FROM public.error_reports WHERE id = v_r1) IS DISTINCT FROM v_shape
       OR (SELECT shape FROM public.error_reports WHERE id = v_r2) IS DISTINCT FROM v_shape || ' <id>'
       OR (SELECT shape FROM public.error_reports WHERE id = v_r5) IS DISTINCT FROM v_shape || ' <id>' THEN
      RAISE EXCEPTION 'cursor-bundle-8b part 1 file A proof (b): the shapes are %',
        (SELECT array_agg(shape ORDER BY seen_at) FROM public.error_reports WHERE id IN (v_r1, v_r2, v_r5));
    END IF;
    IF (SELECT group_key FROM public.error_reports WHERE id = v_r5) IS DISTINCT FROM v_g1
       OR (SELECT group_key FROM public.error_reports WHERE id = v_r1) = v_g1
       OR (SELECT group_key FROM public.error_reports WHERE id = v_r3)
            = (SELECT group_key FROM public.error_reports WHERE id = v_r1)
       OR v_g1 IS DISTINCT FROM md5(concat_ws(chr(31), 'notice', 'unknownCode', v_shape || ' <id>', 'src/e2e-mig.ts:10')) THEN
      RAISE EXCEPTION 'cursor-bundle-8b part 1 file A proof (b): the group keys differ from their rule';
    END IF;
    FOR v_call IN SELECT unnest(ARRAY[
      format('record_error_report(%L, NULL, %L, NULL, %L, NULL, NULL, NULL, NULL, NULL, NULL, false)', 'bogus', v_tag, v_path),
      format('record_error_report(%L, NULL, %L, NULL, %L, NULL, NULL, NULL, NULL, NULL, NULL, false)', 'route', v_tag, v_path || '?q=a'),
      format('record_error_report(%L, %L, %L, NULL, %L, NULL, NULL, NULL, NULL, NULL, NULL, false)', 'route', 'a b', v_tag, v_path),
      format('record_error_report(%L, NULL, %L, NULL, %L, NULL, NULL, NULL, %L, NULL, NULL, false)', 'route', v_tag, v_path, 'watch')])
    LOOP
      v_st := NULL;
      BEGIN
        EXECUTE 'SELECT public.' || v_call;
      EXCEPTION WHEN check_violation THEN
        v_st := 'refused';
      END;
      IF v_st IS NULL THEN RAISE EXCEPTION 'cursor-bundle-8b part 1 file A proof (b): % was written', v_call; END IF;
    END LOOP;

    -- (c)
    v_answer := public.error_groups_core(7, NULL, v_ids);
    IF jsonb_array_length(v_answer -> 'rows') <> 4 OR (v_answer -> 'more')::boolean
       OR (SELECT (r ->> 'count')::integer FROM jsonb_array_elements(v_answer -> 'rows') r WHERE r ->> 'group' = v_g1) <> 2
       OR (SELECT r ->> 'shape' FROM jsonb_array_elements(v_answer -> 'rows') r WHERE r ->> 'group' = v_g1)
            IS DISTINCT FROM v_shape || ' <id>'
       OR (SELECT (r ->> 'first_seen')::timestamptz < (r ->> 'last_seen')::timestamptz
             FROM jsonb_array_elements(v_answer -> 'rows') r WHERE r ->> 'group' = v_g1) IS NOT TRUE THEN
      RAISE EXCEPTION 'cursor-bundle-8b part 1 file A proof (c): the groups answered %', v_answer;
    END IF;
    v_answer := public.error_groups_core(7, 'crash', v_ids);
    IF jsonb_array_length(v_answer -> 'rows') <> 1 OR v_answer #>> '{rows,0,kind}' <> 'crash' THEN
      RAISE EXCEPTION 'cursor-bundle-8b part 1 file A proof (c): the crash groups answered %', v_answer;
    END IF;
    v_answer := public.error_groups_core(366, 'route', v_ids);
    IF jsonb_array_length(v_answer -> 'rows') <> 1 OR (v_answer #>> '{rows,0,count}')::integer <> 1 THEN
      RAISE EXCEPTION 'cursor-bundle-8b part 1 file A proof (c): the window answered %', v_answer;
    END IF;
    v_page := public.error_occurrences_core(v_g1, NULL, NULL, 1, v_ids);
    IF jsonb_array_length(v_page -> 'rows') <> 1 OR v_page #>> '{rows,0,id}' <> v_r5::text
       OR v_page #>> '{next,id}' IS DISTINCT FROM v_r5::text THEN
      RAISE EXCEPTION 'cursor-bundle-8b part 1 file A proof (c): the first page answered %', v_page;
    END IF;
    v_answer := public.error_occurrences_core(v_g1, (v_page #>> '{next,at}')::timestamptz, (v_page #>> '{next,id}')::uuid,
                                               1, v_ids);
    IF jsonb_array_length(v_answer -> 'rows') <> 1 OR v_answer -> 'next' <> 'null'::jsonb
       OR v_answer #>> '{rows,0,id}' <> v_r2::text
       OR (SELECT array_agg(k ORDER BY k) FROM jsonb_object_keys(v_answer -> 'rows' -> 0) k)
            IS DISTINCT FROM ARRAY['app_version', 'browser', 'browser_version', 'code', 'device', 'engine', 'id', 'kind',
                                   'language', 'message', 'path', 'place', 'seen_at', 'signed_in'] THEN
      RAISE EXCEPTION 'cursor-bundle-8b part 1 file A proof (c): the second page answered %', v_answer;
    END IF;
    v_answer := public.error_stats_core(7, v_ids);
    IF (SELECT sum((d ->> 'count')::integer) FROM jsonb_array_elements(v_answer -> 'days') d) <> 5
       OR v_answer #>> '{pages,0,path}' <> v_path OR (v_answer #>> '{pages,0,count}')::integer <> 4
       OR v_answer #>> '{browsers,0,browser}' <> 'Chrome' OR v_answer #>> '{browsers,0,version}' <> '131.0'
       OR (v_answer #>> '{browsers,0,count}')::integer <> 2 OR jsonb_array_length(v_answer -> 'browsers') <> 3
       OR v_answer #>> '{versions,0,app_version}' IS NOT NULL OR (v_answer #>> '{versions,0,count}')::integer <> 5 THEN
      RAISE EXCEPTION 'cursor-bundle-8b part 1 file A proof (c): the stats answered %', v_answer;
    END IF;

    -- (d)
    v_hb := coalesce((SELECT max(id) FROM public.error_reports_prune_runs), 0);
    v_n := public.error_reports_prune_core(ARRAY[v_old, v_young]);
    IF v_n <> 1 THEN RAISE EXCEPTION 'cursor-bundle-8b part 1 file A proof (d): the erase deleted %', v_n; END IF;
    IF EXISTS (SELECT 1 FROM public.error_reports WHERE id = v_old)
       OR (SELECT count(*) FROM public.error_reports WHERE id = ANY (v_ids)) <> 6 THEN
      RAISE EXCEPTION 'cursor-bundle-8b part 1 file A proof (d): the erase took the wrong rows';
    END IF;
    IF (SELECT deleted FROM public.error_reports_prune_runs WHERE id > v_hb) IS DISTINCT FROM 1 THEN
      RAISE EXCEPTION 'cursor-bundle-8b part 1 file A proof (d): the heartbeat did not count the erase';
    END IF;
    INSERT INTO public.error_reports_prune_runs (ran_at, deleted) VALUES (now() - interval '20 days', 0) RETURNING id INTO v_hb;
    v_n := public.error_reports_prune_core(ARRAY[v_young]);
    IF v_n <> 0 OR NOT EXISTS (SELECT 1 FROM public.error_reports_prune_runs WHERE id = v_hb) THEN
      RAISE EXCEPTION 'cursor-bundle-8b part 1 file A proof (d): a scoped erase deleted % or trimmed the heartbeat', v_n;
    END IF;

    -- (e)
    PERFORM set_config('enable_seqscan', 'off', true);
    FOR v_text IN EXECUTE format('EXPLAIN (COSTS OFF) SELECT id FROM public.error_reports WHERE group_key = %L'
                                 ' AND (seen_at, id) < (now(), %L::uuid) ORDER BY seen_at DESC, id DESC LIMIT 51',
                                 v_g1, gen_random_uuid()) LOOP
      v_plan := v_plan || chr(10) || v_text;
    END LOOP;
    IF v_plan !~ 'error_reports_group_idx' THEN
      RAISE EXCEPTION 'cursor-bundle-8b part 1 file A proof (e): one group''s page is not read by its index: %', v_plan;
    END IF;
    v_plan := '';
    FOR v_text IN EXECUTE 'EXPLAIN (COSTS OFF) SELECT group_key FROM public.error_reports'
                          ' WHERE seen_at > now() - make_interval(days => 7)' LOOP
      v_plan := v_plan || chr(10) || v_text;
    END LOOP;
    IF v_plan !~ 'error_reports_seen_idx' THEN
      RAISE EXCEPTION 'cursor-bundle-8b part 1 file A proof (e): a window is not read by its index: %', v_plan;
    END IF;

    RAISE EXCEPTION 'b8b-part-1-a-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'b8b-part-1-a-proof-ok' THEN RAISE; END IF;
  END;
  IF EXISTS (SELECT 1 FROM public.error_reports WHERE path LIKE v_path || '%') THEN
    RAISE EXCEPTION 'cursor-bundle-8b part 1 file A proof: the rollback left a scratch row';
  END IF;
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261127010000') ON CONFLICT DO NOTHING;
