-- Bundle 20 turn 1, part 2 of 2 (2026-10-18). Tier A. DEC-198, DEC-203 — M1b: THE RULES READ THE v4 LISTS.
-- e2e-areas: posting, admin-users
-- Part 1 (20261018230000) brought the lists and the folds; this part changes the rules that read them (DEC-189: two
-- tool-sized parts). Gated on part 1's mark. Idempotent; a re-run changes nothing.
-- G. name_near_protected skips the never-refused words (R4); NEW name_near_protected_am — one Amharic letter off a
--    protected Amharic name or short form, six letters or more (R2); NEW name_institution_claim — a country's NAME
--    beside an institution word (R5).
-- I. alias_rule and business_name_rule redeclared WHOLE from their last declaration (20261017153217): the institution
--    check (e) in both readings; business_name_rule also matches the Amharic short forms exactly, applies the Amharic
--    one-letter rule and splits the name after the accent fold. No rule reads a country code or a seller's home
--    country (DEC-203, one global register).
-- P. Proofs on literals (G27: no rule is run against a real name — the door tests do that). M. The mark 20261019000000.
-- Applied on ethio-prod by the executor's migration tool on save; the operator applies the saved file on ethio-staging
-- and reads back the mark.

DO $gate$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261018230000') THEN
    RAISE EXCEPTION 'B20M1b: part 1 (20261018230000) has not landed';
  END IF;
END $gate$;

-- ===== G — the one-letter rules and the institution rule =====
CREATE OR REPLACE FUNCTION public.name_near_protected(p text)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  -- DEC-198 R4: a word on the never-refused list (allow, docs/data/name-rules-v4.csv) is never one letter off.
  SELECT char_length(coalesce(p, '')) >= 5
     AND NOT EXISTS (SELECT 1 FROM public.name_folds a WHERE a.kind = 'allow' AND a.fold = p)
     AND EXISTS (SELECT 1 FROM public.name_folds f
                  WHERE f.kind IN ('handle', 'name_latin')
                    AND char_length(f.fold) >= 6
                    AND char_length(f.fold) BETWEEN char_length(p) - 1 AND char_length(p) + 1
                    AND NOT EXISTS (SELECT 1 FROM public.name_folds x WHERE x.kind = 'exact_only' AND x.fold = f.fold)
                    AND public.name_one_edit(p, f.fold))
$function$;
REVOKE ALL ON FUNCTION public.name_near_protected(text) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.name_near_protected(text) TO service_role;

CREATE OR REPLACE FUNCTION public.name_near_protected_am(p text)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  -- DEC-198 R2: an Amharic name (its Amharic fold, six letters or more) one letter off a protected organisation's
  -- Amharic name or Amharic short form (six letters or more) — a letter changed, added or dropped, such as a dropped
  -- «የ» — is that name too, unless it is on the never-refused Amharic list (allow_am).
  SELECT char_length(coalesce(p, '')) >= 6
     AND NOT EXISTS (SELECT 1 FROM public.name_folds a WHERE a.kind = 'allow_am' AND a.fold = p)
     AND EXISTS (SELECT 1 FROM public.name_folds f
                  WHERE f.kind IN ('name_am', 'handle_am')
                    AND char_length(f.fold) >= 6
                    AND char_length(f.fold) BETWEEN char_length(p) - 1 AND char_length(p) + 1
                    AND public.name_one_edit(p, f.fold))
$function$;
REVOKE ALL ON FUNCTION public.name_near_protected_am(text) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.name_near_protected_am(text) TO service_role;

CREATE OR REPLACE FUNCTION public.name_institution_claim(p_fold text, p_parts text[])
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  -- DEC-198 R5: a country's NAME (four letters or more; never a two-letter code) beside an institution word
  -- (embassy, consulate, visa, immigration, government, agency — docs/data/name-rules-v4.csv) presents the name as
  -- that country's office: "norway_visa_lottery", "canada_agency_098". The institution word is a part of the name or
  -- its start or end; the country's name may stand anywhere in it.
  SELECT EXISTS (SELECT 1 FROM public.name_folds i
                  WHERE i.kind = 'institution'
                    AND (i.fold = ANY (coalesce(p_parts, '{}'::text[]))
                         OR left(p_fold, char_length(i.fold)) = i.fold
                         OR right(p_fold, char_length(i.fold)) = i.fold))
     AND EXISTS (SELECT 1 FROM public.name_folds c
                  WHERE c.kind = 'country'
                    AND char_length(c.fold) >= 4
                    AND position(c.fold IN coalesce(p_fold, '')) > 0)
