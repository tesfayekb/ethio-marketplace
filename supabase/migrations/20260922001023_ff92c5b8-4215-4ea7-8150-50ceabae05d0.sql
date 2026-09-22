-- =====================================================================
-- D28 / M-SWATCH — A COLOUR IS DECLARED, NOT GUESSED.
--
-- Apply pairing: apply this file (fragment printed by the tool) → expect mark
-- 20260922100000 (above the current maximum 20260922094000).
--
-- WHY. The wizard's colour tray guesses ink from the option's own word
-- (`brown_beige`, `dog_black`). A catalogue value that is not an English colour
-- word therefore shows nothing, and a two-tone or patterned coat cannot be said
-- at all. D28 gives the option record an OPTIONAL `swatch` cell in exactly three
-- spellings:
--     #RRGGBB               one ink
--     #RRGGBB|#RRGGBB       two-tone
--     pattern:<name>        tabby · brindle · calico · tricolour ·
--                           multicolour · striped
-- Anything else is refused BY NAME (`badSwatch:…`): a colour word such as `red`
-- and a short hex such as `#GGG` never land.
--
-- WHAT THIS FILE DOES — three WHOLE re-declarations (INC-183), each censused
-- from the live definition immediately before this file was written:
--   1. public.attr_option_shape  — `swatch` joins the known option keys and is
--      validated; every other refusal word is byte-unchanged.
--   2. public.attr_option_norm_v2 — `swatch` joins the import DIFF, so a file
--      whose only change is a swatch plans as `changed` instead of reading as
--      applied and landing nothing (the INC-239 law for `facts`). An ABSENT or
--      EMPTY cell stays invisible, so a file that never mentions it is silent.
--   3. public.get_attribute_options — the public options read projects `swatch`,
--      so the posting form can show what the catalogue says.
-- The IMPORT GATE needs no column: the whole option record travels in the
-- existing `options` cell (the gate measures size only, DEC-045), and the export
-- emits each option record verbatim, so `swatch` round-trips already.
--
-- PROOFS (INC-222/INC-255): scratch rows only (`e2e-mswatch-*`), built and
-- deleted in this file, with a residue read-back.
-- =====================================================================

CREATE OR REPLACE FUNCTION public.attr_option_shape(p_key text, p_options jsonb)
 RETURNS text
 LANGUAGE plpgsql
 IMMUTABLE
 SET search_path TO 'public'
AS $function$
DECLARE
  v_opt     jsonb;
  v_val     text;
  v_k       text;
  v_alias   text;
  v_all     text[] := ARRAY[]::text[];
  v_n       int;
  v_b       jsonb;
  v_bmin    text;
  v_bmax    text;
  v_sw      text;
