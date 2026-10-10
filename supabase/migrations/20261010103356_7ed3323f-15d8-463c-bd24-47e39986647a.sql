-- Bundle 11 Part A, turn A1 (2026-10-10). Tier A. Admin › Screening's "Preview as buyer" reads what a buyer will see (D120, D128).
-- e2e-areas: admin-screening
-- A. The dial review_reveal: 60 an hour per reviewer.
-- B. admin_screening_facts(p_listing_id uuid): for an ad waiting for review (status 'screening'), to a holder of
--    listings:review — the ad's country (its place's market), which contact methods the seller chose to show
--    (true/false per channel, never a value), and the seller's public name (the public name, and the business
--    name when the seller posts as a business). Nothing else of the seller: no legal name, e-mail or number.
-- C. admin_reveal_listing_contact(p_listing_id uuid, p_channel text): "Show number" — for an ad waiting for review,
--    to a holder of listings:review with a fresh second factor, rate-gated review_reveal; the channel is phone,
--    phone2 or whatsapp and must be one the seller chose to show. Each reveal writes one audit_log row
--    (action listing.contact_revealed, the listing, the channel — never the number), read in Admin › Audit (D128).
--    It is an internal moderation record: nothing shows it to the seller.
-- D. Proofs: catalogue reads and calls with no session only; the doors' behaviour is proven by SC-7..SC-10.

-- ===== A — the dial =====
INSERT INTO public.rate_dials (action, max_count, window_seconds) VALUES ('review_reveal', 60, 3600)
  ON CONFLICT (action) DO UPDATE SET max_count = EXCLUDED.max_count, window_seconds = EXCLUDED.window_seconds;

