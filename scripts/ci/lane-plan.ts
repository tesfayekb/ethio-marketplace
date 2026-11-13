/**
 * DEC-375 (b), the speed turn — LANES 1 → 16 BY MEASURED TIME. Every per-push Chromium test runs in
 * exactly one lane: the serial lane (`smoke`) runs the tests tagged SERIAL_TAGS, and lanes 1 → 16
 * run every other Chromium test but the NIGHTLY_TAGS ones, split by SPEC FILE (both projects, as the lane's
 * command runs it) on the seconds `scripts/ci/lane-weights.json` measured. The plan is offline and
 * deterministic: heaviest file first (ties by name), each to the least-loaded lane (ties by lane
 * number). A file heavier than a lane's mean share gets a lane to itself; a file the weights do
 * not hold is weighed by the median file. Its input is `playwright test --list --reporter=json`
 * over the two Chromium projects, so every lane computes the same plan from the same tree.
 *
 *   bun scripts/ci/lane-plan.ts --list <list.json> --lane <n> --out <test-list file>
 *     writes the lane's files (Playwright's --test-list form) and prints the lane's line, then the
 *     plan's line;
 *   bun scripts/ci/lane-plan.ts --list <list.json> --repeat-budget
 *     prints the repeat lane's budget in seconds.
 */
import { readFileSync, writeFileSync } from "node:fs";
import {
  LANE_PROJECTS,
  NUMBERED_LANES,
  parseWeights,
  WEIGHTS_FILE,
  type Weights,
} from "./lane-weights";

/** The serial lane's tags (`--grep "@a11y|@global-state"`); lanes 1 → 16 leave them out. */
export const SERIAL_TAGS = ["a11y", "global-state"] as const;
/** The serial lane's `--grep` argument. */
export const SERIAL_GREP = SERIAL_TAGS.map((tag) => `@${tag}`).join("|");
/**
 * Tags no per-push lane runs. None since the app-fixes turn: the `@global-state` tests re-entered
 * the serial lane (INC-1135; TR-30's cause was the pseudo generator, INC-1137). Lanes 1 → 16 would
 * leave a tag here out with the serial tags (`--grep-invert`).
 */
export const NIGHTLY_TAGS: readonly string[] = [];
/** The lanes' workers: DEC-376's count restarted at one on the speed turn's first run. */
export const LANE_WORKERS = 1;
/** A lane over the mean by more than this, with no file alone in it, is a finding (CF-LANES-2). */
export const SPREAD_LIMIT = 0.25;

export type ListedTest = { file: string; project: string; title: string; tags: string[] };
export type Lane = { lane: number; files: string[]; seconds: number };
export type Plan = {
  lanes: Lane[];
  mean: number;
  median: number;
  alone: string[];
  unweighed: string[];
  run: number;
  date: string;
};

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Every test of `playwright test --list --reporter=json`, or null when the answer has another shape. */
export function listedTests(text: string): ListedTest[] | null {
  let value: unknown;
  try {
    value = JSON.parse(text);
  } catch {
    return null;
  }
  if (!isObject(value) || !Array.isArray(value["suites"])) return null;
  const out: ListedTest[] = [];
  let broken = false;
  const walk = (suite: unknown) => {
    if (!isObject(suite)) {
      broken = true;
      return;
    }
    for (const spec of Array.isArray(suite["specs"]) ? suite["specs"] : []) {
      if (!isObject(spec) || typeof spec["file"] !== "string" || !Array.isArray(spec["tests"])) {
        broken = true;
        continue;
      }
      const tags = Array.isArray(spec["tags"])
        ? spec["tags"].filter((tag): tag is string => typeof tag === "string")
        : [];
      const title = typeof spec["title"] === "string" ? spec["title"] : "";
      for (const test of spec["tests"]) {
        if (!isObject(test) || typeof test["projectName"] !== "string") {
          broken = true;
          continue;
        }
        out.push({ file: spec["file"], project: test["projectName"], title, tags });
      }
    }
    for (const child of Array.isArray(suite["suites"]) ? suite["suites"] : []) walk(child);
  };
  for (const suite of value["suites"]) walk(suite);
  return broken ? null : out;
}

/** A test the serial lane runs. */
export function isSerial(test: ListedTest): boolean {
  return test.tags.some((tag) => SERIAL_TAGS.some((serial) => serial === tag));
}

/** A test lanes 1 → 16 leave out: a serial or a nightly tag. */
export function isOutsideLanes(test: ListedTest): boolean {
  return isSerial(test) || test.tags.some((tag) => NIGHTLY_TAGS.some((nightly) => nightly === tag));
}

/** The spec files lanes 1 → 16 run: every per-push Chromium file with a test they do not leave out. */
export function laneFilesOf(tests: ListedTest[]): string[] {
  const files = new Set<string>();
  for (const test of tests)
    if (LANE_PROJECTS.some((project) => project === test.project) && !isOutsideLanes(test))
      files.add(test.file);
  return [...files].sort();
}

function weightOf(weights: Weights, file: string): number | null {
  const byProject = weights.files[file];
  if (byProject === undefined) return null;
  return Object.values(byProject).reduce((sum, weight) => sum + weight.seconds, 0);
}

