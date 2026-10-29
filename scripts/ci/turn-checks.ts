/**
 * Foundations turn CI-2 (CI-1 Part B) — EVERY CI CHECK THAT NEEDS NO BACKEND RUNS BEFORE THE PUSH.
 *
 * `bun run checks` (scripts/ci/turn-checks.sh → this file) reads .github/workflows/ci.yml itself
 * and runs each job's `run:` steps in CI's order, with the step's own text, env and deadline — so
 * the pins (actionlint, gitleaks, semgrep) are read from ci.yml, never from a copy, and a new CI
 * job joins the script by being written. It never stops at a FAIL: every job runs; inside a job a
 * failed step ends that job as CI does (its later steps are NOT RUN, with that reason).
 *
 * A step the sandbox cannot run is a line of scripts/ci/turn-checks-allowlist.txt
 * (`job › step | reason | until`; a whole job is `job › *`) and prints NOT RUN with its reason.
 * Local forms (LOCAL below) replace a step only where CI's text cannot mean the same here:
 *   - Typecheck (R1): the platform harness's verdict, read from /tmp/observability/build-errors.log;
 *     PASS only when that file is newer than every change under src/, e2e/ and scripts/ and its
 *     last entry is "build OK"; older or missing → NOT RUN. Never re-run, never an old PASS.
 *   - the i18n drift check: the maps' bytes before and after regenerating (CI's `git diff` would
 *     read this tree's uncommitted work as drift).
 *   - the budget job's Build: the same `bun run build` as build-and-check › Build, reused.
 * A step whose pinned download or checksum fails prints NOT RUN (R3): no unpinned stand-in.
 * After the budget check the NEAR band (R4) lists every page within 0.3 KiB of its line with its
 * growth against the turn's base build (HEAD's tree, built once and cached); a NEAR page that
 * grew is a FAIL until its line is raised with the cause.
 *
 * Output: one line per step (`PASS|FAIL|NOT RUN  job › step  (Ns)[ — reason]`), then the last
 * line `checks: N PASS · N FAIL · N NOT RUN · Ns`. Scanner output stays in the step's own log
 * (~/.cache/ethio-checks/logs), never printed: counts only (Knowledge: scanner output).
 * Guard: scripts/ci/turn-checks.test.ts (TCK-1…5).
 */
import { spawnSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { createHash } from "node:crypto";

import { readAllowlist } from "../conformance/kit";

export const CI_FILE = ".github/workflows/ci.yml";
export const ALLOWLIST = "scripts/ci/turn-checks-allowlist.txt";
export const NEAR_KIB = 0.3;
const CACHE = process.env.ETHIO_CHECKS_CACHE ?? join(homedir(), ".cache", "ethio-checks");
const HARNESS_LOG = "/tmp/observability/build-errors.log";

export type Verdict = "PASS" | "FAIL" | "NOT RUN";
export type Step = {
  job: string;
  name: string;
  key: string;
  run: string;
  env: Record<string, string>;
  timeoutS: number;
  conditional: boolean;
};
export type Line = { verdict: Verdict; key: string; seconds: number; reason?: string };

type WorkflowStep = {
  name?: string;
  run?: string;
  uses?: string;
  if?: string;
  env?: Record<string, unknown>;
  "timeout-minutes"?: number;
};
type WorkflowJob = {
  name?: string;
  env?: Record<string, unknown>;
  steps?: WorkflowStep[];
  "timeout-minutes"?: number;
};

/** A GitHub expression has no local value: the variable is left empty. */
function envOf(raw: Record<string, unknown> | undefined): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(raw ?? {}))
    out[k] = typeof v === "string" && v.includes("${{") ? "" : String(v);
  return out;
}

/**
 * Bun's own YAML reader (no new dependency). Under vitest (node) the same reader runs in a
 * `bun` child, so the tests read ci.yml exactly as the script does.
 */
export function parseYaml(text: string): unknown {
  const bun = (globalThis as { Bun?: { YAML: { parse(t: string): unknown } } }).Bun;
  if (bun) return bun.YAML.parse(text);
  const r = spawnSync(
    "bun",
    ["-e", "process.stdout.write(JSON.stringify(Bun.YAML.parse(await Bun.stdin.text())))"],
    { input: text, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 },
  );
  if (r.status !== 0) throw new Error(`ci.yml could not be read: ${r.stderr}`);
  return JSON.parse(r.stdout);
}

