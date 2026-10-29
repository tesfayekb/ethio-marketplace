# Foundations turn D1 — stop 10 (M6 held by the census; ruling 3's route dials landed)

## 1. What landed

Ruling 3 of stop 6 is done in the app. No migration was written.

- `src/lib/dials.ts`: `importCommit` (`import:commit`, 120 / 3600) and `importUndo` (`import:undo`,
  120 / 3600), both shared by every family. The size of `import_undo` was not given, so it uses the same
  120 / 3600 as the plan's `import_commit`. **Needs confirming.**
- `src/server/imports/route.ts`: after the gate and the family's own budgetModes meter, a commit spends
  `importCommit` and an undo spends `importUndo`. Both happen before any door call. A spent dial answers
  429 `rateLimited`, and an unreachable counter answers 503, as before.
- `src/server/imports/route.test.ts`: IMR-13, two cases for each of the four families (categories,
  attributes, locations, translations). With the cap at 1, commit 2 and undo 2 each answer 429 with no
  door call and no audit row. IMR-6 was updated to the new truth: a categories commit now spends
  `import:commit`, and the family's preview-only meter is unchanged.
- Checks: `src/server/imports/` 48 tests pass; `scripts/conformance/dials.test.ts` 5 tests pass; eslint
  and prettier clean.
- Stop 9 report: the one-line E2 ruling has been added.

## 2. Why M6's migration is held: the same class as stop 7

Census on ethio-prod, before writing. For each of the 25 `staff_config` doors in the plan, I listed every
public function that calls it:

| Door | Callers |
|---|---|
| admin_add_category_pointer | admin_commit_category_import ×2, admin_undo_category_import ×1 |
| admin_create_category | admin_commit_category_import ×1, admin_undo_category_import ×1 |
| admin_set_country_exclusions | admin_commit_category_import ×2, admin_undo_category_import ×1 |
| the other 22 | none |

These three calls sit inside per-row loops. With a per-call `staff_config` gate at 600 / 3600, a category
file over about 600 rows (or a few files in one hour) would be refused part-way. Because of the
transaction, the whole file would be refused. That is the exposure stop 7 found for translations.

**Proposed, following stop 7's boundary/core ruling (G0.2, G54a):**
- **M6a:** split the three doors into an owner-only `<door>_core` (live body byte for byte) and a door
  that does its checks, then the gate, then calls the core. Redeclare `admin_commit_category_import` and
  `admin_undo_category_import` whole, with only those callee names changed.
- **M6b:** the other 22 config doors, each redeclared whole with one `rate_gate('staff_config')` line
  after its checks and before its first write.
- **M6c:** the seven import commit/undo doors gated by `import_commit` in the database.

Each would be its own mark and its own stop.

## 3. A second question: database `import_commit` vs the route's `import:commit`

These are two separate counters: `rate_gate` uses `rate_dials` actions, and the route's `spend` uses a
different action name. If M6c also gates the doors, every console commit counts once in each, at the same
limit. The route's counter refuses first. The database counter would only ever stop direct browser calls
to the doors, which is INC-951's real concern.

Options:
- (a) Keep both. The route meters the console path, and the database meters direct calls.
- (b) Drop the database `import_commit` gate and rely on the route. This leaves direct PostgREST calls
  unmetered.
- (c) Revoke the browser grant on the seven doors and call them through the server client after the
  route boundary, as M4b did for `import_gate_audit`.

Recommendation: (a). It changes no grants, and the doubled count is harmless because both counters use
the same limit.

## 4. Other notes

- `admin_sync_ui_keys`: its only caller is `translations-service.ts:320`, a signed-in staff button. It
  is not a service job, so a gate on it would count against the staff user.
- IG-6: still waiting on the operator's staging apply of M5a and M5b. Per the ruling, I will re-run the
  whole file after the next stop.

## 5. Files touched

`src/lib/dials.ts`, `src/server/imports/route.ts`, `src/server/imports/route.test.ts`,
`docs/governance/reports/foundations-turn-d1.stop-9.md`, this report.
