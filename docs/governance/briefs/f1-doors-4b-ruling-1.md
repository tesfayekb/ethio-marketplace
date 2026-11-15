RULING — f1-doors-4b, stop 1: the migration stop is CLEAN, the nine files are on ethio-staging, the types patch, the fifteen decisions, STEPS 3 to 7 in a new chat. No further migration file. Base: cursor/f1-doors-4b 20cc752b3.

THIS RULING OPENS A NEW CHAT (DEC-387). STEPS 3 to 7 are built by a chat that did not write the migration. Before anything else read, whole and in this order: `docs/governance/briefs/f1-doors-4b.md` (the task file), `docs/governance/reports/f1-doors-4b.census.md`, `docs/governance/reports/f1-doors-4b.stop-1.md`, then this ruling. Then `git fetch origin && git switch cursor/f1-doors-4b && git merge --ff-only origin/cursor/f1-doors-4b`; print `git rev-parse HEAD` — it must be `20cc752b39a6ce4a024daa85942b8bc5e9a0b09b` — and `git status --short`, which must print nothing. Another head or a tree that is not clean is a STOP. This chat writes NO SQL: no migration file is added, edited or removed; a defect you find in a migration file is a STOP described in the chat, and the chat that wrote the file corrects it.

The nine files are accepted as pushed and are on ethio-staging. Continue with STEPS 3 to 7 of the task file; the task file is not rebuilt. Save this ruling by scripted copy, BARE, as `docs/governance/briefs/f1-doors-4b-ruling-1.md` (sha256 as the operator's line gives it) in this ruling's first commit, and apply the types patch in that same commit. The next stop is the end of the turn.

PREVENTION (G70). The stop was the planned one. Four classes showed on the way to it; each has its place:
(1) A DROPPED FUNCTION'S GRANTS. The first push restated `authenticated` alone for eight DROP + CREATE doors whose last declarations also granted the service role; the gap was found while the stop report's grants table was being written, after the push, and cost a second migration commit, re-chosen marks and one full CI run more than the turn's plan. Class: a fact the stop report must state is first read after the push. Repository: the next GO's first part (F1-5a) builds the guard — the migration guard refuses a file that drops and re-creates a function without restating every grant its last declaration gave. Cursor rules: at the next rules turn rule 30 gains "the stop report, with its dropped functions' grants, is written before the migration commit is pushed; one push carries both". Instructions, Knowledge: not needed.
(2) A CALLEE'S REFUSALS. The census listed the functions the import bodies call, not the refusals those functions can answer, so the translation core's `permissionDenied` inside an import was met by the proof and not by the plan (decision 7). Class: a callee's codes are part of its caller's vocabulary. Repository: the GO template's census gains the item `callee-codes` at the next rules turn; the supervisor's next GO carries it at once. Cursor rules, Knowledge: not needed.
(3) A GUARD WHOSE RUN TIME GROWS WITH THE TREE, ON A DEFAULT TIMEOUT (DOORS-6; second occurrence — its own comment records 5841 ms). Repository: fixed in this turn at its cause (item 5, decision 15): the tree is read once, and the test's time limit is declared with its cause. Instructions, rules, Knowledge: not needed.
(4) THE REAL-ROW GUARD flagged the proofs' reads of places and was answered in the file before the push: the guard worked as built; nothing to change.
Stops this turn: one, the planned one.

0. THE READ-BACK (ethio-staging, by the supervisor, from the pushed commit).
   - Each file's sha256 on the lane equals your pairing line's; no file holds a carriage return. The operator applied the nine files in order from the commit's raw links.
   - Marks 20261115150000 to 20261115150800 are all present, read one by one.
   - All fourteen bodies of your table read back with the new md5, none with a carriage return. The eight re-created doors answer jsonb; anon may execute none of the fourteen; authenticated and the service role may execute each, as before. Scratch countries, places, users and roles: none left.
   - How the bodies were read, BEFORE the apply: each previous body was found by its previous md5 and compared line by line with the new one — in the repository for twelve; for the two import doors by rebuilding the live body (the written body plus the inserted dial lines, md5 equal to the live one). Every changed line is one of: the scope read from a row, the gate, a sentence become a code with its tail, the pair language by role, the answer, the shell. Nothing else moved.
   - No function, view, policy or scheduled job on ethio-staging calls a door or a reader of this family, so no caller can drop a returned refusal.
   - On both databases every import revision names its country and no scratch country code is held, so the undo's scope reading and the proofs meet no surprise row.

1. THE TYPES PATCH — `f1-doors-4b-types.patch` in the unzipped folder, beside this ruling. Apply it with `git apply` from the repository root; never retype it.
   - It changes `src/integrations/supabase/types.ts` only: the `Returns` of the eight doors whose return type changed becomes `Json` (`admin_upsert_location` from `string`, the seven others from `undefined`). No entry is added; the readers and the two import doors keep their types.
   - How it was built (the same named departure as the earlier door turns'): by script from the lane's own file, after reading every signature and return type on ethio-staging. The script re-renders each changed entry by the generator's line rule and was checked to reproduce every one of those entries as it stands before changing it. If the typecheck disagrees with the patch, that is a finding for §13, not something to edit by hand.

2. AMHARIC AND NEW STRINGS — none. No key is added in this turn.
   - `planHasRefusals` and `batchAlreadyUndone` already have their words (`admin.locations.import.reason.*`); the shared dialog draws its busy line for `importRunning` (`src/features/admin/import-dialog.tsx:247`).
   - `undoBlocked` (with its tail) and `unknownBatch` had no words before this turn and draw as the code on the dialog's reason line, as data, exactly as an unnamed reason does today. Their words are queued (item 6); do not add them here.

3. YOUR FIFTEEN DECISIONS — all accepted. Notes where a decision binds STEPS 3 to 7 or a record:
   1. Nine files by concern, no core — accepted: a file is never split inside a body, and no SQL caller exists (read on ethio-staging, item 0).
   2. The scope read from a row's own `char(2)` column — accepted, and it becomes the rule for the families that follow (DEC-388, item 6).
   3. `admin_upsert_location` keeps two gates — accepted.
   4. The return types — accepted.
   5. The dial cells — accepted. Move, delete, reorder and set active spend `staff_config` from this turn (DEC-385); the dial is 600 an hour on ethio-prod, far above a person's honest presses.
   6. The country cells — accepted, `arg:scope` in the manifest's own spelling.
   7. The translation core's refusal inside an import — accepted as built: the shell answers it, nothing of the file stays, and no check is added before the plan. The dialog draws its 403 line for it; say in §10 what its reason line shows. A refusal that names the translation right is queued (item 6).
   8. The trigger's plain sentences pass the shell — accepted, with one rule for STEP 3 (item 4, first bullet).
   9. The readers raise and have no shell — accepted.
   10. The details kept as a code's tail — accepted. `retireInstead`'s four details are a closed list and keep their translated detail lines; `undoBlocked:hasRows` is not interpolated into any sentence.
   11. The pair language by role — accepted.
   12. The grants correction before any apply — accepted; see PREVENTION (1).
   13. The codes the proofs do not drive — accepted as named; one line each under §12 Limits.
   14. The relay's `unknownParent` key row leaves — accepted, by the rule of item 4's relay bullet.
   15. DOORS-6 — both, at the cause (item 5).

4. STEPS 3 TO 7 — as the task file says, in this order: this ruling and the patch in one commit; the client (STEP 3); the tests (STEP 4); the docs; then the gate, the by-id browser check, the self-review, ONE push, and the report while CI runs.
   - A refusal that had its own line on the places and countries consoles before this turn still has it. The family's words hold every id of today's `REFUSAL_IDS` (`src/features/admin-locations/locations-service.ts:370`), the seven the ancestry trigger raises as plain sentences included — `rootMustBeCountry`, `badSlug`, `missingCoordinates`, `parentMissing`, `levelMismatch`, `crossCountry`, `parentInactive` — because, whatever the SQLSTATE, the reader hears an error's `message` (`src/lib/refusal.ts:206`) as its code. The unit tests name each id and each of `retireInstead`'s four details, and one of them feeds the reader the trigger's shape (an error whose message is `parentInactive` and whose code is `P0001`). Say in §10 that you checked this id by id.
   - `admin_upsert_location` answers `{ok:true, id}`: the service's `upsertLocation` reads the id through its shape guard; the by-id run includes every flow that chains that id.
   - The relay and the export reader: a row or a branch that reads a sentence leaves only when a grep over the last declarations shows that no function the route calls, and no function those call, still raises that sentence — the command and its hits pasted in §10. `unknown country scope` STAYS in both (the export and the planner still raise it; F1-7).
   - The by-id browser run holds every id of the census's `tests` item and IG-1 to IG-6, which drive the location import route (your premise).
   - `DoorArgs` and CF-DOOR-ARGS as the task file says: the two locations lines leave the allowlist; INC-942 closes.
   - `DOOR_CODES` does not grow.
   - First download: a page's first download grows only by a named cause the report lists chunk by chunk; an unexplained growth is a STOP; no bare number.
   - ethio-staging holds every mark of this turn, so the local by-id browser run can run and the preflight is green on the final push.

5. DOORS-6 AND THE TREE CENSUS (decision 15; this widens SCOPE by `scripts/doors/rows.ts` with its test). In STEP 4's commit:
   - The migration tree is read once per process for a given root: `staticRows` keeps its answer, and every caller in the same process — DOORS-4, DOORS-6, `staticFindings`, `liveFindings`, the checking script — reuses it. A test that changes a root between two reads asks for a fresh read by an explicit option; nothing reads a stale tree silently.
   - Each test that walks the real tree declares its time limit, with a comment naming the cause (it reads every migration file; the tree only grows). The limit is not a tuning of the default for every test.
   - The guard itself does not change: the self-test's planted fixtures fire as before, and `check-doors static` prints the same line.

6. THE NUMBERS AND THE RECORDS (report §14, word for word; DEC-346). The supervisor assigns these numbers here, so write them beside rule 60's plain labels.
   - DEC-388 — "A door's country scope is read from a row's own `char(2)` column, selected by the door's argument (`countries.code`, `locations.country_code`), never from the argument's text. An id or a code no row holds scopes NULL: a country holder reads `permissionDenied:scope` and learns nothing of another market's ids, and only a global holder reaches the door's own code."
   - INC-1163 — "`admin_upsert_country`, `admin_set_country_active` and `admin_set_country_root_order` assign `upper(p_code)` to a `char(2)` variable AFTER the gate; a code longer than two characters raises 22001 there instead of `badCountryCode`, so that check answers only a short or non-letter value. Unchanged from the live bodies (found at the F1-4b migration stop); only a caller who passed the gate reads the raw error. Class: a code's check that a typed variable's own raise shadows. Owner: F1-7." Your stop report's finding places the raise in the DECLARE, before the gate; the bodies assign in the body, after it. §13 of the report states it as this line does.
   - Four roadmap lines under Foundations 1, F1-7: "The country doors' code check is reached for every value (INC-1163)."; "The ancestry trigger's seven plain sentences become codes (F1-4b, decision 8)."; "`unknown country scope` in the places export and the places planner becomes a code (F1-4b)."; "A commit refused by its translation step names the translation right (F1-4b, decision 7)."
   - One roadmap line under Foundations 1, F1-5a: "First part — the migration guard refuses a file that drops and re-creates a function without restating every grant its last declaration gave (F1-4b, ruling 1)."
   - One roadmap line under the form kit, wave 3: "The import reasons without words — `undoBlocked`, `unknownBatch` — gain words (F1-4b)."
   - Two roadmap lines under the rules turns: "Rule 30 — the stop report, with its dropped functions' grants, is written before the migration commit is pushed; one push carries both (F1-4b, ruling 1)." and "GO template — the census item `callee-codes`: every refusal a called function can answer (F1-4b, ruling 1)."
   - Register rows: as the task file's RECORDS say; numbers none.