$function$;
REVOKE ALL ON FUNCTION public.name_institution_claim(text, text[]) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.name_institution_claim(text, text[]) TO service_role;

-- ===== I — the two rules, whole =====
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

  -- M5 / INC-425 — every list is read from name_folds by key (built by
  -- name_folds_rebuild() with the same fold functions); nothing is folded here.
  IF EXISTS (SELECT 1 FROM public.name_folds w
              WHERE w.kind IN ('role', 'function')
                AND (w.fold = ANY (v_parts)
                     OR left(v_f, char_length(w.fold)) = w.fold
                     OR right(v_f, char_length(w.fold)) = w.fold)) THEN
    RETURN 'c';
  END IF;

  IF EXISTS (SELECT 1 FROM public.name_folds k
              WHERE k.kind IN ('site', 'category', 'place', 'country', 'brand', 'handle')
                AND k.fold = v_f) THEN
    RETURN 'd';
  END IF;
  -- DEC-191 — ONE LETTER OFF a protected organisation's handle (six letters or more, not an exact-only word) is that
  -- name too: a letter added, dropped or changed ("telebiirr", "dashem_bank"). The reserved-name refusal (d).
  IF public.name_near_protected(v_f) THEN
    RETURN 'd';
  END IF;

  SELECT array_agg(p ORDER BY o) INTO v_kept
    FROM unnest(v_parts) WITH ORDINALITY AS u(p, o)
   WHERE NOT EXISTS (SELECT 1 FROM public.name_folds c WHERE c.kind = 'claim' AND c.fold = p);
  IF coalesce(cardinality(v_kept), 0) BETWEEN 1 AND cardinality(v_parts) - 1
     AND public.name_folds_protected(array_to_string(v_kept, '')) THEN
    RETURN 'e';
  END IF;
  IF EXISTS (SELECT 1 FROM (SELECT f.fold AS w FROM public.name_folds f WHERE f.kind = 'claim') c
              WHERE char_length(v_f) >= char_length(c.w) + 5
                AND ((right(v_f, char_length(c.w)) = c.w
                      AND public.name_folds_protected(left(v_f, char_length(v_f) - char_length(c.w))))
                  OR (left(v_f, char_length(c.w)) = c.w
                      AND public.name_folds_protected(right(v_f, char_length(v_f) - char_length(c.w)))))) THEN
    RETURN 'e';
  END IF;
  -- DEC-198 R5 — a country's name beside an institution word is that country's office: the claim refusal (e).
  IF public.name_institution_claim(v_f, v_parts) THEN
    RETURN 'e';
  END IF;

  -- Second reading: edge digits stripped per part, digit-only parts dropped.
  -- M4b: the 'd' check reads the protected set (brands AND handles, less the
  -- exact-only words); M5 reads it from name_folds (name_folds_protected).
  v_f2 := public.name_second_fold(v);
  IF v_f2 IS NOT NULL AND v_f2 IS DISTINCT FROM v_f THEN
    SELECT array_agg(public.name_fold(x) ORDER BY o) INTO v_parts2
      FROM (
        SELECT regexp_replace(x, '^[0-9]+|[0-9]+$', '', 'g') AS x, o
          FROM unnest(string_to_array(v, '_')) WITH ORDINALITY AS u(x, o)
      ) s
     WHERE s.x <> '' AND s.x !~ '^[0-9]+$';
    IF public.name_folds_protected(v_f2) THEN
      RETURN 'd';
    END IF;
    SELECT array_agg(p ORDER BY o) INTO v_kept
      FROM unnest(v_parts2) WITH ORDINALITY AS u(p, o)
     WHERE NOT EXISTS (SELECT 1 FROM public.name_folds c WHERE c.kind = 'claim' AND c.fold = p);
    IF coalesce(cardinality(v_kept), 0) BETWEEN 1 AND cardinality(v_parts2) - 1
       AND public.name_folds_protected(array_to_string(v_kept, '')) THEN
      RETURN 'e';
    END IF;
    IF EXISTS (SELECT 1 FROM (SELECT f.fold AS w FROM public.name_folds f WHERE f.kind = 'claim') c
                WHERE char_length(v_f2) >= char_length(c.w) + 5
                  AND ((right(v_f2, char_length(c.w)) = c.w
                        AND public.name_folds_protected(left(v_f2, char_length(v_f2) - char_length(c.w))))
                    OR (left(v_f2, char_length(c.w)) = c.w
                        AND public.name_folds_protected(right(v_f2, char_length(v_f2) - char_length(c.w)))))) THEN
      RETURN 'e';
    END IF;
    IF public.name_institution_claim(v_f2, v_parts2) THEN
      RETURN 'e';
    END IF;
  END IF;
  RETURN NULL;
