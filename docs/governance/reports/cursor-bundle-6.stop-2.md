MIGRATION — cursor-bundle-6 part 3: the staff-session rule (DEC-461), two files
DONE: parts 1, 2, 3 (as the ruling's closing line orders), steps 0–5 up to the migration stop
LEFT: part 4 (the gate mounted in `AdminGate`, STAFF-E1/E2), steps 6–10 (the checks, the self-review, the one push, the report, CI green)
CI: the last completed run read at step 1 was `1bbfc7dad` SUCCESS (stop 1); this branch has not run on CI yet (the first push is this stop's)
FILES: `git diff --name-only dc380c177~1..HEAD` is the list at the head of this commit; the two migrations are named below

Base 1bbfc7dad. Scratch files of this turn live in `/tmp/ethio-scratch/cursor-bundle-6/` (the operator's to remove).

# THE TWO FILES

The rule's file came to 48.6 KB in one piece, over the ~25 KB line of rule 30, so it is split by concern into two ordered files
(each its own mark, pre-check, proofs; file-name order equals mark order). Both are born closed, whole redeclarations carry the
header unchanged, no `e2e-areas` header (the change selects every area).

| file | sha256 | mark | creates or redeclares | proofs |
|---|---|---|---|---|
| `20261124203700_35cf3a64-bf12-4a27-91fe-5fb7c778855f.sql` | `948093560defd343253729717cc217e6e75e8d3a27b3d6f8daa9c44fab8c9b20` | `20261124220000` | NEW `has_permission_core` (the old `has_permission` body byte for byte), NEW `staff_session_holds` (the rule), `has_permission` (whole: core AND rule), NEW `has_permission_scoped_core` (the old scoped body but for its one line that asked `has_permission`), `has_permission_scoped` (whole: scoped core AND rule) | (a) catalog facts of the five (definer, `search_path=public`, no PUBLIC/anon grant, closed to browser roles but `has_permission`'s own grant, md5 of every body), (b) the rule: aal1 false with and without a factor, aal2 without a verified factor false, an unverified factor does not count, aal2 with a verified factor true, a super admin held to it, (c) a member's own permission and `admin_panel:access` true at aal1, a member holding a staff permission false, (d) the unchanged answers (a super admin about another person, a stranger about another person, the service role, a session with no role; the core answers a staff self-check true at aal1), (e) `has_permission_scoped` and its core, (g) the live catalog: the policies naming `has_permission` are exactly the four storage-bucket rules and none reads authority another way |
| `20261124203800_a437e3a7-89f1-4a9b-ad17-8f201c93502c.sql` | `c3574b19f548757d00a3a28e02cfd7837b124add9309c05a9dd244686b0770dc` | `20261124220100` | `door_context` (whole from `20261120100000` :64: asks `has_permission_scoped_core`, then for the `staff` and `staff-reader` classes the rule, refusing P0009 — `step-up required: no verified factor` or `step-up required` — after the permission and before step-up) | (a) header, grants and body md5, (f) `staff` and `staff-reader` at aal1 with a factor (`step-up required`), at aal1 with none (`step-up required: no verified factor`), at aal2 with a factor (the caller answered), a member at aal1 and aal2 (`permissionDenied`, never P0009; door_refuse's own code P0D01 or its PGRST envelope), the owner and reader classes untouched, no caller (`notSignedIn`) |

Sha256 are of the committed files (`git show HEAD:<path> | sha256sum`). Every pre-check reads the live md5 of the body it redeclares
(`has_permission` `c633eae927473b96a4e228a7bdd1356a`, `has_permission_scoped` `3825186312d23eb61175be8134b624f8`, `door_context`
`aa7e8bc66d8a6698a851cc3843c4cabc`) and the previous mark (`20261123150000`; file 2 reads file 1's `20261124220000`). The mark is the UTC
hour of the commit (20) rounded up (21) plus one hour (22:00), then +100 for file 2; committed at 20:50 UTC.

Proof data: scratch accounts, a scratch resource, permission and roles, scratch `auth.mfa_factors` rows whose secret is drawn at run
time (`substr(md5(gen_random_uuid()::text), 1, 16)`); every proof runs under a sentinel rollback and leaves nothing.

pre-stop scan: 7 of 7, 35cf3a64 a437e3a7

Guards (`bash scripts/check-migrations.sh`, last line): `Migration guard OK.` Spanning-literal guard OK, random-text guard OK, real-row
proof guard OK, self-marking guard OK.

`bun run db:proof --fresh` on the final migration tree: `db:proof PASS — applied 555/555, CLI 2.120.0, cold, 58 s`.

apply 35cf3a64 → expect mark 20261124220000
apply a437e3a7 → expect mark 20261124220100

The stop holds two migration files and no DROP, so the carrier is the operator's usual apply of the two, in this order. Staging answers
"STAGING BEHIND" until both marks are there — expected. The moved e2e tests were run on staging BEFORE the files existed in the tree
(the preflight refuses a tree with an unapplied file): aal2 is a superset of aal1, so they pass on the old rule and on the new one
(below). After the apply the preflight passes again and the rule's effect on the tests that still read as aal1 shows (the list below).

# THE CHOICES THE FILES MAKE

- Decision 2's rule: a self-check (`p_user_id = auth.uid()`, role `authenticated`) of a permission the member role does not hold is
  true only for an aal2 session (`auth.jwt() ->> 'aal'`) with a verified totp factor (`auth.mfa_factors`). The member role's set is
  read from its grants (role `user`, the role `handle_new_user` gives everyone; hierarchy and `manage` as the core reads a grant), never
  a literal list. The cheap test (aal2 AND a factor) is evaluated first, the member-role read only for a session without it.
- K4: the base role's name `user` is a literal in `staff_session_holds`. No SQL constants function for it exists (`handle_new_user` and
  `admin_get_role` read it as a literal too); named here, no new constants mechanism built (K1, A2).
- `door_context` asks the scoped core, so a member still reads `permissionDenied` first; the class check names no permission of its own.
- A super admin is held to the rule at aal1 (proof (b)); `promote_to_super_admin` is closed to browser roles (`20261023100132`:506) and
  not a path.

# DECISION 2's ADDENDUM — every staff authority check that does not go through the two functions

Method: `lastDeclarations` over every migration (the live text of each function), the policies' last state (130), the browser tree,
the server routes. `/tmp/ethio-scratch/cursor-bundle-6/auth-census.ts`, `policy-census.ts`.

Functions reading `is_super_admin`, `user_roles` or a role name that do NOT reach `has_permission`, `has_permission_scoped` or
`door_context`:

| function | what it does | verdict |
|---|---|---|
| `is_super_admin` (`20260809010130`) | the primitive: reads `user_roles` for the super_admin role | stays — a primitive; every caller that grants anything goes through the core, which this file puts under the rule |
| `promote_to_super_admin` (`20260809010130`) | grants the super_admin role | EXECUTE revoked from `authenticated` (`20261023100132`:506); service role only — not a staff path |
| `profiles_status_guard` (`20260816120338`) | a trigger: a super admin cannot be deactivated | grants nothing; stays |
| `handle_new_user` (`20261023144720`) | gives every new account the `user` role | the base role the rule reads; stays |
| `user_roles_protect` (`20260809010922`) | a trigger that refuses unprotected edits of role rows | guards the table; grants nothing; stays |
| the two new cores | read `is_super_admin` and `user_roles` (the core is the old body) | by design: the cores answer without the rule |

Policies (last state of all 130): exactly four name `has_permission(` — the storage-bucket rules `category_assets_assets_delete`,
`_insert`, `_update`, `_public_read` — and none names `has_permission_scoped(`, `is_super_admin(`, `user_roles` or `has_role(`; proof (g)
judges the live catalog on every apply. The data tables' staff policies were dropped by `20261123020700` (18 policies) and read through
doors. So: no staff authority check bypasses the two functions; nothing needs to move; nothing is named under Departures for this.

The server: `callerHasPermission` (`src/server/supabase/user-client.ts`) asks `has_permission` as the caller — at aal1 a staff caller is now
answered "no", i.e. a staff route answers 403 (not 428) to an aal1 staff session that has not used its factor. Read on the route
(`src/server/route.ts`): the staff door through `door_context` answers P0009 → `stepUpRequired` (428). The two differ by which check the route
makes first; a 403 for an aal1 staff session is the same refusal a person without the permission reads, which is the rule's design
(decision 1 names P0009 for the doors; the route check is a permission check). QUESTION 1 below.

The data API: no browser role reads a staff table (the eight tables lost their SELECT in `20261123020700`, the same file that dropped the eighteen rules); the storage policies above are the only
policy readers, proof (g).

# THE CLIENT'S READS AT aal1 (the census the ruling asks for)

| read | what an aal1 staff session sees | after the factor |
|---|---|---|
| `get_my_permissions` (`usePermissions`, `MY_PERMISSIONS_KEY`, staleTime 5 min, cache root `AUTH_DERIVED_ROOT`) | a reader (`20261106051800`): it lists every slug the account's roles hold, regardless of aal — NOT moved onto the rule | identical list; the rail, the bottom bar and the session policy draw the same before and after, and the server refuses what the rule refuses |
| `AdminGate` | reads `admin_panel:access` from that list; the rule exempts it, so it answers true at aal1 as before; part 4 mounts the gate that sends aal1 to the code or the setup | the gate's own panels (part 4) |
| the rail's `legal_review_overdue` alert (`nav-alerts.ts`) | not read at aal1 (the client's `getAal()`); a refused read is never drawn as failed; staleTime 0 while the answer is `null` | read at once when the level is aal2 (`staleTime` function) |
| doors a staff screen calls | P0009 `step-up required` (428) | after the factor the same door answers |

`get_my_permissions` is named under Departures: moving it would blank the rail at aal1 before `AdminGate` can send the person to the code,
and it grants nothing (a hint the server re-judges). No read keeps showing an aal1 answer after the factor. QUESTION 2 asks to confirm.

# EXPLAIN — one hot policy read, before and after

Scratch probe (never committed; the rolled-back `DO` block in `/tmp/ethio-scratch/cursor-bundle-6/probe-plan*.sql`): a scratch super admin,
3000 scratch rows in `storage.objects` under `category-assets`, `SET LOCAL ROLE authenticated`, `EXPLAIN (ANALYZE, COSTS OFF)` of
`SELECT count(*) FROM storage.objects WHERE bucket_id = 'category-assets'` — the read the four storage rules make with `has_permission`.
The plan's shape is the same before and after (a bitmap scan on `objects_bucket_id_name_version_key`, the policy as the filter, evaluated
once per row — `has_permission` is a STABLE definer function, not hoisted):

- BEFORE: `Bitmap Heap Scan … rows=3000`, `Filter: has_permission(…, 'categories', 'assets')`, Execution Time 194.2 / 179.2 / 178.3 ms
  (≈ 0.06 ms a row).
- AFTER, a session with a verified factor at aal2: same plan, `rows=3000`, Execution Time 1497.5 / 1490.0 ms (≈ 0.5 ms a row).
- AFTER, a session without a factor: same plan, `Rows Removed by Filter: 3000`, `rows=0`, Execution Time 1597.2 / 1662.4 / 1649.7 ms.
  (My first ordering of the rule — member-role read first — measured 1766.7 / 1721.5 / 1726.7 ms; testing the factor first took ≈ 13 %
  off, the plan unchanged.)

So the rule makes the per-row cost of a staff session's policy read about eight times what it was (0.06 → 0.5 ms), because every row now
pays two further definer calls and the factor lookup. A non-staff reader (anonymous, member) pays nothing more: the core answers false
first and the rule is not reached (the same probe as a member was not run; the CASE order says so — QUESTION 3 offers to measure it).
The probe's 3000 rows are a stress; the four rules guard the category-images bucket (a few dozen rows). The lever that removes the per-row
cost is the policy side — `(SELECT public.has_permission(…))` makes the planner evaluate it once as an InitPlan — which edits four policies
(storage owner-schema policies, outside this part's scope and needing its own migration). Not done; ruling asked (QUESTION 3).

# THE TESTS

Moved onto the staff helper (`e2e/helpers/staff-factor.ts`, one place that makes a test staff — aal2 with a verified factor): the Part 2
list, by `--grep` over 29 spec files on staging (old rule), `mobile-360` and `desktop-1280`, 0 retries:
first run `299 passed, 5 skipped, 4 failed`; the four failures and their roots:
- `AS-1` (desktop-1280) and `LGA-21` (mobile-360): `signInStaff` after a persona's `switchUser` in the same page — the earlier persona's
  init script re-ran on the next load and cleared the injected session. Fixed at the root: `signInStaff` registers its session as an init
  script too (the last registered wins, INC-120b).
- `CT-23` (both): its SUBJECT is an un-stepped-up importer (an aal1 session), which the helper's header names as a keeper; it is back on
  `switchUser` with a comment saying so. Under the new rule its PREVIEW is refused (428 / P0009) before its commit — one expectation
  changes after the apply, the line in `docs/tracking/ssr-error-allowlist.txt:19` (`commit_failed step-up required`) with it. Not rewritten
  now: it cannot be run on a staging that does not hold the rule. QUESTION 4.
Re-run after the fix (`AS-1`, `LGA-21`, `CT-22`, `CT-23`, both projects, staging, 0 retries): `8 passed (1.2m)`.

NOT moved — census output, not run against the rule (it is not on staging): the gate-reach census (`gate-reach.ts`, with the policies:
a page or node caller at aal1 reading a staff table through the data API finds none — no browser role reads a staff table) lists 144
staff-reaching tests; 62 are not named in the moved list, 11 of those are whole-file moves (below), so 93 are moved. The 51 tests below remain on `asPerson` / `switchUser` / hand-made sessions (spec:line, id, doors).
Several are subject-keepers (MF-1…9 are the step-up screen's own, IMP-5, CT-7, DRF-1…6 are refusals); I have not judged which, one by one,
and name them all rather than guess: QUESTION 5.

```
e2e/admin-screening.spec.ts:297 SC-16 | :985 SC-21
e2e/admin-listings.spec.ts:342 AL-24 | :355 AL-25 | :468 AL-5 | :665 AL-9 | :1969 AL-29 | :2081 AL-31 | :2403 ATR-4
e2e/legal-doors.spec.ts:360 LG-3 | :955 LG-10 | :1010 LG-11 | :1120 LG-13 | :1152 LG-14
e2e/sage-ad-page.spec.ts:349 SAP-3 | e2e/auth-signout.spec.ts:473 SP-6 | :764 SO-14 | :808 SO-15 | :844 SO-16
e2e/admin-audit.spec.ts:320 IMP-5 | :345 IMP-6 | e2e/my-listings-doors.spec.ts:321 ML-2 | :637 ML-9 | :694 ML-10
e2e/my-listings-ad.spec.ts:659 MLA-8 | e2e/admin-categories-console.spec.ts:464 CT-7 | :490 CT-7b
e2e/legal-admin.spec.ts:507 LGA-7 | :541 LGA-8 | :556 LGA-9 | :638 LGA-13 | :691 LGA-15 | :733 LGA-16 | :786 LGA-17
e2e/door-refusals.spec.ts:126 DRF-1 | :147 DRF-2 | :222 DRF-5 | :253 DRF-6
e2e/mfa-stepup.spec.ts:82 MF-1 | :134 MF-3 | :149 MF-8 | :186 MF-4 | :218 MF-5 | :255 MF-6 | :362 MF-7c | :394 MF-9
e2e/legal-certify.spec.ts:647 LGC-3 | e2e/one-line-slots.spec.ts:99 OLS-3 | e2e/admin-translations-console.spec.ts:102 TR-1 | :375 TR-9
e2e/import-security.spec.ts:797 | e2e/admin-locations.spec.ts:516 LT-6 | e2e/photo-pipeline.spec.ts:630 PP-13
e2e/one-line-slots-admin.spec.ts:76 OLS-6 | :80 OLS-7 | :84 OLS-8 | :88 OLS-9 | :92 OLS-10
```

(Whole-file moves — CI-2, CI-2b, CI-3, CI-4b in `category-image-routes.spec.ts`, the `import-security`, `one-line-slots-admin` and
`sage-ad-page` helpers — are in the Part 2 commits; the census line numbers above may name a moved test whose helper sits in a
`beforeEach`.)

`DLG-E12` on `webkit-1280` with `--trace on`: red at `e2e/dialogs.spec.ts:833` (`expect(sizeList).toBeVisible()`, element not found);
trace at `test-results/dialogs-a-Filters-panel-in-4e029-ses-the-list-then-the-panel-webkit-1280/trace.zip` on the operator's machine. No
fix, as ruled; the evidence goes in the report's §13.

# DEPARTURES

1. `get_my_permissions` is not moved onto the rule (above).
2. `staff_session_holds` names the base role `user` as a literal (K4, above).
3. The migration is two files, not one (rule 30's size line).
4. `callerHasPermission` answers an aal1 staff session "no" (403), a door answers P0009 (428) — QUESTION 1.
5. The policy-side `(SELECT has_permission(…))` lever is not built — QUESTION 3.
6. 51 gate-reach tests are not moved — QUESTION 5; CT-23 kept on `switchUser` — QUESTION 4.

# QUESTIONS

1. A staff ROUTE (`callerHasPermission`) answers 403 to an aal1 staff session, a staff DOOR 428 (P0009). Make the route answer 428 for a
   caller who holds the permission only at aal2 (a second read, `has_permission_core` is service-only so it would be a route-side check of
   the session's level), or keep 403?
2. Confirm `get_my_permissions` stays as it is (a hint the server re-judges).
3. The staff-policy read costs ≈ 0.5 ms a row instead of ≈ 0.06 ms. Add a follow-up migration that wraps the four storage rules in
   `(SELECT …)`, or accept the cost for a bucket of a few dozen rows?
4. CT-23: rewrite after the apply to expect the preview's refusal (and move the ssr-error allowlist line), or drop the preview step?
5. The 51 tests: move all onto the staff helper in a part of this bundle (and re-run after the apply), or name the subject-keepers and move
   the rest?
