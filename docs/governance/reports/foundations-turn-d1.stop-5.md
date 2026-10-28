# Foundations turn D1 — stop 5: M4 (INC-951 part 3a) applied on ethio-prod

- File: `supabase/migrations/20261028230748_23f4ae4e-f7bc-4a94-a8ef-24cbddcb47a6.sql`. It applied on the first attempt.
- Mark: `20261029040000`. Under G39 the hour is 23:07 → 00:00 + 1 h = 01:00, but 01:00–03:00 are taken, so this is the next free hour. Read back on ethio-prod → `20261029040000`.
- Dials read back (`rate_dials`): `impersonation=30/86400, import_audit=600/3600, legal_accept=60/3600, legal_export=60/3600, photo_remove=100/86400`.

## The five doors

Each was redeclared whole from its live text (read once at 23:05 UTC), with one gate line added: `IF NOT coalesce((public.rate_gate('<dial>')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;`.

The md5 of each live `pg_get_functiondef` equals the md5 of its scratch text:

| Door | Gate placed | md5 |
|---|---|---|
| import_gate_audit | after the permission check, before the audit INSERT | `7ffcaa7eb67037b97f8eab10ff63a559` |
| accept_legal | after `assert_caller_active()`, before the list checks (one call counts once) | `44278ea2d2839116d7be1a564f022649` |
| remove_listing_photo | after "photo not found on this listing", before the UPDATE/DELETE/INSERT | `2c1c8b36240dd7b1a984f3db1bee655e` |
| begin_impersonation | after `require_step_up_if_needed('impersonation','use')`, before the INSERT and log_audit | `cca6da35a1558f46ec9e0431e9d393c4` |
| admin_export_legal_acceptances | inside `IF p_after_at IS NULL`, before its INSERT (only first pages count) | `c352547610fddb79893a055e7287e75c` |

- Headers are unchanged: plpgsql, VOLATILE, DEFINER, `{search_path=public}`.
- ACLs are unchanged: authenticated and service_role, with no anon access.
- The proof checks the headers and ACLs and RAISEs on any difference.

## Proofs

The sentinel `d1-m4-proof-ok` was reached. Setup:

- a scratch super_admin with aal2 and totp, as in the 20261005172453 pattern;
- a scratch target with a profile;
- `rate_overrides` set to 1 on each of the five actions;
- a scratch listing with two photos;
- two existing legal versions in force, read only, used inside the rolled-back block.

For each door, call 1 wrote its row, and call 2 raised `rateLimited` and wrote no row:

- `import_gate_audit`: one `import.preview` row in `audit_log`.
- `accept_legal`: one `legal_acceptances` row. Call 2 named the other version.
- `remove_listing_photo`: one photo left, and it is P2.
- `begin_impersonation`: one session. The first session was ended so that call 2 met the gate, not the "already active" check.
- `admin_export_legal_acceptances`: one `legal.acceptances_exported` row.

## New refusal census (callers, and the order each reaches the gate)

`rate_gate` also runs `assert_caller_active()`. That check was already on accept_legal and remove_listing_photo; it is new on the three staff doors.

| Door | Caller | When it is reached | What the caller does with `rateLimited` |
|---|---|---|---|
| import_gate_audit | `src/server/imports/gate.ts:793` (`audit`) | Called by `route.ts:244, 266, 275, 298, 313`, each **after** the preview/commit/undo work has finished | Logs `[ssr-error] … audit_failed` (`gate.ts:800`); the import's answer stands |
| accept_legal | `src/features/legal/legal-reader.ts:120` ← `legal-accept-screen.tsx` | Gate, then the existing refusals | Throws; the screen logs `[client-error] accept_legal` and shows `legal.accept.error` ("We could not record your acceptance. Try again.") |
| remove_listing_photo | `src/routes/api/listings/photos.$id.ts:102` | After the route's own `photoRemoveHour`/`photoRemoveDay` dials, which answer first | `removed = false`; the route's existing failure answer |
| begin_impersonation | `src/features/admin/impersonation/impersonation-service.ts:52` | Gate, then the existing refusals | Throws into the console page's existing error state |
| admin_export_legal_acceptances | `src/features/admin/legal/legal-service.ts:363` | Page 1 only | Throws into the legal console's existing export error |

None of these needs a new string. Each caller already answers with an existing message.

## Departure — needs a ruling

The draft said `gate.ts` would map the audit's `rateLimited` to the gate's rate refusal. I did **not** make that change. `import_gate_audit` runs after the import's work has been done and committed (`route.ts` lines above). Answering "rate limited" at that point would report a failure for work that succeeded (F4, no phantom answer either way).

As shipped, an import beyond 600 audit events an hour succeeds, and its audit row is refused. The refusal is logged (`audit_failed`), not silent.

The route allows 30 a minute per family, so a determined caller could reach that. The options:

- (a) keep this as shipped, with the log as the signal;
- (b) move the audit before the work, which is a route change outside this migration;
- (c) take the gate off this door.

## App

- `src/lib/dials.ts` gains five `countedBy: "door"` entries (`importAudit`, `legalAccept`, `photoRemoveDoor`, `impersonation`, `legalExport`), each equal to its row.
- Checks: eslint clean; `vitest run scripts/conformance/dials.test.ts src/lib`: 34 files, 177 tests passed. DIAL-2's snake_case shape holds.

## Other

- Linter: 233 findings, all from before this migration.
- Open:
  - M5–M7 follow on "continue".
  - The supervisor applies this file on ethio-staging. The proof needs two published, in-force, all-market legal versions there.
  - The departure above needs a ruling.
