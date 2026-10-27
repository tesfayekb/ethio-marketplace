# Foundations — records turn R5: the fix of turn 34e's first run (a package install runs once; the browser install's deadlines measured — INC-943, DEC-276), then the handover — instructions v1.15, the handoff and the running record, INC-941 → INC-944, S455, S456, block S78 and the owed roadmap lines (G41, G53): brief (saved unchanged, 2026-10-27)

```text
FOUNDATIONS — RECORDS TURN R5 (2026-10-27; INC-943, DEC-276; G41, G53; anchors located at a308c6b37bcced92f89d7d0f367adc7fe476d224). THE FIX FIRST (§8: on a red board the fix and the next task go out as one turn, the fix first). Turn 34e's first run (40519893778 on BASE) lost lanes 3, 5 and 12 to its own deadline: `bunx playwright install --with-deps chromium` ran past 300 s on its first try and failed at once on its second (`ci-deadline … failed with exit 1 on try 2 of 2`). The supervisor set that 300 s without measuring (S456). Measured since from the Actions API over 371 lane runs: the install takes 14 s at the median, 582 s at the 90th percentile, 809 s at the 99th and 895 s at most; 66 of the 371 ran past 300 s and passed slowly before turn 34e. A package install cut off part-way leaves the system's package manager interrupted, so its retry cannot succeed. So each browser install becomes two steps — the system libraries (`bunx playwright install-deps chromium`) once with 1500 s, then the browser download (`bunx playwright install chromium`) 900 s a try with one retry — in all five installs; the certificate tools' `apt-get install` runs once (600 s; `apt-get update` keeps its retry, 600 s); and CF-CID-1 gains a fifth rule — a package install runs with one try — with its planted breach in CF-CID-2, red first on BASE (six findings). (Lane 7's failure on the same run — a deadlock in the backend's start — is unrelated to turn 34e's change and is recorded, not changed here: INC-944.) THEN THE HANDOVER of the supervisor's thread to a fresh one, which reads only the repository (G53: the stop point is "every record in the repository"). Records turns R1–R4 brought the ledgers level with the supervisor's running record; this turn lands what the handover adds: the supervisor's instructions v1.15 (v1.14 with 57 recorded moves and the rules G56–G59; delivered for installation — v1.14 governs until the operator installs it), its amendment record with the moved text word for word, slips S455 and S456, the handoff, the running record of 2026-10-23 → 2026-10-27, INC-941 → INC-944 with the later word on INC-940 and INC-935, DEC-276 in block S78, system-state.md's position, block S78 and the roadmap's owed lines (turn 34e ticked). This brief and two of its files are too long for a message and arrive ATTACHED to it, each copied by `cp` and proven by its sha256; every other change is a FILE or EDIT block below, applied by the block applier. Tier B (CI tooling: four workflows, one census, the wrapper's comment) + Tier C (records). No migration. No string. No package change. No product file. AGENTS.md unchanged. No file deleted. Base: dev a308c6b37bcced92f89d7d0f367adc7fe476d224 (turn 34e's landing; CI FAILURE on a308c6b3 (run 40519893778, 14:41:16Z): every test that ran passed (1,715 passed, 0 failed; 1 flaky, PW-30); lanes 3, 5 and 12 lost to the Chromium install's 300 s deadline (Part B's fix) and lane 7 to a deadlock in its backend start (INC-944)). The executor is Lovable. ONE TURN. Parts, IN THIS ORDER: A — CI; STEP 0 (the brief, the two attachments, roadmap line 3); B — the fix, red first; C — the records, by the applier; THE CHECKS; THE COMPLETION REPORT; END THE TURN.
BASE: a308c6b37bcced92f89d7d0f367adc7fe476d224
FLAGS: no-migration, no-new-string, no-package-change, no-agents-change
SCOPE-BEGIN
.github/workflows/flake-check.yml
.github/workflows/guard-proof.yml
.github/workflows/local-backend-proof.yml
.github/workflows/nightly-e2e.yml
docs/governance/claude-supervisor-instructions-v1.15.md
docs/governance/handoffs/2026-10-27-foundations-handover.md
docs/governance/handoffs/2026-10-27-foundations-running-record.md
docs/governance/instructions-amendments.md
docs/governance/system-state.md
docs/spec/spec-ledger.md
docs/tracking/incidental-findings.md
scripts/ci/with-deadline.sh
scripts/conformance/ci-deadlines.test.ts
SCOPE-END

THE SYSTEM (G0) — two concerns, the fix first.
FIX — CONCERN: every CI job and every outside call carries a deadline, and a step is retried only when running it again is safe (register row 59; INC-935, INC-943). MECHANISM: scripts/ci/with-deadline.sh `<seconds> <tries> -- <command>` and the census CF-CID (scripts/conformance/ci-deadlines.test.ts), DEC-275 and DEC-276. CONSUMERS (every workflow at BASE, by the concern's definition — a package install inside the wrapper): the five browser installs (flake-check.yml :81, guard-proof.yml :43, nightly-e2e.yml :75 and :326, local-backend-proof.yml :527 — each `300 2 -- bunx playwright install --with-deps chromium`) and the certificate tools' `apt-get install` (local-backend-proof.yml, the certificate step at :300) — all six retried; every `bun install` (retry safe) and the certificate step's `apt-get update` (retry safe) stay. COVERED HERE: all six. LEFT: INC-941 (pip, git's network commands and the downloading actions — a later CI turn). CONFORMANCE GUARD: CF-CID-1's fifth rule (a package install — `apt-get install`, `playwright install-deps`, `playwright install --with-deps` — runs with one try), red on BASE with six findings; CF-CID-2's planted workflow gains a kept one-try install and a retried breach. EXCEPTIONS: none. FIVE LENSES — security: none changed (the same commands, split) · performance: a healthy run unchanged (two steps of about 14 s together at the median); the slow tail passes again instead of failing at 300 s · failure modes: the subject — a hung download is cut at 900 s and tried once more; a hung package install is cut at 1500 s and fails its step, never repeated · consistency: one rule for every package install in every workflow · future growth: a new install is held by CF-CID-1. FORWARD-SCAN: none. REGISTER: row 59's mechanism and guard cells.
RECORDS — CONCERN: every decision, incident, slip, ruling, rule and queued item the supervisor holds is in the repository before its thread hands over, so a fresh thread parachutes into repository truth, never chat memory (G41, G46, G53).
MECHANISM: the records — docs/governance/instructions-amendments.md (a version's amendment, its moved text, §Slips), docs/governance/claude-supervisor-instructions-v1.N.md (each version whole), docs/governance/handoffs/ (the handoff and the running record), docs/tracking/incidental-findings.md, docs/spec/spec-ledger.md (block S78), docs/governance/system-state.md (the position) and roadmap.md (one line per queued item) — written by the block applier (scripts/brief/apply-blocks.sh, register row 58) and, for the two attached files, by `cp`, every file proven by the hash list.
CONSUMERS: the fresh supervisor thread's session-start ritual (§2: the handoff, system-state.md, the ledger's tail, the roadmap, the brief in force, the ci-evidence branch, the incident ledger's tail); the operator, who installs v1.15 from the repository's copy; every later brief's queue and numbers.
COVERED HERE: all of the above. LEFT: none for the handover; the owed roadmap lines are work for later turns, each with its line.
CONFORMANCE GUARD (records): none new — the import is proven by its hashes (`sha256sum -c` from the saved brief). docs/governance/ and docs/spec/ are outside Prettier (the ratified records land verbatim); docs/tracking/, roadmap.md and docs/_changelog.md are under it — their new lines are written in Prettier's form (the supervisor's run of the pinned Prettier 3.8.3 on the finished files: clean).
EXCEPTIONS (records): none.
FIVE LENSES (records) — security: the repository is public (G51): no key, token, e-mail address, message id or project reference appears in any new text (checked by script — the running record's platform identifiers are replaced by bracketed labels, its header says which); no incident names an unfixed hole beyond defence in depth (INC-939, INC-941) · performance: none (documents) · failure modes: an attachment that does not arrive or does not hash is a STOP before anything else is written · consistency: one record per kind, each continued, nothing rewritten · future growth: none.
FORWARD-SCAN (records): none. REGISTER: row 59 (the fix); the register's duplicate row 13 is an owed line.

STEP 0 — in this order, before anything else (the attachments are readable only in the turn they arrive):
1. Save this brief — the file foundations-records-r5.md ATTACHED to the carrying message — byte for byte as docs/governance/briefs/foundations-records-r5.md by `cp`, never retyped; paste its sha256sum and byte count (the carrying message states both; a difference is a STOP).
2. Copy the two other files ATTACHED to the carrying message, by `cp` (never opened in an editor, never retyped, never reformatted), to:
   - claude-supervisor-instructions-v1.15.md → docs/governance/claude-supervisor-instructions-v1.15.md (sha256 99081e8a1d1ceed5c701143af9451604dec7a3ca81f203375007f9afd8c39172, 108,681 bytes)
   - 2026-10-27-foundations-running-record.md → docs/governance/handoffs/2026-10-27-foundations-running-record.md (sha256 fbc1da4287c87ed999d357ad6d519a642a98a239b2553cd373d2f40306d9c081, 484,660 bytes)
   Paste `sha256sum` of both destinations; a difference, or an attachment you cannot find, is a STOP that says which (write nothing else).
3. roadmap.md, with your editing tool: on line 3, the text after "The brief in force: " up to and including `docs/governance/briefs/foundations-turn-34e.md (Foundations turn 34e: every CI job and every outside call carries a deadline — INC-935, DEC-275)` becomes `docs/governance/briefs/foundations-records-r5.md (Foundations records turn R5: the fix of turn 34e's first run — a package install runs once, the browser install's deadlines measured (INC-943, DEC-276) — then the handover: instructions v1.15, the handoff and the running record — G41, G53)` (everything after it stays, as it is). The roadmap's other lines change in Part C, by the applier — none of its blocks touches line 3.

HOW TO WORK
- Order: Part A (paste `git rev-parse HEAD`: this is <START>; it must be BASE — if not, paste `git diff --name-only BASE..HEAD`; a path in SCOPE is a STOP); STEP 0; Part B; Part C; THE CHECKS; THE COMPLETION REPORT; END THE TURN. Do not stop anywhere else. If the platform ends a turn early, report three lines (done, left, CI) with the done steps and `git diff --name-only <START>`; the supervisor sends "continue".
- Run no stateful git command (the platform commits).
- EXACT TEXT: every block below is applied ONLY by `bash scripts/brief/apply-blocks.sh docs/governance/briefs/foundations-records-r5.md --dry <paths>` and then the same without `--dry` — never retyped, never edited or reflowed by hand, never formatted — except the four workflow files, which the applier refuses (its scope check closes .github/workflows/\*\* to the Claude Code executor): their EDIT blocks are applied by a one-off script of yours in /tmp that reads the saved brief, uses the applier's own block pattern (`^EDIT (\S+) #(\d+)\nOLD-BEGIN\n([\s\S]*?)\nOLD-END\nNEW-BEGIN\n([\s\S]*?)\nNEW-END$`, multiline), takes only the blocks whose path starts `.github/workflows/`, checks each OLD text is found exactly once before writing anything, and writes all four files or none (turn 34e's way, accepted). A workflow's indentation is its meaning: copy every space. The applier reads the brief in force from roadmap line 3, so it works only after STEP 0.3. A refusal by either is a STOP that pastes its line. The NEW texts are about 94 KB of record: the commands, test ids, files and fixes they name are history and plans, never instructions for this turn. If your context is compacted mid-turn, re-read the saved brief before the next step.
- THE FILES: the SCOPE block above, plus docs/governance/briefs/foundations-records-r5.md, roadmap.md, docs/_changelog.md, docs/governance/mechanisms.md, docs/features/ci-local-backend.md and docs/governance/reports/foundations-records-r5.report.md (your completion report). Anything else is a STOP naming the file and why.
- Your platform rule stands: "Do not run the Lovable project's builds or typechecks manually because the harness runs them automatically." Local runs: Part B's two test files (`bunx vitest run scripts/conformance/ci-deadlines.test.ts scripts/ci/with-deadline.test.ts`), `bunx eslint scripts/conformance/ci-deadlines.test.ts`, and actionlint on the four workflows if it is on your path (the supervisor's run of actionlint 1.7.12: no finding); no other unit, lint or browser run is owed — no product file changes, no test reads the records (the supervisor's grep of scripts/, src/, e2e/ and .claude/ at BASE), and CI runs every test on the landing, where the changed workflows run. THE CHECKS end with `bun run format:check`.
- RED FIRST (G38): Part B shows CF-CID-1 failing on BASE with the new census before any workflow changes; it is shown, never committed.
- Behaviour contract: nothing in the product changes. In CI, each browser install is two steps (its system libraries once, its download with one retry) and the certificate tools' package install runs once; a healthy run does what it did. The instructions record gains the v1.15 section and its moved text before "## Slips", and S455, S456 and one also-logged line at its end; the incident ledger gains INC-941 → INC-944 and one later-word paragraph before its numbering line, which becomes INC-945; the spec ledger gains block S78 at its end; system-state.md's standing reads name v1.15 and the evidence branch, and its new position stands above R3's, marked superseded; the roadmap's line 3 names this brief, turn 34e is ticked with its run, records turn R5's line follows it, INC-938's line gains the applier's two MINORs, the owed lines follow INC-939's; the changelog gains R5's entry; register row 59 and the lanes' feature page say the fifth rule; two new files arrive by `cp`, one by FILE block.
- Knowledge K: K1 the census is the supervisor's (its running record read whole); K2 the report lists any S455 or S456 already in §Slips, any INC-941 → INC-944 heading already in the ledger, any package install inside the wrapper with more than one try that CF-CID-1 does not name (expected: none) and any "S78 ·" line already in the spec ledger (expected: none — `grep -c '^- S45[56] ' docs/governance/instructions-amendments.md`, `grep -c '^## INC-94[1-4] ' docs/tracking/incidental-findings.md`, `grep -c '^S78 · ' docs/spec/spec-ledger.md` each print 0 at <START>); K3–K6 do not arise.
- If any rule of yours conflicts with this text, STOP before saving and quote that rule's exact words in the report.

PART A — CI FIRST.
A1. Read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md, e2e-last-failure.md and guards-last-failure.md at the same address; paste the first six lines of the first (expected: FAILURE on a308c6b3 (run 40519893778, 14:41:16Z): every test that ran passed (1,715 passed, 0 failed; 1 flaky, PW-30); lanes 3, 5 and 12 lost to the Chromium install's 300 s deadline (Part B's fix) and lane 7 to a deadlock in its backend start (INC-944)). That red is this turn's subject — lanes 3, 5 and 12 are Part B's fix, lane 7 is INC-944 (recorded, not changed here); any OTHER failing job or test in the evidence is a STOP that names it.

PART B — THE FIX, RED FIRST.
B1. `bash scripts/brief/apply-blocks.sh docs/governance/briefs/foundations-records-r5.md scripts/conformance/ci-deadlines.test.ts`, then `bunx vitest run scripts/conformance/ci-deadlines.test.ts` — RED, shown and not committed: paste the totals and the findings' file:line (the supervisor's run on BASE: `Tests  1 failed | 1 passed (2)` — CF-CID-1 with six findings, "a package install retried (2 tries; it runs once)": flake-check.yml:81, guard-proof.yml:43, local-backend-proof.yml:300, local-backend-proof.yml:527, nightly-e2e.yml:75, nightly-e2e.yml:326).
B2. The four workflows' EDIT blocks by your one-off script (HOW TO WORK); then `bash scripts/brief/apply-blocks.sh docs/governance/briefs/foundations-records-r5.md --dry scripts/ci/with-deadline.sh docs/governance/mechanisms.md docs/features/ci-local-backend.md` and the same without `--dry`; then `bunx vitest run scripts/conformance/ci-deadlines.test.ts scripts/ci/with-deadline.test.ts` — paste the totals (the supervisor's run: 2 files, 6 tests, all passed), `bunx eslint scripts/conformance/ci-deadlines.test.ts` (clean) and actionlint's last line or why it did not run.

PART C — THE RECORDS, BY THE APPLIER.
C1. `bash scripts/brief/apply-blocks.sh docs/governance/briefs/foundations-records-r5.md --dry docs/governance/instructions-amendments.md docs/tracking/incidental-findings.md docs/spec/spec-ledger.md docs/governance/system-state.md docs/governance/handoffs/2026-10-27-foundations-handover.md roadmap.md docs/_changelog.md`, then the same without `--dry`; paste the output (expected: `EDIT docs/governance/instructions-amendments.md #1` · `EDIT docs/governance/instructions-amendments.md #2` · `EDIT docs/tracking/incidental-findings.md #1` · `EDIT docs/spec/spec-ledger.md #1` · `EDIT docs/governance/system-state.md #1` · `EDIT docs/governance/system-state.md #2` · `EDIT roadmap.md #1` · `EDIT roadmap.md #2` · `EDIT docs/_changelog.md #1` · `FILE docs/governance/handoffs/2026-10-27-foundations-handover.md (17243 bytes)` · `applied 10 block(s) to 7 file(s)`).
C2. `grep -c '^- S' docs/governance/instructions-amendments.md` — <START>'s count plus 2 (S455, S456); `grep -n '^## Claude supervisor instructions v1.15 \|^## Moved from the instructions at v1.15\|^## Slips\|^- S455 ' docs/governance/instructions-amendments.md | cut -c1-60` — four lines, in that order; `grep -n '^## INC-941 \|^## INC-944 \|^Numbering: next free INC-94' docs/tracking/incidental-findings.md | cut -c1-50` — three lines, in that order; `tail -1 docs/spec/spec-ledger.md`; `sed -n 3p roadmap.md | cut -c1-80` — names foundations-records-r5.md; paste all five.

