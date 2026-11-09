-- Fixture for the real-row proof guard's reference picks (INC-1040): a proof that picks a real language by its order.
DO $proof$
DECLARE
  v_lang text := (SELECT code FROM public.languages ORDER BY code LIMIT 1);
BEGIN
  PERFORM v_lang;
END $proof$;
