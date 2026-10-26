# Foundations — turn K1, ruling 1 in brief form: every rule that reads what a command runs or writes reads the commands the shell runs inside double quotes and heredoc bodies (INC-920): brief (saved unchanged, 2026-10-26)

```text
RULING 1 IN BRIEF FORM — FOUNDATIONS TURN K1 (2026-10-26; your report's STOP: your reviewer's MAJOR, reproduced; the supervisor reproduced it too and found its wider class). Tier B (the executor's own guard rails). No migration. No new string. No package change. No AGENTS.md change. No file deleted. Base: dev 91ca9f47039d8091d5d447e6401c6fc549b2cec3 (your K1 landing). This brief is the brief in force for the rest of turn K1; foundations-turn-k1.md stands as done. ONE TURN. Order: STEP 0; R1 (red first); R2 (the fix); THE CHECKS; THE COMPLETION REPORT; END THE TURN.
BASE: 91ca9f47039d8091d5d447e6401c6fc549b2cec3
FLAGS: no-migration, no-new-string, no-package-change, no-agents-change
SCOPE-BEGIN
.claude/hooks/lib.ts
scripts/conformance/executor-hooks.test.ts
SCOPE-END

THE SYSTEM (G0) — one concern.
CONCERN: every guard rule that reads what a command RUNS (the scheduling rule) or WRITES (the scope and never-edit rules for shell writes) reads every command the shell runs — including a command substitution inside double quotes ("$(…)", "`…`") and one inside an unquoted heredoc's body (<<EOF; not <<'EOF', whose body the shell leaves alone).
MECHANISM: the kit's tokenizer, shellSegments (.claude/hooks/lib.ts :302), the one reader behind programsOf (:546) and writeTargets (:557). At BASE it keeps a double-quoted substitution inside its word and skips every heredoc body, so the commands in them are invisible to both readers. The supervisor ran BASE's guard (.claude/hooks/bash-guard.ts) on hook input only (nothing executed): `echo "$(at now)"`, `echo "` + "`crontab -l`" + `"`, `git commit -m "note $(systemctl restart nginx)"` and an unquoted heredoc whose body holds `$(at now)` — each exit 0 at BASE and exit 2 ("no scheduling or service control") at K1's own base e024c36e: the regression your reviewer found, the cost of reading programs instead of words (INC-889). Its wider class, older than K1: a write inside a double-quoted substitution was never a write target — writeTargets('echo "$(cp a.ts src/x.ts)"') answers [] at BASE, so such a write passed the scope and never-edit checks before the landing's diff check. That is INC-920.
CONSUMERS (grep at BASE — every reader of the tokenizer in .claude/hooks/): bash-guard.ts :196 (the scheduling rule, programsOf on the command and its normalised text) and :205 (shell writes, writeTargets on the normalised text); lib.ts :456 (commandSegments — no caller in the hooks today), :546 (programsOf), :557 (writeTargets). All take the fix through shellSegments; no consumer changes.
COVERED HERE: every consumer. LEFT: none.
CONFORMANCE GUARD: EXH-21 gains four refusals (the four spellings above) and two allowances (`echo '$(at now)'` — single quotes run nothing; a commit message written through a quoted heredoc inside "$(…)", the form a commit message often takes); NEW EXH-22 — programsOf and writeTargets see a double-quoted substitution's program and write, an unquoted heredoc's substitution, a backquoted one, and not a quoted heredoc's body; the guard refuses such a write outside SCOPE and to .claude/hooks/lib.ts, and allows one inside SCOPE. Red at BASE: R1.
EXCEPTIONS: none. One fail-closed edge, named: the guard also reads the command with its quotes normalised away (normaliseCommand), so a `$(…)` written inside a quoted heredoc's body is refused too — a refusal of data, never a miss of a command.
FIVE LENSES — security: the subject; the guard's two refusals now cover every command the shell runs from one line — nothing it refused before is allowed now · performance: one more pass over a substitution's text; commands are short · failure modes: a substitution that never closes is read to the end of its text (fail-closed); the line's own segments are unchanged, so every existing refusal and allowance stands (EXH-0…21 unchanged) · consistency: one tokenizer reading for programs and for writes · future growth: a new rule that reads programs or writes inherits the reading.
FORWARD-SCAN: none. REGISTER: the executor-kit row's guard column gains EXH-22 (the records turn).

STEP 0 — save this brief (the text between the BRIEF-BEGIN and BRIEF-END lines of the message that carried it, title line and fence included, ending with the closing fence and ONE newline) byte for byte as docs/governance/briefs/foundations-turn-k1-r1.md and paste its sha256sum and byte count (the carrying message states both; a difference is a STOP). roadmap.md: on line 3, the text after "The brief in force: " up to its closing parenthesis becomes `docs/governance/briefs/foundations-turn-k1-r1.md (Foundations turn K1, ruling 1 in brief form: every rule that reads what a command runs or writes reads the commands the shell runs inside double quotes and heredoc bodies — INC-920)` (everything after it stays). Tick nothing.

HOW TO WORK
- Order: STEP 0; R1; R2; THE CHECKS; THE COMPLETION REPORT; END THE TURN. Do not stop anywhere else. If the platform ends a turn early, report three lines (done, left, CI) with `git diff --name-only <START>`; the supervisor sends "continue".
- Paste `git rev-parse HEAD` first (<START>; it must be BASE — if not, paste `git diff --name-only BASE..HEAD`; a path in SCOPE is a STOP). Read CI at https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md (the first six lines); a red on BASE is fixed first at its root and named in the report.
- Run no stateful git command. Every EDIT block replaces its OLD text (exactly once at BASE) with its NEW text, in the order given; copy them by script or your file-editing tool, never retyped. THE CHECKS run the brief's hash list against the tree (`sha256sum -c`); a mismatch is fixed by copying the block again, never by editing an expectation.
- THE FILES: the SCOPE block above, plus docs/governance/briefs/foundations-turn-k1-r1.md, roadmap.md and docs/governance/reports/foundations-turn-k1-r1.report.md (your completion report). Anything else is a STOP naming the file and why.
- Your platform rule stands: "Do not run the Lovable project's builds or typechecks manually because the harness runs them automatically." After R2, read /tmp/observability/build-errors.log and fix every `error TS` line at its root.
- Behaviour contract: every hook allows and refuses exactly what it does at BASE, except that a scheduling program, or a write outside SCOPE or to a never-edit file, inside a double-quoted substitution or an unquoted heredoc's substitution is now refused (and a `$(…)` written inside a quoted heredoc's body, as named above). Nothing else changes.
- Knowledge K: K1 the mechanism above; K2 the report lists every other place in .claude/hooks/ that reads a command's text for a program by a regular expression and could miss or mistake a substitution (file:line, an example), or "none" after the grep; K3 EXH-22 lands with the fix; K4–K6 do not arise.
- The reviewer: run your independent review on the last code commit before the report, wait for its answer, and put its verdict in the report; a BLOCKER is fixed and reviewed again; a MAJOR in SCOPE and provable is fixed, otherwise listed.
- Tests (G38): no assertion loosened; EXH-0…21's existing cases unchanged.
- If any rule of yours conflicts with this text, STOP before saving and quote that rule's exact words in the report.

R1 — red first (nothing committed in this step). Apply these edits to the test file:
EDIT scripts/conformance/executor-hooks.test.ts #1
OLD-BEGIN
      "ls; atq",
    ])
OLD-END
NEW-BEGIN
      "ls; atq",
      // K1 ruling 1 — the shell runs a substitution inside double quotes and in an unquoted heredoc.
      'echo "$(at now)"',
      'echo "`crontab -l`"',
      'git commit -m "note $(systemctl restart nginx)"',
      "cat <<EOF > /tmp/x.txt\n$(at now)\nEOF",
    ])
NEW-END
EDIT scripts/conformance/executor-hooks.test.ts #2
OLD-BEGIN
      "echo at",
    ])
OLD-END
NEW-BEGIN
      "echo at",
      // Single quotes run nothing; a commit message written through a quoted heredoc stays data.
      "echo '$(at now)'",
      "git commit -m \"$(cat <<'EOF'\nturn 35: fix at the root (INC-889); the service role reads it\nEOF\n)\"",
    ])
NEW-END
EDIT scripts/conformance/executor-hooks.test.ts #3
OLD-BEGIN

  it("EXH-16 every command the protocol requires passes BOTH layers — the permission rules and the guard; the forbidden ones are denied by the rules too", () => {
OLD-END
NEW-BEGIN

  it("EXH-22 a program or a write inside a double-quoted substitution or an unquoted heredoc's substitution is read like any other (K1 ruling 1)", () => {
    expect(programsOf('echo "$(cp a.ts src/x.ts)"')).toEqual(["echo", "cp"]);
    expect(writeTargets('echo "$(cp a.ts src/x.ts)"')).toEqual(["src/x.ts"]);
    expect(writeTargets("cat <<EOF\n$(touch src/y.ts)\nEOF")).toEqual(["src/y.ts"]);
    expect(writeTargets("cat <<'EOF'\n$(touch src/y.ts)\nEOF")).toEqual([]);
    expect(programsOf('echo "a `date` b" > out.txt')).toEqual(["echo", "date"]);
    refused(
      'echo "$(cp /tmp/x.ts src/features/posting/wizard.tsx)"',
      /shell write to src\/features\/posting\/wizard\.tsx/,
    );
    refused('echo "`cp /tmp/x .claude/hooks/lib.ts`"', /shell write to \.claude\/hooks\/lib\.ts/);
    allowed('echo "$(cp /tmp/x.ts src/server/ai/x.ts)"');
  });

  it("EXH-16 every command the protocol requires passes BOTH layers — the permission rules and the guard; the forbidden ones are denied by the rules too", () => {
NEW-END
Run `bunx vitest run scripts/conformance/executor-hooks.test.ts -t "EXH-21|EXH-22"`: both fail at BASE's tokenizer — EXH-21 with `echo "$(at now)": expected +0 to be 2`, EXH-22 with `expected [ 'echo' ] to deeply equal [ 'echo', 'cp' ]` — paste both lines.

R2 — the fix (.claude/hooks/lib.ts), these edits:
EDIT .claude/hooks/lib.ts #1
OLD-BEGIN
 * A word is `dynamic` when the shell would expand it ($VAR, backticks, unquoted globs, a leading ~).
 */
OLD-END
NEW-BEGIN
 * A word is `dynamic` when the shell would expand it ($VAR, backticks, unquoted globs, a leading ~).
 * K1 ruling 1 (INC-889's sibling, found by K1's reviewer) — the shell RUNS a command substitution
 * inside double quotes ("$(…)", "`…`") and inside an unquoted heredoc's body (<<EOF, not <<'EOF'):
 * each such body's own segments are appended after the line's, so every rule that reads programs
 * or write targets sees them. Only appended: the line's own segments are unchanged. A `$(` inside a
 * quoted heredoc nested in a substitution is read too (fail-closed: a refusal, never a miss).
 */
NEW-END
EDIT .claude/hooks/lib.ts #2
OLD-BEGIN
  const segments: ShellToken[][] = [];
  let seg: ShellToken[] = [];
OLD-END
NEW-BEGIN
  const segments: ShellToken[][] = [];
  /** The segments of the substitutions the shell runs inside double quotes or heredoc bodies. */
  const inner: ShellToken[][] = [];
  const substitution = (text: string, at: number) => {
    // `$(` at `at`: the body up to its matching `)`, or to the end when it never closes.
    let depth = 1;
    let j = at + 2;
    while (j < text.length && depth > 0) {
      if (text[j] === "\\") j += 1;
      else if (text[j] === "(") depth += 1;
      else if (text[j] === ")") depth -= 1;
      j += 1;
    }
    inner.push(...shellSegments(text.slice(at + 2, depth === 0 ? j - 1 : j)));
  };
  const backquoted = (text: string, at: number) => {
    let j = at + 1;
    while (j < text.length && text[j] !== "`") j += text[j] === "\\" ? 2 : 1;
    inner.push(...shellSegments(text.slice(at + 1, j)));
  };
  /** An unquoted heredoc's body, as the shell reads it: substitutions run, quotes are literal. */
  const expandedBody = (body: string) => {
    for (let j = 0; j < body.length; j += 1) {
      if (body[j] === "\\") j += 1;
      else if (body[j] === "$" && body[j + 1] === "(") substitution(body, j);
      else if (body[j] === "`") {
        backquoted(body, j);
        const close = body.indexOf("`", j + 1);
        j = close < 0 ? body.length : close;
      }
    }
  };
  let seg: ShellToken[] = [];
