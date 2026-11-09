-- e2e-areas: admin-monetisation
-- P-2 turn (c) M-3c-b, part 2 of 5 — THE PRODUCT DOOR'S CAPS (docs/governance/briefs/p2-fold-c2b-ruling-1.md §3 Q2,
-- §4 (ii); DEC-356). It follows part 1 (bddc8991, mark 20261109070000).
-- public.admin_save_listing_package gains ONE trailing parameter, p_caps jsonb DEFAULT NULL: DROP + CREATE (the
-- argument list grows), its REVOKE and GRANTs restated. The body is its last declaration's (20261103040805 :200,
-- md5 11d4e1b1b79202d395134f2cb6cfed40) byte for byte apart from the caps block, its two refusals and the three columns in the upsert:
-- a NULL p_caps keeps the stored caps (an old client, the e2e helpers — nothing is cleared by omission); for a
-- reach product p_caps is an object with exactly max_cities, max_regions and max_countries, each a JSON null (no
-- limit) or a whole number of at least 1, else `bad caps`, and the three columns are set exactly to it; a NEW
-- reach row requires it (`bad caps`); a level with p_caps is refused `caps on level` (the mirror of `perks on
-- reach`). The by-kind CHECK stays the table's law. The audit is unchanged (to_jsonb carries the columns). New md5
-- 61aa36df2245ba685201bb0dc33e28ca. Proofs at the end on scratch rows (e2e_mig_ keys, a scratch super admin on aal2), rolled back by the
-- sentinel.

DO $pre$
DECLARE
  v_md5 text;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261109070000') THEN
    RAISE EXCEPTION 'P-2 (c) M-3c-b part 2: part 1 (bddc8991, mark 20261109070000) must be applied first';
  END IF;
  -- G39: the body this file redeclares is, live, the body of its last declaration.
  SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p
   WHERE p.oid = 'public.admin_save_listing_package(text,text,text,integer,boolean,boolean,boolean,text,smallint,text,boolean,integer)'::regprocedure;
  IF v_md5 IS DISTINCT FROM '11d4e1b1b79202d395134f2cb6cfed40' THEN
    RAISE EXCEPTION 'P-2 (c) M-3c-b part 2: live admin_save_listing_package is not 20261103040805''s body (%)', v_md5;
  END IF;
END $pre$;

-- ------------------------------------------------------------ 1. THE DOOR
DROP FUNCTION public.admin_save_listing_package(text, text, text, integer, boolean, boolean, boolean, text, smallint, text, boolean, integer);

