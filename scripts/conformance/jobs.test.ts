import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { codeOf, report, TREE_SCAN_MS, walkFiles } from "./kit";

/**
 * N1b-1 (INC-977, concern A) — EVERY SCHEDULED JOB ROUTE CHECKS THE SIGNATURE
 * FIRST. A file under src/routes/api/public/jobs* answers through defineRoute
 * with `auth: "none"`, no declared body or dial, and `handler: jobHandler`
 * (src/server/jobs/route.ts, which verifies before it reads, spends or calls —
 * NCJ-1…4). jobHandler is named by no other route. No allowlist: a jobs route
 * on another handler is refused, never excused.
 */
type Finding = { file: string; line: number; what: string };
const JOBS_PREFIX = "src/routes/api/public/jobs";

export function jobRouteBreaches(entries: Array<{ file: string; text: string }>): Finding[] {
  const found: Finding[] = [];
  for (const { file, text } of entries) {
    const code = codeOf(text);
    const isJobs = file.startsWith(JOBS_PREFIX);
    const names = /\bjobHandler\b/.test(code);
    if (!isJobs) {
      if (names && file.startsWith("src/routes/"))
        found.push({ file, line: 1, what: "jobHandler outside the jobs prefix" });
      continue;
    }
    if (!code.includes('from "@/server/jobs/route"') || !/handler:\s*jobHandler\b/.test(code))
      found.push({ file, line: 1, what: "jobs route not on jobHandler" });
    if (!/auth:\s*"none"/.test(code))
      found.push({ file, line: 1, what: 'jobs route auth is not "none"' });
    if (/\b(body|rate|form):/.test(code))
      found.push({ file, line: 1, what: "jobs route declares a body, form or dial" });
  }
  return found;
}

const census = jobRouteBreaches(
  walkFiles(["src/routes"], { ext: ["ts", "tsx"], skipTests: true }).map((file) => ({
    file,
    text: readFileSync(file, "utf8"),
  })),
);

describe("scheduled job routes check the signature first (INC-977)", () => {
  it(
    "JOBS-1 every jobs route is on jobHandler, and nothing else is",
    () => {
      console.log(`[JOBS-1] breaches: ${census.length}`);
      expect(report(census)).toBe("");
    },
    TREE_SCAN_MS,
  );

  it("JOBS-2 the census refuses a planted jobs route on its own handler, and passes the real one", () => {
    const bad =
      'import { defineRoute } from "@/server/route";\nexport const h = defineRoute({ path: "/api/public/jobs/x", auth: "anon", handler: async () => run() });\n';
    const planted = `${JOBS_PREFIX}.planted.ts`;
    expect(report(jobRouteBreaches([{ file: planted, text: bad }]))).toBe(
      [
        `${planted}:1 jobs route auth is not "none"`,
        `${planted}:1 jobs route not on jobHandler`,
      ].join("\n"),
    );
    const real = `${JOBS_PREFIX}.$job.ts`;
    expect(
      jobRouteBreaches([
        { file: real, text: readFileSync(`src/routes/api/public/jobs.$job.ts`, "utf8") },
      ]),
    ).toEqual([]);
    expect(
      report(jobRouteBreaches([{ file: "src/routes/api/feed.ts", text: "handler: jobHandler" }])),
    ).toBe("src/routes/api/feed.ts:1 jobHandler outside the jobs prefix");
  });
});