END $function$;
REVOKE ALL ON FUNCTION public.alias_rule(text, boolean) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.alias_rule(text, boolean) TO service_role;

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
  -- M5 / INC-425 — read from name_folds by key: brand, handle and the
  -- protected names' Latin fold (name_latin); the Amharic fold (name_am).
  -- DEC-198 R2 — the Amharic short forms (handle_am) match exactly; R10 — the Latin fold reads accents as plain letters.
  IF (v_lat <> '' AND EXISTS (SELECT 1 FROM public.name_folds k
                               WHERE k.kind IN ('brand', 'handle', 'name_latin') AND k.fold = v_lat))
     OR (v_am <> '' AND EXISTS (SELECT 1 FROM public.name_folds k
                                 WHERE k.kind IN ('name_am', 'handle_am') AND k.fold = v_am)) THEN
    RETURN 'd';
  END IF;
  -- DEC-191 — one letter off a protected organisation's handle or its Latin name (six letters or more) is refused too.
  IF v_lat <> '' AND public.name_near_protected(v_lat) THEN
    RETURN 'd';
  END IF;
  -- DEC-198 R2 — one Amharic letter off a protected organisation's Amharic name or short form (six letters or more).
  IF v_am <> '' AND public.name_near_protected_am(v_am) THEN
    RETURN 'd';
  END IF;
  IF v_lat = '' THEN RETURN NULL; END IF;
  SELECT array_agg(public.name_fold(x) ORDER BY o) INTO v_parts
    FROM unnest(regexp_split_to_array(public.name_unaccent(p_name), '[^a-z0-9]+')) WITH ORDINALITY AS u(x, o) WHERE x <> '';
  SELECT array_agg(p ORDER BY o) INTO v_kept
    FROM unnest(v_parts) WITH ORDINALITY AS u(p, o)
   WHERE NOT EXISTS (SELECT 1 FROM public.name_folds c WHERE c.kind = 'claim' AND c.fold = p);
  IF coalesce(cardinality(v_kept), 0) BETWEEN 1 AND cardinality(v_parts) - 1
     AND public.name_folds_protected(array_to_string(v_kept, '')) THEN
    RETURN 'e';
  END IF;
  IF EXISTS (SELECT 1 FROM (SELECT f.fold AS w FROM public.name_folds f WHERE f.kind = 'claim') c
              WHERE char_length(v_lat) >= char_length(c.w) + 5
                AND ((right(v_lat, char_length(c.w)) = c.w
                      AND public.name_folds_protected(left(v_lat, char_length(v_lat) - char_length(c.w))))
                  OR (left(v_lat, char_length(c.w)) = c.w
                      AND public.name_folds_protected(right(v_lat, char_length(v_lat) - char_length(c.w)))))) THEN
    RETURN 'e';
  END IF;
  -- DEC-198 R5 — a country's name beside an institution word: the claim refusal (e).
  IF public.name_institution_claim(v_lat, v_parts) THEN
    RETURN 'e';
  END IF;

  -- Second reading on the Latin fold.
  -- M4b: the 'd' check reads the protected set (brands AND handles, less the
  -- exact-only words); M5 reads it from name_folds (name_folds_protected).
  v_lat2 := public.name_second_fold(regexp_replace(public.name_unaccent(p_name), '[^a-z0-9]+', '_', 'g'));
  IF v_lat2 IS NOT NULL AND v_lat2 IS DISTINCT FROM v_lat THEN
    SELECT array_agg(public.name_fold(x) ORDER BY o) INTO v_parts2
      FROM (
        SELECT regexp_replace(x, '^[0-9]+|[0-9]+$', '', 'g') AS x, o
          FROM unnest(regexp_split_to_array(public.name_unaccent(p_name), '[^a-z0-9]+')) WITH ORDINALITY AS u(x, o)
      ) s
     WHERE s.x <> '' AND s.x !~ '^[0-9]+$';
    IF public.name_folds_protected(v_lat2) THEN
      RETURN 'd';
    END IF;
    SELECT array_agg(p ORDER BY o) INTO v_kept
      FROM unnest(v_parts2) WITH ORDINALITY AS u(p, o)
     WHERE NOT EXISTS (SELECT 1 FROM public.name_folds c WHERE c.kind = 'claim' AND c.fold = p);
    IF coalesce(cardinality(v_kept), 0) BETWEEN 1 AND cardinality(v_parts2) - 1
       AND public.name_folds_protected(array_to_string(v_kept, '')) THEN
      RETURN 'e';
    END IF;
    IF EXISTS (SELECT 1 FROM (SELECT f.fold AS w FROM public.name_folds f WHERE f.kind = 'claim') c
                WHERE char_length(v_lat2) >= char_length(c.w) + 5
                  AND ((right(v_lat2, char_length(c.w)) = c.w
                        AND public.name_folds_protected(left(v_lat2, char_length(v_lat2) - char_length(c.w))))
                    OR (left(v_lat2, char_length(c.w)) = c.w
                        AND public.name_folds_protected(right(v_lat2, char_length(v_lat2) - char_length(c.w)))))) THEN
      RETURN 'e';
    END IF;
    IF public.name_institution_claim(v_lat2, v_parts2) THEN
      RETURN 'e';
    END IF;
  END IF;
  RETURN NULL;
