import { z } from "zod";

/**
 * N1b-1 (INC-977) — THE SCHEDULED JOBS' NAMES. One entry per job the database's
 * `job_call` may call; the same closed list as job_call's and job_runs' CHECKs.
 * A new scheduled server task is one more name here, there and in the registry
 * (src/server/jobs/route.ts).
 */
export const JOB_NAMES = ["name-check-catchup"] as const;
export type JobName = (typeof JOB_NAMES)[number];

/** POST /api/public/jobs/$job — the path's shape. */
export const JobParams = z.object({ job: z.enum(JOB_NAMES) }).strict();
