import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { basename } from "node:path";
import { describe, expect, it } from "vitest";
import { report, walkFiles } from "./kit";

/**
 * INC-935 (Foundations turn 34e, DEC-275) — EVERY CI JOB AND EVERY OUTSIDE CALL CARRIES A DEADLINE.
 * A step with no deadline of its own held a whole run for an hour (lane 16's browser install,
 * run 40397087967), and a job with none runs to GitHub's 360 minutes. So, in every workflow:
 * every job declares `timeout-minutes` (a job that calls a reusable workflow cannot, and its
 * callee's jobs do); every step that reaches outside (an install, a download, the backend's
 * start) declares its own; every install runs through scripts/ci/with-deadline.sh, which retries
 * it once, out loud; and a job that starts the temporary backend first reserves the backend's
 * ports from the kernel's ephemeral range (the four "address already in use" lanes of
 * 2026-10-24 → 10-26). And a package install (`apt-get install`, `playwright install-deps`,
 * `playwright install --with-deps`) runs ONCE: one cut off part-way leaves the system's package
 * manager interrupted, so its retry fails at once (lanes 3, 5 and 12 of run 40519893778 —
 * INC-943, DEC-276); downloads, `apt-get update` and `bun install` may be retried.
 * INC-941 (Foundations turn K3) — the same rule by its definition: pip's installs and git's network
 * commands reach outside too (a `pip install` or `git clone` hung is a 15-minute job lost), and
 * so does every action a step uses (setup-bun, setup-node, setup-python, gitleaks, cache,
 * artifacts, checkout): each declares its own deadline. A download that is safe to repeat
 * (`pip install`, `git clone`, `git fetch`) runs through the wrapper; a push does not (it is not
 * repeated blindly), it carries its step deadline.
 * INC-1101 (housekeeping turn 3, DEC-366) — the seventh rule: the browser's system libraries are
 * installed only by scripts/ci/install-browser-deps.sh, which survives one apt mirror; a line that
 * runs `playwright install-deps` or `playwright install --with-deps` itself is a breach. The script
 * is a package install reaching outside, so the other rules hold around it (deadline, wrapper, once).
 */

import playwrightConfig from "../../playwright.config";
import { enginesOf } from "../e2e-browser-guard";
import { readWorkflow, type Step } from "./workflow-reader";

export { readWorkflow };
export type { Job, Step } from "./workflow-reader";

/** A command line that reaches outside the runner. */
const OUTSIDE =
  /\b(?:bun install|playwright install|install-browser-deps\.sh|apt-get (?:update|install)|curl|wget|supabase start|pip install|git(?: -C \S+)? (?:clone|fetch|push|ls-remote))\b/;
/** A command line that installs or downloads, and so must run through the retrying deadline. */
const INSTALL =
  /\b(?:bun install|playwright install|install-browser-deps\.sh|apt-get (?:update|install)|pip install|git(?: -C \S+)? (?:clone|fetch))\b/;
/** The action a step uses (`uses: owner/action@ref`), or null — a local `./` workflow is no action. */
function actionOf(step: Step): string | null {
  for (const line of step.text.split("\n")) {
    const use = /^\s*(?:- )?uses:\s*(\S+)/.exec(line);
    if (use) return (use[1] ?? "").startsWith("./") ? null : (use[1] ?? null);
  }
  return null;
}
const WRAPPER = "scripts/ci/with-deadline.sh";
/** A package install: cut off part-way it is not safe to repeat, so it runs with one try (INC-943). */
const PACKAGE_INSTALL =
  /\b(?:apt-get install|playwright install-deps|playwright install --with-deps|install-browser-deps\.sh)\b/;
/** The one installer of the browser's system libraries (INC-1101); the direct forms it replaces. */
const BROWSER_DEPS = "scripts/ci/install-browser-deps.sh";
const BROWSER_DEPS_DIRECT = /\bplaywright install(?:-deps| --with-deps)\b/;
/** The wrapper's tries on a command line, or null when the line does not call it. */
function triesOf(line: string): number | null {
  const call = /with-deadline\.sh\s+\d+\s+(\d+)\s+--/.exec(line);
  return call ? Number(call[1]) : null;
}
const RESERVE = "net.ipv4.ip_local_reserved_ports=54320-54329";

