# Feature: Audit & Security (Phase U3)

Two surfaces, one migration: the **audit-log viewer** with security stats, and
**impersonation v1** (DEC-016) built as a read-only surface with every
guardrail the decision named.

## Migration

`supabase/migrations/20260822073000_d748b282-1618-4d54-8c58-88f9e194130c.sql`
(self-marking, version `20260822073000`).

- `public.impersonation_sessions` — actor, target, reason, `expires_at`,
  `ended_at`. RLS enabled, **deny-all** to `anon`/`authenticated`; every read
  and write goes through definer RPCs. Personal-data rider not required (it
  holds no profile data beyond ids).
- Seed: `audit_logs:view` granted to `moderator`.

**RPCs** (all `SECURITY DEFINER`, `REVOKE ALL FROM PUBLIC, anon`,
`GRANT EXECUTE TO authenticated, service_role`)

| Function                                  | Gate                                   | Audit                 |
| ----------------------------------------- | -------------------------------------- | --------------------- |
| `admin_list_audit(...)`                   | `audit_logs:view`                      | —                     |
| `admin_audit_facets()`                    | `audit_logs:view`                      | —                     |
| `admin_audit_stats(days)`                 | `audit_logs:view`                      | —                     |
| `begin_impersonation(target, reason)`     | super-admin only + `impersonation:use` step-up | `impersonation.start` |
| `end_impersonation(session)`              | session owner                          | `impersonation.end`   |
| `get_active_impersonation()`              | caller's own live session              | —                     |
| `impersonated_get_profile(session)`       | live session box                       | —                     |
| `impersonated_list_listings(session,…)`   | live session box                       | —                     |

`begin_impersonation` refuses: a non-super caller, self-targets, super-admin
targets, a reason under 5 characters, a second concurrent session, and aal1
callers (INC-081 two-condition step-up). The box is exactly **15 minutes**;
`impersonation_target()` re-verifies owner + not-ended + not-expired on every
impersonated read, so an expired session degrades to a refusal, never to data.

## Client

- `src/features/admin/audit/audit-service.ts` / `use-audit.ts` — list, facets,
  stats. Keys start at `AUTH_DERIVED_ROOT` (U1g-3 purge law).
- `src/features/admin/audit/audit-page.tsx` — StatGrid + ChartFrame (14-day
  bars, no new dependency) + DataTable with filters, pagination and a
  DetailPanel for the selected event.
- `src/features/admin/impersonation/` — service, hooks, global banner,
  starter form (on the user detail page) and the read-only view at
  `/admin/impersonation/{sessionId}`.
- The banner is mounted in `src/components/app-shell.tsx`, so an open session
  is visible on **every** page and clears on expiry without a reload.

## Scope law — what v1 deliberately is NOT

There is no auth-level "act as": the actor's own session is never swapped, and
no write path runs on the target's behalf. Full act-as needs a minted session
for the target and is **deferred to an edge-function design**; until then the
surface reads the target's profile and listings through the definer RPCs above.

## Evidence

- In-migration proofs P0–P10 (self-target, super target, short reason,
  non-super caller, step-up, expiry, deny-all grants).
- `e2e/admin-audit.spec.ts` — AS-1/AS-2 (gating, stats, filters, overflow law),
  IMP-1 (open → banner → end), IMP-2 (dual-actor audit rows), IMP-3 (server
  refusals called straight from the browser client).
