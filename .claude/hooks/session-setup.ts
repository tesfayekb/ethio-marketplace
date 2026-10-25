/**
 * SessionStart (startup) — make a fresh cloud session able to work before the executor's first step.
 *
 * Claude Code on the web starts a session from a clone that can be a snapshot of an earlier one:
 * stale remote refs, a stale local dev, perhaps no node_modules or Playwright browser. In order:
 *   0. the branch the session started on (claude/…), recorded in .claude/turn/session-branch for
 *      land.ts's last-resort parking;
 *   1. `git fetch origin dev` (then main and ci-evidence, best effort) and — when the session is not
 *      on dev — `git fetch origin dev:dev`: local dev brought up to origin/dev as a fast-forward,
 *      never forced; a local dev with commits origin/dev lacks is left as it is and named (INC-883:
 *      checking out a stale dev puts old rules on disk, and the session obeys the files on disk);
 *   2. the SESSION and CI lines, computed after the fetch (the standing header leaves them to this hook
 *      at startup, because hooks of one event run in parallel);
 *   3. `bun install --frozen-lockfile` unless node_modules is current (the lockfile is never changed
 *      here — a package change is its own turn, DEC-118 / G42);
 *   4. the browser the harness's guard resolves (scripts/e2e-browser-guard.ts: E2E_CHROMIUM_PATH, else
 *      chromium.executablePath()) — when it is missing, `bunx playwright install chromium` as CI does,
 *      then the same probe again; the note reports what the probe found, never the installer's exit
 *      code (INC-884).
 * It does nothing outside a cloud session (CLAUDE_CODE_REMOTE !== "true") and never blocks: a failure
 * is reported, the session continues.
 */
