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
 * Local forms (LOCAL below) replace a step only where CI's text cannot mean the same here (the
 * Typecheck step is not one: it runs CI's own `bun run typecheck`, both projects — TCK-12):
 *   - the i18n drift check: the maps' bytes before and after regenerating (CI's `git diff` would
 *     read this tree's uncommitted work as drift).
 *   - the budget job's Build: the same `bun run build` as build-and-check › Build, reused.
 * A step whose pinned download or checksum fails prints NOT RUN (R3): no unpinned stand-in.
 * A step whose pinned binary is built for another machine prints NOT RUN before any download,
 * the asset's platform read from the step's own text (INC-1094).
 * After the budget check the NEAR band (R4, DEC-361) prints a NOTE for every page inside DEC-296's
 * one band (budget-band.mjs) with its growth against the turn's base build (HEAD's tree, built
 * once and cached); a budget step whose only failure is that band is a PASS — CI's bundle-budget
 * job judges, and a line moves only with a named cause.
 * `--no-tests` (INC-1064): every vitest and playwright step is NOT RUN "--no-tests", every other
 * step runs as before, and the last line says so.
 *
 * Output: one line per step (`PASS|FAIL|NOT RUN  job › step  (Ns)[ — reason]`), then the last
 * line `checks: N PASS · N FAIL · N NOT RUN · Ns`. Scanner output stays in the step's own log
 * (~/.cache/ethio-checks/logs), never printed: counts only (Knowledge: scanner output).
 * Guard: scripts/ci/turn-checks.test.ts (TCK-1…12).
 */
import { spawnSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { join } from "node:path";
import { createHash } from "node:crypto";

import { errorText } from "../../src/lib/error-text";
import { ownValue } from "../../src/lib/own-key";
import { NEAR_KIB, judgedSize } from "../budget-band.mjs";
import { readAllowlist } from "../conformance/kit";
import { CHECKS_CACHE as CACHE } from "./checks-cache";
import { briefInForce, NOT_RUN_EXIT, NOT_RUN_LINE } from "./laws-changed";

export const CI_FILE = ".github/workflows/ci.yml";
export const ALLOWLIST = "scripts/ci/turn-checks-allowlist.txt";

export type Verdict = "PASS" | "FAIL" | "NOT RUN";
export type Step = {
  job: string;
  name: string;
  key: string;
  run: string;
  env: Record<string, string>;
  timeoutS: number;
  conditional: boolean;
  /** A step of the runner's own whose text does not name its test runner (`--no-tests`). */
  tests?: boolean;
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

/**
 * DEC-311 (turn CI-3a) — THE FAST LINE. A step is slow when it builds the app or belongs to a job
 * that only judges a build or runs a scanner; inside a job, every step from its first slow step on
 * stays slow, so a job's own order never changes. The fast steps run first (in ci.yml's order), then
 * `checks (fast): …` names them, then the slow steps run. No step is dropped or skipped; the final
 * line stays the only verdict. Guard: turn-checks.test.ts TC-E1, TC-E2.
 */
export const SLOW_JOBS = new Set(["bundle-budget", "semgrep"]);
export const SLOW_RUN = /\bbun run build\b/;
export function fastFirst(steps: Step[]): { fast: Step[]; slow: Step[] } {
  const slowFrom = new Set<string>();
  const fast: Step[] = [];
  const slow: Step[] = [];
  for (const step of steps) {
    if (SLOW_JOBS.has(step.job) || SLOW_RUN.test(step.run)) slowFrom.add(step.job);
    (slowFrom.has(step.job) ? slow : fast).push(step);
  }
  return { fast, slow };
}

/**
 * INC-1030 (turn B1) — THE LAWS FIRST. The scripts/ tests (the conformance censuses and the id laws,
 * about a minute) run before any other step, inside the fast line, so a time limit never cuts them
 * off. It is a local step of its own job, so its failure never skips CI's component-test step: no
 * step is dropped, and that step still runs the whole suite (the scripts/ tests again), so the final
 * verdict is unchanged. Guard: turn-checks.test.ts TC-E3.
 */
export const LAWS_STEP: Step = {
  job: "laws-first",
  name: "scripts/ tests first (INC-1030)",
  key: "laws-first › scripts/ tests first (INC-1030)",
  run: "bunx vitest run scripts --maxWorkers=2",
  env: {},
  timeoutS: 300,
  conditional: false,
};
/** INC-1030 widened (F4a-2): the changed folders' unit tests and Semgrep on the changed files. */
export const LAWS_CHANGED_UNITS: Step = {
  job: "laws-first",
  name: "changed folders' unit tests (INC-1030)",
  key: "laws-first › changed folders' unit tests (INC-1030)",
  run: "bun scripts/ci/laws-changed.ts units",
  env: {},
  timeoutS: 300,
  conditional: false,
  tests: true,
};
export const LAWS_SEMGREP: Step = {
  job: "laws-first",
  name: "Semgrep ERROR on changed files, CI's pins (INC-1030)",
  key: "laws-first › Semgrep ERROR on changed files, CI's pins (INC-1030)",
  run: "bun scripts/ci/laws-changed.ts semgrep",
  env: {},
  timeoutS: 300,
  conditional: false,
};
export const LAWS_STEPS: Step[] = [LAWS_STEP, LAWS_CHANGED_UNITS, LAWS_SEMGREP];
export function lawsFirst(fast: Step[]): Step[] {
  return [...LAWS_STEPS, ...fast];
}

/** The fast line: never the verdict, so it never begins `checks:`. */
export function fastLine(lines: Line[], seconds: number, jobs: string[]): string {
  const n = (v: Verdict) => lines.filter((l) => l.verdict === v).length;
  return `checks (fast): ${n("PASS")} PASS · ${n("FAIL")} FAIL · ${seconds}s — ${jobs.join(", ")}; slow steps follow (build, budget, semgrep)`;
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
  "i18n-usage-map › Assert no drift": "the maps' bytes before and after regenerating",
  "bundle-budget › Build": "build-and-check › Build, reused",
  "secrets-scan › Secrets scan (gitleaks, pinned)":
    "the walk is <base>..HEAD plus the uncommitted work",
  "component-tests › Component tests (vitest + RTL + jsdom)":
    "the sandbox's shared CPU: the full suite at default workers times out (INC-1001)",
} as const;

/** INC-1001 — the same vitest suite, bounded to at most 2 workers here; CI's command is unchanged. */
export const LOCAL_UNIT_BOUND = "--maxWorkers=2";
export function localUnitTests(run: string): string {
  return `${run} -- ${LOCAL_UNIT_BOUND}`;
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

/** R3 for the laws step's Semgrep (housekeeping turn 3): laws-changed.ts exits NOT_RUN_EXIT with its
 *  `[laws] NOT RUN — <reason>` line when the pinned rules or `pip install semgrep==<v>` failed. Both
 *  are required: Semgrep's own scan also exits 3 (a target it cannot parse), which stays a FAIL. */
export function lawsNotRun(step: Step, code: number, output: string): string | undefined {
  if (step.key !== LAWS_SEMGREP.key || code !== NOT_RUN_EXIT) return undefined;
  const line = output
    .split("\n")
    .filter((l) => l.startsWith(NOT_RUN_LINE))
    .at(-1);
  return line === undefined ? undefined : line.slice(NOT_RUN_LINE.length);
}

/**
 * INC-1094 (housekeeping turn 1) — a pinned binary runs only on the machine it is built for. A step
 * that checks a download against a `*_SHA256` names its asset in its own text (`tarball="…"`, or
 * the last part of a `releases/download/…` address); the asset's name says its platform. A Linux
 * or Windows executor needs a row in these two tables, nothing else.
 */
export type Machine = { platform: string; arch: string };
const ASSET_OS = new Map([
  ["linux", "linux"],
  ["darwin", "darwin"],
  ["macos", "darwin"],
  ["apple-darwin", "darwin"],
  ["windows", "win32"],
]);
const ASSET_ARCH = new Map([
  ["amd64", "x64"],
  ["x64", "x64"],
  ["x86_64", "x64"],
  ["arm64", "arm64"],
  ["aarch64", "arm64"],
]);

/** The pinned asset's name with the step's own variables filled in; null for an unpinned step. */
export function pinnedAsset(step: Step): string | null {
  if (!Object.keys(step.env).some((k) => /_SHA256$/.test(k))) return null;
  const named =
    /\btarball="([^"]+)"/.exec(step.run)?.[1] ??
    /releases\/download\/[^\s"]*\/([^\s"/$]+)/.exec(step.run)?.[1] ??
    "";
  return named.replace(/\$\{(\w+)\}/g, (all, name: string) => ownValue(step.env, name) ?? all);
}

