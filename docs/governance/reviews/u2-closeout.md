# Phase U2 (Roles & Permissions console) — G19 close-out review · 2026-08-22

## Security

Every mutation passes has_permission + the two-condition step-up law (verified factor + fresh amr; superadmin not exempt); RP-6 proves the revocation path per INC-081. System roles and core rows stay immutable by trigger authority — the RPCs only add clean messages ahead of them. DEC-016's dangerous permissions (profiles:create/delete, impersonation:use) exist registered, step-up-flagged, granted to nobody. Deep links and under-privileged staff are refused live; the typed-role-key confirm guards against wrong-target deletion; deletion is member-gated server-side.

## Functionality

RP-1..10 green on both viewports; P1–P8 proven in-migration on prod and staging; role lifecycle end-to-end; matrix grant/revoke audited; ?role= deep link and member click-through; admin holds read-only console access by seed (mutations superadmin-only until granted).

## Performance

List and matrix are one RPC each with window counts; admin chunk isolated; bundle green; the suite grew past 270 executions while CI wall-clock held ~5 minutes sharded.

## Usability

The delete key renders beside the field that demands it; locks explain themselves in both locales; the matrix vocabulary is fully translated chrome (coverage-guarded); 360 renders grouped cards with no horizontal overflow; every walk finding became law.

## Handed forward (named)

Assignable-scope flag for custom-role grants (open question, operator); users search/status → URL; impersonation flow (U3, DEC-016 guardrails); mfa-spec helper unification; react-refresh warnings task; flake-family watch (instrumented).
