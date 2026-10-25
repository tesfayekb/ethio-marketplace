# Foundations turn 30 — completion report

## 1. Scope and starting state

START: `a018721a4a74bfabcb5be65c19fe5d5c55a69108`. Closure HEAD before the report/roadmap landing: `e9ae9b074b1fb28789cbc7cb12e369fb4c95ce88`. The platform manages commits; no stateful git command was run by this executor. The completion report replaces the earlier STOP report.

No migration, new string, package change or out-of-scope source edit. The two explicit deletions are the retired admin-layer and compiled-admin-loader tests.

## 2. A1 and latest CI evidence

At A1, the evidence read SUCCESS for turn 29, commit `c9da2fd9f897c90a6c6b74bb248020312274edd9`, run 40234419925, completed 2026-10-25T21:30:44Z. E2E passed and no failed guard/build job was listed. No correction was needed.

Last CI evidence read, for the report-only base commit, not this implementation's final commit:

```text
# CI Status (auto-generated — do not edit by hand)

- Commit: `a018721a4a74bfabcb5be65c19fe5d5c55a69108` (short `a018721`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-10-25T22:33:59Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40239279479
```

## 3. STEP 0

Exact corrected brief saved, title through closing fence with one newline:

```text
a2cbf85e22375b19cb3021d992ce4fb354f07f44bb1a6e72f5767938e8296692  docs/governance/briefs/foundations-turn-30.md
98136 bytes
```

Only the specified brief-in-force and turn-29/turn-30 roadmap lines changed. Turn 29 was ticked using its verified CI closure; no other task was ticked.

## 4. Parts B–F and step status

- B1–B8 done as one batch: census, route declarations, shared gate, per-layer loaders/provider state, script-only catalogue moves, joins, root warm-up and two retired tests.
- C1–C6 done: 6 focused files, 24 tests passed. C7 planted proof failed exactly and both catalogues were restored to their expected hashes.
- D1–D4 done: member files forbidden on the marketplace first paint, public layer chunks forbidden, entry and route ceilings copied exactly. Bundle-closure tests: 1 file, 12 tests passed. Ceiling measurements are the supervisor's, not a manually built local proof; CI judges the final ceilings.
- E1–E2 done: SLE-1…3 and AP-54's navigation-owned HTML check copied exactly; every AP-54 assertion retained.
- F1–F7 done: feature docs, mechanism row 19, changelog, exact AGENTS Strings line, both usage maps. AGENTS: 7075 bytes. Usage: 1736 keys across 577 files, 395 dynamic call sites; map guard: usage maps match the tree.
- THE CHECKS and THE END-TO-END CHECK done, with named limits below. Completion report and roadmap closed; final CI is the supervisor's judgment.

## 5. Mover evidence

```text
en-base.ts: 657 kept, 0 arrived
en-admin.ts: 1572 kept, 30 arrived
en-member.ts: 0 kept, 591 arrived
am-base.ts: 657 kept, 0 arrived
am-admin.ts: 1572 kept, 30 arrived
am-member.ts: 0 kept, 591 arrived
```

Whole entries moved by the brief's script, with values untouched; no catalogue entry was retyped. `/tmp/turn30` is removed after checks and evidence capture.

## 6. Exact hash evidence

Every block and THE CHECKS expectation matched:

