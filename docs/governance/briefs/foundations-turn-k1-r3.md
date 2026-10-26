# Foundations — turn K1, ruling 3 in brief form: the scheduling rule is fail-closed again — refused anywhere outside provably inert data; an unclosed body is still read for its substitutions; a `)` in a comment closes nothing (INC-920, DEC-269): brief (saved unchanged, 2026-10-26)

```text
RULING 3 IN BRIEF FORM — FOUNDATIONS TURN K1 (2026-10-26; your STOP on ruling 2: your reviewer's BLOCKER — ruling 2's unclosed-body fallback hid `$(…)` inside apostrophes, which a heredoc body reads literally — and its base-existing finding, a `)` in a comment). Tier B (the executor's own guard rails). No migration. No new string. No package change. No AGENTS.md change. No file deleted. Base: dev b686f0fcb010274acf5effc82557c53a6be6001a (your stop before ruling 3's STEP 0 — this text replaces the brief you stopped on, whole). This brief is the brief in force for the rest of turn K1; foundations-turn-k1.md, -r1.md and -r2.md stand as done. ONE TURN. Order: STEP 0; R1 (red first); R2 (the fix); THE CHECKS; THE COMPLETION REPORT; END THE TURN.
BASE: b686f0fcb010274acf5effc82557c53a6be6001a
FLAGS: no-migration, no-new-string, no-package-change, no-agents-change
SCOPE-BEGIN
.claude/hooks/lib.ts
.claude/hooks/bash-guard.ts
scripts/conformance/executor-hooks.test.ts
SCOPE-END

THE SYSTEM (G0) — the concern of rulings 1 and 2, and why this ruling changes the design.
CONCERN: the executor never schedules work or controls a service — the scheduling rule refuses every command that could, and never refuses a word that is provably data (INC-889's commit messages, grep strings and quoted heredoc bodies).
MECHANISM: K1 replaced a text rule (fail-closed: it refused "fix at the root" in a commit message — INC-889) with a reader of the programs a command runs (programsOf over the tokenizer). Rulings 1 and 2 and your reviewer's three findings show the cost: a hand-written shell reader that misses a spelling lets that spelling through — a substitution inside quotes, a heredoc delimiter, a comment, an unclosed body, and (the supervisor's census) a program another program starts: `find . -exec at now \;` is allowed at BASE and was refused before K1. One more fix per finding never ends. DEC-269 (the supervisor, G17 — overridable): the scheduling rule refuses when EITHER reader finds a scheduler — programsOf (kept: it reads through wrappers and assignments) OR the pre-K1 word pattern matched on blankInertData(command), a new reader in lib.ts that blanks only PROVABLY inert data: properly closed single-quoted strings, properly closed double-quoted strings holding no `$`, backquote or backslash, and the bodies of heredocs whose delimiter is quoted and whose delimiter line comes. Everything else stays — an unclosed quote, an expanding body, everything after a body that never closes — so a spelling neither reader can classify is refused. INC-889's three data cases stay allowed; a word in an unquoted argument or an expanding heredoc body is refused again, as before K1 (named below). Your reviewer's BLOCKER is also fixed at its root in the tokenizer (an expanding body is read for its substitutions whether or not it closes), and its comment finding (a `)` in a comment closes nothing), so writeTargets — which has no text reader beside it — sees both.
CONSUMERS (grep at BASE): .claude/hooks/bash-guard.ts — the scheduling rule (programsOf, and now SCHEDULER_WORD over blankInertData) and the shell-write rule (writeTargets); .claude/hooks/lib.ts — shellSegments, programsOf, writeTargets, commandSegments (no caller in the hooks), and the new blankInertData.
COVERED HERE: every consumer. LEFT: none.
CONFORMANCE GUARD: EXH-21 gains five refusals — your reviewer's BLOCKER (`cat <<EOF` + `'$(at now)'`, unclosed), its comment case, `find . -name x -exec at now \;`, `echo at` (moved from the allowances: an unquoted argument is not provably data), and an expanding heredoc body holding "meet at 5" (fail-closed, named) — and its allowance `echo at` becomes `echo "at"`; EXH-22 gains the BLOCKER's write (`cat <<EOF` + `'$(cp a.ts src/x.ts)'` → src/x.ts) and the comment case's program; NEW EXH-23 — blankInertData blanks closed quotes without expansions and a closed quoted heredoc body, and leaves an expanding string, an escaped one, an expanding body, an unclosed body and an unclosed quote as they are. Red at BASE: R1.
EXCEPTIONS: none. Two fail-closed edges, named: an unquoted argument that is a scheduler's name (`echo at`) and an expanding heredoc body holding one ("meet at 5") are refused — as before K1; the executor writes a heredoc with a quoted delimiter (<<'EOF') and quotes words in messages.
FIVE LENSES — security: the subject; the rule refuses everything it refused before K1 except provably inert data, and everything K1's reader finds · performance: one more pass over a short string · failure modes: an unclassifiable spelling is refused, never allowed · consistency: one definition of inert data, in lib.ts beside the tokenizer · future growth: another rule that must be fail-closed over words matches its pattern on blankInertData's text.
YOUR STOP, RULED: you were right — "Never use TypeScript non-null assertions (`!`) — narrow with an early-return guard or optional chaining instead." The first draft of this ruling added three (`cmd[i]!`, `cmd[k]!`, `pending.shift()!`); rulings 1 and 2, which you applied, had added two more (shellSegments' double-quote loop, `cur += cmd[i]!`, and its heredoc loop, `heredocs.shift()!`) — the supervisor's slip, S438. R2's blocks below carry none: `cmd.charAt(…)` reads a character, and a `shift()` is narrowed by an early-return guard; the two of rulings 1–2 are replaced the same way. The older assertions in lib.ts, written before these rulings (27 lines across lib.ts and land.ts by `grep -n '\]!\|)!' .claude/hooks/*.ts`, e.g. shellSegments' `const c = cmd[i]!`), are not changed here: list them in K2 with file:line; a later kit turn retires them.
FORWARD-SCAN: the Claude-session and eval rules are text rules today and stay so (K1's exceptions). REGISTER: the executor-kit row's guard column gains EXH-23 (the records turn).

STEP 0 — save this brief (the text between the BRIEF-BEGIN and BRIEF-END lines of the message that carried it, title line and fence included, ending with the closing fence and ONE newline) byte for byte as docs/governance/briefs/foundations-turn-k1-r3.md and paste its sha256sum and byte count (the carrying message states both; a difference is a STOP). roadmap.md: on line 3, the text after "The brief in force: " up to its closing parenthesis becomes `docs/governance/briefs/foundations-turn-k1-r3.md (Foundations turn K1, ruling 3 in brief form: the scheduling rule fail-closed outside provably inert data — DEC-269, INC-920)` (everything after it stays). Tick nothing.

HOW TO WORK
- Order: STEP 0; R1; R2; THE CHECKS; THE COMPLETION REPORT; END THE TURN. Do not stop anywhere else. If the platform ends a turn early, report three lines (done, left, CI) with `git diff --name-only <START>`; the supervisor sends "continue".
- Paste `git rev-parse HEAD` first (<START>; it must be BASE — if not, paste `git diff --name-only BASE..HEAD`; a path in SCOPE is a STOP). Read CI at https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md (the first six lines); a red on BASE is fixed first at its root and named in the report.
- Run no stateful git command. Every EDIT block replaces its OLD text (exactly once at BASE) with its NEW text, in the order given; copy them by script or your file-editing tool, never retyped. THE CHECKS run the brief's hash list against the tree (`sha256sum -c`); a mismatch is fixed by copying the block again, never by editing an expectation.
- THE FILES: the SCOPE block above, plus docs/governance/briefs/foundations-turn-k1-r3.md, roadmap.md and docs/governance/reports/foundations-turn-k1-r3.report.md (your completion report). Anything else is a STOP naming the file and why.
- Your platform rule stands: "Do not run the Lovable project's builds or typechecks manually because the harness runs them automatically." After R2, read /tmp/observability/build-errors.log and fix every `error TS` line at its root.
- K2: list every non-null assertion left in .claude/hooks/ (file:line) — none may be one this brief adds.
- Behaviour contract: every hook allows and refuses exactly what it does at BASE, except: the scheduling rule refuses the spellings above and the two fail-closed edges; writeTargets sees a write in an unclosed expanding body and after a comment's `)`. Nothing else changes.
- Your reviewer: run it on the last code commit before the report and put its verdict in the report. With DEC-269 a scheduling spelling the program reader misses is refused by the word reader unless it sits in provably inert data — so a finding is a STOP only if it is a command the shell runs that BOTH readers allow (paste its hook input and the exit code), or an allowance that is provably data and is refused; anything else is listed for the records.
- Tests (G38): no assertion loosened — `echo at` moves from the allowances to the refusals (a tightening, by DEC-269); a unit test that times out under the full run's load and passes alone (your CF-SL-1) is pasted under limits with both runs.
- If any rule of yours conflicts with this text, STOP before saving and quote that rule's exact words in the report.

R1 — red first (nothing committed in this step). Apply these edits to the test file:
EDIT scripts/conformance/executor-hooks.test.ts #1
OLD-BEGIN
  programsOf,
} from "../../.claude/hooks/lib";
OLD-END
NEW-BEGIN
  programsOf,
  blankInertData,
} from "../../.claude/hooks/lib";
NEW-END
EDIT scripts/conformance/executor-hooks.test.ts #2
OLD-BEGIN
      "cat <<EOF > /tmp/x\nat now",
    ])
OLD-END
NEW-BEGIN
      "cat <<EOF > /tmp/x\nat now",
      // K1 ruling 3 (DEC-269) — an unclosed expanding body is still read for its substitutions; a `)`
      // in a comment closes nothing; and the words are refused anywhere outside provably inert
      // data — a program another program starts, an unquoted argument, an expanding body's words.
      "cat <<EOF\n'$(at now)'",
      'echo "$(echo ok # )\nat now\n)"',
      "find . -name x -exec at now \\;",
      "echo at",
      "cat <<EOF > /tmp/n.txt\nmeet at 5\nEOF",
    ])
NEW-END
EDIT scripts/conformance/executor-hooks.test.ts #3
OLD-BEGIN
      "cat <<'EOF' > /tmp/note.txt\nat 5 pm the service starts\nEOF",
      "echo at",
      // Single quotes run nothing; a commit message written through a quoted heredoc stays data.
OLD-END
NEW-BEGIN
      "cat <<'EOF' > /tmp/note.txt\nat 5 pm the service starts\nEOF",
      'echo "at"',
      // Single quotes run nothing; a commit message written through a quoted heredoc stays data.
NEW-END
EDIT scripts/conformance/executor-hooks.test.ts #4
OLD-BEGIN
    expect(programsOf("cat <<\\A > /tmp/x\nhello\nA\nls")).toEqual(["cat", "ls"]);
    refused(
OLD-END
NEW-BEGIN
    expect(programsOf("cat <<\\A > /tmp/x\nhello\nA\nls")).toEqual(["cat", "ls"]);
    // K1 ruling 3 — an unclosed expanding body and a comment inside a substitution.
    expect(writeTargets("cat <<EOF\n'$(cp a.ts src/x.ts)'")).toEqual(["src/x.ts"]);
    expect(programsOf('echo "$(echo ok # )\nls\n)"')).toContain("ls");
    refused(
NEW-END
EDIT scripts/conformance/executor-hooks.test.ts #5
OLD-BEGIN

  it("EXH-16 every command the protocol requires passes BOTH layers — the permission rules and the guard; the forbidden ones are denied by the rules too", () => {
OLD-END
NEW-BEGIN

  it("EXH-23 blankInertData blanks only provably inert data: closed quotes without expansions and closed quoted heredoc bodies (K1 ruling 3, DEC-269)", () => {
    expect(blankInertData('git commit -m "fix at root"')).toBe('git commit -m "           "');
    expect(blankInertData("echo '$(at now)'")).toBe("echo '         '");
    expect(blankInertData('echo "$(at now)"')).toBe('echo "$(at now)"');
    expect(blankInertData('echo "say \\"at\\" now"')).toBe('echo "say \\"at\\" now"');
    expect(blankInertData("cat <<'EOF' > f\nat 5\nEOF")).toBe("cat <<'EOF' > f\n    \nEOF");
    expect(blankInertData("cat <<EOF > f\nat 5\nEOF")).toBe("cat <<EOF > f\nat 5\nEOF");
    expect(blankInertData("cat <<'EOF'\n'at'")).toBe("cat <<'EOF'\n'at'");
    expect(blankInertData("echo 'at now")).toBe("echo 'at now");
  });

  it("EXH-16 every command the protocol requires passes BOTH layers — the permission rules and the guard; the forbidden ones are denied by the rules too", () => {
NEW-END
Run `bunx vitest run scripts/conformance/executor-hooks.test.ts -t "EXH-21|EXH-22|EXH-23"`: all three fail at BASE — EXH-21 on `cat <<EOF` + `'$(at now)'` (expected 2, got 0), EXH-22 with `expected [] to deeply equal [ 'src/x.ts' ]`, EXH-23 with `blankInertData is not a function` — paste the three lines.

R2 — the fix. .claude/hooks/lib.ts, these edits:
EDIT .claude/hooks/lib.ts #1
OLD-BEGIN
 * delimiter line never comes is read as commands; a `)` in quotes never closes a substitution.
 */
