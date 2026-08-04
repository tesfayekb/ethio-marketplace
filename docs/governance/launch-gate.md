# Launch-Gate Checklist (pre-real-users; none blocking current dev)

## Infrastructure / providers

- Custom SMTP sending domain in Resend (verify a domain; replace the test domain) — until then only the account-owner's address can complete signup or recovery.
- Cloudflare Turnstile account + enable the CAPTCHA toggle (DEC-010); test keys are already decided for staging.
- Production Google OAuth client + consent-screen verification — the current client is still in Testing mode, so only listed test users can complete the Google door.
- Update Supabase redirect URLs + Site URL from the Lovable preview/published URL to ethio.com at domain cutover.
- Dev/preview database separation — partially satisfied by ethio-staging; confirm the dev vs prod story before real users.
- Leaked-password protection toggle (Supabase Auth) — Pro-plan gated; enable on upgrade.
- Lovable project settings: Hide-badge ON, Visitor-analytics OFF (currently ON on the real project — square before launch), Auto-fix-security OFF (keep).

## Secrets

- Rotate ALL service-role keys that transited tooling: the ethio-staging key (held in GitHub Actions) and the ethio-prod key (held in the Lovable secret store). Precautionary but mandatory before real users.

## Re-run at launch, and after any Supabase Auth / GoTrue version change

- D-8 and D-10 manually against the production project, per docs/features/auth-google-door.md. The linking behaviour is a dependency's, not ours, and has no automated coverage.
- `scripts/deny-tests/p1f-identity-unlink.ts --recheck` (both phases) for INC-024. Our unlink-kills-password trigger mirrors GoTrue's own replace-path semantics; if the dependency starts nulling the password itself, or changes `auth.identities` deletion behaviour, the trigger must be re-verified.
- Guard Proof workflow, to confirm the B-3/C-4 fixtures still bite against the current auth surface.

## Content / compliance

- Native-speaker review of all Amharic copy — auth, settings, and transactional emails (supervisor verified meaning only, not register/tone).
- EXIF strip live before any image-upload feature ships (DEC-009 — phase-gate, tracked here for visibility).
- ECA registration / Ethiopia data partition — Ethiopia-entity milestone (DEC-008), ~year 1.

## WATCH

- Ethereal accounts are **ephemeral**. If staging E2E mail fails unexpectedly, re-create the Ethereal credentials FIRST — before diagnosing the app, the harness, or Supabase.
