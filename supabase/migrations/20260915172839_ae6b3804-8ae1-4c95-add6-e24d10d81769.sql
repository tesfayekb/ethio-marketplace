-- ============================================================
-- INC-201 — the undo re-inserted deleted locations deepest-first;
-- re-declared WHOLE (INC-183 law), the ONLY change is the ORDER BY tie-break;
-- every other function untouched and proven so by read-back;
-- DEC-022: declared mark 20260915200000
--
-- The door's round trip through the route (create -> nested delete -> undo)
-- is proven at L2 (LT); this migration proves the ORDERING EXPRESSION over a
-- VALUES set (P6) and that nothing else moved (P7).
-- ============================================================

-- BEFORE-STATE — md5(prosrc) + proacl for the ten functions L1b-M landed and
-- this migration must NOT touch (the INC-200 pattern).
CREATE TEMP TABLE inc201_before ON COMMIT DROP AS
SELECT p.oid, p.proname, md5(p.prosrc) AS src_md5, p.proacl::text AS acl
  FROM pg_proc p
  JOIN pg_namespace n ON n.oid = p.pronamespace
 WHERE n.nspname = 'public'
   AND p.proname IN ('loc_num','loc_key_of','loc_path_of','loc_export_row',
                     'country_export_row','loc_id_of_key','loc_import_plan',
                     'admin_export_locations','admin_preview_location_import',
                     'admin_commit_location_import');
DO $b$ BEGIN
  IF (SELECT count(*) FROM inc201_before) <> 10 THEN
    RAISE EXCEPTION 'INC-201 before-state: expected 10 functions, saw %',
      (SELECT count(*) FROM inc201_before);
  END IF;
END $b$;

CREATE OR REPLACE FUNCTION public.admin_undo_location_import(p_batch uuid)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $fn$
DECLARE
  v_uid uuid := auth.uid(); rev public.location_import_revisions;
  v_n int := 0; v_id uuid; f jsonb; v_am jsonb; v_code char(2);
