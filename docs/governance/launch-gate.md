# Launch-Gate Checklist (pre-real-users; none blocking current dev)

- Custom SMTP sending domain in Resend (verify a domain; replace onboarding@resend.dev) — until then only the account-owner's address can complete signup.
- Dev/preview database separation — partially satisfied by ethio-staging; confirm dev vs prod story before real users.
- Leaked-password protection toggle (Supabase Auth) — Pro-plan gated; enable on upgrade.
- Cloudflare Turnstile account + enable CAPTCHA toggle (DEC-010).
- Rotate the ethio-staging service-role key (it transited a chat during E2E setup) — precautionary.
- Update Supabase redirect URLs + Site URL from the Lovable preview/published URL to ethio.com at domain cutover.
- Lovable project: Hide-badge ON, Visitor-analytics OFF (currently analytics ON on the real project — square before launch), Auto-fix-security OFF (keep).
- EXIF strip live before any image-upload feature ships (DEC-009 — phase-gate, not launch-gate, but tracked here for visibility).
- ECA registration / Ethiopia data partition — Ethiopia-entity milestone (DEC-008), ~year 1.
- Re-run D-8 and D-10 manually against the production project at launch gate, and after any Supabase Auth/GoTrue version change, per docs/features/auth-google-door.md. The linking behaviour is a dependency's, not ours, and has no automated coverage.
- Native-speaker review of all Amharic auth copy (supervisor verified meaning only, not register/tone).

