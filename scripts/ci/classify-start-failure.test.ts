import { describe, expect, it } from "vitest";
import { classifyStartFailure, startFailureLine } from "./classify-start-failure";

// Sample lines in the INC-944 shape this turn's sampler writes (DEC-313):
// time | pid | application | backend | state | wait | query
const LOG = [
  "Applying migration 20261007033719_9f7deb8a-e850-4fc3-bfc0-9693f6994666.sql...",
  "ERROR: deadlock detected (SQLSTATE 40P01)",
  "At statement: 48",
].join("\n");
const APPLIER = "00:45:19 | 230 | @effect/sql-pg | client backend | active | : | DO $p$ DECLARE";
const SCHEDULER =
  "00:45:19 | 214 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | ";
const BACKGROUND = "00:45:19 | 208 |  | checkpointer |  | Activity:CheckpointerMain | ";

describe("CF-CI-START-1 classify a failed apply (DEC-313)", () => {
  it("SF-1 a running cron job is counted, the scheduler named apart", () => {
    const job =
      "00:45:19 | 401 | pg_cron | pg_cron | active | Lock:relation | SELECT public.feed_reindex_drain()";
    const f = classifyStartFailure(LOG, [APPLIER, SCHEDULER, job, BACKGROUND].join("\n"));
    expect(startFailureLine(f)).toBe(
      "start failed in 20261007033719_9f7deb8a-e850-4fc3-bfc0-9693f6994666 stmt 48; cron jobs: 1 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0",
    );
  });

  it("SF-2 two appliers are two", () => {
    const second = APPLIER.replace("| 230 |", "| 231 |");
    expect(classifyStartFailure(LOG, [APPLIER, second].join("\n")).appliers).toBe(2);
  });

  it("SF-3 an outside session is other, autovacuum is its own kind", () => {
    const outside =
      "00:45:19 | 500 | postgrest | client backend | active | Lock:relation | SELECT 1";
    const vacuum =
      "00:45:19 | 306 |  | autovacuum worker | active | Timeout:VacuumTruncate | autovacuum: VACUUM ANALYZE public.categories";
    const f = classifyStartFailure(LOG, [APPLIER, outside, vacuum].join("\n"));
    expect([f.other, f.autovacuum, f.appliers]).toEqual([1, 1, 1]);
  });

  it("SF-4 a clean sample counts nothing but the applier", () => {
    const f = classifyStartFailure(LOG, [APPLIER, SCHEDULER, BACKGROUND].join("\n"));
    expect([f.cronJobs, f.appliers, f.autovacuum, f.other, f.scheduler]).toEqual([
      0,
      1,
      0,
      0,
      true,
    ]);
  });

  it("SF-5 a missing sample is unknown, never none", () => {
    expect(startFailureLine(classifyStartFailure(LOG, undefined))).toBe(
      "start failed in 20261007033719_9f7deb8a-e850-4fc3-bfc0-9693f6994666 stmt 48; sessions: unknown (no sample)",
    );
    expect(classifyStartFailure("", "").migration).toBe("unknown");
  });
});