END $function$;
REVOKE ALL ON FUNCTION public.business_name_rule(text) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.business_name_rule(text) TO service_role;

-- ===== P — proofs =====
DO $proof$
DECLARE
  v_md5 text;
  v_vol "char";
  v_def boolean;
  v_cfg text;
  v_t   text;
BEGIN
  -- P1. Every new or redeclared body by fingerprint (DEC-190), with its header.
  SELECT (SELECT md5(string_agg(CASE WHEN t.ord % 2 = 1 THEN btrim(regexp_replace(t.seg, '\s+', ' ', 'g')) ELSE t.seg END, '''' ORDER BY t.ord)) FROM regexp_split_to_table(regexp_replace(replace(p.prosrc, chr(13), ''), '--[^\n]*', '', 'g'), '''') WITH ORDINALITY AS t(seg, ord)), p.provolatile, p.prosecdef, coalesce(array_to_string(p.proconfig, ','), '')
    INTO v_md5, v_vol, v_def, v_cfg FROM pg_proc p WHERE p.oid = 'public.name_near_protected(text)'::regprocedure;
  IF v_md5 <> 'e2d974db03378ee713614156717c23a0' OR v_vol <> 's' OR v_def <> true OR v_cfg NOT LIKE '%search_path=public%' THEN
    RAISE EXCEPTION 'B20M1b P1.1: name_near_protected(text) is not the one written (fingerprint %, volatile %, definer %, config %)', v_md5, v_vol, v_def, v_cfg;
  END IF;
  SELECT (SELECT md5(string_agg(CASE WHEN t.ord % 2 = 1 THEN btrim(regexp_replace(t.seg, '\s+', ' ', 'g')) ELSE t.seg END, '''' ORDER BY t.ord)) FROM regexp_split_to_table(regexp_replace(replace(p.prosrc, chr(13), ''), '--[^\n]*', '', 'g'), '''') WITH ORDINALITY AS t(seg, ord)), p.provolatile, p.prosecdef, coalesce(array_to_string(p.proconfig, ','), '')
    INTO v_md5, v_vol, v_def, v_cfg FROM pg_proc p WHERE p.oid = 'public.name_near_protected_am(text)'::regprocedure;
  IF v_md5 <> 'ac3667301555ea3c3a467c46a98f06d9' OR v_vol <> 's' OR v_def <> true OR v_cfg NOT LIKE '%search_path=public%' THEN
    RAISE EXCEPTION 'B20M1b P1.2: name_near_protected_am(text) is not the one written (fingerprint %, volatile %, definer %, config %)', v_md5, v_vol, v_def, v_cfg;
  END IF;
  SELECT (SELECT md5(string_agg(CASE WHEN t.ord % 2 = 1 THEN btrim(regexp_replace(t.seg, '\s+', ' ', 'g')) ELSE t.seg END, '''' ORDER BY t.ord)) FROM regexp_split_to_table(regexp_replace(replace(p.prosrc, chr(13), ''), '--[^\n]*', '', 'g'), '''') WITH ORDINALITY AS t(seg, ord)), p.provolatile, p.prosecdef, coalesce(array_to_string(p.proconfig, ','), '')
    INTO v_md5, v_vol, v_def, v_cfg FROM pg_proc p WHERE p.oid = 'public.name_institution_claim(text, text[])'::regprocedure;
  IF v_md5 <> '96434846d6d65b66ceb525e473d16965' OR v_vol <> 's' OR v_def <> true OR v_cfg NOT LIKE '%search_path=public%' THEN
    RAISE EXCEPTION 'B20M1b P1.3: name_institution_claim(text, text[]) is not the one written (fingerprint %, volatile %, definer %, config %)', v_md5, v_vol, v_def, v_cfg;
  END IF;
  SELECT (SELECT md5(string_agg(CASE WHEN t.ord % 2 = 1 THEN btrim(regexp_replace(t.seg, '\s+', ' ', 'g')) ELSE t.seg END, '''' ORDER BY t.ord)) FROM regexp_split_to_table(regexp_replace(replace(p.prosrc, chr(13), ''), '--[^\n]*', '', 'g'), '''') WITH ORDINALITY AS t(seg, ord)), p.provolatile, p.prosecdef, coalesce(array_to_string(p.proconfig, ','), '')
    INTO v_md5, v_vol, v_def, v_cfg FROM pg_proc p WHERE p.oid = 'public.alias_rule(text, boolean)'::regprocedure;
  IF v_md5 <> 'cb7ed0784132e49a86b4bc6b89ff6171' OR v_vol <> 's' OR v_def <> true OR v_cfg NOT LIKE '%search_path=public%' THEN
    RAISE EXCEPTION 'B20M1b P1.4: alias_rule(text, boolean) is not the one written (fingerprint %, volatile %, definer %, config %)', v_md5, v_vol, v_def, v_cfg;
  END IF;
  SELECT (SELECT md5(string_agg(CASE WHEN t.ord % 2 = 1 THEN btrim(regexp_replace(t.seg, '\s+', ' ', 'g')) ELSE t.seg END, '''' ORDER BY t.ord)) FROM regexp_split_to_table(regexp_replace(replace(p.prosrc, chr(13), ''), '--[^\n]*', '', 'g'), '''') WITH ORDINALITY AS t(seg, ord)), p.provolatile, p.prosecdef, coalesce(array_to_string(p.proconfig, ','), '')
    INTO v_md5, v_vol, v_def, v_cfg FROM pg_proc p WHERE p.oid = 'public.business_name_rule(text)'::regprocedure;
  IF v_md5 <> '81a6ef50b38278b70e25b3884cb31e0b' OR v_vol <> 's' OR v_def <> true OR v_cfg NOT LIKE '%search_path=public%' THEN
    RAISE EXCEPTION 'B20M1b P1.5: business_name_rule(text) is not the one written (fingerprint %, volatile %, definer %, config %)', v_md5, v_vol, v_def, v_cfg;
  END IF;
  -- P2. Closed to the browser roles.
  FOREACH v_t IN ARRAY ARRAY['public.name_near_protected(text)', 'public.name_near_protected_am(text)', 'public.name_institution_claim(text, text[])', 'public.alias_rule(text, boolean)', 'public.business_name_rule(text)'] LOOP
    IF has_function_privilege('anon', v_t, 'EXECUTE') OR has_function_privilege('authenticated', v_t, 'EXECUTE') THEN
      RAISE EXCEPTION 'B20M1b P2: % is executable by a browser role', v_t;
    END IF;
  END LOOP;
  -- P5. The Amharic one-letter edit, on literals.
  IF NOT (public.name_one_edit('አቢሲንያባንክ', 'አቢሲኒያባንክ') AND public.name_one_edit('ኦሮሚያህብረትስራባንክ', 'የኦሮሚያህብረትስራባንክ'))
     OR public.name_one_edit('አቢሲንያባንክ', 'አቢሲንያ') THEN
    RAISE EXCEPTION 'B20M1b P5: an Amharic one-edit pair was misjudged';
  END IF;
  -- P6. One global register (DEC-203): no rule reads a country code or a seller's home country.
  IF EXISTS (SELECT 1 FROM pg_proc p
              WHERE p.oid IN ('public.alias_rule(text, boolean)'::regprocedure, 'public.business_name_rule(text)'::regprocedure,
                              'public.name_near_protected(text)'::regprocedure, 'public.name_near_protected_am(text)'::regprocedure,
                              'public.name_institution_claim(text, text[])'::regprocedure)
                AND (position('country_code' IN p.prosrc) > 0 OR position('home_country' IN p.prosrc) > 0)) THEN
    RAISE EXCEPTION 'B20M1b P6: a rule reads a country code';
  END IF;
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261019000000') ON CONFLICT (version) DO NOTHING;