NEW-END
EDIT .claude/hooks/lib.ts #3
OLD-BEGIN
  let dynamic = false;
  const heredocs: string[] = [];
  const flush = () => {
OLD-END
NEW-BEGIN
  let dynamic = false;
  const heredocs: Array<{ delim: string; expands: boolean }> = [];
  const flush = () => {
NEW-END
EDIT .claude/hooks/lib.ts #4
OLD-BEGIN
        if (d === "$" || d === "`") dynamic = true;
        cur += d;
        i += 1;
OLD-END
NEW-BEGIN
        if (d === "$" || d === "`") dynamic = true;
        if (d === "$" && cmd[i + 1] === "(") substitution(cmd, i);
        if (d === "`") {
          backquoted(cmd, i);
          const close = cmd.indexOf("`", i + 1);
          const end = close < 0 || close > cmd.indexOf('"', i + 1) ? i : close;
          cur += cmd.slice(i, end);
          i = end;
        }
        cur += cmd[i]!;
        i += 1;
NEW-END
EDIT .claude/hooks/lib.ts #5
OLD-BEGIN
      while (heredocs.length > 0) {
        const delim = heredocs.shift()!;
        while (i < n) {
OLD-END
NEW-BEGIN
      while (heredocs.length > 0) {
        const { delim, expands } = heredocs.shift()!;
        const lines: string[] = [];
        while (i < n) {
NEW-END
EDIT .claude/hooks/lib.ts #6
OLD-BEGIN
          if (line.replace(/^\t+/, "").trim() === delim) break;
        }
      }
OLD-END
NEW-BEGIN
          if (line.replace(/^\t+/, "").trim() === delim) break;
          lines.push(line);
        }
        if (expands) expandedBody(lines.join("\n"));
      }
NEW-END
EDIT .claude/hooks/lib.ts #7
OLD-BEGIN
        while (k < n && !/[\s;&|<>]/.test(cmd[k]!)) k += 1;
        heredocs.push(cmd.slice(j, k).replace(/^['"]|['"]$/g, ""));
        seg.push({ v: "<<", op: "<<", dynamic: false });
OLD-END
NEW-BEGIN
        while (k < n && !/[\s;&|<>]/.test(cmd[k]!)) k += 1;
        const word = cmd.slice(j, k);
        heredocs.push({ delim: word.replace(/^['"]|['"]$/g, ""), expands: !/['"\\]/.test(word) });
        seg.push({ v: "<<", op: "<<", dynamic: false });
NEW-END
EDIT .claude/hooks/lib.ts #8
OLD-BEGIN
  endSegment();
  return segments;
}
OLD-END
NEW-BEGIN
  endSegment();
  return [...segments, ...inner];
}
NEW-END
Then `bunx vitest run scripts/conformance/executor-hooks.test.ts` whole: every test passes (paste the totals; the supervisor's run: 23 passed).

THE CHECKS (in this order): `grep -E '^[0-9a-f]{64}  ' docs/governance/briefs/foundations-turn-k1-r1.md | sha256sum -c` — both lines print OK; `git diff <START> --stat -- src e2e supabase` (empty); `bun run lint` (paste the counts; expected 0 errors, 39 warnings); `bun run test:unit` (paste totals — the supervisor's run: 311 files, 1940 tests, every one passed (your K1 run showed 1938 passed and 1 skipped of 1939; the one skip is your sandbox's)); `bun run format:check` last.
The hash list (the files as they stand at the end of the turn):
2c62d609bfb08fea41be17d9b74d77cd2903b56307125e5a4362e5abe9a20cc6  .claude/hooks/lib.ts
a1a2fef4cec936156bd55a3184dd6472c272a1cf705e841e0aff7ddab1ba1f21  scripts/conformance/executor-hooks.test.ts

THE COMPLETION REPORT: docs/governance/reports/foundations-turn-k1-r1.report.md, carrying: done or not done by step; the file list from `git diff --name-only <START>`; the behaviour contract — the four spellings, the two allowances and the three EXH-22 guard cases, before → after; R1's red lines; the unit totals and the EXH lines; the K2 list; the reviewer's verdict; every departure with its reason; the first six lines of ci-status.md for the last commit you can read; every limit. END THE TURN; the supervisor reads the run.

Decisions made here (overridable by the operator; pasting this brief approves them — G17): the fix lives in the tokenizer (one reading for programs and writes), not in a text rule beside the scheduling rule; the quoted-heredoc edge stays fail-closed; INC-920 registered with the class.
```