-- ===== B — the preview's facts =====
CREATE OR REPLACE FUNCTION public.admin_screening_facts(p_listing_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid     uuid := auth.uid();
  v_row     public.listings%ROWTYPE;
  v_country text;
  v_alias   text;
  v_type    text;
  v_biz     text;
  v_pref    jsonb;
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'not signed in';
  END IF;
  IF NOT public.has_permission(v_uid, 'listings', 'review') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;

  SELECT * INTO v_row FROM public.listings l WHERE l.id = p_listing_id;
  IF NOT FOUND OR v_row.status <> 'screening' THEN
    RAISE EXCEPTION 'listing not found';
  END IF;

  SELECT l.country_code INTO v_country FROM public.locations l WHERE l.id = v_row.location_id;
  SELECT p.seller_alias, p.seller_type, p.business_name INTO v_alias, v_type, v_biz
    FROM public.profiles p
   WHERE p.user_id = v_row.seller_id;
  v_pref := coalesce(v_row.contact_pref, '{}'::jsonb);

  RETURN jsonb_build_object(
    'country', coalesce(v_country, v_row.home_country_code),
    'channels', jsonb_build_object(
      'phone',    coalesce((v_pref->'phone'->>'show')::boolean, false),
      'phone2',   coalesce((v_pref->'phone2'->>'show')::boolean, false),
      'telegram', coalesce((v_pref->'telegram'->>'show')::boolean, false),
      'whatsapp', coalesce((v_pref->'whatsapp'->>'show')::boolean, false)),
    'seller', jsonb_build_object(
      'alias', v_alias,
      'business_name', CASE WHEN v_type = 'business' THEN v_biz END));
END $$;

REVOKE ALL ON FUNCTION public.admin_screening_facts(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_screening_facts(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.admin_screening_facts(uuid) TO service_role;

-- ===== C — "Show number", logged =====
CREATE OR REPLACE FUNCTION public.admin_reveal_listing_contact(p_listing_id uuid, p_channel text)
RETURNS jsonb
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid   uuid := auth.uid();
  v_rate  jsonb;
  v_row   public.listings%ROWTYPE;
  v_entry jsonb;
  v_value text;
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'not signed in';
  END IF;
  IF NOT public.has_permission(v_uid, 'listings', 'review') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('listings', 'review');
  IF p_channel IS NULL OR p_channel NOT IN ('phone', 'phone2', 'whatsapp') THEN
    RAISE EXCEPTION 'unknown channel';
  END IF;

  v_rate := public.rate_gate('review_reveal');
  IF NOT coalesce((v_rate->>'allowed')::boolean, false) THEN
    RETURN jsonb_build_object('ok', false, 'reason', 'rateLimited', 'resets_at', v_rate->>'resets_at');
  END IF;

  SELECT * INTO v_row FROM public.listings l WHERE l.id = p_listing_id;
  IF NOT FOUND OR v_row.status <> 'screening' THEN
    RAISE EXCEPTION 'listing not found';
  END IF;

  v_entry := coalesce(v_row.contact_pref, '{}'::jsonb) -> p_channel;
  v_value := btrim(coalesce(v_entry->>'value', ''));
  IF coalesce((v_entry->>'show')::boolean, false) IS NOT TRUE OR v_value = '' THEN
    RETURN jsonb_build_object('ok', false, 'reason', 'notShown');
  END IF;

  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
    VALUES (v_uid, 'listing.contact_revealed', 'listing', p_listing_id::text,
            jsonb_build_object('channel', p_channel));

  RETURN jsonb_build_object('ok', true, 'channel', p_channel, 'value', v_value);
END $$;

REVOKE ALL ON FUNCTION public.admin_reveal_listing_contact(uuid, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_reveal_listing_contact(uuid, text) TO authenticated;
GRANT ALL ON FUNCTION public.admin_reveal_listing_contact(uuid, text) TO service_role;

-- ===== D — proofs =====
DO $proof$
DECLARE
  v_fn text;
  v_ok boolean;
BEGIN
  -- D1: the dial.
  IF NOT EXISTS (SELECT 1 FROM public.rate_dials
                  WHERE action = 'review_reveal' AND max_count = 60 AND window_seconds = 3600) THEN
    RAISE EXCEPTION 'A1 D1: the dial';
  END IF;

  -- D2: both doors are definers with a fixed search path; the signed-in role runs them, anon and PUBLIC do not.
  FOREACH v_fn IN ARRAY ARRAY['public.admin_screening_facts(uuid)', 'public.admin_reveal_listing_contact(uuid,text)'] LOOP
    IF NOT (SELECT p.prosecdef FROM pg_catalog.pg_proc p WHERE p.oid = v_fn::regprocedure)
       OR NOT EXISTS (SELECT 1 FROM pg_catalog.pg_proc p, unnest(p.proconfig) cfg
                       WHERE p.oid = v_fn::regprocedure AND cfg = 'search_path=public') THEN
      RAISE EXCEPTION 'A1 D2: % is not a definer with a search path', v_fn;
    END IF;
    IF pg_catalog.has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT pg_catalog.has_function_privilege('authenticated', v_fn, 'EXECUTE')
       OR EXISTS (SELECT 1 FROM pg_catalog.pg_proc p, aclexplode(p.proacl) x
                   WHERE p.oid = v_fn::regprocedure AND x.grantee = 0) THEN
      RAISE EXCEPTION 'A1 D2: % privileges', v_fn;
    END IF;
  END LOOP;
  IF (SELECT p.provolatile FROM pg_catalog.pg_proc p WHERE p.oid = 'public.admin_screening_facts(uuid)'::regprocedure) <> 's'
     OR (SELECT p.provolatile FROM pg_catalog.pg_proc p WHERE p.oid = 'public.admin_reveal_listing_contact(uuid,text)'::regprocedure) <> 'v' THEN
    RAISE EXCEPTION 'A1 D2: volatility';
  END IF;

  -- D3: the gates are in place, in order, and the log never carries the value.
  IF pg_get_functiondef('public.admin_screening_facts(uuid)'::regprocedure)
       NOT LIKE '%has_permission(v_uid, ''listings'', ''review'')%'
     OR pg_get_functiondef('public.admin_reveal_listing_contact(uuid,text)'::regprocedure)
       NOT LIKE '%has_permission(v_uid, ''listings'', ''review'')%require_step_up_if_needed(''listings'', ''review'')%rate_gate(''review_reveal'')%INSERT INTO public.audit_log%' THEN
    RAISE EXCEPTION 'A1 D3: a gate is missing or out of order';
  END IF;
  IF pg_get_functiondef('public.admin_reveal_listing_contact(uuid,text)'::regprocedure)
       NOT LIKE '%jsonb_build_object(''channel'', p_channel));%' THEN
    RAISE EXCEPTION 'A1 D3: the audit row must carry the channel alone';
  END IF;

  -- D4: with no session, both doors refuse before reading anything.
  v_ok := false;
  BEGIN
    PERFORM public.admin_screening_facts(NULL);
  EXCEPTION WHEN OTHERS THEN
    v_ok := (SQLERRM = 'not signed in');
  END;
  IF NOT v_ok THEN
    RAISE EXCEPTION 'A1 D4: the facts door did not refuse a call with no session';
  END IF;
  v_ok := false;
  BEGIN
    PERFORM public.admin_reveal_listing_contact(NULL, 'phone');
  EXCEPTION WHEN OTHERS THEN
    v_ok := (SQLERRM = 'not signed in');
  END;
  IF NOT v_ok THEN
    RAISE EXCEPTION 'A1 D4: the reveal door did not refuse a call with no session';
  END IF;
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261010230000') ON CONFLICT (version) DO NOTHING;
