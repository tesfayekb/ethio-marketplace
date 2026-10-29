# Foundations turn D1 — stop 14 (M6b-cat2a: staff_config gate, countries/coverage/policy doors)

## 1. What this stop covers

Ruling of stop 14: M6b-cat2 split by door group into M6b-cat2a (admin_set_ai_feature,
admin_set_country_active, admin_set_country_root_order, admin_set_coverage_plan,
admin_set_listing_policy; mark 20261029100000) and M6b-cat2b (admin_sync_ui_keys,
admin_upsert_country, admin_upsert_language, admin_upsert_location; mark 20261029110000),
each script-built with its own proof and its own stop. This stop applied M6b-cat2a alone.

## 2. The rebuild (sandbox /tmp was wiped between turns)

- The nine live bodies were re-fetched from ethio-prod (base64 prosrc, CR-normalised) plus
  identity arguments, full arguments (with defaults), return types and ACLs.
- Build script: /tmp/m6b/build-cat2.py. It inserts the one gate line after every
  require_step_up_if_needed line, then self-checks the proof's own conditions before
  emitting: stripping the gate returns the live body exactly, and the gate sits after the
  step-up line and before the first write. All nine doors passed; admin_upsert_location
  got two gates (create/update branches), every other door one.
- M6b-cat2a: 23,829 bytes, sha256 4f4a98b31530e78e59134e2d9599a87f57328b94f8aaec79ba8c26b2ef3ef6ac.
- M6b-cat2b: 25,049 bytes, sha256 72190d50b3b8327f317830645059cb1c2e854c63716caef896c3757371068504.
  NOT applied; awaits "continue".
- check-migrations.sh with both scratch files present: real-row guard OK, migration guard OK.

## 3. Three failed apply attempts — each rolled back whole, nothing written

After each failure, read-back confirmed no mark 20261029100000 and no gate in any of the
five live bodies (gated = 0).

1. **42P13 cannot remove parameter defaults** (admin_set_country_active). The first build
   used identity arguments, which omit defaults; four of the nine doors carry defaults
   (set_country_active, set_coverage_plan, sync_ui_keys, upsert_language). Fixed by fetching
   pg_get_function_arguments and using it in the CREATE statements; identity arguments stay
   in the REVOKE/GRANT and proof signatures.
2. **Proof (1) stripped-md5 mismatch** (admin_set_ai_feature: applied md5 matched the
   expected new value, but gate-stripping left one extra newline). My v_gate string lacked
   the trailing \n that cat1's proven form carries. Fixed to cat1's exact form.
3. **Proof (2) function does not exist** (admin_set_coverage_plan(unknown, integer, …)):
   the scratch call's literal 1 does not resolve to the smallint parameter. Fixed with
   1::smallint.

Each failure was the drift guard doing its job: the migration is transactional, so a red
proof wrote nothing.

## 4. Final apply — CLEAN

Applied on ethio-prod as
supabase/migrations/20261029015441_88c7da1c-4a03-4af4-8551-0b105ecb73a0.sql.

The in-migration proof passed: all five doors are the live body plus exactly the gate line
(CR-normalised md5s, old and new), the gate after the step-up line and before the first
write, header (SECURITY DEFINER, search_path public) and ACL unchanged (anon cannot
execute; authenticated and service_role can); with staff_config overridden to 1, each
door's first call passed the gate and its next call was refused rateLimited and wrote
nothing (catalogue tables, audit_log, rate_limits unchanged across the refused calls).

Mark read back on ethio-prod: 20261029100000.

## 5. sha256 comparison

- Scratch part (/tmp/m6b/m6b-cat2a.sql): 4f4a98b31530e78e59134e2d9599a87f57328b94f8aaec79ba8c26b2ef3ef6ac
- Committed file (supabase/migrations/20261029015441_88c7da1c-4a03-4af4-8551-0b105ecb73a0.sql):
  4f4a98b31530e78e59134e2d9599a87f57328b94f8aaec79ba8c26b2ef3ef6ac

EQUAL — no drift between the script-built file and the applied text this time.

## 6. Linter

The migration tool notes 232 pre-existing findings (extension in public ×1, public/anon
execute on SECURITY DEFINER ×18, authenticated execute ×213). They predate this migration;
this migration introduced none (the five doors' grants are restated, not added).

## 7. IG-6

Not run. Staging has cat1 (mark 20261029090000 read back there) but not yet cat2a/cat2b;
the run is ruled for the turn after this stop, once the supervisor confirms staging is
level. Apply line for staging: apply 20261029015441_88c7da1c-4a03-4af4-8551-0b105ecb73a0.sql
on ethio-staging → expect mark 20261029100000.

## 8. Standing rule

The stop-14 ruling's standing rule (an inline-applied migration stays at or under about
25 KB; a larger one is split by concern before it is written, never after a cut-off; M6c is
sized this way from the start) is to be recorded in docs/features/ci-guards.md beside
INC-968 at THE CHECKS, as ruled.

## 9. Files modified this turn

- supabase/migrations/20261029015441_88c7da1c-4a03-4af4-8551-0b105ecb73a0.sql (new, applied)
- docs/governance/reports/foundations-turn-d1.stop-14.md (this report)

Scratch (not landed): /tmp/m6b/build-cat2.py, /tmp/m6b/m6b-cat2a.sql, /tmp/m6b/m6b-cat2b.sql.

## 10. Next

On "continue": apply M6b-cat2b (mark 20261029110000), read back its mark, compare sha256s,
stop 15. IG-6 (e2e/import-security.spec.ts whole, both projects, 0 retries,
E2E_CHROMIUM_PATH=/opt/ms-playwright/chromium-1194/chrome-linux/chrome) runs once staging
is level through cat2b.