BEGIN
  IF NOT public.has_permission(v_uid, 'locations', 'import') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('locations', 'import');

  IF NOT EXISTS (SELECT 1 FROM public.location_import_revisions WHERE batch_id = p_batch) THEN
    RAISE EXCEPTION 'unknown import batch';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM public.location_import_revisions
                  WHERE batch_id = p_batch AND undone_at IS NULL) THEN
    RAISE EXCEPTION 'batchAlreadyUndone';
  END IF;

  -- reverse apply order, derived from (entity_type, action)
  FOR rev IN
    SELECT * FROM public.location_import_revisions
     WHERE batch_id = p_batch AND undone_at IS NULL
     ORDER BY CASE entity_type || ':' || action
                WHEN 'country:update' THEN 1 WHEN 'country:close' THEN 2
                WHEN 'location:delete' THEN 3 WHEN 'location:retire' THEN 4
                WHEN 'location:activate' THEN 5 WHEN 'location:update' THEN 6
                WHEN 'location:create' THEN 7 WHEN 'country:create' THEN 8
                ELSE 9 END,
              -- INC-201: deleted rows come back SHALLOWEST-first so a parent exists
              -- before its child returns; every other group keeps deepest-first.
              CASE WHEN entity_type = 'location' AND action = 'delete'
                   THEN array_length(string_to_array(entity_key,'/'),1)
                   ELSE -array_length(string_to_array(entity_key,'/'),1) END
  LOOP
    IF rev.entity_type = 'country' THEN
      v_code := rev.entity_key;
      IF rev.action = 'update' THEN
        UPDATE public.countries SET
          name_en = rev.prev->>'name_en',
          unit_system = rev.prev->>'unit_system',
          currency_code = NULLIF(rev.prev->>'currency_code','')::char(3),
          display_order = (rev.prev->>'display_order')::int,
          updated_at = now()
         WHERE code = v_code;
        DELETE FROM public.country_root_order WHERE country_code = v_code;
        INSERT INTO public.country_root_order (country_code, category_id, position, created_by)
        SELECT v_code, c.id, s.ord, v_uid
          FROM unnest(string_to_array(COALESCE(rev.prev->>'root_order',''),'|')) WITH ORDINALITY AS s(slug, ord)
          JOIN public.categories c ON c.slug = s.slug
         WHERE btrim(s.slug) <> '';
      ELSIF rev.action = 'close' THEN
        UPDATE public.countries SET is_active = (rev.prev->>'is_active') = 'true', updated_at = now()
         WHERE code = v_code;
        UPDATE public.locations SET is_active = (rev.prev->>'is_active') = 'true'
         WHERE level = 'country' AND country_code = v_code;
      ELSIF rev.action = 'open' THEN
        UPDATE public.countries SET is_active = false, updated_at = now() WHERE code = v_code;
        UPDATE public.locations SET is_active = false
         WHERE level = 'country' AND country_code = v_code;
      ELSIF rev.action = 'create' THEN
        IF EXISTS (SELECT 1 FROM public.locations WHERE country_code = v_code)
           OR EXISTS (SELECT 1 FROM public.user_roles WHERE scope_country = v_code) THEN
          RAISE EXCEPTION 'undoBlocked' USING DETAIL = 'hasRows';
        END IF;
        DELETE FROM public.countries WHERE code = v_code;
      END IF;
    ELSE
      IF rev.action = 'delete' THEN
        INSERT INTO public.locations
          (id, parent_id, level, country_code, name_en, slug, iso_3166_2, aliases,
           display_order, center_lat, center_lng, is_active, source)
        VALUES ((rev.prev->>'id')::uuid, NULLIF(rev.prev->>'parent_id','')::uuid,
                rev.prev->>'level', (rev.prev->>'country_code')::char(2),
                rev.prev->>'name_en',
                (string_to_array(rev.entity_key,'/'))[array_length(string_to_array(rev.entity_key,'/'),1)],
                NULLIF(rev.prev->>'iso_3166_2',''),
                COALESCE(public.cat_pipe(rev.prev->>'aliases'), '{}'::text[]),
                (rev.prev->>'display_order')::int,
                public.loc_num(rev.prev->>'center_lat'), public.loc_num(rev.prev->>'center_lng'),
                (rev.prev->>'is_active') = 'true', rev.prev->>'source');
        v_id := (rev.prev->>'id')::uuid;
      ELSE
        v_id := public.loc_id_of_key(rev.entity_key);
      END IF;

      IF v_id IS NOT NULL AND rev.action = 'retire' THEN
        UPDATE public.locations SET is_active = (rev.prev->>'is_active') = 'true', updated_at = now()
         WHERE id = v_id;
      ELSIF v_id IS NOT NULL AND rev.action = 'activate' THEN
        UPDATE public.locations SET is_active = (rev.prev->>'is_active') = 'true', updated_at = now()
         WHERE id = v_id;
      ELSIF v_id IS NOT NULL AND rev.action = 'update' THEN
        UPDATE public.locations SET
          name_en = rev.prev->>'name_en',
          iso_3166_2 = NULLIF(rev.prev->>'iso_3166_2',''),
          aliases = COALESCE(public.cat_pipe(rev.prev->>'aliases'), '{}'::text[]),
          display_order = (rev.prev->>'display_order')::int,
          center_lat = public.loc_num(rev.prev->>'center_lat'),
          center_lng = public.loc_num(rev.prev->>'center_lng'),
          updated_at = now()
         WHERE id = v_id;
      ELSIF v_id IS NOT NULL AND rev.action = 'create' THEN
        DELETE FROM public.entity_translations WHERE entity_type='location' AND entity_id=v_id;
        DELETE FROM public.locations WHERE id = v_id;
        v_id := NULL;
      END IF;

      -- the am state, exactly as it was
      IF v_id IS NOT NULL AND rev.action IN ('update','delete') THEN
        v_am := rev.prev->'am_state';
        IF v_am IS NULL OR v_am = 'null'::jsonb THEN
          DELETE FROM public.entity_translations
           WHERE entity_type='location' AND entity_id=v_id AND field='name' AND lang_code='am';
        ELSE
          INSERT INTO public.entity_translations
            (entity_type, entity_id, field, lang_code, value, status, machine, updated_by, updated_at)
          VALUES ('location', v_id, 'name', 'am', v_am->>'value',
                  COALESCE(v_am->>'status','edited'), COALESCE((v_am->>'machine')::boolean,false),
                  v_uid, now())
          ON CONFLICT (entity_type, entity_id, field, lang_code) DO UPDATE
            SET value = EXCLUDED.value, status = EXCLUDED.status,
                machine = EXCLUDED.machine, updated_by = v_uid, updated_at = now();
        END IF;
      END IF;
    END IF;

    UPDATE public.location_import_revisions SET undone_at = now() WHERE id = rev.id;
    v_n := v_n + 1;
  END LOOP;

  PERFORM public.log_audit('location.import.undo','locations',p_batch::text,
    jsonb_build_object('restored', v_n));
  RETURN jsonb_build_object('restored', v_n);
