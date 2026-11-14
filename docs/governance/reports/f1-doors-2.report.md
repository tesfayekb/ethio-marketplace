# Foundations 1, turn F1-2 — the doors of roles, users, impersonation and the audit log — report

Base: 13f204493 · Final commit: 7df9d8e46 · Brief: docs/governance/briefs/f1-doors-2.md (sha256 02225bda3b0587b44e72884c6cdefb91d3881ef6f21b7d626e0fddde8adebfcb)
Review: READY · 0 BLOCKER · 1 MAJOR · 2 MINOR · on 7df9d8e46

CI at the start of the turn: dev 13f204493, run 43567069040, **SUCCESS** (section 11). Pull request:
https://github.com/tesfayekb/ethio-marketplace/pull/43.

## 1. Done / not done, by part and step

| Step | What | Commit |
|---|---|---|
| STEP 0 | the brief saved, line 3 of `roadmap.md`, `check-go` | 72b8dbfa0 |
| STEP 1 | the census (`docs/governance/reports/f1-doors-2.census.md`) | d32be9ad4 |
| STEP 2 | the five migration files (the family's twenty functions on `door_context` and the shell) | 5e54ac8a6 |
| the migration stop | `docs/governance/reports/f1-doors-2.stop-1.md`, draft pull request #43 | 62e30aedc |
| ruling 1 | saved by scripted copy (sha256 checked), the supervisor's types patch applied, `startedSession` | bcca1f164 |
| part 6 (ruling 1) | `admin_update_profile` global; `end_impersonation` on `account_pref`; the lint `impersonation_reach` | 86074325e |
| STEP 3 | the client reads the codes through `readRefusal` | 3db3cffa7 |
| STEP 4 | the e2e assertions that read a folded sentence now read its code | fb1a6700b |
| the docs | the four feature guides and `security-scanning.md` | 09aef3ba3 |
| STEP 5 (the gate) | `DOOR_CODES` back to the base's list, the alias reason through `readRefusal` | 802da4ee8 |
| STEP 5 (the gate) | the staff ceilings, each with its named cause | 7df9d8e46 |
| STEP 6 | one push of 7df9d8e46, `gh pr ready 43`, CI watched | — |
| STEP 7 | this report | (its own commit) |

Not done: the by-id browser run of STEP 5. The brief makes it conditional ("when the E2E values are set and
ethio-staging holds this turn's marks"); the values are set, but ethio-staging does not hold part 6's mark
20261114100000 until the supervisor applies it (ruling 1: "The supervisor applies it on ethio-staging when the final
report arrives"). The temporary-backend lanes judge the turn (section 12).

## 2. Files changed

`git diff --name-only 13f204493` (40 files):

```
docs/features/admin-audit-security.md
docs/features/admin-roles.md
docs/features/admin-users.md
docs/features/doors.md
docs/features/security-scanning.md
docs/governance/briefs/f1-doors-2-ruling-1.md
docs/governance/briefs/f1-doors-2.md
docs/governance/reports/f1-doors-2.census.md
docs/governance/reports/f1-doors-2.stop-1.md
e2e/admin-audit.spec.ts
e2e/admin-roles.spec.ts
e2e/admin-users.spec.ts
e2e/mfa-stepup.spec.ts
roadmap.md
scripts/conformance/forms-allowlist.txt
scripts/doors/manifest.ts
scripts/doors/manifest.txt
scripts/public-surface-allowlist.txt
scripts/route-budgets.mjs
scripts/security-lints-baseline.json
scripts/security-lints.test.ts
scripts/security-lints.ts
src/features/admin/impersonation/impersonation-service.test.ts
src/features/admin/impersonation/impersonation-service.ts
src/features/admin/impersonation/impersonation-starter.tsx
src/features/admin/roles/permission-matrix.tsx
src/features/admin/roles/role-detail.tsx
src/features/admin/roles/roles-list.tsx
src/features/admin/roles/roles-service.test.ts
src/features/admin/roles/roles-service.ts
src/features/admin/users/admin-users-service.ts
src/features/admin/users/alias-reason.test.ts
src/features/admin/users/user-detail.tsx
src/integrations/supabase/types.ts
supabase/migrations/20261114070400_7102c888-3b97-4325-b985-2b978069b94e.sql
supabase/migrations/20261114070500_49f4b94e-d1ee-4c15-ba74-e341ec6dd872.sql
supabase/migrations/20261114070600_76ce28de-461b-4151-9abf-0a7d50636feb.sql
supabase/migrations/20261114070700_e30e4335-cc03-424b-9516-ab275a8801e1.sql
supabase/migrations/20261114070800_d66e79e1-b11c-44ab-9310-f43c84d86d67.sql
supabase/migrations/20261114070900_21a900de-2b3f-4734-9cc4-363614d826ee.sql
```

New files, each tracked (`git diff --name-only --diff-filter=A 13f204493 | xargs git ls-files --error-unmatch`
printed all eleven): the brief, ruling 1, the census, the stop report, `src/features/admin/roles/roles-service.test.ts`
and the six migration files. No file was deleted.

Scope: every path is in the brief's SCOPE or the standing allowance, with two notes.
- `scripts/route-budgets.mjs` is not in SCOPE's list. The brief's TOLERANCES move a staff page's ceiling "in the
  commit that causes it", so I read the file as named by them (section 10).
- `scripts/security-lints.ts`, `scripts/security-lints-baseline.json`, `scripts/security-lints.test.ts` and
  `docs/features/security-scanning.md` carry ruling 1's part 6 (the sixth lint and its baseline).

## 3. Behaviour contract — answer tables before → after

### The doors (database)

The ten doors keep their argument lists and defaults. Each now answers `jsonb` on the shell: `{ok:true, …}` on
success, and on a refusal `{ok:false, code:'P0D01', message:'<code>[:detail]'}` with the HTTP status set (401 / 403 /
428 / 429, else 400). Every check runs in `door_context`'s order: class → deactivation → permission in its scope mode →
step-up (P0009, "step-up required", unchanged) → dial.

| Door | Success before → after | Refusals before (sentences) → after (codes) | Dial before → after | Scope |
|---|---|---|---|---|
| `assign_role` | void → `{ok:true}` | 'not permitted to assign roles', 'role % is not assignable…', 'unknown role' → permissionDenied, roleReserved:<role>, unknownRole | none → staff_config | `arg:scope_country` (match) |
| `revoke_role` | void → `{ok:true}` | as above → permissionDenied, roleReserved:<role>, unknownRole | none → staff_config | global |
| `admin_create_role` | uuid → `{ok:true, id}` | 'permission denied', 'role name is required', 'role name must be…', 'role name already taken' → permissionDenied, nameRequired, badSlug, duplicateKey:name | none → staff_config | global |
| `admin_update_role` | void → `{ok:true}` | 'role not found', 'system roles are immutable' → unknownRole, systemRole | none → staff_config | global |
| `admin_delete_role` | void → `{ok:true}` | + 'role has members' → hasDependents | none → staff_config | global |
| `admin_set_role_permission` | void → `{ok:true}` | + 'unknown permission', 'permission is not assignable to custom roles', 'core permission locked' → unknownPermission, permissionReserved, corePermission | none → staff_config | global |
| `admin_set_account_status` | void → `{ok:true}` | 'unknown account status', 'a reason is required…', 'user not found' → badValue:status, required:reason, unknownUser | none → staff_moderation | global |
| `admin_update_profile` | void → `{ok:true}` | 'display name is required', 'unknown country', 'user not found', 'seller alias refused: shape', '…already taken', '…needs a reason: %' → nameRequired, unknownCountry, unknownUser, aliasShape, aliasTaken, aliasReserved:<rule> | none → staff_moderation (INC-1038) | match → **global** (part 6, DEC-380) |
| `begin_impersonation` | TABLE(session_id, expires_at) → `{ok:true, session_id, expires_at}` | 'super-admin only', 'cannot impersonate yourself', '…a super admin', 'user not found', 'a reason of at least 5…', 'already active' → permissionDenied (impersonation:use), impersonateSelf, impersonateSuperAdmin, unknownUser, badLength:reason, sessionActive | impersonation (after its own checks) → impersonation (in the gate) | global |
| `end_impersonation` | void → `{ok:true}` | 'account is deactivated', 'no active impersonation session' → accountDeactivated, noActiveSession | none → **account_pref** (part 6, DEC-380) | owner |

The readers keep their return shapes. Their 'permission denied' is now door_context's `permissionDenied`, raised as
the reader's error.
- `get_active_impersonation()` answers `notSignedIn` for no caller.
- `admin_list_users` narrows to the caller's countries (filter).
- `admin_list_roles` takes `profiles:view` alone (it also accepted `roles:view`; its one caller is the users screens).
- The other seven readers are global.

Part 6 adds a sixth element to `security_lints()`: `impersonation_reach` (ERROR). It counts the roles other than
`super_admin` that reach `impersonation:use` or `impersonation:manage` through `get_role_hierarchy`.

### The client

| Function / screen | Before | After |
|---|---|---|
| `createRole` (`roles-service.ts`) | `data as unknown as string` | `createdRoleId(data)` reads `{ok:true, id}`; no id throws "admin_create_role returned no role" |
| `roleErrorKey` → `roleRefusalKey(error, fallback)` | step-up abort, then eleven sentence regexes, else the fallback | `readRefusal` with `ROLE_REFUSALS`: cancelled step-up → null; no factor → `mfa.stepUpUnavailableHint`; the eight codes → the same eight keys; "step-up required" → `admin.roles.error.stepUp`; anything else → the fallback |
| `permission-matrix.tsx`, `roles-list.tsx`, `role-detail.tsx` | `roleErrorKey` | `roleRefusalKey`, same arguments |
| `needsAliasReason` → `asksAliasReason` (`admin-users-service.ts`) | `/needs a reason/` on the message | the editor's own read through `readRefusal(error, PROFILE_EDIT_REFUSALS)` names `admin.users.edit.errorAliasReason` (the code `aliasReserved`) |
| `profileEditErrorKey` → `profileEditRefusalKey` | step-up abort, then sentence regexes, else `admin.users.edit.failed` | `readRefusal` with `PROFILE_EDIT_REFUSALS`: the six codes → the same six keys; "step-up required" and the alias index's race (`profiles_seller_alias_unique`) by sentence; anything else → `admin.users.edit.failed` |
| `user-detail.tsx` | `needsAliasReason`, `profileEditErrorKey` | `asksAliasReason`, `profileEditRefusalKey` |
| `beginImpersonation` | `data[0].session_id` | `startedSession(data)` reads `{ok:true, session_id, expires_at}`; otherwise throws "begin_impersonation returned no session" (unchanged words) |
| `impersonation-starter.tsx` | `stepUpAbortKey`, else `impersonation.failed` | `readRefusal(failure, { generic: "impersonation.failed" })`: the same three answers (cancel silent, no factor the hint, everything else `impersonation.failed`). `DOOR_KEY` is read only when a `known` table is passed, and none is |
| The impersonation notice (ruling 1 item 6) | — | unchanged. A signed-out visitor makes no call (the notice's gate is off for them). For staff, a refused `get_active_impersonation` leaves the query's `data` undefined, and the banner draws nothing |

A refusal a screen has no words for reads as that screen's own generic line, as before; `rateLimited` included
(section 10).

## 4. Censuses

The census is `docs/governance/reports/f1-doors-2.census.md` (STEP 1), read from the tree at 13f204493. Its
consumers, definition, tests, lists, old-file readers, second readers and mechanisms stand. Built here: 10 doors, 1
signed-in reader and 9 staff readers (20 functions). Left: `impersonation_target`, `impersonated_get_profile` and
`impersonated_list_listings` to F1-7; `admin_user_legal_history` to F1-3.

Greps run in this part of the turn:
- `rg -n "doorCode|DOOR_CODES" src/features/admin` — after 802da4ee8, no file of this family reads `doorCode`.
- `rg -n "stepUpAbortKey\(" src -g '!*.test.*'` — this family has no caller left. The other callers are section 6's.
- `rg -n "impersonation_reach|five counts" scripts docs/features` — `security-lints.ts` and `security-scanning.md`
  now say six (part 6).
- `rg -c "as Record<string, unknown>" src` — the narrowing step the two new shape guards use: already in 80 files.
- e2e consumers of `beginImpersonation` (ruling 1 item 0): `e2e/i18n-sign-in-language.spec.ts` D239-E6 drives the
  starter. It needs no change: `startedSession` reads the new answer.

## 5. Tests

E2E assertions changed (each read a sentence this turn folds to a code; nothing else in those tests changed):

| Id | File | Before | After |
|---|---|---|---|
| RP-4 (×2) | `e2e/admin-roles.spec.ts` | `toMatch(/system role/i)` | `toBe("systemRole")` |
| RP-5 | `e2e/admin-roles.spec.ts` | `toMatch(/role has members/i)` | `toBe("hasDependents")` |
| RP-11 | `e2e/admin-roles.spec.ts` | `toMatch(/not assignable to custom roles/i)` | `toBe("permissionReserved")` |
| AU-6 | `e2e/admin-users.spec.ts` | `toContain("permission denied")` | `toBe("permissionDenied")` |
| AU-14 | `e2e/admin-users.spec.ts` | `toMatch(/permission denied\|account is deactivated/)` | `toBe("accountDeactivated")` (deactivation is checked before the permission) |
| MF-4 | `e2e/mfa-stepup.spec.ts` | `toMatch(/permission denied/i)` | `toBe("permissionDenied")` |
| IMP-3 (×2) | `e2e/admin-audit.spec.ts` | `toContain("cannot impersonate yourself" / "…a super admin")` | `toBe("impersonateSelf")`, `toBe("impersonateSuperAdmin")` |
| IMP-5 | `e2e/admin-audit.spec.ts` | `toContain("super-admin only")` | `toBe("permissionDenied")` |

Each assertion is exact where it was a substring or pattern, so none is looser. The step-up readings (MF-4's second
assertion, RP-6) stay as they were: step-up is still P0009.

Unit tests:
- `src/features/admin/roles/roles-service.test.ts` (new): `createdRoleId` (the answer and five non-answers) and
  `roleRefusalKey` (each code, the step-up sentence, cancel, no factor, the fallback).
- `src/features/admin/users/alias-reason.test.ts` (rewritten for the codes): `asksAliasReason`, and
  `profileEditRefusalKey` for each code, `permissionDenied:scope`, the two sentences, cancel, no factor and the generic.
- `src/features/admin/impersonation/impersonation-service.test.ts`: `startedSession` (the answer and five
  non-answers).
- `scripts/security-lints.test.ts` SLB-9 (new): the baseline holds `impersonation_reach: 0` among its five sorted keys,
  and a count of 1 fails with `::error::impersonation_reach 1 is above its baseline 0`.

Runs on the final tree:
- The touched units: `bunx vitest run src/features/admin src/lib/door-codes.test.ts src/lib/refusal.test.ts` → 57
  files, 385 passed.
- The laws: `bunx vitest run scripts --maxWorkers=2` → 119 files, 616 passed, 1 skipped.
- `bun run typecheck` → exit 0. `bun run lint` → exit 0.
- `bun run checks`:
  - fast line: `checks (fast): 26 PASS · 0 FAIL · 427s — laws-first, scope, build-and-check, component-tests, secrets-scan, migration-lint, i18n-usage-map, string-scan, import-gate, listing-write-seam, browse-path-guard, marketplace-weight, dependency-audit, e2e-preflight, e2e, promote; slow steps follow (build, budget, semgrep)`
  - last line: `checks: 35 PASS · 0 FAIL · 25 NOT RUN · 492s`
  - The 25 NOT RUN, each with the runner's own reason:
    - scope's two steps: they need the Actions API's artefacts;
    - actionlint and gitleaks: their pinned binaries are linux/x64, and this machine is darwin/arm64;
    - four install steps: dependencies are already installed;
    - the dependency audit's two steps: the advisory service is not reachable from the sandbox;
    - e2e-preflight's four steps: they need the staging credentials;
    - the e2e merge job's six steps: they need GitHub's artefacts;
    - promote's four steps: only CI promotes;
    - semgrep's two upload steps: only GitHub can receive the SARIF.
- `bun scripts/brief/check-go.ts docs/governance/briefs/f1-doors-2.md --at 13f204493` → `[check-go] no finding`.
- `bun run db:proof --fresh` → section 9.

Browser runs: none local (section 12). CI on the pull request runs every lane on its temporary backend, which applies
all six files. The repeat lane repeats the changed specs that fit its budget.

**J-audit** (e2e/** changed): only the eight assertions above changed. Each test keeps its users (`leaseUser`,
`mintPrivateSuperAdmin`, `createUser`) and its door call (`pageDoor` or the spec's client). None uses a real row,
`.first()`, `waitForTimeout`, `test.only` or a retry. No timeout was raised.

## 6. K2 — siblings that bypass the mechanism

Greps run: `rg -n "^CF-FORM-3" scripts/conformance/forms-allowlist.txt`;
`rg -n "stepUpAbortKey\(" src -g '!*.test.*'`; `rg -n "end_impersonation|get_active_impersonation" e2e/helpers/ui.ts`.

- **Hand-written refusal mappers** (CF-FORM-3; 30 allowlist lines remain, each with its wave): the other consoles'
  families, which their own waves and F1 turns move:
  - `admin-ai/ai-service.ts`;
  - `admin-attributes`: `attribute-dialogs.tsx`, `attribute-error.ts`;
  - `admin-categories`: `category-dialogs.tsx`, `category-image-dialog.tsx`, `category-submit-error.ts`;
  - `admin-countries`: three files;
  - `admin-listings`: six files;
  - `admin-locations`: three files;
  - `admin-monetisation`: three files;
  - `admin-screening`: two files;
  - `admin/legal/legal-service.ts`, `admin/translations/translations-service.ts`;
  - `auth/auth-error-key.ts`, `auth/mfa/mfa-service.ts` (2);
  - `my-listings`: `my-listing.ts`, `promote-service.ts`, `promote-sheet.tsx`.
  Not touched: they are outside SCOPE.
- **`stepUpAbortKey` callers outside this family** (the step-up half of the reader, called by hand):
  - `src/routes/admin.listings_.$listingId_.edit.tsx:92`;
  - `src/features/admin-categories/category-submit-error.ts:17`;
  - `src/features/admin-ai/ai-editor.tsx:43`;
  - `src/features/admin-countries/country-dialog-state.ts:14`;
  - `src/features/admin-locations/location-dialog-state.ts:15`;
  - `src/features/posting/use-edit-draft.ts:489`;
  - `src/features/admin-screening/screening-page.tsx:451`, `photo-reviews.tsx:72`, `job-line.tsx:73`,
    `name-checks.tsx:110`;
  - `src/features/admin-monetisation/use-monetisation-error.ts:18`;
  - `src/features/admin/translations/translations-service.ts:418`;
  - `src/features/admin-listings/listing-photos.tsx:100,129`, `listings-page.tsx:322`, `listing-page.tsx:356,415`;
  - `src/features/admin/import-dialog.tsx:342,369`.
  Outside SCOPE; reported only.
- **E2E bearer clients built by hand** (`e2e/helpers/session.ts`'s `bearerClient` is the mechanism):
  `e2e/admin-categories-home.spec.ts`, `e2e/legal-accept.spec.ts`, `e2e/import-security.spec.ts`,
  `e2e/feed-index.spec.ts`. Outside this family's specs; reported only. The census's queued item for
  `e2e/admin-users.spec.ts:47` was already done at the base by housekeeping-2 (0bcfcc1bb, 1669b6e30), so there was
  nothing to fold (section 10).

## 7. Allowlists and guards

| List | Before → after | Lines |
|---|---|---|
| `scripts/public-surface-allowlist.txt` | 189 → 196 | seven `restated grant (not a new surface)` lines (assign_role, revoke_role, admin_create_role, admin_update_role, admin_delete_role, admin_set_role_permission, admin_set_account_status): DROP + CREATE restates each grant |
| `scripts/conformance/forms-allowlist.txt` | 89 → 87 (CF-FORM-3 32 → 30) | `roles-service.ts` and `admin-users-service.ts` left with their mappers |
| `scripts/doors/manifest.txt` | 265 lines | the twenty functions' lines: codes cells; `admin_update_profile` country `global` with its reason; `end_impersonation` dial `account_pref` |
| `scripts/security-lints-baseline.json` | 4 → 5 keys | `"impersonation_reach": 0` |
| `scripts/route-budgets.mjs` | 8 ceilings | section 10 |

Guards run:
- `bash scripts/check-migrations.sh` → exit 0 (born-closed, definer, self-marking, public-surface, real-row,
  spanning-literal and migration guards OK).
- `bun scripts/doors/check-doors.ts` → `check-doors static OK: 265 manifest lines reconcile with the migrations' catalogue`.
- `node scripts/check-bundle-size.mjs` → `Bundle budget OK.`
- SLB-9 proves the lint's baseline fails at a count of 1. Part 6's proof (d) plants a scratch role holding
  `impersonation:use` and reads the lint at 1, then at 0 after the rollback.

## 8. Strings

None. No key was added or changed, and no Amharic is owed (ruling 1 item 2). The family's screens read their existing
keys. The i18n usage maps are unchanged; the i18n-usage-map job passed in `bun run checks`.

## 9. Migrations

| # | File | sha256 | Mark |
|---|---|---|---|
| 1 | `20261114070400_7102c888-3b97-4325-b985-2b978069b94e.sql` | `a91ea52ca9a4e277d8227cad505e0d12e9f2d844b6e814b217d9425fc374e68b` | 20261114090000 |
| 2 | `20261114070500_49f4b94e-d1ee-4c15-ba74-e341ec6dd872.sql` | `52b0db6507e0ba0864e4c7c67bdece7e9652f55681b10187e0f944bf41fd639f` | 20261114090100 |
| 3 | `20261114070600_76ce28de-461b-4151-9abf-0a7d50636feb.sql` | `d67ad2ec58e151283047f23a64b8824a97a2452bf7d94aa822513097398afb40` | 20261114090200 |
| 4 | `20261114070700_e30e4335-cc03-424b-9516-ab275a8801e1.sql` | `045cdef957f00c84dd563cb5c769daec0d3a0d67da0820296ff8e331478b5e2a` | 20261114090300 |
| 5 | `20261114070800_d66e79e1-b11c-44ab-9310-f43c84d86d67.sql` | `5ad75d3b78f4292891da6a21046ad87c60652b1d90fe43c9a2d66664da4300fb` | 20261114090400 |
| 6 (part 6) | `20261114070900_21a900de-2b3f-4734-9cc4-363614d826ee.sql` | `e3243dd071ff7c49bffb567a99cf3a6c7ab94e0bb3d7ede56248e695f98c5a8e` | 20261114100000 |

Files 1–5 are on ethio-staging (ruling 1). The pairing for the one file still to apply:

```
apply 21a900de → expect mark 20261114100000
```

Part 6's file:
- **Pre-check:** part 5's mark 20261114090400; the dials `account_pref` and `staff_moderation`; the live md5 of the
  three bodies it redeclares — `admin_update_profile` e090d5a3debbf646f9df49911ef10b24, `end_impersonation`
  a137b26ca25c398eef75a5f44b53b4dc, `security_lints()` 5b28264e213bb814054a93d17ea118bb.
- **Changes:**
  - `admin_update_profile`: `door_context('staff','profiles','update','staff_moderation', NULL, 'global')`;
  - `end_impersonation`: `account_pref` in `door_context` and `door_refused`;
  - `security_lints()`: redeclared whole from its last declaration (20261010055801), with the sixth element;
  - each COMMENT and REVOKE restated.
- **Proofs** on scratch rows (each RAISEs on failure):
  - (a) catalog facts and md5s;
  - (b) a country holder is refused for a NULL, an own and another country (`permissionDenied:scope`, 403, no dial
    spent, nothing written); a global holder sets country XZ (row and audit); `unknownCountry` 400; the staff dial
    counted twice;
  - (c) begin, then end with a random id → `noActiveSession` 400, then end with the session → ok; `impersonation`
    counted once, `account_pref` twice;
  - (d) the lint's six names, count 0, and 1 with a scratch role holding `impersonation:use`.

`bun run db:proof --fresh` on the final tree:

```
db:proof PASS — applied 443/443, CLI 2.120.0, cold, 51 s
```

## 10. Departures

1. **(MAJOR, the review) Every page's first download grows by about 21 bytes**: the entry's dependency map names
   the staff pages' new chunk. The brief's TOLERANCES say "a public page that grows at all is a STOP"; ruling 1 put
   the next stop at the end of the turn, so it is named here instead.
   - `__vite__mapDeps` in the entry lists, for each lazily loaded route, the chunks it needs. `refusal.js` joins the
     roles and users pages' lists (section 10, item 3), and each list entry gains one index (`,39`).
   - Measured with every chunk's hash replaced by a fixed token in both builds (base 13f204493 and the final tree):
     every public and member page +21 B gzip (+19 B for `/post`, `/post_/$listingId` and
     `/my-listings_/$listingId_/edit`; the staff pages `/admin/screening` and `/admin/listings_/$listingId_/edit` +19,
     `/admin/categories` +3), and no module of any public page changed. Unmasked, the readings are +1 to +51 B, because the chunk names' hashes also compress differently.
   - The checker's one-decimal readout moves for `/auth` (219.5 → 219.6, +17 B) and `/post` (402.6 → 402.7, +50 B).
     Every other public page reads the same. No public page is near its ceiling (`/auth` has 3.4 KiB of room).
   - It cannot be avoided inside SCOPE. Only taking `readRefusal` on demand in the two services would avoid it, and
     that makes every refusal mapper asynchronous. The supervisor rules.
2. **`DOOR_CODES` did not grow** (802da4ee8; the census planned "gains the codes this family's screens read, in
   STEP 3").
   - The list sits in the entry chunk: adding the family's 22 codes (3db3cffa7) grew the entry 203.7 → 203.8 KiB and
     every public page by 0.1–0.2 KiB, which the TOLERANCES forbid.
   - None of this family's screens needs a code on the list. Each code it reads is named by the family's words; any
     other code reads as the screen's generic either way (`readRefusal`: a listed code without words → the family's
     generic; an unlisted one → the same generic at the end).
   - `asksAliasReason` reads through `readRefusal` instead of `doorCode`.
   - The test added for the list (DRC-8) left with it, and `door-codes.ts` and its test equal the base's.
   - `docs/features/doors.md` says so.
3. **The staff ceilings** (7df9d8e46, one ceilings commit). STEP 3's commit could not take them without rewriting
   history (rule 00 step 4 allows one ceilings commit before the push).
   - The cause, chunk by chunk: `refusal.js` (`src/lib/refusal.ts`, 1.11 KiB gzip; already a chunk of its own,
     already on `/l/$slug` at the base) joins the first download of seven staff pages:
     - through `use-admin-users.js` (`admin-users-service.ts` now imports `readRefusal`): `/admin/legal`,
       `/admin/legal_/$versionId`, `/admin/legal_/edit`, `/admin/translations`, `/admin/users_/$userId`;
     - through `use-admin-roles.js` (`roles-service.ts`): `/admin/roles`, `/admin/roles_/$roleId`;
     - and through `impersonation-starter.js` on `/admin/users_/$userId`.
   - Measured on base and final builds of this worktree. The other chunks moved ±0.01 KiB (their import lines name
     re-hashed chunks).
   - Each line follows DEC-296's form, `ceilingForLocal(size)`:
     - `/admin/legal` 281.0 → 282.1, 282 → 283;
     - `/admin/legal_/$versionId` 278.0 → 279.1, 279 → 280;
     - `/admin/legal_/edit` 280.0 → 281.1, 281 → 282;
     - `/admin/roles` 291.8 → 293.0, 293 → 294;
     - `/admin/roles_/$roleId` 272.3 → 273.5, 273 → 274;
     - `/admin/translations` 302.8 → 304.0, 304 → 305;
     - `/admin/users_/$userId` 288.2 → 289.4, 289 → 290;
     - `/post_/$listingId` (member) 402.6 → 402.6 (412257 → 412308 B; it crossed into the NEAR band by item 1's
       bytes), 403 → 404.
   - The table of every page, base and final, is below.
4. **`rateLimited` reads as each screen's generic** in the roles and profile-edit families, not `admin.error.rateLimited`.
   That key lives in the admin strings layer, and `roles-service.ts` and `admin-users-service.ts` are base-layer files
   (CF-SL-1 refused it). Before this turn neither mapper named a rate limit either (it read as the fallback), so the
   screens answer as they did.
5. **`startedSession`** (bcca1f164): the types patch made `begin_impersonation` return `Json`, so the old
   `data[0].session_id` failed the typecheck. The shape guard landed in ruling 1's commit to keep that commit green.
6. **The alias index's race** keeps its sentence (`profiles_seller_alias_unique` → `errorAliasTaken`). A concurrent
   insert can still raise the raw unique violation past the door's own check.
7. **The census's queued bearer fold** (`e2e/admin-users.spec.ts:47`) had nothing to do: housekeeping-2 (0bcfcc1bb,
   1669b6e30) had already folded it at the base.
8. **The by-id browser run** was not made (section 12).
9. STOPs and rulings in the turn: the MIGRATION stop (`f1-doors-2.stop-1.md`, 62e30aedc), answered by ruling 1
   (`docs/governance/briefs/f1-doors-2-ruling-1.md`), which added part 6.

The first download, every page, base 13f204493 against the final tree. Both are local builds of this worktree; sizes
in KiB gzip as the checker prints them; "room" is ceiling minus size, before the checker's 0.1 KiB local allowance:

| page | base | after | change | ceiling | room |
|---|---|---|---|---|---|
| (entry JS) | 203.7 | 203.7 | 0.0 | 205 | 1.3 |
| / | 225 | 225 | 0.0 | 227 | 2.0 |
| /$name | 223 | 223 | 0.0 | 225 | 2.0 |
| /account | 265.9 | 265.9 | 0.0 | 268 | 2.1 |
| /account_/legal | 206.3 | 206.3 | 0.0 | 208 | 1.7 |
| /account_/legal_/$versionId | 206.9 | 206.9 | 0.0 | 209 | 2.1 |
| /account_/saved | 223.2 | 223.2 | 0.0 | 225 | 1.8 |
| /admin | 208.1 | 208.1 | 0.0 | 210 | 1.9 |
| /admin/ | 208.9 | 208.9 | 0.0 | 211 | 2.1 |
| /admin/ai | 323.8 | 323.8 | 0.0 | 325 | 1.2 |
| /admin/attributes | 337 | 337 | 0.0 | 338 | 1.0 |
| /admin/audit | 294 | 294 | 0.0 | 295 | 1.0 |
| /admin/categories | 345 | 345 | 0.0 | 346 | 1.0 |
| /admin/countries | 326.5 | 326.6 | 0.1 | 327 | 0.4 |
| /admin/images | 208.7 | 208.7 | 0.0 | 210 | 1.3 |
| /admin/impersonation_/$sessionId | 291.6 | 291.7 | 0.1 | 293 | 1.3 |
| /admin/legal | 281 | 282.1 | 1.1 | 283 | 0.9 |
| /admin/legal_/$versionId | 278 | 279.1 | 1.1 | 280 | 0.9 |
| /admin/legal_/edit | 280 | 281.1 | 1.1 | 282 | 0.9 |
| /admin/listings | 348 | 348.2 | 0.2 | 349 | 0.8 |
| /admin/listings_/$listingId | 352.2 | 352.4 | 0.2 | 353 | 0.6 |
| /admin/listings_/$listingId_/edit | 410.5 | 410.5 | 0.0 | 411 | 0.5 |
| /admin/locations | 269.7 | 269.7 | 0.0 | 271 | 1.3 |
| /admin/monetisation | 333.2 | 333.3 | 0.1 | 334 | 0.7 |
| /admin/places | 328.1 | 328.1 | 0.0 | 329 | 0.9 |
| /admin/roles | 291.8 | 293 | 1.2 | 294 | 1.0 |
| /admin/roles_/$roleId | 272.3 | 273.5 | 1.2 | 274 | 0.5 |
| /admin/screening | 369.2 | 369.2 | 0.0 | 370 | 0.8 |
| /admin/translations | 302.8 | 304 | 1.2 | 305 | 1.0 |
| /admin/translations_/$lang | 306.2 | 306.3 | 0.1 | 307 | 0.7 |
| /admin/users | 291.9 | 291.9 | 0.0 | 293 | 1.1 |
| /admin/users_/$userId | 288.2 | 289.4 | 1.2 | 290 | 0.6 |
| /auth | 219.5 | 219.6 | 0.1 | 223 | 3.4 |
| /auth_/callback | 207.2 | 207.2 | 0.0 | 209 | 1.8 |
| /auth_/reset | 209.2 | 209.2 | 0.0 | 211 | 1.8 |
| /c/$slug | 225 | 225 | 0.0 | 227 | 2.0 |
| /dev/primitives | 225.1 | 225.1 | 0.0 | 226 | 0.9 |
| /dev/style | 246.2 | 246.2 | 0.0 | 248 | 1.8 |
| /dev/tall | 204 | 204 | 0.0 | 206 | 2.0 |
| /l/$slug | 255.6 | 255.6 | 0.0 | 257 | 1.4 |
| /legal/$kind | 208.4 | 208.4 | 0.0 | 210 | 1.6 |
| /legal/accept | 214.5 | 214.5 | 0.0 | 217 | 2.5 |
| /legal/publishing | 209.2 | 209.2 | 0.0 | 211 | 1.8 |
| /my-listings | 311.1 | 311.1 | 0.0 | 315 | 3.9 |
| /my-listings_/$listingId | 319.7 | 319.7 | 0.0 | 323 | 3.3 |
| /my-listings_/$listingId_/edit | 402.7 | 402.7 | 0.0 | 404 | 1.3 |
| /post | 402.6 | 402.7 | 0.1 | 404 | 1.3 |
| /post_/$listingId | 402.6 | 402.6 | 0.0 | 404 | 1.4 |
| /privacy | 208.4 | 208.4 | 0.0 | 210 | 1.6 |
| /settings | 274.3 | 274.3 | 0.0 | 277 | 2.7 |
| /terms | 208.4 | 208.4 | 0.0 | 210 | 1.6 |

The staff pages that moved 0.1–0.2 KiB without a ceiling change (`/admin/countries`,
`/admin/impersonation_/$sessionId`, `/admin/listings`, `/admin/listings_/$listingId`, `/admin/monetisation`,
`/admin/translations_/$lang`) moved by item 1's bytes and the re-hashed chunk names. In the masked comparison,
`/admin/impersonation_/$sessionId` +121 B and `/admin/listings*` +126–128 B, as their chunks import the
re-hashed impersonation service. Each stays outside the NEAR band (the checker reports none).

Scratch, the operator's to remove: `/tmp/ethio-scratch/f1-doors-2/`. It holds:
- the base and final build logs (`bundle-base2.log`, `bundle-h9.log`);
- the per-chunk listings (`chunks-*.txt`, made by `page-chunks.mjs`);
- the exact and hash-masked byte tables (`exact-*.tsv`, `norm-*.tsv`, `norm.mjs`);
- the two build copies (`dist-base/`, `dist-head/`);
- the part 6 builder, the db:proof and checks logs.

## 11. CI

The base's CI (ci-evidence `docs/tracking/ci-status.md`, read by `git show origin/ci-evidence:docs/tracking/ci-status.md`):

```
# CI Status (auto-generated — do not edit by hand)

- Commit: `13f204493cb74748bde1083a2c823f05c89dc176` (short `13f2044`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-14T06:40:33Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43567069040
```

The two-step check: the evidence's commit is 13f204493, which is the brief's base and `origin/dev` at this turn's
push (`git rev-parse --short origin/dev` → 13f204493). No red of an earlier turn.

The migration commit 5e54ac8a6 (run 43572434121): the temporary backends applied 442 of 442. Its reds were the
families named at the stop, plus D239-E6, which ruling 1 named. STEPS 3–4 address them.

The final code commit 7df9d8e46, run 43579527857 (the lane's `branches/cursor/f1-doors-2/ci-status.md`, commit
`7df9d8e467f3…`, Conclusion FAILURE, completed 2026-11-14T09:31:52Z). `gh pr checks 43`: 42 pass, 1 fail, 1 skipping
(Promote, which runs only on `dev`).
- **The one red: `E2E preflight (migration parity, staging)`.** Class: STAGING BEHIND, expected by ruling 1. Its tail
  (`guards-last-failure.md`): `STAGING BEHIND: apply 20261114070900_21a900de-2b3f-4734-9cc4-363614d826ee.sql to
  ethio-staging before E2E can pass`, over 28 waits of 30 s. It is part 6's file and no other. Not a code red; nothing
  to fix, and no re-run (ruling 1: "not a reason for a second push").
- **Green:**
  - every temporary-backend lane: 1–16, smoke, email, webkit, repeat, the backend images and the summary;
  - `E2E (Playwright, ethio-staging)`;
  - the build, typecheck and lint, the component tests, the bundle budget, semgrep, gitleaks, the migration linter
    and every guard.
- `e2e-last-failure.md`: "last E2E run 43579527857 passed"; flaky 0; the server-error census 0 off the allowlist.
- **Repeat lane:** 33 of 47 tests repeated. Changed specs 3 of 4: `admin-roles`, `admin-audit` and `mfa-stepup`
  repeated; `admin-users.spec.ts` ran once, in lane 16, and passed. The lane's "Errors outside any test (2)" is its
  time cap ("Timed out waiting 763s…"); the job is green.

No re-run was asked for. No earlier turn's red was found.

## 12. Limits

- **The by-id browser run was not made.** The E2E values are set, but ethio-staging does not hold part 6's mark
  20261114100000. The ids it would have run, in `mobile-360` and `desktop-1280`: RP-4, RP-5, RP-11, AU-6, AU-14, MF-4,
  IMP-3, IMP-5, D239-E6. CI's lanes run them on a temporary backend that holds all six files.
- **The final push's `E2E preflight (migration parity, staging)` is red with STAGING BEHIND naming part 6**
  (run 43579527857), until the supervisor applies `21a900de` (ruling 1: "expected, named under §12 Limits, NOT a
  stop"). So no check on this pull request proves the changed ids against ethio-staging yet. The temporary-backend
  lanes proved them on a backend that holds all six files.
- The repeat lane's time cap left `admin-users.spec.ts` (AU-6, AU-14) unrepeated in this run.
- Part 6's proofs have run only on the throwaway local stack (`db:proof --fresh`) and on CI's temporary backends.
  Their first run on a shared database is the staging apply.
- The first-download numbers are local builds. CI's build reads about 0.1 KiB more (DEC-296); the ceilings use
  `ceilingForLocal`.
- `bun run checks`' NOT RUN steps are listed in section 5 with their reasons.

## 13. Findings

1. `e2e/helpers/ui.ts:869–873` (`endActiveImpersonation`) ignores the error of its `get_active_impersonation` read:
   a refused or failed read ends nothing and says nothing. Outside this turn's assertions; raised for the e2e
   helpers' next turn.
2. The entry's `__vite__mapDeps` table makes every staff page's static dependencies a cost on every page: a staff
   service that gains a chunk grows the public pages by its index bytes (section 10, item 1). This is structural, and
   it will recur on every family turn that moves a service onto `readRefusal`. Raised so the speed lane can plan it
   (for example a rule for which route dependencies the map carries, or the reader on the entry).
3. `DOOR_CODES` sits in the entry chunk, so each family turn that adds its codes grows every page by about 0.1 KiB
   (section 10, item 2). Raised with finding 2: the list could ride with `readRefusal`'s chunk instead.
4. Census finding 4 stands: `assign_role` with an unknown user id answers the raw foreign-key error (23503). The
   client reads it as the generic line; the door could answer `unknownUser`. Not a numbered change here.
5. No security hole found (the read: the six files' gates, ACLs and proofs; the client's refusal paths).

## 14. Records

DEC — The users family is global until country staff is a product feature: `admin_update_profile`, `admin_set_account_status` and `admin_get_user` take the global mode; `admin_list_users` keeps the filter. The target-row mode (`row:profiles.home_country_code`) for the three is a roadmap line. Two rules join the manifest's grammar: an `arg:` country names the row the door writes or creates, never a new value for an existing row; a door that only closes what another door opened spends a dial other than its opener's. `end_impersonation` spends `account_pref`. (ruling 1: DEC-380)

DEC — `begin_impersonation`'s super-admin rule is the permission `impersonation:use`, held by `super_admin` alone and assignable to no custom role; the lint `impersonation_reach` (ERROR, baseline 0) holds it on every push and every night. View-as v2 (DEC-373) decides who else may hold it, by changing the lint's baseline in a recorded decision. (ruling 1: DEC-381)

INC — `admin_update_profile`'s country scope read the country ARGUMENT (the manifest's F1-1 line): the argument is the new value, so the scope did not bind the row being edited and refused an honest country holder. Found at the F1-2 migration stop, before any country-scoped holder existed; fixed in part 6 (global). Class: a manifest cell grounded by signature; the other `arg:` lines name the written row's country and are confirmed family by family in their own turns. (ruling 1: INC-1151)

INC — `end_impersonation` spent the dial `impersonation` (the manifest's F1-1 line): at the ceiling a live session could not be ended by hand. Found at the F1-2 migration stop, before ethio-prod; fixed in part 6 (`account_pref`). Class: an exit rationed by its entry's dial. (ruling 1: INC-1152)

DEC — DEC-333 — status line: turn F1-2 BUILT — the doors of roles, users, impersonation and the audit log on `door_context` and the shell [`assign_role`, `revoke_role`, `admin_create_role`, `admin_update_role`, `admin_delete_role`, `admin_set_role_permission`, `admin_set_account_status`, `admin_update_profile`, `begin_impersonation`, `end_impersonation`; the reader `get_active_impersonation`; the staff readers `admin_list_users`, `admin_get_user`, `admin_list_roles`, `admin_list_roles_detailed`, `admin_get_role`, `admin_user_activity`, `admin_list_audit`, `admin_audit_facets`, `admin_audit_stats`]; their refusals as codes [added: roleReserved, unknownRole, systemRole, unknownPermission, permissionReserved, corePermission, impersonateSelf, impersonateSuperAdmin, sessionActive, noActiveSession; reused: nameRequired, badSlug, duplicateKey, hasDependents, badValue, required, unknownUser, unknownCountry, aliasShape, aliasTaken, aliasReserved, badLength; the gate codes from door_context]; [the ten doors' return type changed to jsonb: the nine void doors, `admin_create_role` from uuid, `begin_impersonation` from a table]; the migration files [`20261114070400_7102c888…`, `20261114070500_49f4b94e…`, `20261114070600_76ce28de…`, `20261114070700_e30e4335…`, `20261114070800_d66e79e1…`, `20261114070900_21a900de…`] with the marks [20261114090000, 20261114090100, 20261114090200, 20261114090300, 20261114090400, 20261114100000].

INC — INC-1038 — status line: `admin_update_profile` spends the dial `[staff_moderation]` (F1-2, [5e54ac8a6]); three doors remain for F1-6.

INC — INC-834 — status line: this family is scoped as its manifest lines say — `assign_role` and `admin_update_profile` by their country argument, `admin_list_users` by the filter mode [and what the census changed: part 6 made `admin_update_profile` global (DEC-380, INC-1151), so `assign_role` alone is scoped by its country argument]; proven by [the migration proofs (b) of files 1, 3, 5 and 6, on `db:proof --fresh` and CI's temporary backends; no e2e id tests a country scope in this family].

register row — the doors' row gains "roles, users, impersonation and audit on the shell (F1-2)"; the form kit's reader row gains "the roles and users mappers left the allowlist (F1-2)".

changelog — 2026-11-14 turn F1-2 (Opus 5.5): the doors of roles, users, impersonation and the audit log on the door mechanism — one gate in one order, refusals as codes, the client through the one reader; `admin_update_profile` on its dial.

roadmap — the Foundations 1 line gains "F1-2 DONE ([pull request #43](https://github.com/tesfayekb/ethio-marketplace/pull/43), 20261114090000 → 20261114090400, 20261114100000)"; LEFT: `impersonation_target`, `impersonated_get_profile`, `impersonated_list_listings` (F1-7, with INC-838's signed-in readers); `admin_user_legal_history` (F1-3, the legal family).

roadmap (Ops phase) — The users console for country staff — the three user doors on `row:profiles.home_country_code`, with a second scope check when the country itself is changed (DEC-380).

slip — the entry's dependency map grows every page by a staff service's new chunk (section 13, findings 2 and 3): a speed-lane item for the map's carriage and for `DOOR_CODES` off the entry.
