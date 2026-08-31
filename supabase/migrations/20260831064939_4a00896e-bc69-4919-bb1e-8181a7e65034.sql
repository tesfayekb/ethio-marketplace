-- U4g-3 — DETERMINISTIC LANGUAGE ORDER (INC-099b).
-- Language `sort` shipped tied (every row 0 in fresh installs), so roster and
-- switcher order were UNDEFINED and a new language could never append. This
-- migration normalizes the column, makes append-on-insert structural (one
-- shared helper used by BOTH the writer RPC and a BEFORE INSERT trigger), and
-- restates the roster read's ORDER BY (sort, code) plus its grants.

-- ---------------------------------------------------------------------
-- A. NORMALIZE — dense rank over (is_base DESC, sort, code).
-- ---------------------------------------------------------------------
WITH ranked AS (
  SELECT l.code,
         dense_rank() OVER (ORDER BY l.is_base DESC, l.sort, l.code) - 1 AS rank
    FROM public.languages l
)
UPDATE public.languages l
   SET sort = ranked.rank::int, updated_at = now()
  FROM ranked
 WHERE ranked.code = l.code
   AND l.sort <> ranked.rank::int;

-- ---------------------------------------------------------------------
-- B. APPEND-ON-INSERT — one helper, two callers.
-- ---------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.next_language_sort()
RETURNS integer
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(max(l.sort), -1) + 1 FROM public.languages l
$$;

REVOKE ALL ON FUNCTION public.next_language_sort() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.next_language_sort() FROM anon;
REVOKE ALL ON FUNCTION public.next_language_sort() FROM authenticated;
GRANT EXECUTE ON FUNCTION public.next_language_sort() TO service_role;

CREATE OR REPLACE FUNCTION public.languages_append_sort()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- A row that does not CHOOSE a position gets the end of the list. The
  -- column default is 0, which is why "unset" includes 0 for non-base rows.
  IF NEW.sort IS NULL OR (NEW.sort = 0 AND COALESCE(NEW.is_base, false) = false) THEN
    NEW.sort := public.next_language_sort();
  END IF;
  RETURN NEW;
END $$;

DROP TRIGGER IF EXISTS languages_append_sort ON public.languages;
CREATE TRIGGER languages_append_sort
BEFORE INSERT ON public.languages
FOR EACH ROW EXECUTE FUNCTION public.languages_append_sort();

-- ---------------------------------------------------------------------
-- C. WRITER — admin_upsert_language assigns the appended position itself.
-- ---------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.admin_upsert_language(
  p_code text, p_name_en text, p_name_native text, p_rtl boolean DEFAULT false)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE v_code text; v_sort integer;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'translations', 'manage') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('translations', 'manage');

  v_code := lower(btrim(COALESCE(p_code, '')));
  IF v_code !~ '^[a-z]{2,8}(-[a-z0-9]{2,8})?$' THEN
    RAISE EXCEPTION 'invalid language code';
  END IF;
  IF btrim(COALESCE(p_name_en, '')) = '' OR btrim(COALESCE(p_name_native, '')) = '' THEN
    RAISE EXCEPTION 'language names are required';
  END IF;

  v_sort := public.next_language_sort();

  INSERT INTO public.languages (code, name_en, name_native, rtl, sort)
  VALUES (v_code, btrim(p_name_en), btrim(p_name_native), COALESCE(p_rtl, false), v_sort)
  ON CONFLICT (code) DO UPDATE
    SET name_en = EXCLUDED.name_en, name_native = EXCLUDED.name_native,
        rtl = EXCLUDED.rtl, updated_at = now();

  PERFORM public.log_audit('translation.language_upsert', 'languages', v_code,
    jsonb_build_object('lang', v_code, 'action', 'upsert', 'machine', false));
END $$;

-- ---------------------------------------------------------------------
-- D. ROSTER READ — restated with (sort, code) ordering and its grants.
-- ---------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.admin_list_languages()
RETURNS TABLE(code text, name_en text, name_native text, rtl boolean, is_base boolean,
              enabled_admin boolean, enabled_public boolean, sort integer,
              created_at timestamptz, updated_at timestamptz)
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
#variable_conflict use_column
BEGIN
  IF NOT public.has_permission(auth.uid(), 'translations', 'view') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;

  RETURN QUERY
  SELECT l.code, l.name_en, l.name_native, l.rtl, l.is_base,
         l.enabled_admin, l.enabled_public, l.sort, l.created_at, l.updated_at
    FROM public.languages l
   ORDER BY l.sort, l.code;
END $$;

REVOKE ALL ON FUNCTION public.admin_list_languages() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.admin_list_languages() FROM anon;
GRANT EXECUTE ON FUNCTION public.admin_list_languages() TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_list_languages() TO service_role;

REVOKE ALL ON FUNCTION public.admin_upsert_language(text, text, text, boolean) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.admin_upsert_language(text, text, text, boolean) FROM anon;
GRANT EXECUTE ON FUNCTION public.admin_upsert_language(text, text, text, boolean) TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_upsert_language(text, text, text, boolean) TO service_role;

-- ---------------------------------------------------------------------
-- E. PROOFS.
-- ---------------------------------------------------------------------
DO $proof$
DECLARE
  v_dupes int;
  v_max int;
  v_got int;
  v_base_sort int;
BEGIN
  -- P1: after normalize no two rows share a sort.
  SELECT count(*) INTO v_dupes FROM (
    SELECT l.sort FROM public.languages l GROUP BY l.sort HAVING count(*) > 1
  ) d;
  IF v_dupes > 0 THEN
    RAISE EXCEPTION 'P1 FAILED: % duplicated sort value(s) remain', v_dupes;
  END IF;

  -- P2: the base language is first.
  SELECT l.sort INTO v_base_sort FROM public.languages l WHERE l.is_base;
  IF v_base_sort IS DISTINCT FROM 0 THEN
    RAISE EXCEPTION 'P2 FAILED: base language sort is % (expected 0)', v_base_sort;
  END IF;

  -- P3: a new language appends at max+1 (the shared helper both callers use).
  SELECT max(l.sort) INTO v_max FROM public.languages l;
  IF public.next_language_sort() <> v_max + 1 THEN
    RAISE EXCEPTION 'P3 FAILED: next_language_sort() is % (expected %)',
      public.next_language_sort(), v_max + 1;
  END IF;

  INSERT INTO public.languages (code, name_en, name_native)
  VALUES ('qtt', 'Proof scratch', 'Proof scratch');
  SELECT l.sort INTO v_got FROM public.languages l WHERE l.code = 'qtt';
  IF v_got <> v_max + 1 THEN
    RAISE EXCEPTION 'P3 FAILED: inserted language landed at % (expected %)', v_got, v_max + 1;
  END IF;
  DELETE FROM public.languages WHERE code = 'qtt';

  -- P4: the roster read is ordered by (sort, code).
  IF pg_get_functiondef('public.admin_list_languages()'::regprocedure)
     NOT LIKE '%ORDER BY l.sort, l.code%' THEN
    RAISE EXCEPTION 'P4 FAILED: roster read is not ordered by (sort, code)';
  END IF;

  RAISE NOTICE 'U4g-3 PROOFS OK (P1-P4)';
END $proof$;

INSERT INTO public.migration_marks(version) VALUES ('20260831090000') ON CONFLICT DO NOTHING;