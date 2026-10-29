# Foundations turn N1b — stop 2 (N1b-1, M2: STOP before M2 lands)

## CI

The newest completed run is still **1e9b8336, FAILURE**. Its one red is the first-paint budget: /admin/places at 338.0 against a line of 338. That line was raised in 07cfcf15. Every other job passed, every E2E lane included.

The runs on 07cfcf15 (cancelled), 8cceeee8 and 0fb78854 have no completed verdict on ci-status.md yet. No red is open that this tree has not already fixed.

## The rule from INC-980 (written here as ruled)

From M2 on, a statement under test in a proof runs filtered to the proof's own scratch ids. Only the live statement spans real rows.

The M2 text below follows it. Every proof read is of a `job_runs` row the proof created, keyed by its returned id. The one table-wide read is the rollback check on a table born in the same file.

## A5 — pg_net in CI's temporary backends: YES

This comes from the image's own source, not from a running image; this sandbox has no Docker.

- **The CLI's image.** CI pins `supabase/setup-cli@v3.0.1` with CLI **2.120.0**, and the lane config sets `major_version = 17`. That CLI's `apps/cli-go/pkg/config/templates/Dockerfile` names `FROM supabase/postgres:17.11.0.004`.
- **pg_net is in that image.** In `supabase/postgres` tag 17.11.0.004:
  - `nix/packages/postgres.nix` lists `../ext/pg_net.nix` (and pg_cron, vault);
  - `nix/ext/versions.json` lists pg_net versions up to **0.20.4**, the same version available on prod;
  - `postgresql.conf.j2` preloads it: `shared_preload_libraries = '… pg_cron, pg_net, … supabase_vault'`.
- So `CREATE EXTENSION pg_net` replays on CI's lanes, with no workaround. Those lanes have no Vault rows, so every run there writes `not_configured`.

## What failed: the closers cannot be met by the migration role

**The first M2 submission failed on its own proof, `JC-7 closers`.** The transaction rolled back. Read back afterwards on ethio-prod:

- pg_net is not installed;
- `job_runs` does not exist;
- `job_call` does not exist;
- the newest mark is still 20261029220000;
- no migration file was written.

**To find the cause I sent one probe.** It enabled pg_net, ran the same revokes, then raised with the grants it read. Nothing was kept, and it is not a draft of M2. It read, on ethio-prod with pg_net **0.20.4**:

- **The schema `net`** is owned by `supabase_admin`. Its ACL is: `supabase_admin=UC`, `=U` (PUBLIC), `supabase_functions_admin=U`, `postgres=U`, `anon=U`, `authenticated=U`, `service_role=U`. Every grant was made by `supabase_admin`.
- **Every `net` function** (http_post, http_get, http_delete, _http_collect_response, worker_restart, wake, …) is owned by `supabase_admin`, with ACL `{=X/supabase_admin, supabase_admin=X}`. That is EXECUTE to **PUBLIC**.
- **`net.http_request_queue` and `net._http_response`** carry `=arwdDxtm/supabase_admin`. That is every table right to **PUBLIC**.

**Why the revokes did nothing.** On this platform the extension is created as `supabase_admin` (supautils), and its `issue_pg_net_access` event trigger grants as that role too. The migration runs as `postgres`. It does not own these objects and was not the grantor, so `REVOKE … FROM PUBLIC, anon, authenticated` is a no-op.

**What that means for the ruling.**

1. "The net schema revoked from anon and authenticated" cannot be done from a migration on this platform.
2. As M2 was written, `job_call` puts the secret in the `x-job-secret` header. pg_net stores that header in `net.http_request_queue` until the worker sends it, and that table is readable by PUBLIC. Any role with SQL access to `net` could read the secret for that moment.
3. pg_net's `http_post` is EXECUTE to PUBLIC. A role with SQL access could make the database call any address (SSRF).

**What limits the reach today (read, not proven).** anon and authenticated reach SQL only through the Data API.

- I could not read the Data API's exposed-schema setting from here: `pgrst.db_schemas` is not set on the database, and the authenticator role carries no schema list. So I do not claim that `net` is unexposed.
- That needs one read in the Supabase dashboard (API settings → Exposed schemas) before any option below relies on it.

## Options, for the supervisor and the operator

- **(a) Keep T1 and accept pg_net's platform grants, with compensations:**
  - **(i) The secret never travels.** job_call sends a signature, not the secret: an HMAC-SHA256, made with the Vault secret, over `job | run id | unix time`. The route recomputes it with its `JOB_SECRET`, compares the digests in constant time (A1), and refuses anything older than about 120 s or any run id already used. The queue row then holds only a short-lived signature, and the secret itself never sits in `net`. This needs `pgcrypto` `hmac()`; it is installed by default on Supabase, to be confirmed at build.
  - **(ii) A dashboard read, recorded in the report:** the exposed schemas do not include `net`.
  - **(iii) A CI proof:** the local backend's exposed schemas exclude `net`.
  - The rest of the cost: pg_net stays callable by PUBLIC at the SQL level, as on every Supabase project that enables it. The DEC states that.
- **(b) T1 without pg_net.** No equivalent exists in this environment; pg_cron cannot make HTTP calls by itself.
- **(c) T2,** the scheduled GitHub workflow from the N1a plan. This reverses the operator's choice 1, which is his decision.

**Recommendation:** (a) with (i), (ii) and (iii), and the platform cost named in the DEC.

## The M2 text, ready for the new ruling

It is kept unchanged at `/tmp/m2.sql`: 9,269 bytes, passed the migration guard as a scratch copy, which was then removed. It is not landed. If (a) is ruled, M2 changes in three ways:

- the header becomes the signature;
- `JC-7` asserts only what the `postgres` role can control (the public functions, the table, RLS), and names pg_net's platform grants as a known cost;
- a proof `JC-8` shows no queue row holds the secret's text.

## Files changed since 0fb78854

- docs/governance/reports/foundations-turn-n1b.stop-2.md
