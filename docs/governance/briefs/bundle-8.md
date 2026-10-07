# Bundle 8 brief — v1 (saved unchanged, 2026-10-07; turn 1 in full: step 0, four censuses, Part C and Part E; Parts A, B, D and F arrive in version 2)

```text
BUNDLE 8 — THE SECURITY AND WORDING ROUND, VERSION 1 (2026-10-07). Five parts: A — new database objects are born closed and the remaining helper functions are closed (INC-480, INC-482); B — the answer door enforces an option's `allowed` list (INC-477); C — a message that names a leaked password; D — short button and action labels everywhere (D81) and the live texts brought level with the code (INC-488); E — two browser tests wait for the right name list (INC-487); then F, the docs and the final report. Tier A (privileges, a listing door, the auth forms). ESTIMATE three executor turns, one migration.
THIS VERSION SPECIFIES TURN 1 IN FULL: step 0, four censuses, Part C and Part E. Parts A, B, D and F are NAMED here and specified in VERSION 2, which replaces this file before turn 2 — its exact statements depend on what turn 1's censuses read from the live database, and the supervisor writes it the moment turn 1 is verified.
Line numbers are as of commit 205681a8 (dev). THIS BRIEF IS PUBLIC (the repository is public until launch, DEC-116): it is written as build instructions; add no sentence to the repository that says what someone could do before a step landed.

STEP 0 — keep this brief
- Before anything else, save this file byte for byte as docs/governance/briefs/bundle-8.md (it is already in its saved form: the header line and one fenced text block). On every later turn, read that file first.
- roadmap.md line 3 (it begins `No bundle brief is in force`) becomes exactly: `Bundle 8 brief: docs/governance/briefs/bundle-8.md (read first every turn).`
- roadmap.md: directly above the heading `### After bundle 7, in this order`, add this block (a blank line before and after it; the lines below WITHOUT their two leading spaces):
  ### Bundle 8 — the security and wording round (in progress)

  - [ ] Part A — new database objects are born closed; the remaining helper functions are closed (INC-480, INC-482)
  - [ ] Part B — the answer door enforces an option's allowed list (INC-477)
  - [ ] Part C — a message that names a leaked password
  - [ ] Part D — short button and action labels everywhere (D81); the live texts brought level with the code (INC-488)
  - [ ] Part E — PW-147 and PW-130 wait for the name list built from both names (INC-487)
  - [ ] Part F — docs and final report
- roadmap.md, the list under `### After bundle 7, in this order`: item 1 (the line that begins `1. The next bundle (not specced`) becomes exactly: `1. Bundle 8 — the security and wording round (its block above)`. Tick a line only in the turn whose report says it landed with its tests. Change nothing else in the file in this step.

