# THE LOVABLE GUARD'S THIRD EXCEPTION — a removed allowlist line passes (DEC-396) — report

Base: dde51203b · Final commit: 41e697a3d · Brief: docs/governance/briefs/lovable-guard-allowlists.md (sha256 890f1ca2679b74d97751cd52ebffc844cc7b3bd8043e6605e72236ebb637fce1)
Review: READY · 0 BLOCKER · 0 MAJOR · 0 MINOR · on 41e697a

CI at the base: dev `dde5120` SUCCESS (run 43832530743, completed 2026-11-16T08:43:56Z; lanes skipped, the code tree proven by run 43828673900). CI on this pull request ([#53](https://github.com/tesfayekb/ethio-marketplace/pull/53)): §11.

## 1. Done / not done, by part and step

- STEP 0: done — the brief saved by scripted copy (the fenced text extracted back, `sha256sum` equal to 890f1ca2…fce1); roadmap line 3 names the brief and keeps the previous line after "Previous: "; `scripts/conformance/briefs-allowlist.txt` held no line keyed to a brief (it is comments only), so nothing was removed; `[check-go] no finding` on the tree as saved; commit `b8b20a8ee` `lovable-guard-allowlists: task saved`.
- STEP 1: done — the census, §4.
- STEP 2: done (`41e697a3d`) — the third exception in `scripts/ci/lovable-branch-guard.sh`, CF-LVB-11 and CF-LVB-12, the CF-LVB section of `docs/features/ci-guards.md`.
- STEP 3: done — `bun run typecheck` exit 0, `bun run lint` exit 0, `bunx vitest run scripts/ci/lovable-branch-guard.test.ts scripts/conformance/wired.test.ts` green (with `scripts/conformance/kit-adoption.test.ts` and `scripts/test-ids.test.ts`: 4 files, 25 tests passed), `bun run checks` (§5), `check-go --at dde51203b` (§5), the self-review (the line above).
- STEP 4: done — one push, pull request #53; CI in §11.
- STEP 5: this report; its push changes records only.
- Not done: none.

## 2. Files changed

`git diff --name-only dde51203b` at the final code commit `41e697a3d`:

```
docs/features/ci-guards.md
docs/governance/briefs/lovable-guard-allowlists.md
roadmap.md
scripts/ci/lovable-branch-guard.sh
scripts/ci/lovable-branch-guard.test.ts
```

The brief is new (`git ls-files docs/governance/briefs/lovable-guard-allowlists.md` names it); this report is new and rides in its own commit after CI. No `src/`, `supabase/`, `.github/`, package or `AGENTS.md` change; no new string; no migration.

## 3. Behaviour contract — before → after

The guard's answer, by changed file of a `lovable/*` pull request (the API's `files`), at `dde51203b` beside the final tree:

| Changed file | Base | Now |
| --- | --- | --- |
| `docs/tracking/intentional-deletions.txt`, added lines only | pass | pass (unchanged) |
| the same, a removed or changed line | refuse, DEC-390 | refuse, DEC-390 (unchanged) |
| `scripts/route-budgets.mjs`, ceiling lines only | pass | pass (unchanged) |
| the same, any other changed line | refuse, DEC-390 | refuse, DEC-390 (unchanged) |
| `scripts/conformance/<name>-allowlist.txt`, `modified`, every changed line a `-` line | refuse, `scripts/**` | **pass** (DEC-396) |
| the same with an added line, or a changed line (one `-` and one `+`) | refuse, `scripts/**` | refuse, "a Lovable branch may only remove an allowance — DEC-396; an added or changed line is refused" |
| the same with no patch from the API | refuse, `scripts/**` | refuse, "the API carries no patch for it … DEC-396's exception cannot be read" |
| the same with status `added`, `renamed` or `removed` | refuse, `scripts/**` | refuse, "… — <status>; a Lovable branch may only remove lines of an existing allowlist — DEC-396; a new, renamed or deleted allowlist is refused" |
| a rename away from an allowlist | refuse, `scripts/**` (previous path) | refuse, `scripts/**` (previous path; unchanged) |
| `scripts/conformance/kit.ts`, `scripts/doors/manifest.txt`, a nested `scripts/conformance/x/y-allowlist.txt`, `scripts/conformance/allowlist.txt`, `….txt.bak`, `scripts/forms-allowlist.txt` | refuse, `scripts/**` | refuse, `scripts/**` (unchanged) |
| every other path | per `rule_for` | per `rule_for` (unchanged) |

One wording change beyond the new rows: the `scripts/*` rule's text now names both exceptions ("the two exceptions: a ceiling line, DEC-390; a removed allowlist line, DEC-396"); the brief orders it. The exit codes (0 pass, 1 refusal, 2 input not the API's JSON) and the pass line are unchanged.

