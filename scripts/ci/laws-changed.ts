/**
 * INC-1030 widened (turn F4a-2) — the laws step's two changed-file parts, run before any slow
 * step so their failures show in the fast line:
 *  - `units`: the unit tests in the same folders as the files the turn changed;
 *  - `semgrep`: Semgrep at ERROR on the changed files, with CI's pinned version and rules
 *    (read from .github/workflows/ci.yml, never restated here).
 * The turn's base is TURN_BASE when set, else HEAD~1; the diff includes the working tree.
 */
import { execFileSync, spawnSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";

const UNIT = /\.test\.tsx?$/;

/** The folders whose unit tests the laws step runs, for these changed files. */
export function changedTestFolders(files: string[], testsIn: (dir: string) => string[]): string[] {
  const dirs = new Set<string>();
  for (const file of files) {
    if (!/^(?:src|scripts)\//.test(file)) continue;
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

function changedFiles(): string[] {
  const base = process.env["TURN_BASE"] ?? "HEAD~1";
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

export function check(mode: string): number {
  const files = changedFiles();
  if (mode === "units") {
    const dirs = changedTestFolders(files, (dir) => (existsSync(dir) ? readdirSync(dir) : []));
    console.log(`[laws] changed folders with unit tests: ${dirs.length}`);
    if (dirs.length === 0) return 0;
    return run("bunx", ["vitest", "run", ...dirs.map((d) => `${d}/`), "--maxWorkers=2"]);
  }
  if (mode === "semgrep") {
    const targets = semgrepTargets(files);
    console.log(`[laws] changed files Semgrep judges: ${targets.length}`);
    if (targets.length === 0) return 0;
    const { version, rules } = semgrepPins(readFileSync(".github/workflows/ci.yml", "utf8"));
    const dir = join("/tmp", `semgrep-rules-${rules}`);
    if (!existsSync(join(dir, "javascript"))) {
      if (run("git", ["init", "--quiet", dir]) !== 0) return 1;
      run("git", [
        "-C",
        dir,
        "remote",
        "add",
        "origin",
        "https://github.com/semgrep/semgrep-rules",
      ]);
      if (run("git", ["-C", dir, "fetch", "--quiet", "--depth", "1", "origin", rules]) !== 0)
        return 1;
      if (run("git", ["-C", dir, "checkout", "--quiet", rules]) !== 0) return 1;
    }
    // CI's pinned version, in its own venv (pip, as CI installs it).
    const venv = join("/tmp", `semgrep-${version}`);
    const bin = join(venv, "bin", "semgrep");
    if (!existsSync(bin)) {
      if (run("python3", ["-m", "venv", venv]) !== 0) return 1;
      if (run(join(venv, "bin", "pip"), ["install", "--quiet", `semgrep==${version}`]) !== 0)
        return 1;
    }
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
