# Foundations — turn K1, ruling 4 in brief form: a keyword before the program, a program named by an expansion, a quoted heredoc delimiter with a space (INC-920, DEC-269 continued): brief (saved unchanged, 2026-10-26)

```text
RULING 4 IN BRIEF FORM — FOUNDATIONS TURN K1 (2026-10-26; your STOP on ruling 3: your reviewer's three cases, each reproduced by the supervisor on hook input only). Tier B (the executor's own guard rails). No migration. No new string. No package change. No AGENTS.md change. No file deleted. Base: dev 9a3f8713faa0a0e619b96feb08448ae67764c2bb (your ruling-3 landing). This brief is the brief in force for the rest of turn K1; foundations-turn-k1.md and -r1, -r2, -r3 stand as done. ONE TURN. Order: STEP 0; R1 (red first); R2 (the fix); THE CHECKS; THE COMPLETION REPORT; END THE TURN. From this turn the supervisor sends your briefs directly (the operator is away); nothing else about how you work changes.
BASE: 9a3f8713faa0a0e619b96feb08448ae67764c2bb
FLAGS: no-migration, no-new-string, no-package-change, no-agents-change
SCOPE-BEGIN
.claude/hooks/lib.ts
.claude/hooks/bash-guard.ts
scripts/conformance/executor-hooks.test.ts
SCOPE-END

THE SYSTEM (G0) — the concern and mechanism of rulings 1–3.
CONCERN: the executor never schedules work or controls a service; the scheduling rule refuses every command that could, and never refuses provably inert data.
MECHANISM: the two readers of ruling 3 (programsOf; the word pattern over blankInertData) in .claude/hooks/lib.ts and bash-guard.ts. Your reviewer's three cases, reproduced at BASE: (1) `p=systemctl; "$p" status` and (by the supervisor) `$'at' now` — exit 0: the program is named by an expansion, which no reader of the text can resolve; (2) `if true; then /bin/systemctl status; fi` — exit 0: programsOf takes the keyword `then` for the program, and the word pattern does not see `systemctl` after `/`; (3) `cat <<'A B'` + `fix at root` + `A B` — exit 2 (0 at ruling 2): ruling 3's blankInertData ends the delimiter word at the space inside the quotes, so the body never closes and is read as commands — a refusal of provably inert data that ruling 3 introduced (S439, the supervisor's slip: a second delimiter reader beside the tokenizer's, instead of one). The fix: (1) segmentProgram reports whether the shell expands the program's word, and the guard refuses a program named by an expansion as unreadable (unreadablePrograms); (2) segmentProgram skips the shell's keywords before a program (if, then, elif, else, do, while, until, !, {, }); (3) ONE word reader, wordEnd, ends a delimiter word at whitespace outside quotes — used by both shellSegments and blankInertData.
CONSUMERS (grep at BASE): bash-guard.ts — the scheduling rule, the new expansion refusal, the shell-write rule; lib.ts — shellSegments and blankInertData (the delimiter word), segmentProgram (programsOf, writeTargets, unreadablePrograms).
COVERED HERE: the three cases. LEFT: none.
CONFORMANCE GUARD: EXH-21 gains the keyword case (refused: scheduling), the two expansion cases (refused: "a program named by an expansion"), and three allowances — the space-holding quoted delimiter with "fix at root", `echo "$(git rev-parse HEAD)"`, `for f in a b; do echo $f; done`; EXH-23 gains the delimiter with a space (blanked) and the keyword case's program. Red at BASE: R1.
EXCEPTIONS: none. Named edge: any program word the shell expands is refused, scheduler or not (`"$BIN" run`) — the executor names its programs.
FIVE LENSES — security: the subject; nothing refused at BASE is allowed after · performance: none · failure modes: an expanded program is refused, never guessed · consistency: one delimiter reader for both readers · future growth: a new keyword is one entry in KEYWORDS.
FORWARD-SCAN: none. REGISTER: the executor-kit row's guard column (the records turn).

STEP 0 — save this brief (the text between the BRIEF-BEGIN and BRIEF-END lines of the message that carried it, title line and fence included, ending with the closing fence and ONE newline) byte for byte as docs/governance/briefs/foundations-turn-k1-r4.md and paste its sha256sum and byte count (the carrying message states both; a difference is a STOP). roadmap.md: on line 3, the text after "The brief in force: " up to its closing parenthesis becomes `docs/governance/briefs/foundations-turn-k1-r4.md (Foundations turn K1, ruling 4 in brief form: a keyword before the program, a program named by an expansion, one delimiter reader — INC-920, DEC-269)` (everything after it stays). Tick nothing.

HOW TO WORK
- Order: STEP 0; R1; R2; THE CHECKS; THE COMPLETION REPORT; END THE TURN. Do not stop anywhere else. If the platform ends a turn early, report three lines (done, left, CI) with `git diff --name-only <START>`; the supervisor sends "continue".
- Paste `git rev-parse HEAD` first (<START>; it must be BASE — if not, paste `git diff --name-only BASE..HEAD`; a path in SCOPE is a STOP). Read CI at https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md (the first six lines); a red on BASE is fixed first at its root and named in the report.
- Run no stateful git command. Every EDIT block replaces its OLD text (exactly once at BASE) with its NEW text, in the order given; copy them by script or your file-editing tool, never retyped. THE CHECKS run the brief's hash list against the tree (`sha256sum -c`); a mismatch is fixed by copying the block again, never by editing an expectation. No NEW block carries a non-null assertion (your platform rule; checked by the supervisor's script).
- THE FILES: the SCOPE block above, plus docs/governance/briefs/foundations-turn-k1-r4.md, roadmap.md and docs/governance/reports/foundations-turn-k1-r4.report.md (your completion report). Anything else is a STOP naming the file and why.
- Your platform rule stands: "Do not run the Lovable project's builds or typechecks manually because the harness runs them automatically." After R2, read /tmp/observability/build-errors.log and fix every `error TS` line at its root.
- Behaviour contract: every hook allows and refuses exactly what it does at BASE, except the three cases above (and the named edge). Nothing else changes.
- Your reviewer: run it on the last code commit before the report and put its verdict in the report. K1 closes with this ruling: a further finding is a STOP only if THIS brief's change made a case worse — a command BASE refused that is now allowed, or provably inert data BASE allowed that is now refused (paste the hook input and both exit codes). Any other finding — a spelling BASE also allowed — is listed in the report with its reproduction for the supervisor's next kit turn, not a STOP.
- Tests (G38): no assertion loosened; the existing EXH cases unchanged. A unit test that times out under the full run's load and passes alone (AAN-1, CF-SL-1 last turn) is pasted under limits with both runs; it is not changed — the supervisor registers the class (INC-921) for a later turn.
- If any rule of yours conflicts with this text, STOP before saving and quote that rule's exact words in the report.

R1 — red first (nothing committed in this step). Apply these edits to the test file:
EDIT scripts/conformance/executor-hooks.test.ts #1
OLD-BEGIN
      "cat <<EOF > /tmp/n.txt\nmeet at 5\nEOF",
    ])
      refused(command, /no scheduling or service control/);
    for (const command of [
OLD-END
NEW-BEGIN
      "cat <<EOF > /tmp/n.txt\nmeet at 5\nEOF",
      // K1 ruling 4 — a keyword before the program.
      "if true; then /bin/systemctl status; fi",
    ])
      refused(command, /no scheduling or service control/);
    // K1 ruling 4 — a program named by an expansion is unreadable, and refused as such.
    for (const command of ['p=systemctl; "$p" status', "$'at' now"])
      refused(command, /a program named by an expansion/);
    for (const command of [
NEW-END
EDIT scripts/conformance/executor-hooks.test.ts #2
OLD-BEGIN
      "git commit -m \"$(cat <<'EOF'\nturn 35: it's fixed (see INC-889); at 5 pm\nEOF\n)\"",
    ])
OLD-END
NEW-BEGIN
      "git commit -m \"$(cat <<'EOF'\nturn 35: it's fixed (see INC-889); at 5 pm\nEOF\n)\"",
      // K1 ruling 4 — a quoted delimiter may hold a space; its body is data.
      "cat <<'A B'\nfix at root\nA B",
      'echo "$(git rev-parse HEAD)"',
      "for f in a b; do echo $f; done",
    ])
NEW-END
EDIT scripts/conformance/executor-hooks.test.ts #3
OLD-BEGIN
    expect(blankInertData("echo 'at now")).toBe("echo 'at now");
  });
OLD-END
NEW-BEGIN
    expect(blankInertData("echo 'at now")).toBe("echo 'at now");
    // K1 ruling 4 — one word reader for the delimiter: a quoted run holds a space.
    expect(blankInertData("cat <<'A B'\nfix at root\nA B")).toBe("cat <<'A B'\n           \nA B");
    expect(programsOf("if true; then /bin/systemctl status; fi")).toContain("systemctl");
  });
NEW-END
Run `bunx vitest run scripts/conformance/executor-hooks.test.ts -t "EXH-21|EXH-23"`: both fail at BASE — EXH-21 with `if true; then /bin/systemctl status; fi: expected +0 to be 2`, EXH-23 on the `<<'A B'` heredoc (its body is not blanked) — paste both lines.

R2 — the fix. .claude/hooks/lib.ts, these edits:
EDIT .claude/hooks/lib.ts #1
OLD-BEGIN
export type ShellToken = { v: string; op?: string; dynamic: boolean };

/**
 * A quote-aware shell tokenizer, good enough for a guard: it splits a command line into segments
OLD-END
NEW-BEGIN
export type ShellToken = { v: string; op?: string; dynamic: boolean };

/**
 * K1 ruling 4 — where a shell word that starts at `j` ends: at the first whitespace or one of
 * `;&|<>` outside quotes. A quoted run may hold spaces (`<<'A B'` is one word, delimiter "A B");
 * a backslash takes the next character. The one reader of a heredoc's delimiter word, for
 * shellSegments and blankInertData alike.
 */
export function wordEnd(cmd: string, j: number): number {
  let k = j;
  while (k < cmd.length && !/[\s;&|<>]/.test(cmd.charAt(k))) {
    const ch = cmd.charAt(k);
    if (ch === "\\") k += 2;
    else if (ch === "'" || ch === '"') {
      const close = cmd.indexOf(ch, k + 1);
      k = close < 0 ? cmd.length : close + 1;
    } else k += 1;
  }
  return Math.min(k, cmd.length);
}

/**
 * A quote-aware shell tokenizer, good enough for a guard: it splits a command line into segments
NEW-END
EDIT .claude/hooks/lib.ts #2
OLD-BEGIN
        if (cmd[j] === "-") j += 1;
        while (j < n && (cmd[j] === " " || cmd[j] === "\t")) j += 1;
        let k = j;
        while (k < n && !/[\s;&|<>]/.test(cmd[k]!)) k += 1;
        const word = cmd.slice(j, k);
        // The shell's quote removal: <<'A', <<"A", <<\A and <<A'' all end at a line "A" (K1 ruling 2).
OLD-END
NEW-BEGIN
        if (cmd[j] === "-") j += 1;
        while (j < n && (cmd[j] === " " || cmd[j] === "\t")) j += 1;
        const k = wordEnd(cmd, j);
        const word = cmd.slice(j, k);
        // The shell's quote removal: <<'A', <<"A", <<\A and <<A'' all end at a line "A" (K1 ruling 2).
NEW-END
EDIT .claude/hooks/lib.ts #3
OLD-BEGIN
      if (cmd[j] === "-") j += 1;
      while (j < n && (cmd[j] === " " || cmd[j] === "\t")) j += 1;
      let k = j;
      while (k < n && !/[\s;&|<>]/.test(cmd.charAt(k))) k += 1;
      const word = cmd.slice(j, k);
      pending.push({ delim: word.replace(/['"\\]/g, ""), inert: /['"\\]/.test(word) });
OLD-END
NEW-BEGIN
      if (cmd[j] === "-") j += 1;
      while (j < n && (cmd[j] === " " || cmd[j] === "\t")) j += 1;
      const k = wordEnd(cmd, j);
      const word = cmd.slice(j, k);
      pending.push({ delim: word.replace(/['"\\]/g, ""), inert: /['"\\]/.test(word) });
NEW-END
EDIT .claude/hooks/lib.ts #4
OLD-BEGIN
}

const WRAPPERS = new Set([
  "command",
OLD-END
NEW-BEGIN
}

/** K1 ruling 4 — the shell's own words that come before a program in a segment. */
const KEYWORDS = new Set(["if", "then", "elif", "else", "do", "while", "until", "!", "{", "}"]);

const WRAPPERS = new Set([
  "command",
NEW-END
EDIT .claude/hooks/lib.ts #5
OLD-BEGIN
 * One segment's program and its arguments: redirections and their targets set aside, then the
 * assignments and wrappers the shell runs it through skipped (timeout 900 cmd, nice -n 5 cmd,
 * env -i X=1 cmd, sudo cmd). `redirects` holds the redirection targets, `program` the base name
 * of the program the shell would run ("" when there is none), `args` its argument tokens.
 */
OLD-END
NEW-BEGIN
 * One segment's program and its arguments: redirections and their targets set aside, then the
 * assignments and wrappers the shell runs it through skipped (timeout 900 cmd, nice -n 5 cmd,
 * env -i X=1 cmd, sudo cmd) — and, K1 ruling 4, the shell's keywords (`then /bin/systemctl`). A
 * program the shell names through an expansion ("$p", $'at') comes back with its `$`, for the
 * guard to refuse as unreadable. `redirects` holds the redirection targets, `program` the base name
 * of the program the shell would run ("" when there is none), `args` its argument tokens.
 */
NEW-END
EDIT .claude/hooks/lib.ts #6
OLD-BEGIN
  args: ShellToken[];
  redirects: ShellToken[];
} {
  const redirects: ShellToken[] = [];
OLD-END
NEW-BEGIN
  args: ShellToken[];
  redirects: ShellToken[];
  /** True when the shell expands the program's word ("$p", $'at') — K1 ruling 4. */
  dynamic: boolean;
} {
  const redirects: ShellToken[] = [];
NEW-END
EDIT .claude/hooks/lib.ts #7
OLD-BEGIN
  let w = 0;
  while (w < words.length) {
    const v = words[w]!.v;
    const base = v.replace(/^.*\//, "");
    if (/^[A-Za-z_][A-Za-z0-9_]*=/.test(v)) {
      w += 1;
OLD-END
NEW-BEGIN
  let w = 0;
  while (w < words.length) {
    const word = words[w];
    if (word === undefined) break;
    const v = word.v;
    const base = v.replace(/^.*\//, "");
    if (KEYWORDS.has(v)) {
      w += 1;
      continue;
    }
    if (/^[A-Za-z_][A-Za-z0-9_]*=/.test(v)) {
      w += 1;
NEW-END
EDIT .claude/hooks/lib.ts #8
OLD-BEGIN
    args: words.slice(w + 1),
    redirects,
  };
}
OLD-END
NEW-BEGIN
    args: words.slice(w + 1),
    redirects,
    dynamic: words[w]?.dynamic ?? false,
  };
}
NEW-END
EDIT .claude/hooks/lib.ts #9
OLD-BEGIN
}

/**
 * Paths a command writes to: redirection targets plus the targets of the programs that write files.
OLD-END
NEW-BEGIN
}

/**
 * K1 ruling 4 — the programs a command line names through an expansion ("$p" status, $'at' now):
 * the shell decides them at run time, so no reader of the text can; the guard refuses them.
 */
export function unreadablePrograms(cmd: string): string[] {
  return shellSegments(cmd)
    .map((toks) => segmentProgram(toks))
    .filter((segment) => segment.dynamic && /[$`]/.test(segment.program))
    .map((segment) => segment.program);
}

