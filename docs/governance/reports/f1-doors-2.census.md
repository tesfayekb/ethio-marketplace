# f1-doors-2 — the census (STEP 1)

Base: dev b26e3b34f as the brief names it; the lane began from `origin/dev` 13f204493, which is the merge of pull
request #42 over b26e3b34f (the merge's first parent) — the merge the brief's STEP 0 waits for. Every reading below
is of the tree at 13f204493. The bodies' md5 values are `md5` of the text between the dollar tags of each LAST
declaration with carriage returns removed (the form the migration's pre-check reads from `pg_proc.prosrc`), by a
scratch reader over `scripts/doors/catalogue.ts` (`/tmp/ethio-scratch/f1-doors-2/census.ts`).

## consumers

Every door and reader of the family, from its last declaration. "Gates today" is the body; "promise" is the manifest
line (`scripts/doors/manifest.txt`). Callers are every `rpc("<name>"` and `pageDoor(page, "<name>"` under `src/` and
`e2e/` (comment mentions in `name-checks.tsx:53`, `deactivated.ts:3`, `audit-page.tsx:98,472`,
`permission-matrix.tsx:45`, `use-admin-users.ts:26`, `user-detail.tsx:61` read nothing).

### The role doors

| Door (last declaration) | Gates today → promise | Returns | Sentences → code | Callers (what they read) |
|---|---|---|---|---|
| `assign_role(uuid,text,character)` 20260817052646 :91, md5 8c494275feb267bbb2b9402929709981 | `has_permission(roles,assign)` + `require_step_up_if_needed`; no dial, no scope → line 152: staff, roles:assign, step-up row, dial staff_config, audit role.assign, country `arg:scope_country` (match) | void → **jsonb** | 'not permitted to assign roles' → permissionDenied (door_context); 'role % is not assignable through assign_role' → **roleReserved**:<role>; 'unknown role' → **unknownRole** | `admin-users-service.ts:169` (error only) |
| `revoke_role(uuid,text)` 20260817052646 :121, md5 88478a12f150718f1342c5219a9fe94e | as above → line 254: roles:assign, staff_config, role.revoke, global | void → **jsonb** | 'not permitted to revoke roles' → permissionDenied; 'role % is not revocable through revoke_role' → roleReserved:<role>; 'unknown role' → unknownRole | `admin-users-service.ts:177` (error only) |
| `admin_create_role(text,text,text)` 20260822050500 :126, md5 4fd93dc4907b353ea7acd55729ed14d0 | `has_permission(roles,create)` + step-up → line 30: roles:create, staff_config, role.create, global | uuid → **jsonb** `{ok, id}` | 'permission denied' → permissionDenied; 'role name is required' → nameRequired (exists); 'role name must be lowercase letters, digits, _ or -' → badSlug (exists: a key's shape); 'role name already taken' (23505) → duplicateKey:name (exists) | `roles-service.ts:98` (reads `data` as the new id — `data as unknown as string`) |
| `admin_update_role(uuid,text,text)` 20260822050500 :167, md5 8283039b93b2111395e5149041df379d | `has_permission(roles,update)` + step-up → line 144: roles:update, staff_config, role.update, global | void → **jsonb** | 'permission denied' → permissionDenied; 'role not found' → unknownRole; 'system roles are immutable' → **systemRole** | `roles-service.ts:112`; `e2e/admin-roles.spec.ts:218` (RP-4 reads `/system role/i`) |
| `admin_delete_role(uuid)` 20260822050500 :201, md5 2ba6a6eddc588483b8121fb9fe097908 | `has_permission(roles,delete)` + step-up → line 35: roles:delete, staff_config, role.delete, global | void → **jsonb** | 'permission denied'; 'role not found' → unknownRole; 'system roles are immutable' → systemRole; 'role has members' → hasDependents (exists) | `roles-service.ts:121`; `e2e/admin-roles.spec.ts:255` (RP-5 reads `/role has members/i`) |
| `admin_set_role_permission(uuid,uuid,boolean)` 20260822065530 :31, md5 83a47472db5215de27fec82afb9c01c6 | `has_permission(roles,update)` + step-up → line 130: roles:update, staff_config, role.permission_change, global | void → **jsonb** (its early `RETURN;` for an absent grant → `{ok:true}`) | 'permission denied'; 'role not found' → unknownRole; 'system roles are immutable' → systemRole; 'unknown permission' → **unknownPermission**; 'permission is not assignable to custom roles' → **permissionReserved**; 'core permission locked' → **corePermission** | `roles-service.ts:130`; `e2e/admin-roles.spec.ts:235` (RP-4 `/system role/i`), `:308` (RP-6 step-up, `/no verified factor|step-up required/i` — kept, P0009), `:438` (RP-11 `/not assignable to custom roles/i`) |

### The user doors

| Door | Gates today → promise | Returns | Sentences → code | Callers |
|---|---|---|---|---|
| `admin_set_account_status(uuid,text,text)` 20260817052646 :61, md5 fd8c13195dcc80c85d1d7d6a8e5ab7f1 | `has_permission(profiles,update)` + step-up → line 111: profiles:update, staff_moderation, user.status_change, global | void → **jsonb** | 'permission denied' → permissionDenied; 'unknown account status' → badValue:status (exists); 'a reason is required to deactivate' → required:reason (exists); 'user not found' → unknownUser (exists) | `admin-users-service.ts:132`; `e2e/mfa-stepup.spec.ts:187` (MF-4 `/permission denied/i`), `:200` (MF-4 `/step-up required/i` — kept, P0009); `e2e/admin-users.spec.ts:356` (AU-6 'permission denied'), `:600` (AU-14 `/permission denied|account is deactivated/`) |
| `admin_update_profile(uuid,text,text,character,text)` 20261029092611 :157, md5 0c81e815191566e5c8cd298754d729d7 (4486 bytes) | `has_permission(profiles,update)` + step-up; **no dial** (INC-1038's first door) → line 143: profiles:update, staff_moderation, user.profile_edit, `arg:home_country_code` (match) | void → **jsonb** | 'permission denied'; 'display name is required' → nameRequired; 'unknown country' → unknownCountry (exists); 'user not found' → unknownUser; 'seller alias refused: shape' (22023) → aliasShape (exists: the posting form's rule a); 'seller alias already taken' (23505) → aliasTaken (exists); 'seller alias needs a reason: %' (22023, HINT reason_required) → aliasReserved:<rule> (exists: rules b–e) | `admin-users-service.ts:227` (error: `profileEditErrorKey`, `needsAliasReason`); e2e AU-9…AU-12 drive it through the editor (UI words) |

### The impersonation doors and reader

| Door | Gates today → promise | Returns | Sentences → code | Callers |
|---|---|---|---|---|
| `begin_impersonation(uuid,text)` 20261028230748 :156, md5 17dc83839234800e063c63daf2c13eff | `is_super_admin` first, five checks, then `require_step_up_if_needed(impersonation,use)`, then `rate_gate('impersonation')` → line 174: staff, impersonation:use, step-up row, dial impersonation, impersonation.start, global | TABLE(session_id, expires_at) → **jsonb** `{ok, session_id, expires_at}` | 'impersonation is super-admin only' → permissionDenied (door_context: impersonation:use is held by no role and is not assignable — the pre-check asserts it); 'cannot impersonate yourself' → **impersonateSelf**; 'cannot impersonate a super admin' → **impersonateSuperAdmin**; 'user not found' → unknownUser; 'a reason of at least 5 characters is required' → badLength:reason (exists); 'an impersonation session is already active' → **sessionActive**; 'rateLimited' → door_context | `impersonation-service.ts:52` (reads `data[0].session_id`); `e2e/admin-audit.spec.ts:294,304` (IMP-3 'cannot impersonate yourself', 'cannot impersonate a super admin'), `:329` (IMP-5 'super-admin only'); IMP-1/IMP-2 through the starter |
| `end_impersonation(uuid)` 20261023100132 :386, md5 7e7fba195064fb0303cff2b4d832d5fa | `assert_caller_active()` → line 186: owner, dial impersonation, impersonation.end | void → **jsonb** | 'account is deactivated' (assert_caller_active) → accountDeactivated; 'no active impersonation session' → **noActiveSession** | `impersonation-service.ts:63`; `e2e/helpers/ui.ts:873` (error only) |
| `get_active_impersonation()` 20260822073000 :202, md5 c8b8863e56899e153d8e738416522cca | none (empty for no uid) → line 189: signed-in-reader | TABLE, unchanged | none; no uid → notSignedIn (door_context 'reader') | `impersonation-service.ts:68`; `e2e/helpers/ui.ts:869`; `src/components/shell/impersonation-notice.tsx` through the service |

### The staff readers (STABLE; each keeps its return type; a refusal RAISEs, no shell, no dial)

| Reader | Gate today → promise | md5 | Caller |
|---|---|---|---|
| `admin_list_users(text,text,text,integer,integer)` 20260816120338 :231 | `has_permission(profiles,view)` → line 77: staff-reader profiles:view, **filter** (the list narrows to the caller's countries) | ea0247997aff648cdbdca68a62d22352 | `admin-users-service.ts:81` |
| `admin_get_user(uuid)` 20260816120338 :282 | profiles:view → line 50: global | af136b5d6ba4d3806b268b8229f0a4be | `admin-users-service.ts:105` |
| `admin_list_roles()` 20260816120338 :363 | profiles:view **or** roles:view → line 74: profiles:view, global | 3be262ba188a2eff3fa37a59d7c387be | `admin-users-service.ts:158` (`listRoles`, read only by `use-admin-users.ts:73` on the users screens) |
| `admin_list_roles_detailed()` 20260822050500 :58 | roles:view → line 73: global | 69ad8c2392d36279a674e5b87178599d | `roles-service.ts:52` |
| `admin_get_role(uuid)` 20260822065530 :93 | roles:view → line 48: global | 73228e2ec085b5d5e7aa73a414f71891 | `roles-service.ts:66` |
| `admin_user_activity(uuid,integer)` 20260901165322 :23 | profiles:view → line 149: global | 06a853d09b6801389996f7162382415b | `admin-users-service.ts:141` |
| `admin_list_audit(text,text,text,timestamptz,timestamptz,integer,integer)` 20260903033520 :28 | audit_logs:view → line 62: global | 525ba63e176efa805e396e0782913a17 | `audit-service.ts:55` |
| `admin_audit_facets()` 20260822073000 :83 | audit_logs:view → line 23: global | d5a60e97c1464f522e3b7940c304dc02 | `audit-service.ts:87` |
| `admin_audit_stats(integer)` 20260822073000 :100 | audit_logs:view → line 24: global | 5eab6b70e7751a323a0a40a7d1c116c9 | `audit-service.ts:105` |

Every reader's 'permission denied' becomes door_context's permissionDenied (RAISEd, the reader's error message).

Dials: staff_config (600/3600), staff_moderation (600/3600) and impersonation (30/86400, 20261028230748 :16) exist
in `public.rate_dials` and in `src/lib/dials.ts`; no door of the family needs a new dial.

## definition

By the concern's definition (every browser-callable function whose manifest line or caller belongs to the roles,
users, impersonation or audit consoles), against the plan's §5 row (`docs/governance/reports/f1-doors.stop-1.md`
:475, "≈22", `admin_list_roles*` and `admin_audit_*` as globs) and the GO's list of 19:

- **Added by the definition, built here:** `admin_get_role(uuid)` (the roles console's detail reader, roles:view,
  line 48) — in the plan's `admin_list_roles*`/console set, not in the GO's list.
- **Added by the definition, LEFT:**
  - `impersonation_target(uuid)` (20260822073000 :219), `impersonated_get_profile(uuid)` (:235),
    `impersonated_list_listings(uuid,integer,integer)` (20260928034942 :994) — the read-only view's signed-in
    readers, gated by the session box; ruling 1 §9 puts the signed-in readers (INC-838) in F1-7, and DEC-373
    (view-as v2) rebuilds the view. Left to F1-7.
  - `admin_user_legal_history(uuid)` (20261019103558 :294) — a profiles-adjacent staff reader whose caller lives in
    `src/features/admin/legal/` (outside this SCOPE); the legal family is F1-3. Left to F1-3.
- **A door that no longer exists:** none — every name of the GO's list has a live last declaration.
- The GO lists `get_active_impersonation` with the impersonation doors; it is a signed-in reader and takes
  `door_context('reader')` here (the GO names it; the rest of INC-838's readers stay F1-7's).

Total built: 10 doors + 1 signed-in reader + 9 staff readers = 20 functions.

## tests

E2E ids by their real names (the plan's "AS-1…7, R-1…3, IN" are not the tree's names):

- `e2e/admin-roles.spec.ts`: RP-1 RP-2 RP-3 RP-4 RP-5 RP-6 RP-7 RP-8 RP-9 RP-10 RP-11 RP-12 RP-16 RP-17 — next RP-18.
- `e2e/admin-users.spec.ts`: AU-1 … AU-14 — next AU-15.
- `e2e/admin-audit.spec.ts`: AS-1 AS-2 AS-3, IMP-1 IMP-2 IMP-3 IMP-5 IMP-6 (IMP-4 retired by name) — next AS-4,
  IMP-7.
- `e2e/mfa-stepup.spec.ts`: MF-1 MF-2 MF-3 MF-4 MF-5 MF-6 MF-7 MF-7b MF-7c MF-8 — next MF-9.
- The mechanism's own: `e2e/door-refusals.spec.ts` DRF-1…6, `e2e/auth-caller-gates.spec.ts` CG-2; `scripts/doors/check-doors.test.ts`.

Ids that read a sentence this turn folds to a code (each changes in STEP 4 only at that assertion):

| Id | file:line | Reads today | Reads after |
|---|---|---|---|
| RP-4 | admin-roles.spec.ts:224, :241 | `/system role/i` | `systemRole` |
| RP-5 | admin-roles.spec.ts:255–257 | `/role has members/i` | `hasDependents` |
| RP-11 | admin-roles.spec.ts:444 | `/not assignable to custom roles/i` | `permissionReserved` |
| AU-6 | admin-users.spec.ts:362 | 'permission denied' | `permissionDenied` |
| AU-14 | admin-users.spec.ts:605 | `/permission denied\|account is deactivated/` | `accountDeactivated` (door_context checks deactivation before the permission) |
| MF-4 | mfa-stepup.spec.ts:193 | `/permission denied/i` | `permissionDenied` |
| IMP-3 | admin-audit.spec.ts:299, :309 | 'cannot impersonate yourself', 'cannot impersonate a super admin' | `impersonateSelf`, `impersonateSuperAdmin` |
| IMP-5 | admin-audit.spec.ts:334 | 'super-admin only' | `permissionDenied` |

Kept as they are: the step-up readings (MF-4 :206, RP-6 :321) — `stepUpRequired` stays P0009. IMP-3's caller is
a private super admin stepped up to aal2 (`mintPrivateSuperAdmin` → `enrollAndStepUp`), so the step-up that now
comes before the self and super-admin checks is cleared and the assertion still reaches the rule under test.

Ids that read a return shape that changes: none read `data` of a door directly; the UI flows that do (RP's
`createRoleViaUi` through `createRole`, IMP-1/IMP-2 through `beginImpersonation`) read it through the services STEP 3
changes. Between the migration's push and STEP 3 those flows are expected red on CI's backend (named at the stop).

Client unit tests of the files this turn changes: `src/features/admin/users/alias-reason.test.ts` (imports
`admin-users-service` dynamically; reads `needsAliasReason`), `src/features/admin/impersonation/impersonation-service.test.ts`;
`src/lib/door-codes.test.ts`, `src/lib/refusal.test.ts`. `roles-service.ts` and `audit-service.ts` have no unit test.

## lists

- **The manifest** `scripts/doors/manifest.txt`: lines 23, 24, 30, 35, 48, 50, 62, 73, 74, 77, 111, 130, 143, 144,
  149, 152, 174, 186, 189, 254. Every codes cell is `-` today; the judge (`scripts/doors/judge.ts:148–153`) requires
  the cell to equal the body's `door_refuse` literals, so the doors' cells change in the SAME commit as the migration
  (a commit is never red; check-doors static reads the migration files).
- **The door codes** `src/lib/door-codes.ts` `DOOR_CODES`: gains the codes this family's screens read, in STEP 3.
  No test ties the migrations' codes to the list.
- **The forms allowlist** `scripts/conformance/forms-allowlist.txt`: `CF-FORM-3 src/features/admin/roles/roles-service.ts (1)`
  and `CF-FORM-3 src/features/admin/users/admin-users-service.ts (1)` leave in STEP 3 with their mappers
  (`roleErrorKey`; `profileEditErrorKey` + `needsAliasReason`). The CF-FORM-1 lines of `role-detail.tsx`,
  `roles-list.tsx`, `user-detail.tsx`, `impersonation-starter.tsx` stay (wave 3's Field).
- **The public-surface allowlist** `scripts/public-surface-allowlist.txt` (`scripts/check-migrations.sh`, floor
  20261003215043): every GRANT to authenticated in a file after the floor needs its object's line. DROP + CREATE
  restates the grants of the ten doors (their return type changes — the "grant's signature changes" case of the
  SCOPE). Lines exist for `admin_update_profile` (:41), `end_impersonation` (:127), `begin_impersonation` (:131);
  seven are added — `assign_role`, `revoke_role`, `admin_create_role`, `admin_update_role`, `admin_delete_role`,
  `admin_set_role_permission`, `admin_set_account_status` — each "restated grant (not a new surface)". The readers
  are redeclared by `CREATE OR REPLACE` with no GRANT (their grants stand) and only `REVOKE … FROM PUBLIC` (the
  born-closed guard, `check-migrations.sh` :408, wants it in-file for every created function).
- **Other lists keyed by these names, unchanged:** `scripts/acceptance-doors-allowlist.txt` (by signature),
  `scripts/conformance/seller-names-allowlist.txt` (admin_get_user, admin_list_users, admin_update_profile,
  impersonated_get_profile), `scripts/check-identity-tags.sh` (begin/end_impersonation, tags only),
  `scripts/doors/check-doors-allowlist.txt` (no line of this family).
- **Shared-value tables** (`scripts/conformance/shared-value-tables.txt`): none of this family's tables (roles,
  role_permissions, user_roles, profiles, impersonation_sessions, audit_log) is listed.
- **The register** `docs/governance/mechanisms.md` row 119 (door gates and refusals): gains "roles, users,
  impersonation and audit on the shell (F1-2)" — through §14 Records (a lane never edits the register).

## old-file-readers

- `docs/features/admin-roles.md:34–35, :99` names 'system roles are immutable', 'role has members', 'core permission
  locked', 'permission is not assignable to custom roles' — rewritten to the codes in STEP 3.
- `docs/features/admin-users.md:83, :131, :134` names 'permission denied', 'seller alias already taken' (23505) — to
  the codes.
- `docs/features/admin-audit-security.md:26` ("super-admin only + impersonation:use step-up") — to the
  door_context reading.
- `docs/features/doors.md` — the families' progress gains F1-2.
- The e2e assertions of the `tests` item. No guard or script names a sentence of this family
  (`scripts/deny-tests/*` match 'permission denied for table …' and 'user not found' in their own operator logs —
  not this family's doors).
- Return shapes: `roles-service.ts:98` (uuid), `impersonation-service.ts:52` (table) — STEP 3.

## second-readers

- `src/components/shell/impersonation-notice.tsx` reaches `impersonation-service` through `loadOnce`;
  `src/components/shell/impersonation-notice.test.tsx` `vi.mock`s it. Outside SCOPE; the service's exported
  signatures stay (`fetchActiveImpersonation` unchanged; `beginImpersonation` keeps its `Promise<string>`), so neither
  changes.
- `src/features/admin/users/alias-reason.test.ts` imports `admin-users-service` by dynamic `import()`; STEP 3
  changes it with the mapper that leaves.
- No other `import()`, `loadOnce` or `vi.mock` of `roles-service`, `admin-users-service`, `impersonation-service` or
  `audit-service`.

## chunk-graph

CENSUS-ITEM chunk-graph: not applicable — no client module moves; the services change in place.

## environments

- The local proof stack (`bun run db:proof --fresh`, 127.0.0.1 only): me, before the push.
- CI's temporary backend: every lane applies the files on the push.
- ethio-staging: the supervisor applies them after the migration stop and reads the marks and bodies back; the
  proofs' first run on a shared database is that apply.
- ethio-prod: after the merge, by the same pairing lines.

## mechanisms

- `door_context` (20261106051600 :39): class → deactivation (`account_is_deactivated`) → `has_permission_scoped`
  (scope mode) → `require_step_up_if_needed` (skipped for staff-reader; P0009 kept) → `rate_gate(dial)`; the service
  role passes every gate and spends nothing. `door_refused` (:128): re-counts the dial unless the code is a gate code,
  meters `door_refusals`, sets `response.status` (401/403/428/429, else 400), returns `{ok:false, code:'P0D01',
  message, details, hint, refusals}`. `door_refuse` (20261106051500): P0D01 `code[:detail]`, code shape
  `^[a-z][A-Za-z]*$`. `has_permission_scoped`: match / global / filter / none, super admin passes every mode.
  `door_audit`: one row over `log_audit` with meta `{old, new}`.
- `readRefusal` (`src/lib/refusal.ts`) and `doorCode` (`src/lib/door-codes.ts`): read whole; a code not on the
  list draws the family's generic key.
- Audit in this family stays `log_audit` with each door's own meta shape (the audit console and AU/IMP/RP tests read
  `meta.role`, `meta.alias`, `meta.rule`, `meta.reason`, `meta.actor`, `meta.target`); `door_audit` would rewrap
  every meta as `{old, new}` — a behaviour change the brief does not number.

## first-download

From my own build at 13f204493 (`bun run build && node scripts/check-bundle-size.mjs`, log
`/tmp/ethio-scratch/f1-doors-2/bundle-base.log`, exit 0): entry JS 203.7 / 205 KiB, CSS 22.6 / 40 KiB. The
family's pages: `/admin/roles` 291.8 / 293, `/admin/roles_/$roleId` 272.3 / 273, `/admin/users` 291.9 / 293,
`/admin/users_/$userId` 288.2 / 289, `/admin/audit` 294.0 / 295, `/admin/impersonation_/$sessionId` 291.6 / 293.
Every other page within its ceiling (the full table is in the log: 47 pages, tightest `/admin/attributes` 337.0 /
338 and `/admin/countries` 326.5 / 327). The migration commit changes no client file; STEP 3 measures again.

## premises

1. The plan's test names (AS-1…7, R-1…3, IN) are not the tree's — corrected in `tests`.
2. The GO's list omits `admin_get_role` — added (`definition`).
3. "today's two impersonation doors are moved onto the shell as they are, behaviour unchanged": the shell's law
   changes three things that are named, not avoided — the gate order (step-up and the dial now come before the
   self / super-admin / reason checks, as door_context orders them), a refused begin now spends the impersonation
   dial (INC-844's re-count), and `end_impersonation` spends the dial its line names (it spent none).
4. `admin_list_roles` accepted roles:view as well; its line promises profiles:view and its one caller is the users
   screens (profiles:view) — the body takes the line's permission.
5. None of the three STOP conditions holds: every decision of ruling 1 holds for each door; no return type that
   changes has a caller outside SCOPE (`impersonation-notice.tsx` reads `fetchActiveImpersonation`, whose reader
   keeps its type); no file outside SCOPE is needed.

## findings

1. `end_impersonation` now spends the 30-a-day `impersonation` dial (its manifest line): beginning and ending a
   session spend two; a staff member who reaches the ceiling cannot end a session by hand (it still expires at 15
   minutes). An estimate to revisit with the dial's numbers.
2. `admin_update_profile` in match mode with a NULL country (the editor does not change the country) passes only a
   global holder; a country holder may set a user's country to its own country. INC-834 as the line says; named.
3. `admin_get_user` is global while `admin_list_users` filters: a country-scoped holder sees the filtered list and
   no detail. The manifest's choice (ruling 1 §4); named for the census of a later turn.
4. `assign_role` inserts the target's role without reading the user first: an unknown user id answers the raw
   foreign-key error (23503) — kept as it is (no numbered change); the client reads it as the generic key.
5. No security hole found.

## queued

- Ruling 4 §5(11): `e2e/admin-users.spec.ts:47`'s own bearer client folds onto `bearerClient`
  (`e2e/helpers/session.ts`) — built here, STEP 4.
- The plan §5 row F1-2 (`docs/governance/reports/f1-doors.stop-1.md` :475) — built here, with `definition`'s
  differences.
- `docs/governance/reports/f1-doors-1.report.md:244` (every door not yet behind door_context: F1-2…F1-7) — this
  family built here; the rest left to F1-3 → F1-7.
- `roadmap.md:13` and `:58` (the order of work; Foundations 1) — the tick is §14 Records.
- Ruling 1 §12 and f2-forms ruling 1 §8 (order) — no build item.
