-- e2e-areas: admin-monetisation
-- Turn P-1b part A, M-a (model v2 §1, §4; D294, D295, D308, D309, D311; ruling 1 §2 Q1, Q2,
-- Q7–Q9, §3 a–c, f–h) — the products table grows into the levels. public.listing_packages gains
-- kind (level | reach), a name per base language (name_en, name_am — the catalogue's own pattern,
-- shown through catalogText), the level's perks (max_photos, placement, badge) and created_by;
-- tier and label_key leave (D290: the row's key is the identifier, the name is a column). The
-- seeds are carried: featured_45 → featured, premium_60 → premium (the price rows follow the key
-- through the foreign key, recreated ON UPDATE CASCADE; audit history keeps the old text), and
-- regular is added (D311: 4 / 8 / 12 photos; D308: 30 / 45 / 60 days).
-- public.level_overrides holds the per-category rows (D295): a level × a main category and/or a
-- country; each cell NULL = inherit; one row per scope (UNIQUE NULLS NOT DISTINCT). Nothing is
-- seeded (D312). public.level_perks_for(level, category, country) is the ONE resolver of a
-- level's effective perks: per column, (main category, country) → (any, country) → (main
-- category, any) → the level row; days capped at the season's end — the nearest
-- categories.visible_until up the chain (D309; 0 once ended); an unknown, disabled or non-level
-- key answers NULL. The main category is the root reached through category_tree_pointers.
-- Three doors behind packages:update with a second factor and the staff_config dial (the config
-- door order, INC-951 3c): admin_save_listing_package (a new argument list: DROP + CREATE),
-- admin_save_level_override (upsert on the scope) and admin_clear_level_override.

-- ------------------------------------------------------------ 1. THE LEVELS
ALTER TABLE public.listing_packages
  ADD COLUMN kind       text NOT NULL DEFAULT 'level' CHECK (kind IN ('level', 'reach')),
  ADD COLUMN name_en    text NULL,
  ADD COLUMN name_am    text NULL,
  ADD COLUMN max_photos smallint NULL CHECK (max_photos IS NULL OR max_photos BETWEEN 0 AND 30),
  ADD COLUMN placement  text NULL CHECK (placement IS NULL OR placement IN ('standard', 'boost', 'top')),
  ADD COLUMN badge      boolean NOT NULL DEFAULT false,
  ADD COLUMN created_by uuid NULL REFERENCES public.profiles(user_id) ON DELETE SET NULL;
ALTER TABLE public.listing_packages ALTER COLUMN kind DROP DEFAULT;
COMMENT ON COLUMN public.listing_packages.kind IS
  'P-1b (model v2 §1): level (Regular, Featured, Premium — perks and a duration) or reach (city, nationwide, worldwide); P-3 adds bundle.';
COMMENT ON COLUMN public.listing_packages.name_en IS
  'P-1b (D290, ruling 1 Q7): the product''s name in the base language; name_am beside it; other languages as entity rows later (K2).';

