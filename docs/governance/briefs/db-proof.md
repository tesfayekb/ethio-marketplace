# Local database for proofs (lane B; DEC-343) — the task

Base: dev c89271ca2

````text
TASK — LOCAL DATABASE FOR PROOFS (lane B; DEC-343, approved by the operator 2026-11-05). Base: origin/dev at the moment you start (name its short SHA; c89271ca2 unless dev moved). PLAN FIRST, then build on my ruling. Do not run anything heavy while the P-2 lane (cursor/p2-plan) is running its checks.
**MODEL — Claude Opus 5.5 (High)**

LANE RULES: your own worktree on branch cursor/db-proof from origin/dev; roadmap line 3 stays; add LINE 4 "Lane B (build): docs/governance/briefs/db-proof.md". STEP 0: save this task unchanged as docs/governance/briefs/db-proof.md (one fenced block; `Base: dev <sha>` on its own line), commit, push, draft PR "Local database for proofs (DEC-343)". Never rebase. Commit subjects ≤ 72 characters.

THE SYSTEM (G0)
CONCERN: a migration is applied to a database before it is pushed, so a proof's mistake costs seconds on the operator's Mac, not a 30-minute CI round (2026-11-04/05: INC-1052, INC-1054, INC-1055, INC-1059, INC-1060 — each found only by CI).
MECHANISM TODAY: .github/workflows/local-backend-proof.yml — "Prepare temporary working copy" (the bucket seed, the skipped file, the named patches, the hosted-platform and account fixtures) and "Start backend and apply all migrations" (DEC-313: start with no migrations, then `supabase migration up` with pg_cron and autovacuum held; the DEC-340 server-record capture), scripts/ci/local-backend-config.toml, scripts/ci/start-failure-excerpt.mjs. NONE YET: a local entry point.
BUILD:
(1) The working-copy preparation moves OUT of the workflow into ONE script, scripts/ci/prepare-local-backend.sh, which the workflow step then calls — byte-identical behaviour, never a second copy of the fixtures or patches.
(2) `bun run db:proof`: checks Docker is running (one clear line if not), starts a throwaway local stack from the prepared copy with the CLI version CI pins (run through the project script only, no global install), applies every migration with the same holds CI uses, prints PASS with the migration count, or the failing file with the server's error record (the DEC-340 extraction — the same function, not a copy), and leaves the stack running for a quick re-run (`db:proof --stop` stops it; `--fresh` wipes it).
(3) Rule 50 amended: the agent may run `bun run db:proof` and nothing else that starts or talks to a database; never `supabase link`, `login`, `db push`, a URL that is not localhost, or any staging or production credential — the stack's own local demo keys only, never printed.
(4) Rule 30 (migrations) amended: every migration turn runs `bun run db:proof` before its push and pastes its last line in the report.
DEC-343's frozen rule (G22 — the harness is closed; this is its named exception): ADMITTED only when db:proof passes on dev's head, fails on a planted bad migration (never committed) showing the server record, and CI's lanes stay green on the extracted script. If CI's preparation changes at all, it is reverted.
FIVE LENSES — security: localhost only, no credential ever read or written, the rule's refusals named · performance: the image cache reused, a warm start measured (ESTIMATE ~2 minutes) · failure modes: Docker off / port in use / disk full each named in one line, never a hang · consistency: one preparation script for CI and the Mac · future growth: the same command can serve the e2e lanes locally later.
PHASE 1 — the plan (no code, no Docker): the exact lines that move out of the workflow; the script's interface; how db:proof reuses the DEC-340 extraction; the CLI pin and how it runs without a global install; disk and memory needs; whether the ports CI uses collide with anything on a Mac; the rule-50 and rule-30 text; the planted-file proof; every premise above you find wrong. STOP with the plan posted.
````
