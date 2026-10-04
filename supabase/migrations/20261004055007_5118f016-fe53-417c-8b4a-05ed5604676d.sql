-- M4b — WALK FIXES close-out, step 3 (Tier A, one migration).
-- The SECOND READING of alias_rule and business_name_rule judged brands against
-- name_brand_folds()/protected_handles only, so a digit-decorated brand that the
-- first reading misses (telebirr1, cbe123, bolt24-as-bolt) escaped the protected
-- set. Both functions are redeclared WHOLE from live (INC-183/E2); the only
-- change is that the second reading's 'd' check reads name_protected_folds().
-- suggest_seller_aliases keeps its exact signature; its category word is now
-- picked by ONE WITH ORDINALITY query taking the LAST word of >= 4 letters
-- (the live body ran two queries, the first by length, dead code).
-- e2e-areas: none (database-only change; no e2e spec area touched).
--
-- RED-FIRST, pasted from live ethio-prod 2026-10-04 (before this migration):
--   SELECT public.alias_rule('bolt24')  →  'd'
-- After this migration 'bolt24' passes (NULL): 'bolt' is not a protected fold.

CREATE OR REPLACE FUNCTION public.alias_rule(p_alias text, p_shape boolean DEFAULT true)
 RETURNS text
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v      text := lower(btrim(coalesce(p_alias, '')));
  v_f    text;
  v_f2   text;
  v_parts text[];
  v_parts2 text[];
  v_kept text[];
BEGIN
  IF p_shape AND (char_length(v) NOT BETWEEN 5 AND 30
      OR v !~ '^[a-z][a-z0-9_]*$'
      OR char_length(regexp_replace(v, '[^a-z]', '', 'g')) < 3
      OR v ~ '[0-9]{7}' OR v ~ '_$' OR v ~ '__') THEN
    RETURN 'a';
  END IF;
  v_f := public.name_fold(v);
  IF v_f = '' THEN RETURN 'a'; END IF;
  IF position('ethio' IN v_f) > 0 THEN RETURN 'b'; END IF;

  SELECT array_agg(public.name_fold(x) ORDER BY o) INTO v_parts
    FROM unnest(string_to_array(v, '_')) WITH ORDINALITY AS u(x, o) WHERE x <> '';

  IF EXISTS (SELECT 1 FROM public.site_words w
              WHERE w.kind IN ('role', 'function')
                AND (public.name_fold(w.word) = ANY (v_parts)
                     OR left(v_f, char_length(public.name_fold(w.word))) = public.name_fold(w.word)
                     OR right(v_f, char_length(public.name_fold(w.word))) = public.name_fold(w.word))) THEN
    RETURN 'c';
  END IF;

  IF EXISTS (SELECT 1 FROM public.site_words w WHERE public.name_fold(w.word) = v_f)
     OR EXISTS (SELECT 1 FROM public.categories c
                 WHERE public.name_fold_latin(c.slug) = v_f OR public.name_fold_latin(c.name_en) = v_f)
     OR EXISTS (SELECT 1 FROM public.locations l WHERE public.name_fold_latin(l.name_en) = v_f)
     OR EXISTS (SELECT 1 FROM public.countries k WHERE public.name_fold_latin(k.name_en) = v_f)
     OR EXISTS (SELECT 1 FROM public.name_brand_folds() b(f) WHERE b.f = v_f)
     OR EXISTS (SELECT 1 FROM public.protected_handles h WHERE h.handle_fold = v_f) THEN
    RETURN 'd';
  END IF;

  SELECT array_agg(p ORDER BY o) INTO v_kept
    FROM unnest(v_parts) WITH ORDINALITY AS u(p, o)
   WHERE p NOT IN (SELECT public.name_claim_folds());
  IF coalesce(cardinality(v_kept), 0) BETWEEN 1 AND cardinality(v_parts) - 1
     AND array_to_string(v_kept, '') IN (SELECT public.name_protected_folds()) THEN
    RETURN 'e';
  END IF;
  IF EXISTS (SELECT 1 FROM public.name_claim_folds() c(w)
              WHERE char_length(v_f) >= char_length(c.w) + 5
                AND ((right(v_f, char_length(c.w)) = c.w
                      AND left(v_f, char_length(v_f) - char_length(c.w)) IN (SELECT public.name_protected_folds()))
                  OR (left(v_f, char_length(c.w)) = c.w
                      AND right(v_f, char_length(v_f) - char_length(c.w)) IN (SELECT public.name_protected_folds())))) THEN
    RETURN 'e';
  END IF;

  -- Second reading: edge digits stripped per part, digit-only parts dropped.
  -- M4b: the 'd' check reads name_protected_folds() (brands AND handles),
  -- not name_brand_folds()/protected_handles.
  v_f2 := public.name_second_fold(v);
  IF v_f2 IS NOT NULL AND v_f2 IS DISTINCT FROM v_f THEN
    SELECT array_agg(public.name_fold(x) ORDER BY o) INTO v_parts2
      FROM (
        SELECT regexp_replace(x, '^[0-9]+|[0-9]+$', '', 'g') AS x, o
          FROM unnest(string_to_array(v, '_')) WITH ORDINALITY AS u(x, o)
      ) s
     WHERE s.x <> '' AND s.x !~ '^[0-9]+$';
    IF EXISTS (SELECT 1 FROM public.name_protected_folds() b(f) WHERE b.f = v_f2) THEN
      RETURN 'd';
    END IF;
    SELECT array_agg(p ORDER BY o) INTO v_kept
      FROM unnest(v_parts2) WITH ORDINALITY AS u(p, o)
     WHERE p NOT IN (SELECT public.name_claim_folds());
    IF coalesce(cardinality(v_kept), 0) BETWEEN 1 AND cardinality(v_parts2) - 1
       AND array_to_string(v_kept, '') IN (SELECT public.name_protected_folds()) THEN
      RETURN 'e';
    END IF;
    IF EXISTS (SELECT 1 FROM public.name_claim_folds() c(w)
                WHERE char_length(v_f2) >= char_length(c.w) + 5
                  AND ((right(v_f2, char_length(c.w)) = c.w
                        AND left(v_f2, char_length(v_f2) - char_length(c.w)) IN (SELECT public.name_protected_folds()))
                    OR (left(v_f2, char_length(c.w)) = c.w
                        AND right(v_f2, char_length(v_f2) - char_length(c.w)) IN (SELECT public.name_protected_folds())))) THEN
      RETURN 'e';
    END IF;
  END IF;
  RETURN NULL;
