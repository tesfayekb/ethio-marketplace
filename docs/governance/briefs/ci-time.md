# The CI turn — fewer runs a turn, two workers, a shorter start-up — brief (sha256 602f4d1bf6c9dfd9ead7c847c51dc4d43048966e897d15d571ad786f27542ab7)

````text
THE CI TURN — a run's time and the runs a turn costs: a push that cannot change the verdict costs no browser run and the self-review comes before the push (S604); the tests that move a shared value leave the split lanes (INC-1136) and the split lanes run two workers again by a new decision (DEC-378); a run's fixed start-up is measured step by step and cut by a frozen rule; the redaction rule's end (INC-1138), the GO checker's list law and the stale texts. Base: dev 3e3a51a89 (a NEW lane `cursor/ci-time` from origin/dev AFTER pull request #39 merges — its tip; its own pull request into dev, a draft from the first push, ready at the end).

Stem: `ci-time` (brief `docs/governance/briefs/ci-time.md` (new); report `docs/governance/reports/ci-time.report.md` (new)). Tier B (the CI workflows, the lane plan and the e2e tree's fixtures; the workers knob of the harness under DEC-378; no app code, no database change). FLAGS: no-migration, no-new-string, no-package-change. `AGENTS.md` changes in its CI line only. PLAN FIRST for Parts B and C: STEP 1 is a census and a plan; Parts A and D are built before the stop, Parts B and C after ruling 1.

PREVENTION (G70 — why this turn exists). The operator, 2026-11-12 and 2026-11-13: a run takes too long and a turn costs too many runs. Measured, not estimated:
(1) The app-fixes turn cost four full runs (ci-evidence, the lane's status history: the task-saved push, the parts, ruling 2's commit, the self-review's fix). Two were avoidable by rule: the push of the saved task alone (the task-saved commit differs from dev's proven tree only by one line of the brief allowlist), and a fix found by the self-review AFTER the push (S604 — DEC-374's order, the supervisor's design).
(2) A full run at one worker takes 19.1 minutes from push to result (run 43463527584); at two workers it took 13.8 (run 43457682073), and that run was red for one cause — a test's scratch row moved a value another test read (INC-1136). The class: a scratch row that changes a value rows it did not create carry (G27's class).
(3) Each lane spends 226 seconds before its first test (run 43463527584: image load 64, backend start 75), and the last lanes start about three minutes late — HYPOTHESIS: the account's limit of concurrent jobs; the census reads the jobs' created and started times.
Repository: this turn. Cursor rules: rule 00's order, rule 20's J8 line (Part A). Instructions: v1.18 — the supervisor's GO asks for no push at STEP 0. Knowledge: not needed.

THE SYSTEM (G0) — concern 1 of 4
CONCERN: a push that cannot change the browser tests' verdict runs no browser lane, and a turn pushes its code once.
MECHANISM: `isRecord` (`scripts/ci/docs-only.ts` :43) — the paths set aside when a push's code tree is compared with a proven tree (DEC-365, DEC-375 a); the executor's order of steps in `.cursor/rules/00-protocol.mdc` (steps 6 → 10; DEC-374), pinned by CF-RULES-1 (`scripts/conformance/rules.test.ts`).
CONSUMERS: the census lists every reader of `scripts/conformance/briefs-allowlist.txt` (`rg -n "briefs-allowlist" scripts .github src e2e package.json`) with the CI job that runs it, and every text that states the order of the gate, the self-review and the push (`rg -n "self-review|SELF-REVIEW" .cursor AGENTS.md docs/governance/go-template.md scripts/conformance`).
COVERED HERE: Part A. Laws:
- The brief allowlist is set aside in the tree comparison exactly like a record, IF the census shows that every reader of it runs in a job a proven-tree run still runs and that no lane and no first-download step reads it. If one does, nothing is set aside: name it in §10 and go on.
- No other path joins the set. A planted tree that differs from a proven one in any other file under `scripts/` is not proven.
- Rule 00: the self-review (step 8) runs BEFORE the push. A fix it makes is followed by the checks that fix can affect (typecheck, lint, the touched unit tests, the scripts laws), then the push. The report is written while CI runs. The gate (step 6) still runs once, whole, before the self-review.
- Rule 00, step 4: the first-download check belongs to the gate. A ceiling's change lands in the commit of the part that causes it when the cause is known, otherwise in one ceilings commit before the push, named in §10. (This replaces the app-fixes turn's ruling 2 item 3; a build before every `src/` commit costs more than it saves.)
- Rule 20: `@global-state` (`.cursor/rules/20-tests.mdc` :31) reads as the lane plan now has it: the serial lane, on every push.
- `docs/governance/go-template.md`: STEP 0 is committed and not pushed by itself; the first push is a stop's or the final one, and the draft pull request opens with it.
LEFT: none.
CONFORMANCE GUARD: the next id of the CF-DOCS family in `scripts/ci/docs-only.test.ts` — a tree that differs only in the brief allowlist is proven; one that differs in another conformance file is not. CF-RULES-1 extended: every file that states the order has the self-review before the push; the old sentence is named and refused.
EXCEPTIONS: none.
FIVE LENSES — security: a skipped lane is skipped only for a tree whose code was proven green; the promote job's standard is not changed; nothing is skipped on dev that was not proven · performance: two full runs fewer in a turn with one stop · failure modes: the lookup fails toward testing, as today · consistency: one order in every rule file, pinned · future growth: a second executor reads the same order from AGENTS.md.
FORWARD-SCAN: the Lovable return (a turn judged by one run per pull request). REGISTER: the docs-only row gains the brief allowlist; the pre-push gate's row gains the order.

