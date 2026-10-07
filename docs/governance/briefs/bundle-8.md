# Bundle 8 brief — v2 (saved unchanged, 2026-10-07; replaces v1 — turn 1 landed at 5a8c4df1; this version specifies turns 2 and 3: Parts B and A with one migration, then Parts D and F)

```text
BUNDLE 8 — THE SECURITY AND WORDING ROUND, VERSION 2 (2026-10-07). THIS FILE REPLACES VERSION 1. Turn 1 (step 0, the four censuses, Part C, Part E) landed at commit 5a8c4df1 and is verified. This version specifies everything that is left: TURN 2 = Part B and Part A with ONE migration (M13); TURN 3 = Part D and Part F. Tier A (a listing door, privileges, the auth forms). ESTIMATE two more executor turns.
Line numbers are as of commit 5a8c4df1 (dev). THIS BRIEF IS PUBLIC (the repository is public until launch, DEC-116): it is written as build instructions; add no sentence to the repository that says what someone could do before a step landed.

STEP 0 — keep this brief
- Before anything else, save this file byte for byte OVER docs/governance/briefs/bundle-8.md (it is already in its saved form: the header line and one fenced text block). On every later turn, read that file first. roadmap.md line 3 stays as it is.
- roadmap.md, the block `### Bundle 8 — the security and wording round (in progress)`: tick a line only in the turn whose report says it landed with its tests.

