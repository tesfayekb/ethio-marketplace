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

| Function                                | Gate                                           | Audit                 |
| --------------------------------------- | ---------------------------------------------- | --------------------- |
| `admin_list_audit(...)`                 | `audit_logs:view`                              | —                     |
| `admin_audit_facets()`                  | `audit_logs:view`                              | —                     |
| `admin_audit_stats(days)`               | `audit_logs:view`                              | —                     |
| `begin_impersonation(target, reason)`   | super-admin only + `impersonation:use` step-up | `impersonation.start` |
| `end_impersonation(session)`            | session owner                                  | `impersonation.end`   |
| `get_active_impersonation()`            | caller's own live session                      | —                     |
| `impersonated_get_profile(session)`     | live session box                               | —                     |
| `impersonated_list_listings(session,…)` | live session box                               | —                     |

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
  IMP-1 (open → banner → end), IMP-2 (dual-actor audit rows), IMP-3 and IMP-5
  (server refusals called straight from the browser client: IMP-3 the self
  target and a super-admin target, IMP-5 a caller who is not a super admin —
  split in turn C5 so that no test leases more than two pooled accounts,
  INC-555, DEC-174).

## Impersonation — model & roadmap

**v1 (shipped, DEC-016): read-only viewer.** The admin never becomes the target. Definer RPCs (impersonated_get_profile / impersonated_list_listings) verify an active, unexpired, actor-owned session row and return the target's data. Guardrails: super-admin only · step-up required · reason ≥ 5 chars · 15-minute box · dual-actor audit (impersonation.start / .end) · global banner with countdown and End now · read-only by construction (no write path exists). Rationale: zero token risk — nothing minted, nothing to leak, nothing to revoke.

**v2 (planned, DEC-021, Ops phase): full act-as with server-side write lock.** Gold standard (GitHub staff tooling, Stripe support, Intercom): a service-role edge function mints a ≤15-minute JWT for the target carrying an impersonator_id claim; the app runs as the target in an isolated /impersonate tab (token in memory only, never persisted); RLS write policies and every sensitive RPC refuse when impersonator_id is present — "see everything, change nothing" enforced by the database; auth-service operations (password/email/2FA) are unreachable from the impersonation context; both identities are audited on every read surface that logs; the session is revocable and the banner is permanent. Open considerations recorded for the DEC: user-visible transparency (the target's own security log lists staff views), and the write-guard census across every user-writable table before enabling.

**Why v1 first:** support needs (assist a user having an issue) are mostly read needs; the viewer delivers them with no minted credentials. DEC-021 upgrades to full perspective when the write-lock census can be done properly.

## 2026-09-11 — linter closers: six SECURITY DEFINER functions closed to anon/PUBLIC

Migration `20260911223744_9d74f733` (mark `20260911230000`) changes ACLs only, no
bodies. `has_permission(uuid,text,text)` and `get_my_permissions()` were callable
by PUBLIC (hence anon); they are now REVOKEd from PUBLIC and anon and GRANTed to
`authenticated` + `service_role` (no anon-role RLS policy calls either function —
verified against `pg_policies` before the change). The four guard bodies
`rls_auto_enable()`, `role_permissions_core_lock()`, `roles_system_lock()` and
`user_roles_protect()` are now callable by nobody directly; trigger firing does
not consult EXECUTE, and in-file proofs read back both the ACLs and the presence
of the three row triggers plus the event trigger.

Standing rulings for the remainder of linter 0028/0029: the five anon-callable
functions that remain (`get_browse_tree`, `get_category_attributes`,
`get_entity_bundle`, `get_ui_bundle`, `get_ui_bundle_version`) are the intentional
public catalog and gate-list reads (G1/I6) — they take no caller identity and
expose published rows only. The 108 authenticated-callable ones are the gated
admin doors of E7/F3, each carrying its own `has_permission` (and where required
step-up) gate. Two findings need operator action outside SQL: `pg_trgm` lives in
`public` (moving it would break the `gin_trgm_ops` indexes whose functions pin
`search_path = public`; accepted, no move), and leaked-password protection is an
Auth dashboard toggle on the external `ethio-prod` project.

## Bundle 11, group 2, turn G2b — the log and the impersonation view on the agreed blocks (D118, D128, D132)

- **The header** (`TableActions`, `audit-header`): the page's heading, "Audit & Security"; no header action (the log is read here, never written). The four figures and the 14-day chart stay under it.
- **The toolbar** (`audit-toolbar`): search (`audit-search`), Filters (`audit-filters`) with the action (`audit-filter-action`) and the entity type (`audit-filter-entity`) as pills — All, then every value the log holds (`admin_audit_facets`) — and the From and To dates (`audit-filter-from`, `audit-filter-to`) inside the sheet, which a focus change never closes (INC-543); Columns (`audit-columns`; the action locked); the chips under it (`audit-chips`, a date chip named "From …" / "To …").
- **One card per event below md**: the action, the actor under it, Time and Entity as facts; Details in the card's footer opens every pair inside the card (V2c); the raw details line stays in the table only.
- **The footer** (`audit-pagination`): the range (10,000+ past the cap, INC-129), rows per page (10, 25, 50, 100, kept in this browser under `ethio.admin.audit.pageSize`) and the pages; the server pages the log.
- **The impersonation view**: the heading ("Viewing as …") with the countdown in its header (`impersonation-header`); the read-only note and End now unchanged; the seller's listings with Columns (`impersonation-listings-columns`, the title locked), one card per listing below md (the title, its status as a soft pill, Price and Created as facts).
- Tests: AS-3 (new — the heading, the toolbar's order, the pills and the dates in Filters, a date chip, the action locked, the page size kept across a reload); IMP-1 (the header's heading and the listings' Columns).
- **G3a (INC-546):** the impersonation view's listings have their footer (`impersonation-listings-pagination`, page size kept under `ethio.admin.impersonation.pageSize`) and page through the door (`impersonated_list_listings` p_limit / p_offset); before it the view drew the first 25 with no way past them. IMP-1 reads the footer.
- **G3b (INC-547, INC-548; the operator's walk of G2b):** the events-per-day chart is drawn again — the frame mounted while its data loaded and its one measurement at mount found no plot (`ChartFrame` now measures the plot whenever it appears; AS-1 sees the bars). The dates in Filters are bounded: From is never after To or today, To never before From or after today; a date outside them is refused and the field keeps its value (AS-3). IMP-1 seeds one scratch listing for its seller (a pooled account is reaped to none), so the view's footer has a row to page: "1–1 of 1".
- **L1b (INC-549; the operator's walk of G3b):** From and To are the house date field — the app's own calendar, where a day after today, or a To before From, is greyed and cannot be chosen, and the month stops at the bounds; the two fields stack, each calendar opening under its field inside Filters. AS-3 picks through the calendar.
