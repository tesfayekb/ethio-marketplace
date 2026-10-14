-- Bundle 16 (My listings), turn 1 (2026-10-14). Tier A. The seller's state doors for the My listings page: D138, D172,
-- D173, D174, D175, D176 (spec: docs/features/my-listings.md). No screen in this turn; the page comes in turns 2–5.
-- e2e-areas: my-listings, posting, admin-listings
--
-- A. listings: the status 'closed' ("No longer available", D174 2) and nine columns —
--    clock_kept, kept_remaining: the time an ad had left, held while it is closed or while an edit of it is reviewed
--      (NULL kept_remaining with clock_kept: the ad had no end date);
--    resume_status: the live status (active or reduced) a closed or expired ad returns to;
--    reserved_at (D173 1), sold_at (D175 1), renewed_at (D175 3);
--    price_set_at, price_was, price_drop_at: the "Price reduced" ribbon's record (D173 2).
-- B. listing_policy (one row): renew_allowed (on) and renew_days (30) — D174 3, D175 2. Signed-in users read the two
--    values; only admin_set_listing_policy writes them.
-- C. listings_state_marks (trigger): an ad that leaves live loses its Reserved mark; sold_at is set when an ad becomes
--    sold and cleared when it leaves sold.
-- D. listings_price_marks (trigger): when an ad's price changes, a drop of at least 5% in the same currency, mode and
--    period, on a price that stood at least 7 days after the ad was first posted, records the old price and the time;
--    the record stands 14 days and stays while later drops keep the price under it; any other change clears it.
-- E. transition_listing, redeclared whole from 20261011085637: the owner closes his live ad (the time left is kept)
--    and reopens it to the status it was closed from with that time; the owner may mark a closed ad sold; a move from
--    review to live after an edit gives back the time the ad had when it was edited (an edit never renews an ad);
--    an expiry records the status a renewal returns it to.
-- F. edit_listing, redeclared whole from 20261014155221: takes a closed ad; refuses an expired one (it is renewed
--    first); an edit of a live or closed ad keeps its time left until the review is done.
-- G. mark_sold, redeclared whole from 20261006010039: also from closed; the seller's contact choice is no longer
--    overwritten (a sold ad's contact is closed by its status — reveal_listing_contact answers only an active ad).
-- H. relist_listing, redeclared whole from 20261006010039: takes a sold ad only (an expired ad is renewed).
-- I. renew_listing, redeclared whole from 20261006010039: takes an EXPIRED ad (it took a live one, once in 7 days),
--    refuses when the admin has switched renewal off, and puts it live at once (D176) for renew_days, with a fresh
--    posting date and renewed_at; published_first_at is kept.
-- J. set_listing_reserved (NEW): the owner marks his live ad Reserved, or not.
-- K. set_listing_price (NEW): the owner changes the price of his live or closed ad at once (D174 1, D177) — mode,
--    amount, currency, period, commission and negotiable, no free text — judged by the posting judge through step 5,
--    as staff's edit is judged (INC-552): the seller's end date and places are not sent.
-- L. listing_history (NEW): the owner reads his ad's history — each change with who made it (you, staff or the
--    system, never a staff member's name), the status before and after, the names of the fields an edit changed,
--    and the reason and note of a staff change.
-- M. expire_stale_listings, redeclared: every due ad, with full or reduced reach, expires through transition_listing,
--    which writes its revision (INC-470, INC-626).
-- N. admin_list_listings, redeclared whole from 20261011143218: 'closed' in the Ended view and in All.
-- O. admin_set_listing_policy (NEW): listings:enforce with a fresh second factor; audited 'listing.policy_set'.
-- P. Proofs (RAISE EXCEPTION on any failure; a clean apply is the pass): structure, privileges, each door's checks in
--    their places, the rest of each redeclared body equal to its earlier body (carriage returns removed first —
--    INC-624), and calls with no session refused at the first gate. No proof touches a real row or auth.users; what
--    the doors do is proven by ML-1…ML-10 (e2e/my-listings-doors.spec.ts) and PR-45, PR-46.

-- ===== A — the status and the columns =====
ALTER TABLE public.listings DROP CONSTRAINT IF EXISTS listings_status_check;
ALTER TABLE public.listings
  ADD CONSTRAINT listings_status_check
  CHECK (status IN ('draft','screening','active','reduced','rejected','held','expired','sold','removed','closed'));

ALTER TABLE public.listings
  ADD COLUMN IF NOT EXISTS clock_kept boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS kept_remaining interval,
  ADD COLUMN IF NOT EXISTS resume_status text,
  ADD COLUMN IF NOT EXISTS reserved_at timestamptz,
  ADD COLUMN IF NOT EXISTS sold_at timestamptz,
  ADD COLUMN IF NOT EXISTS renewed_at timestamptz,
  ADD COLUMN IF NOT EXISTS price_set_at timestamptz,
  ADD COLUMN IF NOT EXISTS price_was numeric,
  ADD COLUMN IF NOT EXISTS price_drop_at timestamptz;
ALTER TABLE public.listings DROP CONSTRAINT IF EXISTS listings_resume_status_check;
ALTER TABLE public.listings
  ADD CONSTRAINT listings_resume_status_check CHECK (resume_status IS NULL OR resume_status IN ('active','reduced'));
COMMENT ON COLUMN public.listings.clock_kept IS
  'Bundle 16 — the ad''s time left is held (closed, or an edit of it in review); kept_remaining holds it.';
COMMENT ON COLUMN public.listings.kept_remaining IS
  'Bundle 16 — the time the ad had left when it was closed or edited; NULL with clock_kept: it had no end date.';
COMMENT ON COLUMN public.listings.resume_status IS
  'Bundle 16 — the live status (active or reduced) a closed or expired ad returns to.';
COMMENT ON COLUMN public.listings.price_was IS
  'D173 2 — the old price shown struck through while the "Price reduced" ribbon stands (14 days from price_drop_at).';

-- The price of an ad posted before this migration was set no later than its first posting (or its creation).
UPDATE public.listings SET price_set_at = coalesce(published_first_at, created_at)
 WHERE price_set_at IS NULL;

-- ===== B — the renew setting =====
CREATE TABLE IF NOT EXISTS public.listing_policy (
  id            boolean PRIMARY KEY DEFAULT true CHECK (id),
  renew_allowed boolean NOT NULL DEFAULT true,
  renew_days    integer NOT NULL DEFAULT 30 CHECK (renew_days BETWEEN 1 AND 365),
  updated_at    timestamptz NOT NULL DEFAULT now(),
  updated_by    uuid
);
INSERT INTO public.listing_policy (id) VALUES (true) ON CONFLICT (id) DO NOTHING;
REVOKE ALL ON public.listing_policy FROM PUBLIC, anon, authenticated;
GRANT SELECT (renew_allowed, renew_days) ON public.listing_policy TO authenticated;
GRANT ALL ON public.listing_policy TO service_role;
ALTER TABLE public.listing_policy ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS listing_policy_read ON public.listing_policy;
CREATE POLICY listing_policy_read ON public.listing_policy FOR SELECT TO authenticated USING (true);

-- ===== C — the state marks =====
CREATE OR REPLACE FUNCTION public.listings_state_marks()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO 'public'
AS $function$
BEGIN
  IF NEW.status IS DISTINCT FROM OLD.status THEN
    IF NEW.status NOT IN ('active','reduced') THEN
      NEW.reserved_at := NULL;
    END IF;
    IF NEW.status = 'sold' THEN
      NEW.sold_at := now();
    ELSIF OLD.status = 'sold' THEN
      NEW.sold_at := NULL;
    END IF;
  END IF;
  RETURN NEW;
END $function$;
REVOKE ALL ON FUNCTION public.listings_state_marks() FROM PUBLIC, anon, authenticated;
DROP TRIGGER IF EXISTS listings_state_marks ON public.listings;
CREATE TRIGGER listings_state_marks
  BEFORE UPDATE OF status ON public.listings
  FOR EACH ROW EXECUTE FUNCTION public.listings_state_marks();

-- ===== D — the price record =====
CREATE OR REPLACE FUNCTION public.listings_price_marks()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO 'public'
AS $function$
BEGIN
  IF (NEW.price_mode, NEW.price_amount, NEW.price_currency, NEW.price_period)
     IS DISTINCT FROM (OLD.price_mode, OLD.price_amount, OLD.price_currency, OLD.price_period) THEN
    IF NEW.price_amount IS NOT NULL AND OLD.price_amount IS NOT NULL AND OLD.price_amount > 0
       AND NEW.price_amount < OLD.price_amount
       AND NEW.price_currency IS NOT DISTINCT FROM OLD.price_currency
       AND NEW.price_mode IS NOT DISTINCT FROM OLD.price_mode
       AND NEW.price_period IS NOT DISTINCT FROM OLD.price_period THEN
      IF OLD.price_was IS NOT NULL AND OLD.price_drop_at > now() - interval '14 days'
         AND OLD.price_was > NEW.price_amount THEN
        -- A further drop under a standing ribbon keeps the ribbon's old price and its 14 days.
        NEW.price_was := OLD.price_was;
        NEW.price_drop_at := OLD.price_drop_at;
      ELSIF OLD.published_first_at IS NOT NULL
         AND greatest(coalesce(OLD.price_set_at, OLD.created_at), OLD.published_first_at) <= now() - interval '7 days'
         AND (OLD.price_amount - NEW.price_amount) >= OLD.price_amount * 0.05 THEN
        NEW.price_was := OLD.price_amount;
        NEW.price_drop_at := now();
      ELSE
        NEW.price_was := NULL;
        NEW.price_drop_at := NULL;
      END IF;
    ELSE
      NEW.price_was := NULL;
      NEW.price_drop_at := NULL;
    END IF;
    NEW.price_set_at := now();
  END IF;
  RETURN NEW;
END $function$;
REVOKE ALL ON FUNCTION public.listings_price_marks() FROM PUBLIC, anon, authenticated;
DROP TRIGGER IF EXISTS listings_price_marks ON public.listings;
CREATE TRIGGER listings_price_marks
  BEFORE UPDATE OF price_mode, price_amount, price_currency, price_period ON public.listings
  FOR EACH ROW EXECUTE FUNCTION public.listings_price_marks();

-- ===== E — transition_listing (redeclared whole) =====
CREATE OR REPLACE FUNCTION public.transition_listing(p_listing_id uuid, p_new_status text)
 RETURNS void
 LANGUAGE plpgsql
 VOLATILE
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid      uuid := auth.uid();
  v_row      public.listings%ROWTYPE;
  v_service  boolean := (v_uid IS NULL AND current_setting('role', true) IS DISTINCT FROM 'anon');
  v_reviewer boolean := false;
  v_enforcer boolean := false;
  v_owner    boolean := false;
  v_ok       boolean := false;
BEGIN
  IF p_new_status NOT IN ('draft','screening','active','reduced','rejected','held','expired','sold','removed','closed') THEN
    RAISE EXCEPTION 'unknown status: %', p_new_status;
  END IF;

  SELECT * INTO v_row FROM public.listings WHERE id = p_listing_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'listing not found'; END IF;

  IF v_uid IS NOT NULL THEN
    IF EXISTS (SELECT 1 FROM public.profiles WHERE user_id = v_uid AND account_status = 'deactivated') THEN
      RAISE EXCEPTION 'account is deactivated';
    END IF;
    IF NOT coalesce((public.rate_gate('revise')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;
    v_owner    := (v_row.seller_id = v_uid);
    v_reviewer := public.has_permission(v_uid, 'listings', 'review');
    v_enforcer := public.has_permission(v_uid, 'listings', 'enforce');
    IF NOT (v_owner OR v_reviewer OR v_enforcer) THEN
      RAISE EXCEPTION 'not your listing';
    END IF;
  END IF;

  -- D174 2 (bundle 16 turn 1) — the owner reopens his own closed ad, to the live status it was closed from and
  -- with the time it had left. Nothing about it changed while it was closed (edit_listing sends a closed ad to
  -- screening), so it needs no new review. Staff never reopen a seller's closed ad.
  IF v_row.status = 'closed' AND p_new_status IN ('active','reduced') THEN
    IF NOT v_owner THEN
      RAISE EXCEPTION 'owner only: closed -> %', p_new_status;
    END IF;
    v_ok := (p_new_status = v_row.resume_status);
  -- The gateway/reviewer branch: only these roles may put a listing in front of
  -- a visitor. No owner door reaches 'active' (the reopen above returns an ad to the place it already held).
  ELSIF p_new_status IN ('active','reduced','rejected','held') THEN
    IF NOT (v_service OR v_reviewer) THEN
      RAISE EXCEPTION 'reviewer only: % -> %', v_row.status, p_new_status;
    END IF;
    IF NOT v_service THEN
      PERFORM public.require_step_up_if_needed('listings', 'review');
    END IF;
    v_ok := CASE v_row.status
      WHEN 'screening' THEN p_new_status IN ('active','reduced','rejected','held')
      WHEN 'held'      THEN p_new_status IN ('active','reduced','rejected')
      ELSE false
    END;
  ELSIF p_new_status = 'screening' THEN
    IF v_row.status = 'removed' THEN
      -- D137 (REQ-022 amended, the operator, 2026-10-11): a removed listing comes
      -- back only to screening, never straight to live; by enforcement with a
      -- fresh second factor; one removed for a severe screening reason by a
      -- super admin only.
      IF NOT (v_service OR v_enforcer) THEN
        RAISE EXCEPTION 'enforcement only: removed -> screening';
      END IF;
      IF coalesce(v_row.screening->>'severe','false') = 'true'
         AND NOT (v_service OR public.is_super_admin(v_uid)) THEN
        RAISE EXCEPTION 'a listing removed for a severe reason is restored by a super admin only';
      END IF;
      IF NOT v_service THEN
        PERFORM public.require_step_up_if_needed('listings', 'enforce');
      END IF;
      v_ok := true;
    ELSE
      v_ok := v_row.status IN ('draft','active','reduced','rejected','expired','sold');
    END IF;
  ELSIF p_new_status IN ('sold','expired') THEN
    v_ok := v_row.status IN ('active','reduced') OR (p_new_status = 'sold' AND v_row.status = 'closed');
  ELSIF p_new_status = 'closed' THEN
    -- D174 2 — "No longer available": only the owner closes his live ad; the time it had left is kept.
    IF NOT v_owner THEN
      RAISE EXCEPTION 'owner only: % -> closed', v_row.status;
    END IF;
    v_ok := v_row.status IN ('active','reduced');
  ELSIF p_new_status = 'removed' THEN
    IF v_owner AND NOT (v_service OR v_enforcer) THEN
      IF v_row.status = 'rejected' AND coalesce(v_row.screening->>'severe','false') = 'true' THEN
        RAISE EXCEPTION 'a listing rejected for a severe reason is removed by enforcement only';
      END IF;
      v_ok := true;
    ELSE
      v_ok := (v_service OR v_enforcer);
      IF NOT v_ok THEN
        RAISE EXCEPTION 'enforcement only: % -> removed', v_row.status;
      END IF;
      IF NOT v_service THEN
        PERFORM public.require_step_up_if_needed('listings', 'enforce');
      END IF;
    END IF;
  ELSE
    v_ok := false;
  END IF;

  IF NOT v_ok THEN
    RAISE EXCEPTION 'illegal transition: % -> %', v_row.status, p_new_status;
  END IF;

  IF p_new_status IN ('active','reduced') AND v_row.status = 'closed' THEN
    -- D174 2 — reopened: the time it had left when it was closed.
    UPDATE public.listings SET
      status = p_new_status,
      expires_at = CASE WHEN v_row.kept_remaining IS NULL THEN NULL ELSE now() + v_row.kept_remaining END,
      clock_kept = false, kept_remaining = NULL, resume_status = NULL,
      updated_at = now()
    WHERE id = p_listing_id;
  ELSIF p_new_status IN ('active','reduced') AND v_row.clock_kept THEN
    -- Bundle 16 call A — after the review of an edit, the ad gets back the time it had when it was edited; an edit
    -- never renews an ad.
    UPDATE public.listings SET
      status = p_new_status,
      published_at = coalesce(published_at, now()),
      published_first_at = coalesce(published_first_at, now()),
      expires_at = CASE WHEN v_row.kept_remaining IS NULL THEN NULL ELSE now() + v_row.kept_remaining END,
      clock_kept = false, kept_remaining = NULL, resume_status = NULL,
      updated_at = now()
    WHERE id = p_listing_id;
  ELSIF p_new_status IN ('active','reduced') THEN
    UPDATE public.listings SET
      status = p_new_status,
      published_at = coalesce(published_at, now()),
      published_first_at = coalesce(published_first_at, now()),
      -- M5 / DEC-117 — LEAST(the seller's date, now() + the category's days);
      -- each side is left out when absent (LEAST skips NULL); NULL when both are.
      expires_at = LEAST(v_row.poster_expires_at,
        now() + make_interval(days => (SELECT c.expiry_days FROM public.categories c WHERE c.id = v_row.category_id))),
      updated_at = now()
    WHERE id = p_listing_id;
  ELSIF p_new_status = 'closed' THEN
    UPDATE public.listings SET
      status = 'closed',
      clock_kept = true,
      kept_remaining = CASE WHEN v_row.expires_at IS NULL THEN NULL
                            ELSE greatest(v_row.expires_at - now(), interval '0') END,
      resume_status = v_row.status,
      updated_at = now()
    WHERE id = p_listing_id;
  ELSIF p_new_status = 'expired' THEN
    -- Bundle 16 — the live status a renewal returns it to.
    UPDATE public.listings SET status = 'expired', resume_status = v_row.status, updated_at = now()
     WHERE id = p_listing_id;
  ELSE
    UPDATE public.listings SET status = p_new_status, updated_at = now()
     WHERE id = p_listing_id;
  END IF;

  INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
    VALUES (p_listing_id, v_row.seller_id, 'state',
            jsonb_build_object('status', v_row.status),
            jsonb_build_object('status', p_new_status), v_uid);
END $function$;

REVOKE ALL ON FUNCTION public.transition_listing(uuid, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.transition_listing(uuid, text) TO authenticated;
GRANT ALL ON FUNCTION public.transition_listing(uuid, text) TO service_role;

-- ===== F — edit_listing (redeclared whole) =====
CREATE OR REPLACE FUNCTION public.edit_listing(p_listing_id uuid, p_category_id uuid, p_title text, p_description text, p_video_url text, p_attributes jsonb, p_price_mode text, p_price_amount numeric, p_price_currency character, p_price_period text, p_poster_expires_at timestamp with time zone, p_coverage uuid[], p_contact_pref jsonb, p_price_bp integer DEFAULT NULL::integer, p_price_negotiable boolean DEFAULT false)
 RETURNS jsonb
 LANGUAGE plpgsql
 VOLATILE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid    uuid := auth.uid();
  v_prev   public.listings%ROWTYPE;
  v_row    public.listings%ROWTYPE;
  v_val    jsonb;
  v_before jsonb;
  v_after  jsonb;
  v_diff_a jsonb := '{}'::jsonb;
  v_diff_b jsonb := '{}'::jsonb;
  v_key    text;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF EXISTS (SELECT 1 FROM public.profiles WHERE user_id = v_uid AND account_status = 'deactivated') THEN
    RAISE EXCEPTION 'account is deactivated';
  END IF;
  IF NOT coalesce((public.rate_gate('revise')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;
  SELECT * INTO v_prev FROM public.listings WHERE id = p_listing_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'listing not found'; END IF;
  IF v_prev.seller_id <> v_uid THEN RAISE EXCEPTION 'not your listing'; END IF;
  -- Bundle 16 — an expired ad is renewed before it is edited (renew_listing, D174 3); an edit never renews it.
  IF v_prev.status = 'expired' THEN
    RAISE EXCEPTION 'an expired listing is renewed before it is edited';
  END IF;
  IF v_prev.status NOT IN ('active','reduced','closed','rejected','held') THEN
    RAISE EXCEPTION 'edit_listing takes a published listing; a draft writes through submit_listing';
  END IF;
  -- D172 (the operator, 2026-10-14) — a posted ad's category is never changed.
  IF p_category_id IS DISTINCT FROM v_prev.category_id THEN
    RAISE EXCEPTION 'the category of a posted listing is not changed';
  END IF;

  -- M5 — the judge at step 8 also refuses an unnamed seller and an
  -- unconfirmed home country, with the same fields as on publish.
  v_val := public.validate_listing_draft(v_uid, 8::smallint, p_category_id, p_title, p_description,
             p_video_url, p_attributes, p_price_mode, p_price_amount, p_price_currency,
             p_price_period, p_poster_expires_at, p_coverage, p_contact_pref, v_prev.attributes,
             p_price_bp, p_price_negotiable);
  IF NOT coalesce((v_val->>'ok')::boolean, false) THEN
    RETURN v_val;
  END IF;

  UPDATE public.listings SET
    category_id       = p_category_id,
    location_id       = (v_val->>'location_id')::uuid,
    title             = v_val->>'title',
    description       = v_val->>'description',
    attributes        = v_val->'attrs',
    price_amount      = (v_val->>'price_amount')::numeric,
    price_currency    = (v_val->>'price_currency')::char(3),
    price_mode        = v_val->>'price_mode',
    price_period      = v_val->>'price_period',
    price_bp          = (v_val->>'price_bp')::integer,
    price_negotiable  = coalesce((v_val->>'price_negotiable')::boolean, false),
    poster_expires_at = p_poster_expires_at,
    video_url         = p_video_url,
    contact_pref      = p_contact_pref,
    -- M5 / DEC-109 — the unit the ad is sold per, from the basis in force.
    price_unit        = v_val->>'price_unit',
    price_unit_text   = v_val->>'price_unit_text',
    status            = 'screening',
    -- Bundle 16 call A — an edit of a live or closed ad keeps the time it has left until its review is done.
    clock_kept        = CASE WHEN v_prev.status IN ('active','reduced','closed') THEN true ELSE v_prev.clock_kept END,
    kept_remaining    = CASE WHEN v_prev.status IN ('active','reduced') THEN
                               CASE WHEN v_prev.expires_at IS NULL THEN NULL
                                    ELSE greatest(v_prev.expires_at - now(), interval '0') END
                             ELSE v_prev.kept_remaining END,
    resume_status     = NULL,
    updated_at        = now()
  WHERE id = p_listing_id
  RETURNING * INTO v_row;

  DELETE FROM public.listing_locations WHERE listing_id = p_listing_id;
  INSERT INTO public.listing_locations (listing_id, location_id, position)
      SELECT p_listing_id, c.id, row_number() OVER (ORDER BY c.first_position)::integer
        FROM (SELECT u.id, min(u.ordinality) AS first_position
                FROM unnest(p_coverage) WITH ORDINALITY u(id, ordinality)
               GROUP BY u.id) c ON CONFLICT DO NOTHING;

  v_after  := to_jsonb(v_row) - 'search_tsv';
  v_before := to_jsonb(v_prev) - 'search_tsv';
  FOR v_key IN SELECT k FROM jsonb_object_keys(v_after) k LOOP
    IF (v_after->v_key) IS DISTINCT FROM (v_before->v_key) THEN
      v_diff_a := v_diff_a || jsonb_build_object(v_key, v_after->v_key);
      v_diff_b := v_diff_b || jsonb_build_object(v_key, v_before->v_key);
    END IF;
  END LOOP;

  INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
    VALUES (p_listing_id, v_uid, 'edit', v_diff_b, v_diff_a, v_uid);

  RETURN jsonb_build_object('ok', true, 'status', 'screening');
END $function$;
REVOKE ALL ON FUNCTION public.edit_listing(uuid, uuid, text, text, text, jsonb, text, numeric, character, text, timestamp with time zone, uuid[], jsonb, integer, boolean) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.edit_listing(uuid, uuid, text, text, text, jsonb, text, numeric, character, text, timestamp with time zone, uuid[], jsonb, integer, boolean) TO authenticated;
GRANT ALL ON FUNCTION public.edit_listing(uuid, uuid, text, text, text, jsonb, text, numeric, character, text, timestamp with time zone, uuid[], jsonb, integer, boolean) TO service_role;

-- ===== G — mark_sold (redeclared whole) =====
CREATE OR REPLACE FUNCTION public.mark_sold(p_listing_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 VOLATILE
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE v_uid uuid := auth.uid(); v_row public.listings%ROWTYPE;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF NOT coalesce((public.rate_gate('revise')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;
  SELECT * INTO v_row FROM public.listings WHERE id = p_listing_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'listing not found'; END IF;
  IF v_row.seller_id <> v_uid THEN RAISE EXCEPTION 'not your listing'; END IF;
  IF v_row.status NOT IN ('active','reduced','closed') THEN
    RAISE EXCEPTION 'illegal transition: % -> sold', v_row.status;
  END IF;
  -- D175 1 (bundle 16) — the seller's contact choice is kept as it is: a sold ad's contact is closed to everyone by
  -- its status (reveal_listing_contact answers only an active ad). sold_at and Reserved: listings_state_marks.
  UPDATE public.listings SET status = 'sold',
    clock_kept = false, kept_remaining = NULL, resume_status = NULL, updated_at = now()
   WHERE id = p_listing_id;
  INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
    VALUES (p_listing_id, v_uid, 'state',
            jsonb_build_object('status', v_row.status),
            jsonb_build_object('status', 'sold'), v_uid);
  RETURN jsonb_build_object('ok', true, 'status', 'sold');
END $function$;
REVOKE ALL ON FUNCTION public.mark_sold(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.mark_sold(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.mark_sold(uuid) TO service_role;

-- ===== H — relist_listing (redeclared whole) =====
CREATE OR REPLACE FUNCTION public.relist_listing(p_listing_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 VOLATILE
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE v_uid uuid := auth.uid(); v_row public.listings%ROWTYPE;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF NOT coalesce((public.rate_gate('revise')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;
  SELECT * INTO v_row FROM public.listings WHERE id = p_listing_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'listing not found'; END IF;
  IF v_row.seller_id <> v_uid THEN RAISE EXCEPTION 'not your listing'; END IF;
  -- Bundle 16 (D174 3) — an expired ad comes back through renew_listing, under the admin's setting; relist takes a
  -- sold ad only, back to review.
  IF v_row.status <> 'sold' THEN
    RAISE EXCEPTION 'illegal transition: % -> screening', v_row.status;
  END IF;
  UPDATE public.listings SET status = 'screening', updated_at = now() WHERE id = p_listing_id;
  INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
    VALUES (p_listing_id, v_uid, 'state',
            jsonb_build_object('status', v_row.status),
            jsonb_build_object('status', 'screening'), v_uid);
  RETURN jsonb_build_object('ok', true, 'status', 'screening');
END $function$;
REVOKE ALL ON FUNCTION public.relist_listing(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.relist_listing(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.relist_listing(uuid) TO service_role;

-- ===== I — renew_listing (redeclared whole) =====
CREATE OR REPLACE FUNCTION public.renew_listing(p_listing_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 VOLATILE
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid    uuid := auth.uid();
  v_row    public.listings%ROWTYPE;
  v_policy public.listing_policy%ROWTYPE;
  v_poster timestamptz;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF NOT coalesce((public.rate_gate('revise')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;
  SELECT * INTO v_row FROM public.listings WHERE id = p_listing_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'listing not found'; END IF;
  IF v_row.seller_id <> v_uid THEN RAISE EXCEPTION 'not your listing'; END IF;
  IF EXISTS (SELECT 1 FROM public.profiles WHERE user_id = v_uid AND account_status = 'deactivated') THEN
    RAISE EXCEPTION 'account is deactivated';
  END IF;
  -- D174 3, D175 2 (bundle 16) — an EXPIRED ad is renewed (a live one is not renewed early), when the admin allows it,
  -- for the admin's number of days; there is no waiting time between renewals.
  IF v_row.status <> 'expired' THEN
    RETURN jsonb_build_object('ok', false, 'refusals',
      jsonb_build_array(jsonb_build_object('field','status','reason','renewNeedsExpired')));
  END IF;
  SELECT * INTO v_policy FROM public.listing_policy WHERE id;
  IF NOT FOUND OR NOT v_policy.renew_allowed THEN
    RETURN jsonb_build_object('ok', false, 'refusals',
      jsonb_build_array(jsonb_build_object('field','renew','reason','renewOff')));
  END IF;
  -- D176 (the operator, 2026-10-14) — until the REQ-021 screening gateway exists, a renewed ad goes live at once: its
  -- content was approved and has not changed (an expired ad cannot be edited — edit_listing). It returns to the live
  -- status it expired from, with a fresh posting date (call D) and renewed_at; published_first_at is kept (D175 3).
  -- When the gateway is built, renewals pass through it.
  v_poster := CASE WHEN v_row.poster_expires_at <= now() THEN NULL ELSE v_row.poster_expires_at END;
  UPDATE public.listings SET
    status = coalesce(v_row.resume_status, 'active'),
    poster_expires_at = v_poster,
    expires_at = LEAST(v_poster, now() + make_interval(days => v_policy.renew_days)),
    published_at = now(),
    renewed_at = now(),
    renewed_count = renewed_count + 1,
    clock_kept = false, kept_remaining = NULL, resume_status = NULL,
    updated_at = now()
  WHERE id = p_listing_id;
  INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
    VALUES (p_listing_id, v_uid, 'state',
            jsonb_build_object('status', v_row.status, 'renewed_count', v_row.renewed_count,
                               'expires_at', v_row.expires_at, 'poster_expires_at', v_row.poster_expires_at),
            jsonb_build_object('status', coalesce(v_row.resume_status, 'active'),
                               'renewed_count', v_row.renewed_count + 1), v_uid);
  RETURN jsonb_build_object('ok', true, 'renewed_count', v_row.renewed_count + 1,
                            'status', coalesce(v_row.resume_status, 'active'));
END $function$;
REVOKE ALL ON FUNCTION public.renew_listing(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.renew_listing(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.renew_listing(uuid) TO service_role;

-- ===== N — admin_list_listings (redeclared whole) =====
CREATE OR REPLACE FUNCTION public.admin_list_listings(
  p_view text DEFAULT 'all', p_search text DEFAULT NULL, p_country text DEFAULT NULL,
  p_category uuid DEFAULT NULL, p_seller text DEFAULT NULL, p_from date DEFAULT NULL,
  p_to date DEFAULT NULL, p_tier text DEFAULT NULL, p_limit integer DEFAULT 25, p_offset integer DEFAULT 0)
RETURNS TABLE (
  id uuid, title text, status text, tier text, severe boolean,
  seller_id uuid, seller_alias text, seller_business_name text, seller_email text,
  category_id uuid, category_name_en text, category_name_am text,
  place_name_en text, place_name_am text, country_code text,
  price_mode text, price_amount numeric, price_currency text, price_period text,
  price_bp integer, price_negotiable boolean, price_unit text, price_unit_text text,
  cover_paths jsonb, cover_storage_path text, photo_count integer,
  created_at timestamptz, published_at timestamptz, expires_at timestamptz, updated_at timestamptz,
  total_count bigint)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid      uuid := auth.uid();
  v_email    boolean;
  v_statuses text[];
  v_term     text := lower(btrim(coalesce(p_search, '')));
  v_id       uuid;
  v_seller   text := lower(btrim(coalesce(p_seller, '')));
  v_country  text := upper(btrim(coalesce(p_country, '')));
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'not signed in';
  END IF;
  IF NOT public.has_permission(v_uid, 'listings', 'view') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  v_statuses := CASE coalesce(p_view, 'all')
    WHEN 'live'    THEN ARRAY['active','reduced']
    WHEN 'waiting' THEN ARRAY['screening','held']
    WHEN 'ended'   THEN ARRAY['expired','sold','closed']
    WHEN 'removed' THEN ARRAY['rejected','removed']
    WHEN 'all'     THEN ARRAY['screening','active','reduced','rejected','held','expired','sold','removed','closed']
  END;
  IF v_statuses IS NULL THEN
    RAISE EXCEPTION 'unknown view';
  END IF;
  IF p_tier IS NOT NULL AND p_tier NOT IN ('premium','featured','regular') THEN
    RAISE EXCEPTION 'unknown tier';
  END IF;
  -- The seller's e-mail is read only by holders of profiles:view (the Users console's own rule).
  v_email := public.has_permission(v_uid, 'profiles', 'view');
  IF v_term ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$' THEN
    v_id := v_term::uuid;
  END IF;

  RETURN QUERY
  SELECT l.id, l.title, l.status, l.tier,
         coalesce(l.screening->>'severe', 'false') = 'true',
         l.seller_id, p.seller_alias,
         CASE WHEN p.seller_type = 'business' THEN p.business_name END,
         CASE WHEN v_email THEN u.email::text END,
         l.category_id, c.name_en, c.name_am,
         loc.name_en, loc.name_am, coalesce(loc.country_code, l.home_country_code)::text,
         l.price_mode, l.price_amount, l.price_currency::text, l.price_period,
         l.price_bp, l.price_negotiable, l.price_unit, l.price_unit_text,
         cover.paths, cover.storage_path,
         (SELECT count(*)::integer FROM public.listing_photos ph WHERE ph.listing_id = l.id),
         l.created_at, l.published_at, l.expires_at, l.updated_at,
         count(*) OVER ()
    FROM public.listings l
    LEFT JOIN public.profiles p ON p.user_id = l.seller_id
    LEFT JOIN auth.users u ON u.id = l.seller_id
    LEFT JOIN public.categories c ON c.id = l.category_id
    LEFT JOIN public.locations loc ON loc.id = l.location_id
    LEFT JOIN LATERAL (
      SELECT ph.paths, ph.storage_path
        FROM public.listing_photos ph
       WHERE ph.listing_id = l.id
       ORDER BY (ph.id = l.cover_photo_id) DESC, ph.display_order
       LIMIT 1) cover ON true
   WHERE l.status = ANY (v_statuses)
     AND l.status <> 'draft'
     AND (v_term = ''
          OR (v_id IS NOT NULL AND l.id = v_id)
          OR (v_id IS NULL AND position(v_term IN lower(l.title)) > 0))
     AND (v_country = '' OR coalesce(loc.country_code, l.home_country_code) = v_country)
     AND (p_category IS NULL OR l.category_id IN (SELECT d.id FROM public.cat_descendants(p_category) d))
     AND (v_seller = ''
          OR position(v_seller IN lower(coalesce(p.seller_alias, ''))) > 0
          OR (p.seller_type = 'business' AND position(v_seller IN lower(coalesce(p.business_name, ''))) > 0)
          OR (v_email AND position(v_seller IN lower(coalesce(u.email::text, ''))) > 0))
     AND (p_from IS NULL OR coalesce(l.published_first_at, l.created_at)::date >= p_from)
     AND (p_to IS NULL OR coalesce(l.published_first_at, l.created_at)::date <= p_to)
     AND (p_tier IS NULL OR l.tier = p_tier)
   ORDER BY coalesce(l.published_at, l.created_at) DESC, l.id DESC
   LIMIT LEAST(GREATEST(coalesce(p_limit, 25), 1), 100)
  OFFSET GREATEST(coalesce(p_offset, 0), 0);
END $$;

REVOKE ALL ON FUNCTION public.admin_list_listings(text, text, text, uuid, text, date, date, text, integer, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_list_listings(text, text, text, uuid, text, date, date, text, integer, integer) TO authenticated;
GRANT ALL ON FUNCTION public.admin_list_listings(text, text, text, uuid, text, date, date, text, integer, integer) TO service_role;

-- ===== J — set_listing_reserved (NEW) =====
CREATE OR REPLACE FUNCTION public.set_listing_reserved(p_listing_id uuid, p_reserved boolean)
 RETURNS jsonb
 LANGUAGE plpgsql
 VOLATILE
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid uuid := auth.uid();
  v_row public.listings%ROWTYPE;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF NOT coalesce((public.rate_gate('revise')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;
  SELECT * INTO v_row FROM public.listings WHERE id = p_listing_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'listing not found'; END IF;
  IF v_row.seller_id <> v_uid THEN RAISE EXCEPTION 'not your listing'; END IF;
  IF EXISTS (SELECT 1 FROM public.profiles WHERE user_id = v_uid AND account_status = 'deactivated') THEN
    RAISE EXCEPTION 'account is deactivated';
  END IF;
  IF p_reserved IS NULL THEN RAISE EXCEPTION 'reserved is true or false'; END IF;
  -- D173 1 — Reserved is a mark on a live ad: it stays in search, its time keeps running.
  IF v_row.status NOT IN ('active','reduced') THEN
    RAISE EXCEPTION 'only a live listing is reserved';
  END IF;
  IF (v_row.reserved_at IS NOT NULL) = p_reserved THEN
    RETURN jsonb_build_object('ok', true, 'reserved', p_reserved);
  END IF;
  UPDATE public.listings SET
    reserved_at = CASE WHEN p_reserved THEN now() ELSE NULL END,
    updated_at = now()
  WHERE id = p_listing_id;
  INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
    VALUES (p_listing_id, v_uid, 'state',
            jsonb_build_object('reserved', v_row.reserved_at IS NOT NULL),
            jsonb_build_object('reserved', p_reserved), v_uid);
  RETURN jsonb_build_object('ok', true, 'reserved', p_reserved);
END $function$;
REVOKE ALL ON FUNCTION public.set_listing_reserved(uuid, boolean) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.set_listing_reserved(uuid, boolean) TO authenticated;
GRANT ALL ON FUNCTION public.set_listing_reserved(uuid, boolean) TO service_role;

-- ===== K — set_listing_price (NEW) =====
CREATE OR REPLACE FUNCTION public.set_listing_price(p_listing_id uuid, p_price_mode text, p_price_amount numeric,
  p_price_currency character, p_price_period text, p_price_bp integer DEFAULT NULL::integer,
  p_price_negotiable boolean DEFAULT false)
 RETURNS jsonb
 LANGUAGE plpgsql
 VOLATILE
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid    uuid := auth.uid();
  v_prev   public.listings%ROWTYPE;
  v_row    public.listings%ROWTYPE;
  v_val    jsonb;
  v_before jsonb := '{}'::jsonb;
  v_after  jsonb := '{}'::jsonb;
  v_key    text;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF EXISTS (SELECT 1 FROM public.profiles WHERE user_id = v_uid AND account_status = 'deactivated') THEN
    RAISE EXCEPTION 'account is deactivated';
  END IF;
  IF NOT coalesce((public.rate_gate('revise')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;
  SELECT * INTO v_prev FROM public.listings WHERE id = p_listing_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'listing not found'; END IF;
  IF v_prev.seller_id <> v_uid THEN RAISE EXCEPTION 'not your listing'; END IF;
  -- D174 1, D177 — a price change on a live or closed ad applies at once, with no review: it carries no free text
  -- (a typed price note goes through edit_listing and its review).
  IF v_prev.status NOT IN ('active','reduced','closed') THEN
    RAISE EXCEPTION 'the price of this listing is changed through its edit';
  END IF;
  -- The posting judge through step 5, as staff's edit is judged (D140, DEC-173, INC-552): the price with every other
  -- field the price does not change read from the listing as it stands; the seller's own end date and places are not
  -- sent, and the contact and review steps are not reached — a price box cannot answer their refusals.
  v_val := public.validate_listing_draft(v_uid, 5::smallint, v_prev.category_id, v_prev.title, v_prev.description,
             v_prev.video_url, v_prev.attributes, p_price_mode, p_price_amount, p_price_currency,
             p_price_period, NULL, NULL, v_prev.contact_pref, v_prev.attributes,
             p_price_bp, p_price_negotiable);
  IF NOT coalesce((v_val->>'ok')::boolean, false) THEN
    RETURN v_val;
  END IF;
  UPDATE public.listings SET
    price_mode       = v_val->>'price_mode',
    price_amount     = (v_val->>'price_amount')::numeric,
    price_currency   = (v_val->>'price_currency')::char(3),
    price_period     = v_val->>'price_period',
    price_bp         = (v_val->>'price_bp')::integer,
    price_negotiable = coalesce((v_val->>'price_negotiable')::boolean, false),
    price_unit       = v_val->>'price_unit',
    price_unit_text  = v_val->>'price_unit_text',
    updated_at       = now()
  WHERE id = p_listing_id
  RETURNING * INTO v_row;
  FOREACH v_key IN ARRAY ARRAY['price_mode','price_amount','price_currency','price_period','price_bp',
                               'price_negotiable','price_unit','price_unit_text','price_was','price_drop_at'] LOOP
    IF (to_jsonb(v_row)->v_key) IS DISTINCT FROM (to_jsonb(v_prev)->v_key) THEN
      v_after := v_after || jsonb_build_object(v_key, to_jsonb(v_row)->v_key);
      v_before := v_before || jsonb_build_object(v_key, to_jsonb(v_prev)->v_key);
    END IF;
  END LOOP;
  IF v_after <> '{}'::jsonb THEN
    INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
      VALUES (p_listing_id, v_uid, 'edit', v_before, v_after, v_uid);
  END IF;
  RETURN jsonb_build_object('ok', true, 'status', v_row.status, 'price_was', v_row.price_was,
                            'price_drop_at', v_row.price_drop_at);
END $function$;
REVOKE ALL ON FUNCTION public.set_listing_price(uuid, text, numeric, character, text, integer, boolean) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.set_listing_price(uuid, text, numeric, character, text, integer, boolean) TO authenticated;
GRANT ALL ON FUNCTION public.set_listing_price(uuid, text, numeric, character, text, integer, boolean) TO service_role;

-- ===== L — listing_history (NEW) =====
CREATE OR REPLACE FUNCTION public.listing_history(p_listing_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid    uuid := auth.uid();
  v_seller uuid;
  v_out    jsonb;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  SELECT l.seller_id INTO v_seller FROM public.listings l WHERE l.id = p_listing_id;
  -- One answer for "not yours" and "not there", so the door tells nobody which ads exist.
  IF v_seller IS NULL OR v_seller <> v_uid THEN RAISE EXCEPTION 'not your listing'; END IF;
  SELECT coalesce(jsonb_agg(jsonb_build_object(
           'at', h.created_at,
           'kind', h.kind,
           'by', CASE WHEN h.actor IS NULL THEN 'system' WHEN h.actor = v_uid THEN 'you' ELSE 'staff' END,
           'from', h.b->'status',
           'to', h.a->'status',
           'fields', (SELECT coalesce(jsonb_agg(k ORDER BY k), '[]'::jsonb)
                        FROM jsonb_object_keys(h.a) AS k WHERE k <> 'status'),
           'reason', n.reason,
           'note', n.note)
         ORDER BY h.created_at DESC, h.id DESC), '[]'::jsonb)
    INTO v_out
    FROM (SELECT r.id, r.kind, r.actor, r.created_at,
                 CASE WHEN jsonb_typeof(r.before) = 'object' THEN r.before ELSE '{}'::jsonb END AS b,
                 CASE WHEN jsonb_typeof(r.after) = 'object' THEN r.after ELSE '{}'::jsonb END AS a
            FROM public.listing_revisions r
           WHERE r.listing_id = p_listing_id
           ORDER BY r.created_at DESC, r.id DESC
           LIMIT 200) h
    LEFT JOIN LATERAL (
      SELECT sn.reason, sn.note
        FROM public.seller_notices sn
       WHERE sn.listing_id = p_listing_id AND sn.created_at = h.created_at
       ORDER BY sn.id
       LIMIT 1) n ON true;
  RETURN v_out;
END $function$;
REVOKE ALL ON FUNCTION public.listing_history(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.listing_history(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.listing_history(uuid) TO service_role;

-- ===== M — expire_stale_listings (redeclared) =====
CREATE OR REPLACE FUNCTION public.expire_stale_listings()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_count integer := 0;
  v_id    uuid;
BEGIN
  -- INC-470 (bundle 16 turn 1) — each due ad expires through the state machine, which writes its revision and keeps
  -- the live status a renewal returns it to. INC-626 — an ad with reduced reach expires too (it was never swept).
  -- The scheduled job runs with no session, as the service.
  FOR v_id IN
    SELECT l.id FROM public.listings l
     WHERE l.status IN ('active','reduced') AND l.expires_at IS NOT NULL AND l.expires_at < now()
     ORDER BY l.expires_at
  LOOP
    PERFORM public.transition_listing(v_id, 'expired');
    v_count := v_count + 1;
  END LOOP;
  -- M5 / DEC-117 — one heartbeat row per run (scheduled as listing-expiry-sweep).
  INSERT INTO public.listing_expiry_sweep_runs (expired) VALUES (v_count);
  DELETE FROM public.listing_expiry_sweep_runs WHERE ran_at < now() - interval '14 days';
  RETURN v_count;
END; $$;
REVOKE ALL ON FUNCTION public.expire_stale_listings() FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.expire_stale_listings() TO service_role;

-- ===== O — admin_set_listing_policy (NEW) =====
CREATE OR REPLACE FUNCTION public.admin_set_listing_policy(p_renew_allowed boolean, p_renew_days integer)
 RETURNS jsonb
 LANGUAGE plpgsql
 VOLATILE
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid    uuid := auth.uid();
  v_before public.listing_policy%ROWTYPE;
  v_after  public.listing_policy%ROWTYPE;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not signed in'; END IF;
  IF NOT public.has_permission(v_uid, 'listings', 'enforce') THEN RAISE EXCEPTION 'permission denied'; END IF;
  PERFORM public.require_step_up_if_needed('listings', 'enforce');
  IF p_renew_allowed IS NULL OR p_renew_days IS NULL OR p_renew_days < 1 OR p_renew_days > 365 THEN
    RAISE EXCEPTION 'renew days are 1 to 365';
  END IF;
  SELECT * INTO v_before FROM public.listing_policy WHERE id FOR UPDATE;
  UPDATE public.listing_policy SET
    renew_allowed = p_renew_allowed, renew_days = p_renew_days, updated_at = now(), updated_by = v_uid
  WHERE id
  RETURNING * INTO v_after;
  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
  VALUES (v_uid, 'listing.policy_set', 'listing_policy', 'renew',
          jsonb_build_object('before', jsonb_build_object('renew_allowed', v_before.renew_allowed,
                                                          'renew_days', v_before.renew_days),
                             'after', jsonb_build_object('renew_allowed', v_after.renew_allowed,
                                                         'renew_days', v_after.renew_days)));
  RETURN jsonb_build_object('ok', true, 'renew_allowed', v_after.renew_allowed, 'renew_days', v_after.renew_days);
END $function$;
REVOKE ALL ON FUNCTION public.admin_set_listing_policy(boolean, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_set_listing_policy(boolean, integer) TO authenticated;
GRANT ALL ON FUNCTION public.admin_set_listing_policy(boolean, integer) TO service_role;

-- ===== P — proofs (RAISE EXCEPTION on any failure; a clean apply is the pass) =====
DO $proof$
DECLARE
  v_n    integer;
  v_md5  text;
  v_def  text;
  v_msg  text;
  v_fn   text;
  v_sig  text;
  v_vol  "char";
BEGIN
  -- P1. The status and the columns.
  SELECT pg_get_constraintdef(c.oid) INTO v_def FROM pg_constraint c
   WHERE c.conrelid = 'public.listings'::regclass AND c.conname = 'listings_status_check';
  IF v_def IS NULL OR v_def NOT LIKE '%''closed''%' OR v_def NOT LIKE '%''sold''%' THEN
    RAISE EXCEPTION 'B16T1 P1: the status check does not take closed: %', v_def;
  END IF;
  SELECT count(*) INTO v_n FROM information_schema.columns
   WHERE table_schema = 'public' AND table_name = 'listings'
     AND column_name IN ('clock_kept','kept_remaining','resume_status','reserved_at','sold_at','renewed_at',
                         'price_set_at','price_was','price_drop_at');
  IF v_n <> 9 THEN RAISE EXCEPTION 'B16T1 P1: % of the 9 columns', v_n; END IF;

  -- P2. The renew setting: one row, its defaults, RLS, and only its two values readable by a signed-in user.
  SELECT count(*) INTO v_n FROM public.listing_policy;
  IF v_n <> 1 THEN RAISE EXCEPTION 'B16T1 P2: listing_policy holds % rows', v_n; END IF;
  IF NOT (SELECT relrowsecurity FROM pg_class WHERE oid = 'public.listing_policy'::regclass) THEN
    RAISE EXCEPTION 'B16T1 P2: listing_policy without row level security';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policy WHERE polrelid = 'public.listing_policy'::regclass
                    AND polname = 'listing_policy_read') THEN
    RAISE EXCEPTION 'B16T1 P2: listing_policy_read is missing';
  END IF;
  IF NOT has_column_privilege('authenticated', 'public.listing_policy', 'renew_allowed', 'SELECT')
     OR NOT has_column_privilege('authenticated', 'public.listing_policy', 'renew_days', 'SELECT')
     OR has_column_privilege('authenticated', 'public.listing_policy', 'updated_by', 'SELECT')
     OR has_table_privilege('authenticated', 'public.listing_policy', 'INSERT, UPDATE, DELETE')
     OR has_table_privilege('anon', 'public.listing_policy', 'SELECT') THEN
    RAISE EXCEPTION 'B16T1 P2: listing_policy privileges are not as declared';
  END IF;

  -- P3. The two triggers.
  SELECT count(*) INTO v_n FROM pg_trigger t
   WHERE t.tgrelid = 'public.listings'::regclass AND NOT t.tgisinternal
     AND t.tgname IN ('listings_state_marks','listings_price_marks')
     AND pg_get_triggerdef(t.oid) LIKE '%BEFORE UPDATE OF%FOR EACH ROW%';
  IF v_n <> 2 THEN RAISE EXCEPTION 'B16T1 P3: % of the 2 triggers', v_n; END IF;

  -- P4 and P5. Each door's header, and who may call it: anon never; a signed-in user every door but the sweep.
  FOR v_fn, v_sig, v_vol IN VALUES
    ('transition_listing', 'uuid,text', 'v'::"char"),
    ('edit_listing', 'uuid,uuid,text,text,text,jsonb,text,numeric,character,text,timestamp with time zone,uuid[],jsonb,integer,boolean', 'v'),
    ('mark_sold', 'uuid', 'v'),
    ('relist_listing', 'uuid', 'v'),
    ('renew_listing', 'uuid', 'v'),
    ('set_listing_reserved', 'uuid,boolean', 'v'),
    ('set_listing_price', 'uuid,text,numeric,character,text,integer,boolean', 'v'),
    ('listing_history', 'uuid', 's'),
    ('admin_set_listing_policy', 'boolean,integer', 'v'),
    ('admin_list_listings', 'text,text,text,uuid,text,date,date,text,integer,integer', 's'),
    ('expire_stale_listings', '', 'v')
  LOOP
    SELECT count(*) INTO v_n FROM pg_proc p
     WHERE p.oid = format('public.%s(%s)', v_fn, v_sig)::regprocedure
       AND p.prosecdef AND p.provolatile = v_vol AND p.proconfig = ARRAY['search_path=public'];
    IF v_n <> 1 THEN RAISE EXCEPTION 'B16T1 P4: % is not % SECURITY DEFINER with search_path public', v_fn, v_vol; END IF;
    IF has_function_privilege('anon', format('public.%s(%s)', v_fn, v_sig), 'EXECUTE') THEN
      RAISE EXCEPTION 'B16T1 P5: anon may execute %', v_fn;
    END IF;
    IF has_function_privilege('authenticated', format('public.%s(%s)', v_fn, v_sig), 'EXECUTE')
       <> (v_fn <> 'expire_stale_listings') THEN
      RAISE EXCEPTION 'B16T1 P5: authenticated EXECUTE on % is not as declared', v_fn;
    END IF;
  END LOOP;

  -- P6. Each change in its place.
  SELECT replace(prosrc, chr(13), '') INTO v_def FROM pg_proc WHERE oid = 'public.transition_listing(uuid,text)'::regprocedure;
  IF v_def NOT LIKE '%rate_gate(''revise'')%IF v_row.status = ''closed'' AND p_new_status IN (''active'',''reduced'') THEN%owner only: closed -> %ELSIF p_new_status IN (''active'',''reduced'',''rejected'',''held'') THEN%ELSIF p_new_status = ''closed'' THEN%owner only: % -> closed%illegal transition%' THEN
    RAISE EXCEPTION 'B16T1 P6: transition_listing''s checks are missing or out of place';
  END IF;
  SELECT replace(prosrc, chr(13), '') INTO v_def FROM pg_proc
   WHERE oid = 'public.edit_listing(uuid,uuid,text,text,text,jsonb,text,numeric,character,text,timestamp with time zone,uuid[],jsonb,integer,boolean)'::regprocedure;
  IF v_def NOT LIKE '%an expired listing is renewed before it is edited%a draft writes through submit_listing%the category of a posted listing is not changed%validate_listing_draft(v_uid, 8::smallint,%clock_kept        = CASE%' THEN
    RAISE EXCEPTION 'B16T1 P6: edit_listing''s checks are missing or out of place';
  END IF;
  SELECT replace(prosrc, chr(13), '') INTO v_def FROM pg_proc WHERE oid = 'public.mark_sold(uuid)'::regprocedure;
  IF v_def LIKE '%contact_pref%' OR v_def NOT LIKE '%NOT IN (''active'',''reduced'',''closed'')%' THEN
    RAISE EXCEPTION 'B16T1 P6: mark_sold still writes the contact choice, or does not take a closed ad';
  END IF;
  SELECT replace(prosrc, chr(13), '') INTO v_def FROM pg_proc WHERE oid = 'public.renew_listing(uuid)'::regprocedure;
  IF v_def NOT LIKE '%rate_gate(''revise'')%SELECT * INTO v_row%renewNeedsExpired%renewOff%UPDATE public.listings SET%' THEN
    RAISE EXCEPTION 'B16T1 P6: renew_listing''s checks are missing or out of place';
  END IF;
  SELECT replace(prosrc, chr(13), '') INTO v_def FROM pg_proc WHERE oid = 'public.expire_stale_listings()'::regprocedure;
  IF v_def NOT LIKE '%PERFORM public.transition_listing(v_id, ''expired'')%listing_expiry_sweep_runs%' OR v_def LIKE '%SET status%' THEN
    RAISE EXCEPTION 'B16T1 P6: the expiry sweep does not go through the state machine';
  END IF;
  FOR v_fn, v_sig IN VALUES ('set_listing_reserved', 'uuid,boolean'),
                            ('set_listing_price', 'uuid,text,numeric,character,text,integer,boolean') LOOP
    SELECT replace(prosrc, chr(13), '') INTO v_def FROM pg_proc WHERE oid = format('public.%s(%s)', v_fn, v_sig)::regprocedure;
    IF v_def NOT LIKE '%rate_gate(''revise'')%SELECT * INTO%not your listing%' THEN
      RAISE EXCEPTION 'B16T1 P6: % does not count against the revise dial before it reads the listing', v_fn;
    END IF;
  END LOOP;

  -- P7. The rest of each redeclared body is its earlier body.
  SELECT md5(replace(replace(replace(replace(replace(replace(p.prosrc, chr(13), ''), replace('  IF p_new_status NOT IN (''draft'',''screening'',''active'',''reduced'',''rejected'',''held'',''expired'',''sold'',''removed'',''closed'') THEN', chr(13), ''), replace('  IF p_new_status NOT IN (''draft'',''screening'',''active'',''reduced'',''rejected'',''held'',''expired'',''sold'',''removed'') THEN', chr(13), '')), replace('  -- D174 2 (bundle 16 turn 1) — the owner reopens his own closed ad, to the live status it was closed from and
  -- with the time it had left. Nothing about it changed while it was closed (edit_listing sends a closed ad to
  -- screening), so it needs no new review. Staff never reopen a seller''s closed ad.
  IF v_row.status = ''closed'' AND p_new_status IN (''active'',''reduced'') THEN
    IF NOT v_owner THEN
      RAISE EXCEPTION ''owner only: closed -> %'', p_new_status;
    END IF;
    v_ok := (p_new_status = v_row.resume_status);
  -- The gateway/reviewer branch: only these roles may put a listing in front of
  -- a visitor. No owner door reaches ''active'' (the reopen above returns an ad to the place it already held).
  ELSIF p_new_status IN (''active'',''reduced'',''rejected'',''held'') THEN', chr(13), ''), replace('  -- The gateway/reviewer branch: only these roles may put a listing in front of
  -- a visitor. No owner door reaches ''active''.
  IF p_new_status IN (''active'',''reduced'',''rejected'',''held'') THEN', chr(13), '')), replace('  ELSIF p_new_status IN (''sold'',''expired'') THEN
    v_ok := v_row.status IN (''active'',''reduced'') OR (p_new_status = ''sold'' AND v_row.status = ''closed'');
  ELSIF p_new_status = ''closed'' THEN
    -- D174 2 — "No longer available": only the owner closes his live ad; the time it had left is kept.
    IF NOT v_owner THEN
      RAISE EXCEPTION ''owner only: % -> closed'', v_row.status;
    END IF;
    v_ok := v_row.status IN (''active'',''reduced'');
', chr(13), ''), replace('  ELSIF p_new_status IN (''sold'',''expired'') THEN
    v_ok := v_row.status IN (''active'',''reduced'');
', chr(13), '')), replace('  IF p_new_status IN (''active'',''reduced'') AND v_row.status = ''closed'' THEN
    -- D174 2 — reopened: the time it had left when it was closed.
    UPDATE public.listings SET
      status = p_new_status,
      expires_at = CASE WHEN v_row.kept_remaining IS NULL THEN NULL ELSE now() + v_row.kept_remaining END,
      clock_kept = false, kept_remaining = NULL, resume_status = NULL,
      updated_at = now()
    WHERE id = p_listing_id;
  ELSIF p_new_status IN (''active'',''reduced'') AND v_row.clock_kept THEN
    -- Bundle 16 call A — after the review of an edit, the ad gets back the time it had when it was edited; an edit
    -- never renews an ad.
    UPDATE public.listings SET
      status = p_new_status,
      published_at = coalesce(published_at, now()),
      published_first_at = coalesce(published_first_at, now()),
      expires_at = CASE WHEN v_row.kept_remaining IS NULL THEN NULL ELSE now() + v_row.kept_remaining END,
      clock_kept = false, kept_remaining = NULL, resume_status = NULL,
      updated_at = now()
    WHERE id = p_listing_id;
  ELSIF p_new_status IN (''active'',''reduced'') THEN
    UPDATE public.listings SET
      status = p_new_status,', chr(13), ''), replace('  IF p_new_status IN (''active'',''reduced'') THEN
    UPDATE public.listings SET
      status = p_new_status,', chr(13), '')), replace('  ELSIF p_new_status = ''closed'' THEN
    UPDATE public.listings SET
      status = ''closed'',
      clock_kept = true,
      kept_remaining = CASE WHEN v_row.expires_at IS NULL THEN NULL
                            ELSE greatest(v_row.expires_at - now(), interval ''0'') END,
      resume_status = v_row.status,
      updated_at = now()
    WHERE id = p_listing_id;
  ELSIF p_new_status = ''expired'' THEN
    -- Bundle 16 — the live status a renewal returns it to.
    UPDATE public.listings SET status = ''expired'', resume_status = v_row.status, updated_at = now()
     WHERE id = p_listing_id;
  ELSE
    UPDATE public.listings SET status = p_new_status, updated_at = now()
     WHERE id = p_listing_id;
  END IF;
', chr(13), ''), replace('  ELSE
    UPDATE public.listings SET status = p_new_status, updated_at = now()
     WHERE id = p_listing_id;
  END IF;
', chr(13), ''))) INTO v_md5 FROM pg_proc p WHERE p.oid = 'public.transition_listing(uuid,text)'::regprocedure;
  IF v_md5 IS DISTINCT FROM '076dbf787bf3b483a6bd011de15b660a' THEN
    RAISE EXCEPTION 'B16T1 P7: transition_listing differs from its earlier body beyond the named changes';
  END IF;
  SELECT md5(replace(replace(replace(p.prosrc, chr(13), ''), replace('  -- Bundle 16 — an expired ad is renewed before it is edited (renew_listing, D174 3); an edit never renews it.
  IF v_prev.status = ''expired'' THEN
    RAISE EXCEPTION ''an expired listing is renewed before it is edited'';
  END IF;
  IF v_prev.status NOT IN (''active'',''reduced'',''closed'',''rejected'',''held'') THEN
    RAISE EXCEPTION ''edit_listing takes a published listing; a draft writes through submit_listing'';
  END IF;
', chr(13), ''), replace('  IF v_prev.status NOT IN (''active'',''reduced'',''rejected'',''held'',''expired'') THEN
    RAISE EXCEPTION ''edit_listing takes a published listing; a draft writes through submit_listing'';
  END IF;
', chr(13), '')), replace('    status            = ''screening'',
    -- Bundle 16 call A — an edit of a live or closed ad keeps the time it has left until its review is done.
    clock_kept        = CASE WHEN v_prev.status IN (''active'',''reduced'',''closed'') THEN true ELSE v_prev.clock_kept END,
    kept_remaining    = CASE WHEN v_prev.status IN (''active'',''reduced'') THEN
                               CASE WHEN v_prev.expires_at IS NULL THEN NULL
                                    ELSE greatest(v_prev.expires_at - now(), interval ''0'') END
                             ELSE v_prev.kept_remaining END,
    resume_status     = NULL,
    updated_at        = now()
  WHERE id = p_listing_id
  RETURNING * INTO v_row;
', chr(13), ''), replace('    status            = ''screening'',
    updated_at        = now()
  WHERE id = p_listing_id
  RETURNING * INTO v_row;
', chr(13), ''))) INTO v_md5 FROM pg_proc p WHERE p.oid = 'public.edit_listing(uuid,uuid,text,text,text,jsonb,text,numeric,character,text,timestamp with time zone,uuid[],jsonb,integer,boolean)'::regprocedure;
  IF v_md5 IS DISTINCT FROM '98adc312e33792b177a8383cf8cee8b6' THEN
    RAISE EXCEPTION 'B16T1 P7: edit_listing differs from its earlier body beyond the named changes';
  END IF;
  SELECT md5(replace(replace(p.prosrc, chr(13), ''), replace('  IF v_row.status NOT IN (''active'',''reduced'',''closed'') THEN
    RAISE EXCEPTION ''illegal transition: % -> sold'', v_row.status;
  END IF;
  -- D175 1 (bundle 16) — the seller''s contact choice is kept as it is: a sold ad''s contact is closed to everyone by
  -- its status (reveal_listing_contact answers only an active ad). sold_at and Reserved: listings_state_marks.
  UPDATE public.listings SET status = ''sold'',
    clock_kept = false, kept_remaining = NULL, resume_status = NULL, updated_at = now()
   WHERE id = p_listing_id;
  INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
    VALUES (p_listing_id, v_uid, ''state'',
            jsonb_build_object(''status'', v_row.status),
            jsonb_build_object(''status'', ''sold''), v_uid);
', chr(13), ''), replace('  IF v_row.status NOT IN (''active'',''reduced'') THEN
    RAISE EXCEPTION ''illegal transition: % -> sold'', v_row.status;
  END IF;
  UPDATE public.listings SET status = ''sold'',
    contact_pref = ''{"messages": true}''::jsonb, updated_at = now()
   WHERE id = p_listing_id;
  INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
    VALUES (p_listing_id, v_uid, ''state'',
            jsonb_build_object(''status'', v_row.status, ''contact_pref'', v_row.contact_pref),
            jsonb_build_object(''status'', ''sold'', ''contact_pref'', ''{"messages": true}''::jsonb), v_uid);
', chr(13), ''))) INTO v_md5 FROM pg_proc p WHERE p.oid = 'public.mark_sold(uuid)'::regprocedure;
  IF v_md5 IS DISTINCT FROM 'a39c46bf2a7d30cfedbe97262197b115' THEN
    RAISE EXCEPTION 'B16T1 P7: mark_sold differs from its earlier body beyond the named changes';
  END IF;
  SELECT md5(replace(replace(p.prosrc, chr(13), ''), replace('  -- Bundle 16 (D174 3) — an expired ad comes back through renew_listing, under the admin''s setting; relist takes a
  -- sold ad only, back to review.
  IF v_row.status <> ''sold'' THEN
    RAISE EXCEPTION ''illegal transition: % -> screening'', v_row.status;
  END IF;
', chr(13), ''), replace('  IF v_row.status NOT IN (''expired'',''sold'') THEN
    RAISE EXCEPTION ''illegal transition: % -> screening'', v_row.status;
  END IF;
', chr(13), ''))) INTO v_md5 FROM pg_proc p WHERE p.oid = 'public.relist_listing(uuid)'::regprocedure;
  IF v_md5 IS DISTINCT FROM 'dc8c176317399f14cc34065ba8eb31f5' THEN
    RAISE EXCEPTION 'B16T1 P7: relist_listing differs from its earlier body beyond the named changes';
  END IF;
  SELECT md5(replace(replace(replace(p.prosrc, chr(13), ''), replace('    WHEN ''ended''   THEN ARRAY[''expired'',''sold'',''closed'']', chr(13), ''), replace('    WHEN ''ended''   THEN ARRAY[''expired'',''sold'']', chr(13), '')), replace('    WHEN ''all''     THEN ARRAY[''screening'',''active'',''reduced'',''rejected'',''held'',''expired'',''sold'',''removed'',''closed'']', chr(13), ''), replace('    WHEN ''all''     THEN ARRAY[''screening'',''active'',''reduced'',''rejected'',''held'',''expired'',''sold'',''removed'']', chr(13), ''))) INTO v_md5 FROM pg_proc p WHERE p.oid = 'public.admin_list_listings(text,text,text,uuid,text,date,date,text,integer,integer)'::regprocedure;
  IF v_md5 IS DISTINCT FROM '2a1ac4b0ee88821f530fd25f1a8995f9' THEN
    RAISE EXCEPTION 'B16T1 P7: admin_list_listings differs from its earlier body beyond the named changes';
  END IF;

  -- P8. No session: refused at the first gate.
  BEGIN
    PERFORM public.set_listing_reserved(gen_random_uuid(), true);
    RAISE EXCEPTION 'B16T1 P8: set_listing_reserved answered a call with no session';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'not authenticated' THEN RAISE EXCEPTION 'B16T1 P8: set_listing_reserved: %', v_msg; END IF;
  END;
  BEGIN
    PERFORM public.set_listing_price(gen_random_uuid(), 'fixed', 1::numeric, 'ETB'::character(3), 'once');
    RAISE EXCEPTION 'B16T1 P8: set_listing_price answered a call with no session';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'not authenticated' THEN RAISE EXCEPTION 'B16T1 P8: set_listing_price: %', v_msg; END IF;
  END;
  BEGIN
    PERFORM public.listing_history(gen_random_uuid());
    RAISE EXCEPTION 'B16T1 P8: listing_history answered a call with no session';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'not authenticated' THEN RAISE EXCEPTION 'B16T1 P8: listing_history: %', v_msg; END IF;
  END;
  BEGIN
    PERFORM public.renew_listing(gen_random_uuid());
    RAISE EXCEPTION 'B16T1 P8: renew_listing answered a call with no session';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'not authenticated' THEN RAISE EXCEPTION 'B16T1 P8: renew_listing: %', v_msg; END IF;
  END;
  BEGIN
    PERFORM public.admin_set_listing_policy(true, 30);
    RAISE EXCEPTION 'B16T1 P8: admin_set_listing_policy answered a call with no session';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'not signed in' THEN RAISE EXCEPTION 'B16T1 P8: admin_set_listing_policy: %', v_msg; END IF;
  END;
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261015080000') ON CONFLICT (version) DO NOTHING;
