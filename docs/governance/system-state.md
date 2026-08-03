# System State

Phase: 1 (Identity) — IN PROGRESS. Email door (P1-c) CLOSED. Google door (P1-d) CLOSED
2026-08-03 — built, E2E-guarded (G-1 scope-creep guard, G-2 presence), REQ-015 linking
proven by operator deny tests D-8/D-10 with live-DB evidence; D-9 deferred-named per
DEC-012 phase. Next build step: P1-f settings surface (trimmed per DEC-012: sessions
list, step-up, last-used, last-method-unremovable guard), then the Phase 1 gate (P1-g):
RLS posture review, dependency audit, guard-proof re-run.


Phase ladder amended by DEC-012 (2026-08-03): Telegram and multi-door settings moved to a
later "Additional auth doors" phase; Phase 1 closes after the Google door and the trimmed
settings surface. REQ-014 unchanged — all three doors still ship before launch.

E2E harness: ACCEPTED 2026-08-01 (Playwright, staging-targeted, runs on every push).

Auth-door E2E coverage: sign-up/check-email/throttle (A-1, A-2), sign-in errors and
enumeration indistinguishability (B-1..B-4), callback/replay/already-confirmed and
the INC-010a abuse-vector guard (C-1..C-4). See docs/features/auth-e2e-tests.md.

Per-push suite: 12 cases, all green. A-3 (resend exhaustion) needs real elapsed time
and runs NIGHTLY via .github/workflows/nightly-e2e.yml (06:00 UTC, plus
workflow_dispatch); its completion heartbeat is docs/tracking/nightly-status.md — a
timestamp older than ~48h means the schedule stopped. See docs/features/nightly-e2e.md.

Phase 1 gate blockers: NONE outstanding for the email door. Guard proof first passed
2026-08-03 (Guard Proof #3): B-3 and C-4 each proven in both directions — passing on
clean source, failing against mutation fixtures. Next build step: P1-d (Google door).

Gates closed: Phase 0 (Foundation). Phase 1 remaining doors: P1-d Google, P1-e Telegram, P1-f settings, P1-g gate.

Governing instructions: Claude Project v1.4 (in project settings; mirrored intent in governance.md). Lovable Knowledge: v3.1 + H2 (docs/governance/lovable-knowledge.md).

Immediate open work: (1) P1-d Google door — thread the DEC-010 Turnstile token seam during auth work; (2) dispatch .github/workflows/guard-proof.yml once and record the first successful run date in docs/features/guard-proof.md and docs/features/auth-e2e-tests.md.

Launch-gate items: see docs/governance/launch-gate.md.

HEAD at this update: the commit this change lands as.

CI observability: CI results are readable from the repo at docs/tracking/ci-status.md, written automatically by the CI Status Reporter workflow (docs/features/ci-status-reporter.md). The supervisor reads it on every verification clone as the primary CI check.

Updated: 2026-08-03
