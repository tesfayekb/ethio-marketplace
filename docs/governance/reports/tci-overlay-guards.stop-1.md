STOP — tci-overlay-guards part C: the standing guard's parser has its home outside SCOPE
DONE: parts A, B; part C's census, proof text, byte-identity check and db:proof (steps 0–3a, 3b up to the guard)
LEFT: part C's standing guard (STEP 3b's guard, its planted file, its OK lines); STEPS 4–6
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `34b687c74896e3f3f6374890ce41001d6470a062` (short `34b687c`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-18T15:49:36Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44339005082
  (the base's run, read from origin/ci-evidence; origin/dev is still 34b687c74; this branch has no
  run yet)
FILES:
docs/governance/briefs/tci-overlay-guards.md
roadmap.md
scripts/ci/lovable-branch-guard.test.ts
scripts/conformance/holds-its-box-allowlist.txt
scripts/conformance/holds-its-box.test.ts
supabase/migrations/20261118012200_8af8d6de-451a-42f7-9f4a-6d34dcd7cdc5.sql
supabase/migrations/20261118012400_64aca671-da4e-4957-9b60-d2507bbdec58.sql

## The conflict

The brief's SCOPE gives Part C's standing check to `scripts/check-migrations.sh` (and its fixtures or
a new `scripts/check-migrations.test.ts`). The guard has to read SQL grammar the guards do not parse
today: `DO $…$` blocks, `jsonb_build_object` key/value pairs, named arguments, `:=` assignments
followed to a fixed point, and `translate(…)` calls.

The register binds where that grammar lives. `docs/governance/mechanisms.md` row 125 (the migration
reader) says, in its extension column: "a new SQL grammar the guards must see is one parser function
here, never a second regex in a guard". Rule 10 K1: "extend it by a parameter, a row or a key —
never fork it". The newest guard of this kind follows that row: INC-1089's spanning-literal guard is
`spanningLiterals` in `scripts/conformance/migration-reader.ts`, called by `check-migrations.sh`
through `bun …/migration-reader.ts --spanning` (`scripts/check-migrations.sh:894-896`), proven in
`scripts/conformance/migration-reader.test.ts:99-108`, and named in
`scripts/conformance/wired.test.ts:225-227`.

Putting the guard in that home needs three files the SCOPE does not name:

- `scripts/conformance/migration-reader.ts`: a `randomTexts(sql)` parser function and a
  `--random-text <file>…` mode beside `--spanning`.
- `scripts/conformance/migration-reader.test.ts`: its MGR test on planted text.
- `scripts/conformance/wired.test.ts`: the CF-WIRED-1 line naming
  `migration-reader.ts" --random-text` as `check-migrations.sh`'s call.

Writing the guard in perl inside `check-migrations.sh`, as the SCOPE allows, would be the second
regex the register forbids. So I have not committed either form.

## What is already proven (for either form)

I wrote and ran a candidate in `check-migrations.sh`'s perl style. It is NOT committed; it is kept
at `/tmp/ethio-scratch/tci-overlay-guards/candidate/` (`check-migrations.sh.perl-candidate`, and
the two fixtures `bad-random-text-proof-example.sql` and `good-random-text-proof-example.sql`).
`scripts/check-migrations.sh` in the tree equals HEAD.

The exact pattern it checks soundly, at or after a floor of `20261118160000` (this turn's commit
hour), inside a `DO $…$` block with `--` comments removed:

- It refuses a `jsonb_build_object` pair keyed `'title'`, `'description'` or `'name'`, or a named
  argument `p_title`, `p_description` or `p_name =>`, whose value holds a random draw.
- A random draw is `gen_random_uuid()`, `md5(…)`, `random()`, `gen_random_bytes(…)` or `to_hex(…)`,
  or a variable assigned by `:=` (declared or in the body) from one, followed to a fixed point.
- A `translate(…, '0123456789', …)` maps the draw's digits to letters, and its value is no draw.
- Not judged: positional arguments (their parameter cannot be named from the file), values set by
  `INSERT` or `SELECT … INTO`, and assignment by a bare `=`.

The candidate's evidence:

- Self-test: the bad fixture's four statements are refused (a tainted tag in a title, a direct
  `md5(random())` description, a two-step chain into `p_title =>`, a `to_hex` name); the good
  fixture passes (the `translate` form, a hex key under `'id'` and `p_note`, a draw named only in a
  comment, a quoted `;`).
- Planted file: the old text of `20261118012400` (from HEAD, restamped to `20261118170000` in a
  scratch copy of the tree) ran through the whole script with `MIGRATIONS_DIR` pointed at that copy.
  It ended `Random-text guard FAILED` naming `v_title := jsonb_build_object('title', v_tag || '')`,
  exit 1.
- The old text of `20261118012200` is refused the same way (`admin_edit_listing_core(v_l1,
  jsonb_build_object('title', v_tag || ''), …)`).
- Both corrected files pass.
- At floor 0, no migration in the tree is named. This agrees with the census: only these two files
  had the shape.
- `bash scripts/check-migrations.sh` on the tree with the candidate: every OK line, then
  `Random-text guard self-test OK (the bad fixture's four statements are refused, the good one
  passes).`, `Random-text guard OK (floor 20261118160000).`, and `Migration guard OK.`

Part C's proof text (commit `826b6525e`):

- Each file changes one line inside `DO $proof$`: `v_tag := 'e2e-mig-f16a<n>-' ||
  translate(substr(v_hex, 1, 10), '0123456789', 'ghijkmnopr');`.
- Outside the proof blocks and comments, both files equal HEAD byte for byte.
- Each declared body md5 still matches: `admin_undo_listing_edit` 18889bb0…, `admin_move_listing`
  ae6ec4a7…, `admin_edit_listing` 315d2d2c….
- `bun run db:proof --fresh`: `db:proof PASS — applied 515/515, CLI 2.120.0, cold, 57 s`.

## The question

Which home does the random-text guard take?

1. (Recommended) The migration reader, as register row 125 says. Widen SCOPE to
   `scripts/conformance/migration-reader.ts` (`randomTexts(sql)`, `--random-text`),
   `scripts/conformance/migration-reader.test.ts` (an MGR test on planted text) and
   `scripts/conformance/wired.test.ts` (one CF-WIRED-1 line). `check-migrations.sh` gains the floor,
   the call and the fixture self-test, in the spanning-literal guard's form, with the same pattern
   and fixtures as above.
2. The perl candidate in `check-migrations.sh` as written, recorded under Departures as a second
   parser against register row 125, with a slip in Records for a later move into the reader.
