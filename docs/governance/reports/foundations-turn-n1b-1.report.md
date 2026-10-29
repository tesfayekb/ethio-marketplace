# Foundations turn N1b-1 — final report (INC-977, INC-979, INC-981)

## 1. CI

- The newest completed run with a verdict is 3199dd8d: **SUCCESS** (2026-10-29T07:47:29Z; main promoted).
- No red to fix. The runs after it had no verdict when this report was written.

## 2. Migration stops (all applied on ethio-prod, each read back)

| Stop | Migration                            | Apply line                                 |
| ---- | ------------------------------------ | ------------------------------------------ |
| 1    | M1 INC-979 backfill                  | `apply a58307eb → expect mark 20261029220000` |
| 3    | M2 pg_net + job_call + job tables    | `apply be0270dc → expect mark 20261029230000` |
| 4    | M3 claim, lease, pause, finish, mark | `apply cba46fd4 → expect mark 20261029233000` |
| 5    | M4 the 15-minute schedule            | `apply 44a91d3e → expect mark 20261029234500` |
| 6    | M5 job_runs retention (14 days)      | `apply 2206e389 → expect mark 20261030000000` |
| 7    | M6 job_call timeout 60 s             | `apply 5b5658e1 → expect mark 20261030003000` |

No further database change was made after stop 7.

## 3. The route — POST /api/public/jobs/$job

- **Built on:** `defineRoute` with `auth: "none"` and the `JobParams` shape (`src/lib/schemas/jobs.ts`, strict). It declares no body, form or dial. An unknown job name gets the same constant 401.
- **`jobHandler`** (`src/server/jobs/route.ts`), in order:
  1. `verifyJobSignature` (`src/server/jobs/signature.ts`) checks the signature: HMAC-SHA256 of `job.ts`. Both hex strings are hashed with SHA-256 and the digests compared with `timingSafeEqual` (A1).
  2. The same step checks the window: 300 s old to 60 s ahead.
  3. A missing `JOB_SECRET` refuses exactly like a bad signature. The secret's value is never logged, echoed or returned.
  4. Only then does `ctx.service()` load the service client.
  5. `job_run_claim` refuses a replayed or never-dispatched `(job, ts)` before the lease. Its `refused:*` answer gets the same 401. Any other claim error answers 503.
  6. The core runs from the `JOBS` registry.
- **The answer:** `{outcome, asked, clean, imitates, unavailable}` only. It never holds a name or model text (INC-981).

## 4. The catch-up core (`src/server/jobs/name-check-catchup.ts`)

The run goes in this order:

1. **Pause:** a paused job asks nothing and takes no lease.
2. **Lease:** 120 s, longer than a run (`LEASE_SECONDS`). If the lease is held, the run is `busy`.
3. **The batch:** 20 names (`BATCH`), `unchecked` only, least recently tried first (`last_attempt_at` nulls first), then the oldest `since`. The order is named in the core's comment and in NCJ-5.
4. **Asking:** each name goes through `aiCall("name_check", {alias: checked_text}, {actorId: null})`. Because the task judges a person, the gateway writes its `ai_calls` row before the verdict (DEC-280).
5. **Switch and budget:** the gateway's gate answers first (`gate: true`). A switch that is off ends the run as `switch_off`, a spent budget as `budget_spent`, an unreadable gate as `failed`/`gate_unreadable`. None of these marks anything.
6. **Marking:** each answer is marked through `name_check_mark` for the exact text asked. A failed call is marked `unavailable` (A3: the state is unchanged). A `false` mark means the name changed in between; nothing is counted.
7. **Circuit breaker:** 402 pauses the job with `credits`, 403 with `policy`, a second 429 in one run with `rate_limit`. The run ends as `paused`.
8. **Time limit:** no new name starts after 40 s (`STOP_NEW_AFTER_MS`); the run's reason is then `time_cap`.
9. **Finishing:** the lease is released in a `finally`, and `job_run_finish` writes the outcome and counts once. Release and finish failures are logged.
10. **Other failures:** a failed batch read ends the run as `failed`/`read_failed`, never `ok`.

## 5. Guards

- **Jobs guard:** `scripts/conformance/jobs.test.ts`.
  - JOBS-1: every file under `src/routes/api/public/jobs*` is on `jobHandler`, with `auth: "none"` and no body, form or dial. No other route names `jobHandler`. Census: 0 breaches.
  - JOBS-2: a planted jobs route on its own handler is refused, the real route passes, and a `jobHandler` outside the prefix is refused.
