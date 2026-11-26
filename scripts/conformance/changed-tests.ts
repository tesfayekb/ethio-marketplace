import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";

/**
 * INC-1306 (cursor bundle 8a, fix 3b) — A TEST THAT PASSES WARM AND FAILS ALONE DOES NOT REACH
 * DEV. The component job runs the whole suite once, warm: a test file that leans on a module
 * another file loaded first passes there and fails alone. So the job's step "Changed test files,
 * each alone" runs every test file the push changes in its own process:
 *   `bun scripts/conformance/changed-tests.ts base` — prints the base it compares with (the pull
 *     request's base, or dev's previous head on a push, as `CHANGED_BASE`), or fails loudly when
 *     there is none to read (a new branch's zeros), never skips;
 *   `bun scripts/conformance/changed-tests.ts run` — the test files changed against that base
 *     (the step fetched it), each by `vitest run <file>`; a file that fails alone fails the job,
 *     and the step's time is printed.
 * Read by CF-ALONE-1…3 (changed-tests.test.ts) and the component job of .github/workflows/ci.yml.
 */

/** The test files vitest runs (vitest.config.ts `include`). */
const TEST_FILE = /^(?:src\/.+\.test\.tsx?|scripts\/.+\.test\.ts)$/;

/** The base a push compares with, or the loud reason there is none. */
export function baseOf(value: string | undefined): { base: string } | { problem: string } {
  const base = (value ?? "").trim();
  if (!/^[0-9a-f]{40}$/.test(base))
    return {
      problem: `CHANGED_BASE is not a commit (“${base}”): the changed files cannot be read`,
    };
  if (/^0+$/.test(base))
    return { problem: "CHANGED_BASE is the zero commit (a new branch): no previous head to read" };
  return { base };
}

/** The changed paths that are test files vitest runs and still exist, in a stable order. */
export function changedTestFiles(paths: readonly string[], exists: (path: string) => boolean) {
  return [...new Set(paths.map((path) => path.trim()))]
    .filter((path) => TEST_FILE.test(path) && exists(path))
    .sort();
}

function fail(message: string): never {
  console.error(`::error::changed tests alone (INC-1306): ${message}`);
  process.exit(1);
}

function main(mode: string | undefined): void {
  const read = baseOf(process.env.CHANGED_BASE);
  if ("problem" in read) fail(read.problem);
  if (mode === "base") {
    console.log(read.base);
    return;
  }
  if (mode !== "run") fail(`unknown mode “${mode ?? ""}”: base or run`);
  const diff = spawnSync("git", ["diff", "--name-only", "--diff-filter=d", read.base, "HEAD"], {
    encoding: "utf8",
  });
  if (diff.status !== 0) fail(`git diff against ${read.base} failed: ${diff.stderr.trim()}`);
  const files = changedTestFiles(diff.stdout.split("\n").filter(Boolean), existsSync);
  console.log(`changed tests alone: ${files.length} test file(s) changed against ${read.base}`);
  const began = Date.now();
  const failed: string[] = [];
  for (const file of files) {
    const started = Date.now();
    const run = spawnSync("bunx", ["vitest", "run", file], { stdio: "inherit" });
    const seconds = ((Date.now() - started) / 1000).toFixed(1);
    console.log(
      `changed tests alone: ${file} ${run.status === 0 ? "passed" : "FAILED"} (${seconds} s)`,
    );
    if (run.status !== 0) failed.push(file);
  }
  console.log(
    `changed tests alone: ${files.length} file(s) in ${((Date.now() - began) / 1000).toFixed(1)} s`,
  );
  if (failed.length > 0) fail(`failed alone: ${failed.join(", ")}`);
}

if (import.meta.main) main(process.argv[2]);
