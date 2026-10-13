# Bundle 12 — the tidy-up round, turn T10: the import gate's audit row is written only for a caller who holds that family's own permission, and the census of signed-in functions finished: brief, version 1 (saved unchanged, 2026-10-13)

```text
BUNDLE 12 — THE TIDY-UP ROUND (D145) — TURN T10 (2026-10-13). ONE TURN, ONE MIGRATION. No new strings. No package change.
Base: dev 0b089810 (turn T9's landing). The census below proves every file by content. This file is public: it is written as build instructions.
Tier A: `import_gate_audit` redeclared with one permission check; its proofs; the public-surface allowlist line for its restated grant.
Tier B: one new E2E test (IG-6), the imports doc, the roadmap and the changelog.

ANSWERS TO THE LAST TURN
- Turn T9 landed byte for byte (0b089810). Your reads settled INC-592: the published build has the route (401 with no token), and every photo row on ethio-prod is signable. The operator then reloaded the site fully and walked again. The photo shows on the photo step, in the side card and in both previews. The tab he first walked in was opened before the Publish. INC-592 is closed, with no defect.
- Part 2 of T9: read. The supervisor checked the bodies in the repository; the follow-up for one function is this turn's Part 1. Your fourth page came back full: the rest is Part 2 below.
- CI on 0b089810 (run 38357590372) failed on ethio-staging's server errors, not on code. Every failure reads "Internal server error." from the staging database (seeding, reaping), a socket closed while fetching, or a 502 from a page that could not reach it: SP-7, AT-46, PW-187, PW-59 and PW-93, with nine flaky passes of the same kind. Turn T9 changed docs only. Nothing to fix: this turn's own CI run is the next proof.

WHY THIS TURN
- The rule this turn builds: the import gate's audit row (`import_gate_audit`) is written only for a caller who holds that family's own permission. The permissions are the registry's (src/server/imports/registry.ts): attributes and categories `categories:import`, locations `locations:import`, translations `translations:manage`. Anyone else is refused with 42501, and nothing is written.
- The gate checks the same permission before it calls this function, so every import that writes a row today still writes it. IG-6 proves both sides.

WHAT THIS TURN BUILDS
- PART 1 — the migration (the appendix; read it whole):
  - A. `import_gate_audit(text, text, uuid, jsonb)` redeclared. Its header and body are the live text (census (c)) with one check added: the family's permission, read from a fixed list of the four families. Its REVOKE and GRANTs are restated as they were.
  - B. Proofs:
    - B1 reads the new check, the unchanged header and the unchanged grants from the catalogue;
    - B2 calls it as a random signed-in id with no role, once for each family and once for an unknown one: each is refused with 42501;
    - B3 calls it with no caller: refused as before;
    - B4 checks that no audit row was written.
- scripts/public-surface-allowlist.txt — one line naming `import_gate_audit`. A migration that restates a grant to `authenticated` must name the object there; without the line, the migration guard fails.
- e2e/import-security.spec.ts — IG-6 (NEW), in its own describe at the end of the file:
  - (a) a leased account with no role signs in and calls `import_gate_audit` straight at the database (REST, its own token) for each family. Each call is refused with `permission denied: import <family>`, and no `import.*` row is written for that account.
  - (b) the super admin previews an attributes links file (the header alone) through `/api/admin/attributes/import`: 200, and exactly one more `import.preview` row for `import:attributes` under the admin's id.
  - It adds `import { createClient } from "@supabase/supabase-js";` at the top of the file.
- docs/features/imports.md (the Audit step), the changelog, the roadmap (line 3 and the T10 line).
- PART 2 — a read (below).

PART 2 — THE LAST PAGE OF THE SIGNED-IN FUNCTIONS (read only; the rows stay in your report, never in a file, a commit message or a code comment — G51)
- Your T9 fourth page came back full. On ethio-prod, with your query tool (SELECT only), run this with OFFSET 160, then 200, and so on until a page holds fewer than 40 rows; paste every row (signature · has_permission · auth.uid() · anon can run):
  `select p.proname, p.oid::regprocedure::text as signature, position('has_permission' in p.prosrc) > 0 as names_has_permission, position('auth.uid()' in p.prosrc) > 0 as names_auth_uid, has_function_privilege('anon', p.oid, 'EXECUTE') as anon_can_run from pg_proc p join pg_namespace n on n.oid = p.pronamespace where n.nspname = 'public' and p.prosecdef and has_function_privilege('authenticated', p.oid, 'EXECUTE') order by p.proname, signature limit 40 offset <N>;`
- Run it before the migration (it is step 5 of the order), so it reads the functions as they stood.

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- The permission list lives in the function, the same four families as the registry. A family added to the registry is added here too (and to IG-6), or its audit row is refused. The census's `[ssr-error] … audit_failed` line shows it at once.
- An unknown family is refused like a missing permission (42501), not as a bad event (22023).
- No rate limit on the function: after this turn, only staff with an import permission can call it.
- The new id is IG-6.

TESTS
- E2E: IG-6 (NEW). Not edited: every other test.
- The migration's proofs B1–B4. The supervisor applied the migration to a local PostgreSQL 16 copy, with stand-ins for the tables built from the repository's own definitions. It applied, and its proofs passed. On the old body the proofs fail at B1, and B2 fails without the check. A caller holding `locations:import` writes `import.commit` for locations and is refused for attributes.
- Red first: not run, because the local browser does not start (INC-506). On the old body a signed-in account with no role gets its row written (the supervisor's local copy: B2 fails there), so IG-6 (a) is expected to fail on the base. CI on this turn's commits before the staging apply shows it (the expected red window below).
- Leases: one pooled account (DEC-174). The job super admin is not a pooled lease.

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, dev 0b089810 with this turn's files)
- Clean:
  - typecheck (it covers e2e/), format, lint (0 errors, 33 warnings);
  - 739 unit tests (125 files): unchanged;
  - the selector self-test.
- `MIGRATIONS_DIR=<a copy with the migration as 20261013100000_t10-check.sql, its mark filled> bash scripts/check-migrations.sh`: "Migration guard OK" (born-closed, definer, self-marking, public-surface, real-row proof). Without the allowlist line it fails, naming `import_gate_audit`.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-12-turn-10.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines. It may name turn T9's commit, T8's or T7's, with any conclusion. Whatever it shows, go on: the CI read is the supervisor's, and a fix it needs comes in the next turn. Do not stop on it. You cannot git-fetch that branch. Paste `git rev-parse HEAD`: this is <START>;
  2. step 0;
  3. the census (below). If any result differs from what it expects, STOP and report: write nothing else;
  4. the carrier, then the hashes;
  5. Part 2 (the read);
  6. the checks;
  7. the migration LAST, then its read-back;
  8. the report;
  9. END THE TURN.
  Do not stop between steps.
- The migration is the last thing written, because the database tool applies it on ethio-prod the moment it is saved. The operator will see the "Modify Supabase database" dialog and allow it.
- The expected red window (G35): CI on any commit the platform pushes before the migration is on ethio-staging runs IG-6 against a staging database without the check. There IG-6 (a) fails ("an account with no role wrote an audit row"). That is expected and is not fixed. Any other red in that window is NOT expected. CI on the final commit waits at its preflight ("STAGING BEHIND", up to 25 minutes) until the operator applies the migration on ethio-staging.
- If any rule of yours conflicts with the text, STOP before saving and quote that rule's exact words in the report.
- Production reads are SELECT-only. Reports carry counts, booleans and names of tables, columns, functions, triggers, roles, constraints and policies. Never an e-mail address, a user id, a token, a phone number or a row of user data.
- Tests (G38): no assertion loosened, no timeout raised, no retry added. A test this brief does not name is not edited.
- Scope — these files only: the one new migration file (the database tool names it), the 5 carrier paths and the brief. The platform may regenerate src/integrations/supabase/types.ts; that is allowed, name it in the report. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-12-turn-10.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 5 files → each equal to:
  48ea395e15fe0b6ba56eb53d5cdc18d2bbfc17d358112573b71f0bb61eae8158  docs/_changelog.md
  ee1aeeb653ffa653c4e1cd87247e12d954103eb286ad566c9afe88eadd5e38a1  docs/features/imports.md
  c83360983c5378ad9e4fec7d2d76121f30a0bb15dcc4a74453d2d97026bbd0f6  e2e/import-security.spec.ts
  19805a3615c7d544bc0f5f6ba2285d96906b9b0acbe4b688c2f6a798f1d429b2  roadmap.md
  f99cd41e793a901672b9a8e1717e1585019f3d29f329308c32bdb7afc14062db  scripts/public-surface-allowlist.txt
- On ethio-prod with your query tool (SELECT only):
- (c) `select md5(prosrc), length(prosrc), provolatile, prosecdef, proconfig from pg_proc where oid = 'public.import_gate_audit(text, text, uuid, jsonb)'::regprocedure;` → ba2184c0317ce1ede233b93218dab857 | 582 | v | t | {search_path=public}. This is the live definition the migration redeclares; any other value is a STOP.
- (d) `select max(version) from public.migration_marks;` → 20261013180000

THE CARRIER — T10-TURN-CARRIER-2026-10-13.md (5,996 bytes; sha256 cbff497201dbd66d903b71609ef8182d5414e7632b4ba71e004b9f66bf9a8a02; 7 sections)
- Its first line starts "T10 TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`. No blank line separates the sections.
- Modes:
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file (INSERT-AFTER 0: at the top of the file);
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed.

