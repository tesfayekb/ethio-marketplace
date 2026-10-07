# Bundle 8 brief — v3 (saved unchanged, 2026-10-07; replaces v2 — turns 1 and 2 landed at 5a8c4df1 and bd9a7032; this version specifies the one turn that is left: Parts D and F, then migration M14 with the answer door's entry rule and Part A)

```text
BUNDLE 8 — THE SECURITY AND WORDING ROUND, VERSION 3 (2026-10-07). THIS FILE REPLACES VERSION 2. Turn 1 landed at 5a8c4df1 and turn 2 at bd9a7032 (step 0, Part B with migration M13, the born-closed rule of the migration check); both are verified. This version specifies everything that is left, in ONE turn: TURN 3 = Part D, Part F, then ONE migration, M14, written last — the answer door's entry rule (B7) and Part A. Tier A (a listing door, privileges, the auth forms).
Line numbers are as of commit bd9a7032 (dev). THIS BRIEF IS PUBLIC (the repository is public until launch, DEC-116): it is written as build instructions; add no sentence to the repository that says what someone could do before a step landed.

ANSWERS TO TURN 2'S REPORT
- The set S had fifteen rows where version 2 expected fourteen: version 2's number was the supervisor's error. Writing no privilege statement was right. Part A below is written for fifteen.
- "The fold compares the chosen value untrimmed, while the check trims each element": step B7 settles it — the door trims once, at its start.
- PR-41's cleanup through the file's shared afterEach is accepted.
- The 171 warnings of the platform's own linter are known and ruled (signed-in doors by design, the public read doors by design, one extension); nothing to look at.
- The platform's package bump of turn 2 (2.25.3 → 2.26.0) is read and ruled by the supervisor; leave it.

STEP 0 — keep this brief
- Before anything else, save this file byte for byte OVER docs/governance/briefs/bundle-8.md (it is already in its saved form: the header line and one fenced text block). On every later turn, read that file first. roadmap.md line 3 stays as it is.
- roadmap.md, the block `### Bundle 8 — the security and wording round (in progress)`: tick a line only in the turn whose report says it landed with its tests.

