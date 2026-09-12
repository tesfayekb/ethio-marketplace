-- DEC-050 L3a-mig — THE READER RETURNS THE v2 CELLS
-- INC-183 law: whole re-declaration, closers in-file, definition + ACL read-backs.
-- The reader belongs to the same surface as the export payload (L2b-mig) and the
-- doors (L1): the console cannot pre-fill — and would NULL out on update — what
-- the reader does not carry. `admin_upsert_attribute` assigns every v2 column
-- directly on UPDATE (no COALESCE), so an absent parameter WRITES NULL; that is
-- correct for the console, which always sends every field. The door is untouched.

/* ============ 1. THE READER (whole re-declaration) ======================== */
-- Same gate, same rows, same ORDER BY as 20260908041703_62e6566c…; the ten
-- existing columns are unchanged and eight v2 cells are appended.

DROP FUNCTION IF EXISTS public.admin_list_attributes();

CREATE OR REPLACE FUNCTION public.admin_list_attributes()
RETURNS TABLE(id uuid, attr_key text, name_en text, name_am text, attr_type text,
              options jsonb, help_text_en text, usage_count integer,
              depends_on_key text, created_at timestamp with time zone,
              unit text, min_bound text, max_bound text, decimals smallint,
              format text, preset text, max_length integer, help_text_am text)
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'view') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;

  RETURN QUERY
  SELECT a.id, a.attr_key, a.name_en, a.name_am, a.attr_type,
         a.options, a.help_text_en,
         (SELECT count(*)::int FROM public.category_attribute_links l
           WHERE l.attribute_id = a.id),
         (SELECT p.attr_key FROM public.attributes p WHERE p.id = a.depends_on),
         a.created_at,
         a.unit, a.min_bound, a.max_bound, a.decimals,
         a.format, a.preset, a.max_length, a.help_text_am
    FROM public.attributes a
   ORDER BY a.attr_key;
END $function$;

REVOKE ALL ON FUNCTION public.admin_list_attributes() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_list_attributes() TO authenticated;
GRANT ALL ON FUNCTION public.admin_list_attributes() TO service_role;

/* ============ 2. PROOFS (raise on failure) =============================== */

-- (i) TOTALITY — every existing row is returned with its CURRENT values.
--     The reader is gated, so the proof reads it as a real holder of
--     categories:view (auth.uid() from a transaction-local claim).
DO $p1$
DECLARE
  v_uid  uuid;
  v_cnt  int;
  v_rows int;
  v_bad  int;
BEGIN
  SELECT ud.user_id INTO v_uid
    FROM public.user_directory ud
   WHERE public.has_permission(ud.user_id, 'categories', 'view')
   LIMIT 1;
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'PROOF FAILED: no user holds categories:view';
  END IF;
  PERFORM set_config('request.jwt.claim.sub', v_uid::text, true);

  SELECT count(*) INTO v_cnt FROM public.attributes;
  SELECT count(*) INTO v_rows FROM public.admin_list_attributes();
  IF v_cnt <> v_rows THEN
    RAISE EXCEPTION 'PROOF FAILED: reader returned % rows for % definitions', v_rows, v_cnt;
  END IF;

  SELECT count(*) INTO v_bad
    FROM public.admin_list_attributes() r
    JOIN public.attributes a ON a.id = r.id
   WHERE r.attr_key     IS DISTINCT FROM a.attr_key
      OR r.name_en      IS DISTINCT FROM a.name_en
      OR r.attr_type    IS DISTINCT FROM a.attr_type
      OR r.options      IS DISTINCT FROM a.options
      OR r.help_text_en IS DISTINCT FROM a.help_text_en
      OR r.unit         IS DISTINCT FROM a.unit
      OR r.min_bound    IS DISTINCT FROM a.min_bound
      OR r.max_bound    IS DISTINCT FROM a.max_bound
      OR r.decimals     IS DISTINCT FROM a.decimals
      OR r.format       IS DISTINCT FROM a.format
      OR r.preset       IS DISTINCT FROM a.preset
      OR r.max_length   IS DISTINCT FROM a.max_length
      OR r.help_text_am IS DISTINCT FROM a.help_text_am;
  IF v_bad > 0 THEN
    RAISE EXCEPTION 'PROOF FAILED: % row(s) read back with different values', v_bad;
  END IF;
  RAISE NOTICE 'PROOF OK: % definition(s) returned with their current values', v_rows;

  PERFORM set_config('request.jwt.claim.sub', '', true);
END $p1$;

