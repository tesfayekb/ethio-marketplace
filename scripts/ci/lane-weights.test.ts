import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { parseWeights, weightsFrom, WEIGHTS_FILE } from "./lane-weights";

// DEC-375 (b), the speed turn — the lane plan's weights. The fixtures are two suites each of lanes
// 3 and 11's results.json from run 43431755160 (dev 203907b3d, every lane green), cut by script.
const FIXTURES = "scripts/fixtures/lane-plan";
const read = (name: string): unknown => JSON.parse(readFileSync(`${FIXTURES}/${name}`, "utf8"));

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** The seconds and count the fixture holds for a file and project, read by a plain walk. */
function expected(results: unknown[], file: string, project: string) {
  let ms = 0;
  let tests = 0;
  const walk = (node: unknown, inFile: boolean): void => {
    if (Array.isArray(node)) {
      for (const item of node) walk(item, inFile);
      return;
    }
    if (!isObject(node)) return;
    const here = typeof node["file"] === "string" ? node["file"] === file : inFile;
    if (here && node["projectName"] === project && Array.isArray(node["results"])) {
      tests += 1;
      for (const attempt of node["results"])
        if (isObject(attempt) && typeof attempt["duration"] === "number") ms += attempt["duration"];
      return;
    }
    for (const value of Object.values(node)) walk(value, here);
  };
  walk(results, false);
  return { seconds: Math.round((ms / 1000) * 10) / 10, tests };
}

describe("the lane plan's weights (DEC-375 b)", () => {
  const results = [read("results-lane-3.json"), read("results-lane-11.json")];

  it("LWM-1 seconds and counts per spec file and Chromium project, with the run and its date", () => {
    const weights = weightsFrom(results, 43431755160);
    expect(weights.source).toEqual({ run: 43431755160, date: "2026-11-13", lanes: "1-16" });
    expect(Object.keys(weights.files)).toEqual([
      "admin-shell.spec.ts",
      "admin-translations-console.spec.ts",
      "admin-translations-data.spec.ts",
      "admin-translations-governance.spec.ts",
    ]);
    for (const [file, byProject] of Object.entries(weights.files))
      for (const project of ["mobile-360", "desktop-1280"]) {
        const want = expected(results, file, project);
        expect(byProject[project], `${file} ${project}`).toEqual(want.tests > 0 ? want : undefined);
      }
  });

  it("LWM-2 another project's tests are left out; the committed weights parse", () => {
    const planted = JSON.parse(
      JSON.stringify(results[0]).replaceAll(
        '"projectName":"desktop-1280"',
        '"projectName":"email-serial"',
      ),
    );
    const weights = weightsFrom([planted], 1);
    for (const byProject of Object.values(weights.files))
      expect(Object.keys(byProject)).toEqual(["mobile-360"]);
    const committed = parseWeights(readFileSync(WEIGHTS_FILE, "utf8"));
    expect(committed?.source).toEqual({ run: 43431755160, date: "2026-11-13", lanes: "1-16" });
    expect(Object.keys(committed?.files ?? {}).length).toBeGreaterThan(100);
    expect(parseWeights('{"source": {}, "files": {}}')).toBeNull();
  });
});
