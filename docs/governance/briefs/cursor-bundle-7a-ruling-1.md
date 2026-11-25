RULING — cursor-bundle-7a, stop 1: the plan approved, the twelve questions answered. Base: cursor/bundle-7a c64ae6bad

**MODEL — Claude Sonnet 5.5, in a NEW Cursor chat (the build, DEC-414). It first reads the brief, `docs/governance/reports/cursor-bundle-7a.stop-1.md` and this ruling.**

Save this ruling by scripted copy as `docs/governance/briefs/cursor-bundle-7a-ruling-1.md` (sha256 in the carrier). Your census is accepted whole: the five premises it found wrong (P1 to P4, and the `manage` rows) are recorded, and the plan's parts, file order and guard ids stand as written, with the changes below.

PREVENTION (G70)
- Class 1 — a ruling said what a door spends without reading its shell order (bundle 6, ruling 3: "no dial when nothing changes"; `door_context` spends the dial before the body reads anything). S785.
  - Repository — not needed: the dial-first order is the mechanism's, and it is right (the dial rations calls).
  - Instructions — in force now: before a ruling says what a door writes or spends, the supervisor reads its shell order.
  - Cursor rules, Knowledge — not needed.
- Class 2 — one status table lives in two places (the database and the client mirror) and reaches production by two steps (a migration apply and a Publish), so a code that moves class reads as malformed between them (INC-1296).
  - Repository — owner Cursor bundle 7b, with the route client's typed failure: an agreement rule that lets a class move after launch roll out with no window, with its proof. Not this turn (decision 2).
  - Instructions, rules, Knowledge — not needed.
- Class 3 — a reader that knows one statement form misses another: `scripts/doors/policies.ts` and CF-RLS-1 read `CREATE POLICY` but not `ALTER POLICY` (F5, INC-1300).
  - Repository — changed here (decision 7).
- Class 4 — a failed read shown as a state: the step-up dialog says "set up an authenticator" when the factor read failed (F1, INC-1299).
  - Repository — changed here (decision 6). DEC-464 already states the rule.

THE OPERATOR'S DECISION (2026-11-25, 09:5x New York) — DEC-473: importing categories stays super-admin only, as its migration of 7 September designed (`20260907185010_5736cb8a-7bc8-4cad-98b9-06478c377ad8.sql:6`). No grant is expanded. The `manage` permissions nothing asks by name are removed.

LIVE ROWS, read by the supervisor on ethio-prod at 15:0xZ:
- `admin` (2 holders) holds `categories:` assets, create, manage, restructure, update, view.
- `admin` also holds `translations:` approve, machine, manage, update, view.
- `translator` holds `translations:` update, view.
- No role has a parent role.
- `manage` permissions with no holder: `countries`, `listings`, `locations`, `permissions`, `profiles`, `roles`, `services`, `user_roles`.
- The supervisor reads ethio-staging's rows after its apply. Every statement below works by name, so it holds whatever either project has.

DECISIONS
1. Q1 (DEC-473). Migration A also deletes, on both projects, every `manage` permission that no door, policy, route or screen asks by name. Its grants go first, then the permission row: `categories`, `countries`, `listings`, `locations`, `permissions`, `profiles`, `roles`, `user_roles`. `translations:manage` and `services:manage` stay, because doors ask them by name.
   - The census's list is the truth: re-run it on your final tree. A name it finds asked anywhere stays and is named under §10.
   - The proofs use scratch rows only (G27). The real rows are read back by the supervisor after each apply.
   - `perm-vocabulary.test.ts` or any other reader of a removed name follows under DECIDE-AND-NAME.
2. Q2 — no tolerance in `classify`. §12's operator steps say: apply A to E on ethio-prod, then Publish in the same sitting. In the minutes between, a moved code reads as a failure with Retry. The site is not launched; INC-1296 carries the rule for after launch.
   - On staging: the supervisor applies your files only after Lovable's #104 has merged, so #104's runs never meet the new table. Expect a wait at the migration stop. Nothing else waits on it.
