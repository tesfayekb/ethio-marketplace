-- Bundle 19 turn 18 (2026-10-17). Tier A. DEC-191 — M9: A NAME ONE LETTER OFF A PROTECTED ORGANISATION'S NAME IS REFUSED.
-- e2e-areas: posting, admin-users
-- The seller name is the store address (DEC-108). The reserved list stops exact spellings and the fold stops look-alikes
-- (0/o, 1/l, rn/m …), but "telebiirr", "telebxrr" or "dashem_bank" passed every exact rule and relied on the AI check
-- alone, which accepts when the AI is down. REQ-008's first layer named "one letter off" in July; DEC-191 (the operator,
-- 2026-10-17) builds it.
-- A. name_one_edit(a, b) — NEW, IMMUTABLE: true when a and b differ by exactly one edit (a letter changed, added or
--    dropped). name_near_protected(p) — NEW, STABLE SECURITY DEFINER: p (a fold, five letters or more) is one edit from
--    a protected organisation's handle or Latin name ('handle', 'name_latin' in name_folds) of six letters or more that
--    is not an exact-only word. Both closed to the browser roles.
-- B. alias_rule(text, boolean) and business_name_rule(text) redeclared WHOLE from their last declaration
--    (20261004144146), each changed in ONE place: right after the exact reserved-name test (d), the one-letter test,
--    refusing with the same rule 'd' (the reserved-name message). Every other line, the headers and the grants unchanged.
-- C. Proofs P1–P6, RAISE EXCEPTION on any failure (a clean apply is the pass): the four bodies by fingerprint (DEC-190)
--    with their headers; the grants closed; name_one_edit on literals only (no row read — G27). The rules' behaviour on
--    the real list is proven by the door tests of this turn.
-- D. The mark 20261018220000.
-- Applied on ethio-prod by the executor's migration tool on save (DEC-188); the operator applies the saved file on
-- ethio-staging and reads back the mark. No table touched.

-- ===== A — the two helpers =====
CREATE OR REPLACE FUNCTION public.name_one_edit(a text, b text)
 RETURNS boolean
 LANGUAGE plpgsql
 IMMUTABLE
 SET search_path TO 'public'
AS $function$
DECLARE
  la integer := char_length(coalesce(a, ''));
  lb integer := char_length(coalesce(b, ''));
  i  integer := 1;
BEGIN
  -- True when a and b differ by exactly one edit: one letter changed (same length), or one letter added or dropped.
  IF a IS NULL OR b IS NULL OR a = b OR abs(la - lb) > 1 THEN
    RETURN false;
  END IF;
  WHILE i <= least(la, lb) AND substr(a, i, 1) = substr(b, i, 1) LOOP
    i := i + 1;
  END LOOP;
  IF la = lb THEN
    RETURN substr(a, i + 1) = substr(b, i + 1);
  ELSIF la > lb THEN
    RETURN substr(a, i + 1) = substr(b, i);
  ELSE
    RETURN substr(a, i) = substr(b, i + 1);
  END IF;
END $function$;
REVOKE ALL ON FUNCTION public.name_one_edit(text, text) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.name_one_edit(text, text) TO service_role;

CREATE OR REPLACE FUNCTION public.name_near_protected(p text)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT char_length(coalesce(p, '')) >= 5
     AND EXISTS (SELECT 1 FROM public.name_folds f
                  WHERE f.kind IN ('handle', 'name_latin')
                    AND char_length(f.fold) >= 6
                    AND char_length(f.fold) BETWEEN char_length(p) - 1 AND char_length(p) + 1
                    AND NOT EXISTS (SELECT 1 FROM public.name_folds x WHERE x.kind = 'exact_only' AND x.fold = f.fold)
                    AND public.name_one_edit(p, f.fold))
$function$;
REVOKE ALL ON FUNCTION public.name_near_protected(text) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.name_near_protected(text) TO service_role;

