import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import { baseOf, changedTestFiles } from "./changed-tests";
import { readWorkflow } from "./workflow-reader";

/**
 * INC-1306 (cursor bundle 8a, fix 3b) — the component job runs each test file a push changes
 * alone (changed-tests.ts):
 *   CF-ALONE-1 a planted list of changed files selects exactly the test files vitest runs that
 *              still exist;
 *   CF-ALONE-2 a base that is no commit, or the zero commit, is a loud problem, never a skip;
 *   CF-ALONE-3 the component job carries the step, after the whole suite: the base read first,
 *              fetched through the deadline wrapper, then the run, with the step's own deadline.
 */

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const WORKFLOW = ".github/workflows/ci.yml";

describe("changed test files, each alone (INC-1306)", () => {
  it("CF-ALONE-1 a planted list selects the changed test files vitest runs, and only those", () => {
    const planted = [
      "src/features/ad-page/similar.test.ts",
      "src/features/posting/step-who.test.tsx",
      "scripts/conformance/door-permissions.test.ts",
      "src/features/ad-page/similar.ts",
      "e2e/failure-crawl-public.spec.ts",
      "scripts/conformance/kit.test.tsx",
      "docs/features/e2e-harness.md",
      "src/features/gone.test.ts",
      "src/features/ad-page/similar.test.ts",
      " src/lib/route-client.test.ts ",
    ];
    const gone = new Set(["src/features/gone.test.ts"]);
    expect(changedTestFiles(planted, (path) => !gone.has(path))).toEqual([
      "scripts/conformance/door-permissions.test.ts",
      "src/features/ad-page/similar.test.ts",
      "src/features/posting/step-who.test.tsx",
      "src/lib/route-client.test.ts",
    ]);
    expect(changedTestFiles([], () => true)).toEqual([]);
  });

  it("CF-ALONE-2 a base that cannot be read is a loud problem, never a skip", () => {
    const sha = "70df93185".padEnd(40, "0");
    expect(baseOf(sha)).toEqual({ base: sha });
    expect(baseOf(undefined)).toHaveProperty("problem");
    expect(baseOf("")).toHaveProperty("problem");
    expect(baseOf("dev")).toHaveProperty("problem");
    expect(baseOf("0".repeat(40))).toEqual({
      problem: "CHANGED_BASE is the zero commit (a new branch): no previous head to read",
    });
  });

  it("CF-ALONE-3 the component job runs the changed test files alone, after the whole suite", () => {
    const jobs = readWorkflow(WORKFLOW, readFileSync(join(ROOT, WORKFLOW), "utf8"));
    const job = jobs.find((candidate) => candidate.id === "component-tests");
    expect(job).toBeDefined();
    const steps = job?.steps ?? [];
    const suite = steps.findIndex((step) => step.text.includes("run: bun run test:unit"));
    const alone = steps.findIndex((step) =>
      step.text.includes("name: Changed test files, each alone"),
    );
    expect(suite).toBeGreaterThanOrEqual(0);
    expect(alone).toBeGreaterThan(suite);
    const text = steps[alone]?.text ?? "";
    expect(steps[alone]?.timeout).toBe(true);
    expect(text).toContain(
      "CHANGED_BASE: ${{ github.event.pull_request.base.sha || github.event.before }}",
    );
    const order = [
      "bun scripts/conformance/changed-tests.ts base",
      'bash scripts/ci/with-deadline.sh 120 2 -- git fetch --no-tags --depth=1 origin "$CHANGED_BASE"',
      "bun scripts/conformance/changed-tests.ts run",
    ].map((line) => text.indexOf(line));
    expect(order.every((at) => at >= 0)).toBe(true);
    expect([...order].sort((a, b) => a - b)).toEqual(order);
  });
});