/** The machine an asset's name says it is built for: `linux_amd64`, `x86_64-unknown-linux-gnu`… */
export function assetMachine(asset: string): Machine | null {
  const name = asset.toLowerCase();
  const osArch =
    /(?:^|[_.-])(linux|darwin|macos|windows)[_-](amd64|x86_64|x64|arm64|aarch64)(?=[_.-]|$)/.exec(
      name,
    );
  const archOs =
    /(?:^|[_.-])(x86_64|aarch64|arm64)-(?:unknown-)?(linux|apple-darwin|darwin)(?=[_.-]|$)/.exec(
      name,
    );
  const os = osArch?.[1] ?? archOs?.[2];
  const arch = osArch?.[2] ?? archOs?.[1];
  const platform = os === undefined ? undefined : ASSET_OS.get(os);
  const cpu = arch === undefined ? undefined : ASSET_ARCH.get(arch);
  return platform === undefined || cpu === undefined ? null : { platform, arch: cpu };
}

/** Why a pinned step cannot run on this machine; undefined when it can (or pins nothing). */
export function platformReason(step: Step, here: Machine): string | undefined {
  const asset = pinnedAsset(step);
  if (asset === null) return undefined;
  const built = assetMachine(asset);
  if (built === null) return `pinned asset platform unknown: ${asset || "(no asset name)"}`;
  if (built.platform === here.platform && built.arch === here.arch) return undefined;
  return `pinned binary ${built.platform}/${built.arch} (${asset}); this machine ${here.platform}/${here.arch}`;
}

/** INC-1064 — `bun run checks --no-tests`: the guards and scanners only. Any other word is refused. */
export const NO_TESTS = "--no-tests";
export function parseArgs(argv: string[]): { noTests: boolean } | { error: string } {
  let noTests = false;
  for (const arg of argv) {
    if (arg === NO_TESTS) noTests = true;
    else return { error: `unknown argument ${arg}` };
  }
  return { noTests };
}

/** A vitest or playwright step, by its text with each `bun run <script>` read through package.json. */
export function isTestStep(step: Step, scripts: Map<string, string>): boolean {
  if (step.tests === true) return true;
  let text = step.run;
  for (let depth = 0; depth < 3; depth++) {
    const next = text.replace(
      /\bbun run ([\w:.-]+)/g,
      (all, name: string) => `${all} ${scripts.get(name) ?? ""}`,
    );
    if (next === text) break;
    text = next;
  }
  return /\b(?:vitest|playwright)\b/.test(text);
}

/** TCK-4 — the last line: the counts of the lines printed and the whole run's seconds. */
export function summary(lines: Line[], seconds: number, noTests = false): string {
  const n = (v: Verdict) => lines.filter((l) => l.verdict === v).length;
  const marked = noTests ? ` · ${NO_TESTS} (the laws and the unit tests not run)` : "";
  return `checks: ${n("PASS")} PASS · ${n("FAIL")} FAIL · ${n("NOT RUN")} NOT RUN · ${seconds}s${marked}`;
}

export function lineText(l: Line): string {
  return `${l.verdict.padEnd(7)}  ${l.key}  (${l.seconds}s)${l.reason ? ` — ${l.reason}` : ""}`;
}

/**
 * The sizes check-bundle-size.mjs prints, under the labels its NEAR section uses: the entry
 * (`JS: 211.9 KiB / 215 KiB — ok` → "entry JS", `CSS: …` → "stylesheet") and each page
 * (`  329.7 / 330 KiB  /admin/coverage`).
 */
