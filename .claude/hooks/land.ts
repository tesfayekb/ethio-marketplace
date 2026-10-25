/**
 * bun .claude/hooks/land.ts — the ONE way the executor's commits reach `dev`.
 *
 * Lovable lands each turn on dev and CI judges it there (DEC-020); this script does the same and
 * refuses to push anything CI would refuse for a reason the executor could have seen first:
 *
 *   1. on `dev`, tree clean (every change committed, nothing untracked)
 *   2. origin/dev fetched and an ancestor of HEAD (dev moved under the turn → STOP, never merge)
 *   3. every path in the landing (origin/dev..HEAD) inside the brief's SCOPE + standing allowance
 *   4. every deleted base file declared (commit marker or intentional-deletions.txt line)
 *   5. the brief's FLAGS respected
 *   6. the last commit carries the report: a stop report (STOP|QUESTION|MIGRATION + DONE + LEFT)
 *      or the final report (twelve sections, every landed path, the last code commit named)
 *   7. THE CHECKS green: lint → typecheck → test:unit → i18n:usage (maps unchanged) → build →
 *      check-migrations.sh (when migrations land) → format:check — each step's pass is cached per
 *      code tree, so a re-run after a fix repeats only what can have changed
 *   8. `git push origin dev` (fast-forward only: the ruleset refuses a force push) and the read-back
 *
 * The Bash guard refuses every other `git push`, and the Stop gate refuses to end a turn while
 * commits are unlanded. Run it with a long Bash timeout (it can take 15–25 minutes the first time).
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createHash } from "node:crypto";
import {
  PROJECT_DIR,
  WORK_BRANCH,
  git,
  currentBranch,
  run,
  readScope,
  scopeVerdict,
  reportPaths,
  lines,
  unlanded,
} from "./lib";

const turnDir = join(PROJECT_DIR, ".claude", "turn");
mkdirSync(turnDir, { recursive: true });

function fail(step: string, reason: string): never {
  process.stderr.write(
    `LAND REFUSED at ${step}:\n${reason}\n\nNothing was pushed. Fix it at the root (a new commit — never amend), then run bun .claude/hooks/land.ts again.\n`,
  );
  process.exit(1);
}
function say(text: string): void {
  process.stdout.write(`${text}\n`);
}

/**
 * When the turn cannot land (dev moved under it, or the push to dev was refused), its commits are
 * parked on hold/<brief stem> — a branch no workflow runs on — so the supervisor can read them, and
 * the Stop gate lets the turn end. When the session's git refuses that branch too (Claude Code on the
 * web may allow only the branch the session started on), they are parked on that branch, recorded
 * by session-setup.ts in .claude/turn/session-branch. Nothing is ever force-pushed.
 */
function park(ref: string): { ok: boolean; err: string } {
  const p = Bun.spawnSync(["git", "push", "origin", `HEAD:${ref}`], {
    cwd: PROJECT_DIR,
    stdout: "pipe",
    stderr: "pipe",
  });
  return { ok: p.exitCode === 0, err: new TextDecoder().decode(p.stderr).trim() };
}

