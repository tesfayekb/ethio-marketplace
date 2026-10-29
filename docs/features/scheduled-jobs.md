# Scheduled server jobs (INC-977, Foundations N1b-1)

One mechanism for a server task that runs on a schedule (register row 72).

## The path

1. pg_cron runs `SELECT public.job_call('<job>')` (`name-check-catchup`: every 15 minutes).
2. `job_call` (service-only) reads `job_secret` and `job_base_url` from Vault. When either is missing, it writes a `not_configured` heartbeat and calls nothing. This is how staging and CI's temporary backends run, always. Otherwise it writes a `dispatched` row and posts to `<base>/api/public/jobs/<job>` through pg_net, with a 60 s timeout. The request carries `X-Job-Timestamp` and `X-Job-Signature` = hex(HMAC-SHA256(`job.ts`, secret)); the secret never travels.
3. `POST /api/public/jobs/$job` (`jobHandler`, src/server/jobs/route.ts):
   - The signature and the window come first (300 s old to 60 s ahead). Both hex strings are hashed with SHA-256 and the digests compared with timingSafeEqual. A missing `JOB_SECRET` refuses like a bad signature.
   - `job_run_claim` then refuses a used or never-dispatched `(job, ts)`, before the lease.
   - Every refusal is the same `401 {"error":"unauthorized"}`. Nothing is read, spent, leased or called before it.
   - The answer holds counts only. pg_net's response table is readable at the SQL level (INC-981).
4. The job's core runs, from the `JOBS` registry.

## The seller-name catch-up (`src/server/jobs/name-check-catchup.ts`)

- **Order of checks:** the pause comes first, then the lease (120 s, longer than a run).
- **The batch:** at most 20 `unchecked` names, least recently tried first (never tried first), then the oldest `since`.
- **Asking:** each name goes through `aiCall("name_check")`. A switch that is off, or a spent budget, ends the run with that reason and marks nothing.
- **Marking:** each answer is marked through `name_check_mark` for the exact text asked. A failed call is marked `unavailable`.
- **Pausing:** 402 pauses the job with `credits`, 403 with `policy`, and a second 429 with `rate_limit`.
- **Time limit:** no new name starts after 40 s.
- **Finishing:** the lease is released, and `job_run_finish` writes the counts once.

## Retention

`job-runs-prune` runs daily at 04:41 UTC. It keeps 14 days of `job_runs`, plus each job's newest row whatever its age, and writes its own heartbeat to `job_runs_prune_runs`.

## Guards

- **JOBS-1/2:** every route under the jobs prefix is on `jobHandler`, with `auth: "none"` and no declared body or dial.
- **`scripts/check-outbound-calls.ts`** runs in local-backend-proof's smoke lane, with a self-test in ci.yml:
  - only `public.job_call` names a `net.*` function;
  - `[api] schemas` holds neither `net` nor `extensions`;
  - `extra_search_path` does not hold `net`. `extensions` stays there: it is the platform's default and governs lookup, not exposure.
  - It also makes a live request with `Accept-Profile` / `Content-Profile: net`, which must be refused with PGRST106.

## Adding a job

Add its name to `JOB_NAMES` (src/lib/schemas/jobs.ts), to `job_call`'s and `job_runs`' CHECK lists in a migration, and to `JOBS`. Then schedule it with `cron.schedule`.