HOW TO WORK
- Order of turns. TURN 1 = step 0, then the censuses A0, B0, C0 and D0 (read-only), then PART C and PART E (code and tests), push, END THE TURN. Do not stop between the steps: a clean point is not a reason to stop. Stop only for a question this brief cannot answer or the end of the turn. If the platform ends the turn early, stop at a clean point (typecheck, format:check, lint and every spec file you touched green), report three lines — done, left, CI — and the operator sends "continue". TURN 2 and after: version 2 of this brief.
- The turn starts by reading CI for the last commit on dev: https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md, then e2e-last-failure.md and guards-last-failure.md at the same address. Paste the first six lines of ci-status.md (expected: commit 205681a, SUCCESS, run 37610370674). A red is fixed first. You cannot git-fetch the ci-evidence branch from your sandbox; the three raw addresses are the only way you read CI.
- Browser tests are started only with `bun run e2e:local <files>` or `bun run e2e:changed` (AGENTS.md; DEC-146). Never a plain `playwright test`. Nothing in this bundle signs in to, or runs a test against, ethio-prod or the published site.
- Local runs (G37): each spec file you changed, run whole, alone, both projects (mobile-360, desktop-1280), 2 workers, 0 retries, fake mode. "A file that is not fully green is not committed." There is no end-of-bundle local run: CI on the turn's final commit is the full proof. Unit tests (vitest) run whole. A local run never writes "CI green".
- Tests (G38): a red is fixed at its root. No assertion is loosened, no timeout raised, no retry added, no test skipped or moved to make a run pass. Every test seeds its own scratch rows and removes them in `finally`; a pooled account is leased, never a real one; no test changes a real reference row. A shared helper never changes its default. Spec files are edited by hand, never by search-and-replace. To show a test failing on old code: put the old file back, show the failing line, restore the file and show an empty diff — no named git command is asked of you.
- Migrations: NONE in turn 1. Nothing in turn 1 writes to a database. Version 2 names the one migration (M13) and its rules.
- Production reads (the censuses): with your query tool on ethio-prod, SELECT only. A report carries counts, booleans and the names of functions, tables, roles and extensions — never an e-mail address, a user id, a token or a row of user data.
- WHERE CENSUS ANSWERS GO. A0 and B0: in your REPORT ONLY — no object name they return goes into any file, test, comment, commit title or log (DEC-132 rule 2). D0: into the two files step D0 names (interface strings are public text). C0: in the report.
- Closed surfaces (G22): the workflow files, the migration check and the failure reporter are not touched in turn 1.
- Platform bumps (DEC-134): if the platform changes package.json or bun.lock at the start of the turn, say so in the FIRST lines of your report and leave it. You never change a package yourself in this bundle.
- Strings: turn 1 adds exactly ONE string, given in Part C. A text this brief gives is copied by key, character for character (AGENTS.md); you write no Amharic of your own. Button labels (AGENTS.md, D81) are not changed in turn 1 — Part D's texts arrive in version 2.
- Scope: only the files a step names, plus the generated files the scripts regenerate (docs/generated/i18n-usage.json, public/i18n-usage.json). A file you create outside a step's list is named in the report's first lines with its reason.
- Records: you write the changelog lines; the decision and incident ledgers are written by the supervisor's records turn at the close.
- The commit that is judged by CI ends the turn: push, END THE TURN, send nothing after it.

A0 CENSUS — WHAT THE BROWSER ROLES HOLD TODAY (read-only; REPORT ONLY). Run these six queries on ethio-prod exactly as written and paste each result whole. If your query tool refuses one, paste the refusal and say which.
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
(5) The installed extensions and their schemas:
select e.extname, e.extnamespace::regnamespace::text as in_schema, e.extversion
  from pg_extension e
 order by 1;
(6) Tables and sequences of schema public, by browser role:
select r.role,
       count(*) filter (where c.relkind in ('r', 'p')) as tables,
       count(*) filter (where c.relkind in ('r', 'p') and has_table_privilege(r.role, c.oid, 'INSERT')) as can_insert,
       count(*) filter (where c.relkind in ('r', 'p') and has_table_privilege(r.role, c.oid, 'UPDATE')) as can_update,
       count(*) filter (where c.relkind in ('r', 'p') and has_table_privilege(r.role, c.oid, 'DELETE')) as can_delete,
       count(*) filter (where c.relkind in ('r', 'p') and has_table_privilege(r.role, c.oid, 'TRUNCATE')) as can_truncate,
       count(*) filter (where c.relkind = 'S') as sequences,
       count(*) filter (where c.relkind = 'S' and has_sequence_privilege(r.role, c.oid, 'USAGE')) as seq_usage,
       count(*) filter (where c.relkind = 'S' and has_sequence_privilege(r.role, c.oid, 'UPDATE')) as seq_update
  from pg_class c
 cross join (values ('anon'), ('authenticated')) as r(role)
 where c.relnamespace = 'public'::regnamespace
   and c.relkind in ('r', 'p', 'S')
 group by r.role
 order by 1;
Then, in words, in the report: (a) which role your migration tool runs as (the owner column of query 1 for the newest functions, for example security_lints, answers it); (b) for query 3, which rows are named in scripts/public-surface-allowlist.txt and which are not; (c) for an extension that sits in schema public: which of OUR functions, indexes and operators use it, by name and count. Change nothing.

