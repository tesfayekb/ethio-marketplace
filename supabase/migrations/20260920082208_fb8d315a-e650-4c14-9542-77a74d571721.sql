-- =====================================================================
-- R-CLEAN · INC-238 — THE CONDITION'S SIBLING-KEY CHARSET
--
-- CENSUS (INC-183, whole re-declaration):
--   attr_visible_when_ok  20260919134621_5561446d-c5e4-4f1d-b2cd-be775b848103.sql
--
-- The condition's `key` names a SIBLING DEFINITION, so it must accept the
-- DEFINITION-KEY charset `^[a-z0-9_][a-z0-9_-]{1,63}$` (hyphens allowed,
-- matching attribute_key and, since INC-236, the facts keys). Until now it
-- demanded `^[a-z][a-z0-9_]{1,63}$`, so a real hyphenated sibling such as
-- `fuel_type-vehicles` refused `badVisibleWhen:badShape`.
--
-- REFUSAL NAMES ARE UNCHANGED (badShape / self / unknownSibling / notInOptions):
-- only the charset widens, so every row that validates today still validates.
-- The function stays SECURITY INVOKER, IMMUTABLE (it backs the
-- category_attribute_links CHECK constraint) and restates its closers here
-- (INC-212).
-- =====================================================================

CREATE OR REPLACE FUNCTION public.attr_visible_when_ok(p_vw jsonb)
RETURNS boolean
LANGUAGE sql
IMMUTABLE
SET search_path = public
AS $$
  SELECT CASE
    WHEN p_vw IS NULL OR jsonb_typeof(p_vw) = 'null' THEN true
    WHEN jsonb_typeof(p_vw) <> 'object' THEN false
    WHEN EXISTS (SELECT 1 FROM jsonb_object_keys(p_vw) k WHERE k NOT IN ('key','in')) THEN false
    WHEN jsonb_typeof(p_vw->'key') <> 'string' THEN false
    WHEN COALESCE(p_vw->>'key','') !~ '^[a-z0-9_][a-z0-9_-]{1,63}$' THEN false
    WHEN jsonb_typeof(p_vw->'in') <> 'array' THEN false
    WHEN jsonb_array_length(p_vw->'in') < 1 OR jsonb_array_length(p_vw->'in') > 8 THEN false
    WHEN EXISTS (SELECT 1 FROM jsonb_array_elements(p_vw->'in') e
                  WHERE jsonb_typeof(e.value) <> 'string'
                     OR btrim(e.value #>> '{}') = '') THEN false
    ELSE true
  END;
$$;

REVOKE ALL ON FUNCTION public.attr_visible_when_ok(jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.attr_visible_when_ok(jsonb) TO authenticated;
GRANT ALL ON FUNCTION public.attr_visible_when_ok(jsonb) TO service_role;

-- ------------------------------------------------------------- THE PROOF
DO $proof$
BEGIN
  IF NOT public.attr_visible_when_ok(
       '{"key":"fuel_type-vehicles","in":["electric","plugin_hybrid"]}'::jsonb) THEN
    RAISE EXCEPTION 'P1 FAILED — a hyphenated sibling key still refuses';
  END IF;

  IF public.attr_visible_when_ok('{"key":"bad key!","in":["electric"]}'::jsonb) THEN
    RAISE EXCEPTION 'P1 FAILED — "bad key!" was accepted';
  END IF;

  -- the SHAPE rules are untouched (a MISSING `in` is left exactly as it was:
  -- the CASE falls through to ELSE, and widening the charset does not change it)
  IF public.attr_visible_when_ok('{"key":"fuel_type","in":[]}'::jsonb) THEN
    RAISE EXCEPTION 'P1 FAILED — an empty value list was accepted';
  END IF;
  IF public.attr_visible_when_ok('{"key":"fuel_type","in":["x"],"extra":1}'::jsonb) THEN
    RAISE EXCEPTION 'P1 FAILED — an unknown key was accepted';
  END IF;
  IF public.attr_visible_when_ok('{"key":"-leading","in":["x"]}'::jsonb) THEN
    RAISE EXCEPTION 'P1 FAILED — a leading hyphen was accepted';
  END IF;
  IF NOT public.attr_visible_when_ok(NULL) THEN
    RAISE EXCEPTION 'P1 FAILED — no condition must be valid';
  END IF;

  RAISE NOTICE 'P1 PASSED — the sibling key accepts the definition-key charset.';
END $proof$;

-- ---------------------------------------------------------- THE READ-BACK
DO $readback$
DECLARE v_src text; v_cfg text;
BEGIN
  SELECT p.prosrc, p.proconfig::text INTO v_src, v_cfg
    FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
   WHERE n.nspname = 'public' AND p.proname = 'attr_visible_when_ok';
  IF v_src NOT LIKE '%[a-z0-9_][a-z0-9_-]{1,63}%' THEN
    RAISE EXCEPTION 'READ-BACK FAILED — the charset was not applied';
  END IF;
  RAISE NOTICE 'READ-BACK OK — attr_visible_when_ok config=% md5=%', v_cfg, md5(v_src);
END $readback$;

-- --------------------------------------------------------------- THE MARK
INSERT INTO public.migration_marks (version)
VALUES ('20260920100000')
ON CONFLICT DO NOTHING;