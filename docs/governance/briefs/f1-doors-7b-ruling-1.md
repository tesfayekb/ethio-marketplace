RULING — f1-doors-7b, stop 1: one correction before the staging apply, then the twelve decisions. Base: cursor/f1-doors-7b 0d414b54a.

PREVENTION (G70)
- Class 1: ethio-staging differs from the repository. The supervisor compared every public function's body on both databases before offering a carrier (531 functions each). One differs: `attr_import_plan`. On ethio-staging its body has md5 `95afc874cd6bbf2ecbf78529ba9981d9`, with three stray blank lines inside statements. On ethio-prod, and on your proof stack, it is the repository's `7a2cb3062a843c2d16ce1b5be5be90ef`. Your part-3 pre-check would have refused the file on staging, and parts 4 to 8 after it (each reads the previous mark). The pre-check did its job. Nothing in the repository compares the two databases, so the supervisor's read is the check, and it is in force now: at every migration stop, before any carrier is offered, the supervisor compares the whole catalogue's body md5s on both databases, and any difference is healed by a file of the turn before a redeclaration reaches it. Recorded as INC-1216 below. Cursor rules: not needed (rule 30's strict pre-check caught it). Knowledge: not needed.
- Class 2 (the supervisor's): none of the GO's lines named this. The GO read ethio-prod only.

THE CORRECTION — in THIS chat, before the hand-over, before any apply
1. Edit `supabase/migrations/20261120030200_888c0aec-7982-478b-bafb-cfac71707068.sql` in place. It has been applied nowhere but your proof stack, so its mark `20261120050200`, its name and every other statement stay as they are.
   - In the `attr_import_plan` block's DECLARE, add the line `  v_heal     text[][];` after the line that declares `v_pairs`.
   - Directly after `  v_new := replace(v_src, chr(13), '');` in that block, insert the attached `f1-doors-7b-heal.sql` byte for byte. Use a scripted copy, check its sha256 first: `4c34301dd467e537778c22d746bfdfd753d58e03df6d3a5d014a0f0cc98ca179`.
   - The block's existing pre-check line that follows, `IF md5(v_new) IS DISTINCT FROM '7a2cb306…'`, stays: after the heal it holds on every database.
   - The header comment of the block gains one line: `-- INC-1216: ethio-staging's copy is healed to the repository's body first (three stray blank lines).`
   - The supervisor ran the heal's three replacements against ethio-staging's live body, read-only: each anchor is found once, and the result's md5 is `7a2cb3062a843c2d16ce1b5be5be90ef`.
2. `bun run db:proof --fresh` (its last line); `bash scripts/check-migrations.sh` (the spanning-literal guard: each literal of the heal is one line); `bun scripts/doors/check-doors.ts`.
3. Commit `f1-doors-7b: heal staging's attr_import_plan first (INC-1216)` and push.
4. In the stop report, update file 3's sha256 and record the commit. Then STOP with three lines: the commit, file 3's new sha256, and the db:proof line. The supervisor then sends the operator the staging links pinned to that commit.

THE TWELVE DECISIONS (your numbering): all accepted.
1. The codes, and the detail `translations`.
2. `unknownUser` read from `auth.users`, after the gate and the role checks.
3. `country_row_right`: one closed helper over `has_permission_scoped` with the country doors' own rules (K1). Its register row goes to §14.
4. The planner's reasons, including `permissionDenied` with the action as its detail. Note for F1-7c: the undo's `permissionDenied` detail is the gate's scope detail, not the action. That is consistent with the doors and is not changed.
5. The undo checks every unrestored country revision first.
6. Eight files.
7. `category_attributes` loses its browser grants and its rule. The supervisor read production on 2026-11-20: SELECT granted to both browser roles. Your census found no browser reader.
8. The reader's lists.
9. `admin_export_categories`' grant not restated.
10–11. The scratch keys.
12. The English.

THE PRODUCTION PREMISE (your finding 7): the supervisor read ethio-prod on 2026-11-20. The only role that holds `locations:import` is `admin` (two holders), and it also holds `countries:update` and `countries:activate`. No role or person loses anything when INC-1164's rule lands.

ALSO RULED
- The three interim gaps until STEP 3 are accepted as named (an export's unknown scope at 500, the expired impersonation's server line, `badCoordinates` without words). The published site does not reach them before the next Publish.
- THE AMHARIC for STEP 3: the attached `f1-doors-7b-am.json` (sha256 `f4c75ea738f8e61569cafe101f6ec06671c64aef8b497c368cedc54223c40228`), the three keys of your stop report. STEP 3 copies the values by script.
- THE TYPES PATCH: after the staging read-back, ruling 2 returns it (the new function `country_row_right`), with "continue" for the new chat.

RECORDS (word for word into §14)
INC-1216 — ethio-staging's `attr_import_plan` held three stray blank lines inside statements (md5 `95afc874cd6bbf2ecbf78529ba9981d9`). The repository and ethio-prod hold `7a2cb3062a843c2d16ce1b5be5be90ef`. It is the only one of 531 public functions that differed between the two databases (the supervisor's census, 2026-11-20). Its last declaration is October's (`supabase/migrations/20261017093039_337a69e0-f088-40aa-8a4f-8f9120024264.sql`), and the staging copy most likely came through an editor paste (ESTIMATE: the carrier is not proven). Found by F1-7b part 3's pre-check, read before the apply. Class: a shared database that drifts from the repository, seen only when a computed redeclaration's pre-check reads it. Fixed in F1-7b: part 3 heals the staging copy to the repository's body first, both md5s named. The supervisor compares both databases' body md5s at every migration stop. CLOSED with the staging apply.
INC-1217 — `assign_role` stores `p_scope_country` as given. A lower-case two-letter scope passes the shape check and is stored lower-case, while `has_permission_scoped` compares upper-case, so the role never matches its country. The console sends no scope today. Class: a code stored without its case fold. Owner: the roles family's next door turn, or the before-launch list.
roadmap — under Foundations 1, F1-7c: "`admin_set_location_active`'s comment still says the ancestry trigger's `parentInactive` passes unchanged; since F1-7b it is a metered refusal — the comment is restated at the next redeclaration (F1-7b finding)."