export function pageSizes(output: string): Map<string, { kib: number; ceiling: number }> {
  const out = new Map<string, { kib: number; ceiling: number }>();
  for (const m of output.matchAll(/^(JS|CSS): ([0-9.]+) KiB \/ ([0-9.]+) KiB/gm))
    out.set(m[1] === "JS" ? "entry JS" : "stylesheet", {
      kib: Number(m[2]),
      ceiling: Number(m[3]),
    });
  for (const m of output.matchAll(/^\s+([0-9.]+) \/\s*([0-9.]+) KiB\s+(\S+)\s*$/gm))
    out.set(m[3], { kib: Number(m[1]), ceiling: Number(m[2]) });
  return out;
}

/** The labels the budget step's own NEAR section names (budget-band.mjs nearFindings). */
export function nearNamed(output: string): Set<string> {
  const section = output.split("\nNEAR band failed (DEC-296):")[1] ?? "";
  return new Set(
    [...section.matchAll(/^\s+(.+?): [0-9.]+ KiB.* sits within the NEAR band/gm)].map((m) => m[1]),
  );
}

export type Near = { page: string; kib: number; ceiling: number; growth: number | null };

/**
 * R4 / TCK-5 — DEC-296's one band: a size judged as the budget step judges it locally
 * (budget-band.mjs judgedSize, the local allowance) inside NEAR_KIB of its ceiling, or a label the
 * step's NEAR section named (its unrounded size can sit in the band where the printed one does not).
 */
