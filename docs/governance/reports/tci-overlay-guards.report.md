# Three test defects that redden lanes they do not judge — report

Base: 34b687c74 · Final commit: 126373b90 · Brief: docs/governance/briefs/tci-overlay-guards.md (sha256 dad7662aa5c5a0fb9b843dff29ff5916497a13982c25673125e26e27d897c46f) · Ruling: docs/governance/briefs/tci-overlay-guards-ruling-1.md (sha256 64a1bf5f3cc2fceddb84a931c8f04b7464db6858fd79f88044dd3a3e234edeb6)
Review: READY · 0 BLOCKER · 0 MAJOR · 3 MINOR · on 126373b

CI on the base (dev 34b687c74), read from origin/ci-evidence: SUCCESS. CI on the final code commit
126373b90 (run 44349776301): every check green (43 pass, 1 skipping — the CodeQL summary).

## 1. Done / not done, by part and step

| Step / part | State | Commit |
| --- | --- | --- |
| STEP 0: brief saved (sha256 equal), roadmap line 3, briefs-allowlist (no line keyed to another brief: none to remove) | done | 7ccd15788 |
| STEP 1: the census (§4) | done | — |
| Part A (INC-1200): overlays by kind, `OVERLAY_ROOTS`, 5 lines retired, HB-4…HB-8 | done | f7e61492f |
| Part B (INC-1201): the Lovable guard's test on its own fixtures | done | 65697c409 |
| Part C (INC-1202): proof text of the two files | done | 826b6525e |
| Stop 1 (the guard's parser home, register row 125) | answered by ruling 1 | 8511223a8 |
| Ruling 1 saved (sha256 equal) | done | bb2891a6b |
| Part C: the standing guard in the migration reader (ruling 1) | done | 2a83401a8 |
| STEP 4: docs lines | done | d0dbdfe81 |
| STEP 4: the self-review's one fix (the guard fails when its reader fails) | done | 126373b90 |
| STEP 5: one push, PR ready, CI green | done | 126373b90 |
| STEP 6: this report | done | this commit |

## 2. Files changed

`git diff --name-only 34b687c74` (before this report's commit):

```
docs/features/admin-guide.md
docs/features/ci-guards.md
docs/features/my-listings.md
docs/governance/briefs/tci-overlay-guards-ruling-1.md
docs/governance/briefs/tci-overlay-guards.md
docs/governance/migrations.md
docs/governance/reports/tci-overlay-guards.stop-1.md
roadmap.md
scripts/check-migrations.sh
scripts/ci/lovable-branch-guard.test.ts
scripts/conformance/holds-its-box-allowlist.txt
scripts/conformance/holds-its-box.test.ts
scripts/conformance/migration-reader.test.ts
scripts/conformance/migration-reader.ts
scripts/conformance/wired.test.ts
scripts/fixtures/bad-random-text-proof-example.sql
scripts/fixtures/good-random-text-proof-example.sql
supabase/migrations/20261118012200_8af8d6de-451a-42f7-9f4a-6d34dcd7cdc5.sql
supabase/migrations/20261118012400_64aca671-da4e-4957-9b60-d2507bbdec58.sql
```

New files (all tracked, `git ls-files`): the brief, ruling 1, the stop report, the two fixtures.
Every path is in the brief's SCOPE, ruling 1's widening (`migration-reader.ts`, its test,
`wired.test.ts`), or the standing allowance (`docs/features/**`, briefs, reports, line 3 of
`roadmap.md`). The brief's `scripts/check-migrations.test.ts` (new) was dropped by ruling 1. No
`src/**` file changed.

## 3. Behaviour contract

No route, door, screen or app function changed (no `src/**` file in §2).

- Box census (`holdsItsBoxCensus`): before, every `resilientLazy` binding or `<Suspense>` whose
  places did not hold a box was a finding. Now the same, except a part whose places draw nothing
  (`null`, or a function returning only `null`) and whose fetched component draws only an
  `OVERLAY_ROOTS` root (`Dialog`, `Sheet`) or `null` is listed under `overlays` and is no finding.
  The census answers `{ consumers, findings, overlays }` (it answered `{ consumers, findings }`).
- The two migration proofs: before, the scratch tag was `'e2e-mig-f16aN-' || substr(v_hex, 1, 10)`.
  Now it is `'e2e-mig-f16aN-' || translate(substr(v_hex, 1, 10), '0123456789', 'ghijkmnopr')`
  (one line in each file, inside `DO $proof$`). Every schema statement, mark and grant is
  byte-identical (§9).
- `migration-reader.ts`'s command line: `--spanning` unchanged; `--random-text <file>…` added.
- `check-migrations.sh`: every earlier guard unchanged; the random-text guard runs after the
  spanning-literal guard and before `Migration guard OK.`.

## 4. Censuses

**Late parts on this tree** (scratch tree `/tmp/ethio-scratch/tci-overlay-guards/census-table/`,
a scratch test printing `holdsItsBoxCensus`'s answer; HB-1's log line on the repository:
`[HB-1] late parts: 21; overlays passed by kind: 5; outside the mechanism: 14; allowlist: 14`):

| Late part | Verdict | Root its component draws |
| --- | --- | --- |
| `src/components/app-shell.tsx#LazyImpersonationBanner` | finding :941, allowlisted | the banner's fixed bar |
| `src/components/marketplace/feed.tsx#Await` | finding :373, allowlisted | the feed |
| `src/components/shell/breadcrumbs.tsx#AdCrumbs` | finding :154, allowlisted | a crumb |
| `src/components/shell/breadcrumbs.tsx#AdminLanguageCrumb` | finding :347, allowlisted | a crumb |
| `src/components/shell/breadcrumbs.tsx#AdminListingCrumb` | finding :343, allowlisted | a crumb |
| `src/components/shell/breadcrumbs.tsx#AdminRoleCrumb` | finding :339, allowlisted | a crumb |
| `src/components/shell/breadcrumbs.tsx#AdminUserCrumb` | finding :335, allowlisted | a crumb |
| `src/components/shell/breadcrumbs.tsx#MyListingCrumb` | finding :441, allowlisted | a crumb |
| `src/components/shell/guide-sheet.tsx#BlockGuideSheet` | finding :98, allowlisted | a `div` (the sheet's body inside `SheetContent`); its places draw a spinner and a word |
| `src/components/shell/impersonation-notice.tsx#LazyImpersonationBanner` | finding :110, allowlisted | the banner's fixed bar |
| `src/components/shell/page-guide.tsx#PageGuideSheet` | overlay by kind (line retired) | `Sheet` |
| `src/features/auth/mfa/step-up-gate.tsx#StepUpDialog` | overlay by kind (line retired) | `Dialog` |
| `src/features/my-listings/my-listing-page.tsx#LazyPromoteSheet` | overlay by kind (line retired) | `Sheet` (`PromoteSheet`) |
| `src/features/my-listings/my-listings-page.tsx#LazyPromoteSheet` | overlay by kind (line retired) | `Sheet` (`PromoteSheet`) |
| `src/features/my-listings/promote-sheet-lazy.ts#LazyPromoteSheet` | overlay by kind (line retired) | `Sheet` (`PromoteSheet`) |
| `src/features/posting/preview/listing-detail.tsx#MapLarge` | finding :1310, allowlisted | a map sheet |
| `src/features/posting/preview/listing-detail.tsx#MapPreview` | holds through a reserver | — |
| `src/features/posting/step-where.tsx#MapPinDropper` | finding :1994, allowlisted | a fixed full-screen map sheet |
| `src/features/posting/step-where.tsx#MapPreview` | holds through a reserver | — |
| `src/routes/c.$slug.tsx#Feed` | finding :32, allowlisted | the feed |
| `src/routes/index.tsx#Feed` | finding :26, allowlisted | the feed |

Of the supervisor's six candidates, five are covered by the rule. `BlockGuideSheet` is not: its
places draw (a spinner, `GuideUnreachable`) and its component's root is a `div`, so its line stays
byte for byte, as the brief allows ("the census decides, line by line").

**Tests that read the census, `RESERVERS` or the allowlist:** only
`scripts/conformance/holds-its-box.test.ts` (HB-1…HB-8).

**The Lovable guard test's live-list fixtures on the base**
(`git show 34b687c74:scripts/ci/lovable-branch-guard.test.ts | rg -n 'ALLOWLIST_LINES|KEPT_A|GONE_B|GONE_C|KEPT_D|CEILING\.'`):

```
45:const ALLOWLIST_LINES = readFileSync(FORMS_ALLOWLIST, "utf8")
48:if (ALLOWLIST_LINES.length < 4)
50:const [KEPT_A, GONE_B, GONE_C, KEPT_D] = ALLOWLIST_LINES;
52:const REMOVED_ONLY = `@@ -14,4 +14,2 @@\n ${KEPT_A}\n-${GONE_B}\n-${GONE_C}\n ${KEPT_D}`;
129:          `@@ -30 +30 @@\n-${CEILING.line}\n+${CEILING.grown}\n\\ No newline at end of file`,
135:      [modified(path, `@@ -30 +30,2 @@\n ${CEILING.line}\n+export const LOOSE = true;`)],
145:          `@@ -30 +30 @@\n-${CEILING.line}\n+${CEILING.line.replace(" }, //", ", extra: 1 }, //")}`,
265:      [modified(FORMS_ALLOWLIST, `@@ -14,2 +14,3 @@\n ${KEPT_A}\n+${GONE_B}\n ${KEPT_D}`)],
270:      [modified(FORMS_ALLOWLIST, `@@ -14 +14 @@\n-${GONE_B}\n+${GONE_B.replace("(", "(9")}`)],
274:    const mixed = run([[modified(FORMS_ALLOWLIST, `${REMOVED_ONLY}\n+${GONE_B}`)]]);
435:        [FORMS_ALLOWLIST]: `${KEPT_A}\n${GONE_B}\n${GONE_C}\n${KEPT_D}\n`,
437:      { [ledger]: "src/a.tsx\nsrc/c.tsx\n", [FORMS_ALLOWLIST]: `${KEPT_A}\n${KEPT_D}\n` },
517:        [FORMS_ALLOWLIST]: `${KEPT_A}\n${KEPT_D}\n`,
519:      { [ledger]: "src/a.tsx\n", [FORMS_ALLOWLIST]: `${KEPT_A}\n${GONE_B}\n${KEPT_D}\n` },
527:    const fresh = plant({}, { "scripts/conformance/new-allowlist.txt": `${KEPT_A}\n` });
```

Now `KEPT_A`, `GONE_B`, `GONE_C`, `KEPT_D` and `CEILING` are constants written in the test
(`scripts/ci/lovable-branch-guard.test.ts:39-56`).

**Premises on L12's tree** (`origin/lovable/report-on-demand` at 9b72bb672; its `src/` copied into
`/tmp/ethio-scratch/tci-overlay-guards/l12/`):

- The base census (34b687c74's test and allowlist) is red:
  `[HB-1] late parts: 23; outside the mechanism: 21; allowlist: 19`, 1 failed | 2 passed. The two
  findings without a line are
  `src/features/ad-page/report-ad-dialog-lazy.ts#LazyReportAdDialog:8` and
  `src/features/ad-page/report-ad.tsx#LazyReportAdDialog:54`.
- This turn's census and allowlist pass on the same tree:
  `[HB-1] late parts: 23; overlays passed by kind: 7; outside the mechanism: 14; allowlist: 14`,
  8 passed (8).
- Part B's premise: the base test file, run on a scratch copy of the tree with every `CF-FORM-1`
  line removed, fails at load (`Error: forms-allowlist.txt has fewer than 4 CF-FORM-1 lines`, no
  tests).

**Part C's census** (G29): `rg -l 'attr_contact_like' supabase/migrations` names 18 files. The
callers' proofs in files stamped after 20261102 that send text through a door are nine
(`/tmp/ethio-scratch/tci-overlay-guards/proof-texts.out`):
`20261103040808`, `20261105080108`, `20261107125358`, `20261107125359`, `20261115203900`,
`20261115204100`, `20261115204200`, `20261118012200`, `20261118012400`. Only the last two send a
title built from a random draw; the others send fixed titles (`'E2E title'`,
`'E2E P2 M1c5 p edited'`) or use their draws only as keys. The new guard at floor 0 names no
migration in the tree (`bun scripts/conformance/migration-reader.ts --random-text
supabase/migrations/*.sql | wc -l` → `0`), which agrees with this census.

CENSUS-ITEMs old-file-readers, second-readers, chunk-graph, environments, first-download,
callee-codes: not applicable — no app file changes.

## 5. Tests

- **Added:** HB-4…HB-8 (`holds-its-box.test.ts`, planted fixtures under
  `node_modules/.cache/holds-its-box-kind`, removed in `afterAll`); MGR-8
  (`migration-reader.test.ts`). **Changed:** HB-1 (log line gains the overlay count; floor ≥ 13 and
  the never-allowlisted keys kept), HB-3 (also checks each `OVERLAY_ROOTS` module's root and
  portal); CF-WIRED-1 (one more line: `conformance/migration-reader.ts" --random-text`).
  CF-LVB-1…14 keep every assertion; only where their lines come from changed.
- `bunx vitest run scripts/conformance/holds-its-box.test.ts`: 8 passed (8), with
  `[HB-1] late parts: 21; overlays passed by kind: 5; outside the mechanism: 14; allowlist: 14`.
- `bunx vitest run scripts/conformance/migration-reader.test.ts`: 8 passed (8).
- The laws, `bunx vitest run scripts --maxWorkers=2`: 124 passed (124) files, 665 passed |
  1 skipped (666).
- Part B's scratch proof (every `CF-FORM-1` line removed): this turn's test file loads and runs.
  The final re-run, inside this machine's sandbox, gave 12 passed, with CF-LVB-13 and CF-LVB-14
  refused by the sandbox (`git init …: could not write config file …/.git/config: Operation not
  permitted`). Those two plant git repositories, which the test's own doc says run only where git
  may write `.git`. The earlier run outside the sandbox in this turn passed 14 of 14. CI's laws job
  ran the file on the real tree, green.
- Red-first: the base census on L12's tree (red), and the base Lovable test on a zero-line allowlist
  (red at load), both in §4.
- Part C's guard proofs (ruling 1's list), on the reader's form:
  - the bad fixture's four lines refused (`:18`, `:19`, `:20`, `:21`), the good fixture passes;
  - a planted copy of 012400's old proof text (restamped `20261118170000`, mark restamped in the
    copy) in a scratch copy of the tree, through the whole script:
    `Random-text guard FAILED:` naming `…20261118170000_…sql:143`, exit 1;
  - 012200's old text refused (`old-20261118012200_….sql:266`);
  - both corrected files pass;
  - at floor 0, no migration named;
  - a reader that fails (a missing file) is reported `FAILED`, never `OK`.
- `bun run typecheck`: exit 0. `bun run lint`: exit 0.
- `bun run checks` (the pre-push gate), fast line
  `PASS     laws-first › scripts/ tests first (INC-1030)  (95s)`, last line
  `checks: 35 PASS · 0 FAIL · 26 NOT RUN · 481s`. Each NOT RUN carries its reason in the log:
  - the scope job's three steps (the Actions API's artifacts);
  - actionlint and gitleaks (linux/x64 pins on darwin/arm64);
  - three installs (already installed);
  - the dependency audit's two steps (advisory service not reachable);
  - the e2e preflight's four steps (staging credentials);
  - the e2e merge's six steps (GitHub artifacts);
  - promote's token step;
  - semgrep's two SARIF steps (GitHub-only upload).
  Those listed above are the 26.