/** Every job's named steps, in ci.yml's order. `uses:` steps without a name are setup. */
export function planFrom(yamlText: string): Step[] {
  const doc = parseYaml(yamlText) as { jobs: Record<string, WorkflowJob> };
  const steps: Step[] = [];
  for (const [job, spec] of Object.entries(doc.jobs)) {
    for (const step of spec.steps ?? []) {
      if (!step.name) continue;
      steps.push({
        job,
        name: step.name,
        key: `${job} › ${step.name}`,
        run: step.run ?? "",
        env: { ...envOf(spec.env), ...envOf(step.env) },
        timeoutS: 60 * (step["timeout-minutes"] ?? spec["timeout-minutes"] ?? 20),
        conditional: step.if !== undefined || step.run === undefined,
      });
    }
  }
  return steps;
}

/** The step keys and job wildcards an allowlist line may name. */
export function allowKeys(steps: Step[]): string[] {
  return [...steps.map((s) => s.key), ...new Set(steps.map((s) => `${s.job} › *`))];
}

/** The allowlist (kit.readAllowlist: stale or expired lines throw), as key → reason. */
export function allowed(steps: Step[], path = ALLOWLIST): Map<string, string> {
  const out = new Map<string, string>();
  for (const [key, a] of readAllowlist(path, allowKeys(steps))) out.set(key, a.reason);
  return out;
}

export function allowanceFor(step: Step, allow: Map<string, string>): string | undefined {
  return allow.get(step.key) ?? allow.get(`${step.job} › *`);
}

/** TCK-1: a step the script neither runs nor excuses. A `uses:`/`if:` step must be excused. */
export function uncovered(steps: Step[], allow: Map<string, string>): string[] {
  return steps
    .filter((s) => s.conditional && allowanceFor(s, allow) === undefined)
    .map((s) => s.key);
}

/** The local forms, by step key; TCK-1 fails a key ci.yml no longer holds. */
export const LOCAL = {
  "build-and-check › Typecheck": "the platform harness's verdict (R1)",
  "i18n-usage-map › Assert no drift": "the maps' bytes before and after regenerating",
  "bundle-budget › Build": "build-and-check › Build, reused",
} as const;

/** R1 — the harness's typecheck verdict, never re-run, never older than the tree. */
export function typecheckVerdict(
  log: { mtimeMs: number; text: string } | null,
  newestChangeMs: number,
): { verdict: Verdict; reason?: string } {
  if (log === null) return { verdict: "NOT RUN", reason: `${HARNESS_LOG} is missing` };
  if (log.mtimeMs < newestChangeMs)
    return {
      verdict: "NOT RUN",
      reason: "the harness's verdict is older than the newest change; let it run, then run again",
    };
  const entries = log.text.split(/^=== build /m);
  const last = entries.at(-1) ?? "";
  if (/\bbuild OK\b/.test(last) && !/error/i.test(last.replace(/build OK/g, "")))
    return { verdict: "PASS" };
  return { verdict: "FAIL", reason: "the harness's last verdict holds errors" };
}

/** R3 — a pinned fetch or checksum that failed is NOT RUN, never PASS and never a stand-in. */
export function fetchFailure(step: Step, output: string): string | undefined {
  const pinned = Object.keys(step.env).some((k) => /_SHA256$|_VERSION$/.test(k));
  if (!pinned) return undefined;
  if (/sha256sum: WARNING|: FAILED$/m.test(output)) return "the pinned download's checksum failed";
  if (/curl: \(\d+\)|Could not resolve host|No matching distribution|ERROR: Could not/.test(output))
    return "the pinned download could not be fetched";
  return undefined;
}

/** TCK-4 — the last line: the counts of the lines printed and the whole run's seconds. */
export function summary(lines: Line[], seconds: number): string {
  const n = (v: Verdict) => lines.filter((l) => l.verdict === v).length;
  return `checks: ${n("PASS")} PASS · ${n("FAIL")} FAIL · ${n("NOT RUN")} NOT RUN · ${seconds}s`;
}

export function lineText(l: Line): string {
  return `${l.verdict.padEnd(7)}  ${l.key}  (${l.seconds}s)${l.reason ? ` — ${l.reason}` : ""}`;
}

/** The per-page lines check-bundle-size.mjs prints: `  329.7 / 330 KiB  /admin/coverage`. */
export function pageSizes(output: string): Map<string, { kib: number; ceiling: number }> {
  const out = new Map<string, { kib: number; ceiling: number }>();
  for (const m of output.matchAll(/^\s+([0-9.]+) \/\s*([0-9]+) KiB\s+(\S+)\s*$/gm))
    out.set(m[3], { kib: Number(m[1]), ceiling: Number(m[2]) });
  return out;
}

export type Near = { page: string; kib: number; ceiling: number; growth: number | null };

