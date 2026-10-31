# Turn CI-3 — the CI harness: image pulls, one public surface, the finish rule

Base dev bc2e2ba5 (checked out here). Tier B. No migration, no new dependency, no new string, no app code.

## CI first

- The ci-evidence branch still shows **3d94bd6b**, not bc2e2ba5. Run 41163450560 failed in the smoke lane and lanes 8 and 15. S2b-2 dealt with those failures (the nine page-size limits and TB-1).
- The run on bc2e2ba5 has not published yet. The build turn reads it first. Any red that is not infrastructure is fixed before A, B or C.

## Premises the census found wrong or open

1. **Which registry.** The evidence never names it. local-backend-proof.md prints the CLI version and the status variables, but not the image references. CLI 2.x is believed to pull from AWS ECR Public (`public.ecr.aws/supabase/*`), whose anonymous throttle says "toomanyrequests: Rate exceeded". That is a belief, not a finding. The build's first step proves it: one lane runs `supabase start --debug` with `docker images --format '{{.Repository}}:{{.Tag}}'` written to the evidence (names only). A's design is set from that answer. If the registry is not ECR Public, the build STOPs and reports.
2. **B names objects; DEC-132 rule 2 says counts only.** scripts/security-lints.ts:13 says "no object name ever reaches the log". Failing "naming it" breaks that rule.
   - Proposed ruling: a name may be printed only when it is on the list (already public in the repo) or stale.
   - An unlisted anon-executable function fails with its count and a hash of its name, never its name. This also respects the public-repository law: an unlisted function may be an open hole.
   - The full name goes only to the job's step summary, under a masked artifact the operator can read. This needs DEC-132's rule 2 amended in DEC-B.
3. **The 20 functions.** I read them on ethio-prod (read-only). There are 51 anon-executable functions. 31 belong to the pg_trgm extension, which the lint excludes. The other 20 match the baseline exactly (table below).

## A. Image pulls survive the registry's limit (DEC-A)

- **Concern:** a lane's backend start fails on the registry's anonymous pull limit, then a retried start replays migrations ("refused:replay", deadlock).
- **Mechanism today:** .github/workflows/local-backend-proof.yml:475. That is one `supabase start` per lane, 18 lanes at once, with no pull step and no retry. setup-cli v3.0.1, CLI 2.120.0 at :186–191.
- **Change:**
  1. A new job, `backend-images`, runs once per run. It resolves the image list (premise 1), pulls each with retry, and saves them to one `docker save` tarball. The tarball is uploaded as a run artifact keyed by CLI version and image digests (actions/cache, keyed the same way).
  2. Each lane downloads the tarball and runs `docker load` before `supabase start`. The start then finds every image locally and pulls nothing.
  3. If the load fails, the lane runs a pull-only step, `scripts/ci/pull-images.sh`. It tries 4 times with jittered backoff (5, 15, 45 s ± 30%) under `with-deadline.sh`, then starts.
  4. **No start retry, ever.** The start stays single-shot, as INC-944 already states. A failed pull stops the lane before `supabase start`, so no migration has run. That makes "refused:replay" impossible by construction.
  5. Fallback (only if the rule below trips): authenticated pulls through an ECR Public login with an AWS role. The operator would add one secret, `ECR_PUBLIC_ROLE_ARN`. It is not needed now.
- **Not chosen:**
  - Staggered starts: they add minutes to every run and only lower the chance of a refusal.
  - A third-party mirror: it would be a new outside dependency.
- **Guard:** CF-CI-IMG-1 in scripts/conformance/ (a workflow census). Every job that runs `supabase start` must depend on `backend-images` and run the load step before the start. No step may run `supabase start` inside a retry loop or twice.
  - Planted cases: a lane without the load step fails; a `supabase start` inside `until`/`for` fails.
