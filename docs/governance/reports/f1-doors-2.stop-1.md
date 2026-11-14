MIGRATION — f1-doors-2 part STEP 2: the family's doors on the shell (five files, one stop)
DONE: STEP 0 (task saved, 72b8dbfa0), STEP 1 (the census, d32be9ad4), STEP 2 (the migration, 5e54ac8a6)
LEFT: STEPS 3–7 (the client, the tests, the gate, the push, the report) — after the supervisor's ruling (types patch + Amharic)
CI: not yet run for this lane — the draft pull request https://github.com/tesfayekb/ethio-marketplace/pull/43 opens with this push; origin/dev 13f204493 (the base) has not moved since STEP 0
FILES:
docs/governance/briefs/f1-doors-2.md
docs/governance/reports/f1-doors-2.census.md
docs/governance/reports/f1-doors-2.stop-1.md
roadmap.md
scripts/doors/manifest.txt
scripts/public-surface-allowlist.txt
supabase/migrations/20261114070400_7102c888-3b97-4325-b985-2b978069b94e.sql
supabase/migrations/20261114070500_49f4b94e-d1ee-4c15-ba74-e341ec6dd872.sql
supabase/migrations/20261114070600_76ce28de-461b-4151-9abf-0a7d50636feb.sql
supabase/migrations/20261114070700_e30e4335-cc03-424b-9516-ab275a8801e1.sql
supabase/migrations/20261114070800_d66e79e1-b11c-44ab-9310-f43c84d86d67.sql

## The pairing (apply in this order on ethio-staging; each file's pre-check refuses to run before the one above it)

apply 7102c888 → expect mark 20261114090000
apply 49f4b94e → expect mark 20261114090100
apply 76ce28de → expect mark 20261114090200
apply e30e4335 → expect mark 20261114090300
apply d66e79e1 → expect mark 20261114090400

Third step of the pairing, after the five marks read back: regenerate the client types
(`src/integrations/supabase/types.ts`) — ten functions change their return type to `Json`
(assign_role, revoke_role, admin_create_role, admin_update_role, admin_delete_role,
admin_set_role_permission, admin_set_account_status, admin_update_profile, begin_impersonation,
end_impersonation); the nine readers and get_active_impersonation keep their shapes.

The proofs' first run on a shared database is the staging apply: until then they have run only on
the throwaway local stack (`bun run db:proof --fresh`) and will run on CI's temporary backend on
this push.

db:proof: `db:proof PASS — applied 442/442, CLI 2.120.0, cold, 53 s`

pre-stop scan: 7 of 7, 7102c888, 49f4b94e, 76ce28de, e30e4335, d66e79e1

## The files

| # | File | sha256 | Mark | Concern |
|---|---|---|---|---|
| 1 | `20261114070400_7102c888-3b97-4325-b985-2b978069b94e.sql` | `a91ea52ca9a4e277d8227cad505e0d12e9f2d844b6e814b217d9425fc374e68b` | 20261114090000 | role assignment: assign_role (match, INC-834), revoke_role |
| 2 | `20261114070500_49f4b94e-d1ee-4c15-ba74-e341ec6dd872.sql` | `52b0db6507e0ba0864e4c7c67bdece7e9652f55681b10187e0f944bf41fd639f` | 20261114090100 | role definition: admin_create_role, admin_update_role, admin_delete_role, admin_set_role_permission |
| 3 | `20261114070600_76ce28de-461b-4151-9abf-0a7d50636feb.sql` | `d67ad2ec58e151283047f23a64b8824a97a2452bf7d94aa822513097398afb40` | 20261114090200 | the user doors: admin_set_account_status, admin_update_profile (match, INC-834; its dial staff_moderation, INC-1038) |
| 4 | `20261114070700_e30e4335-cc03-424b-9516-ab275a8801e1.sql` | `045cdef957f00c84dd563cb5c769daec0d3a0d67da0820296ff8e331478b5e2a` | 20261114090300 | impersonation: begin_impersonation, end_impersonation, the reader get_active_impersonation |
| 5 | `20261114070800_d66e79e1-b11c-44ab-9310-f43c84d86d67.sql` | `5ad75d3b78f4292891da6a21046ad87c60652b1d90fe43c9a2d66664da4300fb` | 20261114090400 | the nine staff readers (admin_list_users filter, INC-834; the rest global) |