B0 CENSUS — THE ANSWER DOOR TODAY (read-only; REPORT ONLY).
(a) public.validate_listing_attributes as it is live: its identity arguments, SECURITY DEFINER or not, volatility, its settings (proconfig), and whether its live body equals the body in supabase/migrations/20261006225254_626282eb-da6f-45aa-ac32-ef03407502a5.sql (:16–363) apart from line endings — "equal", or the lines that differ. Version 2 redeclares it whole from the live definition.
(b) How many attribute definitions carry an option with a non-empty `allowed` object, and how many options in all.
(c) How many listings today hold an answer OUTSIDE such a list — a question answered with one value whose option carries `allowed` for a second question, while the listing's answer to that second question holds a value the list does not name. A count only, by listing status; paste the SQL you ran. Zero is an answer; say so.

C0 CENSUS — THE PROVIDER'S ANSWER FOR A REFUSED PASSWORD (read-only; in the report). In the installed auth client (node_modules/@supabase/auth-js; give its version): the error it returns when the provider refuses a password as weak — the class, its `code`, and the field that carries the REASONS with every value that field can hold — quoted with file and line. Say whether `signUp` and `updateUser` hand that same object back as `error`.

D0 CENSUS — LABELS AND LIVE TEXTS (read-only; two files, plus counts in the report).
(a) EVERY ACTION LABEL. One new script under scripts/ (name it by what it does; keep it — version 2 decides whether it becomes a check) walks src/ and writes docs/governance/briefs/bundle-8-labels.csv (UTF-8, LF, RFC 4180, a header row): one row for every interface string that is drawn as the visible words of something a person presses — a Button or button, a link drawn as a button, a menu item, a dialog's action and cancel, a tab, a toggle, a pressable chip — including a label handed down as a prop to a shared component that draws it inside such a control. Columns: key, en, am (both from src/i18n/locales), words_en (the number of English words), kind (button, link, menu, dialog, tab, toggle, chip), file and line of its first use, uses (how many places), flags (any of: over3 — more than three English words; article — it holds "a", "an" or "the"; bracket — it holds a bracket). A string used only as an aria-label of an icon-only control is listed with kind `aria` and is not flagged. The same key is one row. In the report: the row count, the count per flag, and how you found labels passed as props.
(b) THE LIVE TEXTS AGAINST THE CODE. The site layers the Translations store's approved rows over the compiled catalogs (src/i18n/provider.tsx :487–509), so a text changed in en.ts or am.ts shows on the live site only once the store's row changes too. Read the two bundles the published site itself serves to every visitor — one GET each of /api/i18n/en and /api/i18n/am on the published site's address (src/routes/api/i18n.$lang.ts; public, no sign-in; request nothing else from the published site) — and compare each with its catalog by script. Write docs/governance/briefs/bundle-8-live-text.csv (same form): one row per key whose live text differs from the catalog's — columns lang, key, catalog, live. In the report, per language: keys in the catalog; keys in the live bundle; keys that differ; keys in the catalog with no live row; keys in the live bundle that the catalog no longer has. If your sandbox cannot reach the published site, say so in the first lines of the report and read the same from ethio-prod with your query tool instead (public.ui_translations: key, lang_code, value for the approved rows of the two languages), page by page.
Change no string and no row in this step.

