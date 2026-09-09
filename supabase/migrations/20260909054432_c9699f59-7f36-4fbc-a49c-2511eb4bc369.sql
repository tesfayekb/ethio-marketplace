-- IMPORT-GATE PART B — the shared import library (import_lib).
-- APPLY-PAIRING: this migration pairs with src/server/imports/{gate,registry}.ts.
-- Every function declared here restates its closers in-file (A8) and the ACL
-- is read back at the end of the migration.

/* ------------------------------------------------------------------ *
 * 1. CELL HYGIENE — one definition of "clean text" for every family.  *
 * ------------------------------------------------------------------ */

CREATE OR REPLACE FUNCTION public.import_norm_text(p_value text)
RETURNS text
LANGUAGE plpgsql
IMMUTABLE
SET search_path = public
AS $$
DECLARE
  v text := p_value;
BEGIN
  IF v IS NULL THEN RETURN NULL; END IF;
  -- NUL never reaches here: Postgres text cannot carry chr(0) at all, so the
  -- gate refuses a NUL-bearing file in JS before any payload is built.
  -- Unicode normalisation (NFC) so Ge'ez composed/decomposed forms compare equal.
  v := normalize(v, NFC);
  -- Strip C0/C1 controls except tab/newline, bidi overrides (U+202A..U+202E,
  -- U+2066..U+2069) and zero-width characters (U+200B..U+200F, U+FEFF).
  v := regexp_replace(v, '[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]', '', 'g');
  v := regexp_replace(v, '[\u202A-\u202E\u2066-\u2069]', '', 'g');
  v := regexp_replace(v, '[\u200B-\u200F\uFEFF]', '', 'g');
  RETURN btrim(v);
END;
$$;

