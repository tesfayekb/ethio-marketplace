/**
 * DEC-375 (b), the speed turn — THE LANE PLAN'S WEIGHTS. Offline: it reads a folder of one green
 * run's lane results (`gh run download <run> -p 'e2e-results-*' -D <folder>`), lanes 1 → 16 only
 * (each ran its tests at one worker), and writes `scripts/ci/lane-weights.json`: per spec file (its
 * path under e2e/, as Playwright names it) and Chromium project, the seconds every attempt took and
 * the test count, with the run's id and its date. `scripts/ci/lane-plan.ts` reads it.
 *
 *   bun scripts/ci/lane-weights.ts <folder> --run <id>
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { errorText } from "../../src/lib/error-text";

export const WEIGHTS_FILE = "scripts/ci/lane-weights.json";
/** The projects lanes 1 → 16 run. */
export const LANE_PROJECTS = ["mobile-360", "desktop-1280"] as const;
export const NUMBERED_LANES = 16;

export type Weight = { seconds: number; tests: number };
export type Weights = {
  source: { run: number; date: string; lanes: string };
  files: Record<string, Record<string, Weight>>;
};

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function list(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

/** Every test of a results file as (file, project, milliseconds over its attempts). */
function testsOf(results: unknown): Array<{ file: string; project: string; ms: number }> {
  const out: Array<{ file: string; project: string; ms: number }> = [];
  const walk = (suite: unknown) => {
    if (!isObject(suite)) return;
    for (const spec of list(suite["specs"])) {
      if (!isObject(spec) || typeof spec["file"] !== "string") continue;
      for (const test of list(spec["tests"])) {
        if (!isObject(test) || typeof test["projectName"] !== "string") continue;
        let ms = 0;
        for (const attempt of list(test["results"]))
          if (isObject(attempt) && typeof attempt["duration"] === "number")
            ms += attempt["duration"];
        out.push({ file: spec["file"], project: test["projectName"], ms });
      }
    }
    for (const child of list(suite["suites"])) walk(child);
  };
  if (isObject(results)) for (const suite of list(results["suites"])) walk(suite);
  return out;
}

/** The weights of lanes 1 → 16's results files (one per lane), keyed by file then project. */
export function weightsFrom(results: unknown[], run: number): Weights {
  const files: Record<string, Record<string, Weight>> = {};
  let start = "";
  for (const one of results) {
    if (isObject(one) && isObject(one["stats"]) && typeof one["stats"]["startTime"] === "string") {
      const time = one["stats"]["startTime"];
      if (start === "" || time < start) start = time;
    }
    for (const { file, project, ms } of testsOf(one)) {
      if (!LANE_PROJECTS.some((name) => name === project)) continue;
      const byProject = (files[file] ??= {});
      const weight = (byProject[project] ??= { seconds: 0, tests: 0 });
      weight.seconds += ms / 1000;
      weight.tests += 1;
    }
  }
  const sorted: Record<string, Record<string, Weight>> = {};
  for (const file of Object.keys(files).sort()) {
    const byProject = files[file] ?? {};
    sorted[file] = {};
    for (const project of Object.keys(byProject).sort()) {
      const weight = byProject[project];
      if (weight === undefined) continue;
      sorted[file][project] = {
        seconds: Math.round(weight.seconds * 10) / 10,
        tests: weight.tests,
      };
    }
  }
  return { source: { run, date: start.slice(0, 10), lanes: "1-16" }, files: sorted };
}

/** The weights file's shape, or null. */
export function parseWeights(text: string): Weights | null {
  let value: unknown;
  try {
    value = JSON.parse(text);
  } catch {
    return null;
  }
  if (!isObject(value) || !isObject(value["source"]) || !isObject(value["files"])) return null;
  const { run, date, lanes } = value["source"];
  if (typeof run !== "number" || typeof date !== "string" || typeof lanes !== "string") return null;
  const files: Record<string, Record<string, Weight>> = {};
  for (const [file, byProject] of Object.entries(value["files"])) {
    if (!isObject(byProject)) return null;
    files[file] = {};
    for (const [project, weight] of Object.entries(byProject)) {
      if (!isObject(weight)) return null;
      const { seconds, tests } = weight;
      if (typeof seconds !== "number" || typeof tests !== "number") return null;
      files[file][project] = { seconds, tests };
    }
  }
  return { source: { run, date, lanes }, files };
}

if (import.meta.main) {
  const [folder] = process.argv.slice(2);
  const runAt = process.argv.indexOf("--run");
  const run = Number(runAt > 0 ? process.argv[runAt + 1] : "");
  if (!folder || folder.startsWith("--") || !Number.isInteger(run) || run <= 0) {
    console.error("usage: bun scripts/ci/lane-weights.ts <folder> --run <id>");
    process.exit(2);
  }
  const results: unknown[] = [];
  for (let lane = 1; lane <= NUMBERED_LANES; lane += 1) {
    const path = join(folder, `e2e-results-${String(lane)}`, "results.json");
    try {
      results.push(JSON.parse(readFileSync(path, "utf8")));
    } catch (error) {
      console.error(`lane-weights: ${path} could not be read (${errorText(error)})`);
      process.exit(2);
    }
  }
  const weights = weightsFrom(results, run);
  writeFileSync(WEIGHTS_FILE, `${JSON.stringify(weights, null, 2)}\n`);
  console.log(
    `lane-weights: ${String(Object.keys(weights.files).length)} files from run ${String(run)} (${weights.source.date}) → ${WEIGHTS_FILE}`,
  );
}
