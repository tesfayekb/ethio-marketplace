# CURSOR BUNDLE 6 — the walk's three findings first; one session store; every staff screen and staff door behind a session that used its second factor; the tests-and-CI queue — report
Base: 1bbfc7dadd4d999a2cc292442a669bfa26680435 · Final commit: aa8745b21 · Brief: docs/governance/briefs/cursor-bundle-6.md (sha256 95a28fe3c380fe130edbe3a3268b17f3dec0c96cc130fe6fa34e06c8d381a258)
Review: Review: READY · 0 BLOCKER · 0 MAJOR · 1 MINOR · on aa8745b (ruling 3's four commits read in §10 item 15; the earlier reads: on 2feedc3, 2 MINOR, read before the first push; the two fix commits after CI's first run, 4efa262eb and 37cc07d9b, are read in §10 item 14)

Rulings in force: `docs/governance/briefs/cursor-bundle-6-ruling-1.md`, `docs/governance/briefs/cursor-bundle-6-ruling-2.md` (sha256 768aaec6d5261319c0ce8a2c5d8542fc6be3a46e2251c9429784676a3d223c89). Stop reports: `cursor-bundle-6.stop-1.md` (the census and plan), `cursor-bundle-6.stop-2.md` (the staff-session migration, files 1 and 2). Scratch files of this turn are in `/tmp/ethio-scratch/cursor-bundle-6/` (the operator's to remove).

## 1. Done / not done, by part and step

STEP 0, STEP 1 — done (stop 1). STEP 2 to STEP 5 — done. STEP 6 — done (below). STEP 7 — the one final push, then the pull request's checks (§11). STEP 8 — this report.

Part 1 (no database; commits `part 1` on the branch, ruling 1):
- Concern 1 (INC-1275): `readRefusal` takes the provider code a family names before the family's sentences; ACS-U2's cases carry the auth server's real messages; the provider-error fixture `src/test/provider-errors.ts` with CF-PROVERR-1 (`scripts/conformance/provider-errors.ts`) judges every mocked error object.
- Concern 2 (INC-1274): an ended sign-in is said as ended. Part 1 gave the auth actions and the live guard; decision 11 of ruling 2 (this stop) widened it: `src/lib/ended-sign-in.ts` is the one listener — the route client (`src/lib/route-client.ts`) and the door client (`src/lib/supabase-door.ts`) report an ended sign-in once, where they first read it, and the shell registers the listener (only while `user !== null`; `endSession` is idempotent). Every consumer now maps it to the signed-out state: `posting-service.ts` (`signedOut`, no timer retry; the draft says so, the wizard asks for a sign-in again), the category images service, the translations service (all three of its calls), the map's geocode, the import dialog.
- Concern 3 (INC-1276): the three action e-mails (confirmation, recovery, email_change) come from `supabase/templates/` with their subjects in `subjects.json`; CI's backend reads them; CF-TPL-1 (`scripts/conformance/auth-templates.ts`).
- Concern 4 (INC-1268): the language provider and the sign-in page read the one session store (CF-SESSION-7).
- Page ceilings by DEC-296's form, chunk by chunk (the base's red `/admin/roles_/$roleId` first).

Part 2: `e2e/helpers/staff-factor.ts` (the one staff sign-in: aal2, a verified factor); the gate-reach law CF-BRIEF-22 (and 23, 24) with the `gate-reach` and `user-cases` items; concern 6 (a) CF-REFUSAL-5, (b) CF-NUM-1, (c) the reporter's gating failures first (EFR-6), (d) AU-3's instrument, (e) the browser-libraries install's throughput probe (IBD-1, INC-1277).

Part 3 (DEC-461, DEC-465): files 1 and 2 (stop 2: `has_permission_core`, `staff_session_holds`, `has_permission`, `has_permission_scoped`, `door_context`) and **file 3** (this stop; §9): `my_permission_answer`, the two view-as readers on the staff-reader class, the four storage rules wrapped. The route half: `callerHasPermission` asks `my_permission_answer`; `route.ts` answers `denied` 403 and the step-up words 428 through `stepUpRequired(noFactor)`.

Part 4 (DEC-434, DEC-451): the gate mounted in the admin layout, on demand (`staff-factor-gate-lazy.tsx`, `resilientLazy`, in-place failure notice that draws no staff screen); STAFF-E1, STAFF-E2, and STAFF-E3 (a route-level 428 for an aal1 staff session, nothing written).

Ruling 2's decisions, by number: D1 (`types.patch`) applied; D2 built; D3 `get_my_permissions` stays (§10); D4 built (the four rules wrapped, the EXPLAIN in §13, CF-RLS-1); D5 built (the manifest, the allowlist, `check-doors` agree); D6 the census (§13); D7 the staff reads outside `/admin` (§13, one unit test each); D8 the sort (§10); D9 CT-23; D10 the branch rule kept (no detached head arose; see §10 item 9 for one slip); D11 built; D12 no change; D13 DLG-E12's context and trace (§13), and the STAGING BEHIND red expected for file 3 (§11).

Not done: nothing the brief or the rulings ordered is left. What cannot be proven here is in §12.

## 2. Files changed
`git diff --name-only 1bbfc7dad` (174 paths, pasted from the command):

docs/features/account.md
docs/features/auth-email-door.md
docs/features/ci-guards.md
docs/features/doors.md
docs/features/e2e-harness.md
docs/features/step-up-auth.md
docs/generated/i18n-usage.json
docs/governance/briefs/cursor-bundle-6-ruling-1.md
docs/governance/briefs/cursor-bundle-6-ruling-2.md
docs/governance/briefs/cursor-bundle-6.md
docs/governance/go-template.md
docs/governance/reports/cursor-bundle-6.stop-1.md
docs/governance/reports/cursor-bundle-6.stop-2.md
docs/tracking/ssr-error-allowlist.txt
e2e/ad-page-doors.spec.ts
e2e/admin-attributes-editor.spec.ts
e2e/admin-attributes-import.spec.ts
e2e/admin-attributes-library.spec.ts
e2e/admin-audit.spec.ts
e2e/admin-categories-console.spec.ts
e2e/admin-categories-lifecycle.spec.ts
e2e/admin-countries.spec.ts
e2e/admin-guides.spec.ts
e2e/admin-listings.spec.ts
e2e/admin-locations.spec.ts
e2e/admin-monetisation.spec.ts
e2e/admin-roles.spec.ts
e2e/admin-screening.spec.ts
e2e/admin-shell.spec.ts
e2e/admin-translations-console.spec.ts
e2e/admin-users.spec.ts
e2e/auth-caller-gates.spec.ts
e2e/auth-signout.spec.ts
e2e/category-image-routes.spec.ts
e2e/door-refusals.spec.ts
e2e/helpers/staff-factor.ts
e2e/helpers/ui.ts
e2e/i18n-coverage.spec.ts
e2e/import-security.spec.ts
e2e/legal-admin.spec.ts
e2e/legal-doors.spec.ts
e2e/menu-rows.spec.ts
e2e/mfa-stepup.spec.ts
e2e/my-listings-doors.spec.ts
e2e/one-line-slots-admin.spec.ts
e2e/one-line-slots.spec.ts
e2e/post-wizard-category.spec.ts
e2e/rbac.spec.ts
e2e/settings.spec.ts
e2e/shell-table-law.spec.ts
e2e/shell.spec.ts
e2e/staff-gate.spec.ts
e2e/submenu.spec.ts
public/i18n-usage.json
roadmap.md
scripts/brief/check-go.ts
scripts/brief/go-laws.ts
scripts/check-identity-tags.sh
scripts/ci/backend-config.py
scripts/ci/backend-config.test.ts
scripts/ci/install-browser-deps.sh
scripts/ci/install-browser-deps.test.ts
scripts/ci/lane-weights.json
scripts/ci/local-backend-config.toml
scripts/conformance/auth-templates.test.ts
scripts/conformance/auth-templates.ts
scripts/conformance/briefs-allowlist.txt
scripts/conformance/briefs.test.ts
scripts/conformance/door-args-allowlist.txt
scripts/conformance/e2e-helpers.test.ts
scripts/conformance/holds-its-box-allowlist.txt
scripts/conformance/import-doors.test.ts
scripts/conformance/listing-seed-allowlist.txt
scripts/conformance/non-null-allowlist.txt
scripts/conformance/provider-errors-allowlist.txt
scripts/conformance/provider-errors.test.ts
scripts/conformance/provider-errors.ts
scripts/conformance/read-numbers.test.ts
scripts/conformance/read-numbers.ts
scripts/conformance/refusal-readers-allowlist.txt
scripts/conformance/refusal-readers.test.ts
scripts/conformance/refusal-readers.ts
scripts/conformance/rls-initplan.test.ts
scripts/conformance/rls-initplan.ts
scripts/conformance/session-reads.test.ts
scripts/conformance/wired.test.ts
scripts/doors/manifest.txt
scripts/doors/staff-rules.txt
scripts/e2e-failure-report.test.ts
scripts/e2e-failure-report.ts
scripts/e2e-select.ts
scripts/public-surface-allowlist.txt
scripts/route-budgets.mjs
src/components/app-shell.tsx
src/components/shell/admin-detail-crumbs.test.tsx
src/components/shell/admin-detail-crumbs.tsx
src/features/admin-attributes/attributes-service.ts
src/features/admin-categories/category-images-service.test.ts
src/features/admin-categories/category-images-service.ts
src/features/admin-categories/use-image-failure.test.ts
src/features/admin-categories/use-image-failure.ts
src/features/admin-listings/use-admin-listing.ts
src/features/admin/audit/audit-page.tsx
src/features/admin/impersonation/impersonation-view.tsx
src/features/admin/import-dialog.test.tsx
src/features/admin/import-dialog.tsx
src/features/admin/nav-alerts.test.tsx
src/features/admin/nav-alerts.ts
src/features/admin/roles/use-admin-roles.ts
src/features/admin/translations/translations-service.test.ts
src/features/admin/translations/translations-service.ts
src/features/admin/translations/translator-card.test.tsx
src/features/admin/translations/use-translations.ts
src/features/admin/users/use-admin-users.ts
src/features/auth/auth-client.test.ts
src/features/auth/auth-error-key.test.ts
src/features/auth/auth-error-key.ts
src/features/auth/auth-service.ts
src/features/auth/mfa/mfa-service.test.ts
src/features/auth/mfa/mfa-service.ts
src/features/auth/mfa/staff-factor-gate-lazy.test.tsx
src/features/auth/mfa/staff-factor-gate-lazy.tsx
src/features/auth/mfa/staff-factor-gate.tsx
src/features/auth/session-end.test.ts
src/features/auth/session-end.ts
src/features/posting/background-dialog.test.tsx
src/features/posting/background-dialog.tsx
src/features/posting/map/geocode.test.ts
src/features/posting/posting-service.test.ts
src/features/posting/posting-service.ts
src/features/posting/step-photos.tsx
src/features/posting/step-review.tsx
src/features/posting/types.ts
src/features/posting/use-draft.test.tsx
src/features/posting/use-draft.ts
src/features/posting/wizard.tsx
src/i18n/i18n-context.ts
src/i18n/index.ts
src/i18n/provider-d239.test.tsx
src/i18n/provider-layers.test.tsx
src/i18n/provider.test.tsx
src/i18n/provider.tsx
src/integrations/supabase/types.ts
src/lib/ended-sign-in.ts
src/lib/refusal.test.ts
src/lib/refusal.ts
src/lib/route-client.test.ts
src/lib/route-client.ts
src/lib/supabase-door.test.ts
src/lib/supabase-door.ts
src/routes/admin.tsx
src/routes/api/admin/categories/generate-image.test.ts
src/routes/api/admin/exports.test.ts
src/routes/api/translate.route.test.ts
src/routes/auth-forms.test.tsx
src/routes/auth.tsx
src/server/ad-share.test.ts
src/server/answer.test.ts
src/server/answer.ts
src/server/category-images/suggest-icon-route.test.ts
src/server/imports/route.test.ts
src/server/route.test.ts
src/server/route.ts
src/server/supabase/user-client.test.ts
src/server/supabase/user-client.ts
src/test/provider-errors.test.ts
src/test/provider-errors.ts
supabase/migrations/20261124203700_35cf3a64-bf12-4a27-91fe-5fb7c778855f.sql
supabase/migrations/20261124203800_a437e3a7-89f1-4a9b-ad17-8f201c93502c.sql
supabase/migrations/20261124221200_d9701480-dab5-437e-8a08-8820d82842a7.sql
supabase/templates/confirmation.html
supabase/templates/email_change.html
supabase/templates/recovery.html
supabase/templates/subjects.json
docs/governance/reports/cursor-bundle-6.report.md  (this file; `git diff --name-only 1bbfc7dad` at the last code commit lists the 174 paths above)

