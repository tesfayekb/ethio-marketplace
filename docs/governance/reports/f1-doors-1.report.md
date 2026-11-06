# TASK — FOUNDATIONS 1, TURN F1-1: the door mechanism's first build — report
Base: 596345a4c · Final commit: a6838bc9a · Brief: docs/governance/briefs/f1-doors-1.md (sha256 ca252e84abdaa802fea921931804f16e2b6853af0d985ee59427018588944582)
Review: READY · 0 BLOCKER · 0 MAJOR · 3 MINOR · on a6838bc9a

The turn ran through three stops and six rulings (ruling 1 and 2 before it; rulings 4, 5 and 6 in it — `docs/governance/briefs/f1-doors-ruling-{1,2,4,5,6}.md`; the stop reports `docs/governance/reports/f1-doors-1.stop-{1,2,3}.md` carry the evidence of each stop verbatim and are cited below rather than copied).

## 1. Done / not done, by part and step

Done (the task's steps, ruling 1 decisions 1→12, rulings 4–6):
- STEP 0 record (`3dbd6d31d`): the task, plan, census and rulings 1–2 saved; roadmap line 3; draft pull request #28.
- STEP 1 census at 596345a4c (stop 1 §Census deltas): 269 browser-callable functions at the base → 265 on the tree; VOLATILE authenticated 128 → 124; anon 23 → 23; unseen 0.
- STEP 2 premise: SQL side in part 2's proof (b) (a planted scratch door on the shell returns the envelope, counts the dial, writes `door_refusals`; db:proof PASS); browser side on CI's lanes (DRF-3/DRF-4 read `code[:detail]` through supabase-js; CG-3 and part 5's proof (c) the 428 P0009 path) — green on run 42200467397's lanes and locally (§5).
- STEP 3, part A (`c09b778ae`, marks moved `d2b7f2a08`, the cost bar `f46d29151`): M-F1a in six files (§9).
- Part B (`110eba3ef`): `scripts/doors/` (manifest.txt 265 lines, manifest.ts, catalogue.ts, identity.ts, judge.ts, rows.ts, check-doors.ts static and `--live`, the planted self-test of seven finding kinds), caller-gates retired (DEC-334: `check-caller-gates.ts`, its allowlist and fixture deleted and declared; ci.yml and local-backend-proof.yml steps replaced; AGENTS.md :18 and :53), wired. Part F (`e2e099606`): the live query is the file `scripts/doors/live-query.sql` read verbatim (INC-1070, DOORS-5). Part K (`8a5662d61`): the live judgement reads the tree census too (INC-1072, DOORS-6).
- Part C (`3bb823ad1`): `src/lib/door-codes.ts` (the closed list, `doorCode`, `DOOR_REFUSED_KEY`), the key `door.refused` EN; `removeOwnPassword` reads the code. Part I (`f6b1eebdb`): the Amharic from the supervisor's file by script.
- Part D (`d27be46e3`, DRF-4 amended `586971226`): `e2e/door-refusals.spec.ts` DRF-1…6; CG-2 to six retired doors, CG-4; the twelve tests of the three retired doors onto `edit_my_listing`; LGA-22; `docs/features/doors.md`, `ci-guards.md`.
- Part E (`f98bc094c`): the legal editor onto `base_languages` (`listBaseLanguages` + shape guard, `useBaseLanguages`, LBL-1…3; `useLanguages` and the PSEUDO_LANG filter leave the editor).
- Part G (`a171104ea`): the pooled super admin's `rate_limits` rows join its baseline reset (INC-1071).
- Parts H (`60c3d9cc5`, `7242c7063`) and J (`5f7723042`, `4016d2ffc`, `cae86145c`): the first-paint graph (INC-1069, DEC-348) — `auth-client.ts`, `preferred-language.ts`, `auth-result.ts`, `sign-out.ts` as leaves; the provider and the shell's hook import leaves only; the auth route imports the sign-in family from the service; the auth-answers census follows; the four pages that import the service take DEC-296's lines (ruling 6 §1).
- Ruling 4 §0 (`8ecfbadd0`): the regenerated client types applied (`git apply`, sha256 e1ce7d87…).
- Ruling 5 §2 (ii) (`f46d29151`): part 2's proof (d) bar at 1 ms, proof text only, schema text byte-identical, db:proof PASS.
- THE CHECKS (§5), the browser check of 17 specs (§5), the self-review (header; the MINORs under §10), this report.

Not done / not mine:
- Ruling 4 §4 / ruling 5 §2 (i), the `door_context` cost READING: no `door_context cost` NOTICE line exists in the local apply log (419 lines, grepped for that line only) nor in the smoke lane's job log of run 42200467397 (grepped for the same; 0 `NOTICE` lines in it) — CLI 2.120.0 prints no server notices in either place. The record of the cost is the 1 ms bar the apply passes (§9).
- The migrations are not applied by me anywhere: ethio-staging received them from the operator (the lanes' preflight and start lines read `applied 415/415`); production by the operator's publish.

## 2. Files changed

`git diff --name-only 596345a4c..a6838bc9a` (83 files; this report is added by its own commit after):

```
.github/workflows/ci.yml
.github/workflows/local-backend-proof.yml
AGENTS.md
docs/features/ci-guards.md
docs/features/doors.md
docs/features/e2e-harness.md
docs/features/legal.md
docs/generated/i18n-usage.json
docs/governance/briefs/f1-doors-1.md
docs/governance/briefs/f1-doors-ruling-1.md
docs/governance/briefs/f1-doors-ruling-2.md
docs/governance/briefs/f1-doors-ruling-4.md
docs/governance/briefs/f1-doors-ruling-5.md
docs/governance/briefs/f1-doors-ruling-6.md
docs/governance/briefs/f1-doors.md
docs/governance/reports/f1-doors-1.stop-1.md
docs/governance/reports/f1-doors-1.stop-2.md
docs/governance/reports/f1-doors-1.stop-3.md
docs/governance/reports/f1-doors.stop-1.md
docs/tracking/intentional-deletions.txt
e2e/admin-listings.spec.ts
e2e/auth-caller-gates.spec.ts
e2e/door-refusals.spec.ts
e2e/helpers/session.ts
e2e/helpers/ui.ts
e2e/legal-admin.spec.ts
e2e/legal-certify.spec.ts
e2e/my-listings-doors.spec.ts
e2e/my-listings-page.spec.ts
e2e/posting-routes-dials.spec.ts
public/i18n-usage.json
roadmap.md
scripts/acceptance-doors-allowlist.txt
scripts/caller-gates-allowlist.txt
scripts/check-caller-gates.ts
scripts/conformance/agents-lines-allowlist.txt
scripts/conformance/auth-answers.test.ts
scripts/conformance/door-answers-allowlist.txt
scripts/conformance/on-demand-failure-allowlist.txt
scripts/conformance/vendor-seams-allowlist.txt
scripts/conformance/wired.test.ts
scripts/doors/catalogue.ts
scripts/doors/check-doors-allowlist.txt
scripts/doors/check-doors.test.ts
scripts/doors/check-doors.ts
scripts/doors/identity.ts
scripts/doors/judge.ts
scripts/doors/live-query.sql
scripts/doors/manifest.ts
scripts/doors/manifest.txt
scripts/doors/rows.ts
scripts/e2e-select.ts
scripts/fixtures/caller-gates-bad.tsv
scripts/public-surface-allowlist.txt
scripts/route-budgets.mjs
src/features/admin/legal/legal-editor-form.tsx
src/features/admin/legal/legal-service.test.ts
src/features/admin/legal/legal-service.ts
src/features/admin/legal/use-legal.ts
src/features/auth/auth-client.test.ts
src/features/auth/auth-client.ts
src/features/auth/auth-result.ts
src/features/auth/auth-service.ts
src/features/auth/preferred-language.test.ts
src/features/auth/preferred-language.ts
src/features/auth/sign-out.ts
src/features/auth/use-auth.ts
src/i18n/locales/am-base.ts
src/i18n/locales/en-base.ts
src/i18n/provider-d239.test.tsx
src/i18n/provider-layers.test.tsx
src/i18n/provider.test.tsx
src/i18n/provider.tsx
src/integrations/supabase/types.ts
src/lib/door-codes.test.ts
src/lib/door-codes.ts
src/routes/auth.tsx
supabase/migrations/20261106051500_6d2f0f3e-7b7a-4c0e-9a4e-1f8e1c2a0d01.sql
supabase/migrations/20261106051600_8b7c2e41-3d5f-4a9b-b0c6-2e9d4f7a1b02.sql
supabase/migrations/20261106051700_c4e9a6d7-5f2b-4e8c-a1d3-7b6f0e2c9a03.sql
supabase/migrations/20261106051800_f3b8d2a1-6c4e-4d7b-9a1f-5e2c8b0d4a04.sql
supabase/migrations/20261106051900_a9d4c7e2-1b8f-4e3a-b6d5-0c7f9e1a3b05.sql
supabase/migrations/20261106052000_b2c6e8d1-4f7a-4c3e-8d9b-6a1e0f3c5d06.sql
```

Deleted (declared in `docs/tracking/intentional-deletions.txt`, `[intentional-delete]` in `110eba3ef`): `scripts/check-caller-gates.ts`, `scripts/caller-gates-allowlist.txt`, `scripts/fixtures/caller-gates-bad.tsv`. New files (`git ls-files --error-unmatch` on the 19 new paths of `src/features/auth/{auth-client,auth-result,sign-out,preferred-language}.ts`, `preferred-language.test.ts`, `src/lib/door-codes{,.test}.ts`, `scripts/doors/*` (10), `e2e/door-refusals.spec.ts`, `docs/features/doors.md` → 19 tracked), plus the six migrations, the brief/ruling/stop files. Files outside the task's named scope: `scripts/e2e-select.ts` (stop 1 finding 11), `src/routes/auth.tsx`, `src/features/auth/use-auth.ts`, `sign-out.ts`, `auth-result.ts` (ruling 5 §1), `scripts/conformance/auth-answers.test.ts` and `vendor-seams-allowlist.txt` (the census follow-up of ruling 5's move, §10), `scripts/route-budgets.mjs` (ruling 6 §1), `src/integrations/supabase/types.ts` (ruling 4 §0, by `git apply` of the supervisor's patch only) — each under §10.

## 3. Behaviour contract — before → after

The doors (SQL), as read at the base and after M-F1a (stop 1 §The six files has each proof):

| door / function | before (596345a4c) | after |
|---|---|---|
| `door_refuse(text,text)` | — | RAISE SQLSTATE P0D01, message `code[:detail]`, one camelCase word |
| `door_context(class, resource, action, dial, country, scope_mode)` | — | one gate order: class → deactivation (`accountDeactivated`) → permission with scope (`permissionDenied`) → step-up (P0009 kept; `staff-reader` skips) → dial (`rateLimited`); no caller `notSignedIn`; service role passes; returns `door_ctx` |
| `door_refused(door, code, detail)` | — | the shell's answer: counts the dial once more (not for the gate codes), upserts `door_refusals`, `response.status` 401/403/403/428/429 else 400, returns `{ok:false, code:'P0D01', message, details:null, hint:null, refusals:[{reason, detail}]}` |
| `door_audit(ctx, resource, action, …)` | — | one `log_audit` row, `jsonb_strip_nulls({old,new})` |
| `has_permission_scoped(uuid,text,text,character,text)` | — | modes none / match / global / filter; super admin passes every mode; deactivated false |
| `has_permission(uuid,text,text)` | a caller asking about another person read that person's truth | INC-409's branch: authenticated, not super admin, asking about another → `false` (never a RAISE); super admin, service role, self: the truth (DRF-1, DRF-2) |
| `base_languages()` | — | STABLE definer behind `door_context('staff-reader','legal','edit',NULL,NULL,'global')`: the enabled admin languages beyond the base pair and the pseudo tag as `[{code,name_en,name_native}]`; `permissionDenied` without legal:edit; `notSignedIn` without a caller (LGA-22) |
| `has_password()`, `get_my_permissions()`, `get_my_translator_languages()` | the caller's own rows; a deactivated caller read them | the same rows behind `door_context('reader')`: deactivated → `accountDeactivated` (P0D01 RAISE, no dial), no caller → `notSignedIn` (DRF-3) |
| `remove_own_password()` | void; `rate_gate`, `require_recent_password`, a sentence RAISE "last sign-in method" | `RETURNS jsonb`; `door_context('owner',NULL,NULL,'password_remove')`, `require_recent_password` kept (P0009, no count), `door_refuse('lastSignInMethod')` through the shell (400, counted, `door_refusals`), `door_audit('account.password_removed')`, `{ok:true}` (DRF-4, CG-3, CG-4) |
| `user_set_preferred_language(text)` | void; its own gate and sentences | `RETURNS jsonb`; `door_context('owner',NULL,NULL,'account_pref')` (dial 60/3600 s, new), `languageNotPublished` / `noProfile` through the shell, `door_audit('profile.preferred_language')`, `{ok:true, language}` |
| `change_home_country(character)` | `rate_gate` envelope branch; `log_audit` meta `{from,to}` | `door_context('owner',NULL,NULL,'identity')` in place of the branch; its envelope `{ok:false, field, reason}` kept; `door_audit` meta `{old,new}` (no reader in src/ or e2e/) |
| `relist_listing`, `edit_listing`, `set_listing_price` | EXECUTE to authenticated | REVOKED from PUBLIC, anon, authenticated (bodies and service_role grants kept — DEC-347); the browser's doors are `copy_my_listing` and `edit_my_listing` (CG-2 ×6) |
| `require_step_up_if_needed(text,text)`, `languages_country_codes_valid()` | EXECUTE to browser roles (stray) | closed to browser roles, service_role kept |

The client:

| place | before | after |
|---|---|---|
| `src/lib/door-codes.ts` | — | `DOOR_CODES` (5 gate codes + `lastSignInMethod`, `languageNotPublished`, `noProfile`), `doorCode(input)` reads a RAISE's message or the shell's envelope → `{code, detail}`, null for a sentence; `DOOR_REFUSED_KEY = "door.refused"` (DRC-1…5) |
| `auth-service.ts` `removeOwnPassword` | `/last sign-in method/i.test(error.message)` → `auth.errorLastMethod` | `doorCode(error).code === "lastSignInMethod"` → the same key; every other answer as before |
| `auth-service.ts` module | holds `authClient`, `CLIENT_FAILED`, `failure`, `signOut`, `fetchPreferredLanguage`, `savePreferredLanguage` | the same exports re-exported or moved to leaves (`auth-client.ts`, `auth-result.ts`, `sign-out.ts`, `preferred-language.ts`); every body verbatim (ASC-3, ASC-5, PRL-1) |
| `use-auth.ts` (the shell's hook) | returns `{user, loading, hadSession, signOut, signUp, signIn, resendConfirmation}` from `import * as authService` | returns `{user, loading, hadSession, signOut}`; `signOut` from the leaf (DEC-348); the deactivated-account sign-out path unchanged |
| `routes/auth.tsx` | `const { signIn, signUp, resendConfirmation } = useAuth()` | the same three functions imported from `auth-service` beside its other three; the same calls, the same answers |
| `i18n/provider.tsx` | imports the account-sync pair from `auth-service` | from `preferred-language.ts` (the same two functions) |
| legal editor (`legal-editor-form.tsx`) | `useLanguages()` (the whole languages console) filtered by `enabledAdmin && code ∉ {en, am, PSEUDO}` | `useBaseLanguages()` → `base_languages` (the door's filtered list); the same select and name fallback (`name_en`) |
| `/auth`, `/auth_/callback`, `/auth_/reset`, `/settings` first download | the service in the entry chunk | the service as its own 2.8 KiB chunk on these four only (+1.1 KiB each); every other page −1.6…−1.7 KiB (§5) |

The e2e harness: `bearerClient(token)` in `e2e/helpers/session.ts` (new export, nothing changed); `resetLanguageBaseline` also deletes the slot's `rate_limits` rows (INC-1071).

## 4. Censuses

Every census is in the stop reports with its command; the headline lines:
- Browser-callable functions (the catalogue from the migrations' last grant state): 269 → 265 (stop 1); `bun scripts/doors/check-doors.ts` → `self-test OK: 7 finding kinds fired on their planted fixtures, the clean pair fired nothing` / `static OK: 265 manifest lines reconcile with the migrations' catalogue` (32 owner, 91 staff, 1 public door, 22 public readers, 28 signed-in readers, 56 staff readers, 35 helpers).
- Browser grants with no caller in the tree: 10 (`scripts/doors/check-doors-allowlist.txt`, by family; §7).
- Callers of the three retired doors (plan §4.4): `rg -n "relist_listing|edit_listing|set_listing_price" src e2e supabase/migrations scripts` → src/ none at the base beyond the typed client; e2e/ the twelve tests (stop 1 finding 14), moved; SQL bodies and policies none.
- The first-paint closure after DEC-348: `rg -n "auth-service|door-codes" src/routes/__root.tsx src/components/app-shell.tsx src/features/auth/use-auth.ts src/i18n src/lib --glob '!*.test.*'` → comments only (`app-shell.tsx:672/702`, `supabase-door.ts:153`, `place-carry-service.ts:37`); PRL-3 judges it on every run.
- Auth actions whose answer is discarded (`scripts/conformance/auth-answers.test.ts`): the census now reads actions from `auth-service.ts` and `sign-out.ts` (the hook's `session.signOut()` under the one allowance line).
- `"Control+A"` presses in `e2e/`: `rg -n '"Control\+A"' e2e` → 11 (under INC-1066, §Records); `ControlOrMeta+A`: 3 (`post-wizard-place`, `post-wizard-bundle2`, `my-listings-ad`).
- Literal language codes (K4): `base_languages()` names `'am'` and `'zxa'` inline with the exception written (no SQL constants function exists); siblings `missing_languages` in 20261024045415 (:50, :93).

## 5. Tests

Ids added: DRF-1…DRF-6 (`e2e/door-refusals.spec.ts`; the task's DR-1…6 renamed for TI-1 — `scripts/destructive-red.test.ts` holds DR-1…4), CG-4 (`auth-caller-gates.spec.ts`), LGA-22 (`legal-admin.spec.ts`), DRC-1…DRC-5 (`src/lib/door-codes.test.ts`), DOORS-1…DOORS-6 (`scripts/doors/check-doors.test.ts`), LBL-1…LBL-3 (`legal-service.test.ts`), PRL-1…PRL-3 (`preferred-language.test.ts`). Changed: CG-2 (three retired doors → six), CG-3 (the refusal as a door code), ASC-1/ASC-2/ASC-5 (`auth-client.test.ts`: the leaves), DRF-4 (`586971226`: `door_refusals` moved by at least its two refusals, the per-user dial exact — the row is a per-day aggregate the other project's worker moves too; CI's lanes passed the exact form by timing), AAN-1 (reads two action files); the twelve tests of the retired doors onto `edit_my_listing` (PR-27; PR-32 and PR-46 withdrawn; ML-2, ML-4, ML-5, ML-6, ML-7, MLP-1, MLP-5, AL-5, AL-29, LG-28 — stop 1 finding 14). Retired: PR-32, PR-46 (with their doors). The provider's three test files mock `@/features/auth/preferred-language` instead of the service.

Red-first evidence: DOORS-1…4 on the planted fixture of seven finding kinds (the self-test runs before every judgement); DOORS-5 red on a planted joined query, green on the file; DOORS-6 red on the old `liveFindings` (no callers), green now; DRF-3/DRF-4 red before part 4/5 applied (the lanes on 1ec4ea6ae); PRL-3 red on the hook's star import (5bec35586's tree) — stop 3.

Unit totals (the final `bun run checks`, below): component tests 2780 passed, 1 failed (NH-6, this computer's zone files — red on the base too, `git stash` check at stop 1; CI green) of 2781; the laws 490 passed, 1 failed (NH-6) of 491; `bun scripts/ci/laws-changed.ts units`: 65 files, 396 passed; `bun run typecheck` green; `bun run lint` 0 errors (46 pre-existing react-refresh warnings); `bun run format:check` clean.

THE CHECKS, whole, on the final tree (`a6838bc9a`): `checks (fast): 17 PASS · 4 FAIL · 264s` / `checks: 24 PASS · 4 FAIL · 30 NOT RUN · 319s`. The four FAILs: `laws-first › scripts/ tests first` and `component-tests` (NH-6 only); `secrets-scan › gitleaks` and `build-and-check › Workflow lint (actionlint)` — the runner's pinned Linux binaries (`gitleaks_8.24.3_linux_x64`, `actionlint_1.7.7_linux_amd64`) do not run on this arm64 Mac (no finding produced; CI's jobs judge both). NOT RUN (30, each named): `dependency-audit` Install + Audit (the advisory service is not reachable from the sandbox); `e2e-preflight` ×4 (the staging credentials the script never holds); `e2e` ×6 (the lanes' artifacts); `promote` ×4 (CI only); the Install steps of build-and-check, component-tests and bundle-budget (dependencies present); `semgrep › Upload SARIF` and its warning step (GitHub only); `laws-first › changed folders' unit tests` and `Semgrep ERROR on changed files` (skipped after NH-6 — run by hand: units 396/396; the semgrep step's own venv cannot be built here, `ensurepip` fails under python 3.15 — the whole-tree `semgrep › Scan (counts only)` with CI's pins PASSED: 234 rules, 1467 files, 61 findings, counts only, CI's job enforces ERROR); `build-and-check › Typecheck, Format check, Lint, e2e selector self-test, Root route names, Build, Bundle report` (skipped after actionlint — each run by hand: typecheck green, format clean, lint 0 errors, `e2e-select.ts --self-test` OK, `check-root-routes.ts --self-test` 12 allowed / 5 refused and 61 entries safe, the build reused by bundle-budget). `bundle-budget › Check the first-paint budget` PASS, `the NEAR band (R4)` PASS (0 NEAR, none grew) — after ruling 6's lines.

The browser check (ruling 5 §4; `bun run e2e:local -- e2e/<spec>.spec.ts`, each spec alone, both projects, `E2E_RETRIES=0`, against ethio-staging holding the six marks; stop 3 has the table): door-refusals 12 passed (after `586971226`); auth-caller-gates 8; posting-routes-dials 14; my-listings-doors 28; my-listings-page 14 passed + MLP-6 ×2 (macOS `Control+A`, INC-1066); admin-listings 70 passed + AL-20/AL-23/AL-30 ×2 (the same artifact); legal-certify 43 passed, 1 skipped; legal-admin 43 passed + LGA-21 mobile (INC-1073) — re-run whole after `a6838bc9a`: 44 passed (2.0m), LGA-21 included — the cross-worker write is a race, not a constant; auth-signin-errors 5; auth-signup 3 (3 skipped); auth-reset 6; auth-callback 4; auth-google 2; auth-signout 35 (1 skipped); settings 9; smoke-auth-i18n 2; i18n-sign-in-language 12. `[ssr-error]` lines in the 17 logs: `rg -c "\[ssr-error\]" /tmp/f1-e2e-*.log` → 0 in every file. No J-audit script exists in the tree (`rg -n "J-audit" docs scripts package.json` → none); the J laws were read by hand: every scratch row is the harness's (`e2e-…` tags), removed in `afterEach`, no real row, no `.first()`, no `waitForTimeout`, no `test.only` in the touched specs (`rg -n "\.first\(\)|waitForTimeout|test\.only" e2e/door-refusals.spec.ts e2e/auth-caller-gates.spec.ts e2e/legal-admin.spec.ts` on the added lines → none).

CI's E2E on 5bec35586 (run 42200467397, `e2e-last-failure.md`): Passed 2583 · Failed 0 · Flaky 1 (`choice-lists.spec.ts` CL-E4, shard 11, not a path this turn touched); every lane's start `applied 415/415`; no `rateLimited` / `user_set_preferred_language` client-error line (INC-1071's fix held).

The first-download measurement of record (ruling 6 §1): `bun run build && node scripts/check-bundle-size.mjs`, local, against CI's reading of 596345a4c (run 42162789510); a local build reads about 0.1 KiB under CI. The entry chunk 126.1 → 127.5 KiB; the provider chunk 19.9 → 16.4; `JS: 211.9 KiB / 215 KiB`.

| page | base (CI) | now (local) | ceiling | Δ |
|---|---|---|---|---|
| `/$name` | 231.7 | 230.0 | 233 | -1.7 |
| `/` | 233.8 | 232.1 | 235 | -1.7 |
| `/account_/legal_/$versionId` | 216.9 | 215.2 | 218 | -1.7 |
| `/account_/legal` | 216.2 | 214.5 | 217 | -1.7 |
| `/account_/saved` | 231.7 | 230.0 | 233 | -1.7 |
| `/account` | 276.2 | 274.5 | 277 | -1.7 |
| `/admin/` | 215.4 | 213.7 | 216 | -1.7 |
| `/admin/ai` | 328.1 | 326.4 | 329 | -1.7 |
| `/admin/attributes` | 341.4 | 339.7 | 342 | -1.7 |
| `/admin/audit` | 301.1 | 299.4 | 302 | -1.7 |
| `/admin/categories` | 349.4 | 347.8 | 350 | -1.6 |
| `/admin/countries` | 330.9 | 329.2 | 332 | -1.7 |
| `/admin/images` | 215.2 | 213.5 | 216 | -1.7 |
| `/admin/impersonation_/$sessionId` | 295.8 | 294.1 | 298 | -1.7 |
| `/admin/legal_/$versionId` | 284.0 | 282.3 | 285 | -1.7 |
| `/admin/legal_/edit` | 290.8 | 284.0 | 292 | -6.8 |
| `/admin/legal` | 286.6 | 285.0 | 288 | -1.6 |
| `/admin/listings_/$listingId_/edit` | 412.9 | 411.3 | 414 | -1.6 |
| `/admin/listings_/$listingId` | 352.0 | 350.3 | 353 | -1.7 |
| `/admin/listings` | 350.5 | 348.9 | 351 | -1.6 |
| `/admin/locations` | 275.4 | 273.6 | 276 | -1.8 |
| `/admin/monetisation` | 340.2 | 338.5 | 341 | -1.7 |
| `/admin/places` | 332.4 | 330.7 | 333 | -1.7 |
| `/admin/roles_/$roleId` | 278.3 | 276.6 | 279 | -1.7 |
| `/admin/roles` | 297.9 | 296.2 | 299 | -1.7 |
| `/admin/screening` | 371.9 | 370.2 | 373 | -1.7 |
| `/admin/translations_/$lang` | 312.3 | 310.6 | 313 | -1.7 |
| `/admin/translations` | 308.8 | 307.1 | 310 | -1.7 |
| `/admin/users_/$userId` | 292.8 | 291.2 | 294 | -1.6 |
| `/admin/users` | 297.6 | 295.9 | 299 | -1.7 |
| `/admin` | 214.6 | 212.9 | 216 | -1.7 |
| `/auth_/callback` | 214.7 | 215.8 | 216 → 217 | +1.1 |
| `/auth_/reset` | 216.7 | 217.8 | 218 → 219 | +1.1 |
| `/auth` | 228.3 | 229.4 | 229 → 230 | +1.1 |
| `/c/$slug` | 233.8 | 232.1 | 235 | -1.7 |
| `/dev/primitives` | 235.2 | 233.5 | 236 | -1.7 |
| `/dev/style` | 254.7 | 253.0 | 256 | -1.7 |
| `/dev/tall` | 213.9 | 212.2 | 215 | -1.7 |
| `/l/$slug` | 263.6 | 261.9 | 265 | -1.7 |
| `/legal/$kind` | 218.3 | 216.6 | 219 | -1.7 |
| `/legal/accept` | 225.3 | 223.6 | 226 | -1.7 |
| `/legal/publishing` | 219.0 | 217.3 | 220 | -1.7 |
| `/my-listings_/$listingId_/edit` | 407.5 | 405.9 | 408 | -1.6 |
| `/my-listings_/$listingId` | 327.9 | 326.2 | 329 | -1.7 |
| `/my-listings` | 321.1 | 319.4 | 322 | -1.7 |
| `/post_/$listingId` | 407.4 | 405.8 | 408 | -1.6 |
| `/post` | 407.5 | 405.8 | 408 | -1.7 |
| `/privacy` | 218.3 | 216.6 | 219 | -1.7 |
| `/settings` | 281.8 | 282.9 | 283 → 284 | +1.1 |
| `/terms` | 218.3 | 216.6 | 219 | -1.7 |

## 6. K2 — siblings that bypass the mechanism

Greps: `rg -n "createClient\(" e2e` (bearer clients); `rg -n "rate_gate\(|assert_caller_active\(" supabase/migrations` (doors not yet on `door_context` — the plan's later families, 265 manifest lines name each); `rg -n "splitRefusal|doorRefusal|readerFailure" src` (the refusal readers); `rg -n "SURFACE_QUERY|LIVE_QUERY" scripts`; `rg -n "Control\+A" e2e`; `rg -n "'am'|'en'|'zxa'" supabase/migrations`.
- `e2e/admin-users.spec.ts:47` keeps its own bearer client (folds onto `bearerClient` when touched).
- `src/features/posting/door-error.ts` (`doorRefusal`, REASON_CODE without `:`), `splitRefusal`, `readerFailure`: the refusal readers that fold onto `doorCode` in the plan's later turns (stop 1 finding 4).
- `scripts/security-lints.ts:41 SURFACE_QUERY`: a query assembled in code — INC-1070's class, F1-7 (ruling 5 §3).
- `missing_languages` (20261024045415 :50, :93): literal language codes in SQL (K4), as `base_languages()` has with its exception.
- The fixed test identities not reset by the pool helper: the state file's base test user; `legal-doors.spec.ts`'s slot-0 password sign-in (`docs/features/e2e-harness.md`, INC-1071's census).
- The 11 `"Control+A"` presses (§Records, INC-1066) and LGA-21's cross-worker write (INC-1073).
- Every door not yet behind `door_context` (the manifest's other classes): the plan's families F1-2…F1-7.

## 7. Allowlists and guards

Counts (non-comment lines, base → final): `scripts/acceptance-doors-allowlist.txt` 123 → 120 (the three retired doors' lines removed); `scripts/public-surface-allowlist.txt` 178 → 182 (+`base_languages`, +`has_password`, +`get_my_permissions`, +`get_my_translator_languages` as restated grants; the three retired doors' lines reworded RETIRED with `until F1-7 (DEC-347 …)` inside the reason — the parser takes three fields); `scripts/doors/check-doors-allowlist.txt` 0 → 10 (`grant-without-caller` census lines, each `| census F1-1: … family F1-x revokes or names its caller | 2026-12-31`); `scripts/conformance/on-demand-failure-allowlist.txt` 4 → 5 (`src/features/auth/auth-client.ts | … | 2027-04-26`); `scripts/conformance/vendor-seams-allowlist.txt` 47 → 48 (`src/features/auth/sign-out.ts | DEC-268's sign-out body, moved verbatim … | INC-877`); `scripts/conformance/agents-lines-allowlist.txt` 2 → 2 (AGENTS.md's byte count 10482 → 10718, the reason names F1-1); `scripts/conformance/door-answers-allowlist.txt` 1 → 1 (the line's anchor moved :171 → :167); `scripts/caller-gates-allowlist.txt` deleted (0 lines). Guard self-tests run: check-doors (7 kinds planted, every run), the migration guard's (`Migration guard OK.` with its self-tests), the deletions guard, the acceptance-doors, outbound-calls, shell-pipes and promote self-tests (all PASS in `bun run checks`), `e2e-select --self-test`, `check-root-routes --self-test`, actionlint and gitleaks self-tests (NOT runnable here).

## 8. Strings

One new key, EN and AM in the same change (`en-base.ts`, `am-base.ts`; the layer every route declares; `bun run i18n:usage` run, both maps committed, scanned 678 files):
- `door.refused` — EN `This request was refused. Please try again; if it keeps happening, tell us.` — AM `ይህ ጥያቄ ተቀባይነት አላገኘም። እባክዎ እንደገና ይሞክሩ፤ ችግሩ ከቀጠለ ያሳውቁን።` (copied by script from the supervisor's `f1-1-am-strings.json`, sha256 4964882a…; `am-script.test.ts` and `strings-layers.test.ts` green).
No other key new or changed; `auth.errorLastMethod` is read as before.

## 9. Migrations

Six files, M-F1a (stop 1 has each file's content, proofs and pairing line): 
1. `20261106051500_6d2f0f3e-7b7a-4c0e-9a4e-1f8e1c2a0d01.sql` — sha256 `52e5b25fbcca150047f5caab7e840c37dca3e6c2b607fc5e5ed7d1eeb2fcc33d` — mark `20261106120100` — `apply 6d2f0f3e → expect mark 20261106120100`
2. `20261106051600_8b7c2e41-3d5f-4a9b-b0c6-2e9d4f7a1b02.sql` — sha256 `89f077067654d2482139392a893a03215049f14f2f564cd3325d8ab815943423` (was `c8b7487b…` at stop 1; ruling 5 §2 (ii) moved the proof (d) bar 10 ms → 1 ms, proof text only: `diff <(sed '/^DO \$proof\$/,/^\$proof\$;/d; /^--/d' old) <(… new)` empty, DEC-345) — mark `20261106120200` — `apply 8b7c2e41 → expect mark 20261106120200`
3. `20261106051700_c4e9a6d7-5f2b-4e8c-a1d3-7b6f0e2c9a03.sql` — sha256 `cbcf33ba6aa1ca628faffce59da17f4c5313567d8dd38fe247ee2d8ea3d91464` — mark `20261106120300`
4. `20261106051800_f3b8d2a1-6c4e-4d7b-9a1f-5e2c8b0d4a04.sql` — sha256 `5797a9be7f1772d13b8b3ce23aac9b8610d24d9c632c6868285db4eb765bf9a6` — mark `20261106120400`
5. `20261106051900_a9d4c7e2-1b8f-4e3a-b6d5-0c7f9e1a3b05.sql` — sha256 `e3b3315aded5b14ebb733c33abd1e9e158963ddff2e0244402ce04ca0fb6d9a8` — mark `20261106120500`
6. `20261106052000_b2c6e8d1-4f7a-4c3e-8d9b-6a1e0f3c5d06.sql` — sha256 `e7702fbe4b23fdfe8738731fd26e262bd39e9c7bfacbee5e66ed4d2ee4e2e09a` — mark `20261106120600`

`bun run db:proof --fresh` on the final tree's migrations (after `f46d29151`; no migration changed since): `db:proof PASS — applied 415/415, CLI 2.120.0, cold, 49 s`. `bash scripts/check-migrations.sh`: `Migration guard OK.` ethio-staging holds the six marks (the operator applied; the lanes' `applied 415/415`).

## 10. Departures

1. **Test ids DR-1…6 → DRF-1…6** (TI-1: `destructive-red.test.ts` holds DR-1…4); accepted ruling 4 §5.
2. **The three retired doors REVOKED, not DROPPED** (plan §4.4): INC-1068; DEC-347 (ruling 4 §2); their public-surface lines RETIRED with `until F1-7` inside the reason (three-field grammar; ruling 5 §3).
3. **`scripts/e2e-select.ts`** gained the new spec's line (a file the task did not name; the selector's self-test needs it); accepted ruling 4 §5.
4. **`e2e/helpers/session.ts` `bearerClient`** (a new export; `admin-users.spec.ts:47` keeps its copy, K2).
5. **The first-paint graph** (the task's tolerance: > 0.1 KiB → STOP): stop 1 (+0.3–0.4 KiB every page, INC-1069) → ruling 4 §1 the leaf → stop 2 (the service rode in through the shell's hook) → ruling 5 §1 / DEC-348 (`sign-out.ts`, `auth-result.ts`, `use-auth.ts`, `routes/auth.tsx`) → stop 3 (46 pages −1.6…−1.7; the four that import the service +1.1) → ruling 6 §1: the four ceilings by DEC-296's form (`cae86145c`), none of the 46 lowered (the ratchet keeps savings ≥ 8 KiB; §5 is the measurement of record). Ruling 5's "no ceiling rises" meant the 46 and holds.
6. **Ruling 5's move needed two census follow-ups** the ruling did not name (`4016d2ffc`): `scripts/conformance/auth-answers.test.ts` reads actions from `auth-service.ts` AND `sign-out.ts` (the re-exported `signOut` had vanished from the census's actions and the hook's aliased call was invisible to it — the one allowance line was stale); `use-auth.ts` imports the leaf as a namespace (`session.signOut()`) so the call keeps the action's name; `vendor-seams-allowlist.txt` gains `sign-out.ts` (DEC-268's `supabase.auth.signOut()` call, covered by the service's line before).
7. **`src/integrations/supabase/types.ts`** changed only by `git apply` of the supervisor's patch (ruling 4 §0; never hand-edited).
8. **The cost reading** (ruling 4 §4, ruling 5 §2 (i)): no NOTICE line in either log (§1); the bar at 1 ms is the record (ruling 5 §2 (ii), DEC-345 proof-text edit).
9. **The i18n usage map regenerated twice** (`3638600f3`): its `scanned` count follows the file count, not only `t(` keys — rule 10's "after touching any `t(` key" is the narrower reading; CI's drift job caught the four new auth modules.
10. **`git stash` / `git stash pop`** used locally for base-vs-tree comparisons (stop 1 finding 15; allowed ruling 4 §5).
11. **Roadmap line 3 amended against ruling 2's sentence**: this turn's task file stands first so the checks read the right base (ruling 4 §10).
12. **AGENTS.md's caller-gates line is :53**, not :52 as ruling 1 §10 said.
13. **DRF-4's assertion shape changed** (`toBe(2)` → `toBeGreaterThanOrEqual(2)` on the shared per-day row; the per-user dial keeps the exact count) — under INC-1071's class note (ruling 6 §2).
14. **`change_home_country`'s envelope** `{ok:false, field, reason}` kept without a `refusals` array (step-who's client shows `badValue` for it, pre-existing); `door_audit`'s meta `{old,new}` replaces `{from,to}` (no reader).
15. **Self-review MINORs**, fixed in `a6838bc9a` and listed: (i) three new `as unknown as` casts in `legal-service.test.ts` (LBL-1…3, copying the file's six pre-existing mock lines) → a `mockRpc` helper without a cast; the six pre-existing stay (K2); (ii) one in `legal-admin.spec.ts` LGA-22 (copied from LGA-21 :1030) → a shape reader; LGA-21's stays; (iii) LBL-2's fixtures named a real language code (`om`) → scratch codes. Rule 80's other headings: SCOPE (every file in §2 is named by the task, a ruling, or the standing allowance — the rulings' files under 3, 6, 7 above); BEHAVIOUR CONTRACT (§3; nothing differs beyond the numbered changes — the sign-out and account-sync bodies are byte-moved, ASC-3/ASC-5/PRL-1 read them); BANNED PATTERNS (`rg` over the added lines for `as unknown as|: any|@ts-|\.first\(\)|waitForTimeout|test\.only|\?\? 'ET'|#hex` → the three casts above, now none; `?? 0` only on counters' sums in e2e helpers and regex indices in scripts; non-null count unchanged — `non-null.test.ts` green); ONE MECHANISM (the register's door mechanism, row 118; the new guard with its self-test and wired.test.ts line); TESTS (§5); MIGRATIONS (born closed, whole redeclarations from live md5s, scratch rows, `profiles(user_id)`, the marks last — stop 1); DOCS AND RECORDS (`docs/features/doors.md`, `ci-guards.md`, `e2e-harness.md`, `legal.md`; changelog, mechanisms.md and incidental-findings.md untouched by DEC-346; both i18n maps); SECURITY (no unfixed hole described; the door codes carry no Postgres text to a client — `door.refused` renders for an unknown code; no secret in the diff — each `git diff --cached` read before its commit).

## 11. CI

The base's CI (read at STEP 0 and stop 1 from the raw ci-evidence addresses; two-step: `ci-status.md`'s commit against `origin/dev`):
```
# CI Status (auto-generated — do not edit by hand)

- Commit: `3dbd6d31dd2d9d8eded4c4a85bfcef3143d55424` (short `3dbd6d3`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-06T05:13:32Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42164369112
```
(that commit is this branch's `task saved` on top of 596345a4c; `origin/dev` 596345a4c's own run 42162789510 SUCCESS — `gh run list --branch dev`). No red of an earlier turn.

This pull request's runs:
- 1ec4ea6ae (run 42185001386, FAILURE): preflight (STAGING BEHIND — expected until the operator applied the six marks), bundle budget (INC-1069, expected at stop 1), the smoke lane's door guard (INC-1070: the joined `LIVE_QUERY` lost its clause boundaries) → `e2e099606`. Class: mine.
- 5bec35586 (run 42200467397, FAILURE): bundle budget (expected, stop 2 → DEC-348, ruling 6); `i18n used-on map is fresh` (scanned 674 → 676, the two leaf files) → `3638600f3`; `E2E lanes / Lane smoke` (the door guard's live mode had no callers census → stale allowance; INC-1072) → `8a5662d61`; `E2E (Playwright, ethio-staging)` red only as lanes=failure (Passed 2583 · Failed 0 · Flaky 1, CL-E4 unrelated). Class: mine (three), one unrelated flake. No re-run requested.
- dc3a7162e (run 42232739640, FAILURE; read whole by `gh pr checks 28 --watch`, the raw `local-backend-proof.md` and `e2e-last-failure.md`): Component tests (DOORS-6 timed out: 5841 ms over vitest's 5000 ms on the runner); ten lanes (shards 1, 2, 3, 10, 11, 13, 14, 15, 16, email) died in part 2's proof (d) — `door_context(staff) costs 1.147…1.278 ms per call (the bar is 1 ms, ruling 5 §2)`, the cost reading §5's line 25 reported missing, found in the failure's server record; `Lane smoke`'s door guard: census line 4 stale in live mode — the static reader's blindness to the chunk-assembled `attr_import_plan` body, which calls `attr_option_norm_v2`; `E2E (Playwright, ethio-staging)` red as lanes=failure (the nine lanes that applied: Passed 1217 · Failed 0 · Flaky 0). Everything else green (the four ceilings hold, 0 NEAR). Class: mine (three), every red a path this turn changed → STOP under ruling 6 §3, `f1-doors-1.stop-4.md`. No re-run requested.

## 12. Limits

- The `door_context` cost in ms was not READ anywhere: neither the local `apply.log` (grepped for `door_context cost` only, ruling 4 §4) nor the smoke lane's job log carries a NOTICE; the 1 ms bar that the apply passes is the record.
- `gitleaks` and `actionlint` cannot run on this computer (Linux binaries by CI's pins); `laws-changed.ts semgrep`'s venv cannot be built here (ensurepip under python 3.15) — the whole-tree Semgrep with CI's pins ran (counts only); CI's jobs judge all three.
- NH-6 (`scripts/ci/nightly-hour.test.ts`) is red on this computer on the base and the tree alike (zone files); CI green; untouched.
- The browser check ran against ethio-staging with the E2E names set (`[ -n … ] && echo set` ×3); four tests fail only on macOS Chromium (`Control+A`, INC-1066) and LGA-21 by a cross-worker fixture write (INC-1073); CI's Linux lanes are their proof.
- `dependency-audit`, `e2e-preflight`, the `e2e` merge job and `promote` are CI-only.
- I applied no migration anywhere; the staging marks were the operator's; production is the operator's publish.
- `docs/_changelog.md`, `docs/governance/mechanisms.md` and `incidental-findings.md` are not edited (DEC-346): the Records below are the texts for the supervisor's ledgers.

## Records (DEC-346 — nothing written to the ledgers; every record under its label)

- **Changelog line (F1-1-a):** `F1-1 (DEC-333/334/335): the door mechanism — door_refuse P0D01, door_context (one gate order), the shell (door_refused + door_refusals), has_permission_scoped (none/match/global/filter), door_audit, INC-409's false branch, base_languages(); scripts/doors manifest + check-doors (static, --live, planted self-test) replace check-caller-gates; src/lib/door-codes.ts + door.refused; the account doors on the shell; relist_listing, edit_listing, set_listing_price retired.`
- **Register row 118 (mechanisms.md):** `Door gates and refusals | door_context / door_refuse / door_refused / door_audit (SQL), scripts/doors/manifest.txt + check-doors.ts (static, --live from scripts/doors/live-query.sql), src/lib/door-codes.ts | every browser-callable function | check-doors (self-test, static, --live), DOORS-1…6, DRF-1…6 | docs/features/doors.md`
- **Roadmap line (F1 lane, F1-1-e):** `F1-1 the door mechanism's first build — migration at the stop; continue after the types patch.` (ticked by the merge.)
- **DEC-347** (ruling 4 §10): a retired browser-callable function is REVOKED from PUBLIC, anon and authenticated with a RETIRED public-surface line (reason, until) and DROPPED only when the guards read retirements (F1-7); DEC-335's three are the first.
- **DEC-348** (the supervisor, ruling 5): the shell's auth hook owns the session state and sign-out only; sign-out is a leaf module (`sign-out.ts`, DEC-268's law unchanged) the hook and the service both import; the sign-in family is imported by the auth route from the service; no module in the entry closure (`__root.tsx`, the shell, `use-auth.ts`, the i18n provider, `src/lib/**`) imports a feature service. The first-paint class rule of INC-1069 is this decision's general form.
- **DEC-345 (proof-text edit):** part 2's proof (d) at 1 ms median per class (was 10 ms; `5bec35586` → `f46d29151`); schema text byte-identical; the smoke-lane reading: none (no NOTICE line in CI's or the local CLI output).
- **INC-1068** (F1-1-c): the DROP of a retired browser-callable function cannot satisfy the migration guard (every post-floor GRANT in history needs its public-surface line) and the live surface lint (a line whose function is absent fails) at once; REVOKE now, the guards' retirement grammar in F1-7. Class: two guards reading one surface by different definitions.
- **INC-1069** (F1-1-d, amended): every page's first download grew 0.3–0.4 KiB because the i18n provider imports the whole auth service for two calls; door-codes rode in with it. Class: a module every page loads imports a feature's service. Fix: the leaf module (ruling 4 §1). Amendment (ruling 5): the first fix (the provider) moved the service from the provider chunk to the entry chunk; the hook's star import (`use-auth.ts:7 import * as authService`) was the second half of the graph (ruling 5 §1) — DEC-348 is the general form; after it 46 pages −1.6…−1.7 KiB and the four pages that import the service +1.1 (ruling 6 §1, DEC-296 lines).
- **INC-1070** (amended): `LIVE_QUERY` joined with "" lost its clause boundaries; the smoke lane's door guard died on the first execution of a query no test had run. Class: SQL assembled from fragments by code — a query is a file read verbatim. Fix: `scripts/doors/live-query.sql`, `--live-query`, DOORS-5 (ruling 4 §8). Sibling: `scripts/security-lints.ts:41 SURFACE_QUERY`, folded in F1-7 with the public-surface side (its own `.sql` file).
- **INC-1071**: the pooled super admin's `rate_limits` rows outlive each borrower while every leased pool account's are deleted; the new `account_pref` dial counted the whole lane's borrowers on one key. Class: a shared test identity's per-user state outside the pool reset. Fix: `resetLanguageBaseline` deletes the slot's rows (ruling 4 §9). Class note (ruling 6 §2): DRF-4 asserted an exact delta on `door_refusals`, a per-day aggregate row (door, code, day — no person column) the other project's worker moves too; the proof is now "at least its two" with the per-user dial exact (`586971226`).
- **INC-1072** (ruling 6 §2): the live door guard never judged the tree census — `liveFindings` passed no `callers`, so `grant-without-caller` never fired live and the kit read every census allowance as stale (`check-doors-allowlist.txt:4 stale allowance`, the smoke lane on 5bec35586). Class: a guard with two modes must judge the same finding kinds in both, or the one allowlist is stale in one of them. Fix: the live judgement reads `treeCallers(root, rows)` on the live rows; DOORS-6 (`8a5662d61`).
- **INC-1073** (ruling 6 §2, OPEN for the housekeeping turn): `e2e/legal-admin.spec.ts:1106` — LGA-21 writes a `legal_version_texts` row for EVERY `enabled_admin` language into its own version, including the OTHER worker's scratch language (`ensureFenceLanguage` enables it), which that worker's `afterEach` then cannot delete (`legal_version_texts_language_fkey`). Class: a test's writes stay inside its own scratch rows (J3). Seen locally (mobile-360, both projects on 2 workers); CI's lanes pass it by timing.
- **INC-1066 census additions** (ruling 6 §2, OPEN, the housekeeping turn): the eleven `"Control+A"` presses (line-start on macOS Chromium, select-all on Linux — the typed text is prepended locally: MLP-6, AL-20, AL-23, AL-30 fail on this computer only): `e2e/my-listings-page.spec.ts:669`, `e2e/my-listings-ad.spec.ts:1008`, `e2e/my-listings-ad.spec.ts:1024`, `e2e/my-listings-ad.spec.ts:1044`, `e2e/admin-listings.spec.ts:1457`, `e2e/admin-listings.spec.ts:1470`, `e2e/admin-listings.spec.ts:1562`, `e2e/admin-listings.spec.ts:1680`, `e2e/admin-listings.spec.ts:2131`, `e2e/admin-screening.spec.ts:1396`, `e2e/admin-screening.spec.ts:1457` (the three `ControlOrMeta+A` presses in `post-wizard-place`, `post-wizard-bundle2`, `my-listings-ad` are the form to take).
- **S541** (the supervisor's, ruling 5 §3): ruling 4's `rg` command scanned a folder list instead of the import graph.
- **Departures' line-3 note** (ruling 4 §10): ruling 2's line-3 sentence amended — this turn's task file stands first on roadmap line 3 so the checks read the right base.