/**
 * Paths a command writes to: redirection targets plus the targets of the programs that write files.
NEW-END
.claude/hooks/bash-guard.ts, these edits:
EDIT .claude/hooks/bash-guard.ts #1
OLD-BEGIN
  blankInertData,
} from "./lib";
OLD-END
NEW-BEGIN
  blankInertData,
  unreadablePrograms,
} from "./lib";
NEW-END
EDIT .claude/hooks/bash-guard.ts #2
OLD-BEGIN

// Shell writes bypass the editing tools: every target goes through the same scope decision.
OLD-END
NEW-BEGIN

// K1 ruling 4 — a program named by an expansion ("$p" status, $'at' now) is one neither reader can
// read: refused, as a refusal of the unreadable.
const unreadable = unreadablePrograms(command)[0];
if (unreadable !== undefined)
  block(
    `BASH GUARD (.claude/hooks/bash-guard.ts): refused — a program named by an expansion (${unreadable}) cannot be read by the guard; name the program itself.\nCommand: ${command.split("\n")[0]}\nA refusal is final: do not look for another spelling of the same action; STOP and report if the brief needs it.`,
  );

// Shell writes bypass the editing tools: every target goes through the same scope decision.
NEW-END
Then `bunx vitest run scripts/conformance/executor-hooks.test.ts` whole: every test passes (paste the totals; the supervisor's run: 24 passed).

THE CHECKS (in this order): `grep -E '^[0-9a-f]{64}  ' docs/governance/briefs/foundations-turn-k1-r4.md | sha256sum -c` — the three lines print OK; `git diff <START> --stat -- src e2e supabase` (empty); `bun run lint` (paste the counts; expected 0 errors, 39 warnings); `bun run test:unit` (paste totals — the supervisor's run: 311 files, 1941 tests, every one passed); `bun run format:check` last.
The hash list (the files as they stand at the end of the turn):
ae4b897b7223286296c7563142c4fa2392c5b50af9659184be96a837dfcb152b  .claude/hooks/lib.ts
90c5a903e819ea52d5a834ac48258b74853ac245853857134cbc45b26a71ee1b  .claude/hooks/bash-guard.ts
e0e849014c7cc8cedb1b7e91451547d9641164d7b2c8896635cbbaa02daddfa0  scripts/conformance/executor-hooks.test.ts

THE COMPLETION REPORT: docs/governance/reports/foundations-turn-k1-r4.report.md, carrying: done or not done by step; the file list from `git diff --name-only <START>`; the behaviour contract — the three cases, the two expansion refusals and the three allowances, before → after; R1's red lines; the unit totals and the EXH lines; the reviewer's verdict and its findings as ruled above; every departure with its reason; the first six lines of ci-status.md for the last commit you can read; every limit. END THE TURN; the supervisor reads the run.

Decisions made here (the supervisor's, under G17; the operator is away and reads them in the record): an expanded program word is refused as unreadable; the shell's keywords are skipped before a program; one delimiter reader; K1 closes with this ruling — later findings BASE also allowed go to a later kit turn.
```
