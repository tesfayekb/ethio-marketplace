-- Bundle 19 turn 9c (2026-10-17). Tier A. D201 §4 — M2 PART b OF EIGHT: THE PUBLIC DOCUMENT AND THE EXPORT CARRY THE RANK.
-- e2e-areas: admin-attributes, ad-page
-- public_listing_json [last declared 20261017044823, M1] — the definition row gains 'fact_rank'; attr_export_payload
-- [20261005172453] — the links row gains the cell 'fact_rank', LAST (a trailing cell: a file exported before this
-- column still imports). Both redeclared WHOLE, every header attribute kept, argument lists unchanged, grants restated.
-- BODY PROOFS (DEC-190): a body is proven by its FINGERPRINT — md5 of the text with carriage returns and `--` comments
-- removed and, outside single-quoted literals, every run of whitespace collapsed to one space — so the spacing a
-- retyped submission may change never refuses an apply (INC-685), while any changed token or literal still does;
-- header attributes (volatility, SECURITY DEFINER, search_path) are proven as before. A clean apply is the pass.
-- Proofs P1–P4, RAISE EXCEPTION on any failure: part a landed (the column exists); both bodies by fingerprint and
-- header; the grants; on scratch e2e-mig- rows the export carries the cell last with '' for no rank and the public
-- document's definition rows carry the rank. The mark 20261018150100.
-- Applied on ethio-prod by the executor's migration tool (DEC-188); the operator applies the saved files on ethio-staging
-- in order and reads back the marks. The eight parts are applied in order a → b → c1 → c2 → c3 → c4 → d → e in one turn,
-- nothing between them; each later part's first block refuses to run before the earlier one has landed; every part is
-- idempotent (a second apply changes nothing and the proofs still run).

-- ===== A — part a must have landed =====
DO $gate$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                  WHERE table_schema = 'public' AND table_name = 'category_attribute_links' AND column_name = 'fact_rank') THEN
    RAISE EXCEPTION 'B19M2b: part a (mark 20261018150000) has not landed — apply it first';
  END IF;
END $gate$;

-- ===== B — the two readers =====
CREATE OR REPLACE FUNCTION public.public_listing_json(l public.listings, p_viewer uuid)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_cat      public.categories%ROWTYPE;
  v_path     jsonb;
  v_illus    text;
  v_deal     jsonb;
  v_has_unit boolean;
  v_defs     jsonb;
  v_photos   jsonb;
  v_cover    uuid;
  v_places   jsonb;
  v_coverage jsonb;
  v_country  text;
  v_seller   jsonb;
  v_alias    text;
  v_bname    text;
  v_stype    text;
  v_since    timestamptz;
  v_prev     text;
  v_channels jsonb;
  v_views    bigint;
  v_shares   bigint;
  v_sold     text;
  v_unit_lbl jsonb;