THE HASHES — `sha256sum` each of the 5 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  ee17dce9b57febb132d68b7ae64fb4276d75cae9e6d2834feba2b0f8a66ae39d  docs/_changelog.md
  d5d5bdee11e9191e0025e849e875f2984190629a4b04cc439477e14efc7c2975  docs/features/imports.md
  48a65aed62d50b220986a4ec93c3f412d6517106ada9712aaa1682d64500d5b8  e2e/import-security.spec.ts
  56f0183fc96b05a9cc1eaa5cb517948b631f66b0cf2bcc5e8de82a7f0bdc42ab  roadmap.md
  b324d0ab6dbfd75db064f196348431aaa9ec79b7ad903b9beb506db85a84336e  scripts/public-surface-allowlist.txt

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings;
- `bun run test:unit` 739 passed (125 files);
- `bun run scripts/e2e-select.ts --self-test` OK;
- Not run by you: the typecheck, the build and the bundle budget (your platform's rule: "Do not run the Lovable project's builds or typechecks manually because the harness runs them automatically."). CI's jobs judge them; the supervisor ran the typecheck on its own copy.

THE BROWSER RUN — not this turn. IG-6 needs the migration on ethio-staging, which the operator applies after the turn; CI on the final commit is the proof (and the local browser does not start, INC-506).

THE MIGRATION RULES (G39 — every one applies)
- The text is between the BEGIN and END lines of the appendix below. Write it EXACTLY, changing only `<MARK>`. Before the change, its sha256 is 9683f2b1f764599df22187f6c4cc5d7bb3e153c14c97ac151603ed66c5ecf6ea (5,654 bytes, 123 lines, ending with a newline).
- Check it in a scratch folder first (after the carrier, so the allowlist line is in place):
  - copy supabase/migrations/*.sql into a temporary folder;
  - add the text, its `<MARK>` replaced by the mark you will use, under the name 20261013100000_t10-check.sql (a stamp earlier than any mark you will choose);
  - run `MIGRATIONS_DIR=<that folder> bash scripts/check-migrations.sh`.
  Paste its "guard OK" lines and "Migration guard OK".
- `<MARK>` is chosen at apply time:
  - read now() at time zone 'utc' on ethio-prod;
  - round it up to the next whole hour and add one hour (add twelve hours instead if the save dialog may wait);
  - the mark must be later than the saved file's own stamp AND above 20261013180000 (the newest mark): if the reading gives 20261013180000 or less, use 20261013190000.
- Then hand the FINAL text to the database tool ONCE. Never a stub, a comment or a draft (INC-491).
- A clean apply is the proofs' pass: they RAISE EXCEPTION on any failure.

THE READ-BACK (ethio-prod, your query tool, SELECT only; paste each result)
- `select version from public.migration_marks where version = '<MARK>';` → one row;
- `select md5(prosrc), length(prosrc), provolatile, prosecdef, proconfig from pg_proc where oid = 'public.import_gate_audit(text, text, uuid, jsonb)'::regprocedure;` → d49086f062b8783ae07e61d27bd11424 | 1139 | v | t | {search_path=public};
- `select has_function_privilege('anon', 'public.import_gate_audit(text, text, uuid, jsonb)', 'EXECUTE'), has_function_privilege('authenticated', 'public.import_gate_audit(text, text, uuid, jsonb)', 'EXECUTE');` → f | t.

THE REPORT
- Done or not done, by step.
- The six ci-status lines, and <START>.
- The census results (a)–(d).
- The 5 sha256sum lines and the brief's.
- `git diff --name-only <START>` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only <START> HEAD` too. Expect the 5 carrier paths, the brief and the one migration file (and types.ts if regenerated).
- Part 2: every row.
- The checks.
- The check-migrations "guard OK" lines; the mark and the now() reading it came from; the apply outcome; the read-back.
- The line "apply <uuid-fragment of the migration's filename> → expect mark <MARK>", for the operator's staging apply.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only). The database change is undone only by a new migration — never by editing this file.

AFTER THIS TURN (for the operator): apply the migration on ethio-staging (the SQL editor) and read back its mark; CI's preflight waits for it (up to 25 minutes) — if the run has already failed at the preflight, use "Re-run failed jobs". Then Publish once CI is green. Nothing to walk: IG-6 proves both sides, and the console shows nothing new.

APPENDIX — THE MIGRATION TEXT (write it exactly; change only <MARK>)
----- BEGIN MIGRATION -----
-- Bundle 12 (the tidy-up round), turn T10 (2026-10-13). Tier A. The import gate's audit row needs the family's permission.
-- e2e-areas: admin-imports, admin-attributes, admin-categories, admin-locations, admin-translations
-- The rule: import_gate_audit writes a row only for a caller who holds that family's own import permission, the same
-- permission the gate checks before it calls this function, so every caller that should write a row still does.
-- Live beside file (ethio-prod, pg_proc, read in this turn's census): import_gate_audit(text, text, uuid, jsonb)
--   RETURNS void; provolatile v; prosecdef t; proconfig {search_path=public}; md5(prosrc)
--   ba2184c0317ce1ede233b93218dab857 (582 characters). The body below is that text with ONE check added: the family's
--   own permission (src/server/imports/registry.ts: attributes and categories categories:import, locations
--   locations:import, translations translations:manage).
-- A. import_gate_audit redeclared; its REVOKE and GRANTs restated as they were.
-- B. Proofs: no row is written; the caller is a random id with no role; no auth.users row.

-- ===== A — the family's permission, before the row =====
CREATE OR REPLACE FUNCTION public.import_gate_audit(
  p_family text,
  p_event text,
  p_batch uuid,
  p_counts jsonb
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_actor uuid := auth.uid();
  v_resource text;
  v_verb text;
BEGIN
  IF v_actor IS NULL THEN
    RAISE EXCEPTION 'permission denied: not signed in' USING ERRCODE = '42501';
  END IF;
  IF coalesce(p_family, '') = '' OR p_event NOT IN ('preview', 'commit', 'undo', 'refused') THEN
    RAISE EXCEPTION 'import: unknown gate event' USING ERRCODE = '22023';
  END IF;
  SELECT f.resource, f.verb INTO v_resource, v_verb
    FROM (VALUES ('attributes', 'categories', 'import'),
                 ('categories', 'categories', 'import'),
                 ('locations', 'locations', 'import'),
                 ('translations', 'translations', 'manage')) AS f(family, resource, verb)
   WHERE f.family = p_family;
  IF v_resource IS NULL OR NOT public.has_permission(v_actor, v_resource, v_verb) THEN
    RAISE EXCEPTION 'permission denied: import %', p_family USING ERRCODE = '42501';
  END IF;

  INSERT INTO public.audit_log(actor_id, action, entity_type, entity_id, meta)
  VALUES (
    v_actor,
    'import.' || p_event,
    'import:' || p_family,
    p_batch,
    public.import_sanitize(coalesce(p_counts, '{}'::jsonb))
  );
END;
$$;

REVOKE ALL ON FUNCTION public.import_gate_audit(text, text, uuid, jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.import_gate_audit(text, text, uuid, jsonb) TO authenticated;
GRANT ALL ON FUNCTION public.import_gate_audit(text, text, uuid, jsonb) TO service_role;

-- ===== B — proofs =====
DO $proof$
DECLARE
  v_def    text;
  v_caller uuid := gen_random_uuid();
  v_family text;
  v_err    text;
  v_state  text;
BEGIN
  -- B1: the check is in the live body, and the header is unchanged.
  v_def := pg_get_functiondef('public.import_gate_audit(text, text, uuid, jsonb)'::regprocedure);
  IF position('public.has_permission(v_actor, v_resource, v_verb)' IN v_def) = 0
     OR position('(''translations'', ''translations'', ''manage'')' IN v_def) = 0 THEN
    RAISE EXCEPTION 'T10 B1: the permission check is not in the body';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_catalog.pg_proc p
                  WHERE p.oid = 'public.import_gate_audit(text, text, uuid, jsonb)'::regprocedure
                    AND p.prosecdef AND p.provolatile = 'v'
                    AND p.proconfig = ARRAY['search_path=public']) THEN
    RAISE EXCEPTION 'T10 B1: the header changed';
  END IF;
  IF has_function_privilege('anon', 'public.import_gate_audit(text, text, uuid, jsonb)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.import_gate_audit(text, text, uuid, jsonb)', 'EXECUTE') THEN
    RAISE EXCEPTION 'T10 B1: the grants changed';
  END IF;

  -- B2: a signed-in caller with no role is refused for every family and for an unknown one; nothing is written.
  PERFORM set_config('request.jwt.claims', json_build_object('sub', v_caller, 'role', 'authenticated')::text, true);
  FOREACH v_family IN ARRAY ARRAY['attributes', 'categories', 'locations', 'translations', 'e2e-mig-nonesuch'] LOOP
    v_err := NULL;
    v_state := NULL;
    BEGIN
      PERFORM public.import_gate_audit(v_family, 'preview', NULL, '{}'::jsonb);
    EXCEPTION WHEN OTHERS THEN
      v_err := SQLERRM;
      v_state := SQLSTATE;
    END;
    IF v_state IS DISTINCT FROM '42501' OR v_err <> 'permission denied: import ' || v_family THEN
      RAISE EXCEPTION 'T10 B2 %: expected the permission refusal, got % %', v_family,
        coalesce(v_state, 'no error'), coalesce(v_err, '');
    END IF;
  END LOOP;

  -- B3: no caller is refused as before.
  PERFORM set_config('request.jwt.claims', '{}', true);
  v_state := NULL;
  BEGIN
    PERFORM public.import_gate_audit('attributes', 'preview', NULL, '{}'::jsonb);
  EXCEPTION WHEN OTHERS THEN
    v_state := SQLSTATE;
    v_err := SQLERRM;
  END;
  IF v_state IS DISTINCT FROM '42501' OR v_err <> 'permission denied: not signed in' THEN
    RAISE EXCEPTION 'T10 B3: expected the signed-out refusal, got % %', coalesce(v_state, 'no error'), coalesce(v_err, '');
  END IF;

  -- B4: nothing of the proofs is left.
  IF EXISTS (SELECT 1 FROM public.audit_log a WHERE a.actor_id = v_caller) THEN
    RAISE EXCEPTION 'T10 B4: a refused call wrote an audit row';
  END IF;
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('<MARK>') ON CONFLICT (version) DO NOTHING;
----- END MIGRATION -----
```