HOW TO WORK
- Order of turns. TURN 2 = step 0; Part B's test and comment (B3, B5); Part A's check, fixtures and docs (A4, A6); then THE MIGRATION M13 (Part B's function, Part A's statements, the proofs), written LAST; the read-backs; the baseline (A5); push; the STOP REPORT; END THE TURN. TURN 3 (after the operator's "continue") = Part D, then Part F, push, the final report, END THE TURN. Do not stop between steps: a clean point is not a reason to stop. Stop only for the migration's stop report, a question this brief cannot answer, or the end. If the platform ends a turn early, stop at a clean point (typecheck, format:check, lint and every spec file you touched green), report three lines — done, left, CI — and the operator sends "continue".
- Every turn starts by reading CI for the last commit on dev: https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md, then e2e-last-failure.md and guards-last-failure.md at the same address. Paste the first six lines of ci-status.md (expected at the start of turn 2: commit 5a8c4df, SUCCESS, run 37626895782). A red is fixed first. You cannot git-fetch the ci-evidence branch from your sandbox; the three raw addresses are the only way you read CI.
- Browser tests are started only with `bun run e2e:local <files>` or `bun run e2e:changed` (AGENTS.md; DEC-146). Never a plain `playwright test`. Nothing in this bundle signs in to, or runs a test against, ethio-prod or the published site.
- Local runs (G37): EVERY spec file you changed, run whole, alone, both projects (mobile-360, desktop-1280), 2 workers, 0 retries, fake mode — all of them, however many. "A file that is not fully green is not committed", with ONE named exception: PR-41 (Part B) is expected RED until the operator has applied M13 on ethio-staging; every other test of its file is green. There is no end-of-bundle local run: CI on the turn's final commit is the full proof. Unit tests (vitest) run whole. A local run never writes "CI green".
- Tests (G38): a red is fixed at its root. No assertion is loosened, no timeout raised, no retry added, no test skipped or moved to make a run pass. Every test seeds its own scratch rows and removes them in `finally`; a pooled account is leased, never a real one; no test changes a real reference row. A shared helper never changes its default (new behaviour is an option). Spec files are edited by hand, never by search-and-replace.
- Production reads: with your query tool on ethio-prod, SELECT only. A report carries counts, booleans and the names of functions, tables, roles and extensions — never an e-mail address, a user id, a token or a row of user data. WHERE THE ANSWERS GO: the results of Part A's reads go in your STOP REPORT only; a function name they return appears in ONE file, the migration, and nowhere else — no test, comment, commit title, changelog line or log (DEC-132 rule 2).
- Platform bumps (DEC-134): if the platform changes package.json or bun.lock at the start of a turn, say so in the FIRST lines of your report and leave it. You never change a package yourself in this bundle.
- Strings: turn 2 adds and changes NO string. Turn 3 changes exactly the strings Part D's table gives, copied by script, character for character; you write no Amharic and no English of your own.
- Scope: only the files a step names, plus the generated files the scripts regenerate (docs/generated/i18n-usage.json, public/i18n-usage.json, src/integrations/supabase/types.ts when the platform regenerates it). A file you create outside a step's list is named in the report's first lines with its reason.
- Closed surfaces (G22): the workflow files and the failure reporter are not touched. The migration check (scripts/check-migrations.sh) is opened by step A4 only, for the one rule it names.
- Records: you write the changelog lines; the decision and incident ledgers are written by the supervisor's records turn at the close.
- The commit that is judged by CI ends the turn: push, END THE TURN, send nothing after it.

MIGRATION RULES (M13 — one file, both parts)
- It is written LAST in turn 2, after every other file of the turn is saved and typecheck, format:check, lint and the unit suite are green: your tool applies it on ethio-prod the moment you save it (the operator allows the "Modify Supabase database" dialog). Never an empty or placeholder file.
- No `-- e2e-areas:` line: this file changes privileges every area relies on (no line means ALL).
- Order inside the file: (1) Part B's function with its REVOKE and GRANT lines; (2) Part A's statements; (3) ONE `DO` block of proofs; (4) the self-mark as its last statement, in the M10 file's form (supabase/migrations/20261006225254_626282eb-da6f-45aa-ac32-ef03407502a5.sql :845).
- The mark is chosen at apply time: `now() AT TIME ZONE 'utc'` on ethio-prod rounded up to the next hour plus one hour (plus twelve hours if the dialog may wait), later than the file's own stamp AND above the newest mark in public.migration_marks. Run scripts/check-migrations.sh before saving the file into the migrations folder and paste its "Self-marking guard OK" line.
- Proofs: in the one DO block, on scratch rows the block itself creates and removes (the M10 file's shape, :739–844: scratch catalogue rows inside an inner block that ends by raising its own signal, caught outside), with no caller or a scratch caller, never a real account, place, category or attribute, never a row in a reserved schema. Every failed proof is a RAISE EXCEPTION — a clean apply is the pass; a proof never skips with a notice. A scratch table or sequence is created and dropped inside the block and its name begins `e2e_mig_` (DEC-151).
- A redeclared function is whole, from the live definition (pg_get_functiondef on ethio-prod), every header attribute kept — arguments and their defaults, STABLE, SECURITY DEFINER, search_path — and the body byte for byte apart from the change this brief names. Paste, live beside file, before the apply: identity arguments, provolatile, prosecdef, proconfig. LF line endings.
- If the apply fails: nothing landed. Paste the error whole, change nothing else, END THE TURN with the report — do not retry with a weaker proof.
- After the apply, read back on ethio-prod and paste: `select version from public.migration_marks where version = '<the mark>'` (the SPECIFIC mark, never max); the function's four header facts; the reads A5 names.
- THE STOP REPORT then gives the operator's staging step in this exact form: `apply <the uuid fragment of the file name> → expect mark <the mark>`. On the commit of turn 2 the E2E preflight will say STAGING BEHIND until the operator has applied the file on ethio-staging and re-run the failed jobs: that red is expected; any OTHER red is yours.
- Nothing is written to ethio-staging by you outside the tests' own scratch rows.

PART B — THE ANSWER DOOR ENFORCES AN OPTION'S `allowed` LIST (INC-477; turn 2)
What is read in the code. The form already narrows what a question offers by the options chosen elsewhere: `narrowing` (src/features/posting/step-specifications.tsx :516–531) reads, for every select question answered with ONE value (`selectedValue`, src/features/posting/reset-scope.ts :48–55 — a string, or an object whose `value` is a string; a list gives ""), the chosen option's `allowed` object, and two lists for the same question meet at their intersection; `visibleOptionsOf` (:535–539) then offers only the listed values. The door, public.validate_listing_attributes (M10 file :16–363), folds an option's BOUNDS the same way (:102–133) and judges each chosen value in one loop (:298–324) with three refusals — unknownOption, inactiveOption, optionNotAllowed (the link's subset). It has ONE caller, validate_listing_draft (supabase/migrations/20261004144146_923dd4cb-91bb-43a1-9c0d-e4b418c23c23.sql :666), which hands on its own p_prior — the stored row's answers.
B1 THE RULE, added to public.validate_listing_attributes; nothing else in it changes.
   (a) THE FOLD — directly after the bounds fold (:102–133), before the main loop. For every select definition of the category (single_select or multi_select) whose answer in v_attrs is ONE value — a JSON string, or an object whose `value` is a string; an array contributes nothing — take the option record of that definition whose `value` equals it. When that record's `allowed` is a JSON object, then for every key K of it whose value is a JSON array: K's folded list becomes that array's string elements, or — when K already has a folded list — the INTERSECTION of the two. Remember, per K, which definitions contributed.
   (b) THE CHECK — in the element loop (:298–324), as a FOURTH case after the three that exist: when K = this definition's key has a folded list and the element (the trimmed text the loop already holds) is not in it, the refusal is `{attr_key, reason: 'optionNotAllowed', detail: <the value>}` and the definition is bad — unless (c) holds. The value `other` is judged like any other value. One refusal per element at most, as today.
   (c) THE STORED COMBINATION IS KEPT — no refusal when the element is among public.attr_answer_tokens(v_prior -> K) AND, for every definition P that contributed to K's folded list, the ONE value of P in v_prior equals the ONE value of P in v_attrs. (Nothing about that combination changed in this save.)
   (d) An `allowed` key that names a question which is not a select question of the category is ignored. A question the main loop skips (its show-when is unmet) is not judged, as today. No new refusal reason, no new string.
B2 Redeclare the function WHOLE by the migration rules, then restate its three privilege lines exactly as the M10 file has them (:364–366). Census B0 of turn 1 found the live body equal to the file's body apart from line endings.
B3 TEST PR-41, in e2e/posting-routes-catalog.spec.ts beside PR-40 (:208), through the same route and with the same seeding helpers; scratch definitions, links, category and listing of its own, removed in `finally`. The option records are seeded in the catalogue's own shape (the definition table's checks apply, so a child definition exists before the parent whose option names it). The scratch category also carries one plain question T (a number) that the cases may change freely. Each case seeds what it needs — the letters are per case. Cases, each asserting the refusal's attr_key, reason and detail, or the acceptance:
   (1) parent P (single_select) with options p1 and p2, each with `allowed` {C: [a]}; child C (single_select) with options a, b and other. P = p1, C = b → refused optionNotAllowed at C, detail b.
   (2) P = p1, C = a → accepted.
   (3) two contributors: C has options a, b and c; P's p1 allows {C: [a, b]}, Q's q1 allows {C: [b, c]}. With P = p1 and Q = q1: C = a refused at C, detail a; C = b accepted.
   (4) a multi_select child M with options x, y and z, under an option of P that allows {M: [x, y]}: [x, z] refused at M, detail z; [x, y] accepted.
   (5) a multi_select question R whose option r1 allows {C: [a]}: R = [r1], C = b → accepted (a list contributes nothing).
   (6) the stored combination: the test writes ITS OWN scratch listing row with the service client so that it already holds P = p1, C = b; a save that changes T and leaves P and C as stored → accepted; a save that changes P to p2 and keeps C = b → refused at C, detail b.
   (7) with `allowed` {C: [a]}: C = {"value": "other", "text": "…"} → refused optionNotAllowed, detail other.
   RED FIRST: run the file locally BEFORE M13 exists (ethio-staging holds today's door): cases (1), (3), (4), (6) second half and (7) fail because the save is accepted — paste those failing lines. PR-41 stays red, locally and in CI, until the operator's staging apply; say so in the stop report under "expected red".
B4 PROOFS in M13's DO block, calling public.validate_listing_attributes directly on scratch catalogue rows: cases (1), (2), (3), (5), (6) both halves through p_prior, and (7); that the header facts are unchanged (SECURITY DEFINER, volatility 's', search_path=public); that anon cannot execute it and authenticated can.
B5 The comment above `narrowing` (step-specifications.tsx :509–515) says the fold mirrors `attr_allowed_check`. It mirrors the answer door's rule: reword that one sentence to name public.validate_listing_attributes. No behaviour changes in the form.
B6 One changelog line. docs/features/attributes.md gains the rule in Part F.

PART A — NEW DATABASE OBJECTS ARE BORN CLOSED; THE FUNCTIONS STILL OPEN BY DEFAULT ARE CLOSED (INC-480, INC-482; turn 2, in M13 after Part B's function)
A1 READ FIRST (ethio-prod, SELECT only; results whole in the STOP REPORT — turn 1's report summarised them, and the supervisor needs the rows). Run the four queries exactly as written:
(1) Who owns what migrations create:
select 'function' as kind, p.proowner::regrole::text as owner, count(*) as n
  from pg_proc p where p.pronamespace = 'public'::regnamespace group by 1, 2
union all
select case c.relkind when 'S' then 'sequence' else 'table' end, c.relowner::regrole::text, count(*)
  from pg_class c where c.relnamespace = 'public'::regnamespace and c.relkind in ('r', 'p', 'S') group by 1, 2
order by 1, 2;
(2) The default privileges on record:
select d.defaclrole::regrole::text as for_role,
       case when d.defaclnamespace = 0 then '(every schema)' else d.defaclnamespace::regnamespace::text end as in_schema,
       d.defaclobjtype as object_type,
       d.defaclacl::text as acl
  from pg_default_acl d
 order by 1, 2, 3;
(3) Every function of schema public that a browser role can execute:
select p.proname,
       pg_get_function_identity_arguments(p.oid) as args,
       p.prosecdef as definer,
       (p.prorettype = 'trigger'::regtype) as is_trigger,
       p.provolatile as volatility,
       has_function_privilege('anon', p.oid, 'EXECUTE') as anon_can,
       has_function_privilege('authenticated', p.oid, 'EXECUTE') as authenticated_can,
       exists (select 1 from aclexplode(coalesce(p.proacl, acldefault('f', p.proowner))) a
                where a.grantee = 0 and a.privilege_type = 'EXECUTE') as granted_to_public,
       exists (select 1 from pg_depend d where d.classid = 'pg_proc'::regclass and d.objid = p.oid and d.deptype = 'e') as extension_member
  from pg_proc p
 where p.pronamespace = 'public'::regnamespace
   and p.prokind = 'f'
   and (has_function_privilege('anon', p.oid, 'EXECUTE') or has_function_privilege('authenticated', p.oid, 'EXECUTE'))
 order by 1, 2;
(4) For every such function that is not SECURITY DEFINER: what calls or uses it:
with cand as (
  select p.oid, p.proname
    from pg_proc p
   where p.pronamespace = 'public'::regnamespace
     and p.prokind = 'f'
     and not p.prosecdef
     and not exists (select 1 from pg_depend d where d.classid = 'pg_proc'::regclass and d.objid = p.oid and d.deptype = 'e')
     and (has_function_privilege('anon', p.oid, 'EXECUTE') or has_function_privilege('authenticated', p.oid, 'EXECUTE'))
)
select c.proname as helper,
       (select string_agg(distinct q.proname || case when q.prosecdef then ' (definer)' else ' (invoker)' end, ', ' order by q.proname || case when q.prosecdef then ' (definer)' else ' (invoker)' end)
          from pg_proc q
         where q.pronamespace = 'public'::regnamespace and q.oid <> c.oid
           and q.prosrc ~ ('\m' || c.proname || '\s*\(')) as called_by_functions,
       (select string_agg(distinct t.relname || '.' || pol.polname, ', ')
          from pg_policy pol join pg_class t on t.oid = pol.polrelid
         where (coalesce(pg_get_expr(pol.polqual, pol.polrelid), '') || ' ' || coalesce(pg_get_expr(pol.polwithcheck, pol.polrelid), ''))
               ~ ('\m' || c.proname || '\s*\(')) as used_by_policies,
       (select string_agg(distinct v.viewname, ', ')
          from pg_views v
         where v.schemaname = 'public' and v.definition ~ ('\m' || c.proname || '\s*\(')) as used_by_views,
       (select string_agg(distinct k.conrelid::regclass::text || '.' || k.conname, ', ')
          from pg_constraint k
         where k.connamespace = 'public'::regnamespace and k.contype = 'c'
           and pg_get_constraintdef(k.oid) ~ ('\m' || c.proname || '\s*\(')) as used_by_checks,
       (select string_agg(distinct i.indexrelid::regclass::text, ', ')
          from pg_index i join pg_class t on t.oid = i.indrelid
         where t.relnamespace = 'public'::regnamespace
           and pg_get_indexdef(i.indexrelid) ~ ('\m' || c.proname || '\s*\(')) as used_by_indexes,
       (select string_agg(distinct a.adrelid::regclass::text, ', ')
          from pg_attrdef a join pg_class t on t.oid = a.adrelid
         where t.relnamespace = 'public'::regnamespace
           and pg_get_expr(a.adbin, a.adrelid) ~ ('\m' || c.proname || '\s*\(')) as used_by_column_defaults,
       (select string_agg(distinct g.tgrelid::regclass::text || '.' || g.tgname, ', ')
          from pg_trigger g
         where g.tgfoid = c.oid and not g.tgisinternal) as fired_by_triggers
  from cand c
 order by 1;
   Decide from them, and say each decision in the report:
   (i) THE SET S = the rows of query 3 with granted_to_public = true AND extension_member = false. EXPECTED SHAPE: fourteen rows, all with definer = false — three with is_trigger = true, eleven with is_trigger = false. If S has any other shape: write NO statement of step A2 (M13 then carries Part B only and says so in its first comment line), report the counts by is_trigger and definer, and continue with the rest of the turn.
   (ii) For each of the eleven, query 4's row: a function is LEFT OUT of A2 — and named in the stop report with the reason — when a policy, a view or a column default uses it, or when a caller's-rights function that the app calls by name (a `.rpc("<name>"` under src/) or that a policy, a view or a column default uses, calls it, directly or through other caller's-rights functions. The supervisor's reading of the migration files finds no such path for any of the fourteen; your live read confirms or refutes it. A use by a check constraint, an index or a trigger is not a reason to leave a function out.
   (iii) Query 2: if a row for the role that runs your migrations (query 1's owner of the newest functions; say how you know) has in_schema `(every schema)` and its acl names anon or authenticated — write no ALTER DEFAULT PRIVILEGES statement, report the row, continue.
A2 THE STATEMENTS, in this order:
   ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE ALL ON TABLES FROM anon, authenticated;
   ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE ALL ON SEQUENCES FROM anon, authenticated;
   ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE ALL ON FUNCTIONS FROM anon, authenticated;
   (No FOR ROLE clause: the statement then speaks for the role that runs the file, which on each database is the role that creates that database's later objects.)
   For each of the three trigger functions of S: REVOKE ALL ON FUNCTION public.<name>(<identity arguments>) FROM PUBLIC, anon, authenticated;
   For each of the eleven that step A1 (ii) keeps in: REVOKE ALL ON FUNCTION public.<name>(<identity arguments>) FROM PUBLIC, anon, authenticated; then GRANT EXECUTE ON FUNCTION public.<name>(<identity arguments>) TO service_role; (a row written by the server's own client reaches some of them through a check constraint; a trigger needs no such grant.)
   NOTHING ELSE: no extension is moved (pg_trgm stays in schema public — supervisor's ruling); no table privilege changes; the default privileges of any other role and of any other schema are not touched; no function of an extension is touched.
A3 PROOFS in M13's DO block:
   (a) for every function A2 closed: has_function_privilege is false for anon and for authenticated; for each of the eleven it is true for service_role;
   (b) the number of functions of schema public that are not extension members and are executable through PUBLIC equals the number A1 (ii) left out (expected 0);
   (c) BORN CLOSED — inside an inner block undone by its own raised signal: create table public.e2e_mig_b8_<random> (id int) and sequence public.e2e_mig_b8_<random>_s; assert that anon and authenticated hold NO privilege on the table (SELECT, INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER) and none on the sequence (USAGE, SELECT, UPDATE); drop both inside the block.
   A new FUNCTION is not proved here: it still receives EXECUTE through PUBLIC when it is created, which is why step A4's check exists.
A4 THE MIGRATION CHECK asks every new function to close itself. In scripts/check-migrations.sh, beside the SECURITY DEFINER rule (:185–231), add the same rule for EVERY function: a migration file whose stamp is at or after M13's own stamp and that creates a function — definer or not, trigger functions included — must contain, in the same file, a REVOKE statement that names that function AND names PUBLIC. Its floor is a variable of its own, set to M13's file stamp. The DEC-022-B allowlist (:233 and after) serves this rule as it serves the definer rule. PROVE the rule in the script's own self-test style: one fixture that must be flagged (a new caller's-rights function with no REVOKE), one that must be flagged (a REVOKE that names the function but not PUBLIC), one that must pass; the existing self-tests stay green. M13 itself passes (Part B's function carries its REVOKE … FROM PUBLIC, anon). Change nothing else in the script.
A5 THE LINT BASELINE. After the apply, run on ethio-prod the SELECT that the third lint runs (supabase/migrations/20261007033719_9f7deb8a-e850-4fc3-bfc0-9693f6994666.sql :375–379) and set `function_executable_by_anon` in scripts/security-lints-baseline.json to the number it returns (today 27; expected 13 = 27 minus the fourteen). Also paste query 2 again (the default privileges after the apply).
A6 docs/features/ci-guards.md gains the new rule of A4 in the form the definer rule is described there; docs/features/security-scanning.md follows the new baseline number wherever it states the old one. One changelog line that names no function.

STOP REPORT FOR TURN 2. First lines: done or not done for step 0, B1 to B6, A1 to A6; any platform bump; any file outside a step's list. Then: the six ci-status lines read at the start; the four A1 results whole and the three decisions in words; the redeclaration's live-beside-file facts; PR-41's red lines; the "Self-marking guard OK" line and the new rule's self-test lines; the apply's result; the read-backs; `apply <fragment> → expect mark <value>`; "expected red: the E2E preflight (STAGING BEHIND) and PR-41, until the staging apply"; typecheck, format:check, lint, the whole unit suite, the local run of e2e/posting-routes-catalog.spec.ts (every test but PR-41 green); the file list from `git diff --name-only 5a8c4df1`; "Logs read: … · unavailable: …"; limitations. Never "CI green" from a local run. A commit title says what the commit holds.

PART D — SHORT BUTTON AND ACTION LABELS EVERYWHERE (D81) AND THE LIVE TEXTS BROUGHT LEVEL (INC-488; turn 3)
The rule (AGENTS.md :27): a button or action label is two or three words, no article, no bracketed remark, in every language; an explanation is written once, as help text, never inside a button. For Amharic the limit this bundle checks is FOUR words (Amharic writes several one-word English terms as two).
D1 THE TABLE. Save the JSON block below, byte for byte, as docs/governance/briefs/bundle-8-strings.json (UTF-8, LF, one trailing newline). By script, for every key under "set": src/i18n/locales/en.ts and am.ts hold exactly its "en" and "am" (a key that does not exist yet is added beside its neighbours; the file's own spelling of a value, literal or \u escapes, is yours); every key under "remove" leaves both files. Then the script reads the three back and prints, per key, `key | en | am`; paste that list in the report (every changed Amharic string is read by the supervisor before it ships).
----- BEGIN bundle-8-strings.json (the file is the lines between the two marker lines, with one trailing newline; 3472 bytes; sha256 81f118f31f4192b8564cdcfb8ed71a469da3108fe9c41c886aa304373e32a17e) -----
{
 "set": {
  "admin.attributes.export.busy": {
   "en": "Exporting…",
   "am": "በመላክ ላይ…"
  },
  "admin.categories.export.busy": {
   "en": "Exporting…",
   "am": "በመላክ ላይ…"
  },
  "admin.locations.export.busy": {
   "en": "Preparing file…",
   "am": "ፋይሉ እየተዘጋጀ ነው…"
  },
  "admin.categories.bulk.generateMissing": {
   "en": "Generate missing",
   "am": "የጎደሉትን አመንጭ"
  },
  "admin.countries.close.forceConfirm": {
   "en": "Close anyway",
   "am": "ቢሆንም ዝጋ"
  },
  "admin.countries.rail.reset": {
   "en": "Reset order",
   "am": "ቅደም ተከተሉን መልስ"
  },
  "admin.coverage.create.open": {
   "en": "Add plan",
   "am": "እቅድ አክል"
  },
  "admin.locations.create.open": {
   "en": "Add place",
   "am": "ቦታ ጨምር"
  },
  "admin.locations.action.createChild": {
   "en": "Add place inside",
   "am": "ውስጡ ቦታ ጨምር"
  },
  "admin.translations.add.fromList": {
   "en": "Choose from list",
   "am": "ከዝርዝሩ ይምረጡ"
  },
  "admin.translations.add.manual": {
   "en": "Enter manually",
   "am": "በእጅ ያስገቡ"
  },
  "auth.backToSignIn": {
   "en": "Back to sign-in",
   "am": "ወደ መግቢያ ተመለስ"
  },
  "auth.resendCooldown": {
   "en": "Resend in {s}s",
   "am": "በ{s} ሰከንድ እንደገና ላክ"
  },
  "auth.telegramSlot": {
   "en": "Telegram coming soon",
   "am": "Telegram በቅርቡ ይመጣል"
  },
  "mfa.enroll": {
   "en": "Set up two-factor",
   "am": "ማረጋገጫውን ያዋቅሩ"
  },
  "mfa.verifyActivate": {
   "en": "Verify and enable",
   "am": "አረጋግጠው ያብሩ"
  },
  "nav.postListing": {
   "en": "Post listing",
   "am": "ማስታወቂያ ይለጥፉ"
  },
  "post.assist.action": {
   "en": "Write for me",
   "am": "ለእኔ ይጻፍልኝ"
  },
  "post.pin.remove": {
   "en": "Remove pin",
   "am": "ምልክቱን አስወግድ"
  },
  "post.review.fixStep": {
   "en": "Open step {step}",
   "am": "ደረጃ {step} ይክፈቱ"
  },
  "post.review.previewAsBuyer": {
   "en": "Preview as buyer",
   "am": "ገዢዎች እንደሚያዩት ይመልከቱ"
  },
  "post.specs.optionsLoading": {
   "en": "Loading choices…",
   "am": "ምርጫዎቹ በመጫን ላይ…"
  },
  "post.specs.useModelValue": {
   "en": "Use model's value",
   "am": "የሞዴሉን ዋጋ ይጠቀሙ"
  },
  "post.where.addCity": {
   "en": "Add city",
   "am": "ከተማ ጨምር"
  },
  "post.where.addCountry": {
   "en": "Add country",
   "am": "አገር ጨምር"
  },
  "post.where.addRegion": {
   "en": "Add region",
   "am": "ክልል ጨምር"
  },
  "settings.removePasswordConfirmYes": {
   "en": "Yes, remove",
   "am": "አዎ፣ አስወግድ"
  },
  "settings.signOutOthers": {
   "en": "Sign out others",
   "am": "ከሌሎች መሣሪያዎች ይውጡ"
  },
  "settings.signOutOthersConfirmYes": {
   "en": "Yes, sign out",
   "am": "አዎ፣ ያስወጣቸው"
  },
  "auth.alreadyConfirmedPrompt": {
   "en": "Already confirmed?",
   "am": "አስቀድሞ ተረጋግጧል?"
  },
  "auth.toggleToSignInPrompt": {
   "en": "Already have an account?",
   "am": "አካውንት አለዎት?"
  },
  "auth.toggleToSignUpPrompt": {
   "en": "New here?",
   "am": "አዲስ ነዎት?"
  }
 },
 "remove": [
  "auth.alreadyConfirmedSignIn",
  "auth.toggleToSignIn",
  "auth.toggleToSignUp"
 ]
}
----- END bundle-8-strings.json -----
D2 THREE BUTTONS THAT HELD A QUESTION (src/routes/auth.tsx). Each becomes a plain-text prompt followed by a button whose label is an existing key; the button keeps its handler, its test id if it has one, and a 44-pixel touch height; the prompt is not pressable.
   - :465 (`auth.alreadyConfirmedSignIn`) → prompt `auth.alreadyConfirmedPrompt`, button `auth.signIn`.
   - :588, the sign-in view (`auth.toggleToSignUp`) → prompt `auth.toggleToSignUpPrompt`, button `auth.createAccount`.
   - :588, the sign-up view (`auth.toggleToSignIn`) → prompt `auth.toggleToSignInPrompt`, button `auth.signIn`.
D3 THE CENSUS BECOMES A CHECK. scripts/list-action-labels.ts (kept from turn 1) changes in three ways, and gains a unit test beside it (scripts/list-action-labels.test.ts — vitest already runs scripts/**/*.test.ts, so no workflow changes):
   (a) A `label` prop counts as an action label only when the component that receives it draws it inside something a person presses. FormField, Field and StatCard labels are the names of fields and figures: they are listed with kind `field` and are never flagged (89 of turn 1's 312 rows).
   (b) Keys picked at run time: the key literals handed to `verb(…)` as its label key in src/features/admin-countries/country-verb-bar.tsx (:35) and src/features/admin-locations/location-verb-bar.tsx (for example :96) are action labels (kind `button`); both arms of a ternary count. The other run-time places stay unlisted; print their count.
   (c) Flags, for action kinds only: over3 (more than three English words; a `{token}` is one word, "…" is none), article (a, an, the as whole words), bracket ("(" or "["), am_over4 (more than four Amharic words; tokens and lone punctuation are not words).
   The test: (i) on small in-test samples — a four-word button is flagged, a three-word one is not, a FormField label is not counted, an article is flagged, a bracket is flagged, a five-word Amharic label is flagged; (ii) on the real tree — no action label is flagged outside scripts/action-label-allowlist.txt (one line per key: `key | reason`). The allowlist starts with ONE line: `post.specs.helpMoreMark | a mark, not words`. A flag this brief gives no text for: do not reword it; add it to the allowlist with the reason `awaiting the supervisor's text (bundle 8)` and name it in the report's first lines.
   Regenerate docs/governance/briefs/bundle-8-labels.csv with the changed script.
D4 TESTS THAT ASSERT A CHANGED TEXT. Census under e2e/ and src/ of every assertion or locator that uses the old English or Amharic words of a key in the table, or of the three removed keys: each follows the new text or structure — nothing is loosened; a locator by text becomes the same text's new words or the element's test id. Run every spec file you changed whole, as the local-run rule says, and every spec that exercises src/routes/auth.tsx.
D5 THE LIVE TEXTS. The published site layers the Translations store's approved rows over the compiled catalogs, so a changed text shows on the live site only once the store's row changes too (turn 1 found five such rows). As in turn 1's step D0 (b): read the published site's /api/i18n/en and /api/i18n/am again (two GETs, nothing else), compare by script, and write docs/governance/briefs/bundle-8-am-import.csv with the console's own CSV writer (src/features/admin/translations/io-formats.ts — the columns its export writes): one row for every key the live Amharic answer holds whose text differs from am.ts AFTER this turn's changes. In the report: that file's row count and keys; the number of keys whose live ENGLISH text differs from en.ts after this turn (the operator's "Sync keys" press brings those level — no file is needed for them). Change no row in any database.
D6 Regenerate the usage maps. One changelog line.

PART F — DOCS AND THE FINAL REPORT (turn 3)
F1 docs/features/attributes.md, where it describes what `validate_listing_attributes` refuses (:798, :873), gains Part B's rule and its kept-combination case; docs/features/translations.md gains four lines under a heading "A changed seed text" — a text changed in en.ts reaches the live site after "Sync keys"; a changed text of another language reaches it after an import or an edit and its approval; why (the store's approved rows lie over the compiled catalogs); INC-488.
F2 AGENTS.md gains two lines, beside the migration lines it already has: `- A new table, sequence or function of schema public is born closed to the browser roles: its migration names every GRANT it needs (a browser grant only with its line in scripts/public-surface-allowlist.txt), and every new function restates REVOKE … FROM PUBLIC in its own file (bundle 8, M13).` and `- An action label that the label check flags (scripts/list-action-labels.test.ts) is shortened by a text the brief gives; the allowlist takes a key only with its reason.`
F3 roadmap.md: tick bundle 8's lines that landed. In the list under `### After bundle 7, in this order`, item 3 (the tidy-up round) gains, at its end: `; the Translations store follows a changed seed text by itself (INC-488's class); a full read of the Amharic catalog (INC-489)`. Directly above that heading, after bundle 8's block, add this block (a blank line before and after it; the lines below WITHOUT their two leading spaces):
  ### Bundle 9 — the house style (agreed with the operator on 2026-10-07; not built in bundle 8; its brief follows the supervisor's explanation)

  - [ ] Colour by meaning as tokens — primary, danger, success, warning, info, neutral; corners 6 px; stronger borders; fine row rules; soft shadows on cards, tables and figures, stronger ones on menus and dialogs
  - [ ] Row actions everywhere: Edit and Delete as icons (Edit grey, Delete red) and a three-dots menu for the rest; every icon button has a name and a tooltip; one shared building block
  - [ ] Tables: a toolbar (search, Filters with its count, columns), filter chips with "Clear all", a selection bar; the footer holds the count at the left, rows per page in the centre and the page numbers at the right; on a phone one card per row
  - [ ] The shell: the top bar stays in place on every screen size; the panel tabs stay below it; the left menu stays in place with no scroll bar of its own on a desktop, becomes an icon strip on small screens that opens to the full menu, and holds Sign out at its foot; breadcrumbs stay
  - [ ] Phones: a bottom bar with the common actions (its five items are confirmed with the operator first)
  - [ ] Space: one page padding, owned by the shell — 8 px on phones, 16 px above; list pages use the full width
  - [ ] One written rule and one automatic check per element; existing screens are listed in a baseline that only shrinks
  - [ ] The public marketplace pages (cards in two columns) are designed after this, under the same rules
F4 docs/_changelog.md: the turn's lines.
FINAL REPORT (the whole of it). First lines: done or not done for D1 to D6 and F1 to F4; any platform bump; any file outside a step's list; any key put on the allowlist as awaiting text. Then: the six ci-status lines read at the start of the turn (for turn 2's commit, after the operator's staging apply and re-run); the `key | en | am` list of D1; the label check's counts (action rows, field rows, flags, allowlist lines, run-time places); D4's census (file, line, old words, new words); D5's counts and keys; the unit suite; each changed spec file's local run lines; typecheck, format:check, lint; the file list from `git diff --name-only <turn 3's first commit>^`; "Logs read: … · unavailable: …"; limitations. Never "CI green" from a local run.
```