3. Q3 — the classes as you proposed them: GONE 404 (your 31), CHANGED 409 (your 29). The 17 borderline codes and every other code stay 400.
   - The rule, written in `docs/features/doors.md`: GONE — the row the caller named is not there, or not theirs to see, and the next step is to go back. CHANGED — the row is there, but its state now forbids the action, and the next step is to reload. 400 — the caller's input must change.
   - The 400 codes go in a CLASS REGISTER, not an allowlist: `scripts/conformance/refusal-classes.txt` (new). One line per code or per family prefix (`bad*`), `code | reason`, with no `until`, because a class is not an exception.
   - CF-REFUSAL-6 reads every code raised in a last declaration (all 226, the 28 unlisted ones included) and every manifest code. It fails on any of: a code in no class; a code in two classes; a register line that matches no raised code; a family line that covers a 404 or 409 code. Planted cases for each.
4. Q4 — under DECIDE-AND-NAME you edit, because none of these files is in #104 (read by the supervisor at `6b43b270a`, COUNT: 145 := git diff --name-only db0b43c9c 6b43b270a | wc -l; none of these):
   - `src/features/admin-listings/use-admin-listing.test.ts` ALV-3: `listingNotFound` arrives at 404 and still classes `refused`.
   - The route test fixtures that mock a database answer for a moved code take that code's status (a fixture says what the database sends): `src/routes/api/listings/photos.test.ts` PHT-5, `src/routes/api/listings/draft.test.ts` :177 `notYourListing`, `src/routes/api/publish.test.ts` :112 `notYourListing`, `src/routes/api/attributes.options.test.ts` ATO-7 and ATO-8.
   - SIDE BY SIDE is narrowed for these files only. Lovable's next turn on #104 changes these files, so you do not touch them: `scripts/conformance/refusal-readers-allowlist.txt` (read by `scripts/conformance/refusal-readers.test.ts`), `scripts/conformance/provider-errors-allowlist.txt` (read by `scripts/conformance/provider-errors.test.ts`; removed lines only), `src/test/provider-errors.ts`, `src/features/admin/legal/legal-service.ts`, `src/features/admin/translations/translations-service.ts`, `src/features/admin-screening/use-screening.ts`, `src/features/admin-listings/listing-settings.tsx`, `src/features/ad-page/report.test.ts` and `src/features/my-listings/my-listing-edit.test.ts`.
   - The routes' own statuses stay: `notYourListing` at 403 and `photoGone` at 409, with PP-26, `e2e/photo-pipeline.spec.ts:2023` and PR-49. Bundle 7b aligns them, named in your §13.