- **S4 + S5's CI halves:** `scripts/check-outbound-calls.ts`.
  - It runs in `local-backend-proof.yml`'s smoke lane, with a 3-minute step deadline and curl `--max-time 20`. Its `SELF_TEST` runs in `ci.yml`.
  - S4: the census covers every SQL or plpgsql function outside `net`, `pg_catalog`, `information_schema` and the extensions' own functions. Ordinary triggers are included; event triggers are not, because they are the platform's machinery: `extensions.grant_pg_net_access()` is one. Only `public.job_call(text)` may name `net.*`, and it must be present.
  - The same census query run read-only on ethio-prod returns exactly `public.job_call(text)`.
  - S5 config: the temporary backend's `[api] schemas` must hold neither `net` nor `extensions`, and `extra_search_path` must not hold `net`. `extensions` stays in `extra_search_path` (stop 7 ruling 2, said in the check's comment). The repository's `supabase/config.toml` also passes.
  - S5 live: a GET with `Accept-Profile: net` and a POST to `/rpc/http_post` with `Content-Profile: net` must each answer PGRST106.
  - The self-test refuses the planted caller, `net` in `schemas` and `net` in `extra_search_path`.
- **CF-RT-1, VS-1, CF-CID-1 and CF-WIRED-1** pass. VS-1 was red on the first draft: the two `src/server/jobs` files imported supabase-js's type. They now take the service client's type from `RouteContext["service"]`, so VS-1 is green without an allowlist line. CF-CID-1 was red on the new step until it got its deadline.
- **actionlint** (`-shellcheck= -pyflakes=`) is clean on both workflows.

## 6. Tests — NCJ (`src/routes/api/public/jobs.test.ts`)

All 11 pass, as do JOBS-1/2. The ids were grep-checked: none were in use.

- **NCJ-1:** no signature, or a person's Bearer token alone, is refused. No service client is loaded; nothing is read, leased or asked.
- **NCJ-2:** a wrong secret, a signature made for another job, and a missing `JOB_SECRET` all get the same 401, with nothing touched. The secret never appears in a log.
- **NCJ-3:** 301 s old and 61 s ahead are refused before the claim; 290 s old is accepted.
- **NCJ-4:** a replay is refused by the claim before the lease. An unknown job name gets the same 401 with no database call.
- **NCJ-5:** a run asks at most 20 names, least recently tried first, then the oldest `since`. Order of calls: claim → pause → lease (120 s).
- **NCJ-6:** each answer is marked for the exact text asked. The answer holds counts only; the test checks for no name or model text. Finish counts are 2/1/1/0, and the lease is released.
- **NCJ-7:** a failed call is marked `unavailable`, never `clean`.
- **NCJ-8:** a switch that is off or a spent budget ends the run with that reason and marks nothing.
- **NCJ-9:** 402, 403 and a second 429 pause the job (`credits`, `policy`, `rate_limit`). A paused job asks nothing and takes no lease; the run's heartbeat records the pause reason.
- **NCJ-10:** an empty run's heartbeat is `ok` with 0 asked. A held lease gives `busy`: nothing is read and nothing released. A failed read gives `failed`/`read_failed` and the lease is released.
- **NCJ-11:** no new name starts after 40 s.

