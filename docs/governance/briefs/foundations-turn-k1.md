# Foundations — turn K1: the independent review gates every landing; the scheduling rule reads programs, not words (INC-889); the kit's tests state their time (INC-890) — the executor kit: brief (saved unchanged, 2026-10-26)

```text
FOUNDATIONS — TURN K1 (2026-10-26; DEC-255 — the Claude Code executor kit; the operator, 2026-10-26: "I thought its reviewer report are good … instruct it to wait for reviewer report each time … in its rule block so it does get independent reviewer report"; anchors located at e024c36e032b356339c299da59bea347bd827fc8). Tier B (the executor's own guard rails; CI infrastructure). No migration. No new string. No package change. No file deleted. No AGENTS.md change. Base: dev e024c36e032b356339c299da59bea347bd827fc8 (turn 34's final commit). WHY LOVABLE: the kit's files (.claude/**) are never edited by the Claude Code executor — its own scope guard refuses them (.claude/hooks/lib.ts NEVER_EDIT), so it cannot loosen its own rails. ONE TURN. Parts, IN THIS ORDER: A — CI first; STEP 0; B — the gate; C — the scheduling rule and the tests' time; then THE CHECKS, the report and the end.
BASE: e024c36e032b356339c299da59bea347bd827fc8
FLAGS: no-migration, no-new-string, no-package-change, no-agents-change
SCOPE-BEGIN
.claude/hooks/lib.ts
.claude/hooks/land.ts
.claude/hooks/bash-guard.ts
.claude/agents/reviewer.md
.claude/rules/00-executor-protocol.md
.claude/rules/60-report.md
.claude/skills/turn-report/SKILL.md
scripts/conformance/executor-hooks.test.ts
SCOPE-END

THE SYSTEM (G0) — three concerns: the review gate; INC-889; INC-890.
CONCERN: every executor turn that ends with a completion report is read by the independent reviewer before it lands, and the reviewer's verdict rides the report.
MECHANISM: the `reviewer` subagent (.claude/agents/reviewer.md), called by the turn-report skill (.claude/skills/turn-report/SKILL.md §3) — today the skill says to invoke it but not to wait for it, and nothing checks that it ran: turn 32's executor started it in the background and landed before it answered; its findings (INC-908) arrived after the landing. B makes the review a gate: the reviewer ends with one fixed line (`Review: READY · <n> BLOCKER · <n> MAJOR · <n> MINOR · on <sha>`), the skill and the protocol run it in the FOREGROUND after the end-to-end check and copy that line into the report's third line, and land.ts refuses a final report without the line, with a BLOCKER in it, or naming another commit than the last code commit (`reviewLineProblem`, .claude/hooks/lib.ts).
CONSUMERS (grep at BASE): the reviewer's callers — .claude/skills/turn-report/SKILL.md :34-:38; .claude/rules/00-executor-protocol.md :63 (step 7, the report); the report's form — .claude/rules/60-report.md :4-:11; the landing — .claude/hooks/land.ts :240-:271 (the final-report checks); the tests that land a final report — scripts/conformance/executor-hooks.test.ts EXH-12 (:637). Stop reports (STOP, QUESTION, MIGRATION) are not final reports and need no review — unchanged.
COVERED HERE: every consumer above. LEFT: none.
CONFORMANCE GUARD: NEW EXH-20 in scripts/conformance/executor-hooks.test.ts — a planted turn whose final report carries no review line, then a BLOCKER, then a review of another commit is refused each time, and lands once the line is right; EXH-12's planted reports carry a review line.
EXCEPTIONS: none.
FIVE LENSES — security: the review cannot be skipped by the executor (land.ts refuses), and the kit stays outside its own scope (NEVER_EDIT unchanged) · performance: none (one regular expression on the report) · failure modes: a reviewer that cannot run is a STOP, never a silent skip; a fix after the review forces the review again (the line names its commit) · consistency: one line, one form, written by the reviewer and read by land.ts · future growth: a second reviewer (security, accessibility) is one more line of the same form.
FORWARD-SCAN: every later Claude Code turn lands through this gate. REGISTER: none (the kit's own rails; recorded by the records turn).

INC-889 (registered 2026-10-25). CONCERN: a guard rule about a program refuses that program where the shell would run it — never a word in a message, a quoted argument or a heredoc body. MECHANISM: the kit's quote- and heredoc-aware tokenizer, shellSegments (.claude/hooks/lib.ts), and the wrapper-skipping that writeTargets already does inline — C1 lifts that skipping into one exported `segmentProgram(tokens)` (writeTargets uses it, unchanged in behaviour) and adds `programsOf(command)`, the program each segment runs. CONSUMERS (grep at BASE: every DENY rule of .claude/hooks/bash-guard.ts that names a program at a segment start, `(^|[\s;&|(`])…`): the scheduling rule (:164: crontab, at, systemctl, service, launchctl — refuses "fix at the root", "look at this", "the service role", "echo at") → moved onto programsOf (C2); the Claude rule (:160) and the eval rule (:139) → EXCEPTIONS below; the inline-shell and inline-interpreter rules (:141, :145) and the `source <(` rule (:158) read an argument pattern beside the program, not the bare word — unchanged. CONFORMANCE GUARD: NEW EXH-21 — programsOf reads through wrappers, assignments, pipes, `$(`, parentheses and heredocs; nine spellings of scheduling refused; four data words allowed (red on BASE's guard: the supervisor ran BASE's bash-guard.ts on `git commit -m "turn 35: fix at the root; the service role reads it"`, `grep -n "look at this" src/lib/uuid.ts` and `echo at` — each exit 2, "no scheduling or service control"). EXCEPTIONS: the Claude rule stays a text rule on purpose — it must also catch `npx claude` and `bunx @anthropic-ai/claude-code`, which a program-position reading would miss, and "claude" as a bare lowercase word in data is rare; the eval rule stays a text rule (fail-closed; "eval" in data is rare). FIVE LENSES — security: the scheduling refusal now also covers atq, atrm and batch, and reads the normalised and the original text, as every rule does · performance: one tokenisation per command · failure modes: a word in data is no longer refused; a program the tokenizer cannot see (a `$VAR` program) is refused by nothing new and nothing less than before for this rule's words — the stop gate's diff check stays the authority · consistency: one reading of "the program a segment runs" for the write targets and the program rules · future growth: a new program rule is a set of names over programsOf.

INC-890 (registered 2026-10-25). CONCERN: a test states the time it needs, so a slower sandbox than CI's does not cut it short. MECHANISM: one constant, GIT_HEAVY_MS (120 s), on the suites that build scratch repositories — "the landing door", "the session setup", "the stop gate" — and on the shared setup (beforeAll). CONSUMERS: EXH-9 … EXH-15, EXH-17 … EXH-20 (the tests of those suites) and the beforeAll that builds the seed repository; the bash-guard and scope-guard suites run one hook per case and keep vitest's default. CONFORMANCE GUARD: none beyond the run itself (a guard would test the test file's own text); your sandbox's run of the file is the proof. EXCEPTIONS: none. FIVE LENSES — security, performance: none · failure modes: a test that truly hangs still fails, after 120 s · consistency: one budget for one kind of test · future growth: a new scratch-repository test inherits its suite's budget.

STEP 0 — save this brief (the text between the BRIEF-BEGIN and BRIEF-END lines of the message that carried it, title line and fence included, ending with the closing fence and ONE newline) byte for byte as docs/governance/briefs/foundations-turn-k1.md and paste its sha256sum and its byte count (the carrying message states both; a difference is a STOP). roadmap.md: on line 3, the text after "The brief in force: " up to its closing parenthesis becomes `docs/governance/briefs/foundations-turn-k1.md (Foundations turn K1: the independent review gates every landing; the scheduling rule reads programs, not words (INC-889); the kit's tests state their time (INC-890) — the executor kit, the operator 2026-10-26)` (everything after it stays); directly after the line that begins "  - [ ] Turn 34b —" add this line:
  - [ ] Turn K1 (docs/governance/briefs/foundations-turn-k1.md; no migration; Lovable — the kit's files are outside the Claude Code executor's scope) — the independent review gates every landing: the reviewer runs in the foreground before the report, its last line rides the report's third line, and land.ts refuses a final report without it, with a BLOCKER in it, or reviewed on another commit (EXH-20); the scheduling rule reads the programs a command runs, not words in its data (INC-889, EXH-21); the scratch-repository tests state their time (INC-890).
Tick nothing else.

HOW TO WORK
- Order: Part A (paste `git rev-parse HEAD`: this is <START>); STEP 0; Part B; THE CHECKS; THE COMPLETION REPORT; END THE TURN. Do not stop anywhere else. If the platform ends a turn early, report three lines (done, left, CI) with the done parts by letter and `git diff --name-only <START>`; the supervisor sends "continue".
- Run no stateful git command. Every EDIT block replaces its OLD text (exactly once at BASE) with its NEW text, in the order given; copy them by script or your file-editing tool, never retyped. THE CHECKS run the brief's own hash list against the tree (`sha256sum -c`); a mismatch is fixed by copying the block again, never by editing an expectation.
- THE FILES: the SCOPE block above, plus docs/governance/briefs/foundations-turn-k1.md, roadmap.md and docs/governance/reports/foundations-turn-k1.report.md (your completion report). Anything else is a STOP naming the file and why.
- Your platform rule stands: "Do not run the Lovable project's builds or typechecks manually because the harness runs them automatically." After Part B, read /tmp/observability/build-errors.log and fix every `error TS` line at its root.
- Part C gives the scratch-repository tests a 120 s budget (INC-890), so they are expected to pass in your sandbox now. If one still times out, do not change, skip or work around it: paste its failure line under limits; CI's unit job runs it on the landing. Every other test must pass.
- Behaviour contract: every hook allows and refuses exactly what it does today, except (1) land.ts, which now also refuses a final report without the review line, with a BLOCKER in it, or naming another commit than the last code commit — stop reports land as today; and (2) bash-guard.ts, whose scheduling rule now refuses crontab, at, atq, atrm, batch, systemctl, service and launchctl where a segment runs them, and no longer refuses those words in data. writeTargets returns exactly what it returns today (EXH-0 and EXH-6 unchanged). Nothing else changes.
- Knowledge K: K1 the mechanisms above; K2 the report lists every other place in .claude/ that tells the executor to start an agent or a long command in the background before landing (file:line), or "none" after the grep, and every other DENY rule in bash-guard.ts that a word in data can trip (file:line, an example), or "none"; K3 EXH-20 and EXH-21 land with their mechanisms; K4–K6 do not arise.
- Tests (G27, G38): no real row; no assertion loosened; EXH-12's reports gain the line, its expectations are unchanged.
- If any rule of yours conflicts with this text, STOP before saving and quote that rule's exact words in the report.

PART A — CI FIRST.
A1. Paste `git rev-parse HEAD` (<START>; it must be BASE — if not, paste `git diff --name-only BASE..HEAD`; a path in SCOPE is a STOP). Read CI at https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md (the first six lines; the SHA is BASE's), then e2e-last-failure.md and guards-last-failure.md at the same address; a red on BASE is fixed first at its root and named in the report.

PART B — THE GATE.
B1. .claude/hooks/lib.ts, these edits (the review line and its reader; Part C's `segmentProgram` and `programsOf`, which writeTargets now uses):
EDIT .claude/hooks/lib.ts #1
OLD-BEGIN

/** Where the turn's reports live (committed, read by the supervisor from a fresh clone). */
OLD-END
NEW-BEGIN

/**
 * The independent review gates the landing (the operator, 2026-10-26: every turn gets the
 * reviewer's report). A final report carries the reviewer's last line, word for word, as its own
 * line: "Review: READY|NOT READY · <n> BLOCKER · <n> MAJOR · <n> MINOR · on <sha>" — the review
 * ran on the last code commit, and no BLOCKER stands.
 */
export const REVIEW_LINE =
  /^Review: (READY|NOT READY) · (\d+) BLOCKER · (\d+) MAJOR · (\d+) MINOR · on ([0-9a-f]{7,40})$/m;

/** Why a final report's review line does not gate the landing, or null when it does. */
export function reviewLineProblem(reportText: string, lastCode: string): string | null {
  const line = REVIEW_LINE.exec(reportText);
  if (line === null)
    return 'it carries no review line ("Review: READY|NOT READY · <n> BLOCKER · <n> MAJOR · <n> MINOR · on <sha>"). Run the reviewer subagent in the foreground on the last code commit, wait for its answer, and copy its last line into the report word for word.';
  const blockers = Number(line[2]);
  const sha = (line[5] ?? "").slice(0, 7);
  if (blockers > 0)
    return `the review counts ${blockers} BLOCKER(s): fix each in a new commit, run the reviewer again and copy its new last line — or land a STOP report for a ruling.`;
  if (sha !== lastCode.slice(0, 7))
    return `the review ran on ${sha}, not on the last code commit ${lastCode}: a commit after the review needs the review again.`;
  return null;
}

/** Where the turn's reports live (committed, read by the supervisor from a fresh clone). */
NEW-END
EDIT .claude/hooks/lib.ts #2
OLD-BEGIN
/**
 * Paths a command writes to: redirection targets plus the targets of the programs that write files.
 * A target the shell would expand comes back with a `$` marker so the guard can refuse it as
 * not literal. Accepts a command line (all segments) or one tokenised segment.
 */
export function writeTargets(input: string | ShellToken[]): string[] {
  if (typeof input === "string") return shellSegments(input).flatMap((t) => writeTargets(t));
  const toks = input;
  const out: string[] = [];
  const mark = (t: ShellToken) => (t.dynamic && !/[$~*?[]/.test(t.v) ? `$${t.v}` : t.v);
  const words: ShellToken[] = [];
OLD-END
NEW-BEGIN
/**
 * One segment's program and its arguments: redirections and their targets set aside, then the
 * assignments and wrappers the shell runs it through skipped (timeout 900 cmd, nice -n 5 cmd,
 * env -i X=1 cmd, sudo cmd). `redirects` holds the redirection targets, `program` the base name
 * of the program the shell would run ("" when there is none), `args` its argument tokens.
 */
export function segmentProgram(toks: ShellToken[]): {
  program: string;
  args: ShellToken[];
  redirects: ShellToken[];
} {
  const redirects: ShellToken[] = [];
  const words: ShellToken[] = [];
NEW-END
EDIT .claude/hooks/lib.ts #3
OLD-BEGIN
      const target = toks[k + 1];
      if (target !== undefined && target.op === undefined) out.push(mark(target));
      k += 1;
OLD-END
NEW-BEGIN
      const target = toks[k + 1];
      if (target !== undefined && target.op === undefined) redirects.push(target);
      k += 1;
NEW-END
EDIT .claude/hooks/lib.ts #4
OLD-BEGIN
  }
  // skip assignments and wrappers (timeout 900 cmd, nice -n 5 cmd, env -i X=1 cmd)
  let w = 0;
OLD-END
NEW-BEGIN
  }
  let w = 0;
NEW-END
EDIT .claude/hooks/lib.ts #5
OLD-BEGIN
  }
  const cmd = (words[w]?.v ?? "").replace(/^.*\//, "");
  const argToks = words.slice(w + 1);
  const args = argToks.map(mark);
OLD-END
NEW-BEGIN
  }
  return {
    program: (words[w]?.v ?? "").replace(/^.*\//, ""),
    args: words.slice(w + 1),
    redirects,
  };
}

/**
 * INC-889 — the programs a command line runs, one per segment, in order: what a rule about a
 * program (scheduling, a Claude session, eval) reads, so a word in a message, a quoted argument
 * or a heredoc body ("fix at the root", "the service role") is never taken for a program.
 */
export function programsOf(cmd: string): string[] {
  return shellSegments(cmd)
    .map((toks) => segmentProgram(toks).program)
    .filter((program) => program !== "");
}

/**
 * Paths a command writes to: redirection targets plus the targets of the programs that write files.
 * A target the shell would expand comes back with a `$` marker so the guard can refuse it as
 * not literal. Accepts a command line (all segments) or one tokenised segment.
 */
export function writeTargets(input: string | ShellToken[]): string[] {
  if (typeof input === "string") return shellSegments(input).flatMap((t) => writeTargets(t));
  const mark = (t: ShellToken) => (t.dynamic && !/[$~*?[]/.test(t.v) ? `$${t.v}` : t.v);
  const { program: cmd, args: argToks, redirects } = segmentProgram(input);
  const out: string[] = redirects.map(mark);
  const args = argToks.map(mark);
NEW-END
B2. .claude/hooks/land.ts, these edits (the final report's review line checked after its commit line):
EDIT .claude/hooks/land.ts #1
OLD-BEGIN
  reportPaths,
  lines,
OLD-END
NEW-BEGIN
  reportPaths,
  reviewLineProblem,
  lines,
NEW-END
EDIT .claude/hooks/land.ts #2
OLD-BEGIN
    );
  const unlisted = paths.filter((f) => f !== reportFile && !reportText.includes(f));
OLD-END
NEW-BEGIN
    );
  const reviewProblem = reviewLineProblem(reportText, lastCode);
  if (reviewProblem !== null) fail("6 final report", `${reportFile}: ${reviewProblem}`);
  const unlisted = paths.filter((f) => f !== reportFile && !reportText.includes(f));
NEW-END
B3. .claude/agents/reviewer.md, this edit (its last line, in the one form):
EDIT .claude/agents/reviewer.md #1
OLD-BEGIN
Severity per finding: BLOCKER (a law broken), MAJOR (a contract or proof gap), MINOR. End with one
line: READY / NOT READY, and the count by severity. Never soften a finding because the brief asked for
the change; the brief can be wrong, and that is a finding too.
OLD-END
NEW-BEGIN
Severity per finding: BLOCKER (a law broken), MAJOR (a contract or proof gap), MINOR. End with exactly
one line, the last of your answer, in this form (the executor copies it into its report word for word,
and land.ts reads it):

Review: READY · <n> BLOCKER · <n> MAJOR · <n> MINOR · on <sha>

— NOT READY instead of READY when any BLOCKER stands; `<sha>` is `git log -1 --format=%h --abbrev=7
HEAD`, the commit you read. Never soften a finding because the brief asked for the change; the brief
can be wrong, and that is a finding too.
NEW-END
B4. .claude/skills/turn-report/SKILL.md, this edit (§3: in the foreground, waited for, copied):
EDIT .claude/skills/turn-report/SKILL.md #1
OLD-BEGIN
Invoke the `reviewer` subagent on the diff (it reads the brief and the rules itself; tell it nothing
about what you expect). Every BLOCKER is fixed before the report; every MAJOR is fixed or listed under
Departures with the reason; MINOR findings are listed.
OLD-END
NEW-BEGIN
Every turn that ends with a completion report gets the review; a STOP, QUESTION or MIGRATION stop does not.

1. Run it after THE END-TO-END CHECK, on the last code commit: nothing is committed between its
   answer and the report except a BLOCKER fix.
2. Invoke the `reviewer` subagent in the FOREGROUND — the Agent call with `run_in_background: false` —
   and wait for its answer. Never start it in the background, never write the report or land before it
   answers, never skip it for a stop gate or the turn's length; a review that cannot run is a STOP.
3. Tell it nothing about what you expect: it reads the brief and the rules itself.
4. Every BLOCKER is fixed in a new commit, and the reviewer runs again on that commit.
5. Every MAJOR and MINOR is fixed when the fix lies inside SCOPE and the brief's exact text allows it;
   otherwise it is listed under Departures with the reason, for the supervisor's ruling.
6. Copy its last line — `Review: READY · <n> BLOCKER · <n> MAJOR · <n> MINOR · on <sha>` — word for
   word as the report's third line. `land.ts` refuses a final report without it, with a BLOCKER in it,
   or naming another commit than the last code commit.
NEW-END
B5. .claude/rules/00-executor-protocol.md, this edit (step 7):
EDIT .claude/rules/00-executor-protocol.md #1
OLD-BEGIN
7. **THE COMPLETION REPORT** (`60-report.md`) is written to
OLD-END
NEW-BEGIN
7. **THE INDEPENDENT REVIEW, then THE COMPLETION REPORT.** After THE END-TO-END CHECK the `reviewer`
   subagent runs on the last code commit, in the FOREGROUND, and the turn waits for its answer — it is
   never started in the background, never skipped, never cut short by a stop gate or the turn's length
   (the turn-report skill, step 3). Every BLOCKER is fixed in a new commit and the reviewer runs again;
   every MAJOR and MINOR is fixed inside SCOPE when the brief's exact text allows it, otherwise listed
   under Departures for a ruling. Its last line goes into the report word for word (`land.ts` refuses a
   final report without it). THE COMPLETION REPORT (`60-report.md`) is written to
NEW-END
B6. .claude/rules/60-report.md, these edits (the third line; what land.ts refuses):
EDIT .claude/rules/60-report.md #1
OLD-BEGIN
of `dev`; it is part of the project record. `land.ts` refuses to push while a heading is missing, while
the report does not name the last code commit, or while a landed path is missing from section 2.

OLD-END
NEW-BEGIN
of `dev`; it is part of the project record. `land.ts` refuses to push while a heading is missing, while
the report does not name the last code commit, while a landed path is missing from section 2, or while
the review line is missing, counts a BLOCKER or names another commit than the last code commit.

NEW-END
EDIT .claude/rules/60-report.md #2
OLD-BEGIN
Base: <BASE sha> · Final commit: <sha of the last code commit> · Brief: docs/governance/briefs/<file> (sha256 <value>)

OLD-END
NEW-BEGIN
Base: <BASE sha> · Final commit: <sha of the last code commit> · Brief: docs/governance/briefs/<file> (sha256 <value>)
Review: <the reviewer's last line, word for word — READY · <n> BLOCKER · <n> MAJOR · <n> MINOR · on <the last code commit>>

NEW-END
B7. scripts/conformance/executor-hooks.test.ts, these edits (EXH-12's reports carry the line; EXH-20; and, for Part C, EXH-21 and the time budgets):
EDIT scripts/conformance/executor-hooks.test.ts #1
OLD-BEGIN
import { spawnSync } from "node:child_process";
import { normaliseCommand, writeTargets, commandSegments } from "../../.claude/hooks/lib";

OLD-END
NEW-BEGIN
import { spawnSync } from "node:child_process";
import {
  normaliseCommand,
  writeTargets,
  commandSegments,
  programsOf,
} from "../../.claude/hooks/lib";

/**
 * INC-890 — the tests that build scratch repositories and run the hooks against them (git init,
 * clones, a pre-receive hook, land.ts) take seconds, more in a slow sandbox than in CI; vitest's
 * default of 5 s per test cut them short there. Their suites and the shared setup state a budget.
 */
const GIT_HEAVY_MS = 120_000;

NEW-END
EDIT scripts/conformance/executor-hooks.test.ts #2
OLD-BEGIN
  repo = freshClone("work").dir;
});

OLD-END
NEW-BEGIN
  repo = freshClone("work").dir;
}, GIT_HEAVY_MS);

NEW-END
EDIT scripts/conformance/executor-hooks.test.ts #3
OLD-BEGIN

  it("EXH-16 every command the protocol requires passes BOTH layers — the permission rules and the guard; the forbidden ones are denied by the rules too", () => {
OLD-END
NEW-BEGIN

  it("EXH-21 scheduling and service control are refused where the shell runs them, never as a word in data (INC-889)", () => {
    expect(programsOf("timeout 900 nice -n 5 env X=1 at now; ls | xargs atq")).toEqual([
      "at",
      "ls",
      "atq",
    ]);
    expect(programsOf("cat <<'EOF' > /tmp/n.txt\nat 5 pm\nEOF")).toEqual(["cat"]);
    for (const command of [
      "at now",
      "echo 'touch x' | at now + 1 minute",
      "timeout 5 at now",
      "X=1 at now",
      "sudo systemctl restart nginx",
      "(crontab -l)",
      "echo $(service nginx status)",
      "nohup launchctl list",
      "ls; atq",
    ])
      refused(command, /no scheduling or service control/);
    for (const command of [
      'git commit -m "turn 35: fix at the root; the service role reads it"',
      'grep -n "look at this" src/lib/uuid.ts',
      "cat <<'EOF' > /tmp/note.txt\nat 5 pm the service starts\nEOF",
      "echo at",
    ])
      allowed(command);
  });

  it("EXH-16 every command the protocol requires passes BOTH layers — the permission rules and the guard; the forbidden ones are denied by the rules too", () => {
NEW-END
EDIT scripts/conformance/executor-hooks.test.ts #4
OLD-BEGIN

describe("the landing door (land.ts)", () => {
  it("EXH-9 refuses a dirty tree, a landing without a report, a thin stop report and a migration stop without its pairing line", () => {
OLD-END
NEW-BEGIN

describe("the landing door (land.ts)", { timeout: GIT_HEAVY_MS }, () => {
  it("EXH-9 refuses a dirty tree, a landing without a report, a thin stop report and a migration stop without its pairing line", () => {
NEW-END
EDIT scripts/conformance/executor-hooks.test.ts #5
OLD-BEGIN
    const report = (commitLine: string, body: string) =>
      `# Turn 99 — planted\nBase: x · Final commit: ${commitLine} · Brief: planted\n${body}\n`;
    write(dir, FINAL, report("0000000", SECTIONS));
OLD-END
NEW-BEGIN
    const report = (commitLine: string, body: string) =>
      `# Turn 99 — planted\nBase: x · Final commit: ${commitLine} · Brief: planted\nReview: READY · 0 BLOCKER · 0 MAJOR · 1 MINOR · on ${commitLine}\n${body}\n`;
    write(dir, FINAL, report("0000000", SECTIONS));
NEW-END
EDIT scripts/conformance/executor-hooks.test.ts #6
OLD-BEGIN

  it("EXH-13 when dev moved under the turn, the door parks the commits on hold/<brief> and the stop gate lets the turn end", () => {
OLD-END
NEW-BEGIN

  it("EXH-20 a final report lands only with the reviewer's last line: present, no BLOCKER, run on the last code commit", () => {
    const { dir, origin } = freshClone("land-review");
    write(dir, "src/server/ai/new.ts", "export const x = 1;\n");
    const code = commit(dir, "turn 99 part B: new module").slice(0, 7);
    const report = (review: string) =>
      `# Turn 99 — planted\nBase: x · Final commit: ${code} · Brief: planted\n${review}${SECTIONS}\n\nsrc/server/ai/new.ts\n`;
    write(dir, FINAL, report(""));
    commit(dir, "turn 99: report (no review)");
    expect(land(dir).err).toMatch(/carries no review line/);
    write(dir, FINAL, report(`Review: NOT READY · 1 BLOCKER · 0 MAJOR · 0 MINOR · on ${code}\n`));
    commit(dir, "turn 99: report (a blocker)");
    expect(land(dir).err).toMatch(/counts 1 BLOCKER/);
    write(dir, FINAL, report("Review: READY · 0 BLOCKER · 0 MAJOR · 0 MINOR · on 0000000\n"));
    commit(dir, "turn 99: report (another commit)");
    expect(land(dir).err).toMatch(/not on the last code commit/);
    write(dir, FINAL, report(`Review: READY · 0 BLOCKER · 2 MAJOR · 1 MINOR · on ${code}\n`));
    const head = commit(dir, "turn 99: report (reviewed)");
    const ok = land(dir);
    expect(ok.code, ok.err).toBe(0);
    expect(remoteDev(origin)).toBe(head);
  });

  it("EXH-13 when dev moved under the turn, the door parks the commits on hold/<brief> and the stop gate lets the turn end", () => {
NEW-END
EDIT scripts/conformance/executor-hooks.test.ts #7
OLD-BEGIN

describe("the session setup", () => {
  it("EXH-15 does nothing outside a cloud session (no install, no output, never blocks)", () => {
OLD-END
NEW-BEGIN

describe("the session setup", { timeout: GIT_HEAVY_MS }, () => {
  it("EXH-15 does nothing outside a cloud session (no install, no output, never blocks)", () => {
NEW-END
EDIT scripts/conformance/executor-hooks.test.ts #8
OLD-BEGIN

describe("the stop gate", () => {
  it("EXH-14 passes a reply that changed nothing, refuses a dirty tree (naming strays) and work on a branch that is not dev", () => {
OLD-END
NEW-BEGIN

describe("the stop gate", { timeout: GIT_HEAVY_MS }, () => {
  it("EXH-14 passes a reply that changed nothing, refuses a dirty tree (naming strays) and work on a branch that is not dev", () => {
NEW-END

PART C — THE SCHEDULING RULE AND THE TESTS' TIME.
C1 and C2 are the edits of .claude/hooks/lib.ts above that add `segmentProgram` and `programsOf` (they are in B1's list — B1 carries every edit of lib.ts) and this edit of .claude/hooks/bash-guard.ts (the scheduling rule leaves the DENY list; after the DENY loop it reads programsOf on the original and the normalised command):
EDIT .claude/hooks/bash-guard.ts #1
OLD-BEGIN
 */
import { readEvent, block, scopeVerdict, normaliseCommand, writeTargets } from "./lib";

OLD-END
NEW-BEGIN
 */
import { readEvent, block, scopeVerdict, normaliseCommand, writeTargets, programsOf } from "./lib";

NEW-END
EDIT .claude/hooks/bash-guard.ts #2
OLD-BEGIN
  },
  {
    re: /(^|[\s;&|(`])(crontab|at|systemctl|service|launchctl)\b/,
    why: "no scheduling or service control from the executor",
  },
  // --- GitHub: the executor reads, never writes (its only write is the landing push) -----------
OLD-END
NEW-BEGIN
  },
  // --- GitHub: the executor reads, never writes (its only write is the landing push) -----------
NEW-END
EDIT .claude/hooks/bash-guard.ts #3
OLD-BEGIN

// Shell writes bypass the editing tools: every target goes through the same scope decision.
OLD-END
NEW-BEGIN

// INC-889 — scheduling and service control, read where the shell runs a program (each segment's
// first word after its assignments and wrappers), so "fix at the root" or "the service role" in a
// message, an argument or a heredoc body is never taken for the program.
const SCHEDULERS = new Set([
  "crontab",
  "at",
  "atq",
  "atrm",
  "batch",
  "systemctl",
  "service",
  "launchctl",
]);
const scheduler = [...programsOf(command), ...programsOf(norm)].find((program) =>
  SCHEDULERS.has(program),
);
if (scheduler !== undefined)
  block(
    `BASH GUARD (.claude/hooks/bash-guard.ts): refused — no scheduling or service control from the executor (${scheduler}).\nCommand: ${command.split("\n")[0]}\nA refusal is final: do not look for another spelling of the same action; STOP and report if the brief needs it.`,
  );

// Shell writes bypass the editing tools: every target goes through the same scope decision.
NEW-END
C3. The time budgets are in B7's edits (GIT_HEAVY_MS on three suites and the shared setup); EXH-21 too.
Then `bunx vitest run scripts/conformance/executor-hooks.test.ts --reporter=verbose` (paste the lines: 23 tests, EXH-0 … EXH-21; with the budgets they are expected to pass in your sandbox — a timeout that remains is pasted under limits, never worked around) and `bunx vitest run scripts/conformance` (every census passes).

THE CHECKS (in this order): `grep -E '^[0-9a-f]{64}  ' docs/governance/briefs/foundations-turn-k1.md | sha256sum -c` — every line prints OK (a FAILED line is fixed by copying its block again, never by editing an expectation); `git diff <START> --stat -- src e2e supabase` (empty); `bun run lint` (paste the counts; expected 0 errors, 39 warnings); `bun run test:unit` (paste totals — the supervisor's run: 311 files / 1939 tests passed); `bun run format:check` last.
The hash list (the files as they stand at the end of the turn):
0dbd6d59cd7226be71689b8b3b9571f8ace3ddd7b7ca7035e460d4eb65bd1de5  .claude/hooks/lib.ts
aa7484aba3026cbd599c6b5903955e6c289c9cd6cb318c1a287dd73c1d68e360  .claude/hooks/land.ts
2752949a26c7963b6f53356a13795fa94fb3dafd673ae85d14cd63028904d211  .claude/agents/reviewer.md
ff7a3ef725bdd8c0b0bc694e73114d4b97e571e8ef01bd89837d0e38734c7ced  .claude/skills/turn-report/SKILL.md
5a8e7274370a200339599d43606a6c38357499178b07ba25c30836b896c64bb4  .claude/rules/00-executor-protocol.md
b358e40dfca7b1ad6c7eab29efbcebe90b8258032e678176a1f6f18a61a9a493  .claude/rules/60-report.md
31712542210416f0f7a0176be111f3967d549ce64a48882ab8f38c8c94ab4615  scripts/conformance/executor-hooks.test.ts
c759cce81f944831a76e3be2e1fefe59f5c52a6d4a5b8d452c8281ed85e31c9f  .claude/hooks/bash-guard.ts

THE COMPLETION REPORT: docs/governance/reports/foundations-turn-k1.report.md, carrying: done or not done by part and step; the file list from `git diff --name-only <START>`; the behaviour contract — a final report without the review line, with a BLOCKER, with another commit's review, and a good one, before → after (EXH-20's lines); the scheduling rule's refusals and allowances (EXH-21's lines); the K2 list; the unit totals and EXH lines; every departure with its reason; the first six lines of ci-status.md for the last commit you can read; every limit. END THE TURN; the supervisor reads the run.
```