5. Q5 — an unchanged `user_set_preferred_language` spends `account_pref`. The dial rations calls, and the shell spends it before the body reads (G74 law 2).
   - The body locks the profile row (`SELECT … FOR UPDATE`). When the code equals the stored one, it answers ok with no update and no audit. Bundle 6 ruling 3's "and no dial" is withdrawn (S785).
   - CT-23: the audit exclusion goes. The meter exclusion stays, with a comment naming its writer (the sign-in's account rule) and its reason ("an unchanged call is still a call; cursor-bundle-7a ruling 1, decision 5"), in place of its `until`.
   - `save_posting_identity` and `save_seller_place` stay as they are: no audit, so no false trail, and the stamp is the row's own. Named in §13 as accepted.
6. Q6 — the no-factor mode stays for user-case 1, because there it is the truth: the factor is gone. User-case 2, a failed factor read, becomes a failure: an existing key, a Retry, never "set up an authenticator" (INC-1299). A unit test for each case in `src/features/auth/mfa/`. no-new-string holds.
7. Q7 — `ALTER POLICY … USING ((SELECT auth.uid()) …)`, each expression otherwise byte for byte (INC-1300):
   - `scripts/doors/policies.ts` and `scripts/conformance/rls-initplan.ts` learn `ALTER POLICY … USING` and `WITH CHECK`; the last statement wins. Each gets a planted case: an `ALTER` that rewrites a policy is judged by its new text, and an `ALTER` a reader cannot parse fails, never skips.
   - The policy proof in migration C stands as you planned (rows read as the owner and as another person, equal before and after), plus the EXPLAIN in the stop report.
8. Q8 — keep `profiles_seller_alias_lower_key` and `category_tree_pointers_child_idx`; drop `profiles_alias_unique` and `idx_ctp_child`.
   - Also drop `category_tree_pointers_parent_idx` (F3): it is a prefix of `idx_ctp_parent(parent_id, display_order)`, and INC-1294's class (one index per need) covers it. Give the census of its name's readers.
   - In the migration stop report, show an EXPLAIN of a lookup of `category_tree_pointers` by `parent_id` on the local stack after the drop, using `idx_ctp_parent`.
9. Q9 (DEC-472) — SCOPE widens to `.github/workflows/ci.yml` (the smoke lane's one new step) and `scripts/ci/` (the new script and its test).
   - The step runs `supabase db advisors --local --type performance` after the local backend's migrations and reads the JSON. It fails on any `auth_rls_initplan` or `duplicate_index` finding, and prints the count of every other lint to the log only.
   - Guard id CF-ADVISOR-1 (free by `rg`). Its test proves a planted finding of each of the two names fails and a finding of any other name passes. `scripts/conformance/wired.test.ts` names its caller.
   - DEC-472's frozen judge (G22): over the first ten smoke-lane runs after the merge, the step takes at most 60 s each and reports no finding that the hosted advisor on ethio-staging does not show. If either fails, it moves to the nightly by a new DEC.
10. Q10 (DEC-471) — `scripts/conformance/door-rows-allowlist.txt` (new), each line `door | class: reason | until`.
    - The permanent classes are `public` (reads no person's row) and `delegates` (a helper whose callee compares). Their `until` is `DEC-471`.
    - DEC-471: a door that reads no person's row is public by design, and the door-rows census names it in that list. A line for any other reason carries a date or an INC.
11. Q11 — the matching rule as you proposed it. The column compared must come from a table row the body selects, updates or deletes; a literal or an argument does not count.
12. Q12 — `has_permission` gets the line `has_permission | delegates: has_permission_core compares p_user_id with auth.uid() | DEC-471`.

FINDINGS FILED (the numbers are yours to write in §14)
- F1 → INC-1299, built here (decision 6).
- F2 → INC-1297: `notYourListing` and `listingNotFound` are distinct codes, so the code tells a stranger a row exists. On the before-launch list (G71). §13 names it.
- F3 → INC-1294, built here (decision 8).
- F4 → INC-1298: translator targets read direct grants without the role hierarchy. Before-launch list; no role has a parent today.
- F5 → INC-1300, built here (decision 7).
- F6 → accepted (decision 5), named in §13.

NUMBERS ASSIGNED (G66): DEC-471, DEC-472, DEC-473 (the operator's), INC-1296 (owner Cursor bundle 7b), INC-1297, INC-1298, INC-1299, INC-1300. Register rows are numbered at the records turn. Each migration's mark is chosen at its commit (G39's form).

THE MIGRATION STOP: your five files A to E, in that order, with a DROP in D. The supervisor reads every file. The operator pastes them on ethio-staging from one message of links (DEC-384), after #104 has merged (decision 2). The supervisor reads them back and sends the client types patch if any signature changes. You state in the stop report whether one does.

THE OPERATOR'S STEPS in §12, in order:
- Production files A to E, then Publish in the same sitting (decision 2).
- What changes for people: `admin` can no longer import categories (DEC-473), and the unused `manage` ticks leave the Roles console.
