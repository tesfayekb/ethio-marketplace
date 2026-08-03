-- INC-024 — ghost-password door.
-- Rule: unlink of the email identity kills the password with it, so the
-- sign-in-methods list is the whole truth.
-- GoTrue already behaves this way in the identity REPLACE path (evidence D-8);
-- this trigger extends the same semantics to the UNLINK path, which GoTrue leaves
-- the password alive in (proven live: providers=[google] with a working password).
CREATE OR REPLACE FUNCTION public.handle_email_identity_unlink()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Guard: only a genuine unlink that leaves the account alive on other doors.
  -- A cascade from full user deletion (identities emptied) is left alone.
  IF EXISTS (SELECT 1 FROM auth.identities WHERE user_id = OLD.user_id) THEN
    UPDATE auth.users
      SET encrypted_password = NULL, updated_at = now()
      WHERE id = OLD.user_id;
  END IF;
  RETURN OLD;
END; $$;

REVOKE ALL ON FUNCTION public.handle_email_identity_unlink() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.handle_email_identity_unlink() FROM anon;
REVOKE ALL ON FUNCTION public.handle_email_identity_unlink() FROM authenticated;

DROP TRIGGER IF EXISTS on_email_identity_unlinked ON auth.identities;
CREATE TRIGGER on_email_identity_unlinked
  AFTER DELETE ON auth.identities
  FOR EACH ROW
  WHEN (OLD.provider = 'email')
  EXECUTE FUNCTION public.handle_email_identity_unlink();

-- One-time correction: any password without an email identity is exactly the ghost
-- shape; today that is the operator's account (proven live).
UPDATE auth.users u
  SET encrypted_password = NULL, updated_at = now()
  WHERE (u.encrypted_password IS NOT NULL AND u.encrypted_password <> '')
    AND NOT EXISTS (
      SELECT 1 FROM auth.identities i
      WHERE i.user_id = u.id AND i.provider = 'email'
    );