```text
2cf556588dc208056a0ffdf0313d248a1cfc7cd0aa0dac21d79ccf94811dfc3f  scripts/conformance/strings-layers.ts
ca7232b7cb1fa3583ac322aca9fbe640d3847521297c33b0a0abaa6b9e8ed408  src/components/shell/strings-layers.ts
e00d132b38b9b80410b6f76899ccdb015a5cae1c435807539b1ef4da0db68771  src/components/shell/strings-layer-gate.tsx
eb301960edd98401030861ab30e017632a2bbc8d7c103ac8845086073d303f53  /tmp/turn30/move-strings.ts
80490f52d786fed78524722737fa736ae4e01745588b6234b1a88ba1ecdbfd88  src/i18n/locales/en.ts
f2eb7424b3040fbfa46ce02ee9c6cd997e689f79f92f410eb7ed5c41564e304e  src/i18n/locales/am.ts
c7bcd214588203139238a72677367c7ccd92073dd6baf12e7fbd137118abc07c  scripts/conformance/strings-layers.test.ts
559ce6c172774f70ffc2ff2cba70958e93619c1573c1ca27ba5d5cbf9f265f08  src/i18n/compiled-layer-loader.test.ts
b6a34cbe524840ccc42e6a5c623f426110075e4ae24fd706b95a08d49e82f7cf  src/i18n/compiled-catalog.test.ts
9f833109c1f3a68d3db66afeb19c26a78bc38c2ab656745af98e1246f8bb3b3f  src/components/shell/strings-layers.test.ts
c8c8f9aef4c777ecbd421c461d6c8045df01fcaef4fd1c09877a610ff853d99b  src/components/shell/strings-layer-gate.test.tsx
5d5dba648d4b6e9a1a0ee9063d3f9536a32b134dd5e5f608f070ca47ff4666fb  src/i18n/provider-layers.test.tsx
dddfc4333beecdc95b763ce9d2c58c8504be476a56de4951d345551f5513d7e5  scripts/route-budgets.mjs
972e0d7ef5d57b66705d0830e396a347e27a124729994b6c0021fc62b9895131  e2e/i18n-layers.spec.ts
6ede62e76a047ea69ae27450b3ac71d3e607681600bbd2af2b5fb75c786da9e5  src/routes/admin.tsx
277ba572192c8e1b0f869c1ddd11700164bb5300f36313e41941a361b52c3670  src/i18n/compiled-catalog.ts
0701a7ed0cbf3a309911ab5a6cc82bd16fc9978e13ed7d19d6535d659d0eec8d  src/i18n/provider.tsx
dfa02f56fad3a99e2af320061679fc470d634ca1ddabfc418933ee320aeef274  src/i18n/index.ts
aedf5b642fe00d2f3e6d5ee12188e33ee48b295e9db7acbeba55f203adafdf15  src/routes/__root.tsx
f4b8574d572406ab33656b2ad8fc3600430af9b1523fe5338e8b05253d95596b  scripts/conformance/kit-adoption-allowlist.txt
9bd8496f6796668ee60f1f9fee25131571e0a4a64f1d8bbf1bb3abca615e33df  scripts/check-marketplace-imports.mjs
199d4c88d77b0269fcd4052183f92fef3a0626192371093fee3395cf4474cfb5  scripts/bundle-closure.mjs
3662936777913783ac0bfc90ea37f65d4032ba8261bebca65b34fd0e42854e10  scripts/check-bundle-size.mjs
7fef5ca1d0c1fbcae1cd58ecd69dac7834d47fa8df6cc5479f0797d561731be9  e2e/ad-page.spec.ts
d57c2c677c25bdc5abb8972e3b979b0b3ebb379f0a18ac056d44400a7bbf635b  src/i18n/locales/en-base.ts
1d7d8f005a52ffeb74f6869ca5442fcba6c0a70fb155e3451bd2c799935db032  src/i18n/locales/en-admin.ts
dd075f801411150cc846a74e8177a7cd5ae77f6092ffce87754371b6e05662c5  src/i18n/locales/en-member.ts
7cf35e0c5b3948a1bf6de11d790d94475454cb25abf6c182e1a6881ac66065fd  src/i18n/locales/am-base.ts
82f9293b80adf107bc267c9a6261fa356480f61d006a0bcda1b56d4427b49556  src/i18n/locales/am-admin.ts
58a696841c9214e5e829b6ea73e089d08a15f587dbb01ae49bacf3905db3c249  src/i18n/locales/am-member.ts
e811e2760a6e33667dfc928527399af1301efdb87b7baddbd8c9338eb9633606  AGENTS.md

```

All thirteen B2 route diffs contained only the two specified added lines:

```diff
diff --git a/src/routes/account.tsx b/src/routes/account.tsx
index 830beb77..97482ad9 100644
--- a/src/routes/account.tsx
+++ b/src/routes/account.tsx
@@ -22,5 +22,7 @@ export const Route = createFileRoute("/account")({
       { name: "twitter:card", content: "summary_large_image" },
     ],
   }),
+  // DEC-258 — this screen shows the member strings layer; the shell's gate loads it first.
+  staticData: { strings: ["member"] },
   component: AccountOverview,
 });
diff --git a/src/routes/account_.legal.tsx b/src/routes/account_.legal.tsx
index 1ed43c84..11bcc25a 100644
--- a/src/routes/account_.legal.tsx
+++ b/src/routes/account_.legal.tsx
@@ -21,5 +21,7 @@ export const Route = createFileRoute("/account_/legal")({
       { name: "twitter:card", content: "summary" },
     ],
   }),
+  // DEC-258 — this screen shows the member strings layer; the shell's gate loads it first.
+  staticData: { strings: ["member"] },
   component: MyLegalPage,
 });
diff --git a/src/routes/account_.legal_.$versionId.tsx b/src/routes/account_.legal_.$versionId.tsx
index 5299ca2f..c9eab8d4 100644
--- a/src/routes/account_.legal_.$versionId.tsx
+++ b/src/routes/account_.legal_.$versionId.tsx
@@ -18,6 +18,8 @@ export const Route = createFileRoute("/account_/legal_/$versionId")({
       { name: "twitter:card", content: "summary" },
     ],
   }),
+  // DEC-258 — this screen shows the member strings layer; the shell's gate loads it first.
+  staticData: { strings: ["member"] },
   component: VersionRoute,
 });
 
diff --git a/src/routes/account_.saved.tsx b/src/routes/account_.saved.tsx
index 67d87248..17310548 100644
--- a/src/routes/account_.saved.tsx
+++ b/src/routes/account_.saved.tsx
@@ -18,5 +18,7 @@ export const Route = createFileRoute("/account_/saved")({
       { name: "twitter:card", content: "summary_large_image" },
     ],
   }),
+  // DEC-258 — this screen shows the member strings layer; the shell's gate loads it first.
+  staticData: { strings: ["member"] },
   component: SavedPage,
 });
diff --git a/src/routes/settings.tsx b/src/routes/settings.tsx
index 265be512..0ff50154 100644
--- a/src/routes/settings.tsx
+++ b/src/routes/settings.tsx
@@ -63,6 +63,8 @@ export const Route = createFileRoute("/settings")({
       { name: "twitter:card", content: "summary_large_image" },
     ],
   }),
+  // DEC-258 — this screen shows the member strings layer; the shell's gate loads it first.
+  staticData: { strings: ["member"] },
   component: SettingsScreen,
 });
 
diff --git a/src/routes/post.tsx b/src/routes/post.tsx
index 63c5d6bf..a451d1da 100644
--- a/src/routes/post.tsx
+++ b/src/routes/post.tsx
@@ -45,6 +45,8 @@ export const Route = createFileRoute("/post")({
       { name: "twitter:card", content: "summary_large_image" },
     ],
   }),
+  // DEC-258 — this screen shows the member strings layer; the shell's gate loads it first.
+  staticData: { strings: ["member"] },
   component: PostNewScreen,
 });
 
diff --git a/src/routes/post_.$listingId.tsx b/src/routes/post_.$listingId.tsx
index 8ebe8e91..1891082f 100644
--- a/src/routes/post_.$listingId.tsx
+++ b/src/routes/post_.$listingId.tsx
@@ -45,6 +45,8 @@ export const Route = createFileRoute("/post_/$listingId")({
       { name: "robots", content: "noindex" },
     ],
   }),
+  // DEC-258 — this screen shows the member strings layer; the shell's gate loads it first.
+  staticData: { strings: ["member"] },
   component: PostResumeScreen,
 });
 
diff --git a/src/routes/my-listings.tsx b/src/routes/my-listings.tsx
index 41d87738..f5f6794e 100644
--- a/src/routes/my-listings.tsx
+++ b/src/routes/my-listings.tsx
@@ -28,5 +28,7 @@ export const Route = createFileRoute("/my-listings")({
       { name: "twitter:card", content: "summary_large_image" },
     ],
   }),
+  // DEC-258 — this screen shows the member strings layer; the shell's gate loads it first.
+  staticData: { strings: ["member"] },
   component: MyListingsPage,
 });
diff --git a/src/routes/my-listings_.$listingId.tsx b/src/routes/my-listings_.$listingId.tsx
index be5411fc..d0a8d00a 100644
--- a/src/routes/my-listings_.$listingId.tsx
+++ b/src/routes/my-listings_.$listingId.tsx
@@ -35,6 +35,8 @@ export const Route = createFileRoute("/my-listings_/$listingId")({
       { name: "twitter:card", content: "summary_large_image" },
     ],
   }),
+  // DEC-258 — this screen shows the member strings layer; the shell's gate loads it first.
+  staticData: { strings: ["member"] },
   component: MyListingRoute,
 });
 
diff --git a/src/routes/my-listings_.$listingId_.edit.tsx b/src/routes/my-listings_.$listingId_.edit.tsx
index 9e97e8d6..42271332 100644
--- a/src/routes/my-listings_.$listingId_.edit.tsx
+++ b/src/routes/my-listings_.$listingId_.edit.tsx
@@ -39,6 +39,8 @@ export const Route = createFileRoute("/my-listings_/$listingId_/edit")({
       { name: "twitter:card", content: "summary_large_image" },
     ],
   }),
+  // DEC-258 — this screen shows the member strings layer; the shell's gate loads it first.
+  staticData: { strings: ["member"] },
   component: MyListingEditRoute,
 });
 
diff --git a/src/routes/dev.primitives.tsx b/src/routes/dev.primitives.tsx
index 8b66264a..f7cdcf06 100644
--- a/src/routes/dev.primitives.tsx
+++ b/src/routes/dev.primitives.tsx
@@ -49,6 +49,8 @@ export const Route = createFileRoute("/dev/primitives")({
       { name: "twitter:card", content: "summary" },
     ],
   }),
+  // DEC-258 — this screen shows the member strings layer; the shell's gate loads it first.
+  staticData: { strings: ["member"] },
   component: PrimitivesFixture,
 });
 
diff --git a/src/routes/dev.style.tsx b/src/routes/dev.style.tsx
index 84ca5c31..54d9513c 100644
--- a/src/routes/dev.style.tsx
+++ b/src/routes/dev.style.tsx
@@ -46,6 +46,8 @@ export const Route = createFileRoute("/dev/style")({
       { name: "twitter:card", content: "summary" },
     ],
   }),
+  // DEC-258 — this screen shows the member strings layer; the shell's gate loads it first.
+  staticData: { strings: ["member"] },
   component: StyleFixture,
 });
 
diff --git a/src/routes/dev.tall.tsx b/src/routes/dev.tall.tsx
index e408fa5b..fa94430d 100644
--- a/src/routes/dev.tall.tsx
+++ b/src/routes/dev.tall.tsx
@@ -22,6 +22,8 @@ export const Route = createFileRoute("/dev/tall")({
       { name: "twitter:card", content: "summary" },
     ],
   }),
+  // DEC-258 — this screen shows the member strings layer; the shell's gate loads it first.
+  staticData: { strings: ["member"] },
   component: TallFixture,
 });
 

```

