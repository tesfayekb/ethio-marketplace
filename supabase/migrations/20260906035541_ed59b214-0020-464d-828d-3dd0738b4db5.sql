-- C3b — NORMALIZED ATTRIBUTE MODEL (definitions + links; dedup by construction; CRUD RPCs)
-- Tier A. category_attributes is NOT dropped: it stays the read fallback until C3c cuts over
-- (named deferral, closed at the era gate).

-- ============================================================
-- PART A.1 — attributes (definition library)
-- ============================================================
CREATE TABLE public.attributes (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  attr_key     text NOT NULL UNIQUE,
  name_en      text NOT NULL,
  name_am      text,
  attr_type    text NOT NULL CHECK (attr_type IN ('text','number','single_select','multi_select','boolean','date','range')),
  options      jsonb,
  help_text_en text,
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.attributes TO anon, authenticated;
GRANT ALL ON public.attributes TO service_role;

ALTER TABLE public.attributes ENABLE ROW LEVEL SECURITY;

CREATE POLICY attributes_public_read ON public.attributes
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY attributes_no_client_insert ON public.attributes
  FOR INSERT TO anon, authenticated WITH CHECK (false);
CREATE POLICY attributes_no_client_update ON public.attributes
  FOR UPDATE TO anon, authenticated USING (false) WITH CHECK (false);
CREATE POLICY attributes_no_client_delete ON public.attributes
  FOR DELETE TO anon, authenticated USING (false);

-- ============================================================
-- PART A.2 — category_attribute_links
-- ============================================================
CREATE TABLE public.category_attribute_links (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id   uuid NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
  attribute_id  uuid NOT NULL REFERENCES public.attributes(id) ON DELETE RESTRICT,
  is_required   boolean NOT NULL DEFAULT false,
  is_filterable boolean NOT NULL DEFAULT true,
  is_searchable boolean NOT NULL DEFAULT false,
  display_order integer NOT NULL DEFAULT 0,
  card_rank     integer,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT category_attribute_links_unique UNIQUE (category_id, attribute_id),
  CONSTRAINT category_attribute_links_card_rank_unique UNIQUE (category_id, card_rank) DEFERRABLE INITIALLY IMMEDIATE
);

GRANT SELECT ON public.category_attribute_links TO anon, authenticated;
GRANT ALL ON public.category_attribute_links TO service_role;

ALTER TABLE public.category_attribute_links ENABLE ROW LEVEL SECURITY;

CREATE POLICY cal_public_read ON public.category_attribute_links
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY cal_no_client_insert ON public.category_attribute_links
  FOR INSERT TO anon, authenticated WITH CHECK (false);
CREATE POLICY cal_no_client_update ON public.category_attribute_links
  FOR UPDATE TO anon, authenticated USING (false) WITH CHECK (false);
CREATE POLICY cal_no_client_delete ON public.category_attribute_links
  FOR DELETE TO anon, authenticated USING (false);

CREATE INDEX idx_cal_category ON public.category_attribute_links(category_id, display_order);
CREATE INDEX idx_cal_attribute ON public.category_attribute_links(attribute_id);

-- ============================================================
-- PART A.3 — BACKFILL (dedup by construction)
-- identical (attr_key, attr_type, options) collapse to ONE definition + N links.
-- A key whose rows form MORE THAN ONE such group cannot merge blindly: each of its
-- groups becomes a per-variant definition keyed attr_key || '-' || <lowest category slug
-- in that group>. Groups stay disjoint (category_attributes is unique on
-- (category_id, attr_key)), so the derived keys are unique by construction.
-- ============================================================
CREATE TEMP TABLE c3b_groups ON COMMIT DROP AS
WITH g AS (
  SELECT ca.attr_key,
         ca.attr_type,
         COALESCE(md5(ca.options::text), 'null')          AS h,
         min(c.slug)                                      AS min_slug,
         min(ca.name_en)                                  AS name_en,
         min(ca.help_text_en)                             AS help_text_en,
         (array_agg(ca.options ORDER BY c.slug, ca.id))[1] AS options,
         count(*)                                         AS n_rows
    FROM public.category_attributes ca
    JOIN public.categories c ON c.id = ca.category_id
   GROUP BY 1, 2, 3
), k AS (
  SELECT attr_key, count(*) AS grps FROM g GROUP BY 1
)
SELECT g.*,
       k.grps,
       CASE WHEN k.grps > 1 THEN g.attr_key || '-' || g.min_slug ELSE g.attr_key END AS def_key
  FROM g JOIN k USING (attr_key);

INSERT INTO public.attributes (attr_key, name_en, attr_type, options, help_text_en)
SELECT def_key, name_en, attr_type, options, help_text_en FROM c3b_groups;

INSERT INTO public.category_attribute_links
  (category_id, attribute_id, is_required, is_filterable, is_searchable, display_order, card_rank)
SELECT ca.category_id, a.id, ca.is_required, ca.is_filterable, ca.is_searchable, ca.display_order, NULL
  FROM public.category_attributes ca
  JOIN c3b_groups gr
    ON gr.attr_key = ca.attr_key
   AND gr.attr_type = ca.attr_type
   AND gr.h = COALESCE(md5(ca.options::text), 'null')
  JOIN public.attributes a ON a.attr_key = gr.def_key;

-- ============================================================
-- PART B — RPCs (F5 order: gates -> capture -> mutate; audited)
-- ============================================================

-- B.1 library + usage count
CREATE OR REPLACE FUNCTION public.admin_list_attributes()
RETURNS TABLE (
  id uuid, attr_key text, name_en text, name_am text, attr_type text,
  options jsonb, help_text_en text, usage_count integer, created_at timestamptz
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'view') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;

  RETURN QUERY
  SELECT a.id, a.attr_key, a.name_en, a.name_am, a.attr_type,
         a.options, a.help_text_en,
         (SELECT count(*)::int FROM public.category_attribute_links l
           WHERE l.attribute_id = a.id),
         a.created_at
    FROM public.attributes a
   ORDER BY a.attr_key;
END $$;

REVOKE ALL ON FUNCTION public.admin_list_attributes() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_list_attributes() TO authenticated;

-- B.2 upsert definition
CREATE OR REPLACE FUNCTION public.admin_upsert_attribute(
  p_id uuid, p_attr_key text, p_name_en text, p_attr_type text,
  p_options jsonb, p_help_text_en text
) RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE v_id uuid; v_old jsonb;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'update') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('categories', 'update');

  IF p_attr_key IS NULL OR btrim(p_attr_key) = '' THEN
    RAISE EXCEPTION 'admin.attributes.error.keyRequired' USING ERRCODE = 'P0010';
  END IF;

  IF EXISTS (SELECT 1 FROM public.attributes a
              WHERE a.attr_key = p_attr_key AND (p_id IS NULL OR a.id <> p_id)) THEN
    RAISE EXCEPTION 'admin.attributes.error.keyTaken' USING ERRCODE = 'P0010';
  END IF;

  IF p_id IS NULL THEN
    INSERT INTO public.attributes (attr_key, name_en, attr_type, options, help_text_en)
    VALUES (p_attr_key, p_name_en, p_attr_type, p_options, p_help_text_en)
    RETURNING id INTO v_id;

    PERFORM public.log_audit('attribute.create', 'attributes', v_id::text,
      jsonb_build_object('attr_key', p_attr_key, 'attr_type', p_attr_type));
  ELSE
    SELECT to_jsonb(a) INTO v_old FROM public.attributes a WHERE a.id = p_id;
    IF v_old IS NULL THEN
      RAISE EXCEPTION 'admin.attributes.error.notFound' USING ERRCODE = 'P0010';
    END IF;

    UPDATE public.attributes a
       SET attr_key     = p_attr_key,
           name_en      = COALESCE(p_name_en, a.name_en),
           attr_type    = COALESCE(p_attr_type, a.attr_type),
           options      = p_options,
           help_text_en = p_help_text_en,
           updated_at   = now()
     WHERE a.id = p_id;
    v_id := p_id;

    PERFORM public.log_audit('attribute.update', 'attributes', p_id::text,
      jsonb_build_object(
        'old', jsonb_build_object('attr_key', v_old->>'attr_key', 'name_en', v_old->>'name_en',
                                  'attr_type', v_old->>'attr_type', 'options', v_old->'options'),
        'new', (SELECT jsonb_build_object('attr_key', a.attr_key, 'name_en', a.name_en,
                                          'attr_type', a.attr_type, 'options', a.options)
                  FROM public.attributes a WHERE a.id = p_id)));
  END IF;

  RETURN v_id;
