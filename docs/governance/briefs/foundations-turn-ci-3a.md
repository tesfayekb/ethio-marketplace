```text
RULING — turn CI-3a: image pulls survive the registry's limit (A) and the checks' fast line (C). Base: dev febe6922 (bc2e2ba5 plus the plan file). Tier B (CI infrastructure). No migration, no new dependency, no new string, no app code. Lovable. Saved as docs/governance/briefs/foundations-turn-ci-3a.md; roadmap line 3 names it.

STEP 0
- Save this ruling (the text between the message's BEGIN and END lines) byte for byte as docs/governance/briefs/foundations-turn-ci-3a.md, in one fenced block, and prove its sha256 equals the value after END.
- Roadmap line 3 names it. Check roadmap.md with prettier before you commit (INC-1019).

CI: the run on bc2e2ba5 is SUCCESS (run 41166607542, 04:19Z), and main moved up to it. S2b is closed.

YOUR PLAN, RULED (G17; the supervisor's calls, overridable):
- Approved: the order (A and C now, B next turn), no start retry ever, CF-CI-IMG-1, the pull script's backoff, C as planned.
- Premise 1 is settled without a probe-and-stop. The CLI's default registry is public.ecr.aws: the CLI's maintainers tell users who hit it to switch with SUPABASE_INTERNAL_IMAGE_REGISTRY (supabase/cli issue 2210). "toomanyrequests: Rate exceeded" is ECR Public's throttle wording. The design below does not depend on the answer anyway: it saves whatever images the CLI itself uses, and prints their names into local-backend-proof.md for the record.
- The 20 functions: your list matches ethio-staging exactly; the supervisor read it there (public schema, anon may execute, not extension-owned).
- DEC numbers: A is DEC-309, B is DEC-310, C is DEC-311. The records turn imports their text; this turn writes no ledger entry. Code comments may cite these numbers.

A — DEC-309: the backend images once per run
1. Census first, by definition: every job in .github/workflows/** that runs `supabase start`, file:line. The supervisor's grep at febe6922 finds one step, local-backend-proof.yml :475, run by every lane of its matrix: the 16 numbered lanes, smoke, e-mail and repeat, and the nightly if it calls this workflow. Each one moves onto the mechanism; none is left.
2. A job `backend-images` runs once per run, before every job in the census.
   - Its cache key: the CLI version, plus a hash of whatever decides the image set (supabase/config.toml, the services the jobs exclude, anything else the census finds).
   - On a cache hit: nothing is pulled, and the job ends in seconds.
   - On a miss: the image list comes from the CLI itself, never a hand-written list (for example one start with the lanes' excludes, then `docker ps --format '{{.Image}}'`). The images are pulled through scripts/ci/pull-images.sh, saved as one compressed tarball with images.txt beside it, and the cache is saved.
   - Use the cache only, one copy; no run artifact.
   - The report states the tarball's size. If it is over 4 GiB compressed, STOP with the numbers: the repository's cache is shared.
3. Each job in the census needs `backend-images`, restores the exact key, runs `docker load`, and checks that every name in images.txt is present (`docker image inspect`) before its one `supabase start`.
   - If the restore or the load fails, pull-images.sh pulls images.txt (4 tries, jittered backoff, under with-deadline.sh), then the start.
   - If the pull gives up, the job fails BEFORE `supabase start`, and the evidence classifies it in one line as "registry refusal — infrastructure". No migration has run.
4. The replay's cause. From the start logs of the four failed runs (aed7904b lane 5, d2e9bb36 lane 2, e195034e lane 3, b3e8dba2 lane 3), say what ran the migrations a second time: the CLI's own retry around a failed pull, or something else. DEC-309 records it. "Impossible by construction" holds only for the path where every image is local before the start; say so in those words.
5. CF-CI-IMG-1 (scripts/conformance/), by definition over every workflow file:
   - every job that runs `supabase start` needs `backend-images` and runs the load-and-inspect step before the start;
   - no `supabase start` sits in a retry loop or runs twice in a job.
   - Planted cases: a job without the load step fails; a start inside `until` or `for` fails.
   - wired.test.ts names its caller.
6. DEC-309's frozen rule (yours, kept):
   - Over the next 10 completed runs on dev after landing, count the jobs whose pull or start fails on a registry refusal (the evidence matching `toomanyrequests|rate exceeded|pull access denied`).
   - 0 → keep. 1 or more → the fallback, in its own turn under its own DEC.
   - Any "refused:replay" from a start → a defect in DEC-309, fixed at once.
   - The fallback, in this order: ghcr.io with GITHUB_TOKEN, if every image in images.txt exists there (the images job checks with a manifest inspect on a miss, and prints yes or no per image into the evidence); otherwise authenticated ECR Public with a secret the operator adds.
   - The first run after landing is a cache miss and counts in the ten. The cache-hit count is reported beside the rule, for information only.
7. Tests: pull-images.sh's backoff schedule and its give-up path, with a stubbed docker; CF-CI-IMG-1's planted cases. Run actionlint only if it is already in the toolchain; no new dependency.

C — DEC-311: the checks' fast line (yours, as planned)
- `bun run checks` prints `checks (fast): N PASS · N FAIL · Ns`, naming the steps it covers, once the fast steps finish, then continues.
- The final line keeps its form and stays the only verdict.
- TC-E1 and TC-E2 as planned.
- From now on a report may paste the fast line with "slow steps: not finished — CI judges". It never presents the fast line as the verdict.

B — DEC-310, next turn (CI-3b). Its rulings are fixed now, so nothing waits:
- (a) DEC-132 rule 2 stands; no amendment. An unlisted anon-executable function fails with its count only.
  - No hash: a hash of a name drawn from the repository's own function names is as good as the name.
  - No artifact: a public repository's artifacts are public too.
  - The failure line prints the read-only query that names it. The executor runs it on its connected project; the supervisor runs it on ethio-staging.
  - A stale list line prints its name, because the list is already public.
- (b) The list holds grants to authenticated and PUBLIC as well as anon, for example publish_listing. So each line gains its roles (`<name> | <roles> | <reason>`). The lint compares the anon-executable set with exactly the lines whose roles include anon. Without this, an authenticated-only door that became anon-executable would pass because its name is on the list.
- (c) One parser for the list, read by both guards, check-migrations.sh included. A planted line proves both read it the same way.
- (d) The same comparison for authenticated is a K2 line and a roadmap line, not this turn.
- (e) The query is text in the script, not a new database function: no migration.

SCOPE (by area):
- .github/workflows/** (every job in A's census);
- scripts/ci/** (pull-images.sh, new; turn-checks.sh, turn-checks.ts and their tests);
- scripts/conformance/** (the CF-CI-IMG-1 test, wired.test.ts);
- docs/features/ (the CI and local-backend docs);
- docs/governance/mechanisms.md (the register row);
- docs/_changelog.md, roadmap.md, the brief and the report.
- AGENTS.md is not in scope, nor the spec ledger.

HOW TO WORK: K1–K6.
- Write the report, docs/governance/reports/foundations-turn-ci-3a.report.md, BEFORE `bun run checks`. It covers:
  - step 0's sha256;
  - the CI line for bc2e2ba5;
  - A's census, each job before and after;
  - the cache key and what goes into it;
  - the tarball's size (or "measured by the first run");
  - the replay's cause (item 4);
  - CF-CI-IMG-1's definition and its planted cases;
  - C's fast-line step list;
  - the unit count;
  - K2;
  - git diff --name-only febe6922.
- Then `bun run checks` once on the final tree, run whole, and add its last line (or, with C landed, its fast line) to the report. If a step fails, fix it at its root and say so. If the turn's time runs out first, push with "checks: not finished — CI judges". A turn never ends without its report.

Push, and END THE TURN.
```
