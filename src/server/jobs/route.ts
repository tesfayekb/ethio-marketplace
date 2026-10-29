import type { JobName } from "@/lib/schemas/jobs";
import { clientError, ok, upstreamUnavailable } from "@/server/answer";
import type { RouteContext } from "@/server/route";
import { runNameCheckCatchup, type RunResult } from "@/server/jobs/name-check-catchup";
import { verifyJobSignature } from "@/server/jobs/signature";

/**
 * N1b-1 (INC-977, concern A) — THE SCHEDULED JOBS' ONE HANDLER, for every route
 * under /api/public/jobs/ (the jobs guard, scripts/conformance/jobs.test.ts).
 * ONE caller (pg_cron → public.job_call → pg_net), ONE secret (JOB_SECRET here,
 * job_secret in Vault), ONE heartbeat per run (job_runs). OWASP ASVS V13/V7.
 *
 *   1  the signature and the window (signature.ts) — BEFORE anything is read,
 *      spent, leased or called; a person's session never opens it
 *   2  job_run_claim refuses a used, never-dispatched or out-of-window
 *      (job, ts) before the lease — a replay is refused, not just harmless
 *   3  the job's core, from the registry below
 *
 * Every refusal is the same constant 401 body. The answer is counts only
 * (INC-981: pg_net's response table is readable at the SQL level).
 */
type Core = (
  admin: Awaited<ReturnType<RouteContext["service"]>>,
  run: string,
) => Promise<RunResult>;
export const JOBS: Readonly<Record<JobName, Core>> = {
  "name-check-catchup": (admin, run) => runNameCheckCatchup(admin, run),
};

export const refused = (): Response => clientError("unauthorized", 401);

export async function jobHandler(
  ctx: RouteContext<unknown, { job: JobName }, unknown>,
): Promise<Response> {
  const { job } = ctx.params;
  const ts = verifyJobSignature({
    job,
    timestamp: ctx.request.headers.get("x-job-timestamp"),
    signature: ctx.request.headers.get("x-job-signature"),
    secret: process.env["JOB_SECRET"],
    nowSeconds: Math.floor(Date.now() / 1000),
  });
  if (ts === null) return refused();

  const admin = await ctx.service();
  const claim = await admin.rpc("job_run_claim", { p_job: job, p_ts: ts });
  if (claim.error) {
    if ((claim.error.message ?? "").startsWith("refused:")) return refused();
    return upstreamUnavailable(ctx.path, "job_run_claim", claim.status ?? 0);
  }
  const run = claim.data;
  const result = await JOBS[job](admin, run);
  return ok({
    outcome: result.outcome,
    asked: result.asked,
    clean: result.clean,
    imitates: result.imitates,
    unavailable: result.unavailable,
  });
}
