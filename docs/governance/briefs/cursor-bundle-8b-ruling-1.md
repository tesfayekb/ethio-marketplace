RULING — cursor-bundle-8b, stop 1: the migration is on ethio-staging and read back; continue with STEP 3 on the updated branch, with the types patch. Base: cursor/bundle-8b 6a5c19f81

**MODEL — Claude Opus 5.5 (High), in the SAME Cursor chat.**

Save this ruling as `docs/governance/briefs/cursor-bundle-8b-ruling-1.md` (new), and the patch beside it as `docs/governance/briefs/cursor-bundle-8b-types.patch` (new), both by scripted copy (their sha256 lines are in `expected.txt`).

PREVENTION (G70)

- Class (S816, mine): GO premises about the lists a turn joins, written without reading their nearest sibling lines.
  - The GO wrote `door_context('staff', 'errors', 'view', …)`. Every staff read on the shell is `staff-reader` with no dial (F1-6b part 6), and check-doors' `dial-shell-mismatch` holds a body to its line.
  - The GO wrote "public-surface allowlist, no line expected". Every staff reader granted to authenticated has a line (`admin_photo_reviews`, `my_permission_answer` and their siblings).
  - The GO wrote "Part 1 touches none of its files" about Lovable 10b part 2. Part 1's one key sits in the admin locale files, which that pull request also changes. My trial merge of your branch into Lovable's is clean, so nothing breaks.
  - Instructions, in force now: before a GO names a door's class or says a list gains no line, I read that list's line for the nearest sibling and cite it. Before a GO says two lanes share no file, I compare the open pull request's file list with the GO's SCOPE.
  - Repository: not needed. The standing guards (check-doors, the public-surface guard) refused both premises at your census, before any apply. Cursor rules: not needed. Knowledge: not needed.
- Class 2 (yours, caught before any commit): a regular expression bound above Postgres's limit (`{0,299}`; the limit is 255). Not needed anywhere: db:proof refused it, and the length now lives in `char_length`.

THE STAGING APPLY AND READ-BACK (supervisor, Supabase connector, in file order)

- File A `20261126233000_3b6b710a-…sql`, sha256 `dcceeefc…d636`, applied whole: success. Mark `20261127010000` present. The seven functions' `md5(replace(prosrc, chr(13), ''))` equal the file's bodies. All are SECURITY DEFINER with `search_path=public`, except `error_report_kinds` (IMMUTABLE, invoker). The service role alone executes them. Both tables carry row security and four deny policies, and neither browser role reads them. The schedule is `29 4 * * *`, `SELECT public.error_reports_prune()`, active. Rows: 0; heartbeat rows: 0.
- File B `20261126233100_8c6761c8-…sql`, sha256 `7ce0b850…93a8ae5`, applied whole: success. Mark `20261127010100` present. The three doors' md5 equal the file's bodies. All three are STABLE SECURITY DEFINER, return jsonb, and are executed by authenticated and the service role; anon and PUBLIC execute none. `errors:view` is held by `admin` alone, without a second factor, assignable. Scratch users, roles and the country `XZ`: none left.
- Your migration push's `CI` run 45913849134 was still running when I wrote this; every job that had finished was green.

DECISIONS

1. The doors stay `staff-reader` with no dial, as you wrote them (the house form of a staff read; nothing to ration).
2. The three public-surface lines are accepted: a mechanical edit a standing guard demands.
3. The three temporary `grant-without-caller` lines are accepted. They leave in STEP 3's commit with the readers. The final diff of this lane carries none of them. Their `until` cell (`DEC-474`) is accepted only because they leave in the same lane.
4. The regenerated door types (`src/lib/door-codes.generated.ts`, `src/features/permissions/door-permissions.generated.ts`) are accepted: a mechanical edit a standing guard demands (DW-1).
5. File A stays one file at 29,426 bytes: one concern, already applied on staging. No split.
6. The app version (premise a): leave the column open and nullable. No build stamp in this lane. It joins the before-launch list as ACT-034 (below). Where the published build gets its commit is read first there.
7. The path check (`char_length(path) <= 300` beside the pattern) is accepted.
8. STEP 3's browser test may write report rows on ethio-staging, on these conditions:
   - each row carries the test's `e2e-` tag in a value the test controls;
   - the test removes its rows by id in `afterEach`, through a destroy that throws on failure (J3);
   - the test reads its rows by DB truth through the service client (J4).
   - If the shard-1 reaper's registry takes a new table through an existing helper's new option, add `error_reports` by the tag. Otherwise name it under §12.

STEP 3 BEGINS HERE

1. Your branch was brought up to date. Lovable 10b part 2 (pull request #116, head `b1c5bd22d`) merges into dev first, and the operator presses "Update branch" on your pull request #117 before he pastes this ruling.
   - Run `git fetch origin cursor/bundle-8b`, then `git merge --ff-only origin/cursor/bundle-8b`.
   - Confirm `git status --short` is empty and `git merge-base --is-ancestor b1c5bd22dfbca4251d260a22f018fced11a9934f HEAD` succeeds.
   - If the fast-forward refuses, or Lovable's head is not in your history, STOP and say which.
2. Apply the types patch: `git apply docs/governance/briefs/cursor-bundle-8b-types.patch` (never retyped).
   - It adds the two tables and the ten functions to `src/integrations/supabase/types.ts`, rendered from ethio-staging's catalogue by the generator's rule. The renderer reproduced nine existing entries of the file byte for byte before it changed anything (`job_runs`, `job_runs_prune_runs`, `admin_export_categories`, `admin_export_legal_acceptances`, `admin_list_ai_calls`, `admin_list_ai_calls_core`, `attr_preset_ok`, `job_runs_prune`, `job_runs_prune_core`).
   - On your branch's head the patched file's sha256 is `f6884dfb9ed6b4db636b0c48162bd949bd2648daf00e1aa34b35d8223ef45888`. #116 does not change that file, so the sha256 is the same after the merge. Check it.
   - Typecheck, check-doors and the three tests that read the file (`scripts/conformance/type-casts.test.ts`, `src/test/pool-reset-map.test.ts`, `scripts/conformance/executor-hooks.test.ts`) pass with it on your head (my run).
   - The generator types every function argument without null: `record_error_report`'s twelve arguments are `string` or `boolean`. How the server passes an absent value is yours to decide and name. Use no cast that the type-casts census refuses.
   - The patch file stays in the briefs folder as the record of what was applied.
3. Then STEP 3 as the GO writes it, and the rest of the turn.

NUMBERS ASSIGNED (G66)

- S816 (the supervisor's).
- ACT-034, for your report's §14, word for word: "ACT-034 (the supervisor's record) — the build's own stamp (its commit) reaches the error reports' app_version. Today no build exposes its commit, so the column is open and nullable and the stats' version list is one null bucket (Cursor bundle 8b, premise a). First read where the published build gets its commit. Owner: the before-launch list (G71)."
