# CURSOR BUNDLE 3 — the dialog anatomy's laws, the stylesheet line in the Lovable branch guard (DEC-425), the step-up dialog on the anatomy, the test reads that drop their error (INC-1245), and the records part — report

Base: 9d9748da3 · Final commit: ea68f8901 (the last code commit) · Brief: docs/governance/briefs/cursor-bundle-3.md (the three rulings beside it: `cursor-bundle-3-ruling-1.md` sha256 db0114c7d77a453d2928f18a043aa38161abd7d954044a73b2c77df39b048d02, `-ruling-2.md` e9c00981847277fed2b2ffc6da2e6a9508299094a45319c076b33330727ef8a0, `-ruling-3.md` 761769d31abe214cc5a56702dfeb5dd8b9937a5887a7ea170370b36548e4c36b)
Review: READY · 0 BLOCKER · 0 MAJOR · 3 MINOR · on 5cf2fe0 (the self-review of stop 2, over Parts 1 to 4; the three commits after it are the records part, the stylesheet line and the allowlist removal, each by the supervisor's exact text or one deletion, read again below)

## 1. Done / not done, by part and step

- STEP 0 and STEP 1 (the brief saved, the census): stop 1.
- STEP 2, Part 1 — the anatomy's laws CF-OV-7, CF-OV-8, DG-8, DG-9, DG-10, DG-11, each with a planted test (`040b15b8d`).
- STEP 3, Part 2 — DEC-425 in `scripts/ci/lovable-branch-guard.sh`, CF-LVB-17 and CF-LVB-18 (`f62c9275d`).
- STEP 4, Part 3 — the step-up dialog on the anatomy, look only (`24937a48c`).
- STEP 5, Part 4 — CF-HELPERS-10, INC-1245's sites fixed at their cause (the console spec's three, the helpers' thirteen), the allowlist (`5cf2fe04a`).
- STEP 6 and STOP 2 — the gate, the browser ids, check-go, the self-review; `6282bd722`. Pushed after the release of run 45026355366.
- STEP 7 — the records part (ruling 2): `records_part_apply.py` APPLIED 4 files, 6 edits, `expected.txt` OK for each; the saved ruling 2 in the same commit (`deaed4d9a`).
- STEP 8 (rulings 3 and 5): the stylesheet's limit 23 → 24 by `css_limit_apply.py` with ruling 3 saved (`d999c9c79`); the two `#DG-11` lines removed from `scripts/conformance/dialogs-allowlist.txt`, the comment line above them kept (`ea68f8901`); one final push, `6282bd722..ea68f8901`.
- Not done: the weekly block (the ledgers, register rows, changelog, handoff): by ruling 2 it lands as the last part of the next Cursor bundle, by 2026-11-26 (DEC-414); §14 below is its record.

## 2. Files changed

`git diff --name-only 9d9748da3..HEAD` (31 files; `git diff --shortstat`: 31 files changed, 2385 insertions(+), 106 deletions(-)):

```
.cursor/rules/00-protocol.mdc
docs/features/ci-guards.md
docs/features/design-foundation.md
docs/features/e2e-harness.md
docs/generated/i18n-usage.json
docs/governance/briefs/cursor-bundle-3-ruling-1.md
docs/governance/briefs/cursor-bundle-3-ruling-2.md
docs/governance/briefs/cursor-bundle-3-ruling-3.md
docs/governance/briefs/cursor-bundle-3.md
docs/governance/go-template.md
docs/governance/reports/cursor-bundle-3.stop-1.md
docs/governance/reports/cursor-bundle-3.stop-2.md
e2e/admin-categories-console.spec.ts
e2e/helpers/admin-attributes.ts
e2e/helpers/browser-client.ts
e2e/helpers/categories.ts
e2e/helpers/photos.ts
e2e/helpers/posting.ts
e2e/helpers/ui.ts
public/i18n-usage.json
roadmap.md
scripts/check-bundle-size.mjs
scripts/ci/lovable-branch-guard.sh
scripts/ci/lovable-branch-guard.test.ts
scripts/conformance/dialogs-allowlist.txt
scripts/conformance/dialogs.test.ts
scripts/conformance/e2e-helpers-allowlist.txt
scripts/conformance/e2e-helpers.test.ts
scripts/conformance/overlays.test.ts
src/features/auth/mfa/step-up-dialog.test.tsx
src/features/auth/mfa/step-up-dialog.tsx
```

This report (`docs/governance/reports/cursor-bundle-3.report.md`) joins the list with its own commit. The brief's scope widened by ruling 1 (the helpers, the console spec, `ci-guards.md`), ruling 2 (four files: `design-foundation.md`, `roadmap.md` — line 3 untouched —, `go-template.md`, `00-protocol.mdc`) and ruling 3 (`scripts/check-bundle-size.mjs`). Every file is new in the lane's `git ls-files`: the three saved rulings and the two stop reports are tracked.

## 3. Behaviour contract

| Place | At the base | Now |
| --- | --- | --- |
| Step-up dialog (`step-up-dialog.tsx`) | an unbanded frame: `DialogHeader`, the Field a direct child, `DialogFooter` | `DialogContent bands` with `PanelHeader`, `PanelBody`, `PanelFooter`; `layer="top"`, `size="narrow"`, the focus handler, every test id, every word and all state as before |
| Helper reads (`e2e/helpers/*`) | a failed read returned an empty value | `readAttribute`, `readLinks`, `readAal`, `bearerOf`, `coverageOf`, `objectsUnder`, `anyCatchAllLevel` throw with their name and the error's text; `rosterDump` and `lifecycleDump` name the failed read inside their own text; no default, retry or wait changed |
| Lovable branch guard | `scripts/check-bundle-size.mjs` refused whole under `scripts/**` | one exception by content (DEC-425); every other refusal's text is as before except the `scripts/*` rule's, which says "the three exceptions" and names DEC-425 |
| `BUDGET_KIB.css` | 23 | 24, with one DEC-296 comment (ruling 3, by script) |

Nothing else differs. The census that proves it is stop 2's file list and the grep for banned patterns over the added lines (§4).

## 4. Censuses

- The base's findings under each new law, from the real tree at `9d9748da3`: CF-OV-7, CF-OV-8, DG-8, DG-9 and DG-10 find nothing; DG-11 finds `src/components/shell/toolbar-panel.tsx:104`, `src/routes/dev.style.tsx:926`, `:941` and `:959`; CF-HELPERS-10 finds 159 sites in 31 files (13 in 5 helpers, 3 in the console spec, 143 in the other specs after the console spec's three).
- The laws on the merged tree, by the supervisor (ruling 2 answer 5; ruling 3 answer 3): none for every law; I did not run a merge of dev with this lane (the rules forbid one); the pull request's run judges it.
- The same laws on a fresh `git archive` of `origin/lovable/next` at `3acffa4c9` (before the merge of bundle 3), stop 2: DG-11 none (the two allowlist lines stale), the others none, CF-HELPERS-10 the sixteen fixed sites.
- Banned patterns over the added `src/`, `e2e/` and `scripts/` lines: `any`, `as unknown as`, `@ts-ignore`, `@ts-expect-error`, a non-null `!`, `waitForTimeout`, `.first()`, `test.only` — none (two matches were prose in a test title and a comment).
- The stricter reads' consumers: the callers of `readAttribute`, `readLinks`, `readAal`, `bearerOf`, `coverageOf`, `objectsUnder` and `anyCatchAllLevel` are every spec that imports them; I read the sites and ran five ids (§5).

