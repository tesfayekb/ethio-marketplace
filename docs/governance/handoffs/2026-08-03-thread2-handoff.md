# HANDOFF — ethio.com — 2026-08-03 — Thread 2 (Phase 1 Identity; email-door guards PROVEN; pre-P1-d)

> HANDOFF IDENTITY (for disambiguation as more accumulate):
>
> - Handoff #: 2
> - Date: 2026-08-03
> - Author thread: "Thread 2" (CI observability → auth-door E2E backfill → guard proof)
> - Repo HEAD at handoff: the commit this file lands as (the previous recorded HEAD was
>   `3e15804`, the guard-proof JSON-capture fix). This MUST be re-verified by a fresh clone —
>   it may have advanced.
> - Phase: Phase 1 (Identity), IN PROGRESS. Email door (P1-c) CLOSED and its guards PROVEN.
> - Next build step: P1-d (Google door).

## 0. HOW TO USE THIS HANDOFF

Same rule as handoff #1: this ACCELERATES orientation, it does not replace the §2
session-start ritual. Clone fresh, read docs/governance/system-state.md → this handoff →
tail of docs/spec/spec-ledger.md session log → docs/\_changelog.md tail → `git log --oneline -10`,
then state HEAD SHA, phase, last closed step and next step to the operator before acting.
The repo is authoritative; chat memory is advisory.

## 1. WHAT CLOSED IN THIS THREAD

- **CI status reporter** — `.github/workflows/ci-status-report.yml` writes the latest CI
  result into `docs/tracking/ci-status.md` on `workflow_run`, so CI is readable from a
  fresh clone without the GitHub API. INC-011 (the reporter's own commits tripping the
  prettier gate) fixed by exempting the generated file and making the push trigger ignore it.
- **Auth-door E2E backfill** — the A (sign-up/check-email/throttle), B (sign-in errors and
  enumeration indistinguishability) and C (callback/replay/already-confirmed/INC-010a)
  cases, plus shared helpers in `e2e/helpers/` so P1-d and P1-e extend rather than copy-paste.
- **Mailtrap sandbox as ethio-staging SMTP** — unblocked the sign-up cases (INC-013), which
  the Resend test domain had made impossible.
- **INC-017 cooldown-on-click** — the resend throttle now engages when the control is
  clicked, not when the send succeeds. This was a real security fix, not a test fix.
- **A-3 moved to nightly** — resend exhaustion needs real elapsed time; virtual time proved
  unworkable (INC-015, INC-019, INC-020). It now runs in a scheduled job with a heartbeat file.
- **Guard-proof harness — PROVEN.** B-3 and C-4 each pass on clean source and fail against a
  mutation fixture, judged from Playwright's JSON report rather than an exit code (INC-021).
  First successful run: **Guard Proof #3, 2026-08-03**. This cleared the last Phase 1 gate
  blocker for the email door.

## 2. THE THREE STANDING STATUS FILES (read every clone)

1. **`docs/tracking/ci-status.md`** — per-push CI result, written automatically. Check the
   recorded commit SHA against `git log`: a stale SHA means the reporter, not CI, is telling
   you about an older run. Treat SHA-currency as part of reading it.
2. **`docs/tracking/nightly-status.md`** — heartbeat for the nightly real-time E2E job
   (A-3). A timestamp older than ~48h means the schedule stopped; that is a failure signal
   even though nothing is red.
3. **Guard Proof** (`.github/workflows/guard-proof.yml`) — `workflow_dispatch` only, never on
   push. Re-run it at every phase gate and after any change to the sign-in error surface or
   the callback surface. Its result is recorded in `docs/features/guard-proof.md` and
   `docs/features/auth-e2e-tests.md`.

## 3. ENVIRONMENT FACTS A SUCCESSOR NEEDS

- ethio-staging SMTP is a **Mailtrap sandbox inbox**: it accepts any recipient and delivers
  to no real mailbox. This is what makes the sign-up E2E cases runnable at all.
- Staging email rate limit is raised to **3600/h**.
- Supabase still enforces roughly **60 seconds per address** regardless of that limit — pacing
  in the specs exists because of this, not because of the hourly cap.
- The **`E2E_EMAIL_SINK` repository variable** gates the sign-up cases. Unset it and A-1/A-2
  skip rather than fail.

## 4. OPEN ITEMS

- **P1-d (Google door) is next.** Thread the DEC-010 Turnstile token seam while working the
  auth surface.
- **Amharic auth-email templates are untested.** The Mailtrap sink makes email CONTENT
  assertions possible (template correctness, Amharic translation), but none are implemented.
  This is a separate decision, not silently in scope.
- **`src/routeTree.gen.ts` generator churn is known noise.** It is machine-generated and
  regenerates on route work; a diff there is not a report failure and is never hand-edited
  (see DEC-009 / INC-014, which moved the SSR `Register` augmentation into
  `src/types/router-register.d.ts` so the generator can no longer eat it).

## 5. SUPERVISOR ERRORS LOGGED THIS THREAD

D-008, D-009, D-010, D-011 and INC-021 were all supervisor calls that turned out wrong.

**The one lesson:** every one of them came from inferring server behaviour from the UI.
The virtual-clock design, the cooldown-on-success assumption, the exit-code-as-proof design —
each was a guess about what the runtime was doing, defended across several rounds. A single
Playwright trace answered in one read what four rounds of hypothesis could not. When behaviour
is in question, read the trace first; hypothesis is the last resort, not the first.

--- END HANDOFF #2 (2026-08-03) ---
