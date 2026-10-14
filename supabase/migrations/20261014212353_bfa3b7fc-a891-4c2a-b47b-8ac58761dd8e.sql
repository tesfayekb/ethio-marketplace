-- Bundle 16 (My listings), turn 2 (2026-10-14). Tier A. The seller's read of his own ads for the My listings page
-- (D138; D173–D175; spec: docs/features/my-listings.md). One new door, nothing else changes.
-- e2e-areas: my-listings
--
-- A. my_listings(group, limit, offset) (NEW, STABLE, SECURITY DEFINER): the signed-in seller's own ads in one group —
--    live (active, reduced), review (screening, held), attention (rejected, removed), closed (closed, expired), sold,
--    drafts — newest change first, with the counts of all six groups. Each row carries what the page shows: the
--    title, the cover photo's id (the first stripped photo; its link comes from /api/media/photo-links with the
--    seller's session), the price, the Reserved mark, the "Price reduced" old price while it stands, the dates (first
--    posted, posted, renewed, ends, sold), the whole days left (live) or kept (closed), and a removed ad's latest
--    staff reason. Another seller's ads are never read: the door's only key is auth.uid().
-- P. Proofs (RAISE EXCEPTION on any failure; a clean apply is the pass): the header and privileges; a call with no
--    session refused; with a scratch identity that owns nothing (no real row, no auth.users row), an unknown group
--    and a bad page refused and a valid group answered with six zero counts and no row. What the door returns for
--    real ads is proven by MLP-1…MLP-4 (e2e/my-listings-page.spec.ts).

