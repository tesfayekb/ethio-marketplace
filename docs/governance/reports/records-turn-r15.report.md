# Records turn R15 — report

Base: 453487452 · Final commit: c2e0b11b8 · Brief: docs/governance/briefs/records-turn-r15.md (sha256 fc2252c044838694e4b03818bf2515962d66de692c933cd5d34142a3e90b87b8)
Review: READY · 0 BLOCKER · 0 MAJOR · 0 MINOR · on c2e0b11

Model: Claude Sonnet 5.5, as the task file names (records turn). Pull request: https://github.com/tesfayekb/ethio-marketplace/pull/49

## 1. Done / not done, by part and step

- Step 1: `git fetch origin dev main ci-evidence`, then `git switch -c cursor/records-r15 origin/dev`. `git rev-parse --short=9 HEAD` printed `453487452`, the brief's base, so dev had not moved. `git status --short` printed nothing before the switch.
- Step 2: the brief is saved as `docs/governance/briefs/records-turn-r15.md` by a scripted copy: a heading line naming the sha256, a blank line, a four-backtick `text` fence, the data folder's `records-turn-r15.md` copied in whole, the closing fence. The fenced text's sha256 is `fc2252c044838694e4b03818bf2515962d66de692c933cd5d34142a3e90b87b8`, equal to the value the operator's message gives. The file holds the line `Base: dev 453487452`. Committed as `records-turn-r15: task saved` (`ddaae788d`), not pushed alone. Roadmap line 3 was written by the script in step 4, not by hand.
- Step 3: `shasum -a 256 -c data-shas.txt` in `/Users/tesfayemackbookpro/Downloads/r15-data` printed OK for all 17 lines: the thirteen record files, `records-turn-r15.md`, `r15_apply.py` and `expected.txt`. The zip's own sha256 was not checked: only the unzipped folder reached my disk.
- Step 4: I read `r15_apply.py` and changed nothing in it, then ran `python3 /Users/tesfayemackbookpro/Downloads/r15-data/r15_apply.py /Users/tesfayemackbookpro/Downloads/r15-data .` once, from the repository root. It printed ten sha256 lines (section 5) and no assertion failed, so every anchor matched once. All ten lines equal `expected.txt`: the check printed OK for each of the ten paths (see Finding 2 for how it was run). `scripts/conformance/briefs-allowlist.txt` holds no line keyed to a brief (the script asserted so) and was not changed.
- Step 5: no record file was edited by hand. The defects noticed are in section 13.
- Step 6: the gate ran on the final tree; its two lines are in section 5. `bunx prettier --check` on the five named files passed.
- Step 7: the self-review. `git diff --name-only 453487452` lists the ten paths and the brief; no file under `src/`, `supabase/`, `e2e/`, `.github/` or `scripts/` changed. The diff was read for secret-shaped content (none) and for numbering: the 20 headings INC-1150 → INC-1169 are present once each (`rg -c`), DEC-380 → DEC-390 each appear in `docs/spec/spec-ledger.md`, rows 160 → 163 exist in `docs/governance/mechanisms.md`, and no slip line repeats.
- Step 8: one commit, `c2e0b11b8`, first line `records turn R15: block S90, INC-1150 → INC-1169, v1.18, the handoff`, detail in the body. Pushed once to `cursor/records-r15`; pull request #49 into dev, titled "Records turn R15".
- Step 9: this report.

## 2. Files changed

`git diff --name-only 453487452` (eleven paths from the code commit; this report is the twelfth and is added by `records-turn-r15: report`):

```
docs/_changelog.md
docs/governance/briefs/records-turn-r15.md
docs/governance/claude-supervisor-instructions-v1.18.md
docs/governance/handoffs/2026-11-15-l2-close-handover.md
docs/governance/instructions-amendments.md
docs/governance/lovable-knowledge.md
docs/governance/mechanisms.md
docs/governance/system-state.md
docs/spec/spec-ledger.md
docs/tracking/incidental-findings.md
roadmap.md
docs/governance/reports/records-turn-r15.report.md   (this file)
```

