/**
 * Shared helpers for the executor hooks (Claude Code, Bun runtime).
 *
 * Every hook reads one JSON object from stdin (the event), decides, and either
 * exits 0 (allow; stdout may add context) or exits 2 with the reason on stderr
 * (block; Claude sees the reason). Nothing here imports a package: Bun's
 * standard library only, so a hook can never fail for want of node_modules.
 */
import { existsSync, readFileSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";

export type HookEvent = {
  hook_event_name?: string;
  session_id?: string;
  cwd?: string;
  tool_name?: string;
  tool_input?: Record<string, unknown>;
  tool_response?: unknown;
  prompt?: string;
  stop_hook_active?: boolean;
  trigger?: string;
  source?: string;
};

export const PROJECT_DIR = resolve(process.env["CLAUDE_PROJECT_DIR"] ?? process.cwd());

export async function readEvent(): Promise<HookEvent> {
  const text = await Bun.stdin.text();
  if (text.trim() === "") return {};
  try {
    return JSON.parse(text) as HookEvent;
  } catch {
    return {};
  }
}

/** Block: the reason reaches Claude; the tool call (or the stop) does not happen. */
export function block(reason: string): never {
  process.stderr.write(reason.endsWith("\n") ? reason : `${reason}\n`);
  process.exit(2);
}

/** Allow with extra context for Claude (UserPromptSubmit / SessionStart print to stdout). */
export function say(text: string): void {
  process.stdout.write(text.endsWith("\n") ? text : `${text}\n`);
}

/** A repo-relative, forward-slash path for any absolute or relative input. */
export function repoPath(p: string): string {
  const abs = resolve(PROJECT_DIR, p);
  return relative(PROJECT_DIR, abs).split("\\").join("/");
}

export function inRepo(rel: string): boolean {
  return rel !== "" && !rel.startsWith("..") && !rel.startsWith("/");
}

/** Glob → RegExp: `**` any depth, `*` one segment, `?` one char; a bare directory matches its tree. */
export function globToRegExp(glob: string): RegExp {
  let g = glob.trim().replace(/^\.\//, "");
  if (g.endsWith("/")) g = `${g}**`;
  let re = "";
  for (let i = 0; i < g.length; i += 1) {
    const c = g[i]!;
    if (c === "*") {
      if (g[i + 1] === "*") {
        const slashAfter = g[i + 2] === "/";
        re += slashAfter ? "(?:.*/)?" : ".*";
        i += slashAfter ? 2 : 1;
      } else {
        re += "[^/]*";
      }
    } else if (c === "?") {
      re += "[^/]";
    } else if ("\\^$+.()|{}[]".includes(c)) {
      re += `\\${c}`;
    } else {
      re += c;
    }
  }
  return new RegExp(`^${re}$`);
}

export function matchesAny(rel: string, globs: readonly string[]): string | null {
  for (const glob of globs) {
    if (globToRegExp(glob).test(rel)) return glob;
  }
  return null;
}

/** The standing allowance: paths every turn may touch without naming them (00-executor-protocol.md). */
export const STANDING_ALLOWANCE: readonly string[] = [
  "docs/governance/briefs/**",
  "roadmap.md",
  "docs/_changelog.md",
  "docs/features/**",
  "docs/governance/mechanisms.md",
  "docs/tracking/intentional-deletions.txt",
  "scripts/conformance/*-allowlist.txt",
  "docs/generated/i18n-usage.json",
  "public/i18n-usage.json",
  "docs/governance/reports/**",
  ".claude/turn/**",
];

/** Paths no turn may edit by hand, whatever the brief says (regenerated, platform-owned or locked). */
export const NEVER_EDIT: readonly string[] = [
  "src/integrations/supabase/types.ts",
  "src/routeTree.gen.ts",
  "src/integrations/supabase/previewAuthStorage.ts",
  "bun.lock",
  "package-lock.json",
  "pnpm-lock.yaml",
  ".env",
  ".env.*",
  ".claude/settings.json",
  ".claude/settings.local.json",
  ".claude/hooks/**",
  ".claude/rules/**",
  ".claude/agents/**",
  ".claude/skills/**",
  ".mcp.json",
  "CLAUDE.md",
  ".github/workflows/**",
];

/** Ignored build and cache output: a shell may write there without naming it in the brief. */
export const BUILD_OUTPUT: readonly string[] = [
  "node_modules",
  "dist",
  ".output",
  ".vinxi",
  ".vite",
  "test-results",
  "e2e-results",
  "playwright-report",
  "coverage",
  "node_modules/**",
  "dist/**",
  ".output/**",
  ".vinxi/**",
  ".vite/**",
  "test-results/**",
  "e2e-results/**",
  "playwright-report/**",
  "coverage/**",
  ".turbo/**",
];

/** roadmap.md line 3 names the brief in force: "The brief in force: docs/governance/briefs/<file>.md ..." */
export function briefInForce(): string | null {
  const roadmap = join(PROJECT_DIR, "roadmap.md");
  if (!existsSync(roadmap)) return null;
  const lines = readFileSync(roadmap, "utf8").split("\n");
  const line = lines.find((l) => /brief in force/i.test(l)) ?? lines[2] ?? "";
  const m = line.match(/(docs\/governance\/briefs\/[A-Za-z0-9._-]+\.md)/);
  return m ? m[1]! : null;
}

export type Scope = { brief: string | null; globs: string[]; base: string | null; flags: string[] };

/**
 * The brief's machine lines, inside its fenced block:
 *   BASE: <40-hex sha of dev the brief was written against>
 *   FLAGS: no-migration, no-new-string, no-package-change, no-agents-change   (any subset, or none)
 *   SCOPE-BEGIN … one glob per line … SCOPE-END
 */
export function readScope(): Scope {
  const brief = briefInForce();
  const out: Scope = { brief, globs: [], base: null, flags: [] };
  if (brief === null) return out;
  const file = join(PROJECT_DIR, brief);
  if (!existsSync(file) || !statSync(file).isFile()) return out;
  const text = readFileSync(file, "utf8");
  const m = text.match(/^SCOPE-BEGIN\s*$([\s\S]*?)^SCOPE-END\s*$/m);
  if (m) {
    out.globs = m[1]!
      .split("\n")
      .map((l) => l.replace(/#.*$/, "").trim())
      .filter((l) => l !== "");
  }
  const b = text.match(/^BASE:\s*([0-9a-f]{7,40})\s*$/m);
  out.base = b ? b[1]! : null;
  // FLAGS: no-migration, no-new-string, no-package-change, no-agents-change  (a deliberate line, never prose)
  const f = text.match(/^FLAGS:\s*(.*)$/m);
  if (f) {
    out.flags = f[1]!
      .split(/[,\s]+/)
      .map((t) => t.trim().toLowerCase())
      .filter((t) => KNOWN_FLAGS.includes(t));
  }
  return out;
}

export const KNOWN_FLAGS: readonly string[] = [
  "no-migration",
  "no-new-string",
  "no-package-change",
  "no-agents-change",
];

/** The branch the executor works on, and the only branch it lands on (DEC-020: main moves by CI's promote). */
export const WORK_BRANCH = "dev";

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
export function reportPaths(brief: string | null): { final: string; stopPrefix: string } | null {
  if (brief === null) return null;
  const stem = brief.replace(/^.*\//, "").replace(/\.md$/, "");
  return {
    final: `docs/governance/reports/${stem}.report.md`,
    stopPrefix: `docs/governance/reports/${stem}.stop-`,
  };
}

/** Lines of a command's output, trimmed, empties dropped. */
export function lines(text: string): string[] {
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l !== "");
}

/** Commits on HEAD that origin/dev does not have (what a landing would add). */
export function unlanded(): string[] {
  return lines(git(["rev-list", `origin/${WORK_BRANCH}..HEAD`]));
}

/* ------------------------------------------------------------------------------------------------
 * Shell command analysis for the Bash guard. Text matching is evadable by construction (the
 * Claude Code docs list `git -C . push`, `git -c … push`, `git 'push'`, `/bin/rm`, `bash -c`); the
 * normaliser undoes the documented spellings, and the diff check in the Stop gate is the authority.
 * ---------------------------------------------------------------------------------------------- */

const GIT_GLOBAL_OPTION = String.raw`(?:-C\s+\S+|-c\s+\S+|--git-dir(?:=\S+|\s+\S+)|--work-tree(?:=\S+|\s+\S+)|--namespace(?:=\S+|\s+\S+)|--exec-path(?:=\S+)?|--no-pager|--paginate|-p|-P|--bare|--no-replace-objects|--literal-pathspecs|--glob-pathspecs|--noglob-pathspecs|--icase-pathspecs|--no-optional-locks|--config-env=\S+|--super-prefix=\S+)`;
const SEGMENT_START = String.raw`(^|[\s;&|(\`{])`;

/** Undo the spellings that hide a command from a text match. The result is for MATCHING only. */
export function normaliseCommand(cmd: string): string {
  let s = cmd.replace(/\\\r?\n/g, " ");
  s = s.replace(/''|""/g, ""); // g''it → git
  s = s.replace(/'([A-Za-z0-9_./:=+@%,-]+)'/g, "$1").replace(/"([A-Za-z0-9_./:=+@%,-]+)"/g, "$1"); // 'push' → push
  s = s.replace(
    new RegExp(
      `${SEGMENT_START}(?:/usr/local/bin/|/usr/bin/|/bin/|/usr/sbin/|/sbin/|/opt/homebrew/bin/)(?=[a-z])`,
      "g",
    ),
    "$1",
  ); // /bin/rm → rm
  s = s.replace(
    new RegExp(
      `${SEGMENT_START}(?:command|builtin|exec|nohup|time|sudo|doas|nice(?:\\s+-n\\s*\\d+)?|ionice(?:\\s+-c\\s*\\d+)?|timeout\\s+\\S+)\\s+(?=[a-z/])`,
      "g",
    ),
    "$1",
  );
  s = s.replace(
    new RegExp(
      `${SEGMENT_START}env\\s+(?:-i\\s+)?(?:[A-Za-z_][A-Za-z0-9_]*=\\S*\\s+)*(?=[a-z])`,
      "g",
    ),
    "$1",
  ); // env X=1 git → git
  s = s.replace(
    new RegExp(`${SEGMENT_START}(?:[A-Za-z_][A-Za-z0-9_]*=\\S*\\s+)+(?=[a-z])`, "g"),
    "$1",
  ); // X=1 git → git
  s = s.replace(new RegExp(String.raw`\bgit(?:\s+${GIT_GLOBAL_OPTION})+\s+`, "g"), "git "); // git -C . push → git push
  return s;
}

export type ShellToken = { v: string; op?: string; dynamic: boolean };

/**
 * A quote-aware shell tokenizer, good enough for a guard: it splits a command line into segments
 * at `;`, `&&`, `||`, `|`, `&`, newlines, `(`, `)`, `$(` and backticks — never inside quotes — and
 * each segment into words and redirection operators. Heredoc bodies are skipped (they are data).
 * A word is `dynamic` when the shell would expand it ($VAR, backticks, unquoted globs, a leading ~).
 * K1 ruling 1 (INC-889's sibling, found by K1's reviewer) — the shell RUNS a command substitution
 * inside double quotes ("$(…)", "`…`") and inside an unquoted heredoc's body (<<EOF, not <<'EOF'):
 * each such body's own segments are appended after the line's, so every rule that reads programs
 * or write targets sees them. Only appended: the line's own segments are unchanged. A `$(` inside a
 * quoted heredoc nested in a substitution is read too (fail-closed: a refusal, never a miss).
 */
export function shellSegments(cmd: string): ShellToken[][] {
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
  let cur = "";
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
    flush();
    if (seg.length > 0) segments.push(seg);
    seg = [];
  };
  let i = 0;
  const n = cmd.length;
  while (i < n) {
    const c = cmd[i]!;
    const next = cmd[i + 1] ?? "";
    if (c === "\\") {
      if (next === "\n") {
        i += 2;
        continue;
      }
      cur += next;
      started = true;
      i += 2;
      continue;
    }
    if (c === "'") {
      const close = cmd.indexOf("'", i + 1);
      const body = close < 0 ? cmd.slice(i + 1) : cmd.slice(i + 1, close);
      cur += body;
      started = true;
      i = close < 0 ? n : close + 1;
      continue;
    }
    if (c === '"') {
      i += 1;
      started = true;
      while (i < n && cmd[i] !== '"') {
        const d = cmd[i]!;
        if (d === "\\" && i + 1 < n && '"$`\\'.includes(cmd[i + 1]!)) {
          cur += cmd[i + 1]!;
          i += 2;
          continue;
        }
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
      }
      i += 1;
      continue;
    }
    if (c === "#" && !started) {
      while (i < n && cmd[i] !== "\n") i += 1;
      continue;
    }
    if (c === "\n") {
      endSegment();
      i += 1;
      while (heredocs.length > 0) {
        const { delim, expands } = heredocs.shift()!;
        const lines: string[] = [];
        while (i < n) {
          const eol = cmd.indexOf("\n", i);
          const line = eol < 0 ? cmd.slice(i) : cmd.slice(i, eol);
          i = eol < 0 ? n : eol + 1;
          if (line.replace(/^\t+/, "").trim() === delim) break;
          lines.push(line);
        }
        if (expands) expandedBody(lines.join("\n"));
      }
      continue;
    }
    if (c === " " || c === "\t" || c === "\r") {
      flush();
      i += 1;
      continue;
    }
    if (c === ">" || (c === "&" && next === ">")) {
      // an fd prefix (2>, &>) belongs to the operator, not to the previous word
      if (started && /^\d+$/.test(cur)) {
        cur = "";
        started = false;
      }
      flush();
      let j = c === "&" ? i + 2 : i + 1;
      let op = ">";
      if (cmd[j] === ">") {
        op = ">>";
        j += 1;
      }
      if (cmd[j] === "|") j += 1;
      if (c === ">" && cmd[j] === "&") {
        // >&2, >&- : a descriptor duplication, not a file
        j += 1;
        while (j < n && /[\d-]/.test(cmd[j]!)) j += 1;
        i = j;
        continue;
      }
      seg.push({ v: op, op, dynamic: false });
      i = j;
      continue;
    }
    if (c === "<") {
      flush();
      if (next === "<" && cmd[i + 2] === "<") {
        seg.push({ v: "<<<", op: "<<<", dynamic: false });
        i += 3;
        continue;
      }
      if (next === "<") {
        let j = i + 2;
        if (cmd[j] === "-") j += 1;
        while (j < n && (cmd[j] === " " || cmd[j] === "\t")) j += 1;
        let k = j;
        while (k < n && !/[\s;&|<>]/.test(cmd[k]!)) k += 1;
        const word = cmd.slice(j, k);
        heredocs.push({ delim: word.replace(/^['"]|['"]$/g, ""), expands: !/['"\\]/.test(word) });
        seg.push({ v: "<<", op: "<<", dynamic: false });
        i = k;
        continue;
      }
      if (next === "(") {
        endSegment();
        i += 2;
        continue;
      }
      seg.push({ v: "<", op: "<", dynamic: false });
      i += 1;
      continue;
    }
    if (c === "$" && next === "(") {
      endSegment();
      i += 2;
      continue;
    }
    if (c === ";" || c === "|" || c === "&" || c === "(" || c === ")" || c === "`") {
      endSegment();
      i += c === next && (c === "&" || c === "|" || c === ";") ? 2 : 1;
      continue;
    }
    if (c === "$" || c === "*" || c === "?" || c === "[" || (c === "~" && !started)) dynamic = true;
    cur += c;
    started = true;
    i += 1;
  }
  endSegment();
  return [...segments, ...inner];
}

/** The command split at every shell operator, so each piece starts with its own program. */
export function commandSegments(cmd: string): string[] {
  return shellSegments(cmd).map((toks) => toks.map((t) => t.v).join(" "));
}

const WRAPPERS = new Set([
  "command",
  "builtin",
  "exec",
  "nohup",
  "time",
  "sudo",
  "doas",
  "nice",
  "ionice",
  "timeout",
  "env",
  "stdbuf",
  "xargs",
]);

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
  for (let k = 0; k < toks.length; k += 1) {
    const t = toks[k]!;
    if (t.op === ">" || t.op === ">>") {
      const target = toks[k + 1];
      if (target !== undefined && target.op === undefined) redirects.push(target);
      k += 1;
      continue;
    }
    if (t.op === "<<") continue; // the heredoc delimiter was consumed by the tokenizer
    if (t.op === "<" || t.op === "<<<") {
      k += 1;
      continue;
    }
    words.push(t);
  }
  let w = 0;
  while (w < words.length) {
    const v = words[w]!.v;
    const base = v.replace(/^.*\//, "");
    if (/^[A-Za-z_][A-Za-z0-9_]*=/.test(v)) {
      w += 1;
      continue;
    }
    if (WRAPPERS.has(base)) {
      w += 1;
      while (
        w < words.length &&
        (words[w]!.v.startsWith("-") ||
          /^\d+[smhd]?$/.test(words[w]!.v) ||
          /^[A-Za-z_][A-Za-z0-9_]*=/.test(words[w]!.v))
      ) {
        const flag = words[w]!.v;
        w += 1;
        if (
          /^-(n|c|s|k|o|e|i|u)$/.test(flag) &&
          w < words.length &&
          /^\S+$/.test(words[w]!.v) &&
          !/^[a-z]/.test(words[w]!.v)
        )
          w += 1;
      }
      continue;
    }
    break;
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
  const positional = (a: string[]) => a.filter((x) => !x.startsWith("-") || x === "-");
  switch (cmd) {
    case "tee":
      out.push(...positional(args));
      break;
    case "cp":
    case "install":
    case "rsync":
    case "ln": {
      const p = positional(args);
      const t = args.findIndex((a) => a === "-t" || a === "--target-directory");
      if (t >= 0 && args[t + 1]) out.push(args[t + 1]!);
      else if (p.length >= 2) out.push(p[p.length - 1]!);
      break;
    }
    case "mv": {
      const p = positional(args);
      out.push(...p); // a move deletes its sources and writes its target
      break;
    }
    case "rm":
    case "touch":
    case "mkdir":
    case "truncate":
    case "shred":
    case "unlink":
    case "rmdir":
    case "chmod":
    case "chown":
      out.push(
        ...positional(args).filter(
          (a, idx) => !((cmd === "chmod" || cmd === "chown") && idx === 0),
        ),
      );
      break;
    case "dd":
      for (const a of args) if (a.startsWith("of=")) out.push(a.slice(3));
      break;
    case "curl":
    case "wget": {
      for (let i = 0; i < args.length; i += 1) {
        const a = args[i]!;
        if (a === "-o" || a === "--output" || a === "-O" || a === "--output-document")
          out.push(args[i + 1] ?? ".");
        if (a.startsWith("--output=") || a.startsWith("--output-document="))
          out.push(a.split("=")[1]!);
      }
      if (cmd === "wget" && !args.some((a) => a === "-O" || a.startsWith("--output")))
        out.push(".");
      break;
    }
    case "tar":
      if (args.some((a) => /^-?[a-zA-Z]*x/.test(a) || a === "--extract")) {
        const c = args.findIndex((a) => a === "-C" || a === "--directory");
        out.push(c >= 0 && args[c + 1] ? args[c + 1]! : ".");
      }
      break;
    case "unzip": {
      const d = args.indexOf("-d");
      out.push(d >= 0 && args[d + 1] ? args[d + 1]! : ".");
      break;
    }
    case "sed":
    case "perl": {
      if (!args.some((a) => /^-[a-zA-Z]*i/.test(a) || a.startsWith("--in-place"))) break;
      const files: string[] = [];
      let scriptSeen = false;
      for (let i = 0; i < args.length; i += 1) {
        const a = args[i]!;
        if (a === "-e" || a === "-f" || a === "--expression" || a === "--file") {
          i += 1;
          scriptSeen = true;
          continue;
        }
        if (/^-[a-zA-Z]*[ef]$/.test(a) && !/^-[a-zA-Z]*i/.test(a)) {
          i += 1;
          scriptSeen = true;
          continue;
        }
        if (a.startsWith("--expression=") || a.startsWith("--file=")) {
          scriptSeen = true;
          continue;
        }
        if (a.startsWith("-")) continue;
        if (!scriptSeen) {
          scriptSeen = true; // the first positional is the script
          continue;
        }
        files.push(a);
      }
      out.push(...files);
      break;
    }
    case "git": {
      const sub = args[0] ?? "";
      const rest = args.slice(1);
      if (sub === "rm" || sub === "mv") out.push(...positional(rest));
      if (sub === "checkout" || sub === "restore") {
        const dd = rest.indexOf("--");
        if (dd >= 0) out.push(...rest.slice(dd + 1));
        else if (sub === "restore")
          out.push(...positional(rest.filter((a) => !a.startsWith("--source"))));
      }
      break;
    }
    default:
      break;
  }
  return out.filter((t) => t !== "");
}

export type Verdict = { ok: true; by: string } | { ok: false; reason: string };

/** The one scope decision every write-shaped action goes through. */
export function scopeVerdict(rawPath: string): Verdict {
  // The output devices are not files: `2>/dev/null`, `> /dev/stderr` write nothing anywhere.
  if (/^\/dev\/(null|stdout|stderr|tty)$/.test(rawPath)) return { ok: true, by: "output device" };
  const rel = repoPath(rawPath);
  if (!inRepo(rel)) {
    // Outside the repository: scratch files under /tmp are fine; nothing else is.
    const abs = resolve(PROJECT_DIR, rawPath);
    if (abs.startsWith("/tmp/")) return { ok: true, by: "scratch (/tmp)" };
    return { ok: false, reason: `path ${abs} is outside the repository and not under /tmp` };
  }
  const never = matchesAny(rel, NEVER_EDIT);
  if (never !== null) {
    return {
      ok: false,
      reason: `${rel} is never edited by hand (matches ${never}): it is regenerated by a script, owned by the platform, or part of the executor's own guard rails. If the brief needs it changed, STOP and ask for a ruling.`,
    };
  }
  const standing = matchesAny(rel, STANDING_ALLOWANCE);
  if (standing !== null) return { ok: true, by: `standing allowance ${standing}` };
  const build = matchesAny(rel, BUILD_OUTPUT);
  if (build !== null) return { ok: true, by: `build output ${build}` };
  const scope = readScope();
  if (scope.brief === null) {
    return {
      ok: false,
      reason: `${rel}: no brief in force yet (roadmap.md line 3 names none). Until STEP 0 has saved the brief and named it in roadmap.md, only the standing allowance may change. If you are at STEP 0, save the brief and update roadmap.md first.`,
    };
  }
  if (scope.globs.length === 0) {
    return {
      ok: false,
      reason: `${rel}: the brief in force (${scope.brief}) has no SCOPE-BEGIN/SCOPE-END block, so it names no files you may change. STOP and ask the supervisor for a brief with a SCOPE block.`,
    };
  }
  const hit = matchesAny(rel, scope.globs);
  if (hit !== null) return { ok: true, by: `SCOPE ${hit}` };
  return {
    ok: false,
    reason: `${rel} is outside the brief's SCOPE (${scope.brief}). Law A1: a file the task needs but did not name is a STOP — report the file and why it is needed, and wait for a ruling. A sibling with the same concern is reported in K2, never touched.`,
  };
}

/** Run a command with a deadline; returns exit code and the combined tail. */
export async function run(
  cmd: string[],
  opts: { timeoutMs: number; cwd?: string; env?: Record<string, string> },
): Promise<{ code: number; tail: string; out: string; timedOut: boolean }> {
  const proc = Bun.spawn(cmd, {
    cwd: opts.cwd ?? PROJECT_DIR,
    stdout: "pipe",
    stderr: "pipe",
    env: { ...process.env, ...(opts.env ?? {}) },
  });
  let timedOut = false;
  const timer = setTimeout(() => {
    timedOut = true;
    proc.kill();
  }, opts.timeoutMs);
  const [out, err] = await Promise.all([
    new Response(proc.stdout).text(),
    new Response(proc.stderr).text(),
  ]);
  const code = await proc.exited;
  clearTimeout(timer);
  const all = `${out}\n${err}`.split("\n").filter((l) => l.trim() !== "");
  return {
    code: timedOut ? 124 : code,
    tail: all.slice(-40).join("\n"),
    out: `${out}${err}`,
    timedOut,
  };
}

export function git(args: string[]): string {
  const r = Bun.spawnSync(["git", ...args], { cwd: PROJECT_DIR, stdout: "pipe", stderr: "pipe" });
  return new TextDecoder().decode(r.stdout).trim();
}

export function currentBranch(): string {
  return git(["rev-parse", "--abbrev-ref", "HEAD"]);
}