-- ===== B — the two rules, whole =====
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
  IF (v_lat <> '' AND EXISTS (SELECT 1 FROM public.name_folds k
                               WHERE k.kind IN ('brand', 'handle', 'name_latin') AND k.fold = v_lat))
     OR (v_am <> '' AND EXISTS (SELECT 1 FROM public.name_folds k
                                 WHERE k.kind = 'name_am' AND k.fold = v_am)) THEN
    RETURN 'd';
  END IF;
  -- DEC-191 — one letter off a protected organisation's handle or its Latin name (six letters or more) is refused too.
  IF v_lat <> '' AND public.name_near_protected(v_lat) THEN
    RETURN 'd';
  END IF;
  IF v_lat = '' THEN RETURN NULL; END IF;
  SELECT array_agg(public.name_fold(x) ORDER BY o) INTO v_parts
    FROM unnest(regexp_split_to_array(lower(p_name), '[^a-z0-9]+')) WITH ORDINALITY AS u(x, o) WHERE x <> '';
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

  -- Second reading on the Latin fold.
  -- M4b: the 'd' check reads the protected set (brands AND handles, less the
  -- exact-only words); M5 reads it from name_folds (name_folds_protected).
  v_lat2 := public.name_second_fold(regexp_replace(lower(p_name), '[^a-z0-9]+', '_', 'g'));
  IF v_lat2 IS NOT NULL AND v_lat2 IS DISTINCT FROM v_lat THEN
    SELECT array_agg(public.name_fold(x) ORDER BY o) INTO v_parts2
      FROM (
        SELECT regexp_replace(x, '^[0-9]+|[0-9]+$', '', 'g') AS x, o
          FROM unnest(regexp_split_to_array(lower(p_name), '[^a-z0-9]+')) WITH ORDINALITY AS u(x, o)
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
  END IF;
  RETURN NULL;
END $function$;
REVOKE ALL ON FUNCTION public.business_name_rule(text) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.business_name_rule(text) TO service_role;

-- ===== C — proofs =====
DO $proof$
DECLARE
  v_md5 text;
  v_vol "char";
  v_def boolean;
  v_cfg text;
  v_t   text;
BEGIN
  -- P1–P4. The four bodies by fingerprint, their headers.
  SELECT (SELECT md5(string_agg(CASE WHEN t.ord % 2 = 1 THEN btrim(regexp_replace(t.seg, '\s+', ' ', 'g')) ELSE t.seg END, '''' ORDER BY t.ord)) FROM regexp_split_to_table(regexp_replace(replace(p.prosrc, chr(13), ''), '--[^\n]*', '', 'g'), '''') WITH ORDINALITY AS t(seg, ord)), p.provolatile, p.prosecdef,
         coalesce(array_to_string(p.proconfig, ','), '') INTO v_md5, v_vol, v_def, v_cfg
    FROM pg_proc p WHERE p.oid = 'public.name_one_edit(text, text)'::regprocedure;
  IF v_md5 <> 'dbf74c4d766a51334ff5a5515fa5fc9b' THEN
    RAISE EXCEPTION 'B19M9 P1: name_one_edit body is not the one written (fingerprint %)', v_md5;
  END IF;
  IF v_vol <> 'i' OR v_cfg NOT LIKE '%search_path=public%' THEN
    RAISE EXCEPTION 'B19M9 P1: name_one_edit header changed (volatile %, definer %, config %)', v_vol, v_def, v_cfg;
  END IF;
  SELECT (SELECT md5(string_agg(CASE WHEN t.ord % 2 = 1 THEN btrim(regexp_replace(t.seg, '\s+', ' ', 'g')) ELSE t.seg END, '''' ORDER BY t.ord)) FROM regexp_split_to_table(regexp_replace(replace(p.prosrc, chr(13), ''), '--[^\n]*', '', 'g'), '''') WITH ORDINALITY AS t(seg, ord)), p.provolatile, p.prosecdef,
         coalesce(array_to_string(p.proconfig, ','), '') INTO v_md5, v_vol, v_def, v_cfg
    FROM pg_proc p WHERE p.oid = 'public.name_near_protected(text)'::regprocedure;
  IF v_md5 <> 'ca4fcae4b4f4fea83483f90b074ac41e' THEN
    RAISE EXCEPTION 'B19M9 P2: name_near_protected body is not the one written (fingerprint %)', v_md5;
  END IF;
  IF v_vol <> 's' OR v_cfg NOT LIKE '%search_path=public%' THEN
    RAISE EXCEPTION 'B19M9 P2: name_near_protected header changed (volatile %, definer %, config %)', v_vol, v_def, v_cfg;
  END IF;
  SELECT (SELECT md5(string_agg(CASE WHEN t.ord % 2 = 1 THEN btrim(regexp_replace(t.seg, '\s+', ' ', 'g')) ELSE t.seg END, '''' ORDER BY t.ord)) FROM regexp_split_to_table(regexp_replace(replace(p.prosrc, chr(13), ''), '--[^\n]*', '', 'g'), '''') WITH ORDINALITY AS t(seg, ord)), p.provolatile, p.prosecdef,
         coalesce(array_to_string(p.proconfig, ','), '') INTO v_md5, v_vol, v_def, v_cfg
    FROM pg_proc p WHERE p.oid = 'public.alias_rule(text, boolean)'::regprocedure;
  IF v_md5 <> 'd9132d7c52b915b24d9a7e5399c44e1a' THEN
    RAISE EXCEPTION 'B19M9 P3: alias_rule body is not the one written (fingerprint %)', v_md5;
  END IF;
  IF v_vol <> 's' OR v_cfg NOT LIKE '%search_path=public%' THEN
    RAISE EXCEPTION 'B19M9 P3: alias_rule header changed (volatile %, definer %, config %)', v_vol, v_def, v_cfg;
  END IF;
  SELECT (SELECT md5(string_agg(CASE WHEN t.ord % 2 = 1 THEN btrim(regexp_replace(t.seg, '\s+', ' ', 'g')) ELSE t.seg END, '''' ORDER BY t.ord)) FROM regexp_split_to_table(regexp_replace(replace(p.prosrc, chr(13), ''), '--[^\n]*', '', 'g'), '''') WITH ORDINALITY AS t(seg, ord)), p.provolatile, p.prosecdef,
         coalesce(array_to_string(p.proconfig, ','), '') INTO v_md5, v_vol, v_def, v_cfg
    FROM pg_proc p WHERE p.oid = 'public.business_name_rule(text)'::regprocedure;
  IF v_md5 <> '1ed89816a8c038468405d6341a88d4a2' THEN
    RAISE EXCEPTION 'B19M9 P4: business_name_rule body is not the one written (fingerprint %)', v_md5;
  END IF;
  IF v_vol <> 's' OR v_cfg NOT LIKE '%search_path=public%' THEN
    RAISE EXCEPTION 'B19M9 P4: business_name_rule header changed (volatile %, definer %, config %)', v_vol, v_def, v_cfg;
  END IF;
  -- P5. Closed to the browser roles.
  FOREACH v_t IN ARRAY ARRAY['public.name_one_edit(text, text)', 'public.name_near_protected(text)',
                             'public.alias_rule(text, boolean)', 'public.business_name_rule(text)'] LOOP
    IF has_function_privilege('anon', v_t, 'EXECUTE') OR has_function_privilege('authenticated', v_t, 'EXECUTE') THEN
      RAISE EXCEPTION 'B19M9 P5: % is executable by a browser role', v_t;
    END IF;
  END LOOP;
  -- P6. name_one_edit on literals.
  IF NOT (public.name_one_edit('telebirr', 'telebir') AND public.name_one_edit('telebir', 'telebirr')
          AND public.name_one_edit('telebirr', 'telebiirr') AND public.name_one_edit('telebirr', 'telebxrr')
          AND public.name_one_edit('dashenbank', 'dashembank') AND public.name_one_edit('abcdef', 'bcdef')
          AND public.name_one_edit('abcdef', 'abcde')) THEN
    RAISE EXCEPTION 'B19M9 P6: a one-edit pair was not seen as one edit';
  END IF;
  IF public.name_one_edit('telebirr', 'telebirr') OR public.name_one_edit('telebirr', 'telbr')
     OR public.name_one_edit('dashenbank', 'dashen') OR public.name_one_edit('abcdef', 'abdcfe')
     OR public.name_one_edit(NULL, 'abc') THEN
    RAISE EXCEPTION 'B19M9 P6: a pair more or less than one edit apart was seen as one edit';
  END IF;
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261018220000') ON CONFLICT (version) DO NOTHING;