-- ===== A — my_listings (NEW): the seller's own ads, by group =====
CREATE OR REPLACE FUNCTION public.my_listings(p_group text, p_limit integer DEFAULT 50, p_offset integer DEFAULT 0)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid    uuid := auth.uid();
  v_counts jsonb;
  v_rows   jsonb;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF p_group IS NULL OR p_group NOT IN ('live','review','attention','closed','sold','drafts') THEN
    RAISE EXCEPTION 'unknown group';
  END IF;
  IF p_limit IS NULL OR p_limit < 1 OR p_limit > 100 OR p_offset IS NULL OR p_offset < 0 THEN
    RAISE EXCEPTION 'bad page';
  END IF;

  -- The groups of My listings (D138, D173–D175): live (active, reduced — reach is staff's lever and is not shown),
  -- in review (screening, held), needs attention (rejected, removed), closed (closed, expired), sold, drafts.
  WITH mine AS (
    SELECT l.status,
           CASE l.status
             WHEN 'active' THEN 'live'      WHEN 'reduced' THEN 'live'
             WHEN 'screening' THEN 'review' WHEN 'held' THEN 'review'
             WHEN 'rejected' THEN 'attention' WHEN 'removed' THEN 'attention'
             WHEN 'closed' THEN 'closed'    WHEN 'expired' THEN 'closed'
             WHEN 'sold' THEN 'sold'        WHEN 'draft' THEN 'drafts'
           END AS grp
      FROM public.listings l
     WHERE l.seller_id = v_uid
  )
  SELECT jsonb_build_object(
           'live',      count(*) FILTER (WHERE grp = 'live'),
           'review',    count(*) FILTER (WHERE grp = 'review'),
           'attention', count(*) FILTER (WHERE grp = 'attention'),
           'closed',    count(*) FILTER (WHERE grp = 'closed'),
           'sold',      count(*) FILTER (WHERE grp = 'sold'),
           'drafts',    count(*) FILTER (WHERE grp = 'drafts'))
    INTO v_counts
    FROM mine;

  SELECT coalesce(jsonb_agg(r.row ORDER BY r.changed DESC, r.id DESC), '[]'::jsonb)
    INTO v_rows
    FROM (
      SELECT l.id, coalesce(l.updated_at, l.created_at) AS changed,
             jsonb_build_object(
               'id', l.id,
               'status', l.status,
               'title', l.title,
               'categoryId', l.category_id,
               'coverPhotoId', (SELECT p.id FROM public.listing_photos p
                                 WHERE p.listing_id = l.id AND p.exif_stripped
                                 ORDER BY p.display_order
                                 LIMIT 1),
               'photosSoon', l.photos_soon,
               'priceMode', l.price_mode,
               'priceAmount', l.price_amount,
               'priceCurrency', l.price_currency,
               'pricePeriod', l.price_period,
               'priceBp', l.price_bp,
               'priceNegotiable', l.price_negotiable,
               'priceUnit', l.price_unit,
               'priceUnitText', l.price_unit_text,
               -- D173 2 — the "Price reduced" record while its 14 days stand.
               'priceWas', CASE WHEN l.price_drop_at > now() - interval '14 days' THEN l.price_was END,
               'reserved', l.reserved_at IS NOT NULL,
               'publishedFirstAt', l.published_first_at,
               'publishedAt', l.published_at,
               'renewedAt', l.renewed_at,
               'expiresAt', l.expires_at,
               -- The days an ad has left (live) or keeps while closed: whole days, rounded up; null with no end date.
               'daysLeft', CASE WHEN l.status IN ('active','reduced') AND l.expires_at IS NOT NULL
                                THEN greatest(0, ceil(extract(epoch FROM (l.expires_at - now())) / 86400))::integer END,
               'daysKept', CASE WHEN l.status = 'closed' AND l.kept_remaining IS NOT NULL
                                THEN greatest(0, ceil(extract(epoch FROM l.kept_remaining) / 86400))::integer END,
               'soldAt', l.sold_at,
               'createdAt', l.created_at,
               'updatedAt', l.updated_at,
               -- A removed ad's latest staff reason (seller_notices, which the seller already reads).
               'removedReason', CASE WHEN l.status = 'removed' THEN
                                  (SELECT sn.reason FROM public.seller_notices sn
                                    WHERE sn.listing_id = l.id AND sn.seller_id = v_uid AND sn.kind = 'admin_remove'
                                    ORDER BY sn.created_at DESC
                                    LIMIT 1) END) AS row
        FROM public.listings l
       WHERE l.seller_id = v_uid
         AND CASE l.status
               WHEN 'active' THEN 'live'      WHEN 'reduced' THEN 'live'
               WHEN 'screening' THEN 'review' WHEN 'held' THEN 'review'
               WHEN 'rejected' THEN 'attention' WHEN 'removed' THEN 'attention'
               WHEN 'closed' THEN 'closed'    WHEN 'expired' THEN 'closed'
               WHEN 'sold' THEN 'sold'        WHEN 'draft' THEN 'drafts'
             END = p_group
       ORDER BY coalesce(l.updated_at, l.created_at) DESC, l.id DESC
       LIMIT p_limit OFFSET p_offset
    ) r;

  RETURN jsonb_build_object('counts', v_counts, 'rows', v_rows);
END $function$;
REVOKE ALL ON FUNCTION public.my_listings(text, integer, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.my_listings(text, integer, integer) TO authenticated;
GRANT ALL ON FUNCTION public.my_listings(text, integer, integer) TO service_role;

-- ===== P — proofs (RAISE EXCEPTION on any failure; a clean apply is the pass) =====
DO $proof$
DECLARE
  v_n   integer;
  v_msg text;
  v_out jsonb;
BEGIN
  -- P1. The header: STABLE, SECURITY DEFINER, search_path public.
  SELECT count(*) INTO v_n FROM pg_proc
   WHERE oid = 'public.my_listings(text,integer,integer)'::regprocedure
     AND provolatile = 's' AND prosecdef AND proconfig = ARRAY['search_path=public'];
  IF v_n <> 1 THEN RAISE EXCEPTION 'B16T2 P1: my_listings is not STABLE SECURITY DEFINER with search_path public'; END IF;

  -- P1b. Both reads are keyed by the caller: the counts and the rows each read only l.seller_id = v_uid.
  SELECT count(*) INTO v_n FROM pg_proc
   WHERE oid = 'public.my_listings(text,integer,integer)'::regprocedure
     AND replace(prosrc, chr(13), '') LIKE replace('%WHERE l.seller_id = v_uid
  )%WHERE l.seller_id = v_uid
         AND CASE l.status%', chr(13), '');
  IF v_n <> 1 THEN RAISE EXCEPTION 'B16T2 P1b: a read of my_listings is not keyed by the caller'; END IF;

  -- P2. Who may call it: anon never, a signed-in user yes.
  IF has_function_privilege('anon', 'public.my_listings(text,integer,integer)', 'EXECUTE') THEN
    RAISE EXCEPTION 'B16T2 P2: anon may execute my_listings';
  END IF;
  IF NOT has_function_privilege('authenticated', 'public.my_listings(text,integer,integer)', 'EXECUTE') THEN
    RAISE EXCEPTION 'B16T2 P2: authenticated may not execute my_listings';
  END IF;

  -- P3. No session: refused at the first gate.
  PERFORM set_config('request.jwt.claims', '', true);
  BEGIN
    PERFORM public.my_listings('live');
    RAISE EXCEPTION 'B16T2 P3: my_listings answered a call with no session';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'not authenticated' THEN RAISE EXCEPTION 'B16T2 P3: %', v_msg; END IF;
  END;

  -- P4. A scratch identity that owns nothing (a fresh uuid; no auth.users row is read or written).
  PERFORM set_config('request.jwt.claims', json_build_object('sub', gen_random_uuid())::text, true);
  BEGIN
    PERFORM public.my_listings('paused');
    RAISE EXCEPTION 'B16T2 P4: my_listings answered an unknown group';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'unknown group' THEN RAISE EXCEPTION 'B16T2 P4: unknown group: %', v_msg; END IF;
  END;
  BEGIN
    PERFORM public.my_listings('live', 101, 0);
    RAISE EXCEPTION 'B16T2 P4: my_listings answered a page of 101';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'bad page' THEN RAISE EXCEPTION 'B16T2 P4: bad page: %', v_msg; END IF;
  END;
  v_out := public.my_listings('drafts', 20, 0);
  IF v_out IS DISTINCT FROM jsonb_build_object(
       'counts', jsonb_build_object('live', 0, 'review', 0, 'attention', 0, 'closed', 0, 'sold', 0, 'drafts', 0),
       'rows', '[]'::jsonb) THEN
    RAISE EXCEPTION 'B16T2 P4: an identity that owns nothing got %', v_out;
  END IF;
  PERFORM set_config('request.jwt.claims', '', true);
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261015100000') ON CONFLICT (version) DO NOTHING;