function hold(step: string, reason: string): never {
  const stem = (readScope().brief ?? "no-brief").replace(/^.*\//, "").replace(/\.md$/, "");
  const head = git(["rev-parse", "HEAD"]);
  const marker = join(turnDir, `held-${head.slice(0, 12)}`);
  const tail =
    "Make sure the last commit carries a stop report that says why (STOP — <reason>), then end the turn; the supervisor rules.";
  const first = park(`refs/heads/hold/${stem}`);
  if (first.ok) {
    writeFileSync(marker, `hold/${stem}`);
    process.stderr.write(
      `LAND HELD at ${step}:\n${reason}\n\nYour commits are parked on hold/${stem} (${head.slice(0, 12)}); nothing reached dev. ${tail}\n`,
    );
    process.exit(3);
  }
  const sessionFile = join(turnDir, "session-branch");
  const session = existsSync(sessionFile) ? readFileSync(sessionFile, "utf8").trim() : "";
  if (/^claude\/[\w./-]+$/.test(session)) {
    const second = park(`refs/heads/${session}`);
    if (second.ok) {
      writeFileSync(marker, session);
      process.stderr.write(
        `LAND HELD at ${step}:\n${reason}\n\nParking on hold/${stem} was refused (${first.err.split("\n").pop()}); your commits are parked on this session's branch ${session} (${head.slice(0, 12)}). Nothing reached dev. ${tail}\n`,
      );
      process.exit(3);
    }
    process.stderr.write(
      `LAND HELD at ${step}:\n${reason}\n\nParking was refused on hold/${stem}:\n${first.err}\nand on ${session}:\n${second.err}\nSay these refusals in your last message and end the turn.\n`,
    );
  } else {
    process.stderr.write(
      `LAND HELD at ${step}:\n${reason}\n\nParking on hold/${stem} was refused too:\n${first.err}\nSay both refusals in your last message and end the turn.\n`,
    );
  }
  writeFileSync(marker, "push refused");
  process.exit(3);
}

// 1. Branch and tree.
const branch = currentBranch();
if (branch !== WORK_BRANCH)
  fail(
    "1 branch",
    `you are on "${branch}"; the executor works and lands on ${WORK_BRANCH} (git switch ${WORK_BRANCH}).`,
  );
const status = git(["status", "--porcelain"]);
if (status !== "")
  fail(
    "1 clean tree",
    `uncommitted or untracked files:\n${status}\nCommit them (git add + git commit with a title that claims only what happened) or remove them.`,
  );

// 2. dev has not moved under the turn.
const fetch = Bun.spawnSync(["git", "fetch", "origin", WORK_BRANCH], {
  cwd: PROJECT_DIR,
  stdout: "pipe",
  stderr: "pipe",
});
if (fetch.exitCode !== 0)
  fail(
    "2 fetch",
    `git fetch origin ${WORK_BRANCH} failed:\n${new TextDecoder().decode(fetch.stderr)}`,
  );
const ancestor =
  Bun.spawnSync(["git", "merge-base", "--is-ancestor", `origin/${WORK_BRANCH}`, "HEAD"], {
    cwd: PROJECT_DIR,
  }).exitCode === 0;
if (!ancestor) {
  const theirs = git(["log", "--oneline", `HEAD..origin/${WORK_BRANCH}`]);
  hold(
    "2 dev moved",
    `origin/${WORK_BRANCH} has commits this turn does not:\n${theirs}\nSTOP — never merge or rebase; the supervisor re-bases the brief.`,
  );
}
const commits = unlanded();
if (commits.length === 0) {
  say(
    `Nothing to land: HEAD ${git(["rev-parse", "--short", "HEAD"])} is already on origin/${WORK_BRANCH}.`,
  );
  process.exit(0);
}
const range = `origin/${WORK_BRANCH}..HEAD`;
const paths = lines(git(["diff", "--name-only", range]));

// 3. Scope of the whole landing (the diff is the authority, whatever tool wrote the files).
const scope = readScope();
const outside = paths.map((f) => ({ f, v: scopeVerdict(f) })).filter((x) => !x.v.ok);
if (outside.length > 0) {
  fail(
    "3 scope",
    `${outside.length} path(s) in this landing are outside the brief's SCOPE:\n${outside.map((x) => `  ${x.f} — ${x.v.ok ? "" : x.v.reason.split(". ")[0]}`).join("\n")}\nUndo each in a NEW commit: git restore --source=origin/${WORK_BRANCH} --staged --worktree -- <path> (git rm -- <path> for a file origin/${WORK_BRANCH} does not have), commit "turn NN: revert out-of-scope change to <path>". If the brief needs that file, STOP and ask for a ruling naming it.`,
  );
}

// 4. Deletions declared.
const deleted = lines(git(["diff", "--name-only", "--diff-filter=D", range]));
if (deleted.length > 0) {
  const manifestAdds = git(["diff", range, "--", "docs/tracking/intentional-deletions.txt"])
    .split("\n")
    .filter((l) => l.startsWith("+") && !l.startsWith("+++"))
    .map((l) => l.slice(1).trim());
  const markerFiles = new Set<string>();
  let marked = false;
  for (const l of git(["log", "--diff-filter=D", "--name-only", "--format=@@%s", range]).split(
    "\n",
  )) {
    if (l.startsWith("@@")) marked = /\[intentional-delete\]/.test(l);
    else if (l.trim() !== "" && marked) markerFiles.add(l.trim());
  }
  const undeclared = deleted.filter((f) => !manifestAdds.includes(f) && !markerFiles.has(f));
  if (undeclared.length > 0)
    fail(
      "4 deletions",
      `deleted without a declaration (scripts/check-deletions.sh will fail in CI):\n${undeclared.join("\n")}\nAdd each path to docs/tracking/intentional-deletions.txt in a new commit (and use the [intentional-delete] marker in the commit that deletes).`,
    );
}

// 5. FLAGS.
const flagHits: string[] = [];
if (scope.flags.includes("no-migration") && paths.some((f) => f.startsWith("supabase/migrations/")))
  flagHits.push("FLAGS says no-migration, but supabase/migrations/ changed");
if (scope.flags.includes("no-new-string") && paths.some((f) => f.startsWith("src/i18n/locales/")))
  flagHits.push("FLAGS says no-new-string, but src/i18n/locales/ changed");
if (
  scope.flags.includes("no-package-change") &&
  paths.some((f) => /^(package\.json|bun\.lock)$/.test(f))
)
  flagHits.push("FLAGS says no-package-change, but package.json or bun.lock changed");
if (scope.flags.includes("no-agents-change") && paths.includes("AGENTS.md"))
  flagHits.push("FLAGS says no-agents-change, but AGENTS.md changed");
if (flagHits.length > 0)
  fail(
    "5 flags",
    `${flagHits.join("\n")}\nA change the brief's FLAGS forbid is a STOP: revert it in a new commit, or STOP and ask for a ruling.`,
  );

// 6. The report rides the last commit.
const rp = reportPaths(scope.brief);
if (rp === null)
  fail(
    "6 report",
    "no brief in force (roadmap.md line 3) — STEP 0 saves the brief and names it before anything lands.",
  );
const lastCommitPaths = lines(git(["diff-tree", "--no-commit-id", "--name-only", "-r", "HEAD"]));
const stopReport = lastCommitPaths.find((f) => f.startsWith(rp.stopPrefix) && f.endsWith(".md"));
const finalReport = lastCommitPaths.includes(rp.final) ? rp.final : undefined;
if (stopReport === undefined && finalReport === undefined) {
  fail(
    "6 report",
    `the last commit carries no report. A landing ends with one:\n  a stop (STOP, QUESTION, MIGRATION): ${rp.stopPrefix}<n>.md — first line "STOP|QUESTION|MIGRATION — turn NN part X: <subject>", then DONE, LEFT, CI, FILES and the question or the apply line;\n  the end of the brief: ${rp.final} — the twelve sections of .claude/rules/60-report.md.\nWrite it after your last code commit, commit it on its own, then land.`,
  );
}
const reportFile = (finalReport ?? stopReport)!;
const reportText = readFileSync(join(PROJECT_DIR, reportFile), "utf8");
if (finalReport === undefined) {
  if (
    !/^(STOP|QUESTION|MIGRATION)\b/.test(reportText) ||
    !/^DONE\b/m.test(reportText) ||
    !/^LEFT\b/m.test(reportText)
  ) {
    fail(
      "6 stop report",
      `${reportFile} must begin with STOP, QUESTION or MIGRATION and carry a DONE line and a LEFT line (then CI, FILES and the question or the apply line).`,
    );
  }
  if (
    /^MIGRATION\b/.test(reportText) &&
    !/apply\s+\S+\s+→\s+expect mark\s+\d{14}/.test(reportText)
  ) {
    fail(
      "6 migration report",
      `${reportFile} is a MIGRATION stop but carries no pairing line "apply <uuid-fragment> → expect mark <14-digit mark>".`,
    );
  }
} else {
  const missing = Array.from({ length: 12 }, (_, i) => `## ${i + 1}.`).filter(
    (h) => !reportText.includes(h),
  );
  if (missing.length > 0)
    fail(
      "6 final report",
      `${reportFile} is missing sections ${missing.join(", ")} (.claude/rules/60-report.md).`,
    );
  // the last commit that changed anything but the reports — a report fixed in a later commit still names it
  const lastCode = git([
    "log",
    "-1",
    "--format=%h",
    "--abbrev=7",
    "HEAD",
    "--",
    ".",
    ":(exclude)docs/governance/reports",
  ]).slice(0, 7);
  if (lastCode === "" || !reportText.includes(lastCode))
    fail(
      "6 final report",
      `${reportFile} must name the last code commit (${lastCode || "none found"}) on its second line ("Final commit: <sha>").`,
    );
  const unlisted = paths.filter((f) => f !== reportFile && !reportText.includes(f));
  if (unlisted.length > 0)
    fail(
      "6 final report",
      `section 2 must list every path this turn changed; missing from ${reportFile}:\n${unlisted.join("\n")}`,
    );
}

// 7. THE CHECKS, cached per code tree (the reports folder is not code).
const treeKey = createHash("sha256")
  .update(
    git(["ls-tree", "-r", "HEAD"])
      .split("\n")
      .filter((l) => !l.includes("\tdocs/governance/reports/"))
      .join("\n"),
  )
  .digest("hex")
  .slice(0, 16);
const touched = (re: RegExp) => paths.some((f) => re.test(f));
type Step = { key: string; name: string; cmd: string[]; timeoutMs: number; when?: () => boolean };
const steps: Step[] = [
  { key: "lint", name: "bun run lint", cmd: ["bun", "run", "lint"], timeoutMs: 600_000 },
  {
    key: "typecheck",
    name: "bun run typecheck",
    cmd: ["bun", "run", "typecheck"],
    timeoutMs: 600_000,
  },
  {
    key: "unit",
    name: "bun run test:unit",
    cmd: ["bun", "run", "test:unit"],
    timeoutMs: 1_200_000,
  },
  {
    key: "i18n",
    name: "bun run i18n:usage",
    cmd: ["bun", "run", "i18n:usage"],
    timeoutMs: 180_000,
    when: () => touched(/^(src|e2e)\//),
  },
  {
    key: "i18n-maps",
    name: "i18n maps committed",
    cmd: [
      "git",
      "diff",
      "--exit-code",
      "--stat",
      "--",
      "docs/generated/i18n-usage.json",
      "public/i18n-usage.json",
    ],
    timeoutMs: 30_000,
    when: () => touched(/^(src|e2e)\//),
  },
  {
    key: "build",
    name: "bun run build",
    cmd: ["bun", "run", "build"],
    timeoutMs: 900_000,
    when: () => touched(/^(src|public|index\.html|vite\.config|package\.json|tsconfig)/),
  },
  {
    key: "migrations",
    name: "bash scripts/check-migrations.sh",
    cmd: ["bash", "scripts/check-migrations.sh"],
    timeoutMs: 180_000,
    when: () => touched(/^supabase\/migrations\//),
  },
  {
    key: "format",
    name: "bun run format:check",
    cmd: ["bun", "run", "format:check"],
    timeoutMs: 600_000,
  },
];
for (const step of steps) {
  if (step.when !== undefined && !step.when()) {
    say(`· ${step.name}: not needed for this landing`);
    continue;
  }
  const marker = join(turnDir, `pass-${step.key}-${treeKey}`);
  if (existsSync(marker)) {
    say(`✓ ${step.name} (already green for this code tree)`);
    continue;
  }
  const r = await run(step.cmd, { timeoutMs: step.timeoutMs });
  if (r.code !== 0)
    fail(
      `7 ${step.name}`,
      `${step.timedOut ? "timed out" : `exit ${r.code}`}:\n${r.tail}\nFix the cause (never weaken a check, never --no-verify), commit, land again.`,
    );
  if (git(["status", "--porcelain"]) !== "")
    fail(
      `7 ${step.name}`,
      `the step changed files in the tree:\n${git(["status", "--porcelain"])}\nCommit them (the i18n maps travel with the strings), then land again.`,
    );
  writeFileSync(marker, new Date().toISOString());
  say(`✓ ${step.name}`);
}

// 8. Push (fast-forward) and read back.
const head = git(["rev-parse", "HEAD"]);
const push = Bun.spawnSync(["git", "push", "origin", `HEAD:refs/heads/${WORK_BRANCH}`], {
  cwd: PROJECT_DIR,
  stdout: "pipe",
  stderr: "pipe",
});
const pushErr = new TextDecoder().decode(push.stderr);
if (push.exitCode !== 0)
  hold(
    "8 push",
    `git push origin ${WORK_BRANCH} was refused:\n${pushErr}\nDo not retry with another form of push.`,
  );
Bun.spawnSync(["git", "fetch", "origin", WORK_BRANCH], { cwd: PROJECT_DIR });
const remote = git(["rev-parse", `origin/${WORK_BRANCH}`]);
if (remote !== head)
  fail(
    "8 read-back",
    `pushed, but origin/${WORK_BRANCH} reads ${remote.slice(0, 12)}, not ${head.slice(0, 12)}.`,
  );
writeFileSync(join(turnDir, `landed-${head.slice(0, 12)}`), new Date().toISOString());
say(
  `LANDED ${head.slice(0, 12)} on ${WORK_BRANCH} (${commits.length} commit(s), ${paths.length} path(s), report ${reportFile}).`,
);
say(
  "CI runs now on dev; its verdict is written to branch ci-evidence when the run completes. End the turn — the supervisor reads it.",
);
process.exit(0);
