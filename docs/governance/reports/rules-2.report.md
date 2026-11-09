# Cursor rules turn 2 — the executor protocol learns what the lanes of 4–8 Nov taught — report

Base: af50ca802 · Final commit: a346e2a · Brief: docs/governance/briefs/rules-2.md (sha256 154d4758eeaa998919dbf88b7964cd101a552c601ec83e2a5648f2c660f76792)
Review: READY · 0 BLOCKER · 0 MAJOR · 0 MINOR · on a346e2a

## 1. Done / not done, by part and step

- Step 0 — done. `git fetch origin dev main ci-evidence`; `git switch -c cursor/rules-2 origin/dev`; `git status --short` empty before the switch (the working branch had been `cursor/p2-fold`, tree clean). BASE = af50ca802; HEAD = `git rev-parse origin/dev` = af50ca802c2b44974d3abe4d7f3fb68340bc4eaa, so no drift and no `git diff --name-only af50ca802..HEAD` to list. The task's fenced text (BEGIN TASK → END TASK, final newline) hashed to the stated sha256 before saving, and the saved block hashes to it again (`sed` of the fence's inner lines through `shasum -a 256`). The brief was written by script (a `sed -n '3,33p'` of the attachment between two four-backtick fences). Commit `rules-2: task saved` (312055038).
- Step 1 — done. The five attachments (`<name>.mdc.txt`, the uploader's rename) were copied by `cp` over `.cursor/rules/<name>.mdc`; `shasum -a 256` of the five saved files prints the five values the task gives, and `wc -c` prints 16635 / 13251 / 8741 / 5357 / 4217 bytes as stated:
  - 00-protocol.mdc 05d0d69187b9d416b28f4d9daa728dceb3817ea066142b75e3de2ed86603e3a7
  - 10-code-laws.mdc d3bfa82e17619f6e4df1b2c31117455b2318715664cb16966d5bdada461b5b11
  - 30-migrations.mdc 2f9a89edee18ef4e12cb41c8246bf01331db2342cd340c7b058c4d87949c7a2b
  - 60-report.mdc e1ae562a0a67a050914b1ae1760fbb28371f49e9f08f9bc500deb670567f7327
  - 80-review.mdc 17ae68812e3a2f0fb35dabe6a195171efb79a2162c230740f98a44b8645e8f0a
    Commit `rules-2: the five rule files, replaced from the supervisor's attachments` (a346e2a5b). I read `git diff af50ca802 -- .cursor/rules/` whole (5 files, 84 insertions, 18 deletions). Every hunk is one of the changes the task's WHAT THIS TURN IS lists:
  - 00-protocol: PLAN FIRST's list of lists (exact-list assertions included); the `**MODEL — …**` line as data and the ruling-as-attachment paragraph (INC-1076); the 72-character subject; the standing allowance cut to line 3 of `roadmap.md` and THE SHARED LEDGERS (DEC-346); git gains `cat-file` and local-only `stash`, loses `checkout`/`restore`/other `switch`; `git show <sha>:<path>` with a redirect; `/tmp/ethio-scratch/<stem>/`; the re-land recipe.
  - 10-code-laws: §Documentation, records into the report's section 14.
  - 30-migrations: the mark chosen at the commit (G39) and the six-point PRE-STOP SCAN with its one report line.
  - 60-report: "fourteen headings", sections 13 and 14 and their two rules.
  - 80-review: review point 7.
    No hunk outside that list.
- Step 2 — done; reds named under Limits and Findings. `bun run typecheck` exit 0. `bunx vitest run scripts --maxWorkers=2`: 97 of 98 files and 491 of 492 tests passed; the one failure is NH-6. `bun run lint`: 0 errors, 46 warnings. `bun run checks`: see section 5.
- Step 3 — this report; commit `rules-2: report`; push, pull request, CI wait follow it.

## 2. Files changed

`git diff --name-only af50ca802` (read before this report was written; the report is the one further path):

```
.cursor/rules/00-protocol.mdc
.cursor/rules/10-code-laws.mdc
.cursor/rules/30-migrations.mdc
.cursor/rules/60-report.mdc
.cursor/rules/80-review.mdc
docs/governance/briefs/rules-2.md
```

Plus `docs/governance/reports/rules-2.report.md` (this file). All five rule paths already existed at the base (replaced, not added); the brief and the report are new files. No `roadmap.md`, no `docs/_changelog.md`, no `AGENTS.md`, nothing under `src/`, `supabase/`, `e2e/` or `scripts/`.

## 3. Behaviour contract — answer tables before → after

none — no route, door, screen or function was touched; the change is rule text under `.cursor/rules/` (the diff names no path outside it besides the brief and this report).

## 4. Censuses

The brief asked for none. For section 13 I ran these greps (all at the final tree):

- `rg -n '_changelog|mechanisms\.md|incidental-findings|roadmap' .cursor/rules AGENTS.md docs/conventions.md` (other rule files): only `.cursor/rules/12-ui.mdc:11` reads the register for rows; no other rule file instructs a ledger write.
- `rg -n 'twelve|12 headings|section 12|checkout|restore' .cursor/rules AGENTS.md`: no stale "twelve headings" text left (`60-report.mdc:53` "section 12" is Limits and still correct); `AGENTS.md:20` says "stale checkout" (the noun, unrelated).
- `rg -n 'changelog|_changelog' scripts docs/conventions.md docs/governance/lovable-knowledge.md`: `docs/governance/lovable-knowledge.md:5` and `:13`, `scripts/conformance/executor-hooks.test.ts:261` (Findings below).
- `rg -l 'cursor/rules' ~/.cache/ethio-checks/logs /tmp/rules2-laws.log`: no hit — no red body names a `.cursor/rules/` path.

## 5. Tests

No test was added, changed or re-pointed (no code). Red-first: not applicable.

- `bun run typecheck`: `tsc --noEmit`, exit 0.
- `bunx vitest run scripts --maxWorkers=2`: Test Files 1 failed | 97 passed (98); Tests 1 failed | 491 passed (492). The failure is `scripts/ci/nightly-hour.test.ts` NH-6 ("a machine that cannot resolve New York's zone is an error, never a silent stand-down", INC-962): `expected +0 to be 2` at line 107. It is the machine limit the task names; its body names no `.cursor/rules/` path.
- `bun run lint`: exit 0 — 46 problems, 0 errors, 46 warnings (none in a file this turn touched).
- `bunx prettier --check docs/governance/briefs/rules-2.md`: clean.
- THE CHECKS, `bun run checks`, fast line: `checks (fast): 17 PASS · 4 FAIL · 269s — laws-first, build-and-check, component-tests, secrets-scan, migration-lint, i18n-usage-map, string-scan, import-gate, listing-write-seam, browse-path-guard, marketplace-weight, dependency-audit, e2e-preflight, e2e, promote; slow steps follow (build, budget, semgrep)`
- Last line: `checks: 24 PASS · 4 FAIL · 30 NOT RUN · 325s`
- The four FAILs, each read from its log under `~/.cache/ethio-checks/logs`:
  - `laws-first › scripts/ tests first (INC-1030)` — NH-6 (same assertion as above).
  - `component-tests › Component tests (vitest + RTL + jsdom)` — NH-6 again (the log's one failure is `scripts/ci/nightly-hour.test.ts:107`).
  - `build-and-check › Workflow lint (actionlint, pinned)` — `::error::actionlint self-test: the bad fixture failed for another reason`; the runner downloaded `actionlint_1.7.7_linux_amd64.tar.gz`, a Linux binary, on this Mac (the task's "actionlint on this Mac" limit).
  - `secrets-scan › Secrets scan (gitleaks, pinned)` — exit 1 after `Secrets scan: 29 commits in 7acae2b4d..HEAD`; the runner fetched `gitleaks_8.24.3_linux_x64.tar.gz`, a Linux binary (the task's "gitleaks on this Mac" limit). Output is counts only.
  - Because the actionlint step failed, the runner marked `build-and-check › Typecheck / Format check / Lint / selector self-test / Root route names / Build` NOT RUN; I ran typecheck and lint myself (above) and the bundle-budget step rebuilt (PASS, 0 NEAR).
- NOT RUN, with the runner's reasons: laws-first's changed-folder tests and Semgrep-on-changed (an earlier step failed); `dependency-audit` (advisory service unreachable from the sandbox); `e2e-preflight` (needs the staging credentials, which I never hold); `e2e` merge steps (GitHub artifacts, need the lanes); `promote` (only CI promotes, DEC-020); `semgrep › Upload SARIF` and its warning (GitHub-only); installs (a package change is its own turn). Semgrep scan: PASS (counts only).
- No browser test: the task changes rule text; no screen or helper changed.

## 6. K2 — siblings that bypass the mechanism

none — no mechanism was built or changed. Greps run: the four in section 4.

## 7. Allowlists and guards

none changed. No allowlist line added or removed (no `scripts/conformance/*-allowlist.txt` in the diff); no guard added, so no guard self-test is owed. The laws run (section 5) is the guard evidence.

## 8. Strings

none — FLAG `no-new-string`; no `src/i18n/` path in the diff and no `t(` key touched.

## 9. Migrations

none — FLAG `no-migration`; no path under `supabase/migrations/` in the diff. (The attached `30-migrations.mdc` is rule text, not a migration; I applied nothing and ran no database command.)

## 10. Departures

1. `roadmap.md` untouched — the one departure this task dictates. Line 3 keeps naming the brief it named at the base, because the open lane on pull request #30 would conflict with a second writer of line 3 at its "Update branch" (DEC-346's reason); this task's base is stated in the brief (`Base: dev af50ca802`). No check refused on it (nothing in the laws run or `bun run checks` read line 3 and failed).
2. A premise of the task differs from the tree, not a STOP because nothing refused: the task says line 3 "keeps naming the P-2 (c) brief in force". At `af50ca802`, `roadmap.md` line 3 reads "The brief in force: docs/governance/briefs/p2-promote.md (turn P-2 (b) — Promote …)"; pull request #30 (`cursor/p2-fold`, "P-2 (c) — The fold", open) is the lane that holds P-2 (c). The action — leave line 3 alone — is the same either way.
3. Rule 00 step 2's other half ("line 3 starts with `The brief in force: docs/governance/briefs/<stem>.md`") and rule 80's "read the brief in force (`roadmap.md` line 3 → …)" were therefore not done as written; I took the base and the brief from the task's own `Base: dev af50ca802` and the saved `rules-2.md`.
4. Rulings: none were pasted; no STOP occurred.
5. The attachments arrived as `<name>.mdc.txt` (the uploader refuses `.mdc`); saved with the `.txt` removed, bytes unchanged, each hash equal to the task's value (section 1).

## 11. CI

Base's CI, two-step SHA check, `git show origin/ci-evidence:docs/tracking/ci-status.md | head -6` (after `git fetch origin dev main ci-evidence`):

```
# CI Status (auto-generated — do not edit by hand)

- Commit: `79d778cf539b739eaedf38e1ab7307322b2d8efd` (short `79d778c`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-09T00:17:16Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42537291761
```

Step 1: SUCCESS. Step 2: the reported commit (79d778c) is not the base (af50ca802) — a mismatch, so this file is STALE for the base, not its verdict. `guards-last-failure.md` reports the same run and commit; `e2e-last-failure.md` ("last E2E run 42537291761 passed") and `local-backend-proof.md` report commit e64e6f86fbe7…, run 42537291761. `gh run list --commit af50ca802c2b44974d3abe4d7f3fb68340bc4eaa` lists only "CI Status Report" (success), "Nightly E2E" (one success, one cancelled) and "Feed bench" (one failure, scheduled) runs on that sha; I found no completed push-triggered CI run for it among them, so I cannot state the base's own verdict. Reds of earlier turns fixed: none (nothing here touches code). Pull request checks: appended to the pull request's description when its CI completes.

## 12. Limits

- The base's own CI verdict could not be read (section 11): the ci-evidence files report other commits. Not stated as green.
- The checks' four FAILs are machine limits (NH-6, actionlint and gitleaks Linux binaries on this Mac); CI judges them. Their bodies were read from the runner's logs; I did not read the logs of the 30 NOT RUN steps because they did not run.
- `bun run db:proof`, browser tests (`e2e:local`) and the `e2e-preflight` were not run: not applicable (no migration, no screen) or no staging credentials (never held).
- The five files are the supervisor's text; I was asked to land them unchanged, not to judge them, and have not. I did not run the new rules' own recipes (re-land, pre-stop scan) — no lane used them.
- Self-review: the diff is the five files (the supervisor's text), the brief and this report; "0 / 0 / 0" is a statement about my work (the copy, the proof, the scope), not a review of the supervisor's wording, whose contradictions are in section 13.

## 13. Findings

Each is something in the five files that sits against another rule or file I must also follow; I changed none of them.

1. `docs/governance/lovable-knowledge.md:13` (H1: "Structural changes update /docs/features/<name>.md and append one _changelog.md line in the same change; never renumber or delete") against `.cursor/rules/00-protocol.mdc:170-177` (THE SHARED LEDGERS: `docs/_changelog.md` "written only by the records turns, never by a feature lane") and `.cursor/rules/10-code-laws.mdc:183-186` ("a feature lane never edits those files"). Rule 00 item 3 says `lovable-knowledge.md`'s laws bind Cursor too, so the two instructions collide; Lovable's lane is the other executor. Raised, not resolved; the same file's line 5 (`_changelog.md append-only`) is the same text.
2. `.claude/`'s guard tests still encode the old allowance: `scripts/conformance/executor-hooks.test.ts:261` (EXH-1 expects a write to `docs/_changelog.md` to pass the scope guard as "the standing allowance"), `:313` (EXH-3 expects `roadmap.md` to pass with no brief in force) and `:443` (`allowed("git restore --source=origin/dev -- src/server/ai/gateway.ts")`) against `00-protocol.mdc:163-164` (allowance cut to line 3 of `roadmap.md`, no `_changelog.md`), `:170-177` and `:197-200` (no `restore`, no `checkout`). The hooks belong to the dormant Claude Code executor (`CLAUDE.md`, `.claude/**`: not mine to touch), so nothing breaks today; the two executors' laws, which `00-protocol.mdc` says are "the same", now differ here.
3. `.cursor/rules/30-migrations.mdc:55-58` ("`<MARK>` is a 14-digit UTC stamp … above every mark in the ledger (the brief gives the floor)") against `:72-78` (the mark's value "chosen at the commit, never earlier": commit hour rounded up plus one hour, +100 a part). Compatible if the brief's floor stays a lower bound, but it is unstated which wins when a brief's floor is above the commit-hour value; worth one sentence.
4. `.cursor/rules/00-protocol.mdc:91-93` (step 2 still requires line 3 to start with this stem's brief and "tick or add only the roadmap lines the task dictates") and `.cursor/rules/80-review.mdc:8` ("Read the brief in force (`roadmap.md` line 3 → …)") against this turn's own "DO NOT TOUCH `roadmap.md`" and `00-protocol.mdc:173-174` ("a task that dictates a roadmap tick is the exception" — it names ticks, not a lane's own line 3). Two lanes open at once cannot both satisfy "line 3 names my brief"; the re-land recipe (`00-protocol.mdc:209`) has the same dependency. Raised for a ruling on which lane's line 3 the review reads when two are open.
5. Formatting only: `.cursor/rules/00-protocol.mdc:202` and `:210` carry sentences glued onto a 150- and 189-character line ("… is the operator's to remove (your tool refuses `rm`). `main` moves only by CI's promote job …"; "… Never rebase. A deleted file is declared in the same commit: …"), against the file's ~100-column wrap. No effect on meaning; left as the supervisor's exact bytes.
6. No security, performance or multilingual finding: the diff adds rule text only, no string key, route, dial or provider path (greps: section 4).

## 14. Records

- DEC — the Cursor rules turn 2 installed DEC-346 (the shared ledgers), INC-1076 (rulings as attachments), G39's mark form, the pre-stop scan, the Findings and Records sections, the 72-character subject, cat-file/stash/no-checkout, the re-land recipe
- changelog — 2026-11-08 Cursor rules turn 2: .cursor/rules 00, 10, 30, 60, 80 replaced from the supervisor's attachments (DEC-346 installed in the executor's rules; INC-1076; the pre-stop scan)
