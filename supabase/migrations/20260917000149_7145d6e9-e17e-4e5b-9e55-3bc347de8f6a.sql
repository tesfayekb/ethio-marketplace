-- U6-A1-2 — DEC-068 residency facts; DEC-070 verdicts; DEC-071 rate limits;
-- listing revisions; listings permissions.
--
-- D2 EXCEPTION, recorded: the admin.roles.perm.action.review / .enforce keys
-- (EN + AM) ride the next code turn (A2) — this landing touches no src/.

-- INC-200 BEFORE-STATE: every function fingerprint, so the read-back can prove
-- that nothing outside this landing's own two new functions changed.
CREATE TEMP TABLE _a1_2_before AS
  SELECT p.oid::regprocedure::text AS sig, md5(pg_get_functiondef(p.oid)) AS fp
    FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
   WHERE n.nspname = 'public';

-- ===================================================================== 3.1
-- DEC-068 — residency FACTS. The first observation is a fact and is never
-- rewritten; counsel's rule (Q-014) changes residency_country_for and nothing
-- else.
ALTER TABLE public.user_directory
  ADD COLUMN IF NOT EXISTS observed_country_code char(2) NULL,
  ADD COLUMN IF NOT EXISTS observed_at timestamptz NULL,
  ADD COLUMN IF NOT EXISTS standing jsonb NOT NULL DEFAULT '{}'::jsonb;

CREATE OR REPLACE FUNCTION public.residency_country_for(p_user_id uuid, p_request_country text)
RETURNS char(2)
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_stored char(2);
  v_candidate char(2);
BEGIN
  SELECT observed_country_code INTO v_stored
    FROM public.user_directory WHERE user_id = p_user_id;

  IF v_stored IS NOT NULL THEN
    RETURN v_stored;
  END IF;

  IF p_request_country IS NOT NULL AND p_request_country ~ '^[A-Z]{2}$'
     AND EXISTS (SELECT 1 FROM public.countries c WHERE c.code = p_request_country) THEN
    v_candidate := p_request_country;
    UPDATE public.user_directory
       SET observed_country_code = v_candidate,
           observed_at = now()
     WHERE user_id = p_user_id
       AND observed_country_code IS NULL;
    RETURN v_candidate;
  END IF;

  -- Nothing is known: the caller refuses 'residencyUnknown'.
  RETURN NULL;
END $$;

REVOKE ALL ON FUNCTION public.residency_country_for(uuid, text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.residency_country_for(uuid, text) FROM anon;
GRANT EXECUTE ON FUNCTION public.residency_country_for(uuid, text) TO authenticated;
GRANT ALL ON FUNCTION public.residency_country_for(uuid, text) TO service_role;

-- ===================================================================== 3.2
CREATE TABLE IF NOT EXISTS public.listing_revisions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id uuid NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
  seller_id uuid NOT NULL,
  kind text NOT NULL CHECK (kind IN ('create','edit','state')),
  before jsonb,
  after jsonb,
  actor uuid,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT ALL ON public.listing_revisions TO service_role;
-- Supabase's default privileges on `public` hand every new table to the browser
-- roles at birth; a service-only table must take that back explicitly.
REVOKE ALL ON public.listing_revisions FROM anon, authenticated;
ALTER TABLE public.listing_revisions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS listing_revisions_no_client ON public.listing_revisions;
CREATE POLICY listing_revisions_no_client ON public.listing_revisions
  FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);
CREATE INDEX IF NOT EXISTS listing_revisions_listing_idx
  ON public.listing_revisions (listing_id);

-- ===================================================================== 3.3
CREATE TABLE IF NOT EXISTS public.screening_verdicts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id uuid NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
  tier text NOT NULL CHECK (tier IN ('auto_live','auto_reject','auto_remove','held','human')),
  verdict text NOT NULL,
  confidence numeric(4,3) NULL,
  flags jsonb NOT NULL DEFAULT '[]'::jsonb,
  model text,
  model_version text,
  rationale text,
  reviewer uuid NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT ALL ON public.screening_verdicts TO service_role;
REVOKE ALL ON public.screening_verdicts FROM anon, authenticated;
ALTER TABLE public.screening_verdicts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS screening_verdicts_no_client ON public.screening_verdicts;
CREATE POLICY screening_verdicts_no_client ON public.screening_verdicts
  FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);
CREATE INDEX IF NOT EXISTS screening_verdicts_listing_idx
  ON public.screening_verdicts (listing_id, created_at DESC);

-- ===================================================================== 3.4
CREATE TABLE IF NOT EXISTS public.rate_limits (
  key text NOT NULL,
  action text NOT NULL,
  window_start timestamptz NOT NULL,
  count integer NOT NULL DEFAULT 0,
  PRIMARY KEY (key, action, window_start)
);

