# The door mechanism (DEC-333) — Foundations 1

Every browser-callable database function is a **door**. A door answers its gates in ONE order,
through ONE function, and refuses with a **code** the client maps — never a sentence. This page
names the mechanism F1-1 built; the plan is `docs/governance/briefs/f1-doors.md`, its census
`docs/governance/reports/f1-doors.stop-1.md`, the rulings `f1-doors-ruling-1.md` and
`f1-doors-ruling-2.md`.

## The SQL side (M-F1a, six migration files `20261106051500` → `20261106052000`)

- `door_refuse(code, detail DEFAULT NULL)` — RAISE SQLSTATE `P0D01`, message `code[:detail]`; a
  code is one camelCase word.
- `door_ctx` — `(uid, role, countries, dial_remaining, resets_at)`, what `door_context` answers.
- `door_context(p_class, p_resource, p_action, p_dial, p_country, p_scope_mode DEFAULT 'none')` —
  the one law order: caller class (`owner` | `staff` | `public` | `reader` | `staff-reader`) →
  not deactivated (`accountDeactivated`) → the permission with its scope
  (`has_permission_scoped`, `permissionDenied[:scope]`) → step-up (`require_step_up_if_needed`,
  P0009 kept: the server's 428 and the client's dialog read it; `staff-reader` skips it) → the
  dial (`rate_gate`, `rateLimited`; readers spend none) → the work. A signed-out caller is
  `notSignedIn` for every class but `public`; the service role (a job, not a person) passes
  every gate and spends no dial. New dial: `account_pref` (60 an hour, an estimate) for
  `user_set_preferred_language`.
- `has_permission_scoped(uid, resource, action, country, mode)` — modes `none` (plain
  `has_permission`), `match` (a global grant, or a country grant for the country), `global` (only
  a global grant), `filter` (any grant; `countries` = the scoped set, NULL = all). A super admin
  passes every mode. `has_permission(uuid,text,text)` is unchanged but for INC-409's first
  branch: an authenticated caller asking about another person reads `false` (never a RAISE —
  policies read it); a super admin and the service role still read the truth.
