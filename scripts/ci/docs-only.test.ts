import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  decide,
  isRecord,
  lanesGreen,
  parseJobs,
  parseRuns,
  VERDICT_JOB,
  WALK_BOUND,
  type JobView,
  type Probe,
} from "./docs-only";

// DEC-365 (housekeeping turn 3, ruling 1 Q9/Q10) — the docs-only decision. The fixtures are the
// Actions API's answers through the file's own `--jq` filters: run 43103925609 (the stop-report push of
// this turn, every lane green) and run 43033934604 (turn 2, every lane lost before any test).
const FIXTURES = "scripts/fixtures/docs-only";
const read = (name: string) => readFileSync(`${FIXTURES}/${name}`, "utf8");

function jobsOf(name: string): JobView[] {
  const jobs = parseJobs(read(name));
  if (jobs === null) throw new Error(`${name}: not the jobs shape`);
  return jobs;
}

const GREEN = jobsOf("jobs-green-43103925609.json");
const RED = jobsOf("jobs-red-43033934604.json");
/** The green run as a docs-only push leaves it: the lanes call skipped, its jobs never started. */
const SKIPPED: JobView[] = [
  ...GREEN.filter((job) => !job.name.startsWith("E2E lanes")),
  { name: "E2E lanes", conclusion: "skipped" },
];

const sha = (n: number) => n.toString(16).padStart(40, "a");
const HEAD = sha(1);
const DOCS = Array.from({ length: 20 }, (_, i) => `docs/features/page-${String(i)}.md`);

/** A first-parent chain from `before` (index 0) back; each commit's run as `green` says. */
function chain(
  runs: Array<number | null | "unreadable">,
  changed: string[] | null,
): Probe & { reads: string[] } {
  const commits = runs.map((_, i) => sha(100 + i));
  const reads: string[] = [];
  return {
    reads,
    parent: (commit) => commits[commits.indexOf(commit) + 1] ?? null,
    greenRun: (commit) => {
      reads.push(commit);
      return runs[commits.indexOf(commit)] ?? null;
    },
    changed: () => changed,
  };
}

describe("a push's lanes by what it changed (DEC-365)", () => {
  it("CF-DOCS-1 every record shape passes; generated files, code and config never do", () => {
    for (const path of [
      "docs/features/ci-guards.md",
      "docs/governance/briefs/housekeeping-3.md",
      "docs/tracking/intentional-deletions.txt",
      "roadmap.md",
      "README.md",
      "AGENTS.md",
      "CLAUDE.md",
      ".cursor/rules/00-protocol.mdc",
    ])
      expect(isRecord(path), path).toBe(true);
    for (const path of [
      "docs/generated/i18n-usage.json",
      "public/i18n-usage.json",
      "src/README.md",
      "src/routes/index.tsx",
      "e2e/specs/a.spec.ts",
      "scripts/ci/docs-only.ts",
      ".github/workflows/ci.yml",
      "supabase/migrations/1_a.sql",
      ".claude/settings.md",
      "package.json",
      "bun.lock",
    ])
      expect(isRecord(path), path).toBe(false);
  });

  it("CF-DOCS-2 one src file among twenty docs runs the lanes, named in the line", () => {
    const decision = decide(sha(100), HEAD, chain([43103925609], [...DOCS, "src/lib/a.ts"]));
    expect(decision).toEqual({
      docsOnly: false,
      lanes: `ran — not docs-only: src/lib/a.ts is not a record (1 of 21 paths; diff base ${sha(100)}, push base ${sha(100)})`,
    });
    expect(decide(sha(100), HEAD, chain([43103925609], DOCS)).docsOnly).toBe(true);
  });

  it("CF-DOCS-3 an unknown base is not docs-only and reads nothing", () => {
    for (const before of [null, "0".repeat(40), "abc", ""]) {
      const probe = chain([43103925609], DOCS);
      expect(decide(before, HEAD, probe)).toEqual({
        docsOnly: false,
        lanes: "ran — not docs-only: the push's base is unknown",
      });
      expect(probe.reads).toEqual([]);
    }
  });

  it("CF-DOCS-4 a base whose run was not green, or whose read failed, runs the lanes", () => {
    const runs = parseRuns(read("runs-8511aeed9.json"));
    expect(runs).toEqual([{ id: 43103925609, conclusion: "success" }]);
    const green = { id: 43103925609, conclusion: "success" };
    expect(lanesGreen(green, GREEN)).toBe(true);
    expect(lanesGreen({ id: 43033934604, conclusion: "failure" }, RED)).toBe(false);
    expect(lanesGreen(green, SKIPPED)).toBe(false);
    const verdictRed = GREEN.map((job) =>
      job.name === VERDICT_JOB ? { ...job, conclusion: "failure" } : job,
    );
    expect(lanesGreen(green, verdictRed)).toBe(false);
    expect(lanesGreen({ ...green, conclusion: "failure" }, GREEN)).toBe(false);
    expect(parseJobs('{"jobs": []}')).toBeNull();
    expect(parseRuns('[{"id": "1", "conclusion": "success"}]')).toBeNull();
    expect(decide(sha(100), HEAD, chain(["unreadable"], DOCS))).toEqual({
      docsOnly: false,
      lanes: `ran — not docs-only: the Actions API read for ${sha(100)} failed (push base ${sha(100)})`,
    });
    expect(decide(sha(100), HEAD, chain([43103925609], null)).docsOnly).toBe(false);
  });

  it("CF-DOCS-5 a docs-only base one hop back: the line names the commit whose lanes ran", () => {
    const probe = chain([null, 43103925609], DOCS);
    expect(decide(sha(100), HEAD, probe)).toEqual({
      docsOnly: true,
      base: sha(101),
      runId: 43103925609,
      lanes: `skipped — docs-only push; the code tree equals ${sha(101)}, whose lanes were green in run 43103925609`,
    });
    expect(probe.reads).toEqual([sha(100), sha(101)]);
  });

  it("CF-DOCS-6 a code commit two hops back runs the lanes; so does a walk past the bound", () => {
    // before: a docs-only push; its parent: a code commit whose run went red; then a green run.
    expect(
      decide(sha(100), HEAD, chain([null, null, 43103925609], [...DOCS, "src/a.ts"])).docsOnly,
    ).toBe(false);
    const long = chain(
      Array.from({ length: WALK_BOUND + 1 }, (_, i) => (i === WALK_BOUND ? 43103925609 : null)),
      DOCS,
    );
    expect(decide(sha(100), HEAD, long)).toEqual({
      docsOnly: false,
      lanes: `ran — not docs-only: no commit within ${String(WALK_BOUND)} first-parent commits of ${sha(100)} ran its lanes green`,
    });
    expect(long.reads).toHaveLength(WALK_BOUND);
  });
});
