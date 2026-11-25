RULING — cursor-bundle-6, stop 2: the staff-session migration. Base: cursor/bundle-6 7958b605b

**MODEL — Claude Sonnet 5.5, in a NEW Cursor chat that first reads the brief, both stop reports, ruling 1 and this ruling (DEC-387, DEC-414).**

PREVENTION (G70)
- Class 1 — a rule placed in a function that a row-level policy calls is paid once for every row (the four storage rules went from about 0.06 to about 0.5 ms a row).
  - Repository — changed: file 3 wraps the calls so that each runs once for a query (decision 4), and the new guard CF-RLS-1 refuses an unwrapped call of a permission function in any policy.
  - Instructions, Cursor rules, Knowledge — not needed: the guard decides.
- Class 2 — one question asked two ways. A door asks the core and then the rule and answers three ways; a route asked one yes or no and could only answer 403.
  - Repository — changed: one SQL function gives the route the same three answers from the same core and rule (decision 2, DEC-465). A second copy of the rule in TypeScript, or a guess from the permission list, is not built.
  - Instructions — changed: a refusal's kind is decided where the authority is decided, never rebuilt by the caller. In force now; listed for v1.20.
  - Cursor rules and Knowledge — not needed.
- Class 3 — an authority held by a row and not by a permission (INC-1282). The census looked for role and permission readers, so it could not see a reader that trusts a session row.
  - Repository — changed: the two readers move onto the rule in file 3 (decision 5), and the census is drawn again by the manifest's classes (decision 6).
  - Guard debt, named: the standing check is Cursor bundle 7's, seeded by decision 6's list.
  - Instructions — changed: the gate-reach question asks for every way an authority is held (permission, role, row). Listed for v1.20.
- Class 4 — the gate-reach census listed tests without the rule that sorts them.
  - Repository — changed: decision 8's subject rule goes into the `gate-reach` item's text in `docs/governance/go-template.md`, in this bundle.
- Class 5 — commits left on a detached HEAD, and a stop report's CI line written from memory.
  - Cursor rules — changed at the next rules turn, and in force now: decision 10, and "the CI line is read by `gh pr checks` at the push, never assumed".

1. STAGING. Both files were applied on ethio-staging by the operator's paste. The supervisor read back:
   - the marks `20261124220000` and `20261124220100`;
   - all six bodies by `md5(replace(prosrc, chr(13), ''))`, each equal to its file: `has_permission` 47b2959a…, `has_permission_core` c633eae9…, `staff_session_holds` 669f735c…, `has_permission_scoped` ceeaf84a…, `has_permission_scoped_core` 43918073… and `door_context` 0cb7e9f7…;
   - every one a definer with `search_path=public`. `anon` executes none of them, `authenticated` executes only `has_permission` (as before), and the three new functions are closed.

   THE CLIENT TYPES. Prove `types.patch` by `expected.txt` (`shasum -a 256 -c expected.txt` in the folder), then apply it with `git apply`. Afterwards `shasum -a 256 src/integrations/supabase/types.ts` reads `57216d2668393fd39aa69c65e7d066fb672d24638abc931745e0e50b475346a8`. The patch adds four entries and changes nothing else:
   - the three new functions, taken from the generator's own output on ethio-staging;
   - `my_permission_answer` (decision 2), written by the generator's line rule from the signature this ruling fixes. The supervisor proves that entry against the generator after file 3's staging apply.

