import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
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

export function jobRouteBreaches(files: string[]): Finding[] {
  const found: Finding[] = [];
  for (const file of files) {
    const code = codeOf(readFileSync(file, "utf8"));
    const isJobs = file.startsWith(JOBS_PREFIX);
    const names = /\bjobHandler\b/.test(code);
    if (!isJobs) {
      if (names && file.startsWith("src/routes/"))
        found.push({ file, line: 1, what: "jobHandler outside the jobs prefix" });
      continue;
    }
    if (!code.includes('from "@/server/jobs/route"') || !/handler:\s*jobHandler\b/.test(code))
      found.push({ file, line: 1, what: "jobs route not on jobHandler" });
    if (!/auth:\s*"none"/.test(code)) found.push({ file, line: 1, what: 'jobs route auth is not "none"' });
    if (/\b(body|rate|form):/.test(code))
      found.push({ file, line: 1, what: "jobs route declares a body, form or dial" });
  }
  return found;
}

const census = jobRouteBreaches(walkFiles(["src/routes"], { ext: ["ts", "tsx"], skipTests: true }));

describe("scheduled job routes check the signature first (INC-977)", () => {
  it(
    "JOBS-1 every jobs route is on jobHandler, and nothing else is",
    () => {
      console.log(`[JOBS-1] breaches: ${census.length}`);
      expect(report(census)).toBe("");
    },
    TREE_SCAN_MS,
  );

  it("JOBS-2 the census refuses a planted jobs route on its own handler", () => {
    const dir = "node_modules/.cache/jobs-guard";
    mkdirSync(dir, { recursive: true });
    const bad = `${dir}/bad.ts`;
    try {
      writeFileSync(
        bad,
        'import { defineRoute } from "@/server/route";\nexport const h = defineRoute({ path: "/api/public/jobs/x", auth: "anon", handler: async () => run() });\n',
      );
      // The census keys on the path prefix; judge the planted text as if it lived there.
      const planted = `${JOBS_PREFIX}.planted.ts`;
      const findings = jobRouteBreaches([bad]).length;
      expect(findings).toBe(0);
      writeFileSync(planted, readFileSync(bad, "utf8"));
      try {
        expect(report(jobRouteBreaches([planted]))).toBe(
          [
            `${planted}:1 jobs route not on jobHandler`,
            `${planted}:1 jobs route auth is not "none"`,
          ].join("\n"),
        );
      } finally {
        rmSync(planted, { force: true });
      }
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
