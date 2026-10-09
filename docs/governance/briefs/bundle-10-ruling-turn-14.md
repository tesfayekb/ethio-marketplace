RULING — bundle 10, turn 14: fix PW-179 first (INC-527); the Screening preview draws the ad's category picture (INC-525); the staging gate (DEC-168). Base: dev be21faa4.

STEP 0 — Save this file, byte for byte, as docs/governance/briefs/bundle-10-ruling-turn-14.md (docs/governance/ is outside prettier). If the platform ends the turn early, re-read that file first when you are told "continue".

WHY THIS TURN
1. CI on be21faa4 (run 37925469119) is red. Only PW-179 failed, in both projects and in the fast lane, at its first check: "PW-179: the failed read was not shown". PW-178, FS-7 and TR-28 passed.
   - The test is wrong, not the step. @supabase/postgrest-js 2.110.9 (the version in bun.lock) retries a GET after a network error: three retries, 1 s, 2 s and 4 s apart (dist/index.mjs, executeWithRetry).
   - So aborting only the first attempt delays the read; the step never sees a failure. The client-error lines confirm it: the aborted request appears ("net::ERR_FAILED"), the reader's "[pin] place text read failed" never does.
   - The fix: PW-179 refuses every attempt until the failure shows, then lets reads through.
2. Admin › Screening's "Preview as buyer" passes `illustrationUrl: null` (src/features/admin-screening/screening-page.tsx :289), so it never draws the category picture. Every other place that draws an ad's picture takes the nearest category picture from the public tree.
3. Nothing keeps apart the four workflows that use ethio-staging: CI, Nightly E2E, Guard Proof and Feed bench. Their concurrency groups only stop two runs of the same workflow. DEC-168, the staging gate:
   - CI has priority and never waits.
   - The feed bench waits up to 40 minutes for a quiet staging. If staging stays busy, it writes Verdict SKIPPED. If another staging run starts while the bench runs, the bench stops, cleans up and writes Verdict YIELDED.
   - The nightly waits up to 60 minutes before its tests, then runs anyway. It records every other staging run that overlapped it, as notices on its run page.
   DEC-168 names the two workflow files under G22.

All the code for this turn is in ONE PATCH at the end of this file. It was built on be21faa4 and proven to apply cleanly there with `git apply`. You apply it; you do not retype it.

R0 — Start by reading CI for the last commit on dev:
- https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md;
- then e2e-last-failure.md and guards-last-failure.md at the same address.
Paste the first six lines of ci-status.md. The red there is PW-179 only, and R1 fixes it. You cannot git-fetch that branch.