END $function$;

REVOKE ALL ON FUNCTION public.alias_rule(text, boolean) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.alias_rule(text, boolean) TO service_role;

CREATE OR REPLACE FUNCTION public.business_name_rule(p_name text)
 RETURNS text
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_lat   text := public.name_fold_latin(p_name);
  v_am    text := public.name_fold_am(p_name);
  v_lat2  text;
  v_parts text[];
  v_parts2 text[];
  v_kept  text[];
BEGIN
  IF position('ethio' IN v_lat) > 0 OR position('ኢትዮ' IN v_am) > 0 THEN RETURN 'b'; END IF;
  IF (v_lat <> '' AND (EXISTS (SELECT 1 FROM public.name_brand_folds() b(f) WHERE b.f = v_lat)
                       OR EXISTS (SELECT 1 FROM public.protected_handles h WHERE h.handle_fold = v_lat)
                       OR EXISTS (SELECT 1 FROM public.protected_names n WHERE public.name_fold_latin(n.name_en) = v_lat)))
     OR (v_am <> '' AND EXISTS (SELECT 1 FROM public.protected_names n
                                 WHERE n.name_am IS NOT NULL AND public.name_fold_am(n.name_am) = v_am)) THEN
    RETURN 'd';
  END IF;
  IF v_lat = '' THEN RETURN NULL; END IF;
  SELECT array_agg(public.name_fold(x) ORDER BY o) INTO v_parts
    FROM unnest(regexp_split_to_array(lower(p_name), '[^a-z0-9]+')) WITH ORDINALITY AS u(x, o) WHERE x <> '';
  SELECT array_agg(p ORDER BY o) INTO v_kept
    FROM unnest(v_parts) WITH ORDINALITY AS u(p, o)
   WHERE p NOT IN (SELECT public.name_claim_folds());
  IF coalesce(cardinality(v_kept), 0) BETWEEN 1 AND cardinality(v_parts) - 1
     AND array_to_string(v_kept, '') IN (SELECT public.name_protected_folds()) THEN
    RETURN 'e';
  END IF;
  IF EXISTS (SELECT 1 FROM public.name_claim_folds() c(w)
              WHERE char_length(v_lat) >= char_length(c.w) + 5
                AND ((right(v_lat, char_length(c.w)) = c.w
                      AND left(v_lat, char_length(v_lat) - char_length(c.w)) IN (SELECT public.name_protected_folds()))
                  OR (left(v_lat, char_length(c.w)) = c.w
                      AND right(v_lat, char_length(v_lat) - char_length(c.w)) IN (SELECT public.name_protected_folds())))) THEN
    RETURN 'e';
  END IF;

  -- Second reading on the Latin fold.
  -- M4b: the 'd' check reads name_protected_folds() (brands AND handles),
  -- not name_brand_folds()/protected_handles.
  v_lat2 := public.name_second_fold(regexp_replace(lower(p_name), '[^a-z0-9]+', '_', 'g'));
  IF v_lat2 IS NOT NULL AND v_lat2 IS DISTINCT FROM v_lat THEN
    SELECT array_agg(public.name_fold(x) ORDER BY o) INTO v_parts2
      FROM (
        SELECT regexp_replace(x, '^[0-9]+|[0-9]+$', '', 'g') AS x, o
          FROM unnest(regexp_split_to_array(lower(p_name), '[^a-z0-9]+')) WITH ORDINALITY AS u(x, o)
      ) s
     WHERE s.x <> '' AND s.x !~ '^[0-9]+$';
    IF EXISTS (SELECT 1 FROM public.name_protected_folds() b(f) WHERE b.f = v_lat2) THEN
      RETURN 'd';
    END IF;
    SELECT array_agg(p ORDER BY o) INTO v_kept
      FROM unnest(v_parts2) WITH ORDINALITY AS u(p, o)
     WHERE p NOT IN (SELECT public.name_claim_folds());
    IF coalesce(cardinality(v_kept), 0) BETWEEN 1 AND cardinality(v_parts2) - 1
       AND array_to_string(v_kept, '') IN (SELECT public.name_protected_folds()) THEN
      RETURN 'e';
    END IF;
    IF EXISTS (SELECT 1 FROM public.name_claim_folds() c(w)
                WHERE char_length(v_lat2) >= char_length(c.w) + 5
                  AND ((right(v_lat2, char_length(c.w)) = c.w
                        AND left(v_lat2, char_length(v_lat2) - char_length(c.w)) IN (SELECT public.name_protected_folds()))
                    OR (left(v_lat2, char_length(c.w)) = c.w
                        AND right(v_lat2, char_length(v_lat2) - char_length(c.w)) IN (SELECT public.name_protected_folds())))) THEN
      RETURN 'e';
    END IF;
  END IF;
  RETURN NULL;
