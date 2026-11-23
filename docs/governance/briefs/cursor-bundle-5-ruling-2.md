RULING — cursor-bundle-5, stop 2: the file is on ethio-staging; the client types patch; your two questions. Base: cursor/bundle-5 adb10b7c3

Save this file bare as `docs/governance/briefs/cursor-bundle-5-ruling-2.md` (new) by a scripted copy; its sha256 is the carrier's. Apply the package's `cursor-bundle-5-types.patch` with `git apply` as the first act of STEP 4, and prove the result's sha256 below. Then build STEPS 4 to 8 as ruling 1 says. Where this ruling and ruling 1 differ, this ruling governs.

PREVENTION
- CLASS (yours and the supervisor's): your stop-1 `lists` item said no line of `scripts/public-surface-allowlist.txt` changes. A DROP and CREATE of a function a browser role may execute is a new function to the public-surface guard, so it always needs a "restated grant" line (83 such lines stand). My GO did not ask for that line either. In force for the supervisor: a GO that plans a DROP and CREATE of a browser-granted function names that function's public-surface line in its `lists`. Repository: `docs/governance/go-template.md`'s `lists` item gains that sentence at the next records turn. Cursor rules queue (next rules turn): rule 30 — a migration that changes a granted function's argument list names its public-surface allowlist line at STEP 1.

WHAT THE SUPERVISOR READ AND DID
- I read the file whole before any carrier (G75):
  - The pre-check needs mark `20261123050100` and the live bodies' md5s; both databases held exactly those two bodies and that mark.
  - Each body was diffed against its declaration in `20261114114500`, both sides checked by md5. `admin_list_translations` gains the one line `AND (p_after IS NULL OR t.key > p_after)`. `admin_list_entity_translations` gains the DECLARE, the `p_after` checks (`badValue:after`), the row comparison and the order `etype, COALESCE(elabel, ''), eid, efield`.
  - Headers and grants are restated in full.
  - The proofs write only scratch rows under the sentinel rollback. The one real row they read is the `translations:view` permission, present on both databases.
  - I ran the proof's plan check on both databases (read only, rolled back): `ui_translations_orphaned_idx`, Index Cond on `lang_code`, no sequential scan.
- The operator applied it on ethio-staging by paste (DEC-384). I read it back:
  - Mark `20261123150000` stands and is the newest.
  - One function per name. Body md5 `00cf17ed29fdeecbd8139e983c7aa036` (translations) and `f2c1a07a86f940c679875f2a14ffdbef` (entity), both equal to your table.
  - Both are STABLE SECURITY DEFINER with `search_path=public`. anon executes neither. authenticated and service_role execute both. PUBLIC has no entry.
  - The old signatures are gone, and no scratch row is left (the `e2e-mig-b5p2-` language, roles, users, keys and categories, the `e2e_mig_` attribute: 0 each).
- THE TYPES PATCH (`cursor-bundle-5-types.patch`, sha256 `97abfa44b6150e739017b668eaf89a38b4721b0711fed6d903216a62d5fde12f`):
  - Built by script from your lane's `src/integrations/supabase/types.ts` and the types generated from ethio-staging.
  - It adds `p_after?: string` to `admin_list_translations` and `p_after?: Json` to `admin_list_entity_translations`. The script proved every other entry equal, except `admin_set_language_order`, whose older wrapping it does not take.
  - The result's sha256 is `ba7dbe8185133161f3acec9f179225fae12b3603502e509005722864d15d6ee1`. `tsc` is clean on `adb10b7c3` with the patch applied.

THE DECISIONS
1. `scripts/public-surface-allowlist.txt`: your one line is KEPT. THE BRIEF'S SCOPE GROWS BY that file, for that line only. The entity door's own line (:120) stands unchanged.
2. NO NEW INDEX. The list is staff-only, and one language holds a few thousand keys. The keyset read filters and sorts the rows of one language, which the page's window COUNT already reads, as OFFSET did. The rule for later: when one language passes 50,000 keys, a `(lang_code, key)` index is its own migration. Nothing changes in this bundle.
3. CI on `adb10b7c3` (run 45187492568) may still be running: read it again before your push. A red that is only the staging preflight or its dependents comes from before my apply; it is not re-run, and your final push is the judged run. Any other red is read by the usual rule: a STOP when it touches a path the turn changed, otherwise named under Limits.
4. Everything else in ruling 1 stands: Part 3 (BT-U1) and Part 4, the gate, the browser check by id, the self-review, one push, the report.

THE PACKAGE (sha256):
- `97abfa44b6150e739017b668eaf89a38b4721b0711fed6d903216a62d5fde12f  cursor-bundle-5-types.patch`
