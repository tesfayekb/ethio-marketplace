-- =====================================================================
-- P1-g Step M — TRUTH MODEL for sign-in methods (ruling R2).
--
-- Rationale (R2): the sign-in-methods surface must render the WHOLE truth
-- about how an account can be entered. A password is an entry door whether or
-- not an 'email' identity row accompanies it (INC-024 proved the two can drift
-- apart). Rather than write to the auth schema to force the two back into
-- alignment, we EXPOSE the password's existence and give the owner a way to
-- remove it. A password that exists is therefore always VISIBLE — the "ghost
-- class" the P1-g recovery probe hunts for stops being a hiding place.
--
-- References:
--   INC-024 — ghost password surviving an email-identity unlink. Its AFTER
--             DELETE trigger public.handle_email_identity_unlink() REMAINS the
--             remove-direction guard for the IDENTITY path (unlink an email
--             identity -> its password dies). This migration adds the second
--             remove direction: remove the password directly, when there is no
--             email identity to unlink.
--   REQ/DEC  — P1-g rulings R1-R4 (see docs/spec/spec-ledger.md).
--
-- No trigger, column, policy or row in the auth schema is created or altered
-- here. Both functions are SECURITY DEFINER, act ONLY on auth.uid(), and are
-- executable only by the 'authenticated' role.
-- =====================================================================

-- Reports whether the CALLER has a usable password. Never reads another user.
create or replace function public.has_password()
returns boolean
language plpgsql
stable
security definer
set search_path = public
as $function$
DECLARE
  v_has boolean;
BEGIN
  IF auth.uid() IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  SELECT (encrypted_password IS NOT NULL AND encrypted_password <> '')
    INTO v_has
    FROM auth.users
   WHERE id = auth.uid();
  RETURN COALESCE(v_has, false);
END;
$function$;

-- Removes the CALLER's password. Last-method rule: refuses when the caller has
-- no non-email identity to fall back on, so removing the password can never
-- strand the account. This is the server-side authority (law F3); the disabled
-- control in the settings UI is honesty only.
create or replace function public.remove_own_password()
returns void
language plpgsql
security definer
set search_path = public
as $function$
BEGIN
  IF auth.uid() IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;

  IF NOT EXISTS (
    SELECT 1 FROM auth.identities
     WHERE user_id = auth.uid() AND provider <> 'email'
  ) THEN
    RAISE EXCEPTION 'last sign-in method: removing the password would leave no way in';
  END IF;

  UPDATE auth.users
     SET encrypted_password = NULL, updated_at = now()
   WHERE id = auth.uid();
END;
$function$;

comment on function public.has_password() is
  'P1-g truth model (R2): does the CALLER have a usable password? Used by the sign-in-methods surface so a password is never invisible. INC-024 companion.';
comment on function public.remove_own_password() is
  'P1-g truth model (R2): removes the CALLER''s password. Refuses unless a non-email identity remains (last-method rule). The INC-024 AFTER DELETE trigger on auth.identities remains the remove-direction guard for the identity path.';

revoke all on function public.has_password() from public;
revoke all on function public.has_password() from anon;
revoke all on function public.remove_own_password() from public;
revoke all on function public.remove_own_password() from anon;

grant execute on function public.has_password() to authenticated;
grant execute on function public.remove_own_password() to authenticated;