- `bun scripts/brief/check-go.ts docs/governance/briefs/tci-overlay-guards.md --at 34b687c74`:

```
[check-go] at 34b687c74896e3f3f6374890ce41001d6470a062 (--at 34b687c74): the tree laws and every other COUNT read its snapshot /var/folders/xb/_xhx_v4j7gl2v3y34657ymq00000gn/T/check-go-at-pSJkYI; a COUNT that is a git read runs in /Users/tesfayemackbookpro/ethio-marketplace; the allowlist and the template are read from /Users/tesfayemackbookpro/ethio-marketplace
[check-go] no finding
```

- Browser tests: none added or changed (no `e2e/**` file), so none ran locally. CI's lanes ran the
  full suite on 126373b90: green.

## 6. K2 — siblings that bypass the mechanism

Greps run: `rg -n 'budgetsText|route-budgets' scripts/ci/lovable-branch-guard.test.ts`,
`rg -n 'perl -0777' scripts/check-migrations.sh`, `rg -n 'spanning_found=' scripts/check-migrations.sh`.

- `scripts/ci/lovable-branch-guard.test.ts:398-412`: `budgetsText` reads the live
  `scripts/route-budgets.mjs`, and `grown(9)` throws below nine ceiling lines. This is INC-1201's
  class, for the ceilings file (CF-LVB-13, CF-LVB-14). The brief named only the forms allowlist and
  the `/account` line, so it was left (§13).