Both retired files are absent. Legacy-symbol search across src, scripts and e2e returned no lines.

## 7. Red-first proof

C7 exited 1 and named:

```text
settings.title — in en-base.ts, belongs in en-member.ts (shown on: settings)
```

The original bytes were restored in a finally block, then both expected SHA-256 values verified. No assertion was loosened.

## 8. Checks and unit results

- Lint: 0 errors, 39 warnings.
- Whole unit suite: 300 files; 299 passed, 1 failed; 1872 tests passed, 1 skipped, 2 failed — only EXH-11 and EXH-17's named sandbox timeouts. Total 1875 tests.
- New proofs: CF-SL-1…6 (6), CLL-1…3 (3), SLD-1…3 (3), SLG-1…4 (4), PSL-1…4 (4), layerOutcome (4): all passed in the focused run and whole-suite files. Default reporter printed only slower individual names, not every successful test title.
- Census: 577 scanned files, 51 pages, 2850 catalogue keys; misplaced keys: none.
- Preview log latest read: `build OK` at 2026-10-25T22:37:15Z. Part B temporarily exposed the old test's adminLayerOutcome import; Part C replaced that test exactly, and subsequent harness entries were build OK. No manual build/typecheck was run outside the prescribed E2E command.
- Marketplace weight guard: 103 modules walked, findings 0.
- Hardcoded string scan: self-test passed, findings 0.
- e2e-select self-test: OK, every spec reachable and every area glob matches.
- Format check: all matched files use Prettier code style; final report/roadmap formatting checked again at closure.