CREATE FUNCTION public.admin_save_listing_package(p_key text, p_kind text, p_name_en text, p_days integer, p_enabled boolean, p_self_serve boolean, p_extends_lifetime boolean, p_name_am text DEFAULT NULL::text, p_max_photos smallint DEFAULT NULL::smallint, p_placement text DEFAULT NULL::text, p_badge boolean DEFAULT NULL::boolean, p_sort integer DEFAULT NULL::integer, p_caps jsonb DEFAULT NULL::jsonb)
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
  v_cities    integer;
  v_regions   integer;
  v_countries integer;
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
    -- P-2 (c) M-3c-b (DEC-356): a level has no place caps.
    IF p_caps IS NOT NULL THEN
      RAISE EXCEPTION 'caps on level';
    END IF;
    v_cities := NULL;
    v_regions := NULL;
    v_countries := NULL;
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
    -- P-2 (c) M-3c-b (DEC-356): a reach row's caps — a NULL p_caps keeps the stored ones, and a new row
    -- must state them; given, an object of exactly the three keys, each a JSON null (no limit) or a whole
    -- number of at least 1, set exactly.
    IF p_caps IS NULL THEN
      IF v_old.key IS NULL THEN
        RAISE EXCEPTION 'bad caps';
      END IF;
      v_cities := v_old.max_cities;
      v_regions := v_old.max_regions;
      v_countries := v_old.max_countries;
    ELSE
      IF jsonb_typeof(p_caps) IS DISTINCT FROM 'object' THEN
        RAISE EXCEPTION 'bad caps';
      END IF;
      IF (SELECT array_agg(k ORDER BY k) FROM jsonb_object_keys(p_caps) k)
           IS DISTINCT FROM ARRAY['max_cities', 'max_countries', 'max_regions']
         OR EXISTS (SELECT 1 FROM jsonb_each(p_caps) e
                     WHERE jsonb_typeof(e.value) <> 'null'
                       AND (jsonb_typeof(e.value) <> 'number' OR e.value::text !~ '^[1-9][0-9]{0,8}$')) THEN
        RAISE EXCEPTION 'bad caps';
      END IF;
      v_cities := (p_caps->>'max_cities')::integer;
      v_regions := (p_caps->>'max_regions')::integer;
      v_countries := (p_caps->>'max_countries')::integer;
    END IF;
  END IF;

  INSERT INTO public.listing_packages
    (key, kind, name_en, name_am, days, max_photos, placement, badge, enabled, self_serve, extends_lifetime, sort, created_by, updated_by, updated_at,
     max_cities, max_regions, max_countries)
  VALUES (p_key, p_kind, btrim(p_name_en), v_am, p_days, v_photos, v_place, v_badge,
          coalesce(p_enabled, true), coalesce(p_self_serve, false), coalesce(p_extends_lifetime, true),
          coalesce(p_sort, v_old.sort, 0), v_uid, v_uid, now(),
          v_cities, v_regions, v_countries)
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
        max_cities = EXCLUDED.max_cities,
        max_regions = EXCLUDED.max_regions,
        max_countries = EXCLUDED.max_countries,
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
REVOKE ALL ON FUNCTION public.admin_save_listing_package(text, text, text, integer, boolean, boolean, boolean, text, smallint, text, boolean, integer, jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_save_listing_package(text, text, text, integer, boolean, boolean, boolean, text, smallint, text, boolean, integer, jsonb) TO authenticated, service_role;

-- ------------------------------------------------------------ 2. PROOFS
-- Scratch rows only, rolled back by the sentinel; the one real row read is the super_admin role's id.
--   (a) the header and grants; the old signature is gone; p_caps is the one new, trailing, defaulted argument;
--   (b) the body, with its fragments taken back, is 20261103040805's (md5);
--   (c) as a scratch super admin on aal2: a reach row born with caps (cities no limit, regions 3, countries 1);
--       saved again with p_caps NULL keeps them; saved with (2, no limit, no limit) sets exactly those; the
--       audit's new row carries the caps; a level saves without p_caps and has none;
--   (d) each refusal with its own words — cities 0, a missing key, an extra key, a string, a fraction, an
--       array, a JSON null, a level with p_caps, a new reach row without p_caps — and nothing written after them.
DO $proof$
DECLARE
  v_save    regprocedure := 'public.admin_save_listing_package(text,text,text,integer,boolean,boolean,boolean,text,smallint,text,boolean,integer,jsonb)'::regprocedure;
  v_admin   uuid := gen_random_uuid();
  v_session uuid := gen_random_uuid();
  v_tag     text := 'e2e-mig-p2c-m3cb2-' || substr(gen_random_uuid()::text, 1, 8);
  v_stem    text := translate(substr(gen_random_uuid()::text, 1, 8), '0123456789-', 'abcdefghijk');
  v_rc      text := 'e2e_mig_rc_' || v_stem;
  v_rn      text := 'e2e_mig_rn_' || v_stem;
  v_lv      text := 'e2e_mig_lv_' || v_stem;
  v_answer  jsonb;
  v_case    text;
  v_caps    jsonb;
  v_n       integer;
  v_src     text;
  v_pair    text[];
  v_pairs   text[][];
  v_md5     text;
  v_msg     text;
BEGIN
  -- (a)
  IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' OR pronargs <> 13
             OR pronargdefaults <> 6 FROM pg_proc WHERE oid = v_save)
     OR (SELECT proargnames[13] FROM pg_proc WHERE oid = v_save) IS DISTINCT FROM 'p_caps'
     OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_save)) a WHERE a.grantee = 0)
     OR has_function_privilege('anon', v_save, 'EXECUTE')
     OR NOT has_function_privilege('authenticated', v_save, 'EXECUTE')
     OR NOT has_function_privilege('service_role', v_save, 'EXECUTE') THEN
    RAISE EXCEPTION 'P-2 (c) M-3c-b part 2 proof (a): admin_save_listing_package''s header or grants differ';
  END IF;
  IF to_regprocedure('public.admin_save_listing_package(text,text,text,integer,boolean,boolean,boolean,text,smallint,text,boolean,integer)') IS NOT NULL THEN
    RAISE EXCEPTION 'P-2 (c) M-3c-b part 2 proof (a): the old signature is still declared';
  END IF;

  -- (b) Both sides without chr(13) (INC-1056, law 13): prosrc, and each literal.
  SELECT replace(p.prosrc, chr(13), '') INTO v_src FROM pg_proc p WHERE p.oid = v_save;
  IF md5(v_src) IS DISTINCT FROM '61aa36df2245ba685201bb0dc33e28ca' THEN
    RAISE EXCEPTION 'P-2 (c) M-3c-b part 2 proof (b): the live body is not this file''s (%)', md5(v_src);
  END IF;
  v_pairs := ARRAY[
    ['  v_am     text;
  v_cities    integer;
  v_regions   integer;
  v_countries integer;
',
     '  v_am     text;
'],
    ['  IF p_kind = ''level'' THEN
    -- P-2 (c) M-3c-b (DEC-356): a level has no place caps.
    IF p_caps IS NOT NULL THEN
      RAISE EXCEPTION ''caps on level'';
    END IF;
    v_cities := NULL;
    v_regions := NULL;
    v_countries := NULL;
    -- A level''s perks:',
     '  IF p_kind = ''level'' THEN
    -- A level''s perks:'],
    ['    v_photos := NULL;
    v_place := NULL;
    v_badge := false;
    -- P-2 (c) M-3c-b (DEC-356): a reach row''s caps — a NULL p_caps keeps the stored ones, and a new row
    -- must state them; given, an object of exactly the three keys, each a JSON null (no limit) or a whole
    -- number of at least 1, set exactly.
    IF p_caps IS NULL THEN
      IF v_old.key IS NULL THEN
        RAISE EXCEPTION ''bad caps'';
      END IF;
      v_cities := v_old.max_cities;
      v_regions := v_old.max_regions;
      v_countries := v_old.max_countries;
    ELSE
      IF jsonb_typeof(p_caps) IS DISTINCT FROM ''object'' THEN
        RAISE EXCEPTION ''bad caps'';
      END IF;
      IF (SELECT array_agg(k ORDER BY k) FROM jsonb_object_keys(p_caps) k)
           IS DISTINCT FROM ARRAY[''max_cities'', ''max_countries'', ''max_regions'']
         OR EXISTS (SELECT 1 FROM jsonb_each(p_caps) e
                     WHERE jsonb_typeof(e.value) <> ''null''
                       AND (jsonb_typeof(e.value) <> ''number'' OR e.value::text !~ ''^[1-9][0-9]{0,8}$'')) THEN
        RAISE EXCEPTION ''bad caps'';
      END IF;
      v_cities := (p_caps->>''max_cities'')::integer;
      v_regions := (p_caps->>''max_regions'')::integer;
      v_countries := (p_caps->>''max_countries'')::integer;
    END IF;
  END IF;
',
     '    v_photos := NULL;
    v_place := NULL;
    v_badge := false;
  END IF;
'],
    ['    (key, kind, name_en, name_am, days, max_photos, placement, badge, enabled, self_serve, extends_lifetime, sort, created_by, updated_by, updated_at,
     max_cities, max_regions, max_countries)
',
     '    (key, kind, name_en, name_am, days, max_photos, placement, badge, enabled, self_serve, extends_lifetime, sort, created_by, updated_by, updated_at)
'],
    ['          coalesce(p_sort, v_old.sort, 0), v_uid, v_uid, now(),
          v_cities, v_regions, v_countries)
',
     '          coalesce(p_sort, v_old.sort, 0), v_uid, v_uid, now())
'],
    ['        sort = EXCLUDED.sort,
        max_cities = EXCLUDED.max_cities,
        max_regions = EXCLUDED.max_regions,
        max_countries = EXCLUDED.max_countries,
',
     '        sort = EXCLUDED.sort,
']];
  FOREACH v_pair SLICE 1 IN ARRAY v_pairs LOOP
    v_n := (length(v_src) - length(replace(v_src, replace(v_pair[1], chr(13), ''), ''))) / length(replace(v_pair[1], chr(13), ''));
    IF v_n <> 1 THEN
      RAISE EXCEPTION 'P-2 (c) M-3c-b part 2 proof (b): an admin_save_listing_package fragment occurs % times', v_n;
    END IF;
    v_src := replace(v_src, replace(v_pair[1], chr(13), ''), replace(v_pair[2], chr(13), ''));
  END LOOP;
  v_md5 := md5(v_src);
  IF v_md5 IS DISTINCT FROM '11d4e1b1b79202d395134f2cb6cfed40' THEN
    RAISE EXCEPTION 'P-2 (c) M-3c-b part 2 proof (b): admin_save_listing_package differs from its last declaration beyond this file''s fragments (%)', v_md5;
  END IF;

  BEGIN
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at)
    VALUES (v_admin, v_tag || '-admin@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO public.user_roles (user_id, role_id, scope_type)
    SELECT v_admin, r.id, 'global' FROM public.roles r WHERE r.name = 'super_admin';
    INSERT INTO auth.sessions (id, user_id, created_at, updated_at, aal)
    VALUES (v_session, v_admin, now(), now(), 'aal2');
    INSERT INTO auth.mfa_factors (id, user_id, friendly_name, factor_type, status, created_at, updated_at, secret)
    VALUES (gen_random_uuid(), v_admin, v_tag, 'totp', 'verified', now(), now(), 'PROOFSECRET');
    INSERT INTO auth.mfa_amr_claims (id, session_id, created_at, updated_at, authentication_method)
    VALUES (gen_random_uuid(), v_session, now(), now(), 'totp');
    INSERT INTO public.rate_overrides (user_id, action, max_count) VALUES (v_admin, 'staff_config', 1000);
    PERFORM set_config('request.jwt.claims',
      json_build_object('sub', v_admin::text, 'role', 'authenticated', 'aal', 'aal2',
                        'session_id', v_session::text,
                        'amr', json_build_array(json_build_object('method', 'totp')))::text, true);

    -- (c)
    v_answer := public.admin_save_listing_package(v_rc, 'reach', 'E2E reach', 30, true, true, false,
                  p_caps => '{"max_cities": null, "max_regions": 3, "max_countries": 1}'::jsonb);
    IF v_answer IS DISTINCT FROM jsonb_build_object('ok', true, 'key', v_rc, 'created', true)
       OR NOT EXISTS (SELECT 1 FROM public.listing_packages
                       WHERE key = v_rc AND kind = 'reach' AND max_cities IS NULL AND max_regions = 3 AND max_countries = 1)
       OR NOT EXISTS (SELECT 1 FROM public.audit_log
                       WHERE action = 'package.saved' AND entity_id = v_rc AND actor_id = v_admin
                         AND meta->'old' = 'null'::jsonb AND meta->'new'->'max_cities' = 'null'::jsonb
                         AND meta->'new'->>'max_regions' = '3' AND meta->'new'->>'max_countries' = '1') THEN
      RAISE EXCEPTION 'P-2 (c) M-3c-b part 2 proof (c): the reach row born with caps, or its audit row, differ (%)', v_answer;
    END IF;
    PERFORM public.admin_save_listing_package(v_rc, 'reach', 'E2E reach', 40, true, true, false);
    IF NOT EXISTS (SELECT 1 FROM public.listing_packages
                    WHERE key = v_rc AND days = 40 AND max_cities IS NULL AND max_regions = 3 AND max_countries = 1) THEN
      RAISE EXCEPTION 'P-2 (c) M-3c-b part 2 proof (c): a NULL p_caps did not keep the stored caps';
    END IF;
    PERFORM public.admin_save_listing_package(v_rc, 'reach', 'E2E reach', 40, true, true, false,
              p_caps => '{"max_cities": 2, "max_regions": null, "max_countries": null}'::jsonb);
    IF NOT EXISTS (SELECT 1 FROM public.listing_packages
                    WHERE key = v_rc AND max_cities = 2 AND max_regions IS NULL AND max_countries IS NULL) THEN
      RAISE EXCEPTION 'P-2 (c) M-3c-b part 2 proof (c): the given caps were not set exactly';
    END IF;
    PERFORM public.admin_save_listing_package(v_lv, 'level', 'E2E level', 30, true, true, true, NULL, 5::smallint, 'standard');
    IF NOT EXISTS (SELECT 1 FROM public.listing_packages
                    WHERE key = v_lv AND kind = 'level' AND max_cities IS NULL AND max_regions IS NULL AND max_countries IS NULL) THEN
      RAISE EXCEPTION 'P-2 (c) M-3c-b part 2 proof (c): a level saved without p_caps differs';
    END IF;

    -- (d)
    FOR v_case, v_caps IN VALUES
        ('bad caps', '{"max_cities": 0, "max_regions": null, "max_countries": null}'::jsonb),
        ('bad caps', '{"max_cities": 1, "max_regions": 1}'::jsonb),
        ('bad caps', '{"max_cities": 1, "max_regions": 1, "max_countries": 1, "max_photos": 1}'::jsonb),
        ('bad caps', '{"max_cities": "3", "max_regions": null, "max_countries": null}'::jsonb),
        ('bad caps', '{"max_cities": 1.5, "max_regions": null, "max_countries": null}'::jsonb),
        ('bad caps', '[1, 1, 1]'::jsonb),
        ('bad caps', 'null'::jsonb),
        ('caps on level', '{"max_cities": 1, "max_regions": 1, "max_countries": 1}'::jsonb),
        ('bad caps', NULL::jsonb) LOOP
      v_msg := NULL;
      BEGIN
        IF v_case = 'caps on level' THEN
          PERFORM public.admin_save_listing_package(v_lv, 'level', 'E2E level', 7, true, true, true, p_caps => v_caps);
        ELSIF v_caps IS NULL THEN
          PERFORM public.admin_save_listing_package(v_rn, 'reach', 'E2E reach new', 7, true, true, false);
        ELSE
          PERFORM public.admin_save_listing_package(v_rc, 'reach', 'E2E reach', 7, true, true, false, p_caps => v_caps);
        END IF;
      EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
      END;
      IF v_msg IS DISTINCT FROM v_case THEN
        RAISE EXCEPTION 'P-2 (c) M-3c-b part 2 proof (d): % answered %', coalesce(v_caps::text, 'a new reach row without caps'),
          coalesce(v_msg, 'success');
      END IF;
    END LOOP;
    -- Nothing refused wrote: one check per condition (INC-1033 d).
    SELECT days INTO v_n FROM public.listing_packages WHERE key = v_rc;
    IF v_n IS DISTINCT FROM 40 THEN RAISE EXCEPTION 'P-2 (c) M-3c-b part 2 proof (d): reach days % expected 40', v_n; END IF;
    IF NOT EXISTS (SELECT 1 FROM public.listing_packages
                    WHERE key = v_rc AND max_cities = 2 AND max_regions IS NULL AND max_countries IS NULL) THEN
      RAISE EXCEPTION 'P-2 (c) M-3c-b part 2 proof (d): a refused save changed the caps';
    END IF;
    SELECT days INTO v_n FROM public.listing_packages WHERE key = v_lv;
    IF v_n IS DISTINCT FROM 30 THEN RAISE EXCEPTION 'P-2 (c) M-3c-b part 2 proof (d): level days % expected 30', v_n; END IF;
    IF EXISTS (SELECT 1 FROM public.listing_packages WHERE key = v_rn) THEN
      RAISE EXCEPTION 'P-2 (c) M-3c-b part 2 proof (d): a new reach row was born without caps';
    END IF;
    SELECT count(*) INTO v_n FROM public.audit_log WHERE action = 'package.saved' AND entity_id IN (v_rc, v_rn, v_lv);
    IF v_n <> 4 THEN RAISE EXCEPTION 'P-2 (c) M-3c-b part 2 proof (d): package.saved rows % expected 4', v_n; END IF;

    RAISE EXCEPTION 'p2c-m3cb2-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2c-m3cb2-proof-ok' THEN RAISE; END IF;
  END;
  IF EXISTS (SELECT 1 FROM auth.users WHERE id = v_admin AND email LIKE 'e2e-mig-%')
     OR EXISTS (SELECT 1 FROM public.listing_packages WHERE key IN (v_rc, v_rn, v_lv)) THEN
    RAISE EXCEPTION 'P-2 (c) M-3c-b part 2 proof: the scratch rows outlived the sentinel';
  END IF;
END;
$proof$;

-- ------------------------------------------------------------ 3. CLOSERS
REVOKE ALL ON FUNCTION public.admin_save_listing_package(text, text, text, integer, boolean, boolean, boolean, text, smallint, text, boolean, integer, jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_save_listing_package(text, text, text, integer, boolean, boolean, boolean, text, smallint, text, boolean, integer, jsonb) TO authenticated, service_role;

INSERT INTO public.migration_marks (version) VALUES ('20261109070100') ON CONFLICT DO NOTHING;