REVOKE ALL ON FUNCTION public.import_norm_text(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.import_norm_text(text) TO authenticated;
GRANT ALL ON FUNCTION public.import_norm_text(text) TO service_role;

CREATE OR REPLACE FUNCTION public.import_norm_bool(p_value text)
RETURNS boolean
LANGUAGE plpgsql
IMMUTABLE
SET search_path = public
AS $$
DECLARE
  v text := lower(coalesce(public.import_norm_text(p_value), ''));
BEGIN
  IF v = '' THEN RETURN NULL; END IF;
  IF v IN ('true', 't', 'yes', 'y', '1') THEN RETURN true; END IF;
  IF v IN ('false', 'f', 'no', 'n', '0') THEN RETURN false; END IF;
  RAISE EXCEPTION 'import: not a boolean: %', v USING ERRCODE = '22P02';
END;
$$;

REVOKE ALL ON FUNCTION public.import_norm_bool(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.import_norm_bool(text) TO authenticated;
GRANT ALL ON FUNCTION public.import_norm_bool(text) TO service_role;

CREATE OR REPLACE FUNCTION public.import_norm_date(p_value text)
RETURNS date
LANGUAGE plpgsql
IMMUTABLE
SET search_path = public
AS $$
DECLARE
  v text := coalesce(public.import_norm_text(p_value), '');
BEGIN
  IF v = '' THEN RETURN NULL; END IF;
  IF v !~ '^\d{4}-\d{2}-\d{2}$' THEN
    RAISE EXCEPTION 'import: not an ISO date: %', v USING ERRCODE = '22007';
  END IF;
  RETURN v::date;
END;
$$;

REVOKE ALL ON FUNCTION public.import_norm_date(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.import_norm_date(text) TO authenticated;
GRANT ALL ON FUNCTION public.import_norm_date(text) TO service_role;

-- Generalises attr_option_norm's pipe handling: "a | b || c" -> {a,b,c}.
CREATE OR REPLACE FUNCTION public.import_norm_pipe(p_value text)
RETURNS text[]
LANGUAGE plpgsql
IMMUTABLE
SET search_path = public
AS $$
DECLARE
  v text := coalesce(public.import_norm_text(p_value), '');
  part text;
  out_arr text[] := ARRAY[]::text[];
BEGIN
  IF v = '' THEN RETURN out_arr; END IF;
  FOREACH part IN ARRAY string_to_array(v, '|') LOOP
    part := btrim(coalesce(public.import_norm_text(part), ''));
    IF part <> '' THEN out_arr := out_arr || part; END IF;
  END LOOP;
  RETURN out_arr;
END;
$$;

REVOKE ALL ON FUNCTION public.import_norm_pipe(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.import_norm_pipe(text) TO authenticated;
GRANT ALL ON FUNCTION public.import_norm_pipe(text) TO service_role;

-- The one slug/key law: ^[a-z0-9][a-z0-9_-]{1,63}$
CREATE OR REPLACE FUNCTION public.import_is_slug(p_value text)
RETURNS boolean
LANGUAGE sql
IMMUTABLE
SET search_path = public
AS $$
  SELECT coalesce(p_value, '') ~ '^[a-z0-9][a-z0-9_-]{1,63}$';
$$;

REVOKE ALL ON FUNCTION public.import_is_slug(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.import_is_slug(text) TO authenticated;
GRANT ALL ON FUNCTION public.import_is_slug(text) TO service_role;

-- Whole-payload sanitizer: every string leaf goes through import_norm_text.
CREATE OR REPLACE FUNCTION public.import_sanitize(p_payload jsonb)
RETURNS jsonb
LANGUAGE plpgsql
IMMUTABLE
SET search_path = public
AS $$
DECLARE
  result jsonb;
  item jsonb;
  k text;
BEGIN
  IF p_payload IS NULL THEN RETURN NULL; END IF;
  CASE jsonb_typeof(p_payload)
    WHEN 'string' THEN
      RETURN to_jsonb(public.import_norm_text(p_payload #>> '{}'));
    WHEN 'array' THEN
      result := '[]'::jsonb;
      FOR item IN SELECT jsonb_array_elements(p_payload) LOOP
        result := result || jsonb_build_array(public.import_sanitize(item));
      END LOOP;
      RETURN result;
    WHEN 'object' THEN
      result := '{}'::jsonb;
      FOR k IN SELECT jsonb_object_keys(p_payload) LOOP
        result := result || jsonb_build_object(k, public.import_sanitize(p_payload -> k));
      END LOOP;
      RETURN result;
    ELSE
      RETURN p_payload;
  END CASE;
END;
$$;

REVOKE ALL ON FUNCTION public.import_sanitize(jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.import_sanitize(jsonb) TO authenticated;
GRANT ALL ON FUNCTION public.import_sanitize(jsonb) TO service_role;

/* ------------------------------------------------------------------ *
 * 2. THE GATE'S AUDIT EVENT — one row per preview / commit / undo.    *
 * ------------------------------------------------------------------ */

CREATE OR REPLACE FUNCTION public.import_gate_audit(
  p_family text,
  p_event text,
  p_batch uuid,
  p_counts jsonb
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_actor uuid := auth.uid();
BEGIN
  IF v_actor IS NULL THEN
    RAISE EXCEPTION 'permission denied: not signed in' USING ERRCODE = '42501';
  END IF;
  IF coalesce(p_family, '') = '' OR p_event NOT IN ('preview', 'commit', 'undo', 'refused') THEN
    RAISE EXCEPTION 'import: unknown gate event' USING ERRCODE = '22023';
  END IF;

  INSERT INTO public.audit_log(actor_id, action, entity_type, entity_id, meta)
  VALUES (
    v_actor,
    'import.' || p_event,
    'import:' || p_family,
    p_batch,
    public.import_sanitize(coalesce(p_counts, '{}'::jsonb))
  );
END;
$$;

REVOKE ALL ON FUNCTION public.import_gate_audit(text, text, uuid, jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.import_gate_audit(text, text, uuid, jsonb) TO authenticated;
GRANT ALL ON FUNCTION public.import_gate_audit(text, text, uuid, jsonb) TO service_role;

/* ------------------------------------------------------------------ *
 * 3. THE LAW — no import door builds SQL from file text.              *
 * ------------------------------------------------------------------ */

DO $law$
DECLARE
  offender text;
BEGIN
  SELECT string_agg(p.proname, ', ')
    INTO offender
    FROM pg_proc p
    JOIN pg_namespace n ON n.oid = p.pronamespace
   WHERE n.nspname = 'public'
     AND (p.proname LIKE '%import%' OR p.proname LIKE '%export%')
     AND p.prosrc ~* '(^|[^_[:alnum:]])execute[[:space:]]';
  IF offender IS NOT NULL THEN
    RAISE EXCEPTION 'IMPORT-GATE: dynamic SQL found in import/export door(s): %', offender;
  END IF;
  RAISE NOTICE 'IMPORT-GATE: no dynamic SQL in any import/export door';
END;
$law$;

/* ------------------------------------------------------------------ *
 * 4. BEHAVIOURAL PROOF + ACL READ-BACK.                               *
 * ------------------------------------------------------------------ */

DO $proof$
BEGIN
  IF public.import_norm_text(E'a\u202Eb\u200Bc ') <> 'abc' THEN
    RAISE EXCEPTION 'IMPORT-GATE: bidi/zero-width stripping failed';
  END IF;
  IF public.import_norm_bool('YES') IS NOT TRUE THEN
    RAISE EXCEPTION 'IMPORT-GATE: boolean normaliser failed';
  END IF;
  IF public.import_norm_date('') IS NOT NULL THEN
    RAISE EXCEPTION 'IMPORT-GATE: empty date is not silence';
  END IF;
  IF public.import_norm_pipe('a | b ||c') <> ARRAY['a','b','c'] THEN
    RAISE EXCEPTION 'IMPORT-GATE: pipe normaliser failed';
  END IF;
  IF public.import_is_slug('has spaces') OR NOT public.import_is_slug('ok-slug_1') THEN
    RAISE EXCEPTION 'IMPORT-GATE: slug law failed';
  END IF;
  IF public.import_sanitize('{"a":"x\u200By"}'::jsonb) ->> 'a' <> 'xy' THEN
    RAISE EXCEPTION 'IMPORT-GATE: payload sanitizer failed';
  END IF;
  RAISE NOTICE 'IMPORT-GATE: import_lib behavioural proof passed';
END;
$proof$;

DO $acl$
DECLARE
  fn text;
BEGIN
  FOREACH fn IN ARRAY ARRAY[
    'public.import_norm_text(text)',
    'public.import_norm_bool(text)',
    'public.import_norm_date(text)',
    'public.import_norm_pipe(text)',
    'public.import_is_slug(text)',
    'public.import_sanitize(jsonb)',
    'public.import_gate_audit(text, text, uuid, jsonb)'
  ] LOOP
    IF has_function_privilege('anon', fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'IMPORT-GATE: anon can execute %', fn;
    END IF;
    IF NOT has_function_privilege('authenticated', fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'IMPORT-GATE: authenticated cannot execute %', fn;
    END IF;
    IF NOT has_function_privilege('service_role', fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'IMPORT-GATE: service_role cannot execute %', fn;
    END IF;
  END LOOP;
  RAISE NOTICE 'IMPORT-GATE: ACL read-back passed';
END;
$acl$;