- **The shell** — a door on the mechanism ends `EXCEPTION WHEN SQLSTATE 'P0D01' THEN RETURN
public.door_refused(<name>, <dial>, SQLERRM)`. `door_refused` counts the refusal against the
  dial (except `notSignedIn`, `accountDeactivated`, `permissionDenied`, `stepUpRequired`),
  upserts `door_refusals(door, code, day, count)`, sets the response status (401 / 403 / 403 /
  428 / 429, else 400) and returns `{ok:false, code:'P0D01', message, refusals:[{reason,
detail}]}` — supabase-js surfaces it as `error.message` = the code. A RAISE that leaves the
  function (P0009 from `require_recent_password`, a reader's `door_refuse`) rolls the count back.
- `door_audit(ctx, action, entity_type, entity_id, old, new)` — one `log_audit` row with
  `jsonb_strip_nulls({old, new})`.
- `base_languages()` — the enabled admin languages beyond the base pair and the hidden tag, for
  the legal editor (INC-850), behind `door_context('staff-reader', 'legal', 'edit', …, 'global')`;
  read by `listBaseLanguages` (`src/features/admin/legal/legal-service.ts`, a shape guard, LBL-1…3)
  through `useBaseLanguages`; the editor keeps no language filter of its own.
- The account doors on the shell whole: `has_password`, `get_my_permissions`,
  `get_my_translator_languages` (readers), `remove_own_password` and
  `user_set_preferred_language` (now `RETURNS jsonb`), `change_home_country` (its envelope
  answers kept). `relist_listing`, `edit_listing` and `set_listing_price` are retired (DEC-335):
  the browser roles' EXECUTE revoked, `edit_my_listing` is the seller's one edit door.

## The guard (DEC-334) — `scripts/doors/`

- `manifest.txt` — one line per browser-callable function of schema public (265 at F1-1: 32
  owner, 91 staff, 1 public door, 22 public readers, 28 signed-in readers, 56 staff readers, 35
  helpers): `name(arg types) | class | roles | permission | step-up | dial | audit | country |
acceptance | codes | reason`. `manifest.ts` is the grammar; `catalogue.ts` + `identity.ts` read
  the migrations' last grant state and spell a function's identity as the live catalogue does.
- `check-doors.ts` — the self-test runs FIRST in every mode (seven planted finding kinds —
  `missing-line`, `line-without-door`, `gate-missing-for-class`, `class-mismatch`,
  `grant-unseen`, `grant-without-caller`, `scope-mode-missing` — each must fire, a clean pair
  must fire nothing; `SELF_TEST=1` runs it alone). Static mode (the guards job of `ci.yml`)
  judges the tree; `--live <tsv>` (the smoke lane of `local-backend-proof.yml`, the TSV from
  `--live-query` through psql) judges the backend's catalogue. The live query is the file
  `scripts/doors/live-query.sql`, printed verbatim — never a string code assembles (INC-1070: the
  first build joined its clauses without their boundaries and the lane's psql refused it). `judge.ts` holds the kinds; a
  legacy body (no `door_context`) is judged by the old caller-gates rule, a shell body by the
  literals its manifest line promises. Allowances in `check-doors-allowlist.txt` (`<kind> <key>
| reason | until`, the kit's grammar). `check-doors.test.ts` DOORS-1…7 (DOORS-5: the printed query's clauses; DOORS-6: the live mode
  judges the tree census too — INC-1072: a `grant-without-caller` allowance the live mode never
  judged read as stale and killed the smoke lane's first live run; DOORS-7: a body the
  migrations hand over in chunks — `migration_text_parts` INSERTs assembled and EXECUTEd at
  apply, `attr_import_plan` alone at F1-1 — reaches the live catalogue whole but the static one
  as a single chunk, so `treeCallers` reads the chunks as bodies of their `fn` and both censuses
  see the same calls — INC-1072's other half: the smoke lane's second live run read the
  `attr_option_norm_v2` allowance as stale because chunk 2 calls it), named in
  `scripts/conformance/wired.test.ts`.
- `scripts/check-caller-gates.ts` and its allowlist and fixture are retired (DEC-334's frozen
  rule: the new step gates only after it has failed on its planted fixtures in the same run).

## The client — `src/lib/door-codes.ts`

`DOOR_CODES`, `doorCode(error)` (reads a string, `{message}` or `{refusals}` and answers
`{code, detail}` — a sentence or an unknown word is `null`), and the one generic key
`door.refused`. A screen maps a code to its own key where it has one (`auth.errorLastMethod`
for `lastSignInMethod`) and shows the generic line otherwise.

A family's screens turn may add its doors' codes to `DOOR_CODES` ahead of the family's shell
turn (DEC-349): P-2 (b) added the levels family's thirteen (`listingNotFound`, `notLive`,
`notPaused`, `unknownLevel`, `sameLevel`, `lowerLevel`, `listingNotPlaced`,
`levelNotAvailable`, `seasonEnded`, `notOffered`, `marketNotSet`, `creditsNotAvailable`,
`noFreeSlot`) ahead of F1-5a, so the Promote sheet names `set_listing_level`'s and
`promote_options`'s refusals by code (DRC-6). The reader door `promote_options(uuid)`
(`signed-in-reader`, P-2 (b) M-2a) has its manifest line and its caller,
src/features/my-listings/promote-service.ts.

## The families on the door

- **F1-2 — roles, users, impersonation and the audit log** (`docs/governance/briefs/f1-doors-2.md`;
  six files `20261114070400` → `20261114070900`, marks `20261114090000` → `20261114090400` and
  `20261114100000`): ten doors on `door_context` and the shell (`assign_role`, `revoke_role`,
  `admin_create_role`, `admin_update_role`, `admin_delete_role`, `admin_set_role_permission`,
  `admin_set_account_status`, `admin_update_profile`, `begin_impersonation`,
  `end_impersonation`), nine staff readers and `get_active_impersonation` on its reader forms;
  its client reads the codes through `readRefusal` with each family's words (`ROLE_REFUSALS`,
  `PROFILE_EDIT_REFUSALS`), and a code without words reads as the screen's own generic line.
  `DOOR_CODES` did not grow: the list sits in the entry, so a code on it moves every page's
  first download, and none of this family's screens reads a code the words do not name.
- **The manifest's grammar gained two rules (DEC-380)**: an `arg:` country names the country of
  the row the door writes or creates — an argument that is a new value for an existing row's
  country is not a scope, and such a door is `row:` or `global` (`admin_update_profile` is
  `global`, INC-1151); a door that only closes what another door opened names a dial other than
  its opener's (`end_impersonation` spends `account_pref`, INC-1152).
- **The lint `impersonation_reach`** (`public.security_lints()`, ERROR, baseline 0; DEC-381)
  holds `begin_impersonation`'s permission to `super_admin` alone on every push and every night.

## Tests

`e2e/door-refusals.spec.ts` DRF-1…6 (INC-409 ×2, a reader's refusal by code with no dial spent,
count-on-refusal through the shell, scope `match`, scope `global` / `filter`);
`e2e/auth-caller-gates.spec.ts` CG-2 (six retired doors), CG-4 (the code);
`e2e/legal-admin.spec.ts` LGA-22 (`base_languages`); the twelve tests of the retired doors
moved onto `edit_my_listing` (PR-27; ML-2, ML-4, ML-5, ML-6, ML-7; MLP-1, MLP-5; AL-5, AL-29;
LG-28) or withdrawn with their doors (PR-32, PR-46).
