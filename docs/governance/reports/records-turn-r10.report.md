# Records turn R10 — report

Base: af312ca2 · Final commit: c26b96b0d · Brief: docs/governance/briefs/records-turn-r10.md (sha256 c56f05534bbe0f2e82bc0fb7b2928ac668dd676cf3a690addfbd77a091d6cb84)
Review: READY · 0 BLOCKER · 1 MAJOR · 2 MINOR · on c26b96b

## 1. Done / not done, by part and step

- Step 1 — done. `git fetch origin dev main ci-evidence`; `git switch -c cursor/records-r10 origin/dev`;
  `git rev-parse --short HEAD` printed `af312ca22` (dev had not moved). The working tree was clean
  before the switch (`git status --short` printed nothing).
- Step 2 (STEP 0) — done. The brief was cut by `awk` from the operator's task file
  (`~/Downloads/cursor-task-r10.md`, the same text as the chat message) between the
  `-----BEGIN BRIEF-----` and `-----END BRIEF-----` lines, and written inside a four-backtick `text`
  fence by `printf` + `cat` (no retyping). The fenced text, cut back out of the saved file, hashes to
  `c56f05534bbe0f2e82bc0fb7b2928ac668dd676cf3a690addfbd77a091d6cb84` — equal to the value printed
  after END BRIEF. The saved file carries `Base: dev af312ca2` on its line 6.
- Step 3 — done. The data folder is `~/Downloads/r10-data` (see Departures: the operator's line held
  its placeholder). `sha256sum -c data-shas.txt`: all 11 lines OK (amendments-inforce.md,
  block-s85.md, changelog-line.md, handoff.md, inc-append.md, mechanisms-rows.md, roadmap-line3.md,
  roadmap-lines.md, slips-append.md, system-state-position.md, r10_apply.py). Every file in the folder
  is also byte-identical (`cmp`) to its entry in `~/Downloads/r10-data.zip`.
- Step 4 — done. `python3 ~/Downloads/r10-data/r10_apply.py ~/Downloads/r10-data .` run once from the
  repository root; its eight printed lines, `diff`ed against `expected.txt`: no difference.

```
971a281339bede69b23fe3462eece82fc9b17cc6d5c883ae76ace63a6cb0ceb4 docs/tracking/incidental-findings.md
3c0da85a3a313913421bb3b61852be072681f70ca5989fa06e39beb10041b195 docs/spec/spec-ledger.md
21966cb6040783751945bd6e9153154602daef3a72c3234938f6c63a716d51fb docs/governance/instructions-amendments.md
1252ca8f86821cf8da8e1a1810c36efa854fbc0163e543cf25ece0d77ea55be2 docs/governance/system-state.md
4d418b09f7739be4a541fb99ce6a5c7a04ac558a0c54ece133cefb4661186f01 docs/governance/handoffs/2026-11-02-p1-close-handover.md
056d4010f6a8856d09c57c4afa5a622d713aeb66b191c70cbeda9ca9e783a692 docs/governance/mechanisms.md
97db158f552a8fde4fcc06eb4c80cdd7ab99e6c691c6f75112472101afc2851b roadmap.md
10778ff96a0a491d7e8161afd23cbc0aded29f74d76ed0ea07e1f7e4688be515 docs/_changelog.md
```

- Step 5 — done. No record text was edited; the defects noticed are under FINDINGS (section 10).
- Step 6 — done; see section 5 for the last line and the four FAILs (none is this turn's).
- Step 7 — done. Commit `c26b96b0d` "records turn R10: block S85, INC-1019 → INC-1043, S499 → S514,
  the handoff of 2026-11-02 (G41)" with `Co-authored-by: Cursor <cursoragent@cursor.com>` (the
  trailer every earlier Cursor commit on dev carries); pushed; pull request
  https://github.com/tesfayekb/ethio-marketplace/pull/12 ("Records turn R10") into dev.
- Step 8 — this report.

## 2. Files changed

