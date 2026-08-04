# Password recovery + the identity truth model (P1-g)

Status: BUILT 2026-08-03.

Routes: `src/routes/auth.tsx` (the `forgot` view), `src/routes/auth_.reset.tsx`
(the recovery landing). Service: `src/features/auth/auth-service.ts`. Database:
`public.has_password()`, `public.remove_own_password()`.

## The truth model (operator ruling R2)

The sign-in-methods list shows **whatever exists**, not whatever is tidy. The
password is therefore its OWN row, answered by `public.has_password()` reading
`auth.users.encrypted_password` — never inferred from the presence of an `email`
identity row. The two can legitimately diverge, which is exactly why inference
was the wrong model:

- unlink the email identity → INC-024's trigger kills the password (both gone);
- recover a password on an account with no email identity → a password with no
  email identity row. Under the truth model this is a _state_, not a ghost: the
  settings list shows it and `remove_own_password()` can remove it.

The ghost door was never "a password without an identity". It was "a credential
nothing displays and nobody can manage". The truth model closes that class by
construction rather than by forbidding the state.

## Password removal

`public.remove_own_password()` (SECURITY DEFINER, `search_path = public`,
EXECUTE granted to `authenticated` only) nulls the caller's password and
**refuses when it is the last way in** — an account with no other identity keeps
its password. That refusal is the authority; the disabled Remove control is
honesty only (law F3).

Proven live against ethio-prod, 2026-08-03, via
`bun run scripts/deny-tests/p1f-identity-unlink.ts --remove-password`
(throwaway user in the reserved `@ethio-e2e.invalid` namespace, deleted after):

```
PASS — has_password() reports TRUE before the attempt: returns true
PASS — remove_own_password() is REFUSED for a single-door account:
       refused: last sign-in method: removing the password would leave no way in
PASS — the password survived the refused attempt: has_password() = true
PASS — the password still signs in
```

## Reset request is neutral-always (ruling R4, B-3 class)

`requestPasswordReset` renders the same neutral confirmation for a registered
address, an unregistered address, and a transport error. It never reveals
whether an account exists, and it never reveals whether an account HAS a
password. Callers see one message; failures are logged, not surfaced as
different text. This is the same anti-enumeration posture as the B-3 sign-up
guard, and it is guarded by E2E spec R-2.

## E2E coverage

`e2e/auth-reset.spec.ts` (mobile-360 only, like the other auth logic specs):

- **R-2** — a registered and an unregistered address produce byte-identical
  neutral responses; no timing- or copy-based oracle.
- **R-3** — full recovery path: admin-minted recovery link → `/auth/reset` →
  new password set → the OLD password is rejected and the NEW one signs in.

`e2e/settings.spec.ts`:

- **S-4** — the password renders as its own method row saying a password exists,
  and Remove is disabled for a single-door account.

## Known limit

Production SMTP is not yet delivering, so the _send_ leg of recovery is proven
against staging (Ethereal sink, ruling R1) and by admin-minted links in CI. The
production send remains a launch-gate item alongside custom SMTP.
