# Bundle 12 — the tidy-up round, turn T14: the plans table read by column, and the two whole-tree guard tests' own timeout (INC-594): brief, version 1 (saved unchanged, 2026-10-13)

```text
BUNDLE 12 — THE TIDY-UP ROUND (D145) — TURN T14 (2026-10-13). ONE TURN, ONE MIGRATION. No new strings. No package change. No app code.
Base: dev 5753740e (turn T13's landing). The census below proves every file by content. This file is public: it is written as build instructions.
Tier A: the browser roles' SELECT on `coverage_plans` moves from the table to its columns (one migration, its proofs, the public-surface allowlist line).
Tier B: one new E2E test (CV-8), two unit tests given their own timeout (INC-594), the coverage doc, the roadmap and the changelog.

ANSWERS TO THE LAST TURN
- Turn T13 landed byte for byte (5753740e): the four paths equal the supervisor's copy, and the brief equals the upload. One commit on the way is titled "No carrier attached in T13"; the final tree is the brief's, so nothing is owed for it.
- CI on 5dd4f810 (turn T12) is green. CI on 5753740e may still be running; a fix it needs comes in the next turn.
- The unit output written straight to its file instead of through `tee` is fine, as long as the file holds the whole output.

WHAT THIS TURN BUILDS
- PART 1 — the migration (the appendix; read it whole):
  - A. `REVOKE SELECT ON public.coverage_plans FROM anon, authenticated;` then `GRANT SELECT (plan, max_cities, max_regions, max_countries, allow_everywhere, updated_at, max_photos) ON public.coverage_plans TO anon, authenticated;`. The browser roles read every column except `updated_by`, which no screen shows. A REVOKE of a table privilege also revokes it from every column, so the GRANT follows the REVOKE. Every other privilege on the table is left as it is.
  - B. Proofs, none of which reads or writes a row:
    - B1: the table has exactly the eight columns, in the census's order;
    - B2: anon and authenticated hold SELECT on every column but `updated_by`, and no longer on the table; service_role keeps SELECT on the table;
    - B3: as each browser role (`SET LOCAL ROLE`, then `RESET ROLE`), a read naming `updated_by` is refused with 42501, and a read of the other seven columns is planned without error. Every read is `WHERE false`.
- scripts/public-surface-allowlist.txt — one line naming `coverage_plans`. The migration guard requires it for any grant to anon or authenticated; without it, the guard fails.
- e2e/admin-coverage.spec.ts — CV-8 (NEW), in its own describe at the end of the file, and `import { createClient } from "@supabase/supabase-js";` after the Playwright import:
  - an anonymous client and a leased signed-in account each read the plan's own seven columns (no error, no row: the plan asked for is `e_probe_none`, which no row has);
  - each read naming `updated_by`, and each read of every column (`*`), is refused with code 42501.
- scripts/shell-guards.test.ts — INC-594: GW-1 and GW-2 each spawn a shell guard over the whole tree, twice. They now carry their own timeout (`TREE_SCAN_MS`, 30 s), with the cause in a comment. The scans take 0.3 s alone; GW-1 took 6.4 s in your turn T12's run, while the rest of the suite ran beside it, which is past vitest's 5 s default. The time is the spawned process waiting for a CPU, not the guard's work. No assertion changes.
- docs/features/coverage-console.md (a T14 section), the changelog, the roadmap (line 3 and the T14 line).

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- Only SELECT changes. The table's other privileges stay as they are; its policies allow only reads.
- The column list is written out. A column added to the plans table later needs its own grant, in the same migration that adds it.
- INC-594's timeout is 30 s, on the two whole-tree tests only (G38: the cause is named in the test).
- The new id is CV-8.

TESTS
- E2E: CV-8 (NEW). Not edited: every other E2E test.
- Unit: GW-1 and GW-2 gain a timeout; nothing else in them changes. 740 tests.
- The migration's proofs B1–B3. The supervisor applied the migration to a local PostgreSQL 16 copy, with the table built from the repository's own definitions and the browser roles holding every table privilege, as at the table's birth. It applied and its proofs passed; afterwards anon read `plan, max_photos` and was refused `updated_by` and `*`. On the old grants the proofs fail at B2 ("anon still holds SELECT on the table"), and they fail without the REVOKE as well.
- Red first: not run, because the local browser does not start (INC-506). On the base, anon reads `updated_by`, so CV-8 is expected to fail there. CI on this turn's commits before the staging apply shows it (the expected red window below).
- Leases: one pooled account.

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, dev 5753740e with this turn's files)
- Clean:
  - typecheck (it covers e2e/), format, lint (0 errors, 33 warnings);
  - 740 unit tests (125 files);
  - the usage maps (they match);
  - the selector self-test.
- `MIGRATIONS_DIR=<a copy with the migration as 20261013140000_t14-check.sql, its mark filled> bash scripts/check-migrations.sh`: "Migration guard OK" (born-closed, definer, self-marking, public-surface, real-row proof). Without the allowlist line it fails, naming `coverage_plans`.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-12-turn-14.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines. It may name turn T13's commit or T12's, with any conclusion. Whatever it shows, go on: the CI read is the supervisor's, and a fix it needs comes in the next turn. Do not stop on it. You cannot git-fetch that branch. Paste `git rev-parse HEAD`: this is <START>;
  2. step 0;
  3. the census (below). If any result differs from what it expects, STOP and report: write nothing else;
  4. the carrier, then the hashes;
  5. the checks;
  6. the migration LAST, then its read-back;
  7. the report;
  8. END THE TURN.
  Do not stop between steps.
- The migration is the last thing written, because the database tool applies it on ethio-prod the moment it is saved. The operator will see the "Modify Supabase database" dialog and allow it.
- The expected red window (G35): CI on any commit the platform pushes before the migration is on ethio-staging runs CV-8 against a staging database where anon still reads `updated_by`. There CV-8 fails ("updated_by was readable"). That is expected and is not fixed. Any other red in that window is NOT expected. CI on the final commit waits at its preflight ("STAGING BEHIND", up to 25 minutes) until the operator applies the migration on ethio-staging.
- If any rule of yours conflicts with the text, STOP before saving and quote that rule's exact words in the report.
- Production reads are SELECT-only. Reports carry counts, booleans and names of tables, columns, functions, roles and policies. Never an e-mail address, a user id, a token, a phone number or a row of user data.
- Tests (G38): no assertion loosened, no retry added. The only timeout this turn sets is INC-594's, named above. A test this brief does not name is not edited.
- Scope — these files only: the one new migration file (the database tool names it), the 6 carrier paths and the brief. The platform may regenerate src/integrations/supabase/types.ts; that is allowed, name it in the report. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-12-turn-14.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 6 files → each equal to:
  4a3c23151161a0b2dd5a6c1886b31e04cd0c9fbaf092d0c626aab53013b63a3d  docs/_changelog.md
  72d461a09acec81ef5e133c0ea094c2d231fb3892c6bf915bbeec2f5e0c51881  docs/features/coverage-console.md
  034d3ff39c8dde965edeb298df5b86632a6775d7e563b17e6a7a95ac4c36ff38  e2e/admin-coverage.spec.ts
  42e0a675e14b30d55d8b03dd2ac242cebe9dbe875db6e8357b63d9994f146e3f  roadmap.md
  b324d0ab6dbfd75db064f196348431aaa9ec79b7ad903b9beb506db85a84336e  scripts/public-surface-allowlist.txt
  e1a8e2b56c4e3b47585921a0fb1f4addd60059536f996c20cdae8158b0df6ed9  scripts/shell-guards.test.ts
- On ethio-prod with your query tool (SELECT only):
- (c) `select string_agg(column_name::text, ', ' order by ordinal_position) from information_schema.columns where table_schema = 'public' and table_name = 'coverage_plans';` → plan, max_cities, max_regions, max_countries, allow_everywhere, updated_by, updated_at, max_photos. Any other list is a STOP.
- (d) `select has_table_privilege('anon', 'public.coverage_plans', 'SELECT'), has_table_privilege('authenticated', 'public.coverage_plans', 'SELECT'), has_column_privilege('anon', 'public.coverage_plans', 'updated_by', 'SELECT');` → t | t | t.
- (e) `select max(version) from public.migration_marks;` → 20261013190000

THE CARRIER — T14-TURN-CARRIER-2026-10-13.md (6,957 bytes; sha256 3cd9419d11f108151bd1d211daa433fe45f72c4229d1ae08f06265b014e83029; 9 sections)
- Its first line starts "T14 TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`. No blank line separates the sections.
- Modes:
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file (INSERT-AFTER 0: at the top of the file);
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed.

