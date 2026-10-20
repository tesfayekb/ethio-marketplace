# Bundle 22 — Stage 1, turn 13, version 2 (after the close): Admin › Legal made easy to use (D226): brief (saved unchanged, 2026-10-20)

```text
BUNDLE 22 — STAGE 1, TURN 13, VERSION 2 (2026-10-20; after the close; replaces docs/governance/briefs/bundle-22-turn-13.md, never saved: version 1 asked for a how-it-works card on the page, which your rule refuses — 'Do not use visible, in-app text to describe the application's features, functionality, keyboard shortcuts, styling, visual elements, or how to use the application.' Version 2 has no such card and no explanatory sentence under the export; how the legal documents work is written in docs/features/legal.md instead). Tier B (staff screens; the export goes through turn 12's door, which checks legal:export and the step-up inside). NO MIGRATION. Sixteen new strings and one retired, all inside the carrier (EN+AM; Knowledge D5). No package change. No AGENTS.md change: no new module, every change sits in files that exist today. Base: dev 6d8217ad (bundle 22 turn 12 with its ruling). Parts, IN THIS ORDER: A — CI first, and the conclusion of turn 12; STEP 0; the census; B — the carrier (the screens, the service, its unit tests, the strings, the docs, the roadmap, the changelog), then the hashes; C — the browser tests, which you write; the checks; D — the local end-to-end try; THE CI WAIT REPORT.

WHY
- D226 (the operator, 2026-10-19 22:38 local): "looking at the legal page in admin, I dont see the terms of service or privacy policy statments and I dont see where i can see the historical versions for each and i dont know how th country and everything gets used or set. please try to make it user friendsly and able to be used. also export if needed and all under permission to be able to do any changes and secure". Admin › Legal gains: Read / Hide on the version in force, showing its text in place; every version listed under its document without a toggle; on a version's page, Compare with previous (a line diff), Download (.md with the facts filled in) and Print; Export acceptances (a CSV through turn 12's door, with the step-up; a published version and legal:export only); and in the editor, a language's text filled from a .md or .txt file.
- DEC-207 (the operator, 2026-10-19 23:59 local): dates are stored in UTC and shown in the viewer's own time zone — Admin › Legal and the version page follow it; the publish dialog's earliest date stays in UTC.
- Turn 14 (owed, on the roadmap) is the operator's "no one escapes the acceptance" set (D227).

STEP 0 — save this file (the attached bundle-22-turn-13-v2.md, title line and fence included) byte for byte as docs/governance/briefs/bundle-22-turn-13-v2.md and paste its sha256sum. roadmap.md comes from the carrier (its line 3 names this brief); do not edit it by hand. Tick nothing. No report file in the repository.

HOW TO WORK
- Order of the turn: Part A (paste `git rev-parse HEAD`: this is <START>); STEP 0; the census; Part B; Part C; the checks; Part D; THE CI WAIT REPORT; END THE TURN. Do not stop between parts — a clean point is not a reason to stop. If the platform ends the turn early, report three lines (done, left, CI) with the done parts and `git diff --name-only <START>`; the operator sends "continue".
- THE END-TO-END CHECK (your rule: "Verify the request's central flow once end-to-end before concluding, in the state a real user would hit it"), as in turns 6 to 12: your sandbox cannot start a browser (INC-506), and the preview signed in and production are never used for tests (AGENTS.md; INC-464, DEC-146). The state a real user would hit is reached by CI's full run on your commit — real Chromium at 360 and 1280 px, the built app against ethio-staging, every test. This turn's central flows are LGA-10 to LGA-14. You try Part D locally; when the browser guard stops it, you end the turn WITHOUT concluding (THE CI WAIT REPORT); the next brief's Part A reads that run and concludes this turn. The operator directs this.
- Run no stateful git command: the platform commits and syncs when the turn ends. Read-only `git status`, `git diff` and `git rev-parse` are fine.
- Edit spec files by hand, never by search-and-replace or line-range scripts (G37). No assertion loosened, no timeout raised, no retry added (G38). A shared helper never changes its default (new behaviour is an option). No sleeps (eslint: "poll on truth, never sleep").
- Every legal test row is a scratch one; no test writes legal_settings or listing_policy and no test creates a document of a real kind (G27); scratch cleanup in afterEach (J3); a test finds its own rows by id, never by position (G28); at most two leased accounts per test (DEC-174).
- The strings come only from the carrier; no Amharic of your own. No literal UI text. No visible text that explains how the application works (your rule).
- Run the usage-map guard (`bun run i18n:map-guard`) as the final check, after every file of the turn is written; when it rewrites the two maps, run it once more.
- When a check fails, paste its whole failure block (the failing test's name and error), not only the summary line (INC-781).
- If any rule of yours conflicts with this text, STOP before saving and quote that rule's exact words in the report.

PART A — CI FIRST, AND THE CONCLUSION OF TURN 12.
A1. Read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines with the run's number and commit (you cannot git-fetch that branch). Expected: run 1059 on 6d8217ad (turn 12's last commit, with its ruling), in progress or finished, or a later run. Run 1058 on 38b9e6d6 (turn 12 before the ruling) judges nothing.
A2. When ci-status.md names 6d8217ad with its run finished, read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/e2e-last-failure.md and https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/guards-last-failure.md and write 'TURN 12 — FINAL REPORT' as the first section of this turn's CI wait report: ci-status.md's six lines; the lines of e2e-last-failure.md that name LAC-1, LAC-2, LAC-3, LAC-4, LG-11, LG-23, LG-24, LGA-7, LGA-9, e2e/legal-accept.spec.ts, e2e/legal-doors.spec.ts or e2e/legal-admin.spec.ts, or its 'passed' line; guards-last-failure.md's lines for the component tests and lint, or that no job failed; your verdict. On SUCCESS with none of those named as failed, turn 12's central flows (the one tick with the 18+ statement asked once, the export door) are verified end-to-end. Any failure: read its body, fix it at its root cause first (G21, G38), and name it with its fix. If that run has not been published when you reach THE CI WAIT REPORT, read it once more then; still not published: say so, and the next brief's Part A concludes turns 12 and 13 together.

THE CENSUS (paste each result; any result that differs from what it expects is a STOP: write nothing else and report)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-22-turn-13-v2.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 12 files → each equal to:
  0ff9bd88aca746d33a30245d3321933a3115faa92c8f793f62c1794474432f04  docs/_changelog.md
  e4cb0f782eca32c12d48bb9bbc073e2466c3c3dd4cff2a9a4eb984cb4a5adce1  docs/features/legal.md
  3077ffc64702c48354a2b5ae35cc961d203f5914f7face36776f5414547a046f  docs/generated/i18n-usage.json
  3077ffc64702c48354a2b5ae35cc961d203f5914f7face36776f5414547a046f  public/i18n-usage.json
  4f8b68d68913cc0b0e2a1dd44f1e1a5a223fc20b9a3947f51a4525af6948f45e  roadmap.md
  a26eda33df34004c310d2aa7d5ee7c17b4dbff08f757e91373433b5261feb364  src/features/admin/legal/legal-editor-form.tsx
  2273d1cb8021e53f21a5b8931017a98e5fc029bdc366715a4258979ed8e60fbb  src/features/admin/legal/legal-page.tsx
  bee5a09dff6626eb44bd55a9a6960e5da77009b9e4c0cf46924d8a025b1fdd26  src/features/admin/legal/legal-service.test.ts
  f29d6a6be53af88d92c00e353a83522ca7d2958165f690f4aae6994deb3254fa  src/features/admin/legal/legal-service.ts
  e25fb59373c1e6f9e86ac4d5e2e321086edd6d1ebd4fa8f18ac667876818ee74  src/features/admin/legal/legal-version-view.tsx
  65cb48bd7ddaef1660fd0ee37611e873052f8dabc01e790257f86d27e14b4e50  src/i18n/locales/am.ts
  819a6ba9c5a0d0828475fa5be06caedbffbee3daa4dd8bb1edf1ddc6ef7f5d70  src/i18n/locales/en.ts
- (c) `sha256sum e2e/legal-admin.spec.ts` → 3d34b59de753b2c02d429dfcc563c85bf1f5544432786cc41e0924047f7eb459 (Part C's line numbers are as at 6d8217ad).
- (d) `ls supabase/migrations | tail -1` → 20261020041607_c88f99d5-b2cd-495f-93c1-8c9de328a1db.sql.

PART B — THE CARRIER (12 paths, with the two usage maps)
- What it changes. src/features/admin/legal/legal-service.ts gains fillFacts (a text with its facts filled in; an unknown or empty fact stays as written), lineDiff (a line diff by the longest common run of lines), exportLegalAcceptances (every page of admin_export_legal_acceptances, 1,000 rows a page, following `next`), acceptancesCsv (the CSV, with a leading apostrophe on a cell that starts like a formula), legalFileName and saveTextFile. src/features/admin/legal/legal-page.tsx: Read / Hide (`legal-read`) on the version in force, showing `legal-read-text`; every version listed under "All versions" (`legal-history`, rows `legal-history-row` with `legal-view-link`) — the History toggle and its string are gone; dates in the viewer's zone. src/features/admin/legal/legal-version-view.tsx: inside a StepUpGate; the header and text inside `data-print-root`; Download (`legal-download`), Print (`legal-print`), Compare with previous (`legal-compare`, only when an earlier version exists; `legal-diff`, `legal-diff-added`, `legal-diff-removed`, `legal-diff-none`); for a published version and `legal:export`, the section `legal-export-section` with Export acceptances (no explanatory text) (`legal-export`) and its result `legal-export-done`; dates in the viewer's zone. src/features/admin/legal/legal-editor-form.tsx: under each language's text, "Fill this text from a file (.md or .txt)" (`legal-import-en`, `legal-import-am`; at most 200,000 characters) and its result `legal-import-done`. Unit tests in legal-service.test.ts (fillFacts, lineDiff, the export's paging, the CSV, the file name). The strings (below). docs/features/legal.md (a new "Turn 13" section). roadmap.md (line 3; turn 13's line; turn 14's owed line). docs/_changelog.md (one line).
- WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy of dev 6d8217ad with exactly the carrier's files; not lock-exact, INC-420): `vitest run` whole on version 1 — 1263 passed (1258 at the base, plus the five new legal-service tests); after version 2's removals (the card, the export sentence, eight strings), the legal and admin-legal unit tests (137) and the action-label test again, all passing; eslint on src/features/admin/legal and src/features/legal 0 problems; prettier 3.8.3 --check clean on every carrier file; `tsc --noEmit` clean; `bash scripts/check-hardcoded-strings.sh` "findings: 0"; scripts/list-action-labels.test.ts passes (every new button has at most three English words); `bun run scripts/i18n-map-guard.ts` rewrote the two maps, then "usage maps match the tree". Not run by the supervisor: the browser suite (CI on your commit runs it).
- THE STRINGS the carrier writes (for your report's key-by-key list, G43; copy nothing from here by hand; the Amharic comes only from the carrier). New, 16:
  - `admin.legal.action.read`: "Read"
  - `admin.legal.action.hide`: "Hide"
  - `admin.legal.allVersions`: "All versions"
  - `admin.legal.action.compare`: "Compare with previous"
  - `admin.legal.compare.title`: "Changes from version {n} ({language})"
  - `admin.legal.compare.none`: "No difference in this language."
  - `admin.legal.compare.added`: "Added"
  - `admin.legal.compare.removed`: "Removed"
  - `admin.legal.action.download`: "Download"
  - `admin.legal.action.print`: "Print"
  - `admin.legal.action.export`: "Export acceptances"
  - `admin.legal.export.done`: "Exported {count} acceptances."
  - `admin.legal.import.label`: "Fill this text from a file (.md or .txt)"
  - `admin.legal.import.done`: "Filled from {file}."
  - `admin.legal.import.tooBig`: "The file is longer than {max} characters."
  - `admin.legal.import.failed`: "The file could not be read."
  Retired, 1 (nothing reads it after the carrier): admin.legal.action.history.

THE CARRIER — B22T13V2-TURN-CARRIER-2026-10-20.md (44,835 bytes; sha256 5b4b8d58702fc14542be69f49fdf083cda277b8081d707985840dc7b0069fa17; 19 sections)
- Its first line starts "B22T13V2 TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`. No blank line separates the sections.
- Modes: `REPLACE-LINES a-b` — replace lines a to b (1-based, inclusive) of the base file with the section's text; `INSERT-AFTER n` — insert the section's text after line n of the base file (n = 0 means at the top); `APPEND` — add the section's bytes to the end of the base file exactly as they stand, a leading blank line included; `NEW` — create the file with exactly the section's bytes; `REPLACE` — the file's whole new content. Apply every section of one file from the highest line number down, so earlier line numbers stay valid. Line numbers refer to the base's file.
- The carrier's sections end with a newline each, blank lines included: write every section's bytes exactly as they stand between its header line and the next header, reading each file whole before any file is opened for writing. Write by script, never by hand, and never retype a line.
- The two usage maps (docs/generated/i18n-usage.json, public/i18n-usage.json) are not in the carrier: the usage-map guard writes them at the end of the checks.
- After the carrier and the checks, `sha256sum` of these 12 files → each equal to:
  df1bb3acd179b22d296fd629c397bc09222f7bb83717eaf64a4575e1cfd191f6  docs/_changelog.md
  246eeb9699505caa3979fcc9bf83c2c021da691f760ff10b6272156fcea0cafa  docs/features/legal.md
  8d0087e17e6c28ee2bf5bb86b232a6a82ca3ce75dd82c476023a0d2fab9670e7  docs/generated/i18n-usage.json
  8d0087e17e6c28ee2bf5bb86b232a6a82ca3ce75dd82c476023a0d2fab9670e7  public/i18n-usage.json
  dd4e2e1531b6b50319541ab9ef67d92a5d8bc644123d226058f4b753708d7b2c  roadmap.md
  5e3566677bd44df09d3019b9586950778de275764575dc97920a300bee113c2e  src/features/admin/legal/legal-editor-form.tsx
  0829d566f02fa83b20f9a3d80542c92cbe1e82a64fb76518f7abc0f16cabccd6  src/features/admin/legal/legal-page.tsx
  074b23d21f369f07ab18b3146348d27164b14d211bf464f1f60a020be90db7cd  src/features/admin/legal/legal-service.test.ts
  3395d2737450d83abc878174fb8be22124fe474122c573d3e9103c6716491ce2  src/features/admin/legal/legal-service.ts
  f934d0e8bab41017481b030dc2c229e6a901872b55caf9cb2ba450fc01ce4652  src/features/admin/legal/legal-version-view.tsx
  050d190d6f3c4802ee4491ff392d1f462b35eb81140ff7cc40e6824b15cf2a5d  src/i18n/locales/am.ts
  bbdfcd7390e66849f553bf660860220bc66645319bd63b5ca65d75fe10b84fd2  src/i18n/locales/en.ts
  A mismatch is a STOP: report the path, your hash and the expected one, and change nothing else.

