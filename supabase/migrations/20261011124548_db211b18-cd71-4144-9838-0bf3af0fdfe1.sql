-- Bundle 11, the Listings console, turn L3 (2026-10-11). Tier A. One listing for the console: its page and its history
-- (D134, D138, D139; the operator's choice of 2026-10-11: a page per listing with the full history of its changes).
-- e2e-areas: admin-listings
-- A. admin_listing_detail(listing) — STABLE definer, listings:view; a draft answers "listing not found" (the seller's
--    private work, D136). One answer for the page:
--    - the listing: its content (title, description, category, specs, price), status, tier, the severe screening flag,
--      place and country, the photo count and its dates (created, first posted, last posted, ends, the seller's own
--      end date, renewed, last changed);
--    - the seller: the public name, a business's name, member since, the account's state; the e-mail only for holders
--      of profiles:view (the Users console's own rule);
--    - the contact methods the seller shows, as true or false (never a number);
--    - the history: the listing's revisions, newest first (at most 200, with the total): when, the kind (create, edit,
--      state), who acted — the seller, a staff member or the system — and the staff member's name only for holders of
--      audit_logs:view (the audit log's own rule); the fields changed; the values before and after for the listing's
--      content, price, status, place, tier and dates only (an exact pin, an address or contact settings are named,
--      never shown); a removed photo counted, never its storage path; the reason and note an admin gave, from the
--      seller's notice written in the same transaction.
-- B. Proofs: catalogue reads and calls with no session or a scratch identity that holds nothing; the door's behaviour
--    is proven by AL-16 and AL-17.

-- ===== A — one listing for the console =====
CREATE OR REPLACE FUNCTION public.admin_listing_detail(p_listing_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid     uuid := auth.uid();
  v_row     public.listings%ROWTYPE;
  v_email   boolean;
  v_names   boolean;
  v_pref    jsonb;
  v_listing jsonb;
  v_seller  jsonb;
  v_history jsonb;
  v_total   integer;
  -- The values the history shows; every other changed column is named only.
  v_keep    text[] := ARRAY['title','description','category_id','attributes','price_mode','price_amount',
                            'price_currency','price_period','price_bp','price_negotiable','price_unit',
                            'price_unit_text','status','tier','location_id','expires_at','poster_expires_at',
                            'renewed_count','photos_soon','published_at','published_first_at'];
  v_noise   text[] := ARRAY['search_tsv','updated_at','draft_updated_at','draft_step'];
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'not signed in';
  END IF;
  IF NOT public.has_permission(v_uid, 'listings', 'view') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;

  SELECT * INTO v_row FROM public.listings l WHERE l.id = p_listing_id;
  IF NOT FOUND OR v_row.status = 'draft' THEN
    RAISE EXCEPTION 'listing not found';
  END IF;
  v_email := public.has_permission(v_uid, 'profiles', 'view');
  v_names := public.has_permission(v_uid, 'audit_logs', 'view');
  v_pref := coalesce(v_row.contact_pref, '{}'::jsonb);

  SELECT jsonb_build_object(
           'id', v_row.id, 'title', v_row.title, 'description', v_row.description,
           'status', v_row.status, 'tier', v_row.tier,
           'severe', coalesce(v_row.screening->>'severe', 'false') = 'true',
           'category_id', v_row.category_id, 'category_name_en', c.name_en, 'category_name_am', c.name_am,
           'location_id', v_row.location_id, 'place_name_en', loc.name_en, 'place_name_am', loc.name_am,
           'country_code', coalesce(loc.country_code, v_row.home_country_code),
           'price_mode', v_row.price_mode, 'price_amount', v_row.price_amount,
           'price_currency', v_row.price_currency, 'price_period', v_row.price_period,
           'price_bp', v_row.price_bp, 'price_negotiable', v_row.price_negotiable,
           'price_unit', v_row.price_unit, 'price_unit_text', v_row.price_unit_text,
           'attributes', v_row.attributes, 'photos_soon', v_row.photos_soon,
           'photo_count', (SELECT count(*)::integer FROM public.listing_photos ph WHERE ph.listing_id = v_row.id),
           'created_at', v_row.created_at, 'published_first_at', v_row.published_first_at,
           'published_at', v_row.published_at, 'expires_at', v_row.expires_at,
           'poster_expires_at', v_row.poster_expires_at, 'renewed_count', v_row.renewed_count,
           'updated_at', v_row.updated_at)
    INTO v_listing
    FROM (SELECT 1) one
    LEFT JOIN public.categories c ON c.id = v_row.category_id
    LEFT JOIN public.locations loc ON loc.id = v_row.location_id;

  SELECT jsonb_build_object(
           'id', v_row.seller_id,
           'alias', p.seller_alias,
           'business_name', CASE WHEN p.seller_type = 'business' THEN p.business_name END,
           'email', CASE WHEN v_email THEN u.email::text END,
           'member_since', p.created_at,
           'account_status', p.account_status)
    INTO v_seller
    FROM (SELECT 1) one
    LEFT JOIN public.profiles p ON p.user_id = v_row.seller_id
    LEFT JOIN auth.users u ON u.id = v_row.seller_id;

  SELECT count(*)::integer INTO v_total FROM public.listing_revisions r WHERE r.listing_id = v_row.id;

  SELECT coalesce(jsonb_agg(jsonb_build_object(
           'at', h.created_at,
           'kind', h.kind,
           'by', CASE WHEN h.actor IS NULL THEN 'system' WHEN h.actor = h.seller_id THEN 'seller' ELSE 'staff' END,
           'by_name', CASE WHEN v_names AND h.actor IS NOT NULL AND h.actor <> h.seller_id THEN p.display_name END,
           'fields', (SELECT coalesce(jsonb_agg(k.key ORDER BY k.key), '[]'::jsonb)
                        FROM (SELECT jsonb_object_keys(h.b) AS key
                              UNION
                              SELECT jsonb_object_keys(h.a)) k
                       WHERE k.key <> ALL (v_noise)),
           'before', (SELECT coalesce(jsonb_object_agg(e.key, e.value), '{}'::jsonb)
                        FROM jsonb_each(h.b) e WHERE e.key = ANY (v_keep))
                     || CASE WHEN jsonb_typeof(h.b->'photos_removed') = 'array'
                             THEN jsonb_build_object('photos_removed', jsonb_array_length(h.b->'photos_removed'))
                             ELSE '{}'::jsonb END,
           'after',  (SELECT coalesce(jsonb_object_agg(e.key, e.value), '{}'::jsonb)
                        FROM jsonb_each(h.a) e WHERE e.key = ANY (v_keep))
                     || CASE WHEN jsonb_typeof(h.a->'photos_removed') = 'array'
                             THEN jsonb_build_object('photos_removed', jsonb_array_length(h.a->'photos_removed'))
                             ELSE '{}'::jsonb END,
           'reason', n.reason,
           'note', n.note)
         ORDER BY h.created_at DESC, h.id DESC), '[]'::jsonb)
    INTO v_history
    FROM (SELECT r.id, r.kind, r.actor, r.seller_id, r.created_at, r.listing_id,
                 CASE WHEN jsonb_typeof(r.before) = 'object' THEN r.before ELSE '{}'::jsonb END AS b,
                 CASE WHEN jsonb_typeof(r.after) = 'object' THEN r.after ELSE '{}'::jsonb END AS a
            FROM public.listing_revisions r
           WHERE r.listing_id = v_row.id
           ORDER BY r.created_at DESC, r.id DESC
           LIMIT 200) h
    LEFT JOIN public.profiles p ON p.user_id = h.actor
    LEFT JOIN LATERAL (
      SELECT sn.reason, sn.note
        FROM public.seller_notices sn
       WHERE sn.listing_id = h.listing_id AND sn.created_at = h.created_at
       ORDER BY sn.id
       LIMIT 1) n ON true;

  RETURN jsonb_build_object(
    'listing', v_listing,
    'seller', v_seller,
    'channels', jsonb_build_object(
      'phone',    coalesce((v_pref->'phone'->>'show')::boolean, false),
      'phone2',   coalesce((v_pref->'phone2'->>'show')::boolean, false),
      'telegram', coalesce((v_pref->'telegram'->>'show')::boolean, false),
      'whatsapp', coalesce((v_pref->'whatsapp'->>'show')::boolean, false)),
    'history', v_history,
    'history_total', v_total);
END $$;

REVOKE ALL ON FUNCTION public.admin_listing_detail(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_listing_detail(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.admin_listing_detail(uuid) TO service_role;

-- ===== B — proofs (catalogue reads, and calls with no session or a scratch identity that holds nothing) =====
DO $proof$
DECLARE
  v_fn  text := 'public.admin_listing_detail(uuid)';
  v_def text;
  v_err text;
  v_who uuid := gen_random_uuid();
BEGIN
  -- B1: a definer with a fixed search path, read-only; the signed-in role runs it, anon and PUBLIC do not.
  IF NOT (SELECT p.prosecdef FROM pg_catalog.pg_proc p WHERE p.oid = v_fn::regprocedure)
     OR (SELECT p.proconfig FROM pg_catalog.pg_proc p WHERE p.oid = v_fn::regprocedure) <> ARRAY['search_path=public']
     OR (SELECT p.provolatile FROM pg_catalog.pg_proc p WHERE p.oid = v_fn::regprocedure) <> 's' THEN
    RAISE EXCEPTION 'L3 B1: % is not a stable definer with its search path', v_fn;
  END IF;
  IF has_function_privilege('anon', v_fn, 'EXECUTE')
     OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE')
     OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE')
     OR EXISTS (SELECT 1 FROM pg_catalog.pg_proc p, aclexplode(p.proacl) x
                 WHERE p.oid = v_fn::regprocedure AND x.grantee = 0) THEN
    RAISE EXCEPTION 'L3 B1: % privileges', v_fn;
  END IF;

  -- B2: the gates in order, the e-mail and the staff names behind their own permissions, drafts never, values only
  -- for the kept columns, a removed photo counted.
  v_def := pg_get_functiondef(v_fn::regprocedure);
  IF v_def NOT LIKE '%has_permission(v_uid, ''listings'', ''view'')%v_row.status = ''draft''%has_permission(v_uid, ''profiles'', ''view'')%has_permission(v_uid, ''audit_logs'', ''view'')%CASE WHEN v_email THEN u.email::text END%CASE WHEN v_names AND h.actor IS NOT NULL AND h.actor <> h.seller_id THEN p.display_name END%e.key = ANY (v_keep)%jsonb_array_length(h.b->''photos_removed'')%' THEN
    RAISE EXCEPTION 'L3 B2: the door''s gates';
  END IF;
  IF v_def LIKE '%''pin_lat''%' OR v_def LIKE '%''street_address''%' OR v_def LIKE '%''contact_pref''%' THEN
    RAISE EXCEPTION 'L3 B2: the history must not keep the pin, the address or the contact settings';
  END IF;

  -- B3: no session is refused.
  PERFORM set_config('request.jwt.claims', '', true);
  v_err := NULL;
  BEGIN
    PERFORM public.admin_listing_detail(gen_random_uuid());
  EXCEPTION WHEN OTHERS THEN
    v_err := SQLERRM;
  END;
  IF v_err IS DISTINCT FROM 'not signed in' THEN
    RAISE EXCEPTION 'L3 B3: a call with no session answered %', coalesce(v_err, 'nothing');
  END IF;

  -- B4: a scratch identity that holds no permission (no account row is written) is refused.
  PERFORM set_config('request.jwt.claims', json_build_object('sub', v_who, 'role', 'authenticated')::text, true);
  v_err := NULL;
  BEGIN
    PERFORM public.admin_listing_detail(gen_random_uuid());
  EXCEPTION WHEN OTHERS THEN
    v_err := SQLERRM;
  END;
  IF v_err IS DISTINCT FROM 'permission denied' THEN
    RAISE EXCEPTION 'L3 B4: an identity with no permission got %', coalesce(v_err, 'nothing');
  END IF;
  PERFORM set_config('request.jwt.claims', '', true);
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261012010000') ON CONFLICT (version) DO NOTHING;
