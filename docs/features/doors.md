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
acceptance | codes | reason`. F1-3 corrected one cell's column name: `admin_end_package_price`
  is `row:package_prices.country_code` (held by F1-6b's census: the row's own market is the scope its overlap check touches). `manifest.ts` is the grammar; `catalogue.ts` + `identity.ts` read
  the migrations' last grant state and spell a function's identity as the live catalogue does.
- `check-doors.ts` — the self-test runs FIRST in every mode (twelve planted finding kinds —
  `missing-line`, `line-without-door`, `gate-missing-for-class`, `class-mismatch`,
  `grant-unseen`, `grant-without-caller`, `scope-mode-missing`, `row-column-unknown`,
  `grant-dropped`, `opt-out-over-step-up`, `reader-off-gate`, `helper-reason-unproven` — each must
  fire, a clean pair must fire nothing; `SELF_TEST=1` runs it alone). `reader-off-gate` (F1-7a
  ruling 1, decisions 4 and 9; DEC-408): a reader line whose body takes no `door_context` — a
  `signed-in-reader` or `staff-reader` always, a `public-reader` unless its reason is
  `public-data`, and a `public-data` reader whose body, or any function of schema public it names
  (followed through their bodies), reads its caller (`auth.uid()`, `auth.role()`, `auth.jwt()`, a
  `request.` setting). Both modes judge it. `helper-reason-unproven` (F1-7a ruling 1, decision 7;
  INC-1212): a `helper` line whose reason is `policy <name>, <name>, …` holds only when each named
  policy stands after the migrations and its text calls the function; a bare `policy` fires.
  `policies.ts` reads the migrations statically in apply order (`CREATE POLICY` sets a policy's
  text, `DROP POLICY` removes it; no migration alters one; a policy built by dynamic SQL is not
  read), and both modes use that reading. A helper may name `anon` (`sold_cutoff`: the three
  public-read policies run for visitors). `opt-out-over-step-up` (F1-6a ruling 1, Part A; INC-1195's class): a staff line whose
  step-up cell is `none:<DEC>` holds only when the permission it names is declared
  `requires_step_up = false` — `door_context`'s staff form asks the second factor whenever the row
  says so, so an opt-out over a step-up permission is a promise the door cannot keep.
  `step-ups.ts` reads each permission's newest declared flag from the migrations (`INSERT INTO
  public.permissions` rows with the flag before `assignable`, `UPDATE … SET requires_step_up` by
  `r.name = '<resource>'` with `p.action = …` / `IN (…)`, or `(r.name, p.action) IN (…)`); a
  value it cannot read, or a permission never written, fires. Both modes judge it. `grant-dropped` (F1-5a, rulings 1 and 2, static only): `catalogue.ts` records the
  roles a function held just before each `DROP FUNCTION`; when the same file re-creates the
  name, each role it neither GRANTs nor REVOKEs by name is a loss. A file stamped at or above
  `GRANT_DROPPED_FLOOR` (`20261115000000`, the day the per-file law began) is judged by the file:
  the loss fires whatever a later file does. An older file is judged by the result: the loss
  fires only when no later file gives the role back by the catalogue's end state (the two older
  losses still open at F1-5a, the service role on `admin_list_translations` and
  `admin_upsert_language`, were restored by its first file, DEC-392). No allowance. `row-column-unknown`
  (F1-3): a line's `row:<table.column>` cell names a column the migrations declare —
  `columns.ts` reads every `CREATE TABLE` column list, `ADD COLUMN` and `RENAME COLUMN … TO`,
  comments and `DO` blocks blanked; both modes judge it, with no allowance. Static mode (the guards job of `ci.yml`)
  judges the tree; `--live <tsv>` (the smoke lane of `local-backend-proof.yml`, the TSV from
  `--live-query` through psql) judges the backend's catalogue. The live query is the file
  `scripts/doors/live-query.sql`, printed verbatim — never a string code assembles (INC-1070: the
  first build joined its clauses without their boundaries and the lane's psql refused it). `judge.ts` holds the kinds; a
  legacy body (no `door_context`) is judged by the old caller-gates rule, a shell body by the
  literals its manifest line promises. Allowances in `check-doors-allowlist.txt` (`<kind> <key>