- `scripts/check-migrations.sh:52`, `:696` (`real_row_offenders`), `:722` (`real_pick_offenders`):
  perl parsers of SQL inside the script, outside the one reader that register row 125 names. They
  are older than this turn and outside its scope (§13).
- `scripts/check-migrations.sh:920`: the spanning-literal guard ignores its reader's exit status
  (§13).

## 7. Allowlists and guards

- `scripts/conformance/holds-its-box-allowlist.txt`: 19 → 14 lines. Retired, in the same commit as
  the rule (f7e61492f):
  - `src/features/auth/mfa/step-up-gate.tsx#StepUpDialog`
  - `src/components/shell/page-guide.tsx#PageGuideSheet`
  - `src/features/my-listings/my-listing-page.tsx#LazyPromoteSheet`
  - `src/features/my-listings/my-listings-page.tsx#LazyPromoteSheet`
  - `src/features/my-listings/promote-sheet-lazy.ts#LazyPromoteSheet`

  No line added. The header gained the overlay rule's sentence.
- `scripts/conformance/briefs-allowlist.txt`: no line before or after.
- New guard: `check-migrations.sh`'s random-text guard, floor `20261118160000` (this turn's commit
  hour, UTC), through `migration-reader.ts --random-text` (`randomTexts`, MGR-8). It has a fixture
  self-test (`scripts/fixtures/bad-random-text-proof-example.sql`: four lines refused;
  `good-random-text-proof-example.sql`: passes), its caller is named in CF-WIRED-1, and it was
  proven on a planted file (§5). `bash scripts/check-migrations.sh` on the final tree, its OK lines:

```
Self-test OK: bad fixture correctly flagged.
Self-test OK: closer-cited exemption fails without the cited policy, passes with it.
Self-test OK: a proof block's scratch table passes only when created, dropped and namespaced there (no drop, no namespace, top-level table all flagged).
Self-test OK: a large file is judged (INC-832).
Self-test OK: definer-without-revoke sample correctly flagged:
Self-test OK: allowlisted file skipped and printed:
Self-test OK: function-without-revoke sample correctly flagged:
Self-test OK: revoke-without-public sample correctly flagged:
Self-test OK: closed function sample passes.
Self-test OK: unmarked-migration sample correctly flagged:
Born-closed guard OK (floor 20261007143529).
Definer guard OK.
Self-marking guard OK (floor 20260817054246).
Public-surface guard self-test OK (a grant whose object a later file drops is no offender; without the drop it is).
Public-surface guard OK (floor 20261003215043).
Real-row proof guard self-test OK (the bad fixture is refused).
Real-row proof guard self-test OK (an allowlisted statement is skipped and printed; the other statement of its file and the bad fixture are still refused).
Real-row proof guard self-test OK (a head containing '||' is refused without its line, skipped by its sha256 line, and a stale sha256 line does not skip it).
Real-row proof guard self-test OK (a reference pick is refused; a scratch-keyed pick and a pick without ORDER BY … LIMIT 1 pass).
Real-row proof guard OK (floor 20261007000000).
Spanning-literal guard self-test OK (the bad fixture is refused, the good one passes).
Spanning-literal guard OK (floor 20261109000000).
Random-text guard self-test OK (the bad fixture's four lines are refused, the good one passes).
Random-text guard OK (floor 20261118160000).
Migration guard OK.
```

  The exact pattern it checks soundly: inside a `DO` block (comments blanked), a
  `jsonb_build_object` pair keyed `'title'`, `'description'` or `'name'`, or a named argument
  `p_title`, `p_description` or `p_name =>`, whose value holds a draw (`gen_random_uuid()`,
  `uuid_generate_v4()`, `md5(…)`, `random()`, `gen_random_bytes(…)`, `to_hex(…)`) or a variable
  assigned by `:=` (declared or in the body) from one, followed to a fixed point. A
  `translate(…, '0123456789', '<a literal with no digit>')` is no draw. Not judged: positional
  arguments, `SELECT … INTO`, a bare `=`.