## 4. Censuses

- consumers — `ls scripts/conformance/*-allowlist.txt | wc -l` = 63 (the brief's COUNT). The dispatch at the base (`scripts/ci/lovable-branch-guard.sh:122`, `if [ "$filename" = "$DELETIONS" ] || [ "$filename" = "$CEILINGS" ]`) named two files by equality; every allowlist fell to `rule_for`'s `scripts/*` (:41 at the base).
- The two merged Lovable pull requests, by `git show --stat` and by the guard run on each one's real files from the API (`gh api --paginate repos/tesfayekb/ethio-marketplace/pulls/<n>/files`, read-only):
  - #48 (`453487452`, `lovable/forms-countries`), 13 files; outside `src/`: `docs/features/forms.md`, `docs/generated/i18n-usage.json`, `docs/tracking/intentional-deletions.txt`, `public/i18n-usage.json`, `scripts/conformance/forms-allowlist.txt` (`2 -`), `scripts/route-budgets.mjs`. The guard as built: exit 1, one refusal — `scripts/conformance/forms-allowlist.txt — modified: scripts/** …`; every other file passes. (INC-1178, reproduced on the real pull request.)
  - #47 (`7c0f10130`, `lovable/import-reason-words`), 7 files; outside `src/`: `docs/features/imports.md`, `docs/generated/i18n-usage.json`, `public/i18n-usage.json`. The guard as built: exit 0, "7 file(s), none outside …".
  - #48's patch for `forms-allowlist.txt`: two hunks, each with `-` lines only (`CF-FORM-1 … country-dialogs.tsx (4)` and `CF-FORM-4 … country-dialog-state.ts (1)`) and context lines.
- definition — a `-` line in a `scripts/conformance/<name>-allowlist.txt` patch, file status `modified`; a `+` line, a changed line, a rename, a new or a deleted allowlist file refuses.
- tests — `scripts/ci/lovable-branch-guard.test.ts` CF-LVB-1…10 (bodies unchanged) + 11, 12; `scripts/conformance/wired.test.ts` unchanged and green (the step's basename).
- lists — `rg -lw 'CF-LVB-1[12]' src e2e scripts` before the change: empty (exit 1). No list a new name must join.
- old-file-readers, second-readers, chunk-graph, environments, first-download — not applicable: a bash script and its test; no `src/` file changes.
- mechanisms — `exception_refusal` (base :65), the constants `DELETIONS` and `CEILINGS` (:25–:26) and the dispatch (base :96–:105) re-read before the edit; the third exception is one more branch of `exception_refusal` and one more disjunct in the dispatch.
- premises — (a) holds: `git show --stat 453487452` names `scripts/conformance/forms-allowlist.txt | 2 -`. (b) holds: the API's `patch` for that file carries the `-` lines. (c) holds: no allowlist file is named by equality in the dispatch at the base.
- queued — `rg -n 'lovable-guard|DEC-396' docs/governance/briefs docs/governance/reports roadmap.md`, minus this turn's own brief: no line.
- Whether removal narrows, for the 63 files (this turn's own check): the file names read in full; the headers of `agents-lines`, `allowlist-keys`, `planted-proofs`, `migration-proof-keys`, `proof-readers`, `shared-values` and `lanes` read; `rg -i "must (stay|be listed)|required|inverse|only grows|never shrink"` over the 63 files found nothing. Each of those is an exception list (a line exempts one file or site from a census), so removing a line narrows it. The other 56 headers were not read one by one — a finding for the supervisor to confirm at Knowledge v3.15 (§13).

## 5. Tests

- Added: CF-LVB-11 (an allowlist's removed lines pass: the real lines of `scripts/conformance/forms-allowlist.txt` as a `-`-only patch with context; beside a screen file and an added deletions line, as wave 3 ships it; every allowlist file of the tree in one planted page, listed through the kit's `walkFiles`), CF-LVB-12 (an added line, a changed line, a mixed patch, no patch, status `added`/`renamed`/`removed`, a rename away, and `kit.ts`, `scripts/doors/manifest.txt`, a nested allowlist, `….txt.bak`, `allowlist.txt` without the dash, `scripts/forms-allowlist.txt` still refused under `scripts/**`). Each case asserts the exit code and the reason. The patch lines come from the real file's own lines (read at run time), not authored text.
- Changed: the file's header comment and imports (`walkFiles` from the kit); CF-LVB-1…10's bodies are byte for byte as at the base. CF-LVB-1's prefix assertion on the `scripts/**` rule still holds against the longer rule text.
- Red-first: with `scripts/ci/lovable-branch-guard.sh` put back to `git show HEAD:…` (the base text, restored from `/tmp/ethio-scratch/lovable-guard-allowlists/new.sh` afterwards), `bunx vitest run scripts/ci/lovable-branch-guard.test.ts` → `Tests  2 failed | 10 passed (12)`: CF-LVB-11 `expected 1 to be +0`, CF-LVB-12 `expected '::error title=lovable-branch-guard::1…' to contain 'scripts/conformance/forms-allowlist.t…'`. On the new script: `Tests  12 passed (12)`.
- A first laws run found one failure of my own: `scripts/conformance/kit-adoption.test.ts` CF-ADOPT-1 (`scripts/ci/lovable-branch-guard.test.ts:2 imports a tree enumerator` — I had imported `readdirSync`); fixed in the same commit by listing the files through the kit's `walkFiles`. Before it, `bunx vitest run scripts --maxWorkers=2` read `1 failed | 645 passed | 1 skipped (647)`; the commit is not red. After it: `bun run typecheck` exit 0, `bun run lint` exit 0, the four touched laws `4 files, 25 tests passed`; the whole `scripts/` run again inside `bun run checks` (laws-first, `scripts/ tests first` PASS, 92s).
- `bun run checks`, last line: `checks: 35 PASS · 0 FAIL · 26 NOT RUN · 475s`; fast line: `checks (fast): 26 PASS · 0 FAIL · 405s — laws-first, scope, build-and-check, component-tests, secrets-scan, migration-lint, i18n-usage-map, string-scan, import-gate, listing-write-seam, browse-path-guard, marketplace-weight, dependency-audit, e2e-preflight, e2e, promote; slow steps follow (build, budget, semgrep)`.
- NOT RUN, each with the runner's reason (the log, `/tmp/ethio-scratch/lovable-guard-allowlists/checks.log`): `scope › Lovable branch guard (DEC-394)`, `scope › Decide whether the lanes run`, `scope › Index the code tree the lanes prove` (GitHub-run-only: the Actions API's artifacts; CF-DOCS-1…10 and CF-LVB are the local proof); `build-and-check › Workflow lint (actionlint, pinned)` and `secrets-scan › Secrets scan (gitleaks, pinned)` (pinned linux/x64 binaries, this machine darwin/arm64); every `Install dependencies` step and `e2e-preflight › Cache bun install`, `Bun cache hit?` (the sandbox's dependencies already installed); `dependency-audit › Audit` (the advisory service unreachable from the sandbox); `e2e-preflight › Migration parity preflight (staging)` (needs staging credentials the script never holds); `e2e › Download shard results`, `Download job log tails`, `Download error contexts`, `Verify the downloaded artifacts belong to this attempt`, `Publish merged E2E report`, `Verdict` (GitHub artifacts, backend and browsers); `promote › …` four steps (only CI promotes, DEC-020); `semgrep › Upload SARIF`, `Warn: the SARIF upload failed` (GitHub's code-scanning upload). 26 in all.
- `bun scripts/brief/check-go.ts docs/governance/briefs/lovable-guard-allowlists.md --at dde51203b` → `[check-go] at dde51203bae0669601ef5ebb033b1e22abb69b86 (--at dde51203b): the tree laws and every other COUNT read its snapshot …; a COUNT that is a git read runs in /Users/tesfayemackbookpro/ethio-marketplace; the allowlist and the template are read from /Users/tesfayemackbookpro/ethio-marketplace` then `[check-go] no finding`. At STEP 0, on the tree as saved: `[check-go] no finding`.
- Browser tests: none added or changed (no spec file in the diff), so no `--grep` run; the J-audit line is not owed (no `e2e/**` change). The E2E values are set in this environment (checked by name only); nothing needed them.

## 6. K2 — siblings that bypass the mechanism

Greps run: `rg -n 'lovable' scripts/ci .github/workflows`, `rg -n 'exception_refusal|rule_for|is_allowlist' scripts`, `rg -n 'DEC-390' scripts docs/features`.
- The one place a Lovable pull request's file list is judged is `scripts/ci/lovable-branch-guard.sh` (`rg -l 'exception_refusal|rule_for|is_allowlist' scripts` names only it); `.github/workflows/ci.yml`'s `scope` step only pipes the API into it (CF-LVB-10, unchanged). No second reader. `.github/workflows/zap-baseline.yml` also matches `lovable` in the first grep; it is a scan workflow, not a reader of a pull request's files, and out of scope (read-only, not changed).
- `rg -l 'DEC-390' scripts docs/features` names the script, its test and `docs/features/ci-guards.md` (the CF-LVB section, edited here). Outside `docs/features`, DEC-390 is also written in `docs/_changelog.md`, `docs/tracking/incidental-findings.md`, `docs/spec/spec-ledger.md`, `docs/governance/system-state.md`, the handoff of 2026-11-15, `claude-supervisor-instructions-v1.19.md`, `instructions-amendments.md` and earlier briefs and reports: the shared ledgers and the supervisor's records, which a feature lane never edits (rule 00, THE SHARED LEDGERS); the records turn lands DEC-396 beside them (§14).
- Outside this turn's scope: none else found.

## 7. Allowlists and guards

- Allowlists: none touched. `scripts/conformance/briefs-allowlist.txt` — 0 lines keyed to a brief before, 0 after (comments only; the STEP 0 removal had nothing to remove).
- Guards: CF-LVB-11 and CF-LVB-12 are the new self-tests, planted cases on the API's own JSON shape, each asserting the exit code and the reason; the script's caller stays named in `scripts/conformance/wired.test.ts` (the step's basename, unchanged, green). CF-ADOPT-1 (`kit-adoption.test.ts`) caught one enumerator import of mine (§5) and is green after the fix.

## 8. Strings

None — no new or changed key (the brief's FLAG `no-new-string`). Check: no `src/` file in `git diff --name-only dde51203b`.

## 9. Migrations

None — no `supabase/` or `.sql` file in the diff (the brief's FLAG `no-migration`).

## 10. Departures

- DECIDE-AND-NAME (the brief's): the allowlist path's shape test is a `case` glob (`scripts/conformance/*-allowlist.txt`) in `is_allowlist` (`scripts/ci/lovable-branch-guard.sh`), and a second test in the same function — `[[ "${1#scripts/conformance/}" != */* ]]` — because a `case` glob's `*` crosses a slash and would let a nested `scripts/conformance/x/y-allowlist.txt` through. Only `scripts/conformance/` — `scripts/doors/manifest.txt` and every other `scripts/` file stay refused (CF-LVB-12).
- One narrowing the brief did not spell out: an allowlist takes the exception only when its status is `modified`. A deleted allowlist (every line a `-` line) refuses, beside the brief's "a rename or a new allowlist file refuses": deleting the file is not "a line removed", and the census reading its file would meet a missing file. Named here for the supervisor; a one-word change if the ruling is otherwise.
- The no-patch refusal text names DEC-396 for an allowlist (the same sentence as for the other two, with the DEC of the exception); for the deletions and ceilings files it still says DEC-390 (CF-LVB-7, unchanged, passes).
- The header comment gained DEC-396's sentence as its own paragraph after the quoted ROLE paragraph's DEC-390 text, and the old "two DEC-390 exceptions … under either exception" sentence now reads "three exceptions … any exception" (the brief: "the header comment gains DEC-396's sentence after DEC-390's two exceptions").
- No STOP and no ruling in the turn.

## 11. CI

CI at the base: the first six lines of `ci-status.md` at the root of `ci-evidence`, read at the start of the turn (the two-step check: the reported commit is `dde51203bae0669601ef5ebb033b1e22abb69b86`, the base's own):

```
# CI Status (auto-generated — do not edit by hand)

- Commit: `dde51203bae0669601ef5ebb033b1e22abb69b86` (short `dde5120`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-16T08:43:56Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43832530743
```

Reds of earlier turns fixed first: none (the base is green).
This pull request's own run, on the last code commit `41e697a3d` — `gh pr checks 53` read after the run completed: 43 pass, 1 skipping (`Promote to main`, which runs only on `dev`), 0 fail, 0 pending. The two-step check on the branch's evidence, the first six lines of `docs/tracking/branches/cursor/lovable-guard-allowlists/ci-status.md` on `ci-evidence`:

```
# CI Status (auto-generated — do not edit by hand)

- Commit: `41e697a3d3ac27eed48710db4443845d6da73e25` (short `41e697a`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-16T09:48:19Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43840959384
```

The reported commit equals the last code commit; the run is 43840959384 (pull_request, 13m52s). Reds of this pull request's own runs: none; no re-run; no fix commit after the push.

## 12. Limits

- The step runs only in a GitHub `pull_request` run from a `lovable/*` branch; `bun run checks` names it NOT RUN. The planted cases are the proof here; Lovable's next pull request (L3, `lovable/forms-locations`) is the first real run. This pull request itself comes from a `cursor/*` branch, so CI does not run the guard on it.
- No browser run: no spec in the diff.
- The 56 allowlist headers not read one by one (§4) — the premise "removal narrows" rests on the DEC and the 7 headers plus the grep named there.
- Not run on this machine: the 26 steps named in §5.

## 13. Findings

- MINOR, for the supervisor: DEC-396's premise is that every `scripts/conformance/*-allowlist.txt` is an exception list, so a removed line narrows it. A file whose line was a REQUIRED entry (a line that must stay for a check to hold) would make a removal widen. The grep and the seven headers read in §4 found none; reading the other 56 headers is cheap at the records turn, and the kit's own stale-line law (a line no finding needs fails) is what makes a removed line visible in CI. No file:line to fix.
- No security hole met. The class — a rule's consumers enumerated from the rule's text, not from the work it governs (G70) — is in the brief's PREVENTION; this turn read #48 and #47 against the guard before the change (§4).

## 14. Records

- DEC — DEC-396 (amends DEC-390): a pull request from a `lovable/*` branch may REMOVE lines from a conformance allowlist (`scripts/conformance/*-allowlist.txt`, directly under that folder, file status `modified`) that its own change makes stale; it may not add or change one, rename, create or delete an allowlist file; the guard reads it line by line (CF-LVB-11, CF-LVB-12). (The brief's RECORDS text, word for word, with the status and nesting readings of §10.)
- INC — INC-1178: DEC-394's guard as landed refused every form-kit wave-3 pull request (they remove their CF-FORM-1 lines; L2 did — pull request #48, `scripts/conformance/forms-allowlist.txt | 2 -`, refused on that file alone, shown by running the guard on #48's real file list); found before any Lovable pull request met it; closed by this turn.
- slip — S648 (the supervisor): the guard's list ruled from the ROLE paragraph without reading L2's file list.
- register row — the CF-LVB row (added at R17) gains the third exception: `scripts/ci/lovable-branch-guard.sh` judges a `scripts/conformance/<name>-allowlist.txt` patch by content (removed lines only, status `modified`; DEC-396), beside the deletions file (added lines only) and the ceilings file (ceiling lines only) (DEC-390); proof CF-LVB-1…12.
- changelog — The Lovable branch guard gains its third exception: a pull request from a `lovable/*` branch may remove lines from a conformance allowlist, never add or change one (DEC-396, CF-LVB-11 and CF-LVB-12).
- roadmap — the Lovable queue's line notes the exception: the form kit's waves 3 and 4 may retire their CF-FORM-1 lines from `scripts/conformance/forms-allowlist.txt` by removal alone (DEC-396). Knowledge v3.15 owes the ROLE paragraph's third exception (the supervisor's).
