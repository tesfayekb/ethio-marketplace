-- Bundle 11, the Listings console, turn L1 (2026-10-11). Tier A. The console's doors and the seller's notices
-- (D134, D136, D137; the spec docs/governance/listings-console-spec.md, approved by the operator 2026-10-11).
-- e2e-areas: admin-listings
-- A. seller_notices — what an admin did to a seller's listing, kept for the seller: the listing, the kind
--    (admin_edit, admin_remove, admin_restore, admin_send_back), the fields named, a reason from a short list and
--    an optional note, when, and when read. The seller reads only their own rows; no browser role writes. Nothing
--    shows them yet: My ads (stage 4, D138) and notifications (stage 6) will.
-- B. transition_listing, redeclared whole from 20261009070008 with one change: removed -> screening (REQ-022 as
--    amended by D137) — enforcement only, with a fresh second factor; a listing removed for a severe screening
--    reason (screening->>'severe') by a super admin only. Every other line stands byte for byte.
-- C. admin_list_listings — All listings: listings:view; drafts never; the views live (active, reduced), waiting
--    (screening, held), ended (expired, sold), removed (rejected, removed) and all; search by title or listing id;
--    filters country (the listing's place), category branch, seller (public name or business name; e-mail too for
--    profiles:view holders), date posted, tier; newest first; paged with a total.
-- D. admin_edit_listing — an admin's content edit: listings:enforce with a fresh second factor; not a draft, not a
--    removed listing, not the admin's own; title, description, category, specs, price, and removing photos (never
--    adding one); the seller's content rules (validate_listing_draft through step 7 — the seller's own identity
--    checks of step 8 judge the seller, not the content); a live listing stays live; one revision (edit), one
--    audit row (listing.admin_edit) and one seller notice per edit.
-- E. admin_move_listing — Remove, Restore and Send back to review from the console: listings:enforce with a fresh
--    second factor, a reason and an optional note; through transition_listing; one audit row and one seller notice.
-- F. Proofs: catalogue reads and calls with no session only; the doors' behaviour is proven by AL-1..AL-9.

-- ===== A — the seller's notices =====
CREATE TABLE IF NOT EXISTS public.seller_notices (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id  uuid NOT NULL,
  listing_id uuid NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
  kind       text NOT NULL CHECK (kind IN ('admin_edit','admin_remove','admin_restore','admin_send_back')),
  fields     text[] NOT NULL DEFAULT '{}'::text[],
  reason     text NOT NULL CHECK (reason IN ('wrong_category','misleading','prohibited','duplicate',
                                             'contact_in_text','photo','rules','removed_in_error',
                                             'appeal_accepted','other')),
  note       text CHECK (note IS NULL OR char_length(note) BETWEEN 1 AND 500),
  created_at timestamptz NOT NULL DEFAULT now(),
  read_at    timestamptz
);
CREATE INDEX IF NOT EXISTS seller_notices_seller_idx ON public.seller_notices (seller_id, created_at DESC);
CREATE INDEX IF NOT EXISTS seller_notices_listing_idx ON public.seller_notices (listing_id);

-- Supabase's default privileges hand a new table to the browser roles at birth: take them back, then grant the
-- seller's read alone.
REVOKE ALL ON public.seller_notices FROM PUBLIC, anon, authenticated;
GRANT SELECT ON public.seller_notices TO authenticated;
GRANT ALL ON public.seller_notices TO service_role;
ALTER TABLE public.seller_notices ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS seller_notices_own_read ON public.seller_notices;
CREATE POLICY seller_notices_own_read ON public.seller_notices
  FOR SELECT TO authenticated USING (seller_id = auth.uid());

-- ===== B — the state door, with Restore (D137) =====
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
  IF p_new_status NOT IN ('draft','screening','active','reduced','rejected','held','expired','sold','removed') THEN
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

  -- The gateway/reviewer branch: only these roles may put a listing in front of
  -- a visitor. No owner door reaches 'active'.
  IF p_new_status IN ('active','reduced','rejected','held') THEN
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

  IF p_new_status IN ('active','reduced') THEN
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

