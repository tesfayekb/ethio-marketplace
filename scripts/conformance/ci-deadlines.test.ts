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
 */

import { readWorkflow, type Step } from "./workflow-reader";

export { readWorkflow };
export type { Job, Step } from "./workflow-reader";

/** A command line that reaches outside the runner. */
const OUTSIDE =
  /\b(?:bun install|playwright install|apt-get (?:update|install)|curl|wget|supabase start|pip install|git(?: -C \S+)? (?:clone|fetch|push|ls-remote))\b/;
/** A command line that installs or downloads, and so must run through the retrying deadline. */
const INSTALL =
  /\b(?:bun install|playwright install|apt-get (?:update|install)|pip install|git(?: -C \S+)? (?:clone|fetch))\b/;
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
  /\b(?:apt-get install|playwright install-deps|playwright install --with-deps)\b/;
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

/** Every breach of the six rules in the given workflows. */
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
  it("CF-CID-1 every workflow's jobs, actions, outside calls, installs and backend starts keep the six rules", () => {
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

  it("CF-CID-2 a planted workflow's eight breaches are named and its kept steps are not", () => {
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
          `        run: bash ${WRAPPER} 1500 1 -- bunx playwright install-deps chromium`,
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
