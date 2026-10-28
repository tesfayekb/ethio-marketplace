# Foundations turn D1 — stop 6 (M4b, INC-951: the import audit row written by the server)

## 1. What landed

- Migration `supabase/migrations/20261028231519_fd0c7d09-e0a4-40eb-b323-2a46a323708f.sql`,
  mark `20261029041000`. **apply fd0c7d09 → expect mark 20261029041000.**
- `import_gate_audit(text,text,uuid,jsonb)` DROPPED; `import_gate_audit(p_actor uuid, p_family text,
  p_event text, p_batch uuid, p_counts jsonb)` created. Body = the live M4 body byte for byte except
  `v_actor uuid := p_actor` and the removed M4 gate line (and its comment). Header unchanged
  (plpgsql, VOLATILE, SECURITY DEFINER, search_path public).
- ACL: `REVOKE ALL … FROM PUBLIC, anon, authenticated` · `GRANT EXECUTE … TO service_role`.
- `rate_dials` row `import_audit` deleted (its only counter is gone; `rate_overrides.action` cascades).

## 2. Read-back (ethio-prod)

- `import_gate_audit(uuid,text,text,uuid,jsonb)` only; ACL `postgres=X/postgres,service_role=X/postgres`.
- `rate_dials` `import_audit`: 0 rows. Mark `20261029041000`: 1 row.
- md5(pg_get_functiondef) = `d2b6251927609c4e0567fd451c2cbf08`.

## 3. Proofs (in-file DO block, scratch rows, sentinel rollback) — passed

1. authenticated and anon cannot EXECUTE; service_role can; old signature gone; header as declared;
   dial row gone.
2. Under service-role claims (auth.uid() null), a call with a super-admin actor writes exactly one
   `import.commit` row naming that actor; a second call writes a second row (never rate-refused).
3. A null actor and an actor without the family's permission are refused (42501) and write nothing.

One failed attempt before the clean apply (rolled back whole; read-back confirmed the old signature
and the dial row were still present): `operator does not exist: text = uuid` — `audit_log.entity_id`
is text; the proof now compares `v_batch::text`. Function and ACL text unchanged between attempts.

## 4. App changes (land with M4b)

- `src/server/supabase/user-client.ts` (a vendor seam): `writeImportAudit({actor, family, event, batch,
  counts})` — the server-only client, after the route verified the caller; returns the door's error.
- `src/server/imports/gate.ts`: `audit` calls `writeImportAudit` with `actor = caller.userId`; the F4
  log `[ssr-error] <path> audit_failed …` is kept, now also for a thrown error.
- `src/lib/dials.ts`: `importAudit` removed (no counter left).
- `scripts/public-surface-allowlist.txt`: `import_gate_audit` line removed (no browser grant left).
- `scripts/acceptance-doors-allowlist.txt`: `import_gate_audit(text,text,uuid,jsonb)` line removed
  (authenticated can no longer EXECUTE it; the line would be stale).
- `src/server/imports/route.test.ts`: IMR-11 (a saved commit and an undo each have exactly one audit
  row for the verified caller; a refused commit has none), IMR-12 (an audit failure is logged and the
  saved import still answers 200). Red against the old gate: the old call went through the caller's
  client with no actor, so IMR-11's recorded args differ.

## 5. Caller census (`import_gate_audit`)

- `src/server/imports/gate.ts` (now via `writeImportAudit`) — the only app caller.
- `src/integrations/supabase/types.ts` — regenerated, now `p_actor`.
- `scripts/conformance/import-doors.test.ts` IMD-7 — reads the newest definition; passes.
- **`e2e/import-security.spec.ts:1009` (IG-6 a) — STOP item, not touched.** It calls the door straight
  with the old arguments and expects the text `permission denied: import <family>`. The browser now
  gets a not-found/permission answer instead, so `response.ok === false` still holds but the
  `toContain` fails. IG-6 needs a ruling on its new expectation (e.g. any refusal, no row written).

## 6. Rate-limiting the imports on the work (ruling 3, G54a)

The route's `spend(meter, userId)` runs after the gate and BEFORE any RPC, for the modes in the
family's `budgetModes` (route.ts:223; default `["preview"]`, registry.ts:172):

| family | preview | commit | undo |
| --- | --- | --- | --- |
| categories, attributes, locations | dial (import:<family>) | none | none |
| translations (no preview) | — | dial | dial |

So commit (three families) is uncovered until M6's import_commit, and undo (three families) has no
dial: M6 will add one undo dial in `src/lib/dials.ts`, spent before the undo RPC.

## 7. Checks run

- `bunx vitest run src/server/imports scripts/conformance/import-doors.test.ts
  scripts/conformance/vendor-seams.test.ts`: 5 files, 47 tests passed.
- `bunx vitest run scripts/conformance`: 150 passed, 1 failed — CF-SL-1 timed out under parallel load;
  alone it passes (6/6). No string file touched.
- eslint on the four touched source files: clean.

## 8. Notes

- ruling 5 (legal-versions staging note): noted, nothing done.
- Not run here: the browser suite (IG-6 above), the full build (harness).