export function nearBand(
  now: Map<string, { kib: number; ceiling: number }>,
  base: Map<string, { kib: number; ceiling: number }> | null,
  named: Set<string> = new Set(),
): Near[] {
  const out: Near[] = [];
  for (const [page, { kib, ceiling }] of now) {
    const used = judgedSize(kib, false);
    const inBand = used <= ceiling && ceiling - used < NEAR_KIB - 1e-9;
    if (!inBand && !named.has(page)) continue;
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

/** A NEAR page's NOTE: CI's bundle-budget job judges it; the local run never fails on it (DEC-361). */
export function noteLine(n: Near, baseSha: string | null): string {
  const head = `NEAR ${n.page} ${n.kib.toFixed(1)} / ${n.ceiling} KiB`;
  if (baseSha === null) return `${head}, NOT RUN — NEAR: base not built, CI judges`;
  const grew =
    n.growth === null
      ? `not in the base build ${baseSha}`
      : `grew ${n.growth >= 0 ? "+" : ""}${n.growth.toFixed(1)} since ${baseSha}`;
  return `${head}, ${grew} — CI's bundle-budget job judges; raise the line only with a named cause`;
}

/**
 * TCK-9 — the budget step's verdict: its own exit, except that a run whose only failure section is
 * DEC-296's NEAR band is a PASS (its NOTE lines follow). Any other failure the step prints stays a
 * FAIL, alone or beside the band.
 */
export function budgetVerdict(code: number, output: string): Verdict {
  if (code === 0) return "PASS";
  if (!output.includes("\nNEAR band failed (DEC-296):")) return "FAIL";
  const other =
    /Per-page budget failed|OVER BUDGET|First-paint budget exceeded|Tier flag off card pages failed|^Bundle budget: /m;
  return other.test(output) ? "FAIL" : "PASS";
}

const BUDGET_STEP = "bundle-budget › Check the first-paint budget";

/** A run step's line from its exit and output: PASS (or the NEAR-only budget), R3's NOT RUN, FAIL. */
export function stepLine(step: Step, r: { code: number; output: string }, seconds: number): Line {
  const notFetched =
    r.code !== 0 ? (fetchFailure(step, r.output) ?? lawsNotRun(step, r.code, r.output)) : undefined;
  const nearOnly =
    step.key === BUDGET_STEP &&
    r.code !== 0 &&
    r.code !== 124 &&
    budgetVerdict(r.code, r.output) === "PASS";
  if (r.code === 0 || nearOnly)
    return {
      verdict: "PASS",
      key: step.key,
      seconds,
      reason: nearOnly
        ? "its one failure is DEC-296's NEAR band: a NOTE below, CI's bundle-budget job judges"
        : ownValue(LOCAL, step.key),
    };
  if (notFetched) return { verdict: "NOT RUN", key: step.key, seconds, reason: notFetched };
  return {
    verdict: "FAIL",
    key: step.key,
    seconds,
    reason:
      r.code === 124 ? `past its ${step.timeoutS}s deadline` : `exit ${r.code}; log ${CACHE}/logs`,
  };
}

// ─── the run ───────────────────────────────────────────────────────────────────────────────────

/** Runs one step's text under bash with its deadline; the output goes to the step's log. */
export function sh(
  cmd: string,
  env: Record<string, string>,
  timeoutS: number,
  logName: string,
  cwd?: string,
) {
  mkdirSync(join(CACHE, "logs"), { recursive: true });
  const r = spawnSync("bash", ["-eo", "pipefail", "-c", cmd], {
    encoding: "utf8",
    env: { ...process.env, ...env },
    timeout: timeoutS * 1000,
    maxBuffer: 256 * 1024 * 1024,
    ...(cwd === undefined ? {} : { cwd }),
  });
  const output = `${r.stdout ?? ""}${r.stderr ?? ""}`;
  writeFileSync(join(CACHE, "logs", `${logName}.log`), output);
  return { code: r.error ? 124 : (r.status ?? 1), output };
}

function mapsHash(): string {
  const h = createHash("sha256");
  for (const f of ["docs/generated/i18n-usage.json", "public/i18n-usage.json"])
    h.update(existsSync(f) ? readFileSync(f) : "missing");
  return h.digest("hex");
}

/**
 * The turn's base: CHECKS_BASE, else the "Base: dev <sha>" of the brief roadmap line 3 names (the
 * platform commits during a turn, so HEAD is not the base), else HEAD.
 */
export function briefBase(
  roadmap: string,
  readBrief: (path: string) => string | null,
): string | null {
  const path = briefInForce(roadmap);
  const text = path === null ? null : readBrief(path);
  return text?.match(/Base: dev ([0-9a-f]{7,40})\b/)?.[1] ?? null;
}

function turnBase(): string {
  const env = (process.env.CHECKS_BASE ?? "").trim();
  if (env) return env;
  const fromBrief = existsSync("roadmap.md")
    ? briefBase(readFileSync("roadmap.md", "utf8"), (p) =>
        existsSync(p) ? readFileSync(p, "utf8") : null,
      )
    : null;
  return fromBrief ?? spawnSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).stdout.trim();
}

/**
 * The secrets scan's local form: CI walks origin/main..HEAD, the commits main does not hold yet. The
 * sandbox's origin/main is never fetched here (no stateful git), so it is far behind and would walk
 * thousands of old commits; the walk is <base>..HEAD instead, and the work not yet committed is
 * scanned too (`gitleaks git --pre-commit`). Counts only.
 */
export function localSecretsScan(run: string, base: string): string {
  const tail = [
    "set +e",
    '"$RUNNER_TEMP/gitleaks" git --pre-commit --redact --no-banner --exit-code=2 . > "$RUNNER_TEMP/gitleaks-wt.log" 2>&1',
    "code=$?",
    "set -e",
    'echo "Uncommitted work:"; grep -E "leaks found|no leaks found" "$RUNNER_TEMP/gitleaks-wt.log" | sed -E "s/^.*(INF|WRN|ERR) //"',
    'if [ "$code" -ne 0 ]; then exit "$code"; fi',
  ].join("\n");
  return `${run.replace('range="origin/main..HEAD"', `range="${base}..HEAD"`).replace('range="HEAD"', `range="${base}..HEAD"`)}\n${tail}\n`;
}

/** The turn's base build: the base's tree, exported (git archive, read-only) and built once. */
function baseSizes(): { sizes: Map<string, { kib: number; ceiling: number }>; sha: string } | null {
  const sha = turnBase();
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
  const args = parseArgs(process.argv.slice(2));
  if ("error" in args) {
    console.log(`checks: ${args.error} (usage: bun run checks [${NO_TESTS}])`);
    return 2;
  }
  const { noTests } = args;
  const pkg: unknown = JSON.parse(readFileSync("package.json", "utf8"));
  const pkgScripts =
    typeof pkg === "object" && pkg !== null && "scripts" in pkg ? pkg.scripts : undefined;
  const scripts = new Map(
    Object.entries(typeof pkgScripts === "object" && pkgScripts !== null ? pkgScripts : {}).filter(
      (e): e is [string, string] => typeof e[1] === "string",
    ),
  );
  const here: Machine = { platform: process.platform, arch: process.arch };
  const steps = planFrom(readFileSync(CI_FILE, "utf8"));
  let allow: Map<string, string>;
  try {
    allow = allowed(steps);
  } catch (error) {
    console.log(`FAIL     the allowlist  (0s) — ${errorText(error)}`);
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
  const split = fastFirst(steps);
  const fast = lawsFirst(split.fast);
  const slow = split.slow;
  const fastJobs = [...new Set(fast.map((s) => s.job))];
  let fastPrinted = false;
  const printFast = () => {
    if (fastPrinted) return;
    fastPrinted = true;
    console.log(fastLine(lines, Math.round((Date.now() - started) / 1000), fastJobs));
  };

  for (const step of [...fast, ...slow]) {
    if (!fastPrinted && slow.includes(step)) printFast();
    const t0 = Date.now();
    const secs = () => Math.round((Date.now() - t0) / 1000);
    const excuse = allowanceFor(step, allow);
    if (excuse !== undefined) {
      print({ verdict: "NOT RUN", key: step.key, seconds: 0, reason: excuse });
      continue;
    }
    if (step.conditional) continue; // TCK-1 refuses this shape; never reached on a guarded ci.yml
    if (noTests && isTestStep(step, scripts)) {
      print({ verdict: "NOT RUN", key: step.key, seconds: 0, reason: NO_TESTS });
      continue;
    }
    const elsewhere = platformReason(step, here);
    if (elsewhere !== undefined) {
      print({ verdict: "NOT RUN", key: step.key, seconds: 0, reason: elsewhere });
      continue;
    }
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
    const text =
      step.key === "secrets-scan › Secrets scan (gitleaks, pinned)"
        ? localSecretsScan(step.run, turnBase())
        : step.key === "component-tests › Component tests (vitest + RTL + jsdom)"
          ? localUnitTests(step.run)
          : step.run;
    const r = sh(
      text,
      { ...baseEnv, ...step.env },
      step.timeoutS,
      step.key.replace(/[^\w]+/g, "-"),
    );
    const line = stepLine(step, r, secs());
    print(line);
    if (step.key === "build-and-check › Build") buildResult = line;
    if (line.verdict !== "PASS") failedJobs.set(step.job, step.name);
    if (step.key === BUDGET_STEP) {
      const now = pageSizes(r.output);
      const named = nearNamed(r.output);
      const inBand = nearBand(now, null, named);
      const base = inBand.length > 0 ? baseSizes() : null;
      const near = nearBand(now, base?.sizes ?? null, named);
      for (const n of near) console.log(`  NOTE   ${noteLine(n, base?.sha ?? null)}`);
      const unbuilt = near.length > 0 && base === null;
      print({
        verdict: unbuilt ? "NOT RUN" : "PASS",
        key: "bundle-budget › the NEAR band (R4)",
        seconds: 0,
        reason: unbuilt
          ? "NEAR: base not built, CI judges"
          : `${near.length} NEAR (DEC-296's one band; NOTE lines above)`,
      });
    }
  }
  printFast();
  for (const f of ["semgrep.json", "semgrep.sarif"]) rmSync(f, { force: true });
  const last = summary(lines, Math.round((Date.now() - started) / 1000), noTests);
  console.log(last);
  return lines.some((l) => l.verdict === "FAIL") ? 1 : 0;
}

if (import.meta.main) process.exit(main());