New files, by `git diff --name-status 1bbfc7dad HEAD` (`A`): `docs/governance/briefs/cursor-bundle-6.md`, `…-ruling-1.md`, `…-ruling-2.md`, `docs/governance/reports/cursor-bundle-6.stop-1.md`, `…stop-2.md`, `e2e/helpers/staff-factor.ts`, `e2e/staff-gate.spec.ts`, `scripts/conformance/{auth-templates,provider-errors,read-numbers,rls-initplan}.ts` with their tests, `scripts/conformance/provider-errors-allowlist.txt`, `src/components/shell/admin-detail-crumbs.test.tsx`, `src/features/admin/nav-alerts.test.tsx`, `src/features/auth/mfa/staff-factor-gate-lazy.{tsx,test.tsx}`, `src/features/posting/map/geocode.test.ts`, `src/lib/ended-sign-in.ts`, `src/test/provider-errors.{ts,test.ts}`, the three migrations, the three `supabase/templates/*.html`. Every path is in SCOPE, the standing allowance, or named by ruling 2's SCOPE WIDENED list; the mechanical edits a standing guard demanded are named under §10 (the brief's DECIDE-AND-NAME).

## 3. Behaviour contract — answer tables before → after

| surface | base `1bbfc7dad` | now |
|---|---|---|
| `has_permission(uid, r, a)`, a staff permission asked about oneself | the core's answer at any session level | true only at aal2 with a verified TOTP factor (DEC-461); about another person, by the service role, or `admin_panel:access`: as before |
| `door_context` staff / staff-reader classes | permission, step-up (staff only) | permission, then the session rule: P0009 `step-up required` / `step-up required: no verified factor`, then step-up |
| a staff ROUTE (`defineRoute` staff) at aal1 holding the permission | 200 | 428 `{error:"step-up required", code:"P0009"}` (or `…: no verified factor`) through `stepUpRequired`; `denied` is 403 as before |
| `callerHasPermission` | `Promise<boolean>`, asks `has_permission(userId,…)` | `Promise<PermissionAnswer>` (`denied|allowed|stepUp|stepUpNoFactor`), asks `my_permission_answer(resource, action)`; an unknown word throws |
| `impersonated_get_profile`, `impersonated_list_listings` | `reader` class: any signed-in caller whose own open session matched | `staff-reader` with `impersonation:use`: permission, the session rule, then the same session read; `end_impersonation`, `get_active_impersonation` keep their classes |
| the four `category_assets_*` storage rules | `has_permission(…)` bare, once per row | `(SELECT public.has_permission(…))`, once per query; everything else as before |
| an admin screen at aal1 / with no factor | the screen draws; doors refuse | the gate's code panel (`admin-factor-code-panel`) or setup panel (`admin-factor-setup`) in place of the screen; no staff read starts |
| an ended sign-in (route client signed-out, 401, door `notSignedIn`) | each consumer read it its own way ("unreachable", a bare `Error`, a generic failure) | reported once by the client that read it, to the shell's listener; each consumer maps it to the signed-out state |
| rail's `legal_review_overdue` alert | read at any level | read only at aal2 (`getAal()`); never drawn as failed at aal1 |
| admin breadcrumbs (`admin-detail-crumbs.tsx`) | the four detail hooks fetched on the shell's tree | `cacheOnly`: they read the cache and never fetch (a name the page already read) |

Everything else is the base's: no other route, door, screen or function changed answer (§4's censuses, and the unit and browser runs in §5).

## 4. Censuses

- Staff authority checks that bypass the two functions (stop 2): `lastDeclarations` over every migration and the 130 policies' last state — only the four storage rules named `has_permission(`; no policy names `has_permission_scoped(`, `is_super_admin(`, `user_roles` or `has_role(`. After file 3, CF-RLS-1 judges the standing catalog: no permission function is called bare (`scripts/conformance/rls-initplan.test.ts`).
- Callers of `callerHasPermission`: one — `src/server/route.ts` (`rg 'callerHasPermission' src` after the change; the typecheck would refuse another with the old arity).
- `rg 'rpc\("has_permission' src --glob '!*.test.*'`: none. `rg 'get_my_permissions' src`: `src/features/permissions/service.ts:15` (the reader behind `usePermissions`), types, docs — see §10 item 3.
- Ended-sign-in consumers (`rg 'kind === "signedOut"' src --glob '!*.test.*'`): `src/lib/refusal.ts:177`, `src/features/admin/import-dialog.tsx:288`, `src/lib/route-client.ts:163` (the report), `translations-service.ts:565,636,1068`, `src/features/posting/map/geocode.ts:36`, `category-images-service.ts:54`, `posting-service.ts:69,197`. Each is mapped to the signed-out state and has its unit test (§5).
- Ruling 2 decision 6 (the census by manifest class) and decision 7 (staff reads outside `/admin`): in §13, whole.
- First-download numbers, from my lock-exact build on the base and on this tree, chunk by chunk: §10 item 8.
- Gate-reach (decision 8): the 58 ids, sorted A or B in §10.

## 5. Tests