## 8. Strings

None (FLAGS: no-new-string; no `src/**` file changed).

## 9. Migrations

No new migration. Two landed files' proof text was corrected in place (DEC-345 as DEC-406 reads
it):

- `supabase/migrations/20261118012200_8af8d6de-451a-42f7-9f4a-6d34dcd7cdc5.sql`: line 161 only.
  sha256 before `4450cc7881e976498fdf757ec6cbc3b5def55f3d84fc7d2b6b247f91a5fb996b`.
- `supabase/migrations/20261118012400_64aca671-da4e-4957-9b60-d2507bbdec58.sql`: line 141 only.
  sha256 before `7aa826b317bc95803185dd31afbf9ad203d7bce7224055ee9cb81a33297caa95`.

The byte-identity check (`/tmp/ethio-scratch/tci-overlay-guards/proof-identity.ts`):

```
012200: outside DO $proof$ and comments, equal to HEAD: true; changed lines [161] inside proof blocks [[117,313]]: true; public.admin_undo_listing_edit body md5 18889bb0edaf177e4a0e8acce2459eb9 declared by the file: true
012400: equal: true; changed [141] inside [[84,351]]: true; public.admin_move_listing md5 ae6ec4a71c3a8b0e602ffd185eebd503 declared: true; public.admin_edit_listing md5 315d2d2c8c32de07802e10e37719fe31 declared: true
```