-- ===== C — All listings =====
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
  price_bp integer, price_negotiable boolean,
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
    WHEN 'ended'   THEN ARRAY['expired','sold']
    WHEN 'removed' THEN ARRAY['rejected','removed']
    WHEN 'all'     THEN ARRAY['screening','active','reduced','rejected','held','expired','sold','removed']
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
         l.price_bp, l.price_negotiable,
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

-- ===== D — an admin's content edit =====
CREATE OR REPLACE FUNCTION public.admin_edit_listing(
  p_listing_id uuid, p_changes jsonb, p_reason text, p_note text DEFAULT NULL)
RETURNS jsonb
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid      uuid := auth.uid();
  v_prev     public.listings%ROWTYPE;
  v_row      public.listings%ROWTYPE;
  v_key      text;
  v_note     text := nullif(btrim(coalesce(p_note, '')), '');
  v_coverage uuid[];
  v_val      jsonb;
  v_photos   uuid[] := ARRAY[]::uuid[];
  v_removed  jsonb := '[]'::jsonb;
  v_next     uuid;
  v_before   jsonb;
  v_after    jsonb;
  v_diff_a   jsonb := '{}'::jsonb;
  v_diff_b   jsonb := '{}'::jsonb;
  v_fields   text[];
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'not signed in';
  END IF;
  IF NOT public.has_permission(v_uid, 'listings', 'enforce') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  IF EXISTS (SELECT 1 FROM public.profiles WHERE user_id = v_uid AND account_status = 'deactivated') THEN
    RAISE EXCEPTION 'account is deactivated';
  END IF;
  PERFORM public.require_step_up_if_needed('listings', 'enforce');
  IF p_reason IS NULL OR p_reason NOT IN ('wrong_category','misleading','contact_in_text','photo','rules','other') THEN
    RAISE EXCEPTION 'unknown reason';
  END IF;
  IF p_reason = 'other' AND v_note IS NULL THEN
    RAISE EXCEPTION 'a note is required';
  END IF;
  IF v_note IS NOT NULL AND char_length(v_note) > 500 THEN
    RAISE EXCEPTION 'the note is too long';
  END IF;
  IF p_changes IS NULL OR jsonb_typeof(p_changes) <> 'object' OR p_changes = '{}'::jsonb THEN
    RAISE EXCEPTION 'nothing to change';
  END IF;
  FOR v_key IN SELECT k FROM jsonb_object_keys(p_changes) k LOOP
    IF v_key NOT IN ('title','description','category_id','attributes','price_mode','price_amount',
                     'price_currency','price_period','price_bp','price_negotiable','remove_photos') THEN
      RAISE EXCEPTION 'not editable: %', v_key;
    END IF;
  END LOOP;

  SELECT * INTO v_prev FROM public.listings WHERE id = p_listing_id FOR UPDATE;
  -- A draft is the seller's private work: it is not found here (D136).
  IF NOT FOUND OR v_prev.status = 'draft' THEN
    RAISE EXCEPTION 'listing not found';
  END IF;
  IF v_prev.status = 'removed' THEN
    RAISE EXCEPTION 'a removed listing is not edited';
  END IF;
  IF v_prev.seller_id = v_uid THEN
    RAISE EXCEPTION 'your own listing is edited the seller''s way';
  END IF;

  IF p_changes ? 'remove_photos' THEN
    IF jsonb_typeof(p_changes->'remove_photos') <> 'array' THEN
      RAISE EXCEPTION 'remove_photos must be a list';
    END IF;
    SELECT coalesce(array_agg(DISTINCT x::uuid), ARRAY[]::uuid[]) INTO v_photos
      FROM jsonb_array_elements_text(p_changes->'remove_photos') x;
    IF EXISTS (SELECT 1 FROM unnest(v_photos) r(id)
                WHERE NOT EXISTS (SELECT 1 FROM public.listing_photos ph
                                   WHERE ph.id = r.id AND ph.listing_id = p_listing_id)) THEN
      RAISE EXCEPTION 'photo not found on this listing';
    END IF;
  END IF;

  SELECT coalesce(array_agg(ll.location_id ORDER BY ll.position), ARRAY[]::uuid[]) INTO v_coverage
    FROM public.listing_locations ll WHERE ll.listing_id = p_listing_id;

  -- The seller's content rules, judged through the contact step (7), with every field the admin does not change
  -- read from the listing as it stands.
  v_val := public.validate_listing_draft(v_prev.seller_id, 7::smallint,
    CASE WHEN p_changes ? 'category_id' THEN (p_changes->>'category_id')::uuid ELSE v_prev.category_id END,
    CASE WHEN p_changes ? 'title' THEN p_changes->>'title' ELSE v_prev.title END,
    CASE WHEN p_changes ? 'description' THEN p_changes->>'description' ELSE v_prev.description END,
    v_prev.video_url,
    CASE WHEN p_changes ? 'attributes' THEN p_changes->'attributes' ELSE v_prev.attributes END,
    CASE WHEN p_changes ? 'price_mode' THEN p_changes->>'price_mode' ELSE v_prev.price_mode END,
    CASE WHEN p_changes ? 'price_amount' THEN (p_changes->>'price_amount')::numeric ELSE v_prev.price_amount END,
    CASE WHEN p_changes ? 'price_currency' THEN (p_changes->>'price_currency')::char(3) ELSE v_prev.price_currency END,
    CASE WHEN p_changes ? 'price_period' THEN p_changes->>'price_period' ELSE v_prev.price_period END,
    v_prev.poster_expires_at, v_coverage, v_prev.contact_pref, v_prev.attributes,
    CASE WHEN p_changes ? 'price_bp' THEN (p_changes->>'price_bp')::integer ELSE v_prev.price_bp END,
    CASE WHEN p_changes ? 'price_negotiable' THEN coalesce((p_changes->>'price_negotiable')::boolean, false)
         ELSE v_prev.price_negotiable END);
  IF NOT coalesce((v_val->>'ok')::boolean, false) THEN
    RETURN v_val;
  END IF;

  -- ==== REQ-021 SCREENING GATEWAY (stage 2, DEC-145) ====
  -- The automatic screening call judges an admin's edit at this point, as it judges the seller's. Until stage 2
  -- nothing is called: the enforcer's edit is itself a human judgment, and a live listing stays live (D136).

  IF cardinality(v_photos) > 0 THEN
    SELECT coalesce(jsonb_agg(to_jsonb(ph) ORDER BY ph.display_order), '[]'::jsonb) INTO v_removed
      FROM public.listing_photos ph WHERE ph.listing_id = p_listing_id AND ph.id = ANY (v_photos);
    UPDATE public.listings SET cover_photo_id = NULL
     WHERE id = p_listing_id AND cover_photo_id = ANY (v_photos);
    -- The row goes; the file stays in storage until the listing's retention ends (the revision keeps its paths).
    DELETE FROM public.listing_photos WHERE listing_id = p_listing_id AND id = ANY (v_photos);
    SELECT ph.id INTO v_next FROM public.listing_photos ph
     WHERE ph.listing_id = p_listing_id ORDER BY ph.display_order LIMIT 1;
  END IF;

  UPDATE public.listings SET
    category_id      = CASE WHEN p_changes ? 'category_id' THEN (p_changes->>'category_id')::uuid ELSE category_id END,
    title            = v_val->>'title',
    description      = v_val->>'description',
    attributes       = v_val->'attrs',
    price_amount     = (v_val->>'price_amount')::numeric,
    price_currency   = (v_val->>'price_currency')::char(3),
    price_mode       = v_val->>'price_mode',
    price_period     = v_val->>'price_period',
    price_bp         = (v_val->>'price_bp')::integer,
    price_negotiable = coalesce((v_val->>'price_negotiable')::boolean, false),
    price_unit       = v_val->>'price_unit',
    price_unit_text  = v_val->>'price_unit_text',
    cover_photo_id   = CASE WHEN cardinality(v_photos) > 0 THEN coalesce(cover_photo_id, v_next) ELSE cover_photo_id END,
    updated_at       = now()
  WHERE id = p_listing_id
  RETURNING * INTO v_row;

  v_after  := to_jsonb(v_row) - 'search_tsv' - 'updated_at';
  v_before := to_jsonb(v_prev) - 'search_tsv' - 'updated_at';
  FOR v_key IN SELECT k FROM jsonb_object_keys(v_after) k LOOP
    IF (v_after->v_key) IS DISTINCT FROM (v_before->v_key) THEN
      v_diff_a := v_diff_a || jsonb_build_object(v_key, v_after->v_key);
      v_diff_b := v_diff_b || jsonb_build_object(v_key, v_before->v_key);
    END IF;
  END LOOP;
  IF jsonb_array_length(v_removed) > 0 THEN
    v_diff_b := v_diff_b || jsonb_build_object('photos_removed', v_removed);
    v_diff_a := v_diff_a || jsonb_build_object('photos_removed', to_jsonb(v_photos));
  END IF;

  -- The fields as the seller will read them.
  SELECT coalesce(array_agg(DISTINCT f ORDER BY f), ARRAY[]::text[]) INTO v_fields
    FROM (SELECT CASE
                   WHEN k = 'title' THEN 'title'
                   WHEN k = 'description' THEN 'description'
                   WHEN k = 'category_id' THEN 'category'
                   WHEN k = 'attributes' THEN 'specs'
                   WHEN k LIKE 'price%' THEN 'price'
                   WHEN k IN ('photos_removed','cover_photo_id') THEN 'photos'
                 END AS f
            FROM jsonb_object_keys(v_diff_a) k) g
   WHERE f IS NOT NULL;
  IF cardinality(v_fields) = 0 THEN
    RAISE EXCEPTION 'nothing changed';
  END IF;

  INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
    VALUES (p_listing_id, v_prev.seller_id, 'edit', v_diff_b, v_diff_a, v_uid);
  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
    VALUES (v_uid, 'listing.admin_edit', 'listing', p_listing_id::text,
            jsonb_strip_nulls(jsonb_build_object('fields', to_jsonb(v_fields), 'reason', p_reason, 'note', v_note)));
  INSERT INTO public.seller_notices (seller_id, listing_id, kind, fields, reason, note)
    VALUES (v_prev.seller_id, p_listing_id, 'admin_edit', v_fields, p_reason, v_note);

  RETURN jsonb_build_object('ok', true, 'status', v_row.status, 'fields', to_jsonb(v_fields));
