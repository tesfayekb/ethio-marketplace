# System State

Phase: 1 (Identity) — IN PROGRESS. Email door (P1-c) CLOSED. Next build step: P1-d (Google door).

E2E harness: ACCEPTED 2026-08-01 (Playwright, staging-targeted, runs on every push).

Auth-door E2E coverage: sign-up/check-email/throttle (A-1, A-2), sign-in errors and
enumeration indistinguishability (B-1..B-4), callback/replay/already-confirmed and
the INC-010a abuse-vector guard (C-1..C-4). See docs/features/auth-e2e-tests.md.

Per-push suite: 12 cases, all green. A-3 (resend exhaustion) needs real elapsed time
and runs NIGHTLY via .github/workflows/nightly-e2e.yml (06:00 UTC, plus
workflow_dispatch); its completion heartbeat is docs/tracking/nightly-status.md — a
timestamp older than ~48h means the schedule stopped. See docs/features/nightly-e2e.md.

Phase 1 gate blockers: (b) the B-3 and C-4 proof-of-bite checks are not yet executed.
They must clear before Phase 1 closes (G13).

Gates closed: Phase 0 (Foundation). Phase 1 remaining doors: P1-d Google, P1-e Telegram, P1-f settings, P1-g gate.

Governing instructions: Claude Project v1.4 (in project settings; mirrored intent in governance.md). Lovable Knowledge: v3.1 + H2 (docs/governance/lovable-knowledge.md).

Immediate open work: (1) P1-d Google door — thread the DEC-010 Turnstile token seam during auth work; (2) run the step-10 guard proof for B-3/C-4 on a machine with staging credentials and record the failure messages in docs/features/auth-e2e-tests.md.

Launch-gate items: see docs/governance/launch-gate.md.

HEAD at this update: the commit this change lands as.

CI observability: CI results are readable from the repo at docs/tracking/ci-status.md, written automatically by the CI Status Reporter workflow (docs/features/ci-status-reporter.md). The supervisor reads it on every verification clone as the primary CI check.

Updated: 2026-08-02