PART C — THE BROWSER TESTS (you write them, by hand, in e2e/legal-admin.spec.ts, inside the "Admin Legal" describe after LGA-9; line numbers as at 6d8217ad). Each uses the file's own `scratch`, `seed` and `accept` helpers and its afterEach cleanup; a second version of a scratch document is inserted with the service client the way `seed` inserts the first (document_id, version 2, status published, its own label, body_en, body_am, changelog, material false, effective_at and published_at a minute ago, settings_snapshot) — written as a new local helper `seedNext(documentId, input)` beside `seed`, returning the new version's id, and `seed` unchanged. Downloads are read with Playwright's download event (`page.waitForEvent("download")` before the click; `download.suggestedFilename()`; the file's text through `download.path()`).
C1. LGA-10 "every version is listed under its document, and the text in force reads in place": one scratch kind seeded (default bodies); `useJobSuperAdmin(page)`; `/admin/legal`; inside `legal-doc-<kind>-global`, one `legal-history-row` with no click; `legal-read` shows `legal-read-text` containing "Original English"; a second click hides it (`legal-read-text` count 0).
C2. LGA-11 "Compare with previous marks the removed and added lines; nothing to compare on the first version": a scratch kind seeded with body_en "## First\nOriginal English" and body_am "Same Amharic"; its version 2 through `seedNext` with body_en "## First\nChanged English" and body_am "Same Amharic"; on version 2's page, `legal-compare` opens `legal-diff`: `legal-diff-removed` contains "Original English", `legal-diff-added` contains "Changed English"; after `legal-view-tab-am`, `legal-diff-none` is visible; on version 1's page, `legal-compare` has count 0.
C3. LGA-12 "Download saves the shown language with the frozen facts; Print is offered": a scratch kind seeded with body_en "Write to {{legal_email}}" and snapshot { legal_email: "snapshot@example.invalid" }; its page; the download from `legal-download` is named `ethio-<kind>-all-v1-en.md` and its text is exactly "Write to snapshot@example.invalid"; `legal-print` is visible.
C4. LGA-13 "Export acceptances saves a CSV of who accepted, never a name or e-mail": a scratch kind seeded; two leased people accept it through `accept`; `useJobSuperAdmin(page)`; its page; the download from `legal-export` is named `ethio-<kind>-all-v1-acceptances.csv`; its first line is exactly "account_id,accepted_at,language,method,home_country,adult_confirmed,data_consent"; it has exactly two more non-empty lines, one holding each person's id; it contains neither person's e-mail; `legal-export-done` reads "Exported 2 acceptances."; exactly one audit_log row with action 'legal.acceptances_exported' and entity_id the version's id (service client read; the audit row stays — audit history is append-only).
C5. LGA-14 "a draft's text is filled from a file": a scratch kind (nothing seeded); `/admin/legal/edit?kind=<kind>`; `legal-import-en` gets a file through `setInputFiles` ({ name: "terms.md", mimeType: "text/markdown", buffer: Buffer.from("## Imported\nFrom a file") }); `legal-field-body-en` has that value; `legal-import-done` contains "terms.md"; nothing is saved (no legal_documents row of that kind, service client read).
C6. The owed-test census (G37), in the report: `grep -rn "legal-history-toggle\|admin.legal.action.history\|legal-history-row\|legal-view-link\|legal-text\|legal-version-view\|legal-field-body" e2e src --include=*.ts --include=*.tsx`, each hit named with whether this turn changes what it sees. Expected: no `legal-history-toggle` and no `admin.legal.action.history` anywhere.