2. QUESTION 1 — A STAFF ROUTE ANSWERS AS A DOOR DOES (DEC-465). The route mechanism asks one SQL function, which answers from the same core and the same rule as `door_context`.
   - FILE 3 CREATES `public.my_permission_answer(p_resource text, p_action text) RETURNS text`: a `STABLE` definer with `search_path = public`, plain SQL that never raises. It answers for the caller only (`auth.uid()`), one of four words:
     - `denied`: the core does not hold;
     - `allowed`: the core and the rule hold;
     - `stepUp`: the core holds, the rule does not, and the account has a verified totp factor;
     - `stepUpNoFactor`: the same, with no verified factor.
   - Grants: `authenticated` and the service role only. It gets its line in `scripts/public-surface-allowlist.txt` and its line in `scripts/doors/manifest.txt` (class `helper`, reason `caller:src/server/route.ts`).
   - Proofs, on scratch rows: each of the four answers; no caller and a deactivated account read `denied`; and for every case, `my_permission_answer(r, a) = 'allowed'` equals `has_permission(auth.uid(), r, a)`.
   - THE ROUTE. `callerHasPermission` (`src/server/supabase/user-client.ts`) asks this function and returns its answer. Its one caller, the route mechanism (`src/server/route.ts`), answers:
     - `denied` with 403, as today;
     - `stepUp` and `stepUpNoFactor` with 428 through `stepUpRequired` (`src/server/answer.ts`), carrying the sentence the door raises for the same case.
   - Tests: the unit tests of both files cover the four answers. One browser test (a new id, checked free): an aal1 staff session on a staff route reads 428, and nothing is written (G38).

3. QUESTION 2 — `get_my_permissions` STAYS as it is, named under Departures, for the reason your report gives. No route and no door reads authority from it.

4. QUESTION 3 — FILE 3 WRAPS THE FOUR STORAGE RULES. File 3 is the one further file of this stop (G39). It rides the final push, and the supervisor applies it on ethio-staging at the final report.
   - It recreates `category_assets_assets_delete`, `_insert`, `_update` and `_public_read` with each `has_permission(…)` call wrapped as `(SELECT public.has_permission(…))`. Everything else in each rule is byte-identical to its last state.
   - Proofs: the live catalog holds no policy that calls `has_permission`, `has_permission_scoped` or `is_super_admin` unwrapped; a staff aal2 session may write and read the bucket; a member may not.
   - The report pastes the same EXPLAIN probe after file 3, showing the call as an InitPlan.
   - CF-RLS-1 (new) in `scripts/conformance/` reads every policy's last state with the declarations reader your census used, and refuses such an unwrapped call. It is proven on a planted policy and wired.
   - The policies that call `auth.uid()` unwrapped are INC-1283, owned by Cursor bundle 7. They are not this bundle's.

5. FILE 3 MOVES THE TWO VIEW-AS READERS ONTO THE RULE (INC-1282).
   - `impersonated_get_profile(uuid)` and `impersonated_list_listings(uuid,integer,integer)` move from `door_context('reader')` to the staff-reader class with `impersonation:use`, in the same country cell as `begin_impersonation`'s manifest line. Every read then asks the permission and the session rule.
   - Each is redeclared whole (DEC-383), its live md5 pre-checked and its new md5 post-checked.
   - Their lines in `scripts/doors/manifest.txt` become `staff-reader` with `impersonation:use`, and `check-doors` agrees.
   - `end_impersonation` and `get_active_impersonation` keep their classes: ending a session must never need the factor.
   - Proofs, on scratch rows:
     - a holder at aal2 reads its own open session;
     - at aal1 the reader answers P0009;
     - a holder whose role no longer grants `impersonation:use` reads `permissionDenied`;
     - another person's session answers `noActiveSession`, as before.
   - Every browser test of the view-as pages is found by grep and passes, with its staff on the staff helper.

6. THE CENSUS, DRAWN AGAIN BY CLASS (Class 3). For every manifest line whose class is `owner`, `signed-in-reader` or `helper`, read its last declaration and say how the body decides whose rows it returns or changes:
   - the caller's own (the owner column is compared with `auth.uid()`);
   - public data;
   - or a row the caller holds (a session, an assignment, a link).

   A body of the third kind that reaches another person's data moves onto the staff or staff-reader class in file 3, or is named under Departures with its reason. The whole list goes in §13; it seeds bundle 7's standing check.

