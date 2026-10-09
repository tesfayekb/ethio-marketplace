# Bundle 10 — the feed engine: brief, version 9 (saved unchanged, 2026-10-09)

```text
BUNDLE 10 — THE FEED ENGINE, VERSION 9 (2026-10-09). THIS FILE REPLACES VERSION 8. Turn 9 built the listings pages (E3b). This version specifies TURN 10 = PART E3c, the speed judge of the feed-engine spec's §5 (D101), under DEC-166:
- ONE migration: `feed_bench`, a read-only database function, service role only, that times feed_page inside the database;
- scripts/feed-bench.ts: it seeds 100,500 scratch listings on ethio-staging, times six page shapes, removes everything, and writes docs/tracking/feed-bench-status.md;
- a new workflow, .github/workflows/feed-bench.yml: it runs daily at 05:10 UTC and on demand, publishes the status file to branch ci-evidence, and is red when a target is missed;
- two small fixes: INC-518 and INC-519.
Tier B (CI infrastructure and a service-only read function). The migration rules apply in full.
The supervisor ran the migration text below on a local Postgres 16 copy:
- every proof passes;
- a variant that grants anon fails P2;
- a variant that accepts 201 runs fails P3;
- scripts/check-migrations.sh: every guard OK.
Line numbers are as of commit 0a0a7687 (dev). This file is public: it is written as build instructions.

ANSWERS TO TURN 9
- Verified by diff of b987d837..0a0a7687:
  - the saved brief equals version 8;
  - exactly the twenty files of the report;
  - feed-page.ts, the hook, the category lookup, the page, the card, the breadcrumbs, the two scanner fixes, FS-1 to FS-6, the spinner route, PW-94, FP-1 to FP-6, the selector and the docs are as specified.
  The ":107" you named in list-action-labels.ts is :108 at b987d837; no difference that matters.
- CI green on 0a0a7687 (run 37906384127, promoted: main = dev). Part E3b is CLEAN. INC-503, INC-504 and INC-505 are closed by it, and INC-516 and INC-517 by its two fixes.
- Two small findings from the diff read; both are fixed in this turn (E3c.4):
  - INC-518: labelOf's `placeId ?? ""`;
  - INC-519: FS-6's middle assertion can pass before the second answer arrives.

WHAT THE JUDGE IS (D101 §5, DEC-166)
- The targets, frozen in D101:
  - p95 server time ≤ 50 ms per page, for each of six shapes;
  - one page ≤ 30 KB (30,720 bytes).
- "Server time" is measured inside the database. feed_bench calls feed_page 33 times per shape; the first 3 calls warm up and are not counted. The p95 is the nearest-rank 95th percentile of the other 30: the 29th smallest.
- The data: 100,500 scratch active listings on ethio-staging:
  - in 15 scratch top categories, 150 second-level categories, 9 third-level categories and 4 guests;
  - in 10 scratch regions with 10 scratch cities each under Ethiopia, plus one empty scratch city;
  - 1 % premium, 3 % featured, the rest regular, spread over 60 days;
  - plus 500 in one leaf × one city.
  Everything is removed at the end of every run.
- Not measured here, and named in the status file as not measured:
  - the cached first page's time to first byte (≤ 100 ms): it needs the published site, which no test touches (DEC-146);
  - the first page on slow 3G (≤ 1.5 s, indicative): it needs a browser.
- A red run is a MISS. It is registered as an incident, and the database design is revised before the next screen bundle (the D98 menus) is built (DEC-164).
- ESTIMATE, from the supervisor's local copy (2 cores, 100,500 listings, 1,241,759 index rows): p95 ≤ 2 ms for every shape, and a page of 20 cards ≈ 10.5 KB. Staging's numbers replace these.

STEP 0 — keep this brief
- Save this file byte for byte OVER docs/governance/briefs/bundle-10.md (it is already in its saved form). roadmap.md line 3 stays as it is. Tick no roadmap line. On every later turn, read the brief first.

HOW TO WORK
- Order of the turn:
  1. step 0;
  2. E3c.0, the read-only census. If any result differs from what it expects, STOP and report: write nothing else;
  3. E3c.1 to E3c.5: the script, its unit tests, the workflow, the two fixes, the docs;
  4. the checks;
  5. E3c.6 LAST: the migration, then its read-back;
  6. the report;
  7. END THE TURN.
  Do not stop between steps.
- The migration is the last thing written because the database tool applies it on ethio-prod the moment it is saved. The operator will see the "Modify Supabase database" dialog and allow it.
- If any rule of yours conflicts with the text, STOP before saving and quote that rule's exact words in the report.
- Do NOT run scripts/feed-bench.ts in this turn, locally or anywhere. Its first run is the operator's, from GitHub Actions, after CI on this turn's final commit is green and ethio-staging holds the mark.
- The turn starts by reading CI for the last commit on dev:
  - read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md;
  - then e2e-last-failure.md and guards-last-failure.md at the same address;
  - paste the first six lines of ci-status.md.
  You cannot git-fetch that branch. A red there is fixed first.
- Production reads are SELECT-only. Reports carry counts, booleans and names of tables, columns, functions, roles and permissions. Never an e-mail address, a user id, a token or a row of user data.
- Browser tests: try once (`bun run e2e:local e2e/feed-screens.spec.ts`). If it does not start, write "local browser runs unavailable"; CI on the final commit is the proof (INC-506). Nothing runs against ethio-prod or the published site.
- Tests (G38): no assertion loosened, no timeout raised, no retry added. A test this brief does not name is not edited.
- No package or dependency change: the script uses @supabase/supabase-js and node:fs, which the repository already has. No message key changes.
- Scope — these files only:
  - one new migration file under supabase/migrations/ (the database tool names it);
  - scripts/feed-bench.ts (new), scripts/feed-bench.test.ts (new);
  - .github/workflows/feed-bench.yml (new). DEC-166 names this one workflow under G22; no other workflow file changes;
  - src/features/feed/feed-page.ts and src/features/feed/feed-page.test.ts (INC-518 only);
  - e2e/feed-screens.spec.ts (FS-6 only, INC-519);
  - docs/features/feed-engine.md, docs/_changelog.md;
  - the brief.
  The platform may regenerate src/integrations/supabase/types.ts. That is allowed; name it in the report. Name any other file in the report's first lines, with its reason. Delete no file.
- Closed surfaces (G22): every existing workflow file, the failure reporter, scripts/publish-evidence.sh, scripts/check-migrations.sh, the e2e helpers and e2e/global-setup.ts are not touched.
- Checks before the migration. Run each one whole, as CI runs it, and paste the last line of each:
  - `bun run typecheck`
  - `bun run format:check`
  - `bun run lint`
  - `bun run test:unit`
  - `bun run i18n:map-guard`
  - `bun run scripts/e2e-select.ts --self-test`
  - `bun run build`

THE MIGRATION RULES (G39 — every one applies)
- The text is in the appendix at the end of this brief. Write it EXACTLY, changing only `<MARK>`.
- Check it in a scratch folder first:
  - copy supabase/migrations/*.sql into a temporary folder;
  - add the text under a name of the form 20261009000000_bench-check.sql;
  - run `MIGRATIONS_DIR=<that folder> bash scripts/check-migrations.sh`.
  Paste its "guard OK" lines: Born-closed, Definer, Self-marking, Public-surface, Real-row proof, and "Migration guard OK".
- `<MARK>` is chosen at apply time:
  - read now() at time zone 'utc' on ethio-prod;
  - round it up to the next whole hour and add one hour (add twelve hours instead if the save dialog may wait);
  - the mark must be later than the saved file's own stamp and above the newest mark in public.migration_marks on ethio-prod (20261009200000 at this brief).
- Then hand the FINAL text to the database tool ONCE. Never a stub, a comment or a draft (INC-491).

PART E3c — THE SPEED JUDGE

E3c.0 — THE CENSUS (read-only; paste each result):
- (a) `ls .github/workflows` → five files: ci-status-report.yml, ci.yml, guard-proof.yml, nightly-e2e.yml, zap-baseline.yml.
- (b) `grep -n "cron" .github/workflows/*.yml` → one line: nightly-e2e.yml :7, "0 6 * * *".
- (c) `grep -c "bun-version: 1.3.14" .github/workflows/ci.yml` → 12 (the one other bun-version line, :174, says latest; the new workflow pins 1.3.14).
- (d) `grep -n "PROD_REF =" scripts/security-lints.ts` → :35 (the production project's reference, used to refuse it).
- (e) `grep -n "placeId ?? \"\"" src/features/feed/feed-page.ts` → :122.
- (f) `grep -n "feed-retry\").click()" e2e/feed-screens.spec.ts` → :296 and :298.
- (g) On ethio-prod with your query tool: `select max(version) from public.migration_marks;` and `select count(*) from pg_proc where proname = 'feed_bench';` → 20261009200000 (or later) and 0.

E3c.1 — THE SCRIPT: scripts/feed-bench.ts (new). Run with `bun scripts/feed-bench.ts`. It follows scripts/security-lints.ts in form:
- pure functions exported for the unit tests;
- `main()` runs only when the file is the entry (`process.argv[1]` includes "feed-bench");
- exit 0 on a pass, 1 otherwise.
- Constants:
  - TARGET_P95_MS = 50; TARGET_BYTES = 30720;
  - RUNS = 33; WARMUP = 3;
  - LISTINGS = 100000; HOT = 500; BATCH = 1000;
  - STAGING_REF = "jatpuhfdjfzctjipklmk".
- Exported pure functions:
  - `nearestRank(ms: number[], q: number): number` — sort ascending and take index ceil(q × n) − 1; for an empty list, throw.
  - `summarise(ms: number[]): { runs: number; p50: number; p95: number; max: number }` — over the list given (the caller has already dropped the warm-ups).
  - `verdict(shapes: ShapeResult[], bytes: number, leftovers: number): { pass: boolean; lines: string[] }`, where ShapeResult is `{ name: string; runs: number; p50: number; p95: number; max: number; cards: number }`. It fails when:
    - any p95 > TARGET_P95_MS;
    - any shape has fewer than 20 cards (that shape measured too little);
    - bytes > TARGET_BYTES;
    - leftovers > 0.
    Each failure names its shape or number in one line.
  - `renderStatus(input): string` — the markdown of docs/tracking/feed-bench-status.md, in this form (the lines below, without their leading spaces):
    # Feed bench (auto-generated — do not edit by hand)

    - Run: <RUN_URL, or "local">
    - Commit: <RUN_SHA, or "local">
    - Timestamp (UTC): <ISO time>
    - Verdict: PASS | MISS | FAILED (<the error's first line, at most 200 characters>)
    - Listings seeded: <n> · seed <s> s · cleanup <s> s · leftovers <n>

    | Shape | Runs | p50 ms | p95 ms | Max ms | Cards |
    | ... one row per shape, ms to two decimals ...

    - Page size (all categories, everywhere): <bytes> bytes (target ≤ 30720)
    - Targets (D101 §5, DEC-166): p95 ≤ 50 ms per shape; one page ≤ 30,720 bytes.
    - Not measured here: the cached first page's time to first byte (≤ 100 ms) needs the published site; the first page on slow 3G (≤ 1.5 s) needs a browser.
    Numbers and shape names only: never a row's data, an id, a slug or an e-mail address.
- main(), in this order:
  1. Read E2E_SUPABASE_URL and E2E_SUPABASE_SERVICE_ROLE_KEY. If either is empty, or the URL does not contain STAGING_REF, print `::error::` with the reason and exit 1. It never runs against any other project.
  2. The tag: `P = "e2e-bench-" + (process.env.GITHUB_RUN_ID ?? "local") + "-" + <six random lowercase letters>`. Use the client `createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } })`.
  3. Pre-clean the leftovers of an earlier run, in this order:
     - listings whose title starts "e2e-bench-": read 1000 ids at a time and delete them by id until none are left;
     - category_tree_pointers whose child or parent is a category whose slug starts "e2e-bench-", then those categories;
     - locations whose slug starts "e2e-bench-": cities first, then regions.
     The nightly's sweep removes leftover users on @ethio-e2e.invalid after 24 h.
  4. Seed (measure the seconds):
     - the seller: `auth.admin.createUser({ email: P + "@ethio-e2e.invalid", password: <24 random characters>, email_confirm: true })`;
     - Ethiopia: `locations` where level = 'country' and country_code = 'ET' (one row, read only);
     - categories (name_en = slug; is_active true; is_catchall false; display_order 9200):
       - 15 tops `${P}-t1` … `${P}-t15`, allow_listings false, each with a root pointer (parent_id null, is_primary true);
       - under each top, 10 second-level categories `${P}-s<i>-<j>` (pointer to the top, is_primary true), allow_listings true;
       - the first three second-level categories of top 1 become folders (allow_listings false), each with 3 children `${P}-x<j>-<k>` (pointer, is_primary true);
       - the first four second-level categories of top 2 also get a pointer under top 3 with is_primary false — the guests;
       - the leaves are every second-level category that is not a folder, then the 9 third-level ones: 156 in all, in that order;
     - places (is_active true; source "admin"; country_code "ET"):
       - 10 regions `${P}-r1` … `${P}-r10` under Ethiopia;
       - 10 cities `${P}-c<i>-<j>` under each region (center_lat 9.03, center_lng 38.74);
       - one more city `${P}-cempty` under region 1, with no listing;
       - the cities, in order, are 100;
     - listings, in batches of BATCH rows, one insert per batch, no returned rows. For g = 1 … LISTINGS:
       - category: leaves[(g × 7919) mod 156];
       - location: cities[(g × 104729) mod 100];
       - tier: premium when g mod 100 = 0, else featured when g mod 25 = 0, else regular;
       - published_at: now minus (g mod 86400) minutes;
       - title `${P}-<g>`; description "e2e bench listing"; status "active"; home_country_code "ET"; the seller.
       Then HOT more with category leaves[0], location cities[0], tier regular, published_at now minus g minutes.
  5. Measure. For each shape, `rpc("feed_bench", { p_category_id, p_location_id, p_after, p_runs: RUNS })`, drop the first WARMUP numbers of `ms`, summarise, and keep `cards`. The shapes, in this order and with these names:
     - "all, everywhere": null, null, null;
     - "top, country": top 5, Ethiopia, null;
     - "leaf, city": leaves[0], cities[0], null;
     - "top, city, widening": top 5, the empty city, null;
     - "page 50 by cursor": null, null, and the `next` of page 49. Reach it by calling `rpc("feed_page", { p_category_id: null, p_location_id: null, p_after, p_size: 20 })` 49 times, starting with null and passing each answer's `next` on;
     - "guest host, country": top 3, Ethiopia, null.
     `bytes` is the first shape's.
  6. Clean up, in a finally block, whatever happened before:
     - listings of the seller, 1000 ids at a time, until none are left;
     - then the pointers and the categories with slugs starting P;
     - then the cities and the regions with slugs starting P;
     - then `auth.admin.deleteUser(seller)`.
     Measure the seconds. leftovers = the exact count of listings whose title starts P, plus categories and locations whose slug starts P.
  7. Write docs/tracking/feed-bench-status.md with renderStatus. RUN_URL and RUN_SHA come from the environment, or "local". Print the verdict's lines.
  8. Exit 0 when the verdict passes, 1 otherwise. A thrown error still runs step 6 and step 7 (Verdict: FAILED) and exits 1.
- No console line carries a row's data, an id, a slug or an e-mail address.

E3c.2 — THE UNIT TESTS: scripts/feed-bench.test.ts (vitest; scripts/**/*.test.ts is included):
- FB-1 nearestRank: [5, 1, 3, 2, 4] at 0.95 → 5; at 0.5 → 3; the 30 numbers 1..30 at 0.95 → 29; an empty list throws.
- FB-2 summarise([1, 2, 3, 4]) → runs 4, p50 2, p95 4, max 4.
- FB-3 verdict:
  - six shapes with p95 10, 20 cards each, bytes 10000, leftovers 0 → pass;
  - one p95 of 50.01 → fail, naming that shape;
  - one shape with 19 cards → fail;
  - bytes 30721 → fail;
  - leftovers 1 → fail.