`bun run db:proof --fresh`: `db:proof PASS — applied 515/515, CLI 2.120.0, cold, 57 s`.

Nothing was applied anywhere by this turn (DEC-406). Marks unchanged, so there is no apply pairing
line.

## 10. Departures

- **Stop 1 and ruling 1.** The brief put the guard in `scripts/check-migrations.sh`. Register row
  125 puts a new SQL grammar in `scripts/conformance/migration-reader.ts`. Ruling 1 (option 1)
  widened SCOPE to the reader, its test and `wired.test.ts`, and dropped
  `scripts/check-migrations.test.ts`. The perl candidate was never committed.
- **Fixture form.** The script's own fixture form under `scripts/fixtures/` was used (the brief's
  allowed alternative, ruling 1's choice).
- **The letters mapping.** The brief's example is `'ghijklmnop'`; the files use `'ghijkmnopr'`,
  which also has no digit and maps one-to-one. It is the form the migrations already use: every
  `'0123456789', '<letters>'` in `supabase/migrations` (24 uses, by `rg -o`) is `'ghijkmnopr'`. Any
  letters-only third argument passes the guard.
- **The self-review's fix** (126373b90): the guard's reader calls check their exit status, so a
  reader that fails is `FAILED`, never `OK`. It was found by the review, not asked by the brief.
- **Rule 30 versus DEC-345.** Rule 30 says a landed file is never edited; DEC-345, as DEC-406 reads
  it, governs here (proof text only).
- **`docs/features/my-listings.md:222`** named the three retired `LazyPromoteSheet` lines without
  the word `holds-its-box`. It is updated under the standing allowance (`docs/features/**`).
- **Two MINORs:** `holds-its-box.test.ts` grew from 208 to 768 lines, and `migration-reader.ts`
  from 356 to 485, both over rule 10's ~300-line split. A test's planted fixtures and a reader's
  one-parser-per-grammar home were kept together rather than split into new files this brief did
  not name.

## 11. CI

The base, `git show origin/ci-evidence:docs/tracking/ci-status.md | head -6`:

```
# CI Status (auto-generated — do not edit by hand)

- Commit: `34b687c74896e3f3f6374890ce41001d6470a062` (short `34b687c`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-18T15:49:36Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44339005082
```

The two-step check: SUCCESS, and the reported commit is the base. `origin/dev` did not move during
the turn (34b687c74 at the start, at the stop and at the push).

This pull request's runs:

- Run 44345618975, on the stop's commit 8511223a8 (pushed as a draft): failure. Lane 7 and the
  webkit lane died before any test; the verdict reads
  `E2E: 2 lane(s) died in infrastructure before any test (install-chromium-s-system-libraries) — re-run the failed jobs`.
  Class: infrastructure. No re-run: the next push replaced it.
- Run 44349776301, on the final code commit 126373b90: success. Every check green (43 pass,
  1 skipping — CodeQL's summary): the sixteen lanes, smoke, email, webkit, repeat, the migration
  linter, the bundle budget, and the rest.

## 12. Limits

- The census reads source text, not the built page: whether an overlay truly draws on the top layer
  is its primitive's contract (`Dialog`, `Sheet` over Radix's Portal; HB-3 checks the root and
  portal in their modules), not this census's proof.
- The random-text guard reads only the pattern in §7. Positional arguments, `SELECT … INTO` and a
  bare `=` are not judged.
- Part B's final scratch re-run could not run CF-LVB-13 and CF-LVB-14 inside this machine's sandbox
  (git may not write `.git` there). The earlier run outside it and CI's run of the real file are the
  proof (§5).
