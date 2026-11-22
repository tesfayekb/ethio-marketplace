CURSOR BUNDLE 3 — the dialog anatomy's laws, the stylesheet line in the Lovable branch guard (DEC-425), the step-up dialog on the anatomy, the test reads that drop their error (INC-1245), and the weekly records as the last part. Base: dev 9d9748da3

Stem: `cursor-bundle-3` (brief `docs/governance/briefs/cursor-bundle-3.md` (new); report `docs/governance/reports/cursor-bundle-3.report.md` (new)). Tier A (one sign-in file changes its frame; the rest is guards and tests). FLAGS: no-migration, no-package-change, no-agents-change, no-new-string. PLAN FIRST: the census stops once. One bundle, one branch `cursor/bundle-3`, one pull request, one judged run (DEC-414).

PREVENTION (G70): four classes that cost Lovable bundle 2 its first run, each still without a guard. (1) A module loaded on demand imported the language provider, and tests in files it never touched went red. (2) A page reached the real dialog parts statically. (3) The panel's body had three forms; WebKit gave two of them no height. (4) A Lovable pull request could not carry the stylesheet's limit line, so the supervisor rewrote seven classes to stay inside it. · Repository: Parts 1 and 2. · Instructions: v1.20, with the records part. · Cursor rules: with the records part. · Knowledge: v3.16, with the records part.

SIDE BY SIDE (two lanes are disjoint by files, not by types and guards): Lovable's bundle 3 is in flight on `lovable/next`. It edits everything under `src/components/shell/`, the eleven table pages, `src/features/posting/map/map-pin-dropper.tsx`, `src/components/ui/dialog-parts.tsx` (its `ClosedPrimary`), three readers' exported filter types, and lines of these specs: admin-audit, admin-users, admin-roles, admin-screening, admin-translations-data, admin-translations-governance, house-style, dialogs. You edit none of those files. THE GUARDS THIS BUNDLE LANDS are named in Parts 1, 2 and 4; your census runs each new law against the head of `origin/lovable/next` as well as against the base and names every finding there (it is that lane's to fix before its pull request, never yours).

THE SYSTEM (G0) — concern 1
CONCERN: every dialog, sheet and panel is drawn by one anatomy — one body that scrolls, its buttons in view, its words handed in — and nothing can leave it unnoticed.
MECHANISM: `src/components/ui/dialog-parts.tsx` (the parts), `src/components/ui/dialog-parts-look.ts` (their look), `src/components/ui/dialog-parts-facade.tsx` (the thin parts a page imports), `src/components/ui/overlays-impl.ts` (the module loaded on demand), `src/components/ui/dialog-rules.ts` and `src/components/ui/dialog-opener.ts` (the Escape and focus rules).
CONSUMERS (grep of 9d9748da3): every file that draws a dialog, an alert dialog, a sheet, the staff shell or a table panel; the census lists them by the definition, tests included.
COVERED HERE: the six laws of Part 1. LEFT: nothing known; a finding on `origin/lovable/next` is named for that lane.
CONFORMANCE GUARD: `scripts/conformance/dialogs.test.ts` and `scripts/conformance/overlays.test.ts` — each new law proven on a planted bypass; allowlist `scripts/conformance/dialogs-allowlist.txt` (reason and expiry per line); lands in Part 1.
EXCEPTIONS: the dialogs without a description that `docs/features/design-foundation.md` names under "Dialog anatomy", each with its reason; none other.
FIVE LENSES — security: a red primary is never focused on open and Escape closes the innermost layer first (the rules stay in their two files) · performance: the real parts stay off every page's first download · failure modes: a failed on-demand load is already answered by the overlay facade · consistency: one body form in both engines · future growth: a new panel kind is one more consumer, never a second anatomy.
FORWARD-SCAN: Lovable bundle 3 adds a panel body for filter rows on the same anatomy; the laws read it by definition. REGISTER: rows 88 and 89 gain these laws in the records part.

THE SYSTEM (G0) — concern 2
CONCERN: a Lovable pull request changes screens only; a size limit moves only with the supervisor's measured text.
MECHANISM: `scripts/ci/lovable-branch-guard.sh` :46 `CEILINGS`, with `scripts/ci/lovable-branch-guard.test.ts`.
CONSUMERS: the workflow that runs the guard on every pull request from a `lovable/` branch; the census names it.
COVERED HERE: DEC-425 — the stylesheet's limit line of `scripts/check-bundle-size.mjs` (:69 `css`: its number, with ONE added comment line in DEC-296's form in the block above the two limits) is admitted, as DEC-390 admits a page's ceiling line of `scripts/route-budgets.mjs`; every other change of that file still refuses.
CONFORMANCE GUARD: the guard's own tests, new CF-LVB-17 (the admitted form passes) and new CF-LVB-18 (any other line of that file, and the same line in another form, refuse); lands in Part 2.
EXCEPTIONS: none.
FIVE LENSES — security: the guard still judges from the base and never runs the head's code · performance: none · failure modes: an unreadable diff refuses, as today · consistency: one form for every limit line · future growth: a third limit file is one more named exception, by a decision.
FORWARD-SCAN: Lovable bundle 3 may grow the stylesheet. REGISTER: the branch guard's row gains DEC-425 in the records part.