- FB-4 renderStatus carries "Verdict: PASS", one table row per shape, and the "Not measured here" line.

E3c.3 — THE WORKFLOW: .github/workflows/feed-bench.yml (new), exactly this:

name: Feed bench

# D101 §5 / DEC-166 — the feed engine's speed judge on ethio-staging:
# 100,500 scratch listings, six page shapes timed inside the database
# (feed_bench), everything removed after. Daily and on demand; red when a
# target is missed. Evidence publishes to branch ci-evidence (DEC-098).
on:
  schedule:
    - cron: "10 5 * * *"
  workflow_dispatch:

# DEC-153 (a) — read-only by default; only the job that publishes holds write.
permissions:
  contents: read

concurrency:
  group: feed-bench
  cancel-in-progress: false

jobs:
  feed-bench:
    name: Feed bench (ethio-staging, 100,500 scratch listings)
    runs-on: ubuntu-24.04
    timeout-minutes: 45
    permissions:
      contents: write
    env:
      E2E_SUPABASE_URL: https://jatpuhfdjfzctjipklmk.supabase.co
      E2E_SUPABASE_SERVICE_ROLE_KEY: ${{ secrets.E2E_SUPABASE_SERVICE_ROLE_KEY }}
      RUN_URL: ${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}
      RUN_SHA: ${{ github.sha }}
    steps:
      - uses: actions/checkout@v5
      - uses: oven-sh/setup-bun@v2
        with:
          bun-version: 1.3.14
      - name: Install dependencies
        run: bun install --frozen-lockfile
      - name: Run the bench
        id: bench
        continue-on-error: true
        run: bun scripts/feed-bench.ts
      - name: Publish the status to ci-evidence
        if: always()
        run: |
          if [ ! -f docs/tracking/feed-bench-status.md ]; then
            mkdir -p docs/tracking
            {
              echo "# Feed bench (auto-generated — do not edit by hand)"
              echo
              echo "- Run: ${RUN_URL}"
              echo "- Commit: ${RUN_SHA}"
              echo "- Verdict: FAILED (the script wrote no status file)"
            } > docs/tracking/feed-bench-status.md
          fi
          bash scripts/publish-evidence.sh "chore(ci): feed bench status [skip ci]" \
            docs/tracking/feed-bench-status.md
      - name: Report the verdict
        if: always()
        env:
          OUTCOME: ${{ steps.bench.outcome }}
        run: |
          if [ "${OUTCOME}" != "success" ]; then
            echo "::error::Feed bench: a target was missed or the run failed (docs/tracking/feed-bench-status.md on ci-evidence)."
            exit 1
          fi
          echo "Feed bench passed."

