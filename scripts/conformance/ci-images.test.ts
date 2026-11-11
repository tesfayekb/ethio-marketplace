import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { readWorkflow, type Job } from "./workflow-reader";
import { report, walkFiles } from "./kit";
import { cliPin, readCliPin } from "../ci/cli-pin";

/**
 * DEC-309 (Foundations turn CI-3a) — CF-CI-IMG-1: THE BACKEND IMAGES ARE LOCAL BEFORE THE ONE START.
 * By definition, over every workflow file: a job that runs `supabase start` (other than the
 * `backend-images` job itself, the mechanism, whose start runs on an empty working copy with no
 * migration) must
 *   1. need `backend-images`;
 *   2. load and inspect the images (`docker load` and `docker image inspect`) in a step before the start;
 *   3. run `supabase start` once, outside any `for`/`until`/`while` loop — a start is never retried.
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
        findings.push({
          file,
          line: job.line,
          what: `job "${job.id}" starts the backend without needing ${MECHANISM}`,
        });
      const loaded = job.steps
        .slice(0, startIndex)
        .some((s) => /\bdocker load\b/.test(s.text) && /\bdocker image inspect\b/.test(s.text));
      if (!loaded)
        findings.push({
          file,
          line: startStep.line,
          what: `job "${job.id}" starts the backend before loading and inspecting its images`,
        });
      const starts = job.steps.reduce(
        (n, s) => n + commands(s.text).filter((l) => /\bsupabase start\b/.test(l)).length,
        0,
      );
      if (starts > 1)
        findings.push({
          file,
          line: startStep.line,
          what: `job "${job.id}" runs supabase start ${String(starts)} times`,
        });
      for (const s of job.steps)
        if (startsInLoop(s.text) > 0)
          findings.push({
            file,
            line: s.line,
            what: `job "${job.id}" retries supabase start in a loop`,
          });
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
const LOAD =
  "      - name: load\n        run: |\n          gunzip -c x | docker load\n          docker image inspect a\n";
const START = "      - name: start\n        run: |\n          supabase start --workdir .ci-local\n";

describe("the backend images are local before the one start (DEC-309)", () => {
  it("CF-CI-IMG-1 every job that starts the backend needs backend-images, loads first and starts once", () => {
    const starting = workflows
      .flatMap(({ file, text }) => readWorkflow(file, text).map((j) => ({ file, j })))
      .filter(
        ({ j }) => j.id !== MECHANISM && j.steps.some((s) => /\bsupabase start\b/.test(s.text)),
      );
    console.log(
      `[ci-images] jobs starting the backend: ${starting.map(({ file, j }) => `${file}:${String(j.line)} ${j.id}`).join(", ")}`,
    );
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
    expect(
      imageFindings([{ file: "p.yml", text: planted(LOAD + START, "") }]).map((x) => x.what),
    ).toEqual(['job "lane" starts the backend without needing backend-images']);
    expect(
      imageFindings([{ file: "p.yml", text: planted(LOAD + START + START) }]).map((x) => x.what),
    ).toEqual(['job "lane" runs supabase start 2 times']);
    expect(imageFindings([{ file: "p.yml", text: planted(LOAD + START) }])).toEqual([]);
  });
});

/**
 * Housekeeping turn 3 (concern 5b, ruling 1 Q15) — THE CLI VERSION IS PINNED ONCE. The lanes'
 * workflow declares `SUPABASE_CLI_VERSION` at the top; both setup-cli steps and the lane evidence
 * read it, so the version's literal appears in the file exactly once.
 */
const LANES = ".github/workflows/local-backend-proof.yml";

/** The lines after the pin that restate its value. */
export function pinRestatements(file: string, text: string): Finding[] {
  const value = cliPin(text);
  if (value === null) return [{ file, line: 0, what: "no top-level SUPABASE_CLI_VERSION pin" }];
  return text
    .split("\n")
    .flatMap((line, index) =>
      line.includes(value) && cliPin(line) !== value
        ? [{ file, line: index + 1, what: `restates the CLI version ${value}` }]
        : [],
    );
}

/**
 * INC-1106 (housekeeping turn 3, ruling 2) — THE CLI PIN HAS ONE READER. A file that reads the pin by
 * a pattern of its own — the holder's path, the `SUPABASE_CLI_VERSION:` line or a setup-cli
 * `version:` line, in a regex or a sed — is scripts/ci/cli-pin.ts, or imports it (TypeScript) or
 * calls it (shell). No allowlist: a second reader has no reason.
 */
