import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { readWorkflow, type Job } from "./ci-deadlines.test";
import { report, walkFiles } from "./kit";

/**
 * DEC-309 (Foundations turn CI-3a) — CF-CI-IMG-1: THE BACKEND IMAGES ARE LOCAL BEFORE THE ONE START.
 * By definition, over every workflow file: a job that runs `supabase start` (other than the
 * `backend-images` job itself, the mechanism, whose start runs on an empty working copy with no
 * migration) must
 *   1. need `backend-images`;
 *   2. load and inspect the images (`docker load` and `docker image inspect`) in a step before the start;
 *   3. run `supabase start` once, outside any `for`/`until`/`while` loop — a start is never retried
 *      into migrations that already ran ("refused:replay").
 * The workflow reader is CF-CID-1's (scripts/conformance/ci-deadlines.test.ts), K1.
 */

const MECHANISM = "backend-images";
type Finding = { file: string; line: number; what: string };

function commands(text: string): string[] {
  return text.split("\n").filter((l) => !/^\s*#/.test(l) && !/^\s*(?:- )?name:/.test(l));
}

/** Whether the job's own block declares `needs:` naming the mechanism. */
function needsMechanism(file: string, text: string, job: Job): boolean {
  const lines = text.split("\n");
  for (let i = job.line; i < lines.length; i += 1) {
    const line = lines[i] ?? "";
    if (/^ {2}\S/.test(line) || /^\S/.test(line)) break;
    const m = /^ {4}needs:\s*(.*)$/.exec(line);
    if (m) return new RegExp(`\\b${MECHANISM}\\b`).test(m[1] ?? "");
  }
  return false;
}

/** The `supabase start` lines of a step that sit inside a shell loop. */
function startsInLoop(stepText: string): number {
  let depth = 0;
  let found = 0;
  for (const raw of commands(stepText)) {
    const line = raw.trim();
    if (/^(?:for|until|while)\b.*\bdo\b/.test(line) || /^(?:for|until|while)\b/.test(line))
      depth += 1;
    if (/\bsupabase start\b/.test(line) && (depth > 0 || /^(?:for|until|while)\b/.test(line)))
      found += 1;
    if (/(?:^|;\s*)done\b/.test(line)) depth = Math.max(0, depth - 1);
  }
  return found;
}

export function imageFindings(files: Array<{ file: string; text: string }>): Finding[] {
  const findings: Finding[] = [];
  for (const { file, text } of files) {
    for (const job of readWorkflow(file, text)) {
      if (job.id === MECHANISM) continue;
      const startIndex = job.steps.findIndex((s) =>
        commands(s.text).some((l) => /\bsupabase start\b/.test(l)),
      );
      if (startIndex < 0) continue;
      const startStep = job.steps[startIndex];
      if (!startStep) continue;
      if (!needsMechanism(file, text, job))
        findings.push({ file, line: job.line, what: `job "${job.id}" starts the backend without needing ${MECHANISM}` });
      const loaded = job.steps
        .slice(0, startIndex)
        .some((s) => /\bdocker load\b/.test(s.text) && /\bdocker image inspect\b/.test(s.text));
      if (!loaded)
        findings.push({ file, line: startStep.line, what: `job "${job.id}" starts the backend before loading and inspecting its images` });
      const starts = job.steps.reduce(
        (n, s) => n + commands(s.text).filter((l) => /\bsupabase start\b/.test(l)).length,
        0,
      );
      if (starts > 1)
        findings.push({ file, line: startStep.line, what: `job "${job.id}" runs supabase start ${String(starts)} times` });
      for (const s of job.steps)
        if (startsInLoop(s.text) > 0)
          findings.push({ file, line: s.line, what: `job "${job.id}" retries supabase start in a loop` });
    }
  }
  return findings;
}

const workflows = walkFiles([".github/workflows"], { ext: ["yml"] }).map((file) => ({
  file,
  text: readFileSync(file, "utf8"),
}));

const planted = (steps: string, needs = "    needs: backend-images\n") =>
  `name: planted\non: push\njobs:\n  lane:\n    runs-on: ubuntu-24.04\n${needs}    timeout-minutes: 5\n    steps:\n${steps}`;
const LOAD = "      - name: load\n        run: |\n          gunzip -c x | docker load\n          docker image inspect a\n";
const START = "      - name: start\n        run: |\n          supabase start --workdir .ci-local\n";

describe("the backend images are local before the one start (DEC-309)", () => {
  it("CF-CI-IMG-1 every job that starts the backend needs backend-images, loads first and starts once", () => {
    const starting = workflows
      .flatMap(({ file, text }) => readWorkflow(file, text).map((j) => ({ file, j })))
      .filter(({ j }) => j.id !== MECHANISM && j.steps.some((s) => /\bsupabase start\b/.test(s.text)));
    console.log(`[ci-images] jobs starting the backend: ${starting.map(({ file, j }) => `${file}:${String(j.line)} ${j.id}`).join(", ")}`);
    expect(starting.length).toBeGreaterThan(0);
    expect(report(imageFindings(workflows))).toBe("");
  });

  it("CF-CI-IMG-2 planted: a job without the load step fails", () => {
    const f = imageFindings([{ file: "planted.yml", text: planted(START) }]);
    expect(f.map((x) => x.what)).toEqual([
      'job "lane" starts the backend before loading and inspecting its images',
    ]);
  });

  it("CF-CI-IMG-3 planted: a start inside until or for fails", () => {
    const until = `      - name: start\n        run: |\n          until supabase start --workdir .ci-local; do sleep 5; done\n`;
    const forLoop = `      - name: start\n        run: |\n          for t in 1 2; do\n            supabase start --workdir .ci-local && break\n          done\n`;
    for (const step of [until, forLoop]) {
      const f = imageFindings([{ file: "planted.yml", text: planted(LOAD + step) }]);
      expect(f.map((x) => x.what)).toEqual(['job "lane" retries supabase start in a loop']);
    }
  });

  it("CF-CI-IMG-4 planted: no need on backend-images, or two starts, fail; the kept shape passes", () => {
    expect(imageFindings([{ file: "p.yml", text: planted(LOAD + START, "") }]).map((x) => x.what)).toEqual([
      'job "lane" starts the backend without needing backend-images',
    ]);
    expect(imageFindings([{ file: "p.yml", text: planted(LOAD + START + START) }]).map((x) => x.what)).toEqual([
      'job "lane" runs supabase start 2 times',
    ]);
    expect(imageFindings([{ file: "p.yml", text: planted(LOAD + START) }])).toEqual([]);
  });
});
