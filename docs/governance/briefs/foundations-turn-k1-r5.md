# Foundations — turn K1, ruling 5 in brief form: data is inert only where its consumer never runs it; a heredoc's delimiter as the shell reads it; a program named by an expansion, a substitution or a glob (INC-920, DEC-270): brief (saved unchanged, 2026-10-26)

```text
RULING 5 IN BRIEF FORM — FOUNDATIONS TURN K1 (2026-10-26; your STOP on ruling 4: your reviewer's two cases and four report-only spellings, each reproduced by the supervisor on hook input only — and three more the supervisor's own corpus found). Tier B (the executor's own guard rails). No migration. No new string. No package change. No AGENTS.md change. No file deleted. Base: dev 6c445a3e428b341c3d112dbb0990246364fb7f4d (your ruling-4 landing). This brief is the brief in force for the rest of turn K1; foundations-turn-k1.md and -r1 … -r4 stand as done. ONE TURN. Order: STEP 0; R1 (red first); R2 (the fix); THE CHECKS; THE COMPLETION REPORT; END THE TURN. The supervisor sends your briefs directly (the operator is away).
BASE: 6c445a3e428b341c3d112dbb0990246364fb7f4d
FLAGS: no-migration, no-new-string, no-package-change, no-agents-change
SCOPE-BEGIN
.claude/hooks/lib.ts
.claude/hooks/bash-guard.ts
scripts/conformance/executor-hooks.test.ts
SCOPE-END

THE SYSTEM (G0) — the concern of rulings 1–4, and why this ruling narrows DEC-269.
CONCERN: the executor never schedules work or controls a service; the scheduling rule refuses every command that could, and never refuses data that no program of the command runs.
MECHANISM: the guard's readers in .claude/hooks/lib.ts and bash-guard.ts. What your reviewer found, and what the supervisor's corpus of 123 commands (hook input only; the guard before K1 at e024c36e, BASE, and this fix) found beside it, has one root each:
(1) The delimiter. Ruling 2's quote removal strips every quote and backslash, and ruling 4's one word reader now hands it the whole word, so `<<'A\ B'` is read as ending at a line "A B" where the shell ends it at `A\ B` (in single quotes a backslash is literal; POSIX 2.7.4). Your reviewer's case (inert data refused) is one face; the other is worse — `cat <<'A\ B' > /tmp/x` + `hi` + `A\ B` + `at now` + `A B` hides `at now` (refused before K1, allowed at BASE: S441, the supervisor's slip). The fix: heredocDelimiter, the shell's quote removal, the one reading for both readers; wordEnd honours a backslash inside double quotes.
(2) Inert data. DEC-269 blanked "provably inert" data without asking who consumes it: `bash <<'EOF'` + `at now` + `EOF`, `cat <<'EOF' | bash` + `at now` + `EOF` and `echo 'at now' | sh` run their data, and were allowed from ruling 3 (refused before K1: S442, the supervisor's slip). DEC-270 (the supervisor, G17 — it narrows DEC-269): data is inert only where its consumer never runs it — the text rule blanks inert data only when EVERY program of the command is a data-only program (runsOnlyDataPrograms: cat, cd, cut, diff, echo, egrep, fgrep, false, grep, head, ls, printf, pwd, rg, sha256sum, sort, tail, tee, test, tr, true, uniq, wc, `[`, and git only for add, commit, diff, grep, log, ls-files, notes, rev-parse, show, status, tag with no -c, --config-env or --exec); any other command is read whole, as before K1, with a quote or `!` before the word counting too (`vim -c '!at now'`).
(3) Unreadable programs. A program word the shell expands is read by its base name at BASE, which drops the `$` (`"$DIR/echo"`), and a program taken from a substitution's output leaves no word at all (`$(echo /bin/systemctl) status`). The fix: an unquoted `$(` or backquote that starts a word leaves a stand-in (SUBSTITUTED); segmentProgram returns the program's whole word; unreadablePrograms refuses a program named by a variable, $'…', a substitution or a glob (a leading ~ and a lone `[` stay readable) — and the guard asks it before the scheduling rule.
(4) Keywords. A quoted keyword is a word — `'then' "$BIN"` runs a program named then (your reviewer's case): ShellToken gains `quoted`, and segmentProgram skips only unquoted keywords.
CONSUMERS (grep at BASE): bash-guard.ts — the expansion refusal (now first), the scheduling rule (programsOf; the text rule over blankInertData or the whole command), the shell-write rule (writeTargets — the stand-in is never an argument or a redirection target, so no write target changes); lib.ts — wordEnd, shellSegments and blankInertData (the delimiter), segmentProgram (programsOf, writeTargets, unreadablePrograms, runsOnlyDataPrograms).
COVERED HERE: every case above. LEFT (older than K1, listed for the next kit turn, not this one): a scheduler named by its path inside data handed to a shell (`bash <<'EOF'` + `/usr/bin/at now`), a program the shell finds through a variable set by an earlier command (`X='at now'` then `eval $X`), and the 22 lines of older non-null assertions left in .claude/hooks/ (`grep -c '\]!\|)!'`: 25 at BASE; the three inside the double-quote reader, in a hunk this ruling edits, become `charAt` reads).
CONFORMANCE GUARD: EXH-21 gains six refusals by the scheduling rule (the three consumers that run their data, `vim -c '!at now'`, the delimiter case that hid `at now`, and the named edge `bunx vitest run -t "look at this"`), four by the expansion rule (`$(echo /bin/systemctl) status`, `"$DIR/echo" hi`, `/usr/bin/a? now`, `e*ho hi`), and five allowances (your reviewer's two delimiter cases, `'then' "$BIN"`, `[ -f package.json ] && echo "ready at last"`, `~/bin/echo hi`); EXH-23 gains heredocDelimiter's six spellings (each measured against bash by the supervisor), blankInertData on `<<'A\ B'`, runsOnlyDataPrograms true for four commands and false for six, and unreadablePrograms on a substitution, a `[` and a `~`. Red at BASE: R1.
EXCEPTIONS: none. Named edges (fail-closed, deliberate): a scheduler word in an argument of a program outside the data-only set is refused (`bunx vitest run -t "look at this"`) — write such text through a data-only program or a file; any program word the shell expands is refused, scheduler or not (`"$BIN" run`, `e*ho`) — the executor names its programs.
FIVE LENSES — security: the subject; nothing that runs a scheduler and was refused before K1 or at BASE is allowed (the supervisor's corpus); data a program runs is never blanked · performance: one more pass over a short command · failure modes: an expanded program is refused, never guessed; a delimiter the reader cannot read ends no body · consistency: one delimiter reading, one definition of inert data (by its consumer) · future growth: a data-only program is one entry in DATA_ONLY; a git subcommand one entry in GIT_DATA_ONLY.
FORWARD-SCAN: none. REGISTER: the executor-kit row's guard column (the records turn).

STEP 0 — save this brief (the text between the BRIEF-BEGIN and BRIEF-END lines of the message that carried it, title line and fence included, ending with the closing fence and ONE newline) byte for byte as docs/governance/briefs/foundations-turn-k1-r5.md and paste its sha256sum and byte count (the carrying message states both; a difference is a STOP). roadmap.md: on line 3, the text after "The brief in force: " up to and including `(Foundations turn K1, ruling 4 in brief form: a keyword before the program, a program named by an expansion, one delimiter reader — INC-920, DEC-269)` becomes `docs/governance/briefs/foundations-turn-k1-r5.md (Foundations turn K1, ruling 5 in brief form: data is inert only where its consumer never runs it — INC-920, DEC-270)` (everything after it stays, as it is). Tick nothing.

HOW TO WORK
- Order: STEP 0; R1; R2; THE CHECKS; THE COMPLETION REPORT; END THE TURN. Do not stop anywhere else. If the platform ends a turn early, report three lines (done, left, CI) with `git diff --name-only <START>`; the supervisor sends "continue".
- Paste `git rev-parse HEAD` first (<START>; it must be BASE — if not, paste `git diff --name-only BASE..HEAD`; a path in SCOPE is a STOP). Read CI at https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md (the first six lines); a red on BASE is fixed first at its root and named in the report.
- Run no stateful git command. Every EDIT block replaces its OLD text (exactly once at BASE) with its NEW text, in the order given; copy them by script or your file-editing tool from the saved brief, never retyped. THE CHECKS run the brief's hash list against the tree (`sha256sum -c`); a mismatch is fixed by copying the block again, never by editing an expectation. No NEW block carries a non-null assertion (your platform rule; checked by the supervisor's script).
- THE FILES: the SCOPE block above, plus docs/governance/briefs/foundations-turn-k1-r5.md, roadmap.md and docs/governance/reports/foundations-turn-k1-r5.report.md (your completion report). Anything else is a STOP naming the file and why.
- Your platform rule stands: "Do not run the Lovable project's builds or typechecks manually because the harness runs them automatically." After R2, read /tmp/observability/build-errors.log and fix every `error TS` line at its root.
- Behaviour contract: every hook allows and refuses exactly what it does at BASE, except the cases above and the two named edges. Nothing else changes.
- Your reviewer: run it on the last code commit before the report and put its verdict in the report. K1 closes with this ruling. A finding is a STOP only if it is one of these two, with its hook input and the exit codes at BASE and after: (a) a command the shell would run a scheduler or service-control program from (crontab, at, atq, atrm, batch, systemctl, service, launchctl) that BASE refused and this change allows; (b) a command whose every program is in the data-only set, whose scheduler word sits only in data none of them runs, that BASE allowed and this change refuses. Any other finding — a spelling BASE also allowed, a command refused by a named edge, a program word refused as unreadable — is listed in the report with its reproduction for the supervisor's next kit turn, not a STOP.
- Tests (G38): no assertion loosened; the existing EXH cases unchanged. A unit test that times out under the full run's load and passes alone (AAN-1, CF-SL-1) is pasted under limits with both runs; it is not changed (INC-921, a later turn).
- If any rule of yours conflicts with this text, STOP before saving and quote that rule's exact words in the report.

R1 — red first (nothing committed in this step). Apply these edits to the test file:
EDIT scripts/conformance/executor-hooks.test.ts #1
OLD-BEGIN
  blankInertData,
} from "../../.claude/hooks/lib";
OLD-END
NEW-BEGIN
  blankInertData,
  heredocDelimiter,
  runsOnlyDataPrograms,
  unreadablePrograms,
} from "../../.claude/hooks/lib";
NEW-END
EDIT scripts/conformance/executor-hooks.test.ts #2
OLD-BEGIN
      "if true; then /bin/systemctl status; fi",
    ])
      refused(command, /no scheduling or service control/);
    // K1 ruling 4 — a program named by an expansion is unreadable, and refused as such.
    for (const command of ['p=systemctl; "$p" status', "$'at' now"])
      refused(command, /a program named by an expansion/);
OLD-END
NEW-BEGIN
      "if true; then /bin/systemctl status; fi",
      // K1 ruling 5 (DEC-270) — data is inert only where its consumer never runs it: a body fed
      // to a shell, a string piped to one, a command for an editor, and (the named edge) any
      // argument of a program outside the data-only set are read whole.
      "bash <<'EOF'\nat now\nEOF",
      "cat <<'EOF' | bash\nat now\nEOF",
      "echo 'at now' | sh",
      "vim -c '!at now'",
      'bunx vitest run -t "look at this"',
      // K1 ruling 5 — the shell's delimiter here is `A\ B`: the line after it runs.
      "cat <<'A\\ B' > /tmp/x\nhi\nA\\ B\nat now\nA B",
    ])
      refused(command, /no scheduling or service control/);
    // K1 rulings 4 and 5 — a program named by an expansion is unreadable, and refused as such.
    for (const command of [
      'p=systemctl; "$p" status',
      "$'at' now",
      "$(echo /bin/systemctl) status",
      '"$DIR/echo" hi',
      "/usr/bin/a? now",
      "e*ho hi",
    ])
      refused(command, /a program named by an expansion/);
NEW-END
EDIT scripts/conformance/executor-hooks.test.ts #3
OLD-BEGIN
      "for f in a b; do echo $f; done",
    ])
OLD-END
NEW-BEGIN
      "for f in a b; do echo $f; done",
      // K1 ruling 5 — the shell's own delimiters (POSIX quote removal): these bodies are data.
      "cat <<'A\\ B'\n/bin/systemctl status\nA\\ B",
      'cat <<"A\\ B"\n/bin/systemctl status\nA\\ B',
      // A quoted keyword is a program's name; a lone `[` and a leading ~ are readable.
      "'then' \"$BIN\"",
      '[ -f package.json ] && echo "ready at last"',
      "~/bin/echo hi",
    ])
NEW-END
EDIT scripts/conformance/executor-hooks.test.ts #4
OLD-BEGIN
    expect(programsOf("if true; then /bin/systemctl status; fi")).toContain("systemctl");
  });
OLD-END
NEW-BEGIN
    expect(programsOf("if true; then /bin/systemctl status; fi")).toContain("systemctl");
    // K1 ruling 5 — the delimiter as the shell reads it, and the data-only programs.
    expect(heredocDelimiter("'A\\ B'")).toEqual({ delim: "A\\ B", quoted: true });
    expect(heredocDelimiter('"A\\ B"')).toEqual({ delim: "A\\ B", quoted: true });
    expect(heredocDelimiter('"A\\"B"')).toEqual({ delim: 'A"B', quoted: true });
    expect(heredocDelimiter("A\\ B")).toEqual({ delim: "A B", quoted: true });
    expect(heredocDelimiter("A''")).toEqual({ delim: "A", quoted: true });
    expect(heredocDelimiter("EOF")).toEqual({ delim: "EOF", quoted: false });
    expect(blankInertData("cat <<'A\\ B'\nfix at root\nA\\ B")).toBe(
      "cat <<'A\\ B'\n           \nA\\ B",
    );
    for (const command of [
      'git commit -m "fix at root"',
      "cat <<'EOF' > /tmp/n.txt\nat 5\nEOF",
      'cd /tmp && git status && grep -n "at" a.ts | head -3',
      '[ -f x ] && echo "y"',
    ])
      expect(runsOnlyDataPrograms(command), command).toBe(true);
    for (const command of [
      "bash <<'EOF'\nx\nEOF",
      "echo x | sh",
      "git -c core.editor=x commit",
      "git rebase -i HEAD~2",
      "bunx vitest run",
      '"$X" y',
    ])
      expect(runsOnlyDataPrograms(command), command).toBe(false);
    expect(unreadablePrograms("$(echo /bin/systemctl) status")).toEqual(["$(…)"]);
    expect(unreadablePrograms('[ -f x ] && ~/bin/echo "$X"')).toEqual([]);
  });
NEW-END
Run `bunx vitest run scripts/conformance/executor-hooks.test.ts -t "EXH-21|EXH-23"`: both fail at BASE — EXH-21 with `AssertionError: bash <<'EOF'` (its first new refusal; the message ends `expected +0 to be 2`), EXH-23 with `TypeError: heredocDelimiter is not a function` — paste both lines.

R2 — the fix. .claude/hooks/lib.ts, these edits:
EDIT .claude/hooks/lib.ts #1
OLD-BEGIN
}

export type ShellToken = { v: string; op?: string; dynamic: boolean };

/**
OLD-END
NEW-BEGIN
}

/**
 * One word or operator of a segment. `dynamic`: the shell expands it ($VAR, backticks, unquoted
 * globs, a leading ~). `quoted` (K1 ruling 5): a quote or a backslash took part in it, so it is
 * never a shell keyword (`'then'` runs a program named then). An unquoted `$(` or backquote that
 * starts a word leaves `SUBSTITUTED` in its place: a program named by a substitution is unreadable.
 */
export type ShellToken = { v: string; op?: string; dynamic: boolean; quoted?: boolean };

/** K1 ruling 5 — the stand-in for a word the shell takes from a command substitution's output. */
export const SUBSTITUTED = "$(…)";

/**
NEW-END
EDIT .claude/hooks/lib.ts #2
OLD-BEGIN
    const ch = cmd.charAt(k);
    if (ch === "\\") k += 2;
    else if (ch === "'" || ch === '"') {
      const close = cmd.indexOf(ch, k + 1);
      k = close < 0 ? cmd.length : close + 1;
    } else k += 1;
  }
OLD-END
NEW-BEGIN
    const ch = cmd.charAt(k);
    if (ch === "\\") k += 2;
    else if (ch === "'") {
      const close = cmd.indexOf(ch, k + 1);
      k = close < 0 ? cmd.length : close + 1;
    } else if (ch === '"') {
      // K1 ruling 5 — inside double quotes a backslash takes the next character (`"A\"B"`).
      k += 1;
      while (k < cmd.length && cmd.charAt(k) !== '"') k += cmd.charAt(k) === "\\" ? 2 : 1;
      k += 1;
    } else k += 1;
  }
NEW-END
EDIT .claude/hooks/lib.ts #3
OLD-BEGIN
}

/**
 * A quote-aware shell tokenizer, good enough for a guard: it splits a command line into segments
OLD-END
NEW-BEGIN
}

/**
 * K1 ruling 5 — A HEREDOC'S DELIMITER, AS THE SHELL READS IT (POSIX 2.7.4: quote removal on the
 * word; the body expands only when no part of the word is quoted). In single quotes every
 * character is literal (`<<'A\ B'` ends at a line `A\ B`); in double quotes a backslash is removed
 * only before `$`, a backquote, `"` or a backslash (`<<"A\"B"` ends at `A"B`, `<<"A\ B"` at
 * `A\ B`); outside quotes a backslash is removed and keeps the next character (`<<A\ B` ends at
 * `A B`). The one reading of the delimiter, for shellSegments and blankInertData alike.
 */
export function heredocDelimiter(word: string): { delim: string; quoted: boolean } {
  let delim = "";
  let quoted = false;
  let k = 0;
  while (k < word.length) {
    const ch = word.charAt(k);
    if (ch === "'") {
      quoted = true;
      const close = word.indexOf("'", k + 1);
      const end = close < 0 ? word.length : close;
      delim += word.slice(k + 1, end);
      k = end + 1;
    } else if (ch === '"') {
      quoted = true;
      k += 1;
      while (k < word.length && word.charAt(k) !== '"') {
        const d = word.charAt(k);
        const e = word.charAt(k + 1);
        if (d === "\\" && e !== "" && '$`"\\'.includes(e)) {
          delim += e;
          k += 2;
        } else {
          delim += d;
          k += 1;
        }
      }
      k += 1;
    } else if (ch === "\\") {
      quoted = true;
      delim += word.charAt(k + 1);
      k += 2;
    } else {
      delim += ch;
      k += 1;
    }
  }
  return { delim, quoted };
}

/**
 * A quote-aware shell tokenizer, good enough for a guard: it splits a command line into segments
NEW-END
EDIT .claude/hooks/lib.ts #4
OLD-BEGIN
  let started = false;
  let dynamic = false;
  const heredocs: Array<{ delim: string; expands: boolean }> = [];
  const flush = () => {
    if (started) seg.push({ v: cur, dynamic });
    cur = "";
    started = false;
    dynamic = false;
  };
  const endSegment = () => {
OLD-END
NEW-BEGIN
  let started = false;
  let dynamic = false;
  let quoted = false;
  const heredocs: Array<{ delim: string; expands: boolean }> = [];
  const flush = () => {
    if (started) seg.push(quoted ? { v: cur, dynamic, quoted } : { v: cur, dynamic });
    cur = "";
    started = false;
    dynamic = false;
    quoted = false;
  };
  const endSegment = () => {
NEW-END
EDIT .claude/hooks/lib.ts #5
OLD-BEGIN
      cur += next;
      started = true;
      i += 2;
      continue;
OLD-END
NEW-BEGIN
      cur += next;
      started = true;
      quoted = true;
      i += 2;
      continue;
NEW-END
EDIT .claude/hooks/lib.ts #6
OLD-BEGIN
      cur += body;
      started = true;
      i = close < 0 ? n : close + 1;
      continue;
OLD-END
NEW-BEGIN
      cur += body;
      started = true;
      quoted = true;
      i = close < 0 ? n : close + 1;
      continue;
NEW-END
EDIT .claude/hooks/lib.ts #7
OLD-BEGIN
      i += 1;
      started = true;
      while (i < n && cmd[i] !== '"') {
        const d = cmd[i]!;
        if (d === "\\" && i + 1 < n && '"$`\\'.includes(cmd[i + 1]!)) {
          cur += cmd[i + 1]!;
          i += 2;
          continue;
OLD-END
NEW-BEGIN
      i += 1;
      started = true;
      quoted = true;
      while (i < n && cmd[i] !== '"') {
        const d = cmd.charAt(i);
        if (d === "\\" && i + 1 < n && '"$`\\'.includes(cmd.charAt(i + 1))) {
          cur += cmd.charAt(i + 1);
          i += 2;
          continue;
NEW-END
EDIT .claude/hooks/lib.ts #8
OLD-BEGIN
        while (j < n && (cmd[j] === " " || cmd[j] === "\t")) j += 1;
        const k = wordEnd(cmd, j);
        const word = cmd.slice(j, k);
        // The shell's quote removal: <<'A', <<"A", <<\A and <<A'' all end at a line "A" (K1 ruling 2).
        heredocs.push({ delim: word.replace(/['"\\]/g, ""), expands: !/['"\\]/.test(word) });
        seg.push({ v: "<<", op: "<<", dynamic: false });
        i = k;
OLD-END
NEW-BEGIN
        while (j < n && (cmd[j] === " " || cmd[j] === "\t")) j += 1;
        const k = wordEnd(cmd, j);
        // The shell's quote removal (K1 rulings 2 and 5): <<'A', <<"A", <<\A and <<A'' end at "A".
        const { delim, quoted: literal } = heredocDelimiter(cmd.slice(j, k));
        heredocs.push({ delim, expands: !literal });
        seg.push({ v: "<<", op: "<<", dynamic: false });
        i = k;
NEW-END
EDIT .claude/hooks/lib.ts #9
OLD-BEGIN
    }
    if (c === "$" && next === "(") {
      endSegment();
      i += 2;
      continue;
    }
    if (c === ";" || c === "|" || c === "&" || c === "(" || c === ")" || c === "`") {
      endSegment();
OLD-END
NEW-BEGIN
    }
    if (c === "$" && next === "(") {
      // K1 ruling 5 — a word the shell takes from a substitution's output: its stand-in.
      if (!started) seg.push({ v: SUBSTITUTED, op: SUBSTITUTED, dynamic: true });
      endSegment();
      i += 2;
      continue;
    }
    if (c === "`" && !started) seg.push({ v: SUBSTITUTED, op: SUBSTITUTED, dynamic: true });
    if (c === ";" || c === "|" || c === "&" || c === "(" || c === ")" || c === "`") {
      endSegment();
NEW-END
EDIT .claude/hooks/lib.ts #10
OLD-BEGIN
      while (j < n && (cmd[j] === " " || cmd[j] === "\t")) j += 1;
      const k = wordEnd(cmd, j);
      const word = cmd.slice(j, k);
      pending.push({ delim: word.replace(/['"\\]/g, ""), inert: /['"\\]/.test(word) });
      out += cmd.slice(i, k);
      i = k;
OLD-END
NEW-BEGIN
      while (j < n && (cmd[j] === " " || cmd[j] === "\t")) j += 1;
      const k = wordEnd(cmd, j);
      const { delim, quoted } = heredocDelimiter(cmd.slice(j, k));
      pending.push({ delim, inert: quoted });
      out += cmd.slice(i, k);
      i = k;
NEW-END
EDIT .claude/hooks/lib.ts #11
OLD-BEGIN
 * One segment's program and its arguments: redirections and their targets set aside, then the
 * assignments and wrappers the shell runs it through skipped (timeout 900 cmd, nice -n 5 cmd,
 * env -i X=1 cmd, sudo cmd) — and, K1 ruling 4, the shell's keywords (`then /bin/systemctl`). A
 * program the shell names through an expansion ("$p", $'at') comes back with its `$`, for the
 * guard to refuse as unreadable. `redirects` holds the redirection targets, `program` the base name
 * of the program the shell would run ("" when there is none), `args` its argument tokens.
 */
export function segmentProgram(toks: ShellToken[]): {
  program: string;
  args: ShellToken[];
  redirects: ShellToken[];
OLD-END
NEW-BEGIN
 * One segment's program and its arguments: redirections and their targets set aside, then the
 * assignments and wrappers the shell runs it through skipped (timeout 900 cmd, nice -n 5 cmd,
 * env -i X=1 cmd, sudo cmd) — and, K1 ruling 4, the shell's keywords (`then /bin/systemctl`; a
 * quoted one is a word, K1 ruling 5). A program the shell names through an expansion ("$p", $'at',
 * a substitution, a glob) comes back as its whole word in `word`, for the guard to refuse as
 * unreadable. `redirects` holds the redirection targets, `program` the base name of the program
 * the shell would run ("" when there is none), `args` its argument tokens (a substitution's
 * stand-in is not one: what it holds is read as its own segments).
 */
export function segmentProgram(toks: ShellToken[]): {
  program: string;
  /** The program's whole word, before its directory is set aside (K1 ruling 5). */
  word: string;
  args: ShellToken[];
  redirects: ShellToken[];
NEW-END
EDIT .claude/hooks/lib.ts #12
OLD-BEGIN
    const v = word.v;
    const base = v.replace(/^.*\//, "");
    if (KEYWORDS.has(v)) {
      w += 1;
      continue;
OLD-END
NEW-BEGIN
    const v = word.v;
    const base = v.replace(/^.*\//, "");
    if (KEYWORDS.has(v) && word.quoted !== true) {
      w += 1;
      continue;
NEW-END
EDIT .claude/hooks/lib.ts #13
OLD-BEGIN
  return {
    program: (words[w]?.v ?? "").replace(/^.*\//, ""),
    args: words.slice(w + 1),
    redirects,
    dynamic: words[w]?.dynamic ?? false,
OLD-END
NEW-BEGIN
  return {
    program: (words[w]?.v ?? "").replace(/^.*\//, ""),
    word: words[w]?.v ?? "",
    args: words.slice(w + 1).filter((t) => t.op !== SUBSTITUTED),
    redirects,
    dynamic: words[w]?.dynamic ?? false,
NEW-END
EDIT .claude/hooks/lib.ts #14
OLD-BEGIN

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

OLD-END
NEW-BEGIN

/**
 * K1 rulings 4 and 5 — the programs a command line names through an expansion: a variable ("$p"
 * status, "$DIR/echo" hi), $'…' ($'at' now), a substitution ($(echo /bin/systemctl) status,
 * `echo at` now) or a glob (/usr/bin/a? now, e*ho hi) — read by the whole word, never by its base
 * name. The shell decides them at run time, so no reader of the text can; the guard refuses them.
 * A leading ~ is not one (the home directory keeps the program's name), nor a lone `[` (test).
 */
const UNREADABLE_WORD = /[$`*?]|\[[^\]]*\]/;
export function unreadablePrograms(cmd: string): string[] {
  return shellSegments(cmd)
    .map((toks) => segmentProgram(toks))
    .filter((segment) => segment.dynamic && UNREADABLE_WORD.test(segment.word))
    .map((segment) => segment.word);
}

/**
 * K1 ruling 5 (DEC-270) — DATA IS INERT ONLY WHERE ITS CONSUMER NEVER RUNS IT. The programs that
 * never run the strings or the heredoc bodies they are handed; git only for the subcommands that
 * do not (no `-c` configuration, no `--exec`). A command whose every program is one of these may
 * have its quoted data blanked for a text rule (blankInertData); any other — bash -c '…', a body
 * fed to bash, an argument of a program the guard does not know — is read whole.
 */
const DATA_ONLY = new Set([
  "cat",
  "cd",
  "cut",
  "diff",
  "echo",
  "egrep",
  "fgrep",
  "false",
  "git",
  "grep",
  "head",
  "ls",
  "printf",
  "pwd",
  "rg",
  "sha256sum",
  "sort",
  "tail",
  "tee",
  "test",
  "tr",
  "true",
  "uniq",
  "wc",
  "[",
]);
const GIT_DATA_ONLY = new Set([
  "add",
  "commit",
  "diff",
  "grep",
  "log",
  "ls-files",
  "notes",
  "rev-parse",
  "show",
  "status",
  "tag",
]);
export function runsOnlyDataPrograms(cmd: string): boolean {
  return shellSegments(cmd).every((toks) => {
    const { program, word, args, dynamic } = segmentProgram(toks);
    if (program === "") return true;
    if ((dynamic && UNREADABLE_WORD.test(word)) || !DATA_ONLY.has(program)) return false;
    if (program !== "git") return true;
    if (args.some((a) => a.v === "-c" || a.v === "--config-env" || a.v.startsWith("--exec")))
      return false;
    return args.some((a) => GIT_DATA_ONLY.has(a.v));
  });
}

NEW-END
.claude/hooks/bash-guard.ts, these edits:
EDIT .claude/hooks/bash-guard.ts #1
OLD-BEGIN
  unreadablePrograms,
} from "./lib";
OLD-END
NEW-BEGIN
  unreadablePrograms,
  runsOnlyDataPrograms,
} from "./lib";
NEW-END
EDIT .claude/hooks/bash-guard.ts #2
OLD-BEGIN

// INC-889 — scheduling and service control, read where the shell runs a program (each segment's
OLD-END
NEW-BEGIN

// K1 rulings 4 and 5 — a program named by an expansion ("$p" status, $'at' now, $(…) status, a
// glob) is one neither reader can read: refused first, as a refusal of the unreadable.
const unreadable = unreadablePrograms(command)[0];
if (unreadable !== undefined)
  block(
    `BASH GUARD (.claude/hooks/bash-guard.ts): refused — a program named by an expansion (${unreadable}) cannot be read by the guard; name the program itself.\nCommand: ${command.split("\n")[0]}\nA refusal is final: do not look for another spelling of the same action; STOP and report if the brief needs it.`,
  );

// INC-889 — scheduling and service control, read where the shell runs a program (each segment's
NEW-END
EDIT .claude/hooks/bash-guard.ts #3
OLD-BEGIN
// so a spelling the program reader cannot see (a program started by another program, a comment,
// an unclosed body) is still refused.
const SCHEDULERS = new Set([
OLD-END
NEW-BEGIN
// so a spelling the program reader cannot see (a program started by another program, a comment,
// an unclosed body) is still refused. K1 ruling 5 (DEC-270) — data is inert only where its
// consumer never runs it: the text is blanked only when every program of the command is one that
// never runs its data (runsOnlyDataPrograms); bash -c '…', a body fed to bash, or an argument of
// any other program is read whole, as before K1 (the command and its normalised text).
const SCHEDULERS = new Set([
NEW-END
EDIT .claude/hooks/bash-guard.ts #4
OLD-BEGIN
const SCHEDULER_WORD = /(^|[\s;&|(`])(crontab|at|atq|atrm|batch|systemctl|service|launchctl)\b/;
const scheduler =
  [...programsOf(command), ...programsOf(norm)].find((program) => SCHEDULERS.has(program)) ??
  SCHEDULER_WORD.exec(blankInertData(command))?.[2];
if (scheduler !== undefined)
OLD-END
NEW-BEGIN
const SCHEDULER_WORD = /(^|[\s;&|(`])(crontab|at|atq|atrm|batch|systemctl|service|launchctl)\b/;
// Read whole, a quote or a `!` before the word counts too: `echo 'at now' | sh` hands sh a
// command, and `vim -c '!at now'` runs one.
const SCHEDULER_WORD_WHOLE =
  /(^|[\s;&|(`'"!])(crontab|at|atq|atrm|batch|systemctl|service|launchctl)\b/;
const wordTexts = runsOnlyDataPrograms(command)
  ? [{ text: blankInertData(command), re: SCHEDULER_WORD }]
  : [
      { text: command, re: SCHEDULER_WORD_WHOLE },
      { text: norm, re: SCHEDULER_WORD_WHOLE },
    ];
const scheduler =
  [...programsOf(command), ...programsOf(norm)].find((program) => SCHEDULERS.has(program)) ??
  wordTexts.map(({ text, re }) => re.exec(text)?.[2]).find((word) => word !== undefined);
if (scheduler !== undefined)
NEW-END
EDIT .claude/hooks/bash-guard.ts #5
OLD-BEGIN

// K1 ruling 4 — a program named by an expansion ("$p" status, $'at' now) is one neither reader can
// read: refused, as a refusal of the unreadable.
const unreadable = unreadablePrograms(command)[0];
if (unreadable !== undefined)
  block(
    `BASH GUARD (.claude/hooks/bash-guard.ts): refused — a program named by an expansion (${unreadable}) cannot be read by the guard; name the program itself.\nCommand: ${command.split("\n")[0]}\nA refusal is final: do not look for another spelling of the same action; STOP and report if the brief needs it.`,
  );

// Shell writes bypass the editing tools: every target goes through the same scope decision.
OLD-END
NEW-BEGIN

// Shell writes bypass the editing tools: every target goes through the same scope decision.
NEW-END
Then `bunx vitest run scripts/conformance/executor-hooks.test.ts` whole: every test passes (paste the totals; the supervisor's run: 24 passed).

THE CHECKS (in this order): `grep -E '^[0-9a-f]{64}  ' docs/governance/briefs/foundations-turn-k1-r5.md | sha256sum -c` — the three lines print OK; `git diff <START> --stat -- src e2e supabase` (empty); `bun run lint` (paste the counts; expected 0 errors, 39 warnings); `bun run test:unit` (paste totals — the supervisor's run: 311 files, 1941 tests, every one passed (your ruling-4 run: 1940 passed, 1 skipped)); `bun run format:check` last.
The hash list (the files as they stand at the end of the turn):
8358887a2932350a3c03db2d6373638508b0fc6f6b5b087184fa2aaf1ec5088f  .claude/hooks/lib.ts
4a31ad5f91fca80275de6a5cdbf565c37ec37832a16cf4161d12663c3e19e9e9  .claude/hooks/bash-guard.ts
ebe45013114d86b9d023c0968f940063eab46b67e70d201ee5fa91628b98687d  scripts/conformance/executor-hooks.test.ts

THE COMPLETION REPORT: docs/governance/reports/foundations-turn-k1-r5.report.md, carrying: done or not done by step; the file list from `git diff --name-only <START>`; the behaviour contract — the fifteen new EXH-21 cases, before → after; R1's red lines; the unit totals and the EXH lines; the reviewer's verdict and its findings as ruled above; every departure with its reason; the first six lines of ci-status.md for the last commit you can read; every limit. END THE TURN; the supervisor reads the run.

Decisions made here (the supervisor's, under G17; the operator is away and reads them in the record): DEC-270 (data is inert only where its consumer never runs it — the data-only set above; any other command read whole); the delimiter by the shell's quote removal; a program named by a variable, $'…', a substitution or a glob refused as unreadable, before the scheduling rule; a quoted keyword is a word; K1 closes with this ruling — later findings as ruled above go to the next kit turn.
```