function medianOf(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b);
  if (sorted.length === 0) return 0;
  const middle = Math.floor(sorted.length / 2);
  const upper = sorted[middle] ?? 0;
  return sorted.length % 2 === 1 ? upper : ((sorted[middle - 1] ?? 0) + upper) / 2;
}

export function planLanes(files: string[], weights: Weights, count = NUMBERED_LANES): Plan {
  const median = medianOf(Object.keys(weights.files).map((file) => weightOf(weights, file) ?? 0));
  const unweighed: string[] = [];
  const weighed = [...new Set(files)].sort().map((file) => {
    const seconds = weightOf(weights, file);
    if (seconds === null) unweighed.push(file);
    return { file, seconds: seconds ?? median };
  });
  weighed.sort((a, b) => b.seconds - a.seconds || (a.file < b.file ? -1 : 1));
  const total = weighed.reduce((sum, item) => sum + item.seconds, 0);
  const mean = total / count;
  const lanes: Lane[] = Array.from({ length: count }, (_, i) => ({
    lane: i + 1,
    files: [],
    seconds: 0,
  }));
  const closed = new Set<number>();
  const alone: string[] = [];
  for (const item of weighed) {
    const open = lanes.filter((lane) => !closed.has(lane.lane));
    const heavy = item.seconds > mean;
    const pool = heavy ? open.filter((lane) => lane.files.length === 0) : open;
    const target = pool.reduce<Lane | undefined>(
      (best, lane) => (best === undefined || lane.seconds < best.seconds ? lane : best),
      undefined,
    );
    if (target === undefined) throw new Error(`lane-plan: no lane is left for ${item.file}`);
    target.files.push(item.file);
    target.seconds += item.seconds;
    if (heavy) {
      closed.add(target.lane);
      alone.push(item.file);
    }
  }
  for (const lane of lanes) {
    lane.files.sort();
    lane.seconds = Math.round(lane.seconds * 10) / 10;
  }
  return {
    lanes,
    mean: Math.round(mean * 10) / 10,
    median,
    alone,
    unweighed,
    run: weights.source.run,
    date: weights.source.date,
  };
}

/** The repeat lane's budget: the slowest planned lane's seconds, at the lanes' one worker. */
export function repeatBudget(plan: Plan): number {
  return Math.round(Math.max(...plan.lanes.map((lane) => lane.seconds)));
}

/** The lane's evidence line. */
export function laneLine(plan: Plan, number: number): string {
  const lane = plan.lanes.find((item) => item.lane === number);
  if (lane === undefined) return `- Plan (DEC-375 b): lane ${String(number)} is not in the plan`;
  return `- Plan (DEC-375 b): lane ${String(number)} — ${String(lane.files.length)} files, ${String(Math.round(lane.seconds))} s planned at one worker`;
}

/** The plan's line, the same in every lane: its source, spread, alone files and unweighed files. */
export function planLine(plan: Plan): string {
  const largest = Math.max(...plan.lanes.map((lane) => lane.seconds));
  const files = plan.lanes.reduce((sum, lane) => sum + lane.files.length, 0);
  const over = plan.mean > 0 ? Math.round((largest / plan.mean - 1) * 100) : 0;
  return [
    `- Lane plan (DEC-375 b): ${String(plan.lanes.length)} lanes over ${String(files)} files, weights from run ${String(plan.run)} (${plan.date});`,
    `mean ${String(Math.round(plan.mean))} s, largest ${String(Math.round(largest))} s (${over >= 0 ? "+" : ""}${String(over)} %);`,
    `alone: ${plan.alone.join(", ") || "none"};`,
    `unweighed (median ${String(Math.round(plan.median))} s): ${plan.unweighed.join(", ") || "none"};`,
    `repeat budget ${String(repeatBudget(plan))} s`,
  ].join(" ");
}

export function readWeights(path = WEIGHTS_FILE): Weights {
  const weights = parseWeights(readFileSync(path, "utf8"));
  if (weights === null) throw new Error(`${path}: not the weights shape`);
  return weights;
}

if (import.meta.main) {
  const args = process.argv.slice(2);
  const value = (name: string) => {
    const at = args.indexOf(name);
    return at >= 0 ? (args[at + 1] ?? "") : "";
  };
  const listPath = value("--list");
  const tests = listPath === "" ? null : listedTests(readFileSync(listPath, "utf8"));
  if (tests === null) {
    console.error("lane-plan: --list <playwright --list --reporter=json output> is required");
    process.exit(2);
  }
  const plan = planLanes(laneFilesOf(tests), readWeights());
  if (args.includes("--repeat-budget")) {
    console.log(String(repeatBudget(plan)));
  } else {
    const number = Number(value("--lane"));
    const out = value("--out");
    const lane = plan.lanes.find((item) => item.lane === number);
    if (lane === undefined || out === "" || lane.files.length === 0) {
      console.error(
        "lane-plan: --lane <1-16> with files in the plan and --out <file> are required",
      );
      process.exit(2);
    }
    writeFileSync(out, `${lane.files.join("\n")}\n`);
    console.log(laneLine(plan, number));
    console.log(planLine(plan));
  }
}
