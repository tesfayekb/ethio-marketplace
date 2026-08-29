# Phases U2b + U3 — G19 close-out review · 2026-08-29

## Security

Assignable-scope closes the privilege-escalation ladder server-side (18 reserved rows; clean refusals ahead of immutable triggers). Impersonation v1 is read-only by construction: no write path exists, sessions are actor-owned, box-verified, step-up-gated, dual-audited, and banner-visible; the audit surface itself is definer-gated (audit_logs:view) with the browser never touching audit_log. The harness epoch hardened the supply chain: platform injections meet the gates (INC-087), and the production artifact — not a dev server — is what CI certifies.

## Functionality

RP-1..12, AS suites, IMP-1..5, MF-1..7, AU-1..11 all green on both viewports against the built app; proofs P1–P8/P1–P5 in-migration on prod and staging; the full suite (≈290 executions) passes sharded and serially (nightly).

## Performance

Audit list/stats are one gated RPC each; the sparkline is shape-only with tiles carrying numbers; admin chunk isolation held; e2e serve dropped wrangler cold-downloads (DEC-019); CI wall-clock ~7–8m sharded including per-job builds.

## Usability

Inline row expansion is the tabular-detail law; the trend chart respects real estate; impersonation states its model honestly and documents the DEC-021 destination in-product docs; every operator walk finding this phase became a law with a test.

## Handed forward (named)

ACT-U3-1 (DEC-021 act-as at Ops; write-guard census prerequisite); DEC-020 implementation (next act); mfa-stepup spec shared-helper unification; react-refresh warnings task; name_am native review (now to be served by U4 Translations).