## 5. Tests

- Added: CF-OV-7, CF-OV-8, DG-8, DG-9, DG-10, DG-11 (each with "planted: …"), CF-LVB-17, CF-LVB-18, CF-HELPERS-10 (with "planted: CF-HELPERS-10 …"). CF-LVB-1's `scripts/check-bundle-size.mjs` row moved into CF-LVB-18; two pins (the `scripts/*` rule's text) follow DEC-425.
- Changed by Departure: four planted dialog tests filter by their own rule (accepted, ruling 2); the step-up unit test's mock lost two names (SUD-1 and SUD-2 byte for byte).
- Red-first: the guard's four planted weakenings (DEC-425), each turning CF-LVB-18 red; each law's planted test writes the bypass.
- Totals on the final tree: `bun run typecheck` and `bun run lint` clean; `bunx vitest run scripts --maxWorkers=2`: 129 files, 709 passed, 1 failed, 1 skipped, the one failure being DG-11's four sites (§12); on stop 2's tree (the same code before the three later commits): 129 files, 710 passed, 1 skipped.
- `bun run checks` on the final tree, its fast line: `checks (fast): 22 PASS · 2 FAIL · 454s`; its last line: `checks: 31 PASS · 2 FAIL · 27 NOT RUN · 514s`. The two FAIL are one red: `laws-first › scripts/ tests first` and `component-tests` (the component run holds `scripts/`) both fail on `scripts/conformance/dialogs.test.ts`'s four DG-11 sites (`toolbar-panel.tsx:104`, `dev.style.tsx:926`, `:941`, `:959`) and on nothing else — the expected red ruling 2 and ruling 3 named, because this lane does not hold Lovable's bundle. NOT RUN: the 25 steps stop 2 named (installs, gitleaks, dependency audit, e2e preflight and report steps, promote, the SARIF upload) and, downstream of the laws' red, `laws-first › Semgrep ERROR on changed files` and `laws-first › changed folders' unit tests`; the build, bundle budget (`0 NEAR`) and Semgrep scan passed.
- First download, `node scripts/check-bundle-size.mjs` on the final tree: `JS: 201.4 KiB / 203`, `CSS: 22.6 KiB / 24` (the lane does not hold Lovable's CSS: 22.6 here, the merged tree measures 22.65 by the supervisor). At stop 2, against a lock-exact build of the base: the same chunks, every page equal or lower, none higher, no ceiling moved.
- Browser ids, stop 2: `CT-2`, `CT-5`, `CT-32`, `MF-3`, `MF-8` in `mobile-360` and `desktop-1280`, 0 retries, `10 passed (50.0s)`, 0 `[ssr-error]` lines. No spec file ran whole; CI's lanes are the full proof. E2E count lines and the J-audit: the changed e2e files are helpers and one spec's three reads (no test id added or changed); the lanes' count lines are the pull request's.

## 6. K2 — siblings that bypass the mechanism

Greps run: the definition of CF-HELPERS-10 over `e2e/` (`droppedErrorFindings`); `rg -n "overflow-y-(auto|scroll)|overflow-(auto|scroll)" src` read by DG-10; the `DialogContent`/`PopoverContent`/`ToolbarPanel` sites read by DG-11.
- 142 reads in 25 specs take `data` and never `error`: on `scripts/conformance/e2e-helpers-allowlist.txt`, one line a file with its count, until INC-1245 (the tests-and-CI turn).
- `src/features/admin-categories/category-form-fields.tsx:396` — the country list's `max-h-48` vertical scroller in the form panel: INC-1248, Lovable's next bundle. DG-10 does not see it (a scroller in a child component's own file; the law's header says so).
- DG-11's four sites (`toolbar-panel.tsx:104`, `dev.style.tsx:926`, `:941`, `:959`): INC-1249, fixed by Lovable's bundle 3, merged.

## 7. Allowlists and guards

- `scripts/conformance/e2e-helpers-allowlist.txt`: 23 → 48 non-comment lines (25 new `drops-error (<n>)` lines, 142 sites), each with reason and `INC-1245`; the header gained three comment lines.
- `scripts/conformance/dialogs-allowlist.txt`: 0 → 2 lines at stop 2 (`toolbar-panel.tsx#DG-11`, `dev.style.tsx#DG-11`, INC-1249) → 0 after the final removal, which leaves the DEC-426 comment line. A permanent exception lives in a law's own table: CF-OV-8's two readers, DG-9's `fill` exemption, DG-10's sideways strips.
- Guards run: the guard's own tests (CF-LVB-17, -18, with four planted weakenings); `bunx vitest run scripts` (§5).

