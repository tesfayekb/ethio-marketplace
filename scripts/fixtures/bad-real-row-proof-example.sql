-- Fixture for the real-row proof guard (INC-445): a proof that reads a real user.
DO $proof$
DECLARE v uuid;
BEGIN
  SELECT id INTO v FROM auth.users ORDER BY created_at LIMIT 1;
END $proof$;