THE SYSTEM (G0) — concern 3
CONCERN: a test's read that fails stops the test; it never compares against nothing.
MECHANISM: NONE YET — built in Part 4 as a law of `scripts/conformance/e2e-helpers.test.ts`, to the repository's own model (INC-1239's double-cast census: the law first, a shrinking allowlist, the sites as their specs are touched).
CONSUMERS: every read under `e2e/` that takes `data` and never reads `error`; `e2e/admin-categories-console.spec.ts` :74 `secondaryParentNames` is the one found (INC-1245). The census counts them by the definition.
COVERED HERE: the law, INC-1245's own site, and every site in a spec this bundle already touches. LEFT: the rest, on the allowlist with INC-1245 as its expiry.
CONFORMANCE GUARD: new CF-HELPERS-10 in `scripts/conformance/e2e-helpers.test.ts`, proven on a planted read; allowlist `scripts/conformance/e2e-helpers-allowlist.txt`; lands in Part 4.
EXCEPTIONS: a read whose test asserts the refusal itself (it reads `error` by definition).
FIVE LENSES — security: a deny proof that swallows its error proves nothing · performance: none · failure modes: the error's text reaches the failure body · consistency: one form for a test's read · future growth: the allowlist only shrinks.
FORWARD-SCAN: the tests-and-CI turn retires the allowlist. REGISTER: a new row in the records part.

SCOPE, by area (the plan narrows it to files): `scripts/conformance/` (the dialog, overlay and e2e-helper laws with their allowlists and tests); `scripts/ci/` (the Lovable branch guard and its test); `src/features/auth/mfa/` (the step-up dialog and its own tests); `e2e/admin-categories-console.spec.ts` and any spec that asserts the step-up dialog's frame; the brief, the rulings and the reports of this stem; `roadmap.md` line 3. READ ONLY: everything Lovable's lane edits (above), `src/components/ui/`, `docs/features/`. THE RECORDS PART widens the scope by its own ruling. A mechanical edit a standing guard demands as a consequence of this bundle's own change is in scope wherever it falls, named under Departures.