THE CHECKS (in this order): `grep -E '^[0-9a-f]{64}  ' docs/governance/briefs/foundations-records-r5.md | sha256sum -c` — every line prints OK; `git diff <START> --stat -- src e2e supabase .claude AGENTS.md` (empty); `bun run format:check` last.
The hash list (the files as they stand at the end of the turn):
d1cb37591c2c81dc62c0306d70762a1a6ee038d3ae65cbfe4120ec187a7ad174  .github/workflows/flake-check.yml
ba2ca062f630f0fef81a1160a28e819db776d94ed3077bb4cc4d7ee658a36560  .github/workflows/guard-proof.yml
55bc618df1d0756c3c1f148bdb8f2007cb15faf8e44e954c7b9833d2eac23b48  .github/workflows/local-backend-proof.yml
b48b91698db2b4eb97b86428a77d803fd496865ab4373645901ff0ed58da0dea  .github/workflows/nightly-e2e.yml
0965eeeeae6dfcfa8cdc5f458606cd1329215d3c2aefdfcf3bbf46485db6d962  docs/_changelog.md
cc35f8d779c8ed2e1328a6cfe318d83f8e499ba85c1f1c47b68d4eb9949be5e1  docs/features/ci-local-backend.md
99081e8a1d1ceed5c701143af9451604dec7a3ca81f203375007f9afd8c39172  docs/governance/claude-supervisor-instructions-v1.15.md
69306e47da0357bc077713e2d8cb11de7fa4679a86d63eadce65edba93738b39  docs/governance/handoffs/2026-10-27-foundations-handover.md
fbc1da4287c87ed999d357ad6d519a642a98a239b2553cd373d2f40306d9c081  docs/governance/handoffs/2026-10-27-foundations-running-record.md
5ea11e89509e0ebecb6670bbd031c073090d8721bf19c991b69b1df7cdeb9d79  docs/governance/instructions-amendments.md
7d7dcd86792e30b980ba7541b5bfc551323792f6c67b991e808d19434d5d2bc2  docs/governance/mechanisms.md
d8ce49fbaef9816dfaab789d0a66dd70e74b7721a8c49f90370fa85cbda0d25c  docs/governance/system-state.md
a4f3ac94bd76c65cc013ab0a159b525df0f86f03197a62ea7a18c1fb8a058150  docs/spec/spec-ledger.md
897319b5b8cf115df2be25ff218c4c17e77e4cac2c0c8ec197b8fea16f0d8e89  docs/tracking/incidental-findings.md
8498e6dfd0f783e48e69c1bdfc5f33cb2aa3d7a99d33d914b48193357b707a79  roadmap.md
e31a158dcec6642fc23c05da6dbf188bc5fbebbbba58b6dc62db17e2993529bd  scripts/ci/with-deadline.sh
e2c383193b1d9a93c69226f42bc643635258ba991625dc7c15f7b10e54dc213a  scripts/conformance/ci-deadlines.test.ts

THE COMPLETION REPORT: docs/governance/reports/foundations-records-r5.report.md (and its summary in chat), carrying: done or not done by part and step; the file list from `git diff --name-only <START>` plus the new files; STEP 0's three hashes; B1's red totals and findings; B2's totals, eslint and actionlint lines; C1's and C2's output; the hash list's result; format:check's last line; the K2 lines; "none" for migrations, strings and product code; every departure with its reason; the first six lines of ci-status.md for the last commit you can read; every limit. END THE TURN; the supervisor reads the run.

Decisions made here (the supervisor's, under G17; listed for the operator as overridable): DEC-276 (INC-943's correction to DEC-275 — every deadline set from CI's measured step times with at least half again as margin, a retry only where re-running is safe; its judge: KEEP when, over the next 20 completed runs on dev, no install step fails by its deadline, otherwise its deadline set again from its measured times); the fix rides this records turn because it was the next Lovable turn already owed (no extra turn) and the workflows are closed to the Claude Code executor; lane 7's deadlock is recorded and not retried away (INC-944); INC-941's remainder waits for a later CI turn, whose deadlines are measured first; the running record is imported with its platform identifiers replaced by labels (G51), everything else word for word; v1.15 lands in the repository before the operator installs it, as v1.13 and v1.14 did; INC-942 is registered from block S77's records-owed list; the owed items become roadmap lines rather than wait for the turns that do them; this records turn runs on Lovable because the workflows are closed to the Claude Code executor and three of its files reach the executor only as attachments.

EDIT scripts/conformance/ci-deadlines.test.ts #1
OLD-BEGIN
 * ports from the kernel's ephemeral range (the four "address already in use" lanes of
 * 2026-10-24 → 10-26).
 */
OLD-END
NEW-BEGIN
 * ports from the kernel's ephemeral range (the four "address already in use" lanes of
 * 2026-10-24 → 10-26). And a package install (`apt-get install`, `playwright install-deps`,
 * `playwright install --with-deps`) runs ONCE: one cut off part-way leaves the system's package
 * manager interrupted, so its retry fails at once (lanes 3, 5 and 12 of run 40519893778 —
 * INC-943, DEC-276); downloads, `apt-get update` and `bun install` may be retried.
 */
NEW-END
EDIT scripts/conformance/ci-deadlines.test.ts #2
OLD-BEGIN
const WRAPPER = "scripts/ci/with-deadline.sh";
const RESERVE = "net.ipv4.ip_local_reserved_ports=54320-54329";
OLD-END
NEW-BEGIN
const WRAPPER = "scripts/ci/with-deadline.sh";
/** A package install: cut off part-way it is not safe to repeat, so it runs with one try (INC-943). */
const PACKAGE_INSTALL =
  /\b(?:apt-get install|playwright install-deps|playwright install --with-deps)\b/;
/** The wrapper's tries on a command line, or null when the line does not call it. */
function triesOf(line: string): number | null {
  const call = /with-deadline\.sh\s+\d+\s+(\d+)\s+--/.exec(line);
  return call ? Number(call[1]) : null;
}
const RESERVE = "net.ipv4.ip_local_reserved_ports=54320-54329";
NEW-END
EDIT scripts/conformance/ci-deadlines.test.ts #3
OLD-BEGIN

/** Every breach of the four rules in the given workflows. */
export function deadlineFindings(files: Array<{ file: string; text: string }>): Finding[] {
OLD-END
NEW-BEGIN

/** Every breach of the five rules in the given workflows. */
export function deadlineFindings(files: Array<{ file: string; text: string }>): Finding[] {
NEW-END
EDIT scripts/conformance/ci-deadlines.test.ts #4
OLD-BEGIN
          });
        for (const line of commands)
          if (INSTALL.test(line) && !line.includes(WRAPPER))
OLD-END
NEW-BEGIN
          });
        for (const line of commands) {
          if (INSTALL.test(line) && !line.includes(WRAPPER))
NEW-END
EDIT scripts/conformance/ci-deadlines.test.ts #5
OLD-BEGIN
            });
        if (commands.some((line) => /\bsupabase start\b/.test(line)) && !reserved)
OLD-END
NEW-BEGIN
            });
          const tries = triesOf(line);
          if (PACKAGE_INSTALL.test(line) && tries !== null && tries !== 1)
            findings.push({
              file,
              line: step.line,
              what: `a package install retried (${String(tries)} tries; it runs once): ${line.trim()}`,
            });
        }
        if (commands.some((line) => /\bsupabase start\b/.test(line)) && !reserved)
