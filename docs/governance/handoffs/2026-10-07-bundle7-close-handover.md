# HANDOVER — 2026-10-07 — bundle 7 closed; its tables; what is next and what is in flight

Written by the supervisor thread that wrote the handovers of 2026-10-05 and 2026-10-06, at the close of bundle 7. It SUPPLEMENTS `docs/governance/handoffs/2026-10-06-bundle6-close-handover.md` and, through it, the two of 2026-10-05 (who is who; what the operator has ruled; the curator): those sections still hold and are not repeated. Everything that changed between 2026-10-06 11:50Z and 2026-10-07 10:45Z is here, and spec-ledger block S56 carries the full narrative. The successor reads, in this order: this file → `docs/governance/system-state.md` (the position of 2026-10-07) → the tail of `docs/spec/spec-ledger.md` (block S56; its NUMBERING line) → the root `roadmap.md` → `docs/governance/handoffs/2026-10-06-order-of-work-and-cross-check.md` with `2026-10-07-order-of-work-additions.md` → the ci-evidence branch → the tail of `docs/tracking/incidental-findings.md` — and asks nothing the record answers.

## 1. STATE AT HANDOVER

### 1.1 Repository

- dev = main = `d1a4f475` (bundle 7 turn 11, 2026-10-07 09:25:13Z); CI run 37600492635 SUCCESS at 09:56:59Z, all 25 jobs, promoted. Eleven `lovable-*` side branches on the remote, the known set (a twelfth is a stranded turn, G30).
- Bundle 7 (`docs/governance/briefs/bundle-7.md`; the saved copy is version 5, 21,514 bytes, sha256 `f93c3aaf3afa64601d1fa543997a9ddc906308637e29c056d063811f18642a28`) CLOSED: twelve executor turns, 2026-10-06 14:3xZ → 2026-10-07 09:25Z. Every step verified against the diff (G30).
- Published site: `d1a4f475` (the operator's Publish at the close, 2026-10-07 about 10:2xZ; an earlier Publish on 2026-10-06 22:42Z carried Parts A and B).
- The close's walk (five lines, on the published site): all yes.
- Highest test ids: PW-177, PR-40, AT-77 (with AT-73b and AT-76b), CT-42, IB-3, LT-15, TR-35, IG-5, CO-8, LS-13.

### 1.2 Databases

- ethio-prod and ethio-staging both hold M10, M11 and M12 (§2.2). The newest mark by value is `20261007160000`: the next migration's mark is chosen above it and above the current time (G39).
- Production reads of the period (counts only): the three write privileges on the places table false after M10; the 24 write privileges on the eight admin tables false after M11; the five lint counts 0 / 0 / 27 / 0 / 0; parent-first violations over every category 0 (the operator's read, 2026-10-07 09:46Z); one draft held an answer to the question C35 unlinked — it lets go of it at its next save, by design (D79).
- Leaked-password protection: ON on ethio-prod since 2026-10-07 10:33Z (the operator's switch; it was off); OFF on ethio-staging by decision — the tests sign in thousands of times a run and the switch adds an outside check to each; whether staging gets it is decided in the next bundle with a rule frozen first.

### 1.3 Catalogue

- 169 categories · 570 definitions. Imported and walked: C34 on 2026-10-06 (five definitions changed — the `{country}` wording on vehicles, shipping and schools; the smartwatch narrowing) and C35 on 2026-10-07 after the Publish (one definition added, `sim_unlocked`; three links added and three unlinked on feature phones, smartphones and tablets; the Amharic row approved in Translations) — D76 is live; `imei_registered` stays in the library with no link.
- The curator is idle; the C35 result message (written 2026-10-07; it corrects S114 and names what is now enforced) is the operator's to paste. Nothing is asked of the curator in it.
- Held until the form changes: `product_origin` and `origin-food` (D75). Waiting: the Tigrinya finder words; the two cubic-metre wordings; the rent and hire periods.
- Now enforced where the curator's rules were only rules: parent first — the commit of an import refuses a file that leaves a dependent above its parent (the preview does not show it); an unlink or a removed answer never blocks a seller; the preview shows how many ads hold an answer; Merge is refused while ads hold answers.

### 1.4 Security (DEC-132)

- Layer A on; no open Dependabot or secret-scanning alert on 2026-10-07 (the operator's read); push protection OFF until the supervisor's call of 2026-10-09.
- Layer B complete in CI: the Semgrep job (pinned 1.179.0; the pinned rule set less three files that are not security rules; a filter script with its own self-test; gating on ERROR; 0 results uploaded after the review — ERROR 0, WARNING kept 0, dropped as test code 13, suppressed 9); the database lints in the nightly against `scripts/security-lints-baseline.json` (0 / 0 / 27 / 0 / 0); the workflow token read-only by default (DEC-153). The ZAP workflow stays disabled until the private switch.
- Layer C: the weekly reviewer's first scheduled run is 2026-10-12.
- OPEN, bodies in the Project record until their fix is on ethio-prod (G51): INC-480 and INC-482 (privileges hygiene; nothing reachable; the next bundle's first migration). INC-477 is a hypothesis awaiting its census.
- The code-scanning list on GitHub (101 open alerts on 2026-10-07 before Part H) is expected to empty as GitHub analyses `d1a4f475`; the alert feeds answer 403 to the supervisor's session, so the operator's next read confirms it.

### 1.5 CI and platform

- `ci.yml` and `nightly-e2e.yml` declare `permissions: contents: read` at the top; the jobs that publish or upload declare their own. The migration check sets aside a create-and-drop scratch table inside a proof block, has a real-row allowlist, and can check a draft in a scratch folder (DEC-151).
- The nightly of 2026-10-07 (run 37582211006 on `549cfcfb`) is RED: PW-147 on both projects and PW-153 on desktop, in the serial lane with no retries, while five CI runs shared ethio-staging — INC-487, judged by the nightly of 2026-10-08. Its security-lints step is green.
- The server-error census carries one standing message off the allowlist: "listing not found" (INC-398, 4 to 7 lines a run) → the tidy-up round.
- Run times: shards 19 to 27 minutes; a speed-up is a tidy-up item with its rule frozen first.

### 1.6 Records

- This landing: spec-ledger block S56 (DEC-148–154; D77–D81; slips S113–S117; the class rules), incidental-findings INC-473–487 and the status amendments, `system-state.md`, `AGENTS.md` (four lines), `docs/tracking/action-tracker.md`, both roadmaps, `docs/governance/launch-gate.md` (four lines), the running record of the period, `2026-10-07-order-of-work-additions.md`, this handover and its manifest, one changelog line.
- Numbering after this landing: next free INC-488; DEC-155; D-rulings D82; slips S118.
- Project docs (private, the supervisor's): `claude/running-record-2026-10-05-thread2-part3.md` (the source of block S56; it also holds what was kept out of the public repository); the plan document "ethio.com — what to build next, and why" (a Claude Docs document of the operator's account; its additions since 2026-10-06 are in the repository as the order-of-work additions file).

## 2. BUNDLE 7 IN TABLES (compiled by the supervisor from the repository; the executor's final report left them out)

### 2.1 The turns

| Turn | What | Commits | Last commit (UTC) | CI on the last commit |
| --- | --- | ---: | --- | --- |
| 1 | Part A — DEC-144 rule 1 (`reset-scope.ts`), PW-164–168 | 4 | `a505f0d6` 10-06 14:32 | 37479890827 SUCCESS, promoted |
| 2 | Part B — INC-451, the picker's current choice, the suggested title, the autosave retry; PW-169, PW-170 | 3 | `1c1c9e6b` 10-06 19:04 | 37516268594 FAILURE — the audit job only (INC-475) |
| 3 | The shell-quote override (INC-475) | 3 | `1d8389e9` 10-06 22:03 | 37538147970 SUCCESS, promoted |
| 4 | Brief v2 saved; Part C with M10; PR-34–39 | 9 | `e83cc895` 10-06 23:02 | 37544308240 FAILURE — PR-37 and PR-38, written and not run |
| 5 | Brief v3 saved; the two tests; Part D; PW-171–174 | 24 | `7d0a6a00` 10-07 01:49 | 37558981676 SUCCESS, promoted (37552409318 on `e54743dc` FAILURE — PR-37's cleanup) |
| 6 | Brief v4 saved; K1, K2; Part E's doors with M11 | 6 | `e17fc72a` 10-07 03:40 | 37567814016 FAILURE — the migration linter (S116); the preflight until the staging apply (37563623737 on `29c9a7fb` SUCCESS, promoted) |
| 7 | DEC-151; Part E's screens; the nightly lints step; AT-73–77, CT-38–41 | 3 | `9a44e083` 10-07 05:31 | 37576776314 FAILURE — CT-26 (INC-481) |
| 7b | M12 (DEC-152); CT-42; the tests turn 7 left open | 8 | `549cfcfb` 10-07 06:33 | 37582177651 SUCCESS on its second attempt (after the staging apply), promoted |
| 8 | Part D5 (INC-479's form half); PR-40, PW-176, PW-177 | 2 | `723747bb` 10-07 07:27 | 37587407034 SUCCESS, promoted |
| 9 | K4, K5; Part F (INC-459, INC-463, PW-175) | 3 | `2cf755cd` 10-07 08:05 | 37591530098 SUCCESS, promoted |
| 10 | Brief v5 saved; Part H (DEC-153, DEC-154; INC-483–486) | 3 | `518da704` 10-07 09:01 | 37597701231 cancelled by turn 11's pushes — 18 jobs green, no finished failure |
| 11 | IB-3 corrected; Part G (the documents) | 5 | `d1a4f475` 10-07 09:25 | 37600492635 SUCCESS, promoted |

Seventy-three commits from `f264a18c`; most are the platform's own "Changes" and "Work in progress" pushes. Four of the twelve turns ended on a red run — a new advisory (turn 2), two tests written and not run (turn 4), and two causes in the supervisor's brief (turn 6, S116; turn 7, S117) — and one on a cancelled run (turn 10).

### 2.2 The migrations

| Name | File | Lines | Mark | What |
| --- | --- | ---: | --- | --- |
| M10 | `supabase/migrations/20261006225254_626282eb-da6f-45aa-ac32-ef03407502a5.sql` | 844 | `20261007140000` | `validate_listing_attributes` lets go of a held answer whose question or value is gone; `get_attribute_options` returns `retired`; `listing_locations.position` written by `submit_listing` and `edit_listing`; `save_seller_place`'s fallback ordered by it; `my_recent_categories()`; the places table's client write privileges and policies removed |
| M11 | `supabase/migrations/20261007033719_9f7deb8a-e850-4fc3-bfc0-9693f6994666.sql` | 619 | `20261007150000` | `attribute_holders`, `admin_attribute_holders`, `attr_import_holders`; `admin_merge_attributes` refuses while a source has holders; `admin_preview_attribute_import` returns `holders`; `admin_delete_category` refuses a row with children; `admin_list_category_pointers` returns `is_primary`; `catalog_order_violations` and `catalog_order_guard` with two deferred constraint triggers; `security_lints()`; eight admin tables' client write privileges and 24 write policies removed; TRUNCATE revoked from the browser roles |
| M12 | `supabase/migrations/20261007063049_6e1d5e4f-5ef5-4765-9410-984777cabb34.sql` | 345 | `20261007160000` | `cat_import_undo_order`; `admin_undo_category_import` redeclared with its loop ordered by it |

Each was applied on ethio-prod by the executor's tool on save and read back there by the specific mark, and on ethio-staging by the operator; the E2E preflight's pass on the next run proves the staging mark.

### 2.3 The files

`git diff --stat f264a18c..d1a4f475`: 126 files, +8,101 −564 — 35 added, 91 changed (against `d84a01c0`, the commit that saved brief version 2: 112 files, 31 added, 81 changed). Added:

- Brief: `docs/governance/briefs/bundle-7.md`.
- Migrations: the three files of §2.2.
- App: `src/features/posting/reset-scope.ts`, `catalog-held-answers.ts`, `recent-categories.ts`, `where-seed.ts` (each with its test), `attribute-options.test.ts`, `map/credit.test.ts`; `src/i18n/compiled-catalog.ts`; `src/lib/chosen-first.ts`, `name-collator.ts`, `own-key.ts` and `refusal-tail.ts` (the last two with tests); `src/providers/pre-paint-scripts.test.ts`; `src/test/list-pages.test.ts`, `src/test/own-key-sites.test.ts`.
- Browser tests: `e2e/admin-attributes-safety.spec.ts` (AT-73–77), `e2e/admin-categories-home.spec.ts` (CT-38–41), `e2e/post-wizard-recent.spec.ts` (PW-171), `e2e/post-wizard-removed.spec.ts` (PW-176, PW-177), `e2e/posting-routes-catalog.spec.ts` (PR-34–40).
- Scripts: `scripts/security-lints.ts` with its test and `security-lints-baseline.json`; `scripts/semgrep-sarif-filter.py`; `scripts/migration-real-row-allowlist.txt`; `scripts/fixtures/bad-listing-locations-write-example.ts.txt`.

Changed, by area (91): 38 files under `src/features`; three each under `src/components`, `src/i18n` and `src/routes`; two under `src/providers`; one each under `src/config`, `src/lib`, `src/server` and `src/integrations` (the generated types); 12 feature documents; 10 existing spec files and one helper under `e2e/`; six scripts; the two workflow files; `package.json` and `bun.lock` (one override); the changelog, the server-error allowlist, the generated i18n map and its served copy, and `roadmap.md`.

### 2.4 The ten new strings (each equal on dev to the brief's text, compared by script on `d1a4f475`)

| Key | English | Amharic |
| --- | --- | --- |
| `post.category.recentLabel` | Used before: | ከዚህ በፊት የተጠቀሙባቸው፦ |
| `admin.categories.paths.makePrimary` | Make primary | ዋና አድርግ |
| `admin.categories.error.delete_active` | Retire this category before deleting it. | ይህን ምድብ ከመሰረዝዎ በፊት ጡረታ ያውጡት። |
| `admin.categories.error.delete_slug_mismatch` | The slug does not match. | slug አይዛመድም። |
| `admin.categories.error.delete_has_listings` | {count} listings are in this category. Move them before deleting it. | በዚህ ምድብ ውስጥ {count} ዝርዝሮች አሉ። ከመሰረዝዎ በፊት ያዛውሯቸው። |
| `admin.categories.error.delete_has_children` | {count} categories sit under this one. Move or delete them first. | ከዚህ ምድብ ስር {count} ምድቦች አሉ። መጀመሪያ ያዛውሯቸው ወይም ይሰርዟቸው። |
| `admin.attributes.remove.holders` | {count} listings there hold an answer to it. They will stop showing it; no seller is blocked. | እዚያ {count} ዝርዝሮች ለእሱ መልስ ይዘዋል። መልሱ መታየት ያቆማል፤ ማንም ሻጭ አይታገድም። |
| `admin.attributes.error.mergeHasHolders` | {count} listings hold an answer to an attribute being merged away. Merging is refused while they do. | {count} ዝርዝሮች ለሚወገደው ባህሪ መልስ ይዘዋል። እነዚህ እስካሉ ድረስ ማዋሃድ አይቻልም። |
| `admin.attributes.import.holders` | Held by {count} listings | በ{count} ዝርዝሮች የተያዘ |
| `admin.attributes.error.parentAfterChild` | Order refused in {detail}: the second attribute depends on the first and is asked before it. Put the first one above it. | በ{detail} ቅደም ተከተሉ አልተፈቀደም፦ ሁለተኛው ባህሪ በመጀመሪያው ይመሠረታል፣ ግን ከእሱ በፊት ይጠየቃል። የመጀመሪያውን ከላይ ያድርጉት። |

## 3. IN FLIGHT AT HANDOVER

- Executor: idle after this records turn. Nothing is addressed to it until this turn is verified and the next bundle's brief is delivered — and that brief is written only after the supervisor has explained the bundle to the operator part by part (his standing directive).
- Curator: idle; one message waits with the operator (§1.3).
- Operator steps owed (none blocks the executor): paste the C35 result message to the curator; at his next look at GitHub's Security tab, say whether the code-scanning list is empty; optional, as before — the Claude GitHub App install, a usage budget or alert at the map provider, the mailboxes legal@ and privacy@ and a native reader of the Amharic legal text before stage 1's texts go live, the sending domain for e-mail before stage 6.
- Supervisor's dated duties: after 2026-10-08 06:00Z read the nightly (DEC-153's nightly half; INC-487's rule; the second of DEC-148's seven runs); 2026-10-09 the push-protection call; 2026-10-12 the weekly reviewer's first scheduled run and DEC-083's date; the E2E account pool before 2026-11-01.

## 4. THE PLAN AHEAD, IN ORDER

1. This records turn (documents only) → verified by sha256 against the manifest → CI green.
2. The next bundle — explained to the operator part by part, then one brief. Its parts as they stand: (a) the first migration: INC-480 and INC-482, with the platform linter's "Extension in Public" line read in the same census (Tier A; the brief words them as build instructions — G51); (b) INC-477's census and a ruling; (c) the sign-up and reset forms say that a refused password appeared in a known leak (the forms already answer the refusal with a general line), with a test, and a frozen rule for whether ethio-staging gets the switch; (d) D81 — a census of every button and action label, the shortened English and Amharic texts read by the operator, and first a read of how a changed seed text reaches the approved Amharic rows; (e) INC-487 if the nightly of 2026-10-08 repeats it.
3. Stage 1, the rules — the Pass-2 spec of L1 with its "checked against" list; the lines owed in `docs/spec/tos-privacy-source.md`; the banned-items and safety pages; the three answers the operator owes at that stage. Whether stage 1 rides the same bundle as item 2 or follows it is settled when the bundle is explained to him.
4. The tidy-up round (ACT-009), with what bundle 7 named and did not build (block S56's list).
5. Stage 2, automatic screening (DEC-145) with translation of every ad (DEC-149); stages 3 to 7; the launch round; opening; stage 8 with reviews and ratings (DEC-150).
6. Beside the executor's turns: the rulebooks (the next instructions version and the next Knowledge version, delivered whole — they carry §5 below and block S55's rules); the plan document brought level with this close.

## 5. RULES ADOPTED IN THIS PERIOD, NOT YET IN THE INSTRUCTIONS (in force from the day adopted; carried to the next version — G46)

- A staging apply is written to the operator as one line: "Apply the new migration to staging". The stop report of a migration is his cue to apply and re-run the failed jobs; a ruling says "wait for my go" only for a migration that removes or rewrites existing rows.
- When a door gains a refusal, every caller is read for the order and the state in which it calls the door, and the brief names the test that walks that caller.
- A release or tolerance rule at a door is verified with "save, save again unchanged" at the route and with the form's sender read.
- A rule that deletes answers acts only on a read that succeeded; a cached copy, an empty payload and a failed read are typed absences.
- A migration's proof design is run past the migration check's text rules when the brief is written; a draft is checked in a scratch folder before it is saved; no proof writes a row in `auth.users`.
- A test that proves a fix reaches the changed line and waits for the settled state; a proof never passes by skipping; a test never seen failing is shown failing on the old file — asked as "put the old file back, show it failing, restore it, show an empty diff".
- A helper a brief leans on is opened and its signature quoted; a brief that names a later version of itself is delivered with a scheduled check-in that writes it.
- A text a brief gives for a string is copied by key, character for character.
- A setting the operator holds is read on his screen before it is described to him; a statement about what a form does is read in the form first.
- An alert list is triaged whole before any fix is prompted; one part carries every real one.
- D81: button and action labels are two or three words, in every language; an explanation is written once, as help text.

## 6. WHAT THE OPERATOR SAID IN THIS PERIOD (his words; block S56 and the running record have each at its time)

- On fitting answers: "YES, BUT JUDJING IF IT FITS OR NOT MAY BE AN ISSUE".
- On previously used categories: "TWO CHIPS, BUT ONLY SUBCATEGORY LEVEL TO REDUCE THE NUMBER OF CLICKS. MEANING IF SOMEONE HAS PUBLISHED A VEHICLE-> CAR-> ETC, WE SHOW CAR, SO USER DOESNT HAVE TO CLIC VEHICLE AGAIN."
- On new markets: "what happenes when we expand our service to kenya or somalia, or southafrica?"
- On translation: "I dont think we can force a user to post in a language other than what the native language is, so when a user posts, edits etc we need to translate in all languages used by the website and display accordingly after screening ofcourse." and "we need to have a way to turn it off from admin side meaning keeping the screening but turning off translation incase we decide at some point the cost if too much. screening is very vital and that is a must for all languages anyway and we need to make sure that is definit."
- On reviews: "This gives credibility rating to the poster as more people review the users post and give good rating, and on the other hand bad reviews may expose fake posts etc." and "agree. please make it part of our plan in the stages plan we have. Integrate it. agree with your recomendations."
- On Amharic in the code: "NOTE THAT LOVABLE IS HARDCODING TRANSLATIONS IN AMHARIC? HOW WILL THAT WORK WHEN WE HAVE OTHER LANGUAGES?"
- On a staging apply: "JUST SAY APPLY THE NEW MIGARTION TO STAGING AND I KNOW WHICH MIGRATION."
- On waiting: "are we going to wait another 25 mins after this turn to give the final prompt?"
- At the walk: "yes- release year remained same- may be ok" · "yes- great" · "its enough to say change pin, remove pin etc. everywhere in the app if something is explanatory, we dont have to write a whole statment in all buttons, and everywhere so long as its clear."
- On leaked-password protection: "this protection has always been on for long time. let me check again" — then "Ok was off and i just turned it on. Should i do same on staging?"
