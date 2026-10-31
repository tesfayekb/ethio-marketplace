import { readFileSync } from "node:fs";

/**
 * DEC-313 (Foundations turn CI-4, INC-1028) — CF-CI-START-1: A FAILED APPLY NAMES WHO ELSE WAS ACTIVE.
 * The CI backend's migrations apply in one session with pg_cron's jobs and autovacuum held
 * (local-backend-proof.yml). When the apply still fails, this prints one line from the start log
 * and the INC-944 session sample (`time | pid | application | backend | state | wait | query`):
 * the migration and statement it stopped at, and how many cron jobs, appliers, autovacuum workers
 * and other sessions were busy. Counts and kinds only — never a query's text. A missing sample is
 * "unknown", never "none".
 */

export type StartFailure = {
  migration: string;
  statement: string;
  cronJobs: number;
  scheduler: boolean;
  appliers: number;
  autovacuum: number;
  other: number;
  sampled: boolean;
};

const APPLIER = /^(?:@effect\/sql-pg|supabase|pgx|migrate)/;

export function classifyStartFailure(log: string, sample: string | undefined): StartFailure {
  const applying = [...log.matchAll(/Applying migration (\S+?)\.sql/g)].map((m) => m[1]);
  const statement = /At statement:? (\d+)/.exec(log)?.[1] ?? "unknown";
  const result: StartFailure = {
    migration: applying.at(-1) ?? "unknown",
    statement,
    cronJobs: 0,
    scheduler: false,
    appliers: 0,
    autovacuum: 0,
    other: 0,
    sampled: false,
  };
  if (sample === undefined || !sample.trim()) return result;
  result.sampled = true;
  for (const line of sample.split(/\r?\n/)) {
    const cells = line.split(" | ");
    if (cells.length < 7) continue;
    const [, , application, backend, state, , query] = cells.map((c) => c.trim());
    if (application === "pg_cron scheduler" || backend === "pg_cron launcher") {
      result.scheduler = true;
      continue;
    }
    if (backend === "pg_cron" || application === "pg_cron") {
      result.cronJobs += 1;
      continue;
    }
    if (backend === "autovacuum worker" || query.startsWith("autovacuum:")) {
      result.autovacuum += 1;
      continue;
    }
    if (!state) continue; // a background process with no session (checkpointer, walwriter, …)
    if (APPLIER.test(application)) result.appliers += 1;
    else result.other += 1;
  }
  return result;
}

export function startFailureLine(f: StartFailure): string {
  const where = `start failed in ${f.migration} stmt ${f.statement}`;
  if (!f.sampled) return `${where}; sessions: unknown (no sample)`;
  return `${where}; cron jobs: ${String(f.cronJobs)} (scheduler ${f.scheduler ? "present" : "absent"}); appliers: ${String(f.appliers)}; autovacuum: ${String(f.autovacuum)}; other sessions: ${String(f.other)}`;
}

function readOptional(path: string | undefined): string | undefined {
  if (!path) return undefined;
  try {
    return readFileSync(path, "utf8");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return undefined;
    throw error;
  }
}

if (import.meta.main) {
  const [logPath, samplePath] = process.argv.slice(2);
  if (!logPath) throw new Error("usage: classify-start-failure.ts <start log> [<session sample>]");
  console.log(
    startFailureLine(classifyStartFailure(readFileSync(logPath, "utf8"), readOptional(samplePath))),
  );
}