THE TURN, IN THIS ORDER
STEP 0 — on the lane `cursor/bundle-3` from `origin/dev`: fetch, switch, `git status --short` empty. Save this brief byte for byte as `docs/governance/briefs/cursor-bundle-3.md` (new; scripted copy; sha256 equal to the value in the carrier message). Roadmap line 3 names it. Run `bun scripts/brief/check-go.ts` on the saved brief and paste its output into the census.
STEP 1 — THE CENSUS, then STOP. Answer every item of `docs/governance/go-template.md` by its key word (consumers, definition, tests, lists, old-file-readers, second-readers, chunk-graph, environments, mechanisms, first-download, premises, callee-codes, findings, queued), and these:
- laws-at-base — for each law of Parts 1, 2 and 4: the form you propose, what it reads, its planted bypass, and its findings at the base (none are expected; each one is named, never allowlisted silently).
- laws-at-lovable — the same laws run against the head of `origin/lovable/next`: every finding, file:line.
- step-up — `src/features/auth/mfa/step-up-dialog.tsx`: what its frame is today (:69 `DialogContent`, :118 `DialogFooter`), what the anatomy asks, every unit test and browser assertion that reads its frame, and whether a word is missing (a missing word is a STOP: the supervisor supplies it in both languages).
- dropped-errors — every read under `e2e/` by the definition of concern 3, counted by file.
`docs/governance/reports/cursor-bundle-3.stop-1.md` (new); STOP.
STEP 2 — PART 1, the anatomy's laws, each with its planted test:
- new CF-OV-7: no module that `src/components/ui/overlays-impl.ts` reaches by value imports the language provider (`@/i18n`), a door or a query module; its words arrive as props. (`src/test/setup.ts` :74 `loadOverlays` loads that module before every test file: this is why one import reddened six files.)
- new CF-OV-8: `src/components/ui/dialog-parts.tsx` is reached by value only by `src/components/ui/overlays-impl.ts` (:17 `dialogParts`); a page or a primitive takes the thin parts. Type-only reaches pass.
- new DG-8: the body's one form — `src/components/ui/dialog-parts-look.ts` :14 `BANDS_BODY` holds `relative`, `grow`, `min-h-0` and `overflow-y-auto`, and never `flex-1`; `PanelBody` (`src/components/ui/dialog-parts.tsx` :117) is the one scroller.
- new DG-9: a `PanelBody` with no footer part after it carries `end` (the phone's bottom inset; `BANDS_END`, :24 of the look file).
- new DG-10: a consumer keeps no scroller of its own inside a panel; the one list popup the pickers share is not a scroller of its own.
- new DG-11: a panel has a description, or is one of the exceptions the feature doc names.
STEP 3 — PART 2, DEC-425 (concern 2), with new CF-LVB-17 and new CF-LVB-18.
STEP 4 — PART 3, the step-up dialog on the anatomy: the header part with its description, the body part, the footer part, through the thin parts. LOOK ONLY: no door, no call, no state, no word and no test id changes; it keeps the top layer over every other panel (INC-124). Its own tests follow.
STEP 5 — PART 4 (concern 3): new CF-HELPERS-10, INC-1245's site fixed at its cause, the allowlist.
STEP 6 — `bun run typecheck`; `bun run lint`; `bunx vitest run scripts --maxWorkers=2`; `bun run checks`; the test ids this bundle adds or changes, by `--grep`; `bun scripts/brief/check-go.ts` on the saved brief with `--at <the commit STEP 0 began from>` (output pasted). The self-review. Then STOP 2 with `docs/governance/reports/cursor-bundle-3.stop-2.md` (new), pushed: the supervisor reads the run, merges the two lanes' heads on its own clone as a trial, and sends the records package.
STEP 7 — THE RECORDS PART (R18), from the supervisor's package, by its own ruling: applied by its script, proven by sha256, one commit.
STEP 8 — ONE final push after the checks; `gh pr checks <number> --watch --interval 60`; the report, rule 60's headings, §14 Records word for word. The pull request stays a DRAFT until the supervisor says the trial merge is green.

DECIDE-AND-NAME: where a law's form has two readings that find the same files at the base, take the stricter and name it; an allowlist line needs a reason and an expiry the kit accepts; a law this turn adds that finds this brief is expected output and is allowlisted with that reason.

RECORDS (the report's §14, unnumbered; the supervisor numbers at the records part): DEC-425 built; INC-1245 with its status; the register rows of concerns 1 to 3; the guard-debt line (CF-HELPERS-10's allowlist with its count); one changelog line.

TOLERANCES (G60), by defect: a red is a STOP when its failure names a path this bundle changed; any other red is named under Limits and CI judges. A law that finds a file of Lovable's lane at the base is a STOP (the base was thought clean). First download: a page's first download grows only by a named cause the report lists chunk by chunk; an unexplained growth is a STOP; no bare number. No push between 13:00 UTC on a Sunday and the Feed bench's completed run.

FINDINGS (G64): anything major beyond this task goes in §13 with file:line; a security hole is a STOP at once, described in the chat only, never in a committed file (G51).

LIMITS TO STATE: WebKit is not installed for your local runs; the WebKit lane in CI judges the step-up dialog's frame there.