Test ids added or changed by this stop (ruling 2): STAFF-E1, STAFF-E2, STAFF-E3 (new; `e2e/staff-gate.spec.ts`, `e2e/category-image-routes.spec.ts`), PW-8b (the posting form's ended sign-in, `e2e/post-wizard-category.spec.ts`), CT-23 (rewritten), AL-31, OLS-3, LGA-17, MF-8 (moved to the staff helper), DRF-1, CT-7b, LT-6, MF-3, MF-6, MF-7c, MF-9 (re-asserted: §10); unit tests: the unit tests of `user-client`, `route`, `answer`, `route-client`, `supabase-door` (SBD-23, SBD-24), `posting-service`, `use-draft`, `translations-service`, `category-images-service` (CIS-4), `geocode`, `import-dialog`, `background-dialog`, `admin-detail-crumbs`, `staff-factor-gate-lazy`, `rls-initplan` (CF-RLS-1a, planted).

Red-first: STAFF-E3 and the new CT-23 cannot be shown red or green locally (file 3 is not on staging; §12). The 9 tests that failed on the first by-id run after the rule (CT-7b, LT-6, DRF-1, LGA-17, MF-3, MF-6, MF-7c, MF-8, MF-9, both projects: `90 passed, 18 failed, 6 skipped`, `e2e-51-run2.log`) are the red; each was re-asserted for the answer the rule gives (§10) and passes (below).

Local runs (ethio-staging, which holds files 1 and 2; `bun run e2e:local`, `--retries 0`, `mobile-360` and `desktop-1280`; the working tree held file 3 aside and the two server sources at their file-2 versions for these runs, restored before every commit — §12):
- the 58 gate-reach ids, final tree: `129 passed, 3 failed, 6 skipped (19.4m)` on `e968aadff` (`e2e-58-final.log`; 0 retries, `mobile-360` and `desktop-1280`). The 6 skipped are OLS-6 to OLS-10 and OLS-3 on `desktop-1280`, which skip by design (the phone width measures). The 3 failed: LGA-17 in both projects (the 60 s test ceiling: the test minted a staff session twice and each mint waits out a code's step; it had passed at 58 s alone, `e2e-d8-run3.log`; fixed in `2feedc3ae` by minting once, no timeout raised) and AL-31 on `desktop-1280` (`[e2e:session] injected identity mismatch … page holds no session` at `signInStaff`, in a run with one transport retry; it passed on mobile in the same run and on both projects before and after; not reproduced, cause unproven, recorded in §13). Re-run of those four (LGA-17 ×2, AL-31 ×2) on `2feedc3ae`'s tree with the same temporary state: `4 passed (1.4m)` (`e2e-fix.log`). The other 51 ids' pairs are the 129 passes.
- the nine re-asserted ids with the new ids (STAFF-E1, STAFF-E2, AL-31, OLS-3): `25 passed, 1 skipped (4.3m)` (OLS-3 on desktop-1280 skips by design); `e2e-d8-run3.log`.
- PW-8b: `2 passed (16.9s)`; `e2e-pw8b.log`.
- DLG-E12 on `webkit-1280` (§13): `1 failed`, as at the base.

Unit and laws (the gate ran on `e968aadff`; the one later code commit, `2feedc3ae`, changes `e2e/legal-admin.spec.ts` only, and typecheck, lint, `vitest run scripts` and prettier were run again after it with the results below): `bun run typecheck` — no output (pass). `bun run lint` — no output (`--max-warnings 0`, pass). `bunx vitest run scripts --maxWorkers=2`: `Test Files 134 passed (134) · Tests 747 passed | 1 skipped (748)`. `bun run checks` (final tree; `checks2.log`): `checks (fast): 26 PASS · 0 FAIL · 600s` and the last line `checks: 35 PASS · 0 FAIL · 25 NOT RUN · 665s`; the NOT RUN list: scope › Decide whether the lanes run and Index the code tree (the Actions API), build-and-check › Workflow lint (actionlint, pinned linux/x64 binary) and Install dependencies, component-tests › Install dependencies, secrets-scan (gitleaks, pinned linux/x64), dependency-audit › Install dependencies and Audit (the advisory service is unreachable), e2e-preflight › Cache bun install, Bun cache hit?, Install dependencies and Migration parity preflight (staging credentials), e2e › Download shard results, Download job log tails, Download error contexts, Verify the downloaded artifacts, Publish merged E2E report, Verdict (GitHub's artifacts), promote › the four promote steps (only CI promotes), bundle-budget › Install dependencies, semgrep › Upload SARIF and Warn: the SARIF upload failed (GitHub-only).

An earlier run of the same gate on the tree before the final fixes was `27 PASS · 3 FAIL` (`checks.log`): the failures were mine — new names not yet on their lists (the selector's area and the lane weights for `staff-gate.spec.ts`, holds-its-box for the gate's two places), five allowlists whose line numbers moved with my own edits, a double cast, a non-null and an invented provider message in two of my tests, CF-RLS-1's own `new RegExp`. Each is fixed at its cause in commit `the laws' lists follow the lane's new names and moved lines` (§10 item 10).

`[ssr-error]` lines: the allowlist's `commit_failed step-up required` line (CT-23) is removed; the by-id runs log no `[ssr-error]` the allowlist does not name (the harness's own check passed in each run).

J-audit (e2e/** changed): every changed or new test names its subject; no `.first()`, `waitForTimeout`, `test.only`; the new reads of an answer carry their error (`listError`, `rowError`) so `category-image-routes.spec.ts` stays at its allowlisted count; no new non-null (two files' counts fell: `admin-categories-console.spec.ts` 12 → 10, `admin-locations.spec.ts` 19 → 18).

## 6. K2 — siblings that bypass the mechanism
Greps run: `rg 'rpc\("has_permission' src`, `rg 'callerHasPermission' src`, `rg 'kind === "signedOut"' src`, `rg 'get_my_permissions' src`, `rg -U 'CREATE POLICY[^;]*has_permission\(' supabase/migrations` (every declaration, historical), `rg '\bauth\.uid\(\)' ` over the standing policies (INC-1283).
- `src/features/permissions/service.ts:15` reads `get_my_permissions` for the rail, the bar and the admin gate's `admin_panel:access`; it grants nothing and is not moved (§10 item 3). Left, by ruling.
- The policies that call `auth.uid()` unwrapped are INC-1283 (owned by Cursor bundle 7), not this bundle's; CF-RLS-1 judges the permission functions only.
- `src/features/posting/posting-service.ts:197` still names `status === 401` beside the `signedOut` kind; both are the one definition of an ended sign-in and one branch reads both. In scope; nothing left.
- `e2e/legal-admin.spec.ts` `rpcAs` and `e2e/legal-doors.spec.ts` `pooledSuperAdminCredentials` are spec-local copies of `asPerson` and the pool's credentials (stop 1 §findings 4); `rpcAs` gained an `{staff: true}` option here rather than a second copy. Left (outside the brief's CHANGEs), K2.
- `src/features/auth/mfa/step-up-dialog.tsx:86` keeps `step-up-no-factor`; after the gate, a staff screen is never drawn without a verified factor, so the no-factor dialog is reachable only from a guarded action on a page outside the gate (§13 item 6). Reported.

## 7. Allowlists and guards
- `scripts/conformance/door-args-allowlist.txt` 1 line re-pointed (`user-client.ts:318` → `:336`), count unchanged.
- `scripts/conformance/non-null-allowlist.txt`: `e2e/admin-categories-console.spec.ts` (12) → (10); `e2e/admin-locations.spec.ts` (19) → (18) — counts fell.
- `scripts/conformance/provider-errors-allowlist.txt`: 4 lines re-pointed (`category-images-service.test.ts:60 → 86`, `:67 → 93`, `imports/route.test.ts:323 → 321`, `:608 → 606`, `user-client.test.ts:40 → 38`), count unchanged.
- `scripts/conformance/refusal-readers-allowlist.txt`: 9 `translations-service.ts` lines re-pointed (their statements moved with the NOT_SIGNED_IN lines), count unchanged.
- `scripts/conformance/holds-its-box-allowlist.txt`: 2 new lines — `src/features/auth/mfa/staff-factor-gate-lazy.tsx#LazyStaffFactorGate` and `src/routes/admin.tsx#LazyStaffFactorGate`, until `2027-05-24`: the gate stands in place of the whole admin body; its place is the layout's own `min-h-40` line and nothing sits below it that could move.
- `scripts/doors/staff-rules.txt`: three reader lines of `category-images-service.ts` moved by two lines (`:103 → 105`, `:110 → 112`, `:169 → 171`); no rule's text changed.
- `docs/tracking/ssr-error-allowlist.txt`: the `commit_failed step-up required` line (CT-23) removed: CT-23 now logs nothing the allowlist names.
- `scripts/doors/manifest.txt`: 2 lines moved to `staff-reader` + `impersonation:use` (the view-as readers), 1 line added for `my_permission_answer` as `helper`; `scripts/public-surface-allowlist.txt`: 1 line added (`my_permission_answer | authenticated | DEC-465 …`).
- `scripts/ci/lane-weights.json`: `staff-gate.spec.ts` added with seconds from my own local run (18.3 mobile-360, 27.3 desktop-1280, 2 tests each) — a local measurement, not a CI one; the maker refreshes it on a newer green run. `scripts/e2e-select.ts`: `e2e/staff-gate.spec.ts` joins the `auth` area.
- New guards: CF-RLS-1 (`scripts/conformance/rls-initplan.ts`, planted in `rls-initplan.test.ts`), CF-PROVERR-1, CF-TPL-1, CF-NUM-1, CF-REFUSAL-5 / CFRR-9, CF-BRIEF-22 → 24. Each is a `scripts/conformance/*.test.ts` file run by `bunx vitest run scripts`; the bundle's two earlier guards are named in `wired.test.ts` where that file's list takes them (CF-BRIEF-22 → 24); a census file that is its own `*.test.ts` has no separate caller to name. CF-RLS-1 builds its pattern through `scripts/lib/pattern.ts` (CF-PATTERN-4 refused its first form).
- Guard self-tests: the whole `scripts` run above (747 passed).

## 8. Strings
none — `git diff 1bbfc7dad HEAD -- 'src/i18n/locales/*.ts'` is empty: every message this bundle draws is an existing key (`session.expired`, the gate's own keys from bundle 5, the existing step-up words); `bun run i18n:usage` was run and both usage maps committed. The three action e-mail templates carry their English from stop 1 and their Amharic from the supervisor's file (not keys).

## 9. Migrations
File 3 — `supabase/migrations/20261124221200_d9701480-dab5-437e-8a08-8820d82842a7.sql`, sha256 `ca067d5b5c6b80d3ba52f2da6ed66a5e209ceae130a6d874ee519239a26d5e8f`, mark `20261125010000`.
- Declares: NEW `my_permission_answer(text,text)` (STABLE, plain SQL, never raises, `authenticated` and the service role only); `impersonated_get_profile(uuid)` and `impersonated_list_listings(uuid,integer,integer)` redeclared whole from `20261119150500` apart from the gate's line (live md5 pre-checked `623968df1585ba93d2c46a89a07e89a2` and `88669b9b83037e9b00e0dedc97008e0d`, new md5 post-checked); the four `category_assets_*` rules recreated with `(SELECT public.has_permission(…))`.
- The mark was chosen at the commit (UTC hour of the commit rounded up, plus one hour); the first choice was overtaken by the clock and re-chosen (§10 item 7).
- Proofs (scratch rows, sentinel rollback): each of the four answers; no caller and a deactivated account read `denied`; `my_permission_answer = 'allowed'` equals `has_permission(auth.uid(), …)` in every case; a holder at aal2 reads its own open session, at aal1 the reader answers P0009, a holder whose role no longer grants `impersonation:use` reads `permissionDenied`, another person's session answers `noActiveSession`; a staff aal2 session writes and reads the bucket, a member does not; the live catalog holds no policy calling a permission function unwrapped.
- Files 1 and 2 (stop 2): `20261124203700_35cf3a64-bf12-4a27-91fe-5fb7c778855f.sql` sha256 `948093560defd343253729717cc217e6e75e8d3a27b3d6f8daa9c44fab8c9b20` mark `20261124220000`; `20261124203800_a437e3a7-89f1-4a9b-ad17-8f201c93502c.sql` sha256 `c3574b19f548757d00a3a28e02cfd7837b124add9309c05a9dd244686b0770dc` mark `20261124220100`. Both are applied on ethio-staging and read back by the supervisor (ruling 2).
- Pairing line: `apply d9701480 → expect mark 20261125010000`.
- `bun run db:proof --fresh`, last line, final tree: `db:proof PASS — applied 556/556, CLI 2.120.0, cold, 58 s`.

## 10. Departures
1. **STOPs and rulings in the turn**: STOP 1 (the census; ruling 1), STOP 2 (the migration; ruling 2). Both are saved under `docs/governance/briefs/` and committed; ruling 2's sha256 was compared to the carrier's.
2. **The count "51" is 58 ids.** The brief and the ruling say 51; the list the stop-2 report printed holds 58 test ids (`list51.py` over `git show 1bbfc7dad` specs). I sorted and ran all 58.
3. **`get_my_permissions` stays as it is (decision 3, by ruling).** It lists the slugs the account's roles hold at any level; moving it onto the rule would blank the rail and the bottom bar at aal1 before the gate can send the person to the code. It grants nothing and no route or door reads authority from it: the server re-judges every action.
4. **Manifest class for the helper**: the ruling's reason form `caller:src/server/route.ts` is refused by `scripts/doors/manifest.ts` (`HELPER_REASONS` takes `none: …`). The line reads `none: caller src/server/route.ts (callerHasPermission, the route mechanism's one staff check)`. The manifest's doc comment is a finding (§13).
5. **Decision 8's sort — all 58, A or B, with one line of why.** A = the subject is a staff success: a staff sign-in that already is aal2 (the pooled super admin's node-minted session, `signInJobSuperAdmin`, which is `staffSession` under another name) or moved onto `signInStaff`. B = a refusal, the step-up or gate screen itself, or a member's or a stranger's answer: it keeps its sign-in and asserts the answer the rule now gives. In a test with both kinds of caller the staff subject is A and its member and owner callers stay B; the letter below is the test's subject.

   | id | A/B | why |
   |---|---|---|
   | SC-16 | B | a reviewer without a fresh second factor cannot decide: the refusal |
   | SC-21 | A | Screening's staff reads, staff subject on the pooled aal2 session (already) |
   | AL-24 | B | Edit refuses a reviewer without enforce: a refusal, nothing written |
   | AL-25 | B | Edit refuses an enforcer without a second factor: the refusal |
   | AL-5 | A | the staff Edit keeps the seller's rules; staff on the pooled aal2 session (already); the seller is B |
   | AL-9 | A | staff sends back to review; pooled aal2 (already); the seller's reads are B |
   | AL-29 | A | staff's two doors move no category; pooled aal2 (already) |
   | AL-31 | A | the Reports count for `listings:review`: **moved** to `signInStaff` (`holder()`) |
   | ATR-4 | B | an enforcer with no second factor is asked for it: the refusal |
   | LG-3 | A | legal finality, staff drafts and publishes on the pooled aal2 (already); the member checks are B |
   | LG-10 | A | the staff list of documents, pooled aal2 (already) |
   | LG-11 | A | staff publish then the member's accept; staff on pooled aal2 (already), the member is B |
   | LG-13 | A | publish refusals by a staff session on pooled aal2 (already) |
   | LG-14 | A | publish refusals by a staff session on pooled aal2 (already) |
   | SAP-3 | A | Screening's preview, pooled aal2 (already) |
   | SP-6 | B | the real sign-in and the session clock are the subject |
   | SO-14 | B | the real refresh refused and the sign-in after it: the subject is the sign-in |
   | SO-15 | B | a session gone with no event: the sign-in is the subject |
   | SO-16 | B | a sign-out and a fresh sign-in across two tabs: the sign-in is the subject |
   | IMP-5 | B | a refusal (a non-holder cannot begin a view-as) |
   | IMP-6 | A | a holder's view-as success, pooled aal2 (already) |
   | ML-2 | B | nobody else moves a seller's ad: strangers |
   | ML-9 | A | the seller's history shows staff changes; the staff actor is on pooled aal2 (already); the seller reads are B |
   | ML-10 | A | the renew setting: staff change with a fresh factor, pooled aal2 (already); the no-factor case keeps its sign-in |
   | MLA-8 | B | a seller who also holds enforce deletes as the owner: the owner's door |
   | CT-7 | B | the step-up flow itself: the server refuses until aal2 is proven |
   | CT-7b | B | an account with no factor: **re-asserted** — the gate's setup panel in place of the console (`admin-factor-setup` visible, `category-search` absent) and the pointer set unchanged in the database |
   | LGA-7 | A | the user's Legal card for staff, pooled aal2 (already) |
   | LGA-8 | A | the user page shows the storage consent, pooled aal2 (already) |
   | LGA-9 | A | the user Legal card, pooled aal2 (already) |
   | LGA-13 | A | Export acceptances, pooled aal2 (already) |
   | LGA-15 | A | Admin Legal counts, pooled aal2 (already) |
   | LGA-16 | A | a document's review, pooled aal2 (already); the door's refusal of a person without `legal:edit` is B |
   | LGA-17 | A | the overdue mark for its own reader: **moved** — the two `legal_review_overdue` reads take `rpcAs(…, { staff: true })` (`staffSession`) |
   | DRF-1 | B | `has_permission` answers about the caller only: **re-asserted** — the aal1 holder's own read is `false` (a false answer, never a raise), a `staffSession(holder)` read is `true`, another account's read about the holder stays `false` |
   | DRF-2 | B | a super admin and the service role asking about another person: unchanged by the rule (it exempts another person) |
   | DRF-5 | B | scope mode match, asked about another person: unchanged |
   | DRF-6 | B | scope mode global, asked about another person: unchanged |
   | MF-1 | B | enrolling a factor is the step-up screen's own subject |
   | MF-3 | B | no factor: **re-asserted** — the staff screen is the gate's setup panel (`admin-factor-setup`, its link), no deactivate control, no status change written |
   | MF-8 | A | the step-up dialog's lazy chunk and top layer: **moved** to `signInStaff` + `staleStepUpOnClient`; the dialog asks for the code (`step-up-code`), z-index 100, one chunk fetched. A judgement: its subject is the dialog drawing, a staff action that reaches its step-up, and the no-factor variant it used is no longer reachable on a staff screen |
   | MF-4 | B | server: permission first, then step-up — the RPC refuses regardless of UI |
   | MF-5 | B | unenroll requires a fresh verification: the step-up screen |
   | MF-6 | B | unenrolling the only factor drops the stepped-up state: **re-asserted** — the gate's setup panel, nothing written |
   | MF-7c | B | a no-factor identity: **re-asserted** — the setup panel in place of the edit form; the stored name is unchanged |
   | MF-9 | B | one code covers create and picture step: **re-asserted** — the gate's code panel is the one prompt (`admin-factor-code-panel`, `admin-factor-code`, `admin-factor-submit`), `expectAal2`, then zero step-up modals through create and the picture step |
   | LGC-3 | A | the staff card lists an ad's certification, pooled aal2 (already) |
   | OLS-3 | A | an admin's five-item bar: **moved** to `signInStaff` |
   | TR-1 | A | a super admin sees the roster, pooled aal2 (already); the permissionless refusal is B |
   | TR-9 | A | the Amharic runtime renders after the bundle merge, pooled aal2 (already) |
   | LT-6 | B | an unproven factor cannot move a row: **re-asserted** — the setup panel and the DB unchanged; then the test enrols and steps up (`enrollAndStepUp`) and the move carries the descendants |
   | PP-13 | A | photo links for staff, pooled aal2 (already); the other seller and no session are B |
   | OLS-6 … OLS-10 | A | the admin tables stay one line: already on `signInStaff` (Part 2) |

   `e2e/import-security.spec.ts:797` (in the stop-2 list without an id) passed unchanged in the by-id runs.
6. **CT-23 (decision 9)** keeps its aal1 importer subject, asserts the preview refused with 428 / `stepUpRequired` and nothing written (no import rows, no storage object); its `ssr-error-allowlist.txt` line goes. The test that proves the commit's success path at aal2 is CT-19 of `admin-categories-lifecycle.spec.ts` (a preview and a commit as the pooled super admin, `signInJobSuperAdmin`, then the undo) — named in CT-23's own comment, run by CI.
7. **File 3's mark** was overtaken by the clock between the first proof and the commit; it was re-chosen at the commit (`20261125010000`) and `db:proof --fresh` re-run (PASS 556/556), as G39's form says.
8. **Ceilings (DEC-296, chunk by chunk).** Two causes. (a) The shell's ended-sign-in listener and the refusal split: +0.36 to +0.59 KiB on every page (the entry's `index` chunk 146045 → 145973 B, `shared-shell` 29884 → 30376 B for `/admin`); 26 pages crossed or entered the NEAR band; each ceiling is `ceilingForLocal(size)` with its cause on its line. `src/lib/ended-sign-in.ts` joins `SHARED_SHELL_MODULES` (otherwise it was its own chunk in the entry's closure: `ENTRY_CLOSURE` failed with `ended-sign-in: 1 in the entry's closure`). (b) The gate: the admin layout's on-demand gate chunk (`staff-factor-gate` 3.2 KB) reads and verifies factors with the Supabase client, so `/admin`, `/admin/`, `/admin/images` and `/admin/impersonation_/$sessionId` now carry it where they had none: the vendor chunk `dist` 394 → 53,469 B gzip, with `client` 1,660, `refusal` 1,779, `mfa-service` 1,629, `format` 714, `tslib.es6` 527 and `admin` 2,391 → 3,133 (`/admin`: 206.456 → 265.968 KiB; the other admin pages already carried the client and rose 1.1 to 1.3 KiB, `/admin/audit` 4.4, `/admin/locations` 5.2, `/admin/users` 2.7 for the crumbs' hooks). The gate must read factors on every staff screen; I raised those four ceilings to their `ceilingForLocal` values (268, 268, 295, 267) rather than split the client out, because the gate's first read is the client's. Reported for the supervisor's ruling in §13 item 1.
9. **A branch-rule slip**: while sorting `provider-errors-allowlist.txt` I ran `git checkout -q --` with no path (a no-op: nothing changed, the tree was verified by `git status`); `checkout` is outside the allowed forms. No file or branch moved.
10. **Mechanical edits a standing guard demanded of my own change (the brief's DECIDE-AND-NAME)**: §7's re-pointed allowlist lines, the selector area, the lane weights, `holds-its-box`'s two lines, `staff-rules.txt`'s three reader lines, `ENTRY_CLOSURE`'s shared-shell list; two test fixes (`use-draft.test.tsx`'s new `signedOut()` helper without a double cast and `?.` in place of `!`; `supabase-door.test.ts` SBD-24's mocked error takes the fixture's `session_expired` message instead of an invented one); `rls-initplan.ts` through `scripts/lib/pattern.ts`.
11. **Tests re-pointed for an ended sign-in (the brief's DECIDE-AND-NAME)**: `use-image-failure.test.ts`, `translations-service.test.ts`, `posting-service.test.ts`, `import-dialog.test.tsx`, `background-dialog.test.tsx`, `route.test.ts`, `user-client.test.ts`, `answer.test.ts`, `imports/route.test.ts`, `exports.test.ts`, `generate-image.test.ts`, `suggest-icon-route.test.ts`, `translate.route.test.ts` — each asserts the new word or the new arity; none was loosened.
12. **`check-go.ts`** (step 6): its output is pasted in §12; its findings are about the brief's own text.
13. **The self-review's two MINORs** (rule 80; none is a BLOCKER or a MAJOR): (a) `src/integrations/supabase/types.ts` carries the ruling's `types.patch` by hand (the file is platform-generated; the ruling supplied the patch, sha256 b775cc0f354103aea3eec3d52493a66c67c88e855edee281ba426e5e495d81e6, and the supervisor's regeneration replaces it); (b) the `HELPER_REASONS` form of item 4. The scans over the added lines (`as unknown as`, `any`, `@ts-*`, `waitForTimeout`, `.first()`, `test.only`, `?? 0` / `?? 'ET'`, a bare `!`, empty `catch`, key-shaped text, hex colours) found nothing this lane wrote; the one `!` in an added line (`scripts/e2e-failure-report.ts`) is a moved line of the file's existing two, its allowlist count unchanged.
14. **CI's first run on `2feedc3ae` (run 45527306417) and its three fix commits.** Gating failures were six: RP-1 (both projects), BR-3 (both) and CT-23 (both); two flaky (LGA-21 mobile, AT-59 desktop, passed on retry, non-gating). Causes, each at its root and each mine: (a) RP-1 cleared the page's storage by hand for its signed-out step; the staff sign-in's one-shot injection keeps its mark in that storage, so the injection signed the page in again — RP-1 now signs out through the UI (`4efa262eb`); (b) BR-3: the shell's ad crumb reads the page's cache only (decision 7) and the admin Edit page read the ad by its own door (`readAdminListing`), so the crumb stayed at a dash — the Edit route now calls `useAdminListing` (behind the gate), which fills the crumb's key (`37cc07d9b`); the cost is one more `admin_listing_detail` read on that page (named for K2); (c) CT-23: my new "no trace" read counted the sign-in's own `profile.preferred_language` audit rows (two) — it now reads the import's audit rows (`action like 'category%'`) and meter rows (`action like 'import:%'`) (`4efa262eb`); (d) LGA-21's three staff sign-ins each wait out a code's step and took it past the 60 s default (flaky, passed on retry) — `test.setTimeout(150_000)` with the cause written beside it (`4efa262eb`); (e) AT-59 failed on a 500 from the auth server's factor challenge in the shared pooled sign-in (`unexpected_failure`), a backend failure outside any file of this lane; it passed on retry. CT-23's new assertions cannot be run before file 3 is on staging, so they are judged by CI's temporary backend only; the first run's failure is the proof that the 428s and the empty category held (the failing line was the audit read). The three fixes were run by id on ethio-staging with file 3 held aside, as in §12: RP-1, BR-3 and LGA-21, both projects, `6 passed (1.4m)` (`e2e-ci-fix.log`); then typecheck, lint, `vitest run scripts` (`747 passed | 1 skipped`), the component tests of the touched areas and `check-bundle-size` (`Bundle budget OK`).
15. **Ruling 3 (final report: CT-23's "no trace", the branch guard, the sign-in link).** File 3 is on ethio-staging (the preflight answered `migration parity OK … newest: 20261124221200_d9701480-…`), so local runs hold nothing aside. (a) **CT-23** (`b969328a0`): the audit and meter reads exclude exactly `profile.preferred_language` and the dial `account_pref`, each with its writer (the sign-in's account-language rule, D239) and `INC-1290 until bundle 7`; the `like` filters are gone. **One departure from the ruling's text, named:** the first run on ethio-staging with the ruling's literal form failed with 545 audit rows (`user.status_change`, `role.assign`, … keyed to the importer): a leased pool account keeps the audit rows of its earlier borrowers when its roles and sessions are reaped. The proof therefore reads every row the importer gained since the attempt began (the latest `created_at` of its audit rows, read after the sign-in and before the first POST, as a watermark; the meter rows compared before and after), still excluding only the two named writers, so the net stays whole over the attempt and the account's past is not the attempt's. CT-23 by id on ethio-staging, `mobile-360` and `desktop-1280`, 0 retries: `2 passed (15.8s)` (`e2e-ct23.log`). (b) **DEC-468** (`ff442b8ba`): `scripts/ci/lovable-branch-guard.sh` admits the entry's `js:` limit line on DEC-425's terms, each limit with its own comment; `scripts/ci/lovable-branch-guard.test.ts` gains CF-LVB-21 (a js change alone, with its comment, with the css change, no-comment and one-comment forms, by the API's patch and by git's) and CF-LVB-22 (a second js line, a removed one, comments that disagree in either number, a comment with no js change, a second comment, one comment naming both limits, a comment below the limits or above the block, a moved line, a trailing comment, a quoted key, any other line of the block or the file, a second css line beside a js change, a new, renamed or deleted file); the older CF-LVB-17 and CF-LVB-18 sentences now name DEC-468 beside DEC-425. Proven on a planted bypass: with the js position check disabled and the was-value check removed, CF-LVB-22 failed on "a js comment whose was-value disagrees" (the other planted gap, the position check, is held by the moved-line case); the script was restored byte for byte before the commit. `docs/features/ci-guards.md` has the bullet. (c) **The sign-in link** (`aa8745b21`): `signInMarker` in `e2e/helpers/ui.ts` (`header a[href="/auth"], header a[href^="/auth?"]`, and the comment above `signOutViaUi` says why), SGS-6 in `e2e/sage-shell.spec.ts` (inside `topbar-controls`) and the count-0 line of "the bottom bar, signed out" in `e2e/shell.spec.ts` (both forms, each `:visible`). The search (`rg` over `e2e`, `src` and `scripts` for a locator of the sign-in address by `href`, `"/auth"`, `'/auth'` and `[href=…/auth`) found no other: the remaining `/auth` hits are navigations (`goto`, `waitForURL`, `toHaveURL`), `ad-page.spec.ts:594` (reads the `?return=` form by its prefix), `settings.spec.ts:60` (a pathname) and `legal-accept.spec.ts:310` (a path filter). By id on ethio-staging, both projects, 0 retries, on this tree where the link is still `/auth`: SGS-6 (desktop 834 and 1440 px, light and dark, pass; every other width skips by the test's own rule), the signed-out bottom bar (`mobile-360` passes; `desktop-1280` skips by design), SO-1, AT-1 and RP-1 (both projects pass); `e2e-r3.log`. (d) The report's other accepted items need no change here (ruling 3 decision 4).

## 11. CI
- The base's CI (`1bbfc7dad`, read at step 1): `- Commit: 1bbfc7dadd4d999a2cc292442a669bfa26680435 (short 1bbfc7d)`, `- Conclusion: SUCCESS`, `- Completed (UTC): 2026-11-24T13:28:45Z`, `- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45402760878`. `origin/dev` was unchanged at 1bbfc7dad when this stop began (`git log -1 origin/dev`: `Merge pull request #102`).
- Earlier-turn rereds fixed first: the base's NEAR band red `/admin/roles_/$roleId` 275 → 276 (Part 1's first commit).
- The expected red of the final push: the staging preflight answers STAGING BEHIND for file 3 until the supervisor applies it at this report; it is named in ruling 2 decision 13 and is not re-run.
- This pull request's runs: run 45527306417 on `2feedc3ae`: FAILURE — the preflight (expected, below), lanes 9 and 15 (the six gating failures of §10 item 14, each fixed) and the staging job (failed in 30 s behind the preflight's red); every other check passed. Run 45538853781 on `37cc07d9b` (this report's last code commit): every lane on the temporary backend passed (smoke, email, webkit, repeat, lanes 1–16, the summary), `E2E (Playwright, ethio-staging)` passed, build, typecheck, lint, component tests, the first-paint budget, the guards, gitleaks, Semgrep and CodeQL passed; the one red is `E2E preflight (migration parity, staging)`: `STAGING BEHIND: apply 20261124221200_d9701480-dab5-437e-8a08-8820d82842a7.sql to ethio-staging before E2E can pass`, the red ruling 2 decision 13 names as expected and not re-run. So not every check was green on that commit: it turned green when the supervisor applied file 3 (ruling 3's push, below). The temporary-backend lanes ran file 3 (applied by CI's own steps) and proved STAFF-E3, CT-23 (aal1 importer refused 428, nothing written) and the view-as readers; flaky on retry in that run, non-gating: AT-9, IG-2 and AT-50, each the auth server's factor-challenge 500 in the shared sign-in (`unexpected_failure`), outside this lane's files. Ruling 3's push, run 45547063987 on `aa8745b21`: SUCCESS — every check passed (the preflight too, file 3 being on staging; the Lovable branch guard and the promote job skip by design); `ci-status.md` reads `Conclusion: SUCCESS`.

## 12. Limits
- File 3 is not applied on ethio-staging, and the e2e preflight refuses a local run with an unapplied migration in the tree. Every local browser run therefore ran with file 3 moved aside and `src/server/route.ts` / `src/server/supabase/user-client.ts` at their file-2 versions (`5e0b0addf`), all restored and verified clean (`git status --short`) before each commit. Not provable locally, and proven only by CI after the supervisor applies file 3: STAFF-E3, the new CT-23, the view-as tests with the new readers (IMP-1, IMP-2, IMP-3, IMP-5, D239-E6), and every route test that now asks `my_permission_answer`. The 58-id run, the STAFF-E1/E2 runs and PW-8b do not need file 3.
- `lane-weights.json`'s line for `staff-gate.spec.ts` is from my local run, not a CI run.
- Browser tests ran in `mobile-360` and `desktop-1280` (and DLG-E12 in `webkit-1280`); the other WebKit projects and the full lanes are CI's (§11).
- `bun scripts/brief/check-go.ts docs/governance/briefs/cursor-bundle-6.md --at 1bbfc7dad`, pasted:
  ```
  [check-go] at 1bbfc7dadd4d999a2cc292442a669bfa26680435 (--at 1bbfc7dad): the tree laws and every other COUNT read its snapshot …
  CF-BRIEF-24 docs/governance/briefs/cursor-bundle-6.md:14 the CONFORMANCE GUARD names no path
  CF-BRIEF-24 docs/governance/briefs/cursor-bundle-6.md:24 the CONFORMANCE GUARD names no path
  CF-BRIEF-24 docs/governance/briefs/cursor-bundle-6.md:34 the CONFORMANCE GUARD names no path
  CF-BRIEF-24 docs/governance/briefs/cursor-bundle-6.md:44 the CONFORMANCE GUARD names no path
  CF-BRIEF-24 docs/governance/briefs/cursor-bundle-6.md:55 the CONFORMANCE GUARD names no path
  CF-BRIEF-24 docs/governance/briefs/cursor-bundle-6.md:65 the CONFORMANCE GUARD names no path
  CF-BRIEF-23 docs/governance/briefs/cursor-bundle-6.md:70 SCOPE names a route or component, so the census item user-cases is answered, never marked not applicable
  CF-BRIEF-15 docs/governance/briefs/cursor-bundle-6.md:74 STEP 1 does not name the census item user-cases
  [check-go] 8 finding(s)
  ```
  The 8 findings are in the brief's own text, judged by CF-BRIEF-22 → 24 that this bundle added (Part 2): the brief predates its own guards. The brief is saved byte for byte and I do not edit it; at the `--root .` run in step 0 there was "no finding", before those guards existed. Reported, not hidden.
- Hosted dashboards, the staging and production applies and the WebKit lanes are not mine to run.

### THE OPERATOR'S SETTINGS (in the order they must be set after Publish; ethio-staging first, then ethio-prod)
1. Apply file 3 on ethio-staging (the supervisor: `apply d9701480 → expect mark 20261125010000`); read it back; only then does CI's preflight pass and STAFF-E3, CT-23 and the view-as tests run against the rule.
2. Authentication → Emails → "Email Templates", by the dashboard's labels, each project:
   - "Confirm signup": the subject from `supabase/templates/subjects.json` `confirmation`, the body from `supabase/templates/confirmation.html`.
   - "Reset Password": `recovery`.
   - "Change Email Address": `email_change`.
   By the Management API the fields are `MailerSubjectsConfirmation`, `MailerTemplatesConfirmationContent`, `MailerSubjectsRecovery`, `MailerTemplatesRecoveryContent`, `MailerSubjectsEmailChange` and `MailerTemplatesEmailChangeContent`; each is read back after it is set. "Invite user", "Magic Link" and "Reauthentication" stay at the hosted defaults.
3. Before the ethio-prod apply of files 1 to 3, the operator is told: every staff role holder without a verified factor meets the setup on their next staff screen, and every staff door and staff route refuses them until a factor is used; a holder with a factor is asked for its code in a session that has not used it. A member's own permissions are unaffected.
4. No other hosted setting.

## 13. Findings
1. **The gate's first download on four pages (+59 KiB on `/admin`, `/admin/images`, the view-as page).** The gate chunk is 3.2 KB but it needs the Supabase client (`dist` 394 B → 53,469 B), which those pages did not carry before. Raised under DEC-296 with its cause on each line (§10 item 8). A way to split the client's auth part out of the gate's first read (a lighter factor read) is a design choice for the supervisor.
2. **Decision 6 — the census by manifest class (`owner`, `signed-in-reader`, `helper`), from each door's last declaration (`last-decl.ts`, `bodies60.txt`).** "own" = the owner column compared with `auth.uid()`; "own-listing" = a listing of the caller's (`seller_id = uid`); "public" = public data or a pure check; "held" = a row the caller holds (a session). 60 doors; none of the third kind reaches another person's data except as listed:

| door | class | decides by | how |
|---|---|---|---|
| `accept_legal` | owner | own | writes the caller's own acceptance row (user_id = uid); reads public legal text |
| `change_home_country` | owner | own | the caller's own profile and directory row |
| `check_seller_alias` | owner | public | answers whether an alias is free to the caller; no person's row returned |
| `clear_seller_place` | owner | own | the caller's own seller_places row |
| `copy_my_listing` | owner | own-listing | a listing of the caller's (seller_id = uid), copied into the caller's draft |
| `edit_my_listing` | owner | own-listing | a listing of the caller's (seller_id = uid) |
| `end_impersonation` | owner | held | the impersonation session the caller started (actor_id = uid); no other |
| `get_attribute_options` | owner | public | an attribute's option list (catalogue data), dial options_read |
| `get_posting_schema` | owner | public | a category's posting schema (catalogue data), dial schema_read |
| `mark_sold` | owner | own-listing | the caller's own listing (seller_id = uid) |
| `move_listing_photo` | owner | own-listing | photos of the caller's own listing |
| `publish_listing` | owner | own-listing | a listing of the caller's |
| `remove_listing_photo` | owner | own-listing | photos of the caller's own listing |
| `remove_own_password` | owner | own | the caller's own auth.users row |
| `renew_listing` | owner | own-listing | a listing of the caller's |
| `report_listing` | owner | public | the caller's own report of a public listing (one per caller); the reporter is never shown to the seller |
| `resume_listing` | owner | own-listing | a listing of the caller's |
| `reveal_listing_contact` | owner | public | the contact methods the seller chose to show on a public listing (reveal flags), rate-gated per caller and listing; named under Departures as the one body that returns another person's contact, by design |
| `save_listing` | owner | own | the caller's own save of a public listing |
| `save_posting_identity` | owner | own | the caller's own profile, alias and place |
| `save_seller_place` | owner | own | the caller's own place, own listing |
| `set_cover_photo` | owner | own-listing | the caller's own listing's photos |
| `set_listing_level` | owner | own-listing | the caller's own listing (seller_id = uid) |
| `set_listing_photos_soon` | owner | own-listing | the caller's own listing |
| `set_listing_pin` | owner | own-listing | the caller's own listing |
| `set_listing_reach` | owner | own-listing | the caller's own listing |
| `set_listing_reserved` | owner | own-listing | the caller's own listing |
| `submit_listing` | owner | own-listing | the caller's own draft |
| `suggest_seller_aliases` | owner | public | alias suggestions from the category name and the caller's words; no person's row |
| `transition_listing` | owner | own-listing | the owner's door alone (DEC-402); seller_id = uid |
| `unsave_listing` | owner | own | the caller's own save |
| `user_set_preferred_language` | owner | own | the caller's own profile |
| `get_active_impersonation` | signed-in-reader | held | the caller's own open session as actor; names the target's display name to its actor (named under Departures) |
| `get_attribute_options_version_read` | signed-in-reader | public | a catalogue version string; no person's data |
| `get_my_permissions` | signed-in-reader | own | the permission names of the caller's own roles (decision 3: stays) |
| `get_my_translator_languages` | signed-in-reader | own | translator_languages where user_id = uid |
| `has_password` | signed-in-reader | own | the caller's own auth.users row |
| `listing_contact_refusals_read` | signed-in-reader | public | a pure check of the argument the caller passed; reads no row |
| `listing_counts` | signed-in-reader | own-listing | counters of a listing of the caller's (refuses notYourListing) |
| `listing_history` | signed-in-reader | own-listing | the history of a listing of the caller's (refuses notYourListing); other actors shown as 'staff', never a name |
| `listing_viewer_state` | signed-in-reader | own | the caller's own saved flag and owner flag on a public listing |
| `my_last_listing_private` | signed-in-reader | own-listing | the caller's own last listing |
| `my_legal_history` | signed-in-reader | own | legal_acceptances and notices of the caller |
| `my_legal_status` | signed-in-reader | own | the caller's own acceptances against public documents |
| `my_legal_version` | signed-in-reader | own | a public version's text with the caller's own acceptance |
| `my_listing` | signed-in-reader | own-listing | the caller's own listing and its notices |
| `my_listing_certification` | signed-in-reader | own-listing | a listing of the caller's (refuses notYourListing) |
| `my_listing_private` | signed-in-reader | own-listing | the caller's own listing |
| `my_listings` | signed-in-reader | own-listing | listings where seller_id = uid |
| `my_recent_categories` | signed-in-reader | own | categories of the caller's own listings |
| `my_saved_listings` | signed-in-reader | own | saved_listings of the caller |
| `my_seller_line` | signed-in-reader | own | the caller's own profile and alias history |
| `my_seller_place` | signed-in-reader | own | the caller's own seller_places row |
| `my_viewing_location` | signed-in-reader | own | the caller's own profile |
| `promote_options` | signed-in-reader | own-listing | a listing of the caller's (seller_id = uid) |
| `translation_scope_ok_read` | signed-in-reader | public | a pure check of the caller's translator scope |
| `has_permission` | helper | own | helper: answers about the caller only (a non-member asking about another reads false, DRF-1); the policies' one question |
| `my_permission_answer` | helper | own | helper (file 3): the caller's own answer for one permission; `denied` for an unknown caller |
| `sold_cutoff` | helper | public | helper: a date computed from a setting; no row |
| `user_set_viewing_location` | owner | own | the caller's own profile (viewing location) |

   The two rows of the third kind are `end_impersonation` (the session the caller started, by `actor_id = auth.uid()`: no other) and `get_active_impersonation` (the caller's own open session as actor; it names the target's display name to its actor — named here; it keeps its class by ruling 2 decision 5). `reveal_listing_contact` is the one body that returns another person's contact — by design: the contact methods the seller chose to show on a public listing, rate-gated per caller and listing. Nothing moves to a staff class on this census. It seeds bundle 7's standing check.
3. **Decision 7 — staff doors called outside `/admin`, and what an aal1 staff session sees there.** The census (`staff-door-callers.txt`, `staff-doors.txt`, `staff-callers.ts`) found: the rail's `legal_review_overdue` alert (`src/features/admin/nav-alerts.ts`) — read only at aal2, never drawn as failed (unit: `nav-alerts.test.tsx`); the admin breadcrumbs (`src/components/shell/admin-detail-crumbs.tsx`), which sit in the shell and called four staff detail hooks (listing, user, role, translation language) that fetch staff doors — now `cacheOnly`, so they read the cache and never fetch (unit: `admin-detail-crumbs.test.tsx`; the four hooks' own option is tested through it). The census then read every one of the 150 staff and staff-reader doors' names across `src` outside the admin folders (`rg -w` over `src`, tests and the generated types excepted): the hits are `src/features/posting/posting-service.ts:527` (`admin_listing_photos`, the staff edit's read, reached only from `admin.listings_.$listingId_.edit.tsx`, behind the gate), `src/routes/api/media/photo-links.ts` (a route whose staff branch asks `admin_photo_link_rows` as the caller; its staff callers are the admin previews, behind the gate; PP-13 proves the staff answer at aal2) and `src/routes/api/translate.ts` (a staff route, answered 403 or 428 by the route mechanism); the other files that matched name a door only in a comment (`edit-step-changes.ts`, `state-line.ts`, `use-edit-draft.ts`, `dials.ts`, `deactivated.ts`). No page outside `/admin` draws a failure for a staff read at aal1.
4. **EXPLAIN — one hot policy read, after file 3** (`explain-after.txt`; the same scratch probe as stop 2: a scratch super admin, 3000 scratch rows in `storage.objects` under `category-assets`, `SET LOCAL ROLE authenticated`, aal2, rolled back; `EXPLAIN (ANALYZE, COSTS OFF)` of `SELECT count(*) FROM storage.objects WHERE bucket_id = 'category-assets'`):
   ```
   PLAN Aggregate (actual time=1.096..1.096 rows=1 loops=1)
   PLAN   InitPlan 1
   PLAN     ->  Result (actual time=0.753..0.754 rows=1 loops=1)
   PLAN   ->  Bitmap Heap Scan on objects (actual time=0.854..1.027 rows=3000 loops=1)
   PLAN         Recheck Cond: (bucket_id = 'category-assets'::text)
   PLAN         Filter: (InitPlan 1).col1
   PLAN         Heap Blocks: exact=58
   PLAN         ->  Bitmap Index Scan on objects_bucket_id_name_version_key (actual time=0.089..0.089 rows=3000 loops=1)
   PLAN               Index Cond: (bucket_id = 'category-assets'::text)
   PLAN Planning Time: 0.064 ms
   PLAN Execution Time: 1.106 ms
   ```
   (second run 0.826 ms). Before file 3 the same read took 1497 ms with the staff rule (stop 2); the call is now an InitPlan, evaluated once.
5. **DLG-E12 on `webkit-1280`, run once with `--trace on` at the final tree** (`bun run e2e:local -- e2e/dialogs.spec.ts --grep "DLG-E12" --project webkit-1280 --retries 0 --trace on`, `dlg-e12-final.log`, results kept in `dlg-e12-results/`): `✘ 1 [webkit-1280] … DLG-E12 a filter row's list opens in the panel's flow under its row …` / `1 failed`. INC-1273 is OPEN: Lovable bundle 8's change did not cure it on this Mac's WebKit.

   The failing assertion's error context (`error-context.md`, the page snapshot at the failure): `Error: expect(locator).toBeVisible() failed` — `Locator: getByTestId('style-filters-panel').getByTestId('style-filters-size-list')`, `Expected: visible`, `Timeout: 10000ms`, `Error: element(s) not found`, at `e2e/dialogs.spec.ts:833` (`await expect(sizeList).toBeVisible()` after `await pressClear(size)`, "ONE press on another row's control closes this list and opens that row's"). The snapshot's dialog at that moment:
   ```
   - dialog "Filters" [active]:
     - heading "Filters" [level=2]: Choose what the list shows.
     - generic "Colour": button "Colour Red, Blue"
     - generic "Size":   button "Size All"
     - button "Clear all"; button "Done"
   ```
   — no list open and neither row control expanded: the press closed the colour list and the size list never opened.

   The trace's last ten actions (`test.trace` and `0-trace.trace`, times from the first action):
   ```
     4559 ms  pw:api               Evaluate getByTestId('style- style-filters-panel > style-filters-size   [ok, 9 ms]
     4559 ms  waitForSelector      Evaluate                     style-filters-panel > style-filters-size   [ok, 5 ms]
     4568 ms  pw:api               Evaluate                        [ok, 89 ms]
     4568 ms  evaluateExpression                                 async () => {     const finite = document.getAnimations().filter(a => {       var _a$effec  [ok, 85 ms]
     4657 ms  pw:api               Click getByTestId('style-fil style-filters-panel > style-filters-size   [ok, 57 ms]
     4657 ms  click                                             style-filters-panel > style-filters-size   [ok, 52 ms]
     4714 ms  expect               Expect "toBeVisible"            [FAILED, 10018 ms]
     4716 ms  expect               Expect "toBeVisible"         style-filters-panel > style-filters-size-list   [FAILED, 10005 ms]
    15016 ms  pw:api               Close context                   [ok, 4 ms]
    15021 ms  test.attach          Attach "error-context"          [ok, 0 ms]
   ```
   The click on the size control returned `ok` in 52 ms; the visibility wait on its list then ran its full 10 s and failed. No fix, as ruled.
6. **The step-up dialog's no-factor state** (`src/features/auth/mfa/step-up-dialog.tsx:86`, `step-up-no-factor`) is reached only from a guarded action on a page outside the gate now; MF-3, MF-6 and MF-7c, which drew it on staff screens, assert the gate's setup panel instead. Not removed (out of scope); a later turn may judge whether any caller still reaches it.
7. **`scripts/doors/manifest.ts`'s `HELPER_REASONS`** refuses the ruling's `caller:` form for a helper (§10 item 4); its doc comment names the form it accepts only in code. Reported.
8. **`bun run checks` named a pile of stale lines on my own first pass** (§5): five allowlists keyed by line number break on any edit above their line. The line-keyed form costs every turn that touches those files an allowlist round; a key by statement text would not. Reported as structural, not a defect of this bundle.
9. **The brief's own guard findings** (§12 `check-go` paste): the brief fails CF-BRIEF-15/23/24 that Part 2 introduced. A later brief template already carries the items.
10. **AL-31 on `desktop-1280` failed once in the final 58-id run** (`[e2e:session] injected identity mismatch … page holds no session`, raised by `assertInjectedIdentity` inside `signInStaff`; the same run logged one `UND_ERR_CONNECT_TIMEOUT` transport retry). It passed on `mobile-360` in that run and on both projects in runs before and after (`e2e-d8-run3.log`, `e2e-fix.log`). I did not find the cause; the helper writes the session and reloads, and the page held none when it read back. CI's repeat lane is the proof of its stability; if it recurs, the helper's write-then-reload step is where to look.
11. **INC-1283** (owned by Cursor bundle 7): policies that call `auth.uid()` bare; CF-RLS-1 does not judge them.
12. No security hole was found. The two-step check: the staff-session rule is judged by SQL proofs (files 1 to 3, `db:proof` 556/556) and by the browser runs above; the route's 428 is judged by `route.test.ts` and `user-client.test.ts` (unit) and STAFF-E3 (CI).

## 14. Records
DEC — The staff route asks the database for its answer. `my_permission_answer(resource, action)` is the one SQL function a staff route asks about the caller's own permission: it answers `denied`, `allowed`, `stepUp` or `stepUpNoFactor` from the same core and the same staff-session rule as `door_context`. The route answers `denied` with 403 and the two step-up words with 428 through `stepUpRequired`, carrying the sentence the door raises for the same case. `callerHasPermission` asks it and returns its word; an unknown word throws. (DEC-465, as numbered in ruling 2.)

DEC — A staff authority holds only for a session that used its second factor (DEC-461's build): `has_permission_core` answers without the rule; `staff_session_holds` is the rule; `has_permission` and `has_permission_scoped` are the core AND the rule; `door_context`'s staff and staff-reader classes refuse with P0009. A staff screen opens only behind the gate (DEC-434, DEC-451), mounted in the admin layout on demand.

DEC — An ended sign-in is reported where it is first read: the route client's signed-out answer, a 401 and the door client's `notSignedIn` are reported once to the one listener (`src/lib/ended-sign-in.ts`) the shell registers; every consumer maps it to the signed-out state.

DEC — A policy asks a permission once per query: `(SELECT public.has_permission(…))` in every row policy; CF-RLS-1 refuses a bare call.

INC — INC-1274 closed with what was built: an ended sign-in said as ended, in the auth actions, the live guard, the route client, the door client and each consumer (the posting form, the category images service, the translations service, the geocode, the import dialog), with the browser tests ACS-E5, ACS-E6 and PW-8b.
INC — INC-1275 closed: the refusal reader takes a provider code a family names before the family's sentences; the provider-error fixture and CF-PROVERR-1.
INC — INC-1276 closed: the three action e-mails come from the repository (`supabase/templates/`, `subjects.json`), read by CI's backend, judged by CF-TPL-1; the hosted copies are set from §12.
INC — INC-1268 closed: the language provider and the sign-in page read the one session store; CF-SESSION-7.
INC — INC-1272 closed: the failure report writes the gating failures first (EFR-6).
INC — INC-1277 closed: the browser-libraries install measures each mirror's throughput and drops a slow region mirror; apt gets a per-mirror timeout and retries (IBD-1); a package cache would need `.github/workflows/**` and is not built.
INC — INC-1269 left open with its cause unproven: AU-3 now records the failed requests and the status door's answer beside its assertion, so the next red names its cause.
INC — INC-1273 open again: DLG-E12 fails on WebKit 26 on the operator's Mac with Lovable bundle 8's change in the base (§13 item 5).
INC — INC-1266: the three held readers stand as allowlist lines under the typed-failure guard (CF-REFUSAL-5).
INC — INC-1282 (the number alone, until its fix is live).
INC — INC-1283: the policies that call `auth.uid()` unwrapped are owned by Cursor bundle 7; CF-RLS-1 names the permission functions only.
DEC — DEC-468: the Lovable branch guard admits the entry's `js:` limit line of `scripts/check-bundle-size.mjs` on DEC-425's terms (exactly one removed and one added `js:` line, at most one DEC-296 comment naming JS agreeing with them, each limit with its own comment; every other changed line refused); CF-LVB-21 and CF-LVB-22.
INC — INC-1290: a write that changes nothing still writes, audits and spends its dial (`user_set_preferred_language`); CT-23's two exclusions carry it until bundle 7.
INC — INC-1291: the lighter read of the session's level and factors that keeps the client off the gated admin pages.
INC — INC-1292: the admin Edit page reads the ad once and fills the crumb from it.
INC — INC-1293: the line-keyed allowlists break when code above them moves.

register row — a staff session has used its second factor → `AdminGate` (`src/routes/admin.tsx`, `staff-factor-gate-lazy.tsx`), `door_context`'s staff classes, `my_permission_answer` and the route mechanism → STAFF-E1, STAFF-E2, STAFF-E3, the migration proofs → exceptions: none.
register row — a policy asks a permission once per query → `(SELECT public.has_permission(…))` in every row policy → CF-RLS-1 (`scripts/conformance/rls-initplan.ts`, planted) → exceptions: none.
register row — an ended sign-in is reported where it is first read → `src/lib/ended-sign-in.ts`, registered by the shell → RCL-18, SBD-23, SBD-24, the consumers' unit tests, ACS-E5, PW-8b → exceptions: none.
register row — the refusal reader's row gains "a named code before a sentence" and the provider-error fixture (CF-PROVERR-1); the typed failure's row gains CF-REFUSAL-5; the display primitives' row gains CF-NUM-1; the notices' row becomes "every sign-in mail" (CF-TPL-1); the gate-reach law (CF-BRIEF-22 → 24).

changelog — Cursor bundle 6: every staff screen opens only for an account with a verified second factor in a session that used it; a staff route answers 428 for a session that has not, in the door's own words; the view-as readers ask the permission; the bucket's rules run once per query; an ended sign-in is said as ended everywhere; the three sign-in e-mails come from the repository.

roadmap — account security: the staff-session rule (DEC-434, DEC-438, DEC-451, DEC-461, DEC-465) is built on the server and in the admin layout; its production apply waits on the operator's notice to staff holders without a verified factor (§12).

slip — the first by-id gate-reach run after the rule passed only because the aal2 pooled session is a superset of aal1 (stop 2); the 58-id list was the real proof, run after the rule was on staging (§5).
slip — the first `bun run checks` of this stop failed three steps on lists my own new names had not joined (§5): a new test file, a new lazy place and a moved line each cost an allowlist; the plan's "every list a new name must join" census missed the lane weights, the selector's areas and the holds-its-box lines.
slip — file 3's mark was chosen at the first proof and overtaken by the clock before the commit (§10 item 7).
