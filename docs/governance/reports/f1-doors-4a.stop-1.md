MIGRATION — f1-doors-4a STEP 2: the categories and attributes family's doors on door_context and the shell
DONE: STEP 0 (task saved), STEP 1 (census, `docs/governance/reports/f1-doors-4a.census.md`), STEP 2 (the migration, 19 files)
LEFT: STEPS 3 to 7 (the client, the tests, the gate, the self-review, the report), after the supervisor's ruling
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `1350b00dbf4de140cfe97079c9a65bf2928e6e29` (short `1350b00`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-14T22:03:22Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43644320491
(dev at the base, read from `origin/ci-evidence` at this stop; `origin/dev` is still `1350b00db`, the base. The lane's
own `branches/cursor/f1-doors-4a/ci-status.md` does not exist yet: this push is the lane's first.)
FILES:
docs/governance/briefs/f1-doors-4a.md
docs/governance/reports/f1-doors-4a.census.md
roadmap.md
scripts/acceptance-doors-allowlist.txt
scripts/conformance/migration-reader.test.ts
scripts/doors/check-doors-allowlist.txt
scripts/doors/manifest.txt
scripts/public-surface-allowlist.txt
supabase/migrations/20261115021400_e6e74b07-1ee3-4c3d-b12f-9ad8684eead4.sql
supabase/migrations/20261115021500_8c759b29-30be-4ed4-abf8-826004a75da2.sql
supabase/migrations/20261115021600_dd8b1b55-77e5-4907-b0e8-75b6119d6365.sql
supabase/migrations/20261115021700_aa24b4c5-0603-4226-83c7-fb1a96b0c510.sql
supabase/migrations/20261115021800_c4b183c2-9633-4e24-a19f-d804ba1c36af.sql
supabase/migrations/20261115021900_be051beb-53e0-4b2e-8626-c8790cbc26f8.sql
supabase/migrations/20261115022000_bb8a2c66-2bb5-49e8-8353-347b878ed0dd.sql
supabase/migrations/20261115022100_b480f0e4-f370-4c90-a544-0f61f77736d5.sql
supabase/migrations/20261115022200_1ca5f456-d269-48ee-a1cc-67a7a4c54bd6.sql
supabase/migrations/20261115022300_ab599ee3-4c8a-43e0-8668-26295356b429.sql
supabase/migrations/20261115022400_e0eb5617-289e-45fe-a6b4-dad44da3ec00.sql
supabase/migrations/20261115022500_4a080afb-9b4a-40b8-b93c-2f6b3f728db3.sql
supabase/migrations/20261115022600_054d63cc-2d4b-4587-9673-d75e035c4238.sql
supabase/migrations/20261115022700_a289cdfa-4dd2-491b-8cad-e17c33fff1a0.sql
supabase/migrations/20261115022800_fba15c8e-8f12-4768-adcf-e2000ae37b67.sql
supabase/migrations/20261115022900_05efbf28-d8b4-444f-a835-65083f5302df.sql
supabase/migrations/20261115023000_29cf246d-c3ea-4a4f-8fa3-3a73c9171814.sql
supabase/migrations/20261115023100_4bce8e61-e960-4725-986f-89a38ccf3c97.sql
supabase/migrations/20261115023200_b65cc53c-ad24-4f38-9b01-b64ec7738b2d.sql

The migration commit is `7029d50fc` (`f1-doors-4a: the migration — the family's doors on the shell`), committed at
2026-11-15 02:15 UTC: the commit hour rounded up (03:00) plus one hour gives the first mark `20261115040000`, each
further part one minute (`+100`) above the last, to `20261115041800`; every file's stamp (`20261115021400` …
`20261115023200`) is below its mark and file-name order equals mark order. Draft pull request:
https://github.com/tesfayekb/ethio-marketplace/pull/45.

## The apply pairing lines (in this order)

apply e6e74b07 → expect mark 20261115040000
apply 8c759b29 → expect mark 20261115040100
apply dd8b1b55 → expect mark 20261115040200
apply aa24b4c5 → expect mark 20261115040300
apply c4b183c2 → expect mark 20261115040400
apply be051beb → expect mark 20261115040500
apply bb8a2c66 → expect mark 20261115040600
apply b480f0e4 → expect mark 20261115040700
apply 1ca5f456 → expect mark 20261115040800
apply ab599ee3 → expect mark 20261115040900
apply e0eb5617 → expect mark 20261115041000
apply 4a080afb → expect mark 20261115041100
apply 054d63cc → expect mark 20261115041200
apply a289cdfa → expect mark 20261115041300
apply fba15c8e → expect mark 20261115041400
apply 05efbf28 → expect mark 20261115041500
apply 29cf246d → expect mark 20261115041600
apply 4bce8e61 → expect mark 20261115041700
apply b65cc53c → expect mark 20261115041800

Each file's pre-check requires the previous part's mark (part 1: the ledger's newest, `20261114150000`, file
`20261114130400_5624a06f`), the live md5 of every body it redeclares, every door mechanism function, the dials it
names, and — for the files that create the eight new cores — that no such core exists yet. The files apply one by
one, in order; a file applied out of order refuses at its pre-check and changes nothing.

The proofs' first run on a shared database is the staging apply: until then they have run only on `bun run db:proof`'s
throwaway local stack (below) and will run on CI's temporary backends from this push.

## The proof and the guards

- `bun run db:proof --fresh` on the final tree: `db:proof PASS — applied 475/475, CLI 2.120.0, cold, 54 s`
- `bash scripts/check-migrations.sh`: `Born-closed guard OK (floor 20261007143529).` · `Definer guard OK.` ·
  `Self-marking guard OK (floor 20260817054246).` · `Public-surface guard OK (floor 20261003215043).` · `Real-row
  proof guard OK (floor 20261007000000).` · `Spanning-literal guard OK (floor 20261109000000).` · `Migration guard OK.`
- `bun scripts/doors/check-doors.ts`: `check-doors self-test OK: 8 finding kinds fired on their planted fixtures, the
  clean pair fired nothing` · `check-doors static OK: 260 manifest lines reconcile with the migrations' catalogue`
- `bunx vitest run scripts --maxWorkers=2`: 119 files, 617 passed, 1 skipped; `bun run typecheck` and `bun run lint`
  exit 0.
- pre-stop scan: 7 of 7, e6e74b07 8c759b29 dd8b1b55 aa24b4c5 c4b183c2 be051beb bb8a2c66 b480f0e4 1ca5f456 ab599ee3
  e0eb5617 4a080afb 054d63cc a289cdfa fba15c8e 05efbf28 29cf246d 4bce8e61 b65cc53c — (1) every core is created before
  its door, every DROP before its CREATE, no seed row; (2) no CHECK constrains a scratch slug, `attr_key`,
  `image_url`, role name or e-mail the proofs write (`e2e-mig-f14aN-<10 hex>…`); (3) every argument resolves on the
  local stack (named arguments for the upsert, typed NULLs elsewhere); (4) no expectation is a real row's value —
  every proof read of `categories` and `attributes` carries `slug LIKE 'e2e-mig-%'` / `attr_key LIKE 'e2e-mig-%'`
  beside its scratch id (the real-row guard's form, as D1 M6c's files); (5) one random draw per proof, every key
  derived from it; unknown ids are `gen_random_uuid()`; (6) every pre-check reads the live md5s and the previous
  mark; (7) both sides of every md5 comparison are `replace(…, chr(13), '')`-stripped and no compared literal spans
  a line break.

## The files

### Part 1 — `20261115021400_e6e74b07-1ee3-4c3d-b12f-9ad8684eead4.sql`

- sha256sum: `f3223f0e0afa02019f4dcbe00648198691b9b2be89807616a413bcd12e87b887`
- bytes: 26154
- declared mark: `20261115040000`; pre-check requires the ledger's newest mark `20261114150000` (5624a06f)
- subject: the category edit and retire doors onto door_context and the shell
- objects: admin_update_category_core (new; the body of admin_update_category from 20260903025501 :276; SECURITY INVOKER, closed to every browser role and the service role; its door's permission and step-up and every refusal as a code); admin_update_category (whole from 20260903025501 :276; void → jsonb: door_context, the core, {ok:true} and the shell); admin_retire_category_core (new; the body of admin_retire_category from 20260903025501 :393; SECURITY INVOKER, closed to every browser role and the service role; its door's permission and step-up and every refusal as a code); admin_retire_category (whole from 20260903025501 :393; void → jsonb: door_context, the core, {ok:true} and the shell)
- proofs: (a) catalog facts: the 2 doors VOLATILE SECURITY DEFINER, RETURNS jsonb, EXECUTE for authenticated, never anon or PUBLIC; the cores VOLATILE SECURITY INVOKER, closed to authenticated and the service role; every body this file's (md5). (b) the gates: accountDeactivated, permissionDenied for a caller without the door's permission (403) and notSignedIn for no caller (401), none spending staff_config, writing or auditing; each core called by a caller without its permission refuses permissionDenied itself (the import doors reach the cores directly). (c) each code, every earlier check cleared, the exact message, a 400, nothing written; each success with its row and audit line; staff_config counted once per call past the gates; every refusal metered in door_refusals. reassignRequired and reassignTargetInvalid need a live listing and are not driven here.
- apply e6e74b07 → expect mark 20261115040000

### Part 2 — `20261115021500_8c759b29-30be-4ed4-abf8-826004a75da2.sql`

- sha256sum: `c7e1b811efb00898670f4895bcc733043819b866aea7dee949b34f91d23ac10e`
- bytes: 26869
- declared mark: `20261115040100`; pre-check requires part 1's mark `20261115040000`
- subject: the category delete and reactivate doors onto door_context and the shell
- objects: admin_delete_category_core (new; the body of admin_delete_category from 20261007033719 :161; SECURITY INVOKER, closed to every browser role and the service role; its door's permission and step-up and every refusal as a code); admin_delete_category (whole from 20261007033719 :161; void → jsonb: door_context, the core, {ok:true} and the shell); admin_reactivate_category_core (new; the body of admin_reactivate_category from 20260903052438 :26; SECURITY INVOKER, closed to every browser role and the service role; its door's permission and step-up and every refusal as a code); admin_reactivate_category (whole from 20260903052438 :26; void → jsonb: door_context, the core, {ok:true} and the shell)
- proofs: (a) catalog facts: the 2 doors VOLATILE SECURITY DEFINER, RETURNS jsonb, EXECUTE for authenticated (and the service role where it had it), never anon or PUBLIC; the cores VOLATILE SECURITY INVOKER, closed to authenticated and the service role; every body this file's (md5). (b) the gates: accountDeactivated, permissionDenied for a caller without the door's permission (403) and notSignedIn for no caller (401), none spending staff_config, writing or auditing; each core called by a caller without its permission refuses permissionDenied itself (the import doors reach the cores directly). (c) each code, every earlier check cleared, the exact message, a 400, nothing written; each success with its row and audit line; staff_config counted once per call past the gates; every refusal metered in door_refusals. deleteHasListings needs a live listing and is not driven here.
- apply 8c759b29 → expect mark 20261115040100

### Part 3 — `20261115021600_dd8b1b55-77e5-4907-b0e8-75b6119d6365.sql`

- sha256sum: `f0ecd0617faf4b0a533546c4dcbe3ae1555529a9b0079e06604982504d1cf1ce`
- bytes: 29783
- declared mark: `20261115040200`; pre-check requires part 2's mark `20261115040100`
- subject: the category order and window doors onto door_context and the shell
- objects: assert_parent_not_catchall (whole from 20260903064413 :10; its console key as the code catchallParent; header and grants as they stand); admin_reorder_categories_core (new; the body of admin_reorder_categories from 20260903073853 :16; SECURITY INVOKER, closed to every browser role and the service role; its door's permission and step-up and every refusal as a code); admin_reorder_categories (whole from 20260903073853 :16; void → jsonb: door_context, the core, {ok:true} and the shell); admin_set_category_window_core (new; the body of admin_set_category_window from 20260903025501 :319; SECURITY INVOKER, closed to every browser role and the service role; its door's permission and step-up and every refusal as a code); admin_set_category_window (whole from 20260903025501 :319; void → jsonb: door_context, the core, {ok:true} and the shell)
- proofs: (a) catalog facts: the 2 doors VOLATILE SECURITY DEFINER, RETURNS jsonb, EXECUTE for authenticated (and the service role where it had it), never anon or PUBLIC; the cores VOLATILE SECURITY INVOKER, closed to authenticated and the service role; assert_parent_not_catchall STABLE SECURITY INVOKER with its grants as they stand, raising catchallParent as P0D01; every body this file's (md5). (b) the gates: accountDeactivated, permissionDenied for a caller without the door's permission (403) and notSignedIn for no caller (401), none spending staff_config, writing or auditing; each core called by a caller without its permission refuses permissionDenied itself (the import doors reach the cores directly). (c) each code, every earlier check cleared, the exact message, a 400, nothing written; each success with its row and audit line; staff_config counted once per call past the gates; every refusal metered in door_refusals.
- apply dd8b1b55 → expect mark 20261115040200

### Part 4 — `20261115021700_aa24b4c5-0603-4226-83c7-fb1a96b0c510.sql`

- sha256sum: `f72fc345e4e56d64a6b0c3b7ff678716849bd2863ca4fa39d70b2d89eb1598a3`
- bytes: 25741
- declared mark: `20261115040300`; pre-check requires part 3's mark `20261115040200`
- subject: the category pointer move and remove doors onto door_context and the shell
- objects: admin_move_category_pointer_core (new; the body of admin_move_category_pointer from 20260928002133 :159; SECURITY INVOKER, closed to every browser role and the service role; its door's permission and step-up and every refusal as a code); admin_move_category_pointer (whole from 20260928002133 :159; void → jsonb: door_context, the core, {ok:true} and the shell); admin_remove_category_pointer_core (new; the body of admin_remove_category_pointer from 20260928002133 :257; SECURITY INVOKER, closed to every browser role and the service role; its door's permission and step-up and every refusal as a code); admin_remove_category_pointer (whole from 20260928002133 :257; void → jsonb: door_context, the core, {ok:true} and the shell)
- proofs: (a) catalog facts: the 2 doors VOLATILE SECURITY DEFINER, RETURNS jsonb, EXECUTE for authenticated (and the service role where it had it), never anon or PUBLIC; the cores VOLATILE SECURITY INVOKER, closed to authenticated and the service role; every body this file's (md5). (b) the gates: accountDeactivated, permissionDenied for a caller without the door's permission (403) and notSignedIn for no caller (401), none spending staff_config, writing or auditing; each core called by a caller without its permission refuses permissionDenied itself (the import doors reach the cores directly). (c) each code, every earlier check cleared, the exact message, a 400, nothing written; each success with its row and audit line; staff_config counted once per call past the gates; every refusal metered in door_refusals.
- apply aa24b4c5 → expect mark 20261115040300

### Part 5 — `20261115021800_c4b183c2-9633-4e24-a19f-d804ba1c36af.sql`

- sha256sum: `b88b00ad8b2e9185d2a7fe62a8643baca3d0b1b636e5cd3c92bb34eb3877f18b`
- bytes: 34305
- declared mark: `20261115040400`; pre-check requires part 4's mark `20261115040300`
- subject: the category import commit onto door_context and the shell
- objects: admin_commit_category_import (whole from live = literal 20261029001111 :180 + its computed gate; the gate on door_context and the shell; the codes; the cores; the pair language by role)
- proofs: (a) catalog facts: VOLATILE SECURITY DEFINER, RETURNS jsonb, EXECUTE for authenticated and the service role, never anon or PUBLIC; the body this file's (md5). (b) the gates: accountDeactivated, permissionDenied (403), notSignedIn (401), none spending import_commit or applying a row. (c) a scratch file (one create under a scratch root, one retire of a scratch category): a holder of categories:import without categories:restructure is refused permissionDenied by the retire core (403) and NOTHING of the file applies — the create before it rolls back with it, no revision, no audit line, no import_commit spent; staff applies it: the batch, the created row under the root, the retired row, two revisions, one audit line, import_commit counted once and staff_config not at all (the cores spend none). importRunning needs a second session and unknownParent a parent removed between plan and write: not driven.
- apply c4b183c2 → expect mark 20261115040400

### Part 6 — `20261115021900_be051beb-53e0-4b2e-8626-c8790cbc26f8.sql`

- sha256sum: `dfdbf17272b108028a3128b66173837c4f508097b85e1aec54252e5790955bdc`
- bytes: 29930
- declared mark: `20261115040500`; pre-check requires part 5's mark `20261115040400`
- subject: the category import undo onto door_context and the shell
- objects: admin_undo_category_import (whole from live = literal 20261029001111 :514 + its computed gate; the gate on door_context and the shell; the codes; the cores; the pair language by role)
- proofs: (a) catalog facts: VOLATILE SECURITY DEFINER, RETURNS jsonb, EXECUTE for authenticated and the service role, never anon or PUBLIC; the body this file's (md5). (b) the gates over a scratch batch staff committed: accountDeactivated, permissionDenied (403), notSignedIn (401), none spending import_undo or undoing a row. (c) unknownBatch for a batch that never was (400, counted); a holder of categories:import without categories:restructure is refused permissionDenied by the reactivate core (403) and NOTHING is undone; staff undoes the batch: the created row gone, the retired row active again, one audit line, import_undo counted twice (the unknown batch and the undo) and staff_config not at all.
- apply be051beb → expect mark 20261115040500

### Part 7 — `20261115022000_bb8a2c66-2bb5-49e8-8353-347b878ed0dd.sql`

- sha256sum: `2052b263badadb846b3f6917dddd054a16a1ecdd033bd932a2bbb5a9b1b4034f`
- bytes: 27680
- declared mark: `20261115040600`; pre-check requires part 6's mark `20261115040500`
- subject: the category create and pointer add doors onto door_context and the shell
- objects: admin_create_category_core (whole from 20261029001111 :60; its refusals as codes; D1 M6a's grants restated); admin_create_category (whole from 20261029001111 :108; the gate on door_context, the core and the shell; jsonb); admin_add_category_pointer_core (whole from 20261029001111 :14; its refusals as codes; D1 M6a's grants restated); admin_add_category_pointer (whole from 20261029001111 :41; the gate on door_context, the core and the shell; jsonb)
- proofs: (a) catalog facts: the 2 doors VOLATILE SECURITY DEFINER, RETURNS jsonb, EXECUTE for authenticated (and the service role where it had it), never anon or PUBLIC; the cores VOLATILE SECURITY INVOKER, closed to authenticated and the service role; every body this file's (md5). (b) the gates: accountDeactivated, permissionDenied for a caller without the door's permission (403) and notSignedIn for no caller (401), none spending staff_config, writing or auditing; each core called by a caller without its permission refuses permissionDenied itself (the import doors reach the cores directly). (c) each code, every earlier check cleared, the exact message, a 400, nothing written; each success with its row and audit line; staff_config counted once per call past the gates; every refusal metered in door_refusals.
- apply bb8a2c66 → expect mark 20261115040600

### Part 8 — `20261115022100_b480f0e4-f370-4c90-a544-0f61f77736d5.sql`

- sha256sum: `c7b25a76eff1df917b1ea68ece684f597365fe6e8b0e60919e4046b6880156b5`
- bytes: 24552
- declared mark: `20261115040700`; pre-check requires part 7's mark `20261115040600`
- subject: the category exclusions and home pointer doors onto door_context and the shell
- objects: admin_set_country_exclusions_core (whole from 20261029001111 :127; its refusals as codes; D1 M6a's grants restated); admin_set_country_exclusions (whole from 20261029001111 :161; the gate on door_context, the core and the shell; jsonb); admin_set_primary_pointer (whole from 20260928002133 :213; the gate on door_context, the codes and the shell; jsonb)
- proofs: (a) catalog facts: the 2 doors VOLATILE SECURITY DEFINER, RETURNS jsonb, EXECUTE for authenticated (and the service role where it had it), never anon or PUBLIC; the cores VOLATILE SECURITY INVOKER, closed to authenticated and the service role; every body this file's (md5). (b) the gates: accountDeactivated, permissionDenied for a caller without the door's permission (403) and notSignedIn for no caller (401), none spending staff_config, writing or auditing; each core called by a caller without its permission refuses permissionDenied itself (the import doors reach the cores directly). (c) each code, every earlier check cleared, the exact message, a 400, nothing written; each success with its row and audit line; staff_config counted once per call past the gates; every refusal metered in door_refusals.
- apply b480f0e4 → expect mark 20261115040700

### Part 9 — `20261115022200_1ca5f456-d269-48ee-a1cc-67a7a4c54bd6.sql`

- sha256sum: `2d77e5b51533b347fb45b6bba8f2fe659ef4d9f894e8cb62272a7787b41813dc`
- bytes: 21224
- declared mark: `20261115040800`; pre-check requires part 8's mark `20261115040700`
- subject: the category picture doors onto door_context and the shell
- objects: admin_set_category_images (whole from 20260904050152 :55; the gate on door_context, the codes and the shell; jsonb); admin_accept_category_image (whole from 20260904050152 :10; the gate on door_context, the codes and the shell; jsonb)
- proofs: (a) catalog facts: the 2 doors VOLATILE SECURITY DEFINER, RETURNS jsonb, EXECUTE for authenticated, never anon or PUBLIC; every body this file's (md5). (b) the gates: accountDeactivated, permissionDenied for a caller without the door's permission (403) and notSignedIn for no caller (401), none spending staff_config, writing or auditing; (c) each code, every earlier check cleared, the exact message, a 400, nothing written; each success with its row and audit line; staff_config counted once per call past the gates; every refusal metered in door_refusals.
- apply 1ca5f456 → expect mark 20261115040800

### Part 10 — `20261115022300_ab599ee3-4c8a-43e0-8668-26295356b429.sql`

- sha256sum: `eebc5682d6b139c57eeaf6f3cc6ed1b16e67f844a2724b63205ae7f4fc466f27`
- bytes: 33803
- declared mark: `20261115040900`; pre-check requires part 9's mark `20261115040800`
- subject: the attribute upsert onto door_context and the shell
- objects: admin_upsert_attribute (whole from 20261029013346 :93; uuid → jsonb, the gate on door_context, the codes and the shell)
- proofs: (a) catalog facts: VOLATILE SECURITY DEFINER, RETURNS jsonb, EXECUTE for authenticated and the service role, never anon or PUBLIC; the body this file's (md5). (b) the gates: accountDeactivated, permissionDenied (403), notSignedIn (401), none spending staff_config or writing. (c) each code, every earlier check cleared, the exact message (badOption by its code: its tail is the shape judge's), a 400, nothing written; a create and an update answering {ok:true, id} with their rows and audit lines; staff_config counted once per call past the gates; every refusal metered. dependsCycle, parentNotInParent, the bounds targets and the allowed-value reasons need a dependency chain or co-linked definitions and are not driven here; their mapping is literal in the body.
- apply ab599ee3 → expect mark 20261115040900

### Part 11 — `20261115022400_e0eb5617-289e-45fe-a6b4-dad44da3ec00.sql`

- sha256sum: `ba0effde079f4add85032421ee87978ecd77d863642cb8b7ab56ca83569e675f`
- bytes: 23216
- declared mark: `20261115041000`; pre-check requires part 10's mark `20261115040900`
- subject: the attribute link door onto door_context and the shell
- objects: admin_link_attribute (whole from 20261029013346 :16; uuid → jsonb, the gate on door_context, the codes and the shell)
- proofs: (a) catalog facts: the door VOLATILE SECURITY DEFINER, RETURNS jsonb, EXECUTE for authenticated (and the service role where it had it), never anon or PUBLIC; every body this file's (md5). (b) the gates: accountDeactivated, permissionDenied for a caller without the door's permission (403) and notSignedIn for no caller (401), none spending staff_config, writing or auditing; (c) each code, every earlier check cleared, the exact message, a 400, nothing written; each success with its row and audit line; staff_config counted once per call past the gates; every refusal metered in door_refusals. priceBasisDuplicate needs a price-basis lineage and is not driven here.
- apply e0eb5617 → expect mark 20261115041000

### Part 12 — `20261115022500_4a080afb-9b4a-40b8-b93c-2f6b3f728db3.sql`

- sha256sum: `164bd32127a618ea51a7f75bf80e2a26368bf575f05052f0ce651c38a993105e`
- bytes: 22163
- declared mark: `20261115041100`; pre-check requires part 11's mark `20261115041000`
- subject: the attribute link edit door onto door_context and the shell
- objects: admin_update_attribute_link (whole from 20260919134523 :702; void → jsonb, the gate on door_context, the codes and the shell)
- proofs: (a) catalog facts: the door VOLATILE SECURITY DEFINER, RETURNS jsonb, EXECUTE for authenticated (and the service role where it had it), never anon or PUBLIC; every body this file's (md5). (b) the gates: accountDeactivated, permissionDenied for a caller without the door's permission (403) and notSignedIn for no caller (401), none spending staff_config, writing or auditing; (c) each code, every earlier check cleared, the exact message, a 400, nothing written; each success with its row and audit line; staff_config counted once per call past the gates; every refusal metered in door_refusals.
- apply 4a080afb → expect mark 20261115041100

### Part 13 — `20261115022600_054d63cc-2d4b-4587-9673-d75e035c4238.sql`

- sha256sum: `bf58f47327e16dcc6a8d3664a1cf8cdc805455b3f7eda00687ef1e5e4914b7b2`
- bytes: 23504
- declared mark: `20261115041200`; pre-check requires part 12's mark `20261115041100`
- subject: the attribute delete and unlink doors onto door_context and the shell
- objects: admin_delete_attribute (whole from 20260908041703 :153; void → jsonb, the gate on door_context, the codes and the shell); admin_unlink_attribute (whole from 20260908041703 :197; void → jsonb, the gate on door_context, the codes and the shell)
- proofs: (a) catalog facts: the 2 doors VOLATILE SECURITY DEFINER, RETURNS jsonb, EXECUTE for authenticated (and the service role where it had it), never anon or PUBLIC; every body this file's (md5). (b) the gates: accountDeactivated, permissionDenied for a caller without the door's permission (403) and notSignedIn for no caller (401), none spending staff_config, writing or auditing; (c) each code, every earlier check cleared, the exact message, a 400, nothing written; each success with its row and audit line; staff_config counted once per call past the gates; every refusal metered in door_refusals.
- apply 054d63cc → expect mark 20261115041200

### Part 14 — `20261115022700_a289cdfa-4dd2-491b-8cad-e17c33fff1a0.sql`

- sha256sum: `36eee4326c78253e8d6c79bd105371f0e293a3fdfa9ee35f80209d47d760aec2`
- bytes: 24706
- declared mark: `20261115041300`; pre-check requires part 13's mark `20261115041200`
- subject: the attribute merge door onto door_context and the shell
- objects: merge_attributes_impl (whole from 20260906043420 :211; its console keys as codes; grants restated); admin_merge_attributes (whole from 20261007033719 :88; the gate on door_context, the codes and the shell; its counts answer kept)
- proofs: (a) catalog facts: the door VOLATILE SECURITY DEFINER, RETURNS jsonb, EXECUTE for authenticated (and the service role where it had it), never anon or PUBLIC; merge_attributes_impl SECURITY DEFINER and closed to browser roles, its codes answered through the merge door's shell; every body this file's (md5). (b) the gates: accountDeactivated, permissionDenied for a caller without the door's permission (403) and notSignedIn for no caller (401), none spending staff_config, writing or auditing; (c) each code, every earlier check cleared, the exact message, a 400, nothing written; each success with its row and audit line; staff_config counted once per call past the gates; every refusal metered in door_refusals. mergeHasHolders needs a listing's answer and is not driven here.
- apply a289cdfa → expect mark 20261115041300

### Part 15 — `20261115022800_fba15c8e-8f12-4768-adcf-e2000ae37b67.sql`

- sha256sum: `4c6ba2d1743c9b0474659d627546da8245586fe257d81d54d5a9f00a283efbe9`
- bytes: 29567
- declared mark: `20261115041400`; pre-check requires part 14's mark `20261115041300`
- subject: the attribute card, fact and order doors onto door_context and the shell
- objects: admin_set_card_attributes (whole from 20260911223202 :842; void → jsonb, the gate on door_context, the codes and the shell); admin_set_fact_attributes (whole from 20261017091410 :277; void → jsonb, the gate on door_context, the codes and the shell); admin_set_attribute_link_order (whole from 20260906043646 :7; void → jsonb, the gate on door_context, the codes and the shell)
- proofs: (a) catalog facts: the 3 doors VOLATILE SECURITY DEFINER, RETURNS jsonb, EXECUTE for authenticated (and the service role where it had it), never anon or PUBLIC; every body this file's (md5). (b) the gates: accountDeactivated, permissionDenied for a caller without the door's permission (403) and notSignedIn for no caller (401), none spending staff_config, writing or auditing; (c) each code, every earlier check cleared, the exact message, a 400, nothing written; each success with its row and audit line; staff_config counted once per call past the gates; every refusal metered in door_refusals. rankInherited needs an inherited card and is not driven here.
- apply fba15c8e → expect mark 20261115041400

### Part 16 — `20261115022900_05efbf28-d8b4-444f-a835-65083f5302df.sql`

- sha256sum: `61809f040799248dca4dd0b83113eadf758546255f6caa3560cd7bc6ee4716f5`
- bytes: 34887
- declared mark: `20261115041500`; pre-check requires part 15's mark `20261115041400`
- subject: the attribute import commit onto door_context and the shell
- objects: admin_commit_attribute_import (whole from live = literal 20261028235443 :700 + its computed gate; the gate on door_context and the shell; the codes; the pair language by role)
- proofs: (a) catalog facts: VOLATILE SECURITY DEFINER, RETURNS jsonb, EXECUTE for authenticated and the service role, never anon or PUBLIC; the body this file's (md5). (b) the gates: accountDeactivated, permissionDenied (403), notSignedIn (401), none spending import_commit or applying a row. (c) a scratch file scoped to a scratch root (one definition, its link to the root): staff applies it — the batch, the definition and the link, their revisions, one audit line, import_commit counted once and staff_config not at all. importRunning needs a second session: not driven.
- apply 05efbf28 → expect mark 20261115041500

### Part 17 — `20261115023000_29cf246d-c3ea-4a4f-8fa3-3a73c9171814.sql`

- sha256sum: `863284c6265616a056f907a0ab401950d65c7cec82dcaa708e202600414f9a0a`
- bytes: 29845
- declared mark: `20261115041600`; pre-check requires part 16's mark `20261115041500`
- subject: the attribute import undo onto door_context and the shell
- objects: admin_undo_attribute_import (whole from live = literal 20261017093325 :30 + its computed gate; the gate on door_context and the shell; the codes; the pair language by role)
- proofs: (a) catalog facts: VOLATILE SECURITY DEFINER, RETURNS jsonb, EXECUTE for authenticated and the service role, never anon or PUBLIC; the body this file's (md5). (b) the gates over a scratch batch staff committed: accountDeactivated, permissionDenied (403), notSignedIn (401), none spending import_undo or undoing a row. (c) required:batch for no batch and unknownBatch for a batch that never was (400, each counted); staff undoes the batch: the definition and its link gone, one audit line, import_undo counted three times.
- apply 29cf246d → expect mark 20261115041600

### Part 18 — `20261115023100_4bce8e61-e960-4725-986f-89a38ccf3c97.sql`

- sha256sum: `424d2de36b8b3df998f402fddfa2fc5b3ca64fa13de291dc629e1283c8caf149`
- bytes: 28230
- declared mark: `20261115041700`; pre-check requires part 17's mark `20261115041600`
- subject: the category readers and the finder rebuild onto door_context
- objects: admin_list_categories (whole from 20260928002133 :317; the gate on door_context (staff-reader); its answer kept); admin_list_category_pointers (whole from 20261007033719 :215; the gate on door_context (staff-reader); its answer kept); admin_get_category_images (whole from 20260904053127 :5; the gate on door_context (staff-reader); its answer kept); admin_export_categories (whole from 20260907194932 :201; the gate on door_context (staff-reader); its answer kept); admin_preview_category_import (whole from 20260907202049 :246; the gate on door_context (staff-reader); its answer kept); catalog_find_rebuild (whole from 20260924104238 :71; integer → jsonb, ONE door_context and the shell)
- proofs: (a) catalog facts: the 5 readers STABLE SECURITY DEFINER, EXECUTE for authenticated, never anon or PUBLIC; catalog_find_rebuild VOLATILE SECURITY DEFINER, RETURNS jsonb, EXECUTE for authenticated and the service role; every body this file's (md5). (b) the readers' gates: each reader raises permissionDenied (P0D01) to a caller without its permission, a deactivated holder accountDeactivated, no caller notSignedIn; staff reads each one (the scratch root among the listed categories). (c) the rebuild: permissionDenied (403) for a caller without categories:import, spending nothing; staff rebuilds ({ok:true, entries}), staff_config counted once.
- apply 4bce8e61 → expect mark 20261115041700

### Part 19 — `20261115023200_b65cc53c-ad24-4f38-9b01-b64ec7738b2d.sql`

- sha256sum: `9c6b86bb0e39cf1d103e99850c4ea2af99b70eff30b85018ebd628140dae9348`
- bytes: 30027
- declared mark: `20261115041800`; pre-check requires part 18's mark `20261115041700`
- subject: the attribute readers onto door_context; the import helpers leave the browser roles
- objects: admin_list_category_attribute_links (whole from 20261017091410 :214; the gate on door_context (staff-reader); its answer kept); admin_list_effective_category_links (whole from 20261017091410 :244; the gate on door_context (staff-reader); its answer kept); admin_list_attributes (whole from 20261005172453 :1117; the gate on door_context (staff-reader); its answer kept); admin_list_attribute_categories (whole from 20260907033910 :8; the gate on door_context (staff-reader); its answer kept); admin_attribute_holders (whole from 20261007033719 :36; the gate on door_context (staff-reader); its answer kept); admin_attribute_option_coverage (whole from 20260911193208 :1714; the gate on door_context (staff-reader); its answer kept); admin_preview_attribute_import (whole from 20261007033719 :135; the gate on door_context (staff-reader); its answer kept); admin_export_attributes (whole from 20260907221756 :178; the gate on door_context (staff-reader); its answer kept); admin_export_attributes (whole from 20260907221756 :195; the gate on door_context (staff-reader); its answer kept); the four import helpers leave the browser roles (no code, policy or body names them)
- proofs: (a) catalog facts: the 9 readers STABLE SECURITY DEFINER, EXECUTE for authenticated, never anon or PUBLIC; every body this file's (md5). The four import helpers no longer executable by authenticated, still by the service role, their bodies untouched. (b) the readers' gates: each reader raises permissionDenied (P0D01) to a caller without its permission, a deactivated holder accountDeactivated, no caller notSignedIn; staff reads each one.
- apply b65cc53c → expect mark 20261115041800

## Every redeclared or new body, previous and new md5 (both CR-stripped; the previous is the live last declaration, checked by each pre-check)

| Function | From | Previous md5 (live) | New md5 |
|---|---|---|---|
| `admin_update_category_core(uuid,text,text,integer,boolean,boolean,integer)` | new | — (new) | `a514bf83dce00b80232d21781a23ca2d` |
| `admin_update_category(uuid,text,text,integer,boolean,boolean,integer)` | 20260903025501 :276 | `884c2b71bd6770e46364f157b9308dde` | `df761fa298c22ebbc45f1813bf57261e` |
| `admin_delete_category_core(uuid,text)` | new | — (new) | `62a1cec7085437b7d262815dbbfbbd08` |
| `admin_delete_category(uuid,text)` | 20261007033719 :161 | `2b0fa9fc979012d75566769fe3f98b43` | `f07860e4b4856694af09af5f747d3fc2` |
| `admin_retire_category_core(uuid,uuid)` | new | — (new) | `398c1c254b85af4e6cefcd8e75635b85` |
| `admin_retire_category(uuid,uuid)` | 20260903025501 :393 | `6cf5b7a647e56f8c9fdff95e53fc7119` | `6dad977618973dacbaef4aaccd0251aa` |
| `admin_reactivate_category_core(uuid)` | new | — (new) | `259443c03ab92ff2cd6eef753d5934c5` |
| `admin_reactivate_category(uuid)` | 20260903052438 :26 | `9eb19830715ae0f8553888f60d4a1677` | `592b766fd81529ff72a060442b0cd07f` |
| `admin_reorder_categories_core(uuid,uuid[])` | new | — (new) | `93f0521e311a71420819c7d68f9f61e5` |
| `admin_reorder_categories(uuid,uuid[])` | 20260903073853 :16 | `41ef08f09ae02b0361cd4baa0e024ea9` | `5ccb55fd6a1e2c40a933955087ce6db3` |
| `admin_set_category_window_core(uuid,timestamp with time zone,timestamp with time zone)` | new | — (new) | `33a1d7a83e69c2500b7e63e55afb86e6` |
| `admin_set_category_window(uuid,timestamp with time zone,timestamp with time zone)` | 20260903025501 :319 | `0fa3a9d6d31bace88f4765a587ee36d2` | `bab389b6825029bd691a840f0342fe2c` |
| `admin_move_category_pointer_core(uuid,uuid)` | new | — (new) | `5aff8fd734d07e25ac16688321e463fc` |
| `admin_move_category_pointer(uuid,uuid)` | 20260928002133 :159 | `3e0fe1c2c10bcf94f95e88cc0f0b264b` | `6bc33015b5cba80c93e2bd9169eaa206` |
| `admin_remove_category_pointer_core(uuid)` | new | — (new) | `d5345dad18a82ce41080c2c56634d86a` |
| `admin_remove_category_pointer(uuid)` | 20260928002133 :257 | `203e2d8e24bd3ffd775de98fe3224393` | `60b59f32d1aca25ad8d6f194110df3ab` |
| `admin_create_category_core(text,text,text,uuid,boolean,boolean,integer,timestamp with time zone,timestamp with time zone)` | 20261029001111 :60 | `c07851c720fb9a0da28fac81e25bf88a` | `e90a15b9da716c1f69e8634568ce32e5` |
| `admin_add_category_pointer_core(uuid,uuid)` | 20261029001111 :14 | `73ea122d818f3dc2d88cf213a5542c42` | `eb7b3b14efe73e7aecb0347aba155e78` |
| `admin_set_country_exclusions_core(uuid,text[])` | 20261029001111 :127 | `2ab9bf2f2876bbd4d6f2ce5ea69d11e3` | `0477b37c8f9249c5b4761edeac70765b` |
| `admin_create_category(text,text,text,uuid,boolean,boolean,integer,timestamp with time zone,timestamp with time zone)` | 20261029001111 :108 | `acd25c60bb2f04cba651d32cb67d8346` | `105ddf6cfe4e2b372281079313ef6275` |
| `admin_add_category_pointer(uuid,uuid)` | 20261029001111 :41 | `438b205a914020e03f3951f27d4f76db` | `32d48012af4646468b102952ef1d711d` |
| `admin_set_country_exclusions(uuid,text[])` | 20261029001111 :161 | `8a9c85ddec5d1e146d781824a9ddb379` | `96de2887a74c5fc4218c37a13daf7d08` |
| `assert_parent_not_catchall(uuid)` | 20260903064413 :10 | `9f23d9df407f414e9fb716a85584016d` | `7479a4f6b855e105f48f2b7de207c96f` |
| `admin_set_primary_pointer(uuid)` | 20260928002133 :213 | `5c9ca44ccdd81032fa7da7b108983d10` | `4660748b5b654a25906f104b2925eeef` |
| `admin_set_category_images(uuid,text,text,text,text)` | 20260904050152 :55 | `c7efebd5c561ff0a5c247eb16c7521ed` | `5f3f29967f3b997f7ae8c69c75c617e0` |
| `admin_accept_category_image(uuid)` | 20260904050152 :10 | `e5bc735c0e15c8c38272413fae221d40` | `2d054ec3738209abaa78ffedfa5bdbd4` |
| `admin_delete_attribute(uuid,text)` | 20260908041703 :153 | `8299ea15d58908be13e97e2ca945c03a` | `1c2841de91046b9c9607817fac7d5a2d` |
| `admin_unlink_attribute(uuid)` | 20260908041703 :197 | `154192b6915ced136dfe104f0e3f01de` | `43479bc7ed530b2dc875b5e319f03ff5` |
| `merge_attributes_impl(uuid,uuid[])` | 20260906043420 :211 | `3091c59ba0b3494a527332c5d8521ba1` | `19bbe66b832693b2dd693d9a1e5c3b05` |
| `admin_merge_attributes(uuid,uuid[])` | 20261007033719 :88 | `9fb76772ad9195f69feeeb7911fccddc` | `0dda8bba84497c8ee8860c0f453464d6` |
| `admin_set_card_attributes(uuid,uuid[])` | 20260911223202 :842 | `dd7d93387dc5e164c3dc50bda49ce72f` | `dcc278902ea4baf4590be0b779d10dc5` |
| `admin_set_fact_attributes(uuid,uuid[])` | 20261017091410 :277 | `6827b7f59779ebe51ee63586df13cb85` | `46f25c6b3a42f13e796c001b1d8f6000` |
| `admin_set_attribute_link_order(uuid,uuid[])` | 20260906043646 :7 | `14a9c380dd85900b9c36994812433ae8` | `f7e7095824e65cd24aaf2169ac8ea5b2` |
| `admin_upsert_attribute(uuid,text,text,text,jsonb,text,text,text,text,text,text,smallint,text,text,integer,text)` | 20261029013346 :93 | `0a8ecf076448436e9e8e713a74fe44ec` | `f68771ae0d571d00d16da295af68877a` |
| `admin_link_attribute(uuid,uuid,boolean,boolean,integer,text[],jsonb,jsonb)` | 20261029013346 :16 | `83b40e3ba442a448e502892a44d4c64a` | `8a4467a63fbba32766e9fb851e589ae7` |
| `admin_update_attribute_link(uuid,boolean,boolean,text[],jsonb,jsonb,text[])` | 20260919134523 :702 | `a3e39bb834e0fe7053c3711f84f8d0bf` | `4fe573538124229cd3e1e6685e94fe24` |
| `admin_list_categories()` | 20260928002133 :317 | `169bbead67ff53bc1c94693b19bc52d9` | `2c3dd247885335c5cacf4cde61acade8` |
| `admin_list_category_pointers(uuid)` | 20261007033719 :215 | `4c20d5c3ee5e518323afa57e867940dd` | `deeb356fcd8affed70c8dcef0e456e51` |
| `admin_list_category_attribute_links(uuid)` | 20261017091410 :214 | `ae31c3642413d794d95be16f6e9ea4a2` | `ff58ac7af9268b7d31f898ff9c1637b9` |
| `admin_list_effective_category_links(uuid)` | 20261017091410 :244 | `d913a1bd6bc1b4eba91a5ad615a55db5` | `82fbe2f83230bb9037999572f2b27a52` |
| `admin_list_attributes()` | 20261005172453 :1117 | `736edc4098a2aa6e72df26871f69a58a` | `ff9253054cbb54fca99a39b8bb9ec699` |
| `admin_list_attribute_categories()` | 20260907033910 :8 | `bf65a83dac63191e70cd2268d0c0f452` | `34aed60cf2b61eba7d5d9c9e6528fdfc` |
| `admin_attribute_holders(uuid,uuid,text)` | 20261007033719 :36 | `96173e8d4609d7b6cead70ebd4a354b0` | `deba30d6c740f51f36be13efa0034849` |
| `admin_attribute_option_coverage()` | 20260911193208 :1714 | `99b94201b9a59fbfd79a7140e8e65864` | `8f64ee71798364ff2b9f80d6139f813c` |
| `admin_get_category_images(uuid)` | 20260904053127 :5 | `b768b7890e338406fc65e29006e7ecca` | `36e52d44771440c23754c1cc8ce1d53e` |
| `admin_export_categories(text)` | 20260907194932 :201 | `bf97e21f686b66b653287819fee16680` | `e0b47db317c37a67d62ddb02b929cdeb` |
| `admin_export_attributes(text)` | 20260907221756 :178 | `fa7cc1065f1e4974b930bc7abe84de47` | `be9352e1cd8d22e016f18a1f6c0f799b` |
| `admin_preview_category_import(jsonb,text)` | 20260907202049 :246 | `cecc3fc759b89a4250719727bcd2c2b8` | `4c02fdfda3cd15f9d3b454efec4bb8e1` |
| `admin_preview_attribute_import(jsonb,jsonb,text)` | 20261007033719 :135 | `2e6b6bd767cb778e9f5047a651efc3ec` | `ad024a2688b404f5956be35a6f95a691` |
| `admin_export_attributes()` | 20260907221756 :195 | `a7b58156c48b175c2b7fd49b968b14d4` | `17f4d50955796b2988d246f44e17dce1` |
| `catalog_find_rebuild()` | 20260924104238 :71 | `ebd2e9cb25c2c13e0b0f9b0853deb016` | `3b19019fefa7ed866678558f71b7d238` |
| `admin_commit_category_import(jsonb,text,text)` | live = literal 20261029001111 :180 + its computed gate | `c94a815cb615b4fe32270642423c6815` | `6be256f133d6a18f320679af7911d8ed` |
| `admin_undo_category_import(uuid)` | live = literal 20261029001111 :514 + its computed gate | `9a2f2192ba818430a5b979c2ae94dd84` | `bb0ba487a8021cd357622a9ff7325246` |
| `admin_commit_attribute_import(jsonb,jsonb,text,text)` | live = literal 20261028235443 :700 + its computed gate | `2872c54d63664ce53df08c44183be3b1` | `1137e70127d7a93c3bdfcf06b1cadc8f` |
| `admin_undo_attribute_import(uuid)` | live = literal 20261017093325 :30 + its computed gate | `301fb4da41a13aff94df86ba2739b5c2` | `9cc4cd07f4d32c63daec5be141ef9f45` |

## Dropped and re-created functions, with their restated grants

- `public.admin_update_category(uuid, text, text, integer, boolean, boolean, integer)` (part 1): REVOKE ALL ON FUNCTION public.admin_update_category(uuid, text, text, integer, boolean, boolean, integer) FROM PUBLIC, anon; GRANT EXECUTE ON FUNCTION public.admin_update_category(uuid, text, text, integer, boolean, boolean, integer) TO authenticated;
- `public.admin_retire_category(uuid, uuid)` (part 1): REVOKE ALL ON FUNCTION public.admin_retire_category(uuid, uuid) FROM PUBLIC, anon; GRANT EXECUTE ON FUNCTION public.admin_retire_category(uuid, uuid) TO authenticated;
- `public.admin_delete_category(uuid, text)` (part 2): REVOKE ALL ON FUNCTION public.admin_delete_category(uuid, text) FROM PUBLIC, anon; GRANT EXECUTE ON FUNCTION public.admin_delete_category(uuid, text) TO authenticated; GRANT ALL ON FUNCTION public.admin_delete_category(uuid, text) TO service_role;
- `public.admin_reactivate_category(uuid)` (part 2): REVOKE ALL ON FUNCTION public.admin_reactivate_category(uuid) FROM PUBLIC, anon; GRANT EXECUTE ON FUNCTION public.admin_reactivate_category(uuid) TO authenticated; GRANT ALL ON FUNCTION public.admin_reactivate_category(uuid) TO service_role;
- `public.admin_reorder_categories(uuid, uuid[])` (part 3): REVOKE ALL ON FUNCTION public.admin_reorder_categories(uuid, uuid[]) FROM PUBLIC, anon; GRANT EXECUTE ON FUNCTION public.admin_reorder_categories(uuid, uuid[]) TO authenticated; GRANT ALL ON FUNCTION public.admin_reorder_categories(uuid, uuid[]) TO service_role;
- `public.admin_set_category_window(uuid, timestamp with time zone, timestamp with time zone)` (part 3): REVOKE ALL ON FUNCTION public.admin_set_category_window(uuid, timestamp with time zone, timestamp with time zone) FROM PUBLIC, anon; GRANT EXECUTE ON FUNCTION public.admin_set_category_window(uuid, timestamp with time zone, timestamp with time zone) TO authenticated;
- `public.admin_move_category_pointer(uuid, uuid)` (part 4): REVOKE ALL ON FUNCTION public.admin_move_category_pointer(uuid, uuid) FROM PUBLIC, anon; GRANT EXECUTE ON FUNCTION public.admin_move_category_pointer(uuid, uuid) TO authenticated; GRANT ALL ON FUNCTION public.admin_move_category_pointer(uuid, uuid) TO service_role;
- `public.admin_remove_category_pointer(uuid)` (part 4): REVOKE ALL ON FUNCTION public.admin_remove_category_pointer(uuid) FROM PUBLIC, anon; GRANT EXECUTE ON FUNCTION public.admin_remove_category_pointer(uuid) TO authenticated; GRANT ALL ON FUNCTION public.admin_remove_category_pointer(uuid) TO service_role;
- `public.admin_create_category(text, text, text, uuid, boolean, boolean, integer, timestamp with time zone, timestamp with time zone)` (part 7): REVOKE ALL ON FUNCTION public.admin_create_category(text, text, text, uuid, boolean, boolean, integer, timestamp with time zone, timestamp with time zone) FROM PUBLIC, anon; GRANT EXECUTE ON FUNCTION public.admin_create_category(text, text, text, uuid, boolean, boolean, integer, timestamp with time zone, timestamp with time zone) TO authenticated; GRANT ALL ON FUNCTION public.admin_create_category(text, text, text, uuid, boolean, boolean, integer, timestamp with time zone, timestamp with time zone) TO service_role;
- `public.admin_add_category_pointer(uuid, uuid)` (part 7): REVOKE ALL ON FUNCTION public.admin_add_category_pointer(uuid, uuid) FROM PUBLIC, anon; GRANT EXECUTE ON FUNCTION public.admin_add_category_pointer(uuid, uuid) TO authenticated; GRANT ALL ON FUNCTION public.admin_add_category_pointer(uuid, uuid) TO service_role;
- `public.admin_set_country_exclusions(uuid, text[])` (part 8): REVOKE ALL ON FUNCTION public.admin_set_country_exclusions(uuid, text[]) FROM PUBLIC, anon; GRANT EXECUTE ON FUNCTION public.admin_set_country_exclusions(uuid, text[]) TO authenticated;
- `public.admin_set_primary_pointer(uuid)` (part 8): REVOKE ALL ON FUNCTION public.admin_set_primary_pointer(uuid) FROM PUBLIC, anon; GRANT EXECUTE ON FUNCTION public.admin_set_primary_pointer(uuid) TO authenticated; GRANT ALL ON FUNCTION public.admin_set_primary_pointer(uuid) TO service_role;
- `public.admin_set_category_images(uuid, text, text, text, text)` (part 9): REVOKE ALL ON FUNCTION public.admin_set_category_images(uuid, text, text, text, text) FROM PUBLIC, anon; GRANT EXECUTE ON FUNCTION public.admin_set_category_images(uuid, text, text, text, text) TO authenticated;
- `public.admin_accept_category_image(uuid)` (part 9): REVOKE ALL ON FUNCTION public.admin_accept_category_image(uuid) FROM PUBLIC, anon; GRANT EXECUTE ON FUNCTION public.admin_accept_category_image(uuid) TO authenticated;
- `public.admin_upsert_attribute(uuid, text, text, text, jsonb, text, text, text, text, text, text, smallint, text, text, integer, text)` (part 10): REVOKE ALL ON FUNCTION public.admin_upsert_attribute(uuid, text, text, text, jsonb, text, text, text, text, text, text, smallint, text, text, integer, text) FROM PUBLIC, anon; GRANT EXECUTE ON FUNCTION public.admin_upsert_attribute(uuid, text, text, text, jsonb, text, text, text, text, text, text, smallint, text, text, integer, text) TO authenticated; GRANT ALL ON FUNCTION public.admin_upsert_attribute(uuid, text, text, text, jsonb, text, text, text, text, text, text, smallint, text, text, integer, text) TO service_role;
- `public.admin_link_attribute(uuid, uuid, boolean, boolean, integer, text[], jsonb, jsonb)` (part 11): REVOKE ALL ON FUNCTION public.admin_link_attribute(uuid, uuid, boolean, boolean, integer, text[], jsonb, jsonb) FROM PUBLIC, anon; GRANT EXECUTE ON FUNCTION public.admin_link_attribute(uuid, uuid, boolean, boolean, integer, text[], jsonb, jsonb) TO authenticated; GRANT ALL ON FUNCTION public.admin_link_attribute(uuid, uuid, boolean, boolean, integer, text[], jsonb, jsonb) TO service_role;
- `public.admin_update_attribute_link(uuid, boolean, boolean, text[], jsonb, jsonb, text[])` (part 12): REVOKE ALL ON FUNCTION public.admin_update_attribute_link(uuid, boolean, boolean, text[], jsonb, jsonb, text[]) FROM PUBLIC, anon; GRANT EXECUTE ON FUNCTION public.admin_update_attribute_link(uuid, boolean, boolean, text[], jsonb, jsonb, text[]) TO authenticated; GRANT ALL ON FUNCTION public.admin_update_attribute_link(uuid, boolean, boolean, text[], jsonb, jsonb, text[]) TO service_role;
- `public.admin_delete_attribute(uuid, text)` (part 13): REVOKE ALL ON FUNCTION public.admin_delete_attribute(uuid, text) FROM PUBLIC, anon; GRANT EXECUTE ON FUNCTION public.admin_delete_attribute(uuid, text) TO authenticated; GRANT ALL ON FUNCTION public.admin_delete_attribute(uuid, text) TO service_role;
- `public.admin_unlink_attribute(uuid)` (part 13): REVOKE ALL ON FUNCTION public.admin_unlink_attribute(uuid) FROM PUBLIC, anon; GRANT EXECUTE ON FUNCTION public.admin_unlink_attribute(uuid) TO authenticated; GRANT ALL ON FUNCTION public.admin_unlink_attribute(uuid) TO service_role;
- `public.admin_set_card_attributes(uuid, uuid[])` (part 15): REVOKE ALL ON FUNCTION public.admin_set_card_attributes(uuid, uuid[]) FROM PUBLIC, anon; GRANT EXECUTE ON FUNCTION public.admin_set_card_attributes(uuid, uuid[]) TO authenticated; GRANT ALL ON FUNCTION public.admin_set_card_attributes(uuid, uuid[]) TO service_role;
- `public.admin_set_fact_attributes(uuid, uuid[])` (part 15): REVOKE ALL ON FUNCTION public.admin_set_fact_attributes(uuid, uuid[]) FROM PUBLIC, anon; GRANT EXECUTE ON FUNCTION public.admin_set_fact_attributes(uuid, uuid[]) TO authenticated; GRANT ALL ON FUNCTION public.admin_set_fact_attributes(uuid, uuid[]) TO service_role;
- `public.admin_set_attribute_link_order(uuid, uuid[])` (part 15): REVOKE ALL ON FUNCTION public.admin_set_attribute_link_order(uuid, uuid[]) FROM PUBLIC, anon; GRANT EXECUTE ON FUNCTION public.admin_set_attribute_link_order(uuid, uuid[]) TO authenticated;
- `public.catalog_find_rebuild()` (part 18): REVOKE ALL ON FUNCTION public.catalog_find_rebuild() FROM PUBLIC, anon; GRANT EXECUTE ON FUNCTION public.catalog_find_rebuild() TO authenticated; GRANT ALL ON FUNCTION public.catalog_find_rebuild() TO service_role;

## Revoked helpers (part 19, `b65cc53c`)

`import_is_slug(text)`, `import_norm_bool(text)`, `import_norm_date(text)`, `import_norm_pipe(text)`: each
`REVOKE ALL ON FUNCTION public.<name>(text) FROM PUBLIC, anon, authenticated;` then `GRANT ALL ON FUNCTION
public.<name>(text) TO service_role;` — bodies untouched; no code, policy or body names them (census `definition`).
Their four manifest lines (210-213) and their four `grant-without-caller` lines in
`scripts/doors/check-doors-allowlist.txt` (:4-:7) leave in the same commit. The proof asserts authenticated and
anon can no longer execute them and the service role still can.

## New or changed string keys

None (decision 5 of the census). No `src/i18n/locales/` file is touched.

## Dial cells changed (`scripts/doors/manifest.txt`), with cell-meaning's sentence

- `admin_commit_attribute_import(jsonb,jsonb,text,text)`, `admin_commit_category_import(jsonb,text,text)`:
  `staff_config` → `import_commit`. "import_commit / import_undo (120 an hour each, the route's twin dial): one file
  applied or undone. A curator applies a handful of files an hour." The bodies spend `import_commit` today (D1 M6c);
  the cell now names the dial the body spends.
- `admin_undo_attribute_import(uuid)`, `admin_undo_category_import(uuid)`: `staff_config` → `import_undo`; the same
  sentence.
- `admin_remove_category_pointer(uuid)`: `staff_moderation` → `staff_config`. "staff_config (600 an hour per person):
  one category or attribute save … a tree reshaped pointer by pointer; a curator does a few dozen of these an hour,
  at most low hundreds — under 600." and "staff_moderation … moderation of listings … its work is a catalogue save,
  so staff_config is proposed." Under DEC-380 the census proposes every catalogue exit on `staff_config`; the
  alternative is `staff_moderation` on remove pointer and unlink (decision 2 below).

## Other manifest cells changed

- Codes cells: each family door's cell is now the set of `door_refuse('<code>'` literals in its own body (the
  judge's rule); a split door's cell is `-` (its codes are its core's), as are create, add pointer and exclusions
  (their codes are in their D1 M6a cores). 18 lines changed this way; `check-doors static` reconciles all 260 lines.
- Audit cells of `admin_undo_attribute_import(uuid)` and `admin_undo_category_import(uuid)`:
  `entity_translation.undo_remove` / `entity_translation.undo_restore` → `-` (the bodies audit through `log_audit`
  as `attribute.import_undo` / `category_import.undo`; the judge reads only `door_audit`; census decision 7).
- `admin_export_attributes()`: `signed-in-reader | authenticated | - | - | - | - | - | - | -` → `staff-reader |
  authenticated | categories:view | - | - | - | global | - | -` (census decision 9; it passed the same gate through
  its delegate, so nobody's access changes).
- Lines 210-213 (the four import helpers) leave.

The other lists in the commit: 17 `restated grant (not a new surface)` lines in
`scripts/public-surface-allowlist.txt` (17 objects whose grants a file restates: the 16 DROP + CREATE doors without
a line and `assert_parent_not_catchall`); MGR-7's computed list in `scripts/conformance/migration-reader.test.ts`
loses the four category and attribute import doors (now written out whole; `attr_import_plan` and the location
doors stay); `scripts/acceptance-doors-allowlist.txt`'s `catalog_find_rebuild()` reason becomes "browser callers
must have categories:import with step-up".

## Decisions for the supervisor's ruling (numbered)

1. **Door + closed core for the eight doors the category imports call** (update, delete, retire, reactivate,
   reorder, window, move pointer, remove pointer): each core is NEW, SECURITY INVOKER, `REVOKE ALL … FROM PUBLIC,
   anon, authenticated, service_role`, keeping its door's own `has_permission` + `require_step_up_if_needed` (refusing
   `permissionDenied` by `door_refuse`) and every refusal as a literal code; the door is `door_context` + the core +
   `{ok:true}` + the shell. The two category imports call the cores, so a core's refusal raises through the import's
   own shell and the whole file rolls back (proved in parts 5 and 6: a holder of `categories:import` without
   `categories:restructure` is refused `permissionDenied` 403 and nothing of the file applies; the cores spend no
   dial, so an applied file spends `import_commit` once and `staff_config` not at all).
2. **Dial cells**: the four import cells name the dials the bodies spend; `admin_remove_category_pointer`
   `staff_moderation` → `staff_config` (alternative: keep `staff_moderation` on remove pointer and unlink, DEC-380's
   exit rule; then the body and line change in the correction file).
3. **`admin_reorder_categories` keeps C2h** through `categories:update`'s `requires_step_up = false`; its line keeps
   `none:C2h`.
4. **The planners' 'unknown category scope' stays a sentence** (outside the family's definition; queued to F1-7).
5. **No new string key**; codes without words today read as the screen's generic line (STEP 3).
6. **Return types**: void doors → `{ok:true}`; create category, add pointer, upsert attribute, link attribute →
   `{ok:true, id}`; accept image → `{ok:true, accepted_at}`; `catalog_find_rebuild` → `{ok:true, entries}`;
   `admin_merge_attributes` keeps its counts answer (CREATE OR REPLACE, no DROP); the import doors keep theirs.
7. **Audit stays `log_audit`** in the bodies (F1-2's and F1-3's form); the two undo audit cells become `-`.
8. **K4**: the import bodies' 16 `'am'` literals become `public.language_code('pair')`.
9. **`admin_export_attributes()`** takes the reader form (`categories:view`) before it delegates; its line is
   corrected as above.
10. **`catalog_find_rebuild`** on `door_context('staff', 'categories', 'import', 'staff_config', NULL, 'global')` and
    the shell: it loses the OR of `categories:update` and `translations:update` and gains step-up; its only caller is
    the service role (`e2e/helpers/posting.ts:172`), which passes every gate.
11. **Nineteen files by concern.** Rule 30 and the brief split at about 25 KB and never inside a body. Eight files are
    21-26 KB; eleven are 26-35 KB: the four import files and the upsert (parts 5, 6, 10, 16, 17: one body of 11-19 KB
    each, with its own proof), and six files of two or three doors or readers (parts 2, 3, 7, 15, 18, 19 at 26-30 KB)
    whose scratch world and gates are a fixed ~10 KB per file — splitting them further repeats that world for one
    door each. F1-3's landed files reach
    36 KB. The import parts follow the split parts at once (5 and 6), to keep short the window in which a staged
    apply has an import calling a door already on the shell.
12. **The three D1 M6a cores and `assert_parent_not_catchall`** are redeclared with their refusals as codes; header
    and grants as they stand (the cores keep `REVOKE ALL … FROM PUBLIC, anon, authenticated, service_role`; the
    helper keeps EXECUTE for authenticated and the service role and its `helper` line). The helper raises P0D01 with
    no shell, so a direct service-role call (CT-14) now reads `catchallParent`.
13. **`merge_attributes_impl`** keeps SECURITY DEFINER and its closed grants (`REVOKE ALL … FROM PUBLIC, anon,
    authenticated`); its refusals become codes (unknownAttribute, mergeNoSources, mergeTargetInSources) answered
    through the merge door's shell.
14. **`rankInherited`**: the old DETAIL clause moves into the code's tail (`rankInherited:category=<id> rank=<n>
    attribute=<key> inherited_from=<slug> inherited_attribute=<key>`), so one message carries it.
15. **Codes the proofs do not drive** (each is a literal in its body and reconciled by `check-doors`):
    deleteHasListings, reassignRequired, reassignTargetInvalid, mergeHasHolders (need a live listing or a listing's
    answer); importRunning (a second session); unknownParent (a parent removed between plan and write);
    dependsCycle, parentNotInParent, boundsTargetNotNumber, boundsTargetNotColinked, allowedTargetCircular,
    allowedTargetNotSelect, allowedTargetNotColinked, allowedUnknownValue (a dependency chain or co-linked
    definitions); priceBasisDuplicate (a price-basis lineage); rankInherited (an inherited card). AT-33 and AT-46
    drive dependsCycle, parentNotInParent, dependsNotSelect and rankInherited in the browser.

## Reds expected on this push until STEPS 3 and 4

The pull request's CI builds its temporary backends from every migration, so the new answers meet today's client
and tests:

- **preflight**: "STAGING BEHIND" until ethio-staging holds `20261115041800` (expected, rule 30).
- **AT-14** (`e2e/admin-attributes-library.spec.ts:863-865`): `toContain("permission denied")` ×3 — the message is
  now `permissionDenied` (STEP 4).
- **CT-14** (`e2e/admin-categories-lifecycle.spec.ts:249-252`): `toContain("admin.categories.error.catchallParent")`
  — now `catchallParent` (STEP 4).
- **AT-46** (`e2e/admin-attributes-import.spec.ts:1019-1021`): `toContain("admin.attributes.error.rankInherited")` —
  now `rankInherited:<detail>` (STEP 4).
- **CT-17** (`e2e/admin-categories-lifecycle.spec.ts:568`): the create dialog chains the returned id into exclusions
  and the reorder (`category-dialogs.tsx:229-253`); `createCategory` returns `data as string`, now `{ok:true, id}`
  (STEP 3).
- At risk, not certain (no browser was run at this stop): the console flows that read a changed success answer —
  `createViaUi` (`e2e/helpers/categories.ts:358`, the created id fed to the dialog's image step) in CT-3, CT-4, CT-5,
  CT-6, CT-7, CT-7b, CT-8, CT-10, CT-12, CT-13, CT-16, CT-41, CT-43, AT-3…AT-8, AT-10, AT-11, AT-42, AT-59, AT-80,
  AT-84; CI-4 (`e2e/admin-categories-images.spec.ts:107`, the accept answer drawn as the stamp,
  `category-image-dialog.tsx:245`); and any screen that shows a refusal through a family mapper that reads console
  keys (category and attribute dialogs) — the refusal now arrives as a code. Each is fixed in STEP 3 by the services'
  shape guards and the one reader.
- Import relay: the category and attribute commits answer `importRunning` and `unknownParent` at 400 (the shell's
  status) instead of the relay's 409 rows; no test asserts either (census `tests`); IMR-8 and IMR-10 hold (the rows
  stay for the location imports).

Unit tests, laws and every guard are green on this commit (above); none of the reds is in a job that needs no
backend.
