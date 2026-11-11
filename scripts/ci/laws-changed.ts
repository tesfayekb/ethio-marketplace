/**
 * INC-1030 widened (turn F4a-2) — the laws step's two changed-file parts, run before any slow
 * step so their failures show in the fast line:
 *  - `units`: the unit tests in the same folders as the files the turn changed;
 *  - `semgrep`: Semgrep at ERROR on the changed files, with CI's pinned version and rules
 *    (read from .github/workflows/ci.yml, never restated here).
 * The turn's base is TURN_BASE when set, else the `Base: dev <sha>` of the brief roadmap line 3
 * names (F4b, TC-E5); with neither the step fails and says so. The diff includes the working tree.
 * A pinned fetch that failed — the rules' archive or `pip install semgrep==<v>` — exits NOT_RUN_EXIT
 * with one `[laws] NOT RUN — <reason>` line, which turn-checks prints as NOT RUN (R3, housekeeping
 * turn 3): never a FAIL, never a PASS.
 */
import { execFileSync, spawnSync } from "node:child_process";
import { existsSync, readFileSync, rmSync } from "node:fs";
import { basename, dirname, join } from "node:path";

import { walkFiles } from "../conformance/kit";
import { CHECKS_CACHE } from "./checks-cache";

const UNIT = /\.test\.tsx?$/;

/** The folders whose unit tests the laws step runs, for these changed files. */
export function changedTestFolders(files: string[], testsIn: (dir: string) => string[]): string[] {
  const dirs = new Set<string>();
  for (const file of files) {
    // scripts/ is the laws step's first part already; src/ folders are judged here.
    if (!file.startsWith("src/")) continue;
    const dir = dirname(file);
    if (testsIn(dir).some((name) => UNIT.test(name))) dirs.add(dir);
  }
  return [...dirs].sort();
}

/** The Semgrep pins CI uses, read from its workflow. */
export function semgrepPins(ciYaml: string): { version: string; rules: string } {
  const version = /SEMGREP_VERSION:\s*"?([\d.]+)"?/.exec(ciYaml)?.[1];
  const rules = /SEMGREP_RULES_SHA:\s*([0-9a-f]{40})/.exec(ciYaml)?.[1];
  if (version === undefined || rules === undefined)
    throw new Error("ci.yml: Semgrep pins not found");
  return { version, rules };
}

/** The changed files Semgrep judges (CI's scanned languages; its own fixtures excluded). */
export function semgrepTargets(files: string[]): string[] {
  return files.filter(
    (f) => /\.(?:[cm]?[jt]sx?)$/.test(f) && !f.startsWith("scripts/fixtures/semgrep"),
  );
}

/** CI's pinned rules are whole only when both scanned folders hold rule files: a swept cache
 *  keeps its folders and loses its files (INC-1098). */
export function semgrepRulesWhole(dir: string): boolean {
  return ["javascript", "typescript"].every((lang) => {
    const folder = join(dir, lang);
    return existsSync(folder) && walkFiles([folder], { ext: ["yaml"] }).length > 0;
  });
}

/** The brief in force: the first brief roadmap line 3 names; null when it names none. The one
 *  reader of line 3 for scripts/ (turnBase here, turn-checks.ts, conformance/briefs.test.ts). */
export function briefInForce(roadmap: string): string | null {
  const line = roadmap.split("\n")[2] ?? "";
  return /docs\/governance\/briefs\/[\w.-]+\.md/.exec(line)?.[0] ?? null;
}

/** The turn's base: TURN_BASE, else the brief's `Base: dev <sha>` (roadmap line 3's first
 *  brief); null when neither names one — the caller fails loudly, never the last commit alone. */
export function turnBase(
  env: string | undefined,
  roadmap: string,
  readBrief: (path: string) => string | null,
): string | null {
  if (env !== undefined && env.trim() !== "") return env.trim();
  const brief = briefInForce(roadmap);
  if (brief === null) return null;
  const text = readBrief(brief);
  return text === null ? null : (/Base: dev ([0-9a-f]{7,40})\b/.exec(text)?.[1] ?? null);
}

function changedFiles(): string[] {
  const base = turnBase(process.env["TURN_BASE"], readFileSync("roadmap.md", "utf8"), (p) =>
    existsSync(p) ? readFileSync(p, "utf8") : null,
  );
  if (base === null)
    throw new Error(
      "[laws] no turn base: set TURN_BASE or name a brief with `Base: dev <sha>` on roadmap line 3",
    );
  const out = execFileSync("git", ["diff", "--name-only", base], { encoding: "utf8" });
  const untracked = execFileSync("git", ["ls-files", "--others", "--exclude-standard"], {
    encoding: "utf8",
  });
  return [...new Set([...out.split("\n"), ...untracked.split("\n")])]
    .map((f) => f.trim())
    .filter((f) => f !== "" && existsSync(f));
}