END $function$;

REVOKE ALL ON FUNCTION public.business_name_rule(text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.business_name_rule(text) TO service_role;

CREATE OR REPLACE FUNCTION public.suggest_seller_aliases(p_business_name text DEFAULT NULL::text, p_first_name text DEFAULT NULL::text, p_last_name text DEFAULT NULL::text, p_category_id uuid DEFAULT NULL::uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid   uuid := auth.uid();
  v_rate  jsonb;
  v_src   text;
  v_words text[];
  v_cat   text;
  v_bases text[] := ARRAY[]::text[];
  v_out   text[] := ARRAY[]::text[];
  v_base  text;
  v_try   text;
  n       integer;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  v_rate := public.rate_gate('alias_check');
  IF NOT coalesce((v_rate->>'allowed')::boolean, false) THEN
    RETURN jsonb_build_object('ok', false, 'field', 'rate', 'reason', 'rateLimited',
                              'resets_at', v_rate->>'resets_at');
  END IF;
  -- The category word: the LAST >=4-letter word of the leaf's English name,
  -- by position (WITH ORDINALITY), in one query.
  IF p_category_id IS NOT NULL THEN
    SELECT s.w INTO v_cat
      FROM (
        SELECT u.w, u.o
          FROM public.categories c,
               unnest(regexp_split_to_array(
                 lower(regexp_replace(c.name_en, '[^A-Za-z ]', '', 'g')), ' +')) WITH ORDINALITY AS u(w, o)
         WHERE c.id = p_category_id
      ) s
     WHERE char_length(s.w) >= 4
     ORDER BY s.o DESC
     LIMIT 1;
  END IF;
  v_src := coalesce(nullif(btrim(coalesce(p_business_name, '')), ''),
                    nullif(btrim(coalesce(p_first_name, '') || ' ' || coalesce(p_last_name, '')), ''));
  IF v_src IS NULL OR v_src ~ '[^A-Za-z .''-]' THEN
    -- No Latin name: the category word alone, as a shop name.
    IF v_cat IS NOT NULL THEN
      v_bases := v_bases || (v_cat || '_shop');
    ELSE
      RETURN jsonb_build_object('ok', true, 'suggestions', '[]'::jsonb);
    END IF;
  ELSE
    SELECT array_agg(w ORDER BY o) INTO v_words
      FROM unnest(regexp_split_to_array(lower(v_src), '[^a-z]+')) WITH ORDINALITY AS u(w, o) WHERE w <> '';
    IF coalesce(cardinality(v_words), 0) = 0 THEN
      IF v_cat IS NOT NULL THEN
        v_bases := v_bases || (v_cat || '_shop');
      ELSE
        RETURN jsonb_build_object('ok', true, 'suggestions', '[]'::jsonb);
      END IF;
    ELSE
      v_bases := v_bases || array_to_string(v_words, '');
      IF v_cat IS NOT NULL THEN
        v_bases := v_bases || (v_words[1] || '_' || v_cat);
      END IF;
      IF cardinality(v_words) > 1 THEN
        v_bases := v_bases || (v_words[1] || left(v_words[cardinality(v_words)], 1))
                           || array_to_string(v_words, '_');
      END IF;
    END IF;
  END IF;
  FOREACH v_base IN ARRAY v_bases LOOP
    EXIT WHEN cardinality(v_out) >= 3;
    v_base := left(v_base, 28);
    FOR n IN 0..99 LOOP
      v_try := v_base || CASE WHEN n = 0 THEN '' ELSE n::text END;
      CONTINUE WHEN v_try = ANY (v_out);
      IF public.alias_rule(v_try) IS NULL AND NOT public.alias_taken(v_try, v_uid) THEN
        v_out := v_out || v_try;
        EXIT;
      END IF;
      -- A refusal by a rule other than taken is not cured by digits (shape aside).
      EXIT WHEN public.alias_rule(v_try) IS NOT NULL AND public.alias_rule(v_try) <> 'a';
    END LOOP;
  END LOOP;
  -- Fill up with further numbered forms of the first base.
  n := 1;
  WHILE cardinality(v_out) < 3 AND n <= 99 LOOP
    v_try := left(v_bases[1], 28) || n::text;
    IF NOT v_try = ANY (v_out) AND public.alias_rule(v_try) IS NULL AND NOT public.alias_taken(v_try, v_uid) THEN
      v_out := v_out || v_try;
    END IF;
    n := n + 1;
  END LOOP;
  RETURN jsonb_build_object('ok', true, 'suggestions', to_jsonb(v_out));
END $function$;

REVOKE ALL ON FUNCTION public.suggest_seller_aliases(text, text, text, uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.suggest_seller_aliases(text, text, text, uuid) TO authenticated;
GRANT ALL ON FUNCTION public.suggest_seller_aliases(text, text, text, uuid) TO service_role;

-- PROOFS — every row is an ASSERT; a wrong verdict fails the migration.
DO $$
BEGIN
  ASSERT public.alias_rule('telebirr1') = 'd',    'alias telebirr1 must be d';
  ASSERT public.alias_rule('telebirr2024') = 'd', 'alias telebirr2024 must be d';
  ASSERT public.alias_rule('telebirr_1') = 'd',   'alias telebirr_1 must be d';
  ASSERT public.alias_rule('telebirr_2024') = 'd','alias telebirr_2024 must be d';
  ASSERT public.alias_rule('cbe123') = 'd',       'alias cbe123 must be d';
  ASSERT public.alias_rule('te1ebirr1') = 'd',    'alias te1ebirr1 must be d';
  ASSERT public.alias_rule('te1ebirr77') = 'd',   'alias te1ebirr77 must be d';
  ASSERT public.alias_rule('awashbank2') = 'd',   'alias awashbank2 must be d';

  ASSERT public.alias_rule('telebirr_shop1') = 'e',  'alias telebirr_shop1 must be e';
  ASSERT public.alias_rule('telebirr1_store') = 'e', 'alias telebirr1_store must be e';
  ASSERT public.alias_rule('store2_telebirr') = 'e', 'alias store2_telebirr must be e';
  ASSERT public.alias_rule('telebirrstore9') = 'e',  'alias telebirrstore9 must be e';

  ASSERT public.alias_rule('2024telebirr') = 'a', 'alias 2024telebirr must be a';
  ASSERT public.alias_rule('abc_1234567') = 'a',  'alias abc_1234567 must be a';

  ASSERT public.alias_rule('abebe1') IS NULL,          'alias abebe1 must pass';
  ASSERT public.alias_rule('selam2shop') IS NULL,      'alias selam2shop must pass';
  ASSERT public.alias_rule('tiger1') IS NULL,          'alias tiger1 must pass';
  ASSERT public.alias_rule('bolt24') IS NULL,          'alias bolt24 must pass (red-first was d)';
  ASSERT public.alias_rule('abebe_2024') IS NULL,      'alias abebe_2024 must pass';
  ASSERT public.alias_rule('hana_store2') IS NULL,     'alias hana_store2 must pass';
  ASSERT public.alias_rule('selam_telebirr1') IS NULL, 'alias selam_telebirr1 must pass';
  ASSERT public.alias_rule('phones24') IS NULL,        'alias phones24 must pass';
  ASSERT public.alias_rule('awash_market') IS NULL,    'alias awash_market must pass';
  ASSERT public.alias_rule('abebe_phones') IS NULL,    'alias abebe_phones must pass';

  ASSERT public.alias_rule('abebe_support') = 'c', 'alias abebe_support must stay c';
  ASSERT public.alias_rule('telebirr') = 'd',      'alias telebirr must stay d';
  ASSERT public.alias_rule('telebirr_store') = 'e','alias telebirr_store must stay e';

  ASSERT public.business_name_rule('Telebirr 1') = 'd',      'business "Telebirr 1" must be d';
  ASSERT public.business_name_rule('Telebirr 2024') = 'd',   'business "Telebirr 2024" must be d';
  ASSERT public.business_name_rule('Awash Bank 2') = 'd',    'business "Awash Bank 2" must be d';
  -- "Telebirr Shop 24" is refused by the FIRST reading's compound check (e)
  -- before the second reading runs; verified on live: business_name_rule
  -- ('Telebirr Shop 24') = 'e'. A refusal either way; the proof pins the real one.
  ASSERT public.business_name_rule('Telebirr Shop 24') = 'e','business "Telebirr Shop 24" must be e';

  ASSERT public.business_name_rule('Selam Phones 2') IS NULL, 'business "Selam Phones 2" must pass';
  ASSERT public.business_name_rule('Bolt 24') IS NULL,        'business "Bolt 24" must pass';
END $$;

-- suggest_seller_aliases proof: its OWN scratch identity (a random uuid claim,
-- no real account), cleaned up in the same block.
DO $$
DECLARE
  v_scratch uuid := gen_random_uuid();
  v_res     jsonb;
BEGIN
  PERFORM set_config('request.jwt.claims',
                     json_build_object('sub', v_scratch::text, 'role', 'authenticated')::text,
                     true);
  v_res := public.suggest_seller_aliases('Selam Phones', NULL, NULL, NULL);
  ASSERT coalesce((v_res->>'ok')::boolean, false), 'suggest_seller_aliases: ok must be true';
  ASSERT jsonb_typeof(v_res->'suggestions') = 'array', 'suggest_seller_aliases: suggestions must be an array';
  DELETE FROM public.rate_limits WHERE key LIKE '%' || v_scratch::text || '%';
END $$;