/** R4 / TCK-5 — every page within NEAR_KIB of its line, with its growth against the base. */
export function nearBand(
  now: Map<string, { kib: number; ceiling: number }>,
  base: Map<string, { kib: number; ceiling: number }> | null,
): Near[] {
  const out: Near[] = [];
  for (const [page, { kib, ceiling }] of now) {
    if (ceiling - kib > NEAR_KIB + 1e-9) continue;
    const was = base?.get(page)?.kib;
    out.push({
      page,
      kib,
      ceiling,
      growth: was === undefined ? null : Math.round((kib - was) * 10) / 10,
    });
  }
  return out.sort((a, b) => a.page.localeCompare(b.page));
}

/** A NEAR page that grew owes its raise in the same turn (R4). */
export function nearOwed(near: Near[]): Near[] {
  return near.filter((n) => n.growth !== null && n.growth > 0);
}

// ─── the run ───────────────────────────────────────────────────────────────────────────────────

function sh(cmd: string, env: Record<string, string>, timeoutS: number, logName: string) {
  mkdirSync(join(CACHE, "logs"), { recursive: true });
  const r = spawnSync("bash", ["-eo", "pipefail", "-c", cmd], {
    encoding: "utf8",
    env: { ...process.env, ...env },
    timeout: timeoutS * 1000,
    maxBuffer: 256 * 1024 * 1024,
  });
  const output = `${r.stdout ?? ""}${r.stderr ?? ""}`;
  writeFileSync(join(CACHE, "logs", `${logName}.log`), output);
  return { code: r.error ? 124 : (r.status ?? 1), output };
}

