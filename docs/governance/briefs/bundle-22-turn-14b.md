# Bundle 22 — turn 14b (after the close): the conclusions of turns 13 and 14; LGA-13's line ending; the temporary backend's working-copy fixes (D228, DEC-209): brief (saved unchanged, 2026-10-20)

```text
BUNDLE 22 — TURN 14b (2026-10-20; after the close). The E2E harness stays open under DEC-209 (G22). NO MIGRATION. No string. No package change. No AGENTS.md change: every fix of this turn lives inside .github/workflows/local-backend-proof.yml, the file the AGENTS.md line on browser tests already names as the temporary backend's home ("config in local-backend-proof.yml, never supabase/config.toml"); if your rule on structural decisions still asks for an AGENTS.md change, STOP before saving and quote it. Base: dev cf1dc2ed (bundle 22 turn 14 v2). Parts, IN THIS ORDER: A — CI first, the conclusions of turns 13 and 14, and LGA-13's fix; STEP 0; B — five read-only read-backs from ethio-prod; C — the working copy's named fixes in the proof workflow; D — the proof's evidence; E — the docs, the roadmap, the changelog; the checks; THE CI WAIT REPORT.

WHY
- The proof's first run (Local backend proof #1, run 39380756583, on cf1dc2ed) started the temporary backend in 62 seconds and stopped at the twelfth repository migration, 20260809010130 (the super-admin bootstrap): "bootstrap failed: no auth.users row for …" — an empty database has no accounts. DEC-209 says a failure with a named cause is fixed in turn 14b inside the proof's own working copy, never by editing a landed migration.
- To make this one turn instead of one turn per failure, the supervisor replayed every repository migration, in order and each in one transaction, on a local PostgreSQL 16 stand-in for the Supabase stack (2026-10-20). With the fixes of Part C, and only those, all 322 files that hosted applied went in, in 132 to 143 seconds on two cores, and row-level security stood on all 76 public tables. Each fix below names the migration it serves and the exact error the replay met without it. What the stand-in could not prove, the proof run will: the CLI's own Postgres 17 image (its default grants; whether its migration role may create an event trigger), the real Auth and Storage services, and the smoke tier itself.
- DEC-209 criterion (1), "every repository migration applied", is read as every repository migration hosted applied: 20260922120000 could never apply anywhere — its own proof asserted 'update' where the planner says 'change' — and was restated by 20260922121913 (INC-266, closed 2026-09-22). It is left out of the working copy by name and listed in the evidence.

STEP 0 — save this file (the attached bundle-22-turn-14b.md, title line and fence included) byte for byte as docs/governance/briefs/bundle-22-turn-14b.md and paste its sha256sum. Tick nothing. No report file in the repository.

HOW TO WORK
- Order of the turn: Part A (paste `git rev-parse HEAD`: this is <START>); STEP 0; Parts B to E; the checks; THE CI WAIT REPORT; END THE TURN. Do not stop between parts — a clean point is not a reason to stop. If the platform ends the turn early, report three lines (done, left, CI) with the done parts and `git diff --name-only <START>`; the operator sends "continue".
- THE END-TO-END CHECK (your rule: "Verify the request's central flow once end-to-end before concluding, in the state a real user would hit it"): this turn's central flow is the proof workflow's run on your commit — it runs on GitHub and writes docs/tracking/local-backend-proof.md on ci-evidence; your sandbox cannot start a browser (INC-506) and need not start the Supabase stack. The next brief's Part A reads that evidence and concludes this turn.
- Run no stateful git command: the platform commits and syncs when the turn ends. Read-only `git status`, `git diff` and `git rev-parse` are fine.
- Change files with your file-editing tool. Turns 12 and 14 used authored scripts for spec edits (disclosed — thank you); in this turn, if your file-editing tool cannot make an edit, say so and why BEFORE making it another way (G37).
- The workflow is linted with `actionlint -shellcheck= -pyflakes=`. No secret, e-mail address or account id is printed by any step; the temporary backend's keys stay masked.
- ci.yml and every other workflow do not change. The proof still gates nothing.
- If any rule of yours conflicts with this text, STOP before saving and quote that rule's exact words in the report.

PART A — CI FIRST; THE CONCLUSIONS OF TURNS 13 AND 14; LGA-13'S FIX.
A1. Read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines (you cannot git-fetch that branch). Expected: run 1061 on cf1dc2ed (turn 14), or run 1060 on 7bdeb9fe (turn 13) while 1061 still runs.
A2. 'TURN 13 — FINAL REPORT', first in this turn's report. Run 1060 on 7bdeb9fe ended FAILURE (2026-10-20 06:56:35Z): 2150 passed, 154 skipped, 4 failed — all four are LGA-13 "Export acceptances saves a CSV of who accepted, never a name or e-mail" (e2e/legal-admin.spec.ts :560; mobile-360 shard 2, desktop-1280 shard 5, and both projects in the fast lane). Expected and Received print the same header because the received line ends in an invisible "\r": the file's lines end in "\r\n" by its own rule (src/features/admin/legal/legal-service.ts :334, the RFC 4180 line ending turn 13's carrier set), and the test split the file on "\n" (INC-785). The export itself is right. Read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/e2e-last-failure.md while it names 7bdeb9fe (or the run ci-status.md names, if it carries turn 13's code) and paste its lines that name LGA-10 to LGA-14; your verdict — turn 13's central flows verified end-to-end, the run red only by LGA-13's reading of the line ending.
A3. 'TURN 14 — FINAL REPORT', second. Its code: run 1061 on cf1dc2ed — when ci-status.md names it, its six lines and the e2e-last-failure.md lines that name LGA-13, FV-1, RM-1 or "the menu opens in place" (expected: red by LGA-13 alone, which A4 fixes; FV-1's fix is proven by the operator's Flake check, read by the supervisor); while it still runs, say so — the next brief reads it. Its proof: https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/local-backend-proof.md — paste its first fourteen lines (the start failure above; its e-mail line is not pasted — D3 redacts it from now on). Verdict: DEC-209 criterion (1) failed on its first run with a named cause, fixed by Part C.
A4. LGA-13 (INC-785), e2e/legal-admin.spec.ts :558-:559, by hand. The two lines
      const csv = await readFile(path, "utf8");
      const lines = csv.split("\n").filter((line) => line.trim() !== "");
    become
      const csv = await readFile(path, "utf8");
      expect(csv.endsWith("\r\n")).toBe(true);
      expect(csv.replace(/\r\n/g, "").includes("\n")).toBe(false);
      const lines = csv.split("\r\n").filter((line) => line !== "");
    :560 onward unchanged (the header, three lines, the two ids, no e-mail, the done text, one audit row). The test now asserts the file's line ending instead of tripping on it; nothing is loosened. Census (G29): the only e2e reader that splits a downloaded file on "\n" is this line (`git grep -n 'split("\\n")' -- e2e` — the other two hits are global-teardown.ts reading its own ledger files); the app's other CRLF writers (src/routes/api/admin/{attributes,categories,locations}/export.ts, src/features/admin/translations/io-formats.ts :56) are read by their tests through the import parsers, not by splitting.

PART B — FIVE READ-BACKS FROM ETHIO-PROD (your read tool; SELECT only; paste each result whole into the report AND into the census doc, E1). No row of any user table.
B1. `select pg_get_functiondef('public.rls_auto_enable()'::regprocedure) as def, pg_get_userbyid(p.proowner) as owner from pg_proc p where p.oid = 'public.rls_auto_enable()'::regprocedure;` — the hosted platform's function that turns row-level security on for every new public table. No migration creates it; 20260911223744 :18-:20 revokes on it; the replay failed there without it ("function public.rls_auto_enable() does not exist").
B2. `select evtname, evtevent, evtenabled, evttags::text, evtfoid::regprocedure::text from pg_event_trigger order by evtname;`
B3. `select pg_get_userbyid(defaclrole) as role, defaclobjtype, defaclacl::text from pg_default_acl where defaclnamespace = 'public'::regnamespace order by 1, 2;`
B4. `select count(*) filter (where relrowsecurity) as rls_on, count(*) as tables from pg_class where relnamespace = 'public'::regnamespace and relkind in ('r', 'p');`
B5. `select version from supabase_migrations.schema_migrations order by version;` — report the number of rows; the repository migration versions (`ls supabase/migrations`) that are NOT in it; and the versions in it that are NOT in the repository. If the read tool cannot read that schema, say so in one line and go on.
If B1 finds no such function, STOP after Part A and report — Part C's first fixture depends on it.

PART C — THE WORKING COPY'S NAMED FIXES (.github/workflows/local-backend-proof.yml, step "Prepare temporary working copy").
C1. Directly after the bucket heredoc's closing `SQL` line (:75 at cf1dc2ed) and before the config heredoc, insert the block between "=== FIXES BEGIN ===" and "=== FIXES END ===" below, indented ten spaces like the lines around it, character for character, with ONE substitution: the line `<<< B1 AND B2 >>>` is replaced by (i) B1's `def` exactly as pg_get_functiondef printed it, followed by a line holding `;`, then (ii) one line per B2 row whose function is public.rls_auto_enable(): `CREATE EVENT TRIGGER <evtname> ON <evtevent> WHEN TAG IN (<each tag of evttags, single-quoted, comma-separated>) EXECUTE FUNCTION public.rls_auto_enable();` (no WHEN clause if evttags is null; add `ALTER EVENT TRIGGER <evtname> DISABLE;` if evtenabled is 'D'). Every other B2 row belongs to the platform's own machinery, which the local image already has — leave those out and list them in the report.
C2. The ledger check (:191 at cf1dc2ed) becomes: expected = every repository migration version EXCEPT 20260922120000, together with every version of a `*_ci_local_*.sql` file in .ci-local/supabase/migrations; `missing` = expected minus applied; the text written to local-backend-migrations.txt names the count the same way ("applied N/N" with N = the size of expected) or the missing versions.
C3. After the ledger check, in the same step, write local-backend-parity.txt with two lines read through `docker exec supabase_db_ethio-ci-local psql -U postgres -d postgres -Atc …`: "RLS on <rls_on> of <tables> public tables" (B4's query) and "Default grants in public: <rows of B3's query joined by '; ', or none>". These are the local twins of B3 and B4.
=== FIXES BEGIN ===
# D228 turn 14b: the working copy's named fixes (DEC-209: in the proof's working copy, never in a landed migration).
wc=.ci-local/supabase/migrations
: > local-backend-working-copy.txt
# (1) Never applied on hosted (INC-266): its own proof asserted 'update'; 20260922121913 restates it.
rm "$wc/20260922120000_a4e1c9d2-7b5f-4c86-9a30-6d2f81ce4b77.sql"
echo "- skipped 20260922120000: never applied on hosted (INC-266); 20260922121913 restates it" >> local-backend-working-copy.txt
patch_copy() {
  before=$(sha256sum "$wc/$1" | cut -c1-12)
  sed -i "$2" "$wc/$1"
  after=$(sha256sum "$wc/$1" | cut -c1-12)
  if [ "$before" = "$after" ]; then echo "::error::working-copy patch changed nothing: $1"; exit 1; fi
  echo "- patched ${1%%_*} ($before -> $after): $3" >> local-backend-working-copy.txt
}
# (2) A privilege check by NAME over pg_class is evaluated before its namespace filter on a small catalogue ("relation public.buckets does not exist"); the table's oid names the same table.
patch_copy 20260830091427_f1d6873d-acd2-480f-89c3-36f0f786c0a3.sql "s/format('public.%I', c.relname)/c.oid/g" "the service_role proof checks each table by oid"
patch_copy 20260830091455_14223614-1c76-4cad-97f2-f455e485cbc3.sql "s/format('public.%I', c.relname)/c.oid/g" "the service_role census checks each table by oid"
# (3) PROOF 5 measured the real catalogue's answer size on hosted (at most 8 rows and 2,048 bytes); the migrations' own catalogue answers 2,111 bytes.
patch_copy 20260924084437_231d2821-bdd1-4447-996a-60cfc3009497.sql "s/RAISE EXCEPTION 'PROOF 5 failed'/RAISE WARNING 'PROOF 5 (the real catalogue size, proven on hosted): % bytes', v_bytes/" "PROOF 5 reports the size instead of refusing"
fixture() {
  echo "- fixture $1: $2" >> local-backend-working-copy.txt
}
# (4) What a hosted project has before its first migration.
cat > "$wc/00000000000001_ci_local_hosted_platform.sql" <<'SQL'
-- D228 turn 14b: what a hosted project has before its first migration.
-- (a) Public objects are born without grants to the browser roles: 20260810075629's P5 ("home_country_code update was permitted") passed on hosted only because authenticated held no table-wide UPDATE on profiles.
ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE ALL ON TABLES FROM anon, authenticated;
ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE ALL ON SEQUENCES FROM anon, authenticated;
-- (b) The platform's row-level-security event trigger, read from ethio-prod (census rows j and k).
<<< B1 AND B2 >>>
SQL
fixture 00000000000001 "hosted defaults: no browser-role default grants; the platform's RLS event trigger (needed by 20260911223744 and by every table created without its own ENABLE ROW LEVEL SECURITY)"
# (5) The accounts hosted had when the bootstrap and the early proofs ran: the bootstrap account (read from its landed migrations, never printed) and three plain ones. No password; never signed in.
cat > "$wc/20260809010129_ci_local_accounts.sql" <<'SQL'
-- D228 turn 14b: accounts for 20260809010130 (bootstrap), 20260809103904 (a base user), 20260817061418 (one more profile) and 20260917210349 / 20260917210459 (the super admin by id).
INSERT INTO auth.users (instance_id, id, aud, role, email, created_at, updated_at, raw_app_meta_data, raw_user_meta_data)
VALUES ('00000000-0000-0000-0000-000000000000', '__BOOTSTRAP_ID__', 'authenticated', 'authenticated', '__BOOTSTRAP_EMAIL__', now(), now(), '{}'::jsonb, '{}'::jsonb);
INSERT INTO auth.users (instance_id, id, aud, role, email, created_at, updated_at, raw_app_meta_data, raw_user_meta_data)
SELECT '00000000-0000-0000-0000-000000000000', gen_random_uuid(), 'authenticated', 'authenticated', e, now(), now(), '{}'::jsonb, '{}'::jsonb
FROM unnest(ARRAY['ci-local-1@example.invalid', 'ci-local-2@example.invalid', 'ci-local-3@example.invalid']) AS e;
SQL
bootstrap_email=$(grep -o "auth.users WHERE email = '[^']*'" supabase/migrations/20260809010130_05add65c-4963-4df2-95bd-b1cc855820c0.sql | head -1 | sed "s/.*= '//; s/'\$//")
bootstrap_id=$(grep -o "v_uid   uuid := '[0-9a-f-]*'" supabase/migrations/20260917210349_c23b6c76-b29b-4cfe-b559-0d4abc728a9f.sql | head -1 | sed "s/.*:= '//; s/'\$//")
if [ -z "$bootstrap_email" ] || [ -z "$bootstrap_id" ]; then echo "::error::the bootstrap account was not found in its landed migrations"; exit 1; fi
sed -i "s/__BOOTSTRAP_EMAIL__/$bootstrap_email/; s/__BOOTSTRAP_ID__/$bootstrap_id/" "$wc/20260809010129_ci_local_accounts.sql"
fixture 20260809010129 "four accounts: the bootstrap account by its landed e-mail and id, and three plain ones (ci-local-N@example.invalid)"
# (6) The open countries' currencies (set on hosted through the admin): 20260917112956's P5b defaults ET's.
cat > "$wc/20260917112955_ci_local_country_currencies.sql" <<'SQL'
-- D228 turn 14b: 20260917112956's P5b reads ET's currency ("refusals: price_currency required" without it).
UPDATE public.countries c SET currency_code = v.cur
FROM (VALUES ('ET', 'ETB'), ('US', 'USD'), ('GB', 'GBP'), ('DE', 'EUR'), ('KE', 'KES'), ('CA', 'CAD')) AS v(code, cur)
WHERE c.code = v.code AND c.currency_code IS NULL;
SQL
fixture 20260917112955 "the currencies of ET, US, GB, DE, KE and CA (ISO 4217), which no migration sets"
# (7) The catalogue's 'voltage' definition (imported on hosted): 20260921092130's proofs round-trip it.
cat > "$wc/20260921092129_ci_local_voltage.sql" <<'SQL'
-- D228 turn 14b: 20260921092130's proofs read the 'voltage' definition ("PROOF setup: voltage definition absent" without it).
INSERT INTO public.attributes (attr_key, name_en, attr_type, options)
VALUES ('voltage', 'Voltage', 'single_select',
        '[{"value":"220v","label_en":"220 V"},{"value":"110v","label_en":"110 V"},{"value":"380v_three_phase","label_en":"380 V three-phase"}]'::jsonb);
SQL
fixture 20260921092129 "a 'voltage' definition with the three digit-led values the proof names"
# (8) A home country for the plain accounts: 20260927045940's proof borrows the oldest active account with one.
cat > "$wc/20260927045939_ci_local_residency.sql" <<'SQL'
-- D228 turn 14b: 20260927045940's proof needs an active account with a home country ("no active seller" without it).
UPDATE public.user_directory d SET home_country_code = 'ET', country_source = 'user_confirmed'
  FROM auth.users u WHERE u.id = d.user_id AND u.email LIKE 'ci-local-%@example.invalid';
UPDATE public.profiles p SET home_country_code = 'ET', country_source = 'user_confirmed'
  FROM auth.users u WHERE u.id = p.user_id AND u.email LIKE 'ci-local-%@example.invalid';
SQL
fixture 20260927045939 "home country ET for the three plain accounts"
# (9) One active sub-city (hosted's came from the places import): 20260929201601's proof needs one.
cat > "$wc/20260929201600_ci_local_sub_city.sql" <<'SQL'
-- D228 turn 14b: 20260929201601's proof needs an active sub-city ("PROOF setup failed: places" without it).
INSERT INTO public.locations (parent_id, level, country_code, name_en, slug, is_active, region_id, city_id, center_lat, center_lng)
SELECT c.id, 'sub_city', c.country_code, 'Bole', 'bole', true, c.region_id, c.id, 8.9906, 38.7893
  FROM public.locations c WHERE c.level = 'city' AND c.slug = 'addis-ababa';
SQL
fixture 20260929201600 "the sub-city Bole under Addis Ababa"
=== FIXES END ===
  The bootstrap e-mail and id are read from their landed migrations at run time, so this workflow holds neither; no step echoes them.
  Expected outcomes the evidence will show, each a finding for the next brief, not a reason to change this text: the start succeeds; or it stops at 00000000000001 because the CLI's migration role may not create an event trigger; or it stops at another file with an error the stand-in could not see (its Postgres 17 image, the real Auth and Storage schemas).

PART D — THE PROOF'S EVIDENCE (step "Write proof evidence and notice").
D1. redact() also replaces every e-mail address (the pattern `[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}`) with "[e-mail]" — the first run's evidence printed the bootstrap migration's text.
D2. After the "- Migrations:" line: "- Working copy:" followed by the lines of local-backend-working-copy.txt, and "- Parity:" followed by the lines of local-backend-parity.txt (each "not written" when its file is missing).
D3. The `::notice` line gains "fixtures <n>" (the number of fixture lines).

PART E — THE DOCS, THE ROADMAP, THE CHANGELOG.
E1. docs/features/ci-local-backend.md: three rows added to the table after (i) — (j) default grants in public (B3 pasted; the local twin from the proof's parity line), (k) the platform's RLS event trigger (B1's owner and B2's row; the function body lives in the workflow), (l) the hosted migration ledger (B5's three results). Then a new section "## The working copy (turn 14b)" before "## Phase 2 plan": one line per fix of Part C (the skipped file, the three patches, the six fixtures), each with the migration it serves and the error the supervisor's replay met without it (the WHY above and the comments in the block), and one closing line: "Supervisor's replay, 2026-10-20: a local PostgreSQL 16 stand-in applied the 322 migrations hosted applied, in order, each in one transaction, with these fixes and no others, in 132 to 143 seconds; RLS on 76 of 76 public tables. Unproven there: the CLI's Postgres 17 image, its default grants, event-trigger privilege, the real Auth and Storage schemas."
E2. docs/features/e2e-harness.md, the section "## Temporary test backends (D228, DEC-209) — phase 1": one paragraph — the proof's working copy carries named fixes (one skipped never-applied file, three patches, six fixtures; the list in docs/features/ci-local-backend.md), never edits to landed migrations; DEC-209 criterion (1) counts the migrations hosted applied.
E3. roadmap.md: line 3 begins "The brief in force: docs/governance/briefs/bundle-22-turn-14b.md (bundle 22 — turn 14b, after the close: LGA-13's line ending; the temporary backend's working-copy fixes; D228, DEC-209). Next: the proof's verdict, then turn 15 (phase 2) or a further fix;" and keeps the rest of the line from " then the no-escape turn (D227);" on. After the line that begins "  - [ ] Turn 14 (docs/governance/briefs/bundle-22-turn-14-v2.md" insert:
  - [ ] Turn 14b (docs/governance/briefs/bundle-22-turn-14b.md; no migration; no string) — LGA-13 reads the export's CRLF line ending (INC-785, run 1060's red); the proof's working copy: 20260922120000 skipped (never applied, INC-266), three patches, six fixtures, the parity lines (D228, DEC-209)
E4. docs/_changelog.md APPEND one line: "- 2026-10-20 — Bundle 22 turn 14b, after the close (no migration; no string): LGA-13 asserts the acceptances export's CRLF line ending (INC-785); the temporary backend's working copy gains its named fixes — the never-applied 20260922120000 left out (INC-266), three patches, six fixtures (hosted defaults and the RLS event trigger, the accounts, currencies, a 'voltage' definition, residency, a sub-city) — and its evidence gains the working-copy and parity lines (D228, DEC-209)."

THE CHECKS (whole; paste the last line of each; when a check fails, paste its whole failure block): `bun run format:check` clean; `bun run lint` 0 errors; `bun run test:unit` (expected 1266 passed — no unit test changes); `actionlint -shellcheck= -pyflakes= .github/workflows/local-backend-proof.yml` clean; `bash scripts/check-hardcoded-strings.sh` "findings: 0"; `bun run scripts/e2e-select.ts --self-test` OK; `bash scripts/check-browse-imports.sh` OK; `bash scripts/check-migrations.sh` "Migration guard OK."; the preview harness's "build OK"; at the end, `bun run i18n:map-guard` "usage maps match the tree". Also: extract the "Prepare temporary working copy" step's script from the workflow (strip its ten-space indent) and run `bash -n` on it — paste "syntax OK" or the error.

SCOPE — these files only: the brief; e2e/legal-admin.spec.ts (A4 only); .github/workflows/local-backend-proof.yml (C, D); docs/features/ci-local-backend.md (E1); docs/features/e2e-harness.md (E2); roadmap.md (E3); docs/_changelog.md (E4). Name any other file in the report's first lines with its reason. Delete no file. No patch tool. No package change. No migration. No AGENTS.md change.
THE CI WAIT REPORT (not a conclusion): "TURN 13 — FINAL REPORT" and "TURN 14 — FINAL REPORT" first; done or not done by part; A1's six lines; <START>; A4's diff of e2e/legal-admin.spec.ts; B1 to B5 whole; C1's substituted lines (the function body and the event-trigger lines) and the B2 rows left out; the checks; `git diff --stat <START>`; `git diff --name-only <START>`; anything not foreseen; the line "Waiting for CI and for the proof run on <the commit this turn leaves> — the next brief's Part A concludes this turn." Then END THE TURN; send nothing after the report.
REVERT: git revert of this turn's commits; no database change to undo.
```