| reason | until`, the kit's grammar). `check-doors.test.ts` DOORS-1…13 (DOORS-13: the planted
  policies of `helper-reason-unproven` — created, dropped, not calling — and the tree's two helper
  lines; DOORS-12: every path of `reader-off-gate`, a caller read two calls deep included; DOORS-11: the planted permission rows of `opt-out-over-step-up` — fires over `listings:review`, not over `listings:reveal` — and the tree's flags; DOORS-10: the planted DROP + CREATE histories of `grant-dropped`; DOORS-8: the column census on a planted
  migration and every `row:` cell of the tree; DOORS-5: the printed query's clauses; DOORS-6: the live mode
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
- **F1-3 — translations, languages and the legal texts** (`docs/governance/briefs/f1-doors-3.md`;
  twelve files `20261114113500` → `20261114114600`, marks `20261114130000` → `20261114131100`,
  and `20261114130400`, mark `20261114150000`, which moves the two translation status doors onto
  `staff_translation`): of the family's forty manifest lines, 24 doors sit on `door_context` and
  the shell and 15 staff readers on its reader form; `translation_scope_ok` keeps its body for
  F1-7. The first doors scoped by their target row's country: `row:legal_documents.country_code`.
  Every void door answers `{ ok: true }`. The client reads the codes through `readRefusal` with
  the family's words: `TRANSLATION_REFUSALS` / `translationRefusalKey` (translations-service.ts;
  `permissionDenied:language` reads the scope line, `badValue:code` the code line; every code the
  doors raise has words, so none is drawn raw; a screen extends the family with its own layer's
  words — the languages page's `catalogEmpty` → the sync-first line) and `LEGAL_REFUSALS` /
  `legalRefusalKey` / `legalRefusalName` (legal-service.ts). The import route's relay answers a
  P0D01 refusal by its code, the shell's status and its detail (IMR-13); the translate route's
  writer reasons read the machine doors' codes (TRR-6). `DOOR_CODES` did not grow. The
  acceptance export passes the gate, spends `legal_export` and writes its audit line on every
  page; the client asks pages of the door's maximum, 5000, so one hour reads at most 60 × 5000 =
  300,000 acceptances, and a larger export is refused `rateLimited`, never cut short.
- **F1-4a — categories and attributes** (`docs/governance/briefs/f1-doors-4a.md`, ruling 1;
  nineteen files `20261115021400` → `20261115023200`, marks `20261115040000` →
  `20261115041800`): the family's 42 manifest lines (28 doors, 14 staff readers) sit on
  `door_context` and the shell or the reader form, the four import doors and
  `catalog_find_rebuild` among them. The doors the category imports call delegate to closed
  SECURITY INVOKER cores, so a core's code raises through the import's own shell and the whole
  file rolls back; a void door answers `{ ok: true }`, a create `{ ok: true, id }`, the picture
  accept `{ ok: true, accepted_at }`. Every sentence and console key the bodies raised is a code
  (`rankInherited` carries its diagnostic in the tail). The client reads them through
  `readRefusal` with the family's words, `CATEGORY_REFUSALS` (category-refusals.ts) and
  `ATTRIBUTE_REFUSALS` (attribute-refusals.ts): each code that replaced a console key reads that
  key's words, and a code that never had words reads as the console's generic line. The
  services call the doors through `rpc()` and read the answer through a shape guard
  (`answeredId`, in `src/lib/answered-id.ts` since F1-5a). `DOOR_CODES` did not grow.
- **F1-5b — the buyer's doors** (`docs/governance/briefs/f1-doors-5b.md`, rulings in
  `f1-doors-5b-ruling-1.md`; six files `20261117040300` → `20261117040800`, marks
  `20261117060000` → `20261117060500`): `save_listing`, `unsave_listing`, `report_listing`,
  `reveal_listing_contact`, `user_set_viewing_location`, `accept_legal` and the public door
  `public_listing` sit on `door_context` and the shell. Every call spends its line's dial in the
  gate, before the row is read (a repeat save, a refused report, every reveal tap and an unsave
  count: DEC-333's status line names it); a refusal after the gate counts once (INC-844). A
  refusal that was a returned `{ ok: false, reason }` is the shell's code (`ownListing`,
  `alreadyReported`, `badReason`, `noteTooLong`, `acceptanceRequired`, `placeNotOpen`); the reveal
  keeps two answers returned at 200 (`sellersCapReached`, whose flag must commit, and the
  new-account five with its reset time). The gate's `rateLimited` carried no reset time until
  F1-7a (INC-1170). The counters, `save_listing`, `report_listing`, `reveal_listing_contact` and
  `register_listing_photo` read their listing `FOR KEY SHARE` before the row keyed to it, so an
  ad deleted in between is the quiet answer, never a 23503 (INC-786, INC-821).
  `listing_reveal_count` holds no browser grant. The client reads the codes through `readRefusal`
  with the families' words: `SAVE_REFUSALS`, `REPORT_REFUSALS` and `CONTACT_REFUSALS`
  (`src/features/ad-page/ad-page-refusals.ts`, with the one reading of the code a screen branches
  on) and `LEGAL_ACCEPT_REFUSALS` (`src/features/legal/legal-accept-refusals.ts`, beside the
  screen: `legal-reader.ts` is on the shell's first download). `DOOR_CODES` did not grow.
- **DEC-380's exit rule is read narrowly (DEC-385)**: it binds a door that ends a live state its
  opener's dial rations (a session, a hold); a door that deletes, retires or unlinks a catalogue
  row is an edit and spends its family's dial (`admin_remove_category_pointer` and
  `admin_unlink_attribute` spend `staff_config`).
- **A door's optional argument (INC-942)**: `DoorArgs<F>` (src/lib/supabase-door.ts), the type
  `rpc()` takes, lets every argument be NULL — the database's declaration answers which NULL it
  accepts (a NULL it refuses is the door's `badValue:<arg>`), and an omitted key takes the
  argument's DEFAULT. CF-DOOR-ARGS (`scripts/conformance/door-args.test.ts`) finds, under src/,
  the literal `null` cast through `unknown` and (F1-4b) a door argument cast through `unknown` —
  a `p_…` property, or an object of them cast whole; its allowlist holds the sites of families
  not yet on the shell (the posting doors, F1-5a; the import gate's audit call) and no line of a
  family already moved. F1-4b closed INC-942's own sites: the locations console calls its doors
  through `rpc()`.
- **The lint `impersonation_reach`** (`public.security_lints()`, ERROR, baseline 0; DEC-381)
  holds `begin_impersonation`'s permission to `super_admin` alone on every push and every night.
- **F1-7a — the shell's rate limit and the readers** (`docs/governance/briefs/f1-doors-7a.md`,
  ruling `f1-doors-7a-ruling-1.md`; ten files `20261119150000` → `20261119150900`, marks
  `20261119170000` → `20261119170900`): `door_context`'s `rateLimited`
  carries the reset instant (`rateLimited:<resets_at>`, INC-1170) and `door_refused` no longer
  counts a `rateLimited` refusal a second time (INC-1196). Fifteen signed-in readers, the two
  impersonation readers and the two legal readers (`legal_in_force`, `legal_scheduled`, on the
  gate's `public` form: a signed-in-only kind refuses `notSignedIn`) take `door_context` first;
  their sentences are codes (`notSignedIn`, `notYourListing`, `notYours`,
  `badValue:group|page|search|mark|cursor`, `badSize`). `get_attribute_options_version`,
  `listing_contact_refusals` and `translation_scope_ok` keep their bodies for their SQL callers
  and close to the browser; the browser reads `<name>_read`, a reader on the gate.
  `listing_viewer_state(text)` answers the caller's own `{saved, owner}` for one ad (INC-1191) and
  `listing_saved` is dropped. Seven readers no person's code calls and thirty-one helpers close to
  the browser roles (DEC-407's form, each file's chain proof: every SQL caller runs as its owner
  or is itself closed). Eleven public readers stay off the gate as `public-data` (DEC-408); the
  helper lines left are `has_permission` and `sold_cutoff`, each by its policies (INC-1212).
- **F1-7b — the queued door corrections** (`docs/governance/briefs/f1-doors-7b.md`; eight files
  `20261120030000` → `20261120030700`, marks `20261120050000` → `20261120050700`): a check the database made
  before the door did answers by the door's own code. The places trigger
  (`locations_ancestry_guard`) refuses through `door_refuse` for every writer — its seven codes
  and `badCoordinates` (a latitude beyond ±90 or a longitude beyond ±180, or not a number) — so a
  door's shell answers them at 400 and meters them. `assign_role` refuses `badCountryCode` (a
  scope that is not two letters) and `unknownUser` (no account holds the person) before its
  insert (INC-1156); the three country doors check the code as text before it is held in a
  two-letter variable (`badCountryCode`, INC-1163). The planners and exports answer an unknown
  scope by `unknownCategory` / `unknownCountry`, `impersonation_target` by `noActiveSession`, and
  the translation core's own permission step by `permissionDenied:translations`. The places
  planner, its commit and the undo write a scope's own `countries` row only for a caller holding
  the right that row's change needs (INC-1164), read by `country_row_right` (a closed helper on
  `has_permission_scoped`, the country doors' rule): `countries:activate` (match) to open or
  close it, `countries:update` (global) for its fields and (match) for its root order. The
  preview names a missing right as the row's `permissionDenied` reason (detail `activate` or
  `update`), so the commit refuses `planHasRefusals`; the undo refuses `permissionDenied[:scope]`
  before it restores anything. `cat_import_plan`, `attr_import_plan` and `loc_import_plan` are
  redeclared by computed insertion (DEC-383), so the migration reader reads them as computed and
  `COMPUTED_BY_HAND` is empty. The read rules `attributes_public_read`, `cal_public_read` and
  `category_attributes_public_read` are dropped, and `category_attributes` loses its browser
  SELECT grants: no browser role reads the three tables directly (INC-1166).

## Tests

`e2e/door-refusals.spec.ts` DRF-1…6 (INC-409 ×2, a reader's refusal by code with no dial spent,
count-on-refusal through the shell, scope `match`, scope `global` / `filter`);
`e2e/auth-caller-gates.spec.ts` CG-2 (six retired doors), CG-4 (the code);
`e2e/legal-admin.spec.ts` LGA-22 (`base_languages`); the twelve tests of the retired doors
moved onto `edit_my_listing` (PR-27; ML-2, ML-4, ML-5, ML-6, ML-7; MLP-1, MLP-5; AL-5, AL-29;
LG-28) or withdrawn with their doors (PR-32, PR-46).