BEGIN
  IF p_options IS NULL OR jsonb_typeof(p_options) <> 'array' THEN RETURN NULL; END IF;

  FOR v_opt IN SELECT value FROM jsonb_array_elements(p_options)
  LOOP
    CONTINUE WHEN jsonb_typeof(v_opt) <> 'object';
    v_val := COALESCE(v_opt->>'value', '');

    FOR v_k IN SELECT k FROM jsonb_object_keys(v_opt) k
    LOOP
      IF v_k NOT IN ('value','label_en','label_am','parent','active','bounds','aliases','allowed','facts','swatch') THEN
        RETURN p_key || '|' || v_val || '|unknownOptionKey:' || v_k;
      END IF;
    END LOOP;

    IF v_opt ? 'active' AND jsonb_typeof(v_opt->'active') <> 'boolean' THEN
      RETURN p_key || '|' || v_val || '|activeNotBoolean';
    END IF;

    IF v_opt ? 'aliases' THEN
      IF jsonb_typeof(v_opt->'aliases') <> 'array' THEN
        RETURN p_key || '|' || v_val || '|aliasesNotArray';
      END IF;
      v_n := jsonb_array_length(v_opt->'aliases');
      IF v_n < 1 OR v_n > 5 THEN
        RETURN p_key || '|' || v_val || '|aliasesCount:' || v_n::text;
      END IF;
      FOR v_alias IN SELECT x.value #>> '{}' FROM jsonb_array_elements(v_opt->'aliases') x
      LOOP
        IF v_alias IS NULL THEN RETURN p_key || '|' || v_val || '|aliasNotString'; END IF;
        IF char_length(v_alias) < 1 OR char_length(v_alias) > 32 THEN
          RETURN p_key || '|' || v_val || '|aliasLength:' || v_alias;
        END IF;
        IF v_alias ~ '[[:cntrl:]]' THEN
          RETURN p_key || '|' || v_val || '|aliasControlChar';
        END IF;
        IF lower(v_alias) = ANY (v_all) THEN
          RETURN p_key || '|' || v_val || '|aliasDuplicate:' || v_alias;
        END IF;
        v_all := v_all || lower(v_alias);
      END LOOP;
      IF EXISTS (SELECT 1 FROM jsonb_array_elements(v_opt->'aliases') x
                  WHERE jsonb_typeof(x.value) <> 'string') THEN
        RETURN p_key || '|' || v_val || '|aliasNotString';
      END IF;
    END IF;

    IF v_opt ? 'bounds' THEN
      IF jsonb_typeof(v_opt->'bounds') <> 'object' THEN
        RETURN p_key || '|' || v_val || '|boundsNotObject';
      END IF;
      FOR v_k IN SELECT k FROM jsonb_object_keys(v_opt->'bounds') k
      LOOP
        v_b := v_opt->'bounds'->v_k;
        IF jsonb_typeof(v_b) <> 'object' THEN
          RETURN p_key || '|' || v_val || '|boundsNotObject:' || v_k;
        END IF;
        IF EXISTS (SELECT 1 FROM jsonb_object_keys(v_b) bk WHERE bk NOT IN ('min','max')) THEN
          RETURN p_key || '|' || v_val || '|boundsUnknownKey:' || v_k;
        END IF;
        v_bmin := v_b #>> '{min}';
        v_bmax := v_b #>> '{max}';
        IF v_bmin IS NOT NULL AND NOT public.attr_bound_ok(v_bmin) THEN
          RETURN p_key || '|' || v_val || '|boundsBadValue:' || v_bmin;
        END IF;
        IF v_bmax IS NOT NULL AND NOT public.attr_bound_ok(v_bmax) THEN
          RETURN p_key || '|' || v_val || '|boundsBadValue:' || v_bmax;
        END IF;
        IF v_bmin ~ '^-?[0-9]+(\.[0-9]+)?$' AND v_bmax ~ '^-?[0-9]+(\.[0-9]+)?$'
           AND v_bmin::numeric > v_bmax::numeric THEN
          RETURN p_key || '|' || v_val || '|boundsMinAboveMax:' || v_k;
        END IF;
      END LOOP;
    END IF;

    -- DEC-057 — `allowed` is an object of select-target keys to value lists.
    IF v_opt ? 'allowed' THEN
      IF jsonb_typeof(v_opt->'allowed') <> 'object' THEN
        RETURN p_key || '|' || v_val || '|allowedNotObject';
      END IF;
      IF (SELECT count(*) FROM jsonb_object_keys(v_opt->'allowed') ak) > 5 THEN
        RETURN p_key || '|' || v_val || '|allowedTooMany';
      END IF;
      FOR v_k IN SELECT k FROM jsonb_object_keys(v_opt->'allowed') k
      LOOP
        v_b := v_opt->'allowed'->v_k;
        IF jsonb_typeof(v_b) <> 'array' THEN
          RETURN p_key || '|' || v_val || '|allowedValuesNotArray:' || v_k;
        END IF;
        v_n := jsonb_array_length(v_b);
        IF v_n < 1 THEN
          RETURN p_key || '|' || v_val || '|allowedEmpty:' || v_k;
        END IF;
        IF v_n > 50 THEN
          RETURN p_key || '|' || v_val || '|allowedTooMany:' || v_k;
        END IF;
        IF EXISTS (SELECT 1 FROM jsonb_array_elements(v_b) x
                    WHERE jsonb_typeof(x.value) <> 'string') THEN
          RETURN p_key || '|' || v_val || '|allowedValuesNotArray:' || v_k;
        END IF;
        IF (SELECT count(DISTINCT x.value #>> '{}') FROM jsonb_array_elements(v_b) x) <> v_n THEN
          RETURN p_key || '|' || v_val || '|allowedDuplicate:' || v_k;
        END IF;
      END LOOP;
    END IF;

    -- D18 — `facts` is a PREFILL, never a rule: an object of attribute keys to
    -- a scalar or a list of strings, at most 20 entries. The validator never
    -- reads it; the options read projects it for the form. BOUNDS ENFORCE,
    -- FACTS PREFILL.
    -- INC-236 — the KEY charset is the DEFINITION-KEY charset
    -- (^[a-z0-9_][a-z0-9_-]{1,63}$, hyphens allowed, matching attribute_key),
    -- so a real definition key such as 'fuel_type-vehicles' is accepted. The
    -- refusal text is unchanged: badFacts:key:<k>.
    IF v_opt ? 'facts' THEN
      IF jsonb_typeof(v_opt->'facts') <> 'object' THEN
        RETURN p_key || '|' || v_val || '|badFacts:notObject';
      END IF;
      IF (SELECT count(*) FROM jsonb_object_keys(v_opt->'facts') fk) > 20 THEN
        RETURN p_key || '|' || v_val || '|badFacts:tooMany';
      END IF;
      FOR v_k IN SELECT k FROM jsonb_object_keys(v_opt->'facts') k
      LOOP
        IF v_k !~ '^[a-z0-9_][a-z0-9_-]{1,63}$' THEN
          RETURN p_key || '|' || v_val || '|badFacts:key:' || v_k;
        END IF;
        v_b := v_opt->'facts'->v_k;
        IF jsonb_typeof(v_b) = 'array' THEN
          v_n := jsonb_array_length(v_b);
          IF v_n < 1 OR v_n > 20 THEN
            RETURN p_key || '|' || v_val || '|badFacts:listLength:' || v_k;
          END IF;
          IF EXISTS (SELECT 1 FROM jsonb_array_elements(v_b) x
                      WHERE jsonb_typeof(x.value) <> 'string') THEN
            RETURN p_key || '|' || v_val || '|badFacts:listNotStrings:' || v_k;
          END IF;
        ELSIF jsonb_typeof(v_b) NOT IN ('string','number','boolean') THEN
          RETURN p_key || '|' || v_val || '|badFacts:value:' || v_k;
        END IF;
      END LOOP;
    END IF;

    -- D28 / M-SWATCH — WHAT COLOUR THIS OPTION IS, said by the catalogue. One
    -- STRING in exactly three spellings; anything else is refused by name, so a
    -- colour WORD ('red') or a short hex ('#GGG') can never land.
    IF v_opt ? 'swatch' THEN
      IF jsonb_typeof(v_opt->'swatch') <> 'string' THEN
        RETURN p_key || '|' || v_val || '|badSwatch:notString';
      END IF;
      v_sw := btrim(v_opt->>'swatch');
      IF v_sw = '' THEN
        RETURN p_key || '|' || v_val || '|badSwatch:empty';
      END IF;
      IF v_sw ~ '^pattern:' THEN
        v_k := lower(btrim(substring(v_sw from 9)));
        IF v_k NOT IN ('tabby','brindle','calico','tricolour','multicolour','striped') THEN
          RETURN p_key || '|' || v_val || '|badSwatch:pattern:' || v_k;
        END IF;
      ELSIF v_sw !~ '^#[0-9a-fA-F]{6}$'
        AND v_sw !~ '^#[0-9a-fA-F]{6}\|#[0-9a-fA-F]{6}$' THEN
        RETURN p_key || '|' || v_val || '|badSwatch:' || v_sw;
      END IF;
    END IF;
  END LOOP;

  RETURN NULL;
END $function$;

REVOKE ALL ON FUNCTION public.attr_option_shape(text, jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.attr_option_shape(text, jsonb) TO authenticated;
GRANT ALL ON FUNCTION public.attr_option_shape(text, jsonb) TO service_role;

CREATE OR REPLACE FUNCTION public.attr_option_norm_v2(p_options jsonb)
 RETURNS jsonb
 LANGUAGE sql
 IMMUTABLE
 SET search_path TO 'public'
AS $function$
  SELECT COALESCE(jsonb_agg(o.norm ORDER BY o.ord), '[]'::jsonb)
    FROM (
      SELECT x.ord,
             jsonb_build_object(
               'value',
                 btrim(COALESCE(CASE WHEN jsonb_typeof(x.value) = 'object'
                                     THEN x.value->>'value'
                                     ELSE x.value #>> '{}' END, '')),
               'label_en',
                 btrim(COALESCE(CASE WHEN jsonb_typeof(x.value) = 'object'
                                     THEN x.value->>'label_en' END, '')),
               'label_am',
                 btrim(COALESCE(CASE WHEN jsonb_typeof(x.value) = 'object'
                                     THEN x.value->>'label_am' END, '')),
               'parent',
                 btrim(COALESCE(CASE WHEN jsonb_typeof(x.value) = 'object'
                                     THEN x.value->>'parent' END, ''))
             )
             || CASE
                  WHEN jsonb_typeof(x.value) = 'object'
                   AND x.value ? 'active'
                   AND (x.value->'active') = 'false'::jsonb
                  THEN jsonb_build_object('active', 'false'::jsonb)
                  ELSE '{}'::jsonb
                END
             || CASE
                  WHEN jsonb_typeof(x.value) = 'object'
                   AND jsonb_typeof(x.value->'bounds') = 'object'
                   AND (x.value->'bounds') <> '{}'::jsonb
                  THEN jsonb_build_object('bounds', x.value->'bounds')
                  ELSE '{}'::jsonb
                END
             || CASE
                  WHEN jsonb_typeof(x.value) = 'object'
                   AND jsonb_typeof(x.value->'aliases') = 'array'
                   AND jsonb_array_length(x.value->'aliases') > 0
                  THEN jsonb_build_object('aliases', x.value->'aliases')
                  ELSE '{}'::jsonb
                END
             || CASE
                  WHEN jsonb_typeof(x.value) = 'object'
                   AND jsonb_typeof(x.value->'allowed') = 'object'
                   AND (x.value->'allowed') <> '{}'::jsonb
                  THEN jsonb_build_object('allowed', x.value->'allowed')
                  ELSE '{}'::jsonb
                END
             -- INC-239 — `facts` JOINS THE DIFF. An empty or absent object is
             -- invisible (so a file that never mentions facts stays silent),
             -- and any difference in the object is a `changed` verdict whose
             -- plan entry names `options`.
             || CASE
                  WHEN jsonb_typeof(x.value) = 'object'
                   AND jsonb_typeof(x.value->'facts') = 'object'
                   AND (x.value->'facts') <> '{}'::jsonb
                  THEN jsonb_build_object('facts', x.value->'facts')
                  ELSE '{}'::jsonb
                END
             -- D28 / M-SWATCH — `swatch` JOINS THE DIFF on the same law: an
             -- absent or empty cell is invisible; a changed swatch is a
             -- `changed` verdict, never a file that reads as applied and lands
             -- nothing (F4).
             || CASE
                  WHEN jsonb_typeof(x.value) = 'object'
                   AND jsonb_typeof(x.value->'swatch') = 'string'
                   AND btrim(x.value->>'swatch') <> ''
                  THEN jsonb_build_object('swatch', btrim(x.value->>'swatch'))
                  ELSE '{}'::jsonb
                END AS norm
        FROM jsonb_array_elements(
               CASE WHEN jsonb_typeof(p_options) = 'array'
                    THEN p_options ELSE '[]'::jsonb END
             ) WITH ORDINALITY AS x(value, ord)
       WHERE NOT (jsonb_typeof(x.value) = 'object' AND NOT (x.value ? 'value'))
    ) o;
$function$;

REVOKE ALL ON FUNCTION public.attr_option_norm_v2(jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.attr_option_norm_v2(jsonb) TO authenticated;
GRANT ALL ON FUNCTION public.attr_option_norm_v2(jsonb) TO service_role;

CREATE OR REPLACE FUNCTION public.get_attribute_options(p_attribute_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_opts jsonb;
  v_found boolean;
BEGIN
  SELECT true,
         coalesce((
           SELECT jsonb_agg(
                    jsonb_strip_nulls(jsonb_build_object(
                      'value',    o.value->>'value',
                      'label_en', o.value->>'label_en',
                      'label_am', o.value->>'label_am',
                      'parent',   o.value->>'parent',
                      'aliases',  CASE WHEN jsonb_typeof(o.value->'aliases') = 'array' THEN o.value->'aliases' END,
                      'bounds',   CASE WHEN jsonb_typeof(o.value->'bounds')  = 'object' THEN o.value->'bounds' END,
                      'allowed',  CASE WHEN jsonb_typeof(o.value->'allowed') = 'object' THEN o.value->'allowed' END,
                      'facts',    CASE WHEN jsonb_typeof(o.value->'facts')   = 'object' THEN o.value->'facts' END,
                      -- D28 / M-SWATCH — the declared colour, projected for the
                      -- posting form. A non-string cell is silence (the shape
                      -- rule refuses one at the door).
                      'swatch',   CASE WHEN jsonb_typeof(o.value->'swatch')  = 'string' THEN o.value->'swatch' END
                    ))
                    ORDER BY o.ordinality)
             FROM jsonb_array_elements(
                    CASE WHEN jsonb_typeof(a.options) = 'array' THEN a.options ELSE '[]'::jsonb END)
                  WITH ORDINALITY o(value, ordinality)
            WHERE coalesce((o.value->>'active')::boolean, true)
         ), '[]'::jsonb)
    INTO v_found, v_opts
    FROM public.attributes a
   WHERE a.id = p_attribute_id;

  IF NOT coalesce(v_found, false) THEN
    RAISE EXCEPTION 'attributeNotFound';
  END IF;

  RETURN jsonb_build_object(
    'options', v_opts,
    'version', public.get_attribute_options_version(p_attribute_id)
  );
END $function$;

REVOKE ALL ON FUNCTION public.get_attribute_options(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_attribute_options(uuid) TO anon, authenticated;
GRANT ALL ON FUNCTION public.get_attribute_options(uuid) TO service_role;

-- ---------------------------------------------------------------------
-- PROOF 1 — THE SHAPE RULE. Three spellings pass; a colour word, a short hex,
-- an unknown pattern, an empty cell and a non-string all refuse BY NAME.
-- ---------------------------------------------------------------------
DO $proof$
DECLARE
  v text;
  v_ok jsonb;
BEGIN
  FOR v_ok IN SELECT x FROM (VALUES
      ('[{"value":"black","swatch":"#111111"}]'::jsonb),
      ('[{"value":"black_white","swatch":"#111111|#ffffff"}]'::jsonb),
      ('[{"value":"cat_tabby","swatch":"pattern:tabby"}]'::jsonb),
      ('[{"value":"brindle","swatch":"pattern:brindle"}]'::jsonb),
      ('[{"value":"calico","swatch":"pattern:calico"}]'::jsonb),
      ('[{"value":"tri","swatch":"pattern:tricolour"}]'::jsonb),
      ('[{"value":"multi","swatch":"pattern:multicolour"}]'::jsonb),
      ('[{"value":"striped","swatch":"pattern:striped"}]'::jsonb),
      ('[{"value":"plain"}]'::jsonb)
    ) AS t(x)
  LOOP
    v := public.attr_option_shape('e2e-mswatch-key', v_ok);
    IF v IS NOT NULL THEN
      RAISE EXCEPTION 'PROOF 1 failed: % refused with %', v_ok, v;
    END IF;
  END LOOP;
  RAISE NOTICE 'PROOF 1a ok — single, two-tone, six patterns and an absent cell all pass';

  v := public.attr_option_shape('e2e-mswatch-key', '[{"value":"red","swatch":"red"}]'::jsonb);
  IF v IS DISTINCT FROM 'e2e-mswatch-key|red|badSwatch:red' THEN
    RAISE EXCEPTION 'PROOF 1b failed: a colour word answered %', v;
  END IF;
  v := public.attr_option_shape('e2e-mswatch-key', '[{"value":"x","swatch":"#GGG"}]'::jsonb);
  IF v IS DISTINCT FROM 'e2e-mswatch-key|x|badSwatch:#GGG' THEN
    RAISE EXCEPTION 'PROOF 1c failed: a short hex answered %', v;
  END IF;
  v := public.attr_option_shape('e2e-mswatch-key', '[{"value":"x","swatch":"pattern:plaid"}]'::jsonb);
  IF v IS DISTINCT FROM 'e2e-mswatch-key|x|badSwatch:pattern:plaid' THEN
    RAISE EXCEPTION 'PROOF 1d failed: an unknown pattern answered %', v;
  END IF;
  v := public.attr_option_shape('e2e-mswatch-key', '[{"value":"x","swatch":"  "}]'::jsonb);
  IF v IS DISTINCT FROM 'e2e-mswatch-key|x|badSwatch:empty' THEN
    RAISE EXCEPTION 'PROOF 1e failed: an empty cell answered %', v;
  END IF;
  v := public.attr_option_shape('e2e-mswatch-key', '[{"value":"x","swatch":7}]'::jsonb);
  IF v IS DISTINCT FROM 'e2e-mswatch-key|x|badSwatch:notString' THEN
    RAISE EXCEPTION 'PROOF 1f failed: a number answered %', v;
  END IF;
  RAISE NOTICE 'PROOF 1b-f ok — red, #GGG, pattern:plaid, blank and a number each refuse by name';

  -- Every other refusal word is unchanged: an unknown key still names itself.
  v := public.attr_option_shape('e2e-mswatch-key', '[{"value":"x","colour":"#111111"}]'::jsonb);
  IF v IS DISTINCT FROM 'e2e-mswatch-key|x|unknownOptionKey:colour' THEN
    RAISE EXCEPTION 'PROOF 1g failed: an unknown key answered %', v;
  END IF;
  RAISE NOTICE 'PROOF 1g ok — the unknown-key refusal is unchanged';
END $proof$;

-- ---------------------------------------------------------------------
-- PROOF 2 — THE DIFF. A swatch-only change is `changed`; an absent one is
-- silence.
-- ---------------------------------------------------------------------
DO $proof$
DECLARE
  a jsonb := '[{"value":"black","label_en":"Black"}]'::jsonb;
  b jsonb := '[{"value":"black","label_en":"Black","swatch":"#111111"}]'::jsonb;
  c jsonb := '[{"value":"black","label_en":"Black","swatch":"#222222"}]'::jsonb;
BEGIN
  IF public.attr_option_norm_v2(a) = public.attr_option_norm_v2(b) THEN
    RAISE EXCEPTION 'PROOF 2a failed: adding a swatch was invisible to the diff';
  END IF;
  IF public.attr_option_norm_v2(b) = public.attr_option_norm_v2(c) THEN
    RAISE EXCEPTION 'PROOF 2b failed: changing a swatch was invisible to the diff';
  END IF;
  IF public.attr_option_norm_v2(a) <> public.attr_option_norm_v2(a) THEN
    RAISE EXCEPTION 'PROOF 2c failed: the normalisation is unstable';
  END IF;
  IF public.attr_option_norm_v2(a)
     <> public.attr_option_norm_v2('[{"value":"black","label_en":"Black","swatch":"  "}]'::jsonb) THEN
    RAISE EXCEPTION 'PROOF 2d failed: a blank swatch cell was not silence';
  END IF;
  RAISE NOTICE 'PROOF 2 ok — a swatch added or changed is a diff; a blank cell is silence';
END $proof$;

-- ---------------------------------------------------------------------
-- PROOF 3 — THE PUBLIC READ, on a SCRATCH definition built and deleted here.
-- ---------------------------------------------------------------------
DO $proof$
DECLARE
  v_id  uuid;
  v_out jsonb;
  v_n   int;
BEGIN
  INSERT INTO public.attributes (attr_key, name_en, attr_type, options)
  VALUES ('e2e-mswatch-colour', 'e2e mswatch colour', 'single_select',
          '[{"value":"solid","label_en":"Solid","swatch":"#111111"},
            {"value":"duo","label_en":"Duo","swatch":"#111111|#ffffff"},
            {"value":"patterned","label_en":"Patterned","swatch":"pattern:tabby"},
            {"value":"bare","label_en":"Bare"}]'::jsonb)
  RETURNING id INTO v_id;

  v_out := public.get_attribute_options(v_id);
  IF (v_out->'options'->0->>'swatch') <> '#111111'
     OR (v_out->'options'->1->>'swatch') <> '#111111|#ffffff'
     OR (v_out->'options'->2->>'swatch') <> 'pattern:tabby'
     OR (v_out->'options'->3) ? 'swatch' THEN
    RAISE EXCEPTION 'PROOF 3 failed: the read projected %', v_out->'options';
  END IF;
  RAISE NOTICE 'PROOF 3 ok — the public read projects all three spellings, and nothing for a bare option';

  DELETE FROM public.attributes WHERE attr_key = 'e2e-mswatch-colour';
  SELECT count(*) INTO v_n FROM public.attributes WHERE attr_key LIKE 'e2e-mswatch-%';
  IF v_n <> 0 THEN
    RAISE EXCEPTION 'CLEANUP failed: % scratch rows remain', v_n;
  END IF;
  RAISE NOTICE 'CLEANUP ok — 0 scratch rows remain';
END $proof$;

-- ---------------------------------------------------------------------
-- READ-BACKS — each definition carries the new cell, and the ACLs are intact.
-- ---------------------------------------------------------------------
DO $readback$
DECLARE r record;
BEGIN
  FOR r IN
    SELECT p.proname,
           p.provolatile AS vol,
           p.prosecdef AS secdef,
           (position('swatch' in p.prosrc) > 0) AS has_swatch
      FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
     WHERE n.nspname = 'public'
       AND p.proname IN ('attr_option_shape','attr_option_norm_v2','get_attribute_options')
  LOOP
    IF NOT r.has_swatch THEN
      RAISE EXCEPTION 'READ-BACK failed: % carries no swatch', r.proname;
    END IF;
    RAISE NOTICE 'READ-BACK definition %: swatch present, volatility=% secdef=%',
      r.proname, r.vol, r.secdef;
  END LOOP;

  FOR r IN
    SELECT p.proname, unnest(p.proacl)::text AS ace
      FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
     WHERE n.nspname = 'public'
       AND p.proname IN ('attr_option_shape','attr_option_norm_v2','get_attribute_options')
  LOOP
    RAISE NOTICE 'READ-BACK acl % %', r.proname, r.ace;
  END LOOP;
END $readback$;

-- This file's own mark, above the current maximum 20260922094000.
INSERT INTO public.migration_marks (version)
VALUES ('20260922100000') ON CONFLICT DO NOTHING;