E3c.4 — THE TWO FIXES.
- INC-518: src/features/feed/feed-page.ts, labelOf (:118–123).
  - After `const placeId = ladder[step - 1];`, add `if (placeId === undefined) return null;`.
  - The last line becomes `return { kind: "place", placeId };`.
  A missing ladder entry gives no label, never an empty place id. Add FP-7 to src/features/feed/feed-page.test.ts: feedSections with one card whose step is 3 and the ladder ["A"] gives one section whose label is null.
- INC-519: e2e/feed-screens.spec.ts, FS-6. Between the first `feed-retry` click (:296) and the assertion after it (:297), add `await expect.poll(() => n).toBe(2);`. The error then shown is the malformed answer's, not the first one's. Nothing else in the test changes.

E3c.5 — THE DOCS.
- docs/features/feed-engine.md: a section "## The speed judge (E3c)":
  - what feed_bench does, and who may call it;
  - what scripts/feed-bench.ts seeds, measures and removes;
  - the workflow (daily at 05:10 UTC and on demand) and where the status file lives (ci-evidence, docs/tracking/feed-bench-status.md);
  - the targets and the rule of DEC-166;
  - the two targets not measured here.
  In "What it does not do yet", remove the line about the performance judge.
- docs/_changelog.md: one line.

E3c.6 — THE MIGRATION (last). Write the appendix's text, run the check as above, choose the mark, and hand the final text to the database tool once. Then the read-back with your query tool; paste each result, and report a read refused to your tool's role as refused:
- `select version from public.migration_marks where version = '<MARK>';` → one row;
- `select prosecdef, provolatile, proconfig from pg_proc where oid = 'public.feed_bench(uuid,uuid,jsonb,integer)'::regprocedure;` → false, v, {search_path=public};
- `select has_function_privilege('anon', 'public.feed_bench(uuid,uuid,jsonb,integer)', 'EXECUTE'), has_function_privilege('authenticated', 'public.feed_bench(uuid,uuid,jsonb,integer)', 'EXECUTE');` → false, false.