OLD-END
NEW-BEGIN
 * delimiter line never comes is read as commands; a `)` in quotes never closes a substitution.
 * K1 ruling 3 — an expanding body is read for its substitutions whether or not it closes; a `)` in
 * a comment closes nothing. A reader of programs is never the last word on its own: the scheduling
 * rule also matches its words in blankInertData's text (below), so what this reader misses is
 * refused unless it is provably inert data.
 */
NEW-END
EDIT .claude/hooks/lib.ts #2
OLD-BEGIN
        j += 1;
      } else {
OLD-END
NEW-BEGIN
        j += 1;
      } else if (ch === "#" && (j === at + 2 || /[\s;&|(]/.test(text[j - 1] ?? ""))) {
        // K1 ruling 3 — a comment runs to the end of its line; a `)` in it closes nothing.
        const eol = text.indexOf("\n", j);
        j = eol < 0 ? text.length : eol;
      } else {
NEW-END
EDIT .claude/hooks/lib.ts #3
OLD-BEGIN
        }
        cur += cmd[i]!;
        i += 1;
OLD-END
NEW-BEGIN
        }
        cur += cmd.charAt(i);
        i += 1;
NEW-END
EDIT .claude/hooks/lib.ts #4
OLD-BEGIN
      while (heredocs.length > 0) {
        const { delim, expands } = heredocs.shift()!;
        const lines: string[] = [];
OLD-END
NEW-BEGIN
      while (heredocs.length > 0) {
        const next = heredocs.shift();
        if (next === undefined) break;
        const { delim, expands } = next;
        const lines: string[] = [];
NEW-END
EDIT .claude/hooks/lib.ts #5
OLD-BEGIN
        }
        if (!closed) {
OLD-END
NEW-BEGIN
        }
        // K1 ruling 3 — an expanding body is read for its substitutions whether or not it closes.
        if (expands) expandedBody(lines.join("\n"));
        if (!closed) {
NEW-END
EDIT .claude/hooks/lib.ts #6
OLD-BEGIN
        }
        if (expands) expandedBody(lines.join("\n"));
      }