## 9. Browser evidence

All commands used `bun run e2e:local`, fake mode from its existing script, E2E_WORKERS=2, retries=0, with the permitted Chromium override because the pinned browser is absent. No repeat run or background rerun was used.

```text
i18n-layers.spec.ts whole: 6 passed (17.0s)
house-style.spec.ts whole: 12 passed (29.4s)
admin-shell.spec.ts whole: 12 passed (1.5m)
settings.spec.ts whole: 4 passed (41.2s)
my-listings-page.spec.ts MLP-2 |MLP-3 : 4 passed (56.8s)
post-wizard-category.spec.ts PW-1 |PW-2 : 4 passed (25.7s)
i18n-coverage.spec.ts renders no English fallback: 1 skipped; 5 passed (18.8s)
ad-page.spec.ts AP-53 |AP-54 : 4 passed (36.3s)
Total: 51 passed, 1 existing skip.
```

SLE-1/2/3 passed on both widths, including actual layer chunk requests and Amharic text. Signed-in admin, My Listings and posting flows passed. PW-2 created its own draft through the UI. AP-54 passed on both widths: navigation's HTML had both cards and the browser kept those very nodes, without hydration errors.

Settings is excluded from the desktop project by existing `playwright.config.ts:73`, so the unchanged whole spec ran four mobile tests with one worker, despite the command's two-worker setting. The existing desktop-only drawer skip in coverage remained; no spec or config was altered to work around either rule.

## 10. K2 census

Final census: 0 routes reaching member/admin keys without the corresponding declared layer. The initial background census read BASE while Part B was pending; its legacy-symbol findings were then removed by the exact B blocks. Final whole-tree search found 0 references to useAdminStrings, compiledAdminLoader or adminLayerOutcome in src, scripts and e2e.

All remaining whole-catalogue imports outside scripts/tests:

- `src/i18n/types.ts:1`: type-only en import; erased at runtime.
- `src/features/admin-listings/listing-page.tsx:26`: en value import (INC-902).
- `src/features/admin/roles/permission-matrix.tsx:7`: en value import (INC-902).
- `src/features/admin/translations/languages-page.tsx:27–28`: am and en value imports (INC-902).

These siblings were reported, not touched. `/legal/accept` and `/legal/publishing` remain undeclared as specified; their keys belong to base. Keys without a shown-page home remain in place under INC-903.

## 11. Limits and departures

Named sandbox failures, not changed or retried:

```text
FAIL scripts/conformance/executor-hooks.test.ts > EXH-11 refuses a red check (and the stop gate refuses the unlanded turn); with the checks green it lands, and the gate lets the turn end
Error: Test timed out in 5000ms.
Location: scripts/conformance/executor-hooks.test.ts:608:3
FAIL scripts/conformance/executor-hooks.test.ts > EXH-17 when the session's git refuses dev and hold/*, the door parks the commits on the session's own branch — never anywhere else
Error: Test timed out in 5000ms.
Location: scripts/conformance/executor-hooks.test.ts:686:3
```

AP-54's named slow-staging limit did not occur in this run. EXH-12/19 and LL-1 did not fail. No run reached the 600-second ceiling. Browser logs included existing client-aborted warnings; those did not fail tests. No full final CI claim is made from local checks.