THE SYSTEM (G0) — concern 2 of 4
CONCERN: tests that share a backend never change a value another test or a seeded row carries; then a split lane runs two workers.
MECHANISM: `SERIAL_TAGS` (`scripts/ci/lane-plan.ts` :27) — a test tagged for the serial lane runs alone there on every push; `E2E_WORKERS` (`.github/workflows/local-backend-proof.yml` :179; the ledger's newest decision for it is DEC-230; DEC-376, recorded in the speed turn's report, returned it to one by its own rule "until a new decision on new evidence") read by `workers` (`playwright.config.ts` :49); `LANE_WORKERS` (`scripts/conformance/lanes.test.ts` :316).
CONSUMERS, by the concern's definition — every test of the split lanes whose rows, written through any client or helper, change a value that rows it did not create carry:
- a table where a trigger or a function rewrites other rows on a write (a rank rebuild, a counter, a "the one default" rule) — read from the catalogue of the local proof stack or from `supabase/migrations/`, never from memory;
- a singleton, a setting, a switch or a dial every caller reads (market settings, feature and AI switches, dials, languages, the legal versions in force, the level and reach catalogue);
- a reference row a public list shows unfiltered where another test asserts a count or a position.
Known instances: `MON-16` and `MON-17` (`e2e/admin-monetisation.spec.ts`) seed a level at the first sort position, `level_ranks_rebuild()` renumbers every level, and `ATR-1` (`e2e/admin-listings.spec.ts`) read another rank (run 43457682073, lane ten).
COVERED HERE: Part B. Laws:
- Each instance is fixed at its root when the moved value is not the thing under test: the fixture is placed, keyed or scoped so no shared value moves. Otherwise the test carries `@global-state` and runs in the serial lane. No assertion is loosened, no timeout raised, no retry added (G38).
- A real reference row is never a fixture (G27).
- Then the lanes the plan splits run two workers; every other lane keeps one. Every text that states the count changes in the same commit (the census lists them: the workflow's comment, the configuration's comment, CF-LANES-3, the CI line of `AGENTS.md`, the guides).
- The serial lane's time is reported before and after; the repeat lane's budget stays the slowest planned lane.
LEFT: what the census finds and Part B cannot fix by these laws — each with its INC line in §14.
CONFORMANCE GUARD: the next id of the CF-LANES family — a manifest of the shared-value tables (`scripts/conformance/shared-value-tables.txt` (new), each line a table and why its rows are shared) and a census of the spec files that write to one outside the serial tags; an untagged writer fails unless its allowlist line carries a reason and an expiry; proven on a planted writer. The plan names how a write is recognised (the service client's calls and the helpers that wrap them).
EXCEPTIONS: the allowlist's lines, each with its reason and expiry.
FIVE LENSES — security: none changed; the lanes run on throwaway backends · performance: measured gain 5.3 minutes a run (19.1 → 13.8) · failure modes: DEC-378's judge below returns the knob to one by rule, before diagnosis · consistency: every split lane the same count, pinned by CF-LANES-3 · future growth: a new shared table is one manifest line.
FORWARD-SCAN: the market pack (more settings rows per market), P-3 credits (ledger rows). REGISTER: the lanes row gains "two workers on the split lanes (DEC-378)"; a new row — "a scratch row moves no shared value" → the manifest and the serial tag → the census → exceptions: its allowlist.

THE SYSTEM (G0) — concern 3 of 4
CONCERN: a run does identical work once, and no lane waits for a runner behind work that could wait.
MECHANISM: the lane's recorded clocks in `.github/workflows/local-backend-proof.yml` (checkout, install, CLI, images, backend, build, browser — written into each lane's evidence on ci-evidence), the images' cache (DEC-309), the job graph of `.github/workflows/ci.yml`.
CONSUMERS: the census measures, from this turn's own first full run (the stop's push) and from the newest proven-tree run on dev: for every job its wait (created → started) and its length; for one median split lane every recorded clock and the test seconds; which job ends last on a proven-tree run. Every reader of a job's name is listed (the status reporter, the guards evidence, the checks runner that reads the jobs of `ci.yml`, `scripts/conformance/wired.test.ts`, the guides).
COVERED HERE: Part C, by this frozen rule (DEC-378 c). A cut is built only when all four hold:
- the work is identical across jobs of one run (same inputs by hash: the E2E app's build, an install, a browser install, an image load), or it is a job that can start after the lanes without changing any verdict;
- the plan's measured saving is at least thirty seconds a lane, or at least one minute of a run's push-to-result, net of the hand-over's own cost;
- no evidence line is lost: every reader of a changed job name or step moves in the same commit and its test is green;
- every job and every outside call keeps a deadline (CF-CID-1).
After the build, the final run is read: a cut that saved less than half its plan is reverted in the same turn and named in §10.
LEFT: a cut the rule refuses or the ruling defers — its roadmap line in §14.
CONFORMANCE GUARD: the existing CF-CID and CF-LANES laws; a new one only if a cut adds a shared artifact (its producer and every consumer named, the lanes failing loudly when it is missing).
EXCEPTIONS: none.
FIVE LENSES — security: an artifact handed between jobs of one run holds no secret; the lanes still use no secret · performance: the census's table is the plan · failure modes: a missing or stale shared artifact fails the lane with its name, never falls back silently to a different build · consistency: every lane starts the same way · future growth: more lanes cost test time only.
FORWARD-SCAN: CI's cost once the repository is private (minutes, not only time). REGISTER: the lanes row gains the cuts kept.

THE SYSTEM (G0) — concern 4 of 4
CONCERN: a guard's own texts and patterns say what the code does.
MECHANISM: the JWT rule's `pattern` (`scripts/ci/redaction-rules.json` :21), read by `scripts/ci/redact.py` and its test; the GO laws in `scripts/brief/go-laws.ts`.
COVERED HERE: Part D.
- INC-1138: the JWT rule ends in a word boundary, so a token whose last character is `-` keeps that character and CF-REDACT-1 fails about once in sixty-four runs. The rule ends where no token character follows; both readers accept the form; the test plants a token ending in `-` and one ending in `_`.
- The GO checker's list law (S603), the next id of the CF-BRIEF family: a brief that cites an allowlist or a manifest under `scripts/conformance/` also cites a test that reads it by name. Self-tested on a planted brief; this brief is its first subject.
- The four comments in `.github/workflows/ci.yml` that still say "docs-only push" where the scope job now means a proven tree (`rg -n "docs-only push" .github/workflows/ci.yml`) say what it means.
LEFT: INC-1139, INC-1111, INC-1132, INC-1133 — the e2e leftovers turn.
CONFORMANCE GUARD: CF-REDACT-1 with the planted tokens; the CF-BRIEF law's self-test.
EXCEPTIONS: none.
FIVE LENSES — security: the redaction masks the whole token · performance: none · failure modes: a red one run in sixty-four ends · consistency: one rule set for both readers · future growth: none.
FORWARD-SCAN: none. REGISTER: the redaction row and the GO checker's row gain these lines.

SCOPE, by area (the plan narrows it to files; each source file with its own tests): `.github/workflows/`; `scripts/ci/` and `scripts/conformance/` and `scripts/brief/` with their tests, allowlists and manifests; `e2e/` (the spec files the census names and the helpers they use); `.cursor/rules/`; the CI line of `AGENTS.md`; the workers knob and its comment in the repository's Playwright configuration, whose law is `scripts/conformance/lanes.test.ts`; `docs/governance/go-template.md`; `docs/features/` (the CI and harness guides); `roadmap.md` line 3 and the lines this brief dictates; the turn's own brief, rulings and reports. Read only: `src/`, `supabase/`. Never: a path rule 00 forbids.

THE TURN, IN THIS ORDER
STEP 0 — after pull request #39 is merged: `git fetch origin && git switch -c cursor/ci-time origin/dev` (print the head; it must contain that merge). `git status --short` is empty. Save this brief byte for byte as `docs/governance/briefs/ci-time.md` (scripted copy, one fenced block, four backticks; sha256 equal to the value after END BRIEF). Roadmap line 3: `The brief in force: docs/governance/briefs/ci-time.md (the CI turn — no browser run for a push that cannot change the verdict, the self-review before the push, the shared-value tests out of the split lanes and two workers (DEC-378), a run's start-up cut by rule). Previous: ` followed by the line as it stands after "The brief in force: ". Remove from `scripts/conformance/briefs-allowlist.txt` every line keyed to another brief. Run `bun scripts/brief/check-go.ts docs/governance/briefs/ci-time.md` and paste its output; `bunx prettier --check roadmap.md`. Commit `ci-time: task saved`. Do NOT push yet.
STEP 1 — THE CENSUS AND THE PLAN, into `docs/governance/reports/ci-time.stop-1.md` (new). Answer every item by its key word, or "CENSUS-ITEM <key>: not applicable — <why>".
- consumers — concern 1's two greps; concern 2's instances by its definition, each with its table, the value it moves, and "root fix (how)" or "serial tag (why the value is the thing under test)"; concern 3's readers of job names.
- definition — concern 2's instances by the definition against a grep of the service client's writes; the difference listed.
- tests — each changed file's own tests by their real names; the next id of each family the turn adds to.
- lists — `wired.test.ts`, the allowlists and manifests under `scripts/conformance/` with the test that reads each, the lane plan's weights, the register.
- old-file-readers — every guide, comment and rule that states the worker count, the order of the self-review and the push, or "docs-only" for a proven tree.
- second-readers — every reader of a job name or a step name Part C would change.
- chunk-graph — not applicable unless a cut moves the E2E app's build; then the lanes' build inputs, by hash, lane against lane.
- environments — the runner image, the account's limit of concurrent jobs (cite the vendor's page read, or the jobs' created and started times as the evidence), the lanes that run WebKit.
- mechanisms — `docs-only.ts`, `lane-plan.ts`, the images' cache, the lane's clocks, each read whole.
- first-download — not applicable — no file under `src/` changes.
- premises — every premise of this GO the census finds wrong; the three numbers of PREVENTION (2) and (3) re-read from ci-evidence.
- findings — beyond the task, file:line; a security hole is a STOP at once, described in the chat only (G51).
The plan, in the same file: for Part B, the instance table and the manifest's first lines; for Part C, the measured table and each proposed cut with its saving, its hand-over cost and the readers it moves, marked "meets the rule" or "refused by the rule (which clause)".
STEP 2 — Part A (concern 1). Commit `ci-time part A: the brief allowlist set aside; review before push`.
STEP 3 — Part D (concern 4). Commit `ci-time part D: the JWT rule's end, the list law, stale comments`.
STEP 4 — `bun run typecheck`; `bun run lint`; `bunx vitest run scripts --maxWorkers=2`; commit the census (`ci-time: stop 1 — the census and the plan`); push; open the draft pull request into dev (`gh pr create --draft --base dev`, title `ci-time: fewer runs a turn, two workers, a shorter start-up`); STOP per rule 00. This push's run is a full run by design: it proves Parts A and D and is concern 3's measurement; add its numbers to the census file in the ruling's first commit.
STEP 5 — after ruling 1: Part B, in two commits — `ci-time part B: no scratch row moves a shared value` (the fixes, the tags, the manifest and its guard), then `ci-time part B: two workers on the split lanes (DEC-378)`.
STEP 6 — Part C: the cuts ruling 1 approves, one commit a cut.
STEP 7 — the gate (rule 00 as Part A leaves it): `bun run typecheck`; `bun run lint`; the touched files' unit tests; `bun run checks` (its fast line and its last line pasted); the test ids Part B changes, by `--grep`, in both Chromium projects at two workers through `bun run e2e:local` when the E2E values are set; `actionlint -shellcheck= -pyflakes=` on the changed workflows where the machine can run it; `bun scripts/brief/check-go.ts docs/governance/briefs/ci-time.md --at <the commit STEP 0 began from>` (its output pasted). Then the self-review, BEFORE the push.
STEP 8 — push ONCE; `gh pr checks <number> --watch --interval 60`; read the run under this lane's folder on ci-evidence. Handle what it shows by the TOLERANCES, in at most one further code commit.
STEP 9 — the report, rule 60's fourteen headings; §5 carries the run's times before and after (push to result; the slowest lane; one median lane's clocks; every job's wait); §14 Records word for word; the report push changes records only.

DECIDE-AND-NAME (the laws answer these; name each under §10 and go on): root fix or serial tag for each instance, by concern 2's first law; how a write to a shared-value table is recognised by the guard; whether a helper that wraps the write is the unit; the exact sentence of each rule file; whether the brief allowlist can be set aside (concern 1's first law); the form of the JWT rule's end that both readers accept; which guide lines change. A new instance of concern 2 found after ruling 1 is handled by the same law without a stop. A cut that needs a file outside SCOPE, or a change to what a job proves, is a STOP.

