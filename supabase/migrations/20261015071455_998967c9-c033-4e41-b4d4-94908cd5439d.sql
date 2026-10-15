-- Bundle 16 (My listings), turn R1 (2026-10-15). Tier A. The seller's search and filters on My listings (D181: the
-- page on the site's agreed table blocks — the search, Filters and Columns; INC-630).
-- e2e-areas: my-listings
--
-- A. my_listings, redeclared whole from 20261015012743 (turn 3b) with three new arguments, each optional:
--    p_search (words of the title, at most 100 characters), p_category (a category with everything under it,
--    cat_descendants) and p_mark ('reserved' or 'reduced' — the "Price reduced" mark while its 14 days stand, never on a
--    sold ad). The six counts follow the search and the filters, as the rows do. The argument list changes, so the old
--    signature is dropped and its REVOKE and GRANT are restated for the new one. The answer gains the admin's renew
--    setting (renewAllowed, renewDays — the same values my_listing gives), so a row offers Renew only when it is on.
--    The row object is unchanged: it is still my_listing's, byte for byte (P4).
-- P. Proofs (RAISE EXCEPTION on any failure; a clean apply is the pass): the header and privileges; the old signature
--    gone; the body equal to its earlier body beyond the named changes (carriage returns removed first); the filter in
--    both reads; the row object equal to my_listing's; calls with no session refused; a scratch identity that owns
--    nothing answered with six zero counts under every filter, and with the renew setting; an unknown mark and a long
--    search refused. What the filters do with real ads is proven by MLP-5 and MLP-6 (e2e/my-listings-page.spec.ts).

-- ===== A — my_listings (redeclared whole, three new arguments) =====
DROP FUNCTION IF EXISTS public.my_listings(text, integer, integer);
CREATE OR REPLACE FUNCTION public.my_listings(p_group text, p_limit integer DEFAULT 50, p_offset integer DEFAULT 0,
                                             p_search text DEFAULT NULL, p_category uuid DEFAULT NULL,
                                             p_mark text DEFAULT NULL)
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
  v_term   text := lower(btrim(coalesce(p_search, '')));
  v_policy public.listing_policy%ROWTYPE;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF p_group IS NULL OR p_group NOT IN ('live','review','attention','closed','sold','drafts') THEN
    RAISE EXCEPTION 'unknown group';
  END IF;
  IF p_limit IS NULL OR p_limit < 1 OR p_limit > 100 OR p_offset IS NULL OR p_offset < 0 THEN
    RAISE EXCEPTION 'bad page';
  END IF;
  -- Bundle 16 turn R1 (D181) — the seller's search (words of the title) and filters (a category with everything
  -- under it; Reserved; Price reduced).
  IF length(v_term) > 100 THEN RAISE EXCEPTION 'bad search'; END IF;
  IF p_mark IS NOT NULL AND p_mark NOT IN ('reserved','reduced') THEN RAISE EXCEPTION 'unknown mark'; END IF;

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
       AND l.deleted_at IS NULL
       -- Bundle 16 turn R1 (D181) — the seller's search and filters; the counts follow them.
       AND (v_term = '' OR position(v_term IN lower(coalesce(l.title, ''))) > 0)
       AND (p_category IS NULL OR l.category_id IN (SELECT d.id FROM public.cat_descendants(p_category) d))
       AND (p_mark IS NULL
            OR (p_mark = 'reserved' AND l.reserved_at IS NOT NULL)
            OR (p_mark = 'reduced' AND l.status <> 'sold' AND l.price_drop_at > now() - interval '14 days'))
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
               -- Bundle 16 turn 3b (call H) — the word a sold ad takes: Rented or Filled when its category says so.
               'soldWord', coalesce((SELECT CASE WHEN 'rented' = ANY (c.capabilities) THEN 'rented'
                                                 WHEN 'filled' = ANY (c.capabilities) THEN 'filled' END
                                       FROM public.categories c WHERE c.id = l.category_id), 'sold'),
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
         AND l.deleted_at IS NULL
         -- Bundle 16 turn R1 (D181) — the seller's search and filters; the counts follow them.
         AND (v_term = '' OR position(v_term IN lower(coalesce(l.title, ''))) > 0)
         AND (p_category IS NULL OR l.category_id IN (SELECT d.id FROM public.cat_descendants(p_category) d))
         AND (p_mark IS NULL
              OR (p_mark = 'reserved' AND l.reserved_at IS NOT NULL)
              OR (p_mark = 'reduced' AND l.status <> 'sold' AND l.price_drop_at > now() - interval '14 days'))
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

  -- Bundle 16 turn R1 (D181) — the admin's renew setting, as my_listing gives it, for the rows' Renew.
  SELECT * INTO v_policy FROM public.listing_policy WHERE id;
  RETURN jsonb_build_object('counts', v_counts, 'rows', v_rows,
                            'renewAllowed', coalesce(v_policy.renew_allowed, false),
                            'renewDays', v_policy.renew_days);
