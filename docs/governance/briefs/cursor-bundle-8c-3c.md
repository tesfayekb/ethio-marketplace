CURSOR BUNDLE 8c-3c — every remaining row of the user-facing list gets its test (INC-1278); the flaky retries on WebKit and in three staff specs are fixed at their causes (INC-1328, INC-1357, INC-1327); a notice's reason is never read before its reader arrives (INC-1360); the harness's small debts (INC-1335, INC-1336's remainder, INC-1337, INC-1325). Base: dev 6493ccfff

Stem: `cursor-bundle-8c-3c` (brief `docs/governance/briefs/cursor-bundle-8c-3c.md` (new); report `docs/governance/reports/cursor-bundle-8c-3c.report.md` (new)). Tier A (the E2E harness: the staff sign-in helpers and the global setup). FLAGS: no-migration, no-new-string, no-package-change, no-agents-change. ONE PLANNING STOP: STEP 1 is a census that STOPS, because three designs are open: how each remaining row is proven (DEC-498 and DEC-501 decide a component test or a browser test), the one reader of test titles (INC-1337), and how a test waits for a notice's reader (INC-1360).

**MODEL — Claude Opus 5.5 (High) for STEP 1, in a NEW Cursor chat; after ruling 1, the build on Claude Sonnet 5.5 in the same chat.**

THE ORDER (DEC-506, the operator's): this is the last Cursor lane of 8c. Cursor 8c-3b and Lovable UF-3 are merged (dev 6493ccfff). After this lane, the Cursor work of 8c is done; Lovable UF-4 runs beside it.

TWO LANES OPEN (S839's rule): Lovable UF-4 runs on `lovable/next` beside this lane. Neither lane edits a file the other edits.
- UF-4 edits `src/features/admin-screening/screening-page.tsx` and its `src/features/admin-screening/screening-page-states.test.tsx` (INC-1310's last three switches); `src/features/admin-listings/listing-page.tsx`, `src/features/admin/legal/user-legal-card.tsx` and `src/features/admin-overview/locations-overview.tsx` (INC-1359's permission-named switches); and `scripts/conformance/switch-doors-allowlist.txt` (read by `scripts/conformance/switch-doors.test.ts`, three lines out).
- This lane edits none of them. A test this lane writes for a row on those screens is a new file, or a browser spec.
- In `scripts/conformance/user-facing-allowlist.txt` (read by `scripts/conformance/user-facing.test.ts`) only this lane removes lines.

PREVENTION (G70)
- Class (INC-1360, found in my gate on Lovable UF-3): a test read the failure notice's reason before the notice's on-demand reader had arrived. TD-8 and TD-9 now wait (UF-3, ruling 4). Repository: this lane's fix E finds every other test of the class and lands its guard. Instructions, Cursor rules, Knowledge: not needed.
- Class (S846, mine): a pull request body stated a shared-file count I had not computed. Corrective in force: TWO LANES OPEN above lists the files from the two lanes' scopes, by name.

THE SYSTEM (G0) — fix A: every remaining row of the list has its test (INC-1278)
CONCERN: every control, event and list row a person meets has a test that proves it (DEC-459, DEC-482, DEC-493).
MECHANISM: the user-facing list `scripts/conformance/user-facing-manifest.txt`, its reader `scripts/conformance/user-facing.ts`, its guard `scripts/conformance/user-facing.test.ts`, and the allowlist `scripts/conformance/user-facing-allowlist.txt` (`key | reason | until`). A test answers a row by its id in the manifest or by `uf:<row id>` in its title.
CONSUMERS: the allowlist's dated lines, counted by
COUNT: 38 := rg -c "INC-1278$" scripts/conformance/user-facing-allowlist.txt
They are:
- Member and seller rows: S1.21, S2.9, S2.11, S4.7, S5.8, S6a.5, S6a.6, S6d.2, S7.1, S7.16, S7s2.15, S7s6.9, S7s8.9, S9.7, S12.5.
- Staff rows: A4.8, A6.2, A6.5, A7.6, A8.3, A10.2, A12.7, A13.6, A14.4, A14.5, A14.9, A15.4, A16.3, A17.5, A18.6, A18.10, A22.6, A23.8, A27.4.
- Page lines: `page /auth`, `page /auth/callback`, `page /auth/reset` (Cursor bundle 6's user-cases list, not yet rows of the manifest) and `page /settings` (the census of 8d64790 did not read it).
- The lines whose until is `permanent` stay, counted by
COUNT: 7 := rg -c "permanent$" scripts/conformance/user-facing-allowlist.txt
COVERED HERE: every dated line above goes, each answered by a test.
- How a row is proven, by DEC-498 and DEC-501: a component test when its proof stays on its own screen (a plain link by its role, name and address; a navigation done by code by the navigate call's address); a browser test when its proof needs the browser past the screen (a server write, a sign-in that ends, a download or an upload, a return to where the person came from, a navigation that depends on a server's answer, a page opened directly).
- The four page lines become rows of the manifest: the auth pages from Cursor bundle 6's user-cases list, and `/settings` from a census of `src/routes/settings.tsx` and what it draws. Each new row is answered here.
- A test that already proves a row is tagged, never duplicated.
CONFORMANCE GUARD: `scripts/conformance/user-facing.test.ts` (existing): with every dated line gone, an untested row fails it. No new allowlist line, except a `permanent` one with its reason for a row whose census names nothing to do.
EXCEPTIONS: the seven `permanent` lines.
FIVE LENSES. Security: the staff rows' tests sign in through the pool with only the permissions their row needs (J9). Performance: browser tests join the existing spec files by area; a spec file stays within rule 20's size, split by area when it would not. Failure modes: each row's failure states are proven where the census names them. Consistency: one rule decides component or browser. Growth: a new control is a new row with its test.
FORWARD-SCAN: Stage 2's screens add rows; the guard takes them. REGISTER: the user-facing list's row, amended.

THE SYSTEM (G0) — fix B: a retried pass is fixed at its cause (INC-1328, INC-1357, INC-1327)
CONCERN: a test that passes only on retry is a defect, never evidence (DEC-030, G38: three in seven days is an INC and root-cause work).
MECHANISM: the flake ledger (`docs/tracking/flake-ledger.md` on branch `ci-evidence`, read by its raw address) and each spec's own helpers.
CONSUMERS:
- INC-1328: SAP-1 at `webkit-390` (`e2e/sage-ad-page.spec.ts` line 137, "each tier's ad page reads its tokens") passed only on retry on 21, 23, 24, 27 and 28 Nov. Cause not read.
- INC-1357: AL-31 (`e2e/admin-listings.spec.ts` line 2087, "Reports: the open count on the row…") passed only on retry three times on 27 Nov (shard 14). HYPOTHESIS: the Reports read per row, which Cursor 8c-3a's one table-level notice replaced; judged on the seven days after 8c-3a's merge.
- INC-1327: LGA-21 (`e2e/legal-admin.spec.ts` line 951, "the in-force card shows View…") passed only on retry on 25, 26, 27 and 28 Nov, with different first lines. Cause not read.
- INC-1273 (`docs/tracking/incidental-findings.md`, "a filter row's list does not open on WebKit 26"): DLG-E12 (`e2e/dialogs.spec.ts` line 776) fails on WebKit 26 on the operator's Mac (DEC-483: record its trace on this computer, the one place it reproduces).
COVERED HERE: each cause read from its failure bodies and traces, then fixed at that cause. A retry, a raised timeout or a loosened assertion fixes nothing (rule 20).
CONFORMANCE GUARD: `scripts/e2e-failure-report.ts` (existing; it appends every retried pass to the ledger, the evidence each fix is judged by); each fix carries a test that fails on the cause where one can be planted, or a CONTROL that names why none can.
EXCEPTIONS: none.
FIVE LENSES. Security: none. Performance: a fix may make a test faster, never slower without a named cause. Failure modes: the cause is named in the report. Consistency: the fixes use the harness helpers rule 20 names. Growth: none.
FORWARD-SCAN: none. REGISTER: none.

THE SYSTEM (G0) — fix E: a notice's reason is read only after its reader has arrived (INC-1360)
CONCERN: a test asserts what a person reads; the failure notice reads an error twice by design (INC-864), first from what the error carries, then once `@/lib/reader-failure` arrives, so a test reads its final reason only after the reader has arrived.
MECHANISM: `useFailureKind` (`src/components/shell/failure-reason.ts`; `readFailure` gives `server` while the reader module is pending, `carried` for any error that is not a `TypeError`).
CONSUMERS (`rg -n "data-failure-reason" src --glob "*.test.tsx"`): every test that asserts a reason the first reading cannot give (anything but `server`, `gone`, or a `network` the error carries as a `TypeError`) without waiting for the reader. The instance: TD-8 and TD-9 (`src/features/admin-listings/tier-dialog.test.tsx` lines 208 and 225), fixed in Lovable UF-3 with `waitFor`.
COVERED HERE: one way to wait for the reader's reading, which you propose at STEP 1 (a test helper, or a setup that has the reader arrive before the first draw); every consumer the census finds moves onto it.
CONFORMANCE GUARD: a census in `scripts/conformance/` (new, its file named at STEP 1) that refuses such an assertion that does not use the one way. Plant: TD-8's line 208 as it stood at 3dc448dc3. Wired in `scripts/conformance/wired.test.ts`.
EXCEPTIONS: none known.
FIVE LENSES. Security: none. Performance: none. Failure modes: a test can no longer pass or fail on how fast the reader loads. Consistency: one way. Growth: a new notice test uses it.
FORWARD-SCAN: every later failure test. REGISTER: the failure notice's row, amended.

THE SYSTEM (G0) — fix C: the harness's small debts
CONCERN: one reader per question the tests ask, and no data file naming a path the code does not read.
MECHANISM: per item below.
CONSUMERS:
- INC-1335: `scripts/conformance/user-facing-manifest.txt` line 3 names a census copy under docs/features that is not in the tree; the copy is `docs/governance/census/user-facing-8d64790.md`.
- INC-1337: two readers of test titles with two grammars: `idsIn` (`scripts/test-ids.ts` line 58) and `titlesIn` (`scripts/conformance/user-facing.ts` line 117).
- INC-1336's remainder: inline card-twin rules that CF-HELPERS-15 (`scripts/conformance/e2e-helpers.test.ts` line 787) does not see, beside the one body `isCardTwin` (`e2e/helpers/layout.ts` line 44): `e2e/admin-services.spec.ts` lines 285 and 362, `e2e/my-listings-promote.spec.ts` line 592, `e2e/admin-categories-console.spec.ts` line 548, `e2e/helpers/categories.ts` lines 66 to 72 (`bandOnly`).
- INC-1325: `afterTotpStep` (`e2e/helpers/ui.ts` line 1204) and its spec callers stay until DEC-488's judge has its ten completed runs on dev after the CI-speed merge (`docs/features/e2e-harness.md` line 788). If the judge has its ten runs when you reach STEP 4, apply it as written there; if not, leave it and say so.
COVERED HERE: the manifest's header names the real path; one title reader serves both, its grammar proposed at STEP 1; the five inline rules use `isCardTwin`, and CF-HELPERS-15 sees an inline rule; INC-1325 by its judge.
CONFORMANCE GUARD: CF-HELPERS-15 (widened, planted on one of the five lines as it stands at 6493ccfff); the title reader's existing tests, joined; `scripts/conformance/user-facing.test.ts` reads the header's path.
EXCEPTIONS: none.
FIVE LENSES. Security: INC-1325 touches the staff sign-in helper; the mint's order (CF-HELPERS-11) stays. Performance: none. Failure modes: none new. Consistency: one reader, one twin rule. Growth: none.
FORWARD-SCAN: none. REGISTER: the e2e helpers' row, amended.

SCOPE, by area (each source file's own tests included):
- Fix A: `scripts/conformance/user-facing-manifest.txt` (the rows of the four pages), `scripts/conformance/user-facing-allowlist.txt` (dated lines out); new component test files beside the screens their rows name; the browser spec files under `e2e/` by area, and the helpers under `e2e/helpers/` they need; `e2e/helpers/crawl-pages.ts` if a page row needs it.
- Fix B: the three spec files, `e2e/dialogs.spec.ts`, and the helpers their causes reach; a source file only when the cause is in it and it is not on the never-list (then it is a STOP naming the file).
- Fix E: the test files the census finds (except the never-list), the one way (its file named at STEP 1), the new census in `scripts/conformance/` and `scripts/conformance/wired.test.ts`.
- Fix C: `scripts/test-ids.ts` with `scripts/test-ids.test.ts`, `scripts/conformance/user-facing.ts` with `scripts/conformance/user-facing.test.ts`, `scripts/conformance/e2e-helpers.test.ts`, `e2e/helpers/layout.ts`, the five inline places, `e2e/helpers/ui.ts` and the spec callers of `afterTotpStep`.
- `docs/features/` (`user-facing-list.md`, `e2e-harness.md`, `ci-guards.md`, the failure notice's); the records files.
- Never: the files TWO LANES OPEN gives to UF-4; the locale files, `supabase/`, `.github/`, `AGENTS.md`, package files, `src/integrations/supabase/`.

THE TURN, IN THIS ORDER
STEP 0 — on the lane:
- Fetch, then `git switch -c cursor/bundle-8c-3c origin/dev` with origin/dev at `6493ccfff`. Its CI run may still be running; read it again before your push. If dev has moved, say so in the report and build on the new dev, unless the move touches a file in SCOPE: that is a STOP.
- `git status --short` must be empty.
- Save this brief byte for byte as `docs/governance/briefs/cursor-bundle-8c-3c.md` (new; scripted copy, saved bare; sha256 equal to the carrier's). Write roadmap line 3 as rule 00 writes it.
- Remove from `scripts/conformance/briefs-allowlist.txt` (read by `scripts/conformance/briefs.test.ts`) every line keyed to a brief other than this one.
- Run `bun scripts/brief/check-go.ts docs/governance/briefs/cursor-bundle-8c-3c.md --root .` and paste its output into the report.
- Commit `cursor-bundle-8c-3c: task saved`; it is not pushed alone.
STEP 1 — THE CENSUS, which STOPS:
- CENSUS-ITEM consumers: for fix A, one line per dated allowlist line: the row's text from the manifest, the tests that already prove part of it, what its census marks NONE, and "component" or "browser" with the DEC-498 or DEC-501 reason; for the four pages, the rows you would add, each with its source. For fix B, each test's failure bodies and traces read, and its cause. For fix E, every hit of its command with its reason value. For fix C, each item checked as it stands.
- CENSUS-ITEM definition: fix A by every dated line; fix B by every retried pass at three or more in seven days on the ledger as read; fix E by every reason assertion; fix C by each item.
- CENSUS-ITEM tests: the spec files and component tests the rows reach, and every test of the helpers fix B and fix C touch; their assertions keep their words unless a ruling names them.
- CENSUS-ITEM lists: `scripts/conformance/user-facing-manifest.txt` and `scripts/conformance/user-facing-allowlist.txt`; `scripts/conformance/wired.test.ts`; `docs/features/ci-guards.md`.
- CENSUS-ITEM old-file-readers: name every reader of a file that moves or is deleted, if any.
- CENSUS-ITEM second-readers: the readers of `idsIn` and `titlesIn` (`rg -n "idsIn|titlesIn" scripts src e2e`), and of `afterTotpStep`.
- CENSUS-ITEM chunk-graph: not applicable — tests and scripts only; name any app file a fix B cause makes you change, with its chunk.
- CENSUS-ITEM environments: the component tests in jsdom; the browser tests on both Chromium projects and, for SAP-1 and DLG-E12, WebKit.
- CENSUS-ITEM mechanisms: the user-facing list and its guard; the flake ledger; `useFailureKind`; `isCardTwin`; the two title readers; `afterTotpStep` and DEC-488's judge.
- CENSUS-ITEM first-download: a page's first download grows only by a named cause the report lists chunk by chunk; an unexplained growth is a STOP; no bare number.
- CENSUS-ITEM premises:
  - INC-1278 — SOURCE: `scripts/conformance/user-facing-allowlist.txt`, its dated lines. RED-FIRST: not applicable — new tests for existing behaviour; the guard fails on a dated line's removal without its test.
  - INC-1328 — OPEN: SAP-1's cause on WebKit, from the ledger's runs and a local WebKit trace.
  - INC-1357 — OPEN: AL-31's cause, from its runs' bodies.
  - INC-1327 — OPEN: LGA-21's cause, from its runs' bodies.
  - INC-1273 — SOURCE: `docs/tracking/incidental-findings.md`, its INC-1273 heading. OPEN: DLG-E12's trace on WebKit on this computer.
  - INC-1360 — SOURCE: `src/components/shell/failure-reason.ts`, `readFailure` and `carried`. RED-FIRST: fix E's census fails on TD-8's line 208 as it stood at 3dc448dc3.
  - INC-1335 — SOURCE: `scripts/conformance/user-facing-manifest.txt` line 3. RED-FIRST: the guard reads the header's path and fails on the base text.
  - INC-1337 — SOURCE: `scripts/test-ids.ts` line 58 and `scripts/conformance/user-facing.ts` line 117.
  - INC-1336's remainder — SOURCE: the five places in fix C. RED-FIRST: CF-HELPERS-15 widened, on one of them as it stands at 6493ccfff.
  - INC-1325 — SOURCE: `docs/features/e2e-harness.md` line 788. OPEN: how many completed dev runs the judge has, and what they show. CONTROL: when the judge removes the helper, CI's lanes run every former caller; when it keeps it, nothing changes.
- CENSUS-ITEM callee-codes: not applicable — no door changes.
- CENSUS-ITEM whole-app-calls: not applicable — no app call changes; a fix B cause in app code is named with its callers.
- CENSUS-ITEM findings: write what you find beyond the task, with file and line, in §13. A security hole is a STOP at once, described in the chat only.
- CENSUS-ITEM gate-reach: the staff rows' tests sign in with the permissions their row needs; name each pooled identity's permissions.
- CENSUS-ITEM user-cases:
  - A person whose sign-in ends mid-way (S1.21, S7.16, S7s2.15) returns to where they were after signing in again. SOURCE: the manifest's rows.
  - A seller asked to accept the terms mid-action (S2.9, S7s8.9) accepts and the action completes. SOURCE: the manifest's rows.
  - A staff member without the permission who opens a staff route directly (A7.6) is turned away without a flash of the page. SOURCE: the manifest's row.
- CENSUS-ITEM queued: `rg -n "8c-3c|INC-1278|INC-1328|INC-1357|INC-1327|INC-1360|INC-1335|INC-1336|INC-1337|INC-1325"` across `docs/governance/briefs`, `docs/governance/reports`, `docs/features` and `roadmap.md`.
  - Built here: fixes A, B, E, C as above.
  - Left: INC-1310's last three switches and INC-1359 (Lovable UF-4); INC-1361's three sentence refusals (the before-launch list); INC-1354 is fixed.
- Then STOP: commit the census as `docs/governance/reports/cursor-bundle-8c-3c.stop-1.md` (new), push the lane once as a draft pull request, and end the turn. I answer with ruling 1: the rows' routing, the one way to wait for the reader, the title reader's grammar, and any premise the census finds wrong.
STEP 2 — after ruling 1, PART A: the rows, screen by screen. Commit per area `cursor-bundle-8c-3c part A: <area> rows`.
STEP 3 — PART B: each retried pass fixed at its cause. Commit `cursor-bundle-8c-3c part B: <test id> at its cause`, one per cause.
STEP 4 — PART E then PART C. Commit `cursor-bundle-8c-3c part E: a notice's reason after its reader` and `cursor-bundle-8c-3c part C: the harness's small debts`.
STEP 5 — the docs lines. Commit.
STEP 6 — the checks:
- `bun run typecheck`; `bun run lint`; `bunx vitest run scripts --maxWorkers=2`; `bun run checks` on the final tree. A commit after it re-runs the steps that read its files.
- Each test file the turn changed, run alone (INC-1306).
- Browser runs (`bun run e2e:local`): each spec file the turn changed, by the ids it added or changed; both Chromium projects, 0 retries; SAP-1 and DLG-E12 once on WebKit locally.
- `bun scripts/brief/check-go.ts docs/governance/briefs/cursor-bundle-8c-3c.md --at <the commit STEP 0 began from>`, its output pasted.
- Then the self-review (rule 80), before the push. List every MINOR and MAJOR it counts in §10, each fixed or with its reason.
STEP 7 — ONE push; `gh pr ready <number>`; `gh pr checks <number> --watch --interval 60`; green on the last code commit → the comment per rule 00.
STEP 8 — the report, written while CI runs:
- Rule 60's fourteen headings, with the census in §2.
- §3: each row's test, with its id.
- §14 Records, word for word.
- Its push changes records only.

DECIDE-AND-NAME: each row's routing within DEC-498 and DEC-501; where a browser test sits; the one way to wait for the reader; the title reader's grammar; each flake's fix at its cause. A mechanical edit a standing guard demands as a consequence of your own change is in scope wherever it falls, byte for byte, named under §10, unless the file is on SCOPE's never-list (then it is a STOP).

RECORDS (§14), word for word:
- "DEC-508 (the supervisor's, G17, overridable; it amends the operator's split of 28 Nov, 05:31 New York) — Cursor 8c-3c answers every dated row of the user-facing list, S6d.2 included, because its allowlist line sits between two of this lane's rows and two lanes cannot remove neighbouring lines; it also carries LGA-21's retried passes (INC-1327) and the sweep of INC-1360. Lovable UF-4 takes INC-1310's last three switches and INC-1359's five permission-named switches, which are screen-only. Why: the split follows the files each item touches, and no two open lanes share a file or a neighbouring line."
- INC-1328, INC-1357, INC-1327, INC-1360, INC-1335, INC-1337: fixed (what was built), each with its cause as found; INC-1336's remainder fixed; INC-1325 by DEC-488's judge, as found; INC-1278 closed when its last dated line goes.
- The register rows named in THE SYSTEM blocks; one changelog line.

TOLERANCES (G60), by defect:
- A red whose failure or server log names a path this lane changed is a STOP; any other is named under §11 and CI judges.
- A local failure is fixed at its cause, never retried or loosened; no dial and no timeout is raised; no `retries` is added to a test.
- A test whose assertion would have to change, beyond those a ruling names, is a STOP.
- A spec file past rule 20's size is split by area, titles and bodies intact.
- A hypothesis refuted by what you read is not a STOP: the cause you find decides, named under §10.

FINDINGS (G64): anything major beyond this task goes in §13 with file and line; a security hole is a STOP at once, described in the chat only.

LIMITS TO STATE: CI's WebKit lane and repeat lane, and the merged tree with UF-4, are CI's and the supervisor's.
