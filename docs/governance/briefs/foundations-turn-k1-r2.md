# Foundations — turn K1, ruling 2 in brief form: a `)` in quotes closes no substitution; a heredoc ends where the shell ends it, and a body that never ends is read as commands (INC-920 continued): brief (saved unchanged, 2026-10-26)

```text
RULING 2 IN BRIEF FORM — FOUNDATIONS TURN K1 (2026-10-26; your report on ruling 1: your reviewer's two findings in .claude/hooks/lib.ts, reproduced by you and by the supervisor). Tier B (the executor's own guard rails). No migration. No new string. No package change. No AGENTS.md change. No file deleted. Base: dev bb4a1ebb2d0b77becb84805947fec9967da21bef (your ruling-1 landing). This brief is the brief in force for the rest of turn K1; foundations-turn-k1.md and foundations-turn-k1-r1.md stand as done. ONE TURN. Order: STEP 0; R1 (red first); R2 (the fix); THE CHECKS; THE COMPLETION REPORT; END THE TURN.
BASE: bb4a1ebb2d0b77becb84805947fec9967da21bef
FLAGS: no-migration, no-new-string, no-package-change, no-agents-change
SCOPE-BEGIN
.claude/hooks/lib.ts
scripts/conformance/executor-hooks.test.ts
SCOPE-END

THE SYSTEM (G0) — the concern and mechanism of ruling 1, continued.
CONCERN: every guard rule that reads what a command runs or writes reads every command the shell runs (ruling 1).
MECHANISM: the kit's tokenizer, shellSegments (.claude/hooks/lib.ts). Your reviewer's two findings, reproduced by the supervisor on hook input only (nothing executed) — each refused at e024c36e (before K1, by the old text rule) and allowed at BASE: (1) `echo "$(echo ')'; at now)"` — the substitution's body ends at the `)` inside the quotes, so `at now` is never read; (2) `<<\A` keeps its backslash in the delimiter, so the body never meets a line "A" and swallows every line after it — `cat <<\A > /tmp/x` + `hello` + `A` + `at now` hides `at now`, an ordinary command on its own line, and a second heredoc's `$(at now)` with it. The fix: the substitution's end is found outside quotes and escapes; the delimiter is read after the shell's quote removal (<<'A', <<"A", <<\A and <<A'' all end at a line "A"); and a body whose delimiter line never comes is read as commands — fail-closed, so a delimiter this reader spells differently from the shell never hides the lines after it.
CONSUMERS: as ruling 1 — bash-guard.ts's scheduling rule and shell-write rule, through programsOf and writeTargets; no consumer changes.
COVERED HERE: both findings and the unterminated-body class. LEFT: none.
CONFORMANCE GUARD: EXH-21 gains four refusals — (1), (2) with `at now` on its own line, (2) with a second heredoc's `$(at now)`, and an unterminated body holding `at now` (the fail-closed reading) — and one allowance (a commit message through a quoted heredoc inside "$(…)" holding an apostrophe, parentheses and "at 5 pm"); EXH-22 gains a write after a quoted `)` and the program after a `<<\A` heredoc. Red at BASE: R1.
EXCEPTIONS: none. One fail-closed edge, named: a heredoc body that is never closed is data to the shell (it reads to the end with a warning) but commands to this reader — a refusal of data, never a miss of a command; the executor closes every heredoc it writes.
FIVE LENSES — security: the subject; nothing refused at BASE is allowed after · performance: none worth naming · failure modes: an unclosed quote inside a substitution reads to the end of its text (fail-closed) · consistency: one reading of where a substitution and a heredoc end · future growth: none.
FORWARD-SCAN: none. REGISTER: as ruling 1.

STEP 0 — save this brief (the text between the BRIEF-BEGIN and BRIEF-END lines of the message that carried it, title line and fence included, ending with the closing fence and ONE newline) byte for byte as docs/governance/briefs/foundations-turn-k1-r2.md and paste its sha256sum and byte count (the carrying message states both; a difference is a STOP). roadmap.md: on line 3, the text after "The brief in force: " up to its closing parenthesis becomes `docs/governance/briefs/foundations-turn-k1-r2.md (Foundations turn K1, ruling 2 in brief form: a quoted ")" closes no substitution; a heredoc ends where the shell ends it — INC-920 continued)` (everything after it stays). Tick nothing.

HOW TO WORK
- Order: STEP 0; R1; R2; THE CHECKS; THE COMPLETION REPORT; END THE TURN. Do not stop anywhere else. If the platform ends a turn early, report three lines (done, left, CI) with `git diff --name-only <START>`; the supervisor sends "continue".
- Paste `git rev-parse HEAD` first (<START>; it must be BASE — if not, paste `git diff --name-only BASE..HEAD`; a path in SCOPE is a STOP). Read CI at https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md (the first six lines); a red on BASE is fixed first at its root and named in the report.
- Run no stateful git command. Every EDIT block replaces its OLD text (exactly once at BASE) with its NEW text, in the order given; copy them by script or your file-editing tool, never retyped. THE CHECKS run the brief's hash list against the tree (`sha256sum -c`); a mismatch is fixed by copying the block again, never by editing an expectation.
- THE FILES: the SCOPE block above, plus docs/governance/briefs/foundations-turn-k1-r2.md, roadmap.md and docs/governance/reports/foundations-turn-k1-r2.report.md (your completion report). Anything else is a STOP naming the file and why.
- Your platform rule stands: "Do not run the Lovable project's builds or typechecks manually because the harness runs them automatically." After R2, read /tmp/observability/build-errors.log and fix every `error TS` line at its root.
- Behaviour contract: every hook allows and refuses exactly what it does at BASE, except the spellings above, now refused. Nothing else changes.
- Your reviewer: run it on the last code commit before the report and put its verdict in the report. A finding that is a spelling the shell runs and this reader misses, and that BASE also missed, is listed with its reproduction (hook input only), not fixed — the supervisor rules on it; a finding that this brief's change made worse is a STOP.
- Tests (G38): no assertion loosened; the existing EXH cases unchanged. A unit test that times out under the full run's load and passes alone (your CF-SL-1 of ruling 1) is pasted under limits with both runs; it is not changed.
- If any rule of yours conflicts with this text, STOP before saving and quote that rule's exact words in the report.

R1 — red first (nothing committed in this step). Apply these edits to the test file:
EDIT scripts/conformance/executor-hooks.test.ts #1
OLD-BEGIN
      "cat <<EOF > /tmp/x.txt\n$(at now)\nEOF",
    ])
OLD-END
NEW-BEGIN
      "cat <<EOF > /tmp/x.txt\n$(at now)\nEOF",
      // K1 ruling 2 — a `)` in quotes closes nothing; <<\A ends at "A"; a body never closed is commands.
      "echo \"$(echo ')'; at now)\"",
      "cat <<\\A > /tmp/x\nhello\nA\nat now",
      "cat <<\\A > /tmp/x\nhello\nA\ncat <<EOF > /tmp/y\n$(at now)\nEOF",
      "cat <<EOF > /tmp/x\nat now",
    ])
NEW-END
EDIT scripts/conformance/executor-hooks.test.ts #2
OLD-BEGIN
      "git commit -m \"$(cat <<'EOF'\nturn 35: fix at the root (INC-889); the service role reads it\nEOF\n)\"",
    ])
OLD-END
NEW-BEGIN
      "git commit -m \"$(cat <<'EOF'\nturn 35: fix at the root (INC-889); the service role reads it\nEOF\n)\"",
      "git commit -m \"$(cat <<'EOF'\nturn 35: it's fixed (see INC-889); at 5 pm\nEOF\n)\"",
    ])
NEW-END
EDIT scripts/conformance/executor-hooks.test.ts #3
OLD-BEGIN
    expect(programsOf('echo "a `date` b" > out.txt')).toEqual(["echo", "date"]);
    refused(
OLD-END
NEW-BEGIN
    expect(programsOf('echo "a `date` b" > out.txt')).toEqual(["echo", "date"]);
    expect(writeTargets("echo \"$(echo ')'; cp a.ts src/x.ts)\"")).toEqual(["src/x.ts"]);
    expect(programsOf("cat <<\\A > /tmp/x\nhello\nA\nls")).toEqual(["cat", "ls"]);
    refused(
NEW-END
Run `bunx vitest run scripts/conformance/executor-hooks.test.ts -t "EXH-21|EXH-22"`: both fail at BASE's tokenizer — EXH-21 with `echo "$(echo ')'; at now)": expected +0 to be 2`, EXH-22 with `expected [] to deeply equal [ 'src/x.ts' ]` — paste both lines.

R2 — the fix (.claude/hooks/lib.ts), these edits:
EDIT .claude/hooks/lib.ts #1
OLD-BEGIN
 * quoted heredoc nested in a substitution is read too (fail-closed: a refusal, never a miss).
 */
OLD-END
NEW-BEGIN
 * quoted heredoc nested in a substitution is read too (fail-closed: a refusal, never a miss).
 * K1 ruling 2 — a heredoc's delimiter is read after the shell's quote removal, and a body whose
 * delimiter line never comes is read as commands; a `)` in quotes never closes a substitution.
 */
NEW-END
EDIT .claude/hooks/lib.ts #2
OLD-BEGIN
  const substitution = (text: string, at: number) => {
    // `$(` at `at`: the body up to its matching `)`, or to the end when it never closes.
    let depth = 1;
OLD-END
NEW-BEGIN
  const substitution = (text: string, at: number) => {
    // `$(` at `at`: the body up to its matching `)`, or to the end when it never closes. A `)` in
    // quotes or after a backslash closes nothing (K1 ruling 2: `"$(echo ')'; at now)"`).
    let depth = 1;
NEW-END
EDIT .claude/hooks/lib.ts #3
OLD-BEGIN
    while (j < text.length && depth > 0) {
      if (text[j] === "\\") j += 1;
      else if (text[j] === "(") depth += 1;
      else if (text[j] === ")") depth -= 1;
      j += 1;
    }
    inner.push(...shellSegments(text.slice(at + 2, depth === 0 ? j - 1 : j)));
  };
OLD-END
NEW-BEGIN
    while (j < text.length && depth > 0) {
      const ch = text[j];
      if (ch === "\\") j += 2;
      else if (ch === "'") {
        const close = text.indexOf("'", j + 1);
        j = close < 0 ? text.length : close + 1;
      } else if (ch === '"') {
        j += 1;
        while (j < text.length && text[j] !== '"') j += text[j] === "\\" ? 2 : 1;
        j += 1;
      } else {
        if (ch === "(") depth += 1;
        else if (ch === ")") depth -= 1;
        j += 1;
      }
    }
    inner.push(
      ...shellSegments(text.slice(at + 2, depth === 0 ? j - 1 : Math.min(j, text.length))),
    );
  };
NEW-END
EDIT .claude/hooks/lib.ts #4
OLD-BEGIN
        const lines: string[] = [];
        while (i < n) {
OLD-END
NEW-BEGIN
        const lines: string[] = [];
        const bodyStart = i;
        let closed = false;
        while (i < n) {
NEW-END
EDIT .claude/hooks/lib.ts #5
OLD-BEGIN
          i = eol < 0 ? n : eol + 1;
          if (line.replace(/^\t+/, "").trim() === delim) break;
          lines.push(line);
        }
        if (expands) expandedBody(lines.join("\n"));
OLD-END
NEW-BEGIN
          i = eol < 0 ? n : eol + 1;
          if (line.replace(/^\t+/, "").trim() === delim) {
            closed = true;
            break;
          }
          lines.push(line);
        }
        if (!closed) {
          // K1 ruling 2 — a body whose delimiter line never comes is read as commands (fail-closed):
          // a delimiter this reader spelled differently from the shell never hides the lines after it.
          i = bodyStart;
          heredocs.length = 0;
          break;
        }
        if (expands) expandedBody(lines.join("\n"));
NEW-END
EDIT .claude/hooks/lib.ts #6
OLD-BEGIN
        const word = cmd.slice(j, k);
        heredocs.push({ delim: word.replace(/^['"]|['"]$/g, ""), expands: !/['"\\]/.test(word) });
        seg.push({ v: "<<", op: "<<", dynamic: false });
OLD-END
NEW-BEGIN
        const word = cmd.slice(j, k);
        // The shell's quote removal: <<'A', <<"A", <<\A and <<A'' all end at a line "A" (K1 ruling 2).
        heredocs.push({ delim: word.replace(/['"\\]/g, ""), expands: !/['"\\]/.test(word) });
        seg.push({ v: "<<", op: "<<", dynamic: false });
NEW-END
Then `bunx vitest run scripts/conformance/executor-hooks.test.ts` whole: every test passes (paste the totals; the supervisor's run: 23 passed).

THE CHECKS (in this order): `grep -E '^[0-9a-f]{64}  ' docs/governance/briefs/foundations-turn-k1-r2.md | sha256sum -c` — both lines print OK; `git diff <START> --stat -- src e2e supabase` (empty); `bun run lint` (paste the counts; expected 0 errors, 39 warnings); `bun run test:unit` (paste totals — the supervisor's run: 311 files, 1940 tests, every one passed); `bun run format:check` last.
The hash list (the files as they stand at the end of the turn):
bfbcf5d28711d68365bbaedf4abb69b8a8059fce93089bae087fd5e6e6d9b8ad  .claude/hooks/lib.ts
3de8462658f3e524183fcd58f511aba6c3947150a83a6c8a51cc00786b832ecc  scripts/conformance/executor-hooks.test.ts

THE COMPLETION REPORT: docs/governance/reports/foundations-turn-k1-r2.report.md, carrying: done or not done by step; the file list from `git diff --name-only <START>`; the behaviour contract — the four refusals, the allowance and the two EXH-22 cases, before → after; R1's red lines; the unit totals and the EXH lines; the reviewer's verdict and its findings as ruled above; every departure with its reason; the first six lines of ci-status.md for the last commit you can read; every limit. END THE TURN; the supervisor reads the run.

Decisions made here (overridable by the operator; pasting this brief approves them — G17): the unterminated-heredoc reading is fail-closed; a reviewer finding that BASE also missed is listed and ruled by the supervisor, not fixed in this turn.
```