## 8. Strings

None. No new or changed key; the step-up dialog's cue (`dialog.moreBelow`) is an existing key the facade hands in. Both i18n maps changed by three route lines under it (Departure 9 of stop 2, accepted).

## 9. Migrations

None. No file under `supabase/`; `bun run db:proof` not run.

## 10. Departures

Accepted by ruling 2 (stop 2's list): 3 the four planted dialog tests filter by their own rule; 4 one allowlist line for the style board's three specimens; 5 the guard reads the base checkout's own file and its tests run on a fixture; 6 "the four exceptions"; 7 the two dumps name the failed read; 8 the type gains `error`; 9 the two usage maps. Departures 1 and 2 of stop 2 (`design-foundation.md` and `wired.test.ts`): the first is now done by STEP 7; the second stands.

New, named by the rulings:
1. The stylesheet's limit 23 → 24 with its DEC-296 comment (ruling 3, answer 4, Class A): `scripts/check-bundle-size.mjs`, by the supervisor's script, sha256 `ef78bb59a49216be733c3beb1211ad21110ce01598ff41f1e7afca38142fd12c`. The number in the comment is the merged tree's, measured by the supervisor; on this lane the stylesheet is smaller and the budget passes either way.
2. Class B (ruling 3): a trial merge that left out the other lane's ruled step; one line of `design-foundation.md` was changed by both lanes; the supervisor moved Lovable's sentence and the three-way merge with STEP 7 is clean. Nothing of this lane changed for it.
3. The weekly block is not part of this bundle (ruling 2, Class C; DEC-414): its ledgers, register rows, changelog and handoff land as the last part of the next Cursor bundle, by 2026-11-26; §14 is their record, word for word, until then (DEC-346).
4. The saved rulings 2 and 3 travel in the commits that apply their scripts (ruling 2 asked for one commit).
5. The expected red on this lane's own tree: DG-11's four sites after the two lines left (ruling 2, STEP 8); no other red. The pull request's run judges the merge with dev, where the law finds none.

## 11. CI

- The base's CI (`9d9748da3`), read from the raw ci-evidence address before the work: `Conclusion: **SUCCESS**`, completed 2026-11-22T10:44:50Z, run 45013403588 (lanes skipped, the code tree proven by run 45009807393).
- The run on stop 2's head `6282bd722`: green, run 45038904160, every lane ran (ruling 2, answer 1; read by the supervisor, not by me).
- This push's run (`ea68f8901`, the last code commit): run 45081574208 (pull_request, head `cursor/bundle-3`), conclusion success. Every check on pull request #94 is pass except two reported as skipping by design (Promote to main; Lovable branch guard, DEC-413): 43 lines pass, 0 fail. Component tests, Build/typecheck/lint, the first-paint budget, the 16 temporary-backend lanes with email, repeat, smoke and webkit all pass. The run judges the merge with dev, which holds Lovable bundle 3 (`84b6b89e1`), so DG-11 finds no site there; the four-site red of §10 item 5 is on this lane's own tree only.

## 12. Limits

- On this lane's own tree DG-11 finds four sites and `bun run checks` and `vitest run scripts` therefore end with one red, the same one in `laws-first` and `component-tests`. It is expected and named by rulings 2 and 3. Two later `laws-first` steps (Semgrep on changed files, the changed folders' unit tests) did not run behind it; the pull request's CI runs them. I did not run a merge of dev into the lane (rule 00 forbids it); the supervisor's trial merge and CI judge the merged tree.
- WebKit: not run locally; the WebKit lane in CI judges the step-up frame (stop 2).
- The stricter helper reads are exercised locally only by the five ids above; CI's lanes are the first full read. A stricter read that turns a test red is a finding by ruling 1, not a flake.
- The first-download numbers of the merged tree are the supervisor's; mine are of this lane (the stylesheet 22.6 KiB without Lovable's bundle).
- The scratch trees under `/tmp/ethio-scratch/cursor-bundle-3/` (`base-tree`, `lovable-head`, `base`, `lovable`) are the operator's to remove.