- **DEC-A frozen rule:** over the next 10 completed runs on dev after landing, count lanes whose start or pull fails on a registry refusal (the evidence's start log matching `toomanyrequests|rate exceeded|pull access denied`).
  - 0 → keep.
  - 1 or more → the authenticated-pull fallback, with its own turn.
  - Any "refused:replay" from a start → a defect in this DEC, fixed at once.
- **Tests:** a unit test for pull-images.sh's backoff schedule and give-up path (stubbed docker). The CF-CI-IMG-1 planted cases. `actionlint -shellcheck= -pyflakes=` on the workflow.

## B. One public surface (DEC-B)

- **Concern:** one list of what browser roles may execute. Today there are two:
  - scripts/public-surface-allowlist.txt, read by scripts/check-migrations.sh for grants after M1;
  - the count in scripts/security-lints-baseline.json:4, read by scripts/security-lints.ts:147 through `compareLints`.
- **Change:**
  1. Complete the list with the 20 functions anon executes today, each with a reason. Names already on it are restated, not duplicated. The reasons are checked against each function's body when built:

     | function | reason |
     | --- | --- |
     | feed_page, seller_feed_page, public_listing | public feed and ad reads; approved rows only |
     | get_browse_tree, get_category_tree_version, get_category_attributes, catalog_find_version | public category tree and attributes, version-cached |
     | get_location_tree, get_location_tree_version, get_open_countries | public places and open markets |
     | get_ui_bundle, get_ui_bundle_version, get_ui_bundle_parts | public UI strings (INC-095, INC-1023); get_ui_bundle retires per roadmap |
     | get_entity_bundle | public entity names |
     | legal_in_force, legal_scheduled | public legal texts |
     | price_unit_labels, price_shape_for_basis | price unit words and shape |
     | sold_cutoff, sold_visible_days | sold-ad 30-day window (D175) |

  2. A new reader, `security_lint_anon_functions()`. The smoke lane reads it on the temporary backend through the existing DB_URL `--tsv` path (DEC-240), so no migration is needed. It returns the names that `function_executable_by_anon` counts, using the same filter (public schema, not extension-owned).
  3. `compareSurface(names, list)`, a pure function in scripts/security-lints.ts:
     - an anon function not on the list → FAIL, printing its count and hash (premise 2);
     - a function-shaped list line with no live function → FAIL as stale, printing its name.
     Table and column lines (e.g. `listings`) are typed by a `kind` field, so they are never judged as functions.
  4. `function_executable_by_anon` leaves security-lints-baseline.json. Its count becomes informational, derived from the list. docs/features/security-scanning.md records the retirement.
- **Guard:** the comparison is the guard. Planted cases SLB-1 (unlisted → fail), SLB-2 (stale → fail), SLB-3 (exact match → pass), SLB-4 (no name in output for an unlisted one). They are wired in wired.test.ts.
- **DEC-B frozen rule:** the list is the one surface. Any future anon or authenticated grant needs exactly one list line, read by both guards.
  - Kept if, over the next 10 runs, the smoke lint and the migration guard never disagree on a function.
  - Any disagreement → a defect fixed in place, no second list.

## C. The finish rule in the instruments (DEC-C)

- **Concern:** `bun run checks` (scripts/ci/turn-checks.sh → turn-checks.ts) prints its verdict only at the end, after about 16–23 minutes.
- **Fit:** it fits without weakening anything. The steps and their order do not change; the slow ones (build + page budgets, guards that build) run after the fast ones already.
- **Change:** add a `--early` milestone line, on by default. When format, lint, typecheck verdict, unit, i18n maps and the non-build guards finish, it prints `checks (fast): N PASS · N FAIL · Ns` and then continues. The final line keeps its form, `checks: N PASS · N FAIL · N NOT RUN · Ns`, and stays the only one that counts as the checks' verdict.
- The reporting rule becomes: a report may paste the fast line with "slow steps: not finished — CI judges". It never presents the fast line as the final verdict.
- **Guard:** a unit test (TC-E1) shows the fast line is printed before any build step starts and that a fast FAIL still makes the run exit 1 at the end. TC-E2 shows that a run stopped after the fast line exits non-zero, not PASS.
- **DEC-C frozen rule:** kept while the fast line's set of steps is a subset of the final line's and no step is skipped. Any step moved out of the final verdict reverses it.

## Turns

Two turns, to respect S500:

- **CI-3a:** premise-1 probe, A, and C (workflow and scripts only; C is small).
- **CI-3b:** B, after the operator rules on premise 2.

Each turn writes its report before the full checks.

## Technical files

- CI-3a: .github/workflows/local-backend-proof.yml, scripts/ci/pull-images.sh (new), scripts/ci/turn-checks.ts and its test, scripts/conformance/ci-images.test.ts (new), wired.test.ts.
- CI-3b: scripts/public-surface-allowlist.txt, scripts/security-lints.ts and its test, scripts/security-lints-baseline.json, the smoke-lane step in the workflow, docs/features/security-scanning.md.
- Both: the register row in docs/governance/mechanisms.md, one docs/_changelog.md line each, and the DECs in the decision log.
