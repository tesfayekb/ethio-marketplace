-- e2e-areas: posting
-- M4 (bundle 3 walk fixes, 2026-10-03). Second reading for the name judges,
-- category-aware suggestions, seller-line change dates, change_home_country.
-- Declared mark: 20261004040000.

-- ── 1. user_directory gains the 30-day change stamp ────────────────────
ALTER TABLE public.user_directory
  ADD COLUMN IF NOT EXISTS home_country_changed_at timestamptz;

-- ── 2. The second reading: parts with leading/trailing digits removed ──
-- Digit-only parts drop out; the remainder is folded. NULL when the second
-- reading is identical to the first (nothing more to judge).
CREATE OR REPLACE FUNCTION public.name_second_fold(p_value text)
 RETURNS text LANGUAGE sql IMMUTABLE SET search_path TO 'public'
AS $$
  SELECT NULLIF(array_to_string(array_agg(public.name_fold(x) ORDER BY o), ''), '')
    FROM (
      SELECT regexp_replace(x, '^[0-9]+|[0-9]+$', '', 'g') AS x, o
        FROM unnest(string_to_array(lower(btrim(coalesce(p_value, ''))), '_')) WITH ORDINALITY AS u(x, o)
    ) s
   WHERE s.x <> '' AND s.x !~ '^[0-9]+$'
