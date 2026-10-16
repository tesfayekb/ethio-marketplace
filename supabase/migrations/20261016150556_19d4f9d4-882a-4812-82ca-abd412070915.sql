-- Bundle 17 turn 4 (2026-10-16). Tier A. INC-666 — A CLOSED AD'S "PHOTOS COMING SOON" TICK. A closed ad is edited like a
-- live one (INC-631, bundle 16 turn R2: the photo routes take its photos; E2a: set_listing_pin takes its pin; D194: the
-- Edit is the posting wizard, whose Photos step draws the tick), but set_listing_photos_soon (20261004144146) still
-- refused 'closed' — the third door of INC-631's class. The wizard hid the tick on a closed ad meanwhile (turn 2).
--
-- A. set_listing_photos_soon, redeclared whole from its live definition (20261004144146; the executor pastes the live
--    pg_get_functiondef beside this file before the apply — G39): 'closed' joins the status list; nothing else changes.
--    Grants restated; the allowlist line is unchanged (the door was already listed).
-- B. Proofs P1–P3 on no real row: the body's marker and header; the grants; no session refused at the first gate.
--    A closed ad's tick is proven through the app (the wizard's Photos step on a closed ad: the turn's browser test).

-- ===== A — set_listing_photos_soon, whole: a closed ad takes the tick =====
CREATE OR REPLACE FUNCTION public.set_listing_photos_soon(p_listing_id uuid, p_on boolean)
 RETURNS jsonb
 LANGUAGE plpgsql
 VOLATILE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid  uuid := auth.uid();
  v_row  public.listings%ROWTYPE;
  v_on   boolean := coalesce(p_on, false);
  v_rate jsonb;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  v_rate := public.rate_gate('draft');
  IF NOT coalesce((v_rate->>'allowed')::boolean, false) THEN
    RETURN jsonb_build_object('ok', false, 'refusals', jsonb_build_array(
      jsonb_build_object('field', 'rate', 'reason', 'rateLimited', 'resets_at', v_rate->>'resets_at')));
  END IF;
  SELECT * INTO v_row FROM public.listings WHERE id = p_listing_id FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'listing not found'; END IF;
  IF v_row.seller_id <> v_uid THEN RAISE EXCEPTION 'not your listing'; END IF;
  -- The statuses set_listing_pin accepts (bundle 17 turn 4, INC-666: 'closed' joins them, as it joined the pin door).
  IF v_row.status NOT IN ('draft','active','reduced','closed','rejected','held','expired') THEN
    RAISE EXCEPTION 'photosSoonNotEditable:%', v_row.status;
  END IF;
  IF v_row.photos_soon IS DISTINCT FROM v_on THEN
    UPDATE public.listings SET photos_soon = v_on, updated_at = now() WHERE id = p_listing_id;
    INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
      VALUES (p_listing_id, v_uid, 'edit',
              jsonb_build_object('photos_soon', v_row.photos_soon),
              jsonb_build_object('photos_soon', v_on), v_uid);
  END IF;
  RETURN jsonb_build_object('ok', true, 'photos_soon', v_on);
END $function$;
REVOKE ALL ON FUNCTION public.set_listing_photos_soon(uuid, boolean) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.set_listing_photos_soon(uuid, boolean) TO authenticated;
GRANT ALL ON FUNCTION public.set_listing_photos_soon(uuid, boolean) TO service_role;

-- ===== B — proofs =====
DO $proof$
DECLARE
  v_src text;
  v_msg text;
BEGIN
  -- P1. The body carries the change, with its header kept.
  SELECT prosrc INTO v_src FROM pg_proc
   WHERE oid = 'public.set_listing_photos_soon(uuid, boolean)'::regprocedure
     AND prosecdef AND provolatile = 'v' AND proconfig = ARRAY['search_path=public'];
  IF v_src IS NULL
     OR v_src NOT LIKE '%NOT IN (''draft'',''active'',''reduced'',''closed'',''rejected'',''held'',''expired'')%'
     OR v_src NOT LIKE '%photosSoonNotEditable:%'
     OR v_src NOT LIKE '%public.rate_gate(''draft'')%'
     OR v_src NOT LIKE '%jsonb_build_object(''photos_soon'', v_on), v_uid);%' THEN
    RAISE EXCEPTION 'B17T4 P1: the body of set_listing_photos_soon is not as written';
  END IF;

  -- P2. Grants as before: signed-in users call the door; anon does not.
  IF has_function_privilege('anon', 'public.set_listing_photos_soon(uuid, boolean)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.set_listing_photos_soon(uuid, boolean)', 'EXECUTE')
     OR NOT has_function_privilege('service_role', 'public.set_listing_photos_soon(uuid, boolean)', 'EXECUTE') THEN
    RAISE EXCEPTION 'B17T4 P2: a grant is not as before';
  END IF;

  -- P3. No session: refused at the first gate (no row is read).
  PERFORM set_config('request.jwt.claims', '', true);
  BEGIN
    PERFORM public.set_listing_photos_soon(gen_random_uuid(), true);
    RAISE EXCEPTION 'B17T4 P3: set_listing_photos_soon answered a call with no session';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'not authenticated' THEN RAISE EXCEPTION 'B17T4 P3: set_listing_photos_soon: %', v_msg; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '', true);
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261017120000') ON CONFLICT (version) DO NOTHING;
