/**
 * PreToolUse — Bash.
 *
 * Three questions, in order, about every shell command the executor wants to run:
 *   1. is it a command no turn may run (50-security.md) — on the ORIGINAL text and on the
 *      normalised text, so `git -C . push origin main`, `git 'push'`, `/bin/rm -rf` and
 *      `bash -c '…'` are read as what they are (the Claude Code docs list these bypasses);
 *   2. does it write to a path the scope does not allow (redirections, tee, cp/mv/rm, sed -i,
 *      git rm/mv/restore …) — every target goes through the same scopeVerdict as the edit tools;
 *   3. (pushes are never made by hand: bun .claude/hooks/land.ts is the one door to dev.)
 * A refusal names the law so the executor STOPs instead of looking for another spelling. The
 * Stop gate's diff check is the authority behind this guard: whatever slips past here is found
 * there, and again in CI.
 */
import { readEvent, block, scopeVerdict, normaliseCommand, writeTargets, programsOf } from "./lib";

const event = await readEvent();
const input = event.tool_input ?? {};
const command = typeof input["command"] === "string" ? input["command"] : "";
if (command.trim() === "") process.exit(0);
const norm = normaliseCommand(command);

type Rule = { re: RegExp; why: string; on?: "original" };
const WRITERS = String.raw`(rm|sed|mv|cp|tee|touch|mkdir|truncate|git|chmod|chown|ln|install|dd|perl|python[23]?|node|bun|sh|bash|zsh)`;
const DENY: Rule[] = [
  // --- git: history, branches, pushes --------------------------------------------------------
  {
    re: /\bgit\s+push\b/,
    why: "the executor never pushes by hand: bun .claude/hooks/land.ts runs THE CHECKS, requires the report and lands the turn on dev (fast-forward only) — or parks it on hold/* when it cannot",
  },
  {
    re: /\bgit\s+(rebase|filter-branch|filter-repo|replace|update-ref|symbolic-ref|worktree|submodule|read-tree|write-tree)\b|\bgit\s+commit\b[^\n|;&]*--amend|\bgit\s+reset\s+(--hard|--merge|--keep)\b|\bgit\s+reflog\s+(expire|delete)\b/,
    why: "history rewriting is forbidden; published commits are never amended, rebased or reset (AGENTS.md)",
  },
  { re: /\bgit\s+commit\b[^\n|;&]*\s(--no-verify|-n)\b/, why: "commit hooks are not skipped" },
  {
    re: /\bgit\s+branch\s+(?!(-a|-r|--list|-l|-v|-vv|--show-current|--contains|--merged)\b)(?!\s*$)\S/,
    why: "branches are the operator's: you work on dev only (git branch is for listing)",
  },
  {
    // `git switch dev`, optionally followed by descriptor redirections (2>&1, 2>/dev/null), then the end
    re: /\bgit\s+switch\b(?!\s+dev(?:\s+\d?>(?:&\d|\s*\/dev\/null))*\s*(?:$|[;&|)]))/,
    why: "you work on dev only: git switch dev (other branches are read with git show / git diff)",
  },
  {
    re: /\bgit\s+checkout\b(?!\s+--\s)/,
    why: "git checkout <ref> is ambiguous (branch or file): git switch dev for the branch; git restore --source=<ref> -- <path> for files",
  },
  {
    re: /\bgit\s+merge(?![\w-])(?!\s+--ff-only\s+origin\/dev(?:\s+\d?>(?:&\d|\s*\/dev\/null))*\s*(?:$|[;&|)]))|\bgit\s+(pull|cherry-pick|am)(?![\w-])|\bgit\s+revert\b[^\n|;&]*\s(-n|--no-commit)\b/,
    why: "the only merge is catching up a clean dev with git merge --ff-only origin/dev at Part A; if dev moved during the turn, STOP (the supervisor re-bases the brief) — never merge",
  },
  {
    // INC-883: `git fetch origin dev:dev` brings local dev up as a fast-forward; a forced refspec or
    // --force rewrites local branches and can drop unlanded commits.
    re: /\bgit\s+fetch\b[^\n|;&]*(\s\+[\w./:*-]|\s(-f|--force|--update-head-ok)(\s|$))/,
    why: "a forced fetch rewrites local branches and can drop your unlanded commits: git fetch origin dev:dev updates local dev only as a fast-forward",
  },
  {
    re: /\bgit\s+remote\s+(add|set-url|remove|rm|rename|prune|set-head)\b/,
    why: "the remote is origin and stays as it is",
  },
  {
    re: /\bgit\s+config\b[^\n|;&]*(--global|--system|--worktree|alias\.|core\.hooksPath|remote\.|url\.|push\.|credential\.|include\.|safe\.)/,
    why: "no alias, remote, hook-path, push or credential configuration",
  },
  { re: /\bgit\s+tag\b(?!\s+(-l|--list)\b)(?!\s*$)/, why: "tags are the operator's" },
  { re: /\bgit\s+stash\s+(drop|clear)\b/, why: "no destructive stash operations" },
  {
    re: /\bgit\s+clean\b[^\n|;&]*\s-[a-zA-Z]*[xX]/,
    why: "git clean -x would delete ignored files such as .claude/turn/",
  },
  {
    re: /\bgit\s+(-C|--git-dir|--work-tree|-c|--config-env|--exec-path)\b/,
    on: "original",
    why: "git is run plainly from the repository root (no -C, -c, --git-dir, --work-tree)",
  },
  {
    re: /\bgit\s+apply\b|\bpatch\s+-p\d|\bgit\s+am(?![\w-])/,
    why: "apply changes with the editing tools so the scope guard sees every path",
  },
  // --- databases, browsers, packages -----------------------------------------------------------
  {
    re: /\bsupabase\s+(db|link|unlink|login|migration|migrations|projects|functions|secrets|branches|orgs|inspect)\b/,
    why: "no Supabase CLI: a migration is applied only through the supabase-prod migration tool, on the supervisor's `apply <fragment> on ethio-prod` (30-migrations.md)",
  },
  {
    re: /\b(psql|pg_dump|pg_restore|pg_dumpall|pgcli|pgbench)\b|postgres(ql)?:\/\//,
    why: "no direct database access or URL from the executor",
  },
  {
    re: /\b(npx|bunx|pnpm\s+exec|yarn|pnpm\s+dlx)\s+playwright\s+(test|codegen)\b|\bplaywright\s+(test|codegen)\b|\bbun\s+run\s+test:e2e\b/,
    why: "browser tests start only with bun run e2e:local -- <specs> or bun run e2e:changed (the committed .env points at production)",
  },
  {
    re: /--repeat-each\b/,
    why: "no local repeat runs: flake proofs are the operator-dispatched Flake check workflow (DEC-184)",
  },
  {
    re: /\b(bun\s+(add|remove|rm|update|upgrade|link|pm\s+(trust|untrusted))|bun\s+install\s+(?!--frozen-lockfile\s*$)\S|npm\s+(i|install|add|update|uninstall|ci|link|audit\s+fix)\b|pnpm\s+(add|install|update|remove)\b|yarn\s+(add|upgrade|install|remove)\b)/,
    why: "no dependency change unless the brief names it, pinned; a package change is its own turn (DEC-118, G42); bun install --frozen-lockfile is the only install",
  },
  // --- destruction, downloads, secrets ---------------------------------------------------------
  {
    re: /\brm\s+(-[a-zA-Z]*r[a-zA-Z]*f|-[a-zA-Z]*f[a-zA-Z]*r|-r\b|-R\b|--recursive)\b(?![^\n|;&]*(\b(node_modules|dist|\.output|\.vinxi|\.vite|test-results|e2e-results|playwright-report|coverage)\b|\/tmp\/))/,
    why: "rm -r only on build output (node_modules, dist, .output, .vinxi, test-results, coverage) or under /tmp",
  },
  {
    re: /\b(curl|wget|fetch)\b[^\n]*\|\s*(ba|z|da|k)?sh\b/,
    why: "never pipe a download into a shell",
  },
  {
    re: /(^|\s)(\S*\/)?\.env(\.[A-Za-z0-9_-]+)?(\s|$)/,
    why: "never read, copy or name .env files; the committed .env holds publishable values and your secrets come from the environment",
  },
  {
    re: /(^|[\s;&|(`])(printenv|env|export\s+-p|declare\s+-p|declare\s*$|set)(\s*$|\s*[|;&>])/,
    why: "never dump the environment",
  },
  { re: /\/proc\/(self|\d+)\/environ/, why: "never read the environment through /proc" },
  {
    re: /SUPABASE_PROD_MIGRATE_TOKEN|SUPABASE_ACCESS_TOKEN|\b(mcp|api)\.supabase\.(com|io)\b/,
    why: "the production migration token and Supabase's management hosts are used only by the supabase-prod migration tool",
  },
  {
    re: /\b(echo|printf|print)\b[^\n|;&]*\$\{?[A-Za-z0-9_]*(KEY|TOKEN|SECRET|PASSWORD|PASSWD|SERVICE_ROLE|CREDENTIAL)[A-Za-z0-9_]*\b/i,
    why: "never print a secret's value",
  },
  {
    re: /(^|[\s;&|(`])[A-Za-z0-9_]*(KEY|TOKEN|SECRET|PASSWORD|PASSWD|SERVICE_ROLE|CREDENTIAL)[A-Za-z0-9_]*=(?!\s|$|"?\$|'\$)["']?[A-Za-z0-9_./+=-]{8,}/i,
    on: "original",
    why: "never place a secret value in a command; a test sets what it needs with vi.stubEnv and a fake value (INC-880)",
  },
  {
    re: /\bgit\s+switch\s+-(\s|$)/,
    why: "git switch - goes wherever you were last: git switch dev",
  },
  // --- indirection that hides a command from this guard ---------------------------------------
  { re: /(^|[\s;&|(`])eval\b/, why: "eval hides the command from the guard" },
  {
    re: /(^|[\s;&|(`])(ba|z|da|k|fi)?sh\s+(-[a-zA-Z]*c\b|--command\b|<\()/,
    why: "no inline shell strings (bash -c, sh -c): run the command itself",
  },
  {
    re: /(^|[\s;&|(`])(python[23]?|node|bun|deno|perl|ruby|php|tsx|ts-node|osascript)\s+(-[a-zA-Z]*[ce]\b|--eval\b|-e\b|eval\b|-\s*$|-\s*<)/,
    why: "no inline interpreter code (python -c, node -e, bun -e, stdin programs): a program that changes files is a committed script named by the brief",
  },
  {
    re: new RegExp(String.raw`\bxargs\b[^\n|;&]*\b${WRITERS}\b`),
    why: "xargs with a writing command hides its targets from the guard",
  },
  {
    re: new RegExp(
      String.raw`\bfind\b[^\n|;&]*\s(-delete\b|-exec(dir)?\s+${WRITERS}\b|-ok(dir)?\s+${WRITERS}\b)`,
    ),
    why: "find -delete / -exec with a writing command hides its targets from the guard",
  },
  { re: /(^|[\s;&|(`])(source|\.)\s+<\(/, why: "no process-substitution execution" },
  {
    re: /(^|[\s;&|(`])claude(\s|$)/,
    why: "the executor does not start or reconfigure Claude sessions; the supervisor drives, and the kit changes only through an install brief",
  },
  // --- GitHub: the executor reads, never writes (its only write is the landing push) -----------
  {
    re: /\bgh\s+(?!(run\s+(list|view)|api)\b)\S/,
    why: "gh is for reading CI only (gh run list / gh run view / gh api GET); merging, reviews, re-runs, dispatches, secrets and settings are the operator's",
  },
  {
    re: /\bgh\s+api\b[^\n|;&]*(?:-X\s*|--method[=\s]+)(?!GET\b)[A-Z]+|\bgh\s+api\b[^\n|;&]*\s(-f|-F|--field|--raw-field|--input)\s|\bgh\s+api\s+graphql\b/,
    why: "gh api is read-only for the executor (GET, no fields, no graphql)",
  },
];

for (const rule of DENY) {
  const hit =
    rule.on === "original" ? rule.re.test(command) : rule.re.test(command) || rule.re.test(norm);
  if (hit)
    block(
      `BASH GUARD (.claude/hooks/bash-guard.ts): refused — ${rule.why}.\nCommand: ${command.split("\n")[0]}\nA refusal is final: do not look for another spelling of the same action; STOP and report if the brief needs it.`,
    );
}

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
const targets: string[] = writeTargets(norm);
const literal = targets.filter(
  (t) =>
    !(
      t === "/dev/null" ||
      t.startsWith("/dev/std") ||
      t.startsWith("&") ||
      t.startsWith("/tmp/") ||
      t === "/tmp"
    ),
);
if (literal.length > 0 && /(^|[\s;&|(`])(cd|pushd)\s/.test(norm)) {
  block(
    `BASH GUARD: a shell write together with cd/pushd — run writes from the repository root so the guard sees the real path.\nCommand: ${command.split("\n")[0]}`,
  );
}
for (const raw of literal) {
  if (/[$~*?[\]{}]/.test(raw) && !/^[A-Za-z0-9_./-]+\/\*$/.test(raw)) {
    block(
      `BASH GUARD: the write target "${raw}" is not a literal path (variables, ~ and globs are not resolved) — write to a literal, in-scope path, or use the editing tools.`,
    );
  }
  // A directory target stands for its contents: probe a child so `src/server/ai/` and `src/server/ai` both read as the tree.
  const bare = raw.replace(/\/\*$/, "").replace(/\/+$/, "");
  const v = scopeVerdict(bare);
  const asTree = v.ok ? v : scopeVerdict(`${bare}/_`);
  if (!v.ok && !asTree.ok)
    block(
      `BASH GUARD: a shell write to ${raw} — ${v.reason}\nUse the editing tools for in-scope files; shell writes outside the scope are refused.`,
    );
}

process.exit(0);