Sizes: 21.6, 27.0, 27.0, 22.1 and 27.6 KB. The census planned four files; the first (all six role
doors, 37 KB) was over rule 30's "about 25 KB", so it is split by concern into role assignment and
role definition, each with its own mark, proofs and pre-check chain.

Each file: a `$pre$` block (the previous mark applied — file 1 reads the ledger's newest
20261109110000 plus door_context, door_refused and the dial; files 2–5 the previous part's mark
and one return type it changed — and the live md5 of every body it redeclares), the whole
redeclarations, each door's COMMENT, its closers, one `$proof$` block on scratch rows under a
sentinel rollback, and the mark last.

## Every redeclared body — previous and new md5 (`md5(replace(prosrc, chr(13), ''))`)

| Function | File | Previous md5 | New md5 |
|---|---|---|---|
| assign_role(uuid,text,character) | 1 | 8c494275feb267bbb2b9402929709981 | 1546e9c54840be08feb2f509b1e18958 |
| revoke_role(uuid,text) | 1 | 88478a12f150718f1342c5219a9fe94e | ab80b44d06a5858a043cd4e3c5bd7923 |
| admin_create_role(text,text,text) | 2 | 4fd93dc4907b353ea7acd55729ed14d0 | 0827e879b29b39a6df01728247ef6a3a |
| admin_update_role(uuid,text,text) | 2 | 8283039b93b2111395e5149041df379d | 7030c27da6f60577abce0fcc11a86972 |
| admin_delete_role(uuid) | 2 | 2ba6a6eddc588483b8121fb9fe097908 | 0f1126eb277c2f672889d2afa45adda1 |
| admin_set_role_permission(uuid,uuid,boolean) | 2 | 83a47472db5215de27fec82afb9c01c6 | e971cfa19aaa7aba816e99ca7c318e0f |
| admin_set_account_status(uuid,text,text) | 3 | fd8c13195dcc80c85d1d7d6a8e5ab7f1 | a0a03ca83a23ae2640bc5749d5f2e49c |
| admin_update_profile(uuid,text,text,character,text) | 3 | 0c81e815191566e5c8cd298754d729d7 | e090d5a3debbf646f9df49911ef10b24 |
| begin_impersonation(uuid,text) | 4 | 17dc83839234800e063c63daf2c13eff | 71d3951ce07aef565bb0ab763cd7cf53 |
| end_impersonation(uuid) | 4 | 7e7fba195064fb0303cff2b4d832d5fa | a137b26ca25c398eef75a5f44b53b4dc |
| get_active_impersonation() | 4 | c8b8863e56899e153d8e738416522cca | 20c2194b0746f0634601948f5f791cec |
| admin_list_users(text,text,text,integer,integer) | 5 | ea0247997aff648cdbdca68a62d22352 | 03329d6df73a8b6eaebecf914a50b4d6 |
| admin_get_user(uuid) | 5 | af136b5d6ba4d3806b268b8229f0a4be | 4e951b5348fca85e70d47aa150d771be |
| admin_list_roles() | 5 | 3be262ba188a2eff3fa37a59d7c387be | 7e03c157989fea281a38f4df718d7de6 |
| admin_list_roles_detailed() | 5 | 69ad8c2392d36279a674e5b87178599d | 6c6902f40b51985088afac61ac7b270c |
| admin_get_role(uuid) | 5 | 73228e2ec085b5d5e7aa73a414f71891 | 062dff559107ebdaebaab6d9fe3b6427 |
| admin_user_activity(uuid,integer) | 5 | 06a853d09b6801389996f7162382415b | ebed193a543c5725f6884139f4c6a6ee |
| admin_list_audit(text,text,text,timestamptz,timestamptz,integer,integer) | 5 | 525ba63e176efa805e396e0782913a17 | b56f0f1475fa5e57f37b58f8462a5409 |
| admin_audit_facets() | 5 | d5a60e97c1464f522e3b7940c304dc02 | 4201f9dca9ff2243f65e0e5b9a8fc433 |
| admin_audit_stats(integer) | 5 | 5eab6b70e7751a323a0a40a7d1c116c9 | f52f725f36c4b4b11c42a64693e4446f |