`git diff --name-only af312ca2` (after this report's commit):

```
docs/_changelog.md
docs/governance/briefs/records-turn-r10.md
docs/governance/handoffs/2026-11-02-p1-close-handover.md
docs/governance/instructions-amendments.md
docs/governance/mechanisms.md
docs/governance/reports/records-turn-r10.report.md
docs/governance/system-state.md
docs/spec/spec-ledger.md
docs/tracking/incidental-findings.md
roadmap.md
```

The eight paths step 4 names, the brief and this report — as the brief expects. New files: the brief,
the handoff and this report (`git ls-files` lists each after its commit).

## 3. Behaviour contract — answer tables before → after

None: no route, door, screen or function changed (every changed path is a Markdown record under
`docs/` or `roadmap.md`; no path under `src/`, `supabase/`, `e2e/`, `scripts/` or `.github/`).

## 4. Censuses

The brief asked for no census. The checks run on the imported records (data, unchanged):

- Numbering. `## INC-` headers in inc-append.md: 1019 → 1043, each once. Block S85's definitions:
  DEC-304 → DEC-321 each once, D261 → D312 each once. Slips: S499 → S514, each once. None of these
  numbers was defined at the base (`git show af312ca2:` of spec-ledger.md and incidental-findings.md,
  grepped: no hit). The two "next free" lines agree: block-s85.md:96 `next free DEC-322, D313,
  INC-1044, S515, ACT-022`; inc-append.md:108 `next free INC-1044`.
- Register rows. `docs/governance/mechanisms.md` now holds rows 92 → 99 at lines 115 → 122, row 93
  directly after row 92.
- Paths the records cite, checked against the tree: missing are
  `docs/governance/plans-packages-model-v2.md`, `docs/features/plans.md` (both owed by P-1b, so
  future), `docs/tracking/branches/<ref>/` (a proposed reporter change, future), `supabase/cli` (a
  GitHub repository's issue, not a path) and `scripts/conformance/listing-tier.test.ts` (FINDINGS 1).
- Lines the records cite, checked: `use-admin-listing.ts:115` is `tier: String(l["tier"] ??
  "regular")`; `country-dialogs.tsx:172` is `export function numberOrZero`; `theme-provider.tsx:28` is
  `THEME_INIT_SCRIPT`; `design-foundation.md:605` exists. The `scratchHolder` specs: five files
  (FINDINGS 3). Migration files `20261102045918`, `20261102081500`, `20261102081600` exist.

## 5. Tests

No test added, changed or re-pointed. `bun run typecheck`: `tsc --noEmit`, exit 0.

THE CHECKS (`bun run checks`, on the staged tree, before the commit):

```
checks (fast): 17 PASS · 4 FAIL · 242s — laws-first, build-and-check, component-tests, secrets-scan, migration-lint, i18n-usage-map, string-scan, import-gate, listing-write-seam, browse-path-guard, marketplace-weight, dependency-audit, e2e-preflight, e2e, promote; slow steps follow (build, budget, semgrep)
checks: 24 PASS · 4 FAIL · 30 NOT RUN · 306s
```

The four FAILs, each read in its log, none from this turn's files (the same four the p1-packages
report records on this computer):

- laws-first › scripts/ tests first: 86 files, 436 passed, 1 failed — NH-6
  (`scripts/ci/nightly-hour.test.ts:107`, "expected +0 to be 2"): the test points `TZDIR` at an empty
  folder, which macOS's runtime does not honour; CI's Linux runners do.
- component-tests: 427 files, 2671 passed, 1 failed — the same NH-6.
- build-and-check › Workflow lint and secrets-scan: the pinned actionlint and gitleaks downloads are
  Linux x86-64 executables (`file`: "ELF 64-bit LSB executable, x86-64"), which this Mac cannot run;
  CI judges both.

Run by hand because actionlint's FAIL shadowed them: `bun run format:check` — "All matched files use
Prettier code style!" (`roadmap.md` and `docs/_changelog.md` are formatted; the other changed records
are exempt by `.prettierignore`, `prettier --file-info`: ignored); `bunx prettier --check roadmap.md`
— OK; `bun run lint` — 0 errors, 45 warnings; `scripts/e2e-select.ts --self-test` — OK;
`scripts/check-root-routes.ts --self-test` and the check — OK.

