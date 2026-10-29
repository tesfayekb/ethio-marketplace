# Foundations turn D1 — stop 13 (M6b-cat1: staff_config gate, categories/attributes doors)

## 1. What this stop covers

Ruling of stop 13 (before the apply): M6b-catalogue split by door group per G39 —
M6b-cat1 (categories and attributes doors, mark 20261029090000) and M6b-cat2 (countries,
languages, locations, coverage, mark 20261029100000). This stop applied M6b-cat1 alone.

## 2. The split (scripted, /tmp/m6b/split.py)

- M6b-cat1: admin_link_attribute, admin_upsert_attribute — 24,850 bytes,
  sha256 f3d405b9403331f37ade7b42bf8d56cce8ae7fb9d3e388f899da591fdf55f527.
- M6b-cat2: admin_set_ai_feature, admin_set_country_active, admin_set_country_root_order,
  admin_set_coverage_plan, admin_set_listing_policy, admin_sync_ui_keys, admin_upsert_country,
  admin_upsert_language, admin_upsert_location — 41,046 bytes,
  sha256 add9768d4ae6f70d51cc9df1d24e601b0bd5fd52fe75146df8aeb1c0539bf518. NOT applied; awaits "continue".
- Each part carries only its own doors, its own proof (CR-normalized md5, gate position,
  header, ACL, n+1 refused-writes-nothing) and its own mark. The split is by door group as
  ruled; the sizes are uneven (24.9 KB / 41.0 KB) because the groups are.

## 3. First apply attempt — failed, nothing written

The first inline submission failed at proof (1) for admin_link_attribute. The migration is
transactional; read-back confirmed NOTHING applied: no mark, no gate in prosrc, live md5
still dcad930ee0b63565f93d6cf1f16a6a6b.

Diagnosis (all server-side, read-only):
- A simulation over the live prosrc reproduced every expected value: old md5 dcad930e…,
  new md5 83b40e3ba442a448e502892a44d4c64a, stripped md5 = old, gate after step-up
  (218 < 409), gate before first write (409 < 1860). The expected values were right.
- A base64 fetch of the live prosrc diffed against the scratch file's body (gate stripped):
  byte-identical. The file was right.
- Conclusion: the drift was between the script-built file and my typed submission of it
  (transcription, not content). The proof — the drift guard — caught it and rolled back.

Fixes before resubmission (scripted, both parts):
- v_gate in the proof rewritten to M6b-legal's proven form (\n escapes inside the E-string
  instead of literal newlines). SQL-equivalent; removes one transport difference.
- Proof (1)'s RAISE now names the exact mismatched values (md5, stripped md5, positions,
  secdef, config, ACLs) so any future failure is self-diagnosing. The guard is unchanged
  in strength — same conditions, same refusal.

## 4. Second apply — CLEAN

Applied on ethio-prod as supabase/migrations/20261029013346_0780a3a2-a07d-44c4-ac84-2ebeec7d3897.sql.
The in-migration proof passed: both doors are the live body plus exactly the gate line
(normalized md5s), gate after step-up and before the first write, header and ACL unchanged;
with staff_config overridden to 1, each door's first call passed the gate and its next call
was refused rateLimited and wrote nothing (catalogue tables, audit_log, rate_limits all
unchanged across the refused calls).

Mark read back on ethio-prod: 20261029090000.

## 5. sha256 comparison (ruling item 2)

- Scratch part (/tmp/m6b/m6b-cat1.sql): f3d405b9403331f37ade7b42bf8d56cce8ae7fb9d3e388f899da591fdf55f527
- Committed file (supabase/migrations/20261029013346_0780a3a2-a07d-44c4-ac84-2ebeec7d3897.sql):
  4472f8db3bc557059782f83500b46fdee9e7b5d19e90ffb83319f469f1de4104

They are NOT equal. diff shows exactly one difference: the committed file has one extra
blank line at line 91 (between the admin_link_attribute GRANT and the admin_upsert_attribute
section header) — the migration tool's recorded file inserted it. Every other byte is
identical, and the SQL that actually ran is what the in-migration proof verified.

## 6. IG-6 (e2e/import-security.spec.ts) — parity-blocked, no counts

Command: E2E_CHROMIUM_PATH=/opt/ms-playwright/chromium-1194/chrome-linux/chrome
bun run e2e:local -- e2e/import-security.spec.ts (the sandbox's guard-resolved browser path
/opt/ms-playwright/chromium-1208/... does not exist; 1194 is the installed one).

The run stopped in global setup at the migration preflight, before any test:

```
STAGING BEHIND: apply 20261029013346_0780a3a2-a07d-44c4-ac84-2ebeec7d3897.sql to ethio-staging before E2E can pass
[e2e:preflight] missing migration file(s):
  - 20261029013346_0780a3a2-a07d-44c4-ac84-2ebeec7d3897.sql
```

Staging is level through M6b-legal; the preflight now also requires M6b-cat1's file.
Zero tests ran; there are no counts to paste. Apply line:
apply 20261029013346_0780a3a2-a07d-44c4-ac84-2ebeec7d3897.sql on ethio-staging → expect mark 20261029090000.

## 7. Linter note from the migration tool

232 pre-existing linter findings (extension in public; SECURITY DEFINER EXECUTE grants to
signed-in/anon roles) predate this migration; it introduced none. Not touched (out of scope).

## 8. Files modified this turn

- scripts/check-migrations.sh — real-row guard: sha256:<16 hex> line form + planted
  three-case self-test (|| head refused without line, passes with its sha256 line, stale
  sha256 fails). Guard green: "Real-row proof guard OK (floor 20261007000000). Migration guard OK."
- scripts/migration-real-row-allowlist.txt — M6a's two || statements allowlisted by sha256
  (ec6ba245d821b3ec, 671c34e1f9b50ab7; reason "reads the proof's own scratch rows (v_tag
  slugs)", until INC-951 closed); the eleven D1 lines re-checked, each naming its scratch
  read with reason and INC expiry.
- scripts/public-surface-allowlist.txt — six restated-grant entries for the catalogue doors.
- supabase/migrations/20261029013346_0780a3a2-a07d-44c4-ac84-2ebeec7d3897.sql — M6b-cat1 (tool-created).
- docs/governance/reports/foundations-turn-d1.stop-13.md — this report.

## 9. K2 siblings

None new. The per-screen rateLimited mappers census stands as reported in stop 12.

## 10. Departures

- The proof (1) RAISE text differs from the M6b-legal form (diagnostic values added);
  the guarded conditions are identical.
- v_gate uses \n escapes (M6b-legal form) rather than the literal newlines the first
  cat1 draft carried.

## 11. Limits

- IG-6 has still never run green this turn; it is blocked on staging parity, not on a
  test failure. No browser evidence exists for the M4b/M5a/M5b/M6a/M6b-legal/M6b-cat1 stack.
- Unit tests and lint for the turn's earlier file changes (guard, allowlists) were run at
  their landing; no src/ code changed this stop.

## 12. Next

On "continue": apply M6b-cat2 (/tmp/m6b/m6b-cat2.sql, sha256 add9768d…, mark 20261029100000)
alone, read back its mark, compare sha256s, then stop 14. After the operator applies
M6b-cat1 on ethio-staging, re-run IG-6 whole, both projects, 0 retries, and paste counts.