Files this turn changes, all through the patch, and no others:
- .github/workflows/feed-bench.yml, .github/workflows/nightly-e2e.yml (DEC-168)
- scripts/staging-gate.ts (new), scripts/staging-gate.test.ts (new: SG-1..SG-4)
- scripts/feed-bench.ts, scripts/feed-bench.test.ts (FB-6)
- src/features/admin-screening/screening-page.tsx
- e2e/admin-screening.spec.ts (seedWaiting's option, SC-6)
- e2e/post-wizard-bundle2.spec.ts (PW-179 only)
- docs/features/feed-engine.md, docs/features/nightly-e2e.md, docs/_changelog.md
- and this file (step 0).
Name any other file in the report's first lines, with its reason.

R1 — APPLY THE PATCH, exactly, in this order:
1. Extract it from the saved file:
   awk '/^```diff$/{f=1;next} /^```$/{if(f){exit}} f' docs/governance/briefs/bundle-10-ruling-turn-14.md > /tmp/turn14.patch
2. `sha256sum /tmp/turn14.patch` must print 5360502fe3b9c42708e949acb6908c5fededf8cf017daf01ce9dca1277d694ea. If it does not, the file was not saved byte for byte: save it again from the attachment and repeat. Never edit the patch by hand.
3. `git apply --check /tmp/turn14.patch`, then `git apply /tmp/turn14.patch`. If the check fails, STOP and paste its output. Change nothing.
4. Paste `sha256sum` of the twelve files. Each must begin as below:
   42bdec7e9ba60320 .github/workflows/feed-bench.yml
   5c84b409710c87bc .github/workflows/nightly-e2e.yml
   d87d38a604a50df1 docs/_changelog.md
   b67da745b16fbe5d docs/features/feed-engine.md
   931248c62a0dd471 docs/features/nightly-e2e.md
   66fff7049a8540a5 e2e/admin-screening.spec.ts
   4191c21cd2ff309c e2e/post-wizard-bundle2.spec.ts
   52666076c01c6e2b scripts/feed-bench.test.ts
   8130dbb960e0df45 scripts/feed-bench.ts
   0f26e411a54879c9 scripts/staging-gate.test.ts
   c0d61060b7eb9a14 scripts/staging-gate.ts
   2da5774831f6e041 src/features/admin-screening/screening-page.tsx
Do not run prettier --write or any other formatter on these files: they are already in the repository's style (checked with prettier 3.8.3).

What the patch does, so you can check it as you apply it:
- PW-179 (INC-527): while `failing` is true, every GET of the place text is refused (each of the client's retries too). The test waits for the failure to show, checks that at least one read was refused, sets `failing = false`, saves a pin, and checks that the pin save's read went through and the directions are kept.
- screening-page.tsx (INC-525): it imports nearestCategoryPicture and useCategoryTree from "@/features/categories/category-tree" and adds `const { tree } = useCategoryTree();` at the top of AdminScreeningPage. The preview's illustrationUrl becomes `nearestCategoryPicture(tree, previewRow.categoryId)`.
- admin-screening.spec.ts: seedWaiting(options) passes `{ parentImageUrl }` to seedCategoryBranch. SC-6 opens the row's Preview and expects `listing-detail-illustration` with data-picture="category" and the scratch picture's address.
- scripts/staging-gate.ts (DEC-168) contains:
  - STAGING_WORKFLOWS (the four names);
  - busyRuns, which counts the OTHER staging workflows' runs that have not completed;
  - overlapping;
  - gateEnv, built from GITHUB_REPOSITORY, GITHUB_RUN_ID, GITHUB_WORKFLOW and GH_TOKEN, and null outside Actions;
  - waitForQuiet, which polls every 30 s;
  - yieldWatcher, which asks at most every 15 s; an unreadable answer mid-run is a warning;
  - a command line for the nightly: `wait <minutes>` and `overlaps`, which always exit 0 and print notices or warnings.
- scripts/feed-bench.ts:
  - before writing anything, waitForQuiet for up to 40 minutes; if staging stays busy or the gate cannot be read, Verdict SKIPPED with the reason, exit 1;
  - checkGate before each insert batch, before the page walk and before each shape; a YieldError becomes Verdict YIELDED, after the cleanup has run;
  - outside Actions (no token), the gate is not checked;
  - `--clean` is unchanged.
- feed-bench.yml: the job gains `actions: read` and the bench step gains GH_TOKEN. The timeout rises from 45 to 90 minutes (40 waiting, then the run). The header now says weekly.
- nightly-e2e.yml: the job gains `actions: read`. A "Staging gate (DEC-168)" step runs after the build check, and a "Staging overlaps (DEC-168)" step (if: always()) runs after the serial full run.
- Docs: one line in feed-engine.md's speed-judge section, a "The staging gate (DEC-168)" section at the end of nightly-e2e.md, and the changelog line.

R2 — CENSUS FOR BUNDLE 11, report only, change nothing. The Screening preview's view (screening-page.tsx, the PreviewSheet's view object) fills these fields with a constant: definitions [], attributeOptions {}, country null, contactPref {}, sellerAlias null, sellerBusinessName null. For each one:
- where the posting wizard reads the value it passes to the same preview (file:line);
- whether the Screening page could read it under today's policies and functions, as a reviewer with screening permission (name the policy or function, or write "no read path").
The bundle that rebuilds Admin › Screening in the house style uses this census.

CHECKS before the turn ends. Run each one whole and paste the last line of each:
- `bun run typecheck`
- `bun run format:check`
- `bun run lint`
- `bun run test:unit` (it now includes SG-1..SG-4 and FB-6)
- `bun run build`
- Browser tests: try once, with `bun run e2e:local e2e/admin-screening.spec.ts e2e/post-wizard-bundle2.spec.ts`. If it does not start, write "local browser runs unavailable". CI on this turn's commit is the proof (INC-506).
- Do NOT run scripts/feed-bench.ts or scripts/staging-gate.ts in your sandbox. Nothing runs against ethio-prod or the published site.
If a check fails because of the patch, STOP and paste the failure. Do not change the patched files.

REPORT
- R0's six lines;
- R1: the patch's sha256 line, the `git apply` result, and the twelve sha256 lines;
- R2's census;
- the check lines;
- `git diff --name-only be21faa4`.
Then END THE TURN.

THE PATCH (apply it with git apply; never retype it)

```diff
diff --git a/.github/workflows/feed-bench.yml b/.github/workflows/feed-bench.yml
index 19ce0120ba0a1302ff486f3a2449cd3dc23cead6..14581d66662e919321cca9764dd46728d436c5dd 100644
--- a/.github/workflows/feed-bench.yml
+++ b/.github/workflows/feed-bench.yml
@@ -2,8 +2,10 @@ name: Feed bench
 
 # D101 §5 / DEC-166 — the feed engine's speed judge on ethio-staging:
 # 100,500 scratch listings, six page shapes timed inside the database
-# (feed_bench), everything removed after. Daily and on demand; red when a
-# target is missed. Evidence publishes to branch ci-evidence (DEC-098).
+# (feed_bench), everything removed after. Weekly (Sunday 05:10 UTC, DEC-167)
+# and on demand; red when a target is missed, or when it was skipped or
+# yielded to another staging run (DEC-168, scripts/staging-gate.ts).
+# Evidence publishes to branch ci-evidence (DEC-098).
 on:
   schedule:
     - cron: "10 5 * * 0"
@@ -21,9 +23,12 @@ jobs:
   feed-bench:
     name: Feed bench (ethio-staging, 100,500 scratch listings)
     runs-on: ubuntu-24.04
-    timeout-minutes: 45
+    # DEC-168 — up to 40 minutes waiting for a quiet staging, then the run.
+    timeout-minutes: 90
     permissions:
       contents: write
+      # DEC-168 — the staging gate reads the repository's runs.
+      actions: read
     env:
       E2E_SUPABASE_URL: https://jatpuhfdjfzctjipklmk.supabase.co
       E2E_SUPABASE_SERVICE_ROLE_KEY: ${{ secrets.E2E_SUPABASE_SERVICE_ROLE_KEY }}
@@ -39,6 +44,8 @@ jobs:
       - name: Run the bench
         id: bench
         continue-on-error: true
+        env:
+          GH_TOKEN: ${{ github.token }}
         run: bun scripts/feed-bench.ts
       - name: Publish the status to ci-evidence
         if: always()
diff --git a/.github/workflows/nightly-e2e.yml b/.github/workflows/nightly-e2e.yml
index 70a94f4c4ccd800ea292bc3d61fa6ba4434364ac..c525b544cafcec70722e6c7707a7ce3632758dc1 100644
--- a/.github/workflows/nightly-e2e.yml
+++ b/.github/workflows/nightly-e2e.yml
@@ -19,6 +19,8 @@ jobs:
     # DEC-153 (a) — publish-evidence.sh pushes the heartbeat and failure evidence.
     permissions:
       contents: write
+      # DEC-168 — the staging gate reads the repository's runs.
+      actions: read
     env:
       # INC-018 (recurrence, 2026-08-04): this block MUST mirror ci.yml's e2e job
       # exactly. It previously pinned the sink flag to "1" while ci.yml read it
@@ -79,6 +81,13 @@ jobs:
       # artifact that must exist is the node entry, not wrangler.json.
       - name: Verify e2e build output
         run: test -f dist/server/index.mjs || { echo "::error::e2e build did not emit dist/server/index.mjs — nitro target drift"; echo "--- emitted tree ---"; find dist .output -maxdepth 3 -type f 2>/dev/null | head -60; exit 1; }
+      # DEC-168 — THE STAGING GATE: wait (up to 60 minutes) until no CI, Guard
+      # Proof or Feed bench run is using ethio-staging; run anyway after that,
+      # with a warning. Never a stop: an unreadable gate is a warning too.
+      - name: Staging gate (DEC-168)
+        env:
+          GH_TOKEN: ${{ github.token }}
+        run: bun scripts/staging-gate.ts wait 60
       # The verdict of the job is THIS step and nothing else. continue-on-error
       # lets the heartbeat run afterwards; the final step re-raises the failure so
       # a red suite can never be hidden by a green bookkeeping commit.
@@ -112,6 +121,13 @@ jobs:
         run: |
           set -o pipefail
           bunx playwright test --project=mobile-360 --project=desktop-1280 --workers=1 2>&1 | tee full.log
+      # DEC-168 — every other staging run that overlapped this nightly, as a
+      # notice on the run page, so a nightly red is read with it in hand.
+      - name: Staging overlaps (DEC-168)
+        if: always()
+        env:
+          GH_TOKEN: ${{ github.token }}
+        run: bun scripts/staging-gate.ts overlaps
       # INC-108 — THE NIGHTLY WRITES ITS OWN EVIDENCE, not only a heartbeat.
       # A serial nightly failure used to be undiagnosable from the repo: the
       # heartbeat said FAILURE and nothing else. The per-push reporter is reused
diff --git a/docs/_changelog.md b/docs/_changelog.md
index c02cd647d0a5ccf8c25b5d36a50ea1425a4ca1c3..f590b047bfce6d9c8bebca4091dfdf659bcca40d 100644
--- a/docs/_changelog.md
+++ b/docs/_changelog.md
@@ -759,3 +759,4 @@
 - 2026-10-09 — Bundle 10 turn 11: INC-520 — scripts/feed-bench.ts cuts every `.in(...)` id list by chunkByLength (DEC-138) so its cleanup is no longer refused, and gains `--clean` (staging only; counts, removes the `e2e-bench-` rows, counts again; exit 0 only when none are left).
 - 2026-10-09 — Bundle 10 turn 12: INC-524 — the feed bench inserts listings in batches of 250 and retries an insert that ends with a statement timeout (5 s wait, at most 3 attempts); the Feed bench workflow runs weekly (Sunday 05:10 UTC) and on demand. INC-521 — lints baseline function_executable_by_anon 12 → 13: feed_page, the public feed's read door, anon EXECUTE by design in E2b, allowlisted in scripts/public-surface-allowlist.txt.
 - 2026-10-09 — bundle 10 turn 13: INC-522 the place step never replaces newer text with an older read and re-reads text it could not read before a seller-driven save (PW-178, PW-179); INC-523 TR-28 leaves scratch languages out of both sides; INC-525 FS-7 proves a card draws its category's picture.
+- 2026-10-09 — bundle 10 turn 14: INC-527 — PW-179 refuses every attempt of the first place-text read (the Supabase client retries a GET after a network error) until the failure shows; INC-525 — Admin › Screening's Preview as buyer draws the ad's category picture (SC-6); DEC-168 — the staging gate: the feed bench waits for a quiet ethio-staging and yields to CI, the nightly waits before it starts and records every overlapping run (scripts/staging-gate.ts, SG-1..SG-4, FB-6).
diff --git a/docs/features/feed-engine.md b/docs/features/feed-engine.md
index a12eb0ed37ff855edc6b417d2cf37f9c44bd987f..c5b827e044304cb855de2b52c868ad8514fdb6ba 100644
--- a/docs/features/feed-engine.md
+++ b/docs/features/feed-engine.md
@@ -48,6 +48,7 @@ Spec: docs/governance/feed-engine-spec.md (approved 2026-10-08, D101). Brief: do
 - **`--clean`** — `bun scripts/feed-bench.ts --clean` on ethio-staging only: counts every `e2e-bench-` row, removes those listings, categories with their pointers and places (cities first), counts again and prints one line `feed-bench --clean: found <n> scratch rows; left <n>`; no status file, no users touched; exit 0 only when none are left. Every id list the script sends is cut by chunkByLength (DEC-138), so no request carries a 1,000-id query string (INC-520).
 - **Seeding** — listings are inserted 250 at a time; an insert that ends with a statement timeout waits 5 seconds and is tried again, at most 3 attempts in all; any other error fails at once. The reported seed time covers a failed seed too (INC-524).
 - **The workflow** — .github/workflows/feed-bench.yml, weekly on Sunday at 05:10 UTC and on demand (each run writes and deletes about 1.3 million rows on the shared ethio-staging); it publishes docs/tracking/feed-bench-status.md to branch ci-evidence and is red on a miss or a failure.
+- **The staging gate (DEC-168)** — before it writes anything the bench waits, up to 40 minutes, until no CI, Nightly E2E or Guard Proof run is queued or running (scripts/staging-gate.ts, read through the Actions API with the job's own token, `actions: read`); still busy → Verdict SKIPPED, with the runs named. While it seeds and measures it asks again at most every 15 seconds; when such a run has started it stops, cleans up and writes Verdict YIELDED. CI never waits. A SKIPPED or YIELDED run is red, and is dispatched again.
 - **The targets (D101 §5)** — p95 ≤ 50 ms per shape (nearest rank of 30 calls), one page ≤ 30,720 bytes. Under DEC-166 a red run is a MISS: an incident, and the database design is revised before the next screen bundle.
 - **Not measured here** — the cached first page's time to first byte (≤ 100 ms) needs the published site; the first page on slow 3G (≤ 1.5 s) needs a browser.
 
diff --git a/docs/features/nightly-e2e.md b/docs/features/nightly-e2e.md
index b7ec07410306981cce87d8a8eb2948fbd81973f5..b91ae23167809eeec1b1ac90e5d06be88400c2ca 100644
--- a/docs/features/nightly-e2e.md
+++ b/docs/features/nightly-e2e.md
@@ -91,3 +91,9 @@ One step after the suites, `if: always()`: `bun scripts/security-lints.ts`. It n
 - The nightly runs `scripts/security-lints.ts` against ethio-staging (counts only; see security-scanning.md).
 - The job's token is read-only by default; the nightly job declares `contents: write` for its evidence publish (DEC-153).
 - Failure tables are written through the reporter's `mdCell` helper (DEC-154).
+
+## The staging gate (DEC-168)
+
+- Before its tests the nightly waits, up to 60 minutes, until no CI, Guard Proof or Feed bench run is queued or running (`bun scripts/staging-gate.ts wait 60`); after that it runs anyway, with a warning. An unreadable gate is a warning, never a stop.
+- After the serial full run, `bun scripts/staging-gate.ts overlaps` writes a notice on the run page for every other staging run that overlapped this nightly, so a nightly red is read with that in hand (INC-487).
+- The job's token gains `actions: read` for these two steps; CI itself never waits.
diff --git a/e2e/admin-screening.spec.ts b/e2e/admin-screening.spec.ts
index a7f99f70c50a5438e79528343ee69d9816a07fe5..f9138700e4f6b7f4281d9df180af441f0bf9a8bc 100644
--- a/e2e/admin-screening.spec.ts
+++ b/e2e/admin-screening.spec.ts
@@ -15,7 +15,7 @@ import { gotoReady, stepUpIfPrompted, switchUser, useJobSuperAdmin } from "./hel
 import { adminClient, leaseUser } from "./helpers/users";
 
 /**
- * Bundle 10 E3a — ADMIN › SCREENING (SC-1..SC-5). Seeded as feed-route seeds;
+ * Bundle 10 E3a — ADMIN › SCREENING (SC-1..SC-6). Seeded as feed-route seeds;
  * every row is found by its unique title in the page's search (G28); DB truth
  * through the service client; cleanup in afterEach (J3).
  */
@@ -109,10 +109,10 @@ test.describe("ADMIN SCREENING", () => {
     }
   });
 
-  async function seedWaiting() {
+  async function seedWaiting(options: { parentImageUrl?: string } = {}) {
     const seller = await leaseSeller();
     sellers.push(seller.id);
-    const { parent, leaf } = await seedCategoryBranch();
+    const { parent, leaf } = await seedCategoryBranch(options);
     branches.push([parent.slug, leaf.slug]);
     const chain = await seedScratchChain("ET");
     regions.push(chain.region.slug);
@@ -252,4 +252,21 @@ test.describe("ADMIN SCREENING", () => {
       { timeout: 20000 },
     );
   });
+
+  /** SC-6 (INC-525) — the preview draws the nearest category picture, as the card does. */
+  test("SC-6 Preview as buyer draws the ad's category picture", async ({ page }) => {
+    const picture = "https://example.invalid/e2e-screen-picture.jpg";
+    const ad = await seedWaiting({ parentImageUrl: picture });
+    await useJobSuperAdmin(page);
+    await findRow(page, ad.title, ad.id);
+    await actionsOf(page, ad.id).getByTestId(`admin-screening-open-${ad.id}`).click();
+    await expect(page.getByTestId("post-preview-sheet")).toBeVisible({ timeout: 20000 });
+    const box = page.getByTestId("listing-detail-illustration");
+    await expect(box, "SC-6: the preview did not draw the category picture").toBeVisible({
+      timeout: 20000,
+    });
+    await expect(box).toHaveAttribute("data-picture", "category");
+    await expect(box.locator("img")).toHaveAttribute("src", picture);
+    await expect(page.getByTestId("listing-detail-nophoto")).toHaveCount(0);
+  });
 });
diff --git a/e2e/post-wizard-bundle2.spec.ts b/e2e/post-wizard-bundle2.spec.ts
index a051c86a68a7cb629c221a4788fcbdc275e06c9b..4fac1198102516a99df0c1c4c1e8175178edd0a0 100644
--- a/e2e/post-wizard-bundle2.spec.ts
+++ b/e2e/post-wizard-bundle2.spec.ts
@@ -303,24 +303,30 @@ test.describe("POSTING WIZARD — bundle 2 place and contact", () => {
   });
 
   /**
-   * PW-179 (INC-522, A2) — A PIN SAVE NEVER RESTATES DIRECTIONS THE STEP COULD
-   * NOT READ. The draft holds directions; the step's first read fails; the pin
-   * save reads again and keeps them. Positive control: the failed read is shown
-   * on screen and a second read is made.
+   * PW-179 (INC-522, A2; INC-527) — A PIN SAVE NEVER RESTATES DIRECTIONS THE
+   * STEP COULD NOT READ. The draft holds directions; the step's first read
+   * fails. The Supabase client retries a GET after a network error (three
+   * retries, 1 s, 2 s and 4 s apart), so every attempt is refused until the
+   * failure shows. Then reads are let through: the pin save reads again and
+   * keeps the directions. Positive control: the failure is shown on screen,
+   * at least one read was refused, and the pin save's read went through.
    */
   test("PW-179 a pin save never restates directions the step could not read", async ({ page }) => {
     const user = await signedInSeller(page);
     const leaf = await category();
     const value = "Second house after the mosque";
-    let reads = 0;
+    let failing = true;
+    let refused = 0;
+    let passed = 0;
     await page.route("**/rest/v1/listings?*", async (route) => {
       const url = route.request().url();
       if (route.request().method() === "GET" && url.includes("select=street_address")) {
-        reads += 1;
-        if (reads === 1) {
+        if (failing) {
+          refused += 1;
           await route.abort();
           return;
         }
+        passed += 1;
       }
       await route.continue();
     });
@@ -335,9 +341,11 @@ test.describe("POSTING WIZARD — bundle 2 place and contact", () => {
       page.getByTestId("post-where-details-failed"),
       "PW-179: the failed read was not shown",
     ).toBeVisible({ timeout: 20_000 });
+    expect(refused, "PW-179: no read was refused").toBeGreaterThanOrEqual(1);
+    failing = false;
 
     await savePinOnMap(page, 120, 90);
-    expect(reads, "PW-179: the pin save did not read the text again").toBeGreaterThanOrEqual(2);
+    expect(passed, "PW-179: the pin save did not read the text again").toBeGreaterThanOrEqual(1);
     expect(
       (await placeTextOf(listingId)).directions,
       "PW-179: the pin save restated directions it could not read",
diff --git a/scripts/feed-bench.test.ts b/scripts/feed-bench.test.ts
index d42de9f873d562dc7c93b39946edabbfc50deb5b..5279cee0626f7661b1b0dcd122d819fe3cce3c7a 100644
--- a/scripts/feed-bench.test.ts
+++ b/scripts/feed-bench.test.ts
@@ -2,6 +2,7 @@ import { describe, expect, it } from "vitest";
 
 import {
   BATCH,
+  GATE_WAIT_MINUTES,
   isStatementTimeout,
   nearestRank,
   renderStatus,
@@ -75,4 +76,30 @@ describe("feed-bench", () => {
     expect(isStatementTimeout("duplicate key value")).toBe(false);
     expect(BATCH).toBe(250);
   });
+
+  it("FB-6 a skipped or yielded run names its reason (DEC-168)", () => {
+    const base = {
+      runUrl: "local",
+      runSha: "local",
+      timestamp: "2026-10-09T00:00:00.000Z",
+      seeded: 0,
+      seedSeconds: 0,
+      cleanupSeconds: 0,
+      leftovers: 0,
+      shapes: [],
+      bytes: 0,
+    };
+    expect(
+      renderStatus({
+        ...base,
+        outcome: "SKIPPED",
+        error: "staging busy for 40 min: CI run 1 (in_progress, abcdef01)",
+      }),
+    ).toContain("Verdict: SKIPPED (staging busy for 40 min: CI run 1 (in_progress, abcdef01))");
+    expect(
+      renderStatus({ ...base, outcome: "YIELDED", error: "CI run 2 (queued, abcdef01) started" }),
+    ).toContain("Verdict: YIELDED (CI run 2 (queued, abcdef01) started)");
+    expect(renderStatus({ ...base, outcome: "PASS" })).toContain("Verdict: PASS");
+    expect(GATE_WAIT_MINUTES).toBe(40);
+  });
 });
diff --git a/scripts/feed-bench.ts b/scripts/feed-bench.ts
index 1c849eaca886500a5bcc3ae9b6418f20173f3c59..3128e058e1cdb51c0933d48744eabb310e458ddf 100644
--- a/scripts/feed-bench.ts
+++ b/scripts/feed-bench.ts
@@ -13,6 +13,7 @@ import { writeFileSync, mkdirSync } from "node:fs";
 import { createClient, type SupabaseClient } from "@supabase/supabase-js";
 
 import { chunkByLength } from "../e2e/helpers/chunk-by-length";
+import { describeRuns, gateEnv, waitForQuiet, yieldWatcher, YieldError } from "./staging-gate";
 
 export const TARGET_P95_MS = 50;
 export const TARGET_BYTES = 30720;
@@ -22,6 +23,8 @@ export const LISTINGS = 100000;
 export const HOT = 500;
 export const BATCH = 250;
 export const STAGING_REF = "jatpuhfdjfzctjipklmk";
+/** DEC-168 — the longest the bench waits for a quiet staging before it skips. */
+export const GATE_WAIT_MINUTES = 40;
 
 const STATUS_PATH = "docs/tracking/feed-bench-status.md";
 
@@ -77,7 +80,7 @@ export interface StatusInput {
   runUrl: string;
   runSha: string;
   timestamp: string;
-  outcome: "PASS" | "MISS" | "FAILED";
+  outcome: "PASS" | "MISS" | "FAILED" | "SKIPPED" | "YIELDED";
   error?: string;
   seeded: number;
   seedSeconds: number;
@@ -89,7 +92,10 @@ export interface StatusInput {
 
 export function renderStatus(input: StatusInput): string {
   const firstLine = (input.error ?? "").split("\n")[0]?.slice(0, 200) ?? "";
-  const shown = input.outcome === "FAILED" ? `FAILED (${firstLine})` : input.outcome;
+  const shown =
+    input.outcome === "PASS" || input.outcome === "MISS"
+      ? input.outcome
+      : `${input.outcome} (${firstLine})`;
   const rows = input.shapes.map(
     (s) =>
       `| ${s.name} | ${s.runs} | ${s.p50.toFixed(2)} | ${s.p95.toFixed(2)} | ${s.max.toFixed(2)} | ${s.cards} |`,
@@ -299,6 +305,45 @@ async function main(): Promise<number> {
     return left === 0 ? 0 : 1;
   }
 
+  // DEC-168 — THE STAGING GATE: CI has priority. Wait for a quiet staging
+  // before writing anything; yield the moment another staging run starts.
+  const gate = gateEnv();
+  let checkGate: () => Promise<void> = async () => {};
+  if (gate === null) {
+    console.log("staging gate: not on GitHub Actions — not checked");
+  } else {
+    let skipped: string | undefined;
+    try {
+      const waited = await waitForQuiet(gate, GATE_WAIT_MINUTES);
+      if (waited.quiet) console.log(`staging gate: staging quiet after ${waited.waitedSeconds} s`);
+      else skipped = `staging busy for ${GATE_WAIT_MINUTES} min: ${describeRuns(waited.busy)}`;
+    } catch (error) {
+      skipped = `gate unreadable: ${error instanceof Error ? error.message : String(error)}`;
+    }
+    if (skipped !== undefined) {
+      mkdirSync("docs/tracking", { recursive: true });
+      writeFileSync(
+        STATUS_PATH,
+        renderStatus({
+          runUrl: process.env["RUN_URL"] || "local",
+          runSha: process.env["RUN_SHA"] || "local",
+          timestamp: new Date().toISOString(),
+          outcome: "SKIPPED",
+          error: skipped,
+          seeded: 0,
+          seedSeconds: 0,
+          cleanupSeconds: 0,
+          leftovers: 0,
+          shapes: [],
+          bytes: 0,
+        }),
+      );
+      console.log(`::error::feed-bench SKIPPED: ${skipped}`);
+      return 1;
+    }
+    checkGate = yieldWatcher(gate);
+  }
+
   const P = `e2e-bench-${process.env["GITHUB_RUN_ID"] ?? "local"}-${randomLetters(6)}`;
   const db = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
 
@@ -310,6 +355,7 @@ async function main(): Promise<number> {
   const shapes: ShapeResult[] = [];
   let sellerId: string | null = null;
   let failure: string | undefined;
+  let yielded: string | undefined;
   let seedStart = 0;
 
   try {
@@ -398,6 +444,7 @@ async function main(): Promise<number> {
     let batch: ReturnType<typeof row>[] = [];
     const flush = async () => {
       if (batch.length === 0) return;
+      await checkGate();
       for (let attempt = 1; ; attempt++) {
         const res = await db.from("listings").insert(batch);
         if (!res.error) break;
@@ -424,6 +471,7 @@ async function main(): Promise<number> {
     seedSeconds = (Date.now() - seedStart) / 1000;
 
     // 5. Measure.
+    await checkGate();
     let after: unknown = null;
     for (let n = 1; n <= 49; n++) {
       const page = must(
@@ -446,6 +494,7 @@ async function main(): Promise<number> {
       ["guest host, country", tops[2]!, et.id, null],
     ];
     for (const [name, cat, loc, cursor] of plan) {
+      await checkGate();
       const answer = must(
         await db.rpc("feed_bench", {
           p_category_id: cat,
@@ -459,7 +508,8 @@ async function main(): Promise<number> {
       shapes.push({ name, ...summarise(answer.ms.slice(WARMUP)), cards: answer.cards });
     }
   } catch (error) {
-    failure = error instanceof Error ? error.message : String(error);
+    if (error instanceof YieldError) yielded = error.message;
+    else failure = error instanceof Error ? error.message : String(error);
     if (seedStart > 0 && seedSeconds === 0) seedSeconds = (Date.now() - seedStart) / 1000;
   } finally {
     // 6. Clean up, whatever happened.
@@ -481,7 +531,14 @@ async function main(): Promise<number> {
 
   // 7. Status.
   const judged = verdict(shapes, bytes, leftovers);
-  const outcome = failure !== undefined ? "FAILED" : judged.pass ? "PASS" : "MISS";
+  const outcome =
+    failure !== undefined
+      ? "FAILED"
+      : yielded !== undefined
+        ? "YIELDED"
+        : judged.pass
+          ? "PASS"
+          : "MISS";
   mkdirSync("docs/tracking", { recursive: true });
   writeFileSync(
     STATUS_PATH,
@@ -490,7 +547,7 @@ async function main(): Promise<number> {
       runSha: process.env["RUN_SHA"] || "local",
       timestamp: new Date().toISOString(),
       outcome,
-      error: failure,
+      error: failure ?? yielded,
       seeded,
       seedSeconds,
       cleanupSeconds,
@@ -500,6 +557,7 @@ async function main(): Promise<number> {
     }),
   );
   if (failure !== undefined) console.log(`::error::feed-bench FAILED: ${failure.split("\n")[0]}`);
+  if (yielded !== undefined) console.log(`::error::feed-bench YIELDED: ${yielded}`);
   for (const line of judged.lines) console.log(line);
   return outcome === "PASS" ? 0 : 1;
 }
diff --git a/scripts/staging-gate.test.ts b/scripts/staging-gate.test.ts
new file mode 100644
index 0000000000000000000000000000000000000000..4a02b7c186caf6b8c06e68ed9cfdc00d3b19c1cb
--- /dev/null
+++ b/scripts/staging-gate.test.ts
@@ -0,0 +1,81 @@
+import { afterEach, describe, expect, it } from "vitest";
+
+import {
+  busyRuns,
+  describeRuns,
+  gateEnv,
+  overlapping,
+  STAGING_WORKFLOWS,
+  type RunInfo,
+} from "./staging-gate";
+
+/** DEC-168 — the staging gate's pure parts (SG-1..SG-4). */
+function run(
+  id: number,
+  name: string,
+  status: string,
+  updatedAt = "2026-10-09T06:30:00Z",
+): RunInfo {
+  return {
+    id,
+    name,
+    status,
+    headSha: "abcdef0123456789",
+    startedAt: "2026-10-09T06:00:00Z",
+    updatedAt,
+  };
+}
+
+describe("staging gate (DEC-168)", () => {
+  const saved = { ...process.env };
+  afterEach(() => {
+    process.env = { ...saved };
+  });
+
+  it("SG-1 busyRuns counts only the other staging workflows' runs that have not completed", () => {
+    expect(STAGING_WORKFLOWS).toEqual(["CI", "Nightly E2E", "Guard Proof", "Feed bench"]);
+    const runs = [
+      run(1, "CI", "in_progress"),
+      run(2, "CI", "queued"),
+      run(3, "Nightly E2E", "waiting"),
+      run(4, "CI", "completed"),
+      run(5, "CI Status Report", "in_progress"),
+      run(6, "Feed bench", "in_progress"),
+      run(7, "Scheduled", "in_progress"),
+    ];
+    expect(busyRuns(runs, 6, "Feed bench").map((r) => r.id)).toEqual([1, 2, 3]);
+    // A second run of the caller's own workflow is its concurrency group's business.
+    expect(busyRuns([run(8, "Feed bench", "queued")], 6, "Feed bench")).toEqual([]);
+    expect(busyRuns([run(8, "Feed bench", "queued")], 9, "Nightly E2E").map((r) => r.id)).toEqual([
+      8,
+    ]);
+  });
+
+  it("SG-2 overlapping keeps runs still going or updated after the start", () => {
+    const runs = [
+      run(1, "CI", "completed", "2026-10-09T05:59:00Z"),
+      run(2, "CI", "completed", "2026-10-09T06:10:00Z"),
+      run(3, "CI", "in_progress"),
+      run(4, "Push on dev", "completed", "2026-10-09T06:10:00Z"),
+      run(9, "Nightly E2E", "in_progress"),
+    ];
+    expect(overlapping(runs, 9, "2026-10-09T06:00:00Z").map((r) => r.id)).toEqual([2, 3]);
+  });
+
+  it("SG-3 describeRuns names the workflow, the run, its state and the commit", () => {
+    expect(describeRuns([run(42, "CI", "in_progress")])).toBe("CI run 42 (in_progress, abcdef01)");
+    expect(describeRuns([])).toBe("");
+  });
+
+  it("SG-4 gateEnv is null outside GitHub Actions or without a token", () => {
+    process.env["GITHUB_REPOSITORY"] = "o/r";
+    process.env["GITHUB_RUN_ID"] = "123";
+    process.env["GITHUB_WORKFLOW"] = "Feed bench";
+    delete process.env["GH_TOKEN"];
+    expect(gateEnv()).toBeNull();
+    process.env["GH_TOKEN"] = "t";
+    expect(gateEnv()).toEqual({ repo: "o/r", token: "t", selfRunId: 123, selfName: "Feed bench" });
+    delete process.env["GITHUB_RUN_ID"];
+    expect(gateEnv()).toBeNull();
+  });
+});
diff --git a/scripts/staging-gate.ts b/scripts/staging-gate.ts
new file mode 100644
index 0000000000000000000000000000000000000000..398aaa1af223b30ed2e5fa0eca5afbddf0c40889
--- /dev/null
+++ b/scripts/staging-gate.ts
@@ -0,0 +1,202 @@
+/**
+ * DEC-168 — THE STAGING GATE. Four workflows use ethio-staging: CI, Nightly E2E,
+ * Guard Proof and Feed bench. CI has priority and never waits. The bench waits
+ * for a quiet staging before it writes and yields when a run starts; the
+ * nightly waits before it starts and records every run that overlapped it.
+ * Read through the Actions API with the workflow's own token (actions: read).
+ */
+
+export const STAGING_WORKFLOWS = ["CI", "Nightly E2E", "Guard Proof", "Feed bench"] as const;
+
+export interface RunInfo {
+  id: number;
+  name: string;
+  status: string;
+  headSha: string;
+  startedAt: string;
+  updatedAt: string;
+}
+
+/**
+ * The runs of the OTHER staging workflows that have not completed (queued,
+ * waiting or running). A run of the caller's own workflow is left to that
+ * workflow's concurrency group.
+ */
+export function busyRuns(runs: RunInfo[], selfRunId: number, selfName: string): RunInfo[] {
+  const names: readonly string[] = STAGING_WORKFLOWS;
+  return runs.filter(
+    (r) =>
+      r.id !== selfRunId &&
+      r.name !== selfName &&
+      r.status !== "completed" &&
+      names.includes(r.name),
+  );
+}
+
+/** The other staging runs that were running at some moment after `since`. */
+export function overlapping(runs: RunInfo[], selfRunId: number, since: string): RunInfo[] {
+  const names: readonly string[] = STAGING_WORKFLOWS;
+  const from = Date.parse(since);
+  return runs.filter(
+    (r) =>
+      r.id !== selfRunId &&
+      names.includes(r.name) &&
+      (r.status !== "completed" || Date.parse(r.updatedAt) > from),
+  );
+}
+
+export function describeRuns(runs: RunInfo[]): string {
+  return runs
+    .map((r) => `${r.name} run ${r.id} (${r.status}, ${r.headSha.slice(0, 8)})`)
+    .join("; ");
+}
+
+interface ApiRun {
+  id: number;
+  name: string | null;
+  status: string | null;
+  head_sha: string;
+  run_started_at?: string | null;
+  created_at: string;
+  updated_at: string;
+}
+
+function toRun(r: ApiRun): RunInfo {
+  return {
+    id: r.id,
+    name: r.name ?? "",
+    status: r.status ?? "",
+    headSha: r.head_sha,
+    startedAt: r.run_started_at ?? r.created_at,
+    updatedAt: r.updated_at,
+  };
+}
+
+export interface GateEnv {
+  repo: string;
+  token: string;
+  selfRunId: number;
+  selfName: string;
+}
+
+/** The gate's settings from GitHub Actions' own variables; null outside Actions. */
+export function gateEnv(): GateEnv | null {
+  const repo = process.env["GITHUB_REPOSITORY"] ?? "";
+  const token = process.env["GH_TOKEN"] ?? "";
+  const selfRunId = Number(process.env["GITHUB_RUN_ID"] ?? "");
+  const selfName = process.env["GITHUB_WORKFLOW"] ?? "";
+  if (repo === "" || token === "" || !Number.isFinite(selfRunId) || selfRunId <= 0) return null;
+  return { repo, token, selfRunId, selfName };
+}
+
+async function api<T>(env: GateEnv, path: string): Promise<T> {
+  const res = await fetch(`https://api.github.com/repos/${env.repo}${path}`, {
+    headers: {
+      Authorization: `Bearer ${env.token}`,
+      Accept: "application/vnd.github+json",
+      "X-GitHub-Api-Version": "2022-11-28",
+    },
+  });
+  if (!res.ok) throw new Error(`staging gate: GitHub API ${path} answered HTTP ${res.status}`);
+  return (await res.json()) as T;
+}
+
+/** The 100 newest runs of every workflow in the repository. */
+export async function recentRuns(env: GateEnv): Promise<RunInfo[]> {
+  const body = await api<{ workflow_runs?: ApiRun[] }>(env, "/actions/runs?per_page=100");
+  return (body.workflow_runs ?? []).map(toRun);
+}
+
+export async function selfRun(env: GateEnv): Promise<RunInfo> {
+  return toRun(await api<ApiRun>(env, `/actions/runs/${env.selfRunId}`));
+}
+
+const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
+
+/** Waits until no other staging run is busy, up to `maxMinutes`. */
+export async function waitForQuiet(
+  env: GateEnv,
+  maxMinutes: number,
+  pollSeconds = 30,
+): Promise<{ quiet: boolean; waitedSeconds: number; busy: RunInfo[] }> {
+  const start = Date.now();
+  for (;;) {
+    const busy = busyRuns(await recentRuns(env), env.selfRunId, env.selfName);
+    const waitedSeconds = Math.round((Date.now() - start) / 1000);
+    if (busy.length === 0) return { quiet: true, waitedSeconds, busy };
+    if (Date.now() - start >= maxMinutes * 60_000) return { quiet: false, waitedSeconds, busy };
+    console.log(`staging gate: waiting — ${describeRuns(busy)}`);
+    await sleep(pollSeconds * 1000);
+  }
+}
+
+/** Throws a YieldError when another staging run has started; asks at most every `everySeconds`. */
+export class YieldError extends Error {}
+
+export function yieldWatcher(env: GateEnv, everySeconds = 15): () => Promise<void> {
+  let last = 0;
+  return async () => {
+    if (Date.now() - last < everySeconds * 1000) return;
+    last = Date.now();
+    let runs: RunInfo[];
+    try {
+      runs = await recentRuns(env);
+    } catch (error) {
+      // An unreadable answer mid-run is a warning, never a reason to stop.
+      console.log(`::warning::${error instanceof Error ? error.message : String(error)}`);
+      return;
+    }
+    const busy = busyRuns(runs, env.selfRunId, env.selfName);
+    if (busy.length > 0) throw new YieldError(`${describeRuns(busy)} started`);
+  };
+}
+
+// ------------------------------------------------- the nightly's command line
+
+async function cli(): Promise<number> {
+  const env = gateEnv();
+  const mode = process.argv[2] ?? "";
+  if (env === null) {
+    console.log("::notice::staging gate: not on GitHub Actions with a token — not checked");
+    return 0;
+  }
+  if (mode === "wait") {
+    const minutes = Number(process.argv[3] ?? "60");
+    const result = await waitForQuiet(env, minutes);
+    if (result.quiet) {
+      console.log(`::notice::staging gate: staging quiet after ${result.waitedSeconds} s`);
+    } else {
+      console.log(
+        `::warning::staging gate: still busy after ${minutes} min — running anyway: ${describeRuns(result.busy)}`,
+      );
+    }
+    return 0;
+  }
+  if (mode === "overlaps") {
+    const me = await selfRun(env);
+    const others = overlapping(await recentRuns(env), env.selfRunId, me.startedAt);
+    if (others.length === 0) {
+      console.log("::notice::staging gate: no other staging run overlapped this run");
+    } else {
+      for (const r of others) {
+        console.log(`::notice::staging gate: overlapped by ${describeRuns([r])}`);
+      }
+    }
+    return 0;
+  }
+  console.log("::error::staging gate: usage — staging-gate.ts wait <minutes> | overlaps");
+  return 1;
+}
+
+if (import.meta.main) {
+  cli().then(
+    (code) => process.exit(code),
+    (error: unknown) => {
+      // The nightly runs anyway: an unreadable gate is a warning, never a stop.
+      console.log(
+        `::warning::staging gate: ${error instanceof Error ? error.message : String(error)}`,
+      );
+      process.exit(0);
+    },
+  );
+}
diff --git a/src/features/admin-screening/screening-page.tsx b/src/features/admin-screening/screening-page.tsx
index ffe7bd58e11aff5ddbfc4fb1b89219ad48cf0fcd..27dcaceb88c6dd9a8fd994c21d2da522680473c2 100644
--- a/src/features/admin-screening/screening-page.tsx
+++ b/src/features/admin-screening/screening-page.tsx
@@ -19,6 +19,7 @@ import { useAdminShell } from "@/features/admin/admin-context";
 import { sectionById } from "@/features/admin/sections";
 import { StepUpGate } from "@/features/auth/mfa/step-up-gate";
 import { stepUpAbortKey } from "@/features/auth/mfa/use-step-up";
+import { nearestCategoryPicture, useCategoryTree } from "@/features/categories/category-tree";
 import { PreviewSheet } from "@/features/posting/preview/preview-sheet";
 import { useI18n, type MessageKey } from "@/i18n";
 
@@ -58,6 +59,8 @@ export function AdminScreeningPage() {
   const [busy, setBusy] = useState(false);
   const [notice, setNotice] = useState<Notice>(null);
   const [previewRow, setPreviewRow] = useState<ScreeningRow | null>(null);
+  // INC-525 — the preview draws the ad's category picture as the card does.
+  const { tree } = useCategoryTree();
 
   const query = useScreeningQueue(page, search);
   const photos = useScreeningPhotos(previewRow?.id ?? null);
@@ -286,7 +289,7 @@ export function AdminScreeningPage() {
                   definitions: [],
                   attributeOptions: {},
                   photos: photos.data ?? [],
-                  illustrationUrl: null,
+                  illustrationUrl: nearestCategoryPicture(tree, previewRow.categoryId),
                   photosSoon: previewRow.photosSoon,
                   coverage: previewRow.locationId === null ? [] : [previewRow.locationId],
                   country: null,
```
