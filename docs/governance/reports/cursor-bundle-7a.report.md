# Cursor bundle 7a — the server's authority reads the role matrix exactly (DEC-466); a refusal's status names "gone" and "changed" (INC-1287); every policy asks who is signed in once per query (INC-1283); a door that decides by a row names its rule (INC-1282's class); a setter that changes nothing writes nothing (INC-1290); the two duplicate indexes (INC-1294) — report
Base: db0b43c9c (the brief's; this pull request re-lands #105 on dev 3123c75e4, ruling 3) · Final commit: cb4313fee (cb4313feec780669ad12ccf6a7aab2babc86f10c) · Brief: docs/governance/briefs/cursor-bundle-7a.md (sha256 44bd83e5172490a0cdd0ff00f89147c58bf76516245c91e5fb2dd15aeb218fae)
Review: READY · 0 BLOCKER · 0 MAJOR · 2 MINOR · on cb4313f

CI line (the turn opens with it): dev `3123c75e4` (the re-land's base), SUCCESS, run 45679601725, lanes skipped — the code tree was proven by run 45673729426. The earlier completed runs of this lane: 45664029304 on `d8bc2ea07` (#105, FAILURE in Component tests and First-paint bundle budget on its merged tree, fixed by the re-land); 45689374949 on `5690ac2db` (this branch, SUCCESS). The run of the final code commit is in §11.

## 1. Done / not done, by part and step

- STEP 0 — done (the brief saved by script, sha256 equal; roadmap line 3; `briefs-allowlist.txt` cleaned; `check-go` "no finding"). STEP 1 — done (`cursor-bundle-7a.stop-1.md`, ruling 1).
- Part 1 (DEC-466, concern 1) — done: migration A deletes the unasked `manage` permissions (grants first, then the permission row: `categories`, `countries`, `listings`, `locations`, `permissions`, `profiles`, `roles`, `user_roles`; `translations:manage` and `services:manage` stay, asked by name) and redeclares the three cores to read a grant exactly; guard CF-GRANT-1 (`permission-grants.ts`, CFPG-1..4).
- Part 2 (INC-1287, concern 2) — done: migration B (`door_refusal_status` and `security_lints`), the client mirror `REFUSAL_STATUS` (GONE 404 for 31 codes, CHANGED 409 for 29), `refusalAnswerStatus` and `codeStatus` pass 404/409, `scripts/conformance/refusal-classes.txt` (the 400 class register), CF-REFUSAL-6 (CFRR-10..12). No tolerance in `classify` (ruling 1 decision 2).
- Part 3 (INC-1283, INC-1294, INC-1300) — done: migration C (`ALTER POLICY … (SELECT auth.uid())` on the advisor's nine policies, bodies otherwise byte for byte), migration D (drops `profiles_alias_unique`, `idx_ctp_child`, `category_tree_pointers_parent_idx`), CF-RLS-1 widened to `auth.uid()`, `auth.jwt()`, `auth.role()`, `auth.email()` and `current_setting(` (CF-RLS-1a/1d/1e), `policies.ts` and `rls-initplan.ts` read `ALTER POLICY` (POL-ALTER-1..6).
- Part 4 (INC-1282's class, DEC-471) — done: `door-rows.ts` + `door-rows.test.ts` (CFDR-1..7) + `door-rows-allowlist.txt` (9 lines, each `door | class: reason | until`).
- Part 5 (INC-1290, concern 5) — done: migration E (`user_set_preferred_language` locks the row, an unchanged value writes no update and no audit and still spends `account_pref`); CT-23 lost its audit exclusion and keeps its meter exclusion, with the ruled comment.
- STEP 2's MIGRATION STOP — done (`stop-2.md`); the operator applied A to E on staging, the supervisor read them back.
- STEP 3 — done: finding 6 (`use-step-up.ts`, `step-up-dialog.tsx`, `step-up-gate.tsx`: a failed factor read is a failure with Retry, the no-factor mode stays for "factor gone"; SUH-1..3, SUD-3/4); finding 7 (`HELPER_REASONS` comment); DEC-472's step (`scripts/ci/advisor-lints.ts` + test, the smoke-lane step in `.github/workflows/local-backend-proof.yml`, CF-ADVISOR-1a..1f, named in `wired.test.ts`) — the step's file is `local-backend-proof.yml`, not `ci.yml` (ruling 2).
- STEP 4 — done on `cb4313fee` (§5). The re-land (ruling 3): the lane's 52 files copied by script and proven equal, the four files made on the new base, ruling 4's CT-23 wait.
- STEP 5 — one push of this re-land after the stop pushes (`stop-5.md` was pushed with the draft #107; the final push is `cb4313fee`). The pull request stays a draft until the supervisor says the run is green (ruling 4).
- STEP 6 — this report.
- Not done: nothing the brief asked for is left. Bundle 7b owns the rest (client half, routes' own statuses).

## 2. Files changed
`git diff --name-only 3123c75e4` (the re-land's base; against the brief's base `db0b43c9c` the list also carries dev's own changes, 173 paths, which are not this lane's):

```
.github/workflows/local-backend-proof.yml
docs/features/ci-local-backend.md
docs/features/doors.md
docs/features/step-up-auth.md
docs/generated/i18n-usage.json
docs/governance/briefs/cursor-bundle-7a-ruling-1.md
docs/governance/briefs/cursor-bundle-7a-ruling-2.md
docs/governance/briefs/cursor-bundle-7a-ruling-3.md
docs/governance/briefs/cursor-bundle-7a-ruling-4.md
docs/governance/briefs/cursor-bundle-7a.md
docs/governance/reports/cursor-bundle-7a.stop-1.md
docs/governance/reports/cursor-bundle-7a.stop-2.md
docs/governance/reports/cursor-bundle-7a.stop-3.md
docs/governance/reports/cursor-bundle-7a.stop-4.md
docs/governance/reports/cursor-bundle-7a.stop-5.md
e2e/admin-categories-lifecycle.spec.ts
e2e/helpers/account-language.ts
public/i18n-usage.json
roadmap.md
scripts/ci/advisor-lints.test.ts
scripts/ci/advisor-lints.ts
scripts/conformance/briefs-allowlist.txt
scripts/conformance/door-rows-allowlist.txt
scripts/conformance/door-rows.test.ts
scripts/conformance/door-rows.ts
scripts/conformance/permission-grants.test.ts
scripts/conformance/permission-grants.ts
scripts/conformance/provider-errors-allowlist.txt
scripts/conformance/refusal-classes.txt
scripts/conformance/refusal-readers.test.ts
scripts/conformance/refusal-readers.ts
scripts/conformance/rls-initplan.test.ts
scripts/conformance/rls-initplan.ts
scripts/conformance/wired.test.ts
scripts/doors/manifest.ts
scripts/doors/policies.test.ts
scripts/doors/policies.ts
scripts/route-budgets.mjs
src/components/shell/failure-notice.test.tsx
src/features/admin-listings/use-admin-listing.test.ts
src/features/auth/mfa/step-up-dialog.test.tsx
src/features/auth/mfa/step-up-dialog.tsx
src/features/auth/mfa/step-up-gate.tsx
src/features/auth/mfa/use-step-up.test.ts
src/features/auth/mfa/use-step-up.ts
src/lib/reader-failure.test.ts
src/lib/reader-failure.ts
src/routes/api/attributes.options.test.ts
src/routes/api/listings/draft.test.ts
src/routes/api/listings/photos.test.ts
src/routes/api/publish.test.ts
src/server/answer.test.ts
src/server/answer.ts
src/server/door.test.ts
src/server/imports/route.test.ts
src/server/imports/route.ts
supabase/migrations/20261125151400_ecbd4912-36c3-445a-8e87-fdd9be29801a.sql
supabase/migrations/20261125152000_286755de-95bf-40d1-9a73-899616a4061d.sql
supabase/migrations/20261125152600_bf53d881-dbd5-408f-8001-db3309d68222.sql
supabase/migrations/20261125153200_9f0f29cd-88bb-44d5-a2d5-cee20409752e.sql
supabase/migrations/20261125153800_524263da-d7e5-4146-84cc-a45bce039137.sql
(plus, committed with this report: docs/governance/reports/cursor-bundle-7a.report.md)
```
The new files are proven by `git ls-files --error-unmatch` (exit 0 for `permission-grants.ts`, `permission-grants.test.ts`, `door-rows.ts`, `door-rows.test.ts`, `door-rows-allowlist.txt`, `refusal-classes.txt`, `advisor-lints.ts`, `advisor-lints.test.ts`, `use-step-up.test.ts`). The 52 non-migration, non-record lane files are blob-for-blob equal to `cursor/bundle-7a`; the five migrations are byte for byte (§9).

## 3. Behaviour contract — answer tables before → after
- Permission cores (`has_permission_core`, `staff_session_holds`, `has_permission_scoped_core`; through `has_permission`, `has_permission_scoped`, `door_context`, `my_permission_answer`): a role holding `<resource>:manage` only → before: admitted for every action of the resource; after: admitted for `manage` only (proved on scratch roles in migration A). Everything else is today's. A super admin still holds everything.
- `door_refusal_status` / `REFUSAL_STATUS`: 31 codes 400 → 404, 29 codes 400 → 409 (lists in the register `refusal-classes.txt`'s complement and `reader-failure.ts`); 401/403/428/429 and the 17 borderline codes and every other code stay as they were.
- `refusalAnswerStatus` (`answer.ts`) and `codeStatus` (`imports/route.ts`): answered 400/401/403/429 → also 404 and 409. `doorCall` routes answer a door's refusal as a 200 verdict whatever the status: unchanged.
- `security_lints`: impersonation asks `use` alone (was `use`/`manage`).
- The nine policies: the rows each admits are the rows it admitted (proved in migration C as owner and as another person, before and after); only the plan changes (`InitPlan`).
- Indexes: three dropped; `profiles_seller_alias_lower_key` still refuses a second `lower(seller_alias)` (23505, proved in migration D).
- `user_set_preferred_language`: before → an unchanged value: update, audit row, dial; after → no update, no audit, the dial still spent, the row locked `FOR UPDATE`. A changed value: unchanged (one audit row). Its refusals (notSignedIn 401, accountDeactivated 403, rateLimited 429, languageNotPublished 400, noProfile now 404) follow the table.
- Step-up dialog: before → a failed factor read drew "set up an authenticator" and released the action; after → a failure with the existing key `mfa.errorGeneric` and Retry (`step-up-retry`), the action parked; "factor gone" keeps its explanation (SUD-4).
- Tests that asserted 400 for a moved code take its class (§5, §10).

## 4. Censuses
STEP 1's censuses are in `stop-1.md` (accepted whole by ruling 1). Re-run on the final tree:
- `manage` readers in last declarations: `rg -n "'manage'" supabase/migrations` over the last declarations leaves only `translations:manage` and `services:manage` asked by name (`scripts/doors/manifest.txt`, `scripts/public-surface-allowlist.txt`, `src/routes/admin.ai.tsx`); CF-GRANT-1 passes on the real tree and fails on a planted `IN (p_action, 'manage')`.
- Policies calling an auth function bare: 0 (CF-RLS-1a on the real tree; was 9 before migration C).
- Readers of the three dropped index names across `src/`, `scripts/`, `e2e/`: none found (`rg` of each name).
- `setAccountLanguage` callers (ruling 4 decision 3), `rg -n "setAccountLanguage" e2e`: `e2e/i18n-sign-in-language.spec.ts:181`, `e2e/i18n-coverage.spec.ts:218`, `:243`, `e2e/page-head.spec.ts:72`, and its definition in `e2e/helpers/account-language.ts`.
- Door-rows census: 60 personal doors; 51 compare an owner column with the caller, 9 carry an allowlist line (`public` or `delegates`, `until` DEC-471).

## 5. Tests
- Added (ids): CFPG-1..4; CFDR-1..7; CFRR-10..12 (CF-REFUSAL-6); CF-RLS-1d, CF-RLS-1e (CF-RLS-1a widened); POL-ALTER-1..6; CF-ADVISOR-1a..1f; SUH-1..3; SUD-3, SUD-4; RF-14. Migration proofs A to E on scratch `e2e-mig-` rows.
- Changed (fixtures take the moved code's status, purpose unchanged, DECIDE-AND-NAME): `src/lib/reader-failure.test.ts`, `src/server/answer.test.ts`, `src/server/imports/route.test.ts`, `src/features/admin-listings/use-admin-listing.test.ts` (ALV-3, 404 still `refused`), `src/routes/api/listings/photos.test.ts` (PHT-5), `draft.test.ts`, `publish.test.ts`, `attributes.options.test.ts` (ATO-7/8), `src/server/door.test.ts`, `scripts/conformance/refusal-readers.test.ts` (a fixture); ruling 3: `src/components/shell/failure-notice.test.tsx` (fixture `gone` takes 404; FN-U11 on its own fixture `refused`, a door refusal the table keeps at 400, expects `failure.server` at once and `failure.refused` when the reader arrives; no other test moved: the component tests are green).
- CT-23 (`e2e/admin-categories-lifecycle.spec.ts`): the audit exclusion is out, the meter exclusion stays (comment cites ruling 1 decision 5); ruling 4: `awaitSessionLanguage(importer.id)` after `gotoReady` and before the watermark. The helper is `e2e/helpers/account-language.ts`; `setAccountLanguage` calls it for its first wait (one mechanism).
- Red-first: migration E with the unchanged-value early return removed failed `db:proof --fresh` ("proof (b2): an unchanged save answered … with 2 audit rows"), restored byte for byte; CF-RLS-1a red on the real tree before migration C (nine bare policies); CF-GRANT-1, CFDR, CFRR, POL-ALTER, CF-ADVISOR-1 each by their planted cases. CT-23's own race: red once on `mobile-360` without the wait (stop 5), green after it.
- Gate on the final tree `cb4313fee`: `bun run typecheck` pass; `bun run lint` pass; `bunx vitest run scripts --maxWorkers=2`: 138 files, 777 passed, 1 skipped; `bun run checks`: `checks: 35 PASS · 0 FAIL · 25 NOT RUN · 701s` (fast line: `checks (fast): 26 PASS · 0 FAIL · 636s`). NOT RUN, each with its reason from the run: scope › Decide whether the lanes run, scope › Index the code tree the lanes prove (Actions API artifacts), build-and-check › Workflow lint (linux binary), build-and-check / component-tests / bundle-budget › Install dependencies (already installed), secrets-scan › Secrets scan (linux binary), dependency-audit › Install dependencies and Audit (advisory service unreachable), e2e-preflight › Cache bun install, Bun cache hit?, Install dependencies, Migration parity preflight (no staging credentials in the script), e2e › Download shard results, Download job log tails, Download error contexts, Verify the downloaded artifacts, Publish merged E2E report, Verdict (the lanes' artifacts), promote › Promote token present, Configure the actions bot, Fast-forward guard, Promote dev to main (only CI promotes), semgrep › Upload SARIF and Warn: the SARIF upload failed (GitHub-only).
- Browser, by test id (`bun run e2e:local -- <files> --grep …`, 0 retries, ethio-staging): `CT-23|D239-E6|PGH-E1|PGH-E2|the admin shell renders no English fallback|the roles permission matrix renders no raw English` in `mobile-360` and `desktop-1280` over the four specs that call `setAccountLanguage` or changed: 10 passed, 2 failed in one run (PGH-E1 and PGH-E2, `desktop-1280`, "Test timeout of 60000ms exceeded", the machine at load average 8 with `duetexpertd` at 97 % CPU; the next attempt could not start its web server within 180 s); the same two ids rerun alone in `desktop-1280` once load had dropped: 2 passed (24.5 s). Not repeated further (CI's repeat lane judges, DEC-283). CT-23 itself: green in both projects in the run above and green on `bun run e2e:local` after migration E on the first branch (`2 passed (22.4 s)`); red once without the wait (stop 5).
- `[ssr-error]` counts: not collected (the local runs' logs were read for failures only). J-audit line: not printed by the local gate (its own step, `checks`, passed; the e2e/** change is one helper export and one call).
- What CI proves instead: every lane, the repeat lane's repetition of the changed spec, the smoke lane's advisor step.

## 6. K2 — siblings that bypass the mechanism
Greps run: `rg -n "'manage'" supabase/migrations` (last declarations), `rg -n "auth\.(uid|jwt|role|email)\(\)" supabase/migrations` (policies), `rg -n "refusalStatus|REFUSAL_STATUS|codeStatus" src`, `rg -n "preferred_language" e2e src`, `rg -n "\.from\(.profiles.\)\.update" e2e`.
- `src/routes/api/upload/photo.ts:188,260`, `src/routes/api/listings/photos.$id.ts:66`, `src/routes/api/listings/background.ts:115,136`: the routes' own 403 (`notYourListing`) and 409 (`photoGone`) differ from the table's 404; PP-26 (`e2e/photo-pipeline.spec.ts:1645`), `:2023` and PR-49 (`e2e/posting-routes.spec.ts:1296`) pin them. Left for bundle 7b (ruling 1 decision 4).
- `save_posting_identity` (stamps `updated_at` on every call) and `save_seller_place` (rewrites its row): writes with no change and no audit; accepted as they are (F6, ruling 1 decision 5).
- The four `storage.objects` `category_assets_*` policies: `auth.uid()` sits inside a FROM-less `(SELECT public.has_permission(auth.uid(), …))`, already one InitPlan; unchanged, for the supervisor to check on the advisor.
- `src/routes/settings.tsx:639` draws `mfa.stepUpNoFactorBody` itself (outside the dialog, outside this lane).
- `user_has_translation_permission` (`supabase/migrations/20260830034154…sql:27`) and `admin_get_translator_scope` (`20261114114500…sql:381`) read direct grants without `get_role_hierarchy` (F4 → INC-1298).

## 7. Allowlists and guards
- `scripts/conformance/briefs-allowlist.txt`: 8 → 1 lines (the eight `cursor-bundle-6.md:` lines removed, as STEP 0 says; one line added for ruling 1's own citation of a file no test names, with its reason).
- `scripts/conformance/door-rows-allowlist.txt`: 0 → 9 lines (`door | class: reason | until`; `public` and `delegates` carry `DEC-471`).
- `scripts/conformance/provider-errors-allowlist.txt`: 52 → 52 lines; the key of the one line this lane moved is `src/server/imports/route.test.ts:607` (it was `:606` before dev's own change; ruling 3 decision 3(c)).
- `scripts/conformance/refusal-classes.txt` (new, a class register, no `until`): the 400 class by family or code, `code | reason`.
- New guards, each with a planted case and its caller named: CF-GRANT-1, CF-REFUSAL-6, CF-RLS-1 widened (1d, 1e), CF-DOOR-ROWS-1, CF-ADVISOR-1 (`wired.test.ts` contains `bun scripts/ci/advisor-lints.ts` against the workflow).
- `bunx vitest run scripts --maxWorkers=2`: 138 files, 777 passed, 1 skipped (§5).

## 8. Strings
none — FLAG `no-new-string`. The step-up failure uses existing keys: `mfa.errorGeneric`, `common.retry`, `mfa.stepUpTitle`. Both usage maps were regenerated by `bun run i18n:usage` on the final tree (1878 keys across 789 files; +21 lines in each map).

## 9. Migrations
Applied to ethio-staging by the operator's paste; read back by the supervisor (marks, bodies' md5, grants, headers, the nine policies, the dropped and kept indexes, the `manage` rows). Byte for byte on both branches (`sha256sum` of this branch's file equals `cursor/bundle-7a`'s for each):

| file | sha256 | mark | apply pairing line |
|---|---|---|---|
| `20261125151400_ecbd4912-36c3-445a-8e87-fdd9be29801a.sql` (A) | `73daa75807075ae13e061cd80183ce12ac617bb7ee8acc4f1d79c72028e15329` | `20261125170000` | apply 20261125151400 → expect mark 20261125170000 |
| `20261125152000_286755de-95bf-40d1-9a73-899616a4061d.sql` (B) | `656585141e323bb78ca6cd65723fa419430289cc5b1a045ffe382879e214684b` | `20261125170100` | apply 20261125152000 → expect mark 20261125170100 |
| `20261125152600_bf53d881-dbd5-408f-8001-db3309d68222.sql` (C) | `93a1aaa865ffba83b85f3f4cb9982a192ba1e56877dc0337a3f3a680b36bf68d` | `20261125170200` | apply 20261125152600 → expect mark 20261125170200 |
| `20261125153200_9f0f29cd-88bb-44d5-a2d5-cee20409752e.sql` (D, has DROP INDEX: the operator's paste) | `8c7dc00f8d48a8ff1975c7cc4c2a831ebf2418b1d81241e7b0da6918d7d82ea2` | `20261125170300` | apply 20261125153200 → expect mark 20261125170300 |
| `20261125153800_524263da-d7e5-4146-84cc-a45bce039137.sql` (E) | `e254ae25bcc392e8b7aa75b98f0c8232835f30670b8dcb6e6f9c7c26400daf95` | `20261125170400` | apply 20261125153800 → expect mark 20261125170400 |

`bun run db:proof --fresh` last line, on the first branch's final tree (`stop-2.md`), before dev's moves: `db:proof PASS — applied 561/561, CLI 2.120.0, cold, 58 s`. Dev added no migration between `db0b43c9c` and `3123c75e4` (`git diff --name-only db0b43c9c 3123c75e4 -- supabase` prints nothing) and the five files are byte for byte, so the set it applied is this branch's; I did not run it again on this tree. No client type changes: no signature changed (`user_set_preferred_language` keeps `RETURNS jsonb`).

## 10. Departures
Every ruling of the turn:
- Ruling 1 (stop 1): the plan approved; decisions 1–12 built as written. Decision 1's list was re-run on the final tree; `translations:manage` and `services:manage` stay.
- Ruling 2 (stop 3): the advisor step lives in `.github/workflows/local-backend-proof.yml` (the supervisor's brief named `ci.yml`, where the smoke-lane steps are not); the reader accepts only `{"results":[…],"message":"db advisors"}`; counts only reach the log; the `wired.test.ts` line lands in the step's commit.
- Ruling 3 (stop 4, the re-land): `cursor/bundle-7a-2` from dev `3123c75e4`; 52 files copied by script; the five migrations untouched; the four made on the new base; scope grew by `src/components/shell/failure-notice.test.tsx` (two edits: `gone` takes 404; FN-U11 on its own `refused` fixture); roadmap line 3 as the copy brings it.
- Ruling 4 (stop 5): scope grew by `e2e/helpers/account-language.ts` (one exported step, `awaitSessionLanguage`, with `setAccountLanguage` calling it); CT-23 awaits it; no guard demanded the new name in a list (the laws pass: 138 files).
- Ceilings (`scripts/route-budgets.mjs`, made on dev's file, ruling 3 decision 3(b), against my own build of dev `3123c75e4` at `/tmp/ethio-scratch/cursor-bundle-7a-2/base`): `/admin/countries` 314 → 315, `/admin/listings` 334 → 335, `/admin/locations` 278 → 279, `/admin/monetisation` 318 → 319, `/admin/users_/$userId` 297 → 298, `/l/$slug` 252 → 253, `/my-listings_/$listingId` 324 → 325, each by `ceilingForLocal(size)` with the DEC-296 sentence first on its line (sizes: 313.877, 333.635, 277.773, 317.687, 296.872, 251.833, 323.680 KiB local; dev 313.470, 333.251, 277.395, 317.276, 296.448, 251.477, 323.333). Cause, chunk by chunk (DEC-355): the `reader-failure` chunk 963 → 1357 B gzip (+394 B = +0.385 KiB: the sixty refusal-status rows); every other named chunk moves by 9 B or less; two shared chunks (`_name`, `l._slug`) are re-split by rollup between the two builds without a page-level effect (each ceiling's line carries its "rest of the page nets" figure, −0.038 to +0.039 KiB). The step-up dialog and gate chunks grow +64 B and +51 B and are on-demand. The brief's SIDE BY SIDE note kept these files out of the lane; ruling 3 hands them to it.
- Slips that were the supervisor's, not counted against me (ruling 3 decision 7; ruling 4 decision 5): S791 and S792 (the merge trials), S793 (CT-23's exclusion removed on a premise covering one branch of the writer).
- Local gate on the first branch: the first `checks` run failed bundle-budget (`/admin/screening` 351.0 over 351); a control build with the base's `reader-failure.ts` restored the base's sizes, proving the cause; fixed by ceilings, since replaced by the re-land's.

## 11. CI
- Base's CI: first six lines of ci-status.md for dev `3123c75e4`: Commit `3123c75e4780d28a7b1091ac440d7bf673d3f26b` · Conclusion SUCCESS · Completed 2026-11-25T18:59:40Z · Run https://github.com/tesfayekb/ethio-marketplace/actions/runs/45679601725 · Lanes: skipped — the code tree was proven by run 45673729426 (pull_request, lovable/next, head b633424). Two-step SHA check: the commit in the file equals `git rev-parse origin/dev` (`3123c75e4780d28a7b1091ac440d7bf673d3f26b`).
- Reds of earlier turns: none found at this base.
- This lane's own reds: run 45664029304 (#105, `d8bc2ea07` merged with dev `1094b3d1b`): "E2E preflight (migration parity, staging)" class (a) (staging was behind while it waited; the files were applied afterwards), "Component tests" (`failure-notice.test.tsx` FN-U3/FN-U11 expected `failure.gone` at a fixture of 400) and "First-paint bundle budget" (NEAR band on six pages): fixed at the root by the re-land (fixture and ceilings, §10). No re-run was needed or done. Run 45689374949 on `5690ac2db`: SUCCESS.
- Run of the last code commit `cb4313fee`: run 45705204730 (pull_request, #107): every check green — 43 checks pass, 2 skipping (the Lovable branch guard and Promote to main, by design), 0 fail; including Component tests, First-paint bundle budget, E2E lanes 1–16, email, repeat, smoke and webkit, E2E preflight (migration parity, staging), Migration linter, Semgrep, Gitleaks. The repeat lane (16m23s) passed the changed specs.
- Smoke lane's advisor step (DEC-472), from that run's log (counts only): smoke job 139525580719 of that run: `advisors self-test OK: each gated name fails planted, another name passes`; `advisors: multiple_permissive_policies 3`; `advisors: no_primary_key 1`; `advisors: unindexed_foreign_keys 59`; `advisors: unused_index 12`; `advisors: auth_rls_initplan gate clear (0)`; `advisors: duplicate_index gate clear (0)`; `advisors: step took 1 s`. (The step's shape is therefore a capture now; the first of the ten runs DEC-472's judge counts.)

## 12. Limits
- The browser tests ran locally by `--grep` on ethio-staging only; CI proves the rest. The merged tree's WebKit and first-download numbers are CI's. `[ssr-error]` counts were not collected.
- One local run had two timeouts (PGH-E1/E2, `desktop-1280`) while the machine was loaded; I did not trace them further than the rerun that passed (§5). If the repeat lane shows them, they are a finding.
- The first-download numbers come from my own local build (a local build reads about 0.1 KiB under CI): CI's own run judges them.
- `bun run db:proof` was not re-run on the re-land tree (§9 says why).
- I read no live row: the supervisor's reads of ethio-prod and ethio-staging are the truth (ruling 1's LIVE ROWS).
- The advisor step's shape was written from the CLI's source and the ruling's envelope; its first capture is in §11 and the step took 1 s against DEC-472's 60 s.
- Scratch copies under `/tmp/ethio-scratch/cursor-bundle-7a/` and `/tmp/ethio-scratch/cursor-bundle-7a-2/` are the operator's to remove.

THE OPERATOR'S STEPS, in order:
1. On ethio-prod, apply files A, B, C, D, E in that order (the table in §9; D has DROP INDEX, so by the operator's paste, DEC-384), reading each mark back.
2. Publish in the same sitting (ruling 1 decision 2): between the apply and the Publish a moved code reads as a failure with Retry; no tolerance was written (INC-1296 carries the rule for after launch).
3. Close #105 unmerged once #107 is green; merge #107 with "Create a merge commit".
What changes for people: `admin` can no longer import categories (DEC-473: importing stays super-admin only); the unused `manage` ticks (`categories`, `countries`, `listings`, `locations`, `permissions`, `profiles`, `roles`, `user_roles`) leave the Roles console.

## 13. Findings
- `docs/features/admin-shell.md:32-34` still names `categories:manage` as the permission of the categories, attributes and images sections; no door asks it any more (the sections ask their own actions). Doc only; raised, not edited, because the feature docs this lane touched are the three it changed.
- F2 → INC-1297 (ruling 1): `notYourListing` and `listingNotFound` are distinct codes, so the code tells a stranger a row exists (`set_listing_level`, `src/routes/api/listings/photos.$id.ts:66`); on the before-launch list.
- F4 → INC-1298: translator targets read direct grants without the role hierarchy (`20260830034154…sql:27`, `20261114114500…sql:381`); no role has a parent today.
- F6 accepted (`save_posting_identity`, `save_seller_place`).
- INC-1296 (owner bundle 7b): a code that moves class reads as malformed between the apply and the Publish; the window is closed by the operator's sitting until launch.
- The routes' own 403/409 statuses (§6) are bundle 7b's.
- The four `storage.objects` policies are wrapped by their own sub-select; the supervisor reads the advisor for them.
- No security hole found.

## 14. Records
DEC — Cursor bundle 7a built: the permission cores read a grant exactly (DEC-466; the unasked `manage` permissions deleted, DEC-473), refusal statuses GONE 404 / CHANGED 409 (31 and 29 codes) with the 400 class in `refusal-classes.txt`, every policy asks `(SELECT auth.uid())` once per query, an unchanged `user_set_preferred_language` writes nothing, three duplicate indexes dropped, the advisor's two lints gate the smoke lane (DEC-472).
INC — INC-1287 closed: refusal status classes GONE 404 / CHANGED 409 / else 400, the two tables held equal by CF-REFUSAL-2 and the class census CF-REFUSAL-6.
INC — INC-1283 closed: the nine policies call `(SELECT auth.uid())`; CF-RLS-1 judges `auth.uid()`, `auth.jwt()`, `auth.role()`, `auth.email()` and `current_setting(`.
INC — INC-1290 closed: an unchanged `user_set_preferred_language` writes no update and no audit and still spends `account_pref`; CT-23 awaits the account's first language save (`awaitSessionLanguage`) and reads the audit whole.
INC — INC-1294 closed: `profiles_alias_unique`, `idx_ctp_child` and `category_tree_pointers_parent_idx` dropped.
INC — INC-1299 closed: the step-up dialog draws a failed factor read as a failure with Retry.
INC — INC-1300 closed: `policies.ts` and CF-RLS-1 read `ALTER POLICY`.
INC — INC-1282's class: standing check CF-DOOR-ROWS-1 with its allowlist (DEC-471).
register row — permission core: a grant answers only its own action (`get_my_permissions`' reading) → `has_permission_core`, `staff_session_holds`, `has_permission_scoped_core` → CF-GRANT-1 → exceptions: none.
register row — refusal status: one table from a code to its status, GONE 404 / CHANGED 409 / 400 by class register → `door_refusal_status` and `REFUSAL_STATUS` → CF-REFUSAL-2 and CF-REFUSAL-6 → exceptions: none.
register row — a policy evaluates auth once per query → `(SELECT auth.uid())` → CF-RLS-1 (a to e) → exceptions: none.
register row — a non-staff door names the rule that limits its rows → the manifest → CF-DOOR-ROWS-1 → exceptions: `door-rows-allowlist.txt`.
register row — a write that changes nothing writes nothing → the setters' form (lock the row, compare, answer ok) → each setter's proof in its migration, CT-23 → exceptions: `save_posting_identity`, `save_seller_place`.
register row — the performance advisor's `auth_rls_initplan` and `duplicate_index` gate the smoke lane → `scripts/ci/advisor-lints.ts` → CF-ADVISOR-1 → exceptions: none.
register row — an e2e wait for the account's session-start language save → `awaitSessionLanguage` in `e2e/helpers/account-language.ts` → CT-23 and `setAccountLanguage` → exceptions: none.
changelog — Cursor bundle 7a: the server reads the role matrix exactly; refusals say "gone" (404) and "changed" (409); policies evaluate the signed-in person once per query; unchanged language saves write nothing; three redundant indexes dropped; the smoke lane runs the performance advisor.
roadmap — tick Cursor bundle 7a (the database half of bundle 7); bundle 7b (the client half, the routes' own statuses, INC-1296, INC-1297, INC-1298) stays open.
slip — CT-23's audit exclusion was removed on a premise that covered the unchanged branch of the writer only (S793, the supervisor's); the wait for the first save is the cause-level fix.