HOW TO WORK
- Order of the turn. Step 0; Part D; Part F; then the tests of B7 (shown red first); then THE MIGRATION M14, written LAST; the read-backs; the baseline (A5); push; the STOP REPORT (it is also the bundle's final report); END THE TURN. Do not stop between steps: a clean point is not a reason to stop. Stop only for a question this brief cannot answer or the end. If the platform ends the turn early, stop at a clean point (typecheck, format:check, lint and every spec file you touched green), report three lines — done, left, CI — and the operator sends "continue".
- The turn starts by reading CI for the last commit on dev: https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md, then e2e-last-failure.md and guards-last-failure.md at the same address. Paste the first six lines of ci-status.md. The run on commit bd9a703 is expected red at its E2E preflight (STAGING BEHIND) until the operator's staging apply of M13, which is done before this turn starts; its re-run may still be going, or may be cancelled by your own first push — say which you see and go on. A red that is neither the preflight nor a cancelled run is fixed first. You cannot git-fetch the ci-evidence branch from your sandbox; the three raw addresses are the only way you read CI.
- Browser tests are started only with `bun run e2e:local <files>` or `bun run e2e:changed` (AGENTS.md; DEC-146). Never a plain `playwright test`. Nothing in this bundle signs in to, or runs a test against, ethio-prod or the published site.
- Local runs (G37): EVERY spec file you changed, run whole, alone, both projects (mobile-360, desktop-1280), 2 workers, 0 retries, fake mode — all of them, however many. "A file that is not fully green is not committed", with ONE named exception: PR-42 (step B7) is expected RED until the operator has applied M14 on ethio-staging; every other test of its file — PR-41 included, now that ethio-staging holds M13 — is green. There is no end-of-bundle local run: CI on the turn's final commit is the full proof. Unit tests (vitest) run whole. A local run never writes "CI green".
- Tests (G38): a red is fixed at its root. No assertion is loosened, no timeout raised, no retry added, no test skipped or moved to make a run pass. Every test seeds its own scratch rows and removes them (the file's shared afterEach counts); a pooled account is leased, never a real one; no test changes a real reference row. A shared helper never changes its default (new behaviour is an option). Spec files are edited by hand, never by search-and-replace.
- Production reads: with your query tool on ethio-prod, SELECT only. A report carries counts, booleans and the names of functions, tables, roles and extensions — never an e-mail address, a user id, a token or a row of user data. WHERE THE ANSWERS GO: the results of Part A's reads go in your STOP REPORT only; a function name they return appears in ONE file, the migration, and nowhere else — no test, comment, commit title, changelog line or log (DEC-132 rule 2).
- Platform bumps (DEC-134): if the platform changes package.json or bun.lock at the start of the turn, say so in the FIRST lines of your report and leave it. You never change a package yourself in this bundle.
- Strings: the turn changes exactly the strings Part D's table gives, copied by script, character for character; you write no Amharic and no English of your own.
- Scope: only the files a step names, plus the generated files the scripts regenerate (docs/generated/i18n-usage.json, public/i18n-usage.json, src/integrations/supabase/types.ts when the platform regenerates it). A file you create outside a step's list is named in the report's first lines with its reason.
- Closed surfaces (G22): the workflow files, the failure reporter and the migration check are not touched in this turn.
- Records: you write the changelog lines; the decision and incident ledgers are written by the supervisor's records turn at the close.
- The commit that is judged by CI ends the turn: push, END THE TURN, send nothing after it.

MIGRATION RULES (M14 — one file)
- It is written LAST in the turn, after every other file is saved and typecheck, format:check, lint and the unit suite are green: your tool applies it on ethio-prod the moment you save it (the operator allows the "Modify Supabase database" dialog). Never an empty or placeholder file.
- No `-- e2e-areas:` line (no line means ALL).
- Order inside the file: (1) step B7's function with its REVOKE and GRANT lines; (2) Part A's statements; (3) ONE `DO` block of proofs; (4) the self-mark as its last statement, in M13's form (supabase/migrations/20261007143529_3d265632-76e8-43c6-98f4-a673378d2cfd.sql :492).
- The mark is chosen at apply time: `now() AT TIME ZONE 'utc'` on ethio-prod rounded up to the next hour plus one hour (plus twelve hours if the dialog may wait), later than the file's own stamp AND ABOVE THE NEWEST MARK in public.migration_marks, which is M13's 20261008040000. Run scripts/check-migrations.sh before saving the file into the migrations folder and paste its "Born-closed guard OK" and "Self-marking guard OK" lines.
- Proofs: in the one DO block, on scratch rows the block itself creates and removes (M13's shape, :407–491: scratch catalogue rows inside an inner block that ends by raising its own signal, caught outside), with no caller or a scratch caller, never a real account, place, category or attribute, never a row in a reserved schema. Every failed proof is a RAISE EXCEPTION — a clean apply is the pass; a proof never skips with a notice. A scratch table or sequence is created and dropped inside the block and its name begins `e2e_mig_` (DEC-151).
- A redeclared function is whole, from the live definition (pg_get_functiondef on ethio-prod), every header attribute kept — arguments and their defaults, STABLE, SECURITY DEFINER, search_path — and the body byte for byte apart from the change this brief names. Paste, live beside file, before the apply: identity arguments, provolatile, prosecdef, proconfig. LF line endings.
- If the apply fails: nothing landed. Paste the error whole, change nothing else, END THE TURN with the report — do not retry with a weaker proof.
- After the apply, read back on ethio-prod and paste: `select version from public.migration_marks where version = '<the mark>'` (the SPECIFIC mark, never max); the function's four header facts; the reads A5 names.
- THE STOP REPORT then gives the operator's staging step in this exact form: `apply <the uuid fragment of the file name> → expect mark <the mark>`. On the turn's commit the E2E preflight will say STAGING BEHIND until the operator has applied the file on ethio-staging and re-run the failed jobs: that red is expected; any OTHER red is yours.
- Nothing is written to ethio-staging by you outside the tests' own scratch rows.

PART D — SHORT BUTTON AND ACTION LABELS EVERYWHERE (D81) AND THE LIVE TEXTS BROUGHT LEVEL (INC-488)
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

PART F — DOCS
F1 docs/features/attributes.md, where it describes what `validate_listing_attributes` refuses (:798, :873), gains Part B's rule, its kept-combination case and step B7's entry rule; docs/features/translations.md gains four lines under a heading "A changed seed text" — a text changed in en.ts reaches the live site after "Sync keys"; a changed text of another language reaches it after an import or an edit and its approval; why (the store's approved rows lie over the compiled catalogs); INC-488.
F2 AGENTS.md gains two lines, beside the migration lines it already has: `- A new table, sequence or function of schema public is born closed to the browser roles: its migration names every GRANT it needs (a browser grant only with its line in scripts/public-surface-allowlist.txt), and every new function restates REVOKE … FROM PUBLIC in its own file (bundle 8).` and `- An action label that the label check flags (scripts/list-action-labels.test.ts) is shortened by a text the brief gives; the allowlist takes a key only with its reason.`
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
STEP B7 — THE ANSWER DOOR READS WHAT IT STORES (completes Part B; in M14)
What is read in the code. public.validate_listing_attributes (M13 file :3–403) trims each chosen value when it judges it (:320–364) and stores the trimmed value. Three readers before that judgement read the answers as they arrived: the bounds fold (:91–122, through public.attr_answer_tokens), the `allowed` fold (:124–156) and the show-when test (:170, public.attr_visible_when_met, which reads through attr_answer_tokens too). All readers must read the same values.
B7.1 THE RULE. Directly after BEGIN (:39), before the first statement, the door rebuilds v_attrs ONCE: an answer that is a JSON string becomes its trimmed text (`btrim`, the same call the judgement uses); an object answer whose `value` is a string gets that `value` trimmed, its other fields unchanged; in a list answer every string element is trimmed and every object element whose `value` is a string gets that `value` trimmed; every other answer is unchanged. v_prior is not changed (a stored row is already as the door wrote it). Nothing else in the function changes. A padded date is then judged as its trimmed text — intended.
B7.2 Redeclare the function WHOLE by the migration rules and restate its three privilege lines exactly as M13 has them (:404–406).
B7.3 TEST PR-42, in e2e/posting-routes-catalog.spec.ts beside PR-41 (:267), through the same route and with PR-41's helpers; scratch rows of its own. Cases (1) to (4) and (6) send the parent's value with a space before and after it (" p1 "); each case asserts the refusal's attr_key, reason and detail, or the acceptance:
   (1) `allowed`: P's p1 allows {C: [a]}; P = " p1 ", C = b → refused optionNotAllowed at C, detail b.
   (2) bounds: P's p1 carries `bounds` {T: {max: 10}} for a number question T (the option record's own shape, as the bounds fold reads it); P = " p1 ", T = 50 → refused outOfBounds at T.
   (3) show-when: question W is linked with `visible_when` {"key": <P's key>, "in": ["p1"]} and is required; P = " p1 " and no answer for W → refused required at W.
   (4) a list: a multi_select parent R whose option r1 carries `bounds` {T: {max: 10}}; R = [" r1 "], T = 50 → refused outOfBounds at T.
   (5) the same four bodies with the values unpadded are refused the same way (the control: the rule changes nothing for clean values).
   (6) with (1)'s definitions: P = " p1 ", C = a → accepted, and the stored row's answer for P reads p1.
   RED FIRST: run the file locally BEFORE M14 exists (ethio-staging holds M13's door): cases (1) to (4) fail because the save is accepted — paste those failing lines. Cases (5) and (6) and the whole of PR-41 are green. PR-42 stays red, locally and in CI, until the operator's staging apply of M14; say so in the stop report under "expected red".
B7.4 PROOFS in M14's DO block, calling public.validate_listing_attributes directly on scratch catalogue rows: PR-42's cases (1) to (6) — in (6) the answer comes back trimmed in `attrs`; M13's own proofs again (:444–480), unchanged; the header facts and the execute privileges as M13 proves them (:482–490).
B7.5 One changelog line that says the door trims its answers once at its start, and nothing more.

PART A — NEW DATABASE OBJECTS ARE BORN CLOSED; THE FUNCTIONS STILL OPEN BY DEFAULT ARE CLOSED (INC-480, INC-482; in M14 after step B7's function)
What turn 2 read: migrations run as postgres; no default-privilege row is for every schema; in schema public postgres's row for tables still names anon and authenticated; the set S has fifteen rows.
A1 READ FIRST (ethio-prod, SELECT only; results whole in the STOP REPORT). Three short queries — (4a) and (4b) replace the long one whose output did not fit:
(3) The set S — every function of schema public outside an extension that is executable through PUBLIC:
select p.proname,
       pg_get_function_identity_arguments(p.oid) as args,
       p.prosecdef as definer,
       (p.prorettype = 'trigger'::regtype) as is_trigger,
       has_function_privilege('anon', p.oid, 'EXECUTE') as anon_can,
       has_function_privilege('authenticated', p.oid, 'EXECUTE') as authenticated_can
  from pg_proc p
 where p.pronamespace = 'public'::regnamespace
   and p.prokind = 'f'
   and not exists (select 1 from pg_depend d where d.classid = 'pg_proc'::regclass and d.objid = p.oid and d.deptype = 'e')
   and exists (select 1 from aclexplode(coalesce(p.proacl, acldefault('f', p.proowner))) a
                where a.grantee = 0 and a.privilege_type = 'EXECUTE')
 order by 4 desc, 1, 2;
(4a) What uses each function of S outside other functions (counts):
with s as (
  select p.oid, p.proname
    from pg_proc p
   where p.pronamespace = 'public'::regnamespace
     and p.prokind = 'f'
     and not exists (select 1 from pg_depend d where d.classid = 'pg_proc'::regclass and d.objid = p.oid and d.deptype = 'e')
     and exists (select 1 from aclexplode(coalesce(p.proacl, acldefault('f', p.proowner))) a
                  where a.grantee = 0 and a.privilege_type = 'EXECUTE')
)
select s.proname,
       (select count(*) from pg_policy pol
         where (coalesce(pg_get_expr(pol.polqual, pol.polrelid), '') || ' ' || coalesce(pg_get_expr(pol.polwithcheck, pol.polrelid), ''))
               ~ ('\m' || s.proname || '\s*\(')) as policies,
       (select count(*) from pg_views v
         where v.schemaname = 'public' and v.definition ~ ('\m' || s.proname || '\s*\(')) as views,
       (select count(*) from pg_attrdef a join pg_class t on t.oid = a.adrelid
         where t.relnamespace = 'public'::regnamespace
           and pg_get_expr(a.adbin, a.adrelid) ~ ('\m' || s.proname || '\s*\(')) as column_defaults,
       (select count(*) from pg_constraint k
         where k.connamespace = 'public'::regnamespace and k.contype = 'c'
           and pg_get_constraintdef(k.oid) ~ ('\m' || s.proname || '\s*\(')) as checks,
       (select count(*) from pg_index i join pg_class t on t.oid = i.indrelid
         where t.relnamespace = 'public'::regnamespace
           and pg_get_indexdef(i.indexrelid) ~ ('\m' || s.proname || '\s*\(')) as indexes,
       (select count(*) from pg_trigger g where g.tgfoid = s.oid and not g.tgisinternal) as triggers
  from s
 order by 1;
(4b) The caller's-rights functions that call a function of S, and whether a browser role can run the caller:
with s as (
  select p.oid, p.proname
    from pg_proc p
   where p.pronamespace = 'public'::regnamespace
     and p.prokind = 'f'
     and not exists (select 1 from pg_depend d where d.classid = 'pg_proc'::regclass and d.objid = p.oid and d.deptype = 'e')
     and exists (select 1 from aclexplode(coalesce(p.proacl, acldefault('f', p.proowner))) a
                  where a.grantee = 0 and a.privilege_type = 'EXECUTE')
)
select s.proname as function_of_s,
       q.proname as called_by,
       has_function_privilege('anon', q.oid, 'EXECUTE') as caller_anon_can,
       has_function_privilege('authenticated', q.oid, 'EXECUTE') as caller_authenticated_can
  from s
  join pg_proc q on q.pronamespace = 'public'::regnamespace
                and q.oid <> s.oid
                and q.prokind = 'f'
                and not q.prosecdef
                and q.prosrc ~ ('\m' || s.proname || '\s*\(')
 order by 1, 2;
   Decide from them, and say each decision in the report:
   (i) EXPECTED SHAPE OF S: fifteen rows, all with definer = false — three with is_trigger = true, twelve with is_trigger = false. If S has any other shape: write NO statement of step A2 (M14 then carries step B7 only and says so in its first comment line), report the rows, and continue.
   (ii) A function of the twelve is LEFT OUT of A2 — and named in the stop report with the reason — when (4a) counts a policy, a view or a column default for it, or when (4b) shows a caller that a browser role can run AND that caller is itself called by name from the app (search src/ for `.rpc("<the caller's name>"`) or is itself used by a policy, a view or a column default. A use by a check constraint, an index or a trigger is not a reason to leave a function out. The supervisor's reading of the migration files finds no function to leave out; your live read confirms or refutes it.
A2 THE STATEMENTS, in this order:
   ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE ALL ON TABLES FROM anon, authenticated;
   ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE ALL ON SEQUENCES FROM anon, authenticated;
   ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE ALL ON FUNCTIONS FROM anon, authenticated;
   (No FOR ROLE clause: the statement then speaks for the role that runs the file, which on each database is the role that creates that database's later objects.)
   For each of the three trigger functions of S: REVOKE ALL ON FUNCTION public.<name>(<identity arguments>) FROM PUBLIC, anon, authenticated;
   For each of the twelve that step A1 (ii) keeps in: REVOKE ALL ON FUNCTION public.<name>(<identity arguments>) FROM PUBLIC, anon, authenticated; then GRANT EXECUTE ON FUNCTION public.<name>(<identity arguments>) TO service_role; (a row written by the server's own client reaches some of them through a check constraint; a trigger needs no such grant.)
   One of the twelve also holds a grant by name to the browser roles from its own migration. No path of the app uses it; it is closed like the others (supervisor's ruling).
   NOTHING ELSE: no extension is moved (pg_trgm stays in schema public — supervisor's ruling); no table privilege changes; the default privileges of any other role and of any other schema are not touched; no function of an extension is touched.
A3 PROOFS in M14's DO block:
   (a) for every function A2 closed: has_function_privilege is false for anon and for authenticated; for each of the twelve it is true for service_role;
   (b) the number of functions of schema public that are not extension members and are executable through PUBLIC equals the number A1 (ii) left out (expected 0);
   (c) BORN CLOSED — inside an inner block undone by its own raised signal: create table public.e2e_mig_b8_<random> (id int) and sequence public.e2e_mig_b8_<random>_s; assert that anon and authenticated hold NO privilege on the table (SELECT, INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER) and none on the sequence (USAGE, SELECT, UPDATE); drop both inside the block.
   A new FUNCTION is not proved here: it still receives EXECUTE through PUBLIC when it is created, which is why the migration check's born-closed rule exists (turn 2).
A5 THE LINT BASELINE. After the apply, run on ethio-prod the SELECT that the third lint runs (supabase/migrations/20261007033719_9f7deb8a-e850-4fc3-bfc0-9693f6994666.sql :375–379) and set `function_executable_by_anon` in scripts/security-lints-baseline.json to the number it returns (today 27; expected 12 = 27 minus the fifteen). Paste, after the apply, the default-privilege rows of postgres in schema public (`select defaclobjtype, defaclacl::text from pg_default_acl where defaclrole = 'postgres'::regrole and defaclnamespace = 'public'::regnamespace order by 1`).
A6 docs/features/security-scanning.md follows the new baseline number wherever it states the old one. One changelog line that names no function.

STOP REPORT (it is also the bundle's final report; the whole of it). First lines: done or not done for step 0, D1 to D6, F1 to F4, B7.1 to B7.5, A1, A2, A3, A5, A6; any platform bump; any file outside a step's list; any key put on the allowlist as awaiting text. Then: the six ci-status lines read at the start and what you saw of the run on bd9a703; the `key | en | am` list of D1; the label check's counts (action rows, field rows, flags, allowlist lines, run-time places); D4's census (file, line, old words, new words); D5's counts and keys; the three A1 results whole and the two decisions in words; the redeclaration's live-beside-file facts; PR-42's red lines and PR-41's green lines; the "Born-closed guard OK" and "Self-marking guard OK" lines; the apply's result; the read-backs; `apply <fragment> → expect mark <value>`; "expected red: the E2E preflight (STAGING BEHIND) and PR-42, until the staging apply"; typecheck, format:check, lint, the whole unit suite; each changed spec file's local run lines; the file list from `git diff --name-only bd9a7032`; "Logs read: … · unavailable: …"; limitations. Never "CI green" from a local run. A commit title says what the commit holds.
```