NOT RUN, with the runner's reasons: laws-first's changed-folder unit tests and Semgrep-on-changed
(shadowed by NH-6; no source folder changed, and the whole Semgrep scan passed); build-and-check's
Install, Build and Bundle report (shadowed by actionlint; no app code changed); the dependency
installs (already installed); dependency-audit (advisory service unreachable); e2e-preflight (staging
credentials); e2e (CI's lanes); promote (CI only); the SARIF upload (GitHub only).

THE BROWSER CHECK: not run — no spec, screen or helper changed.

## 6. K2 — siblings that bypass the mechanism

None — records only. No mechanism was used or changed, so there is no sibling to list (checked:
`git diff --name-only af312ca2` holds no path outside `docs/` and `roadmap.md`).

## 7. Allowlists and guards

None changed (no path under `scripts/` in the diff). No guard self-test was owed.

## 8. Strings

None (no file under `src/i18n/` changed).

## 9. Migrations

None.

## 10. Departures

- The operator's line kept its placeholder (`<PASTE THE FOLDER PATH HERE>`); the message ended with
  `/Users/tesfayemackbookpro/Downloads/r10-data.zip`. The data folder used is the unzipped
  `~/Downloads/r10-data` beside it, proven equal to the zip file by file (`cmp`) and by
  `sha256sum -c data-shas.txt`.
- The brief was copied from `~/Downloads/cursor-task-r10.md` (the operator's task file), not from the
  chat's text; its sha256 equals the brief's stated value, so the bytes are the same.
- One commit for the brief and the records, as the brief's step 7 titles it, instead of rule 00's
  separate `<stem>: task saved` commit. The report is its own commit, after the pull request was
  opened, because step 8 asks for the pull request's link in it.

FINDINGS (the records are unchanged; each is the supervisor's to rule):

1. MAJOR — `docs/governance/mechanisms.md:116` (row 93, from mechanisms-rows.md:1) names its guard as
   `scripts/conformance/listing-tier.test.ts` CF-TIER-4. That file does not exist; CF-TIER-4 lives in
   `scripts/conformance/card-tiers.test.ts` (lines 26, 83, 227). The register points at a guard
   nobody can find.
2. MINOR — `roadmap.md:3` (roadmap-line3.md) and `roadmap.md:5` (roadmap-lines.md:1) say "the register
   rows 93 → 98"; the brief, the changelog line and mechanisms-rows.md add rows 93 → 99
   (`mechanisms.md:116` → `:122`).
3. MINOR — the K2 debts line, `roadmap.md:13` (roadmap-lines.md, "K2 debts filed at R10"), says "four
   spec-local `scratchHolder` helpers" and names five spec files; `rg -l scratchHolder e2e` also finds
   five (ad-page-doors, admin-listings, admin-packages, admin-screening, my-listings-doors).
4. Not verified — the handoff (`docs/governance/handoffs/2026-11-02-p1-close-handover.md:8`) names the
   database marks `20261102200000`, `20261102210000`, `20261102220000`, `20261102230000`,
   `20261103000000`; no file in `supabase/migrations/` carries those stamps (the T1 and P-1 files are
   `20261102045918`, `20261102081500`, `20261102081600`, …). They may be the applied versions on the
   two databases, which this turn cannot read. The last one, 2026-11-03 00:00Z, is later than the
   block's close (2026-11-02 16:4xZ).

No instruction was found inside the imported content.

## 11. CI

The base, `git show origin/ci-evidence:docs/tracking/ci-status.md | head -6`:

```
# CI Status (auto-generated — do not edit by hand)

- Commit: `af312ca2238538efd905ed6ea5fc97c262b0ac19` (short `af312ca`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-02T15:18:01Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41466288604
```

Two-step check: SUCCESS, and the reported commit is the base af312ca2 — current. guards-last-failure.md
and e2e-last-failure.md for the same run: no failed build/guard job; "last E2E run 41466288604
passed". No red of an earlier turn to fix.

This pull request's runs: pull request #12's CI on its last commit; the "every check green" line
goes in the pull request's comment.

## 12. Limits

- actionlint and gitleaks could not run here (Linux binaries); NH-6 cannot pass on macOS. CI judges all
  three.
- No build was run locally (no app code changed); CI's build-and-check and bundle-budget judge.
- The database marks in FINDINGS 4 cannot be read from this computer (no database access, by rule).
- The browser tests were not run: no spec, screen or helper changed.
