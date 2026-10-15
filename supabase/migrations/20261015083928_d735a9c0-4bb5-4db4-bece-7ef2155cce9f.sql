-- Bundle 16 turn E1 (2026-10-15). Tier A. INC-632 — a single-pick question made multi-pick keeps every ad's answer.
-- e2e-areas: admin-attributes
--
-- A. attributes_type_lists() (NEW trigger function; SECURITY INVOKER, search_path public; revoked from every client role)
--    and its trigger attributes_type_lists (AFTER UPDATE OF attr_type ON public.attributes, FOR EACH ROW, only when the
--    type goes from single_select to multi_select). A multi-pick answer is a list (validate_listing_attributes, the
--    select branch), so an ad that answered the question with one pick would be refused at its next save and the
--    posting form would show nothing ticked. In the same statement as the type change, every ad (any status, not
--    deleted) that holds the question's key with one answer gets it as a one-answer list: a pick "a" becomes ["a"], an
--    "Other" with its words {"value":"other","text":…} becomes [{"value":"other","text":…}], an empty answer "" becomes [].
--    A list already held, or no answer, is left as it is. One audit row ('attribute.type_to_multi') names the question
--    and how many ads changed. Whatever makes the change — the catalogue import, the attribute editor, a migration — the
--    trigger runs. Other type changes are untouched (bundle 7: the editor names the holders an option removal affects
--    and does not block the save).
-- P. Proofs (RAISE EXCEPTION on any failure; a clean apply is the pass): the function's header and privileges; the
--    trigger's event, timing, level, column and condition. No proof writes a row. The behaviour is proven by AT-82
--    (e2e/admin-attributes-safety.spec.ts) on scratch rows.

-- ===== A — attributes_type_lists =====
CREATE OR REPLACE FUNCTION public.attributes_type_lists()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO 'public'
AS $function$
DECLARE
  v_key   text := NEW.attr_key;
  v_count integer;
BEGIN
  UPDATE public.listings l
     SET attributes = jsonb_set(
           l.attributes, ARRAY[v_key],
           CASE WHEN jsonb_typeof(l.attributes -> v_key) = 'string' AND btrim(l.attributes ->> v_key) = ''
                THEN '[]'::jsonb
                ELSE jsonb_build_array(l.attributes -> v_key) END)
   WHERE l.deleted_at IS NULL
     AND l.attributes ? v_key
     AND jsonb_typeof(l.attributes -> v_key) IN ('string', 'object');
  GET DIAGNOSTICS v_count = ROW_COUNT;

  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
  VALUES (auth.uid(), 'attribute.type_to_multi', 'attribute', NEW.id::text,
          jsonb_build_object('attr_key', v_key, 'listings', v_count));
  RETURN NULL;
END $function$;
REVOKE ALL ON FUNCTION public.attributes_type_lists() FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS attributes_type_lists ON public.attributes;
CREATE TRIGGER attributes_type_lists
  AFTER UPDATE OF attr_type ON public.attributes
  FOR EACH ROW
  WHEN (OLD.attr_type = 'single_select' AND NEW.attr_type = 'multi_select')
  EXECUTE FUNCTION public.attributes_type_lists();

-- ===== P — proofs (RAISE EXCEPTION on any failure; a clean apply is the pass) =====
DO $proof$
DECLARE
  v_n   integer;
  v_def text;
BEGIN
  -- P1. The function: SECURITY INVOKER, search_path public, no client role may call it.
  SELECT count(*) INTO v_n FROM pg_proc
   WHERE oid = 'public.attributes_type_lists()'::regprocedure
     AND NOT prosecdef AND proconfig = ARRAY['search_path=public'];
  IF v_n <> 1 THEN RAISE EXCEPTION 'B16E1 P1: attributes_type_lists is not SECURITY INVOKER with search_path public'; END IF;
  IF has_function_privilege('anon', 'public.attributes_type_lists()', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.attributes_type_lists()', 'EXECUTE') THEN
    RAISE EXCEPTION 'B16E1 P1: a client role may call attributes_type_lists';
  END IF;

  -- P2. The trigger: AFTER UPDATE OF attr_type, row by row, only from single_select to multi_select.
  SELECT pg_get_triggerdef(t.oid) INTO v_def
    FROM pg_trigger t
   WHERE t.tgrelid = 'public.attributes'::regclass AND t.tgname = 'attributes_type_lists' AND NOT t.tgisinternal;
  IF v_def IS NULL
     OR position('AFTER UPDATE OF attr_type ON public.attributes FOR EACH ROW' IN v_def) = 0
     OR position('''single_select''' IN v_def) = 0
     OR position('''multi_select''' IN v_def) = 0
     OR position('EXECUTE FUNCTION attributes_type_lists()' IN v_def) = 0 THEN
    RAISE EXCEPTION 'B16E1 P2: the trigger is not as declared: %', coalesce(v_def, 'missing');
  END IF;
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261016000000') ON CONFLICT (version) DO NOTHING;