function newestChange(): number {
  const r = spawnSync("git", ["ls-files", "-co", "--exclude-standard", "src", "e2e", "scripts"], {
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
  let newest = 0;
  for (const f of r.stdout.split("\n")) {
    if (!f || !existsSync(f)) continue;
    newest = Math.max(newest, statSync(f).mtimeMs);
  }
  return newest;
}

function mapsHash(): string {
  const h = createHash("sha256");
  for (const f of ["docs/generated/i18n-usage.json", "public/i18n-usage.json"])
    h.update(existsSync(f) ? readFileSync(f) : "missing");
  return h.digest("hex");
}

/** The turn's base build: HEAD's tree, exported (git archive, read-only) and built once. */
function baseSizes(): { sizes: Map<string, { kib: number; ceiling: number }>; sha: string } | null {
  const sha =
    (process.env.CHECKS_BASE ?? "").trim() ||
    spawnSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).stdout.trim();
  if (!/^[0-9a-f]{7,40}$/.test(sha)) return null;
  const cached = join(CACHE, "base-sizes", `${sha}.txt`);
  if (!existsSync(cached)) {
    const dir = join(CACHE, "base-tree", sha);
    rmSync(dir, { recursive: true, force: true });
    mkdirSync(dir, { recursive: true });
    const ex = sh(`git archive ${sha} | tar -x -C ${JSON.stringify(dir)}`, {}, 300, "base-export");
    if (ex.code !== 0) return null;
    symlinkSync(join(process.cwd(), "node_modules"), join(dir, "node_modules"));
    const b = sh(
      `cd ${JSON.stringify(dir)} && bun run build >/dev/null 2>&1; node scripts/check-bundle-size.mjs`,
      {},
      900,
      "base-build",
    );
    if (pageSizes(b.output).size === 0) return null;
    mkdirSync(join(CACHE, "base-sizes"), { recursive: true });
    writeFileSync(cached, b.output);
    rmSync(dir, { recursive: true, force: true });
  }
  return { sizes: pageSizes(readFileSync(cached, "utf8")), sha: sha.slice(0, 8) };
}

function main(): number {
  const started = Date.now();
  const steps = planFrom(readFileSync(CI_FILE, "utf8"));
  let allow: Map<string, string>;
  try {
    allow = allowed(steps);
  } catch (error) {
    console.log(`FAIL     the allowlist  (0s) — ${(error as Error).message}`);
    console.log(summary([{ verdict: "FAIL", key: "allowlist", seconds: 0 }], 0));
    return 1;
  }
  const lines: Line[] = [];
  const print = (l: Line) => {
    lines.push(l);
    console.log(lineText(l));
  };
  const runnerTemp = join(CACHE, "runner-temp");
  rmSync(runnerTemp, { recursive: true, force: true });
  mkdirSync(runnerTemp, { recursive: true });
  // The semgrep job installs into its own environment under the cache, never the system's.
  const venv = join(CACHE, "semgrep-venv");
  const gitPath = existsSync("/bin/git") ? "/bin:" : "";
  const baseEnv: Record<string, string> = {
    RUNNER_TEMP: runnerTemp,
    CI: "",
    PATH: `${join(venv, "bin")}:${gitPath}${process.env.PATH ?? ""}`,
  };
  const failedJobs = new Map<string, string>();
  let buildResult: Line | null = null;
  let mapsBefore = "";

  for (const step of steps) {
    const t0 = Date.now();
    const secs = () => Math.round((Date.now() - t0) / 1000);
    const excuse = allowanceFor(step, allow);
    if (excuse !== undefined) {
      print({ verdict: "NOT RUN", key: step.key, seconds: 0, reason: excuse });
      continue;
    }
    if (step.conditional) continue; // TCK-1 refuses this shape; never reached on a guarded ci.yml
    const earlier = failedJobs.get(step.job);
    if (earlier) {
      print({
        verdict: "NOT RUN",
        key: step.key,
        seconds: 0,
        reason: `an earlier step failed (${earlier})`,
      });
      continue;
    }
    if (step.key === "build-and-check › Typecheck") {
      const log = existsSync(HARNESS_LOG)
        ? { mtimeMs: statSync(HARNESS_LOG).mtimeMs, text: readFileSync(HARNESS_LOG, "utf8") }
        : null;
      const v = typecheckVerdict(log, newestChange());
      print({
        verdict: v.verdict,
        key: step.key,
        seconds: secs(),
        reason: v.reason ?? LOCAL[step.key],
      });
      if (v.verdict === "FAIL") failedJobs.set(step.job, step.name);
      continue;
    }
    if (step.key === "bundle-budget › Build" && buildResult !== null) {
      print({ ...buildResult, key: step.key, reason: LOCAL[step.key] });
      if (buildResult.verdict !== "PASS") failedJobs.set(step.job, step.name);
      continue;
    }
    if (step.key === "i18n-usage-map › Assert no drift") {
      const same = mapsHash() === mapsBefore;
      print({
        verdict: same ? "PASS" : "FAIL",
        key: step.key,
        seconds: secs(),
        reason: same
          ? LOCAL[step.key]
          : "the maps changed on regenerating: keep the regenerated maps",
      });
      continue;
    }
    if (step.key === "i18n-usage-map › Regenerate the map") mapsBefore = mapsHash();
    if (step.job === "semgrep" && step.name.startsWith("Install")) {
      rmSync("/tmp/semgrep-rules", { recursive: true, force: true });
      if (!existsSync(join(venv, "bin", "pip")))
        sh(`python3 -m venv ${JSON.stringify(venv)}`, {}, 120, "semgrep-venv");
    }
    const r = sh(
      step.run,
      { ...baseEnv, ...step.env },
      step.timeoutS,
      step.key.replace(/[^\w]+/g, "-"),
    );
    const notFetched = r.code !== 0 ? fetchFailure(step, r.output) : undefined;
    const line: Line =
      r.code === 0
        ? { verdict: "PASS", key: step.key, seconds: secs() }
        : notFetched
          ? { verdict: "NOT RUN", key: step.key, seconds: secs(), reason: notFetched }
          : {
              verdict: "FAIL",
              key: step.key,
              seconds: secs(),
              reason:
                r.code === 124
                  ? `past its ${step.timeoutS}s deadline`
                  : `exit ${r.code}; log ${CACHE}/logs`,
            };
    print(line);
    if (step.key === "build-and-check › Build") buildResult = line;
    if (line.verdict !== "PASS") failedJobs.set(step.job, step.name);
    if (step.key === "bundle-budget › Check the first-paint budget") {
      const now = pageSizes(r.output);
      const base = now.size > 0 ? baseSizes() : null;
      const near = nearBand(now, base?.sizes ?? null);
      for (const n of near)
        console.log(
          `  NEAR   ${n.page}  ${n.kib.toFixed(1)} / ${n.ceiling} KiB  ${
            n.growth === null
              ? "growth unknown (no base build)"
              : `${n.growth >= 0 ? "+" : ""}${n.growth.toFixed(1)} KiB since ${base?.sha}`
          }`,
        );
      const owed = nearOwed(near);
      print({
        verdict: base === null && now.size > 0 ? "NOT RUN" : owed.length > 0 ? "FAIL" : "PASS",
        key: "bundle-budget › the NEAR band (R4)",
        seconds: 0,
        reason:
          base === null && now.size > 0
            ? "the base build could not be made"
            : owed.length > 0
              ? `${owed.length} NEAR page(s) grew: raise each with its cause (${owed.map((n) => n.page).join(", ")})`
              : `${near.length} NEAR, none grew`,
      });
    }
  }
  for (const f of ["semgrep.json", "semgrep.sarif"]) rmSync(f, { force: true });
  const last = summary(lines, Math.round((Date.now() - started) / 1000));
  console.log(last);
  return lines.some((l) => l.verdict === "FAIL") ? 1 : 0;
}

if (import.meta.main) process.exit(main());