END $$;

REVOKE ALL ON FUNCTION public.admin_edit_listing(uuid, jsonb, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_edit_listing(uuid, jsonb, text, text) TO authenticated;
GRANT ALL ON FUNCTION public.admin_edit_listing(uuid, jsonb, text, text) TO service_role;

-- ===== E — Remove, Restore, Send back to review =====
CREATE OR REPLACE FUNCTION public.admin_move_listing(
  p_listing_id uuid, p_to text, p_reason text, p_note text DEFAULT NULL)
RETURNS jsonb
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid  uuid := auth.uid();
  v_row  public.listings%ROWTYPE;
  v_note text := nullif(btrim(coalesce(p_note, '')), '');
  v_kind text;
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'not signed in';
  END IF;
  IF NOT public.has_permission(v_uid, 'listings', 'enforce') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  IF EXISTS (SELECT 1 FROM public.profiles WHERE user_id = v_uid AND account_status = 'deactivated') THEN
    RAISE EXCEPTION 'account is deactivated';
  END IF;
  IF p_to IS NULL OR p_to NOT IN ('removed','screening') THEN
    RAISE EXCEPTION 'unknown move';
  END IF;

  SELECT * INTO v_row FROM public.listings WHERE id = p_listing_id FOR UPDATE;
  IF NOT FOUND OR v_row.status = 'draft' THEN
    RAISE EXCEPTION 'listing not found';
  END IF;
  IF v_row.seller_id = v_uid THEN
    RAISE EXCEPTION 'your own listing is changed the seller''s way';
  END IF;
  v_kind := CASE
    WHEN p_to = 'removed' AND v_row.status <> 'removed' THEN 'admin_remove'
    WHEN p_to = 'screening' AND v_row.status = 'removed' THEN 'admin_restore'
    WHEN p_to = 'screening' AND v_row.status IN ('active','reduced') THEN 'admin_send_back'
  END;
  IF v_kind IS NULL THEN
    RAISE EXCEPTION 'illegal move: % -> %', v_row.status, p_to;
  END IF;

  IF p_reason IS NULL OR NOT (
       (v_kind = 'admin_remove' AND p_reason IN ('prohibited','misleading','duplicate','contact_in_text','photo','rules','other'))
    OR (v_kind = 'admin_restore' AND p_reason IN ('removed_in_error','appeal_accepted','other'))
    OR (v_kind = 'admin_send_back' AND p_reason IN ('wrong_category','misleading','contact_in_text','photo','rules','other'))) THEN
    RAISE EXCEPTION 'unknown reason';
  END IF;
  IF p_reason = 'other' AND v_note IS NULL THEN
    RAISE EXCEPTION 'a note is required';
  END IF;
  IF v_note IS NOT NULL AND char_length(v_note) > 500 THEN
    RAISE EXCEPTION 'the note is too long';
  END IF;
  -- D137 — read before the second factor is asked, so the refusal names the rule.
  IF v_kind = 'admin_restore' AND coalesce(v_row.screening->>'severe','false') = 'true'
     AND NOT public.is_super_admin(v_uid) THEN
    RAISE EXCEPTION 'a listing removed for a severe reason is restored by a super admin only';
  END IF;
  PERFORM public.require_step_up_if_needed('listings', 'enforce');

  -- The state machine moves the listing and writes its revision (kind state).
  PERFORM public.transition_listing(p_listing_id, p_to);

  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
    VALUES (v_uid, 'listing.' || v_kind, 'listing', p_listing_id::text,
            jsonb_strip_nulls(jsonb_build_object('from', v_row.status, 'to', p_to, 'reason', p_reason, 'note', v_note)));
  INSERT INTO public.seller_notices (seller_id, listing_id, kind, fields, reason, note)
    VALUES (v_row.seller_id, p_listing_id, v_kind, ARRAY['status'], p_reason, v_note);

  RETURN jsonb_build_object('ok', true, 'kind', v_kind, 'status', p_to);
END $$;

REVOKE ALL ON FUNCTION public.admin_move_listing(uuid, text, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_move_listing(uuid, text, text, text) TO authenticated;
GRANT ALL ON FUNCTION public.admin_move_listing(uuid, text, text, text) TO service_role;

-- ===== F — proofs (catalogue reads, and calls with no session or a scratch identity that holds nothing) =====
DO $proof$
DECLARE
  v_fn  text;
  v_def text;
  v_ok  boolean;
  v_err text;
  v_who uuid := gen_random_uuid();
BEGIN
  -- F1: the notices table — row security on, the seller's read policy alone, the browser roles read only.
  IF NOT (SELECT c.relrowsecurity FROM pg_catalog.pg_class c WHERE c.oid = 'public.seller_notices'::regclass) THEN
    RAISE EXCEPTION 'L1 F1: row security is off on seller_notices';
  END IF;
  IF (SELECT count(*) FROM pg_catalog.pg_policies p WHERE p.schemaname = 'public' AND p.tablename = 'seller_notices') <> 1
     OR NOT EXISTS (SELECT 1 FROM pg_catalog.pg_policies p
                     WHERE p.schemaname = 'public' AND p.tablename = 'seller_notices'
                       AND p.policyname = 'seller_notices_own_read' AND p.cmd = 'SELECT'
                       AND p.qual = '(seller_id = auth.uid())') THEN
    RAISE EXCEPTION 'L1 F1: the notices policy';
  END IF;
  IF has_table_privilege('anon', 'public.seller_notices', 'SELECT')
     OR NOT has_table_privilege('authenticated', 'public.seller_notices', 'SELECT')
     OR has_table_privilege('authenticated', 'public.seller_notices', 'INSERT')
     OR has_table_privilege('authenticated', 'public.seller_notices', 'UPDATE')
     OR has_table_privilege('authenticated', 'public.seller_notices', 'DELETE') THEN
    RAISE EXCEPTION 'L1 F1: the notices privileges';
  END IF;

  -- F2: the four doors are definers with a fixed search path; the signed-in role runs them, anon and PUBLIC do not.
  FOREACH v_fn IN ARRAY ARRAY[
      'public.transition_listing(uuid,text)',
      'public.admin_list_listings(text,text,text,uuid,text,date,date,text,integer,integer)',
      'public.admin_edit_listing(uuid,jsonb,text,text)',
      'public.admin_move_listing(uuid,text,text,text)'] LOOP
    IF NOT (SELECT p.prosecdef FROM pg_catalog.pg_proc p WHERE p.oid = v_fn::regprocedure)
       OR (SELECT p.proconfig FROM pg_catalog.pg_proc p WHERE p.oid = v_fn::regprocedure) <> ARRAY['search_path=public'] THEN
      RAISE EXCEPTION 'L1 F2: % is not a definer with its search path', v_fn;
    END IF;
    IF has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE')
       OR EXISTS (SELECT 1 FROM pg_catalog.pg_proc p, aclexplode(p.proacl) x
                   WHERE p.oid = v_fn::regprocedure AND x.grantee = 0) THEN
      RAISE EXCEPTION 'L1 F2: % privileges', v_fn;
    END IF;
  END LOOP;
  IF (SELECT p.provolatile FROM pg_catalog.pg_proc p WHERE p.oid = 'public.admin_list_listings(text,text,text,uuid,text,date,date,text,integer,integer)'::regprocedure) <> 's'
     OR (SELECT p.provolatile FROM pg_catalog.pg_proc p WHERE p.oid = 'public.admin_edit_listing(uuid,jsonb,text,text)'::regprocedure) <> 'v'
     OR (SELECT p.provolatile FROM pg_catalog.pg_proc p WHERE p.oid = 'public.admin_move_listing(uuid,text,text,text)'::regprocedure) <> 'v'
     OR (SELECT p.provolatile FROM pg_catalog.pg_proc p WHERE p.oid = 'public.transition_listing(uuid,text)'::regprocedure) <> 'v' THEN
    RAISE EXCEPTION 'L1 F2: volatility';
  END IF;

  -- F3: the gates, in order.
  v_def := pg_get_functiondef('public.transition_listing(uuid,text)'::regprocedure);
  IF v_def NOT LIKE '%require_step_up_if_needed(''listings'', ''review'')%'
     OR v_def NOT LIKE '%ELSIF p_new_status = ''screening'' THEN%IF v_row.status = ''removed'' THEN%IF NOT (v_service OR v_enforcer) THEN%restored by a super admin only%require_step_up_if_needed(''listings'', ''enforce'')%v_ok := v_row.status IN (''draft'',''active'',''reduced'',''rejected'',''expired'',''sold'');%require_step_up_if_needed(''listings'', ''enforce'')%' THEN
    RAISE EXCEPTION 'L1 F3: transition_listing''s restore branch or a step-up call';
  END IF;
  v_def := pg_get_functiondef('public.admin_list_listings(text,text,text,uuid,text,date,date,text,integer,integer)'::regprocedure);
  IF v_def NOT LIKE '%has_permission(v_uid, ''listings'', ''view'')%has_permission(v_uid, ''profiles'', ''view'')%CASE WHEN v_email THEN u.email::text END%l.status <> ''draft''%' THEN
    RAISE EXCEPTION 'L1 F3: admin_list_listings''s gates';
  END IF;
  v_def := pg_get_functiondef('public.admin_edit_listing(uuid,jsonb,text,text)'::regprocedure);
  IF v_def NOT LIKE '%has_permission(v_uid, ''listings'', ''enforce'')%require_step_up_if_needed(''listings'', ''enforce'')%v_prev.status = ''draft''%v_prev.seller_id = v_uid%validate_listing_draft(v_prev.seller_id, 7::smallint,%INSERT INTO public.listing_revisions%INSERT INTO public.audit_log%INSERT INTO public.seller_notices%' THEN
    RAISE EXCEPTION 'L1 F3: admin_edit_listing''s gates';
  END IF;
  IF v_def LIKE '%status%=%''screening''%' THEN
    RAISE EXCEPTION 'L1 F3: an admin''s edit must not move the listing';
  END IF;
  v_def := pg_get_functiondef('public.admin_move_listing(uuid,text,text,text)'::regprocedure);
  IF v_def NOT LIKE '%has_permission(v_uid, ''listings'', ''enforce'')%v_row.status = ''draft''%v_row.seller_id = v_uid%is_super_admin(v_uid)%require_step_up_if_needed(''listings'', ''enforce'')%transition_listing(p_listing_id, p_to)%INSERT INTO public.audit_log%INSERT INTO public.seller_notices%' THEN
    RAISE EXCEPTION 'L1 F3: admin_move_listing''s gates';
  END IF;

  -- F4: with no session, the three new doors refuse before reading anything.
  FOREACH v_fn IN ARRAY ARRAY['list', 'edit', 'move'] LOOP
    v_ok := false;
    BEGIN
      IF v_fn = 'list' THEN
        PERFORM * FROM public.admin_list_listings();
      ELSIF v_fn = 'edit' THEN
        PERFORM public.admin_edit_listing(NULL, '{"title":"x"}'::jsonb, 'misleading');
      ELSE
        PERFORM public.admin_move_listing(NULL, 'removed', 'rules');
      END IF;
    EXCEPTION WHEN OTHERS THEN
      v_ok := (SQLERRM = 'not signed in');
    END;
    IF NOT v_ok THEN
      RAISE EXCEPTION 'L1 F4: the % door did not refuse a call with no session', v_fn;
    END IF;
  END LOOP;

  -- F5: a scratch identity that holds no permission (no account row is written) is refused by every new door.
  PERFORM set_config('request.jwt.claims', json_build_object('sub', v_who, 'role', 'authenticated')::text, true);
  FOREACH v_fn IN ARRAY ARRAY['list', 'edit', 'move'] LOOP
    v_err := NULL;
    BEGIN
      IF v_fn = 'list' THEN
        PERFORM * FROM public.admin_list_listings();
      ELSIF v_fn = 'edit' THEN
        PERFORM public.admin_edit_listing(NULL, '{"title":"x"}'::jsonb, 'misleading');
      ELSE
        PERFORM public.admin_move_listing(NULL, 'removed', 'rules');
      END IF;
    EXCEPTION WHEN OTHERS THEN
      v_err := SQLERRM;
    END;
    IF v_err IS DISTINCT FROM 'permission denied' THEN
      RAISE EXCEPTION 'L1 F5: the % door answered % to an identity with no permission', v_fn, coalesce(v_err, 'nothing');
    END IF;
  END LOOP;
  PERFORM set_config('request.jwt.claims', '', true);
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261011210000') ON CONFLICT (version) DO NOTHING;
