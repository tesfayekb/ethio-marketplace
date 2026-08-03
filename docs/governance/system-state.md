# System State

Phase: 1 (Identity) — IN PROGRESS. Email door (P1-c) CLOSED. Google door (P1-d) CLOSED
2026-08-03. Settings surface (P1-f) CLOSED 2026-08-03 — built, E2E-guarded
(S-1..S-3), deny-proven (U-1 server refusal, U-2 unlink/relink, U-3 ghost door found
and fixed as INC-024 with scripted recheck). Next: P1-g Phase 1 gate — RLS posture
review of all Phase 1 tables with deny-case evidence, dependency-audit prompt,
guard-proof re-run, polish sweep (Google-link callback copy; email-unlink
password-deletion warning), then phase closure.

Phase ladder amended by DEC-012 (2026-08-03): Telegram and multi-door settings moved to a
later "Additional auth doors" phase; Phase 1 closes after the Google door and the trimmed
settings surface. REQ-014 unchanged — all three doors still ship before launch.

E2E harness: ACCEPTED 2026-08-01 (Playwright, staging-targeted, runs on every push).

Auth-door E2E coverage: sign-up/check-email/throttle (A-1, A-2), sign-in errors and
enumeration indistinguishability (B-1..B-4), callback/replay/already-confirmed and
the INC-010a abuse-vector guard (C-1..C-4), Google first-hop scope-creep and presence
guards (G-1, G-2), settings gate/sections/password rotation (S-1..S-3). See
docs/features/auth-e2e-tests.md and docs/features/settings-surface.md.

A-3 (resend exhaustion) needs real elapsed time and runs NIGHTLY via
.github/workflows/nightly-e2e.yml (06:00 UTC, plus workflow_dispatch); its completion
heartbeat is docs/tracking/nightly-status.md — a timestamp older than ~48h means the
schedule stopped. See docs/features/nightly-e2e.md.

Manual-only coverage (cannot run in CI): REQ-015 linking deny tests D-8/D-10 (D-9
deferred-named), settings deny tests U-1/U-2/U-3, and the email-change double
confirmation. All are pinned to the launch gate.

Phase 1 gate blockers: NONE outstanding. Guard proof first passed 2026-08-03 (Guard
Proof #3): B-3 and C-4 each proven in both directions — passing on clean source,
failing against mutation fixtures.

Gates closed: Phase 0 (Foundation). Phase 1 remaining: P1-g gate. Deferred to the
Additional-auth-doors phase: Telegram door, device/session list, multi-door settings.

Governing instructions: Claude Project v1.4 (in project settings; mirrored intent in governance.md). Lovable Knowledge: v3.1 + H2 (docs/governance/lovable-knowledge.md).

Immediate open work: (1) dispatch
.github/workflows/guard-proof.yml once and record the first successful run date in
docs/features/guard-proof.md and docs/features/auth-e2e-tests.md.

Launch-gate items: see docs/governance/launch-gate.md.

HEAD at this update: the commit this change lands as.

CI observability: CI results are readable from the repo at docs/tracking/ci-status.md, written automatically by the CI Status Reporter workflow (docs/features/ci-status-reporter.md). The supervisor reads it on every verification clone as the primary CI check.

Updated: 2026-08-03