Each previous md5 is the pre-check's value (the live body must carry it or the file refuses to
apply); each new md5 is asserted by the file's own proof (a) against the body it just declared.
The nine readers' new bodies differ from their last declarations only in the gate (a
`door_context('staff-reader', …)` call for the `has_permission` IF), admin_list_users' one country
predicate, admin_get_role's `CREATE OR REPLACE` (its last declaration was a plain CREATE) and the
statement's closing `;` (checked by diff against the bodies read from the last declarations).

## Each dropped and re-created function, with its grants

The ten doors returned `void` (uuid for admin_create_role; a TABLE for begin_impersonation), which
cannot carry the shell's answer, so each is `DROP FUNCTION` + `CREATE FUNCTION … RETURNS jsonb`,
the same argument list and defaults, then restated:

```
REVOKE ALL ON FUNCTION public.<name>(<args>) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.<name>(<args>) TO authenticated;
GRANT ALL ON FUNCTION public.<name>(<args>) TO service_role;
```

for: assign_role(uuid, text, character); revoke_role(uuid, text); admin_create_role(text, text,
text); admin_update_role(uuid, text, text); admin_delete_role(uuid); admin_set_role_permission(uuid,
uuid, boolean); admin_set_account_status(uuid, text, text); admin_update_profile(uuid, text, text,
character, text); begin_impersonation(uuid, text); end_impersonation(uuid). Each proof (a) asserts
SECURITY DEFINER, VOLATILE, `search_path=public`, RETURNS jsonb, no PUBLIC entry in the ACL, no
anon EXECUTE, and EXECUTE for authenticated and service_role.

The ten readers (get_active_impersonation and the nine staff readers) are `CREATE OR REPLACE` (same
return shapes; their ACLs carry over) with `REVOKE ALL … FROM PUBLIC, anon;` restated for the
born-closed guard and no GRANT; each proof (a) asserts STABLE, SECURITY DEFINER, `search_path=public`,
no PUBLIC or anon EXECUTE, and EXECUTE for authenticated.

`scripts/public-surface-allowlist.txt` gains seven `restated grant (not a new surface)` lines (the
guard's own census named them: assign_role, revoke_role, admin_create_role, admin_update_role,
admin_delete_role, admin_set_role_permission, admin_set_account_status); admin_update_profile,
begin_impersonation and end_impersonation already had theirs. `scripts/doors/manifest.txt`: the ten
doors' codes cells move from `-` to the codes their bodies refuse (the judge pairs the cell with the
body's `door_refuse` literals, so the cells change in the migration's commit).

## The codes (no new or changed string key)

Every new or changed string key with its English: **none**. The doors refuse codes; the client turn
(STEP 3) maps them to the family's existing keys through `readRefusal`.

Codes reused (already declared elsewhere): nameRequired, badSlug, duplicateKey:name,
hasDependents, badValue:status, required:reason, unknownUser, unknownCountry, aliasShape,
aliasTaken, aliasReserved:<rule>, badLength:reason. New codes: roleReserved:<role>, unknownRole,
systemRole, unknownPermission, permissionReserved, corePermission, impersonateSelf,
impersonateSuperAdmin, sessionActive, noActiveSession. Gate codes from door_context:
notSignedIn, accountDeactivated, permissionDenied, permissionDenied:scope, stepUpRequired.

## The proofs (each file)