const PIN_READS: Array<[RegExp, string]> = [
  [/local-backend-proof\\\.yml/, "the pin's workflow path in a regex"],
  [/SUPABASE_CLI_VERSION: ?[(*)\\[/.]/, "the SUPABASE_CLI_VERSION line in a regex or a sed"],
  [/version: *\(?\\[ds]/, "a setup-cli version line in a regex"],
];
const PIN_MODULE = "scripts/ci/cli-pin.ts";

export function pinReaderFindings(files: Array<{ file: string; text: string }>): Finding[] {
  const findings: Finding[] = [];
  for (const { file, text } of files) {
    if (file === PIN_MODULE) continue;
    const usesModule =
      /from ["'][./\w-]*\/cli-pin(?:\.ts)?["']/.test(text) || text.includes(PIN_MODULE);
    if (usesModule) continue;
    text.split("\n").forEach((line, index) => {
      for (const [form, what] of PIN_READS)
        if (form.test(line))
          findings.push({ file, line: index + 1, what: `${what}, outside ${PIN_MODULE}` });
    });
  }
  return findings;
}

describe("the CLI version is pinned once (housekeeping turn 3)", () => {
  it("CF-CI-IMG-5 the version's literal appears once; a planted second literal is named", () => {
    const text = readFileSync(LANES, "utf8");
    expect(report(pinRestatements(LANES, text))).toBe("");
    const pinned = "env:\n  SUPABASE_CLI_VERSION: 2.120.0\njobs:\n  a:\n    steps:\n";
    expect(
      report(pinRestatements("p.yml", `${pinned}      - with:\n          version: 2.120.0\n`)),
    ).toBe("p.yml:7 restates the CLI version 2.120.0");
    expect(
      pinRestatements(
        "p.yml",
        `${pinned}      - with:\n          version: \${{ env.SUPABASE_CLI_VERSION }}\n`,
      ),
    ).toEqual([]);
  });

  it("CF-CI-IMG-6 the one reader reads the real pin, and the outbound-calls guard reads it there", () => {
    const pin = readCliPin();
    expect(pin).toMatch(/^\d+\.\d+\.\d+$/);
    expect(pin).toBe(cliPin(readFileSync(LANES, "utf8")));
    expect(
      cliPin(
        "env:\n  OTHER: 1\njobs:\n  a:\n    steps:\n      - with:\n          version: 2.120.0\n",
      ),
    ).toBeNull();
    const dir = mkdtempSync(join(tmpdir(), "cli-pin-"));
    try {
      const catalogue = join(dir, "catalogue.tsv");
      const config = join(dir, "config.toml");
      writeFileSync(catalogue, "public.job_call(text)\tt\nsupabase_functions.http_request()\tt\n");
      writeFileSync(config, '[api]\nschemas = ["public"]\n');
      const run = spawnSync("bun", ["scripts/check-outbound-calls.ts", catalogue, config], {
        encoding: "utf8",
        timeout: 20_000,
      });
      expect(run.stderr).not.toContain("the CLI pin is unreadable");
      expect(run.status, run.stderr).toBe(0);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("CF-CI-IMG-7 no file reads the pin but through scripts/ci/cli-pin.ts; planted readers are named", () => {
    const files = walkFiles(["scripts", "e2e", "src"], {
      ext: ["ts", "tsx", "mts", "mjs", "js", "cjs", "sh", "py"],
    }).map((file) => ({ file, text: readFileSync(file, "utf8") }));
    expect(files.some(({ file }) => file === PIN_MODULE)).toBe(true);
    expect(report(pinReaderFindings(files))).toBe("");
    const regex = "const v = /^ {2}SUPABASE_CLI_VERSION: (\\S+)$/m.exec(text)?.[1];\n";
    const sed = "version=$(sed -n 's/^  SUPABASE_CLI_VERSION: *//p' \"$WORKFLOW\")\n";
    const form = "const v = /^\\s*version: (\\d+\\.\\d+\\.\\d+)$/m.exec(text)?.[1];\n";
    const path = "const lanes = /local-backend-proof\\.yml$/;\n";
    expect(
      pinReaderFindings([
        { file: "scripts/a.ts", text: regex },
        { file: "scripts/b.sh", text: sed },
        { file: "scripts/c.ts", text: form },
        { file: "scripts/d.ts", text: path },
      ]).map((f) => `${f.file}:${String(f.line)}`),
    ).toEqual(["scripts/a.ts:1", "scripts/b.sh:1", "scripts/c.ts:1", "scripts/d.ts:1"]);
    expect(
      pinReaderFindings([
        { file: "scripts/a.ts", text: `import { cliPin } from "./ci/cli-pin";\n${regex}` },
        { file: "scripts/b.sh", text: `bun -e 'import "./scripts/ci/cli-pin.ts"'\n${sed}` },
        { file: "scripts/e.ts", text: "env: { SUPABASE_CLI_VERSION: pin }\n" },
      ]),
    ).toEqual([]);
  });
});