The database half (claim, lease, pause, finish, mark, prune, the schedule's `not_configured` run) is proven in M3–M6's rolled-back proofs.

## 7. The whole unit suite

**2,161 passed, 4 failed, 1 skipped (2,166), in 357 files.**

- **NH-1/2/3:** the known timezone-data failures, the same as every earlier turn.
- **AAN-1:** timed out at 6.4 s under the whole suite's load. Run on its own, it passes (2/2).
- **EXH-4** timed out the same way on the first whole run, and passes alone. It passed on the second whole run.

## 8. Docs

- **`docs/conventions.md`**, new section "Migration proofs":
  - the id-scoped core as the house form (INC-980; `job_runs_prune_core`);
  - a function call and the check of its effect are never in one expression (M3's lesson).
- **`docs/features/scheduled-jobs.md`:** new.
- **`docs/governance/mechanisms.md`:** row 72.
- **`docs/_changelog.md`:** one line.
- **`roadmap.md`:** INC-979 closed; N1b-1 built.

## 9. K2 — places with the same concern outside the mechanism

- The seven SQL-only sweeps keep their per-job `*_runs` tables: `feed-reindex-drain`, `feed-index-check`, `ai-calls-prune`, `rate-limits-prune`, `seller-name-sweep`, `catalog-find-sweep`, `listing-expiry-sweep`. This is the SQL-sweep form, a later consolidation (R1), not touched.
- `src/routes/api/listings/identity.ts:87` `markClean` is the route-side marker for a live save; the core marks through the same door. Same door, not a bypass.
- The pause has no staff action yet: nothing clears `job_pauses` but SQL. This is owed to N1b-3, the staff queue turn.

## 10. The DEC's facts (for the supervisor to draft)

- **What is new:**
  - the first outside call from the database: pg_net 0.20.4, enabled in M2;
  - the first scheduled server route, under `/api/public/jobs/`;
  - one secret held twice: Vault `job_secret` and the server's `JOB_SECRET`;
  - one caller: `job_call`;
  - one heartbeat table: `job_runs`, with 14-day retention.
- **Why:** the operator's choice (T1) keeps every schedule in the database, independent of GitHub's scheduler and Actions minutes.
- **Its security costs:**
  - **Open platform grants:** pg_net's schema, its functions (EXECUTE) and its queue and response tables (SELECT and more) are owned by `supabase_admin` and granted to PUBLIC, anon and authenticated. The migration role cannot revoke them (INC-981).
  - **Reachable only through raw SQL:** visitors have none. The Data API exposes only `public` and `graphql_public` (S5: PGRST106 on prod, and checked live in CI on every run).
  - **One door calls out:** `public.job_call`, service-only, is the only SQL that calls out, kept so by S4's census.
  - **A signature on the wire, not a shared secret:** the queue and response tables, which PUBLIC can read, hold only the job name, the timestamp and an HMAC-SHA256 signature. The response holds counts only.
  - **Replay refused, not just harmless:** within the 300 s / 60 s window, a `(job, ts)` already claimed is refused before the lease, backed by job_runs' UNIQUE key.
  - **A fixed target:** the job list is CHECK-ed and the path fixed; no caller's argument reaches the URL.
  - **Running cost:** 96 calls a day. Before configuration, each is one heartbeat row. After, each is one outside call asking at most 20 names, with the gateway's switch, budget and the circuit breaker in front.

## 11. Operator steps (after N1b-1 lands and is published; for the supervisor to send)

1. In your password manager, generate a long random secret of at least 32 characters. Never paste it into a chat.
2. In Lovable → Project Settings → Secrets, add a secret named `JOB_SECRET` with that value.
3. In ethio-prod's SQL editor, run these two lines. Type your secret in the first. In the second, type the published address you publish to, starting with `https://`, with no path and no trailing slash. Never use the preview address.

   ```sql
   select vault.create_secret('<the same secret as JOB_SECRET>', 'job_secret');
   select vault.create_secret('https://<the published address>', 'job_base_url');
   ```

4. After the next quarter hour, read back one heartbeat row:

   ```sql
   select job, started_at, outcome, reason, asked, clean, imitates, unavailable
     from public.job_runs order by started_at desc limit 1;
   ```

Staging never gets these entries, so its runs say `not_configured`. The launch gate (roadmap): at the DNS cutover, `job_base_url` changes to `https://ethio.com` in the same session.

R3: the measured run time is owed once the job has run on prod with the secrets in place.

## 12. Limits, and files since 8cceeee8

- **Limits:**
  - No live run has reached the route: prod has no Vault entries yet, by design.
  - No E2E spec was added; the route has no browser surface.
  - The harness built the preview (`build OK` at 08:04:59Z).
  - The CI halves of S4/S5 run on the next CI run; they were checked here on the repository's config and on prod's catalogue only.
- **Files changed:**
  - `.github/workflows/ci.yml`
  - `.github/workflows/local-backend-proof.yml`
  - `docs/_changelog.md`
  - `docs/conventions.md`
  - `docs/features/scheduled-jobs.md`
  - `docs/governance/briefs/foundations-turn-n1b.md`
  - `docs/governance/mechanisms.md`
  - `docs/governance/reports/foundations-turn-n1b.stop-1.md` … `stop-7.md`
  - `docs/governance/reports/foundations-turn-n1b-1.report.md`
  - `roadmap.md`
  - `scripts/check-outbound-calls.ts`
  - `scripts/conformance/jobs.test.ts`
  - `scripts/fixtures/outbound-calls-bad.txt`
  - `scripts/migration-real-row-allowlist.txt`
  - `src/integrations/supabase/types.ts` (generated)
  - `src/lib/schemas/jobs.ts`
  - `src/routeTree.gen.ts` (generated)
  - `src/routes/api/public/jobs.$job.ts`
  - `src/routes/api/public/jobs.test.ts`
  - `src/server/jobs/name-check-catchup.ts`
  - `src/server/jobs/route.ts`
  - `src/server/jobs/signature.ts`
  - `supabase/migrations/20261029071034_a58307eb-….sql`
  - `supabase/migrations/20261029072455_be0270dc-….sql`
  - `supabase/migrations/20261029073342_cba46fd4-….sql`
  - `supabase/migrations/20261029073837_44a91d3e-….sql`
  - `supabase/migrations/20261029074251_2206e389-….sql`
  - `supabase/migrations/20261029074846_5b5658e1-….sql`