OLD-END
NEW-BEGIN
        }
      }
NEW-END
EDIT .claude/hooks/lib.ts #7
OLD-BEGIN

/** The command split at every shell operator, so each piece starts with its own program. */
OLD-END
NEW-BEGIN

/**
 * K1 ruling 3 (DEC-269) — THE COMMAND WITH ONLY ITS PROVABLY INERT DATA BLANKED, for a text rule
 * that must be fail-closed: properly closed single-quoted strings; properly closed double-quoted
 * strings holding no `$`, backquote or backslash; and the bodies of heredocs whose delimiter is
 * quoted and whose delimiter line comes. Everything else stays — an unclosed quote, an expanding
 * heredoc's body, and everything after a heredoc that never closes — so a spelling this reader
 * cannot classify is read as commands. Blanked text keeps its line breaks.
 */
export function blankInertData(cmd: string): string {
  const blank = (text: string) => text.replace(/[^\n]/g, " ");
  const pending: Array<{ delim: string; inert: boolean }> = [];
  let out = "";
  let i = 0;
  const n = cmd.length;
  while (i < n) {
    const c = cmd.charAt(i);
    if (c === "\\") {
      out += cmd.slice(i, i + 2);
      i += 2;
      continue;
    }
    if (c === "'") {
      const close = cmd.indexOf("'", i + 1);
      if (close < 0) return out + cmd.slice(i);
      out += `'${blank(cmd.slice(i + 1, close))}'`;
      i = close + 1;
      continue;
    }
    if (c === '"') {
      let j = i + 1;
      let inert = true;
      while (j < n && cmd[j] !== '"') {
        if (cmd[j] === "\\" || cmd[j] === "$" || cmd[j] === "`") inert = false;
        j += cmd[j] === "\\" ? 2 : 1;
      }
      if (j < n && inert) {
        out += `"${blank(cmd.slice(i + 1, j))}"`;
        i = j + 1;
        continue;
      }
      out += c;
      i += 1;
      continue;
    }
    if (c === "<" && cmd[i + 1] === "<" && cmd[i + 2] !== "<") {
      let j = i + 2;
      if (cmd[j] === "-") j += 1;
      while (j < n && (cmd[j] === " " || cmd[j] === "\t")) j += 1;
      let k = j;
      while (k < n && !/[\s;&|<>]/.test(cmd.charAt(k))) k += 1;
      const word = cmd.slice(j, k);
      pending.push({ delim: word.replace(/['"\\]/g, ""), inert: /['"\\]/.test(word) });
      out += cmd.slice(i, k);
      i = k;
      continue;
    }
    if (c === "\n" && pending.length > 0) {
      out += c;
      i += 1;
      while (pending.length > 0) {
        const next = pending.shift();
        if (next === undefined) break;
        const { delim, inert } = next;
        let j = i;
        let end = -1;
        while (j <= n) {
          const eol = cmd.indexOf("\n", j);
          const line = eol < 0 ? cmd.slice(j) : cmd.slice(j, eol);
          if (line.replace(/^\t+/, "").trim() === delim) {
            end = j;
            break;
          }
          if (eol < 0) break;
          j = eol + 1;
        }
        if (end < 0) return out + cmd.slice(i);
        out += inert ? blank(cmd.slice(i, end)) : cmd.slice(i, end);
        i = end;
      }
      continue;
    }
    out += c;
    i += 1;
  }
  return out;
}

/** The command split at every shell operator, so each piece starts with its own program. */
NEW-END
.claude/hooks/bash-guard.ts, these edits:
EDIT .claude/hooks/bash-guard.ts #1
OLD-BEGIN
import { readEvent, block, scopeVerdict, normaliseCommand, writeTargets, programsOf } from "./lib";
OLD-END
NEW-BEGIN
import {
  readEvent,
  block,
  scopeVerdict,
  normaliseCommand,
  writeTargets,
  programsOf,
  blankInertData,
} from "./lib";
NEW-END
EDIT .claude/hooks/bash-guard.ts #2
OLD-BEGIN
// message, an argument or a heredoc body is never taken for the program.
OLD-END
NEW-BEGIN
// message, an argument or a heredoc body is never taken for the program. K1 ruling 3 (DEC-269) —
// fail-closed as before K1: the words are also refused anywhere in the command's text except
// provably inert data (blankInertData: closed quotes without expansions, quoted heredoc bodies),
// so a spelling the program reader cannot see (a program started by another program, a comment,
// an unclosed body) is still refused.
NEW-END
EDIT .claude/hooks/bash-guard.ts #3
OLD-BEGIN
const scheduler = [...programsOf(command), ...programsOf(norm)].find((program) =>
  SCHEDULERS.has(program),
);
OLD-END
NEW-BEGIN
const SCHEDULER_WORD = /(^|[\s;&|(`])(crontab|at|atq|atrm|batch|systemctl|service|launchctl)\b/;
const scheduler =
  [...programsOf(command), ...programsOf(norm)].find((program) => SCHEDULERS.has(program)) ??
  SCHEDULER_WORD.exec(blankInertData(command))?.[2];
NEW-END
Then `bunx vitest run scripts/conformance/executor-hooks.test.ts` whole: every test passes (paste the totals; the supervisor's run: 24 passed).

THE CHECKS (in this order): `grep -E '^[0-9a-f]{64}  ' docs/governance/briefs/foundations-turn-k1-r3.md | sha256sum -c` — the three lines print OK; `git diff <START> --stat -- src e2e supabase` (empty); `bun run lint` (paste the counts; expected 0 errors, 39 warnings); `bun run test:unit` (paste totals — the supervisor's run: 311 files, 1941 tests, every one passed); `bun run format:check` last.
The hash list (the files as they stand at the end of the turn):
e0f80e6ec57c6dfa5e6e008c006b0fa429f5859ba6b96ff9471041f1f85bc8b4  .claude/hooks/lib.ts
ab0c2cd9f667861b3204a71ca3fb8dc70fa4b5f20c42be6eab085feb90cd3f3f  .claude/hooks/bash-guard.ts
a985203d68c99b7885eef655be963bea0df99792a70b57ad1a82f5026e21bfc5  scripts/conformance/executor-hooks.test.ts

THE COMPLETION REPORT: docs/governance/reports/foundations-turn-k1-r3.report.md, carrying: done or not done by step; the file list from `git diff --name-only <START>`; the behaviour contract — the five refusals, the changed allowance, the EXH-22 and EXH-23 cases, before → after; R1's red lines; the unit totals and the EXH lines; the reviewer's verdict and its findings as ruled above; every departure with its reason; the first six lines of ci-status.md for the last commit you can read; every limit. END THE TURN; the supervisor reads the run.

Decisions made here (overridable by the operator; pasting this brief approves them — G17): DEC-269 (the scheduling rule refuses on either reader; only provably inert data is exempt); `echo at` and an expanding heredoc body's words are refused again, as before K1; the BLOCKER and the comment finding fixed in the tokenizer as well, for writeTargets.
```