NAMED FOR THE NEXT VERSIONS (not specified here; build none of it)
- The first bench run: the operator's, from GitHub Actions (Actions → Feed bench → Run workflow), after CI on this turn's final commit is green and ethio-staging holds the mark. The supervisor reads the status file.
- Bundle 10's walk, one, at the bundle's close: the listings pages with the ads the operator approves on Admin › Screening.
- Then D106 and D107: the chosen place kept on the account, and the amber "different place" notice.

REPORT (one, at the end).
First lines:
- done or not done, for step 0 and E3c.0 to E3c.6;
- E3c.0's results;
- whether the browser started;
- any cited line that read differently;
- any file outside the lists, with its reason.
Then:
- the check-migrations "guard OK" lines;
- the mark, and the now() reading it came from;
- the apply outcome;
- the read-back;
- the line "apply <uuid-fragment of the filename> → expect mark <MARK>", for the operator's staging apply;
- the last line of each check;
- the six ci-status lines;
- the file list from `git diff --name-only 0a0a7687` (untracked new files listed by name);
- "Logs read: … · unavailable: …".
Never "CI green" from a local run. END THE TURN after the report.

APPENDIX — THE MIGRATION TEXT (write it exactly; change only <MARK>)

-- E3c (bundle 10, the feed engine's speed judge, D101 §5, DEC-166): feed_bench times feed_page inside the database. It calls feed_page p_runs times (1 to 200) with the given category, place and cursor at 20 cards a page, and answers each call's milliseconds (clock_timestamp) with the last page's size in bytes and its number of cards. Read-only; executable by service_role only. Called by scripts/feed-bench.ts on ethio-staging, never by the app.
-- e2e-areas: feed

CREATE OR REPLACE FUNCTION public.feed_bench(p_category_id uuid, p_location_id uuid, p_after jsonb, p_runs integer)
 RETURNS jsonb
 LANGUAGE plpgsql
 VOLATILE
 SECURITY INVOKER
 SET search_path TO 'public'
AS $fn$
DECLARE
  v_ms   double precision[] := ARRAY[]::double precision[];
  v_page jsonb;
  v_t0   timestamptz;
  i      integer;
BEGIN
  IF p_runs IS NULL OR p_runs < 1 OR p_runs > 200 THEN
    RAISE EXCEPTION 'feed_bench: badRuns';
  END IF;
  FOR i IN 1..p_runs LOOP
    v_t0 := clock_timestamp();
    v_page := public.feed_page(p_category_id, p_location_id, p_after, 20);
    v_ms := v_ms || (extract(epoch FROM clock_timestamp() - v_t0) * 1000)::double precision;
  END LOOP;
  RETURN jsonb_build_object(
    'ms', to_jsonb(v_ms),
    'bytes', octet_length(v_page::text),
    'cards', jsonb_array_length(v_page->'cards'));
END $fn$;
REVOKE ALL ON FUNCTION public.feed_bench(uuid, uuid, jsonb, integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.feed_bench(uuid, uuid, jsonb, integer) TO service_role;
COMMENT ON FUNCTION public.feed_bench(uuid, uuid, jsonb, integer) IS
  'The feed engine''s speed judge (bundle 10 E3c, DEC-166): times p_runs calls of feed_page (20 cards) inside the database and answers their milliseconds, the last page''s bytes and its cards. Service role only; called by scripts/feed-bench.ts on ethio-staging.';

-- Proofs: the header facts, the privileges and the refusal. No proof reads a row (the refusal comes before any read).
DO $proof$
DECLARE
  v_fn  regprocedure := 'public.feed_bench(uuid,uuid,jsonb,integer)'::regprocedure;
  v_err text;
  v_bad integer;
BEGIN
  IF (SELECT prosecdef FROM pg_proc WHERE oid = v_fn) IS DISTINCT FROM false
     OR (SELECT provolatile FROM pg_proc WHERE oid = v_fn) IS DISTINCT FROM 'v'
     OR NOT (SELECT proconfig FROM pg_proc WHERE oid = v_fn) @> ARRAY['search_path=public'] THEN
    RAISE EXCEPTION 'E3c P1: feed_bench header facts differ';
  END IF;
  IF has_function_privilege('anon', v_fn, 'EXECUTE')
     OR has_function_privilege('authenticated', v_fn, 'EXECUTE')
     OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
    RAISE EXCEPTION 'E3c P2: feed_bench privileges differ';
  END IF;
  FOREACH v_bad IN ARRAY ARRAY[0, 201] LOOP
    v_err := NULL;
    BEGIN
      PERFORM public.feed_bench(NULL, NULL, NULL, v_bad);
    EXCEPTION WHEN OTHERS THEN
      v_err := SQLERRM;
    END;
    IF v_err IS DISTINCT FROM 'feed_bench: badRuns' THEN
      RAISE EXCEPTION 'E3c P3: % runs was not refused as badRuns (got %)', v_bad, coalesce(v_err, 'no error');
    END IF;
  END LOOP;
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('<MARK>') ON CONFLICT (version) DO NOTHING;
```