NEW-END
EDIT scripts/conformance/ci-deadlines.test.ts #6
OLD-BEGIN
describe("every CI job and every outside call carries a deadline (INC-935)", () => {
  it("CF-CID-1 every workflow's jobs, outside calls, installs and backend starts keep the four rules", () => {
    const jobs = workflows.flatMap(({ file, text }) => readWorkflow(file, text));
OLD-END
NEW-BEGIN
describe("every CI job and every outside call carries a deadline (INC-935)", () => {
  it("CF-CID-1 every workflow's jobs, outside calls, installs and backend starts keep the five rules", () => {
    const jobs = workflows.flatMap(({ file, text }) => readWorkflow(file, text));
NEW-END
EDIT scripts/conformance/ci-deadlines.test.ts #7
OLD-BEGIN

  it("CF-CID-2 a planted workflow's four breaches are named and its kept steps are not", () => {
    const dir = "node_modules/.cache/ci-deadlines";
OLD-END
NEW-BEGIN

  it("CF-CID-2 a planted workflow's five breaches are named and its kept steps are not", () => {
    const dir = "node_modules/.cache/ci-deadlines";
NEW-END
EDIT scripts/conformance/ci-deadlines.test.ts #8
OLD-BEGIN
          "        run: supabase start",
          "  bare:",
OLD-END
NEW-BEGIN
          "        run: supabase start",
          "      - name: Install the system libraries once",
          "        timeout-minutes: 27",
          `        run: bash ${WRAPPER} 1500 1 -- bunx playwright install-deps chromium`,
          "  bare:",
NEW-END
EDIT scripts/conformance/ci-deadlines.test.ts #9
OLD-BEGIN
          "          supabase start",
          "",
OLD-END
NEW-BEGIN
          "          supabase start",
          "      - name: Install the browser and its libraries twice",
          "        timeout-minutes: 12",
          `        run: bash ${WRAPPER} 300 2 -- bunx playwright install --with-deps chromium`,
          "",
NEW-END
EDIT scripts/conformance/ci-deadlines.test.ts #10
OLD-BEGIN
        [
          `${file}:19 job "bare" declares no timeout-minutes`,
          `${file}:22 a step that reaches outside declares no timeout-minutes`,
          `${file}:22 an install outside ${WRAPPER}: run: bun install --frozen-lockfile`,
          `${file}:24 the backend starts before its ports are reserved`,
        ].join("\n"),
OLD-END
NEW-BEGIN
        [
          `${file}:22 job "bare" declares no timeout-minutes`,
          `${file}:25 a step that reaches outside declares no timeout-minutes`,
          `${file}:25 an install outside ${WRAPPER}: run: bun install --frozen-lockfile`,
          `${file}:27 the backend starts before its ports are reserved`,
          `${file}:32 a package install retried (2 tries; it runs once): run: bash ${WRAPPER} 300 2 -- bunx playwright install --with-deps chromium`,
        ].join("\n"),
NEW-END
EDIT .github/workflows/flake-check.yml #1
OLD-BEGIN
          key: playwright-${{ runner.os }}-${{ steps.pw.outputs.version }}
      - name: Install Chromium
        timeout-minutes: 12
        run: bash scripts/ci/with-deadline.sh 300 2 -- bunx playwright install --with-deps chromium
      # DEC-018: E2E runs the PRODUCTION build in E2E mode. Each job builds its
OLD-END
NEW-BEGIN
          key: playwright-${{ runner.os }}-${{ steps.pw.outputs.version }}
      # INC-943 (DEC-276): measured over 371 lane runs, the combined install took 14 s at the median, 582 s at the
      # 90th percentile and 895 s at most. A package install cut off part-way cannot be repeated, so the system
      # libraries run once with 1500 s; the browser download may be repeated, 900 s a try.
      - name: Install Chromium's system libraries
        timeout-minutes: 27
        run: bash scripts/ci/with-deadline.sh 1500 1 -- bunx playwright install-deps chromium
      - name: Install Chromium
        timeout-minutes: 32
        run: bash scripts/ci/with-deadline.sh 900 2 -- bunx playwright install chromium
      # DEC-018: E2E runs the PRODUCTION build in E2E mode. Each job builds its
NEW-END
EDIT .github/workflows/guard-proof.yml #1
OLD-BEGIN
          key: playwright-${{ runner.os }}-${{ steps.pw.outputs.version }}
      - name: Install Chromium
        timeout-minutes: 12
        run: bash scripts/ci/with-deadline.sh 300 2 -- bunx playwright install --with-deps chromium

OLD-END
NEW-BEGIN
          key: playwright-${{ runner.os }}-${{ steps.pw.outputs.version }}
      # INC-943 (DEC-276): measured over 371 lane runs, the combined install took 14 s at the median, 582 s at the
      # 90th percentile and 895 s at most. A package install cut off part-way cannot be repeated, so the system
      # libraries run once with 1500 s; the browser download may be repeated, 900 s a try.
      - name: Install Chromium's system libraries
        timeout-minutes: 27
        run: bash scripts/ci/with-deadline.sh 1500 1 -- bunx playwright install-deps chromium
      - name: Install Chromium
        timeout-minutes: 32
        run: bash scripts/ci/with-deadline.sh 900 2 -- bunx playwright install chromium

NEW-END
EDIT .github/workflows/nightly-e2e.yml #1
OLD-BEGIN
          key: playwright-${{ runner.os }}-${{ steps.pw.outputs.version }}
      - name: Install Chromium
        timeout-minutes: 12
        run: bash scripts/ci/with-deadline.sh 300 2 -- bunx playwright install --with-deps chromium
      # DEC-018: E2E runs the PRODUCTION build in E2E mode. Each job builds its
OLD-END
NEW-BEGIN
          key: playwright-${{ runner.os }}-${{ steps.pw.outputs.version }}
      # INC-943 (DEC-276): measured over 371 lane runs, the combined install took 14 s at the median, 582 s at the
      # 90th percentile and 895 s at most. A package install cut off part-way cannot be repeated, so the system
      # libraries run once with 1500 s; the browser download may be repeated, 900 s a try.
      - name: Install Chromium's system libraries
        timeout-minutes: 27
        run: bash scripts/ci/with-deadline.sh 1500 1 -- bunx playwright install-deps chromium
      - name: Install Chromium
        timeout-minutes: 32
        run: bash scripts/ci/with-deadline.sh 900 2 -- bunx playwright install chromium
      # DEC-018: E2E runs the PRODUCTION build in E2E mode. Each job builds its
NEW-END
EDIT .github/workflows/nightly-e2e.yml #2
OLD-BEGIN
          key: playwright-${{ runner.os }}-${{ steps.pw.outputs.version }}
      - name: Install Chromium
        timeout-minutes: 12
        run: bash scripts/ci/with-deadline.sh 300 2 -- bunx playwright install --with-deps chromium
      - name: Build the app for the Cloudflare target (VITE_E2E=1)
OLD-END
NEW-BEGIN
          key: playwright-${{ runner.os }}-${{ steps.pw.outputs.version }}
      # INC-943 (DEC-276): measured over 371 lane runs, the combined install took 14 s at the median, 582 s at the
      # 90th percentile and 895 s at most. A package install cut off part-way cannot be repeated, so the system
      # libraries run once with 1500 s; the browser download may be repeated, 900 s a try.
      - name: Install Chromium's system libraries
        timeout-minutes: 27
        run: bash scripts/ci/with-deadline.sh 1500 1 -- bunx playwright install-deps chromium
      - name: Install Chromium
        timeout-minutes: 32
        run: bash scripts/ci/with-deadline.sh 900 2 -- bunx playwright install chromium
      - name: Build the app for the Cloudflare target (VITE_E2E=1)
NEW-END
EDIT .github/workflows/local-backend-proof.yml #1
OLD-BEGIN
          else
            bash scripts/ci/with-deadline.sh 180 2 -- sudo apt-get update > /dev/null
            bash scripts/ci/with-deadline.sh 180 2 -- sudo apt-get install -y libnss3-tools > /dev/null
            echo "certutil: installed" >> local-backend-status.txt
OLD-END
NEW-BEGIN
          else
            bash scripts/ci/with-deadline.sh 600 2 -- sudo apt-get update > /dev/null
            bash scripts/ci/with-deadline.sh 600 1 -- sudo apt-get install -y libnss3-tools > /dev/null
            echo "certutil: installed" >> local-backend-status.txt
NEW-END
EDIT .github/workflows/local-backend-proof.yml #2
OLD-BEGIN
          key: playwright-${{ runner.os }}-${{ steps.pw.outputs.version }}
      - name: Install Chromium
        timeout-minutes: 12
        run: bash scripts/ci/with-deadline.sh 300 2 -- bunx playwright install --with-deps chromium
      - name: Record browser seconds
OLD-END
NEW-BEGIN
          key: playwright-${{ runner.os }}-${{ steps.pw.outputs.version }}
      # INC-943 (DEC-276): measured over 371 lane runs, the combined install took 14 s at the median, 582 s at the
      # 90th percentile and 895 s at most. A package install cut off part-way cannot be repeated, so the system
      # libraries run once with 1500 s; the browser download may be repeated, 900 s a try.
      - name: Install Chromium's system libraries
        timeout-minutes: 27
        run: bash scripts/ci/with-deadline.sh 1500 1 -- bunx playwright install-deps chromium
      - name: Install Chromium
        timeout-minutes: 32
        run: bash scripts/ci/with-deadline.sh 900 2 -- bunx playwright install chromium
      - name: Record browser seconds
NEW-END
EDIT scripts/ci/with-deadline.sh #1
OLD-BEGIN
# Only for steps that can be run again safely (installs, downloads).
OLD-END
NEW-BEGIN
# A retry only for a command that can be run again safely (a download, `apt-get update`, `bun install`);
# a package install (`apt-get install`, `playwright install-deps`) runs with one try: cut off part-way it
# leaves the package manager interrupted and its retry fails at once (INC-943, DEC-276; CF-CID-1).
NEW-END
EDIT docs/governance/mechanisms.md #1
OLD-BEGIN
| 59 | Every CI job and every outside call carries a deadline: a step with none held a run for an hour (lane 16's browser install, run 40397087967) and a job with none runs to GitHub's 360 minutes; the temporary backend's fixed ports sit inside Linux's ephemeral range, so an outgoing connection could hold one (lanes 16, 8, 7, 10: "address already in use") (INC-935, DEC-275) | `scripts/ci/with-deadline.sh <seconds> <tries> -- <command>` (coreutils `timeout` on the command's process group; a failed or overdue try retried after 10 s as a `ci-retry` warning; the last try's code is the step's); `timeout-minutes` on every job (but the one that calls the lanes' reusable workflow) and on every step that reaches outside; the lanes' first step `sysctl net.ipv4.ip_local_reserved_ports=54320-54329`, and a failed start writes who held the ports into its evidence | `scripts/conformance/ci-deadlines.test.ts` (CF-CID-1: every workflow's jobs, outside calls, installs and backend starts; CF-CID-2: planted); `scripts/ci/with-deadline.test.ts` (WDL-1…4) | none — the nightly's 360 minutes is GitHub's own ceiling for its full serial suite (its length is the nightly's own concern) | a new workflow, job or install is named by CF-CID-1 until it carries its deadline | ci.yml, local-backend-proof.yml, nightly-e2e.yml, flake-check.yml, guard-proof.yml, feed-bench.yml, ci-status-report.yml, zap-baseline.yml since turn 34e; Foundations turn 34e |
OLD-END
NEW-BEGIN
| 59 | Every CI job and every outside call carries a deadline: a step with none held a run for an hour (lane 16's browser install, run 40397087967) and a job with none runs to GitHub's 360 minutes; the temporary backend's fixed ports sit inside Linux's ephemeral range, so an outgoing connection could hold one (lanes 16, 8, 7, 10: "address already in use") (INC-935, DEC-275) | `scripts/ci/with-deadline.sh <seconds> <tries> -- <command>` (coreutils `timeout` on the command's process group; a failed or overdue try retried after 10 s as a `ci-retry` warning; the last try's code is the step's; a package install runs once — INC-943, DEC-276); `timeout-minutes` on every job (but the one that calls the lanes' reusable workflow) and on every step that reaches outside; the lanes' first step `sysctl net.ipv4.ip_local_reserved_ports=54320-54329`, and a failed start writes who held the ports into its evidence | `scripts/conformance/ci-deadlines.test.ts` (CF-CID-1: every workflow's jobs, outside calls, installs, package installs run once and backend starts; CF-CID-2: planted); `scripts/ci/with-deadline.test.ts` (WDL-1…4) | none — the nightly's 360 minutes is GitHub's own ceiling for its full serial suite (its length is the nightly's own concern) | a new workflow, job or install is named by CF-CID-1 until it carries its deadline | ci.yml, local-backend-proof.yml, nightly-e2e.yml, flake-check.yml, guard-proof.yml, feed-bench.yml, ci-status-report.yml, zap-baseline.yml since turn 34e; Foundations turn 34e |
NEW-END
EDIT docs/features/ci-local-backend.md #1
OLD-BEGIN
Run 40397087967 (9eeb83cc) lost two lanes to the runner, not the code: lane 16's `Install Chromium` hung 58 minutes until the job's 60-minute timeout, and lane 10's `supabase start` failed — "failed to bind host port for 0.0.0.0:54324 … address already in use". The same start failure lost lanes 16, 8 and 7 on 2026-10-24 → 10-26 (ports 54324 and 54322): the CLI binds fixed host ports inside Linux's ephemeral range (32768–60999), so an outgoing connection made while its images download can already hold one. Each lane now reserves 54320–54329 from the ephemeral range in its first step (`net.ipv4.ip_local_reserved_ports`), before any connection is made, and a failed start writes who held the ports into the start log the evidence step reads. Every install (bun, the browser, the certificate tools) runs through `scripts/ci/with-deadline.sh` — a deadline per try and one retry, announced as a `ci-retry` warning so a retry is never silent — and every job and every step that reaches outside declares `timeout-minutes`. CF-CID-1 (scripts/conformance/ci-deadlines.test.ts) holds every workflow to these rules; WDL-1…4 hold the wrapper. DEC-275's judge: KEEP when, over the next 20 completed runs on dev, no lane fails its start by a port already in use and no step outruns its deadline unseen; a step that needs its retry in three or more of those runs is an incident (the retry hides a cause).
OLD-END
NEW-BEGIN
Run 40397087967 (9eeb83cc) lost two lanes to the runner, not the code: lane 16's `Install Chromium` hung 58 minutes until the job's 60-minute timeout, and lane 10's `supabase start` failed — "failed to bind host port for 0.0.0.0:54324 … address already in use". The same start failure lost lanes 16, 8 and 7 on 2026-10-24 → 10-26 (ports 54324 and 54322): the CLI binds fixed host ports inside Linux's ephemeral range (32768–60999), so an outgoing connection made while its images download can already hold one. Each lane now reserves 54320–54329 from the ephemeral range in its first step (`net.ipv4.ip_local_reserved_ports`), before any connection is made, and a failed start writes who held the ports into the start log the evidence step reads. Every install (bun, the browser, the certificate tools) runs through `scripts/ci/with-deadline.sh` — a deadline per try and one retry, announced as a `ci-retry` warning so a retry is never silent — and every job and every step that reaches outside declares `timeout-minutes`. CF-CID-1 (scripts/conformance/ci-deadlines.test.ts) holds every workflow to these rules; WDL-1…4 hold the wrapper. DEC-275's judge: KEEP when, over the next 20 completed runs on dev, no lane fails its start by a port already in use and no step outruns its deadline unseen; a step that needs its retry in three or more of those runs is an incident (the retry hides a cause).

## Records turn R5 — a package install runs once; the browser's download and libraries apart (INC-943, DEC-276)

Turn 34e's first run (40519893778, `a308c6b3`) lost lanes 3, 5 and 12 to its own deadline: `bunx playwright install --with-deps chromium` ran past 300 s on its first try and failed at once on its second (`ci-deadline … failed with exit 1 on try 2 of 2`). The 300 s was not measured. Measured afterwards over 371 lane runs (2026-10-25 → 10-27), the combined install took 14 s at the median, 582 s at the 90th percentile, 809 s at the 99th and 895 s at most — 66 of the 371 (18%) ran past 300 s, and passed slowly before turn 34e. A package install cut off part-way leaves the system's package manager interrupted, so its retry cannot succeed. Now each browser install is two steps: `bunx playwright install-deps chromium` (the system libraries) once with 1500 s, then `bunx playwright install chromium` (the browser, a download that may be repeated) with 900 s a try and one retry; the certificate tools' `apt-get install` runs once and `apt-get update` keeps its retry, both with 600 s. CF-CID-1 gains the fifth rule — a package install (`apt-get install`, `playwright install-deps`, `playwright install --with-deps`) runs with one try — and CF-CID-2 its planted breach. DEC-276: every deadline is set from CI's own measured step times (the maximum over at least 300 runs of the step, with at least half again as margin; the brief shows the median, the 99th percentile and the maximum), and a retry only where re-running is safe. Its judge: KEEP when, over the next 20 completed runs on dev, no install step fails by its deadline; when one does, its measured times are read and its deadline set again from them.
NEW-END
EDIT docs/governance/instructions-amendments.md #1
OLD-BEGIN

## Slips
OLD-END
NEW-BEGIN

## Claude supervisor instructions v1.15 — amendment (2026-10-27; delivered for installation)

The full v1.15 document lands in this repository at `docs/governance/claude-supervisor-instructions-v1.15.md` (108,681 bytes with its final newline; sha256 `99081e8a1d1ceed5c701143af9451604dec7a3ca81f203375007f9afd8c39172`); the operator installs it whole in the Project (§14: rulebooks are delivered whole). Until he does, v1.14 governs. Its header note:

"Version: v1.15 · 2026-10-27 · SUPERSEDES v1.14 (2026-10-23). v1.15 carries every rule of v1.14 and drops what is not a rule: wording a later addendum superseded, precedents, dated quotes and slip lists — each removed span is recorded word for word in docs/governance/instructions-amendments.md (§ v1.15, the moved text) and the Project keeps v1.14 whole (claude/claude-supervisor-instructions-v1.14.md). It installs the rules adopted since v1.14 as G56–G59 (the executors and their channels; checks and waits; briefs landed by the block applier; cost and quality) and corrects three facts: two executors write the repository (Lovable and the Claude Code executor), CI runs queue (DEC-181), and the live Knowledge is v3.11. Where v1.15 and v1.14 differ on a rule, v1.15 governs; G0 governs both."

Method (the operator's approval of 2026-10-27 07:43 local — the supervisor's proposal 5, "v1.15 instructions with a rule-by-rule proof"): v1.15 is v1.14 with 57 recorded moves — wording a later addendum superseded, precedents, dated quotes and slip lists taken out; three facts corrected (two executors; Knowledge v3.11; CI runs queue — DEC-181); the rules adopted since v1.14 installed as G56–G59 — each move listed below word for word, the v1.14 text and what stands in its place. The proof (the supervisor's script, in the Project doc claude/supervisor-tools-2026-10-27.md): every § and G header of v1.14 is in v1.15; every banned-pattern row is kept; and v1.14 with the 57 moves applied, each OLD text found exactly once, equals v1.15 byte for byte. v1.15 is 5% shorter than v1.14 (113,363 → 107,820 characters).

## Moved from the instructions at v1.15 — verbatim

Each entry: why it moved, then the v1.14 text, then what stands in its place in v1.15 ("—" when nothing).

### 1. header

v1.14:

> Version: v1.14 · 2026-10-23 · SUPERSEDES v1.13 (2026-10-05). Additive versioning: prior sections preserved verbatim across bumps; amendments append. The version history and header notes of v0.1 → v1.13 live in docs/governance/instructions-amendments.md and in the Project doc claude/claude-supervisor-instructions-v1.13.md; nothing of them is lost. v1.14 amendment (2026-10-23): the systems audit of 2026-10-23 (seven read-only studies at a413f952) and the operator's directive of the same day — "we should not just patch small fix, we should rather look at the bigger picture … a centralized system that will be much easier to maintain … even if that will take extra effort" — install §12's G0 SYSTEMS, NOT PATCHES as the overriding rule (G0.1–G0.10 and THE SYSTEM header every brief opens with), G54 (the route boundary, the AI gateway and the form kit — the first three mechanisms — and their interim laws), G55 (allowlists, censuses and guard wiring); §3's forward-scan gains the mechanism register; §4's scope, completion-report and pre-flight lines gain the K2 sibling list and the header checks; §6 DRIFT and §7 gain the rows "unrecorded bypass", "side effect before the authority", "hand-rolled boundary", "stand-in on a production path" and "model answer unparsed"; §1's canonical list gains docs/governance/mechanisms.md and docs/features/e2e-harness.md §Authoring laws; §8 gains the sixteen-lane addendum; §10 gains the harness-runs-builds addendum and "design them there"; §11's INC entries name the concern and the mechanism, and the slip record S1–S92 moves to the amendments record with a pointer; G19, G27 (afterEach), G29, G30, G38, G41, G52 gain addenda. Knowledge references advance to v3.11 (2026-10-23; A1, A6, A7 corrected; section J bound from docs/features/e2e-harness.md; section K ONE MECHANISM PER CONCERN added). Every rule of v1.13 stands; G0 governs where it differs.

v1.15: Version: v1.15 · 2026-10-27 · SUPERSEDES v1.14 (2026-10-23). v1.15 carries every rule of v1.14 and drops what is not a rule: wording a later addendum superseded, precedents, dated quotes and slip lists — each removed span is recorded word for word in docs/governance/instructions-amendments.md (§ v1.15, the moved text) and the Project keeps v1.14 whole (claude/claude-supervisor-instructions-v1.14.md). It installs the rules adopted since v1.14 as G56–G59 (the executors and their channels; checks and waits; briefs landed by the block applier; cost and quality) and corrects three facts: two executors write the repository (Lovable and the Claude Code executor), CI runs queue (DEC-181), and the live Knowledge is v3.11. Where v1.15 and v1.14 differ on a rule, v1.15 governs; G0 governs both.

### 2. fact: two executors

v1.14:

> Executor: Lovable (DEC-006; direct-to-dev per DEC-020 — main is promote-on-green only). Cursor: reserve executor.

v1.15: Executors: Lovable (DEC-006; direct-to-dev per DEC-020 — main is promote-on-green only) and the Claude Code executor (DEC-255–DEC-257; G56). Cursor: reserve executor.

### 3. fact: Knowledge v3.11

v1.14:

> additionally governed by in-repo AGENTS.md and Project Knowledge v3.10.

v1.15: additionally governed by in-repo AGENTS.md and Project Knowledge v3.11.

### 4. fact: Knowledge v3.11

v1.14:

> conflicts with Knowledge v3.10 or approved specs?

v1.15: conflicts with Knowledge v3.11 or approved specs?

### 5. fact: Knowledge v3.11

v1.14:

> KNOWLEDGE VERSION ADDENDUM (v1.13): the live Knowledge is v3.10 (2026-09-17); its text has been in Claude's hands since 2026-10-05, when the operator attached it (S89 — ask for a document he holds before searching for it), and the in-repo mirror docs/governance/lovable-knowledge.md (v3.8 until the records turn brings it level) is read as the mirror only once it says v3.10. The Knowledge amendment proposals of ledger blocks S41 and S43 are not installed.

v1.15: KNOWLEDGE VERSION: the live Knowledge is v3.11 (2026-10-23; the Project doc claude/lovable-knowledge-v3.11.md); the in-repo mirror docs/governance/lovable-knowledge.md is read as the mirror only once it names the live version (G46).

### 6. fact: runs queue (DEC-181)

v1.14:

> and because every push to dev cancels the run in flight (ci.yml: cancel-in-progress) main can trail for hours while pushes keep arriving — eight runs cancelled in a row and main 61 commits behind on 2026-10-04.

v1.15: and because runs queue — a newer push replaces only a QUEUED run (DEC-181) — main can trail while pushes keep arriving.

### 7. fact: runs queue (DEC-181)

v1.14:

> the operator's steps say to send the executor nothing for about 25 minutes (any message can cause a push, and a push cancels the run in flight — eight runs in a row on 2026-10-04);

v1.15: the operator's steps say to send the executor nothing until the run has completed (a newer push replaces a queued run — DEC-181);

### 8. superseded: §2 steps 1–4 (the addendum A–E governs)

v1.14:

> 1. Fresh clone of the dev branch (DEC-020): cd /tmp && rm -rf ethio && git clone --branch dev https://github.com/tesfayekb/ethio-marketplace.git ethio — then git fetch origin main and note whether main trails dev by tracking-only ([skip ci]) commits (steady state) or by substantive ones (a promote that has not yet run, or a guard-stopped divergence — reconcile via the sync-main dispatch only after confirming main's extra commits are tracking-only).
2. Read in order: docs/governance/system-state.md → the latest file in docs/governance/handoffs/ → tail of docs/spec/spec-ledger.md session log → tail of docs/_changelog.md → git log --oneline -10.
3. State to the operator: HEAD SHA, current phase, last closed step, next planned step — and ask for confirmation before proceeding. Chat memory/summaries are advisory; the repo is the record. Unexplained HEAD movement ⇒ pause and reconcile before new work.
4. If the operator opens with a task, run the ritual first anyway (30 seconds), then the task, grounded.

v1.15: —

### 9. superseded: §2 heading

v1.14:

> §2 ADDENDUM (v1.13) — THE RITUAL AS OF DEC-098 AND THE BUNDLE ERA (where a step below differs from steps 1–4, the step below governs):

v1.15: THE RITUAL (DEC-098 and the bundle era):

### 10. superseded: no fast lane (LANES)

v1.14:

> (d) A lane-only 'changed' red with a green matrix = noise (fast-lane law).

v1.15: —

### 11. superseded: no fast lane (LANES)

v1.14:

> FAST-LANE LAW (v1.8, DEC-023-B): the 'changed' source is signal-only — it never gates the merged verdict or promote; a lane-only failure with a green full matrix is contention noise by definition, while a deterministic lane failure is read as the early copy of a matrix failure.

v1.15: —

### 12. superseded: no fast lane (LANES)

v1.14:

> and, when present, the DEC-023-B fast lane 'changed'

v1.15: —

### 13. history: slip record pointer (stated in §11 already)

v1.14:

> SLIP RECORD ADDENDUM (v1.13) — moved verbatim to docs/governance/instructions-amendments.md §Slips (v1.14); the rules it forged are G29–G53.

v1.15: —

### 14. history

v1.14:

> The operator never stated this rule; it is the supervisor's practice, accepted by use since 2026-10-01 ("Pasting it is your approval").

v1.15: —

### 15. precedents

v1.14:

> (Precedents: the executor capability census → DEC-006; the E2E harness pass bar → acceptance 2026-08-01; the DEC-019 serve-stack branch rule → 2026-08-28; the DEC-024 worker-knob revert rule → 2026-08-30.) ADDENDUM (v1.13): further precedents — DEC-087 (timing census and spec split), DEC-092 (the framework update, reverted by its own rule), DEC-097 (the E2E account pool), DEC-098 (the evidence branch), DEC-104 (transport retry), DEC-115 (the test selector), DEC-119 (the speed rules).

v1.15: —

### 16. precedent

v1.14:

> The precedent: from 2026-09-28 to 2026-10-04 the ledgers stood at DEC-080 / INC-307 while the running record reached DEC-130 / INC-431 — 50 decisions and 124 defects outside the repository, the newest handoff six days old, system-state.md nine — after five deferrals and two briefs that said "the decision and incident ledgers are not written in this bundle" with no records turn behind them.

v1.15: —

### 17. evidence (the audit)

v1.14:

> The systems audit of 2026-10-23 (seven read-only studies at a413f952; /home/claude/audit/*/report.md, summarised in the Project doc claude/systems-audit-2026-10-23.md) is its evidence: in every area a good shared mechanism existed, screens and routes built after it adopted it, and nothing enumerated the ones that must — the posting form's required-answer mirror (built per step, the contact step exempted by a comment), four field primitives and thirteen hand-rolled forms, six AI calls wiring the shared meter and the one D166 rule by hand, 36 server endpoints with nine response envelopes and no shared parser (zod installed, unused), four copies of the auth chain, 22 defect classes of which 13 had no guard, and a route that acted with the service role before its door answered (INC-830).

v1.15: —

### 18. history

v1.14:

> Three executor-overturned rulings in U4 forged this addendum.

v1.15: —

### 19. slip list

v1.14:

> (S54, S55, S59 — three in one day)

v1.15: —

### 20. slip list

v1.14:

> (S70, S72, S75, S79, S81, S90, S92; the batch-18 "cells are empty" statement; INC-412; INC-413; the Privacy draft's position sentence; the age answer of 2026-10-04)

v1.15: —

### 21. history

v1.14:

> Third logged occurrence of the duplicated-block class (S3, S22, 2026-08-02) — the class has outlived two corrections and now gets a standing check.

v1.15: —

### 22. precedent

v1.14:

> Precedent for the step check: bundle 4 step 24's third way was never built, the turn's verification did not see it, and INC-432 was found by the records compile a week later (S86).

v1.15: —

### 23. slip list

v1.14:

> The class behind it: S49, S50, S77, S80, S83, S85, the three wrong examples of 2026-10-02, INC-422 ("I wrote that walk line without checking when suggestions appear") and S92 ("Dishes opens with Doro Wot ticked", written from the catalogue file — INC-434).

v1.15: —

### 24. quote

v1.14:

> (Operator: "it increases confusion to add more propts on work they do. let those finish and i will give you each of their work. once you verify all then you give me the above propmt with the necessary addendums"; earlier forms 2026-09-29 and 2026-10-01; three "which is final" questions.)

v1.15: —

### 25. precedent

v1.14:

> Claude's running record is never the only copy for longer than one bundle: the week of 2026-09-28 → 2026-10-04, when the ledgers stood at DEC-080 / INC-307 while the running record reached DEC-130 / INC-431 (§11), is the precedent.

v1.15: Claude's running record is never the only copy for longer than one bundle.

### 26. history

v1.14:

> A blanket "decline the framework update" kept a critical reflected-XSS patch out of the repository from 2026-10-01 to 2026-10-04 (INC-418; "declining it was my mistake"); the earlier update applied against the ruling and called "routine" (INC-372; DEC-092, reverted by its own rule) is the other face of the class.

v1.15: —

### 27. history

v1.14:

> (on 2026-10-04 the record stood at v1.9 against v1.12 live, the mirror at v3.8 against v3.10)

v1.15: —

### 28. history

v1.14:

> — five such proposals ran uninstalled from 2026-09-25 to this version

v1.15: —

### 29. history

v1.14:

> (two batches on 2026-10-04)

v1.15: —

### 30. precedent

v1.14:

> The precedent: the handover of 2026-10-04 was planned when the records were a week behind, so the compile ran beside executor turns 9–12 and the stop point moved from "turn 10 green" to "every record in the repository".

v1.15: —

### 31. slip list

v1.14:

> (S41, S42, S69, and the CT-8 flake of 2026-10-02 — ten retried passes since 2026-09-05 with no incident: the fourth occurrence)

v1.15: —

### 32. quote

v1.14:

> (operator, 2026-09-29: "CI red, can give fix prompt together with the next step prompt next so we dont kill time"; twice more on 2026-09-30)

v1.15: —

### 33. quote

v1.14:

> ("CI red, all need to be fixed before we move", 2026-09-30)

v1.15: —

### 34. quote

v1.14:

> (commitment of 2026-10-01, restated 2026-10-04: "no more stops just to wait for CI")

v1.15: —

### 35. quote

v1.14:

> (2026-10-01; 2026-10-04 "no more stops just to wait for CI")

v1.15: —

### 36. quote

v1.14:

> ("please be selective of inportant walks to do from now on"; "why do we have to repeat these walks again?")

v1.15: —

### 37. quote

v1.14:

> ("IF WE CAN DO MORE OF THOSE ITEMS PERTURN, IT WILL BE GREAT TO SAVE TIME"; "give lovable to fix multiple of those issues at a time")

v1.15: —

### 38. quote

v1.14:

> (operator: "I am not saying we have to do fewer tests … I dont want to make it less secure less comprehensive in terms of testing")

v1.15: —

### 39. quote

v1.14:

> (operator: "please review converstatio first and let me know the steps")

v1.15: —

### 40. quote

v1.14:

> (S89: a helper run spent searching the transcript for a text he handed over in one step; "you could have asked for a copy of current lovable knowledge base instead of spending so much time")

v1.15: —

### 41. quote

v1.14:

> ("list form short", five times)

v1.15: —

### 42. quote

v1.14:

> ("should i just send the above or say continue", three times on 2026-10-02)

v1.15: —

### 43. quote

v1.14:

> ("fix it . i dont understand your porposal, just continue to fix appropriately. if there is any i have to do tell me explicetly", 2026-09-30)

v1.15: —

### 44. quote

v1.14:

> (G5; 2026-10-04: "Its turning out to be much more turns than initially anticipated")

v1.15: —

### 45. quote

v1.14:

> ("can you ask lovable to do that instead?")

v1.15: —

### 46. quote

v1.14:

> (S90: "a prefill can tick a list", said from the docs while the form skipped list facts — INC-434; the two C28 corrections of 2026-10-05)

v1.15: —

### 47. quote

v1.14:

> ("please review how other websites implement that"; "need to do a detailed reaserch on this firt and need to discuss first"; "NEED TO REVIEW WHAT OTHER MARKELPLACE LIKE CRIAGELIST OR OTHERS SAY OR DO")

v1.15: —

### 48. quote

v1.14:

> ("ASK ME IF YOUY GAVE QUESTIONS FOR CLARIFICATIONS SO WE GET IT CORRECT")

v1.15: —

### 49. quote

v1.14:

> ("lets save it as agreed rule then")

v1.15: —

### 50. quote

v1.14:

> ("your work is taking too long", 2026-10-05: the reply was two lines and the executor's next turn)

v1.15: —

### 51. quote

v1.14:

> ("i dont want other to access the data we worked so hard")

v1.15: —

### 52. quote

v1.14:

> ("EVERYTHING THAT YOU PLAN AND KNOW OF GOES IN REPO SO WHEN WE PLAN A HANDOVER WE WONT HAVE SOMETHING LEFT … EXTENSIVE AND COVER EVERYTHING PLANNED ABOUT PROJECT, EVERYTHING DONE, SO FAR, AND PLANS AND STEPS")

v1.15: —

### 53. quote

v1.14:

> ("fix it . i dont understand your porposal, just continue to fix appropriately. if there is any i have to do tell me explicetly")

v1.15: —

### 54. quote (G0)

v1.14:

> G0 SYSTEMS, NOT PATCHES (v1.14, the operator's directive of 2026-10-23: "when we design or when we fix an issue, we should not just patch small fix, we should rather look at the bigger picture … ready for bigger expansion in future … never fail in future … similar issues are identified and fixed as well, security holes and vulnerabilities are addressed and we have a centralized system that will be much easier to maintain … even if that will take extra effort").

v1.15: G0 SYSTEMS, NOT PATCHES (v1.14, the operator's directive of 2026-10-23).

### 55. quote (G29)

v1.14:

> The operator's words: "when such issue identified, make sure not just fix one issue but reaserch wider issue and fix with detail review if similar problems exist other places" (2026-09-29; repeated 2026-09-30 twice and 2026-10-01: "same comment for all other boxes everywhere, not just for brands but everything, every attribute").

v1.15: —

### 56. quote (§13)

v1.14:

> ADDENDUM (v1.13, operator directive 2026-10-04): a handoff is a PACKAGE, not a block — "EVERYTHING THAT YOU PLAN AND KNOW OF GOES IN REPO SO WHEN WE PLAN A HANDOVER WE WONT HAVE SOMETHING LEFT … EXTENSIVE AND COVER EVERYTHING PLANNED ABOUT PROJECT, EVERYTHING DONE, SO FAR, AND PLANS AND STEPS".

v1.15: ADDENDUM (v1.13, operator directive 2026-10-04): a handoff is a PACKAGE, not a block.

### 57. new rules G56–G59

v1.14:

> §13 Continuity & handoff

v1.15: G56 Executors and channels (v1.15; DEC-245, DEC-246, DEC-255–DEC-257) — Two executors write the repository: Lovable (its platform, its Knowledge, AGENTS.md) and the Claude Code executor (the kit — CLAUDE.md, .claude/rules, the hooks, land.ts the one landing door, the reviewer subagent; .github/workflows/** and .claude/** are closed to it, so workflow and kit changes go to Lovable). One executor works at a time: each landing rewrites roadmap line 3, which the other's scope reads. Claude Code: every brief starts a NEW session (a session sends its whole context again on every request); the operator starts it, pastes the carrier and brings the final report; the supervisor never answers its permission prompts; one message per executor turn — a brief, a numbered ruling, "continue", or "apply <fragment> on ethio-prod" after the staging read-back and the operator's yes. Lovable: the supervisor may send briefs, rulings and "continue" through the Lovable connector (DEC-245) — only what the operator would otherwise paste, one message per Lovable turn, never while it works; never query_database, enable_database, deploy_project, knowledge set, visibility, project create, remix or move, skills, add_connector or Project progress; a "Modify Supabase database" pause is answered only on the operator's yes; Publish stays the operator's; when the operator is present he pastes the file himself (it costs the supervisor's plan nothing). Supabase connector (DEC-246): write calls only on ethio-staging, only migration files already on dev, sha-checked and applied whole, the specific mark read back; ethio-prod read-only at most; execute_sql reads only; no project, branch, edge-function or secret calls.
G57 Checks and waits (v1.15, operator 2026-10-27) — A Claude Code turn gets no scheduled check: the operator brings its final report. A Lovable turn gets scheduled checks only when the operator says he is away. A CI wait is a background command that polls the Actions API at no model cost and wakes the supervisor once, when the run completes; nothing polls on a schedule while nothing runs (a wake after a long idle reads the whole context again at full price). CI runs queue — a newer push replaces only a QUEUED run, never the running one (DEC-181). The Foundation fixes tracker (a Claude Doc) is updated after every verified turn and opened for the operator when he asks (operator 2026-10-24).
G58 Briefs land by the block applier (v1.15; register row 58; S453, S454) — Every FILE and EDIT block a brief carries is applied by `bash scripts/brief/apply-blocks.sh <saved brief> [--dry] [<path> …]`, never retyped (the kit refuses inline programs; the applier's scope is the kit's scopeVerdict, which reads roadmap line 3 — so a brief that uses it makes the line-3 change at STEP 0 and writes every block marker at the start of its line — and refuses .github/workflows/** and .claude/**, whose blocks go to Lovable, which copies them by its own script, each OLD text checked to be found exactly once, the brief's hash list proving every file — turn 34e, 2026-10-27); the executor saves a long brief by a scripted copy, never by retyping it. Before a brief is sent, Claude simulates the whole turn on its base — STEP 0's hand edits made by hand, every block applied by the applier — and compares every file with a prototype that includes STEP 0's hand edits; every generator asserts that roadmap line 3 names the brief in force at the end of the turn and that no roadmap block touches line 3. Every brief's new code is checked against AGENTS.md and the kit's rules (.claude/rules/10-code-laws.md included) by check-brief.py (--cc for Claude Code) before it is sent, and every hit is read: a hit inside imported record text is record, not instruction. Red first is shown on the base, never committed.
G59 Cost and quality (v1.15, operator 2026-10-27) — Quality is never traded for cost. The supervisor's own requests are the main cost of the operator's plan: one script per landing (verify it, read CI, cut and rehearse the next brief), filtered output, no helper agent or study unless asked; an exact-copy turn is verified by hash equality, its new tests and CI. Briefs are prototype-exact by default; while the Claude Code cloud credit lasts (to 2026-11-05) a lower-risk turn (tests, tooling, screens) may be spec-built — exact tests, the full consumer census, the executor's reviewer, CI and the supervisor's full diff review — never a turn that touches sign-in, permissions, migrations or personal data; when the credit ends, executor turns return to Lovable. Records-only and exact-copy turns may run on Sonnet (the operator picks the model when he starts a session). Every number about spend is an ESTIMATE until measured (G52).

§13 Continuity & handoff

## Slips
NEW-END
EDIT docs/governance/instructions-amendments.md #2
OLD-BEGIN
- Also logged, not numbered: records turn R3's step C2 expected the ledger's last numbering line to end "S454" while block S77's own text, updated when S454 was registered, ends "S455" (the block was brought level, its expectation line was not — the executor reported it as a departure and left the record as the block wrote it, which is right; 2026-10-27 12:5xZ); the supervisor's "pkill slip again (minor)" (2026-10-26 15:5xZ — `pkill -f "node dist/server/index.mjs"` matched its own shell's command line and killed it; servers since stopped by their saved pids); a full unit run edited mid-run and a second overlapping it in the same log (15:5xZ — both discarded: a full run starts after the last edit, one at a time, its own log); the generator lessons of 2026-10-25 16:50Z (a placeholder alternation matched AGENTSLINE before AGENTSLINEBYTES; a `printf "<the line>"` instruction would have run the line's backticks — both caught before sending, no repository harm); "caught before sending (not a slip)" — 34c-2's provider-test mocks (19:4xZ) and 34b-2's agents-line-missing (14:2xZ); the G5 record of a wrong prediction (2026-10-25 21:0xZ: the root loader does NOT re-run on a client navigation — the planned 'root-loader-no-rerun' item dropped); the supervisor's "04:10 answer" that credited B-3 for sign-up (2026-10-26 08:2xZ — corrected to the operator; a sign-up-with-a-taken-e-mail case queued); "My smoke estimate ($3–10 for the whole turn) had no data behind it" (2026-10-25; first measurement $2 for a ten-call stopped session); turn 34c-2's expected roadmap not run through Prettier, so the executor's formatter escaped `sb-\*-auth-token` (2026-10-26 20:36Z — a formatting-only difference it reported as a departure); the container restart of 2026-10-26 22:06–22:10Z lost the CI watcher and stopped a records helper (both restarted; no record harm).
OLD-END
NEW-BEGIN
- Also logged, not numbered: records turn R3's step C2 expected the ledger's last numbering line to end "S454" while block S77's own text, updated when S454 was registered, ends "S455" (the block was brought level, its expectation line was not — the executor reported it as a departure and left the record as the block wrote it, which is right; 2026-10-27 12:5xZ); the supervisor's "pkill slip again (minor)" (2026-10-26 15:5xZ — `pkill -f "node dist/server/index.mjs"` matched its own shell's command line and killed it; servers since stopped by their saved pids); a full unit run edited mid-run and a second overlapping it in the same log (15:5xZ — both discarded: a full run starts after the last edit, one at a time, its own log); the generator lessons of 2026-10-25 16:50Z (a placeholder alternation matched AGENTSLINE before AGENTSLINEBYTES; a `printf "<the line>"` instruction would have run the line's backticks — both caught before sending, no repository harm); "caught before sending (not a slip)" — 34c-2's provider-test mocks (19:4xZ) and 34b-2's agents-line-missing (14:2xZ); the G5 record of a wrong prediction (2026-10-25 21:0xZ: the root loader does NOT re-run on a client navigation — the planned 'root-loader-no-rerun' item dropped); the supervisor's "04:10 answer" that credited B-3 for sign-up (2026-10-26 08:2xZ — corrected to the operator; a sign-up-with-a-taken-e-mail case queued); "My smoke estimate ($3–10 for the whole turn) had no data behind it" (2026-10-25; first measurement $2 for a ten-call stopped session); turn 34c-2's expected roadmap not run through Prettier, so the executor's formatter escaped `sb-\*-auth-token` (2026-10-26 20:36Z — a formatting-only difference it reported as a departure); the container restart of 2026-10-26 22:06–22:10Z lost the CI watcher and stopped a records helper (both restarted; no record harm).
- S455 (G16 — a brief's own sentences agree with its blocks; 2026-10-27 13:2xZ, found by records turn R4's reviewer) — records turn R4's brief contradicted itself in three places: STEP 0 said the roadmap's other lines change "in Part B" (its blocks changed them in Part C); the behaviour contract said the ledger's numbering line "becomes INC-940" (the blocks wrote INC-941, which landed); THE SYSTEM said "REGISTER: none (no mechanism changes)" while `EDIT docs/governance/mechanisms.md #1` amended row 58. The executor followed the blocks and listed the three for a ruling; nothing wrong landed. R3's step C2 (the "also logged" line above) was the first of the class. Corrective: every sentence of a brief that names a part, a number or a file is generated from the same data as the blocks, or checked against them by the generator, and the template's prose is re-read against the generated blocks before sending.
- S456 (G5 and G16's addendum — a number in a brief is measured or labelled ESTIMATE; 2026-10-27 14:4xZ, found on turn 34e's first run) — turn 34e's brief set every install's deadline at 300 s a try and the certificate tools' at 180 s without measuring a single step's times, and its decisions line called the deadlines "generous multiples of the measured times" (true of the job deadlines, measured on run 40406394089; not of the install deadlines). The Chromium install's measured tail (66 of 371 lane runs past 300 s, 895 s at most) was readable from the Actions API the same day. The first run lost lanes 3, 5 and 12 (INC-943) and with them the turn's green: the fix rides records turn R5. Its sibling: a retry was put on package installs, which cannot be repeated after a cut-off. Corrective (DEC-276): every deadline, ceiling or size a brief sets is computed from CI's own history (the step's median, 99th percentile and maximum over at least 300 runs, shown in the brief), with at least half again as margin; a retry only where re-running is safe.
- Also logged, not numbered (2026-10-27): the supervisor estimated instructions v1.15 at about 40% shorter than v1.14; it is 5% shorter, because v1.14 is mostly rules (G5 — the measured value recorded).
NEW-END
EDIT docs/tracking/incidental-findings.md #1
OLD-BEGIN
Numbering: next free INC-941.
OLD-END
NEW-BEGIN
## INC-941 — the CI deadline census does not see pip, git's network commands or the downloading actions (2026-10-27 14:3xZ; turn 34e's K2)

Defect: outside calls in the workflows that CF-CID's patterns do not see run without a step deadline: .github/workflows/ci.yml :323 `pip install "semgrep==${SEMGREP_VERSION}"` and :326–:328 `git clone --depth 1 https://github.com/semgrep/semgrep-rules /tmp/semgrep-rules` with its `git fetch`, bounded only by the job's `timeout-minutes`, and every action that downloads (`oven-sh/setup-bun@v2` at ci.yml :65, :151, :182, :199, :225, :292, :385 and in the other workflows; `actions/setup-node@v5` :280; `actions/setup-python@v5` :319; `gitleaks/gitleaks-action@v3` :172). Evidence: docs/governance/reports/foundations-turn-34e.report.md §6 at `a308c6b3`; ci.yml :318–:330 read in the clone. Fix: pip and git's network commands through scripts/ci/with-deadline.sh; every downloading `uses:` step a step-level `timeout-minutes`; CF-CID (scripts/conformance/ci-deadlines.test.ts) enumerates by the concern's definition — anything that reaches the network — with a planted bypass for each (a Lovable turn: .github/workflows/\*\* is closed to the Claude Code executor). Class: concern "every CI job and every outside call carries a deadline"; mechanism scripts/ci/with-deadline.sh and CF-CID (DEC-275, register row 59) — the census enumerated by command name, not by the definition (G55). Status (2026-10-27): OPEN — a roadmap line (records turn R5).

## INC-942 — database function arguments the database accepts as null are passed as `null as unknown as T` (2026-10-27; block S77's records-owed list)

Defect: eleven call sites cast `null` to a non-null type to pass a database function's optional argument, because the generated types declare those arguments non-null: src/features/admin-categories/category-images-service.ts :159; src/features/admin-categories/category-dialogs.tsx :681; src/features/admin-attributes/attributes-service.ts :299, :302, :435, :462, :463, :464, :467; src/features/admin-locations/locations-service.ts :98, :99. The type checker cannot tell a deliberate null from a missing value at these calls. Evidence: `grep -rn 'null as unknown as' src/` at `a308c6b3` — eleven lines. Fix: one typed way to pass an optional argument to a database function (the door mechanism's argument type, or the function's declared defaults with the argument left out), every call site onto it, and a census that refuses the cast. Class: concern "a door's optional argument is typed as optional"; mechanism: NONE YET (with the door mechanism of the Foundations bundle). Status (2026-10-27): OPEN — a roadmap line (records turn R5).

## INC-943 — the browser install's 300-second deadline was set without measuring, below the install's normal slow tail, and its retry after a cut-off cannot succeed (2026-10-27 14:4xZ; turn 34e's first run)

Defect: turn 34e's brief gave `bunx playwright install --with-deps chromium` 300 s a try and one retry. The figure was not measured: over 371 lane runs (2026-10-25 → 10-27; the Actions API's step times) the install took 14 s at the median, 582 s at the 90th percentile, 809 s at the 99th and 895 s at most — 66 of the 371 (18%) past 300 s, each of which passed slowly before turn 34e. On run 40519893778 (`a308c6b3`) lanes 3, 5 and 12 ran past 300 s on their first try and failed at once on the second (`ci-deadline … failed with exit 1 on try 2 of 2`); one lane passed on its retry. The second try's error is not in the evidence the supervisor can read (the job logs need a sign-in); the reading — a package install cut off part-way leaves the system's package manager interrupted — is a hypothesis consistent with the retry that passed (cut off in its download, after the libraries were in). Evidence: the run's annotations (`ci-retry` and `ci-deadline` on lanes 3, 5 and 12); local-backend-proof.md on ci-evidence for the run ("not run" for lanes 3, 5, 12); the step-time census above. Fix (records turn R5, Part B; DEC-276): the system libraries (`bunx playwright install-deps chromium`) once with 1500 s, the browser download (`bunx playwright install chromium`) with 900 s a try and one retry, in all five installs (local-backend-proof.yml, nightly-e2e.yml ×2, flake-check.yml, guard-proof.yml); the certificate tools' `apt-get install` once with 600 s; CF-CID-1's fifth rule (a package install runs once) with its planted breach in CF-CID-2, red first on `a308c6b3` (six findings). Class: concern "every CI job and every outside call carries a deadline" — a deadline is a measurement, not a guess, and a retry only where re-running is safe; mechanism scripts/ci/with-deadline.sh and CF-CID (register row 59). Status (2026-10-27): FIXED in records turn R5 — closes on DEC-276's judge.

## INC-944 — a lane's temporary backend deadlocked while applying an old migration (2026-10-27 14:4xZ; run 40519893778, lane 7)

Defect: lane 7's "Start backend and apply all migrations" failed after 89 s: applying 20261007033719_9f7deb8a-e850-4fc3-bfc0-9693f6994666.sql, `DROP POLICY IF EXISTS locations_admin_insert ON public.locations` (statement 57) met "deadlock detected (SQLSTATE 40P01) — process 217 waits for AccessExclusiveLock on relation 17634; blocked by process 243; process 243 waits for ShareLock on transaction 1554; blocked by process 217". Process 243 is a second database session during the start — which one is not in the evidence (the CLI stops its containers on the failure). The first deadlock in the lanes' evidence since they began (`git log -S` on ci-evidence), about 370 lane starts; turn 34e did not change the start command. Evidence: local-backend-proof.md on ci-evidence for run 40519893778 (§ Lane 7, its start log and port holders). Fix: the second session identified before any change — on its next occurrence the start's evidence names it (the sessions read before the CLI stops its containers, or the start re-run once with `--debug`); then fixed at its root. Not retried away (G38). Class: concern "a lane's backend starts the same way every time"; mechanism: the lanes' start step (local-backend-proof.yml) — its failure evidence does not yet name the database's other sessions. Status (2026-10-27): OPEN — a roadmap line (records turn R5); a second occurrence before the fix is a ruling the same day.

The entries stay as written; these lines are the later word. INC-940 (AP-36): a fourth retried pass on run 40512047787 (`52965564`, records turn R4), desktop-1280, shard 9 — four in seven days (none on turn 34e's run, whose shard 9 passed). INC-935 (every CI job and outside call carries a deadline): FIXED by turn 34e (`a308c6b3`; DEC-275); run 40519893778 FAILURE — lanes 3, 5 and 12 lost to the browser install's 300 s deadline (INC-943), lane 7 to a start deadlock (INC-944); every test that ran passed; INC-941 is the census's remainder and INC-943 its deadline's correction.

Numbering: next free INC-945.
NEW-END
EDIT docs/spec/spec-ledger.md #1
OLD-BEGIN
NUMBERING after this block: next free DEC-276 (DEC-275 drafted in turn 34e), D239, INC-940, S455, ACT-021.
OLD-END
NEW-BEGIN
NUMBERING after this block: next free DEC-276 (DEC-275 drafted in turn 34e), D239, INC-940, S455, ACT-021.

S78 · 2026-10-27 11:0xZ → 2026-10-27 15:0xZ · THE RECORDS LEVEL AND THE HANDOVER — RECORDS TURNS R3 AND R4 (THE BLOCK APPLIER HARDENED; THE DECISION LEDGER, THE POSITION, THE SLIPS AND THE OWED LINES), TURN 34e ON LOVABLE (EVERY CI JOB AND OUTSIDE CALL CARRIES A DEADLINE — DEC-275) AND ITS FIRST RUN RED ON ITS OWN INSTALL DEADLINE (INC-943, S456, DEC-276), THE OPERATOR'S RULES FOR COST AND QUALITY, INSTRUCTIONS v1.15 AND RECORDS TURN R5 (THE FIX FIRST, THEN THE HANDOVER)

What landed (times Z unless marked local; local is UTC−4):
- 12:5xZ — records turn R3 (`b70505f5`; brief ad92b781… / 144,815 B): the block applier hardened from records turn R1's reviewer (a block that runs on, never ends or is numbered out of order refused; the files written all or nothing; BA-6 the census against a second parser; docs/features/brief-applier.md), block S77 and system-state.md's position. Every file byte-equal to the prototype; run 40504157476 SUCCESS (12:56:20Z, 0 flaky, main promoted). Its reviewer's points (an edited script lost its run permission; a directory at a target; BA-6 blind to FILE blocks) → R4.
- 13:2xZ — records turn R4 (`52965564`; brief b6807450… / 96,900 B): the applier keeps an edited file's mode, refuses a directory at a target before anything is placed and makes a failed placing a refusal; S379–S454 into docs/governance/instructions-amendments.md §Slips; INC-938, INC-939 and INC-940 into the ledger; the owed roadmap lines; the scenario suite's line renamed. Run 40512047787 SUCCESS (13:54:34Z, main promoted) with AP-36's fourth retried pass in seven days (INC-940). Its reviewer's three MINORs, listed by the executor for a ruling: (1) a placing failure says "nothing written" after placing files and names absolute paths, and Part B's title claimed "all or nothing" — to INC-938's turn; (2) the placing-failure branch has no test — to INC-938's turn; (3) the brief contradicted itself in three places — S455.
- 14:18Z — turn 34e on Lovable (`a308c6b3`, after six platform "Changes" commits; brief 18f63255… / 68,687 B; DEC-275, INC-935): scripts/ci/with-deadline.sh (a deadline per try, one announced retry) on every install; `timeout-minutes` on every job and every step that reaches outside; each lane reserves the temporary backend's ports 54320–54329 before any connection; CF-CID-1/2 and WDL-1…4; register row 59; DEC-240's lint step gates again. Every file byte-equal to the prototype but roadmap.md, whose only difference is line 3 naming the turn as its brief requires; red first 61 findings; unit 329 files / 2,007 passed / 1 skipped; CF-SL-1 timed out once under load and passed alone (INC-921). Departure accepted: the committed applier could not be used (its scope reads roadmap line 3, changed only in Part D; the FILE markers followed "BLOCK n —" on their line), so the blocks were copied by a one-off script, the hashes proving every file. Run 40519893778 FAILURE (14:41:16Z) — every test that ran passed (1,715 passed, 0 failed, 1 flaky: PW-30, shard 6), but lanes 3, 5 and 12 lost to the browser install's 300 s deadline (INC-943 — fixed in records turn R5) and lane 7 to a deadlock in its backend start (INC-944); main stays `52965564`.
- 14:41Z → 15:0xZ — the red read (the operator, 10:41 local: "Ci red in lanes 3, 5, 7, 12. I want to know why this happened as it now adds more turns and we are trying to avoid having to do that and rather do a quality work"): lanes 3, 5 and 12 — the supervisor's unmeasured 300 s install deadline (INC-943, S456); lane 7 — a deadlock in the backend's start, unrelated to the turn's change (INC-944). Answered the same minute with the measured numbers; the fix rides the next Lovable turn, which was already owed (no extra turn).
- 15:0xZ — records turn R5 (this block's import; Lovable): Part B, the fix first (INC-943, DEC-276 — the browser's system libraries once with 1500 s, its download 900 s a try with one retry, in all five installs; the certificate tools' package install once; CF-CID-1's fifth rule, red first on `a308c6b3` with six findings); then the handover — docs/governance/claude-supervisor-instructions-v1.15.md (delivered for installation), the v1.15 amendment record and its moved text, S455, docs/governance/handoffs/2026-10-27-foundations-handover.md, the running record 2026-10-23 → 2026-10-27 (docs/governance/handoffs/2026-10-27-foundations-running-record.md), INC-941 and INC-942, AP-36's fourth line under INC-940, system-state.md's position, the owed roadmap lines and this block.

THE OPERATOR'S WORDS (local time)
- 06:42 — "of note lovable charges me 0.2 per credit is purchased annually, 0.28 per credit if bouth as topoff from time to time. claude code is 98% this week usage, and code has used $127 of $250 left, so far".
- 07:06 — his usage page: the Max plan's weekly limit 80% used, resetting Thursday 8:00 PM; by product Cowork 98% (the supervisor's thread), Claude Code 0%; the Claude Code cloud credit $127 of $250 left, expiring 2026-11-05; usage credits $13.14 with a $50 monthly cap and auto-reload on.
- 07:10 — "a, we dont want to compromize on quality of work we do. let  me know if there is any other twick, or any other plan that will allow work to continue at speed and quality."
- 07:25 — "no automated checks mean slower work, meaning more weeks before launch".
- 07:27 — "no need to chschedule a check for claude code. only checks needed is for lovable when i tell you I am away. for claude i will give you the final report when done".
- 07:43 — "Lovable is back up again. I agree with thw above changes with all mitigations. But what i want to avoid is loss of context and that leads to more issues that will require more turns. so i think we need to be very detailed with each step, still at all step quality of work is the priority, and i dont want claude or lovable to compromize quality etc. please proceed with the changes you suggested," — approving the supervisor's six changes: (1) no idle scheduled checks; (2) one script per landing (verify, read CI, cut and rehearse the next brief); (3) records turns verified by hash equality and CI; (4) a fresh supervisor thread after the records land, the tools saved to the Project first; (5) instructions v1.15 with a rule-by-rule proof; (6) spec-built briefs only for lower-risk turns while the Claude Code credit lasts (to 2026-11-05), never for sign-in, permissions, migrations or personal data — and executor turns back to Lovable when the credit ends.
- 10:08 — "Have you stopped working directly with lovable?" — answered: no; a long brief goes to him as a file to paste (exact, and free to the supervisor's plan), short messages through the connector.

DECISIONS — DEC-276 (the supervisor, 2026-10-27, under G17 — reversible CI tooling; listed for the operator as overridable; G22's named decision for this change to the closed CI surface): INC-943's correction to DEC-275 — every deadline is set from CI's own measured step times (the maximum over at least 300 runs of the step, with at least half again as margin; the brief shows the median, the 99th percentile and the maximum), and a retry only where re-running is safe (a download, `apt-get update`, `bun install`) — a package install (`apt-get install`, `playwright install-deps`, `playwright install --with-deps`) runs once; the browser's system libraries and its download are separate steps (1500 s once; 900 s a try, one retry; measured over 371 lane runs: median 14 s, 99th percentile 809 s, maximum 895 s). Its judge, frozen: KEEP when, over the next 20 completed runs on dev, no install step fails by its deadline; when one does, its measured times are read and its deadline set again from them.

RULES IN FORCE, ADOPTED IN THIS BLOCK — installed in v1.15 as G56 (the executors and their channels), G57 (checks and waits), G58 (briefs land by the block applier) and G59 (cost and quality); v1.14 governs until the operator installs v1.15.

INCIDENTS — INC-940's fourth line (run 40512047787); INC-941 (the CI deadline census does not see pip, git's network commands or the downloading actions — turn 34e's K2); INC-942 (the `null as unknown as T` casts on RPC arguments — block S77's records-owed list); INC-943 (the browser install's unmeasured deadline and its unsafe retry — fixed in R5); INC-944 (lane 7's start deadlock — the second session to be identified). In docs/tracking/incidental-findings.md.

SLIPS — S455 (records turn R4's brief contradicted itself in three places); S456 (turn 34e's install deadlines set without measuring); in docs/governance/instructions-amendments.md §Slips. Also logged there, not numbered: the supervisor's estimate that v1.15 would be about 40% shorter than v1.14 (it is 5% shorter — G5).

OPERATOR STEPS OWED — docs/governance/handoffs/2026-10-27-foundations-handover.md §6 (install v1.15 and start the fresh thread; INC-930's choice; a Publish of dev's head and one walk; the model per Claude Code session; SUPABASE_PROD_MIGRATE_TOKEN before a Claude Code migration turn; the items carried from blocks S76–S77).

JUDGES OPEN AT THE CLOSE OF THIS BLOCK: as block S77 lists them, with DEC-240's lint step now gating (turn 34e removed its `continue-on-error`); INC-940 (AP-36) at four lines; PW-30 a second line in seven days (run 40519893778, shard 6 — a third is an INC); DEC-275's twenty-run judge restarts at R5's run with DEC-276's; turn 34e's run read above.

RECORDS OWED — block S77's list, with records turns R4 and R5: the roadmap lines are written (R4: INC-878, INC-885–INC-888, INC-898, INC-899, INC-902, INC-903, INC-786 / INC-821, INC-843; R5: INC-936, INC-941, INC-942, INC-837's expiry, INC-910's docs line, the register's duplicate row 13, the harness doc's shared-account language rule, CF-LINT-1/2's non-empty floor, turn 33's two minors, INC-929's static census, the supervisor's check-brief rules as conformance tests); G36's and §8's "a push cancels the run in flight" corrected and the channels installed as G-rules (v1.15).

CURATOR STATE AT THE CLOSE OF THIS BLOCK: unchanged — as block S76 left it.

NUMBERING after this block: next free DEC-277, D239, INC-945, S457, ACT-021.
NEW-END
EDIT docs/governance/system-state.md #1
OLD-BEGIN

Governing instructions: Claude supervisor v1.14 (installed in the Project 2026-10-23) · Lovable Project Knowledge v3.11 (2026-10-23). Canonical truth: this file + /docs/spec/spec-ledger.md. Evidence channels: docs/tracking/ci-status.md (two-step SHA check), docs/tracking/e2e-last-failure.md, nightly-last-failure.md, flake-ledger.

OLD-END
NEW-BEGIN

Governing instructions: Claude supervisor v1.15 (delivered 2026-10-27 — docs/governance/claude-supervisor-instructions-v1.15.md; v1.14, installed 2026-10-23, governs until the operator installs it) · Lovable Project Knowledge v3.11 (2026-10-23). Canonical truth: this file + /docs/spec/spec-ledger.md. Evidence channels: branch ci-evidence (DEC-098) — docs/tracking/ci-status.md (two-step SHA check), e2e-last-failure.md, guards-last-failure.md, nightly-status.md, nightly-last-failure.md, flake-ledger.md (read whole).

NEW-END
EDIT docs/governance/system-state.md #2
OLD-BEGIN

Current position 2026-10-27, the Foundations bundle built to turn 34d — the records turns (dev = main = `8898525c` (records turn R2; run 40496361455 SUCCESS at 11:54:00Z); turn 34d `e9ee79f7` and records turn R1 `c33d0cb5` each judged green; the last Publish `c1b6b4e5` (2026-10-26 14:0xZ); Lovable's workspace out of credits from 2026-10-26 21:45Z — every turn since runs in the Claude Code executor (DEC-257); turn 34e built and waiting for Lovable, its workflow files being closed to Claude Code): STAGE 1 — THE LEGAL SECTION CLOSED WITH BUNDLE 22, AND THE FOUNDATIONS BUNDLE (DEC-237) BUILT TO TURN 34c-5 (block S77): bundle 22's last turns — the records (31), one "agree to a document" component and the landing after sign-in (32, M21), the document named in a sentence is the link (33, D235, M22/M23), the packages (33b, DEC-243); then the Foundations bundle — the conformance kit, requireSignedIn, the signed-in publishing page (D236, M24) and the language pick (D237) (turn 1); the route boundary with its five waves closed (INC-859–INC-863; turns 2–14 and 19–20: defineRoute, answer.ts, upstream.ts, the dial registry, the import doors, the route client, server functions on validators); the AI gateway with ai_calls kept 90 days (DEC-247, DEC-248; turns 15–19) and the vendor-seams freeze (DEC-249, DEC-250); the lint composition (21); the UUID module and the kit's walkers (22); the perf lab and the published site's baseline (23); the speed turns 24–34 — per-page budgets, loadOnce, the ad's photo links signed by the server, the first reads preloaded, the server's first feed page and cards, the strings layers (DEC-258), overlays and dialogs on demand (DEC-259, DEC-260), the device's own fonts (DEC-262), the database client off every page's first download (DEC-261; the entry closure 302.2 → 204.1 KiB gz); the review gate (K1; DEC-269, DEC-270); a failed download surfaced and the sign-out made final (34b-1…34b-4; DEC-268); one list of signed-in pages, the offline sign-out (DEC-271), the root's facts once a page load (DEC-272) and the phone menu without its × (D238) (34w, 34w-2); the session read and the project's address in one place (34c-1…34c-5; DEC-273, DEC-274); the non-null guard (K2); a test's interception ends with its page and the non-null census sees the definite-assignment mark (34d, INC-934); the block applier — a brief's FILE and EDIT blocks applied by one script, never retyped (records turn R1, register row 58; hardened in R3). The executors: Lovable through the connector (DEC-245), staging applies by the Supabase connector (DEC-246), the Claude Code executor and the hybrid (DEC-255–DEC-257; turns 19, 32, 33, 32b and 34; and, from 2026-10-26 23:19Z, every turn — 34d, R1, R2, R3). Seven migration files (M21–M24, turn 13's import-audit fix, turn 15's ai_calls and its M2) on ethio-prod and ethio-staging; the newest mark `20261025150000`. The order decided: the records turns R1 (the block applier; INC-847…INC-900) and R2 (INC-901…INC-937 with the later word, its closures, the numbering and the watch list) — landed → R3 (block S77, this position and the applier's hardening) → R4 (the slips S379–S454 in docs/governance/instructions-amendments.md §Slips, the roadmap's owed lines, INC-938 and INC-939 into the ledger) → turn 34e when Lovable has credits; the INC ledger's import escaped outside code spans for Prettier (`_x_`, `$`; docs/spec and docs/governance are outside Prettier and land verbatim). Decided, not built: turn 34e (DEC-275 — INC-935: a deadline and one retry on every CI install, timeout-minutes on every job and outside step, the lanes' host ports reserved from the ephemeral range) — built, waiting for Lovable; turn 34c-4 (the E2E side of the storage name, with the route guard's follow-ups — turn 34d's reviewer MINORs 2–5); INC-937 (a caught error's text through errorText in e2e/ and scripts/, its census over the whole tree); INC-938 (the typecheck over scripts/ and .claude/hooks/); INC-939 (the storage buckets' type and size allowlists — a migration turn, Tier A); the speed study before turns 35–37 (the time to data-app-ready — DEC-266's REVISIT); turns 35–37 (the anonymous reference reads behind cached routes, DEC-261 continued); after 37: DEC-265 (the category pictures re-cut to WebP — a migration turn), DEC-264 (stable addresses for a live ad's card photos — Tier A, spec owed), DEC-263 (edge caching at the DNS cutover — spec owed), the remaining overlays; the remaining mechanisms in DEC-237's order (the form kit, the door mechanism, locale/format, QueryState/Button/Picture/a11y, one ListingDetail + safeHref, t(key, values) + plurals); the residency waves (DEC-252–DEC-254; ESTIMATE six turns); the sign-in/sign-up scenario suite (bundle 22 turn 32's F7 census — its old "turn 34" roadmap line to renumber); then bundle 23 (D222's business-name rule) and Stage 1's last part (the banned-items and safety pages); the Sage 3D look and the left rail before Stage 2 (the operator's standing reminder). OPEN: INC-936 (the nightly red every night since 2026-10-19 and unread — AP-41 and LG-21 to read whole, its length near GitHub's 360 minutes to size; S452); INC-935 (turn 34e); INC-937, INC-938, INC-939; the three credit decisions put to the operator on 2026-10-26 21:5x local (the executor's model per turn, the kit cleanup in 34e, Lovable again after the Claude Code credit); INC-930 (the operator's choice — stay on the page offline, or fetch the marketplace's code ahead; the supervisor recommends the latter); INC-913 (DEC-266's judge: KEEP by its CI half, read 2026-10-26 22:4xZ; its timing half rides the speed study); INC-855 (GW-3's pass line from CI owed); INC-890 and INC-921 (the known sandbox timeouts); INC-932 (the ratchet's allowlist expiry); INC-847 (instrumented); INC-809 FIXED-WATCH; INC-872 (fixed — closes after a Flake check or a clean ledger week); INC-906 and the SO-12 and PW-54 lines (watched); INC-848 (before launch); INC-850 (the next legal turn); INC-853, INC-854 (the e2e-helpers wave); INC-878 (the residency work); INC-885–INC-888, INC-893, INC-898 (the gateway and log items); INC-899 (raw buttons — the form kit); INC-902, INC-903; INC-420 (CI installs from Lovable's cache — DEC-249 debt); DEC-257's comparison (no decision taken); DEC-240's lint step still `continue-on-error` (turn 34e removes it). OWED BY THE OPERATOR: Lovable credits (turn 34e waits); the three credit decisions; a Publish of `8898525c` and one walk of everything since `c1b6b4e5`; INC-930's choice; SUPABASE_PROD_MIGRATE_TOKEN before Claude Code's first migration turn (its cloud credit expires 2026-11-04 23:59 PT); from block S76, not confirmed since: the Privacy Policy v2 and publishing statement v2 import, the Afaan Oromo texts' import, the real legal phone number and the copyright agent, the DMCA registration, the MAU figure weekly until 31 Oct (INC-782), GitHub → Insights → Traffic, the PROMOTE_TOKEN renewal before 2027-01-18, code scanning #419's dismissal, a native speaker's read of the Amharic and Afaan Oromo legal texts. NEXT: records turn R4 → turn 34c-4 (Claude Code) → turn 34e when Lovable has credits; the Publish and walk when the operator is back; then the speed study and turns 35–37. Next free: DEC-276 (DEC-275 drafted in turn 34e), D239, INC-940, S455, ACT-021.
OLD-END
NEW-BEGIN

Current position 2026-10-27, the handover — the Foundations bundle built through turn 34e, the records level (dev = `a308c6b3` (turn 34e) before this records turn; main = `52965564` (records turn R4; run 40512047787 SUCCESS, promoted); run 40519893778 on `a308c6b3`: FAILURE (14:41:16Z) — every test that ran passed (1,715 passed, 0 failed, 1 flaky: PW-30, shard 6), but lanes 3, 5 and 12 lost to the browser install's 300 s deadline (INC-943 — fixed in records turn R5) and lane 7 to a deadlock in its backend start (INC-944); main stays `52965564`; the last Publish `c1b6b4e5` (2026-10-26 14:0xZ)): records turns R1–R4 brought the repository level with the supervisor's running record — the block applier (scripts/brief/apply-blocks.sh, register row 58), INC-847 → INC-940, DEC-243 → DEC-275 with blocks S77, the slips S379 → S454 and the owed roadmap lines; turn 34e put a deadline on every CI job and every outside call (DEC-275, INC-935; register row 59); this records turn R5 carries its fix first — the browser install's system libraries once and its download with a measured deadline, a package install never retried (INC-943, DEC-276) — then lands the handover (block S78): instructions v1.15 (docs/governance/claude-supervisor-instructions-v1.15.md — delivered for installation; v1.14 governs until the operator installs it), the v1.15 amendment record with its moved text, S455, the handoff (docs/governance/handoffs/2026-10-27-foundations-handover.md) and the running record 2026-10-23 → 2026-10-27, INC-941 → INC-944, S456, and the owed roadmap lines. Two executors write the repository, one at a time: Lovable (credits again since 2026-10-27) and the Claude Code executor (its cloud credit to 2026-11-05; G56, G59). No migration since turn 15's M2 (declared mark `20261025150000`). Next (the handoff's §5): R5's own run read (DEC-276); INC-940 (AP-36's four retried passes), INC-944 (lane 7's start deadlock) on its next occurrence, turn 34c-4, INC-937, INC-938, INC-941, INC-936, INC-939, the speed study and turns 35–37, the remaining Foundations mechanisms; then the Sage redesign and the left rail; then Stage 2. Operator steps owed: the handoff's §6. Next free numbers: DEC-277, D239, INC-945, S457, ACT-021.

(Superseded 2026-10-27 by the position above, the handover; the paragraph below stands as written at records turn R3.)

Current position 2026-10-27, the Foundations bundle built to turn 34d — the records turns (dev = main = `8898525c` (records turn R2; run 40496361455 SUCCESS at 11:54:00Z); turn 34d `e9ee79f7` and records turn R1 `c33d0cb5` each judged green; the last Publish `c1b6b4e5` (2026-10-26 14:0xZ); Lovable's workspace out of credits from 2026-10-26 21:45Z — every turn since runs in the Claude Code executor (DEC-257); turn 34e built and waiting for Lovable, its workflow files being closed to Claude Code): STAGE 1 — THE LEGAL SECTION CLOSED WITH BUNDLE 22, AND THE FOUNDATIONS BUNDLE (DEC-237) BUILT TO TURN 34c-5 (block S77): bundle 22's last turns — the records (31), one "agree to a document" component and the landing after sign-in (32, M21), the document named in a sentence is the link (33, D235, M22/M23), the packages (33b, DEC-243); then the Foundations bundle — the conformance kit, requireSignedIn, the signed-in publishing page (D236, M24) and the language pick (D237) (turn 1); the route boundary with its five waves closed (INC-859–INC-863; turns 2–14 and 19–20: defineRoute, answer.ts, upstream.ts, the dial registry, the import doors, the route client, server functions on validators); the AI gateway with ai_calls kept 90 days (DEC-247, DEC-248; turns 15–19) and the vendor-seams freeze (DEC-249, DEC-250); the lint composition (21); the UUID module and the kit's walkers (22); the perf lab and the published site's baseline (23); the speed turns 24–34 — per-page budgets, loadOnce, the ad's photo links signed by the server, the first reads preloaded, the server's first feed page and cards, the strings layers (DEC-258), overlays and dialogs on demand (DEC-259, DEC-260), the device's own fonts (DEC-262), the database client off every page's first download (DEC-261; the entry closure 302.2 → 204.1 KiB gz); the review gate (K1; DEC-269, DEC-270); a failed download surfaced and the sign-out made final (34b-1…34b-4; DEC-268); one list of signed-in pages, the offline sign-out (DEC-271), the root's facts once a page load (DEC-272) and the phone menu without its × (D238) (34w, 34w-2); the session read and the project's address in one place (34c-1…34c-5; DEC-273, DEC-274); the non-null guard (K2); a test's interception ends with its page and the non-null census sees the definite-assignment mark (34d, INC-934); the block applier — a brief's FILE and EDIT blocks applied by one script, never retyped (records turn R1, register row 58; hardened in R3). The executors: Lovable through the connector (DEC-245), staging applies by the Supabase connector (DEC-246), the Claude Code executor and the hybrid (DEC-255–DEC-257; turns 19, 32, 33, 32b and 34; and, from 2026-10-26 23:19Z, every turn — 34d, R1, R2, R3). Seven migration files (M21–M24, turn 13's import-audit fix, turn 15's ai_calls and its M2) on ethio-prod and ethio-staging; the newest mark `20261025150000`. The order decided: the records turns R1 (the block applier; INC-847…INC-900) and R2 (INC-901…INC-937 with the later word, its closures, the numbering and the watch list) — landed → R3 (block S77, this position and the applier's hardening) → R4 (the slips S379–S454 in docs/governance/instructions-amendments.md §Slips, the roadmap's owed lines, INC-938 and INC-939 into the ledger) → turn 34e when Lovable has credits; the INC ledger's import escaped outside code spans for Prettier (`_x_`, `$`; docs/spec and docs/governance are outside Prettier and land verbatim). Decided, not built: turn 34e (DEC-275 — INC-935: a deadline and one retry on every CI install, timeout-minutes on every job and outside step, the lanes' host ports reserved from the ephemeral range) — built, waiting for Lovable; turn 34c-4 (the E2E side of the storage name, with the route guard's follow-ups — turn 34d's reviewer MINORs 2–5); INC-937 (a caught error's text through errorText in e2e/ and scripts/, its census over the whole tree); INC-938 (the typecheck over scripts/ and .claude/hooks/); INC-939 (the storage buckets' type and size allowlists — a migration turn, Tier A); the speed study before turns 35–37 (the time to data-app-ready — DEC-266's REVISIT); turns 35–37 (the anonymous reference reads behind cached routes, DEC-261 continued); after 37: DEC-265 (the category pictures re-cut to WebP — a migration turn), DEC-264 (stable addresses for a live ad's card photos — Tier A, spec owed), DEC-263 (edge caching at the DNS cutover — spec owed), the remaining overlays; the remaining mechanisms in DEC-237's order (the form kit, the door mechanism, locale/format, QueryState/Button/Picture/a11y, one ListingDetail + safeHref, t(key, values) + plurals); the residency waves (DEC-252–DEC-254; ESTIMATE six turns); the sign-in/sign-up scenario suite (bundle 22 turn 32's F7 census — its old "turn 34" roadmap line to renumber); then bundle 23 (D222's business-name rule) and Stage 1's last part (the banned-items and safety pages); the Sage 3D look and the left rail before Stage 2 (the operator's standing reminder). OPEN: INC-936 (the nightly red every night since 2026-10-19 and unread — AP-41 and LG-21 to read whole, its length near GitHub's 360 minutes to size; S452); INC-935 (turn 34e); INC-937, INC-938, INC-939; the three credit decisions put to the operator on 2026-10-26 21:5x local (the executor's model per turn, the kit cleanup in 34e, Lovable again after the Claude Code credit); INC-930 (the operator's choice — stay on the page offline, or fetch the marketplace's code ahead; the supervisor recommends the latter); INC-913 (DEC-266's judge: KEEP by its CI half, read 2026-10-26 22:4xZ; its timing half rides the speed study); INC-855 (GW-3's pass line from CI owed); INC-890 and INC-921 (the known sandbox timeouts); INC-932 (the ratchet's allowlist expiry); INC-847 (instrumented); INC-809 FIXED-WATCH; INC-872 (fixed — closes after a Flake check or a clean ledger week); INC-906 and the SO-12 and PW-54 lines (watched); INC-848 (before launch); INC-850 (the next legal turn); INC-853, INC-854 (the e2e-helpers wave); INC-878 (the residency work); INC-885–INC-888, INC-893, INC-898 (the gateway and log items); INC-899 (raw buttons — the form kit); INC-902, INC-903; INC-420 (CI installs from Lovable's cache — DEC-249 debt); DEC-257's comparison (no decision taken); DEC-240's lint step still `continue-on-error` (turn 34e removes it). OWED BY THE OPERATOR: Lovable credits (turn 34e waits); the three credit decisions; a Publish of `8898525c` and one walk of everything since `c1b6b4e5`; INC-930's choice; SUPABASE_PROD_MIGRATE_TOKEN before Claude Code's first migration turn (its cloud credit expires 2026-11-04 23:59 PT); from block S76, not confirmed since: the Privacy Policy v2 and publishing statement v2 import, the Afaan Oromo texts' import, the real legal phone number and the copyright agent, the DMCA registration, the MAU figure weekly until 31 Oct (INC-782), GitHub → Insights → Traffic, the PROMOTE_TOKEN renewal before 2027-01-18, code scanning #419's dismissal, a native speaker's read of the Amharic and Afaan Oromo legal texts. NEXT: records turn R4 → turn 34c-4 (Claude Code) → turn 34e when Lovable has credits; the Publish and walk when the operator is back; then the speed study and turns 35–37. Next free: DEC-276 (DEC-275 drafted in turn 34e), D239, INC-940, S455, ACT-021.
NEW-END
EDIT roadmap.md #1
OLD-BEGIN
  - [ ] INC-937 — a caught error's text is read through `errorText` (src/lib/error-text.ts; rule 10 F4) in e2e/ and scripts/ as in src/: the census (src/lib/error-text.test.ts :113) reads the three folders, and the 40 hand reads (30 in 13 e2e files, 10 in 6 scripts files; the route guard's in turn 34c-4) move onto it, each left one an allowlist line with its reason and expiry.
  - [ ] INC-938 — every TypeScript file is type-checked: `bun run typecheck` (tsconfig.json's include) covers neither scripts/ nor .claude/hooks/, so the conformance censuses, the CI scripts, the kit and the block applier are type-checked by nobody (vitest transpiles without types; records turn R1's reviewer, MINOR 4) — a typecheck over both (Bun's globals typed for the kit), its first run's errors fixed or listed.
  - [ ] INC-939 — each storage bucket allows only what its door allows: listing-photos and category-assets carry no allowed_mime_types or file_size_limit — defence in depth only (no client writes listing photos since 20261015102153; category assets need staff rights) — a migration turn (Tier A): the image types and the media pipeline's byte caps set on each bucket, proven on staging.
  - [x] Turn K2 (docs/governance/briefs/foundations-turn-k2.md; no migration; Lovable) — the kit's 22 non-null assertions (.claude/hooks/lib.ts, land.ts) become guards; the platform rule's guard: the non-null census (CF-NN-1/2) with its ratchet allowlist — 143 files hold the 979 older assertions at their counts (INC-932), a count only falls, the kit's stays at zero. INC-921 (the tree-scan time budget) stays on the kit's next turn. Final HEAD 6b3a461d; CI run 40403849904: queued when turn 34c-5's brief was sent (the supervisor reads it).
OLD-END
NEW-BEGIN
  - [ ] INC-937 — a caught error's text is read through `errorText` (src/lib/error-text.ts; rule 10 F4) in e2e/ and scripts/ as in src/: the census (src/lib/error-text.test.ts :113) reads the three folders, and the 40 hand reads (30 in 13 e2e files, 10 in 6 scripts files; the route guard's in turn 34c-4) move onto it, each left one an allowlist line with its reason and expiry.
  - [ ] INC-938 — every TypeScript file is type-checked: `bun run typecheck` (tsconfig.json's include) covers neither scripts/ nor .claude/hooks/, so the conformance censuses, the CI scripts, the kit and the block applier are type-checked by nobody (vitest transpiles without types; records turn R1's reviewer, MINOR 4) — a typecheck over both (Bun's globals typed for the kit), its first run's errors fixed or listed. With it the block applier's two MINORs from records turn R4's reviewer: a failed placing says which files it placed (repository paths) instead of "nothing written", and that branch gets its test.
  - [ ] INC-939 — each storage bucket allows only what its door allows: listing-photos and category-assets carry no allowed_mime_types or file_size_limit — defence in depth only (no client writes listing photos since 20261015102153; category assets need staff rights) — a migration turn (Tier A): the image types and the media pipeline's byte caps set on each bucket, proven on staging.
  - [ ] INC-936 — the nightly's red nights read whole before any fix (G21): AP-41 (three nights running — the place link), LG-21, PW-132 and the rest of 10-19 → 10-26, each class dispositioned in a ruling (staging under load, a real defect, a test to fix); the nightly's length (280–358 minutes against GitHub's 360) brought under its ceiling, and a heartbeat written on a cancelled run.
  - [ ] INC-941 (Lovable — .github/workflows/\*\* is closed to the Claude Code executor) — the CI deadline census by its definition: pip and git's network commands (ci.yml :323, :326–:328) through scripts/ci/with-deadline.sh, every downloading `uses:` step (setup-bun, setup-node, setup-python, gitleaks) with a step `timeout-minutes`, CF-CID naming each with a planted bypass.
  - [ ] INC-942 — one typed way to pass a database function's optional argument (with the door mechanism): the eleven `null as unknown as T` casts (category-images-service.ts :159, category-dialogs.tsx :681, attributes-service.ts ×7, locations-service.ts :98–:99) onto it, and a census that refuses the cast.
  - [ ] INC-944 — lane 7's backend start deadlocked applying 20261007033719 (`DROP POLICY … ON public.locations`) against a second database session: on its next occurrence the start's evidence names that session (the sessions read before the CLI stops its containers, or the start re-run once with `--debug`), then the cause fixed at its root — never retried away (G38).
  - [ ] INC-837 — the caller-gates allowlist's `until INC-837` lines retired with the Foundations doors part (the expiry G55 requires).
  - [ ] INC-910's docs line — docs/features/e2e-harness.md names the one colour reader (`okLchOf` in e2e/helpers/colors.ts: oklch and oklab, alpha ≥ 0.5) and its guard EC-1…5.
  - [ ] The register's duplicate row 13 (docs/governance/mechanisms.md: the vendor seams and the route boundary both numbered 13) — one renumbered to the next free row, every reference to it updated.
  - [ ] docs/features/e2e-harness.md §Authoring laws gains D237's rule: a test that picks a language signed in on a shared account restores it before it ends.
  - [ ] CF-LINT-1/2 gain a non-empty floor: the census fails when it finds no file to read (a list that matches nothing passes today).
  - [ ] Turn 33's two minors: the "CF-FT allowlist" named in docs before it exists, and the font census missing the `font:` shorthand.
  - [ ] INC-929's guard debt — a static census for "an always-drawn live region carries aria-live and no role" (FN-1 and ODN-2 pin the two known consumers today).
  - [ ] The supervisor's check-brief rules that the executor's own checks can carry (the planted proof outside SCOPE — S431; the new-test-id and agents-line checks) enter the repository as conformance tests (G55: a rule only the supervisor can run is a records debt).
  - [x] Turn K2 (docs/governance/briefs/foundations-turn-k2.md; no migration; Lovable) — the kit's 22 non-null assertions (.claude/hooks/lib.ts, land.ts) become guards; the platform rule's guard: the non-null census (CF-NN-1/2) with its ratchet allowlist — 143 files hold the 979 older assertions at their counts (INC-932), a count only falls, the kit's stays at zero. INC-921 (the tree-scan time budget) stays on the kit's next turn. Final HEAD 6b3a461d; CI run 40403849904: queued when turn 34c-5's brief was sent (the supervisor reads it).
NEW-END
EDIT roadmap.md #2
OLD-BEGIN
  - [x] Records turn R4 (docs/governance/briefs/foundations-records-r4.md; no migration; the Claude Code executor; G41) — the block applier's fixes from records turn R3's reviewer (an edited file keeps its mode; a directory at a target refused before anything is placed; a failed placing a refusal; BA-6 sees FILE blocks); the slips S379–S454 appended to docs/governance/instructions-amendments.md §Slips; INC-938, INC-939 and INC-940 into the incident ledger ("Numbering: next free INC-941."); the roadmap's owed lines (INC-878, INC-885–INC-888, INC-898, INC-899, INC-902, INC-903, INC-786 / INC-821, INC-843); the sign-in and sign-up scenario suite's line renamed (its old "Turn 34" number belongs to speed turn S11). With it the records of 2026-10-23 → 2026-10-27 are in the repository (R1–R4). Final HEAD 52965564; CI run 40512047787: SUCCESS.
  - [ ] Turn 34e (docs/governance/briefs/foundations-turn-34e.md; no migration; Lovable; DEC-275) — INC-935: every CI job and every outside call carries a deadline — scripts/ci/with-deadline.sh (a deadline per try, one loud retry) on every install, `timeout-minutes` on every job and every step that reaches outside, the lanes reserve the temporary backend's ports (54320–54329) from the kernel's ephemeral range before any connection (the four "address already in use" lanes of 10-24 → 10-26); CF-CID-1/2, WDL-1…4; register row 59; DEC-240's lint step gates again (INC-846 fixed).
  - [ ] Turns 35–37 — speed S11 continued (DEC-261): the anonymous reference reads (the language bundles, the price units, a public legal text) behind cached GET routes — DEC-263's groundwork; the signed-in and staff modules still frozen in the vendor-seams allowlist (INC-877) onto the door.
OLD-END
NEW-BEGIN
  - [x] Records turn R4 (docs/governance/briefs/foundations-records-r4.md; no migration; the Claude Code executor; G41) — the block applier's fixes from records turn R3's reviewer (an edited file keeps its mode; a directory at a target refused before anything is placed; a failed placing a refusal; BA-6 sees FILE blocks); the slips S379–S454 appended to docs/governance/instructions-amendments.md §Slips; INC-938, INC-939 and INC-940 into the incident ledger ("Numbering: next free INC-941."); the roadmap's owed lines (INC-878, INC-885–INC-888, INC-898, INC-899, INC-902, INC-903, INC-786 / INC-821, INC-843); the sign-in and sign-up scenario suite's line renamed (its old "Turn 34" number belongs to speed turn S11). With it the records of 2026-10-23 → 2026-10-27 are in the repository (R1–R4). Final HEAD 52965564; CI run 40512047787: SUCCESS.
  - [x] Turn 34e (docs/governance/briefs/foundations-turn-34e.md; no migration; Lovable; DEC-275) — INC-935: every CI job and every outside call carries a deadline — scripts/ci/with-deadline.sh (a deadline per try, one loud retry) on every install, `timeout-minutes` on every job and every step that reaches outside, the lanes reserve the temporary backend's ports (54320–54329) from the kernel's ephemeral range before any connection (the four "address already in use" lanes of 10-24 → 10-26); CF-CID-1/2, WDL-1…4; register row 59; DEC-240's lint step gates again (INC-846 fixed). Final HEAD a308c6b3; FAILURE — lanes 3, 5 and 12 lost to the browser install's 300 s deadline (INC-943), lane 7 to a start deadlock (INC-944); every test that ran passed.
  - [ ] Records turn R5 (docs/governance/briefs/foundations-records-r5.md; no migration; Lovable; G41, G53) — the fix first: INC-943 (DEC-276) — the browser's system libraries (`bunx playwright install-deps chromium`) once with 1500 s and its download (`bunx playwright install chromium`) 900 s a try with one retry, in all five installs; the certificate tools' package install once; CF-CID-1's fifth rule (a package install runs once) and CF-CID-2's planted breach; then the handover: instructions v1.15 (docs/governance/claude-supervisor-instructions-v1.15.md, delivered for installation) with its amendment record and moved text; S455 and S456; docs/governance/handoffs/2026-10-27-foundations-handover.md and the running record 2026-10-23 → 2026-10-27; INC-941 → INC-944 and the later word on INC-940 and INC-935 ("Numbering: next free INC-945."); system-state.md's position; block S78; the owed roadmap lines below INC-939's.
  - [ ] Turns 35–37 — speed S11 continued (DEC-261): the anonymous reference reads (the language bundles, the price units, a public legal text) behind cached GET routes — DEC-263's groundwork; the signed-in and staff modules still frozen in the vendor-seams allowlist (INC-877) onto the door.
NEW-END
EDIT docs/_changelog.md #1
OLD-BEGIN
- Foundations turn 34e (2026-10-27; INC-935, DEC-275) — every CI job and every outside call carries a deadline: installs (bun, the browser, the certificate tools) run through scripts/ci/with-deadline.sh — a deadline per try and one retry, announced as a `ci-retry` warning; every job (but the one that calls the lanes' reusable workflow) and every step that reaches outside declares `timeout-minutes`; each lane reserves the temporary backend's ports 54320–54329 from Linux's ephemeral range in its first step, and a failed start writes who held them into its evidence. CF-CID-1/2 hold every workflow to the rules; WDL-1…4 hold the wrapper. And DEC-240's lint step in the smoke lane gates again (its rule: the difference named — INC-846, fixed on 53aa4e76 — and every run since matching the baseline).
OLD-END
NEW-BEGIN
- Foundations turn 34e (2026-10-27; INC-935, DEC-275) — every CI job and every outside call carries a deadline: installs (bun, the browser, the certificate tools) run through scripts/ci/with-deadline.sh — a deadline per try and one retry, announced as a `ci-retry` warning; every job (but the one that calls the lanes' reusable workflow) and every step that reaches outside declares `timeout-minutes`; each lane reserves the temporary backend's ports 54320–54329 from Linux's ephemeral range in its first step, and a failed start writes who held them into its evidence. CF-CID-1/2 hold every workflow to the rules; WDL-1…4 hold the wrapper. And DEC-240's lint step in the smoke lane gates again (its rule: the difference named — INC-846, fixed on 53aa4e76 — and every run since matching the baseline).

- Foundations records turn R5 (2026-10-27; G41, G53; INC-943, DEC-276) — first, the fix of turn 34e's first run: the browser's system libraries install once with 1500 s and its download 900 s a try with one retry, in all five browser installs, and the certificate tools' package install once — a package install cut off part-way cannot be repeated (CF-CID-1's fifth rule; the deadlines measured from 371 lane runs). Then the handover: the supervisor's instructions v1.15 (docs/governance/claude-supervisor-instructions-v1.15.md — v1.14 with 57 recorded moves and the rules G56–G59; its amendment record and the moved text in docs/governance/instructions-amendments.md), slips S455 and S456, the handoff (docs/governance/handoffs/2026-10-27-foundations-handover.md) and the running record of 2026-10-23 → 2026-10-27 beside it, INC-941 → INC-944 in the incident ledger ("Numbering: next free INC-945."), block S78, system-state.md's position and the owed roadmap lines. Nothing in the product changes.
NEW-END
FILE-BEGIN docs/governance/handoffs/2026-10-27-foundations-handover.md
# Handover — 2026-10-27: the Foundations bundle after turn 34e (supervisor thread → a fresh supervisor thread)

Written by the supervisor at records turn R5 (G53; the operator's approval of 2026-10-27 07:43 local: "a fresh supervisor thread after the records land, with tools saved to the Project first"). Times are UTC unless marked local (the operator's local time is UTC−4). The repository is the record; this file accelerates the session-start ritual, it does not replace it.

## 1. Read first, in this order

1. This file.
2. docs/governance/claude-supervisor-instructions-v1.15.md — the instructions to install (it carries every rule of v1.14; the text it dropped is in docs/governance/instructions-amendments.md under "Moved from the instructions at v1.15"). Until the operator pastes it into the Project, v1.14 governs.
3. docs/governance/system-state.md (the position of 2026-10-27, the handover), the tail of docs/spec/spec-ledger.md (block S78, then S77), roadmap.md (line 3 names the brief in force; the Foundations bundle's list), the brief line 3 names, the ci-evidence branch (ci-status, e2e-last-failure, guards-last-failure, flake-ledger whole, nightly-status), the tail of docs/tracking/incidental-findings.md.
4. The Project doc claude/supervisor-tools-2026-10-27.md — the supervisor's scripts (check-brief, the brief generators, the rehearsal and finalize scripts, the CI wait, the v1.15 builder and proof). A new thread writes each back to disk before it uses it.
5. docs/governance/handoffs/2026-10-27-foundations-running-record.md — the running record from 2026-10-23 to this handover, word for word (Lovable message ids, the Supabase project references and the Lovable project id replaced by bracketed labels — G51). Read it when a question needs the detail behind a ledger line.

## 2. Where things stand

- dev = `a308c6b3` (turn 34e) before records turn R5; main = `52965564` (records turn R4; run 40512047787 SUCCESS, promoted). Run 40519893778 on `a308c6b3`: FAILURE (14:41:16Z) — every test that ran passed (1,715 passed, 0 failed, 1 flaky: PW-30, shard 6), but lanes 3, 5 and 12 lost to the browser install's 300 s deadline (INC-943 — fixed in records turn R5) and lane 7 to a deadlock in its backend start (INC-944); main stays `52965564`.
- Turn 34e's first run (40519893778) was red on its own install deadline — lanes 3, 5 and 12 (INC-943: the supervisor's unmeasured 300 s, S456) — and lane 7 deadlocked in its start (INC-944, unrelated); every test that ran passed. Records turn R5 carries the fix first (DEC-276); its run is the first to read.
- Stage: Stage 1's legal section closed with bundle 22; the Foundations bundle (DEC-237 — before bundle 23) is built through turn 34e: the conformance kit, the route boundary (turns 2–14, 20), the AI gateway (turns 15–19), the dial registry, the speed turns S1–S11 (turns 23–34), the on-demand failure notice and the session door (34b, 34c, 34w), the executor kit for Claude Code (K1, K2), records turns R1–R4 and turn 34e (every CI job and outside call carries a deadline).
- The last Publish: `c1b6b4e5` (2026-10-26 14:0xZ). Everything since is unpublished (see §6).
- The newest migration: supabase/migrations/20261025011447_71ad0a58-….sql (turn 15's M2), declared mark `20261025150000`; none since (turns 16 → 34e and R1–R4 carry no migration). Its applies are recorded in block S77 (turn 15).
- The Foundation fixes tracker (a Claude Doc, "Foundation fixes — progress tracker", doc id a34bb5c9-ce31-48ea-a91d-5025edf0be56) is updated after every verified turn (the operator's standing rule, 2026-10-24) and opened for him when he asks.

## 3. The executors and their channels (G56)

- Lovable (DEC-006, DEC-020): writes to dev; its Knowledge v3.11 (mirror: docs/governance/lovable-knowledge.md). Its workspace ran out of credits on 2026-10-26 21:45Z and had credits again by 2026-10-27 11:43Z (07:43 local; turn 34e ran there). Price to the operator: $0.20 a credit on the annual plan, $0.28 as a top-up; an exact-copy turn costs about 7–11 credits (measured on turns 24, 25 and 30).
- The Claude Code executor (DEC-255–DEC-257): the kit — CLAUDE.md, .claude/rules, the hooks, `bun .claude/hooks/land.ts` (the one landing door, which re-runs every check), the reviewer subagent (it starts in the background whatever the call asks; the executor waits for it). `.github/workflows/**` and `.claude/**` are closed to it: workflow and kit changes go to Lovable. Every brief starts a NEW session, started by the operator, who pastes the carrier and brings back the final report. Its cloud credit: $127 of $250 left at 2026-10-27 11:06Z (the operator's usage page), expiring 2026-11-05 02:59 EST; records turns R2 v2, R3 and R4 ran on it since (ESTIMATE about $13 a turn — no measurement). When the credit ends, executor turns return to Lovable (G59).
- One executor works at a time: each landing rewrites roadmap line 3, which the other's scope reads.
- Channels: the Lovable connector (DEC-245 — briefs, rulings and "continue" only, one message per Lovable turn, never while it works; never query_database, enable_database, deploy_project, knowledge, visibility, project create/remix/move, skills, add_connector or Project progress; a "Modify Supabase database" pause is answered only on the operator's yes; Publish is his). The Supabase connector (DEC-246 — writes only on ethio-staging, only migration files already on dev, sha-checked and applied whole, the specific mark read back; ethio-prod read-only at most). Claude Code (DEC-256 — one message per executor turn; the supervisor never answers its permission prompts). When the operator is present he pastes a long brief himself: it is exact and costs the supervisor's plan nothing (a 69,000-character brief retyped through a connector call costs about 35,000 output tokens and risks S451's corruption).

## 4. How a turn is built and closed (G57–G59; the tools doc has the scripts)

1. Prototype: clone dev at the base, make the turn's whole end state in the working tree by scripts — STEP 0's hand edits included (S454) — and run the touched tests and red first there. The operator's lean rule binds the supervisor too: the prototype runs lint, typecheck, format and the touched tests; land.ts and CI run the whole suite.
2. Generate the brief from the prototype (EDIT blocks with unique OLD texts, FILE blocks, the hash list); every generator asserts roadmap line 3 names the brief at the end and no roadmap block touches line 3.
3. Rehearse it on a fresh clone of the base exactly as the executor will — the repository's block applier (`bash scripts/brief/apply-blocks.sh <saved brief> [--dry] [<path> …]`, register row 58) — and compare every file with the prototype; run check-brief.py (`--cc` for Claude Code) and read every hit; scan for secrets.
4. Carry it: Claude Code — a head line with sha256 and bytes, then BRIEF-BEGIN … BRIEF-END; Lovable — at most 100,000 characters per message, a larger file attached and copied by cp, every file proven by the hash list. For the applier to work in a Lovable turn, STEP 0 changes line 3 first and every FILE/EDIT marker starts its line (turn 34e could not use it: its scope was named in Part D and its FILE markers followed "BLOCK n —" on the same line; it copied the blocks by a one-off script, the hashes proving every file — accepted).
5. Verify the landing (brief sha, hash list, files against SCOPE and the prototype, line 3, side branches — eleven lovable-* plus hold/executor-kit-install —, secrets), then read CI on the landing's head: a background command polls the Actions API at no model cost and wakes the supervisor once (G57). No scheduled check for a Claude Code turn — the operator brings its report; a Lovable turn gets checks only when he says he is away. CI runs queue (DEC-181): a newer push replaces only a queued run.
6. Update the tracker; record the turn in the running record; build the next brief before the current lands (the operator's D234 directive).
7. Quality is never traded for cost (G59; the operator, 2026-10-27 07:10 and 07:43 local: "we dont want to compromize on quality of work we do"; "I dont want claude or lovable to compromize quality"). Briefs are prototype-exact by default; while the Claude Code credit lasts a lower-risk turn (tests, tooling, screens) may be spec-built with exact tests, the full consumer census, the reviewer, CI and the supervisor's full diff review — never a turn that touches sign-in, permissions, migrations or personal data.

## 5. The work queue, in order

The operator's order (block S77): the Foundations bundle (the speed turns included), then the Sage redesign and the left rail, then Stage 2; bundle 23 (D222's business-name rule) and Stage 1's last part follow the Foundations bundle. Fewer, bigger turns.

0. Read records turn R5's run: the browser installs split (DEC-276's judge starts there — 20 runs, no install step failing by its deadline), main promoted.
1. INC-940 — AP-36 ("the layout follows the article's width", e2e/ad-page.spec.ts) failed then passed on retry four times in seven days, all desktop-1280 on shard 9: read the four bodies first (G21), then fix at the root with its proof (the Flake check workflow, DEC-184 — never a local repeat run).
2. Turn 34c-4 — the E2E side of the storage name and the client hand-off: e2e/helpers/session.ts :61 `storageKey()` and the page scripts that look for any `sb-*-auth-token` onto the door's names; turn 34d's reviewer MINORs 2–5 on the route guard; INC-937's site in the route guard.
3. INC-937 — a caught error's text read through `errorText` in e2e/ and scripts/ as in src/: the census reads all three folders; the 40 hand reads move onto it.
4. INC-938 — `bun run typecheck` covers scripts/ and .claude/hooks/ (a Lovable turn for the kit's files, or split); with it the block applier's two MINORs from records turn R4's reviewer — the placing-failure message says what was placed (repository paths) and that branch gets a test.
5. INC-941 (Lovable — workflows) — the CI deadline census enumerates by its definition: pip, git clone and git fetch through scripts/ci/with-deadline.sh and every downloading `uses:` step with a step timeout, CF-CID naming each, a planted bypass for each.
6. INC-944 — lane 7's start deadlock: on its next occurrence the start's evidence names the second database session (read before the CLI stops its containers, or the start re-run once with `--debug`); then fixed at its root, never retried away. INC-936 — the nightly's red nights read whole (AP-41 three nights running, LG-21) and every class dispositioned in a ruling; its length (280–358 minutes against GitHub's 360) and the heartbeat on a cancelled run.
7. INC-939 (a migration — Tier A, Lovable or the Claude Code executor with the operator's SUPABASE_PROD_MIGRATE_TOKEN; never spec-built) — each storage bucket allows only what its door allows (allowed_mime_types and file_size_limit on listing-photos and category-assets).
8. The speed study (DEC-266's REVISIT branch) before turns 35–37; then turns 35–37 (speed S11 continued, DEC-261/DEC-263); then the speed items after turn 37 (DEC-265, INC-900).
9. The remaining Foundations mechanisms (roadmap line 3's "Next"): the form kit, the door mechanism, locale/format, QueryState/Button/Picture/a11y, one ListingDetail + safeHref, t(key, values) + plurals; the sign-in and sign-up scenario suite (turn 32's census plus a sign-up with an already-registered e-mail); the owed lines under the bundle (INC-849, INC-850, INC-878, INC-885–INC-888, INC-898, INC-899, INC-902, INC-903, INC-786/INC-821, INC-843, INC-942, the records-owed lines of R5).
10. Before Stage 2: the operator's Sage 3D redesign and the left rail's new behaviour (his design files of 2026-10-25; the display face's DEC owed) — the supervisor reminds him before the stage starts.

## 6. The operator's steps owed

1. Install v1.15: replace the Project's instructions with docs/governance/claude-supervisor-instructions-v1.15.md (the file the supervisor sent), then start the fresh supervisor thread with the one line the supervisor gave him.
2. INC-930: an offline sign-out from a page whose marketplace code never downloaded — (a) stay on that page, signed out, until the connection returns, or (b) fetch the marketplace's code ahead for a signed-in visitor (measured: at most 13.5 KiB compressed). The supervisor recommends (b).
3. Publish dev's head (the last Publish `c1b6b4e5`), then one walk of everything since — the walk's lines are the new supervisor's to write (G31), from the code as landed: the on-demand failure notice (34b-2/34b-3), the phone menu without its × (D238), a signed-out /settings sent to sign in (INC-925), the offline sign-out (DEC-271), the peek (INC-924), the session read (34c-1 → 34c-5), the speed turns' visible changes (the phone's own fonts, turn 33).
4. Per Claude Code session: the model (Sonnet for records and exact-copy turns, Opus when a brief leaves reasoning to the executor).
5. Before the first migration turn in Claude Code: SUPABASE_PROD_MIGRATE_TOKEN in its environment (typed only into that dialog, never in chat).
6. Carried from blocks S76–S77: the Privacy Policy v2 and publishing statement v2 import; the Afaan Oromo texts' import; the real legal phone number and the copyright agent's details; the DMCA registration; the MAU figure weekly until 31 Oct (INC-782); GitHub → Insights → Traffic (G51); the PROMOTE_TOKEN renewal before 2027-01-18; code scanning #419's dismissal; a native speaker's read of the Amharic and Afaan Oromo legal texts before launch.

## 7. Open incidents and watches (the ledger has each in full)

INC-936 (the nightly), INC-937, INC-938, INC-939, INC-940, INC-941, INC-942, INC-943 (fixed in R5 — closes on DEC-276's judge), INC-944 (the start deadlock), PW-30 at two flake lines in seven days (the `null as unknown as T` casts on RPC arguments — eleven in five files), INC-930 (the operator's choice), INC-921 (census tests without TREE_SCAN_MS time out under a full local load; CI passes them — CF-SL-1 did so again in turn 34e), INC-913 (DEC-266's timing half rides the speed study), INC-906 (ML-4, MLA-6, CO-4 watched), SO-12 and PW-54 at two flake lines each (a third is an INC), INC-837 (an allowlist expiry), INC-849 (null on a door error). The flake ledger is read whole at every CI read (§8); the nightly's status and date at every read (S452).

## 8. Records — where each lives and the numbers

- Decisions and the session log: docs/spec/spec-ledger.md (blocks S77, S78). Incidents: docs/tracking/incidental-findings.md. Slips: docs/governance/instructions-amendments.md §Slips (S379–S456). Mechanisms: docs/governance/mechanisms.md (rows 1–59; row 13 is numbered twice — a records-owed line). The queue: roadmap.md. Briefs and reports: docs/governance/briefs/, docs/governance/reports/.
- Next free numbers after this handover: DEC-277, D239, INC-945, S457, ACT-021.
- The Project keeps: these instructions v1.14 and v1.15, Knowledge v3.11, the tools doc, the systems audit, the specs and studies, and the running-record parts.

## 9. Pitfalls this thread paid for

- Every deadline, ceiling or size a brief sets is computed from CI's own history — the Actions API's step times, the median, the 99th percentile and the maximum over at least 300 runs of the step, shown in the brief — and a retry is put only where re-running is safe (S456, INC-943, DEC-276: turn 34e's unmeasured 300 s install deadline cost its green).
- A brief's expected result is produced by running it on the turn's true end state, STEP 0 included (S454); a brief's own sentences agree with its blocks (S455).
- A long text is never retyped into a send call (S451); a long brief is pasted by the operator or carried as a file and saved by a scripted copy.
- A Lovable turn's applier use needs line 3 changed at STEP 0 and markers at line start (turn 34e).
- The nightly is read at every CI read (S452).
- The supervisor's sandbox: `git clone` copies commits only (a prototype's uncommitted changes are copied with `cp -a`); a script is never run from a directory it deletes; `pkill -f` never with a pattern that matches its own shell; foreground sleep is blocked (background commands are fine); the network proxy refuses supabase.co, fonts, the published site and storage.googleapis.com; the Actions API and raw.githubusercontent.com are reachable unauthenticated; the session's GitHub connection answers 403 for this repository (G51 — attach and test before the repository goes private).
- Estimates wear their label and wrong ones are recorded (G5): the supervisor estimated v1.15 about 40% shorter than v1.14; it is 5% shorter, because v1.14 is mostly rules.

## 10. The fresh thread's first turn

Read-only: the §2 ritual of v1.15 (this file first), the tools written back to disk from the Project doc, then a short list to the operator — dev and main, CI on dev's head, the turn in flight (none at this handover), the operator steps owed (§6), the next planned turn (§5 item 1) — and ask him to confirm before any brief is sent. Nothing the record answers is asked (G40).
FILE-END docs/governance/handoffs/2026-10-27-foundations-handover.md
```