$$;
REVOKE ALL ON FUNCTION public.name_second_fold(text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.name_second_fold(text) FROM anon;
REVOKE ALL ON FUNCTION public.name_second_fold(text) FROM authenticated;
GRANT ALL ON FUNCTION public.name_second_fold(text) TO service_role;

-- ── 3. alias_rule, whole from live (M2 18556a32), plus the second reading ──
-- Rules d (brands + protected handles only) and e are judged on both readings;
-- exact-only words stay matched on the first reading only (name_protected_folds
-- already excludes them). Every earlier verdict is unchanged.
CREATE OR REPLACE FUNCTION public.alias_rule(p_alias text, p_shape boolean DEFAULT true)
 RETURNS text LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path TO 'public'
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
  v_f2 := public.name_second_fold(v);
  IF v_f2 IS NOT NULL AND v_f2 IS DISTINCT FROM v_f THEN
    SELECT array_agg(public.name_fold(x) ORDER BY o) INTO v_parts2
      FROM (
        SELECT regexp_replace(x, '^[0-9]+|[0-9]+$', '', 'g') AS x, o
          FROM unnest(string_to_array(v, '_')) WITH ORDINALITY AS u(x, o)
      ) s
     WHERE s.x <> '' AND s.x !~ '^[0-9]+$';
    IF EXISTS (SELECT 1 FROM public.name_brand_folds() b(f) WHERE b.f = v_f2)
       OR EXISTS (SELECT 1 FROM public.protected_handles h WHERE h.handle_fold = v_f2) THEN
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
REVOKE ALL ON FUNCTION public.alias_rule(text, boolean) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.alias_rule(text, boolean) FROM anon;
REVOKE ALL ON FUNCTION public.alias_rule(text, boolean) FROM authenticated;
GRANT ALL ON FUNCTION public.alias_rule(text, boolean) TO service_role;

-- ── 4. business_name_rule, whole from live, plus the second reading ────
CREATE OR REPLACE FUNCTION public.business_name_rule(p_name text)
 RETURNS text LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path TO 'public'
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
  v_lat2 := public.name_second_fold(regexp_replace(lower(p_name), '[^a-z0-9]+', '_', 'g'));
  IF v_lat2 IS NOT NULL AND v_lat2 IS DISTINCT FROM v_lat THEN
    SELECT array_agg(public.name_fold(x) ORDER BY o) INTO v_parts2
      FROM (
        SELECT regexp_replace(x, '^[0-9]+|[0-9]+$', '', 'g') AS x, o
          FROM unnest(regexp_split_to_array(lower(p_name), '[^a-z0-9]+')) WITH ORDINALITY AS u(x, o)
      ) s
     WHERE s.x <> '' AND s.x !~ '^[0-9]+$';
    IF EXISTS (SELECT 1 FROM public.name_brand_folds() b(f) WHERE b.f = v_lat2)
       OR EXISTS (SELECT 1 FROM public.protected_handles h WHERE h.handle_fold = v_lat2) THEN
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
REVOKE ALL ON FUNCTION public.business_name_rule(text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.business_name_rule(text) FROM anon;
REVOKE ALL ON FUNCTION public.business_name_rule(text) FROM authenticated;
GRANT ALL ON FUNCTION public.business_name_rule(text) TO service_role;

-- ── 5. suggest_seller_aliases: gains p_category_id (signature changes → DROP) ──
-- The category word is the last word of the leaf's English name with at least
-- four letters, letters only. Bases: name joined; first name + category word;
-- first name + last initial; name with underscores; with no Latin name, the
-- category word + '_shop'. Every suggestion passes every rule; at most two
-- digits at the end.
DROP FUNCTION public.suggest_seller_aliases(text, text, text);
CREATE FUNCTION public.suggest_seller_aliases(p_business_name text DEFAULT NULL,
                                              p_first_name text DEFAULT NULL,
                                              p_last_name text DEFAULT NULL,
                                              p_category_id uuid DEFAULT NULL)
 RETURNS jsonb LANGUAGE plpgsql VOLATILE SECURITY DEFINER SET search_path TO 'public'
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
  -- The category word: last >=4-letter word of the leaf's English name.
  IF p_category_id IS NOT NULL THEN
    SELECT w INTO v_cat
      FROM (
        SELECT unnest(regexp_split_to_array(
                 lower(regexp_replace(c.name_en, '[^A-Za-z ]', '', 'g')), ' +')) AS w
          FROM public.categories c WHERE c.id = p_category_id
      ) s
     WHERE char_length(s.w) >= 4
     ORDER BY char_length(s.w) DESC, s.w
     LIMIT 1;
    -- "last" word, not longest: re-pick by position.
    SELECT s.w INTO v_cat
      FROM (
        SELECT w, row_number() OVER () AS rn,
               count(*) OVER () AS total
          FROM (
            SELECT unnest(regexp_split_to_array(
                     lower(regexp_replace(c.name_en, '[^A-Za-z ]', '', 'g')), ' +')) AS w
              FROM public.categories c WHERE c.id = p_category_id
          ) words
      ) s
     WHERE char_length(s.w) >= 4
     ORDER BY s.rn DESC
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
REVOKE ALL ON FUNCTION public.suggest_seller_aliases(text, text, text, uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.suggest_seller_aliases(text, text, text, uuid) FROM anon;
GRANT EXECUTE ON FUNCTION public.suggest_seller_aliases(text, text, text, uuid) TO authenticated;
GRANT ALL ON FUNCTION public.suggest_seller_aliases(text, text, text, uuid) TO service_role;

-- ── 6. my_seller_line, whole from live, plus the change dates ──────────
-- next_change_at: when the next counted change is allowed (NULL = now).
-- correction_until: the end of the 24-hour correction window after a change
-- (NULL when no window is open). A seller who has never named themselves gets
-- NULL for both.
CREATE OR REPLACE FUNCTION public.my_seller_line()
 RETURNS jsonb LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path TO 'public'
AS $function$
DECLARE
  v_uid uuid := auth.uid();
  v_p   public.profiles%ROWTYPE;
  v_prev text;
  v_last timestamptz;
  v_corr timestamptz;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  SELECT * INTO v_p FROM public.profiles WHERE user_id = v_uid;
  SELECT h.alias INTO v_prev FROM public.alias_history h
   WHERE h.user_id = v_uid AND h.released_at IS NOT NULL
     AND h.released_at > now() - interval '365 days'
     AND h.alias_fold IS DISTINCT FROM public.name_fold(v_p.seller_alias)
   ORDER BY h.released_at DESC LIMIT 1;
  SELECT max(h.taken_at) INTO v_last FROM public.alias_history h WHERE h.user_id = v_uid;
  IF v_last IS NOT NULL AND now() - v_last < interval '24 hours' THEN
    v_corr := v_last + interval '24 hours';
  END IF;
  RETURN jsonb_build_object('alias', v_p.seller_alias, 'previous_alias', v_prev,
                            'member_since', v_p.created_at,
                            'next_change_at', public.alias_next_change_at(v_uid),
                            'correction_until', v_corr);
END $function$;
REVOKE ALL ON FUNCTION public.my_seller_line() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.my_seller_line() FROM anon;
GRANT EXECUTE ON FUNCTION public.my_seller_line() TO authenticated;
GRANT ALL ON FUNCTION public.my_seller_line() TO service_role;

-- ── 7. change_home_country: the confirmed-country change door ──────────
-- Not yet confirmed: confirm and stamp nothing. Same country: ok. A different
-- country: refused with the next allowed date while the last change is under
-- 30 days old; otherwise both rows move, the stamp is set and the change is
-- audited. The observed country is never touched.
CREATE FUNCTION public.change_home_country(p_country character)
 RETURNS jsonb LANGUAGE plpgsql VOLATILE SECURITY DEFINER SET search_path TO 'public'
AS $function$
DECLARE
  v_uid  uuid := auth.uid();
  v_rate jsonb;
  v_code character(2);
  v_cur  record;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  v_rate := public.rate_gate('identity');
  IF NOT coalesce((v_rate->>'allowed')::boolean, false) THEN
    RETURN jsonb_build_object('ok', false, 'field', 'rate', 'reason', 'rateLimited',
                              'resets_at', v_rate->>'resets_at');
  END IF;
  v_code := upper(btrim(coalesce(p_country::text, '')));
  IF v_code IS NULL OR v_code = ''
     OR NOT EXISTS (SELECT 1 FROM public.countries c WHERE c.code = v_code) THEN
    RETURN jsonb_build_object('ok', false, 'field', 'home_country_code', 'reason', 'unknownCountry');
  END IF;
  SELECT d.home_country_code, d.country_source, d.home_country_changed_at INTO v_cur
    FROM public.user_directory d WHERE d.user_id = v_uid;
  IF NOT FOUND OR v_cur.country_source IS DISTINCT FROM 'user_confirmed' THEN
    UPDATE public.user_directory
       SET home_country_code = v_code, country_source = 'user_confirmed'
     WHERE user_id = v_uid;
    UPDATE public.profiles
       SET home_country_code = v_code, country_source = 'user_confirmed', updated_at = now()
     WHERE user_id = v_uid;
    RETURN jsonb_build_object('ok', true);
  END IF;
  IF v_code = v_cur.home_country_code THEN
    RETURN jsonb_build_object('ok', true);
  END IF;
  IF v_cur.home_country_changed_at IS NOT NULL
     AND now() - v_cur.home_country_changed_at < interval '30 days' THEN
    RETURN jsonb_build_object('ok', false, 'field', 'home_country_code', 'reason', 'countryTooSoon',
                              'detail', v_cur.home_country_changed_at + interval '30 days');
  END IF;
  UPDATE public.user_directory
     SET home_country_code = v_code, home_country_changed_at = now()
   WHERE user_id = v_uid;
  UPDATE public.profiles
     SET home_country_code = v_code, updated_at = now()
   WHERE user_id = v_uid;
  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
  VALUES (v_uid, 'user.home_country_changed', 'profile', v_uid::text,
          jsonb_build_object('from', v_cur.home_country_code, 'to', v_code));
  RETURN jsonb_build_object('ok', true);
END $function$;
REVOKE ALL ON FUNCTION public.change_home_country(character) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.change_home_country(character) FROM anon;
GRANT EXECUTE ON FUNCTION public.change_home_country(character) TO authenticated;
GRANT ALL ON FUNCTION public.change_home_country(character) TO service_role;

-- ── 8. Proofs, all rolled back ─────────────────────────────────────────
DO $$
DECLARE
  v_uid uuid;
  v_cat uuid;
  v_ans jsonb;
BEGIN
  -- Second reading: edge digits no longer hide a protected name.
  ASSERT public.alias_rule('telebirr2024') = 'd', 'telebirr2024 must be refused d';
  ASSERT public.alias_rule('telebirr_2024') = 'd', 'telebirr_2024 must be refused d';
  ASSERT public.alias_rule('2024telebirr') = 'a', '2024telebirr starts with a digit: shape refuses first';
  ASSERT public.alias_rule('te1ebirr77') = 'd', 'te1ebirr77 must be refused d';
  ASSERT public.business_name_rule('Telebirr 2024') = 'd', 'Telebirr 2024 must be refused d';
  -- Earlier verdicts unchanged.
  ASSERT public.alias_rule('abebe_support') = 'c', 'abebe_support stays c';
  ASSERT public.alias_rule('telebirr') = 'd', 'telebirr stays d';
  ASSERT public.alias_rule('telebirr_store') = 'e', 'telebirr_store stays e';
  ASSERT public.alias_rule('awash_market') IS NULL, 'awash_market stays free';
  ASSERT public.alias_rule('abebe_phones') IS NULL, 'abebe_phones stays free';
  ASSERT public.alias_rule('abc_1234567') = 'a', 'abc_1234567 stays a';
  -- A real digit-bearing name that is not protected stays free.
  ASSERT public.alias_rule('selam2shop') IS NULL, 'selam2shop stays free';

  -- Suggestions with a category: scratch category, caller impersonation.
  SELECT id INTO v_uid FROM auth.users ORDER BY created_at LIMIT 1;
  IF v_uid IS NOT NULL THEN
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_uid::text, 'role', 'authenticated')::text, true);
    INSERT INTO public.categories (name_en, slug, price_enabled, is_restricted, is_active,
                                   display_order, is_catchall, allow_listings, capabilities,
                                   default_price_period, price_period_locked)
    VALUES ('E2E Scratch Phones', 'e2e-scratch-phones-m4', false, false, false,
            9999, false, false, '{}', 'once', false)
    RETURNING id INTO v_cat;
    v_ans := public.suggest_seller_aliases(null, 'Hana', 'Tesfaye', v_cat);
    ASSERT coalesce((v_ans->>'ok')::boolean, false), 'suggest with category must answer ok';
    ASSERT jsonb_array_length(v_ans->'suggestions') BETWEEN 1 AND 3, 'suggest must offer 1-3 names';
    ASSERT NOT EXISTS (
      SELECT 1 FROM jsonb_array_elements_text(v_ans->'suggestions') s(x)
       WHERE public.alias_rule(s.x) IS NOT NULL OR s.x ~ '[0-9]{3}'),
      'every suggestion passes every rule with at most two digits at the end';

    -- change_home_country: unconfirmed → confirms, stamps nothing.
    UPDATE public.user_directory SET country_source = 'ip_guess', home_country_changed_at = NULL
     WHERE user_id = v_uid;
    v_ans := public.change_home_country('ET');
    ASSERT coalesce((v_ans->>'ok')::boolean, false), 'unconfirmed confirm must be ok';
    ASSERT EXISTS (SELECT 1 FROM public.user_directory d
                    WHERE d.user_id = v_uid AND d.home_country_code = 'ET'
                      AND d.country_source = 'user_confirmed' AND d.home_country_changed_at IS NULL),
      'confirm must not stamp the 30-day clock';
    -- Same country: ok, still no stamp.
    v_ans := public.change_home_country('ET');
    ASSERT coalesce((v_ans->>'ok')::boolean, false), 'same country must be ok';
    -- A different country: allowed, stamped, audited.
    v_ans := public.change_home_country('US');
    ASSERT coalesce((v_ans->>'ok')::boolean, false), 'first change must be ok';
    ASSERT EXISTS (SELECT 1 FROM public.user_directory d
                    WHERE d.user_id = v_uid AND d.home_country_code = 'US'
                      AND d.home_country_changed_at IS NOT NULL),
      'a change must stamp the 30-day clock';
    ASSERT EXISTS (SELECT 1 FROM public.audit_log a
                    WHERE a.actor_id = v_uid AND a.action = 'user.home_country_changed'
                      AND a.meta->>'from' = 'ET' AND a.meta->>'to' = 'US'),
      'a change must be audited';
    -- A second change inside 30 days: refused with the next date.
    v_ans := public.change_home_country('GB');
    ASSERT NOT coalesce((v_ans->>'ok')::boolean, false), 'second change inside 30 days must refuse';
    ASSERT v_ans->>'reason' = 'countryTooSoon' AND v_ans->>'detail' IS NOT NULL,
      'the refusal carries the next allowed date';
    -- my_seller_line carries the new keys.
    v_ans := public.my_seller_line();
    ASSERT v_ans ? 'next_change_at' AND v_ans ? 'correction_until',
      'my_seller_line must carry the change dates';
  END IF;
  RAISE EXCEPTION 'M4 proofs passed — rolling back';
EXCEPTION WHEN raise_exception THEN
  RAISE NOTICE 'M4 proofs passed; proof block rolled back';
END $$;

INSERT INTO public.migration_marks(version) VALUES ('20261004040000') ON CONFLICT DO NOTHING;