-- MIGRATION MARK 20260924010000 — INC-272 · attr_split_option_cell single pass (WHOLE)
--
-- CAUSE (measured on prod, r21-electronics-definitions.csv, model-phones,
-- 363 records, 155,937 chars / 158,565 bytes): attr_split_option_cell ALONE hit
-- the statement timeout (57014 after 8.9 s). It read char i with substr(p_cell, i, 1);
-- on multibyte (Amharic) UTF-8 text each substr rescans from position 1, so the
-- walk was quadratic. The rest of attr_import_plan on the same records (sent as a JSON
-- array, splitter bypassed) planned in 1.44 s round trip.
-- FIX: iterate the characters once (FOREACH over string_to_array(p_cell, NULL)).
-- Semantics identical: split only at a pipe outside every string and bracket.
-- No SET LOCAL statement_timeout needed.

CREATE OR REPLACE FUNCTION public.attr_split_option_cell(p_cell text)
 RETURNS text[]
 LANGUAGE plpgsql
 IMMUTABLE
 SET search_path TO 'public'
AS $function$
DECLARE
  v_out    text[] := ARRAY[]::text[];
  v_cur    text := '';
  v_depth  int := 0;
  v_str    boolean := false;
  v_esc    boolean := false;
  v_ch     text;
BEGIN
  IF p_cell IS NULL THEN RETURN v_out; END IF;
  IF p_cell = '' THEN RETURN ARRAY['']::text[]; END IF;
  FOREACH v_ch IN ARRAY string_to_array(p_cell, NULL) LOOP
    IF v_str THEN
      v_cur := v_cur || v_ch;
      IF v_esc THEN
        v_esc := false;
      ELSIF v_ch = E'\\' THEN
        v_esc := true;
      ELSIF v_ch = '"' THEN
        v_str := false;
      END IF;
      CONTINUE;
    END IF;
    IF v_ch = '"' THEN
      v_str := true;
      v_cur := v_cur || v_ch;
      CONTINUE;
    END IF;
    IF v_ch IN ('{', '[') THEN
      v_depth := v_depth + 1;
    ELSIF v_ch IN ('}', ']') THEN
      v_depth := greatest(0, v_depth - 1);
    ELSIF v_ch = '|' AND v_depth = 0 THEN
      v_out := v_out || v_cur;
      v_cur := '';
      CONTINUE;
    END IF;
    v_cur := v_cur || v_ch;
  END LOOP;
  v_out := v_out || v_cur;
  RETURN v_out;
END $function$;

REVOKE ALL ON FUNCTION public.attr_split_option_cell(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.attr_split_option_cell(text) TO authenticated;
GRANT ALL ON FUNCTION public.attr_split_option_cell(text) TO service_role;

DO $proof$
DECLARE
  v_parts text[];
  v_cell  text;
  v_t0    timestamptz;
  v_ms    numeric;
BEGIN
  -- PROOF 1 — the same results as before.
  v_parts := public.attr_split_option_cell(
    '{"value":"black_tan","label_en":"Black | Tan","swatch":"#000000|#8B5A2B"}|{"value":"white","swatch":"#FFFFFF"}');
  IF v_parts IS DISTINCT FROM ARRAY['{"value":"black_tan","label_en":"Black | Tan","swatch":"#000000|#8B5A2B"}','{"value":"white","swatch":"#FFFFFF"}'] THEN
    RAISE EXCEPTION 'PROOF 1 failed: two-tone %', v_parts;
  END IF;
  v_parts := public.attr_split_option_cell('{"value":"a","label_en":"say \"a|b\""}|{"value":"b"}');
  IF v_parts IS DISTINCT FROM ARRAY['{"value":"a","label_en":"say \"a|b\""}','{"value":"b"}'] THEN
    RAISE EXCEPTION 'PROOF 1 failed: escaped quote %', v_parts;
  END IF;
  IF public.attr_split_option_cell('a=A|b=B|c=C') IS DISTINCT FROM ARRAY['a=A','b=B','c=C']
     OR public.attr_split_option_cell(NULL) IS DISTINCT FROM ARRAY[]::text[]
     OR public.attr_split_option_cell('') IS DISTINCT FROM ARRAY['']::text[] THEN
    RAISE EXCEPTION 'PROOF 1 failed: legacy/null/empty';
  END IF;
  RAISE NOTICE 'PROOF 1 ok — boundary semantics unchanged';

  -- PROOF 2 — an r21-sized multibyte cell (400 records, larger than 155,937 chars) splits fast.
  v_cell := rtrim(repeat('{"value":"samsung_galaxy_a_a26","label_am":"ጋላክሲ A26","label_en":"Galaxy A26 | x","facts":{"dual_sim":true,"operating_system":"android","network_technology":"5g","ram-phones-tablets":"6gb","screen_size-phones":"6_5_6_8","battery_capacity_mah":5000,"storage-phones-tablets":"128gb"},"allowed":{"operating_system":["android"],"network_technology":["5g"],"screen_size-phones":["6_5_6_8"]},"bounds":{"release_year":{"max":2025,"min":2025},"battery_capacity_mah":{"max":5000,"min":5000}},"aliases":["Galaxy A26"],"parent":"samsung_galaxy_a"}|', 400), '|');
  v_t0 := clock_timestamp();
  v_parts := public.attr_split_option_cell(v_cell);
  v_ms := extract(epoch FROM clock_timestamp() - v_t0) * 1000;
  IF cardinality(v_parts) <> 400 THEN
    RAISE EXCEPTION 'PROOF 2 failed: % records, expected 400', cardinality(v_parts);
  END IF;
  IF v_ms > 2000 THEN
    RAISE EXCEPTION 'PROOF 2 failed: % chars split in % ms (bound 2000)', length(v_cell), round(v_ms);
  END IF;
  RAISE NOTICE 'PROOF 2 ok — % chars, 400 records in % ms', length(v_cell), round(v_ms);

  -- READ-BACK — definition and ACL.
  IF NOT EXISTS (SELECT 1 FROM pg_proc WHERE oid = 'public.attr_split_option_cell(text)'::regprocedure
                 AND position('string_to_array(p_cell, NULL)' in prosrc) > 0
                 AND position('substr(' in prosrc) = 0) THEN
    RAISE EXCEPTION 'READ-BACK failed: body is not the single-pass reader';
  END IF;
  IF has_function_privilege('anon', 'public.attr_split_option_cell(text)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.attr_split_option_cell(text)', 'EXECUTE')
     OR NOT has_function_privilege('service_role', 'public.attr_split_option_cell(text)', 'EXECUTE') THEN
    RAISE EXCEPTION 'READ-BACK failed: ACL';
  END IF;
  RAISE NOTICE 'READ-BACK ok — single-pass body; anon denied, authenticated + service_role execute';
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('20260924010000') ON CONFLICT DO NOTHING;