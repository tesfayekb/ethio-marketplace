CURSOR BUNDLE 8c-3b — a failed permission read is said, and each switch names the door it governs (INC-1345, INC-1310); a filter whose choices fail says so (INC-1346, INC-1355's two filter pages); the posting steps report to the gate in the commit that draws them (INC-1353). Base: dev 3dc448dc3

Stem: `cursor-bundle-8c-3b` (brief `docs/governance/briefs/cursor-bundle-8c-3b.md` (new); report `docs/governance/reports/cursor-bundle-8c-3b.report.md` (new)). Tier A (the staff layout's permission gate; every staff control's switch). FLAGS: no-migration, no-new-string, no-package-change, no-agents-change. ONE PLANNING STOP: STEP 1 is a census that STOPS, because fix A's guard rule is not designed yet (the pairing of each switch with the call it governs). Fixes B and C are designed here, and their censuses are written into STEP 1.

**MODEL — Claude Opus 5.5 (High) for STEP 1, in a NEW Cursor chat; after ruling 1, the build on Claude Sonnet 5.5 in the same chat.**

THE ORDER (DEC-504, the supervisor's, G17, overridable): Cursor 8c-3 is four lanes. 8c-3a is merged (dev 3dc448dc3). This lane, 8c-3b, carries the permission read and the gates on screens. 8c-3d carries every route refusal still written as a sentence (INC-1354) with the attribute options reader (INC-1356). 8c-3c carries the browser tests for the list's remaining rows, WebKit (INC-1328, DEC-483) and the harness's small debts (INC-1336's remainder, INC-1335, INC-1337, INC-1357).

TWO LANES OPEN (S839's rule): Lovable UF-3 runs on `lovable/next` beside this lane. Neither lane edits a file the other edits.
- UF-3 edits `src/features/admin-listings/listing-page.tsx` (the levels notice), `src/features/admin-listings/listing-refusals.ts`, `src/features/admin-screening/use-screening.ts` (the family's words at line 297), `src/features/admin/import-dialog.tsx`, `src/features/admin/users/admin-users-service.ts`, `src/components/shell/columns-button.tsx`, `scripts/conformance/door-words-allowlist.txt` (read by `scripts/conformance/door-words.test.ts`), and the allowlist lines A8.11 and A10.1 in `scripts/conformance/user-facing-allowlist.txt` (read by `scripts/conformance/user-facing.test.ts`). It adds new test files beside these and beside the role and user pages.
- This lane edits none of them. In `scripts/conformance/user-facing-allowlist.txt` it removes only A1.3, A4.2 and A11.4. A10.2 sits between A10.1 and A11.4, so the two lanes' removals merge cleanly.

PREVENTION (G70)
- Class (S842, mine): I gave 8c-3a its CLEAN before running each of its changed test files alone on my clone (S804's rule). I ran them after: all 25 pass alone on dev 3dc448dc3. Instructions: unchanged, the rule stands; I now run it as the first step of every verification. Repository, Cursor rules, Knowledge: not needed.
- Class (S839, its first use): two open lanes share no file and no neighbouring allowlist line; TWO LANES OPEN above names them.

THE SYSTEM (G0) — fix A: a failed permission read is said; each switch names the door it governs
CONCERN: a permission read that fails is shown as a failure with a Retry, never as "no access" (F4); and every control that a permission switches is switched by the door or route that control calls (INC-1310's class).
MECHANISM: `usePermissions` (`src/features/permissions/usePermissions.ts` line 29; it returns `permissions`, `loading`, `error` and `has`, no way to read again) and `useMayCall` (`src/features/permissions/use-may-call.ts` line 47), over the staff layout's gate `AdminGate` (`src/routes/admin.tsx` line 65).
CONSUMERS of the permission read (`rg -n "usePermissions\(" src`, tests excluded):
- `src/routes/admin.tsx` line 68 — bypasses: it reads no `error`. A failed read leaves `permissions` empty, so `allowed` is false and line 96 sends the staff member to the sign-out landing (INC-1345).
- `src/components/app-shell.tsx` line 97 — uses: it hands `failed` to the shell.
- `src/features/permissions/use-may-call.ts` line 48 — uses: it hands `error` on. Its twenty consumers read only `mayCall`; each draws under `AdminGate`, so the gate decides for them.
CONSUMERS of the switches (`rg -n "mayCall\(\{" src`, tests excluded): about sixty switches in twenty files. STEP 1 pairs each with the call its control makes. Two are known wrong (INC-1310):
- `src/features/admin/roles/role-detail.tsx` line 61: `mayUpdate` names `admin_set_role_permission`, and it also switches the meta card (line 66), whose save calls `useUpdateRole` (`admin_update_role`, line 90).
- `src/features/admin/users/user-detail.tsx` line 52: `mayUpdate` names `admin_update_profile`, and it also switches the status controls (lines 208 to 271), which call `admin_set_account_status`.
COVERED HERE:
- `AdminGate` draws a failed first read through `FailureNotice` (`src/components/shell/failure-notice.tsx`), with a Retry that reads again (`usePermissions` gains a way to read again). It navigates nowhere on a failure.
- A read that fails while grants are already held keeps the held grants: the server stays the authority (Knowledge F3).
- Every switch STEP 1 finds wrong names its control's own door or route.
CONFORMANCE GUARD: `scripts/conformance/permission-readers.test.ts` (new) and `scripts/conformance/switch-doors.test.ts` (new).
- `scripts/conformance/permission-readers.test.ts` (new): every reader of `usePermissions` reads its `error`, or is listed with the reason the gate decides for it. Plant: `src/routes/admin.tsx` line 68 as it stands at 3dc448dc3.
- `scripts/conformance/switch-doors.test.ts` (new): each switch names the door or route its control calls. The rule is yours to propose at STEP 1 (DECIDE-AND-NAME), with its hits on 3dc448dc3. It must catch the two INC-1310 switches as they stand at 3dc448dc3, and stay quiet on a correctly paired switch.
- Both are wired in `scripts/conformance/wired.test.ts`. An allowlist line, if any, reads `key | reason | until`, with an INC or a date.
EXCEPTIONS: none known.
FIVE LENSES. Security: fail-closed stays (a failed read never grants); the server's `has_permission` decides every call; a wrong switch could draw a control the door would refuse, so the guard keeps switch and door in step. Performance: no new read; the Retry reads the same query. Failure modes: a failed read is said, with a Retry, and never sends anyone away. Consistency: one notice; one switch rule. Growth: a new staff control is switched by the door its call names.
FORWARD-SCAN: every later staff screen (Stage 2's controls). REGISTER: the permission read's row, amended.

THE SYSTEM (G0) — fix B: a filter whose choices fail says so
CONCERN: a select filter whose choices fail to load says so once, with a Retry; it never shows an empty list as if there were no choices (F4).
MECHANISM: the toolbar filter declarations (`src/components/shell/table-filters.ts`: `TableSelectDeclaration` line 17, `choicesReady` line 21, read at line 201).
CONSUMERS (`rg -n "choicesReady" src`, tests excluded): each reads only its read's `isLoading`, so a failed read leaves the filter ready and empty:
- `src/features/admin-listings/listings-page.tsx` lines 179 (markets), 192 (categories) and 206 (levels)
- `src/features/admin-screening/screening-page.tsx` lines 232 (markets) and 246 (levels)
- `src/features/admin/audit/audit-page.tsx` lines 123 and 132 (facets; INC-1346, row A11.4)
- `src/features/admin/users/users-list.tsx` line 128 (roles)
- `src/features/my-listings/my-listings-page.tsx` line 196 (categories)
COVERED HERE:
- The declaration gains the read's failure: its error and a Retry. The filter, or the toolbar, draws one `FailureNotice` per failed read. The design is yours, by these rules: no consumer can declare a select's choices without saying how its read failed, and two filters fed by one read draw one notice.
- On All listings and Screening, the same failed levels read also leaves each row's level "unknown" (INC-1355). The one notice covers it: the page says the levels failed and does not draw a second notice for the labels. Lovable UF-3 covers the third page, the listing page.
CONFORMANCE GUARD: the type makes the failure required where `choicesReady` is declared. A census in `scripts/conformance/` sees a declaration that hands a ready flag with no failure. Plant: `audit-page.tsx` line 123 as it stands at 3dc448dc3.
EXCEPTIONS: none.
FIVE LENSES. Security: none. Performance: no new read; the notice is already in the entry. Failure modes: each failed choices read is said, with a Retry. Consistency: one notice per failed read. Growth: a new filter declares its read's failure.
FORWARD-SCAN: every later table. REGISTER: the toolbar filters' row, amended.

THE SYSTEM (G0) — fix C: the posting steps report to the gate in the commit that draws them
CONCERN: a part of a form reports its missing answers to the shared gate inside the commit that draws it, so a submit can never arrive before the gate has heard (INC-1199's class; `Field` already does this, KAU-13).
MECHANISM: the form gate (`src/components/forms/use-form-gate.ts`, `report` at line 26), and `Field` (`src/components/forms/field.tsx`), which reports in a layout effect (lines 81 to 83).
CONSUMERS: the steps that report through an `onMissing` prop wired to `gate.report` (`src/features/posting/wizard.tsx` lines 287 to 304). Each reports from a passive `useEffect`:
- `src/features/posting/step-details.tsx` lines 123 to 125
- `src/features/posting/step-pricing.tsx` lines 164 to 166
- `src/features/posting/step-where.tsx` lines 1400 to 1402
- `src/features/posting/step-who.tsx` lines 609 to 611
My prototype of the guard (`rg -U` for a `useEffect` whose body calls `onMissing` or `.report(`, tests excluded) finds exactly these four.
COVERED HERE: each reports in a layout effect, as `Field` does. No other behaviour changes.
CONFORMANCE GUARD: a census in `scripts/conformance/` refuses a gate report inside a passive effect. Plant: the four lines as they stand at 3dc448dc3.
EXCEPTIONS: none.
FIVE LENSES. Security: none. Performance: none. Failure modes: no submit passes before every drawn part has reported. Consistency: the steps report as `Field` does. Growth: a new step reports the same way.
FORWARD-SCAN: the form kit's later waves. REGISTER: the form gate's row, amended.

SCOPE, by area (each source file's own tests included):
- Fix A: `src/routes/admin.tsx` with its test `src/routes/admin.test.tsx` (new); `src/features/permissions/` (`usePermissions.ts`, `use-may-call.ts` and their tests); every file STEP 1's pairing finds wrong, for the switch only; `scripts/conformance/` (the two new censuses, an allowlist if one is needed, `wired.test.ts`).
- Fix B: `src/components/shell/` (`table-filters.ts`, the toolbar and filter components that draw a select, and their tests); the nine consumer lines' files named in fix B; `scripts/conformance/` (the census).
- Fix C: the four step files and their tests; `scripts/conformance/` (the census).
- The rows A1.3, A4.2 and A11.4: their component tests (new files) and their three lines in `scripts/conformance/user-facing-allowlist.txt`.
- `docs/features/` (the permission read's, the filters', the form gate's and `ci-guards.md`); the records files.
- Never: the files TWO LANES OPEN gives to UF-3; any `*-states.test.tsx` file; the locale files, `supabase/`, `.github/`, `AGENTS.md`, package files.

THE TURN, IN THIS ORDER
STEP 0 — on the lane:
- Fetch, then `git switch -c cursor/bundle-8c-3b origin/dev` with origin/dev at `3dc448dc3`. Its CI run may still be running; read it again before your push. If dev has moved, say so in the report and build on the new dev, unless the move touches a file in SCOPE: that is a STOP.
- `git status --short` must be empty.
- Save this brief byte for byte as `docs/governance/briefs/cursor-bundle-8c-3b.md` (new; scripted copy, saved bare; sha256 equal to the carrier's). Write roadmap line 3 as rule 00 writes it.
- Remove from `scripts/conformance/briefs-allowlist.txt` (read by `scripts/conformance/briefs.test.ts`) every line keyed to a brief other than this one.
- Run `bun scripts/brief/check-go.ts docs/governance/briefs/cursor-bundle-8c-3b.md --root .` and paste its output into the report.
- Commit `cursor-bundle-8c-3b: task saved`; it is not pushed alone.
STEP 1 — THE CENSUS, which STOPS:
- CENSUS-ITEM consumers: the lists in THE SYSTEM A, B and C, checked by the commands they name. For fix A, the pairing: one line per `mayCall(` switch with its file:line, the door or route it names, the control(s) it switches, and the door or route each control's call reaches (through its hook or service). Mark each "paired" or "wrong".
- CENSUS-ITEM definition: fix A by every reader of the permission read and every switch; fix B by every select declaration; fix C by every report to a form gate.
- CENSUS-ITEM tests: every test of the touched screens and steps, the staff layout's and the filters'; their assertions keep their words and test ids unless a ruling names them.
- CENSUS-ITEM lists: `scripts/conformance/wired.test.ts`; the guards' register `docs/features/ci-guards.md`; `scripts/conformance/user-facing-allowlist.txt` (three lines only).
- CENSUS-ITEM old-file-readers: not applicable — no file moves or is deleted.
- CENSUS-ITEM second-readers: the readers of `usePermissions`' return and of `TableSelectDeclaration` (`rg -n "TableSelectDeclaration|choicesReady" src e2e scripts`).
- CENSUS-ITEM chunk-graph: the notice is in the entry; name any module a fix adds to a page's first download.
- CENSUS-ITEM environments: the gate and the filters draw in SSR and in the browser.
- CENSUS-ITEM mechanisms: `usePermissions`, `useMayCall`, `FailureNotice`, the filter declarations, the form gate, `Field`.
- CENSUS-ITEM first-download: a page's first download grows only by a named cause the report lists chunk by chunk; an unexplained growth is a STOP; no bare number.
- CENSUS-ITEM premises:
  - INC-1345 — SOURCE: `src/routes/admin.tsx` lines 68 and 92 to 97. RED-FIRST: a failed first read on the gate sends no one away and draws the notice.
  - INC-1310 — SOURCE: the two switches named in fix A. RED-FIRST: the switch census on their base text.
  - INC-1346 — SOURCE: `src/features/admin/audit/audit-page.tsx` lines 123 and 132. RED-FIRST: a failed facets read draws the notice, not empty choices.
  - INC-1355 (two pages) — SOURCE: `listings-page.tsx` line 206 and `screening-page.tsx` line 246. RED-FIRST: a failed levels read is said.
  - INC-1353 — SOURCE: the four effects named in fix C. RED-FIRST: the census on their base text; a step's missing answer is heard by the gate before a submit in the same tick.
- CENSUS-ITEM callee-codes: not applicable — no door changes.
- CENSUS-ITEM whole-app-calls: the gate draws on every staff page; the filters on the nine named pages.
- CENSUS-ITEM findings: write what you find beyond the task, with file and line, in §13. A security hole is a STOP at once, described in the chat only.
- CENSUS-ITEM gate-reach: every staff page passes `AdminGate`; name what a failed read now draws on each kind of staff page (the landing, a section, a deep link).
- CENSUS-ITEM user-cases:
  - A staff member whose permission read fails sees the failure with a Retry and stays on the page. SOURCE: `src/routes/admin.tsx` line 96 (today sent away).
  - A role's meta card is editable exactly when `admin_update_role` may be called. SOURCE: `role-detail.tsx` line 61.
  - A user's status controls show exactly when `admin_set_account_status` may be called. SOURCE: `user-detail.tsx` line 52.
  - Audit's action and entity filters say their facets failed. SOURCE: `audit-page.tsx` line 123.
  - A posting step's missing answer is heard by the gate before any submit. SOURCE: `step-details.tsx` line 123.
- CENSUS-ITEM queued: `rg -n "8c-3b|INC-1310|INC-1345|INC-1346|INC-1353|INC-1355"` across `docs/governance/briefs`, `docs/governance/reports`, `docs/features` and `roadmap.md`.
  - Built here: INC-1345, INC-1310 and its guard, INC-1346, INC-1355 on All listings and Screening, INC-1353; rows A1.3, A4.2, A11.4.
  - Left: INC-1354 and INC-1356 (Cursor 8c-3d); INC-1355 on the listing page, INC-1348, INC-1350, rows A8.11 and A10.1 (Lovable UF-3); the rest of the list's rows, WebKit, INC-1335, INC-1336's remainder, INC-1337, INC-1357 (Cursor 8c-3c).
- Then STOP: commit the census as `docs/governance/reports/cursor-bundle-8c-3b.stop-1.md` (new), push the lane once as a draft pull request, and end the turn. I answer with ruling 1: the switch rule, the pairing's routing, and any premise the census finds wrong.
STEP 2 — after ruling 1, PART A: the gate's failed read, the switches, the two censuses (red first on their plants). Commit `cursor-bundle-8c-3b part A: the permission read and the switches`.
STEP 3 — PART B: the filters' failed read and its census, the nine consumers. Commit `cursor-bundle-8c-3b part B: a failed choices read is said`.
STEP 4 — PART C: the four steps and the census. Commit `cursor-bundle-8c-3b part C: steps report in the drawing commit`.
STEP 5 — the rows A1.3, A4.2 (the user page's loading, failed and not-found states, `src/features/admin/users/user-detail.tsx` lines 100 and 109) and A11.4, each with a new component test whose title carries `uf:<row id>`, and their three allowlist lines removed. Commit.
STEP 6 — the docs lines. Commit.
STEP 7 — the checks:
- `bun run typecheck`; `bun run lint`; `bunx vitest run scripts --maxWorkers=2`; `bun run checks` on the final tree. A commit after it re-runs the steps that read its files.
- Each test file the turn changed, run alone (INC-1306).
- Browser runs (`bun run e2e:local`): the staff layout's specs, the audit and users lists', the posting steps', by their ids; both Chromium projects, 0 retries.
- `bun scripts/brief/check-go.ts docs/governance/briefs/cursor-bundle-8c-3b.md --at <the commit STEP 0 began from>`, its output pasted.
- Then the self-review (rule 80), before the push. List every MINOR and MAJOR it counts in §10, each fixed or with its reason.
STEP 8 — ONE push; `gh pr ready <number>`; `gh pr checks <number> --watch --interval 60`; green on the last code commit → the comment per rule 00.
STEP 9 — the report, written while CI runs:
- Rule 60's fourteen headings, with the census in §2.
- §3: each touched screen's answer before and after.
- §14 Records, word for word.
- Its push changes records only.

DECIDE-AND-NAME: the switch rule; how `usePermissions` reads again; the filters' failure design within fix B's rules; where each notice sits. A mechanical edit a standing guard demands as a consequence of your own change is in scope wherever it falls, byte for byte, named under §10, unless the file is on SCOPE's never-list (then it is a STOP).

RECORDS (§14), word for word:
- "DEC-505 (the supervisor's, G17, overridable; it amends DEC-504) — With Lovable UF-3 and Cursor 8c-3b open together, no file and no neighbouring allowlist line is shared. Cursor 8c-3b takes row A4.2 (its allowlist line sits next to A1.3's) and INC-1355 on All listings and Screening (their levels also feed the filters INC-1346 fixes); Lovable UF-3 keeps INC-1355 on the listing page. INC-1356 moves from 8c-3b to 8c-3d, because the reader it fixes calls the attribute options route whose sentence INC-1354 codes. Why: two lanes that change one file or two neighbouring lines cannot both merge without a fresh branch."
- INC-1345, INC-1310, INC-1346, INC-1353: fixed (what was built), each with its cause as found; INC-1355 fixed on All listings and Screening.
- The register rows named in THE SYSTEM blocks; one changelog line.

TOLERANCES (G60), by defect:
- A red whose failure or server log names a path this lane changed is a STOP; any other is named under §11 and CI judges.
- A local failure is fixed at its cause, never retried or loosened; no dial and no timeout is raised; no `retries` is added to a test.
- A test whose assertion would have to change, beyond those a ruling names, is a STOP.
- A screen whose words or test ids change beyond the states this GO names is a STOP.
- A hypothesis refuted by what you read is not a STOP: the cause you find decides, named under §10.

FINDINGS (G64): anything major beyond this task goes in §13 with file and line; a security hole is a STOP at once, described in the chat only.

LIMITS TO STATE: WebKit, the repeat lane's real time and the merged tree are CI's and the supervisor's.