-- (ii) THE NEW CELLS ARE REALLY CARRIED. The table CHECKs bind number cells to
--      `number` and text cells to `text`, so no single row can hold all nine at
--      once: the proof uses one scratch number definition and one scratch text
--      definition, then removes both.
DO $p2$
DECLARE
  v_uid uuid;
  v_num uuid;
  v_txt uuid;
  v_r   record;
BEGIN
  SELECT ud.user_id INTO v_uid
    FROM public.user_directory ud
   WHERE public.has_permission(ud.user_id, 'categories', 'view')
   LIMIT 1;
  PERFORM set_config('request.jwt.claim.sub', v_uid::text, true);

  INSERT INTO public.attributes (attr_key, name_en, attr_type, unit, min_bound, max_bound,
                                 decimals, format, help_text_en, help_text_am)
  VALUES ('proof_l3a_number', 'proof l3a number', 'number', 'GB', '1', 'year+1',
          0, 'year', 'en help', 'የአማርኛ እርዳታ')
  RETURNING id INTO v_num;

  INSERT INTO public.attributes (attr_key, name_en, attr_type, preset, max_length,
                                 help_text_en, help_text_am)
  VALUES ('proof_l3a_text', 'proof l3a text', 'text', 'digits:15', 15,
          'en help', 'የአማርኛ እርዳታ')
  RETURNING id INTO v_txt;

  SELECT * INTO v_r FROM public.admin_list_attributes() WHERE id = v_num;
  IF v_r.unit IS DISTINCT FROM 'GB' OR v_r.min_bound IS DISTINCT FROM '1'
     OR v_r.max_bound IS DISTINCT FROM 'year+1' OR v_r.decimals IS DISTINCT FROM 0::smallint
     OR v_r.format IS DISTINCT FROM 'year' OR v_r.help_text_am IS DISTINCT FROM 'የአማርኛ እርዳታ' THEN
    RAISE EXCEPTION 'PROOF FAILED: number cells not returned (unit=%, min=%, max=%, dec=%, fmt=%)',
      v_r.unit, v_r.min_bound, v_r.max_bound, v_r.decimals, v_r.format;
  END IF;

  SELECT * INTO v_r FROM public.admin_list_attributes() WHERE id = v_txt;
  IF v_r.preset IS DISTINCT FROM 'digits:15' OR v_r.max_length IS DISTINCT FROM 15 THEN
    RAISE EXCEPTION 'PROOF FAILED: text cells not returned (preset=%, max_length=%)',
      v_r.preset, v_r.max_length;
  END IF;
  RAISE NOTICE 'PROOF OK: the reader carries every v2 cell';

  DELETE FROM public.attributes WHERE id IN (v_num, v_txt);
  IF EXISTS (SELECT 1 FROM public.attributes
              WHERE attr_key IN ('proof_l3a_number', 'proof_l3a_text')) THEN
    RAISE EXCEPTION 'PROOF FAILED: scratch definitions survived the proof';
  END IF;
  RAISE NOTICE 'PROOF OK: scratch definitions removed';

  PERFORM set_config('request.jwt.claim.sub', '', true);
END $p2$;

-- (iii) DEFINITION + ACL READ-BACKS.
DO $p3$
BEGIN
  IF pg_get_functiondef('public.admin_list_attributes()'::regprocedure)
       NOT LIKE '%a.unit, a.min_bound, a.max_bound, a.decimals,%' THEN
    RAISE EXCEPTION 'CLOSER FAILED: reader definition read-back missing the v2 cells';
  END IF;
  IF pg_get_functiondef('public.admin_list_attributes()'::regprocedure)
       NOT LIKE '%has_permission(auth.uid(), ''categories'', ''view'')%' THEN
    RAISE EXCEPTION 'CLOSER FAILED: reader lost its gate';
  END IF;
  IF has_function_privilege('anon', 'public.admin_list_attributes()', 'EXECUTE') THEN
    RAISE EXCEPTION 'CLOSER FAILED: anon can execute the reader';
  END IF;
  IF NOT has_function_privilege('authenticated', 'public.admin_list_attributes()', 'EXECUTE') THEN
    RAISE EXCEPTION 'CLOSER FAILED: authenticated cannot execute the reader';
  END IF;
  RAISE NOTICE 'READ-BACK OK: gate intact, v2 cells present, ACL (anon=no, authenticated=yes)';
END $p3$;

INSERT INTO public.migration_marks(version) VALUES ('20260912070000') ON CONFLICT DO NOTHING;