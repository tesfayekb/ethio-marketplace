/**
 * SessionStart (startup) — make a fresh cloud session able to work before the executor's first step.
 *
 * Claude Code on the web starts every session in a new VM with a fresh clone: no node_modules and
 * no Playwright browser. This hook installs both, exactly as CI does, and reports what it could not
 * do as context, so the executor names it under Limits instead of improvising:
 *   1. `bun install --frozen-lockfile` (the lockfile is never changed here — a package change is its
 *      own turn, DEC-118 / G42);
 *   2. the Chromium headless shell for the repository's pinned Playwright, unless E2E_CHROMIUM_PATH
 *      points at a browser already.
 *   0. the branch the session started on (claude/…), recorded in .claude/turn/session-branch for
 *      land.ts's last-resort parking, with a note that the executor works on dev;
 * It does nothing outside a cloud session (CLAUDE_CODE_REMOTE !== "true") and never blocks: a
 * failure is reported, the session continues.
 */
import { existsSync, mkdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { PROJECT_DIR, git, readEvent, run } from "./lib";

const event = await readEvent();
if (process.env["CLAUDE_CODE_REMOTE"] !== "true") process.exit(0);
if (event.source !== undefined && event.source !== "startup") process.exit(0);

const notes: string[] = [];

// The branch the session was started on (Claude Code on the web names one, claude/…): land.ts parks a
// held turn there when the session's git refuses both dev and hold/<brief>, so no work is stranded.
const startBranch = git(["branch", "--show-current"]);
if (/^claude\/[\w./-]+$/.test(startBranch)) {
  mkdirSync(join(PROJECT_DIR, ".claude", "turn"), { recursive: true });
  writeFileSync(join(PROJECT_DIR, ".claude", "turn", "session-branch"), `${startBranch}\n`);
  notes.push(
    `SETUP: this session started on ${startBranch}; you work on dev — \`git switch dev\` is your first git step (00-executor-protocol.md Part A).`,
  );
}

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

if (
  process.env["E2E_CHROMIUM_PATH"] === undefined &&
  existsSync(join(PROJECT_DIR, "node_modules", "playwright"))
) {
  const probe = await run(
    ["bun", "-e", "import { chromium } from 'playwright'; console.log(chromium.executablePath())"],
    {
      timeoutMs: 60_000,
    },
  );
  const path = probe.out.trim().split("\n").pop() ?? "";
  if (probe.code !== 0 || path === "" || !existsSync(path)) {
    const r = await run(["bunx", "playwright", "install", "chromium", "--only-shell"], {
      timeoutMs: 420_000,
    });
    notes.push(
      r.code === 0
        ? "SETUP: Playwright Chromium headless shell — installed."
        : `SETUP: Playwright Chromium could NOT be installed (${r.timedOut ? "timed out" : `exit ${r.code}`}); browser tests cannot run here — say so under Limits (CI runs every test on the landing):\n${r.tail}`,
    );
  }
}

if (notes.length > 0) process.stdout.write(`${notes.join("\n")}\n`);
process.exit(0);