THE CHECKS (whole; paste the last line of each): `bun run format:check` clean; `bun run lint` 0 errors; `bun run test:unit` (expected 1263 passed); `bash scripts/check-hardcoded-strings.sh` "findings: 0"; `bun run scripts/e2e-select.ts --self-test` OK; `bash scripts/check-browse-imports.sh` OK; `bash scripts/check-migrations.sh` "Migration guard OK."; the preview harness's "build OK"; at the end, `bun run i18n:map-guard` "usage maps match the tree" (run it twice when it first rewrites the maps).

PART D — THE LOCAL END-TO-END TRY.
D1. `bun run e2e:local -- e2e/legal-admin.spec.ts --retries=0` (the file whole, both projects). Paste its summary lines.
D2. A failure: read its error and its context, fix it at its root cause (G38), and run the file again whole.
D3. If the browser guard stops the run (INC-506), paste its message once and go on to THE CI WAIT REPORT.

SCOPE — these files only: the brief; the 12 paths of the hash table; e2e/legal-admin.spec.ts (Part C only); the files of an A2 fix and of a Part D fix (each named with the failure it fixes). Name any other file in the report's first lines with its reason. Delete no file. No patch tool. No package change. No migration.
THE CI WAIT REPORT (after Part D; not a conclusion): "TURN 12 — FINAL REPORT" first, when A2 could write it; done or not done by part; A1's six lines with the run's number and commit (and A2's fix, if any); <START>; the census (a) to (d); the carrier applied — the 12 hashes as `sha256sum` printed them; the strings key by key with their English (G43); C6's census; the checks; D3's message, or D1's summary lines and D2's fixes; `git diff --stat <START>`; `git diff --name-only <START>`; anything not foreseen; the line "Waiting for CI on <the commit this turn leaves> — the next brief's Part A concludes this turn." Then END THE TURN (the platform commits and syncs); send nothing after the report.
REVERT: git revert of this turn's commits; no database change to undo.
```