END $$;

REVOKE ALL ON FUNCTION public.admin_upsert_attribute(uuid, text, text, text, jsonb, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_upsert_attribute(uuid, text, text, text, jsonb, text) TO authenticated;

-- B.3 delete definition (blast-radius law)
CREATE OR REPLACE FUNCTION public.admin_delete_attribute(p_id uuid, p_confirm_key text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE v_key text; v_links integer;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'restructure') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('categories', 'restructure');

  SELECT a.attr_key INTO v_key FROM public.attributes a WHERE a.id = p_id;
  IF v_key IS NULL THEN
    RAISE EXCEPTION 'admin.attributes.error.notFound' USING ERRCODE = 'P0010';
  END IF;

  IF p_confirm_key IS DISTINCT FROM v_key THEN
    RAISE EXCEPTION 'admin.attributes.error.confirmMismatch' USING ERRCODE = 'P0010';
  END IF;

  SELECT count(*)::int INTO v_links
    FROM public.category_attribute_links l WHERE l.attribute_id = p_id;
  IF v_links > 0 THEN
    RAISE EXCEPTION 'admin.attributes.error.deleteHasLinks:%', v_links USING ERRCODE = 'P0010';
  END IF;

  DELETE FROM public.attributes WHERE id = p_id;

  PERFORM public.log_audit('attribute.delete', 'attributes', p_id::text,
    jsonb_build_object('attr_key', v_key));
END $$;

REVOKE ALL ON FUNCTION public.admin_delete_attribute(uuid, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_delete_attribute(uuid, text) TO authenticated;

-- B.4 link / unlink
CREATE OR REPLACE FUNCTION public.admin_link_attribute(
  p_category_id uuid, p_attribute_id uuid,
  p_is_required boolean, p_is_filterable boolean, p_display_order integer
) RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE v_id uuid;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'update') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('categories', 'update');

  IF NOT EXISTS (SELECT 1 FROM public.categories c WHERE c.id = p_category_id) THEN
    RAISE EXCEPTION 'admin.categories.error.notFound' USING ERRCODE = 'P0010';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM public.attributes a WHERE a.id = p_attribute_id) THEN
    RAISE EXCEPTION 'admin.attributes.error.notFound' USING ERRCODE = 'P0010';
  END IF;
  IF EXISTS (SELECT 1 FROM public.category_attribute_links l
              WHERE l.category_id = p_category_id AND l.attribute_id = p_attribute_id) THEN
    RAISE EXCEPTION 'admin.attributes.error.alreadyLinked' USING ERRCODE = 'P0010';
  END IF;

  INSERT INTO public.category_attribute_links
    (category_id, attribute_id, is_required, is_filterable, display_order)
  VALUES (p_category_id, p_attribute_id,
          COALESCE(p_is_required, false), COALESCE(p_is_filterable, true),
          COALESCE(p_display_order,
                   (SELECT COALESCE(max(l.display_order) + 1, 0)
                      FROM public.category_attribute_links l
                     WHERE l.category_id = p_category_id)))
  RETURNING id INTO v_id;

  PERFORM public.log_audit('attribute.link', 'category_attribute_links', v_id::text,
    jsonb_build_object('category_id', p_category_id, 'attribute_id', p_attribute_id));
  RETURN v_id;