THE HASHES — `sha256sum` each of the 6 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  0c75caa113519fadeab52a12f5908e3409b2ad1a069691704f6c6ab78021b804  docs/_changelog.md
  424c0cfb310a93e21fc08d46fef8217aea1e4498428a7c621a85f95ab2c4e854  docs/features/coverage-console.md
  2f3360fedd585d7f536aa62353969e25a7247e540152a689f3247f92fdc94f9c  e2e/admin-coverage.spec.ts
  66647153d9d26fa492a20ec89db61dfbc11e745bda2c41f091e71521dd3a3029  roadmap.md
  9364769630159fc40dc6d7b682f0388ca61548a3ce61d5d16fa7179877bfb035  scripts/public-surface-allowlist.txt
  b3a8ccc67aabf67186b01984c5104e69b50871a0ab11009850a652b275b0210b  scripts/shell-guards.test.ts

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings;
- `bun run test:unit 2>&1 | tee /tmp/unit-t14.log` — 740 passed (125 files). Keep the whole output; if any test fails, paste its name and its first error line;
- `bun run i18n:map-guard` "usage maps match the tree.";
- `bun run scripts/e2e-select.ts --self-test` OK;
- Not run by you: the typecheck, the build and the bundle budget (your platform's rule: "Do not run the Lovable project's builds or typechecks manually because the harness runs them automatically."). CI's jobs judge them; the supervisor ran the typecheck on its own copy.

THE BROWSER RUN — not this turn. CV-8 needs the migration on ethio-staging, which the operator applies after the turn; CI on the final commit is the proof (and the local browser does not start, INC-506).

THE MIGRATION RULES (G39 — every one applies)
- The text is between the BEGIN and END lines of the appendix below. Write it EXACTLY, changing only `<MARK>`. Before the change, its sha256 is 87b88c5832e837e25ec8b5c151af434ce15a4cd97ebf7d4283660376567eaae2 (4,217 bytes, 82 lines, ending with a newline).
- Check it in a scratch folder first (after the carrier, so the allowlist line is in place):
  - copy supabase/migrations/*.sql into a temporary folder;
  - add the text, its `<MARK>` replaced by the mark you will use, under the name 20261013140000_t14-check.sql (a stamp earlier than any mark you will choose);
  - run `MIGRATIONS_DIR=<that folder> bash scripts/check-migrations.sh`.
  Paste its "guard OK" lines and "Migration guard OK".
- `<MARK>` is chosen at apply time:
  - read now() at time zone 'utc' on ethio-prod;
  - round it up to the next whole hour and add one hour (add twelve hours instead if the save dialog may wait);
  - the mark must be later than the saved file's own stamp AND above 20261013190000 (the newest mark): if the reading gives 20261013190000 or less, use 20261013200000.
- Then hand the FINAL text to the database tool ONCE. Never a stub, a comment or a draft (INC-491).
- A clean apply is the proofs' pass: they RAISE EXCEPTION on any failure.

THE READ-BACK (ethio-prod, your query tool, SELECT only; paste each result)
- `select version from public.migration_marks where version = '<MARK>';` → one row;
- `select has_table_privilege('anon', 'public.coverage_plans', 'SELECT'), has_table_privilege('authenticated', 'public.coverage_plans', 'SELECT'), has_column_privilege('anon', 'public.coverage_plans', 'updated_by', 'SELECT'), has_column_privilege('authenticated', 'public.coverage_plans', 'updated_by', 'SELECT'), has_column_privilege('anon', 'public.coverage_plans', 'max_photos', 'SELECT'), has_column_privilege('authenticated', 'public.coverage_plans', 'max_cities', 'SELECT'), has_table_privilege('service_role', 'public.coverage_plans', 'SELECT');` → f | f | f | f | t | t | t.

THE REPORT
- Done or not done, by step.
- The six ci-status lines, and <START>.
- The census results (a)–(e).
- The 6 sha256sum lines and the brief's.
- `git diff --name-only <START>` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only <START> HEAD` too. Expect the 6 carrier paths, the brief and the one migration file (and types.ts if regenerated).
- The checks.
- The check-migrations "guard OK" lines; the mark and the now() reading it came from; the apply outcome; the read-back.
- The line "apply <uuid-fragment of the migration's filename> → expect mark <MARK>", for the operator's staging apply.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only). The database change is undone only by a new migration — never by editing this file.

AFTER THIS TURN (for the operator): apply the migration on ethio-staging (the SQL editor) and read back its mark; CI's preflight waits for it (up to 25 minutes) — if the run has already failed at the preflight, use "Re-run failed jobs". Nothing to Publish for this turn's own work (no app code), and nothing to walk: CV-8 proves both sides.

APPENDIX — THE MIGRATION TEXT (write it exactly; change only <MARK>)
----- BEGIN MIGRATION -----
-- Bundle 12 (the tidy-up round), turn T14 (2026-10-13). Tier A. The plans table: the browser roles read the plan's own columns.
-- e2e-areas: admin-coverage, posting
-- The rule: anon and authenticated may SELECT every column of coverage_plans except updated_by, which no screen
-- shows. The app reads plan, max_cities, max_regions, max_countries, max_photos, allow_everywhere and updated_at
-- (src/features/admin-coverage/coverage-service.ts); the wizard reads the limits through get_posting_schema; every
-- e2e read of the table goes through the service client. The plan limits stay public, as before.
-- Live beside file (ethio-prod, read in this turn's census): the columns are plan, max_cities, max_regions,
-- max_countries, allow_everywhere, updated_by, updated_at, max_photos; anon and authenticated hold SELECT on the
-- table. Only SELECT changes here; every other privilege on the table is left as it is.
-- A. The table-level SELECT of the browser roles replaced by a column-level one (a REVOKE of a table privilege
--    also revokes it from every column, so the grant follows the revoke).
-- B. Proofs: privileges read from the catalogue, and the browser roles' reads planned with WHERE false, so no row is
--    read or written.

-- ===== A — SELECT by column =====
REVOKE SELECT ON public.coverage_plans FROM anon, authenticated;
GRANT SELECT (plan, max_cities, max_regions, max_countries, allow_everywhere, updated_at, max_photos)
  ON public.coverage_plans TO anon, authenticated;

-- ===== B — proofs =====
DO $proof$
DECLARE
  v_cols    text[];
  v_col     text;
  v_role    text;
  v_state   text;
  v_err     text;
BEGIN
  -- B1: the table holds exactly the eight columns this file was written for.
  SELECT array_agg(c.column_name::text ORDER BY c.ordinal_position) INTO v_cols
    FROM information_schema.columns c
   WHERE c.table_schema = 'public' AND c.table_name = 'coverage_plans';
  IF v_cols IS DISTINCT FROM ARRAY['plan', 'max_cities', 'max_regions', 'max_countries', 'allow_everywhere',
                                   'updated_by', 'updated_at', 'max_photos'] THEN
    RAISE EXCEPTION 'T14 B1: the columns are not the ones this file was written for: %', v_cols;
  END IF;

  -- B2: each browser role reads every column but updated_by, and no longer holds SELECT on the table;
  -- service_role keeps SELECT on the table.
  FOREACH v_role IN ARRAY ARRAY['anon', 'authenticated'] LOOP
    IF has_table_privilege(v_role, 'public.coverage_plans', 'SELECT') THEN
      RAISE EXCEPTION 'T14 B2: % still holds SELECT on the table', v_role;
    END IF;
    FOREACH v_col IN ARRAY v_cols LOOP
      IF (v_col = 'updated_by') = has_column_privilege(v_role, 'public.coverage_plans', v_col, 'SELECT') THEN
        RAISE EXCEPTION 'T14 B2: % on column %: wrong SELECT privilege', v_role, v_col;
      END IF;
    END LOOP;
  END LOOP;
  IF NOT has_table_privilege('service_role', 'public.coverage_plans', 'SELECT') THEN
    RAISE EXCEPTION 'T14 B2: service_role lost SELECT on the table';
  END IF;

  -- B3: as each browser role, a read naming updated_by is refused (42501), and a read of the other seven columns is
  -- planned without error. WHERE false: nothing is read.
  FOREACH v_role IN ARRAY ARRAY['anon', 'authenticated'] LOOP
    EXECUTE format('SET LOCAL ROLE %I', v_role);
    v_state := NULL;
    BEGIN
      PERFORM c.updated_by FROM public.coverage_plans c WHERE false;
    EXCEPTION WHEN OTHERS THEN
      v_state := SQLSTATE;
      v_err := SQLERRM;
    END;
    IF v_state IS DISTINCT FROM '42501' THEN
      RESET ROLE;
      RAISE EXCEPTION 'T14 B3: % reading updated_by: expected 42501, got % %', v_role,
        coalesce(v_state, 'no error'), coalesce(v_err, '');
    END IF;
    BEGIN
      PERFORM c.plan, c.max_cities, c.max_regions, c.max_countries, c.allow_everywhere, c.updated_at, c.max_photos
        FROM public.coverage_plans c WHERE false;
    EXCEPTION WHEN OTHERS THEN
      v_err := SQLERRM;
      RESET ROLE;
      RAISE EXCEPTION 'T14 B3: % reading the plan columns was refused: %', v_role, v_err;
    END;
    RESET ROLE;
  END LOOP;
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('<MARK>') ON CONFLICT (version) DO NOTHING;
----- END MIGRATION -----
```