(a) catalog facts and the md5 of every body; (b) the gates — a deactivated account →
accountDeactivated (403), a caller without the permission → permissionDenied (403), neither
spending the dial nor writing, and INC-834 (file 1: a country holder of roles:assign is refused a
global and another country's assignment, `permissionDenied:scope`, and assigns in its own; file 3:
the same for admin_update_profile's home country; file 5: a country holder's admin_list_users is
narrowed to its country and every global reader refuses it `permissionDenied:scope`); (c) every
code of every door with each earlier check cleared (law 14), the exact message and a 400, nothing
written or audited, each success with its row, audit line and answer, the dial counted once per
call past the gates (files 1–4: 6, 18, 13 and 9 calls) and door_refusals metered (4, 13, 9 and 7
refusals); file 5: no reader spends a dial and the global holder reads all nine with no second
factor.

Guard lines (`bash scripts/check-migrations.sh`, exit 0):

```
Born-closed guard OK (floor 20261007143529).
Definer guard OK.
Self-marking guard OK (floor 20260817054246).
Public-surface guard OK (floor 20261003215043).
Real-row proof guard OK (floor 20261007000000).
Spanning-literal guard OK (floor 20261109000000).
Migration guard OK.
```

`bun scripts/doors/check-doors.ts`: `check-doors static OK: 265 manifest lines reconcile with the
migrations' catalogue`. `bun run typecheck` and `bun run lint` exit 0. `bunx vitest run scripts
--maxWorkers=2`: 119 files, 615 passed, 1 skipped.

## Decisions taken in the files (for the ruling)

1. Audit stays `log_audit` with each door's own meta (the consoles and the tests read those meta
   shapes); `door_audit` would rewrap them. The judge pairs `door_audit` only when present.
2. admin_list_roles accepted roles:view OR profiles:view; it now takes its manifest line's
   profiles:view alone (its one caller is the users console). A roles:view-only holder is refused
   (proven in file 5).
3. begin_impersonation's "super admin only" rule becomes the manifest's impersonation:use
   permission; file 4's pre-check refuses to apply if impersonation:use is assignable or reached
   through get_role_hierarchy by any role but super_admin, so the rule holds as written.
4. The gate order moves to door_context's: permission → step-up → dial before the door's own
   checks, so a refused begin_impersonation now spends the impersonation dial (it raised before
   the gate). end_impersonation (owner, manifest dial impersonation) now spends that dial too.
5. The manifest's codes cells change in the migration's commit: a commit is never red, and the
   static judge pairs cell and body.
6. The seven public-surface lines are read as the "a grant's signature is restated" case
   (DROP + CREATE), not a new surface.
7. In file 4's gate proof the deactivated caller is not a super admin: `profiles_status_guard`
   refuses to deactivate a super admin, and door_context checks deactivation before permission,
   so a deactivated account must answer accountDeactivated whatever it holds.
8. Scratch permission rows use a resource name held in a variable and action words that already
   carry their matrix keys (edit, view, update), so PV-1's vocabulary census reads no scratch name
   as a seeded one (its first run on this tree named `e2e_mig_res_`, `grant` and `core`).

## Expected CI reds on this push (until STEPS 3–4)

The pull request's CI builds its temporary backend from every migration, so the new return types are
live there while the client still reads the old ones:

- the roles UI flows through `createRole` (it casts the answer to a string id) and every role,
  account-status and profile-edit flow that reads a refusal sentence;
- IMP-1 and IMP-2 through `beginImpersonation` (it reads `data[0].session_id`);
- the sentence-reading test ids: RP-4 (`/system role/i`), RP-5, RP-11, AU-6, AU-14, MF-4 (:193),
  IMP-3, IMP-5;
- the two mappers (`roleErrorKey`, `profileEditErrorKey` / `needsAliasReason`) answering the
  generic line for codes;
- the preflight job's "STAGING BEHIND" until ethio-staging holds mark 20261114090400.

## Scratch

`/tmp/ethio-scratch/f1-doors-2/` (the operator's to remove): the base first-download log, the
previous bodies, the md5 filler, the split and rechain scripts, the guard and proof logs.