/** The command lines of a step: its run text without comments and without its name. */
function commandLines(step: Step): string[] {
  return step.text
    .split("\n")
    .filter((line) => !/^\s*#/.test(line) && !/^\s*(?:- )?name:/.test(line));
}

type Finding = { file: string; line: number; what: string };

/** Every breach of the seven rules in the given workflows. */
export function deadlineFindings(files: Array<{ file: string; text: string }>): Finding[] {
  const findings: Finding[] = [];
  for (const { file, text } of files) {
    for (const job of readWorkflow(file, text)) {
      if (!job.callsWorkflow && !job.timeout)
        findings.push({
          file,
          line: job.line,
          what: `job "${job.id}" declares no timeout-minutes`,
        });
      let reserved = false;
      for (const step of job.steps) {
        const commands = commandLines(step);
        if (commands.some((line) => line.includes(RESERVE))) reserved = true;
        const action = actionOf(step);
        if (action !== null && !step.timeout)
          findings.push({
            file,
            line: step.line,
            what: `a step that uses ${action} declares no timeout-minutes`,
          });
        else if (commands.some((line) => OUTSIDE.test(line)) && !step.timeout)
          findings.push({
            file,
            line: step.line,
            what: "a step that reaches outside declares no timeout-minutes",
          });
        for (const line of commands) {
          if (INSTALL.test(line) && !line.includes(WRAPPER))
            findings.push({
              file,
              line: step.line,
              what: `an install outside ${WRAPPER}: ${line.trim()}`,
            });
          const tries = triesOf(line);
          if (PACKAGE_INSTALL.test(line) && tries !== null && tries !== 1)
            findings.push({
              file,
              line: step.line,
              what: `a package install retried (${String(tries)} tries; it runs once): ${line.trim()}`,
            });
          if (BROWSER_DEPS_DIRECT.test(line))
            findings.push({
              file,
              line: step.line,
              what: `the browser's system libraries installed outside ${BROWSER_DEPS}: ${line.trim()}`,
            });
        }
        if (commands.some((line) => /\bsupabase start\b/.test(line)) && !reserved)
          findings.push({
            file,
            line: step.line,
            what: "the backend starts before its ports are reserved",
          });
      }
    }
  }
  return findings;
}

const workflows = walkFiles([".github/workflows"], { ext: ["yml"] }).map((file) => ({
  file,
  text: readFileSync(file, "utf8"),
}));

describe("every CI job and every outside call carries a deadline (INC-935)", () => {
  it("CF-CID-1 every workflow's jobs, actions, outside calls, installs and backend starts keep the seven rules", () => {
    const jobs = workflows.flatMap(({ file, text }) => readWorkflow(file, text));
    const outside = jobs
      .flatMap((job) => job.steps)
      .filter((step) => commandLines(step).some((line) => OUTSIDE.test(line)));
    console.log(
      `[ci-deadlines] workflows: ${workflows.length}; jobs: ${jobs.length}; steps reaching outside: ${outside.length}`,
    );
    expect(workflows.map(({ file }) => basename(file))).toContain("local-backend-proof.yml");
    expect(jobs.length).toBeGreaterThan(20);
    expect(outside.length).toBeGreaterThan(10);
    expect(report(deadlineFindings(workflows))).toBe("");
  });

  it("CF-CID-2 a planted workflow's nine breaches are named and its kept steps are not", () => {
    const dir = "node_modules/.cache/ci-deadlines";
    mkdirSync(dir, { recursive: true });
    const file = `${dir}/planted.yml`;
    try {
      writeFileSync(
        file,
        [
          "name: planted",
          "on: push",
          "jobs:",
          "  caller:",
          "    uses: ./.github/workflows/other.yml",
          "  kept:",
          "    runs-on: ubuntu-24.04",
          "    timeout-minutes: 10",
          "    steps:",
          "      - name: Reserve",
          "        timeout-minutes: 1",
          `        run: sudo sysctl -w ${RESERVE}`,
          "      - name: Install dependencies",
          "        timeout-minutes: 12",
          `        run: bash ${WRAPPER} 300 2 -- bun install --frozen-lockfile`,
          "      - name: Start",
          "        timeout-minutes: 15",
          "        run: supabase start",
          "      - name: Install the system libraries once",
          "        timeout-minutes: 27",
          `        run: bash ${WRAPPER} 1500 1 -- bash ${BROWSER_DEPS}`,
          "  bare:",
          "    runs-on: ubuntu-24.04",
          "    steps:",
          "      - name: Install dependencies",
          "        run: bun install --frozen-lockfile",
          "      - name: Start",
          "        timeout-minutes: 15",
          "        run: |",
          "          # bun install is named in a comment only",
          "          supabase start",
          "      - name: Install the browser and its libraries twice",
          "        timeout-minutes: 12",
          `        run: bash ${WRAPPER} 300 2 -- bunx playwright install --with-deps chromium`,
          "  actions:",
          "    runs-on: ubuntu-24.04",
          "    timeout-minutes: 10",
          "    steps:",
          "      - uses: actions/checkout@v5",
          "      - name: Setup kept",
          "        timeout-minutes: 5",
          "        uses: oven-sh/setup-bun@v2",
          "      - name: Python packages",
          "        timeout-minutes: 5",
          "        run: pip install semgrep",
          "      - name: Rules kept",
          "        timeout-minutes: 5",
          `        run: bash ${WRAPPER} 300 2 -- git -C /tmp/rules fetch --depth 1 origin main`,
          "      - name: Push",
          "        run: git -C /tmp/rules push origin HEAD:main",
          "",
        ].join("\n"),
      );
      const text = readFileSync(file, "utf8");
      expect(report(deadlineFindings([{ file, text }]))).toBe(
        [
          `${file}:22 job "bare" declares no timeout-minutes`,
          `${file}:25 a step that reaches outside declares no timeout-minutes`,
          `${file}:25 an install outside ${WRAPPER}: run: bun install --frozen-lockfile`,
          `${file}:27 the backend starts before its ports are reserved`,
          `${file}:32 a package install retried (2 tries; it runs once): run: bash ${WRAPPER} 300 2 -- bunx playwright install --with-deps chromium`,
          `${file}:32 the browser's system libraries installed outside ${BROWSER_DEPS}: run: bash ${WRAPPER} 300 2 -- bunx playwright install --with-deps chromium`,
          `${file}:39 a step that uses actions/checkout@v5 declares no timeout-minutes`,
          `${file}:43 an install outside ${WRAPPER}: run: pip install semgrep`,
          `${file}:49 a step that reaches outside declares no timeout-minutes`,
        ].join("\n"),
      );
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});

/**
 * DEC-321 (housekeeping turn 3) — EVERY EVIDENCE PUBLICATION NAMES ITS REF. scripts/publish-evidence.sh
 * files a run's evidence under the ref the run tested and refuses to publish without one, so every
 * workflow step that calls it sets `EVIDENCE_REF` in its own `env:` (from the event's context, never
 * typed inline in the script).
 */
export function publishRefFindings(files: Array<{ file: string; text: string }>): Finding[] {
  const findings: Finding[] = [];
  for (const { file, text } of files)
    for (const job of readWorkflow(file, text))
      for (const step of job.steps) {
        if (!commandLines(step).some((line) => line.includes("scripts/publish-evidence.sh")))
          continue;
        if (!/^ {10}EVIDENCE_REF: \$\{\{ .+ \}\}$/m.test(step.text))
          findings.push({
            file,
            line: step.line,
            what: "a step publishes evidence without EVIDENCE_REF in its env (DEC-321)",
          });
      }
  return findings;
}

describe("every evidence publication names its ref (DEC-321)", () => {
  it("CF-CID-5 every step that calls publish-evidence.sh sets EVIDENCE_REF; six publish, one reads a path", () => {
    const calls = workflows
      .flatMap(({ file, text }) => readWorkflow(file, text))
      .flatMap((job) => job.steps)
      .filter((step) =>
        commandLines(step).some((line) => line.includes("scripts/publish-evidence.sh")),
      );
    const pathReads = calls.filter((step) =>
      commandLines(step).some(
        (line) => line.includes("scripts/publish-evidence.sh") && line.includes("--print-path"),
      ),
    );
    expect(calls).toHaveLength(7);
    expect(pathReads.map((step) => /- name: (.+)/.exec(step.text)?.[1])).toEqual(["Verdict"]);
    expect(report(publishRefFindings(workflows))).toBe("");
  });

  it("CF-CID-6 a planted publication without its ref is named", () => {
    const text = [
      "jobs:",
      "  kept:",
      "    steps:",
      "      - name: Publish",
      "        env:",
      "          EVIDENCE_REF: ${{ github.head_ref || github.ref_name }}",
      "        run: bash scripts/publish-evidence.sh m docs/tracking/a.md",
      "  bare:",
      "    steps:",
      "      - name: Publish",
      "        run: bash scripts/publish-evidence.sh m docs/tracking/a.md",
      "",
    ].join("\n");
    expect(report(publishRefFindings([{ file: "planted.yml", text }]))).toBe(
      "planted.yml:10 a step publishes evidence without EVIDENCE_REF in its env (DEC-321)",
    );
  });
});

/**
 * DEC-369 (housekeeping turn 3c, INC-1108) — THE MAINTENANCE PASS HAS AN OWNER ON EVERY BACKEND.
 * e2e/global-setup.ts runs the pass (reaper, prune, storage sweeps, tripwire) only for the run that
 * carries `E2E_MAINTENANCE=1`. Two steps set it, each in its own `env:`: the nightly's first
 * Playwright run (ethio-staging; its serial run does not) and the lanes' proof step, for lane 1
 * alone (its temporary backend). An owner without the line, or the variable set anywhere else, is
 * a breach.
 */
export const MAINTENANCE_OWNERS = [
  {
    file: "nightly-e2e.yml",
    step: "Run nightly E2E (real-elapsed-time cases)",
    value: '"1"',
  },
  {
    file: "local-backend-proof.yml",
    step: "Run proof lane",
    value: "${{ matrix.lane == '1' && '1' || '' }}",
  },
] as const;

export function maintenanceOwnerFindings(files: Array<{ file: string; text: string }>): Finding[] {
  const findings: Finding[] = [];
  for (const { file, text } of files) {
    const owners = MAINTENANCE_OWNERS.filter((o) => o.file === basename(file));
    const sets = text.split("\n").filter((l) => /E2E_MAINTENANCE/.test(l) && !/^\s*#/.test(l));
    let kept = 0;
    const seen = new Set<string>();
    for (const job of readWorkflow(file, text))
      for (const step of job.steps) {
        const owner = owners.find((o) => /- name: (.+)/.exec(step.text)?.[1] === o.step);
        if (owner === undefined) continue;
        seen.add(owner.step);
        if (step.text.split("\n").includes(`          E2E_MAINTENANCE: ${owner.value}`)) kept += 1;
        else
          findings.push({
            file,
            line: step.line,
            what: `the maintenance owner's step does not set E2E_MAINTENANCE: ${owner.value} in its env (DEC-369)`,
          });
      }
    for (const owner of owners)
      if (!seen.has(owner.step))
        findings.push({
          file,
          line: 0,
          what: `the maintenance owner's step "${owner.step}" is gone (DEC-369)`,
        });
    if (sets.length > kept)
      findings.push({
        file,
        line: 0,
        what: `E2E_MAINTENANCE is set outside its owner's step (${sets.length - kept}) (DEC-369)`,
      });
  }
  return findings;
}

describe("the maintenance pass has an owner on every backend (DEC-369)", () => {
  it("CF-CID-7 the nightly's first Playwright run and lane 1's proof step set E2E_MAINTENANCE, and nothing else does", () => {
    expect(report(maintenanceOwnerFindings(workflows))).toBe("");
    for (const owner of MAINTENANCE_OWNERS)
      expect(workflows.map((w) => basename(w.file))).toContain(owner.file);
    // Planted breaches, one for each owner: its line removed; and the mark set on a third step.
    for (const owner of MAINTENANCE_OWNERS) {
      const real = workflows.find((w) => basename(w.file) === owner.file);
      expect(real).toBeDefined();
      if (real === undefined) continue;
      const line = `          E2E_MAINTENANCE: ${owner.value}\n`;
      expect(real.text).toContain(line);
      const bare = real.text.replace(line, "");
      expect(report(maintenanceOwnerFindings([{ file: real.file, text: bare }]))).toMatch(
        /the maintenance owner's step does not set E2E_MAINTENANCE: .+ in its env \(DEC-369\)$/,
      );
    }
    const third = [
      "jobs:",
      "  other:",
      "    steps:",
      "      - name: Run something",
      "        env:",
      '          E2E_MAINTENANCE: "1"',
      "        run: bunx playwright test",
      "",
    ].join("\n");
    expect(report(maintenanceOwnerFindings([{ file: "planted.yml", text: third }]))).toBe(
      "planted.yml:0 E2E_MAINTENANCE is set outside its owner's step (1) (DEC-369)",
    );
  });
});

/**
 * DEC-371 (the pictures turn) — EVERY BROWSER A JOB'S PLAYWRIGHT PROJECTS RUN ON IS INSTALLED IN THAT
 * JOB: the browser (`playwright install <browsers>`) and its system libraries (install-browser-deps.sh
 * <browsers>, chromium when it names none). A job's projects are every `--project=` it names (a
 * variable's assignment included) and, for a run that names none, every project; a run on another
 * config file (`-c`) is that config's own. A `$NAME` argument is read through its assignments in the
 * job, so a lane's browser list counts every value it can take. Each project's engine comes from the
 * one reader, the browser guard's `enginesOf` (playwright.config.ts).
 */
const PROJECT_ENGINE = new Map(
  [...enginesOf(playwrightConfig.projects ?? [])].flatMap(([engine, names]) =>
    names.map((name) => [name, engine] as const),
  ),
);

/** The words an argument stands for: itself, or every value its `$NAME` is assigned in the job. */
function wordsOf(token: string, lines: string[], depth = 0): string[] {
  const bare = token.replace(/["';{}]/g, "");
  const variable = /^\$\{?([A-Za-z_][A-Za-z0-9_]*)(?::-)?\}?$/.exec(bare);
  if (variable === null) return /^[a-z]+$/.test(bare) ? [bare] : [];
  if (depth > 3) return [];
  const assigned = new RegExp(`(?:^|[\\s"'])${variable[1] ?? ""}=("[^"]*"|\\S+)`, "g");
  return lines.flatMap((line) =>
    [...line.matchAll(assigned)].flatMap((m) =>
      (m[1] ?? "")
        .replace(/^"|"$/g, "")
        .split(/\s+/)
        .flatMap((word) => wordsOf(word, lines, depth + 1)),
    ),
  );
}

/** The browsers a command line installs after `marker`, each argument read through wordsOf. */
function installedAfter(marker: RegExp, line: string, lines: string[]): string[] | null {
  const at = marker.exec(line);
  if (at === null) return null;
  const rest = line.slice(at.index + at[0].length).split(/\s+(?:&&|\|\||;|\|)\s+/)[0] ?? "";
  return rest
    .split(/\s+/)
    .filter(Boolean)
    .flatMap((token) => wordsOf(token, lines));
}

export function browserInstallFindings(
  files: Array<{ file: string; text: string }>,
  projectEngine: ReadonlyMap<string, string> = PROJECT_ENGINE,
): Finding[] {
  const findings: Finding[] = [];
  for (const { file, text } of files)
    for (const job of readWorkflow(file, text)) {
      const lines = job.steps.flatMap(commandLines);
      const runs = lines.filter(
        (line) => /\bplaywright test\b/.test(line) && !/\s(?:-c|--config)[\s=]/.test(line),
      );
      if (runs.length === 0) continue;
      const named = lines.flatMap((line) =>
        [...line.matchAll(/--project=([A-Za-z0-9_-]+)/g)].map((m) => m[1] ?? ""),
      );
      const everyProject = runs.some((line) => !/--project[= ]/.test(line));
      const projects = new Set(everyProject ? [...named, ...projectEngine.keys()] : named);
      const browsers = new Set<string>();
      const libraries = new Set<string>();
      for (const line of lines) {
        for (const b of installedAfter(/\bplaywright install(?!-deps)\b/, line, lines) ?? [])
          browsers.add(b);
        const deps = installedAfter(/install-browser-deps\.sh\b/, line, lines);
        if (deps !== null) for (const b of deps.length > 0 ? deps : ["chromium"]) libraries.add(b);
      }
      const engines = new Map<string, string[]>();
      for (const project of projects) {
        const engine = projectEngine.get(project);
        if (engine !== undefined) engines.set(engine, [...(engines.get(engine) ?? []), project]);
      }
      for (const [engine, users] of engines) {
        const by = users.join(", ");
        if (!browsers.has(engine))
          findings.push({
            file,
            line: job.line,
            what: `job "${job.id}" runs ${by} on ${engine} and installs no ${engine} browser (DEC-371)`,
          });
        if (!libraries.has(engine))
          findings.push({
            file,
            line: job.line,
            what: `job "${job.id}" runs ${by} on ${engine} and installs no ${engine} system libraries through ${BROWSER_DEPS} (DEC-371)`,
          });
      }
    }
  return findings;
}

describe("every browser a job's projects run on is installed in that job (DEC-371)", () => {
  const LANES = ".github/workflows/local-backend-proof.yml";
  it("CF-CID-8 every workflow installs each engine its Playwright runs use; the lanes install WebKit for the WebKit pair", () => {
    expect([...new Set(PROJECT_ENGINE.values())].sort()).toEqual(["chromium", "webkit"]);
    expect(report(browserInstallFindings(workflows))).toBe("");
    const lanes = workflows.find((w) => w.file === LANES);
    expect(lanes).toBeDefined();
    if (lanes === undefined) return;
    // Planted: the lanes' browser list without webkit.
    const noWebkit = lanes.text
      .replace("then browsers=webkit; fi", "then browsers=chromium; fi")
      .replace('browsers="chromium webkit"', "browsers=chromium");
    expect(noWebkit).not.toBe(lanes.text);
    const proof = readWorkflow(LANES, lanes.text).find((job) => job.id === "proof");
    expect(proof).toBeDefined();
    const at = `${LANES}:${String(proof?.line ?? 0)} job "proof" runs`;
    expect(report(browserInstallFindings([{ file: LANES, text: noWebkit }]))).toBe(
      [
        `${at} webkit-1280, webkit-390 on webkit and installs no webkit browser (DEC-371)`,
        `${at} webkit-1280, webkit-390 on webkit and installs no webkit system libraries through ${BROWSER_DEPS} (DEC-371)`,
      ].join("\n"),
    );
    // Planted: the system libraries' line without the list (chromium alone).
    const bareDeps = lanes.text.replace(
      "install-browser-deps.sh $PROOF_BROWSERS",
      "install-browser-deps.sh",
    );
    expect(bareDeps).not.toBe(lanes.text);
    expect(report(browserInstallFindings([{ file: LANES, text: bareDeps }]))).toBe(
      `${at} webkit-1280, webkit-390 on webkit and installs no webkit system libraries through ${BROWSER_DEPS} (DEC-371)`,
    );
  });

  it("CF-CID-9 a planted job running a WebKit project on a Chromium install is named; its kept twin and another config's run are not", () => {
    const job = (id: string, deps: string, browsers: string, run: string) => [
      `  ${id}:`,
      "    steps:",
      "      - name: Libraries",
      `        run: bash ${WRAPPER} 1500 1 -- bash ${BROWSER_DEPS}${deps}`,
      "      - name: Browsers",
      `        run: bash ${WRAPPER} 900 2 -- bunx playwright install${browsers}`,
      "      - name: Run",
      `        run: ${run}`,
    ];
    const text = [
      "jobs:",
      ...job("bare", "", " chromium", "bunx playwright test --project=webkit-390 e2e/a.spec.ts"),
      ...job(
        "kept",
        " chromium webkit",
        " chromium webkit",
        "bunx playwright test --project=webkit-390",
      ),
      ...job("nightly", "", " chromium", "bunx playwright test -c playwright.nightly.config.ts"),
      ...job("all", "", " chromium", "bunx playwright test e2e/a.spec.ts"),
      "",
    ].join("\n");
    expect(report(browserInstallFindings([{ file: "planted.yml", text }]))).toBe(
      [
        'planted.yml:2 job "bare" runs webkit-390 on webkit and installs no webkit browser (DEC-371)',
        `planted.yml:2 job "bare" runs webkit-390 on webkit and installs no webkit system libraries through ${BROWSER_DEPS} (DEC-371)`,
        'planted.yml:26 job "all" runs webkit-1280, webkit-390 on webkit and installs no webkit browser (DEC-371)',
        `planted.yml:26 job "all" runs webkit-1280, webkit-390 on webkit and installs no webkit system libraries through ${BROWSER_DEPS} (DEC-371)`,
      ].join("\n"),
    );
  });
});

/**
 * DEC-284 (INC-991) — THE TEMPORARY BACKEND'S PORTS SIT BELOW THE EPHEMERAL RANGE. Lane 3 of run
 * 40854479197 lost its start to a connection the runner opened on 54324 at job start, before the
 * reservation step could run (INC-935's class). Every `port`/`shadow_port` the CI-local config
 * declares lies in 31320–31329, below Linux's ephemeral range (32768–60999).
 */
export const BACKEND_PORT_BLOCK = { low: 31320, high: 31329 } as const;
const PORT_LINE = /^\s*(?:shadow_)?port\s*=\s*(\d+)\s*$/;

/** Every config port outside the block, with its line. */
export function portBlockFindings(file: string, text: string): string[] {
  const out: string[] = [];
  text.split("\n").forEach((line, i) => {
    const m = PORT_LINE.exec(line);
    if (!m) return;
    const port = Number(m[1]);
    if (port < BACKEND_PORT_BLOCK.low || port > BACKEND_PORT_BLOCK.high)
      out.push(`${file}:${i + 1} backend port ${port} outside 31320-31329 (DEC-284)`);
  });
  return out;
}

describe("the temporary backend's ports sit below the ephemeral range (DEC-284)", () => {
  // DEC-309 (turn CI-3a): the CI-local config left the workflow's heredoc for one file, which the
  // lanes copy and the backend-images job hashes. G38: the same four-port assertion, on that file.
  const PROOF = "scripts/ci/local-backend-config.toml";
  it("CF-CID-3 every port the CI-local config declares is in 31320-31329, and there are four", () => {
    const text = readFileSync(PROOF, "utf8");
    expect(portBlockFindings(PROOF, text)).toEqual([]);
    expect(text.split("\n").filter((l) => PORT_LINE.test(l))).toHaveLength(4);
  });
  it("CF-CID-4 a planted ephemeral-range port is named", () => {
    expect(portBlockFindings("x.yml", "[db]\nport = 31322\nshadow_port = 54320\n")).toEqual([
      "x.yml:3 backend port 54320 outside 31320-31329 (DEC-284)",
    ]);
  });
});