## 13. Findings

- DP-U24 is a consumer's test, `src/features/admin-screening/name-checks.test.tsx:143`; the held-only subject is held at the mechanism by DP-U20 (`src/components/ui/dialog-parts.test.tsx:487`) and DP-U21 (`:494`) (ruling 1 answer 8's id was the supervisor's slip, Class B of ruling 2; the records part wrote the ids right).
- The entry's dependency map holds one reference fewer to `assets/dialog-parts-facade` on this lane (raw 480608 → 480468 bytes); I did not trace why, nor the pages' 0.1 to 0.3 KiB drops beyond the entry's.
- `e2e/helpers/ui.ts`'s `expectAal2` polls `readAal` ten times; `readAal` now throws on a failed read, so a transient auth error ends that poll at once instead of being retried silently. Left as ruled (a read that fails silently is a finding); named here because it is the one place a stricter read changes a loop.
- INC-1248 and INC-1249 as in §6.

## 14. Records

Word for word, unnumbered but for the numbers the rulings assigned (DEC-346; the weekly block lands by 2026-11-26).

- DEC — 425 (built, `scripts/ci/lovable-branch-guard.sh`, CF-LVB-17 and CF-LVB-18): a Lovable branch's pull request may change the stylesheet's limit line of `scripts/check-bundle-size.mjs` as it may change a page's ceiling line of `scripts/route-budgets.mjs`: its `css:` number, with at most one added comment in DEC-296's form (CSS, one `→`, agreeing with the number, between `const BUDGET_KIB = {` and `js:`); every other change of that file refuses; a base with no block to place it in refuses. Status: built and merged with this lane's pull request; its first use is this lane's own line (23 → 24, ruling 3, by the supervisor's script).
- DEC — 426 (the supervisor's, applied here): a permanent exception is written in the law's own table with its reason; an allowlist line is for a finding that must go away and always carries an expiry. Applied: CF-OV-8's two readers, DG-9's `fill` exemption, DG-10's sideways strips.
- INC — 1245: PARTLY FIXED on this lane. The census counted 159 reads that take `data` and never `error` at the base; the console spec's 3 and the helpers' 13 take their error; 142 reads in 25 specs are on `e2e-helpers-allowlist.txt` with this number as the expiry. OPEN until the tests-and-CI turn gives them theirs.
- INC — 1248 (the supervisor's): `src/features/admin-categories/category-form-fields.tsx:396`, the country list's `max-h-48` vertical scroller inside the form panel; Lovable's next bundle. DG-10 does not see it (a scroller in a child component's own file). OPEN.
- INC — 1249 (the supervisor's): DG-11's four findings at the base, `src/components/shell/toolbar-panel.tsx:104` and `src/routes/dev.style.tsx:926`, `:941`, `:959`. FIXED by Lovable bundle 3 (pull request #95, merged at `84b6b89e1`); the two allowlist lines that carried them are removed in this lane's final push (the comment line above them stays, DEC-426). On the merged tree, by the supervisor, DG-11 finds none.
- INC — (Class B of ruling 2): ruling 1's answer 8 placed `DP-U24` at the mechanism; it is a consumer's test, `src/features/admin-screening/name-checks.test.tsx:143`; the mechanism's held-only subject tests are `DP-U20` and `DP-U21`. The records part wrote the ids right; no new number.
- register row — the dialog anatomy's laws: CF-OV-7 (the overlay module's closure), CF-OV-8 (the real parts' two readers), DG-8 (the body's five classes), DG-9 (a footer after a body, `fill` exempt), DG-10 (no vertical scroller in a panel), DG-11 (a description per panel); guards `scripts/conformance/overlays.test.ts`, `dialogs.test.ts`; allowlist `dialogs-allowlist.txt` (0 lines after the final push, INC-1249 closed).
- register row — the Lovable branch guard's row gains DEC-425: the stylesheet's limit line (CF-LVB-17, CF-LVB-18).
- register row — a test's read takes its error: CF-HELPERS-10 (`e2e-helpers.test.ts`), allowlist `e2e-helpers-allowlist.txt` (25 lines, 142 sites, INC-1245).
- guard-debt line — CF-HELPERS-10's allowlist: 142 reads in 25 specs (the allowlist file 23 → 48 lines), expiry INC-1245; the count only falls.
- changelog — 2026-11-22 cursor-bundle-3: the dialog anatomy has laws (CF-OV-7/8, DG-8 → DG-11), the Lovable branch guard admits the stylesheet's limit line (DEC-425, CF-LVB-17/18) and its first use moves the limit 23 → 24, the step-up dialog is on the anatomy (look only), and a test's read takes its error (CF-HELPERS-10; the console spec's and the helpers' reads fixed, 142 reads allowlisted, INC-1245); the feature doc's two stale sentences, the roadmap's tests-and-CI line, the GO template's two items and rule 00's "Record" sentence by the supervisor's script.
- roadmap — written by STEP 7 (one line, the tests-and-CI turn: the four left laws with the tests that hold them, INC-1245's reads, DG-10's limit); nothing else.
- slip — none.
