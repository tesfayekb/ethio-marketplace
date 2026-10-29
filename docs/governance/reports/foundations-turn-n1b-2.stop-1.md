# Foundations turn N1b-2 — stop 1 (N1b-2a: the CI reds and M1)

## CI line

ci-evidence (raw, read 08:4x UTC): ci-status.md names `79bd0d0d` CANCELLED (E2E preflight cancelled, every other job success); guards-last-failure.md: no failed build/guard jobs; e2e-last-failure.md: run 40837992834 passed. The run on c0e006ee was not yet in the evidence files; its three reds are as the ruling classified them.

## C1 — INC-982 — fixed

`bun run i18n:usage`: 1,749 keys across **609** files; both `docs/generated/i18n-usage.json` and `public/i18n-usage.json` regenerated. AGENTS.md gains the checks line (after the CI-first line): "Before a turn ends: after adding, moving or removing any file under src/, or changing a t() call, run bun run i18n:usage and commit both maps (INC-982)." AGENTS.md now 10,220 bytes after the block; `agents-lines-allowlist.txt` key moved 10065 → 10220 with the reason; AGL tests pass.

## C2 — INC-983 — fixed

a. `src/routes/api/public/jobs.test.ts`: `const SECRET = randomBytes(32).toString("hex")` (node:crypto); no secret-shaped literal left. Test file passes (14 tests with AGL).
b. `.gitleaksignore`: the two fingerprints with the INC-983 comment, in the file's form.
Class rule in docs/conventions.md: "A test never writes a secret-shaped literal; it makes its fake secret at run time".

## C3 — INC-984 — cause found: hypothesis (a)

- Source, supabase/cli tag v2.120.0 cloned in the sandbox: `apps/cli-go/internal/db/start/start.go:35` embeds `templates/webhook.sql` and writes it into every local start (line 96, unconditionally). `webhook.sql:35` creates `supabase_functions.http_request()` — `LANGUAGE plpgsql`, `RETURNS trigger`, not extension-owned — whose body calls `net.http_get(` (line 76) and `net.http_post(` (line 91). The S4 census (prolang plpgsql, not event_trigger, not extension-dependent, schema not net) names it, so `check-outbound-calls.ts` failed with "calls net.* outside job_call". (b) is not needed to explain it; S5 is unchanged and still matches PGRST106.
- Fix: `scripts/conformance/outbound-calls-allowlist.txt` — one line, `supabase_functions.http_request() | created by the CLI's local stack, not by our migrations; absent on ethio-prod (read 2026-10-29) | CLI 2.120.0`. The guard reads the pin from `local-backend-proof.yml` (`version: 2.120.0`); a pin change expires the line; an allowlisted key absent from the census fails as stale. No schema is excluded.
- Self-test: the fixture now also plants `supabase_functions.e2e_planted_caller()` (refused — the same schema is not excused) and carries the allowlisted function (not refused). `SELF_TEST=1` OK; a census without the platform function fails "stale".
- Evidence gap (i): today a lane's `- Step failure:` section is `local-backend-failure.txt` (Write lane evidence), and the merge (Write proof summary and notice) publishes it under `## Lane <lane>` in **docs/tracking/local-backend-proof.md** — the guard step simply never wrote that file. It now appends every `Outbound-calls guard FAIL:` line and, for S5, `S5 live FAIL: <header> answered HTTP <status>: <first 300 chars>` (redacted by the merge). Proof: `scripts/ci/lane-failure-evidence.test.ts` LFE-1 (the step writes three kinds of lines to that file; the fragment carries it) and LFE-2 (runs the workflow's own merge program over `scripts/fixtures/lane-smoke-step-failure.md`; the lines appear under `## Lane smoke`, the JWT masked) — 2 passed. actionlint `-shellcheck= -pyflakes=` clean.
- The staging Playwright red follows from smoke; no fix of its own.

## M1 — applied on ethio-prod

**apply 709fb25b → expect mark 20261030010000** (read back: present).

- `alias_history.released_state` (NULL or clean/unchecked/imitates; CHECK on a fixed set — immutable).
- `seller_public_alias(p_profile uuid, p_subject text DEFAULT 'alias') RETURNS text` — sql, STABLE, SECURITY DEFINER, `search_path = public, pg_temp`; the alias, or NULL while `name_checks` holds `imitates` on that exact text; an unknown subject answers NULL. Reads: the profiles primary key and the name_checks primary key (`name_checks_pkey (profile_id, subject)`) — two key reads, not one: the helper reads the column itself so no consumer has to (departure from the plan's "one lookup"; it keeps the guard simple).
- `seller_public_previous_alias(p_profile uuid)` — the latest release within 365 days, shown only when `released_state = 'clean'` (R1); a newer unclean release is not replaced by an older clean one.
- Both: REVOKE PUBLIC, anon, authenticated; EXECUTE to service_role only (read back: anon false, authenticated false). No browser grant, so no public-surface allowlist line.
- Proof: one scratch `e2e-n1b2-` seller through `save_posting_identity` and `name_check_mark`; SPA-1a–e and SPA-5a–e; sentinel rollback with a rollback check. A trial copy was run inside BEGIN … ROLLBACK first and left no column or function behind. No proof reads Vault or calls job_call.
- Conflict noted: the brief asks for EXPLAIN in the proof; the project memory rule says proofs assert behaviour, never a planner choice. The proof asserts none; the key reads are by definition primary-key lookups.
- 0 rows carry `released_state` until M3 stamps releases; prod's 1 previous name within 365 days is a legacy NULL and is withheld from public reads once M2 lands.

## Next

N1b-2b M2 (`public_listing_json` whole), then M3 (`seller_feed_page`, `my_seller_line`, release stamping in `save_posting_identity` and `admin_update_profile`), each its own stop.
