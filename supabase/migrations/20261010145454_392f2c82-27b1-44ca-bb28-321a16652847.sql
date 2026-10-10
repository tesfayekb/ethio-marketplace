-- Bundle 11 Part A, turn A3 (2026-10-10). Tier A. "Show number" in Admin › Screening asks for no second factor (D129).
-- e2e-areas: admin-screening
-- A. admin_reveal_listing_contact(p_listing_id uuid, p_channel text) is redeclared whole from turn A1's definition
--    (20261010103356) with one change: the line PERFORM public.require_step_up_if_needed('listings', 'review') is
--    removed (D129, the operator, 2026-10-10). Everything else stands, byte for byte: VOLATILE, SECURITY DEFINER,
--    search_path public; listings:review; the channel is phone, phone2 or whatsapp; the dial review_reveal (60 an
--    hour per reviewer); ads in 'screening' only; a channel the seller does not show answers notShown; each reveal
--    writes one audit_log row (action listing.contact_revealed, the listing, the channel — never the number), read
--    in Admin › Audit and never shown to the seller (D128). Approve and Reject keep their second factor
--    (transition_listing is not touched). admin_screening_facts is not touched.
-- B. Proofs: catalogue reads and a call with no session only; the behaviour is proven by SC-8, SC-9, SC-13, SC-15.

-- ===== A — "Show number", logged, no second factor =====
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

-- ===== B — proofs =====
DO $proof$
DECLARE
  v_fn  text := 'public.admin_reveal_listing_contact(uuid,text)';
  v_def text;
  v_ok  boolean;
BEGIN
  v_def := pg_get_functiondef(v_fn::regprocedure);

  -- P1: a definer with a fixed search path, VOLATILE; the signed-in role runs it, anon and PUBLIC do not.
  IF NOT (SELECT p.prosecdef FROM pg_catalog.pg_proc p WHERE p.oid = v_fn::regprocedure)
     OR (SELECT p.provolatile FROM pg_catalog.pg_proc p WHERE p.oid = v_fn::regprocedure) <> 'v'
     OR NOT EXISTS (SELECT 1 FROM pg_catalog.pg_proc p, unnest(p.proconfig) cfg
                     WHERE p.oid = v_fn::regprocedure AND cfg = 'search_path=public') THEN
    RAISE EXCEPTION 'A3 P1: the reveal door is not a VOLATILE definer with a search path';
  END IF;
  IF pg_catalog.has_function_privilege('anon', v_fn, 'EXECUTE')
     OR NOT pg_catalog.has_function_privilege('authenticated', v_fn, 'EXECUTE')
     OR EXISTS (SELECT 1 FROM pg_catalog.pg_proc p, aclexplode(p.proacl) x
                 WHERE p.oid = v_fn::regprocedure AND x.grantee = 0) THEN
    RAISE EXCEPTION 'A3 P1: the reveal door privileges';
  END IF;

  -- P2: no second-factor gate; the remaining gates in order; the log row carries the channel alone.
  IF v_def LIKE '%require_step_up_if_needed%' THEN
    RAISE EXCEPTION 'A3 P2: the reveal door still asks for a second factor';
  END IF;
  IF v_def NOT LIKE '%has_permission(v_uid, ''listings'', ''review'')%rate_gate(''review_reveal'')%v_row.status <> ''screening''%INSERT INTO public.audit_log%' THEN
    RAISE EXCEPTION 'A3 P2: a gate is missing or out of order';
  END IF;
  IF v_def NOT LIKE '%jsonb_build_object(''channel'', p_channel));%' THEN
    RAISE EXCEPTION 'A3 P2: the audit row must carry the channel alone';
  END IF;

  -- P3: the dial is unchanged.
  IF NOT EXISTS (SELECT 1 FROM public.rate_dials
                  WHERE action = 'review_reveal' AND max_count = 60 AND window_seconds = 3600) THEN
    RAISE EXCEPTION 'A3 P3: the dial';
  END IF;

  -- P4: Approve and Reject keep their second factor.
  IF pg_get_functiondef('public.transition_listing(uuid,text)'::regprocedure) NOT LIKE '%require_step_up_if_needed%' THEN
    RAISE EXCEPTION 'A3 P4: transition_listing lost its second factor';
  END IF;

  -- P5: with no session, the door refuses before reading anything.
  v_ok := false;
  BEGIN
    PERFORM public.admin_reveal_listing_contact(NULL, 'phone');
  EXCEPTION WHEN OTHERS THEN
    v_ok := (SQLERRM = 'not signed in');
  END;
  IF NOT v_ok THEN
    RAISE EXCEPTION 'A3 P5: the reveal door did not refuse a call with no session';
  END IF;
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261011030000') ON CONFLICT (version) DO NOTHING;