function run(cmd: string, args: string[]): number {
  return spawnSync(cmd, args, { stdio: "inherit" }).status ?? 1;
}

/** The exit code and line prefix of a pinned fetch that failed (R3); turn-checks reads both. */
export const NOT_RUN_EXIT = 3;
export const NOT_RUN_LINE = "[laws] NOT RUN — ";

export type Runner = (cmd: string, args: string[]) => number;
export type SemgrepReady = { bin: string; rules: string } | { notRun: string } | { failed: string };

/** CI's pinned rules and Semgrep under the cache root, fetched when missing. */
export function prepareSemgrep(
  cache: string,
  pins: { version: string; rules: string },
  exec: Runner,
): SemgrepReady {
  const dir = join(cache, `semgrep-rules-${pins.rules}`);
  if (!semgrepRulesWhole(dir)) {
    // The same commit CI checks out, as its archive (no git state touched).
    rmSync(dir, { recursive: true, force: true });
    if (exec("mkdir", ["-p", dir]) !== 0)
      return { failed: `the rules folder ${dir} could not be made` };
    const url = `https://codeload.github.com/semgrep/semgrep-rules/tar.gz/${pins.rules}`;
    const got = exec("bash", [
      "-c",
      `set -o pipefail; curl -fsSL --max-time 120 "${url}" | tar -xz --strip-components=1 -C "${dir}"`,
    ]);
    if (got !== 0) {
      rmSync(dir, { recursive: true, force: true });
      return { notRun: "the pinned Semgrep rules could not be fetched" };
    }
    // CI's removals (ci.yml): rules it drops before the scan.
    for (const drop of [
      "typescript/react/portability/i18next/i18next-key-format.yaml",
      "javascript/lang/correctness/no-stringify-keys.yaml",
      "javascript/lang/correctness/no-replaceall.yaml",
      "typescript/react/best-practice/react-props-in-state.yaml",
    ])
      exec("rm", ["-f", join(dir, drop)]);
  }
  // CI's pinned version, in its own venv (pip, as CI installs it).
  const venv = join(cache, `semgrep-${pins.version}`);
  const bin = join(venv, "bin", "semgrep");
  if (!existsSync(bin)) {
    if (exec("python3", ["-m", "venv", venv]) !== 0)
      return { failed: `the venv ${venv} could not be made` };
    if (exec(join(venv, "bin", "pip"), ["install", "--quiet", `semgrep==${pins.version}`]) !== 0)
      return {
        notRun: `the pinned Semgrep ${pins.version} could not be installed (pip install semgrep==${pins.version})`,
      };
  }
  return { bin, rules: dir };
}

export function check(mode: string): number {
  const files = changedFiles();
  if (mode === "units") {
    const testsIn = (dir: string) =>
      existsSync(dir)
        ? walkFiles([dir], { ext: ["ts", "tsx"] })
            .filter((f) => dirname(f) === dir)
            .map((f) => basename(f))
        : [];
    const dirs = changedTestFolders(files, testsIn);
    // Each folder's own test files by path: a folder filter would also take its subfolders.
    const tests = dirs.flatMap((d) =>
      testsIn(d)
        .filter((n) => UNIT.test(n))
        .map((n) => `${d}/${n}`),
    );
    console.log(
      `[laws] changed folders with unit tests: ${dirs.length}; test files: ${tests.length}`,
    );
    if (tests.length === 0) return 0;
    return run("bunx", ["vitest", "run", ...tests, "--maxWorkers=2"]);
  }
  if (mode === "semgrep") {
    const targets = semgrepTargets(files);
    console.log(`[laws] changed files Semgrep judges: ${targets.length}`);
    if (targets.length === 0) return 0;
    const ready = prepareSemgrep(
      CHECKS_CACHE,
      semgrepPins(readFileSync(".github/workflows/ci.yml", "utf8")),
      run,
    );
    if ("notRun" in ready) {
      console.log(`${NOT_RUN_LINE}${ready.notRun}`);
      return NOT_RUN_EXIT;
    }
    if ("failed" in ready) {
      console.error(`[laws] ${ready.failed}`);
      return 1;
    }
    const { bin, rules: dir } = ready;
    return run(bin, [
      "scan",
      "--metrics=off",
      "--disable-version-check",
      "--severity",
      "ERROR",
      "--error",
      "--config",
      join(dir, "javascript"),
      "--config",
      join(dir, "typescript"),
      ...targets,
    ]);
  }
  throw new Error(`laws-changed: unknown mode ${mode}`);
}

if (import.meta.main) process.exit(check(process.argv[2] ?? ""));