GRANT ALL ON public.rate_limits TO service_role;
REVOKE ALL ON public.rate_limits FROM anon, authenticated;
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS rate_limits_no_client ON public.rate_limits;
CREATE POLICY rate_limits_no_client ON public.rate_limits
  FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);

CREATE OR REPLACE FUNCTION public.consume_rate_limit(
  p_action text,
  p_key text,
  p_limit integer,
  p_window interval
)
RETURNS jsonb
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_secs numeric := extract(epoch from p_window);
  v_start timestamptz;
  v_count integer;
BEGIN
  IF v_secs IS NULL OR v_secs <= 0 THEN
    RAISE EXCEPTION 'badWindow';
  END IF;
  v_start := to_timestamp(floor(extract(epoch from clock_timestamp()) / v_secs) * v_secs);

  INSERT INTO public.rate_limits (key, action, window_start, count)
  VALUES (p_key, p_action, v_start, 1)
  ON CONFLICT (key, action, window_start)
  DO UPDATE SET count = public.rate_limits.count + 1
  RETURNING count INTO v_count;

  -- A refusal is an ANSWER, never an exception: the caller renders it.
  RETURN jsonb_build_object(
    'allowed', v_count <= p_limit,
    'remaining', greatest(p_limit - v_count, 0),
    'resets_at', v_start + p_window
  );
END $$;

REVOKE ALL ON FUNCTION public.consume_rate_limit(text, text, integer, interval) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.consume_rate_limit(text, text, integer, interval) FROM anon;
GRANT EXECUTE ON FUNCTION public.consume_rate_limit(text, text, integer, interval) TO authenticated;
GRANT ALL ON FUNCTION public.consume_rate_limit(text, text, integer, interval) TO service_role;

-- ===================================================================== 3.5
-- DEC-017 pattern: named actions replace the blanket grant.
INSERT INTO public.permissions (resource_id, action, description, requires_step_up, assignable)
SELECT r.id, v.action, v.descr, v.step_up, true
  FROM public.resources r
  CROSS JOIN (VALUES
    ('view',    'See listings in the console',                  false),
    ('review',  'Review a held or screened listing',            true),
    ('enforce', 'Reject, reduce or remove a listing',           true)
  ) AS v(action, descr, step_up)
 WHERE r.name = 'listings'
   AND NOT EXISTS (
     SELECT 1 FROM public.permissions p
      WHERE p.resource_id = r.id AND p.action = v.action);

-- Roles that held listings:manage inherit view + review + enforce.
INSERT INTO public.role_permissions (role_id, permission_id, is_core)
SELECT DISTINCT rp.role_id, np.id, rp.is_core
  FROM public.role_permissions rp
  JOIN public.permissions mp ON mp.id = rp.permission_id
  JOIN public.resources r ON r.id = mp.resource_id AND r.name = 'listings'
  JOIN public.permissions np ON np.resource_id = r.id
                            AND np.action IN ('view','review','enforce')
 WHERE mp.action = 'manage'
   AND NOT EXISTS (
     SELECT 1 FROM public.role_permissions x
      WHERE x.role_id = rp.role_id AND x.permission_id = np.id);

-- The blanket grant is retired (the permission row itself stays for history in
-- other resources; only the listings grants go).
DELETE FROM public.role_permissions rp
 USING public.permissions p, public.resources r
 WHERE rp.permission_id = p.id
   AND p.resource_id = r.id
   AND r.name = 'listings'
   AND p.action = 'manage';

-- ===================================================================== 3.6
DO $readback$
DECLARE
  v_row record;
  v_res jsonb;
  v_res2 jsonb;
  v_res3 jsonb;
  v_key text := 'zz-u6a1-ratelimit-proof';
  v_changed text;