END $fn$;
REVOKE ALL ON FUNCTION public.admin_undo_location_import(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_undo_location_import(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.admin_undo_location_import(uuid) TO service_role;

-- ============================================================
-- PROOFS
-- ============================================================

-- P6 — the ordering expression itself, over a VALUES set (never the real table).
DO $p6$
DECLARE
  v_del text[]; v_new text[];
BEGIN
  WITH revisions(entity_type, action, entity_key) AS (
    VALUES ('location','delete','ethiopia/x/y/z'),
           ('location','delete','ethiopia/x/y'),
           ('location','create','ethiopia/a/b'),
           ('location','create','ethiopia/a/b/c')
  ), ordered AS (
    SELECT entity_type, action, entity_key,
           row_number() OVER (
             ORDER BY CASE entity_type || ':' || action
                        WHEN 'country:update' THEN 1 WHEN 'country:close' THEN 2
                        WHEN 'location:delete' THEN 3 WHEN 'location:retire' THEN 4
                        WHEN 'location:activate' THEN 5 WHEN 'location:update' THEN 6
                        WHEN 'location:create' THEN 7 WHEN 'country:create' THEN 8
                        ELSE 9 END,
                      CASE WHEN entity_type = 'location' AND action = 'delete'
                           THEN array_length(string_to_array(entity_key,'/'),1)
                           ELSE -array_length(string_to_array(entity_key,'/'),1) END
           ) AS n
      FROM revisions
  )
  SELECT array_agg(entity_key ORDER BY n) FILTER (WHERE action = 'delete'),
         array_agg(entity_key ORDER BY n) FILTER (WHERE action = 'create')
    INTO v_del, v_new
    FROM ordered;

  IF v_del <> ARRAY['ethiopia/x/y','ethiopia/x/y/z'] THEN
    RAISE EXCEPTION 'P6 delete order wrong: %', v_del;
  END IF;
  IF v_new <> ARRAY['ethiopia/a/b/c','ethiopia/a/b'] THEN
    RAISE EXCEPTION 'P6 create order wrong: %', v_new;
  END IF;
  RAISE NOTICE 'P6 ok — deletes % ; creates %', v_del, v_new;
END $p6$;

-- P7 — nothing else moved, and the door's own ACL is intact.
DO $p7$
DECLARE
  v_bad text; v_acl text;
BEGIN
  SELECT string_agg(b.proname, ', ') INTO v_bad
    FROM inc201_before b
    JOIN pg_proc p ON p.oid = b.oid
   WHERE md5(p.prosrc) <> b.src_md5 OR COALESCE(p.proacl::text,'') <> COALESCE(b.acl,'');
  IF v_bad IS NOT NULL THEN
    RAISE EXCEPTION 'P7 — functions changed that must not: %', v_bad;
  END IF;

  IF has_function_privilege('anon', 'public.admin_undo_location_import(uuid)', 'EXECUTE') THEN
    RAISE EXCEPTION 'P7 — anon can execute the undo door';
  END IF;
  IF NOT has_function_privilege('authenticated', 'public.admin_undo_location_import(uuid)', 'EXECUTE') THEN
    RAISE EXCEPTION 'P7 — authenticated cannot execute the undo door';
  END IF;
  SELECT proacl::text INTO v_acl FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
   WHERE n.nspname='public' AND p.proname='admin_undo_location_import';
  RAISE NOTICE 'P7 ok — ten functions unchanged; undo acl %', v_acl;
END $p7$;

INSERT INTO public.migration_marks(version) VALUES ('20260915200000') ON CONFLICT DO NOTHING;