import { existsSync, mkdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { PROJECT_DIR, WORK_BRANCH, git, readEvent, run } from "./lib";

const event = await readEvent();
if (process.env["CLAUDE_CODE_REMOTE"] !== "true") process.exit(0);
if (event.source !== undefined && event.source !== "startup") process.exit(0);

const notes: string[] = [];

// 0. The branch the session was started on: land.ts parks a held turn there when the session's git
//    refuses both dev and hold/<brief>, so no work is stranded.
const startBranch = git(["branch", "--show-current"]);
if (/^claude\/[\w./-]+$/.test(startBranch)) {
  mkdirSync(join(PROJECT_DIR, ".claude", "turn"), { recursive: true });
  writeFileSync(join(PROJECT_DIR, ".claude", "turn", "session-branch"), `${startBranch}\n`);
}

// 1. Fresh refs, and local dev level with origin/dev before the executor can check it out.
const fetchDev = await run(["git", "fetch", "-q", "origin", WORK_BRANCH], { timeoutMs: 120_000 });
for (const ref of ["main", "ci-evidence"])
  await run(["git", "fetch", "-q", "origin", ref], { timeoutMs: 120_000 });
if (fetchDev.code !== 0) {
  notes.push(
    `SETUP: git fetch origin ${WORK_BRANCH} FAILED (${fetchDev.timedOut ? "timed out" : `exit ${fetchDev.code}`}); Part A fetches again — if it fails there too, STOP and report it:\n${fetchDev.tail}`,
  );
} else if (startBranch !== WORK_BRANCH) {
  const ff = await run(["git", "fetch", "-q", "origin", `${WORK_BRANCH}:${WORK_BRANCH}`], {
    timeoutMs: 120_000,
  });
  notes.push(
    ff.code === 0
      ? `SETUP: local ${WORK_BRANCH} = origin/${WORK_BRANCH} (brought up as a fast-forward when it was behind). This session started on ${startBranch || "a detached HEAD"}; you work on ${WORK_BRANCH} — \`git switch ${WORK_BRANCH}\` is your first git step (00-executor-protocol.md Part A).`
      : `SETUP: local ${WORK_BRANCH} could NOT be brought to origin/${WORK_BRANCH} as a fast-forward (it has commits origin/${WORK_BRANCH} lacks, or git refused). Do not switch to it, force it or merge it: STOP at Part A and report this line:\n${ff.tail}`,
  );
}

// 2. The session's state, read after the fetch.
const head = git(["rev-parse", "--short", "HEAD"]);
const devHead = git(["rev-parse", "--short", `origin/${WORK_BRANCH}`]);
const localDev = git(["rev-parse", "--short", `refs/heads/${WORK_BRANCH}`]);
const ahead = localDev
  ? git(["rev-list", "--count", `origin/${WORK_BRANCH}..refs/heads/${WORK_BRANCH}`])
  : "0";
notes.push(
  `SESSION (startup, after fetch): branch ${startBranch || "(detached)"} at ${head}; origin/${WORK_BRANCH} ${devHead || "(not fetched)"}; local ${WORK_BRANCH} ${localDev || "(none)"}; local ${WORK_BRANCH} commits not on origin/${WORK_BRANCH}: ${ahead || "unknown"}.`,
);
const ci = git(["show", "origin/ci-evidence:docs/tracking/ci-status.md"]);
if (ci !== "" && !/^fatal/.test(ci))
  notes.push(
    `CI (ci-evidence, newest completed run of ANY branch — check its SHA): ${ci.split("\n").slice(0, 3).join(" · ")}`,
  );

// 3. Dependencies, exactly as the lockfile says.
const stamp = join(PROJECT_DIR, "node_modules", ".executor-install-stamp");
const lock = join(PROJECT_DIR, "bun.lock");
const fresh =
  existsSync(stamp) && existsSync(lock) && statSync(stamp).mtimeMs >= statSync(lock).mtimeMs;
if (!fresh) {
  const r = await run(["bun", "install", "--frozen-lockfile"], { timeoutMs: 600_000 });
  if (r.code === 0) {
    writeFileSync(stamp, new Date().toISOString());
    notes.push("SETUP: bun install --frozen-lockfile — done.");
  } else {
    notes.push(
      `SETUP: bun install --frozen-lockfile FAILED (${r.timedOut ? "timed out" : `exit ${r.code}`}). Do not change the lockfile or install by another route; STOP and report it under Limits:\n${r.tail}`,
    );
  }
}

// 4. The browser, resolved exactly as scripts/e2e-browser-guard.ts resolves it.
async function guardPath(): Promise<string> {
  const override = process.env["E2E_CHROMIUM_PATH"];
  if (override !== undefined) return override;
  const probe = await run(
    ["bun", "-e", "import { chromium } from 'playwright'; console.log(chromium.executablePath())"],
    { timeoutMs: 60_000 },
  );
  return probe.code === 0 ? (probe.out.trim().split("\n").pop() ?? "") : "";
}
if (existsSync(join(PROJECT_DIR, "node_modules", "playwright"))) {
  const before = await guardPath();
  if (before !== "" && existsSync(before)) {
    notes.push(`SETUP: the harness's browser guard resolves ${before} — present.`);
  } else if (process.env["E2E_CHROMIUM_PATH"] !== undefined) {
    notes.push(
      `SETUP: E2E_CHROMIUM_PATH points at ${before}, which does not exist; browser tests cannot run here — say so under Limits (CI runs every test on the landing).`,
    );
  } else {
    const r = await run(["bunx", "playwright", "install", "chromium"], { timeoutMs: 600_000 });
    const after = await guardPath();
    notes.push(
      after !== "" && existsSync(after)
        ? `SETUP: Playwright Chromium installed; the harness's browser guard resolves ${after} — present.`
        : `SETUP: the browser the harness's guard needs is still missing (${after || "unresolved"}; installer ${r.timedOut ? "timed out" : `exit ${r.code}`}); browser tests cannot run here — say so under Limits (CI runs every test on the landing):\n${r.tail}`,
    );
  }
}

process.stdout.write(`${notes.join("\n")}\n`);
process.exit(0);