BEGIN
  -- RLS + policies on the three new tables.
  FOR v_row IN
    SELECT c.relname, c.relrowsecurity,
           (SELECT count(*) FROM pg_policy pol WHERE pol.polrelid = c.oid) AS policies
      FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace
     WHERE n.nspname = 'public'
       AND c.relname IN ('listing_revisions','screening_verdicts','rate_limits')
  LOOP
    IF NOT v_row.relrowsecurity OR v_row.policies < 1 THEN
      RAISE EXCEPTION 'READ-BACK FAILED: % rls=% policies=%',
        v_row.relname, v_row.relrowsecurity, v_row.policies;
    END IF;
    RAISE NOTICE 'READ-BACK ok: % — RLS enabled, % policy (deny-all for client roles)',
      v_row.relname, v_row.policies;
  END LOOP;

  -- No client role holds any privilege on the three tables.
  IF EXISTS (
    SELECT 1 FROM information_schema.role_table_grants
     WHERE table_schema = 'public'
       AND table_name IN ('listing_revisions','screening_verdicts','rate_limits')
       AND grantee IN ('anon','authenticated')
  ) THEN
    RAISE EXCEPTION 'READ-BACK FAILED: a client role holds a grant on a service-only table';
  END IF;
  RAISE NOTICE 'READ-BACK ok: anon/authenticated hold NO grant on the three new tables';

  -- ACLs: anon holds EXECUTE on the three public reads only.
  FOR v_row IN
    SELECT p.proname,
           has_function_privilege('anon', p.oid, 'EXECUTE') AS anon_x,
           has_function_privilege('authenticated', p.oid, 'EXECUTE') AS auth_x
      FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
     WHERE n.nspname = 'public'
       AND p.proname IN ('get_posting_schema','get_attribute_options',
                         'get_attribute_options_version','validate_listing_attributes',
                         'residency_country_for','consume_rate_limit',
                         'effective_category_links')
     ORDER BY p.proname
  LOOP
    RAISE NOTICE 'ACL: % anon=% authenticated=%', v_row.proname, v_row.anon_x, v_row.auth_x;
    IF v_row.proname IN ('get_posting_schema','get_attribute_options','get_attribute_options_version')
       AND NOT (v_row.anon_x AND v_row.auth_x) THEN
      RAISE EXCEPTION 'READ-BACK FAILED: % must be callable by anon and authenticated', v_row.proname;
    END IF;
    IF v_row.proname IN ('validate_listing_attributes','residency_country_for','consume_rate_limit')
       AND (v_row.anon_x OR NOT v_row.auth_x) THEN
      RAISE EXCEPTION 'READ-BACK FAILED: % must be authenticated-only', v_row.proname;
    END IF;
    IF v_row.proname = 'effective_category_links' AND (v_row.anon_x OR v_row.auth_x) THEN
      RAISE EXCEPTION 'READ-BACK FAILED: the shared helper must not be client-callable';
    END IF;
  END LOOP;

  -- Rate limit: a limit of 2 in a one-minute window allows twice, refuses the third.
  v_res  := public.consume_rate_limit('zz-u6a1-proof', v_key, 2, interval '1 minute');
  v_res2 := public.consume_rate_limit('zz-u6a1-proof', v_key, 2, interval '1 minute');
  v_res3 := public.consume_rate_limit('zz-u6a1-proof', v_key, 2, interval '1 minute');
  IF (v_res->>'allowed')::boolean IS NOT TRUE
     OR (v_res2->>'allowed')::boolean IS NOT TRUE
     OR (v_res3->>'allowed')::boolean IS NOT FALSE
     OR (v_res3->>'resets_at')::timestamptz <= now() THEN
    RAISE EXCEPTION 'READ-BACK FAILED: rate limit — % / % / %', v_res, v_res2, v_res3;
  END IF;
  RAISE NOTICE 'READ-BACK ok: rate limit 2/min -> % | % | %', v_res, v_res2, v_res3;
  DELETE FROM public.rate_limits WHERE key = v_key;

  -- Permissions.
  FOR v_row IN
    SELECT p.action, p.requires_step_up,
           (SELECT count(*) FROM public.role_permissions rp WHERE rp.permission_id = p.id) AS roles
      FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'listings' ORDER BY p.action
  LOOP
    RAISE NOTICE 'PERM listings:% step_up=% roles=%', v_row.action, v_row.requires_step_up, v_row.roles;
  END LOOP;
  IF EXISTS (
    SELECT 1 FROM public.role_permissions rp
      JOIN public.permissions p ON p.id = rp.permission_id
      JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'listings' AND p.action = 'manage'
  ) THEN
    RAISE EXCEPTION 'READ-BACK FAILED: a listings:manage grant survived';
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'listings' AND p.action = 'review' AND p.requires_step_up
  ) OR NOT EXISTS (
    SELECT 1 FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'listings' AND p.action = 'enforce' AND p.requires_step_up
  ) THEN
    RAISE EXCEPTION 'READ-BACK FAILED: review/enforce missing or not step-up gated';
  END IF;
  RAISE NOTICE 'READ-BACK ok: listings:manage retired; review + enforce require step-up';

  -- INC-200: no function outside this landing changed fingerprint.
  SELECT string_agg(b.sig, ', ') INTO v_changed
    FROM _a1_2_before b
    JOIN pg_proc p ON p.oid::regprocedure::text = b.sig
   WHERE md5(pg_get_functiondef(p.oid)) <> b.fp;
  IF v_changed IS NOT NULL THEN
    RAISE EXCEPTION 'READ-BACK FAILED: unexpected function change — %', v_changed;
  END IF;
  RAISE NOTICE 'READ-BACK ok: no pre-existing function changed (only residency_country_for and consume_rate_limit are new)';
END $readback$;

DROP TABLE IF EXISTS _a1_2_before;

INSERT INTO public.migration_marks(version) VALUES ('20260917010000') ON CONFLICT DO NOTHING;