- No browser test ran locally (none changed); CI ran every lane.
- Scratch copies for the operator to remove: `/tmp/ethio-scratch/tci-overlay-guards/` (`candidate`,
  `census-table`, `l12`, `partb`, `plant`, `plant-tree`, the logs and scratch scripts).

## 13. Findings

- `scripts/check-migrations.sh:918-921` (MAJOR, outside scope): the spanning-literal guard reads
  `spanning_found="$(spanning_literals …)"` under `set -uo pipefail` without `-e` and never checks
  the reader's exit status. A reader that fails (a parse error, a missing file) reads as no
  offender and the guard prints OK. The random-text guard has the checked form (126373b90). The fix
  is the same three lines.
- `scripts/ci/lovable-branch-guard.test.ts:398-412` (MINOR, outside this brief): `budgetsText`
  reads the live `scripts/route-budgets.mjs` and throws below nine ceiling lines. This is INC-1201's
  class for the ceilings file. The fix is a fixture ceilings text in the test.
- `scripts/check-migrations.sh:52`, `:696`, `:722` (structural): the scratch-table, real-row and
  real-pick guards parse SQL with perl inside the script, not through the migration reader. Each
  is a second parser by register row 125's rule; they are older than the row's sentence.
- None found under security (the diff's secret sweep before each commit: no key-, secret-, token- or
  password-shaped text; the `'title'` key matches are the guard's SQL keys).

## 14. Records

INC — INC-1200: the box census (`holds-its-box.test.ts`) knew one kind of late part and carried every top-layer overlay by an allowance line, so each new on-demand dialog needed a line no screen lane may add (DEC-396) — L12's report dialog stopped on HB-1; class: a census with one kind and a line per exception; fixed by the overlay rule (5 lines retired: `src/features/auth/mfa/step-up-gate.tsx#StepUpDialog`, `src/components/shell/page-guide.tsx#PageGuideSheet`, `src/features/my-listings/my-listing-page.tsx#LazyPromoteSheet`, `src/features/my-listings/my-listings-page.tsx#LazyPromoteSheet`, `src/features/my-listings/promote-sheet-lazy.ts#LazyPromoteSheet`).

INC — INC-1201: `lovable-branch-guard.test.ts` took its fixtures from the live `forms-allowlist.txt` and threw under four `CF-FORM-1` lines, which the form-kit turns remove one by one — L12's removal would have reddened the guard's own test; class: a guard's test that stands on the live list its subject shrinks (G27's kind, for a test); fixed by fixtures written in the test.

INC — INC-1202: the proofs of F1-6a's files 2 and 4 sent a title carrying ten random hex characters through the edit door; an all-digit draw (about one in a hundred) read as a phone number to `attr_contact_like` and the file refused on a fresh backend (CI run 44330082986, lane 4); class: a proof whose verdict depends on its random draw through a content rule (INC-1082's kind); fixed in place under DEC-345 as DEC-406 reads it (`supabase/migrations/20261118012200_8af8d6de-451a-42f7-9f4a-6d34dcd7cdc5.sql`, `supabase/migrations/20261118012400_64aca671-da4e-4957-9b60-d2507bbdec58.sql`) with the guard in `check-migrations.sh` (floor 20261118160000). The sentence for rule 30's pre-stop scan: "a text a proof sends through a door (a title, a description, a name) carries no random digits: its random part is letters only".

DEC — DEC-406: DEC-345's "not yet applied where the correction matters" is read for a proof that fails by its random draw: the correction matters on fresh backends (CI's lanes, db:proof), where every file runs again, so the proof text is corrected in place whether or not ethio-staging and ethio-prod hold the file; schema statements, marks and grants stay byte-identical.

register row — row 60: its text gains "a top-layer overlay (`Dialog`, `Sheet` — `OVERLAY_ROOTS`) with empty places has no box to hold and passes by kind".

register row — row 125 (ruling 1): its mechanism column gains `randomTexts` after `spanningLiterals`, and its consumers gain "`check-migrations.sh`'s random-text guard — floor 20261118160000 (INC-1202)".

changelog — 2026-11-18 — tci-overlay-guards: the box census passes a top-layer overlay whose places draw nothing by its kind (five allowance lines retired); the Lovable branch guard's test stands on fixtures written in it; the two F1-6a proofs send letters-only scratch titles, and the migration reader's random-text guard (floor 20261118160000) keeps new proofs so (INC-1200, INC-1201, INC-1202, DEC-406).