New files: `docs/governance/claude-supervisor-instructions-v1.18.md`, `docs/governance/handoffs/2026-11-15-l2-close-handover.md`, `docs/governance/briefs/records-turn-r15.md` (and this report). `git diff --cached --stat` before the commit: 10 files changed, 590 insertions, 24 deletions (the brief's commit not counted).

## 3. Behaviour contract

None — records only. No route, door, screen or function was touched.

## 4. Censuses

None asked. Greps run for the self-review: `rg` over the staged diff for secret shapes (none found); `rg -o "^## INC-[0-9]+" | sort | uniq -d` on the ledger (the 8 hits are lettered headings such as `INC-098b` and `INC-098c`, present identically at the base; not duplicates); `rg -c "^## INC-11(5[0-9]|6[0-9]) "` printed 20.

## 5. Tests

No test added or changed. The ten sha256 lines printed by `r15_apply.py`, as run:

```
3a4f9fdbf183ad4267826bacabcf2ffb6c97e39b0f5583c849ba79006a11bbaf docs/tracking/incidental-findings.md
d1709eaa84843f97993b007a7ec94a44173decfc0acfd63d9c38335af569a1e5 docs/spec/spec-ledger.md
9ed0df29b48c90e91f5832a7cee7e12715c879cb1d9210a1116c301abb9fa778 docs/governance/instructions-amendments.md
d968f848369808be1a8892f0192e56c7b0ab4e7c9256d908ca04807842855e9d docs/governance/system-state.md
a2b1da86f705ee5b23b5c7a520d9fe377c7ad47972501c30cf1d8aac92b10dfd docs/governance/handoffs/2026-11-15-l2-close-handover.md
afe7f501d39b608af39c2afc9878f558f6967d11479aae5a622d03f4dc2e269a docs/governance/mechanisms.md
35bdc43b94a816dc994b873c6654c4b19fc2cfdbd0ad8dce8e398db58a21c5a0 roadmap.md
179fc3ef5eb1a06ff864dae334f88ade5af9307ff823219264a2f7b260eb9906 docs/_changelog.md
f4e2446b7b2b91736abe4e3cec21359e9c5bcaeceb6ce17db53240339714931f docs/governance/claude-supervisor-instructions-v1.18.md
6ce0759a3fd514df90fcaef784fc8990c95a7cc3c134b09bc7759ffeacb3d7f0 docs/governance/lovable-knowledge.md
```

The gate (`bun run checks`, on the final tree, before the commit), its fast line and its last line:

```
checks (fast): 26 PASS · 0 FAIL · 384s — laws-first, scope, build-and-check, component-tests, secrets-scan, migration-lint, i18n-usage-map, string-scan, import-gate, listing-write-seam, browse-path-guard, marketplace-weight, dependency-audit, e2e-preflight, e2e, promote; slow steps follow (build, budget, semgrep)
checks: 35 PASS · 0 FAIL · 25 NOT RUN · 444s
```

The NOT RUNs, as the script names them: `scope` (Decide whether the lanes run; Index the code tree the lanes prove) — GitHub's Actions API artifacts; `build-and-check › Workflow lint` and `secrets-scan › Secrets scan` — the pinned binaries are linux/x64 and this machine is darwin/arm64; the `Install dependencies` steps of `build-and-check`, `component-tests`, `bundle-budget` and `dependency-audit` and `e2e-preflight`'s three install/cache steps — dependencies already installed, a package change is its own turn; `dependency-audit › Audit` — the advisory service is not reachable from the sandbox; `e2e-preflight › Migration parity preflight (staging)` — needs staging credentials the script never holds; `e2e` (six artifact and verdict steps) — need GitHub and the browser lanes; `promote` (two steps) — only CI promotes; `semgrep › Upload SARIF` and its warn step — GitHub's code-scanning upload only. `bunx prettier --check roadmap.md docs/_changelog.md docs/tracking/incidental-findings.md docs/governance/mechanisms.md docs/governance/system-state.md`: "All matched files use Prettier code style!". `bun run typecheck` was not run on its own: no code changed, and `bun run checks` runs the CI job that holds it. No browser test: records only, and the E2E values are not needed.

## 6. K2 — siblings that bypass the mechanism

None — records only. Grep run: none needed; no code concern was touched.

## 7. Allowlists and guards

No allowlist changed. `scripts/conformance/briefs-allowlist.txt` holds only comment and blank lines (the script asserted it); count before → after: 0 → 0 lines keyed to a brief. The guards ran inside `bun run checks` (laws first: PASS in 90 s).

## 8. Strings

None — no source string was added or changed.

## 9. Migrations

None.

## 10. Departures

None. The commit carries no attribution trailer: the brief's step 8 says "with the attribution the rules require", and I found no attribution line in `.cursor/rules/*.mdc` or `AGENTS.md`; see Finding 3.

## 11. CI

The base's CI, from `origin/ci-evidence:docs/tracking/ci-status.md`, read after `git fetch origin ci-evidence`:

```
# CI Status (auto-generated — do not edit by hand)

- Commit: `453487452d0de38ae004143b963519a6022cac12` (short `4534874`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-15T18:51:40Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43748613317
```

The reported commit equals dev's head (`453487452`), so the read is current. `guards-last-failure.md`: no failed build or guard jobs in that run. `e2e-last-failure.md`: that run ran no lanes (the code tree was proven by run 43746190705). No red of an earlier turn to fix.

This pull request's run on the last code commit `c2e0b11b845548d0ec641563c10f042bd99fc895`: run 43752182305, event `pull_request`, `gh run view 43752182305 --json headSha,conclusion` → headSha `c2e0b11b845548d0ec641563c10f042bd99fc895`, conclusion `success`, completed. `gh pr checks 49`: 20 pass, 0 fail, 3 skipping (`E2E lanes`, `First-paint bundle budget (gzipped ceiling)` and `Promote to main (fast-forward on green)`, skipped because the push changes records only: the `Scope (docs-only push, DEC-365)` job passed, and `Promote` never runs on a pull request). Build, typecheck, lint; Component tests; Gitleaks; Semgrep; Migration linter; the guard jobs; the i18n used-on map; CodeQL (three analyses) and the dependency audit all pass.

The branch's evidence: `origin/ci-evidence:docs/tracking/branches/cursor/records-r15/` holds only `e2e-last-failure.md` (no `ci-status.md` for this branch at the time I read it). That file names run 43752182305 and a commit `469d0fb0bbf8d25714a02dcd23842729f791d42f`, which is not in my clone and is not my head; the run's own head sha, read through `gh`, is `c2e0b11b8`, so I judged the run by `gh run view`, not by that file's commit line. It says: "ran no lanes — the code tree was proven by run 43746190705". No red in this pull request's runs; no re-run.

## 12. Limits

- The zip's own sha256 (a22951699d2d9e1bf1b5ed76cb8bc14c9da7211135c96aabfcd5a23a63cb27d2) was not checked: only the unzipped folder reached my disk; every file in it matched `data-shas.txt`.
- The twenty-five NOT RUN steps of the gate are named in section 5.
- I did not read the imported records for their truth (the numbers, pull requests and shas they state); the brief says to import them word for word, and I checked only the structure listed in step 7 of section 1.

## 13. Findings

1. `r15_apply.py:2` — its docstring says "applies the supervisor's record blocks to the repository (eleven paths)", while the script changes ten paths (the eleventh, `scripts/conformance/briefs-allowlist.txt`, is only asserted unchanged: lines 190–193) and the brief says ten. Unchanged; the script is not mine to edit.
2. `expected.txt` — each line separates the hash and the path by ONE space, which `shasum -a 256 -c` (and `sha256sum -c`) reject with "no properly formatted SHA checksum lines found"; the tool wants two. I ran the check as `sed 's/ /  /' expected.txt | shasum -a 256 -c -` from the repository root, which left the file untouched: all ten lines printed OK. The brief's step 4 says to run the check on the file directly; the supervisor may want the next data folder's `expected.txt` written with two spaces.
3. The brief's step 8 asks for "the attribution the rules require"; no rule in `.cursor/rules/` or `AGENTS.md` that I read states an attribution line, so the commit carries none. If one is meant, the supervisor names it.
4. The snapshot of `git status` given at the start of the chat listed about forty modified and untracked files on branch `cursor/f1-doors-4b`, but `git status --short` printed nothing when the turn began, so nothing was carried over; the snapshot was stale.

## 14. Records

None — this turn is the records turn; it lands the supervisor's records and writes none of its own.
