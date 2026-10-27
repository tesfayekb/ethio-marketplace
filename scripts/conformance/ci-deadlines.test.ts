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
 * 2026-10-24 → 10-26).
 */

export type Step = { line: number; text: string; timeout: boolean };
export type Job = {
  file: string;
  id: string;
  line: number;
  callsWorkflow: boolean;
  timeout: boolean;
  steps: Step[];
};

/** A workflow's jobs and their steps, read by indentation (two spaces a level, as every workflow here is written). */
export function readWorkflow(file: string, text: string): Job[] {
  const lines = text.split("\n");
  const jobs: Job[] = [];
  const start = lines.indexOf("jobs:");
  if (start < 0) return jobs;
  let job: Job | null = null;
  let step: Step | null = null;
  for (let index = start + 1; index < lines.length; index += 1) {
    const text = lines[index] ?? "";
    if (/^\S/.test(text)) break;
    const head = /^ {2}([A-Za-z0-9_-]+):\s*$/.exec(text);
    if (head) {
      job = {
        file,
        id: head[1] ?? "",
        line: index + 1,
        callsWorkflow: false,
        timeout: false,
        steps: [],
      };
      jobs.push(job);
      step = null;
      continue;
    }
    if (job === null) continue;
    if (/^ {4}timeout-minutes:\s*\d+\s*$/.test(text)) job.timeout = true;
    if (/^ {4}uses:\s*\S/.test(text)) job.callsWorkflow = true;
    if (/^ {6}- /.test(text)) {
      step = { line: index + 1, text: `${text}\n`, timeout: false };
      job.steps.push(step);
      continue;
    }
    if (/^ {0,5}\S/.test(text)) {
      step = null;
      continue;
    }
    if (step === null) continue;
    step.text += `${text}\n`;
    if (/^ {8}timeout-minutes:\s*\d+\s*$/.test(text)) step.timeout = true;
  }
  return jobs;
}

/** A command line that reaches outside the runner. */
const OUTSIDE =
  /\b(?:bun install|playwright install|apt-get (?:update|install)|curl|supabase start)\b/;
/** A command line that installs, and so must run through the retrying deadline. */
const INSTALL = /\b(?:bun install|playwright install|apt-get (?:update|install))\b/;
const WRAPPER = "scripts/ci/with-deadline.sh";
const RESERVE = "net.ipv4.ip_local_reserved_ports=54320-54329";

/** The command lines of a step: its run text without comments and without its name. */
function commandLines(step: Step): string[] {
  return step.text
    .split("\n")
    .filter((line) => !/^\s*#/.test(line) && !/^\s*(?:- )?name:/.test(line));
}

type Finding = { file: string; line: number; what: string };

/** Every breach of the four rules in the given workflows. */
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
        if (commands.some((line) => OUTSIDE.test(line)) && !step.timeout)
          findings.push({
            file,
            line: step.line,
            what: "a step that reaches outside declares no timeout-minutes",
          });
        for (const line of commands)
          if (INSTALL.test(line) && !line.includes(WRAPPER))
            findings.push({
              file,
              line: step.line,
              what: `an install outside ${WRAPPER}: ${line.trim()}`,
            });
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
  it("CF-CID-1 every workflow's jobs, outside calls, installs and backend starts keep the four rules", () => {
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

  it("CF-CID-2 a planted workflow's four breaches are named and its kept steps are not", () => {
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
          "",
        ].join("\n"),
      );
      const text = readFileSync(file, "utf8");
      expect(report(deadlineFindings([{ file, text }]))).toBe(
        [
          `${file}:19 job "bare" declares no timeout-minutes`,
          `${file}:22 a step that reaches outside declares no timeout-minutes`,
          `${file}:22 an install outside ${WRAPPER}: run: bun install --frozen-lockfile`,
          `${file}:24 the backend starts before its ports are reserved`,
        ].join("\n"),
      );
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