PART C — A MESSAGE THAT NAMES A LEAKED PASSWORD (turn 1; no migration; one new string)
C1 THE MAPPER BECOMES ITS OWN PURE FILE. `isEmailNotConfirmed` and `toErrorKey` (src/features/auth/auth-service.ts :38–66) move, unchanged, into one small file beside it (name it by the repository's rule) and are exported; auth-service.ts imports them; `failure` (:68–74) stays where it is. Every caller keeps working as before (:94 … :553 — fifteen call sites; none changes).
C2 THE LEAKED CASE. The mapper's argument gains the provider's reasons as census C0 names them (an optional, read-only list of strings). The weak-password branch (:57–59) answers `auth.errorLeakedPassword` when the error's code is the weak-password code AND its reasons name the leaked-password reason and no other; in every other weak-password case it answers `auth.errorWeakPassword` exactly as today. The leaked case is decided by the reasons only — no new test of the message text. `failure` passes the provider's error object through, so the reasons arrive without any call site changing.
C3 THE STRING — ONE new key in src/i18n/locales/en.ts and am.ts, directly after `auth.errorWeakPassword` (en.ts :71; am.ts :70), copied character for character:
   key: auth.errorLeakedPassword
   en: This password appeared in a known data leak. Choose a different one.
   am: ይህ የይለፍ ቃል ሾልከው ከወጡ የይለፍ ቃሎች መካከል ነው። ሌላ ይምረጡ።
   Regenerate the usage map (the script CI's "i18n used-on map is fresh" job runs). The Amharic script guard (src/i18n/locales/am-script.test.ts) stays green.
C4 TESTS — unit cases in a test file beside the new file: (i) the weak-password code with the leaked reason alone answers the new key; (ii) the weak-password code with a length reason answers `auth.errorWeakPassword`; (iii) the weak-password code with the leaked reason AND another reason answers `auth.errorWeakPassword`; (iv) the weak-password code with no reasons answers `auth.errorWeakPassword`; (v) the old message test ("password should be") still answers `auth.errorWeakPassword`; (vi) one case each for three other branches of the mapper, to pin that the move changed nothing (invalid credentials; e-mail in use; the 429 status). No browser test: the provider's check is switched off on ethio-staging by decision, and stays off.
C5 One changelog line.

PART E — TWO TESTS WAIT FOR THE NAME LIST BUILT FROM BOTH NAMES (INC-487; turn 1; test files only)
What is read in the code: each name box asks the door for suggestions when it loses focus, and the latest answer wins (src/features/posting/step-who.tsx :375–385). With the first name alone the door's first suggestion is the bare first name; with both names it is the two names joined (supabase/migrations/20261004055007_5118f016-…sql :248, :260 — lower-cased, cut at 28 characters). PW-147 (e2e/post-wizard-bundle2.spec.ts :389–447) polls for any name that contains "abebe" (:415–420), reads the three names (:422) and later clicks the first (:443–444): when the first box's answer is drawn before the second box's answer arrives, the test reads the first list and the second list replaces it before the click. PW-130 (:350–387) reads its list the same way (:372–378).
E1 In both tests, after the name boxes are filled and before the names are read, wait until ONE offered name equals the lower-cased first and last name joined (cut at 28 characters). The existing poll for "abebe" and every existing assertion stay as they are — a wait is added, nothing is removed and no timeout is raised.
E2 Census of the class: every other place under e2e/ that reads the suggestion list after typing a name (:473, :479 and any other reader of `post-who-alias-suggestion`) — say for each whether it reads names it then acts on; fix the same way where it does.
E3 Proof (a race cannot be shown red on demand; say so): run e2e/post-wizard-bundle2.spec.ts whole as the local-run rule says, then PW-147 and PW-130 alone with `--workers=1 --repeat-each=10`, both projects (the serial lane's shape) — paste the pass lines.
E4 One changelog line.

NAMED FOR VERSION 2 (not built in turn 1)
- PART A — one migration, M13, written last in its turn: the default privileges of the role that runs migrations stop handing new tables, sequences and functions of schema public to the two browser roles; the helper functions census A0 clears lose their EXECUTE for PUBLIC and the two browser roles; the migration check asks every new function to restate its REVOKE and GRANT lines in its file; the lints' baseline is lowered. Then the operator's staging step.
- PART B — in the same migration: public.validate_listing_attributes redeclared whole from the live definition with one added rule beside the bounds fold (:102–131 of the M10 file) — an option's `allowed` list is folded the way the form folds it (src/features/posting/step-specifications.tsx :516–531) and a value outside it is refused `optionNotAllowed`, unless the stored row already holds that same combination. Route test PR-41, red first.
- PART D — the shortened English and Amharic labels (the operator reads the list first), as a strings file; the tests that assert a label's words; after the Publish the operator presses "Sync keys" and imports one Amharic file.
- PART F — docs/features updates and the final report.

REPORT FOR TURN 1 (the whole of it). First lines: done or not done for step 0, A0, B0, C0, D0 (a), D0 (b), C1 to C5, E1 to E4; any platform bump; any file outside a step's list. Then: the six ci-status lines; the A0 results whole and the three answers in words; B0; C0 with its quoted lines; D0's counts; the unit cases' result lines; the local browser run lines; typecheck, format:check, lint, the whole unit suite; the new string key by key with its English; the file list from `git diff --name-only 205681a8`; "Logs read: … · unavailable: …"; limitations. Never "CI green" from a local run. A commit title says what the commit holds.
```