Departures: settings' existing desktop exclusion and coverage's existing drawer skip limit the literal both-project outcome; both are disclosed above and neither was changed. The closure HEAD precedes the final report-only platform landing because the executor cannot author or predict its final commit ID. No other departure from exact blocks or hashes.

## 12. File list and CI wait

`git diff --name-only a018721a` plus this replaced report:

- `AGENTS.md`
- `docs/_changelog.md`
- `docs/features/ci-guards.md`
- `docs/features/i18n-runtime.md`
- `docs/features/performance-strategy.md`
- `docs/generated/i18n-usage.json`
- `docs/governance/briefs/foundations-turn-30.md`
- `docs/governance/mechanisms.md`
- `docs/governance/reports/foundations-turn-30.report.md`
- `e2e/ad-page.spec.ts`
- `e2e/i18n-layers.spec.ts`
- `public/i18n-usage.json`
- `roadmap.md`
- `scripts/bundle-closure.mjs`
- `scripts/check-bundle-size.mjs`
- `scripts/check-marketplace-imports.mjs`
- `scripts/conformance/kit-adoption-allowlist.txt`
- `scripts/conformance/strings-layers.test.ts`
- `scripts/conformance/strings-layers.ts`
- `scripts/route-budgets.mjs`
- `src/components/shell/strings-layer-gate.test.tsx`
- `src/components/shell/strings-layer-gate.tsx`
- `src/components/shell/strings-layers.test.ts`
- `src/components/shell/strings-layers.ts`
- `src/i18n/compiled-admin-loader.test.ts`
- `src/i18n/compiled-catalog.test.ts`
- `src/i18n/compiled-catalog.ts`
- `src/i18n/compiled-layer-loader.test.ts`
- `src/i18n/index.ts`
- `src/i18n/locales/admin-layer.test.ts`
- `src/i18n/locales/am-admin.ts`
- `src/i18n/locales/am-base.ts`
- `src/i18n/locales/am-member.ts`
- `src/i18n/locales/am.ts`
- `src/i18n/locales/en-admin.ts`
- `src/i18n/locales/en-base.ts`
- `src/i18n/locales/en-member.ts`
- `src/i18n/locales/en.ts`
- `src/i18n/provider-layers.test.tsx`
- `src/i18n/provider.tsx`
- `src/routes/__root.tsx`
- `src/routes/account.tsx`
- `src/routes/account_.legal.tsx`
- `src/routes/account_.legal_.$versionId.tsx`
- `src/routes/account_.saved.tsx`
- `src/routes/admin.tsx`
- `src/routes/dev.primitives.tsx`
- `src/routes/dev.style.tsx`
- `src/routes/dev.tall.tsx`
- `src/routes/my-listings.tsx`
- `src/routes/my-listings_.$listingId.tsx`
- `src/routes/my-listings_.$listingId_.edit.tsx`
- `src/routes/post.tsx`
- `src/routes/post_.$listingId.tsx`
- `src/routes/settings.tsx`


`git ls-files -- <path>` returned each new file below (platform-indexed):

- `docs/governance/briefs/foundations-turn-30.md`
- `scripts/conformance/strings-layers.ts`
- `scripts/conformance/strings-layers.test.ts`
- `src/components/shell/strings-layers.ts`
- `src/components/shell/strings-layers.test.ts`
- `src/components/shell/strings-layer-gate.tsx`
- `src/components/shell/strings-layer-gate.test.tsx`
- `src/i18n/compiled-layer-loader.test.ts`
- `src/i18n/provider-layers.test.tsx`
- `src/i18n/locales/en-member.ts`
- `src/i18n/locales/am-member.ts`
- `e2e/i18n-layers.spec.ts`

J-audit: SLE-1…3 are read-only; no real-row fixtures or weakened assertions; AP-54 retains existing namespaced seeds and assertions; cleanup-survives-timeout.

CI WAIT: end the turn after the platform landing; the supervisor reads the final run. No publish was requested or performed.