BEGIN
  -- The category, its primary-parent path (root first), the nearest picture and the deal groups.
  SELECT * INTO v_cat FROM public.categories c WHERE c.id = l.category_id;
  WITH RECURSIVE up AS (
    SELECT l.category_id AS id, 0 AS depth
    UNION ALL
    SELECT public.cat_primary_parent(up.id), up.depth + 1
      FROM up
     WHERE up.depth < 12 AND public.cat_primary_parent(up.id) IS NOT NULL
  )
  SELECT coalesce(jsonb_agg(jsonb_build_object('id', c.id, 'slug', c.slug, 'name_en', c.name_en, 'name_am', c.name_am)
                            ORDER BY up.depth DESC), '[]'::jsonb),
         (SELECT c2.image_url FROM up u2 JOIN public.categories c2 ON c2.id = u2.id
           WHERE c2.image_url IS NOT NULL ORDER BY u2.depth LIMIT 1)
    INTO v_path, v_illus
    FROM up JOIN public.categories c ON c.id = up.id;
  IF v_cat.id IS NOT NULL THEN
    SELECT EXISTS (SELECT 1 FROM public.effective_category_links(l.category_id) e
                     JOIN public.attributes a ON a.id = e.attribute_id
                    WHERE a.attr_key ~ '^unit_of_sale(-|$)')
      INTO v_has_unit;
    SELECT jsonb_build_object('basis', '[]'::jsonb, 'size', '[]'::jsonb, 'quantity', '[]'::jsonb, 'terms', '[]'::jsonb)
           || coalesce(jsonb_object_agg(g.grp, g.keys), '{}'::jsonb)
      INTO v_deal
      FROM (SELECT public.deal_group(a.attr_key, v_has_unit) AS grp,
                   jsonb_agg(a.attr_key ORDER BY e.display_order, a.attr_key) AS keys
              FROM public.effective_category_links(l.category_id) e
              JOIN public.attributes a ON a.id = e.attribute_id
             WHERE public.deal_group(a.attr_key, v_has_unit) IS NOT NULL
             GROUP BY 1) g;
    -- The answered facts only, as get_posting_schema's rows, each with the records of the options the answer names.
    SELECT coalesce(jsonb_agg(row ORDER BY ord, key), '[]'::jsonb)
      INTO v_defs
      FROM (
        SELECT e.display_order AS ord, a.attr_key AS key,
               jsonb_build_object(
                 'attribute_id', a.id,
                 'attr_key', a.attr_key,
                 'attr_type', a.attr_type,
                 'name_en', a.name_en,
                 'name_am', a.name_am,
                 'help_text_en', a.help_text_en,
                 'help_text_am', a.help_text_am,
                 'is_required', e.is_required,
                 'is_filterable', e.is_filterable,
                 'display_order', e.display_order,
                 'card_rank', e.card_rank,
                 -- B19 M2 (D201 §4) — the key-facts rank, as get_posting_schema serves it.
                 'fact_rank', e.fact_rank,
                 'unit', a.unit,
                 'unit_am', a.unit_am,
                 'min_bound', a.min_bound,
                 'max_bound', a.max_bound,
                 'decimals', a.decimals,
                 'format', a.format,
                 'preset', a.preset,
                 'max_length', a.max_length,
                 'allowed_options', to_jsonb(k.allowed_options),
                 'default_value', k.default_value,
                 'visible_when', k.visible_when,
                 'option_count', 0,
                 'allow_other', false,
                 'options', coalesce((
                   SELECT jsonb_agg(o.value ORDER BY o.ordinality)
                     FROM jsonb_array_elements(
                            CASE WHEN jsonb_typeof(a.options) = 'array' THEN a.options ELSE '[]'::jsonb END)
                          WITH ORDINALITY o
                    WHERE o.value->>'value' IS NOT NULL
                      AND (
                        (jsonb_typeof(l.attributes -> a.attr_key) = 'string'
                         AND l.attributes ->> a.attr_key = o.value->>'value')
                        OR (jsonb_typeof(l.attributes -> a.attr_key) = 'array'
                             AND l.attributes -> a.attr_key ? (o.value->>'value'))
                      )), '[]'::jsonb)
               ) AS row
          FROM public.effective_category_links(l.category_id) e
          JOIN public.attributes a ON a.id = e.attribute_id
          JOIN public.category_attribute_links k ON k.id = e.link_id
         WHERE jsonb_typeof(l.attributes) = 'object'
           AND l.attributes ? a.attr_key
           AND jsonb_typeof(l.attributes -> a.attr_key) <> 'null'
           AND NOT (jsonb_typeof(l.attributes -> a.attr_key) = 'string' AND l.attributes ->> a.attr_key = '')
           AND NOT (jsonb_typeof(l.attributes -> a.attr_key) = 'array' AND jsonb_array_length(l.attributes -> a.attr_key) = 0)
      ) s;
  ELSE
    v_has_unit := false;
    v_deal := jsonb_build_object('basis', '[]'::jsonb, 'size', '[]'::jsonb, 'quantity', '[]'::jsonb, 'terms', '[]'::jsonb);
    v_defs := '[]'::jsonb;
  END IF;

  -- The photos a buyer may see: the public policy's own predicate (stripped, not held), in display order.
  SELECT coalesce(jsonb_agg(jsonb_build_object('id', p.id, 'display_order', p.display_order, 'paths', p.paths,
                                               'width', p.width, 'height', p.height)
                            ORDER BY p.display_order, p.created_at), '[]'::jsonb),
         (SELECT p2.id FROM public.listing_photos p2
           WHERE p2.listing_id = l.id AND p2.exif_stripped AND NOT p2.unscreened
           ORDER BY p2.display_order, p2.created_at LIMIT 1)
    INTO v_photos, v_cover
    FROM public.listing_photos p
   WHERE p.listing_id = l.id AND p.exif_stripped AND NOT p.unscreened;

  -- The places: the ad's coverage rows with their names, and the country of the primary place.
  SELECT coalesce(jsonb_agg(jsonb_build_object('id', loc.id, 'name_en', loc.name_en, 'name_am', loc.name_am,
                                               'level', loc.level, 'slug', loc.slug, 'country_code', loc.country_code,
                                               'position', ll.position, 'map_visible', ll.map_visible)
                            ORDER BY ll.position), '[]'::jsonb),
         coalesce(jsonb_agg(to_jsonb(loc.id) ORDER BY ll.position), '[]'::jsonb)
    INTO v_places, v_coverage
    FROM public.listing_locations ll
    JOIN public.locations loc ON loc.id = ll.location_id
   WHERE ll.listing_id = l.id;
  SELECT loc.country_code INTO v_country FROM public.locations loc WHERE loc.id = l.location_id;

  -- The seller's public line: my_seller_line's rules, keyed by the ad's seller.
  SELECT pr.seller_alias, pr.business_name, pr.seller_type, pr.created_at
    INTO v_alias, v_bname, v_stype, v_since
    FROM public.profiles pr WHERE pr.user_id = l.seller_id;
  SELECT h.alias INTO v_prev FROM public.alias_history h
   WHERE h.user_id = l.seller_id AND h.released_at IS NOT NULL
     AND h.released_at > now() - interval '365 days'
     AND h.alias_fold IS DISTINCT FROM public.name_fold(v_alias)
   ORDER BY h.released_at DESC LIMIT 1;
  v_seller := jsonb_build_object(
    'alias', v_alias,
    'business_name', CASE WHEN v_stype = 'business' THEN v_bname END,
    'previous_alias', v_prev,
    'member_since', v_since);

  -- The contact channels the seller offers — names only; the values live in reveal_listing_contact's answer.
  SELECT coalesce(jsonb_agg(to_jsonb(e.key) ORDER BY e.key), '[]'::jsonb)
    INTO v_channels
    FROM jsonb_each(CASE WHEN jsonb_typeof(l.contact_pref) = 'object' THEN l.contact_pref ELSE '{}'::jsonb END) e
   WHERE e.key IN ('phone', 'phone2', 'telegram', 'whatsapp')
     AND jsonb_typeof(e.value) = 'object'
     AND coalesce((e.value->>'show')::boolean, false);

  SELECT coalesce(sum(c.views), 0),
         coalesce(sum(c.shares_telegram + c.shares_whatsapp + c.shares_facebook + c.shares_copy + c.shares_qr), 0)
    INTO v_views, v_shares
    FROM public.listing_counters c WHERE c.listing_id = l.id;

  v_sold := CASE WHEN l.status = 'sold'
                 THEN coalesce(CASE WHEN 'rented' = ANY (coalesce(v_cat.capabilities, ARRAY[]::text[])) THEN 'rented'
                                    WHEN 'filled' = ANY (coalesce(v_cat.capabilities, ARRAY[]::text[])) THEN 'filled' END,
                               'sold') END;
  v_unit_lbl := CASE WHEN l.price_unit IS NOT NULL THEN public.price_unit_labels() -> l.price_unit END;

  RETURN jsonb_build_object(
    'public_id', l.public_id,
    'title', l.title,
    'description', l.description,
    'status', l.status,
    'is_sold', l.status = 'sold',
    'sold_at', l.sold_at,
    'sold_word', v_sold,
    'reserved', l.reserved_at IS NOT NULL,
    'published_at', l.published_at,
    'expires_at', l.expires_at,
    'renewed_at', l.renewed_at,
    'tier', l.tier,
    'photos_soon', l.photos_soon,
    'video_url', l.video_url,
    'country', v_country,
    'price', jsonb_build_object(
      'mode', l.price_mode,
      'amount', l.price_amount,
      'currency', l.price_currency,
      'period', l.price_period,
      'bp', l.price_bp,
      'negotiable', l.price_negotiable,
      'unit', l.price_unit,
      'unit_text', l.price_unit_text,
      'unit_label', v_unit_lbl,
      'was', CASE WHEN l.price_drop_at > now() - interval '14 days' THEN l.price_was END,
      'drop_at', CASE WHEN l.price_drop_at > now() - interval '14 days' THEN l.price_drop_at END),
    'category', CASE WHEN v_cat.id IS NULL THEN NULL ELSE jsonb_build_object(
      'id', v_cat.id,
      'slug', v_cat.slug,
      'name_en', v_cat.name_en,
      'name_am', v_cat.name_am,
      'capabilities', to_jsonb(coalesce(v_cat.capabilities, ARRAY[]::text[])),
      'illustration_url', v_illus,
      'deal', v_deal,
      'path', v_path) END,
    'attributes', CASE WHEN jsonb_typeof(l.attributes) = 'object' THEN l.attributes ELSE '{}'::jsonb END,
    'definitions', v_defs,
    'photos', v_photos,
    'cover_photo_id', v_cover,
    'places', jsonb_build_object(
      'location_id', l.location_id,
      'coverage', v_coverage,
      'list', v_places,
      'pin', CASE WHEN l.pin_show_lat IS NULL OR l.pin_show_lng IS NULL THEN NULL ELSE jsonb_build_object(
        'lat', l.pin_show_lat,
        'lng', l.pin_show_lng,
        'precision', l.pin_precision,
        'zoom', CASE WHEN l.pin_precision = 'approx' THEN NULL ELSE l.pin_zoom END) END,
      'directions', l.directions,
      'street_address', l.street_address),
    'seller', v_seller,
    'contact_channels', v_channels,
    'counts', jsonb_build_object('views', v_views, 'shares', v_shares),
    'viewer', jsonb_build_object('owner', p_viewer IS NOT NULL AND p_viewer = l.seller_id));