END $$;

REVOKE ALL ON FUNCTION public.admin_link_attribute(uuid, uuid, boolean, boolean, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_link_attribute(uuid, uuid, boolean, boolean, integer) TO authenticated;

CREATE OR REPLACE FUNCTION public.admin_unlink_attribute(p_link_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE v_old jsonb;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'update') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('categories', 'update');

  SELECT to_jsonb(l) INTO v_old FROM public.category_attribute_links l WHERE l.id = p_link_id;
  IF v_old IS NULL THEN
    RAISE EXCEPTION 'admin.attributes.error.linkNotFound' USING ERRCODE = 'P0010';
  END IF;

  DELETE FROM public.category_attribute_links WHERE id = p_link_id;

  PERFORM public.log_audit('attribute.unlink', 'category_attribute_links', p_link_id::text,
    jsonb_build_object('old', v_old));
END $$;

REVOKE ALL ON FUNCTION public.admin_unlink_attribute(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_unlink_attribute(uuid) TO authenticated;

-- B.5 card attributes (max 3, ranks 1..n)
CREATE OR REPLACE FUNCTION public.admin_set_card_attributes(
  p_category_id uuid, p_ordered_attribute_ids uuid[]
) RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE v_ids uuid[]; v_old jsonb;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'update') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('categories', 'update');

  v_ids := COALESCE(p_ordered_attribute_ids, '{}');

  IF array_length(v_ids, 1) > 3 THEN
    RAISE EXCEPTION 'admin.attributes.error.cardLimit' USING ERRCODE = 'P0010';
  END IF;

  IF EXISTS (
    SELECT 1 FROM unnest(v_ids) AS aid
     WHERE NOT EXISTS (SELECT 1 FROM public.category_attribute_links l
                        WHERE l.category_id = p_category_id AND l.attribute_id = aid)
  ) THEN
    RAISE EXCEPTION 'admin.attributes.error.linkNotFound' USING ERRCODE = 'P0010';
  END IF;

  SELECT COALESCE(jsonb_agg(jsonb_build_object('attribute_id', l.attribute_id, 'card_rank', l.card_rank)
                            ORDER BY l.card_rank), '[]'::jsonb)
    INTO v_old
    FROM public.category_attribute_links l
   WHERE l.category_id = p_category_id AND l.card_rank IS NOT NULL;

  UPDATE public.category_attribute_links
     SET card_rank = NULL, updated_at = now()
   WHERE category_id = p_category_id AND card_rank IS NOT NULL;

  UPDATE public.category_attribute_links l
     SET card_rank = u.ord, updated_at = now()
    FROM unnest(v_ids) WITH ORDINALITY AS u(aid, ord)
   WHERE l.category_id = p_category_id AND l.attribute_id = u.aid;

  PERFORM public.log_audit('attribute.set_card', 'categories', p_category_id::text,
    jsonb_build_object('old', v_old, 'new', to_jsonb(v_ids)));
END $$;

REVOKE ALL ON FUNCTION public.admin_set_card_attributes(uuid, uuid[]) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_set_card_attributes(uuid, uuid[]) TO authenticated;

-- ============================================================
-- PROOFS (in-file; every failure aborts the migration)
-- ============================================================
DO $$
DECLARE
  v_src integer; v_defs integer; v_links integer; v_shared integer;
  v_attr uuid; v_cat uuid; v_link uuid; v_ok boolean;
BEGIN
  SELECT count(*) INTO v_src FROM public.category_attributes;
  SELECT count(*) INTO v_defs FROM public.attributes;
  SELECT count(*) INTO v_links FROM public.category_attribute_links;

  IF v_links <> v_src THEN
    RAISE EXCEPTION 'P1 FAILED: links % <> source rows %', v_links, v_src;
  END IF;
  IF v_defs >= v_src THEN
    RAISE EXCEPTION 'P1 FAILED: no dedup (defs % >= rows %)', v_defs, v_src;
  END IF;
  RAISE NOTICE 'P1 PASS: % source rows -> % definitions + % links', v_src, v_defs, v_links;

  -- P2: a shared definition is reachable from N categories
  SELECT max(cnt) INTO v_shared FROM (
    SELECT count(*) AS cnt FROM public.category_attribute_links GROUP BY attribute_id) s;
  IF v_shared < 2 THEN
    RAISE EXCEPTION 'P2 FAILED: no definition shared by 2+ categories';
  END IF;
  RAISE NOTICE 'P2 PASS: most-shared definition serves % categories', v_shared;

  -- P3: ON DELETE RESTRICT — a linked definition cannot be deleted
  SELECT attribute_id INTO v_attr FROM public.category_attribute_links LIMIT 1;
  BEGIN
    DELETE FROM public.attributes WHERE id = v_attr;
    RAISE EXCEPTION 'P3 FAILED: linked definition deleted';
  EXCEPTION WHEN foreign_key_violation THEN
    RAISE NOTICE 'P3 PASS: linked definition delete refused';
  END;

  -- P4: card_rank uniqueness per category
  SELECT category_id INTO v_cat FROM public.category_attribute_links
   GROUP BY category_id HAVING count(*) >= 2 LIMIT 1;
  UPDATE public.category_attribute_links SET card_rank = 1
   WHERE id = (SELECT id FROM public.category_attribute_links
                WHERE category_id = v_cat ORDER BY display_order, id LIMIT 1);
  BEGIN
    UPDATE public.category_attribute_links SET card_rank = 1
     WHERE id = (SELECT id FROM public.category_attribute_links
                  WHERE category_id = v_cat AND card_rank IS NULL
                  ORDER BY display_order, id LIMIT 1);
    RAISE EXCEPTION 'P4 FAILED: duplicate card_rank accepted';
  EXCEPTION WHEN unique_violation THEN
    RAISE NOTICE 'P4 PASS: duplicate card_rank refused';
  END;
  UPDATE public.category_attribute_links SET card_rank = NULL WHERE category_id = v_cat;

  -- P5: deny case per RPC (auth.uid() is NULL here — no session, no permission)
  SELECT id INTO v_link FROM public.category_attribute_links LIMIT 1;

  v_ok := false;
  BEGIN PERFORM count(*) FROM public.admin_list_attributes();
  EXCEPTION WHEN others THEN v_ok := (SQLERRM = 'permission denied'); END;
  IF NOT v_ok THEN RAISE EXCEPTION 'P5 FAILED: admin_list_attributes allowed'; END IF;

  v_ok := false;
  BEGIN PERFORM public.admin_upsert_attribute(NULL, 'p5_key', 'P5', 'text', NULL, NULL);
  EXCEPTION WHEN others THEN v_ok := (SQLERRM = 'permission denied'); END;
  IF NOT v_ok THEN RAISE EXCEPTION 'P5 FAILED: admin_upsert_attribute allowed'; END IF;

  v_ok := false;
  BEGIN PERFORM public.admin_delete_attribute(v_attr, 'x');
  EXCEPTION WHEN others THEN v_ok := (SQLERRM = 'permission denied'); END;
  IF NOT v_ok THEN RAISE EXCEPTION 'P5 FAILED: admin_delete_attribute allowed'; END IF;

  v_ok := false;
  BEGIN PERFORM public.admin_link_attribute(v_cat, v_attr, false, true, 0);
  EXCEPTION WHEN others THEN v_ok := (SQLERRM = 'permission denied'); END;
  IF NOT v_ok THEN RAISE EXCEPTION 'P5 FAILED: admin_link_attribute allowed'; END IF;

  v_ok := false;
  BEGIN PERFORM public.admin_unlink_attribute(v_link);
  EXCEPTION WHEN others THEN v_ok := (SQLERRM = 'permission denied'); END;
  IF NOT v_ok THEN RAISE EXCEPTION 'P5 FAILED: admin_unlink_attribute allowed'; END IF;

  v_ok := false;
  BEGIN PERFORM public.admin_set_card_attributes(v_cat, ARRAY[v_attr]);
  EXCEPTION WHEN others THEN v_ok := (SQLERRM = 'permission denied'); END;
  IF NOT v_ok THEN RAISE EXCEPTION 'P5 FAILED: admin_set_card_attributes allowed'; END IF;

  RAISE NOTICE 'P5 PASS: all six RPCs refuse an unpermitted caller';

  -- P6: no client write reaches the tables (RLS deny policies present)
  SELECT count(*) = 8 INTO v_ok FROM pg_policies
   WHERE schemaname = 'public' AND tablename IN ('attributes','category_attribute_links');
  IF NOT v_ok THEN RAISE EXCEPTION 'P6 FAILED: policy count wrong'; END IF;
  RAISE NOTICE 'P6 PASS: RLS policies in place on both tables';
END $$;

INSERT INTO public.migration_marks(version) VALUES ('20260906070000') ON CONFLICT DO NOTHING;