-- A row this file does not name cannot be given a name or perks here: the apply stops and says so
-- (ruling 1 Q4's rule — a finding, never a sentinel).
DO $$
DECLARE v_keys text;
BEGIN
  SELECT string_agg(k.key, ', ' ORDER BY k.key) INTO v_keys
    FROM public.listing_packages k WHERE k.key NOT IN ('featured_45', 'premium_60');
  IF v_keys IS NOT NULL THEN
    RAISE EXCEPTION 'P-1b M-a: listing_packages holds rows this file does not name (%)', v_keys;
  END IF;
END $$;

UPDATE public.listing_packages SET created_by = updated_by;
UPDATE public.listing_packages
   SET name_en = 'Featured', name_am = 'የተለየ', max_photos = 8, placement = 'boost', badge = true
 WHERE key = 'featured_45';
UPDATE public.listing_packages
   SET name_en = 'Premium', name_am = 'ፕሪሚየም', max_photos = 12, placement = 'top', badge = true
 WHERE key = 'premium_60';

-- The price rows follow a renamed key: the foreign key is recreated ON UPDATE CASCADE (found by
-- its tables, not by an assumed name), then the two seeds take their level names.
DO $$
DECLARE v_fk text;
BEGIN
  SELECT c.conname INTO v_fk
    FROM pg_constraint c
   WHERE c.conrelid = 'public.package_prices'::regclass AND c.contype = 'f'
     AND c.confrelid = 'public.listing_packages'::regclass;
  IF v_fk IS NULL THEN
    RAISE EXCEPTION 'P-1b M-a: package_prices has no foreign key to listing_packages';
  END IF;
  EXECUTE format('ALTER TABLE public.package_prices DROP CONSTRAINT %I', v_fk);
END $$;
ALTER TABLE public.package_prices
  ADD CONSTRAINT package_prices_package_key_fkey
  FOREIGN KEY (package_key) REFERENCES public.listing_packages(key) ON UPDATE CASCADE;
UPDATE public.listing_packages SET key = 'featured' WHERE key = 'featured_45';
UPDATE public.listing_packages SET key = 'premium' WHERE key = 'premium_60';
ALTER TABLE public.listing_packages DROP COLUMN tier, DROP COLUMN label_key;

INSERT INTO public.listing_packages
  (key, kind, name_en, name_am, days, max_photos, placement, badge, enabled, self_serve, extends_lifetime, sort)
VALUES ('regular', 'level', 'Regular', 'መደበኛ', 30, 4, 'standard', false, true, true, true, 0)
ON CONFLICT (key) DO NOTHING;

ALTER TABLE public.listing_packages
  ALTER COLUMN name_en SET NOT NULL,
  ADD CONSTRAINT listing_packages_perks_by_kind_check CHECK (
    CASE WHEN kind = 'level' THEN max_photos IS NOT NULL AND placement IS NOT NULL
         ELSE max_photos IS NULL AND placement IS NULL AND NOT badge END);
-- The browser roles' column grant restated for the new shape (ruling 1 §3 g): never created_by
-- or updated_by.
GRANT SELECT (key, kind, name_en, name_am, days, max_photos, placement, badge, enabled, self_serve, extends_lifetime, sort, created_at, updated_at)
  ON public.listing_packages TO anon, authenticated;

-- ------------------------------------------------------------ 2. THE PER-CATEGORY ROWS
CREATE TABLE public.level_overrides (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  level_key    text NOT NULL REFERENCES public.listing_packages(key) ON UPDATE CASCADE,
  category_id  uuid NULL REFERENCES public.categories(id),
  country_code char(2) NULL REFERENCES public.countries(code),
  days         integer NULL CHECK (days IS NULL OR days > 0),
  max_photos   smallint NULL CHECK (max_photos IS NULL OR max_photos BETWEEN 0 AND 30),
  placement    text NULL CHECK (placement IS NULL OR placement IN ('standard', 'boost', 'top')),
  badge        boolean NULL,
  created_by   uuid NULL REFERENCES public.profiles(user_id) ON DELETE SET NULL,
  updated_by   uuid NULL REFERENCES public.profiles(user_id) ON DELETE SET NULL,
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT level_overrides_one_cell_check
    CHECK (days IS NOT NULL OR max_photos IS NOT NULL OR placement IS NOT NULL OR badge IS NOT NULL),
  CONSTRAINT level_overrides_scope_unique UNIQUE NULLS NOT DISTINCT (level_key, category_id, country_code)
);
COMMENT ON TABLE public.level_overrides IS
  'D295/D308 — a level''s perks for a main category and/or a country (NULL = every); a NULL cell inherits; read only through level_perks_for (P-1b).';
CREATE TRIGGER level_overrides_updated_at
  BEFORE UPDATE ON public.level_overrides
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

REVOKE ALL ON public.level_overrides FROM PUBLIC, anon, authenticated;
GRANT ALL ON public.level_overrides TO service_role;
GRANT SELECT (id, level_key, category_id, country_code, days, max_photos, placement, badge, created_at, updated_at)
  ON public.level_overrides TO anon, authenticated;
ALTER TABLE public.level_overrides ENABLE ROW LEVEL SECURITY;
CREATE POLICY level_overrides_public_read ON public.level_overrides
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY level_overrides_no_insert ON public.level_overrides
  FOR INSERT TO anon, authenticated WITH CHECK (false);
CREATE POLICY level_overrides_no_update ON public.level_overrides
  FOR UPDATE TO anon, authenticated USING (false);
CREATE POLICY level_overrides_no_delete ON public.level_overrides
  FOR DELETE TO anon, authenticated USING (false);

-- ------------------------------------------------------------ 3. THE RESOLVER
CREATE FUNCTION public.level_perks_for(p_level_key text, p_category_id uuid, p_country_code character)
RETURNS jsonb
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public
AS $fn$
  WITH RECURSIVE
  lvl AS (
    SELECT k.days, k.max_photos, k.placement, k.badge
      FROM public.listing_packages k
     WHERE k.key = p_level_key AND k.kind = 'level' AND k.enabled
  ),
  chain(id, depth) AS (
    SELECT p_category_id, 0 WHERE p_category_id IS NOT NULL
    UNION
    SELECT t.parent_id, c.depth + 1
      FROM chain c
      JOIN public.category_tree_pointers t ON t.child_id = c.id
     WHERE t.parent_id IS NOT NULL AND c.depth < 32
  ),
  -- The main category: the nearest root (no parent pointer), ties by its browse order, then id.
  main AS (
    SELECT c.id
      FROM chain c
     WHERE NOT EXISTS (SELECT 1 FROM public.category_tree_pointers t
                        WHERE t.child_id = c.id AND t.parent_id IS NOT NULL)
     ORDER BY c.depth,
              (SELECT min(t.display_order) FROM public.category_tree_pointers t WHERE t.child_id = c.id),
              c.id
     LIMIT 1
  ),
  season AS (
    SELECT c.visible_until
      FROM chain ch JOIN public.categories c ON c.id = ch.id
     WHERE c.visible_until IS NOT NULL
     ORDER BY ch.depth LIMIT 1
  ),
  ov AS (
    SELECT o.days, o.max_photos, o.placement, o.badge,
           (o.country_code IS NULL)::integer * 2 + (o.category_id IS NULL)::integer AS prio
      FROM public.level_overrides o
     WHERE o.level_key = p_level_key
       AND (o.category_id IS NULL OR o.category_id = (SELECT m.id FROM main m))
       AND (o.country_code IS NULL OR o.country_code = p_country_code)
  ),
  picked AS (
    SELECT (SELECT o.days FROM ov o WHERE o.days IS NOT NULL ORDER BY o.prio LIMIT 1) AS days,
           (SELECT o.max_photos FROM ov o WHERE o.max_photos IS NOT NULL ORDER BY o.prio LIMIT 1) AS max_photos,
           (SELECT o.placement FROM ov o WHERE o.placement IS NOT NULL ORDER BY o.prio LIMIT 1) AS placement,
           (SELECT o.badge FROM ov o WHERE o.badge IS NOT NULL ORDER BY o.prio LIMIT 1) AS badge,
           (SELECT s.visible_until FROM season s) AS season_until
  )
  SELECT jsonb_build_object(
           'days', CASE WHEN p.season_until IS NULL THEN coalesce(p.days, l.days)
                        ELSE GREATEST(0, LEAST(coalesce(p.days, l.days),
                               floor(extract(epoch FROM (p.season_until - now())) / 86400)::integer)) END,
           'max_photos', coalesce(p.max_photos, l.max_photos),
           'placement', coalesce(p.placement, l.placement),
           'badge', coalesce(p.badge, l.badge),
           'season_until', p.season_until)
    FROM lvl l CROSS JOIN picked p;
$fn$;
REVOKE ALL ON FUNCTION public.level_perks_for(text, uuid, character) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.level_perks_for(text, uuid, character) TO anon, authenticated, service_role;

-- ------------------------------------------------------------ 4. THE DOORS
DROP FUNCTION public.admin_save_listing_package(text, text, integer, boolean, boolean, boolean, text, integer);

CREATE FUNCTION public.admin_save_listing_package(p_key text, p_kind text, p_name_en text, p_days integer, p_enabled boolean, p_self_serve boolean, p_extends_lifetime boolean, p_name_am text DEFAULT NULL::text, p_max_photos smallint DEFAULT NULL::smallint, p_placement text DEFAULT NULL::text, p_badge boolean DEFAULT NULL::boolean, p_sort integer DEFAULT NULL::integer)
 RETURNS jsonb
 LANGUAGE plpgsql
 VOLATILE
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid    uuid := auth.uid();
  v_old    public.listing_packages%ROWTYPE;
  v_new    public.listing_packages%ROWTYPE;
  v_photos smallint;
  v_place  text;
  v_badge  boolean;
  v_am     text;
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'not signed in';
  END IF;
  IF NOT public.has_permission(v_uid, 'packages', 'update') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('packages', 'update');
  IF NOT coalesce((public.rate_gate('staff_config')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;

  IF coalesce(p_key, '') !~ '^[a-z][a-z0-9_]{1,31}$' THEN
    RAISE EXCEPTION 'bad key';
  END IF;
  IF p_kind IS NULL OR p_kind NOT IN ('level', 'reach') THEN
    RAISE EXCEPTION 'unknown kind';
  END IF;
  IF btrim(coalesce(p_name_en, '')) = '' OR length(p_name_en) > 80 OR length(coalesce(p_name_am, '')) > 80 THEN
    RAISE EXCEPTION 'bad name';
  END IF;
  IF coalesce(p_days, 0) < 1 THEN
    RAISE EXCEPTION 'bad days';
  END IF;

  SELECT * INTO v_old FROM public.listing_packages WHERE key = p_key FOR UPDATE;
  -- A product's kind never changes once the row exists (ruling 2).
  IF v_old.key IS NOT NULL AND v_old.kind <> p_kind THEN
    RAISE EXCEPTION 'kind change';
  END IF;
  -- A NULL Amharic name keeps the stored one; a blank clears it.
  v_am := CASE WHEN p_name_am IS NULL THEN v_old.name_am ELSE nullif(btrim(p_name_am), '') END;
  IF p_kind = 'level' THEN
    -- A level's perks: a NULL keeps the stored value; the row must end with every perk set.
    v_photos := coalesce(p_max_photos, v_old.max_photos);
    v_place := coalesce(p_placement, v_old.placement);
    v_badge := coalesce(p_badge, v_old.badge, false);
    IF v_photos IS NULL OR v_photos < 0 OR v_photos > 30 THEN
      RAISE EXCEPTION 'bad photos';
    END IF;
    IF v_place IS NULL OR v_place NOT IN ('standard', 'boost', 'top') THEN
      RAISE EXCEPTION 'unknown placement';
    END IF;
  ELSE
    IF p_max_photos IS NOT NULL OR p_placement IS NOT NULL OR coalesce(p_badge, false) THEN
      RAISE EXCEPTION 'perks on reach';
    END IF;
    v_photos := NULL;
    v_place := NULL;
    v_badge := false;
  END IF;

  INSERT INTO public.listing_packages
    (key, kind, name_en, name_am, days, max_photos, placement, badge, enabled, self_serve, extends_lifetime, sort, created_by, updated_by, updated_at)
  VALUES (p_key, p_kind, btrim(p_name_en), v_am, p_days, v_photos, v_place, v_badge,
          coalesce(p_enabled, true), coalesce(p_self_serve, false), coalesce(p_extends_lifetime, true),
          coalesce(p_sort, v_old.sort, 0), v_uid, v_uid, now())
  ON CONFLICT (key) DO UPDATE
    SET kind = EXCLUDED.kind,
        name_en = EXCLUDED.name_en,
        name_am = EXCLUDED.name_am,
        days = EXCLUDED.days,
        max_photos = EXCLUDED.max_photos,
        placement = EXCLUDED.placement,
        badge = EXCLUDED.badge,
        enabled = EXCLUDED.enabled,
        self_serve = EXCLUDED.self_serve,
        extends_lifetime = EXCLUDED.extends_lifetime,
        sort = EXCLUDED.sort,
        updated_by = EXCLUDED.updated_by,
        updated_at = now()
  RETURNING * INTO v_new;
  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
    VALUES (v_uid, 'package.saved', 'listing_package', p_key,
            jsonb_build_object(
              'old', CASE WHEN v_old.key IS NULL THEN NULL
                          ELSE to_jsonb(v_old) - 'created_by' - 'updated_by' - 'updated_at' - 'created_at' END,
              'new', to_jsonb(v_new) - 'created_by' - 'updated_by' - 'updated_at' - 'created_at'));

  RETURN jsonb_build_object('ok', true, 'key', p_key, 'created', v_old.key IS NULL);
END $function$;
REVOKE ALL ON FUNCTION public.admin_save_listing_package(text, text, text, integer, boolean, boolean, boolean, text, smallint, text, boolean, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_save_listing_package(text, text, text, integer, boolean, boolean, boolean, text, smallint, text, boolean, integer) TO authenticated, service_role;

CREATE FUNCTION public.admin_save_level_override(p_level_key text, p_category_id uuid DEFAULT NULL::uuid, p_country_code character DEFAULT NULL::bpchar, p_days integer DEFAULT NULL::integer, p_max_photos smallint DEFAULT NULL::smallint, p_placement text DEFAULT NULL::text, p_badge boolean DEFAULT NULL::boolean)
 RETURNS jsonb
 LANGUAGE plpgsql
 VOLATILE
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid uuid := auth.uid();
  v_old public.level_overrides%ROWTYPE;
  v_new public.level_overrides%ROWTYPE;
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'not signed in';
  END IF;
  IF NOT public.has_permission(v_uid, 'packages', 'update') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('packages', 'update');
  IF NOT coalesce((public.rate_gate('staff_config')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;

  -- The level row is the lock for its override rows.
  PERFORM 1 FROM public.listing_packages k WHERE k.key = p_level_key AND k.kind = 'level' FOR UPDATE;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'unknown level';
  END IF;
  IF p_category_id IS NOT NULL
     AND (NOT EXISTS (SELECT 1 FROM public.categories c WHERE c.id = p_category_id)
          OR EXISTS (SELECT 1 FROM public.category_tree_pointers t
                      WHERE t.child_id = p_category_id AND t.parent_id IS NOT NULL)) THEN
    RAISE EXCEPTION 'not a main category';
  END IF;
  IF p_country_code IS NOT NULL AND NOT EXISTS (SELECT 1 FROM public.countries c WHERE c.code = p_country_code) THEN
    RAISE EXCEPTION 'unknown country';
  END IF;
  IF p_days IS NOT NULL AND p_days < 1 THEN
    RAISE EXCEPTION 'bad days';
  END IF;
  IF p_max_photos IS NOT NULL AND (p_max_photos < 0 OR p_max_photos > 30) THEN
    RAISE EXCEPTION 'bad photos';
  END IF;
  IF p_placement IS NOT NULL AND p_placement NOT IN ('standard', 'boost', 'top') THEN
    RAISE EXCEPTION 'unknown placement';
  END IF;
  IF p_days IS NULL AND p_max_photos IS NULL AND p_placement IS NULL AND p_badge IS NULL THEN
    RAISE EXCEPTION 'empty override';
  END IF;

  SELECT * INTO v_old FROM public.level_overrides
   WHERE level_key = p_level_key
     AND category_id IS NOT DISTINCT FROM p_category_id
     AND country_code IS NOT DISTINCT FROM p_country_code
   FOR UPDATE;
  INSERT INTO public.level_overrides
    (level_key, category_id, country_code, days, max_photos, placement, badge, created_by, updated_by, updated_at)
  VALUES (p_level_key, p_category_id, p_country_code, p_days, p_max_photos, p_placement, p_badge, v_uid, v_uid, now())
  ON CONFLICT ON CONSTRAINT level_overrides_scope_unique DO UPDATE
    SET days = EXCLUDED.days,
        max_photos = EXCLUDED.max_photos,
        placement = EXCLUDED.placement,
        badge = EXCLUDED.badge,
        updated_by = EXCLUDED.updated_by,
        updated_at = now()
  RETURNING * INTO v_new;
  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
    VALUES (v_uid, 'level_override.saved', 'level_override', v_new.id::text,
            jsonb_build_object(
              'old', CASE WHEN v_old.id IS NULL THEN NULL
                          ELSE to_jsonb(v_old) - 'created_by' - 'updated_by' - 'updated_at' - 'created_at' END,
              'new', to_jsonb(v_new) - 'created_by' - 'updated_by' - 'updated_at' - 'created_at'));

  RETURN jsonb_build_object('ok', true, 'id', v_new.id, 'created', v_old.id IS NULL);
END $function$;
REVOKE ALL ON FUNCTION public.admin_save_level_override(text, uuid, character, integer, smallint, text, boolean) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_save_level_override(text, uuid, character, integer, smallint, text, boolean) TO authenticated, service_role;

CREATE FUNCTION public.admin_clear_level_override(p_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 VOLATILE
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid uuid := auth.uid();
  v_old public.level_overrides%ROWTYPE;
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'not signed in';
  END IF;
  IF NOT public.has_permission(v_uid, 'packages', 'update') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('packages', 'update');
  IF NOT coalesce((public.rate_gate('staff_config')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;

  SELECT * INTO v_old FROM public.level_overrides WHERE id = p_id FOR UPDATE;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'not found';
  END IF;
  DELETE FROM public.level_overrides WHERE id = p_id;
  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
    VALUES (v_uid, 'level_override.cleared', 'level_override', p_id::text,
            jsonb_build_object('old', to_jsonb(v_old) - 'created_by' - 'updated_by' - 'updated_at' - 'created_at'));

  RETURN jsonb_build_object('ok', true, 'id', p_id);
END $function$;
REVOKE ALL ON FUNCTION public.admin_clear_level_override(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_clear_level_override(uuid) TO authenticated, service_role;

-- PROOF (P-1b M-a): scratch rows only, rolled back by the sentinel; no real row read (G27).
--   (a) the resolver's header and grants (STABLE, INVOKER, search_path public; anon, authenticated,
--       service_role); the three doors' (VOLATILE, DEFINER; closed to PUBLIC and anon, open to
--       authenticated and service_role); the old save signature gone; the browser roles read the
--       new columns of listing_packages and every column of level_overrides but created_by and
--       updated_by, hold no write, tier and label_key are gone; row security on; the three levels
--       carry their names and perks, the old keys are gone.
--   (b) a price row follows a renamed key (the foreign key cascades).
--   (c) the resolver, per column, on a scratch level over a scratch root → leaf → leaf2 and
--       another root, in a scratch market XZ: the level's values; (root, any) days; (any, XZ)
--       days and photos beat it; (root, XZ) photos alone leaves days to (any, XZ); the leaf and
--       leaf2 inherit the root's cells; a cell on the other root is never picked; an unknown,
--       switched-off or reach key answers NULL.
--   (d) the season: a root ending in 10 days caps a 60-day level at 10 and names season_until; an
--       ended season answers 0.
--   (e) the doors: a level created with both names (row, created_by, audit old null), edited (old →
--       new; a NULL Amharic name keeps the stored one); a reach row without perks; an override
--       saved, saved again on the same scope (one row; old → new), cleared (gone; audit);
--       every refusal with its own words, each writing nothing.
--   (f) a plain user: 'permission denied'; (g) aal1: P0009; (h) the dial: 'rateLimited'.
--   (i) anon reads level_overrides rows, never created_by.
DO $proof$
DECLARE
  v_res     regprocedure := 'public.level_perks_for(text,uuid,character)'::regprocedure;
  v_save    regprocedure := 'public.admin_save_listing_package(text,text,text,integer,boolean,boolean,boolean,text,smallint,text,boolean,integer)'::regprocedure;
  v_ov      regprocedure := 'public.admin_save_level_override(text,uuid,character,integer,smallint,text,boolean)'::regprocedure;
  v_clear   regprocedure := 'public.admin_clear_level_override(uuid)'::regprocedure;
  v_fn      regprocedure;
  v_admin   uuid := gen_random_uuid();
  v_plain   uuid := gen_random_uuid();
  v_session uuid := gen_random_uuid();
  v_tag     text := 'e2e-mig-p1b-ma-' || substr(gen_random_uuid()::text, 1, 8);
  v_lv      text := 'e2e_mig_lv_' || translate(substr(gen_random_uuid()::text, 1, 8), '0123456789-', 'abcdefghijk');
  v_rc      text := 'e2e_mig_rc_' || translate(substr(gen_random_uuid()::text, 1, 8), '0123456789-', 'abcdefghijk');
  v_code    char(2) := 'XZ';
  v_cur     char(3) := 'XTS';
  v_anc     uuid;
  v_root    uuid;
  v_leaf    uuid;
  v_leaf2   uuid;
  v_other   uuid;
  v_season  uuid;
  v_sleaf   uuid;
  v_ended   uuid;
  v_price   uuid;
  v_o1      uuid;
  v_o2      uuid;
  v_o3      uuid;
  v_a       jsonb;
  v_answer  jsonb;
  v_msg     text;
  v_state   text;
  v_case    text;
  v_col     text;
  v_role    text;
  v_n       integer;
BEGIN
  -- (a) headers and grants
  IF (SELECT prosecdef OR provolatile <> 's' OR proconfig::text <> '{search_path=public}' FROM pg_proc WHERE oid = v_res)
     OR NOT has_function_privilege('anon', v_res, 'EXECUTE')
     OR NOT has_function_privilege('authenticated', v_res, 'EXECUTE')
     OR NOT has_function_privilege('service_role', v_res, 'EXECUTE') THEN
    RAISE EXCEPTION 'P-1b M-a proof (a): the resolver''s header or grants differ';
  END IF;
  FOREACH v_fn IN ARRAY ARRAY[v_save, v_ov, v_clear] LOOP
    IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'P-1b M-a proof (a): the header or the grants of % differ', v_fn;
    END IF;
  END LOOP;
  IF to_regprocedure('public.admin_save_listing_package(text,text,integer,boolean,boolean,boolean,text,integer)') IS NOT NULL THEN
    RAISE EXCEPTION 'P-1b M-a proof (a): the old save signature is still declared';
  END IF;
  FOREACH v_role IN ARRAY ARRAY['anon', 'authenticated'] LOOP
    FOREACH v_col IN ARRAY ARRAY['key', 'kind', 'name_en', 'name_am', 'days', 'max_photos', 'placement', 'badge', 'enabled', 'self_serve', 'extends_lifetime', 'sort', 'created_at', 'updated_at'] LOOP
      IF NOT has_column_privilege(v_role, 'public.listing_packages', v_col, 'SELECT') THEN
        RAISE EXCEPTION 'P-1b M-a proof (a): % cannot read listing_packages.%', v_role, v_col;
      END IF;
    END LOOP;
    FOREACH v_col IN ARRAY ARRAY['id', 'level_key', 'category_id', 'country_code', 'days', 'max_photos', 'placement', 'badge', 'created_at', 'updated_at'] LOOP
      IF NOT has_column_privilege(v_role, 'public.level_overrides', v_col, 'SELECT') THEN
        RAISE EXCEPTION 'P-1b M-a proof (a): % cannot read level_overrides.%', v_role, v_col;
      END IF;
    END LOOP;
    IF has_column_privilege(v_role, 'public.listing_packages', 'created_by', 'SELECT')
       OR has_column_privilege(v_role, 'public.listing_packages', 'updated_by', 'SELECT')
       OR has_column_privilege(v_role, 'public.level_overrides', 'created_by', 'SELECT')
       OR has_column_privilege(v_role, 'public.level_overrides', 'updated_by', 'SELECT')
       OR has_table_privilege(v_role, 'public.listing_packages', 'INSERT, UPDATE, DELETE')
       OR has_table_privilege(v_role, 'public.level_overrides', 'INSERT, UPDATE, DELETE') THEN
      RAISE EXCEPTION 'P-1b M-a proof (a): % holds a privilege it must not', v_role;
    END IF;
  END LOOP;
  IF EXISTS (SELECT 1 FROM information_schema.columns
              WHERE table_schema = 'public' AND table_name = 'listing_packages' AND column_name IN ('tier', 'label_key'))
     OR NOT has_table_privilege('service_role', 'public.level_overrides', 'SELECT, INSERT, UPDATE, DELETE')
     OR NOT (SELECT relrowsecurity FROM pg_class WHERE oid = 'public.level_overrides'::regclass) THEN
    RAISE EXCEPTION 'P-1b M-a proof (a): a dropped column remains, or service_role or row security differs';
  END IF;
  IF (SELECT count(*) FROM public.listing_packages
       WHERE (key, kind, name_en, name_am, days, max_photos, placement, badge, enabled) IN
             (('regular', 'level', 'Regular', 'መደበኛ', 30, 4, 'standard', false, true),
              ('featured', 'level', 'Featured', 'የተለየ', 45, 8, 'boost', true, true),
              ('premium', 'level', 'Premium', 'ፕሪሚየም', 60, 12, 'top', true, true))) <> 3
     OR EXISTS (SELECT 1 FROM public.listing_packages WHERE key IN ('featured_45', 'premium_60')) THEN
    RAISE EXCEPTION 'P-1b M-a proof (a): the carried seeds differ';
  END IF;

  BEGIN
    -- The scratch market XZ (the M1b way), a scratch currency (INC-1040: never a real row), a
    -- scratch tree: root → leaf → leaf2, another root, a seasonal root → leaf, an ended root.
    IF EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
      RAISE EXCEPTION 'P-1b M-a proof: scratch code % already exists', v_code;
    END IF;
    IF EXISTS (SELECT 1 FROM public.currencies WHERE code = v_cur) THEN
      RAISE EXCEPTION 'P-1b M-a proof: scratch currency % already exists', v_cur;
    END IF;
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_code, 'e2e-mig-p1b-ma', true);
    SELECT a.id INTO v_anc FROM public.locations a
     WHERE a.country_code = v_code AND a.level = 'country' AND a.name_en = 'e2e-mig-p1b-ma';
    IF v_anc IS NULL THEN RAISE EXCEPTION 'P-1b M-a proof: the scratch market has no anchor'; END IF;
    -- ISO 4217 keeps XTS for testing; no market ever prices in it (K4 exception, as 'XZ').
    INSERT INTO public.currencies (code, name_en, minor_units) VALUES (v_cur, 'e2e-mig-p1b-ma', 2);
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES ('E2E P1b Root', v_tag || '-root', true, true, false, 9990) RETURNING id INTO v_root;
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES ('E2E P1b Leaf', v_tag || '-leaf', true, true, true, 9991) RETURNING id INTO v_leaf;
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES ('E2E P1b Leaf 2', v_tag || '-leaf2', true, true, true, 9992) RETURNING id INTO v_leaf2;
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES ('E2E P1b Other', v_tag || '-other', true, true, true, 9993) RETURNING id INTO v_other;
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order, visible_until)
    VALUES ('E2E P1b Season', v_tag || '-season', true, true, false, 9994, now() + interval '10 days') RETURNING id INTO v_season;
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES ('E2E P1b Season Leaf', v_tag || '-sleaf', true, true, true, 9995) RETURNING id INTO v_sleaf;
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order, visible_until)
    VALUES ('E2E P1b Ended', v_tag || '-ended', true, true, true, 9996, now() - interval '1 day') RETURNING id INTO v_ended;
    INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order)
    VALUES (NULL, v_root, 9990), (v_root, v_leaf, 1), (v_leaf, v_leaf2, 1), (NULL, v_other, 9993),
           (NULL, v_season, 9994), (v_season, v_sleaf, 1), (NULL, v_ended, 9996);

    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
      (v_admin, v_tag || '-admin@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_plain, v_tag || '-plain@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO public.user_roles (user_id, role_id, scope_type)
    SELECT v_admin, r.id, 'global' FROM public.roles r WHERE r.name = 'super_admin';
    INSERT INTO auth.sessions (id, user_id, created_at, updated_at, aal)
    VALUES (v_session, v_admin, now(), now(), 'aal2');
    INSERT INTO auth.mfa_factors (id, user_id, friendly_name, factor_type, status, created_at, updated_at, secret)
    VALUES (gen_random_uuid(), v_admin, v_tag, 'totp', 'verified', now(), now(), 'PROOFSECRET');
    INSERT INTO auth.mfa_amr_claims (id, session_id, created_at, updated_at, authentication_method)
    VALUES (gen_random_uuid(), v_session, now(), now(), 'totp');
    INSERT INTO public.rate_overrides (user_id, action, max_count) VALUES (v_admin, 'staff_config', 1);

    -- (b) a scratch level and a price row on it, written by the migration's own role; renaming the
    -- key carries the price row.
    INSERT INTO public.listing_packages (key, kind, name_en, days, max_photos, placement, badge, enabled, self_serve, extends_lifetime, sort)
    VALUES (v_lv, 'level', 'E2E level', 60, 5, 'boost', false, true, true, true, 99);
    INSERT INTO public.package_prices (package_key, amount, currency, valid_from) VALUES (v_lv, 1.00, v_cur, now() - interval '1 hour')
    RETURNING id INTO v_price;
    UPDATE public.listing_packages SET key = v_lv || 'x' WHERE key = v_lv;
    IF (SELECT package_key FROM public.package_prices WHERE id = v_price) IS DISTINCT FROM v_lv || 'x' THEN
      RAISE EXCEPTION 'P-1b M-a proof (b): the price row did not follow the renamed key';
    END IF;
    UPDATE public.listing_packages SET key = v_lv WHERE key = v_lv || 'x';

    -- (c) the resolver, per column.
    v_a := public.level_perks_for(v_lv, v_leaf, v_code);
    IF v_a IS DISTINCT FROM jsonb_build_object('days', 60, 'max_photos', 5, 'placement', 'boost', 'badge', false, 'season_until', NULL) THEN
      RAISE EXCEPTION 'P-1b M-a proof (c): the level''s own values answered %', v_a;
    END IF;
    INSERT INTO public.level_overrides (level_key, category_id, country_code, days) VALUES (v_lv, v_root, NULL, 20);
    INSERT INTO public.level_overrides (level_key, category_id, country_code, days, max_photos) VALUES (v_lv, NULL, v_code, 15, 7);
    INSERT INTO public.level_overrides (level_key, category_id, country_code, days) VALUES (v_lv, v_other, v_code, 1);
    IF (public.level_perks_for(v_lv, v_leaf, NULL)->>'days')::integer <> 20
       OR (public.level_perks_for(v_lv, v_leaf, NULL)->>'max_photos')::integer <> 5 THEN
      RAISE EXCEPTION 'P-1b M-a proof (c): (root, any) was not picked for the leaf without a market';
    END IF;
    v_a := public.level_perks_for(v_lv, v_leaf, v_code);
    IF (v_a->>'days')::integer <> 15 OR (v_a->>'max_photos')::integer <> 7 OR v_a->>'placement' <> 'boost' THEN
      RAISE EXCEPTION 'P-1b M-a proof (c): (any, XZ) did not beat (root, any): %', v_a;
    END IF;
    INSERT INTO public.level_overrides (level_key, category_id, country_code, max_photos, badge) VALUES (v_lv, v_root, v_code, 9, true);
    INSERT INTO public.level_overrides (level_key, category_id, country_code, placement) VALUES (v_lv, v_root, NULL, 'top')
    ON CONFLICT ON CONSTRAINT level_overrides_scope_unique DO UPDATE SET placement = EXCLUDED.placement;
    v_a := public.level_perks_for(v_lv, v_leaf, v_code);
    IF v_a IS DISTINCT FROM jsonb_build_object('days', 15, 'max_photos', 9, 'placement', 'top', 'badge', true, 'season_until', NULL) THEN
      RAISE EXCEPTION 'P-1b M-a proof (c): the per-column precedence answered %', v_a;
    END IF;
    IF public.level_perks_for(v_lv, v_leaf2, v_code) IS DISTINCT FROM v_a
       OR public.level_perks_for(v_lv, v_root, v_code) IS DISTINCT FROM v_a THEN
      RAISE EXCEPTION 'P-1b M-a proof (c): leaf2 or the root itself answered differently';
    END IF;
    IF (public.level_perks_for(v_lv, v_other, v_code)->>'days')::integer <> 1
       OR (public.level_perks_for(v_lv, v_leaf, v_code)->>'days')::integer = 1 THEN
      RAISE EXCEPTION 'P-1b M-a proof (c): the other root''s cell leaked or was not picked for its own root';
    END IF;
    INSERT INTO public.listing_packages (key, kind, name_en, days, enabled, self_serve, extends_lifetime, sort)
    VALUES (v_rc, 'reach', 'E2E reach', 30, true, true, false, 199);
    UPDATE public.listing_packages SET enabled = false WHERE key = v_lv;
    IF public.level_perks_for(v_lv, v_leaf, v_code) IS NOT NULL
       OR public.level_perks_for(v_rc, v_leaf, v_code) IS NOT NULL
       OR public.level_perks_for('e2e_mig_none', v_leaf, v_code) IS NOT NULL THEN
      RAISE EXCEPTION 'P-1b M-a proof (c): a switched-off, reach or unknown key answered';
    END IF;
    UPDATE public.listing_packages SET enabled = true WHERE key = v_lv;

    -- (d) the season.
    v_a := public.level_perks_for(v_lv, v_sleaf, NULL);
    IF (v_a->>'days')::integer <> 10 OR (v_a->>'season_until')::timestamptz <> now() + interval '10 days' THEN
      RAISE EXCEPTION 'P-1b M-a proof (d): the season did not cap the days: %', v_a;
    END IF;
    IF (public.level_perks_for(v_lv, v_ended, NULL)->>'days')::integer <> 0 THEN
      RAISE EXCEPTION 'P-1b M-a proof (d): an ended season did not answer 0';
    END IF;
    DELETE FROM public.level_overrides WHERE level_key = v_lv;

    -- (e) the doors as the scratch super admin on aal2.
    PERFORM set_config('request.jwt.claims',
      json_build_object('sub', v_admin::text, 'role', 'authenticated', 'aal', 'aal2',
                        'session_id', v_session::text,
                        'amr', json_build_array(json_build_object('method', 'totp')))::text, true);
    DELETE FROM public.package_prices WHERE id = v_price;
    DELETE FROM public.listing_packages WHERE key IN (v_lv, v_rc);
    v_answer := public.admin_save_listing_package(v_lv, 'level', ' E2E level ', 60, true, true, true, 'e2e am', 5::smallint, 'boost', false, 99);
    IF v_answer IS DISTINCT FROM jsonb_build_object('ok', true, 'key', v_lv, 'created', true)
       OR NOT EXISTS (SELECT 1 FROM public.listing_packages
                       WHERE key = v_lv AND kind = 'level' AND name_en = 'E2E level' AND name_am = 'e2e am' AND days = 60
                         AND max_photos = 5 AND placement = 'boost' AND NOT badge AND sort = 99
                         AND created_by = v_admin AND updated_by = v_admin)
       OR NOT EXISTS (SELECT 1 FROM public.audit_log
                       WHERE action = 'package.saved' AND entity_type = 'listing_package' AND entity_id = v_lv
                         AND actor_id = v_admin AND meta->'old' = 'null'::jsonb AND meta->'new'->>'name_en' = 'E2E level') THEN
      RAISE EXCEPTION 'P-1b M-a proof (e): the created level or its audit row differ (%)', v_answer;
    END IF;
    -- (h) the window of 1 is full.
    v_msg := NULL;
    BEGIN
      PERFORM public.admin_save_listing_package(v_lv, 'level', 'E2E level', 61, true, true, true);
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    IF v_msg IS DISTINCT FROM 'rateLimited' OR (SELECT days FROM public.listing_packages WHERE key = v_lv) <> 60 THEN
      RAISE EXCEPTION 'P-1b M-a proof (h): answered % or wrote', coalesce(v_msg, 'success');
    END IF;
    UPDATE public.rate_overrides SET max_count = 1000 WHERE user_id = v_admin AND action = 'staff_config';
    -- edit: days 45, a NULL Amharic name and NULL perks keep the stored ones.
    v_answer := public.admin_save_listing_package(v_lv, 'level', 'E2E level', 45, false, true, true);
    IF v_answer IS DISTINCT FROM jsonb_build_object('ok', true, 'key', v_lv, 'created', false)
       OR NOT EXISTS (SELECT 1 FROM public.listing_packages
                       WHERE key = v_lv AND days = 45 AND NOT enabled AND name_am = 'e2e am' AND max_photos = 5 AND placement = 'boost')
       OR NOT EXISTS (SELECT 1 FROM public.audit_log
                       WHERE action = 'package.saved' AND entity_id = v_lv
                         AND meta->'old'->>'days' = '60' AND meta->'new'->>'days' = '45') THEN
      RAISE EXCEPTION 'P-1b M-a proof (e): the edited level or its audit row differ';
    END IF;
    PERFORM public.admin_save_listing_package(v_lv, 'level', 'E2E level', 60, true, true, true);
    v_answer := public.admin_save_listing_package(v_rc, 'reach', 'E2E reach', 30, true, true, false, NULL, NULL, NULL, NULL, 199);
    IF NOT EXISTS (SELECT 1 FROM public.listing_packages
                    WHERE key = v_rc AND kind = 'reach' AND max_photos IS NULL AND placement IS NULL AND NOT badge AND sort = 199) THEN
      RAISE EXCEPTION 'P-1b M-a proof (e): the reach row differs (%)', v_answer;
    END IF;
    -- an override saved, saved again on the same scope, read by the resolver, cleared.
    v_o1 := (public.admin_save_level_override(v_lv, v_root, v_code, 12)->>'id')::uuid;
    v_answer := public.admin_save_level_override(v_lv, v_root, v_code, 11, 3::smallint);
    v_o2 := (v_answer->>'id')::uuid;
    IF v_o2 <> v_o1 OR (v_answer->>'created')::boolean
       OR (SELECT count(*) FROM public.level_overrides WHERE level_key = v_lv) <> 1
       OR NOT EXISTS (SELECT 1 FROM public.level_overrides
                       WHERE id = v_o1 AND days = 11 AND max_photos = 3 AND placement IS NULL AND badge IS NULL
                         AND created_by = v_admin AND updated_by = v_admin)
       OR (SELECT count(*) FROM public.audit_log WHERE action = 'level_override.saved' AND entity_id = v_o1::text AND actor_id = v_admin) <> 2
       OR NOT EXISTS (SELECT 1 FROM public.audit_log
                       WHERE action = 'level_override.saved' AND entity_id = v_o1::text
                         AND meta->'old'->>'days' = '12' AND meta->'new'->>'days' = '11')
       OR (public.level_perks_for(v_lv, v_leaf2, v_code)->>'days')::integer <> 11 THEN
      RAISE EXCEPTION 'P-1b M-a proof (e): the override rows, their audit rows or the resolver differ';
    END IF;
    v_answer := public.admin_clear_level_override(v_o1);
    IF v_answer IS DISTINCT FROM jsonb_build_object('ok', true, 'id', v_o1)
       OR EXISTS (SELECT 1 FROM public.level_overrides WHERE id = v_o1)
       OR NOT EXISTS (SELECT 1 FROM public.audit_log
                       WHERE action = 'level_override.cleared' AND entity_id = v_o1::text AND meta->'old'->>'days' = '11') THEN
      RAISE EXCEPTION 'P-1b M-a proof (e): the cleared override or its audit row differ';
    END IF;
    v_o3 := (public.admin_save_level_override(v_lv, NULL, v_code, NULL, NULL, NULL, true)->>'id')::uuid;

    -- (e) each refusal with its own words; nothing written after them.
    FOR v_case IN VALUES ('bad key'), ('unknown kind'), ('kind change'), ('bad name'), ('bad days'), ('bad photos'), ('unknown placement'),
                         ('perks on reach'), ('unknown level'), ('not a main category'), ('unknown country'),
                         ('ov bad days'), ('ov bad photos'), ('ov unknown placement'), ('empty override'), ('not found') LOOP
      v_msg := NULL;
      BEGIN
        CASE v_case
          WHEN 'bad key' THEN PERFORM public.admin_save_listing_package('1_bad', 'level', 'x', 7, true, true, true, NULL, 1::smallint, 'top');
          WHEN 'unknown kind' THEN PERFORM public.admin_save_listing_package(v_lv, 'bundle', 'x', 7, true, true, true);
          WHEN 'kind change' THEN PERFORM public.admin_save_listing_package(v_lv, 'reach', 'x', 7, true, true, false);
          WHEN 'bad name' THEN PERFORM public.admin_save_listing_package(v_lv, 'level', '  ', 7, true, true, true);
          WHEN 'bad days' THEN PERFORM public.admin_save_listing_package(v_lv, 'level', 'x', 0, true, true, true);
          WHEN 'bad photos' THEN PERFORM public.admin_save_listing_package(v_lv, 'level', 'x', 7, true, true, true, NULL, 31::smallint);
          WHEN 'unknown placement' THEN PERFORM public.admin_save_listing_package(v_lv, 'level', 'x', 7, true, true, true, NULL, 1::smallint, 'side');
          WHEN 'perks on reach' THEN PERFORM public.admin_save_listing_package(v_rc, 'reach', 'x', 7, true, true, false, NULL, 1::smallint);
          WHEN 'unknown level' THEN PERFORM public.admin_save_level_override(v_rc, NULL, NULL, 5);
          WHEN 'not a main category' THEN PERFORM public.admin_save_level_override(v_lv, v_leaf, NULL, 5);
          -- 'XQ' is no market: a scratch code the countries table never holds (K4 exception, as 'XZ').
          WHEN 'unknown country' THEN PERFORM public.admin_save_level_override(v_lv, NULL, 'XQ', 5);
          WHEN 'ov bad days' THEN PERFORM public.admin_save_level_override(v_lv, v_root, NULL, 0);
          WHEN 'ov bad photos' THEN PERFORM public.admin_save_level_override(v_lv, v_root, NULL, NULL, 31::smallint);
          WHEN 'ov unknown placement' THEN PERFORM public.admin_save_level_override(v_lv, v_root, NULL, NULL, NULL, 'side');
          WHEN 'empty override' THEN PERFORM public.admin_save_level_override(v_lv, v_root, NULL);
          WHEN 'not found' THEN PERFORM public.admin_clear_level_override(gen_random_uuid());
        END CASE;
      EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
      END;
      IF v_msg IS DISTINCT FROM regexp_replace(v_case, '^ov ', '') THEN
        RAISE EXCEPTION 'P-1b M-a proof (e): % answered %', v_case, coalesce(v_msg, 'success');
      END IF;
    END LOOP;

    -- (f) a plain user; (g) the super admin on aal1.
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_plain::text, 'role', 'authenticated')::text, true);
    FOR v_case IN VALUES ('save'), ('override'), ('clear') LOOP
      v_msg := NULL;
      BEGIN
        CASE v_case
          WHEN 'save' THEN PERFORM public.admin_save_listing_package(v_lv, 'level', 'x', 7, true, true, true);
          WHEN 'override' THEN PERFORM public.admin_save_level_override(v_lv, v_root, NULL, 5);
          WHEN 'clear' THEN PERFORM public.admin_clear_level_override(v_o3);
        END CASE;
      EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
      END;
      IF v_msg IS DISTINCT FROM 'permission denied' THEN
        RAISE EXCEPTION 'P-1b M-a proof (f): % answered %', v_case, coalesce(v_msg, 'success');
      END IF;
    END LOOP;
    PERFORM set_config('request.jwt.claims',
      json_build_object('sub', v_admin::text, 'role', 'authenticated', 'aal', 'aal1', 'session_id', v_session::text)::text, true);
    FOR v_case IN VALUES ('save'), ('override'), ('clear') LOOP
      v_state := NULL;
      BEGIN
        CASE v_case
          WHEN 'save' THEN PERFORM public.admin_save_listing_package(v_lv, 'level', 'x', 7, true, true, true);
          WHEN 'override' THEN PERFORM public.admin_save_level_override(v_lv, v_root, NULL, 5);
          WHEN 'clear' THEN PERFORM public.admin_clear_level_override(v_o3);
        END CASE;
      EXCEPTION WHEN OTHERS THEN v_state := SQLSTATE; v_msg := SQLERRM;
      END;
      IF v_state IS DISTINCT FROM 'P0009' THEN
        RAISE EXCEPTION 'P-1b M-a proof (g): % answered % %', v_case, coalesce(v_state, 'success'), v_msg;
      END IF;
    END LOOP;
    PERFORM set_config('request.jwt.claims', '{}', true);
    -- Nothing refused wrote: one check per condition (INC-1033 d).
    SELECT count(*) INTO v_n FROM public.level_overrides WHERE level_key = v_lv;
    IF v_n <> 1 THEN RAISE EXCEPTION 'P-1b M-a proof (e-h): override rows % expected 1', v_n; END IF;
    SELECT days INTO v_n FROM public.listing_packages WHERE key = v_lv;
    IF v_n IS DISTINCT FROM 60 THEN RAISE EXCEPTION 'P-1b M-a proof (e-h): days % expected 60', v_n; END IF;
    IF (SELECT kind FROM public.listing_packages WHERE key = v_lv) IS DISTINCT FROM 'level' THEN
      RAISE EXCEPTION 'P-1b M-a proof (e-h): the scratch level''s kind changed';
    END IF;
    SELECT count(*) INTO v_n FROM public.audit_log WHERE action = 'package.saved' AND entity_id IN (v_lv, v_rc);
    IF v_n <> 4 THEN RAISE EXCEPTION 'P-1b M-a proof (e-h): package.saved rows % expected 4', v_n; END IF;
    SELECT count(*) INTO v_n FROM public.audit_log WHERE action LIKE 'level_override.%' AND entity_id IN (v_o1::text, v_o3::text);
    IF v_n <> 4 THEN RAISE EXCEPTION 'P-1b M-a proof (e-h): level_override rows % expected 4', v_n; END IF;

    -- (i) anon reads the override rows, never created_by.
    SET LOCAL ROLE anon;
    SELECT count(*) INTO v_n FROM public.level_overrides WHERE id = v_o3;
    IF v_n <> 1 THEN RESET ROLE; RAISE EXCEPTION 'P-1b M-a proof (i): anon does not see the override row'; END IF;
    v_state := NULL;
    BEGIN
      PERFORM o.created_by FROM public.level_overrides o WHERE false;
    EXCEPTION WHEN OTHERS THEN v_state := SQLSTATE;
    END;
    RESET ROLE;
    IF v_state IS DISTINCT FROM '42501' THEN RAISE EXCEPTION 'P-1b M-a proof (i): anon read created_by (%)', coalesce(v_state, 'no error'); END IF;

    RAISE EXCEPTION 'p1b-ma-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1b-ma-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261103160000') ON CONFLICT DO NOTHING;