7. STAFF READS OUTSIDE THE ADMIN GATE. Name every staff or staff-reader door that a page outside `/admin` calls (the ad page's staff controls, the rail, the shell, My listings and any other), and what an aal1 staff session sees there after file 2. On each, the read is skipped at aal1, as the rail's alert is, or the page offers the code. No page draws a failure for it. Each gets its unit test.

8. QUESTION 5 — EACH OF THE 51 IS SORTED BY ITS SUBJECT.
   - (A) Its subject is a staff action or read that succeeds: it moves onto `signInStaff`.
   - (B) Its subject is a refusal, the step-up screen itself, or a member's or a stranger's answer (MF-*, DRF-*, IMP-5, CT-7, CT-7b and every one like them): it keeps its sign-in and asserts the answer the rule now gives.
   - §10 lists all 51 with A or B and one line of why.
   - All 51 run by id on ethio-staging, which now holds the rule, in both projects with 0 retries, after the change.

9. QUESTION 4 — CT-23 KEEPS ITS SUBJECT (the aal1 importer) and asserts the new answer.
   - Its preview is refused with 428 / `stepUpRequired`, and nothing is written: no import rows and no storage object (G38).
   - Its entry in `docs/tracking/ssr-error-allowlist.txt` becomes what the run now logs, or goes if nothing is logged.
   - The report names the test that proves the commit's success path at aal2.

10. THE BRANCH POINTER. Accepted: `git switch -C cursor/bundle-6` was a fast-forward, and the remote's head is `7958b605b`. From now on: when commits sit on a detached HEAD, use `git switch -C cursor/<task>` only after `git merge-base --is-ancestor cursor/<task> HEAD` succeeds. Otherwise STOP.

11. AN ENDED SIGN-IN IS REPORTED WHERE IT IS FIRST READ (INC-1274, its definition widened by Lovable's census).
    - The definition: every answer that says the caller's sign-in has ended. That is the route client's signed-out answer, a 401, and the door client's `notSignedIn`.
    - The law: the client that reads the answer reports it once, to the same listener `reportUnauthorised` serves. `src/lib` imports nothing from `src/features`: the shell registers the listener. No consumer has to remember.
    - Every consumer then maps the answer to the signed-out state, never to "unreachable", a bare `Error` or a generic failure. The census finds them by `rg 'kind === "signedOut"' src` and by every read of a 401. Known today: `src/features/posting/posting-service.ts` (it reads the answer as unreachable), the category images service, the translations service and the map's geocode.
    - The posting form then asks the person to sign in again and never "keeps trying".
    - Tests: each client's unit test proves one report for one answer; each consumer's test proves its state; one browser test covers the posting form.

12. DEC-400's "asks no second factor" (the reveal door's comment) means its per-call step-up. The session rule still applies through `door_context`'s staff class, as file 2 builds it. No change.

13. DLG-E12, AND THE FINAL PUSH'S EXPECTED RED.
    - The final report's §13 carries the error context of DLG-E12's failing assertion and the trace's last ten actions (ruling 1, decision 15).
    - The staging preflight answers STAGING BEHIND for file 3 until the supervisor applies it at the final report. That red is named here, and it is not re-run.

SCOPE WIDENED by this ruling, each path with its tests:
- `src/server/supabase/user-client.ts` with `src/server/supabase/user-client.test.ts`
- `src/server/route.ts` with `src/server/route.test.ts`
- `src/server/answer.ts` with `src/server/answer.test.ts`
- `src/lib/route-client.ts` with `src/lib/route-client.test.ts`
- `src/features/posting/posting-service.ts` with `src/features/posting/posting-service.test.ts`, and each other consumer decision 11 finds, with its tests
- `scripts/doors/manifest.txt` with `scripts/doors/check-doors.test.ts`
- `scripts/public-surface-allowlist.txt` (the migration guard reads it)
- `supabase/migrations/` (file 3)
- `docs/tracking/ssr-error-allowlist.txt`
- `scripts/conformance/` (CF-RLS-1, new), with its test (new)

NUMBERS:
- DEC-465 (decision 2);
- INC-1282 (decisions 5 and 6) and INC-1283 (decision 4);
- CF-RLS-1;
- file 3's mark, chosen at its commit (G39's form);
- your proposed test ids, each checked free.

The record text goes in §14 word for word. INC-1282 is named there by its number alone until its fix is live.

THEN: build Part 4 and decisions 2, 4 to 9 and 11, with file 3 written and proven by `bun run db:proof --fresh`. Then steps 6–10 as the brief orders, with one final push.
