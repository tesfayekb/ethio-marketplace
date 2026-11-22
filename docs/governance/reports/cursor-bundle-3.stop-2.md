STOP — cursor-bundle-3 STEP 6: Parts 1 to 4 built and checked; the records part and the final push wait for the next ruling
DONE: parts 1, 2, 3 and 4 (STEPS 2 to 5); STEP 6 (the gate, the browser ids, check-go `--at`, the self-review)
LEFT: STEP 7 (the records part), STEP 8 (the final push and report). NOT PUSHED: the Feed bench gate holds (the ruling: "Do not push while the Feed bench is running"); `origin/cursor/bundle-3` still holds stop 1's commit `50e142945`, this lane is five commits ahead of it.
CI: the base's, read from the raw ci-evidence address before the work (the lane's own commits have no run, nothing is pushed):
# CI Status (auto-generated — do not edit by hand)

- Commit: `9d9748da37bdacda648d3f1a9888bf831dab8b07` (short `9d9748d`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-22T10:44:50Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45013403588
FILES: (`git diff --name-only 9d9748da3..HEAD`, 24 files)
docs/features/ci-guards.md
docs/features/e2e-harness.md
docs/generated/i18n-usage.json
docs/governance/briefs/cursor-bundle-3-ruling-1.md
docs/governance/briefs/cursor-bundle-3.md
docs/governance/reports/cursor-bundle-3.stop-1.md
e2e/admin-categories-console.spec.ts
e2e/helpers/admin-attributes.ts
e2e/helpers/browser-client.ts
e2e/helpers/categories.ts
e2e/helpers/photos.ts
e2e/helpers/posting.ts
e2e/helpers/ui.ts
public/i18n-usage.json
roadmap.md
scripts/ci/lovable-branch-guard.sh
scripts/ci/lovable-branch-guard.test.ts
scripts/conformance/dialogs-allowlist.txt
scripts/conformance/dialogs.test.ts
scripts/conformance/e2e-helpers-allowlist.txt
scripts/conformance/e2e-helpers.test.ts
scripts/conformance/overlays.test.ts
src/features/auth/mfa/step-up-dialog.test.tsx
src/features/auth/mfa/step-up-dialog.tsx

What I need from the supervisor: the push gate's release (the Feed bench's run completed), and the records package for STEP 7. Nothing in this report is a question the ruling left open; the Departures below are each a reading I made inside it, and the one finding (DP-U24's place) is Q8's.

Review: READY · 0 BLOCKER · 0 MAJOR · 3 MINOR · on 5cf2fe0

## What was built, by part (the commits, oldest first)

- `8e8db2af8` the ruling saved by scripted copy; `sha256sum` equal to `db0114c7d77a453d2928f18a043aa38161abd7d954044a73b2c77df39b048d02`.
- `040b15b8d` Part 1, the anatomy's laws, in `scripts/conformance/overlays.test.ts` and `dialogs.test.ts`:
  - CF-OV-7 (the overlay module's value closure reaches no query module, no language provider and no door), CF-OV-8 (only the two named readers take the real parts; the table is in the law, no allowlist line, DEC-426), DG-8 (a body holds the five body classes and never `flex-1`), DG-9 (a body is followed by a footer; a `fill` body is exempt, in the law's table), DG-10 (no vertical scroller inside a panel's JSX, following the same file's components; a sideways strip passes; the header names its limit), DG-11 (per panel: a Description part, a wrapper's `description=`, an `aria-describedby` naming an element the file draws, or the marked exception).
  - Each law has a planted test ("planted: CF-OV-7 …", "planted: DG-8 …", and so on).
  - At the base: CF-OV-7, CF-OV-8, DG-8, DG-9 and DG-10 find nothing; DG-11 finds four, all Lovable's lane (`src/components/shell/toolbar-panel.tsx:104`, `src/routes/dev.style.tsx:926`, `:941`, `:959`), each on `dialogs-allowlist.txt` with the reason "Lovable bundle 3 gives it its description" and the expiry INC-1249.
- `f62c9275d` Part 2, DEC-425 in `scripts/ci/lovable-branch-guard.sh`:
  - The stylesheet's limit line of `scripts/check-bundle-size.mjs` (`css:` in `BUDGET_KIB`) is admitted by content: exactly one removed and one added `  css: <n>,` line, and at most one added comment line in DEC-296's form that names CSS, carries one `→`, agrees with the two css lines, and falls between `const BUDGET_KIB = {` and the `js:` line.
  - Every other changed line, the same line in another form, a removed or second comment, a rename, a new or deleted file, an unreadable patch and a base with no block refuse, with DEC-425 named.
  - The `scripts/*` rule's text now reads "the three exceptions: … the stylesheet's limit line, DEC-425", the header gained its paragraph after DEC-396's (the Knowledge quote untouched), and the two pins in the test follow.
  - CF-LVB-17 (the admitted form passes, by an API patch, by git's zero-context patch and from a planted remote) and CF-LVB-18 (the refusals; it holds the path's former CF-LVB-1 row).
  - Red-first by mutation: four planted weakenings of the script (the placement test, the agreement test, the one-arrow test, the css-position test), each turned CF-LVB-18 red.
- `24937a48c` Part 3, `src/features/auth/mfa/step-up-dialog.tsx`: `DialogContent bands`, `PanelHeader` (title and description), `PanelBody` (the code field; empty in the no-factor mode), `PanelFooter` (the buttons), all from `dialog-parts-facade`. `layer="top"`, `size="narrow"`, the focus handler, every test id, every word and all state unchanged. `step-up-dialog.test.tsx`: the mock lost the two names the dialog no longer imports (`DialogFooter`, `DialogHeader`); SUD-1 and SUD-2's assertions are byte for byte. The i18n usage maps gained three routes under `dialog.moreBelow` (the step-up gate's pages now reach the facade's cue).
- `5cf2fe04a` Part 4, CF-HELPERS-10 in `scripts/conformance/e2e-helpers.test.ts` (`droppedErrorFindings`), its planted test, and `docs/features/e2e-harness.md` and `ci-guards.md`:
  - The sites by definition, over every file under `e2e/`: a destructure `{ data }`/`{ count }`, a callback's `({ data }) =>`, `(await …).data`, and an awaited Supabase chain held in a name whose `.data` is read and `.error` is not. A chain is Supabase by the verbs in its own call chain (a conditional's two branches both read), never by its arguments' code.
  - At the base: 159 sites in 31 files. Fixed here: the console spec's 3 (`e2e/admin-categories-console.spec.ts:77`, `:349`, `:969`) and the helpers' 13 (`admin-attributes.ts` 2, `categories.ts` 3, `photos.ts` 1, `posting.ts` 6, `ui.ts` 1). `e2e/helpers/browser-client.ts` gained `error` on the one answer type whose shape lacked it.
  - Left on the allowlist, until INC-1245: 142 sites in 25 specs, one line a file `<file> drops-error (<n>)`; the allowlist goes from 23 to 48 lines.

## The numbers (every one from a command run in this turn)

- `bun run typecheck`: clean. `bun run lint`: clean.
- `bunx vitest run scripts --maxWorkers=2`: 129 files, 710 passed, 1 skipped.
- `bunx vitest run src/features/auth/mfa`: 4 files, 10 passed.
- `bun run checks`, its fast line: `checks (fast): 26 PASS · 0 FAIL · 454s`. Its last line: `checks: 35 PASS · 0 FAIL · 25 NOT RUN · 515s`.
  - NOT RUN, each with the script's own reason: the installs (the sandbox's dependencies are already installed); gitleaks (the pinned binary is linux/x64, this machine is darwin/arm64); dependency-audit (the advisory service is not reachable from here); e2e-preflight (it compares migrations with staging through credentials the script never holds); the E2E report steps (they merge the browser lanes' artifacts from GitHub); promote (only CI promotes); the Semgrep SARIF upload (only GitHub receives it).
  - Component tests passed (239 s), the NEAR band prints "0 NEAR".
- `bun scripts/brief/check-go.ts docs/governance/briefs/cursor-bundle-3.md --at 9d9748da3`:
  ```
  [check-go] at 9d9748da37bdacda648d3f1a9888bf831dab8b07 (--at 9d9748da3): the tree laws and every other COUNT read its snapshot /var/folders/xb/_xhx_v4j7gl2v3y34657ymq00000gn/T/check-go-at-gdDwQu; a COUNT that is a git read runs in /Users/tesfayemackbookpro/ethio-marketplace; the allowlist and the template are read from /Users/tesfayemackbookpro/ethio-marketplace
  [check-go] no finding
  ```
- The browser ids, by `--grep`, `bun run e2e:local`, projects `mobile-360` and `desktop-1280`, 0 retries: `CT-2`, `CT-5`, `CT-32` (`e2e/admin-categories-console.spec.ts`, the spec whose reads changed) and `MF-3`, `MF-8` (`e2e/mfa-stepup.spec.ts`, the two that draw the step-up dialog in its two modes). `10 passed (50.0s)`; 0 `[ssr-error]` lines in the log. The three E2E names were set (names only checked); the browsers ran against ethio-staging's scratch rows.
- The first download, `node scripts/check-bundle-size.mjs` on this tree against a lock-exact build of the base (`/tmp/ethio-scratch/cursor-bundle-3/base-tree`, the operator's to remove): the entry's chunk list is the same chunk for chunk (`index` 142.4 KiB, `shared-shell` 29.1, `styles` 22.6, the rest as printed), the summary line moves `JS: 201.5 → 201.4 KiB / 203` and `CSS: 22.6 / 23` is unchanged; of the 50 pages' printed lines, 40 are lower and 10 equal, none higher; the largest drop is 0.3 KiB (for example `/` 223.0 → 222.9 / 224, `/admin/listings_/$listingId_/edit` 410.1 → 409.9 / 411). What I read: the entry's dependency map holds one reference fewer to `assets/dialog-parts-facade` (raw 480608 → 480468 bytes, gzip 145808 → 145756, 0.05 KiB). I did not trace why the build drops it, nor the pages' drops beyond the entry's (the step-up dialog's own chunk is on demand and not in these sums). No page moved toward its ceiling, so no ceiling moves; `0 NEAR`. Report this as measured, unexplained in part, per DEC-355's rule that a number needs its cause.
- The new laws against a fresh `git archive` of `origin/lovable/next` (`3acffa4c9`, fetched today; scripts overlaid from this lane, under `/tmp/ethio-scratch/cursor-bundle-3/lovable-head`):
  - CF-OV-7, CF-OV-8, DG-8, DG-9, DG-10: no finding.
  - DG-11: no finding at all, so the two allowlist lines (`toolbar-panel.tsx#DG-11`, `dev.style.tsx#DG-11`) are stale there and the guard says so (`dialogs-allowlist.txt:4 stale allowance`). With both lines removed, `dialogs.test.ts` and `overlays.test.ts` pass (22 tests). The lines are removals only after the merge (DEC-396 admits them).
  - CF-HELPERS-10: 16 findings, exactly this lane's fixes not yet there (`e2e/admin-categories-console.spec.ts:77`, `:349`, `:969`; `e2e/helpers/admin-attributes.ts:103`, `:112`; `categories.ts:134`, `:142`, `:430`; `photos.ts:425`; `posting.ts:43`, `:1626`, `:2010`, `:2018`, `:2025`, `:2031`; `ui.ts:1240`). Lovable's lane adds no other site of its own at that head.

## Q8 — the tests that hold the four queued laws today (named, as ruled)

- Red-focus safety: `DP-U9` (`src/components/ui/dialog-parts.test.tsx:206`) and `DP-U14` (`:402`).
- The empty body: `DP-U19` (`:478`).
- The list-first Escape: the block "panel Escape belongs to its open list" (`:419`), whose one `it` is written once for three kinds and carries the ids `DP-U15` (dialog), `DP-U16` (alert) and `DP-U17` (sheet).
- A held-only subject: `DP-U24` is NOT in `dialog-parts.test.tsx`; it is `src/features/admin-screening/name-checks.test.tsx:143` ("the name subject exists only while its opener holds the name"), a consumer's test. The mechanism's own subject tests are `DP-U20` (`dialog-parts.test.tsx:487`, three held lines kept) and `DP-U21`. This is a finding for the tests-and-CI turn: the law it will write should be held where the mechanism is.

## Departures (each with its reason)

1. `docs/features/design-foundation.md` is untouched, by Q7; its lines that this bundle makes untrue (`:567-568`, `:644` "the step-up dialog stays on its old frame until Cursor migrates it", `:650-651` "Until that guard lands …", and the exceptions' line for DEC-425) travel in the records part.
2. `scripts/conformance/wired.test.ts` is not edited: `e2e-helpers.test.ts`, `dialogs.test.ts`, `overlays.test.ts` and the guard's test are already named there, and the new ids ride inside files it already wires.
3. Four existing planted dialog tests (DG-1, DG-7, DG-4, DG-5) now filter the findings by their own rule's prefix, because they compared the whole list and the new laws add findings to the same planted text; the DG-6 planted text gained a `DialogDescription` so DG-11 does not fire on it. Assertions about their own rule are unchanged.
4. `dialogs-allowlist.txt` holds ONE line for `src/routes/dev.style.tsx#DG-11`, not three: `readAllowlist` refuses a duplicate key and the key is `<file>#<rule>`. The line's reason says it covers the three specimens. The ruling said "each finding takes ONE line"; the key form made the file's three share one.
5. The guard (DEC-425) reads the base checkout's own `scripts/check-bundle-size.mjs` to place the comment (the script runs in the base, DEC-413). Its tests therefore run in a scratch directory holding a fixture of that file, and every patch is `git diff`'s own output over two fixture texts (INC-1201: no test reads the live file). A base with no `BUDGET_KIB` block refuses.
6. The header's sentence "The three exceptions are judged by content…" became "The four exceptions…" with the bundle-size clause; the ruling named the paragraph, this is the sentence that would otherwise have been untrue.
7. `rosterDump` and `lifecycleDump` (`e2e/helpers/categories.ts`) read their `error` and write it into their own text (`db: unreadable (rosterDump: …)`, `db=unreadable (lifecycleDump: …)`) instead of throwing. Both build a failure's message; a throw would replace the failure they were called to explain. The other eleven helper reads throw with the helper's name and the error's text, as ruled.
8. `e2e/helpers/browser-client.ts` (type only) gained `error: { message: string } | null` on `getAuthenticatorAssuranceLevel`'s answer so `readAal` could read it; the helper is under the ruling's "every read under `e2e/helpers/`".
9. The i18n usage maps (`docs/generated/i18n-usage.json`, `public/i18n-usage.json`) changed by 3 route lines under `dialog.moreBelow`, a consequence of Part 3 (rule 10: both maps after touching a `t(` key's reach).

## Limits (what I could not run or prove)

- Not pushed (the gate). CI has not run on any of these commits; nothing here is proven by CI.
- WebKit: I ran only `mobile-360` and `desktop-1280`, as the brief says, and the new browser-facing change is the step-up frame. The WebKit lane in CI judges that frame there.
- The stricter helper reads (`readAttribute`, `readLinks`, `readAal`, `bearerOf`, `coverageOf`, `objectsUnder`, `anyCatchAllLevel`) are exercised locally only by the five ids above; the other specs that call them did not run. A stricter read that turns one red is a finding by the ruling (a read that was failing silently); CI's lanes are the first full read.
- `bun run db:proof` was not run: no migration, no `supabase/` file, none written.
- The Lovable-head run is against the head fetched today (`3acffa4c9`); it moves, so the supervisor's trial merge is the judgement that counts.
- The scratch trees are the operator's to remove: `/tmp/ethio-scratch/cursor-bundle-3/` (`base-tree`, `lovable-head`, `base`, `lovable`).

## Self-review (rule 80), by heading

1. SCOPE — every changed file is in the brief's scope, the ruling's list, or the standing allowance (`docs/features/**`, `docs/generated/i18n-usage.json`, `public/i18n-usage.json`, `docs/governance/**`, line 3 of `roadmap.md`, a `scripts/conformance/*-allowlist.txt`). `e2e/helpers/browser-client.ts` is the one file the ruling's words reach by "every read under `e2e/helpers/`" (Departure 8). No file the task named is unchanged except the two it left to the records part (`design-foundation.md`).
2. BEHAVIOUR CONTRACT — the step-up dialog: layer, size, focus, ids, words and state are as at the base; the frame is the anatomy's (Part 3). The helpers: a failed read now throws (or, in the two dumps, is named) where it returned an empty value; no default, retry or wait changed. The branch guard: one new admitted form; every other refusal text is as before except the `scripts/*` rule's, which names DEC-425.
3. BANNED PATTERNS — none found: I grepped the added `src/`, `e2e/` and `scripts/` lines for `any`, `as unknown as`, `@ts-ignore`, `@ts-expect-error`, a non-null `!`, `waitForTimeout`, `.first()` and `test.only`; the only matches were prose in two test titles and a comment.
4. ONE MECHANISM PER CONCERN — the anatomy laws sit in the existing suites (`overlays.test.ts`, `dialogs.test.ts`); DEC-425 in the existing guard; CF-HELPERS-10 in the existing helpers law, its regex through `scripts/lib/pattern.ts`. K2: the 142 specs' reads are listed by file on the allowlist; `src/features/admin-categories/category-form-fields.tsx:396` (a vertical scroller, `max-h-48`) is INC-1248 and DG-10 does not see it (a child file's scroller, the law's stated limit).
5. TESTS — every law has a planted test and a tree test; DEC-425 has four mutation proofs; the CF-HELPERS-10 planted test writes each form, the passing forms and a destructure that never takes `data`. The assertions that changed shape are Departures 3 and the step-up mock (Part 3).
6. MIGRATIONS — none.
7. DOCS AND RECORDS — `ci-guards.md` and `e2e-harness.md` carry each part's lines; `design-foundation.md` and the four ledgers are left to the records part; both i18n maps regenerated; the allowlist lines carry a reason and an expiry (INC-1245, INC-1249).
8. SECURITY — none: no input boundary, no secret, no route. The guard's new reading refuses what it cannot judge.
- MINOR: Departure 4 (one line for three specimens), Departure 7 (two dumps name rather than throw), and the DP-U24 location above.

## Records (the report's §14, unnumbered but for the numbers the ruling assigned)

- DEC — 425 (built, `scripts/ci/lovable-branch-guard.sh`, CF-LVB-17 and CF-LVB-18): a Lovable branch's pull request may change the stylesheet's limit line of `scripts/check-bundle-size.mjs` as it may change a page's ceiling line of `scripts/route-budgets.mjs`: its `css:` number, with at most one added comment in DEC-296's form (CSS, one `→`, agreeing with the number, between `const BUDGET_KIB = {` and `js:`); every other change of that file refuses; a base with no block to place it in refuses. Status: built, on this lane, not yet merged.
- DEC — 426 (the supervisor's, applied here): a permanent exception is written in the law's own table with its reason; an allowlist line is for a finding that must go away and always carries an expiry. Applied: CF-OV-8's two readers, DG-9's `fill` exemption, DG-10's sideways strips.
- INC — 1245: PARTLY FIXED on this lane. The census counted 159 reads that take `data` and never `error` at the base; the console spec's 3 and the helpers' 13 take their error; 142 reads in 25 specs are on `e2e-helpers-allowlist.txt` with this number as the expiry. OPEN until the tests-and-CI turn gives them theirs.
- INC — 1248 (the supervisor's): `src/features/admin-categories/category-form-fields.tsx:396`, the country list's `max-h-48` vertical scroller inside the form panel; Lovable's next bundle. DG-10 does not see it (a scroller in a child component's own file). OPEN.
- INC — 1249 (the supervisor's): DG-11's four findings at the base, `src/components/shell/toolbar-panel.tsx:104` and `src/routes/dev.style.tsx:926`, `:941`, `:959`; Lovable bundle 3 gives them their description. On `origin/lovable/next` at `3acffa4c9` the law finds none, so the two allowlist lines are stale there and are removed after the merge (DEC-396). OPEN until that merge.
- INC — (new) Class A, found here: the ruling's Q8 names `DP-U24` as held at the mechanism; it is a consumer's test (`src/features/admin-screening/name-checks.test.tsx:143`); the mechanism's own held-subject tests are `DP-U20` and `DP-U21`. For the tests-and-CI turn's law.
- register row — the dialog anatomy's laws: CF-OV-7 (the overlay module's closure), CF-OV-8 (the real parts' two readers), DG-8 (the body's five classes), DG-9 (a footer after a body, `fill` exempt), DG-10 (no vertical scroller in a panel), DG-11 (a description per panel); guards `scripts/conformance/overlays.test.ts`, `dialogs.test.ts`; allowlist `dialogs-allowlist.txt` (2 lines, INC-1249).
- register row — the Lovable branch guard's row gains DEC-425: the stylesheet's limit line (CF-LVB-17, CF-LVB-18).
- register row — a test's read takes its error: CF-HELPERS-10 (`e2e-helpers.test.ts`), allowlist `e2e-helpers-allowlist.txt` (25 lines, 142 sites, INC-1245).
- guard-debt line — CF-HELPERS-10's allowlist: 142 reads in 25 specs (the allowlist file 23 → 48 lines), expiry INC-1245; the count only falls.
- changelog — 2026-11-22 cursor-bundle-3: the dialog anatomy has laws (CF-OV-7/8, DG-8 → DG-11), the Lovable branch guard admits the stylesheet's limit line (DEC-425, CF-LVB-17/18), the step-up dialog is on the anatomy (look only), and a test's read takes its error (CF-HELPERS-10; the console spec's and the helpers' reads fixed, 142 reads allowlisted, INC-1245).
- roadmap — for the records part, per Q8: the tests-and-CI turn writes the four queued laws (red-focus safety, the empty body, a held-only subject, the list-first Escape), each held today at the tests named above.
- slip — none.