END $$;
REVOKE ALL ON FUNCTION public.public_listing_json(public.listings, uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.public_listing_json(public.listings, uuid) TO service_role;

CREATE OR REPLACE FUNCTION public.attr_export_payload(p_scope_slug text)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SET search_path TO 'public'
AS $m8c$
DECLARE
  v_defs  jsonb;
  v_links jsonb;
  v_scope uuid;
  v_keys  text[];
BEGIN
  IF p_scope_slug IS NOT NULL THEN
    SELECT c.id INTO v_scope FROM public.categories c WHERE c.slug = p_scope_slug;
    IF v_scope IS NULL THEN
      RAISE EXCEPTION 'unknown category scope';
    END IF;
  END IF;

  -- INH-1: both walks follow the PRIMARY lineage only.
  WITH RECURSIVE scope AS (
    SELECT v_scope AS id, 0 AS d
    UNION ALL
    SELECT c.id, s.d + 1
      FROM scope s
      JOIN public.categories c ON public.cat_primary_parent(c.id) = s.id
     WHERE s.d < 10
  ),
  anc AS (
    SELECT c.id AS cat_id, c.id AS src_id, 0 AS depth
      FROM public.categories c
    UNION ALL
    SELECT a.cat_id, public.cat_primary_parent(a.src_id), a.depth + 1
      FROM anc a
     WHERE a.depth < 10
       AND public.cat_primary_parent(a.src_id) IS NOT NULL
  ),
  pathq AS (
    SELECT c.id, c.id AS cur, c.name_en::text AS path, 0 AS d
      FROM public.categories c
    UNION ALL
    -- INC-306 / DEC-080 — the home is the one home reader's verdict; the walk
    -- stops where it answers NULL (a root).
    SELECT q.id, pp.parent_id, cp.name_en || ' / ' || q.path, q.d + 1
      FROM pathq q
      JOIN LATERAL (
             SELECT public.cat_primary_parent(q.cur) AS parent_id
           ) pp ON pp.parent_id IS NOT NULL
      JOIN public.categories cp ON cp.id = pp.parent_id
     WHERE q.d < 10
  ),
  best_path AS (
    SELECT DISTINCT ON (id) id, path FROM pathq ORDER BY id, d DESC
  ),
  eff AS (
    SELECT DISTINCT ON (anc.cat_id, l.attribute_id)
           anc.cat_id,
           l.attribute_id,
           l.is_required,
           l.is_filterable,
           l.card_rank,
           l.fact_rank,
           -- M-MAINT-2 Part B — the two per-link cells travel with the link.
           l.allowed_options,
           l.default_value,
           -- M-MAINT-3b — and the D24 condition.
           l.visible_when,
           -- M-ORDER — the link's own display_order travels with it.
           l.display_order,
           src.slug AS origin
      FROM anc
      JOIN public.category_attribute_links l ON l.category_id = anc.src_id
      JOIN public.categories src ON src.id = anc.src_id
     WHERE p_scope_slug IS NULL OR anc.cat_id IN (SELECT s.id FROM scope s)
     ORDER BY anc.cat_id, l.attribute_id, anc.depth ASC, src.slug
  )
  SELECT COALESCE(jsonb_agg(r.row ORDER BY r.path, r.attr_key), '[]'::jsonb)
    INTO v_links
    FROM (
      SELECT bp.path,
             a.attr_key,
             jsonb_build_object(
               'category_path', bp.path,
               'category_slug', c.slug,
               'attribute_key', a.attr_key,
               'is_required', CASE WHEN eff.is_required THEN 'true' ELSE 'false' END,
               'is_filterable', CASE WHEN eff.is_filterable THEN 'true' ELSE 'false' END,
               'card_rank', COALESCE(eff.card_rank::text, ''),
               'origin', COALESCE(eff.origin, ''),
               -- the two new cells, AFTER the existing ones (round-trip shape)
               'allowed_options', COALESCE(array_to_string(eff.allowed_options, '|'), ''),
               'default_value', COALESCE(
                 CASE WHEN eff.default_value IS NULL THEN NULL
                      WHEN jsonb_typeof(eff.default_value) = 'array'
                        THEN (SELECT string_agg(t.v, '|')
                                FROM jsonb_array_elements_text(eff.default_value) AS t(v))
                      ELSE eff.default_value #>> '{}' END,
                 ''),
               -- M-MAINT-3b — the condition, AFTER default_value, as
               -- '<sibling key>=<value>|<value>…'. NULL → '' (a blank cell
               -- changes nothing on re-import, so the export round-trips).
               'visible_when', COALESCE(
                 CASE WHEN eff.visible_when IS NULL
                        OR jsonb_typeof(eff.visible_when) = 'null' THEN NULL
                      ELSE (eff.visible_when->>'key') || '='
                           || (SELECT string_agg(t.v, '|')
                                 FROM jsonb_array_elements_text(eff.visible_when->'in') AS t(v))
                           -- M6 / INC-381 — the second pair as '&<key>=<value>|…'.
                           || CASE WHEN jsonb_typeof(eff.visible_when->'and') = 'object'
                                   THEN '&' || (eff.visible_when->'and'->>'key') || '='
                                        || (SELECT string_agg(t.v, '|')
                                              FROM jsonb_array_elements_text(eff.visible_when->'and'->'in') AS t(v))
                                   ELSE '' END
                 END,
                 ''),
               -- M-ORDER — display_order, AFTER visible_when, plain text.
               'display_order', COALESCE(eff.display_order::text, ''),
               -- B19 M2 (D201 §4) — the key-facts rank 1–4, LAST, plain text; NULL → ''.
               'fact_rank', COALESCE(eff.fact_rank::text, '')
             ) AS row
        FROM eff
        JOIN public.categories c ON c.id = eff.cat_id
        JOIN public.attributes a ON a.id = eff.attribute_id
        JOIN best_path bp ON bp.id = eff.cat_id
    ) r;

  SELECT array_agg(DISTINCT x->>'attribute_key')
    INTO v_keys
    FROM jsonb_array_elements(v_links) x;

  SELECT COALESCE(jsonb_agg(d.row ORDER BY d.attr_key), '[]'::jsonb)
    INTO v_defs
    FROM (
      SELECT a.attr_key,
             jsonb_build_object(
               'attribute_key', a.attr_key,
               'label_en', COALESCE(a.name_en, ''),
               'label_am', COALESCE(t.value, a.name_am, ''),
               'type', COALESCE(a.attr_type, ''),
               'options', COALESCE(
                 (SELECT string_agg(o.x, '|' ORDER BY o.ord)
                    FROM jsonb_array_elements_text(
                           CASE WHEN jsonb_typeof(a.options) = 'array'
                                THEN a.options ELSE '[]'::jsonb END
                         ) WITH ORDINALITY AS o(x, ord)),
                 ''),
               'depends_on', COALESCE(
                 (SELECT p.attr_key FROM public.attributes p WHERE p.id = a.depends_on), ''),
               -- DEC-050 L2b-mig — the nine v2 cells, plain text, NULL → ''.
               'unit', COALESCE(a.unit, ''),
               -- M8c / C5 — the Amharic unit, after unit.
               'unit_am', COALESCE(a.unit_am, ''),
               'min', COALESCE(a.min_bound, ''),
               'max', COALESCE(a.max_bound, ''),
               'decimals', COALESCE(a.decimals::text, ''),
               'format', COALESCE(a.format, ''),
               'preset', COALESCE(a.preset, ''),
               'max_length', COALESCE(a.max_length::text, ''),
               'help_text_en', COALESCE(a.help_text_en, ''),
               'help_text_am', COALESCE(a.help_text_am, ''),
               'is_per_variant', '',
               'direct_link_count',
                 (SELECT count(*)::text FROM public.category_attribute_links l
                   WHERE l.attribute_id = a.id)
             ) AS row
        FROM public.attributes a
        LEFT JOIN public.entity_translations t
               ON t.entity_type = 'attribute'
              AND t.entity_id = a.id
              AND t.field = 'label'
              AND t.lang_code = 'am'
              AND t.status = 'approved'
       WHERE p_scope_slug IS NULL
          OR a.attr_key = ANY(COALESCE(v_keys, ARRAY[]::text[]))
    ) d;

  RETURN jsonb_build_object('definitions', v_defs, 'links', v_links);
END $m8c$;
REVOKE ALL ON FUNCTION public.attr_export_payload(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.attr_export_payload(text) TO authenticated;
GRANT ALL ON FUNCTION public.attr_export_payload(text) TO service_role;

-- ===== C — proofs =====
DO $proof$
DECLARE
  v_fp text; v_vol "char"; v_def boolean; v_cfg text; v_n integer; v_err text;
  v_root uuid; v_leaf uuid; v_a1 uuid; v_a2 uuid; v_a3 uuid;
  v_slug text := 'e2e-mig-b19m2b-' || substr(md5(random()::text), 1, 8);
  v_rows jsonb; v_doc jsonb; v_l public.listings%ROWTYPE;
BEGIN
  -- P1. Both bodies landed (fingerprint), with their headers.
  SELECT (SELECT md5(string_agg(CASE WHEN t.ord % 2 = 1 THEN btrim(regexp_replace(t.seg, '\s+', ' ', 'g')) ELSE t.seg END, '''' ORDER BY t.ord)) FROM regexp_split_to_table(regexp_replace(replace(p.prosrc, chr(13), ''), '--[^\n]*', '', 'g'), '''') WITH ORDINALITY AS t(seg, ord)), p.provolatile, p.prosecdef, coalesce(array_to_string(p.proconfig, ','), '')
    INTO v_fp, v_vol, v_def, v_cfg FROM pg_proc p WHERE p.oid = 'public.public_listing_json(public.listings, uuid)'::regprocedure;
  IF v_fp <> '2a53f2009af99c2ccf9d4da81a809ac0' THEN RAISE EXCEPTION 'B19M2b P1: public_listing_json body is not the one written (fingerprint %)', v_fp; END IF;
  IF v_vol <> 's' OR v_def <> true OR v_cfg NOT LIKE '%search_path=public%' THEN
    RAISE EXCEPTION 'B19M2b P1: public_listing_json header changed (volatile %, definer %, config %)', v_vol, v_def, v_cfg;
  END IF;
  SELECT (SELECT md5(string_agg(CASE WHEN t.ord % 2 = 1 THEN btrim(regexp_replace(t.seg, '\s+', ' ', 'g')) ELSE t.seg END, '''' ORDER BY t.ord)) FROM regexp_split_to_table(regexp_replace(replace(p.prosrc, chr(13), ''), '--[^\n]*', '', 'g'), '''') WITH ORDINALITY AS t(seg, ord)), p.provolatile, p.prosecdef, coalesce(array_to_string(p.proconfig, ','), '')
    INTO v_fp, v_vol, v_def, v_cfg FROM pg_proc p WHERE p.oid = 'public.attr_export_payload(text)'::regprocedure;
  IF v_fp <> 'ed4d4c418afc0333aa501145c8bceafb' THEN RAISE EXCEPTION 'B19M2b P1: attr_export_payload body is not the one written (fingerprint %)', v_fp; END IF;
  IF v_vol <> 's' OR v_def <> false OR v_cfg NOT LIKE '%search_path=public%' THEN
    RAISE EXCEPTION 'B19M2b P1: attr_export_payload header changed (volatile %, definer %, config %)', v_vol, v_def, v_cfg;
  END IF;
  -- P2. The grants.
  IF has_function_privilege('anon', 'public.public_listing_json(public.listings, uuid)', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.public_listing_json(public.listings, uuid)', 'EXECUTE')
     OR has_function_privilege('anon', 'public.attr_export_payload(text)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.attr_export_payload(text)', 'EXECUTE') THEN
    RAISE EXCEPTION 'B19M2b P2: the grants are not as written';
  END IF;
  -- Scratch rows (e2e-mig-, removed below): a root, an active leaf, three attributes, three links — ranks 2, 1 and none.
  INSERT INTO public.categories (name_en, slug, is_active, allow_listings)
  VALUES ('e2e-mig- B19M2b root', v_slug || '-root', true, false) RETURNING id INTO v_root;
  INSERT INTO public.categories (name_en, slug, is_active, allow_listings)
  VALUES ('e2e-mig- B19M2b leaf', v_slug, true, true) RETURNING id INTO v_leaf;
  INSERT INTO public.category_tree_pointers (parent_id, child_id) VALUES (v_root, v_leaf);
  INSERT INTO public.attributes (attr_key, name_en, attr_type, options)
  VALUES (v_slug || '-a1', 'e2e-mig- A1', 'single_select', '[{"value":"x","label":"X"}]'::jsonb) RETURNING id INTO v_a1;
  INSERT INTO public.attributes (attr_key, name_en, attr_type)
  VALUES (v_slug || '-a2', 'e2e-mig- A2', 'number') RETURNING id INTO v_a2;
  INSERT INTO public.attributes (attr_key, name_en, attr_type)
  VALUES (v_slug || '-a3', 'e2e-mig- A3', 'text') RETURNING id INTO v_a3;
  INSERT INTO public.category_attribute_links (category_id, attribute_id, display_order, is_filterable, fact_rank)
  VALUES (v_leaf, v_a1, 1, true, 2), (v_leaf, v_a2, 2, true, 1), (v_leaf, v_a3, 3, false, NULL);
  -- P3. The export carries the cell, LAST, as text; '' for no rank.
  SELECT jsonb_agg(x) INTO v_rows
    FROM jsonb_array_elements(public.attr_export_payload(v_slug)->'links') x
   WHERE x->>'category_slug' = v_slug;  -- e2e-mig- scratch scope
  IF v_rows IS NULL OR jsonb_array_length(v_rows) <> 3 THEN
    RAISE EXCEPTION 'B19M2b P3: the export did not list the three scratch links (%)', v_rows;
  END IF;
  IF NOT (v_rows @> jsonb_build_array(jsonb_build_object('attribute_key', v_slug || '-a1', 'fact_rank', '2'))
          AND v_rows @> jsonb_build_array(jsonb_build_object('attribute_key', v_slug || '-a2', 'fact_rank', '1'))
          AND v_rows @> jsonb_build_array(jsonb_build_object('attribute_key', v_slug || '-a3', 'fact_rank', ''))) THEN
    RAISE EXCEPTION 'B19M2b P3: the export cells are not as expected (%)', v_rows;
  END IF;
  -- P4. The public document's definition rows carry the rank (an in-memory listing on the scratch leaf).
  v_l.id := gen_random_uuid();
  v_l.seller_id := gen_random_uuid();
  v_l.category_id := v_leaf;
  v_l.location_id := gen_random_uuid();
  v_l.public_id := 'zzzzzzzzzz';
  v_l.title := 'e2e-mig- proof row';
  v_l.description := 'e2e-mig- proof row';
  v_l.status := 'active';
  v_l.attributes := jsonb_build_object(v_slug || '-a1', 'x', v_slug || '-a2', 7);
  v_l.contact_pref := '{}'::jsonb;
  v_l.home_country_code := 'ET';
  v_l.price_mode := 'contact';
  v_l.photos_soon := false;
  v_l.tier := 'free';
  v_doc := public.public_listing_json(v_l, NULL);
  IF v_doc IS NULL THEN RAISE EXCEPTION 'B19M2b P4: the builder did not answer'; END IF;
  IF NOT (v_doc->'definitions') @> jsonb_build_array(jsonb_build_object('attr_key', v_slug || '-a1', 'fact_rank', 2, 'is_filterable', true))
     OR NOT (v_doc->'definitions') @> jsonb_build_array(jsonb_build_object('attr_key', v_slug || '-a2', 'fact_rank', 1)) THEN
    RAISE EXCEPTION 'B19M2b P4: the definition rows do not carry the ranks (%)', v_doc->'definitions';
  END IF;
  DELETE FROM public.category_attribute_links WHERE category_id IN (v_root, v_leaf);
  DELETE FROM public.category_tree_pointers WHERE child_id = v_leaf;
  DELETE FROM public.attributes WHERE id IN (v_a1, v_a2, v_a3) AND attr_key LIKE 'e2e-mig-%';
  DELETE FROM public.categories WHERE id IN (v_root, v_leaf) AND slug LIKE 'e2e-mig-%';
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261018150100') ON CONFLICT (version) DO NOTHING;