END $function$;
REVOKE ALL ON FUNCTION public.my_listings(text, integer, integer, text, uuid, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.my_listings(text, integer, integer, text, uuid, text) TO authenticated;
GRANT ALL ON FUNCTION public.my_listings(text, integer, integer, text, uuid, text) TO service_role;

-- ===== P — proofs (RAISE EXCEPTION on any failure; a clean apply is the pass) =====
DO $proof$
DECLARE
  v_n    integer;
  v_msg  text;
  v_md5  text;
  v_src  text;
  v_seg  text;
  v_out  jsonb;
  v_zero jsonb := jsonb_build_object(
    'counts', jsonb_build_object('live', 0, 'review', 0, 'attention', 0, 'closed', 0, 'sold', 0, 'drafts', 0),
    'rows', '[]'::jsonb);
BEGIN
  -- P1. The header; the old signature is gone.
  SELECT count(*) INTO v_n FROM pg_proc
   WHERE oid = 'public.my_listings(text,integer,integer,text,uuid,text)'::regprocedure
     AND provolatile = 's' AND prosecdef AND proconfig = ARRAY['search_path=public'];
  IF v_n <> 1 THEN RAISE EXCEPTION 'B16R1 P1: my_listings is not STABLE SECURITY DEFINER with search_path public'; END IF;
  IF to_regprocedure('public.my_listings(text,integer,integer)') IS NOT NULL THEN
    RAISE EXCEPTION 'B16R1 P1: the old signature of my_listings is still there';
  END IF;

  -- P2. Who may call it: a signed-in user, never anon.
  IF has_function_privilege('anon', 'public.my_listings(text,integer,integer,text,uuid,text)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.my_listings(text,integer,integer,text,uuid,text)', 'EXECUTE') THEN
    RAISE EXCEPTION 'B16R1 P2: my_listings is open to anon or closed to signed-in users';
  END IF;

  -- P3. The body is its earlier body beyond the named changes.
  SELECT md5(replace(replace(replace(replace(regexp_replace(replace(p.prosrc, chr(13), ''), ' *-- Bundle 16 turn R1 \(D181\) — the seller''s search and filters; the counts follow them\.\n([^\n]*\n){5}', '', 'g'), chr(13), ''), replace('  v_rows   jsonb;
  v_term   text := lower(btrim(coalesce(p_search, '''')));
  v_policy public.listing_policy%ROWTYPE;
BEGIN
', chr(13), ''), replace('  v_rows   jsonb;
BEGIN
', chr(13), '')), replace('    RAISE EXCEPTION ''bad page'';
  END IF;
  -- Bundle 16 turn R1 (D181) — the seller''s search (words of the title) and filters (a category with everything
  -- under it; Reserved; Price reduced).
  IF length(v_term) > 100 THEN RAISE EXCEPTION ''bad search''; END IF;
  IF p_mark IS NOT NULL AND p_mark NOT IN (''reserved'',''reduced'') THEN RAISE EXCEPTION ''unknown mark''; END IF;
', chr(13), ''), replace('    RAISE EXCEPTION ''bad page'';
  END IF;
', chr(13), '')), replace('  -- Bundle 16 turn R1 (D181) — the admin''s renew setting, as my_listing gives it, for the rows'' Renew.
  SELECT * INTO v_policy FROM public.listing_policy WHERE id;
  RETURN jsonb_build_object(''counts'', v_counts, ''rows'', v_rows,
                            ''renewAllowed'', coalesce(v_policy.renew_allowed, false),
                            ''renewDays'', v_policy.renew_days);
', chr(13), ''), replace('  RETURN jsonb_build_object(''counts'', v_counts, ''rows'', v_rows);
', chr(13), '')))
    INTO v_md5 FROM pg_proc p WHERE p.oid = 'public.my_listings(text,integer,integer,text,uuid,text)'::regprocedure;
  IF v_md5 IS DISTINCT FROM 'b53c2225fc95924b99817d57d56ee9cb' THEN
    RAISE EXCEPTION 'B16R1 P3: my_listings differs from its earlier body beyond the named changes';
  END IF;

  -- P4. The row object is still my_listing's, byte for byte; the filter is in both reads.
  SELECT replace(prosrc, chr(13), '') INTO v_src FROM pg_proc WHERE oid = 'public.my_listing(uuid)'::regprocedure;
  v_seg := substring(v_src FROM strpos(v_src, 'jsonb_build_object(' || chr(10) || '               ''id'', l.id,'));
  v_seg := substring(v_seg FOR strpos(v_seg, 'LIMIT 1) END)') + length('LIMIT 1) END)') - 1);
  SELECT count(*) INTO v_n FROM pg_proc
   WHERE oid = 'public.my_listings(text,integer,integer,text,uuid,text)'::regprocedure
     AND length(v_seg) > 2000 AND strpos(replace(prosrc, chr(13), ''), v_seg) > 0;
  IF v_n <> 1 THEN RAISE EXCEPTION 'B16R1 P4: my_listings'' row object differs from my_listing''s'; END IF;
  SELECT (length(s) - length(replace(s, 'cat_descendants(p_category)', ''))) / length('cat_descendants(p_category)')
    INTO v_n
    FROM (SELECT replace(prosrc, chr(13), '') AS s FROM pg_proc
           WHERE oid = 'public.my_listings(text,integer,integer,text,uuid,text)'::regprocedure) x;
  IF v_n <> 2 THEN RAISE EXCEPTION 'B16R1 P4: the filter is not in both reads (% found)', v_n; END IF;

  -- P5. No session: refused at the first gate.
  PERFORM set_config('request.jwt.claims', '', true);
  BEGIN
    PERFORM public.my_listings('live', 20, 0, 'a', NULL, 'reserved');
    RAISE EXCEPTION 'B16R1 P5: my_listings answered a call with no session';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'not authenticated' THEN RAISE EXCEPTION 'B16R1 P5: my_listings: %', v_msg; END IF;
  END;

  -- P6. A scratch identity that owns nothing (a fresh uuid; no auth.users row is read or written).
  PERFORM set_config('request.jwt.claims', json_build_object('sub', gen_random_uuid())::text, true);
  v_out := public.my_listings('live', 20, 0);
  IF v_out - 'renewAllowed' - 'renewDays' IS DISTINCT FROM v_zero THEN
    RAISE EXCEPTION 'B16R1 P6: an identity that owns nothing got %', v_out;
  END IF;
  IF jsonb_typeof(v_out -> 'renewAllowed') IS DISTINCT FROM 'boolean'
     OR jsonb_typeof(v_out -> 'renewDays') NOT IN ('number', 'null') THEN
    RAISE EXCEPTION 'B16R1 P6: the renew setting is missing from %', v_out;
  END IF;
  v_out := public.my_listings('sold', 20, 0, 'word', gen_random_uuid(), 'reduced');
  IF v_out - 'renewAllowed' - 'renewDays' IS DISTINCT FROM v_zero THEN
    RAISE EXCEPTION 'B16R1 P6: filtered, an identity that owns nothing got %', v_out;
  END IF;
  BEGIN
    PERFORM public.my_listings('live', 20, 0, NULL, NULL, 'gone');
    RAISE EXCEPTION 'B16R1 P6: an unknown mark was answered';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'unknown mark' THEN RAISE EXCEPTION 'B16R1 P6: unknown mark: %', v_msg; END IF;
  END;
  BEGIN
    PERFORM public.my_listings('live', 20, 0, repeat('a', 101), NULL, NULL);
    RAISE EXCEPTION 'B16R1 P6: a search of 101 characters was answered';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'bad search' THEN RAISE EXCEPTION 'B16R1 P6: bad search: %', v_msg; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '', true);
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261015200000') ON CONFLICT (version) DO NOTHING;