RECORDS (word for word into §14; the executor fills the bracketed parts)
DEC-378 (the supervisor's decision under G17 and G22, put to the operator in the reply that carried this brief; his paste approves it) — (a) the lanes the plan splits run two workers, after every test that moves a shared value was fixed at its root or moved to the serial lane (INC-1136). Frozen judge: over this turn's judged run and the next four full runs of ci.yml on any ref, a test that fails, or passes only on a retry, for a cause in another test's rows on the same backend returns `E2E_WORKERS` to one in the next commit, with its INC, and no further exception until a new decision; none in five → adopted. And the judged run's push-to-result is at least three minutes under 19.1 minutes (run 43463527584), or the knob returns to one as not worth its risk [the judged run <id>: <minutes>]. (b) The brief allowlist is set aside in the proven-tree comparison [yes | no — the reader that forbids it]. (c) A cut to a run's fixed time is built only by the four-clause rule of this brief and kept only when it saved at least half its plan [each cut: planned → measured, kept | reverted].
INC-1136 — global state in lane tests (MON-16, MON-17 → every level's rank; ATR-1): [each instance the census found: test id, table, the value moved, root fix | serial tag]; the manifest and its guard; the CI turn; [FIXED <commit> | the instances LEFT].
INC-1138 — the redaction's JWT rule ended in a word boundary and left a token's last `-` unmasked (CF-REDACT-1 red about once in sixty-four runs); fix: the rule ends where no token character follows; the CI turn; FIXED [commit].
S604's rule — the executor's self-review runs before the push; a ceiling's change lands with its cause or in one commit before the push; a task-saved commit is not pushed alone (rule 00, the GO template; CF-RULES-1).
register rows (unnumbered) — as the four REGISTER lines above.
changelog — 2026-11-1x the CI turn (Opus 5.5): a push that cannot change the verdict runs no browser lane; the self-review before the push; no scratch row moves a shared value, and the split lanes run two workers (DEC-378); [the cuts kept]; the JWT rule's end; the GO checker's list law.
roadmap — [one line for each instance or cut LEFT].

TOLERANCES (G60), by defect. A red is a STOP only when its failure names a path this turn changed and its cause is not one this brief's rules already handle. A red at two workers for a cause in another test's rows is handled by concern 2's law when the fix is a fixture or a tag (one further commit); when it is not, DEC-378's judge applies at once: the knob returns to one in that commit, the turn goes on, and the INC is named in §14 — not a stop. A transport failure (a 5xx from the platform, a runner lost) is named under Limits and re-run once from the failed jobs. A local failure is fixed at its cause, never retried or loosened.

FINDINGS (G64): anything major you meet beyond this task goes in §13 with file:line; a security hole is a STOP at once, described in the chat only, never in a committed file (G51).

LIMITS TO STATE. The supervisor read the tree of pull request #39's head with `rg` and git and has no access to the platform's API: the jobs' waits, the lanes' clocks and the account's concurrency limit are the census's to read, and PREVENTION (3)'s cause is a hypothesis until they are. The supervisor did not enumerate concern 2's instances beyond the known three; the definition is the scope. What this machine cannot run (actionlint, gitleaks on darwin) is named, and CI is then the proof.
````
