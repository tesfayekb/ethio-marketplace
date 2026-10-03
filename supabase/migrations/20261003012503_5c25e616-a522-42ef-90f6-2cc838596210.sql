-- Bundle 2 corrective for 7423f49a (no redeclaration). Restores volatility from the last declarations before 7423f49a:
-- attr_contact_like IMMUTABLE (a35e45fa:38), validate_listing_attributes STABLE (a35e45fa:97),
-- validate_listing_draft STABLE (13cb1b22:40), listing_contact_refusals IMMUTABLE (9add760c:263),
-- attr_option_shape IMMUTABLE (ff92c5b8:40), cat_import_plan STABLE (8d182773:9). ALTER only: grants unchanged.
ALTER FUNCTION public.attr_contact_like(text) IMMUTABLE;
ALTER FUNCTION public.validate_listing_attributes(uuid, jsonb, jsonb, text[]) STABLE;
ALTER FUNCTION public.validate_listing_draft(uuid, smallint, uuid, text, text, text, jsonb, text, numeric, character, text, timestamptz, uuid[], jsonb, jsonb, integer, boolean) STABLE;
ALTER FUNCTION public.listing_contact_refusals(jsonb) IMMUTABLE;
ALTER FUNCTION public.attr_option_shape(text, jsonb) IMMUTABLE;
ALTER FUNCTION public.cat_import_plan(jsonb, text) STABLE;

-- INC-321 healer pattern (20260928140742): record 7423f49a's filename stamp.
INSERT INTO public.migration_marks (version) VALUES ('20261003005802') ON CONFLICT DO NOTHING;

DO $proof$
DECLARE v text;
BEGIN
  SELECT string_agg(p.provolatile::text, ',' ORDER BY o.n) INTO v
    FROM unnest(ARRAY['attr_contact_like','validate_listing_attributes','validate_listing_draft',
                      'listing_contact_refusals','attr_option_shape','cat_import_plan','set_listing_pin'])
         WITH ORDINALITY AS o(name, n)
    JOIN pg_proc p ON p.proname = o.name AND p.pronamespace = 'public'::regnamespace;
  IF v IS DISTINCT FROM 'i,s,s,i,i,s,v' THEN
    RAISE EXCEPTION 'PROOF volatility: got %', v;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261003000000')
     OR NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261003005802') THEN
    RAISE EXCEPTION 'PROOF ledger: 20261003000000 or 20261003005802 missing';
  END IF;
  IF current_setting('plpgsql.check_asserts', true) = 'off' THEN
    RAISE EXCEPTION 'PROOF asserts: plpgsql.check_asserts is off';
  END IF;
END
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261003030000') ON CONFLICT DO NOTHING;