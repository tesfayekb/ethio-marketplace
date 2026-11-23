RULING — cursor-bundle-4, stop 2: file 1 is on ethio-staging; the client types patch; your six decisions. Base: cursor/bundle-4 740a40f17

Save this file bare as `docs/governance/briefs/cursor-bundle-4-ruling-2.md` (new) by a scripted copy; its sha256 is the carrier's. Apply the package's `cursor-bundle-4-types.patch` with `git apply` as the first act of STEP 4. Then build STEPS 4 to 9. Where this ruling and the brief or ruling 1 differ, this ruling governs.

PREVENTION
- CLASS 1 (the supervisor's, S751): ruling 1's paragraph that widened the scope opened with the word SCOPE, so you and the law CF-BRIEF-19 read it as the whole scope, and the brief's own grants (`scripts/doors/`, `scripts/conformance/`) looked withdrawn. That cost you two questions and five allowlist lines. Repository: INC-1260 (owner: the tests-and-CI turn) — CF-BRIEF-19 will judge a ruling's records against its brief's SCOPE joined with the ruling's widening. Instructions, in force for the supervisor: a ruling widens the scope under the heading "THE BRIEF'S SCOPE GROWS BY", never in a paragraph that opens with SCOPE. Cursor rules: not needed. Knowledge: not needed.
- CLASS 2 (the supervisor's, S752): ruling 1 decision 14 said each door names the permission its old row rule named. The old rule on the reviews called `has_permission`, which ignores the country, so a door that copies it shows a review outside the holder's countries. Concern 2 is "the permission AND the country reach", for every part of an answer. Repository: decision 3 (file 2 corrects the door and plants the case). Instructions, in force for the supervisor: a ruling that moves a rule's permission onto a door says how the country is judged for every part of the answer. Knowledge: not needed.

WHAT THE SUPERVISOR READ AND DID
- I read file 1 whole: the header, the pre-check, the five bodies, the closers, proofs (a) to (e) and the mark.
- I applied it on ethio-staging with the connector (one file, no DROP).
  - Read back: mark `20261123040000` stands; each body's `md5(replace(prosrc, chr(13), ''))` equals the file's (`7ad565d3…ffc7`, `f5f2535c…81ef`, `a9411ee1…fff1`, `6495fe5e…393a`, `24d97422…4076`); all five are STABLE SECURITY DEFINER with `search_path=public`.
  - Grants: anon has none, PUBLIC has none, authenticated may execute; each comment is the file's.
  - No scratch row is left: no XZ or XY country, no `e2e-mig-cb4p2-` user.
- THE TYPES PATCH (`cursor-bundle-4-types.patch`, sha256 `2427d07bd8b9f9a584ade23279ef2e04d68ced66e2947fdb41dc7076eaf07da8`): built by script from your lane's `src/integrations/supabase/types.ts`. The five entries are rendered by the generator from ethio-staging and placed in name order; the script proved that nothing else in the file changes. The result's sha256 is `3d4dcb709e1bbe3496776df389b608d5737d96a2516104381afe15cfd62e32fc`.
- THE LIVE CATALOGUE OF ETHIO-PROD (`pg_policies`, every policy that names a role helper):
  - Exactly the 18 public-table rules of your census, plus the 4 storage rules. There is no 19th.
  - Two tables keep a browser SELECT rule after the drop, so their grants STAY: `listing_reports` (`listing_reports_own_read`) and `package_prices` (`package_prices_public_read`).
  - Eight tables keep none: `audit_log`, `listing_photo_changes`, `permissions`, `resources`, `reveal_flags`, `role_permissions`, `roles`, `user_roles`.
  - No view, and no SECURITY INVOKER function a browser role may execute, reads those eight.
  - One SECURITY INVOKER trigger, `attributes_type_lists` on `attributes`, INSERTs into `audit_log`. That needs no SELECT, and it fires only inside the definer doors (the browser holds no write on `attributes`).

THE DECISIONS
1. `scripts/doors/check-doors-allowlist.txt`: inside the brief's SCOPE, which grants `scripts/doors/`. A ruling widens the brief's SCOPE and never replaces it. The five `grant-without-caller` lines are approved. They leave in STEP 4 with the readers; a line still standing at the final push is a STOP.
2. `scripts/conformance/briefs-allowlist.txt` (read by `scripts/conformance/briefs.test.ts`): inside the brief's SCOPE, which grants `scripts/conformance/`. The five CF-BRIEF-19 lines are approved with one change: each line's `until` becomes `INC-1260` and its reason names INC-1260 (the law's fix), in place of the date.
3. THE REVIEW COLUMN IS NOT CONFIRMED AS BUILT. File 2 redeclares `admin_listing_photos` written out whole (DEC-383). It pre-checks the live body's md5 `7ad565d3adf63eee60350ebab868ffc7`, post-checks its own, and changes only the review gate, to
   `v_review := v_ctx.role = 'service_role' OR (SELECT s.allowed FROM public.has_permission_scoped(v_ctx.uid, 'listings', 'review', v_home, 'match') s);`
   I read `has_permission_scoped` on ethio-staging: its `match` mode passes a global grant or a grant for that country, passes a super admin, and refuses a deactivated account. The comment says the review is read by a holder of `listings:review` for the ad's country.
   THE PROOF ADDS, planted: a holder of `listings:view` globally and `listings:review` for XY only reads the review on the XY ad and null on the XZ ad; a holder of `listings:view` alone still reads null. Proof (d)'s assertions stand. The manifest line does not change.
4. NO NEW INDEX: confirmed. I read the indexes on ethio-staging: `listing_photo_changes_open_idx` (created_at) WHERE reviewed_at IS NULL; `listing_photo_reviews_open_idx` (created_at) WHERE decided_at IS NULL; `listing_photo_warnings_listing_idx` (listing_id); photos are read by their keys and by `listing_id`. Staging's tables hold no rows today, so an EXPLAIN there proves nothing. The two queues read open rows only, bounded at 100. Name this under Departures as rule 30's EXPLAIN, waived for that reason.
5. THE TYPES: the patch above, applied first in STEP 4, its result proven by sha256 in the report.
6. FILE 2:
   - It drops the 18 public-table rules.
   - It revokes SELECT from `authenticated` (and from `anon` where `anon` holds it) on the eight tables named above, and only there. The other default privileges stay as they stand on every table.
   - It keeps the grants of `listing_reports` and `package_prices`.
   - It carries the correction of decision 3.
   - If the migration reader shows a 19th role rule that the catalogue lacks, the final report names it with its file and line. If the reader is wrong, fix the reader (`scripts/doors/policies.ts`) in this lane: DOORS-19's census stands on it.
   - The final report gives the census of every trigger on a table the browser may write directly that reads one of the eight tables (expected: none).
7. INC-1259, BUILT HERE in STEP 4's commit: the forms census treats `FilterRow` as a list filter's host (DEC-338, by kind). In `scripts/conformance/forms.ts`, `FILTER_HOSTS` gains `FilterRow`. The planted cases go in `scripts/conformance/forms.test.ts`: a `Switch` inside `<FilterRow>` passes; one inside a bare `<div>` fails. Lovable's next bundle puts the Filters switch row back on the product's Switch once this is on dev.
8. THE SHARED CEILING LINE, `/admin/categories`: Lovable's bundle merges first and writes that line exactly as the package's `admin-categories-ceiling-line.txt` (sha256 `a3206c4d0ed3a728fa6cb5481d0a924ec40f513c45cf2d3049a9e1c2e8b97c8f`, one line and its newline). It holds both lanes' growth: 353 = ceilingForLocal(351.184 + 0.992). In your final push, your `/admin/categories` line becomes that line byte for byte, copied by script, in place of your 350 line, so the two pull requests meet with no conflict. `/account_/saved` stays yours. Before your final push I measure the merged tree; the release line says if anything moves.

THE BRIEF'S SCOPE GROWS BY: `scripts/conformance/forms.ts` and `scripts/conformance/forms.test.ts` (decision 7). Never a file SIDE BY SIDE gives to Lovable, and never `.github/`.

RECORDS (§14; numbers assigned by the supervisor; no lane writes them into a shared ledger)
- INC-1259 — closed by STEP 4: the forms census now sees the Filters row as a list filter's host.
- INC-1260 — OPEN (owner: the tests-and-CI turn): CF-BRIEF-19 judges a ruling's records against its paragraph that widens the scope, as if it were the whole scope; the five lines of `scripts/conformance/briefs-allowlist.txt` wait on it.

IN YOUR FINAL REPORT, besides what the brief asks:
- the types patch's result sha256;
- file 2's md5 table and pairing line;
- decision 6's trigger census, and the 19th rule's answer;
- the five `grant-without-caller` lines gone;
- the `/admin/categories` line's sha256 against the package's.
