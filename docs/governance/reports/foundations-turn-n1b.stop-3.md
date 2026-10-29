# Foundations turn N1b — stop 3 (N1b-1, M2 revised: pg_net + signed job_call)

## CI

The newest completed run is **0fb78854: CANCELLED**, so it gives no verdict. The newest run with a verdict is still 1e9b8336, FAILURE. Its one red is /admin/places, fixed in 07cfcf15. No red is open on this tree.

## INC-980's rule (stated at stop 2, followed here)

A statement under test runs filtered to the proof's own scratch ids. Only the live statement spans real rows.

M2's proof follows it:

- It reads only the `job_runs` rows it created, by their returned id, plus one fixed scratch id.
- It reads pg_net's queue only filtered to the jobs path.
- It creates no Vault row.
- The rollback check reads tables born in this file.

## M2: what it does

- **File:** `supabase/migrations/20261029072455_be0270dc-e88a-4a72-abee-14468885579d.sql`, 10,537 bytes, sha256 be54d382…74df. A scratch copy passed the migration guard and was removed. The landed file passes too: `Migration guard OK`.
- **pg_net 0.20.4** is enabled in schema `extensions`. Its platform grants stay as they are (INC-981).
- **job_call(p_job)** is the one caller, and it is service-only (S1, S3):
  - It reads `job_secret` and `job_base_url` from `vault.decrypted_secrets`.
  - It sends only these headers: `x-job-timestamp` (epoch seconds) and `x-job-signature` = `encode(extensions.hmac(job || '.' || ts, secret, 'sha256'), 'hex')`. The secret is never an argument to pg_net.
  - The URL is the Vault base plus `/api/public/jobs/<name>`.
  - The name must be in a fixed list (today `name-check-catchup`). An unknown or NULL name is refused (`badValue:job`).
  - If either Vault entry is missing, or the base is not `https://host[:port]`, it writes a `not_configured` row and queues nothing.
- **Three tables are born closed:**
  - `job_runs`, the one heartbeat. The pair `(job, ts)` is UNIQUE, which is the replay key. It has a `claimed_at` column for the route's claim in M3.
  - `job_leases`, for single-flight runs.
  - `job_pauses`, with the reason `credits`, `policy` or `rate_limit`.
  - All three are revoked from PUBLIC, anon and authenticated, granted ALL to service_role, have RLS on, and carry deny policies on every operation for anon and authenticated.
- **Departure, as S6 allows:** the lease and pause tables are born in M2. M3 becomes the route-side doors:
  - the claim that refuses a used `(job, ts)` before the lease;
  - the lease take and release;
  - the pause read and write;
  - the run finish;
  - the extended `name_check_mark` (A3).

### Proof

Each check raises on failure, and the sentinel rolls everything back. The rollback check confirms that `job_runs` is empty and that pg_net's jobs-path queue count is unchanged.

- **JC-1:** with no Vault entries, the answer is `not_configured` (reason `vault_entry_missing`), with no ts and no request id, and nothing is queued in `net.http_request_queue`.
- **JC-2:** an unknown name and a NULL name are both refused, and nothing is queued.
- **JC-3:** the heartbeat refuses a name outside the list, and a repeated `(job, ts)`.
- **JC-4:** the ACL:
  - PUBLIC, anon and authenticated have no EXECUTE on `job_call`; service_role has it;
  - no browser role can SELECT any of the three tables;
  - RLS is on all three.
- **JC-5 (S4, at birth):** no function in `public` other than `job_call` names a `net.*` function.

### Read back on ethio-prod after the apply

pg_net 0.20.4; mark 20261029230000 present; 0 `job_runs` rows (the proof's rows rolled back); anon and authenticated have no EXECUTE on `job_call`; 0 Vault entries.

## S5: is `net` reachable over the Data API? (prod, the publishable key, pasted as answered)

Asked after the apply, when the `net` schema exists:

```text
== GET /rest/v1/http_request_queue Accept-Profile: net
{"code":"PGRST106","details":null,"hint":"Only the following schemas are exposed: public, graphql_public","message":"Invalid schema: net"}
HTTP 406
== POST /rest/v1/rpc/http_post Content-Profile: net
{"code":"PGRST106","details":null,"hint":"Only the following schemas are exposed: public, graphql_public","message":"Invalid schema: net"}
HTTP 406
```

The same requests answered the same before pg_net existed, and `Accept-Profile: extensions` answers the same. A GraphQL `__schema` request with the publishable key returned 200, and no type named `http_request_queue` or `_http_response`. **Result:** net is not exposed. No STOP.

**S5's CI half is not built yet; it comes with the guard work later in N1b-1.** `supabase/config.toml` is not in the repository: the earlier search found no such file. The CI lane writes its own config under `.ci-local` (local-backend-proof.yml), so the config check will read that file, along with the live request against the temporary backend. S4's CI census, with its planted function, lands with the jobs guard in the same part.

## The DEC's costs (S7), for the supervisor

- **pg_net's grants are open, from the platform.** Its schema `net`, every `net.*` function (EXECUTE) and its two tables `http_request_queue` and `_http_response` (all table rights) are owned by `supabase_admin` and granted to PUBLIC, anon and authenticated. The migration role cannot revoke them (INC-981).
- **They are reachable only through raw SQL.** Visitors do not have raw SQL: the Data API exposes only `public` and `graphql_public` (S5, read above). The one SQL door that can call out is `job_call`, which is service-only (JC-4), and S4's census keeps it the only one.
- **A signature is on the wire, not a shared secret.** The secret stays in Vault and in the server's secrets. The queue and response tables, which PUBLIC can read, hold only the job name, the timestamp and an HMAC-SHA256 signature.
- **Replay is refused within the window.** The route (M3 plus the route) accepts timestamps from 300 s old up to 60 s ahead. A `(job, ts)` already claimed is refused before the lease, and the UNIQUE key on job_runs backs that up.
- **The target is fixed.** No caller's argument reaches the URL.

## Operator steps (after N1b-1 lands and is published; for the supervisor to send)

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

## Apply

**apply be0270dc → expect mark 20261029230000** (on ethio-staging, by the supervisor; prod is applied and its mark was read back).

## Files changed since 315f442f

- docs/governance/reports/foundations-turn-n1b.stop-3.md
- supabase/migrations/20261029072455_be0270dc-e88a-4a72-abee-14468885579d.sql
