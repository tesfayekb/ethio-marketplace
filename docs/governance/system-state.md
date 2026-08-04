# System State

## Phases

- **Phase 0 (Foundation) — CLOSED 2026-07-29.** Docs foundation, CI guard skeleton,
  migration rulebook, migration 0001 (`public.countries`).
- **Phase 1 (Identity) — CLOSED 2026-08-04.**
  - P1-a identity schema (`user_directory`, `profiles`, signup trigger,
    `confirm_home_country`) — closed 2026-07-30; deny-proofs D1–D7.
  - P1-b i18n runtime (EN + AM, lazy locales, language switcher) — closed 2026-07-30.
  - P1-c email door (sign-up, sign-in, verification, callback, resend hardening) —
    closed 2026-07-30; E2E A/B/C classes.
  - P1-d Google door (minimal scopes, REQ-015 linking semantics, D-8/D-10 evidence) —
    closed 2026-08-03.
  - P1-f settings surface (identity summary, sign-in methods, last-method server
    guard, INC-024 ghost-door fix) — closed 2026-08-03.
  - P1-g gate (identity truth model, password recovery, prod RLS/ACL re-proof,
    enforcing dependency-audit gate, guard-proof fixture refresh) — closed 2026-08-04.
  - Deferred by DEC-012 to the **Additional auth doors** phase: Telegram door,
    device/session list, multi-door settings.
- **Phase 2 (marketplace core) — NEXT, spec NOT STARTED.** Scope: listings,
  categories, geography per the GEO pre-decision (one canonical locations tree with
  `is_active` + RLS active-only visibility; the world list is an admin-side picking
  source, never a table), and the geo-scoped feed. Pass-2 spec opens in a new thread.

## The three standing supervisor reads

1. `docs/tracking/ci-status.md` — the two-step SHA check: read the file, then confirm
   its recorded commit matches the HEAD you cloned. A stale SHA means the verdict
   belongs to an older commit and proves nothing about the current one.
2. `docs/tracking/nightly-status.md` — the 48h staleness rule: a timestamp older than
   ~48 hours means the nightly schedule stopped, which is itself a failure.
3. **Guard Proof** (`.github/workflows/guard-proof.yml`) — dispatched and green at
   every phase gate; it proves the B-3 and C-4 guards fail against mutation fixtures,
   not merely that they pass on clean source.

## Standing environment facts

- Staging E2E mail sink: **Ethereal** (ruling R1). `E2E_EMAIL_SINK=1` gates the
  sign-up/recovery E2E cases.
- Production SMTP: Resend **test** domain until the launch-gate custom sending domain
  lands — only the account owner's address completes a real send today.
- Databases: `ethio-prod` (real) and `ethio-staging` (E2E target).

## Governing instructions

Claude Project v1.4 (project settings; intent mirrored in `governance.md`). Lovable
Knowledge: v3.1 + H2 (`docs/governance/lovable-knowledge.md`).

Launch-gate items: see `docs/governance/launch-gate.md`.

Updated: 2026-08-04
