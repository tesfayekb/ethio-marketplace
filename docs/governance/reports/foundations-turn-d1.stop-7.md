# Foundations turn D1 — stop 7 (before M5: the census found bulk callers)

No migration written. M5 is held for a ruling: the live census shows that the 3b doors are also
called **per row, inside other doors' loops**, so a per-call gate at the planned limits would refuse
real imports and machine-translate presses.

## 1. Ruling 2 — IG-6 (done, run parity-blocked)

- `e2e/import-security.spec.ts` IG-6 (a) rewritten: for each family, a signed-in browser call with
  the new five-argument shape and a fresh batch id must be refused with status 401/403 and code
  `42501`, and a service-client read of `audit_log` for that batch id must return 0 rows (G38).
  Part (b) (the super admin's preview through the gate writes its row) is unchanged.
- Census of the door in `e2e/` and test helpers: `e2e/import-security.spec.ts:1009` is the only
  direct caller; no helper calls it.
- eslint and prettier on the spec: clean.
- **Not run — parity-blocked.** ethio-staging does not carry M4b yet: a call with the new arguments
  answers `PGRST202` (no such function). Until the operator confirms the staging apply
  (**apply fd0c7d09 → expect mark 20261029041000**, after M4's 23f4ae4e → 20261029040000), the
  spec cannot pass there, and imports on staging log `audit_failed` because the server calls the
  new signature. The run (both projects, 0 retries, whole file) follows that apply.

## 2. Ruling 3 — noted for M6

`import_commit` and `import_undo`, shared by every family, spent in the route before any write, with
a test per family. Not started: it belongs to M6.

## 3. The finding that holds M5

Live bodies read on ethio-prod at 23:26 UTC. The gate would sit after the step-up line in seven
doors, and in `admin_review_photo_change` (no step-up) after its permission block:

| door | live insertion line (after) | first write |
| --- | --- | --- |
| admin_allow_listing_photo | 17 `require_step_up_if_needed('listings','review')` | 29 |
| admin_review_photo_change | 12 `END IF` (permission) | 13 |
| admin_edit_listing | 32 step-up | 115 |
| admin_move_listing | 59 step-up | 64 |
| admin_save_translation | 20 step-up | 50 |
| admin_save_entity_translation | 15 step-up | 40 |
| admin_machine_translation | 16 step-up | 42 |
| admin_machine_entity_translation | 15 step-up | 44 |

Callers found inside the database (`prosrc` census):

| caller | calls | per |
| --- | --- | --- |
| admin_import_translations | admin_save_translation | every file row (up to MAX_ROWS 5000) |
| admin_commit_category_import | admin_save_entity_translation ×2 | every row |
| admin_commit_location_import | admin_save_entity_translation ×2 | every row |
| admin_commit_attribute_import | admin_save_entity_translation | every row |
| admin_undo_category_import | admin_save_entity_translation | every undone row |
| admin_undo_listing_edit | admin_edit_listing | once per undo |

App caller: `src/routes/api/translate.ts:160–183` calls `admin_machine_translation` /
`admin_machine_entity_translation` once **per key**, up to `TRANSLATE_MAX_ITEMS` = 600 per press.

Effects of the planned gates:

- **staff_translation 2000/3600 on the doors**: an import of more than 2000 rows (translations, or
  catalogue files with names) raises `rateLimited` mid-loop; the commit's transaction rolls back
  whole, so the file can never be imported. Smaller imports eat the editor's hourly budget.
- **Machine translate**: one press of 600 keys spends 600; the fourth press in an hour fails key by key
  (the AI work is already spent, F4: paid output thrown away).
- `admin_undo_listing_edit → admin_edit_listing` spends one moderation call per undo: harmless.

## 4. Options for the ruling

- **(a) The gate counts direct calls only.** The bulk callers set a transaction-local flag
  (`set_config('app.bulk_writer', 'on', true)`, the `app.listing_undo` precedent in
  admin_edit_listing) that the doors' gate line skips; the bulk callers are metered as a whole by
  M6's `import_commit` / `import_undo` (one per file). The flag cannot be set by a browser through
  PostgREST in a way that outlives its own call, but it can be set in the same transaction only from
  SQL — to confirm in the proof that a direct RPC cannot carry it. The machine-translate route
  spends one dial per press **before the AI call** (`spend`, src/server/dials.ts), and the machine
  doors count per key against a limit sized from the batch (e.g. 600 × 10 = 6000/3600).
- **(b) The gate lives only on the outer doors.** The 3b doors are gated only when they are the
  outermost call (`pg_trigger_depth` is not usable here; this would need a wrapper per door — more
  surface, not proposed).
- **(c) Raise staff_translation to cover the largest import** (≥ 5000 × 2 per hour): keeps one line
  per door but makes the dial nearly meaningless for direct saves.

Recommendation: (a). It needs edits to the six bulk callers' bodies (whole redeclarations), so M5
grows from 8 to 14 functions; if that should be split (M5a doors + flag, M5b the bulk callers),
please say.

## 5. Files changed at this stop

- `e2e/import-security.spec.ts` (IG-6 a).
- `docs/governance/reports/foundations-turn-d1.stop-7.md` (this report).
